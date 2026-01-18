package com.university.finance.repository;

import com.university.finance.model.InvoiceItem;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

public interface InvoiceItemRepository extends JpaRepository<InvoiceItem, UUID> {
}
