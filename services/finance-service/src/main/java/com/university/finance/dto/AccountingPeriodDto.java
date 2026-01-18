package com.university.finance.dto;

import lombok.Data;
import java.time.LocalDate;
import java.util.UUID;

@Data
public class AccountingPeriodDto {
    private UUID id;
    private String name;
    private LocalDate startDate;
    private LocalDate endDate;
    private boolean isClosed;
}
