package com.university.finance.service;

import com.university.finance.config.TenantContext;
import com.university.finance.dto.AccountDto;
import com.university.finance.dto.JournalEntryDto;
import com.university.finance.dto.JournalEntryLineDto;
import com.university.finance.model.Account;
import com.university.finance.model.AccountType;
import com.university.finance.repository.AccountRepository;
import com.university.finance.repository.AccountingPeriodRepository;
import com.university.finance.repository.JournalEntryRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class CoreAccountingTest {

    @Mock
    private AccountRepository accountRepository;

    @Mock
    private JournalEntryRepository journalEntryRepository;

    @Mock
    private AccountingPeriodRepository accountingPeriodRepository;

    @InjectMocks
    private JournalEntryService journalEntryService;

    @InjectMocks
    private AccountService accountService;

    private UUID tenantId;

    @BeforeEach
    void setUp() {
        tenantId = UUID.randomUUID();
        TenantContext.setCurrentTenant(tenantId);
    }

    @AfterEach
    void tearDown() {
        TenantContext.clear();
    }

    @Test
    void createAccount_ShouldSucceed() {
        AccountDto dto = new AccountDto();
        dto.setCode("1001");
        dto.setName("Cash");
        dto.setType(AccountType.ASSET);
        dto.setPosting(true);

        when(accountRepository.save(any(Account.class))).thenAnswer(invocation -> {
            Account a = invocation.getArgument(0);
            a.setId(UUID.randomUUID());
            return a;
        });

        AccountDto created = accountService.createAccount(dto);
        assertNotNull(created.getId());
        assertEquals("Cash", created.getName());
    }

    @Test
    void createJournalEntry_ShouldFail_WhenDebitsNotEqualCredits() {
        JournalEntryDto dto = new JournalEntryDto();
        dto.setDate(LocalDate.now());

        JournalEntryLineDto line1 = new JournalEntryLineDto();
        line1.setDebit(100L);
        line1.setCredit(0L);
        line1.setCurrency("USD");

        JournalEntryLineDto line2 = new JournalEntryLineDto();
        line2.setDebit(0L);
        line2.setCredit(90L); // Mismatch
        line2.setCurrency("USD");

        dto.setLines(List.of(line1, line2));

        // Mock period check to pass
        when(accountingPeriodRepository.isDateInClosedPeriod(eq(tenantId), any())).thenReturn(false);

        assertThrows(RuntimeException.class, () -> journalEntryService.createJournalEntry(dto));
    }

    @Test
    void createJournalEntry_ShouldFail_WhenPeriodClosed() {
        JournalEntryDto dto = new JournalEntryDto();
        dto.setDate(LocalDate.now());

        when(accountingPeriodRepository.isDateInClosedPeriod(eq(tenantId), any())).thenReturn(true);

        assertThrows(RuntimeException.class, () -> journalEntryService.createJournalEntry(dto));
    }

    @Test
    void createJournalEntry_ShouldSucceed_WhenBalancedAndOpen() {
        UUID accountId1 = UUID.randomUUID();
        UUID accountId2 = UUID.randomUUID();

        JournalEntryDto dto = new JournalEntryDto();
        dto.setDate(LocalDate.now());

        JournalEntryLineDto line1 = new JournalEntryLineDto();
        line1.setAccountId(accountId1);
        line1.setDebit(100L);
        line1.setCredit(0L);
        line1.setCurrency("USD");

        JournalEntryLineDto line2 = new JournalEntryLineDto();
        line2.setAccountId(accountId2);
        line2.setDebit(0L);
        line2.setCredit(100L);
        line2.setCurrency("USD");

        dto.setLines(List.of(line1, line2));

        Account acct1 = new Account(); acct1.setPosting(true); acct1.setId(accountId1);
        Account acct2 = new Account(); acct2.setPosting(true); acct2.setId(accountId2);

        when(accountingPeriodRepository.isDateInClosedPeriod(eq(tenantId), any())).thenReturn(false);
        when(accountRepository.findByTenantIdAndId(eq(tenantId), eq(accountId1))).thenReturn(Optional.of(acct1));
        when(accountRepository.findByTenantIdAndId(eq(tenantId), eq(accountId2))).thenReturn(Optional.of(acct2));
        when(journalEntryRepository.save(any())).thenAnswer(i -> {
            com.university.finance.model.JournalEntry je = i.getArgument(0);
            je.setId(UUID.randomUUID());
            je.getLines().forEach(l -> l.setId(UUID.randomUUID()));
            return je;
        });

        JournalEntryDto created = journalEntryService.createJournalEntry(dto);
        assertNotNull(created.getId());
        assertEquals(2, created.getLines().size());
    }

    @Test
    void reverseJournalEntry_ShouldFail_WhenPeriodClosed() {
        UUID journalId = UUID.randomUUID();
        when(accountingPeriodRepository.isDateInClosedPeriod(eq(tenantId), any())).thenReturn(true);

        assertThrows(RuntimeException.class, () -> journalEntryService.reverseJournalEntry(journalId));
    }
}
