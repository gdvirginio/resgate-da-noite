/* =============================================
   CAUSAS — causas.js
   ============================================= */

var causasData = [
  {
    icone:
      '<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18h6M10 21h4M12 3a6 6 0 00-4 10.5c.8.8 1.5 1.5 1.5 2.5v1h5v-1c0-1 .7-1.7 1.5-2.5A6 6 0 0012 3z"/></svg>',
    titulo: "Excesso de iluminação urbana",
    texto:
      "Cidades usam luz com intensidade muito acima do necessário. O horizonte urbano brilha o suficiente para apagar estrelas até 80km de distância.",
    stats: [
      { valor: "80km", label: "raio de impacto" },
      { valor: "40%", label: "da luz vai pro céu" },
    ],
  },
  {
    icone:
      '<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20V5M6 11l6-6 6 6"/></svg>',
    titulo: "Luminárias mal direcionadas",
    texto:
      "Postes sem shields projetam luz horizontalmente e para cima. Além de poluir o céu, são menos eficientes para o solo.",
    stats: [
      { valor: "60%", label: "da luz desperdiçada" },
      { valor: "3x", label: "mais custo" },
    ],
  },
  {
    icone:
      '<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="6" width="18" height="12" rx="2"/><path d="M8 21h8M12 18v3"/></svg>',
    titulo: "Publicidade luminosa excessiva",
    texto:
      "Outdoors digitais 24h são os mais difíceis de regulamentar por envolver interesses privados.",
    stats: [
      { valor: "24h", label: "funcionamento contínuo" },
      { valor: "12%", label: "da poluição total" },
    ],
  },
  {
    icone:
      '<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13.5V5a2 2 0 114 0v8.5a4 4 0 11-4 0z"/></svg>',
    titulo: "LEDs frios (azulados)",
    texto:
      "Luz acima de 4000K se espalha mais na atmosfera por efeito Rayleigh. Suprime a melatonina 5x mais do que luz âmbar.",
    stats: [
      { valor: "5x", label: "mais supressão de melatonina" },
      { valor: "3x", label: "mais dispersão atmosférica" },
    ],
  },
  {
    icone:
      '<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
    titulo: "Sem controle de horário",
    texto:
      "Estacionamentos e ruas desertas permanecem com iluminação máxima. Sensores poderiam reduzir 70% do consumo sem impacto na segurança.",
    stats: [
      { valor: "70%", label: "de redução possível" },
      { valor: "4h", label: "inutilmente acesas por noite" },
    ],
  },
];

var cardAtivo = null;

function toggleCausa(idx) {
  var cards = document.querySelectorAll(".causa-card");
  var painel = document.getElementById("causa-painel");

  if (cardAtivo === idx) {
    cards[idx].classList.remove("ativo");
    painel.style.display = "none";
    cardAtivo = null;
    return;
  }

  cards.forEach(function (c) {
    c.classList.remove("ativo");
  });
  cards[idx].classList.add("ativo");
  cardAtivo = idx;

  var d = causasData[idx];

  document.getElementById("painel-icone").innerHTML = d.icone;
  document.getElementById("painel-titulo").textContent = d.titulo;
  document.getElementById("painel-texto").textContent = d.texto;

  document.getElementById("painel-stats").innerHTML = d.stats
    .map(function (s) {
      return (
        '<div class="stat-card">' +
        '<div class="stat-valor font-display">' +
        s.valor +
        "</div>" +
        '<div class="stat-label">' +
        s.label +
        "</div>" +
        "</div>"
      );
    })
    .join("");

  painel.style.display = "none";
  void painel.offsetWidth;
  painel.style.display = "block";

  setTimeout(function () {
    painel.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, 50);
}

function fecharPainel() {
  document.querySelectorAll(".causa-card").forEach(function (c) {
    c.classList.remove("ativo");
  });
  document.getElementById("causa-painel").style.display = "none";
  cardAtivo = null;
}
(function () {
  var cards = document.querySelectorAll(".causa-card");
  var io = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          var idx = Number(e.target.dataset.idx || 0);
          e.target.style.transitionDelay = idx * 80 + "ms";
          e.target.classList.add("visible");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12 },
  );
  cards.forEach(function (c) {
    io.observe(c);
  });
})();
