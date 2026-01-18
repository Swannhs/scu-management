package com.university.finance.dto;

import lombok.Data;
import java.math.BigDecimal;

@Data
public class WalletTransactionDto {
    private BigDecimal amount;
    private String description;
}
