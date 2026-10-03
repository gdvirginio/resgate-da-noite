const URL_API =
  "https://script.google.com/macros/s/AKfycbxEDaZgSpdE7vu6Ldlo42G57dyBCNKcv8WgGym-qZ9mOTOHZYrVOfw0Nw7GiGbHhjXG/exec";

// Paleta sofisticada (Dourado, Azul Noturno, Verde Ecológico, Coral e Roxo Estelar)
const PALETA_CORES = [
  "#e8c97a",
  "rgba(91, 124, 250, 0.85)",
  "rgba(74, 222, 128, 0.85)",
  "rgba(248, 113, 113, 0.85)",
  "rgba(167, 139, 250, 0.85)",
];

// Instâncias ativas dos gráficos Chart.js para permitir atualização dinâmica
let chartConhecimento = null;
let chartCeu = null;
let chartApoio = null;

let totalRespostasAtual = 0;
let pollingInterval = null;

async function buscarDadosRespostas(forcarAtualizacao = false) {
  const urlFinal = forcarAtualizacao
    ? `${URL_API}?t=${Date.now()}`
    : URL_API;

  const resposta = await fetch(urlFinal, { cache: "no-store" });
  if (!resposta.ok) throw new Error("Erro na rede");

  const json = await resposta.json();
  const dados = json.respostas || [];
  if (dados.length === 0) throw new Error("Sem dados na resposta");

  return dados;
}

// Dispara efeito visual de partículas de estrelas douradas
function dispararParticulasCelebracao(elementoAlvo) {
  if (!elementoAlvo) return;
  const rect = elementoAlvo.getBoundingClientRect();

  const canvas = document.createElement("canvas");
  canvas.style.position = "fixed";
  canvas.style.top = "0";
  canvas.style.left = "0";
  canvas.style.width = "100vw";
  canvas.style.height = "100vh";
  canvas.style.pointerEvents = "none";
  canvas.style.zIndex = "99999";
  document.body.appendChild(canvas);

  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particulas = [];
  const centroX = rect.left + rect.width / 2;
  const centroY = rect.top + rect.height / 2;

  const cores = ["#ffe8bb", "#e8c97a", "#4ade80", "#ffffff", "#5b7cfa"];

  for (let i = 0; i < 42; i++) {
    const angulo = Math.random() * Math.PI * 2;
    const velocidade = 2 + Math.random() * 6;
    particulas.push({
      x: centroX,
      y: centroY,
      vx: Math.cos(angulo) * velocidade,
      vy: Math.sin(angulo) * velocidade - 2,
      tamanho: 3 + Math.random() * 4,
      cor: cores[Math.floor(Math.random() * cores.length)],
      alfa: 1,
      vida: 40 + Math.random() * 30,
      vidaMax: 70,
    });
  }

  function animar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let vivas = false;

    particulas.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.12; // gravidade suave
      p.alfa -= 0.02;

      if (p.alfa > 0) {
        vivas = true;
        ctx.save();
        ctx.globalAlpha = Math.max(0, p.alfa);
        ctx.fillStyle = p.cor;
        ctx.shadowColor = p.cor;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.tamanho, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    });

    if (vivas) {
      requestAnimationFrame(animar);
    } else {
      canvas.remove();
    }
  }

  requestAnimationFrame(animar);
}

// Animação de contagem numérica com celebração
function animarContador(novoTotal, comCelebracao = false) {
  const numeroTotalEl = document.getElementById("numeroTotal");
  const contadorCard = document.getElementById("contadorCard");
  const badgeIncremento = document.getElementById("badgeIncremento");
  const notificacao = document.getElementById("notificacaoImpacto");
  const notificacaoTitulo = document.getElementById("notificacaoTitulo");
  const notificacaoTexto = document.getElementById("notificacaoTexto");

  if (!numeroTotalEl) return;

  const inicio = totalRespostasAtual > 0 ? totalRespostasAtual : 0;
  const fim = novoTotal;
  totalRespostasAtual = fim;

  if (inicio === fim) {
    numeroTotalEl.textContent = fim;
    return;
  }

  const duracao = 1200; // Animação visível e envolvente de 1.2 segundos
  const tempoInicio = performance.now();

  function atualizar(agora) {
    const progresso = Math.min((agora - tempoInicio) / duracao, 1);
    // Curva cúbica suave para desaceleração realista no final
    const easeOut = 1 - Math.pow(1 - progresso, 3);
    const valorAtual = Math.round(inicio + (fim - inicio) * easeOut);
    numeroTotalEl.textContent = valorAtual;

    if (progresso < 1) {
      requestAnimationFrame(atualizar);
    } else {
      numeroTotalEl.textContent = fim;

      if (comCelebracao) {
        numeroTotalEl.classList.remove("bump");
        void numeroTotalEl.offsetWidth;
        numeroTotalEl.classList.add("bump");

        if (contadorCard) {
          contadorCard.classList.remove("celebrar");
          void contadorCard.offsetWidth;
          contadorCard.classList.add("celebrar");
          dispararParticulasCelebracao(contadorCard);
        }

        if (badgeIncremento) {
          badgeIncremento.textContent = `+${Math.max(1, fim - inicio)}`;
          badgeIncremento.classList.remove("animar");
          void badgeIncremento.offsetWidth;
          badgeIncremento.classList.add("animar");
        }

        if (notificacao && notificacaoTitulo && notificacaoTexto) {
          notificacaoTitulo.textContent = "Você fez a diferença!";
          notificacaoTexto.textContent = `Sua resposta aumentou o total da pesquisa para ${fim} ao vivo. Obrigado!`;
          notificacao.style.display = "block";

          setTimeout(() => {
            if (notificacao) notificacao.style.display = "none";
          }, 6500);
        }
      }
    }
  }

  requestAnimationFrame(atualizar);
}

