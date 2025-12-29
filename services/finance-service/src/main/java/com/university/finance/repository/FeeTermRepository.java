package com.university.finance.repository;

import com.university.finance.model.FeeTerm;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface FeeTermRepository extends JpaRepository<FeeTerm, UUID> {
}
