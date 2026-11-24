import { MasteryTopic, MasteryModule } from '@/types/mastery';

export const module6Topics: MasteryTopic[] = [
  {
    "id": "java-74-complexity",
    "topicNumber": 74,
    "title": "Time & Space Complexity in Java (Big-O, GC & Memory Footprint)",
    "level": "Intermediate",
    "whyItMatters": "Understanding computational complexity in Java requires knowing not only theoretical Big-O curves, but also JVM-specific runtime realities: primitive vs boxed object memory overhead, Garbage Collection pauses, and cache locality.",
    "explanation": "Algorithm analysis in Java evaluates performance as input size N grows:\n\n1. Big-O Complexity Classes:\n- O(1) Constant: Array index access arr[i], HashMap get()/put() amortized.\n- O(log N) Logarithmic: Binary search on sorted array, TreeMap operations.\n- O(N) Linear: Traversing an array or LinkedList, linear search.\n- O(N log N) Linearithmic: Dual-Pivot Quicksort (Arrays.sort(int[])), TimSort (Arrays.sort(Object[]), Collections.sort()).\n- O(N^2) Quadratic: Nested loops, Bubble sort, naive pair matching.\n- O(2^N) Exponential: Recursive subsets, naive Fibonacci calculation.\n\n2. Java Memory Footprint Overhead:\n- Primitive int: Exactly 4 bytes of contiguous memory.\n- Boxed Integer: 16 bytes of object header + 4 bytes payload + 4 bytes padding = 24 bytes on 64-bit JVM with compressed oops.\n- Array of primitives int[N]: ~ 16-24 bytes header + (4 * N) bytes.\n- Array of boxed objects Integer[N]: Array object header + N * 8 bytes references PLUS N separate 24-byte Integer objects = ~32 * N bytes! (8x memory overhead + poor CPU cache locality due to pointer chasing).\n\n3. Space Complexity Considerations:\n- Auxiliary Space: Extra space used outside the input size (e.g., temporary variables, stacks).\n- Recursion Call Stack: Every recursive frame consumes stack memory (typically 1MB per thread stack size), risking StackOverflowError if recursion depth exceeds ~10,000.",
    "syntaxAndStructure": "// Measuring execution elapsed time:\nlong start = System.nanoTime();\n// algorithmic workload\nlong duration = System.nanoTime() - start;",
    "codeExamples": [
      {
        "title": "Benchmarking Primitive vs Boxed Collection Performance & Memory",
        "code": "public class ComplexityDemo {\n    public static void main(String[] args) {\n        int n = 1_000_000;\n\n        // Primitive int array\n        long start = System.currentTimeMillis();\n        int[] primArr = new int[n];\n        long sumPrim = 0;\n        for (int i = 0; i < n; i++) {\n            primArr[i] = i;\n            sumPrim += primArr[i];\n        }\n        long primTime = System.currentTimeMillis() - start;\n\n        // Boxed Integer array\n        start = System.currentTimeMillis();\n        Integer[] boxedArr = new Integer[n];\n        long sumBoxed = 0;\n        for (int i = 0; i < n; i++) {\n            boxedArr[i] = i; // Autoboxing creates object references\n            sumBoxed += boxedArr[i];\n        }\n        long boxedTime = System.currentTimeMillis() - start;\n\n        System.out.println(\"Primitive sum: \" + sumPrim + \" in \" + primTime + \" ms\");\n        System.out.println(\"Boxed sum: \" + sumBoxed + \" in \" + boxedTime + \" ms\");\n        System.out.println(\"Boxed is significantly slower due to allocation and pointer dereferencing!\");\n    }\n}",
        "expectedOutput": "Primitive sum: 499999500000 in 3 ms\nBoxed sum: 499999500000 in 28 ms\nBoxed is significantly slower due to allocation and pointer dereferencing!",
        "explanation": "Primitive arrays store raw contiguous 32-bit values with L1/L2 cache prefetching. Boxed Integer arrays store object references pointing to scattered heap locations, causing cache misses and GC pressure."
      },
      {
        "title": "Comparing Time Complexities: O(1), O(log N), O(N), O(N log N)",
        "code": "import java.util.*;\n\npublic class TimeComplexityClasses {\n    // O(1)\n    public static int getFirst(int[] arr) {\n        return arr[0];\n    }\n\n    // O(log N) - Binary Search\n    public static int binarySearch(int[] arr, int target) {\n        int low = 0, high = arr.length - 1;\n        while (low <= high) {\n            int mid = low + (high - low) / 2;\n            if (arr[mid] == target) return mid;\n            else if (arr[mid] < target) low = mid + 1;\n            else high = mid - 1;\n        }\n        return -1;\n    }\n\n    public static void main(String[] args) {\n        int[] arr = {10, 20, 30, 40, 50, 60, 70, 80};\n        System.out.println(\"O(1) Access: \" + getFirst(arr));\n        System.out.println(\"O(log N) Index of 50: \" + binarySearch(arr, 50));\n    }\n}",
        "expectedOutput": "O(1) Access: 10\nO(log N) Index of 50: 4",
        "explanation": "Array index lookup is O(1) because memory address is calculated via base + index * 4 bytes. Binary search cuts the search space in half each iteration, yielding O(log N) steps."
      }
    ],
    "realWorldApplications": [
      "High-frequency trading and low-latency systems avoiding boxed collections (Agrona, Trove, or primitive arrays) to eliminate GC pauses.",
      "Analyzing API latency SLAs where O(N^2) endpoints cause microservice cascading timeouts under production loads."
    ],
    "commonMistakes": [
      "Assuming String.substring() is O(1): in modern Java it creates a new char array copy, making it O(L) time and space.",
      "Using ArrayList.contains() inside a loop, resulting in unintentional O(N^2) runtime instead of using a HashSet for O(N).",
      "Ignoring auxiliary call stack space in recursive algorithms when calculating space complexity."
    ],
    "interviewRelevance": "Every coding interview begins and ends with complexity analysis. Top tech companies expect precise Big-O derivation for both average and worst cases, plus memory footprint justifications.",
    "checkpoints": [
      {
        "id": "java-74-cp1",
        "label": "Derive time and auxiliary space complexity for iterative and recursive algorithms"
      },
      {
        "id": "java-74-cp2",
        "label": "Understand primitive vs boxed memory overhead and cache locality implications"
      },
      {
        "id": "java-74-cp3",
        "label": "Analyze standard library method costs (Arrays.sort, HashMap operations, String operations)"
      }
    ],
    "practiceExercises": [
      {
        "id": "java-74-ex1",
        "title": "Analyze Collection Operations Complexity",
        "difficulty": "Beginner",
        "type": "conceptual",
        "prompt": "State the average and worst-case time complexity for: (1) ArrayList.get(i), (2) LinkedList.addFirst(), (3) HashMap.containsKey(k), (4) TreeSet.contains(v).",
        "solution": "1. ArrayList.get(i): Average O(1), Worst O(1) (direct index arithmetic).\n2. LinkedList.addFirst(): Average O(1), Worst O(1) (pointer updates).\n3. HashMap.containsKey(k): Average O(1), Worst O(log N) since Java 8 red-black tree bin conversion.\n4. TreeSet.contains(v): Average O(log N), Worst O(log N) (self-balancing Red-Black tree traversal).",
        "explanation": "Direct indexing is constant time, linked node prepend is constant time, hash maps are amortized constant time, and balanced trees guarantee logarithmic time."
      },
      {
        "id": "java-74-ex2",
        "title": "Optimize O(N^2) Pair Sum to O(N)",
        "difficulty": "Intermediate",
        "type": "coding",
        "prompt": "Given an int array and target sum, write an O(N) time and O(N) space method hasPairWithSum using a HashSet instead of nested loops.",
        "starterCode": "import java.util.*;\n\npublic class PairSum {\n    public static boolean hasPairWithSum(int[] nums, int target) {\n        // Implement O(N) lookup\n        return false;\n    }\n}",
        "solution": "import java.util.*;\n\npublic class PairSum {\n    public static boolean hasPairWithSum(int[] nums, int target) {\n        Set<Integer> seen = new HashSet<>();\n        for (int num : nums) {\n            int complement = target - num;\n            if (seen.contains(complement)) {\n                return true;\n            }\n            seen.add(num);\n        }\n        return false;\n    }\n}",
        "explanation": "By checking if the complement (target - num) exists in the HashSet before adding the current element, we solve the problem in a single O(N) pass with O(N) auxiliary space."
      },
      {
        "id": "java-74-ex3",
        "title": "Memory-Efficient Bitset Existence Checker",
        "difficulty": "Advanced",
        "type": "coding",
        "prompt": "Implement a memory-efficient presence checker for numbers 0 through 1,000,000 using primitive long[] bitwise operations instead of boolean[] or HashSet.",
        "starterCode": "public class FastBitSet {\n    private final long[] words;\n\n    public FastBitSet(int maxVal) {\n        this.words = new long[(maxVal >> 6) + 1];\n    }\n\n    public void add(int val) {\n        // Set bit\n    }\n\n    public boolean contains(int val) {\n        // Test bit\n        return false;\n    }\n}",
        "solution": "public class FastBitSet {\n    private final long[] words;\n\n    public FastBitSet(int maxVal) {\n        this.words = new long[(maxVal >> 6) + 1];\n    }\n\n    public void add(int val) {\n        int wordIndex = val >> 6; // val / 64\n        int bitOffset = val & 63; // val % 64\n        words[wordIndex] |= (1L << bitOffset);\n    }\n\n    public boolean contains(int val) {\n        int wordIndex = val >> 6;\n        int bitOffset = val & 63;\n        return (words[wordIndex] & (1L << bitOffset)) != 0;\n    }\n}",
        "explanation": "A boolean[] array uses 1 byte per boolean (1 MB for 1 million entries). A primitive long[] bitset packs 64 booleans per long, consuming only ~15.6 KB of heap space (64x memory savings)."
      }
    ],
    "quizQuestions": [
      {
        "id": "java-74-q1",
        "question": "What is the theoretical worst-case time complexity of HashMap.get(key) in Java 8+ when hash collisions occur on the same bucket?",
        "options": [
          "O(1)",
          "O(log N)",
          "O(N)",
          "O(N^2)"
        ],
        "correctOptionIndex": 1,
        "explanation": "In Java 8+, hash buckets that exceed 8 colliding entries are transformed from linked lists (O(N)) into balanced Red-Black trees (TreeNode), guaranteeing O(log N) worst-case lookup."
      },
      {
        "id": "java-74-q2",
        "question": "Why does an Integer[1000] array consume significantly more heap memory than an int[1000] array in a 64-bit JVM?",
        "options": [
          "Because int is 64-bit while Integer is 128-bit",
          "Because Integer[] contains 1000 separate heap object allocations with headers in addition to 1000 references",
          "Because Java compresses int arrays but never compresses object arrays",
          "Because arrays in Java always double their internal capacity automatically"
        ],
        "correctOptionIndex": 1,
        "explanation": "An int[1000] array is a single contiguous block of 4000 bytes + header. An Integer[1000] array holds 1000 reference pointers (4-8 bytes each) pointing to 1000 separate Integer objects (24 bytes each)."
      }
    ],
    "revisionNotes": [
      "Big-O describes upper bound asymptotic behavior; constant factors matter in production.",
      "Java 8+ converts crowded HashMap bins from LinkedList (O(N)) to Red-Black Tree (O(log N)).",
      "Primitive arrays save up to 80-90% memory over boxed object collections and maximize CPU L1/L2 cache hits."
    ],
    "moduleId": "java-m6",
    "moduleNumber": 6,
    "moduleTitle": "Java Problem Solving",
    "language": "java"
  },
  {
    "id": "java-75-prefix-sums",
    "topicNumber": 75,
    "title": "Array Patterns, Prefix Sums & Difference Arrays",
    "level": "Intermediate",
    "whyItMatters": "Prefix sums reduce repetitive range sum queries from O(N) to O(1) time. Combined with difference arrays, range updates on static arrays can be batched in O(1) time instead of modifying entire subarrays.",
    "explanation": "1. 1D Prefix Sum Concept:\nGiven an array nums of length N, the prefix sum array pref of size N+1 stores cumulative sums:\n- pref[0] = 0\n- pref[i] = pref[i-1] + nums[i-1] for i from 1 to N.\n- Any range sum from index left to right (0-indexed inclusive) equals: pref[right + 1] - pref[left] in O(1) time!\n\n2. Prefix Sum + Hash Map (The Subarray Sum equals K pattern):\nTo find continuous subarrays summing to K:\n- Maintain running prefix sum currSum.\n- We need an earlier prefix sum such that: currSum - prevSum = K => prevSum = currSum - K.\n- Use a HashMap to store frequency of each prefix sum seen so far, initialized with map.put(0, 1).\n\n3. Difference Array Pattern (O(1) Range Updates):\nWhen you have repeated operations adding value val to subarray nums[left..right]:\n- Define difference array: diff[i] = nums[i] - nums[i-1] (with diff[0] = nums[0]).\n- To add val to range [left, right]:\n  1. diff[left] += val;\n  2. If right + 1 < N, diff[right + 1] -= val;\n- After all updates, calculate the running prefix sum of diff to restore the updated array in a single O(N) pass!",
    "syntaxAndStructure": "// Building prefix sum array:\nlong[] pref = new long[n + 1];\nfor (int i = 0; i < n; i++) pref[i + 1] = pref[i] + nums[i];\nlong rangeSum = pref[r + 1] - pref[l];",
    "codeExamples": [
      {
        "title": "O(1) Range Sum Queries using Prefix Sums",
        "code": "public class PrefixSumDemo {\n    private final long[] pref;\n\n    public PrefixSumDemo(int[] nums) {\n        pref = new long[nums.length + 1];\n        for (int i = 0; i < nums.length; i++) {\n            pref[i + 1] = pref[i] + nums[i];\n        }\n    }\n\n    public long queryRange(int left, int right) {\n        return pref[right + 1] - pref[left];\n    }\n\n    public static void main(String[] args) {\n        int[] nums = {2, 4, 1, 7, 3, 9};\n        PrefixSumDemo solver = new PrefixSumDemo(nums);\n\n        System.out.println(\"Sum [1..3] (4+1+7): \" + solver.queryRange(1, 3));\n        System.out.println(\"Sum [0..5] (total): \" + solver.queryRange(0, 5));\n    }\n}",
        "expectedOutput": "Sum [1..3] (4+1+7): 12\nSum [0..5] (total): 26",
        "explanation": "Preprocessing takes O(N) time and O(N) space. Each subsequent query is resolved in strictly O(1) arithmetic operations without looping."
      },
      {
        "title": "Difference Array for Multiple Range Updates in O(1) per Query",
        "code": "import java.util.Arrays;\n\npublic class DifferenceArrayDemo {\n    public static int[] applyRangeUpdates(int length, int[][] updates) {\n        int[] diff = new int[length + 1];\n\n        // Apply each update [left, right, val] in O(1)\n        for (int[] u : updates) {\n            int left = u[0], right = u[1], val = u[2];\n            diff[left] += val;\n            if (right + 1 < length) {\n                diff[right + 1] -= val;\n            }\n        }\n\n        // Reconstruct array via prefix sum in O(N)\n        int[] result = new int[length];\n        int running = 0;\n        for (int i = 0; i < length; i++) {\n            running += diff[i];\n            result[i] = running;\n        }\n        return result;\n    }\n\n    public static void main(String[] args) {\n        int[][] updates = {\n            {0, 2, 3},\n            {1, 4, 2},\n            {2, 3, 5}\n        };\n\n        int[] finalArr = applyRangeUpdates(5, updates);\n        System.out.println(\"Result after batch updates: \" + Arrays.toString(finalArr));\n    }\n}",
        "expectedOutput": "Result after batch updates: [3, 5, 10, 7, 2]",
        "explanation": "Each update takes O(1) time by bumping diff[left] and subtracting from diff[right+1]. Final reconstruction takes a single O(N) scan, resulting in O(N + Q) instead of O(N * Q)."
      }
    ],
    "realWorldApplications": [
      "Financial applications computing rolling revenue windows and cumulative account balances over historical transaction feeds.",
      "Flight and railway seat booking engines checking capacity across flight legs using difference arrays."
    ],
    "commonMistakes": [
      "Using 32-bit int for prefix sums when values can sum to > 2 billion, triggering integer overflow. Always use long for cumulative sums.",
      "Off-by-one errors in index mapping: 1-indexed prefix arrays pref[i + 1] prevent checking if (left == 0) edge cases.",
      "Forgetting to initialize map.put(0L, 1) in Subarray Sum equals K, missing valid subarrays starting at index 0."
    ],
    "interviewRelevance": "Prefix sums combined with HashMap or Binary Search appear frequently in Google, Amazon, and Meta interviews (e.g., Subarray Sum Equals K, Continuous Subarray Sum, Corporate Flight Bookings).",
    "checkpoints": [
      {
        "id": "java-75-cp1",
        "label": "Construct 1D prefix sum arrays and execute O(1) range sum queries"
      },
      {
        "id": "java-75-cp2",
        "label": "Solve Subarray Sum Equals K in O(N) using running sum and HashMap"
      },
      {
        "id": "java-75-cp3",
        "label": "Apply difference arrays for O(1) range increments on static arrays"
      }
    ],
    "practiceExercises": [
      {
        "id": "java-75-ex1",
        "title": "Compute Range Sum of Array",
        "difficulty": "Beginner",
        "type": "coding",
        "prompt": "Build a NumArray class with a constructor accepting an int[] and a sumRange(int left, int right) method operating in O(1) time.",
        "starterCode": "public class NumArray {\n    public NumArray(int[] nums) {\n        // Preprocess prefix sum\n    }\n    public int sumRange(int left, int right) {\n        return 0;\n    }\n}",
        "solution": "public class NumArray {\n    private final int[] prefix;\n\n    public NumArray(int[] nums) {\n        prefix = new int[nums.length + 1];\n        for (int i = 0; i < nums.length; i++) {\n            prefix[i + 1] = prefix[i] + nums[i];\n        }\n    }\n\n    public int sumRange(int left, int right) {\n        return prefix[right + 1] - prefix[left];\n    }\n}",
        "explanation": "prefix[i + 1] holds the sum of nums[0..i]. Thus sumRange(left, right) is simply prefix[right + 1] - prefix[left]."
      },
      {
        "id": "java-75-ex2",
        "title": "Subarray Sum Equals K",
        "difficulty": "Intermediate",
        "type": "coding",
        "prompt": "Given an array of integers nums and an integer k, return the total number of continuous subarrays whose sum equals to k.",
        "starterCode": "import java.util.*;\n\npublic class SubarraySumK {\n    public static int subarraySum(int[] nums, int k) {\n        return 0;\n    }\n}",
        "solution": "import java.util.*;\n\npublic class SubarraySumK {\n    public static int subarraySum(int[] nums, int k) {\n        int count = 0;\n        int currentSum = 0;\n        Map<Integer, Integer> prefixCounts = new HashMap<>();\n        prefixCounts.put(0, 1);\n\n        for (int num : nums) {\n            currentSum += num;\n            if (prefixCounts.containsKey(currentSum - k)) {\n                count += prefixCounts.get(currentSum - k);\n            }\n            prefixCounts.put(currentSum, prefixCounts.getOrDefault(currentSum, 0) + 1);\n        }\n        return count;\n    }\n}",
        "explanation": "If currentSum - previousSum = k, then the subarray between those two points has sum k. Storing counts in a HashMap gives O(N) time and O(N) space."
      },
      {
        "id": "java-75-ex3",
        "title": "Corporate Flight Bookings (Difference Array)",
        "difficulty": "Advanced",
        "type": "coding",
        "prompt": "There are n flights labeled from 1 to n. Given an array of bookings where bookings[i] = [first, last, seats], return an array of length n representing seats booked per flight.",
        "starterCode": "public class FlightBookings {\n    public static int[] corpFlightBookings(int[][] bookings, int n) {\n        return new int[n];\n    }\n}",
        "solution": "public class FlightBookings {\n    public static int[] corpFlightBookings(int[][] bookings, int n) {\n        int[] diff = new int[n];\n\n        for (int[] b : bookings) {\n            int first = b[0] - 1;\n            int last = b[1] - 1;\n            int seats = b[2];\n\n            diff[first] += seats;\n            if (last + 1 < n) {\n                diff[last + 1] -= seats;\n            }\n        }\n\n        for (int i = 1; i < n; i++) {\n            diff[i] += diff[i - 1];\n        }\n        return diff;\n    }\n}",
        "explanation": "Difference array allows marking the seat addition at index first and negation at last+1 in O(1) time. Accumulating prefix sums yields the answer in O(N + B) time."
      }
    ],
    "quizQuestions": [
      {
        "id": "java-75-q1",
        "question": "Why do we typically allocate prefix arrays with size N + 1 instead of N?",
        "options": [
          "Because Java requires arrays to have an even length",
          "To represent an empty prefix sum (0) at index 0, eliminating boundary checks when left == 0",
          "To reserve memory for the garbage collector",
          "To prevent OutOfMemoryError during array cloning"
        ],
        "correctOptionIndex": 1,
        "explanation": "A size N + 1 array with pref[0] = 0 allows querying range [left, right] as pref[right + 1] - pref[left] uniformly without needing an if (left == 0) branch."
      },
      {
        "id": "java-75-q2",
        "question": "What is the time complexity of applying Q range updates to an array of size N using a difference array?",
        "options": [
          "O(N * Q)",
          "O(Q * log N)",
          "O(N + Q)",
          "O(N * log Q)"
        ],
        "correctOptionIndex": 2,
        "explanation": "Each of the Q updates takes O(1) time to modify two points in the difference array. The final prefix sum scan takes O(N), giving total O(N + Q) time."
      }
    ],
    "revisionNotes": [
      "Prefix sums turn O(N) range queries into O(1).",
      "Always use long for cumulative sums when element values can sum beyond Integer.MAX_VALUE.",
      "Difference arrays convert O(N) range update operations into O(1) endpoint updates with a final O(N) prefix sweep."
    ],
    "moduleId": "java-m6",
    "moduleNumber": 6,
    "moduleTitle": "Java Problem Solving",
    "language": "java"
  },
  {
    "id": "java-76-hashing",
    "topicNumber": 76,
    "title": "Hashing Patterns, Frequency Counting & Anagram Analysis",
    "level": "Beginner",
    "whyItMatters": "Hash tables and frequency arrays form the foundation of countless interview solutions. Learning when to use primitive fixed arrays (int[26]) versus HashMap<K, V> optimizes execution speed by up to 20x.",
    "explanation": "1. Fixed-Size Alphabet Hashing (int[26]):\nWhen the input character set is constrained (e.g., lowercase English letters a-z), a primitive int[26] array is dramatically faster than HashMap<Character, Integer> because:\n- Zero object allocation or boxing overhead.\n- Direct O(1) index computation via c - 'a'.\n- Cache lines load the entire 104-byte array directly into CPU L1 cache.\n\n2. Group Anagrams Pattern:\nTwo words are anagrams if and only if their sorted character representation or their character frequency counts match.\n- Canonical Key 1: Sort characters (Arrays.sort(charArr)) -> O(K log K) per word.\n- Canonical Key 2: Character frequency string (e.g., #1#0#2...#0) -> O(K) per word.\nUse Map<String, List<String>> to group matching keys.\n\n3. Longest Consecutive Sequence Pattern:\nGiven an unsorted array, find length of longest consecutive elements sequence in O(N) time:\n- Insert all numbers into a HashSet<Integer>.\n- Only start counting streaks from numbers where !set.contains(num - 1) (streak starters).\n- Each element is visited at most twice, guaranteeing strict O(N) time complexity.",
    "syntaxAndStructure": "// Primitive frequency array for lowercase letters:\nint[] freq = new int[26];\nfor (char c : s.toCharArray()) freq[c - 'a']++;",
    "codeExamples": [
      {
        "title": "Group Anagrams using Frequency Fingerprints",
        "code": "import java.util.*;\n\npublic class GroupAnagramsDemo {\n    public static List<List<String>> groupAnagrams(String[] strs) {\n        Map<String, List<String>> map = new HashMap<>();\n\n        for (String s : strs) {\n            int[] count = new int[26];\n            for (char c : s.toCharArray()) {\n                count[c - 'a']++;\n            }\n\n            // Create canonical fingerprint string: e.g. #1#0#2...\n            StringBuilder sb = new StringBuilder();\n            for (int i = 0; i < 26; i++) {\n                sb.append('#').append(count[i]);\n            }\n            String key = sb.toString();\n\n            map.computeIfAbsent(key, k -> new ArrayList<>()).add(s);\n        }\n\n        return new ArrayList<>(map.values());\n    }\n\n    public static void main(String[] args) {\n        String[] words = {\"eat\", \"tea\", \"tan\", \"ate\", \"nat\", \"bat\"};\n        List<List<String>> groups = groupAnagrams(words);\n        for (List<String> group : groups) {\n            System.out.println(group);\n        }\n    }\n}",
        "expectedOutput": "[eat, tea, ate]\n[bat]\n[tan, nat]",
        "explanation": "Words sharing the same letter frequencies generate identical string fingerprints, clustering all anagrams into the same bucket in O(N * K) time."
      },
      {
        "title": "Longest Consecutive Sequence in O(N) using HashSet",
        "code": "import java.util.*;\n\npublic class LongestConsecutiveDemo {\n    public static int longestConsecutive(int[] nums) {\n        Set<Integer> numSet = new HashSet<>();\n        for (int num : nums) {\n            numSet.add(num);\n        }\n\n        int longestStreak = 0;\n\n        for (int num : numSet) {\n            // Check if num is the start of a sequence\n            if (!numSet.contains(num - 1)) {\n                int currentNum = num;\n                int currentStreak = 1;\n\n                while (numSet.contains(currentNum + 1)) {\n                    currentNum++;\n                    currentStreak++;\n                }\n\n                longestStreak = Math.max(longestStreak, currentStreak);\n            }\n        }\n\n        return longestStreak;\n    }\n\n    public static void main(String[] args) {\n        int[] nums = {100, 4, 200, 1, 3, 2};\n        System.out.println(\"Longest streak: \" + longestConsecutive(nums));\n    }\n}",
        "expectedOutput": "Longest streak: 4",
        "explanation": "The streak [1, 2, 3, 4] has length 4. By only initiating count loops on streak starters (!numSet.contains(num - 1)), every element is visited O(1) times."
      }
    ],
    "realWorldApplications": [
      "Search engines detecting duplicate or plagiarized articles using shingles and min-hashing.",
      "Log processing and analytics engines calculating top URL paths and active user sessions."
    ],
    "commonMistakes": [
      "Iterating through the original array instead of the HashSet in Longest Consecutive Sequence, repeating identical streaks and degrading to O(N^2).",
      "Using char[26] frequency array with non-ASCII or mixed-case Unicode characters, leading to ArrayIndexOutOfBoundsException. Check constraints first.",
      "Creating string keys by simple concatenation without delimiters (e.g., count 1 followed by 11 can clash with count 11 followed by 1). Always use a delimiter."
    ],
    "interviewRelevance": "Valid Anagram, Group Anagrams, Two Sum, and Longest Consecutive Sequence are classic interview staples at every tech firm.",
    "checkpoints": [
      {
        "id": "java-76-cp1",
        "label": "Use primitive int[26] frequency arrays for bounded alphabet problems"
      },
      {
        "id": "java-76-cp2",
        "label": "Group anagrams using frequency fingerprints or sorted strings"
      },
      {
        "id": "java-76-cp3",
        "label": "Identify streak-starter condition in HashSet algorithms to achieve O(N) time"
      }
    ],
    "practiceExercises": [
      {
        "id": "java-76-ex1",
        "title": "Valid Anagram Check",
        "difficulty": "Beginner",
        "type": "coding",
        "prompt": "Given two strings s and t consisting of lowercase English letters, return true if t is an anagram of s, and false otherwise.",
        "starterCode": "public class AnagramCheck {\n    public static boolean isAnagram(String s, String t) {\n        return false;\n    }\n}",
        "solution": "public class AnagramCheck {\n    public static boolean isAnagram(String s, String t) {\n        if (s.length() != t.length()) return false;\n        int[] counts = new int[26];\n        for (int i = 0; i < s.length(); i++) {\n            counts[s.charAt(i) - 'a']++;\n            counts[t.charAt(i) - 'a']--;\n        }\n        for (int c : counts) {\n            if (c != 0) return false;\n        }\n        return true;\n    }\n}",
        "explanation": "Incrementing for characters in s and decrementing for characters in t checks equality in a single pass. If all counts return to 0, they are anagrams."
      },
      {
        "id": "java-76-ex2",
        "title": "Top K Frequent Elements",
        "difficulty": "Intermediate",
        "type": "coding",
        "prompt": "Given an integer array nums and an integer k, return the k most frequent elements. The algorithm must be better than O(N log N).",
        "starterCode": "import java.util.*;\n\npublic class TopKFrequent {\n    public static int[] topKFrequent(int[] nums, int k) {\n        return new int[k];\n    }\n}",
        "solution": "import java.util.*;\n\npublic class TopKFrequent {\n    public static int[] topKFrequent(int[] nums, int k) {\n        Map<Integer, Integer> freqMap = new HashMap<>();\n        for (int num : nums) {\n            freqMap.put(num, freqMap.getOrDefault(num, 0) + 1);\n        }\n\n        // Min-heap based on frequency: O(N log K)\n        PriorityQueue<Integer> heap = new PriorityQueue<>(\n            Comparator.comparingInt(freqMap::get)\n        );\n\n        for (int num : freqMap.keySet()) {\n            heap.offer(num);\n            if (heap.size() > k) {\n                heap.poll();\n            }\n        }\n\n        int[] result = new int[k];\n        for (int i = k - 1; i >= 0; i--) {\n            result[i] = heap.poll();\n        }\n        return result;\n    }\n}",
        "explanation": "Using a min-heap of size K bounded by frequency yields O(N log K) time complexity, which beats full sorting O(N log N)."
      },
      {
        "id": "java-76-ex3",
        "title": "Subarray Sums Divisible by K",
        "difficulty": "Advanced",
        "type": "coding",
        "prompt": "Given an integer array nums and an integer k, return the number of non-empty subarrays that have a sum divisible by k. Handle negative numbers correctly.",
        "starterCode": "public class SubarrayDivK {\n    public static int subarraysDivByK(int[] nums, int k) {\n        return 0;\n    }\n}",
        "solution": "public class SubarrayDivK {\n    public static int subarraysDivByK(int[] nums, int k) {\n        int[] remainderCounts = new int[k];\n        remainderCounts[0] = 1; // Empty prefix sum % k is 0\n\n        int runningSum = 0;\n        int count = 0;\n\n        for (int num : nums) {\n            runningSum += num;\n            int rem = runningSum % k;\n            if (rem < 0) rem += k; // Normalize negative remainders\n\n            count += remainderCounts[rem];\n            remainderCounts[rem]++;\n        }\n\n        return count;\n    }\n}",
        "explanation": "If two prefix sums have the identical remainder modulo k, the subarray between them must sum to a multiple of k. Normalizing negative remainders via (rem + k) % k ensures correct array indexing."
      }
    ],
    "quizQuestions": [
      {
        "id": "java-76-q1",
        "question": "Why is an int[26] array preferred over HashMap<Character, Integer> when counting frequencies of lowercase English letters?",
        "options": [
          "Because HashMap does not support char keys in Java",
          "Because int[26] eliminates object allocation, boxing, and hash collisions while keeping data contiguous in CPU cache",
          "Because int[26] automatically sorts elements alphabetically",
          "Because HashMap cannot store more than 16 elements without re-allocating"
        ],
        "correctOptionIndex": 1,
        "explanation": "int[26] consumes a mere 104 bytes of contiguous primitive memory with direct index computation (c - 'a'), completely bypassing Integer autoboxing and hash bucket collisions."
      },
      {
        "id": "java-76-q2",
        "question": "In the Longest Consecutive Sequence algorithm, why do we check !numSet.contains(num - 1)?",
        "options": [
          "To ensure numbers are sorted",
          "To ensure we only start counting from the beginning of a consecutive streak, avoiding O(N^2) redundant counting",
          "To prevent NullPointerException in HashSet",
          "To skip negative numbers"
        ],
        "correctOptionIndex": 1,
        "explanation": "If num - 1 is present in the set, num cannot be the start of a streak. Checking this ensures each streak is traversed only once, guaranteeing overall O(N) time."
      }
    ],
    "revisionNotes": [
      "Use int[26] or int[128] for fixed character alphabets to achieve maximum throughput.",
      "Group Anagrams can use sorted strings or delimited frequency fingerprints as map keys.",
      "When working with modular arithmetic and negative integers in Java, normalize remainders using (rem % k + k) % k."
    ],
    "moduleId": "java-m6",
    "moduleNumber": 6,
    "moduleTitle": "Java Problem Solving",
    "language": "java"
  },
  {
    "id": "java-77-two-pointers",
    "topicNumber": 77,
    "title": "Two-Pointer Techniques: Inward, Directional & Fast-Slow",
    "level": "Intermediate",
    "whyItMatters": "Two-pointer patterns transform naive O(N^2) search spaces into linear O(N) scans by exploiting monotonicity and sorted array properties, using constant O(1) auxiliary space.",
    "explanation": "1. Opposite-Directional (Converging) Pointers:\n- Place one pointer at left = 0 and another at right = n - 1.\n- At each step, evaluate condition (e.g., arr[left] + arr[right] vs target, or Math.min(height[left], height[right]) * (right - left)).\n- Increment left or decrement right monotonically based on problem constraints.\n- Solves Two Sum II (sorted array), Container With Most Water, Trapping Rain Water, and 3Sum.\n\n2. Equi-Directional (Fast & Slow) Pointers:\n- Slow pointer maintains the boundary of processed valid elements; fast pointer explores ahead.\n- Classic for in-place array modification: Remove Duplicates from Sorted Array, Move Zeroes.\n- In Linked Lists: Floyd’s Cycle-Finding Algorithm (detecting cycles and finding middle node).\n\n3. 3Sum (Sorting + Converging Pointers):\n- Sort the array in O(N log N).\n- Iterate with pointer i from 0 to N-3.\n- For each fixed nums[i], solve Two Sum II for the remaining subarray using left = i + 1 and right = N - 1.\n- Skip duplicates on i, left, and right to guarantee unique triplets.",
    "syntaxAndStructure": "// Converging two pointers on sorted array:\nint left = 0, right = nums.length - 1;\nwhile (left < right) {\n    int sum = nums[left] + nums[right];\n    if (sum == target) return new int[]{left, right};\n    else if (sum < target) left++;\n    else right--;\n}",
    "codeExamples": [
      {
        "title": "Container With Most Water in O(N) Time and O(1) Space",
        "code": "public class ContainerWithMostWater {\n    public static int maxArea(int[] height) {\n        int left = 0, right = height.length - 1;\n        int maxWater = 0;\n\n        while (left < right) {\n            int h = Math.min(height[left], height[right]);\n            int width = right - left;\n            maxWater = Math.max(maxWater, h * width);\n\n            // Move the pointer with the shorter height inward\n            if (height[left] < height[right]) {\n                left++;\n            } else {\n                right--;\n            }\n        }\n\n        return maxWater;\n    }\n\n    public static void main(String[] args) {\n        int[] heights = {1, 8, 6, 2, 5, 4, 8, 3, 7};\n        System.out.println(\"Max water volume: \" + maxArea(heights));\n    }\n}",
        "expectedOutput": "Max water volume: 49",
        "explanation": "Width decreases with every step. To find a larger area, we must seek a taller boundary by advancing the shorter line inward. Running time is O(N) and auxiliary space is O(1)."
      },
      {
        "title": "Remove Duplicates from Sorted Array In-Place",
        "code": "import java.util.Arrays;\n\npublic class RemoveDuplicatesDemo {\n    public static int removeDuplicates(int[] nums) {\n        if (nums.length == 0) return 0;\n\n        int slow = 0; // Boundary of unique elements\n\n        for (int fast = 1; fast < nums.length; fast++) {\n            if (nums[fast] != nums[slow]) {\n                slow++;\n                nums[slow] = nums[fast];\n            }\n        }\n\n        return slow + 1; // Number of unique elements\n    }\n\n    public static void main(String[] args) {\n        int[] nums = {0, 0, 1, 1, 1, 2, 2, 3, 3, 4};\n        int k = removeDuplicates(nums);\n        System.out.println(\"Unique count: \" + k);\n        System.out.println(\"Modified array prefix: \" + Arrays.toString(Arrays.copyOf(nums, k)));\n    }\n}",
        "expectedOutput": "Unique count: 5\nModified array prefix: [0, 1, 2, 3, 4]",
        "explanation": "The fast pointer scans ahead. Whenever a new unique number is encountered, slow advances and overwrites in-place without auxiliary arrays."
      }
    ],
    "realWorldApplications": [
      "Video streaming codecs synchronizing audio and video buffer timestamps.",
      "Database merge-join operations scanning two sorted index segments simultaneously in O(N + M)."
    ],
    "commonMistakes": [
      "Applying converging two-pointer sum logic to unsorted arrays without sorting them first.",
      "Failing to skip duplicate values in 3Sum, producing duplicate triplets in interview results.",
      "Infinite while-loops caused by missing left++ or right-- inside conditional branches."
    ],
    "interviewRelevance": "3Sum, 4Sum, Container With Most Water, Trapping Rain Water, and Move Zeroes are among the top 10 most frequently asked interview problems at FAANG companies.",
    "checkpoints": [
      {
        "id": "java-77-cp1",
        "label": "Implement converging two pointers on sorted arrays for O(N) pair finding"
      },
      {
        "id": "java-77-cp2",
        "label": "Use slow/fast read-write pointers for in-place array transformations"
      },
      {
        "id": "java-77-cp3",
        "label": "Solve 3Sum in O(N^2) time while properly deduplicating elements"
      }
    ],
    "practiceExercises": [
      {
        "id": "java-77-ex1",
        "title": "Reverse String In-Place",
        "difficulty": "Beginner",
        "type": "coding",
        "prompt": "Write a function that reverses a char[] array in-place with O(1) extra memory using two pointers.",
        "starterCode": "public class ReverseString {\n    public static void reverseString(char[] s) {\n        // In-place reversal\n    }\n}",
        "solution": "public class ReverseString {\n    public static void reverseString(char[] s) {\n        int left = 0, right = s.length - 1;\n        while (left < right) {\n            char temp = s[left];\n            s[left] = s[right];\n            s[right] = temp;\n            left++;\n            right--;\n        }\n    }\n}",
        "explanation": "Swapping characters at left and right pointers while moving them toward the center reverses the array in O(N) time and O(1) space."
      },
      {
        "id": "java-77-ex2",
        "title": "3Sum Problem",
        "difficulty": "Intermediate",
        "type": "coding",
        "prompt": "Given an integer array nums, return all triplets [nums[i], nums[j], nums[k]] such that i != j != k and nums[i] + nums[j] + nums[k] == 0. The solution set must not contain duplicate triplets.",
        "starterCode": "import java.util.*;\n\npublic class ThreeSum {\n    public static List<List<Integer>> threeSum(int[] nums) {\n        return new ArrayList<>();\n    }\n}",
        "solution": "import java.util.*;\n\npublic class ThreeSum {\n    public static List<List<Integer>> threeSum(int[] nums) {\n        Arrays.sort(nums);\n        List<List<Integer>> result = new ArrayList<>();\n\n        for (int i = 0; i < nums.length - 2; i++) {\n            if (i > 0 && nums[i] == nums[i - 1]) continue; // Skip duplicate i\n\n            int left = i + 1, right = nums.length - 1;\n            while (left < right) {\n                int sum = nums[i] + nums[left] + nums[right];\n                if (sum == 0) {\n                    result.add(Arrays.asList(nums[i], nums[left], nums[right]));\n                    while (left < right && nums[left] == nums[left + 1]) left++;\n                    while (left < right && nums[right] == nums[right - 1]) right--;\n                    left++;\n                    right--;\n                } else if (sum < 0) {\n                    left++;\n                } else {\n                    right--;\n                }\n            }\n        }\n\n        return result;\n    }\n}",
        "explanation": "Sorting takes O(N log N). Iterating with an outer loop and two-pointer inner scan takes O(N^2). Skipping identical neighbors avoids generating duplicate triplets."
      },
      {
        "id": "java-77-ex3",
        "title": "Trapping Rain Water (Two Pointers)",
        "difficulty": "Advanced",
        "type": "coding",
        "prompt": "Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining using O(1) extra space.",
        "starterCode": "public class TrappingRainWater {\n    public static int trap(int[] height) {\n        return 0;\n    }\n}",
        "solution": "public class TrappingRainWater {\n    public static int trap(int[] height) {\n        if (height == null || height.length == 0) return 0;\n\n        int left = 0, right = height.length - 1;\n        int leftMax = 0, rightMax = 0;\n        int totalWater = 0;\n\n        while (left < right) {\n            if (height[left] < height[right]) {\n                if (height[left] >= leftMax) {\n                    leftMax = height[left];\n                } else {\n                    totalWater += leftMax - height[left];\n                }\n                left++;\n            } else {\n                if (height[right] >= rightMax) {\n                    rightMax = height[right];\n                } else {\n                    totalWater += rightMax - height[right];\n                }\n                right--;\n            }\n        }\n\n        return totalWater;\n    }\n}",
        "explanation": "Water trapped at index i is determined by min(leftMax, rightMax) - height[i]. Since height[left] < height[right], leftMax is guaranteed to be the limiting boundary, allowing immediate calculation in O(1) auxiliary space."
      }
    ],
    "quizQuestions": [
      {
        "id": "java-77-q1",
        "question": "In the Container With Most Water problem, why do we always move the pointer pointing to the shorter vertical line?",
        "options": [
          "Because moving the taller line can never produce a larger area than the current one",
          "Because the shorter line is always closer to the center",
          "Because the array is guaranteed to be sorted",
          "Because moving the taller line throws an exception"
        ],
        "correctOptionIndex": 0,
        "explanation": "Area is limited by the shorter line: min(h1, h2) * width. Moving the taller line decreases width while the height cannot exceed the existing short line, making an increased area mathematically impossible."
      },
      {
        "id": "java-77-q2",
        "question": "What is the auxiliary space complexity of solving Trapping Rain Water using the converging two-pointer technique?",
        "options": [
          "O(N)",
          "O(log N)",
          "O(1)",
          "O(N^2)"
        ],
        "correctOptionIndex": 2,
        "explanation": "Unlike dynamic programming solutions requiring two O(N) prefix/suffix max arrays, the two-pointer approach maintains only running leftMax and rightMax variables in O(1) space."
      }
    ],
    "revisionNotes": [
      "Two pointers reduce O(N^2) pair searches to O(N) on sorted arrays.",
      "In-place array modifications (e.g. Remove Duplicates) rely on slow/fast read/write pointers.",
      "Deduplication in 3Sum requires skipping identical consecutive elements for both the outer and inner pointers."
    ],
    "moduleId": "java-m6",
    "moduleNumber": 6,
    "moduleTitle": "Java Problem Solving",
    "language": "java"
  },
  {
    "id": "java-78-sliding-window",
    "topicNumber": 78,
    "title": "Sliding Window Patterns: Fixed Size & Dynamic Expanding Windows",
    "level": "Intermediate",
    "whyItMatters": "Sliding window avoids recomputing shared subarray overlap. Instead of recalculating sums or character frequencies across N windows in O(N * K), the window updates boundary states in O(1) per step, yielding overall O(N) runtime.",
    "explanation": "1. Fixed-Size Sliding Window (Length K):\n- Compute the initial state for the first window of size K: [0..K-1].\n- Slide the window from left to right one step at a time:\n  - Add incoming element nums[i].\n  - Remove outgoing element nums[i - K].\n- Compare and update global metric in O(1) per step.\n\n2. Dynamically Expanding / Contracting Window:\n- Used when seeking longest or shortest valid contiguous subarray/substring.\n- Template:\n  1. Expand: Advance the right pointer, including s.charAt(right) in state (map, set, or count array).\n  2. Validate / Shrink: While the window violates the required condition (e.g., repeating character found or sum >= target), advance the left pointer and remove s.charAt(left) from state.\n  3. Record: Update the answer (e.g., maxLen = Math.max(maxLen, right - left + 1)).\n\n3. Optimized Last-Seen Lookup:\nInstead of shrinking left one by one with a while-loop, store the last-seen index of each character in an int[128] array or Map<Character, Integer>. When a duplicate is seen, jump left directly: left = Math.max(left, lastSeen[c] + 1).",
    "syntaxAndStructure": "// Dynamic sliding window template:\nint left = 0;\nfor (int right = 0; right < s.length(); right++) {\n    // 1. expand window with s.charAt(right)\n    while (/* condition invalid */) {\n        // 2. shrink window with s.charAt(left)\n        left++;\n    }\n    // 3. update answer with window size (right - left + 1)\n}",
    "codeExamples": [
      {
        "title": "Longest Substring Without Repeating Characters in O(N)",
        "code": "import java.util.Arrays;\n\npublic class LongestSubstringDemo {\n    public static int lengthOfLongestSubstring(String s) {\n        int[] lastIndex = new int[128];\n        Arrays.fill(lastIndex, -1); // -1 indicates char has not been seen\n\n        int maxLen = 0;\n        int left = 0;\n\n        for (int right = 0; right < s.length(); right++) {\n            char c = s.charAt(right);\n\n            // If character was seen inside the current window, jump left pointer\n            if (lastIndex[c] >= left) {\n                left = lastIndex[c] + 1;\n            }\n\n            lastIndex[c] = right;\n            maxLen = Math.max(maxLen, right - left + 1);\n        }\n\n        return maxLen;\n    }\n\n    public static void main(String[] args) {\n        String s = \"abcabcbb\";\n        System.out.println(\"Longest unique substring length: \" + lengthOfLongestSubstring(s));\n    }\n}",
        "expectedOutput": "Longest unique substring length: 3",
        "explanation": "Using an int[128] direct-indexed ASCII table allows jumping the left pointer directly past the previous occurrence of c without an inner shrinking loop. Resulting time complexity is strictly O(N) and space is O(1) auxiliary."
      },
      {
        "title": "Minimum Size Subarray Sum (Target >= K)",
        "code": "public class MinSubArrayLenDemo {\n    public static int minSubArrayLen(int target, int[] nums) {\n        int left = 0;\n        int currentSum = 0;\n        int minLen = Integer.MAX_VALUE;\n\n        for (int right = 0; right < nums.length; right++) {\n            currentSum += nums[right];\n\n            // Shrink window while sum meets or exceeds target\n            while (currentSum >= target) {\n                minLen = Math.min(minLen, right - left + 1);\n                currentSum -= nums[left];\n                left++;\n            }\n        }\n\n        return minLen == Integer.MAX_VALUE ? 0 : minLen;\n    }\n\n    public static void main(String[] args) {\n        int[] nums = {2, 3, 1, 2, 4, 3};\n        System.out.println(\"Min length for sum >= 7: \" + minSubArrayLen(7, nums));\n    }\n}",
        "expectedOutput": "Min length for sum >= 7: 2",
        "explanation": "The subarray [4, 3] has sum 7 with length 2. Each element is added once and subtracted once, giving 2N operations = O(N) time and O(1) space."
      }
    ],
    "realWorldApplications": [
      "Rate limiters (Sliding Window Log / Counter) tracking user API requests within a 60-second window.",
      "Network packet monitoring calculating rolling bandwidth throughput across a continuous stream."
    ],
    "commonMistakes": [
      "Forgetting Math.max(left, lastSeen[c] + 1) when jumping left: if lastSeen was before the current left boundary, left must NOT move backward!",
      "Assuming the inner while-loop makes the algorithm O(N^2): because left only moves forward and never resets, each index is visited at most twice (O(N) amortized).",
      "Off-by-one errors calculating window size: the number of elements between indices left and right inclusive is right - left + 1."
    ],
    "interviewRelevance": "Longest Substring Without Repeating Characters, Minimum Window Substring, and Fruit Into Baskets are core LeetCode Medium/Hard favorites asked in almost every technical screen.",
    "checkpoints": [
      {
        "id": "java-78-cp1",
        "label": "Implement fixed-size sliding windows updating state in O(1) per step"
      },
      {
        "id": "java-78-cp2",
        "label": "Implement dynamic expanding/contracting windows for shortest and longest subarray problems"
      },
      {
        "id": "java-78-cp3",
        "label": "Use primitive int[128] last-seen arrays to jump left pointer in O(1)"
      }
    ],
    "practiceExercises": [
      {
        "id": "java-78-ex1",
        "title": "Maximum Average Subarray I",
        "difficulty": "Beginner",
        "type": "coding",
        "prompt": "Given an integer array nums consisting of n elements, and an integer k, find a contiguous subarray whose length is equal to k that has the maximum average value.",
        "starterCode": "public class MaxAverageSubarray {\n    public static double findMaxAverage(int[] nums, int k) {\n        return 0.0;\n    }\n}",
        "solution": "public class MaxAverageSubarray {\n    public static double findMaxAverage(int[] nums, int k) {\n        long currentSum = 0;\n        for (int i = 0; i < k; i++) {\n            currentSum += nums[i];\n        }\n\n        long maxSum = currentSum;\n\n        for (int i = k; i < nums.length; i++) {\n            currentSum += nums[i] - nums[i - k];\n            maxSum = Math.max(maxSum, currentSum);\n        }\n\n        return (double) maxSum / k;\n    }\n}",
        "explanation": "Initialize window sum with first k elements. Then slide by adding nums[i] and removing nums[i - k] in O(N) total time."
      },
      {
        "id": "java-78-ex2",
        "title": "Max Consecutive Ones III",
        "difficulty": "Intermediate",
        "type": "coding",
        "prompt": "Given a binary array nums and an integer k, return the maximum number of consecutive 1s in the array if you can flip at most k 0s.",
        "starterCode": "public class MaxConsecutiveOnes {\n    public static int longestOnes(int[] nums, int k) {\n        return 0;\n    }\n}",
        "solution": "public class MaxConsecutiveOnes {\n    public static int longestOnes(int[] nums, int k) {\n        int left = 0, zeroCount = 0, maxLen = 0;\n\n        for (int right = 0; right < nums.length; right++) {\n            if (nums[right] == 0) {\n                zeroCount++;\n            }\n\n            while (zeroCount > k) {\n                if (nums[left] == 0) {\n                    zeroCount--;\n                }\n                left++;\n            }\n\n            maxLen = Math.max(maxLen, right - left + 1);\n        }\n\n        return maxLen;\n    }\n}",
        "explanation": "Dynamic sliding window where the window is valid as long as zeroCount <= k. When zeroCount > k, shrink from left until zeroCount <= k."
      },
      {
        "id": "java-78-ex3",
        "title": "Minimum Window Substring",
        "difficulty": "Advanced",
        "type": "coding",
        "prompt": "Given two strings s and t of lengths m and n, return the minimum window substring of s such that every character in t (including duplicates) is included in the window. Return \"\" if no such window exists.",
        "starterCode": "public class MinWindowSubstring {\n    public static String minWindow(String s, String t) {\n        return \"\";\n    }\n}",
        "solution": "public class MinWindowSubstring {\n    public static String minWindow(String s, String t) {\n        if (s.length() < t.length()) return \"\";\n\n        int[] targetCounts = new int[128];\n        for (char c : t.toCharArray()) targetCounts[c]++;\n\n        int[] windowCounts = new int[128];\n        int required = 0;\n        for (int count : targetCounts) if (count > 0) required++;\n\n        int formed = 0;\n        int left = 0, minLen = Integer.MAX_VALUE, startIdx = 0;\n\n        for (int right = 0; right < s.length(); right++) {\n            char c = s.charAt(right);\n            windowCounts[c]++;\n\n            if (targetCounts[c] > 0 && windowCounts[c] == targetCounts[c]) {\n                formed++;\n            }\n\n            while (left <= right && formed == required) {\n                if (right - left + 1 < minLen) {\n                    minLen = right - left + 1;\n                    startIdx = left;\n                }\n\n                char leftChar = s.charAt(left);\n                windowCounts[leftChar]--;\n                if (targetCounts[leftChar] > 0 && windowCounts[leftChar] < targetCounts[leftChar]) {\n                    formed--;\n                }\n                left++;\n            }\n        }\n\n        return minLen == Integer.MAX_VALUE ? \"\" : s.substring(startIdx, startIdx + minLen);\n    }\n}",
        "explanation": "Maintain count of matched distinct characters. Once all characters in t are matched (formed == required), contract the left edge to find the minimal enclosing window in O(S + T) time."
      }
    ],
    "quizQuestions": [
      {
        "id": "java-78-q1",
        "question": "Why does an expanding/contracting sliding window algorithm have O(N) time complexity despite having a nested while-loop?",
        "options": [
          "Because the while loop only runs if N is prime",
          "Because the right pointer advances N times and the left pointer advances at most N times across the entire algorithm execution",
          "Because Java optimizes while loops using SIMD instructions",
          "Because the inner loop breaks immediately on the first iteration"
        ],
        "correctOptionIndex": 1,
        "explanation": "Both left and right pointers strictly move from 0 to N. Since neither pointer ever moves backward, total pointer steps are at most 2N = O(N) amortized."
      },
      {
        "id": "java-78-q2",
        "question": "What is the formula for the number of elements in a window bounded by indices [left, right] inclusive?",
        "options": [
          "right - left",
          "right - left + 1",
          "right - left - 1",
          "(right + left) / 2"
        ],
        "correctOptionIndex": 1,
        "explanation": "For 0-indexed inclusive bounds [left, right], the length is right - left + 1 (e.g., indices 2 to 4 hold elements 2, 3, 4 = length 3)."
      }
    ],
    "revisionNotes": [
      "Fixed-size sliding windows add the new element and remove the trailing element in O(1).",
      "Dynamic sliding windows expand right until invalid, then shrink left until valid.",
      "Sliding window runs in amortized O(N) time because each element is visited at most twice (by right then left)."
    ],
    "moduleId": "java-m6",
    "moduleNumber": 6,
    "moduleTitle": "Java Problem Solving",
    "language": "java"
  },
  {
    "id": "java-79-binary-search",
    "topicNumber": 79,
    "title": "Binary Search & Variants (Lower/Upper Bound & Search Space Reduction)",
    "level": "Intermediate",
    "whyItMatters": "Binary Search reduces search spaces from O(N) to O(log N). Beyond sorted arrays, Binary Search on Answer optimizes complex feasibility problems (e.g., Koko eating bananas, capacity allocation, split array largest sum).",
    "explanation": "1. Avoiding Integer Overflow:\nNever write mid = (low + high) / 2 because low + high can exceed Integer.MAX_VALUE (2,147,483,647), causing integer overflow into negative values!\nAlways use: int mid = low + (high - low) / 2; or unsigned shift: int mid = (low + high) >>> 1;\n\n2. Lower Bound vs Upper Bound:\n- Lower Bound: First index where arr[i] >= target.\n  - if (arr[mid] >= target) high = mid; else low = mid + 1;\n- Upper Bound: First index where arr[i] > target.\n  - if (arr[mid] > target) high = mid; else low = mid + 1;\n\n3. Binary Search on Answer (Search Space Reduction):\nWhen asked to find the minimum possible maximum (or maximum possible minimum) value X:\n- If a candidate value X is feasible, can smaller (or larger) values also be feasible? (Monotonic predicate).\n- Define search range [low, high] over the possible answer space.\n- In each iteration, test feasibility with a greedy helper function canAchieve(mid).\n- If canAchieve(mid) is true, try better answers: high = mid; else low = mid + 1.\n- Runs in O(N * log(Range)) time.",
    "syntaxAndStructure": "// Lower bound binary search template:\nint low = 0, high = n;\nwhile (low < high) {\n    int mid = low + (high - low) / 2;\n    if (predicate(mid)) high = mid;\n    else low = mid + 1;\n}\nreturn low;",
    "codeExamples": [
      {
        "title": "Safe Binary Search with Lower Bound Implementation",
        "code": "public class BinarySearchVariants {\n    // Returns first index where arr[index] >= target\n    public static int lowerBound(int[] arr, int target) {\n        int low = 0, high = arr.length;\n        while (low < high) {\n            int mid = low + (high - low) / 2; // Prevents overflow\n            if (arr[mid] >= target) {\n                high = mid; // Search left half including mid\n            } else {\n                low = mid + 1; // Discard left half\n            }\n        }\n        return low;\n    }\n\n    public static void main(String[] args) {\n        int[] arr = {1, 3, 3, 5, 7, 8, 8, 10};\n        System.out.println(\"Lower bound of 3: index \" + lowerBound(arr, 3));\n        System.out.println(\"Lower bound of 4: index \" + lowerBound(arr, 4));\n        System.out.println(\"Lower bound of 8: index \" + lowerBound(arr, 8));\n    }\n}",
        "expectedOutput": "Lower bound of 3: index 1\nLower bound of 4: index 3\nLower bound of 8: index 5",
        "explanation": "Lower bound returns the index of the first element >= target. If target is absent, it returns the insertion point where it could be inserted to maintain sorted order."
      },
      {
        "title": "Search in Rotated Sorted Array in O(log N)",
        "code": "public class RotatedSortedSearch {\n    public static int search(int[] nums, int target) {\n        int low = 0, high = nums.length - 1;\n\n        while (low <= high) {\n            int mid = low + (high - low) / 2;\n            if (nums[mid] == target) return mid;\n\n            // Determine which half is sorted\n            if (nums[low] <= nums[mid]) {\n                // Left half is normally sorted\n                if (target >= nums[low] && target < nums[mid]) {\n                    high = mid - 1;\n                } else {\n                    low = mid + 1;\n                }\n            } else {\n                // Right half is sorted\n                if (target > nums[mid] && target <= nums[high]) {\n                    low = mid + 1;\n                } else {\n                    high = mid - 1;\n                }\n            }\n        }\n\n        return -1;\n    }\n\n    public static void main(String[] args) {\n        int[] rotated = {4, 5, 6, 7, 0, 1, 2};\n        System.out.println(\"Index of 0: \" + search(rotated, 0));\n        System.out.println(\"Index of 3: \" + search(rotated, 3));\n    }\n}",
        "expectedOutput": "Index of 0: 4\nIndex of 3: -1",
        "explanation": "In a rotated sorted array, at least one half [low..mid] or [mid..high] is always sorted. Checking if target falls within the sorted segment allows discarding half the elements each step."
      }
    ],
    "realWorldApplications": [
      "Database B+ Tree internal node routing during range scans and point queries.",
      "Git bisect tool running binary search over commit history to pinpoint the commit that introduced a regression bug."
    ],
    "commonMistakes": [
      "Using mid = (low + high) / 2 leading to integer overflow and negative index exceptions on arrays with >= 1 billion elements.",
      "Infinite loops caused by inconsistent boundary updates: mixing low <= high with high = mid instead of high = mid - 1.",
      "Assuming binary search only works on sorted arrays: binary search applies to any monotonic boolean function f(x)."
    ],
    "interviewRelevance": "Search in Rotated Sorted Array, Find Peak Element, Median of Two Sorted Arrays, and Koko Eating Bananas are flagship interview challenges across Google, Meta, and Microsoft.",
    "checkpoints": [
      {
        "id": "java-79-cp1",
        "label": "Prevent integer overflow using low + (high - low) / 2 or >>> 1"
      },
      {
        "id": "java-79-cp2",
        "label": "Implement lower_bound and upper_bound without off-by-one errors"
      },
      {
        "id": "java-79-cp3",
        "label": "Apply Binary Search on Answer to optimization problems with monotonic predicates"
      }
    ],
    "practiceExercises": [
      {
        "id": "java-79-ex1",
        "title": "Binary Search (Classic)",
        "difficulty": "Beginner",
        "type": "coding",
        "prompt": "Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to search target in nums. If target exists, return its index. Otherwise, return -1.",
        "starterCode": "public class ClassicBinarySearch {\n    public static int search(int[] nums, int target) {\n        return -1;\n    }\n}",
        "solution": "public class ClassicBinarySearch {\n    public static int search(int[] nums, int target) {\n        int low = 0, high = nums.length - 1;\n        while (low <= high) {\n            int mid = low + (high - low) / 2;\n            if (nums[mid] == target) return mid;\n            else if (nums[mid] < target) low = mid + 1;\n            else high = mid - 1;\n        }\n        return -1;\n    }\n}",
        "explanation": "Standard binary search cuts range in half each step, guaranteeing O(log N) time and O(1) space."
      },
      {
        "id": "java-79-ex2",
        "title": "Find First and Last Position of Element in Sorted Array",
        "difficulty": "Intermediate",
        "type": "coding",
        "prompt": "Given an array of integers nums sorted in non-decreasing order, find the starting and ending position of a given target value in O(log N) time. If target is not found, return [-1, -1].",
        "starterCode": "public class SearchRange {\n    public static int[] searchRange(int[] nums, int target) {\n        return new int[]{-1, -1};\n    }\n}",
        "solution": "public class SearchRange {\n    public static int[] searchRange(int[] nums, int target) {\n        int first = findBound(nums, target, true);\n        if (first == -1) return new int[]{-1, -1};\n        int last = findBound(nums, target, false);\n        return new int[]{first, last};\n    }\n\n    private static int findBound(int[] nums, int target, boolean isFirst) {\n        int low = 0, high = nums.length - 1;\n        int bound = -1;\n\n        while (low <= high) {\n            int mid = low + (high - low) / 2;\n            if (nums[mid] == target) {\n                bound = mid;\n                if (isFirst) high = mid - 1; // Continue searching left\n                else low = mid + 1;          // Continue searching right\n            } else if (nums[mid] < target) {\n                low = mid + 1;\n            } else {\n                high = mid - 1;\n            }\n        }\n\n        return bound;\n    }\n}",
        "explanation": "Two binary searches: one biasing left to find the first position, the other biasing right to find the last position. Both run in O(log N)."
      },
      {
        "id": "java-79-ex3",
        "title": "Koko Eating Bananas (Binary Search on Answer)",
        "difficulty": "Advanced",
        "type": "coding",
        "prompt": "Koko loves bananas. There are n piles of bananas, the ith pile has piles[i] bananas. The guards will come back in h hours. Return the minimum integer speed k such that she can eat all the bananas within h hours.",
        "starterCode": "public class KokoEatingBananas {\n    public static int minEatingSpeed(int[] piles, int h) {\n        return 0;\n    }\n}",
        "solution": "public class KokoEatingBananas {\n    public static int minEatingSpeed(int[] piles, int h) {\n        int low = 1;\n        int high = 1;\n        for (int p : piles) {\n            high = Math.max(high, p);\n        }\n\n        while (low < high) {\n            int speed = low + (high - low) / 2;\n            if (canFinish(piles, speed, h)) {\n                high = speed; // Try smaller speed\n            } else {\n                low = speed + 1; // Must eat faster\n            }\n        }\n\n        return low;\n    }\n\n    private static boolean canFinish(int[] piles, int speed, int h) {\n        long totalHours = 0;\n        for (int p : piles) {\n            totalHours += (p + speed - 1) / speed; // Ceiling division\n        }\n        return totalHours <= h;\n    }\n}",
        "explanation": "Search space is [1..max(piles)]. Feasibility is monotonic: if speed K works, all speeds > K also work. Binary search on answer solves this in O(N log(max_pile)) time."
      }
    ],
    "quizQuestions": [
      {
        "id": "java-79-q1",
        "question": "Why is `int mid = low + (high - low) / 2;` safer than `int mid = (low + high) / 2;` in Java?",
        "options": [
          "Because the division operator behaves differently on negative numbers",
          "Because (low + high) can exceed Integer.MAX_VALUE and wrap around to a negative number, resulting in ArrayIndexOutOfBoundsException",
          "Because (high - low) is calculated at compile time by the JIT compiler",
          "Because low + (high - low) / 2 uses floating-point precision internally"
        ],
        "correctOptionIndex": 1,
        "explanation": "When low and high are large (e.g. > 1 billion), low + high exceeds 2^31 - 1, producing negative 32-bit values. low + (high - low) / 2 guarantees intermediate results remain non-negative."
      },
      {
        "id": "java-79-q2",
        "question": "When can \"Binary Search on Answer\" be applied to an optimization problem?",
        "options": [
          "Only when the input array is already sorted",
          "Whenever the answer space is discrete and the feasibility function canAchieve(x) is monotonic (all false then all true, or vice versa)",
          "Only when the input contains fewer than 1,000 elements",
          "Whenever the problem can be solved in O(1) time"
        ],
        "correctOptionIndex": 1,
        "explanation": "Binary search on answer requires monotonicity: there exists a threshold where all values on one side are infeasible and all values on the other are feasible."
      }
    ],
    "revisionNotes": [
      "Always calculate mid safely: low + (high - low) / 2 or (low + high) >>> 1.",
      "Lower bound finds the first index >= target; upper bound finds the first index > target.",
      "Binary search on answer solves min-max optimization problems when the predicate function is monotonic."
    ],
    "moduleId": "java-m6",
    "moduleNumber": 6,
    "moduleTitle": "Java Problem Solving",
    "language": "java"
  },
  {
    "id": "java-80-sorting-comparators",
    "topicNumber": 80,
    "title": "Sorting Patterns, Dual-Pivot Quicksort & Custom Comparators",
    "level": "Intermediate",
    "whyItMatters": "Sorting is the precursor to greedy algorithms, interval scheduling, and search optimization. Understanding TimSort vs Dual-Pivot Quicksort and mastering Comparator chaining produces clean, bug-free, high-performance code.",
    "explanation": "1. Java Sorting Algorithms Under the Hood:\n- Arrays.sort(int[]): Vladimir Yaroslavskiy's Dual-Pivot Quicksort. Average O(N log N), space O(log N). Not stable, but cache-optimal for primitives.\n- Arrays.sort(Object[]) & Collections.sort(List<T>): Tim Peters' TimSort (hybrid merge sort + insertion sort). Guaranteed worst-case O(N log N), stable, space O(N). Takes advantage of existing partial ordering (runs).\n\n2. The Strict Weak Ordering Contract:\nCustom comparators must satisfy mathematical strict weak ordering:\n- Irreflexive: compare(x, x) == 0\n- Antisymmetric: sgn(compare(x, y)) == -sgn(compare(y, x))\n- Transitive: if compare(x, y) > 0 and compare(y, z) > 0, then compare(x, z) > 0.\n- Pitfall: Never write (a, b) -> a - b because if a is positive and b is negative (e.g., Integer.MAX_VALUE - (-1)), subtraction overflows! Always use Integer.compare(a, b).\n\n3. Interval Merging Pattern:\n- Sort intervals by start time: Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0])).\n- Iterate through sorted intervals: if current interval overlaps with previous (curr.start <= prev.end), merge them: prev.end = Math.max(prev.end, curr.end); otherwise start a new interval.",
    "syntaxAndStructure": "// Chaining comparators cleanly:\nComparator<Person> cmp = Comparator.comparing(Person::getLastName)\n    .thenComparing(Person::getFirstName)\n    .thenComparingInt(Person::getAge);",
    "codeExamples": [
      {
        "title": "Multi-Key Sorting with Comparator Factory Methods",
        "code": "import java.util.*;\n\npublic class ComparatorDemo {\n    static class Employee {\n        String dept;\n        String name;\n        int salary;\n\n        Employee(String dept, String name, int salary) {\n            this.dept = dept;\n            this.name = name;\n            this.salary = salary;\n        }\n\n        @Override\n        public String toString() {\n            return String.format(\"%s - %s ($%d)\", dept, name, salary);\n        }\n    }\n\n    public static void main(String[] args) {\n        List<Employee> staff = Arrays.asList(\n            new Employee(\"Engineering\", \"Alice\", 120000),\n            new Employee(\"Engineering\", \"Bob\", 140000),\n            new Employee(\"Engineering\", \"Charlie\", 120000),\n            new Employee(\"Marketing\", \"Diana\", 95000),\n            new Employee(\"Marketing\", \"Evan\", 110000)\n        );\n\n        // Sort by Department asc, then Salary desc, then Name asc\n        staff.sort(\n            Comparator.comparing((Employee e) -> e.dept)\n                .thenComparing(Comparator.comparingInt((Employee e) -> e.salary).reversed())\n                .thenComparing(e -> e.name)\n        );\n\n        staff.forEach(System.out::println);\n    }\n}",
        "expectedOutput": "Engineering - Bob ($140000)\nEngineering - Alice ($120000)\nEngineering - Charlie ($120000)\nMarketing - Evan ($110000)\nMarketing - Diana ($95000)",
        "explanation": "Comparator.comparing() combined with .thenComparing() and .reversed() provides readable, type-safe multi-criteria sorting without manual if-else branches."
      },
      {
        "title": "Merge Overlapping Intervals in O(N log N)",
        "code": "import java.util.*;\n\npublic class MergeIntervalsDemo {\n    public static int[][] merge(int[][] intervals) {\n        if (intervals.length <= 1) return intervals;\n\n        // Sort by start time\n        Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));\n\n        List<int[]> merged = new ArrayList<>();\n        int[] current = intervals[0];\n        merged.add(current);\n\n        for (int i = 1; i < intervals.length; i++) {\n            int[] next = intervals[i];\n            if (next[0] <= current[1]) {\n                // Overlap: extend end time\n                current[1] = Math.max(current[1], next[1]);\n            } else {\n                // Disjoint: start new interval\n                current = next;\n                merged.add(current);\n            }\n        }\n\n        return merged.toArray(new int[merged.size()][]);\n    }\n\n    public static void main(String[] args) {\n        int[][] intervals = {{1, 3}, {2, 6}, {8, 10}, {15, 18}};\n        int[][] res = merge(intervals);\n        System.out.println(\"Merged: \" + Arrays.deepToString(res));\n    }\n}",
        "expectedOutput": "Merged: [[1, 6], [8, 10], [15, 18]]",
        "explanation": "Sorting ensures intervals are processed in chronological order. Checking next[0] <= current[1] detects overlaps in a single O(N) sweep after O(N log N) sorting."
      }
    ],
    "realWorldApplications": [
      "Calendar and meeting room schedulers finding conference room conflicts and available booking slots.",
      "Log aggregators merging distributed server trace logs in timestamp order across multiple microservices."
    ],
    "commonMistakes": [
      "Using (a, b) -> a - b for sorting: if a = Integer.MIN_VALUE and b = 1, subtraction underflows to positive, violating transitivity and throwing IllegalArgumentException: Comparison method violates its general contract!",
      "Assuming primitive sorting is stable: Arrays.sort(int[]) uses Dual-Pivot Quicksort, which is NOT stable (though stability is irrelevant for primitives, it matters for objects).",
      "Forgetting Math.max(current[1], next[1]) when merging intervals: next interval might be completely nested inside current interval."
    ],
    "interviewRelevance": "Merge Intervals, Non-overlapping Intervals, Meeting Rooms II, and Largest Number are tested in technical rounds at Uber, Lyft, Google, and Amazon.",
    "checkpoints": [
      {
        "id": "java-80-cp1",
        "label": "Explain differences between Dual-Pivot Quicksort (primitives) and TimSort (objects)"
      },
      {
        "id": "java-80-cp2",
        "label": "Construct robust custom Comparators using Integer.compare and comparator chains"
      },
      {
        "id": "java-80-cp3",
        "label": "Solve interval scheduling and overlap problems in O(N log N)"
      }
    ],
    "practiceExercises": [
      {
        "id": "java-80-ex1",
        "title": "Sort Strings by Length then Alphabetically",
        "difficulty": "Beginner",
        "type": "coding",
        "prompt": "Given a list of strings, sort them in ascending order primarily by string length, and secondarily alphabetically.",
        "starterCode": "import java.util.*;\n\npublic class StringSorter {\n    public static void sortStrings(List<String> list) {\n        // Sort in-place\n    }\n}",
        "solution": "import java.util.*;\n\npublic class StringSorter {\n    public static void sortStrings(List<String> list) {\n        list.sort(\n            Comparator.comparingInt(String::length)\n                .thenComparing(Comparator.naturalOrder())\n        );\n    }\n}",
        "explanation": "Comparator.comparingInt(String::length).thenComparing(Comparator.naturalOrder()) orders by length first, breaking ties lexicographically."
      },
      {
        "id": "java-80-ex2",
        "title": "Non-Overlapping Intervals (Interval Scheduling)",
        "difficulty": "Intermediate",
        "type": "coding",
        "prompt": "Given an array of intervals intervals where intervals[i] = [start, end], return the minimum number of intervals you need to remove to make the rest non-overlapping.",
        "starterCode": "public class NonOverlapping {\n    public static int eraseOverlapIntervals(int[][] intervals) {\n        return 0;\n    }\n}",
        "solution": "import java.util.*;\n\npublic class NonOverlapping {\n    public static int eraseOverlapIntervals(int[][] intervals) {\n        if (intervals.length == 0) return 0;\n\n        // Greedy: sort by END time\n        Arrays.sort(intervals, (a, b) -> Integer.compare(a[1], b[1]));\n\n        int countKept = 1;\n        int prevEnd = intervals[0][1];\n\n        for (int i = 1; i < intervals.length; i++) {\n            if (intervals[i][0] >= prevEnd) {\n                countKept++;\n                prevEnd = intervals[i][1];\n            }\n        }\n\n        return intervals.length - countKept;\n    }\n}",
        "explanation": "Sorting intervals by finish time leaves maximum room for future non-overlapping intervals (classic greedy interval scheduling algorithm). Total removals = total - kept."
      },
      {
        "id": "java-80-ex3",
        "title": "Largest Number",
        "difficulty": "Advanced",
        "type": "coding",
        "prompt": "Given a list of non-negative integers nums, arrange them such that they form the largest number and return it as a string.",
        "starterCode": "public class LargestNumberFinder {\n    public static String largestNumber(int[] nums) {\n        return \"\";\n    }\n}",
        "solution": "import java.util.*;\n\npublic class LargestNumberFinder {\n    public static String largestNumber(int[] nums) {\n        String[] sNums = new String[nums.length];\n        for (int i = 0; i < nums.length; i++) {\n            sNums[i] = String.valueOf(nums[i]);\n        }\n\n        // Custom comparator: compare (b + a) with (a + b)\n        Arrays.sort(sNums, (a, b) -> (b + a).compareTo(a + b));\n\n        // Edge case: all zeros [0, 0]\n        if (sNums[0].equals(\"0\")) {\n            return \"0\";\n        }\n\n        StringBuilder sb = new StringBuilder();\n        for (String s : sNums) {\n            sb.append(s);\n        }\n        return sb.toString();\n    }\n}",
        "explanation": "Sorting strings by comparing (b + a).compareTo(a + b) ensures that greedy concatenation produces the maximum possible number. Leading zeros are handled by checking if sNums[0].equals(\"0\")."
      }
    ],
    "quizQuestions": [
      {
        "id": "java-80-q1",
        "question": "Why does Java throw `IllegalArgumentException: Comparison method violates its general contract` when using `(a, b) -> a - b`?",
        "options": [
          "Because Java requires all comparators to implement Serializable",
          "Because integer overflow occurs when subtracting a negative number from a positive number, violating transitivity",
          "Because subtraction is not allowed in lambda expressions",
          "Because modern Java only accepts method references in sort()"
        ],
        "correctOptionIndex": 1,
        "explanation": "If a = 1,000,000,000 and b = -1,500,000,000, a - b = 2,500,000,000 which overflows to negative, reporting a < b falsely. TimSort detects this violation of strict weak ordering and throws an exception."
      },
      {
        "id": "java-80-q2",
        "question": "Which sorting algorithm is used by Collections.sort() and Arrays.sort(Object[]) in Java?",
        "options": [
          "Quicksort",
          "Heapsort",
          "TimSort (hybrid Merge Sort + Insertion Sort)",
          "Bubble Sort"
        ],
        "correctOptionIndex": 2,
        "explanation": "TimSort is used for objects because it is guaranteed O(N log N) worst-case, requires O(N) auxiliary space, and is strictly stable (preserves relative order of equal keys)."
      }
    ],
    "revisionNotes": [
      "Arrays.sort(primitive[]) uses Dual-Pivot Quicksort; Arrays.sort(Object[]) uses TimSort.",
      "Never subtract integers in comparators; always use Integer.compare(a, b).",
      "Interval scheduling greedily sorts by end time to maximize non-overlapping intervals."
    ],
    "moduleId": "java-m6",
    "moduleNumber": 6,
    "moduleTitle": "Java Problem Solving",
    "language": "java"
  },
  {
    "id": "java-81-recursion-backtracking",
    "topicNumber": 81,
    "title": "Recursion & Backtracking Patterns: Subsets, Permutations & Pruning",
    "level": "Advanced",
    "whyItMatters": "Backtracking systematically explores state spaces (combinatorics, puzzles, decision trees) by trying paths, verifying constraints, and backtracking (undoing state modifications) when dead ends are reached.",
    "explanation": "1. Backtracking Template in Java:\nvoid backtrack(State state, int start, List<Result> results) {\n    if (isSolution(state)) {\n        results.add(new ArrayList<>(state)); // Deep copy current state!\n        return;\n    }\n    for (Choice choice : validChoices) {\n        makeChoice(state, choice);      // 1. Choose\n        backtrack(state, next, results); // 2. Explore\n        undoChoice(state, choice);      // 3. Un-choose (Backtrack)\n    }\n}\n\n2. Three Classical Combinatorial Archetypes:\n- Subsets (Power Set): Decision at each element: include or exclude. State tree has 2^N leaves.\n- Combinations: Choose K elements from N without order. Use a start index to avoid duplicate permutations.\n- Permutations: Order matters. Use a boolean[] used array to track visited indices, exploring all N! orderings.\n\n3. Pruning for Performance:\nSort the input beforehand. If a branch exceeds the target sum (sum + nums[i] > target) or if duplicate elements are skipped (i > start && nums[i] == nums[i - 1]), prune the entire sub-tree immediately with break or continue.",
    "syntaxAndStructure": "// Subsets with backtracking:\nvoid dfs(int[] nums, int start, List<Integer> curr, List<List<Integer>> res) {\n    res.add(new ArrayList<>(curr)); // Add snapshot\n    for (int i = start; i < nums.length; i++) {\n        curr.add(nums[i]);\n        dfs(nums, i + 1, curr, res);\n        curr.remove(curr.size() - 1); // Backtrack\n    }\n}",
    "codeExamples": [
      {
        "title": "Generating Subsets (Power Set) with Backtracking",
        "code": "import java.util.*;\n\npublic class SubsetsDemo {\n    public static List<List<Integer>> subsets(int[] nums) {\n        List<List<Integer>> result = new ArrayList<>();\n        backtrack(nums, 0, new ArrayList<>(), result);\n        return result;\n    }\n\n    private static void backtrack(int[] nums, int start, List<Integer> current, List<List<Integer>> result) {\n        // Add a copy of current snapshot\n        result.add(new ArrayList<>(current));\n\n        for (int i = start; i < nums.length; i++) {\n            current.add(nums[i]);                   // 1. Choose\n            backtrack(nums, i + 1, current, result); // 2. Explore\n            current.remove(current.size() - 1);     // 3. Un-choose\n        }\n    }\n\n    public static void main(String[] args) {\n        int[] nums = {1, 2, 3};\n        List<List<Integer>> res = subsets(nums);\n        System.out.println(\"Total subsets: \" + res.size());\n        System.out.println(\"Subsets: \" + res);\n    }\n}",
        "expectedOutput": "Total subsets: 8\nSubsets: [[], [1], [1, 2], [1, 2, 3], [1, 3], [2], [2, 3], [3]]",
        "explanation": "Every subset corresponds to a path in the decision tree. Deep copies new ArrayList<>(current) are created to snapshot each configuration."
      },
      {
        "title": "Permutations of Distinct Integers in O(N!)",
        "code": "import java.util.*;\n\npublic class PermutationsDemo {\n    public static List<List<Integer>> permute(int[] nums) {\n        List<List<Integer>> result = new ArrayList<>();\n        boolean[] used = new boolean[nums.length];\n        backtrack(nums, used, new ArrayList<>(), result);\n        return result;\n    }\n\n    private static void backtrack(int[] nums, boolean[] used, List<Integer> current, List<List<Integer>> result) {\n        if (current.size() == nums.length) {\n            result.add(new ArrayList<>(current));\n            return;\n        }\n\n        for (int i = 0; i < nums.length; i++) {\n            if (used[i]) continue;\n\n            used[i] = true;\n            current.add(nums[i]);\n\n            backtrack(nums, used, current, result);\n\n            // Backtrack state\n            current.remove(current.size() - 1);\n            used[i] = false;\n        }\n    }\n\n    public static void main(String[] args) {\n        int[] nums = {1, 2};\n        System.out.println(\"Permutations: \" + permute(nums));\n    }\n}",
        "expectedOutput": "Permutations: [[1, 2], [2, 1]]",
        "explanation": "A boolean[] used array tracks choices in the current permutation path. After recursion finishes, used[i] is reset to false, enabling other permutations."
      }
    ],
    "realWorldApplications": [
      "Sudoku, chess, and crossword puzzle solver engines pruning impossible board states.",
      "Package dependency resolution engines resolving SAT conflicts across compatible library versions."
    ],
    "commonMistakes": [
      "Adding current to result directly without copying (result.add(current)): since current is modified and cleared, all subsets end up being empty lists []. Always use result.add(new ArrayList<>(current)).",
      "Forgetting to un-choose state (e.g. failing to remove last element or reset visited booleans), corrupting subsequent traversal branches.",
      "Missing base condition or pruning logic, causing StackOverflowError due to infinite recursive descent."
    ],
    "interviewRelevance": "Subsets, Combination Sum, Permutations, Word Search, and N-Queens are legendary backtracking questions frequently tested in Google, Microsoft, and Bloomberg interviews.",
    "checkpoints": [
      {
        "id": "java-81-cp1",
        "label": "Apply the Choose -> Explore -> Un-choose backtracking paradigm"
      },
      {
        "id": "java-81-cp2",
        "label": "Distinguish between Subsets (start pointer) and Permutations (used array)"
      },
      {
        "id": "java-81-cp3",
        "label": "Prune search branches by sorting input and skipping duplicate elements"
      }
    ],
    "practiceExercises": [
      {
        "id": "java-81-ex1",
        "title": "Generate All Binary Strings of Length N",
        "difficulty": "Beginner",
        "type": "coding",
        "prompt": "Given an integer n, generate and return all binary strings of length n in lexicographical order.",
        "starterCode": "import java.util.*;\n\npublic class BinaryStrings {\n    public static List<String> generateBinaryStrings(int n) {\n        return new ArrayList<>();\n    }\n}",
        "solution": "import java.util.*;\n\npublic class BinaryStrings {\n    public static List<String> generateBinaryStrings(int n) {\n        List<String> result = new ArrayList<>();\n        backtrack(n, new StringBuilder(), result);\n        return result;\n    }\n\n    private static void backtrack(int n, StringBuilder sb, List<String> result) {\n        if (sb.length() == n) {\n            result.add(sb.toString());\n            return;\n        }\n\n        sb.append('0');\n        backtrack(n, sb, result);\n        sb.deleteCharAt(sb.length() - 1);\n\n        sb.append('1');\n        backtrack(n, sb, result);\n        sb.deleteCharAt(sb.length() - 1);\n    }\n}",
        "explanation": "At each index, append '0', recurse, backtrack by deleting last char, then append '1', recurse, and backtrack. Produces 2^N binary strings."
      },
      {
        "id": "java-81-ex2",
        "title": "Combination Sum",
        "difficulty": "Intermediate",
        "type": "coding",
        "prompt": "Given an array of distinct integers candidates and a target integer target, return a list of all unique combinations of candidates where the chosen numbers sum to target. The same number may be chosen unlimited times.",
        "starterCode": "import java.util.*;\n\npublic class CombinationSumFinder {\n    public static List<List<Integer>> combinationSum(int[] candidates, int target) {\n        return new ArrayList<>();\n    }\n}",
        "solution": "import java.util.*;\n\npublic class CombinationSumFinder {\n    public static List<List<Integer>> combinationSum(int[] candidates, int target) {\n        Arrays.sort(candidates);\n        List<List<Integer>> result = new ArrayList<>();\n        backtrack(candidates, target, 0, new ArrayList<>(), result);\n        return result;\n    }\n\n    private static void backtrack(int[] candidates, int remain, int start, List<Integer> current, List<List<Integer>> result) {\n        if (remain == 0) {\n            result.add(new ArrayList<>(current));\n            return;\n        }\n\n        for (int i = start; i < candidates.length; i++) {\n            if (candidates[i] > remain) break; // Pruning\n\n            current.add(candidates[i]);\n            backtrack(candidates, remain - candidates[i], i, current, result); // reuse same index i\n            current.remove(current.size() - 1);\n        }\n    }\n}",
        "explanation": "Sorting candidates enables early pruning with break when candidate > remain. Passing index i (instead of i + 1) permits reusing the same element."
      },
      {
        "id": "java-81-ex3",
        "title": "Word Search in 2D Grid",
        "difficulty": "Advanced",
        "type": "coding",
        "prompt": "Given an m x n grid of characters board and a string word, return true if word exists in the grid. The word can be constructed from letters of sequentially adjacent cells horizontally or vertically. The same letter cell may not be used more than once.",
        "starterCode": "public class WordSearchSolver {\n    public static boolean exist(char[][] board, String word) {\n        return false;\n    }\n}",
        "solution": "public class WordSearchSolver {\n    public static boolean exist(char[][] board, String word) {\n        int m = board.length, n = board[0].length;\n        for (int r = 0; r < m; r++) {\n            for (int c = 0; c < n; c++) {\n                if (board[r][c] == word.charAt(0)) {\n                    if (dfs(board, word, r, c, 0)) return true;\n                }\n            }\n        }\n        return false;\n    }\n\n    private static boolean dfs(char[][] board, String word, int r, int c, int index) {\n        if (index == word.length()) return true;\n        if (r < 0 || r >= board.length || c < 0 || c >= board[0].length || board[r][c] != word.charAt(index)) {\n            return false;\n        }\n\n        char temp = board[r][c];\n        board[r][c] = '#'; // Mark visited in-place without auxiliary boolean[][]\n\n        boolean found = dfs(board, word, r + 1, c, index + 1) ||\n                        dfs(board, word, r - 1, c, index + 1) ||\n                        dfs(board, word, r, c + 1, index + 1) ||\n                        dfs(board, word, r, c - 1, index + 1);\n\n        board[r][c] = temp; // Backtrack cell character\n        return found;\n    }\n}",
        "explanation": "DFS checks 4 directions. Marking board[r][c] = '#' eliminates the need for an auxiliary boolean[][] array. Restoring board[r][c] = temp backtracks state."
      }
    ],
    "quizQuestions": [
      {
        "id": "java-81-q1",
        "question": "Why must we execute `result.add(new ArrayList<>(current));` instead of `result.add(current);` in backtracking algorithms?",
        "options": [
          "Because Java collections cannot store lists inside lists",
          "Because `current` is a mutable reference that gets cleared and modified during backtracking; without a defensive copy, all elements in `result` would end up empty",
          "Because new ArrayList<>() converts the list into a synchronized list",
          "Because result.add(current) causes a compile-time type error"
        ],
        "correctOptionIndex": 1,
        "explanation": "If you store `current`, you are storing a single reference that is repeatedly mutated. By the end of backtracking, all entries in `result` will point to the same empty list."
      },
      {
        "id": "java-81-q2",
        "question": "What is the primary difference in parameter passing between Subsets and Permutations backtracking?",
        "options": [
          "Subsets uses a boolean[] array while Permutations uses an integer start index",
          "Subsets passes a `start` index to only explore forward elements, while Permutations checks all indices using a `boolean[] used` array",
          "Subsets can only handle positive integers",
          "Permutations does not require backtracking state restoration"
        ],
        "correctOptionIndex": 1,
        "explanation": "Subsets uses `start` to avoid re-ordering the same subset (order doesn't matter). Permutations examines all elements in every order, requiring a `used[]` flag."
      }
    ],
    "revisionNotes": [
      "Backtracking template: Choose -> Explore -> Un-choose.",
      "Always save snapshots with `new ArrayList<>(current)` when adding to results.",
      "Sort candidates beforehand to prune dead-end branches early with `break`."
    ],
    "moduleId": "java-m6",
    "moduleNumber": 6,
    "moduleTitle": "Java Problem Solving",
    "language": "java"
  },
  {
    "id": "java-82-linked-lists",
    "topicNumber": 82,
    "title": "Linked List Interview Patterns: Reversal, Cycles & Merging",
    "level": "Intermediate",
    "whyItMatters": "Linked lists test pointer manipulation, memory reference updates, and boundary edge cases (null heads, single-node lists, cycles). Sentinel (dummy) head nodes simplify insertion and deletion code by eliminating special head-check branches.",
    "explanation": "1. Sentinel / Dummy Head Pattern:\nCreating ListNode dummy = new ListNode(0); dummy.next = head; eliminates special handling for empty lists or operations modifying the head node. Return dummy.next at the end.\n\n2. In-Place Iterative Reversal:\nMaintain three pointers: prev = null, curr = head, next = null.\nIn a loop while curr != null:\n  1. next = curr.next; (save next node)\n  2. curr.next = prev; (reverse pointer)\n  3. prev = curr;      (advance prev)\n  4. curr = next;      (advance curr)\nReturn prev as the new head!\n\n3. Floyd’s Cycle Detection (Tortoise and Hare):\n- slow moves 1 step; fast moves 2 steps.\n- If fast == null || fast.next == null, no cycle exists.\n- If slow == fast, a cycle is detected!\n- To find the cycle entry node: reset slow = head. Move both slow and fast 1 step at a time. The node where they meet is the start of the cycle (mathematical proof: 2(F + a) = F + nC + a => F = nC - a).",
    "syntaxAndStructure": "// Iterative list reversal:\nListNode prev = null, curr = head;\nwhile (curr != null) {\n    ListNode next = curr.next;\n    curr.next = prev;\n    prev = curr;\n    curr = next;\n}\nreturn prev;",
    "codeExamples": [
      {
        "title": "Iterative Linked List Reversal in O(N) Time and O(1) Space",
        "code": "public class LinkedListReversal {\n    static class ListNode {\n        int val;\n        ListNode next;\n        ListNode(int val) { this.val = val; }\n    }\n\n    public static ListNode reverseList(ListNode head) {\n        ListNode prev = null;\n        ListNode curr = head;\n\n        while (curr != null) {\n            ListNode next = curr.next;\n            curr.next = prev;\n            prev = curr;\n            curr = next;\n        }\n\n        return prev;\n    }\n\n    public static void printList(ListNode head) {\n        ListNode curr = head;\n        while (curr != null) {\n            System.out.print(curr.val + (curr.next != null ? \" -> \" : \"\"));\n            curr = curr.next;\n        }\n        System.out.println();\n    }\n\n    public static void main(String[] args) {\n        ListNode head = new ListNode(1);\n        head.next = new ListNode(2);\n        head.next.next = new ListNode(3);\n        head.next.next.next = new ListNode(4);\n\n        System.out.print(\"Original: \");\n        printList(head);\n\n        ListNode reversed = reverseList(head);\n        System.out.print(\"Reversed: \");\n        printList(reversed);\n    }\n}",
        "expectedOutput": "Original: 1 -> 2 -> 3 -> 4\nReversed: 4 -> 3 -> 2 -> 1",
        "explanation": "Iterative reversal rewires pointers in-place with O(1) memory without creating any new node allocations."
      },
      {
        "title": "Merge Two Sorted Lists with Dummy Head",
        "code": "public class MergeListsDemo {\n    static class ListNode {\n        int val;\n        ListNode next;\n        ListNode(int val) { this.val = val; }\n    }\n\n    public static ListNode mergeTwoLists(ListNode l1, ListNode l2) {\n        ListNode dummy = new ListNode(-1);\n        ListNode tail = dummy;\n\n        while (l1 != null && l2 != null) {\n            if (l1.val <= l2.val) {\n                tail.next = l1;\n                l1 = l1.next;\n            } else {\n                tail.next = l2;\n                l2 = l2.next;\n            }\n            tail = tail.next;\n        }\n\n        // Attach remaining elements\n        tail.next = (l1 != null) ? l1 : l2;\n\n        return dummy.next;\n    }\n\n    public static void main(String[] args) {\n        ListNode l1 = new ListNode(1);\n        l1.next = new ListNode(3);\n        l1.next.next = new ListNode(5);\n\n        ListNode l2 = new ListNode(2);\n        l2.next = new ListNode(4);\n\n        ListNode merged = mergeTwoLists(l1, l2);\n        while (merged != null) {\n            System.out.print(merged.val + (merged.next != null ? \" -> \" : \"\"));\n            merged = merged.next;\n        }\n        System.out.println();\n    }\n}",
        "expectedOutput": "1 -> 2 -> 3 -> 4 -> 5",
        "explanation": "The dummy head eliminates null checks when attaching the first node. Merging finishes in O(N + M) time and O(1) space."
      }
    ],
    "realWorldApplications": [
      "Operating system kernel scheduler managing ready queues and task control blocks (TCBs).",
      "LRU cache implementations using doubly-linked lists with dummy head and tail sentinel nodes."
    ],
    "commonMistakes": [
      "Losing reference to curr.next before rewiring curr.next = prev, causing premature termination of the list traversal.",
      "Forgetting fast.next != null check before advancing fast = fast.next.next, throwing NullPointerException.",
      "Creating memory cycles by failing to terminate the new tail with tail.next = null."
    ],
    "interviewRelevance": "Reverse Linked List, Linked List Cycle II, Merge K Sorted Lists, and LRU Cache are among the most tested topics across all technical interview rounds.",
    "checkpoints": [
      {
        "id": "java-82-cp1",
        "label": "Use dummy head nodes to simplify list mutations and boundary conditions"
      },
      {
        "id": "java-82-cp2",
        "label": "Reverse a singly linked list iteratively and recursively in O(N) time"
      },
      {
        "id": "java-82-cp3",
        "label": "Apply Floyd’s Tortoise and Hare algorithm to detect cycles and locate cycle entry"
      }
    ],
    "practiceExercises": [
      {
        "id": "java-82-ex1",
        "title": "Middle of the Linked List",
        "difficulty": "Beginner",
        "type": "coding",
        "prompt": "Given the head of a singly linked list, return the middle node of the linked list. If there are two middle nodes, return the second middle node.",
        "starterCode": "public class MiddleNodeFinder {\n    public static ListNode middleNode(ListNode head) {\n        return null;\n    }\n}",
        "solution": "public class MiddleNodeFinder {\n    public static ListNode middleNode(ListNode head) {\n        ListNode slow = head;\n        ListNode fast = head;\n\n        while (fast != null && fast.next != null) {\n            slow = slow.next;\n            fast = fast.next.next;\n        }\n\n        return slow;\n    }\n}",
        "explanation": "Fast pointer moves twice as fast as slow pointer. When fast reaches the end, slow is at the middle node in O(N) time and O(1) space."
      },
      {
        "id": "java-82-ex2",
        "title": "Remove Nth Node From End of List",
        "difficulty": "Intermediate",
        "type": "coding",
        "prompt": "Given the head of a linked list, remove the nth node from the end of the list and return its head in a single pass.",
        "starterCode": "public class RemoveNthFromEnd {\n    public static ListNode removeNthFromEnd(ListNode head, int n) {\n        return null;\n    }\n}",
        "solution": "public class RemoveNthFromEnd {\n    public static ListNode removeNthFromEnd(ListNode head, int n) {\n        ListNode dummy = new ListNode(0);\n        dummy.next = head;\n\n        ListNode first = dummy;\n        ListNode second = dummy;\n\n        // Advance first by n + 1 steps\n        for (int i = 0; i <= n; i++) {\n            first = first.next;\n        }\n\n        // Move both until first reaches null\n        while (first != null) {\n            first = first.next;\n            second = second.next;\n        }\n\n        // Delete target node\n        second.next = second.next.next;\n\n        return dummy.next;\n    }\n}",
        "explanation": "Maintaining an (n + 1) gap between first and second pointers allows second to stop right before the node to be removed."
      },
      {
        "id": "java-82-ex3",
        "title": "Linked List Cycle II (Find Start of Cycle)",
        "difficulty": "Advanced",
        "type": "coding",
        "prompt": "Given the head of a linked list, return the node where the cycle begins. If there is no cycle, return null. Do not modify the linked list.",
        "starterCode": "public class CycleStartFinder {\n    public static ListNode detectCycle(ListNode head) {\n        return null;\n    }\n}",
        "solution": "public class CycleStartFinder {\n    public static ListNode detectCycle(ListNode head) {\n        ListNode slow = head;\n        ListNode fast = head;\n\n        // Detect if cycle exists\n        while (fast != null && fast.next != null) {\n            slow = slow.next;\n            fast = fast.next.next;\n            if (slow == fast) {\n                // Cycle found: find intersection\n                ListNode entry = head;\n                while (entry != slow) {\n                    entry = entry.next;\n                    slow = slow.next;\n                }\n                return entry;\n            }\n        }\n\n        return null;\n    }\n}",
        "explanation": "Once fast and slow meet, the distance from head to cycle entrance equals the distance from meeting point to cycle entrance. Advancing entry from head and slow from meeting point at speed 1 finds the entrance."
      }
    ],
    "quizQuestions": [
      {
        "id": "java-82-q1",
        "question": "Why is a dummy (sentinel) head node beneficial when manipulating linked lists in Java?",
        "options": [
          "Because JVM cannot allocate ListNode without a dummy node",
          "Because it eliminates special null and head checks when inserting, deleting, or merging at the beginning of a list",
          "Because it converts a singly linked list into a doubly linked list",
          "Because it automatically prevents memory leaks in the garbage collector"
        ],
        "correctOptionIndex": 1,
        "explanation": "A dummy node provides a fixed non-null anchor preceding head, making operations on the first node identical to operations on any other node."
      },
      {
        "id": "java-82-q2",
        "question": "In Floyd's Cycle Detection algorithm, why must we check `fast != null && fast.next != null`?",
        "options": [
          "To ensure the linked list has at least three nodes",
          "To prevent NullPointerException when advancing `fast = fast.next.next` on even-length or terminated lists",
          "To check if the values inside nodes are integers",
          "To trigger garbage collection on unreachable nodes"
        ],
        "correctOptionIndex": 1,
        "explanation": "If fast is null or fast.next is null, attempting fast.next.next immediately throws NullPointerException. Both must be non-null."
      }
    ],
    "revisionNotes": [
      "Always use a dummy head node to simplify head deletions and list creation.",
      "Fast and slow pointers find the middle node and detect cycles in O(N) time with O(1) space.",
      "Reverse in-place using three pointers: prev, curr, next."
    ],
    "moduleId": "java-m6",
    "moduleNumber": 6,
    "moduleTitle": "Java Problem Solving",
    "language": "java"
  },
  {
    "id": "java-83-stacks",
    "topicNumber": 83,
    "title": "Stack & Monotonic Stack Patterns: NGE, Balanced Brackets & Histograms",
    "level": "Intermediate",
    "whyItMatters": "Stacks provide Last-In-First-Out (LIFO) semantics essential for expression evaluation, bracket matching, and backtracking. Monotonic stacks solve Next Greater Element and histogram area problems in linear O(N) time.",
    "explanation": "1. Stack Implementation in Java:\n- Never use java.util.Stack! It extends Vector, making every method synchronized (thread contention overhead) and exposing non-stack vector operations.\n- Always use Deque<T> stack = new ArrayDeque<>(); for optimal performance and cache locality.\n\n2. Monotonic Stack Concept:\nA stack where elements are strictly increasing or strictly decreasing from bottom to top.\n- Monotonic Decreasing Stack (finds Next Greater Element):\n  - Iterate through elements.\n  - While stack is non-empty and current element arr[i] > arr[stack.peek()]:\n    - stack.pop() is resolved! The next greater element for the popped index is arr[i].\n  - Push index i onto stack.\n  - Every element is pushed once and popped at most once: O(N) overall runtime!\n\n3. Largest Rectangle in Histogram Pattern:\n- Use a monotonic increasing stack storing bar indices.\n- When a shorter bar is encountered, pop elements and compute rectangle area where the popped bar is the minimum height.\n- Width = (stack.isEmpty() ? i : i - stack.peek() - 1).\n- Runs in strict O(N) time and O(N) space.",
    "syntaxAndStructure": "// Modern Java stack declaration:\nDeque<Integer> stack = new ArrayDeque<>();\nstack.push(val);\nint top = stack.pop();\nint peek = stack.peek();",
    "codeExamples": [
      {
        "title": "Valid Parentheses Matching using ArrayDeque",
        "code": "import java.util.*;\n\npublic class ValidParentheses {\n    public static boolean isValid(String s) {\n        Deque<Character> stack = new ArrayDeque<>();\n\n        for (char c : s.toCharArray()) {\n            if (c == '(') stack.push(')');\n            else if (c == '{') stack.push('}');\n            else if (c == '[') stack.push(']');\n            else {\n                // Must match expected closing bracket\n                if (stack.isEmpty() || stack.pop() != c) {\n                    return false;\n                }\n            }\n        }\n\n        return stack.isEmpty();\n    }\n\n    public static void main(String[] args) {\n        System.out.println(\"()[]{} is valid: \" + isValid(\"()[]{}\"));\n        System.out.println(\"([)] is valid: \" + isValid(\"([)]\"));\n    }\n}",
        "expectedOutput": "()[]{} is valid: true\n([)] is valid: false",
        "explanation": "Pushing expected closing brackets simplifies matching logic into a single comparison: stack.pop() != c."
      },
      {
        "title": "Next Greater Element using Monotonic Decreasing Stack",
        "code": "import java.util.*;\n\npublic class MonotonicStackDemo {\n    public static int[] nextGreaterElements(int[] nums) {\n        int n = nums.length;\n        int[] result = new int[n];\n        Arrays.fill(result, -1);\n\n        Deque<Integer> stack = new ArrayDeque<>(); // stores indices\n\n        for (int i = 0; i < n; i++) {\n            while (!stack.isEmpty() && nums[i] > nums[stack.peek()]) {\n                int resolvedIdx = stack.pop();\n                result[resolvedIdx] = nums[i];\n            }\n            stack.push(i);\n        }\n\n        return result;\n    }\n\n    public static void main(String[] args) {\n        int[] arr = {4, 5, 2, 25};\n        System.out.println(\"Next Greater: \" + Arrays.toString(nextGreaterElements(arr)));\n    }\n}",
        "expectedOutput": "Next Greater: [5, 25, 25, -1]",
        "explanation": "Indices remain in the stack until a strictly greater element arrives to resolve them. Each index is pushed and popped at most once, achieving O(N) time."
      }
    ],
    "realWorldApplications": [
      "JVM Call Stack and compiler syntax parsers parsing AST expressions.",
      "Undo/Redo functionality in text editors and graphics tools."
    ],
    "commonMistakes": [
      "Using legacy java.util.Stack which synchronizes all operations and suffers severe lock contention overhead.",
      "Calling stack.pop() without checking !stack.isEmpty(), triggering NoSuchElementException.",
      "Storing element values instead of element indices in monotonic stacks, losing index distance information needed for subarray width calculations."
    ],
    "interviewRelevance": "Valid Parentheses, Daily Temperatures, Min Stack, and Largest Rectangle in Histogram are frequently asked at Google, Apple, and Bloomberg.",
    "checkpoints": [
      {
        "id": "java-83-cp1",
        "label": "Use Deque<T> = new ArrayDeque<>() as the preferred stack implementation in Java"
      },
      {
        "id": "java-83-cp2",
        "label": "Implement monotonic decreasing stacks to find Next Greater Elements in O(N)"
      },
      {
        "id": "java-83-cp3",
        "label": "Solve Largest Rectangle in Histogram in linear time using index tracking"
      }
    ],
    "practiceExercises": [
      {
        "id": "java-83-ex1",
        "title": "Evaluate Reverse Polish Notation",
        "difficulty": "Beginner",
        "type": "coding",
        "prompt": "Evaluate the value of an arithmetic expression in Reverse Polish Notation (tokens: +, -, *, /).",
        "starterCode": "public class RPNCalculator {\n    public static int evalRPN(String[] tokens) {\n        return 0;\n    }\n}",
        "solution": "import java.util.*;\n\npublic class RPNCalculator {\n    public static int evalRPN(String[] tokens) {\n        Deque<Integer> stack = new ArrayDeque<>();\n\n        for (String t : tokens) {\n            if (t.equals(\"+\")) {\n                stack.push(stack.pop() + stack.pop());\n            } else if (t.equals(\"-\")) {\n                int b = stack.pop();\n                int a = stack.pop();\n                stack.push(a - b);\n            } else if (t.equals(\"*\")) {\n                stack.push(stack.pop() * stack.pop());\n            } else if (t.equals(\"/\")) {\n                int b = stack.pop();\n                int a = stack.pop();\n                stack.push(a / b);\n            } else {\n                stack.push(Integer.parseInt(t));\n            }\n        }\n\n        return stack.pop();\n    }\n}",
        "explanation": "Operands are pushed onto the stack. Operators pop the top two operands, evaluate, and push the result back in O(N) time."
      },
      {
        "id": "java-83-ex2",
        "title": "Daily Temperatures (Days Until Warmer)",
        "difficulty": "Intermediate",
        "type": "coding",
        "prompt": "Given an array of temperatures, return an array answer such that answer[i] is the number of days you have to wait after the ith day to get a warmer temperature. If there is no future day for which this is possible, keep answer[i] == 0.",
        "starterCode": "public class DailyTemperatures {\n    public static int[] dailyTemperatures(int[] temperatures) {\n        return new int[temperatures.length];\n    }\n}",
        "solution": "import java.util.*;\n\npublic class DailyTemperatures {\n    public static int[] dailyTemperatures(int[] temperatures) {\n        int n = temperatures.length;\n        int[] answer = new int[n];\n        Deque<Integer> stack = new ArrayDeque<>(); // stores indices\n\n        for (int i = 0; i < n; i++) {\n            while (!stack.isEmpty() && temperatures[i] > temperatures[stack.peek()]) {\n                int prevDay = stack.pop();\n                answer[prevDay] = i - prevDay;\n            }\n            stack.push(i);\n        }\n\n        return answer;\n    }\n}",
        "explanation": "Monotonic decreasing stack stores day indices. When a warmer day arrives, it pops colder days and records day difference i - prevDay."
      },
      {
        "id": "java-83-ex3",
        "title": "Largest Rectangle in Histogram",
        "difficulty": "Advanced",
        "type": "coding",
        "prompt": "Given an array of integers heights representing the histogram's bar height where the width of each bar is 1, return the area of the largest rectangle in the histogram in O(N) time.",
        "starterCode": "public class HistogramArea {\n    public static int largestRectangleArea(int[] heights) {\n        return 0;\n    }\n}",
        "solution": "import java.util.*;\n\npublic class HistogramArea {\n    public static int largestRectangleArea(int[] heights) {\n        int n = heights.length;\n        Deque<Integer> stack = new ArrayDeque<>();\n        int maxArea = 0;\n\n        for (int i = 0; i <= n; i++) {\n            int currentHeight = (i == n) ? 0 : heights[i];\n\n            while (!stack.isEmpty() && currentHeight < heights[stack.peek()]) {\n                int h = heights[stack.pop()];\n                int w = stack.isEmpty() ? i : i - stack.peek() - 1;\n                maxArea = Math.max(maxArea, h * w);\n            }\n            stack.push(i);\n        }\n\n        return maxArea;\n    }\n}",
        "explanation": "Monotonic increasing stack tracks increasing heights. When a shorter bar appears, heights are popped and their maximal rectangular width is calculated in O(N) time."
      }
    ],
    "quizQuestions": [
      {
        "id": "java-83-q1",
        "question": "Why does Effective Java recommend `ArrayDeque` over `java.util.Stack` for stack operations?",
        "options": [
          "Because Stack does not support generic types",
          "Because Stack inherits from Vector, adding synchronization overhead on every method call and violating proper encapsulation",
          "Because ArrayDeque allows null values while Stack does not",
          "Because Stack is deprecated in Java 17"
        ],
        "correctOptionIndex": 1,
        "explanation": "java.util.Stack extends Vector, imposing synchronized locks on every push/pop and permitting random index insertion, which breaks LIFO contract. ArrayDeque is faster and non-synchronized."
      },
      {
        "id": "java-83-q2",
        "question": "What is the time complexity of the Next Greater Element algorithm using a monotonic stack?",
        "options": [
          "O(N log N)",
          "O(N^2)",
          "O(N)",
          "O(1)"
        ],
        "correctOptionIndex": 2,
        "explanation": "Each element is pushed onto the stack exactly once and popped at most once across the entire loop, guaranteeing O(N) total time."
      }
    ],
    "revisionNotes": [
      "Prefer `Deque<T> = new ArrayDeque<>()` over legacy `java.util.Stack`.",
      "Monotonic stacks resolve Next Greater / Smaller element queries in O(N) amortized time.",
      "Store indices rather than values in stacks when relative distances or widths are required."
    ],
    "moduleId": "java-m6",
    "moduleNumber": 6,
    "moduleTitle": "Java Problem Solving",
    "language": "java"
  },
  {
    "id": "java-84-trees",
    "topicNumber": 84,
    "title": "Tree Traversals, BST Operations & Lowest Common Ancestor",
    "level": "Intermediate",
    "whyItMatters": "Hierarchical data structures model file systems, DOM trees, and databases. Mastering Depth-First Search (Pre/In/Post-order) and Breadth-First Search (Level-Order) provides the backbone for tree algorithm design.",
    "explanation": "1. Binary Tree Node Definition:\npublic class TreeNode {\n    int val;\n    TreeNode left, right;\n    TreeNode(int val) { this.val = val; }\n}\n\n2. DFS Traversal Orders:\n- Pre-order (Root -> Left -> Right): Useful for copying/serializing trees.\n- In-order (Left -> Root -> Right): In a Binary Search Tree (BST), in-order traversal yields values in strictly ASCENDING sorted order!\n- Post-order (Left -> Right -> Root): Useful for bottom-up computation (calculating height, deleting tree).\n\n3. BFS Level-Order Traversal:\n- Use Queue<TreeNode> queue = new ArrayDeque<>();\n- In each outer loop, snapshot int levelSize = queue.size();\n- Process exactly levelSize nodes to group tree nodes by depth level.\n\n4. Binary Search Tree (BST) Properties:\nFor every node, all nodes in its left subtree have val < node.val, and all nodes in its right subtree have val > node.val. Validating a BST requires passing valid ranges (min, max) rather than just comparing local children.",
    "syntaxAndStructure": "// Level-order BFS traversal template:\nQueue<TreeNode> q = new ArrayDeque<>();\nq.offer(root);\nwhile (!q.isEmpty()) {\n    int size = q.size();\n    for (int i = 0; i < size; i++) {\n        TreeNode node = q.poll();\n        if (node.left != null) q.offer(node.left);\n        if (node.right != null) q.offer(node.right);\n    }\n}",
    "codeExamples": [
      {
        "title": "Binary Tree Level Order Traversal (BFS)",
        "code": "import java.util.*;\n\npublic class LevelOrderDemo {\n    static class TreeNode {\n        int val;\n        TreeNode left, right;\n        TreeNode(int val) { this.val = val; }\n    }\n\n    public static List<List<Integer>> levelOrder(TreeNode root) {\n        List<List<Integer>> result = new ArrayList<>();\n        if (root == null) return result;\n\n        Queue<TreeNode> queue = new ArrayDeque<>();\n        queue.offer(root);\n\n        while (!queue.isEmpty()) {\n            int levelSize = queue.size();\n            List<Integer> currentLevel = new ArrayList<>(levelSize);\n\n            for (int i = 0; i < levelSize; i++) {\n                TreeNode node = queue.poll();\n                currentLevel.add(node.val);\n\n                if (node.left != null) queue.offer(node.left);\n                if (node.right != null) queue.offer(node.right);\n            }\n\n            result.add(currentLevel);\n        }\n\n        return result;\n    }\n\n    public static void main(String[] args) {\n        TreeNode root = new TreeNode(3);\n        root.left = new TreeNode(9);\n        root.right = new TreeNode(20);\n        root.right.left = new TreeNode(15);\n        root.right.right = new TreeNode(7);\n\n        System.out.println(\"Level order: \" + levelOrder(root));\n    }\n}",
        "expectedOutput": "Level order: [[3], [9, 20], [15, 7]]",
        "explanation": "Taking levelSize = queue.size() before processing each level isolates nodes by depth, running in O(N) time and O(N) space."
      },
      {
        "title": "Validate Binary Search Tree (BST)",
        "code": "public class ValidateBSTDemo {\n    static class TreeNode {\n        int val;\n        TreeNode left, right;\n        TreeNode(int val) { this.val = val; }\n    }\n\n    public static boolean isValidBST(TreeNode root) {\n        return validate(root, null, null);\n    }\n\n    private static boolean validate(TreeNode node, Integer min, Integer max) {\n        if (node == null) return true;\n\n        if ((min != null && node.val <= min) || (max != null && node.val >= max)) {\n            return false;\n        }\n\n        // Left children must be < node.val; Right children must be > node.val\n        return validate(node.left, min, node.val) && validate(node.right, node.val, max);\n    }\n\n    public static void main(String[] args) {\n        TreeNode root = new TreeNode(2);\n        root.left = new TreeNode(1);\n        root.right = new TreeNode(3);\n        System.out.println(\"Is valid BST: \" + isValidBST(root));\n    }\n}",
        "expectedOutput": "Is valid BST: true",
        "explanation": "Passing dynamic min and max bounds ensures that every node in the left subtree is less than the root, avoiding the common bug where only immediate children are checked."
      }
    ],
    "realWorldApplications": [
      "Document Object Model (DOM) rendering engines in web browsers.",
      "SQL query optimizers transforming relational algebra expressions into Abstract Syntax Trees (ASTs)."
    ],
    "commonMistakes": [
      "Checking only immediate children (node.left.val < node.val) when validating a BST; this misses violations deeper in the subtree.",
      "Using Integer.MIN_VALUE or MAX_VALUE as initial bounds in BST validation, which fails if the tree contains nodes with Integer.MIN_VALUE.",
      "Stack overflow in skewed (unbalanced) trees when relying on naive recursion without tail optimization."
    ],
    "interviewRelevance": "Lowest Common Ancestor, Validate BST, Maximum Path Sum, and Binary Tree Zigzag Level Order Traversal are standard coding interview fixtures at Microsoft, Amazon, and Meta.",
    "checkpoints": [
      {
        "id": "java-84-cp1",
        "label": "Implement Pre-order, In-order, and Post-order DFS traversals"
      },
      {
        "id": "java-84-cp2",
        "label": "Implement BFS Level-Order Traversal using Queue and snapshot size"
      },
      {
        "id": "java-84-cp3",
        "label": "Validate a BST by maintaining recursive upper and lower boundary limits"
      }
    ],
    "practiceExercises": [
      {
        "id": "java-84-ex1",
        "title": "Maximum Depth of Binary Tree",
        "difficulty": "Beginner",
        "type": "coding",
        "prompt": "Given the root of a binary tree, return its maximum depth (number of nodes along longest path from root to leaf).",
        "starterCode": "public class MaxDepthTree {\n    public static int maxDepth(TreeNode root) {\n        return 0;\n    }\n}",
        "solution": "public class MaxDepthTree {\n    public static int maxDepth(TreeNode root) {\n        if (root == null) return 0;\n        return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));\n    }\n}",
        "explanation": "Bottom-up post-order recursion returns 1 + max(leftDepth, rightDepth) in O(N) time and O(H) space."
      },
      {
        "id": "java-84-ex2",
        "title": "Lowest Common Ancestor of a Binary Search Tree",
        "difficulty": "Intermediate",
        "type": "coding",
        "prompt": "Given a binary search tree (BST), find the lowest common ancestor (LCA) node of two given nodes p and q in the BST.",
        "starterCode": "public class LCABST {\n    public static TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {\n        return null;\n    }\n}",
        "solution": "public class LCABST {\n    public static TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {\n        TreeNode curr = root;\n\n        while (curr != null) {\n            if (p.val < curr.val && q.val < curr.val) {\n                curr = curr.left;\n            } else if (p.val > curr.val && q.val > curr.val) {\n                curr = curr.right;\n            } else {\n                return curr; // Split point: this is the LCA!\n            }\n        }\n\n        return null;\n    }\n}",
        "explanation": "Exploit BST property: if both values are smaller, move left; if both values are larger, move right; the first node where paths diverge is the LCA. O(H) time and O(1) space."
      },
      {
        "id": "java-84-ex3",
        "title": "Lowest Common Ancestor of a Binary Tree (General)",
        "difficulty": "Advanced",
        "type": "coding",
        "prompt": "Given a general binary tree (not a BST), find the lowest common ancestor (LCA) of two given nodes p and q.",
        "starterCode": "public class LCAGeneral {\n    public static TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {\n        return null;\n    }\n}",
        "solution": "public class LCAGeneral {\n    public static TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {\n        if (root == null || root == p || root == q) {\n            return root;\n        }\n\n        TreeNode left = lowestCommonAncestor(root.left, p, q);\n        TreeNode right = lowestCommonAncestor(root.right, p, q);\n\n        if (left != null && right != null) {\n            return root; // p and q found in separate subtrees\n        }\n\n        return (left != null) ? left : right;\n    }\n}",
        "explanation": "If p and q are found in different subtrees (left != null && right != null), root is their LCA. Otherwise, bubble up the non-null result in O(N) time."
      }
    ],
    "quizQuestions": [
      {
        "id": "java-84-q1",
        "question": "Which tree traversal order visits nodes in ascending sorted order when applied to a valid Binary Search Tree (BST)?",
        "options": [
          "Pre-order",
          "In-order",
          "Post-order",
          "Level-order"
        ],
        "correctOptionIndex": 1,
        "explanation": "In-order traversal visits (Left, Root, Right). Since all left elements are smaller and right elements are larger, in-order produces strictly ascending sorted order."
      },
      {
        "id": "java-84-q2",
        "question": "What is the auxiliary space complexity of Level-Order Traversal (BFS) on a full binary tree with N nodes?",
        "options": [
          "O(1)",
          "O(log N)",
          "O(N)",
          "O(N^2)"
        ],
        "correctOptionIndex": 2,
        "explanation": "In a full binary tree, the last level contains ceil(N / 2) leaf nodes. At peak memory, the queue holds all leaf nodes simultaneously, consuming O(N) space."
      }
    ],
    "revisionNotes": [
      "In-order traversal on a BST yields elements in sorted ascending order.",
      "Level-order BFS groups nodes by depth using snapshot `int size = queue.size()`.",
      "BST validation requires tracking recursive `(min, max)` range bounds."
    ],
    "moduleId": "java-m6",
    "moduleNumber": 6,
    "moduleTitle": "Java Problem Solving",
    "language": "java"
  },
  {
    "id": "java-85-dynamic-programming",
    "topicNumber": 85,
    "title": "Dynamic Programming in Java: Memoization vs Tabulation",
    "level": "Advanced",
    "whyItMatters": "Dynamic Programming optimizes problems with Overlapping Subproblems and Optimal Substructure. Moving from naive exponential recursion O(2^N) to polynomial time O(N) or O(N * W) is the hallmark of advanced problem-solving.",
    "explanation": "1. Top-Down Memoization vs Bottom-Up Tabulation:\n- Top-Down (Memoization): Keep the natural recursive formulation. Store results in a cache (int[] or int[][]) to eliminate redundant subtree calculations. Prone to stack overflow if recursion depth is large.\n- Bottom-Up (Tabulation): Solve subproblems in topological order starting from base cases, filling an array iteratively. Eliminates call-stack overhead and enables space optimization.\n\n2. 0/1 Knapsack Pattern:\nGiven weights wt[], values val[], and capacity W:\n- dp[i][w]: max value considering first i items with weight limit w.\n- State transition: dp[i][w] = Math.max(dp[i-1][w], val[i-1] + dp[i-1][w - wt[i-1]])\n- Space Optimization: Notice dp[i] only depends on row dp[i-1]. We can reduce space to a 1D array dp[w] by iterating w backward from W down to wt[i-1]!\n\n3. Longest Common Subsequence (LCS):\nGiven two strings s1 and s2:\n- If s1.charAt(i-1) == s2.charAt(j-1): dp[i][j] = 1 + dp[i-1][j-1]\n- Else: dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1])",
    "syntaxAndStructure": "// 1D Space-Optimized Knapsack DP:\nint[] dp = new int[W + 1];\nfor (int i = 0; i < n; i++) {\n    for (int w = W; w >= wt[i]; w--) {\n        dp[w] = Math.max(dp[w], dp[w - wt[i]] + val[i]);\n    }\n}",
    "codeExamples": [
      {
        "title": "0/1 Knapsack: 1D Space-Optimized Tabulation",
        "code": "public class KnapsackDemo {\n    public static int knapsack(int[] wt, int[] val, int W) {\n        int[] dp = new int[W + 1];\n\n        for (int i = 0; i < wt.length; i++) {\n            // Iterate backward to avoid using the same item multiple times\n            for (int w = W; w >= wt[i]; w--) {\n                dp[w] = Math.max(dp[w], dp[w - wt[i]] + val[i]);\n            }\n        }\n\n        return dp[W];\n    }\n\n    public static void main(String[] args) {\n        int[] wt = {1, 3, 4, 5};\n        int[] val = {1, 4, 5, 7};\n        int W = 7;\n\n        System.out.println(\"Max Knapsack Value: \" + knapsack(wt, val, W));\n    }\n}",
        "expectedOutput": "Max Knapsack Value: 9",
        "explanation": "Iterating w backward from W to wt[i] ensures that each item is used at most once while reducing memory from O(N * W) to O(W)."
      },
      {
        "title": "Longest Increasing Subsequence in O(N log N) using Binary Search",
        "code": "import java.util.*;\n\npublic class LISDemo {\n    public static int lengthOfLIS(int[] nums) {\n        List<Integer> tails = new ArrayList<>();\n\n        for (int x : nums) {\n            int idx = Collections.binarySearch(tails, x);\n            if (idx < 0) idx = -(idx + 1); // Insertion point\n\n            if (idx == tails.size()) {\n                tails.add(x);\n            } else {\n                tails.set(idx, x);\n            }\n        }\n\n        return tails.size();\n    }\n\n    public static void main(String[] args) {\n        int[] nums = {10, 9, 2, 5, 3, 7, 101, 18};\n        System.out.println(\"LIS Length: \" + lengthOfLIS(nums));\n    }\n}",
        "expectedOutput": "LIS Length: 4",
        "explanation": "Patience sorting maintains the smallest tail of all increasing subsequences of length i+1. Using binary search achieves O(N log N) time over naive O(N^2) DP."
      }
    ],
    "realWorldApplications": [
      "Diff tools (git diff) and DNA sequence alignment computing Longest Common Subsequences.",
      "Resource allocation and knapsack budgeting in cloud scheduling systems."
    ],
    "commonMistakes": [
      "Iterating forward (w from wt[i] to W) in 0/1 knapsack: this converts the solution into Unbounded Knapsack where items are reused indefinitely.",
      "Missing base cases or uninitialized memo tables (e.g. using 0 as unvisited marker when 0 is a valid result; use -1 or Arrays.fill(memo, -1)).",
      "Using boxed Integer[][] instead of primitive int[][] for DP tables, multiplying heap memory usage by 6x."
    ],
    "interviewRelevance": "Coin Change, Longest Common Subsequence, Word Break, and Edit Distance are core interview problems at Google, Uber, and Amazon.",
    "checkpoints": [
      {
        "id": "java-85-cp1",
        "label": "Transform recursive relations into top-down memoization and bottom-up tabulation"
      },
      {
        "id": "java-85-cp2",
        "label": "Optimize 2D DP matrices into 1D rolling arrays by backward iteration"
      },
      {
        "id": "java-85-cp3",
        "label": "Solve Longest Increasing Subsequence in O(N log N) using binary search"
      }
    ],
    "practiceExercises": [
      {
        "id": "java-85-ex1",
        "title": "Climbing Stairs",
        "difficulty": "Beginner",
        "type": "coding",
        "prompt": "You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?",
        "starterCode": "public class ClimbStairs {\n    public static int climbStairs(int n) {\n        return 0;\n    }\n}",
        "solution": "public class ClimbStairs {\n    public static int climbStairs(int n) {\n        if (n <= 2) return n;\n        int prev2 = 1, prev1 = 2;\n        for (int i = 3; i <= n; i++) {\n            int curr = prev1 + prev2;\n            prev2 = prev1;\n            prev1 = curr;\n        }\n        return prev1;\n    }\n}",
        "explanation": "dp[i] = dp[i-1] + dp[i-2]. Since it only depends on the previous two values, it can be computed in O(N) time with O(1) space."
      },
      {
        "id": "java-85-ex2",
        "title": "Coin Change (Fewest Coins)",
        "difficulty": "Intermediate",
        "type": "coding",
        "prompt": "Given an integer array coins and an integer amount, return the fewest number of coins that you need to make up that amount. If that amount cannot be made up, return -1.",
        "starterCode": "public class CoinChangeSolver {\n    public static int coinChange(int[] coins, int amount) {\n        return -1;\n    }\n}",
        "solution": "import java.util.Arrays;\n\npublic class CoinChangeSolver {\n    public static int coinChange(int[] coins, int amount) {\n        int max = amount + 1;\n        int[] dp = new int[amount + 1];\n        Arrays.fill(dp, max);\n        dp[0] = 0;\n\n        for (int i = 1; i <= amount; i++) {\n            for (int coin : coins) {\n                if (coin <= i) {\n                    dp[i] = Math.min(dp[i], dp[i - coin] + 1);\n                }\n            }\n        }\n\n        return dp[amount] > amount ? -1 : dp[amount];\n    }\n}",
        "explanation": "Bottom-up 1D DP where dp[i] is the minimum coins needed for amount i. Time complexity is O(amount * coins.length) and space is O(amount)."
      },
      {
        "id": "java-85-ex3",
        "title": "Longest Common Subsequence (LCS)",
        "difficulty": "Advanced",
        "type": "coding",
        "prompt": "Given two strings text1 and text2, return the length of their longest common subsequence. If there is no common subsequence, return 0.",
        "starterCode": "public class LCSSolver {\n    public static int longestCommonSubsequence(String text1, String text2) {\n        return 0;\n    }\n}",
        "solution": "public class LCSSolver {\n    public static int longestCommonSubsequence(String text1, String text2) {\n        int m = text1.length(), n = text2.length();\n        int[][] dp = new int[m + 1][n + 1];\n\n        for (int i = 1; i <= m; i++) {\n            char c1 = text1.charAt(i - 1);\n            for (int j = 1; j <= n; j++) {\n                char c2 = text2.charAt(j - 1);\n                if (c1 == c2) {\n                    dp[i][j] = 1 + dp[i - 1][j - 1];\n                } else {\n                    dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);\n                }\n            }\n        }\n\n        return dp[m][n];\n    }\n}",
        "explanation": "Standard 2D DP. If characters match, add 1 to diagonal. Else take max of top and left entries. Time is O(M * N) and space is O(M * N)."
      }
    ],
    "quizQuestions": [
      {
        "id": "java-85-q1",
        "question": "In the space-optimized 1D array implementation of the 0/1 Knapsack problem, why MUST the weight loop iterate backward from W down to wt[i]?",
        "options": [
          "To optimize CPU cache line loading",
          "To prevent using the current item multiple times, ensuring it only references values from the previous item's row",
          "Because Java arrays cannot be indexed in forward order during inner loops",
          "To avoid Integer overflow"
        ],
        "correctOptionIndex": 1,
        "explanation": "Iterating backward guarantees that dp[w - wt[i]] contains the value from the previous step i-1. Iterating forward would use the already-updated value from step i, resulting in unbounded reuse."
      },
      {
        "id": "java-85-q2",
        "question": "What two properties must a problem exhibit to be solvable with Dynamic Programming?",
        "options": [
          "Sorted input and contiguous memory",
          "Optimal substructure and overlapping subproblems",
          "Binary searchability and tail recursion",
          "Thread safety and immutability"
        ],
        "correctOptionIndex": 1,
        "explanation": "Dynamic programming applies when the global optimal solution can be constructed from optimal solutions to subproblems (optimal substructure) and subproblems repeat many times (overlapping subproblems)."
      }
    ],
    "revisionNotes": [
      "Top-down memoization caches recursive branches; bottom-up tabulation computes iteratively.",
      "In 0/1 knapsack, iterate weight backwards to compress 2D DP table into 1D array.",
      "Longest Increasing Subsequence can be optimized from O(N^2) to O(N log N) using binary search."
    ],
    "moduleId": "java-m6",
    "moduleNumber": 6,
    "moduleTitle": "Java Problem Solving",
    "language": "java"
  },
  {
    "id": "java-86-graphs",
    "topicNumber": 86,
    "title": "Graph Representations, Traversals & Topological Sorting",
    "level": "Advanced",
    "whyItMatters": "Graphs represent complex interconnected relationships: networks, build dependency graphs, road maps, and social connections. Mastering BFS shortest path, DFS cycle detection, and Kahn's topological sort is mandatory for senior software engineering roles.",
    "explanation": "1. Graph Representation in Java:\n- Adjacency List: List<List<Integer>> adj = new ArrayList<>(); for sparse graphs (E << V^2). Space: O(V + E).\n- Adjacency Matrix: boolean[][] or int[][] matrix for dense graphs. O(V^2) space, O(1) edge lookup.\n\n2. Breadth-First Search (BFS):\n- Finds shortest path in unweighted graphs.\n- Use Queue<Integer> queue = new ArrayDeque<>(); and boolean[] visited array.\n\n3. Depth-First Search (DFS) & Cycle Detection:\n- In directed graphs, a simple visited array is insufficient. We need 3 states:\n  - State 0: Unvisited.\n  - State 1: Visiting (currently in recursion call stack). If encountered again -> CYCLE DETECTED!\n  - State 2: Visited (fully processed).\n\n4. Topological Sort (Kahn’s Algorithm):\n- Applicable only to Directed Acyclic Graphs (DAG).\n- Compute in-degrees: int[] inDegree = new int[V];\n- Enqueue all nodes with inDegree == 0.\n- Repeatedly dequeue node u, append to order, and decrement inDegree of its neighbors.\n- If any neighbor reaches inDegree == 0, enqueue it.\n- If processed count < V, graph contains a cycle!",
    "syntaxAndStructure": "// Kahn's Algorithm for Topological Sort:\nint[] inDegree = new int[numCourses];\nfor (int[] edge : prerequisites) inDegree[edge[0]]++;\nQueue<Integer> q = new ArrayDeque<>();\nfor (int i = 0; i < numCourses; i++) if (inDegree[i] == 0) q.offer(i);",
    "codeExamples": [
      {
        "title": "Topological Sort using Kahn's Algorithm (Course Schedule)",
        "code": "import java.util.*;\n\npublic class KahnTopologicalSort {\n    public static boolean canFinish(int numCourses, int[][] prerequisites) {\n        List<List<Integer>> adj = new ArrayList<>();\n        for (int i = 0; i < numCourses; i++) adj.add(new ArrayList<>());\n\n        int[] inDegree = new int[numCourses];\n        for (int[] p : prerequisites) {\n            int course = p[0], pre = p[1];\n            adj.get(pre).add(course);\n            inDegree[course]++;\n        }\n\n        Queue<Integer> queue = new ArrayDeque<>();\n        for (int i = 0; i < numCourses; i++) {\n            if (inDegree[i] == 0) queue.offer(i);\n        }\n\n        int count = 0;\n        while (!queue.isEmpty()) {\n            int curr = queue.poll();\n            count++;\n\n            for (int neighbor : adj.get(curr)) {\n                inDegree[neighbor]--;\n                if (inDegree[neighbor] == 0) {\n                    queue.offer(neighbor);\n                }\n            }\n        }\n\n        return count == numCourses; // True if all courses can be taken (no cycle)\n    }\n\n    public static void main(String[] args) {\n        int[][] pre1 = {{1, 0}};\n        System.out.println(\"Can finish pre1: \" + canFinish(2, pre1));\n\n        int[][] pre2 = {{1, 0}, {0, 1}};\n        System.out.println(\"Can finish pre2 (cycle): \" + canFinish(2, pre2));\n    }\n}",
        "expectedOutput": "Can finish pre1: true\nCan finish pre2 (cycle): false",
        "explanation": "Kahn's algorithm processes nodes with in-degree 0. If a directed cycle exists, in-degrees never reach 0, leaving count < numCourses in O(V + E) time."
      },
      {
        "title": "Shortest Path in Unweighted Graph using BFS",
        "code": "import java.util.*;\n\npublic class BFSShortestPath {\n    public static int shortestPath(int n, List<List<Integer>> adj, int start, int end) {\n        boolean[] visited = new boolean[n];\n        Queue<Integer> queue = new ArrayDeque<>();\n\n        queue.offer(start);\n        visited[start] = true;\n        int distance = 0;\n\n        while (!queue.isEmpty()) {\n            int size = queue.size();\n            for (int i = 0; i < size; i++) {\n                int node = queue.poll();\n                if (node == end) return distance;\n\n                for (int neighbor : adj.get(node)) {\n                    if (!visited[neighbor]) {\n                        visited[neighbor] = true;\n                        queue.offer(neighbor);\n                    }\n                }\n            }\n            distance++;\n        }\n\n        return -1;\n    }\n\n    public static void main(String[] args) {\n        int n = 4;\n        List<List<Integer>> adj = new ArrayList<>();\n        for (int i = 0; i < n; i++) adj.add(new ArrayList<>());\n\n        adj.get(0).add(1);\n        adj.get(1).add(2);\n        adj.get(0).add(3);\n        adj.get(3).add(2);\n\n        System.out.println(\"Shortest path from 0 to 2: \" + shortestPath(n, adj, 0, 2) + \" edges\");\n    }\n}",
        "expectedOutput": "Shortest path from 0 to 2: 2 edges",
        "explanation": "BFS expands outward level by level. The first time the destination node is dequeued, the current level counter represents the shortest path in O(V + E) time."
      }
    ],
    "realWorldApplications": [
      "Build systems like Maven and Gradle ordering module compilation tasks via Topological Sort.",
      "GPS navigation routing finding shortest paths across street network graphs."
    ],
    "commonMistakes": [
      "Using simple boolean[] visited for cycle detection in directed graphs: directed cross-edges will be misidentified as cycles! Use 3-state coloring (0=unvisited, 1=visiting, 2=visited).",
      "Forgetting to initialize empty ArrayLists for every node in the adjacency list, causing NullPointerException.",
      "Using DFS for shortest paths in unweighted graphs instead of BFS, leading to suboptimal paths and exponential exploration."
    ],
    "interviewRelevance": "Course Schedule I & II, Number of Islands, Word Ladder, and Alien Dictionary are premier interview questions at Google, Uber, and Amazon.",
    "checkpoints": [
      {
        "id": "java-86-cp1",
        "label": "Construct adjacency lists using List<List<Integer>> for sparse graph modeling"
      },
      {
        "id": "java-86-cp2",
        "label": "Find unweighted shortest paths using level-by-level BFS queue traversal"
      },
      {
        "id": "java-86-cp3",
        "label": "Implement Kahn's Algorithm with in-degree tracking for topological sorting and cycle detection"
      }
    ],
    "practiceExercises": [
      {
        "id": "java-86-ex1",
        "title": "Number of Connected Components in Undirected Graph",
        "difficulty": "Beginner",
        "type": "coding",
        "prompt": "Given n nodes labeled from 0 to n - 1 and an array of edges, return the number of connected components in the graph.",
        "starterCode": "public class ConnectedComponents {\n    public static int countComponents(int n, int[][] edges) {\n        return 0;\n    }\n}",
        "solution": "import java.util.*;\n\npublic class ConnectedComponents {\n    public static int countComponents(int n, int[][] edges) {\n        List<List<Integer>> adj = new ArrayList<>();\n        for (int i = 0; i < n; i++) adj.add(new ArrayList<>());\n        for (int[] e : edges) {\n            adj.get(e[0]).add(e[1]);\n            adj.get(e[1]).add(e[0]);\n        }\n\n        boolean[] visited = new boolean[n];\n        int count = 0;\n\n        for (int i = 0; i < n; i++) {\n            if (!visited[i]) {\n                count++;\n                dfs(adj, visited, i);\n            }\n        }\n\n        return count;\n    }\n\n    private static void dfs(List<List<Integer>> adj, boolean[] visited, int u) {\n        visited[u] = true;\n        for (int v : adj.get(u)) {\n            if (!visited[v]) {\n                dfs(adj, visited, v);\n            }\n        }\n    }\n}",
        "explanation": "Iterate through all nodes. Each unvisited node initiates a DFS that marks an entire connected component, running in O(V + E) time."
      },
      {
        "id": "java-86-ex2",
        "title": "Course Schedule II (Find Valid Order)",
        "difficulty": "Intermediate",
        "type": "coding",
        "prompt": "Given the total number of courses numCourses and prerequisites, return the ordering of courses you should take to finish all courses. If impossible, return an empty array.",
        "starterCode": "public class CourseScheduleOrder {\n    public static int[] findOrder(int numCourses, int[][] prerequisites) {\n        return new int[0];\n    }\n}",
        "solution": "import java.util.*;\n\npublic class CourseScheduleOrder {\n    public static int[] findOrder(int numCourses, int[][] prerequisites) {\n        List<List<Integer>> adj = new ArrayList<>();\n        for (int i = 0; i < numCourses; i++) adj.add(new ArrayList<>());\n\n        int[] inDegree = new int[numCourses];\n        for (int[] p : prerequisites) {\n            adj.get(p[1]).add(p[0]);\n            inDegree[p[0]]++;\n        }\n\n        Queue<Integer> q = new ArrayDeque<>();\n        for (int i = 0; i < numCourses; i++) {\n            if (inDegree[i] == 0) q.offer(i);\n        }\n\n        int[] order = new int[numCourses];\n        int idx = 0;\n\n        while (!q.isEmpty()) {\n            int curr = q.poll();\n            order[idx++] = curr;\n\n            for (int neighbor : adj.get(curr)) {\n                inDegree[neighbor]--;\n                if (inDegree[neighbor] == 0) {\n                    q.offer(neighbor);\n                }\n            }\n        }\n\n        return idx == numCourses ? order : new int[0];\n    }\n}",
        "explanation": "Kahn's algorithm stores dequeued nodes in order array. If idx == numCourses, a valid DAG topological order exists; otherwise, return empty array."
      },
      {
        "id": "java-86-ex3",
        "title": "Number of Islands (Grid BFS/DFS)",
        "difficulty": "Advanced",
        "type": "coding",
        "prompt": "Given an m x n 2D binary grid grid where '1' represents land and '0' represents water, return the number of islands. An island is surrounded by water and formed by connecting adjacent lands horizontally or vertically.",
        "starterCode": "public class IslandCounter {\n    public static int numIslands(char[][] grid) {\n        return 0;\n    }\n}",
        "solution": "public class IslandCounter {\n    public static int numIslands(char[][] grid) {\n        if (grid == null || grid.length == 0) return 0;\n        int m = grid.length, n = grid[0].length;\n        int count = 0;\n\n        for (int r = 0; r < m; r++) {\n            for (int c = 0; c < n; c++) {\n                if (grid[r][c] == '1') {\n                    count++;\n                    floodFill(grid, r, c);\n                }\n            }\n        }\n\n        return count;\n    }\n\n    private static void floodFill(char[][] grid, int r, int c) {\n        if (r < 0 || r >= grid.length || c < 0 || c >= grid[0].length || grid[r][c] != '1') {\n            return;\n        }\n\n        grid[r][c] = '0'; // Sink island in-place to avoid extra visited matrix\n\n        floodFill(grid, r + 1, c);\n        floodFill(grid, r - 1, c);\n        floodFill(grid, r, c + 1);\n        floodFill(grid, r, c - 1);\n    }\n}",
        "explanation": "Sinking visited land cells (grid[r][c] = '0') avoids auxiliary space. DFS traverses all 4 directions, visiting each cell at most once in O(M * N) time."
      }
    ],
    "quizQuestions": [
      {
        "id": "java-86-q1",
        "question": "Why does Kahn's Algorithm fail to produce a complete ordering if the directed graph contains a cycle?",
        "options": [
          "Because the queue throws NoSuchElementException",
          "Because nodes inside a directed cycle always have in-degree >= 1, so they can never be enqueued",
          "Because arrays cannot store cycle indices",
          "Because Java collections reject cyclic data structures"
        ],
        "correctOptionIndex": 1,
        "explanation": "In a directed cycle, every member node has at least one incoming edge from another member. Their in-degrees never reach 0, meaning they are never enqueued."
      },
      {
        "id": "java-86-q2",
        "question": "Which traversal algorithm is guaranteed to find the shortest path between two nodes in an unweighted graph?",
        "options": [
          "Depth-First Search (DFS)",
          "Breadth-First Search (BFS)",
          "Topological Sort",
          "In-Order Traversal"
        ],
        "correctOptionIndex": 1,
        "explanation": "Breadth-First Search visits nodes in order of increasing distance from the start node, guaranteeing that the first time a target node is visited, it is via the shortest path."
      }
    ],
    "revisionNotes": [
      "Adjacency list `List<List<Integer>>` is standard for sparse graphs (O(V + E) space).",
      "BFS guarantees shortest path in unweighted graphs.",
      "Kahn's algorithm uses in-degree array and Queue to find Topological Sort and detect directed cycles."
    ],
    "moduleId": "java-m6",
    "moduleNumber": 6,
    "moduleTitle": "Java Problem Solving",
    "language": "java"
  }
];

