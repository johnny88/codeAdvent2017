// const array = [0, 2, 7, 0];
const fs = require('fs');
const text = fs.readFileSync('./data/dec-6-data.txt', 'utf-8');
const arrayOfStrings = text
  .replace(/\t/g, ' ')
  .replace(/\n/g, ' ')
  .split(' ')
  .filter(item => item);
const array = arrayOfStrings.map(item => Number(item));

const getArrayMax = arr =>
  arr.reduce(function(a, b) {
    return Math.max(a, b);
  });

const compareArrays = (first, second) =>
  first.length == second.length &&
  first.every((elem, idx) => elem === second[idx]);

const includesArray = (array, history) =>
  history.some(elem => compareArrays(elem, array));

const distrubuteMax = arr => {
  const max = getArrayMax(arr);
  const maxIdx = arr.indexOf(max);
  const newArray = [...arr];
  newArray[maxIdx] = 0;
  let indexMarker;
  if (maxIdx < arr.length - 1) {
    indexMarker = maxIdx + 1;
  } else {
    indexMarker = 0;
  }
  for (let idx = 1; idx <= max; idx++) {
    newArray[indexMarker] = newArray[indexMarker] + 1;
    if (indexMarker < arr.length - 1) {
      indexMarker++;
    } else {
      indexMarker = 0;
    }
  }
  return newArray;
};

const main = arr => {
  let currArr = [...arr];
  const history = [];
  history.push(array);
  let historyHasDuplicates = false;

  let counter = 0;
  while (!historyHasDuplicates) {
    const newArray = distrubuteMax(currArr);
    historyHasDuplicates = includesArray(newArray, history);
    history.push(newArray);
    currArr = newArray;
    counter++;
  }
  console.log('Final Count: ', counter);
};

main(array);
