export const setRandomList = (params) => {
  const { qty, max } = params;
  const numbers = [];

  for (let i = 0; i <= qty; i++) {
    const chooseNewNumber = () => {
      const number = getRandomInt(0, max);

      if (numbers.includes(number)) {
        chooseNewNumber();
      } else {
        numbers.push(number);
      }
    };

    chooseNewNumber();
  }

  return numbers;
};

function getRandomInt(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}
