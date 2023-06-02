// 백준 14425 문자열 집합
const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '00.txt';
const [NM, ...arr] = fs.readFileSync(filePath).toString().trim().split(/\r?\n/);

const [N, M] = NM.split(' ').map(Number);
const wordSet = new Set();

for (let i = 0; i < N; i++) {
  wordSet.add(arr[i]);
}

let ans = 0;
for (let j = N; j < N + M; j++) {
  if (wordSet.has(arr[j])) {
    ans += 1;
  }
}

console.log(ans);
