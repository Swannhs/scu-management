package com.university.finance.repository;

import com.university.finance.model.Vendor;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.UUID;

public interface VendorRepository extends JpaRepository<Vendor, UUID> {
    List<Vendor> findByTenantId(UUID tenantId);
}
