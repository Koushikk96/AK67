import { DSAProblem } from '@/types/dsa';

export const recursionBacktrackingProblems: DSAProblem[] = [
  {
    id: 'subsets',
    number: 39,
    title: 'Subsets',
    category: 'Recursion & Backtracking',
    difficulty: 'Medium',
    description:
      'Given an integer array nums of unique elements, return all possible subsets (the power set). The solution set must not contain duplicate subsets. Return the solution in any order.',
    examples: [
      { input: 'nums = [1,2,3]', output: '[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]' },
      { input: 'nums = [0]', output: '[[],[0]]' },
    ],
    constraints: ['1 <= nums.length <= 10', '-10 <= nums[i] <= 10', 'All the numbers of nums are unique.'],
    keyConcepts: ['Power Set', 'Backtracking', 'Decision Tree (Include / Exclude)'],
    pattern: 'Backtracking (Include/Exclude or Start Index Loop)',
    timeComplexity: 'O(n * 2^n)',
    spaceComplexity: 'O(n) recursion stack (excluding output)',
    hints: [
      'For each element, you have two choices: either include it in the current subset, or exclude it.',
      'Alternatively, use a loop starting from index `start`: at each step, push current subset into result, then iterate i from start to n-1, add nums[i], recurse with i + 1, and pop.',
      'Total number of subsets is 2^n. Each subset takes O(n) to copy.',
    ],
    cppSolution: `#include <vector>

class Solution {
public:
    std::vector<std::vector<int>> subsets(const std::vector<int>& nums) {
        std::vector<std::vector<int>> result;
        std::vector<int> current;
        backtrack(0, nums, current, result);
        return result;
    }

private:
    void backtrack(int start, const std::vector<int>& nums, std::vector<int>& current, std::vector<std::vector<int>>& result) {
        result.push_back(current);
        for (int i = start; i < static_cast<int>(nums.size()); ++i) {
            current.push_back(nums[i]);
            backtrack(i + 1, nums, current, result);
            current.pop_back(); // Backtrack
        }
    }
};`,
    edgeCases: ['Array of length 1 (returns [[], [x]])', 'Empty subset is always included'],
    commonMistakes: ['Passing current by value instead of reference, multiplying space and copying overhead exponentially'],
    interviewExplanation:
      'Explain the state-space tree. At each node, the current accumulator is a valid subset. Passing the accumulator by reference with push_back and pop_back minimizes heap allocations.',
  },
  {
    id: 'permutations',
    number: 40,
    title: 'Permutations',
    category: 'Recursion & Backtracking',
    difficulty: 'Medium',
    description:
      'Given an array nums of distinct integers, return all the possible permutations. You can return the answer in any order.',
    examples: [
      { input: 'nums = [1,2,3]', output: '[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]' },
      { input: 'nums = [0,1]', output: '[[0,1],[1,0]]' },
      { input: 'nums = [1]', output: '[[1]]' },
    ],
    constraints: ['1 <= nums.length <= 6', '-10 <= nums[i] <= 10', 'All the integers of nums are unique.'],
    keyConcepts: ['Permutation Tree', 'Swapping In-Place', 'Factorial Complexity n!'],
    pattern: 'In-Place Swap Backtracking',
    timeComplexity: 'O(n * n!)',
    spaceComplexity: 'O(n) recursion stack (excluding output)',
    hints: [
      'A permutation is an arrangement of all n elements.',
      'Instead of an extra boolean visited array, you can swap nums[first] with nums[i] for all i from first to n - 1.',
      'Recurse on first + 1, and then swap back to restore the original order.',
    ],
    cppSolution: `#include <vector>
#include <algorithm>

class Solution {
public:
    std::vector<std::vector<int>> permute(std::vector<int>& nums) {
        std::vector<std::vector<int>> result;
        backtrack(0, nums, result);
        return result;
    }

private:
    void backtrack(int first, std::vector<int>& nums, std::vector<std::vector<int>>& result) {
        if (first == static_cast<int>(nums.size())) {
            result.push_back(nums);
            return;
        }

        for (int i = first; i < static_cast<int>(nums.size()); ++i) {
            std::swap(nums[first], nums[i]);
            backtrack(first + 1, nums, result);
            std::swap(nums[first], nums[i]); // Backtrack
        }
    }
};`,
    edgeCases: ['Array of size 1 (1 permutation)', 'Array of size 2'],
    commonMistakes: ['Forgetting the undo swap (nums[first], nums[i]) which corrupts subsequent recursive branches'],
    interviewExplanation:
      'Highlight the in-place swap optimization: by swapping the candidate element into position `first`, we avoid allocating a `visited` boolean array. The recursion depth is n, taking O(n) stack space.',
  },
  {
    id: 'combination-sum',
    number: 41,
    title: 'Combination Sum',
    category: 'Recursion & Backtracking',
    difficulty: 'Medium',
    description:
      'Given an array of distinct integers candidates and a target integer target, return a list of all unique combinations of candidates where the chosen numbers sum to target. You may return the combinations in any order. The same number may be chosen from candidates an unlimited number of times. Two combinations are unique if the frequency of at least one of the chosen numbers is different.',
    examples: [
      {
        input: 'candidates = [2,3,6,7], target = 7',
        output: '[[2,2,3],[7]]',
        explanation: '2 and 3 are candidates, and 2 + 2 + 3 = 7. 7 is a candidate, and 7 = 7.',
      },
      { input: 'candidates = [2,3,5], target = 8', output: '[[2,2,2,2],[2,3,3],[3,5]]' },
      { input: 'candidates = [2], target = 1', output: '[]' },
    ],
    constraints: ['1 <= candidates.length <= 30', '2 <= candidates[i] <= 40', 'All elements of candidates are distinct.', '1 <= target <= 40'],
    keyConcepts: ['Unlimited Reuse', 'Pruning via Sorting', 'Target Decrement'],
    pattern: 'Backtracking with Unbounded Reuse',
    timeComplexity: 'O(2^target)',
    spaceComplexity: 'O(target / min(candidates))',
    hints: [
      'Sort candidates first so you can break the loop early as soon as candidate > remaining target.',
      'Because each number can be reused unlimited times, when picking candidates[i], the next recursive call should start from index i (not i + 1).',
      'Base cases: if remaining target == 0, add to result; if remaining target < 0, return.',
    ],
    cppSolution: `#include <vector>
#include <algorithm>

class Solution {
public:
    std::vector<std::vector<int>> combinationSum(std::vector<int>& candidates, int target) {
        std::sort(candidates.begin(), candidates.end());
        std::vector<std::vector<int>> result;
        std::vector<int> current;
        backtrack(0, target, candidates, current, result);
        return result;
    }

private:
    void backtrack(int start, int remaining, const std::vector<int>& candidates,
                   std::vector<int>& current, std::vector<std::vector<int>>& result) {
        if (remaining == 0) {
            result.push_back(current);
            return;
        }

        for (int i = start; i < static_cast<int>(candidates.size()); ++i) {
            if (candidates[i] > remaining) break; // Pruning via sorted order

            current.push_back(candidates[i]);
            // Pass i (not i + 1) to allow unlimited reuse of the same element
            backtrack(i, remaining - candidates[i], candidates, current, result);
            current.pop_back(); // Backtrack
        }
    }
};`,
    edgeCases: ['Target smaller than smallest candidate (returns [])', 'Single candidate dividing target evenly', 'Multiple combinations of different lengths'],
    commonMistakes: ['Passing 0 instead of start index i, causing duplicate permutations of the same combination like [2, 2, 3] and [3, 2, 2]'],
    interviewExplanation:
      'Sorting enables early termination (`break`) when candidates[i] > remaining. Passing index `i` (instead of `i + 1`) allows unlimited reuse while preventing duplicate permutations.',
  },
  {
    id: 'letter-combinations-of-a-phone-number',
    number: 42,
    title: 'Letter Combinations of a Phone Number',
    category: 'Recursion & Backtracking',
    difficulty: 'Medium',
    description:
      'Given a string containing digits from 2-9 inclusive, return all possible letter combinations that the number could represent. Return the answer in any order. A mapping of digits to letters (just like on the telephone buttons) is given below. Note that 1 does not map to any letters: 2: "abc", 3: "def", 4: "ghi", 5: "jkl", 6: "mno", 7: "pqrs", 8: "tuv", 9: "wxyz".',
    examples: [
      { input: 'digits = "23"', output: '["ad","ae","af","bd","be","bf","cd","ce","cf"]' },
      { input: 'digits = ""', output: '[]' },
      { input: 'digits = "2"', output: '["a","b","c"]' },
    ],
    constraints: ['0 <= digits.length <= 4', 'digits[i] is a digit in the range [\'2\', \'9\'].'],
    keyConcepts: ['Cartesian Product', 'Keypad Lookup Table', 'DFS Backtracking'],
    pattern: 'Multi-Branch Combinatorial Recursion',
    timeComplexity: 'O(4^n * n) where n is length of digits',
    spaceComplexity: 'O(n) recursion stack',
    hints: [
      'Create a static mapping table from digit characters \'2\'-\'9\' to their respective letter strings.',
      'Maintain an index pointing to the current digit in digits.',
      'For each character mapped to digits[index], append it to the current path, recurse for index + 1, and pop.',
    ],
    cppSolution: `#include <vector>
#include <string>

class Solution {
public:
    std::vector<std::string> letterCombinations(const std::string& digits) {
        if (digits.empty()) return {};

        std::vector<std::string> mapping = {
            "", "", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"
        };

        std::vector<std::string> result;
        std::string current;
        backtrack(0, digits, mapping, current, result);
        return result;
    }

private:
    void backtrack(int index, const std::string& digits, const std::vector<std::string>& mapping,
                   std::string& current, std::vector<std::string>& result) {
        if (index == static_cast<int>(digits.length())) {
            result.push_back(current);
            return;
        }

        const std::string& letters = mapping[digits[index] - '0'];
        for (char ch : letters) {
            current.push_back(ch);
            backtrack(index + 1, digits, mapping, current, result);
            current.pop_back(); // Backtrack
        }
    }
};`,
    edgeCases: ['Empty input string digits = "" (must return empty list [])', 'Single digit', 'Digit with 4 letters (\'7\' or \'9\')'],
    commonMistakes: ['Returning [""] instead of [] for empty input string'],
    interviewExplanation:
      'Map keypad characters to a static array. A depth-first backtracking search navigates down each digit layer until index reaches digits.length().',
  },
  {
    id: 'generate-parentheses',
    number: 43,
    title: 'Generate Parentheses',
    category: 'Recursion & Backtracking',
    difficulty: 'Medium',
    description:
      'Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.',
    examples: [
      { input: 'n = 3', output: '["((()))","(()())","(())()","()(())","()()()"]' },
      { input: 'n = 1', output: '["()"]' },
    ],
    constraints: ['1 <= n <= 8'],
    keyConcepts: ['Catalan Number C_n', 'Valid Parentheses Invariant', 'Pruned Recursion'],
    pattern: 'Constraint-Guided Backtracking',
    timeComplexity: 'O(4^n / sqrt(n)) (Catalan number growth)',
    spaceComplexity: 'O(n) recursion stack',
    hints: [
      'You can only add an open parenthesis \'(\' if the number of open parentheses used is less than n.',
      'You can only add a close parenthesis \')\' if the number of close parentheses used is strictly less than the number of open parentheses used.',
      'When the current string length reaches 2 * n, a valid well-formed combination is complete.',
    ],
    cppSolution: `#include <vector>
#include <string>

class Solution {
public:
    std::vector<std::string> generateParenthesis(int n) {
        std::vector<std::string> result;
        std::string current;
        backtrack(0, 0, n, current, result);
        return result;
    }

private:
    void backtrack(int openCount, int closeCount, int n,
                   std::string& current, std::vector<std::string>& result) {
        if (static_cast<int>(current.length()) == 2 * n) {
            result.push_back(current);
            return;
        }

        if (openCount < n) {
            current.push_back('(');
            backtrack(openCount + 1, closeCount, n, current, result);
            current.pop_back();
        }

        if (closeCount < openCount) {
            current.push_back(')');
            backtrack(openCount, closeCount + 1, n, current, result);
            current.pop_back();
        }
    }
};`,
    edgeCases: ['n = 1 (returns ["()"])', 'Maximum constraint n = 8 (1430 combinations)'],
    commonMistakes: ['Generating all 2^(2n) strings and filtering with a stack afterwards, which explodes exponentially compared to pruning on the fly'],
    interviewExplanation:
      'Only explore valid states by enforcing two rules: open < n to place \'(\', and close < open to place \')\'. This generates strictly valid parentheses with zero dead-end branches.',
  },
];
