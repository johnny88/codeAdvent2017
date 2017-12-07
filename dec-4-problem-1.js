const fs = require('fs');
const text = fs.readFileSync('./data/dec-4-data.txt', 'utf-8');
const arrayOfStrings = text.split('\n').filter(item => item);
const matrix = arrayOfStrings.map(row => row.split(' ').filter(item => item));

const hasDuplicates = array => {
  return new Set(array).size !== array.length;
};

const answer = matrix.reduce((acc, currRow) => {
  if (hasDuplicates(currRow)) return acc;
  return acc + 1;
}, 0);

console.log(answer);
