# finance-service

Spring Boot finance service for invoices, payments, ledgers, payroll, and student fee records.

## Run locally

```bash
cp .env.example .env
mvn spring-boot:run
```

## Test

```bash
mvn test
```

## Build

```bash
mvn clean package
```

## Required environment variables

- `DB_HOST`
- `DB_DATABASE`
- `DB_USERNAME`
- `DB_PASSWORD`

## Odoo invoice sync environment variables

- `ODOO_URL`
- `ODOO_DB`
- `ODOO_USERNAME`
- `ODOO_PASSWORD`
- `ODOO_TIMEOUT_MS` (default: `5000`)

## API notes

- Base routes under `/v1/`
- Invoice issue endpoint: `POST /v1/invoices/{id}/issue`
- Odoo sync retry endpoint: `POST /v1/invoices/{id}/odoo-sync/retry`

## Health/readiness

Service health/readiness endpoints should be exposed through platform gateway policy.
