// =============================================
//  ROYAL MUSIC — script.js
//  1. Menu hambúrguer
//  2. Modo escuro / claro
//  3. Animações ao scroll (Intersection Observer)
// =============================================


/* ── 1. MENU HAMBÚRGUER ─────────────────────── */
const hamburger = document.getElementById('hamburger');
const navMenu   = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});


/* ── 2. MODO ESCURO / CLARO ─────────────────── */

// Cria o botão dinamicamente e injeta na navbar
const themeBtn = document.createElement('button');
themeBtn.id = 'theme-toggle';
themeBtn.setAttribute('aria-label', 'Alternar modo escuro/claro');
themeBtn.innerHTML = '🌙';          // ícone inicial (modo claro → botão mostra lua)
document.querySelector('.navbar-container').appendChild(themeBtn);

// Recupera preferência salva (ou preferência do sistema)
const savedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    document.body.classList.add('dark-mode');
    themeBtn.innerHTML = '☀️';
}

// Alterna ao clicar
themeBtn.addEventListener('click', () => {
    const isDark = document.body.classList.toggle('dark-mode');
    themeBtn.innerHTML  = isDark ? '☀️' : '🌙';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
});


/* ── 3. ANIMAÇÕES AO SCROLL ─────────────────── */

// Elementos que vão animar ao entrar na tela
const animatableSelectors = [
    'main h1',
    'main h2',
    'main p',
    'main img',
    'main ol',
    'main ol li',
    '.card-repertorio',
    '.video-responsivo',
    'table',
    '#contato h2',
    '.contato-form',
    'footer',
];

// Adiciona a classe base de animação em cada elemento
document.querySelectorAll(animatableSelectors.join(', ')).forEach((el, i) => {
    el.classList.add('scroll-hidden');
    // delay escalonado para listas (máx 0.5s)
    if (el.tagName === 'LI') {
        el.style.transitionDelay = `${Math.min(i * 0.08, 0.5)}s`;
    }
});

// Intersection Observer: dispara quando o elemento entra 15% na tela
const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('scroll-visible');
                observer.unobserve(entry.target); // anima só uma vez
            }
        });
    },
    { threshold: 0.15 }
);

document.querySelectorAll('.scroll-hidden').forEach(el => observer.observe(el));
