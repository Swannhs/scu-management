package com.university.finance.dto;

import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Data
public class BillingPlanDto {
    private String name;
    private String scopeType;
    private UUID scopeId;
    private UUID termId;
    private List<BillingPlanItemDto> items;
}
