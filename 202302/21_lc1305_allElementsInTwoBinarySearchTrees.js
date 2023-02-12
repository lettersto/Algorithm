// LeetCode 1305 All Elements in Two Binary Search Trees

const getAllElements = function (root1, root2) {
  const ans = [];

  const inOrder = (root) => {
    if (!root) return;
    inOrder(root.left);
    ans.push(root.val);
    inOrder(root.right);
  };

  inOrder(root1);
  inOrder(root2);

  ans.sort((a, b) => a - b);

  return ans;
};
