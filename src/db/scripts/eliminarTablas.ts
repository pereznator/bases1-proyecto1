export const sqlEliminarTabla = (nombreTabla: string) => `
SET @tableName = '${nombreTabla}';
SET @schemaName = 'elecciones';

-- Verificar si la tabla existe
SELECT COUNT(*)
INTO @tableExists
FROM information_schema.tables
WHERE table_schema = @schemaName
AND table_name = @tableName;

-- Eliminar la tabla si existe
SET @dropTableSQL = IF(@tableExists = 1, CONCAT('DROP TABLE ', @schemaName, '.', @tableName), NULL);
PREPARE stmt FROM @dropTableSQL;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;
`;