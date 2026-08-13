import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';
import boardImage from './assets/boards/zeus-thor-board.png';
import player1Image from './assets/players/player1.png';
import player2Image from './assets/players/player2.png';

import athenaImage from './assets/players/athena.png';
import minotaurImage from './assets/players/minotaur.png';
import hadesImage from './assets/players/hades.png';
import zeusImage from './assets/players/zeus.png';

import freyaImage from './assets/players/freya.png';
import frostGiantImage from './assets/players/frost-giant.png';
import helaImage from './assets/players/hela.png';
import thorImage from './assets/players/thor.png';

import hopliteSound from './assets/sounds/hoplite.mp3';
import ulfsarkSound from './assets/sounds/ulfsark.mp3';
import victorySound from './assets/sounds/victory.mp3';
import athenaSound from './assets/sounds/athena.mp3';
import minotaurSound from './assets/sounds/minotaur.mp3';
import hadesSound from './assets/sounds/hades.mp3';
import zeusSound from './assets/sounds/zeus.mp3';
import frostGiantSound from './assets/sounds/frost-giant.mp3';
import helSound from './assets/sounds/hel.mp3';
import thorSound from './assets/sounds/thor.mp3';
import freyaSound from './assets/sounds/freya.mp3';

import defeatSound from './assets/sounds/defeat.mp3';
import drawSound from './assets/sounds/draw.mp3';
import ambienceSound from './assets/sounds/ambience.mp3';

import pageSound from './assets/sounds/page.mp3';

type Player = 'X' | 'O';
type Cell = Player | null;
type Army = 'ZEUS' | 'THOR';

const ZEUS: Army = 'ZEUS';
const THOR: Army = 'THOR';

const GLORY_STORAGE_KEY = 'zeus-vs-thor-glory-v1';
const UNLOCK_LEVELS = [1, 3, 5, 10] as const;

type Warrior = {
  id: string;
  name: string;
  title: string;
  description: string;
  unlockAt: number;
  image: string;
  sound: string;
};

const ZEUS_WARRIORS: Warrior[] = [
  {
    id: 'hoplite',
    name: 'HOPLITE',
    title: 'WARRIOR OF ANCIENT GREECE',
    description: 'Hoplites were heavily armed Greek infantrymen who fought in close formation, protected by large shields and armed with spears.',
    unlockAt: 0,
    image: player1Image,
    sound: hopliteSound,
  },
  {
    id: 'athena',
    name: 'ATHENA',
    title: 'GODDESS OF WISDOM',
    description: 'Daughter of Zeus and patron goddess of Athens. Athena embodied wisdom, strategy and disciplined warfare.',
    unlockAt: 1,
    image: athenaImage,
    sound: athenaSound,
  },
  {
    id: 'minotaur',
    name: 'MINOTAUR',
    title: 'BEAST OF THE LABYRINTH',
    description: 'A mythical creature with the body of a man and the head of a bull, confined within the Labyrinth of Crete.',
    unlockAt: 3,
    image: minotaurImage,
    sound: minotaurSound,
  },
  {
    id: 'hades',
    name: 'HADES',
    title: 'LORD OF THE UNDERWORLD',
    description: 'Brother of Zeus and Poseidon. After the gods divided the cosmos, Hades became ruler of the Underworld and the realm of the dead.',
    unlockAt: 5,
    image: hadesImage,
    sound: hadesSound,
  },
  {
    id: 'zeus',
    name: 'ZEUS',
    title: 'KING OF THE GODS',
    description: 'Ruler of the Olympian gods and master of thunder and lightning. Zeus overthrew the Titans and ruled from Mount Olympus.',
    unlockAt: 10,
    image: zeusImage,
    sound: zeusSound,
  },
];

