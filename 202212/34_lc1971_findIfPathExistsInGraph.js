// LeetCode 1971. Find if Path Exists in Graph

// dfs
const validPath = (n, edges, source, destination) => {
  const stack = [source];
  const visit = new Array(n).fill(false);
  const adj = new Array(n).fill(0).map(() => []);

  for (const [v1, v2] of edges) {
    adj[v1].push(v2);
    adj[v2].push(v1);
  }

  visit[source] = true;

  while (stack.length > 0) {
    const curV = stack.pop();
    if (curV === destination) {
      return true;
    }
    
    for (const neiV of adj[curV]) {
      if (visit[neiV]) {
        continue;
      }
      stack.push(neiV);
      visit[neiV] = true;
    }
  }
  return false;
};

