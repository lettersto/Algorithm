// 백준 1264 모음의 개수
// regex

const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '00.txt';
const arr = fs.readFileSync(filePath).toString().trim().split('\n');
arr.pop();

const re = /[aeiou]/gi;
const ans = arr
  // match하는 것이 없다면 null이 나올 수 있으므로, optional & nullish operator 사용
  .map((str) => (str.match(re)?.length ?? 0).toString())
  .join('\n');

console.log(ans);
