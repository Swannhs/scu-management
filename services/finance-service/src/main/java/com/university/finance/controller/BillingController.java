package com.university.finance.controller;

import com.university.finance.dto.BillingPlanDto;
import com.university.finance.dto.GenerateInvoiceRequest;
import com.university.finance.dto.RecurringHostelFeeRequest;
import com.university.finance.model.BillingPlan;
import com.university.finance.service.BillingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/v1/billing")
public class BillingController {

    @Autowired
    private BillingService service;

    @PostMapping("/plans")
    public ResponseEntity<BillingPlan> createPlan(@RequestBody BillingPlanDto dto) {
        return ResponseEntity.ok(service.createPlan(dto));
    }

    @GetMapping("/plans")
    public List<BillingPlan> getPlans(@RequestParam(required = false) UUID termId, @RequestParam(required = false) String status) {
        return service.getPlans(termId, status);
    }

    @PostMapping("/plans/{id}/publish")
    public ResponseEntity<BillingPlan> publishPlan(@PathVariable UUID id) {
        return ResponseEntity.ok(service.publishPlan(id));
    }

    @PostMapping("/plans/{id}/generate-invoices")
    public ResponseEntity<Void> generateInvoices(@PathVariable UUID id, @RequestBody GenerateInvoiceRequest request) {
        service.generateInvoices(id, request);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/hostel/monthly-generate")
    public ResponseEntity<Void> generateHostelFees(@RequestBody RecurringHostelFeeRequest request) {
        service.generateRecurringHostelFees(request);
        return ResponseEntity.ok().build();
    }
}
