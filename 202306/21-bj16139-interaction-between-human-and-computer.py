# 백준 16139 인간-컴퓨터 상호작용

import sys
input = sys.stdin.readline

word = input().rstrip()
N = int(input().rstrip())

arr = [[0] * 26]
tmp = [0] * 26
for w in word:
    tmp[ord(w) - 97] += 1
    arr.append(tmp.copy())

for _ in range(N):
    w, s, e = input().rstrip().split()
    s, e = int(s), int(e)
    print(arr[e + 1][ord(w) - 97] - arr[s][ord(w) - 97])
