/* ==========================================
   Coreano. - Datos estructurados A1-C2
   Progresión: números, hola, hangul primero
   ========================================== */

const I18N = {
  es: {
    'nav.inicio': 'Inicio', 'nav.niveles': 'Niveles', 'nav.quiz': 'Quiz', 'nav.progreso': 'Progreso',
    'hero.badge': 'Aprende coreano desde cero', 'hero.title': 'Coreano A1 a C2',
    'hero.subtitle': 'Aprende paso a paso: números, saludos, hangul y gramática. Traducciones en español, inglés y coreano.',
    'hero.start': 'Empezar ahora', 'hero.quiz': 'Hacer un quiz',
    'stats.lessons': '60+', 'stats.lessonsLabel': 'lecciones', 'stats.languages': '3', 'stats.languagesLabel': 'idiomas',
    'stats.levels': '6', 'stats.levelsLabel': 'niveles CEFR',
    'niveles.badge': 'Elige tu nivel', 'niveles.title': 'Desde A1 hasta C2',
    'niveles.subtitle': 'Completa cada nivel para desbloquear el siguiente. Empieza por los números, saludos y el alfabeto hangul.',
    'filter.todos': 'Todos', 'filter.a1': 'A1 - Principiante', 'filter.a2': 'A2 - Elemental',
    'filter.b1': 'B1 - Intermedio', 'filter.b2': 'B2 - Intermedio Alto', 'filter.c1': 'C1 - Avanzado', 'filter.c2': 'C2 - Dominio',
    'tr.korean': 'Coreano', 'tr.roman': 'Romanización', 'tr.spanish': 'Español', 'tr.english': 'Inglés',
    'btn.markDone': 'Marcar como completada ✓', 'btn.next': 'Siguiente pregunta →', 'btn.restart': 'Intentar de nuevo',
    'btn.listen': 'Escuchar pronunciación', 'quiz.badge': 'Pon a prueba lo aprendido',
    'quiz.title': 'Quiz Interactivo', 'quiz.subtitle': 'Responde y descubre cuánto sabes de coreano.',
    'progreso.badge': 'Tu avance', 'progreso.title': 'Progreso de Aprendizaje',
    'progreso.subtitle': 'Lleva un registro de las lecciones que completaste.',
    'prog.completed': 'Completadas', 'prog.total': 'Totales', 'prog.pct': 'Avance',
    'footer.desc': 'Hecho con ❤️ para aprender coreano desde cero en español, inglés y coreano.',
    'lock.level': 'Nivel bloqueado', 'lock.complete_prev': 'Completa el nivel anterior para desbloquear este.',
    'unlock': '¡Nivel desbloqueado! 🔓', 'hangul': 'Alfabeto Hangul', 'numeros': 'Números'
  },
  en: {
    'nav.inicio': 'Home', 'nav.niveles': 'Levels', 'nav.quiz': 'Quiz', 'nav.progreso': 'Progress',
    'hero.badge': 'Learn Korean from zero', 'hero.title': 'Korean A1 to C2',
    'hero.subtitle': 'Learn step by step: numbers, greetings, hangul and grammar. Translations in Spanish, English and Korean.',
    'hero.start': 'Start now', 'hero.quiz': 'Take a quiz',
    'stats.lessons': '60+', 'stats.lessonsLabel': 'lessons', 'stats.languages': '3', 'stats.languagesLabel': 'languages',
    'stats.levels': '6', 'stats.levelsLabel': 'CEFR levels',
    'niveles.badge': 'Choose your level', 'niveles.title': 'From A1 to C2',
    'niveles.subtitle': 'Complete each level to unlock the next. Start with numbers, greetings and the hangul alphabet.',
    'filter.todos': 'All', 'filter.a1': 'A1 - Beginner', 'filter.a2': 'A2 - Elementary',
    'filter.b1': 'B1 - Intermediate', 'filter.b2': 'B2 - Upper-Intermediate', 'filter.c1': 'C1 - Advanced', 'filter.c2': 'C2 - Mastery',
    'tr.korean': 'Korean', 'tr.roman': 'Romanization', 'tr.spanish': 'Spanish', 'tr.english': 'English',
    'btn.markDone': 'Mark as completed ✓', 'btn.next': 'Next question →', 'btn.restart': 'Try again',
    'btn.listen': 'Listen to pronunciation', 'quiz.badge': 'Test what you learned',
    'quiz.title': 'Interactive Quiz', 'quiz.subtitle': 'Answer and find out how much you know about Korean.',
    'progreso.badge': 'Your progress', 'progreso.title': 'Learning Progress',
    'progreso.subtitle': 'Keep track of the lessons you completed.',
    'prog.completed': 'Completed', 'prog.total': 'Total', 'prog.pct': 'Progress',
    'footer.desc': 'Made with ❤️ to learn Korean from scratch in Spanish, English and Korean.',
    'lock.level': 'Level locked', 'lock.complete_prev': 'Complete the previous level to unlock this one.',
    'unlock': 'Level unlocked! 🔓', 'hangul': 'Hangul Alphabet', 'numeros': 'Numbers'
  },
  ko: {
    'nav.inicio': '홈', 'nav.niveles': '레벨', 'nav.quiz': '퀴즈', 'nav.progreso': '진도',
    'hero.badge': '기초부터 한국어 배우기', 'hero.title': '한국어 A1부터 C2까지',
    'hero.subtitle': '단계별로 배우기: 숫자, 인사말, 한글 및 문법. 스페인어, 영어, 한국어로 번역됨.',
    'hero.start': '지금 시작하기', 'hero.quiz': '퀴즈 풀기',
    'stats.lessons': '60+', 'stats.lessonsLabel': '레슨', 'stats.languages': '3', 'stats.languagesLabel': '언어',
    'stats.levels': '6', 'stats.levelsLabel': 'CEFR 레벨',
    'niveles.badge': '레벨 선택', 'niveles.title': 'A1부터 C2까지',
    'niveles.subtitle': '각 레벨을 완료하면 다음 레벨이 잠금 해제됩니다. 숫자, 인사말 및 한글 알파벳부터 시작하세요.',
    'filter.todos': '전체', 'filter.a1': 'A1 - 초급', 'filter.a2': 'A2 - 초급 고급',
    'filter.b1': 'B1 - 중급', 'filter.b2': 'B2 - 중급 고급', 'filter.c1': 'C1 - 고급', 'filter.c2': 'C2 - 숙달',
    'tr.korean': '한국어', 'tr.roman': '로마자', 'tr.spanish': '스페인어', 'tr.english': '영어',
    'btn.markDone': '완료로 표시 ✓', 'btn.next': '다음 질문 →', 'btn.restart': '다시 하기',
    'btn.listen': '발음 듣기', 'quiz.badge': '배운 내용 테스트하기',
    'quiz.title': '대화형 퀴즈', 'quiz.subtitle': '답변하고 한국어를 얼마나 아는지 확인하세요.',
    'progreso.badge': '내 진도', 'progreso.title': '학습 진도',
    'progreso.subtitle': '완료한 레슨을 기록하세요.',
    'prog.completed': '완료', 'prog.total': '전체', 'prog.pct': '진도',
    'footer.desc': '스페인어, 영어, 한국어로 기초부터 한국어를 배우는 데 ❤️를 담았습니다.',
    'lock.level': '레벨 잠금', 'lock.complete_prev': '이전 레벨을 완료해야 이 레벨의 잠금을 해제할 수 있습니다.',
    'unlock': '레벨 잠금 해제! 🔓', 'hangul': '한글 알파벳', 'numeros': '숫자'
  }
};

