// LeetCode 101 Symmetric Tree

// 재귀적으로 생각하는 것은 여전히 어렵다.
// 트리를 왼쪽 subtree와 오른쪽 subtree로 계속 분할해 나간다.

// 이때 왼쪽 subtree에서는 오른쪽으로 가면, 오른쪽 subtree에서는 왼쪽으로 가고,
// 오른쪽 subtree에서 왼쪽으로 가면, 왼쪽 subtree에서는 오른쪽으로 간다.
// 두 서브트리 모두 true가 나와야, 전체 tree도 true

// 이때 끝까지 트리를 내려가다 보면 leaf node까지 내려가게 되는데
// leaf node의 자식은 모두 없어야 하니,
// 둘 모두 null이라면 true, 한 쪽이라도 null이 아니라면 false

// 그리고 진행해 나가면서 대칭이 되는 node의 값이 서로 달라도 false

const isSymmetric = (root) => {
  const traversal = (leftPart, rightPart) => {
    if (!leftPart && !rightPart) return true;
    if (!leftPart || !rightPart || leftPart.val !== rightPart.val) return false;
    return traversal(leftPart.right, rightPart.left) && traversal(leftPart.left, rightPart.right);
  };

  return traversal(root.left, root.right);
};

