# DSW01-Practica02 Development Guidelines

Auto-generated from all feature plans. Last updated: 2026-02-25

## Active Technologies

- Java 21 (mandatory backend) + Angular 21 (mandatory user-facing frontend) + Spring Boot 3.x, Spring Security, Spring Data JPA, springdoc-openapi (001-crud-empleados)

## Project Structure

```text
src/main/java/
src/main/resources/
src/test/java/
```

## Commands

# Add commands for Java 21 backend and Angular 21 frontend

## Code Style

Java 21 + Angular 21: Follow standard conventions

## API Versioning

- Public backend endpoints MUST use path versioning (`/api/v{major}/...`).
- Breaking API changes MUST bump the major path version.

## Recent Changes

- 001-crud-empleados: Updated runtime baseline to Java 21 + Angular 21 and kept Spring Boot 3.x stack

<!-- MANUAL ADDITIONS START -->
<!-- MANUAL ADDITIONS END -->
