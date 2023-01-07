// LeetCode 134 Gas Station

// 처음 풀이
// gas - cost를 해서 각 idx에서부터 시작해 한 바퀴씩 돌리며,
// "음수가 한 번이라도 나오면 다음 idx로 넘어가고, 아니면 계속 진행"
// 사실상 O(n ** 2)가 아니었을까
// gas[i] === 0인 경우는 뛰어 넘어야 시간 초과가 발생하지 않는다
const canCompleteCircuit = function (gas, cost) {
  const N = gas.length;
  gas.forEach((g, idx) => (cost[idx] = g - cost[idx]));

  let ans = -1;
  for (let i = 0; i < N; i++) {
    if (gas[i] === 0) continue;
    let sumV = 0;
    let broken = false;
    for (let j = 0; j < N; j++) {
      sumV += cost[(i + j) % N];
      if (sumV < 0) {
        broken = true;
        break;
      }
    }
    if (!broken) {
      ans = i;
      break;
    }
  }

  return ans;
};

// 다른 사람 풀이 O(n)
// https://leetcode.com/problems/gas-station/solutions/3011271/python-3-2-6-lines-w-explanation-and-example-t-m-99-98/
// 음수가 나오는 경우에 idx를 새로 부여하고, 아니라면 그 index를 그대로 진행
const canCompleteCircuit2 = function (gas, cost) {
  // 1. 아예 답이 없는 케이스는 처음에 sum(gas)와 sum(cost)를 비교해 gas의 합이 cost의 합보다 적으면 불가능하다고 가려냄
  // 그렇기 때문에 이 if를 통과한 이후 부터는 무조건 답이 하나는 있다.
  if (
    gas.reduce((acc, g) => acc + g, 0) < cost.reduce((acc, c) => acc + c, 0)
  ) {
    return -1;
  }

  let idx = 0; // 답으로 추정되는 idx
  let tank = 0; // idx부터 남아 있는 gas 값

  // tank가 0보다 작아지면, 그 idx는 불가능 한 것이므로
  // 다음 idx로 갈아끼우기
  // tank가 0보다 작아지지 않는다면 그대로 진행
  for (let i = 0; i < gas.length; i++) {
    if (tank + gas[i] - cost[i] < 0) {
      tank = 0;
      idx = i + 1;
    } else {
      tank += gas[i] - cost[i];
    }
  }
  // 0 1 2 3 4 에서 3, 4 모두 if문에서 양수일 때
  // 3이 잘못된 숫자였을 가능성은 없는가? 그리고 그대신 4가 올바른 답일 가능성은?
  // -> 3에서 4로 넘어가는 것이 양수였기 때문에, 3이 가능했던 것.
  // 4에서 시작하는 것은 가능한지 불가능한지 모른다.
  // 하지만, 양수를 더하는 것(3을 포함하는 것)이 이득이 되면 되었지,
  // (0이상을 유지해야 하고 남은 gas가 크면 클 수록 루트를 모두 순회할 가능성이 높아지므로)
  // 빼는 것이(3 이후부터 시작하는 것이) 이득이 되지는 않는다. 오히려 뺐을 때 4부터 시작하는 것이 안 되는 경우가 될 수도 있다.
  return idx;
};
