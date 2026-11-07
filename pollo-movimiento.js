/**
 * ════════════════════════════════════════════════════════════════════════════
 * POLLO — EL MOVIMIENTO, PARA TODA LA WEB
 * ════════════════════════════════════════════════════════════════════════════
 *
 * 17/10/2026. Lo decidido en `lab-movimiento.html`, empaquetado para poder
 * usarlo en cualquier página sin volver a copiar curvas y tiempos a mano.
 *
 * ── LAS CINCO DECISIONES, Y NO MÁS ──
 *
 *   Dos curvas:   entra (llega y rebota un pelín) · sale (se va sin ceremonia)
 *   Tres tiempos: 120 ms al dedo · 260 ms al aparecer · 900 ms esperando
 *   Un gesto:     el picoteo. Quieto, salto, quieto. Sale del propio animal.
 *
 * Que sean pocas es el punto. Con veinte curvas distintas una web no parece
 * animada, parece descuidada.
 *
 * ── «NO A SACO» ──
 *
 * Miguel lo dijo así, y es la regla que gobierna este archivo. El movimiento
 * aquí solo hace tres cosas:
 *
 *   · DAR ACUSE: algo se hunde al pulsarlo, para saber que te ha oído.
 *   · ORDENAR LA LECTURA: lo que llega entra escalonado, para que se lea como
 *     una lista que se escribe y no como un parpadeo de todo a la vez.
 *   · DECIR QUE ESPERES: lo que está trabajando late o picotea.
 *
 * Lo que no hace ninguna de las tres, no se mueve. Un título no necesita
 * entrar volando.
 *
 * ── Y SE PUEDE APAGAR ──
 *
 * Todo mira `prefers-reduced-motion` del sistema y el atributo
 * `data-pollo-anim` que pone el ajuste «Movimiento» (ver pollo-config.js).
 * Quien ha dicho que no quiere movimiento, no lo tiene.
 * ════════════════════════════════════════════════════════════════════════════
 */
(function (root) {
    'use strict';

    // Sin comillas invertidas en este archivo: un bloque de CSS dentro de un
    // template literal y una comilla invertida en un comentario cierran la
    // cadena y revientan el módulo entero. Pasó cuatro veces en un día; ahora
    // lo vigila scripts/check-css-en-js.js, pero mejor no darle trabajo.
    var CSS = [
        ':root{',
          '--pollo-entra:cubic-bezier(.34,1.3,.5,1);',
          '--pollo-sale:cubic-bezier(.4,0,1,1);',
          '--pollo-toque:120ms;--pollo-aparece:260ms;--pollo-espera:900ms}',

        /* ENTRAR. `both` deja el elemento invisible ANTES de su turno: sin eso
           se ve un destello de todo y luego la cascada. */
        '@keyframes polloEntra{',
          'from{opacity:0;transform:translateY(8px) scale(.99)}',
          'to{opacity:1;transform:none}}',
        '.pollo-entra{animation:polloEntra var(--pollo-aparece) var(--pollo-entra) both;',
          'animation-delay:calc(min(var(--i,0),9) * 45ms)}',

        /* El tope de 9 no es capricho: sin él, una lista de treinta tarjetas
           tarda segundo y medio en acabar de entrar y la última parece rota. */

        /* ACUSE AL DEDO. */
        '.pollo-toque{transition:transform var(--pollo-toque) var(--pollo-entra),',
          'filter var(--pollo-toque) linear}',
        '.pollo-toque:active{transform:scale(.96);filter:brightness(.95)}',

        /* ESPERAR. */
        '@keyframes polloLate{0%,100%{opacity:1}50%{opacity:.45}}',
        '.pollo-late{animation:polloLate var(--pollo-espera) ease-in-out infinite}',

        /* EL GESTO DE LA CASA. `steps(1,end)` es lo que lo hace nuestro: un
           pájaro no interpola entre dos posturas, salta. */
        '@keyframes polloPicoteo{',
          '0%,34%{transform:translateY(0) rotate(0)}',
          '42%{transform:translateY(5px) rotate(7deg)}',
          '50%{transform:translateY(0) rotate(0)}',
          '58%,100%{transform:translateY(0) rotate(0)}}',
        '.pollo-picotea{animation:polloPicoteo var(--pollo-espera) steps(1,end) infinite}',
        '.pollo-huevo{display:inline-block;width:15px;height:19px;background:currentColor;',
          'border-radius:50% 50% 50% 50% / 62% 62% 38% 38%}',

        /* APAGARLO. El ajuste de la web y el del sistema, en ese orden. */
        '[data-pollo-anim="ninguna"] .pollo-entra,',
        '[data-pollo-anim="ninguna"] .pollo-late,',
        '[data-pollo-anim="ninguna"] .pollo-picotea{animation:none;opacity:1}',
        '[data-pollo-anim="ninguna"] .pollo-toque{transition:none}',
        '[data-pollo-anim="suave"] .pollo-entra{animation-delay:0ms}',
        '@media (prefers-reduced-motion:reduce){',
          ':root:not([data-pollo-anim="completa"]) .pollo-entra{animation:none;opacity:1}',
          ':root:not([data-pollo-anim="completa"]) .pollo-late,',
          ':root:not([data-pollo-anim="completa"]) .pollo-picotea{animation:none}}'
    ].join('');

    function estilos() {
        if (typeof document === 'undefined') return;
        if (document.getElementById('pollo-movimiento-css')) return;
        var st = document.createElement('style');
        st.id = 'pollo-movimiento-css';
        st.textContent = CSS;
        document.head.appendChild(st);
    }

    /**
     * Lo marcado con `data-entra` entra CUANDO SE VE, no al cargar.
     *
     * Si entrara todo al cargar, lo que está más abajo de la pantalla se
     * habría animado sin que nadie lo mirara, y al bajar aparecería ya puesto:
     * el trabajo de la animación tirado. Y `once` a propósito: que una tarjeta
     * vuelva a entrar cada vez que pasas por delante marea.
     */
    function observar(ambito) {
        if (typeof document === 'undefined') return;
        var nodos = (ambito || document).querySelectorAll('[data-entra]:not(.pollo-visto)');
        if (!nodos.length) return;

        // Sin IntersectionObserver (navegador viejo), se enseña y ya: nunca
        // esconder contenido detrás de una animación que quizá no llegue.
        if (!root.IntersectionObserver) {
            for (var i = 0; i < nodos.length; i++) nodos[i].classList.add('pollo-visto');
            return;
        }
        var obs = new IntersectionObserver(function (entradas) {
            for (var j = 0; j < entradas.length; j++) {
                var e = entradas[j];
                if (!e.isIntersecting) continue;
                e.target.classList.add('pollo-entra', 'pollo-visto');
                obs.unobserve(e.target);
            }
        }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

        for (var k = 0; k < nodos.length; k++) {
            nodos[k].style.setProperty('--i', k % 10);
            obs.observe(nodos[k]);
        }
    }

    root.PolloMovimiento = { CSS: CSS, estilos: estilos, observar: observar };

    if (typeof document !== 'undefined') {
        estilos();
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', function () { observar(); });
        } else { observar(); }
    }
})(typeof window !== 'undefined' ? window : globalThis);
