package com.university.finance.service;

import com.university.finance.model.Invoice;
import com.university.finance.repository.InvoiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
public class OdooInvoiceSyncService {

    @Autowired
    private OdooClient odooClient;

    @Autowired
    private InvoiceRepository invoiceRepository;

    @Transactional
    public Invoice syncIssuedInvoice(Invoice invoice) {
        invoice.setOdooSyncStatus("PENDING");
        invoice.setOdooSyncError(null);
        invoice.setOdooLastSyncAt(LocalDateTime.now());
        invoiceRepository.save(invoice);

        try {
            odooClient.validateConfig();
            String partnerId = invoice.getOdooPartnerId();
            if (partnerId == null || partnerId.isBlank()) {
                partnerId = odooClient.ensureStudentPartner(invoice);
                invoice.setOdooPartnerId(partnerId);
            }

            String odooInvoiceId = odooClient.createInvoice(partnerId, invoice);
            invoice.setOdooInvoiceId(odooInvoiceId);
            invoice.setOdooSyncStatus("SYNCED");
            invoice.setOdooSyncError(null);
        } catch (Exception e) {
            invoice.setOdooSyncStatus("FAILED");
            invoice.setOdooSyncError(safeErrorMessage(e));
        }

        invoice.setOdooLastSyncAt(LocalDateTime.now());
        return invoiceRepository.save(invoice);
    }

    @Transactional
    public Invoice retrySync(Invoice invoice) {
        invoice.setOdooSyncStatus("RETRYING");
        invoice.setOdooLastSyncAt(LocalDateTime.now());
        invoiceRepository.save(invoice);
        return syncIssuedInvoice(invoice);
    }

    private String safeErrorMessage(Exception e) {
        String message = e.getMessage() == null ? "Odoo sync failed" : e.getMessage();
        message = message.replaceAll("(?i)password[^,;\n]*", "password=***");
        message = message.replaceAll("(?i)token[^,;\n]*", "token=***");
        return message.length() > 500 ? message.substring(0, 500) : message;
    }
}
