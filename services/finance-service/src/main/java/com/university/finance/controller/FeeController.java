package com.university.finance.controller;

import com.university.finance.dto.FeeTermDto;
import com.university.finance.dto.StudentFeeDto;
import com.university.finance.service.FeeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/finance")
@RequiredArgsConstructor
public class FeeController {

    private final FeeService feeService;

    @GetMapping("/terms")
    public ResponseEntity<List<FeeTermDto>> getAllFeeTerms() {
        return ResponseEntity.ok(feeService.getAllFeeTerms());
    }

    @PostMapping("/terms")
    public ResponseEntity<FeeTermDto> createFeeTerm(@RequestBody FeeTermDto feeTermDto) {
        return ResponseEntity.ok(feeService.createFeeTerm(feeTermDto));
    }

    @GetMapping("/student-fees/{studentId}")
    public ResponseEntity<List<StudentFeeDto>> getStudentFees(@PathVariable String studentId) {
        return ResponseEntity.ok(feeService.getStudentFees(studentId));
    }

    @PostMapping("/student-fees/generate")
    public ResponseEntity<StudentFeeDto> generateStudentFees(
            @RequestParam String studentId,
            @RequestParam String feeTermId) {
        return ResponseEntity.ok(feeService.generateStudentFees(studentId, feeTermId));
    }
}
