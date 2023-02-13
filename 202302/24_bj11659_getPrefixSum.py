# 백준 11659 구간 합 구하기 4

import sys
input = sys.stdin.readline

N, M = map(int, input().split())
nums = list(map(int, input().split()))

acc = [0] * (N + 1)
for i in range(N):
    acc[i + 1] = acc[i] + nums[i]

for _ in range(M):
    i, j = map(int, input().split())
    print(acc[j] - acc[i - 1])
