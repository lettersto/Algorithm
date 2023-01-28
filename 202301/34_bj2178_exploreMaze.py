# 백준 2178 미로 탐색

R, C = map(int, input().split())
MAP = [list(input()) for _ in range(R)]

visit = [[0] * C for _ in range(R)]

Q = [(0, 0)]
visit[0][0] = 1

while Q:
    curR, curC = Q.pop(0)

    for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):
        newR, newC = curR + dr, curC + dc

        if newR < 0 or newR >= R or newC < 0 or newC >= C \
                or visit[newR][newC] or MAP[newR][newC] == '0':
            continue

        Q.append((newR, newC))
        visit[newR][newC] = visit[curR][curC] + 1


print(visit[R - 1][C - 1])
