// 백준 1707 이분 그래프

const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '00.txt';
let [K, ...stdin] = fs.readFileSync(filePath).toString().trim().split('\n');

K = +K;

const input = (() => {
  let line = 0;
  return () => stdin[line++].split(' ').map(Number);
})();

const dfs = (val, visit, adj) => {
  const stack = [val];
  visit[val] = 1;

  while (stack.length) {
    const curV = stack.pop();

    for (const neiV of adj[curV]) {
      if (!visit[neiV]) {
        stack.push(neiV);
        visit[neiV] = visit[curV] === 1 ? -1 : 1;
      } else if (visit[neiV] && visit[neiV] === visit[curV]) {
        return false;
      }
    }
  }

  return true;
};

let ans = '';

tc: for (let k = 0; k < K; k++) {
  const [V, E] = input();
  const adj = new Array(V + 1).fill(0).map(() => []);
  const visit = new Array(V + 1).fill(0);

  for (let i = 0; i < E; i++) {
    const [v1, v2] = input();
    adj[v1].push(v2);
    adj[v2].push(v1);
  }

  for (let i = 1; i < V + 1; i++) {
    if (!visit[i]) {
      if (!dfs(i, visit, adj)) {
        ans += 'NO\n';
        continue tc;
      }
    }
  }
  ans += 'YES\n';
}

console.log(ans.trim());
