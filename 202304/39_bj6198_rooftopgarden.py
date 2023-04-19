# 백준 6198 옥상 정원 꾸미기

import sys
input = sys.stdin.readline

N = int(input())
heights = [int(input()) for _ in range(N)]
ans = 0
stack = []

for i in range(N):
    while stack and heights[stack[-1]] <= heights[i]:
        top = stack.pop()
        ans += i - top - 1
    stack.append(i)

for i in stack:
    ans += N - i - 1

print(ans)
