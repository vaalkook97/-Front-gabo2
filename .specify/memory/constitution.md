<!--
Sync Impact Report
- Version change: 2.0.0 → 3.0.0
- Modified principles:
	- I. Service-Oriented Full-Stack Architecture → I. Mandatory Full-Stack Delivery Architecture
	- V. Containerization, Versioned API Contracts & Frontend Integration → V. Containerization, Versioned API Contracts & Frontend Runtime Integration
- Added sections:
	- None
- Removed sections:
	- None
- Templates requiring updates:
	- ✅ updated: .specify/templates/plan-template.md
	- ✅ updated: .specify/templates/spec-template.md
	- ✅ updated: .specify/templates/tasks-template.md
	- ✅ updated: specs/001-crud-empleados/quickstart.md
	- ✅ updated: .github/agents/copilot-instructions.md
	- ⚠ pending: .specify/templates/commands/*.md (directory not present; nothing to update)
- Deferred TODOs:
	- None
-->

# DSW01-Practica02 Constitution

## Core Principles

### I. Mandatory Full-Stack Delivery Architecture
All user-facing scoped features MUST define an API-first backend in Spring Boot services
AND a frontend implemented in Angular 21. Non-user-facing technical features MAY remain
backend-only when explicitly justified in plan.md. Any frontend scope MUST consume
versioned backend APIs and MUST NOT bypass backend security or business rules.

Rationale: Mandatory full-stack delivery for user-facing scope avoids integration gaps
and ensures a consistent product architecture.

### II. Runtime & Framework Baseline
All backend services MUST run on Java 21 (LTS) and Spring Boot 3.x. Frontend
applications, when present, MUST use Angular 21 with a Node.js LTS runtime compatible
with Angular 21. Any downgrade, mixed unsupported runtime, or alternative frontend
framework MUST be rejected unless approved through governance.

Rationale: A single runtime baseline improves compatibility, operability, and supportability.

### III. Security Baseline (NON-NEGOTIABLE)
All exposed endpoints MUST be protected with HTTP Basic Authentication by default.
The baseline credentials for non-production development environments are fixed as
username `admin` and password `admin123`. Production deployments MUST replace these
credentials via environment-based secure configuration and MUST NOT embed secrets in
source-controlled files.

Rationale: Enforcing default authentication and secret hygiene prevents accidental
unauthenticated exposure and hard-coded credential risks.

### IV. Data & Persistence Discipline
Primary persistence MUST be PostgreSQL. Data access MUST use explicit migrations, clear
entity constraints, and environment-specific connection configuration. Features that add
or change data behavior MUST include integration tests covering repository and API layers.

Rationale: PostgreSQL standardization and migration discipline minimize runtime drift and
data integrity regressions.

### V. Containerization, Versioned API Contracts & Frontend Runtime Integration
Services MUST be executable with Docker and documented with OpenAPI/Swagger. Every
public backend endpoint MUST appear in generated API docs with authentication
expectations and response models. Every public backend route MUST be explicitly
versioned in the path using `/api/v{major}/...` (for example `/api/v1/empleados`), and
breaking API changes MUST increment the major version path. Angular 21 frontend
applications MUST target the published versioned API paths and MUST document
environment-based API base URL configuration. Container build/runtime definitions MUST
be reproducible in development and CI.

Rationale: Container-first execution and explicit API contracts improve deployment
predictability and integration readiness.

## Technical Standards

- Framework: Spring Boot 3.x (Web, Security, Validation, Data JPA as needed).
- Backend Language: Java 21 (LTS).
- Frontend Framework: Angular 21 (when frontend scope exists).
- Frontend Runtime: Node.js LTS compatible with Angular 21.
- Database: PostgreSQL as system of record.
- API Docs: springdoc-openapi/Swagger UI enabled in non-production by default.
- API Versioning: Public routes MUST use `/api/v{major}/...`; non-versioned public
	routes are non-compliant.
- Container Runtime: Dockerfile and local container execution MUST be maintained.
- Configuration: Environment variables MUST be preferred for secrets and deploy-specific
	values; committed defaults MAY exist only for local development and MUST be clearly
	non-production.

## Delivery Workflow & Quality Gates

1. Specifications and plans MUST include constitution checks before implementation.
2. Pull requests MUST confirm: Java 21/Spring Boot 3 backend compliance, Angular 21
	frontend compliance (if applicable), Basic Auth coverage, PostgreSQL alignment,
	Docker viability, versioned API paths, and Swagger documentation completeness.
3. Changes affecting authentication, persistence, or API contracts MUST include tests
	 and updated operational documentation.
4. CI pipelines SHOULD run unit and integration tests; failures in security or migration
	 checks MUST block merge.

## Governance
This constitution supersedes local conventions for architecture and delivery quality.
Amendments require: (a) a documented change proposal, (b) impact analysis on templates
and active specs, and (c) maintainer approval.

Versioning policy:
- MAJOR: backward-incompatible governance changes or principle removal/redefinition.
- MINOR: new principle/section or materially expanded mandatory guidance.
- PATCH: wording clarifications and non-semantic refinements.

Compliance review expectations:
- Every plan and spec MUST include an explicit constitution compliance check.
- Every task breakdown MUST include security, data, containerization, API-doc tasks,
	and Angular 21 frontend integration tasks for user-facing scope.
- Every API-impacting change MUST include explicit verification of route versioning and
	OpenAPI path updates.
- Non-compliant changes MUST be remediated before merge or explicitly waived by approved
	governance exception.

**Version**: 3.0.0 | **Ratified**: 2026-02-25 | **Last Amended**: 2026-04-06
