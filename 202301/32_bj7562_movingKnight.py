# 백준 7562 나이트의 이동

import sys
from collections import deque
input = sys.stdin.readline


def bfs(N, sR, sC, gR, gC):
    Q = deque([(sR, sC)])
    visit = [[0 for _ in range(N)] for _ in range(N)]
    D = ((-2, -1), (-2, 1), (-1, -2), (-1, 2), (1, 2), (1, -2), (2, 1), (2, -1))

    visit[sR][sC] = 1

    while Q:
        curR, curC = Q.popleft()
        if curR == gR and curC == gC:
            return visit[curR][curC] - 1

        for dr, dc in D:
            newR, newC = curR + dr, curC + dc

            if newR < 0 or newR >= N or newC < 0 or newC >= N or visit[newR][newC]:
                continue

            Q.append((newR, newC))
            visit[newR][newC] = visit[curR][curC] + 1

    return -1


T = int(input().rstrip())

for _ in range(T):
    N = int(input().rstrip())

    sR, sC = map(int, input().rstrip().split())
    gR, gC = map(int, input().rstrip().split())

    print(bfs(N, sR, sC, gR, gC))
