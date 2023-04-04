# 백준 7568 덩치

# 처음에 sort로 풀으면 될 줄 알고, sort에 집착 했는데 그게 오래 걸린 원인이 되었다.
# 해결법이 이렇게 간단하니 마음이 아프다.
# 괜히 어렵게 보던 문제들이 많지 않았을까..

N = int(input())
people = [list(map(int, input().split())) for _ in range(N)]
ranking = []

for w1, h1 in people:
    rank = 1
    for w2, h2 in people:
        if w1 < w2 and h1 < h2:
            rank += 1
    ranking.append(rank)

print(*ranking)
