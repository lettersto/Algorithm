# 소프티어 지우는 소수를 좋아해
# 다익스트라 + 소수

# 최소 레벨이 크면 클수록 그냥 소수를 구하는 방법은
# 중복이 많이 될 것 같아서 에라토스테네스체를 쓰려다가
# 에라토스테네스체는... 미리 끝 지점 숫자를 설정해야하는데...?
# 이 지점을 어떻게 설정할지 고민이 되었다.
# 그래서 평소에 isPrime 함수를 작성할 때는 제곱근으로 하니까, 제곱을 박아봤는데... 음!

import sys
from heapq import heappop, heappush
input = sys.stdin.readline


V, E = map(int, input().split())
adj = [[] for _ in range(V + 1)]
for _ in range(E):
    v1, v2, w = map(int, input().split())
    adj[v1].append((w, v2))
    adj[v2].append((w, v1))


def dijkstra():
    Q = [(0, 1)]
    visit = [False] * (V + 1)

    ans = 0
    while Q:
        curCost, curV = heappop(Q)
        if visit[curV]: continue
        visit[curV] = True
        ans = max(ans, curCost)
        if curV == V: return ans

        for neiCost, neiV in adj[curV]:
            if not visit[neiV]:
                heappush(Q, (neiCost, neiV))

    return ans


def getPrimeGreaterThan(num):  # int -> int
    if num <= 1: return 2
    
    # 여기서 maxNum을 제곱으로 설정했는데 뭐가 최선일지 모르겠다.
    maxNum = num ** 2 + 1

    isPrime = [True] * maxNum
    isPrime[0] = isPrime[1] = False
    
    for i in range(2, maxNum):
        if not isPrime[i]: continue
        if i > num: return i
        for j in range(i + i, maxNum, i):
            isPrime[j] = False
    

minLvl = dijkstra()
print(getPrimeGreaterThan(minLvl))
