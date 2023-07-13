// LeetCode 268. Missing Number

#include <vector>

using namespace std;

// 오늘도 그냥은 못 풀었을 xor 문제

// runtime error: shift exponent 45 is too large for 32-bit type 'int' (solution.cpp)
// class Solution {
// public:
//     int missingNumber(vector<int>& nums) {
//         int mask {0};

//         for (int &num: nums) {
//             mask |= (1 << num);
//         }

//         for (size_t i = 0; i < size(nums) + 1; i++) {
//             if ((mask & (1 << i)) == 0) {
//                 return i;
//             }
//         }

//         return -1;
//     }
// };


/*
XOR
1) a ^ a = 0
    
    e.g. 0010 XOR 0010 = 0000
    e.g. 1 ^ 1 = 0

2) b ^ a ^ a = b
    e.g. 1010 XOR 0010 XOR 0010 = 1010 

3) XOR은 교환법칙과 결합법칙이 성립 

*/

// nums idx와 nums 안의 item을 res에 계속 xor하기
// 그러다보면 idx와 nums 간 중복되는 숫자가 나오고, 이는 0 처리되어 사라진다.

class Solution {
public:
    int missingNumber(vector<int>& nums) {
        int res {static_cast<int>(nums.size())};  
        // i는 size까지 가야하지만, nums의 item은 size -1 까지만 가기 때문에
        // 그 차이를 메꾸기 위해 size로 초기화
        int i {0};

        for (int &num: nums) {
            res ^= num;
            res ^= i;
            i++;
        }

        return res;
    }
};
