// LeetCode 198 House Robber
// dp array를 어떻게 가정하느냐에 따라 풀이법이 달라질 수 있다.

// dp[i]를 i값을 포함했을 때 최대라고 가정하고 할 때
const rob = (nums) => {
  const N = nums.length;
  const dp = new Array(N).fill(0);
  dp[0] = nums[0];
  
  if (N === 1) {
    return dp[N - 1];
  }
  
  dp[1] = nums[1];

  if (N === 2) {
    return Math.max(dp[N - 1], dp[N - 2]);
  }

  dp[2] = nums[0] + nums[2];

  for (let i = 3; i < N; i++) {
    dp[i] = Math.max(dp[i - 2], dp[i - 3]) + nums[i];
  }

  return Math.max(dp[N - 1], dp[N - 2]);
};

// dp[i]값이 반드시 i를 포함하지 않아도 되고
// 여태까지의 최대값이라고 간주할 때
const rob2 = (nums) => {
  const N = nums.length;
  const dp = new Array(N).fill(0);
  dp[0] = nums[0];

  if (N === 1) {
    return dp[0];
  }

  dp[1] = Math.max(nums[0], nums[1]);

  for (let i = 2; i < N; i++) {
    dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i]);
  }

  return dp[N - 1];
};

// array를 쓰지 않는 방법
const rob3 = (nums) => {
  const N = nums.length;

  let a = 0;
  let b = 0;

  a = nums[0];
  b = Math.max(nums[0], N > 1 ? nums[1] : 0);

  for (let i = 2; i < N; i++) {
    [a, b] = [b, Math.max(b, a + nums[i])];
  }

  return b;
};
