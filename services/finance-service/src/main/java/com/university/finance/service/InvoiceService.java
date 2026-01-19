package com.university.finance.service;

import com.university.finance.config.TenantContext;
import com.university.finance.dto.InvoiceItemDto;
import com.university.finance.model.Invoice;
import com.university.finance.model.InvoiceItem;
import com.university.finance.dto.PaymentRequestDto;
import com.university.finance.model.Payment;
import com.university.finance.repository.InvoiceItemRepository;
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
public class InvoiceService {

    @Autowired
    private InvoiceRepository invoiceRepository;

    @Autowired
    private InvoiceItemRepository invoiceItemRepository;

    @Autowired
    private PaymentRepository paymentRepository;

    @Transactional(readOnly = true)
    public List<Invoice> getAllInvoices() {
        return invoiceRepository.findByTenantId(TenantContext.getCurrentTenant());
    }

    @Transactional(readOnly = true)
    public Invoice getInvoice(UUID id) {
        Invoice invoice = invoiceRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Invoice not found"));
        if (!invoice.getTenantId().equals(TenantContext.getCurrentTenant())) {
            throw new EntityNotFoundException("Invoice not found for this tenant");
        }
        return invoice;
    }

    @Transactional
    public Invoice createInvoice(Invoice invoice) {
        invoice.setTenantId(TenantContext.getCurrentTenant());
        if (invoice.getStatus() == null) {
            invoice.setStatus("DRAFT");
        }
        if (invoice.getPaidAmount() == null) {
            invoice.setPaidAmount(BigDecimal.ZERO);
        }
        if (invoice.getTotalAmount() == null) {
            invoice.setTotalAmount(BigDecimal.ZERO);
        }
        return invoiceRepository.save(invoice);
    }

    @Transactional
    public Invoice issueInvoice(UUID id) {
        Invoice invoice = getInvoice(id);
        if (!"DRAFT".equals(invoice.getStatus())) {
            throw new IllegalStateException("Invoice is not in DRAFT status");
        }
        invoice.setStatus("ISSUED");
        return invoiceRepository.save(invoice);
    }

    @Transactional
    public Invoice voidInvoice(UUID id) {
        Invoice invoice = getInvoice(id);
        if (invoice.getPaidAmount().compareTo(BigDecimal.ZERO) > 0) {
            throw new IllegalStateException("Cannot void an invoice with payments");
        }
        invoice.setStatus("VOID");
        return invoiceRepository.save(invoice);
    }

    @Transactional
    public Invoice addItem(UUID id, InvoiceItemDto itemDto) {
        Invoice invoice = getInvoice(id);
        if (!"DRAFT".equals(invoice.getStatus())) {
            throw new IllegalStateException("Cannot add items to non-DRAFT invoice");
        }

        InvoiceItem item = new InvoiceItem();
        item.setTenantId(invoice.getTenantId());
        item.setInvoice(invoice);
        item.setDescription(itemDto.getDescription());
        item.setAmount(itemDto.getAmount());

        invoiceItemRepository.save(item);

        // Update total
        BigDecimal currentTotal = invoice.getTotalAmount();
        invoice.setTotalAmount(currentTotal.add(itemDto.getAmount()));

        return invoiceRepository.save(invoice);
    }

    @Transactional
    public Invoice removeItem(UUID id, UUID itemId) {
        Invoice invoice = getInvoice(id);
        if (!"DRAFT".equals(invoice.getStatus())) {
            throw new IllegalStateException("Cannot remove items from non-DRAFT invoice");
        }

        InvoiceItem item = invoiceItemRepository.findById(itemId)
                .orElseThrow(() -> new EntityNotFoundException("Item not found"));

        if (!item.getInvoice().getId().equals(id)) {
            throw new IllegalArgumentException("Item does not belong to this invoice");
        }

        invoice.setTotalAmount(invoice.getTotalAmount().subtract(item.getAmount()));
        invoiceItemRepository.delete(item);

        return invoiceRepository.save(invoice);
    }

    @Transactional
    public Payment applyWaiver(UUID invoiceId, PaymentRequestDto waiverDto) {
        Invoice invoice = getInvoice(invoiceId);

        Payment payment = new Payment();
        payment.setTenantId(invoice.getTenantId());
        payment.setInvoice(invoice);
        payment.setAmount(waiverDto.getAmount());
        payment.setType("WAIVER");
        payment.setMethod("WAIVER");
        payment.setPaymentDate(LocalDateTime.now());
        payment.setNotes(waiverDto.getNotes());

        paymentRepository.save(payment);

        invoice.setPaidAmount(invoice.getPaidAmount().add(waiverDto.getAmount()));
        if (invoice.getPaidAmount().compareTo(invoice.getTotalAmount()) >= 0) {
            invoice.setStatus("PAID");
        } else {
            invoice.setStatus("PARTIAL");
        }
        invoiceRepository.save(invoice);

        return payment;
    }

    @Transactional
    public Invoice createFine(UUID studentId, BigDecimal amount, String reason) {
        Invoice invoice = new Invoice();
        invoice.setTenantId(TenantContext.getCurrentTenant());
        invoice.setStudentId(studentId);
        invoice.setInvoiceNumber("FINE-" + System.currentTimeMillis());
        invoice.setTotalAmount(BigDecimal.ZERO); // Will be updated by item
        invoice.setPaidAmount(BigDecimal.ZERO);
        invoice.setStatus("ISSUED"); // Fines usually issued immediately
        invoice.setCreatedAt(LocalDateTime.now());
        invoice.setDueDate(java.time.LocalDate.now().plusDays(15));

        invoice = invoiceRepository.save(invoice);

        InvoiceItem item = new InvoiceItem();
        item.setTenantId(invoice.getTenantId());
        item.setInvoice(invoice);
        item.setDescription("Fine: " + reason);
        item.setAmount(amount);

        invoiceItemRepository.save(item);

        invoice.setTotalAmount(amount);
        return invoiceRepository.save(invoice);
    }
}
