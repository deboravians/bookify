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
