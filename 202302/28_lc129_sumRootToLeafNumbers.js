// LeetCode 129 Sum Root to Leaf Numbers

const sumNumbers = function (root) {
  let ans = 0;

  const dfs = (root, sumV) => {
    if (!root) return;

    const curV = sumV * 10 + root.val;

    if (!root.left && !root.right) {
      ans += curV;
      return;
    }

    dfs(root.left, curV);
    dfs(root.right, curV);
  };

  dfs(root, 0);

  return ans;
};

// iterative
const sumNumbers2 = function (root) {
  const stack = [[root, root.val]];
  let totalSum = 0;

  while (stack.length > 0) {
    const [curNode, curSum] = stack.pop();

    if (!curNode.left && !curNode.right) {
      totalSum += curSum;
    }

    if (curNode.left) {
      stack.push([curNode.left, curSum * 10 + curNode.left.val]);
    }

    if (curNode.right) {
      stack.push([curNode.right, curSum * 10 + curNode.right.val]);
    }
  }

  return totalSum;
};
