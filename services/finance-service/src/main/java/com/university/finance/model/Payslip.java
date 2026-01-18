package com.university.finance.model;

import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;
import java.util.UUID;

@Data
@Entity
@Table(name = "payslips")
public class Payslip {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @Column(name = "tenant_id", nullable = false)
    private UUID tenantId;

    @ManyToOne
    @JoinColumn(name = "payroll_run_id", nullable = false)
    private PayrollRun payrollRun;

    @ManyToOne
    @JoinColumn(name = "staff_profile_id", nullable = false)
    private StaffProfile staffProfile;

    private BigDecimal basicSalary;
    private BigDecimal deductions;
    private BigDecimal netPay;

    private String status; // PENDING, PAID
}
