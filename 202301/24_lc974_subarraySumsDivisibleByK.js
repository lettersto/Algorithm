// LeetCode 974 Subarray Sums Divisible by K

// 누적합을 이용 (prefix sum)
/**
 * idx         0  1  2   3   4  5
 * array      [4, 5, 0, -2, -3, 1]
 * 누적합 P (0,)[4, 9, 9, 7,  4,  5]
 * 
 * 누적합 예) P(3) - P(0) = arr[1] + arr[2] + arr[3] = subarray의 합
 * 
 * ✔️ 답으로 요구하는 것은 sum % k === 0이 되는 것
 * 즉, 위의 예시에서 (arr[1] + arr[2] + arr[3]) % k === 0이어야 조건 충족
 * => (P(3) - P(0)) % k === 0 
 * 
 * ✔️ 분배 법칙으로 인해
 * P(3) % k - P(0) % k === 0이 되어야 한다.
 * 즉, 나머지가 같은 누적합끼리 뺄 때, 합 % k === 0이 된다.
 * 
 * ✔️ 풀이
 * (1) nums를 for문을 돌며 누적합 P를 만들어 나간다.
 * (2) P(i)를 k로 나눈 나머지 값이 몇 번 나왔는지 dp에 기록한다.
 *     => dp는 i번째까지 나머지가 r인 값이 몇 번 나왔는지 빈도를 기록
 *     => 나머지가 0인 것은 그 자신 자체로도 조건을 충족하므로, === base case
 *     => 기본적으로 dp {0: 1}을 적용해둔다.
 * (3) 이전에 같은 나머지가 나온 적이 있다면, 합 % k === 0인 subarray가 있는 것이므로
 *     dp[나머지] 값을 answer에 더한다.
 * (4) 만약 P(i)가 음수인 경우에는, JS에서 나머지도 음수가 나온다.
 *     => 이렇게 나온 음수 나머지에 + k를 해줘 양수로 보정을 해준다.
 *     P(i) % k + k
 */



const subarraysDivByK = function (nums, k) {
  let dp = {0: 1};
  let prefixSum = 0;
  let ans = 0;

  for (let i = 1; i < k; i++) {
    dp[i] = 0;
  }

  for (let i = 0; i < nums.length; i++) {
    prefixSum = (prefixSum + nums[i]) % k;
    if (prefixSum < 0) {
      prefixSum += k;
    }
    ans += dp[prefixSum];
    dp[prefixSum] += 1;
  }

  return ans;
};
