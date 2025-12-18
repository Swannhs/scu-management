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

Refer to individual service READMEs (if available) or the main documentation for details.
