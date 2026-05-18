package com.university.finance.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class OdooConfig {

    @Value("${ODOO_URL:}")
    private String url;

    @Value("${ODOO_DB:}")
    private String db;

    @Value("${ODOO_USERNAME:}")
    private String username;

    @Value("${ODOO_PASSWORD:}")
    private String password;

    @Value("${ODOO_TIMEOUT_MS:5000}")
    private int timeoutMs;

    public String getUrl() {
        return url;
    }

    public String getDb() {
        return db;
    }

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }

    public int getTimeoutMs() {
        return timeoutMs;
    }

    public void validate() {
        if (isBlank(url) || isBlank(db) || isBlank(username) || isBlank(password)) {
            throw new IllegalStateException("Odoo configuration is incomplete");
        }
        if (timeoutMs <= 0) {
            throw new IllegalStateException("ODOO_TIMEOUT_MS must be greater than 0");
        }
    }

    private boolean isBlank(String value) {
        return value == null || value.trim().isEmpty();
    }
}
