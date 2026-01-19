package com.university.finance.controller;

import com.university.finance.service.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/v1/finance/reports")
public class ReportController {

    @Autowired
    private ReportService service;

    @GetMapping("/trial-balance")
    public List<Map<String, Object>> getTrialBalance(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate from,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate to) {
        return service.getTrialBalanceReport(from, to);
    }

    @GetMapping("/income-statement")
    public Map<String, Object> getIncomeStatement(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate from,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate to) {
        return service.getIncomeStatement(from, to);
    }

    @GetMapping("/balance-sheet")
    public Map<String, Object> getBalanceSheet(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate asOf) {
        return service.getBalanceSheet(asOf);
    }
}
