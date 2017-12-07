const fs = require('fs');
const text = fs.readFileSync('./data/dec-4-data.txt', 'utf-8');
const arrayOfStrings = text.split('\n').filter(item => item);
const matrix = arrayOfStrings.map(row => row.split(' ').filter(item => item));

const hasDuplicates = array => {
  return new Set(array).size !== array.length;
};

const isAnagram = (first, second) => {
  if (first.length !== second.length) return false;
  const firstAllInSecond = first
    .split('')
    .every(char => second.split('').includes(char));
  if (!firstAllInSecond) return false;
  return second.split('').every(char => first.split('').includes(char));
};

const hasAnagrams = array => {
  return array.some((element, index) => {
    const loopArray = [...array];
    loopArray.splice(index, 1);
    return loopArray.some(loopElem => isAnagram(loopElem, element));
  });
};

const answer = matrix.reduce((acc, currRow) => {
  if (hasDuplicates(currRow) || hasAnagrams(currRow)) return acc;
  return acc + 1;
}, 0);

console.log(hasAnagrams(['abcd', 'dcba', 'aaa']));
console.log(hasAnagrams(['abcd', 'bbbb', 'aaa']));

console.log(answer);
