package com.university.finance.repository;

import com.university.finance.model.EventOutbox;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

public interface EventOutboxRepository extends JpaRepository<EventOutbox, UUID> {
}
