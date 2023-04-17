# 백준 1874 스택 수열

import sys
input = sys.stdin.readline

N = int(input())
nums = [int(input()) for _ in range(N)]

nextNum = 2
stack = [1]
ans = ["+"]

for num in nums:
    if nextNum > num and (not stack or stack[0] > num or stack[-1] < num):
        ans = ["NO"]
        break

    while not stack or stack[-1] < num:
        stack.append(nextNum)
        nextNum += 1
        ans.append("+")

    while stack and stack[-1] >= num:
        stack.pop()
        ans.append("-")

if stack:
    ans = ["NO"]

for a in ans:
    print(a)
