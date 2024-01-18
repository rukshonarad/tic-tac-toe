import React, { useState } from "react";
import "./App.css";

const INITIAL_STATE = Array(9).fill(null);

const App: React.FC = () => {
    const [squares, setSquares] = useState<string[]>(INITIAL_STATE);
    const [xIsNext, setXIsNext] = useState(true);

    const handleClick = (index: number) => {
        if (calculateWinner(squares) || squares[index]) {
            return;
        }

        const newSquares = squares.slice();
        newSquares[index] = xIsNext ? "X" : "O";
        setSquares(newSquares);
        setXIsNext(!xIsNext);
    };

    const renderSquare = (index: number) => {
        return (
            <button className="square" onClick={() => handleClick(index)}>
                {squares[index]}
            </button>
        );
    };

    const winner = calculateWinner(squares);
    const status = winner
        ? `Winner: ${winner}`
        : `Next player: ${xIsNext ? "X" : "O"}`;

    return (
        <div className="game">
            <div className="game-board">
                <div className="status">{status}</div>
                <div className="board-row">
                    {renderSquare(0)}
                    {renderSquare(1)}
                    {renderSquare(2)}
                </div>
                <div className="board-row">
                    {renderSquare(3)}
                    {renderSquare(4)}
                    {renderSquare(5)}
                </div>
                <div className="board-row">
                    {renderSquare(6)}
                    {renderSquare(7)}
                    {renderSquare(8)}
                </div>
            </div>
        </div>
    );
};

// Helper function to calculate the winner
const calculateWinner = (squares: string[]): string | null => {
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

    for (const [a, b, c] of lines) {
        if (
            squares[a] &&
            squares[a] === squares[b] &&
            squares[a] === squares[c]
        ) {
            return squares[a];
        }
    }

    return null;
};

export default App;
