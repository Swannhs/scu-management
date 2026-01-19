package com.university.finance.model;

import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Data
@Entity
@Table(name = "vendor_bills")
public class VendorBill {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @Column(name = "tenant_id", nullable = false)
    private UUID tenantId;

    @ManyToOne
    @JoinColumn(name = "vendor_id", nullable = false)
    private Vendor vendor;

    @Column(name = "bill_number")
    private String billNumber;

    private BigDecimal amount;
    private LocalDate dueDate;
    private String status; // PENDING, APPROVED, PAID, VOID

    @OneToMany(mappedBy = "vendorBill", cascade = CascadeType.ALL)
    private List<VendorBillItem> items;

    @Column(name = "created_at")
    private LocalDateTime createdAt;
}
