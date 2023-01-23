class Solution:
    def findJudge(self, n: int, trust: List[List[int]]) -> int:
        out = [False for _ in range(n + 1)]
        cnt = [0 for _ in range(n + 1)]

        for a, b in trust:
            out[a] = True
            cnt[b] += 1

        judge = []
        for i in range(1, n + 1):
            if not out[i] and cnt[i] == n - 1:
                judge.append(i)
        
        if len(judge) == 0 or len(judge) >= 2:
            return -1

        return judge[0]
