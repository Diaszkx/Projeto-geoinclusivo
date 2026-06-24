const appState = {
  categorias: [],
  perguntas: [],
  perguntaAtual: 0,
  respostas: [],
  categoriaSelecionada: null,
  categoriaNome: '',
  fontScale: 1,
  darkMode: false
};

const ids = {
  screens: {
    inicio: document.getElementById('screenInicio'),
    categoria: document.getElementById('screenCategoria'),
    quiz: document.getElementById('screenQuiz'),
    resultado: document.getElementById('screenResultado')
  },
  steps: {
    inicio: document.getElementById('stepInicio'),
    categoria: document.getElementById('stepCategoria'),
    quiz: document.getElementById('stepQuiz'),
    resultado: document.getElementById('stepResultado')
  },
  nome: document.getElementById('nome'),
  email: document.getElementById('email'),
  msgInicio: document.getElementById('msgInicio'),
  msgCategoria: document.getElementById('msgCategoria'),
  msgQuiz: document.getElementById('msgQuiz'),
  categoriasGrid: document.getElementById('categoriasGrid'),
  categoriaAtual: document.getElementById('categoriaAtual'),
  perguntaTexto: document.getElementById('perguntaTexto'),
  contadorPergunta: document.getElementById('contadorPergunta'),
  barraProgresso: document.getElementById('barraProgresso'),
  alternativas: document.getElementById('alternativas'),
  resultadoPontuacao: document.getElementById('resultadoPontuacao'),
  resultadoAcertos: document.getElementById('resultadoAcertos'),
  resultadoErros: document.getElementById('resultadoErros'),
  resultadoTotal: document.getElementById('resultadoTotal'),
  fraseResultado: document.getElementById('fraseResultado'),
  historico: document.getElementById('historico'),
  toast: document.getElementById('toast')
};

const iconesCategorias = {
  capitais: '🏛️',
  biomas: '🌳',
  mapas: '🗺️',
  bandeiras: '🚩',
  clima: '🌤️',
  continentes: '🌎'
};

