# LeetCode 1514. Path with Maximum Probability

# dijkstra 문제
from heapq import heappop, heappush
from typing import List

class Solution:
    def maxProbability(self, n: int, edges: List[List[int]], succProb: List[float], start: int, end: int) -> float:
        adj = [[] for _ in range(n)]

        for i in range(len(edges)):
            v1, v2 = edges[i]
            adj[v1].append((succProb[i], v2))
            adj[v2].append((succProb[i], v1))

        Q = [(-1, start)]
        visit = [False] * n

        while Q:
            curP, curV = heappop(Q)
            if curV == end:
                return -curP
            visit[curV] = True
            
            for neiP, neiV in adj[curV]:
                if visit[neiV]: continue
                heappush(Q, (curP * neiP, neiV))
            
        return 0