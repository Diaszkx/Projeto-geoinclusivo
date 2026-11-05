import React from 'react';
import { useEffect, useMemo, useState } from 'react';
import { api } from './services/api';
import AccessibilityPanel from './components/AccessibilityPanel';
import StepNav from './components/StepNav';

const icons = { capitais:'🏛️', biomas:'🌳', mapas:'🗺️', bandeiras:'🚩', clima:'🌤️', continentes:'🌎' };
const normalize = (s='') => s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();

export default function App() {
  const [screen,setScreen] = useState('inicio');
  const [nome,setNome] = useState(''); const [email,setEmail] = useState('');
  const [categorias,setCategorias] = useState([]); const [categoria,setCategoria] = useState(null);
  const [perguntas,setPerguntas] = useState([]); const [index,setIndex] = useState(0); const [respostas,setRespostas] = useState([]);
  const [resultado,setResultado] = useState(null); const [historico,setHistorico] = useState([]);
  const [loading,setLoading] = useState(false); const [erro,setErro] = useState('');
  const [fontScale,setFontScale] = useState(() => Number(localStorage.getItem('geo-font')) || 1); const [highContrast,setHighContrast] = useState(() => localStorage.getItem('geo-contrast') === 'true');

  useEffect(() => { localStorage.setItem('geo-font', String(fontScale)); }, [fontScale]);
  useEffect(() => { localStorage.setItem('geo-contrast', String(highContrast)); }, [highContrast]);
  const pergunta = perguntas[index];
  const progress = perguntas.length ? ((index+1)/perguntas.length)*100 : 0;
  const rootStyle = useMemo(() => ({'--font-scale':fontScale}),[fontScale]);

  async function carregarCategorias(){ try { setCategorias(await api('/api/categorias')); } catch(e){ setErro(e.message); } }
  async function carregarHistorico(){ try { setHistorico((await api('/api/quiz/tentativas')).slice(0,8)); } catch { setHistorico([]); } }
  useEffect(() => { carregarCategorias(); carregarHistorico(); }, []);

  function continuar(){ if(!nome.trim()){ setErro('Digite seu nome para continuar.'); return; } setErro(''); setScreen('categoria'); }
  async function iniciarQuiz(cat){ setLoading(true); setErro(''); try { const data=(await api(`/api/quiz/iniciar?categoria_id=${cat.id}`)).slice(0,5); if(!data.length) throw new Error('Essa categoria ainda não possui perguntas.'); setCategoria(cat); setPerguntas(data); setIndex(0); setRespostas([]); setScreen('quiz'); } catch(e){ setErro(e.message); } finally { setLoading(false); } }
  async function responder(alternativaId){
    const novas=[...respostas,{pergunta_id:pergunta.id,alternativa_id:alternativaId}]; setRespostas(novas);
    if(index < perguntas.length-1){ setIndex(index+1); return; }
    setLoading(true); setErro('');
    try { const data=await api('/api/quiz/finalizar',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({usuario:{nome:nome.trim(),email:email.trim()},respostas:novas})}); setResultado(data.tentativa); setScreen('resultado'); carregarHistorico(); }
    catch(e){ setErro(e.message); } finally { setLoading(false); }
  }
  function lerPergunta(){ if(!pergunta || !('speechSynthesis' in window)) return; speechSynthesis.cancel(); const u=new SpeechSynthesisUtterance(`${pergunta.enunciado}. Alternativas: ${pergunta.alternativas?.map((a,i)=>`${'ABCDE'[i] || i+1}: ${a.texto}`).join('. ') || ''}`); u.lang='pt-BR'; speechSynthesis.speak(u); }
  const percentual = resultado?.total_perguntas ? Math.round(resultado.total_acertos/resultado.total_perguntas*100) : 0;

  return <div className={highContrast?'app dark':'app'} style={rootStyle}>
    <a className="skip-link" href="#conteudo">Pular para o conteúdo</a><header className="topbar"><div className="topbar-content"><div className="logo"><div className="logo-icon">🌍</div><div><strong>GeoInclusivo</strong><span>Quiz Geográfico Acessível</span></div></div><StepNav screen={screen}/></div></header>
    <main id="conteudo" className="container" tabIndex="-1"><div className="intro-line"><span>✦ Descubra o mundo no seu ritmo</span><span>Aprender é para todo mundo</span></div>
      {screen==='inicio' && <section className="hero-grid"><article className="hero-card"><div className="badge">🌱 Um mundo de descobertas</div><h1>O mundo é de <em>todo mundo.</em></h1><p>Explore a geografia de um jeito leve, divertido e no seu ritmo. Sem pressa, sem complicação. Vamos descobrir juntos?</p><div className="hero-highlights"><span>✓ Sem limite de tempo</span><span>✓ No seu ritmo</span><span>✓ Para todas as idades</span></div><div className="form-grid"><div><label htmlFor="nome">Seu nome</label><input id="nome" value={nome} onChange={e=>setNome(e.target.value)} onKeyDown={e=>e.key==='Enter'&&continuar()} placeholder="Digite seu nome"/></div><div><label htmlFor="email">E-mail opcional</label><input id="email" type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="exemplo@email.com"/></div></div><button className="btn primary" onClick={continuar}>Começar minha aventura <span aria-hidden="true">→</span></button></article><AccessibilityPanel {...{fontScale,setFontScale,highContrast,setHighContrast}}/></section>}
      {screen==='categoria' && <section className="card"><span className="eyebrow">PASSO 2 · ESCOLHA SEU CAMINHO</span><h2>🧭 Qual lugar vamos explorar?</h2><p>Escolha um assunto que desperte sua curiosidade. Você pode trocar depois.</p><div className="category-grid">{categorias.map(c=>{const k=Object.keys(icons).find(x=>normalize(c.nome).includes(x));return <button key={c.id} className="category-card" disabled={loading} onClick={()=>iniciarQuiz(c)}><span className="category-icon">{icons[k]||'🌍'}</span><h3>{c.nome}</h3><p>{c.descricao||'Perguntas de geografia.'}</p></button>})}</div><button className="btn outline" onClick={()=>setScreen('inicio')}>Voltar ao início</button></section>}
      {screen==='quiz' && pergunta && <section className="quiz-card"><span className="eyebrow">SUA JORNADA PELO MUNDO</span><div className="quiz-top"><div><span className="pill">{categoria?.nome}</span><h2>{pergunta.enunciado}</h2></div><strong className="question-counter">Pergunta {index+1} de {perguntas.length}</strong></div><div className="progress" role="progressbar" aria-valuenow={index+1} aria-valuemin={0} aria-valuemax={perguntas.length} aria-label="Progresso das perguntas"><div style={{width:`${progress}%`}}/></div><div className="answers">{pergunta.alternativas?.map((a,i)=><button key={a.id} className="answer" disabled={loading} onClick={()=>responder(a.id)}><span className="answer-letter">{'ABCDE'[i]||'?'}</span><span>{a.texto}</span><span className="answer-arrow" aria-hidden="true">→</span></button>)}</div><div className="quiz-footer"><button className="btn soft" onClick={lerPergunta}>🔊 Ler pergunta</button><button className="btn outline" onClick={()=>setScreen('categoria')}>Trocar categoria</button></div></section>}
      {screen==='resultado' && resultado && <section className="result-card"><span className="eyebrow">JORNADA CONCLUÍDA</span><div className="trophy">🏆</div><h2>Resultado Final</h2><p>{percentual>=80?'Excelente! Você teve um ótimo desempenho.':percentual>=50?'Bom trabalho! Continue estudando para melhorar ainda mais.':'Continue tentando! Cada tentativa ajuda no aprendizado.'}</p><div className="result-grid"><div><span>Pontuação</span><strong>{resultado.pontuacao}</strong></div><div><span>Acertos</span><strong>{resultado.total_acertos}</strong></div><div><span>Erros</span><strong>{resultado.total_erros}</strong></div><div><span>Total</span><strong>{resultado.total_perguntas}</strong></div></div><div className="result-actions"><button className="btn primary" onClick={()=>setScreen('categoria')}>Fazer outro quiz</button><button className="btn outline" onClick={()=>setScreen('inicio')}>Voltar ao início</button></div></section>}
      {erro && <p className="message" role="alert">{erro}</p>}
      <section className="history-card"><h2>📊 Suas aventuras anteriores</h2><button className="btn soft history-refresh" onClick={carregarHistorico}>↻ Atualizar histórico</button><div className="history-list">{historico.length?historico.map(h=><div className="history-item" key={h.id}><div><strong>{h.usuario_nome||'Usuário'}</strong><br/><span>{h.criado_em?new Date(h.criado_em).toLocaleString('pt-BR'):''}</span></div><div><strong>{h.pontuacao} pts</strong><br/><span>{h.total_acertos}/{h.total_perguntas} acertos</span></div></div>):<p>Nenhuma tentativa registrada.</p>}</div></section>
    </main><footer className="site-footer">🌍 GeoInclusivo <span>Geografia para todos, no seu ritmo.</span></footer>
  </div>;
}
