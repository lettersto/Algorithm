// 백준 1439 뒤집기

// greedy + string
// 0과 1이 연속되게 나오는 횟수를 구해서, 둘 중 min값을 return

const fs = require('fs');
const str =
  process.platform === 'linux'
    ? fs.readFileSync('/dev/stdin').toString().trim()
    : `0`;

let zeroCnt = 0;
let oneCnt = 0;

let curV = str[0];
curV === '0' ? zeroCnt++ : oneCnt++; 

for (const s of str) {
  if (s === curV) continue;
  s === '0' ? zeroCnt++ : oneCnt++; 
  curV = s;
}

console.log(Math.min(zeroCnt, oneCnt));
