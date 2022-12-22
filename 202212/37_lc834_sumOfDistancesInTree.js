// LeetCode 834 Sum of Distances in Tree

// 오늘의 랜덤 문제.. 난이도가 hard인 것을 봤을 때부터 피했어야 했다.
// 결론: 트리는 preOrder, postOrder와 같은 tree traversal부터 다시 해야 한다.
// 쓰인 알고리즘 dp + tree + dfs

// 설명 보고 겨우 이해한 내용
// https://leetcode.com/problems/sum-of-distances-in-tree/solutions/130583/c-java-python-pre-order-and-post-order-dfs-o-n/


const sumOfDistancesInTree = (n, edges) => {
  // 1. edges를 인접 리스트로 만들어, 그래프 이동을 쉽게 만든다.
  const adj = new Array(n).fill(0).map(() => []);
  for (let i = 0; i < n - 1; i++) {
    adj[edges[i][0]].push(edges[i][1]);
    adj[edges[i][1]].push(edges[i][0]);
  }
  
  // 2. sumArr은 결과를 담을 array
  //    subTreeCnt는 해당 노드를 root로 하는 subtree가 갖고 있는 노드 개수
  //    루트 자기 자신을 포함하면 무조건 1개가 존재하니까, 1로 초기화
  const sumArr = new Array(n).fill(0);
  const subTreeCnt = new Array(n).fill(1);

  // 3. 먼저 아무 root를 기준으로 subArr와 subTreeCnt의 정보를 구한다.
  //    여기서는 0번 노드를 기준으로 한다.
  //    leaf node에서부터 더해오며 구할 것이기 때문에 postOrder를 사용한다.
  const postOrder = (curV, preV) => {
    for (const neiV of adj[curV]) {
      // prevent going backwords
      if (neiV == preV) {
        continue;
      }
      postOrder(neiV, curV);
      subTreeCnt[curV] += subTreeCnt[neiV];
      // parent node에서 합은
      // += (child 노드의 합 + child 노드가 보유한 노드의 개수)를 보유한 child만큼 반복한다.
      // child 노드가 보유한 노드 개수를 더하는 이유는,
      // parent node와 child node를 연결하는 edge를 child node의 subTreeCnt만큼 반복해서 지나가기 때문이다.
      sumArr[curV] += sumArr[neiV] + subTreeCnt[neiV];
    }
  }

  // 4. root를 0로 했을 때 얻은 정보를 기준으로, 결과값을 구한다.
  //    root를 parent에서 child로 옮기면,
  //    기존 sumArr[root] 값에서
  //      a. root로부터 멀어지게 되는 node들은 거리를 + 1
  //      b. root로 가까워지게 되는 node들은 거리를 -1 한다.
  //    a는 parent의 tree 중 현재 child의 subtree를 제외한 부분이고
  //    b는 현재 child의 subtree 부분이다. 
  //    parent -> child로 이동하는 순간 바로 연산하므로 preOrder
  const preOrder = (parent, preV) => {
    for (const child of adj[parent]) {
      if (child === preV) {
        continue;
      }
      // a는 전체 노드 개수 중 child가 보유한 node 개수를 빼면 된다: n - subTreeCnt[child]
      // b는 현재 child의 subtree 개수: - subTreeCnt[child]
      sumArr[child] = sumArr[parent] + n - subTreeCnt[child] - subTreeCnt[child];
      preOrder(child, parent);
    }
  };

  postOrder(0, -1);
  preOrder(0, -1);

  return sumArr;
};
