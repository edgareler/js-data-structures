/**
 * https://leetcode.com/problems/spiral-matrix-ii/#/description
 */

var max;
var seq = 0;
var matrix = [];
var mem = {};
var directions = {
  RIGHT: 1,
  DOWN: 2,
  LEFT: 3,
  UP: 4
};

/**
 * @param {number} n
 * @return {number[][]}
 */
var generateMatrix = function(n) {
  max = n;
  let m = [];

  for(let i = 0; i < n; i++) {
    matrix[i] = [];
  }

  return walk({x: 0, y: 0, direction: directions.RIGHT});
};

var hasPassed = function(pos) {
  if(mem[`${pos.x},${pos.y}`]) {
    return true;
  }
  return false;
}

var isValid = function(pos) {
  if(pos.x >= 0 && pos.x < max && pos.y >= 0 && pos.y < max
      && hasPassed(pos) === false) {
    return true;
  }
  return false;
}

var nextPos = function(pos) {
  let nextRight = { x: pos.x + 1, y: pos.y, direction: directions.RIGHT };
  let nextDown = { x: pos.x, y: pos.y + 1, direction: directions.DOWN };
  let nextLeft = { x: pos.x - 1, y: pos.y, direction: directions.LEFT };
  let nextUp = { x: pos.x, y: pos.y - 1, direction: directions.UP };

  if(pos.direction === directions.RIGHT) {
    if(isValid(nextRight)) {
      return nextRight;
    }
    return nextDown;
  } else if(pos.direction === directions.DOWN) {
    if(isValid(nextDown)) {
      return nextDown;
    }
    return nextLeft;
  } else if(pos.direction === directions.LEFT) {
    if(isValid(nextLeft)) {
      return nextLeft;
    }
    pos.direction = directions.UP;
    return nextPos(pos);
  } else if(pos.direction === directions.UP) {
    if(isValid(nextUp)) {
      return nextUp;
    }
    return nextRight;
  }
}

var walk = function(pos) {
  if(seq >= max*max) {
    return matrix;
  }


  matrix[pos.y][pos.x] = ++seq;
  mem[`${pos.x},${pos.y}`] = true;

  var toPos = nextPos(pos);

  if(toPos) {
    return walk(toPos);
  }

  return matrix;
}

var n = process.argv[2];
console.log(generateMatrix(n));
