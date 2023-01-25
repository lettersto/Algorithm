# 백준 5014 스타트링크

F, S, G, U, D = map(int, input().split())


def bfs():
    Q = [(S, 0)]
    visit = [False for _ in range(F + 1)]
    visit[S] = True

    while Q:
        curF, cnt = Q.pop(0)
        if curF == G:
            return cnt

        for d in (U, -D):
            newF = curF + d
            if newF <= 0 or newF > F or visit[newF]:
                continue
            Q.append((newF, cnt + 1))
            visit[newF] = True

    return "use the stairs"


print(bfs())
