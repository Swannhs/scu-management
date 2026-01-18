package com.university.finance.controller;

import com.university.finance.dto.VendorBillDto;
import com.university.finance.model.VendorBill;
import com.university.finance.service.VendorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/v1/vendor-bills")
public class VendorBillController {

    @Autowired
    private VendorService service;

    @PostMapping
    public ResponseEntity<VendorBill> createBill(@RequestBody VendorBillDto dto) {
        return ResponseEntity.ok(service.createBill(dto));
    }

    @GetMapping
    public List<VendorBill> getBills(@RequestParam(required = false) String status) {
        return service.getBills(status);
    }

    @PostMapping("/{id}/approve")
    public ResponseEntity<VendorBill> approveBill(@PathVariable UUID id) {
        return ResponseEntity.ok(service.approveBill(id));
    }

    @PostMapping("/{id}/pay")
    public ResponseEntity<VendorBill> payBill(@PathVariable UUID id) {
        return ResponseEntity.ok(service.payBill(id));
    }
}
