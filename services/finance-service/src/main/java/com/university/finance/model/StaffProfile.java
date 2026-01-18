package com.university.finance.model;

import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Entity
@Table(name = "staff_profiles")
public class StaffProfile {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @Column(name = "tenant_id", nullable = false)
    private UUID tenantId;

    @Column(name = "staff_id", nullable = false)
    private UUID staffId; // Link to user-service or faculty-service

    private String name;
    private String role; // TEACHER, ADMIN, CLEANER
    private BigDecimal baseSalary;
    private String bankDetails;

    @Column(name = "created_at")
    private LocalDateTime createdAt;
}
