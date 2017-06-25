/**
 * https://leetcode.com/problems/n-queens/#/description
 */

var size = 0;
var xStart = 0;
var alreadyTaken = [];
var impossible = [];
var restrictions = {};
var result = [];
var queens = [];
var solutions = [];

/**
 * @param {number} n
 * @return {string[][]}
 */
var solveNQueens = function(n) {
  size = n;
  releaseRestrictions();
  return move(xStart,0);
};

var isPointValid = function(x, y) {
  if(x < 0 || x > size || y < 0 || y > size || impossible[`${x},${y}`]
      || alreadyTaken[`${x},${y}`] || restrictions.x[x] || restrictions.y[y]
      || restrictions.points[`${x},${y}`]) {
    return false;
  }
  return true;
};

var switchQueen = function(x, y, value) {
  if(value === true) {
    queens.push({ x: x, y: y });
  }

  result[`${x},${y}`] = value;
  restrictions.x[x] = value;
  restrictions.y[y] = value;

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
      restrictions.points[`${x1},${y1}`] = value;
    }

    // Check top-right
    if(x2 < size && y2 >= 0) {
      restrictions.points[`${x2},${y2}`] = value;
    }

    // Check bottom-left
    if(x3 >= 0 && y3 < size) {
      restrictions.points[`${x3},${y3}`] = value;
    }

    // Check bottom-right
    if(x4 >= 0 && y4 >= 0) {
      restrictions.points[`${x4},${y4}`] = value;
    }
  }
};

var move = function(x, y) {
  if(y + 1 > size) {
    console.log('Results: ', result);

    //console.log(`${Object.keys(result).length} !== ${size}`);

    if(Object.keys(result).length == size) {
      console.log('Solution Added!!');
      solutions.push(result);
      //alreadyTaken[`${xStart}`] = true;
    } else {

      console.log('Backtrack!');
      let lastQueen = queens[queens.length - 1];
      queens.pop();
      switchQueen(lastQueen.x, lastQueen.y, false);

      //impossible[lastQueen.x, lastQueen.y] = true;

      if(lastQueen && lastQueen.x + 1 < size) {
        return move(lastQueen.x + 1, lastQueen.y);
      }

    }
/*
    console.log('Backtrack!');
    let lastQueen = queens[queens.length - 1];
    queens.pop();
    switchQueen(lastQueen.x, lastQueen.y, false);

    impossible[lastQueen.x, lastQueen.y] = true;

    if(lastQueen && lastQueen.x + 1 < size) {
      return move(lastQueen.x + 1, lastQueen.y);
    }
*/

    releaseRestrictions();
    result = [];

    xStart++;

    if(xStart < size) {
      return move(xStart, 0);
    }

    // console.log('Solutions: ', solutions);
    return calculateResponse();
  }

  let queenFound = false;
  if(isPointValid(x, y)) {
    switchQueen(x, y, true);
    queenFound = true;
  }

  process.stdout.write(` [${x},${y}]${(queenFound ? '--> QUEEN ' : '')}`);

  //let steps = 1;

  let nextX = x;
  let nextY = y;

  if(queenFound === true) {
    //steps = 2;
    nextX = 0;
    nextY++;
  } else {
    if(x + 1 < size) {
      nextX++;
    } else {
      nextX = 0;
      nextY++;
    }
  }

  return move(nextX, nextY);
/*
  if(x + steps < size) {
    return move(x + steps, y);
  } else {
    if(!queenFound) {
      y++;
    }
    return move(0, y);
  }
  */
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

var releaseRestrictions = function() {
  restrictions = {
    x: [],
    y: [],
    points: [] // A point: [1][2] --> x = 1, y = 2
  };
}

var n = process.argv[2];
console.log(solveNQueens(n));
