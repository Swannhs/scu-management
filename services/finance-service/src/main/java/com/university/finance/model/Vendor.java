package com.university.finance.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Entity
@Table(name = "vendors")
public class Vendor {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @Column(name = "tenant_id", nullable = false)
    private UUID tenantId;

    private String name;
    private String contactPerson;
    private String email;
    private String phone;
    private String address;

    @Column(name = "created_at")
    private LocalDateTime createdAt;
}
