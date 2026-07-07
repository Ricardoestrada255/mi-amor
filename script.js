(() => {
  const $ = (id) => document.getElementById(id);

  // Validaciones del login
  const VALID_USERNAME = 'Sinay';
  const VALID_PASSWORD = '12052009';

  const pageLogin = $('page-login');
  const pagePoems = $('page-poems');

  const loginForm = $('loginForm');
  const usernameInput = $('username');
  const passwordInput = $('password');
  const loginError = $('loginError');
  const loginBtn = $('loginBtn');

  const toast = $('toast');

  // Poemas
  const poemText = $('poemText');
  const poemBy = $('poemBy');
  const prevBtn = $('prevBtn');
  const nextBtn = $('nextBtn');

  const SURPRISE_MSG = 'Eres mi todo 💞';

  const POEMS = [
    {
      kicker: '🌹✨💌💞',
      text: 'Contigo el tiempo sonríe,\nmi corazón late más lento…\npero ama con más fuerza.',
      by: '— para Sinay'
    },
    {
      kicker: '💞',
      text: 'Si una estrella pudiera hablar,\nle diría a la luna: \n“ella es mi lugar favorito”.',
      by: '— con amor'
    },
    {
      kicker: '✨',
      text: 'Un mes contigo y ya entiendo\nque el hogar no es un sitio:\nson tus abrazos.',
      by: '— siempre'
    },
    {
      kicker: '🌹',
      text: 'Eres la calma que me encuentra,\nel motivo de mis sonrisas\ny el “para siempre” en mi pecho.',
      by: '— tu persona'
    }
  ];

  let currentIndex = 0;

  function setToast(message) {
    toast.textContent = message;
    toast.classList.add('toast--show');
    clearTimeout(setToast._t);
    setToast._t = setTimeout(() => toast.classList.remove('toast--show'), 2600);
  }

  function showPage(page) {
    const isLogin = page === 'login';
    pageLogin.hidden = !isLogin;
    pagePoems.hidden = isLogin;
  }

  function normalizeUser(v) {
    return (v || '').trim();
  }

  function normalizePass(v) {
    return (v || '').replace(/\s+/g, '').trim();
  }

  function validateLogin() {
    const u = normalizeUser(usernameInput.value);
    const p = normalizePass(passwordInput.value);

    const okUser = u.toLowerCase() === VALID_USERNAME.toLowerCase();
    const okPass = p === VALID_PASSWORD;

    if (!okUser) {
      loginError.textContent = 'Usuario incorrecto. Debe ser: Sinay 💖';
      return false;
    }

    if (!okPass) {
      loginError.textContent = 'Contraseña incorrecta. Debe ser: 12052009 📅';
      return false;
    }

    return true;
  }

  function openDoorAnimation() {
    loginBtn.classList.add('btn--success');
    setTimeout(() => loginBtn.classList.remove('btn--success'), 950);
  }

  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    loginError.textContent = '';

    if (!validateLogin()) return;

    openDoorAnimation();
    setTimeout(() => {
      showPage('poems');
      renderPoem(0);
      // contador está fijo en el HTML como “1 mes juntos”, pero podemos mantenerlo por si se quiere cambiar
    }, 300);
  });

  // Página Poemas
  $('logoutBtn').addEventListener('click', () => {
    loginError.textContent = '';
    usernameInput.value = '';
    passwordInput.value = '';
    showPage('login');
  });

  function renderPoem(index) {
    currentIndex = (index + POEMS.length) % POEMS.length;
    const item = POEMS[currentIndex];
    $('poemKicker').textContent = item.kicker;
    poemText.innerHTML = item.text.replace(/\n/g, '<br/>');
    poemBy.textContent = item.by;

    // efecto sutil de “late”
    const card = $('poemCard');
    card.style.transform = 'scale(1.005)';
    card.style.transition = 'transform .25s ease';
    setTimeout(() => (card.style.transform = 'scale(1)'), 250);
  }

  prevBtn.addEventListener('click', () => renderPoem(currentIndex - 1));
  nextBtn.addEventListener('click', () => renderPoem(currentIndex + 1));

  // Botón sorpresa en ambas pantallas
  $('surpriseBtn').addEventListener('click', () => setToast(SURPRISE_MSG));
  $('surpriseBtn2').addEventListener('click', () => setToast(SURPRISE_MSG));

  // Decoración: corazones flotando y estrellas brillando
  function rand(min, max) {
    return Math.random() * (max - min) + min;
  }

  const heartsWrap = $('hearts');
  const sparklesWrap = $('sparkles');

  function createHearts(count = 18) {
    const frag = document.createDocumentFragment();
    for (let i = 0; i < count; i++) {
      const el = document.createElement('div');
      el.className = 'heart';
      el.textContent = ['❤️', '🩷', '💗', '💕'][Math.floor(Math.random() * 4)];

      const dur = rand(5, 10).toFixed(2) + 's';
      const size = rand(14, 26);
      const left = rand(5, 95).toFixed(2) + '%';

      el.style.setProperty('--dur', dur);
      el.style.left = left;
      el.style.fontSize = size + 'px';

      // retraso aleatorio
      el.style.animationDelay = (-rand(0, 10)).toFixed(2) + 's';
      el.style.setProperty('--x', left);
      frag.appendChild(el);
    }
    heartsWrap.appendChild(frag);
  }

  function createSparkles(count = 20) {
    const frag = document.createDocumentFragment();
    for (let i = 0; i < count; i++) {
      const el = document.createElement('div');
      el.className = 'sparkle';
      el.textContent = ['✨', '✦', '⭐', '✧'][Math.floor(Math.random() * 4)];

      const dur = rand(2.6, 5.5).toFixed(2) + 's';
      const left = rand(5, 95).toFixed(2) + '%';
      const top = rand(10, 85).toFixed(2) + '%';

      el.style.setProperty('--dur', dur);
      el.style.setProperty('--x', left);
      el.style.setProperty('--y', top);
      el.style.left = left;
      el.style.top = top;

      el.style.animationDelay = (-rand(0, 6)).toFixed(2) + 's';
      frag.appendChild(el);
    }
    sparklesWrap.appendChild(frag);
  }

  createHearts(22);
  createSparkles(26);

  // Inicial
  renderPoem(0);
})();

