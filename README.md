# 🌌 Resgate da Noite

> **Plataforma web interativa e responsiva dedicada à conscientização, análise e mitigação dos impactos da poluição luminosa nos ecossistemas e na saúde humana.**

---

## 📌 Sobre o Projeto

O **Resgate da Noite** é um ecossistema digital desenvolvido para aproximar a ciência do cidadão. Através de uma interface imersiva e de alto contraste, o site expõe o problema do *Skyglow* (brilho difuso do céu), mapeia as suas principais causas, ilustra os impactos ecológicos e humanos por meio de ferramentas visuais dinâmicas, e recolhe o apoio da comunidade para promover políticas públicas de preservação do céu noturno natural.

---

## 🚀 Funcionalidades Principais

* **Hero Section Imersivo:** Abertura em tela cheia (`100vh`) com vídeo de fundo dinâmico e máscara de contraste premium.
* **Painel Interativo de Causas:** Estrutura tipo *Accordion* (sanfona) para explorar os vetores da poluição luminosa sem sobrecarregar a interface.
* **Comparação de Imagens Dinâmica:** Integração com componente visual para contrastar cenários com e sem poluição luminosa.
* **Painel de Dados (Dashboard):** Apresentação gráfica de dados estatísticos de forma limpa e intuitiva.
* **Design 100% Responsivo:** Menu hambúrguer interativo e adaptação perfeita para Smartphones, Tablets e Computadores.
* **Canal de Engajamento:** Formulário integrado para captação de apoiantes da causa.

---

## 🛠️ Tecnologias Utilizadas

A plataforma foi construída utilizando tecnologias nativas e bibliotecas modernas para garantir a máxima performance, acessibilidade e SEO:

* **[HTML5](https://developer.mozilla.org/pt-BR/docs/Web/HTML):** Estruturação semântica e acessível do conteúdo.
* **[CSS3](https://developer.mozilla.org/pt-BR/docs/Web/CSS):** Estilização avançada com arquitetura modular utilizando *Flexbox* e *CSS Grid*.
* **[JavaScript (Vanilla JS)](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript):** Lógica assíncrona para manipulação de estados do DOM, controlo do menu mobile e gerenciamento do *Accordion*.
* **[ScrollReveal](https://scrollrevealjs.org/):** Animações fluidas ativadas pelo scroll do utilizador.
* **[Image Compare Viewer](https://image-compare-viewer.github.io/):** Biblioteca para a ferramenta de comparação visual.

---

## 📁 Estrutura do Projeto

```text
├── index.html                 # Página principal da aplicação
├── README.md                  # Documentação do repositório
└── src/                       # Diretório de recursos do sistema
    ├── imgs/                  # Imagens, logótipos e backgrounds de vídeo
    └── styles/                # Folhas de estilo modulares
        ├── root.css           # Variáveis globais e paleta de cores
        ├── nav.css            # Estilos de navegação (Desktop)
        ├── inicio.css         # Estilo da secção Hero
        ├── causas.css         # Lógica visual do Accordion
        ├── impactos.css       # Grade de cartões de impactos
        ├── media-query.css    # Unificação de regras de responsividade (Mobile)
        └── ...

```

---

## 🔧 Como Executar o Projeto Localmente

Não precisas de instalar dependências complexas. Como o projeto foi feito em JavaScript puro, basta seguir estes passos:

1. **Clona o repositório:**
```bash
git clone [https://github.com/teu-usuario/resgate-da-noite.git](https://github.com/teu-usuario/resgate-da-noite.git)

```


2. **Navega até a pasta do projeto:**
```bash
cd resgate-da-noite

```


3. **Abre o ficheiro principal:**
* Basta dar dois cliques no ficheiro `index.html`, ou
* Se utilizas o VS Code, clica com o botão direito e seleciona **Open with Live Server** para ter recarregamento automático em tempo real.

  

---

## 🌐 Deploy e Atualizações

O site está publicado e disponível na internet através da infraestrutura da **[Vercel](https://vercel.com)**, integrado diretamente com este repositório do GitHub.

O link de visualização publica é **[Resgate da Noite](https://resgate-da-noite.vercel.app)**

* **Integração Contínua (CI/CD):** Qualquer alteração ou correção efetuada nos ficheiros deste repositório aciona automaticamente uma nova compilação na Vercel, atualizando o site em produção em menos de 10 segundos.

---

## 👤 Autores

* **Gianluca Diogo Virginio** - *Desenvolvimento Frontend, UI/UX Design e Pesquisa* - [gdvirginio]([https://www.google.com/search?q=https://github.com/teu-usuario](https://github.com/gdvirginio))

---

🔬 *Projeto desenvolvido para fins académicos e de conscientização ecológica.*

```

### O que deves personalizar antes de salvar?
1. Na secção `Como Executar o Projeto Localmente`, substitui `teu-usuario` e `resgate-da-noite` pelo teu link real do GitHub.
2. Na secção `Autores`, substitui pelo teu nome e o link do teu perfil.

```
