// LeetCode 563 Binary Tree Tilt

// 비슷한 유형만 풀다보니 이제 이런 문제는 그래도 어느 정도 풀리는 것 같다.
// recursive dfs
const findTilt = (root) => {
  let ans = 0;

  const traversal = (root) => {
    if (!root) return 0;

    const left = traversal(root.left);
    const right = traversal(root.right);

    ans += Math.abs(left - right);

    return root.val + left + right;
  };

  traversal(root);

  return ans;
};
