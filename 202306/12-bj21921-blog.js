// 백준 21921 블로그

const fs = require('fs');
const filePath = '/dev/stdin';
const [[N, X], arr] = fs
  .readFileSync(filePath)
  .toString()
  .trim()
  .split('\n')
  .map((i) => i.split(' ').map(Number));

const prefixSum = new Array(N + 1).fill(0);

for (let i = 1; i < N + 1; i++) {
  prefixSum[i] = prefixSum[i - 1] + arr[i - 1];
}

let maxCnt = 0;
let periodCnt = 0;

for (let i = 0; i < N - X + 1; i++) {
  const cnt = prefixSum[i + X] - prefixSum[i];
  if (maxCnt < cnt) {
    maxCnt = cnt;
    periodCnt = 1;
  } else if (maxCnt === cnt) {
    periodCnt += 1;
  }
}

if (maxCnt > 0) {
  console.log(maxCnt);
  console.log(periodCnt);
} else {
  console.log('SAD');
}
