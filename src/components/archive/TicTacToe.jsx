import React, { useState } from 'react';

const TicTacToe = () => {
  const [blocks, setBlock] = useState([Array(9).fill(null)]);
  const [step, setStep] = useState(0);
  const [valueX, setValueX] = useState(true);
  const xo = valueX ? 'X' : 'O';

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const winner = calculateWinner(blocks[step]);

  const handleClick = (i) => {
    const historyPoint = blocks.slice(0, step + 1);
    const current = historyPoint[step];
    const squares = [...current];
    console.log(blocks, step, historyPoint, current, squares);
    // return if won or occupied
    if (winner || squares[i]) return;
    // select square
    squares[i] = xo;
    setBlock([...historyPoint, squares]);
    setStep(historyPoint.length);
    setValueX(!valueX);
  };

  const jumpTo = (step) => {
    setStep(step);
    setValueX(step % 2 === 0);
  };

  const renderMoves = () =>
    blocks.map((_step, move) => {
      const destination = move ? `Go to move #${move}` : "Go to Start";
      return (
        <li key={move}>
          <button onClick={() => jumpTo(move)}>{destination}</button>
        </li>
      );
    });

  return (
    <div>
      <h1>Game</h1>
      <div className="board">
        {blocks[step].map((square, index) => (
          <button className="squares" key={index} onClick={() => handleClick(index)}>
          {square}
        </button>
        ))}
      </div>
      <div>
        <h2>Moves</h2>
        {renderMoves}
        <h3>{winner ? <div>{`Winner: ${winner}`}</div> : `Next Player: ${xo}`}</h3>
      </div>
    </div>
  );
};

export default TicTacToe;