function normalizar(texto) {
  return String(texto || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

function mostrarMensagem(elemento, mensagem) {
  elemento.textContent = mensagem || '';
}

function mostrarToast(mensagem) {
  ids.toast.textContent = mensagem;
  ids.toast.classList.add('show');

  setTimeout(() => {
    ids.toast.classList.remove('show');
  }, 2800);
}

function trocarTela(tela) {
  Object.values(ids.screens).forEach((screen) => {
    screen.classList.remove('active');
  });

  Object.values(ids.steps).forEach((step) => {
    step.classList.remove('active');
  });

  ids.screens[tela].classList.add('active');
  ids.steps[tela].classList.add('active');

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

async function api(url, opcoes = {}) {
  const resposta = await fetch(url, opcoes);
  const dados = await resposta.json().catch(() => null);

  if (!resposta.ok) {
    throw new Error(dados?.mensagem || 'Erro ao acessar a API.');
  }

  return dados;
}

async function carregarCategorias() {
  ids.categoriasGrid.innerHTML = '<p>Carregando categorias...</p>';

  try {
    const categorias = await api('/api/categorias');
    appState.categorias = categorias;

    if (!categorias.length) {
      ids.categoriasGrid.innerHTML = '<p>Nenhuma categoria cadastrada.</p>';
      return;
    }

    renderizarCategorias();
  } catch (erro) {
    ids.categoriasGrid.innerHTML = '<p>Erro ao carregar categorias.</p>';
    mostrarToast(erro.message);
  }
}

function renderizarCategorias() {
  ids.categoriasGrid.innerHTML = '';

  appState.categorias.forEach((categoria) => {
    const nomeNormalizado = normalizar(categoria.nome);
    const chaveIcone = Object.keys(iconesCategorias).find((chave) => nomeNormalizado.includes(chave));
    const icone = chaveIcone ? iconesCategorias[chaveIcone] : '🌍';

    const botao = document.createElement('button');
    botao.type = 'button';
    botao.className = 'category-card';
    botao.innerHTML = `
      <span class="category-icon">${icone}</span>
      <h3>${categoria.nome}</h3>
      <p>${categoria.descricao || 'Perguntas de geografia.'}</p>
    `;

    botao.addEventListener('click', () => {
      iniciarQuiz(categoria.id, categoria.nome);
    });

    ids.categoriasGrid.appendChild(botao);
  });
}

function validarNome() {
  const nome = ids.nome.value.trim();

  if (!nome) {
    mostrarMensagem(ids.msgInicio, 'Digite seu nome para continuar.');
    ids.nome.focus();
    return false;
  }

  mostrarMensagem(ids.msgInicio, '');
  return true;
}

function irParaCategorias() {
  if (!validarNome()) return;

  mostrarMensagem(ids.msgCategoria, '');
  trocarTela('categoria');
}

async function iniciarQuiz(categoriaId, categoriaNome) {
  mostrarMensagem(ids.msgCategoria, '');

  appState.categoriaSelecionada = categoriaId;
  appState.categoriaNome = categoriaNome;
  appState.perguntaAtual = 0;
  appState.respostas = [];

  try {
    const perguntas = await api(`/api/quiz/iniciar?categoria_id=${categoriaId}`);
    appState.perguntas = perguntas.slice(0, 5);

    if (!appState.perguntas.length) {
      mostrarMensagem(ids.msgCategoria, 'Essa categoria ainda não possui perguntas.');
      return;
    }

    trocarTela('quiz');
    renderizarPergunta();
  } catch (erro) {
    mostrarMensagem(ids.msgCategoria, erro.message);
  }
}

function renderizarPergunta() {
  const pergunta = appState.perguntas[appState.perguntaAtual];
  const numero = appState.perguntaAtual + 1;
  const total = appState.perguntas.length;

  ids.categoriaAtual.textContent = appState.categoriaNome;
  ids.perguntaTexto.textContent = pergunta.enunciado;
  ids.contadorPergunta.textContent = `${numero}/${total}`;
  ids.barraProgresso.style.width = `${(numero / total) * 100}%`;
  ids.alternativas.innerHTML = '';
  mostrarMensagem(ids.msgQuiz, '');

  if (!pergunta.alternativas || !pergunta.alternativas.length) {
    mostrarMensagem(ids.msgQuiz, 'Esta pergunta não possui alternativas cadastradas.');
    return;
  }

  const letras = ['A', 'B', 'C', 'D', 'E'];

  pergunta.alternativas.forEach((alternativa, index) => {
    const botao = document.createElement('button');
    botao.type = 'button';
    botao.className = 'answer';
    botao.innerHTML = `
      <span class="answer-letter">${letras[index] || '?'}</span>
      <span>${alternativa.texto}</span>
    `;

    botao.addEventListener('click', () => {
      selecionarResposta(pergunta.id, alternativa.id);
    });

    ids.alternativas.appendChild(botao);
  });
}

function selecionarResposta(perguntaId, alternativaId) {
  appState.respostas.push({
    pergunta_id: perguntaId,
    alternativa_id: alternativaId
  });

  if (appState.perguntaAtual < appState.perguntas.length - 1) {
    appState.perguntaAtual += 1;
    renderizarPergunta();
  } else {
    finalizarQuiz();
  }
}

async function finalizarQuiz() {
  const nome = ids.nome.value.trim();
  const email = ids.email.value.trim();

  try {
    const resultado = await api('/api/quiz/finalizar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        usuario: { nome, email },
        respostas: appState.respostas
      })
    });

    const tentativa = resultado.tentativa;

    ids.resultadoPontuacao.textContent = tentativa.pontuacao;
    ids.resultadoAcertos.textContent = tentativa.total_acertos;
    ids.resultadoErros.textContent = tentativa.total_erros;
    ids.resultadoTotal.textContent = tentativa.total_perguntas;

    const percentual = tentativa.total_perguntas
      ? Math.round((tentativa.total_acertos / tentativa.total_perguntas) * 100)
      : 0;

    if (percentual >= 80) {
      ids.fraseResultado.textContent = 'Excelente! Você teve um ótimo desempenho.';
    } else if (percentual >= 50) {
      ids.fraseResultado.textContent = 'Bom trabalho! Continue estudando para melhorar ainda mais.';
    } else {
      ids.fraseResultado.textContent = 'Continue tentando! Cada tentativa ajuda no aprendizado.';
    }

    trocarTela('resultado');
    carregarHistorico();
  } catch (erro) {
    mostrarMensagem(ids.msgQuiz, erro.message);
  }
}

