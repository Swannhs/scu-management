package com.university.finance.service;

import com.university.finance.config.TenantContext;
import com.university.finance.dto.JournalEntryDto;
import com.university.finance.dto.JournalEntryLineDto;
import com.university.finance.model.Account;
import com.university.finance.model.JournalEntry;
import com.university.finance.model.JournalEntryLine;
import com.university.finance.model.JournalEntryStatus;
import com.university.finance.repository.AccountRepository;
import com.university.finance.repository.AccountingPeriodRepository;
import com.university.finance.repository.JournalEntryRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class JournalEntryService {

    private final JournalEntryRepository journalEntryRepository;
    private final AccountRepository accountRepository;
    private final AccountingPeriodRepository accountingPeriodRepository;

    public JournalEntryService(JournalEntryRepository journalEntryRepository,
                               AccountRepository accountRepository,
                               AccountingPeriodRepository accountingPeriodRepository) {
        this.journalEntryRepository = journalEntryRepository;
        this.accountRepository = accountRepository;
        this.accountingPeriodRepository = accountingPeriodRepository;
    }

    @Transactional
    public JournalEntryDto createJournalEntry(JournalEntryDto dto) {
        UUID tenantId = TenantContext.getCurrentTenant();

        // 1. Validate Period
        if (accountingPeriodRepository.isDateInClosedPeriod(tenantId, dto.getDate())) {
            throw new RuntimeException("Cannot post to a closed period");
        }

        // 2. Validate Balancing
        Map<String, Long> debits = dto.getLines().stream()
                .collect(Collectors.groupingBy(JournalEntryLineDto::getCurrency,
                        Collectors.summingLong(JournalEntryLineDto::getDebit)));
        Map<String, Long> credits = dto.getLines().stream()
                .collect(Collectors.groupingBy(JournalEntryLineDto::getCurrency,
                        Collectors.summingLong(JournalEntryLineDto::getCredit)));

        for (String currency : debits.keySet()) {
            long debitSum = debits.get(currency);
            long creditSum = credits.getOrDefault(currency, 0L);
            if (debitSum != creditSum) {
                throw new RuntimeException("Debits and Credits do not match for currency: " + currency);
            }
        }

        // 3. Create Entity
        JournalEntry entry = new JournalEntry();
        entry.setTenantId(tenantId);
        entry.setDate(dto.getDate());
        entry.setMemo(dto.getMemo());
        entry.setRefType(dto.getRefType());
        entry.setRefId(dto.getRefId());
        entry.setStatus(JournalEntryStatus.POSTED);

        List<JournalEntryLine> lines = new ArrayList<>();
        for (JournalEntryLineDto lineDto : dto.getLines()) {
            Account account = accountRepository.findByTenantIdAndId(tenantId, lineDto.getAccountId())
                    .orElseThrow(() -> new RuntimeException("Account not found: " + lineDto.getAccountId()));

            if (!account.isPosting()) {
                throw new RuntimeException("Cannot post to non-posting account: " + account.getName());
            }

            JournalEntryLine line = new JournalEntryLine();
            line.setTenantId(tenantId);
            line.setJournalEntry(entry);
            line.setAccount(account);
            line.setDebit(lineDto.getDebit());
            line.setCredit(lineDto.getCredit());
            line.setCurrency(lineDto.getCurrency());
            lines.add(line);
        }
        entry.setLines(lines);

        JournalEntry saved = journalEntryRepository.save(entry);

        // Map back to DTO
        return mapToDto(saved);
    }

    public List<JournalEntryDto> getJournalEntries() {
        return journalEntryRepository.findByTenantId(TenantContext.getCurrentTenant()).stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public JournalEntryDto getJournalEntry(UUID id) {
        JournalEntry entry = journalEntryRepository.findByTenantIdAndId(TenantContext.getCurrentTenant(), id)
                .orElseThrow(() -> new RuntimeException("Journal Entry not found"));
        return mapToDto(entry);
    }

    @Transactional
    public void reverseJournalEntry(UUID id) {
        UUID tenantId = TenantContext.getCurrentTenant();

        if (accountingPeriodRepository.isDateInClosedPeriod(tenantId, java.time.LocalDate.now())) {
            throw new RuntimeException("Cannot reverse in a closed period");
        }

        JournalEntry original = journalEntryRepository.findByTenantIdAndId(tenantId, id)
                .orElseThrow(() -> new RuntimeException("Journal Entry not found"));

        if (original.getStatus() == JournalEntryStatus.REVERSED) {
            throw new RuntimeException("Journal Entry already reversed");
        }

        // Create Reversal Entry
        JournalEntry reversal = new JournalEntry();
        reversal.setTenantId(tenantId);
        reversal.setDate(java.time.LocalDate.now()); // Reversal date is usually today
        reversal.setMemo("Reversal of " + original.getMemo());
        reversal.setRefType(original.getRefType());
        reversal.setRefId(original.getRefId());
        reversal.setStatus(JournalEntryStatus.POSTED);

        List<JournalEntryLine> lines = new ArrayList<>();
        for (JournalEntryLine originalLine : original.getLines()) {
            JournalEntryLine line = new JournalEntryLine();
            line.setTenantId(tenantId);
            line.setJournalEntry(reversal);
            line.setAccount(originalLine.getAccount());
            // Swap debit and credit
            line.setDebit(originalLine.getCredit());
            line.setCredit(originalLine.getDebit());
            line.setCurrency(originalLine.getCurrency());
            lines.add(line);
        }
        reversal.setLines(lines);

        journalEntryRepository.save(reversal);

        original.setStatus(JournalEntryStatus.REVERSED);
        journalEntryRepository.save(original);
    }

    private JournalEntryDto mapToDto(JournalEntry entry) {
        JournalEntryDto dto = new JournalEntryDto();
        dto.setId(entry.getId());
        dto.setDate(entry.getDate());
        dto.setMemo(entry.getMemo());
        dto.setRefType(entry.getRefType());
        dto.setRefId(entry.getRefId());
        dto.setStatus(entry.getStatus());
        dto.setLines(entry.getLines().stream().map(line -> {
            JournalEntryLineDto lineDto = new JournalEntryLineDto();
            lineDto.setId(line.getId());
            lineDto.setAccountId(line.getAccount().getId());
            lineDto.setDebit(line.getDebit());
            lineDto.setCredit(line.getCredit());
            lineDto.setCurrency(line.getCurrency());
            return lineDto;
        }).collect(Collectors.toList()));
        return dto;
    }
}
