# 백준 11660 구간 합 구하기 5
# import sys
# input = sys.stdin.readline

# N, M = map(int, input().split())
# table = [list(map(int, input().split())) for _ in range(N)]
# acc = [[0] * (N + 1) for _ in range(N + 1)]

# for row in range(N):
#     for col in range(N):
#         acc[row + 1][col + 1] = acc[row + 1][col] + table[row][col]

# for row in range(N):
#     for col in range(N):
#         acc[row + 1][col + 1] += acc[row][col + 1]

# for _ in range(M):
#     x1, y1, x2, y2 = map(int, input().split())
#     print(acc[x2][y2] - acc[x1 - 1][y2] - acc[x2][y1 - 1] + acc[x1 - 1][y1 - 1])

import sys
input = sys.stdin.readline

N, M = map(int, input().split())
table = [list(map(int, input().split())) for _ in range(N)]
acc = [[0] * (N + 1) for _ in range(N + 1)]

for row in range(1, N + 1):
    for col in range(1, N + 1):
        acc[row][col] = acc[row - 1][col] + acc[row][col - 1] \
            - acc[row - 1][col - 1] + table[row - 1][col - 1]

for _ in range(M):
    x1, y1, x2, y2 = map(int, input().split())
    print(acc[x2][y2] - acc[x1 - 1][y2] - acc[x2][y1 - 1] + acc[x1 - 1][y1 - 1])
