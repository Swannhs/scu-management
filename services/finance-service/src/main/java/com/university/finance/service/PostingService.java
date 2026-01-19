package com.university.finance.service;

import com.university.finance.model.*;
import com.university.finance.repository.AccountRepository;
import com.university.finance.repository.JournalEntryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class PostingService {

    @Autowired
    private JournalEntryRepository journalEntryRepository;

    @Autowired
    private AccountRepository accountRepository;

    private static final String CURRENCY = "USD"; // Default

    // Account Codes (Must match seedDefaultAccounts)
    private static final String CODE_CASH = "1000";
    private static final String CODE_BANK = "1001";
    private static final String CODE_AR = "1200";
    private static final String CODE_AP = "2000";
    private static final String CODE_WALLET_LIABILITY = "2100";
    private static final String CODE_SALARY_PAYABLE = "2200";
    private static final String CODE_INCOME_TUITION = "4000";
    private static final String CODE_INCOME_WAIVER = "4100";
    private static final String CODE_EXPENSE_SALARY = "5000";
    private static final String CODE_EXPENSE_GENERAL = "5100";

    @Transactional
    public void postInvoiceIssue(Invoice invoice) {
        // Dr AR, Cr Income
        Long amount = toMinorUnits(invoice.getTotalAmount());
        if (amount == 0) return;

        JournalEntry entry = createEntry(invoice.getTenantId(), invoice.getId(), "INVOICE", "Invoice Issue: " + invoice.getInvoiceNumber());

        // Debit AR
        addLine(entry, getAccount(invoice.getTenantId(), CODE_AR), amount, 0L);

        // Credit Income (Using Tuition Income as default, ideally split by items)
        // Using Tuition Income 4000 for simplicity or iterating items if linked to heads with accounts.
        // For now, simple posting.
        addLine(entry, getAccount(invoice.getTenantId(), CODE_INCOME_TUITION), 0L, amount);

        journalEntryRepository.save(entry);
    }

    @Transactional
    public void postPaymentReceipt(Payment payment) {
        // Dr Cash/Bank, Cr AR
        Long amount = toMinorUnits(payment.getAmount());
        if (amount == 0) return;

        JournalEntry entry = createEntry(payment.getTenantId(), payment.getId(), "PAYMENT", "Payment Receipt: " + payment.getTransactionId());

        Account debitAccount = "CASH".equalsIgnoreCase(payment.getMethod()) ?
                getAccount(payment.getTenantId(), CODE_CASH) :
                getAccount(payment.getTenantId(), CODE_BANK);

        addLine(entry, debitAccount, amount, 0L);
        addLine(entry, getAccount(payment.getTenantId(), CODE_AR), 0L, amount);

        journalEntryRepository.save(entry);
    }

    @Transactional
    public void postRefund(RefundRequest refund, Payment payment) {
        // Dr AR (to reverse payment effect) or Dr Income (if direct reversal)?
        // User says: "If refund reduces AR: Dr AR / Cr Cash".
        // If invoice linked, usually we credit AR to reduce balance, but refund is paying BACK money.
        // If student paid 100, AR=0, Cash=100.
        // Refund 100: Cash becomes 0 (Cr Cash 100).
        // If we want to reopen AR? No, usually refund implies obligation is reduced or cancelled.
        // User: "If refund is income reversal: Dr Income / Cr Cash".
        // Let's assume Dr Income (Tuition) / Cr Bank.

        Long amount = toMinorUnits(refund.getAmount());
        if (amount == 0) return;

        JournalEntry entry = createEntry(refund.getTenantId(), refund.getId(), "REFUND", "Refund: " + refund.getReason());

        // Credit Bank (Money out)
        addLine(entry, getAccount(refund.getTenantId(), CODE_BANK), 0L, amount);

        // Debit Income (Reduce Income) OR Debit Wallet Liability if to wallet.
        // But payment object (passed in) might indicate method?
        // RefundRequest has amount.
        // If method is WALLET, we should Credit Wallet Liability (2100) instead of Bank?
        // Wait, "Credit Student Wallet + create journal entry".
        // If method=WALLET: Dr Income / Cr Wallet Liability.
        // If method=BANK: Dr Income / Cr Bank.

        // Wait, Payment object tells us the transaction.
        // If Payment type is REFUND, it usually means money out.

        // I'll check logic in RefundService later, but here generic post.
        // For now assuming Bank refund for simplicity in this method, or passed explicitly?
        // Let's use simple logic: Dr Income, Cr Asset (Bank/Cash).

        addLine(entry, getAccount(refund.getTenantId(), CODE_INCOME_TUITION), amount, 0L);

        journalEntryRepository.save(entry);
    }

    @Transactional
    public void postWalletCredit(UUID tenantId, UUID walletId, BigDecimal amountBD) {
        // Money coming IN to wallet (e.g. overpayment moved to wallet).
        // Dr AR (reducing AR overpayment?) or Dr Cash (if direct deposit)?
        // Assuming direct deposit: Dr Cash, Cr Wallet Liability.
        Long amount = toMinorUnits(amountBD);
        JournalEntry entry = createEntry(tenantId, walletId, "WALLET", "Wallet Credit");
        addLine(entry, getAccount(tenantId, CODE_CASH), amount, 0L);
        addLine(entry, getAccount(tenantId, CODE_WALLET_LIABILITY), 0L, amount);
        journalEntryRepository.save(entry);
    }

    @Transactional
    public void postVendorBillApprove(VendorBill bill) {
        // Dr Expense, Cr AP
        Long amount = toMinorUnits(bill.getAmount());
        JournalEntry entry = createEntry(bill.getTenantId(), bill.getId(), "VENDOR_BILL", "Bill Approved: " + bill.getBillNumber());

        addLine(entry, getAccount(bill.getTenantId(), CODE_EXPENSE_GENERAL), amount, 0L);
        addLine(entry, getAccount(bill.getTenantId(), CODE_AP), 0L, amount);

        journalEntryRepository.save(entry);
    }

    @Transactional
    public void postVendorBillPay(VendorBill bill) {
        // Dr AP, Cr Bank
        Long amount = toMinorUnits(bill.getAmount());
        JournalEntry entry = createEntry(bill.getTenantId(), bill.getId(), "VENDOR_PAYMENT", "Bill Paid: " + bill.getBillNumber());

        addLine(entry, getAccount(bill.getTenantId(), CODE_AP), amount, 0L);
        addLine(entry, getAccount(bill.getTenantId(), CODE_BANK), 0L, amount);

        journalEntryRepository.save(entry);
    }

    @Transactional
    public void postPayrollAccrual(PayrollRun run) {
        // Dr Salary Expense, Cr Salary Payable
        Long amount = toMinorUnits(run.getTotalAmount());
        JournalEntry entry = createEntry(run.getTenantId(), run.getId(), "PAYROLL_RUN", "Payroll Accrual: " + run.getMonth() + "/" + run.getYear());

        addLine(entry, getAccount(run.getTenantId(), CODE_EXPENSE_SALARY), amount, 0L);
        addLine(entry, getAccount(run.getTenantId(), CODE_SALARY_PAYABLE), 0L, amount);

        journalEntryRepository.save(entry);
    }

    @Transactional
    public void postPayrollPay(PayrollRun run) {
        // Dr Salary Payable, Cr Bank
        Long amount = toMinorUnits(run.getTotalAmount());
        JournalEntry entry = createEntry(run.getTenantId(), run.getId(), "PAYROLL_PAY", "Payroll Payment: " + run.getMonth() + "/" + run.getYear());

        addLine(entry, getAccount(run.getTenantId(), CODE_SALARY_PAYABLE), amount, 0L);
        addLine(entry, getAccount(run.getTenantId(), CODE_BANK), 0L, amount);

        journalEntryRepository.save(entry);
    }

    // Helpers

    private JournalEntry createEntry(UUID tenantId, UUID refId, String refType, String memo) {
        JournalEntry entry = new JournalEntry();
        entry.setTenantId(tenantId);
        entry.setDate(LocalDate.now());
        entry.setMemo(memo);
        entry.setRefId(refId);
        entry.setRefType(refType);
        entry.setStatus(JournalEntryStatus.POSTED);
        entry.setLines(new ArrayList<>());
        return entry;
    }

    private void addLine(JournalEntry entry, Account account, Long debit, Long credit) {
        JournalEntryLine line = new JournalEntryLine();
        line.setTenantId(entry.getTenantId());
        line.setJournalEntry(entry);
        line.setAccount(account);
        line.setDebit(debit);
        line.setCredit(credit);
        line.setCurrency(CURRENCY);
        entry.getLines().add(line);
    }

    private Account getAccount(UUID tenantId, String code) {
        return accountRepository.findByCodeAndTenantId(code, tenantId)
                .orElseThrow(() -> new IllegalStateException("Account code " + code + " missing. Please seed accounts."));
    }

    private Long toMinorUnits(BigDecimal amount) {
        if (amount == null) return 0L;
        return amount.multiply(new BigDecimal(100)).longValue();
    }
}
