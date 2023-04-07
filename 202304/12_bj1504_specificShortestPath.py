# 백준 1504 특정한 최단 경로

import sys
from heapq import heappop, heappush
input = sys.stdin.readline

V, E = map(int, input().split())
adj = [[] for _ in range(V + 1)]

for _ in range(E):
    v1, v2, w = map(int, input().split())
    adj[v1].append((w, v2))
    adj[v2].append((w, v1))

v1, v2 = map(int, input().split())


def dijkstra(start: int) -> list[int]:
    Q = [(0, start)]
    res = [-1] * (V + 1)

    while Q:
        curCost, curV = heappop(Q)
        if res[curV] != -1:
            continue
        res[curV] = curCost

        for neiCost, neiV in adj[curV]:
            if res[neiV] != -1:
                continue
            heappush(Q, (curCost + neiCost, neiV))

    return res


fromOne = dijkstra(1)
fromV1 = dijkstra(v1)
fromV = dijkstra(V)

route1 = route2 = -1
if fromV1[v2] != -1:
    if fromOne[v1] != -1 and fromV[v2] != -1:
        route1 = fromOne[v1] + fromV1[v2] + fromV[v2]
    if fromOne[v2] != -1 and fromV[v1] != -1:
        route2 = fromOne[v2] + fromV1[v2] + fromV[v1]

minRoute = -1
if route1 != -1 and route2 != -1:
    minRoute = min(route1, route2)
elif route1 != -1:
    minRoute = route1
elif route2 != -1:
    minRoute = route2

print(minRoute)
