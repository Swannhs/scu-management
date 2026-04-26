# SECURITY.md — SCU Management Platform Security Policy

## Reporting a vulnerability

If you discover a security vulnerability in this project, please **do not open a public GitHub issue**.

Report vulnerabilities by emailing the maintainers directly or by using GitHub's private security advisory feature:
**Security → Report a vulnerability** (in the GitHub repository).

We aim to acknowledge reports within 48 hours and provide a fix or mitigation plan within 14 days.

---

## Secrets and credentials policy

### Never hardcode secrets

The following must **never** appear as literal values in source code, Dockerfiles, or compose files:

- Passwords (database, Keycloak admin, application)
- JWT signing keys
- OAuth client secrets
- API tokens
- Private keys or certificates

### Use environment variables

All secrets must be passed via environment variables. In Docker Compose:

**Development** (safe fallback for local use only):
```yaml
JWT_SECRET: ${JWT_SECRET:-change-me-in-development}
```

**Production** (fail fast if not set):
```yaml
JWT_SECRET: ${JWT_SECRET:?JWT_SECRET is required}
KEYCLOAK_CLIENT_SECRET: ${KEYCLOAK_CLIENT_SECRET:?KEYCLOAK_CLIENT_SECRET is required}
POSTGRES_PASSWORD: ${POSTGRES_PASSWORD:?POSTGRES_PASSWORD is required}
```

### .env files

- `.env.example` — committed to the repository; contains placeholder values only.
- `.env` — never committed; created locally by copying `.env.example`.
- `.gitignore` must include `.env`.

---

## Authentication and authorisation

- All services must validate JWTs issued by Keycloak (realm: `scu`).
- Services must reject requests without a valid `Authorization: Bearer <token>` header, except for:
  - `GET /health`
  - `GET /ready`
  - `GET /docs` and `GET /openapi.json`
- Role-based access control must be enforced at the service level, not only at the gateway.
- Parent accounts may only access data for explicitly linked students.
- Faculty accounts may only manage attendance and grades for their assigned sections.

---

## Transport security

- In production, all external traffic must be served over HTTPS (TLS terminated at Traefik).
- Internal service-to-service communication runs on the private Docker network.
- The Traefik dashboard must not be exposed publicly in production.

---

## Database security

- Each service uses a dedicated database user with least-privilege access.
- Database containers must not have publicly exposed ports in production.
- Connection strings must use environment variables.

---

## File storage security

- Documents and uploads must be stored with access control enforced at the service level.
- Signed URLs or controlled download endpoints must be used — never expose raw file system paths.
- Audit logs must be created for sensitive document access (transcripts, certificates, ID documents).

---

## Dependency security

- Before adding a new dependency, check the GitHub Advisory Database for known vulnerabilities.
- The CI pipeline runs a secret scan on every push.
- Dependencies should be pinned to specific versions.

---

## Security headers

All HTTP services should set:

```
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
Strict-Transport-Security: max-age=31536000; includeSubDomains
```

---

## Rate limiting

Production deployments should configure rate limiting at the Traefik layer or within individual services to prevent abuse.

---

## Audit logging

Sensitive operations must emit audit events to the `audit-logging-service`:

- User login and logout
- Role changes
- Document access (transcripts, certificates)
- Grade modifications
- Payment transactions
- Admin configuration changes

---

## CI security checks

The CI pipeline enforces:

1. **Secret scan** — detects hardcoded credentials and tokens.
2. **Dependency scan** — checks for known vulnerabilities in dependencies.
3. **Docker Compose config validation** — ensures compose files are parseable and secrets are not hardcoded with literal values.
