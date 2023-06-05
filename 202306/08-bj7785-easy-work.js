// 백준 7785 회사에 있는 사람

const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '00.txt';
let [N, ...arr] = fs.readFileSync(filePath).toString().trim().split(/\r?\n/);

N = +N;

const inCompany = new Set();
for (let i = 0; i < N; i++) {
  const [name, state] = arr[i].split(' ');
  if (state === 'enter') {
    inCompany.add(name);
  } else {
    if (inCompany.has(name)) {
      inCompany.delete(name);
    }
  }
}

const ans = [...inCompany];
ans.sort().reverse();

console.log(ans.join('\n'));
