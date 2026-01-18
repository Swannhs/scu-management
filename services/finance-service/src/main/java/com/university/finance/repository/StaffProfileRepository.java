package com.university.finance.repository;

import com.university.finance.model.StaffProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.UUID;

public interface StaffProfileRepository extends JpaRepository<StaffProfile, UUID> {
    List<StaffProfile> findByTenantId(UUID tenantId);
}
