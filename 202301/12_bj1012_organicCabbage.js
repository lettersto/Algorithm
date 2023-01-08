// 백준 1012 유기농 배추

const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '00.txt';
let [T, ...stdin] = fs.readFileSync(filePath).toString().trim().split('\n');
T = +T;

const input = (() => {
  let line = 0;
  return () => stdin[line++].trim().split(' ').map(Number);
})();

let ans = '';
for (let t = 0; t < T; t++) {
  const [C, R, K] = input();
  const field = Array.from({length: R}, () => Array.from({length: C}, () => 0));
  for (let k = 0; k < K; k++) {
    const [col, row] = input();
    field[row][col] = 1;
  }

  let worm = 0;
  for (let row = 0; row < R; row++) {
    for (let col = 0; col < C; col++) {
      if (!field[row][col]) {
        continue;
      }

      worm += 1;
      field[row][col] = 0;

      const ST = [[row, col]];
      // prettier-ignore
      const D = [[1, 0], [-1, 0], [0, 1], [0, -1]];

      while (ST.length > 0) {
        const [curR, curC] = ST.pop();

        for (let d = 0; d < 4; d++) {
          const newR = curR + D[d][0];
          const newC = curC + D[d][1];

          if (
            newR < 0 ||
            newR >= R ||
            newC < 0 ||
            newC >= C ||
            !field[newR][newC]
          ) {
            continue;
          }
          ST.push([newR, newC]);
          field[newR][newC] = 0;
        }
      }
    }
  }

  ans += `${worm}\n`;
}

console.log(ans.trim());
