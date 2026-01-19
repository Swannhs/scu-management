package com.university.finance.controller;

import com.university.finance.dto.FeeHeadDto;
import com.university.finance.model.FeeHead;
import com.university.finance.model.FeeStructure;
import com.university.finance.service.FeeStructureService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/v1/fee-structures")
public class FeeStructureController {

    @Autowired
    private FeeStructureService service;

    @PostMapping
    public FeeStructure create(@RequestBody FeeStructure feeStructure) {
        return service.createStructure(feeStructure);
    }

    @GetMapping
    public List<FeeStructure> getAll() {
        return service.getAllStructures();
    }

    @PostMapping("/{id}/heads")
    public ResponseEntity<FeeHead> addHead(@PathVariable UUID id, @RequestBody FeeHeadDto dto) {
        return ResponseEntity.ok(service.addHead(id, dto));
    }

    @GetMapping("/{id}/heads")
    public List<FeeHead> getHeads(@PathVariable UUID id) {
        return service.getHeads(id);
    }

    @PatchMapping("/{id}/heads/{headId}")
    public ResponseEntity<FeeHead> updateHead(@PathVariable UUID id, @PathVariable UUID headId, @RequestBody FeeHeadDto dto) {
        return ResponseEntity.ok(service.updateHead(id, headId, dto));
    }

    @DeleteMapping("/{id}/heads/{headId}")
    public ResponseEntity<Void> deleteHead(@PathVariable UUID id, @PathVariable UUID headId) {
        service.deleteHead(id, headId);
        return ResponseEntity.noContent().build();
    }
}
