// LeetCode 257 Binary Tree Paths

const binaryTreePaths = (root) => {
  const ans = [];

  const dfs = (root, path) => {
    if (!root) {
      // 여기에서 하면 안 된다.
      // 왜냐하면 leaf가 아니라 left child나 right child 한 쪽만 가지고 있어도 작동하기 때문
      // ans.push(path.join('->'));
      return;
    }

    if (!root.left && !root.right) {
      ans.push([...path, root.val.toString()].join('->'));
    }

    dfs(root.left, [...path, root.val.toString()]);
    dfs(root.right, [...path, root.val.toString()]);
  };

  dfs(root, []);

  return ans;
};
