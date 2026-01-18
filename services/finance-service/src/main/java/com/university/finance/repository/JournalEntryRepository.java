package com.university.finance.repository;

import com.university.finance.model.JournalEntry;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.UUID;
import java.util.Optional;

public interface JournalEntryRepository extends JpaRepository<JournalEntry, UUID> {
    List<JournalEntry> findByTenantId(UUID tenantId);
    Optional<JournalEntry> findByTenantIdAndId(UUID tenantId, UUID id);
}