export const module6: MasteryModule = {
  "id": "java-m6",
  "number": 6,
  "title": "Java Problem Solving",
  "description": "Essential coding interview patterns in Java: Big-O analysis & memory footprint, prefix sums, difference arrays, hashing patterns, two-pointer techniques, sliding windows, binary search variants, custom comparators, recursion & backtracking, linked list manipulation, monotonic stacks, tree algorithms & BST, dynamic programming, and graph traversals.",
  "language": "java",
  "topics": [
    {
      "id": "java-74-complexity",
      "topicNumber": 74,
      "title": "Time & Space Complexity in Java (Big-O, GC & Memory Footprint)",
      "level": "Intermediate",
      "whyItMatters": "Understanding computational complexity in Java requires knowing not only theoretical Big-O curves, but also JVM-specific runtime realities: primitive vs boxed object memory overhead, Garbage Collection pauses, and cache locality.",
      "explanation": "Algorithm analysis in Java evaluates performance as input size N grows:\n\n1. Big-O Complexity Classes:\n- O(1) Constant: Array index access arr[i], HashMap get()/put() amortized.\n- O(log N) Logarithmic: Binary search on sorted array, TreeMap operations.\n- O(N) Linear: Traversing an array or LinkedList, linear search.\n- O(N log N) Linearithmic: Dual-Pivot Quicksort (Arrays.sort(int[])), TimSort (Arrays.sort(Object[]), Collections.sort()).\n- O(N^2) Quadratic: Nested loops, Bubble sort, naive pair matching.\n- O(2^N) Exponential: Recursive subsets, naive Fibonacci calculation.\n\n2. Java Memory Footprint Overhead:\n- Primitive int: Exactly 4 bytes of contiguous memory.\n- Boxed Integer: 16 bytes of object header + 4 bytes payload + 4 bytes padding = 24 bytes on 64-bit JVM with compressed oops.\n- Array of primitives int[N]: ~ 16-24 bytes header + (4 * N) bytes.\n- Array of boxed objects Integer[N]: Array object header + N * 8 bytes references PLUS N separate 24-byte Integer objects = ~32 * N bytes! (8x memory overhead + poor CPU cache locality due to pointer chasing).\n\n3. Space Complexity Considerations:\n- Auxiliary Space: Extra space used outside the input size (e.g., temporary variables, stacks).\n- Recursion Call Stack: Every recursive frame consumes stack memory (typically 1MB per thread stack size), risking StackOverflowError if recursion depth exceeds ~10,000.",
      "syntaxAndStructure": "// Measuring execution elapsed time:\nlong start = System.nanoTime();\n// algorithmic workload\nlong duration = System.nanoTime() - start;",
      "codeExamples": [
        {
          "title": "Benchmarking Primitive vs Boxed Collection Performance & Memory",
          "code": "public class ComplexityDemo {\n    public static void main(String[] args) {\n        int n = 1_000_000;\n\n        // Primitive int array\n        long start = System.currentTimeMillis();\n        int[] primArr = new int[n];\n        long sumPrim = 0;\n        for (int i = 0; i < n; i++) {\n            primArr[i] = i;\n            sumPrim += primArr[i];\n        }\n        long primTime = System.currentTimeMillis() - start;\n\n        // Boxed Integer array\n        start = System.currentTimeMillis();\n        Integer[] boxedArr = new Integer[n];\n        long sumBoxed = 0;\n        for (int i = 0; i < n; i++) {\n            boxedArr[i] = i; // Autoboxing creates object references\n            sumBoxed += boxedArr[i];\n        }\n        long boxedTime = System.currentTimeMillis() - start;\n\n        System.out.println(\"Primitive sum: \" + sumPrim + \" in \" + primTime + \" ms\");\n        System.out.println(\"Boxed sum: \" + sumBoxed + \" in \" + boxedTime + \" ms\");\n        System.out.println(\"Boxed is significantly slower due to allocation and pointer dereferencing!\");\n    }\n}",
          "expectedOutput": "Primitive sum: 499999500000 in 3 ms\nBoxed sum: 499999500000 in 28 ms\nBoxed is significantly slower due to allocation and pointer dereferencing!",
          "explanation": "Primitive arrays store raw contiguous 32-bit values with L1/L2 cache prefetching. Boxed Integer arrays store object references pointing to scattered heap locations, causing cache misses and GC pressure."
        },
        {
          "title": "Comparing Time Complexities: O(1), O(log N), O(N), O(N log N)",
          "code": "import java.util.*;\n\npublic class TimeComplexityClasses {\n    // O(1)\n    public static int getFirst(int[] arr) {\n        return arr[0];\n    }\n\n    // O(log N) - Binary Search\n    public static int binarySearch(int[] arr, int target) {\n        int low = 0, high = arr.length - 1;\n        while (low <= high) {\n            int mid = low + (high - low) / 2;\n            if (arr[mid] == target) return mid;\n            else if (arr[mid] < target) low = mid + 1;\n            else high = mid - 1;\n        }\n        return -1;\n    }\n\n    public static void main(String[] args) {\n        int[] arr = {10, 20, 30, 40, 50, 60, 70, 80};\n        System.out.println(\"O(1) Access: \" + getFirst(arr));\n        System.out.println(\"O(log N) Index of 50: \" + binarySearch(arr, 50));\n    }\n}",
          "expectedOutput": "O(1) Access: 10\nO(log N) Index of 50: 4",
          "explanation": "Array index lookup is O(1) because memory address is calculated via base + index * 4 bytes. Binary search cuts the search space in half each iteration, yielding O(log N) steps."
        }
      ],
      "realWorldApplications": [
        "High-frequency trading and low-latency systems avoiding boxed collections (Agrona, Trove, or primitive arrays) to eliminate GC pauses.",
        "Analyzing API latency SLAs where O(N^2) endpoints cause microservice cascading timeouts under production loads."
      ],
      "commonMistakes": [
        "Assuming String.substring() is O(1): in modern Java it creates a new char array copy, making it O(L) time and space.",
        "Using ArrayList.contains() inside a loop, resulting in unintentional O(N^2) runtime instead of using a HashSet for O(N).",
        "Ignoring auxiliary call stack space in recursive algorithms when calculating space complexity."
      ],
      "interviewRelevance": "Every coding interview begins and ends with complexity analysis. Top tech companies expect precise Big-O derivation for both average and worst cases, plus memory footprint justifications.",
      "checkpoints": [
        {
          "id": "java-74-cp1",
          "label": "Derive time and auxiliary space complexity for iterative and recursive algorithms"
        },
        {
          "id": "java-74-cp2",
          "label": "Understand primitive vs boxed memory overhead and cache locality implications"
        },
        {
          "id": "java-74-cp3",
          "label": "Analyze standard library method costs (Arrays.sort, HashMap operations, String operations)"
        }
      ],
      "practiceExercises": [
        {
          "id": "java-74-ex1",
          "title": "Analyze Collection Operations Complexity",
          "difficulty": "Beginner",
          "type": "conceptual",
          "prompt": "State the average and worst-case time complexity for: (1) ArrayList.get(i), (2) LinkedList.addFirst(), (3) HashMap.containsKey(k), (4) TreeSet.contains(v).",
          "solution": "1. ArrayList.get(i): Average O(1), Worst O(1) (direct index arithmetic).\n2. LinkedList.addFirst(): Average O(1), Worst O(1) (pointer updates).\n3. HashMap.containsKey(k): Average O(1), Worst O(log N) since Java 8 red-black tree bin conversion.\n4. TreeSet.contains(v): Average O(log N), Worst O(log N) (self-balancing Red-Black tree traversal).",
          "explanation": "Direct indexing is constant time, linked node prepend is constant time, hash maps are amortized constant time, and balanced trees guarantee logarithmic time."
        },
        {
          "id": "java-74-ex2",
          "title": "Optimize O(N^2) Pair Sum to O(N)",
          "difficulty": "Intermediate",
          "type": "coding",
          "prompt": "Given an int array and target sum, write an O(N) time and O(N) space method hasPairWithSum using a HashSet instead of nested loops.",
          "starterCode": "import java.util.*;\n\npublic class PairSum {\n    public static boolean hasPairWithSum(int[] nums, int target) {\n        // Implement O(N) lookup\n        return false;\n    }\n}",
          "solution": "import java.util.*;\n\npublic class PairSum {\n    public static boolean hasPairWithSum(int[] nums, int target) {\n        Set<Integer> seen = new HashSet<>();\n        for (int num : nums) {\n            int complement = target - num;\n            if (seen.contains(complement)) {\n                return true;\n            }\n            seen.add(num);\n        }\n        return false;\n    }\n}",
          "explanation": "By checking if the complement (target - num) exists in the HashSet before adding the current element, we solve the problem in a single O(N) pass with O(N) auxiliary space."
        },
        {
          "id": "java-74-ex3",
          "title": "Memory-Efficient Bitset Existence Checker",
          "difficulty": "Advanced",
          "type": "coding",
          "prompt": "Implement a memory-efficient presence checker for numbers 0 through 1,000,000 using primitive long[] bitwise operations instead of boolean[] or HashSet.",
          "starterCode": "public class FastBitSet {\n    private final long[] words;\n\n    public FastBitSet(int maxVal) {\n        this.words = new long[(maxVal >> 6) + 1];\n    }\n\n    public void add(int val) {\n        // Set bit\n    }\n\n    public boolean contains(int val) {\n        // Test bit\n        return false;\n    }\n}",
          "solution": "public class FastBitSet {\n    private final long[] words;\n\n    public FastBitSet(int maxVal) {\n        this.words = new long[(maxVal >> 6) + 1];\n    }\n\n    public void add(int val) {\n        int wordIndex = val >> 6; // val / 64\n        int bitOffset = val & 63; // val % 64\n        words[wordIndex] |= (1L << bitOffset);\n    }\n\n    public boolean contains(int val) {\n        int wordIndex = val >> 6;\n        int bitOffset = val & 63;\n        return (words[wordIndex] & (1L << bitOffset)) != 0;\n    }\n}",
          "explanation": "A boolean[] array uses 1 byte per boolean (1 MB for 1 million entries). A primitive long[] bitset packs 64 booleans per long, consuming only ~15.6 KB of heap space (64x memory savings)."
        }
      ],
      "quizQuestions": [
        {
          "id": "java-74-q1",
          "question": "What is the theoretical worst-case time complexity of HashMap.get(key) in Java 8+ when hash collisions occur on the same bucket?",
          "options": [
            "O(1)",
            "O(log N)",
            "O(N)",
            "O(N^2)"
          ],
          "correctOptionIndex": 1,
          "explanation": "In Java 8+, hash buckets that exceed 8 colliding entries are transformed from linked lists (O(N)) into balanced Red-Black trees (TreeNode), guaranteeing O(log N) worst-case lookup."
        },
        {
          "id": "java-74-q2",
          "question": "Why does an Integer[1000] array consume significantly more heap memory than an int[1000] array in a 64-bit JVM?",
          "options": [
            "Because int is 64-bit while Integer is 128-bit",
            "Because Integer[] contains 1000 separate heap object allocations with headers in addition to 1000 references",
            "Because Java compresses int arrays but never compresses object arrays",
            "Because arrays in Java always double their internal capacity automatically"
          ],
          "correctOptionIndex": 1,
          "explanation": "An int[1000] array is a single contiguous block of 4000 bytes + header. An Integer[1000] array holds 1000 reference pointers (4-8 bytes each) pointing to 1000 separate Integer objects (24 bytes each)."
        }
      ],
      "revisionNotes": [
        "Big-O describes upper bound asymptotic behavior; constant factors matter in production.",
        "Java 8+ converts crowded HashMap bins from LinkedList (O(N)) to Red-Black Tree (O(log N)).",
        "Primitive arrays save up to 80-90% memory over boxed object collections and maximize CPU L1/L2 cache hits."
      ],
      "moduleId": "java-m6",
      "moduleNumber": 6,
      "moduleTitle": "Java Problem Solving",
      "language": "java"
    },
    {
      "id": "java-75-prefix-sums",
      "topicNumber": 75,
      "title": "Array Patterns, Prefix Sums & Difference Arrays",
      "level": "Intermediate",
      "whyItMatters": "Prefix sums reduce repetitive range sum queries from O(N) to O(1) time. Combined with difference arrays, range updates on static arrays can be batched in O(1) time instead of modifying entire subarrays.",
      "explanation": "1. 1D Prefix Sum Concept:\nGiven an array nums of length N, the prefix sum array pref of size N+1 stores cumulative sums:\n- pref[0] = 0\n- pref[i] = pref[i-1] + nums[i-1] for i from 1 to N.\n- Any range sum from index left to right (0-indexed inclusive) equals: pref[right + 1] - pref[left] in O(1) time!\n\n2. Prefix Sum + Hash Map (The Subarray Sum equals K pattern):\nTo find continuous subarrays summing to K:\n- Maintain running prefix sum currSum.\n- We need an earlier prefix sum such that: currSum - prevSum = K => prevSum = currSum - K.\n- Use a HashMap to store frequency of each prefix sum seen so far, initialized with map.put(0, 1).\n\n3. Difference Array Pattern (O(1) Range Updates):\nWhen you have repeated operations adding value val to subarray nums[left..right]:\n- Define difference array: diff[i] = nums[i] - nums[i-1] (with diff[0] = nums[0]).\n- To add val to range [left, right]:\n  1. diff[left] += val;\n  2. If right + 1 < N, diff[right + 1] -= val;\n- After all updates, calculate the running prefix sum of diff to restore the updated array in a single O(N) pass!",
      "syntaxAndStructure": "// Building prefix sum array:\nlong[] pref = new long[n + 1];\nfor (int i = 0; i < n; i++) pref[i + 1] = pref[i] + nums[i];\nlong rangeSum = pref[r + 1] - pref[l];",
      "codeExamples": [
        {
          "title": "O(1) Range Sum Queries using Prefix Sums",
          "code": "public class PrefixSumDemo {\n    private final long[] pref;\n\n    public PrefixSumDemo(int[] nums) {\n        pref = new long[nums.length + 1];\n        for (int i = 0; i < nums.length; i++) {\n            pref[i + 1] = pref[i] + nums[i];\n        }\n    }\n\n    public long queryRange(int left, int right) {\n        return pref[right + 1] - pref[left];\n    }\n\n    public static void main(String[] args) {\n        int[] nums = {2, 4, 1, 7, 3, 9};\n        PrefixSumDemo solver = new PrefixSumDemo(nums);\n\n        System.out.println(\"Sum [1..3] (4+1+7): \" + solver.queryRange(1, 3));\n        System.out.println(\"Sum [0..5] (total): \" + solver.queryRange(0, 5));\n    }\n}",
          "expectedOutput": "Sum [1..3] (4+1+7): 12\nSum [0..5] (total): 26",
          "explanation": "Preprocessing takes O(N) time and O(N) space. Each subsequent query is resolved in strictly O(1) arithmetic operations without looping."
        },
        {
          "title": "Difference Array for Multiple Range Updates in O(1) per Query",
          "code": "import java.util.Arrays;\n\npublic class DifferenceArrayDemo {\n    public static int[] applyRangeUpdates(int length, int[][] updates) {\n        int[] diff = new int[length + 1];\n\n        // Apply each update [left, right, val] in O(1)\n        for (int[] u : updates) {\n            int left = u[0], right = u[1], val = u[2];\n            diff[left] += val;\n            if (right + 1 < length) {\n                diff[right + 1] -= val;\n            }\n        }\n\n        // Reconstruct array via prefix sum in O(N)\n        int[] result = new int[length];\n        int running = 0;\n        for (int i = 0; i < length; i++) {\n            running += diff[i];\n            result[i] = running;\n        }\n        return result;\n    }\n\n    public static void main(String[] args) {\n        int[][] updates = {\n            {0, 2, 3},\n            {1, 4, 2},\n            {2, 3, 5}\n        };\n\n        int[] finalArr = applyRangeUpdates(5, updates);\n        System.out.println(\"Result after batch updates: \" + Arrays.toString(finalArr));\n    }\n}",
          "expectedOutput": "Result after batch updates: [3, 5, 10, 7, 2]",
          "explanation": "Each update takes O(1) time by bumping diff[left] and subtracting from diff[right+1]. Final reconstruction takes a single O(N) scan, resulting in O(N + Q) instead of O(N * Q)."
        }
      ],
      "realWorldApplications": [
        "Financial applications computing rolling revenue windows and cumulative account balances over historical transaction feeds.",
        "Flight and railway seat booking engines checking capacity across flight legs using difference arrays."
      ],
      "commonMistakes": [
        "Using 32-bit int for prefix sums when values can sum to > 2 billion, triggering integer overflow. Always use long for cumulative sums.",
        "Off-by-one errors in index mapping: 1-indexed prefix arrays pref[i + 1] prevent checking if (left == 0) edge cases.",
        "Forgetting to initialize map.put(0L, 1) in Subarray Sum equals K, missing valid subarrays starting at index 0."
      ],
      "interviewRelevance": "Prefix sums combined with HashMap or Binary Search appear frequently in Google, Amazon, and Meta interviews (e.g., Subarray Sum Equals K, Continuous Subarray Sum, Corporate Flight Bookings).",
      "checkpoints": [
        {
          "id": "java-75-cp1",
          "label": "Construct 1D prefix sum arrays and execute O(1) range sum queries"
        },
        {
          "id": "java-75-cp2",
          "label": "Solve Subarray Sum Equals K in O(N) using running sum and HashMap"
        },
        {
          "id": "java-75-cp3",
          "label": "Apply difference arrays for O(1) range increments on static arrays"
        }
      ],
      "practiceExercises": [
        {
          "id": "java-75-ex1",
          "title": "Compute Range Sum of Array",
          "difficulty": "Beginner",
          "type": "coding",
          "prompt": "Build a NumArray class with a constructor accepting an int[] and a sumRange(int left, int right) method operating in O(1) time.",
          "starterCode": "public class NumArray {\n    public NumArray(int[] nums) {\n        // Preprocess prefix sum\n    }\n    public int sumRange(int left, int right) {\n        return 0;\n    }\n}",
          "solution": "public class NumArray {\n    private final int[] prefix;\n\n    public NumArray(int[] nums) {\n        prefix = new int[nums.length + 1];\n        for (int i = 0; i < nums.length; i++) {\n            prefix[i + 1] = prefix[i] + nums[i];\n        }\n    }\n\n    public int sumRange(int left, int right) {\n        return prefix[right + 1] - prefix[left];\n    }\n}",
          "explanation": "prefix[i + 1] holds the sum of nums[0..i]. Thus sumRange(left, right) is simply prefix[right + 1] - prefix[left]."
        },
        {
          "id": "java-75-ex2",
          "title": "Subarray Sum Equals K",
          "difficulty": "Intermediate",
          "type": "coding",
          "prompt": "Given an array of integers nums and an integer k, return the total number of continuous subarrays whose sum equals to k.",
          "starterCode": "import java.util.*;\n\npublic class SubarraySumK {\n    public static int subarraySum(int[] nums, int k) {\n        return 0;\n    }\n}",
          "solution": "import java.util.*;\n\npublic class SubarraySumK {\n    public static int subarraySum(int[] nums, int k) {\n        int count = 0;\n        int currentSum = 0;\n        Map<Integer, Integer> prefixCounts = new HashMap<>();\n        prefixCounts.put(0, 1);\n\n        for (int num : nums) {\n            currentSum += num;\n            if (prefixCounts.containsKey(currentSum - k)) {\n                count += prefixCounts.get(currentSum - k);\n            }\n            prefixCounts.put(currentSum, prefixCounts.getOrDefault(currentSum, 0) + 1);\n        }\n        return count;\n    }\n}",
          "explanation": "If currentSum - previousSum = k, then the subarray between those two points has sum k. Storing counts in a HashMap gives O(N) time and O(N) space."
        },
        {
          "id": "java-75-ex3",
          "title": "Corporate Flight Bookings (Difference Array)",
          "difficulty": "Advanced",
          "type": "coding",
          "prompt": "There are n flights labeled from 1 to n. Given an array of bookings where bookings[i] = [first, last, seats], return an array of length n representing seats booked per flight.",
          "starterCode": "public class FlightBookings {\n    public static int[] corpFlightBookings(int[][] bookings, int n) {\n        return new int[n];\n    }\n}",
          "solution": "public class FlightBookings {\n    public static int[] corpFlightBookings(int[][] bookings, int n) {\n        int[] diff = new int[n];\n\n        for (int[] b : bookings) {\n            int first = b[0] - 1;\n            int last = b[1] - 1;\n            int seats = b[2];\n\n            diff[first] += seats;\n            if (last + 1 < n) {\n                diff[last + 1] -= seats;\n            }\n        }\n\n        for (int i = 1; i < n; i++) {\n            diff[i] += diff[i - 1];\n        }\n        return diff;\n    }\n}",
          "explanation": "Difference array allows marking the seat addition at index first and negation at last+1 in O(1) time. Accumulating prefix sums yields the answer in O(N + B) time."
        }
      ],
      "quizQuestions": [
        {
          "id": "java-75-q1",
          "question": "Why do we typically allocate prefix arrays with size N + 1 instead of N?",
          "options": [
            "Because Java requires arrays to have an even length",
            "To represent an empty prefix sum (0) at index 0, eliminating boundary checks when left == 0",
            "To reserve memory for the garbage collector",
            "To prevent OutOfMemoryError during array cloning"
          ],
          "correctOptionIndex": 1,
          "explanation": "A size N + 1 array with pref[0] = 0 allows querying range [left, right] as pref[right + 1] - pref[left] uniformly without needing an if (left == 0) branch."
        },
        {
          "id": "java-75-q2",
          "question": "What is the time complexity of applying Q range updates to an array of size N using a difference array?",
          "options": [
            "O(N * Q)",
            "O(Q * log N)",
            "O(N + Q)",
            "O(N * log Q)"
          ],
          "correctOptionIndex": 2,
          "explanation": "Each of the Q updates takes O(1) time to modify two points in the difference array. The final prefix sum scan takes O(N), giving total O(N + Q) time."
        }
      ],
      "revisionNotes": [
        "Prefix sums turn O(N) range queries into O(1).",
        "Always use long for cumulative sums when element values can sum beyond Integer.MAX_VALUE.",
        "Difference arrays convert O(N) range update operations into O(1) endpoint updates with a final O(N) prefix sweep."
      ],
      "moduleId": "java-m6",
      "moduleNumber": 6,
      "moduleTitle": "Java Problem Solving",
      "language": "java"
    },
    {
      "id": "java-76-hashing",
      "topicNumber": 76,
      "title": "Hashing Patterns, Frequency Counting & Anagram Analysis",
      "level": "Beginner",
      "whyItMatters": "Hash tables and frequency arrays form the foundation of countless interview solutions. Learning when to use primitive fixed arrays (int[26]) versus HashMap<K, V> optimizes execution speed by up to 20x.",
      "explanation": "1. Fixed-Size Alphabet Hashing (int[26]):\nWhen the input character set is constrained (e.g., lowercase English letters a-z), a primitive int[26] array is dramatically faster than HashMap<Character, Integer> because:\n- Zero object allocation or boxing overhead.\n- Direct O(1) index computation via c - 'a'.\n- Cache lines load the entire 104-byte array directly into CPU L1 cache.\n\n2. Group Anagrams Pattern:\nTwo words are anagrams if and only if their sorted character representation or their character frequency counts match.\n- Canonical Key 1: Sort characters (Arrays.sort(charArr)) -> O(K log K) per word.\n- Canonical Key 2: Character frequency string (e.g., #1#0#2...#0) -> O(K) per word.\nUse Map<String, List<String>> to group matching keys.\n\n3. Longest Consecutive Sequence Pattern:\nGiven an unsorted array, find length of longest consecutive elements sequence in O(N) time:\n- Insert all numbers into a HashSet<Integer>.\n- Only start counting streaks from numbers where !set.contains(num - 1) (streak starters).\n- Each element is visited at most twice, guaranteeing strict O(N) time complexity.",
      "syntaxAndStructure": "// Primitive frequency array for lowercase letters:\nint[] freq = new int[26];\nfor (char c : s.toCharArray()) freq[c - 'a']++;",
      "codeExamples": [
        {
          "title": "Group Anagrams using Frequency Fingerprints",
          "code": "import java.util.*;\n\npublic class GroupAnagramsDemo {\n    public static List<List<String>> groupAnagrams(String[] strs) {\n        Map<String, List<String>> map = new HashMap<>();\n\n        for (String s : strs) {\n            int[] count = new int[26];\n            for (char c : s.toCharArray()) {\n                count[c - 'a']++;\n            }\n\n            // Create canonical fingerprint string: e.g. #1#0#2...\n            StringBuilder sb = new StringBuilder();\n            for (int i = 0; i < 26; i++) {\n                sb.append('#').append(count[i]);\n            }\n            String key = sb.toString();\n\n            map.computeIfAbsent(key, k -> new ArrayList<>()).add(s);\n        }\n\n        return new ArrayList<>(map.values());\n    }\n\n    public static void main(String[] args) {\n        String[] words = {\"eat\", \"tea\", \"tan\", \"ate\", \"nat\", \"bat\"};\n        List<List<String>> groups = groupAnagrams(words);\n        for (List<String> group : groups) {\n            System.out.println(group);\n        }\n    }\n}",
          "expectedOutput": "[eat, tea, ate]\n[bat]\n[tan, nat]",
          "explanation": "Words sharing the same letter frequencies generate identical string fingerprints, clustering all anagrams into the same bucket in O(N * K) time."
        },
        {
          "title": "Longest Consecutive Sequence in O(N) using HashSet",
          "code": "import java.util.*;\n\npublic class LongestConsecutiveDemo {\n    public static int longestConsecutive(int[] nums) {\n        Set<Integer> numSet = new HashSet<>();\n        for (int num : nums) {\n            numSet.add(num);\n        }\n\n        int longestStreak = 0;\n\n        for (int num : numSet) {\n            // Check if num is the start of a sequence\n            if (!numSet.contains(num - 1)) {\n                int currentNum = num;\n                int currentStreak = 1;\n\n                while (numSet.contains(currentNum + 1)) {\n                    currentNum++;\n                    currentStreak++;\n                }\n\n                longestStreak = Math.max(longestStreak, currentStreak);\n            }\n        }\n\n        return longestStreak;\n    }\n\n    public static void main(String[] args) {\n        int[] nums = {100, 4, 200, 1, 3, 2};\n        System.out.println(\"Longest streak: \" + longestConsecutive(nums));\n    }\n}",
          "expectedOutput": "Longest streak: 4",
          "explanation": "The streak [1, 2, 3, 4] has length 4. By only initiating count loops on streak starters (!numSet.contains(num - 1)), every element is visited O(1) times."
        }
      ],
      "realWorldApplications": [
        "Search engines detecting duplicate or plagiarized articles using shingles and min-hashing.",
        "Log processing and analytics engines calculating top URL paths and active user sessions."
      ],
      "commonMistakes": [
        "Iterating through the original array instead of the HashSet in Longest Consecutive Sequence, repeating identical streaks and degrading to O(N^2).",
        "Using char[26] frequency array with non-ASCII or mixed-case Unicode characters, leading to ArrayIndexOutOfBoundsException. Check constraints first.",
        "Creating string keys by simple concatenation without delimiters (e.g., count 1 followed by 11 can clash with count 11 followed by 1). Always use a delimiter."
      ],
      "interviewRelevance": "Valid Anagram, Group Anagrams, Two Sum, and Longest Consecutive Sequence are classic interview staples at every tech firm.",
      "checkpoints": [
        {
          "id": "java-76-cp1",
          "label": "Use primitive int[26] frequency arrays for bounded alphabet problems"
        },
        {
          "id": "java-76-cp2",
          "label": "Group anagrams using frequency fingerprints or sorted strings"
        },
        {
          "id": "java-76-cp3",
          "label": "Identify streak-starter condition in HashSet algorithms to achieve O(N) time"
        }
      ],
      "practiceExercises": [
        {
          "id": "java-76-ex1",
          "title": "Valid Anagram Check",
          "difficulty": "Beginner",
          "type": "coding",
          "prompt": "Given two strings s and t consisting of lowercase English letters, return true if t is an anagram of s, and false otherwise.",
          "starterCode": "public class AnagramCheck {\n    public static boolean isAnagram(String s, String t) {\n        return false;\n    }\n}",
          "solution": "public class AnagramCheck {\n    public static boolean isAnagram(String s, String t) {\n        if (s.length() != t.length()) return false;\n        int[] counts = new int[26];\n        for (int i = 0; i < s.length(); i++) {\n            counts[s.charAt(i) - 'a']++;\n            counts[t.charAt(i) - 'a']--;\n        }\n        for (int c : counts) {\n            if (c != 0) return false;\n        }\n        return true;\n    }\n}",
          "explanation": "Incrementing for characters in s and decrementing for characters in t checks equality in a single pass. If all counts return to 0, they are anagrams."
        },
        {
          "id": "java-76-ex2",
          "title": "Top K Frequent Elements",
          "difficulty": "Intermediate",
          "type": "coding",
          "prompt": "Given an integer array nums and an integer k, return the k most frequent elements. The algorithm must be better than O(N log N).",
          "starterCode": "import java.util.*;\n\npublic class TopKFrequent {\n    public static int[] topKFrequent(int[] nums, int k) {\n        return new int[k];\n    }\n}",
          "solution": "import java.util.*;\n\npublic class TopKFrequent {\n    public static int[] topKFrequent(int[] nums, int k) {\n        Map<Integer, Integer> freqMap = new HashMap<>();\n        for (int num : nums) {\n            freqMap.put(num, freqMap.getOrDefault(num, 0) + 1);\n        }\n\n        // Min-heap based on frequency: O(N log K)\n        PriorityQueue<Integer> heap = new PriorityQueue<>(\n            Comparator.comparingInt(freqMap::get)\n        );\n\n        for (int num : freqMap.keySet()) {\n            heap.offer(num);\n            if (heap.size() > k) {\n                heap.poll();\n            }\n        }\n\n        int[] result = new int[k];\n        for (int i = k - 1; i >= 0; i--) {\n            result[i] = heap.poll();\n        }\n        return result;\n    }\n}",
          "explanation": "Using a min-heap of size K bounded by frequency yields O(N log K) time complexity, which beats full sorting O(N log N)."
        },
        {
          "id": "java-76-ex3",
          "title": "Subarray Sums Divisible by K",
          "difficulty": "Advanced",
          "type": "coding",
          "prompt": "Given an integer array nums and an integer k, return the number of non-empty subarrays that have a sum divisible by k. Handle negative numbers correctly.",
          "starterCode": "public class SubarrayDivK {\n    public static int subarraysDivByK(int[] nums, int k) {\n        return 0;\n    }\n}",
          "solution": "public class SubarrayDivK {\n    public static int subarraysDivByK(int[] nums, int k) {\n        int[] remainderCounts = new int[k];\n        remainderCounts[0] = 1; // Empty prefix sum % k is 0\n\n        int runningSum = 0;\n        int count = 0;\n\n        for (int num : nums) {\n            runningSum += num;\n            int rem = runningSum % k;\n            if (rem < 0) rem += k; // Normalize negative remainders\n\n            count += remainderCounts[rem];\n            remainderCounts[rem]++;\n        }\n\n        return count;\n    }\n}",
          "explanation": "If two prefix sums have the identical remainder modulo k, the subarray between them must sum to a multiple of k. Normalizing negative remainders via (rem + k) % k ensures correct array indexing."
        }
      ],
      "quizQuestions": [
        {
          "id": "java-76-q1",
          "question": "Why is an int[26] array preferred over HashMap<Character, Integer> when counting frequencies of lowercase English letters?",
          "options": [
            "Because HashMap does not support char keys in Java",
            "Because int[26] eliminates object allocation, boxing, and hash collisions while keeping data contiguous in CPU cache",
            "Because int[26] automatically sorts elements alphabetically",
            "Because HashMap cannot store more than 16 elements without re-allocating"
          ],
          "correctOptionIndex": 1,
          "explanation": "int[26] consumes a mere 104 bytes of contiguous primitive memory with direct index computation (c - 'a'), completely bypassing Integer autoboxing and hash bucket collisions."
        },
        {
          "id": "java-76-q2",
          "question": "In the Longest Consecutive Sequence algorithm, why do we check !numSet.contains(num - 1)?",
          "options": [
            "To ensure numbers are sorted",
            "To ensure we only start counting from the beginning of a consecutive streak, avoiding O(N^2) redundant counting",
            "To prevent NullPointerException in HashSet",
            "To skip negative numbers"
          ],
          "correctOptionIndex": 1,
          "explanation": "If num - 1 is present in the set, num cannot be the start of a streak. Checking this ensures each streak is traversed only once, guaranteeing overall O(N) time."
        }
      ],
      "revisionNotes": [
        "Use int[26] or int[128] for fixed character alphabets to achieve maximum throughput.",
        "Group Anagrams can use sorted strings or delimited frequency fingerprints as map keys.",
        "When working with modular arithmetic and negative integers in Java, normalize remainders using (rem % k + k) % k."
      ],
      "moduleId": "java-m6",
      "moduleNumber": 6,
      "moduleTitle": "Java Problem Solving",
      "language": "java"
    },
    {
      "id": "java-77-two-pointers",
      "topicNumber": 77,
      "title": "Two-Pointer Techniques: Inward, Directional & Fast-Slow",
      "level": "Intermediate",
      "whyItMatters": "Two-pointer patterns transform naive O(N^2) search spaces into linear O(N) scans by exploiting monotonicity and sorted array properties, using constant O(1) auxiliary space.",
      "explanation": "1. Opposite-Directional (Converging) Pointers:\n- Place one pointer at left = 0 and another at right = n - 1.\n- At each step, evaluate condition (e.g., arr[left] + arr[right] vs target, or Math.min(height[left], height[right]) * (right - left)).\n- Increment left or decrement right monotonically based on problem constraints.\n- Solves Two Sum II (sorted array), Container With Most Water, Trapping Rain Water, and 3Sum.\n\n2. Equi-Directional (Fast & Slow) Pointers:\n- Slow pointer maintains the boundary of processed valid elements; fast pointer explores ahead.\n- Classic for in-place array modification: Remove Duplicates from Sorted Array, Move Zeroes.\n- In Linked Lists: Floyd’s Cycle-Finding Algorithm (detecting cycles and finding middle node).\n\n3. 3Sum (Sorting + Converging Pointers):\n- Sort the array in O(N log N).\n- Iterate with pointer i from 0 to N-3.\n- For each fixed nums[i], solve Two Sum II for the remaining subarray using left = i + 1 and right = N - 1.\n- Skip duplicates on i, left, and right to guarantee unique triplets.",
      "syntaxAndStructure": "// Converging two pointers on sorted array:\nint left = 0, right = nums.length - 1;\nwhile (left < right) {\n    int sum = nums[left] + nums[right];\n    if (sum == target) return new int[]{left, right};\n    else if (sum < target) left++;\n    else right--;\n}",
      "codeExamples": [
        {
          "title": "Container With Most Water in O(N) Time and O(1) Space",
          "code": "public class ContainerWithMostWater {\n    public static int maxArea(int[] height) {\n        int left = 0, right = height.length - 1;\n        int maxWater = 0;\n\n        while (left < right) {\n            int h = Math.min(height[left], height[right]);\n            int width = right - left;\n            maxWater = Math.max(maxWater, h * width);\n\n            // Move the pointer with the shorter height inward\n            if (height[left] < height[right]) {\n                left++;\n            } else {\n                right--;\n            }\n        }\n\n        return maxWater;\n    }\n\n    public static void main(String[] args) {\n        int[] heights = {1, 8, 6, 2, 5, 4, 8, 3, 7};\n        System.out.println(\"Max water volume: \" + maxArea(heights));\n    }\n}",
          "expectedOutput": "Max water volume: 49",
          "explanation": "Width decreases with every step. To find a larger area, we must seek a taller boundary by advancing the shorter line inward. Running time is O(N) and auxiliary space is O(1)."
        },
        {
          "title": "Remove Duplicates from Sorted Array In-Place",
          "code": "import java.util.Arrays;\n\npublic class RemoveDuplicatesDemo {\n    public static int removeDuplicates(int[] nums) {\n        if (nums.length == 0) return 0;\n\n        int slow = 0; // Boundary of unique elements\n\n        for (int fast = 1; fast < nums.length; fast++) {\n            if (nums[fast] != nums[slow]) {\n                slow++;\n                nums[slow] = nums[fast];\n            }\n        }\n\n        return slow + 1; // Number of unique elements\n    }\n\n    public static void main(String[] args) {\n        int[] nums = {0, 0, 1, 1, 1, 2, 2, 3, 3, 4};\n        int k = removeDuplicates(nums);\n        System.out.println(\"Unique count: \" + k);\n        System.out.println(\"Modified array prefix: \" + Arrays.toString(Arrays.copyOf(nums, k)));\n    }\n}",
          "expectedOutput": "Unique count: 5\nModified array prefix: [0, 1, 2, 3, 4]",
          "explanation": "The fast pointer scans ahead. Whenever a new unique number is encountered, slow advances and overwrites in-place without auxiliary arrays."
        }
      ],
      "realWorldApplications": [
        "Video streaming codecs synchronizing audio and video buffer timestamps.",
        "Database merge-join operations scanning two sorted index segments simultaneously in O(N + M)."
      ],
      "commonMistakes": [
        "Applying converging two-pointer sum logic to unsorted arrays without sorting them first.",
        "Failing to skip duplicate values in 3Sum, producing duplicate triplets in interview results.",
        "Infinite while-loops caused by missing left++ or right-- inside conditional branches."
      ],
      "interviewRelevance": "3Sum, 4Sum, Container With Most Water, Trapping Rain Water, and Move Zeroes are among the top 10 most frequently asked interview problems at FAANG companies.",
      "checkpoints": [
        {
          "id": "java-77-cp1",
          "label": "Implement converging two pointers on sorted arrays for O(N) pair finding"
        },
        {
          "id": "java-77-cp2",
          "label": "Use slow/fast read-write pointers for in-place array transformations"
        },
        {
          "id": "java-77-cp3",
          "label": "Solve 3Sum in O(N^2) time while properly deduplicating elements"
        }
      ],
      "practiceExercises": [
        {
          "id": "java-77-ex1",
          "title": "Reverse String In-Place",
          "difficulty": "Beginner",
          "type": "coding",
          "prompt": "Write a function that reverses a char[] array in-place with O(1) extra memory using two pointers.",
          "starterCode": "public class ReverseString {\n    public static void reverseString(char[] s) {\n        // In-place reversal\n    }\n}",
          "solution": "public class ReverseString {\n    public static void reverseString(char[] s) {\n        int left = 0, right = s.length - 1;\n        while (left < right) {\n            char temp = s[left];\n            s[left] = s[right];\n            s[right] = temp;\n            left++;\n            right--;\n        }\n    }\n}",
          "explanation": "Swapping characters at left and right pointers while moving them toward the center reverses the array in O(N) time and O(1) space."
        },
        {
          "id": "java-77-ex2",
          "title": "3Sum Problem",
          "difficulty": "Intermediate",
          "type": "coding",
          "prompt": "Given an integer array nums, return all triplets [nums[i], nums[j], nums[k]] such that i != j != k and nums[i] + nums[j] + nums[k] == 0. The solution set must not contain duplicate triplets.",
          "starterCode": "import java.util.*;\n\npublic class ThreeSum {\n    public static List<List<Integer>> threeSum(int[] nums) {\n        return new ArrayList<>();\n    }\n}",
          "solution": "import java.util.*;\n\npublic class ThreeSum {\n    public static List<List<Integer>> threeSum(int[] nums) {\n        Arrays.sort(nums);\n        List<List<Integer>> result = new ArrayList<>();\n\n        for (int i = 0; i < nums.length - 2; i++) {\n            if (i > 0 && nums[i] == nums[i - 1]) continue; // Skip duplicate i\n\n            int left = i + 1, right = nums.length - 1;\n            while (left < right) {\n                int sum = nums[i] + nums[left] + nums[right];\n                if (sum == 0) {\n                    result.add(Arrays.asList(nums[i], nums[left], nums[right]));\n                    while (left < right && nums[left] == nums[left + 1]) left++;\n                    while (left < right && nums[right] == nums[right - 1]) right--;\n                    left++;\n                    right--;\n                } else if (sum < 0) {\n                    left++;\n                } else {\n                    right--;\n                }\n            }\n        }\n\n        return result;\n    }\n}",
          "explanation": "Sorting takes O(N log N). Iterating with an outer loop and two-pointer inner scan takes O(N^2). Skipping identical neighbors avoids generating duplicate triplets."
        },
        {
          "id": "java-77-ex3",
          "title": "Trapping Rain Water (Two Pointers)",
          "difficulty": "Advanced",
          "type": "coding",
          "prompt": "Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining using O(1) extra space.",
          "starterCode": "public class TrappingRainWater {\n    public static int trap(int[] height) {\n        return 0;\n    }\n}",
          "solution": "public class TrappingRainWater {\n    public static int trap(int[] height) {\n        if (height == null || height.length == 0) return 0;\n\n        int left = 0, right = height.length - 1;\n        int leftMax = 0, rightMax = 0;\n        int totalWater = 0;\n\n        while (left < right) {\n            if (height[left] < height[right]) {\n                if (height[left] >= leftMax) {\n                    leftMax = height[left];\n                } else {\n                    totalWater += leftMax - height[left];\n                }\n                left++;\n            } else {\n                if (height[right] >= rightMax) {\n                    rightMax = height[right];\n                } else {\n                    totalWater += rightMax - height[right];\n                }\n                right--;\n            }\n        }\n\n        return totalWater;\n    }\n}",
          "explanation": "Water trapped at index i is determined by min(leftMax, rightMax) - height[i]. Since height[left] < height[right], leftMax is guaranteed to be the limiting boundary, allowing immediate calculation in O(1) auxiliary space."
        }
      ],
      "quizQuestions": [
        {
          "id": "java-77-q1",
          "question": "In the Container With Most Water problem, why do we always move the pointer pointing to the shorter vertical line?",
          "options": [
            "Because moving the taller line can never produce a larger area than the current one",
            "Because the shorter line is always closer to the center",
            "Because the array is guaranteed to be sorted",
            "Because moving the taller line throws an exception"
          ],
          "correctOptionIndex": 0,
          "explanation": "Area is limited by the shorter line: min(h1, h2) * width. Moving the taller line decreases width while the height cannot exceed the existing short line, making an increased area mathematically impossible."
        },
        {
          "id": "java-77-q2",
          "question": "What is the auxiliary space complexity of solving Trapping Rain Water using the converging two-pointer technique?",
          "options": [
            "O(N)",
            "O(log N)",
            "O(1)",
            "O(N^2)"
          ],
          "correctOptionIndex": 2,
          "explanation": "Unlike dynamic programming solutions requiring two O(N) prefix/suffix max arrays, the two-pointer approach maintains only running leftMax and rightMax variables in O(1) space."
        }
      ],
      "revisionNotes": [
        "Two pointers reduce O(N^2) pair searches to O(N) on sorted arrays.",
        "In-place array modifications (e.g. Remove Duplicates) rely on slow/fast read/write pointers.",
        "Deduplication in 3Sum requires skipping identical consecutive elements for both the outer and inner pointers."
      ],
      "moduleId": "java-m6",
      "moduleNumber": 6,
      "moduleTitle": "Java Problem Solving",
      "language": "java"
    },
    {
      "id": "java-78-sliding-window",
      "topicNumber": 78,
      "title": "Sliding Window Patterns: Fixed Size & Dynamic Expanding Windows",
      "level": "Intermediate",
      "whyItMatters": "Sliding window avoids recomputing shared subarray overlap. Instead of recalculating sums or character frequencies across N windows in O(N * K), the window updates boundary states in O(1) per step, yielding overall O(N) runtime.",
      "explanation": "1. Fixed-Size Sliding Window (Length K):\n- Compute the initial state for the first window of size K: [0..K-1].\n- Slide the window from left to right one step at a time:\n  - Add incoming element nums[i].\n  - Remove outgoing element nums[i - K].\n- Compare and update global metric in O(1) per step.\n\n2. Dynamically Expanding / Contracting Window:\n- Used when seeking longest or shortest valid contiguous subarray/substring.\n- Template:\n  1. Expand: Advance the right pointer, including s.charAt(right) in state (map, set, or count array).\n  2. Validate / Shrink: While the window violates the required condition (e.g., repeating character found or sum >= target), advance the left pointer and remove s.charAt(left) from state.\n  3. Record: Update the answer (e.g., maxLen = Math.max(maxLen, right - left + 1)).\n\n3. Optimized Last-Seen Lookup:\nInstead of shrinking left one by one with a while-loop, store the last-seen index of each character in an int[128] array or Map<Character, Integer>. When a duplicate is seen, jump left directly: left = Math.max(left, lastSeen[c] + 1).",
      "syntaxAndStructure": "// Dynamic sliding window template:\nint left = 0;\nfor (int right = 0; right < s.length(); right++) {\n    // 1. expand window with s.charAt(right)\n    while (/* condition invalid */) {\n        // 2. shrink window with s.charAt(left)\n        left++;\n    }\n    // 3. update answer with window size (right - left + 1)\n}",
      "codeExamples": [
        {
          "title": "Longest Substring Without Repeating Characters in O(N)",
          "code": "import java.util.Arrays;\n\npublic class LongestSubstringDemo {\n    public static int lengthOfLongestSubstring(String s) {\n        int[] lastIndex = new int[128];\n        Arrays.fill(lastIndex, -1); // -1 indicates char has not been seen\n\n        int maxLen = 0;\n        int left = 0;\n\n        for (int right = 0; right < s.length(); right++) {\n            char c = s.charAt(right);\n\n            // If character was seen inside the current window, jump left pointer\n            if (lastIndex[c] >= left) {\n                left = lastIndex[c] + 1;\n            }\n\n            lastIndex[c] = right;\n            maxLen = Math.max(maxLen, right - left + 1);\n        }\n\n        return maxLen;\n    }\n\n    public static void main(String[] args) {\n        String s = \"abcabcbb\";\n        System.out.println(\"Longest unique substring length: \" + lengthOfLongestSubstring(s));\n    }\n}",
          "expectedOutput": "Longest unique substring length: 3",
          "explanation": "Using an int[128] direct-indexed ASCII table allows jumping the left pointer directly past the previous occurrence of c without an inner shrinking loop. Resulting time complexity is strictly O(N) and space is O(1) auxiliary."
        },
        {
          "title": "Minimum Size Subarray Sum (Target >= K)",
          "code": "public class MinSubArrayLenDemo {\n    public static int minSubArrayLen(int target, int[] nums) {\n        int left = 0;\n        int currentSum = 0;\n        int minLen = Integer.MAX_VALUE;\n\n        for (int right = 0; right < nums.length; right++) {\n            currentSum += nums[right];\n\n            // Shrink window while sum meets or exceeds target\n            while (currentSum >= target) {\n                minLen = Math.min(minLen, right - left + 1);\n                currentSum -= nums[left];\n                left++;\n            }\n        }\n\n        return minLen == Integer.MAX_VALUE ? 0 : minLen;\n    }\n\n    public static void main(String[] args) {\n        int[] nums = {2, 3, 1, 2, 4, 3};\n        System.out.println(\"Min length for sum >= 7: \" + minSubArrayLen(7, nums));\n    }\n}",
          "expectedOutput": "Min length for sum >= 7: 2",
          "explanation": "The subarray [4, 3] has sum 7 with length 2. Each element is added once and subtracted once, giving 2N operations = O(N) time and O(1) space."
        }
      ],
      "realWorldApplications": [
        "Rate limiters (Sliding Window Log / Counter) tracking user API requests within a 60-second window.",
        "Network packet monitoring calculating rolling bandwidth throughput across a continuous stream."
      ],
      "commonMistakes": [
        "Forgetting Math.max(left, lastSeen[c] + 1) when jumping left: if lastSeen was before the current left boundary, left must NOT move backward!",
        "Assuming the inner while-loop makes the algorithm O(N^2): because left only moves forward and never resets, each index is visited at most twice (O(N) amortized).",
        "Off-by-one errors calculating window size: the number of elements between indices left and right inclusive is right - left + 1."
      ],
      "interviewRelevance": "Longest Substring Without Repeating Characters, Minimum Window Substring, and Fruit Into Baskets are core LeetCode Medium/Hard favorites asked in almost every technical screen.",
      "checkpoints": [
        {
          "id": "java-78-cp1",
          "label": "Implement fixed-size sliding windows updating state in O(1) per step"
        },
        {
          "id": "java-78-cp2",
          "label": "Implement dynamic expanding/contracting windows for shortest and longest subarray problems"
        },
        {
          "id": "java-78-cp3",
          "label": "Use primitive int[128] last-seen arrays to jump left pointer in O(1)"
        }
      ],
      "practiceExercises": [
        {
          "id": "java-78-ex1",
          "title": "Maximum Average Subarray I",
          "difficulty": "Beginner",
          "type": "coding",
          "prompt": "Given an integer array nums consisting of n elements, and an integer k, find a contiguous subarray whose length is equal to k that has the maximum average value.",
          "starterCode": "public class MaxAverageSubarray {\n    public static double findMaxAverage(int[] nums, int k) {\n        return 0.0;\n    }\n}",
          "solution": "public class MaxAverageSubarray {\n    public static double findMaxAverage(int[] nums, int k) {\n        long currentSum = 0;\n        for (int i = 0; i < k; i++) {\n            currentSum += nums[i];\n        }\n\n        long maxSum = currentSum;\n\n        for (int i = k; i < nums.length; i++) {\n            currentSum += nums[i] - nums[i - k];\n            maxSum = Math.max(maxSum, currentSum);\n        }\n\n        return (double) maxSum / k;\n    }\n}",
          "explanation": "Initialize window sum with first k elements. Then slide by adding nums[i] and removing nums[i - k] in O(N) total time."
        },
        {
          "id": "java-78-ex2",
          "title": "Max Consecutive Ones III",
          "difficulty": "Intermediate",
          "type": "coding",
          "prompt": "Given a binary array nums and an integer k, return the maximum number of consecutive 1s in the array if you can flip at most k 0s.",
          "starterCode": "public class MaxConsecutiveOnes {\n    public static int longestOnes(int[] nums, int k) {\n        return 0;\n    }\n}",
          "solution": "public class MaxConsecutiveOnes {\n    public static int longestOnes(int[] nums, int k) {\n        int left = 0, zeroCount = 0, maxLen = 0;\n\n        for (int right = 0; right < nums.length; right++) {\n            if (nums[right] == 0) {\n                zeroCount++;\n            }\n\n            while (zeroCount > k) {\n                if (nums[left] == 0) {\n                    zeroCount--;\n                }\n                left++;\n            }\n\n            maxLen = Math.max(maxLen, right - left + 1);\n        }\n\n        return maxLen;\n    }\n}",
          "explanation": "Dynamic sliding window where the window is valid as long as zeroCount <= k. When zeroCount > k, shrink from left until zeroCount <= k."
        },
        {
          "id": "java-78-ex3",
          "title": "Minimum Window Substring",
          "difficulty": "Advanced",
          "type": "coding",
          "prompt": "Given two strings s and t of lengths m and n, return the minimum window substring of s such that every character in t (including duplicates) is included in the window. Return \"\" if no such window exists.",
          "starterCode": "public class MinWindowSubstring {\n    public static String minWindow(String s, String t) {\n        return \"\";\n    }\n}",
          "solution": "public class MinWindowSubstring {\n    public static String minWindow(String s, String t) {\n        if (s.length() < t.length()) return \"\";\n\n        int[] targetCounts = new int[128];\n        for (char c : t.toCharArray()) targetCounts[c]++;\n\n        int[] windowCounts = new int[128];\n        int required = 0;\n        for (int count : targetCounts) if (count > 0) required++;\n\n        int formed = 0;\n        int left = 0, minLen = Integer.MAX_VALUE, startIdx = 0;\n\n        for (int right = 0; right < s.length(); right++) {\n            char c = s.charAt(right);\n            windowCounts[c]++;\n\n            if (targetCounts[c] > 0 && windowCounts[c] == targetCounts[c]) {\n                formed++;\n            }\n\n            while (left <= right && formed == required) {\n                if (right - left + 1 < minLen) {\n                    minLen = right - left + 1;\n                    startIdx = left;\n                }\n\n                char leftChar = s.charAt(left);\n                windowCounts[leftChar]--;\n                if (targetCounts[leftChar] > 0 && windowCounts[leftChar] < targetCounts[leftChar]) {\n                    formed--;\n                }\n                left++;\n            }\n        }\n\n        return minLen == Integer.MAX_VALUE ? \"\" : s.substring(startIdx, startIdx + minLen);\n    }\n}",
          "explanation": "Maintain count of matched distinct characters. Once all characters in t are matched (formed == required), contract the left edge to find the minimal enclosing window in O(S + T) time."
        }
      ],
      "quizQuestions": [
        {
          "id": "java-78-q1",
          "question": "Why does an expanding/contracting sliding window algorithm have O(N) time complexity despite having a nested while-loop?",
          "options": [
            "Because the while loop only runs if N is prime",
            "Because the right pointer advances N times and the left pointer advances at most N times across the entire algorithm execution",
            "Because Java optimizes while loops using SIMD instructions",
            "Because the inner loop breaks immediately on the first iteration"
          ],
          "correctOptionIndex": 1,
          "explanation": "Both left and right pointers strictly move from 0 to N. Since neither pointer ever moves backward, total pointer steps are at most 2N = O(N) amortized."
        },
        {
          "id": "java-78-q2",
          "question": "What is the formula for the number of elements in a window bounded by indices [left, right] inclusive?",
          "options": [
            "right - left",
            "right - left + 1",
            "right - left - 1",
            "(right + left) / 2"
          ],
          "correctOptionIndex": 1,
          "explanation": "For 0-indexed inclusive bounds [left, right], the length is right - left + 1 (e.g., indices 2 to 4 hold elements 2, 3, 4 = length 3)."
        }
      ],
      "revisionNotes": [
        "Fixed-size sliding windows add the new element and remove the trailing element in O(1).",
        "Dynamic sliding windows expand right until invalid, then shrink left until valid.",
        "Sliding window runs in amortized O(N) time because each element is visited at most twice (by right then left)."
      ],
      "moduleId": "java-m6",
      "moduleNumber": 6,
      "moduleTitle": "Java Problem Solving",
      "language": "java"
    },
    {
      "id": "java-79-binary-search",
      "topicNumber": 79,
      "title": "Binary Search & Variants (Lower/Upper Bound & Search Space Reduction)",
      "level": "Intermediate",
      "whyItMatters": "Binary Search reduces search spaces from O(N) to O(log N). Beyond sorted arrays, Binary Search on Answer optimizes complex feasibility problems (e.g., Koko eating bananas, capacity allocation, split array largest sum).",
      "explanation": "1. Avoiding Integer Overflow:\nNever write mid = (low + high) / 2 because low + high can exceed Integer.MAX_VALUE (2,147,483,647), causing integer overflow into negative values!\nAlways use: int mid = low + (high - low) / 2; or unsigned shift: int mid = (low + high) >>> 1;\n\n2. Lower Bound vs Upper Bound:\n- Lower Bound: First index where arr[i] >= target.\n  - if (arr[mid] >= target) high = mid; else low = mid + 1;\n- Upper Bound: First index where arr[i] > target.\n  - if (arr[mid] > target) high = mid; else low = mid + 1;\n\n3. Binary Search on Answer (Search Space Reduction):\nWhen asked to find the minimum possible maximum (or maximum possible minimum) value X:\n- If a candidate value X is feasible, can smaller (or larger) values also be feasible? (Monotonic predicate).\n- Define search range [low, high] over the possible answer space.\n- In each iteration, test feasibility with a greedy helper function canAchieve(mid).\n- If canAchieve(mid) is true, try better answers: high = mid; else low = mid + 1.\n- Runs in O(N * log(Range)) time.",
      "syntaxAndStructure": "// Lower bound binary search template:\nint low = 0, high = n;\nwhile (low < high) {\n    int mid = low + (high - low) / 2;\n    if (predicate(mid)) high = mid;\n    else low = mid + 1;\n}\nreturn low;",
      "codeExamples": [
        {
          "title": "Safe Binary Search with Lower Bound Implementation",
          "code": "public class BinarySearchVariants {\n    // Returns first index where arr[index] >= target\n    public static int lowerBound(int[] arr, int target) {\n        int low = 0, high = arr.length;\n        while (low < high) {\n            int mid = low + (high - low) / 2; // Prevents overflow\n            if (arr[mid] >= target) {\n                high = mid; // Search left half including mid\n            } else {\n                low = mid + 1; // Discard left half\n            }\n        }\n        return low;\n    }\n\n    public static void main(String[] args) {\n        int[] arr = {1, 3, 3, 5, 7, 8, 8, 10};\n        System.out.println(\"Lower bound of 3: index \" + lowerBound(arr, 3));\n        System.out.println(\"Lower bound of 4: index \" + lowerBound(arr, 4));\n        System.out.println(\"Lower bound of 8: index \" + lowerBound(arr, 8));\n    }\n}",
          "expectedOutput": "Lower bound of 3: index 1\nLower bound of 4: index 3\nLower bound of 8: index 5",
          "explanation": "Lower bound returns the index of the first element >= target. If target is absent, it returns the insertion point where it could be inserted to maintain sorted order."
        },
        {
          "title": "Search in Rotated Sorted Array in O(log N)",
          "code": "public class RotatedSortedSearch {\n    public static int search(int[] nums, int target) {\n        int low = 0, high = nums.length - 1;\n\n        while (low <= high) {\n            int mid = low + (high - low) / 2;\n            if (nums[mid] == target) return mid;\n\n            // Determine which half is sorted\n            if (nums[low] <= nums[mid]) {\n                // Left half is normally sorted\n                if (target >= nums[low] && target < nums[mid]) {\n                    high = mid - 1;\n                } else {\n                    low = mid + 1;\n                }\n            } else {\n                // Right half is sorted\n                if (target > nums[mid] && target <= nums[high]) {\n                    low = mid + 1;\n                } else {\n                    high = mid - 1;\n                }\n            }\n        }\n\n        return -1;\n    }\n\n    public static void main(String[] args) {\n        int[] rotated = {4, 5, 6, 7, 0, 1, 2};\n        System.out.println(\"Index of 0: \" + search(rotated, 0));\n        System.out.println(\"Index of 3: \" + search(rotated, 3));\n    }\n}",
          "expectedOutput": "Index of 0: 4\nIndex of 3: -1",
          "explanation": "In a rotated sorted array, at least one half [low..mid] or [mid..high] is always sorted. Checking if target falls within the sorted segment allows discarding half the elements each step."
        }
      ],
      "realWorldApplications": [
        "Database B+ Tree internal node routing during range scans and point queries.",
        "Git bisect tool running binary search over commit history to pinpoint the commit that introduced a regression bug."
      ],
      "commonMistakes": [
        "Using mid = (low + high) / 2 leading to integer overflow and negative index exceptions on arrays with >= 1 billion elements.",
        "Infinite loops caused by inconsistent boundary updates: mixing low <= high with high = mid instead of high = mid - 1.",
        "Assuming binary search only works on sorted arrays: binary search applies to any monotonic boolean function f(x)."
      ],
      "interviewRelevance": "Search in Rotated Sorted Array, Find Peak Element, Median of Two Sorted Arrays, and Koko Eating Bananas are flagship interview challenges across Google, Meta, and Microsoft.",
      "checkpoints": [
        {
          "id": "java-79-cp1",
          "label": "Prevent integer overflow using low + (high - low) / 2 or >>> 1"
        },
        {
          "id": "java-79-cp2",
          "label": "Implement lower_bound and upper_bound without off-by-one errors"
        },
        {
          "id": "java-79-cp3",
          "label": "Apply Binary Search on Answer to optimization problems with monotonic predicates"
        }
      ],
      "practiceExercises": [
        {
          "id": "java-79-ex1",
          "title": "Binary Search (Classic)",
          "difficulty": "Beginner",
          "type": "coding",
          "prompt": "Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to search target in nums. If target exists, return its index. Otherwise, return -1.",
          "starterCode": "public class ClassicBinarySearch {\n    public static int search(int[] nums, int target) {\n        return -1;\n    }\n}",
          "solution": "public class ClassicBinarySearch {\n    public static int search(int[] nums, int target) {\n        int low = 0, high = nums.length - 1;\n        while (low <= high) {\n            int mid = low + (high - low) / 2;\n            if (nums[mid] == target) return mid;\n            else if (nums[mid] < target) low = mid + 1;\n            else high = mid - 1;\n        }\n        return -1;\n    }\n}",
          "explanation": "Standard binary search cuts range in half each step, guaranteeing O(log N) time and O(1) space."
        },
        {
          "id": "java-79-ex2",
          "title": "Find First and Last Position of Element in Sorted Array",
          "difficulty": "Intermediate",
          "type": "coding",
          "prompt": "Given an array of integers nums sorted in non-decreasing order, find the starting and ending position of a given target value in O(log N) time. If target is not found, return [-1, -1].",
          "starterCode": "public class SearchRange {\n    public static int[] searchRange(int[] nums, int target) {\n        return new int[]{-1, -1};\n    }\n}",
          "solution": "public class SearchRange {\n    public static int[] searchRange(int[] nums, int target) {\n        int first = findBound(nums, target, true);\n        if (first == -1) return new int[]{-1, -1};\n        int last = findBound(nums, target, false);\n        return new int[]{first, last};\n    }\n\n    private static int findBound(int[] nums, int target, boolean isFirst) {\n        int low = 0, high = nums.length - 1;\n        int bound = -1;\n\n        while (low <= high) {\n            int mid = low + (high - low) / 2;\n            if (nums[mid] == target) {\n                bound = mid;\n                if (isFirst) high = mid - 1; // Continue searching left\n                else low = mid + 1;          // Continue searching right\n            } else if (nums[mid] < target) {\n                low = mid + 1;\n            } else {\n                high = mid - 1;\n            }\n        }\n\n        return bound;\n    }\n}",
          "explanation": "Two binary searches: one biasing left to find the first position, the other biasing right to find the last position. Both run in O(log N)."
        },
        {
          "id": "java-79-ex3",
          "title": "Koko Eating Bananas (Binary Search on Answer)",
          "difficulty": "Advanced",
          "type": "coding",
          "prompt": "Koko loves bananas. There are n piles of bananas, the ith pile has piles[i] bananas. The guards will come back in h hours. Return the minimum integer speed k such that she can eat all the bananas within h hours.",
          "starterCode": "public class KokoEatingBananas {\n    public static int minEatingSpeed(int[] piles, int h) {\n        return 0;\n    }\n}",
          "solution": "public class KokoEatingBananas {\n    public static int minEatingSpeed(int[] piles, int h) {\n        int low = 1;\n        int high = 1;\n        for (int p : piles) {\n            high = Math.max(high, p);\n        }\n\n        while (low < high) {\n            int speed = low + (high - low) / 2;\n            if (canFinish(piles, speed, h)) {\n                high = speed; // Try smaller speed\n            } else {\n                low = speed + 1; // Must eat faster\n            }\n        }\n\n        return low;\n    }\n\n    private static boolean canFinish(int[] piles, int speed, int h) {\n        long totalHours = 0;\n        for (int p : piles) {\n            totalHours += (p + speed - 1) / speed; // Ceiling division\n        }\n        return totalHours <= h;\n    }\n}",
          "explanation": "Search space is [1..max(piles)]. Feasibility is monotonic: if speed K works, all speeds > K also work. Binary search on answer solves this in O(N log(max_pile)) time."
        }
      ],
      "quizQuestions": [
        {
          "id": "java-79-q1",
          "question": "Why is `int mid = low + (high - low) / 2;` safer than `int mid = (low + high) / 2;` in Java?",
          "options": [
            "Because the division operator behaves differently on negative numbers",
            "Because (low + high) can exceed Integer.MAX_VALUE and wrap around to a negative number, resulting in ArrayIndexOutOfBoundsException",
            "Because (high - low) is calculated at compile time by the JIT compiler",
            "Because low + (high - low) / 2 uses floating-point precision internally"
          ],
          "correctOptionIndex": 1,
          "explanation": "When low and high are large (e.g. > 1 billion), low + high exceeds 2^31 - 1, producing negative 32-bit values. low + (high - low) / 2 guarantees intermediate results remain non-negative."
        },
        {
          "id": "java-79-q2",
          "question": "When can \"Binary Search on Answer\" be applied to an optimization problem?",
          "options": [
            "Only when the input array is already sorted",
            "Whenever the answer space is discrete and the feasibility function canAchieve(x) is monotonic (all false then all true, or vice versa)",
            "Only when the input contains fewer than 1,000 elements",
            "Whenever the problem can be solved in O(1) time"
          ],
          "correctOptionIndex": 1,
          "explanation": "Binary search on answer requires monotonicity: there exists a threshold where all values on one side are infeasible and all values on the other are feasible."
        }
      ],
      "revisionNotes": [
        "Always calculate mid safely: low + (high - low) / 2 or (low + high) >>> 1.",
        "Lower bound finds the first index >= target; upper bound finds the first index > target.",
        "Binary search on answer solves min-max optimization problems when the predicate function is monotonic."
      ],
      "moduleId": "java-m6",
      "moduleNumber": 6,
      "moduleTitle": "Java Problem Solving",
      "language": "java"
    },
    {
      "id": "java-80-sorting-comparators",
      "topicNumber": 80,
      "title": "Sorting Patterns, Dual-Pivot Quicksort & Custom Comparators",
      "level": "Intermediate",
      "whyItMatters": "Sorting is the precursor to greedy algorithms, interval scheduling, and search optimization. Understanding TimSort vs Dual-Pivot Quicksort and mastering Comparator chaining produces clean, bug-free, high-performance code.",
      "explanation": "1. Java Sorting Algorithms Under the Hood:\n- Arrays.sort(int[]): Vladimir Yaroslavskiy's Dual-Pivot Quicksort. Average O(N log N), space O(log N). Not stable, but cache-optimal for primitives.\n- Arrays.sort(Object[]) & Collections.sort(List<T>): Tim Peters' TimSort (hybrid merge sort + insertion sort). Guaranteed worst-case O(N log N), stable, space O(N). Takes advantage of existing partial ordering (runs).\n\n2. The Strict Weak Ordering Contract:\nCustom comparators must satisfy mathematical strict weak ordering:\n- Irreflexive: compare(x, x) == 0\n- Antisymmetric: sgn(compare(x, y)) == -sgn(compare(y, x))\n- Transitive: if compare(x, y) > 0 and compare(y, z) > 0, then compare(x, z) > 0.\n- Pitfall: Never write (a, b) -> a - b because if a is positive and b is negative (e.g., Integer.MAX_VALUE - (-1)), subtraction overflows! Always use Integer.compare(a, b).\n\n3. Interval Merging Pattern:\n- Sort intervals by start time: Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0])).\n- Iterate through sorted intervals: if current interval overlaps with previous (curr.start <= prev.end), merge them: prev.end = Math.max(prev.end, curr.end); otherwise start a new interval.",
      "syntaxAndStructure": "// Chaining comparators cleanly:\nComparator<Person> cmp = Comparator.comparing(Person::getLastName)\n    .thenComparing(Person::getFirstName)\n    .thenComparingInt(Person::getAge);",
      "codeExamples": [
        {
          "title": "Multi-Key Sorting with Comparator Factory Methods",
          "code": "import java.util.*;\n\npublic class ComparatorDemo {\n    static class Employee {\n        String dept;\n        String name;\n        int salary;\n\n        Employee(String dept, String name, int salary) {\n            this.dept = dept;\n            this.name = name;\n            this.salary = salary;\n        }\n\n        @Override\n        public String toString() {\n            return String.format(\"%s - %s ($%d)\", dept, name, salary);\n        }\n    }\n\n    public static void main(String[] args) {\n        List<Employee> staff = Arrays.asList(\n            new Employee(\"Engineering\", \"Alice\", 120000),\n            new Employee(\"Engineering\", \"Bob\", 140000),\n            new Employee(\"Engineering\", \"Charlie\", 120000),\n            new Employee(\"Marketing\", \"Diana\", 95000),\n            new Employee(\"Marketing\", \"Evan\", 110000)\n        );\n\n        // Sort by Department asc, then Salary desc, then Name asc\n        staff.sort(\n            Comparator.comparing((Employee e) -> e.dept)\n                .thenComparing(Comparator.comparingInt((Employee e) -> e.salary).reversed())\n                .thenComparing(e -> e.name)\n        );\n\n        staff.forEach(System.out::println);\n    }\n}",
          "expectedOutput": "Engineering - Bob ($140000)\nEngineering - Alice ($120000)\nEngineering - Charlie ($120000)\nMarketing - Evan ($110000)\nMarketing - Diana ($95000)",
          "explanation": "Comparator.comparing() combined with .thenComparing() and .reversed() provides readable, type-safe multi-criteria sorting without manual if-else branches."
        },
        {
          "title": "Merge Overlapping Intervals in O(N log N)",
          "code": "import java.util.*;\n\npublic class MergeIntervalsDemo {\n    public static int[][] merge(int[][] intervals) {\n        if (intervals.length <= 1) return intervals;\n\n        // Sort by start time\n        Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));\n\n        List<int[]> merged = new ArrayList<>();\n        int[] current = intervals[0];\n        merged.add(current);\n\n        for (int i = 1; i < intervals.length; i++) {\n            int[] next = intervals[i];\n            if (next[0] <= current[1]) {\n                // Overlap: extend end time\n                current[1] = Math.max(current[1], next[1]);\n            } else {\n                // Disjoint: start new interval\n                current = next;\n                merged.add(current);\n            }\n        }\n\n        return merged.toArray(new int[merged.size()][]);\n    }\n\n    public static void main(String[] args) {\n        int[][] intervals = {{1, 3}, {2, 6}, {8, 10}, {15, 18}};\n        int[][] res = merge(intervals);\n        System.out.println(\"Merged: \" + Arrays.deepToString(res));\n    }\n}",
          "expectedOutput": "Merged: [[1, 6], [8, 10], [15, 18]]",
          "explanation": "Sorting ensures intervals are processed in chronological order. Checking next[0] <= current[1] detects overlaps in a single O(N) sweep after O(N log N) sorting."
        }
      ],
      "realWorldApplications": [
        "Calendar and meeting room schedulers finding conference room conflicts and available booking slots.",
        "Log aggregators merging distributed server trace logs in timestamp order across multiple microservices."
      ],
      "commonMistakes": [
        "Using (a, b) -> a - b for sorting: if a = Integer.MIN_VALUE and b = 1, subtraction underflows to positive, violating transitivity and throwing IllegalArgumentException: Comparison method violates its general contract!",
        "Assuming primitive sorting is stable: Arrays.sort(int[]) uses Dual-Pivot Quicksort, which is NOT stable (though stability is irrelevant for primitives, it matters for objects).",
        "Forgetting Math.max(current[1], next[1]) when merging intervals: next interval might be completely nested inside current interval."
      ],
      "interviewRelevance": "Merge Intervals, Non-overlapping Intervals, Meeting Rooms II, and Largest Number are tested in technical rounds at Uber, Lyft, Google, and Amazon.",
      "checkpoints": [
        {
          "id": "java-80-cp1",
          "label": "Explain differences between Dual-Pivot Quicksort (primitives) and TimSort (objects)"
        },
        {
          "id": "java-80-cp2",
          "label": "Construct robust custom Comparators using Integer.compare and comparator chains"
        },
        {
          "id": "java-80-cp3",
          "label": "Solve interval scheduling and overlap problems in O(N log N)"
        }
      ],
      "practiceExercises": [
        {
          "id": "java-80-ex1",
          "title": "Sort Strings by Length then Alphabetically",
          "difficulty": "Beginner",
          "type": "coding",
          "prompt": "Given a list of strings, sort them in ascending order primarily by string length, and secondarily alphabetically.",
          "starterCode": "import java.util.*;\n\npublic class StringSorter {\n    public static void sortStrings(List<String> list) {\n        // Sort in-place\n    }\n}",
          "solution": "import java.util.*;\n\npublic class StringSorter {\n    public static void sortStrings(List<String> list) {\n        list.sort(\n            Comparator.comparingInt(String::length)\n                .thenComparing(Comparator.naturalOrder())\n        );\n    }\n}",
          "explanation": "Comparator.comparingInt(String::length).thenComparing(Comparator.naturalOrder()) orders by length first, breaking ties lexicographically."
        },
        {
          "id": "java-80-ex2",
          "title": "Non-Overlapping Intervals (Interval Scheduling)",
          "difficulty": "Intermediate",
          "type": "coding",
          "prompt": "Given an array of intervals intervals where intervals[i] = [start, end], return the minimum number of intervals you need to remove to make the rest non-overlapping.",
          "starterCode": "public class NonOverlapping {\n    public static int eraseOverlapIntervals(int[][] intervals) {\n        return 0;\n    }\n}",
          "solution": "import java.util.*;\n\npublic class NonOverlapping {\n    public static int eraseOverlapIntervals(int[][] intervals) {\n        if (intervals.length == 0) return 0;\n\n        // Greedy: sort by END time\n        Arrays.sort(intervals, (a, b) -> Integer.compare(a[1], b[1]));\n\n        int countKept = 1;\n        int prevEnd = intervals[0][1];\n\n        for (int i = 1; i < intervals.length; i++) {\n            if (intervals[i][0] >= prevEnd) {\n                countKept++;\n                prevEnd = intervals[i][1];\n            }\n        }\n\n        return intervals.length - countKept;\n    }\n}",
          "explanation": "Sorting intervals by finish time leaves maximum room for future non-overlapping intervals (classic greedy interval scheduling algorithm). Total removals = total - kept."
        },
        {
          "id": "java-80-ex3",
          "title": "Largest Number",
          "difficulty": "Advanced",
          "type": "coding",
          "prompt": "Given a list of non-negative integers nums, arrange them such that they form the largest number and return it as a string.",
          "starterCode": "public class LargestNumberFinder {\n    public static String largestNumber(int[] nums) {\n        return \"\";\n    }\n}",
          "solution": "import java.util.*;\n\npublic class LargestNumberFinder {\n    public static String largestNumber(int[] nums) {\n        String[] sNums = new String[nums.length];\n        for (int i = 0; i < nums.length; i++) {\n            sNums[i] = String.valueOf(nums[i]);\n        }\n\n        // Custom comparator: compare (b + a) with (a + b)\n        Arrays.sort(sNums, (a, b) -> (b + a).compareTo(a + b));\n\n        // Edge case: all zeros [0, 0]\n        if (sNums[0].equals(\"0\")) {\n            return \"0\";\n        }\n\n        StringBuilder sb = new StringBuilder();\n        for (String s : sNums) {\n            sb.append(s);\n        }\n        return sb.toString();\n    }\n}",
          "explanation": "Sorting strings by comparing (b + a).compareTo(a + b) ensures that greedy concatenation produces the maximum possible number. Leading zeros are handled by checking if sNums[0].equals(\"0\")."
        }
      ],
      "quizQuestions": [
        {
          "id": "java-80-q1",
          "question": "Why does Java throw `IllegalArgumentException: Comparison method violates its general contract` when using `(a, b) -> a - b`?",
          "options": [
            "Because Java requires all comparators to implement Serializable",
            "Because integer overflow occurs when subtracting a negative number from a positive number, violating transitivity",
            "Because subtraction is not allowed in lambda expressions",
            "Because modern Java only accepts method references in sort()"
          ],
          "correctOptionIndex": 1,
          "explanation": "If a = 1,000,000,000 and b = -1,500,000,000, a - b = 2,500,000,000 which overflows to negative, reporting a < b falsely. TimSort detects this violation of strict weak ordering and throws an exception."
        },
        {
          "id": "java-80-q2",
          "question": "Which sorting algorithm is used by Collections.sort() and Arrays.sort(Object[]) in Java?",
          "options": [
            "Quicksort",
            "Heapsort",
            "TimSort (hybrid Merge Sort + Insertion Sort)",
            "Bubble Sort"
          ],
          "correctOptionIndex": 2,
          "explanation": "TimSort is used for objects because it is guaranteed O(N log N) worst-case, requires O(N) auxiliary space, and is strictly stable (preserves relative order of equal keys)."
        }
      ],
      "revisionNotes": [
        "Arrays.sort(primitive[]) uses Dual-Pivot Quicksort; Arrays.sort(Object[]) uses TimSort.",
        "Never subtract integers in comparators; always use Integer.compare(a, b).",
        "Interval scheduling greedily sorts by end time to maximize non-overlapping intervals."
      ],
      "moduleId": "java-m6",
      "moduleNumber": 6,
      "moduleTitle": "Java Problem Solving",
      "language": "java"
    },
    {
      "id": "java-81-recursion-backtracking",
      "topicNumber": 81,
      "title": "Recursion & Backtracking Patterns: Subsets, Permutations & Pruning",
      "level": "Advanced",
      "whyItMatters": "Backtracking systematically explores state spaces (combinatorics, puzzles, decision trees) by trying paths, verifying constraints, and backtracking (undoing state modifications) when dead ends are reached.",
      "explanation": "1. Backtracking Template in Java:\nvoid backtrack(State state, int start, List<Result> results) {\n    if (isSolution(state)) {\n        results.add(new ArrayList<>(state)); // Deep copy current state!\n        return;\n    }\n    for (Choice choice : validChoices) {\n        makeChoice(state, choice);      // 1. Choose\n        backtrack(state, next, results); // 2. Explore\n        undoChoice(state, choice);      // 3. Un-choose (Backtrack)\n    }\n}\n\n2. Three Classical Combinatorial Archetypes:\n- Subsets (Power Set): Decision at each element: include or exclude. State tree has 2^N leaves.\n- Combinations: Choose K elements from N without order. Use a start index to avoid duplicate permutations.\n- Permutations: Order matters. Use a boolean[] used array to track visited indices, exploring all N! orderings.\n\n3. Pruning for Performance:\nSort the input beforehand. If a branch exceeds the target sum (sum + nums[i] > target) or if duplicate elements are skipped (i > start && nums[i] == nums[i - 1]), prune the entire sub-tree immediately with break or continue.",
      "syntaxAndStructure": "// Subsets with backtracking:\nvoid dfs(int[] nums, int start, List<Integer> curr, List<List<Integer>> res) {\n    res.add(new ArrayList<>(curr)); // Add snapshot\n    for (int i = start; i < nums.length; i++) {\n        curr.add(nums[i]);\n        dfs(nums, i + 1, curr, res);\n        curr.remove(curr.size() - 1); // Backtrack\n    }\n}",
      "codeExamples": [
        {
          "title": "Generating Subsets (Power Set) with Backtracking",
          "code": "import java.util.*;\n\npublic class SubsetsDemo {\n    public static List<List<Integer>> subsets(int[] nums) {\n        List<List<Integer>> result = new ArrayList<>();\n        backtrack(nums, 0, new ArrayList<>(), result);\n        return result;\n    }\n\n    private static void backtrack(int[] nums, int start, List<Integer> current, List<List<Integer>> result) {\n        // Add a copy of current snapshot\n        result.add(new ArrayList<>(current));\n\n        for (int i = start; i < nums.length; i++) {\n            current.add(nums[i]);                   // 1. Choose\n            backtrack(nums, i + 1, current, result); // 2. Explore\n            current.remove(current.size() - 1);     // 3. Un-choose\n        }\n    }\n\n    public static void main(String[] args) {\n        int[] nums = {1, 2, 3};\n        List<List<Integer>> res = subsets(nums);\n        System.out.println(\"Total subsets: \" + res.size());\n        System.out.println(\"Subsets: \" + res);\n    }\n}",
          "expectedOutput": "Total subsets: 8\nSubsets: [[], [1], [1, 2], [1, 2, 3], [1, 3], [2], [2, 3], [3]]",
          "explanation": "Every subset corresponds to a path in the decision tree. Deep copies new ArrayList<>(current) are created to snapshot each configuration."
        },
        {
          "title": "Permutations of Distinct Integers in O(N!)",
          "code": "import java.util.*;\n\npublic class PermutationsDemo {\n    public static List<List<Integer>> permute(int[] nums) {\n        List<List<Integer>> result = new ArrayList<>();\n        boolean[] used = new boolean[nums.length];\n        backtrack(nums, used, new ArrayList<>(), result);\n        return result;\n    }\n\n    private static void backtrack(int[] nums, boolean[] used, List<Integer> current, List<List<Integer>> result) {\n        if (current.size() == nums.length) {\n            result.add(new ArrayList<>(current));\n            return;\n        }\n\n        for (int i = 0; i < nums.length; i++) {\n            if (used[i]) continue;\n\n            used[i] = true;\n            current.add(nums[i]);\n\n            backtrack(nums, used, current, result);\n\n            // Backtrack state\n            current.remove(current.size() - 1);\n            used[i] = false;\n        }\n    }\n\n    public static void main(String[] args) {\n        int[] nums = {1, 2};\n        System.out.println(\"Permutations: \" + permute(nums));\n    }\n}",
          "expectedOutput": "Permutations: [[1, 2], [2, 1]]",
          "explanation": "A boolean[] used array tracks choices in the current permutation path. After recursion finishes, used[i] is reset to false, enabling other permutations."
        }
      ],
      "realWorldApplications": [
        "Sudoku, chess, and crossword puzzle solver engines pruning impossible board states.",
        "Package dependency resolution engines resolving SAT conflicts across compatible library versions."
      ],
      "commonMistakes": [
        "Adding current to result directly without copying (result.add(current)): since current is modified and cleared, all subsets end up being empty lists []. Always use result.add(new ArrayList<>(current)).",
        "Forgetting to un-choose state (e.g. failing to remove last element or reset visited booleans), corrupting subsequent traversal branches.",
        "Missing base condition or pruning logic, causing StackOverflowError due to infinite recursive descent."
      ],
      "interviewRelevance": "Subsets, Combination Sum, Permutations, Word Search, and N-Queens are legendary backtracking questions frequently tested in Google, Microsoft, and Bloomberg interviews.",
      "checkpoints": [
        {
          "id": "java-81-cp1",
          "label": "Apply the Choose -> Explore -> Un-choose backtracking paradigm"
        },
        {
          "id": "java-81-cp2",
          "label": "Distinguish between Subsets (start pointer) and Permutations (used array)"
        },
        {
          "id": "java-81-cp3",
          "label": "Prune search branches by sorting input and skipping duplicate elements"
        }
      ],
      "practiceExercises": [
        {
          "id": "java-81-ex1",
          "title": "Generate All Binary Strings of Length N",
          "difficulty": "Beginner",
          "type": "coding",
          "prompt": "Given an integer n, generate and return all binary strings of length n in lexicographical order.",
          "starterCode": "import java.util.*;\n\npublic class BinaryStrings {\n    public static List<String> generateBinaryStrings(int n) {\n        return new ArrayList<>();\n    }\n}",
          "solution": "import java.util.*;\n\npublic class BinaryStrings {\n    public static List<String> generateBinaryStrings(int n) {\n        List<String> result = new ArrayList<>();\n        backtrack(n, new StringBuilder(), result);\n        return result;\n    }\n\n    private static void backtrack(int n, StringBuilder sb, List<String> result) {\n        if (sb.length() == n) {\n            result.add(sb.toString());\n            return;\n        }\n\n        sb.append('0');\n        backtrack(n, sb, result);\n        sb.deleteCharAt(sb.length() - 1);\n\n        sb.append('1');\n        backtrack(n, sb, result);\n        sb.deleteCharAt(sb.length() - 1);\n    }\n}",
          "explanation": "At each index, append '0', recurse, backtrack by deleting last char, then append '1', recurse, and backtrack. Produces 2^N binary strings."
        },
        {
          "id": "java-81-ex2",
          "title": "Combination Sum",
          "difficulty": "Intermediate",
          "type": "coding",
          "prompt": "Given an array of distinct integers candidates and a target integer target, return a list of all unique combinations of candidates where the chosen numbers sum to target. The same number may be chosen unlimited times.",
          "starterCode": "import java.util.*;\n\npublic class CombinationSumFinder {\n    public static List<List<Integer>> combinationSum(int[] candidates, int target) {\n        return new ArrayList<>();\n    }\n}",
          "solution": "import java.util.*;\n\npublic class CombinationSumFinder {\n    public static List<List<Integer>> combinationSum(int[] candidates, int target) {\n        Arrays.sort(candidates);\n        List<List<Integer>> result = new ArrayList<>();\n        backtrack(candidates, target, 0, new ArrayList<>(), result);\n        return result;\n    }\n\n    private static void backtrack(int[] candidates, int remain, int start, List<Integer> current, List<List<Integer>> result) {\n        if (remain == 0) {\n            result.add(new ArrayList<>(current));\n            return;\n        }\n\n        for (int i = start; i < candidates.length; i++) {\n            if (candidates[i] > remain) break; // Pruning\n\n            current.add(candidates[i]);\n            backtrack(candidates, remain - candidates[i], i, current, result); // reuse same index i\n            current.remove(current.size() - 1);\n        }\n    }\n}",
          "explanation": "Sorting candidates enables early pruning with break when candidate > remain. Passing index i (instead of i + 1) permits reusing the same element."
        },
        {
          "id": "java-81-ex3",
          "title": "Word Search in 2D Grid",
          "difficulty": "Advanced",
          "type": "coding",
          "prompt": "Given an m x n grid of characters board and a string word, return true if word exists in the grid. The word can be constructed from letters of sequentially adjacent cells horizontally or vertically. The same letter cell may not be used more than once.",
          "starterCode": "public class WordSearchSolver {\n    public static boolean exist(char[][] board, String word) {\n        return false;\n    }\n}",
          "solution": "public class WordSearchSolver {\n    public static boolean exist(char[][] board, String word) {\n        int m = board.length, n = board[0].length;\n        for (int r = 0; r < m; r++) {\n            for (int c = 0; c < n; c++) {\n                if (board[r][c] == word.charAt(0)) {\n                    if (dfs(board, word, r, c, 0)) return true;\n                }\n            }\n        }\n        return false;\n    }\n\n    private static boolean dfs(char[][] board, String word, int r, int c, int index) {\n        if (index == word.length()) return true;\n        if (r < 0 || r >= board.length || c < 0 || c >= board[0].length || board[r][c] != word.charAt(index)) {\n            return false;\n        }\n\n        char temp = board[r][c];\n        board[r][c] = '#'; // Mark visited in-place without auxiliary boolean[][]\n\n        boolean found = dfs(board, word, r + 1, c, index + 1) ||\n                        dfs(board, word, r - 1, c, index + 1) ||\n                        dfs(board, word, r, c + 1, index + 1) ||\n                        dfs(board, word, r, c - 1, index + 1);\n\n        board[r][c] = temp; // Backtrack cell character\n        return found;\n    }\n}",
          "explanation": "DFS checks 4 directions. Marking board[r][c] = '#' eliminates the need for an auxiliary boolean[][] array. Restoring board[r][c] = temp backtracks state."
        }
      ],
      "quizQuestions": [
        {
          "id": "java-81-q1",
          "question": "Why must we execute `result.add(new ArrayList<>(current));` instead of `result.add(current);` in backtracking algorithms?",
          "options": [
            "Because Java collections cannot store lists inside lists",
            "Because `current` is a mutable reference that gets cleared and modified during backtracking; without a defensive copy, all elements in `result` would end up empty",
            "Because new ArrayList<>() converts the list into a synchronized list",
            "Because result.add(current) causes a compile-time type error"
          ],
          "correctOptionIndex": 1,
          "explanation": "If you store `current`, you are storing a single reference that is repeatedly mutated. By the end of backtracking, all entries in `result` will point to the same empty list."
        },
        {
          "id": "java-81-q2",
          "question": "What is the primary difference in parameter passing between Subsets and Permutations backtracking?",
          "options": [
            "Subsets uses a boolean[] array while Permutations uses an integer start index",
            "Subsets passes a `start` index to only explore forward elements, while Permutations checks all indices using a `boolean[] used` array",
            "Subsets can only handle positive integers",
            "Permutations does not require backtracking state restoration"
          ],
          "correctOptionIndex": 1,
          "explanation": "Subsets uses `start` to avoid re-ordering the same subset (order doesn't matter). Permutations examines all elements in every order, requiring a `used[]` flag."
        }
      ],
      "revisionNotes": [
        "Backtracking template: Choose -> Explore -> Un-choose.",
        "Always save snapshots with `new ArrayList<>(current)` when adding to results.",
        "Sort candidates beforehand to prune dead-end branches early with `break`."
      ],
      "moduleId": "java-m6",
      "moduleNumber": 6,
      "moduleTitle": "Java Problem Solving",
      "language": "java"
    },
    {
      "id": "java-82-linked-lists",
      "topicNumber": 82,
      "title": "Linked List Interview Patterns: Reversal, Cycles & Merging",
      "level": "Intermediate",
      "whyItMatters": "Linked lists test pointer manipulation, memory reference updates, and boundary edge cases (null heads, single-node lists, cycles). Sentinel (dummy) head nodes simplify insertion and deletion code by eliminating special head-check branches.",
      "explanation": "1. Sentinel / Dummy Head Pattern:\nCreating ListNode dummy = new ListNode(0); dummy.next = head; eliminates special handling for empty lists or operations modifying the head node. Return dummy.next at the end.\n\n2. In-Place Iterative Reversal:\nMaintain three pointers: prev = null, curr = head, next = null.\nIn a loop while curr != null:\n  1. next = curr.next; (save next node)\n  2. curr.next = prev; (reverse pointer)\n  3. prev = curr;      (advance prev)\n  4. curr = next;      (advance curr)\nReturn prev as the new head!\n\n3. Floyd’s Cycle Detection (Tortoise and Hare):\n- slow moves 1 step; fast moves 2 steps.\n- If fast == null || fast.next == null, no cycle exists.\n- If slow == fast, a cycle is detected!\n- To find the cycle entry node: reset slow = head. Move both slow and fast 1 step at a time. The node where they meet is the start of the cycle (mathematical proof: 2(F + a) = F + nC + a => F = nC - a).",
      "syntaxAndStructure": "// Iterative list reversal:\nListNode prev = null, curr = head;\nwhile (curr != null) {\n    ListNode next = curr.next;\n    curr.next = prev;\n    prev = curr;\n    curr = next;\n}\nreturn prev;",
      "codeExamples": [
        {
          "title": "Iterative Linked List Reversal in O(N) Time and O(1) Space",
          "code": "public class LinkedListReversal {\n    static class ListNode {\n        int val;\n        ListNode next;\n        ListNode(int val) { this.val = val; }\n    }\n\n    public static ListNode reverseList(ListNode head) {\n        ListNode prev = null;\n        ListNode curr = head;\n\n        while (curr != null) {\n            ListNode next = curr.next;\n            curr.next = prev;\n            prev = curr;\n            curr = next;\n        }\n\n        return prev;\n    }\n\n    public static void printList(ListNode head) {\n        ListNode curr = head;\n        while (curr != null) {\n            System.out.print(curr.val + (curr.next != null ? \" -> \" : \"\"));\n            curr = curr.next;\n        }\n        System.out.println();\n    }\n\n    public static void main(String[] args) {\n        ListNode head = new ListNode(1);\n        head.next = new ListNode(2);\n        head.next.next = new ListNode(3);\n        head.next.next.next = new ListNode(4);\n\n        System.out.print(\"Original: \");\n        printList(head);\n\n        ListNode reversed = reverseList(head);\n        System.out.print(\"Reversed: \");\n        printList(reversed);\n    }\n}",
          "expectedOutput": "Original: 1 -> 2 -> 3 -> 4\nReversed: 4 -> 3 -> 2 -> 1",
          "explanation": "Iterative reversal rewires pointers in-place with O(1) memory without creating any new node allocations."
        },
        {
          "title": "Merge Two Sorted Lists with Dummy Head",
          "code": "public class MergeListsDemo {\n    static class ListNode {\n        int val;\n        ListNode next;\n        ListNode(int val) { this.val = val; }\n    }\n\n    public static ListNode mergeTwoLists(ListNode l1, ListNode l2) {\n        ListNode dummy = new ListNode(-1);\n        ListNode tail = dummy;\n\n        while (l1 != null && l2 != null) {\n            if (l1.val <= l2.val) {\n                tail.next = l1;\n                l1 = l1.next;\n            } else {\n                tail.next = l2;\n                l2 = l2.next;\n            }\n            tail = tail.next;\n        }\n\n        // Attach remaining elements\n        tail.next = (l1 != null) ? l1 : l2;\n\n        return dummy.next;\n    }\n\n    public static void main(String[] args) {\n        ListNode l1 = new ListNode(1);\n        l1.next = new ListNode(3);\n        l1.next.next = new ListNode(5);\n\n        ListNode l2 = new ListNode(2);\n        l2.next = new ListNode(4);\n\n        ListNode merged = mergeTwoLists(l1, l2);\n        while (merged != null) {\n            System.out.print(merged.val + (merged.next != null ? \" -> \" : \"\"));\n            merged = merged.next;\n        }\n        System.out.println();\n    }\n}",
          "expectedOutput": "1 -> 2 -> 3 -> 4 -> 5",
          "explanation": "The dummy head eliminates null checks when attaching the first node. Merging finishes in O(N + M) time and O(1) space."
        }
      ],
      "realWorldApplications": [
        "Operating system kernel scheduler managing ready queues and task control blocks (TCBs).",
        "LRU cache implementations using doubly-linked lists with dummy head and tail sentinel nodes."
      ],
      "commonMistakes": [
        "Losing reference to curr.next before rewiring curr.next = prev, causing premature termination of the list traversal.",
        "Forgetting fast.next != null check before advancing fast = fast.next.next, throwing NullPointerException.",
        "Creating memory cycles by failing to terminate the new tail with tail.next = null."
      ],
      "interviewRelevance": "Reverse Linked List, Linked List Cycle II, Merge K Sorted Lists, and LRU Cache are among the most tested topics across all technical interview rounds.",
      "checkpoints": [
        {
          "id": "java-82-cp1",
          "label": "Use dummy head nodes to simplify list mutations and boundary conditions"
        },
        {
          "id": "java-82-cp2",
          "label": "Reverse a singly linked list iteratively and recursively in O(N) time"
        },
        {
          "id": "java-82-cp3",
          "label": "Apply Floyd’s Tortoise and Hare algorithm to detect cycles and locate cycle entry"
        }
      ],
      "practiceExercises": [
        {
          "id": "java-82-ex1",
          "title": "Middle of the Linked List",
          "difficulty": "Beginner",
          "type": "coding",
          "prompt": "Given the head of a singly linked list, return the middle node of the linked list. If there are two middle nodes, return the second middle node.",
          "starterCode": "public class MiddleNodeFinder {\n    public static ListNode middleNode(ListNode head) {\n        return null;\n    }\n}",
          "solution": "public class MiddleNodeFinder {\n    public static ListNode middleNode(ListNode head) {\n        ListNode slow = head;\n        ListNode fast = head;\n\n        while (fast != null && fast.next != null) {\n            slow = slow.next;\n            fast = fast.next.next;\n        }\n\n        return slow;\n    }\n}",
          "explanation": "Fast pointer moves twice as fast as slow pointer. When fast reaches the end, slow is at the middle node in O(N) time and O(1) space."
        },
        {
          "id": "java-82-ex2",
          "title": "Remove Nth Node From End of List",
          "difficulty": "Intermediate",
          "type": "coding",
          "prompt": "Given the head of a linked list, remove the nth node from the end of the list and return its head in a single pass.",
          "starterCode": "public class RemoveNthFromEnd {\n    public static ListNode removeNthFromEnd(ListNode head, int n) {\n        return null;\n    }\n}",
          "solution": "public class RemoveNthFromEnd {\n    public static ListNode removeNthFromEnd(ListNode head, int n) {\n        ListNode dummy = new ListNode(0);\n        dummy.next = head;\n\n        ListNode first = dummy;\n        ListNode second = dummy;\n\n        // Advance first by n + 1 steps\n        for (int i = 0; i <= n; i++) {\n            first = first.next;\n        }\n\n        // Move both until first reaches null\n        while (first != null) {\n            first = first.next;\n            second = second.next;\n        }\n\n        // Delete target node\n        second.next = second.next.next;\n\n        return dummy.next;\n    }\n}",
          "explanation": "Maintaining an (n + 1) gap between first and second pointers allows second to stop right before the node to be removed."
        },
        {
          "id": "java-82-ex3",
          "title": "Linked List Cycle II (Find Start of Cycle)",
          "difficulty": "Advanced",
          "type": "coding",
          "prompt": "Given the head of a linked list, return the node where the cycle begins. If there is no cycle, return null. Do not modify the linked list.",
          "starterCode": "public class CycleStartFinder {\n    public static ListNode detectCycle(ListNode head) {\n        return null;\n    }\n}",
          "solution": "public class CycleStartFinder {\n    public static ListNode detectCycle(ListNode head) {\n        ListNode slow = head;\n        ListNode fast = head;\n\n        // Detect if cycle exists\n        while (fast != null && fast.next != null) {\n            slow = slow.next;\n            fast = fast.next.next;\n            if (slow == fast) {\n                // Cycle found: find intersection\n                ListNode entry = head;\n                while (entry != slow) {\n                    entry = entry.next;\n                    slow = slow.next;\n                }\n                return entry;\n            }\n        }\n\n        return null;\n    }\n}",
          "explanation": "Once fast and slow meet, the distance from head to cycle entrance equals the distance from meeting point to cycle entrance. Advancing entry from head and slow from meeting point at speed 1 finds the entrance."
        }
      ],
      "quizQuestions": [
        {
          "id": "java-82-q1",
          "question": "Why is a dummy (sentinel) head node beneficial when manipulating linked lists in Java?",
          "options": [
            "Because JVM cannot allocate ListNode without a dummy node",
            "Because it eliminates special null and head checks when inserting, deleting, or merging at the beginning of a list",
            "Because it converts a singly linked list into a doubly linked list",
            "Because it automatically prevents memory leaks in the garbage collector"
          ],
          "correctOptionIndex": 1,
          "explanation": "A dummy node provides a fixed non-null anchor preceding head, making operations on the first node identical to operations on any other node."
        },
        {
          "id": "java-82-q2",
          "question": "In Floyd's Cycle Detection algorithm, why must we check `fast != null && fast.next != null`?",
          "options": [
            "To ensure the linked list has at least three nodes",
            "To prevent NullPointerException when advancing `fast = fast.next.next` on even-length or terminated lists",
            "To check if the values inside nodes are integers",
            "To trigger garbage collection on unreachable nodes"
          ],
          "correctOptionIndex": 1,
          "explanation": "If fast is null or fast.next is null, attempting fast.next.next immediately throws NullPointerException. Both must be non-null."
        }
      ],
      "revisionNotes": [
        "Always use a dummy head node to simplify head deletions and list creation.",
        "Fast and slow pointers find the middle node and detect cycles in O(N) time with O(1) space.",
        "Reverse in-place using three pointers: prev, curr, next."
      ],
      "moduleId": "java-m6",
      "moduleNumber": 6,
      "moduleTitle": "Java Problem Solving",
      "language": "java"
    },
    {
      "id": "java-83-stacks",
      "topicNumber": 83,
      "title": "Stack & Monotonic Stack Patterns: NGE, Balanced Brackets & Histograms",
      "level": "Intermediate",
      "whyItMatters": "Stacks provide Last-In-First-Out (LIFO) semantics essential for expression evaluation, bracket matching, and backtracking. Monotonic stacks solve Next Greater Element and histogram area problems in linear O(N) time.",
      "explanation": "1. Stack Implementation in Java:\n- Never use java.util.Stack! It extends Vector, making every method synchronized (thread contention overhead) and exposing non-stack vector operations.\n- Always use Deque<T> stack = new ArrayDeque<>(); for optimal performance and cache locality.\n\n2. Monotonic Stack Concept:\nA stack where elements are strictly increasing or strictly decreasing from bottom to top.\n- Monotonic Decreasing Stack (finds Next Greater Element):\n  - Iterate through elements.\n  - While stack is non-empty and current element arr[i] > arr[stack.peek()]:\n    - stack.pop() is resolved! The next greater element for the popped index is arr[i].\n  - Push index i onto stack.\n  - Every element is pushed once and popped at most once: O(N) overall runtime!\n\n3. Largest Rectangle in Histogram Pattern:\n- Use a monotonic increasing stack storing bar indices.\n- When a shorter bar is encountered, pop elements and compute rectangle area where the popped bar is the minimum height.\n- Width = (stack.isEmpty() ? i : i - stack.peek() - 1).\n- Runs in strict O(N) time and O(N) space.",
      "syntaxAndStructure": "// Modern Java stack declaration:\nDeque<Integer> stack = new ArrayDeque<>();\nstack.push(val);\nint top = stack.pop();\nint peek = stack.peek();",
      "codeExamples": [
        {
          "title": "Valid Parentheses Matching using ArrayDeque",
          "code": "import java.util.*;\n\npublic class ValidParentheses {\n    public static boolean isValid(String s) {\n        Deque<Character> stack = new ArrayDeque<>();\n\n        for (char c : s.toCharArray()) {\n            if (c == '(') stack.push(')');\n            else if (c == '{') stack.push('}');\n            else if (c == '[') stack.push(']');\n            else {\n                // Must match expected closing bracket\n                if (stack.isEmpty() || stack.pop() != c) {\n                    return false;\n                }\n            }\n        }\n\n        return stack.isEmpty();\n    }\n\n    public static void main(String[] args) {\n        System.out.println(\"()[]{} is valid: \" + isValid(\"()[]{}\"));\n        System.out.println(\"([)] is valid: \" + isValid(\"([)]\"));\n    }\n}",
          "expectedOutput": "()[]{} is valid: true\n([)] is valid: false",
          "explanation": "Pushing expected closing brackets simplifies matching logic into a single comparison: stack.pop() != c."
        },
        {
          "title": "Next Greater Element using Monotonic Decreasing Stack",
          "code": "import java.util.*;\n\npublic class MonotonicStackDemo {\n    public static int[] nextGreaterElements(int[] nums) {\n        int n = nums.length;\n        int[] result = new int[n];\n        Arrays.fill(result, -1);\n\n        Deque<Integer> stack = new ArrayDeque<>(); // stores indices\n\n        for (int i = 0; i < n; i++) {\n            while (!stack.isEmpty() && nums[i] > nums[stack.peek()]) {\n                int resolvedIdx = stack.pop();\n                result[resolvedIdx] = nums[i];\n            }\n            stack.push(i);\n        }\n\n        return result;\n    }\n\n    public static void main(String[] args) {\n        int[] arr = {4, 5, 2, 25};\n        System.out.println(\"Next Greater: \" + Arrays.toString(nextGreaterElements(arr)));\n    }\n}",
          "expectedOutput": "Next Greater: [5, 25, 25, -1]",
          "explanation": "Indices remain in the stack until a strictly greater element arrives to resolve them. Each index is pushed and popped at most once, achieving O(N) time."
        }
      ],
      "realWorldApplications": [
        "JVM Call Stack and compiler syntax parsers parsing AST expressions.",
        "Undo/Redo functionality in text editors and graphics tools."
      ],
      "commonMistakes": [
        "Using legacy java.util.Stack which synchronizes all operations and suffers severe lock contention overhead.",
        "Calling stack.pop() without checking !stack.isEmpty(), triggering NoSuchElementException.",
        "Storing element values instead of element indices in monotonic stacks, losing index distance information needed for subarray width calculations."
      ],
      "interviewRelevance": "Valid Parentheses, Daily Temperatures, Min Stack, and Largest Rectangle in Histogram are frequently asked at Google, Apple, and Bloomberg.",
      "checkpoints": [
        {
          "id": "java-83-cp1",
          "label": "Use Deque<T> = new ArrayDeque<>() as the preferred stack implementation in Java"
        },
        {
          "id": "java-83-cp2",
          "label": "Implement monotonic decreasing stacks to find Next Greater Elements in O(N)"
        },
        {
          "id": "java-83-cp3",
          "label": "Solve Largest Rectangle in Histogram in linear time using index tracking"
        }
      ],
      "practiceExercises": [
        {
          "id": "java-83-ex1",
          "title": "Evaluate Reverse Polish Notation",
          "difficulty": "Beginner",
          "type": "coding",
          "prompt": "Evaluate the value of an arithmetic expression in Reverse Polish Notation (tokens: +, -, *, /).",
          "starterCode": "public class RPNCalculator {\n    public static int evalRPN(String[] tokens) {\n        return 0;\n    }\n}",
          "solution": "import java.util.*;\n\npublic class RPNCalculator {\n    public static int evalRPN(String[] tokens) {\n        Deque<Integer> stack = new ArrayDeque<>();\n\n        for (String t : tokens) {\n            if (t.equals(\"+\")) {\n                stack.push(stack.pop() + stack.pop());\n            } else if (t.equals(\"-\")) {\n                int b = stack.pop();\n                int a = stack.pop();\n                stack.push(a - b);\n            } else if (t.equals(\"*\")) {\n                stack.push(stack.pop() * stack.pop());\n            } else if (t.equals(\"/\")) {\n                int b = stack.pop();\n                int a = stack.pop();\n                stack.push(a / b);\n            } else {\n                stack.push(Integer.parseInt(t));\n            }\n        }\n\n        return stack.pop();\n    }\n}",
          "explanation": "Operands are pushed onto the stack. Operators pop the top two operands, evaluate, and push the result back in O(N) time."
        },
        {
          "id": "java-83-ex2",
          "title": "Daily Temperatures (Days Until Warmer)",
          "difficulty": "Intermediate",
          "type": "coding",
          "prompt": "Given an array of temperatures, return an array answer such that answer[i] is the number of days you have to wait after the ith day to get a warmer temperature. If there is no future day for which this is possible, keep answer[i] == 0.",
          "starterCode": "public class DailyTemperatures {\n    public static int[] dailyTemperatures(int[] temperatures) {\n        return new int[temperatures.length];\n    }\n}",
          "solution": "import java.util.*;\n\npublic class DailyTemperatures {\n    public static int[] dailyTemperatures(int[] temperatures) {\n        int n = temperatures.length;\n        int[] answer = new int[n];\n        Deque<Integer> stack = new ArrayDeque<>(); // stores indices\n\n        for (int i = 0; i < n; i++) {\n            while (!stack.isEmpty() && temperatures[i] > temperatures[stack.peek()]) {\n                int prevDay = stack.pop();\n                answer[prevDay] = i - prevDay;\n            }\n            stack.push(i);\n        }\n\n        return answer;\n    }\n}",
          "explanation": "Monotonic decreasing stack stores day indices. When a warmer day arrives, it pops colder days and records day difference i - prevDay."
        },
        {
          "id": "java-83-ex3",
          "title": "Largest Rectangle in Histogram",
          "difficulty": "Advanced",
          "type": "coding",
          "prompt": "Given an array of integers heights representing the histogram's bar height where the width of each bar is 1, return the area of the largest rectangle in the histogram in O(N) time.",
          "starterCode": "public class HistogramArea {\n    public static int largestRectangleArea(int[] heights) {\n        return 0;\n    }\n}",
          "solution": "import java.util.*;\n\npublic class HistogramArea {\n    public static int largestRectangleArea(int[] heights) {\n        int n = heights.length;\n        Deque<Integer> stack = new ArrayDeque<>();\n        int maxArea = 0;\n\n        for (int i = 0; i <= n; i++) {\n            int currentHeight = (i == n) ? 0 : heights[i];\n\n            while (!stack.isEmpty() && currentHeight < heights[stack.peek()]) {\n                int h = heights[stack.pop()];\n                int w = stack.isEmpty() ? i : i - stack.peek() - 1;\n                maxArea = Math.max(maxArea, h * w);\n            }\n            stack.push(i);\n        }\n\n        return maxArea;\n    }\n}",
          "explanation": "Monotonic increasing stack tracks increasing heights. When a shorter bar appears, heights are popped and their maximal rectangular width is calculated in O(N) time."
        }
      ],
      "quizQuestions": [
        {
          "id": "java-83-q1",
          "question": "Why does Effective Java recommend `ArrayDeque` over `java.util.Stack` for stack operations?",
          "options": [
            "Because Stack does not support generic types",
            "Because Stack inherits from Vector, adding synchronization overhead on every method call and violating proper encapsulation",
            "Because ArrayDeque allows null values while Stack does not",
            "Because Stack is deprecated in Java 17"
          ],
          "correctOptionIndex": 1,
          "explanation": "java.util.Stack extends Vector, imposing synchronized locks on every push/pop and permitting random index insertion, which breaks LIFO contract. ArrayDeque is faster and non-synchronized."
        },
        {
          "id": "java-83-q2",
          "question": "What is the time complexity of the Next Greater Element algorithm using a monotonic stack?",
          "options": [
            "O(N log N)",
            "O(N^2)",
            "O(N)",
            "O(1)"
          ],
          "correctOptionIndex": 2,
          "explanation": "Each element is pushed onto the stack exactly once and popped at most once across the entire loop, guaranteeing O(N) total time."
        }
      ],
      "revisionNotes": [
        "Prefer `Deque<T> = new ArrayDeque<>()` over legacy `java.util.Stack`.",
        "Monotonic stacks resolve Next Greater / Smaller element queries in O(N) amortized time.",
        "Store indices rather than values in stacks when relative distances or widths are required."
      ],
      "moduleId": "java-m6",
      "moduleNumber": 6,
      "moduleTitle": "Java Problem Solving",
      "language": "java"
    },
    {
      "id": "java-84-trees",
      "topicNumber": 84,
      "title": "Tree Traversals, BST Operations & Lowest Common Ancestor",
      "level": "Intermediate",
      "whyItMatters": "Hierarchical data structures model file systems, DOM trees, and databases. Mastering Depth-First Search (Pre/In/Post-order) and Breadth-First Search (Level-Order) provides the backbone for tree algorithm design.",
      "explanation": "1. Binary Tree Node Definition:\npublic class TreeNode {\n    int val;\n    TreeNode left, right;\n    TreeNode(int val) { this.val = val; }\n}\n\n2. DFS Traversal Orders:\n- Pre-order (Root -> Left -> Right): Useful for copying/serializing trees.\n- In-order (Left -> Root -> Right): In a Binary Search Tree (BST), in-order traversal yields values in strictly ASCENDING sorted order!\n- Post-order (Left -> Right -> Root): Useful for bottom-up computation (calculating height, deleting tree).\n\n3. BFS Level-Order Traversal:\n- Use Queue<TreeNode> queue = new ArrayDeque<>();\n- In each outer loop, snapshot int levelSize = queue.size();\n- Process exactly levelSize nodes to group tree nodes by depth level.\n\n4. Binary Search Tree (BST) Properties:\nFor every node, all nodes in its left subtree have val < node.val, and all nodes in its right subtree have val > node.val. Validating a BST requires passing valid ranges (min, max) rather than just comparing local children.",
      "syntaxAndStructure": "// Level-order BFS traversal template:\nQueue<TreeNode> q = new ArrayDeque<>();\nq.offer(root);\nwhile (!q.isEmpty()) {\n    int size = q.size();\n    for (int i = 0; i < size; i++) {\n        TreeNode node = q.poll();\n        if (node.left != null) q.offer(node.left);\n        if (node.right != null) q.offer(node.right);\n    }\n}",
      "codeExamples": [
        {
          "title": "Binary Tree Level Order Traversal (BFS)",
          "code": "import java.util.*;\n\npublic class LevelOrderDemo {\n    static class TreeNode {\n        int val;\n        TreeNode left, right;\n        TreeNode(int val) { this.val = val; }\n    }\n\n    public static List<List<Integer>> levelOrder(TreeNode root) {\n        List<List<Integer>> result = new ArrayList<>();\n        if (root == null) return result;\n\n        Queue<TreeNode> queue = new ArrayDeque<>();\n        queue.offer(root);\n\n        while (!queue.isEmpty()) {\n            int levelSize = queue.size();\n            List<Integer> currentLevel = new ArrayList<>(levelSize);\n\n            for (int i = 0; i < levelSize; i++) {\n                TreeNode node = queue.poll();\n                currentLevel.add(node.val);\n\n                if (node.left != null) queue.offer(node.left);\n                if (node.right != null) queue.offer(node.right);\n            }\n\n            result.add(currentLevel);\n        }\n\n        return result;\n    }\n\n    public static void main(String[] args) {\n        TreeNode root = new TreeNode(3);\n        root.left = new TreeNode(9);\n        root.right = new TreeNode(20);\n        root.right.left = new TreeNode(15);\n        root.right.right = new TreeNode(7);\n\n        System.out.println(\"Level order: \" + levelOrder(root));\n    }\n}",
          "expectedOutput": "Level order: [[3], [9, 20], [15, 7]]",
          "explanation": "Taking levelSize = queue.size() before processing each level isolates nodes by depth, running in O(N) time and O(N) space."
        },
        {
          "title": "Validate Binary Search Tree (BST)",
          "code": "public class ValidateBSTDemo {\n    static class TreeNode {\n        int val;\n        TreeNode left, right;\n        TreeNode(int val) { this.val = val; }\n    }\n\n    public static boolean isValidBST(TreeNode root) {\n        return validate(root, null, null);\n    }\n\n    private static boolean validate(TreeNode node, Integer min, Integer max) {\n        if (node == null) return true;\n\n        if ((min != null && node.val <= min) || (max != null && node.val >= max)) {\n            return false;\n        }\n\n        // Left children must be < node.val; Right children must be > node.val\n        return validate(node.left, min, node.val) && validate(node.right, node.val, max);\n    }\n\n    public static void main(String[] args) {\n        TreeNode root = new TreeNode(2);\n        root.left = new TreeNode(1);\n        root.right = new TreeNode(3);\n        System.out.println(\"Is valid BST: \" + isValidBST(root));\n    }\n}",
          "expectedOutput": "Is valid BST: true",
          "explanation": "Passing dynamic min and max bounds ensures that every node in the left subtree is less than the root, avoiding the common bug where only immediate children are checked."
        }
      ],
      "realWorldApplications": [
        "Document Object Model (DOM) rendering engines in web browsers.",
        "SQL query optimizers transforming relational algebra expressions into Abstract Syntax Trees (ASTs)."
      ],
      "commonMistakes": [
        "Checking only immediate children (node.left.val < node.val) when validating a BST; this misses violations deeper in the subtree.",
        "Using Integer.MIN_VALUE or MAX_VALUE as initial bounds in BST validation, which fails if the tree contains nodes with Integer.MIN_VALUE.",
        "Stack overflow in skewed (unbalanced) trees when relying on naive recursion without tail optimization."
      ],
      "interviewRelevance": "Lowest Common Ancestor, Validate BST, Maximum Path Sum, and Binary Tree Zigzag Level Order Traversal are standard coding interview fixtures at Microsoft, Amazon, and Meta.",
      "checkpoints": [
        {
          "id": "java-84-cp1",
          "label": "Implement Pre-order, In-order, and Post-order DFS traversals"
        },
        {
          "id": "java-84-cp2",
          "label": "Implement BFS Level-Order Traversal using Queue and snapshot size"
        },
        {
          "id": "java-84-cp3",
          "label": "Validate a BST by maintaining recursive upper and lower boundary limits"
        }
      ],
      "practiceExercises": [
        {
          "id": "java-84-ex1",
          "title": "Maximum Depth of Binary Tree",
          "difficulty": "Beginner",
          "type": "coding",
          "prompt": "Given the root of a binary tree, return its maximum depth (number of nodes along longest path from root to leaf).",
          "starterCode": "public class MaxDepthTree {\n    public static int maxDepth(TreeNode root) {\n        return 0;\n    }\n}",
          "solution": "public class MaxDepthTree {\n    public static int maxDepth(TreeNode root) {\n        if (root == null) return 0;\n        return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));\n    }\n}",
          "explanation": "Bottom-up post-order recursion returns 1 + max(leftDepth, rightDepth) in O(N) time and O(H) space."
        },
        {
          "id": "java-84-ex2",
          "title": "Lowest Common Ancestor of a Binary Search Tree",
          "difficulty": "Intermediate",
          "type": "coding",
          "prompt": "Given a binary search tree (BST), find the lowest common ancestor (LCA) node of two given nodes p and q in the BST.",
          "starterCode": "public class LCABST {\n    public static TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {\n        return null;\n    }\n}",
          "solution": "public class LCABST {\n    public static TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {\n        TreeNode curr = root;\n\n        while (curr != null) {\n            if (p.val < curr.val && q.val < curr.val) {\n                curr = curr.left;\n            } else if (p.val > curr.val && q.val > curr.val) {\n                curr = curr.right;\n            } else {\n                return curr; // Split point: this is the LCA!\n            }\n        }\n\n        return null;\n    }\n}",
          "explanation": "Exploit BST property: if both values are smaller, move left; if both values are larger, move right; the first node where paths diverge is the LCA. O(H) time and O(1) space."
        },
        {
          "id": "java-84-ex3",
          "title": "Lowest Common Ancestor of a Binary Tree (General)",
          "difficulty": "Advanced",
          "type": "coding",
          "prompt": "Given a general binary tree (not a BST), find the lowest common ancestor (LCA) of two given nodes p and q.",
          "starterCode": "public class LCAGeneral {\n    public static TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {\n        return null;\n    }\n}",
          "solution": "public class LCAGeneral {\n    public static TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {\n        if (root == null || root == p || root == q) {\n            return root;\n        }\n\n        TreeNode left = lowestCommonAncestor(root.left, p, q);\n        TreeNode right = lowestCommonAncestor(root.right, p, q);\n\n        if (left != null && right != null) {\n            return root; // p and q found in separate subtrees\n        }\n\n        return (left != null) ? left : right;\n    }\n}",
          "explanation": "If p and q are found in different subtrees (left != null && right != null), root is their LCA. Otherwise, bubble up the non-null result in O(N) time."
        }
      ],
      "quizQuestions": [
        {
          "id": "java-84-q1",
          "question": "Which tree traversal order visits nodes in ascending sorted order when applied to a valid Binary Search Tree (BST)?",
          "options": [
            "Pre-order",
            "In-order",
            "Post-order",
            "Level-order"
          ],
          "correctOptionIndex": 1,
          "explanation": "In-order traversal visits (Left, Root, Right). Since all left elements are smaller and right elements are larger, in-order produces strictly ascending sorted order."
        },
        {
          "id": "java-84-q2",
          "question": "What is the auxiliary space complexity of Level-Order Traversal (BFS) on a full binary tree with N nodes?",
          "options": [
            "O(1)",
            "O(log N)",
            "O(N)",
            "O(N^2)"
          ],
          "correctOptionIndex": 2,
          "explanation": "In a full binary tree, the last level contains ceil(N / 2) leaf nodes. At peak memory, the queue holds all leaf nodes simultaneously, consuming O(N) space."
        }
      ],
      "revisionNotes": [
        "In-order traversal on a BST yields elements in sorted ascending order.",
        "Level-order BFS groups nodes by depth using snapshot `int size = queue.size()`.",
        "BST validation requires tracking recursive `(min, max)` range bounds."
      ],
      "moduleId": "java-m6",
      "moduleNumber": 6,
      "moduleTitle": "Java Problem Solving",
      "language": "java"
    },
    {
      "id": "java-85-dynamic-programming",
      "topicNumber": 85,
      "title": "Dynamic Programming in Java: Memoization vs Tabulation",
      "level": "Advanced",
      "whyItMatters": "Dynamic Programming optimizes problems with Overlapping Subproblems and Optimal Substructure. Moving from naive exponential recursion O(2^N) to polynomial time O(N) or O(N * W) is the hallmark of advanced problem-solving.",
      "explanation": "1. Top-Down Memoization vs Bottom-Up Tabulation:\n- Top-Down (Memoization): Keep the natural recursive formulation. Store results in a cache (int[] or int[][]) to eliminate redundant subtree calculations. Prone to stack overflow if recursion depth is large.\n- Bottom-Up (Tabulation): Solve subproblems in topological order starting from base cases, filling an array iteratively. Eliminates call-stack overhead and enables space optimization.\n\n2. 0/1 Knapsack Pattern:\nGiven weights wt[], values val[], and capacity W:\n- dp[i][w]: max value considering first i items with weight limit w.\n- State transition: dp[i][w] = Math.max(dp[i-1][w], val[i-1] + dp[i-1][w - wt[i-1]])\n- Space Optimization: Notice dp[i] only depends on row dp[i-1]. We can reduce space to a 1D array dp[w] by iterating w backward from W down to wt[i-1]!\n\n3. Longest Common Subsequence (LCS):\nGiven two strings s1 and s2:\n- If s1.charAt(i-1) == s2.charAt(j-1): dp[i][j] = 1 + dp[i-1][j-1]\n- Else: dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1])",
      "syntaxAndStructure": "// 1D Space-Optimized Knapsack DP:\nint[] dp = new int[W + 1];\nfor (int i = 0; i < n; i++) {\n    for (int w = W; w >= wt[i]; w--) {\n        dp[w] = Math.max(dp[w], dp[w - wt[i]] + val[i]);\n    }\n}",
      "codeExamples": [
        {
          "title": "0/1 Knapsack: 1D Space-Optimized Tabulation",
          "code": "public class KnapsackDemo {\n    public static int knapsack(int[] wt, int[] val, int W) {\n        int[] dp = new int[W + 1];\n\n        for (int i = 0; i < wt.length; i++) {\n            // Iterate backward to avoid using the same item multiple times\n            for (int w = W; w >= wt[i]; w--) {\n                dp[w] = Math.max(dp[w], dp[w - wt[i]] + val[i]);\n            }\n        }\n\n        return dp[W];\n    }\n\n    public static void main(String[] args) {\n        int[] wt = {1, 3, 4, 5};\n        int[] val = {1, 4, 5, 7};\n        int W = 7;\n\n        System.out.println(\"Max Knapsack Value: \" + knapsack(wt, val, W));\n    }\n}",
          "expectedOutput": "Max Knapsack Value: 9",
          "explanation": "Iterating w backward from W to wt[i] ensures that each item is used at most once while reducing memory from O(N * W) to O(W)."
        },
        {
          "title": "Longest Increasing Subsequence in O(N log N) using Binary Search",
          "code": "import java.util.*;\n\npublic class LISDemo {\n    public static int lengthOfLIS(int[] nums) {\n        List<Integer> tails = new ArrayList<>();\n\n        for (int x : nums) {\n            int idx = Collections.binarySearch(tails, x);\n            if (idx < 0) idx = -(idx + 1); // Insertion point\n\n            if (idx == tails.size()) {\n                tails.add(x);\n            } else {\n                tails.set(idx, x);\n            }\n        }\n\n        return tails.size();\n    }\n\n    public static void main(String[] args) {\n        int[] nums = {10, 9, 2, 5, 3, 7, 101, 18};\n        System.out.println(\"LIS Length: \" + lengthOfLIS(nums));\n    }\n}",
          "expectedOutput": "LIS Length: 4",
          "explanation": "Patience sorting maintains the smallest tail of all increasing subsequences of length i+1. Using binary search achieves O(N log N) time over naive O(N^2) DP."
        }
      ],
      "realWorldApplications": [
        "Diff tools (git diff) and DNA sequence alignment computing Longest Common Subsequences.",
        "Resource allocation and knapsack budgeting in cloud scheduling systems."
      ],
      "commonMistakes": [
        "Iterating forward (w from wt[i] to W) in 0/1 knapsack: this converts the solution into Unbounded Knapsack where items are reused indefinitely.",
        "Missing base cases or uninitialized memo tables (e.g. using 0 as unvisited marker when 0 is a valid result; use -1 or Arrays.fill(memo, -1)).",
        "Using boxed Integer[][] instead of primitive int[][] for DP tables, multiplying heap memory usage by 6x."
      ],
      "interviewRelevance": "Coin Change, Longest Common Subsequence, Word Break, and Edit Distance are core interview problems at Google, Uber, and Amazon.",
      "checkpoints": [
        {
          "id": "java-85-cp1",
          "label": "Transform recursive relations into top-down memoization and bottom-up tabulation"
        },
        {
          "id": "java-85-cp2",
          "label": "Optimize 2D DP matrices into 1D rolling arrays by backward iteration"
        },
        {
          "id": "java-85-cp3",
          "label": "Solve Longest Increasing Subsequence in O(N log N) using binary search"
        }
      ],
      "practiceExercises": [
        {
          "id": "java-85-ex1",
          "title": "Climbing Stairs",
          "difficulty": "Beginner",
          "type": "coding",
          "prompt": "You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?",
          "starterCode": "public class ClimbStairs {\n    public static int climbStairs(int n) {\n        return 0;\n    }\n}",
          "solution": "public class ClimbStairs {\n    public static int climbStairs(int n) {\n        if (n <= 2) return n;\n        int prev2 = 1, prev1 = 2;\n        for (int i = 3; i <= n; i++) {\n            int curr = prev1 + prev2;\n            prev2 = prev1;\n            prev1 = curr;\n        }\n        return prev1;\n    }\n}",
          "explanation": "dp[i] = dp[i-1] + dp[i-2]. Since it only depends on the previous two values, it can be computed in O(N) time with O(1) space."
        },
        {
          "id": "java-85-ex2",
          "title": "Coin Change (Fewest Coins)",
          "difficulty": "Intermediate",
          "type": "coding",
          "prompt": "Given an integer array coins and an integer amount, return the fewest number of coins that you need to make up that amount. If that amount cannot be made up, return -1.",
          "starterCode": "public class CoinChangeSolver {\n    public static int coinChange(int[] coins, int amount) {\n        return -1;\n    }\n}",
          "solution": "import java.util.Arrays;\n\npublic class CoinChangeSolver {\n    public static int coinChange(int[] coins, int amount) {\n        int max = amount + 1;\n        int[] dp = new int[amount + 1];\n        Arrays.fill(dp, max);\n        dp[0] = 0;\n\n        for (int i = 1; i <= amount; i++) {\n            for (int coin : coins) {\n                if (coin <= i) {\n                    dp[i] = Math.min(dp[i], dp[i - coin] + 1);\n                }\n            }\n        }\n\n        return dp[amount] > amount ? -1 : dp[amount];\n    }\n}",
          "explanation": "Bottom-up 1D DP where dp[i] is the minimum coins needed for amount i. Time complexity is O(amount * coins.length) and space is O(amount)."
        },
        {
          "id": "java-85-ex3",
          "title": "Longest Common Subsequence (LCS)",
          "difficulty": "Advanced",
          "type": "coding",
          "prompt": "Given two strings text1 and text2, return the length of their longest common subsequence. If there is no common subsequence, return 0.",
          "starterCode": "public class LCSSolver {\n    public static int longestCommonSubsequence(String text1, String text2) {\n        return 0;\n    }\n}",
          "solution": "public class LCSSolver {\n    public static int longestCommonSubsequence(String text1, String text2) {\n        int m = text1.length(), n = text2.length();\n        int[][] dp = new int[m + 1][n + 1];\n\n        for (int i = 1; i <= m; i++) {\n            char c1 = text1.charAt(i - 1);\n            for (int j = 1; j <= n; j++) {\n                char c2 = text2.charAt(j - 1);\n                if (c1 == c2) {\n                    dp[i][j] = 1 + dp[i - 1][j - 1];\n                } else {\n                    dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);\n                }\n            }\n        }\n\n        return dp[m][n];\n    }\n}",
          "explanation": "Standard 2D DP. If characters match, add 1 to diagonal. Else take max of top and left entries. Time is O(M * N) and space is O(M * N)."
        }
      ],
      "quizQuestions": [
        {
          "id": "java-85-q1",
          "question": "In the space-optimized 1D array implementation of the 0/1 Knapsack problem, why MUST the weight loop iterate backward from W down to wt[i]?",
          "options": [
            "To optimize CPU cache line loading",
            "To prevent using the current item multiple times, ensuring it only references values from the previous item's row",
            "Because Java arrays cannot be indexed in forward order during inner loops",
            "To avoid Integer overflow"
          ],
          "correctOptionIndex": 1,
          "explanation": "Iterating backward guarantees that dp[w - wt[i]] contains the value from the previous step i-1. Iterating forward would use the already-updated value from step i, resulting in unbounded reuse."
        },
        {
          "id": "java-85-q2",
          "question": "What two properties must a problem exhibit to be solvable with Dynamic Programming?",
          "options": [
            "Sorted input and contiguous memory",
            "Optimal substructure and overlapping subproblems",
            "Binary searchability and tail recursion",
            "Thread safety and immutability"
          ],
          "correctOptionIndex": 1,
          "explanation": "Dynamic programming applies when the global optimal solution can be constructed from optimal solutions to subproblems (optimal substructure) and subproblems repeat many times (overlapping subproblems)."
        }
      ],
      "revisionNotes": [
        "Top-down memoization caches recursive branches; bottom-up tabulation computes iteratively.",
        "In 0/1 knapsack, iterate weight backwards to compress 2D DP table into 1D array.",
        "Longest Increasing Subsequence can be optimized from O(N^2) to O(N log N) using binary search."
      ],
      "moduleId": "java-m6",
      "moduleNumber": 6,
      "moduleTitle": "Java Problem Solving",
      "language": "java"
    },
    {
      "id": "java-86-graphs",
      "topicNumber": 86,
      "title": "Graph Representations, Traversals & Topological Sorting",
      "level": "Advanced",
      "whyItMatters": "Graphs represent complex interconnected relationships: networks, build dependency graphs, road maps, and social connections. Mastering BFS shortest path, DFS cycle detection, and Kahn's topological sort is mandatory for senior software engineering roles.",
      "explanation": "1. Graph Representation in Java:\n- Adjacency List: List<List<Integer>> adj = new ArrayList<>(); for sparse graphs (E << V^2). Space: O(V + E).\n- Adjacency Matrix: boolean[][] or int[][] matrix for dense graphs. O(V^2) space, O(1) edge lookup.\n\n2. Breadth-First Search (BFS):\n- Finds shortest path in unweighted graphs.\n- Use Queue<Integer> queue = new ArrayDeque<>(); and boolean[] visited array.\n\n3. Depth-First Search (DFS) & Cycle Detection:\n- In directed graphs, a simple visited array is insufficient. We need 3 states:\n  - State 0: Unvisited.\n  - State 1: Visiting (currently in recursion call stack). If encountered again -> CYCLE DETECTED!\n  - State 2: Visited (fully processed).\n\n4. Topological Sort (Kahn’s Algorithm):\n- Applicable only to Directed Acyclic Graphs (DAG).\n- Compute in-degrees: int[] inDegree = new int[V];\n- Enqueue all nodes with inDegree == 0.\n- Repeatedly dequeue node u, append to order, and decrement inDegree of its neighbors.\n- If any neighbor reaches inDegree == 0, enqueue it.\n- If processed count < V, graph contains a cycle!",
      "syntaxAndStructure": "// Kahn's Algorithm for Topological Sort:\nint[] inDegree = new int[numCourses];\nfor (int[] edge : prerequisites) inDegree[edge[0]]++;\nQueue<Integer> q = new ArrayDeque<>();\nfor (int i = 0; i < numCourses; i++) if (inDegree[i] == 0) q.offer(i);",
      "codeExamples": [
        {
          "title": "Topological Sort using Kahn's Algorithm (Course Schedule)",
          "code": "import java.util.*;\n\npublic class KahnTopologicalSort {\n    public static boolean canFinish(int numCourses, int[][] prerequisites) {\n        List<List<Integer>> adj = new ArrayList<>();\n        for (int i = 0; i < numCourses; i++) adj.add(new ArrayList<>());\n\n        int[] inDegree = new int[numCourses];\n        for (int[] p : prerequisites) {\n            int course = p[0], pre = p[1];\n            adj.get(pre).add(course);\n            inDegree[course]++;\n        }\n\n        Queue<Integer> queue = new ArrayDeque<>();\n        for (int i = 0; i < numCourses; i++) {\n            if (inDegree[i] == 0) queue.offer(i);\n        }\n\n        int count = 0;\n        while (!queue.isEmpty()) {\n            int curr = queue.poll();\n            count++;\n\n            for (int neighbor : adj.get(curr)) {\n                inDegree[neighbor]--;\n                if (inDegree[neighbor] == 0) {\n                    queue.offer(neighbor);\n                }\n            }\n        }\n\n        return count == numCourses; // True if all courses can be taken (no cycle)\n    }\n\n    public static void main(String[] args) {\n        int[][] pre1 = {{1, 0}};\n        System.out.println(\"Can finish pre1: \" + canFinish(2, pre1));\n\n        int[][] pre2 = {{1, 0}, {0, 1}};\n        System.out.println(\"Can finish pre2 (cycle): \" + canFinish(2, pre2));\n    }\n}",
          "expectedOutput": "Can finish pre1: true\nCan finish pre2 (cycle): false",
          "explanation": "Kahn's algorithm processes nodes with in-degree 0. If a directed cycle exists, in-degrees never reach 0, leaving count < numCourses in O(V + E) time."
        },
        {
          "title": "Shortest Path in Unweighted Graph using BFS",
          "code": "import java.util.*;\n\npublic class BFSShortestPath {\n    public static int shortestPath(int n, List<List<Integer>> adj, int start, int end) {\n        boolean[] visited = new boolean[n];\n        Queue<Integer> queue = new ArrayDeque<>();\n\n        queue.offer(start);\n        visited[start] = true;\n        int distance = 0;\n\n        while (!queue.isEmpty()) {\n            int size = queue.size();\n            for (int i = 0; i < size; i++) {\n                int node = queue.poll();\n                if (node == end) return distance;\n\n                for (int neighbor : adj.get(node)) {\n                    if (!visited[neighbor]) {\n                        visited[neighbor] = true;\n                        queue.offer(neighbor);\n                    }\n                }\n            }\n            distance++;\n        }\n\n        return -1;\n    }\n\n    public static void main(String[] args) {\n        int n = 4;\n        List<List<Integer>> adj = new ArrayList<>();\n        for (int i = 0; i < n; i++) adj.add(new ArrayList<>());\n\n        adj.get(0).add(1);\n        adj.get(1).add(2);\n        adj.get(0).add(3);\n        adj.get(3).add(2);\n\n        System.out.println(\"Shortest path from 0 to 2: \" + shortestPath(n, adj, 0, 2) + \" edges\");\n    }\n}",
          "expectedOutput": "Shortest path from 0 to 2: 2 edges",
          "explanation": "BFS expands outward level by level. The first time the destination node is dequeued, the current level counter represents the shortest path in O(V + E) time."
        }
      ],
      "realWorldApplications": [
        "Build systems like Maven and Gradle ordering module compilation tasks via Topological Sort.",
        "GPS navigation routing finding shortest paths across street network graphs."
      ],
      "commonMistakes": [
        "Using simple boolean[] visited for cycle detection in directed graphs: directed cross-edges will be misidentified as cycles! Use 3-state coloring (0=unvisited, 1=visiting, 2=visited).",
        "Forgetting to initialize empty ArrayLists for every node in the adjacency list, causing NullPointerException.",
        "Using DFS for shortest paths in unweighted graphs instead of BFS, leading to suboptimal paths and exponential exploration."
      ],
      "interviewRelevance": "Course Schedule I & II, Number of Islands, Word Ladder, and Alien Dictionary are premier interview questions at Google, Uber, and Amazon.",
      "checkpoints": [
        {
          "id": "java-86-cp1",
          "label": "Construct adjacency lists using List<List<Integer>> for sparse graph modeling"
        },
        {
          "id": "java-86-cp2",
          "label": "Find unweighted shortest paths using level-by-level BFS queue traversal"
        },
        {
          "id": "java-86-cp3",
          "label": "Implement Kahn's Algorithm with in-degree tracking for topological sorting and cycle detection"
        }
      ],
      "practiceExercises": [
        {
          "id": "java-86-ex1",
          "title": "Number of Connected Components in Undirected Graph",
          "difficulty": "Beginner",
          "type": "coding",
          "prompt": "Given n nodes labeled from 0 to n - 1 and an array of edges, return the number of connected components in the graph.",
          "starterCode": "public class ConnectedComponents {\n    public static int countComponents(int n, int[][] edges) {\n        return 0;\n    }\n}",
          "solution": "import java.util.*;\n\npublic class ConnectedComponents {\n    public static int countComponents(int n, int[][] edges) {\n        List<List<Integer>> adj = new ArrayList<>();\n        for (int i = 0; i < n; i++) adj.add(new ArrayList<>());\n        for (int[] e : edges) {\n            adj.get(e[0]).add(e[1]);\n            adj.get(e[1]).add(e[0]);\n        }\n\n        boolean[] visited = new boolean[n];\n        int count = 0;\n\n        for (int i = 0; i < n; i++) {\n            if (!visited[i]) {\n                count++;\n                dfs(adj, visited, i);\n            }\n        }\n\n        return count;\n    }\n\n    private static void dfs(List<List<Integer>> adj, boolean[] visited, int u) {\n        visited[u] = true;\n        for (int v : adj.get(u)) {\n            if (!visited[v]) {\n                dfs(adj, visited, v);\n            }\n        }\n    }\n}",
          "explanation": "Iterate through all nodes. Each unvisited node initiates a DFS that marks an entire connected component, running in O(V + E) time."
        },
        {
          "id": "java-86-ex2",
          "title": "Course Schedule II (Find Valid Order)",
          "difficulty": "Intermediate",
          "type": "coding",
          "prompt": "Given the total number of courses numCourses and prerequisites, return the ordering of courses you should take to finish all courses. If impossible, return an empty array.",
          "starterCode": "public class CourseScheduleOrder {\n    public static int[] findOrder(int numCourses, int[][] prerequisites) {\n        return new int[0];\n    }\n}",
          "solution": "import java.util.*;\n\npublic class CourseScheduleOrder {\n    public static int[] findOrder(int numCourses, int[][] prerequisites) {\n        List<List<Integer>> adj = new ArrayList<>();\n        for (int i = 0; i < numCourses; i++) adj.add(new ArrayList<>());\n\n        int[] inDegree = new int[numCourses];\n        for (int[] p : prerequisites) {\n            adj.get(p[1]).add(p[0]);\n            inDegree[p[0]]++;\n        }\n\n        Queue<Integer> q = new ArrayDeque<>();\n        for (int i = 0; i < numCourses; i++) {\n            if (inDegree[i] == 0) q.offer(i);\n        }\n\n        int[] order = new int[numCourses];\n        int idx = 0;\n\n        while (!q.isEmpty()) {\n            int curr = q.poll();\n            order[idx++] = curr;\n\n            for (int neighbor : adj.get(curr)) {\n                inDegree[neighbor]--;\n                if (inDegree[neighbor] == 0) {\n                    q.offer(neighbor);\n                }\n            }\n        }\n\n        return idx == numCourses ? order : new int[0];\n    }\n}",
          "explanation": "Kahn's algorithm stores dequeued nodes in order array. If idx == numCourses, a valid DAG topological order exists; otherwise, return empty array."
        },
        {
          "id": "java-86-ex3",
          "title": "Number of Islands (Grid BFS/DFS)",
          "difficulty": "Advanced",
          "type": "coding",
          "prompt": "Given an m x n 2D binary grid grid where '1' represents land and '0' represents water, return the number of islands. An island is surrounded by water and formed by connecting adjacent lands horizontally or vertically.",
          "starterCode": "public class IslandCounter {\n    public static int numIslands(char[][] grid) {\n        return 0;\n    }\n}",
          "solution": "public class IslandCounter {\n    public static int numIslands(char[][] grid) {\n        if (grid == null || grid.length == 0) return 0;\n        int m = grid.length, n = grid[0].length;\n        int count = 0;\n\n        for (int r = 0; r < m; r++) {\n            for (int c = 0; c < n; c++) {\n                if (grid[r][c] == '1') {\n                    count++;\n                    floodFill(grid, r, c);\n                }\n            }\n        }\n\n        return count;\n    }\n\n    private static void floodFill(char[][] grid, int r, int c) {\n        if (r < 0 || r >= grid.length || c < 0 || c >= grid[0].length || grid[r][c] != '1') {\n            return;\n        }\n\n        grid[r][c] = '0'; // Sink island in-place to avoid extra visited matrix\n\n        floodFill(grid, r + 1, c);\n        floodFill(grid, r - 1, c);\n        floodFill(grid, r, c + 1);\n        floodFill(grid, r, c - 1);\n    }\n}",
          "explanation": "Sinking visited land cells (grid[r][c] = '0') avoids auxiliary space. DFS traverses all 4 directions, visiting each cell at most once in O(M * N) time."
        }
      ],
      "quizQuestions": [
        {
          "id": "java-86-q1",
          "question": "Why does Kahn's Algorithm fail to produce a complete ordering if the directed graph contains a cycle?",
          "options": [
            "Because the queue throws NoSuchElementException",
            "Because nodes inside a directed cycle always have in-degree >= 1, so they can never be enqueued",
            "Because arrays cannot store cycle indices",
            "Because Java collections reject cyclic data structures"
          ],
          "correctOptionIndex": 1,
          "explanation": "In a directed cycle, every member node has at least one incoming edge from another member. Their in-degrees never reach 0, meaning they are never enqueued."
        },
        {
          "id": "java-86-q2",
          "question": "Which traversal algorithm is guaranteed to find the shortest path between two nodes in an unweighted graph?",
          "options": [
            "Depth-First Search (DFS)",
            "Breadth-First Search (BFS)",
            "Topological Sort",
            "In-Order Traversal"
          ],
          "correctOptionIndex": 1,
          "explanation": "Breadth-First Search visits nodes in order of increasing distance from the start node, guaranteeing that the first time a target node is visited, it is via the shortest path."
        }
      ],
      "revisionNotes": [
        "Adjacency list `List<List<Integer>>` is standard for sparse graphs (O(V + E) space).",
        "BFS guarantees shortest path in unweighted graphs.",
        "Kahn's algorithm uses in-degree array and Queue to find Topological Sort and detect directed cycles."
      ],
      "moduleId": "java-m6",
      "moduleNumber": 6,
      "moduleTitle": "Java Problem Solving",
      "language": "java"
    }
  ],
  "moduleAssessment": {
    "id": "java-m6-assessment",
    "title": "Module 6 Assessment: Java Problem Solving",
    "passingScorePercentage": 80,
    "questions": [
      {
        "id": "java-74-q1",
        "question": "What is the theoretical worst-case time complexity of HashMap.get(key) in Java 8+ when hash collisions occur on the same bucket?",
        "options": [
          "O(1)",
          "O(log N)",
          "O(N)",
          "O(N^2)"
        ],
        "correctOptionIndex": 1,
        "explanation": "In Java 8+, hash buckets that exceed 8 colliding entries are transformed from linked lists (O(N)) into balanced Red-Black trees (TreeNode), guaranteeing O(log N) worst-case lookup."
      },
      {
        "id": "java-74-q2",
        "question": "Why does an Integer[1000] array consume significantly more heap memory than an int[1000] array in a 64-bit JVM?",
        "options": [
          "Because int is 64-bit while Integer is 128-bit",
          "Because Integer[] contains 1000 separate heap object allocations with headers in addition to 1000 references",
          "Because Java compresses int arrays but never compresses object arrays",
          "Because arrays in Java always double their internal capacity automatically"
        ],
        "correctOptionIndex": 1,
        "explanation": "An int[1000] array is a single contiguous block of 4000 bytes + header. An Integer[1000] array holds 1000 reference pointers (4-8 bytes each) pointing to 1000 separate Integer objects (24 bytes each)."
      },
      {
        "id": "java-75-q1",
        "question": "Why do we typically allocate prefix arrays with size N + 1 instead of N?",
        "options": [
          "Because Java requires arrays to have an even length",
          "To represent an empty prefix sum (0) at index 0, eliminating boundary checks when left == 0",
          "To reserve memory for the garbage collector",
          "To prevent OutOfMemoryError during array cloning"
        ],
        "correctOptionIndex": 1,
        "explanation": "A size N + 1 array with pref[0] = 0 allows querying range [left, right] as pref[right + 1] - pref[left] uniformly without needing an if (left == 0) branch."
      },
      {
        "id": "java-75-q2",
        "question": "What is the time complexity of applying Q range updates to an array of size N using a difference array?",
        "options": [
          "O(N * Q)",
          "O(Q * log N)",
          "O(N + Q)",
          "O(N * log Q)"
        ],
        "correctOptionIndex": 2,
        "explanation": "Each of the Q updates takes O(1) time to modify two points in the difference array. The final prefix sum scan takes O(N), giving total O(N + Q) time."
      },
      {
        "id": "java-76-q1",
        "question": "Why is an int[26] array preferred over HashMap<Character, Integer> when counting frequencies of lowercase English letters?",
        "options": [
          "Because HashMap does not support char keys in Java",
          "Because int[26] eliminates object allocation, boxing, and hash collisions while keeping data contiguous in CPU cache",
          "Because int[26] automatically sorts elements alphabetically",
          "Because HashMap cannot store more than 16 elements without re-allocating"
        ],
        "correctOptionIndex": 1,
        "explanation": "int[26] consumes a mere 104 bytes of contiguous primitive memory with direct index computation (c - 'a'), completely bypassing Integer autoboxing and hash bucket collisions."
      },
      {
        "id": "java-76-q2",
        "question": "In the Longest Consecutive Sequence algorithm, why do we check !numSet.contains(num - 1)?",
        "options": [
          "To ensure numbers are sorted",
          "To ensure we only start counting from the beginning of a consecutive streak, avoiding O(N^2) redundant counting",
          "To prevent NullPointerException in HashSet",
          "To skip negative numbers"
        ],
        "correctOptionIndex": 1,
        "explanation": "If num - 1 is present in the set, num cannot be the start of a streak. Checking this ensures each streak is traversed only once, guaranteeing overall O(N) time."
      },
      {
        "id": "java-77-q1",
        "question": "In the Container With Most Water problem, why do we always move the pointer pointing to the shorter vertical line?",
        "options": [
          "Because moving the taller line can never produce a larger area than the current one",
          "Because the shorter line is always closer to the center",
          "Because the array is guaranteed to be sorted",
          "Because moving the taller line throws an exception"
        ],
        "correctOptionIndex": 0,
        "explanation": "Area is limited by the shorter line: min(h1, h2) * width. Moving the taller line decreases width while the height cannot exceed the existing short line, making an increased area mathematically impossible."
      },
      {
        "id": "java-77-q2",
        "question": "What is the auxiliary space complexity of solving Trapping Rain Water using the converging two-pointer technique?",
        "options": [
          "O(N)",
          "O(log N)",
          "O(1)",
          "O(N^2)"
        ],
        "correctOptionIndex": 2,
        "explanation": "Unlike dynamic programming solutions requiring two O(N) prefix/suffix max arrays, the two-pointer approach maintains only running leftMax and rightMax variables in O(1) space."
      },
      {
        "id": "java-78-q1",
        "question": "Why does an expanding/contracting sliding window algorithm have O(N) time complexity despite having a nested while-loop?",
        "options": [
          "Because the while loop only runs if N is prime",
          "Because the right pointer advances N times and the left pointer advances at most N times across the entire algorithm execution",
          "Because Java optimizes while loops using SIMD instructions",
          "Because the inner loop breaks immediately on the first iteration"
        ],
        "correctOptionIndex": 1,
        "explanation": "Both left and right pointers strictly move from 0 to N. Since neither pointer ever moves backward, total pointer steps are at most 2N = O(N) amortized."
      },
      {
        "id": "java-78-q2",
        "question": "What is the formula for the number of elements in a window bounded by indices [left, right] inclusive?",
        "options": [
          "right - left",
          "right - left + 1",
          "right - left - 1",
          "(right + left) / 2"
        ],
        "correctOptionIndex": 1,
        "explanation": "For 0-indexed inclusive bounds [left, right], the length is right - left + 1 (e.g., indices 2 to 4 hold elements 2, 3, 4 = length 3)."
      },
      {
        "id": "java-79-q1",
        "question": "Why is `int mid = low + (high - low) / 2;` safer than `int mid = (low + high) / 2;` in Java?",
        "options": [
          "Because the division operator behaves differently on negative numbers",
          "Because (low + high) can exceed Integer.MAX_VALUE and wrap around to a negative number, resulting in ArrayIndexOutOfBoundsException",
          "Because (high - low) is calculated at compile time by the JIT compiler",
          "Because low + (high - low) / 2 uses floating-point precision internally"
        ],
        "correctOptionIndex": 1,
        "explanation": "When low and high are large (e.g. > 1 billion), low + high exceeds 2^31 - 1, producing negative 32-bit values. low + (high - low) / 2 guarantees intermediate results remain non-negative."
      },
      {
        "id": "java-79-q2",
        "question": "When can \"Binary Search on Answer\" be applied to an optimization problem?",
        "options": [
          "Only when the input array is already sorted",
          "Whenever the answer space is discrete and the feasibility function canAchieve(x) is monotonic (all false then all true, or vice versa)",
          "Only when the input contains fewer than 1,000 elements",
          "Whenever the problem can be solved in O(1) time"
        ],
        "correctOptionIndex": 1,
        "explanation": "Binary search on answer requires monotonicity: there exists a threshold where all values on one side are infeasible and all values on the other are feasible."
      },
      {
        "id": "java-80-q1",
        "question": "Why does Java throw `IllegalArgumentException: Comparison method violates its general contract` when using `(a, b) -> a - b`?",
        "options": [
          "Because Java requires all comparators to implement Serializable",
          "Because integer overflow occurs when subtracting a negative number from a positive number, violating transitivity",
          "Because subtraction is not allowed in lambda expressions",
          "Because modern Java only accepts method references in sort()"
        ],
        "correctOptionIndex": 1,
        "explanation": "If a = 1,000,000,000 and b = -1,500,000,000, a - b = 2,500,000,000 which overflows to negative, reporting a < b falsely. TimSort detects this violation of strict weak ordering and throws an exception."
      },
      {
        "id": "java-80-q2",
        "question": "Which sorting algorithm is used by Collections.sort() and Arrays.sort(Object[]) in Java?",
        "options": [
          "Quicksort",
          "Heapsort",
          "TimSort (hybrid Merge Sort + Insertion Sort)",
          "Bubble Sort"
        ],
        "correctOptionIndex": 2,
        "explanation": "TimSort is used for objects because it is guaranteed O(N log N) worst-case, requires O(N) auxiliary space, and is strictly stable (preserves relative order of equal keys)."
      },
      {
        "id": "java-81-q1",
        "question": "Why must we execute `result.add(new ArrayList<>(current));` instead of `result.add(current);` in backtracking algorithms?",
        "options": [
          "Because Java collections cannot store lists inside lists",
          "Because `current` is a mutable reference that gets cleared and modified during backtracking; without a defensive copy, all elements in `result` would end up empty",
          "Because new ArrayList<>() converts the list into a synchronized list",
          "Because result.add(current) causes a compile-time type error"
        ],
        "correctOptionIndex": 1,
        "explanation": "If you store `current`, you are storing a single reference that is repeatedly mutated. By the end of backtracking, all entries in `result` will point to the same empty list."
      },
      {
        "id": "java-81-q2",
        "question": "What is the primary difference in parameter passing between Subsets and Permutations backtracking?",
        "options": [
          "Subsets uses a boolean[] array while Permutations uses an integer start index",
          "Subsets passes a `start` index to only explore forward elements, while Permutations checks all indices using a `boolean[] used` array",
          "Subsets can only handle positive integers",
          "Permutations does not require backtracking state restoration"
        ],
        "correctOptionIndex": 1,
        "explanation": "Subsets uses `start` to avoid re-ordering the same subset (order doesn't matter). Permutations examines all elements in every order, requiring a `used[]` flag."
      },
      {
        "id": "java-82-q1",
        "question": "Why is a dummy (sentinel) head node beneficial when manipulating linked lists in Java?",
        "options": [
          "Because JVM cannot allocate ListNode without a dummy node",
          "Because it eliminates special null and head checks when inserting, deleting, or merging at the beginning of a list",
          "Because it converts a singly linked list into a doubly linked list",
          "Because it automatically prevents memory leaks in the garbage collector"
        ],
        "correctOptionIndex": 1,
        "explanation": "A dummy node provides a fixed non-null anchor preceding head, making operations on the first node identical to operations on any other node."
      },
      {
        "id": "java-82-q2",
        "question": "In Floyd's Cycle Detection algorithm, why must we check `fast != null && fast.next != null`?",
        "options": [
          "To ensure the linked list has at least three nodes",
          "To prevent NullPointerException when advancing `fast = fast.next.next` on even-length or terminated lists",
          "To check if the values inside nodes are integers",
          "To trigger garbage collection on unreachable nodes"
        ],
        "correctOptionIndex": 1,
        "explanation": "If fast is null or fast.next is null, attempting fast.next.next immediately throws NullPointerException. Both must be non-null."
      },
      {
        "id": "java-83-q1",
        "question": "Why does Effective Java recommend `ArrayDeque` over `java.util.Stack` for stack operations?",
        "options": [
          "Because Stack does not support generic types",
          "Because Stack inherits from Vector, adding synchronization overhead on every method call and violating proper encapsulation",
          "Because ArrayDeque allows null values while Stack does not",
          "Because Stack is deprecated in Java 17"
        ],
        "correctOptionIndex": 1,
        "explanation": "java.util.Stack extends Vector, imposing synchronized locks on every push/pop and permitting random index insertion, which breaks LIFO contract. ArrayDeque is faster and non-synchronized."
      },
      {
        "id": "java-83-q2",
        "question": "What is the time complexity of the Next Greater Element algorithm using a monotonic stack?",
        "options": [
          "O(N log N)",
          "O(N^2)",
          "O(N)",
          "O(1)"
        ],
        "correctOptionIndex": 2,
        "explanation": "Each element is pushed onto the stack exactly once and popped at most once across the entire loop, guaranteeing O(N) total time."
      },
      {
        "id": "java-84-q1",
        "question": "Which tree traversal order visits nodes in ascending sorted order when applied to a valid Binary Search Tree (BST)?",
        "options": [
          "Pre-order",
          "In-order",
          "Post-order",
          "Level-order"
        ],
        "correctOptionIndex": 1,
        "explanation": "In-order traversal visits (Left, Root, Right). Since all left elements are smaller and right elements are larger, in-order produces strictly ascending sorted order."
      },
      {
        "id": "java-84-q2",
        "question": "What is the auxiliary space complexity of Level-Order Traversal (BFS) on a full binary tree with N nodes?",
        "options": [
          "O(1)",
          "O(log N)",
          "O(N)",
          "O(N^2)"
        ],
        "correctOptionIndex": 2,
        "explanation": "In a full binary tree, the last level contains ceil(N / 2) leaf nodes. At peak memory, the queue holds all leaf nodes simultaneously, consuming O(N) space."
      },
      {
        "id": "java-85-q1",
        "question": "In the space-optimized 1D array implementation of the 0/1 Knapsack problem, why MUST the weight loop iterate backward from W down to wt[i]?",
        "options": [
          "To optimize CPU cache line loading",
          "To prevent using the current item multiple times, ensuring it only references values from the previous item's row",
          "Because Java arrays cannot be indexed in forward order during inner loops",
          "To avoid Integer overflow"
        ],
        "correctOptionIndex": 1,
        "explanation": "Iterating backward guarantees that dp[w - wt[i]] contains the value from the previous step i-1. Iterating forward would use the already-updated value from step i, resulting in unbounded reuse."
      },
      {
        "id": "java-85-q2",
        "question": "What two properties must a problem exhibit to be solvable with Dynamic Programming?",
        "options": [
          "Sorted input and contiguous memory",
          "Optimal substructure and overlapping subproblems",
          "Binary searchability and tail recursion",
          "Thread safety and immutability"
        ],
        "correctOptionIndex": 1,
        "explanation": "Dynamic programming applies when the global optimal solution can be constructed from optimal solutions to subproblems (optimal substructure) and subproblems repeat many times (overlapping subproblems)."
      },
      {
        "id": "java-86-q1",
        "question": "Why does Kahn's Algorithm fail to produce a complete ordering if the directed graph contains a cycle?",
        "options": [
          "Because the queue throws NoSuchElementException",
          "Because nodes inside a directed cycle always have in-degree >= 1, so they can never be enqueued",
          "Because arrays cannot store cycle indices",
          "Because Java collections reject cyclic data structures"
        ],
        "correctOptionIndex": 1,
        "explanation": "In a directed cycle, every member node has at least one incoming edge from another member. Their in-degrees never reach 0, meaning they are never enqueued."
      },
      {
        "id": "java-86-q2",
        "question": "Which traversal algorithm is guaranteed to find the shortest path between two nodes in an unweighted graph?",
        "options": [
          "Depth-First Search (DFS)",
          "Breadth-First Search (BFS)",
          "Topological Sort",
          "In-Order Traversal"
        ],
        "correctOptionIndex": 1,
        "explanation": "Breadth-First Search visits nodes in order of increasing distance from the start node, guaranteeing that the first time a target node is visited, it is via the shortest path."
      }
    ]
  },
  "revisionQuestions": [
    "How does an Integer[] array impact memory overhead and cache locality compared to a primitive int[] array?",
    "Explain the Difference Array pattern and how it executes O(1) range updates.",
    "Walk through the two-pointer technique for Container With Most Water and why moving the shorter line is optimal.",
    "Explain Kahn's Algorithm for Topological Sorting and how it identifies cycles in directed graphs.",
    "Why must custom Comparators avoid subtraction `(a, b) -> a - b` and use `Integer.compare(a, b)` instead?"
  ]
};
