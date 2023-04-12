# 백준 12018 Yeonsei TOTO
# 쉬운 greedy 문제

N, M = map(int, input().split())
myPoints = []

for _ in range(N):
    P, L = map(int, input().split())
    points = list(map(int, input().split()))

    if L > len(points):
        myPoints.append(1)
    else:
        points.sort(reverse=True)
        myPoints.append(points[L - 1])

myPoints.sort()

cnt = 0
pointSum = 0

for p in myPoints:
    pointSum += p
    if pointSum > M:
        break
    cnt += 1

print(cnt)
