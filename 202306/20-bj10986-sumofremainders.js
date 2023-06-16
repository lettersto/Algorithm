// 백준 10986 나머지 합

// A = B + C 일때
// 나머지끼리도 A = B + C가 가능하다는 점
// 단지 누적합 구하는 방식에서는 덧셈이 아니라 뺄셈이 자연스럽다는 점
// -> 여기로 생각의 전환이 안됐다...

// arr         1 2 3 1 2
// prefixsum 0 1 3 6 7 9
// remainder 0 1 0 0 1 0

// [s, e]까지의 구간합 = prefixsum[e] - prefixsum[i]
// remainder도 마찬가지= remainder[e] - remainder[i]
// 나머지가 뺄셈에서 0이 나오려면 같은 값끼리 빼야 한다
// (예) remainder[4] - remainder[1]
// remainder가 같은 값이 몇 개나 나오는지 세는 counter를 만들어서
// 각 값마다 nC2 수행

const fs = require('fs');
const filePath = '/dev/stdin';
const [NM, arr] = fs.readFileSync(filePath).toString().trim().split('\n');

const [N, M] = NM.split(' ').map(Number);
const nums = arr.split(' ').map(Number);

let prefixSum = 0;
const remainderCounter = {};
remainderCounter[0] = 1;

for (let i = 0; i < N; i++) {
  prefixSum = (prefixSum + nums[i]) % M;
  remainderCounter[prefixSum] = (remainderCounter[prefixSum] ?? 0) + 1;
}

let ans = 0;
for (const vals of Object.values(remainderCounter)) {
  ans += Math.floor((vals * (vals - 1)) / 2);
}

console.log(ans);
