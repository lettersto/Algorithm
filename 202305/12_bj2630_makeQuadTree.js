// 백준 2630 색종이 만들기
const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '00.txt';
let [N, ...board] = fs.readFileSync(filePath).toString().trim().split(/\r*\n/);

N = +N;
for (let i = 0; i < board.length; i++) {
  board[i] = board[i].split(' ');
}

let white = 0;
let blue = 0;

function checkColor(row1, col1, row2, col2) {
  const color = board[row1][col1];

  for (let row = row1; row < row2; row++) {
    for (let col = col1; col < col2; col++) {
      if (color !== board[row][col]) {
        return false;
      }
    }
  }

  return true;
}

function makeQuadTree(row1, col1, row2, col2) {
  if (checkColor(row1, col1, row2, col2)) {
    if (board[row1][col1] === '0') {
      white += 1;
    } else {
      blue += 1;
    }
    return;
  }

  const newRow = Math.floor((row1 + row2) / 2);
  const newCol = Math.floor((col1 + col2) / 2);

  makeQuadTree(row1, col1, newRow, newCol);
  makeQuadTree(row1, newCol, newRow, col2);
  makeQuadTree(newRow, col1, row2, newCol);
  makeQuadTree(newRow, newCol, row2, col2);
}

makeQuadTree(0, 0, N, N);

console.log(`${white}\n${blue}`);
