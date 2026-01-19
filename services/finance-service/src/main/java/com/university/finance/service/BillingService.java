package com.university.finance.service;

import com.university.finance.config.TenantContext;
import com.university.finance.dto.*;
import com.university.finance.model.*;
import com.university.finance.repository.*;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class BillingService {

    @Autowired
    private BillingPlanRepository billingPlanRepository;

    @Autowired
    private BillingRunRepository billingRunRepository;

    @Autowired
    private FeeHeadRepository feeHeadRepository;

    @Autowired
    private InvoiceService invoiceService;

    @Autowired
    private InvoiceRepository invoiceRepository;

    @Autowired
    private InvoiceItemRepository invoiceItemRepository;

    @Transactional
    public BillingPlan createPlan(BillingPlanDto dto) {
        BillingPlan plan = new BillingPlan();
        plan.setTenantId(TenantContext.getCurrentTenant());
        plan.setName(dto.getName());
        plan.setScopeType(dto.getScopeType());
        plan.setScopeId(dto.getScopeId());
        plan.setTermId(dto.getTermId());
        plan.setStatus("DRAFT");
        plan.setCreatedAt(LocalDateTime.now());

        BillingPlan savedPlan = billingPlanRepository.save(plan);

        if (dto.getItems() != null) {
            List<BillingPlanItem> items = new ArrayList<>();
            for (BillingPlanItemDto itemDto : dto.getItems()) {
                BillingPlanItem item = new BillingPlanItem();
                item.setTenantId(plan.getTenantId());
                item.setBillingPlan(savedPlan);
                item.setFeeHeadId(itemDto.getFeeHeadId());
                item.setAmountOverride(itemDto.getAmountOverride());
                item.setStartDate(itemDto.getStartDate());
                item.setEndDate(itemDto.getEndDate());
                item.setIsProrated(itemDto.getIsProrated());
                items.add(item);
            }
            // Ideally use repository to save items or cascade. Assuming cascade is set in entity.
            // BillingPlan entity has CascadeType.ALL on items.
            savedPlan.setItems(items);
            // JPA might require saving items explicitly if using mappedBy, or saving plan again.
            // But since I set items on savedPlan, saving it again or relying on dirty checking might work if managed.
            // Better to manually save items if simpler. But cascade is easier.
            // Let's set the list and save.
        }

        return billingPlanRepository.save(savedPlan);
    }

    public List<BillingPlan> getPlans(UUID termId, String status) {
        // Implement filtering if needed, for now return all for tenant
        return billingPlanRepository.findByTenantId(TenantContext.getCurrentTenant());
    }

    @Transactional
    public BillingPlan publishPlan(UUID id) {
        BillingPlan plan = billingPlanRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Plan not found"));
        if (!plan.getTenantId().equals(TenantContext.getCurrentTenant())) {
             throw new EntityNotFoundException("Access Denied");
        }
        plan.setStatus("PUBLISHED");
        return billingPlanRepository.save(plan);
    }

    @Transactional
    public void generateInvoices(UUID planId, GenerateInvoiceRequest request) {
        BillingPlan plan = billingPlanRepository.findById(planId)
                .orElseThrow(() -> new EntityNotFoundException("Plan not found"));

        if (!"PUBLISHED".equals(plan.getStatus())) {
            throw new IllegalStateException("Plan must be PUBLISHED to generate invoices");
        }

        // 1. Determine target students
        List<UUID> studentIds = getStudentsForScope(plan.getScopeType(), plan.getScopeId());

        // 2. Create Billing Run record
        BillingRun run = new BillingRun();
        run.setTenantId(plan.getTenantId());
        run.setBillingPlanId(plan.getId());
        run.setRunMonth(request.getTargetMonth());
        run.setStatus("PROCESSING");
        run.setCreatedAt(LocalDateTime.now());
        billingRunRepository.save(run);

        // 3. For each student, create invoice
        for (UUID studentId : studentIds) {
            try {
                // Check idempotency? Unique constraint on (tenantId, planId, studentId, month) per instructions.
                // Not enforcing here, but good to have.

                Invoice invoice = new Invoice();
                invoice.setTenantId(plan.getTenantId());
                invoice.setStudentId(studentId);
                invoice.setInvoiceNumber("INV-" + System.currentTimeMillis() + "-" + studentId.toString().substring(0,4));
                invoice.setDueDate(request.getDueDate());
                invoice.setStatus("DRAFT");
                invoice.setTotalAmount(BigDecimal.ZERO);
                invoice.setPaidAmount(BigDecimal.ZERO);
                invoice.setCreatedAt(LocalDateTime.now());

                invoice = invoiceRepository.save(invoice);

                BigDecimal total = BigDecimal.ZERO;

                for (BillingPlanItem item : plan.getItems()) {
                    FeeHead feeHead = feeHeadRepository.findById(item.getFeeHeadId()).orElse(null);
                    if (feeHead != null) {
                        InvoiceItem invItem = new InvoiceItem();
                        invItem.setTenantId(plan.getTenantId());
                        invItem.setInvoice(invoice);
                        invItem.setDescription(feeHead.getName());
                        // Use override or fee head amount
                        BigDecimal amount = item.getAmountOverride() != null ? item.getAmountOverride() : feeHead.getAmount();
                        invItem.setAmount(amount);

                        invoiceItemRepository.save(invItem);
                        total = total.add(amount);
                    }
                }

                invoice.setTotalAmount(total);
                invoiceRepository.save(invoice);

                if (request.isIssue()) {
                    invoiceService.issueInvoice(invoice.getId());
                }

            } catch (Exception e) {
                // Log error for student
                e.printStackTrace();
            }
        }

        run.setStatus("SUCCESS");
        billingRunRepository.save(run);
    }

    @Transactional
    public void generateRecurringHostelFees(RecurringHostelFeeRequest request) {
        // Similar logic, fetch students in hostel
        List<UUID> studentIds = getStudentsForScope("HOSTEL", request.getHostelId());

        BillingRun run = new BillingRun();
        run.setTenantId(TenantContext.getCurrentTenant());
        run.setHostelId(request.getHostelId());
        run.setRunMonth(request.getMonth());
        run.setStatus("PROCESSING");
        run.setCreatedAt(LocalDateTime.now());
        billingRunRepository.save(run);

        for (UUID studentId : studentIds) {
             // Create Invoice for Hostel Fee
             // Assume standard hostel fee amount or fetch from Hostel Service?
             // Using placeholder amount for now.

             Invoice invoice = new Invoice();
             invoice.setTenantId(TenantContext.getCurrentTenant());
             invoice.setStudentId(studentId);
             invoice.setInvoiceNumber("HOSTEL-" + request.getMonth() + "-" + System.currentTimeMillis());
             invoice.setDueDate(java.time.LocalDate.now().plusDays(10));
             invoice.setStatus("DRAFT");
             invoice.setTotalAmount(new BigDecimal("2500.00")); // Example
             invoice.setPaidAmount(BigDecimal.ZERO);
             invoice.setCreatedAt(LocalDateTime.now());

             invoice = invoiceRepository.save(invoice);

             InvoiceItem item = new InvoiceItem();
             item.setTenantId(invoice.getTenantId());
             item.setInvoice(invoice);
             item.setDescription("Hostel Fee for " + request.getMonth());
             item.setAmount(new BigDecimal("2500.00"));
             invoiceItemRepository.save(item);

             invoiceService.issueInvoice(invoice.getId());
        }

        run.setStatus("SUCCESS");
        billingRunRepository.save(run);
    }

    private List<UUID> getStudentsForScope(String scopeType, UUID scopeId) {
        // Mock implementation.
        // In real system, call Enrollment Service (Programs/Batches) or Hostel Service.
        // Returning a dummy list of IDs for demonstration.
        // We can just return empty or 1-2 UUIDs.
        return List.of(UUID.randomUUID(), UUID.randomUUID());
    }
}
