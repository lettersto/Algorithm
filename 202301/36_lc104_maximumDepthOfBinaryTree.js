// LeetCode 104 Maximum Depth of Binary Tree

// 평소에 backtracking 하는 방식 응용
const maxDepth = (root) => {
  let ans = 0;

  const traversal = (root, depth) => {
    if (!root) return;

    ans = Math.max(ans, depth);

    traversal(root.left, depth + 1);
    traversal(root.right, depth + 1);
  };

  traversal(root, 1);

  return ans;
};
