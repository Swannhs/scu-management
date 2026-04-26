# SCU Management Platform — Roadmap

See `ARCHITECTURE.md` for the service catalog and `AGENTS.md` for AI builder rules.

---

## Current phase: Phase 1 — Foundation and cleanup

**Goal:** Make the repo safe, understandable, runnable, and ready for AI-assisted continuous building.

---

## Milestone 1 — Repo stabilisation (current)

- [x] Add `AGENTS.md` and AI builder rules
- [x] Add `ARCHITECTURE.md` with canonical service catalog
- [x] Add `ROADMAP.md` with phased milestones
- [x] Add `SECURITY.md` with secrets and vulnerability policy
- [x] Add `CONTRIBUTING.md` with contribution guidelines
- [x] Add `docs/decisions/` for Architecture Decision Records
- [x] Add `docs/service-contracts/` for OpenAPI/AsyncAPI contracts
- [x] Add CI for Docker Compose config validation and secret scan
- [x] Split Docker Compose: `infra`, `core`, `dev`, `prod`
- [x] Clean hardcoded secrets from compose files
- [ ] Add `README.md`, `.env.example`, `Dockerfile`, `/health`, `/ready` to every core service
- [ ] Standardise Keycloak realm to `scu` across all services

## Milestone 2 — Auth and user foundation

- [ ] Finalise Keycloak `scu` realm configuration
- [ ] Define canonical roles: `super_admin`, `university_admin`, `department_admin`, `faculty`, `student`, `parent`, `staff`, `finance_officer`
- [ ] Complete student, faculty, and parent profile APIs in `user-service`
- [ ] Add auth middleware standard to each stack (NestJS guard, FastAPI dependency, Spring Security config, Laravel middleware)
- [ ] Add permission checks to all core services
- [ ] Add auth integration tests to core services

## Milestone 3 — Academic MVP

- [ ] Course catalog: departments, programs, semesters, courses
- [ ] Course sections: faculty assignment, capacity, schedule
- [ ] Student enrollment: add/drop, waitlist, prerequisite checks
- [ ] Attendance: sessions, bulk marking, percentage reports
- [ ] Assessment: assignment/quiz/exam creation, submission tracking, rubrics
- [ ] Gradebook: weighted scores, letter grades, GPA calculation
- [ ] Transcript summary view

## Milestone 4 — Student / faculty / admin UI

- [ ] Student dashboard (profile, courses, schedule, grades, attendance)
- [ ] Faculty dashboard (assigned courses, attendance, gradebook)
- [ ] Admin dashboard (users, departments, programs, analytics)
- [ ] Authenticated navigation and API integration

## Milestone 5 — Operations

- [ ] Document upload, approval, and access-controlled download
- [ ] Notifications via RabbitMQ events
- [ ] Finance: invoices, payments, fee structures
- [ ] Library: catalog, borrow/return
- [ ] Parent portal: linked student data
- [ ] Hostel and transport assignments

## Milestone 6 — Campus engagement

- [ ] Campus social: posts, comments, announcements
- [ ] Events and RSVP
- [ ] Clubs: creation, membership, events
- [ ] Awards and achievements
- [ ] Moderation tools

## Milestone 7 — Analytics and AI

- [ ] Admin and faculty analytics dashboards
- [ ] Student insights (attendance risk, grade trends)
- [ ] AI campus assistant (role-aware, retrieval over APIs)
- [ ] AI builder agent (reads issues, opens PRs, updates docs)

## Milestone 8 — Production polish

- [ ] Deployment guide
- [ ] Seed and demo data
- [ ] End-to-end tests for core workflows
- [ ] Security audit
- [ ] Performance pass
- [ ] Demo script and portfolio README

---

## MVP scope

A strong MVP is:

```
Auth · Users · Courses · Enrollment · Attendance · Assessment · Grades · Documents · Notifications
Student portal · Faculty portal · Admin portal
```

Leave for post-MVP: Finance · Library · Hostel · Transport · Clubs · Awards · Advanced analytics · AI assistant

---

## Completed work (pre-milestone-1)

- [x] Multi-service architecture with Traefik ingress
- [x] Keycloak integration (partial — realm inconsistency to be fixed)
- [x] `user-service`, `course-service`, `assessment-service`, `attendance-service`, `grades-service`
- [x] `enrollment-service` with add/drop and capacity checks
- [x] `finance-service` with invoices and payments
- [x] `campus-social-service` with WebSocket feed
- [x] `document-service` with file storage
- [x] `audit-logging-service`
- [x] Supporting services: library, notifications, transport, analytics, maintenance, events, clubs, awards
