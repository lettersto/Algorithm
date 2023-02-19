// LeetCode 105 Construct Binary Tree from Preorder and Inorder Traversal

const buildTree = (preorder, inorder) => {
  const constructTree = (preLeft, preRight, inLeft, inRight) => {
    if (preLeft > preRight || inLeft > inRight) return null;
    const rootVal = preorder[preLeft];
    const tree = new TreeNode(rootVal);

    const inorderRootIdx = inorder.indexOf(rootVal); 

    const leftNodesCnt = inorderRootIdx - inLeft;

    tree.left = constructTree(preLeft + 1, preLeft + leftNodesCnt, inLeft, inorderRootIdx - 1);
    tree.right = constructTree(preLeft + leftNodesCnt + 1, preRight, inorderRootIdx + 1, inRight);
    
    return tree;
  };

  return constructTree(0, preorder.length - 1, 0, preorder.length - 1);
};

// 계속 indexOf를 쓰면 n개 마다 O(n)의 search를 수행해, n ** 2이 될테니
// 처음부터 object에 저장해두고 하는 방향으로
const buildTree2 = (preorder, inorder) => {
  const inorderIdx = {};
  inorder.forEach((item, idx) => inorderIdx[item] = idx);

  const constructTree = (preLeft, preRight, inLeft, inRight) => {
    if (preLeft > preRight || inLeft > inRight) return null;
    const rootVal = preorder[preLeft];
    const tree = new TreeNode(rootVal);

    const inorderRootIdx = inorderIdx[rootVal]; 

    const leftNodesCnt = inorderRootIdx - inLeft;

    tree.left = constructTree(preLeft + 1, preLeft + leftNodesCnt, inLeft, inorderRootIdx - 1);
    tree.right = constructTree(preLeft + leftNodesCnt + 1, preRight, inorderRootIdx + 1, inRight);
    
    return tree;
  };

  return constructTree(0, preorder.length - 1, 0, preorder.length - 1);
};
