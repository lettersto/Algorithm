# 백준 16401 과자 나눠주기

# 다시 풀어보는 이분 탐색
M, N = map(int, input().split())
cookies = list(map(int, input().split()))


def check(length):
    cnt = 0
    for c in cookies:
        cnt += c // length

    return cnt >= M


def getMaxCookieLength():
    left, right = 1, 1_000_000_000

    res = 0
    while left <= right:
        mid = (left + right) // 2

        if check(mid):
            res = max(res, mid)
            left = mid + 1
        else:
            right = mid - 1

    return res


print(getMaxCookieLength())
