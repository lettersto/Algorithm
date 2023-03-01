class Solution {
  List<int> merge(List<int> list1, List<int> list2) {
    final List<int> mergedList = [];
    var i = 0;
    var j = 0;

    while (i < list1.length && j < list2.length) {
      if (list1[i] <= list2[j]) {
        mergedList.add(list1[i]);
        i += 1;
      } else {
        mergedList.add(list2[j]);
        j += 1;
      }
    }

    while (i < list1.length) {
      mergedList.add(list1[i]);
      i += 1;
    }

    while (j < list2.length) {
      mergedList.add(list2[j]);
      j += 1;
    }

    return mergedList;
  }

  List<int> sortArray(List<int> nums) {
    // wihtout using any built in functions... merge sort?
    if (nums.length <= 1) return nums;

    final mid = nums.length ~/ 2;

    var left = sortArray(nums.sublist(0, mid));
    var right = sortArray(nums.sublist(mid));

    return merge(left, right);
  }
}
