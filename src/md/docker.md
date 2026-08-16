# Docker

## Comandos docker

````bash
docker ps

docker exec -it <container_id> bash

docker compose exec <container_id> composer install
````

## Comandos docker compose

````sh
# 
docker compose up

# Use --build se mudar: docerfile, dockre-compose, composer.json/package.jon (pois tem que rexriara os arquivos internos)
# Se você apenas alterou arquivos do projeto que são montados como volume (inclui .env, muito vezes será neces´sario só limpar o cache pra funcionar):
docker compose up --build

# executar comando pelo docker compose
docker compose exec laravel composer install
````

Quando usar `--buidld`


````bash
docker compose up --build
````

Antes de subir os contêineres, o Docker força uma nova construção da imagem, mesmo que já exista uma imagem anterior.

Use esse comando quando você alterou algo que influencia a imagem, por exemplo:

* `Dockerfile`;
* `docker-compose.yml` (na seção `build`);
* `composer.json` ou `composer.lock`, se o `Dockerfile` faz `composer install`;
* `package.json`, se o `Dockerfile` executa `npm install`;
* qualquer arquivo que é copiado para a imagem durante o build (`COPY` ou `ADD`).
