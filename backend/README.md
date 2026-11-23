# Bookify 📚 - Backend

API REST do **Bookify**, sistema de gerenciamento de biblioteca desenvolvido
para a disciplina de Desenvolvimento de Software para Web 2.

A aplicação tem como objetivo apoiar o bibliotecário no gerenciamento do
acervo, dos leitores e da circulação de livros, centralizando as operações
e o histórico de empréstimos e devoluções.

## Tecnologias

- Node.js e TypeScript
- Express
- MongoDB com Mongoose

O frontend utiliza React e TypeScript e fica na pasta `frontend/`.

## Como executar

### Requisitos

- Node.js 22 ou superior e npm
- MongoDB local em execução ou uma instância no MongoDB Atlas

### Instalação e configuração

Na raiz do projeto:

```sh
cd backend
npm ci
```

Crie `.env` e ajuste as variáveis:

```dotenv
NODE_ENV=
MONGODB_URI=

ADMIN_USERNAME=
ADMIN_PASSWORD=
JWT_SECRET=
JWT_EXPIRES_IN=
```

Com o MongoDB disponível, inicie a API:

```sh
npm run dev
```

### Verificar a API

Acesse `GET http://localhost:5000/health`:

```json
{ "status": "ok" }
```

Essa rota indica que o servidor HTTP está respondendo;

## Organização do backend

- `src/app.ts`: configura o Express, os middlewares e a montagem das rotas.
- `src/server.ts`: conecta ao banco e gerencia o ciclo de vida do servidor.
- `src/routes/auth.routes.ts`: define as rotas de autenticação.
- `src/controllers/auth.controller.ts`: valida a entrada HTTP e retorna os status e mensagens.
- `src/services/auth.service.ts`: compara as credenciais fixas do administrador, sem acesso ao banco ou dependência do Express.

O endpoint `POST /api/auth/login` recebe JSON com `username` e `password`.
As credenciais configuradas em `ADMIN_USERNAME` e `ADMIN_PASSWORD` retornam 200; credenciais incorretas retornam 401;
campos ausentes, vazios ou com tipos inválidos retornam 400.
O login retorna `accessToken`, `tokenType` (`Bearer`) e `expiresIn` (segundos).
Configure `JWT_SECRET` com pelo menos 32 bytes e `JWT_EXPIRES_IN` com um inteiro positivo em segundos.

As rotas da API exigem o JWT no cabeçalho `Authorization: Bearer <accessToken>`,
incluindo `GET /api/students` e `POST /api/students`. O login e `GET /health` são públicos.
Tokens ausentes, inválidos ou expirados retornam 401.

```sh
curl http://localhost:5000/api/students -H "Authorization: Bearer <accessToken>"
```

## Status dos alunos (GA006 e GA007)

O cadastro cria alunos com `status: "ATIVO"`. Para inativar ou reativar um aluno,
use `PATCH /api/students/:id/status`, substituindo `:id` pelo `_id` retornado na
listagem. A rota exige `Authorization: Bearer <accessToken>` e
`Content-Type: application/json`.

```json
{ "status": "INATIVO" }
```

Para reativar, envie `{ "status": "ATIVO" }`. A resposta é 200 com `message` e
`student` atualizado. Repetir o status atual também retorna 200. ID ou body
inválido retorna 400; aluno inexistente retorna 404. A alteração preserva o
cadastro e modifica apenas o status.

Na inicialização da API, os status booleanos existentes são convertidos no banco:
`true` para `ATIVO` e `false` para `INATIVO`. Reinicie a API após atualizar o código.
A listagem e a pesquisa continuam incluindo alunos ativos e inativos.

## Scripts

| Comando | Descrição |
| --- | --- |
| `npm run dev` | Desenvolvimento com reinício automático |
| `npm run typecheck` | Verificação de tipos sem gerar arquivos |
| `npm run build` | Verificação de tipos e compilação para `dist/` |
| `npm start` | Execução da aplicação compilada |
| `npm test` | Compilação e execução dos testes automatizados |

Para executar a versão compilada:

```sh
npm run build
npm start
```
