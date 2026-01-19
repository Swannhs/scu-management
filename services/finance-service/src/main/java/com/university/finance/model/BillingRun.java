package com.university.finance.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Entity
@Table(name = "billing_runs")
public class BillingRun {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @Column(name = "tenant_id", nullable = false)
    private UUID tenantId;

    @Column(name = "billing_plan_id")
    private UUID billingPlanId; // Optional if recurring hostel run

    @Column(name = "run_month")
    private String runMonth; // YYYY-MM

    private String status; // SUCCESS, FAILED

    @Column(name = "hostel_id")
    private UUID hostelId; // For hostel runs

    @Column(name = "created_at")
    private LocalDateTime createdAt;
}
