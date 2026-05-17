// Removemos o DOMContentLoaded rígido e usamos uma checagem contínua para garantir que o ScrollReveal não quebre o binding
function inicializarAccordion() {

  const accordionContainer = document.querySelector(".accordion-container");

  if (!accordionContainer) {
    // Se a seção ainda não carregou por completo por causa do carregamento assíncrono dos scripts, tenta novamente em 100ms
    setTimeout(inicializarAccordion, 100);
    return;
  }

  // Remove qualquer listener antigo para evitar duplicação caso o script seja chamado mais de uma vez
  accordionContainer.removeEventListener("click", handleAccordionClick);
  accordionContainer.addEventListener("click", handleAccordionClick);
}

function handleAccordionClick(event) {
  // Captura o cabeçalho independentemente das camadas de efeito visual do ScrollReveal
  const clickedHeader = event.target.closest(".accordion-header");

  if (!clickedHeader) return;

  event.preventDefault();
  event.stopPropagation(); // Evita que a animação de scroll reveal intercepte o clique

  const currentItem = clickedHeader.closest(".accordion-item");
  const isOpen = currentItem.classList.contains("is-open");

  const accordionContainer = clickedHeader.closest(".accordion-container");
  const allItems = accordionContainer.querySelectorAll(".accordion-item");

  // Remove a classe de todos os itens
  allItems.forEach((item) => {
    item.classList.remove("is-open");
  });

  // Se não estava aberto, abre o atual
  if (!isOpen) {
    currentItem.classList.add("is-open");
  }
}

// Executa a inicialização imediatamente e também após o carregamento completo da janela
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", inicializarAccordion);
} else {
  inicializarAccordion();
}
window.addEventListener("load", inicializarAccordion);
