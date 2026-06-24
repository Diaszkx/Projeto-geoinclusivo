const categoriaModel = require('../models/categoriaModel');
function validarCategoria(data) { if (!data.nome || data.nome.trim().length < 2) { const error = new Error('O nome da categoria é obrigatório e deve ter pelo menos 2 caracteres.'); error.status = 400; throw error; } }
async function listar() { return categoriaModel.listar(); }
async function criar(data) { validarCategoria(data); return categoriaModel.criar({ nome: data.nome.trim(), descricao: data.descricao?.trim() }); }
async function atualizar(id, data) { validarCategoria(data); return categoriaModel.atualizar(id, { nome: data.nome.trim(), descricao: data.descricao?.trim() }); }
async function remover(id) { return categoriaModel.remover(id); }
module.exports = { listar, criar, atualizar, remover };
