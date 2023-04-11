from re import split as sp
from collections import deque

TC = int(input())

for _ in range(TC):
    cmds = input()
    N = int(input())
    nums = deque(i for i in sp(r'(?:,|\[|\])', input()) if i != '')

    ans = ''
    reverse = False
    for cmd in cmds:
        if cmd == 'R':
            reverse = not reverse
        if cmd == 'D':
            if len(nums) == 0:
                ans = 'error'
                break
            else:
                if reverse:
                    nums.pop()
                else:
                    nums.popleft()

    if ans != 'error':
        ans = '[' + ','.join(reversed(nums) if reverse else nums) + ']'

    print(ans)


# 큐... 한번 직접 해보려다가 시간만 너무 걸린듯
# 시간초과하지 않았다는 것에 의의...
class Node:
    def __init__(self, val):
        self.val = val
        self.left = None
        self.right = None


class Que:
    def __init__(self):
        self.head = None
        self.tail = None
        self.size = 0
        self.reversed = False

    def insert(self, val):
        newNode = Node(val)
        if self.head is None:
            self.head = newNode
            self.tail = newNode
        else:
            newNode.left = self.tail
            self.tail.right = newNode
            self.tail = newNode
        self.size += 1

    def reverse(self):
        self.reversed = not self.reversed

    def popright(self):
        if self.size == 0:
            return
        tmp = self.tail
        self.tail = self.tail.left
        if self.tail:
            self.tail.right = None
        else:
            self.head = None
        self.size -= 1
        return tmp.val

    def popleft(self):
        if self.size == 0:
            return
        tmp = self.head
        self.head = self.head.right
        if self.head:
            self.head.left = None
        else:
            self.tail = None
        self.size -= 1
        return tmp.val

    def pop(self):
        if self.reversed:
            self.popright()
        else:
            self.popleft()

    def toString(self):
        res = []
        if self.reversed:
            tmp = self.tail
            while tmp:
                res.append(tmp.val)
                tmp = tmp.left
        else:
            tmp = self.head
            while tmp:
                res.append(tmp.val)
                tmp = tmp.right

        return '[' + ','.join(res) + ']'


TC = int(input())

for _ in range(TC):
    cmds = input()
    N = int(input())
    nums = Que()

    for i in input()[1:-1].split(','):
        if i.isdigit():
            nums.insert(i)

    ans = ''
    for cmd in cmds:
        if cmd == 'R':
            nums.reverse()
        if cmd == 'D':
            if nums.size == 0:
                ans = 'error'
                break
            else:
                nums.pop()

    if ans != 'error':
        ans = nums.toString()

    print(ans)
