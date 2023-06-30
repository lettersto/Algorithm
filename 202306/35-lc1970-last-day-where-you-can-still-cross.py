# LeetCode 1970. Last Day Where You Can Still Cross

# union-find 심화버전

# 다른 사람의 코드를 보고 공부... 🥲

# row * col이 20000까지 가능하기 때문에 
# 단순히 dfs를 돌려서 확인하는 것은 TLE가 난다.

# 그래서 union find를 이용해야 한다.
# 이때,
# 물을 이어서 가로로 하나 만들어지는 게 형성되거나
# 땅을 이어서 세로로 하나 이어지는 게 유지되어 있는지 확인

# 이때 가로와 세로가 이어져 있는지 확인을 어떻게 하는지가 관건
# union find에서 시작 지점과 끝 지점을 의미하는 것을 하나씩 둔다.

# row의 개수가 R개, col의 개수가 C개라고 할 때
# 0 (시작 지점), 1 ~ R * C (실제 땅, 물 개수), R * C + 1 (끝 지점)
# 총 R * C + 2

# 물을 이어서 가로선 이어지는 시점을 찾는다면,
# col이 0인지점은 모두 f(0)인 지점과 이어지도록 하고,
# col이 R - 1인 지점은 f(R * C + 1)인 지점과 이어지도록 한다.
# 이후 f(0)의 parent와 f(R * C + 1)의 parent가 같아진다면,
# 시작과 끝이 연결된 것이므로 가로선의 완성

from typing import List


class DSU:
    def __init__(self, V: int):
        self.parent = list(range(V))  # range도 iterator이므로 list에 바로 넣기 가능
        self.rank = [0 for _ in range(V)]  # 없으면 TLE

    def find(self, x: int) -> int:
        while self.parent[x] != x:
            x = self.parent[x]
        return self.parent[x]

    def union(self, x: int, y: int) -> bool:
        xRoot = self.find(x)
        yRoot = self.find(y)

        if xRoot == yRoot: return True

        if self.rank[xRoot] > self.rank[yRoot]:
            self.parent[yRoot] = xRoot
        elif self.rank[xRoot] < self.rank[yRoot]:
            self.parent[xRoot] = yRoot
        else:
            self.parent[yRoot] = xRoot
            self.rank[xRoot] += 1
            
        return False


class Solution:
    def getIndex(self, C: int, row: int, col: int):
        # row와 col을 one-dimensional array로 만들었을 때의 index
        # 거기에 + 1 수행 (0이 아니라 1부터 시작해야 하므로)
        return C * row + col + 1

    def latestDayToCross(self, R: int, C: int, cells: List[List[int]]) -> int:
        lands = [[0] * C for _ in range(R)]
        dsu = DSU(R * C + 2)
        D = ((1, 0), (0, 1), (0, -1), (-1, 0), (1, -1), (-1, 1), (1, 1), (-1, -1))
        # land[x][y]에 물이 하나 생기면, 8방향으로 모두 뒤져서 주위에 다른 물이 있는지 확인 필요

        for i in range(len(cells)):
            curR, curC = cells[i]
            curR -= 1
            curC -= 1
            lands[curR][curC] = 1

            idx = self.getIndex(C, curR, curC)

            for dr, dc in D:
                newR, newC = curR + dr, curC + dc
                # 주위에 물이 있는지 확인 -> 있으면 union
                if 0 <= newR < R and 0 <= newC < C \
                    and lands[newR][newC]:
                    dsu.union(idx, self.getIndex(C, newR, newC))
            
            # col이 0이라면, 시작 지점과 연결해 둠
            if curC == 0:
                dsu.union(0, idx)
            # col이 C - 1이라면, 끝 지점과 연결해 둠
            if curC == C - 1:
                dsu.union(R * C + 1, idx)
            # 시작 지점과 끝 지점이 연결되었는지 확인
            if dsu.find(0) == dsu.find(R * C + 1):
                return i
        
        return 0

