// LeetCode 371. Sum of Two Integers

// 문제와 상관 없이 c++에 익숙해질 겸
// 2의 보수를 이용한 이진수의 합을 사람이 풀듯이 구현해보는데 노가다다 정말...
// bit operation을 알아야 하는 이유인듯!😆
// 쓸모없는 일을 하니 재미있다.

#include <string>
#include <cmath>
#include <utility>

using namespace std;

class Solution {
public:
    const int BIT_LIMIT {12};
    // 숫자가 [-1000, 1000] 이니 합도 [-2000, 2000]
    // sign이 될 bit 1개를 제외하면 필요한 비트는 최소 11개
    // 2 ** 10 = 1024, 2 ** 11 = 2048

    string getBinaryString(int num) {
        /*
        양수를 받아 12 bit 길이의 이진수로 바꿔서 출력 
        e.g. 3 -> 000 000 000 011
        */
        string res;
        while (num != 0) {
            res = to_string(num % 2) + res;
            num /= 2;
        }

        for (int i = static_cast<int>(res.length()); i < BIT_LIMIT; i++) {
            res = "0" + res;
        }

        return res;
    }

    string getTwoComplement(string num) {
        /*
        12 bit 길이의 이진수를 받아 2's complement로 변환
        e.g. 000 000 000 011 (3) -> 111 111 111 101 (-3)
        */
        string oneComplement;
        int size {static_cast<int>(num.length())};
        
        for (int i = 0; i < size; i++) {
            oneComplement += (num[i] == '0' ? '1' : '0');
        }

        string twoComplement;
        int carry {1};

        for (int i = size - 1; i >= 0; i--) {
            if (carry == 1 && oneComplement[i] == '1') {
                twoComplement = "0" + twoComplement;
                carry = 1;
            } else {
                string nextNum = ((carry == 1 || oneComplement[i] == '1') ? "1" : "0");
                twoComplement = nextNum + twoComplement;
                carry = 0;
            }
        }

        return twoComplement;
    }

    pair<string, string> decimalToBinary(int a, int b) {
        /*
        두 정수를 받아 12 bit의 이진수로 바꿔 리턴하는 함수
        e.g. -3, 7 -> 111 111 111 101, 000 000 000 111
        */
        
        // 1. 각 정수의 양수 버전의 이진수 가져오기
        int absA {abs(a)};
        int absB {abs(b)};

        string strA = getBinaryString(absA);
        string strB = getBinaryString(absB);
        int lenA = static_cast<int>(strA.length());
        int lenB = static_cast<int>(strB.length());

        // 2. 음수라면 이진수를 2's complement로 변경하기
        if (a < 0) {
            strA = getTwoComplement(strA);
        }

        if (b < 0) {
            strB = getTwoComplement(strB);
        }

        return {strA, strB};
    }

    int getDecimalFromBinary(string num) {
        /*
        2진수 string 숫자를 10진수로 바꾸기
        stoi 함수는 two's complement를 구별하지 못하는 것으로 보인다.
        그러므로 양수일 때는 그냥 stoi를 사용하고
        음수일 때는 최상위 비트만 음수로 바꿔 계산
        */


        // 양수인 경우
        if (num[0] == '0') {
            return stoi(num, 0, 2);
        }

        // 음수인 경우
        size_t i {0};
        int firstOne {0};

        for (i = 0; i < num.length(); i++) {
            if (num[i] == '0') {
                firstOne = BIT_LIMIT - i;
                break;
            }
        }

        string lastPart = num.substr(i);
        if (lastPart == "") {
            lastPart = "0";
        }

        return (-1) * pow(2, firstOne) + stoi(lastPart, 0, 2); 
    }

    int getSum(int a, int b) {
        /*
        두 수의 합을 구하기
        */
        pair<string, string> binaryStrings = decimalToBinary(a, b);

        string binaryA {binaryStrings.first};
        string binaryB {binaryStrings.second};

        string stringSum;
        int carry {0};

        // 덧셈 수행
        for (int i = static_cast<int>(binaryA.length()) - 1; i >= 0; i--) {
            int tmp = (binaryA[i] - '0') + (binaryB[i] - '0') + carry;
            if (tmp >= 2) {
                carry = 1;
                stringSum = to_string(tmp % 2) + stringSum;
            } else {
                carry = 0;
                stringSum = to_string(tmp) + stringSum;
            }
        }

        return getDecimalFromBinary(stringSum);
    }
};
