const minCostClimbingStairs = (cost) => {
  cost.push(0);  // top of stairs
  const stairs = new Array(cost.length).fill(0);

  // base case
  stairs[0] = cost[0];
  stairs[1] = cost[1];
  
  for (let i = 2; i < cost.length; i++) {
    stairs[i] = Math.min(cost[i] + stairs[i - 1], cost[i] + stairs[i - 2]);
  }
  
  return stairs[stairs.length - 1];
};

// array를 안 쓰는 경우
const minCostClimbingStairs2 = (cost) => {
  cost.push(0);  // top of stairs
  let prev = cost[0];
  let cur = cost[1];

  for (let i = 2; i < cost.length; i++) {
    [prev, cur] = [cur, Math.min(cost[i] + prev, cost[i] + cur)];
  }

  return cur;
};

