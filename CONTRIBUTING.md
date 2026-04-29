# CONTRIBUTING.md — SCU Management Platform

Thank you for contributing to SCU Management. Please read this guide before opening a branch or pull request.

---

## Prerequisites

- Docker and Docker Compose
- Node.js 20+ (for NestJS/Node services)
- Python 3.11+ (for FastAPI services)
- Java 17+ and Maven (for Spring Boot services)
- PHP 8.2+ and Composer (for Laravel services)

---

## Local setup

1. Clone the repository.
2. Copy the environment file:
   ```bash
   cp .env.example .env
   ```
3. Start the full development stack:
   ```bash
   ./dev.sh
   # or
   docker compose -f docker/docker-compose.yml up --build
   ```
4. Verify the gateway is routing correctly:
   ```bash
   npm run smoke:traefik
   ```

### Start only infrastructure (faster for service development)

```bash
docker compose -f docker/docker-compose.infra.yml up -d
```

Then start the individual service you are working on directly:
```bash
# NestJS
cd services/course-service && npm install && npm run start:dev

# FastAPI
cd services/enrollment-service && pip install -r requirements.txt && uvicorn main:app --reload

# Spring Boot
cd services/finance-service && mvn spring-boot:run

# Laravel
cd services/faculty-service && composer install && php artisan serve
```

---

## Branch naming

```
feat/<scope>/<short-description>
fix/<scope>/<short-description>
docs/<scope>/<short-description>
chore/<scope>/<short-description>
test/<scope>/<short-description>
```

Examples:
```
feat/course-service/add-prerequisites
fix/grades-service/gpa-rounding-error
docs/enrollment-service/update-readme
chore/docker/fix-compose-secrets
```

---

## Commit messages

Follow the Conventional Commits format:

```
<type>(<scope>): <subject>
```

| Type | When to use |
|------|-------------|
| `feat` | New feature |
| `fix` | Bug fix |
| `docs` | Documentation only |
| `chore` | Build, tooling, or dependency changes |
| `test` | Adding or fixing tests |
| `refactor` | Code restructuring without behaviour change |
| `ci` | CI/CD configuration |

---

## Pull request process

1. Open a PR against `develop` (not `main`).
2. Fill in the PR template.
3. Ensure the following before requesting review:
   - [ ] All existing tests pass
   - [ ] New logic has tests
   - [ ] No hardcoded secrets
   - [ ] `docker compose -f docker/docker-compose.yml config` passes
   - [ ] `.env.example` updated if new environment variables were introduced
   - [ ] `README.md` updated if the service API changed
4. A human reviewer must approve before merging.
5. AI agents must not merge their own PRs.

---

## Code standards

### All services

- Follow the existing error format: `{ error: { code, message, details } }`
- All routes must be under `/v1/`
- Authenticated endpoints must reject requests without a valid JWT
- Public endpoints are limited to: `GET /health`, `GET /ready`, `GET /docs`, `GET /openapi.json`

### NestJS / Node.js

- Use TypeScript strict mode
- Use class-validator DTOs for all request bodies
- Use NestJS guards for authentication and authorisation
- Tests: Jest (`npm test`)

### FastAPI / Python

- Use Pydantic models for all request and response bodies
- Use type annotations on all functions
- Use dependency injection for auth (`Depends(get_current_user)`)
- Tests: pytest (`pytest`)

### Spring Boot / Java

- Use Spring Security for auth
- Use Bean Validation (`@Valid`) on request bodies
- Tests: JUnit 5 (`mvn test`)

### Laravel / PHP

- Use Form Requests for validation
- Use Laravel Sanctum or Passport for auth middleware
- Tests: PHPUnit (`php artisan test`)

---

## Service checklist

Before marking a service as `active`, ensure it has:

- [ ] `README.md`
- [ ] `.env.example`
- [ ] `Dockerfile`
- [ ] `GET /health` → `{ "status": "ok" }`
- [ ] `GET /ready` → readiness check
- [ ] Test command documented
- [ ] API routes documented (OpenAPI or route list)
- [ ] Migration/seed instructions

---

## Secrets policy

See `SECURITY.md` for the full policy. In short:

- Never hardcode passwords, tokens, or keys.
- Use `${VAR:-dev-default}` in dev compose.
- Use `${VAR:?VAR is required}` in prod compose.
- Add all new variables to `.env.example`.

---

## Architecture decisions

Significant technical decisions should be recorded in `docs/decisions/` as Architecture Decision Records (ADRs). See `docs/decisions/README.md` for the template.

---

## Getting help

- Read `ARCHITECTURE.md` for service layout and integration patterns.
- Read `ROADMAP.md` for current phase and priorities.
- Open a GitHub Discussion for design questions before starting large changes.
