const db = require('../config/database');
const { all, get, run } = require('./baseModel');
async function listarPorPergunta(perguntaId) { return all(db, 'SELECT * FROM alternativas WHERE pergunta_id = ? ORDER BY id', [perguntaId]); }
async function buscarPorId(id) { return get(db, 'SELECT * FROM alternativas WHERE id = ?', [id]); }
async function criar({ pergunta_id, texto, correta }) { const result = await run(db, `INSERT INTO alternativas (pergunta_id, texto, correta) VALUES (?, ?, ?)`, [pergunta_id, texto, correta ? 1 : 0]); return buscarPorId(result.id); }
async function atualizar(id, { texto, correta }) { await run(db, 'UPDATE alternativas SET texto = ?, correta = ? WHERE id = ?', [texto, correta ? 1 : 0, id]); return buscarPorId(id); }
async function remover(id) { return run(db, 'DELETE FROM alternativas WHERE id = ?', [id]); }
module.exports = { listarPorPergunta, buscarPorId, criar, atualizar, remover };
