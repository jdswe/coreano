/* ==========================================
   Coreano. - Aplicación
   Niveles A1-C2 + Audio de pronunciación mejorado
   ========================================== */

(() => {
  // ---------- Estado ----------
  let lang = localStorage.getItem('coreano-lang') || 'es';
  let currentLevel = 'todos';
  let currentLessonId = null;
  let completed = new Set(JSON.parse(localStorage.getItem('coreano-completed') || '[]'));
  let quizState = { index: 0, score: 0, answers: [] };
  let synth = window.speechSynthesis || null;
  let audioEnabled = false;
  let voices = [];
  let koreanVoice = null;

  // ---------- DOM ----------
  const $ = (s) => document.querySelector(s);
  const $$ = (s) => Array.from(document.querySelectorAll(s));

  // ---------- i18n ----------
  function t(key) {
    return (I18N[lang] && I18N[lang][key]) || (I18N.es[key]) || key;
  }

  function applyLang() {
    $$('[data-i18n]').forEach((el) => {
      el.textContent = t(el.dataset.i18n);
    });
    $$('.lang-btn').forEach((b) => {
      b.classList.toggle('active', b.dataset.lang === lang);
    });
    document.documentElement.lang = lang;
    renderLessons();
    renderProgress();
  }

  $('#language-switcher').addEventListener('click', (e) => {
    const btn = e.target.closest('.lang-btn');
    if (!btn) return;
    lang = btn.dataset.lang;
    localStorage.setItem('coreano-lang', lang);
    applyLang();
    showToast(lang === 'es' ? 'Idioma: Español' : lang === 'en' ? 'Language: English' : '언어: 한국어', 'info');
  });

  // ---------- Audio / TTS ----------
  function loadVoices() {
    if (!synth) return;
    voices = synth.getVoices();
    koreanVoice = voices.find(v => v.lang.startsWith('ko')) ||
                  voices.find(v => v.name.toLowerCase().includes('korean'));
    audioEnabled = voices.length > 0;
    console.log('Voces disponibles:', voices.map(v => `${v.name} (${v.lang})`));
    console.log('Voz coreana:', koreanVoice ? koreanVoice.name : 'No encontrada');
  }

  if (synth) {
    synth.onvoiceschanged = loadVoices;
    loadVoices();
  }

  // Usar Google Translate TTS como fallback (suena más natural, no necesita API key)
  function speakGoogleTTS(text) {
    const url = 'https://translate.google.com/translate_tts?' +
      new URLSearchParams({
        ie: 'UTF-8',
        q: text,
        tl: 'ko',
        client: 'tw-ob',
        textlen: text.length
      });
    const audio = new Audio(url);
    audio.play().catch(err => console.warn('Google TTS falló:', err));
  }

  function speak(text, rate = 1.0) {
    if (!text) return;

    // Intentar Web Speech API con voz coreana del sistema
    if (synth && koreanVoice && audioEnabled) {
      try {
        window.speechSynthesis.cancel();
        const u = new SpeechSynthesisUtterance(text);
        u.lang = 'ko-KR';
        u.rate = rate;
        u.volume = 1;
        u.voice = koreanVoice;
        synth.speak(u);
        return;
      } catch (e) {
        console.warn('Web Speech falló:', e);
      }
    }

    // Fallback a Google Translate TTS
    speakGoogleTTS(text);
  }

  // ---------- Utilidades ----------
  function labelFor(levelKey) {
    const l = LEVELS[levelKey];
    if (!l) return levelKey;
    const map = { es: 'labelES', en: 'labelEN', ko: 'labelKO' };
    return l[map[lang]] || levelKey;
  }

  function hexToRgb(hex) {
    const r = parseInt(hex.slice(1, 3), 16), g = parseInt(hex.slice(3, 5), 16), b = parseInt(hex.slice(5, 7), 16);
    return `${r}, ${g}, ${b}`;
  }

  function escapeHtml(str) {
    const d = document.createElement('div');
    d.textContent = str;
    return d.innerHTML;
  }

  // ---------- Lecciones ----------
  const lessonsGrid = $('#lessons-grid');

  function renderLessons() {
    lessonsGrid.innerHTML = '';
    const filtered = LESSONS.filter((l) => currentLevel === 'todos' || l.level === currentLevel);

    filtered.sort((a, b) => (LEVELS[a.level].order || 0) - (LEVELS[b.level].order || 0) || a.id - b.id);

    filtered.forEach((lesson) => {
      const done = completed.has(lesson.id);
      const lv = LEVELS[lesson.level];
      const card = document.createElement('article');
      card.className = 'lesson-card' + (done ? ' done' : '');
      card.innerHTML = `
        <div class="lesson-tag" style="background:rgba(0,0,0,0.55);color:${lv.color};border:1px solid rgba(${hexToRgb(lv.color)},0.5);">
          ${labelFor(lesson.level)}
        </div>
        <div style="font-size:0.72rem;font-weight:800;text-transform:uppercase;letter-spacing:0.6px;color:var(--text-muted);margin-bottom:0.35rem;">${escapeHtml(lesson.category)}</div>
        <div style="font-family:'Nanum Gothic',sans-serif;font-size:1.35rem;font-weight:800;color:var(--text);margin:0 0 0.4rem;line-height:1.25;">${escapeHtml(lesson.title)}</div>
        <div style="font-size:0.9rem;color:var(--warning);font-weight:700;margin-bottom:0.6rem;">${escapeHtml(lesson.roman)}</div>
        <p style="font-size:0.9rem;color:var(--text-muted);margin-bottom:1rem;line-height:1.55;">${escapeHtml(lesson.es)}</p>
        <div class="lesson-meta">
          <span>${done ? '✓ ' + t('prog.completed') : 'Pendiente'}</span>
        </div>
        <div class="lesson-actions">
          <button class="btn-audio" aria-label="${t('btn.listen')}" data-text="${escapeHtml(lesson.title)}">🔊</button>
          <span style="flex:1;"></span>
        </div>
      `;
      card.addEventListener('click', (e) => {
        if (e.target.closest('.btn-audio')) return;
        openModal(lesson);
      });
      card.querySelector('.btn-audio').addEventListener('click', (e) => {
        e.stopPropagation();
        speak(lesson.title, 0.9);
      });
      lessonsGrid.appendChild(card);
    });
  }

  // ---------- Nivel / filtros ----------
  $$('.filter-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      $$('.filter-btn').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      currentLevel = btn.dataset.level;
      renderLessons();
    });
  });

  // ---------- Modal ----------
  const modalOverlay = $('#modal-overlay');
  const modalClose = $('#modal-close');
  const modalTitle = $('#modal-title');
  const modalLevel = $('#modal-level');
  const modalHangul = $('#modal-hangul');
  const modalRoman = $('#modal-roman');
  const modalEs = $('#modal-es');
  const modalEn = $('#modal-en');
  const modalNotes = $('#modal-notes');
  const modalMarkDone = $('#modal-mark-done');
  const modalAudio = $('#modal-audio');

  let currentLessonAudioText = '';

  function openModal(lesson) {
    currentLessonId = lesson.id;
    currentLessonAudioText = lesson.title;
    const done = completed.has(lesson.id);
    const lv = LEVELS[lesson.level];
    modalTitle.textContent = lesson.title;
    modalLevel.textContent = labelFor(lesson.level);
    modalLevel.style.color = lv.color;
    modalHangul.innerHTML = `<div class="tr-content hangul-big">${escapeHtml(lesson.title)}</div>`;
    modalRoman.textContent = lesson.roman;
    modalEs.textContent = lesson.es;
    modalEn.textContent = lesson.en;
    modalNotes.innerHTML = `<strong style="color:var(--accent);">${t('tr.korean')} / ${t('tr.english')}:</strong> ${escapeHtml(lesson.notes)}`;
    modalMarkDone.textContent = done ? t('btn.markDone').replace('✓', '✔') : t('btn.markDone');
    modalMarkDone.classList.toggle('done', done);
    modalAudio.dataset.text = lesson.title;
    modalOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modalOverlay.classList.remove('open');
    document.body.style.overflow = '';
    currentLessonId = null;
    if (synth) window.speechSynthesis.cancel();
  }

  modalClose.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('open')) closeModal();
  });

  modalAudio.addEventListener('click', () => {
    speak(currentLessonAudioText || modalTitle.textContent, 0.9);
  });

  modalMarkDone.addEventListener('click', () => {
    if (currentLessonId === null) return;
    if (completed.has(currentLessonId)) {
      completed.delete(currentLessonId);
      showToast(lang === 'es' ? 'Lección marcada como pendiente' : lang === 'en' ? 'Marked as pending' : '보류 중으로 표시', 'info');
    } else {
      completed.add(currentLessonId);
      localStorage.setItem('coreano-completed', JSON.stringify([...completed]));
      showToast(lang === 'es' ? '¡Lección completada! 🎉' : lang === 'en' ? 'Lesson completed! 🎉' : '레슨 완료! 🎉', 'success');
    }
    renderLessons();
    renderProgress();
    const lesson = LESSONS.find((l) => l.id === currentLessonId);
    modalMarkDone.textContent = completed.has(currentLessonId)
      ? t('btn.markDone').replace('✓', '✔')
      : t('btn.markDone');
    modalMarkDone.classList.toggle('done', completed.has(currentLessonId));
  });

  // ---------- Quiz ----------
  const quizCard = $('#quiz-card');
  const quizQuestion = $('#quiz-question');
  const quizOptions = $('#quiz-options');
  const quizFeedback = $('#quiz-feedback');
  const quizNext = $('#quiz-next');
  const quizResult = $('#quiz-result');
  const quizScoreText = $('#quiz-score-text');
  const quizRestart = $('#quiz-restart');

  function startQuiz() {
    const pool = QUIZ.sort(() => Math.random() - 0.5).slice(0, 5);
    quizState = { index: 0, score: 0, answers: [], pool };
    quizResult.style.display = 'none';
    quizCard.style.display = 'block';
    quizFeedback.style.display = 'none';
    quizNext.style.display = 'none';
    renderQuiz();
  }

  function renderQuiz() {
    const q = quizState.pool[quizState.index];
    quizQuestion.textContent = tKeyObj(q.q);
    quizOptions.innerHTML = '';
    q.options.forEach((opt, i) => {
      const b = document.createElement('button');
      b.className = 'quiz-opt';
      b.textContent = opt;
      b.addEventListener('click', () => handleQuizAnswer(i, opt));
      b.addEventListener('mouseenter', () => { b.style.borderColor = 'var(--primary)'; });
      quizOptions.appendChild(b);
    });
  }

  function tKeyObj(obj) {
    return obj[lang] || obj.es || Object.values(obj)[0];
  }

  function handleQuizAnswer(i, optText) {
    const q = quizState.pool[quizState.index];
    const correct = i === q.answer;
    quizState.answers.push({ q: quizState.index, ans: i, correct });
    if (correct) quizState.score++;

    $$('.quiz-opt').forEach((b, idx) => {
      b.disabled = true;
      b.classList.remove('selected');
      if (idx === q.answer) b.classList.add('correct');
      if (idx === i && !correct) b.classList.add('wrong');
    });

    setTimeout(() => {
      speak(q.options[q.answer], 0.85);
    }, 400);

    quizFeedback.textContent = correct
      ? (lang === 'es' ? '¡Correcto! ✅' : lang === 'en' ? 'Correct! ✅' : '정답입니다! ✅')
      : (lang === 'es' ? 'Incorrecto ❌' : lang === 'en' ? 'Incorrect ❌' : '오답입니다 ❌');
    quizFeedback.className = 'quiz-feedback ' + (correct ? 'correct' : 'wrong');
    quizFeedback.style.display = 'block';
    quizNext.style.display = 'inline-flex';
  }

  quizNext.addEventListener('click', () => {
    quizState.index++;
    if (quizState.index >= quizState.pool.length) {
      showResult();
    } else {
      quizFeedback.style.display = 'none';
      quizNext.style.display = 'none';
      renderQuiz();
    }
  });

  function showResult() {
    quizCard.style.display = 'none';
    quizResult.style.display = 'block';
    const pct = Math.round((quizState.score / quizState.pool.length) * 100);
    quizScoreText.innerHTML =
      lang === 'es'
        ? `Obtuviste <strong>${quizState.score}/${quizState.pool.length}</strong> (${pct}%)`
        : lang === 'en'
        ? `You scored <strong>${quizState.score}/${quizState.pool.length}</strong> (${pct}%)`
        : `<strong>${quizState.score}/${quizState.pool.length}</strong>점 (${pct}%)`;
    if (pct >= 80) showToast(lang === 'es' ? '¡Excelente resultado! 🌟' : lang === 'en' ? 'Excellent result! 🌟' : '탁월한 결과! 🌟', 'success');
    else if (pct >= 50) showToast(lang === 'es' ? 'Buen trabajo, sigue practicando 💪' : lang === 'en' ? 'Good job, keep practicing 💪' : '잘했어요, 계속 연습하세요 💪', 'info');
    else showToast(lang === 'es' ? 'Ánimo, repasa las lecciones y vuelve a intentarlo 📚' : lang === 'en' ? 'Keep going, review the lessons and try again 📚' : '화이팅! 레슨을 복습하고 다시 도전하세요 📚', 'warn');
  }

  quizRestart.addEventListener('click', startQuiz);

  // ---------- Progreso ----------
  function renderProgress() {
    const total = LESSONS.length;
    const doneCount = completed.size;
    const pct = total ? Math.round((doneCount / total) * 100) : 0;

    $('#prog-completed').textContent = doneCount;
    $('#prog-total').textContent = total;
    $('#prog-pct').textContent = pct + '%';

    const list = $('#progress-list');
    list.innerHTML = '';
    LESSONS.slice().sort((a, b) => (LEVELS[a.level].order || 0) - (LEVELS[b.level].order || 0) || a.id - b.id).forEach((lesson) => {
      const done = completed.has(lesson.id);
      const lv = LEVELS[lesson.level];
      const item = document.createElement('div');
      item.className = 'prog-item ' + (done ? 'done' : 'pending');
      item.innerHTML = `
        <div class="prog-item-title" style="color:${lv.color};">${escapeHtml(lesson.title)}</div>
        <div class="prog-item-sub">${escapeHtml(lesson.es)}</div>
      `;
      item.addEventListener('click', () => { openModal(lesson); });
      list.appendChild(item);
    });
  }

  // ---------- Toast ----------
  function showToast(msg, kind = 'info') {
    const container = $('#toast-container');
    const el = document.createElement('div');
    el.className = 'toast ' + kind;
    el.textContent = msg;
    container.appendChild(el);
    setTimeout(() => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(-20px)';
      setTimeout(() => el.remove(), 400);
    }, 3000);
  }

  // ---------- Navbar scroll ----------
  const navbar = $('#navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
  });

  // ---------- Menú móvil ----------
  const navToggle = $('#nav-toggle');
  const navMenu = $('#nav-menu');
  navToggle.addEventListener('click', () => {
    const open = navMenu.classList.toggle('open');
    navToggle.querySelectorAll('.bar').forEach((b, i) => {
      if (i === 0 || i === 2) b.classList.toggle('active', open);
      if (i === 1) b.style.opacity = open ? '0' : '1';
    });
  });
  $$('.nav-link').forEach((a) => {
    a.addEventListener('click', () => {
      navMenu.classList.remove('open');
      navToggle.querySelectorAll('.bar').forEach((b, i) => {
        b.classList.remove('active');
        if (i === 1) b.style.opacity = '1';
      });
    });
  });

  // ---------- Cursor desktop ----------
  const cursorDot = $('.cursor-dot');
  const cursorOutline = $('.cursor-outline');
  if (window.matchMedia('(pointer: fine)').matches) {
    document.body.classList.add('cursor-active');
    window.addEventListener('mousemove', (e) => {
      const x = e.clientX, y = e.clientY;
      cursorDot.style.left = x + 'px';
      cursorDot.style.top = y + 'px';
      cursorOutline.style.left = x + 'px';
      cursorOutline.style.top = y + 'px';
    });
    $$('a, button, .lesson-card, .quiz-opt, .lang-btn, .filter-btn, .prog-item').forEach((el) => {
      el.addEventListener('mouseenter', () => {
        cursorOutline.style.width = '60px';
        cursorOutline.style.height = '60px';
        cursorOutline.style.borderColor = 'var(--accent)';
        cursorDot.style.width = '12px';
        cursorDot.style.height = '12px';
        cursorDot.style.background = 'var(--accent)';
      });
      el.addEventListener('mouseleave', () => {
        cursorOutline.style.width = '40px';
        cursorOutline.style.height = '40px';
        cursorOutline.style.borderColor = 'var(--primary-glow)';
        cursorDot.style.width = '8px';
        cursorDot.style.height = '8px';
        cursorDot.style.background = 'var(--primary)';
      });
    });
  }

  // ---------- Inicialización ----------
  const yearEl = $('#footer-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  applyLang();
  renderProgress();

  window.startQuiz = startQuiz;
})();
