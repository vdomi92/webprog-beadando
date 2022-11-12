import { maps, w0, b0, b1, b2, b3, b4, b5, l1, l2, l3, lb } from './data.js';
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
  //currentMap = deepClone(selectedMapObject.map);
  currentMap = [...selectedMapObject.map];
  gameFieldContainer.innerHTML = renderMap(currentMap);
};

gameFieldContainer.addEventListener('click', (e) => onGameCellClick(e));
const onGameCellClick = (e) => {
  let rowIndex = e.target.parentElement.rowIndex;
  let cellIndex = e.target.cellIndex;
  let target = currentMap[rowIndex][cellIndex];
  lightBulbAction(target, rowIndex, cellIndex);
};

selectPlayerButton.addEventListener('click', () =>
  console.log(currentMap, 'logged currentMap')
);
//States:
let selectedMapIndex = 0;
let selectedMapObject;
let currentMap;
let error = false;
let success = false;

//Utilities
const deepClone = (obj) => {
  if (obj === null) return null;
  let clone = Object.assign({}, obj);
  Object.keys(clone).forEach(
    (key) =>
      (clone[key] =
        typeof obj[key] === 'object' ? deepClone(obj[key]) : obj[key])
  );
  if (Array.isArray(obj)) {
    clone.length = obj.length;
    return Array.from(clone);
  }
  return clone;
};

const lightBulbAction = (target, rowIndex, cellIndex) => {
  if (
    target.type != 'black' &&
    target.type != 'lightBulb' &&
    target.type != 'yellow'
  ) {
    addLightBulb(rowIndex, cellIndex);
    gameFieldContainer.innerHTML = renderMap(currentMap);
    setTimeout(() => {
      letThereBeLight(rowIndex, cellIndex);
    }, '500');
  } else if (target.type == 'lightBulb') {
    removeLightBulb(rowIndex, cellIndex);
    gameFieldContainer.innerHTML = renderMap(currentMap);
    setTimeout(() => {
      letThereBeDarkness(rowIndex, cellIndex);
    }, '500');
  }
};

const addLightBulb = (rowIndex, cellIndex) => {
  currentMap[rowIndex][cellIndex] = lb;
};
const removeLightBulb = (rowIndex, cellIndex) => {
  currentMap[rowIndex][cellIndex] = w0;
};

const letThereBeLight = (rowIndex, cellIndex) => {
  if (rowIndex > 0) lightUp(rowIndex - 1, cellIndex);
  if (cellIndex > 0) lightLeft(rowIndex, cellIndex - 1);
  if (cellIndex < selectedMapObject.cols - 1)
    lightRight(rowIndex, cellIndex + 1);
  if (rowIndex < selectedMapObject.rows - 1) lightDown(rowIndex + 1, cellIndex);
};
const letThereBeDarkness = (rowIndex, cellIndex) => {
  if (rowIndex > 0) darkUp(rowIndex - 1, cellIndex);
  if (cellIndex > 0) darkLeft(rowIndex, cellIndex - 1);
  if (cellIndex < selectedMapObject.cols - 1)
    darkRight(rowIndex, cellIndex + 1);
  if (rowIndex < selectedMapObject.rows - 1) darkDown(rowIndex + 1, cellIndex);
};

const darkUp = (rowIndex, cellIndex) => {
  if (currentMap[rowIndex][cellIndex].type === 'black') {
    return;
  } else {
    changeDarkFields(rowIndex, cellIndex);
    gameFieldContainer.innerHTML = renderMap(currentMap);
    if (rowIndex > 0) {
      setTimeout(() => {
        darkUp(rowIndex - 1, cellIndex);
      }, '200');
    }
  }
};
const darkLeft = (rowIndex, cellIndex) => {
  if (currentMap[rowIndex][cellIndex].type === 'black') {
    return;
  }
  changeDarkFields(rowIndex, cellIndex);
  gameFieldContainer.innerHTML = renderMap(currentMap);
  if (cellIndex > 0) {
    setTimeout(() => {
      darkLeft(rowIndex, cellIndex - 1);
    }, '200');
  }
};
const darkRight = (rowIndex, cellIndex) => {
  if (currentMap[rowIndex][cellIndex].type === 'black') {
    return;
  }
  changeDarkFields(rowIndex, cellIndex);
  gameFieldContainer.innerHTML = renderMap(currentMap);
  if (cellIndex < selectedMapObject.cols - 1) {
    setTimeout(() => {
      darkRight(rowIndex, cellIndex + 1);
    }, '200');
  }
};
const darkDown = (rowIndex, cellIndex) => {
  if (currentMap[rowIndex][cellIndex].type === 'black') {
    return;
  }
  changeDarkFields(rowIndex, cellIndex);
  gameFieldContainer.innerHTML = renderMap(currentMap);
  if (rowIndex < selectedMapObject.rows - 1) {
    setTimeout(() => {
      darkDown(rowIndex + 1, cellIndex);
    }, '200');
  }
};

const lightUp = (rowIndex, cellIndex) => {
  if (currentMap[rowIndex][cellIndex].type === 'black') {
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
    return;
  }
  changeLightFields(rowIndex, cellIndex);
  gameFieldContainer.innerHTML = renderMap(currentMap);
  if (cellIndex < selectedMapObject.cols - 1) {
    setTimeout(() => {
      lightRight(rowIndex, cellIndex + 1);
    }, '500');
  }
};
const lightDown = (rowIndex, cellIndex) => {
  if (currentMap[rowIndex][cellIndex].type === 'black') {
    return;
  }
  changeLightFields(rowIndex, cellIndex);
  gameFieldContainer.innerHTML = renderMap(currentMap);
  if (rowIndex < selectedMapObject.rows - 1) {
    setTimeout(() => {
      lightDown(rowIndex + 1, cellIndex);
    }, '500');
  }
};

const changeLightFields = (rowIndex, cellIndex) => {
  if (JSON.stringify(currentMap[rowIndex][cellIndex]) === JSON.stringify(lb)) {
    error = true;
    console.log('lightbulb hit with light');
  }
  if (JSON.stringify(currentMap[rowIndex][cellIndex]) === JSON.stringify(w0)) {
    currentMap[rowIndex][cellIndex] = l1;
  } else if (
    JSON.stringify(currentMap[rowIndex][cellIndex]) === JSON.stringify(l1)
  ) {
    currentMap[rowIndex][cellIndex] = l2;
  } else if (
    JSON.stringify(currentMap[rowIndex][cellIndex]) === JSON.stringify(l2)
  ) {
    currentMap[rowIndex][cellIndex] = l3;
    error = true;
  }
};

const changeDarkFields = (rowIndex, cellIndex) => {
  if (JSON.stringify(currentMap[rowIndex][cellIndex]) === JSON.stringify(l1)) {
    currentMap[rowIndex][cellIndex] = w0;
  } else if (
    JSON.stringify(currentMap[rowIndex][cellIndex]) === JSON.stringify(l2)
  ) {
    currentMap[rowIndex][cellIndex] = l1;
  } else if (
    JSON.stringify(currentMap[rowIndex][cellIndex]) === JSON.stringify(l3)
  ) {
    currentMap[rowIndex][cellIndex] = l2;
    //   error = true; count -1
  } else if (
    JSON.stringify(currentMap[rowIndex][cellIndex]) === JSON.stringify(lb)
  ) {
    currentMap[rowIndex][cellIndex] = w0;
  }
};

//Templates:

//Icons:
