// LeetCode 112 Path Sum

// 예전보다 dfs로 tree 순회하는 것에 훨씬 익숙해진 것 같다.
// 마치 구몬 수학 푸는 기분...!
// 이것도 이해 못하면서 더 어려운 알고리즘을 이해하려고 하니 과부하가 왔던 것 아닐까
const hasPathSum = (root, targetSum) => {
  let ans = false;

  const dfs = (root, sumV = 0) => {
    if (!root) return;
    if (!root.left && !root.right) {
      if (sumV + root.val === targetSum) {
        ans = true;
      }
    }
    dfs(root.left, sumV + root.val);
    dfs(root.right, sumV + root.val);
  };

  dfs(root);

  return ans;
};

// 개선본
const hasPathSum2 = (root, targetSum, sumV = 0) => {
  if (!root) return false;
  if (!root.left && !root.right) {
    return sumV + root.val === targetSum;
  }

  return (
    hasPathSum(root.left, targetSum, sumV + root.val) ||
    hasPathSum(root.right, targetSum, sumV + root.val)
  );
};
