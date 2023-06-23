// LeetCode 1027 Longest Arithmetic Subsequence

// LIS에서 hash가 더해진 문제
const longestArithSeqLength = function (nums) {
  const dp = Array.from({length: nums.length}, () => new Map());
  let ans = 0;

  for (let i = 1; i < nums.length; i++) {
    for (let j = 0; j < i; j++) {
      const diff = nums[i] - nums[j];
      const cnt = (dp[j].get(diff) ?? 0) + 1;
      dp[i].set(diff, cnt);
      ans = Math.max(ans, cnt);
    }
  }

  return ans + 1;
};

// JAVA
// class Solution {
//   public int longestArithSeqLength(int[] nums) {
//     int n = nums.length;
//     int ans = 0;
//     HashMap<Integer, Integer>[] dp = new HashMap[n];

//     for (int i = 0; i < n; i++) {
//       dp[i] = new HashMap<>();

//       for (int j = 0; j < i; j++) {
//         int diff = nums[i] - nums[j];
//         int cnt = dp[j].getOrDefault(diff, 0) + 1;
//         dp[i].put(diff, cnt);
//         ans = Math.max(ans, cnt);
//       }
//     }

//     return ans + 1;
//   }
// }
