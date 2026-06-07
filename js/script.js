//  MODO CLARO / ESCURO
 
const btnTema = document.createElement('button');
btnTema.id = 'btnTema';
btnTema.setAttribute('aria-label', 'Alternar tema');
btnTema.innerHTML = '🌙';
 
const navbar = document.querySelector('.navbar .container-fluid');
navbar.appendChild(btnTema);
 
const temaSalvo = localStorage.getItem('tema');
if (temaSalvo === 'escuro') {
  document.body.classList.add('dark-mode');
  btnTema.innerHTML = '☀️';
}
 
btnTema.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
 
  const modoEscuroAtivo = document.body.classList.contains('dark-mode');
  btnTema.innerHTML = modoEscuroAtivo ? '☀️' : '🌙';
  localStorage.setItem('tema', modoEscuroAtivo ? 'escuro' : 'claro');
});
 
//  ANIMAÇÃO AO SCROLL  (Intersection Observer)
 
const seletoresAnimados = [
  '.introdução p',
  '.TextoOrigem p',
  '.Origem img',
  '.curiosidades ul li',
  '.Tabela table',
  '.Tabela img',
  'h3',
  '.HistMoq p',
  '#Contatos',
  'video',
  '.ratio',
];
 
seletoresAnimados.forEach(seletor => {
  document.querySelectorAll(seletor).forEach((el, i) => {
    el.classList.add('anim-scroll');
 
    if (el.closest('.curiosidades')) {
      el.style.transitionDelay = `${i * 80}ms`;
    }
  });
});
 
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('anim-visivel');
      observer.unobserve(entry.target); 
    }
  });
}, {
  threshold: 0.15,
});
 
document.querySelectorAll('.anim-scroll').forEach(el => observer.observe(el));

//  ESTILOS INJETADOS DINAMICAMENTE
 
const estilos = document.createElement('style');
estilos.textContent = `
 
  /* ---- Botão de tema ---- */
  #btnTema {
    background: none;
    border: 2px solid rgba(0,0,0,0.2);
    border-radius: 50px;
    padding: 4px 12px;
    font-size: 20px;
    cursor: pointer;
    margin-left: auto;
    transition: transform 0.3s ease, border-color 0.3s ease;
    line-height: 1.4;
  }
 
  #btnTema:hover {
    transform: scale(1.15) rotate(15deg);
    border-color: rgba(0,0,0,0.4);
  }
 
  /* ---- Modo Escuro ---- */
  body.dark-mode {
    background-color: #121212 !important;
    color: #e0e0e0 !important;
  }
 
  body.dark-mode nav {
    background: linear-gradient(#1a1a2e, #121212) !important;
  }
 
  body.dark-mode nav ul li a {
    color: #e0e0e0 !important;
    -webkit-text-stroke: #e0e0e0 !important;
  }
 
  body.dark-mode .introdução p,
  body.dark-mode .TextoOrigem p {
    color: #e0e0e0 !important;
  }
 
  body.dark-mode .curiosidades ul li {
    background-color: #1e1e2e !important;
    color: #e0e0e0 !important;
  }
 
  body.dark-mode .Tabela table,
  body.dark-mode .table {
    color: #e0e0e0 !important;
  }
 
  body.dark-mode .table thead th {
    background-color: #1e1e2e !important;
    color: #e0e0e0 !important;
  }
 
  body.dark-mode .table tbody tr {
    background-color: #181818 !important;
  }
 
  body.dark-mode .table-hover tbody tr:hover {
    background-color: #2a2a3e !important;
  }
 
  body.dark-mode #Contatos {
    background-color: #1e1e2e !important;
    color: #e0e0e0 !important;
  }
 
  body.dark-mode #Contatos label,
  body.dark-mode #Contatos h2 {
    color: #e0e0e0 !important;
  }
 
  body.dark-mode #Contatos .form-control {
    background-color: #2a2a3a !important;
    color: #e0e0e0 !important;
    border-color: #444 !important;
  }
 
  body.dark-mode footer {
    background: linear-gradient(#121212, #1a1a2e) !important;
    color: #e0e0e0 !important;
  }
 
  body.dark-mode h3 {
    color: #e0e0e0 !important;
  }
 
  body.dark-mode #btnTema {
    border-color: rgba(255,255,255,0.3);
  }
 
  body.dark-mode #btnTema:hover {
    border-color: rgba(255,255,255,0.6);
  }
 
  /* ---- Animação ao scroll ---- */
  .anim-scroll {
    opacity: 0;
    transform: translateY(40px);
    transition: opacity 0.7s ease, transform 0.7s ease;
  }
 
  .anim-visivel {
    opacity: 1 !important;
    transform: translateY(0) !important;
  }
`;
 
document.head.appendChild(estilos);
