# 백준 1806 부분합

# 부분합 + 투포인터
N, S = map(int, input().split())
lst = list(map(int, input().split()))
arr = [0] * (N + 1)

for i in range(1, N + 1):
    arr[i] = arr[i - 1] + lst[i - 1]

i, j = 0, 1
ans = 100_001
while i <= N and j <= N and i < j:
    if arr[j] - arr[i] < S:
        j += 1
    else:
        ans = min(ans, j - i)
        i += 1

print(ans if ans != 100_001 else 0)
