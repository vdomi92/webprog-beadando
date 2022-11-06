import { map1 } from './data.js';
import {
  playButton,
  createButton,
  saveButton,
  gameField,
} from './references.js';

//States:
let selectedMap = map1.map;
let palcedLights = [];
let error = false;
let success = false;

//Events:
playButton.addEventListener('click', () => onPlayButtonClick());

const onPlayButtonClick = () => {
  gameField.innerHTML = renderMap(selectedMap);
  console.log(selectedMap);
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
  return `<td class="gameCell" style="background-color:${
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
