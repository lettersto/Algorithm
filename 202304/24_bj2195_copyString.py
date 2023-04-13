# 백준 2195 문자열 복사

# 거의 brute force에 가까운 찾기 방식이지만,
# 사람들이 dictioinary를 통해 조금의 개선을 노렸길래 따라해봤다.

S = input()
P = input()

alphaDict = dict()

# 미리 어느 idx에 어떤 알파벳이 있는지 저장해두는 dictionary
for i in range(len(S)):
    if S[i] not in alphaDict:
        alphaDict[S[i]] = []
    alphaDict[S[i]].append(i)

pIdx = 0
copyCnt = 0

while pIdx < len(P):
    maxSameCnt = 0

    for sStartIdx in alphaDict[P[pIdx]]:
        tmpIdxS = sStartIdx
        tmpIdxP = pIdx
        cnt = 0

        while tmpIdxS < len(S) and tmpIdxP < len(P) \
                and P[tmpIdxP] == S[tmpIdxS]:
            tmpIdxP += 1
            tmpIdxS += 1
            cnt += 1

        maxSameCnt = max(maxSameCnt, cnt)

    pIdx += maxSameCnt
    copyCnt += 1

print(copyCnt)
