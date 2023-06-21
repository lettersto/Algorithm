// LeetCode 2448 Minimum Cost to Make Array Equal

// 이해가 안 되는 지점이 있는데, 다른 쉬운 유사 문제를 먼저 풀어보면서 해봐야겠다.
// https://leetcode.com/problems/minimum-moves-to-equal-array-elements-ii/
// https://leetcode.com/problems/candy/

const minCost = function (nums, cost) {
  let left = 10 ** 6;
  let right = 0;

  for (let i = 0; i < nums.length; i++) {
    left = Math.min(left, nums[i]);
    right = Math.max(right, nums[i]);
  }

  const calculateCost = (target) => {
    let totalCost = 0;
    let totalCost2 = 0;
    for (let i = 0; i < nums.length; i++) {
      totalCost += Math.abs(target - nums[i]) * cost[i];
      totalCost2 += Math.abs(target + 1 - nums[i]) * cost[i];
    }
    return [totalCost, totalCost2];
  };

  let minCost = Infinity;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    const [cost1, cost2] = calculateCost(mid);
    if (cost1 < cost2) {
      minCost = Math.min(minCost, cost1);
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }

  return minCost;
};
