# Express & ES6 REST & GRAPHQL API Scaffold project

This project aims to be your starter point for your next GraphQL and REST API in NodeJS

## Requirements

- Node >= 8.9 (use nvm by running `nvm use`)
- PostgreSQL 10 (A docker container is provided via docker-compose)

## Installation

- Clone the repo by runing `git clone https://github.com/joselfonseca/node-express-graphql-scaffold.git node-api`.
- Navigate to the node-api folder and run `yarn install`.
- Create a .env.{environment} file with your environment, by default is development so you will be creating a .env.development file based on .env.example
- Then run `docker-compose up -d` to get the database container up.
- Run `yarn migrate` to migrate the database
- Run `yarn dev` and you will have the server running in http://127.0.0.1:3000

## Production build

The project has a Dockerfile that can be used to distribute the app using docker, to build the image just run `docker build -t yourvendorname/node-api:latest .` and the docker image will be available to use.

If you want to run the production build locally

- Run `yarn build`
- Run `node dist`

## Available endpoints

The scaffold comes with JWT auth by default, therefore you have a `api/auth/login` endpoint available to generate a JWT based on a user, please see the [tests](https://github.com/joselfonseca/node-express-graphql-scaffold/blob/master/test/endpoints/login.js) for reference.

## GraphQL server

Apollo GraphQL server is already configured and ready to use, the endpoint is protected by the JWT therefore you will need to log in before using a GraphiQL client, make sure you can add the Authorization header like this

```bash
Authorization: Bearer TOKEN_HERE
```

All calls to the graphql server are protected by a passport JWT strategy.

### Schema

To define the schema use the `/src/schema.graphql` file, by default a user model is already defined.

## Tests

The tests are permirmed by mocha, to run them you will need to migrate the testing database which is included on the DB container.

- Run `yarn migrate-tests`
- Run `yarn test`

> Note: If you change the password for the DB in the docker-compose file, make sure you update the .env-testing file with the new credentials.

## Available yarn commands

```js
"dev": "NODE_ENV=development nodemon src --exec babel-node",
"build": "babel src -s -D -d dist",
"start": "node dist",
"test": "NODE_ENV=testing mocha --recursive --compilers js:babel-core/register",
"sequelize": "node_modules/.bin/sequelize",
"migrate": "node_modules/.bin/sequelize db:migrate",
"migrate-tests": "NODE_ENV=testing node_modules/.bin/sequelize db:migrate",
"lint": "standard --fix --verbose | snazzy",
"prepush": "yarn lint"
```

## License

MIT
