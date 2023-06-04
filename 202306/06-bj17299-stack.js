// 백준 17299 오등큰수
const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '00.txt';
const [n, nums] = fs.readFileSync(filePath).toString().trim().split('\n');
const N = Number.parseInt(n);
const arr = nums.split(' ').map(Number);

const counter = {};
for (let i = 0; i < N; i++) {
  counter[arr[i]] = (counter[arr[i]] ?? 0) + 1;
}

const stack = [];
const ans = new Array(N).fill(-1);

for (let i = 0; i < N; i++) {
  while (stack.length > 0 && counter[arr[stack.at(-1)]] < counter[arr[i]]) {
    const idx = stack.pop();
    ans[idx] = arr[i];
  }
  stack.push(i);
}

console.log(ans.join(' '));
