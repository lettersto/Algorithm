// LeetCode 190. Reverse Bits

// 32개의 bit를 앞에서부터 확인해 나가면서 1이라면
// 역방향으로 res의 1을 채워주는 방식
#include <cstdint>

class Solution {
public:
    uint32_t reverseBits(uint32_t n) {
        uint32_t res {0};  // int 여도 상관 없는 듯
        for (int i = 0; i < 32; i++) {
            if ((n & (1 << i)) != 0) {
                res |= (1 << 32 - i - 1);
            }
        }
        return res;
    }

    // 다른 사람 풀이
    // 16진법을 이용해서 bitmask 패턴을 나타낼 수 있다는 점이 좋은 것 같다.
    // divide & conquer로 절반씩 앞뒤를 바꾸는 것도 좋은 것 같다.
    uint32_t reverseBits2(uint32_t n) {
        n = ((n & 0xffff0000) >> 16) | ((n & 0x0000ffff) << 16);
        n = ((n & 0xff00ff00) >> 8) | ((n & 0x00ff00ff) << 8);      
        n = ((n & 0xf0f0f0f0) >> 4) | ((n & 0x0f0f0f0f) << 4);      
        n = ((n & 0xcccccccc) >> 2) | ((n & 0x33333333) << 2);
        n = ((n & 0xaaaaaaaa) >> 1) | ((n & 0x55555555) << 1);      
        return n;
    }
};
