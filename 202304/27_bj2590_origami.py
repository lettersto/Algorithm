# 백준 2590 색종이 

# 큰 종이부터 채워나가는 greedy
# 코드 반복되는 부분이 있긴 한데 정리해도 별로일 것 같아서 패스...

papers = [0] * 7
boardCnt = 0

for i in range(1, 7):
    papers[i] = int(input())

# 6번 색종이
if papers[6]:
    boardCnt = papers[6]

# 5번 색종이
if papers[5]:
    boardCnt += papers[5]

    # 1번 색종이로 남은 칸 채우기
    ones = papers[5] * 11
    papers[1] = (papers[1] - ones) if papers[1] >= ones else 0

if papers[4]:
    boardCnt += papers[4]

    # 2번 색종이로 남은 칸 채우기
    twos = 5 * papers[4]
    tmp = papers[2]
    papers[2] = (papers[2] - twos) if papers[2] >= twos else 0
    twos = (twos - tmp) if twos >= tmp else 0
    # 2번 색종이로 채운 이후, 남은 칸이 있다면 1번 색종이로 채우기
    ones = twos * 4
    papers[1] = (papers[1] - ones) if papers[1] >= ones else 0

if papers[3]:
    boardCnt += papers[3] // 4
    if papers[3] % 4 != 0:
        boardCnt += 1

        threes = papers[3] % 4
        twos = ones = 0

        if threes == 1:
            twos = 5
            ones = 7
        if threes == 2:
            twos = 3
            ones = 6
        if threes == 3:
            twos = 1
            ones = 5

        # 2번 색종이로 남는 공간 메꾸기
        tmp = papers[2]
        papers[2] = (papers[2] - twos) if papers[2] >= twos else 0
        twos = (twos - tmp) if twos >= tmp else 0

        # 2번 색종이로 채운 이후, 남은 칸이 있다면 1번 색종이로 채우기
        ones += twos * 4
        papers[1] = (papers[1] - ones) if papers[1] >= ones else 0

if papers[2]:
    boardCnt += papers[2] // 9
    if papers[2] % 9 != 0:
        boardCnt += 1
        twos = 9 - papers[2] % 9
        ones = twos * 4

        papers[1] = (papers[1] - ones) if papers[1] >= ones else 0

if papers[1]:
    boardCnt += papers[1] // 36
    if papers[1] % 36 != 0:
        boardCnt += 1

print(boardCnt)
