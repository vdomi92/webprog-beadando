export const renderMap = (gameMap) => {
  return `<table id="game_field">${renderRow}</table>`;
};

const renderRow = (gameRow) => {
  return `<tr>${gameRow.map(renderCell).join('\n')}</tr>`;
};

const renderCell = (gameCell) => {
  return `<td>${gameCell}</td>`;
};

const fullRender = (map1) => {};
