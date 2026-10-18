// ============================================================
// Inicialización de AOS (Animate On Scroll): las imágenes suben
// y aparecen suavemente al entrar en pantalla, una sola vez.
// Si el usuario pidió "reducir movimiento", AOS no se activa y
// todo se ve desde el principio.
// ============================================================
AOS.init({
    duration: 800,
    easing: "ease",
    once: true,
    offset: 60,
    disable: () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
});
