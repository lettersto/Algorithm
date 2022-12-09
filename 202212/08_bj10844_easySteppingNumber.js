// 다 풀어놓고 %를 적용하지 않은 부분이 있어서 계속 틀렸다...

const fs = require('fs');

const N = +(process.platform === 'linux'
  ? fs.readFileSync('/dev/stdin').toString().trim()
  : `96`
);

{
  const dp = {};
  
  // first floor
  for (let i = 0; i < 10; i++) {
    dp[`1-${i}`] = 1;
  }
  
  const dfs = (num, floor) => {
    if (num === 10 || num < 0) {
      return 0;
    }
  
    if (`${floor}-${num}` in dp) {
      return dp[`${floor}-${num}`];
    }
  
    let res = 0;
    res = dfs(num - 1, floor - 1) + dfs(num + 1, floor - 1);
    dp[`${floor}-${num}`] = res % 1000000000;
    return res % 1000000000;
  };
  
  let ans = 0;
  for (let i = 1; i < 10; i++) {
    ans += dfs(i, N);
  }
  
  console.log(ans % 1000000000);
}


// 다른 사람 풀이 참고
// 기존 array를 두고 새 array를 만들어서 바꿀 때 상당히 map이 편한 것 같다
{
  let arr = new Array(10).fill(1);

  for (let i = 1; i < N; i++) {
    arr = arr.map((_, idx) => {
      const prev = arr[idx - 1] || 0;
      const next = arr[idx + 1] || 0;
      return (prev + next) % 1000000000;
    });
  }

  arr[0] = 0;
  const sumV = arr.reduce((item, acc) => (item + acc) % 1000000000, 0);
  console.log(sumV);
}
