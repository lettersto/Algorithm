// LeetCode 739 Daily Temperatures

const dailyTemperatures = (temperatures) => {
  const stack = [];
  const ans = new Array(temperatures.length).fill(0);

  for (let i = 0; i < temperatures.length; i++) {
    if (!stack.length) {
      stack.push([i, temperatures[i]]);
      continue;
    }

    while (stack.length > 0 && stack[stack.length - 1][1] < temperatures[i]) {
      const tmp = stack.pop();
      ans[tmp[0]] = i - tmp[0];
    }

    stack.push([i, temperatures[i]]);
  }

  return ans;
};
