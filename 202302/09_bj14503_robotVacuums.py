# 백준 14503 로봇 청소기

# 지문이 조금 헷갈려서 내가 보기 위해 다시 작성한다.

# 1. 청소기는 현재 서 있는 위치를 청소한다.
# 2. 청소 후, 청소기가 현재 바라보고 있는 정면을 기준으로 왼쪽으로(반시계) 90도씩 돌며 4면을 체크한다.
#    2 - 1. 만약 돌면서 벽이 아닌데 청소도 안 한 구역이 있다면, 
#           도는 것을 멈추고 그 방향으로 직진한다.
#           + 다시 1번부터 시작한다.
#    2 - 2. 4면을 다 돌았는데도 청소할 공간이 없다면,
#           + 바라보고 있는 방향을 유지한 채로 한 칸 후진을 시도한다.
#           2 - 2 - 1. 후진을 시도했을 때, 시도하는 위치에 벽이 없다면 후진한다.
#                      + 다시 2번부터 반복한다. 
#           2 - 2 - 2. 후진을 시도했을 때, 뒤쪽 방향이 벽이라 후진이 불가능하다면,
#                      청소기는 작동을 중지한다.

R, C = map(int, input().split())
sR, sC, sD = map(int, input().split())
MAP = [list(map(int, input().split())) for _ in range(R)]
D = {
    0: [(0, -1, 3), (1, 0, 2), (0, 1, 1), (-1, 0, 0)],  # 북 -> 서, 남, 동, 북
    1: [(-1, 0, 0), (0, -1, 3), (1, 0, 2), (0, 1, 1)],  # 동 -> 북, 서, 남, 동
    2: [(0, 1, 1), (-1, 0, 0), (0, -1, 3), (1, 0, 2)],  # 남 -> 동, 북, 서, 남
    3: [(1, 0, 2), (0, 1, 1), (-1, 0, 0), (0, -1, 3)],  # 서 -> 남, 동, 북, 서
}
back = {
    0: (1, 0),
    1: (0, -1),
    2: (-1, 0),
    3: (0, 1),
}

def robotVaccums():
    Q = [(sR, sC, sD)]
    visit = [[False] * C for _ in range(R)]
    visit[sR][sC] = True
    
    cnt = 0 if MAP[sR][sC] else 1

    while Q:
        curR, curC, curD = Q.pop(0)

        goBack = True
        for dr, dc, nD in D[curD]:
            newR, newC = curR + dr, curC + dc
            if newR < 0 or newR >= R or newC < 0 or newC >= C \
                or visit[newR][newC] or MAP[newR][newC]:
                continue
            Q.append((newR, newC, nD))
            visit[newR][newC] = True
            goBack = False
            cnt += 1
            break

        if goBack:
            newR, newC = curR + back[curD][0], curC + back[curD][1]
            if newR < 0 or newR >= R or newC < 0 or newC >= C \
                or MAP[newR][newC]:
                return cnt
            Q.append((newR, newC, curD))
            visit[newR][newC] = True
            
    return cnt


print(robotVaccums())
