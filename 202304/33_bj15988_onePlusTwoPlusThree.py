# 백준 15988 1, 2, 3 더하기 3

T = int(input())
queries = []
maxV = 0
for _ in range(T):
    n = int(input())
    queries.append(n)
    maxV = max(maxV, n)

cache = [0] * (maxV + 1 if maxV >= 4 else 4)
cache[1] = 1
cache[2] = 2
cache[3] = 4


for i in range(4, maxV + 1):
    cache[i] = (cache[i - 1] + cache[i - 2] + cache[i - 3]) % 1_000_000_009

for query in queries:
    print(cache[query])
