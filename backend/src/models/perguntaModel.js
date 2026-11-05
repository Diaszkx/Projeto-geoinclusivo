const db = require('../config/database');
const { all, get, run } = require('./baseModel');
async function listar() { return all(db, `SELECT p.*, c.nome AS categoria_nome FROM perguntas p JOIN categorias c ON c.id = p.categoria_id ORDER BY p.id DESC`); }
async function listarAtivasPorCategoria(categoriaId) { return all(db, `SELECT p.*, c.nome AS categoria_nome FROM perguntas p JOIN categorias c ON c.id = p.categoria_id WHERE p.ativa = 1 AND (? IS NULL OR p.categoria_id = ?) ORDER BY RANDOM()`, [categoriaId || null, categoriaId || null]); }
async function buscarPorId(id) { return get(db, 'SELECT * FROM perguntas WHERE id = ?', [id]); }
async function criar({ categoria_id, enunciado, dificuldade, ativa }) { const result = await run(db, `INSERT INTO perguntas (categoria_id, enunciado, dificuldade, ativa) VALUES (?, ?, ?, ?)`, [categoria_id, enunciado, dificuldade || 'facil', ativa === false ? 0 : 1]); return buscarPorId(result.id); }
async function atualizar(id, { categoria_id, enunciado, dificuldade, ativa }) { await run(db, `UPDATE perguntas SET categoria_id = ?, enunciado = ?, dificuldade = ?, ativa = ? WHERE id = ?`, [categoria_id, enunciado, dificuldade || 'facil', ativa === false ? 0 : 1, id]); return buscarPorId(id); }
async function remover(id) { return run(db, 'DELETE FROM perguntas WHERE id = ?', [id]); }
module.exports = { listar, listarAtivasPorCategoria, buscarPorId, criar, atualizar, remover };
