const fs = require('fs');
const text = fs.readFileSync('./data/dec-7-data.txt', 'utf-8');
const arrayOfStrings = text.split('\n').filter(item => item);


const splitFront = front => {
  const [root, weight] = front.split('(');
  return {
    root: root.trim(),
    weight: weight.replace(')', '')
  };
};

const populateTowers = arrayOfStrings => {
  for (let string of arrayOfStrings) {
    if (string.includes('->')) {
      const [front, back] = string.split(' -> ');
      const { root, weight } = splitFront(front);
      const branches = back.split(', ');
      towers[root] = {
        root,
        weight: Number(weight),
        children: branches
      };
    } else {
      const { root, weight } = splitFront(string);
      towers[root] = {
        root,
        weight: Number(weight)
      };
    }
  }
};

const getBottomNode = () => {
  const keys = Object.keys(towers);

  for (let key of keys) {
    const currentNode = towers[key];
    let childrenWeight = 0;
    if (currentNode.children) {
      const childrenWeights = currentNode.children.map(
        child => towers[child].weight
      );
      childrenWeight = childrenWeights.reduce((acc, curr) => acc + curr, 0);
    }
    currentNode.sum = currentNode.weight + childrenWeight;
  }

  const allBranches = Object.values(towers).reduce((acc, currObj) => {
    if (!currObj.branches) return acc;
    return [...acc, ...currObj.branches];
  }, []);

  return keys.find(key => !allBranches.includes(key));
};

const getChildrensSums = node => {
  const currentNode = towers[node];
  if (!currentNode.children) {
    currentNode.sum = currentNode.weight;
    return currentNode.sum;
  } else {
    const childSums = currentNode.children.map(child => {
      if (towers[child].sum) {
        return towers[child].sum;
      } else {
        return getChildrensSums(child);
      }
    });
    currentNode.sum = childSums.reduce((acc, curr) => acc + curr, 0);
    return currentNode.sum;
  }
};

const isOneDifferent = array =>
  array.some((curr, idx) => {
    const newArray = [...array];
    newArray.splice(idx, 1);
    return newArray.every(item => item === newArray[0]) && curr !== newArray[0];
  });

const getOneDifferentChildrenSet = () => {
  const unbalancedSums = {};
  const keys = Object.keys(towers);
  for (let key of keys) {
    const currentNode = towers[key];
    if (!currentNode.children) continue;
    const childSums = currentNode.children.map(child => towers[child].sum);
    if (isOneDifferent(childSums))
      unbalancedSums[key] = {
        sums: childSums,
        id: key
      };
  }
  return unbalancedSums;
};


const towers = {};
populateTowers(arrayOfStrings)
const bottomNode = getBottomNode()
getChildrensSums(bottomNode);
console.log(getOneDifferentChildrenSet())
