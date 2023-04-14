# 백준 11404 플로이드

N = int(input())
M = int(input())
costs = [[10 ** 10] * N for _ in range(N)]

for _ in range(M):
    a, b, c = map(int, input().split())
    costs[a - 1][b - 1] = min(c, costs[a - 1][b - 1])

for i in range(N):
    costs[i][i] = 0

for mid in range(N):
    for start in range(N):
        for end in range(N):
            costs[start][end] = min(costs[start][end], costs[start][mid] + costs[mid][end])

for start in range(N):
    for end in range(N):
        if costs[start][end] == 10 ** 10:
            costs[start][end] = 0

for row in costs:
    print(*row)
