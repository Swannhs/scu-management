package com.university.finance.dto;

import lombok.Data;
import java.math.BigDecimal;

@Data
public class StudentFeeDto {
    private String id;
    private String studentId;
    private BigDecimal totalAmount;
    private boolean isPaid;
    private String invoiceId;
}