const THOR_WARRIORS: Warrior[] = [
  {
    id: 'ulfsark',
    name: 'ULFSARK',
    title: 'WOLF WARRIOR',
    description: 'The úlfhéðnar appear in Old Norse tradition as warriors associated with wolves and Odin, often compared with berserkers.',
    unlockAt: 0,
    image: player2Image,
    sound: ulfsarkSound,
  },
  {
    id: 'freya',
    name: 'FREYJA',
    title: 'GODDESS OF LOVE AND WAR',
    description: 'A powerful Norse goddess associated with love, fertility, magic and battle. Freyja receives half of those who fall in combat.',
    unlockAt: 1,
    image: freyaImage,
    sound: freyaSound,
  },
  {
    id: 'frost-giant',
    name: 'FROST GIANT',
    title: 'JÖTUNN OF THE NORTH',
    description: 'The jötnar are powerful beings of Norse mythology, frequently opposed to the gods and tied to the wild forces of the cosmos.',
    unlockAt: 3,
    image: frostGiantImage,
    sound: frostGiantSound,
  },
  {
    id: 'hela',
    name: 'HEL',
    title: 'RULER OF THE DEAD',
    description: 'Daughter of Loki and ruler of the realm also called Hel. She receives many of those who die from sickness or old age.',
    unlockAt: 5,
    image: helaImage,
    sound: helSound,
  },
  {
    id: 'thor',
    name: 'THOR',
    title: 'GOD OF THUNDER',
    description: 'Son of Odin and one of the mightiest Norse gods. Thor protects gods and humans and wields the famous hammer Mjölnir.',
    unlockAt: 10,
    image: thorImage,
    sound: thorSound,
  },
];

type GloryProgress = {
  zeusWins: number;
  thorWins: number;
};

type UnlockNotice = {
  army: Army;
  wins: number;
  slot: number;
} | null;

function loadGloryProgress(): GloryProgress {
  try {
    const saved = localStorage.getItem(GLORY_STORAGE_KEY);
    if (!saved) return { zeusWins: 0, thorWins: 0 };

    const parsed = JSON.parse(saved);
    return {
      zeusWins: Number.isFinite(parsed.zeusWins) ? parsed.zeusWins : 0,
      thorWins: Number.isFinite(parsed.thorWins) ? parsed.thorWins : 0,
    };
  } catch {
    return { zeusWins: 0, thorWins: 0 };
  }
}

const wins = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
];

const getWinner = (board: Cell[]) => {
  for (const [a, b, c] of wins) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) return board[a];
  }
  return null;
};

function getWinningLine(board: Cell[]): number[] | null {
  for (const [a, b, c] of wins) {
    if (
      board[a] &&
      board[a] === board[b] &&
      board[a] === board[c]
    ) {
      return [a, b, c];
    }
  }

  return null;
}

const emptyCells = (board: Cell[]) =>
  board.map((cell, index) => cell === null ? index : -1).filter(index => index !== -1);

function immediateMove(board: Cell[], player: Player) {
  for (const index of emptyCells(board)) {
    const test = [...board];
    test[index] = player;
    if (getWinner(test) === player) return index;
  }
  return null;
}

function minimax(
  board: Cell[],
  maximizing: boolean,
  computerPlayer: Player,
  humanPlayer: Player,
  depth = 0
): number {
  const winner = getWinner(board);
  if (winner === computerPlayer) return 10 - depth;
  if (winner === humanPlayer) return depth - 10;
  if (board.every(Boolean)) return 0;

  const scores = emptyCells(board).map(index => {
    const next = [...board];
    next[index] = maximizing ? computerPlayer : humanPlayer;
    return minimax(next, !maximizing, computerPlayer, humanPlayer, depth + 1);
  });

  return maximizing ? Math.max(...scores) : Math.min(...scores);
}

function chooseComputerMove(
  board: Cell[],
  computerPlayer: Player,
  humanPlayer: Player
) {
  const winningMove = immediateMove(board, computerPlayer);
  if (winningMove !== null) return winningMove;

  const blockingMove = immediateMove(board, humanPlayer);

  // Thor/Zeus no bloquea siempre. A veces ve la amenaza y a veces se equivoca,
  // para que el jugador tenga oportunidades reales de cerrar una línea.
  const BLOCK_CHANCE = 0.72;
  if (blockingMove !== null && Math.random() < BLOCK_CHANCE) {
    return blockingMove;
  }

  const scored = emptyCells(board)
    .map(index => {
      const next = [...board];
      next[index] = computerPlayer;
      return {
        index,
        score: minimax(next, false, computerPlayer, humanPlayer),
      };
    })
    .sort((a, b) => b.score - a.score);

  const bestScore = scored[0].score;
  const bestMoves = scored.filter(move => move.score === bestScore);
  const MISTAKE_CHANCE = 0.55;

  if (Math.random() < MISTAKE_CHANCE && scored.length > 1) {
    let mistakes = scored.filter(move => move.score < bestScore);

    // Si había una amenaza inmediata y la IA decidió no verla,
    // excluimos esa casilla de su pool de errores.
    if (blockingMove !== null) {
      mistakes = mistakes.filter(move => move.index !== blockingMove);
    }

    if (mistakes.length > 0) {
      return mistakes[Math.floor(Math.random() * mistakes.length)].index;
    }
  }

  return bestMoves[Math.floor(Math.random() * bestMoves.length)].index;
}

