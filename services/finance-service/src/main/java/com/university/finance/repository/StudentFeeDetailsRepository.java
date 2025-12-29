package com.university.finance.repository;

import com.university.finance.model.StudentFeeDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface StudentFeeDetailsRepository extends JpaRepository<StudentFeeDetails, UUID> {
    List<StudentFeeDetails> findByStudentId(String studentId);
}
