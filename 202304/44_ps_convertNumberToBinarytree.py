# 프로그래머스 표현 가능한 이진트리

# 궁금해서 봐봤던 카카오 코테에서 지문이 이해가 안 되서
# 풀다가 넘겼던 문제.......
# 지금 다시 봐도 왜 문제가 수능 영어 지문 같은지 알 수 없다.

# 그때 당시 접근했던 방법은 괜찮았는데
# 아무래도 순회를 잘못해서 틀린 것 같다.
# 지금도 풀긴 풀었지만 몇몇 부분이 마음에 들지 않는다.

# 풀이 방식

# 숫자를 이진수로 만든다.
# 이진수가 포화이진트리가 되기에 부족한 숫자면 앞에 0을 더 추가한다.
# 그렇게 만든 이진수의 가장 중앙이 root가 된다.
# 이진수의 범위를 계속 절반씩 잘라나가며 subtree의 root를 찾는다. (binary search와 유사)
# 그러면서 트리를 만들지 못하는 경우에는 체크를 한다.


def getHeight(number):
    height = 0
    target = number + 1
    
    while 2 ** height < target:
        height += 1
    return height


def solution(numbers):
    answer = []
    
    for number in numbers:
        binNum = bin(number)[2:]
        height = getHeight(len(binNum))
        totalNodeCnt = 2 ** height - 1
        res = 1
        
        if len(binNum) != totalNodeCnt:
            binNum = "0" * (totalNodeCnt - len(binNum)) + binNum
            
        def traversal(left, right, binNum):
            nonlocal res
            if left == right:
                return left

            mid = (left + right) // 2

            leftRoot = traversal(left, mid - 1, binNum)
            rightRoot = traversal(mid + 1, right, binNum)

            if (binNum[leftRoot] == '1' or binNum[rightRoot] == '1') and binNum[mid] == '0':
                res = 0

            return mid
        
        traversal(0, totalNodeCnt - 1, binNum)
        answer.append(res)
    
    return answer
