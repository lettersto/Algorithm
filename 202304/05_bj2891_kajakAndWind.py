# 백준 2891 카약과 강풍

# 자기 자신의 카약이 부서진 것을 해결
# 이후 앞팀부터 돌면서, 왼쪽 사람의 카약을 우선으로 가져온다.

N, S, R = map(int, input().split())
crashed = list(map(lambda x: int(x) - 1, input().split()))
extra = set(map(lambda x: int(x) - 1, input().split()))

teams = [1] * N

for i in crashed:
    teams[i] = 0

for i in range(N):
    if i in extra and teams[i] == 0:
        extra.remove(i)
        teams[i] = 1

for i in range(N):
    if teams[i] != 0:
        continue

    if (i - 1) in extra:
        extra.remove(i - 1)
        teams[i] = 1

    elif (i + 1) in extra:
        extra.remove(i + 1)
        teams[i] = 1

print(N - sum(teams))
