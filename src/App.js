import './App.css';
import React, { useState } from 'react';
import { ControlPanel, GamePanel } from "./components/index.js";
import themeConfigs from './assets/themes/index.js';

function App() {
  const levels = {
    beginner: { height: 8, width: 8, mines: 10 },
    intermediate: { height: 16, width: 16, mines: 40 },
    advanced: { height: 16, width: 30, mines: 99 },
  };

  const [level, setLevel] = useState('beginner');
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [theme, setTheme] = useState('creme');
  const [remainingMines, setRemainingMines] = useState(levels[level].mines);
  const [finalTime, setFinalTime] = useState(0);

  const { height, width, mines } = levels[level];

  const handleLevelChange = (event) => {
    const selectedLevel = event.target.value;
    setLevel(selectedLevel);
    setGameStarted(false);
    setGameOver(false);
    setGameWon(false);
    setRemainingMines(levels[selectedLevel].mines);
    setFinalTime(0);
  };

  const handleStartGame = () => {
    setGameStarted(true);
    setGameOver(false);
    setGameWon(false);
    setRemainingMines(mines);
    setFinalTime(0);
  };

  const handleGameOver = () => {
    setGameOver(true);
    setGameStarted(false);
  };

  const handleGameWon = (time) => {
    setGameWon(true);
    setGameStarted(false);
    setFinalTime(time);
  };

  const handleThemeChange = (selectedTheme) => {
    setTheme(selectedTheme);
  };

  const handleMineCountChange = (delta) => {
    setRemainingMines((prevMines) => prevMines + delta);
  };

  return (
    <div className="app" style={{ backgroundColor: themeConfigs[theme].backgroundColor }}>
      <ControlPanel
        level={level}
        onLevelChange={handleLevelChange}
        mines={remainingMines}
        onStartGame={handleStartGame}
        gameStarted={gameStarted}
        gameOver={gameOver}
        gameWon={gameWon}
        onThemeChange={handleThemeChange}
        themeConfig={themeConfigs[theme]}
        theme={theme}
      />
      <GamePanel
        height={height}
        width={width}
        mines={mines}
        gameStarted={gameStarted}
        gameOver={gameOver}
        gameWon={gameWon}
        onGameOver={handleGameOver}
        onGameWon={handleGameWon}
        themeConfig={themeConfigs[theme]}
        onMineCountChange={handleMineCountChange}
        finalTime={finalTime}
      />
    </div>
  );
}

export default App;
