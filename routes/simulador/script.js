    document.addEventListener('DOMContentLoaded', () => {
        const light = document.querySelector('.light');
        const fundo = document.querySelector('.fundo1');
        const tracker = document.querySelector('.luiz');
        const joystick = document.getElementById('joystick');
        const stick = document.getElementById('joystickStick');
        const btnMais = document.getElementById('btnMais');
        const btnMenos = document.getElementById('btnMenos');

        // posição da lanterna (centro do .luiz em px)
        let posX = window.innerWidth / 2;
       let posY = window.innerHeight * 0.88;

        const aplicarPosicao = () => {
            if (!tracker) return;
            tracker.style.left = `${posX}px`;
            tracker.style.top = `${posY}px`;
            tracker.style.transform = 'translate(-50%, -50%)';
        };
        aplicarPosicao();

        // ---------- opacidade ----------
        let value = 0.5;
        const updateOpacity = () => {
            value = Math.max(0, Math.min(1, value));
            if (light) light.style.opacity = value;
            if (fundo) fundo.style.opacity = value;
        };
        updateOpacity();

        // ---------- joystick ----------
        let vx = 0;
        let vy = 0;
        const VEL_MAX = 7;
        const raioMax = 45;
        let joyPointerId = null;

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

        const soltar = (e) => {
            if (e.pointerId !== joyPointerId) return;
            if (joystick.hasPointerCapture(e.pointerId)) {
                joystick.releasePointerCapture(e.pointerId);
            }
            resetarStick();
        };
        joystick.addEventListener('pointerup', soltar);
        joystick.addEventListener('pointercancel', soltar);

        // loop de movimento
        // loop de movimento
    const loop = () => {
        if (vx !== 0 || vy !== 0) {

            // Limites horizontais
            posX = Math.max(0, Math.min(window.innerWidth, posX + vx));

            // Limites verticais
            const limiteSuperior = 60;

            // No celular impede que a lanterna chegue na área dos botões
            const limiteInferior = window.innerWidth <= 768
                ? window.innerHeight - 180
                : window.innerHeight;

            posY = Math.max(
                limiteSuperior,
                Math.min(limiteInferior, posY + vy)
            );

            aplicarPosicao();
        }

        requestAnimationFrame(loop);
    };

    loop();

        // ---------- botões opacidade ----------
        const PASSO = 0.06;
        const ajustar = (delta) => {
            value += delta;
            updateOpacity();
        };

        // suporte a click + repetição se segurar
        const ligarBotao = (btn, delta) => {
            let intervalo = null;
            let timeout = null;
            const iniciar = (e) => {
                e.preventDefault();
                ajustar(delta);
                timeout = setTimeout(() => {
                    intervalo = setInterval(() => ajustar(delta), 80);
                }, 350);
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

        const ehMouse = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    
        // ---------- setas do teclado ----------
document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowUp':
        case 'ArrowRight':
            value += 0.06;
            updateOpacity();
            event.preventDefault();
            break;

        case 'ArrowDown':
        case 'ArrowLeft':
            value -= 0.06;
            updateOpacity();
            event.preventDefault();
            break;
    }
});
        if (ehMouse) {
        document.addEventListener('pointermove', (e) => {
            if (e.pointerType !== 'mouse') return;
            posX = e.clientX;
            posY = e.clientY;
            aplicarPosicao();
        });
    }
        
        // ---------- scroll do mouse (mantido do original) ----------
        document.addEventListener('wheel', (event) => {
            value += event.deltaY < 0 ? 0.06 : -0.06;
            updateOpacity();
        }, { passive: true });

        // ---------- resize ----------
        window.addEventListener('resize', () => {
            posX = Math.min(posX, window.innerWidth);
            posY = Math.min(posY, window.innerHeight);
            aplicarPosicao();
        });
    });
