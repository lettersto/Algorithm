// LeetCode 530 Minimum Absolute Difference in BST

class Solution {
  private int preV = -1;
  private int minV = 100_000;  // Integer.MAX_VALUE 도 가능

  public int getMinimumDifference(TreeNode root) {    
    inorder(root);
    return minV;
  }

  private void inorder(TreeNode root) {
    if (root == null) return;

    inorder(root.left);

    if (preV != -1) {
      minV = Math.min(minV, Math.abs(root.val - preV));
    }

    preV = root.val;

    inorder(root.right);
  }
}
