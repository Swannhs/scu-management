package com.university.finance.model;

import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "invoices")
@Data
public class Invoice {
    @Id
    private UUID id = UUID.randomUUID();

    @Column(nullable = false)
    private String tenantId;

    @Column(nullable = false)
    private String studentId;

    @Column(nullable = false)
    private BigDecimal amount;

    private String description;
    private String status; // PENDING, PAID, CANCELLED

    private LocalDateTime createdAt = LocalDateTime.now();
}
