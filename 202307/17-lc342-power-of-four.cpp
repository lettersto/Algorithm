// LeetCode 342. Power of Four

// 231번 문제의 연장선
// 단지 4의 배수는 1 100 10000 ... 과 같이 1이 홀수 위치에만 나타나므로
// 10101010101... 형태의 mask를 만들어 & 연산을 해서 해당하는지 보면 된다.
// 역시 배워야 할 것들이 많다.

class Solution {
public:
    bool isPowerOfFour(int n) {
        return n > 0 && (n & (n - 1)) == 0 && ((n & 0x55555555) != 0);
    }
};
