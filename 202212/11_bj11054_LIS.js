// 백준 11054 가장 긴 증가하는 부분 수열

// O (N ** 2)
const fs = require('fs');

let [N, arr] = (
  process.platform === 'linux'
    ? fs.readFileSync('/dev/stdin').toString().trim()
    : `6
10 20 10 30 20 50`
).split('\n');

N = +N;
arr = arr.split(' ').map(Number);

{
  const acc = new Array(N).fill(1);
  for (let i = N - 2; i >= 0; i--) {
    for (let j = i + 1; j < N; j++) {
      if (arr[i] < arr[j]) {
        acc[i] = Math.max(acc[i], acc[j] + 1);
      }
    }
  }
  
  console.log(Math.max(...acc));
}


// Brute Force
// 맨 처음 생각이 나지 않아 한 방법

// let set = [];
// set.push([arr[0]])
// for (let i = 1; i < N; i++) {
//   const tmp = [];
//   for (const s of set) {
//     tmp.push(s.slice());
//     if (s[s.length - 1] < arr[i]) {
//       tmp.push([...s, arr[i]]);
//     }
//     tmp.push([arr[i]]);
//   }
//   set = tmp;
// }

// let ans = 0;
// for (const s of set) {
//   ans = Math.max(ans, s.length);
// }

// console.log(ans);
