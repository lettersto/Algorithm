// leetcode 46. Permutations

const permute = function (nums) {
  const N = nums.length;
  const visit = new Array(nums.length).fill(false);
  const ans = [];

  const dfs = (depth, arr) => {
    if (depth === N) {
      ans.push([...arr]);
      return;
    }

    for (let i = 0; i < N; i++) {
      if (visit[i]) continue;
      visit[i] = true;
      dfs(depth + 1, [...arr, nums[i]]);
      visit[i] = false;
    }
  };

  dfs(0, []);

  return ans;
};
