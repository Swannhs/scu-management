# edge-auth-service

**Status:** `core` | **Stack:** Node.js | **Port:** 3000

Traefik forward-auth sidecar. Validates JWT tokens on every inbound request and passes user identity headers downstream.

## Overview

This service sits between Traefik and the internal services. Traefik forwards authentication checks here before routing requests. It validates `Authorization: Bearer <token>` JWTs, extracts tenant/role/user context, and returns identity headers to Traefik to forward. Protected routes require a verified token; `X-Tenant-ID` cannot establish tenant context by itself.

## Endpoints

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/health` | None | Liveness check |
| GET | `/ready` | None | Readiness check |
| GET | `/verify` | Via headers | JWT validation for Traefik forward-auth |

## Environment variables

| Variable | Required | Description |
|----------|----------|-------------|
| `PORT` | No | Listening port (default: `3000`) |
| `JWT_SECRET` | Yes | Secret used to verify JWTs |

Copy `.env.example` to `.env` and fill in values.

## Setup

```bash
npm install
cp .env.example .env
npm start
```

## Tests

```bash
npm test
```

## Request flow

Traefik is configured to forward auth checks to `http://edge-auth-service:3000/verify` via the `forwardAuth` middleware. On success, the service returns `200` with `X-User-Id`, `X-User-Role`, `X-Tenant-Id`, and optionally `X-User-Email` headers.

## Error responses

```json
{ "code": "UNAUTHORIZED", "message": "Access token required" }
{ "code": "INVALID_TOKEN", "message": "Invalid or expired token" }
{ "code": "FORBIDDEN", "message": "Insufficient permissions" }
{ "code": "TENANT_CONTEXT_MISSING", "message": "Token tenant context is required" }
```
