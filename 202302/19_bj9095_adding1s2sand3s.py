# 백준 9095 1, 2, 3 더하기

dp = dict()
dp[1] = 1
dp[2] = 2  # (1, 1), (2)
dp[3] = 4  # (1, 1, 1), (1, 2), (2, 1), (3)


def oneTwoThree(num):
    if num in dp:
        return dp[num]
    
    dp[num] = oneTwoThree(num - 1) + oneTwoThree(num - 2) + oneTwoThree(num - 3)
    return dp[num]


T = int(input())
for _ in range(T):
    N = int(input())
    print(oneTwoThree(N))
