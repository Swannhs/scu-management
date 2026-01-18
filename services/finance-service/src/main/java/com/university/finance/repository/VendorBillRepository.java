package com.university.finance.repository;

import com.university.finance.model.VendorBill;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.UUID;

public interface VendorBillRepository extends JpaRepository<VendorBill, UUID> {
    List<VendorBill> findByTenantId(UUID tenantId);
    List<VendorBill> findByTenantIdAndStatus(UUID tenantId, String status);
}
