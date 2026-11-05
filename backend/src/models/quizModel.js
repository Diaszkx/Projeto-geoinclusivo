const db = require('../config/database');
const { all, get, run } = require('./baseModel');
async function buscarAlternativa(id) { return get(db, 'SELECT * FROM alternativas WHERE id = ?', [id]); }
async function criarTentativa({ usuario_id, pontuacao, total_perguntas, total_acertos, total_erros }) { const result = await run(db, `INSERT INTO tentativas_quiz (usuario_id, pontuacao, total_perguntas, total_acertos, total_erros) VALUES (?, ?, ?, ?, ?)`, [usuario_id, pontuacao, total_perguntas, total_acertos, total_erros]); return buscarTentativa(result.id); }
async function registrarResposta({ tentativa_id, pergunta_id, alternativa_id, correta }) { return run(db, `INSERT INTO respostas_usuario (tentativa_id, pergunta_id, alternativa_id, correta) VALUES (?, ?, ?, ?)`, [tentativa_id, pergunta_id, alternativa_id, correta ? 1 : 0]); }
async function buscarTentativa(id) { return get(db, 'SELECT * FROM tentativas_quiz WHERE id = ?', [id]); }
async function listarTentativas() { return all(db, `SELECT t.*, u.nome AS usuario_nome, u.email AS usuario_email FROM tentativas_quiz t LEFT JOIN usuarios u ON u.id = t.usuario_id ORDER BY t.criado_em DESC`); }
async function respostasDaTentativa(tentativaId) { return all(db, `SELECT r.*, p.enunciado, a.texto AS alternativa_texto FROM respostas_usuario r JOIN perguntas p ON p.id = r.pergunta_id JOIN alternativas a ON a.id = r.alternativa_id WHERE r.tentativa_id = ?`, [tentativaId]); }
module.exports = { buscarAlternativa, criarTentativa, registrarResposta, buscarTentativa, listarTentativas, respostasDaTentativa };
