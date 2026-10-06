/* ================================================
   NOSTRA CONTABILIDADE — Curitiba
   Menu mobile, header ao rolar, animações de
   revelação, contadores e links de WhatsApp
   ================================================ */

// >>> TROQUE AQUI O NÚMERO DO WHATSAPP <<<
// Formato: código do país + DDD + número, só dígitos.
// Exemplo (41) 99999-0000 -> '5541999990000'
const WHATSAPP_NUMBER = '5541999990000';

const DEFAULT_MESSAGE =
  'Olá! Vim pelo site da Nostra Contabilidade e gostaria de um orçamento.';

const buildWhatsAppUrl = (message) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

/* ---------- Links de WhatsApp (botões + flutuante) ---------- */
document.querySelectorAll('.js-whatsapp').forEach((el) => {
  el.setAttribute('href', buildWhatsAppUrl(el.dataset.message || DEFAULT_MESSAGE));
  el.setAttribute('target', '_blank');
  el.setAttribute('rel', 'noopener');
});

/* ---------- Header com sombra ao rolar ---------- */
const header = document.getElementById('header');
const onScroll = () => {
  header.classList.toggle('scrolled', window.scrollY > 40);
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* ---------- Menu mobile ---------- */
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');

const closeMenu = () => {
  nav.classList.remove('open');
  hamburger.classList.remove('open');
  hamburger.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
};

hamburger.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', String(isOpen));
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

nav.querySelectorAll('.nav__link, .btn').forEach((link) => {
  link.addEventListener('click', closeMenu);
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && nav.classList.contains('open')) closeMenu();
});

/* ---------- Animação de revelação ao rolar ---------- */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

/* ---------- Acordeão de serviços ---------- */
document.querySelectorAll('.service').forEach((service) => {
  const head = service.querySelector('.service__head');
  head.addEventListener('click', () => {
    const isOpen = service.classList.contains('open');
    // fecha os demais para manter apenas um aberto por vez
    document.querySelectorAll('.service.open').forEach((other) => {
      other.classList.remove('open');
      other.querySelector('.service__head').setAttribute('aria-expanded', 'false');
    });
    if (!isOpen) {
      service.classList.add('open');
      head.setAttribute('aria-expanded', 'true');
    }
  });
});

/* ---------- Formulário -> WhatsApp ---------- */
const form = document.getElementById('form-whatsapp');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const nome = form.nome.value.trim();
  const assunto = form.assunto.value;
  const mensagem = form.mensagem.value.trim();

  const texto = [
    'Olá! Vim pelo site da Nostra Contabilidade.',
    nome && `Meu nome é ${nome}.`,
    `Tenho interesse em: ${assunto}.`,
    mensagem && `Detalhes: ${mensagem}`,
  ]
    .filter(Boolean)
    .join(' ');

  window.open(buildWhatsAppUrl(texto), '_blank', 'noopener');
});

/* ---------- Ano no rodapé ---------- */
document.getElementById('ano').textContent = new Date().getFullYear();
