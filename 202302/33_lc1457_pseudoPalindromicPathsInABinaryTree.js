// LeetCode 1457 Pseudo-Palindromic Paths in a Binary Tree

// dfs로 path를 체크하면서
// 각 숫자가 얼마나 빈번하게 나오는지 센다.

// palindrome을 만들 수 있으려면
// 나오는 횟수가 짝수이거나,하나만 홀수여야 한다.
// 즉, 홀수 cnt가 0이나 1
const pseudoPalindromicPaths = (root) => {
  let ans = 0;

  const dfs = (root, frequency) => {
    if (!root) return;

    const newFrequency = {...frequency};
    newFrequency[root.val] = (newFrequency[root.val] ?? 0) + 1;

    if (!root.left && !root.right) {
      let oddCnt = 0;
      for (const val of Object.values(newFrequency)) {
        if (val % 2 === 1) {
          oddCnt += 1;
        }
      }
      ans += oddCnt <= 1 ? 1 : 0;
      return;
    }

    dfs(root.left, newFrequency);
    dfs(root.right, newFrequency);
  };

  dfs(root, {});

  return ans;
};

// 다른 사람 풀이 - bitmasking
// 항상 bitmasking은 어떻게 생각해내는지 참 대단하다.
// https://leetcode.com/problems/pseudo-palindromic-paths-in-a-binary-tree/solutions/2573237/leetcode-the-hard-way-explained-line-by-line/

// ✔️ XOR operation
// a ^ b: 쉽게 생각해보면 a === b ? 0 : 1로도 생각할 수 있다.
// 0 ^ 0 = 0
// 1 ^ 1 = 0
// 0 ^ 1 = 1
// 1 ^ 0 = 1

// ✔️ frequency는 bit로 표시한다.
// 1이라면 홀수번, 0이라면 짝수번 나온 것이다.
// frequency가 1100 이었다면 3과 2는 홀수번 1은 짝수번 나온 것으로 간주한다.

// frequency = frequency ^ (1 << root.val)
// 만약 3이 한번 더 나오면 짝수번으로 바꿔줘야 한다.
// 이때 1 << 3을 해서 1000을 만들어 준다음
// 1100 ^ 1000 해준다. 그러면 0100이 되어 짝수번으로 바뀐다.

// 짝수였는데 홀수로 바꾸는 것도 마찬가지이다.
// 1100에서 1이 한번 더 나오면, 1 << 1인 0010으로
// 1100 ^ 0010 = 1110 이 되어 1의 frequency는 홀수로 바뀐다.

// ✔️ 이후 frequency에서 1이 한 번이나 0 번만 보이면, palindrome이다.
// 그런데 이걸 직접 셀 수도 있지만,
// frequency & (frequency - 1)을 사용할 수도 있다.
// 이때 1이 한 번이나 0번만 있었다면, 값이 0이 되고, 아니면 0이 아닌 값이 된다.
// https://stackoverflow.com/questions/4678333/n-n-1-what-does-this-expression-do

// 이건 사실 2의 배수인 숫자인지 확인하는 용도이다.
// 2의 배수 (+ 0, 1 예외)라면 0000, 0001, 0010, 0100, 1000 으로,
// 모두 0이거나 1이 하나만 존재한다.
// 2의 배수에서 1을 빼면 1000 같은 경우 0111이 된다.
// 즉, 맨 앞의 1의 위치의 값은 0이 되고, 그 이후는 모두 1이된다.
// 이걸 & 연산하면 0000으로 모두 0이 된다.
// 위의 연산은 이러한 성질을 이용했다.

const pseudoPalindromicPaths2 = (root) => {
  let ans = 0;

  const dfs = (root, frequency) => {
    if (!root) return;

    const newFrequency = frequency ^ (1 << root.val);

    if (!root.left && !root.right) {
      ans += (newFrequency & (newFrequency - 1)) === 0;
      return;
    }

    dfs(root.left, newFrequency);
    dfs(root.right, newFrequency);
  };

  dfs(root, 0);

  return ans;
};
