// 백준 4963 섬의 개수

const fs = require('fs');

const stdin = (
  process.platform === 'linux'
    ? fs.readFileSync('/dev/stdin').toString().trim()
    : fs.readFileSync('00.txt').toString().trim()
).split('\n');

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const bfs = (arr, row, col, R, C) => {
  const D = [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [-1, -1], [1, -1], [-1, 1]];
  
  const Q = [[row, col]];
  arr[row][col] = 0;

  while (Q.length) {
    const [curR, curC] = Q.shift();
    for (const [dr, dc] of D) {
      const newR = curR + dr;
      const newC = curC + dc;
      if (0 <= newR && newR < R && 0 <= newC && newC < C && arr[newR][newC]) {
        Q.push([newR, newC]);
        arr[newR][newC] = 0;
      }
    }
  }
};

let ans = '';

while (true) {
  const [C, R] = input().split(' ').map(Number);
  if (R === 0 && C === 0) {
    break;
  }

  const board = [];
  for (let i = 0; i < R; i++) {
    board.push(input().split(' ').map(Number));
  }
  
  let cnt = 0;
  for (let row = 0; row < R; row++) {
    for (let col = 0; col < C; col++) {
      if (!board[row][col]) continue;
      bfs(board, row, col, R, C);
      cnt += 1;
    }
  }

  ans += `${cnt}\n`;
}

console.log(ans.trim());
