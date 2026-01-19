package com.university.finance.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Data
@Entity
@Table(name = "billing_plans")
public class BillingPlan {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @Column(name = "tenant_id", nullable = false)
    private UUID tenantId;

    private String name;

    @Column(name = "scope_type")
    private String scopeType; // PROGRAM, BATCH, CLASS, HOSTEL, STUDENT, ALL

    @Column(name = "scope_id")
    private UUID scopeId; // nullable

    @Column(name = "term_id")
    private UUID termId;

    private String status; // DRAFT, PUBLISHED

    @OneToMany(mappedBy = "billingPlan", cascade = CascadeType.ALL)
    private List<BillingPlanItem> items;

    @Column(name = "created_at")
    private LocalDateTime createdAt;
}
