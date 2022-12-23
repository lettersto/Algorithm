// LeetCode 300 Longest Increasing Subsequence
// 다시 풀은 LIS

// 풀긴 풀었는데.. 여전히풀면서 확신을 못 갖고 풀어서 문제이다.
// 쉬운 문제 위주로 더 많이 풀어봐야 하려나보다.


const lengthOfLIS = (nums) => {
  const N = nums.length;
  const dp = new Array(N).fill(1);

  for (let i = N - 2; i >= 0; i--) {
    for (let j = i + 1; j < N; j++) {
      dp[i] = nums[j] > nums[i] ? Math.max(dp[i], dp[j] + 1) : dp[i];
    }
  }

  return Math.max(...dp);
};
