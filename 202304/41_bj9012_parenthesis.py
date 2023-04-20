# 백준 9012 괄호

# stack을 리스트가 아니라 숫자로도 표현이 가능하다.
T = int(input())
for _ in range(T):
    case = input()
    stack = 0

    for c in case:
        if c == "(":
            stack += 1
        else:
            stack -= 1

        # )가 (보다 많이 나온 경우 아예 불가능
        if stack < 0:
            break

    # 다 하고도 남아 있는 경우
    print("NO") if stack != 0 else print("YES")
