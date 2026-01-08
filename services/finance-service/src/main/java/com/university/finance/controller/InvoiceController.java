package com.university.finance.controller;

import com.university.finance.config.TenantContext;
import com.university.finance.config.UserContext;
import com.university.finance.model.EventOutbox;
import com.university.finance.model.Invoice;
import com.university.finance.model.Payment;
import com.university.finance.repository.EventOutboxRepository;
import com.university.finance.repository.InvoiceRepository;
import com.university.finance.repository.PaymentRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/v1/invoices")
public class InvoiceController {

    @Autowired
    private InvoiceRepository repository;

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private EventOutboxRepository outboxRepository;

    @Autowired
    private ObjectMapper objectMapper;

    @GetMapping
    public List<Invoice> getInvoices(
            @RequestParam(required = false) UUID studentId,
            @RequestParam(required = false) String status) {
        UUID tenantId = TenantContext.getCurrentTenant();
        if (studentId != null && status != null) {
            return repository.findByTenantIdAndStudentIdAndStatus(tenantId, studentId, status);
        } else if (studentId != null) {
            return repository.findByTenantIdAndStudentId(tenantId, studentId);
        } else if (status != null) {
            return repository.findByTenantIdAndStatus(tenantId, status);
        } else {
            return repository.findByTenantId(tenantId);
        }
    }

    @PostMapping
    public Invoice createInvoice(@RequestBody Invoice invoice) {
        invoice.setTenantId(TenantContext.getCurrentTenant());
        Invoice saved = repository.save(invoice);

        try {
            EventOutbox event = new EventOutbox();
            event.setTenantId(TenantContext.getCurrentTenant());
            event.setEventType("finance.invoice.created");
            event.setPayload(objectMapper.writeValueAsString(saved));
            event.setStatus("PENDING");
            event.setCreatedAt(LocalDateTime.now());
            outboxRepository.save(event);
        } catch (Exception e) {
            // Log error, transaction rollback ideally
            throw new RuntimeException("Error publishing event", e);
        }

        return saved;
    }

    @GetMapping("/my")
    public List<Invoice> getMyInvoices() {
        UUID currentUser = UserContext.getCurrentUser();
        if (currentUser == null) {
            throw new RuntimeException("User Context Missing");
        }
        return repository.findByTenantIdAndStudentId(TenantContext.getCurrentTenant(), currentUser);
    }

    @GetMapping("/{id}")
    public Invoice getInvoice(@PathVariable UUID id) {
        Invoice invoice = repository.findById(id).orElseThrow(() -> new RuntimeException("Invoice Not Found"));
        if (!invoice.getTenantId().equals(TenantContext.getCurrentTenant())) {
             throw new RuntimeException("Access Denied");
        }
        return invoice;
    }

    @PostMapping("/{id}/payments")
    public Payment addPayment(@PathVariable UUID id, @RequestBody Payment payment) {
        Invoice invoice = repository.findById(id).orElseThrow(() -> new RuntimeException("Invoice Not Found"));
        if (!invoice.getTenantId().equals(TenantContext.getCurrentTenant())) {
             throw new RuntimeException("Access Denied");
        }
        payment.setInvoice(invoice);
        payment.setTenantId(TenantContext.getCurrentTenant());
        Payment saved = paymentRepository.save(payment);

        try {
            EventOutbox event = new EventOutbox();
            event.setTenantId(TenantContext.getCurrentTenant());
            event.setEventType("finance.payment.received");
            event.setPayload(objectMapper.writeValueAsString(saved));
            event.setStatus("PENDING");
            event.setCreatedAt(LocalDateTime.now());
            outboxRepository.save(event);
        } catch (Exception e) {
            throw new RuntimeException("Error publishing event", e);
        }

        return saved;
    }
}
