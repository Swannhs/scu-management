package com.university.finance.events;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.university.finance.model.Invoice;
import com.university.finance.repository.InvoiceRepository;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.math.BigDecimal;
import java.util.Map;

@Service
public class EnrollmentEventListener {

    @Autowired
    private InvoiceRepository invoiceRepository;

    @Autowired
    private ObjectMapper objectMapper;

    @RabbitListener(queues = "finance_enrollment_queue")
    public void handleStudentEnrolled(String message) {
        try {
            Map<String, Object> data = objectMapper.readValue(message, Map.class);

            String studentId = (String) data.get("student_id");
            String tenantId = (String) data.get("tenant_id");
            String courseId = (String) data.get("course_offering_id");

            Invoice invoice = new Invoice();
            invoice.setStudentId(studentId);
            invoice.setTenantId(tenantId);
            invoice.setAmount(new BigDecimal("500.00")); // Base fee example
            invoice.setDescription("Semester Fee for Course: " + courseId);
            invoice.setStatus("PENDING");

            invoiceRepository.save(invoice);
            System.out.println("Generated auto-invoice for student: " + studentId);

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
