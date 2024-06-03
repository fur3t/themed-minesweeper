import React from "react";
import './cell.css';

function Cell({ isMine, isRevealed, isFlagged, isQuestionMark, neighbours, onClick, onContextMenu, themeConfig, cellSize }) {
  const cellStyle = {
    backgroundColor: isRevealed ? themeConfig.revealedCellBackgroundColor : themeConfig.cellBackgroundColor,
    color: isRevealed ? themeConfig.textColor : '#000',
    border: `2px solid ${themeConfig.boardBackgroundColor}`,
    width: `${cellSize}px`,
    height: `${cellSize}px`,
    fontSize: `${cellSize * 0.5}px`,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  let cellContent = '';
  if (isRevealed) {
    cellContent = isMine ? "💣" : neighbours > 0 ? neighbours : '';
  } else {
    if (isFlagged) {
      cellContent = '🚩';
    } else if (isQuestionMark) {
      cellContent = '❓';
    }
  }

  return (
    <div className="cell" style={cellStyle} onClick={onClick} onContextMenu={onContextMenu}>
      {cellContent}
    </div>
  );
}

export default Cell;
