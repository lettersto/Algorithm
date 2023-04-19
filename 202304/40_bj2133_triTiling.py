# 백준 2133 타일 채우기

N = int(input())

square = [0] * (N + 1)
asquare = [0] * (N + 1)

'''
square은 아래처럼 완전한 직사각형을 만드는 경우
1   1 1   1 1 1  1 1 1 1
1   1 1   1 1 1  1 1 1 1
1   1 1   1 1 1  1 1 1 1

asquare은 아래처럼 좌상단이나 좌하단에 하나 빠진 경우
0   0 1   0 1 1  0 1 1 1
1   1 1   1 1 1  1 1 1 1
1   1 1   1 1 1  1 1 1 1

1   1 1   1 1 1  1 1 1 1
1   1 1   1 1 1  1 1 1 1
0   0 1   0 1 1  0 1 1 1

square(x) = square(x - 2) + asquare(x - 2) * 2의 형태로 표현 가능
asquare(x) = square(x) + asquare(x - 2)의 형태로 표현 가능
'''

if N >= 2:
    square[2] = 3
    asquare[2] = 4

asquare[0] = 1

for i in range(3, N + 1):
    square[i] = square[i - 2] + asquare[i - 2] * 2
    asquare[i] = square[i] + asquare[i - 2]

print(square[N])
