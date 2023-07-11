// LeetCode 338. Counting Bits

/******************************************************
0 ~ n까지 각 숫자의 이진수 형태에 1이 몇 개 있는지 세는 문제
O(n)으로 풀어야 해서 고민을 조금 했다.

왜냐하면 left shift가 * 1/2 인 것을 잊고 있었기 때문에...
right shift는 * 2 이고...

그래서 bit의 형태를 가지고 dp를 했다.

0  000  -> 0
1  001  -> 1
2  010  -> 1 + 0 
3  011  -> 1 + 1
4  100  -> 1 + 0
5  101  -> 1 + 1
6  110  -> 1 + 10
7  111  -> 1 + 11

4 ~ 7까지의 숫자는 맨 앞자리 bit인 1과
각각 00 01 10 11이 합쳐진 형태임을 이용
2의 제곱을 추적해 나가면서
ans[7] = 1 (맨 첫비트) + ans[7 - 2 ** 2] (반복되는 뒷자리 비트)
형태이다.

(cf) left shift를 이용하면
arr[n] = arr[n / 2] + n % 2로 가능하다.
******************************************************/


#include <vector>

using namespace std;

class Solution {
public:
    vector<int> countBits(int n) {
        vector<int> ans(n + 1, 0);
        int preV {0};
        int neiV {1};
        for (int i = 1; i < n + 1; i++) {
            if (i == neiV) {
                preV = neiV;
                neiV *= 2;
            }
            ans[i] = 1 + ans[i - preV];
        }

        return ans;
    }
};
