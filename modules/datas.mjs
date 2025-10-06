import { setRandomList } from './utils.mjs';

export class Characters {
  constructor() {
    this.url = 'https://rickandmortyapi.com/api/character/';
  }

  get() {
    const indexes = setRandomList({ qty: 10, max: 550 });
  }
  format() {}
}
