import { maps, w0, b0, b1, b2, b3, b4, b5 } from './data.js';
import { renderMap } from './template.js';
import {
  playButton,
  createButton,
  saveButton,
  gameFieldContainer,
  selectPlayerButton,
} from './references.js';

//Events:
playButton.addEventListener('click', () => onPlayButtonClick());
const onPlayButtonClick = () => {
  selectedMapObject = maps[selectedMapIndex];
  currentMap = [...selectedMapObject.map];
  gameFieldContainer.innerHTML = renderMap(currentMap);
};

gameFieldContainer.addEventListener('click', (e) => onGameCellClick(e));
const onGameCellClick = (e) => {
  if (e.target.matches('td'))
    if (canPlay === true) {
      let rowIndex = e.target.parentElement.rowIndex;
      let cellIndex = e.target.cellIndex;
      lightBulbAction(rowIndex, cellIndex);
      gameFieldContainer.innerHTML = renderMap(currentMap);
      expandFrom(rowIndex, cellIndex);
    }
};

selectPlayerButton.addEventListener('click', () =>
  console.log(currentMap, 'logged currentMap')
);
//States:
let selectedMapIndex = 0;
let selectedMapObject;
let currentMap;
let blockStates = [];
let bulbPlacements = [];
let canPlay = true;

//Utilities

const lightBulbAction = (rowIndex, cellIndex) => {
  let clickedField = { ...currentMap[rowIndex][cellIndex] };
  let type;
  let success = false;
  if (clickedField.type === 'black') {
    return;
  } else {
    if (clickedField.hasBulb) {
      //TODO expand darkness
      type = 'dark';
      clickedField.hasBulb = false;
      if (clickedField.level > 0) clickedField.level--;
    }
    if (!clickedField.hasBulb) {
      //TODO expand light
      type = 'light';
      clickedField.hasBulb = true;
      clickedField.level++;
    }
    success = true;
  }
  currentMap[rowIndex][cellIndex] = clickedField;
};

const expandFrom = (rowIndex, cellIndex, type) => {
  let currentRow = getFullRow(rowIndex);
  let rowChunks = getNonBlockingChunks(currentRow);
  let currentRowChunk = getCurrentChunk(rowChunks, cellIndex);
  let startingRowChunkIndex = getIndexOfElementWithAttributes(
    cellIndex,
    rowIndex,
    currentRowChunk
  );

  let currentCol = getFullCol(cellIndex);
  let colChunks = getNonBlockingChunks(currentCol);
  let currentColChunk = getCurrentChunk(colChunks, rowIndex);
};

const getIndexBoundaries = (map) => {
  return { rows: map.rows, cols: map.cols };
};

const getFullRow = (rowIndex) => {
  let fullRow = [];
  for (let i = 0; i < getIndexBoundaries(selectedMapObject).cols; i++) {
    fullRow.push({
      ...currentMap[rowIndex][i],
      rowIndex: rowIndex,
      cellIndex: i,
    });
  }
  return fullRow;
};

const getFullCol = (colIndex) => {
  let fullCol = [];
  for (let i = 0; i < getIndexBoundaries(selectedMapObject).rows; i++) {
    fullCol.push({
      ...currentMap[i][colIndex],
      rowIndex: i,
      cellIndex: colIndex,
    });
  }
  return fullCol;
};

const getNonBlockingChunks = (currentDataArray) => {
  let chunks = [];
  let chunk = [];
  for (let i = 0; i < currentDataArray.length; i++) {
    if (currentDataArray[i].type === 'field') {
      chunk.push(currentDataArray[i]);
    } else if (currentDataArray[i].type === 'black') {
      if (chunk.length !== 0) chunks.push(chunk);
      chunks.push('black');
      chunk = [];
    }
    if (i === currentDataArray.length - 1) {
      if (chunk.length !== 0) chunks.push(chunk);
    }
  }
  return chunks;
};

const getCurrentChunk = (chunks, cellIndex) => {
  let counter = 0;
  for (let i = 0; i < chunks.length; i++) {
    if (Array.isArray(chunks[i])) {
      for (let j = 0; j < chunks[i].length; j++) {
        if (counter === cellIndex) {
          return chunks[i];
        } else {
          counter++;
        }
      }
    } else {
      counter++;
    }
  }
};
const getIndexOfElementWithAttributes = (cellIndex, rowIndex, arrayToCheck) => {
  //idk why findIndex refused to give me a proper index value
  let i = 0;
  for (i; i < arrayToCheck.length; i++) {
    if (
      arrayToCheck[i].cellIndex === cellIndex &&
      arrayToCheck[i].rowIndex === rowIndex
    ) {
      break;
    }
  }
  return i;
};
