import { DSAProblem } from '@/types/dsa';

export const dynamicProgrammingProblems: DSAProblem[] = [
  {
    id: 'climbing-stairs',
    number: 60,
    title: 'Climbing Stairs',
    category: 'Dynamic Programming',
    difficulty: 'Easy',
    description:
      'You are climbing a staircase that takes n steps to reach the top. Each time you can climb either 1 or 2 steps. Determine how many distinct ways you can climb to the top.',
    examples: [
      { input: 'n = 2', output: '2', explanation: '1. 1 step + 1 step; 2. 2 steps.' },
      { input: 'n = 3', output: '3', explanation: '1. 1+1+1; 2. 1+2; 3. 2+1.' },
    ],
    constraints: ['1 <= n <= 45'],
    keyConcepts: ['Fibonacci Recurrence', 'State Transition', 'O(1) Memory'],
    pattern: '1D State DP / Fibonacci',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    hints: [
      'To reach step i, you could have come from step i-1 (1 step jump) or step i-2 (2 steps jump).',
      'The recurrence relation is: ways(i) = ways(i-1) + ways(i-2).',
      'This is the Fibonacci sequence. Maintain two previous variables (prev1, prev2) for O(1) space.',
    ],
    cppSolution: `class Solution {
public:
    int climbStairs(int n) {
        if (n <= 2) return n;

        int prev2 = 1;
        int prev1 = 2;

        for (int i = 3; i <= n; ++i) {
            int current = prev1 + prev2;
            prev2 = prev1;
            prev1 = current;
        }

        return prev1;
    }
};`,
    edgeCases: ['n = 1 (returns 1)', 'n = 2 (returns 2)', 'Maximum constraint n = 45 (fits in 32-bit int)'],
    commonMistakes: ['Using unmemoized naive recursion which runs in exponential O(2^n) time'],
    interviewExplanation:
      'Identify the overlapping subproblems: reaching step n depends solely on steps n-1 and n-2. Optimizing the DP table from O(n) array to two scalar variables achieves O(1) space.',
  },
  {
    id: 'house-robber',
    number: 61,
    title: 'House Robber',
    category: 'Dynamic Programming',
    difficulty: 'Medium',
    description:
      'You are planning to rob houses along a street, where each house has a certain amount of money stashed. Adjacent houses have connected security alarms and will alert the police if two adjacent houses are broken into on the same night. Calculate the maximum amount of money you can rob without alerting the police.',
    examples: [
      { input: 'nums = [1,2,3,1]', output: '4', explanation: 'Rob house 1 (money = 1) and house 3 (money = 3). Total = 4.' },
      { input: 'nums = [2,7,9,3,1]', output: '12', explanation: 'Rob house 1 (2), house 3 (9), house 5 (1). Total = 12.' },
    ],
    constraints: ['1 <= nums.length <= 100', '0 <= nums[i] <= 400'],
    keyConcepts: ['Non-Adjacent Subsets', 'Decision Choice: Rob or Skip', 'State Compression'],
    pattern: 'Include / Exclude 1D DP',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    hints: [
      'At house i, you have two choices: rob house i (which means you cannot rob house i-1), or skip house i.',
      'Recurrence: dp[i] = max(dp[i-1], dp[i-2] + nums[i]).',
      'Because dp[i] only depends on the previous two values, you only need two rolling variables.',
    ],
    cppSolution: `#include <vector>
#include <algorithm>

class Solution {
public:
    int rob(const std::vector<int>& nums) {
        if (nums.empty()) return 0;
        if (nums.size() == 1) return nums[0];

        int prev2 = 0;
        int prev1 = 0;

        for (int num : nums) {
            int current = std::max(prev1, prev2 + num);
            prev2 = prev1;
            prev1 = current;
        }

        return prev1;
    }
};`,
    edgeCases: ['Single house', 'Two houses', 'All houses have 0 money'],
    commonMistakes: ['Thinking a simple alternating parity sum (even indices vs odd indices) works; e.g. [2, 1, 1, 2] yields 4 by skipping two middle houses'],
    interviewExplanation:
      'Emphasize why greedily picking odd or even indices fails (e.g. [2, 1, 1, 2]). DP evaluates both possibilities at each house: rob current (prev2 + num) or skip current (prev1).',
  },
  {
    id: 'min-cost-climbing-stairs',
    number: 62,
    title: 'Min Cost Climbing Stairs',
    category: 'Dynamic Programming',
    difficulty: 'Easy',
    description:
      'You are given an integer array cost where cost[i] is the cost of ith step on a staircase. Once you pay the cost, you can either climb one or two steps. You can either start from the step with index 0, or index 1. Return the minimum cost to reach the top of the floor.',
    examples: [
      { input: 'cost = [10,15,20]', output: '15', explanation: 'Start at index 1, pay 15 and climb two steps to reach the top.' },
      { input: 'cost = [1,100,1,1,1,100,1,1,100,1]', output: '6' },
    ],
    constraints: ['2 <= cost.length <= 1000', '0 <= cost[i] <= 999'],
    keyConcepts: ['Cost Minimization', 'Bottom-Up DP', 'Space Optimization'],
    pattern: '1D State Minimization',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    hints: [
      'The top floor is at index n.',
      'The minimum cost to reach step i is: dp[i] = min(dp[i-1] + cost[i-1], dp[i-2] + cost[i-2]).',
      'Optimize space by storing only the previous two step costs.',
    ],
    cppSolution: `#include <vector>
#include <algorithm>

class Solution {
public:
    int minCostClimbingStairs(const std::vector<int>& cost) {
        int prev2 = 0;
        int prev1 = 0;

        for (size_t i = 2; i <= cost.size(); ++i) {
            int current = std::min(prev1 + cost[i - 1], prev2 + cost[i - 2]);
            prev2 = prev1;
            prev1 = current;
        }

        return prev1;
    }
};`,
    edgeCases: ['Array of length 2 (return min(cost[0], cost[1]))', 'All zero costs', 'Alternating small and large costs'],
    commonMistakes: ['Assuming the top floor is at index n - 1 instead of index n'],
    interviewExplanation:
      'The top of the floor is past the end of the array (index n). Base cases dp[0] = 0 and dp[1] = 0 represent starting choices. Rolling two variables achieves O(1) space.',
  },
  {
    id: 'coin-change',
    number: 63,
    title: 'Coin Change',
    category: 'Dynamic Programming',
    difficulty: 'Medium',
    description:
      'Given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money, return the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return -1. You may assume that you have an infinite number of each kind of coin.',
    examples: [
      { input: 'coins = [1,2,5], amount = 11', output: '3', explanation: '11 = 5 + 5 + 1' },
      { input: 'coins = [2], amount = 3', output: '-1' },
      { input: 'coins = [1], amount = 0', output: '0' },
    ],
    constraints: ['1 <= coins.length <= 12', '1 <= coins[i] <= 2^31 - 1', '0 <= amount <= 10^4'],
    keyConcepts: ['Unbounded Knapsack', 'Bottom-Up Table', 'Infinity Sentinel'],
    pattern: 'Unbounded Knapsack DP',
    timeComplexity: 'O(amount * coins.length)',
    spaceComplexity: 'O(amount)',
    hints: [
      'Greedy choice does not always work (e.g. coins [1, 3, 4], amount 6: greedy picks 4 + 1 + 1 = 3 coins, but optimal is 3 + 3 = 2 coins).',
      'Create a dp array of size amount + 1, initialized to amount + 1 (representing infinity), with dp[0] = 0.',
      'For each target value from 1 to amount, and each coin c: if target >= c, dp[target] = min(dp[target], dp[target - c] + 1).',
    ],
    cppSolution: `#include <vector>
#include <algorithm>

class Solution {
public:
    int coinChange(const std::vector<int>& coins, int amount) {
        std::vector<int> dp(amount + 1, amount + 1);
        dp[0] = 0;

        for (int i = 1; i <= amount; ++i) {
            for (int c : coins) {
                if (i >= c) {
                    dp[i] = std::min(dp[i], dp[i - c] + 1);
                }
            }
        }

        return dp[amount] > amount ? -1 : dp[amount];
    }
};`,
    edgeCases: ['amount = 0 (returns 0)', 'Impossible amount (e.g. amount=3 with coin=2, returns -1)', 'Coin value greater than amount'],
    commonMistakes: [
      'Using a greedy approach (taking largest coin first fails for non-canonical coin systems)',
      'Initializing with INT_MAX and adding 1, causing 32-bit integer overflow',
    ],
    interviewExplanation:
      'Prove why greedy fails with an example (coins=[1, 3, 4], amount=6). Formulate the subproblem dp[i] = min(dp[i - c] + 1). Using amount + 1 as sentinel avoids integer overflow.',
  },
  {
    id: 'maximum-product-subarray',
    number: 64,
    title: 'Maximum Product Subarray',
    category: 'Dynamic Programming',
    difficulty: 'Medium',
    description:
      'Given an integer array nums, find a subarray that has the largest product, and return the product.',
    examples: [
      { input: 'nums = [2,3,-2,4]', output: '6', explanation: '[2,3] has the largest product 6.' },
      { input: 'nums = [-2,0,-1]', output: '0', explanation: 'The result cannot be 2, because [-2,-1] is not a contiguous subarray.' },
    ],
    constraints: ['1 <= nums.length <= 2 * 10^4', '-10 <= nums[i] <= 10', 'The product of any prefix or suffix fits in a 32-bit integer.'],
    keyConcepts: ['Dual Tracking: Max and Min', 'Negative Sign Flips', 'O(1) Space'],
    pattern: 'Kadane with Min/Max Tracking',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    hints: [
      'Why is this harder than Maximum Subarray sum? Because multiplying a negative number by another negative number turns it positive!',
      'Maintain two running products: currentMax and currentMin.',
      'When nums[i] is negative, multiplying by currentMax produces a minimum, and multiplying by currentMin produces a maximum. Swap currentMax and currentMin when nums[i] < 0!',
    ],
    cppSolution: `#include <vector>
#include <algorithm>

class Solution {
public:
    int maxProduct(const std::vector<int>& nums) {
        int maxProd = nums[0];
        int minProd = nums[0];
        int result = nums[0];

        for (size_t i = 1; i < nums.size(); ++i) {
            if (nums[i] < 0) {
                std::swap(maxProd, minProd);
            }

            maxProd = std::max(nums[i], maxProd * nums[i]);
            minProd = std::min(nums[i], minProd * nums[i]);

            result = std::max(result, maxProd);
        }

        return result;
    }
};`,
    edgeCases: ['Array containing zeroes (resets product to current element)', 'All negative numbers with odd length', 'Single element array'],
    commonMistakes: ['Only tracking maxProd; forgetting that minProd * negative can produce the new global maximum'],
    interviewExplanation:
      'Because multiplying by a negative reverses signs, tracking both the maximum and minimum subarray product ending at index i is essential. Swapping max and min when nums[i] < 0 maintains the invariant in O(1) space.',
  },
];
