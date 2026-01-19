package com.university.finance.repository;

import com.university.finance.model.BillingPlan;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.UUID;

public interface BillingPlanRepository extends JpaRepository<BillingPlan, UUID> {
    List<BillingPlan> findByTenantId(UUID tenantId);
}
