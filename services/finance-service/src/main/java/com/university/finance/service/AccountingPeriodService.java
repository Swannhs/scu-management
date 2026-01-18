package com.university.finance.service;

import com.university.finance.config.TenantContext;
import com.university.finance.dto.AccountingPeriodDto;
import com.university.finance.model.AccountingPeriod;
import com.university.finance.repository.AccountingPeriodRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class AccountingPeriodService {

    private final AccountingPeriodRepository repository;

    public AccountingPeriodService(AccountingPeriodRepository repository) {
        this.repository = repository;
    }

    public AccountingPeriodDto createPeriod(AccountingPeriodDto dto) {
        AccountingPeriod period = new AccountingPeriod();
        BeanUtils.copyProperties(dto, period);
        period.setTenantId(TenantContext.getCurrentTenant());
        period.setClosed(false); // New periods are open by default

        AccountingPeriod saved = repository.save(period);
        AccountingPeriodDto result = new AccountingPeriodDto();
        BeanUtils.copyProperties(saved, result);
        return result;
    }

    public List<AccountingPeriodDto> getPeriods() {
        return repository.findByTenantId(TenantContext.getCurrentTenant()).stream()
                .map(p -> {
                    AccountingPeriodDto dto = new AccountingPeriodDto();
                    BeanUtils.copyProperties(p, dto);
                    return dto;
                })
                .collect(Collectors.toList());
    }

    @Transactional
    public void closePeriod(UUID id) {
        AccountingPeriod period = repository.findByTenantIdAndId(TenantContext.getCurrentTenant(), id)
                .orElseThrow(() -> new RuntimeException("Period not found"));
        period.setClosed(true);
        repository.save(period);
    }

    @Transactional
    public void reopenPeriod(UUID id) {
        AccountingPeriod period = repository.findByTenantIdAndId(TenantContext.getCurrentTenant(), id)
                .orElseThrow(() -> new RuntimeException("Period not found"));
        period.setClosed(false);
        repository.save(period);
    }
}
