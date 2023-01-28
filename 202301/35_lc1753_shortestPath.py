# 백준 1753 최단경로

import sys
from heapq import heappop, heappush
input = sys.stdin.readline

V, E = map(int, input().rstrip().split())
K = int(input().rstrip())

adj = [[] for _ in range(V + 1)]

for _ in range(E):
    v1, v2, w = map(int, input().rstrip().split())
    adj[v1].append((w, v2))


def dijkstra():
    Q = [(0, K)]
    visit = set()
    res = ['INF'] * V

    while Q:
        curCost, curV = heappop(Q)
        if curV in visit: continue
        visit.add(curV)
        res[curV - 1] = curCost

        for neiCost, neiV in adj[curV]:
            if neiV in visit: continue
            heappush(Q, (curCost + neiCost, neiV))

    return res


print(*dijkstra(), sep='\n')
