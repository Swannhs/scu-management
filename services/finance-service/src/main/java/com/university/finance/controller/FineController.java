package com.university.finance.controller;

import com.university.finance.dto.InvoiceItemDto;
import com.university.finance.model.Invoice;
import com.university.finance.service.InvoiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.UUID;

@RestController
@RequestMapping("/v1/students/{studentId}/fines")
public class FineController {

    @Autowired
    private InvoiceService service;

    @PostMapping
    public ResponseEntity<Invoice> createFine(@PathVariable UUID studentId, @RequestBody InvoiceItemDto fineDto) {
        return ResponseEntity.ok(service.createFine(studentId, fineDto.getAmount(), fineDto.getDescription()));
    }
}
