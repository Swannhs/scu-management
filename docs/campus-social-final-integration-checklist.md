# Campus-Social Final Integration Checklist

## 1) Ordered patch checklist

### Must merge first
1. **Gateway route/auth enforcement for campus-social**
   - File: `archive/api-gateway/src/config/services.config.ts`
   - Status target:
     - campus-social route families mapped
     - `authMode: gateway-jwt`
     - `tenantRequired: true`
     - `allowedRoles: ['STUDENT', 'FACULTY', 'TENANT_ADMIN']`
2. **Gateway OpenAPI registry fallback wiring**
   - File: `archive/api-gateway/openapi/services.json`
   - Status target:
     - `campus-social-service` fallback uses `openapi/specs/campus-social-service.json`
3. **Campus-social OpenAPI parity between service and gateway fallback**
   - Files:
     - `services/campus-social-service/openapi/openapi.json`
     - `archive/api-gateway/openapi/specs/campus-social-service.json`
   - Status target:
     - equivalent route surface for integration-critical families

### Should merge next
4. **Campus-social runtime docs endpoint stability**
   - File: `services/campus-social-service/src/main.ts`
   - Status target:
     - robust OpenAPI file resolution + cache for `/openapi.json` and `/api-docs-json`
5. **Media contract/docs alignment with document-service flow**
   - Files:
     - `services/campus-social-service/src/social/services/media.service.ts`
     - `services/campus-social-service/src/social/services/media.service.spec.ts`
     - `services/campus-social-service/README.md`
   - Status target:
     - document-service lifecycle upload
     - canonical `fileId` preserved
     - temporary compatibility alias `id` documented

### Optional cleanup
6. **Compose path de-duplication messaging**
   - Files:
     - `README.md`
     - `docker-compose.yml`
     - `infra/docker-compose.yml`
     - `docker/docker-compose.yml`
   - Status target:
     - one source-of-truth compose path documented
     - deprecated entrypoints explicitly labeled
7. **Legacy naming clarity**
   - Files:
     - `archive/api-gateway/openapi/specs/social-service.json`
     - `docker/docker-compose.yml`
     - `README.md`
   - Status target:
     - legacy `social-service` clearly non-canonical

---

## 2) Dependency order

1. `archive/api-gateway/src/config/services.config.ts` (routing/auth contract)
2. `archive/api-gateway/openapi/services.json` (spec registry contract)
3. `services/campus-social-service/openapi/openapi.json` + `archive/api-gateway/openapi/specs/campus-social-service.json` (API contract parity)
4. `services/campus-social-service/src/main.ts` (runtime docs serving reliability)
5. media alignment (`media.service.ts`, spec, README)
6. compose/doc cleanup and legacy deprecation notes

---

## 3) Rollback-sensitive files

These files affect runtime routing, auth, infra startup, or API contract behavior and should be reverted only with coordinated validation:

- `archive/api-gateway/src/config/services.config.ts`
- `archive/api-gateway/openapi/services.json`
- `archive/api-gateway/openapi/specs/campus-social-service.json`
- `services/campus-social-service/openapi/openapi.json`
- `services/campus-social-service/src/main.ts`
- `services/campus-social-service/src/social/services/media.service.ts`
- `docker/docker-compose.yml`

Medium sensitivity (doc/process behavior):
- `README.md`
- `services/campus-social-service/README.md`
- `docker-compose.yml`
- `infra/docker-compose.yml`
- `archive/api-gateway/openapi/specs/social-service.json`

---

## 4) Testing checklist

### Contract + config checks
- [ ] Gateway resolves campus-social route families to `campus-social-service`.
- [ ] Gateway auth/role checks for campus-social endpoints are enforced as configured.
- [ ] `services.json` fallback path for campus-social resolves to gateway-local file.
- [ ] Gateway fallback and service OpenAPI files are semantically aligned for required families.

### Runtime checks
- [ ] `GET /openapi.json` from campus-social returns valid JSON in local and container layouts.
- [ ] `GET /api-docs-json` from campus-social returns same schema.
- [ ] Gateway merged OpenAPI includes campus-social paths.

### Media checks
- [ ] `POST /v1/media/upload` returns `fileId` (canonical) and `id` (compat alias).
- [ ] Uploaded media can be referenced in post/message flows via `fileId`.

### Infrastructure checks
- [ ] Canonical startup command uses `docker/docker-compose.yml`.
- [ ] Deprecated compose stubs are not used in runbooks.

---

## 5) Final readiness assessment

**Assessment: Conditionally ready for integration release.**

### Ready now
- Core campus-social backend integration seams are implemented across gateway routing, gateway OpenAPI registry, and service OpenAPI exposure.
- Media path is aligned to document-service with explicit compatibility handling.
- Compose source-of-truth is documented with duplicate entrypoints explicitly deprecated.

### Must be confirmed in release gate
- End-to-end gateway auth + tenant + role behavior for all campus-social route families.
- OpenAPI merge artifact verification in the deployment environment.
- Runbook/use of canonical compose path only.

If those gate checks pass, integration is release-ready without additional architecture changes.
