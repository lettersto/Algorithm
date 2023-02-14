// LeetCode 113 Path Sum II

const pathSum = (root, targetSum) => {
  let ans = [];

  const dfs = (root, path, sumV) => {
    if (!root) return;
    if (!root.left && !root.right) {
      if (sumV + root.val === targetSum) {
        ans.push([...path, root.val]);
      }
      return;
    }
    dfs(root.left, [...path, root.val], sumV + root.val);
    dfs(root.right, [...path, root.val], sumV + root.val);
  };

  dfs(root, [], 0);

  return ans;
};
