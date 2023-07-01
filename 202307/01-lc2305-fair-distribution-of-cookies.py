# LeetCode 2305. Fair Distribution of Cookies

# backtraking. n이 최대 8이라 백트래킹 가능

from typing import List


class Solution:
    def distributeCookies(self, cookies: List[int], k: int) -> int:
        minDiff = 10 ** 10
        pairs = [0] * k

        if k == 8:
            return max(cookies)
        
        def makePairs(depth):
            nonlocal minDiff
            if max(pairs) > minDiff:
                return

            if depth == len(cookies):
                minDiff = min(max(pairs), minDiff)
                return

            for i in range(k):
                pairs[i] += cookies[depth]
                makePairs(depth + 1)
                pairs[i] -= cookies[depth]

        makePairs(0)

        return minDiff
    