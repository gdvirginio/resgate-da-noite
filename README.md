# 🌌 Resgate da Noite

[![COBRIC 2026 - Aprovado](https://img.shields.io/badge/COBRIC_2026-Artigo_Aprovado_%26_Publicado-success?style=for-the-badge&logo=googlescholar)](https://unisanta.br/pesquisa/cobric/)
[![Deploy Vercel](https://img.shields.io/badge/Vercel-Deploy_Ativo-black?style=for-the-badge&logo=vercel)](https://resgate-da-noite.vercel.app)
[![Licença MIT](https://img.shields.io/badge/Licen%C3%A7a-MIT-blue?style=for-the-badge)](LICENSE)
[![Vanilla JS](https://img.shields.io/badge/Stack-HTML5_%7C_CSS3_%7C_Vanilla_JS-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://github.com/gdvirginio/resgate-da-noite)

Plataforma web de pesquisa aplicada e conscientização sobre os impactos da poluição luminosa na saúde humana, na biodiversidade e no equilíbrio ecológico.

---

## 📌 Sobre o Projeto e Aprovação no COBRIC 2026

O **Resgate da Noite** foi desenvolvido como instrumento metodológico de pesquisa científica por estudantes da **Etec Doutora Ruth Cardoso** (São Vicente/SP).

A plataforma e seus dados fundamentaram o artigo científico avaliado por comitê acadêmico e **aprovado para publicação oficial nos Anais do 18º Congresso Brasileiro de Iniciação Científica (COBRIC – UNISANTA)**:

> **"A NOITE ESTÁ SUMINDO: O IMPACTO DA POLUIÇÃO LUMINOSA NA SAÚDE HUMANA E NA NATUREZA"**  
> * **Autor Principal:** Gianluca Diogo Virginio  
> * **Coautora:** Ana Clara Fernandes  
> * **Orientadoras:** Prof.ª Bárbara de Castro Piauilino e Prof.ª Dr.ª Ana Beatriz Sicchieri Ziotti  
> * **Sessão Oficial de Apresentação:** 03 de novembro de 2026 (Terça-feira, 19h–21h30) – Campus Unisanta

A plataforma opera como um ecossistema integrado de pesquisa aplicada: reúne fundamentação bibliográfica, levantamento de percepção pública sincronizado em tempo real e um laboratório virtual interativo que simula o espalhamento óptico (*Skyglow*) e a perda de visibilidade estelar em ambiente urbano.

---

## 🔄 Versões e Evolução do Projeto

### Versão do Artigo Científico (`v1.0-artigo`)
O artigo aprovado no congresso documenta formalmente os métodos e resultados da primeira versão funcional da plataforma. Para assegurar total transparência, auditabilidade e reprodutibilidade científica, essa versão está preservada e congelada nas tags do repositório:
* **Release Oficial do Artigo:** [`v1.0-artigo`](https://github.com/gdvirginio/resgate-da-noite/releases/tag/v1.0-artigo)

### Integração do Laboratório no Repositório Principal
Originalmente, o simulador de céu urbano residia em um repositório complementar. Para unificar a arquitetura de software e eliminar redirecionamentos externos, o laboratório óptico foi migrado nativamente para [`routes/simulador/`](routes/simulador/).

### Aprimoramentos em Produção (Versão Atual)
Após a submissão, a aplicação continuou recebendo melhorias contínuas de engenharia e usabilidade:
* **Dashboard com Sincronização em Tempo Real:** Integração assíncrona com a API do Google Sheets; o contador de amostras identifica a submissão e recalcula as métricas do formulário ao vivo na aba do usuário.
* **Simulação Óptica com Canvas API:** Renderização procedural de estrelas em HTML5 Canvas com cintilação orgânica e camada de oclusão luminosa calculada conforme a intensidade da fonte artificial.
* **Adaptação Dinâmica de Entrada (Device-Aware):** Controle inteligente que desativa botões de tela em desktops (priorizando mouse e atalhos de teclado) e aciona automaticamente joystick virtual tátil em dispositivos móveis.
* **Estrutura de Evidências Científicas:** Mapeamento de 12 referências bibliográficas indexadas em seção colapsável e citações autor-data no corpo da interface.
* **Acessibilidade Web:** Links de atalho (*skip to content*) para leitores de tela e padronização semântica das 8 seções temáticas.

---

## 🚀 Módulos da Plataforma

* **Início:** Abertura imersiva contextualizando a perda da noite natural.
* **O que é Poluição Luminosa:** Conceituação física de *Skyglow* e intrusão com comparativo interativo na Escala de Bortle (8-9 vs 1-2).
* **Causas:** Mapeamento estruturado dos vetores emissores (luminárias sem anteparo *full-cutoff*, emissão de luz azul e publicidade noturna).
* **Impactos:** Síntese de dados sobre ritmo circadiano, supressão de melatonina, fauna costeira e desperdício energético.
* **Laboratório Interativo:** Simulador de feixe direcional e espalhamento atmosférico.
* **Diretrizes e Soluções:** Medidas práticas de mitigação e desenho luminotécnico eficiente.
* **Dashboard da Pesquisa:** Visualização gráfica dos dados coletados via Chart.js conectado ao formulário público.
* **Metodologia e Artigo:** Documentação do projeto de pesquisa desenvolvido na Baixada Santista.
* **Referências:** Relação das fontes catalogadas conforme normas acadêmicas.

---

## 🛠️ Tecnologias Utilizadas

A arquitetura foi concebida propositalmente em tecnologias web nativas, garantindo carregamento rápido, zero dependências externas pesadas e longevidade de código:

* **HTML5:** Semântica e acessibilidade.
* **CSS3:** Layout modular com CSS Grid, Flexbox e variáveis CSS para paleta noturna.
* **Vanilla JavaScript (ES6+):** Lógica assíncrona (`fetch`), manipulação direta do DOM e controle do simulador.
* **Canvas API:** Renderização gráfica procedural do céu estrelado.
* **Chart.js:** Gráficos interativos para exibição dos dados de percepção pública.
* **ScrollReveal:** Transições visuais na rolagem da página.
* **Google Apps Script / Sheets API:** Infraestrutura de coleta e sincronização de dados amostrais.

---

## 📁 Estrutura do Repositório

```text
├── index.html                 # Ponto de entrada da plataforma
├── README.md                  # Documentação técnica e científica
├── routes/
│   └── simulador/             # Laboratório interativo de dispersão de luz
│       ├── index.html         # Interface do simulador
│       ├── style.css          # Estilos e viewport do laboratório
│       ├── script.js          # Algoritmo de Canvas, joystick e opacidade
│       └── lanterna.png       # Ativo gráfico da fonte emissora
└── src/
    ├── imgs/                  # Ativos visuais e diagramas explicativos
    ├── videos/                # Mídia de fundo otimizada
    ├── script/                # Módulos JS (dashboard, dados, interações)
    └── styles/                # Folhas de estilo modulares
```

---

## 🔧 Execução Local

Por utilizar tecnologias nativas, a aplicação não exige instalação de pacotes via npm:

1. Clone o repositório:
```bash
git clone https://github.com/gdvirginio/resgate-da-noite.git
```

2. Acesse a pasta:
```bash
cd resgate-da-noite
```

3. Execute com qualquer servidor local (ex: extensão **Live Server** do VS Code) ou abra o arquivo `index.html` diretamente em seu navegador.

---

## 🌐 Deploy e Produção

A aplicação está em produção contínua na Vercel com integração ao branch principal do GitHub:

* **Aplicação em Produção:** [https://resgate-da-noite.vercel.app](https://resgate-da-noite.vercel.app)
* **Repositório Oficial:** [https://github.com/gdvirginio/resgate-da-noite](https://github.com/gdvirginio/resgate-da-noite)
* **Versão Documentada no Artigo:** [Tag v1.0-artigo](https://github.com/gdvirginio/resgate-da-noite/releases/tag/v1.0-artigo)

---

## 👥 Equipe de Pesquisa

* **Gianluca Diogo Virginio** – Autor Principal, Desenvolvedor de Software e UI/UX ([GitHub](https://github.com/gdvirginio))
* **Ana Clara Fernandes** – Coautora, Pesquisa e Coleta de Dados
* **Prof.ª Bárbara de Castro Piauilino** – Professora Orientadora
* **Prof.ª Dr.ª Ana Beatriz Sicchieri Ziotti** – Professora Orientadora

**Instituição:** Etec Doutora Ruth Cardoso • São Vicente (SP)  
**Congresso:** 18º Congresso Brasileiro de Iniciação Científica (COBRIC 2026) – Universidade Santa Cecília (UNISANTA)

---

Licença MIT. Livre para fins educacionais, científicos e de preservação ambiental.