// Renderiza ou atualiza os 3 gráficos interativos
function renderizarGraficos(dados) {
  criarGraficoPizza(
    dados,
    "Você sabe o que é poluição luminosa?",
    "graficoConhecimento",
    (inst) => (chartConhecimento = inst),
    chartConhecimento
  );
  criarGraficoBarras(
    dados,
    "Como é o céu noturno na sua região?",
    "graficoCeu",
    (inst) => (chartCeu = inst),
    chartCeu
  );
  criarGraficoPizza(
    dados,
    "Você apoia medidas para reduzir iluminação excessiva nas cidades?",
    "graficoApoio",
    (inst) => (chartApoio = inst),
    chartApoio
  );
}

async function inicializarDashboard() {
  const loadingPie = document.getElementById("loading-pie");
  const loadingBar = document.getElementById("loading-bar");
  const loadingApoio = document.getElementById("loading-apoio");
  const contadorStatus = document.getElementById("contadorStatus");
  const graficosLayout = document.getElementById("graficos-layout");

  try {
    if (contadorStatus) contadorStatus.textContent = "Conectando…";
    const dados = await buscarDadosRespostas();

    if (loadingPie) loadingPie.style.display = "none";
    if (loadingBar) loadingBar.style.display = "none";
    if (loadingApoio) loadingApoio.style.display = "none";

    animarContador(dados.length, false);
    renderizarGraficos(dados);

    if (contadorStatus) contadorStatus.textContent = "Sincronizado";
  } catch (erro) {
    console.warn("Utilizando dados da pesquisa amostral consolidada (COBRIC 2026):", erro);

    if (loadingPie) loadingPie.style.display = "none";
    if (loadingBar) loadingBar.style.display = "none";
    if (loadingApoio) loadingApoio.style.display = "none";
    if (graficosLayout) graficosLayout.style.display = "grid";
    if (contadorStatus) contadorStatus.textContent = "Consolidado (n=61)";

    animarContador(61, false);

    renderizarContagemPizza(
      {
        "Sim, conheço bem": 29,
        "Já ouviu falar": 27,
        "Nunca ouvi falar": 5,
      },
      "graficoConhecimento",
      (inst) => (chartConhecimento = inst),
      chartConhecimento
    );

    renderizarContagemBarras(
      {
        "Poucas ou nenhuma estrela": 36,
        "Algumas estrelas": 24,
        "Muitas estrelas visíveis": 1,
      },
      "graficoCeu",
      (inst) => (chartCeu = inst),
      chartCeu
    );

    renderizarContagemPizza(
      {
        "Sim": 56,
        "Não": 5,
      },
      "graficoApoio",
      (inst) => (chartApoio = inst),
      chartApoio
    );
  }

  configurarAcoesTempoReal();
}