const LEVELS = {
  a1:   { labelES: 'A1 - Principiante', labelEN: 'A1 - Beginner',   labelKO: 'A1 - 초급',   color: '#8b5cf6', order: 1, unlockAfter: null },
  a2:   { labelES: 'A2 - Elemental',    labelEN: 'A2 - Elementary', labelKO: 'A2 - 초급 고급', color: '#6366f1', order: 2, unlockAfter: 'a1' },
  b1:   { labelES: 'B1 - Intermedio',   labelEN: 'B1 - Intermediate', labelKO: 'B1 - 중급',   color: '#22d3ee', order: 3, unlockAfter: 'a2' },
  b2:   { labelES: 'B2 - Intermedio Alto', labelEN: 'B2 - Upper-Intermediate', labelKO: 'B2 - 중급 고급', color: '#06b6d4', order: 4, unlockAfter: 'b1' },
  c1:   { labelES: 'C1 - Avanzado',     labelEN: 'C1 - Advanced',   labelKO: 'C1 - 고급',     color: '#22c55e', order: 5, unlockAfter: 'b2' },
  c2:   { labelES: 'C2 - Dominio',      labelEN: 'C2 - Mastery',    labelKO: 'C2 - 숙달',     color: '#f43f5e', order: 6, unlockAfter: 'c1' }
};

