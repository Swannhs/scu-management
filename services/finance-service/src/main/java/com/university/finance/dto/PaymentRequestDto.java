package com.university.finance.dto;

import lombok.Data;
import java.math.BigDecimal;
import java.util.UUID;

@Data
public class PaymentRequestDto {
    private UUID invoiceId;
    private BigDecimal amount;
    private String method; // CASH, CHEQUE, BANK_TRANSFER, ONLINE, POS
    private String transactionId; // Optional external ref
    private String notes;
}
