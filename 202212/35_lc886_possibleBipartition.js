// LeetCode 886 Possible Bipartition

// Bipartite graph 혹은 bigraph 문제
// 두 가지 색으로, 그림에서 인접한 곳의 색을 다르게 칠할 수 있는가?와 같다
// for문을 돌리면서 아직 방문하지 않은 곳이 있다면 dfs를 돌린다.
// 방문하지 않은 곳은 0, 색칠한 곳은 1 아니면 -1로 표시
// dfs를 돌리면서 이전 node와 다른 색을 칠해준다.

const possibleBipartition = (n, dislikes) => {
  const adj = new Array(n + 1).fill(0).map(() => []);
  for (let i = 0; i < dislikes.length; i++) {
    adj[dislikes[i][0]].push(dislikes[i][1]);
    adj[dislikes[i][1]].push(dislikes[i][0]);
  }
  
  const visit = new Array(n + 1).fill(0);

  const dfs = (val) => {
    const stack = [val];
    visit[val] = 1;

    while (stack.length) {
      const curV = stack.pop();

      for (const neiV of adj[curV]) {
        if (!visit[neiV]) {
          stack.push(neiV);
          visit[neiV] = visit[curV] === 1 ? -1 : 1;
          // 같은 곳을 방문했는데 만약 색깔에 충돌이 발생한다면 false
        } else if (visit[neiV] && visit[neiV] === visit[curV]) {
          return false;
        }
      }
    }
    
    // 한 번도 충돌없이 칠하는 것을 완료했다면 true
    return true;
  }

  for (let i = 1; i < n + 1; i++) {
    if (visit[i] === 0) {
      if (!dfs(i)) {
        return false;
      }
    }
  }

  return true;
};
