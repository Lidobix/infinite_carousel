import { Slider } from './modules/slider.mjs';
import { Characters } from './modules/characters.mjs';
import { isLandscape, showList, showMessage } from './modules/utils.mjs';

const duration = 20000;
const cardsQty = 15;

const characters = new Characters(cardsQty);

const launchSlider = () => {
  characters.get().then((result) => {
    const slider = new Slider(result, duration);
    slider.start();
  });
};

if (!isLandscape() && window.screen.width < 500) {
  showMessage();
} else {
  showList();
  launchSlider();
}

window.addEventListener('orientationchange', () => {
  if (isLandscape()) {
    showList();
    launchSlider();
  } else {
    showMessage();
  }
});
