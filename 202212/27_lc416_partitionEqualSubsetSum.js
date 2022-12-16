// LeetCode 416 Partition Equal Subset Sum

// knapsack 문제처럼 풀으니 됐다!
// brute force였다면 각 숫자마다 포함, 미포함이 있는 2 ** n 문제

// O(n * sum(nums))
// 1. dp는 0~sum(nums)의 index를 가지고 있는 array
// 2. nums array를 순차적으로 돌면서
//    1. dp에서 자기 자신의 숫자는 true
//    2. 이전에 true로 체크된 것이 있다면 이전값 + 자신도 true

const canPartition = (nums) => {
  const totalSum = nums.reduce((num, acc) => num + acc, 0);
  if (totalSum % 2 !== 0) {
    return false;
  }

  let dp = new Array(totalSum + 1).fill(false);

  for (let j = 0; j < nums.length; j++) {
    let tmp = dp.slice();
    for (let i = 0; i < totalSum + 1; i++) {
      if (i === nums[j]) {
        tmp[i] = true;
      }
      if (dp[i]) {
        tmp[i + nums[j]] = true;
      }
    }
    dp = tmp;
    if (dp[Math.floor(totalSum / 2)]) {
      return true;
    }
  }

  return false;
};

// set으로도 가능하다
// 이게 돌아야 할 item이 적어 순회 시 속도가 더 빠를 줄 알았더니, 더 느려졌다.
// forEach라고 더 나아지지도 않는다.
// set을 순회하면 아주 많이 느리다는 글은 발견했는데
// 왜 그런지는 안 나와있어서 나중에 찾아봐야 겠다.
const canPartition2 = (nums) => {
  const totalSum = nums.reduce((num, acc) => num + acc, 0);
  if (totalSum % 2 !== 0) {
    return false;
  }

  let dp = new Set();

  for (let i = 0; i < nums.length; i++) {
    const tmp = new Set(dp);
    tmp.add(nums[i]);
    for (const sumV of dp) {
      tmp.add(sumV + nums[i]);
    }
    dp = tmp;
    if (dp.has(Math.floor(totalSum / 2))) {
      return true;
    }
  }

  return false;
};
