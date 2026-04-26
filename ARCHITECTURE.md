# ARCHITECTURE.md — SCU Management Platform

## Overview

SCU Management is a polyglot microservices platform for university management. Services are deployed behind a Traefik API gateway and communicate over an internal Docker network. Identity is centralised through Keycloak (realm: `scu`).

---

## Service catalog

### Status tags

| Tag | Meaning |
|-----|---------|
| `core` | Required for the platform to function. Always running. |
| `active` | Feature-complete and in active use. |
| `experimental` | In development; API may change. |
| `legacy` | Kept for compatibility only. Do not build new features. |
| `archived` | Retired. Not running in compose. |

### Core services

These services must be running for the platform to operate.

| Service | Stack | Status | Port | Description |
|---------|-------|--------|------|-------------|
| `edge-auth-service` | Node.js | `core` | 3000 | Traefik forward-auth sidecar — validates JWT tokens |
| `user-service` | NestJS | `core` | 3005 | User profiles, student/faculty/parent linking |
| `course-service` | NestJS | `core` | 3004 | Departments, programs, courses, sections |
| `enrollment-service` | FastAPI | `core` | 8008 | Student admissions and course registration |
| `assessment-service` | NestJS | `core` | 3008 | Assignments, quizzes, exams, submissions |
| `attendance-service` | NestJS | `core` | 3003 | Sessions, marks, reports |
| `grades-service` | NestJS | `core` | 3002 | Gradebook, GPA, transcript |
| `document-service` | NestJS | `core` | 3006 | File storage, certificates, transcripts |
| `campus-social-service` | NestJS | `core` | 3015 | Posts, comments, announcements, WebSocket feed |
| `notifications-service` | FastAPI | `core` | 8001 | Email and in-app notifications via RabbitMQ |

### Active services

| Service | Stack | Status | Port | Description |
|---------|-------|--------|------|-------------|
| `finance-service` | Spring Boot | `active` | 8081 | Invoices, payments, fee structures |
| `library-service` | Spring Boot | `active` | 8082 | Book catalog, borrow/return |
| `analytics-service` | FastAPI | `active` | 8003 | Dashboards and institutional reports |
| `audit-logging-service` | FastAPI | `active` | 8009 | Immutable audit event log |
| `faculty-service` | Laravel | `active` | 8004 | Faculty profile management |
| `hostel-service` | Laravel | `active` | 8005 | Room allocation, hostel fees |
| `transport-service` | FastAPI | `active` | 8002 | Routes, vehicles, student transport |
| `parent-portal-service` | Laravel | `active` | 8006 | Parent-linked student data views |
| `admin-config-service` | Laravel | `active` | 8007 | System configuration |
| `maintenance-service` | Node.js | `active` | 3007 | Facility maintenance requests |
| `events-service` | FastAPI | `active` | 8012 | Campus event management |
| `clubs-service` | FastAPI | `active` | 8013 | Club management |
| `awards-service` | FastAPI | `active` | 8014 | Student awards and achievements |
| `platform-admin-service` | FastAPI | `active` | 8015 | Super-admin platform operations |

### Experimental services

| Service | Stack | Status | Description |
|---------|-------|--------|-------------|
| `academic-service` | — | `experimental` | Unified academic workflow stub |
| `placement-service` | — | `experimental` | Career and placement module |

### Legacy services

| Service | Stack | Status | Notes |
|---------|-------|--------|-------|
| `social-service` | Laravel | `legacy` | Superseded by `campus-social-service`. Runs only under `legacy-social` profile. |

---

## Infrastructure

| Component | Image | Purpose |
|-----------|-------|---------|
| Traefik | `traefik:v3.1` | API gateway and ingress routing |
| Keycloak | `keycloak:22.0.5` | Identity provider (realm: `scu`) |
| PostgreSQL | `postgres:15-alpine` | Relational data per service |
| MongoDB | `mongo:6-jammy` | Document store (campus-social, analytics) |
| RabbitMQ | `rabbitmq:3.12-management` | Async event bus |
| Redis | `redis:7-alpine` | Cache and session store |

---

## Technology stacks

| Stack | Services | Test command |
|-------|----------|-------------|
| NestJS / Node.js | edge-auth, user, course, assessment, attendance, grades, document, campus-social, maintenance | `npm test` |
| FastAPI / Python | enrollment, notifications, transport, analytics, audit-logging, events, clubs, awards, platform-admin | `pytest` |
| Spring Boot / Java | finance, library | `mvn test` |
| Laravel / PHP | faculty, hostel, parent-portal, admin-config, social (legacy) | `php artisan test` |

---

## Request flow

```
Client
  └─► Traefik (port 80)
        ├─ ForwardAuth ──► edge-auth-service (JWT validation)
        └─ Route ──► target service (e.g. /v1/courses → course-service)
```

Traefik reads dynamic routing from `docker/traefik/dynamic.yml`.

---

## Auth conventions

- All services validate JWTs from Keycloak realm `scu`.
- Services must reject requests without a valid `Authorization: Bearer <token>` header, except for public endpoints (`/health`, `/ready`, `/docs`, `/openapi.json`).
- Keycloak base URL (internal): `http://keycloak:8080`
- Keycloak base URL (external): `http://localhost:8080`

---

## Event conventions

Services publish events to RabbitMQ using the following naming pattern:

```
<domain>.<event>
```

Examples:
```
student.enrolled
attendance.low
grade.published
document.approved
assessment.created
payment.due
```

---

## Error response format

All services must return errors in this format:

```json
{
  "error": {
    "code": "COURSE_FULL",
    "message": "This course section has reached capacity.",
    "details": {}
  }
}
```

---

## API versioning

All routes use the `/v1/` prefix. Example:
- `GET /v1/courses`
- `POST /v1/sections/:id/enroll`

---

## Directory layout

```
scu-management/
├── services/           # All microservices
├── docker/             # Docker Compose files and Traefik config
├── apps/               # Frontend applications (Flutter, web)
├── libs/               # Shared libraries and SDKs
├── docs/
│   ├── decisions/      # Architecture Decision Records (ADRs)
│   └── service-contracts/  # OpenAPI / AsyncAPI contracts per service
├── infra/              # Infrastructure config (stub)
├── archive/            # Retired services and modules
└── scripts/            # Utility scripts
```

---

## Compose files

| File | Purpose |
|------|---------|
| `docker/docker-compose.yml` | Full development environment (all services) |
| `docker/docker-compose.infra.yml` | Infrastructure only (databases, Keycloak, RabbitMQ, Redis, Mongo) |
| `docker/docker-compose.core.yml` | Core services only (requires infra) |
| `docker/docker-compose.dev.yml` | Development overrides (port exposure, debug flags) |
| `docker/docker-compose.prod.yml` | Production config (gateway-only exposure, required secrets) |

---

## Keycloak realm

The canonical realm is `scu`. All services must use `KEYCLOAK_REALM=scu`. The legacy value `university-platform` is deprecated and will be removed.
