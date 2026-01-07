package com.university.finance.repository;

import com.university.finance.model.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.UUID;

public interface PaymentRepository extends JpaRepository<Payment, UUID> {
    List<Payment> findByTenantId(UUID tenantId);
    List<Payment> findByTenantIdAndInvoiceId(UUID tenantId, UUID invoiceId);
}
