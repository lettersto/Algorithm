// 백준 9184 신나는 함수 실행

// cache를 하라는 문제
// w(a, b, c)에 대한 값을 return하기 전에 dp[`${a}-${b}-${c}`]에 그 값을 저장해두고
// 다음에 이 값에 또 왔을 때는 재귀로 들어가지 않고, 바로 기록해뒀던 값을 return

const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '00.txt';
const stdin = fs.readFileSync(filePath).toString().trim().split('\n');

const dp = {};
const w = (a, b, c) => {
  // 셋 중 하나라도 음수라면 return 1
  if (a <= 0 || b <= 0 || c <= 0) {
    return 1;
  }

  if (`${a}-${b}-${c}` in dp) {
    return dp[`${a}-${b}-${c}`];
  }

  // 셋 중 하나라도 20보다 크다면 return w(20, 20, 20)
  if (a > 20 || b > 20 || c > 20) {
    return w(20, 20, 20);
  }

  // a < b < c라면 
  if (a < b && b < c) {
    dp[`${a}-${b}-${c}`] = w(a, b, c - 1) + w(a, b - 1, c - 1) - w(a, b - 1, c);
    return dp[`${a}-${b}-${c}`];
  }

  dp[`${a}-${b}-${c}`] = w(a - 1, b, c) + w(a - 1, b - 1, c) + w(a - 1, b, c - 1) - w(a - 1, b - 1, c - 1);
  return dp[`${a}-${b}-${c}`];
};

let ans = ''
for (let i = 0; i < stdin.length - 1; i++) {
  const [a, b, c] = stdin[i].trim().split(' ').map(Number);
  ans += `w(${a}, ${b}, ${c}) = ${w(a, b, c)}\n`;
}

console.log(ans.trim());
