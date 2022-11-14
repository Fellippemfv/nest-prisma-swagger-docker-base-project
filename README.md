<!-- /* cSpell:disable */
/* spell-checker: disable */
/* spellchecker: disable */ -->
<h1 align="center">Basis for NestJS and Prisma projects </h1>

<p align="center">
  <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/Fellippemfv/nest-prisma-swagger-docker-base-project">

  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/Fellippemfv/nest-prisma-swagger-docker-base-project?color=red">

  <img alt="Repository size" src="https://img.shields.io/github/repo-size/Fellippemfv/nest-prisma-swagger-docker-base-project?color=yellow">
  
  <a href="https://github.com/Fellippemfv/nest-prisma-swagger-docker-base-project/commits/master">
   <img alt="last-commit" src="https://img.shields.io/github/last-commit/Fellippemfv/nest-prisma-swagger-docker-base-project">
  </a>

  <a href="https://github.com/Fellippemfv/nest-prisma-swagger-docker-base-project/blob/master/LICENSE.md">
   <img alt="GitHub/license" src="https://img.shields.io/github/license/Fellippemfv/nest-prisma-swagger-docker-base-project">
  </a>
</p>

<p align="center">
  <a href="#round_pushpin-about-the-project">About the project</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#rocket-technologies">Technologies</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#information_source-how-to-use">How to use</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#memo-license">License</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="/docs/readme_pt-BR.md">Readme em Português</a>
</p>

<p align="center">
  <img alt="logo" title="logo" src="https://user-images.githubusercontent.com/67835741/200043624-cfa0a999-6a95-482c-ab68-7e546a02282e.png" />
</p>

<br>

## :round_pushpin: About the project

On this basis for projects, we use it in the nodeJS backend with nestJS,prisma database with postegre, it is all documented using swagger with the extension nest/swagger, and all this inside a docker container that is created from the file docker-compose. It comes with a ready-made user authentication system.

## :rocket: Technologies

This project was developed with the following technologies:

- [NodeJS](https://nodejs.org/en/)
- [NestJS](https://nestjs.com)
- [Prisma](https://www.prisma.io)
- [Docker](https://www.docker.com)
- [TypeScript](https://www.typescriptlang.org)
- [Eslint](https://eslint.org)
- [Prettier](https://prettier.io)

## :information_source: How to use

To clone and run this application, you will need [Git](https://git-scm.com), [Node.js](https://nodejs.org/en/), [Npm](https://www.npmjs.com/), [Docker](https://www.docker.com) and a text editor like [Vs code](https://code.visualstudio.com/) installed on your computer. On your command line:

```bash
# Clone this repository
$ git clone https://github.com/Fellippemfv/nest-prisma-swagger-docker-base-project

# Go to the created folder
$ cd nest-prisma-swagger-docker-base-project

# install dependencies
$ npm install
```

To fully run this project you will need to create and start a container in docker, start a server for node and another for prisma studio and use the insomnia application to test the routes, or if you prefer to use integration tests or e2e tests.

<br>

### Create and start container via docker-compose

To create and start database container in background on port 5432

```bash
npm run docker:up
```

To create and start test container in background on port 9000

```bash
npm run docker:test:up
```

To pause all containers

```bash
docker-compose stop
```

To start all containers

```bash
docker-compose start
```

<br>

### Start nodeJS server

Start a nodejs server in background on port 3000

```bash
npm run start:dev
```

<br>

### Start prisma studio server

Start prisma studio on port 5555

```bash
npx prisma studio
```

<br>

### Run migration

Create and sync the tables in the database

```bash
npm run migrate:dev
```

Create and sync the tables in the database_test

```bash
npm run migrate:test
```

To just create new table in database

```bash
npx prisma migrate dev --create-only
```

Do migration sync --> database --> schema

```bash
npx prisma db push
```

<br>

### Run seed

Create data for the tables in the database

```bash
npx prisma db seed
```

<br>

### Swagger documentation

The documentation is on route <http://localhost:3000/api>

<br>

### Application tests

End-to-end tests (E2E Tests)

```bash
npm run test:e2e
```

Integration tests

```bash
npm run test
```

<br>

### Inmsomnia

Open inmsomnia application and import the file that is inside the "inmsomnia" folder in the root folder of this project. With this you will already have configured the routes for testing.

<br>

## :memo: License

This project is under the MIT license. See [LICENSE](https://github.com/Fellippemfv/nest-prisma-project-concepts/blob/master/LICENSE.md) for more information.

---
