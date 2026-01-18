package com.university.finance.dto;

import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.UUID;

@Data
public class VendorBillDto {
    private UUID vendorId;
    private String billNumber;
    private BigDecimal amount;
    private LocalDate dueDate;
}
