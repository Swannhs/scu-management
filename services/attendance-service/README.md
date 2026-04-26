# attendance-service

**Status:** `core` | **Stack:** NestJS (TypeScript) | **Port:** 3003

Records and reports student attendance across course sessions.

## Overview

The attendance service manages:
- Attendance sessions linked to course sections
- Per-student attendance marks (present, absent, excused)
- Bulk attendance marking for faculty
- Attendance percentage calculations
- Low-attendance alert publishing via RabbitMQ

## Endpoints

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/health` | None | Liveness check |
| GET | `/ready` | None | Readiness check (DB ping) |
| POST | `/v1/attendance/sessions` | `faculty`, `university_admin` | Create attendance session |
| POST | `/v1/attendance/sessions/:id/marks` | `faculty` | Mark attendance for session |
| GET | `/v1/attendance/students/:id` | `faculty`, `student`, `parent` | Get student attendance history |
| GET | `/v1/attendance/sections/:id/report` | `faculty`, `university_admin` | Section attendance report |

See `/docs` (Swagger UI) when the service is running for the full API.

## Environment variables

| Variable | Required | Description |
|----------|----------|-------------|
| `PORT` | No | Listening port (default: `3003`) |
| `DATABASE_URL` | Yes | PostgreSQL connection string |
| `KEYCLOAK_AUTH_SERVER_URL` | Yes | Keycloak base URL |
| `KEYCLOAK_REALM` | Yes | Keycloak realm (must be `scu`) |
| `KEYCLOAK_CLIENT_ID` | Yes | Keycloak client ID |
| `KEYCLOAK_CLIENT_SECRET` | Yes | Keycloak client secret |

Copy `.env.example` to `.env` and fill in values.

## Setup

```bash
npm install
cp .env.example .env
npx prisma migrate deploy
npm run start:dev
```

## Tests

```bash
npm test
```

## Migrations

```bash
npx prisma migrate dev
```

## Events published

| Event | Trigger |
|-------|---------|
| `attendance.low` | Student falls below minimum attendance threshold |

