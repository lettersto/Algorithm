class Solution {
  int islandPerimeter(List<List<int>> grid) {
    final R = grid.length;
    final C = grid[0].length;

    final visit = List.generate(R, (idx) => List.generate(C, (idx) => false));

    int exploreIsland(row, col) {
      final queue = [
        [row, col]
      ];
      const dx = [1, -1, 0, 0];
      const dy = [0, 0, 1, -1];
      visit[row][col] = true;
      var totalCnt = 0;

      while (queue.length > 0) {
        final curL = queue.removeAt(0);
        final curR = curL[0];
        final curC = curL[1];
        var cnt = 0;

        for (var i = 0; i < 4; i++) {
          final newR = curR + dx[i];
          final newC = curC + dy[i];

          if (newR < 0 ||
              newR >= R ||
              newC < 0 ||
              newC >= C ||
              grid[newR][newC] == 0) {
            cnt += 1;
            continue;
          }

          if (visit[newR][newC]) continue;

          queue.add([newR, newC]);
          visit[newR][newC] = true;
        }

        totalCnt += cnt;
      }

      return totalCnt;
    }

    for (var row = 0; row < R; row++) {
      for (var col = 0; col < C; col++) {
        if (grid[row][col] == 1) {
          return exploreIsland(row, col);
        }
      }
    }

    return 0;
  }
}
