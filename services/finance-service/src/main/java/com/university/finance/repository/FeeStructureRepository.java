package com.university.finance.repository;

import com.university.finance.model.FeeStructure;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.UUID;

public interface FeeStructureRepository extends JpaRepository<FeeStructure, UUID> {
    List<FeeStructure> findByTenantId(UUID tenantId);
}
