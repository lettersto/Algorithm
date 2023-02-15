# 백준 2167 2차원 배열의 합

import sys
input = sys.stdin.readline

R, C = map(int, input().split())
arr = [list(map(int, input().split())) for _ in range(R)]

sumArr = [[0] * (C + 1) for _ in range(R + 1)]

for row in range(1, R + 1):
    for col in range(1, C + 1):
        sumArr[row][col] = sumArr[row][col - 1] + sumArr[row - 1][col] - sumArr[row - 1][col - 1] + arr[row - 1][col - 1]

K = int(input())
for _ in range(K):
    i, j, x, y = map(int, input().split())
    print(sumArr[x][y] - sumArr[x][j - 1] - sumArr[i - 1][y] + sumArr[i - 1][j - 1])
