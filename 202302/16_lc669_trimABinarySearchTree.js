// LeetCode 668 Trim a Binary Search Tree

// 450번 문제와 유사해서 풀 수 있었다.
const trimBST = (root, low, high) => {
  // 1. Tree가 아예 없으면 그냥 return null
  if (!root) return null;

  // 2. node의 value가 low보다 작다면
  if (root.val < low) {
    // 2 - 1. node가 leaf node인 경우와 left subtree만 있는 경우에는
    //        subtree의 root는 null이 된다.
    //        left subtree의 값들은 low보다 클 수 없기 때문이다.
    if ((!root.left && !root.right) || !root.right) {
      root = null;
    // 2 - 2. right subtree가 있거나, left와 right subtree가 모두 있는 경우
    //        역시 left subtree는 low보다 항상 작을 것이기 때문에
    //        right subtree만 고려한다.
    //        root에 right subtree를 끌어 올리고, trim 
    } else {
      root = trimBST(root.right, low, high);
    }
  // 3. node의 value가 high보다 크다면,
  //    left subtree를 root로 끌어올린다.
  //    left subtree는 root.value보다 값이 작기 때문에, < high일 가능성이 있기 때문
  } else if (root.val > high) {
    root = trimBST(root.left, low, high);
  // 4. low와 high 범위 안에 있다면
  //    root.left에는 left subtree를 가져오고, root.right에는 right subtree를 가져온다.
  } else {
    root.left = trimBST(root.left, low, high);
    root.right = trimBST(root.right, low, high);
  }

  // 이렇게 바뀐 root를 return한다.
  return root;
};
