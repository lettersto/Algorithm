# LeetCode 2024. Maximize the Confusion of an Exam

# T와 F를 별개의 값으로 생각하면 어려워지는 문제

class Solution:
    def maxConsecutiveAnswers(self, answerKey: str, k: int) -> int:
        count = {'T': 0, 'F': 0}
        n = len(answerKey)
        maxV = 0
        i = j = 0

        while i < n and j < n:
            count[answerKey[j]] += 1

            while min(count['T'], count['F']) > k and i <= j:
                count[answerKey[i]] -= 1
                i += 1
            
            maxV = max(maxV, j - i + 1)
            j += 1

        return maxV
