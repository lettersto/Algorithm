# 백준 16918 봄버맨

R, C, N = map(int, input().split())
MAP = [list(input()) for _ in range(R)]

bombs = set()
oldBomb = set()
newBomb = set()

for row in range(R):
    for col in range(C):
        bombs.add((row, col))
        if MAP[row][col] == 'O':
            oldBomb.add((row, col))


def bomb(row, col):
    MAP[row][col] = '.'
    for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):
        newR, newC = row + dr, col + dc
        if newR < 0 or newR >= R or newC < 0 or newC >= C:
            continue
        MAP[newR][newC] = '.'
        if (newR, newC) in newBomb:
            newBomb.remove((newR, newC))


t = 1
while t <= N:
    if t != 1:
        if t % 2 == 0:
            newBomb = bombs.difference(oldBomb)
            for row, col in newBomb:
                MAP[row][col] = 'O'
        if t % 2 == 1:
            for row, col in oldBomb:
                bomb(row, col)
            oldBomb = newBomb
    t += 1

ans = ''
for m in MAP:
    ans += ''.join(m) + '\n'

print(ans.strip())
