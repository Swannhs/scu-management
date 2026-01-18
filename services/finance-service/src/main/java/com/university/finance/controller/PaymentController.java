package com.university.finance.controller;

import com.university.finance.config.TenantContext;
import com.university.finance.dto.PaymentRequestDto;
import com.university.finance.model.Payment;
import com.university.finance.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/v1/payments")
public class PaymentController {

    @Autowired
    private PaymentService service;

    @PostMapping
    public ResponseEntity<Payment> createPayment(@RequestBody PaymentRequestDto request) {
        Payment payment = service.processPayment(request);
        return ResponseEntity.ok(payment);
    }

    @GetMapping
    public List<Payment> getAll(@RequestParam(required = false) UUID invoiceId) {
        if (invoiceId != null) {
            return service.getPaymentsByInvoice(invoiceId);
        }
        // Fallback to all payments for tenant if needed, or throw error if not allowed to list all
        // For now, let's implement getAll for tenant in service or repository call here
        // But service doesn't have getAllForTenant yet.
        // Let's stick to what repository offers: findByTenantId
        // I should probably add getAllForTenant to service for consistency.
        // For now I will access repository directly for the fallback or add a method to service.
        // Better to add to service.
        return service.getAllPaymentsForTenant();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Payment> getById(@PathVariable UUID id) {
        Payment payment = service.getPayment(id);
        return ResponseEntity.ok(payment);
    }
}
