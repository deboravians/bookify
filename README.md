# Bookify 📚

Este repositório contém o sistema de gerenciamento de biblioteca desenvolvido para a disciplina de Desenvolvimento de Software para Web 2. O objetivo do sistema é informatizar e otimizar os processos operacionais de uma biblioteca, oferecendo uma solução eficiente, segura e de fácil utilização para o bibliotecário.

## 📂 Estrutura do Projeto

- `backend/`: API REST desenvolvida com NestJS e TypeScript, responsável pela lógica de negócio e persistência de dados.
- `frontend/`: Aplicação web desenvolvida com React e TypeScript, responsável pela interface do usuário.

## 🚀 Funcionalidades Principais

- Cadastro e gerenciamento de alunos e professores (leitores)
- Consulta e histórico de empréstimos/devoluções por leitor
- Cadastro e gerenciamento de classificações de livros
- Cadastro e gerenciamento do acervo de livros (com controle de status: disponível, extraviado, inativo)
- Registro de empréstimos e devoluções
- Extensão de prazo de empréstimo
- Histórico e consulta de devoluções

## 🛠️ Tecnologias Utilizadas

- NestJS + TypeScript (backend)
- React + TypeScript (frontend)
- PostgreSQL (banco de dados)
- Docker (ambiente do backend)

---

## 📦 Como Executar o Back-end com Docker Compose

Com o repositório já clonado e com o Docker já instalado (e rodando)

Construa a imagem, usando o comando:

    - "docker-compose build"

Depois, suba o container, usando o comando:

    - "docker-compose up"

- Acesse o Back-end: O servidor estará disponível em http://localhost:3000.

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
