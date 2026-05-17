const slider = document.querySelector(".slider input");
const img = document.querySelector(".img-2");
const dragLine = document.querySelector(".drag-line");

const updateSlider = () => {
  const value = slider.value;

  img.style.clipPath = `inset(0 ${100 - value}% 0 0)`;
  dragLine.style.left = value + "%";
};

slider.addEventListener("input", updateSlider);
updateSlider();
