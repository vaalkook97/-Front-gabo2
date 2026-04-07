# Feature Specification: CRUD de empleados

**Feature Branch**: `002-crud-empleados`  
**Created**: 2026-03-13  
**Status**: Draft  
**Input**: User description: "CRUD de empleados: listar, crear, editar, eliminar con confirmación, campos: id nombre apellido email puesto fechaIngreso activo"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Listar y consultar empleados (Priority: P1)

Como usuario del módulo de empleados, quiero ver el listado de empleados para consultar rápidamente su información laboral actual.

**Why this priority**: El listado habilita visibilidad operativa inmediata y es la base para editar o eliminar.

**Independent Test**: Cargar la pantalla de empleados y verificar que se muestran registros con los campos requeridos en una vista ordenada.

**Acceptance Scenarios**:

1. **Given** que existen empleados registrados, **When** el usuario abre el módulo de empleados, **Then** el sistema muestra el listado con `id`, `nombre`, `apellido`, `email`, `puesto`, `fechaIngreso` y `activo`.
2. **Given** que no existen empleados, **When** el usuario abre el módulo de empleados, **Then** el sistema muestra una vista vacía clara sin errores.

---

### User Story 2 - Crear y editar empleados (Priority: P2)

Como usuario del módulo de empleados, quiero crear y editar empleados para mantener la información actualizada.

**Why this priority**: Mantener datos vigentes es esencial para el valor del módulo y continuidad de procesos.

**Independent Test**: Crear un empleado válido y luego editar uno existente; verificar persistencia y reflejo inmediato en el listado.

**Acceptance Scenarios**:

1. **Given** que el usuario completa todos los campos requeridos con datos válidos, **When** confirma la creación, **Then** el sistema registra el empleado y lo muestra en el listado.
2. **Given** que el usuario edita un empleado con datos válidos, **When** confirma los cambios, **Then** el sistema actualiza el registro y muestra los nuevos valores.
3. **Given** que el `email` ya existe en otro empleado, **When** el usuario intenta crear o editar con ese `email`, **Then** el sistema rechaza la operación con un mensaje de validación.

---

### User Story 3 - Eliminar empleados con confirmación (Priority: P3)

Como usuario del módulo de empleados, quiero eliminar empleados con una confirmación explícita para evitar borrados accidentales.

**Why this priority**: La eliminación es crítica y requiere una salvaguarda de experiencia de usuario.

**Independent Test**: Iniciar eliminación de un empleado, confirmar la acción y validar que el registro ya no aparece en el listado.

**Acceptance Scenarios**:

1. **Given** que el usuario selecciona eliminar un empleado, **When** el sistema solicita confirmación, **Then** el empleado solo se elimina si el usuario confirma explícitamente.
2. **Given** que el usuario cancela la confirmación de eliminación, **When** vuelve al listado, **Then** el empleado permanece sin cambios.

### Edge Cases

- Intento de crear o editar con campos obligatorios vacíos.
- Intento de crear o editar con formato inválido de `email`.
- Intento de editar o eliminar un empleado que ya no existe al momento de confirmar.
- Intento de guardar `fechaIngreso` futura.
- Eliminación repetida del mismo registro desde dos acciones consecutivas.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: El sistema MUST permitir listar empleados mostrando los campos `id`, `nombre`, `apellido`, `email`, `puesto`, `fechaIngreso` y `activo`.
- **FR-002**: El sistema MUST permitir crear empleados con los campos obligatorios `nombre`, `apellido`, `email`, `puesto`, `fechaIngreso` y `activo`.
- **FR-003**: El sistema MUST asignar un `id` único e inmutable a cada empleado creado.
- **FR-004**: El sistema MUST permitir editar un empleado existente preservando su `id`.
- **FR-005**: El sistema MUST validar formato de `email` y unicidad de `email` por empleado.
- **FR-006**: El sistema MUST validar que `fechaIngreso` no sea futura.
- **FR-007**: El sistema MUST permitir eliminar empleados únicamente después de una confirmación explícita del usuario.
- **FR-008**: El sistema MUST informar al usuario con mensajes claros cuando una operación de crear, editar o eliminar no pueda completarse.
- **FR-009**: El sistema MUST reflejar en el listado el estado actualizado después de crear, editar o eliminar sin requerir reinicio de aplicación.

### Constitution Alignment *(mandatory)*

- **CA-001**: El alcance es user-facing y requiere implementación full-stack con frontend Angular 21.
- **CA-002**: El backend mantiene compatibilidad con Java 21 y Spring Boot 3.x.
- **CA-003**: Las rutas expuestas para el CRUD mantienen protección de autenticación básica según baseline del proyecto.
- **CA-004**: El cambio define impacto de persistencia en PostgreSQL, incluyendo reglas de integridad para `email` único.
- **CA-005**: El cambio documenta impacto en ejecución local y contenedores para backend y frontend.
- **CA-006**: El cambio actualiza documentación OpenAPI/Swagger para operaciones y campos del CRUD.
- **CA-007**: Las rutas afectadas se mantienen bajo versionado por path (`/api/v{major}/...`).

### Key Entities *(include if feature involves data)*

- **Empleado**: Registro principal del recurso con `id`, `nombre`, `apellido`, `email`, `puesto`, `fechaIngreso`, `activo`.
- **EmpleadoFormData**: Datos de entrada para creación/edición con validaciones de obligatoriedad, formato y reglas de negocio.
- **DeleteConfirmationAction**: Acción de usuario que confirma o cancela eliminación y determina si procede el borrado.

### Assumptions

- El `id` de empleado se genera automáticamente por el sistema y no es editable por usuario.
- `activo` representa estado laboral vigente (`true`) o no vigente (`false`).
- `fechaIngreso` se registra solo a nivel fecha (sin hora) para este alcance.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: El 100% de operaciones válidas de alta y edición completan guardado exitoso en una sola interacción.
- **SC-002**: El 100% de intentos con `email` duplicado o inválido son rechazados con mensaje comprensible para usuario.
- **SC-003**: El 100% de eliminaciones requieren confirmación explícita antes de aplicar cambios.
- **SC-004**: El listado refleja cambios de crear, editar y eliminar en menos de 2 segundos después de cada operación en entorno local.