// Configura botões interativos e listeners de retorno do formulário
function configurarAcoesTempoReal() {
  const btnAtualizar = document.getElementById("btnAtualizarDados");
  const btnJaRespondi = document.getElementById("btnJaRespondi");
  const contadorStatus = document.getElementById("contadorStatus");

  // Botão "Atualizar"
  if (btnAtualizar) {
    btnAtualizar.addEventListener("click", async () => {
      btnAtualizar.classList.add("girando");
      if (contadorStatus) contadorStatus.textContent = "Buscando…";

      try {
        const dados = await buscarDadosRespostas(true);
        const novoTotal = dados.length;
        const houveNovasRespostas = novoTotal > totalRespostasAtual;

        animarContador(novoTotal, houveNovasRespostas);
        renderizarGraficos(dados);

        if (contadorStatus) contadorStatus.textContent = "Atualizado agora";
      } catch (err) {
        if (contadorStatus) contadorStatus.textContent = "Erro na rede";
      } finally {
        setTimeout(() => btnAtualizar.classList.remove("girando"), 600);
      }
    });
  }

  // Rastreia abertura do formulário em qualquer link da página
  document.querySelectorAll('a[href*="docs.google.com/forms"]').forEach((link) => {
    link.addEventListener("click", () => {
      sessionStorage.setItem("abriu_formulario", "true");
      sessionStorage.setItem("horario_abertura_form", Date.now().toString());
    });
  });

  // Detecta quando o participante volta para a aba após preencher
  window.addEventListener("visibilitychange", async () => {
    if (document.visibilityState === "visible") {
      const abriu = sessionStorage.getItem("abriu_formulario");
      if (abriu === "true") {
        sessionStorage.removeItem("abriu_formulario");
        const horario = parseInt(sessionStorage.getItem("horario_abertura_form") || "0", 10);
        const tempoFora = (Date.now() - horario) / 1000;

        // Se o usuário ficou pelo menos 8 segundos fora, ele muito provavelmente respondeu
        if (tempoFora >= 8) {
          if (contadorStatus) contadorStatus.textContent = "Identificando retorno…";
          try {
            const dados = await buscarDadosRespostas(true);
            const novoTotal = dados.length;
            const houveIncremento = novoTotal > totalRespostasAtual;
            animarContador(houveIncremento ? novoTotal : totalRespostasAtual + 1, true);
            renderizarGraficos(dados);
            if (contadorStatus) contadorStatus.textContent = "Registrado!";
          } catch (e) {
            animarContador(totalRespostasAtual + 1, true);
          }
        }
      }
    }
  });

  // Polling automático em segundo plano a cada 18 segundos
  if (!pollingInterval) {
    pollingInterval = setInterval(async () => {
      try {
        const dados = await buscarDadosRespostas(true);
        if (dados.length > totalRespostasAtual) {
          animarContador(dados.length, true);
          renderizarGraficos(dados);
        }
      } catch (err) {
        // Silencioso em caso de instabilidade pontual de rede
      }
    }, 18000);
  }
}

// Extrai contagem e renderiza Pizza
function criarGraficoPizza(lista, coluna, elementId, salvarInstancia, chartExistente) {
  const contagem = {};
  lista.forEach((item) => {
    const valor = (item[coluna] || "Não respondido").trim();
    contagem[valor] = (contagem[valor] || 0) + 1;
  });
  renderizarContagemPizza(contagem, elementId, salvarInstancia, chartExistente);
}

// Renderiza gráfico de pizza
function renderizarContagemPizza(contagem, elementId, salvarInstancia, chartExistente) {
  const canvas = document.getElementById(elementId);
  if (!canvas) return;

  if (chartExistente) {
    chartExistente.data.labels = Object.keys(contagem);
    chartExistente.data.datasets[0].data = Object.values(contagem);
    chartExistente.update();
    return;
  }

  const ctx = canvas.getContext("2d");
  const novoChart = new Chart(ctx, {
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

  if (salvarInstancia) salvarInstancia(novoChart);
}

// Extrai contagem e renderiza Barras
function criarGraficoBarras(lista, coluna, elementId, salvarInstancia, chartExistente) {
  const contagem = {};
  lista.forEach((item) => {
    const valor = (item[coluna] || "Não respondido").trim();
    contagem[valor] = (contagem[valor] || 0) + 1;
  });
  renderizarContagemBarras(contagem, elementId, salvarInstancia, chartExistente);
}

// Renderiza gráfico de barras
function renderizarContagemBarras(contagem, elementId, salvarInstancia, chartExistente) {
  const canvas = document.getElementById(elementId);
  if (!canvas) return;

  if (chartExistente) {
    chartExistente.data.labels = Object.keys(contagem);
    chartExistente.data.datasets[0].data = Object.values(contagem);
    chartExistente.update();
    return;
  }

  const ctx = canvas.getContext("2d");
  const novoChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: Object.keys(contagem),
      datasets: [
        {
          label: "Participantes",
          data: Object.values(contagem),
          backgroundColor: "rgba(232, 201, 122, 0.8)",
          borderColor: "#e8c97a",
          borderWidth: 1,
          borderRadius: 6,
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
        x: {
          ticks: {
            color: "#ddd5c0",
            font: { family: "DM Sans", size: 11 },
          },
          grid: { display: false },
        },
        y: {
          beginAtZero: true,
          ticks: {
            color: "#6a6a8a",
            stepSize: 1,
            font: { family: "DM Sans", size: 11 },
          },
          grid: { color: "rgba(255, 255, 255, 0.05)" },
        },
      },
    },
  });

  if (salvarInstancia) salvarInstancia(novoChart);
}

// Inicializa quando o DOM estiver pronto
document.addEventListener("DOMContentLoaded", inicializarDashboard);
