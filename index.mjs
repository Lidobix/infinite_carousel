import { Slider } from './modules/slider.mjs';
import { Characters } from './modules/datas.mjs';

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

const characters = new Characters();

characters.get();

// return;

const slider = new Slider(entryDatas, duration);

const authorizedOrientations = ['landscape-primary', 'landscape-secondary'];
const message = document.getElementById('message');
const ul = document.querySelector('ul');

const showMessage = () => {
  message.classList.remove('hidden');
  message.classList.add('visible');

  ul.classList.remove('visible');
  ul.classList.add('hidden');
};

const showList = () => {
  message.classList.add('hidden');
  message.classList.remove('visible');

  ul.classList.add('visible');
  ul.classList.remove('hidden');
};

const isLandscape = () => {
  return authorizedOrientations.includes(window.screen.orientation.type);
};

if (!isLandscape() && window.screen.width < 500) {
  showMessage();
} else {
  showList();
  slider.start();
}

window.addEventListener('orientationchange', () => {
  if (isLandscape()) {
    showList();
    slider.start();
  } else {
    showMessage();
  }
});
