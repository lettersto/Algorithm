// LeetCode 78. Subsets

#include <vector>
#include <cmath>

using namespace std;

class Solution {
public:
    vector<vector<int>> subsets(vector<int>& nums) {
        vector<vector<int>> ans;
        int exponent = static_cast<int>(size(nums));
        int maxSize = static_cast<int>(pow(2, exponent));

        for (int i = 0; i < maxSize; i++) {
            vector<int> tmp;
            for (int j = 0; j < exponent; j++) {
                if ((i & (1 << j))!= 0) {
                    tmp.push_back(nums[j]);
                }
            }
            ans.push_back(tmp);
        }

        return ans;
    }
};
