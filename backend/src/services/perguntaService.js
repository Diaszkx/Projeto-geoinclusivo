const perguntaModel = require('../models/perguntaModel');
function validarPergunta(data) { if (!data.categoria_id) { const error = new Error('A categoria é obrigatória.'); error.status = 400; throw error; } if (!data.enunciado || data.enunciado.trim().length < 5) { const error = new Error('O enunciado deve ter pelo menos 5 caracteres.'); error.status = 400; throw error; } }
async function listar() { return perguntaModel.listar(); }
async function criar(data) { validarPergunta(data); return perguntaModel.criar({ categoria_id: data.categoria_id, enunciado: data.enunciado.trim(), dificuldade: data.dificuldade || 'facil', ativa: data.ativa }); }
async function atualizar(id, data) { validarPergunta(data); return perguntaModel.atualizar(id, { categoria_id: data.categoria_id, enunciado: data.enunciado.trim(), dificuldade: data.dificuldade || 'facil', ativa: data.ativa }); }
async function remover(id) { return perguntaModel.remover(id); }
module.exports = { listar, criar, atualizar, remover };
