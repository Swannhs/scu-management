package com.university.finance.repository;

import com.university.finance.model.BillingRun;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

public interface BillingRunRepository extends JpaRepository<BillingRun, UUID> {
}
