# 프로그래머스 성격 유형 검사하기

def solution(survey, choices):
    '''
    매우 동의/매우 비동의 3
    동의/비동의 2
    약간 동의/약간 비동의 1
    모르겠음 0
    
    점수가 같은 경우) 두 성격 유형 중 "사전 순"으로 빠른 성격
    survey: 비동의/동의
    '''
    surveyCnt = len(survey)
    pointMap = [(-1, -1), (0, 3), (0, 2), (0, 1), (0, 0), (1, 1), (1, 2), (1, 3)]
    typeMap = {key:0 for key in "RTCFJMAN"}
    
    for surveyIdx in range(surveyCnt):
        question = survey[surveyIdx]
        choice = choices[surveyIdx]
        typeMap[question[pointMap[choice][0]]] += pointMap[choice][1]
    
    answer = ''
    
    for typ1, typ2 in (["R", "T"], ["C", "F"], ["J", "M"], ["A", "N"]):
        if typeMap[typ1] >= typeMap[typ2]:
            answer += typ1
        else:
            answer += typ2
    
    return answer
