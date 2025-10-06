const UNIT = 'vw';
const ITEM_WIDTH = 30;

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

    console.log(this.displayedDatas);
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
    const img = document.createElement('img');
    const div = document.createElement('div');
    const name = document.createComment('span');
    const age = document.createComment('span');
    const specie = document.createComment('span');
    const episodes = document.createComment('span');

    const endLeft =
      ul.children.length > 0
        ? ul.lastElementChild.getBoundingClientRect().right
        : this.screenWidth;

    const card = this.createCard(data);
    li.appendChild(card);

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

  createCard(data) {
    const card = document.createElement('div');
    const description = document.createElement('div');
    const name = document.createElement('span');
    const species = document.createElement('span');
    const episodes = document.createElement('span');
    const image = document.createElement('img');

    name.textContent = `nom : ${data.name}`;
    species.textContent = `espèce : ${data.species}`;
    episodes.textContent = `episodes : ${data.episode.length}`;
    image.src = data.image;

    card.append(image);
    description.append(name);
    description.append(species);
    description.append(episodes);
    card.appendChild(description);

    card.classList.add('card');

    return card;
  }

  start() {
    this.initDatas();
    this.drawList();
  }
}
