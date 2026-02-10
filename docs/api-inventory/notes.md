# Inventory + Swagger Merge Notes

## What this change adds
- Static API inventory generator script: `scripts/generate-api-inventory.py`.
- Generated artifacts:
  - `docs/api-inventory/implemented.endpoints.json`
  - `docs/api-inventory/documented.endpoints.json`
  - `docs/api-inventory/done-vs-remaining.md`
- Unified gateway docs endpoint remains at `/api-docs`, with combined spec available at `/openapi.json`.

## How to regenerate
```bash
python scripts/generate-api-inventory.py
(cd services/api-gateway && npm run openapi:merge)
```
