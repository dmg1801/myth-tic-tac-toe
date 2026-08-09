import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';
import boardImage from './assets/boards/zeus-thor-board.png';
import player1Image from './assets/players/player1.png';
import player2Image from './assets/players/player2.png';

type Player = 'X' | 'O';
type Cell = Player | null;

const HUMAN: Player = 'X';
const COMPUTER: Player = 'O';

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

function minimax(board: Cell[], maximizing: boolean, depth = 0): number {
  const winner = getWinner(board);
  if (winner === COMPUTER) return 10 - depth;
  if (winner === HUMAN) return depth - 10;
  if (board.every(Boolean)) return 0;

  const scores = emptyCells(board).map(index => {
    const next = [...board];
    next[index] = maximizing ? COMPUTER : HUMAN;
    return minimax(next, !maximizing, depth + 1);
  });

  return maximizing ? Math.max(...scores) : Math.min(...scores);
}

function chooseComputerMove(board: Cell[]) {
  // 1. Si Thor puede ganar ahora, siempre gana.
  const winningMove = immediateMove(board, COMPUTER);
  if (winningMove !== null) return winningMove;

  // 2. Si Zeus puede ganar en la siguiente jugada, siempre bloquea.
  const blockingMove = immediateMove(board, HUMAN);
  if (blockingMove !== null) return blockingMove;

  // 3. Calculamos todas las jugadas con Minimax.
  const scored = emptyCells(board)
    .map(index => {
      const next = [...board];
      next[index] = COMPUTER;

      return {
        index,
        score: minimax(next, false),
      };
    })
    .sort((a, b) => b.score - a.score);

  const bestScore = scored[0].score;
  const bestMoves = scored.filter(move => move.score === bestScore);

  // 4. Dificultad actual: HÉROE
  // Thor tiene un 30% de posibilidades de cometer
  // un error estratégico REAL.
  const MISTAKE_CHANCE = 0.30;

  if (Math.random() < MISTAKE_CHANCE && scored.length > 1) {
    // Excluimos las mejores jugadas.
    // Esto garantiza que cuando se equivoca,
    // realmente está jugando de forma subóptima.
    const mistakes = scored.filter(move => move.score < bestScore);

    if (mistakes.length > 0) {
      return mistakes[
        Math.floor(Math.random() * mistakes.length)
      ].index;
    }
  }

  // 5. El resto del tiempo juega óptimamente.
  return bestMoves[
    Math.floor(Math.random() * bestMoves.length)
  ].index;
}

function App() {
  const [board, setBoard] = useState<Cell[]>(Array(9).fill(null));
  const [turn, setTurn] = useState<Player>(HUMAN);
  const [thinking, setThinking] = useState(false);

  const winner = getWinner(board);
  const draw = !winner && board.every(Boolean);
  const gameOver = Boolean(winner || draw);

  useEffect(() => {
    if (turn !== COMPUTER || gameOver) {
      setThinking(false);
      return;
    }

    setThinking(true);
    const delay = 520 + Math.random() * 380;
    const timer = window.setTimeout(() => {
      setBoard(currentBoard => {
        if (getWinner(currentBoard) || currentBoard.every(Boolean)) return currentBoard;
        const move = chooseComputerMove(currentBoard);
        const next = [...currentBoard];
        next[move] = COMPUTER;
        return next;
      });
      setTurn(HUMAN);
      setThinking(false);
    }, delay);

    return () => window.clearTimeout(timer);
  }, [turn, gameOver]);

  function play(index: number) {
    if (turn !== HUMAN || thinking || board[index] || gameOver) return;

    const next = [...board];
    next[index] = HUMAN;
    setBoard(next);

    if (!getWinner(next) && !next.every(Boolean)) {
      setTurn(COMPUTER);
    }
  }

  function reset() {
    setBoard(Array(9).fill(null));
    setTurn(HUMAN);
    setThinking(false);
  }

  const status = winner
    ? winner === HUMAN ? 'Victoria de Zeus' : 'Victoria de Thor'
    : draw
      ? 'Empate'
      : thinking
        ? 'Thor está pensando…'
        : 'Tu turno';

  const resultTitle = winner === HUMAN
    ? 'HAS GANADO'
    : winner === COMPUTER
      ? 'HAS SIDO DERROTADO'
      : 'EMPATE';

  const resultClass = winner === HUMAN ? 'victory' : winner === COMPUTER ? 'defeat' : 'draw';
  const resultSymbol = winner === HUMAN ? '⚡' : winner === COMPUTER ? 'ᚦ' : '⚔';

  return (
    <main>
      <header className="game-header">
        <h1>Zeus <span>vs</span> Thor</h1>
        <div className={`status ${thinking ? 'thinking' : ''}`}>{status}</div>
      </header>

      <section className="scene" aria-label="Tablero mitológico Zeus contra Thor">
        <img className="scene-image" src={boardImage} alt="Escenario mitológico de Zeus contra Thor" />

        <div className={`board-hitbox ${thinking ? 'locked' : ''}`}>
          {board.map((value, index) => (
            <button
              className="cell"
              key={index}
              onClick={() => play(index)}
              disabled={turn !== HUMAN || thinking || gameOver || Boolean(value)}
              aria-label={`Casilla ${index + 1}`}
            >
              {value && (
                <img
                  className="piece-image piece-enter"
                  src={value === HUMAN ? player1Image : player2Image}
                  alt={value === HUMAN ? 'Hoplita de Zeus' : 'Ulfsark de Thor'}
                />
              )}
            </button>
          ))}
        </div>

        {gameOver && (
          <div className="result-backdrop">
            <div className={`result-panel ${resultClass}`} role="dialog" aria-live="assertive">
              <div className="result-symbol">{resultSymbol}</div>
              <div className="result-ornament">◆ ━ ◆ ━ ◆</div>
              <h2>{resultTitle}</h2>
              <p>{winner === HUMAN ? 'Los guerreros de Zeus dominan el campo.' : winner === COMPUTER ? 'Los guerreros de Thor han roto tus filas.' : 'Ningún bando reclama la victoria.'}</p>
              <button className="new-battle" onClick={reset}>NUEVA PARTIDA</button>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}

createRoot(document.getElementById('root')!).render(<App />);
