package com.university.finance.repository;

import com.university.finance.model.Invoice;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.UUID;

public interface InvoiceRepository extends JpaRepository<Invoice, UUID> {
    List<Invoice> findByTenantId(UUID tenantId);
    List<Invoice> findByTenantIdAndStudentId(UUID tenantId, UUID studentId);
}
