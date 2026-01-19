package com.university.finance.service;

import com.university.finance.config.TenantContext;
import com.university.finance.dto.FeeHeadDto;
import com.university.finance.model.FeeHead;
import com.university.finance.model.FeeStructure;
import com.university.finance.repository.FeeHeadRepository;
import com.university.finance.repository.FeeStructureRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class FeeStructureService {

    @Autowired
    private FeeStructureRepository feeStructureRepository;

    @Autowired
    private FeeHeadRepository feeHeadRepository;

    @Transactional
    public FeeStructure createStructure(FeeStructure structure) {
        structure.setTenantId(TenantContext.getCurrentTenant());
        structure.setCreatedAt(LocalDateTime.now());
        return feeStructureRepository.save(structure);
    }

    public List<FeeStructure> getAllStructures() {
        return feeStructureRepository.findByTenantId(TenantContext.getCurrentTenant());
    }

    @Transactional
    public FeeHead addHead(UUID structureId, FeeHeadDto dto) {
        FeeStructure structure = feeStructureRepository.findById(structureId)
                .orElseThrow(() -> new EntityNotFoundException("Fee Structure not found"));

        if (!structure.getTenantId().equals(TenantContext.getCurrentTenant())) {
             throw new EntityNotFoundException("Access Denied");
        }

        FeeHead head = new FeeHead();
        head.setTenantId(structure.getTenantId());
        head.setFeeStructure(structure);
        head.setName(dto.getName());
        head.setType(dto.getType());
        head.setAmount(dto.getAmount());
        head.setIncomeAccountId(dto.getIncomeAccountId());
        head.setIsRecurring(dto.getIsRecurring());
        head.setFrequency(dto.getFrequency());
        head.setIsOptional(dto.getIsOptional());

        return feeHeadRepository.save(head);
    }

    @Transactional
    public FeeHead updateHead(UUID structureId, UUID headId, FeeHeadDto dto) {
         FeeHead head = feeHeadRepository.findById(headId)
                 .orElseThrow(() -> new EntityNotFoundException("Fee Head not found"));

         if (!head.getFeeStructure().getId().equals(structureId)) {
             throw new IllegalArgumentException("Head does not belong to this structure");
         }
         if (!head.getTenantId().equals(TenantContext.getCurrentTenant())) {
             throw new EntityNotFoundException("Access Denied");
         }

         head.setName(dto.getName());
         head.setType(dto.getType());
         head.setAmount(dto.getAmount());
         head.setIncomeAccountId(dto.getIncomeAccountId());
         head.setIsRecurring(dto.getIsRecurring());
         head.setFrequency(dto.getFrequency());
         head.setIsOptional(dto.getIsOptional());

         return feeHeadRepository.save(head);
    }

    @Transactional
    public void deleteHead(UUID structureId, UUID headId) {
        FeeHead head = feeHeadRepository.findById(headId)
                .orElseThrow(() -> new EntityNotFoundException("Fee Head not found"));

        if (!head.getFeeStructure().getId().equals(structureId)) {
            throw new IllegalArgumentException("Head does not belong to this structure");
        }
        if (!head.getTenantId().equals(TenantContext.getCurrentTenant())) {
            throw new EntityNotFoundException("Access Denied");
        }

        feeHeadRepository.delete(head);
    }

    public List<FeeHead> getHeads(UUID structureId) {
        FeeStructure structure = feeStructureRepository.findById(structureId)
                .orElseThrow(() -> new EntityNotFoundException("Fee Structure not found"));
         if (!structure.getTenantId().equals(TenantContext.getCurrentTenant())) {
             throw new EntityNotFoundException("Access Denied");
        }
        return structure.getHeads();
    }
}
