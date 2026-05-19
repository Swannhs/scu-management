# notifications-service

Status: core | Stack: FastAPI (Python) | Port: 8001

Delivers in-app and email notifications triggered by platform events via RabbitMQ.

## Overview

The notifications service supports:
- event-driven notification dispatching infrastructure (RabbitMQ/outbox)
- in-app notification APIs for users/admin staff workflows
- per-user notification preferences

## Endpoints

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/health` | None | Liveness check |
| GET | `/ready` | None | Readiness check |
| GET | `/v1/notifications` | Required | List current user notifications |
| GET | `/v1/notifications/me` | Required | Alias of current user notifications list |
| POST | `/v1/notifications` | Required (admin/staff/system) | Create notification |
| GET | `/v1/notifications/:id` | Required | View notification by id (self or admin/staff) |
| PATCH | `/v1/notifications/:id/read` | Required | Mark one notification as read |
| PATCH | `/v1/notifications/read-all` | Required | Mark all current user notifications as read |
| GET | `/v1/notification-preferences/me` | Required | Get current user notification preferences |
| PATCH | `/v1/notification-preferences/me` | Required | Update current user notification preferences |

## Environment variables

| Variable | Required | Description |
|----------|----------|-------------|
| `PORT` | No | Listening port (default: `8001`) |
| `RABBITMQ_URL` | Yes | RabbitMQ connection string |
| `DATABASE_URL` | Yes | SQLAlchemy database URL for notification persistence |

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
