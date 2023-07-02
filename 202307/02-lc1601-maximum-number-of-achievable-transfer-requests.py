# LeetCode 1601. Maximum Number of Achievable Transfer Requests

# 사실상 brute force인 문제

from itertools import combinations
from typing import List

class Solution:
    def maximumRequests(self, n: int, requests: List[List[int]]) -> int:
        for i in range(len(requests), 0, -1):
            for comb in combinations(requests, i):
                tmp = [0] * n
                for s, e in comb:
                    tmp[s] -= 1
                    tmp[e] += 1
                if not any(tmp):
                    return i
        return 0
    