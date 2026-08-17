# Battle Tic-Tac-Toe — Zeus vs Thor v5.0.0

Un **tres en raya mitológico** ambientado como una pequeña batalla entre los panteones griego y nórdico.

La idea empezó siendo sencilla: convertir el Tic-Tac-Toe clásico en un duelo visual entre **Zeus y Thor**, representado por guerreros y dioses sobre un tablero de piedra. Con el tiempo el proyecto evolucionó hasta combinar partidas rápidas, selección y desbloqueo de personajes, progresión permanente, sonidos individuales y un pequeño **Museo de Historia y Mitología** integrado dentro del propio juego.

El objetivo sigue siendo el mismo de un tres en raya: conseguir **tres fichas en línea** antes que el rival. La diferencia es que cada ficha es ahora un personaje mitológico.

---

## Estado actual — v5.0.0

La versión 5 incorpora el sistema de Museo / códice histórico-mitológico y consolida las mecánicas introducidas durante las versiones anteriores:

- Batallas Grecia vs. mundo nórdico.
- Modo **VS CPU** y **2 Players / Local**.
- Dificultad **Easy, Medium y Hard**.
- Elección de bando y de ficha **X / O**.
- Selección de guerreros y dioses.
- Sistema permanente de **GLORY**.
- Desbloqueo progresivo de personajes.
- Indicadores **NEW / NUEVO** para contenido recién desbloqueado.
- **Random Rival**, para enfrentarse a rivales desbloqueados de forma variada.
- Sonidos propios de personajes, victoria, derrota, empate y ambiente.
- **Museo de Historia y Mitología** en español e inglés.
- Fichas de personajes con información mitológica y contexto arqueológico.
- Navegación entre personajes griegos y nórdicos desde el Museo.
- Los personajes todavía bloqueados pueden inspeccionarse como siluetas, mostrando el GLORY necesario para desbloquearlos.
- Acceso desde una ficha histórica al selector para jugar con ese personaje cuando ya está desbloqueado.
- Diseño vertical y responsive pensado especialmente para móvil.
- Progreso guardado localmente en el navegador.

---

## Ejecutar el proyecto

Necesitas Node.js y npm.

```bash
npm install
npm run dev
```

Vite mostrará la dirección local desde la que puedes abrir el juego en el navegador.

Para generar una build de producción:

```bash
npm run build
```

---

# Cómo jugar

## 1. Elige tu bando

Antes de comenzar la batalla puedes jugar del lado del:

- **Panteón griego / Zeus**
- **Panteón nórdico / Thor**

En VS CPU, el ordenador controla el panteón contrario.

También puedes elegir si quieres jugar como **X** o como **O**. X comienza la partida; si eliges O, la CPU realizará el primer movimiento.

## 2. Elige tus personajes

Las tarjetas situadas sobre el tablero muestran los guerreros seleccionados para ambos panteones.

Toca una tarjeta para abrir el selector de personajes. Desde allí puedes:

- recorrer los personajes del panteón;
- ver cuáles están bloqueados;
- equipar un personaje desbloqueado;
- consultar su descripción;
- cambiar el panteón con el que quieres jugar;
- abrir su sección de **Historia y Mitología**.

Los personajes bloqueados muestran el requisito de GLORY necesario para conseguirlos.

## 3. Empieza la batalla

El primer toque sobre el tablero confirma la configuración actual y comienza la partida.

A partir de ese momento, coloca tus personajes intentando formar una línea de tres:

- horizontal;
- vertical;
- diagonal.

La primera facción que consiga tres posiciones en línea gana la batalla.

---

# Modos de juego

## VS CPU

Permite enfrentarse a la inteligencia artificial.

Hay tres dificultades:

### EASY

La CPU comete errores con frecuencia y no siempre bloquea las jugadas del jugador.

### MEDIUM

Un equilibrio entre estrategia y errores. La CPU reconoce muchas amenazas, pero todavía puede equivocarse.

### HARD

La CPU utiliza la estrategia completa de **minimax** y bloquea las amenazas inmediatas. Es el modo más exigente.

## LOCAL — 2 Players

Dos jugadores pueden jugar desde el mismo dispositivo alternando turnos.

