ALTER TABLE empleados
ADD COLUMN correo VARCHAR(100);

UPDATE empleados
SET correo = LOWER(REPLACE(clave, '-', '')) || '@example.com'
WHERE correo IS NULL;

ALTER TABLE empleados
ALTER COLUMN correo SET NOT NULL;

CREATE UNIQUE INDEX IF NOT EXISTS uk_empleados_correo ON empleados (correo);
