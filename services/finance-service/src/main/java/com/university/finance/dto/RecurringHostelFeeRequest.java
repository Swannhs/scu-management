package com.university.finance.dto;

import lombok.Data;
import java.util.UUID;

@Data
public class RecurringHostelFeeRequest {
    private String month; // YYYY-MM
    private UUID hostelId;
}
