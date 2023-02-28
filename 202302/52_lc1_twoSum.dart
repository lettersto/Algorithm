// LeetCode 1 Two Sum
// ㅠㅠㅠㅠㅠㅠㅠ dart 왜 이래애애 ㅠㅠ

class Solution {
  List<int> twoSum(List<int> nums, int target) {
    final numMap = Map<int, int>();

    for (var i = 0; i < nums.length; i++) {
      // numMap.containsKey()도 사용 가능
      if (numMap[target - nums[i]] != null) {
        // 위에서 null이 아닌 경우라고 했는데도
        // 아래에서 !로 해줘야 에러가 발생하지 않는다.
        return [numMap[target - nums[i]]!, i];
      }
      numMap[nums[i]] = i;
    }
    return [];
  }
}
