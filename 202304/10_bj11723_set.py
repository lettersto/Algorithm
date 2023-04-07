# 백준 11723 집합

import sys
input = sys.stdin.readline

N = int(input())

bit = 0

for _ in range(N):
    order = input().split()
    command = order[0]
    num = int(order[1]) if len(order) > 1 else 0

    if command == "all":
        #  20자리 1을 생성
        bit = (1 << 21) - 1
    if command == "empty":
        bit = 0
    if command == "add":
        # 1101 | 0010 = 1111 (없는 경우)
        # 1101 | 0100 = 1101 (이미 있는 경우)
        bit |= (1 << num)
    if command == "remove":
        # 1101 ? 0010 = 1101 (없는 경우)
        # 1101 ^ 0100 = 1001 (있는 경우)
        # 기본적으로 XOR이지만, 0 & 1 = 0, 1 & 0은 1이 나와야 한다.
        if bit & (1 << num) != 0:
            bit ^= (1 << num)
    if command == "toggle":
        # 1101 ^ 0010 = 1111 (없는 경우)
        # 1101 ^ 0100 = 1001 (있는 경우)
        bit ^= (1 << num)
    if command == "check":
        # & 연산을 해서 0이 아닌 숫자가 나오면, 자리에 값이 있는 거고
        # 0이 나오면 자리에 값이 없는 것이다.
        print(0 if bit & (1 << num) == 0 else 1)
