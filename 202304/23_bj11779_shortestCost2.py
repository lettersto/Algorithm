# 백준 11779 최소비용 구하기 2

# 경로를 저장하는 과정에서 단순한 실수를 해서 오래 걸렸던 문제
# string 숫자를 123으로 seperator 없이 붙여버리니,
# 이게 원래 1 > 2 > 3인지 12 > 3인지, 123인지 알 수가 없어졌다.

import sys
from heapq import heappop, heappush
input = sys.stdin.readline

N = int(input().rstrip())
M = int(input().rstrip())
adj = [[] for _ in range(N + 1)]

for _ in range(M):
    v1, v2, w = map(int, input().rstrip().split())
    adj[v1].append((w, v2))

S, E = map(int, input().rstrip().split())


def dijkstra():
    Q = [(0, S, f'{S}')]
    visit = [False] * (N + 1)

    while Q:
        curCost, curV, curRoute = heappop(Q)
        if visit[curV]:
            continue
        visit[curV] = True
        if curV == E:
            return curCost, curRoute

        for neiCost, neiV in adj[curV]:
            if not visit[neiV]:
                heappush(Q, (curCost + neiCost, neiV, f'{curRoute}-{neiV}'))


cost, route = dijkstra()
route = route.split('-')

print(cost)
print(len(route))
print(' '.join(route))
