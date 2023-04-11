# 백준 9251 LCS

str1 = input()
str2 = input()

dp = [[0] * (len(str1) + 1) for _ in range(len(str2) + 1)]

for i in range(len(str2) - 1, -1, -1):
    for j in range(len(str1) - 1, -1, -1):
        if str1[j] == str2[i]:
            dp[i][j] = dp[i + 1][j + 1] + 1
        else:
            dp[i][j] = max(dp[i + 1][j], dp[i][j + 1])

print(dp[0][0])
