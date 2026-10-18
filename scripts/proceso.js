// ============================================================
// Proceso de Agenda OM — completa el Carousel y el Modal de Bootstrap
// 1. Los botones de etapa marcan cuál está activa, y el alto del
//    carrusel se ajusta suave al de la etapa nueva.
// 2. Rueda del mouse / trackpad sobre las etapas: pasa de una etapa
//    a la siguiente. En la primera y la última deja que la página
//    siga scrolleando, para que nadie quede "atrapado".
// 3. Visor: al abrir una lámina, el modal muestra esa imagen en grande.
// ============================================================

const proceso = document.querySelector("#carousel-proceso");

if (proceso) {
    const carousel = bootstrap.Carousel.getOrCreateInstance(proceso);
    const etapas = proceso.querySelectorAll(".etapa");
    const contenido = proceso.querySelector(".carousel-inner");
    const total = proceso.querySelectorAll(".carousel-item").length;
    let actual = 0;

    // Alto de una etapa que todavía está oculta (display: none)
    const medirAlto = (item) => {
        const estilo = item.style.display;
        item.style.display = "block";
        const alto = item.offsetHeight;
        item.style.display = estilo;
        return alto;
    };

    // --- 1. Etapa activa + alto ---
    proceso.addEventListener("slide.bs.carousel", (evento) => {
        actual = evento.to;
        etapas.forEach((boton, i) => {
            boton.setAttribute("aria-current", i === actual ? "true" : "false");
        });

        // Fija el alto actual en px y lo lleva al de la etapa nueva:
        // la transición de CSS hace el resto
        const altoNuevo = medirAlto(evento.relatedTarget);
        contenido.style.height = `${contenido.offsetHeight}px`;
        contenido.offsetHeight; // fuerza al navegador a registrar el alto de partida
        contenido.style.height = `${altoNuevo}px`;

        // Si veníamos de una etapa alta y el principio del carrusel quedó
        // fuera de la pantalla, la página sube hasta mostrar los botones
        const arriba = proceso.getBoundingClientRect().top;
        if (contenido.getBoundingClientRect().top < 0) {
            const sinMovimiento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
            window.scrollBy({ top: arriba - 16, behavior: sinMovimiento ? "auto" : "smooth" });
        }
    });

    // Al terminar vuelve al alto automático (por si después cambia el
    // ancho de la ventana)
    proceso.addEventListener("slid.bs.carousel", () => {
        contenido.style.height = "";
    });

    // --- 2. Rueda del mouse ---
    let bloqueado = false;
    let acumulado = 0;

    contenido.addEventListener("wheel", (evento) => {
        // Sirve tanto para la rueda (vertical) como para el trackpad (horizontal)
        const delta = Math.abs(evento.deltaX) > Math.abs(evento.deltaY) ? evento.deltaX : evento.deltaY;
        const destino = actual + (delta > 0 ? 1 : -1);

        // Si la etapa no entra entera en la pantalla (Diseñar es alta),
        // primero la página scrollea hasta mostrarla completa
        const caja = contenido.getBoundingClientRect();
        const faltaAbajo = delta > 0 && caja.bottom > window.innerHeight + 2;
        const faltaArriba = delta < 0 && caja.top < -2;
        if (faltaAbajo || faltaArriba) {
            acumulado = 0;
            return;
        }

        // En las puntas, la página sigue scrolleando normalmente
        if (destino < 0 || destino > total - 1) {
            acumulado = 0;
            return;
        }

        evento.preventDefault();
        if (bloqueado) return;

        // Ignora los movimientos mínimos del trackpad
        acumulado += delta;
        if (Math.abs(acumulado) < 30) return;

        acumulado = 0;
        bloqueado = true;
        carousel.to(destino);
    }, { passive: false });

    // Se desbloquea un rato después de terminar el deslizamiento, así la
    // inercia del trackpad no saltea etapas
    proceso.addEventListener("slid.bs.carousel", () => {
        setTimeout(() => { bloqueado = false; }, 200);
    });
}

// --- 3. Visor de láminas ---
const visor = document.querySelector("#visor");

if (visor) {
    const imagenGrande = visor.querySelector(".visor-img");

    // relatedTarget es el botón de la lámina que abrió el modal
    visor.addEventListener("show.bs.modal", (evento) => {
        const lamina = evento.relatedTarget.querySelector("img");
        imagenGrande.src = lamina.currentSrc || lamina.src;
        imagenGrande.alt = lamina.alt;
    });
}
