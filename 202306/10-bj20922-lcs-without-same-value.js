// 백준 20922 겹치는 건 싫어

const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '00.txt';
const [NK, arr] = fs.readFileSync(filePath).toString().trim().split('\n');
const [N, K] = NK.split(' ').map(Number);
const nums = arr.split(' ').map(Number);

let left = 0;
let right = 0;
const counter = {};
let maxCnt = 0;

while (left <= right && right < N) {
  if (!counter.hasOwnProperty(nums[right])) {
    counter[nums[right]] = 0;
  }

  if (counter[nums[right]] + 1 <= K) {
    counter[nums[right]] += 1;
    maxCnt = Math.max(maxCnt, right - left + 1);
    right += 1;
  } else {
    counter[nums[left]] -= 1;
    left += 1;
  }
}

console.log(maxCnt);
