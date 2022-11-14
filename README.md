<!-- /* cSpell:disable */
/* spell-checker: disable */
/* spellchecker: disable */ -->
<h1 align="center">Base para projetos nest e prisma </h1>

<p align="center">
  <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/Fellippemfv/nest-prisma-project-concepts">

  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/Fellippemfv/nest-prisma-project-concepts?color=red">

  <img alt="Repository size" src="https://img.shields.io/github/repo-size/Fellippemfv/nest-prisma-project-concepts?color=yellow">
  
  <a href="https://github.com/Fellippemfv/nest-prisma-project-concepts/commits/master">
  	<img alt="last-commit" src="https://img.shields.io/github/last-commit/Fellippemfv/nest-prisma-project-concepts">
  </a>

  <a href="https://github.com/Fellippemfv/nest-prisma-project-concepts/blob/master/LICENSE.md">
  	<img alt="GitHub/license" src="https://img.shields.io/github/license/Fellippemfv/nest-prisma-project-concepts">
  </a>
</p>

<p align="center">
  <a href="#round_pushpin-sobre-o-projeto">Sobre o projeto</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#rocket-tecnologias-utilizadas">Tecnologias utilizadas</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#information_source-como-usar">Como usar</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#memo-licença">Licença</a>
</p>

<p align="center">
  <img alt="logo" title="logo" src="https://user-images.githubusercontent.com/67835741/200043624-cfa0a999-6a95-482c-ab68-7e546a02282e.png" />
</p>

<br>

## :round_pushpin: Sobre o projeto

Nesta base para projetos, utilizamos no backend nodeJS com o nestJS, no banco de dados prisma, ele é todo documentado usando swagger com a extensão nest/swagger, e tudo isso dentro de um container docker que é criado a partir do arquivo docker-compose. Na separação de pastas usamos principios de solid.


## :rocket: Tecnologias utilizadas

Este projeto foi desenvolvido com as seguintes tecnologias:

-  [NodeJS](https://nodejs.org/en/)
-  [NestJS](https://nestjs.com)
-  [Prisma](https://www.prisma.io)
-  [Docker](https://www.docker.com)
-  [TypeScript](https://www.typescriptlang.org)
-  [Eslint](https://eslint.org)
-  [Prettier](https://prettier.io)

## :information_source: Como usar

Para clonar e executar esta aplicação, você precisará do [Git](https://git-scm.com), [Node.js](https://nodejs.org/en/), [Npm](https://www.npmjs.com/), [Docker](https://www.docker.com) e um editor de texto igual ao [Vs code](https://code.visualstudio.com/) instalado em seu computador. Na sua linha de comando:

```bash
# Clonar este repositório
$ git clone https://github.com/Fellippemfv/nest-prisma-swagger-docker-base-project

# Ir até a pasta criada
$ cd nest-prisma-swagger-docker-base-project

# Instalar dependências
$ npm install
```
Para rodar totalmente este projeto você vai precisar criar e iniciar um container no docker, iniciar um servidor para o node e outro para o prisma studio e usar o aplicativo insomnia para testes das rotas, ou se preferir usar os testes de integração ou testes e2e.  

<br>

### Criar e iniciar container via docker-compose

Para criar e iniciar container do banco de dados em background na porta 5432
```bash
$ npm run docker:up
```
Para criar e iniciar container de testes em background na porta 9000
```bash
$ npm run docker:test:up
```
Para pausar todos os containers
```bash
$ docker-compose stop
```

Para iniciar todos os containers
```bash
$ docker-compose start
```

<br>

### Iniciar servidor nodeJS

Inicia um servidor nodejs em background na porta 3000
```bash
$ npm run start:dev
```

<br>

### Iniciar servidor prisma studio

Para iniciar o prisma studio na porta 5555
```bash
$ npx prisma studio
```

#### Rodar migration
Criar e sincronizar as tabelas no banco de dados
```bash
$ npm run migrate:dev
```

Criar e sincronizar as tabelas no banco de dados de teste
```bash
$ npm run migrate:test
```

Para apenas criar tabela nova no banco de dados
```bash
$ npx prisma migrate dev --create-only
```

Fazer sincronização de migration->banco de dados->schema
```bash
$ npx prisma db push
```

#### Rodar seed
Criar dados para as tabelas no banco de dados
```bash
$ npx prisma db seed
```

#### Documentação do swagger
A documentação esta na rota http://localhost:3000/api

#### Testes da aplicação
Testes de ponta a ponta (E2E Tests)
```bash
$ npm run test:e2e
```

Testes de integração (Integration Testing)
```bash
$ npm run test
```
#### Inmsomnia 
Abrir aplicativo inmsomnia e importar o arquivo que está dentro da pasta "inmsomnia" na pasta raiz deste projeto. Com isso você já vai ter configurado as rotas para teste.

## :memo: Licença

Este projeto está sob a licença do MIT. Veja o [LICENSE](https://github.com/Fellippemfv/nest-prisma-project-concepts/blob/master/LICENSE.md) para mais informação.

---