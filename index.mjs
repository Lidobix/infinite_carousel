import { Slider } from './modules/slider.mjs';
import { Characters } from './modules/characters.mjs';

const duration = window.innerWidth > 500 ? 15000 : 5000;
const charactersQty = 30;

const characters = new Characters(charactersQty);

const launchSlider = () => {
  characters.get().then((result) => {
    const slider = new Slider(result, duration);
    slider.start();
  });
};

launchSlider();
