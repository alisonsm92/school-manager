# school-manager

Esse projeto foi desenvolvido com o objetivo aplicar os conhecimentos adquiridos sobre arquitetura de software.
Foram aplicados conceitos baseados na [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html) para a separação das camadas da aplicação.

## Organização do projeto

O projeto está organizado com os seguintes camadas e diretórios:

### 🥝 Domain

Camada onde são implementadas as regras de negócio.

#### 👤 Entities

Diretório que contêm a classes que representam as entidades da aplicação. Os métodos dessas classes implementam as regras de negócio da aplicação.

#### 🔀 Uses cases

Diretório que contêm as classes que implementam o comportamento das funcionalidades. Essas classes são responsáveis controlar todo o fluxo de execução, construir as entidades a partir dos dados providos, realizar a chamadas para a execução das regras de negócio e aciona a camada de infraestrutura para interagir com o "mundo externo".

### 🛠️ Adapter

Camada que abstrai a comunicação com o mundo externo como banco de dados, interfaces de API, comunicação com serviços externos e etc.

#### ⬇️ Input

Diretório que contêm os controllers que processam as solicitações HTTP de entrada e envia resposta de volta ao cliente.

#### ⬆️ Output

Diretório que contêm os repositórios para acesso a dados da base de dados e serviços externos.

### 🌐 Infra

Camada onde são implementadas as configurações para rodar o servidor HTTP utilizando o framework web escolhido e a conexão com a base de dados.

### ▶️ Main

Diretório que possui o arquivo responsável por inicializar a aplicação.

### ⚙️ Config

Diretório com as configurações das variáveis de ambiente do projeto.

___

## Contexto da aplicação

Foi construída uma aplicação de gerenciamento de matriculas para cursos em uma escola. A aplicação provê uma API REST onde é possível realizar as seguintes operações:

* Matricular um aluno;
* Recuperar um matrícula já cadastrada;
* Realizar pagamento de uma matrícula;
* Cancelar uma matrícula.

___

## Executando a aplicação

* Tenha instalado [NodeJS](https://nodejs.org) ou [Docker](https://docs.docker.com) na sua máquina.
* É possível substituir as configurações padrões criando um arquivo .env, seguindo o exemplo do arquivo .env-example.
As seguintes configurações podem ser definidas:
* Node:
  * `NODE_ENV` Ambiente em que será executada a aplicação `test|development|production`
* Server:
  * `PORT` Número da porta em que deseja rodar o servidor HTTP
* Logger ([Pino](https://github.com/pinojs/pino))
  * `LOG_LEVEL` Especifica o nível dos logs a serem exibidos `fatal|error|warn|info|debug|trace|silent`
  * `LOG_PRETTY_PRINT` Ativa ou desativa formatação dos logs `true|false`
* Base de dados ([PostgreSQL](https://www.postgresql.org/))
  * `POSTGRES_HOST` Endereço IP para conexão com uma base de dados
  * `POSTGRES_DATABASE` Especifica nome da base de dados
  * `POSTGRES_USER` Especifica usuário para acesso a base de dados
  * `POSTGRES_PASSWORD` Especifica senha para acesso a base de dados
  * `POSTGRES_PORT` Especifica porta para conexão com a base de dados
* Administrador da base de dados ([pgAdmin](https://www.pgadmin.org/))
  * `PGADMIN_DEFAULT_EMAIL` Especifica o email de acesso ao administrador da base de dados
  * `PGADMIN_DEFAULT_PASSWORD` Especifica a senha de acesso para administrador da base de dados
  * `PGADMIN_PORT` Especifica a porta de acesso para administrador da base de dados

### Inicializando a aplicação com Docker Compose

~~~shell
docker compose up
~~~

Neste modo de inicialização um container para a base de dados [PostgreSQL](https://www.postgresql.org/) e um para o [pgAdmin](https://www.pgadmin.org/) serão inicializados localmente, não necessitando configurar a base de dados de forma independente.

### Inicializando a aplicação com NodeJS

~~~shell
npm i
npm run build
npm run start
~~~

**Nota**: _Neste modo de inicialização é necessário definir os valores para as variaveis de ambiente relacionadas a base de dados no arquivo `.env`_.

Os comandos a seguir podem ser executados em um ambiente com o [NodeJS](https://nodejs.org) instalado e após instalar as dependências do projeto (`npm i`).

Comando   | Descrição
--------- | ------
`npm run start` | Inicializa aplicação
`npm run build` | Executa o build do projeto transpilando o código em TypeScript
`npm run test` | Executa todos os testes do projeto
`npm run test:unit` | Executa os testes unitários
`npm run test:integration` | Executa os testes de integração`*`
`npm run test:coverage` | Executa todos os testes do projeto e gera relatório de coberta de testes`*`
`npm run lint` | Executa validação de lint nos arquivos do projeto

`*` _Necessário possuir conexão com uma base de dados_
___

## Trabalho pendente e melhorias

* [x] Hooks para rodar link e testes;
* [ ] Documentação de API;
* [ ] Verificar uma forma melhor de lidar com os ENUMs;
* [ ] Logs;
* [ ] Rollback de querys na base de dados;
* [ ] Adicionar método clone nas entidades para testes com base em memória;
