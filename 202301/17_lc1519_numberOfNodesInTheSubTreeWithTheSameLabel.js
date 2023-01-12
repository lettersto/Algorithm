// LeetCode 1519 Number of Nodes in the Sub-Tree With the Same Label

const countSubTrees = function (n, edges, labels) {
  // 0. 답을 저장할 ans
  const ans = Array.from({ length: n }, () => 0);

  // 1. edges로 tree 만들기
  const tree = Array.from({ length: n }, () => []);

  for (const [v1, v2] of edges) {
    tree[v1].push(v2);
    tree[v2].push(v1);
  }

  // 3. dfs로 순회
  const traversal = (curV, preV) => {
    // 3 - 1. 현재 node를 root로 하는 subtree에서 alphabet 상태 기록
    let alphabet = {};  

    // 3 - 2.
    // children이 없다면 (=== leaf node라면) for문을 돌지 않을 것

    // 3 - 4.
    // children이 있다면 (=== leaf node가 아니라면) for문을 돌 것
    for (const neiV of tree[curV]) {
      if (neiV === preV) continue;  // tree 순회가 역행하지 않도록 하는 continue
      // 3 - 5. 이때 재귀를 이용해 child 노드 각각의 alphabet object를 갖고 오고
      const tmp = traversal(neiV, curV);
      // 3 - 6. 갖고 온 alphabet object를 현재 alphabet object에 합쳐준다.
      for (const key in tmp) {
        alphabet[key] = (alphabet[key] ?? 0) + tmp[key];
      }
    }

    // 3 - 3.
    // 그렇다면 바로 여기로 내려와서 alphabet에 현재 label 값만 += 1하고
    // 이를 ans에 기록한 뒤 바로 return

    // 3 - 7.
    // child node의 alphabet을 모두 정리한 이후, 자기 자신의 label 값 추가
    // 그리고 이를 ans에 기록한 뒤 return
    alphabet[labels[curV]] = (alphabet[labels[curV]] ?? 0) + 1;
    ans[curV] = alphabet[labels[curV]];

    return alphabet;
  };

  traversal(0, -1);
  
  return ans;
};

console.log(String.fromCharCode(65));  // A
console.log(String.fromCharCode(65, 67, 70));  // ACF
console.log(String.fromCodePoint(9731));  // ☃
const abc = 'A';
console.log(abc.charCodeAt());  // 65
