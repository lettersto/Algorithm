# 백준 11729 하노이 탑 이동 순서

# 계속해서 풀지 못해서 결국 답안을 봤다.
# 재귀적으로 사고하는 날이 오게 될까?

def hanoi(n, a, b, c):  # 이동하는 원반 개수, start, 움직이지 않는 기둥, end
    global cnt
    cnt += 1

    if n == 1:
        moves.append(f"{a} {c}")
        return

    hanoi(n - 1, a, c, b)    # n - 1개의 탑을 a -> b 위치로 이동
    moves.append(f"{a} {c}") # 남은 1개를 a -> c 위치로 이동
    hanoi(n - 1, b, a, c)    # 다시 n - 1개의 탑을 b -> c 위치로 이동


N = int(input())
cnt = 0
moves = []
hanoi(N, 1, 2, 3)

print(cnt)
print("\n".join(moves))
