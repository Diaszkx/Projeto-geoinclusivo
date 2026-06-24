# Documentação das Rotas da API - GeoInclusivo

Base local: `http://localhost:3000/api`

## Health
- GET `/api/health`

## Categorias
- GET `/api/categorias`
- POST `/api/categorias`
- PUT `/api/categorias/:id`
- DELETE `/api/categorias/:id`

## Perguntas
- GET `/api/perguntas`
- POST `/api/perguntas`
- PUT `/api/perguntas/:id`
- DELETE `/api/perguntas/:id`

## Alternativas
- GET `/api/alternativas/pergunta/:perguntaId`
- POST `/api/alternativas`
- PUT `/api/alternativas/:id`
- DELETE `/api/alternativas/:id`

## Quiz
- GET `/api/quiz/iniciar`
- POST `/api/quiz/finalizar`
- GET `/api/quiz/tentativas`
- GET `/api/quiz/tentativas/:id`
