// LeetCode 543 Diameter of Binary Tree

const diameterOfBinaryTree = (root) => {
  if (!root) return 0;

  let ans = 0;

  // 노드 개수를 수집하는 traversal
  const traversal = (root) => {
    if (!root) return 1; // leaf node라면 1을 return

    const left = traversal(root.left); // 왼쪽 subtree의 노드 개수
    const right = traversal(root.right); // 오른쪽 subtree의 노드 개수

    ans = Math.max(ans, left + right - 1); // 왼쪽 + 오른쪽 - root (root는 양쪽 subtree에 중복되므로)

    return Math.max(left, right) + 1;
  };

  traversal(root);

  return ans - 1; // edge의 개수는 node 개수 - 1
};

// 자잘한 것 개선
const diameterOfBinaryTree2 = (root) => {
  if (!root) return 0;

  let ans = 0;

  const traversal = (root) => {
    if (!root) return 0;

    const left = traversal(root.left);
    const right = traversal(root.right);

    ans = Math.max(ans, left + right);

    return Math.max(left, right) + 1;
  };

  traversal(root);

  return ans;
};
