const allNumbersBetween = (min, max) => {
  const array = [];
  for (let idx = min; idx <= max; idx++) {
    array.push(idx)
  }
  return array;
}

const value = Number(process.argv[2])

let closeOddSquareUp = Math.ceil(Math.sqrt(value))

if (closeOddSquareUp % 2 === 0) closeOddSquareUp = closeOddSquareUp + 1

const radius = Math.floor(closeOddSquareUp/2) 

const evenSquare = closeOddSquareUp - 1
const closeOddSquareDown = closeOddSquareUp - 2
const firstNumberInSquare = Math.pow(closeOddSquareDown, 2) + 1
const firstMiddle = firstNumberInSquare + radius - 1
const secondMiddle = firstMiddle + evenSquare
const thirdMiddle = secondMiddle + evenSquare
const fourthMiddle = thirdMiddle + evenSquare


const wall1 = [Math.pow(closeOddSquareUp, 2), ...allNumbersBetween(firstNumberInSquare, firstMiddle + radius)]
const wall2 = [...allNumbersBetween(secondMiddle - radius, secondMiddle + radius)]
const wall3 = [...allNumbersBetween(thirdMiddle - radius, thirdMiddle + radius)]
const wall4 = [...allNumbersBetween(fourthMiddle - radius, fourthMiddle + radius)]

if (wall1.includes(value)) {
  const distanceFromMiddle = Math.abs(wall1.indexOf(value) - wall1.indexOf(firstMiddle))
  console.log(distanceFromMiddle + radius)
  return;
}

if (wall2.includes(value)) {
  const distanceFromMiddle = Math.abs(wall2.indexOf(value) - wall2.indexOf(secondMiddle))
  console.log(distanceFromMiddle + radius)
  return;
}

if (wall3.includes(value)) {
  const distanceFromMiddle = Math.abs(wall3.indexOf(value) - wall3.indexOf(thirdMiddle))
  console.log(distanceFromMiddle + radius)
  return;
}

if (wall4.includes(value)) {
  const distanceFromMiddle = Math.abs(wall4.indexOf(value) - wall4.indexOf(fourthMiddle))
  console.log(distanceFromMiddle + radius)
  return;
}
