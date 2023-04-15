# 백준 22856 트리 순회

# 조금 복잡하게 풀은 거 같지만 그래도 stack 느낌이 나서 stack으로 했더니 됐다.
# 일단 stack을 떠올렸다는 거에 만족

# 방식은
# 1. 스택의 -1번째 있는 노드를 체크
# 2. left가 있고 아직 방문 안 했다면 left
# 3. right가 있고 아직 방문 안 했다면 right
# 4. 위의 경우 중 어떤 것도 아니라면 pop해서 Stack.at(-1)이 현재 root의 parent가 되도록 한다.

# 사실 하면서 중위 순회 마지막은 어떻게 체크해야 하는지 몰라서
# 그냥 right로 타고 들어가도록 만들었는데... 아마 right로 편향된 트리라면 여기에서만 O(n)이 나왔을듯

import sys
sys.setrecursionlimit(10 ** 6)
input = sys.stdin.readline

N = int(input())

leftChild = [-1] * (N + 1)
rightChild = [-1] * (N + 1)
parent = [-1] * (N + 1)

for _ in range(N):
    root, left, right = map(int, input().split())
    leftChild[root] = left
    rightChild[root] = right
    parent[left] = parent[right] = root

ST = [1]
visit = {1}
cnt = 0
endNode = 1


def getEndNode(root):
    global endNode
    if root == -1:
        return
    endNode = root
    getEndNode(rightChild[root])


getEndNode(1)

while True:
    root = ST[-1]
    if leftChild[root] != -1 and leftChild[root] not in visit:
        ST.append(leftChild[root])
        visit.add(leftChild[root])
        cnt += 1
    elif rightChild[root] != -1 and rightChild[root] not in visit:
        ST.append(rightChild[root])
        visit.add(rightChild[root])
        cnt += 1
    else:
        node = ST.pop()
        cnt += 1
        if node == endNode:
            break

print(cnt - 1)


# 다른 사람 풀이 중에 right node만 써서 한 게 있는데
# 이해를 못하겠으니 더 봐야 할듯
# 2 * (n - 1) + 1이 어디서 나온 걸까
ans = 2*(n-1) + 1
stack = [1]
while stack:
    ans -= 1
    v = stack.pop()
    r_node = right_nodes[v]
    if r_node != -1:
        stack.append(r_node)   
print(ans)
