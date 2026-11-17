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
PORT=
CLIENT=
MONGODB_URI=
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
As credenciais `admin`/`admin` retornam 200; credenciais incorretas retornam 401;
campos ausentes, vazios ou com tipos inválidos retornam 400.
O login não cria tokens, cookies ou sessões.

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
