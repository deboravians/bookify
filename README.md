# Bookify 📚

Este repositório contém o sistema de gerenciamento de biblioteca desenvolvido para a disciplina de Desenvolvimento de Software para Web 2. O objetivo do sistema é informatizar e otimizar os processos operacionais de uma biblioteca, oferecendo uma solução eficiente, segura e de fácil utilização para o bibliotecário.

## 📂 Estrutura do Projeto

- `backend/`: API REST com Express, TypeScript e MongoDB.
- `frontend/`: Aplicação web desenvolvida com React e TypeScript, responsável pela interface do usuário.

## 🚀 Funcionalidades Planejadas

- Cadastro e gerenciamento de alunos e professores (leitores)
- Consulta e histórico de empréstimos/devoluções por leitor
- Cadastro e gerenciamento de classificações de livros
- Cadastro e gerenciamento do acervo de livros (com controle de status: disponível, extraviado, inativo)
- Registro de empréstimos e devoluções
- Extensão de prazo de empréstimo
- Histórico e consulta de devoluções

## 🛠️ Tecnologias Utilizadas

- Express + TypeScript (backend)
- React + TypeScript (frontend)
- MongoDB + Mongoose (banco de dados)

---

## 📦 Como Executar o Back-end

Com Node.js 22 ou superior instalado:

```sh
cd backend
npm ci
```

Copie `.env.example` para `.env` e configure `MONGODB_URI` (por padrão, `mongodb://127.0.0.1:27017/bookify`). Com o MongoDB em execução, inicie a API:

```sh
npm run dev
```

- Verifique a API em http://localhost:5000/health.

---

## 🖥️ Como Executar o Front-end

Entre na pasta do front-end, usando o comando:

    - "cd frontend"

Instale as dependências do Front-end, usando o comando:

    - "npm i"

Por fim, execute, usando o comando:

    - "npm run dev"

---

## 👥 Equipe
  
- **Debora Silva Viana** – 557337 — deboravianadev@gmail.com
- **Francisco Werley da Silva** – 553948 — franciscowerley@alu.ufc.br  
