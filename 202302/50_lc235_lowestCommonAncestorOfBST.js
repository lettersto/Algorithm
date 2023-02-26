// LeetCode 235 Lowest Common Ancestor of a Binary Search Tree

// BST 특성 활용 안 하고 그냥 binary search처럼 푸는 것
const lowestCommonAncestor = (root, p, q) => {
  if (!root) return null;
  if (root.val === p.val || root.val === q.val) return root;

  const left = lowestCommonAncestor(root.left, p, q);
  const right = lowestCommonAncestor(root.right, p, q);

  if (!left) return right;
  if (!right) return left;

  return root;
};

// 다른 사람 풀이 + BST특성 활용
const lowestCommonAncestor2 = (root, p, q) => {
  if (!root) return null;

  let tmp = root;

  // left subtree로
  if (p.val < root.val && q.val < root.val) {
    tmp = lowestCommonAncestor(root.left, p, q);
  // right subtree로
  } else if (root.val < p.val && root.val < q.val) {
    tmp = lowestCommonAncestor(root.right, p, q);
  }

  return tmp;
};
