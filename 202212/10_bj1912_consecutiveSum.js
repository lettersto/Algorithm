// 백준 1912 연속합
// 정말 쉬운 DP이지만 나에게는 쉽지 않다...
// dp[i]를 i지점까지 숫자 중 i번째 숫자를 꼭 포함시켰을 때의 최대값이라 할 때
// 그 최대값은 이전 값과 연속한 상태일 수도 있고, 새로 시작하는 상태일 수도 있다
// dp[i] 는 dp[i - 1] + arr[i] 이거나 arr[i]
// dp[i] = Math.max(dp[i - 1] + arr[i], arr[i]) 

const fs = require('fs');

let [N, arr] = (
  process.platform === 'linux'
    ? fs.readFileSync('/dev/stdin').toString().trim()
    : `10
2 1 -4 3 4 -4 6 5 -5 1`
).split('\n');

N = +N;
arr = arr.split(' ').map(Number);
const dp = new Array(N).fill(0);
// base
dp[0] = arr[0];

for (let i = 1; i < N; i++) {
  dp[i] = Math.max(dp[i - 1] + arr[i], arr[i]);
}

// 위 방식이 메모리는 적게 먹는 대신 시간이 오래 걸린다
// console.log(dp.reduce((item, acc) => item > acc ? item : acc, dp[0]));
console.log(Math.max(...dp));
