const wordBreak = (s, wordDict) => {
  const N = s.length;
  const dp = new Array(N + 1).fill(0);
  dp[N] = 1;

  for (let i = N - 1; i >= 0; i--) {
    for (const w of wordDict) {
      if (i + w.length <= N && s.substring(i, i + w.length) === w) {
        dp[i] = dp[i + w.length];
      }
      if (dp[i]) {
        break;
      }
    }
  }

  return dp[0] ? true : false;
};
