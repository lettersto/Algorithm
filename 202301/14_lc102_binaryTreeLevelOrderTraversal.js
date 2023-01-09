// LeetCode 102 Binary Tree Level Order Traversal

// bfs를 이용해 풀은 풀이
const levelOrder = function(root) {
  const Q = [];
  const ans = [];
  root && Q.push([0, root]);

  while (Q.length > 0) {
    const [lvl, curV] = Q.shift();
    if (!curV) {
      continue;
    }
    if (ans.length < lvl + 1) {
      ans.push([]);
    }
    ans[lvl].push(curV.val);

    Q.push([lvl + 1, curV.left]);
    Q.push([lvl + 1, curV.right]);
  }

  return ans;
};

// 재귀를 이용한 풀이
const levelOrder2 = function(root) {
  const ans = [];

  const traversal = (curV, idx) => {
    if (!curV) {
      return;
    }
    if (ans.length < idx + 1) {
      ans.push([]);
    }
    ans[idx].push(curV.val);
    traversal(curV.left, idx + 1);
    traversal(curV.right, idx + 1);
  };

  traversal(root, 0);

  return ans;
};
