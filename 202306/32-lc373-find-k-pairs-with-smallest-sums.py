# LeetCode 373. Find K Pairs with Smallest Sums

from heapq import heappop, heappush
from typing import List

class Solution:
    def kSmallestPairs(self, nums1: List[int], nums2: List[int], k: int) -> List[List[int]]:
        pairs = []
        visit = set()
        cnt = 0

        Q = [(0, 0, 0)]  # sumV, i, j
        visit.add((0, 0))
        
        while Q:
            _, i, j = heappop(Q)
            pairs.append([nums1[i], nums2[j]])
            cnt += 1
            if cnt == k: break
            
            for x, y in ((1, 0), (0, 1)):
                newI = x + i
                newJ = y + j

                if (newI, newJ) in visit or newI >= len(nums1) or newJ >= len(nums2):
                    continue
                visit.add((newI, newJ))
                heappush(Q, (nums1[newI] + nums2[newJ], newI, newJ))

        return pairs
    