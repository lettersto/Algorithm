# 백준 14938 서강그라운드

# V가 100이내이니 플로이드 워셜이 나음

import sys
input = sys.stdin.readline

INF = 10 ** 5

V, M, E = map(int, input().split())
itemCnts = list(map(int, input().split()))
adj = [[INF] * V for _ in range(V)]

for v in range(V):
    adj[v][v] = 0

for _ in range(E):
    v1, v2, l = map(int, input().split())
    adj[v1 - 1][v2 - 1] = adj[v2 - 1][v1 - 1] = l

for mid in range(V):
    for start in range(V):
        for end in range(V):
            adj[start][end] = min(adj[start][end], adj[start][mid] + adj[mid][end])

maxItem = 0
for v1 in range(V):
    itemCntPerRegion = 0
    for v2 in range(V):
        if adj[v1][v2] <= M:
            itemCntPerRegion += itemCnts[v2]
    maxItem = max(maxItem, itemCntPerRegion)

print(maxItem)
