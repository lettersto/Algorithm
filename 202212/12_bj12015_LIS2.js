// 백준 12015 가장 긴 증가하는 부분 수열 2
// 백준 12738 가장 긴 증가하는 부분 수열 3

/**
 * O(n ** 2)을 O(nlogn)으로 줄이는 방법
 * 즉, LIS1과 달리 for문을 하나로 줄이기
 * 
 * 1. 수열 arr을 한번 쭉 훑는다 - O(n)
 * 2. 그러면서 subsequence array를 생성한다.
 * 3. subsequence의 basecase는 subsequence[0] = arr[0];
 * 4. a) subsequence[-1]의 값이 arr[i]값과 같다면 pass
 *    b) subsequence[-1] < arr[i] 이라면 subsequence.push(arr[-1])
 *    c) subsequence[-1] > arr[i] 이라면 
 *    subsequence에 들어있는 값 중 binarySearch로 
 *    arr[i]보다 "크거나 같은 값 중" 최소값의 위치 index를 구해
 *    그곳에 subsequence[index] = arr[i]
 * 5. 즉, 여태까지 나온 최대 길이는 보존하면서 
 *    array값을 점점 더 작은 값으로 대체
 *    기존 값이 모두 대체가 된다면 다시 push가 일어나면서 최대 길이 갱신
 */

const fs = require('fs');

let [N, arr] = (
  process.platform === 'linux'
    ? fs.readFileSync('/dev/stdin').toString().trim()
    : `8
30 1 9 40 7 5 4 90`
).split('\n');

N = +N;
arr = arr.split(' ').map(Number);

// base case
const subsequence = [arr[0]];

const binarySearch = (num) => {
  let left = 0;
  let right = subsequence.length - 1;

  let ans = right;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (subsequence[mid] >= num) {
      ans = Math.min(ans, mid);
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }
  return ans;
};


for (let i = 1; i < N; i++) {
  const curMaxNum = subsequence[subsequence.length - 1];
  if (curMaxNum < arr[i]) {
    subsequence.push(arr[i]);
  }
  if (curMaxNum > arr[i]) {
    const idx = binarySearch(arr[i]);
    subsequence[idx] = arr[i];
  }
}

console.log(subsequence.length);
