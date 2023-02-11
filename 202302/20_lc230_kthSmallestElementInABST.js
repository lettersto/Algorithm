// LeetCode 230 Kth Smallest Element in a BST

// BST는 inOrder로 순회하면 오름차순이 된다는 것을 이용해 풀이
// kth를 넘어가면 더이상 순회하지 않도록 return
const kthSmallest = (root, k) => {
  let idx = 1;
  let ans = -1;

  const inOrder = (root) => {
    if (!root) return;
    if (idx > k) return;

    inOrder(root.left);
    if (idx === k) {
      ans = root.val;
    }
    idx += 1;
    inOrder(root.right);
  };

  inOrder(root);

  return ans;
};
