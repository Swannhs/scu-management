package com.university.finance.service;

import com.university.finance.dto.FeeTermDto;
import com.university.finance.dto.StudentFeeDto;
import com.university.finance.model.StudentFeeDetails;

import java.util.List;

public interface FeeService {
    List<FeeTermDto> getAllFeeTerms();

    FeeTermDto createFeeTerm(FeeTermDto feeTermDto);

    List<StudentFeeDto> getStudentFees(String studentId);

    StudentFeeDto generateStudentFees(String studentId, String feeTermId);
}
