package com.university.finance.repository;

import com.university.finance.model.Payslip;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.UUID;

public interface PayslipRepository extends JpaRepository<Payslip, UUID> {
    List<Payslip> findByPayrollRunId(UUID payrollRunId);
}
