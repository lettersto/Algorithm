# 프로그래머스 문자열 압축

def solution(s):
    strLen = len(s)
    ans = len(s)
    
    for cutLen in range(1, strLen // 2 + 1):
        i = 0
        newStr = ""
        while i < strLen:
            curStr = s[i: i + cutLen]
            cnt = 1
            
            for j in range(i + cutLen, strLen, cutLen):
                if curStr != s[j: j + cutLen]:
                    break
                cnt += 1
                
            if cnt > 1:
                curStr = f'{cnt}{curStr}'
            
            newStr += curStr
            i += cnt * cutLen
        
        ans = min(ans, len(newStr))
    
    return ans
