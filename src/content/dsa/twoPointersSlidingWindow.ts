import { DSAProblem } from '@/types/dsa';

export const twoPointersSlidingWindowProblems: DSAProblem[] = [
  {
    id: '3sum',
    number: 26,
    title: '3Sum',
    category: 'Two Pointers & Sliding Window',
    difficulty: 'Medium',
    description:
      'Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0. Notice that the solution set must not contain duplicate triplets.',
    examples: [
      {
        input: 'nums = [-1,0,1,2,-1,-4]',
        output: '[[-1,-1,2],[-1,0,1]]',
        explanation: 'nums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0. nums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0. Distinct triplets are [-1,0,1] and [-1,-1,2].',
      },
      { input: 'nums = [0,1,1]', output: '[]' },
      { input: 'nums = [0,0,0]', output: '[[0,0,0]]' },
    ],
    constraints: ['3 <= nums.length <= 3000', '-10^5 <= nums[i] <= 10^5'],
    keyConcepts: ['Sorting', 'Two Pointers', 'Duplicate Pruning'],
    pattern: 'Sort & Two Pointers (Fixed Pivot)',
    timeComplexity: 'O(n^2)',
    spaceComplexity: 'O(1) auxiliary (excluding output array)',
    hints: [
      'Sort the array first. Sorting takes O(n log n) and enables the two-pointer technique.',
      'Iterate index i from 0 to n-3. If nums[i] > 0, can any three numbers sum to 0? No, break early!',
      'Skip duplicate values of nums[i], then use two pointers left = i + 1, right = n - 1 to find pairs summing to -nums[i]. Remember to skip duplicate left and right values after finding a triplet.',
    ],
    cppSolution: `#include <vector>
#include <algorithm>

class Solution {
public:
    std::vector<std::vector<int>> threeSum(std::vector<int>& nums) {
        std::vector<std::vector<int>> result;
        std::sort(nums.begin(), nums.end());
        int n = static_cast<int>(nums.size());

        for (int i = 0; i < n - 2; ++i) {
            if (nums[i] > 0) break; // Cannot sum to 0 if smallest number > 0
            if (i > 0 && nums[i] == nums[i - 1]) continue; // Skip duplicate i

            int left = i + 1;
            int right = n - 1;

            while (left < right) {
                int sum = nums[i] + nums[left] + nums[right];
                if (sum == 0) {
                    result.push_back({nums[i], nums[left], nums[right]});
                    while (left < right && nums[left] == nums[left + 1]) left++;
                    while (left < right && nums[right] == nums[right - 1]) right--;
                    left++;
                    right--;
                } else if (sum < 0) {
                    left++;
                } else {
                    right--;
                }
            }
        }

        return result;
    }
};`,
    edgeCases: ['Array of all zeroes [0, 0, 0]', 'No triplets sum to 0', 'Many duplicate elements throughout array'],
    commonMistakes: [
      'Using a hash set to deduplicate triplets instead of pruning adjacent duplicates in the sorted array, causing TLE or extra space',
      'Forgetting while loops to skip duplicate left/right values after finding a valid triplet',
    ],
    interviewExplanation:
      'Sort the array in O(n log n). Fix the first element nums[i] and run two pointers (left, right) for O(n) per pivot, yielding O(n^2) total runtime. Explain the duplicate-skipping conditions clearly.',
  },
  {
    id: 'container-with-most-water',
    number: 27,
    title: 'Container With Most Water',
    category: 'Two Pointers & Sliding Window',
    difficulty: 'Medium',
    description:
      'You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]). Find two lines that together with the x-axis form a container, such that the container contains the most water. Return the maximum amount of water a container can store.',
    examples: [
      {
        input: 'height = [1,8,6,2,5,4,8,3,7]',
        output: '49',
        explanation: 'The max capacity is between index 1 and index 8: min(8, 7) * (8 - 1) = 7 * 7 = 49.',
      },
      { input: 'height = [1,1]', output: '1' },
    ],
    constraints: ['n == height.length', '2 <= n <= 10^5', '0 <= height[i] <= 10^4'],
    keyConcepts: ['Two Pointers', 'Greedy Elimination', 'Area Maximization'],
    pattern: 'Two Pointers (Inward Convergence)',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    hints: [
      'The area is determined by: (right - left) * min(height[left], height[right]).',
      'Start with the widest container: left = 0, right = n - 1.',
      'Which pointer should you move inwards? If you move the taller line, the width decreases and the height cannot increase beyond the shorter line. So you MUST move the shorter line!',
    ],
    cppSolution: `#include <vector>
#include <algorithm>

class Solution {
public:
    int maxArea(const std::vector<int>& height) {
        int left = 0;
        int right = static_cast<int>(height.size()) - 1;
        int maxWater = 0;

        while (left < right) {
            int h = std::min(height[left], height[right]);
            maxWater = std::max(maxWater, h * (right - left));

            if (height[left] < height[right]) {
                left++;
            } else {
                right--;
            }
        }

        return maxWater;
    }
};`,
    edgeCases: ['Two lines only', 'Heights forming a plateau', 'Decreasing staircase of heights'],
    commonMistakes: ['Moving the pointer with greater height, which can never result in a larger area'],
    interviewExplanation:
      'Prove the greedy decision: the height is limited by min(height[left], height[right]). Keeping the shorter line while decreasing width can never yield a larger area. Thus, moving the shorter line is the only way to potentially find a taller boundary.',
  },
  {
    id: 'remove-duplicates-from-sorted-array',
    number: 28,
    title: 'Remove Duplicates from Sorted Array',
    category: 'Two Pointers & Sliding Window',
    difficulty: 'Easy',
    description:
      'Given an integer array nums sorted in non-decreasing order, remove the duplicates in-place such that each unique element appears only once. The relative order of the elements should be kept the same. Then return the number of unique elements in nums. Consider the number of unique elements to be k. You need to change the array nums such that the first k elements contain the unique elements in original order.',
    examples: [
      { input: 'nums = [1,1,2]', output: '2, nums = [1,2,_]' },
      { input: 'nums = [0,0,1,1,1,2,2,3,3,4]', output: '5, nums = [0,1,2,3,4,_,_,_,_,_]' },
    ],
    constraints: ['1 <= nums.length <= 3 * 10^4', '-100 <= nums[i] <= 100', 'nums is sorted in non-decreasing order.'],
    keyConcepts: ['Slow & Fast Pointers', 'In-Place Overwrite', 'Non-decreasing Invariant'],
    pattern: 'Two Pointers (Slow & Fast Runner)',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    hints: [
      'The array is already sorted, so all duplicate elements are contiguous.',
      'Maintain an insert pointer k = 1. Scan with i from 1 to n - 1.',
      'Whenever nums[i] != nums[k - 1], write nums[i] to nums[k] and increment k.',
    ],
    cppSolution: `#include <vector>

class Solution {
public:
    int removeDuplicates(std::vector<int>& nums) {
        if (nums.empty()) return 0;

        int k = 1;
        for (size_t i = 1; i < nums.size(); ++i) {
            if (nums[i] != nums[k - 1]) {
                nums[k] = nums[i];
                k++;
            }
        }
        return k;
    }
};`,
    edgeCases: ['Array with all distinct elements', 'Array where all elements are identical', 'Array of size 1'],
    commonMistakes: ['Calling std::vector::erase, which runs in O(n) per deletion leading to O(n^2) total time'],
    interviewExplanation:
      'Contrast vector::erase (O(n^2)) with the two-pointer overwrite technique (O(n) time, O(1) space). Pointer k tracks the length of unique prefix discovered so far.',
  },
  {
    id: 'squares-of-a-sorted-array',
    number: 29,
    title: 'Squares of a Sorted Array',
    category: 'Two Pointers & Sliding Window',
    difficulty: 'Easy',
    description:
      'Given an integer array nums sorted in non-decreasing order, return an array of the squares of each number sorted in non-decreasing order.',
    examples: [
      {
        input: 'nums = [-4,-1,0,3,10]',
        output: '[0,1,9,16,100]',
        explanation: 'After squaring, the array becomes [16,1,0,9,100]. After sorting, it becomes [0,1,9,16,100].',
      },
      { input: 'nums = [-7,-3,2,3,11]', output: '[4,9,9,49,121]' },
    ],
    constraints: ['1 <= nums.length <= 10^4', '-10^4 <= nums[i] <= 10^4', 'nums is sorted in non-decreasing order.'],
    keyConcepts: ['Two Pointers from Ends', 'Filling from Back', 'Linear Merge'],
    pattern: 'Two Pointers (Outside In)',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1) auxiliary (excluding output array)',
    hints: [
      'Where are the largest squared values located in the original array? At the two ends (leftmost negative numbers or rightmost positive numbers).',
      'Use two pointers at the ends: left = 0 and right = n - 1.',
      'Compare nums[left]^2 and nums[right]^2, place the larger one at the end of the result array, and move that pointer inward.',
    ],
    cppSolution: `#include <vector>
#include <cmath>

class Solution {
public:
    std::vector<int> sortedSquares(const std::vector<int>& nums) {
        int n = static_cast<int>(nums.size());
        std::vector<int> result(n);

        int left = 0;
        int right = n - 1;
        int pos = n - 1;

        while (left <= right) {
            int leftSq = nums[left] * nums[left];
            int rightSq = nums[right] * nums[right];

            if (leftSq > rightSq) {
                result[pos--] = leftSq;
                left++;
            } else {
                result[pos--] = rightSq;
                right--;
            }
        }

        return result;
    }
};`,
    edgeCases: ['All negative numbers', 'All positive numbers', 'Array with zeroes and negative values'],
    commonMistakes: ['Squaring every element and calling std::sort (O(n log n)) instead of the optimal O(n) two-pointer merge'],
    interviewExplanation:
      'Because the input is sorted, the largest squares are at the extremes. Filling the result array backwards from index n - 1 ensures an O(n) single-pass solution without extra sorting overhead.',
  },
  {
    id: 'minimum-size-subarray-sum',
    number: 30,
    title: 'Minimum Size Subarray Sum',
    category: 'Two Pointers & Sliding Window',
    difficulty: 'Medium',
    description:
      'Given an array of positive integers nums and a positive integer target, return the minimal length of a subarray whose sum is greater than or equal to target. If there is no such subarray, return 0 instead.',
    examples: [
      {
        input: 'target = 7, nums = [2,3,1,2,4,3]',
        output: '2',
        explanation: 'The subarray [4,3] has the minimal length under the problem constraints.',
      },
      { input: 'target = 4, nums = [1,4,4]', output: '1' },
      { input: 'target = 11, nums = [1,1,1,1,1,1,1,1]', output: '0' },
    ],
    constraints: ['1 <= target <= 10^9', '1 <= nums.length <= 10^5', '1 <= nums[i] <= 10^4'],
    keyConcepts: ['Sliding Window', 'Dynamic Window Shrink', 'Positive Numbers Monotonicity'],
    pattern: 'Shrinkable Sliding Window',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    hints: [
      'Since all numbers are positive, expanding the window always increases the sum, and shrinking the window always decreases the sum.',
      'Expand right pointer to add nums[right] to running sum.',
      'While running sum >= target, update minLength, subtract nums[left], and advance left pointer.',
    ],
    cppSolution: `#include <vector>
#include <algorithm>
#include <climits>

class Solution {
public:
    int minSubArrayLen(int target, const std::vector<int>& nums) {
        int left = 0;
        int currentSum = 0;
        int minLength = INT_MAX;

        for (int right = 0; right < static_cast<int>(nums.size()); ++right) {
            currentSum += nums[right];

            while (currentSum >= target) {
                minLength = std::min(minLength, right - left + 1);
                currentSum -= nums[left];
                left++;
            }
        }

        return (minLength == INT_MAX) ? 0 : minLength;
    }
};`,
    edgeCases: ['Sum of all elements is strictly less than target (return 0)', 'Single element equals target (return 1)', 'Target requires entire array'],
    commonMistakes: ['Thinking the while loop inside the for loop makes it O(n^2); each element enters and leaves the window at most once, so it is strictly O(n) amortized'],
    interviewExplanation:
      'Explain that the sliding window works because all elements are strictly positive, guaranteeing monotonicity. Each element is added once by right and subtracted at most once by left, yielding O(2n) = O(n) time and O(1) space.',
  },
  {
    id: 'permutation-in-string',
    number: 31,
    title: 'Permutation in String',
    category: 'Two Pointers & Sliding Window',
    difficulty: 'Medium',
    description:
      'Given two strings s1 and s2, return true if s2 contains a permutation of s1, or false otherwise. In other words, return true if one of s1\'s permutations is the substring of s2.',
    examples: [
      {
        input: 's1 = "ab", s2 = "eidbaooo"',
        output: 'true',
        explanation: 's2 contains one permutation of s1 ("ba").',
      },
      { input: 's1 = "ab", s2 = "eidboaoo"', output: 'false' },
    ],
    constraints: ['1 <= s1.length, s2.length <= 10^4', 's1 and s2 consist of lowercase English letters.'],
    keyConcepts: ['Fixed Size Sliding Window', 'Character Frequency Match', 'Constant Space'],
    pattern: 'Fixed Size Sliding Window',
    timeComplexity: 'O(len(s2))',
    spaceComplexity: 'O(1) (26 characters)',
    hints: [
      'A permutation has the exact same character frequencies as s1 and the exact same length (len(s1)).',
      'Maintain a sliding window of fixed length len(s1) in s2.',
      'Compare frequency counts of the window against s1. Slide the window one character right by adding the incoming char and removing the outgoing char.',
    ],
    cppSolution: `#include <string>
#include <vector>

class Solution {
public:
    bool checkInclusion(const std::string& s1, const std::string& s2) {
        int n1 = static_cast<int>(s1.length());
        int n2 = static_cast<int>(s2.length());
        if (n1 > n2) return false;

        std::vector<int> count1(26, 0);
        std::vector<int> count2(26, 0);

        for (int i = 0; i < n1; ++i) {
            count1[s1[i] - 'a']++;
            count2[s2[i] - 'a']++;
        }

        if (count1 == count2) return true;

        for (int i = n1; i < n2; ++i) {
            count2[s2[i] - 'a']++;
            count2[s2[i - n1] - 'a']--;

            if (count1 == count2) return true;
        }

        return false;
    }
};`,
    edgeCases: ['s1 longer than s2 (return false immediately)', 's1 and s2 of equal length', 'Permutation located at the very start or very end of s2'],
    commonMistakes: ['Sorting substrings of size n1 at every index, which degrades runtime to O(n2 * n1 log n1)'],
    interviewExplanation:
      'Window size is strictly fixed at s1.length(). In C++, std::vector<int> of size 26 supports O(1) equality comparison. Adding one incoming and removing one outgoing char takes O(1) per step, yielding O(n2) total time.',
  },
];
