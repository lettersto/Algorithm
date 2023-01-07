// 백준 2606 바이러스

// 쉬운 dfs, bfs 문제

const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '00.txt';
let [V, E, ...edges] = fs.readFileSync(filePath).toString().trim().split('\n');
V = +V;
E = +E;

const adj = Array.from({length: V + 1}, () => []);
for (let i = 0; i < E; i++) {
  const [v1, v2] = edges[i].trim().split(' ').map(Number);
  adj[v1].push(v2);
  adj[v2].push(v1);
}

const dfs = () => {
  const ST = [1];
  const visit = new Set([1]);
  let ans = 0;

  while (ST.length > 0) {
    const curV = ST.pop();
    ans += 1;

    for (const neiV of adj[curV]) {
      if (visit.has(neiV)) {
        continue;
      }
      ST.push(neiV);
      visit.add(neiV);
    }
  }

  return ans - 1;
};

console.log(dfs());
