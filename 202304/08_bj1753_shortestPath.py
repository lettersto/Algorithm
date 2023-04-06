# 백준 1753 최단 거리 

import sys
from heapq import heappop, heappush
input = sys.stdin.readline

V, E = map(int, input().split())
S = int(input())
adj = [[] for _ in range(V + 1)]

for _ in range(E):
    v1, v2, w = map(int, input().split())
    adj[v1].append((w, v2))


def dijkstra():
    Q = [(0, S)]
    visit = [False] * (V + 1)
    res = ["INF"] * (V + 1)

    while Q:
        curCost, curV = heappop(Q)

        if visit[curV]:
            continue

        res[curV] = curCost
        visit[curV] = True

        for neiCost, neiV in adj[curV]:
            if visit[neiV]:
                continue
            heappush(Q, (curCost + neiCost, neiV))

    return res


distance = dijkstra()
for i in range(1, V + 1):
    print(distance[i])
