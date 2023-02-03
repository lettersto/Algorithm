// LeetCode 700 Search in a Binary Search Tree

const searchBST = function (root, val) {
  if (!root) return null;
  if (root.val === val) return root;
  else if (root.val > val) return searchBST(root.left, val);
  else return searchBST(root.right, val);
};
