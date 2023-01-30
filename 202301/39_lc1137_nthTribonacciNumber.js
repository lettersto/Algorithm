// LeetCode 1137 Nth Tribonacci Number

// 피보나치 3개 버전으로 쉽다.
const cache = {};
const tribonacci = (n) => {
  if (n === 0) return 0;
  if (n <= 2) return 1;
  if (cache[n]) return cache[n];

  cache[n] = tribonacci(n - 1) + tribonacci(n - 2) + tribonacci(n - 3);
  return cache[n];
};
