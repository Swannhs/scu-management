package com.university.finance.repository;

import com.university.finance.model.StudentWallet;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import java.util.UUID;

public interface StudentWalletRepository extends JpaRepository<StudentWallet, UUID> {
    Optional<StudentWallet> findByTenantIdAndStudentId(UUID tenantId, UUID studentId);
}
