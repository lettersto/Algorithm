// LeetCode 149 Mas Points on a Line

// 다른 방법이 있을까 머리를 굴려봤지만, dp도 union find도 불가능 해 보여서
// brute force에 가깝게 풀었다. O (n ** 2)

// 오랜만에 보는 기울기 문제
// 각 점마다 key를 방정식 식으로 하고, value를 이 방정식에 속하는 점들의 set으로 했다
// x = k, y = k, y = nx + k의 경우로 나눠서 했는데
// y = k와 y = nx + k는 굳이 나눌 필요는 없다. y = k는 n이 0인 것과 같기 떄문
// 하지만 x = k는 반드시 분리해주는 것이 좋다. 기울기가 zero division이라 Infinity가 뜬다.

// 메모리 효율은 죽어버렸는데,, 고치려면 수학 공부를 더해야 해서 일단 패스...
// atan2를 쓰더라...

// 걱정되는 점은 key에 float가 들어간다는 점인데, float가 부정확하기 때문에 그대로 넣어도 되냐는 고민이 있었다.
// 일단 문제는 그대로 돌려도 통과했는데,
// 다른 사람 보니 소수점 다섯 째 자리에서 round한 사람도 있었다.

const maxPoints = function (points) {
  const map = new Map();
  for (let i = 0; i < points.length - 1; i++) {
    for (let j = i + 1; j < points.length; j++) {
      const xDiff = points[i][0] - points[j][0];
      const yDiff = points[i][1] - points[j][1];

      let k;
      let key;

      if (xDiff === 0) {
        // x = k
        k = points[i][0];
        key = `x=${k}`;
      } else if (yDiff === 0) {
        // y = k
        k = points[i][1];
        key = `y=${k}`;
      } else {
        // y = nx + k
        const n = yDiff / xDiff;
        k = points[i][1] - points[i][0] * n;
        key = `y=${n}x+${k}`;
      }

      const prev = map.get(key) ?? new Set();
      prev.add(points[i]).add(points[j]);
      map.set(key, prev);
    }
  }

  let maxV = 1;
  map.forEach((item) => (maxV = Math.max(maxV, item.size)));

  return maxV;
};
