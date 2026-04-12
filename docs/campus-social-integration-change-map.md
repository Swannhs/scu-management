# Campus Social Service Integration Change Map

## 1) Confirmed issues by file

### `archive/api-gateway/openapi/services.json`
- `campus-social-service` uses a cross-service fallback path (`../campus-social-service/openapi/openapi.json`) instead of the gateway-local `openapi/specs/...` pattern used by most other services. This made gateway OpenAPI generation depend on directory layout outside the archived gateway and bypass `archive/api-gateway/openapi/specs/campus-social-service.json` as an effective fallback artifact.

### `archive/api-gateway/openapi/specs/campus-social-service.json`
- This file duplicates the campus-social canonical spec content, but `services.json` is currently wired to a different fallback source path. Result: one of these artifacts is redundant or stale-risk depending on build path behavior.

### `services/campus-social-service/README.md`
- API docs list includes endpoints that are not present in the canonical OpenAPI surface used by the gateway spec (examples: invite flows, friend block/unblock/blocked, mutual friends, read-state).
- API summary includes `POST /v1/notifications/:id/read`, but the OpenAPI spec lists `GET /v1/notifications` and `GET /v1/notifications/unread-count` only.
- README claims gateway proxies `/ws`, but the focused gateway route registry (`services.config.ts`) does not model websocket routes; websocket integration is implemented separately in gateway runtime (`src/main.ts`). This split is valid but undocumented in gateway config docs and can cause operator confusion.

### `README.md`
- Declares `docker/docker-compose.yml` as canonical compose file, while a root-level `docker-compose.yml` also exists with a different stack model and no `campus-social-service` service.
- This dual-compose state creates integration ambiguity for teams trying to run campus-social + gateway together.

### `docker-compose.yml` (root)
- No `campus-social-service` service.
- Gateway environment in this file is aligned to an older stack (`academic-service`, `student-service`, `fee-service`) and does not expose `CAMPUS_SOCIAL_SERVICE_URL`, so campus-social integration is absent in this compose path.

### `infra/docker-compose.yml`
- Focused file is missing from repository.
- Any documentation/process expecting this path currently cannot validate or run campus-social integration from `infra/`.

## 2) Missing integrations

1. **Compose-path integration gap**
   - Root `docker-compose.yml` does not include the campus-social service and does not provide gateway env wiring for it.
2. **OpenAPI fallback alignment gap**
   - Gateway service registry points campus-social fallback to service-local spec outside gateway folder; this sidesteps the gateway-local fallback convention and creates duplicate-source ambiguity.
3. **Infra compose path gap**
   - `infra/docker-compose.yml` is referenced in scope but absent, so no infra-compose integration entry point exists.

## 3) Naming inconsistencies

1. **Compose topology naming drift**
   - Root compose uses legacy names (`academic-service`, `student-service`, `fee-service`) while canonical compose and gateway config are centered on `course-service`, `grades-service`, `campus-social-service`, etc.
2. **OpenAPI fallback location inconsistency**
   - Most services use `openapi/specs/<service>.json`; campus-social uses `../campus-social-service/openapi/openapi.json`.
3. **Social service naming overlap in compose**
   - `docker/docker-compose.yml` includes both `social-service` and `campus-social-service`, which can be misread as equivalent social integrations although only one is the campus-social module.

## 4) Docs inconsistencies

1. Campus-social README route inventory is broader than gateway-facing OpenAPI spec for multiple endpoints.
2. Campus-social README API summary includes at least one route not present in current OpenAPI spec (`POST /v1/notifications/:id/read`).
3. Root README says canonical compose is `docker/docker-compose.yml`, but repository still contains root `docker-compose.yml` with materially different integration wiring.
4. Requested `infra/docker-compose.yml` path does not exist, but no top-level doc callout explains that `docker/docker-compose.yml` replaced it.

## 5) Recommended fix order

1. **Decide and document one compose truth**
   - Either retire root `docker-compose.yml` or align it with canonical campus-social + gateway wiring.
2. **Normalize OpenAPI fallback strategy for campus-social**
   - Choose one source of truth: gateway-local fallback spec or service-local canonical spec; then remove/automate the duplicate.
3. **Reconcile campus-social README route lists with OpenAPI**
   - Keep only endpoints present in current implementation/spec for integration docs.
4. **Clarify websocket integration contract in docs**
   - Explicitly note that `/ws` proxy is configured in gateway runtime (`main.ts`) rather than `services.config.ts`.
5. **Resolve missing `infra/docker-compose.yml` expectation**
   - Add the file, add a redirect note, or remove references to avoid dead integration paths.
