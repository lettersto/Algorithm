// LeetCode 2389 Longest Subsequence With Limited Sum
// 이게 왜... easy...?
// 누적합 + binaray search + greedy인데...?

// 정렬된 array [1, 2, 4, 5]의 누적합은 [0, 1, 3, 6, 11] (맨 앞 0 추가)
// 이때 queries를 보면 [3, 10, 21]로
// 누적합에서 3보다 적거나 같은 값의 index = 2
// 누적합에서 10보다 적거나 같은 값의 index = 3
// 누적합에서 21보다 적거나 같은 값의 index = 4
// longest subsequence의 합과 일치하는 것을 알 수 있다. (greedy)
// 정렬된 array의 누적합에서는 index 0로부터 멀어질 수록
// subsequence의 길이도 길어지는 것이 당연하다.
// 이때 적거나 같은 값의 index는 binary search를 통해 upperbound를 구한다.

// 그런데 [4, 5, 2, 1]과 같이 정렬되지 않은 경우
// 3보다 적거나 같은 값을 내는 subsequence는 [2, 1]
// 10보다 적거나 같은 값을 내는 subsequence는 [5, 2, 1]
// 21보다 적거나 같은 값을 내는 subsequence는 [4, 5, 2, 1]
// 이처럼 정렬되지 않았을 때는 쉽게 예측이 불가능하다.
// 그렇기 때문에 정렬을 해서 풀어야 한다. (정말 이해가 잘 안 되는 지점 2)

// subsequence의 합일 때 순서가 중요한가? - 중요하지 않다.
// > subsequence의 개념을 잘못 알고 있었다.
// apple의 subsequence는 app, al 등이 될 수 있다. 연속하지 않아도 된다.
// [12, 1, 6, 1, 1, 1, 1, 1, 1, 1], queries[12]일 때
// expected [8]
// 정렬: [1, 1, 1, 1, 1, 1, 1, 1, 5, 12]
// 누적: [0, 1, 2, 3, 4, 5, 6, 7, 8, 14, 26]

const answerQueries = (nums, queries) => {
  const arr = nums.sort((a, b) => a - b);
  const accSum = [0];
  for (let i = 0; i < arr.length; i++) {
    accSum.push(accSum[i] + arr[i]);
  }
  
  const binarySearch = (val) => {
    let left = 0;
    let right = accSum.length - 1;

    let ans = 0;
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      if (accSum[mid] <= val) {
        ans = Math.max(ans, mid);
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
    return ans;
  };

  let res = [];
  for (let j = 0; j < queries.length; j++) {
    res.push(binarySearch(queries[j]));
  }
  return res;
};
