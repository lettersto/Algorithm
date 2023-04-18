# 백준 13144 List of Unique Numbers

# 항상 직접 풀다가 맞으면 넘어갔었는데
# 오늘은 항상 고민하느니 다른 사람의 풀이법을 알면 좋지 않겠냐는 생각에
# 다른 사람 풀이를 보고 고민을 해봤다.
# 앞으로 몇번 반복해서 풀어봐야 할 것 같다. 

# left도 0 -> N까지 움직이고, right도 0 -> N까지 움직이는데
# 뒤로 돌아가는 일이 없다. 여기서 뒤로 돌아가면 시간 초과가 발생한다.

N = int(input())
nums = list(map(int, input().split()))


def solution():
    right = 0
    ans = 0
    visit = [False] * 100_001

    # 1. left는 for문으로 index 0부터 N - 1까지 움직인다.
    for left in range(N):
        # 2 - 1. 각 left마다 숫자를 썼다고 True로 만들어 준다.
        visit[nums[left]] = True
        
        # 3 - 2. 그런데 이렇게 처리하는 경우, 숫자가 계속 같으면
        #        right는 이동하지 않고 left만 이동하게 된다.
        #        left <= right이어야 하므로 이를 맞춰준다.
        if right < left:
            right = left
        
        # 3 - 1. right는 이전까지 움직였던 곳 다음부터 움직인다.
        #        1 2 3 1 일때, 다음 right index가 3이라 동일한 숫자가 뜬다면
        #        right는 2에 멈추고, left는 0 -> 1로 바꾸도록(for) 만들면
        #        2 3부분을 다시 처음부터 확인하지 않기 때문에, 확인하는 횟수를 줄일 수 있다.
        while right + 1 < N and not visit[nums[right + 1]]:
            right += 1
            visit[nums[right]] = True
        
        # 4. 1 2 3 1 케이스에서 right = 2, left = 0이라면,
        #    1, 12, 123 3가지 경우가 나와야 하므로,
        #    left = 0이 포함되는 경우 경우의 수는 right - left + 1이 된다. 
        ans += right - left + 1
        # 2 - 2. 끝나기 전에 left를 안 쓴 상태로 만들어 준다.
        #        겹치는 숫자가 나오는 직전에 right가 끝나기 때문에 가능하다.
        visit[nums[left]] = False

    return ans


print(solution())
