package com.university.finance.repository;

import com.university.finance.model.JournalEntryLine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

public interface JournalEntryLineRepository extends JpaRepository<JournalEntryLine, UUID> {

    @Query("SELECT l FROM JournalEntryLine l WHERE l.tenantId = :tenantId AND l.journalEntry.date BETWEEN :from AND :to")
    List<JournalEntryLine> findByTenantIdAndDateRange(@Param("tenantId") UUID tenantId, @Param("from") LocalDate from, @Param("to") LocalDate to);

    @Query("SELECT l FROM JournalEntryLine l WHERE l.tenantId = :tenantId AND l.journalEntry.date <= :asOf")
    List<JournalEntryLine> findByTenantIdAndDateBefore(@Param("tenantId") UUID tenantId, @Param("asOf") LocalDate asOf);
}
