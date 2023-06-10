// 백준 1522 문자열 교환

// 자주 보이는 문제 같은데 항상 풀이를 모르겠던 문제
// sliding window였다...

const fs = require('fs');
const filePath = '/dev/stdin';
const str = fs.readFileSync(filePath).toString().trim();
const N = str.length;

let size = 0;
for (let i = 0; i < N; i++) {
  if (str[i] === 'a') {
    size += 1;
  }
}

let minV = 1000;
for (let i = 0; i < N; i++) {
  let bCnt = 0;
  for (let j = 0; j < size; j++) {
    if (str[(i + j) % N] === 'b') {
      bCnt += 1;
    }
  }
  minV = Math.min(minV, bCnt);
}

console.log(minV);
