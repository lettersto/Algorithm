# 백준 10431 줄세우기

import sys
from bisect import bisect_left
input = sys.stdin.readline

TC = int(input())

for _ in range(TC):
    tc, *arr = map(int, input().split())

    tmp = []
    ans = 0
    for i in range(20):
        pos = bisect_left(tmp, arr[i])
        ans += len(tmp) - pos
        tmp.insert(pos, arr[i])

    print(tc, ans)


# binary search 직접 구현한 버전
import sys
input = sys.stdin.readline


def binarySerach(arr, val):
    left, right = 0, len(arr) - 1

    res = len(arr)
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] >= val:
            right -= 1
            res = min(res, mid)
        else:
            left += 1

    return res


TC = int(input())

for _ in range(TC):
    tc, *heights = map(int, input().split())

    tmp = []
    ans = 0
    for i in range(20):
        pos = binarySerach(tmp, heights[i])
        ans += len(tmp) - pos
        tmp.insert(pos, heights[i])

    print(tc, ans)
