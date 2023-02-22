// LeetCode 108 Convert Sorted Array to Binary Search Tree

// mid를 pivot으로 하는 quicksort처럼 풀은 문제
const sortedArrayToBST = (nums) => {
  const buildTree = (start, end) => {
    if (start > end) return null;

    const mid = Math.floor((start + end) / 2);
    const root = new TreeNode(nums[mid]);

    root.left = buildTree(start, mid - 1);
    root.right = buildTree(mid + 1, end);

    return root;
  };

  return buildTree(0, nums.length - 1);
};
