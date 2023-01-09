// LeetCode 144 Binary Tree Preorder Traversal

const preorderTraversal = function (root) {
  const ans = [];

  const preOrder = (curV) => {
    if (curV) {
      ans.push(curV.val);
      preOrder(curV.left);
      preOrder(curV.right);
    }
  };

  preOrder(root);

  return ans;
};
