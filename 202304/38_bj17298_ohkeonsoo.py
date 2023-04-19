# 백준 17298 오큰수

N = int(input())
nums = list(map(int, input().split()))
stack = []
ans = [-1] * N

for i in range(N):
    while stack and nums[stack[-1]] < nums[i]:
        top = stack.pop()
        ans[top] = nums[i]
    stack.append(i)

print(*ans)
