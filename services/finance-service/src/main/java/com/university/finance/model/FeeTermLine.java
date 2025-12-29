package com.university.finance.model;

import jakarta.persistence.*;
import lombok.Data;
import java.util.UUID;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "fee_term_lines")
@Data
public class FeeTermLine {
    @Id
    private UUID id = UUID.randomUUID();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fee_term_id", nullable = false)
    private FeeTerm feeTerm;

    private Integer dueDays;
    private LocalDate dueDate;
    
    @Column(nullable = false)
    private Double value; // Percentage

    @OneToMany(mappedBy = "feeTermLine", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<FeeElement> fees;
}
