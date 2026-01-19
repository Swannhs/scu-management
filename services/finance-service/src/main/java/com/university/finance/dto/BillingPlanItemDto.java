package com.university.finance.dto;

import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.UUID;

@Data
public class BillingPlanItemDto {
    private UUID feeHeadId;
    private BigDecimal amountOverride;
    private LocalDate startDate;
    private LocalDate endDate;
    private Boolean isProrated;
}
