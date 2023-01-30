// LeetCode 110 Balanced Binary Tree

// 1. 트리의 depth를 구하는 함수
const getDepth = (root) => {
  if (!root) return 0; // leaf부터 차근차근 더해간다.

  const left = getDepth(root.left);
  const right = getDepth(root.right);

  return Math.max(left, right) + 1;
};

// 2. 트리의 depth를 비교하는 함수
// 1번까지는 했는데, 2번을 생각해내지 못했다.
const isBalanced = (root) => {
  if (!root) return true;

  const left = getDepth(root.left);
  const right = getDepth(root.right);

  return (
    Math.abs(left - right) <= 1 && // 자기 자신의 left, right 체크
    isBalanced(root.left) && // + left subtree가 balanced였는지 체크
    isBalanced(root.right) // + right subtree가 balanced였는지 체크
  );
};
