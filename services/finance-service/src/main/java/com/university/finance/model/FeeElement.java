package com.university.finance.model;

import jakarta.persistence.*;
import lombok.Data;
import java.util.UUID;

@Entity
@Table(name = "fee_elements")
@Data
public class FeeElement {
    @Id
    private UUID id = UUID.randomUUID();

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String productId; // Link to Product (Course/Item)

    @Column(nullable = false)
    private Double value; // Amount or Percentage based on context

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fee_term_line_id", nullable = false)
    private FeeTermLine feeTermLine;
}
