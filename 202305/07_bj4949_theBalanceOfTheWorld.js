const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '00.txt';
const arr = fs
  .readFileSync(filePath)
  .toString()
  .trim()
  .split(/(?:\r)*?\n/);

let ans = '';

for (let i = 0; i < arr.length - 1; i++) {
  const sentence = arr[i];
  const stack = [];
  const pair = {
    ')': '(',
    ']': '[',
  };
  let res = true;

  for (let j = 0; j < sentence.length; j++) {
    if (sentence[j] === '(' || sentence[j] === '[') {
      stack.push(sentence[j]);
    }

    if (sentence[j] === ')' || sentence[j] === ']') {
      if (stack.length > 0 && stack.at(-1) === pair[sentence[j]]) {
        stack.pop();
      } else {
        res = false;
        break;
      }
    }
  }

  if (stack.length > 0) {
    res = false;
  }

  ans += res ? 'yes\n' : 'no\n';
}

console.log(ans);
