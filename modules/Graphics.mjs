import { setRandomList } from './utils.mjs';

export class Graphics {
  constructor() {
    this.background = document.getElementById('background');
    this.screen = { width: screen.width, height: screen.height };
    this.stars = { density: 0.01, dummySpacing: 25 };
  }

  drawBackground = () => {
    if (this.background.getContext) {
      this.setStarsDatas();
      this.drawStars();
    }
  };

  setStarsDatas() {
    const { dummySpacing, density } = this.stars;
    const { width, height } = this.screen;
    this.background.width = width;
    this.background.height = height;

    const screenDensity = (height * width) / dummySpacing;
    const starsQty = density * screenDensity;

    this.stars.diameters = setRandomList({
      count: starsQty,
      minValue: 1,
      maxValue: 3,
    });

    this.stars.xValues = setRandomList({
      count: starsQty,
      minValue: 1,
      maxValue: width,
    });

    this.stars.yValues = setRandomList({
      count: starsQty,
      minValue: 1,
      maxValue: height,
    });
  }

  drawStars() {
    const ctx = this.background.getContext('2d');
    const { diameters, xValues, yValues } = this.stars;

    diameters.forEach((diameter, index) => {
      ctx.fillStyle = '#4eed3fe1';
      ctx.beginPath();
      ctx.arc(xValues[index], yValues[index], diameter, Math.PI, -Math.PI);
      ctx.fill();
    });
  }
}
