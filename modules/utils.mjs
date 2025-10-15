export const setRandomList = ({
  count,
  minValue,
  maxValue,
  allowDuplicates = true,
}) => {
  const numbers = [];

  for (let i = 0; i < count; i++) {
    const chooseNewNumber = () => {
      const number = getRandomInt(minValue, maxValue);

      if (!allowDuplicates && numbers.includes(number)) {
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
