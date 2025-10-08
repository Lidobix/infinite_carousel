const UNIT = 'vw';
const ITEM_WIDTH = 15;
const gap = 3;

export class Slider {
  constructor(entryDatas, duration) {
    this.index;
    this.entryDatas = entryDatas;
    this.translationDuration = duration;
    this.screenWidth = window.innerWidth;
    this.cardsQty = 1 + Math.ceil(100 / (ITEM_WIDTH + gap));
    this.translationDistance = 100 + ITEM_WIDTH + gap;
    this.ul = document.querySelector('ul');
  }

  getAnimationParams(position) {
    const speed = 100 / this.translationDuration;
    const distance = gap + 100 * (position / this.screenWidth) + ITEM_WIDTH;
    const duration = distance / speed;

    return { duration, distance };
  }

  drawList() {
    this.ul.style.gap = gap + UNIT;
    for (let i = 0; i < this.cardsQty; i++) {
      this.addListItem();
    }
  }

  updateDataIndex() {
    if (this.index === this.entryDatas.length - 1 || this.index === undefined) {
      this.index = 0;
      return;
    }
    this.index = this.index + 1;
  }

  getDatas() {
    this.updateDataIndex();
    return this.entryDatas[this.index];
  }

  toggleSlider(run) {
    const ulAnimation = this.ul.getAnimations()[0];
    if (run) {
      ulAnimation.play();
    } else {
      ulAnimation.pause();
    }
  }

  addListItem() {
    const data = this.getDatas();
    const card = this.createCard(data);

    const li = document.createElement('li');
    li.appendChild(card);

    li.style.width = ITEM_WIDTH + UNIT;

    li.addEventListener('mouseenter', (e) => {
      this.toggleSlider(false);
      li.style.zIndex = '10';
      li.animate([{ transform: `scale(1.3)` }], {
        duration: 100,
        fill: 'forwards',
      });
    });

    li.addEventListener('mouseleave', () => {
      li.style.zIndex = '1';
      li.animate([{ transform: `scale(1)` }], {
        duration: 50,
        fill: 'forwards',
      });

      this.toggleSlider(true);
    });

    this.ul.appendChild(li);
  }

  controlAnimation() {
    const firstElement = this.ul.firstElementChild;
    const firstElementRight = firstElement.getBoundingClientRect().right;

    if (firstElementRight < 0) {
      const animation = this.ul.getAnimations()[0];

      this.ul.style.left =
        firstElementRight + (gap * this.screenWidth) / 100 + 'px';
      this.ul.firstElementChild.remove();
      this.addListItem();

      animation.cancel();
      this.launchAnimation();
    }

    window.requestAnimationFrame(() => {
      this.controlAnimation();
    });
  }

  launchAnimation() {
    this.ul.animate(
      [{ transform: `translateX(-${this.translationDistance}vw)` }],
      {
        duration: this.translationDuration,
      }
    );
  }

  createCard(data) {
    const statusIcon = {
      alive: '♥️',
      dead: '💀',
      unknown: '🤔',
    };

    const card = document.createElement('div');
    card.classList.add('card');

    const description = document.createElement('div');
    description.classList.add('description');

    const nameP = document.createElement('p');
    nameP.innerText = `${data.name}`;
    nameP.classList.add('name');

    const episodesP = document.createElement('p');
    episodesP.innerText = `Appears in ${data.episode.length} episode${
      data.episode.length > 1 ? 's' : ''
    }`;
    episodesP.classList.add('episodes');

    const statusP = document.createElement('span');
    statusP.innerText = `${statusIcon[data.status.toLowerCase()]}`;
    statusP.classList.add('status');

    const imgContainer = document.createElement('div');
    imgContainer.style.height = `${ITEM_WIDTH}vw`;
    imgContainer.classList.add('img_container');

    const _image = document.createElement('div');
    _image.style.backgroundImage = `url(${data.image})`;
    _image.classList.add('_image');

    imgContainer.appendChild(_image);
    imgContainer.append(statusP);

    description.append(nameP);
    description.append(episodesP);

    card.appendChild(imgContainer);
    card.appendChild(description);

    return card;
  }

  start() {
    this.drawList();
    this.launchAnimation();
    this.controlAnimation();
  }
}
