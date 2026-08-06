# Comandos SQL

````sql
show full processlist;
````

````sql
SELECT * 
FROM INFORMATION_SCHEMA.PROCESSLIST
WHERE Info is not null order by TIME desc;
````sql

````sql
SELECT 
    TABLE_NAME,
    COLUMN_NAME,
    DATA_TYPE
FROM INFORMATION_SCHEMA.COLUMNS
WHERE TABLE_SCHEMA = 'my_schema'
  AND COLUMN_NAME = 'nome coluna';
````
  
````sql
DESCRIBE table;
````

## Uso do  `IF \[NOT\] EXIST`

| Comando                     | Exemplo                                           |
| --------------------------- | ------------------------------------------------- |
| Criar tabela se não existir | `CREATE TABLE IF NOT EXISTS ...`                  |
| Remover tabela se existir   | `DROP TABLE IF EXISTS ...`                        |
| Remover view                | `DROP VIEW IF EXISTS ...`                         |
| Remover procedure           | `DROP PROCEDURE IF EXISTS ...`                    |
| Remover function            | `DROP FUNCTION IF EXISTS ...`                     |
| Em procedures               | `IF EXISTS (SELECT ...) THEN ... END IF`          |
| Em consultas                | `EXISTS (SELECT ...)` ou `CASE WHEN EXISTS (...)` |
