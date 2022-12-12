// 백준 2156 포도주 시식

const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '00.txt';
const [N, ...arr] = fs
  .readFileSync(filePath)
  .toString()
  .trim()
  .split('\n')
  .map((i) => Number(i.trim()));

solution: {
  const dp = new Array(N).fill(0);
  dp[0] = arr[0];
  
  if (N === 1) {
    console.log(dp[0]);
    break solution;
  }
  
  dp[1] = arr[0] + arr[1];

  if (N === 2) {
    console.log(dp[1]);
    break solution;
  }
  
  dp[2] = Math.max(arr[0] + arr[2], arr[1] + arr[2]);
  
  for (let i = 3; i < N; i++) {
    dp[i] = Math.max(
      arr[i] + dp[i - 2],
      arr[i] + arr[i - 1] + dp[i - 3],
      i >= 4 ? (arr[i] + arr[i - 1] + dp[i - 4]) : 0,
    );
  }
  console.log(Math.max(dp[N - 1], dp[N - 2]));
}

/**
 * 최대한 연속해서 가는 것이 좋기 때문에
 * i = 3에서 알 수 있듯이
 * i까지 갔을 때 최대값은 dp[N - 1], dp[N - 2] 둘 중 하나
 * 
 * dp[i]까지의 max값은
 * 1. i - 2까지의 최대값 + 현재값
 *  (i - 2까지의 최대값은 dp[i - 3], dp[i - 2] 둘 중 하나)
 * 2. i - 3까지의 최대값 + i - 1값 + 현재값
 *  (i - 3까지의 최대값은 dp[i - 3], dp[i - 4] 둘 중 하나)
 * 
 * 즉,
 * dp[i] = Math.max(
 *  // i - 2
 *  arr[i] + dp[i - 2],  // a
 *  arr[i] + dp[i - 3],  // b
 *  // i - 3
 *  arr[i] + arr[i - 1] + dp[i - 3],  // c
 *  arr[i] + arr[i - 1] + dp[i - 4]  // d
 * )
 * 
 * 그런데 모든 값이 양수이니 c가 b보다 큰 것은 당연
 * a, c, d 케이스 중에서 max값을 구하면 된다.
 */
