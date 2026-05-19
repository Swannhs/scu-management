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
| GET | `/v1/attendance/sessions` | `faculty`, `university_admin`, `registrar`, `staff` | List attendance sessions |
| GET | `/v1/attendance/sessions/:id` | `faculty`, `university_admin`, `registrar`, `staff` | Get attendance session |
| PATCH | `/v1/attendance/sessions/:id` | `faculty`, `university_admin`, `registrar` | Update attendance session |
| DELETE | `/v1/attendance/sessions/:id` | `university_admin`, `registrar` | Delete attendance session |
| POST | `/v1/attendance/sessions/:id/marks` | `faculty`, `university_admin`, `registrar` | Mark one student attendance |
| POST | `/v1/attendance/sessions/:id/bulk-marks` | `faculty`, `university_admin`, `registrar` | Mark many students attendance |
| PATCH | `/v1/attendance/marks/:markId` | `faculty`, `university_admin`, `registrar` | Correct an attendance mark |
| GET | `/v1/attendance/sessions/:id/marks` | `faculty`, `university_admin`, `registrar`, `staff` | List marks for session |
| GET | `/v1/attendance/students/:studentId/summary` | `student`, `faculty`, `university_admin`, `registrar` | Student attendance summary |
| GET | `/v1/attendance/sections/:sectionId/report` | `faculty`, `university_admin`, `registrar` | Section attendance report summary |
| GET | `/v1/attendance/me/summary` | `student` | Current student attendance summary |
| POST | `/v1/attendance/sessions/:id/mark` | `faculty` | Legacy bulk mark endpoint (compatibility) |
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

