package com.university.finance.service;

import com.university.finance.config.TenantContext;
import com.university.finance.dto.VendorBillDto;
import com.university.finance.model.Vendor;
import com.university.finance.model.VendorBill;
import com.university.finance.repository.VendorBillRepository;
import com.university.finance.repository.VendorRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class VendorService {

    @Autowired
    private VendorRepository vendorRepository;

    @Autowired
    private VendorBillRepository vendorBillRepository;

    @Transactional
    public Vendor createVendor(Vendor vendor) {
        vendor.setTenantId(TenantContext.getCurrentTenant());
        vendor.setCreatedAt(LocalDateTime.now());
        return vendorRepository.save(vendor);
    }

    public List<Vendor> getVendors() {
        return vendorRepository.findByTenantId(TenantContext.getCurrentTenant());
    }

    @Transactional
    public VendorBill createBill(VendorBillDto dto) {
        UUID tenantId = TenantContext.getCurrentTenant();
        Vendor vendor = vendorRepository.findById(dto.getVendorId())
                .orElseThrow(() -> new EntityNotFoundException("Vendor not found"));

        if (!vendor.getTenantId().equals(tenantId)) {
             throw new EntityNotFoundException("Access Denied");
        }

        VendorBill bill = new VendorBill();
        bill.setTenantId(tenantId);
        bill.setVendor(vendor);
        bill.setBillNumber(dto.getBillNumber());
        bill.setAmount(dto.getAmount());
        bill.setDueDate(dto.getDueDate());
        bill.setStatus("PENDING");
        bill.setCreatedAt(LocalDateTime.now());

        return vendorBillRepository.save(bill);
    }

    public List<VendorBill> getBills(String status) {
        UUID tenantId = TenantContext.getCurrentTenant();
        if (status != null) {
            return vendorBillRepository.findByTenantIdAndStatus(tenantId, status);
        }
        return vendorBillRepository.findByTenantId(tenantId);
    }

    @Transactional
    public VendorBill approveBill(UUID id) {
        VendorBill bill = vendorBillRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Bill not found"));
        if (!bill.getTenantId().equals(TenantContext.getCurrentTenant())) {
             throw new EntityNotFoundException("Access Denied");
        }
        bill.setStatus("APPROVED");
        return vendorBillRepository.save(bill);
    }

    @Transactional
    public VendorBill payBill(UUID id) {
        VendorBill bill = vendorBillRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Bill not found"));
        if (!bill.getTenantId().equals(TenantContext.getCurrentTenant())) {
             throw new EntityNotFoundException("Access Denied");
        }
        if (!"APPROVED".equals(bill.getStatus())) {
            throw new IllegalStateException("Bill must be APPROVED before payment");
        }
        bill.setStatus("PAID");
        // Here we would create a Journal Entry or Outgoing Payment record in a real system.
        return vendorBillRepository.save(bill);
    }
}
