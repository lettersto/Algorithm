// LeetCode 918 Maximum Sum Circular Subarray

// 다른 사람 풀이 보고 이해한 문제
// 발상의 전환이 필요하다.

// 핵심) array에서 연속한 수의 합이 "최대"가 된다면,
// 남은 수의 합은 "최소"가 된다.
// => 전체 합 - 연속한 수의 최소 합 = 최대 합

// 1. 순환하는 array라고 생각하지 않고 연속한 subarray의 합의 최대를 DP로 구한다.
// 2. 순환해서 맞붙는 쪽의 subarray가 최대일 수도 있는데, 이는 구하기가 힘들다.
//    그렇기 때문에, 순환하는 array라고 생각하지 않고, 연속한 subarray의 합의 최소를 구한다.
//    그래서 전체 합 - 최소 합하여 순환해서 붙는 쪽의 최대를 구한다.
// 3. 1과 2에서 나온 값 중 Max값이 답이 된다.

const maxSubarraySumCircular = function (nums) {
  let total = nums[0];  // 전체 합
  let tmpMax = nums[0];  // 해당 idx 지점에서 연속 최대 합
  let nonCircularMax = nums[0]; // 0 ~ idx 중 연속 최대합
  let tmpMin = nums[0]; // 해당 idx 지점에서 연속 최소 합 (dp)
  let circularMin = nums[0]; // 0 ~ idx 중 연속 최소합

  for (let i = 1; i < nums.length; i++) {
    tmpMax = Math.max(tmpMax + nums[i], nums[i]);
    nonCircularMax = Math.max(nonCircularMax, tmpMax);
    tmpMin = Math.min(tmpMin + nums[i], nums[i]);
    circularMin = Math.min(circularMin, tmpMin);
    total += nums[i];
  }

  const ans = Math.max(nonCircularMax, total - circularMin);

  // [-3,-2,-3]과 같은 경우 ans가 0이 뜬다. total - circularMin이 0이 되었기 때문
  // 그 말은 즉, 아무 것도 포함하지 않겠다는 의미가 된다.
  // == array의 모든 숫자를 더하니 최소가 되었다는 의미 => 순환하는 쪽에서 max가 나올 리가 없다.
  // 그러니 순환하지 않는 쪽의 max를 가져다 써야 한다.
  // return ans !== 0 ? ans : nonCircularMax; 를 해도 통과한다. 
  return ans > 0 ? ans : nonCircularMax;
};
