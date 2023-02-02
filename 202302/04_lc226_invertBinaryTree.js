// LeetCode 226 Invert Binary Tree

const invertTree = (root) => {
  if (!root) return root;

  // [root.left, root.right] = [root.right, root.left];
  const tmp = root.left;
  root.left = root.right;
  root.right = tmp;

  invertTree(root.left);
  invertTree(root.right);

  return root;
};
