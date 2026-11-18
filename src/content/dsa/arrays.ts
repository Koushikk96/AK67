import { DSAProblem } from '@/types/dsa';

export const arrayProblems: DSAProblem[] = [
  {
    id: 'two-sum',
    number: 1,
    title: 'Two Sum',
    category: 'Arrays',
    difficulty: 'Easy',
    description:
      'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice. You can return the answer in any order.',
    examples: [
      {
        input: 'nums = [2,7,11,15], target = 9',
        output: '[0,1]',
        explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].',
      },
      {
        input: 'nums = [3,2,4], target = 6',
        output: '[1,2]',
      },
      {
        input: 'nums = [3,3], target = 6',
        output: '[0,1]',
      },
    ],
    constraints: [
      '2 <= nums.length <= 10^4',
      '-10^9 <= nums[i] <= 10^9',
      '-10^9 <= target <= 10^9',
      'Only one valid answer exists.',
    ],
    keyConcepts: ['Hash Map', 'Complement Lookup', 'Single-pass traversal'],
    pattern: 'Hash Map Lookup',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    hints: [
      'A brute force O(n^2) check checks every pair. How can you find the complement (target - nums[i]) faster?',
      'Can you store elements seen so far in a hash map mapping each value to its index?',
      'In a single pass, check if target - nums[i] is already in the map. If yes, return the two indices; otherwise insert nums[i] -> i.',
    ],
    cppSolution: `#include <vector>
#include <unordered_map>

class Solution {
public:
    std::vector<int> twoSum(const std::vector<int>& nums, int target) {
        std::unordered_map<int, int> numToIndex;
        for (int i = 0; i < static_cast<int>(nums.size()); ++i) {
            int complement = target - nums[i];
            auto it = numToIndex.find(complement);
            if (it != numToIndex.end()) {
                return {it->second, i};
            }
            numToIndex[nums[i]] = i;
        }
        return {};
    }
};`,
    edgeCases: [
      'Negative numbers in the array or target',
      'Duplicate elements adding up to target (e.g. [3, 3], target=6)',
      'Large integers without 32-bit overflow concerns',
    ],
    commonMistakes: [
      'Using the same element twice (e.g. returning [0, 0] for target = 2 * nums[0])',
      'Two-pass hash map failing on duplicates if inserted before checking',
    ],
    interviewExplanation:
      'State the brute force approach (O(n^2)) first. Then explain that trading memory for time via an unordered_map reduces lookup time to O(1) amortized, achieving an optimal O(n) single-pass solution.',
  },
  {
    id: 'best-time-to-buy-and-sell-stock',
    number: 2,
    title: 'Best Time to Buy and Sell Stock',
    category: 'Arrays',
    difficulty: 'Easy',
    description:
      'You are given an array prices where prices[i] is the price of a given stock on the ith day. You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock. Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.',
    examples: [
      {
        input: 'prices = [7,1,5,3,6,4]',
        output: '5',
        explanation: 'Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6 - 1 = 5.',
      },
      {
        input: 'prices = [7,6,4,3,1]',
        output: '0',
        explanation: 'In this case, no transactions are done and max profit = 0.',
      },
    ],
    constraints: ['1 <= prices.length <= 10^5', '0 <= prices[i] <= 10^4'],
    keyConcepts: ['Prefix Minimum', 'Greedy', 'Single Pass'],
    pattern: 'Tracking Running Min/Max',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    hints: [
      'To maximize profit selling on day i, you must have bought at the minimum price seen before day i.',
      'Track the minimum price seen so far as you iterate through the prices array.',
      'At each day, calculate current price - minPrice, and update maxProfit.',
    ],
    cppSolution: `#include <vector>
#include <algorithm>
#include <climits>

class Solution {
public:
    int maxProfit(const std::vector<int>& prices) {
        int minPrice = INT_MAX;
        int maxProfit = 0;
        for (int price : prices) {
            minPrice = std::min(minPrice, price);
            maxProfit = std::max(maxProfit, price - minPrice);
        }
        return maxProfit;
    }
};`,
    edgeCases: [
      'Monotonically decreasing prices (should return 0)',
      'Array of length 1 (cannot sell, return 0)',
      'Identical prices across all days',
    ],
    commonMistakes: [
      'Buying on the lowest day after selling on an earlier day (violating time order)',
      'Initializing maxProfit to a negative number rather than 0',
    ],
    interviewExplanation:
      'Walk through the observation that the maximum profit on any day is prices[i] minus the minimum price before day i. Maintaining minPrice in a single loop gives O(n) time with O(1) space.',
  },
  {
    id: 'contains-duplicate',
    number: 3,
    title: 'Contains Duplicate',
    category: 'Arrays',
    difficulty: 'Easy',
    description:
      'Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.',
    examples: [
      { input: 'nums = [1,2,3,1]', output: 'true' },
      { input: 'nums = [1,2,3,4]', output: 'false' },
      { input: 'nums = [1,1,1,3,3,4,3,2,4,2]', output: 'true' },
    ],
    constraints: ['1 <= nums.length <= 10^5', '-10^9 <= nums[i] <= 10^9'],
    keyConcepts: ['Hash Set', 'Sorting Tradeoff', 'Early Exit'],
    pattern: 'Set Membership',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    hints: [
      'A set only contains unique elements. How can you use that property?',
      'If you insert numbers one by one, when can you immediately declare a duplicate?',
      'Alternatively, if space must be O(1), what happens if you sort the array first?',
    ],
    cppSolution: `#include <vector>
#include <unordered_set>

class Solution {
public:
    bool containsDuplicate(const std::vector<int>& nums) {
        std::unordered_set<int> seen;
        for (int num : nums) {
            if (seen.find(num) != seen.end()) {
                return true;
            }
            seen.insert(num);
        }
        return false;
    }
};`,
    edgeCases: ['Array with only 1 element (always false)', 'All elements identical', 'Large numbers with negative signs'],
    commonMistakes: ['Comparing sizes of set and vector after inserting all elements instead of early-exiting'],
    interviewExplanation:
      'Mention both tradeoffs: O(n) time with O(n) space using unordered_set, versus O(n log n) time with O(1) auxiliary space using std::sort.',
  },
  {
    id: 'product-of-array-except-self',
    number: 4,
    title: 'Product of Array Except Self',
    category: 'Arrays',
    difficulty: 'Medium',
    description:
      'Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i]. The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer. You must write an algorithm that runs in O(n) time and without using the division operation.',
    examples: [
      { input: 'nums = [1,2,3,4]', output: '[24,12,8,6]' },
      { input: 'nums = [-1,1,0,-3,3]', output: '[0,0,9,0,0]' },
    ],
    constraints: ['2 <= nums.length <= 10^5', '-30 <= nums[i] <= 30'],
    keyConcepts: ['Prefix & Suffix Products', 'Accumulation Array', 'No Division'],
    pattern: 'Prefix and Suffix Accumulation',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1) auxiliary (excluding output array)',
    hints: [
      'The answer for index i is (product of elements before i) * (product of elements after i).',
      'Can you compute prefix products in a first pass and store them in the result array?',
      'Can you then traverse backwards while maintaining a running suffix product to multiply into the result?',
    ],
    cppSolution: `#include <vector>

class Solution {
public:
    std::vector<int> productExceptSelf(const std::vector<int>& nums) {
        int n = static_cast<int>(nums.size());
        std::vector<int> result(n, 1);

        int prefix = 1;
        for (int i = 0; i < n; ++i) {
            result[i] = prefix;
            prefix *= nums[i];
        }

        int suffix = 1;
        for (int i = n - 1; i >= 0; --i) {
            result[i] *= suffix;
            suffix *= nums[i];
        }

        return result;
    }
};`,
    edgeCases: ['Array containing one zero', 'Array containing two or more zeroes (all products become 0)', 'Negative numbers'],
    commonMistakes: ['Attempting total product divided by nums[i] (explicitly forbidden and fails with zero)'],
    interviewExplanation:
      'Explain that answer[i] = prefix_product[i-1] * suffix_product[i+1]. Construct the prefix products directly inside the answer array, then multiply the running suffix product on the return pass to achieve O(1) extra space.',
  },
  {
    id: 'maximum-subarray',
    number: 5,
    title: 'Maximum Subarray',
    category: 'Arrays',
    difficulty: 'Medium',
    description:
      'Given an integer array nums, find the subarray with the largest sum, and return its sum. A subarray is a contiguous non-empty sequence of elements within an array.',
    examples: [
      {
        input: 'nums = [-2,1,-3,4,-1,2,1,-5,4]',
        output: '6',
        explanation: 'The subarray [4,-1,2,1] has the largest sum 6.',
      },
      { input: 'nums = [1]', output: '1' },
      { input: 'nums = [5,4,-1,7,8]', output: '23' },
    ],
    constraints: ['1 <= nums.length <= 10^5', '-10^4 <= nums[i] <= 10^4'],
    keyConcepts: ["Kadane's Algorithm", 'Dynamic Programming', 'Contiguous Subarray'],
    pattern: "Kadane's Algorithm",
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    hints: [
      'If your running sum becomes negative, can it ever help a subsequent subarray?',
      "At each index i, you either extend the previous subarray or start a new subarray at nums[i]: current = max(nums[i], current + nums[i]).",
      'Keep track of the global maximum sum across the entire traversal.',
    ],
    cppSolution: `#include <vector>
#include <algorithm>

class Solution {
public:
    int maxSubArray(const std::vector<int>& nums) {
        int currentSum = nums[0];
        int maxSum = nums[0];
        for (size_t i = 1; i < nums.size(); ++i) {
            currentSum = std::max(nums[i], currentSum + nums[i]);
            maxSum = std::max(maxSum, currentSum);
        }
        return maxSum;
    }
};`,
    edgeCases: ['All negative numbers (e.g. [-5, -2, -8], should return -2)', 'Single element array', 'Alternating large positive and negative numbers'],
    commonMistakes: ['Resetting running sum to 0 instead of nums[i], which fails when all numbers are negative'],
    interviewExplanation:
      "Kadane's algorithm is standard for interviews. Explain the recurrence relation: dp[i] = max(nums[i], dp[i-1] + nums[i]). Mention that it reduces to O(1) space since we only need the immediately preceding sum.",
  },
  {
    id: 'majority-element',
    number: 6,
    title: 'Majority Element',
    category: 'Arrays',
    difficulty: 'Easy',
    description:
      'Given an array nums of size n, return the majority element. The majority element is the element that appears more than ⌊n / 2⌋ times. You may assume that the majority element always exists in the array.',
    examples: [
      { input: 'nums = [3,2,3]', output: '3' },
      { input: 'nums = [2,2,1,1,1,2,2]', output: '2' },
    ],
    constraints: ['n == nums.length', '1 <= n <= 5 * 10^4', '-10^9 <= nums[i] <= 10^9'],
    keyConcepts: ['Boyer-Moore Voting Algorithm', 'Frequency Counting', 'O(1) Space'],
    pattern: 'Boyer-Moore Majority Vote',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    hints: [
      'A hash map solves this in O(n) space. Can you do it in O(1) space?',
      'Since the majority element appears more than n/2 times, its count exceeds all other elements combined.',
      'Maintain a candidate and a counter. Increment count if current == candidate; decrement otherwise. If count reaches 0, pick current as new candidate.',
    ],
    cppSolution: `#include <vector>

class Solution {
public:
    int majorityElement(const std::vector<int>& nums) {
        int candidate = nums[0];
        int count = 0;
        for (int num : nums) {
            if (count == 0) {
                candidate = num;
            }
            count += (num == candidate) ? 1 : -1;
        }
        return candidate;
    }
};`,
    edgeCases: ['Single element array', 'Array with only two distinct elements', 'Candidate alternating in the beginning'],
    commonMistakes: ['Thinking sorting O(n log n) is optimal when Boyer-Moore provides linear time with O(1) memory'],
    interviewExplanation:
      'Describe Boyer-Moore Voting Algorithm: pairwise cancellation of distinct elements leaves the majority element standing, because its count strictly exceeds n/2.',
  },
  {
    id: 'move-zeroes',
    number: 7,
    title: 'Move Zeroes',
    category: 'Arrays',
    difficulty: 'Easy',
    description:
      'Given an integer array nums, move all 0s to the end of it while maintaining the relative order of the non-zero elements. Note that you must do this in-place without making a copy of the array.',
    examples: [
      { input: 'nums = [0,1,0,3,12]', output: '[1,3,12,0,0]' },
      { input: 'nums = [0]', output: '[0]' },
    ],
    constraints: ['1 <= nums.length <= 10^4', '-2^31 <= nums[i] <= 2^31 - 1'],
    keyConcepts: ['Two Pointers', 'In-Place Partitioning', 'Relative Order'],
    pattern: 'Two Pointers (Fast & Slow)',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    hints: [
      'Use two pointers: one (insertPos) to track where the next non-zero should be placed, and one to scan the array.',
      'Whenever the scanner finds a non-zero element, swap it with the element at insertPos and increment insertPos.',
      'This guarantees all non-zeros stay in original relative order and zeroes are pushed to the back in a single pass.',
    ],
    cppSolution: `#include <vector>
#include <algorithm>

class Solution {
public:
    void moveZeroes(std::vector<int>& nums) {
        int insertPos = 0;
        for (int i = 0; i < static_cast<int>(nums.size()); ++i) {
            if (nums[i] != 0) {
                if (i != insertPos) {
                    std::swap(nums[i], nums[insertPos]);
                }
                insertPos++;
            }
        }
    }
};`,
    edgeCases: ['No zeroes in array', 'All zeroes in array', 'Zeroes already at the end'],
    commonMistakes: ['Overwriting non-zeros instead of swapping or filling remaining positions with 0'],
    interviewExplanation:
      'Highlight the optimization of swapping only when i != insertPos to avoid unnecessary self-assignments when the array prefix contains no zeroes.',
  },
  {
    id: 'rotate-array',
    number: 8,
    title: 'Rotate Array',
    category: 'Arrays',
    difficulty: 'Medium',
    description:
      'Given an integer array nums, rotate the array to the right by k steps, where k is non-negative.',
    examples: [
      {
        input: 'nums = [1,2,3,4,5,6,7], k = 3',
        output: '[5,6,7,1,2,3,4]',
        explanation: 'rotate 1 steps to right: [7,1,2,3,4,5,6], 2 steps: [6,7,1,2,3,4,5], 3 steps: [5,6,7,1,2,3,4]',
      },
      {
        input: 'nums = [-1,-100,3,99], k = 2',
        output: '[3,99,-1,-100]',
      },
    ],
    constraints: ['1 <= nums.length <= 10^5', '-2^31 <= nums[i] <= 2^31 - 1', '0 <= k <= 10^5'],
    keyConcepts: ['Array Reversal', 'Modulo Arithmetic', 'In-Place Manipulation'],
    pattern: 'Triple Reversal',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    hints: [
      'First, normalize k: k = k % nums.length. Why?',
      'If you reverse the entire array, what happens to the positions of the elements?',
      'After full reverse, reverse the first k elements, then reverse the remaining n - k elements.',
    ],
    cppSolution: `#include <vector>
#include <algorithm>

class Solution {
public:
    void rotate(std::vector<int>& nums, int k) {
        int n = static_cast<int>(nums.size());
        k %= n;
        if (k == 0) return;

        // 1. Reverse entire array
        std::reverse(nums.begin(), nums.end());
        // 2. Reverse first k elements
        std::reverse(nums.begin(), nums.begin() + k);
        // 3. Reverse remaining n - k elements
        std::reverse(nums.begin() + k, nums.end());
    }
};`,
    edgeCases: ['k >= nums.length (must modulo k)', 'k == 0', 'Array of size 1'],
    commonMistakes: ['Forgetting k = k % n causing out-of-bounds index errors when k > n'],
    interviewExplanation:
      'Explain the 3-step reversal algorithm: reverse all, reverse 0..k-1, reverse k..n-1. It is mathematically elegant, achieves O(n) time, and requires O(1) extra space.',
  },
  {
    id: 'missing-number',
    number: 9,
    title: 'Missing Number',
    category: 'Arrays',
    difficulty: 'Easy',
    description:
      'Given an array nums containing n distinct numbers in the range [0, n], return the only number in the range that is missing from the array.',
    examples: [
      { input: 'nums = [3,0,1]', output: '2', explanation: 'n = 3 since there are 3 numbers, range [0,3]. 2 is missing.' },
      { input: 'nums = [0,1]', output: '2', explanation: 'n = 2, range [0,2]. 2 is missing.' },
      { input: 'nums = [9,6,4,2,3,5,7,0,1]', output: '8' },
    ],
    constraints: ['n == nums.length', '1 <= n <= 10^4', '0 <= nums[i] <= n', 'All numbers in nums are unique.'],
    keyConcepts: ['Gauss Sum Formula', 'Bitwise XOR', 'Overflow Prevention'],
    pattern: 'Mathematical Invariant / XOR',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    hints: [
      'What is the sum of integers from 0 to n? (n * (n + 1) / 2).',
      'If you subtract every number in nums from the expected sum, what is left?',
      'Alternatively, XORing a number with itself cancels it out (x ^ x = 0). What if you XOR all numbers and all indices?',
    ],
    cppSolution: `#include <vector>

class Solution {
public:
    int missingNumber(const std::vector<int>& nums) {
        int n = static_cast<int>(nums.size());
        int xorSum = n;
        for (int i = 0; i < n; ++i) {
            xorSum ^= i ^ nums[i];
        }
        return xorSum;
    }
};`,
    edgeCases: ['Missing number is 0', 'Missing number is n', 'n = 1'],
    commonMistakes: ['Integer overflow when using summation for very large n (XOR variant is completely immune to overflow)'],
    interviewExplanation:
      'Mention both the Gauss summation formula S = n*(n+1)/2 and the Bitwise XOR approach. Highlight that the XOR approach is immune to integer overflow because bitwise operations never exceed word size.',
  },
  {
    id: 'find-pivot-index',
    number: 10,
    title: 'Find Pivot Index',
    category: 'Arrays',
    difficulty: 'Easy',
    description:
      'Given an array of integers nums, calculate the pivot index of this array. The pivot index is the index where the sum of all the numbers strictly to the left of the index is equal to the sum of all the numbers strictly to the index\'s right. If no such index exists, return -1. If there are multiple pivot indexes, you should return the left-most pivot index.',
    examples: [
      {
        input: 'nums = [1,7,3,6,5,6]',
        output: '3',
        explanation: 'Left sum = nums[0] + nums[1] + nums[2] = 1 + 7 + 3 = 11. Right sum = nums[4] + nums[5] = 5 + 6 = 11.',
      },
      { input: 'nums = [1,2,3]', output: '-1' },
      { input: 'nums = [2,1,-1]', output: '0', explanation: 'Left sum = 0. Right sum = nums[1] + nums[2] = 0.' },
    ],
    constraints: ['1 <= nums.length <= 10^4', '-1000 <= nums[i] <= 1000'],
    keyConcepts: ['Prefix Sum', 'Running Accumulator', 'Single Total'],
    pattern: 'Prefix Sum Arithmetic',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    hints: [
      'First calculate the total sum of all elements in the array.',
      'As you iterate from left to right, you can maintain the leftSum.',
      'The rightSum at index i is simply: totalSum - leftSum - nums[i]. Check if leftSum == rightSum.',
    ],
    cppSolution: `#include <vector>
#include <numeric>

class Solution {
public:
    int pivotIndex(const std::vector<int>& nums) {
        int totalSum = std::accumulate(nums.begin(), nums.end(), 0);
        int leftSum = 0;

        for (int i = 0; i < static_cast<int>(nums.size()); ++i) {
            int rightSum = totalSum - leftSum - nums[i];
            if (leftSum == rightSum) {
                return i;
            }
            leftSum += nums[i];
        }

        return -1;
    }
};`,
    edgeCases: ['Pivot at index 0 (left sum = 0)', 'Pivot at last index (right sum = 0)', 'Negative elements resulting in zero sum'],
    commonMistakes: ['Recomputing right sum from scratch at each index, turning O(n) into O(n^2)'],
    interviewExplanation:
      'Precompute totalSum in O(n). During the second pass, maintain leftSum. At index i, rightSum is totalSum - leftSum - nums[i]. Comparing them in O(1) yields an optimal O(n) solution with O(1) space.',
  },
  {
    id: 'subarray-sum-equals-k',
    number: 11,
    title: 'Subarray Sum Equals K',
    category: 'Arrays',
    difficulty: 'Medium',
    description:
      'Given an array of integers nums and an integer k, return the total number of subarrays whose sum equals to k. A subarray is a contiguous non-empty sequence of elements within an array.',
    examples: [
      { input: 'nums = [1,1,1], k = 2', output: '2' },
      { input: 'nums = [1,2,3], k = 3', output: '2', explanation: '[1,2] and [3]' },
    ],
    constraints: ['1 <= nums.length <= 2 * 10^4', '-1000 <= nums[i] <= 1000', '-10^7 <= k <= 10^7'],
    keyConcepts: ['Prefix Sum', 'Hash Map Frequency', 'Negative Numbers Invalidation of Sliding Window'],
    pattern: 'Prefix Sum + Hash Map Frequency',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    hints: [
      'Why does standard sliding window fail here? Because array elements can be negative, so expanding the window does not monotonically increase sum.',
      'Let prefixSum[i] be sum of elements up to i. We want prefixSum[i] - prefixSum[j] == k, which means prefixSum[j] == prefixSum[i] - k.',
      'Store frequency of prefix sums in an unordered_map, initialized with {0: 1}.',
    ],
    cppSolution: `#include <vector>
#include <unordered_map>

class Solution {
public:
    int subarraySum(const std::vector<int>& nums, int k) {
        std::unordered_map<int, int> prefixFreq;
        prefixFreq[0] = 1; // Base case: prefix sum of 0 appears once before starting

        int currentSum = 0;
        int count = 0;

        for (int num : nums) {
            currentSum += num;
            int targetPrefix = currentSum - k;
            auto it = prefixFreq.find(targetPrefix);
            if (it != prefixFreq.end()) {
                count += it->second;
            }
            prefixFreq[currentSum]++;
        }

        return count;
    }
};`,
    edgeCases: ['Array with negative numbers and zeroes', 'k = 0', 'Multiple contiguous subsets canceling to 0'],
    commonMistakes: [
      'Trying sliding window with two pointers (which only works for strictly non-negative numbers)',
      'Forgetting prefixFreq[0] = 1, which misses subarrays starting at index 0',
    ],
    interviewExplanation:
      'Crucial interview point: explain WHY sliding window fails (negative numbers break monotonicity). Then explain how prefix sums convert the problem into Two Sum logic: looking for how many times prefixSum - k has occurred before.',
  },
  {
    id: 'set-matrix-zeroes',
    number: 12,
    title: 'Set Matrix Zeroes',
    category: 'Arrays',
    difficulty: 'Medium',
    description:
      'Given an m x n integer matrix matrix, if an element is 0, set its entire row and column to 0\'s. You must do it in place without allocating a separate copy of the matrix.',
    examples: [
      {
        input: 'matrix = [[1,1,1],[1,0,1],[1,1,1]]',
        output: '[[1,0,1],[0,0,0],[1,0,1]]',
      },
      {
        input: 'matrix = [[0,1,2,0],[3,4,5,2],[1,3,1,5]]',
        output: '[[0,0,0,0],[0,4,5,0],[0,3,1,0]]',
      },
    ],
    constraints: ['m == matrix.length', 'n == matrix[0].length', '1 <= m, n <= 200', '-2^31 <= matrix[i][j] <= 2^31 - 1'],
    keyConcepts: ['Matrix In-Place Markers', 'Row 0 & Col 0 As State', 'O(1) Space'],
    pattern: 'In-Place State Flagging',
    timeComplexity: 'O(m * n)',
    spaceComplexity: 'O(1)',
    hints: [
      'Using an m*n copy takes O(m*n) space. Using two boolean arrays takes O(m + n) space. Can you use the first row and first column as those marker arrays?',
      'Because matrix[0][0] overlaps both row 0 and col 0, track whether the first column should be zeroed in a separate boolean variable.',
      'Iterate through the rest of the matrix (from 1,1) and use row 0 and col 0 to mark zeroes. Then zero out from bottom-up or right-to-left.',
    ],
    cppSolution: `#include <vector>

class Solution {
public:
    void setZeroes(std::vector<std::vector<int>>& matrix) {
        int m = static_cast<int>(matrix.size());
        int n = static_cast<int>(matrix[0].size());
        bool firstColZero = false;

        for (int i = 0; i < m; ++i) {
            if (matrix[i][0] == 0) firstColZero = true;
            for (int j = 1; j < n; ++j) {
                if (matrix[i][j] == 0) {
                    matrix[i][0] = 0;
                    matrix[0][j] = 0;
                }
            }
        }

        // Apply marks from bottom-right up to avoid corrupting header flags
        for (int i = m - 1; i >= 0; --i) {
            for (int j = n - 1; j >= 1; --j) {
                if (matrix[i][0] == 0 || matrix[0][j] == 0) {
                    matrix[i][j] = 0;
                }
            }
            if (firstColZero) {
                matrix[i][0] = 0;
            }
        }
    }
};`,
    edgeCases: ['1x1 matrix', 'First row or first column contains zero initially', 'Matrix with no zeroes'],
    commonMistakes: ['Overwriting row 0 and col 0 too early before reading their values for inner cells'],
    interviewExplanation:
      'Explain space hierarchy: O(m*n) naive copy -> O(m+n) row/col indicator arrays -> O(1) using matrix[0][..] and matrix[..][0] as indicators with a single extra flag for column 0.',
  },
];
