import { savedMaps } from './data';
import { playButton, createButton, saveButton } from './references';

playButton.addEventListener('click', () => onPlayButtonClick());

const onPlayButtonClick = () => {
  state.initDrawing();
};
