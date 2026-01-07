package com.university.finance.controller;

import com.university.finance.config.TenantContext;
import com.university.finance.model.FeeStructure;
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

    @PostMapping
    public FeeStructure create(@RequestBody FeeStructure feeStructure) {
        feeStructure.setTenantId(TenantContext.getCurrentTenant());
        return repository.save(feeStructure);
    }

    @GetMapping
    public List<FeeStructure> getAll() {
        return repository.findByTenantId(TenantContext.getCurrentTenant());
    }
}
