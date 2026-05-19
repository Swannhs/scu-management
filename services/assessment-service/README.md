# assessment-service

**Status:** `core` | **Stack:** NestJS (TypeScript) | **Port:** 3008

Manages assignments, quizzes, and exams. Tracks submissions, due dates, and assessment weighting for gradebook integration.

## Overview

The assessment service handles the full assessment lifecycle:
- Exam and question bank management
- Assignment and quiz creation per course section
- Student submission tracking
- Rubric and weighting configuration
- Late submission policy enforcement

## Endpoints

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/health` | None | Liveness check |
| GET | `/ready` | None | Readiness check (DB ping) |
| POST | `/v1/exams` | `faculty`, `university_admin` | Create exam |
| GET | `/v1/exams` | Any authenticated | List exams |
| GET | `/v1/exams/:id` | Any authenticated | Get exam |
| POST | `/v1/questions` | `faculty`, `university_admin` | Create question |
| POST | `/v1/submissions` | `student` | Submit assessment |
| GET | `/v1/submissions` | `faculty`, `university_admin` | List submissions |
| GET | `/v1/assessment-categories` | Any authenticated | List assessment categories |
| POST | `/v1/assessment-categories` | `faculty`, `university_admin` | Create assessment category |
| GET | `/v1/assessment-categories/:id` | Any authenticated | Get assessment category |
| PATCH | `/v1/assessment-categories/:id` | `faculty`, `university_admin` | Update assessment category |
| DELETE | `/v1/assessment-categories/:id` | `faculty`, `university_admin` | Delete assessment category |
| GET | `/v1/assessments` | Any authenticated (students see published only) | List assessments |
| POST | `/v1/assessments` | `faculty`, `university_admin` | Create assessment |
| GET | `/v1/assessments/:id` | Any authenticated (students see published only) | Get assessment |
| PATCH | `/v1/assessments/:id` | `faculty`, `university_admin` | Update assessment |
| DELETE | `/v1/assessments/:id` | `faculty`, `university_admin` | Delete assessment |
| POST | `/v1/assessments/:id/publish` | `faculty`, `university_admin` | Publish assessment |
| GET | `/v1/assessments/:assessmentId/submissions` | `faculty`, `university_admin` | List submissions for assessment |
| POST | `/v1/assessments/:assessmentId/submissions` | `student` | Create submission |
| GET | `/v1/submissions/:id` | Authenticated | Get submission |
| PATCH | `/v1/submissions/:id` | Authenticated | Update submission |
| POST | `/v1/submissions/:id/grade` | `faculty`, `university_admin` | Grade submission |

See `/docs` (Swagger UI) when the service is running for the full API.

## Environment variables

| Variable | Required | Description |
|----------|----------|-------------|
| `PORT` | No | Listening port (default: `3008`) |
| `DATABASE_URL` | Yes | PostgreSQL connection string |
| `KEYCLOAK_AUTH_SERVER_URL` | Yes | Keycloak base URL |
| `KEYCLOAK_REALM` | Yes | Keycloak realm (must be `scu`) |
| `KEYCLOAK_CLIENT_ID` | Yes | Keycloak client ID |
| `KEYCLOAK_CLIENT_SECRET` | Yes | Keycloak client secret |
| `RABBITMQ_URL` | No | RabbitMQ URL for event publishing |

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
