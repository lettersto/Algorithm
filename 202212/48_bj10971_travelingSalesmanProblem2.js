// 백준 10971 외판원 순회2
// dfs + backtracking으로도 간단하게 풀리는 문제
// 순회하니 어떤 지점에서 시작해도 상관 없고, 단 한번만 돌면 된다는 것이 핵심
const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '00.txt';
let [N, ...adj] = fs.readFileSync(filePath).toString().trim().split('\n');
N = +N;
adj = adj.map((item) => item.trim().split(' ').map(Number));

let minV = Infinity;
const visit = new Set();
const dfs = (curV, curS) => {
  if (curV === 0 && visit.size === N) {
    minV = Math.min(minV, curS);
    return;
  }

  if (minV < curS) {
    return;
  }

  for (let neiV = 0; neiV < N; neiV++) {
    if (curV === neiV || !adj[curV][neiV] || visit.has(neiV)) {
      continue;
    }

    visit.add(neiV);
    dfs(neiV, curS + adj[curV][neiV]);
    visit.delete(neiV);
  }
};

dfs(0, 0);

console.log(minV);

// 백준 2098 외판원 순회
// 위의 코드로는 시간 초과 발생
// https://blog.naver.com/kks227/220787042377 내일 참고
