export const renderMap = (map) => {
  return `<table id="game_field">${map
    .map((elem) => renderRow(elem))
    .join('\n')}</table>`;
};

const renderRow = (gameRow) => {
  return `<tr>${gameRow.map(renderCell).join('\n')}</tr>`;
};

const renderCell = (gameCell) => {
  if (gameCell.type === 'lightBulb') {
    return `<td class="gameCell ${
      gameCell.type
    }" style="background-color:yellow" >${renderNumber(gameCell)}</td>`;
  } else {
    return `<td class="gameCell ${gameCell.type}" style="background-color:${
      gameCell.type
    }">${renderNumber(gameCell)}</td>`;
  }
};

const renderNumber = (gameCell) => {
  if (gameCell.type === 'white') {
    return '';
  }
  if (gameCell.type === 'black') {
    if (gameCell.level < 0) {
      return ' ';
    }
    return `${gameCell.level}`;
  }
  if (gameCell.type === 'yellow') {
    return '';
  }
  if (gameCell.type === 'lightBulb') {
    return `${lightbulb}`;
  }
};

const lightbulb = '💡';
