// LeetCode 94 Binary tree Inorder Traversal

// dart에 익숙해질 겸 푸는 문제
class Solution {
  List<int> inorderTraversal(TreeNode? root) {
    List<int> ans = [];

    void dfs(TreeNode? root) {
      if (root == null) {
        return;
      }
      dfs(root.left);
      ans.add(root.val);
      dfs(root.right);
    }

    dfs(root);

    return ans;
  }
}
