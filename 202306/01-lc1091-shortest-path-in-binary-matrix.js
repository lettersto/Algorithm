// leetcode 1091. Shortest Path in Binary Matrix
// bfs

const shortestPathBinaryMatrix = (grid) => {
  const N = grid.length;

  if (grid[0][0] == 1 || grid[N - 1][N - 1] == 1) {
    return -1;
  }

  const Q = [[0, 0, 1]];
  // prettier-ignore
  const D = [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [1, -1], [-1, 1], [-1, -1]];
  grid[0][0] = -1;

  while (Q.length > 0) {
    const [curR, curC, curCost] = Q.shift();
    if (curR == N - 1 && curC == N - 1) {
      return curCost;
    }

    for (let i = 0; i < 8; i++) {
      const [dr, dc] = D[i];
      const newR = curR + dr;
      const newC = curC + dc;
      if (
        newR < 0 ||
        newR >= N ||
        newC < 0 ||
        newC >= N ||
        grid[newR][newC] == -1 ||
        grid[newR][newC] == 1
      ) {
        continue;
      }
      Q.push([newR, newC, curCost + 1]);
      grid[newR][newC] = -1;
    }
  }

  return -1;
};
