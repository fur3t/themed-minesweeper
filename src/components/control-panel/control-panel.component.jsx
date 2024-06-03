import React from "react";
import './control-panel.css';
import Timer from "../timer/timer.component";

function ControlPanel({ level, onLevelChange, mines, onStartGame, gameStarted, onThemeChange, gameOver, themeConfig, theme }) {
  const handleThemeChange = (event) => {
    const selectedTheme = event.target.value;
    onThemeChange(selectedTheme);
  };

  return (
    <div className="control-panel" style={{ backgroundColor: themeConfig.controlPanelBackgroundColor, color: themeConfig.textColor }}>
      <div className="branding">
        <div className="title">
          <h1>Mine</h1>
          <h1 id="secondh1">Sweeper</h1>
        </div>
        <div id="logoimg">
          <img src={themeConfig.logo} alt="minesweeper-logo" />
        </div>
      </div>

      <hr style={{color: themeConfig.textColor, backgroundColor: themeConfig.textColor}} />

      <div className="stats">
        {gameStarted ? (
          <>
            <p>💣 {mines} </p>
            <p><Timer gameStarted={gameStarted} gameOver={gameOver}/></p>
          </>
        ) : null}
      </div>

      <div className="settings">
        {!gameStarted ? (
          <>
            <div>
              <label>
                Dificuldade: {" "}
              </label>
              <select value={level} onChange={onLevelChange} style={{color: themeConfig.backgroundColor, backgroundColor: themeConfig.buttonColor}}>
                <option value="beginner">8 x 8 - Iniciante</option>
                <option value="intermediate">16 x 16 - Intermédio</option>
                <option value="advanced">16 x 30 - Avançado</option>
              </select>
            </div>
            <div>
              <label>
                Tema: {" "}
              </label>
              <select value={theme} onChange={handleThemeChange} style={{color: themeConfig.backgroundColor, backgroundColor: themeConfig.buttonColor}}>
                <option value="creme">Creme</option>
                <option value="claro">Claro</option>
                <option value="escuro">Escuro</option>
                <option value="brinquedo">Brinquedo</option>
                <option value="floresta">Floresta</option>
                <option value="inverno">Inverno</option>
                <option value="outono">Outono</option>
                <option value="gelado">Gelado</option>
                <option value="retro">Retro</option>
                <option value="sunset">Sunset</option>
                <option value="vampiro">Vampiro</option>
              </select>
            </div>
          </>
        ) : null}
      </div>

      <div className="startbutton">
        {!gameStarted ? (
          <button style={{ backgroundColor: themeConfig.buttonColor, color: themeConfig.backgroundColor}} onClick={onStartGame}>Iniciar Jogo</button>
        ) : (
          <p>Jogo em progresso!</p>
        )}
      </div>
    </div>
  );
}

export default ControlPanel;
