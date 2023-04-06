# 백준 1459 걷기
X, Y, W, S = map(int, input().split())


def getShortestTime(X: int, Y: int, W: int, S: int) -> int:
    leftX = X
    leftY = Y
    minD = 0

    if leftX == leftY == 0:
        return minD

    # 일단 가로나 세로의 좌표가 같아지게 만들어 줄 것
    # 두 좌표 중 적은 값까지 이동
    # / 로 가거나 _ㅣ 로 가거나
    minXY = min(leftX, leftY)

    minD = min(W * 2, S) * minXY

    leftX -= minXY
    leftY -= minXY

    if leftX == leftY == 0:
        return minD

    # 이동한 후에는 일직선 방향만 남음
    # 이때 갈 수 있는 방법 중 최단 거리 가능성이 있는 것은
    # min(대각선 * 2, 직선 * 2)
    # /\로 가거나 --로 가거나 
    minXY = max(leftX, leftY)

    # 이때 거리가 홀수만큼 남으면,
    # 짝수 (/\, --) + 직선(-)으로 한 번 걷기로
    # 다시 짝수만큼 이동하는 문제로 만들어 준다.
    if minXY % 2 == 1:
        minXY -= 1
        minD += W

    minD += min(W * 2, S * 2) * minXY // 2

    return minD


print(getShortestTime(X, Y, W, S))
