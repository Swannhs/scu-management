package com.university.finance.controller;

import com.university.finance.dto.JournalEntryDto;
import com.university.finance.service.JournalEntryService;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/v1/finance/journals")
public class JournalEntryController {
    private final JournalEntryService service;

    public JournalEntryController(JournalEntryService service) {
        this.service = service;
    }

    @PostMapping
    public JournalEntryDto createJournalEntry(@RequestBody JournalEntryDto dto) {
        return service.createJournalEntry(dto);
    }

    @GetMapping
    public List<JournalEntryDto> getJournalEntries() {
        return service.getJournalEntries();
    }

    @GetMapping("/{id}")
    public JournalEntryDto getJournalEntry(@PathVariable UUID id) {
        return service.getJournalEntry(id);
    }

    @PostMapping("/{id}/reverse")
    public void reverseJournalEntry(@PathVariable UUID id) {
        service.reverseJournalEntry(id);
    }
}
