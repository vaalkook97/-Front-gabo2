# Feature Specification: Login para frontend

**Feature Branch**: `001-frontend-login`  
**Created**: 2026-03-27  
**Status**: Draft  
**Input**: User description: "haz un login tambien para el front"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Iniciar sesion desde la interfaz (Priority: P1)

Como usuario, quiero iniciar sesion desde una pantalla de login para acceder a la aplicacion sin usar herramientas externas.

**Why this priority**: Es el flujo principal para entrar al sistema y habilita el resto de funcionalidades.

**Independent Test**: Desde una sesion sin autenticar, ingresar credenciales validas y verificar acceso a la vista principal protegida.

**Acceptance Scenarios**:

1. **Given** que el usuario esta en la pantalla de login, **When** ingresa credenciales validas y confirma, **Then** el sistema inicia sesion y redirige a la vista principal protegida.
2. **Given** que el usuario no esta autenticado, **When** intenta abrir una ruta protegida, **Then** el sistema lo redirige a login y conserva la ruta objetivo para despues del acceso exitoso.

---

### User Story 2 - Ver feedback claro al fallar autenticacion (Priority: P2)

Como usuario, quiero recibir mensajes claros cuando mis credenciales no son validas para poder corregirlas rapidamente.

**Why this priority**: Reduce intentos fallidos repetidos y evita confusion durante el ingreso.

**Independent Test**: Ingresar credenciales invalidas y confirmar que el sistema muestra el error sin perder el estado del formulario.

**Acceptance Scenarios**:

1. **Given** que el usuario envia credenciales invalidas, **When** el sistema valida el acceso, **Then** se muestra un mensaje de error comprensible y el usuario permanece en login.
2. **Given** que ocurre una falla temporal del servicio de autenticacion, **When** el usuario intenta iniciar sesion, **Then** se muestra un mensaje de indisponibilidad y se permite reintentar.

---

### User Story 3 - Mantener sesion util y salida controlada (Priority: P3)

Como usuario autenticado, quiero mantener mi sesion activa mientras uso la aplicacion y poder cerrar sesion cuando termine.

**Why this priority**: Mejora usabilidad diaria y protege la cuenta cuando el usuario finaliza su trabajo.

**Independent Test**: Iniciar sesion, navegar por rutas protegidas sin reautenticarse y luego cerrar sesion verificando bloqueo de acceso.

**Acceptance Scenarios**:

1. **Given** que el usuario ya inicio sesion, **When** navega entre rutas protegidas, **Then** el sistema mantiene acceso sin solicitar login de nuevo en cada cambio de vista.
2. **Given** que el usuario elige cerrar sesion, **When** confirma la accion, **Then** el sistema elimina el estado de sesion y redirige a login.

### Edge Cases

- Credenciales vacias o con solo espacios al enviar el formulario.
- Multiples intentos fallidos consecutivos en la misma sesion de navegador.
- Usuario ya autenticado que intenta abrir la ruta de login.
- Cierre de sesion en una pestana mientras otra pestana permanece abierta.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: El sistema MUST proporcionar una pantalla de login accesible para usuarios no autenticados.
- **FR-002**: El sistema MUST permitir al usuario capturar identificador y credencial en un formulario de acceso.
- **FR-003**: El sistema MUST validar que los campos requeridos del formulario esten completos antes de enviar una solicitud de autenticacion.
- **FR-004**: El sistema MUST autenticar al usuario contra el mecanismo de acceso existente del producto.
- **FR-005**: El sistema MUST redirigir al usuario autenticado a la vista principal protegida o a la ultima ruta protegida solicitada.
- **FR-006**: El sistema MUST mostrar mensajes de error comprensibles para credenciales invalidas y para fallas temporales del servicio.
- **FR-007**: El sistema MUST mantener un estado de sesion valido durante la navegacion normal del usuario autenticado.
- **FR-008**: El sistema MUST impedir acceso a rutas protegidas cuando no exista sesion valida.
- **FR-009**: El sistema MUST ofrecer una accion de cierre de sesion que invalide el estado de acceso del cliente.
- **FR-010**: El sistema MUST proteger la experiencia de login evitando bucles de redireccion.

### Constitution Alignment *(mandatory)*

- **CA-001**: El alcance es user-facing y se implementa en frontend con consistencia sobre la arquitectura del producto.
- **CA-002**: El feature mantiene compatibilidad con backend Spring Boot 3.x y Java 21, sin introducir requerimientos incompatibles.
- **CA-003**: El feature respeta la autenticacion HTTP Basic de endpoints expuestos y no la reemplaza.
- **CA-004**: No requiere cambios de esquema en PostgreSQL; cualquier impacto en datos de sesion se limita al cliente.
- **CA-005**: El feature debe ejecutarse correctamente en el entorno Docker actual para pruebas end-to-end.
- **CA-006**: Si se reutilizan endpoints existentes, no requiere cambios de OpenAPI; si se afecta algun contrato de autenticacion, debe documentarse.
- **CA-007**: El consumo de APIs se mantiene bajo rutas versionadas existentes (`/api/v{major}/...`).

### Key Entities *(include if feature involves data)*

- **LoginCredentials**: Datos de entrada del usuario para autenticacion (identificador y credencial).
- **AuthSessionState**: Estado de autenticacion del usuario en el cliente para controlar acceso a rutas.
- **AuthFeedbackMessage**: Resultado visible para el usuario al autenticar (exito, credenciales invalidas, servicio no disponible).

### Assumptions

- Existe un mecanismo de autenticacion backend disponible y consumible desde el frontend.
- La aplicacion ya cuenta con al menos una ruta protegida que funciona como destino posterior al login.
- La vigencia exacta de sesion es gobernada por el backend y no cambia en este alcance.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Al menos 95% de usuarios con credenciales validas completan el inicio de sesion en menos de 30 segundos desde que abren login.
- **SC-002**: El 100% de intentos con credenciales invalidas reciben feedback visible en menos de 2 segundos sin abandonar la pantalla de login.
- **SC-003**: El 100% de accesos a rutas protegidas sin sesion valida terminan en redireccion a login.
- **SC-004**: En pruebas de flujo principal, 0 casos presentan bucles de redireccion entre login y rutas protegidas.
