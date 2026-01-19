package com.university.finance.controller;

import com.university.finance.dto.WalletTransactionDto;
import com.university.finance.model.StudentWallet;
import com.university.finance.service.StudentWalletService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.UUID;

@RestController
@RequestMapping("/v1/students/{studentId}/wallet")
public class StudentWalletController {

    @Autowired
    private StudentWalletService service;

    @GetMapping
    public ResponseEntity<StudentWallet> getWallet(@PathVariable UUID studentId) {
        return ResponseEntity.ok(service.getWallet(studentId));
    }

    @PostMapping("/credit")
    public ResponseEntity<StudentWallet> credit(@PathVariable UUID studentId, @RequestBody WalletTransactionDto dto) {
        return ResponseEntity.ok(service.credit(studentId, dto));
    }

    @PostMapping("/debit")
    public ResponseEntity<StudentWallet> debit(@PathVariable UUID studentId, @RequestBody WalletTransactionDto dto) {
        return ResponseEntity.ok(service.debit(studentId, dto));
    }
}
