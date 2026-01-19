package com.university.finance.service;

import com.university.finance.config.TenantContext;
import com.university.finance.model.Invoice;
import com.university.finance.model.Payment;
import com.university.finance.model.RefundRequest;
import com.university.finance.repository.InvoiceRepository;
import com.university.finance.repository.PaymentRepository;
import com.university.finance.repository.RefundRequestRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class RefundService {

    @Autowired
    private RefundRequestRepository refundRequestRepository;

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private InvoiceRepository invoiceRepository;

    @Autowired
    private StudentWalletService studentWalletService;

    @Autowired
    private PostingService postingService;

    @Transactional
    public RefundRequest createRefundRequest(RefundRequest request) {
        request.setTenantId(TenantContext.getCurrentTenant());
        request.setStatus("REQUESTED");
        request.setCreatedAt(LocalDateTime.now());
        return refundRequestRepository.save(request);
    }

    public List<RefundRequest> getAllRefundRequests() {
        return refundRequestRepository.findByTenantId(TenantContext.getCurrentTenant());
    }

    @Transactional
    public RefundRequest approveRefund(UUID id) {
        RefundRequest request = refundRequestRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Refund Request not found"));
        if (!request.getTenantId().equals(TenantContext.getCurrentTenant())) {
             throw new EntityNotFoundException("Access Denied");
        }
        if (!"REQUESTED".equals(request.getStatus())) {
            throw new IllegalStateException("Only REQUESTED refunds can be approved");
        }
        request.setStatus("APPROVED");
        request.setUpdatedAt(LocalDateTime.now());
        return refundRequestRepository.save(request);
    }

    @Transactional
    public Payment executeRefund(UUID id) {
        RefundRequest request = refundRequestRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Refund Request not found"));

        if (!"APPROVED".equals(request.getStatus())) {
            throw new IllegalStateException("Only APPROVED refunds can be executed");
        }

        // Create Payment Record (REFUND)
        Payment payment = new Payment();
        payment.setTenantId(request.getTenantId());

        // If invoice is linked, link it.
        Invoice invoice = null;
        if (request.getInvoiceId() != null) {
            invoice = invoiceRepository.findById(request.getInvoiceId()).orElse(null);
            if (invoice != null) {
                payment.setInvoice(invoice);
                // Update Invoice Paid Amount (Decrease it)
                invoice.setPaidAmount(invoice.getPaidAmount().subtract(request.getAmount()));
                // Status update? If paid amount < total, maybe PARTIAL?
                if (invoice.getPaidAmount().compareTo(invoice.getTotalAmount()) < 0) {
                     invoice.setStatus("PARTIAL"); // or PENDING if 0?
                }
                invoiceRepository.save(invoice);
            }
        }

        // Note: Payment entity requires Invoice currently?
        // @JoinColumn(name = "invoice_id", nullable = false) in Payment.java
        // So we MUST have an invoice.
        if (invoice == null) {
            throw new IllegalStateException("Refund execution requires an associated invoice (schema constraint)");
        }

        payment.setAmount(request.getAmount().negate()); // Store as negative? Or positive with type REFUND?
        // Usually amount is magnitude, type is direction. But adding up payments...
        // If we sum amounts to get paidAmount, then REFUND should be negative if we blindly sum.
        // But the Service manually adjusted paidAmount above.
        // Let's store amount as positive, type REFUND.
        payment.setAmount(request.getAmount());
        payment.setType("REFUND");
        payment.setMethod(request.getMethod() != null ? request.getMethod() : "BANK_TRANSFER");
        payment.setPaymentDate(LocalDateTime.now());
        payment.setNotes("Refund execution for Request " + id);

        Payment savedPayment = paymentRepository.save(payment);

        if ("WALLET".equals(request.getMethod())) {
            // Credit Student Wallet
            // Using DTO for credit? No, service method takes DTO. I should create DTO or overload.
            // StudentWalletService.credit takes UUID, WalletTransactionDto.
            com.university.finance.dto.WalletTransactionDto walletDto = new com.university.finance.dto.WalletTransactionDto();
            walletDto.setAmount(request.getAmount());
            walletDto.setDescription("Refund for Invoice " + (invoice != null ? invoice.getInvoiceNumber() : ""));
            studentWalletService.credit(request.getStudentId(), walletDto);

            postingService.postWalletCredit(request.getTenantId(), request.getStudentId(), request.getAmount());
        } else {
            // Cash/Bank Refund
            postingService.postRefund(request, savedPayment);
        }

        request.setStatus("EXECUTED");
        request.setUpdatedAt(LocalDateTime.now());
        refundRequestRepository.save(request);

        return savedPayment;
    }
}
