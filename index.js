const duration = 20000;
const UNIT = 'px';
const ITEM_WIDTH = 300;

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

class Slider {
  constructor(entryDatas, duration) {
    this.entryDatas = entryDatas;
    this.duration = duration;
    this.displayedDatas = [];
    this.screenWidth = window.screen.width;
    this.displayableSqaresQty = 0;
  }

  getElementDuration(position) {
    const speed = this.screenWidth / this.duration;

    const distance = position + ITEM_WIDTH;
    const duration = distance / speed;

    return { duration, distance };
  }

  initDatas() {
    this.displayedDatas = this.entryDatas;
    this.displayableSqaresQty = Math.ceil(this.screenWidth / ITEM_WIDTH);

    const entryDatasWidth = this.entryDatas.length * ITEM_WIDTH;
    const SLOTS_DISPO = Math.ceil(
      (this.screenWidth - entryDatasWidth) / ITEM_WIDTH
    );

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

    this.displayedDatas.forEach((value) => {
      this.createItem(value);
      return;
    });
  }

  createItem(value) {
    const ul = document.querySelector('ul');
    const li = document.createElement('li');
    let endLeft;

    if (ul.children.length > 0) {
      endLeft = ul.lastElementChild.getBoundingClientRect().right;
    } else {
      endLeft = this.screenWidth;
    }

    li.style.backgroundColor = value.color;
    li.innerText = value.text;
    li.style.width = ITEM_WIDTH + UNIT;
    li.style.left = `${endLeft}px`;

    const { distance, duration } = this.getElementDuration(endLeft);
    const animation = li.animate(
      [{ transform: `translateX(-${distance}px)` }],
      {
        duration,
      }
    );

    animation.onfinish = (e) => {
      ul.firstElementChild.remove();
      this.createItem(value);
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

const slider = new Slider(entryDatas, duration);

slider.start();
