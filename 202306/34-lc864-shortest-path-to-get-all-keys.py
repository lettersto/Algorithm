# LeetCode 864. Shortest Path to Get All Keys
# 찾은 key도 모두 visit에 넣어서 visit 생성
# key는 bitmasking...

from typing import List


class Solution:
    def shortestPathAllKeys(self, grid: List[str]) -> int:
        grid = [list(i) for i in grid]

        R, C = len(grid), len(grid[0])
        
        startR = startC = -1
        keyIds = dict()
        keyCnt = 0
        for row in range(R):
            for col in range(C):
                if grid[row][col] == "@":
                    startR, startC = row, col
                if 65 <= ord(grid[row][col]) <= 90:
                    keyIds[grid[row][col]] = keyCnt
                    keyIds[chr(ord(grid[row][col]) + 32)] = keyCnt
                    keyCnt += 1

        grid[startR][startC] = "."  # simplify the grid


        def bfs(startR, startC):
            nonlocal R, C, keyCnt
            Q = [(0, startR, startC, 0)]  # curW, curR, curC, foundKeys
            visit = {(0, startR, startC)}  # foundKeys, row, col
            maxKeys = int("1" * keyCnt, 2)

            while Q:
                curW, curR, curC, foundKeys = Q.pop(0)
                if foundKeys == maxKeys:
                    return curW
                
                for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                    newR, newC = curR + dr, curC + dc
                    if newR < 0 or newR >= R or newC < 0 or newC >= C \
                        or (foundKeys, newR, newC) in visit \
                        or grid[newR][newC] == "#":
                        continue
     
                    if 97 <= ord(grid[newR][newC]) <= 122:  # key
                        keyId = keyIds[grid[newR][newC]]
                        newFoundKeys = foundKeys | (1 << keyId) 

                        Q.append((curW + 1, newR, newC, newFoundKeys))
                        visit.add((newFoundKeys, newR, newC))
                    
                    else:
                        if 65 <= ord(grid[newR][newC]) <= 90:  # lock
                            keyId = keyIds[grid[newR][newC]]
                            if (foundKeys & (1 << keyId)) == 0:
                                continue
                        Q.append((curW + 1, newR, newC, foundKeys))

                    visit.add((foundKeys, newR, newC))

            return -1

        return bfs(startR, startC)
