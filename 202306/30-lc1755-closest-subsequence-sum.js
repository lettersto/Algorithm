// LeetCode 1755. Closest Subsequence Sum

// meet in the middle이라는 approach
// 계속 meet in the middle이라는 말이 보여서 뭔가 하고 관련 문제를 풀어보는데
// 난이도가 너무 어려웠다..

// 1. array를 반반으로 나누기
// 2. 각 array마다 subset sum을 만들기
// 3. 하나는 linear search 다른 하나는 binary search로 찾아
//    합쳐서 goal에 가까워지도록 ..

const minAbsDifference = function (nums, goal) {
  const n = nums.length;
  const halfIdx = Math.floor(n / 2);

  //  get subset sums from left half and right half array
  const leftArr = nums.slice(0, halfIdx);
  const rightArr = nums.slice(halfIdx);

  const leftSums = new Set();
  const rightSums = new Set();

  const dfs = (depth, arr, sums, curS = 0) => {
    if (depth === arr.length) {
      sums.add(curS);
      return;
    }

    dfs(depth + 1, arr, sums, curS);
    dfs(depth + 1, arr, sums, curS + arr[depth]);
  };

  dfs(0, leftArr, leftSums);
  dfs(0, rightArr, rightSums);

  // do binary search
  const sortedRightSums = Array.from(rightSums); // for binary search
  sortedRightSums.sort((a, b) => a - b);

  const binarySearch = (key) => {
    let left = 0;
    let right = sortedRightSums.length - 1;

    let res = 0;
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);

      if (sortedRightSums[mid] <= key) {
        res = Math.max(res, mid);
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
    return res;
  };

  let ans = Infinity;

  leftSums.forEach((sumV) => {
    const diff = goal - sumV;
    const idx = binarySearch(diff);

    ans = Math.min(ans, Math.abs(diff - sortedRightSums[idx]));
    if (idx + 1 <= sortedRightSums.length - 1) {
      ans = Math.min(ans, Math.abs(diff - sortedRightSums[idx + 1]));
    }
  });

  return ans;
};
