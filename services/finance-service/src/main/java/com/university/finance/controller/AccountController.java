package com.university.finance.controller;

import com.university.finance.dto.AccountDto;
import com.university.finance.service.AccountService;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/v1/finance/accounts")
public class AccountController {
    private final AccountService service;

    public AccountController(AccountService service) {
        this.service = service;
    }

    @PostMapping
    public AccountDto createAccount(@RequestBody AccountDto dto) {
        return service.createAccount(dto);
    }

    @GetMapping
    public List<AccountDto> getAccounts() {
        return service.getAccounts();
    }

    @GetMapping("/{id}")
    public AccountDto getAccount(@PathVariable UUID id) {
        return service.getAccount(id);
    }

    @PatchMapping("/{id}")
    public AccountDto updateAccount(@PathVariable UUID id, @RequestBody AccountDto dto) {
        return service.updateAccount(id, dto);
    }

    @PostMapping("/{id}/archive")
    public void archiveAccount(@PathVariable UUID id) {
        service.archiveAccount(id);
    }
}
