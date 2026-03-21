# SCU Management Platform

SCU Management is a multi-service university platform with an API gateway, academic core services, support services, and campus engagement modules.

## Current integration baseline

- API ingress is handled by `services/api-gateway`.
- Campus social is the canonical social module: `services/campus-social-service`.
- Media uploads for campus social are stored through `services/document-service`.
- The canonical Docker Compose file is `docker/docker-compose.yml`.
- Deprecated compose entrypoints: `docker-compose.yml` and `infra/docker-compose.yml` (kept as stubs to prevent split setup paths).

## Primary services

- `user-service`
- `course-service`
- `assessment-service`
- `attendance-service`
- `grades-service`
- `placement-service`
- `campus-social-service`
- `document-service`
- `api-gateway`

Supporting services are also present in `services/` for finance, library, notifications, transport, analytics, maintenance, events, clubs, awards, platform admin, and additional legacy modules.

Legacy note:
- `services/social-service` is a legacy module kept for compatibility only.
- `services/campus-social-service` is the canonical social service name for gateway, compose, and OpenAPI integration.

## Quick start

```bash
./dev.sh
```

Or directly:

```bash
docker compose -f docker/docker-compose.yml up --build
```

Key local endpoints:

- Gateway: `http://localhost`
- Gateway docs: `http://localhost/api-docs`
- Gateway merged OpenAPI: `http://localhost/api-docs/openapi.json`
- Campus social websocket: `ws://localhost/ws`
- Keycloak: `http://localhost:8080`
- RabbitMQ management: `http://localhost:15672`

## Development

Each service lives under `services/<service-name>`.

- NestJS / Express services: `npm install && npm run start:dev`
- Spring Boot services: `mvn spring-boot:run`
- FastAPI services: `pip install -r requirements.txt && uvicorn main:app --reload`
- Laravel services: `composer install && php artisan serve`

## Campus-social client status

- A frontend/mobile client workspace exists at `apps/campus-social` (Flutter multi-platform project: Android, iOS, web, desktop targets).
- The current app is scaffold-level and does not contain discoverable runtime API/WebSocket base URL configuration for `campus-social-service` or `api-gateway`.
- Until client integration is implemented, treat `services/campus-social-service` as backend-only from an integration perspective.

### Recommended app location convention

- Web client: `apps/campus-social-web`
- Mobile client: `apps/campus-social-mobile`
- Shared client SDKs/types: `libs/campus-social-client`

## OpenAPI

- Gateway registry: `services/api-gateway/openapi/services.json`
- Gateway merged artifact: `services/api-gateway/openapi/generated/combined.openapi.json`
- Campus social canonical spec: `services/campus-social-service/openapi/openapi.json`
- Document service canonical spec: `services/document-service/openapi.json`

## Testing

Run tests per service from the service directory.

- Node services: `npm test`
- Python services: `pytest`
- Spring services: `mvn test`
- Laravel stub services: `php test_stub.php`
