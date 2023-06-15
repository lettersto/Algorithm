// LeetCode 1161. Maximum Level Sum of a Binary Tree
// java method 이름들 제발 통일되면 좋겠다...

class Solution {
  
  public int maxLevelSum(TreeNode root) {
    ArrayList<TreeNode> Q = new ArrayList<>();
    int maxV = Integer.MIN_VALUE;
    int x = 0;
    int maxX = 0;
    
    Q.add(root);
    
    while (!Q.isEmpty()) {
      ArrayList<TreeNode> tmp = new ArrayList<>();
      int tmpSum = 0;
      x += 1;

      while (!Q.isEmpty()) {
        TreeNode curNode = Q.remove(Q.size() - 1);
        tmpSum += curNode.val;
        if (curNode.left != null) {
          tmp.add(curNode.left);
        }
        if (curNode.right != null) {
          tmp.add(curNode.right);
        }
      }

      if (maxV < tmpSum) {
        maxV = tmpSum;
        maxX = x;
      }
      Q = tmp;
    }
    
    return maxX;
  }
}