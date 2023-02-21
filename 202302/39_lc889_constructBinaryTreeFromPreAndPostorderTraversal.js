// LeetCode 889 Construct Binary Tree from Preorder and Postorder Traversal

// 다른 사람 풀이도 따라해보다가 결국 내 풀이로 돌아오게 되었는데,
// 거기에 다른 사람 풀이도 조금 섞었다.
// stack overflow가 난다면 left, right로 갈 때 범위 설정을 잘못한 것이다
// 반드시 하나의 변수만으로 나머지 범위까지 세우자...

const constructFromPrePost = (preorder, postorder) => {
  const map = {};
  const N = preorder.length;

  postorder.forEach((val, idx) => (map[val] = idx));

  const build = (preStart, preEnd, postStart, postEnd) => {
    if (preStart > preEnd) return null;

    const rootVal = preorder[preStart];
    const root = new TreeNode(rootVal);

    // 이 부분이 추가됐다
    if (preStart === preEnd) return root;

    const leftRootVal = preorder[preStart + 1];
    const postLeftEnd = map[leftRootVal];
    const leftLength = postLeftEnd - postStart + 1;

    root.left = build(
      preStart + 1,
      preStart + leftLength,
      postStart,
      postLeftEnd,
    );
    root.right = build(
      preStart + leftLength + 1,
      preEnd,
      postLeftEnd + 1,
      postEnd - 1,
    );

    return root;
  };

  return build(0, N - 1, 0, N - 1);
};
