const fs = require('fs');
const text = fs.readFileSync('./data/dec-5-data.txt', 'utf-8');
const arrayOfStrings = text.split('\n').filter(item => item);
const array = arrayOfStrings.map(item => Number(item));

// const testArray = [0, 3, 0, 1, -3];

const getExitLength = array => {
  let currIdx = 0;
  let counter = 0;
  console.log('Running jumps. Please wait...');
  while (currIdx <= array.length - 1) {
    counter = counter + 1;
    const newIndex = currIdx + array[currIdx];
    if (array[currIdx] >= 3) {
      array[currIdx] = array[currIdx] - 1;
    } else {
      array[currIdx] = array[currIdx] + 1;
    }
    currIdx = newIndex;
    if (counter > 999999999999)
      throw new Error('Numbers too big: "We\'re gonna need a bigger array"');
  }
  return counter;
};

console.log(getExitLength(array));
// console.log(getExitLength(testArray));