async function carregarHistorico() {
  ids.historico.innerHTML = '<p>Carregando histórico...</p>';

  try {
    const historico = await api('/api/quiz/tentativas');

    if (!historico.length) {
      ids.historico.innerHTML = '<p>Nenhuma tentativa registrada.</p>';
      return;
    }

    ids.historico.innerHTML = historico.slice(0, 8).map((item) => {
      const data = item.criado_em ? new Date(item.criado_em).toLocaleString('pt-BR') : '';

      return `
        <div class="history-item">
          <div>
            <strong>${item.usuario_nome || 'Usuário'}</strong><br>
            <span>${data}</span>
          </div>
          <div>
            <strong>${item.pontuacao} pts</strong><br>
            <span>${item.total_acertos}/${item.total_perguntas} acertos</span>
          </div>
        </div>
      `;
    }).join('');
  } catch (erro) {
    ids.historico.innerHTML = '<p>Não foi possível carregar o histórico.</p>';
  }
}

function lerPergunta() {
  if (!('speechSynthesis' in window)) {
    mostrarToast('Leitor de voz não disponível neste navegador.');
    return;
  }

  const pergunta = appState.perguntas[appState.perguntaAtual];

  if (!pergunta) {
    mostrarToast('Nenhuma pergunta disponível para leitura.');
    return;
  }

  window.speechSynthesis.cancel();

  const voz = new SpeechSynthesisUtterance(pergunta.enunciado);
  voz.lang = 'pt-BR';
  window.speechSynthesis.speak(voz);
}

function aumentarFonte() {
  appState.fontScale = Math.min(appState.fontScale + 0.1, 1.35);
  document.documentElement.style.setProperty('--font-scale', appState.fontScale);
}

function diminuirFonte() {
  appState.fontScale = Math.max(appState.fontScale - 0.1, 0.85);
  document.documentElement.style.setProperty('--font-scale', appState.fontScale);
}

function alternarContraste() {
  appState.darkMode = !appState.darkMode;
  document.body.classList.toggle('dark', appState.darkMode);
}

function configurarEventos() {
  document.getElementById('btnContinuar').addEventListener('click', irParaCategorias);
  document.getElementById('btnVoltarInicio').addEventListener('click', () => trocarTela('inicio'));
  document.getElementById('btnVoltarCategorias').addEventListener('click', () => trocarTela('categoria'));
  document.getElementById('btnNovoQuiz').addEventListener('click', () => trocarTela('categoria'));
  document.getElementById('btnInicio').addEventListener('click', () => trocarTela('inicio'));
  document.getElementById('btnAtualizarHistorico').addEventListener('click', carregarHistorico);
  document.getElementById('btnLer').addEventListener('click', lerPergunta);

  document.getElementById('btnFonteMenor').addEventListener('click', diminuirFonte);
  document.getElementById('btnFonteMaior').addEventListener('click', aumentarFonte);
  document.getElementById('btnContraste').addEventListener('click', alternarContraste);

  ids.nome.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') irParaCategorias();
  });
}

document.addEventListener('DOMContentLoaded', () => {
  configurarEventos();
  carregarCategorias();
  carregarHistorico();
});
