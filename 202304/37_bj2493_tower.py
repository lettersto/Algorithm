# 백준 2493 탑

# 역시 여러 번 풀어봐야 할 문제 같다.

N = int(input())
towers = list(map(int, input().split()))
ans = [0] * len(towers)
stack = []

# 스택에 넣을 때가 아니라,
# 스택에서 나올 때 조건을 충족해야 나올 수 있도록 해야하는 경우도 있다.
# 계속 넣을 때 이렇게 해야하지 않을까 생각했던 게 사고를 막았던 것 같다.
for i in range(len(towers) - 1, -1, -1):
    while stack and towers[stack[-1]] < towers[i]:
        towerIdx = stack.pop()
        ans[towerIdx] = i + 1
    stack.append(i)

print(*ans)
