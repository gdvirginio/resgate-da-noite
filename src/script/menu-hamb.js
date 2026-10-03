document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector("nav");
  const navLinks = document.querySelectorAll("nav a");

  if (!hamburger || !navMenu) return;

  // Abre e fecha o menu ao clicar no botão hambúrguer
  hamburger.addEventListener("click", () => {
    const isActive = hamburger.classList.toggle("is-active");
    navMenu.classList.toggle("is-active");
    hamburger.setAttribute("aria-expanded", isActive ? "true" : "false");
  });

  // Fecha automaticamente o menu quando o usuário clicar em qualquer link (Scroll para a seção)
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("is-active");
      navMenu.classList.remove("is-active");
      hamburger.setAttribute("aria-expanded", "false");
    });
  });
});
