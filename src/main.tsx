import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';
import boardImage from './assets/boards/board.png';
import player1Image from './assets/players/hoplita.png';
import player2Image from './assets/players/ulfsark.png';

import athenaImage from './assets/players/athena.png';
import minotaurImage from './assets/players/minotaur.png';
import hadesImage from './assets/players/hades.png';
import zeusImage from './assets/players/zeus.png';

import freyaImage from './assets/players/freya.png';
import frostGiantImage from './assets/players/frost-giant.png';
import helaImage from './assets/players/hela.png';
import thorImage from './assets/players/thor.png';

import forsetiImage from './assets/players/forseti.png';
import lokiImage from './assets/players/loki.png';
import odinImage from './assets/players/odin.png';
import skadiImage from './assets/players/skadi.png';
import valkyrieImage from './assets/players/valkiria.png';

import aphroditeImage from './assets/players/afrodita.png';
import poseidonImage from './assets/players/poseidon.png';
import demeterImage from './assets/players/demeter.png';
import hermesImage from './assets/players/hermes.png';
import hestaImage from './assets/players/hestia.png';

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
import aphroditeSound from './assets/sounds/afrodita.mp3';
import demeterSound from './assets/sounds/demeter.mp3';
import hermesSound from './assets/sounds/hermes.mp3';
import hestaSound from './assets/sounds/hestia.mp3';
import poseidonSound from './assets/sounds/poseidon.mp3';
import lokiSound from './assets/sounds/loki.mp3';
import skadiSound from './assets/sounds/skadi.mp3';
import odinSound from './assets/sounds/odin.mp3';
import valkyrieSound from './assets/sounds/valkiria.mp3';
import forsetiSound from './assets/sounds/forseti.mp3';
import defeatSound from './assets/sounds/defeat.mp3';
import drawSound from './assets/sounds/draw.mp3';
import ambienceSound from './assets/sounds/ambience.mp3';

import pageSound from './assets/sounds/page.mp3';
import { loreEntriesEN } from './data/lore/en';
import { loreEntriesES } from './data/lore/es';
import { uiTextEN } from './data/ui/en';
import { uiTextES } from './data/ui/es';
import { warriorI18nEN } from './data/warriors/en';
import { warriorI18nES } from './data/warriors/es';
import { THOR_WARRIORS } from './data/warriors/thor';
import { ZEUS_WARRIORS } from './data/warriors/zeus';
import type { Warrior } from './data/warriors/types';

type Player = 'X' | 'O';
type Cell = Player | null;
type Army = 'ZEUS' | 'THOR';
type Difficulty = 'EASY' | 'MEDIUM' | 'HARD';
type GameMode = 'CPU' | 'LOCAL';
type Language = 'EN' | 'ES';

const ZEUS: Army = 'ZEUS';
const THOR: Army = 'THOR';

const GLORY_STORAGE_KEY = 'zeus-vs-thor-glory-v2';
const GOD_MODE_CODE = 'OLYMPUS';
const WARRIOR_SELECTION_STORAGE_KEY = 'zeus-vs-thor-warrior-selection-v1';
const RANDOM_RIVAL_STORAGE_KEY = 'zeus-vs-thor-random-rival-v1';
const ACKNOWLEDGED_WARRIORS_STORAGE_KEY = 'zeus-vs-thor-acknowledged-warriors-v2';
const LANGUAGE_STORAGE_KEY = 'zeus-vs-thor-language-v1';

type LoreEntry = {
  title: { EN: string; ES: string };
  subtitle: { EN: string; ES: string };
  mythology: { EN: string; ES: string };
  archaeology: { EN: string; ES: string };
  archaeologicalImage?: string;
  artifact?: {
    name?: { EN: string; ES: string };
    date?: string;
    culture?: { EN: string; ES: string };
    museum?: string;
    inventory?: string;
    sourceUrl?: string;
  };
};

const UI_TEXT = {
  EN: uiTextEN,
  ES: uiTextES,
} as const;




const WARRIOR_I18N: Record<string, {
  name: { EN: string; ES: string };
  title: { EN: string; ES: string };
  description: { EN: string; ES: string };
}> = Object.fromEntries(
  Array.from(new Set([...Object.keys(warriorI18nEN), ...Object.keys(warriorI18nES)])).map((key) => [
    key,
    {
      name: {
        EN: warriorI18nEN[key]?.name ?? warriorI18nES[key].name,
        ES: warriorI18nES[key]?.name ?? warriorI18nEN[key].name,
      },
      title: {
        EN: warriorI18nEN[key]?.title ?? warriorI18nES[key].title,
        ES: warriorI18nES[key]?.title ?? warriorI18nEN[key].title,
      },
      description: {
        EN: warriorI18nEN[key]?.description ?? warriorI18nES[key].description,
        ES: warriorI18nES[key]?.description ?? warriorI18nEN[key].description,
      },
    },
  ])
);

const LORE_ENTRIES: Partial<Record<string, LoreEntry>> = {
  zeus: {
    title: { EN: loreEntriesEN.zeus.title, ES: loreEntriesES.zeus.title },
    subtitle: { EN: loreEntriesEN.zeus.subtitle, ES: loreEntriesES.zeus.subtitle },
    mythology: {
      EN: loreEntriesEN.zeus.mythology,
      ES: loreEntriesES.zeus.mythology,
    },
    archaeology: {
      EN: loreEntriesEN.zeus.archaeology,
      ES: loreEntriesES.zeus.archaeology,
    },
  },
  thor: {
    title: { EN: loreEntriesEN.thor.title, ES: loreEntriesES.thor.title },
    subtitle: { EN: loreEntriesEN.thor.subtitle, ES: loreEntriesES.thor.subtitle },
    mythology: {
      EN: loreEntriesEN.thor.mythology,
      ES: loreEntriesES.thor.mythology,
    },
    archaeology: {
      EN: loreEntriesEN.thor.archaeology,
      ES: loreEntriesES.thor.archaeology,
    },
  },
};


type GloryProgress = {
  zeusWins: number;
  thorWins: number;
};

