// LeetCode 371. Sum of Two Integers

// 공부가 필요했던 문제
// (예) a = 3, b = 7 일 때
// 4 bit로 표현하면 a = 0011 b = 0111

// 1. a ^ b로 carry를 생각하지 않고 a와 b를 덧셈
//    0011
//   +0111
//   =0100

// 2. (a & b) << 1 로 carry만 별도로 구하기
//    carry = 0110
//    carry 가 0이 아니란 것은 아직 carry를 더해줘야 한다는 것

// 3. 1의 결과를 a로 2의 결과를 b로 해서, a ^ b와 (a & b) << 1을 반복
//    0100
//   +0110 ... a ^ b
//   =0010 
//   carry = 1000 ... (a & b) << 1

//    0010
//   +1000 ... a ^ b
//   =1010
//   carry = 0000 ... (a & b) << 1
//   => 이처럼 carry가 0이 된 순간의 a ^ b가 바로 두 수의 합 1010 = 십진수 10

// 이때 C++에서는
// 음수에 << 를 지원하지 않음 (undefined behavior)
// 하지만, 숫자가 음수인지 양수인지보다는 어떤 자리에 bit가 있는지 carry를 표시하는 것이 중요하고,
// carry의 overflow는 버리면 되니 그냥 unsigned int로 바꿔서 사용
// signed에서 이진수 1001이 -7이었다면, unsigned에서는 9가 되겠지만,
// 중요한 것은 1001이라는 숫자 표기 자체이지 이게 십진수로 어떤 값이 되는지가 아님!
// 그렇기 때문에 unsigned int로 바꿔도 아무 문제가 없다.

class Solution {
public:
    int getSum(int a, int b) {
        return b == 0 ? a : getSum(a ^ b, static_cast<unsigned int>(a & b) << 1);
    }
};
