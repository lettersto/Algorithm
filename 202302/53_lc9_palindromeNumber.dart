// LeetCode 53 Palindrome Number

class Solution {
  bool isPalindrome(int x) {
    var num = x.toString();
    // string reverse는 딱히 method가 없다.
    // list를 reversed해서 만들기
    var reversedNum = num.split('').reversed.join('');
    return num == reversedNum;
  }
}
