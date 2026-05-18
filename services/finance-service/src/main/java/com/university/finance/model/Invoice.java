package com.university.finance.model;

import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;
import java.util.List;

@Data
@Entity
@Table(name = "invoices")
public class Invoice {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @Column(name = "tenant_id", nullable = false)
    private UUID tenantId;

    @Column(name = "student_id", nullable = false)
    private UUID studentId;

    @Column(name = "invoice_number", nullable = false)
    private String invoiceNumber;

    @Column(name = "total_amount")
    private BigDecimal totalAmount;

    @Column(name = "paid_amount")
    private BigDecimal paidAmount;

    // Balance is generated stored, so mapped as insertable=false, updatable=false usually
    @Column(name = "balance_amount", insertable = false, updatable = false)
    private BigDecimal balanceAmount;

    @Column(name = "due_date")
    private LocalDate dueDate;

    private String status; // PENDING, PAID, PARTIAL

    @OneToMany(mappedBy = "invoice", cascade = CascadeType.ALL)
    private List<InvoiceItem> items;

    @OneToMany(mappedBy = "invoice", cascade = CascadeType.ALL)
    private List<Payment> payments;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "odoo_partner_id")
    private String odooPartnerId;

    @Column(name = "odoo_invoice_id")
    private String odooInvoiceId;

    @Column(name = "odoo_sync_status")
    private String odooSyncStatus;

    @Column(name = "odoo_last_sync_at")
    private LocalDateTime odooLastSyncAt;

    @Column(name = "odoo_sync_error", length = 500)
    private String odooSyncError;
}
