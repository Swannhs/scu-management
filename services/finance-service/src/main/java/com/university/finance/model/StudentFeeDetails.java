package com.university.finance.model;

import jakarta.persistence.*;
import lombok.Data;
import java.util.UUID;
import java.math.BigDecimal;
import java.util.List;

@Entity
@Table(name = "student_fee_details")
@Data
public class StudentFeeDetails {
    @Id
    private UUID id = UUID.randomUUID();

    @Column(nullable = false)
    private String tenantId;

    @Column(nullable = false)
    private String studentId;

    @Column(nullable = false)
    private BigDecimal totalAmount;

    @Column(nullable = false)
    private boolean isPaid = false;

    @OneToOne
    @JoinColumn(name = "invoice_id")
    private Invoice invoice;

    @OneToMany(mappedBy = "studentFeeDetails", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<StudentFeeLine> lines;
}
