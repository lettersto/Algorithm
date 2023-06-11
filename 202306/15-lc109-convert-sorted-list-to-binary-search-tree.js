// LeetCode 109. Convert Sorted List to Binary Search Tree

// singly linked list를 height-balances binary search tree로 만드는 문제
// linked list를 그냥 list로 풀고
// binary search를 이용해 찾아지는 값부터 node로 만들어 넣었다.

const sortedListToBST = function (head) {
  const arr = [];
  while (head) {
    arr.push(head.val);
    head = head.next;
  }

  const makeBST = (left, right) => {
    if (left > right) return null;
    const mid = Math.ceil((left + right) / 2);
    const root = new TreeNode(arr[mid]);

    const leftSubtree = makeBST(left, mid - 1);
    const rightSubtree = makeBST(mid + 1, right);

    root.left = leftSubtree;
    root.right = rightSubtree;

    return root;
  };

  return makeBST(0, arr.length - 1);
};
