// LeetCode 236 Lowest Common Ancestor of a Binary Tree

// 발견하면 하나씩 더해가면서, 발견한 노드가 두 개가 되는 지점의 root를 반환하는 방식으로 풀이
// 이제 단순하게 트리를 순회하는 것은 익숙해진 것 같다.
// https://leetcode.com/discuss/study-guide/1212004/binary-trees-study-guide
// 일단 위 사이트에 있는 문제를 모두 풀고나면, 어떻게 더 예쁘게 트리를 돌 수 있는지
// 최적화를 하는 건지 알아봐야겠다. (AVL같은 트리)
// 이제 트리도 하나의 그래프처럼 생각할 수 있게 된 것 같다.
// 원래도 그래프의 종류였지만,,,

// 사실 B Tree같은 것을 트리 순회도 제대로 못 돌리면서 이해하려고 했던 것이
// 잘못됐던 것은 맞는 것 같다.
// React나 DOM같은 것들이 죄다 tree라
// 사실 이렇게 푸는 것만으로도 react를 조금 더 직관적으로 이해하게 된 것 같다.

const lowestCommonAncestor = (root, p, q) => {
  let ans;

  const dfs = (root) => {
    if (!root) return 0;

    const res =
      dfs(root.left) +
      dfs(root.right) +
      // 삼항 연산자를 더하고 싶을 때는 ()로 감싸기!
      // 괄호로 안 감쌌더니 의도한 결과가 나오지 않았다.
      (root.val === p.val || root.val === q.val ? 1 : 0);

    if (res === 2 && !ans) {
      ans = root;
    }

    return res;
  };

  dfs(root);

  return ans;
};

// lowest common ancestor (LCA)
// https://youtu.be/py3R23aAPCA
// 유명한 알고리즘 문제인가 보다.

// x, y의 공통 조상 찾기

// Tree 문제를 볼 때 전체 tree를 보지 말고
// single node에 집중을 하자.

// node는 root, left, right로 구성되어 있다.
//     root
//     /  \
//  left  right

// bottom -> top으로 올라갈 때,
// left subtree에 x가 있고, right subtree에 y가 있다면
// 이 root가 공통 조상이므로 return해서 위로 올린다.

// (둘 중 하나만 x, y 중 하나의 값이 있다면)
// left subtree에 x가 있고, right subtree에는 y가 없을 때
// root는 공통 조상이 아니다.
// 이때는 그냥 x값을 그대로 올린다.

const lowestCommonAncestor2 = (root, p, q) => {
  if (!root) return null;
  // 이 사람은 root를 기준으로 생각한다.
  // 나는 항상 left, right에서 무엇이 return될까에 좀 더 중점을 두고 했었다.
  if (root.val === p.val || root.val === q.val) return root;

  // p나 q값을 만나지 못한다면 여기로 와서
  // 계속 recursion을 타고 내려가게 된다.
  // 그렇다보면 left나 right는 null이나 root 둘 중 하나를 return하게 된다.
  const left = lowestCommonAncestor(root.left, p, q);
  const right = lowestCommonAncestor(root.right, p, q);

  // 이때 한 쪽에만 값이 있다면, 그 값을 return해서 위로 올린다.
  if (!left) return right;
  if (!right) return left;

  // left && right => root
  return root;
};
