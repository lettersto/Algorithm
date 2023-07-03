// LeetCode 859. Buddy Strings

const buddyStrings = function (s, goal) {
  const n = s.length;
  const m = goal.length;

  if (n !== m) {
    return false;
  }

  let diffs = [];
  const counter = {};

  for (let i = 0; i < n; i++) {
    if (s[i] !== goal[i]) {
      diffs.push(i);
    }
    counter[s[i]] = (counter[s[i]] ?? 0) + 1;
    if (diffs.length > 2) return false;
  }

  if (diffs.length === 1) return false;

  if (diffs.length === 0) {
    for (const key in counter) {
      if (counter[key] >= 2) {
        return true;
      }
    }
    return false;
  }

  if (s[diffs[0]] !== goal[diffs[1]] || s[diffs[1]] != goal[diffs[0]]) {
    return false;
  }

  return true;
};

// 다른 사람 풀이
const buddyStrings2 = function (s, goal) {
  if (s.length !== goal.length) return false;
  // 같은 문자가 있다면 set을 했을 때 숫자가 줄어들 것
  // 굳이 직접 개수를 세지 않아도 된다.
  if (s === goal && new Set(s).size < s.length) return true;

  let diffs = [];

  for (let i = 0; i < s.length; i++) {
    if (s[i] !== goal[i]) {
      diffs.push(i);
    }
  }

  // diffs.length === 2를 조건으로 달면 더 줄일 수가 있다
  return (
    diffs.length === 2 &&
    s[diffs[0]] === goal[diffs[1]] &&
    s[diffs[1]] === goal[diffs[0]]
  );
};
