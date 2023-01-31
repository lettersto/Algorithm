// LeetCode 111 Minimum Depth of Binary Tree

// 아무 도움 없이 풀었다는 것에 의의

// balanced binary tree 문제와 유사해 보이지만
// leaf부터 depth를 더해 올라오는 방식으로는 해결할 수 없는 문제가 있어서
// recursive DFS가 아니라 BFS로 위에서부터 아래로 depth를 추적해나갔다.

const minDepth = (root) => {
  if (!root) return 0;

  let ans = Infinity;
  // 여기에서 1은 depth보다는 거쳐간 노드 개수라고 생각하면 더 편하다.
  // 그렇기 때문에 0을 넣을 수가 없어서 위에 별도로
  // if(!root) return 0를 넣게 되었다.
  const Q = [[root, 1]];

  while (Q.length > 0) {
    const [curNode, depth] = Q.shift();

    if (curNode.left) {
      Q.push([curNode.left, depth + 1]);
    }
    if (curNode.right) {
      Q.push([curNode.right, depth + 1]);
    }

    if (!curNode.left && !curNode.right) {
      ans = Math.min(ans, depth);
    }
  }

  return ans;
};

// 처음 DFS로 시도했던 방식
// 위에서부터 내려가다가 자식이 아예 없는 leaf node를 만날 때만 ans를 갱신해야 하는데
// 한쪽만 없는 경우에도 ans가 갱신이 되서 어려웠다.

// let ans = Infinity;

// const traversal = (root, depth) => {
//   if (!root) {
//     ans = Math.min(ans, depth);
//     return;
//   }

//   traversal(root.left, depth + 1);
//   traversal(root.right, depth + 1);
// }

// traversal(root, 0);

// return ans;

// 다른 사람 코드를 보니 dfs가 가능하다.
// dfs로 풀은 사람이 더 많아 보인다.
// 경우의 수를 위에서부터 차근차근 잘 내려가야 하는 것 같다.

const minDepth2 = (root) => {
  // 1. 아예 트리에 노드가 하나도 없는 경우
  if (!root) return 0;
  // 2. root는 있어서 내려왔는데 child node가 하나도 없는 경우 = leaf인 경우
  if (!root.left && !root.right) return 1; // 자기 자신 개수인 1
  // 3. 한 쪽 child Node만 없는 경우
  if (!root.left) {
    // 3 - 1. right node만 있는 경우
    return minDepth2(root.right) + 1;
  }
  if (!root.right) {
    // 3 - 2. left node만 있는 경우
    return minDepth2(root.left) + 1;
  }
  // 4. 두 child node가 모두 있는 경우
  return Math.min(minDepth2(root.left), minDepth2(root.right)) + 1;
};
