# 백준 10815 숫자 카드

N = int(input())
cards = list(map(int, input().split()))
M = int(input())
queries = list(map(int, input().split()))

cards.sort()


def binarySearch(x):
    left, right = 0, N - 1

    while left <= right:
        mid = (left + right) // 2
        if cards[mid] == x:
            return 1
        elif cards[mid] > x:
            right = mid - 1
        else:
            left = mid + 1
    return 0


ans = [binarySearch(q) for q in queries]
print(*ans)
