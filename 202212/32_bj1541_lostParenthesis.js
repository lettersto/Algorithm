// 백준 1541 잃어버린 괄호

// - 이후에 오는 값이 최대가 되어야 하니
// 그냥 +들 있는 것을 먼저 다 해버리고
// (- 앞에 오는 +도 마찬가지이다. a + b - c에서 a + (b - c)나 (a + b) - c나 똑같기 때문)
// +를 모두 처리한 이후 -를 처리한다.

const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '00.txt';
const stdin = fs.readFileSync(filePath).toString().trim();

// seperator를 그대로 살리고 싶다면 ()로 감싼다
const arr = stdin.split(/([\+-])/g);
const newArr = [];
let i = 0;
while (i < arr.length) {
  if (arr[i] === '+') {
    const a = Number(newArr.pop());
    const b = Number(arr[i + 1]);
    newArr.push(a + b);
    i += 1;
  } else {
    newArr.push(arr[i]);
  }
  i += 1;
}

const newArr2 = [];
let j = 0;
while (j < newArr.length) {
  if (newArr[j] === '-') {
    const a = Number(newArr2.pop());
    const b = Number(newArr[j + 1]);
    newArr2.push(a - b);
    j += 1;
  } else {
    newArr2.push(newArr[j]);
  }
  j += 1;
}

console.log(newArr2[0]);
