// LeetCode 452 Minimum Number of Arrows to Burst Balloons
// sort + greedy로 풀은 문제

// 1. 먼저 points를 오름차순으로 정렬 
// 2. 정렬된 points를 순서대로 따라가면서 아래의 작업 반복

// 3. 맨 처음 풍선의 끝, Xend를 기록해둔다. 이 Xend는 어떤 풍선들의 구간의 min Xend를 의미한다.
// 4. 그 이후 나오는 풍선들은 풍선 시작점인
//    Xstart가 minXEnd를 넘어서지 않는다면 한 번에 터트릴 수 있다.
//    이때 새로운 풍선의 Xend와 기존에 기록해둔 minXEnd 중 min값을 minXEnd에 계속 기록한다.
// 5. Xstart가 minXEnd를 넘어선다면 다른 풍선 구간의 시작이다.
//    그러므로 minXEnd를 새로운 Xend로 바꿔준다. 그리고 한 번 더 터트려야 하므로 arrow += 1

const findMinArrowShots = function(points) {
  points.sort((a, b) => a[0] === b[0] ? a[1] - b[1] : a[0] - b[0]);

  let ans = 1;
  let maxV = points[0][1];
  for (let i = 1; i < points.length; i++) {
    if (points[i][0] <= maxV) {
      maxV = Math.min(maxV, points[i][1]);
    } else {
      maxV = points[i][1];
      ans += 1;
    }
  }
  return ans;
};
