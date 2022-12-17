// LeetCode 121 Best Time to Buy and Sell Stock

// 시간은 일직선상으로 흐른다는 점
// two pointers
// 1. 맨 처음 시간 구간인 0~1 사이로 left와 right pointer를 초기화
//    left = buy = 0, right = sell = 1
//    left < right 이어야 하고 right는 array의 전체 범위를 벗어나서는 안 된다.
//    그러면서도 left는 최소, right는 최대 지점을 찾아가야 한다.
// 2. prices[right] - prices[left] 값이 음수라면
//    그 말은 (양수의 이익을 찾아야 하니) left가 우리가 기대하던 최소 값이 아니라는 소리
//    right가 left의 값보다 적으므로, right의 값을 left에 넣어주고, right = left + 1을 해
//    다시 다음 구간부터 시작한다

const maxProfit = (prices) => {
  const N = prices.length;
  let left = 0;
  let right = 1;

  let maxV = 0;
  while (left < right && right < N) {
    const diff = prices[right] - prices[left];
    if (diff >= 0) {
      maxV = Math.max(maxV, diff);
      right += 1;
    } else {
      left = right;
      right = left + 1;
    }
  }
  return maxV;
};

// dynamic programming 방법
// kadane 알고리즘 사용
// https://leetcode.com/problems/best-time-to-buy-and-sell-stock/solutions/39038/kadane-s-algorithm-since-no-one-has-mentioned-about-this-so-far-in-case-if-interviewer-twists-the-input/
// subsequence의 sum을 최대로 만드는 것과 동일한 방법으로 만들어준다.

const maxProfit2 = (prices) => {
  const N = prices.length;

  const acc = new Array(N).fill(0);

  for (let i = 1; i < N; i++) {
    acc[i] = prices[i] - prices[i - 1];
  }

  const dp = new Array(N).fill(0);
  for (let i = 1; i < N; i++) {
    dp[i] = Math.max(acc[i], dp[i - 1] + acc[i]);
  }

  return Math.max(...dp);
};

// maxProfit2를 하나의 array로 정리

const maxProfit3 = (prices) => {
  const N = prices.length;

  const dp = new Array(N).fill(0);
  for (let i = 1; i < N; i++) {
    const tmp = prices[i] - prices[i - 1];
    dp[i] = Math.max(tmp, dp[i - 1] + tmp);
  }

  return Math.max(...dp);
};
