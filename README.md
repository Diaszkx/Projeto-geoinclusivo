# GeoInclusivo

Sistema web de quiz geográfico acessível, desenvolvido para a disciplina de Programação 4.

## Funcionalidades
- CRUD de categorias
- CRUD de perguntas
- CRUD de alternativas
- Quiz com perguntas e alternativas
- Registro de tentativas
- Cálculo de pontuação
- Histórico de tentativas
- Frontend consumindo a API

## Tecnologias
Node.js, Express.js, SQLite, HTML, CSS, JavaScript, Helmet, Express Rate Limit e Morgan.

## Instalação
```bash
git clone https://github.com/seu-usuario/geoinclusivo.git
cd geoinclusivo
npm install
cp .env.example .env
npm run db:init
npm run db:seed
npm run dev
```

Acesse: `http://localhost:3000`

## Documentação
- Rotas da API: `docs/rotas-api.md`
- Deploy: `docs/deploy.md`
- Coleção Postman: `postman/geoinclusivo.postman_collection.json`

## Segurança
- Helmet
- Express Rate Limit
- Sanitização básica de entradas
- `.env` fora do repositório

## Logs
O projeto usa Morgan para registrar requisições no terminal.

## Autor
Gustavo Dias Lopes
