# API Gateway

The API gateway is the single ingress point for the SCU Management platform. It standardizes auth and tenant middleware, proxies routed backend APIs, serves merged OpenAPI docs, and forwards the campus social websocket entrypoint.

## Routed services

- Core HTTP routes are defined in `src/config/services.config.ts`.
- Service-owned OpenAPI sources are registered in `openapi/services.json`.
- Campus social realtime traffic is proxied from `GET /ws` to `campus-social-service`.

## OpenAPI

- Merged spec JSON: `GET /api-docs/openapi.json`
- ReDoc UI: `GET /api-docs`
- Manual rebuild: `POST /api-docs/rebuild`
- Registry: `openapi/services.json`
- Generated artifact: `openapi/generated/combined.openapi.json`

Service entries can use either checked-in gateway fallback specs or canonical service-owned specs such as `../campus-social-service/openapi/openapi.json`.

## Local commands

```bash
npm install
npm run start:dev
npm run test
npm run openapi:merge
npm run openapi:merge:check
```

## Integration notes

- `CAMPUS_SOCIAL_SERVICE_URL` should point at `http://campus-social-service:3000` in Docker.
- `DOCUMENT_SERVICE_URL` is routed through the gateway for `/v1/files/*` and is also consumed directly by `campus-social-service` for media upload handoff.
- Gateway auth is route-aware: some endpoints are public, while tenant-protected routes require `X-Tenant-ID` and either local JWT validation or auth passthrough depending on route config.
