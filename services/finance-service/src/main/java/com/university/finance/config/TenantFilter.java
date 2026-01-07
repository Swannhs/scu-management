package com.university.finance.config;

import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.UUID;

@Component
public class TenantFilter implements Filter {

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {

        HttpServletRequest req = (HttpServletRequest) request;
        String tenantHeader = req.getHeader("X-Tenant-ID");
        String userHeader = req.getHeader("X-User-ID");

        if (tenantHeader != null) {
            try {
                TenantContext.setCurrentTenant(UUID.fromString(tenantHeader));
            } catch (IllegalArgumentException e) {
                ((HttpServletResponse) response).sendError(HttpServletResponse.SC_BAD_REQUEST, "Invalid X-Tenant-ID format");
                return;
            }
        } else {
             ((HttpServletResponse) response).sendError(HttpServletResponse.SC_BAD_REQUEST, "Missing X-Tenant-ID header");
             return;
        }

        if (userHeader != null) {
            try {
                UserContext.setCurrentUser(UUID.fromString(userHeader));
            } catch (IllegalArgumentException e) {
                // Ignore or log invalid user id
            }
        }

        try {
            chain.doFilter(request, response);
        } finally {
            TenantContext.clear();
            UserContext.clear();
        }
    }
}
