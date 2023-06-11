// LeetCode 39. Combination Sum

// backtracking

const combinationSum1 = function (candidates, target) {
  const ans = [];

  const dfs = (startIdx = 0, selected = [], curSum = 0) => {
    if (curSum === target) {
      ans.push([...selected]);
      return;
    }

    if (curSum > target) {
      return;
    }

    for (let i = startIdx; i < candidates.length; i++) {
      dfs(i, [...selected, candidates[i]], curSum + candidates[i]);
    }
  };

  dfs();

  return ans;
};

// 위에서는 selected가 매번 새로운 array로 만들어졌기 때문에
// 아마도 메모리에서 매번 새로운 공간을 할당 + 복사했을 거라 생각된다.

// 하지만, 아래처럼 하나의 selected를 함수 외부에 두고 push, pop으로
// 동일한 array를 변경시키면 그만큼 time complexity나 space complexity를 줄일 수 있다.
const combinationSum2 = function (candidates, target) {
  const ans = [];
  const selected = [];

  const dfs = (startIdx = 0, curSum = 0) => {
    if (curSum === target) {
      ans.push([...selected]);
      return;
    }

    if (curSum > target) {
      return;
    }

    for (let i = startIdx; i < candidates.length; i++) {
      selected.push(candidates[i]);
      dfs(i, curSum + candidates[i]);
      selected.pop();
    }
  };

  dfs();

  return ans;
};
