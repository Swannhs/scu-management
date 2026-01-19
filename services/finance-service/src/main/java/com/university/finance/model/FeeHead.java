package com.university.finance.model;

import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;
import java.util.UUID;

@Data
@Entity
@Table(name = "fee_heads")
public class FeeHead {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @Column(name = "tenant_id", nullable = false)
    private UUID tenantId;

    @ManyToOne
    @JoinColumn(name = "fee_structure_id", nullable = false)
    private FeeStructure feeStructure;

    private String name;
    private BigDecimal amount;

    @Column(name = "type")
    private String type; // TUITION, HOSTEL, TRANSPORT, EXAM, LIBRARY_FINE, MISC

    @Column(name = "income_account_id")
    private UUID incomeAccountId;

    @Column(name = "is_recurring")
    private Boolean isRecurring;

    @Column(name = "frequency")
    private String frequency; // MONTHLY, TERM, ONE_TIME

    @Column(name = "is_optional")
    private Boolean isOptional;
}
