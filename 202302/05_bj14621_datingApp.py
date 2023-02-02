# 백준 14621 나만 안되는 연애

# MST 문제
# 문제가 조금 불친절한 것 같다.
# M은 M끼리 W는 W끼리 연결하면 안 된다라는 내용이 추가로 필요해 보인다.

import sys
from heapq import heappop, heappush
input = sys.stdin.readline

V, E = map(int, input().rstrip().split())
unis = input().rstrip().split()

adj = [[] for _ in range(V + 1)]
for _ in range(E):
    u1, u2, w = map(int, input().rstrip().split())
    if unis[u1 - 1] == unis[u2 - 1]: continue
    adj[u1].append((w, u2))
    adj[u2].append((w, u1))


def prim():
    Q = [(0, 1)]
    visit = set()

    ans = 0
    while len(visit) < V and Q:
        curCost, curV = heappop(Q)
        if curV in visit: continue
        visit.add(curV)
        ans += curCost

        for neiCost, neiV in adj[curV]:
            if neiV in visit: continue
            heappush(Q, (neiCost, neiV))

    return ans if len(visit) == V else -1


print(prim())
