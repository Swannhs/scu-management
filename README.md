# University Management System

A microservices-based University Management System.

## Architecture
- **Student Service** (NestJS)
- **Grades Service** (NestJS)
- **Attendance Service** (NestJS)
- **Course Service** (NestJS)
- **Finance Service** (Spring Boot)
- **Library Service** (Spring Boot)
- **Notifications Service** (FastAPI)
- **Transport Service** (FastAPI)
- **Analytics Service** (FastAPI)
- **Faculty Service** (Laravel)
- **Hostel Service** (Laravel)
- **Parent Portal Service** (Laravel)
- **Admin Config Service** (Laravel)
- **Enrollment Service** (FastAPI)
- **User Auth Service** (NestJS)
- **Document Service** (Express)
- **Maintenance Service** (Express)
- **Audit & Logging Service** (FastAPI)
- **Infrastructure**: Keycloak, PostgreSQL, MongoDB, Redis, RabbitMQ.

## Prerequisites
- Docker & Docker Compose
- Node.js (for local dev of NestJS)
- Java 17 (for local dev of Spring Boot)
- Python 3.11 (for local dev of FastAPI)
- PHP 8.2 & Composer (for local dev of Laravel)

## Getting Started

1. Navigate to the project root.
2. Run the entire system with Docker Compose:
   ```bash
   docker-compose -f infra/docker-compose.yml up --build
   ```
   *Note: First run will take time to build all images.*

3. Access services:
   - **Keycloak**: http://localhost:8080 (admin/admin)
   - **Student Service**: http://localhost:3001
   - **Finance Service**: http://localhost:8081
   - **Notifications Service**: http://localhost:8001
   - **Faculty Service**: http://localhost:8004
   - **RabbitMQ Management**: http://localhost:15672

## Development
Each service is located in `services/<service-name>`.
- **NestJS**: `npm install` && `npm run start:dev`
- **Spring Boot**: `mvn spring-boot:run`
- **FastAPI**: `pip install -r requirements.txt` && `uvicorn main:app --reload`
- **Laravel**: `composer install` && `php artisan serve`

## MVP Academic Core APIs

### Tenant Onboarding
- `POST /v1/tenants`
- `POST /v1/tenants/{tenantId}/bootstrap`
- `GET /v1/tenants/{tenantId}`
- `PATCH /v1/tenants/{tenantId}`

### Core Setup / Master Data (Course Service)
- `POST /v1/academic-years`, `GET /v1/academic-years`
- `POST /v1/terms`, `GET /v1/terms?academicYearId=...`
- `POST /v1/departments`, `GET /v1/departments`
- `POST /v1/programs`, `GET /v1/programs`
- `POST /v1/rooms`, `GET /v1/rooms`

### Course Catalog + Sections (Course Service)
- `POST /v1/courses`, `GET /v1/courses`
- `POST /v1/sections`, `GET /v1/sections?termId=...`, `GET /v1/sections/{id}`

### Student + Admissions (Enrollment Service)
- `POST /v1/applications`
- `GET /v1/applications?status=...`
- `POST /v1/applications/{id}/approve`
- `POST /v1/students`, `GET /v1/students/{id}`, `GET /v1/students?programId=...`

### Enrollment / Registration (Enrollment Service)
- `POST /v1/enrollments`
- `DELETE /v1/enrollments/{id}`
- `GET /v1/students/{id}/enrollments`
- `GET /v1/sections/{id}/roster`

### Attendance (Attendance Service)
- `POST /v1/attendance/sessions`
- `POST /v1/attendance/sessions/{id}/mark`
- `GET /v1/students/{id}/attendance?termId=...`
- `GET /v1/sections/{id}/attendance?from=...&to=...`

### Grades / Transcript (Grades Service)
- `POST /v1/assessments`
- `POST /v1/assessments/{id}/scores`
- `POST /v1/final-grades/compute?sectionId=...`
- `GET /v1/students/{id}/transcript`

### Example cURL (replace service host/port)
```bash
curl -X POST http://localhost:3000/v1/courses \
  -H "Authorization: Bearer <token>" \
  -H "X-Tenant-ID: <tenant-uuid>" \
  -H "Content-Type: application/json" \
  -d '{"name":"Intro to CS","code":"CS101","credits":3}'

curl -X POST http://localhost:8000/v1/enrollments \
  -H "Authorization: Bearer <token>" \
  -H "X-Tenant-ID: <tenant-uuid>" \
  -H "Content-Type: application/json" \
  -d '{"studentId":"student-1","sectionId":"section-1"}'
```

## Testing
Tests can be run locally for each service:
- **NestJS/Express**: `npm test`
- **Spring Boot**: `mvn test` (or use docker if `mvn` not installed)
- **FastAPI**: `pytest`
- **Laravel (Stubs)**: `php test_stub.php`

To run all tests in one go:
```bash
# NestJS/Express
for d in services/*-service; do [ -f "$d/package.json" ] && (cd "$d" && npm test); done
# FastAPI
for d in services/*-service; do [ -f "$d/test_main.py" ] && (cd "$d" && pytest); done
# PHP
for d in services/*-service; do [ -f "$d/test_stub.php" ] && (php "$d/test_stub.php"); done
```

## MVP+ Product Modules (new)
- **Events Service** (`services/events-service`): events CRUD, publish/register/check-in, calendar, and participation history.
- **Clubs Service** (`services/clubs-service`): clubs CRUD, membership and role management, club-event linking.
- **Awards Service** (`services/awards-service`): award programs, nominations, approvals, certificate issuance, achievements.
- **Platform Admin Service** (`services/platform-admin-service`): super-admin tenant, subscription, feature toggle, and monitoring endpoints.

## Unified OpenAPI
- Gateway merged spec: `GET /api-docs/openapi.json`
- Gateway docs UI: `GET /api-docs`
- Service registry: `services/api-gateway/openapi/services.json`
- Fallback specs (for resilience when a service is down): `services/api-gateway/openapi/specs/*.json`
