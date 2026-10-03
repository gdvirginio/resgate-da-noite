document.addEventListener('DOMContentLoaded', () => {
    // Elementos principais
    const canvasCeu = document.getElementById('ceuEstrelas');
    const ctx = canvasCeu ? canvasCeu.getContext('2d') : null;
    const light = document.getElementById('feixeLuz') || document.querySelector('.light');
    const fundo = document.getElementById('haloDispersao') || document.querySelector('.fundo1');
    const tracker = document.getElementById('lanternaTracker') || document.querySelector('.luiz');
    const lanternImg = document.getElementById('lanternImg') || document.querySelector('.lantern');
    const joystick = document.getElementById('joystick');
    const stick = document.getElementById('joystickStick');
    const btnMais = document.getElementById('btnMais');
    const btnMenos = document.getElementById('btnMenos');

    // ========================================================
    // 1. CÉU ESTRELADO PROCEDURAL COM BRILHOS (CANVAS)
    // ========================================================
    let estrelas = [];
    const NUM_ESTRELAS = 340;
    const CORES_ESTRELAS = ['#ffffff', '#ffe8bb', '#dbe7ff', '#fff4d4', '#e2edff'];

    function redimensionarCanvas() {
        if (!canvasCeu) return;
        canvasCeu.width = window.innerWidth;
        canvasCeu.height = window.innerHeight;
        criarEstrelas();
    }

    function criarEstrelas() {
        estrelas = [];
        const w = canvasCeu.width;
        const h = canvasCeu.height;

        for (let i = 0; i < NUM_ESTRELAS; i++) {
            const tamanhoBase = Math.random() < 0.8
                ? 0.7 + Math.random() * 0.9  // estrelas menores e distantes
                : 1.7 + Math.random() * 1.3; // estrelas mais próximas e brilhantes

            estrelas.push({
                x: Math.random() * w,
                y: Math.random() * h,
                raioBase: tamanhoBase,
                brilhoBase: 0.35 + Math.random() * 0.65,
                velocidadeCintilacao: 0.015 + Math.random() * 0.045,
                fase: Math.random() * Math.PI * 2,
                cor: CORES_ESTRELAS[Math.floor(Math.random() * CORES_ESTRELAS.length)],
                temBrilhoCruz: tamanhoBase > 2.0 && Math.random() < 0.45,
            });
        }
    }

    redimensionarCanvas();
    window.addEventListener('resize', redimensionarCanvas);

    // ========================================================
    // 2. POSIÇÃO DA LANTERNA (RESPONSIVA PARA DESKTOP E MOBILE)
    // ========================================================
    const ehMobile = window.innerWidth <= 768;
    let posX = window.innerWidth / 2;
    // No celular inicia no meio do céu para não colidir com o joystick no rodapé
    let posY = ehMobile ? window.innerHeight * 0.54 : window.innerHeight * 0.82;

    const aplicarPosicao = () => {
        if (!tracker) return;

        const limiteSuperior = 90;
        const limiteInferior = window.innerWidth <= 768
            ? window.innerHeight - 150
            : window.innerHeight - 60;

        posX = Math.max(30, Math.min(window.innerWidth - 30, posX));
        posY = Math.max(limiteSuperior, Math.min(limiteInferior, posY));

        tracker.style.left = `${posX}px`;
        tracker.style.top = `${posY}px`;
        tracker.style.transform = 'translate(-50%, -50%)';
    };
    aplicarPosicao();

    // ========================================================
    // 3. INTENSIDADE LUMINOSA (A BOLA PRETA BLOQUEIA 100%)
    // ========================================================
    let value = 0.5;

    const updateOpacity = () => {
        value = Math.max(0, Math.min(1, value));
        if (light) light.style.opacity = value;
        // Quando value = 1.0, fundo1 fica 100% preto opaco, bloqueando totalmente as estrelas
        if (fundo) fundo.style.opacity = value;
    };
    updateOpacity();

    // Guia contextual para celular ou desktop
    const guideTexto = document.getElementById('guideTexto');
    function atualizarGuia() {
        if (!guideTexto) return;
        const ehTouch = window.innerWidth <= 768 || window.matchMedia('(hover: none) and (pointer: coarse)').matches;
        if (ehTouch) {
            guideTexto.textContent = 'Mova a lanterna pelo joystick ou toque. Toque em + e − para regular a luz.';
        } else {
            guideTexto.textContent = 'Mova a lanterna com o mouse ou setas. Use a roda do mouse (scroll) ou teclas + e − para regular a luz.';
        }
    }
    atualizarGuia();
    window.addEventListener('resize', atualizarGuia);

    // ========================================================
    // 4. LOOP DE ANIMAÇÃO DO CÉU (Cintilação orgânica)
    // ========================================================
    let tempoAnim = 0;

    function renderizarCeu() {
        if (!ctx || !canvasCeu) return;
        tempoAnim += 0.8;

        // Fundo preto puro espacial
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, canvasCeu.width, canvasCeu.height);

        estrelas.forEach((estrela) => {
            const oscilacao = Math.sin(tempoAnim * estrela.velocidadeCintilacao + estrela.fase);
            const brilho = estrela.brilhoBase * (0.65 + 0.35 * oscilacao);

            ctx.save();
            ctx.globalAlpha = Math.min(1, Math.max(0, brilho));
            ctx.fillStyle = estrela.cor;
            ctx.shadowColor = estrela.cor;
            ctx.shadowBlur = estrela.raioBase > 1.5 ? 5 : 2;

            ctx.beginPath();
            ctx.arc(estrela.x, estrela.y, estrela.raioBase, 0, Math.PI * 2);
            ctx.fill();

            // Brilho em cruz para estrelas brilhantes
            if (estrela.temBrilhoCruz && brilho > 0.65) {
                ctx.strokeStyle = estrela.cor;
                ctx.lineWidth = 0.7;
                const raioCruz = estrela.raioBase * 2.6;

                ctx.beginPath();
                ctx.moveTo(estrela.x - raioCruz, estrela.y);
                ctx.lineTo(estrela.x + raioCruz, estrela.y);
                ctx.moveTo(estrela.x, estrela.y - raioCruz);
                ctx.lineTo(estrela.x, estrela.y + raioCruz);
                ctx.stroke();
            }

            ctx.restore();
        });

        requestAnimationFrame(renderizarCeu);
    }

    renderizarCeu();

    // ========================================================
    // 5. INTERATIVIDADE DA LANTERNA (Arrasto Direto Touch / Mouse)
    // ========================================================
    let dragAtivo = false;
    let dragPointerId = null;

    if (lanternImg) {
        lanternImg.addEventListener('pointerdown', (e) => {
            dragAtivo = true;
            dragPointerId = e.pointerId;
            lanternImg.setPointerCapture(e.pointerId);
            posX = e.clientX;
            posY = e.clientY;
            aplicarPosicao();
        });

        lanternImg.addEventListener('pointermove', (e) => {
            if (!dragAtivo || e.pointerId !== dragPointerId) return;
            posX = e.clientX;
            posY = e.clientY;
            aplicarPosicao();
        });

        const soltarArrasto = (e) => {
            if (e.pointerId !== dragPointerId) return;
            dragAtivo = false;
            if (lanternImg.hasPointerCapture(e.pointerId)) {
                lanternImg.releasePointerCapture(e.pointerId);
            }
            dragPointerId = null;
        };

        lanternImg.addEventListener('pointerup', soltarArrasto);
        lanternImg.addEventListener('pointercancel', soltarArrasto);
    }

    // ========================================================
    // 6. JOYSTICK VIRTUAL
    // ========================================================
    let vx = 0;
    let vy = 0;
    const VEL_MAX = 7;
    const raioMax = 42;
    let joyPointerId = null;

    if (joystick && stick) {
        const atualizarStick = (clientX, clientY) => {
            const rect = joystick.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            let dx = clientX - cx;
            let dy = clientY - cy;
            const dist = Math.hypot(dx, dy);

            if (dist > raioMax) {
                dx = (dx / dist) * raioMax;
                dy = (dy / dist) * raioMax;
            }

            stick.style.left = `calc(50% + ${dx}px)`;
            stick.style.top = `calc(50% + ${dy}px)`;
            vx = (dx / raioMax) * VEL_MAX;
            vy = (dy / raioMax) * VEL_MAX;
            stick.classList.add('ativo');
        };

        const resetarStick = () => {
            stick.style.left = '50%';
            stick.style.top = '50%';
            vx = 0;
            vy = 0;
            stick.classList.remove('ativo');
            joyPointerId = null;
        };

        joystick.addEventListener('pointerdown', (e) => {
            e.preventDefault();
            joyPointerId = e.pointerId;
            joystick.setPointerCapture(e.pointerId);
            atualizarStick(e.clientX, e.clientY);
        });

        joystick.addEventListener('pointermove', (e) => {
            if (e.pointerId !== joyPointerId) return;
            atualizarStick(e.clientX, e.clientY);
        });

        const soltarJoy = (e) => {
            if (e.pointerId !== joyPointerId) return;
            if (joystick.hasPointerCapture(e.pointerId)) {
                joystick.releasePointerCapture(e.pointerId);
            }
            resetarStick();
        };

        joystick.addEventListener('pointerup', soltarJoy);
        joystick.addEventListener('pointercancel', soltarJoy);
    }

    // Loop de movimento pelo joystick
    const loopMovimento = () => {
        if (vx !== 0 || vy !== 0) {
            posX += vx;
            posY += vy;
            aplicarPosicao();
        }
        requestAnimationFrame(loopMovimento);
    };
    loopMovimento();

    // ========================================================
    // 7. BOTÕES + E − DE INTENSIDADE
    // ========================================================
    const PASSO = 0.08;
    const ajustar = (delta) => {
        value += delta;
        updateOpacity();
    };

    const ligarBotao = (btn, delta) => {
        if (!btn) return;
        let intervalo = null;
        let timeout = null;

        const iniciar = (e) => {
            e.preventDefault();
            ajustar(delta);
            timeout = setTimeout(() => {
                intervalo = setInterval(() => ajustar(delta), 70);
            }, 300);
        };

        const parar = () => {
            clearTimeout(timeout);
            clearInterval(intervalo);
            timeout = null;
            intervalo = null;
        };

        btn.addEventListener('pointerdown', iniciar);
        btn.addEventListener('pointerup', parar);
        btn.addEventListener('pointerleave', parar);
        btn.addEventListener('pointercancel', parar);
    };

    ligarBotao(btnMais, PASSO);
    ligarBotao(btnMenos, -PASSO);

    // ========================================================
    // 8. CONTROLE DE MOUSE LIVRE NO DESKTOP
    // ========================================================
    const ehMouse = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    if (ehMouse) {
        document.addEventListener('pointermove', (e) => {
            if (e.pointerType !== 'mouse') return;
            if (dragAtivo) return;

            // Se o mouse estiver sobre controles ou cabeçalho, não captura
            const el = document.elementFromPoint(e.clientX, e.clientY);
            if (el && (el.closest('.simulador-header') || el.closest('.guide') || el.closest('.controles'))) {
                return;
            }

            posX = e.clientX;
            posY = e.clientY;
            aplicarPosicao();
        });
    }

    // ========================================================
    // 9. CONTROLES DE TECLADO
    // ========================================================
    document.addEventListener('keydown', (event) => {
        const passoMovimento = 16;
        switch (event.key) {
            case 'ArrowLeft':
            case 'a':
            case 'A':
                posX -= passoMovimento;
                aplicarPosicao();
                event.preventDefault();
                break;
            case 'ArrowRight':
            case 'd':
            case 'D':
                posX += passoMovimento;
                aplicarPosicao();
                event.preventDefault();
                break;
            case 'ArrowUp':
            case 'w':
            case 'W':
                posY -= passoMovimento;
                aplicarPosicao();
                event.preventDefault();
                break;
            case 'ArrowDown':
            case 's':
            case 'S':
                posY += passoMovimento;
                aplicarPosicao();
                event.preventDefault();
                break;
            case '+':
            case '=':
            case ']':
                ajustar(PASSO);
                event.preventDefault();
                break;
            case '-':
            case '_':
            case '[':
                ajustar(-PASSO);
                event.preventDefault();
                break;
        }
    });

    // Scroll do Mouse para Intensidade
    document.addEventListener('wheel', (event) => {
        value += event.deltaY < 0 ? 0.08 : -0.08;
        updateOpacity();
    }, { passive: true });
});
