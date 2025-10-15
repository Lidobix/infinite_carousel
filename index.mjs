import { Slider } from './modules/Slider.mjs';
import { Characters } from './modules/Characters.mjs';
import { Graphics } from './modules/graphics.mjs';

const graphics = new Graphics();

const duration = window.innerWidth > 500 ? 15000 : 5000;
const charactersQty = 30;

const characters = new Characters(charactersQty);

const launchSlider = () => {
  characters.get().then((result) => {
    const slider = new Slider(result, duration);
    slider.start();
  });
};

window.onload = () => {
  graphics.drawBackground();
  launchSlider();
};
