# Battle Tic-Tac-Toe — Zeus vs Thor v0.2

## Ejecutar

```bash
npm install
npm run dev
```

## Qué cambió en v0.2

- El juego ahora usa el escenario vertical Zeus vs Thor.
- El tablero HTML es transparente y está superpuesto sobre el tablero de piedra de la ilustración.
- La superposición es responsive: imagen y casillas escalan juntas en móvil.
- La lógica original de tres en raya sigue intacta.
- Si no existen las imágenes de las fichas, se muestran X/O temporales.

## Ajustar el tablero

En `src/style.css`, dentro de `.scene`, están las únicas cuatro variables necesarias para calibrar la cuadrícula:

```css
--board-left: 15.35%;
--board-top: 33.25%;
--board-width: 67.75%;
--board-height: 33.20%;
```

## Fichas personalizadas

Coloca las imágenes aquí:

- `src/assets/players/player1.png` → Zeus
- `src/assets/players/player2.png` → Thor

Idealmente usa PNG/WebP con fondo transparente y ambos personajes con una escala visual parecida.

## Sonido

Para el sonido al colocar una ficha:

- `src/assets/sounds/place.mp3`
