// 백준 14728 벼락치기

// knapsack 문제처럼 풀은 문제
// dp[i]는 총 i 시간일 때 최대 score를 의미한다. (i의 범위는 0 ~ 총 시간)

// 매 과목마다 dp 전체를 순회하면서,
// i 시간에서 과목 예상 공부 시간 K를 뻈을 때 0 이상인 경우 (해당 과목을 공부할 수 있는 경우)
// 최대 score값을 갱신해준다. max(이전 최대 score, i - k 시간 이전의 최대 score + 이 과목 score)

// 바로 dp array에 이 값을 갱신해주면 이전 값에 의해 영향을 받을 수 있으므로,
// 과목마다 이전 과목을 기반으로 새로운 array를 생성한다.

const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '00.txt';
let [NT, ...arr] = fs.readFileSync(filePath).toString().trim().split('\n');
const [N, T] = NT.split(' ').map(Number);
arr = arr.map((item) => item.trim().split(' ').map(Number));

let dp = Array.from({length: T + 1}, () => 0);
for (let i = 0; i < N; i++) {
  const [K, S] = arr[i];
  dp = dp.map((score, time) => {
    if (time - K >= 0) {
      return Math.max(score, dp[time - K] + S);
    }
    return score
  })
}

console.log(Math.max(...dp));
