# 백준 12904 A와 B

# 연산이 덧셈밖에 없고, 마지막에 A나 B 둘중 하나를 꼭 더해야 하기 때문에
# 완성해야 하는 string에서 역으로 처음 string이 나오는지 보는 것이 더 쉽다.

str1 = input()
str2 = input()

while len(str1) != len(str2):
    if str2[-1] == 'A':
        str2 = str2[:-1]
    else:
        str2 = str2[len(str2) - 2::-1]

print(1 if str1 == str2 else 0)
