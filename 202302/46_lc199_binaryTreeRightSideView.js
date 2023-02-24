// LeetCode 199 Binary Tree Right Side View

// 처음에 dfs로 right node만 먼저 들어가면 되지 않을까 했지만
// 오른쪽에서 본 노드가 왼쪽 가지에 있을 수도 있었다.

// 그래서 이 방법은 안 되서 BFS를 사용하게 되었다.
// BFS로 같은 level에 있는 노드를 모두 집어 넣으면
// 맨 마지막에 있는 노드가 오른쪽에 있게 된다.

const rightSideView = (root) => {
  const ans = [];
  if (!root) return ans;

  let Q = [root];

  while (Q.length > 0) {
    ans.push(Q.at(-1).val);

    const lvl = [];

    for (const node of Q) {
      node?.left && lvl.push(node.left);
      node?.right && lvl.push(node.right);
    }

    Q = lvl;
  }

  return ans;
};
