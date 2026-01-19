package com.university.finance.dto;

import lombok.Data;
import java.time.LocalDate;

@Data
public class GenerateInvoiceRequest {
    private LocalDate dueDate;
    private boolean issue;
    private String targetMonth; // YYYY-MM
}
