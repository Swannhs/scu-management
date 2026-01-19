package com.university.finance.controller;

import com.university.finance.model.Vendor;
import com.university.finance.service.VendorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/v1/vendors")
public class VendorController {

    @Autowired
    private VendorService service;

    @PostMapping
    public ResponseEntity<Vendor> createVendor(@RequestBody Vendor vendor) {
        return ResponseEntity.ok(service.createVendor(vendor));
    }

    @GetMapping
    public List<Vendor> getVendors() {
        return service.getVendors();
    }
}
