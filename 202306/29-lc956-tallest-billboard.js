// LeetCode 956 Tallest Billboard

/**
 * DP는 다른 사람 코드를 봐도 이해가 잘 안 된다.
 * https://leetcode.com/problems/tallest-billboard/solutions/219700/python-dp-clean-solution-1d/
 *
 * 왼쪽 막대기와 오른쪽 막대기의 길이가 같으면서 최대가 되야 한다.
 *
 * 이때 왼쪽과 오른쪽 막대기 길이가 같아지는 때는
 *    막대기를 왼쪽에 사용하면 길이 * 1
 *    막대기를 오른쪽에 사용하면 길이 * -1
 *    막대기를 어느 쪽에도 사용하지 않으면 길이 * 0
 * 로 계산한다면 sum(길이) = 0이 될 때이다.
 *
 * 예) [1, 2, 3, 4, 5, 6]
 * 왼 2, 3, 5
 * 오 4, 6
 * 선택안하는 경우 1
 * => 1 * 0 + 2 * 1 + 3 * 1 + 4 * -1 + 5 * 1 + 6 * -1 = 0
 *
 * for rod in rods: 를 하면서
 * 각 rod마다 1. 왼쪽, 2.오른쪽, 3.선택안함의 3가지 선택지가 있기 때문에
 * 알고리즘은 O(3 ** len(rods))가 된다.
 *
 * 이때 dp는
 *    key는 1, -1, 0을 곱해서 더해진 총 길이 (사실상 왼-오 막대기 길이의 차가 된다.)
 *    value는 왼쪽만 추적하는 길이 (양쪽 길이 중 하나만 추적)인
 *    map으로 저장한다.
 * 이후, dp[0]을 구하면 왼-오 막대기의 차가 0이므로, 두 막대기의 길이가 같다는 것이고
 * dp[0]의 value가 왼쪽의 길이이자 오른쪽의 길이가 된다.
 *
 * (예) [1, 2, 3]을 보면
 * 맨 처음 dp 초기화는 {0: 0} (아무 막대기도 선택하지 않았고, 그래서 왼-오의 차도 0)
 *
 * rod = 1)
 *      왼    선택x   오
 *    {1: 1, 0: 0, -1: 0}
 * rod = 2)
 *    {
 *      3: 3, 1: 1, -1: 1,   // 1: 1에 + 2 * 1한 결과
 *      2: 2, 0: 0, -2: 0,   // 0: 0에 + 2 * 0한 결과
 *      1: 2, -1: 0, -3: 0,  // -1: 0에 + 2 * -1한 결과
 *    }
 *
 * 이때 1: 1, 1: 2 나 -1: 1, -1: 0과 같이 key가 겹치는 경우가 발생하는데,
 * 그때는 max값을 선택해준다. (동일한 차이에서는 가장 길이가 긴 것을 선택해나가기)
 */

const tallestBillboard = function (rods) {
  let dp = new Map();
  dp.set(0, 0);

  for (const rod of rods) {
    const tmp = new Map();

    for (const [key, val] of dp) {
      tmp.set(key + rod, Math.max(val + rod, tmp.get(key + rod) ?? 0));
      tmp.set(key, Math.max(val, tmp.get(key) ?? 0));
      tmp.set(key - rod, Math.max(val, tmp.get(key - rod) ?? 0));
    }

    dp = tmp;
  }

  return dp.get(0);
};
