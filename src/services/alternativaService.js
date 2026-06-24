const alternativaModel = require('../models/alternativaModel');
function validarAlternativa(data) { if (!data.pergunta_id) { const error = new Error('A pergunta é obrigatória.'); error.status = 400; throw error; } if (!data.texto || data.texto.trim().length < 1) { const error = new Error('O texto da alternativa é obrigatório.'); error.status = 400; throw error; } }
async function listarPorPergunta(perguntaId) { return alternativaModel.listarPorPergunta(perguntaId); }
async function criar(data) { validarAlternativa(data); return alternativaModel.criar({ pergunta_id: data.pergunta_id, texto: data.texto.trim(), correta: Boolean(data.correta) }); }
async function atualizar(id, data) { if (!data.texto || data.texto.trim().length < 1) { const error = new Error('O texto da alternativa é obrigatório.'); error.status = 400; throw error; } return alternativaModel.atualizar(id, { texto: data.texto.trim(), correta: Boolean(data.correta) }); }
async function remover(id) { return alternativaModel.remover(id); }
module.exports = { listarPorPergunta, criar, atualizar, remover };
