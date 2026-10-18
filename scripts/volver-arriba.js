// ============================================================
// Botón "volver arriba": aparece cuando el hero sale de la pantalla
// y se esconde cuando el hero vuelve a verse.
// IntersectionObserver avisa cuándo un elemento entra o sale de la
// pantalla, sin tener que escuchar cada movimiento del scroll.
// ============================================================

const botonArriba = document.querySelector(".volver-arriba");
const hero = document.querySelector(".hero");

if (botonArriba && hero) {
    const observador = new IntersectionObserver(([entrada]) => {
        botonArriba.classList.toggle("visible", !entrada.isIntersecting);
    });

    observador.observe(hero);
}
