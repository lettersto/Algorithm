# 백준 16953 A -> B

from collections import deque

A, B = map(int, input().split())


def solution():
    visit = dict()  # 10 ** 9까지 가능하기 때문에 list로 만들면 그것만으로 시간 초과 or 메모리 초과
    Q = deque([A])
    visit[A] = 0

    while Q:
        curV = Q.popleft()
        if curV == B:
            return visit[curV] + 1

        for neiV in (curV * 10 + 1, curV * 2):
            if 1 <= neiV <= B and neiV not in visit:
                Q.append(neiV)
                visit[neiV] = visit[curV] + 1

    return -1


print(solution())
