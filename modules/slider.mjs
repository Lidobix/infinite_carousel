const UNIT = 'vw';
const ITEM_WIDTH = 15;
const gap = 3;

export class Slider {
  constructor(entryDatas, duration) {
    this.entryDatas = entryDatas;
    this.duration = duration;
    this.displayedDatas = [];
    this.screenWidth = window.innerWidth;
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

  getAnimationParams(position) {
    const speed = 100 / this.duration;
    const distance = 100 * (position / this.screenWidth) + ITEM_WIDTH;
    const duration = distance / speed;

    return { duration, distance };
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

    const card = this.createCard(data);
    li.appendChild(card);

    li.style.width = ITEM_WIDTH + UNIT;
    li.style.left = `${gap + (100 * endLeft) / this.screenWidth}${UNIT}`;

    const { distance, duration } = this.getAnimationParams(endLeft);
    const animation = li.animate(
      [{ transform: `translateX(-${gap + distance}${UNIT})` }],
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

    const statusP = document.createElement('p');
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
    this.initDatas();
    this.drawList();
  }
}
