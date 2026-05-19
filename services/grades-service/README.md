# grades-service

**Status:** `core` | **Stack:** NestJS (TypeScript) | **Port:** 3002

Manages the gradebook, GPA calculation, transcript generation, and grade publishing.

## Overview

The grades service provides:
- Weighted gradebook per course section
- Letter grade rules and GPA calculation
- Grade publishing workflow (draft → published)
- Transcript summary view per student
- Grade change request tracking

## Endpoints

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/health` | None | Liveness check |
| GET | `/ready` | None | Readiness check (DB ping) |
| GET | `/v1/grades/sections/:id` | `faculty`, `university_admin` | Gradebook for section |
| POST | `/v1/grades` | `faculty` | Enter grade for submission |
| POST | `/v1/grades/publish` | `faculty` | Publish grades for section |
| GET | `/v1/grades/students/:id/transcript` | `student`, `faculty`, `parent` | Student transcript |
| GET | `/v1/grades/students/:id/gpa` | `student`, `faculty`, `parent` | Student GPA |
| GET | `/v1/gradebooks/sections/:sectionId` | `faculty`, `university_admin` | Section gradebook |
| POST | `/v1/gradebooks/sections/:sectionId/items` | `faculty`, `university_admin` | Create gradebook item |
| PATCH | `/v1/gradebooks/items/:itemId` | `faculty`, `university_admin` | Update gradebook item |
| POST | `/v1/gradebooks/items/:itemId/scores` | `faculty`, `university_admin` | Record single score |
| POST | `/v1/gradebooks/items/:itemId/bulk-scores` | `faculty`, `university_admin` | Record bulk scores |
| GET | `/v1/gradebooks/students/:studentId/sections/:sectionId` | `student`, `faculty`, `university_admin` | Student section gradebook |
| POST | `/v1/grades/sections/:sectionId/calculate` | `faculty`, `university_admin` | Calculate final grades |
| POST | `/v1/grades/sections/:sectionId/publish` | `faculty`, `university_admin` | Publish section grades |
| GET | `/v1/grades/students/:studentId` | `student`, `faculty`, `university_admin` | Student grades |
| GET | `/v1/grades/me` | `student` | My grades |
| GET | `/v1/gpa/students/:studentId` | `student`, `faculty`, `university_admin` | Student GPA summary |
| GET | `/v1/gpa/me` | `student` | My GPA summary |
| GET | `/v1/transcripts/students/:studentId` | `student`, `faculty`, `university_admin` | Student transcript |
| GET | `/v1/transcripts/me` | `student` | My transcript |
| GET | `/v1/transcripts/students/:studentId/summary` | `student`, `faculty`, `university_admin` | Transcript summary |

See `/docs` (Swagger UI) when the service is running for the full API.

## Environment variables

| Variable | Required | Description |
|----------|----------|-------------|
| `PORT` | No | Listening port (default: `3002`) |
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
| `grade.published` | Faculty publishes grades for a section |

