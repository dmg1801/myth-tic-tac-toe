import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';
import boardImage from './assets/boards/zeus-thor-board.png';
import player1Image from './assets/players/player1.png';
import player2Image from './assets/players/player2.png';
import hopliteSound from './assets/sounds/hoplite.mp3';
import ulfsarkSound from './assets/sounds/ulfsark.mp3';
import victorySound from './assets/sounds/victory.mp3';
import defeatSound from './assets/sounds/defeat.mp3';
import drawSound from './assets/sounds/draw.mp3';
import ambienceSound from './assets/sounds/ambience.mp3';

type Player = 'X' | 'O';
type Cell = Player | null;
type Army = 'ZEUS' | 'THOR';

const ZEUS: Army = 'ZEUS';
const THOR: Army = 'THOR';

const GLORY_STORAGE_KEY = 'zeus-vs-thor-glory-v1';
const UNLOCK_LEVELS = [1, 3, 5, 10] as const;

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

  const zeusTotalWins = glory.zeusWins;
  const thorTotalWins = glory.thorWins;

  const zeusUnlockedSlots = UNLOCK_LEVELS.filter(level => zeusTotalWins >= level).length;
  const thorUnlockedSlots = UNLOCK_LEVELS.filter(level => thorTotalWins >= level).length;

  // Dos decisiones independientes:
  // 1) ejército: Zeus/Hoplita o Thor/Ulfsark
  // 2) ficha: X (primero) u O (segundo)
  const [humanArmy, setHumanArmy] = useState<Army>(ZEUS);
  const [humanMark, setHumanMark] = useState<Player>('X');

  const computerArmy: Army = humanArmy === ZEUS ? THOR : ZEUS;
  const computerMark: Player = humanMark === 'X' ? 'O' : 'X';

  const winner = getWinner(board);
  const draw = !winner && board.every(Boolean);
  const gameOver = Boolean(winner || draw);
  const winningLine = getWinningLine(board);

  function armyForMark(mark: Player): Army {
    return mark === humanMark ? humanArmy : computerArmy;
  }

  function soundForArmy(army: Army) {
    return army === ZEUS ? hopliteSound : ulfsarkSound;
  }

  function volumeForArmy(army: Army) {
    return army === ZEUS ? 0.15 : 0.10;
  }

  useEffect(() => {
    if (!gameOver || resultCounted.current) return;

    resultCounted.current = true;

    if (winner) {
      const winningArmy = armyForMark(winner);

      if (winningArmy === ZEUS) {
        setZeusScore(score => score + 1);

        setGlory(current => {
          const nextWins = current.zeusWins + 1;
          const next = { ...current, zeusWins: nextWins };
          localStorage.setItem(GLORY_STORAGE_KEY, JSON.stringify(next));

          const unlockIndex = UNLOCK_LEVELS.indexOf(nextWins as typeof UNLOCK_LEVELS[number]);
          if (unlockIndex !== -1) {
            setUnlockNotice({ army: ZEUS, wins: nextWins, slot: unlockIndex + 1 });
          }

          return next;
        });
      } else {
        setThorScore(score => score + 1);

        setGlory(current => {
          const nextWins = current.thorWins + 1;
          const next = { ...current, thorWins: nextWins };
          localStorage.setItem(GLORY_STORAGE_KEY, JSON.stringify(next));

          const unlockIndex = UNLOCK_LEVELS.indexOf(nextWins as typeof UNLOCK_LEVELS[number]);
          if (unlockIndex !== -1) {
            setUnlockNotice({ army: THOR, wins: nextWins, slot: unlockIndex + 1 });
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
                    src={pieceArmy === ZEUS ? player1Image : player2Image}
                    alt={pieceArmy === ZEUS ? 'Hoplita de Zeus' : 'Ulfsark de Thor'}
                  />
                )}
              </button>
            );
          })}
        </div>

         <div className={`player-selector ${battleStarted ? 'locked' : ''}`}>
          <button
            className={`player-choice ${humanArmy === ZEUS ? 'selected zeus' : ''}`}
            onClick={() => selectArmy(ZEUS)}
            disabled={battleStarted}
          >
            ⚡ ZEUS
          </button>

          <button
            className={`player-choice ${humanArmy === THOR ? 'selected thor' : ''}`}
            onClick={() => selectArmy(THOR)}
            disabled={battleStarted}
          >
            THOR 🔨
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

        <div className="glory-progress" aria-label="Progreso de guerreros">
        <span className="glory-zeus">
          ⚡ {zeusTotalWins} GLORY
        </span>

        <span className="glory-thor">
          {thorTotalWins} GLORY 🔨
        </span>
      </div>

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

              {unlockNotice && (
                <div className={`unlock-notice ${unlockNotice.army === ZEUS ? 'zeus' : 'thor'}`}>
                  <div className="unlock-icon">🔓</div>
                  <strong>NEW WARRIOR UNLOCKED</strong>
                  <span>
                    {unlockNotice.army === ZEUS ? 'GREEK' : 'NORSE'} WARRIOR {unlockNotice.slot}
                    {' · '}{unlockNotice.wins} WINS
                  </span>
                </div>
              )}

              <button className="new-battle" onClick={startNewBattle}>NEW BATTLE</button>
            </div>
          </div>
        )}
      </section>
       
    </main>
  );
}

createRoot(document.getElementById('root')!).render(<App />);