const service = require('../services/quizService');
async function iniciar(req,res,next){try{res.json(await service.iniciar(req.query.categoria_id));}catch(error){next(error);}}
async function finalizar(req,res,next){try{res.status(201).json(await service.finalizar(req.body));}catch(error){next(error);}}
async function listarTentativas(req,res,next){try{res.json(await service.listarTentativas());}catch(error){next(error);}}
async function resultado(req,res,next){try{res.json(await service.resultado(req.params.id));}catch(error){next(error);}}
module.exports = { iniciar, finalizar, listarTentativas, resultado };
