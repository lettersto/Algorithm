# 백준 5585 거스름돈

money = int(input())
change = 1000 - money
yens = [500, 100, 50, 10, 5, 1]


def check(yen):
    res = change // yen
    return res, change - yen * res


ans = 0
for yen in yens:
    if change == 0:
        break

    cnt, change = check(yen)
    ans += cnt

print(ans)
