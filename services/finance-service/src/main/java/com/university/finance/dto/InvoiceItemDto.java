package com.university.finance.dto;

import lombok.Data;
import java.math.BigDecimal;

@Data
public class InvoiceItemDto {
    private String description;
    private BigDecimal amount;
}