---

# Random Rival

En VS CPU puedes activar **Random Rival**.

Cuando está activo, el juego selecciona rivales entre los personajes desbloqueados del panteón enemigo. El sistema utiliza una especie de *shuffle bag*: intenta recorrer el conjunto de rivales disponibles antes de volver a repetirlos, evitando secuencias demasiado repetitivas.

Si Random Rival está desactivado, se utiliza el personaje rival seleccionado manualmente.

---

# GLORY y desbloqueo de personajes

**GLORY** representa el progreso permanente del jugador contra cada panteón.

Se obtiene ganando batallas **contra la CPU**.

Una particularidad importante del sistema es que el progreso corresponde al panteón que derrotas:

- si ganas jugando con los griegos contra los nórdicos, avanzas en el progreso contra el panteón nórdico y desbloqueas personajes nórdicos;
- si ganas jugando con los nórdicos contra los griegos, avanzas en el progreso contra el panteón griego y desbloqueas personajes griegos.

Cada personaje tiene su propio requisito `unlockAt`.

Cuando una victoria alcanza exactamente el requisito de un personaje, aparece una notificación de **NEW WARRIOR / NUEVO GUERRERO**. El personaje también queda marcado como **NEW / NUEVO** en las zonas correspondientes hasta que el jugador lo descubre.

El progreso se guarda mediante `localStorage`, por lo que permanece aunque cierres el navegador.

> Las victorias del modo Local no generan GLORY.

---

# Museo — Historia y Mitología

El botón **🏛️** abre el Museo.

Esta sección convierte el juego en algo más que un Tic-Tac-Toe: cada personaje funciona también como puerta de entrada a información sobre mitología, historia y arqueología.

Desde el menú del Museo puedes entrar al:

- **Panteón griego**
- **Panteón nórdico**

Cada panteón muestra su catálogo completo de personajes.

## Personajes desbloqueados

Un personaje desbloqueado muestra:

- su nombre;
- su arte utilizado en el juego;
- información mitológica / histórica;
- contexto arqueológico;
- una imagen arqueológica cuando existe;
- navegación al personaje anterior o siguiente.

Desde el arte del personaje puedes utilizar **PLAY AS THIS WARRIOR / JUGAR CON ESTE PERSONAJE** para volver al juego y abrirlo directamente en el selector.

## Personajes bloqueados

Los personajes que todavía no has conseguido también aparecen en el Museo.

Se muestran como **siluetas bloqueadas**, junto con:

- su nombre;
- un candado;
- el requisito de GLORY;
- tu progreso actual hacia el desbloqueo.

Puedes abrir su ficha para curiosear, pero el contenido histórico y arqueológico permanece bloqueado hasta conseguir el personaje.

De esta manera el Museo funciona también como una vista previa de lo que queda por descubrir.

## Navegación del Museo

Dentro de una ficha puedes usar **Previous / Next** para recorrer el catálogo.

La navegación es circular entre ambos panteones: al superar el último personaje de un panteón se continúa por el otro.

El Museo dispone además de selector **ES / EN**.

---

# Sonido

El juego utiliza distintos efectos de audio para dar identidad a cada batalla:

- sonido individual de cada guerrero o dios;
- victoria;
- derrota;
- empate;
- ambiente;
- cambio de página / Museo;
- selección de personajes.

El botón de audio permite silenciar globalmente los sonidos y la música ambiental.

Los archivos se encuentran principalmente en:

```text
src/assets/sounds/
```

---

# Arte y personajes

Los personajes utilizan imágenes transparentes, pensadas para funcionar como fichas dentro de las nueve casillas.

Los recursos se encuentran principalmente en:

```text
src/assets/players/
```

Para añadir un personaje nuevo no basta únicamente con colocar su PNG: también debe incorporarse a la configuración del panteón correspondiente y, si tendrá ficha de Museo, a sus datos de traducción / lore.

La estructura actual separa estos datos en archivos bajo:

```text
src/data/warriors/
src/data/lore/
src/data/ui/
```

---

# Ajustar la posición del tablero

El tablero visual forma parte de la ilustración de fondo. Encima existe una cuadrícula HTML transparente y responsive.

