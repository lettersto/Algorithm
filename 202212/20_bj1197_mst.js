// prim 풀이
class Heap {
  constructor() {
    this.heap = [null];
    this.last = 0;
  }

  get length() {
    return this.last;
  }

  push(val) {
    this.last += 1;
    this.heap[this.last] = val;

    let child = this.last;
    let parent = Math.floor(this.last / 2);

    while (parent >= 1) {
      if (this.heap[parent][0] > this.heap[child][0]) {
        const tmp = this.heap[parent];
        this.heap[parent] = this.heap[child];
        this.heap[child] = tmp;

        child = parent;
        parent = Math.floor(child / 2);
      } else {
        break;
      }
    }
  }

  pop() {
    if (!this.last) {
      return;
    }

    const minVal = this.heap[1];
    this.heap[1] = this.heap[this.last];
    this.last -= 1;

    let parent = 1;
    let child = parent * 2;

    while (child <= this.last) {
      if (child + 1 <= this.last && this.heap[child][0] > this.heap[child + 1][0]) {
        child = child + 1;
      }

      if (this.heap[parent][0] > this.heap[child][0]) {
        const tmp = this.heap[parent];
        this.heap[parent] = this.heap[child];
        this.heap[child] = tmp;

        parent = child;
        child = parent * 2;
      } else {
        break;
      }
    }
    return minVal;
  }
}

{
  const fs = require('fs');
  const filePath = process.platform === 'linux' ? '/dev/stdin' : '00.txt';
  let [VE, ...arr] = fs.readFileSync(filePath).toString().trim().split('\n');
  
  const [V, E] = VE.split(' ').map(Number);
  const adj = new Array(V + 1).fill(0).map(() => []);
  
  for (let i = 0; i < E; i++) {
    const [v1, v2, w] = arr[i].split(' ').map(Number);
    adj[v1].push([w, v2]);
    adj[v2].push([w, v1]);
  }
  
  const prim = () => {
    const Q = new Heap();
    Q.push([0, 1]);
    const visit = new Set();
  
    let ans = 0;
    while (visit.size < V) {
      const [curCost, curV] = Q.pop();
      if (visit.has(curV)) {
        continue;
      }
      visit.add(curV);
      ans += curCost;
  
      for (const [neiCost, neiV] of adj[curV]) {
        if (visit.has(neiV)) {
          continue;
        }
        Q.push([neiCost, neiV]);
      }
    }
    return ans;
  };
  
  console.log(prim());
}


// kruskal 풀이
class MST {
  constructor(V) {
    this.parent = new Array(V + 1).fill(0).map((_, i) => i);
    this.rank = new Array(V + 1).fill(0);
    this.edgeCnt = 0;
  }

  find(val) {
    while (val !== this.parent[val]) {
      val = this.parent[val];
    }
    return this.parent[val];
  }

  union(x, y) {
    const rootX = this.find(x);
    const rootY = this.find(y);

    if (rootX === rootY) {
      return false;
    }

    if (this.rank[rootX] > this.rank[rootY]) {
      this.parent[rootY] = rootX;
    }

    if (this.rank[rootX] < this.rank[rootY]) {
      this.parent[rootX] = rootY;
    }

    if (this.rank[rootX] === this.rank[rootY]) {
      this.parent[rootY] = rootX;
      this.rank[rootX] += 1;
    }

    this.edgeCnt += 1;
    return true;
  }
}

{
  const fs = require('fs');
  const filePath = process.platform === 'linux' ? '/dev/stdin' : '00.txt';
  let [VE, ...arr] = fs.readFileSync(filePath).toString().trim().split('\n');
  
  const [V, E] = VE.split(' ').map(Number);
  const edges = [];
  
  for (let i = 0; i < E; i++) {
    const [v1, v2, w] = arr[i].split(' ').map(Number);
    edges.push([w, v1, v2]);
  }
  
  edges.sort((a, b) => a[0] - b[0]);
  
  const mst = new MST(V);
  let ans = 0;
  for (const [w, v1, v2] of edges) {
    if (mst.union(v1, v2)) {
      ans += w;
      if (mst.edgeCnt === V - 1) {
        break;
      }
    }
  }
  
  console.log(ans);
}

