# 백준 1644 소수의 연속합

# 에라토스테네스의 체 + 투 포인터 + 부분합이 합쳐진 끔찍한 문제
# 투 포인터와 부분합까지는 순식간에 했는데,
# 에라토스테네스의 체로 소수를 구하지 않으니 시초났던 문제

# 제출한 답
N = int(input())


def primeSieve(num):
    sieve = [True] * (num + 1)
    for i in range(2, int(num ** 0.5) + 1):
        if sieve[i]:
            for j in range(i * 2, num + 1, i):
                sieve[j] = False

    return [p for p in range(2, num + 1) if sieve[p]]


primes = primeSieve(N)
prefixSum = [0] * (len(primes) + 1)

for i in range(1, len(prefixSum)):
    prefixSum[i] = prefixSum[i - 1] + primes[i - 1]

i, j = 0, 1
cnt = 0

while i < j < len(prefixSum):
    tmp = prefixSum[j] - prefixSum[i]
    if tmp < N:
        j += 1
    elif tmp > N:
        i += 1
    else:
        j += 1
        cnt += 1

print(cnt)


# 소수 구했던 방식들...
# 1. 제곱근까지만 체크하기
# 소수 여러 개를 한꺼번에 구해야 하다보니
# 연산이 겹치는 부분이 존재했고, 사실상 이 문제에서는 O(n ** 2)이었던 방식
def isPrime(num):
    if num <= 1:
        return False

    for i in range(2, int(num ** 0.5) + 1):
        if num % i == 0:
            return False

    return True


def getAllPrimesByX(x):
    res = []

    for i in range(1, x + 1):
        if isPrime(i):
            res.append(i)

    return res


# 2. 에라토스테네스 체를 구현 방식만 보고 만들었던 함수
# 사실 이정도면 정말 직관적이지 않나..?
# 할 때마다 list를 새로 만들어서 시간 복잡도가 망한 것 같다.
def primeSieve1(num):
    nums = [i for i in range(2, num + 1)]
    primes = []

    while nums:
        curPrime = nums[0]
        primes.append(curPrime)

        nums = [num for num in nums if num % curPrime != 0]

    return primes

# 3 - 1. 다른 사람의 에라토스테네스 체를 보고 조금 바꾼 함수
# 이 사람의 방식은 조금 복잡하다.
def primeSieve2(num):
    primes = []

    if num <= 1:
        return primes

    nums = [i for i in range(2, num + 1)]
    checked = [False] * len(nums)

    numsIdx = 0
    while nums[numsIdx] < int(sqrt(num)) + 1:
        if not checked[numsIdx]:
            for j in range(numsIdx + nums[numsIdx], len(nums), nums[numsIdx]):
                checked[j] = True
        numsIdx += 1

    for checkedIdx in range(len(nums)):
        if not checked[checkedIdx]:
            primes.append(nums[checkedIdx])

    return primes


# 3 - 2. 더 간결한 방식이 있었다.
def primeSieve3(num):
    sieve = [True] * (num + 1)
    for i in range(2, int(num ** 0.5) + 1):
        if sieve[i]:
            for j in range(i * 2, num + 1, i):
                sieve[j] = False

    return [p for p in range(2, num + 1) if sieve[p]]
