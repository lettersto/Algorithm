# 프로그래머스 신고 결과 받기

def solution(id_list, report, k):
    reported = {key: set() for key in id_list}
    emailCnt = {key: 0 for key in id_list}
    
    # report에 set을 해주는 것도 좋다.
    for rp in report:
        id, reportedId = rp.split()
        reported[reportedId].add(id)
    
    for reportedId, reportingIds in reported.items():
        if len(reportingIds) >= k:
            for id in reportingIds:
                emailCnt[id] += 1
    
    answer = [emailCnt[id] for id in id_list]
    return answer
