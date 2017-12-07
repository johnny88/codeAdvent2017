// const array = [0, 2, 7, 0];
const fs = require('fs');
const text = fs.readFileSync('./data/dec-7-data.txt', 'utf-8');
const arrayOfStrings = text.split('\n').filter(item => item);

const towers = {};

const splitFront = front => {
  const [root, weight] = front.split('(');
  return {
    root: root.trim(),
    weight: weight.replace(')', '')
  };
};

for (let string of arrayOfStrings) {
  if (string.includes('->')) {
    const [front, back] = string.split(' -> ');
    const { root, weight } = splitFront(front);
    const branches = back.split(', ');
    towers[root] = {
      root,
      weight,
      branches
    };
  } else {
    const { root, weight } = splitFront(string);
    towers[root] = {
      root,
      weight
    };
  }
}

const keys = Object.keys(towers);
const allBranches = Object.values(towers).reduce((acc, currObj) => {
  if (!currObj.branches) return acc;
  return [...acc, ...currObj.branches];
}, []);

const bottom = keys.find(key => !allBranches.includes(key));
console.log(bottom);
