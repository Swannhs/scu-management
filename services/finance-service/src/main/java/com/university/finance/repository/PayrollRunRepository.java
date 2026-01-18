package com.university.finance.repository;

import com.university.finance.model.PayrollRun;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.UUID;

public interface PayrollRunRepository extends JpaRepository<PayrollRun, UUID> {
    List<PayrollRun> findByTenantId(UUID tenantId);
}
