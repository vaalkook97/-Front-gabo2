# Feature Specification: Login maestro por email

**Feature Branch**: `001-master-email-login`  
**Created**: 2026-03-13  
**Status**: Draft  
**Input**: User description: "login con email y contraseña, usuario master hardcodeado en environment.ts, redirigir a /empleados al autenticar, sesión en localStorage"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Iniciar sesión con usuario maestro (Priority: P1)

Como usuario autorizado, quiero iniciar sesión con email y contraseña para entrar al sistema de empleados.

**Why this priority**: Sin autenticación no existe acceso controlado al módulo principal.

**Independent Test**: Abrir la pantalla de login, enviar credenciales válidas del usuario maestro y comprobar acceso autorizado.

**Acceptance Scenarios**:

1. **Given** que el usuario está en login y escribe email y contraseña correctos del usuario maestro, **When** envía el formulario, **Then** el sistema autentica la sesión y muestra el módulo de empleados.
2. **Given** que el usuario envía credenciales inválidas, **When** se valida el formulario, **Then** el sistema niega acceso y muestra un mensaje de error sin crear sesión.

---

### User Story 2 - Mantener sesión en navegador (Priority: P2)

Como usuario autenticado, quiero que la sesión persista en el navegador para no perder acceso al recargar la página.

**Why this priority**: Mejora continuidad de uso y evita relogin innecesario en cada recarga.

**Independent Test**: Autenticar, recargar la aplicación y verificar que la sesión sigue activa y el usuario permanece en área protegida.

**Acceptance Scenarios**:

1. **Given** que el usuario inició sesión correctamente, **When** recarga la aplicación, **Then** el sistema conserva la sesión local y mantiene acceso al módulo protegido.
2. **Given** que no existe sesión válida en almacenamiento local, **When** intenta acceder al área protegida, **Then** el sistema lo envía a login.

---

### User Story 3 - Redirección automática al módulo empleados (Priority: P3)

Como usuario autenticado, quiero ser redirigido automáticamente a `/empleados` para empezar de inmediato mi trabajo.

**Why this priority**: Reduce fricción tras autenticación y estandariza el punto de entrada funcional.

**Independent Test**: Iniciar sesión válida y confirmar redirección automática a la ruta de empleados.

**Acceptance Scenarios**:

1. **Given** que la autenticación fue exitosa, **When** el sistema confirma sesión activa, **Then** redirige automáticamente a `/empleados`.

### Edge Cases

- Intento de login con email vacío, formato inválido o contraseña vacía.
- Usuario autenticado intenta volver manualmente a la pantalla de login.
- Sesión local corrupta o con estructura inválida en el navegador.
- Usuario abre una nueva pestaña con ruta protegida sin sesión previa en ese navegador.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: El sistema MUST mostrar una pantalla de login con campos de email y contraseña.
- **FR-002**: El sistema MUST validar que el email tenga formato válido antes de procesar autenticación.
- **FR-003**: El sistema MUST autenticar únicamente contra un usuario maestro preconfigurado en la configuración de entorno del frontend.
- **FR-004**: El sistema MUST crear una sesión local en el navegador al autenticar credenciales válidas.
- **FR-005**: El sistema MUST redirigir al usuario autenticado a la ruta `/empleados` inmediatamente después del login exitoso.
- **FR-006**: El sistema MUST bloquear acceso a rutas protegidas cuando no exista una sesión local válida.
- **FR-007**: El sistema MUST mantener la sesión local después de recargar la aplicación mientras la sesión siga válida.
- **FR-008**: El sistema MUST mostrar un mensaje claro de autenticación fallida sin revelar cuál campo fue incorrecto.

### Constitution Alignment *(mandatory)*

- **CA-001**: El alcance es user-facing y se implementa en frontend Angular 21 con integración al backend existente.
- **CA-002**: El backend mantiene compatibilidad Java 21 + Spring Boot 3.x sin cambios incompatibles.
- **CA-003**: La autenticación HTTP Basic del backend permanece vigente y este login no la omite.
- **CA-004**: No hay cambios de persistencia en PostgreSQL para esta funcionalidad.
- **CA-005**: Se documenta impacto de ejecución para entorno local frontend + backend.
- **CA-006**: No se introducen nuevos endpoints públicos; no requiere cambios de contrato OpenAPI.
- **CA-007**: Se conserva consumo de rutas versionadas existentes (`/api/v1/...`).

### Key Entities *(include if feature involves data)*

- **MasterCredentialProfile**: Credenciales maestras permitidas para autenticar en frontend (email y contraseña).
- **LocalSessionState**: Estado de sesión persistido en navegador para determinar si el usuario está autenticado.
- **LoginAttempt**: Intento de autenticación con resultado exitoso o fallido y mensaje asociado para UI.

### Assumptions

- Solo existe un usuario maestro para esta iteración.
- La sesión local no incluye información sensible adicional más allá del estado mínimo necesario de autenticación.
- No se requiere recuperación de contraseña ni gestión de múltiples roles en esta funcionalidad.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% de intentos con credenciales maestras válidas completan acceso y redirección a `/empleados` en menos de 2 segundos en entorno local.
- **SC-002**: 100% de intentos con credenciales inválidas son rechazados y muestran mensaje de error en una sola interacción.
- **SC-003**: 100% de recargas de página con sesión válida mantienen acceso al área protegida sin volver a login.
- **SC-004**: 100% de accesos a rutas protegidas sin sesión válida son redirigidos a login.
