import { Slider } from './modules/slider.mjs';
import { Characters } from './modules/characters.mjs';
import { isLandscape } from './modules/utils.mjs';

const duration = 5000;
const charactersQty = 30;

const characters = new Characters(charactersQty);

const launchSlider = () => {
  characters.get().then((result) => {
    const slider = new Slider(result, duration);
    slider.start();
  });
};

launchSlider();

window.addEventListener('orientationchange', () => {
  if (isLandscape()) {
    showList();
    launchSlider();
  } else {
    showMessage();
  }
});
