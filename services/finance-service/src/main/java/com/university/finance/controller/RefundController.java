package com.university.finance.controller;

import com.university.finance.model.Payment;
import com.university.finance.model.RefundRequest;
import com.university.finance.service.RefundService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/v1/refunds")
public class RefundController {

    @Autowired
    private RefundService service;

    @PostMapping
    public ResponseEntity<RefundRequest> createRefundRequest(@RequestBody RefundRequest request) {
        return ResponseEntity.ok(service.createRefundRequest(request));
    }

    @GetMapping
    public List<RefundRequest> getAll() {
        return service.getAllRefundRequests();
    }

    @PostMapping("/{id}/approve")
    public ResponseEntity<RefundRequest> approveRefund(@PathVariable UUID id) {
        return ResponseEntity.ok(service.approveRefund(id));
    }

    @PostMapping("/{id}/execute")
    public ResponseEntity<Payment> executeRefund(@PathVariable UUID id) {
        return ResponseEntity.ok(service.executeRefund(id));
    }
}
