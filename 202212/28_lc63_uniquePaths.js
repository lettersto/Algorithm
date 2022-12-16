// LeetCode 63 Unique Paths

const uniquePaths = function(m, n) {
  const board = new Array(n).fill(1);
  for (let row = 1; row < m; row++) {
    for (let col = 1; col < n; col++) {
      board[col] = board[col - 1] + board[col];
    }
  }
  return board[n - 1];
};
