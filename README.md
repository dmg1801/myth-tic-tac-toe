# Zeus vs Thor — Mythic Tic-Tac-Toe

**Version 6.0.0**

A mythological battle built on Tic-Tac-Toe, combining quick matches, character progression and an integrated museum of mythology, history and archaeology.

Zeus vs Thor began as a simple idea: turn a classic 3×3 game into a confrontation between the Greek and Norse worlds. It evolved into a small game system in which playing, unlocking characters and discovering their historical and mythological background are connected.

> **PLAY → UNLOCK → DISCOVER**

## Core features

- Greek vs Norse mythological battles.
- VS CPU and local 2-player modes.
- Easy, Medium and Hard difficulty.
- Choose your pantheon and whether to play first or second.
- Character selection for both factions.
- Player-side perspective: the chosen faction occupies the player's side of the arena.
- Random Rival system.
- Persistent GLORY progression and progressive character unlocks.
- NEW / NUEVO indicators for newly unlocked content.
- Character-specific sounds plus battle and ambient audio.
- Spanish / English interface.
- Responsive interface designed primarily for mobile play.
- Local progress persistence through `localStorage`.

## How to play

Form a horizontal, vertical or diagonal line of three characters before your opponent. Before battle you can choose the Greek or Norse side, select warriors and configure whether you play first or second.

## GLORY and unlocks

GLORY is earned through victories against the CPU. Progress is associated with the pantheon you defeat: defeating Norse opponents advances Norse unlocks; defeating Greek opponents advances Greek unlocks. Characters have individual unlock requirements and newly unlocked content is marked NEW / NUEVO.

Local two-player victories do not award GLORY.

## Museum — History, Mythology & Archaeology

The Museum connects progression with historical discovery. Greek and Norse catalogues contain character artwork, mythology/history, archaeological context, archaeological images and bilingual object captions.

Locked characters remain visible as silhouettes with their names and GLORY requirements, while their historical and archaeological content remains locked. Navigation continues across both pantheons, and unlocked warriors can be taken directly from their Museum entry back to character selection.

## Game modes

**VS CPU:** Easy deliberately makes mistakes; Medium balances strategy and errors; Hard uses minimax and immediate threat blocking.

**Local — 2 Players:** two players alternate turns on the same device. Local matches do not contribute to GLORY.

## Random Rival

When enabled in VS CPU mode, Random Rival chooses among unlocked enemy characters while avoiding excessive immediate repetition.

## Project structure

```text
src/assets/players/
src/assets/sounds/
src/data/warriors/
src/data/lore/
src/data/ui/
```

Museum content is separated from the core game logic so it can be expanded progressively.

## Board calibration

The transparent HTML grid is positioned over the arena artwork in `src/style.css`, under `.scene`:

```css
--board-left: 15.35%;
--board-top: 33.25%;
--board-width: 67.75%;
--board-height: 33.20%;
```

## Run locally

```bash
npm install
npm run dev
```

Production:

```bash
npm run build
npm run preview
```

## Version history

### v6.0.0 — Perspective, Museum polish & archaeological captions
- Player-side faction perspective refined across the arena and character UI.
- Greek and Norse character orientation follows their current side.
- Museum navigation and locked-character discovery polished.
- Archaeological images support individual bilingual object captions.
- Global Spanish / English presentation consolidated.

### v5.0.0 — Museum
Integrated History and Mythology Museum, Greek/Norse catalogues, archaeological context and images, locked previews, continuous navigation and Museum-to-character-selection interaction.

### v4.x — Battle refinement
Random Rival, mobile performance improvements, current-side indicators and audio/control refinement.

### v3.0.0 — Personalization & demo
Independent faction and X/O selection, difficulty selector, mobile UI improvements and demonstration/God Mode.

### v2.x — Pantheons & progression
Expanded rosters, GLORY, progressive unlocks and persistent progress.

### v1.x — Mythological battle
Hoplite vs Ulfsark foundation, battle audio, scores, results and AI improvements.

### v0.2 — Zeus vs Thor arena
Vertical mythological arena, responsive board overlay and first visual pieces.

### v0.1 — Prototype
Basic 3×3 rules and first player-vs-CPU implementation.

## Copyright and licensing

Copyright © 2026 Diego Mongay González. All rights reserved.

This project is **not open source**. Public access to source code does not grant permission to copy, modify, redistribute, rebrand, sublicense or create derivative projects from the original software or original project content.

See `LICENSE` for the complete notice.

Third-party materials — including archaeological photographs, fonts, audio, libraries, frameworks, trademarks and externally sourced works — remain subject to the rights and licenses of their respective owners.

## Author

**Diego Mongay González**  
2026
