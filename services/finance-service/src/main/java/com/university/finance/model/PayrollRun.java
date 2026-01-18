package com.university.finance.model;

import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Data
@Entity
@Table(name = "payroll_runs")
public class PayrollRun {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @Column(name = "tenant_id", nullable = false)
    private UUID tenantId;

    private int month;
    private int year;
    private String status; // DRAFT, CALCULATED, APPROVED, PAID

    private BigDecimal totalAmount;

    @OneToMany(mappedBy = "payrollRun", cascade = CascadeType.ALL)
    private List<Payslip> payslips;

    @Column(name = "created_at")
    private LocalDateTime createdAt;
}
