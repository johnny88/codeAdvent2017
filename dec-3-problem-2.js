const value = Number(process.argv[2]);

const spiral = {
  '3': {
    wallLeft: [5, 10, 11],
    wallTop: [2, 4, 5],
    wallRight: [25, 1, 2],
    wallBottom: [11, 23, 25]
  }
};

const spiralIndexs = ['3', '5'];

let idx = '5';

const getPreviousSpiralIndex = val => {
  const idx = spiralIndexs.indexOf(val);
  return spiralIndexs[idx - 1];
};

const lastVal = array => array[array.length - 1];

const getBiggestValue = idx => {
  const { wallBottom: wallBottomPrev } = spiral[getPreviousSpiralIndex(idx)];
  if (!spiral[idx]) return lastVal(wallBottomPrev);
  const { wallLeft, wallTop, wallRight, wallBottom } = spiral[idx];
  if (wallBottom.length > 0) return lastVal(wallBottom);
  if (wallLeft.length > 0) return lastVal(wallLeft);
  if (wallTop.length > 0) return lastVal(wallTop);
  return lastVal(wallRight);
};

const getElem = (array, idx) => (array[idx] ? array[idx] : 0);

const initializeSpiralIndex = idx =>
  (spiral[idx] = {
    wallLeft: [],
    wallTop: [],
    wallRight: [],
    wallBottom: []
  });

const populateWallRight = ({ wallRight, wallRightPrev, numIdx, wallTop }) => {
  if (wallRight.length === 0)
    wallRight.push(
      getElem(wallRightPrev, wallRight.length) +
        getElem(wallRightPrev, wallRight.length + 1)
    );
  wallRight.push(
    getElem(wallRightPrev, wallRight.length) +
      getElem(wallRightPrev, wallRight.length + 1) +
      getElem(wallRightPrev, wallRight.length - 1) +
      getElem(wallRight, wallRight.length - 1)
  );
  if (wallRight.length === numIdx - 1) {
    wallTop.push(getElem(wallRight, wallRight.length - 1));
  }
};

const populateWallTop = ({
  wallTop,
  wallRight,
  wallTopPrev,
  numIdx,
  wallLeft
}) => {
  if (wallTop.length === 1)
    wallTop.push(
      getElem(wallRight, wallRight.length - 2) +
        getElem(wallTop, wallTop.length - 1) +
        getElem(wallTopPrev, wallTop.length - 1) +
        getElem(wallTopPrev, wallTop.length)
    );
  wallTop.push(
    getElem(wallTopPrev, wallTop.length) +
      getElem(wallTopPrev, wallTop.length - 1) +
      getElem(wallTopPrev, wallTop.length - 2) +
      getElem(wallTop, wallTop.length - 1)
  );
  if (wallTop.length === numIdx) {
    wallLeft.push(getElem(wallTop, wallTop.length - 1));
  }
};

const populateWallLeft = ({
  wallLeft,
  wallTop,
  wallLeftPrev,
  numIdx,
  wallBottom
}) => {
  if (wallLeft.length === 1)
    wallLeft.push(
      getElem(wallTop, wallTop.length - 2) +
        getElem(wallLeft, wallLeft.length - 1) +
        getElem(wallLeftPrev, wallLeft.length - 1) +
        getElem(wallLeftPrev, wallLeft.length)
    );
  wallLeft.push(
    getElem(wallLeftPrev, wallLeft.length) +
      getElem(wallLeftPrev, wallLeft.length - 1) +
      getElem(wallLeftPrev, wallLeft.length - 2) +
      getElem(wallLeft, wallLeft.length - 1)
  );
  if (wallLeft.length === numIdx) {
    wallBottom.push(getElem(wallLeft, wallLeft.length - 1));
  }
};

const populateWallBottom = ({wallBottom, wallLeft, wallBottomPrev, wallRight, numIdx}) => {
    if (wallBottom.length === 1) {
      wallBottom.push(
        getElem(wallLeft, wallLeft.length - 2) +
          getElem(wallBottom, wallBottom.length - 1) +
          getElem(wallBottomPrev, wallBottom.length - 1) +
          getElem(wallBottomPrev, wallBottom.length)
      );
    } else if (wallBottom.length === numIdx - 2) {
      wallBottom.push(
        getElem(wallRight, 0) +
          getElem(wallBottomPrev, wallBottom.length - 1) +
          getElem(wallBottomPrev, wallBottom.length - 2) +
          getElem(wallBottom, wallBottom.length - 1)
      );
    } else if (wallBottom.length === numIdx - 1) {
      wallBottom.push(
        getElem(wallRight, 0) +
          getElem(wallBottomPrev, wallBottom.length - 2) +
          getElem(wallBottom, wallBottom.length - 1)
      );
      spiral[idx].wallRight = [
        getElem(wallBottom, wallBottom.length - 1),
        ...wallRight
      ];
    } else {
      wallBottom.push(
        getElem(wallBottomPrev, wallBottom.length) +
          getElem(wallBottomPrev, wallBottom.length - 1) +
          getElem(wallBottomPrev, wallBottom.length - 2) +
          getElem(wallBottom, wallBottom.length - 1)
      );
    }
}

const getArgs = (idx) => {
  const numIdx = Number(idx);
  const { wallLeft, wallTop, wallRight, wallBottom } = spiral[idx];
  const {
    wallLeft: wallLeftPrev,
    wallTop: wallTopPrev,
    wallRight: wallRightPrev,
    wallBottom: wallBottomPrev
  } = spiral[getPreviousSpiralIndex(idx)];

  return {
    wallLeftPrev,
    wallTopPrev,
    wallRightPrev,
    wallBottomPrev,
    wallLeft,
    wallTop,
    wallRight,
    wallBottom,
    numIdx
  };

}

while (getBiggestValue(idx) < value) {
  if (!spiral[idx]) initializeSpiralIndex(idx);
  const args = getArgs(idx)

  if (args.wallRight.length < args.numIdx - 1) {
    populateWallRight(args);
  } else if (args.wallTop.length < args.numIdx) {
    populateWallTop(args);
  } else if (args.wallLeft.length < args.numIdx) {
    populateWallLeft(args);
  } else if (args.wallBottom.length < args.numIdx) {
    populateWallBottom(args);
  } else {
    idx = (args.numIdx + 2).toString();
    spiralIndexs.push(idx);
  }
}

console.log(spiral);
