function errorHandler(error, req, res, next) { const status = error.status || 500; if (status === 500) console.error(error); res.status(status).json({ erro: true, mensagem: error.message || 'Erro interno do servidor.' }); }
module.exports = errorHandler;
