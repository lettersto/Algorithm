// LeetCode 701 Insert into a Binary Search Tree

// 값이 하나만 있는 것이 보장되기 때문에
// BST의 특성에 따라 쭉 따라가면 된다.

// unbalanced tree라고 문제를 풀은 사람들이 싫어하는데
// 나중에 tree 익숙해지면 AVL이런 것도 봐봐야겠다.
// https://leetcode.com/problems/insert-into-a-binary-search-tree/solutions/753339/python-self-balanced-tree-avl-tree/?q=balanced&orderBy=most_relevant

const insertIntoBST = function (root, val) {
  // 2. 그러다가 leaf를 만나면 그 지점이 추가할 자리이므로,
  //    새로운 node를 만들어 value를 집어 넣는다.
  if (!root) {
    root = new TreeNode(val);
  }

  // 1. val이 root 값보다 작으면 왼쪽으로, 크면 오른쪽으로 타고 가면서
  //    다른 노드는 건들지 않고 그대로 갖고간다.
  // left
  if (root.val > val) {
    root.left = insertIntoBST(root.left, val);
  }

  // right
  if (root.val < val) {
    root.right = insertIntoBST(root.right, val);
  }

  return root;
};
