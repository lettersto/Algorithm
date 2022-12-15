// LeetCode 1143 Longest Common Subsequence

// 2차원으로 풀어야 하는 것까지는 짐작했지만
// 그 이상을 생각하지 못한 문제
// 조금 늘었지만 여전히 멀었다.

const longestCommonSubsequence = (text1, text2) => {
  const R = text1.length;
  const C = text2.length;

  const dp = new Array(R + 1).fill(0).map(() => new Array(C + 1).fill(0));

  for (let row = R - 1; row >= 0; row--) {
    for (let col = C - 1; col >= 0; col--) {
      if (text1[row] === text2[col]) {
        dp[row][col] = dp[row + 1][col + 1] + 1;
      } else {
        dp[row][col] = Math.max(dp[row + 1][col], dp[row][col + 1]);
      }
    }
  }

  return dp[0][0];
};
