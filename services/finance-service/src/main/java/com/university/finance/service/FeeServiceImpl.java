package com.university.finance.service;

import com.university.finance.dto.FeeTermDto;
import com.university.finance.dto.StudentFeeDto;
import com.university.finance.model.FeeTerm;
import com.university.finance.model.FeeTermLine;
import com.university.finance.model.StudentFeeDetails;
import com.university.finance.repository.FeeTermRepository;
import com.university.finance.repository.StudentFeeDetailsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FeeServiceImpl implements FeeService {

    private final FeeTermRepository feeTermRepository;
    private final StudentFeeDetailsRepository studentFeeDetailsRepository;

    @Override
    @Transactional(readOnly = true)
    public List<FeeTermDto> getAllFeeTerms() {
        return feeTermRepository.findAll().stream()
                .map(FeeTermDto::fromEntity)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public FeeTermDto createFeeTerm(FeeTermDto feeTermDto) {
        FeeTerm feeTerm = new FeeTerm();
        feeTerm.setName(feeTermDto.getName());
        feeTerm.setActive(feeTermDto.isActive());
        feeTerm.setCompanyId(feeTermDto.getCompanyId());
        feeTerm.setType(feeTermDto.getType());
        feeTerm.setTenantId("default"); // TODO: Get from context
        feeTerm.setCode(UUID.randomUUID().toString().substring(0, 8)); // Generate code

        // Basic mapping for lines can be added here

        FeeTerm savedTerm = feeTermRepository.save(feeTerm);
        return FeeTermDto.fromEntity(savedTerm);
    }

    @Override
    @Transactional(readOnly = true)
    public List<StudentFeeDto> getStudentFees(String studentId) {
        return studentFeeDetailsRepository.findByStudentId(studentId).stream()
                .map(this::mapToStudentFeeDto)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public StudentFeeDto generateStudentFees(String studentId, String feeTermId) {
        // Logic to generate fees based on the term
        // This is a simplified version
        StudentFeeDetails feeDetails = new StudentFeeDetails();
        feeDetails.setStudentId(studentId);
        feeDetails.setTenantId("default");
        feeDetails.setTotalAmount(BigDecimal.ZERO); // Calculate based on lines
        feeDetails.setPaid(false);

        StudentFeeDetails savedDetails = studentFeeDetailsRepository.save(feeDetails);
        return mapToStudentFeeDto(savedDetails);
    }

    private StudentFeeDto mapToStudentFeeDto(StudentFeeDetails entity) {
        StudentFeeDto dto = new StudentFeeDto();
        dto.setId(entity.getId().toString());
        dto.setStudentId(entity.getStudentId());
        dto.setTotalAmount(entity.getTotalAmount());
        dto.setPaid(entity.isPaid());
        if (entity.getInvoice() != null) {
            dto.setInvoiceId(entity.getInvoice().getId().toString());
        }
        return dto;
    }
}
