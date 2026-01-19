package com.university.finance.service;

import com.university.finance.config.TenantContext;
import com.university.finance.dto.WalletTransactionDto;
import com.university.finance.model.StudentWallet;
import com.university.finance.repository.StudentWalletRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class StudentWalletService {

    @Autowired
    private StudentWalletRepository repository;

    @Transactional
    public StudentWallet getWallet(UUID studentId) {
        UUID tenantId = TenantContext.getCurrentTenant();
        return repository.findByTenantIdAndStudentId(tenantId, studentId)
                .orElseGet(() -> {
                    StudentWallet wallet = new StudentWallet();
                    wallet.setTenantId(tenantId);
                    wallet.setStudentId(studentId);
                    wallet.setBalance(BigDecimal.ZERO);
                    wallet.setUpdatedAt(LocalDateTime.now());
                    return repository.save(wallet);
                });
    }

    @Transactional
    public StudentWallet credit(UUID studentId, WalletTransactionDto transaction) {
        StudentWallet wallet = getWallet(studentId);
        wallet.setBalance(wallet.getBalance().add(transaction.getAmount()));
        wallet.setUpdatedAt(LocalDateTime.now());
        // Should probably record transaction history (audit log) here?
        // Instructions just say "credit endpoint".
        return repository.save(wallet);
    }

    @Transactional
    public StudentWallet debit(UUID studentId, WalletTransactionDto transaction) {
        StudentWallet wallet = getWallet(studentId);
        if (wallet.getBalance().compareTo(transaction.getAmount()) < 0) {
            throw new IllegalStateException("Insufficient wallet balance");
        }
        wallet.setBalance(wallet.getBalance().subtract(transaction.getAmount()));
        wallet.setUpdatedAt(LocalDateTime.now());
        return repository.save(wallet);
    }
}
