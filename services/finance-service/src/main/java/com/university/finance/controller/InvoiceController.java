package com.university.finance.controller;

import com.university.finance.model.Invoice;
import com.university.finance.repository.InvoiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/invoices")
public class InvoiceController {

    @Autowired
    private InvoiceRepository repository;

    @GetMapping
    public List<Invoice> getInvoices(@RequestHeader("X-Tenant-ID") String tenantId) {
        return repository.findByTenantId(tenantId);
    }

    @PostMapping
    public Invoice createInvoice(@RequestHeader("X-Tenant-ID") String tenantId, @RequestBody Invoice invoice) {
        invoice.setTenantId(tenantId);
        return repository.save(invoice);
    }

    @GetMapping("/student/{studentId}")
    public List<Invoice> getStudentInvoices(
            @RequestHeader("X-Tenant-ID") String tenantId,
            @PathVariable String studentId) {
        return repository.findByTenantIdAndStudentId(tenantId, studentId);
    }
}
