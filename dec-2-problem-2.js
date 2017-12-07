const fs = require('fs');

const text = fs.readFileSync('./data/dec-2-data.txt', 'utf-8');

const arrayOfStrings = text.split('\n').filter(item => item);

const matrix = arrayOfStrings.map(row => row.split(' ').filter(item => item));

const findDivisible = array => {
  let result;
  for (const val of array) {
    const divisor = array.filter((item) => item % val === 0 && item !== val)
    if (divisor.length) {
      result = divisor / val
      break;
    }
  }
  return result;
}

const sum = matrix.reduce(
  (acc, curr) => findDivisible(curr) + acc,
  0
);

console.log('Sum: ', sum);
