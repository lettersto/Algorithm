// LeetCode 2352 Equal Row and Column Pairs

const equalPairs = function (grid) {
  const rows = new Map();
  let ans = 0;

  for (let i = 0; i < grid.length; i++) {
    const key = grid[i].join('-');
    rows.set(key, (rows.get(key) ?? 0) + 1);
  }

  for (let i = 0; i < grid.length; i++) {
    let col = '';
    for (let j = 0; j < grid.length; j++) {
      const tmp = j === 0 ? '' : '-';
      col += tmp + grid[j][i];
    }
    ans += rows.get(col) ?? 0;
  }

  return ans;
};
