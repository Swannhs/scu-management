# enrollment-service

**Status:** `core` | **Stack:** FastAPI (Python) | **Port:** 8008

Manages student admissions and course registration. Handles intake terms, admission applications, and enrollment lifecycle (add/drop, waitlist, prerequisite checks).

## Overview

The enrollment service owns the full admissions-to-enrollment workflow:
- Intake term management
- Admission application submission and review
- Student provisioning on acceptance
- Course enrollment (add/drop, capacity checks, waitlist)

## Endpoints

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/health` | None | Liveness check |
| GET | `/ready` | None | Readiness check (DB ping) |
| POST | `/v1/intake-terms` | `TENANT_ADMIN` | Create an intake term |
| GET | `/v1/intake-terms` | Any | List intake terms |
| POST | `/v1/applications` | None | Submit admission application |
| PATCH | `/v1/applications/:id/status` | `TENANT_ADMIN` | Accept / reject application |
| POST | `/v1/enrollments` | `STUDENT`, `TENANT_ADMIN` | Enroll student in a section |
| DELETE | `/v1/enrollments/:id` | `STUDENT`, `TENANT_ADMIN` | Drop enrollment |
| GET | `/v1/enrollments` | `STUDENT`, `TENANT_ADMIN` | List enrollments |

## Environment variables

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | Yes | PostgreSQL connection string |
| `KEYCLOAK_AUTH_SERVER_URL` | Yes | Keycloak base URL |
| `KEYCLOAK_REALM` | Yes | Keycloak realm (must be `scu`) |
| `KEYCLOAK_JWKS_URL` | No | Overrides JWKS endpoint URL |
| `KEYCLOAK_ISSUER` | No | Overrides token issuer URL |
| `KEYCLOAK_AUDIENCE` | No | Expected token audience (default: `account`) |
| `RABBITMQ_URL` | Yes | RabbitMQ connection string |

Copy `.env.example` to `.env` and fill in values.

## Setup

```bash
pip install -r requirements.txt
cp .env.example .env
uvicorn main:app --host 0.0.0.0 --port 8008
```

## Tests

```bash
pytest
```

## Enrollment statuses

`pending` → `enrolled` | `waitlisted` | `dropped` | `withdrawn` | `completed`

## Events published

| Event | Trigger |
|-------|---------|
| `student.enrolled` | Student enrolls in a section |
| `student.dropped` | Student drops an enrollment |
| `student.admitted` | Admission application accepted |
