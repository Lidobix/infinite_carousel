export class Slider {
  constructor(entryDatas, duration) {
    this.entryDatas = entryDatas;
    this.duration = duration;
    this.listQty = 10;
    this.ul;
    this.liWidth = 0;
    this.ulWidth = 0;
    this.ulGap = 0;
    this.slider = document.getElementById('slider');
    this.cssSet = false;
    this.index;
    this.sliderPaused = false;
  }

  setCSSParams() {
    const liElement = document.querySelector('li');
    this.liWidth = parseFloat(
      window.getComputedStyle(liElement).getPropertyValue('width')
    );

    this.ulGap = parseFloat(
      window.getComputedStyle(this.slider).getPropertyValue('gap')
    );

    this.cssSet = true;
  }

  drawSlider() {
    for (let i = 0; i < this.listQty; i++) {
      this.drawList();
    }
  }

  drawList() {
    this.ul = document.createElement('ul');
    this.ulWidth = 0;

    this.slider.append(this.ul);
    while (this.ulWidth < window.innerWidth) {
      this.ulWidth = this.ul.offsetWidth;
      this.addListItem();
    }

    this.ul.style.gap = this.ulGap + 'px';
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

  toggleSlider() {
    const sliderAnimation = this.slider.getAnimations()[0];

    if (this.sliderPaused) {
      sliderAnimation.play();
    } else {
      sliderAnimation.pause();
    }

    this.sliderPaused = !this.sliderPaused;
  }

  addListItem() {
    const li = document.createElement('li');
    this.ul.appendChild(li);
    if (!this.cssSet) {
      this.setCSSParams();
    }

    const data = this.getDatas();
    const card = this.createCard(data);
    li.appendChild(card);

    li.addEventListener('mouseenter', (e) => {
      this.toggleSlider();
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

      this.toggleSlider();
    });
  }

  controlSliderAnimation() {
    const firstList = this.slider.children[0];
    const firstListRight = firstList.getBoundingClientRect().right;

    if (firstListRight < 0) {
      const sliderAnimation = this.slider.getAnimations()[0];
      this.slider.style.left = firstListRight + this.ulGap + 'px';

      firstList.remove();
      this.drawList();

      sliderAnimation.cancel();
      this.launchAnimation();
    }

    window.requestAnimationFrame(() => {
      this.controlSliderAnimation();
    });
  }

  launchAnimation() {
    const distance = this.ul.offsetWidth * this.ul.children.length + this.ulGap;
    const speed = window.innerWidth / this.duration;

    this.slider.animate(
      [
        {
          transform: `translateX(-${distance}px)`,
        },
      ],
      {
        duration: distance / speed,
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
    imgContainer.style.height = `${this.liWidth}px`;
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
    this.drawSlider();
    this.launchAnimation();
    this.controlSliderAnimation();
  }
}
