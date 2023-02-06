// LeetCode 530 Minimum Absolute Difference in BST

// BST 어떻게 이용해야 할지 모르겠어서 일단 그냥 풀은 풀이

// 통과는 했지만 사실상 시간 초과 되기 직전이다.
// node 하나에 진입할 때마다 for loop를 돌리기 때문에
// 사실상 O(n ** 2)이다.
const getMinimumDifference = function (root) {
  let minV = 10 ** 5;
  const vals = new Set();

  const traversal = (root) => {
    if (!root) return;

    vals.forEach((val) => {
      minV = Math.min(minV, Math.abs(val - root.val));
    });
    vals.add(root.val);

    traversal(root.left);
    traversal(root.right);
  };

  traversal(root);

  return minV;
};

// 다른 사람 풀이 보고 공부하기
// https://leetcode.com/problems/minimum-absolute-difference-in-bst/solutions/2589289/explained-from-the-simple-slow-example-to-the-100-fastest-one/

// 1. BST는 inorder traversal을 사용하면, 오름차순 array로 뽑아낼 수 있다.
// 이를 이용해 O(n)으로 풀이하는 것도 가능하다.
// TimeComplexity O(n), Space Complexity O(n) <- array를 저장하기 때문
const getSortedArrayFromBST = (root) => {
  const arr = [];

  const inorder = (root) => {
    if (!root) return;
    inorder(root.left);
    arr.push(root.val);
    inorder(root.right);
  };

  inorder(root);

  return arr;
};

const getMinimumDifference2 = (root) => {
  let minV = 10 ** 5;
  const arr = getSortedArrayFromBST(root);

  for (let i = 0; i < arr.length - 1; i++) {
    minV = Math.min(minV, arr[i + 1] - arr[i]);
  }

  return minV;
};

// 2.위의 풀이에서 array를 저장하지만 않으면,
// Space Complexity를 O(1)으로 개선할 수 있다.
const getMinimumDifference3 = (root) => {
  let minV = 10 ** 5;
  let preV = null;

  const inorder = (root) => {
    if (!root) return;
    inorder(root.left);
    if (preV !== null) {
      minV = Math.min(minV, root.val - preV);
    }
    preV = root.val;
    inorder(root.right);
  };

  inorder(root);

  return minV;
};

