package com.university.finance.controller;

import com.university.finance.dto.PayrollRunDto;
import com.university.finance.model.PayrollRun;
import com.university.finance.model.Payslip;
import com.university.finance.model.StaffProfile;
import com.university.finance.service.PayrollService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/v1/payroll")
public class PayrollController {

    @Autowired
    private PayrollService service;

    @PostMapping("/staff-profiles")
    public ResponseEntity<StaffProfile> createStaffProfile(@RequestBody StaffProfile profile) {
        return ResponseEntity.ok(service.createStaffProfile(profile));
    }

    @GetMapping("/staff-profiles")
    public List<StaffProfile> getStaffProfiles() {
        return service.getStaffProfiles();
    }

    @PostMapping("/runs")
    public ResponseEntity<PayrollRun> createPayrollRun(@RequestBody PayrollRunDto dto) {
        return ResponseEntity.ok(service.createPayrollRun(dto));
    }

    @PostMapping("/runs/{id}/calculate")
    public ResponseEntity<PayrollRun> calculatePayrollRun(@PathVariable UUID id) {
        return ResponseEntity.ok(service.calculatePayrollRun(id));
    }

    @PostMapping("/runs/{id}/approve")
    public ResponseEntity<PayrollRun> approvePayrollRun(@PathVariable UUID id) {
        return ResponseEntity.ok(service.approvePayrollRun(id));
    }

    @PostMapping("/runs/{id}/pay")
    public ResponseEntity<PayrollRun> payPayrollRun(@PathVariable UUID id) {
        return ResponseEntity.ok(service.payPayrollRun(id));
    }

    @GetMapping("/runs/{id}/payslips")
    public List<Payslip> getPayslips(@PathVariable UUID id) {
        return service.getPayslips(id);
    }
}
