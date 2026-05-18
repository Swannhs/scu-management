package com.university.finance.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.university.finance.config.OdooConfig;
import com.university.finance.model.Invoice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.math.BigDecimal;
import java.util.*;

@Service
public class OdooClient {

    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Autowired
    private OdooConfig odooConfig;

    public String ensureStudentPartner(Invoice invoice) {
        String displayName = "Student-" + invoice.getStudentId();

        Map<String, Object> searchDomain = Map.of(
                "name", "res.partner",
                "method", "search_read",
                "args", List.of(List.of(List.of("name", "=", displayName))),
                "kwargs", Map.of("fields", List.of("id"), "limit", 1)
        );

        JsonNode existing = callKw(searchDomain);
        if (existing.isArray() && !existing.isEmpty() && existing.get(0).has("id")) {
            return existing.get(0).get("id").asText();
        }

        Map<String, Object> createPayload = Map.of(
                "name", "res.partner",
                "method", "create",
                "args", List.of(Map.of("name", displayName, "customer_rank", 1))
        );

        JsonNode created = callKw(createPayload);
        return created.asText();
    }

    public String createInvoice(String partnerId, Invoice invoice) {
        Map<String, Object> invoiceLine = Map.of(
                "name", "SCU Invoice " + invoice.getInvoiceNumber(),
                "quantity", 1,
                "price_unit", nullableAmount(invoice.getTotalAmount())
        );

        Map<String, Object> createValues = new HashMap<>();
        createValues.put("move_type", "out_invoice");
        createValues.put("partner_id", Integer.parseInt(partnerId));
        createValues.put("invoice_date", invoice.getCreatedAt() != null ? invoice.getCreatedAt().toLocalDate().toString() : null);
        createValues.put("invoice_date_due", invoice.getDueDate() != null ? invoice.getDueDate().toString() : null);
        createValues.put("ref", invoice.getInvoiceNumber());
        createValues.put("invoice_line_ids", List.of(List.of(0, 0, invoiceLine)));

        Map<String, Object> payload = Map.of(
                "name", "account.move",
                "method", "create",
                "args", List.of(createValues)
        );

        JsonNode created = callKw(payload);
        return created.asText();
    }

    public void validateConfig() {
        odooConfig.validate();
    }

    private JsonNode callKw(Map<String, Object> executeKw) {
        try {
            String url = odooConfig.getUrl();
            JsonNode auth = call(url + "/jsonrpc", Map.of(
                    "service", "common",
                    "method", "login",
                    "args", List.of(odooConfig.getDb(), odooConfig.getUsername(), odooConfig.getPassword())
            ));

            int uid = auth.asInt();
            if (uid <= 0) {
                throw new IllegalStateException("Failed to authenticate with Odoo");
            }

            JsonNode result = call(url + "/jsonrpc", Map.of(
                    "service", "object",
                    "method", "execute_kw",
                    "args", List.of(
                            odooConfig.getDb(),
                            uid,
                            odooConfig.getPassword(),
                            executeKw.get("name"),
                            executeKw.get("method"),
                            executeKw.getOrDefault("args", List.of()),
                            executeKw.getOrDefault("kwargs", Map.of())
                    )
            ));

            return result;
        } catch (Exception e) {
            throw new IllegalStateException("Odoo sync failed", e);
        }
    }

    private JsonNode call(String endpoint, Map<String, Object> params) throws Exception {
        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("jsonrpc", "2.0");
        requestBody.put("method", "call");
        requestBody.put("params", params);
        requestBody.put("id", UUID.randomUUID().toString());

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<String> entity = new HttpEntity<>(objectMapper.writeValueAsString(requestBody), headers);
        ResponseEntity<String> response = restTemplate.exchange(endpoint, HttpMethod.POST, entity, String.class);

        JsonNode body = objectMapper.readTree(response.getBody());
        if (body.has("error")) {
            throw new IllegalStateException(body.get("error").toString());
        }

        return body.get("result");
    }

    private BigDecimal nullableAmount(BigDecimal amount) {
        return amount == null ? BigDecimal.ZERO : amount;
    }
}
