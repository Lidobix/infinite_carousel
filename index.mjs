import { Slider } from './slider.mjs';

const duration = 20000;

const entryDatas = [
  { index: 0, color: 'blue', text: '0' },
  { index: 1, color: 'red', text: '1' },
  { index: 2, color: 'green', text: '2' },
  { index: 3, color: 'yellow', text: '3' },
  { index: 4, color: 'black', text: '4' },
  { index: 5, color: 'grey', text: '5' },
  { index: 6, color: 'purple', text: '6' },
  { index: 7, color: 'pink', text: '7' },
  { index: 8, color: 'brown', text: '8' },
  { index: 9, color: 'magenta', text: '9' },
];

const slider = new Slider(entryDatas, duration);

slider.start();
