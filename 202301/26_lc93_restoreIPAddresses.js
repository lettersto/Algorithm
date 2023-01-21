// LeetCode 93 Restore IP Addrresses

// backtracking
const restoreIpAddresses = function (s) {
  const set = new Set();

  // string 대신 arr로 해서 join으로 하면 더 깔끔했을지도
  const backtracking = (depth, idx, strV) => {
    if (depth === 4 || idx >= s.length) {
      if (depth === 4 && idx === s.length) {
        set.add(strV.substring(1));
      }
      return;
    }

    for (let i = 1; i < 4 && idx + i <= s.length; i++) {
      // for 조건에 한꺼번에 묶어서 가능
      // if (idx + i > s.length) {
      //   continue;
      // }

      const newStr = s.substring(idx, idx + i);
      const newNum = +newStr;

      if (
        // 두 식을 묶어 하나로 가능
        // (newNum === 0 && newStr.length !== 1) ||
        // (newNum !== 0 && +newStr[0] === 0) ||
        (+newStr[0] === 0 && newStr.length !== 1) ||
        newNum > 255
      ) {
        continue;
      }

      backtracking(depth + 1, idx + i, strV + '.' + newStr);
    }
  };

  backtracking(0, 0, '');

  return [...set];
};
