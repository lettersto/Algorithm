# 백준 3273 두 수의 합

N = int(input())
arr = list(map(int, input().split()))
x = int(input())

arr.sort()

i, j = 0, len(arr) - 1
ans = 0

while i < j:
    res = arr[i] + arr[j]

    if res == x:
        ans += 1
        i += 1
    elif res < x:
        i += 1
    else:
        j -= 1

print(ans)
