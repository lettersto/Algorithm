// LeetCode 389. Find the Difference

#include <string>

using namespace std;

class Solution {
public:
    // 처음 생각해냈던 것
    // 각 비트 자리를 알파벳에 대응해서 했다.
    char findTheDifference(string s, string t) {
        int sSet {0};
        char ans {'a'};

        for (size_t i = 0; i < s.length(); i++) {
            sSet ^= (1 << (s[i] - 'a'));
        }

        for (size_t i = 0; i < t.length(); i++) {
            sSet ^= (1 << (t[i] - 'a'));
        }

        for (int i = 0; i < 26; i++) {
            if ((sSet & (1 << i) )!= 0) {
                ans = 'a' + i;
                break;
            }
        }

        return ans;
    }

    // 하지만 다른 사람의 더 깔끔한 답변을 봤다.
    // 1101이 몇 개가 들어가든, 짝수로 들어간다면 XOR에서는 0이 되어 사라지는 점을 이용
    // 모든 연산 끝에 남은 char가 바로 답이 된다.
    char findTheDifference2(string s, string t) {
        char sSet {0};

        for (size_t i = 0; i < s.length(); i++) {
            sSet ^= s[i];
        }

        for (size_t i = 0; i < t.length(); i++) {
            sSet ^= t[i];
        }

        return sSet;
    }
};
