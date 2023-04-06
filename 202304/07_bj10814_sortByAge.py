# 백준 10814 나이순 정렬

import sys
input = sys.stdin.readline

N = int(input())
arr = []

for i in range(N):
    age, name = input().split()
    arr.append((int(age), i, name))

arr.sort()

for age, _, name in arr:
    print(age, name)


# 정렬 자체가 변경 사항이 없다면 그대로 두니
# 굳이 i를 넣지 않아도 된다.

import sys
input = sys.stdin.readline

N = int(input())
arr = []

for i in range(N):
    age, name = input().split()
    arr.append((int(age), name))

arr.sort(key=lambda x: x[0])

for age, name in arr:
    print(age, name)