const LESSONS = [
  // ================= A1 =================
  { id: 1, level: 'a1', category: 'Números', title: '하나 / 둘 / 셋', roman: 'Hana / Dul / Set', es: 'Uno / Dos / Tres', en: 'One / Two / Three', ko: '하나 / 둘 / 셋', notes: 'Sistema nativo coreano. Se usa para contar objetos, edad y horas.', audio: 'hana_dul_set' },
  { id: 2, level: 'a1', category: 'Números', title: '일 / 이 / 삼', roman: 'Il / I / Sam', es: 'Uno / Dos / Tres (sino-coreano)', en: 'One / Two / Three (Sino-Korean)', ko: '일 / 이 / 삼', notes: 'Sistema sino-coreano. Se usa para dinero, fechas, minutos y teléfonos.', audio: 'il_i_sam' },
  { id: 3, level: 'a1', category: 'Saludos', title: '안녕하세요', roman: 'Annyeonghaseyo', es: 'Hola / Buenos días', en: 'Hello / Good morning', ko: '안녕하세요', notes: 'Saludo estándar y educado para cualquier momento del día.', audio: 'annyeonghaseyo' },
  { id: 4, level: 'a1', category: 'Saludos', title: '안녕히 가세요 / 안녕히 계세요', roman: 'Annyeonghi gaseyo / Annyeonghi gyeseyo', es: 'Adiós (al que se va / al que se queda)', en: 'Goodbye (leaving / staying)', ko: '안녕히 가세요 / 안녕히 계세요', notes: '가세요 para quien se va. 계세요 para quien se queda.', audio: 'annyeonghi' },
  { id: 5, level: 'a1', category: 'Cortesía', title: '감사합니다', roman: 'Gamsahamnida', es: 'Gracias', en: 'Thank you', ko: '감사합니다', notes: 'Forma formal de agradecer. Muy usada en tiendas y restaurantes.', audio: 'gamsahamnida' },
  { id: 6, level: 'a1', category: 'Cortesía', title: '천만에요', roman: 'Cheonmaneyo', es: 'De nada', en: "You're welcome", ko: '천만에요', notes: 'Respuesta a "gracias".', audio: 'cheonmaneyo' },
  { id: 7, level: 'a1', category: 'Hangul', title: '모음: ㅏ / ㅓ / ㅗ / ㅜ', roman: 'a / eo / o / u', es: 'Vocales hangul básicas', en: 'Basic Hangul vowels', ko: 'ㅏ / ㅓ / ㅗ / ㅜ', notes: 'Las primeras vocales del alfabeto coreano. Aprendelas para leer y escribir.', audio: 'hangul_vowels' },
  { id: 8, level: 'a1', category: 'Hangul', title: 'Consonantes: ㄱ / ㄴ / ㄷ / ㄹ', roman: 'g / n / d / r', es: 'Consonantes hangul básicas', en: 'Basic Hangul consonants', ko: 'ㄱ / ㄴ / ㄷ / ㄹ', notes: 'Las primeras consonantes del alfabeto coreano.', audio: 'hangul_consonants' },
  { id: 9, level: 'a1', category: 'Presentaciones', title: '만나서 반가워요', roman: 'Mannaseo bangawoyo', es: 'Mucho gusto', en: 'Nice to meet you', ko: '만나서 반가워요', notes: 'Se dice al conocer a alguien por primera vez.', audio: 'mannaseo' },
  { id: 10, level: 'a1', category: 'Presentaciones', title: '이름이 뭐예요?', roman: 'Ireuni mwoyeyo?', es: '¿Cómo te llamas?', en: "What's your name?", ko: '이름이 뭐예요?', notes: '이름 = nombre. 뭐예요 = ¿qué es?.', audio: 'ireuni_mwoyeyo' },
  { id: 11, level: 'a1', category: 'Presentaciones', title: '제 이름은 ... 입니다', roman: 'Je ireumeun ... imnida', es: 'Me llamo ...', en: 'My name is ...', ko: '제 이름은 ... 입니다', notes: 'Estructura A는 B입니다 = A es B.', audio: 'je_ireumeun' },
  { id: 12, level: 'a1', category: 'Básico', title: '네 / 아니요', roman: 'Ne / Aniyo', es: 'Sí / No', en: 'Yes / No', ko: '네 / 아니요', notes: '네 = sí. 아니요 = no.', audio: 'ne_aniyo' },
  { id: 13, level: 'a1', category: 'Lugares', title: '여기 / 거기', roman: 'Yeogi / Geogi', es: 'Aquí / Allí', en: 'Here / There', ko: '여기 / 거기', notes: '여기 = cerca del hablante. 거기 = cerca del oyente.', audio: 'yeogi_geogi' },
  { id: 14, level: 'a1', category: 'Demostrativos', title: '이거 / 저거', roman: 'Igeo / Jeogeo', es: 'Esto / Eso', en: 'This / That', ko: '이거 / 저거', notes: '이거 = cosa cercana. 저거 = cosa lejana.', audio: 'igeo_jeogeo' },
  { id: 15, level: 'a1', category: 'Viaje', title: '화장실 어디예요?', roman: 'Hwajangsil eodieyo?', es: '¿Dónde está el baño?', en: "Where's the bathroom?", ko: '화장실 어디예요?', notes: 'Frase clave para viajar.', audio: 'hwajangsil_eodieyo' },

  // ================= A2 =================
  { id: 16, level: 'a2', category: 'Gramática', title: '-아요 / -어요', roman: '-ayo / -eoyo', es: 'Presente informal cortés', en: 'Present informal polite', ko: '-아요 / -어요', notes: 'Terminación para el presente en estilo haeyo-che.', audio: 'ayo_eoyo' },
  { id: 17, level: 'a2', category: 'Partículas', title: '은 / 는', roman: 'eun / neun', es: 'Partícula tema', en: 'Topic particle', ko: '은 / 는', notes: '은 tras consonante, 는 tras vocal.', audio: 'eun_neun' },
  { id: 18, level: 'a2', category: 'Partículas', title: '이 / 가', roman: 'i / ga', es: 'Partícula sujeto', en: 'Subject particle', ko: '이 / 가', notes: '이 tras consonante, 가 tras vocal.', audio: 'i_ga' },
  { id: 19, level: 'a2', category: 'Partículas', title: '을 / 를', roman: 'eul / reul', es: 'Objeto directo', en: 'Object particle', ko: '을 / 를', notes: '을 tras consonante, 를 tras vocal.', audio: 'eul_reul' },
  { id: 20, level: 'a2', category: 'Lugares', title: '에 / 에서', roman: 'e / eseo', es: 'En / en (lugar de acción)', en: 'At / in (place of action)', ko: '에 / 에서', notes: '에 = ubicación. 에서 = lugar de acción.', audio: 'e_eseo' },
  { id: 21, level: 'a2', category: 'Tiempos', title: '-았 / -었', roman: '-at / -eot', es: 'Pretérito pasado', en: 'Past tense', ko: '-았 / -었', notes: 'Vocales positivas llevan -았, el resto -었.', audio: 'at_eot' },
  { id: 22, level: 'a2', category: 'Tiempos', title: '-ㄹ / -을 거예요', roman: '-l / -eul geoyeyo', es: 'Futuro', en: 'Future', ko: '-ㄹ / -을 거예요', notes: 'Expresa futuro o intención.', audio: 'l_geoyeyo' },
  { id: 23, level: 'a2', category: 'Capacidad', title: '-ㄹ / -을 수 있다', roman: '-l / -eul su itda', es: 'Poder / saber hacer', en: 'Can / be able to', ko: '-ㄹ / -을 수 있다', notes: 'Expresa capacidad o posibilidad.', audio: 'su_itda' },
  { id: 24, level: 'a2', category: 'Deseo', title: '-고 싶다', roman: '-go sipda', es: 'Querer', en: 'Want to', ko: '-고 싶다', notes: 'Expresa deseo: quiero hacer algo.', audio: 'go_sipda' },
  { id: 25, level: 'a2', category: 'Comida', title: '맛있어요', roman: 'Mannisseoyo', es: 'Está delicioso', en: 'It is delicious', ko: '맛있어요', notes: 'Para elogiar la comida.', audio: 'mannisseoyo' },
  { id: 26, level: 'a2', category: 'Compras', title: '이것 주세요', roman: 'Igeot juseyo', es: 'Esto, por favor', en: 'This one, please', ko: '이것 주세요', notes: 'Frase clave para comprar.', audio: 'igeot_juseyo' },

  // ================= B1 =================
  { id: 27, level: 'b1', category: 'Conectores', title: '-니까 / 그러니까', roman: '-nikka / geureonikka', es: 'Porque', en: 'Because / so', ko: '-니까 / 그러니까', notes: 'Expresa causa o razón.', audio: 'nikka_geureonikka' },
  { id: 28, level: 'b1', category: 'Condicional', title: '-(으)면', roman: '-(eu)myeon', es: 'Si', en: 'If / when', ko: '-(으)면', notes: 'Condicional.', audio: 'eumyeon' },
  { id: 29, level: 'b1', category: 'Intención', title: '-(으)려고 하다', roman: '-(eu)ryeogo hada', es: 'Intención de', en: 'Intend to / plan to', ko: '-(으)려고 하다', notes: 'Expresa intención o plan futuro cercano.', audio: 'ryeogo_hada' },
  { id: 30, level: 'b1', category: 'Información indirecta', title: '-다고 하다', roman: '-dago hada', es: 'Se dice que', en: 'It is said that', ko: '-다고 하다', notes: 'Reporta lo que alguien dijo.', audio: 'dago_hada' },
  { id: 31, level: 'b1', category: 'Comparativos', title: '보다 / 더', roman: 'boda / deo', es: 'Más que / más', en: 'More than / more', ko: '보다 / 더', notes: '보다 = que. 더 = más.', audio: 'boda_deo' },
  { id: 32, level: 'b1', category: 'Superlativos', title: '제일 / 가장', roman: 'jeil / gajang', es: 'El más', en: 'The most', ko: '제일 / 가장', notes: 'Significan "el más".', audio: 'jeil_gajang' },
  { id: 33, level: 'b1', category: 'Experiencia', title: '-어 본 적이 있다', roman: '-eo bon jeogi itda', es: 'He hecho algo antes', en: 'Have done before', ko: '-어 본 적이 있다', notes: 'Expresa experiencia de vida.', audio: 'eo_bon_jeogi' },
  { id: 34, level: 'b1', category: 'Obligación', title: '-야 하다 / -어야 하다', roman: '-ya hada / -eoya hada', es: 'Tener que / deber', en: 'Have to / must', ko: '-야 하다 / -어야 하다', notes: 'Expresa obligación.', audio: 'ya_hada' },

  // ================= B2 =================
  { id: 35, level: 'b2', category: 'Honoríficos', title: '-시-', roman: '-si-', es: 'Honorífico (sujeto)', en: 'Honorific subject', ko: '-시-', notes: 'Respeto hacia el sujeto.', audio: 'si_honorific' },
  { id: 36, level: 'b2', category: 'Voz pasiva', title: '-이 / -히 / -리 / -기', roman: '-i / -hi / -ri / -gi', es: 'Pasivo', en: 'Passive voice', ko: '-이 / -히 / -리 / -기', notes: 'Transforma activo en pasivo.', audio: 'passive_voice' },
  { id: 37, level: 'b2', category: 'Causativo', title: '-이 / -히 / -리 / -기 (causativo)', roman: '-i / -hi / -ri / -gi', es: 'Causativo', en: 'Causative', ko: '-이 / -히 / -리 / -기', notes: 'Alguien hace que otro realice una acción.', audio: 'causative' },
  { id: 38, level: 'b2', category: 'Conectores', title: '-고 / -아서 / -여서', roman: '-go / -aseo / -yeoseo', es: 'Y / así que', en: 'And / so', ko: '-고 / -아서 / -여서', notes: 'Conecta acciones.', audio: 'go_aseo_yeoseo' },
  { id: 39, level: 'b2', category: 'Condicional', title: '-(으)면', roman: '-(eu)myeon', es: 'Si / cuando', en: 'If / when', ko: '-(으)면', notes: 'Condicional avanzado.', audio: 'eumyeon_b2' },
  { id: 40, level: 'b2', category: 'Negativo', title: '-지 않다 / -지 못하다', roman: '-ji anta / -ji mothada', es: 'No hacer / no poder', en: 'Not do / cannot do', ko: '-지 않다 / -지 못하다', notes: 'Negación e imposibilidad.', audio: 'ji_anta_mothada' },
  { id: 41, level: 'b2', category: 'Concesión', title: '-지만', roman: '-jiman', es: 'Pero', en: 'But / however', ko: '-지만', notes: 'Ideas contrapuestas.', audio: 'jiman' },

  // ================= C1 =================
  { id: 42, level: 'c1', category: 'Refranes', title: '속담: 고양이 앞에 생선을 두지 마라', roman: 'Goyangi ape saengsoneul duji mara', es: 'No pongas el pescado delante del gato', en: "Don't put the fish in front of the cat", ko: '고양이 앞에 생선을 두지 마라', notes: 'No tentar a alguien con algo que desea.', audio: 'proverb_cat' },
  { id: 43, level: 'c1', category: 'Noticias', title: '제목 기사 스타일', roman: 'Jemok 기사 style', es: 'Estilo de titular', en: 'News headline style', ko: '제목 기사 스타일', notes: 'Coreano de periódicos.', audio: 'news_style' },
  { id: 44, level: 'c1', category: 'Negocios', title: '존댓말 비즈니스', roman: 'Jonetmal business', es: 'Lenguaje de negocios', en: 'Polite business language', ko: '존댓말 비즈니스', notes: 'Honoríficos en entorno corporativo.', audio: 'jonetmal_biz' },
  { id: 45, level: 'c1', category: 'TOPIK', title: 'TOPIK II lectura', roman: 'TOPIK II 독해', es: 'Comprensión lectora avanzada', en: 'Advanced reading', ko: 'TOPIK II 독해', notes: 'Preparación TOPIK II.', audio: 'topik2_reading' },
  { id: 46, level: 'c1', category: 'Expresiones', title: '눈치가 빠르다', roman: 'Nunchiga ppareuda', es: 'Ser perspicaz', en: 'To be perceptive', ko: '눈치가 빠르다', notes: 'Leer el ambiente.', audio: 'nunchi_ppareuda' },
  { id: 47, level: 'c1', category: 'Gramática', title: '-는 대로', roman: '-neun daero', es: 'Tal como', en: 'Just as', ko: '-는 대로', notes: 'Tal como ocurre otra acción.', audio: 'neun_daero' },

  // ================= C2 =================
  { id: 48, level: 'c2', category: 'Literatura', title: '문학적 표현', roman: 'Munhakjeok pyohyeon', es: 'Expresión literaria', en: 'Literary expression', ko: '문학적 표현', notes: 'Lenguaje poético.', audio: 'literary_expr' },
  { id: 49, level: 'c2', category: 'Academia', title: '학술적 논증', roman: 'Hakjujeok nonjeung', es: 'Argumentación académica', en: 'Academic argumentation', ko: '학술적 논증', notes: 'Ensayos y tesis.', audio: 'academic_arg' },
  { id: 50, level: 'c2', category: 'Negocios', title: '공식 제안서', roman: 'Gongsik japseoseo', es: 'Propuesta comercial formal', en: 'Formal business proposal', ko: '공식 제안서', notes: 'Documentos formales.', audio: 'formal_proposal' },
  { id: 51, level: 'c2', category: 'Medios', title: '방송 뉴스 언어', roman: 'Bangsong nyuseu eo', es: 'Lenguaje de noticias TV', en: 'Broadcast news language', ko: '방송 뉴스 언어', notes: 'Noticias televisadas.', audio: 'broadcast_news' },
  { id: 60, level: 'c2', category: 'Dominio', title: '고급 회화 표현', roman: 'Gogeup hoehwa pyohyeon', es: 'Conversación avanzada', en: 'Advanced conversation', ko: '고급 회화 표현', notes: 'Hablar como nativo.', audio: 'advanced_conv' }
];

