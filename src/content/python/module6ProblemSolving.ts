import { MasteryTopic, MasteryModule } from '@/types/mastery';

export const module6Topics: MasteryTopic[] = [
  {
    id: 'py-59-dsa-arrays-strings',
    moduleId: 'py-m6',
    moduleNumber: 6,
    moduleTitle: 'Python Problem Solving',
    topicNumber: 59,
    title: 'Arrays & Strings: In-Place Swaps, Slicing & Prefix Sums',
    language: 'python',
    level: 'Beginner',
    whyItMatters:
      'Array and string problems constitute over 40% of all fresher technical rounds. Leveraging Python\'s simultaneous assignment (`a, b = b, a`) and slicing enables concise, optimal $O(n)$ implementations.',
    explanation:
      'Core array and string patterns in Python include:\n1. **Prefix Sums**: Precomputing cumulative sums array `prefix[i] = prefix[i-1] + nums[i]` allowing $O(1)$ range sum queries.\n2. **In-place Swaps**: `nums[i], nums[j] = nums[j], nums[i]` performs atomic swaps without temporary variables.\n3. **Kadane\'s Algorithm**: Finding maximum contiguous subarray sum in $O(n)$ time and $O(1)$ space by tracking `max(num, current_sum + num)`.\n4. **Dutch National Flag**: Partitioning 0s, 1s, and 2s in one pass using three pointers.',
    syntaxAndStructure:
      '# Atomic swap:\nnums[i], nums[j] = nums[j], nums[i]\n\n# Prefix sum construction:\nprefix = [0] * (len(nums) + 1)\nfor i, num in enumerate(nums):\n    prefix[i + 1] = prefix[i] + num\n# Query sum in range [L, R]: prefix[R + 1] - prefix[L]',
    codeExamples: [
      {
        title: 'Kadane\'s Algorithm (Maximum Subarray Sum) in Python',
        code: `def max_sub_array(nums: list[int]) -> int:
    max_so_far = nums[0]
    curr_max = nums[0]
    for num in nums[1:]:
        curr_max = max(num, curr_max + num)
        max_so_far = max(max_so_far, curr_max)
    return max_so_far

arr = [-2, 1, -3, 4, -1, 2, 1, -5, 4]
print("Max Subarray Sum:", max_sub_array(arr))`,
        expectedOutput: `Max Subarray Sum: 6`,
        explanation: 'Kadane\'s algorithm achieves optimal $O(n)$ time and $O(1)$ space by discarding negative cumulative prefixes.',
      },
      {
        title: 'Prefix Sums for Range Sum Query in O(1)',
        code: `class NumArray:
    def __init__(self, nums: list[int]):
        self.prefix = [0] * (len(nums) + 1)
        for i, n in enumerate(nums):
            self.prefix[i + 1] = self.prefix[i] + n

    def sum_range(self, left: int, right: int) -> int:
        # Sum of nums[left..right] in O(1) time
        return self.prefix[right + 1] - self.prefix[left]

query_engine = NumArray([1, 2, 3, 4, 5, 6])
print("Sum range [1, 4]:", query_engine.sum_range(1, 4)) # 2 + 3 + 4 + 5 = 14`,
        expectedOutput: `Sum range [1, 4]: 14`,
        explanation: 'Precomputing the prefix sum array enables answering arbitrary range sum queries in $O(1)$ time.',
      },
    ],
    realWorldApplications: [
      'Financial time-series cumulative return calculations.',
      'Audio buffer processing and image pixel summation (integral images).',
    ],
    commonMistakes: [
      'Using quadratic nested loops for range queries when prefix sum array solves it in $O(1)$.',
      'Off-by-one errors when indexing 1-based prefix arrays.',
    ],
    interviewRelevance:
      'High-frequency interview questions: "Maximum Subarray (Kadane)", "Product of Array Except Self", and "Range Sum Query".',
    checkpoints: [
      { id: 'py-59-cp-1', label: 'Use Kadane\'s algorithm for contiguous subarray maximums in O(n).' },
      { id: 'py-59-cp-2', label: 'Use prefix sums for O(1) range queries.' },
    ],
    practiceExercises: [
      {
        id: 'py-59-ex-1',
        title: 'Product of Array Except Self in O(n)',
        difficulty: 'Beginner',
        type: 'coding',
        prompt: 'Return an array `output` such that `output[i]` is the product of all elements of `nums` except `nums[i]` without using division.',
        starterCode: 'def product_except_self(nums: list[int]) -> list[int]:\n    pass',
        solution: `def product_except_self(nums: list[int]) -> list[int]:
    n = len(nums)
    res = [1] * n
    # Prefix product
    prefix = 1
    for i in range(n):
        res[i] = prefix
        prefix *= nums[i]
    # Suffix product
    suffix = 1
    for i in range(n - 1, -1, -1):
        res[i] *= suffix
        suffix *= nums[i]
    return res

print(product_except_self([1, 2, 3, 4]))  # [24, 12, 8, 6]`,
        explanation: 'Two-pass prefix and suffix product achieves $O(n)$ time with $O(1)$ extra space excluding the output array.',
      },
      {
        id: 'py-59-ex-2',
        title: 'Dutch National Flag Partition (Sort Colors)',
        difficulty: 'Intermediate',
        type: 'coding',
        prompt: 'Sort list of 0s, 1s, and 2s in-place in a single pass using three pointers.',
        starterCode: 'def sort_colors(nums: list[int]) -> None:\n    pass',
        solution: `def sort_colors(nums: list[int]) -> None:
    low, mid, high = 0, 0, len(nums) - 1
    while mid <= high:
        if nums[mid] == 0:
            nums[low], nums[mid] = nums[mid], nums[low]
            low += 1
            mid += 1
        elif nums[mid] == 1:
            mid += 1
        else:
            nums[mid], nums[high] = nums[high], nums[mid]
            high -= 1

arr = [2, 0, 2, 1, 1, 0]
sort_colors(arr)
print("Sorted Colors:", arr)  # [0, 0, 1, 1, 2, 2]`,
        explanation: 'Three-pointer partition algorithm sorts in $O(n)$ time and $O(1)$ space.',
      },
      {
        id: 'py-59-ex-3',
        title: 'Subarray Sum Equals K',
        difficulty: 'Advanced',
        type: 'coding',
        prompt: 'Find total number of continuous subarrays whose sum equals `k` using prefix sums and a hash map in O(n) time.',
        starterCode: 'def subarray_sum(nums: list[int], k: int) -> int:\n    pass',
        solution: `def subarray_sum(nums: list[int], k: int) -> int:
    prefix_counts = {0: 1}
    current_sum = 0
    count = 0
    for num in nums:
        current_sum += num
        # If current_sum - k exists in prefix, we found matching subarrays!
        if (current_sum - k) in prefix_counts:
            count += prefix_counts[current_sum - k]
        prefix_counts[current_sum] = prefix_counts.get(current_sum, 0) + 1
    return count

print("Subarrays summing to 2:", subarray_sum([1, 1, 1], 2))  # 2`,
        explanation: 'Prefix sum hash map technique solves subarray sum in $O(n)$ time instead of $O(n^2)$.',
      },
    ],
    quizQuestions: [
      {
        id: 'py-59-q1',
        question: 'What is the time complexity of Kadane\'s algorithm for finding the maximum subarray sum?',
        options: ['O(n^2)', 'O(n log n)', 'O(n)', 'O(1)'],
        correctOptionIndex: 2,
        explanation: 'Kadane\'s algorithm processes the list in a single linear pass in O(n) time and O(1) space.',
      },
      {
        id: 'py-59-q2',
        question: 'How do you swap two variables in Python without using an intermediate temporary variable?',
        options: ['swap(a, b)', 'a, b = b, a', 'a ^= b; b ^= a; a ^= b', 'Both B and C are valid, but B is idiomatic Python'],
        correctOptionIndex: 3,
        explanation: 'a, b = b, a is Python\'s idiomatic, atomic assignment construct for swapping values cleanly.',
      },
    ],
    revisionNotes: [
      'Kadane\'s algorithm finds maximum subarray in O(n) time.',
      'Prefix sum + hash map solves Subarray Sum Equals K in O(n).',
      'Dutch National Flag partitions 3 values in one pass.',
    ],
  },
  {
    id: 'py-60-dsa-hashmaps',
    moduleId: 'py-m6',
    moduleNumber: 6,
    moduleTitle: 'Python Problem Solving',
    topicNumber: 60,
    title: 'Hash Maps & Sets for O(1) Lookups & Complement Patterns',
    language: 'python',
    level: 'Beginner',
    whyItMatters:
      'The "Complement Pattern" using hash maps is the most famous algorithm pattern in placement interviews. Replacing nested loops with $O(1)$ dictionary lookups reduces $O(n^2)$ algorithms to $O(n)$.',
    explanation:
      'In the complement pattern, instead of checking every pair with nested loops ($O(n^2)$), we store elements in a hash map as we iterate. For each element, we check if its required complement (`target - current`) has already been seen. Hash maps in Python are implemented using open-addressing hash tables, providing average $O(1)$ time complexity for lookup and insertion.',
    syntaxAndStructure:
      'seen = {}\nfor i, num in enumerate(nums):\n    complement = target - num\n    if complement in seen:\n        return [seen[complement], i]\n    seen[num] = i',
    codeExamples: [
      {
        title: 'Two Sum via Single-Pass Hash Map in Python',
        code: `def two_sum(nums: list[int], target: int) -> list[int]:
    num_to_index = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in num_to_index:
            return [num_to_index[complement], i]
        num_to_index[num] = i
    return []

print("Two Sum indices:", two_sum([2, 7, 11, 15], 9))
print("Two Sum indices:", two_sum([3, 2, 4], 6))`,
        expectedOutput: `Two Sum indices: [0, 1]
Two Sum indices: [1, 2]`,
        explanation: 'Single-pass traversal inserts into the dictionary while checking for the complement in $O(1)$ time, achieving $O(n)$ overall runtime.',
      },
      {
        title: 'First Unique Character in a String in O(n)',
        code: `from collections import Counter

def first_uniq_char(s: str) -> int:
    counts = Counter(s)
    for i, ch in enumerate(s):
        if counts[ch] == 1:
            return i
    return -1

print("First unique in 'leetcode':", first_uniq_char("leetcode"))
print("First unique in 'loveleetcode':", first_uniq_char("loveleetcode"))`,
        expectedOutput: `First unique in 'leetcode': 0
First unique in 'loveleetcode': 2`,
        explanation: 'Two linear passes: first pass builds character counts in $O(n)$, second pass finds the first character with count 1 in $O(n)$.',
      },
    ],
    realWorldApplications: [
      'Inverted search indexes mapping search keywords to document IDs.',
      'Deduplicating streaming event IDs in real-time messaging queues.',
    ],
    commonMistakes: [
      'Storing the current element before checking for complement, which allows an element to use itself twice if `2 * num == target`.',
      'Forgetting that hash table collisions can degrade lookup to $O(n)$ in pathological edge cases (rare with Python siphash).',
    ],
    interviewRelevance:
      'Two Sum is universally the #1 most frequently asked fresher placement coding problem.',
    checkpoints: [
      { id: 'py-60-cp-1', label: 'Check for complement before inserting current element.' },
      { id: 'py-60-cp-2', label: 'Use Counter for frequency counting passes.' },
    ],
    practiceExercises: [
      {
        id: 'py-60-ex-1',
        title: 'Contains Duplicate in O(n) Time',
        difficulty: 'Beginner',
        type: 'coding',
        prompt: 'Return True if any value appears at least twice in the array using a hash set.',
        starterCode: 'def contains_duplicate(nums: list[int]) -> bool:\n    pass',
        solution: `def contains_duplicate(nums: list[int]) -> bool:
    return len(nums) != len(set(nums))

print(contains_duplicate([1, 2, 3, 1]))  # True
print(contains_duplicate([1, 2, 3, 4]))  # False`,
        explanation: 'Converting to a set deduplicates items; if lengths differ, duplicates were present.',
      },
      {
        id: 'py-60-ex-2',
        title: 'Isomorphic Strings Verification',
        difficulty: 'Intermediate',
        type: 'coding',
        prompt: 'Determine if two strings s and t are isomorphic using bidirectional character mapping dictionaries.',
        starterCode: 'def is_isomorphic(s: str, t: str) -> bool:\n    pass',
        solution: `def is_isomorphic(s: str, t: str) -> bool:
    if len(s) != len(t): return False
    map_st, map_ts = {}, {}
    for c1, c2 in zip(s, t):
        if (c1 in map_st and map_st[c1] != c2) or (c2 in map_ts and map_ts[c2] != c1):
            return False
        map_st[c1] = c2
        map_ts[c2] = c1
    return True

print(is_isomorphic("egg", "add"))  # True
print(is_isomorphic("foo", "bar"))  # False`,
        explanation: 'Bidirectional mapping ensures one-to-one character correspondence.',
      },
      {
        id: 'py-60-ex-3',
        title: 'Longest Palindrome Construction',
        difficulty: 'Advanced',
        type: 'coding',
        prompt: 'Given string s, return length of longest palindrome that can be built with those letters using Counter.',
        starterCode: 'from collections import Counter\ndef longest_palindrome(s: str) -> int:\n    pass',
        solution: `from collections import Counter

def longest_palindrome(s: str) -> int:
    counts = Counter(s)
    length = 0
    has_odd = False
    for count in counts.values():
        if count % 2 == 0:
            length += count
        else:
            length += count - 1
            has_odd = True
    return length + 1 if has_odd else length

print(longest_palindrome("abccccdd"))  # 7 ("dccaccd")`,
        explanation: 'Pairs contribute fully; one odd character can sit at the center of the palindrome.',
      },
    ],
    quizQuestions: [
      {
        id: 'py-60-q1',
        question: 'Why does the single-pass Two Sum algorithm check for the complement before adding the current number to the dictionary?',
        options: [
          'To optimize CPU cache lines',
          'To prevent a number from matching itself when target is exactly 2 * num',
          'Because dictionaries cannot be modified during iteration',
          'To keep keys sorted',
        ],
        correctOptionIndex: 1,
        explanation: 'Checking before insertion ensures that an element at index i cannot match itself if target == 2 * nums[i].',
      },
      {
        id: 'py-60-q2',
        question: 'What is the average time complexity of checking "key in dict" in Python?',
        options: ['O(n)', 'O(1)', 'O(log n)', 'O(n log n)'],
        correctOptionIndex: 1,
        explanation: 'Dictionary key membership check is O(1) average time via hash table lookup.',
      },
    ],
    revisionNotes: [
      'Two sum complement pattern runs in O(n) time and O(n) space.',
      'Check complement before insertion to prevent self-pairing.',
      'Use bidirectional maps for isomorphic string checks.',
    ],
  },
  {
    id: 'py-61-dsa-two-pointers',
    moduleId: 'py-m6',
    moduleNumber: 6,
    moduleTitle: 'Python Problem Solving',
    topicNumber: 61,
    title: 'Two Pointers Technique in Python',
    language: 'python',
    level: 'Intermediate',
    whyItMatters:
      'Two Pointers is a cornerstone technique for sorted arrays and linked lists. It eliminates brute-force nested loops, solving Two Sum II, 3Sum, Trapping Rain Water, and Container With Most Water in $O(n)$ time and $O(1)$ space.',
    explanation:
      'The Two Pointers pattern maintains two index variables:\n1. **Converging Pointers**: Pointers start at opposite ends (`left = 0`, `right = len - 1`) and move toward each other based on comparison criteria.\n2. **Fast & Slow Pointers**: Pointers move in the same direction at different speeds (Floyd\'s Cycle Detection, finding middle of linked list).\n3. **Read & Write Pointers**: In-place filtering and deduplication (`nums[write] = nums[read]`).',
    syntaxAndStructure:
      '# Converging pointers template:\nleft, right = 0, len(nums) - 1\nwhile left < right:\n    curr = nums[left] + nums[right]\n    if curr == target:\n        return [left + 1, right + 1]\n    elif curr < target:\n        left += 1\n    else:\n        right -= 1',
    codeExamples: [
      {
        title: 'Container With Most Water in O(n) Time',
        code: `def max_area(height: list[int]) -> int:
    left, right = 0, len(height) - 1
    max_water = 0
    while left < right:
        width = right - left
        h = min(height[left], height[right])
        max_water = max(max_water, width * h)
        # Advance the pointer at the shorter wall:
        if height[left] < height[right]:
            left += 1
        else:
            right -= 1
    return max_water

print("Max water container:", max_area([1, 8, 6, 2, 5, 4, 8, 3, 7]))`,
        expectedOutput: `Max water container: 49`,
        explanation: 'At each step, advancing the shorter boundary is the only way to potentially find a larger area, achieving $O(n)$ time and $O(1)$ space.',
      },
      {
        title: '3Sum Problem using Two Pointers in O(n^2)',
        code: `def three_sum(nums: list[int]) -> list[list[int]]:
    nums.sort()
    res = []
    for i in range(len(nums) - 2):
        # Skip duplicate values for first element
        if i > 0 and nums[i] == nums[i - 1]:
            continue
        left, right = i + 1, len(nums) - 1
        while left < right:
            total = nums[i] + nums[left] + nums[right]
            if total == 0:
                res.append([nums[i], nums[left], nums[right]])
                # Skip duplicate elements
                while left < right and nums[left] == nums[left + 1]: left += 1
                while left < right and nums[right] == nums[right - 1]: right -= 1
                left += 1
                right -= 1
            elif total < 0:
                left += 1
            else:
                right -= 1
    return res

print("3Sum triplets:", three_sum([-1, 0, 1, 2, -1, -4]))`,
        expectedOutput: `3Sum triplets: [[-1, -1, 2], [-1, 0, 1]]`,
        explanation: 'Sorting the array allows combining an outer loop with two converging pointers, reducing $O(n^3)$ brute force to $O(n^2)$.',
      },
    ],
    realWorldApplications: [
      'Merging two sorted streams or logs in $O(n)$ time.',
      'Geometric algorithms finding maximum capacity bounding boxes.',
    ],
    commonMistakes: [
      'Forgetting that converging two pointers requires a SORTED array (unless tracking indices like Container With Most Water).',
      'Forgetting to advance both pointers and skip duplicate values in 3Sum.',
    ],
    interviewRelevance:
      'High-frequency interview questions: "Two Sum II (Sorted)", "3Sum", "Container With Most Water", "Trapping Rain Water".',
    checkpoints: [
      { id: 'py-61-cp-1', label: 'Two pointers on sorted arrays achieves O(n) time and O(1) space.' },
      { id: 'py-61-cp-2', label: 'Skip duplicates to avoid duplicate triplets in 3Sum.' },
    ],
    practiceExercises: [
      {
        id: 'py-61-ex-1',
        title: 'Move Zeroes to End In-Place',
        difficulty: 'Beginner',
        type: 'coding',
        prompt: 'Move all 0s in `nums` to the end while maintaining relative order of non-zero elements in-place.',
        starterCode: 'def move_zeroes(nums: list[int]) -> None:\n    pass',
        solution: `def move_zeroes(nums: list[int]) -> None:
    write_idx = 0
    for read_idx in range(len(nums)):
        if nums[read_idx] != 0:
            nums[write_idx], nums[read_idx] = nums[read_idx], nums[write_idx]
            write_idx += 1

arr = [0, 1, 0, 3, 12]
move_zeroes(arr)
print("Moved zeroes:", arr)  # [1, 3, 12, 0, 0]`,
        explanation: 'Fast and slow pointer swap places non-zero elements at the write pointer.',
      },
      {
        id: 'py-61-ex-2',
        title: 'Trapping Rain Water Two Pointer Solution',
        difficulty: 'Intermediate',
        type: 'coding',
        prompt: 'Compute trapped rainwater given elevation map `[0,1,0,2,1,0,1,3,2,1,2,1]` in O(n) time and O(1) space.',
        starterCode: 'def trap(height: list[int]) -> int:\n    pass',
        solution: `def trap(height: list[int]) -> int:
    if not height: return 0
    left, right = 0, len(height) - 1
    left_max, right_max = height[left], height[right]
    water = 0
    while left < right:
        if left_max < right_max:
            left += 1
            left_max = max(left_max, height[left])
            water += left_max - height[left]
        else:
            right -= 1
            right_max = max(right_max, height[right])
            water += right_max - height[right]
    return water

print("Trapped water:", trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]))  # 6`,
        explanation: 'Two pointers maintain left_max and right_max boundaries in $O(1)$ space.',
      },
      {
        id: 'py-61-ex-3',
        title: '4Sum Problem Extension',
        difficulty: 'Advanced',
        type: 'coding',
        prompt: 'Extend 3Sum to 4Sum: find all unique quadruplets `[a, b, c, d]` summing to target in $O(n^3)$ time.',
        starterCode: 'def four_sum(nums: list[int], target: int) -> list[list[int]]:\n    pass',
        solution: `def four_sum(nums: list[int], target: int) -> list[list[int]]:
    nums.sort()
    res = []
    n = len(nums)
    for i in range(n - 3):
        if i > 0 and nums[i] == nums[i - 1]: continue
        for j in range(i + 1, n - 2):
            if j > i + 1 and nums[j] == nums[j - 1]: continue
            left, right = j + 1, n - 1
            while left < right:
                total = nums[i] + nums[j] + nums[left] + nums[right]
                if total == target:
                    res.append([nums[i], nums[j], nums[left], nums[right]])
                    while left < right and nums[left] == nums[left + 1]: left += 1
                    while left < right and nums[right] == nums[right - 1]: right -= 1
                    left += 1
                    right -= 1
                elif total < target:
                    left += 1
                else:
                    right -= 1
    return res

print(four_sum([1, 0, -1, 0, -2, 2], 0))`,
        explanation: 'Two nested loops combined with converging two pointers solves 4Sum in $O(n^3)$ time.',
      },
    ],
    quizQuestions: [
      {
        id: 'py-61-q1',
        question: 'What is the space complexity of the converging Two Pointers approach on a sorted array?',
        options: ['O(n)', 'O(n^2)', 'O(1)', 'O(log n)'],
        correctOptionIndex: 2,
        explanation: 'Two pointers only require two integer variables (left, right), achieving O(1) auxiliary space.',
      },
      {
        id: 'py-61-q2',
        question: 'Why does Container With Most Water move the pointer with the smaller height?',
        options: [
          'Because width decreases, so only a taller height can possibly produce a larger area',
          'It is a random choice',
          'Because the right pointer always moves faster',
          'To sort the array',
        ],
        correctOptionIndex: 0,
        explanation: 'Since the width between pointers shrinks at each step, keeping the shorter line cannot possibly increase the area; only moving the shorter boundary can find a larger area.',
      },
    ],
    revisionNotes: [
      'Converging pointers require sorted arrays or geometric bounds.',
      'Container With Most Water advances the shorter line.',
      '3Sum combines sorting with two pointers in O(n^2) time.',
    ],
  },
  {
    id: 'py-62-dsa-sliding-window',
    moduleId: 'py-m6',
    moduleNumber: 6,
    moduleTitle: 'Python Problem Solving',
    topicNumber: 62,
    title: 'Sliding Window Technique (Fixed & Dynamic Windows)',
    language: 'python',
    level: 'Intermediate',
    whyItMatters:
      'The Sliding Window technique optimizes contiguous subarray and substring problems from $O(n^2)$ or $O(n^3)$ down to $O(n)$. It is one of the most frequently tested patterns in SDE-1 coding interviews.',
    explanation:
      'The sliding window maintains a contiguous subarray `[left, right]`:\n1. **Fixed-Size Window**: Window size `k` is constant. We compute the initial window of size `k`, then slide it forward by adding `nums[right]` and subtracting `nums[right - k]` in $O(1)$ per step.\n2. **Dynamic / Variable-Size Window**: Expand the window by advancing `right`. When a window constraint is violated (e.g. duplicate characters or sum > target), shrink the window by advancing `left` until the constraint is restored.',
    syntaxAndStructure:
      '# Dynamic window template:\nleft = 0\nfor right in range(len(s)):\n    add_to_window(s[right])\n    while window_is_invalid():\n        remove_from_window(s[left])\n        left += 1\n    update_max_length(right - left + 1)',
    codeExamples: [
      {
        title: 'Longest Substring Without Repeating Characters in O(n)',
        code: `def length_of_longest_substring(s: str) -> int:
    char_index_map = {}
    max_len = 0
    left = 0

    for right, ch in enumerate(s):
        # If character was seen inside current window, jump left pointer
        if ch in char_index_map and char_index_map[ch] >= left:
            left = char_index_map[ch] + 1
        char_index_map[ch] = right
        max_len = max(max_len, right - left + 1)

    return max_len

print("Longest in 'abcabcbb':", length_of_longest_substring("abcabcbb")) # 3 ('abc')
print("Longest in 'pwwkew':", length_of_longest_substring("pwwkew"))     # 3 ('wke')`,
        expectedOutput: `Longest in 'abcabcbb': 3
Longest in 'pwwkew': 3`,
        explanation: 'Storing character indices allows the left pointer to jump forward in $O(1)$, guaranteeing single-pass $O(n)$ time.',
      },
      {
        title: 'Minimum Size Subarray Sum in O(n)',
        code: `def min_sub_array_len(target: int, nums: list[int]) -> int:
    left = 0
    curr_sum = 0
    min_len = float("inf")

    for right in range(len(nums)):
        curr_sum += nums[right]
        # Shrink window from left as long as sum >= target
        while curr_sum >= target:
            min_len = min(min_len, right - left + 1)
            curr_sum -= nums[left]
            left += 1

    return min_len if min_len != float("inf") else 0

print("Min length for sum >= 7 in [2,3,1,2,4,3]:", min_sub_array_len(7, [2, 3, 1, 2, 4, 3]))`,
        expectedOutput: `Min length for sum >= 7 in [2,3,1,2,4,3]: 2`,
        explanation: 'Both left and right pointers traverse the array at most once, providing guaranteed $2N = O(n)$ total operations.',
      },
    ],
    realWorldApplications: [
      'Rate limiting network traffic (counting API calls in a sliding 60-second window).',
      'Video streaming bitrate adaptation over moving average buffers.',
    ],
    commonMistakes: [
      'Using nested loops to slice and evaluate windows repeatedly ($O(n^2)$).',
      'Forgetting to update the left pointer boundary properly when a duplicate character was found outside the active window.',
    ],
    interviewRelevance:
      'Top interview problems: "Longest Substring Without Repeating Characters", "Minimum Window Substring", "Max Consecutive Ones III".',
    checkpoints: [
      { id: 'py-62-cp-1', label: 'Use fixed window when size k is given.' },
      { id: 'py-62-cp-2', label: 'Use dynamic window (expand right, shrink left) for condition bounds.' },
    ],
    practiceExercises: [
      {
        id: 'py-62-ex-1',
        title: 'Maximum Sum Subarray of Size K',
        difficulty: 'Beginner',
        type: 'coding',
        prompt: 'Find maximum sum of any contiguous subarray of fixed size `k` in $O(n)$ time.',
        starterCode: 'def max_sub_array_of_size_k(nums: list[int], k: int) -> int:\n    pass',
        solution: `def max_sub_array_of_size_k(nums: list[int], k: int) -> int:
    if len(nums) < k: return 0
    curr_sum = sum(nums[:k])
    max_sum = curr_sum
    for i in range(k, len(nums)):
        curr_sum += nums[i] - nums[i - k]  # Slide window
        max_sum = max(max_sum, curr_sum)
    return max_sum

print(max_sub_array_of_size_k([2, 1, 5, 1, 3, 2], 3))  # 9 ([5, 1, 3])`,
        explanation: 'Fixed window updates sum in $O(1)$ by adding arriving element and subtracting departing element.',
      },
      {
        id: 'py-62-ex-2',
        title: 'Max Consecutive Ones III (At most K flips)',
        difficulty: 'Intermediate',
        type: 'coding',
        prompt: 'Given binary array `nums`, find max consecutive 1s if you can flip at most `k` 0s to 1s.',
        starterCode: 'def longest_ones(nums: list[int], k: int) -> int:\n    pass',
        solution: `def longest_ones(nums: list[int], k: int) -> int:
    left = 0
    zeros = 0
    max_len = 0
    for right in range(len(nums)):
        if nums[right] == 0:
            zeros += 1
        while zeros > k:
            if nums[left] == 0:
                zeros -= 1
            left += 1
        max_len = max(max_len, right - left + 1)
    return max_len

print(longest_ones([1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0], 2))  # 6`,
        explanation: 'Dynamic window allows at most k zeros inside the window at all times.',
      },
      {
        id: 'py-62-ex-3',
        title: 'Permutation in String Verification',
        difficulty: 'Advanced',
        type: 'coding',
        prompt: 'Check if s2 contains a permutation of s1 in $O(n)$ time using fixed sliding window and character frequency comparison.',
        starterCode: 'from collections import Counter\ndef check_inclusion(s1: str, s2: str) -> bool:\n    pass',
        solution: `from collections import Counter

def check_inclusion(s1: str, s2: str) -> bool:
    k = len(s1)
    if len(s2) < k: return False
    target_counts = Counter(s1)
    window_counts = Counter(s2[:k])
    if window_counts == target_counts: return True
    for i in range(k, len(s2)):
        window_counts[s2[i]] += 1
        leaving = s2[i - k]
        window_counts[leaving] -= 1
        if window_counts[leaving] == 0:
            del window_counts[leaving]
        if window_counts == target_counts:
            return True
    return False

print(check_inclusion("ab", "eidbaooo"))  # True ("ba")`,
        explanation: 'Sliding window of length len(s1) compares frequency hash maps in $O(1)$ per step.',
      },
    ],
    quizQuestions: [
      {
        id: 'py-62-q1',
        question: 'What is the overall time complexity of the dynamic sliding window technique where right advances from 0 to N and left advances up to N?',
        options: ['O(n^2)', 'O(n log n)', 'O(n)', 'O(1)'],
        correctOptionIndex: 2,
        explanation: 'Even though there is a nested while loop, both left and right pointers increment at most N times total, ensuring O(2n) = O(n) linear time.',
      },
      {
        id: 'py-62-q2',
        question: 'How do you slide a fixed-size window of size k from index i to i+1 in O(1) time?',
        options: [
          'Recompute sum(nums[i+1 : i+1+k])',
          'Add nums[i+k] and subtract nums[i]',
          'Sort the window',
          'Use a binary search',
        ],
        correctOptionIndex: 1,
        explanation: 'Sliding in O(1) adds the new arriving element at i+k and subtracts the departing element at i.',
      },
    ],
    revisionNotes: [
      'Sliding window reduces contiguous subarray search from O(n^2) to O(n).',
      'Fixed window: add incoming, remove outgoing in O(1).',
      'Dynamic window: expand right, shrink left when constraint violates.',
    ],
  },
  {
    id: 'py-63-dsa-stacks-queues',
    moduleId: 'py-m6',
    moduleNumber: 6,
    moduleTitle: 'Python Problem Solving',
    topicNumber: 63,
    title: 'Stacks & Queues: Monotonic Stacks & collections.deque',
    language: 'python',
    level: 'Intermediate',
    whyItMatters:
      'Stacks (LIFO) and queues (FIFO) power syntax parsing, backtracking, BFS, and monotonic stack patterns (Next Greater Element, Daily Temperatures). Using Python\'s `collections.deque` avoids catastrophic $O(n)$ list shifts.',
    explanation:
      '1. **Stack (LIFO)**: Implemented using standard Python lists with `append()` and `pop()`, both $O(1)$ amortized at the end.\n2. **Queue (FIFO)**: MUST be implemented with `collections.deque` using `append()` and `popleft()`, both $O(1)$. Using `list.pop(0)` is an antipattern ($O(n)$).\n3. **Monotonic Stack**: A stack where elements are strictly increasing or decreasing. Used to find the "Next Greater Element" or "Previous Smaller Element" in $O(n)$ total time.',
    syntaxAndStructure:
      '# Stack (List):\nstack = []\nstack.append(x)      # Push O(1)\ntop = stack[-1]      # Peek O(1)\nval = stack.pop()    # Pop O(1)\n\n# Queue (Deque):\nfrom collections import deque\nq = deque()\nq.append(x)          # Enqueue O(1)\nfront = q.popleft()  # Dequeue O(1)',
    codeExamples: [
      {
        title: 'Valid Parentheses Matching with Stack in O(n)',
        code: `def is_valid_parentheses(s: str) -> bool:
    bracket_map = {")": "(", "}": "{", "]": "["}
    stack = []

    for char in s:
        if char in bracket_map:
            # Closing bracket: must match top of stack
            top_elem = stack.pop() if stack else "#"
            if bracket_map[char] != top_elem:
                return False
        else:
            # Opening bracket: push to stack
            stack.append(char)

    return len(stack) == 0

print("Is '()[]{}' valid?", is_valid_parentheses("()[]{}"))
print("Is '([)]' valid?", is_valid_parentheses("([)]"))
print("Is '{[]}' valid?", is_valid_parentheses("{[]}"))`,
        expectedOutput: `Is '()[]{}' valid? True
Is '([)]' valid? False
Is '{[]}' valid? True`,
        explanation: 'Stack guarantees that closing brackets strictly match the most recently opened bracket.',
      },
      {
        title: 'Next Greater Element via Monotonic Stack in O(n)',
        code: `def next_greater_elements(nums: list[int]) -> list[int]:
    """Finds next greater element for each index in O(n) using decreasing stack."""
    res = [-1] * len(nums)
    stack = []  # Stores indices

    for i, num in enumerate(nums):
        # While current element is greater than element at top of stack:
        while stack and nums[stack[-1]] < num:
            idx = stack.pop()
            res[idx] = num
        stack.append(i)

    return res

temperatures = [73, 74, 75, 71, 69, 72, 76, 73]
print("Next greater temps:", next_greater_elements(temperatures))`,
        expectedOutput: `Next greater temps: [74, 75, 76, 72, 72, 76, -1, -1]`,
        explanation: 'Every index is pushed and popped from the stack at most once, providing guaranteed $O(n)$ time.',
      },
    ],
    realWorldApplications: [
      'Call stack execution traces and browser forward/back history.',
      'Breadth-First Search (BFS) job scheduling using `collections.deque`.',
    ],
    commonMistakes: [
      'Using `list.pop(0)` for queues in BFS, causing $O(n^2)$ performance degradation.',
      'Popping from an empty stack without checking `if stack:` first, triggering `IndexError`.',
    ],
    interviewRelevance:
      'High-frequency interview problems: "Valid Parentheses", "Daily Temperatures", "Evaluate Reverse Polish Notation", and "Min Stack".',
    checkpoints: [
      { id: 'py-63-cp-1', label: 'Use list.append() and list.pop() for stacks (LIFO).' },
      { id: 'py-63-cp-2', label: 'Always use collections.deque for queues (FIFO).' },
    ],
    practiceExercises: [
      {
        id: 'py-63-ex-1',
        title: 'Evaluate Reverse Polish Notation (Postfix)',
        difficulty: 'Beginner',
        type: 'coding',
        prompt: 'Evaluate arithmetic expression in Postfix notation: `["2", "1", "+", "3", "*"]` -> `(2 + 1) * 3 = 9`.',
        starterCode: 'def eval_rpn(tokens: list[str]) -> int:\n    pass',
        solution: `def eval_rpn(tokens: list[str]) -> int:
    stack = []
    ops = {
        "+": lambda a, b: a + b,
        "-": lambda a, b: a - b,
        "*": lambda a, b: a * b,
        "/": lambda a, b: int(a / b), # Truncate towards zero
    }
    for t in tokens:
        if t in ops:
            b = stack.pop()
            a = stack.pop()
            stack.append(ops[t](a, b))
        else:
            stack.append(int(t))
    return stack[0]

print("RPN Result:", eval_rpn(["2", "1", "+", "3", "*"]))  # 9`,
        explanation: 'Operands are pushed; operators pop two operands and push result.',
      },
      {
        id: 'py-63-ex-2',
        title: 'Design MinStack in O(1) Time',
        difficulty: 'Intermediate',
        type: 'coding',
        prompt: 'Implement `MinStack` supporting `push`, `pop`, `top`, and `get_min` all in O(1) time.',
        starterCode: 'class MinStack:\n    pass',
        solution: `class MinStack:
    def __init__(self):
        self.stack = []
        self.min_stack = []

    def push(self, val: int):
        self.stack.append(val)
        current_min = min(val, self.min_stack[-1] if self.min_stack else val)
        self.min_stack.append(current_min)

    def pop(self):
        self.stack.pop()
        self.min_stack.pop()

    def top(self) -> int:
        return self.stack[-1]

    def get_min(self) -> int:
        return self.min_stack[-1]

ms = MinStack()
ms.push(-2)
ms.push(0)
ms.push(-3)
print("Min:", ms.get_min())  # -3
ms.pop()
print("Min after pop:", ms.get_min())  # -2`,
        explanation: 'Dual stack tracks current minimum at each stack height in $O(1)$ time.',
      },
      {
        id: 'py-63-ex-3',
        title: 'Daily Temperatures (Days to Warmer Weather)',
        difficulty: 'Advanced',
        type: 'coding',
        prompt: 'Return array `answer` where `answer[i]` is days until warmer temperature, or 0 if none.',
        starterCode: 'def daily_temperatures(temperatures: list[int]) -> list[int]:\n    pass',
        solution: `def daily_temperatures(temperatures: list[int]) -> list[int]:
    n = len(temperatures)
    ans = [0] * n
    stack = []  # Stores indices
    for i, t in enumerate(temperatures):
        while stack and temperatures[stack[-1]] < t:
            prev_idx = stack.pop()
            ans[prev_idx] = i - prev_idx
        stack.append(i)
    return ans

print(daily_temperatures([73, 74, 75, 71, 69, 72, 76, 73]))  # [1, 1, 4, 2, 1, 1, 0, 0]`,
        explanation: 'Monotonic decreasing stack stores indices to calculate day spans in $O(n)$ time.',
      },
    ],
    quizQuestions: [
      {
        id: 'py-63-q1',
        question: 'Why should a developer never use list.pop(0) to implement a FIFO queue in Python?',
        options: [
          'It raises a DeprecationWarning in Python 3',
          'It is an O(n) operation because every subsequent element must shift left in memory',
          'It causes memory leaks',
          'It reverses the list',
        ],
        correctOptionIndex: 1,
        explanation: 'In Python dynamic arrays (list), removing index 0 forces all remaining n - 1 elements to shift left in memory, making repeated pops O(n^2).',
      },
      {
        id: 'py-63-q2',
        question: 'What is the time complexity of pushing and popping in a monotonic stack over an entire array of size N?',
        options: ['O(n^2)', 'O(n log n)', 'O(n)', 'O(1)'],
        correctOptionIndex: 2,
        explanation: 'Each element is pushed onto the stack exactly once and popped at most once, yielding total amortized O(n) runtime.',
      },
    ],
    revisionNotes: [
      'Use list for Stacks (LIFO) with append/pop in O(1).',
      'Use collections.deque for Queues (FIFO) with append/popleft in O(1).',
      'Monotonic stacks solve Next Greater Element problems in O(n).',
    ],
  },
  {
    id: 'py-64-dsa-linked-lists',
    moduleId: 'py-m6',
    moduleNumber: 6,
    moduleTitle: 'Python Problem Solving',
    topicNumber: 64,
    title: 'Linked Lists in Python: Singly, Doubly & Dummy Nodes',
    language: 'python',
    level: 'Intermediate',
    whyItMatters:
      'Pointer manipulation in linked lists tests precision, edge-case handling (head/tail updates, null checks), and recursive list processing. Dummy head nodes eliminate messy edge case branching.',
    explanation:
      'In Python, a linked list is constructed from `ListNode` objects containing `val` and a `next` pointer. Key techniques:\n1. **Dummy Head Node**: A sentinel node placed before the real head (`dummy = ListNode(0, head)`) that eliminates special-case checks for inserting or deleting the head node.\n2. **In-place Reversal**: Iterating with `prev`, `curr`, and `next_temp` pointers.\n3. **Fast & Slow Pointers (Floyd\'s Cycle Finding)**: `slow` moves 1 step; `fast` moves 2 steps. If `slow == fast`, a cycle exists.',
    syntaxAndStructure:
      'class ListNode:\n    def __init__(self, val=0, next=None):\n        self.val = val\n        self.next = next\n\n# Dummy node pattern:\ndummy = ListNode(0)\ndummy.next = head\ncurr = dummy\n# Operate on curr.next safely\nreturn dummy.next',
    codeExamples: [
      {
        title: 'In-Place Reversal of Singly Linked List',
        code: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def reverse_linked_list(head: ListNode | None) -> ListNode | None:
    prev = None
    curr = head
    while curr:
        next_node = curr.next  # Save next
        curr.next = prev       # Reverse pointer
        prev = curr            # Advance prev
        curr = next_node       # Advance curr
    return prev  # New head

# Helper: Build list from Python list
def build_list(vals):
    dummy = ListNode(0)
    curr = dummy
    for v in vals:
        curr.next = ListNode(v)
        curr = curr.next
    return dummy.next

def to_list(node):
    res = []
    while node:
        res.append(node.val)
        node = node.next
    return res

head = build_list([1, 2, 3, 4, 5])
reversed_head = reverse_linked_list(head)
print("Reversed list:", to_list(reversed_head))`,
        expectedOutput: `Reversed list: [5, 4, 3, 2, 1]`,
        explanation: 'Three-pointer iterative reversal in $O(n)$ time and $O(1)$ extra space.',
      },
      {
        title: 'Merge Two Sorted Lists with Dummy Node',
        code: `def merge_two_lists(l1: ListNode | None, l2: ListNode | None) -> ListNode | None:
    dummy = ListNode(0)
    tail = dummy

    while l1 and l2:
        if l1.val <= l2.val:
            tail.next = l1
            l1 = l1.next
        else:
            tail.next = l2
            l2 = l2.next
        tail = tail.next

    # Attach remaining elements
    tail.next = l1 if l1 else l2
    return dummy.next

l1 = build_list([1, 2, 4])
l2 = build_list([1, 3, 4])
merged = merge_two_lists(l1, l2)
print("Merged sorted list:", to_list(merged))`,
        expectedOutput: `Merged sorted list: [1, 1, 2, 3, 4, 4]`,
        explanation: 'The dummy node holds the list anchor, completely avoiding if-head-is-none branching.',
      },
    ],
    realWorldApplications: [
      'Implementing LRU Caches (combining HashMap with Doubly Linked List for $O(1)$ operations).',
      'Memory block free-list management in operating system allocators.',
    ],
    commonMistakes: [
      'Losing references to subsequent nodes by overwriting `curr.next` before caching it in a temporary variable.',
      'Infinite loops caused by cycles or forgetting to set `tail.next = None`.',
    ],
    interviewRelevance:
      'Universal interview questions: "Reverse Linked List", "Merge Two Sorted Lists", "Detect Cycle (Floyd)", "LRU Cache".',
    checkpoints: [
      { id: 'py-64-cp-1', label: 'Use dummy head nodes to simplify boundary pointer updates.' },
      { id: 'py-64-cp-2', label: 'Master three-pointer iterative reversal (prev, curr, next).' },
    ],
    practiceExercises: [
      {
        id: 'py-64-ex-1',
        title: 'Find Middle of Linked List (Floyd)',
        difficulty: 'Beginner',
        type: 'coding',
        prompt: 'Find middle node of linked list using fast and slow pointers in a single pass.',
        starterCode: 'def middle_node(head: ListNode) -> ListNode:\n    pass',
        solution: `def middle_node(head: ListNode | None) -> ListNode | None:
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
    return slow

head = build_list([1, 2, 3, 4, 5])
print("Middle val:", middle_node(head).val)  # 3`,
        explanation: 'When fast pointer reaches end, slow pointer is exactly at the midpoint.',
      },
      {
        id: 'py-64-ex-2',
        title: 'Remove N-th Node From End of List',
        difficulty: 'Intermediate',
        type: 'coding',
        prompt: 'Remove the n-th node from the end of the list in one pass using dummy node and two pointers offset by n.',
        starterCode: 'def remove_nth_from_end(head: ListNode, n: int) -> ListNode:\n    pass',
        solution: `def remove_nth_from_end(head: ListNode | None, n: int) -> ListNode | None:
    dummy = ListNode(0, head)
    fast = slow = dummy
    for _ in range(n + 1):
        fast = fast.next
    while fast:
        slow = slow.next
        fast = fast.next
    # Skip target node
    slow.next = slow.next.next
    return dummy.next

head = build_list([1, 2, 3, 4, 5])
new_head = remove_nth_from_end(head, 2)
print("After removing 2nd from end:", to_list(new_head))  # [1, 2, 3, 5]`,
        explanation: 'Two pointers offset by n steps locate the node prior to the target in one pass.',
      },
      {
        id: 'py-64-ex-3',
        title: 'LRU Cache Design (Doubly Linked List + Dict)',
        difficulty: 'Advanced',
        type: 'coding',
        prompt: 'Implement `LRUCache(capacity)` supporting `get` and `put` in O(1) time using a doubly linked list and dictionary.',
        starterCode: 'class LRUCache:\n    pass',
        solution: `class DNode:
    def __init__(self, key=0, val=0):
        self.key, self.val = key, val
        self.prev = self.next = None

class LRUCache:
    def __init__(self, capacity: int):
        self.cap = capacity
        self.cache = {}
        self.head, self.tail = DNode(), DNode()
        self.head.next = self.tail
        self.tail.prev = self.head

    def _remove(self, node):
        node.prev.next = node.next
        node.next.prev = node.prev

    def _add_to_front(self, node):
        node.next = self.head.next
        node.prev = self.head
        self.head.next.prev = node
        self.head.next = node

    def get(self, key: int) -> int:
        if key in self.cache:
            node = self.cache[key]
            self._remove(node)
            self._add_to_front(node)
            return node.val
        return -1

    def put(self, key: int, value: int) -> None:
        if key in self.cache:
            self._remove(self.cache[key])
        node = DNode(key, value)
        self.cache[key] = node
        self._add_to_front(node)
        if len(self.cache) > self.cap:
            lru = self.tail.prev
            self._remove(lru)
            del self.cache[lru.key]

lru = LRUCache(2)
lru.put(1, 10)
lru.put(2, 20)
print("Get 1:", lru.get(1))  # 10
lru.put(3, 30)  # Evicts 2!
print("Get 2 (evicted):", lru.get(2))  # -1`,
        explanation: 'Doubly linked list allows $O(1)$ node insertion and deletion; dictionary provides $O(1)$ lookups.',
      },
    ],
    quizQuestions: [
      {
        id: 'py-64-q1',
        question: 'What is the primary advantage of using a "dummy" sentinel node in linked list problems?',
        options: [
          'It reduces time complexity from O(n) to O(1)',
          'It eliminates special conditional checks when inserting or deleting the head node',
          'It sorts the list automatically',
          'It reverses the list in O(1)',
        ],
        correctOptionIndex: 1,
        explanation: 'A dummy node ensures the head has a valid predecessor node, eliminating edge case branches for empty lists and head alterations.',
      },
      {
        id: 'py-64-q2',
        question: 'In Floyd\'s cycle detection algorithm, if a fast pointer moves 2 steps while a slow pointer moves 1 step, how quickly will they meet if a cycle of length C exists?',
        options: ['They never meet', 'Within C steps after entering the cycle', 'O(2^C)', 'O(C^2)'],
        correctOptionIndex: 1,
        explanation: 'The relative distance between fast and slow decreases by 1 on every step, guaranteeing they meet within C iterations.',
      },
    ],
    revisionNotes: [
      'Use dummy nodes: dummy = ListNode(0, head) to clean up edge cases.',
      'Three pointers for reversal: prev, curr, next_node.',
      'Fast and slow pointers detect cycles and locate midpoints.',
    ],
  },
  {
    id: 'py-65-dsa-binary-search',
    moduleId: 'py-m6',
    moduleNumber: 6,
    moduleTitle: 'Python Problem Solving',
    topicNumber: 65,
    title: 'Binary Search & The bisect Module in Python',
    language: 'python',
    level: 'Intermediate',
    whyItMatters:
      'Binary Search reduces search space from $O(n)$ to $O(\\log n)$. It applies not only to sorted arrays, but also to "Binary Search on Answer" problems (Koko Eating Bananas, Capacity to Ship Packages).',
    explanation:
      'Binary Search operates on monotonic search spaces. In Python, integer overflow `(left + right) // 2` is not an issue because Python ints have arbitrary precision. The standard library provides the `bisect` module:\n- `bisect.bisect_left(arr, x)`: Finds first index where x can be inserted to maintain order (equivalent to `lower_bound`).\n- `bisect.bisect_right(arr, x)`: Finds insertion point after existing occurrences (equivalent to `upper_bound`).\n- `bisect.insort(arr, x)`: Inserts x into sorted order in $O(n)$ time.',
    syntaxAndStructure:
      '# Manual Binary Search Template:\nleft, right = 0, len(nums) - 1\nwhile left <= right:\n    mid = (left + right) // 2\n    if nums[mid] == target:\n        return mid\n    elif nums[mid] < target:\n        left = mid + 1\n    else:\n        right = mid - 1\n\n# bisect module:\nimport bisect\nidx_left = bisect.bisect_left(nums, target) # lower_bound',
    codeExamples: [
      {
        title: 'Binary Search on Answer: Koko Eating Bananas in O(n log m)',
        code: `import math

def min_eating_speed(piles: list[int], h: int) -> int:
    """Finds minimum integer speed k to eat all bananas within h hours."""
    def can_finish(speed: int) -> bool:
        # Time required to eat all piles at 'speed'
        hours_needed = sum(math.ceil(p / speed) for p in piles)
        return hours_needed <= h

    left = 1
    right = max(piles)
    ans = right

    # Binary search over the answer space [1, max(piles)]
    while left <= right:
        mid = (left + right) // 2
        if can_finish(mid):
            ans = mid
            right = mid - 1 # Try to find a slower valid speed
        else:
            left = mid + 1  # Too slow, increase speed

    return ans

print("Min eating speed (piles=[3,6,7,11], h=8):", min_eating_speed([3, 6, 7, 11], 8))`,
        expectedOutput: `Min eating speed (piles=[3,6,7,11], h=8): 4`,
        explanation: 'Monotonic property: if speed k works, all speeds > k also work. Binary search on speed finds the minimum in $O(n \\log(\\max(piles)))$.',
      },
      {
        title: 'Using Python\'s bisect Module for Range Searches',
        code: `import bisect

sorted_scores = [60, 70, 80, 80, 80, 90, 95]

# bisect_left returns first occurrence of 80:
idx_first = bisect.bisect_left(sorted_scores, 80)
# bisect_right returns index after last occurrence of 80:
idx_after = bisect.bisect_right(sorted_scores, 80)

print("First index of 80 (bisect_left):", idx_first)
print("Index after last 80 (bisect_right):", idx_after)
print(f"Count of 80s: {idx_after - idx_first}")`,
        expectedOutput: `First index of 80 (bisect_left): 2
Index after last 80 (bisect_right): 5
Count of 80s: 3`,
        explanation: 'bisect_right - bisect_left calculates frequency of an element in sorted arrays in $O(\\log n)$ time.',
      },
    ],
    realWorldApplications: [
      'Grading boundaries mapping numerical scores to letter grades.',
      'IP address range matching in network routing tables.',
    ],
    commonMistakes: [
      'Using `left < right` instead of `left <= right` in standard search, missing single-element checks.',
      'Using linear search when the problem asks for the minimum/maximum condition satisfying a monotonic threshold ("Binary Search on Answer").',
    ],
    interviewRelevance:
      'Universal interview topics: "Search in Rotated Sorted Array", "Find Minimum in Rotated Sorted Array", and "Koko Eating Bananas".',
    checkpoints: [
      { id: 'py-65-cp-1', label: 'Use bisect.bisect_left for lower_bound; bisect_right for upper_bound.' },
      { id: 'py-65-cp-2', label: 'Identify "Binary Search on Answer" when the feasibility function is monotonic.' },
    ],
    practiceExercises: [
      {
        id: 'py-65-ex-1',
        title: 'Search in Rotated Sorted Array',
        difficulty: 'Beginner',
        type: 'coding',
        prompt: 'Search for target in rotated sorted array in O(log n) time.',
        starterCode: 'def search_rotated(nums: list[int], target: int) -> int:\n    pass',
        solution: `def search_rotated(nums: list[int], target: int) -> int:
    left, right = 0, len(nums) - 1
    while left <= right:
        mid = (left + right) // 2
        if nums[mid] == target:
            return mid
        # Check if left half is sorted
        if nums[left] <= nums[mid]:
            if nums[left] <= target < nums[mid]:
                right = mid - 1
            else:
                left = mid + 1
        # Otherwise, right half is sorted
        else:
            if nums[mid] < target <= nums[right]:
                left = mid + 1
            else:
                right = mid - 1
    return -1

print(search_rotated([4, 5, 6, 7, 0, 1, 2], 0))  # 4`,
        explanation: 'Determines which half is sorted to prune search space in $O(\\log n)$.',
      },
      {
        id: 'py-65-ex-2',
        title: 'Map Score to Grade with bisect',
        difficulty: 'Intermediate',
        type: 'coding',
        prompt: 'Use `bisect.bisect` to map numerical marks 0-100 to grades: `<60: F, 60-69: D, 70-79: C, 80-89: B, >=90: A`.',
        starterCode: 'import bisect\ndef get_grade(score: int) -> str:\n    pass',
        solution: `import bisect

def get_grade(score: int) -> str:
    breakpoints = [60, 70, 80, 90]
    grades = ["F", "D", "C", "B", "A"]
    idx = bisect.bisect(breakpoints, score)
    return grades[idx]

print("Score 85:", get_grade(85))  # B
print("Score 92:", get_grade(92))  # A
print("Score 55:", get_grade(55))  # F`,
        explanation: 'bisect cleanly maps numeric ranges into bucket indices.',
      },
      {
        id: 'py-65-ex-3',
        title: 'Capacity To Ship Packages Within D Days',
        difficulty: 'Advanced',
        type: 'coding',
        prompt: 'Find least weight capacity of boat to ship all packages in weights within `days` days in O(n log m) time.',
        starterCode: 'def ship_within_days(weights: list[int], days: int) -> int:\n    pass',
        solution: `def ship_within_days(weights: list[int], days: int) -> int:
    def can_ship(capacity: int) -> bool:
        d = 1
        curr = 0
        for w in weights:
            if curr + w > capacity:
                d += 1
                curr = 0
            curr += w
        return d <= days

    left = max(weights)
    right = sum(weights)
    ans = right
    while left <= right:
        mid = (left + right) // 2
        if can_ship(mid):
            ans = mid
            right = mid - 1
        else:
            left = mid + 1
    return ans

print("Min capacity:", ship_within_days([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 5))  # 15`,
        explanation: 'Binary Search on capacity space between max element and total sum.',
      },
    ],
    quizQuestions: [
      {
        id: 'py-65-q1',
        question: 'What is the return value of bisect.bisect_left([10, 20, 20, 30], 20)?',
        options: ['1', '2', '3', '0'],
        correctOptionIndex: 0,
        explanation: 'bisect_left returns the first index where 20 can be inserted without disturbing sorted order, which is index 1.',
      },
      {
        id: 'py-65-q2',
        question: 'Why does Python not suffer from the integer overflow bug (low + high) // 2 common in C++ and Java?',
        options: [
          'Python uses 128-bit integers',
          'Python 3 integers have arbitrary precision and dynamically allocate memory to prevent overflow',
          'Python checks for overflow at compile time',
          'Python forces floats',
        ],
        correctOptionIndex: 1,
        explanation: 'Python 3 integers have arbitrary precision and expand automatically, eliminating integer overflow bugs.',
      },
    ],
    revisionNotes: [
      'Binary search operates on sorted or monotonic search spaces in O(log n).',
      'bisect_left is lower_bound; bisect_right is upper_bound.',
      'Binary Search on Answer finds minimum threshold satisfying monotonic condition.',
    ],
  },
  {
    id: 'py-66-dsa-sorting-custom-keys',
    moduleId: 'py-m6',
    moduleNumber: 6,
    moduleTitle: 'Python Problem Solving',
    topicNumber: 66,
    title: 'Sorting in Python: Timsort Mechanics & Custom Key Comparators',
    language: 'python',
    level: 'Beginner',
    whyItMatters:
      'Sorting is an essential building block in DSA (Greedy algorithms, Interval merging, Closest pairs). Mastering Timsort stability and tuple keys (`key=lambda x: (a, -b)`) solves complex sorting problems in one line.',
    explanation:
      'Python uses **Timsort**, an adaptive, stable hybrid sorting algorithm derived from Merge Sort and Insertion Sort designed by Tim Peters in 2002. Timsort achieves $O(n)$ best-case on partially sorted data and $O(n \\log n)$ worst-case. In Python 3, sorting uses a `key` function (which transforms elements into sort keys) rather than a two-argument comparator. To convert legacy comparators, `functools.cmp_to_key` is used.',
    syntaxAndStructure:
      '# Sorting with multi-criteria tuple key:\n# Sort by primary ASC, secondary DESC:\narr.sort(key=lambda item: (item.category, -item.score))\n\n# Converting legacy 2-arg comparator:\nfrom functools import cmp_to_key\narr.sort(key=cmp_to_key(my_comparator))',
    codeExamples: [
      {
        title: 'Merge Overlapping Intervals in O(n log n)',
        code: `def merge_intervals(intervals: list[list[int]]) -> list[list[int]]:
    # 1. Sort intervals by start time in O(n log n)
    intervals.sort(key=lambda x: x[0])
    merged = [intervals[0]]

    for current in intervals[1:]:
        prev_start, prev_end = merged[-1]
        curr_start, curr_end = current
        # If current interval overlaps with previous, merge them
        if curr_start <= prev_end:
            merged[-1][1] = max(prev_end, curr_end)
        else:
            merged.append(current)

    return merged

test_intervals = [[1, 3], [2, 6], [8, 10], [15, 18]]
print("Merged intervals:", merge_intervals(test_intervals))`,
        expectedOutput: `Merged intervals: [[1, 6], [8, 10], [15, 18]]`,
        explanation: 'Sorting by start time ensures overlapping intervals are adjacent, enabling single-pass merging.',
      },
      {
        title: 'Largest Number (Custom Comparator via cmp_to_key)',
        code: `from functools import cmp_to_key

def largest_number(nums: list[int]) -> str:
    # Custom comparator: compare string concatenations a+b vs b+a
    def compare(x: str, y: str) -> int:
        if x + y > y + x:
            return -1  # x should come before y
        elif x + y < y + x:
            return 1
        return 0

    str_nums = [str(n) for n in nums]
    str_nums.sort(key=cmp_to_key(compare))
    result = "".join(str_nums)
    return "0" if result[0] == "0" else result

print("Largest Number [10, 2]:", largest_number([10, 2]))
print("Largest Number [3, 30, 34, 5, 9]:", largest_number([3, 30, 34, 5, 9]))`,
        expectedOutput: `Largest Number [10, 2]: 210
Largest Number [3, 30, 34, 5, 9]: 9534330`,
        explanation: 'cmp_to_key bridges two-argument comparison functions into modern Python 3 single-argument key functions.',
      },
    ],
    realWorldApplications: [
      'Calendar event scheduling, room booking conflict detection.',
      'Ranking search engine results by relevance and timestamp.',
    ],
    commonMistakes: [
      'Assuming `sort()` modifies and returns the list; `list.sort()` returns `None`.',
      'Forgetting that Timsort is stable (preserves relative order of elements with equal keys).',
    ],
    interviewRelevance:
      'Universal interview problems: "Merge Intervals", "Non-overlapping Intervals", "Meeting Rooms", "Largest Number".',
    checkpoints: [
      { id: 'py-66-cp-1', label: 'Timsort is stable with O(n log n) worst-case and O(n) best-case.' },
      { id: 'py-66-cp-2', label: 'Use cmp_to_key when comparison depends on relative pair relationships.' },
    ],
    practiceExercises: [
      {
        id: 'py-66-ex-1',
        title: 'Meeting Rooms II (Min Conference Rooms)',
        difficulty: 'Beginner',
        type: 'coding',
        prompt: 'Find minimum number of conference rooms required for intervals `[[0, 30], [5, 10], [15, 20]]`.',
        starterCode: 'def min_meeting_rooms(intervals: list[list[int]]) -> int:\n    pass',
        solution: `def min_meeting_rooms(intervals: list[list[int]]) -> int:
    starts = sorted(i[0] for i in intervals)
    ends = sorted(i[1] for i in intervals)
    rooms = 0
    end_ptr = 0
    for s in starts:
        if s < ends[end_ptr]:
            rooms += 1
        else:
            end_ptr += 1
    return rooms

print("Min rooms:", min_meeting_rooms([[0, 30], [5, 10], [15, 20]]))  # 2`,
        explanation: 'Chronological event timeline sorting checks maximum overlapping concurrent meetings.',
      },
      {
        id: 'py-66-ex-2',
        title: 'Sort by Frequency and Alphabetical Tie-Breaker',
        difficulty: 'Intermediate',
        type: 'coding',
        prompt: 'Sort words by frequency descending, breaking ties alphabetically ascending.',
        starterCode: 'from collections import Counter\ndef sort_by_freq(words: list[str]) -> list[str]:\n    pass',
        solution: `from collections import Counter

def sort_by_freq(words: list[str]) -> list[str]:
    counts = Counter(words)
    # Tuple key: (-freq, word) ensures desc on frequency and asc on word
    return sorted(counts.keys(), key=lambda w: (-counts[w], w))

print(sort_by_freq(["i", "love", "leetcode", "i", "love", "coding"]))  # ['i', 'love', 'coding', 'leetcode']`,
        explanation: 'Multi-criteria tuple key (-count, word) handles mixed sort directions cleanly.',
      },
      {
        id: 'py-66-ex-3',
        title: 'Non-overlapping Intervals (Erase Min Count)',
        difficulty: 'Advanced',
        type: 'coding',
        prompt: 'Find minimum number of intervals to remove to make the rest non-overlapping in O(n log n).',
        starterCode: 'def erase_overlap_intervals(intervals: list[list[int]]) -> int:\n    pass',
        solution: `def erase_overlap_intervals(intervals: list[list[int]]) -> int:
    # Greedy: sort by END time to finish earliest
    intervals.sort(key=lambda x: x[1])
    count = 0
    last_end = float("-inf")
    for start, end in intervals:
        if start >= last_end:
            last_end = end
        else:
            count += 1
    return count

print("Intervals to remove:", erase_overlap_intervals([[1, 2], [2, 3], [3, 4], [1, 3]]))  # 1`,
        explanation: 'Greedy interval scheduling sorts by finish time.',
      },
    ],
    quizQuestions: [
      {
        id: 'py-66-q1',
        question: 'What is the best-case time complexity of Python\'s Timsort on an already sorted list?',
        options: ['O(n^2)', 'O(n log n)', 'O(n)', 'O(1)'],
        correctOptionIndex: 2,
        explanation: 'Timsort detects pre-sorted contiguous runs in O(n) linear time in its best case.',
      },
      {
        id: 'py-66-q2',
        question: 'What does it mean that Python\'s sort is "stable"?',
        options: [
          'It never raises an exception',
          'It maintains the original relative order of items that compare as equal',
          'It does not use extra memory',
          'It runs in a single thread',
        ],
        correctOptionIndex: 1,
        explanation: 'Stability guarantees that equal elements preserve their original input sequence positions.',
      },
    ],
    revisionNotes: [
      'Python uses Timsort: stable, O(n log n) worst-case, O(n) best-case.',
      'Use tuple keys: key=lambda x: (a, -b) for multi-criteria sorting.',
      'Merge intervals sorts by start time; Greedy activity selection sorts by end time.',
    ],
  },
  {
    id: 'py-67-dsa-recursion-backtracking',
    moduleId: 'py-m6',
    moduleNumber: 6,
    moduleTitle: 'Python Problem Solving',
    topicNumber: 67,
    title: 'Recursion & Backtracking in Python',
    language: 'python',
    level: 'Advanced',
    whyItMatters:
      'Backtracking is a systematic method for exploring exhaustive decision trees (Combinations, Permutations, Sudoku, N-Queens). Understanding state restoration (`pop()`) prevents memory blowup.',
    explanation:
      'Backtracking builds candidate solutions incrementally and abandons ("backtracks") as soon as it determines a candidate cannot lead to a valid solution. Standard template:\n1. Check base case: if valid solution found, append copy of current state (`res.append(current[:])`).\n2. Iterate through candidate choices.\n3. Validate constraints (pruning).\n4. Apply choice (`current.append(choice)`).\n5. Recurse (`backtrack(next_step)`).\n6. Undo choice (`current.pop()`) — the **backtracking step**.',
    syntaxAndStructure:
      'def backtrack(candidate, path, result):\n    if is_solution(path):\n        result.append(path[:]) # MUST COPY!\n        return\n    for choice in choices:\n        if is_valid(choice):\n            path.append(choice)      # Make choice\n            backtrack(candidate, path, result)\n            path.pop()               # Undo choice (backtrack)',
    codeExamples: [
      {
        title: 'Permutations of an Array in O(n * n!)',
        code: `def permute(nums: list[int]) -> list[list[int]]:
    res = []
    visited = [False] * len(nums)

    def backtrack(path: list[int]):
        if len(path) == len(nums):
            res.append(path[:])  # Append SHALLOW COPY of path!
            return
        for i in range(len(nums)):
            if not visited[i]:
                visited[i] = True
                path.append(nums[i])      # Choose
                backtrack(path)           # Explore
                path.pop()                # Unchoose (backtrack)
                visited[i] = False

    backtrack([])
    return res

print("Permutations of [1, 2, 3]:", len(permute([1, 2, 3]))) # 3! = 6`,
        expectedOutput: `Permutations of [1, 2, 3]: 6`,
        explanation: 'Appends path[:] to save a snapshot; if you append path without slicing, all saved solutions would reflect the empty final state of the list.',
      },
      {
        title: 'Combination Sum with Pruning in Python',
        code: `def combination_sum(candidates: list[int], target: int) -> list[list[int]]:
    candidates.sort()  # Sort to allow pruning
    res = []

    def backtrack(remain: int, start: int, path: list[int]):
        if remain == 0:
            res.append(path[:])
            return
        for i in range(start, len(candidates)):
            # Prune branch if candidate exceeds remaining target:
            if candidates[i] > remain:
                break
            path.append(candidates[i])
            backtrack(remain - candidates[i], i, path) # i allows reusing same element
            path.pop()

    backtrack(target, 0, [])
    return res

print("Combination Sum (candidates=[2,3,6,7], target=7):", combination_sum([2, 3, 6, 7], 7))`,
        expectedOutput: `Combination Sum (candidates=[2,3,6,7], target=7): [[2, 2, 3], [7]]`,
        explanation: 'Sorting allows breaking early when candidates[i] > remain, pruning unviable search subtrees.',
      },
    ],
    realWorldApplications: [
      'Constraint Satisfaction Problems (CSP), Sudoku solvers, puzzle solving.',
      'Automated theorem provers and combinatorial optimization in logistics.',
    ],
    commonMistakes: [
      'Appending `path` instead of `path[:]` to results, producing lists of empty lists.',
      'Forgetting to restore state (`pop()` or reset visited flags) during backtracking.',
      'Failing to sort candidates to enable early break pruning.',
    ],
    interviewRelevance:
      'Universal interview topics: "Permutations", "Subsets", "Combination Sum", "Word Search", "N-Queens".',
    checkpoints: [
      { id: 'py-67-cp-1', label: 'Always append a copy: res.append(path[:]).' },
      { id: 'py-67-cp-2', label: 'Sort input to enable early break pruning.' },
    ],
    practiceExercises: [
      {
        id: 'py-67-ex-1',
        title: 'Generate Parentheses Combinations',
        difficulty: 'Beginner',
        type: 'coding',
        prompt: 'Generate all combinations of `n` pairs of valid well-formed parentheses.',
        starterCode: 'def generate_parentheses(n: int) -> list[str]:\n    pass',
        solution: `def generate_parentheses(n: int) -> list[str]:
    res = []
    def backtrack(open_c: int, close_c: int, path: str):
        if len(path) == 2 * n:
            res.append(path)
            return
        if open_c < n:
            backtrack(open_c + 1, close_c, path + "(")
        if close_c < open_c:
            backtrack(open_c, close_c + 1, path + ")")
    backtrack(0, 0, "")
    return res

print(generate_parentheses(3))  # ['((()))', '(()())', '(())()', '()(())', '()()()']`,
        explanation: 'Constraint: close brackets can only be added when close_c < open_c.',
      },
      {
        id: 'py-67-ex-2',
        title: 'Word Search in 2D Board (DFS Backtracking)',
        difficulty: 'Intermediate',
        type: 'coding',
        prompt: 'Check if word exists in 2D board moving adjacent cells without reusing the same cell twice in a word.',
        starterCode: 'def exist(board: list[list[str]], word: str) -> bool:\n    pass',
        solution: `def exist(board: list[list[str]], word: str) -> bool:
    rows, cols = len(board), len(board[0])
    def dfs(r, c, idx):
        if idx == len(word): return True
        if r < 0 or r >= rows or c < 0 or c >= cols or board[r][c] != word[idx]:
            return False
        temp = board[r][c]
        board[r][c] = "#"  # Mark visited in-place
        found = (dfs(r + 1, c, idx + 1) or dfs(r - 1, c, idx + 1) or
                 dfs(r, c + 1, idx + 1) or dfs(r, c - 1, idx + 1))
        board[r][c] = temp  # Backtrack state
        return found

    for r in range(rows):
        for c in range(cols):
            if dfs(r, c, 0): return True
    return False

board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]]
print("Word 'ABCCED' exists?", exist(board, "ABCCED"))  # True`,
        explanation: 'In-place cell marking and restoration avoids allocating a visited set.',
      },
      {
        id: 'py-67-ex-3',
        title: 'N-Queens Solver (Count Solutions)',
        difficulty: 'Advanced',
        type: 'coding',
        prompt: 'Return total number of distinct solutions to the N-Queens problem on an N x N chessboard.',
        starterCode: 'def total_n_queens(n: int) -> int:\n    pass',
        solution: `def total_n_queens(n: int) -> int:
    cols = set()
    diag1 = set() # r - c
    diag2 = set() # r + c
    count = 0
    def backtrack(r: int):
        nonlocal count
        if r == n:
            count += 1
            return
        for c in range(n):
            if c in cols or (r - c) in diag1 or (r + c) in diag2:
                continue
            cols.add(c)
            diag1.add(r - c)
            diag2.add(r + c)
            backtrack(r + 1)
            cols.remove(c)
            diag1.remove(r - c)
            diag2.remove(r + c)
    backtrack(0)
    return count

print("N-Queens count for N=4:", total_n_queens(4))  # 2`,
        explanation: 'Diagonal tracking (r - c and r + c) achieves $O(1)$ attack verification.',
      },
    ],
    quizQuestions: [
      {
        id: 'py-67-q1',
        question: 'Why must a developer append path[:] instead of path to the results list in backtracking?',
        options: [
          'Because path is a local variable that will be garbage collected',
          'Because path is mutated during backtracking; appending path without a copy causes all saved results to reference the final empty list',
          'Because path is an immutable tuple',
          'To sort the list',
        ],
        correctOptionIndex: 1,
        explanation: 'Lists are mutable. If you append path directly, every entry in results points to the exact same list, which ends up empty after unwinding.',
      },
      {
        id: 'py-67-q2',
        question: 'What is the role of sorting before backtracking in problems like Combination Sum II?',
        options: [
          'It is required by the Python interpreter',
          'It enables early pruning of branches (break when candidate > remain) and easy duplicate skipping',
          'It converts the time complexity to O(1)',
          'It allows using binary search on the result',
        ],
        correctOptionIndex: 1,
        explanation: 'Sorting groups duplicates together and allows breaking out of the loop early when a candidate exceeds the remaining target.',
      },
    ],
    revisionNotes: [
      'Backtracking template: choose, explore, unchoose.',
      'Always append a shallow copy: result.append(path[:]).',
      'Pruning branches early dramatically reduces runtime.',
    ],
  },
  {
    id: 'py-68-dsa-trees-graphs',
    moduleId: 'py-m6',
    moduleNumber: 6,
    moduleTitle: 'Python Problem Solving',
    topicNumber: 68,
    title: 'Trees & Graphs: BFS, DFS & Adjacency Lists with defaultdict',
    language: 'python',
    level: 'Advanced',
    whyItMatters:
      'Graph traversals (BFS for shortest paths, DFS for connectivity and topological sorting) are prominent in high-package product rounds. Implementing clean adjacency lists using `defaultdict(list)` is the fastest way to write graph algorithms.',
    explanation:
      'A graph $G = (V, E)$ consists of vertices and edges. In Python:\n1. **Adjacency List**: Represented as `graph = defaultdict(list)` mapping node `u` to list of neighbors `[v1, v2]`.\n2. **Breadth-First Search (BFS)**: Uses `collections.deque` and a `visited` set to traverse level-by-level, finding shortest paths in unweighted graphs in $O(V + E)$ time.\n3. **Depth-First Search (DFS)**: Uses recursion or a stack to explore paths deeply before backtracking in $O(V + E)$ time.\n4. **Trees**: Special acyclic connected graphs; binary trees are traversed via Inorder (LNR), Preorder (NLR), and Postorder (LRN).',
    syntaxAndStructure:
      'from collections import defaultdict, deque\n\n# BFS template (Shortest path in unweighted graph):\nq = deque([(start_node, 0)])\nvisited = {start_node}\nwhile q:\n    curr, dist = q.popleft()\n    for neighbor in graph[curr]:\n        if neighbor not in visited:\n            visited.add(neighbor)\n            q.append((neighbor, dist + 1))',
    codeExamples: [
      {
        title: 'BFS Level-Order Binary Tree Traversal',
        code: `from collections import deque

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def level_order(root: TreeNode | None) -> list[list[int]]:
    if not root:
        return []
    res = []
    q = deque([root])

    while q:
        level_size = len(q)
        current_level = []
        for _ in range(level_size):
            node = q.popleft()
            current_level.append(node.val)
            if node.left: q.append(node.left)
            if node.right: q.append(node.right)
        res.append(current_level)

    return res

# Construct tree: [3, 9, 20, None, None, 15, 7]
root = TreeNode(3, TreeNode(9), TreeNode(20, TreeNode(15), TreeNode(7)))
print("Level order traversal:", level_order(root))`,
        expectedOutput: `Level order traversal: [[3], [9, 20], [15, 7]]`,
        explanation: 'Processing `level_size` in a snapshot loop cleanly groups nodes into level-by-level lists.',
      },
      {
        title: 'Number of Connected Components (Islands) via DFS',
        code: `def num_islands(grid: list[list[str]]) -> int:
    if not grid: return 0
    rows, cols = len(grid), len(grid[0])
    islands = 0

    def dfs(r, c):
        if r < 0 or r >= rows or c < 0 or c >= cols or grid[r][c] != "1":
            return
        grid[r][c] = "0"  # Mark visited in-place!
        dfs(r + 1, c)
        dfs(r - 1, c)
        dfs(r, c + 1)
        dfs(r, c - 1)

    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == "1":
                islands += 1
                dfs(r, c)

    return islands

grid = [
    ["1","1","0","0","0"],
    ["1","1","0","0","0"],
    ["0","0","1","0","0"],
    ["0","0","0","1","1"]
]
print("Total islands:", num_islands(grid))`,
        expectedOutput: `Total islands: 3`,
        explanation: 'Sinks adjacent land cells to "0" in-place, eliminating memory overhead of a visited set.',
      },
    ],
    realWorldApplications: [
      'Social network friend recommendations and graph connectivity.',
      'Routing network packets and finding shortest paths in navigation maps.',
    ],
    commonMistakes: [
      'Not adding nodes to the `visited` set immediately upon pushing to the BFS queue, causing duplicate processing and TLE.',
      'Using `list.pop(0)` instead of `deque.popleft()` for BFS.',
    ],
    interviewRelevance:
      'Universal interview topics: "Number of Islands", "Clone Graph", "Course Schedule (Cycle Detection / Topological Sort)", "Binary Tree Lowest Common Ancestor".',
    checkpoints: [
      { id: 'py-68-cp-1', label: 'Use deque and visited set for BFS.' },
      { id: 'py-68-cp-2', label: 'Sink visited grid cells in-place to save memory.' },
    ],
    practiceExercises: [
      {
        id: 'py-68-ex-1',
        title: 'Lowest Common Ancestor of Binary Tree',
        difficulty: 'Beginner',
        type: 'coding',
        prompt: 'Find lowest common ancestor (LCA) of two nodes p and q in a binary tree.',
        starterCode: 'def lowest_common_ancestor(root: TreeNode, p: TreeNode, q: TreeNode) -> TreeNode:\n    pass',
        solution: `def lowest_common_ancestor(root: TreeNode | None, p: TreeNode, q: TreeNode) -> TreeNode | None:
    if not root or root == p or root == q:
        return root
    left = lowest_common_ancestor(root.left, p, q)
    right = lowest_common_ancestor(root.right, p, q)
    if left and right:
        return root
    return left if left else right

root = TreeNode(3, TreeNode(5), TreeNode(1))
p = root.left
q = root.right
print("LCA val:", lowest_common_ancestor(root, p, q).val)  # 3`,
        explanation: 'Postorder recursion bubbles up matches until the common ancestor node is found.',
      },
      {
        id: 'py-68-ex-2',
        title: 'Course Schedule (Cycle Detection via Kahn\'s BFS)',
        difficulty: 'Intermediate',
        type: 'coding',
        prompt: 'Given prerequisites `[[1, 0]]`, check if candidate can finish all courses using Kahn\'s topological sort.',
        starterCode: 'def can_finish(num_courses: int, prerequisites: list[list[int]]) -> bool:\n    pass',
        solution: `from collections import defaultdict, deque

def can_finish(num_courses: int, prerequisites: list[list[int]]) -> bool:
    in_degree = [0] * num_courses
    adj = defaultdict(list)
    for dest, src in prerequisites:
        adj[src].append(dest)
        in_degree[dest] += 1

    q = deque([i for i in range(num_courses) if in_degree[i] == 0])
    visited_count = 0
    while q:
        curr = q.popleft()
        visited_count += 1
        for neighbor in adj[curr]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                q.append(neighbor)
    return visited_count == num_courses

print("Can finish courses [[1, 0]]:", can_finish(2, [[1, 0]]))  # True`,
        explanation: 'Kahn\'s algorithm processes 0 in-degree nodes with BFS to detect directed cycles.',
      },
      {
        id: 'py-68-ex-3',
        title: 'Word Ladder Shortest Transformation',
        difficulty: 'Advanced',
        type: 'coding',
        prompt: 'Find shortest transformation sequence length from `begin_word` to `end_word` changing one letter at a time using BFS.',
        starterCode: 'def ladder_length(begin: str, end: str, word_list: list[str]) -> int:\n    pass',
        solution: `from collections import deque

def ladder_length(begin: str, end: str, word_list: list[str]) -> int:
    word_set = set(word_list)
    if end not in word_set: return 0
    q = deque([(begin, 1)])
    visited = {begin}

    while q:
        word, length = q.popleft()
        if word == end: return length
        for i in range(len(word)):
            for ch in "abcdefghijklmnopqrstuvwxyz":
                next_word = word[:i] + ch + word[i+1:]
                if next_word in word_set and next_word not in visited:
                    visited.add(next_word)
                    q.append((next_word, length + 1))
    return 0

print("Ladder length:", ladder_length("hit", "cog", ["hot","dot","dog","lot","log","cog"]))  # 5`,
        explanation: 'BFS guarantees shortest path in unweighted state-transformation graphs.',
      },
    ],
    quizQuestions: [
      {
        id: 'py-68-q1',
        question: 'Which data structure is essential for implementing Breadth-First Search (BFS) in optimal time?',
        options: ['Stack', 'Queue (collections.deque)', 'Priority Queue', 'Set only'],
        correctOptionIndex: 1,
        explanation: 'BFS requires a FIFO queue to explore nodes level-by-level in order of distance from root.',
      },
      {
        id: 'py-68-q2',
        question: 'What does a directed cycle signify in Course Schedule / dependency resolution?',
        options: [
          'It means courses can be completed in any order',
          'A deadlock / circular dependency exists that makes completion impossible',
          'It guarantees an optimal topological sort',
          'It reduces time complexity to O(1)',
        ],
        correctOptionIndex: 1,
        explanation: 'A cycle in a dependency graph indicates an unresolvable circular dependency.',
      },
    ],
    revisionNotes: [
      'BFS uses deque and visited set to find shortest paths in unweighted graphs.',
      'DFS uses recursion to explore paths and topological ordering.',
      'Kahn\'s algorithm uses in-degree arrays to detect cycles.',
    ],
  },
  {
    id: 'py-69-dsa-dynamic-programming',
    moduleId: 'py-m6',
    moduleNumber: 6,
    moduleTitle: 'Python Problem Solving',
    topicNumber: 69,
    title: 'Dynamic Programming: Memoization (@lru_cache) & Tabulation',
    language: 'python',
    level: 'Advanced',
    whyItMatters:
      'Dynamic Programming (DP) is the highest-weight topic in advanced software engineering interviews. Mastering the duality between Top-Down Memoization (`@lru_cache`) and Bottom-Up Tabulation unlocks optimal solutions for complex optimization problems.',
    explanation:
      'DP applies to problems with:\n1. **Overlapping Subproblems**: The same recursive subproblems are solved repeatedly.\n2. **Optimal Substructure**: The optimal solution to the problem can be constructed from optimal solutions to its subproblems.\n\nApproaches:\n- **Top-Down (Memoization)**: Write intuitive recursion and cache results using a dictionary or Python\'s `@functools.lru_cache(maxsize=None)`.\n- **Bottom-Up (Tabulation)**: Build a table iteratively from base cases up to the target answer, saving stack space and enabling space optimization (e.g. 2 variables instead of $O(n)$ array).',
    syntaxAndStructure:
      '# Top-Down with @lru_cache:\n@lru_cache(maxsize=None)\ndef dp(i, j):\n    if base_case: return val\n    return min(dp(i-1, j), dp(i, j-1)) + cost\n\n# Bottom-Up Tabulation (1D Space):\nprev, curr = 0, 1\nfor i in range(2, n + 1):\n    prev, curr = curr, prev + curr',
    codeExamples: [
      {
        title: 'House Robber: Top-Down vs Bottom-Up Space Optimized',
        code: `from functools import lru_cache

# 1. Top-Down Memoization
def rob_memo(nums: list[int]) -> int:
    @lru_cache(maxsize=None)
    def dp(i: int) -> int:
        if i >= len(nums):
            return 0
        # Decision: Rob house i and skip i+1, OR skip house i
        return max(nums[i] + dp(i + 2), dp(i + 1))
    return dp(0)

# 2. Bottom-Up Space-Optimized (O(1) auxiliary space!)
def rob_tab(nums: list[int]) -> int:
    prev_max = 0
    curr_max = 0
    for num in nums:
        new_max = max(curr_max, prev_max + num)
        prev_max = curr_max
        curr_max = new_max
    return curr_max

houses = [2, 7, 9, 3, 1]
print("Max loot (Top-Down):", rob_memo(houses))
print("Max loot (Bottom-Up):", rob_tab(houses))`,
        expectedOutput: `Max loot (Top-Down): 12
Max loot (Bottom-Up): 12`,
        explanation: 'Rob house 0 (2) + house 2 (9) + house 4 (1) = 12. Bottom-up achieves $O(n)$ time and $O(1)$ space using two variables.',
      },
      {
        title: 'Coin Change Problem in O(amount * len(coins))',
        code: `def coin_change(coins: list[int], amount: int) -> int:
    # dp[i] represents minimum coins to make amount i
    dp = [float("inf")] * (amount + 1)
    dp[0] = 0

    for i in range(1, amount + 1):
        for coin in coins:
            if i - coin >= 0:
                dp[i] = min(dp[i], dp[i - coin] + 1)

    return dp[amount] if dp[amount] != float("inf") else -1

print("Min coins for amount 11 with [1, 2, 5]:", coin_change([1, 2, 5], 11))`,
        expectedOutput: `Min coins for amount 11 with [1, 2, 5]: 3`,
        explanation: 'dp[11] = 5 + 5 + 1 = 3 coins. Classic unbounded knapsack DP variation.',
      },
    ],
    realWorldApplications: [
      'Resource allocation, inventory management, route optimization (TSP heuristics).',
      'DNA sequence alignment (Needleman-Wunsch algorithm).',
    ],
    commonMistakes: [
      'Trying to use lists as arguments in `@lru_cache` (lists are unhashable; convert to tuples).',
      'Forgetting base case boundaries in tabulation arrays (allocating size `n` instead of `n + 1`).',
    ],
    interviewRelevance:
      'Universal interview topics: "Climbing Stairs", "Coin Change", "Longest Common Subsequence", "Longest Increasing Subsequence", "0/1 Knapsack".',
    checkpoints: [
      { id: 'py-69-cp-1', label: 'Use @lru_cache(maxsize=None) to memoize recursion instantly.' },
      { id: 'py-69-cp-2', label: 'Space-optimize bottom-up DP to O(1) when state only depends on previous row.' },
    ],
    practiceExercises: [
      {
        id: 'py-69-ex-1',
        title: 'Longest Increasing Subsequence (LIS) in O(n^2)',
        difficulty: 'Beginner',
        type: 'coding',
        prompt: 'Return length of longest strictly increasing subsequence in `nums`.',
        starterCode: 'def length_of_lis(nums: list[int]) -> int:\n    pass',
        solution: `def length_of_lis(nums: list[int]) -> int:
    if not nums: return 0
    dp = [1] * len(nums)
    for i in range(len(nums)):
        for j in range(i):
            if nums[j] < nums[i]:
                dp[i] = max(dp[i], dp[j] + 1)
    return max(dp)

print("LIS length:", length_of_lis([10, 9, 2, 5, 3, 7, 101, 18]))  # 4 ([2, 3, 7, 101])`,
        explanation: 'dp[i] stores LIS ending at index i.',
      },
      {
        id: 'py-69-ex-2',
        title: 'Longest Common Subsequence (LCS) 2D DP',
        difficulty: 'Intermediate',
        type: 'coding',
        prompt: 'Return length of longest common subsequence between `text1` and `text2` using 2D DP table.',
        starterCode: 'def longest_common_subsequence(text1: str, text2: str) -> int:\n    pass',
        solution: `def longest_common_subsequence(text1: str, text2: str) -> int:
    m, n = len(text1), len(text2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    for i in range(m):
        for j in range(n):
            if text1[i] == text2[j]:
                dp[i + 1][j + 1] = dp[i][j] + 1
            else:
                dp[i + 1][j + 1] = max(dp[i + 1][j], dp[i][j + 1])
    return dp[m][n]

print("LCS length:", longest_common_subsequence("abcde", "ace"))  # 3 ('ace')`,
        explanation: 'Standard 2D dynamic programming grid problem.',
      },
      {
        id: 'py-69-ex-3',
        title: '0/1 Knapsack Problem',
        difficulty: 'Advanced',
        type: 'coding',
        prompt: 'Given weights, values, and capacity W, return maximum value that fits in the knapsack using 1D space optimization.',
        starterCode: 'def knapsack(weights: list[int], values: list[int], W: int) -> int:\n    pass',
        solution: `def knapsack(weights: list[int], values: list[int], W: int) -> int:
    dp = [0] * (W + 1)
    for w, v in zip(weights, values):
        # Traverse backwards to ensure 0/1 (each item used at most once)
        for cap in range(W, w - 1, -1):
            dp[cap] = max(dp[cap], dp[cap - w] + v)
    return dp[W]

print("Max Knapsack value:", knapsack([1, 3, 4, 5], [1, 4, 5, 7], 7))  # 9`,
        explanation: 'Backward loop enables 1D array space optimization for 0/1 knapsack.',
      },
    ],
    quizQuestions: [
      {
        id: 'py-69-q1',
        question: 'What are the two necessary properties a problem must have to be solved using Dynamic Programming?',
        options: [
          'Linear time complexity and binary trees',
          'Overlapping subproblems and optimal substructure',
          'Sorted input arrays and hash maps',
          'Greedy choices and recursion limits',
        ],
        correctOptionIndex: 1,
        explanation: 'Dynamic Programming is applicable when a problem exhibits both overlapping subproblems and optimal substructure.',
      },
      {
        id: 'py-69-q2',
        question: 'Why do we iterate backwards when space-optimizing the 0/1 Knapsack problem with a 1D DP array?',
        options: [
          'To make the code faster',
          'To prevent using the current item multiple times in the same step',
          'Because Python lists require reverse iteration',
          'To sort the items',
        ],
        correctOptionIndex: 1,
        explanation: 'Iterating backwards ensures that dp[cap - w] represents the state from the PREVIOUS item, preventing duplicate item reuse.',
      },
    ],
    revisionNotes: [
      'Top-Down DP: recursion + @functools.lru_cache(maxsize=None).',
      'Bottom-Up DP: iterative tabulation starting from base cases.',
      'Space-optimize 2D DP to 1D when state only references prior row.',
    ],
  },
  {
    id: 'py-70-dsa-greedy-heapq',
    moduleId: 'py-m6',
    moduleNumber: 6,
    moduleTitle: 'Python Problem Solving',
    topicNumber: 70,
    title: 'Greedy Algorithms & Priority Queues with heapq',
    language: 'python',
    level: 'Advanced',
    whyItMatters:
      'Greedy algorithms make locally optimal choices at each step, yielding globally optimal answers for shortest paths (Dijkstra), minimum spanning trees (Prim), and interval scheduling. Python\'s `heapq` module delivers $O(\\log n)$ priority queues.',
    explanation:
      'In Python, the `heapq` module implements binary min-heaps over standard lists:\n- `heapq.heappush(heap, item)`: Inserts item in $O(\\log n)$ time.\n- `heapq.heappop(heap)`: Pops smallest item in $O(\\log n)$ time.\n- `heapq.heapify(list)`: Transforms an existing list into a min-heap in $O(n)$ linear time.\n- Max-heap in Python: Multiply values by -1 before pushing (`heapq.heappush(heap, -val)`).\n- `heapq.nlargest(k, iterable)` and `heapq.nsmallest(k, iterable)` extract top-k elements efficiently.',
    syntaxAndStructure:
      'import heapq\n\n# Min-Heap operations:\nheap = []\nheapq.heappush(heap, 10)\nsmallest = heapq.heappop(heap)\n\n# Max-Heap trick:\nheapq.heappush(heap, -val)\nmax_val = -heapq.heappop(heap)\n\n# In-place O(n) heapify:\narr = [5, 2, 8, 1]\nheapq.heapify(arr) # arr is now a valid min-heap',
    codeExamples: [
      {
        title: 'Kth Largest Element in Array in O(n log k) with Min-Heap',
        code: `import heapq

def find_kth_largest(nums: list[int], k: int) -> int:
    # Maintain a min-heap of size k
    min_heap = []
    for num in nums:
        heapq.heappush(min_heap, num)
        if len(min_heap) > k:
            heapq.heappop(min_heap)
    # The root of the min-heap is the kth largest element!
    return min_heap[0]

print("3rd largest in [3,2,1,5,6,4]:", find_kth_largest([3, 2, 1, 5, 6, 4], 3))`,
        expectedOutput: `3rd largest in [3,2,1,5,6,4]: 4`,
        explanation: 'Maintaining a min-heap of size k discards smaller elements, solving top-K in optimal $O(n \\log k)$ time and $O(k)$ memory.',
      },
      {
        title: 'Dijkstra\'s Shortest Path Algorithm with heapq in O(E log V)',
        code: `import heapq
from collections import defaultdict

def dijkstra(n: int, edges: list[tuple[int, int, int]], start: int) -> dict[int, int]:
    graph = defaultdict(list)
    for u, v, weight in edges:
        graph[u].append((v, weight))
        graph[v].append((u, weight)) # Undirected

    # min_heap stores (distance, node)
    pq = [(0, start)]
    distances = {i: float("inf") for i in range(n)}
    distances[start] = 0

    while pq:
        curr_dist, u = heapq.heappop(pq)
        if curr_dist > distances[u]:
            continue # Skip outdated distances
        for v, weight in graph[u]:
            dist = curr_dist + weight
            if dist < distances[v]:
                distances[v] = dist
                heapq.heappush(pq, (dist, v))

    return distances

edges = [(0, 1, 4), (0, 2, 1), (2, 1, 2), (1, 3, 1), (2, 3, 5)]
print("Distances from 0:", dijkstra(4, edges, 0))`,
        expectedOutput: `Distances from 0: {0: 0, 1: 3, 2: 1, 3: 4}`,
        explanation: 'Priority queue dynamically retrieves the closest unvisited node, finding all shortest paths in $O(E \\log V)$.',
      },
    ],
    realWorldApplications: [
      'GPS navigation routing (Google Maps Dijkstra and A* search).',
      'Task priority queues and CPU scheduling algorithms.',
    ],
    commonMistakes: [
      'Assuming Python\'s `heapq` is a max-heap; it is strictly a **min-heap** (invert values with `-val` for max-heaps).',
      'Calling `heapq.heappush()` on a list that was never heapified or created with heap methods.',
    ],
    interviewRelevance:
      'Universal interview topics: "Merge K Sorted Lists", "Top K Frequent Elements", "Find Median from Data Stream", "Dijkstra\'s Algorithm".',
    checkpoints: [
      { id: 'py-70-cp-1', label: 'heapq is a MIN-heap; invert values (-val) for max-heap behavior.' },
      { id: 'py-70-cp-2', label: 'heapq.heapify() runs in O(n) linear time.' },
    ],
    practiceExercises: [
      {
        id: 'py-70-ex-1',
        title: 'Merge K Sorted Lists via Min-Heap',
        difficulty: 'Beginner',
        type: 'coding',
        prompt: 'Merge multiple sorted integer lists into one sorted list using `heapq.merge`.',
        starterCode: 'import heapq\ndef merge_k_sorted(lists: list[list[int]]) -> list[int]:\n    pass',
        solution: `import heapq

def merge_k_sorted(lists: list[list[int]]) -> list[int]:
    return list(heapq.merge(*lists))

print("Merged:", merge_k_sorted([[1, 4, 7], [2, 5, 8], [3, 6, 9]]))`,
        explanation: 'heapq.merge combines sorted iterables in $O(N \\log K)$ time.',
      },
      {
        id: 'py-70-ex-2',
        title: 'Gas Station Greedy Circuit',
        difficulty: 'Intermediate',
        type: 'coding',
        prompt: 'Given gas and cost arrays, find starting gas station index to complete circular tour, or -1.',
        starterCode: 'def can_complete_circuit(gas: list[int], cost: list[int]) -> int:\n    pass',
        solution: `def can_complete_circuit(gas: list[int], cost: list[int]) -> int:
    if sum(gas) < sum(cost):
        return -1
    total_tank, curr_tank = 0, 0
    start_idx = 0
    for i in range(len(gas)):
        curr_tank += gas[i] - cost[i]
        if curr_tank < 0:
            start_idx = i + 1
            curr_tank = 0
    return start_idx

print("Start station:", can_complete_circuit([1, 2, 3, 4, 5], [3, 4, 5, 1, 2]))  # 3`,
        explanation: 'Greedy choice: if cannot reach station i+1 from start, no station between start and i can reach it.',
      },
      {
        id: 'py-70-ex-3',
        title: 'Find Median from Data Stream (Two Heaps)',
        difficulty: 'Advanced',
        type: 'coding',
        prompt: 'Design `MedianFinder` with `add_num(num)` and `find_median()` in O(log n) using a max-heap and min-heap.',
        starterCode: 'import heapq\nclass MedianFinder:\n    pass',
        solution: `import heapq

class MedianFinder:
    def __init__(self):
        self.small = []  # Max-heap (invert values)
        self.large = []  # Min-heap

    def add_num(self, num: int):
        heapq.heappush(self.small, -num)
        # Ensure every element in small <= every element in large
        if self.small and self.large and (-self.small[0] > self.large[0]):
            val = -heapq.heappop(self.small)
            heapq.heappush(self.large, val)
        # Balance sizes: small can have at most 1 more element than large
        if len(self.small) > len(self.large) + 1:
            val = -heapq.heappop(self.small)
            heapq.heappush(self.large, val)
        if len(self.large) > len(self.small):
            val = heapq.heappop(self.large)
            heapq.heappush(self.small, -val)

    def find_median(self) -> float:
        if len(self.small) > len(self.large):
            return float(-self.small[0])
        return (-self.small[0] + self.large[0]) / 2.0

mf = MedianFinder()
mf.add_num(1)
mf.add_num(2)
print("Median of [1, 2]:", mf.find_median())  # 1.5
mf.add_num(3)
print("Median of [1, 2, 3]:", mf.find_median())  # 2.0`,
        explanation: 'Dual heap tracks streaming median in $O(\\log n)$ insertion and $O(1)$ query.',
      },
    ],
    quizQuestions: [
      {
        id: 'py-70-q1',
        question: 'What type of heap does Python\'s heapq module implement by default?',
        options: ['Max-Heap', 'Min-Heap', 'Fibonacci Heap', 'Binomial Heap'],
        correctOptionIndex: 1,
        explanation: 'heapq strictly implements a binary min-heap where the smallest element is at index 0 (heap[0]).',
      },
      {
        id: 'py-70-q2',
        question: 'What is the time complexity of heapq.heapify(list) on an unsorted list of N numbers?',
        options: ['O(N log N)', 'O(N^2)', 'O(N)', 'O(1)'],
        correctOptionIndex: 2,
        explanation: 'heapify transforms a list into a valid heap in linear O(N) time.',
      },
    ],
    revisionNotes: [
      'heapq provides min-heap: heappush, heappop, heapify.',
      'heapify is linear O(n); push/pop are O(log n).',
      'Invert values to simulate max-heap in Python.',
    ],
  },
];

export const module6: MasteryModule = {
  id: 'py-m6',
  number: 6,
  title: 'Python Problem Solving',
  description: 'Arrays, prefix sums, hash maps, two pointers, sliding window, stacks, queues, linked lists, binary search, Timsort, backtracking, graphs, DP, and heaps.',
  language: 'python',
  topics: module6Topics,
  moduleAssessment: {
    id: 'py-m6-exam',
    title: 'Python Problem Solving Milestone Assessment',
    passingScorePercentage: 70,
    questions: module6Topics.flatMap((t) => t.quizQuestions),
  },
  revisionQuestions: [
    'Explain how Kadane\'s algorithm achieves O(n) for Maximum Subarray.',
    'How does Two Pointers solve Container With Most Water in O(n)?',
    'What is the difference between fixed and dynamic sliding window templates?',
    'Why is collections.deque mandatory for BFS instead of list?',
    'Explain the dual-heap algorithm for streaming median calculation.',
  ],
};
