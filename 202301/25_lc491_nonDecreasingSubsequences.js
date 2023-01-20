// LeetCode 491 Non-decreasing Subsequences

// backtracking
const findSubsequences = function (nums) {
  const strSequences = new Set();
  const visit = Array.from({ length: nums.length }, () => false);

  const backtracking = (depth, idx, strV) => {
    if (depth >= 2) {
      if (strSequences.has(strV)) {
        return;
      }
      strSequences.add(strV.substring(1));
    }

    if (depth === nums.length) {
      return;
    }

    for (let i = idx + 1; i < nums.length; i++) {
      if (!visit[i] && (strV === '' || +strV.substring(strV.lastIndexOf('+') + 1) <= nums[i])) {
        visit[i] = true;
        backtracking(depth + 1, i, `${strV}+${nums[i]}`);
        visit[i] = false;
      }
    }
  };

  backtracking(0, -1, '');

  const ans = [];
  strSequences.forEach((strV) => ans.push(strV.split('+').map(Number)));

  return ans;
};


// 1. JS object의 key는 string이다.
//    그렇기 때문에 object에 array를 key로 사용하면
//    arr.toString()이 적용되어 들어가는 것으로 추측된다.
//    https://stackoverflow.com/questions/10173956/how-to-use-array-as-key-in-javascript

// 2. tuple도 없는 js에서 어떻게 array가 이미 만들어져 있는지 확인할 수 있을까?
//    위에서는 직접 string template을 이용해서 치환했지만,
//    1의 성질을 이용하면 좀 더 쉽게 치환이 가능하다.

// const obj = {};
// obj[[1, 2]] = true;

// console.log(obj);  // { '1,2': true }
// console.log(obj[[1, 2]]);  // true

const findSubsequences2 = function (nums) {
  const strSequences = {};
  const ans = [];
  
  // 생각해보니 idx로 이전 idx는 가지 않도록 막고 있으니,
  // 굳이 visit이나 depth도 필요없다.

  const backtracking = (idx, arr) => {
    if (arr.length >= 2) {
      if (strSequences[arr]) {
        return;
      }
      strSequences[arr] = true;
      strSequences.push(arr);
    }

    for (let i = idx + 1; i < nums.length; i++) {
      if (arr.at(-1) > nums[i]) {
        continue;
      }
      backtracking(i, [...arr, nums[i]]);
    }
  };

  backtracking(-1, []);

  return ans;
};