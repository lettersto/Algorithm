# 백준 10472 십자뒤집기

# 예전에 풀어봤던 문제에 bitmasking을 더해봤다.
# 예전에는 리스트를 통째로 큐에 넣고 다녔나보다.
pos = [[0, 1, 3], [1, 0, 2, 4], [2, 1, 5], [3, 0, 4, 6], [4, 1, 3, 5, 7], [5, 2, 4, 8], [6, 3, 7], [7, 4, 6, 8],
       [8, 5, 7]]


def bfs(target):
    Q = [(0, 0, -1)]
    visit = {0}

    while Q:
        curBoard, curCount, preV = Q.pop(0)
        if curBoard == target:
            return curCount

        for neiV in range(9):
            if neiV == preV:
                continue
            newBoard = curBoard
            for p in pos[neiV]:
                newBoard ^= (1 << p)
            if newBoard not in visit:
                Q.append((newBoard, curCount + 1, neiV))
                visit.add(newBoard)


TC = int(input())

for _ in range(TC):
    target = '0b'
    for _ in range(3):
        for i in input():
            target += '1' if i == '*' else '0'

    target = int(target, 2)

    print(bfs(target))
