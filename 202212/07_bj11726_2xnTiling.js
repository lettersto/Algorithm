// 백준 11726 2xN 타일링
const fs = require("fs");

const N = +(
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString().trim()
    : `9`
);

// f(n) = f(n - 2) + f(n - 1)
dp = [0, 1, 2];

for (let i = 3; i < N + 1; i++) {
  dp.push((dp[i - 1] + dp[i - 2]) % 10007);
}

console.log(dp[N]);
