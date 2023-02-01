import sys
from heapq import heappop, heappush
input = sys.stdin.readline

N = int(input().rstrip())
adj = [list(map(int, input().rstrip().split())) for _ in range(N)]

def prim():
    Q = [(0, 0)]
    visit = set()

    ans = 0
    while len(visit) < N:
        curCost, curPlanet = heappop(Q)
        if curPlanet in visit: continue
        visit.add(curPlanet)
        ans += curCost

        for neiPlanet in range(N):
            if neiPlanet == curPlanet or neiPlanet in visit: continue
            heappush(Q, (adj[curPlanet][neiPlanet], neiPlanet))

    return ans

print(prim())
