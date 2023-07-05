// LeetCode 1493. Longest Subarray of 1's After Deleting One Element

// 무식하게 구현했는데... 연관 알고리즘이 dp나 sliding window인 것으로 보아...
// 맞긴 하지만 너무 복잡하게 풀은 것 같다

const longestSubarray = function (nums) {
  const n = nums.length;

  if (nums.reduce((prev, curv) => prev + curv, 0) === n) {
    return n - 1;
  }

  let i = 0;
  let curCnt = nums[i];
  let prevCnt = 0;
  let maxCnt = nums[i];
  let deleted = false;

  while (i < n - 1) {
    if (nums[i] === 1 && nums[i + 1] === 1) {
      curCnt += 1;
      maxCnt = Math.max(maxCnt, deleted ? curCnt + prevCnt : curCnt);
    }

    if (nums[i] === 0 && nums[i + 1] === 0) {
      prevCnt = 0;
      curCnt = 0;
      deleted = false;
    }

    if (nums[i] === 0 && nums[i + 1] === 1) {
      curCnt = 1;
      maxCnt = Math.max(maxCnt, deleted ? curCnt + prevCnt : curCnt);
    }

    if (nums[i] === 1 && nums[i + 1] === 0) {
      prevCnt = curCnt;
      curCnt = 0;
      deleted = true;
    }

    i += 1;
  }

  return maxCnt;
};
