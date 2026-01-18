package com.university.finance.controller;

import com.university.finance.dto.AccountingPeriodDto;
import com.university.finance.service.AccountingPeriodService;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/v1/finance/periods")
public class AccountingPeriodController {
    private final AccountingPeriodService service;

    public AccountingPeriodController(AccountingPeriodService service) {
        this.service = service;
    }

    @PostMapping
    public AccountingPeriodDto createPeriod(@RequestBody AccountingPeriodDto dto) {
        return service.createPeriod(dto);
    }

    @GetMapping
    public List<AccountingPeriodDto> getPeriods() {
        return service.getPeriods();
    }

    @PostMapping("/{id}/close")
    public void closePeriod(@PathVariable UUID id) {
        service.closePeriod(id);
    }

    @PostMapping("/{id}/reopen")
    public void reopenPeriod(@PathVariable UUID id) {
        service.reopenPeriod(id);
    }
}