function playSound(src: string, volume = 0.6) {
  const audio = new Audio(src);
  audio.volume = volume;

  audio.play().catch(error => {
    console.log('No se pudo reproducir el sonido:', error);
  });
}

function App() {
  const [board, setBoard] = useState<Cell[]>(Array(9).fill(null));
  const [turn, setTurn] = useState<Player>('X');
  const [thinking, setThinking] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [boardIntro, setBoardIntro] = useState(true);
  const [battleStarted, setBattleStarted] = useState(false);

  const ambienceRef = useRef<HTMLAudioElement | null>(null);
  const [musicStarted, setMusicStarted] = useState(false);
  const [musicMuted, setMusicMuted] = useState(false);

  const [zeusScore, setZeusScore] = useState(0);
  const [thorScore, setThorScore] = useState(0);
  const [drawScore, setDrawScore] = useState(0);
  const resultCounted = useRef(false);

  // Progreso permanente: se conserva aunque cierres el navegador.
  const [glory, setGlory] = useState<GloryProgress>(() => loadGloryProgress());
  const [unlockNotice, setUnlockNotice] = useState<UnlockNotice>(null);

  const [selectedZeusWarrior, setSelectedZeusWarrior] = useState(0);
  const [selectedThorWarrior, setSelectedThorWarrior] = useState(0);
  const [warriorPreviewIndex, setWarriorPreviewIndex] = useState(0);
  const [showWarriorSelector, setShowWarriorSelector] = useState(false);
  const [selectorArmy, setSelectorArmy] = useState<Army>(ZEUS);

  const zeusTotalWins = glory.zeusWins;
  const thorTotalWins = glory.thorWins;

  const equippedZeusWarrior = ZEUS_WARRIORS[selectedZeusWarrior];
  const equippedThorWarrior = THOR_WARRIORS[selectedThorWarrior];

  // Dos decisiones independientes:
  // 1) ejército: Zeus/Hoplita o Thor/Ulfsark
  // 2) ficha: X (primero) u O (segundo)
  const [humanArmy, setHumanArmy] = useState<Army>(ZEUS);
  const [humanMark, setHumanMark] = useState<Player>('X');

  const computerArmy: Army = humanArmy === ZEUS ? THOR : ZEUS;
  const computerMark: Player = humanMark === 'X' ? 'O' : 'X';

  const currentWarriors = selectorArmy === ZEUS ? ZEUS_WARRIORS : THOR_WARRIORS;
  const currentWins = selectorArmy === ZEUS ? zeusTotalWins : thorTotalWins;
  const equippedWarriorIndex = selectorArmy === ZEUS ? selectedZeusWarrior : selectedThorWarrior;
  const previewWarrior = currentWarriors[warriorPreviewIndex] ?? currentWarriors[0];
  const previewUnlocked = currentWins >= previewWarrior.unlockAt;
  const previewEquipped = equippedWarriorIndex === warriorPreviewIndex;

  const winner = getWinner(board);
  const draw = !winner && board.every(Boolean);
  const gameOver = Boolean(winner || draw);
  const winningLine = getWinningLine(board);

  function armyForMark(mark: Player): Army {
    return mark === humanMark ? humanArmy : computerArmy;
  }

 function soundForArmy(army: Army) {
  return army === ZEUS
    ? equippedZeusWarrior.sound
    : equippedThorWarrior.sound;
}

  function volumeForArmy(army: Army) {
   return 0.18;
  }

  useEffect(() => {
    if (!gameOver || resultCounted.current) return;

    resultCounted.current = true;

   if (winner) {
  const winningArmy = armyForMark(winner);

  // El marcador normal cuenta quién ganó la batalla,
  // sea el jugador o la computadora.
  if (winningArmy === ZEUS) {
    setZeusScore(score => score + 1);
  } else {
    setThorScore(score => score + 1);
  }

  // GLORY SOLO se obtiene cuando gana el jugador humano.
  if (winner === humanMark) {
    setGlory(current => {
      const nextWins =
        humanArmy === ZEUS
          ? current.zeusWins + 1
          : current.thorWins + 1;

      const next: GloryProgress =
        humanArmy === ZEUS
          ? { ...current, zeusWins: nextWins }
          : { ...current, thorWins: nextWins };

      localStorage.setItem(
        GLORY_STORAGE_KEY,
        JSON.stringify(next)
      );

      // ¿Esta victoria acaba de desbloquear un guerrero?
      const unlockIndex = UNLOCK_LEVELS.indexOf(
        nextWins as typeof UNLOCK_LEVELS[number]
      );

      if (unlockIndex !== -1) {
        setUnlockNotice({
          army: humanArmy,
          wins: nextWins,
          slot: unlockIndex + 1,
        });
      }

      return next;
    });
  }
} else if (draw) {
      setDrawScore(score => score + 1);
    }
  }, [gameOver, winner, draw, humanArmy, humanMark]);

  useEffect(() => {
    const audio = new Audio(ambienceSound);
    audio.loop = true;
    audio.volume = 0.05;
    ambienceRef.current = audio;

    return () => {
      audio.pause();
      ambienceRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!gameOver) {
      setShowResult(false);
      return;
    }

    const timer = window.setTimeout(() => {
      setShowResult(true);

      if (winner === humanMark) {
        playSound(victorySound, 0.45);
      } else if (winner === computerMark) {
        playSound(defeatSound, 0.45);
      } else if (draw) {
        playSound(drawSound, 0.45);
      }
    }, 1200);

    return () => window.clearTimeout(timer);
  }, [winner, draw, gameOver, humanMark, computerMark]);

  useEffect(() => {
    // La IA no puede empezar hasta que el jugador haya confirmado la batalla
    // tocando el tablero. Así siempre puedes cambiar ejército y X/O tras NEW BATTLE.
    if (!battleStarted || turn !== computerMark || gameOver) {
      setThinking(false);
      return;
    }

    setThinking(true);
    const delay = 1000 + Math.random() * 400;

    const timer = window.setTimeout(() => {
      setBoard(currentBoard => {
        if (getWinner(currentBoard) || currentBoard.every(Boolean)) return currentBoard;

        const move = chooseComputerMove(currentBoard, computerMark, humanMark);
        const next = [...currentBoard];
        next[move] = computerMark;

        playSound(soundForArmy(computerArmy), volumeForArmy(computerArmy));
        return next;
      });

      setTurn(humanMark);
      setThinking(false);
    }, delay);

    return () => window.clearTimeout(timer);
  }, [battleStarted, turn, gameOver, computerMark, humanMark, computerArmy]);

  function startAmbience() {
    const audio = ambienceRef.current;
    if (!audio || musicStarted) return;

    audio.play()
      .then(() => setMusicStarted(true))
      .catch((error: any) => {
        console.log('No se pudo iniciar la música:', error);
      });
  }

  function toggleMusic() {
    const audio = ambienceRef.current;
    if (!audio) return;

    if (!musicStarted) {
      audio.play()
        .then(() => {
          setMusicStarted(true);
          setMusicMuted(false);
        })
        .catch(() => {});
      return;
    }

    audio.muted = !audio.muted;
    setMusicMuted(audio.muted);
  }

  function play(index: number) {
    if (thinking || board[index] || gameOver) return;

    // El primer toque confirma ejército + X/O y comienza la batalla.
    if (!battleStarted) {
      startAmbience();
      setBoardIntro(false);
      setBattleStarted(true);

      // Si elegiste O, el primer toque solo da comienzo a la batalla:
      // la IA, que es X, hará la primera jugada.
      if (humanMark === 'O') {
        setTurn('X');
        return;
      }
    }

    if (turn !== humanMark) return;

    const next = [...board];
    next[index] = humanMark;
    setBoard(next);

    playSound(soundForArmy(humanArmy), volumeForArmy(humanArmy));

    if (!getWinner(next) && !next.every(Boolean)) {
      setTurn(computerMark);
    }
  }

  function reset() {
    setBoard(Array(9).fill(null));
    setTurn('X');
    setThinking(false);
    setShowResult(false);
    setBoardIntro(true);
    setBattleStarted(false);
    setUnlockNotice(null);
    resultCounted.current = false;
  }

  function startNewBattle() {
    reset();
  }

 function previousWarrior() {
  if (battleStarted) return;

  const newIndex =
    warriorPreviewIndex <= 0
      ? currentWarriors.length - 1
      : warriorPreviewIndex - 1;

  setWarriorPreviewIndex(newIndex);

  const warrior = currentWarriors[newIndex];
  const unlocked = currentWins >= warrior.unlockAt;

  if (unlocked) {
    playSound(warrior.sound, 0.18);
  } else {
    playSound(pageSound, 0.15);
  }
}

function nextWarrior() {
  if (battleStarted) return;

  const newIndex =
    warriorPreviewIndex >= currentWarriors.length - 1
      ? 0
      : warriorPreviewIndex + 1;

  setWarriorPreviewIndex(newIndex);

  const warrior = currentWarriors[newIndex];
  const unlocked = currentWins >= warrior.unlockAt;

  if (unlocked) {
    playSound(warrior.sound, 0.18);
  } else {
    playSound(pageSound, 0.15);
  }
}

  function equipPreviewWarrior() {
    if (battleStarted || !previewUnlocked) return;

    if (selectorArmy === ZEUS) {
      setSelectedZeusWarrior(warriorPreviewIndex);
    } else {
      setSelectedThorWarrior(warriorPreviewIndex);
    }

    playSound(previewWarrior.sound, 0.18);
  }

  function openWarriorSelector(army: Army) {
    if (battleStarted) return;
    setSelectorArmy(army);
    setWarriorPreviewIndex(army === ZEUS ? selectedZeusWarrior : selectedThorWarrior);
    setShowWarriorSelector(true);
  }

  function resetProgress() {
    const confirmed = window.confirm(
      'Reset all Glory and warrior unlock progress? This cannot be undone.'
    );

    if (!confirmed) return;

    const emptyProgress = { zeusWins: 0, thorWins: 0 };
    localStorage.setItem(GLORY_STORAGE_KEY, JSON.stringify(emptyProgress));
    setGlory(emptyProgress);
    setSelectedZeusWarrior(0);
    setSelectedThorWarrior(0);
    setWarriorPreviewIndex(0);
    setUnlockNotice(null);
    playSound(soundForArmy(humanArmy), 0.16);
  }

  function selectArmy(army: Army) {
    if (battleStarted) return;
    setHumanArmy(army);
    playSound(soundForArmy(army), 0.35);
  }

  function selectMark(mark: Player) {
    if (battleStarted) return;
    setHumanMark(mark);

    // Feedback corto usando el sonido del ejército seleccionado.
    playSound(soundForArmy(humanArmy), 0.22);
  }

  const winnerArmy = winner ? armyForMark(winner) : null;

  const status = winnerArmy
    ? winnerArmy === ZEUS ? 'Zeus Victory' : 'Thor Victory'
    : draw
      ? 'DRAW'
      : !battleStarted
        ? humanMark === 'X' ? 'Choose your side · You play first' : 'Choose your side · You play second'
        : thinking
          ? computerArmy === ZEUS ? 'Zeus is thinking…' : 'Thor is thinking…'
          : 'Your turn';

  const resultTitle = winner
    ? winner === humanMark
      ? 'YOU WON'
      : 'YOU HAVE BEEN DEFEATED'
    : 'DRAW';

  const resultClass = winner === humanMark
    ? 'victory'
    : winner === computerMark
      ? 'defeat'
      : 'draw';

  const resultSymbol = winnerArmy === ZEUS ? '⚡' : winnerArmy === THOR ? 'ᚦ' : '⚔';

  return (
    <main>
      <section className="scene" aria-label="Tablero mitológico Zeus contra Thor">
        <img
          className="scene-image"
          src={boardImage}
          alt="Escenario mitológico de Zeus contra Thor"
        />

        <button
          className="music-button"
          onClick={toggleMusic}
          aria-label={musicMuted ? 'Activar música' : 'Silenciar música'}
        >
          {musicMuted ? '🔇' : '🔊'}
        </button>

        <h1 className="scene-title">
          <span className="title-zeus">ZEUS</span>
          <span className="title-vs">vs</span>
          <span className="title-thor">THOR</span>
        </h1>

        <div className={`scene-status ${thinking ? 'thinking' : ''}`}>
          {status}
        </div>

        <div className={`player-selector ${battleStarted ? 'locked' : ''}`}>
          <button
            className={`player-choice ${humanArmy === ZEUS ? 'selected zeus' : ''}`}
            onClick={() => selectArmy(ZEUS)}
            disabled={battleStarted}
          >
            ⚡ GREEKS
          </button>

          <button
            className={`player-choice ${humanArmy === THOR ? 'selected thor' : ''}`}
            onClick={() => selectArmy(THOR)}
            disabled={battleStarted}
          >
            NORSE 🔨
          </button>

          <button
            className={`player-choice ${humanMark === 'X' ? 'selected zeus' : ''}`}
            onClick={() => selectMark('X')}
            disabled={battleStarted}
            aria-label="Jugar primero como X"
          >
            X · FIRST
          </button>

          <button
            className={`player-choice ${humanMark === 'O' ? 'selected thor' : ''}`}
            onClick={() => selectMark('O')}
            disabled={battleStarted}
            aria-label="Jugar segundo como O"
          >
            O · SECOND
          </button>
        </div>

        <div className={`battle-warriors ${battleStarted ? 'locked' : ''}`}>
          <button
            className={`battle-warrior-card zeus ${humanArmy === ZEUS ? 'human' : 'enemy'}`}
            onClick={() => openWarriorSelector(ZEUS)}
            disabled={battleStarted}
            aria-label={`Change Greek warrior. Current warrior: ${equippedZeusWarrior.name}`}
          >
            <span className="battle-warrior-role">
              {humanArmy === ZEUS ? 'YOUR WARRIOR' : 'ENEMY WARRIOR'}
            </span>
            <img src={equippedZeusWarrior.image} alt="" />
            <span className="battle-warrior-name">{equippedZeusWarrior.name}</span>
            <strong>CHANGE ›</strong>
          </button>

          <div className="battle-warriors-vs">VS</div>

          <button
            className={`battle-warrior-card thor ${humanArmy === THOR ? 'human' : 'enemy'}`}
            onClick={() => openWarriorSelector(THOR)}
            disabled={battleStarted}
            aria-label={`Change Norse warrior. Current warrior: ${equippedThorWarrior.name}`}
          >
            <span className="battle-warrior-role">
              {humanArmy === THOR ? 'YOUR WARRIOR' : 'ENEMY WARRIOR'}
            </span>
            <img src={equippedThorWarrior.image} alt="" />
            <span className="battle-warrior-name">{equippedThorWarrior.name}</span>
            <strong>CHANGE ›</strong>
          </button>
        </div>

        <div className="score score-zeus">{zeusScore}</div>
        <div className="score score-draw">{drawScore}</div>
        <div className="score score-thor">{thorScore}</div>

        <div className={`board-hitbox ${thinking ? 'locked' : ''}`}>
          {board.map((value, index) => {
            const pieceArmy = value ? armyForMark(value) : null;

            return (
              <button
                className={`cell ${
                  boardIntro
                    ? 'cell-intro'
                    : value === null && !gameOver
                      ? 'cell-empty'
                      : ''
                }`}
                key={index}
                onClick={() => play(index)}
                disabled={thinking || gameOver || Boolean(value) || (battleStarted && turn !== humanMark)}
                aria-label={`Casilla ${index + 1}`}
              >
                {value && pieceArmy && (
                  <>
                    <span
                      className={`
                        mark-background
                        ${pieceArmy === ZEUS ? 'mark-zeus' : 'mark-thor'}
                      `}
                      aria-hidden="true"
                    >
                      {value}
                    </span>

                    <img
                      className={`
                        piece-image
                        piece-enter
                        ${winningLine?.includes(index)
                          ? pieceArmy === ZEUS
                            ? 'winner-zeus'
                            : 'winner-thor'
                          : ''
                        }
                      `}
                      src={
                        pieceArmy === ZEUS
                          ? equippedZeusWarrior.image
                          : equippedThorWarrior.image
                      }
                      alt={
                        pieceArmy === ZEUS
                          ? equippedZeusWarrior.name
                          : equippedThorWarrior.name
                      }
                    />
                  </>
                )}
              </button>
            );
          })}
        </div>

        {showWarriorSelector && (
          <div
            className="warrior-modal-backdrop"
            onClick={() => setShowWarriorSelector(false)}
          >
            <div
              className={`warrior-modal ${selectorArmy === ZEUS ? 'zeus' : 'thor'}`}
              role="dialog"
              aria-modal="true"
              aria-label="Warrior selection"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                className="warrior-modal-close"
                onClick={() => setShowWarriorSelector(false)}
                aria-label="Close warrior selector"
              >
                ×
              </button>

              <div className="warrior-modal-faction">
                {selectorArmy === ZEUS ? '⚡ GREEK PANTHEON' : 'NORSE PANTHEON 🔨'}
              </div>

              <button
                className="warrior-modal-arrow left"
                onClick={previousWarrior}
                aria-label="Previous warrior"
              >
                ‹
              </button>

              <button
                className={`warrior-modal-image-button ${
                  !previewUnlocked ? 'locked' : ''
                }`}
                onClick={() => {
                  if (!previewUnlocked) return;
                  equipPreviewWarrior();
                  setShowWarriorSelector(false);
                }}
                disabled={!previewUnlocked}
                aria-label={
                  previewUnlocked
                    ? `Equip ${previewWarrior.name}`
                    : `${previewWarrior.name} locked`
                }
              >
                <img
                  className={`warrior-modal-image ${
                    !previewUnlocked ? 'locked' : ''
                  }`}
                  src={previewWarrior.image}
                  alt={previewWarrior.name}
                />

                {!previewUnlocked && (
                  <div className="warrior-modal-lock">🔒</div>
                )}

                {previewEquipped && (
                  <div className="warrior-modal-equipped">✓ EQUIPPED</div>
                )}
              </button>

              <button
                className="warrior-modal-arrow right"
                onClick={nextWarrior}
                aria-label="Next warrior"
              >
                ›
              </button>

              <h2>{previewWarrior.name}</h2>
              <div className="warrior-modal-title">{previewWarrior.title}</div>

              <p className="warrior-modal-description">
                {previewWarrior.description}
              </p>

              {!previewUnlocked ? (
                <div className="warrior-modal-requirement">
                  <strong>🔒 REQUIRES {previewWarrior.unlockAt} WINS</strong>
                  <span>{currentWins} / {previewWarrior.unlockAt}</span>
                  <div className="warrior-modal-progress">
                    <div
                      style={{
                        width: `${Math.min(
                          100,
                          (currentWins / previewWarrior.unlockAt) * 100
                        )}%`
                      }}
                    />
                  </div>
                </div>
              ) : previewEquipped ? (
                <div className="warrior-modal-hint equipped">READY FOR BATTLE</div>
              ) : (
                <div className="warrior-modal-hint">TAP THE WARRIOR TO EQUIP</div>
              )}

              <div className="warrior-modal-footer">
                <span className="warrior-modal-counter">
                  {warriorPreviewIndex + 1} / {currentWarriors.length}
                </span>

                <button
                  className="modal-reset-progress"
                  onClick={resetProgress}
                  title="Reset Glory and unlocks"
                >
                  ↺ RESET PROGRESS
                </button>
              </div>
            </div>
          </div>
        )}
       

        {showResult && (
          <div className="result-backdrop">
            <div className={`result-panel ${resultClass}`} role="dialog" aria-live="assertive">
              <div className="result-symbol">{resultSymbol}</div>
              <div className="result-ornament">◆ ━ ◆ ━ ◆</div>
              <h2>{resultTitle}</h2>
              <p>
                {winner === humanMark
                  ? 'Your warriors dominate the field.'
                  : winner === computerMark
                    ? 'The enemy has broken your lines.'
                    : 'Neither side claims victory.'}
              </p>

              {unlockNotice && (() => {
                const unlockedWarrior =
                  (unlockNotice.army === ZEUS ? ZEUS_WARRIORS : THOR_WARRIORS)[unlockNotice.slot];

                return unlockedWarrior ? (
                  <div className={`unlock-notice ${unlockNotice.army === ZEUS ? 'zeus' : 'thor'}`}>
                    <div className="unlock-icon">🔓</div>
                    <strong>NEW WARRIOR UNLOCKED</strong>
                    <img
                      className="unlock-warrior-image"
                      src={unlockedWarrior.image}
                      alt={unlockedWarrior.name}
                    />
                    <div className="unlock-warrior-name">{unlockedWarrior.name}</div>
                    <span>{unlockNotice.wins} WINS</span>
                  </div>
                ) : null;
              })()}

              <button className="new-battle" onClick={startNewBattle}>NEW BATTLE</button>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}

createRoot(document.getElementById('root')!).render(<App />);