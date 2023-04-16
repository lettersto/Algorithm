# 백준 2110 공유기 설치

import sys
input = sys.stdin.readline

N, C = map(int, input().split())
houses = []
for _ in range(N):
    houses.append(int(input()))

houses.sort()


def check(val):
    cnt = 1
    i, j = 0, 1

    while i < j < len(houses):
        if houses[j] - houses[i] >= val:
            cnt += 1
            i = j
            j = i + 1
        else:
            j += 1
    return cnt >= C


def binarySearch():
    left, right = 0, 1_000_000_000  # houses[-1] - houses[0]으로 바꾸면 더 좋다.
    ans = 0

    while left <= right:
        mid = (left + right) // 2
        if check(mid):
            ans = max(ans, mid)
            left = mid + 1
        else:
            right = mid - 1

    return ans


print(binarySearch())
