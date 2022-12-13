// 백준 12865 평범한 배낭
// 역시 답지 보고 푸는 중 ㅎㅎ...
// 진짜 화가 난다

// 0/1 Knapsack Problem
// 물건을 포함시킬지 안 할지 2가지 경우의 수가 있는 문제
// Brute Force로 풀면 2 ** n이 된다.

const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '00.txt';
let [NK, ...arr] = fs.readFileSync(filePath).toString().trim().split('\n');

const [N, K] = NK.split(' ').map(Number);
arr = arr.map((i) => i.split(' ').map(Number));

let dp = new Array(K + 1).fill(0);
for (let i = 0; i < N; i++) {
  dp = dp.map((maxV, maxWeight) => {
    if (arr[i][0] <= maxWeight) {
      return Math.max(arr[i][1] + dp[maxWeight - arr[i][0]], dp[maxWeight]); 
    }
    return maxV;
  });
}

console.log(dp[K]);
