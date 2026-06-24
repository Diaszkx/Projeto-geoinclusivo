require('dotenv').config();
const fs = require('fs');
const path = require('path');
const db = require('../config/database');
const seed = fs.readFileSync(path.join(__dirname, 'seed.sql'), 'utf-8');
db.exec(seed, (error) => { if (error) { console.error('Erro ao inserir dados iniciais:', error.message); process.exit(1); } console.log('Dados iniciais inseridos com sucesso.'); db.close(); });
