package com.university.finance.controller;

import com.university.finance.config.TenantContext;
import com.university.finance.config.UserContext;
import com.university.finance.model.Invoice;
import com.university.finance.repository.InvoiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/v1/invoices")
public class InvoiceController {

    @Autowired
    private InvoiceRepository repository;

    @GetMapping
    public List<Invoice> getInvoices() {
        return repository.findByTenantId(TenantContext.getCurrentTenant());
    }

    @PostMapping
    public Invoice createInvoice(@RequestBody Invoice invoice) {
        invoice.setTenantId(TenantContext.getCurrentTenant());
        return repository.save(invoice);
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
        // Should verify tenant ownership
        Invoice invoice = repository.findById(id).orElseThrow();
        if (!invoice.getTenantId().equals(TenantContext.getCurrentTenant())) {
             throw new RuntimeException("Access Denied");
        }
        return invoice;
    }
}
