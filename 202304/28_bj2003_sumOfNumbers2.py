# 백준 2003 수들의 합2

# 수가 정렬을 할 수가 없기도 하고
# 자연수만 있기 때문에 합도 당연히 0 이하로 내려갈 수 없다.
# 처음에 i < j로 했는데 i <= j로 해야 통과하는 케이스가 있다.

N, M = map(int, input().split())
arr = list(map(int, input().split()))
prefixSum = [0] * (len(arr) + 1)

for i in range(1, len(arr) + 1):
    prefixSum[i] = prefixSum[i - 1] + arr[i - 1]

i, j = 0, 1
cnt = 0

while i <= j < len(prefixSum):
    val = prefixSum[j] - prefixSum[i]
    if val == M:
        j += 1
        cnt += 1
    if val < M:
        j += 1
    if val > M:
        i += 1

print(cnt)
