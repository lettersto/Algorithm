# 프로그래머스 블록 게임

blocks = [
    ((0, 0), (0, 1), (0, 2), (1, 2)),  # 0
    ((0, 0), (0, 1), (1, 0), (2, 0)),  # 1
    ((0, 0), (1, 0), (1, 1), (1, 2)),  # 2
    ((0, 0), (1, 0), (2, -1), (2, 0)),  # 3
    ((0, 0), (0, 1), (0, 2), (1, 0)),  # 4
    ((0, 0), (1, 0), (2, 0), (2, 1)),  # 5
    ((0, 0), (1, -2), (1, -1), (1, 0)),  # 6
    ((0, 0), (0, 1), (1, 1), (2, 1)),  # 7
    ((0, 0), (1, -1), (1, 0), (1, 1)),  # 8
    ((0, 0), (1, 0), (1, 1), (2, 0)),  # 9
    ((0, 0), (0, 1), (0, 2), (1, 1)),  # 10
    ((0, 0), (1, -1), (1, 0), (2, 0)),  # 11
]
blockTypeMap = {}

for i in range(len(blocks)):
    blocks[i] = tuple(sorted(blocks[i]))
    blockTypeMap[blocks[i]] = i

blockHoles = [
    (),  # 0
    (),  # 1
    ((0, 1), (0, 2)),  # 2
    ((0, -1), (1, -1)),  # 3
    (),  # 4
    ((0, 1), (1, 1)),  # 5
    ((0, -2), (0, -1)),  # 6
    (),  # 7
    ((0, -1), (0, 1)),  # 8
    (),  # 9
    (),  # 10
    (),  # 11
]


def getTypeAndAbsoluteCoords(board, row, col):
    N = len(board)
    Q = [(row, col)]
    absoluteCoord = {(row, col)}

    while Q:
        curR, curC = Q.pop(0)

        for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):
            newR, newC = curR + dr, curC + dc
            if 0 <= newR < N and 0 <= newC < N and \
                    board[row][col] == board[newR][newC] and (newR, newC) not in absoluteCoord:
                Q.append((newR, newC))
                absoluteCoord.add((newR, newC))

    relativeCoord = [(coord[0] - row, coord[1] - col) for coord in absoluteCoord]
    relativeCoord.sort()

    return [blockTypeMap[tuple(relativeCoord)], sorted(absoluteCoord)] 


def isLineEmpty(board, row, col):
    for newRow in range(row, -1, -1):
        if board[newRow][col] != 0:
            return False
    return True


def getCoordOfBlock(board):
    N = len(board)
    visitedBlock = set()

    for row in range(N):
        for col in range(N):
            if board[row][col] == 0 or board[row][col] in visitedBlock:
                continue
            
            visitedBlock.add(board[row][col])            
            
            blockType, absoluteCoord = getTypeAndAbsoluteCoords(board, row, col)
            
            holes = blockHoles[blockType]
            if len(holes) == 0: continue

            isLineBlocked = False
            newHoles = [(row + holeRow, col + holeCol) for holeRow, holeCol in holes]
            for newHoleRow, newHoleCol in newHoles:
                if not isLineEmpty(board, newHoleRow, newHoleCol):
                    isLineBlocked = True
                    break
            if isLineBlocked: continue
            
            return absoluteCoord

    return []


def removeBlock(board, coords):
    for row, col in coords:
        board[row][col] = 0


def solution(board):
    answer = 0

    while True:
        coords = getCoordOfBlock(board)

        if len(coords) == 0:
            break
        removeBlock(board, coords)
        answer += 1

    return answer
