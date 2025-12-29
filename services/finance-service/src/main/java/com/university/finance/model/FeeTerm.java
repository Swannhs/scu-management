package com.university.finance.model;

import jakarta.persistence.*;
import lombok.Data;
import java.util.UUID;
import java.util.List;

@Entity
@Table(name = "fee_terms")
@Data
public class FeeTerm {
    @Id
    private UUID id = UUID.randomUUID();

    @Column(nullable = false)
    private String tenantId;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private boolean active = true;

    @Column(nullable = false)
    private String companyId;

    @Column(nullable = false)
    private String code;

    @Enumerated(EnumType.STRING)
    private FeeTermType type;

    @OneToMany(mappedBy = "feeTerm", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<FeeTermLine> paymentLines;
}
