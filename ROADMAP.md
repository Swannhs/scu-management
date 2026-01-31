# University Management System - Project Roadmap

## Phase 0 — Foundation
- [x] Multi-tenant by `institution_id` / `X-Tenant-ID`.
- [x] Tech Stack: NestJS, FastAPI, Spring Boot, Laravel.
- [x] API Standards: `/v1` prefix, Swagger/OpenAPI.
- [x] Infrastructure: Docker-compose, Keycloak, Postgres, Mongo, Redis, RabbitMQ.

## Phase 1 — Auth + Roles + Permissions (RBAC)
- [x] Keycloak integration for all services.
- [x] `user-service` for user management and profile linking.
- [x] Roles: `TENANT_ADMIN`, `REGISTRAR`, `FACULTY`, `STUDENT`, `STAFF`.
- [x] Object-level checks (e.g., Faculty can only access their assigned sections).

## Phase 2 — Academic Structure (The Backbone)
- [x] `course-service`: Departments, Programs, Academic Years, Terms, Courses, Sections.
- [x] Rules: Section capacity, Course-Term-Section uniqueness.

## Phase 3 — Student Lifecycle (Profiles + Enrollment)
- [x] `enrollment-service`: Admissions applications, Student creation, Course registrations (add/drop).
- [x] Rules: Registration windows, basic capacity checks.

## Phase 4 — Attendance Module
- [x] `attendance-service`: Attendance sessions and marking.
- [x] Bulk marking support: `POST /v1/attendance/sessions/{id}/mark`.
- [x] Reports: Student and Section-level attendance summaries.

## Phase 5 — Exams + Grading + Transcript
- [x] `assessment-service`: Assessment definitions and weightage.
- [x] `grades-service`: Marks recording, final grade computation, and transcript generation.

## Phase 6 — Fees & Finance
- [x] `finance-service`: Fee heads, plans, invoices, payments, and journal entries.
- [x] Rules: Invoice immutability after payment, partial payment support.

## Phase 7 — Admin & Hardening (Current Focus)
- [x] **Audit Logs**: Event-based logging implemented in `audit-logging-service`.
- [ ] **Hardening: Consistent Error Formatting**
  - Standardize error responses across polyglot services to follow `{ error: { code, message, details } }`.
- [ ] **Hardening: Input Validation**
  - Ensure 100% DTO coverage in NestJS/FastAPI and strict schema validation in Laravel/Spring Boot.
- [ ] **Advanced Reporting**
  - [ ] Attendance % by course/term.
  - [ ] Financial dues vs. collection reports.
- [ ] **System-Wide Integration Tests**
  - [ ] Workflow test: Application -> Enrollment -> Invoice -> Payment.
  - [ ] Workflow test: Attendance -> Assessment -> Final Grade -> Transcript.
