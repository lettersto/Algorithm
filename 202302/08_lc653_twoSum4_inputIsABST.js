// LeetCode 653 Two Sum IV - Input is a BST

// BST인 문제이지만 도저히 여기에서는 BST를 어떻게 활용해야 할지 감이 안 잡혀서
// 그냥 일반적인 트리 문제 + hash처럼 풀었다.

// dfs로 트리를 탐색하면서, 트리의 value를 계속 hash를 이용해 저장한다.
// 그리고 k - value 값이 이미 set에 있다면,
// k 합이 완성될 수 있으므로 true를 return
const findTarget = function (root, k) {
  const numSet = new Set();

  const traversal = (root) => {
    if (!root) return false;
    if (numSet.has(k - root.val)) return true;
    numSet.add(root.val);
    // 왼쪽으로 가든 오른쪽으로 가든, 하나라도 true가 뜨면 되므로 ||
    return traversal(root.left) || traversal(root.right);
  };

  return traversal(root);
};
