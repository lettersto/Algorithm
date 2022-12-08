// 이전 longest palindromic substring을 그대로 사용

const countSubstrings = (s) => {
  let cnt = 0;

  for (let i = 0; i < s.length; i++) {
    // odd
    let left = i;
    let right = i;
    while (left >= 0 && right < s.length && s[left] === s[right]) {
      cnt += 1;
      left -= 1;
      right += 1;
    }

    // even
    left = i;
    right = i + 1;
    while (left >= 0 && right < s.length && s[left] === s[right]) {
      cnt += 1;
      left -= 1;
      right += 1;
    }
  }

  return cnt;
};
