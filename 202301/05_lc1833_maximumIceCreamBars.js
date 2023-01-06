// LeetCode 1833 Maximum Ice Cream Bars

// 오름차순으로 가격을 sort한 이후
// 아이스크림 값을 앞에서부터 더 해오며 coins보다 더 커지면 break
// 작은 값의 아이스크림을 많이 살 수록,
// 한정된 coins 내에서 아이스크림 개수를 max로 이끌어 낼 수 있다는 greedy

const maxIceCream = function (costs, coins) {
  costs.sort((a, b) => a - b);

  let ans = costs[0] <= coins ? 1 : 0;
  for (let i = 1; i < costs.length; i++) {
    costs[i] += costs[i - 1];
    if (costs[i] <= coins) {
      ans = i + 1;
    } else {
      break;
    }
  }

  return ans;
};
