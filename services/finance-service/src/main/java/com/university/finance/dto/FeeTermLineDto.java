package com.university.finance.dto;

import lombok.Data;
import java.time.LocalDate;

@Data
public class FeeTermLineDto {
    private String id;
    private Integer dueDays;
    private LocalDate dueDate;
    private Double value;
}
