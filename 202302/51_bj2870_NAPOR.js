// 백준 2870 수학 숙제

const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '00.txt';
const [N, ...arr] = fs.readFileSync(filePath).toString().split(/\r?\n/);

const regex = /\d+/g;
let nums = [];

arr.forEach((str) => {
  nums = [...nums, ...(str.match(regex)?.map(BigInt) ?? [])];
});

// BigInt가 하나라도 섞이면 (a, b) => a - b로 하려고 하면
// Cannot convert a BigInt value to a number 에러가 뜬다.
// bigint와 number 끼리 연산은 안 되는 것은 당연하지만
// [10n, 5n]과 같이 array에 bigint만 있어도 이 에러가 뜬다. 이유는 모르겠다.
// 어쨌든 빼기로 하면 안 되고, 직접 비교해서 결정해줘야 한다.
// a < b -> -1
// a > b -> 1
// a == b -> 0

const ans = nums.sort((a, b) => (a < b) ? -1 : ((a > b) ? 1 : 0)).join('\n');
console.log(ans);
