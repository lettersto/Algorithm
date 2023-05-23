const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '00.txt';
let [TC, ...stdin] = fs
  .readFileSync(filePath)
  .toString()
  .trim()
  .split(/(?:\r)*?\n/);
TC = +TC;

const input = (() => {
  let idx = 0;
  return () => stdin[idx++];
})();

const ans = [];

for (let tc = 0; tc < TC; tc++) {
  const [_, M] = input().split(' ').map(Number);
  const printQueue = [];
  const priorities = new Array(10).fill(0);
  input()
    .split(' ')
    .map(Number)
    .forEach((val, i) => {
      printQueue.push([val, i]);
      priorities[val] += 1;
    });

  let cnt = 1;

  while (printQueue.length > 0) {
    const [priority, idx] = printQueue.shift();

    let isMostImportant = true;
    for (let p = 9; p > priority; p--) {
      if (priorities[p] > 0) {
        isMostImportant = false;
        break;
      }
    }

    if (isMostImportant) {
      if (idx === M) {
        ans.push(cnt);
        break;
      }
      priorities[priority] -= 1;
      cnt += 1;
    } else {
      printQueue.push([priority, idx]);
    }
  }
}

console.log(ans.join('\n'));
