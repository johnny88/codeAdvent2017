const fs = require('fs');

const text = fs.readFileSync('./data/dec-2-data.txt', 'utf-8');

const arrayOfStrings = text.split('\n').filter(item => item);

const matrix = arrayOfStrings.map(row => row.split(' ').filter(item => item));

const sum = matrix.reduce(
  (acc, curr) => Math.max(...curr) - Math.min(...curr) + acc,
  0
);

console.log('Sum: ', sum);
