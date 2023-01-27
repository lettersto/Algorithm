# 백준 2667 단지번호 붙이기

import sys
input = sys.stdin.readline

N = int(input().rstrip())
MAP = [list(input().rstrip()) for _ in range(N)]

total = 0
cnt = []

for row in range(N):
    for col in range(N):
        if MAP[row][col] == '0':
            continue

        total += 1
        each = 0

        ST = [(row, col)]
        MAP[row][col] = '0'

        while ST:
            curR, curC = ST.pop()
            each += 1

            for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                newR, newC = curR + dr, curC + dc

                if newR < 0 or newR >= N or newC < 0 or newC >= N or MAP[newR][newC] == '0':
                    continue

                ST.append((newR, newC))
                MAP[newR][newC] = '0'

        cnt.append(each)

cnt.sort()
print(total)
for i in cnt:
    print(i)
