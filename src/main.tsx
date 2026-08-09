import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';
import boardImage from './assets/boards/zeus-thor-board.png';
import player1Image from './assets/players/player1.png';
import player2Image from './assets/players/player2.png';

type Player = 'X' | 'O';
type Cell = Player | null;

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

function App() {
  const [board, setBoard] = useState<Cell[]>(Array(9).fill(null));
  const [turn, setTurn] = useState<Player>('X');
  const winner = getWinner(board);
  const draw = !winner && board.every(Boolean);

  function play(index: number) {
    if (board[index] || winner) return;

    const next = [...board];
    next[index] = turn;
    setBoard(next);
    setTurn(turn === 'X' ? 'O' : 'X');

    new Audio('/src/assets/sounds/place.mp3').play().catch(() => {});
  }

  function reset() {
    setBoard(Array(9).fill(null));
    setTurn('X');
  }

  const status = winner
    ? `${winner === 'X' ? 'Zeus' : 'Thor'} vence`
    : draw
      ? 'Empate'
      : `Turno de ${turn === 'X' ? 'Zeus' : 'Thor'}`;

  return (
    <main>
      <header className="game-header">
        <h1>Zeus <span>vs</span> Thor</h1>
        <div className="status">{status}</div>
      </header>

      <section className="scene" aria-label="Tablero mitológico Zeus contra Thor">
        <img className="scene-image" src={boardImage} alt="Escenario mitológico de Zeus contra Thor" />

        {/*
          Esta capa invisible coincide con el tablero dibujado en la imagen.
          Si en el futuro quieres afinarla, solo toca estas 4 variables en style.css:
          --board-left, --board-top, --board-width y --board-height.
        */}
        <div className="board-hitbox">
          {board.map((value, index) => (
            <button
              className="cell"
              key={index}
              onClick={() => play(index)}
              aria-label={`Casilla ${index + 1}`}
            >
              {value && (
                <>
                  <img
                    className="piece-image"
                    src={value === 'X' ? player1Image : player2Image}
                    alt={value === 'X' ? 'Zeus' : 'Thor'}
                    onError={(event) => {
                      event.currentTarget.style.display = 'none';
                      event.currentTarget.nextElementSibling?.classList.add('visible');
                    }}
                  />
                  <span className={`piece-fallback ${value === 'X' ? 'zeus' : 'thor'}`}>
                    {value}
                  </span>
                </>
              )}
            </button>
          ))}
        </div>
      </section>

      <button className="reset" onClick={reset}>Nueva partida</button>
      <p className="hint">Las X/O son temporales. Luego las cambiaremos por las fichas de Zeus y Thor.</p>
    </main>
  );
}

createRoot(document.getElementById('root')!).render(<App />);
