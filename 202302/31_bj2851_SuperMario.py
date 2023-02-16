# 백준 2851 슈퍼 마리오

mushrooms = [int(input()) for _ in range(10)]

ans = sumV = mushrooms[0]

for i in range(1, 10):
    sumV += mushrooms[i]

    x = abs(ans - 100)
    y = abs(sumV - 100)

    if x > y:
        ans = sumV
    elif x < y:
        break
    else:
        ans = max(ans, sumV)

print(ans)
