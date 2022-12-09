// 이 방법은 틀린 것 같음
// 각 index마다 경우의 수를 구해 곱하면 되지 않을까 했지만...
const numDecodings = (s) => {
  const arr = new Array(s.length);
  let i = s.length - 1;

  while (i >= 0) {
    if (s[i] === "0") {
      arr[i] = 1;
      arr[i - 1] = 0;
      i -= 2; 
    } else {
      if (i !== 0 && (s[i - 1] === "1" || (s[i - 1] === "2" && Number(s[i]) <= 6))) {
        arr[i] = 2;
        i -= 1;
      } else {
        arr[i] = 1;
        i -= 1;
      }
    }
  }

  console.log(arr);
};

// bfs처럼 풀어보려 했지만 시간 초과
// "111111111111111111111111111111111111111111111"
// 매 분기점마다 2개씩 나눠지기 때문 -> 2 ** n
const numDecodings2 = (s) => {
  const Q = [0]; // index

  if (s.length === 1) {
    if (s === "0") {
      return 0;
    } else {
      return 1;
    }
  }

  let cnt = 0;
  while (Q.length) {
    const curIdx = Q.shift();
    if (curIdx >= s.length - 1) {
      cnt += 1;
      continue;
    }

    if (s[curIdx] === '0') {
      continue;
    }

    if (curIdx !== s.length - 1 && (s[curIdx] === '1' || (s[curIdx] === '2' && Number(s[curIdx + 1]) <= 6))) {
      Q.push(curIdx + 2);
      if (s[curIdx + 1] !== '0') {
        Q.push(curIdx + 1);
      }
    } else{
      Q.push(curIdx + 1);
    }
  }

  return cnt;
};

// dp

// i 번째 경우의 수는 s[i + 1:]의 경우의 수와 s[i + 2:]의 경우의 수를 합한 것과 동일
// dp[i] = dp[i + 1] + dp[i + 2]

// 범위를 벗어나는 i는 1로 설정
// if s[i] === "0" 부분에서 마지막 문자가 0이면
// dp[s.length - 1] = 0
// 아니라면 dp[s.length - 1] = 1 로 쉽게 만들기 위함
const numDecodings3 = (s) => {
  dp = {};
  dp[s.length] = 1;  // empty string

  for (let i = s.length - 1; i >= 0; i--) {
    if (s[i] === "0") {
      dp[i] = 0;
    } else {
      dp[i] = dp[i + 1];
      if (i < s.length - 1 && s[i] === "1" 
      || s[i] === "2" && Number(s[i + 1]) <= 6) {
        dp[i] += dp[i + 2];
      }
    }
  }

  return dp[0];
};

// 재귀 함수로 풀기
const numDecodings4 = (s) => {
  dp = {};
  dp[s.length] = 1;  // empty string

  const dfs = (idx) => {
    if (idx in dp) {
      return dp[idx];
    }

    if (s[idx] === "0") {
      return 0;
    }

    // dp[i] = dp[i + 1] + dp[i + 2]

    // tmp = dp[i + 1]
    let result = dfs(idx + 1);

    // tmp += dp[i + 2]
    if (idx < s.length - 1 && s[idx] === "1" ||
    s[idx] === "2" && Number(s[idx + 1]) <= 6) {
      result += dfs(idx + 2);
    }

    // dp[i] = tmp
    dp[idx] = result;
    return result;
  };

  return dfs(0);
};
