package com.university.finance.service;

import com.university.finance.config.TenantContext;
import com.university.finance.dto.PaymentRequestDto;
import com.university.finance.model.Invoice;
import com.university.finance.model.Payment;
import com.university.finance.repository.InvoiceRepository;
import com.university.finance.repository.PaymentRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private InvoiceRepository invoiceRepository;

    @Transactional
    public Payment processPayment(PaymentRequestDto request) {
        UUID tenantId = TenantContext.getCurrentTenant();
        if (tenantId == null) {
            throw new IllegalStateException("Tenant context is missing");
        }

        Invoice invoice = invoiceRepository.findById(request.getInvoiceId())
                .orElseThrow(() -> new EntityNotFoundException("Invoice not found: " + request.getInvoiceId()));

        if (!invoice.getTenantId().equals(tenantId)) {
            throw new EntityNotFoundException("Invoice not found for this tenant");
        }

        // Idempotency check handled by DB constraint on (tenantId, transactionId) usually,
        // but explicit check can yield better error.
        // Skipping explicit check to rely on DB or assumes transactionId is unique if provided.

        Payment payment = new Payment();
        payment.setTenantId(tenantId);
        payment.setInvoice(invoice);
        payment.setAmount(request.getAmount());
        payment.setMethod(request.getMethod());
        payment.setTransactionId(request.getTransactionId());
        payment.setNotes(request.getNotes());
        payment.setType("PAYMENT");
        payment.setPaymentDate(LocalDateTime.now());

        paymentRepository.save(payment);

        // Update Invoice
        BigDecimal newPaidAmount = invoice.getPaidAmount() == null ? BigDecimal.ZERO : invoice.getPaidAmount();
        newPaidAmount = newPaidAmount.add(request.getAmount());
        invoice.setPaidAmount(newPaidAmount);

        // Update status
        BigDecimal total = invoice.getTotalAmount();
        if (newPaidAmount.compareTo(total) >= 0) {
            invoice.setStatus("PAID");
        } else {
            invoice.setStatus("PARTIAL");
        }

        invoiceRepository.save(invoice);

        return payment;
    }

    public List<Payment> getPaymentsByInvoice(UUID invoiceId) {
        UUID tenantId = TenantContext.getCurrentTenant();
        return paymentRepository.findByTenantIdAndInvoiceId(tenantId, invoiceId);
    }

    public Payment getPayment(UUID id) {
        UUID tenantId = TenantContext.getCurrentTenant();
        return paymentRepository.findById(id)
                .filter(p -> p.getTenantId().equals(tenantId))
                .orElseThrow(() -> new EntityNotFoundException("Payment not found"));
    }

    public List<Payment> getAllPaymentsForTenant() {
        UUID tenantId = TenantContext.getCurrentTenant();
        return paymentRepository.findByTenantId(tenantId);
    }
}
