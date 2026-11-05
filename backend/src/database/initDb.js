require('dotenv').config();
const fs = require('fs');
const path = require('path');
const db = require('../config/database');
const schema = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf-8');
db.exec(schema, (error) => { if (error) { console.error('Erro ao criar tabelas:', error.message); process.exit(1); } console.log('Banco de dados inicializado com sucesso.'); db.close(); });