const QUIZ = [
  { q: { es: '¿Cómo se dice "Gracias" en coreano?', en: 'How do you say "Thank you" in Korean?', ko: '"감사합니다"는 한국어로 무엇인가요?' }, options: ['감사합니다', '안녕하세요', '안녕히 가세요', '만나서 반가워요'], answer: 0, level: 'a1' },
  { q: { es: '¿Qué significa "안녕하세요"?', en: 'What does "안녕하세요" mean?', ko: '"안녕하세요"는 무슨 뜻인가요?' }, options: ['Hola / Buenos días', 'Gracias', 'Adiós', 'Sí'], answer: 0, level: 'a1' },
  { q: { es: '¿Cuál es la partícula tema después de vocal?', en: 'Which topic particle follows a vowel?', ko: '모음 뒤에 오는 주제 조사는 무엇인가요?' }, options: ['은', '는', '이', '가'], answer: 1, level: 'a2' },
  { q: { es: '¿Cómo se dice "Mi nombre es ..." en coreano?', en: 'How do you say "My name is ..." in Korean?', ko: '"제 이름은 ... 입니다"는 무슨 뜻인가요?' }, options: ['제 이름은 ... 입니다', '이름이 뭐예요?', '감사합니다', '화장실 어디예요?'], answer: 0, level: 'a1' },
  { q: { es: '¿Qué expresa "-고 싶다"?', en: 'What does "-고 싶다" express?', ko: '"-고 싶다"는 무엇을 나타내나요?' }, options: ['Deseo / Querer', 'Pasado', 'Futuro', 'Pregunta'], answer: 0, level: 'a2' },
  { q: { es: '¿Cuál es el honorífico de sujeto en coreano?', en: 'Which is the Korean subject honorific?', ko: '주체 높임 표현은 무엇인가요?' }, options: ['-시-', '-고 싶다', '-았 / -었', '-ㄹ 거예요'], answer: 0, level: 'b2' },
  { q: { es: '¿Qué significa "눈치가 빠르다"?', en: 'What does "눈치가 빠르다" mean?', ko: '"눈치가 빠르다"는 무슨 뜻인가요?' }, options: ['Ser perspicaz / leer el ambiente', 'Correr rápido', 'Comer pescado', 'Dormir bien'], answer: 0, level: 'c1' }
];

