# user-service

**Status:** `core` | **Stack:** NestJS (TypeScript) | **Port:** 3005

Manages user accounts, authentication, and profile data for students, faculty, parents, and admin staff.

## Overview

The user service is the identity backbone of the platform. It:
- Authenticates users and issues JWTs
- Manages student, faculty, parent, and admin profiles
- Links parent accounts to student accounts
- Enforces tenant isolation on all user data

## Endpoints

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/health` | None | Liveness check |
| GET | `/ready` | None | Readiness check (DB ping) |
| POST | `/v1/auth/login` | None | Authenticate and receive JWT |
| POST | `/v1/auth/refresh` | None | Refresh access token |
| GET | `/v1/users` | `SUPER_ADMIN`, `ADMIN` | List users |
| POST | `/v1/users` | `SUPER_ADMIN`, `ADMIN` | Create user |
| GET | `/v1/users/:id` | Authenticated | Get user profile |
| PATCH | `/v1/users/:id` | Owner / admin | Update user profile |

See `/docs` (Swagger UI) when the service is running for the full API.

## Environment variables

| Variable | Required | Description |
|----------|----------|-------------|
| `PORT` | No | Listening port (default: `3005`) |
| `DATABASE_URL` | Yes | PostgreSQL connection string |
| `JWT_SECRET` | Yes | Secret for signing JWTs |
| `JWT_EXPIRATION` | No | Token expiry (default: `24h`) |
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

