# document-service

**Status:** `core` | **Stack:** Node.js / Express | **Port:** 3006

Handles file storage, access control, and secure downloads for student and faculty documents. Supports certificates, transcripts, and general uploads.

## Overview

The document service provides:
- Authenticated file uploads with tenant isolation
- Role- and group-based access grant management
- Secure, audited file downloads
- Event publishing on document actions (via RabbitMQ outbox)
- Soft deletion with audit trail

## Endpoints

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/health` | None | Liveness check |
| GET | `/ready` | None | Readiness check (DB ping) |
| POST | `/v1/files` | Authenticated | Upload a file |
| GET | `/v1/files/:id` | Authenticated + grant | Download a file |
| DELETE | `/v1/files/:id` | Owner / admin | Soft-delete a file |
| GET | `/v1/files` | Authenticated | List accessible files |
| POST | `/v1/files/:id/grants` | Owner / admin | Grant access to file |

## Environment variables

| Variable | Required | Description |
|----------|----------|-------------|
| `PORT` | No | Listening port (default: `3006`) |
| `DATABASE_URL` | Yes | PostgreSQL connection string |
| `RABBITMQ_URL` | No | RabbitMQ URL for event publishing |
| `OUTBOX_POLL_INTERVAL_MS` | No | Outbox polling interval in ms (default: `5000`) |

Copy `.env.example` to `.env` and fill in values.

## Setup

```bash
npm install
cp .env.example .env
# Apply database schema
psql $DATABASE_URL < schema.sql
npm start
```

## Tests

```bash
npm test
```
