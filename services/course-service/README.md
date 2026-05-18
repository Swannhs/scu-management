# course-service

**Status:** `core` | **Stack:** NestJS (TypeScript) | **Port:** 3004

Manages departments, programs, semesters, course catalog, course sections, rooms, and faculty assignment.

## Overview

The course service is the academic catalog backbone:
- Departments and programs
- Academic years and terms (semesters)
- Course catalog with prerequisites
- Course sections with capacity, schedule, and faculty assignment
- Room management

## Endpoints

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/health` | None | Liveness check |
| GET | `/ready` | None | Readiness check (DB ping) |
| GET | `/v1/departments` | Any authenticated | List departments |
| POST | `/v1/departments` | `university_admin` | Create department |
| GET | `/v1/departments/:id` | Any authenticated | Get department by ID |
| PATCH | `/v1/departments/:id` | `university_admin` | Update department |
| DELETE | `/v1/departments/:id` | `university_admin` | Soft delete department |
| GET | `/v1/programs` | Any authenticated | List programs |
| POST | `/v1/programs` | `university_admin` | Create program |
| GET | `/v1/programs/:id` | Any authenticated | Get program by ID |
| PATCH | `/v1/programs/:id` | `university_admin` | Update program |
| DELETE | `/v1/programs/:id` | `university_admin` | Soft delete program |
| GET | `/v1/courses` | Any authenticated | List courses |
| POST | `/v1/courses` | `university_admin` | Create course |
| GET | `/v1/sections` | Any authenticated | List sections |
| POST | `/v1/sections` | `university_admin` | Create section |
| GET | `/v1/sections/:id` | Any authenticated | Get section by ID |
| PATCH | `/v1/sections/:id` | `university_admin` | Update section |
| DELETE | `/v1/sections/:id` | `university_admin` | Soft delete section |
| GET | `/v1/sections/:id/roster` | Faculty/admin/registrar | Get section roster |
| POST | `/v1/sections/:id/faculty` | `university_admin` | Assign faculty to section |
| DELETE | `/v1/sections/:id/faculty/:facultyId` | `university_admin` | Remove faculty assignment |

See `/docs` (Swagger UI) when the service is running for the full API.

## Environment variables

| Variable | Required | Description |
|----------|----------|-------------|
| `PORT` | No | Listening port (default: `3004`) |
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

