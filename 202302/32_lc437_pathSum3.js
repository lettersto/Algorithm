// LeetCode 437 Path Sum III

const pathSum = (root, targetSum) => {
  if (!root) return 0;

  let ans = 0;

  const dfs = (root, sumArr) => {
    if (!root) return;

    if (root.val === targetSum) {
      ans += 1;
    }

    const newArr = [];
    newArr.push(root.val);
    sumArr.forEach((i) => {
      if (i + root.val === targetSum) {
        ans += 1;
      }
      newArr.push(i + root.val);
    });

    dfs(root.left, newArr);
    dfs(root.right, newArr);
  };

  dfs(root, []);

  return ans;
};
