# 백준 2606 바이러스

# recursive dfs로는 정말 오랜만에 풀어본다.
# 항상 stack, queue로만 풀다보니 어색하다.

import sys
input = sys.stdin.readline

V = int(input())
E = int(input())

adj = [[] for _ in range(V + 1)]

for _ in range(E):
    v1, v2 = map(int, input().split())
    adj[v1].append(v2)
    adj[v2].append(v1)

visit = [False] * (V + 1)
visit[1] = True
ans = 0


def dfs(curV):
    global ans
    ans += 1

    for neiV in adj[curV]:
        if visit[neiV]:
            continue
        visit[neiV] = True
        dfs(neiV)


dfs(1)
print(ans - 1)
