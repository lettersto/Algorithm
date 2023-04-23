# 백준 9935 문자열 폭발

word = input()
bomb = input()

stack = []
bombLen = len(bomb)

for w in word:
    stack.append(w)

    while len(stack) >= bombLen and ''.join(stack[-bombLen:]) == bomb:
        for i in range(bombLen):
            stack.pop()

if stack:
    print(''.join(stack))
else:
    print("FRULA")
