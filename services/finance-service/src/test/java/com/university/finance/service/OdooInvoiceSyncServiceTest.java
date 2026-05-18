package com.university.finance.service;

import com.university.finance.model.Invoice;
import com.university.finance.repository.InvoiceRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class OdooInvoiceSyncServiceTest {

    @Mock
    private OdooClient odooClient;

    @Mock
    private InvoiceRepository invoiceRepository;

    @InjectMocks
    private OdooInvoiceSyncService syncService;

    @Test
    void syncIssuedInvoice_ShouldStorePartnerInvoiceAndSyncedStatus() {
        Invoice invoice = baseInvoice();

        when(invoiceRepository.save(any(Invoice.class))).thenAnswer(i -> i.getArgument(0));
        doNothing().when(odooClient).validateConfig();
        when(odooClient.ensureStudentPartner(invoice)).thenReturn("10");
        when(odooClient.createInvoice("10", invoice)).thenReturn("200");

        Invoice result = syncService.syncIssuedInvoice(invoice);

        assertEquals("10", result.getOdooPartnerId());
        assertEquals("200", result.getOdooInvoiceId());
        assertEquals("SYNCED", result.getOdooSyncStatus());
        assertNull(result.getOdooSyncError());
    }

    @Test
    void syncIssuedInvoice_WhenOdooFails_ShouldStoreFailedStatusAndSafeError() {
        Invoice invoice = baseInvoice();

        when(invoiceRepository.save(any(Invoice.class))).thenAnswer(i -> i.getArgument(0));
        doThrow(new IllegalStateException("password=abc123"))
                .when(odooClient).validateConfig();

        Invoice result = syncService.syncIssuedInvoice(invoice);

        assertEquals("FAILED", result.getOdooSyncStatus());
        assertNotNull(result.getOdooSyncError());
        assertFalse(result.getOdooSyncError().contains("abc123"));
    }

    private Invoice baseInvoice() {
        Invoice invoice = new Invoice();
        invoice.setId(UUID.randomUUID());
        invoice.setTenantId(UUID.randomUUID());
        invoice.setStudentId(UUID.randomUUID());
        invoice.setInvoiceNumber("INV-1");
        invoice.setTotalAmount(new BigDecimal("99.00"));
        invoice.setPaidAmount(BigDecimal.ZERO);
        invoice.setDueDate(LocalDate.now().plusDays(10));
        invoice.setStatus("ISSUED");
        return invoice;
    }
}
