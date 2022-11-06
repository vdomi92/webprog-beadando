import { map1 } from './data.js';
import {
  playButton,
  createButton,
  saveButton,
  gameFieldContainer,
} from './references.js';

//States:
let selectedMap = map1.map;
let palcedLights = [];
let error = false;
let success = false;

//Events:
playButton.addEventListener('click', () => onPlayButtonClick());
const onPlayButtonClick = () => {
  gameFieldContainer.innerHTML = renderMap(selectedMap);
};

const getIndexes = (e) => {};

gameFieldContainer.addEventListener('click', (e) => onGameCellClick(e));
const onGameCellClick = (e) => {
  if (!e.target.matches('.white')) {
    console.log('bad target');
    return;
  } else {
    if (e.target.innerHTML == lightbulb) {
      e.target.innerHTML = '';
      const indexOfObject = palcedLights.findIndex((element) => {
        return (
          element[0] === e.target.parentElement.rowIndex &&
          element[1] === e.target.cellIndex
        );
      });
      palcedLights.splice(indexOfObject, 1);
    } else {
      e.target.innerHTML = lightbulb;
      const newLamp = [e.target.parentElement.rowIndex, e.target.cellIndex];
      palcedLights.push(newLamp);
    }
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
  return `<td class="gameCell ${gameCell.type}" style="background-color:${
    gameCell.type
  }">${renderNumber(gameCell)}</td>`;
};

const renderNumber = (gameCell) => {
  if (gameCell.type == 'white') {
    return '';
  } else if (gameCell.type == 'black') {
    return `${gameCell.level}`;
  }
};

//Icons:
const lightbulb = '💡';
