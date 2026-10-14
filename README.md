# Punto y Raya

Traductor bidireccional de texto y código Morse internacional. Admite letras, números y signos de puntuación; las tildes se normalizan y la Ñ conserva su código Morse. Los espacios entre palabras se representan con `/`.

## Requisitos

- Node.js 18 o superior
- npm

## Desarrollo

```bash
npm install
npm run dev
```

Webpack abre la aplicación en `http://localhost:8080`.

## Pruebas y compilación

```bash
npm test
npm run build
```

La versión estática optimizada se genera en `dist/`.

## Publicación en GitHub Pages

Configura un repositorio remoto de GitHub y ejecuta `npm run deploy`. El comando compila la aplicación y publica `dist/` en la rama `gh-pages`. En la configuración del repositorio, selecciona **Settings → Pages → Deploy from a branch → gh-pages / root**.