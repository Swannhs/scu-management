package com.university.finance.repository;

import com.university.finance.model.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.UUID;
import java.util.Optional;

public interface AccountRepository extends JpaRepository<Account, UUID> {
    List<Account> findByTenantId(UUID tenantId);
    Optional<Account> findByTenantIdAndId(UUID tenantId, UUID id);
    List<Account> findByTenantIdAndIsActiveTrue(UUID tenantId);
}
