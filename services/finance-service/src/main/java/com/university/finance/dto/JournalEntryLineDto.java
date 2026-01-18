package com.university.finance.dto;

import lombok.Data;
import java.util.UUID;

@Data
public class JournalEntryLineDto {
    private UUID id;
    private UUID accountId;
    private Long debit;
    private Long credit;
    private String currency;
}
