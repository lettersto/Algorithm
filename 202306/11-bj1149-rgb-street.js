// 백준 1149 RGB 거리
const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '00.txt';
const [N, ...arr] = fs.readFileSync(filePath).toString().trim().split('\n');

const n = +N;
const houses = arr.map((i) => i.split(' ').map(Number));

for (let i = 1; i < n; i++) {
  for (let j = 0; j < 3; j++) {
    houses[i][j] += Math.min(
      houses[i - 1][(j + 1) % 3],
      houses[i - 1][(j + 2) % 3],
    );
  }
}

console.log(Math.min(...houses[n - 1]));
