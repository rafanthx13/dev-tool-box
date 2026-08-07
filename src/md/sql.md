# MySql Comands

````sql
-- Ver todos os processo do banco
show full processlist;
````

````sql
--- Ver todos os processos que estão rodando no banco
SELECT * 
FROM INFORMATION_SCHEMA.PROCESSLIST
WHERE Info is not null order by TIME desc;
````

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

````sql
-- Converter date em dias da semana
CASE DAYOFWEEK(DATAMATRICULA)
  WHEN 1 THEN 'Domingo'
  WHEN 2 THEN 'Segunda-feira'
  WHEN 3 THEN 'Terça-feira'
  WHEN 4 THEN 'Quarta-feira'
  WHEN 5 THEN 'Quinta-feira'
  WHEN 6 THEN 'Sexta-feira'
  WHEN 7 THEN 'Sábado'
 END AS dia_semana,
````

## Uso do  `IF [NOT] EXIST`

| Comando                     | Exemplo                                           |
| --------------------------- | ------------------------------------------------- |
| Criar tabela se não existir | `CREATE TABLE IF NOT EXISTS ...`                  |
| Remover tabela se existir   | `DROP TABLE IF EXISTS ...`                        |
| Remover view                | `DROP VIEW IF EXISTS ...`                         |
| Remover procedure           | `DROP PROCEDURE IF EXISTS ...`                    |
| Remover function            | `DROP FUNCTION IF EXISTS ...`                     |
| Em procedures               | `IF EXISTS (SELECT ...) THEN ... END IF`          |
| Em consultas                | `EXISTS (SELECT ...)` ou `CASE WHEN EXISTS (...)` |
