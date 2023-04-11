# 백준 1932 정수 삼각형
import sys
input = sys.stdin.readline

N = int(input())
triangle = [list(map(int, input().split())) for _ in range(N)]

res = triangle[0]

for i in range(1, N):
    newRes = []

    rowLen = len(triangle[i])
    for j in range(rowLen):
        if j == 0:
            newRes.append(res[0] + triangle[i][0])
        elif j == rowLen - 1:
            newRes.append(res[j - 1] + triangle[i][j])
        else:
            newRes.append(max(res[j - 1], res[j]) + triangle[i][j])

    res = newRes

print(max(res))
