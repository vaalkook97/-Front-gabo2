# Quickstart: CRUD de Empleados

## Prerrequisitos
- Java 21 (LTS)
- Maven 3.9+
- PostgreSQL
- Node.js LTS compatible con Angular 21
## Configuración mínima
1. Configurar base de datos PostgreSQL.
2. Definir variables:
   - `APP_SECURITY_USER`
   - `APP_SECURITY_PASSWORD`
   - `DB_URL`
   - `DB_USERNAME`
   - `DB_PASSWORD`
3. Compilar y arrancar:
   - `mvn clean spring-boot:run`
4. Levantar frontend Angular 21:
  - `cd frontend`
  - `npm install`
  - `npm start`

## Endpoints esperados
- `POST /api/v1/empleados`
- `GET /api/v1/empleados`
- `GET /api/v1/empleados/{clave}`
- `PUT /api/v1/empleados/{clave}`
- `DELETE /api/v1/empleados/{clave}`

## Verificación rápida
1. Crear empleado enviando `nombre`, `direccion`, `telefono`, `correo` (sin `clave`) y validar `201` con `clave` generada tipo `E-001`.
2. Consultar por `clave` y validar payload completo (`version` incluida).
3. Listar con paginación por defecto y validar estructura tipo Spring Page.
4. Listar con filtros (`nombre` contains, `clave` exact) y validar resultados.
5. Listar con `sort=desc` y validar orden por `clave`.
6. Actualizar empleado y validar que `version` de respuesta incrementa automáticamente.
7. Eliminar empleado y validar que consulta posterior indique `404`.

## Docker (ejecución local)
- Construir imagen:
  - `docker build -t empleados-service:local .`
- Levantar PostgreSQL y app (configuración mínima validada):
  - `docker network create dsw-net`
  - `docker run -d --name pg-dsw --network dsw-net -e POSTGRES_DB=empleados_db -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres postgres:15-alpine`
  - `docker run -d --name empleados-app --network dsw-net -p 8080:8080 -e DB_URL=jdbc:postgresql://pg-dsw:5432/empleados_db -e DB_USERNAME=postgres -e DB_PASSWORD=postgres -e APP_SECURITY_USER=admin -e APP_SECURITY_PASSWORD=admin123 empleados-service:local`
- Validar documentación con auth básica:
  - `GET /swagger-ui/index.html` -> `200`
  - `GET /v3/api-docs` -> `200`
- Limpieza:
  - `docker rm -f empleados-app pg-dsw && docker network rm dsw-net`

## Rendimiento básico (local)
- Medición realizada sobre `GET /api/v1/empleados?page=0&size=20&sort=asc` con autenticación básica.
- Resultado: `p95 = 155.55 ms` (objetivo: `< 300 ms`, cumple).

## Documentación API
- OpenAPI contrato: `specs/001-crud-empleados/contracts/empleados-api.yaml`
- Swagger UI (cuando la app esté arriba): `/swagger-ui.html`

## Frontend Angular 21
- Proyecto: `frontend/`
- URL local por defecto: `http://localhost:4200`
- API base usada por defecto: `http://localhost:8080/api/v1`
