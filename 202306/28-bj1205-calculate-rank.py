# 백준 1205 등수 구하기 

N, newScore, maxRank = map(int, input().split())
scores = []
if N != 0:
    scores = list(map(int, input().split())) + [-1]


def binarySearch(arr, key):
    left = 0
    right = len(arr) - 1

    ans = len(arr)
    while left <= right:
        mid = (left + right) // 2
        if key > arr[mid]:
            ans = min(ans, mid)
            right = mid - 1
        else:
            left = mid + 1

    return ans


rankIdx = binarySearch(scores, newScore)
if rankIdx >= maxRank:
    print(-1)
else:
    rank = 1
    curScore = scores[0] if scores else -1
    for i in range(0, rankIdx):
        if scores[i] != curScore:
            curScore = scores[i]
            rank = i + 1
    if curScore != newScore:
        rank = rankIdx + 1
    print(rank)
