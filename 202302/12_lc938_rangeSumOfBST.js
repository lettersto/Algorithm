// LeetCode 938 Range Sum of BST

// BST를 inorder로 탐색하면서 범위 내의 값이면 더하기
const rangeSumBST = function (root, low, high) {
  let sumV = 0;

  const inOrder = (root) => {
    if (!root) return;

    inOrder(root.left);
    if (root.val >= low && root.val <= high) {
      sumV += root.val;
    }
    inOrder(root.right);
  };

  inOrder(root);

  return sumV;
};

// BST이니까 안 가도 되는 가지를 if문으로 제한해 봤는데
// 오히려 비교를 더 많이 해서 시간이 오래 걸렸다.
const rangeSumBST2 = function (root, low, high) {
  let sumV = 0;

  const inOrder = (root) => {
    if (!root) return;

    if (root.val > low) {
      inOrder(root.left);
    }
    if (root.val >= low && root.val <= high) {
      sumV += root.val;
    }
    if (root.val < high) {
      inOrder(root.right);
    }
  };

  inOrder(root);

  return sumV;
};
