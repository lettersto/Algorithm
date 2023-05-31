// 백준 2559 수열
const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '00.txt';
let [NK, temp] = fs.readFileSync(filePath).toString().trim().split(/\r*\n/);
const [N, K] = NK.split(' ').map(Number);
const temparature = temp.split(' ').map(Number);

let maxTemp = temparature.slice(0, K).reduce((prev, cur) => prev + cur, 0);
let curTemp = maxTemp;

for (let i = 0; i < N - K; i++) {
  curTemp = curTemp - temparature[i] + temparature[i + K];
  maxTemp = Math.max(maxTemp, curTemp);
}

console.log(maxTemp);
