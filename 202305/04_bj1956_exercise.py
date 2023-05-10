# 백준 1956 운동

V, E = map(int, input().split())
adj = [[1e10] * V for _ in range(V)]

for _ in range(E):
    v1, v2, w = map(int, input().split())
    adj[v1 - 1][v2 - 1] = w

sumV = 1e10
for mid in range(V):
    for start in range(V):
        for end in range(V):
            adj[start][end] = min(adj[start][end], adj[start][mid] + adj[mid][end])

# adj[i][i]를 미리 0으로 놔두지 않는다면
# 다른 vertex를 거쳐서 자기자신으로 돌아온 비용을 구할 수 있음
sumV = 1e10
for i in range(V):
    sumV = min(sumV, adj[i][i])

print(sumV if sumV != 1e10 else -1)
