# 백준 2573 빙산

# 무식하게 구현했는데 통과는 했다.
import sys
from copy import deepcopy
input = sys.stdin.readline

R, C = map(int, input().rstrip().split())
MAP = [list(map(int, input().rstrip().split())) for _ in range(R)]

splitTime = 0
split = False
iceberg = set()
D = ((1, 0), (-1, 0), (0, 1), (0, -1))


def isSplit():
    cnt = 0
    visit = [[False] * C for _ in range(R)]
    for row in range(R):
        for col in range(C):
            if MAP[row][col] and not visit[row][col]:
                cnt += 1

                ST = [(row, col)]
                visit[row][col] = True

                while ST:
                    curR, curC = ST.pop()

                    for dr, dc in D:
                        newR, newC = curR + dr, curC + dc
                        if newR < 0 or newR >= R or newC < 0 or newC >= C or not MAP[newR][newC] or visit[newR][newC]:
                            continue
                        ST.append((newR, newC))
                        visit[newR][newC] = True

    if cnt > 1: return True
    return False


def melting():
    global MAP,  iceberg, splitTime, split

    while iceberg:
        splitTime += 1

        newMAP = deepcopy(MAP)
        newIceberg = set()

        for curR, curC in iceberg:
            sea = 0
            for dr, dc in D:
                newR, newC = curR + dr, curC + dc
                if newR < 0 or newR >= R or newC < 0 or newC >= C or MAP[newR][newC]:
                    continue
                sea += 1

            meltedIceberg = MAP[curR][curC] - sea

            if meltedIceberg > 0:
                newMAP[curR][curC] = meltedIceberg
                newIceberg.add((curR, curC))
            else:
                newMAP[curR][curC] = 0

        # 3. 맵 갱신
        MAP = newMAP
        iceberg = newIceberg

        # 4. 빙산이 분리되었는지 체크
        if isSplit():
            split = True
            break


# 1. 빙산 위치 파악하기
for row in range(R):
    for col in range(C):
        if MAP[row][col]:
            iceberg.add((row, col))

# 2. 빙산 녹이기
if not isSplit():
    melting()
    print(splitTime if split else 0)
else:
    print(splitTime)
