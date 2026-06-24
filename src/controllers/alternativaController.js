const service = require('../services/alternativaService');
async function listarPorPergunta(req,res,next){try{res.json(await service.listarPorPergunta(req.params.perguntaId));}catch(error){next(error);}}
async function criar(req,res,next){try{res.status(201).json(await service.criar(req.body));}catch(error){next(error);}}
async function atualizar(req,res,next){try{res.json(await service.atualizar(req.params.id, req.body));}catch(error){next(error);}}
async function remover(req,res,next){try{await service.remover(req.params.id); res.status(204).send();}catch(error){next(error);}}
module.exports = { listarPorPergunta, criar, atualizar, remover };
