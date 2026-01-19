package com.university.finance.repository;

import com.university.finance.model.FeeHead;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

public interface FeeHeadRepository extends JpaRepository<FeeHead, UUID> {
}
