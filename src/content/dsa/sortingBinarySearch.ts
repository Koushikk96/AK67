import { DSAProblem } from '@/types/dsa';

export const sortingBinarySearchProblems: DSAProblem[] = [
  {
    id: 'binary-search',
    number: 32,
    title: 'Binary Search',
    category: 'Sorting & Binary Search',
    difficulty: 'Easy',
    description:
      'Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to search target in nums. If target exists, then return its index. Otherwise, return -1. You must write an algorithm with O(log n) runtime complexity.',
    examples: [
      { input: 'nums = [-1,0,3,5,9,12], target = 9', output: '4', explanation: '9 exists in nums and its index is 4' },
      { input: 'nums = [-1,0,3,5,9,12], target = 2', output: '-1', explanation: '2 does not exist in nums so return -1' },
    ],
    constraints: ['1 <= nums.length <= 10^4', '-10^4 < nums[i], target < 10^4', 'All the integers in nums are unique.', 'nums is sorted in ascending order.'],
    keyConcepts: ['Halving Search Space', 'Midpoint Calculation', 'Bound Invariants'],
    pattern: 'Standard Binary Search',
    timeComplexity: 'O(log n)',
    spaceComplexity: 'O(1)',
    hints: [
      'Maintain search interval [left, right] with left = 0, right = n - 1.',
      'Use mid = left + (right - left) / 2 to prevent 32-bit integer overflow.',
      'If nums[mid] == target return mid. If nums[mid] < target search right (left = mid + 1), else search left (right = mid - 1).',
    ],
    cppSolution: `#include <vector>

class Solution {
public:
    int search(const std::vector<int>& nums, int target) {
        int left = 0;
        int right = static_cast<int>(nums.size()) - 1;

        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] == target) {
                return mid;
            } else if (nums[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }

        return -1;
    }
};`,
    edgeCases: ['Single element array (found or not found)', 'Target smaller than smallest or greater than largest', 'Two element array'],
    commonMistakes: ['Computing mid as (left + right) / 2 which risks 32-bit signed integer overflow when left + right > INT_MAX'],
    interviewExplanation:
      'State the invariant: at each step, search space is halved. Emphasize why `left + (right - left) / 2` is preferred over `(left + right) / 2` in production systems.',
  },
  {
    id: 'search-insert-position',
    number: 33,
    title: 'Search Insert Position',
    category: 'Sorting & Binary Search',
    difficulty: 'Easy',
    description:
      'Given a sorted array of distinct integers and a target value, return the index if the target is found. If not, return the index where it would be if it were inserted in order. You must write an algorithm with O(log n) runtime complexity.',
    examples: [
      { input: 'nums = [1,3,5,6], target = 5', output: '2' },
      { input: 'nums = [1,3,5,6], target = 2', output: '1' },
      { input: 'nums = [1,3,5,6], target = 7', output: '4' },
    ],
    constraints: ['1 <= nums.length <= 10^4', '-10^4 <= nums[i] <= 10^4', 'nums contains distinct values sorted in ascending order.', '-10^4 <= target <= 10^4'],
    keyConcepts: ['Lower Bound', 'Insertion Point Invariant', 'Binary Search'],
    pattern: 'Lower Bound Binary Search',
    timeComplexity: 'O(log n)',
    spaceComplexity: 'O(1)',
    hints: [
      'This problem is equivalent to finding the smallest index with nums[index] >= target (lower_bound in C++).',
      'Run standard binary search while left <= right.',
      'When the loop finishes, left will naturally point to the correct insertion index.',
    ],
    cppSolution: `#include <vector>

class Solution {
public:
    int searchInsert(const std::vector<int>& nums, int target) {
        int left = 0;
        int right = static_cast<int>(nums.size()) - 1;

        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] == target) {
                return mid;
            } else if (nums[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }

        return left;
    }
};`,
    edgeCases: ['Target smaller than all elements (insert at 0)', 'Target greater than all elements (insert at n)', 'Target exists in array'],
    commonMistakes: ['Returning -1 or right instead of left when target is absent'],
    interviewExplanation:
      'Explain that upon loop termination where left > right, left is guaranteed to be at the exact first index where nums[left] >= target, matching the behavior of std::lower_bound.',
  },
  {
    id: 'find-first-and-last-position',
    number: 34,
    title: 'Find First and Last Position of Element in Sorted Array',
    category: 'Sorting & Binary Search',
    difficulty: 'Medium',
    description:
      'Given an array of integers nums sorted in non-decreasing order, find the starting and ending position of a given target value. If target is not found in the array, return [-1, -1]. You must write an algorithm with O(log n) runtime complexity.',
    examples: [
      { input: 'nums = [5,7,7,8,8,10], target = 8', output: '[3,4]' },
      { input: 'nums = [5,7,7,8,8,10], target = 6', output: '[-1,-1]' },
      { input: 'nums = [], target = 0', output: '[-1,-1]' },
    ],
    constraints: ['0 <= nums.length <= 10^5', '-10^9 <= nums[i] <= 10^9', 'nums is a non-decreasing array.', '-10^9 <= target <= 10^9'],
    keyConcepts: ['Dual Binary Search', 'First Occurrence', 'Last Occurrence'],
    pattern: 'Boundary Binary Search (Lower & Upper Bound)',
    timeComplexity: 'O(log n)',
    spaceComplexity: 'O(1)',
    hints: [
      'Run two independent binary searches: one to find the first occurrence, and one to find the last occurrence.',
      'To find the first occurrence: when nums[mid] == target, record mid and search left (right = mid - 1).',
      'To find the last occurrence: when nums[mid] == target, record mid and search right (left = mid + 1).',
    ],
    cppSolution: `#include <vector>

class Solution {
public:
    std::vector<int> searchRange(const std::vector<int>& nums, int target) {
        return {findBound(nums, target, true), findBound(nums, target, false)};
    }

private:
    int findBound(const std::vector<int>& nums, int target, bool isFirst) {
        int left = 0;
        int right = static_cast<int>(nums.size()) - 1;
        int result = -1;

        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] == target) {
                result = mid;
                if (isFirst) {
                    right = mid - 1; // Keep searching left
                } else {
                    left = mid + 1;  // Keep searching right
                }
            } else if (nums[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }

        return result;
    }
};`,
    edgeCases: ['Empty array', 'Target not present in array', 'All elements equal to target (e.g. [8, 8, 8, 8])'],
    commonMistakes: ['Finding one occurrence and expanding linearly left and right, which degrades to O(n) worst case'],
    interviewExplanation:
      'Explain why linear expansion from mid is rejected: if all elements are equal to target, linear expansion takes O(n). Two clean O(log n) binary searches preserve the strict logarithmic requirement.',
  },
  {
    id: 'search-in-rotated-sorted-array',
    number: 35,
    title: 'Search in Rotated Sorted Array',
    category: 'Sorting & Binary Search',
    difficulty: 'Medium',
    description:
      'There is an integer array nums sorted in ascending order (with distinct values). Prior to being passed to your function, nums is possibly rotated at an unknown pivot index k. Given the array nums after the possible rotation and an integer target, return the index of target if it is in nums, or -1 if it is not in nums. You must write an algorithm with O(log n) runtime complexity.',
    examples: [
      { input: 'nums = [4,5,6,7,0,1,2], target = 0', output: '4' },
      { input: 'nums = [4,5,6,7,0,1,2], target = 3', output: '-1' },
      { input: 'nums = [1], target = 0', output: '-1' },
    ],
    constraints: ['1 <= nums.length <= 5000', '-10^4 <= nums[i] <= 10^4', 'All values of nums are unique.', 'nums is an ascending array that is possibly rotated.', '-10^4 <= target <= 10^4'],
    keyConcepts: ['Rotated Array Partition', 'Sorted Half Identification', 'Logarithmic Search'],
    pattern: 'Modified Binary Search (Sorted Half Check)',
    timeComplexity: 'O(log n)',
    spaceComplexity: 'O(1)',
    hints: [
      'In a rotated sorted array, whenever you divide the array at mid, AT LEAST ONE half is guaranteed to be strictly sorted.',
      'Check if the left half is sorted: nums[left] <= nums[mid].',
      'If left is sorted, check if target falls in [nums[left], nums[mid]). If yes, search left; else search right. If right is sorted, do the symmetric check.',
    ],
    cppSolution: `#include <vector>

class Solution {
public:
    int search(const std::vector<int>& nums, int target) {
        int left = 0;
        int right = static_cast<int>(nums.size()) - 1;

        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] == target) return mid;

            // Check if left half is sorted
            if (nums[left] <= nums[mid]) {
                if (nums[left] <= target && target < nums[mid]) {
                    right = mid - 1;
                } else {
                    left = mid + 1;
                }
            } else { // Right half is sorted
                if (nums[mid] < target && target <= nums[right]) {
                    left = mid + 1;
                } else {
                    right = mid - 1;
                }
            }
        }

        return -1;
    }
};`,
    edgeCases: ['Array not rotated (standard sorted)', 'Single element array', 'Target is at the rotation pivot'],
    commonMistakes: ['Trying to find pivot index first with extra passes instead of doing it in a single modified binary search pass'],
    interviewExplanation:
      'Key insight: either nums[left..mid] is sorted or nums[mid..right] is sorted. Identify which half is sorted first, check if target lies within that sorted range, and discard the other half.',
  },
  {
    id: 'find-minimum-in-rotated-sorted-array',
    number: 36,
    title: 'Find Minimum in Rotated Sorted Array',
    category: 'Sorting & Binary Search',
    difficulty: 'Medium',
    description:
      'Suppose an array of length n sorted in ascending order is rotated between 1 and n times. Given the sorted rotated array nums of unique elements, return the minimum element of this array. You must write an algorithm that runs in O(log n) time.',
    examples: [
      { input: 'nums = [3,4,5,1,2]', output: '1', explanation: 'Original was [1,2,3,4,5] rotated 3 times.' },
      { input: 'nums = [4,5,6,7,0,1,2]', output: '0', explanation: 'Original was [0,1,2,4,5,6,7] and it was rotated 4 times.' },
      { input: 'nums = [11,13,15,17]', output: '11', explanation: 'Rotated 4 times.' },
    ],
    constraints: ['n == nums.length', '1 <= n <= 5000', '-5000 <= nums[i] <= 5000', 'All the integers of nums are unique.', 'nums is sorted and rotated between 1 and n times.'],
    keyConcepts: ['Inflection Point / Pivot', 'Comparison with Right Boundary', 'Logarithmic Search'],
    pattern: 'Binary Search for Inflection Point',
    timeComplexity: 'O(log n)',
    spaceComplexity: 'O(1)',
    hints: [
      'Compare nums[mid] with nums[right]. Why with right instead of left?',
      'If nums[mid] > nums[right], the minimum MUST lie strictly to the right of mid (left = mid + 1).',
      'If nums[mid] < nums[right], mid could be the minimum itself or the minimum is to the left (right = mid).',
    ],
    cppSolution: `#include <vector>

class Solution {
public:
    int findMin(const std::vector<int>& nums) {
        int left = 0;
        int right = static_cast<int>(nums.size()) - 1;

        while (left < right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] > nums[right]) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }

        return nums[left];
    }
};`,
    edgeCases: ['Array not rotated at all (e.g. [1, 2, 3])', 'Array of size 1', 'Array rotated by n - 1 times'],
    commonMistakes: ['Setting right = mid - 1 when nums[mid] < nums[right], which might skip mid when mid itself is the minimum'],
    interviewExplanation:
      'By comparing nums[mid] with nums[right], we deterministically locate the inflection point. When nums[mid] > nums[right], the drop occurs in the right half (left = mid + 1); otherwise right = mid.',
  },
  {
    id: 'koko-eating-bananas',
    number: 37,
    title: 'Koko Eating Bananas',
    category: 'Sorting & Binary Search',
    difficulty: 'Medium',
    description:
      'Koko loves to eat bananas. There are n piles of bananas, the ith pile has piles[i] bananas. The guards have gone and will come back in h hours. Koko can decide her bananas-per-hour eating speed of k. Each hour, she chooses some pile and eats k bananas from it. If the pile has less than k bananas, she eats all of them and will not eat any more bananas during this hour. Return the minimum integer k such that she can eat all the bananas within h hours.',
    examples: [
      { input: 'piles = [3,6,7,11], h = 8', output: '4' },
      { input: 'piles = [30,11,23,4,20], h = 5', output: '30' },
      { input: 'piles = [30,11,23,4,20], h = 6', output: '23' },
    ],
    constraints: ['1 <= piles.length <= 10^4', 'piles.length <= h <= 10^9', '1 <= piles[i] <= 10^9'],
    keyConcepts: ['Binary Search on Answer Space', 'Ceiling Division', 'Monotonic Predicate'],
    pattern: 'Binary Search on Value / Answer Space',
    timeComplexity: 'O(n * log(max(piles)))',
    spaceComplexity: 'O(1)',
    hints: [
      'What is the search range for speed k? Minimum speed is 1, maximum speed is max(piles).',
      'Notice the monotonicity: if speed k allows eating all bananas in <= h hours, any speed > k will also work.',
      'Binary search for the smallest k in [1, max(piles)] such that canFinish(piles, k, h) is true.',
    ],
    cppSolution: `#include <vector>
#include <algorithm>

class Solution {
public:
    int minEatingSpeed(const std::vector<int>& piles, int h) {
        int left = 1;
        int right = *std::max_element(piles.begin(), piles.end());
        int ans = right;

        while (left <= right) {
            int mid = left + (right - left) / 2;
            long long hoursNeeded = 0;

            for (int p : piles) {
                // Ceiling division: (p + mid - 1) / mid
                hoursNeeded += (p + mid - 1LL) / mid;
            }

            if (hoursNeeded <= h) {
                ans = mid;
                right = mid - 1; // Try slower speed
            } else {
                left = mid + 1;  // Must eat faster
            }
        }

        return ans;
    }
};`,
    edgeCases: ['h == piles.length (speed must equal max(piles))', 'piles contains values near 10^9 (use long long for hoursNeeded)', 'Single pile'],
    commonMistakes: ['32-bit overflow when summing hoursNeeded (long long is required as hoursNeeded can exceed 2^31 - 1)'],
    interviewExplanation:
      'Frame this as "Binary Search on Answer Space". The predicate canFinish(k) is monotonic: false, false, ..., true, true. Ceiling division (p + mid - 1) / mid computes hours per pile in O(1).',
  },
  {
    id: 'merge-intervals',
    number: 38,
    title: 'Merge Intervals',
    category: 'Sorting & Binary Search',
    difficulty: 'Medium',
    description:
      'Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.',
    examples: [
      {
        input: 'intervals = [[1,3],[2,6],[8,10],[15,18]]',
        output: '[[1,6],[8,10],[15,18]]',
        explanation: 'Since intervals [1,3] and [2,6] overlap, merge them into [1,6].',
      },
      { input: 'intervals = [[1,4],[4,5]]', output: '[[1,5]]', explanation: 'Intervals [1,4] and [4,5] are considered overlapping.' },
    ],
    constraints: ['1 <= intervals.length <= 10^4', 'intervals[i].length == 2', '0 <= starti <= endi <= 10^4'],
    keyConcepts: ['Sorting by Start Time', 'Interval Overlap Condition', 'In-Place Extension'],
    pattern: 'Interval Sorting & Merging',
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(1) auxiliary (excluding output array)',
    hints: [
      'Sort the intervals by their start times: intervals[i][0].',
      'Insert the first interval into merged.',
      'For each subsequent interval: if its start <= merged.back()[1], merge them by merged.back()[1] = max(merged.back()[1], interval[1]). Otherwise, append it as a new interval.',
    ],
    cppSolution: `#include <vector>
#include <algorithm>

class Solution {
public:
    std::vector<std::vector<int>> merge(std::vector<std::vector<int>>& intervals) {
        if (intervals.empty()) return {};

        std::sort(intervals.begin(), intervals.end());
        std::vector<std::vector<int>> merged;
        merged.push_back(intervals[0]);

        for (size_t i = 1; i < intervals.size(); ++i) {
            auto& last = merged.back();
            if (intervals[i][0] <= last[1]) {
                last[1] = std::max(last[1], intervals[i][1]);
            } else {
                merged.push_back(intervals[i]);
            }
        }

        return merged;
    }
};`,
    edgeCases: ['All intervals overlap into one', 'No intervals overlap', 'Adjacent touching intervals [1,4] and [4,5] (considered overlapping)'],
    commonMistakes: ['Forgetting std::max when updating last[1], which fails for contained intervals like [1, 10] and [2, 5]'],
    interviewExplanation:
      'Sorting by start time guarantees that any potential overlap must involve the immediately preceding merged interval. A single linear scan then merges or appends in O(n), bounded only by the initial O(n log n) sort.',
  },
];
