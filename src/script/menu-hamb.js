document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector("nav");
  const navLinks = document.querySelectorAll("nav a");

  // Abre e fecha o menu ao clicar no botão hambúrguer
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("is-active");
    navMenu.classList.toggle("is-active");
  });

  // Fecha automaticamente o menu quando o usuário clicar em qualquer link (Scroll para a seção)
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("is-active");
      navMenu.classList.remove("is-active");
    });
  });
});
