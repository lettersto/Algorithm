// LeetCode 309 Best Time to Buy and Sell Stock with Cooldown
// 아직도 너무 어렵다... 거꾸로 생각이 안된다... ㅠㅠ
// https://youtu.be/I7j0F7AHpb8

const maxProfit = (prices) => {
  const dp = {};

  const getMaxPrice = (idx, state = 'buy') => {
    // base line의 값은 0
    if (idx >= prices.length) {
      return 0;
    }
    // caching
    if (`${idx}-${state}` in dp) {
      return dp[`${idx}-${state}`];
    }
    
    // 이번에 봐보니 if-else보다 if, if가 속도가 더 빠르던데,
    // 항상 그런지는 몇개 더 돌려봐야 알 것 같다.

    // 사야 하는 상태라면
    if (state === 'buy') {
      // 이 이후 sell한 값 중 최대값 - 가격
      // or cooldown한 값
      const buy = getMaxPrice(idx + 1, 'sell') - prices[idx];
      const coolDown = getMaxPrice(idx + 1, 'buy');
      dp[`${idx}-${state}`] = Math.max(buy, coolDown);
    }
    if (state === 'sell') {
      // 이 이후 buy한 값 중 최대값 - 가격
      // or cooldown한 값
      // sell하고 나면 반드시 한 번 cooldown을 해야하므로 index + 2
      const sell = getMaxPrice(idx + 2, 'buy') + prices[idx];
      const coolDown = getMaxPrice(idx + 1, 'sell');
      dp[`${idx}-${state}`] = Math.max(sell, coolDown);
    }

    return dp[`${idx}-${state}`];
  };
  return getMaxPrice(0);
};
