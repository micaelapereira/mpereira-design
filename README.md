# MPereiraDesign

Portfolio de **Micaela Pereira**, UI/UX Designer & Front-End Developer. Es un sitio de una sola página con mis proyectos, quién soy, qué ofrezco y cómo contactarme. Lo diseñé y lo construí de punta a punta.

## Stack

- HTML5 semántico
- SCSS con partials, variables y mixins, compilado con Sass
- Bootstrap 5.3
- AOS (animaciones al hacer scroll)

## Estructura

```
index.html          la página
scss/               estilos fuente (main.scss + partials)
  utilities/        variables y mixins
  base/             estilos generales y tipografía
  layout/           nav, hero, secciones y footer
  components/       botones, collage, proyectos, carrusel, etc.
styles/styles.css   CSS compilado (lo genera Sass)
scripts/            JavaScript propio
img/                imágenes optimizadas
```

## Cómo trabajar en local

```bash
npm install          # instala Sass (solo la primera vez)
npm run watch:scss   # recompila el CSS cada vez que se guarda un .scss
```

Después se abre `index.html` con Live Server.

## Contacto

- mpereiradesigner@gmail.com
- [Behance](https://www.behance.net/mariamicaelapereira)
- [LinkedIn](https://www.linkedin.com/in/mariamicaelapereira/)
