# 백준 4963 섬의 개수

import sys
input = sys.stdin.readline

while True:
    C, R = map(int, input().rstrip().split())
    if C == R == 0: break
    MAP = [input().rstrip().split() for _ in range(R)]

    ans = 0

    for row in range(R):
        for col in range(C):
            if MAP[row][col] == '1':
                # bfs
                ans += 1
                Q = [(row, col)]
                MAP[row][col] == '0'

                while Q:
                    curR, curC = Q.pop(0)

                    for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1), (1, 1), (-1, -1), (1, -1), (-1, 1)):
                        newR, newC = curR + dr, curC + dc
                        if 0 <= newR < R and 0 <= newC < C and MAP[newR][newC] == '1':
                            Q.append((newR, newC))
                            MAP[newR][newC] = '0'

    print(ans)
