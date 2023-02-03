# 백준 11047 동전 0
from itertools import combinations as comb

while True:
    K, *S = map(int, input().split())
    if K == 0: break
    for c in sorted(comb(S, 6)):
        print(*c)
    print()
