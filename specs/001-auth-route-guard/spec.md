# Feature Specification: Protección de rutas por autenticación

**Feature Branch**: `001-auth-route-guard`  
**Created**: 2026-03-13  
**Status**: Draft  
**Input**: User description: "guard de autenticación protegiendo todas las rutas excepto /login"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Bloquear acceso no autenticado (Priority: P1)

Como usuario no autenticado, debo ser redirigido al login cuando intento entrar a rutas protegidas.

**Why this priority**: Es el control mínimo de seguridad para evitar acceso indebido.

**Independent Test**: Abrir una ruta protegida sin sesión activa y verificar redirección inmediata a `/login`.

**Acceptance Scenarios**:

1. **Given** que no existe sesión activa, **When** el usuario navega a una ruta protegida, **Then** el sistema redirige a `/login`.
2. **Given** que no existe sesión activa, **When** el usuario recarga una ruta protegida, **Then** el sistema mantiene el bloqueo y redirige a `/login`.

---

### User Story 2 - Permitir acceso autenticado (Priority: P2)

Como usuario autenticado, debo poder entrar y navegar por todas las rutas protegidas sin interrupciones.

**Why this priority**: Garantiza continuidad del flujo de trabajo una vez autenticado.

**Independent Test**: Iniciar sesión válida y navegar entre rutas protegidas verificando acceso permitido.

**Acceptance Scenarios**:

1. **Given** que existe sesión activa válida, **When** el usuario accede a una ruta protegida, **Then** el sistema permite la navegación.
2. **Given** que existe sesión activa válida, **When** el usuario recarga en una ruta protegida, **Then** el sistema conserva acceso y no redirige a `/login`.

---

### User Story 3 - Mantener `/login` como ruta pública (Priority: P3)

Como usuario sin sesión, debo poder abrir `/login` sin ser bloqueado para poder autenticarme.

**Why this priority**: Sin acceso público a login, los usuarios no pueden entrar al sistema.

**Independent Test**: Abrir `/login` sin sesión y confirmar que la pantalla carga correctamente.

**Acceptance Scenarios**:

1. **Given** que no existe sesión activa, **When** el usuario abre `/login`, **Then** el sistema permite acceso a la página de login.
2. **Given** que existe sesión activa, **When** el usuario abre `/login`, **Then** el sistema redirige a la ruta principal protegida definida por negocio.

### Edge Cases

- Estado de sesión ausente en almacenamiento local.
- Estado de sesión corrupto o con formato inválido en almacenamiento local.
- Navegación directa por URL a rutas profundas protegidas.
- Intento de acceso concurrente en múltiples pestañas con cambio de sesión entre pestañas.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: El sistema MUST considerar `/login` como única ruta pública excluida de protección.
- **FR-002**: El sistema MUST proteger todas las demás rutas de la aplicación mediante validación de sesión activa.
- **FR-003**: El sistema MUST redirigir a `/login` cualquier intento no autenticado hacia rutas protegidas.
- **FR-004**: El sistema MUST permitir navegación a rutas protegidas cuando la sesión sea válida.
- **FR-005**: El sistema MUST reevaluar el estado de autenticación en cada intento de navegación.
- **FR-006**: El sistema MUST tratar sesiones ausentes, inválidas o corruptas como no autenticadas.
- **FR-007**: El sistema MUST evitar bucles de redirección durante la protección de rutas.
- **FR-008**: El sistema MUST aplicar el mismo comportamiento al ingresar por URL directa y al navegar internamente.

### Constitution Alignment *(mandatory)*

- **CA-001**: El alcance es user-facing y se implementa en frontend Angular 21.
- **CA-002**: No se requieren cambios incompatibles con Java 21 y Spring Boot 3.x en backend.
- **CA-003**: La protección de rutas frontend complementa, no reemplaza, la autenticación básica del backend.
- **CA-004**: No hay cambios de esquema en PostgreSQL para esta funcionalidad.
- **CA-005**: Se documenta impacto operativo en ejecución de frontend y backend en local/CI.
- **CA-006**: No se introducen nuevos endpoints públicos; no requiere cambios de OpenAPI por sí misma.
- **CA-007**: El consumo de APIs se mantiene sobre rutas versionadas existentes (`/api/v{major}/...`).

### Key Entities *(include if feature involves data)*

- **AuthenticationSessionState**: Estado de autenticación persistido en cliente para decidir acceso a rutas.
- **RouteAccessDecision**: Resultado de evaluación por navegación (`permitir` o `redirigir a /login`).
- **PublicRouteDefinition**: Conjunto de rutas exentas de protección, limitado a `/login`.

### Assumptions

- El estado de sesión ya existe o será gestionado por el flujo de login actual.
- La ruta de destino para usuarios autenticados al intentar abrir `/login` está definida en la aplicación.
- No se contemplan reglas de autorización por rol en este alcance.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: El 100% de intentos no autenticados a rutas protegidas redirigen a `/login`.
- **SC-002**: El 100% de intentos autenticados a rutas protegidas se completan sin redirección inesperada.
- **SC-003**: El 100% de accesos a `/login` sin sesión cargan la pantalla de autenticación en menos de 1 segundo en entorno local.
- **SC-004**: Se observa 0 bucles de redirección en pruebas de navegación manual y automatizada del flujo principal.
