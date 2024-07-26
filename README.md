# Simulation API

## Ferramentas
 - NodeJs (v20.3.1)
 - NPM (v9.6.7)
 - PostgreSQL
 - Express
 - TypeORM
 - Nodemailer
 - Docker

## Setup do projeto

```sh
$ git clone https://github.com/devigor/simulation-api && cd simulation-api
$ docker compose -f ./docker/docker-compose.yml
$ npm i
```

Criar o arquivo `.env` com as seguintes chaves

```env
DB_HOST="localhost"
DB_PORT=2345
DB_USERNAME="root"
DB_PASSWORD="root"
DB_DATABASE="solar"
JWT="minhachavemegasegura"
COEFICIENTE_DE_POTENCIA=94.5
## Apenas essas três precisa inserir os valores
EMAIL_USER="" ## Um email válido do GMAIL
EMAIL_PASSWORD="" ## A senha do email
EMAIL_SENDER="" ## O email que irá aparecer no remetente
```
Rodar as migrations

```sh
$ npm run migrations:run
```


Iniciar o projeto

```sh
$ npm run start
```
## Requests

Pode importar o arquivo de dentro de `./request-colection/SolarApiCollection`.