La calibración principal está en `src/style.css`, dentro de `.scene`:

```css
--board-left: 15.35%;
--board-top: 33.25%;
--board-width: 67.75%;
--board-height: 33.20%;
```

Estas cuatro variables controlan la posición y tamaño de la cuadrícula interactiva sobre el tablero de piedra.

Si se modifica la ilustración principal, probablemente habrá que recalibrarlas.

---

# Guardado local

El juego utiliza `localStorage` para conservar varias preferencias y datos entre sesiones, incluyendo:

- progreso de GLORY;
- guerreros seleccionados;
- preferencia de Random Rival;
- personajes ya reconocidos como nuevos;
- idioma;
- contenido del Museo ya visitado.

No necesita una base de datos ni una cuenta de usuario para mantener este progreso en el mismo navegador.

---

# Evolución del proyecto

## v0.1 — Prototipo

Primera versión funcional del Tic-Tac-Toe.

- Tablero básico.
- Lógica de X/O.
- Primer enfrentamiento jugador vs. CPU.

## v0.2 — Escenario Zeus vs Thor

El juego adopta por primera vez su identidad visual mitológica.

- Escenario vertical Zeus vs Thor.
- Tablero HTML transparente superpuesto sobre el tablero de piedra.
- Escalado responsive.
- Primeras fichas visuales.
- Primeros efectos de sonido.

## v1.x — Batalla mitológica

La idea deja de ser solamente un Tic-Tac-Toe tematizado.

- Hoplita vs. Ulfsark como enfrentamiento inicial.
- Sonidos de batalla.
- Marcadores.
- Pantallas de victoria, derrota y empate.
- Mejoras de IA y presentación.

## v2.x — Panteones y progresión

El juego comienza a convertirse en una colección de personajes.

- Nuevos guerreros y dioses.
- Sistema de desbloqueos.
- GLORY.
- Selección de bando y personajes.
- Persistencia del progreso.
- Indicadores de personajes nuevos.

## v3.0.0 — Personalización y demo

Se consolida la selección previa a la batalla.

- Elección independiente de bando y X/O.
- Selector de dificultad.
- Mejoras importantes en la interfaz móvil.
- Acceso de demostración / God Mode para mostrar el catálogo.
- Mejoras en los selectores y avisos de desbloqueo.

## v4.x — Batallas más dinámicas

La selección de rivales y la presentación de la partida evolucionan.

- Random Rival.
- Variación de rivales desbloqueados.
- Mejoras de rendimiento móvil.
- Indicadores visuales del bando actual.
- Refinamiento de audio, animaciones y controles.

## v5.0.0 — Museo de Historia y Mitología

El juego incorpora una capa educativa y de colección.

- Museo accesible desde la pantalla principal.
- Catálogos griego y nórdico.
- Fichas mitológicas e históricas.
- Contexto arqueológico.
- Imágenes arqueológicas.
- Español e inglés.
- Indicadores de nuevo contenido.
- Vista previa de personajes bloqueados.
- Requisitos de GLORY visibles.
- Navegación continua entre ambos panteones.
- Acceso desde el Museo al selector para jugar con personajes desbloqueados.

---

# Filosofía del juego

**Zeus vs Thor** está pensado como un juego pequeño, rápido y fácil de entender.

No intenta convertir el Tic-Tac-Toe en un juego excesivamente complejo. La idea es conservar partidas que duran pocos minutos y utilizar la progresión, el arte, los personajes y el Museo para dar motivos para seguir jugando.

La estructura gira alrededor de tres acciones:

**PLAY → UNLOCK → DISCOVER**

1. **Play** — juega batallas rápidas.
2. **Unlock** — consigue GLORY y desbloquea nuevos personajes.
3. **Discover** — entra al Museo y descubre la historia, mitología y arqueología asociadas a ellos.

Así, ganar una partida no solo aumenta un contador: también puede abrir una nueva pieza del mundo mitológico del juego.

---

## Tecnologías

- React
- TypeScript
- Vite
- CSS
- HTML5 Audio
- `localStorage`
- Minimax para la IA

---

## Autor

**Diego Mongay González — @pasoveoleo**

2026
