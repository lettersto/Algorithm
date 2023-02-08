// LeetCode 450 Delete Node in a BST

// 어렵다. 다른 사람이 풀은 것 보고 풀었다.

// ✨ BST의 어떤 root의 value는
// left subtree의 모든 값보다는 크고, right subtree의 모든 값보다는 작다!!

// 0. root의 subtree를 return해서 계속 root를 바꿔나간다.
// 1. key가 root보다 작다면 왼쪽으로 간다. (BST)
// 2. key가 root보다 크다면 오른쪽으로 간다.
// 3. key가 root와 같다면
// 3 - A. key가 leaf node라면 그냥 null을 return한다.
// 3 - B. key가 child node를 하나만 갖고 있다면, 그 child subtree를 return한다.
// 3 - C. key가 left와 right child nodes를 모두 갖고 있다면,
//        right subtree에서 가장 작은 값을 찾아, key가 있던 자리로 올린다.
//        또는 left subtree에서 가장 큰 값을 찾아, key가 있던 자리로 올리면 된다.

const deleteNode = (root, key) => {
  if (!root) return null;

  if (key < root.val) {
    root.left = deleteNode(root.left, key);
  }

  if (key > root.val) {
    root.right = deleteNode(root.right, key);
  }

  if (key === root.val) {
    // if the key is a leaf node, replace the node with null
    if (!root.left && !root.right) {
      return null;
      // if the key has only one child node, replace the node with its child.
    } else if (!root.left || !root.right) {
      return root.left ?? root.right;
      // if the key has both left and right child nodes,
    } else {
      let tmp = root.right;
      // find the smallest value in the right subtree.
      while (tmp.left) {
        tmp = tmp.left;
      }
      root.val = tmp.val;
      root.right = deleteNode(root.right, root.val);
    }
  }

  return root;
};
