package com.university.finance.service;

import com.university.finance.config.TenantContext;
import com.university.finance.dto.PayrollRunDto;
import com.university.finance.model.PayrollRun;
import com.university.finance.model.Payslip;
import com.university.finance.model.StaffProfile;
import com.university.finance.repository.PayrollRunRepository;
import com.university.finance.repository.PayslipRepository;
import com.university.finance.repository.StaffProfileRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class PayrollService {

    @Autowired
    private StaffProfileRepository staffProfileRepository;

    @Autowired
    private PayrollRunRepository payrollRunRepository;

    @Autowired
    private PayslipRepository payslipRepository;

    @Autowired
    private PostingService postingService;

    @Transactional
    public StaffProfile createStaffProfile(StaffProfile profile) {
        profile.setTenantId(TenantContext.getCurrentTenant());
        profile.setCreatedAt(LocalDateTime.now());
        return staffProfileRepository.save(profile);
    }

    public List<StaffProfile> getStaffProfiles() {
        return staffProfileRepository.findByTenantId(TenantContext.getCurrentTenant());
    }

    @Transactional
    public PayrollRun createPayrollRun(PayrollRunDto dto) {
        PayrollRun run = new PayrollRun();
        run.setTenantId(TenantContext.getCurrentTenant());
        run.setMonth(dto.getMonth());
        run.setYear(dto.getYear());
        run.setStatus("DRAFT");
        run.setTotalAmount(BigDecimal.ZERO);
        run.setCreatedAt(LocalDateTime.now());
        return payrollRunRepository.save(run);
    }

    @Transactional
    public PayrollRun calculatePayrollRun(UUID runId) {
        PayrollRun run = payrollRunRepository.findById(runId)
                .orElseThrow(() -> new EntityNotFoundException("Payroll Run not found"));

        if (!run.getTenantId().equals(TenantContext.getCurrentTenant())) {
             throw new EntityNotFoundException("Access Denied");
        }

        if (!"DRAFT".equals(run.getStatus())) {
            throw new IllegalStateException("Only DRAFT runs can be calculated");
        }

        // Fetch all staff
        List<StaffProfile> staffList = staffProfileRepository.findByTenantId(run.getTenantId());

        BigDecimal total = BigDecimal.ZERO;
        List<Payslip> payslips = new ArrayList<>();

        // Clear existing payslips if re-calculating (not implemented here, assuming fresh calculation or append)
        // For idempotency, we should delete existing payslips for this run first.
        List<Payslip> existing = payslipRepository.findByPayrollRunId(runId);
        payslipRepository.deleteAll(existing);

        for (StaffProfile staff : staffList) {
            Payslip payslip = new Payslip();
            payslip.setTenantId(run.getTenantId());
            payslip.setPayrollRun(run);
            payslip.setStaffProfile(staff);
            payslip.setBasicSalary(staff.getBaseSalary());
            payslip.setDeductions(BigDecimal.ZERO); // Logic for tax/deductions
            payslip.setNetPay(staff.getBaseSalary()); // - deductions
            payslip.setStatus("PENDING");

            payslipRepository.save(payslip);
            payslips.add(payslip);
            total = total.add(payslip.getNetPay());
        }

        run.setTotalAmount(total);
        run.setStatus("CALCULATED");
        return payrollRunRepository.save(run);
    }

    @Transactional
    public PayrollRun approvePayrollRun(UUID runId) {
        PayrollRun run = payrollRunRepository.findById(runId)
                .orElseThrow(() -> new EntityNotFoundException("Payroll Run not found"));

        if (!"CALCULATED".equals(run.getStatus())) {
            throw new IllegalStateException("Only CALCULATED runs can be approved");
        }
        run.setStatus("APPROVED");
        PayrollRun saved = payrollRunRepository.save(run);
        postingService.postPayrollAccrual(saved);
        return saved;
    }

    @Transactional
    public PayrollRun payPayrollRun(UUID runId) {
        PayrollRun run = payrollRunRepository.findById(runId)
                .orElseThrow(() -> new EntityNotFoundException("Payroll Run not found"));

        if (!"APPROVED".equals(run.getStatus())) {
            throw new IllegalStateException("Only APPROVED runs can be paid");
        }

        run.setStatus("PAID");
        // Also update payslips status
        List<Payslip> payslips = payslipRepository.findByPayrollRunId(runId);
        for (Payslip p : payslips) {
            p.setStatus("PAID");
            payslipRepository.save(p);
        }

        PayrollRun saved = payrollRunRepository.save(run);
        postingService.postPayrollPay(saved);
        return saved;
    }

    public List<Payslip> getPayslips(UUID runId) {
        return payslipRepository.findByPayrollRunId(runId);
    }
}
