export const renderMap = (map) => {
  return `<table id="game_field">${map
    .map((elem) => renderRow(elem))
    .join('\n')}</table>`;
};

const renderRow = (gameRow) => {
  return `<tr>${gameRow.map(renderCell).join('\n')}</tr>`;
};

const renderCell = (gameCell) => {
  if (gameCell.type === 'field') {
    let innerText, gameCellColor, hasBulbError;
    innerText = gameCell.hasBulb ? lightbulb : ' ';
    if (!gameCell.hasBulb) {
      gameCellColor = gameCell.level > 0 ? 'yellow' : 'white';
    } else if (gameCell.hasBulb) {
      gameCellColor = hasBulbError ? 'orange' : 'yellow';
    }
    return `<td class="gameCell" style="background-color:${gameCellColor}">${innerText}</td>`;
  }
  if (gameCell.type === 'black') {
    return `<td class="gameCell" style="background-color:black">${renderNumber(
      gameCell.level
    )}</td>`;
  }
};

const renderNumber = (level) => {
  if (level >= 0) {
    return level;
  } else {
    return '';
  }
};

const lightbulb = '💡';
