// LeetCode 135. Candy

// 그냥 rating 낮은 것부터 주위와 비교하면서 하나씩 채워갔는데
// 좀 더 잘 푸는 방법이 있을 것 같다.
// greedy라는데 greedy가 아닌 방식으로 풀었다...
const candy = function (ratings) {
  const candies = Array.from({length: ratings.length}, () => 0);

  const idxRatingMap = ratings.map((rating, i) => [rating, i]);
  idxRatingMap.sort((a, b) => a[0] - b[0]);

  for (let i = 0; i < idxRatingMap.length; i++) {
    const [R, idx] = idxRatingMap[i];
    const leftR = ratings[idx - 1] ?? 0;
    const rightR = ratings[idx + 1] ?? 0;
    const leftC = candies[idx - 1] ?? 0;
    const rightC = candies[idx + 1] ?? 0;

    if (R === leftR && R === rightR) {
      candies[idx] = 1;
    } else if (R > leftR && R > rightR) {
      candies[idx] = Math.max(leftC, rightC) + 1;
    } else if (R > leftR && R <= rightR) {
      candies[idx] = leftC + 1;
    } else if (R <= leftR && R > rightR) {
      candies[idx] = rightC + 1;
    } else {
      candies[idx] = 1;
    }
  }

  return candies.reduce((prev, cur) => prev + cur, 0);
};

// greedy 풀이 방식
// 0에서부터 보면서 왼 < 오면 오른쪽에 += 1
// n - 1에서부터 다시 보면서 왼 > 오 면 왼쪽에 += 1
const greedyCandy = function (ratings) {
  const n = ratings.length;
  const candies = Array.from({length: n}, () => 1);

  for (let i = 0; i < n - 1; i++) {
    if (ratings[i] < ratings[i + 1]) {
      candies[i + 1] = candies[i] + 1;
    }
  }

  for (let i = n - 1; i > 0; i--) {
    if (ratings[i - 1] > ratings[i]) {
      candies[i - 1] = Math.max(candies[i - 1], candies[i] + 1);
    }
  }

  return candies.reduce((prev, curv) => prev + curv, 0);
};
