// 백준 24416 알고리즘 수업 - 피보나치 수1
// 피보나치 원리도 까먹은 거 같아 풀어보는 문제

const fs = require('fs');

const N = +(process.platform === 'linux'
  ? fs.readFileSync('/dev/stdin').toString().trim()
  : `40`);

let fibCnt = 0;
let dpFibCnt = 0;

const fib = (num) => {
  if (num <= 2) {
    fibCnt += 1;
    return 1;
  }
  return fib(num - 1) + fib(num - 2);
};

const dpFib = (num) => {
  const dp = new Array(num + 1).fill(0);
  dp[1] = dp[2] = 1;
  
  for (let i = 3; i < N + 1; i++) {
    dpFibCnt += 1;
    dp[i] = dp[i - 1] + dp[i - 2];
  }

  return dp[num];
};

fib(N);
dpFib(N);

console.log(fibCnt, dpFibCnt);
