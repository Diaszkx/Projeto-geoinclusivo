const db = require('../config/database');
const { get, run } = require('./baseModel');
async function buscarPorEmail(email) { return get(db, 'SELECT * FROM usuarios WHERE email = ?', [email]); }
async function buscarPorId(id) { return get(db, 'SELECT * FROM usuarios WHERE id = ?', [id]); }
async function criar({ nome, email, tipo = 'estudante' }) { const result = await run(db, 'INSERT INTO usuarios (nome, email, tipo) VALUES (?, ?, ?)', [nome, email || null, tipo]); return buscarPorId(result.id); }
async function criarOuBuscar({ nome, email }) { if (email) { const existente = await buscarPorEmail(email); if (existente) return existente; } return criar({ nome, email, tipo: 'estudante' }); }
module.exports = { buscarPorEmail, buscarPorId, criar, criarOuBuscar };
