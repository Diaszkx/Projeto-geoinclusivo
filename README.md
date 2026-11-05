# GeoInclusivo - Refatoração para React

Sistema web de quiz geográfico acessível desenvolvido para Programação 4. Esta versão reorganiza o projeto como **monorepo simples**, mantendo a API existente em Node.js/Express/SQLite e refatorando o frontend para **React + Vite**.

## Estrutura

- `backend/`: API REST, regras de negócio e banco SQLite.
- `frontend/`: interface React/Vite que consome a API.
- `docs/`: documentação das rotas e deploy.
- `postman/`: coleção de testes da API.
- `BACKLOG.md`: backlog da refatoração.

## Funcionalidades preservadas

- Categorias, perguntas e alternativas pela API.
- Quiz por categoria, com até 5 perguntas na interface.
- Registro de tentativas, pontuação e histórico.
- Aumento/redução de fonte, alto contraste e leitura da pergunta em voz alta.
- Mensagens de erro e estados de carregamento.

## Requisitos

- Node.js 18+ e npm.

## 1. Executar o backend

```bash
cd backend
npm install
cp .env.example .env
npm run db:init
npm run db:seed
npm run dev
```

API: `http://localhost:3000`  
Teste: `GET http://localhost:3000/api/health`

## 2. Executar o frontend

Em outro terminal:

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

O Vite informará a URL local, normalmente `http://localhost:5173`.

O frontend usa `VITE_API_URL=http://localhost:3000` e consome dados reais, incluindo `GET /api/categorias`.

## Build do frontend

```bash
cd frontend
npm run build
```

## Decisão de arquitetura

Foi escolhido o monorepo para manter backend e frontend no mesmo histórico Git e, ao mesmo tempo, separar responsabilidades. Isso facilita a execução local, a revisão da atividade e a configuração explícita da comunicação HTTP/CORS entre React e API.

## Documentação

- Rotas da API: `docs/rotas-api.md`
- Deploy: `docs/deploy.md`
- Postman: `postman/geoinclusivo.postman_collection.json`
- Backlog: `BACKLOG.md`

## Autor

Gustavo Dias Lopes
