# 백준 9655 돌게임

N = int(input())

Q = [(1, 0)]
visit = [False] * (N + 1)
visit[1] = True

if N >= 3:
    Q.append((3, 0))
    visit[3] = True 

while Q:
    curV, sc = Q.pop(0)
    if curV == N:
        print('CY' if sc else 'SK')
        break

    for d in (1, 3):
        newV = curV + d
        if newV > N or visit[newV]: continue
        Q.append((newV, (sc + 1) % 2))
        visit[newV] = True
