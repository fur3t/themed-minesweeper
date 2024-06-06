import React from "react";
import Board from "../board/board.component.jsx";
import './game-panel.css';

function GamePanel({ height, width, mines, gameStarted, gameOver, gameWon, onGameOver, onGameWon, themeConfig, onMineCountChange, finalTime }) {
  return (
    <div className="game-panel" style={{ backgroundColor: themeConfig.gamePanelBackgroundColor }}>
      {gameWon && 
      <div>
      <div className="final-time" style={{color: themeConfig.textColor}}>⏱️ Tempo: {finalTime} segundos! ⏱️</div>
      <div className="game-finished-message">Ganhaste!</div>
      </div>
      }
      {gameOver && <div className="game-over-message">Perdeste!</div>}
      {(gameStarted || gameOver || gameWon) && (
        <Board
          height={height}
          width={width}
          mines={mines}
          gameStarted={gameStarted}
          gameOver={gameOver}
          gameWon={gameWon}
          onGameOver={onGameOver}
          onGameWon={onGameWon}
          themeConfig={themeConfig}
          onMineCountChange={onMineCountChange}
        />
      )}
    </div>
  );
}

export default GamePanel;
