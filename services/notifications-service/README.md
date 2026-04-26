# notifications-service

**Status:** `core` | **Stack:** FastAPI (Python) | **Port:** 8001

Delivers in-app and email notifications triggered by platform events via RabbitMQ.

## Overview

The notifications service listens to domain events published to RabbitMQ (e.g., `attendance.low`, `grade.published`, `document.approved`) and dispatches notifications to affected users via email and in-app channels.

## Endpoints

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/health` | None | Liveness check |
| GET | `/ready` | None | Readiness check |

## Environment variables

| Variable | Required | Description |
|----------|----------|-------------|
| `PORT` | No | Listening port (default: `8001`) |
| `RABBITMQ_URL` | Yes | RabbitMQ connection string |

Copy `.env.example` to `.env` and fill in values.

## Setup

```bash
pip install -r requirements.txt
cp .env.example .env
uvicorn main:app --host 0.0.0.0 --port 8001
```

## Tests

```bash
pytest
```

## Events consumed

| Event | Action |
|-------|--------|
| `attendance.low` | Send low-attendance alert to student/parent |
| `grade.published` | Notify student of published grade |
| `document.approved` | Notify requester of document approval |
| `assessment.created` | Notify enrolled students of new assessment |
| `payment.due` | Send payment reminder to student |
