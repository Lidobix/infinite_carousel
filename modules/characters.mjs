import { setRandomList } from './utils.mjs';

export class Characters {
  constructor(charactersQty) {
    this.url = 'https://rickandmortyapi.com/api/character/';
    this.charactersQty = charactersQty;
  }

  get() {
    return new Promise((resolve, reject) => {
      this.getCharactersCount()
        .then((count) => {
          return setRandomList({ qty: this.charactersQty, max: count });
        })
        .then((indexes) => {
          return this.getCharacters(indexes);
        })
        .then((datas) => {
          resolve(datas);
        })
        .catch((e) => {
          console.log(e);
          reject(e);
        });
    });
  }

  getCharacters(indexes) {
    let charactersUrl = this.url;
    const _indexes = [...indexes];

    charactersUrl = charactersUrl.concat(_indexes.join(','));

    return new Promise((resolve, reject) => {
      fetch(charactersUrl)
        .then((d) => {
          return d.json();
        })
        .then((d) => {
          resolve(d);
        })
        .catch((e) => {
          reject('ERROR GET CHARACTERS');
        });
    });
  }

  getCharactersCount() {
    return new Promise((resolve, reject) => {
      fetch(this.url)
        .then((d) => {
          return d.json();
        })
        .then((d) => {
          resolve(d.info.count);
        })
        .catch((e) => {
          reject('ERROR GET CHARACTERS COUNT');
        });
    });
  }
}
