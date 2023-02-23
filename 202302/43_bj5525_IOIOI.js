const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '00.txt';
let [N, M, S] = fs.readFileSync(filePath).toString().trim().split('\n');

N = +N * 2 + 1;
M = +M;

let ans = 0;

const regex = /(?:IO)+I/g;
S.match(regex)?.forEach((ioi) => {
  const tmp = Math.floor((ioi.length - N) / 2) + 1;
  ans = tmp > 0 ? ans + tmp : ans;
});

console.log(ans);
