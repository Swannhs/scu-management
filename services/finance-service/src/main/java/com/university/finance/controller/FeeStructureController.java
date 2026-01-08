package com.university.finance.controller;

import com.university.finance.config.TenantContext;
import com.university.finance.model.FeeHead;
import com.university.finance.model.FeeStructure;
import com.university.finance.repository.FeeHeadRepository;
import com.university.finance.repository.FeeStructureRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/v1/fee-structures")
public class FeeStructureController {

    @Autowired
    private FeeStructureRepository repository;

    @Autowired
    private FeeHeadRepository headRepository;

    @PostMapping
    public FeeStructure create(@RequestBody FeeStructure feeStructure) {
        feeStructure.setTenantId(TenantContext.getCurrentTenant());
        return repository.save(feeStructure);
    }

    @GetMapping
    public List<FeeStructure> getAll() {
        return repository.findByTenantId(TenantContext.getCurrentTenant());
    }

    @PostMapping("/{id}/heads")
    public FeeHead addHead(@PathVariable UUID id, @RequestBody FeeHead head) {
        FeeStructure structure = repository.findById(id).orElseThrow(() -> new RuntimeException("Fee Structure not found"));
        if (!structure.getTenantId().equals(TenantContext.getCurrentTenant())) {
             throw new RuntimeException("Access Denied");
        }

        head.setFeeStructure(structure);
        head.setTenantId(TenantContext.getCurrentTenant());
        return headRepository.save(head);
    }
}
