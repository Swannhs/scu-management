# Architecture Decision Records

This directory contains Architecture Decision Records (ADRs) for the SCU Management platform.

An ADR is a short document that captures an important architectural decision made in the project, along with its context and consequences.

---

## Format

Create a new file named `NNN-short-title.md` for each decision, where `NNN` is the next available number (zero-padded to 3 digits).

Example: `001-canonical-keycloak-realm.md`

---

## Template

```markdown
# NNN — Title

**Date:** YYYY-MM-DD
**Status:** proposed | accepted | deprecated | superseded

## Context

Why does this decision need to be made? What is the problem or situation?

## Decision

What was decided?

## Consequences

What are the results of making this decision? Include positives and negatives.

## Alternatives considered

What other options were evaluated?
```

---

## Index

| ADR | Title | Status |
|-----|-------|--------|
| [001](001-canonical-keycloak-realm.md) | Canonical Keycloak realm name is `scu` | accepted |
