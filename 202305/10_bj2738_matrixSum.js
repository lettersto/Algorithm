// 백준 2738 행렬 덧셉
const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '00.txt';
const [RC, ...arr] = fs
  .readFileSync(filePath)
  .toString()
  .trim()
  .split(/\r*?\n/);

const [R, C] = RC.split(' ').map(Number);
const matrix1 = arr.slice(0, R).map((item) => item.split(' ').map(Number));
const matrix2 = arr.slice(R).map((item) => item.split(' ').map(Number));

let ans = '';
for (let row = 0; row < R; row++) {
  let tmp = '';
  for (let col = 0; col < C; col++) {
    tmp += ` ${matrix1[row][col] + matrix2[row][col]}`;
  }
  ans += tmp.trim() + '\n';
}

console.log(ans.trim());
