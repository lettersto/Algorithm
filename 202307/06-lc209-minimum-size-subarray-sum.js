// LeetCode 209. Minimum Size Subarray Sum

const minSubArrayLen = function (target, nums) {
  let sumV = 0;
  let i = 0;
  let j = 0;
  let ans = nums.length + 1;

  while (i <= j) {
    if (sumV >= target || j === nums.length) {
      if (sumV >= target) {
        ans = Math.min(ans, j - i);
      }
      sumV -= nums[i];
      i += 1;
    } else {
      sumV += nums[j];
      j += 1;
    }
  }

  return ans === nums.length + 1 ? 0 : ans;
};
