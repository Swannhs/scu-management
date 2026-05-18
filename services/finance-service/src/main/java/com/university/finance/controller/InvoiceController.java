package com.university.finance.controller;

import com.university.finance.config.TenantContext;
import com.university.finance.config.UserContext;
import com.university.finance.dto.InvoiceItemDto;
import com.university.finance.dto.PaymentRequestDto;
import com.university.finance.model.Invoice;
import com.university.finance.model.Payment;
import com.university.finance.repository.InvoiceRepository;
import com.university.finance.service.InvoiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/v1/invoices")
public class InvoiceController {

    @Autowired
    private InvoiceService service;

    @Autowired
    private InvoiceRepository repository; // Keeping for getMyInvoices custom query if needed, or move to service

    @GetMapping
    public List<Invoice> getInvoices() {
        return service.getAllInvoices();
    }

    @PostMapping
    public Invoice createInvoice(@RequestBody Invoice invoice) {
        return service.createInvoice(invoice);
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
        return service.getInvoice(id);
    }

    @PostMapping("/{id}/issue")
    public ResponseEntity<Invoice> issueInvoice(@PathVariable UUID id) {
        return ResponseEntity.ok(service.issueInvoice(id));
    }

    @PostMapping("/{id}/odoo-sync/retry")
    public ResponseEntity<Invoice> retryOdooSync(@PathVariable UUID id) {
        return ResponseEntity.ok(service.retryOdooSync(id));
    }

    @PostMapping("/{id}/void")
    public ResponseEntity<Invoice> voidInvoice(@PathVariable UUID id) {
        return ResponseEntity.ok(service.voidInvoice(id));
    }

    @PostMapping("/{id}/items")
    public ResponseEntity<Invoice> addItem(@PathVariable UUID id, @RequestBody InvoiceItemDto item) {
        return ResponseEntity.ok(service.addItem(id, item));
    }

    @DeleteMapping("/{id}/items/{itemId}")
    public ResponseEntity<Invoice> removeItem(@PathVariable UUID id, @PathVariable UUID itemId) {
        return ResponseEntity.ok(service.removeItem(id, itemId));
    }

    @PostMapping("/{id}/waivers")
    public ResponseEntity<Payment> applyWaiver(@PathVariable UUID id, @RequestBody PaymentRequestDto waiverDto) {
        return ResponseEntity.ok(service.applyWaiver(id, waiverDto));
    }
}
