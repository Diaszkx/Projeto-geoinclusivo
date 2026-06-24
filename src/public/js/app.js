const app = (() => {
  const state = {
    categories: [],
    selectedCategoryId: null,
    selectedCategoryName: '',
    questions: [],
    currentIndex: 0,
    correctCount: 0,
    audioEnabled: false,
    lastQuestionText: '',
    answers: []
  };

  const categoryIcons = {
    capitais: '🏛️',
    biomas: '🌳',
    mapas: '🗺️',
    bandeiras: '🚩',
    clima: '🌍',
    continentes: '🏔️',
    cultura: '🏺',
    curiosidades: '🎈'
  };

  const fallbackCategories = [
    { id: 1, nome: 'Capitais', descricao: 'Identifique capitais do Brasil e do mundo.' },
    { id: 2, nome: 'Biomas', descricao: 'Conheça os biomas e paisagens naturais.' },
    { id: 3, nome: 'Mapas', descricao: 'Aprenda localização e interpretação de mapas.' }
  ];

  const $ = (id) => document.getElementById(id);

  function normalize(text) {
    return String(text || '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();
  }

  function setScreen(screen) {
    document.querySelectorAll('.screen').forEach((el) => {
      el.classList.remove('screen--active');
    });

    $(screen).classList.add('screen--active');

    const activeMap = {
      screenHome: 'stepHome',
      screenCategories: 'stepCategories',
      screenQuiz: 'stepQuiz',
      screenResult: 'stepResult'
    };

    document.querySelectorAll('.step').forEach((el) => {
      el.classList.remove('step--active');
    });

    if (activeMap[screen]) {
      $(activeMap[screen]).classList.add('step--active');
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function toast(message) {
    const el = $('toast');
    el.textContent = message;
    el.classList.add('toast--show');

    setTimeout(() => {
      el.classList.remove('toast--show');
    }, 2600);
  }

  async function request(url, options = {}) {
    const response = await fetch(url, options);
    const data = await response.json().catch(() => null);

    if (!response.ok) {
      throw new Error(data?.mensagem || 'Erro ao comunicar com a API.');
    }

    return data;
  }

  async function loadCategories() {
    try {
      const categories = await request('/api/categorias');
      state.categories = categories.length ? categories : fallbackCategories;
    } catch (error) {
      state.categories = fallbackCategories;
      toast('Não foi possível carregar categorias da API. Usando categorias padrão.');
    }

    renderCategories();
  }

  function renderCategories() {
    const grid = $('categoryGrid');
    grid.innerHTML = '';

    state.categories.forEach((category) => {
      const key = normalize(category.nome);
      const iconEntry = Object.entries(categoryIcons).find(([name]) => key.includes(name));
      const icon = iconEntry ? iconEntry[1] : '🌎';

      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'category-card';

      button.innerHTML = `
        <span class="category-card__icon">${icon}</span>
        <h3>${category.nome}</h3>
        <p>${category.descricao || 'Perguntas para aprender geografia.'}</p>
      `;

      button.addEventListener('click', () => {
        startQuiz(category.id, category.nome);
      });

      grid.appendChild(button);
    });
  }

  function goHome() {
    setScreen('screenHome');
  }

  function goCategories() {
    const nome = $('nome').value.trim();

    if (!nome) {
      toast('Digite seu nome antes de iniciar.');
      $('nome').focus();
      return;
    }

    setScreen('screenCategories');
  }

  async function startQuiz(categoryId, categoryName) {
    state.selectedCategoryId = categoryId;
    state.selectedCategoryName = categoryName;
    state.currentIndex = 0;
    state.correctCount = 0;
    state.answers = [];

    try {
      const questions = await request(`/api/quiz/iniciar?categoria_id=${categoryId}`);
      state.questions = questions.slice(0, 5);

      if (!state.questions.length) {
        toast('Essa categoria ainda não possui perguntas cadastradas.');
        return;
      }

      setScreen('screenQuiz');
      renderQuestion();
    } catch (error) {
      toast(error.message);
    }
  }

  function renderQuestion() {
    const question = state.questions[state.currentIndex];
    const total = state.questions.length;
    const number = state.currentIndex + 1;

    $('questionCategory').textContent = `✓ Categoria: ${state.selectedCategoryName}`;
    $('questionCounter').textContent = `Pergunta ${number} de ${total}`;
    $('progressBar').style.width = `${(number / total) * 100}%`;
    $('questionTitle').textContent = question.enunciado;
    $('liveScore').textContent = state.correctCount;

    state.lastQuestionText = question.enunciado;

    const letters = ['A', 'B', 'C', 'D', 'E'];
    const answerList = $('answerList');
    answerList.innerHTML = '';

    question.alternativas.forEach((answer, index) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'answer-card';

      button.innerHTML = `
        <span class="answer-letter">${letters[index] || '?'}</span>
        <span>${answer.texto}</span>
      `;

      button.addEventListener('click', () => {
        chooseAnswer(question, answer);
      });

      answerList.appendChild(button);
    });

    if (state.audioEnabled) {
      speak(question.enunciado);
    }
  }

  async function chooseAnswer(question, answer) {
    state.answers.push({
      pergunta_id: question.id,
      alternativa_id: answer.id
    });

    const correctAnswer = question.alternativas.find((alt) => {
      return alt.correta === 1 || alt.correta === true;
    });

    if (correctAnswer && correctAnswer.id === answer.id) {
      state.correctCount += 1;
    }

    if (state.currentIndex < state.questions.length - 1) {
      state.currentIndex += 1;
      renderQuestion();
      return;
    }

    await finishQuiz();
  }

  async function finishQuiz() {
    const nome = $('nome').value.trim();
    const email = $('email').value.trim();

    try {
      const result = await request('/api/quiz/finalizar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          usuario: {
            nome,
            email
          },
          respostas: state.answers
        })
      });

      const tentativa = result.tentativa;
      const total = tentativa.total_perguntas || state.questions.length;
      const acertos = tentativa.total_acertos;
      const percentual = total ? Math.round((acertos / total) * 100) : 0;

      $('resultCorrect').textContent = acertos;
      $('resultTotal').textContent = `de ${total}`;
      $('resultPercent').textContent = `${percentual}%`;
      $('resultPoints').textContent = `${tentativa.pontuacao} pontos`;

      if (percentual >= 80) {
        $('resultTitle').textContent = 'Excelente!';
        $('resultMessage').textContent = '🏆 Você mandou muito bem! Continue explorando o mundo.';
      } else if (percentual >= 50) {
        $('resultTitle').textContent = 'Parabéns!';
        $('resultMessage').textContent = '⭐ Bom trabalho! Você está aprendendo.';
      } else {
        $('resultTitle').textContent = 'Continue tentando!';
        $('resultMessage').textContent = '📚 Cada tentativa ajuda você a aprender mais.';
      }

      setScreen('screenResult');
      loadHistory();
    } catch (error) {
      toast(error.message);
    }
  }

  async function loadHistory() {
    const list = $('historyList');
    list.innerHTML = '<p>Carregando histórico...</p>';

    try {
      const history = await request('/api/quiz/tentativas');
      const last = history.slice(0, 6);

      if (!last.length) {
        list.innerHTML = '<p>Nenhuma tentativa registrada ainda.</p>';
        return;
      }

      list.innerHTML = last.map((item) => `
        <div class="history-item">
          <div>
            <strong>${item.usuario_nome || 'Usuário'}</strong>
            <br>
            <span>${new Date(item.criado_em).toLocaleString('pt-BR')}</span>
          </div>
          <div>
            <strong>${item.pontuacao} pts</strong>
            <br>
            <span>${item.total_acertos}/${item.total_perguntas} acertos</span>
          </div>
        </div>
      `).join('');
    } catch (error) {
      list.innerHTML = '<p>Não foi possível carregar o histórico.</p>';
    }
  }

  function speak(text = state.lastQuestionText) {
    if (!('speechSynthesis' in window)) {
      toast('Leitor de voz não disponível neste navegador.');
      return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'pt-BR';

    window.speechSynthesis.speak(utterance);
  }

  function configureAccessibility() {
    document.querySelectorAll('[data-font]').forEach((button) => {
      button.addEventListener('click', () => {
        document.querySelectorAll('[data-font]').forEach((btn) => {
          btn.classList.remove('segmented__btn--active');
        });

        button.classList.add('segmented__btn--active');

        const size = button.dataset.font;
        const scale = size === 'small' ? 0.92 : size === 'large' ? 1.15 : 1;

        document.documentElement.style.setProperty('--font-scale', scale);
      });
    });

    document.querySelectorAll('[data-contrast]').forEach((button) => {
      button.addEventListener('click', () => {
        document.querySelectorAll('[data-contrast]').forEach((btn) => {
          btn.classList.remove('segmented__btn--active');
        });

        button.classList.add('segmented__btn--active');

        document.body.classList.toggle('dark', button.dataset.contrast === 'dark');
      });
    });

    $('btnAudio').addEventListener('click', () => {
      state.audioEnabled = !state.audioEnabled;
      $('btnAudio').textContent = state.audioEnabled ? '🔊 Áudio Ativado' : '🔈 Áudio Desativado';

      toast(state.audioEnabled ? 'Áudio ativado.' : 'Áudio desativado.');
    });

    $('btnFontQuick').addEventListener('click', () => {
      document.documentElement.style.setProperty('--font-scale', 1.15);
      toast('Fonte aumentada.');
    });

    $('btnReadQuestion').addEventListener('click', () => {
      speak();
    });

    $('btnRepeatQuestion').addEventListener('click', () => {
      speak();
    });
  }

  function init() {
    $('btnGoCategories').addEventListener('click', goCategories);

    configureAccessibility();
    loadCategories();
    loadHistory();
  }

  document.addEventListener('DOMContentLoaded', init);

  return {
    goHome,
    goCategories
  };
})();
