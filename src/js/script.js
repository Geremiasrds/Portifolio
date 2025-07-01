const btnToggleMenu = document.getElementById('toggle-projetos');
const menuLateral = document.getElementById('menu-projetos');
const btnFecharMenu = document.getElementById('fechar-menu');
const titulosProjetos = document.querySelectorAll('.titulo-projeto');
const btnTema = document.getElementById('toggle-theme');
const body = document.body;
const formContato = document.getElementById('form-contato');
const respostaForm = document.getElementById('resposta-form');

const smoothTextUpdate = (element, message, color = '#00bfff') => {
  element.style.transition = 'opacity 0.3s ease-in-out';
  element.style.opacity = '0';
  setTimeout(() => {
    element.textContent = message;
    element.style.color = color;
    element.style.opacity = '1';
  }, 300);
};

// Menu lateral
btnToggleMenu.addEventListener('click', () => {
  menuLateral.classList.add('ativo');
  btnToggleMenu.classList.add('oculto');
});

btnFecharMenu.addEventListener('click', fecharMenu);

window.addEventListener('click', (e) => {
  if (
    menuLateral.classList.contains('ativo') &&
    !menuLateral.contains(e.target) &&
    e.target !== btnToggleMenu
  ) {
    fecharMenu();
  }
});

function fecharMenu() {
  menuLateral.classList.remove('ativo');
  btnToggleMenu.classList.remove('oculto');
}

// Toggle dos projetos
titulosProjetos.forEach((titulo) => {
  titulo.addEventListener('click', () => {
    const conteudo = titulo.nextElementSibling;
    const aberto = conteudo.classList.toggle('ativo');
    titulo.classList.toggle('aberto', aberto);
    conteudo.style.maxHeight = aberto ? conteudo.scrollHeight + 'px' : '0';
  });
});

// Tema escuro/claro (opcional)
btnTema?.addEventListener('click', () => {
  const modoClaroAtivo = body.classList.toggle('light-mode');
  localStorage.setItem('tema', modoClaroAtivo ? 'light' : 'dark');
  btnTema.textContent = modoClaroAtivo ? '☀️' : '🌙';
});

document.addEventListener('DOMContentLoaded', () => {
  const temaSalvo = localStorage.getItem('tema');
  if (temaSalvo === 'light') {
    body.classList.add('light-mode');
    if (btnTema) btnTema.textContent = '☀️';
  } else {
    if (btnTema) btnTema.textContent = '🌙';
  }
});
function abrirComLoading() {
  const loader = document.getElementById('loading-overlay');
  
  // Ativa o loading suavemente
  loader.classList.remove('escondido');
  setTimeout(() => {
    loader.classList.add('mostrar');
  }, 10); // delay mínimo para ativar transição

  // Redireciona após tempo definido
  setTimeout(() => {
    window.location.href = 'https://geremiasrds.github.io/jamile-orcamentos/';
  }, 2000);
}


// Formulário de contato
formContato?.addEventListener('submit', (e) => {
  e.preventDefault();
  const nome = formContato.nome.value.trim();
  const email = formContato.email.value.trim();
  const mensagem = formContato.mensagem.value.trim();

  if (!nome || !email || !mensagem) {
    smoothTextUpdate(respostaForm, 'Por favor, preencha todos os campos.', 'crimson');
    return;
  }

  smoothTextUpdate(respostaForm, 'Aguarde... ✉️');
  setTimeout(() => {
    smoothTextUpdate(respostaForm, `✨ Obrigado, ${nome}! Sua mensagem chegou com sucesso.`, '#00bfff');
    formContato.reset();
  }, 1600);
});
