/* =============================================
   CAUSAS — causas.js
   ============================================= */

var causasData = [
  {
    icone:
      '<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18h6M10 21h4M12 3a6 6 0 00-4 10.5c.8.8 1.5 1.5 1.5 2.5v1h5v-1c0-1 .7-1.7 1.5-2.5A6 6 0 0012 3z"/></svg>',
    titulo: "Excesso de iluminação urbana",
    texto:
      "A expansão urbana desregulada eleva continuamente as emissões de luz. Com a transição em massa para LEDs, o aumento real nas emissões noturnas pode atingir até 270%, criando cúpulas de skyglow que ofuscam o céu a dezenas de quilômetros (Sánchez de Miguel et al., 2021).",
    stats: [
      { valor: "+270%", label: "aumento real de emissões (Sánchez de Miguel et al., 2021)" },
      { valor: "49%", label: "crescimento mínimo via satélite 1992–2017" },
    ],
  },
  {
    icone:
      '<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20V5M6 11l6-6 6 6"/></svg>',
    titulo: "Luminárias mal direcionadas",
    texto:
      "Luminárias sem anteparos adequados projetam luz para cima e para os lados. Além de não iluminarem o solo com eficiência, representam um enorme desperdício de energia e recursos públicos (IDA, 2007; Scorzafava, 2022).",
    stats: [
      { valor: "30%", label: "da luz pública desperdiçada (IDA, 2007)" },
      { valor: "US$ 50B", label: "desperdiçados ao ano no espaço (Scorzafava, 2022)" },
    ],
  },
  {
    icone:
      '<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="6" width="18" height="12" rx="2"/><path d="M8 21h8M12 18v3"/></svg>',
    titulo: "Publicidade luminosa excessiva",
    texto:
      "Painéis de LED, outdoors e fachadas comerciais ligados a noite toda com potência máxima. No levantamento da nossa pesquisa, o controle dessa iluminação foi apontado como a medida prioritária por 72,1% dos participantes (COBRIC, 2026).",
    stats: [
      { valor: "72,1%", label: "apoiam controle de fachadas (COBRIC, 2026)" },
      { valor: "24h", label: "funcionamento sem necessidade" },
    ],
  },
  {
    icone:
      '<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13.5V5a2 2 0 114 0v8.5a4 4 0 11-4 0z"/></svg>',
    titulo: "LEDs frios e telas noturnas",
    texto:
      "A luz azul de alta frequência suprime a melatonina e desregula o ritmo circadiano, associada na literatura e no nosso questionário a queixas de sono e fadiga ocular (Randjelović et al., 2023; Almeida et al., 2025; COBRIC, 2026).",
    stats: [
      { valor: "82,0%", label: "usam telas antes de dormir diariamente (COBRIC, 2026)" },
      { valor: "60,7%", label: "relatam cansaço ao acordar (COBRIC, 2026)" },
    ],
  },
  {
    icone:
      '<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
    titulo: "Sem controle de horário",
    texto:
      "Vias e pátios públicos permanecem com potência total mesmo de madrugada sem fluxo de pessoas. Sistemas de dimerização e sensores reduzem o consumo energético e as emissões de carbono com segurança (Dias, 2010; IPCC, 2006; COBRIC, 2026).",
    stats: [
      { valor: "55,7%", label: "apoiam redução de intensidade na madrugada" },
      { valor: "91,8%", label: "apoio geral à redução de luz excessiva" },
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
