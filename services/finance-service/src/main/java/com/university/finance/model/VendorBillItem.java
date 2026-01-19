package com.university.finance.model;

import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;
import java.util.UUID;

@Data
@Entity
@Table(name = "vendor_bill_items")
public class VendorBillItem {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @Column(name = "tenant_id", nullable = false)
    private UUID tenantId;

    @ManyToOne
    @JoinColumn(name = "vendor_bill_id", nullable = false)
    private VendorBill vendorBill;

    private String description;
    private BigDecimal amount;

    @Column(name = "expense_account_id")
    private UUID expenseAccountId;
}
