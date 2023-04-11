# 백준 14888 연산자 끼워넣기

N = int(input())
nums = list(map(int, input().split()))
maxCounts = list(map(int, input().split()))

usedCounts = [0] * 4
operators = ['+', '-', '*', '/']

maxV = -10 ** 9
minV = 10 ** 9


def calculate(operator: str, x: int, y: int) -> int:
    if operator == '+':
        return x + y
    if operator == '-':
        return x - y
    if operator == '*':
        return x * y
    if operator == '/':
        if x >= 0:
            return x // y
        else:
            return -(-x // y)


def getMaxAndMinVal(depth: int, sumV: int):
    global minV, maxV

    if depth == N - 1:
        minV = min(minV, sumV)
        maxV = max(maxV, sumV)
        return

    for i in range(4):
        if usedCounts[i] >= maxCounts[i]:
            continue

        usedCounts[i] += 1
        newSumV = calculate(operators[i], sumV, nums[depth + 1])
        getMaxAndMinVal(depth + 1, newSumV)
        usedCounts[i] -= 1


getMaxAndMinVal(0, nums[0])


print(maxV)
print(minV)
