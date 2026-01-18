package com.university.finance.dto;

import com.university.finance.model.JournalEntryStatus;
import lombok.Data;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Data
public class JournalEntryDto {
    private UUID id;
    private LocalDate date;
    private String memo;
    private String refType;
    private UUID refId;
    private JournalEntryStatus status;
    private List<JournalEntryLineDto> lines;
}
