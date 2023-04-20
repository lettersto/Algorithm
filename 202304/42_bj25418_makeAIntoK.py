# 백준 25418 정수 a를 k로 만들기

from collections import deque

A, K = map(int, input().split())
visit = [0] * 1_000_001
Q = deque([A])

while Q:
    curV = Q.popleft()
    if curV == K:
        print(visit[curV])
        break

    for neiV in (curV * 2, curV + 1):
        if 1 <= neiV <= 1_000_000 and not visit[neiV]:
            Q.append(neiV)
            visit[neiV] = visit[curV] + 1
