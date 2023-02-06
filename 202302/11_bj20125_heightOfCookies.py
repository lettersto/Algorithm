# 백준 20125 쿠키의 신체 측정

# 웃긴 문제이다.🍪
import sys
input = sys.stdin.readline

N = int(input().rstrip())
MAP = [input().rstrip() for _ in range(N)]


def measure(row, col):
    heart = [row + 2, col + 1]

    leftArm = 0
    rightArm = 0
    for c in range(N):
        if MAP[row + 1][c] == '*':
            if c < col:
                leftArm += 1
            if c > col:
                rightArm += 1
    
    body = 0
    bodyEnd = row + 2
    for r in range(row + 2, N):
        if MAP[r][col] == '*':
            body += 1
            bodyEnd = r
        else:
            break
    
    leftLeg = 0
    rightLeg = 0
    for r in range(bodyEnd + 1, N):
        if MAP[r][col - 1] == '*':
            leftLeg += 1
        if MAP[r][col + 1] == '*':
            rightLeg += 1

    return f'{heart[0]} {heart[1]}\n{leftArm} {rightArm} {body} {leftLeg} {rightLeg}'


def solution():
    for row in range(N):
        for col in range(N):
            if MAP[row][col] == '*':
                return measure(row, col)


print(solution())
