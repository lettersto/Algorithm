# 백준 2745 진법 변환

num, base = input().split()
base = int(base)
numLen = len(num)
ans = 0


def charToNumber(char: str) -> int:
    return ord(char) - 55


for i in range(numLen):
    exponent = numLen - i - 1
    n = charToNumber(num[i]) if num[i].isalpha() else int(num[i])
    ans += n * base ** exponent

print(ans)
