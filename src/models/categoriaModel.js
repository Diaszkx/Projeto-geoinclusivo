const db = require('../config/database');
const { all, get, run } = require('./baseModel');
async function listar() { return all(db, 'SELECT * FROM categorias ORDER BY nome'); }
async function buscarPorId(id) { return get(db, 'SELECT * FROM categorias WHERE id = ?', [id]); }
async function criar({ nome, descricao }) { const result = await run(db, 'INSERT INTO categorias (nome, descricao) VALUES (?, ?)', [nome, descricao || null]); return buscarPorId(result.id); }
async function atualizar(id, { nome, descricao }) { await run(db, 'UPDATE categorias SET nome = ?, descricao = ? WHERE id = ?', [nome, descricao || null, id]); return buscarPorId(id); }
async function remover(id) { return run(db, 'DELETE FROM categorias WHERE id = ?', [id]); }
module.exports = { listar, buscarPorId, criar, atualizar, remover };
