# 백준 1450 냅색문제

# 이름은 냅색문제라고 되어있지만 DP가 아닌 문제
# meet in the middle

# 보통 2 ** n이면서 n이 40보다 작을 때 효율적으로 풀고자 할 때 사용
# 이때 subset sum과 같이 boolean처럼 포함 되냐, 안 되냐로 2가지 갈래가 갈리는 문제인 경우가 많음
# 길이가 n인 array에서 subset sum을 구하면 2 ** n이지만

# 각각 n/2 길이인 array로 잘라 subset sum을 만들면 2 ** (2/n) * 2 => 경우의 수 자체를 엄청 줄인다.
# 그리고 두 array 간 조합을 만들어내는데
# 한 array는 linear search를 하면서, 다른 array는 조건에 맞는 합을 binary search로 찾음
# o(n), o(logn)

N, C = map(int, input().split())
weights = list(map(int, input().split()))

halfIdx = N // 2
leftArr = weights[:halfIdx]
rightArr = weights[halfIdx:]
leftSums = []
rightSums = []


def getSubsetSum(arr, sums, curS=0, idx=0):
    if curS > C: return
    if idx == len(arr):
        sums.append(curS)
        return

    getSubsetSum(arr, sums, curS, idx + 1)
    getSubsetSum(arr, sums, curS + arr[idx], idx + 1)


def binarySearch(arr, key):
    left = 0
    right = len(arr) - 1

    res = 0
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] <= key:
            res = max(res, mid)
            left = mid + 1
        else:
            right = mid - 1

    return res


getSubsetSum(leftArr, leftSums)
getSubsetSum(rightArr, rightSums)

rightSums.sort()
cnt = 0
for num in leftSums:
    diff = C - num
    i = binarySearch(rightSums, diff)
    cnt += i + 1

print(cnt)
