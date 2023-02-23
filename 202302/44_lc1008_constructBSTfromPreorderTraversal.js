// LeetCode 1008 Construct Binary Search Tree from Preorder Traversal

// root 보다 큰 숫자가 오른쪽에 온다는 성질을 이용해 풀이
// preorder에서 맨 처음 만난 root보다 큰 숫자가 오른쪽 subtree의 root일 수 밖에 없다.
const bstFromPreorder = (preorder) => {
  // root => preoreder[0]
  // left subtree root => preoreder[1],
  // right subtree root => num which is greater than root
  const root = preorder[0];
  if (!root) return null;

  const tree = new TreeNode(root);

  // search right root idx
  let rightRootIdx;

  for (let i = 1; i < preorder.length; i++) {
    if (preorder[i] > root) {
      rightRootIdx = i;
      break;
    }
  }

  if (rightRootIdx !== undefined) {
    tree.left = bstFromPreorder(preorder.slice(1, rightRootIdx));
    tree.right = bstFromPreorder(preorder.slice(rightRootIdx));
  } else {
    tree.left = bstFromPreorder(preorder.slice(1));
  }

  return tree;
};
