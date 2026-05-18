package com.university.finance.service;

import com.university.finance.config.TenantContext;
import com.university.finance.model.Invoice;
import com.university.finance.repository.InvoiceItemRepository;
import com.university.finance.repository.InvoiceRepository;
import com.university.finance.repository.PaymentRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class InvoiceServiceOdooSyncTest {

    @Mock
    private InvoiceRepository invoiceRepository;

    @Mock
    private InvoiceItemRepository invoiceItemRepository;

    @Mock
    private PaymentRepository paymentRepository;

    @Mock
    private OdooInvoiceSyncService odooInvoiceSyncService;

    @InjectMocks
    private InvoiceService invoiceService;

    private UUID tenantId;
    private UUID invoiceId;

    @BeforeEach
    void setUp() {
        tenantId = UUID.randomUUID();
        invoiceId = UUID.randomUUID();
        TenantContext.setCurrentTenant(tenantId);
    }

    @AfterEach
    void tearDown() {
        TenantContext.clear();
    }

    @Test
    void issueInvoice_ShouldSyncAndPersistOdooReferences() {
        Invoice draft = baseInvoice("DRAFT");
        Invoice synced = baseInvoice("ISSUED");
        synced.setOdooPartnerId("123");
        synced.setOdooInvoiceId("456");
        synced.setOdooSyncStatus("SYNCED");

        when(invoiceRepository.findById(invoiceId)).thenReturn(Optional.of(draft));
        when(invoiceRepository.save(any(Invoice.class))).thenAnswer(i -> i.getArgument(0));
        when(odooInvoiceSyncService.syncIssuedInvoice(any(Invoice.class))).thenReturn(synced);

        Invoice result = invoiceService.issueInvoice(invoiceId);

        assertEquals("ISSUED", result.getStatus());
        assertEquals("123", result.getOdooPartnerId());
        assertEquals("456", result.getOdooInvoiceId());
        assertEquals("SYNCED", result.getOdooSyncStatus());
        verify(odooInvoiceSyncService, times(1)).syncIssuedInvoice(any(Invoice.class));
    }

    @Test
    void issueInvoice_WhenSyncFails_ShouldReturnFailedSyncStatus() {
        Invoice draft = baseInvoice("DRAFT");
        Invoice failed = baseInvoice("ISSUED");
        failed.setOdooSyncStatus("FAILED");
        failed.setOdooSyncError("Odoo sync failed");

        when(invoiceRepository.findById(invoiceId)).thenReturn(Optional.of(draft));
        when(invoiceRepository.save(any(Invoice.class))).thenAnswer(i -> i.getArgument(0));
        when(odooInvoiceSyncService.syncIssuedInvoice(any(Invoice.class))).thenReturn(failed);

        Invoice result = invoiceService.issueInvoice(invoiceId);

        assertEquals("ISSUED", result.getStatus());
        assertEquals("FAILED", result.getOdooSyncStatus());
        assertNotNull(result.getOdooSyncError());
        verify(odooInvoiceSyncService, times(1)).syncIssuedInvoice(any(Invoice.class));
    }

    private Invoice baseInvoice(String status) {
        Invoice invoice = new Invoice();
        invoice.setId(invoiceId);
        invoice.setTenantId(tenantId);
        invoice.setStudentId(UUID.randomUUID());
        invoice.setInvoiceNumber("INV-1001");
        invoice.setTotalAmount(new BigDecimal("1000.00"));
        invoice.setPaidAmount(BigDecimal.ZERO);
        invoice.setDueDate(LocalDate.now().plusDays(7));
        invoice.setStatus(status);
        return invoice;
    }
}
