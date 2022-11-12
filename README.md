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
Para rodar totalmente este projeto você vai precisar criar e iniciar um container no docker, iniciar um servidor para o node e outro para o prisma studio e usar o aplicativo insomnia para testes das rotas. A documentação esta na rota http://localhost:3000/api

##### Passo  1° Criar e iniciar container

```bash
# Para criar e iniciar container de desenvlvimento em background
$ npm run docker:dev:up

# Para criar e iniciar container de testes em background
$ npm run docker:test:up

# Para iniciar container
$ docker-compose start

# Para pausar container
$ docker-compose stop
```

##### Passo 2° - Iniciar servidor para o node

```bash
# watch mode - Inicia um servidor nodejs em segundo plano
$ npm run start:dev
```

##### Passo  3° - Iniciar servidor para o prisma studio

```bash
# Para iniciar o prisma studio na porta 5555
$ npx prisma studio
```

##### Passo  4° - Para rodar a migration (Ela que vai gerar as tabelas no banco de dados). E Usar seed (Ela que vai gerar os dados das tabelas).
```bash
# Para criar tabelas no banco de dados de desenvolvimento
$ migrate:dev

# Para criar tabelas no banco de dados de teste
$ migrate:test

# Para Criar dados para as tabelas do banco de dados de desenvolvimento
$ npx prisma db seed

# Para ele re-carregar client do banco de dados
$ npx prisma db push
```

##### Para testar aplicação
```bash
# e2e tests - Testes de ponta a ponta
$ npm run test:e2e
```
##### Para testar rotas 
Abrir aplicativo inmsomnia e importar o arquivo que está dentro da pasta "inmsomnia" na pasta raiz deste projeto. Com isso você já vai ter configurado as rotas para teste.

##### Análise de requisitos 

###### Cadastro de usuário

**RF**
- Deve ser possível cadastrar um novo usuário.
- O usuário deve ser cadastrado, por padrão, com admin = false.

**RN** 
- Não deve ser possível cadastrar um novo usuário com um ID já existente.
- Não deve ser possível cadastrar um novo usuário com um email já existente.

###### Listagem de usuários

**RF** 
- Deve ser possível listar todos os usuários disponíveis
- Deve ser possível listar um usuário especifico pelo ID
- Deve ser possível fazer update de um usuário especifico pelo ID
- Deve ser possível deletar um usuário especifico pelo ID

**RN**
- Não deve ser possível listar um usuário com ID inexistente.
- Não deve ser possível fazer update de um usuário com ID inexistente.
- Não deve ser possível deletar um usuário com ID inexistente.

## :memo: Licença

Este projeto está sob a licença do MIT. Veja o [LICENSE](https://github.com/Fellippemfv/nest-prisma-project-concepts/blob/master/LICENSE.md) para mais informação.

---