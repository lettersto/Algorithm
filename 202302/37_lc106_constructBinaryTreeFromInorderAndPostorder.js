// LeetCode 106 Construct Binary Tree from Inorder and Postorder Traversal

const buildTree = (inorder, postorder) => {
  const N = inorder.length;
  const inorderIdx = {};
  inorder.forEach((val, idx) => (inorderIdx[val] = idx));

  const build = (iLeft, iRight, pLeft, pRight) => {
    if (pLeft > pRight || iLeft > iRight) return null;

    const root = postorder[pRight];
    const node = new TreeNode(root);

    const iRootIdx = inorderIdx[root];
    const rightSubtreeCnt = iRight - iRootIdx;

    node.left = build(iLeft, iRootIdx - 1, pLeft, pRight - rightSubtreeCnt - 1);
    node.right = build(
      iRootIdx + 1,
      iRight,
      pRight - rightSubtreeCnt,
      pRight - 1,
    );

    return node;
  };

  return build(0, N - 1, 0, N - 1);
};
