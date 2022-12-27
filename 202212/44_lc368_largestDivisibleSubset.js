// LeetCode 368 Largest Divisible Subset

// 풀었다 !!!
// 그런데 맞나..? ㅋㅋㅋㅋㅋ ㅠ
// 모두 array 안에 저장하는 게 맞는 건가 싶고...
const largestDivisibleSubset = function(nums) {
  nums.sort((a, b) => a - b);
  const dp = new Array(nums.length).fill(0).map((_, i) => [nums[i]]);

  let maxLength = 1;
  let maxArr = [nums[0]];

  for (let i = 1; i < nums.length; i++) {
    let tmp = dp[i];
    for (let j = i - 1; j >= 0; j--) {
      if (nums[i] % nums[j] !== 0) continue;
      if (dp[i].length >= tmp.length + dp[j].length) continue;
      dp[i] = [...tmp, ...dp[j]];
      if (dp[i].length <= maxLength) continue;
      maxLength = dp[i].length;
      maxArr = dp[i];
    }
  }

  return maxArr;
};
