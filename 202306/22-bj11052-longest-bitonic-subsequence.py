# 가장 긴 바이토닉 부분 수열

# LIS를 두 번 구해서 한 문제
# LIS를 다시 공부...

N = int(input())
arr = list(map(int, input().split()))

acc = [1] * N
reversedAcc = [1] * N

for i in range(N):
    for j in range(i):
        if arr[j] < arr[i]:
            acc[i] = max(acc[i], acc[j] + 1)

for i in range(N - 2, -1, -1):
    for j in range(i, N):
        if arr[i] > arr[j]:
            reversedAcc[i] = max(reversedAcc[i], reversedAcc[j] + 1)

maxLength = 1
for i in range(N):
    maxLength = max(maxLength, acc[i] + reversedAcc[i] - 1)

print(maxLength)
