# DP 처음부터 시작
# 그래도 조금 기억에 남아 있긴 하다.

class Solution:
    def climbStairs(self, n: int) -> int:
        stairs = [0] * (n + 1)
        stairs[0] = 1

        for i in range(n):
            stairs[i + 1] += stairs[i]
            if i + 2 <= n:
                stairs[i + 2] += stairs[i]

        return stairs[-1]

# list를 쓰지 않는 버전
class Solution:
    def climbStairs(self, n: int) -> int:
        a, b = 1, 0
        for _ in range(n):
            a, b = b + a, a
        return a
