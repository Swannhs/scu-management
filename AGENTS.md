# AGENTS.md — AI Builder Rules

This file defines the rules and conventions for AI agents (GitHub Copilot, Codex, etc.) working inside the SCU Management repository.

---

## Repository overview

SCU Management is a polyglot microservices platform for university management. It uses NestJS, FastAPI, Spring Boot, and Laravel services behind a Traefik API gateway, with Keycloak for identity, PostgreSQL/MongoDB for storage, RabbitMQ for events, and Redis for caching.

---

## Canonical files to read first

Before making any change, read:

1. `ARCHITECTURE.md` — service catalog, tech stack, and integration patterns
2. `ROADMAP.md` — current phase, milestones, and build order
3. `CONTRIBUTING.md` — branch naming, PR rules, code standards
4. `SECURITY.md` — secret handling policy

---

## What AI agents may do

- Read any file in the repository
- Create branches and commits
- Open pull requests
- Edit code and documentation
- Add tests
- Add or update `README.md`, `.env.example`, `Dockerfile`, health endpoints
- Create small, targeted issues for future AI tasks

## What AI agents must NOT do

- Merge pull requests (humans review and merge)
- Commit secrets, credentials, or tokens
- Delete or overwrite existing migration files
- Push directly to `main` or `develop`
- Modify `.github/agents/` files
- Introduce dependencies without checking the advisory database

---

## Branch naming

```
feat/<scope>/<short-description>
fix/<scope>/<short-description>
docs/<scope>/<short-description>
chore/<scope>/<short-description>
```

Examples:
```
feat/course-service/add-health-endpoint
fix/grades-service/gpa-rounding
docs/architecture/update-service-catalog
chore/docker/fix-secret-defaults
```

---

## Commit message format

```
<type>(<scope>): <subject>
```

Types: `feat`, `fix`, `docs`, `chore`, `test`, `refactor`, `ci`

Examples:
```
feat(course-service): add POST /v1/courses endpoint
fix(grades-service): correct weighted GPA calculation
docs(architecture): add service status table
ci(docker): add compose config validation workflow
```

---

## Code change rules

1. Make the smallest change that fully satisfies the issue.
2. Do not refactor unrelated code.
3. Add or update tests for every logic change.
4. Update `README.md` and `API docs` if the public interface changes.
5. Never hardcode secrets — use environment variables.
6. Every new service endpoint must be covered by an auth guard.
7. Follow the existing error format: `{ error: { code, message, details } }`.

---

## Service standards checklist

Every service must have:

- [ ] `README.md` with setup, env vars, and API summary
- [ ] `.env.example` with all required variables
- [ ] `Dockerfile`
- [ ] `GET /health` endpoint returning `{ status: "ok" }`
- [ ] `GET /ready` endpoint returning readiness state
- [ ] Test command documented in `README.md`
- [ ] Migration/seed instructions

---

## AI-ready issue labels

Issues labelled `ai:ready` are pre-scoped for AI agents. They:

- Have a single, clear deliverable
- Reference the target service and file paths
- Include acceptance criteria
- Are small enough to complete in one PR

Do not work on issues that are not labelled `ai:ready` unless instructed by a human.

---

## Pull request checklist

Before opening a PR:

- [ ] All tests pass locally
- [ ] No hardcoded secrets
- [ ] `docker compose config` passes
- [ ] New endpoints have auth tests
- [ ] `.env.example` updated if new variables introduced
- [ ] PR description explains what changed and why

---

## Secrets policy

- Never use `${VAR:-hardcoded-secret}` in production compose files.
- Use `${VAR:?VAR is required}` in `docker-compose.prod.yml`.
- Add all new variables to `.env.example` with a safe placeholder.
- See `SECURITY.md` for the full policy.

---

## Keycloak realm

The canonical realm name is `scu`. Do not introduce new realm names.

---

## API versioning

All API routes use `/v1/` prefix. Example: `GET /v1/courses`.

---

## Dependency policy

Before adding a new package dependency:

1. Check if an existing library already covers the need.
2. Check the GitHub Advisory Database for known vulnerabilities.
3. Pin to a specific version; do not use `*` or `latest`.
