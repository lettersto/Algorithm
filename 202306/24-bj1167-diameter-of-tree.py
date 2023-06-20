import sys
input = sys.stdin.readline

V = int(input())
adj = [[] for _ in range(V + 1)]

for _ in range(V):
    arr = list(map(int, input().split()))
    v = arr[0]
    for i in range(1, len(arr) - 1, 2):
        adj[v].append((arr[i], arr[i + 1]))


def bfs(start: int) -> tuple[int, int]:
    Q = [(start, 0)]
    visit = [False] * (V + 1)
    maxW = maxV = 0

    while Q:
        curV, curW = Q.pop()
        if maxW < curW:
            maxW = curW
            maxV = curV

        for neiV, neiW in adj[curV]:
            if visit[neiV]: continue
            Q.append((neiV, curW + neiW))
            visit[curV] = True

    return maxV, maxW


longestV, longestW = bfs(1)
longestV2, longestW2 = bfs(longestV)

print(longestW2)
