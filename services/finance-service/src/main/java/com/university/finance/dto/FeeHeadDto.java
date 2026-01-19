package com.university.finance.dto;

import lombok.Data;
import java.math.BigDecimal;
import java.util.UUID;

@Data
public class FeeHeadDto {
    private String name;
    private String type; // TUITION, HOSTEL, TRANSPORT, EXAM, LIBRARY_FINE, MISC
    private BigDecimal amount;
    private UUID incomeAccountId;
    private Boolean isRecurring;
    private String frequency; // MONTHLY, TERM, ONE_TIME
    private Boolean isOptional;
}
