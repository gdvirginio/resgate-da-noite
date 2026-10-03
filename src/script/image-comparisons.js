const slider = document.querySelector(".slider input");
const img2 = document.querySelector(".img-2");
const dragLine = document.querySelector(".drag-line");
const labelUrbano = document.querySelector(".img-1 .label");
const labelPreservado = document.querySelector(".img-2 .label");

const updateSlider = () => {
  const value = parseInt(slider.value);

  // 1. Move a linha e faz o recorte
  img2.style.clipPath = `inset(0 ${100 - value}% 0 0)`;
  dragLine.style.left = value + "%";

  // 2. Lógica para desaparecer o "Céu urbano" (img-1)
  // Começa a sumir após 80% do slider
  if (value > 80) {
    labelUrbano.style.opacity = (100 - value) / 20;
  } else {
    labelUrbano.style.opacity = "1";
  }

  // 3. Lógica para desaparecer o "Céu preservado" (img-2)
  // Começa a sumir antes de 20% do slider
  if (value < 20) {
    labelPreservado.style.opacity = value / 20;
  } else {
    labelPreservado.style.opacity = "1";
  }
};

// Listener para disparar a função no movimento
slider.addEventListener("input", updateSlider);

// Chamada inicial para garantir o estado correto ao carregar
updateSlider();
