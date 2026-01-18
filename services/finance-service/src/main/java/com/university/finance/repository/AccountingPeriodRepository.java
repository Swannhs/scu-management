package com.university.finance.repository;

import com.university.finance.model.AccountingPeriod;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface AccountingPeriodRepository extends JpaRepository<AccountingPeriod, UUID> {
    List<AccountingPeriod> findByTenantId(UUID tenantId);
    Optional<AccountingPeriod> findByTenantIdAndId(UUID tenantId, UUID id);

    @Query("SELECT COUNT(ap) > 0 FROM AccountingPeriod ap WHERE ap.tenantId = :tenantId AND ap.isClosed = true AND :date BETWEEN ap.startDate AND ap.endDate")
    boolean isDateInClosedPeriod(@Param("tenantId") UUID tenantId, @Param("date") LocalDate date);
}
