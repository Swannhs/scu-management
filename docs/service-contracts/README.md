# Service Contracts

This directory contains the canonical API contracts (OpenAPI / AsyncAPI specs) for each SCU Management service.

---

## Conventions

- Each service has a subdirectory: `<service-name>/`
- Synchronous HTTP APIs use OpenAPI 3.x: `<service-name>/openapi.json` or `openapi.yaml`
- Asynchronous event APIs use AsyncAPI 2.x: `<service-name>/asyncapi.yaml`
- Contracts are the source of truth for inter-service integration

---

## Index

| Service | Contract | Format |
|---------|----------|--------|
| `campus-social-service` | `../services/campus-social-service/openapi/openapi.json` | OpenAPI 3.x |
| `document-service` | `../services/document-service/openapi.json` | OpenAPI 3.x |
| (others pending) | | |

---

## Adding a new contract

1. Create a subdirectory: `docs/service-contracts/<service-name>/`
2. Add the contract file(s).
3. Update the index table above.
4. Reference the contract in the service `README.md`.
