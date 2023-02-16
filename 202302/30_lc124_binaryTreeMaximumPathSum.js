// LeetCode 124 Binary Tree Maximum Path Sum

// array에서 연속한 최대합을 구하는 dp문제처럼 풀은 문제
const maxPathSum = (root) => {
  let ans = -Infinity; // 전체 트리의 max 값 저장

  // tree를 순회하면서 root와 "연결된" path의 최대 합을 return하는 함수
  const dfs = (root) => {
    if (!root) return 0; // 합이기 때문에 영향을 주지 않는 0을 base case로 설정

    const left = dfs(root.left); // root와 연결된 left path의 최대 합 (root 포함x)
    const right = dfs(root.right); // root와 연결된 right path의 최대 합 (root 포함 x)

    // 전체 트리 최대 값 갱신
    ans = Math.max(
      ans, // 이전 값이 여전히 최대일 수도 있고
      root.val, // 현재 root의 값만 넣은 것이 최대일 수도 있고
      root.val + left, // 현재 root에서 왼쪽으로만 내려가야 최대일 수도 있고
      root.val + right, // 현재 root에서 오른쪽으로만 내려가야 최대일 수도 있고
      root.val + left + right, // 현재 root에서 왼오 모두 내려가야 최대일 수 있다.
    );

    // root와 연결된 max값을 return해야 하기 때문에
    // root.val일 수도 있고, root.val + left, root.val right일 수도 있다.
    return Math.max(root.val, root.val + left, root.val + right);
  };

  dfs(root);

  return ans;
};
