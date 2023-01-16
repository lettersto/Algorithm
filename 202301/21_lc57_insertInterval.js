// LeetCode 57 Insert Interval

// 이 무슨 백준같은 문제가.....
// 테스트 케이스 계속 뭔가 하나씩 엇나가는 채로 2시간이 넘어가서
// 결국 다른 사람 걸 보고 풀게 되었다.

const insert = function (intervals, newInterval) {
  const N = intervals.length;
  const [newS, newE] = newInterval;

  // 1. bisect를 이용해
  // intervals에 newInterval이 들어갈 자리를 구한다.
  const underBound = () => {
    let left = 0;
    let right = N;  // 맨 끝에도 들어갈 수 있으니, N - 1이 아닌 N까지로

    let res = N;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);

      // intervals가 [[2, 3]] 처럼 길이가 1인 경우
      // mid의 범위가 벗어나게 되므로 예외 처리 필요
      if (mid > N - 1) {
        break;
      }

      if (newS <= intervals[mid][0]) {
        res = Math.min(res, mid);
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    }

    return res;
  };

  const idx = underBound();
  intervals.splice(idx, 0, newInterval);

  const ans = [];

  // 2. stack을 이용해 intervals 정리하기
  // a. stack에 아무 것도 없다면, stack에 바로 push
  // b. stack top의 end가 newInterval의 start보다 작다면,
  //    newInterval과 겹치지 않으므로 stack에 push
  for (const [s, e] of intervals) {
    // a도 b도 아닌 경우
    if (ans.length && ans.at(-1)[1] >= s) {
      const [topS, topE] = ans.pop();
      // 이때 겹치는 구간의 start는 항상 겹치는 것들의 min값이 되어야 하는데
      // 이는 bisect로 이미 보장이 되므로 그대로 topS를 넣으면 된다.
      // 하지만, topE는 max값임이 보장이 되지 않으므로, 계속해서 max값을 찾아준다.
      ans.push([topS, Math.max(topE, e)]);
    } else {
      ans.push([s, e]);
    }
  }

  return ans;
};