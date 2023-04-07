# 백준 2230 수 고르기

import sys
input = sys.stdin.readline

N, M = map(int, input().split())
arr = [int(input()) for _ in range(N)]

arr.sort()


def twoPointers():
    left = right = 0
    ans = arr[-1] - arr[0]  
    # 최댓값을 sys.maxsize 등으로 할 필요가 없다

    while left <= right < N:
        diff = arr[right] - arr[left]

        if diff < M:
            right += 1
        elif diff > M:
            ans = min(ans, diff)
            left += 1
        else:
            ans = M
            break

    return ans


print(twoPointers())
