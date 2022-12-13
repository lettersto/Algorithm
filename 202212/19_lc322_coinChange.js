// LeetCode 322 Coin Change
// 백트래킹 + dfs로 풀려 했지만 시간 초과
const coinChange = (coins, amount) => {
  const dfs = (idx, curCnt, curAmount) => {
    if (curAmount === amount) {
      minCnt = Math.min(minCnt, curCnt);
      return;
    }

    if (idx === coins.length || minCnt < curCnt || curAmount > amount) {
      return;
    }

    for (let i = Math.floor((amount - curAmount) / coins[idx]); i >= 0; i--) {
      dfs(idx + 1, curCnt + i, curAmount + coins[idx] * i);
    }
  };

  let minCnt = 10 ** 10;
  dfs(0, 0, 0);

  return minCnt === 10 ** 10 ? -1 : minCnt;
};

// dp - knapsack 방법으로 풀은 문제
const coinChange2 = (coins, amount) => {
  const dp = new Array(amount + 1).fill(10 ** 5);
  dp[0] = 0;

  for (const coin of coins) {
    for (let maxAmount = 1; maxAmount < amount + 1; maxAmount++) {
      if (maxAmount < coin) {
        continue;
      }
      dp[maxAmount] = Math.min(dp[maxAmount], 1 + dp[maxAmount - coin]);
    }
  }

  return dp[amount] === 10 ** 5 ? -1 : dp[amount];
};

// bfs로도 가능하다
// 백준 숨바꼭질과 비슷
// 먼저 간 숫자는 빠르게 visit 처리해서 다시 방문 못하도록 막음
const coinChange3 = (coins, amount) => {
  // shortest path
  if (!amount) {
    return 0;
  }

  const Q = [[0, 0]];
  const visit = new Array(amount + 1).fill(false);
  visit[0] = true;

  while (Q.length) {
    const [curCnt, curAmount] = Q.shift();
    if (curAmount === amount) {
      return curCnt;
    }

    for (let coin of coins) {
      if (coin + curAmount > amount) continue;
      if (visit[coin + curAmount]) continue;
      visit[coin + curAmount] = true;
      Q.push([curCnt + 1, curAmount + coin]);
    }
  }

  return -1;
};
