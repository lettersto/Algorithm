// LeetCode 2421 Number of Good Paths

// union - find 문제 중 난이도 어려운 듯 ㅠㅠ
// 다른 사람 풀이 보고 힌트를 얻어서 했다.
// 조금만 더 시간 투자를 하고 머리를 굴렸다면 안 보고도 가능했을지도
class DSU {
  constructor(V) {
    this.parent = new Array(V).fill(0).map((_, i) => i);
    this.rank = new Array(V).fill(0);
  }

  find(x) {
    while (x !== this.parent[x]) {
      x = this.parent[x];
    }
    return this.parent[x];
  }

  union(x, y) {
    const xRoot = this.find(x);
    const yRoot = this.find(y);

    if (xRoot === yRoot) return false;

    if (this.rank[xRoot] > this.rank[yRoot]) {
      this.parent[yRoot] = xRoot;
    }
    if (this.rank[xRoot] < this.rank[yRoot]) {
      this.parent[xRoot] = yRoot;
    }
    if (this.rank[xRoot] === this.rank[yRoot]) {
      this.parent[yRoot] = xRoot;
      this.rank[xRoot] += 1;
    }

    return true;
  }
}

const numberOfGoodPaths = function (vals, edges) {
  const N = edges.length + 1;

  // 1. 값으로 node찾기위한 valToNode
  const valToNode = {};
  for (let idx = 0; idx < vals.length; idx++) {
    if (!(vals[idx] in valToNode)) {
      valToNode[vals[idx]] = [];
    }
    valToNode[vals[idx]].push(idx);
  }

  // 2. 노드 간 adjacent array 생성
  const adj = Array.from({ length: N }, () => []);
  for (const [v1, v2] of edges) {
    adj[v1].push(v2);
    adj[v2].push(v1);
  }

  // 3. 작은 val 부터 주위 노드 연결
  // 자기 자신과 같으면 += 1
  const sortedVals = [...new Set(vals)].sort((a, b) => a - b);
  const dsu = new DSU(N);

  let ans = N;
  // 작은 val 부터 시작
  for (const val of sortedVals) {
    // val마다 해당되는 노드를 시작점으로 연결 시작
    for (const curNode of valToNode[val]) {
      // 연결할 때 주변 노드가 자기 자신보다 같거나 작으면 union
      for (const neiNode of adj[curNode]) {
        if (val < vals[neiNode]) continue;
        dsu.union(curNode, neiNode);
      }
    }

    // 현재 val에 해당되는 노드마다 parent가 있을 것
    // 이 parent를 key로 하는 counter를 세기
    // 즉 현재 val을 가진 노드 중 연결 되어 있는 노드가 있는지 세기
    const counter = {};
    for (const curNode of valToNode[val]) {
      const p = dsu.find(curNode);
      counter[p] = (counter[p] ?? 0) + 1;
    }

    // 이때 연결되어 있는 노드가 parent마다 n개 있다면
    // 이때 각 parent마다 나올 수 있는 path의 개수는 nC2로 (n * (n - 1)) / 2
    for (const cnt of Object.values(counter)) {
      ans += Math.floor(cnt * (cnt - 1) / 2);
    }
  }

  return ans;
};