/* ==========================================
   Coreano. - Aplicación Simple y Robusta
   ========================================== */

(() => {
  // Estado
  let lang = localStorage.getItem('coreano-lang') || 'es';
  let currentLevel = 'todos';
  let completed = new Set(JSON.parse(localStorage.getItem('coreano-completed') || '[]'));

  // DOM
  const $ = (s) => document.querySelector(s);
  const $$ = (s) => Array.from(document.querySelectorAll(s));

  // i18n
  function t(key) {
    return (typeof I18N !== 'undefined' && I18N[lang] && I18N[lang][key]) || (typeof I18N !== 'undefined' && I18N.es && I18N.es[key]) || key;
  }

  function applyLang() {
    $$('[data-i18n]').forEach(el => el.textContent = t(el.dataset.i18n));
    $$('.lang-btn').forEach(b => b.classList.toggle('active', b.dataset.lang === lang));
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
  });

  // Audio - Google TTS (más natural, funciona en Brave)
  let audioContext = null;
  let userHasInteracted = false;

  function initAudio() {
    if (!audioContext) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (AC) audioContext = new AC();
    }
    if (audioContext && audioContext.state === 'suspended') audioContext.resume();
  }

  async function speak(text, rate = 0.9) {
    if (!text) return;
    userHasInteracted = true;
    initAudio();
    try {
      const url = 'https://translate.google.com/translate_tts?' +
        new URLSearchParams({ ie: 'UTF-8', q: text, tl: 'ko', client: 'tw-ob', textlen: text.length });
      const res = await fetch(url, {
        headers: { 'User-Agent': 'Mozilla/5.0', 'Referer': 'https://translate.google.com/' },
        mode: 'cors'
      });
      if (!res.ok) throw new Error('fail');
      const blob = await res.blob();
      const audio = new Audio(URL.createObjectURL(blob));
      audio.play().catch(() => {});
    } catch(e) {
      try {
        new Audio('https://translate.google.com/translate_tts?' +
          new URLSearchParams({ ie: 'UTF-8', q: text, tl: 'ko', client: 'tw-ob' })).play().catch(() => {});
      } catch(e2) {}
    }
  }

  // Utilidades
  function labelFor(levelKey) {
    const lv = typeof LEVELS !== 'undefined' ? LEVELS[levelKey] : null;
    if (!lv) return levelKey;
    const map = { es: 'labelES', en: 'labelEN', ko: 'labelKO' };
    return lv[map[lang]] || levelKey;
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

  // Nivel desbloqueado
  function isLevelUnlocked(levelKey) {
    const lv = typeof LEVELS !== 'undefined' ? LEVELS[levelKey] : null;
    if (!lv || !lv.unlockAfter) return true;
    const prevLessons = typeof LESSONS !== 'undefined' ? LESSONS.filter(l => l.level === lv.unlockAfter) : [];
    if (prevLessons.length === 0) return true;
    const donePrev = prevLessons.filter(l => completed.has(l.id)).length;
    return donePrev >= prevLessons.length;
  }

  // Render lecciones
  function renderLessons() {
    const grid = $('#lessons-grid');
    if (!grid) return;
    grid.innerHTML = '';
    if (typeof LESSONS === 'undefined') {
      grid.innerHTML = '<p style="color:red">Error: datos no cargados</p>';
      return;
    }
    const filtered = LESSONS.filter(l => currentLevel === 'todos' || l.level === currentLevel);
    filtered.sort((a, b) => (typeof LEVELS !== 'undefined' && LEVELS[a.level] ? LEVELS[a.level].order : 0) - 
                          (typeof LEVELS !== 'undefined' && LEVELS[b.level] ? LEVELS[b.level].order : 0) || a.id - b.id);

    filtered.forEach(lesson => {
      const done = completed.has(lesson.id);
      const lv = typeof LEVELS !== 'undefined' ? LEVELS[lesson.level] : null;
      const color = lv ? lv.color : '#8b5cf6';
      const unlocked = isLevelUnlocked(lesson.level);

      const card = document.createElement('article');
      card.className = 'lesson-card' + (done ? ' done' : '') + (unlocked ? '' : ' locked');
      card.innerHTML = `
        <div class="lesson-tag" style="background:rgba(0,0,0,0.55);color:${color};border:1px solid rgba(${hexToRgb(color)},0.5);">
          ${labelFor(lesson.level)}
        </div>
        ${!unlocked ? '<div class="lesson-lock-overlay"><div class="lock-icon">🔒</div><div class="lock-text">' + t('lock.level') + '<br>' + t('lock.complete_prev') + '</div></div>' : ''}
        <div style="font-size:0.72rem;font-weight:800;text-transform:uppercase;letter-spacing:0.6px;color:var(--text-muted);margin-bottom:0.35rem;position:relative;z-index:1;">${escapeHtml(lesson.category)}</div>
        <div style="font-family:'Nanum Gothic',sans-serif;font-size:1.35rem;font-weight:800;color:var(--text);margin:0 0 0.4rem;line-height:1.25;position:relative;z-index:1;">${escapeHtml(lesson.title)}</div>
        <div style="font-size:0.9rem;color:var(--warning);font-weight:700;margin-bottom:0.6rem;position:relative;z-index:1;">${escapeHtml(lesson.roman)}</div>
        <p style="font-size:0.9rem;color:var(--text-muted);margin-bottom:1rem;line-height:1.55;position:relative;z-index:1;">${escapeHtml(lesson.es)}</p>
        <div class="lesson-meta"><span>${done ? '✓ ' + t('prog.completed') : 'Pendiente'}</span></div>
        <div class="lesson-actions" style="position:relative;z-index:1;">
          <button class="btn-audio" ${!unlocked ? 'disabled' : ''}>🔊</button>
          <span style="flex:1;"></span>
        </div>
      `;

      if (unlocked) {
        card.style.cursor = 'pointer';
        card.onclick = (e) => { if (e.target.closest('.btn-audio')) return; openModal(lesson); };
        card.querySelector('.btn-audio').onclick = (e) => { e.stopPropagation(); speak(lesson.title, 0.9); };
      }
      grid.appendChild(card);
    });
  }

  // Filtros
  $$('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      $$('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentLevel = btn.dataset.level;
      renderLessons();
    });
  });

  // Modal
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

  function openModal(lesson) {
    currentLessonId = lesson.id;
    const done = completed.has(lesson.id);
    const lv = typeof LEVELS !== 'undefined' ? LEVELS[lesson.level] : null;
    modalTitle.textContent = lesson.title;
    modalLevel.textContent = labelFor(lesson.level);
    modalLevel.style.color = lv ? lv.color : '#8b5cf6';
    modalHangul.innerHTML = '<div class="tr-content hangul-big">' + escapeHtml(lesson.title) + '</div>';
    modalRoman.textContent = lesson.roman;
    modalEs.textContent = lesson.es;
    modalEn.textContent = lesson.en;
    modalNotes.innerHTML = '<strong style="color:var(--accent);">' + t('tr.korean') + ' / ' + t('tr.english') + ':</strong> ' + escapeHtml(lesson.notes);
    modalMarkDone.textContent = done ? t('btn.markDone').replace('✓', '✔') : t('btn.markDone');
    modalOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modalOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  modalClose.onclick = closeModal;
  modalOverlay.onclick = (e) => { if (e.target === modalOverlay) closeModal(); };
  document.onkeydown = (e) => { if (e.key === 'Escape' && modalOverlay.classList.contains('open')) closeModal(); };

  modalAudio.onclick = () => { speak(currentLessonId ? LESSONS.find(l => l.id === currentLessonId).title : '', 0.9); };

  modalMarkDone.onclick = () => {
    if (!currentLessonId) return;
    if (completed.has(currentLessonId)) {
      completed.delete(currentLessonId);
    } else {
      completed.add(currentLessonId);
      localStorage.setItem('coreano-completed', JSON.stringify([...completed]));
    }
    renderLessons();
    renderProgress();
    const lesson = LESSONS.find(l => l.id === currentLessonId);
    modalMarkDone.textContent = completed.has(currentLessonId)
      ? t('btn.markDone').replace('✓', '✔')
      : t('btn.markDone');
  };

  let currentLessonId = null;

  // Quiz simple
  const quizCard = $('#quiz-card');
  const quizQuestion = $('#quiz-question');
  const quizOptions = $('#quiz-options');
  const quizFeedback = $('#quiz-feedback');
  const quizNext = $('#quiz-next');
  const quizResult = $('#quiz-result');
  const quizScoreText = $('#quiz-score-text');
  const quizRestart = $('#quiz-restart');

  function startQuiz() {
    if (typeof QUIZ === 'undefined') return;
    const pool = QUIZ.sort(() => Math.random() - 0.5).slice(0, 5);
    let qi = 0, score = 0;
    quizResult.style.display = 'none';
    quizCard.style.display = 'block';
    quizFeedback.style.display = 'none';
    quizNext.style.display = 'none';

    function showQ() {
      const q = pool[qi];
      quizQuestion.textContent = tKeyObj(q.q);
      quizOptions.innerHTML = '';
      q.options.forEach((opt, i) => {
        const b = document.createElement('button');
        b.className = 'quiz-opt';
        b.textContent = opt;
        b.onclick = () => {
          const correct = i === q.answer;
          if (correct) score++;
          $$('.quiz-opt').forEach((bb, idx) => {
            bb.disabled = true;
            bb.classList.remove('selected');
            if (idx === q.answer) bb.classList.add('correct');
            if (idx === i && !correct) bb.classList.add('wrong');
          });
          setTimeout(() => speak(q.options[q.answer], 0.85), 400);
          quizFeedback.textContent = correct ? '¡Correcto! ✅' : 'Incorrecto ❌';
          quizFeedback.className = 'quiz-feedback ' + (correct ? 'correct' : 'wrong');
          quizFeedback.style.display = 'block';
          quizNext.style.display = 'inline-flex';
        };
        quizOptions.appendChild(b);
      });
    }
    showQ();

    quizNext.onclick = () => {
      qi++;
      if (qi >= pool.length) {
        quizCard.style.display = 'none';
        quizResult.style.display = 'block';
        const pct = Math.round((score / pool.length) * 100);
        quizScoreText.innerHTML = 'Obtuviste <strong>' + score + '/' + pool.length + '</strong> (' + pct + '%)';
      } else {
        quizFeedback.style.display = 'none';
        quizNext.style.display = 'none';
        showQ();
      }
    };
  }

  function tKeyObj(obj) { return obj[lang] || obj.es || Object.values(obj)[0]; }

  quizRestart.onclick = startQuiz;

  // Progreso
  function renderProgress() {
    const total = typeof LESSONS !== 'undefined' ? LESSONS.length : 0;
    const doneCount = completed.size;
    const pct = total ? Math.round((doneCount / total) * 100) : 0;
    $('#prog-completed').textContent = doneCount;
    $('#prog-total').textContent = total;
    $('#prog-pct').textContent = pct + '%';
    const list = $('#progress-list');
    list.innerHTML = '';
    if (typeof LESSONS !== 'undefined') {
      LESSONS.slice().sort((a, b) => (typeof LEVELS !== 'undefined' && LEVELS[a.level] ? LEVELS[a.level].order : 0) - 
                        (typeof LEVELS !== 'undefined' && LEVELS[b.level] ? LEVELS[b.level].order : 0) || a.id - b.id)
      .forEach(lesson => {
        const done = completed.has(lesson.id);
        const lv = typeof LEVELS !== 'undefined' ? LEVELS[lesson.level] : null;
        const unlocked = isLevelUnlocked(lesson.level);
        const item = document.createElement('div');
        item.className = 'prog-item ' + (done ? 'done' : unlocked ? 'pending' : 'locked');
        item.innerHTML = '<div class="prog-item-title" style="color:' + (lv ? lv.color : '#8b5cf6') + ';">' + escapeHtml(lesson.title) + '</div><div class="prog-item-sub">' + escapeHtml(lesson.es) + '</div>' + (!unlocked ? '<div style="font-size:0.7rem;color:var(--text-muted);margin-top:4px;">🔒 Bloqueado</div>' : '');
        if (unlocked) item.onclick = () => openModal(lesson);
        list.appendChild(item);
      });
    }
  }

  // Toast
  function showToast(msg, kind = 'info') {
    const container = $('#toast-container');
    const el = document.createElement('div');
    el.className = 'toast ' + kind;
    el.textContent = msg;
    container.appendChild(el);
    setTimeout(() => { el.style.opacity = '0'; el.style.transform = 'translateY(-20px)'; setTimeout(() => el.remove(), 400); }, 3000);
  }

  // Navbar scroll
  const navbar = $('#navbar');
  window.onscroll = () => { if (window.scrollY > 60) navbar.classList.add('scrolled'); else navbar.classList.remove('scrolled'); };

  // Menú móvil
  const navToggle = $('#nav-toggle');
  const navMenu = $('#nav-menu');
  navToggle.onclick = () => {
    const open = navMenu.classList.toggle('open');
    navToggle.querySelectorAll('.bar').forEach((b, i) => {
      if (i === 0 || i === 2) b.classList.toggle('active', open);
      if (i === 1) b.style.opacity = open ? '0' : '1';
    });
  };
  $$('.nav-link').forEach(a => a.onclick = () => {
    navMenu.classList.remove('open');
    navToggle.querySelectorAll('.bar').forEach((b, i) => { b.classList.remove('active'); if (i === 1) b.style.opacity = '1'; });
  });

  // Dark/Light mode
  try {
    const themeToggle = $('#theme-toggle');
    const savedTheme = localStorage.getItem('coreano-theme') || 'dark';
    function setTheme(theme) {
      if (theme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
        themeToggle.textContent = '☀️';
        localStorage.setItem('coreano-theme', 'light');
      } else {
        document.documentElement.removeAttribute('data-theme');
        themeToggle.textContent = '🌙';
        localStorage.setItem('coreano-theme', 'dark');
      }
    }
    setTheme(savedTheme);
    themeToggle.onclick = () => {
      const isLight = document.documentElement.getAttribute('data-theme') === 'light';
      setTheme(isLight ? 'dark' : 'light');
    };
  } catch(e) {}

  // Activar audio (Brave/Firefox)
  try {
    const audioInit = $('#audio-init');
    const btnActivateAudio = $('#btn-activate-audio');
    function showAudioInit() {
      if (audioInit && !userHasInteracted) audioInit.style.display = 'block';
    }
    if (btnActivateAudio) {
      btnActivateAudio.onclick = () => {
        userHasInteracted = true;
        initAudio();
        if (audioInit) audioInit.style.display = 'none';
        speak('안녕하세요', 0.9);
        showToast('¡Audio activado! 🔊', 'success');
      };
    }
    showAudioInit();
  } catch(e) {}

  // Inicializar
  try {
    const yearEl = $('#footer-year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  } catch(e) {}

  applyLang();
  renderProgress();

  window.startQuiz = startQuiz;
})();
