import React, { useState, useEffect } from "react";
import Cell from "../cell/cell.component.jsx";
import './board.css';

function Board({ height, width, mines, gameStarted, gameOver, onGameOver, onGameWon, themeConfig, onMineCountChange }) {
  const [grid, setGrid] = useState([]);
  const [firstClick, setFirstClick] = useState(true);
  const [startTime, setStartTime] = useState(0);
  const [finished, setFinished] = useState(false);
  const [finalTime, setFinalTime] = useState(0);
  console.log(finalTime)
  let fixedBoardSize = 400;
  if(width === 30) {
    fixedBoardSize = 800;
  }
  const maxDimension = Math.max(height, width);
  const minCellSize = 20;
  const calculatedCellSize = Math.floor(fixedBoardSize / maxDimension);
  const cellSize = Math.max(calculatedCellSize, minCellSize);

  const createGrid = (initialRow, initialCol) => {
    const createMines = () => {
      let minesArr = new Set();

      while (minesArr.size < mines) {
        let row = Math.floor(Math.random() * height);
        let column = Math.floor(Math.random() * width);

        if (row === initialRow && column === initialCol) {
          continue;
        }

        minesArr.add(`${row}-${column}`);
      }

      return minesArr;
    };

    let grid = [];
    let minesArr = createMines();

    for (let row = 0; row < height; row++) {
      let rowCells = [];
      for (let col = 0; col < width; col++) {
        let isAMine = minesArr.has(`${row}-${col}`);
        let neighbours = 0;

        if (!isAMine) {
          for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
              if (i === 0 && j === 0) continue;
              if (minesArr.has(`${row + i}-${col + j}`)) {
                neighbours++;
              }
            }
          }
        }

        rowCells.push({
          isMine: isAMine,
          isRevealed: false,
          isFlagged: false,
          isQuestionMark: false,
          neighbours: isAMine ? null : neighbours,
        });
      }
      grid.push(rowCells);
    }

    return grid;
  };

  useEffect(() => {
    if (gameStarted) {
      setFirstClick(true);
      setFinished(false);
      setGrid(Array(height).fill().map(() => Array(width).fill({
        isMine: false,
        isRevealed: false,
        isFlagged: false,
        isQuestionMark: false,
        neighbours: 0,
      })));
    }
  }, [gameStarted, height, width]);

  const handleCellClick = (row, col) => {
    if (gameOver || finished) {
      return;
    }

    if (firstClick) {
      setStartTime(Date.now());
      const newGrid = createGrid(row, col);
      newGrid[row][col].isRevealed = true;
      if (newGrid[row][col].neighbours === 0) {
        revealAdjacentZeros(newGrid, row, col);
      }
      setGrid(newGrid);
      setFirstClick(false);
    } else {
      const newGrid = JSON.parse(JSON.stringify(grid));
      if (newGrid[row][col].isMine) {
        newGrid.forEach(row =>
          row.forEach(cell => {
            if (cell.isMine) {
              cell.isRevealed = true;
            }
          })
        );
        setGrid(newGrid);
        setFinished(true);
        const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
        setFinalTime(elapsedTime);
        onGameOver();
      } else {
        revealCell(newGrid, row, col);
      }
      setGrid(newGrid);
    }
  };

  const handleRightClick = (e, row, col) => {
    e.preventDefault();
    if (gameOver || finished || grid[row][col].isRevealed) {
      return;
    }

    const newGrid = JSON.parse(JSON.stringify(grid));
    const cell = newGrid[row][col];

    if (cell.isFlagged) {
      cell.isFlagged = false;
      cell.isQuestionMark = true;
      onMineCountChange(1);
    } else if (cell.isQuestionMark) {
      cell.isQuestionMark = false;
    } else {
      cell.isFlagged = true;
      cell.isQuestionMark = false;
      onMineCountChange(-1);
    }

    setGrid(newGrid);
    checkWin(newGrid);
  };

  const checkWin = (grid) => {
    let flaggedMines = 0;
    let totalFlags = 0;

    grid.forEach(row => {
      row.forEach(cell => {
        if (cell.isFlagged) {
          totalFlags++;
          if (cell.isMine) {
            flaggedMines++;
          }
        }
      });
    });

    if (totalFlags === mines && flaggedMines === mines) {
      setFinished(true);
      const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
      setFinalTime(elapsedTime);
      onGameWon(elapsedTime);
    }
  };

  const revealAdjacentZeros = (grid, r, c) => {
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        const rowCheck = r + i;
        const colCheck = c + j;

        if (rowCheck >= 0 && rowCheck < height && colCheck >= 0 && colCheck < width && !grid[rowCheck][colCheck].isRevealed) {
          grid[rowCheck][colCheck].isRevealed = true;
          if (grid[rowCheck][colCheck].neighbours === 0) {
            revealAdjacentZeros(grid, rowCheck, colCheck);
          }
        }
      }
    }
  };

  const revealCell = (grid, row, col) => {
    if (grid[row][col].isRevealed || grid[row][col].isMine) {
      return;
    }

    grid[row][col].isRevealed = true;
    if (grid[row][col].neighbours === 0) {
      revealAdjacentZeros(grid, row, col);
    }
  };

  return (
    <div>
      <div
        className="board"
        style={{
          backgroundColor: themeConfig.boardBackgroundColor,
          width: `${cellSize * width}px`,
          height: `${cellSize * height}px`,
          borderColor: themeConfig.boardBackgroundColor
        }}
      >
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((cell, colIndex) => (
              <Cell
                key={colIndex}
                isMine={cell.isMine}
                isRevealed={cell.isRevealed}
                isFlagged={cell.isFlagged}
                isQuestionMark={cell.isQuestionMark}
                neighbours={cell.neighbours}
                onClick={() => handleCellClick(rowIndex, colIndex)}
                onContextMenu={(e) => handleRightClick(e, rowIndex, colIndex)}
                themeConfig={themeConfig}
                cellSize={cellSize}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Board;
