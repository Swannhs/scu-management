# 001 — Canonical Keycloak Realm

**Date:** 2026-04-26
**Status:** accepted

## Context

The repository contained multiple realm names in use across services: `scu`, `university-platform`, and some services with no realm configured at all. This inconsistency causes authentication failures when services are integrated.

## Decision

The canonical Keycloak realm is `scu`. All services must set `KEYCLOAK_REALM=scu`. The value `university-platform` is deprecated.

## Consequences

- All services that currently reference `university-platform` must be updated to use `scu`.
- New services must use `scu` from the start.
- The `.env.example` documents `KEYCLOAK_REALM=scu` as the standard value.

## Alternatives considered

- Use `university-platform` as the canonical name — rejected because `scu` is shorter and already used by the campus-social service.
- Let each service choose its own realm — rejected because cross-service token validation requires a shared realm.
