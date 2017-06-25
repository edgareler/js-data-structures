var size = 0;
var xStart = 0;
var alreadyTaken = [];
var impossible = [];
var queens = {};
var result = [];
var solutions = [];

/**
 * @param {number} n
 * @return {string[][]}
 */
var solveNQueens = function(n) {
  size = n;
  releaseQueens();
  return move(xStart,0);
};

var isPointValid = function(x, y) {
  if(x < 0 || x > size || y < 0 || y > size || impossible[`${x},${y}`]
      || alreadyTaken[`${x},${y}`] || queens.x[x] || queens.y[y]
      || queens.points[`${x},${y}`]) {
    return false;
  }
  return true;
};

var addQueen = function(x, y) {
  result[`${x},${y}`] = true;
  queens.x[x] = true;
  queens.y[y] = true;

  for(let i = 1; i < size; i++) {
    let x1 = x + i;
    let y1 = y + i;
    let x2 = x + i;
    let y2 = y - i;
    let x3 = x - i;
    let y3 = y + i;
    let x4 = x - i;
    let y4 = y - i;

    // Check bottom-right
    if(x1 < size && y1 < size) {
      queens.points[`${x1},${y1}`] = true;
    }

    // Check top-right
    if(x2 < size && y2 >= 0) {
      queens.points[`${x2},${y2}`] = true;
    }

    // Check bottom-left
    if(x3 >= 0 && y3 < size) {
      queens.points[`${x3},${y3}`] = true;
    }

    // Check bottom-right
    if(x4 >= 0 && y4 >= 0) {
      queens.points[`${x4},${y4}`] = true;
    }
  }
};

var move = function(x, y, options = {}) {
  if(y + 1 > size) {
    //console.log('Backtrack!');
    //console.log('Results: ', result);

    //console.log(`${Object.keys(result).length} !== ${size}`);

    if(Object.keys(result).length == size) {
      //console.log('Added!!');
      solutions.push(result);
      alreadyTaken[xStart] = true;
    } else {
      impossible[xStart] = true;
    }

    releaseQueens();
    result = [];

    xStart++;

    if(xStart < size) {
      return move(xStart, 0);
    }

    // console.log('Solutions: ', solutions);
    return calculateResponse();
  }

  //console.log(`move[${x}, ${y}]`);
  let queenFound = false;
  if(isPointValid(x, y)) {
    addQueen(x, y);
    queenFound = true;
  }

  let steps = 1;

  if(queenFound === true) {
    steps = 2;
    y++;
  }

  if(x + steps < size) {
    return move(x + steps, y);
  } else {
    if(!queenFound) {
      y++;
    }
    return move(0, y);
  }
};

var calculateResponse = function() {
  let response = [];

  for(let s = 0; s < solutions.length; s++) {
    response[s] = [];
    for(let i = 0; i < size; i++) {
      let sLine = '';
      for(let j = 0; j < size; j++) {
        if(solutions[s][`${i},${j}`]) {
          sLine += 'Q';
        } else {
          sLine += '.';
        }
      }
      response[s][i] = sLine;
    }
  }

  return response;
};

var printBoard = function() {
  let response = calculateResponse();

  console.log('[');

  for(let i = 0; i < response.length; i++) {
    console.log();
  }

  console.log(']');

  console.log(JSON.stringify(calculateResponse()));
}

var releaseQueens = function() {
  queens = {
    x: [],
    y: [],
    points: [] // A point: [1][2] --> x = 1, y = 2
  };
}

var n = process.argv[2];
console.log(solveNQueens(n));
