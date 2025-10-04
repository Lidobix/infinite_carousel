const UNIT = 'vw';
const ITEM_WIDTH = 50;

export class Slider {
  constructor(entryDatas, duration) {
    this.entryDatas = entryDatas;
    this.duration = duration;
    this.displayedDatas = [];
    this.screenWidth = window.screen.width;
  }

  getAnimationParams(position) {
    const speed = 100 / this.duration;
    const distance = 100 * (position / this.screenWidth) + ITEM_WIDTH;
    const duration = distance / speed;

    return { duration, distance };
  }

  initDatas() {
    this.displayedDatas = this.entryDatas;

    const entryDatasWidth = this.entryDatas.length * ITEM_WIDTH;
    const SLOTS_DISPO = 1 + Math.ceil((100 - entryDatasWidth) / ITEM_WIDTH);
    const listToAdd = Math.ceil(SLOTS_DISPO / this.entryDatas.length);

    if (SLOTS_DISPO > 0) {
      for (let i = 0; i < listToAdd; i++) {
        this.displayedDatas = this.displayedDatas.concat(this.entryDatas);
      }
    }
  }

  drawList() {
    if (!this.displayedDatas.length) {
      return;
    }

    this.displayedDatas.forEach((data) => {
      this.createListItem(data);
    });
  }

  createListItem(data) {
    const ul = document.querySelector('ul');
    const li = document.createElement('li');

    const endLeft =
      ul.children.length > 0
        ? ul.lastElementChild.getBoundingClientRect().right
        : this.screenWidth;

    li.innerText = data.text;
    li.style.backgroundColor = data.color;
    li.style.width = ITEM_WIDTH + UNIT;
    li.style.left = `${(100 * endLeft) / this.screenWidth}${UNIT}`;

    const { distance, duration } = this.getAnimationParams(endLeft);
    const animation = li.animate(
      [{ transform: `translateX(-${distance}${UNIT})` }],
      {
        duration,
      }
    );

    animation.onfinish = () => {
      ul.firstElementChild.remove();
      this.createListItem(data);
    };

    ul.appendChild(li);
  }

  events() {
    window.addEventListener('resize', () => {
      if (window.innerWidth / window.screen.width < 0.9) {
        console.log('trop petit');
      }
    });
  }

  start() {
    this.initDatas();
    this.drawList();
  }
}
