package com.university.finance.model;

import jakarta.persistence.*;
import lombok.Data;
import java.util.UUID;
import java.math.BigDecimal;

@Entity
@Table(name = "student_fee_lines")
@Data
public class StudentFeeLine {
    @Id
    private UUID id = UUID.randomUUID();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_fee_details_id", nullable = false)
    private StudentFeeDetails studentFeeDetails;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private BigDecimal amount;
}
