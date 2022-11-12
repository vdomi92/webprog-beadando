import { map1, w0, b0, b1, b2, b3, b4, b5, l1, l2, l3, lb } from './data.js';
import {
  playButton,
  createButton,
  saveButton,
  gameFieldContainer,
} from './references.js';

//States:
let selectedMap = map1;
let currentMap = '';
let error = false;
let success = false;

//Events:
playButton.addEventListener('click', () => onPlayButtonClick());
const onPlayButtonClick = () => {
  gameFieldContainer.innerHTML = renderMap(selectedMap.map);
  currentMap = selectedMap.map;
};

gameFieldContainer.addEventListener('click', (e) => onGameCellClick(e));
const onGameCellClick = (e) => {
  let rowIndex = e.target.parentElement.rowIndex;
  let cellIndex = e.target.cellIndex;
  let target = currentMap[rowIndex][cellIndex];
  lightBulbAction(target, rowIndex, cellIndex);
};
//Utilities
const lightBulbAction = (target, rowIndex, cellIndex) => {
  if (target == w0) {
    addLightBulb(rowIndex, cellIndex);
  }
};

const addLightBulb = (rowIndex, cellIndex) => {
  currentMap[rowIndex][cellIndex] = lb;
  gameFieldContainer.innerHTML = renderMap(currentMap);
  console.log(rowIndex, cellIndex);
  setTimeout(() => {
    letThereBeLight(rowIndex, cellIndex);
  }, '500');
};

const letThereBeLight = (rowIndex, cellIndex) => {
  if (rowIndex > 0) lightUp(rowIndex - 1, cellIndex);
  if (cellIndex > 0) lightLeft(rowIndex, cellIndex - 1);
  if (cellIndex < selectedMap.cols - 1) lightRight(rowIndex, cellIndex + 1);
  if (rowIndex < selectedMap.rows - 1) lightDown(rowIndex + 1, cellIndex);
};

const lightUp = (rowIndex, cellIndex) => {
  if (currentMap[rowIndex][cellIndex].type === 'black') {
    console.log('block reached');
    return;
  }
  changeLightFields(rowIndex, cellIndex);
  gameFieldContainer.innerHTML = renderMap(currentMap);
  if (rowIndex > 0) {
    setTimeout(() => {
      lightUp(rowIndex - 1, cellIndex);
    }, '500');
  }
};
const lightLeft = (rowIndex, cellIndex) => {
  if (currentMap[rowIndex][cellIndex].type === 'black') {
    console.log('block reached');
    return;
  }
  changeLightFields(rowIndex, cellIndex);
  gameFieldContainer.innerHTML = renderMap(currentMap);
  if (cellIndex > 0) {
    setTimeout(() => {
      lightLeft(rowIndex, cellIndex - 1);
    }, '500');
  }
};
const lightRight = (rowIndex, cellIndex) => {
  if (currentMap[rowIndex][cellIndex].type === 'black') {
    console.log('block reached');
    return;
  }
  changeLightFields(rowIndex, cellIndex);
  gameFieldContainer.innerHTML = renderMap(currentMap);
  if (cellIndex < selectedMap.cols - 1) {
    setTimeout(() => {
      lightRight(rowIndex, cellIndex + 1);
    }, '500');
  }
};
const lightDown = (rowIndex, cellIndex) => {
  if (currentMap[rowIndex][cellIndex].type === 'black') {
    console.log('block reached');
    return;
  }
  changeLightFields(rowIndex, cellIndex);
  gameFieldContainer.innerHTML = renderMap(currentMap);
  if (rowIndex < selectedMap.rows - 1) {
    setTimeout(() => {
      lightDown(rowIndex + 1, cellIndex);
    }, '500');
  }
};

const changeLightFields = (rowIndex, cellIndex) => {
  if (currentMap[rowIndex][cellIndex] == lb) {
    error = true;
    console.log('lightbulb hit');
  }
  if (currentMap[rowIndex][cellIndex] == w0) {
    currentMap[rowIndex][cellIndex] = l1;
  } else if (currentMap[rowIndex][cellIndex] == l1) {
    currentMap[rowIndex][cellIndex] = l2;
  } else if (currentMap[rowIndex][cellIndex] == l2) {
    currentMap[rowIndex][cellIndex] = l3;
    error = true;
  }
};
//Templates:
const renderMap = (selectedMap) => {
  return `<table id="game_field">${selectedMap
    .map(renderRow)
    .join('\n')}</table>`;
};

const renderRow = (gameRow) => {
  return `<tr>${gameRow.map(renderCell).join('\n')}</tr>`;
};

const renderCell = (gameCell) => {
  if (gameCell.type === 'lightBulb') {
    return `<td class="gameCell ${gameCell.type}">${renderNumber(
      gameCell
    )}</td>`;
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
    return `${gameCell.level}`;
  }
  if (gameCell.type === 'yellow') {
    return '';
  }
  if (gameCell.type === 'lightBulb') {
    return `${lightbulb}`;
  }
};

//Icons:
const lightbulb = '💡';