type AcknowledgedWarriors = {
  zeus: number[];
  thor: number[];
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
  humanPlayer: Player,
  difficulty: Difficulty
) {
  const winningMove = immediateMove(board, computerPlayer);
  if (winningMove !== null) return winningMove;

  const blockingMove = immediateMove(board, humanPlayer);

  const settings = {
    EASY: { blockChance: 0.35, mistakeChance: 0.82 },
    MEDIUM: { blockChance: 0.72, mistakeChance: 0.55 },
    HARD: { blockChance: 1, mistakeChance: 0 },
  }[difficulty];

  if (blockingMove !== null && Math.random() < settings.blockChance) {
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

  if (Math.random() < settings.mistakeChance && scored.length > 1) {
    let mistakes = scored.filter(move => move.score < bestScore);

    if (blockingMove !== null) {
      mistakes = mistakes.filter(move => move.index !== blockingMove);
    }

    if (mistakes.length > 0) {
      return mistakes[Math.floor(Math.random() * mistakes.length)].index;
    }
  }

  return bestMoves[Math.floor(Math.random() * bestMoves.length)].index;
}


function loadSavedWarriorSelection(
  warriors: Warrior[],
  wins: number,
  army: 'zeus' | 'thor'
): number {
  try {
    const saved = localStorage.getItem(WARRIOR_SELECTION_STORAGE_KEY);

    if (!saved) return 0;

    const parsed = JSON.parse(saved);
    const savedId = parsed[army];

    const index = warriors.findIndex(
      warrior => warrior.id === savedId
    );

    if (index === -1) return 0;

    // Si ya no está desbloqueado, volvemos al guerrero inicial.
    if (wins < warriors[index].unlockAt) return 0;

    return index;
  } catch {
    return 0;
  }
}


function loadRandomRivalPreference(): boolean {
  try {
    const saved = localStorage.getItem(RANDOM_RIVAL_STORAGE_KEY);
    if (saved === null) return true;
    return saved === 'true';
  } catch {
    return true;
  }
}


function loadLanguage(): Language {
  try {
    const saved = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    return saved === 'ES' ? 'ES' : 'EN';
  } catch {
    return 'EN';
  }
}

function App() {
  const [board, setBoard] = useState<Cell[]>(Array(9).fill(null));
  const [turn, setTurn] = useState<Player>('X');
  const [thinking, setThinking] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [boardIntro, setBoardIntro] = useState(true);
  const [battleStarted, setBattleStarted] = useState(false);
  const [gameMode, setGameMode] = useState<GameMode>('CPU');
  const [difficulty, setDifficulty] = useState<Difficulty>('MEDIUM');
  const [showDifficulty, setShowDifficulty] = useState(false);
  const [randomRival, setRandomRival] = useState<boolean>(() => loadRandomRivalPreference());
  const [randomEnemyWarrior, setRandomEnemyWarrior] = useState<Warrior | null>(null);

  // Shuffle Bag: recorremos todos los rivales desbloqueados antes de
  // volver a barajar. Así evitamos patrones tipo Freya → Loki → Freya → Loki.
  const randomEnemyBagRef = useRef<string[]>([]);
  const randomEnemyPoolSignatureRef = useRef('');
  const lastRandomEnemyIdRef = useRef<string | null>(null);

  const ambienceRef = useRef<HTMLAudioElement | null>(null);
  const [musicStarted, setMusicStarted] = useState(false);
  const [soundMuted, setSoundMuted] = useState(false);
  const soundMutedRef = useRef(false);

  const [zeusScore, setZeusScore] = useState(0);
  const [thorScore, setThorScore] = useState(0);
  const [drawScore, setDrawScore] = useState(0);
  const resultCounted = useRef(false);

  // Progreso permanente: se conserva aunque cierres el navegador.
  const [glory, setGlory] = useState<GloryProgress>(() => loadGloryProgress());
  const [unlockNotice, setUnlockNotice] = useState<UnlockNotice>(null);
  const [acknowledgedWarriors, setAcknowledgedWarriors] = useState<AcknowledgedWarriors>(() => {
    try {
      const saved = localStorage.getItem(ACKNOWLEDGED_WARRIORS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : { zeus: [0], thor: [0] };
    } catch {
      return { zeus: [0], thor: [0] };
    }
  });

 const [selectedZeusWarrior, setSelectedZeusWarrior] = useState(() =>
  loadSavedWarriorSelection(
    ZEUS_WARRIORS,
    glory.zeusWins,
    'zeus'
  )
);

const [selectedThorWarrior, setSelectedThorWarrior] = useState(() =>
  loadSavedWarriorSelection(
    THOR_WARRIORS,
    glory.thorWins,
    'thor'
  )
);
  const [warriorPreviewIndex, setWarriorPreviewIndex] = useState(0);
  const [showWarriorSelector, setShowWarriorSelector] = useState(false);
  const [selectorArmy, setSelectorArmy] = useState<Army>(ZEUS);
  const [language, setLanguage] = useState<Language>(() => loadLanguage());
  const t = UI_TEXT[language];

  const warriorText = (warrior: Warrior) => {
    const translated = WARRIOR_I18N[warrior.id];
    return translated
      ? {
          name: translated.name[language],
          title: translated.title[language],
          description: translated.description[language],
        }
      : {
          name: warrior.name,
          title: warrior.title,
          description: warrior.description,
        };
  };

  const [showCodex, setShowCodex] = useState(false);
  const [codexArmy, setCodexArmy] = useState<Army>(ZEUS);
  const [selectedLoreWarriorId, setSelectedLoreWarriorId] = useState<string | null>(null);
  const [codexReturnToRoster, setCodexReturnToRoster] = useState(false);

  // Demo-only developer access. Never modifies the player's saved GLORY.
  const [godMode, setGodMode] = useState(false);
  const [showGodModeLogin, setShowGodModeLogin] = useState(false);
  const [godModeCode, setGodModeCode] = useState('');
  const [godModeError, setGodModeError] = useState(false);

  const zeusTotalWins = godMode ? 20 : glory.zeusWins;
  const thorTotalWins = godMode ? 20 : glory.thorWins;

  const equippedZeusWarrior = ZEUS_WARRIORS[selectedZeusWarrior];
  const equippedThorWarrior = THOR_WARRIORS[selectedThorWarrior];

  const newZeusWarriors = ZEUS_WARRIORS
    .map((warrior, index) => ({ warrior, index }))
    .filter(({ warrior, index }) =>
      index > 0 &&
      zeusTotalWins >= warrior.unlockAt &&
      !acknowledgedWarriors.zeus.includes(index)
    )
    .map(({ index }) => index);

  const newThorWarriors = THOR_WARRIORS
    .map((warrior, index) => ({ warrior, index }))
    .filter(({ warrior, index }) =>
      index > 0 &&
      thorTotalWins >= warrior.unlockAt &&
      !acknowledgedWarriors.thor.includes(index)
    )
    .map(({ index }) => index);

  const unlockedWarrior = unlockNotice
    ? (unlockNotice.army === ZEUS ? ZEUS_WARRIORS : THOR_WARRIORS)[unlockNotice.slot]
    : null;

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

  const codexWarriors = codexArmy === ZEUS ? ZEUS_WARRIORS : THOR_WARRIORS;
  const codexWins = codexArmy === ZEUS ? zeusTotalWins : thorTotalWins;
  const loreWarrior = codexWarriors.find(w => w.id === selectedLoreWarriorId) ?? null;
  const loreEntry = loreWarrior ? LORE_ENTRIES[loreWarrior.id] : undefined;


  const winner = getWinner(board);
  const draw = !winner && board.every(Boolean);
  const gameOver = Boolean(winner || draw);
  const winningLine = getWinningLine(board);

  const AUDIO_VOLUME = {
  ambience: 0.05,

  warrior: 0.14,
  warriorPreview: 0.12,

  victory: 0.25,
  defeat: 0.25,
  draw: 0.22,

  page: 0.10,
  selection: 0.12,
  godMode: 0.20,
} as const;

  function playSound(src: string, volume = 0.6) {
  if (soundMutedRef.current) return;

  const audio = new Audio(src);
  audio.volume = volume;

  audio.play().catch(error => {
    console.log('No se pudo reproducir el sonido:', error);
  });
}

  function armyForMark(mark: Player): Army {
    return mark === humanMark ? humanArmy : computerArmy;
  }

 function soundForArmy(army: Army) {
  return army === ZEUS
    ? equippedZeusWarrior.sound
    : equippedThorWarrior.sound;
}

  function volumeForArmy(army: Army) {
   return AUDIO_VOLUME.warrior;
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
   if (gameMode === 'CPU') {
  setGlory(current => {
    // GLORY representa el progreso CONTRA cada panteón.
    // Si ganas con los griegos, avanzas/desbloqueas nórdicos;
    // si ganas con los nórdicos, avanzas/desbloqueas griegos.
    const defeatedArmy = computerArmy;

    const nextWins =
      defeatedArmy === ZEUS
        ? current.zeusWins + 1
        : current.thorWins + 1;

    const next: GloryProgress =
      defeatedArmy === ZEUS
        ? { ...current, zeusWins: nextWins }
        : { ...current, thorWins: nextWins };

    localStorage.setItem(
      GLORY_STORAGE_KEY,
      JSON.stringify(next)
    );

    // ¿Esta victoria acaba de desbloquear un guerrero?
    const warriors =
      defeatedArmy === ZEUS ? ZEUS_WARRIORS : THOR_WARRIORS;

    const unlockIndex = warriors.findIndex(
      warrior => warrior.unlockAt === nextWins
    );

    if (unlockIndex !== -1) {
      setUnlockNotice({
        army: defeatedArmy,
        wins: nextWins,
        slot: unlockIndex,
      });
    }

    return next;
  });
}
  }
} else if (draw) {
      setDrawScore(score => score + 1);
    }
  }, [gameOver, winner, draw, humanArmy, humanMark, computerArmy, gameMode]);

  useEffect(() => {
    const audio = new Audio(ambienceSound);
    audio.loop = true;
    audio.volume = AUDIO_VOLUME.ambience;
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
        playSound(victorySound, AUDIO_VOLUME.victory);
      } else if (winner === computerMark) {
        playSound(defeatSound, AUDIO_VOLUME.defeat);
      } else if (draw) {
        playSound(drawSound, AUDIO_VOLUME.draw);
      }
    }, 1200);

    return () => window.clearTimeout(timer);
  }, [winner, draw, gameOver, humanMark, computerMark]);

  useEffect(() => {
    // La IA no puede empezar hasta que el jugador haya confirmado la batalla
    // tocando el tablero. Así siempre puedes cambiar ejército y X/O tras NEW BATTLE.
   if (
        gameMode !== 'CPU' ||
        !battleStarted ||
        turn !== computerMark ||
        gameOver
      ) {
        setThinking(false);
        return;
      }

    setThinking(true);
    const delay = 1000 + Math.random() * 400;

    const timer = window.setTimeout(() => {
      setBoard((currentBoard: any[]) => {
        if (getWinner(currentBoard) || currentBoard.every(Boolean)) return currentBoard;

        const move = chooseComputerMove(currentBoard, computerMark, humanMark, difficulty);
        const next = [...currentBoard];
        next[move] = computerMark;

       playSound(
        randomRival && randomEnemyWarrior
          ? randomEnemyWarrior.sound
          : soundForArmy(computerArmy),
        AUDIO_VOLUME.warrior
      );
        return next;
      });

      setTurn(humanMark);
      setThinking(false);
    }, delay);

    return () => window.clearTimeout(timer);
  }, [gameMode,
  battleStarted,
  turn,
  gameOver,
  computerMark,
  humanMark,
  computerArmy,
  difficulty]);

  function startAmbience() {
    const audio = ambienceRef.current;
    if (!audio || musicStarted) return;

    audio.play()
      .then(() => setMusicStarted(true))
      .catch((error: any) => {
        console.log('No se pudo iniciar la música:', error);
      });
  }

  function toggleSound() {
  const nextMuted = !soundMutedRef.current;

  soundMutedRef.current = nextMuted;
  setSoundMuted(nextMuted);

  const ambience = ambienceRef.current;

  if (ambience) {
    ambience.muted = nextMuted;
  }

  // Si todavía no había empezado la música,
  // activarla al pulsar 🔊.
  if (!nextMuted && ambience && !musicStarted) {
    ambience.play()
      .then(() => setMusicStarted(true))
      .catch(() => {});
  }
}

 function play(index: number) {
  if (thinking || board[index] || gameOver) return;

  // El primer toque confirma la configuración y comienza la batalla.
  if (!battleStarted) {
  startAmbience();
  setBoardIntro(false);
  setBattleStarted(true);

  if (gameMode === 'CPU' && humanMark === 'O') {
    setTurn('X');
    return;
  }
}

  // =========================
  // LOCAL 2 PLAYERS
  // =========================
  if (gameMode === 'LOCAL') {
    const next = [...board];
    next[index] = turn;

    setBoard(next);

    const currentArmy = armyForMark(turn);

    playSound(
      soundForArmy(currentArmy),
      volumeForArmy(currentArmy)
    );

    if (!getWinner(next) && !next.every(Boolean)) {
      setTurn(current => current === 'X' ? 'O' : 'X');
    }

    return;
  }

  // =========================
  // VS CPU
  // =========================
  if (turn !== humanMark) return;

  const next = [...board];
  next[index] = humanMark;
  setBoard(next);

  playSound(
    soundForArmy(humanArmy),
    volumeForArmy(humanArmy)
  );

  if (!getWinner(next) && !next.every(Boolean)) {
    setTurn(computerMark);
  }
}

  function acknowledgeWarrior(army: Army, slot: number) {
    setAcknowledgedWarriors(current => {
      const key = army === ZEUS ? 'zeus' : 'thor';
      const next = {
        ...current,
        [key]: current[key].includes(slot) ? current[key] : [...current[key], slot],
      };
      localStorage.setItem(ACKNOWLEDGED_WARRIORS_STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }

  function viewUnlockedWarrior() {
    if (!unlockNotice) return;
    const { army, slot } = unlockNotice;
    reset();
    setSelectorArmy(army);
    setWarriorPreviewIndex(slot);
    setShowWarriorSelector(true);
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
    playSound(warrior.sound, AUDIO_VOLUME.warriorPreview);
  } else {
    playSound(pageSound, AUDIO_VOLUME.page);
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
    playSound(warrior.sound, AUDIO_VOLUME.warriorPreview);
  } else {
    playSound(pageSound, AUDIO_VOLUME.page);
  }
}

  function equipPreviewWarrior() {
  if (battleStarted || !previewUnlocked) return;

  if (selectorArmy === ZEUS) {
    setSelectedZeusWarrior(warriorPreviewIndex);
  } else {
    setSelectedThorWarrior(warriorPreviewIndex);
  }

  // Guardar los IDs de los guerreros actualmente seleccionados.
  try {
    const saved = localStorage.getItem(WARRIOR_SELECTION_STORAGE_KEY);

    const currentSelection = saved
      ? JSON.parse(saved)
      : {
          zeus: ZEUS_WARRIORS[0].id,
          thor: THOR_WARRIORS[0].id,
        };

    const nextSelection = {
      ...currentSelection,
      [selectorArmy === ZEUS ? 'zeus' : 'thor']: previewWarrior.id,
    };

    localStorage.setItem(
      WARRIOR_SELECTION_STORAGE_KEY,
      JSON.stringify(nextSelection)
    );
  } catch {
    // Si localStorage falla, simplemente seguimos jugando.
  }

  // Si el jugador equipa manualmente una ficha del bando rival,
  // su elección tiene prioridad sobre RANDOM RIVAL.
  if (gameMode === 'CPU' && selectorArmy === computerArmy) {
    setRandomRival(false);
    setRandomEnemyWarrior(null);

    try {
      localStorage.setItem(RANDOM_RIVAL_STORAGE_KEY, 'false');
    } catch {
      // Si localStorage falla, la selección manual sigue funcionando.
    }
  }

  acknowledgeWarrior(selectorArmy, warriorPreviewIndex);
  playSound(previewWarrior.sound, AUDIO_VOLUME.warriorPreview);
}

  function playAsPreviewSide() {
    if (
      battleStarted ||
      gameMode !== 'CPU' ||
      !previewUnlocked ||
      selectorArmy === humanArmy
    ) {
      return;
    }

    // Equipamos el guerrero que el jugador está viendo.
    if (selectorArmy === ZEUS) {
      setSelectedZeusWarrior(warriorPreviewIndex);
    } else {
      setSelectedThorWarrior(warriorPreviewIndex);
    }

    // Conservamos la selección para futuras sesiones.
    try {
      const saved = localStorage.getItem(WARRIOR_SELECTION_STORAGE_KEY);

      const currentSelection = saved
        ? JSON.parse(saved)
        : {
            zeus: ZEUS_WARRIORS[0].id,
            thor: THOR_WARRIORS[0].id,
          };

      localStorage.setItem(
        WARRIOR_SELECTION_STORAGE_KEY,
        JSON.stringify({
          ...currentSelection,
          [selectorArmy === ZEUS ? 'zeus' : 'thor']: previewWarrior.id,
        })
      );
    } catch {
      // Si localStorage falla, el cambio sigue funcionando en esta sesión.
    }

    acknowledgeWarrior(selectorArmy, warriorPreviewIndex);

    // El panteón que estamos viendo pasa a ser el bando del jugador.
    // RANDOM RIVAL conserva su preferencia; el useEffect existente
    // preparará automáticamente un rival del panteón contrario.
    randomEnemyBagRef.current = [];
    setRandomEnemyWarrior(null);
    setHumanArmy(selectorArmy);

    playSound(previewWarrior.sound, AUDIO_VOLUME.selection);
    setShowWarriorSelector(false);
  }

  function changeLanguage(next: Language) {
    setLanguage(next);
    localStorage.setItem(LANGUAGE_STORAGE_KEY, next);
  }

  function openCodex(army: Army) {
    if (battleStarted) return;
    setCodexArmy(army);
    setSelectedLoreWarriorId(null);
    setCodexReturnToRoster(false);
    setShowDifficulty(false);
    setShowCodex(true);
    playSound(pageSound, AUDIO_VOLUME.page);
  }

  function openPreviewLore() {
    if (!previewUnlocked) return;
    setCodexArmy(selectorArmy);
    setSelectedLoreWarriorId(previewWarrior.id);
    playSound(previewWarrior.sound, AUDIO_VOLUME.selection);
    setCodexReturnToRoster(true);
    setShowWarriorSelector(false);
    setShowCodex(true);
    playSound(pageSound, AUDIO_VOLUME.page);
  }

  function openLoreWarrior(warrior: Warrior) {
    setSelectedLoreWarriorId(warrior.id);
    playSound(warrior.sound, AUDIO_VOLUME.selection);
  }

  function moveLore(direction: -1 | 1) {
    if (!loreWarrior) return;

    const unlocked = codexWarriors.filter(warrior => codexWins >= warrior.unlockAt);
    const currentIndex = unlocked.findIndex(warrior => warrior.id === loreWarrior.id);
    if (currentIndex === -1) return;

    const nextIndex = currentIndex + direction;
    if (nextIndex < 0 || nextIndex >= unlocked.length) return;

    openLoreWarrior(unlocked[nextIndex]);
  }

  function closeCodex() {
    setShowCodex(false);
    setSelectedLoreWarriorId(null);
    if (codexReturnToRoster) setShowWarriorSelector(true);
    setCodexReturnToRoster(false);
  }

  function backFromLore() {
    if (codexReturnToRoster) {
      closeCodex();
    } else {
      setSelectedLoreWarriorId(null);
    }
  }

  function openWarriorSelector(army: Army) {
    if (battleStarted) return;

    const pendingNew = army === ZEUS ? newZeusWarriors : newThorWarriors;
    const equippedIndex = army === ZEUS ? selectedZeusWarrior : selectedThorWarrior;
    const indexToShow = pendingNew.length > 0
      ? pendingNew[pendingNew.length - 1]
      : equippedIndex;

    setSelectorArmy(army);
    setWarriorPreviewIndex(indexToShow);
    setShowWarriorSelector(true);
  }

  function resetProgress() {
    const confirmed = window.confirm(t.resetConfirmation);

    if (!confirmed) return;

    const emptyProgress = { zeusWins: 0, thorWins: 0 };
    localStorage.setItem(GLORY_STORAGE_KEY, JSON.stringify(emptyProgress));
    setGlory(emptyProgress);
    setSelectedZeusWarrior(0);
    setSelectedThorWarrior(0);
    setWarriorPreviewIndex(0);
    setUnlockNotice(null);
    setAcknowledgedWarriors({ zeus: [0], thor: [0] });
    localStorage.removeItem(ACKNOWLEDGED_WARRIORS_STORAGE_KEY);
    localStorage.removeItem(WARRIOR_SELECTION_STORAGE_KEY);
    playSound(soundForArmy(humanArmy), AUDIO_VOLUME.selection);
  }

  function selectArmy(army: Army) {
    if (battleStarted) return;
    setHumanArmy(army);
    playSound(soundForArmy(army), AUDIO_VOLUME.selection);
  }

  function selectMark(mark: Player) {
    if (battleStarted) return;
    setHumanMark(mark);

    // Feedback corto usando el sonido del ejército seleccionado.
    playSound(soundForArmy(humanArmy), AUDIO_VOLUME.selection);
  }

  function chooseRandomEnemy(force = false) {
    if (gameMode !== 'CPU' || (!randomRival && !force)) {
      setRandomEnemyWarrior(null);
      return;
    }

    const warriors =
      computerArmy === ZEUS
        ? ZEUS_WARRIORS
        : THOR_WARRIORS;

    const wins =
      computerArmy === ZEUS
        ? zeusTotalWins
        : thorTotalWins;

    const unlockedWarriors = warriors.filter(
      warrior => wins >= warrior.unlockAt
    );

    if (unlockedWarriors.length === 0) {
      randomEnemyBagRef.current = [];
      randomEnemyPoolSignatureRef.current = '';
      lastRandomEnemyIdRef.current = null;
      setRandomEnemyWarrior(null);
      return;
    }

    const poolSignature = unlockedWarriors
      .map(warrior => warrior.id)
      .sort()
      .join('|');

    // Fisher-Yates. Si empieza una ronda nueva, evitamos que el último
    // rival de la ronda anterior vuelva a ser el primero.
    const buildShuffledBag = () => {
      const ids = unlockedWarriors.map(warrior => warrior.id);

      for (let i = ids.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [ids[i], ids[j]] = [ids[j], ids[i]];
      }

      if (
        ids.length > 1 &&
        lastRandomEnemyIdRef.current &&
        ids[0] === lastRandomEnemyIdRef.current
      ) {
        const swapIndex = ids.findIndex(
          id => id !== lastRandomEnemyIdRef.current
        );

        if (swapIndex > 0) {
          [ids[0], ids[swapIndex]] = [ids[swapIndex], ids[0]];
        }
      }

      return ids;
    };

    // Si cambió el roster desbloqueado (por ejemplo acabas de desbloquear
    // Frost Giant), reconstruimos la bolsa para incluirlo inmediatamente.
    if (
      randomEnemyPoolSignatureRef.current !== poolSignature ||
      randomEnemyBagRef.current.length === 0
    ) {
      randomEnemyPoolSignatureRef.current = poolSignature;
      randomEnemyBagRef.current = buildShuffledBag();
    }

    const nextEnemyId = randomEnemyBagRef.current.shift();

    if (!nextEnemyId) {
      setRandomEnemyWarrior(null);
      return;
    }

    const nextEnemy = unlockedWarriors.find(
      warrior => warrior.id === nextEnemyId
    );

    if (!nextEnemy) {
      randomEnemyBagRef.current = [];
      chooseRandomEnemy(force);
      return;
    }

    lastRandomEnemyIdRef.current = nextEnemy.id;
    setRandomEnemyWarrior(nextEnemy);
  }

  function toggleRandomRival() {
    if (gameMode !== 'CPU' || battleStarted) return;

    const nextRandom = !randomRival;

    // Al apagar RANDOM, conservamos como selección manual el rival
    // que estaba visible. Así la tarjeta no cambia de golpe.
    if (!nextRandom && randomEnemyWarrior) {
      const warriors =
        computerArmy === ZEUS
          ? ZEUS_WARRIORS
          : THOR_WARRIORS;

      const selectedIndex = warriors.findIndex(
        warrior => warrior.id === randomEnemyWarrior.id
      );

      if (selectedIndex !== -1) {
        if (computerArmy === ZEUS) {
          setSelectedZeusWarrior(selectedIndex);
        } else {
          setSelectedThorWarrior(selectedIndex);
        }

        try {
          const saved = localStorage.getItem(WARRIOR_SELECTION_STORAGE_KEY);
          const currentSelection = saved
            ? JSON.parse(saved)
            : {
                zeus: ZEUS_WARRIORS[0].id,
                thor: THOR_WARRIORS[0].id,
              };

          localStorage.setItem(
            WARRIOR_SELECTION_STORAGE_KEY,
            JSON.stringify({
              ...currentSelection,
              [computerArmy === ZEUS ? 'zeus' : 'thor']:
                randomEnemyWarrior.id,
            })
          );
        } catch {
          // La selección sigue funcionando aunque falle localStorage.
        }
      }
    }

    setRandomRival(nextRandom);

    try {
      localStorage.setItem(
        RANDOM_RIVAL_STORAGE_KEY,
        String(nextRandom)
      );
    } catch {
      // La preferencia seguirá activa durante esta sesión.
    }

    if (nextRandom) {
      randomEnemyBagRef.current = [];
      chooseRandomEnemy(true);
    } else {
      setRandomEnemyWarrior(null);
    }

    playSound(pageSound, AUDIO_VOLUME.page);
  }

  // RANDOM RIVAL se decide antes de empezar cada batalla, para que el
  // jugador pueda ver al rival en la tarjeta antes de tocar el tablero.
  useEffect(() => {
    if (gameMode !== 'CPU' || battleStarted) return;

    if (randomRival) {
      chooseRandomEnemy(true);
    } else {
      setRandomEnemyWarrior(null);
    }
  }, [gameMode, battleStarted, randomRival, humanArmy, godMode]);


  function selectDifficulty(level: Difficulty) {
    if (battleStarted) return;
    setDifficulty(level);
    setShowDifficulty(false);
    playSound(pageSound, AUDIO_VOLUME.page);
  }

  function openGodModeLogin() {
    if (godMode) {
      setGodMode(false);
      playSound(pageSound, 0.18);
      return;
    }

    setGodModeCode('');
    setGodModeError(false);
    setShowGodModeLogin(true);
  }

  function activateGodMode() {
    if (godModeCode.trim().toUpperCase() !== GOD_MODE_CODE) {
      setGodModeError(true);
      playSound(pageSound, AUDIO_VOLUME.page);
      return;
    }

    setGodMode(true);
    setShowGodModeLogin(false);
    setGodModeCode('');
    setGodModeError(false);
    playSound(victorySound, AUDIO_VOLUME.godMode);
  }

  const winnerArmy = winner ? armyForMark(winner) : null;

  const humanWarrior =
  humanArmy === ZEUS
    ? equippedZeusWarrior
    : equippedThorWarrior;

  const selectedEnemyWarrior =
    computerArmy === ZEUS
      ? equippedZeusWarrior
      : equippedThorWarrior;

  const enemyWarrior =
    gameMode === 'CPU' && randomRival && randomEnemyWarrior
      ? randomEnemyWarrior
      : selectedEnemyWarrior;

  const displayedZeusWarrior =
  gameMode === 'CPU' && computerArmy === ZEUS
    ? enemyWarrior
    : equippedZeusWarrior;

const displayedThorWarrior =
  gameMode === 'CPU' && computerArmy === THOR
    ? enemyWarrior
    : equippedThorWarrior;

  const localCurrentArmy = armyForMark(turn);

  const localCurrentWarrior =
    localCurrentArmy === ZEUS
      ? equippedZeusWarrior
      : equippedThorWarrior;

  const status = winnerArmy
    ? winnerArmy === ZEUS
      ? t.zeusVictory
      : t.thorVictory
    : draw
      ? t.draw
      : !battleStarted
        ? humanMark === 'X'
          ? t.chooseSideFirst
          : t.chooseSideSecond
        : gameMode === 'LOCAL'
          ? `${turn === 'X' ? t.playerOne : t.playerTwo} · ${localCurrentWarrior.name}`
          : thinking
            ? `${t.enemyTurn} · ${enemyWarrior.name}`
            : `${t.yourTurnShort} · ${warriorText(humanWarrior).name}`;
  const resultTitle = winner
    ? winner === humanMark
      ? t.youWon
      : t.youLost
    : t.draw;

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
          onClick={toggleSound}
          aria-label={soundMuted ? t.activateSound : t.muteSound}
        >
          {soundMuted ? '🔇' : '🔊'}
        </button>

                <div className="global-language" aria-label="Language">
          <button type="button" className={language === 'ES' ? 'active' : ''} onClick={() => changeLanguage('ES')}>ES</button>
          <span>·</span>
          <button type="button" className={language === 'EN' ? 'active' : ''} onClick={() => changeLanguage('EN')}>EN</button>
        </div>

<button
          type="button"
          className={`difficulty-button ${battleStarted ? 'locked' : ''}`}
          onClick={() => setShowDifficulty(true)}
          disabled={battleStarted}
          aria-label="Battle mode"
        >
          <span>{t.battleMode}</span>

          <strong>
            {gameMode === 'CPU'
              ? `VS CPU · ${difficulty}`
              : '2 PLAYERS'}
          </strong>
        </button>
        <button
          type="button"
          className={`god-vase-button ${godMode ? 'active' : ''}`}
          onClick={openGodModeLogin}
          aria-label={godMode ? t.deactivateGodMode : t.divineAccess}
          title={godMode ? t.godModeActive : t.divineAccess}
        >
          🏺
        </button>

        <h1 className="scene-title">
          <span className="title-zeus">ZEUS</span>
          <span className="title-vs">vs</span>
          <span className="title-thor">THOR</span>
        </h1>

        <div className={`scene-status ${thinking ? 'thinking' : ''}`}>
          {battleStarted && !gameOver ? (
            <>
              <img
               className={`status-warrior-image ${
                  gameMode === 'LOCAL' || !thinking
                    ? 'status-warrior-human'
                    : ''
                }`}
              src={
                  gameMode === 'LOCAL'
                    ? localCurrentWarrior.image
                    : thinking
                      ? enemyWarrior.image
                      : humanWarrior.image
                }
                alt="gods exist"
              />

              <span className="status-warrior-text">
                {status}
              </span>
            </>
          ) : (
            status
          )}
        </div>

        <div className={`player-selector ${battleStarted ? 'locked' : ''}`}>
          <button
            className={`player-choice ${humanArmy === ZEUS ? 'selected zeus' : ''}`}
            onClick={() => selectArmy(ZEUS)}
            disabled={battleStarted}
          >
            ⚡ {t.greeks}
          </button>

          <button
            className={`player-choice ${humanArmy === THOR ? 'selected thor' : ''}`}
            onClick={() => selectArmy(THOR)}
            disabled={battleStarted}
          >
            {t.norse} 🔨
          </button>

          <button
            className={`player-choice ${humanMark === 'X' ? 'selected zeus' : ''}`}
            onClick={() => selectMark('X')}
            disabled={battleStarted}
            aria-label={t.playFirstAsX}
          >
            X · {t.first}
          </button>

          <button
            className={`player-choice ${humanMark === 'O' ? 'selected thor' : ''}`}
            onClick={() => selectMark('O')}
            disabled={battleStarted}
            aria-label={t.playSecondAsO}
          >
            O · {t.second}
          </button>
        </div>

        <div className={`battle-warriors ${battleStarted ? 'locked' : ''}`}>
          <button
            className={`battle-warrior-card zeus ${humanArmy === ZEUS ? 'human' : 'enemy'}`}
            onClick={() => openWarriorSelector(ZEUS)}
            disabled={battleStarted}
            aria-label={`Change Greek warrior. Current warrior: ${displayedZeusWarrior.name}`}
          >
            <span className="battle-warrior-role">
              {humanArmy === ZEUS ? t.yourWarrior : t.enemyWarrior}
            </span>
           <img
              src={displayedZeusWarrior.image}
              alt={displayedZeusWarrior.name}
            />

            <span className="battle-warrior-name">
              {displayedZeusWarrior.name}
            </span>
            <strong>
              {t.changeWarrior}
              {newZeusWarriors.length > 0 && (
                <span className="change-warrior-new">{t.newLabel}</span>
              )}
            </strong>
          </button>

          <div className="battle-warriors-vs">VS</div>

          {gameMode === 'CPU' && (
            <div
              className={`current-side-quick ${
                humanArmy === ZEUS ? 'on-zeus zeus' : 'on-thor thor'
              }`}
              aria-label={
                humanArmy === ZEUS
                  ? t.playingAsGreeks
                  : t.playingAsNorse
              }
              title={
                humanArmy === ZEUS
                  ? t.yourSideGreeks
                  : t.yourSideNorse
              }
            >
              <span className="current-side-quick-icon">
                {humanArmy === ZEUS ? '⚡' : '🔨'}
              </span>
            </div>
          )}

          {gameMode === 'CPU' && (
            <button
              type="button"
              className={`random-rival-quick ${
                randomRival ? 'active' : 'inactive'
              } ${
                computerArmy === ZEUS ? 'on-zeus' : 'on-thor'
              }`}
              onClick={toggleRandomRival}
              disabled={battleStarted}
              aria-label={
                randomRival
                  ? t.disableRandomRival
                  : t.enableRandomRival
              }
              title={
                randomRival
                  ? t.randomRivalOn
                  : t.randomRivalOff
              }
            >
              <span className="random-rival-quick-icon">🎲</span>
              <span className="random-rival-quick-label">
                {randomRival ? 'RANDOM' : 'SELECTED'}
              </span>
            </button>
          )}

          <button
            className={`battle-warrior-card thor ${humanArmy === THOR ? 'human' : 'enemy'}`}
            onClick={() => openWarriorSelector(THOR)}
            disabled={battleStarted}
            aria-label={`Change Norse warrior. Current warrior: ${displayedThorWarrior.name}`}
          >
            <span className="battle-warrior-role">
              {humanArmy === THOR ? t.yourWarrior : t.enemyWarrior}
            </span>
            <img src={displayedThorWarrior.image} alt={displayedThorWarrior.name} />
            <span className="battle-warrior-name">{displayedThorWarrior.name}</span>
            <strong>
              {t.changeWarrior}
              {newThorWarriors.length > 0 && (
                <span className="change-warrior-new">{t.newLabel}</span>
              )}
            </strong>
          </button>
        </div>

        <div className={`score score-zeus ${battleStarted ? 'score-hidden' : ''}`}>
          {zeusScore}
        </div>

        <div className={`score score-draw ${battleStarted ? 'score-hidden' : ''}`}>
          {drawScore}
        </div>

        <div className={`score score-thor ${battleStarted ? 'score-hidden' : ''}`}>
          {thorScore}
        </div>

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
                disabled={
                  thinking ||
                  gameOver ||
                  Boolean(value) ||
                  (
                    gameMode === 'CPU' &&
                    battleStarted &&
                    turn !== humanMark
                  )
                }
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
                        ${value === humanMark ? 'human-piece' : ''}
                        ${winningLine?.includes(index)
                          ? pieceArmy === ZEUS
                            ? 'winner-zeus'
                            : 'winner-thor'
                          : ''
                        }
                      `}
                      src={
                          gameMode === 'CPU' &&
                          randomRival &&
                          pieceArmy === computerArmy &&
                          randomEnemyWarrior
                            ? randomEnemyWarrior.image
                            : pieceArmy === ZEUS
                              ? equippedZeusWarrior.image
                              : equippedThorWarrior.image
                        }
                        alt={
                          gameMode === 'CPU' &&
                          randomRival &&
                          pieceArmy === computerArmy &&
                          randomEnemyWarrior
                            ? randomEnemyWarrior.name
                            : pieceArmy === ZEUS
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

        {showGodModeLogin && (
          <div
            className="god-mode-backdrop"
            onClick={() => setShowGodModeLogin(false)}
          >
            <div
              className="god-mode-modal"
              role="dialog"
              aria-modal="true"
              aria-label={t.divineAccess}
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                className="god-mode-close"
                onClick={() => setShowGodModeLogin(false)}
                aria-label={t.close}
              >
                ×
              </button>

              <div className="god-mode-vase">🏺</div>
              <div className="god-mode-kicker">{t.divineAccess}</div>
              <h2>{t.awakenTheGods}</h2>

              <input
                className={godModeError ? 'error' : ''}
                type="password"
                value={godModeCode}
                onChange={(event) => {
                  setGodModeCode(event.target.value);
                  setGodModeError(false);
                }}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') activateGodMode();
                }}
                placeholder={t.enterCode}
                autoComplete="off"
                autoCapitalize="characters"
                spellCheck={false}
                autoFocus
              />

              {godModeError && (
                <div className="god-mode-error">{t.accessDenied}</div>
              )}

              <button
                type="button"
                className="god-mode-awaken"
                onClick={activateGodMode}
              >
                {t.awaken}
              </button>
            </div>
          </div>
        )}

        {showDifficulty && (
          <div
            className="difficulty-backdrop"
            onClick={() => setShowDifficulty(false)}
          >
            <div
              className="difficulty-modal"
              role="dialog"
              aria-modal="true"
              aria-label={t.chooseDifficulty}
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                className="difficulty-close"
                onClick={() => setShowDifficulty(false)}
                aria-label={t.close}
              >
                ×
              </button>

              <div className="difficulty-kicker">
                {t.chooseHowToBattle}
              </div>

              <h2>{t.battleMode}</h2>

              <div className="difficulty-options">

                <button
                  type="button"
                  className={`difficulty-option ${gameMode === 'CPU' ? 'selected' : ''}`}
                  onClick={() => setGameMode('CPU')}
                >
                  <strong>⚔ {t.vsCpu}</strong>
                  <span>{t.battleTheGods}</span>
                </button>

                <button
                  type="button"
                  className={`difficulty-option ${gameMode === 'LOCAL' ? 'selected' : ''}`}
                  onClick={() => setGameMode('LOCAL')}
                >
                  <strong>👥 {t.twoPlayersLabel}</strong>
                  <span>{t.shareThisDevice}</span>
                </button>

              </div>

              {gameMode === 'CPU' && (
                <>
                  <div className="difficulty-kicker">
                    {t.chooseYourChallenge}
                  </div>

                  <div className="difficulty-options">
                    {(['EASY', 'MEDIUM', 'HARD'] as Difficulty[]).map(level => (
                      <button
                        type="button"
                        key={level}
                        className={`difficulty-option ${
                          difficulty === level ? 'selected' : ''
                        }`}
                        onClick={() => selectDifficulty(level)}
                      >
                        <strong>{level}</strong>

                        <span>
                          {level === 'EASY'
                            ? 'Forgiving opponent'
                            : level === 'MEDIUM'
                              ? 'Balanced battle'
                              : 'Perfect strategy'}
                        </span>
                      </button>
                    ))}
                  </div>

                  <div className="difficulty-kicker">
                    {t.enemySelection}
                  </div>

                  <div className="difficulty-options">
                    <button
                      type="button"
                      className={`difficulty-option ${randomRival ? 'selected' : ''}`}
                      onClick={toggleRandomRival}
                    >
                      <strong>
                        🎲 {t.randomRival} · {randomRival ? t.randomOn : t.randomOff}
                      </strong>

                      <span>
                        {t.randomDesc}
                      </span>
                    </button>
                  </div>

                </>
              )}

              <div className="battle-mode-mythology">
                <div className="difficulty-kicker">
                  {t.historyMythology}
                </div>
                <div className="difficulty-options">
                  <button type="button" className="difficulty-option mythology greek" onClick={() => openCodex(ZEUS)}>
                    <strong>⚡ {t.greekMythology}</strong>
                    <span>{t.explorePantheon}</span>
                  </button>
                  <button type="button" className="difficulty-option mythology norse" onClick={() => openCodex(THOR)}>
                    <strong>{t.norseMythology} 🔨</strong>
                    <span>{t.explorePantheon}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {showWarriorSelector && (
          <div
            className="warrior-modal-backdrop"
            onClick={() => setShowWarriorSelector(false)}
          >
            <div
              className={`warrior-modal ${selectorArmy === ZEUS ? 'zeus' : 'thor'}`}
              role="dialog"
              aria-modal="true"
              aria-label={t.warriorSelection}
              onClick={(event) => event.stopPropagation()}
            >
              <button
                className="warrior-modal-close"
                onClick={() => setShowWarriorSelector(false)}
                aria-label={t.close}
              >
                ×
              </button>

              <div className="warrior-modal-faction">
                {selectorArmy === ZEUS ? `⚡ ${t.greekPantheon}` : `${t.norsePantheon} 🔨`}
              </div>

              <button
                className="warrior-modal-arrow left"
                onClick={previousWarrior}
                aria-label={t.previousWarrior}
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
                    ? `${language === 'ES' ? 'Equipar' : 'Equip'} ${warriorText(previewWarrior).name}`
                    : `${warriorText(previewWarrior).name} ${language === 'ES' ? 'bloqueado' : 'locked'}`
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

                {previewUnlocked &&
                  (selectorArmy === ZEUS ? newZeusWarriors : newThorWarriors).includes(warriorPreviewIndex) && (
                    <div className="warrior-modal-new">{t.newLabel}</div>
                  )}

                {previewEquipped && (
                  <div className="warrior-modal-equipped">✓ {t.equipped}</div>
                )}
              </button>

              <button
                className="warrior-modal-arrow right"
                onClick={nextWarrior}
                aria-label={t.nextWarrior}
              >
                ›
              </button>

              <h2>{warriorText(previewWarrior).name}</h2>
              <div className="warrior-modal-title">{warriorText(previewWarrior).title}</div>

              <p className="warrior-modal-description">
                {warriorText(previewWarrior).description}
              </p>

              {!previewUnlocked ? (
                <div className="warrior-modal-requirement">
                  <strong>🔒 {t.requires} {previewWarrior.unlockAt} {t.winsAgainstPantheon}</strong>
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
                <div className="warrior-modal-hint equipped">{t.readyBattle}</div>
              ) : (
                <div className="warrior-modal-hint">{t.tapEquip}</div>
              )}

              {gameMode === 'CPU' && previewUnlocked && (
                selectorArmy === humanArmy ? (
                  <div
                    className={`warrior-side-status ${
                      selectorArmy === ZEUS ? 'zeus' : 'thor'
                    }`}
                  >
                    ✓ {t.currentSideStatus}
                  </div>
                ) : (
                  <button
                    type="button"
                    className={`warrior-play-side-button ${
                      selectorArmy === ZEUS ? 'zeus' : 'thor'
                    }`}
                    onClick={playAsPreviewSide}
                  >
                    {selectorArmy === ZEUS ? t.playAsGreeks : t.playAsNorse}
                  </button>
                )
              )}

              {previewUnlocked && (
                <button type="button" className="warrior-lore-button" onClick={openPreviewLore}>
                  🏺 {t.historyMythology} ›
                </button>
              )}

              <div className="warrior-modal-footer">
                <span className="warrior-modal-counter">
                  {warriorPreviewIndex + 1} / {currentWarriors.length}
                </span>

                <button
                  className="modal-reset-progress"
                  onClick={resetProgress}
                  title={t.resetProgress}
                >
                  ↺ {t.resetProgress}
                </button>
              </div>
            </div>
          </div>
        )}
       

        {showCodex && (
          <div className="codex-screen" role="dialog" aria-modal="true">
            <div className="codex-page">
              <div className="codex-nav">
                <button type="button" className="codex-nav-button" onClick={loreWarrior ? backFromLore : closeCodex}>
                  ← {t.back}
                </button>
                <div className="codex-language" aria-label="Language">
                  <button className={language === 'ES' ? 'active' : ''} onClick={() => changeLanguage('ES')}>ES</button>
                  <span>|</span>
                  <button className={language === 'EN' ? 'active' : ''} onClick={() => changeLanguage('EN')}>EN</button>
                </div>
                <button type="button" className="codex-close" onClick={closeCodex} aria-label="Close">×</button>
              </div>

              {loreWarrior ? (
                <article className="codex-detail">
                  <header>
                    <div className="codex-eyebrow">
                      {codexArmy === ZEUS
                        ? (language === 'ES' ? 'MITOLOGÍA GRIEGA' : 'GREEK MYTHOLOGY')
                        : (language === 'ES' ? 'MITOLOGÍA NÓRDICA' : 'NORSE MYTHOLOGY')}
                    </div>
                    <h1>{loreEntry?.title[language] ?? warriorText(loreWarrior).name}</h1>
                    <div className="codex-subtitle">{loreEntry?.subtitle[language] ?? warriorText(loreWarrior).title}</div>
                  </header>

                  <div className="codex-character-nav">
                    <button
                      type="button"
                      onClick={() => moveLore(-1)}
                      disabled={codexWarriors.filter(w => codexWins >= w.unlockAt).findIndex(w => w.id === loreWarrior.id) <= 0}
                    >
                      ‹ {language === 'ES' ? 'ANTERIOR' : 'PREVIOUS'}
                    </button>
                    <span>{warriorText(loreWarrior).name}</span>
                    <button
                      type="button"
                      onClick={() => moveLore(1)}
                      disabled={codexWarriors.filter(w => codexWins >= w.unlockAt).findIndex(w => w.id === loreWarrior.id) >= codexWarriors.filter(w => codexWins >= w.unlockAt).length - 1}
                    >
                      {language === 'ES' ? 'SIGUIENTE' : 'NEXT'} ›
                    </button>
                  </div>

                  <div className="codex-comparison">
                    <figure>
                      <div className="codex-image-box game-art">
                        <img src={loreWarrior.image} alt={loreWarrior.name} />
                      </div>
                      <figcaption>{t.gameArt}</figcaption>
                    </figure>
                    <figure>
                      <div className="codex-image-box">
                        {loreEntry?.archaeologicalImage
                          ? <img src={loreEntry.archaeologicalImage} alt="" />
                          : <div className="codex-placeholder"><span>🏺</span><strong>{t.archaeologicalObject}</strong><small>{t.comingSoon}</small></div>}
                      </div>
                      <figcaption>{t.archaeology}</figcaption>
                    </figure>
                  </div>

                  <section className="codex-copy">
                    <h2>{t.mythologyHistory}</h2>
                    <p>{loreEntry?.mythology[language] ?? (language === 'ES'
                      ? `La ficha completa de ${loreWarrior.name} se incorporará próximamente.`
                      : `The complete ${loreWarrior.name} entry will be added soon.`)}</p>
                  </section>

                  <section className="codex-copy archaeology">
                    <h2>{t.archaeologicalContext}</h2>
                    <p>{loreEntry?.archaeology[language] ?? (language === 'ES'
                      ? 'La documentación arqueológica de esta figura se incorporará próximamente.'
                      : 'Archaeological documentation for this figure will be added soon.')}</p>
                  </section>
                </article>
              ) : (
                <section className={`codex-index ${codexArmy === ZEUS ? 'greek' : 'norse'}`}>
                  <header>
                    <div className="codex-eyebrow">{t.historyMythology}</div>
                    <h1>{codexArmy === ZEUS
                      ? (language === 'ES' ? 'PANTEÓN GRIEGO' : 'GREEK PANTHEON')
                      : (language === 'ES' ? 'PANTEÓN NÓRDICO' : 'NORSE PANTHEON')}</h1>
                    <p>{t.playUnlockDiscover}</p>
                  </header>
                  <div className="codex-list">
                    {codexWarriors.map((warrior, index) => {
                      const unlocked = codexWins >= warrior.unlockAt;
                      return (
                        <button key={warrior.id} type="button"
                          className={`codex-entry ${unlocked ? 'unlocked' : 'locked'}`}
                          disabled={!unlocked}
                          onClick={() => unlocked && openLoreWarrior(warrior)}>
                          <span className="codex-entry-number">{String(index + 1).padStart(2, '0')}</span>
                          <span className="codex-entry-image">{unlocked ? <img src={warrior.image} alt="" /> : '🔒'}</span>
                          <span className="codex-entry-text">
                            <strong>{unlocked ? warriorText(warrior).name : t.locked}</strong>
                            <small>{unlocked
                              ? t.viewHistory
                              : `${warrior.unlockAt} ${t.glory}`}</small>
                          </span>
                          {unlocked && <span className="codex-entry-arrow">›</span>}
                        </button>
                      );
                    })}
                  </div>
                </section>
              )}
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
                  ? t.yourWarriorsWin
                  : winner === computerMark
                    ? t.enemyWins
                    : t.neitherWins}
              </p>

              {unlockNotice && unlockedWarrior ? (
                <div className={`unlock-notice ${unlockNotice.army === ZEUS ? 'zeus' : 'thor'}`}>
                  <div className="unlock-icon">🔓</div>
                  <strong>{t.newWarrior}</strong>
                  <img
                    className="unlock-warrior-image"
                    src={unlockedWarrior.image}
                    alt={unlockedWarrior.name}
                  />
                  <div className="unlock-warrior-name">{warriorText(unlockedWarrior).name}</div>
                  <span>{unlockNotice.wins} WINS</span>
                  <button
                    type="button"
                    className="view-unlocked-warrior"
                    onClick={viewUnlockedWarrior}
                  >
                    {t.viewWarrior}
                  </button>
                </div>
              ) : null}

              <button className="new-battle" onClick={startNewBattle}>{t.newBattle}</button>
            </div>
          </div>
        )}
        <div className="game-signature">
          ZEUS vs THOR · v4.0.0 · a game by Diego Mongay
        </div>
      </section>
    </main>
  );
}

createRoot(document.getElementById('root')!).render(<App />);