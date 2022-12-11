// 백준 10799 쇠막대기

const fs = require('fs');

const arr = (
  process.platform === 'linux'
    ? fs.readFileSync('/dev/stdin').toString().trim()
    : `(((()(()()))(())()))(()())`
).split('');

const stack = [];
let ans = 0;

for (let i = 0; i < arr.length; i++) {
  if (arr[i] === '(') {
    stack.push('(');
  } else if (i !== arr.length - 1 && arr[i - 1] === '(' && arr[i] ===')') {
    stack.pop();
    ans += stack.length;
  } else if (arr[i] === ')') {
    stack.pop();
    ans += 1;
  }
}

console.log(ans);
