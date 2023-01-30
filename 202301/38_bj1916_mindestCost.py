import sys
from heapq import heappop, heappush
input = sys.stdin.readline

N = int(input().rstrip())
M = int(input().rstrip())
adj = [[] for _ in range(N + 1)]

for _ in range(M):
    v1, v2, w = map(int, input().rstrip().split())
    adj[v1].append((w, v2))

S, G = map(int, input().rstrip().split())


def dijkstra():
    Q = [(0, S)]
    visit = set()

    while Q:
        curCost, curV = heappop(Q)
        if curV in visit: continue
        if curV == G:
            return curCost
        visit.add(curV)

        for neiCost, neiV in adj[curV]:
            if neiV in visit: continue
            heappush(Q, (curCost + neiCost, neiV))
    
print(dijkstra())
