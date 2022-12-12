// 백준 2169 로봇 조종하기
// 진짜.. ㅠㅠ
// 답지 보고 겨우 이해했다.

const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '00.txt';
let [RC, ...arr] = fs.readFileSync(filePath).toString().trim().split('\n');

const [R, C] = RC.split(' ').map(Number);
arr = arr.map((item) => item.split(' ').map(Number));

const dp = new Array(R).fill(0).map((i) => new Array(C).fill(0));
const left = new Array(R).fill(0).map((i) => new Array(C).fill(0));
const right = new Array(R).fill(0).map((i) => new Array(C).fill(0));

dp[0][0] = arr[0][0];

// 0 번째 행
for (let col = 1; col < C; col++) {
  dp[0][col] = dp[0][col - 1] + arr[0][col];
}

// 1 번째 행부터 마지막 행까지
for (let row = 1; row < R; row++) {
  // left의 맨 왼쪽과, right의 맨 오른쪽 initializing
  left[row][0] = dp[row - 1][0] + arr[row][0];
  right[row][C - 1] = dp[row - 1][C - 1] + arr[row][C - 1];

  // left의 i 번째 행 생성
  for (col = 1; col < C; col++) {
    left[row][col] = Math.max(
      dp[row - 1][col] + arr[row][col],
      left[row][col - 1] + arr[row][col],
    );
  }

  // right의 i 번째 행 생성
  for (col = C - 2; col >= 0; col--) {
    right[row][col] = Math.max(
      dp[row - 1][col] + arr[row][col],
      right[row][col + 1] + arr[row][col],
    );
  } 

  // dp의 col 별로 left와 right 중 높은 값 할당
  for (col = 0; col < C; col++) {
    dp[row][col] = Math.max(left[row][col], right[row][col]);
  }
}

console.log(dp[R - 1][C - 1]);
