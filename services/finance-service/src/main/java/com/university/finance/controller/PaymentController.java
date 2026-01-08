package com.university.finance.controller;

import com.university.finance.config.TenantContext;
import com.university.finance.config.UserContext;
import com.university.finance.model.Payment;
import com.university.finance.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/v1/payments")
public class PaymentController {

    @Autowired
    private PaymentRepository repository;

    @GetMapping
    public List<Payment> getAll() {
        return repository.findByTenantId(TenantContext.getCurrentTenant());
    }

    @GetMapping("/my")
    public List<Payment> getMyPayments() {
        UUID currentUser = UserContext.getCurrentUser();
        if (currentUser == null) {
            throw new RuntimeException("User Context Missing");
        }
        return repository.findByTenantIdAndInvoiceStudentId(TenantContext.getCurrentTenant(), currentUser);
    }
}
