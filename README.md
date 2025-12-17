# SCU Management – Microservices Scaffold

This repository bootstraps a university management system aligned with the provided architecture guide. It ships with:

- A monorepo folder layout for all microservices.
- Stub implementations per service (replace with the target frameworks: NestJS, FastAPI, Laravel, Spring Boot, Express).
- Docker and Docker Compose setups for local development and a production-style override.
- Shared infrastructure: PostgreSQL (multi-DB), Keycloak, MongoDB, Redis, and RabbitMQ.

## Repository layout

```
.
├── services/
│   ├── student-service/            # NestJS target – Node stub
│   ├── course-service/             # NestJS target – Node stub
│   ├── grades-service/             # NestJS target – Node stub
│   ├── attendance-service/         # Express target – Node stub
│   ├── user-auth-service/          # NestJS target – Node stub
│   ├── document-service/           # Express target – Node stub
│   ├── maintenance-service/        # Express target – Node stub
│   ├── enrollment-service/         # FastAPI target – Python stub
│   ├── notifications-service/      # FastAPI target – Python stub
│   ├── transport-service/          # FastAPI target – Python stub
│   ├── analytics-service/          # FastAPI target – Python stub
│   ├── audit-logging-service/      # FastAPI target – Python stub
│   ├── faculty-service/            # Laravel target – PHP stub
│   ├── administration-service/     # Laravel target – PHP stub
│   ├── hostel-service/             # Laravel target – PHP stub
│   ├── parent-portal-service/      # Laravel target – PHP stub
│   ├── finance-service/            # Spring Boot target – Java stub
│   └── library-service/            # Spring Boot target – Java stub
├── infra/
│   ├── docker-compose.dev.yml      # Full local stack with builds
│   ├── docker-compose.prod.yml     # Production-style override using images
│   └── postgres/
│       └── init.sql                # Creates per-service databases
└── .env.example                    # Base environment defaults
```

> The stub apps expose simple JSON responses so that `docker compose` comes up cleanly. Swap each stub with the framework listed in the service name comments.

## Prerequisites

- Docker and Docker Compose v2+
- ~6 GB of free memory recommended to run the full stack

## Quickstart (local development)

1) Copy environment defaults and adjust if needed:

```bash
cp .env.example .env
```

2) Build and start everything:

```bash
docker compose -f infra/docker-compose.dev.yml up --build
```

3) Access common endpoints:

- Keycloak: http://localhost:8080 (admin/admin by default)
- RabbitMQ UI: http://localhost:15672 (guest/guest)
- Postgres: localhost:5432 (see `.env` for credentials)
- Sample service ports: student (3001), course (3002), grades (3003), attendance (3004), user-auth (3005), document (3006), maintenance (3007), enrollment (3008), notifications (3009), transport (3010), analytics (3011), audit logging (3012), faculty (8101), administration (8102), hostel (8103), parent portal (8104), finance (8201), library (8202).

4) Tear down:

```bash
docker compose -f infra/docker-compose.dev.yml down
```

Add `-v` to remove volumes (drops all databases).

## Production-style compose

Build and push your images to a registry (set `REGISTRY`/`TAG` in `.env`), then run:

```bash
docker compose -f infra/docker-compose.dev.yml -f infra/docker-compose.prod.yml up -d
```

The production override swaps local builds for registry images while keeping the same topology.

## Database provisioning

`infra/postgres/init.sql` pre-creates isolated databases for each service (Keycloak included). Update the script if you add or rename services. All services share the same Postgres user/password from `.env`.

## Next steps

- Replace stubs with the target frameworks and real application code.
- Wire each service to its designated datastore (Postgres/Mongo/Redis) and messaging (RabbitMQ).
- Integrate Keycloak JWT validation in every service before exposing protected routes.
- Add CI/CD workflows to build, test, and publish images per service.

This scaffold follows the requested microservice breakdown while keeping local orchestration turnkey via Docker Compose.
