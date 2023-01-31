# 백준 10026 적록색약

N = int(input())
grid = [list(input()) for _ in range(N)]

visit1 = [[False] * N for _ in range(N)]
visit2 = [[False] * N for _ in range(N)]

cnt1 = 0
cnt2 = 0


def bfs(row, col, visit, blind):
    global grid

    Q = [(row, col)]
    visit[row][col] = True
    color = {grid[row][col]}

    if blind and grid[row][col] in ('R', 'G'):
        color = {'R', 'G'}

    while Q:
        curR, curC = Q.pop()

        for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):
            newR, newC = curR + dr, curC + dc
            if 0 <= newR < N and 0 <= newC < N and \
                not visit[newR][newC] and grid[newR][newC] in color:
                Q.append((newR, newC))
                visit[newR][newC] = True
            


for row in range(N):
    for col in range(N):
        if not visit1[row][col]:
            cnt1 += 1
            bfs(row, col, visit1, False)
        if not visit2[row][col]:
            cnt2 += 1
            bfs(row, col, visit2, True)

print(cnt1, cnt2)
