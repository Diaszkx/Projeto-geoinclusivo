# Instruções de Deploy

## Render
1. Criar um repositório no GitHub.
2. Enviar o projeto para o GitHub.
3. Criar um novo Web Service no Render.
4. Conectar o repositório.
5. Configurar:
   - Build Command: `npm install && npm run db:init && npm run db:seed`
   - Start Command: `npm start`
6. Adicionar variáveis de ambiente:
   - `PORT=3000`
   - `DATABASE_URL=./src/database/geoinclusivo.db`
   - `NODE_ENV=production`
7. Fazer o deploy e copiar a URL pública.
