package com.university.finance.model;

import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;
import java.util.List;

@Data
@Entity
@Table(name = "fee_structures")
public class FeeStructure {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @Column(name = "tenant_id", nullable = false)
    private UUID tenantId;

    private String name;

    @Column(name = "program_id")
    private UUID programId;

    @Column(name = "academic_term_id")
    private UUID academicTermId;

    private BigDecimal amount;
    private String currency;
    private String description;

    @OneToMany(mappedBy = "feeStructure", cascade = CascadeType.ALL)
    private List<FeeHead> heads;

    @Column(name = "created_at")
    private LocalDateTime createdAt;
}
