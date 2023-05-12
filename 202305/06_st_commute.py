# 소프티어 출퇴근길

# dfs 응용 문제

import sys
input = sys.stdin.readline

V, E = map(int, input().split())
adj = [[] for _ in range(V + 1)]
reversedAdj = [[] for _ in range(V + 1)]
for _ in range(E):
    v1, v2 = map(int, input().split())
    adj[v1].append(v2)
    reversedAdj[v2].append(v1)
S, T = map(int, input().split())


def dfs(start, block, reverse = False):
    stack = [start]
    visit = [False] * (V + 1)
    arr = reversedAdj if reverse else adj

    while stack:
        curV = stack.pop()
        visit[curV] = True

        for neiV in arr[curV]:
            if visit[neiV] or neiV == block:
                continue
            stack.append(neiV)
    
    return visit


startToMid = dfs(S, T)
midToEnd = dfs(T, 0, reverse = True)
endToMid = dfs(T, S)
midToStart = dfs(S, 0, reverse = True)

ans = 0
for mid in range(1, V + 1):
    if mid == S or mid == T: continue
    if startToMid[mid] and midToEnd[mid] and endToMid[mid] and midToStart[mid]:
        ans += 1

print(ans)
