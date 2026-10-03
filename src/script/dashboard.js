const URL_API =
  "https://script.google.com/macros/s/AKfycbxEDaZgSpdE7vu6Ldlo42G57dyBCNKcv8WgGym-qZ9mOTOHZYrVOfw0Nw7GiGbHhjXG/exec";

// Paleta sofisticada (Dourado, Azul Noturno, Verde Ecológico, Coral e Cinza Estelar)
const PALETA_CORES = [
  "#e8c97a",
  "rgba(91, 124, 250, 0.85)",
  "rgba(74, 222, 128, 0.85)",
  "rgba(248, 113, 113, 0.85)",
  "rgba(167, 139, 250, 0.85)",
];

async function inicializarDashboard() {
  const numeroTotalEl = document.getElementById("numeroTotal");
  const loadingPie = document.getElementById("loading-pie");
  const loadingBar = document.getElementById("loading-bar");
  const loadingApoio = document.getElementById("loading-apoio");
  const erroBancoEl = document.getElementById("erro-banco");
  const graficosLayout = document.getElementById("graficos-layout");

  try {
    const resposta = await fetch(URL_API);
    if (!resposta.ok) throw new Error("Erro na rede");

    const json = await resposta.json();
    const dados = json.respostas || [];

    if (numeroTotalEl) numeroTotalEl.textContent = dados.length;

    // Oculta todos os loadings antes de renderizar
    if (loadingPie) loadingPie.style.display = "none";
    if (loadingBar) loadingBar.style.display = "none";
    if (loadingApoio) loadingApoio.style.display = "none";

    // Renderiza os 3 gráficos usando as colunas exatas do seu Sheets
    criarGraficoPizza(
      dados,
      "Você sabe o que é poluição luminosa?",
      "graficoConhecimento",
    );
    criarGraficoBarras(
      dados,
      "Como é o céu noturno na sua região?",
      "graficoCeu",
    );
    criarGraficoPizza(
      dados,
      "Você apoia medidas para reduzir iluminação excessiva nas cidades?",
      "graficoApoio",
    );
  } catch (erro) {
    console.error("Erro ao carregar banco de dados:", erro);

    if (numeroTotalEl) numeroTotalEl.textContent = "—";
    if (loadingPie) loadingPie.style.display = "none";
    if (loadingBar) loadingBar.style.display = "none";
    if (loadingApoio) loadingApoio.style.display = "none";
    if (graficosLayout) graficosLayout.style.display = "none";

    if (erroBancoEl) {
      erroBancoEl.textContent =
        "Não foi possível conectar ao banco de dados do formulário no momento.";
      erroBancoEl.style.display = "block";
    }
  }
}

// Função de Pizza Estilizada
function criarGraficoPizza(lista, coluna, elementId) {
  const contagem = {};
  lista.forEach((item) => {
    const valor = (item[coluna] || "Não respondido").trim();
    contagem[valor] = (contagem[valor] || 0) + 1;
  });

  const canvas = document.getElementById(elementId);
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  new Chart(ctx, {
    type: "pie",
    data: {
      labels: Object.keys(contagem),
      datasets: [
        {
          data: Object.values(contagem),
          backgroundColor: PALETA_CORES,
          borderColor: "#080a18",
          borderWidth: 2,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "bottom",
          labels: {
            color: "#ddd5c0",
            font: { family: "DM Sans", size: 11 },
            padding: 12,
          },
        },
        tooltip: {
          backgroundColor: "rgba(8, 10, 24, 0.95)",
          titleFont: { family: "DM Sans" },
          bodyFont: { family: "DM Sans" },
        },
      },
    },
  });
}

// Função de Barras Estilizada
function criarGraficoBarras(lista, coluna, elementId) {
  const contagem = {};
  lista.forEach((item) => {
    const valor = (item[coluna] || "Não respondido").trim();
    contagem[valor] = (contagem[valor] || 0) + 1;
  });

  const canvas = document.getElementById(elementId);
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  new Chart(ctx, {
    type: "bar",
    data: {
      labels: Object.keys(contagem),
      datasets: [
        {
          label: "Participantes",
          data: Object.values(contagem),
          backgroundColor: "rgba(232, 201, 122, 0.85)",
          hoverBackgroundColor: "#e8c97a",
          borderRadius: 4,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: "rgba(8, 10, 24, 0.95)",
          titleFont: { family: "DM Sans" },
          bodyFont: { family: "DM Sans" },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: { color: "#6a6a8a", font: { family: "DM Sans" } },
          grid: { color: "rgba(255, 255, 255, 0.04)" },
        },
        x: {
          ticks: { color: "#6a6a8a", font: { family: "DM Sans", size: 10 } },
          grid: { display: false },
        },
      },
    },
  });
}

// Inicializa a chamada à API
inicializarDashboard();
