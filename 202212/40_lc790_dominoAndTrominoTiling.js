// LeetCode 790 Domino and Tromino Tiling

// 도저히 그림으로 못 풀겠어서 숫자로 바꿔 풀은 문제..ㅋㅋㅋㅋㅋ
// 1 2 5 11 24 53 117 218 ...

const numTilings = function(n) {
  const dp = new Array(n + 1).fill(0);
  dp[1] = 1;
  dp[2] = 2;
  dp[3] = 5;

  const fib = (val) => {
    if (dp[val]) {
      return dp[val];
    }

    dp[val] = (fib(val - 1) * 2 + fib(val - 3)) % (10 ** 9 + 7);
    return dp[val];
  };

  return fib(n);
};

// 다른 사람 풀이
const numTilings2 = function(n) {
  const dpD = {0: 1, 1: 1, 2: 2};
  const dpT = {0: 0, 1: 0, 2: 1};

  const domino = function(val) {
    if (val in dpD) {
      return dpD[val];
    }
    dpD[val] = (domino(val - 1) + domino(val - 2) + tromino(val - 1) * 2) % (10 ** 9 + 7);
    return dpD[val];
  };

  const tromino = function(val) {
    if (val in dpT) {
      return dpT[val];
    }
    dpT[val] = (domino(val - 2) + tromino(val - 1)) % (10 ** 9 + 7);
    return dpT[val];
  };

  return domino(n);
};
