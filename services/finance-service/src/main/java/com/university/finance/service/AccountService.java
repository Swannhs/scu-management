package com.university.finance.service;

import com.university.finance.config.TenantContext;
import com.university.finance.dto.AccountDto;
import com.university.finance.model.Account;
import com.university.finance.repository.AccountRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class AccountService {

    private final AccountRepository accountRepository;

    public AccountService(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }

    public AccountDto createAccount(AccountDto dto) {
        Account account = new Account();
        BeanUtils.copyProperties(dto, account);
        account.setTenantId(TenantContext.getCurrentTenant());

        Account saved = accountRepository.save(account);
        AccountDto result = new AccountDto();
        BeanUtils.copyProperties(saved, result);
        return result;
    }

    public List<AccountDto> getAccounts() {
        return accountRepository.findByTenantId(TenantContext.getCurrentTenant()).stream()
                .map(a -> {
                    AccountDto dto = new AccountDto();
                    BeanUtils.copyProperties(a, dto);
                    return dto;
                })
                .collect(Collectors.toList());
    }

    public AccountDto getAccount(UUID id) {
        Account account = accountRepository.findByTenantIdAndId(TenantContext.getCurrentTenant(), id)
                .orElseThrow(() -> new RuntimeException("Account not found"));
        AccountDto dto = new AccountDto();
        BeanUtils.copyProperties(account, dto);
        return dto;
    }

    @Transactional
    public AccountDto updateAccount(UUID id, AccountDto dto) {
        Account account = accountRepository.findByTenantIdAndId(TenantContext.getCurrentTenant(), id)
                .orElseThrow(() -> new RuntimeException("Account not found"));

        account.setName(dto.getName());
        account.setCode(dto.getCode());
        account.setType(dto.getType());
        account.setParentId(dto.getParentId());
        account.setPosting(dto.isPosting());
        account.setActive(dto.isActive());

        Account saved = accountRepository.save(account);
        AccountDto result = new AccountDto();
        BeanUtils.copyProperties(saved, result);
        return result;
    }

    @Transactional
    public void archiveAccount(UUID id) {
        Account account = accountRepository.findByTenantIdAndId(TenantContext.getCurrentTenant(), id)
                .orElseThrow(() -> new RuntimeException("Account not found"));
        account.setActive(false);
        account.setDeletedAt(LocalDateTime.now());
        accountRepository.save(account);
    }

    @Transactional
    public void seedDefaultAccounts() {
        UUID tenantId = TenantContext.getCurrentTenant();
        if (accountRepository.findByTenantId(tenantId).isEmpty()) {
            createAccountInternal(tenantId, "1000", "Cash", com.university.finance.model.AccountType.ASSET);
            createAccountInternal(tenantId, "1001", "Bank", com.university.finance.model.AccountType.ASSET);
            createAccountInternal(tenantId, "1200", "Accounts Receivable", com.university.finance.model.AccountType.ASSET);
            createAccountInternal(tenantId, "2000", "Accounts Payable", com.university.finance.model.AccountType.LIABILITY);
            createAccountInternal(tenantId, "2100", "Student Wallet Liability", com.university.finance.model.AccountType.LIABILITY);
            createAccountInternal(tenantId, "2200", "Salary Payable", com.university.finance.model.AccountType.LIABILITY);
            createAccountInternal(tenantId, "4000", "Tuition Income", com.university.finance.model.AccountType.INCOME);
            createAccountInternal(tenantId, "4001", "Hostel Income", com.university.finance.model.AccountType.INCOME);
            createAccountInternal(tenantId, "4002", "Transport Income", com.university.finance.model.AccountType.INCOME);
            createAccountInternal(tenantId, "4100", "Waivers/Discounts", com.university.finance.model.AccountType.INCOME); // Contra income
            createAccountInternal(tenantId, "5000", "Salary Expense", com.university.finance.model.AccountType.EXPENSE);
            createAccountInternal(tenantId, "5100", "General Expense", com.university.finance.model.AccountType.EXPENSE);
        }
    }

    private void createAccountInternal(UUID tenantId, String code, String name, com.university.finance.model.AccountType type) {
        Account account = new Account();
        account.setTenantId(tenantId);
        account.setCode(code);
        account.setName(name);
        account.setType(type);
        account.setPosting(true);
        account.setActive(true);
        accountRepository.save(account);
    }
}
