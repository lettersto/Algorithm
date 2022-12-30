// LeetCode 797 All Paths From Source to Target

const allPathsSourceTarget = function(graph) {
  const visit = new Array(graph.length).fill(false);
  const ans = [];

  const dfs = (curV, path) => {
    if (curV === graph.length - 1) {
      ans.push(path.slice());
      return;
    }

    for (const neiV of graph[curV]) {
      if (!visit[neiV]) {
        visit[neiV] = true;
        dfs(neiV, [...path, neiV]);
        visit[neiV] = false;
      }
    }
  };

  dfs(0, [0]);
  return ans;
};

// DAG이고 항상 0에서 출발하기 때문에 굳이 visit을 체크할 필요 X
const allPathsSourceTarget2 = function(graph) {
  const ans = [];

  const dfs = (curV, path) => {
    if (curV === graph.length - 1) {
      ans.push([...path]);  // slice일 때보다 빠르게 나온다.
      return;
    }

    for (const neiV of graph[curV]) {
      dfs(neiV, [...path, neiV]);
    }
  };

  dfs(0, [0]);
  return ans;
};
