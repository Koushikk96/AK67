import { MasteryTopic, MasteryModule } from '@/types/mastery';

export const module2Topics: MasteryTopic[] = [
  {
    id: 'py-11-strings-methods',
    moduleId: 'py-m2',
    moduleNumber: 2,
    moduleTitle: 'Python Data Structures',
    topicNumber: 11,
    title: 'Strings, Immutability & Essential String Methods',
    language: 'python',
    level: 'Beginner',
    whyItMatters:
      'Strings are ubiquitous in placement coding and interview questions. Because Python strings are immutable Unicode sequences, understanding in-place modifications vs string generation is critical for $O(n)$ algorithmic efficiency.',
    explanation:
      'In Python, strings (str) are immutable sequences of Unicode characters. Any operation that modifies a string returns a new string object. Core methods include .split(sep) for breaking strings into lists, .join(iterable) for joining efficiently in $O(n)$ time, .strip(chars) for trimming whitespace, .replace(old, new, count) for substitution, .find()/.index() for substring searches, and boolean checks like .startswith(), .endswith(), .isalnum(), and .isdigit().',
    syntaxAndStructure:
      's = " Placement 2026 "\nclean_s = s.strip()             # "Placement 2026"\nwords = clean_s.split(" ")      # ["Placement", "2026"]\njoined = "-".join(words)        # "Placement-2026"\nis_digit = "123".isdigit()      # True',
    codeExamples: [
      {
        title: 'Essential String Methods in Action',
        code: `text = "  Python,Java,C++,Go  "

# 1. Strip whitespace and split by comma
languages = [lang.strip() for lang in text.strip().split(",")]
print("Clean languages list:", languages)

# 2. Join into a formatted string
formatted_output = " -> ".join(languages)
print("Pipeline:", formatted_output)

# 3. Safe substring replacement and counting
sentence = "the cat sat on the mat"
print("Count of 'the':", sentence.count("the"))
print("Replaced:", sentence.replace("the", "a", 1))`,
        expectedOutput: `Clean languages list: ['Python', 'Java', 'C++', 'Go']
Pipeline: Python -> Java -> C++ -> Go
Count of 'the': 2
Replaced: a cat sat on the mat`,
        explanation: 'strip() removes leading/trailing spaces. .join() creates a single concatenated string in $O(N)$ time instead of quadratic repeated concatenation.',
      },
      {
        title: 'Validating Palindrome String (Ignoring Non-Alphanumerics)',
        code: `def is_palindrome(s: str) -> bool:
    # Filter alphanumerics and lowercase
    filtered = [ch.lower() for ch in s if ch.isalnum()]
    return filtered == filtered[::-1]

print("Is 'A man, a plan, a canal: Panama' palindrome?", is_palindrome("A man, a plan, a canal: Panama"))
print("Is 'race a car' palindrome?", is_palindrome("race a car"))`,
        expectedOutput: `Is 'A man, a plan, a canal: Panama' palindrome? True
Is 'race a car' palindrome? False`,
        explanation: 'isalnum() and lower() allow robust tokenization for classic placement palindrome checks.',
      },
    ],
    realWorldApplications: [
      'Text processing, sanitizing user inputs, log file parsing, and natural language preprocessing.',
      'Data cleaning in data science and ETL pipelines.',
    ],
    commonMistakes: [
      'Attempting in-place character assignment like `s[0] = "H"`; Python raises `TypeError: \'str\' object does not support item assignment`.',
      'Using repeated `+` concatenation inside loops ($O(N^2)$ due to immutability); always append to a list and use `"".join()`.',
      'Confusing `.find()` (returns -1 if not found) with `.index()` (raises `ValueError` if not found).',
    ],
    interviewRelevance:
      'High-frequency interview topic: "Why are strings immutable in Python?" (Answer: security, hashability as dictionary keys, memory caching via string interning).',
    checkpoints: [
      { id: 'py-11-cp-1', label: 'Understand string immutability and memory allocation.' },
      { id: 'py-11-cp-2', label: 'Use "".join() for optimal O(N) string concatenation.' },
    ],
    practiceExercises: [
      {
        id: 'py-11-ex-1',
        title: 'Reverse Words in a Sentence',
        difficulty: 'Beginner',
        type: 'coding',
        prompt: 'Given `"  the sky  is blue "`, return words reversed as `"blue is sky the"` with single spaces between words.',
        starterCode: 'def reverse_words(s: str) -> str:\n    pass',
        solution: `def reverse_words(s: str) -> str:
    # split() without arguments automatically splits on arbitrary consecutive whitespace
    words = s.split()
    return " ".join(reversed(words))

print(reverse_words("  the sky  is blue "))  # "blue is sky the"`,
        explanation: 's.split() without arguments trims leading/trailing spaces and ignores multiple consecutive spaces automatically.',
      },
      {
        id: 'py-11-ex-2',
        title: 'Predict Immutability Behavior',
        difficulty: 'Intermediate',
        type: 'output_prediction',
        prompt: 'What happens when running: `s = "hello"; s.replace("h", "j"); print(s)`?',
        solution: 'Prints "hello". Strings are immutable; s.replace() returns a new string which was not assigned back to s.',
        explanation: 'Because strings are immutable, methods return a new string. You must do `s = s.replace("h", "j")` to update the variable reference.',
      },
      {
        id: 'py-11-ex-3',
        title: 'String Compression (Run-Length Encoding)',
        difficulty: 'Advanced',
        type: 'coding',
        prompt: 'Compress `"aabcccccaaa"` to `"a2b1c5a3"`. If compressed is not shorter, return original.',
        starterCode: 'def compress_string(s: str) -> str:\n    pass',
        solution: `def compress_string(s: str) -> str:
    if not s:
        return s
    compressed = []
    count = 1
    for i in range(1, len(s)):
        if s[i] == s[i - 1]:
            count += 1
        else:
            compressed.append(f"{s[i - 1]}{count}")
            count = 1
    compressed.append(f"{s[-1]}{count}")
    result = "".join(compressed)
    return result if len(result) < len(s) else s

print(compress_string("aabcccccaaa"))  # "a2b1c5a3"
print(compress_string("abcd"))         # "abcd"`,
        explanation: 'Classic coding interview question on single-pass counting and list join building.',
      },
    ],
    quizQuestions: [
      {
        id: 'py-11-q1',
        question: 'What happens if you execute: s = "python"; s[0] = "P"?',
        options: [
          's becomes "Python"',
          'TypeError: "str" object does not support item assignment',
          'ValueError: immutable string',
          'IndexError: string index out of range',
        ],
        correctOptionIndex: 1,
        explanation: 'Strings in Python are immutable sequences; individual characters cannot be reassigned in-place.',
      },
      {
        id: 'py-11-q2',
        question: 'Why should "".join(list_of_strings) be preferred over loop concatenation (+)?',
        options: [
          'join operates in O(N) time while repeated + operates in O(N^2) due to creating new string copies',
          'join operates in O(1) time',
          '+ is deprecated in Python 3',
          'join works only on integers',
        ],
        correctOptionIndex: 0,
        explanation: 'Repeated string concatenation copies the entire prefix repeatedly, causing O(N^2) time complexity. .join() allocates memory once in O(N).',
      },
    ],
    revisionNotes: [
      'Strings are immutable; methods return brand new string objects.',
      'Use s.split() without arguments to split on consecutive whitespaces.',
      'Always use "".join(list) for efficient O(N) concatenation.',
    ],
  },
  {
    id: 'py-12-lists-operations',
    moduleId: 'py-m2',
    moduleNumber: 2,
    moduleTitle: 'Python Data Structures',
    topicNumber: 12,
    title: 'Lists, Memory Layout & Dynamic Array Operations',
    language: 'python',
    level: 'Beginner',
    whyItMatters:
      'Lists are Python\'s primary dynamic array structure. Knowing the time complexities of list operations ($O(1)$ append/pop vs $O(n)$ insert/delete) is essential for cracking placement DSA.',
    explanation:
      'A Python list is a contiguous dynamic array of object pointers. Memory is over-allocated to achieve amortized $O(1)$ time for .append() and .pop() from the end. Operations at the beginning or middle (.insert(0, val), .pop(0), .remove(val)) require shifting elements, incurring $O(n)$ time. Lists are mutable and can hold heterogeneous types. Key methods include .append(), .extend(), .insert(), .remove(), .pop(), .clear(), .index(), .count(), .sort(), and .reverse().',
    syntaxAndStructure:
      '# List operations:\narr = [1, 2, 3]\narr.append(4)         # O(1) amortized\narr.extend([5, 6])    # O(k) where k is items added\narr.insert(0, 0)      # O(n) shifts all elements right\nlast = arr.pop()      # O(1) removes and returns last element\nfirst = arr.pop(0)    # O(n) shifts all elements left\narr.sort(reverse=True)# O(n log n) in-place Timsort',
    codeExamples: [
      {
        title: 'List Method Operations & Time Complexities',
        code: `nums = [10, 20, 30]

# O(1) operations:
nums.append(40)
print("After append(40):", nums)

popped_val = nums.pop()
print(f"Popped value: {popped_val}, Remaining: {nums}")

# In-place sorting with custom key:
words = ["banana", "pie", "apple", "kiwi"]
words.sort(key=len)  # Sort by word length
print("Sorted by length:", words)

# Difference between sort() and sorted():
original = [5, 2, 8, 1]
new_sorted = sorted(original)  # Returns new list; original untouched
print("original:", original)
print("new_sorted:", new_sorted)`,
        expectedOutput: `After append(40): [10, 20, 30, 40]
Popped value: 40, Remaining: [10, 20, 30]
Sorted by length: ['pie', 'kiwi', 'apple', 'banana']
original: [5, 2, 8, 1]
new_sorted: [1, 2, 5, 8]`,
        explanation: 'sort() modifies in-place and returns None; sorted() leaves the original list intact and returns a new sorted list.',
      },
      {
        title: 'Extend vs Append Trap',
        code: `list_a = [1, 2, 3]
list_b = [4, 5]

list_a.append(list_b)  # Appends the entire list as a single sublist element!
print("After append list_b:", list_a)

list_c = [1, 2, 3]
list_c.extend(list_b)  # Unpacks and appends individual elements
print("After extend list_b:", list_c)`,
        expectedOutput: `After append list_b: [1, 2, 3, [4, 5]]
After extend list_b: [1, 2, 3, 4, 5]`,
        explanation: 'append() adds the object as-is; extend() iterates over the argument and appends each element individually.',
      },
    ],
    realWorldApplications: [
      'Storing query result rows and processing sequential pipelines.',
      'Implementing stack algorithms (LIFO) in $O(1)$ time using append() and pop().',
    ],
    commonMistakes: [
      'Using `list.insert(0, val)` or `list.pop(0)` repeatedly inside a loop ($O(N^2)$); use `collections.deque` for $O(1)$ front operations.',
      'Writing `result = my_list.sort()` and expecting `result` to hold the sorted list; `sort()` returns `None`!',
      'Passing a list to `append()` when `extend()` was intended.',
    ],
    interviewRelevance:
      'Interviewers frequently ask the time complexity of list operations and why `pop(0)` is $O(n)$ while `pop()` is $O(1)$.',
    checkpoints: [
      { id: 'py-12-cp-1', label: 'Know time complexities: append/pop is O(1), insert/remove is O(n).' },
      { id: 'py-12-cp-2', label: 'Distinguish between list.sort() (in-place) and sorted(list).' },
    ],
    practiceExercises: [
      {
        id: 'py-12-ex-1',
        title: 'Remove Duplicates from Sorted List in O(1) Space',
        difficulty: 'Beginner',
        type: 'coding',
        prompt: 'Given sorted list `nums`, remove duplicates in-place so unique elements appear at front; return count of unique elements.',
        starterCode: 'def remove_duplicates(nums: list[int]) -> int:\n    pass',
        solution: `def remove_duplicates(nums: list[int]) -> int:
    if not nums:
        return 0
    write_idx = 1
    for read_idx in range(1, len(nums)):
        if nums[read_idx] != nums[read_idx - 1]:
            nums[write_idx] = nums[read_idx]
            write_idx += 1
    return write_idx

arr = [1, 1, 2, 2, 3]
k = remove_duplicates(arr)
print(f"Unique count: {k}, Front elements: {arr[:k]}")`,
        explanation: 'Classic two-pointer array question maintaining $O(1)$ auxiliary space.',
      },
      {
        id: 'py-12-ex-2',
        title: 'Predict Return Value of In-Place Methods',
        difficulty: 'Intermediate',
        type: 'output_prediction',
        prompt: 'What is printed by: `x = [3, 1, 2]; print(x.sort())`?',
        solution: 'Prints "None". In-place mutation methods in Python intentionally return None to remind developers that mutation occurred in-place.',
        explanation: 'Methods like .sort(), .reverse(), and .append() return None.',
      },
      {
        id: 'py-12-ex-3',
        title: 'Rotate List Right by K Steps',
        difficulty: 'Advanced',
        type: 'coding',
        prompt: 'Rotate list `nums` to the right by `k` steps in-place with O(1) extra space.',
        starterCode: 'def rotate(nums: list[int], k: int) -> None:\n    pass',
        solution: `def rotate(nums: list[int], k: int) -> None:
    n = len(nums)
    k %= n
    def reverse(start: int, end: int):
        while start < end:
            nums[start], nums[end] = nums[end], nums[start]
            start += 1
            end -= 1
    # 1. Reverse entire list
    reverse(0, n - 1)
    # 2. Reverse first k elements
    reverse(0, k - 1)
    # 3. Reverse remaining n - k elements
    reverse(k, n - 1)

arr = [1, 2, 3, 4, 5, 6, 7]
rotate(arr, 3)
print("Rotated arr:", arr)  # [5, 6, 7, 1, 2, 3, 4]`,
        explanation: 'Three-step reversal algorithm accomplishes in-place array rotation in $O(n)$ time and $O(1)$ space.',
      },
    ],
    quizQuestions: [
      {
        id: 'py-12-q1',
        question: 'What is the time complexity of list.pop(0) in Python?',
        options: ['O(1)', 'O(log n)', 'O(n)', 'O(n^2)'],
        correctOptionIndex: 2,
        explanation: 'Removing the first element forces all remaining (n - 1) elements to shift left by one position, requiring O(n) time.',
      },
      {
        id: 'py-12-q2',
        question: 'What sorting algorithm does Python\'s list.sort() and sorted() use?',
        options: ['Quicksort', 'Timsort (hybrid of Merge Sort and Insertion Sort)', 'Heapsort', 'Bubblesort'],
        correctOptionIndex: 1,
        explanation: 'Python uses Timsort, a stable $O(n \\log n)$ adaptive sorting algorithm designed by Tim Peters in 2002.',
      },
    ],
    revisionNotes: [
      'list.append() and list.pop() are O(1) amortized at the end.',
      'list.insert(0, val) and list.pop(0) are O(n); use collections.deque for O(1) queue operations.',
      'Python uses Timsort (stable O(n log n)).',
    ],
  },
  {
    id: 'py-13-tuples-immutability',
    moduleId: 'py-m2',
    moduleNumber: 2,
    moduleTitle: 'Python Data Structures',
    topicNumber: 13,
    title: 'Tuples, Immutability & Packing/Unpacking',
    language: 'python',
    level: 'Beginner',
    whyItMatters:
      'Tuples represent immutable records. Because they are hashable, they can serve as dictionary keys and set members, making them indispensable for coordinate grids and memoization keys in DP.',
    explanation:
      'A tuple is an ordered, immutable collection defined with parentheses () or commas. Once created, elements cannot be added, removed, or reassigned. Tuples consume less memory than lists and are hashable (provided all elements inside are hashable). Python provides powerful tuple packing and sequence unpacking, including starred unpacking (*rest) introduced in PEP 3132.',
    syntaxAndStructure:
      '# Tuple creation:\nt = (1, 2, 3)\nsingle_tuple = (42,)     # Trailing comma mandatory for single element!\n\n# Unpacking:\nx, y, z = t\nfirst, *middle, last = (10, 20, 30, 40, 50)  # first=10, middle=[20,30,40], last=50\n\n# Used as composite dict keys:\ngrid_cache = {(0, 0): "origin", (1, 2): "point_A"}',
    codeExamples: [
      {
        title: 'Tuple Unpacking and Starred Expressions',
        code: `coordinates = (19.0760, 72.8777, "Mumbai", "India", 2026)

# Unpacking with asterisk * to capture variable arguments
lat, lon, city, *details = coordinates

print(f"City: {city} at ({lat}, {lon})")
print("Additional Details:", details)

# Returning multiple values from functions:
def get_min_max(nums: list[int]) -> tuple[int, int]:
    return min(nums), max(nums)  # Automatically packed as tuple

smallest, largest = get_min_max([12, 45, 2, 89, 34])
print(f"Min: {smallest}, Max: {largest}")`,
        expectedOutput: `City: Mumbai at (19.076, 72.8777)
Additional Details: ['India', 2026]
Min: 2, Max: 89`,
        explanation: 'Returning comma-separated values automatically packs them into a tuple, which the caller unpacks in one clean line.',
      },
      {
        title: 'Tuples Containing Mutable Objects Trap',
        code: `# A tuple itself is immutable, but its mutable contents can still mutate!
t = (1, [10, 20], 3)
print("Initial tuple:", t)

# Modifying the list inside the tuple:
t[1].append(30)
print("After list append inside tuple:", t)

# Attempting to reassign the reference raises TypeError:
try:
    t[1] = [10, 20, 30]
except TypeError as e:
    print("Error on reassignment:", e)`,
        expectedOutput: `Initial tuple: (1, [10, 20], 3)
After list append inside tuple: (1, [10, 20, 30], 3)
Error on reassignment: 'tuple' object does not support item assignment`,
        explanation:
          'Immutability means the object references stored in the tuple cannot change. If an object referenced is mutable, that object can still be modified.',
      },
    ],
    realWorldApplications: [
      'Composite keys in graph algorithms and dynamic programming state memoization (e.g., `memo[(row, col, remaining_fuel)]`).',
      'Database row representations returned by cursor.fetchall().',
    ],
    commonMistakes: [
      'Writing `x = (5)` and expecting a tuple; without a trailing comma `x = (5,)`, Python evaluates it as integer 5 inside parentheses.',
      'Trying to use a tuple containing a list as a dictionary key (`TypeError: unhashable type: \'list\'`).',
      'Unpacking with mismatched variable count without using the `*` operator.',
    ],
    interviewRelevance:
      'Frequent interview trap: "Can a tuple change?" (Answer: The tuple references cannot change, but mutable objects inside it can). "Can any tuple be a dict key?" (Answer: Only if all items inside are hashable).',
    checkpoints: [
      { id: 'py-13-cp-1', label: 'Create single-element tuples using trailing comma: (val,).' },
      { id: 'py-13-cp-2', label: 'Use tuples for DP state memoization keys.' },
    ],
    practiceExercises: [
      {
        id: 'py-13-ex-1',
        title: 'NamedTuple for Structured Records',
        difficulty: 'Beginner',
        type: 'coding',
        prompt: 'Use `collections.namedtuple` to create a Point(x, y) class with distance calculation from origin.',
        starterCode: 'from collections import namedtuple\n# Define Point and calculate Euclidean distance',
        solution: `from collections import namedtuple
import math

Point = namedtuple("Point", ["x", "y"])
p1 = Point(3, 4)
distance = math.sqrt(p1.x ** 2 + p1.y ** 2)
print(f"Point: ({p1.x}, {p1.y}), Distance: {distance}")  # 5.0`,
        explanation: 'namedtuple provides memory-efficient, immutable records with named field attribute access.',
      },
      {
        id: 'py-13-ex-2',
        title: 'Starred Unpacking Extraction',
        difficulty: 'Intermediate',
        type: 'coding',
        prompt: 'Given a tuple of 6 numbers, unpack the first, last, and compute the average of the middle numbers.',
        starterCode: 'data = (10, 20, 30, 40, 50, 60)\n# Unpack first, last, middle',
        solution: `data = (10, 20, 30, 40, 50, 60)
first, *middle, last = data
avg_middle = sum(middle) / len(middle)
print(f"First: {first}, Last: {last}, Middle Avg: {avg_middle}")  # 35.0`,
        explanation: '*middle gathers all elements between first and last into a list.',
      },
      {
        id: 'py-13-ex-3',
        title: 'Memoized Grid Paths with Tuple Keys',
        difficulty: 'Advanced',
        type: 'coding',
        prompt: 'Find unique paths from (0,0) to (m-1, n-1) moving only down or right using memoization with tuple keys.',
        starterCode: 'def unique_paths(m: int, n: int) -> int:\n    pass',
        solution: `def unique_paths(m: int, n: int) -> int:
    memo = {}
    def dfs(r: int, c: int) -> int:
        if r == m - 1 and c == n - 1:
            return 1
        if r >= m or c >= n:
            return 0
        state = (r, c)
        if state not in memo:
            memo[state] = dfs(r + 1, c) + dfs(r, c + 1)
        return memo[state]
    return dfs(0, 0)

print("Unique paths (3x3):", unique_paths(3, 3))  # 6`,
        explanation: 'Tuples (r, c) serve as immutable, hashable keys in the memo dictionary for $O(m \\times n)$ DP.',
      },
    ],
    quizQuestions: [
      {
        id: 'py-13-q1',
        question: 'What is the type of variable x after: x = (42)?',
        options: ['tuple', 'int', 'list', 'SyntaxError'],
        correctOptionIndex: 1,
        explanation: 'Parentheses around an expression without a comma are treated as grouping parentheses; x is integer 42. To make a single-element tuple, you must write (42,).',
      },
      {
        id: 'py-13-q2',
        question: 'Can the tuple t = (1, [2, 3]) be used as a key in a Python dictionary?',
        options: [
          'Yes, because tuples are always immutable',
          'No, TypeError: unhashable type: "list"',
          'Yes, but only if the list has fewer than 10 elements',
          'Only if wrapped in str()',
        ],
        correctOptionIndex: 1,
        explanation: 'A tuple is only hashable if all of its constituent elements are also hashable. Because list is unhashable, the tuple cannot be hashed.',
      },
    ],
    revisionNotes: [
      'Tuples are immutable sequences; use trailing comma for single elements: (x,).',
      'Tuples are hashable only if all contained items are hashable.',
      'Starred unpacking (*rest) cleanly extracts subsets of sequences.',
    ],
  },
  {
    id: 'py-14-sets-operations',
    moduleId: 'py-m2',
    moduleNumber: 2,
    moduleTitle: 'Python Data Structures',
    topicNumber: 14,
    title: 'Sets, Set Operations & Hash-Based Lookups',
    language: 'python',
    level: 'Beginner',
    whyItMatters:
      'Sets provide average $O(1)$ time complexity for insertions, deletions, and membership checks (`x in my_set`). Mastering sets is essential for removing duplicates and solving intersection/union problems in DSA.',
    explanation:
      'A set is an unordered collection of unique, hashable objects implemented using a hash table. Empty sets are created with `set()`, not `{}` (which creates an empty dictionary). Sets support mathematical set theory operations: union (`|`), intersection (`&`), difference (`-`), and symmetric difference (`^`). `frozenset` is an immutable, hashable variant of set that can itself be stored inside other sets or used as dictionary keys.',
    syntaxAndStructure:
      '# Set creation:\ns = {1, 2, 3, 2}         # {1, 2, 3}\nempty_set = set()        # NOT {}\n\n# Mathematical operations:\na = {1, 2, 3}\nb = {3, 4, 5}\nunion_set = a | b        # {1, 2, 3, 4, 5}\ninter_set = a & b        # {3}\ndiff_set = a - b         # {1, 2}\nsym_diff = a ^ b         # {1, 2, 4, 5}',
    codeExamples: [
      {
        title: 'Mathematical Set Operations in Python',
        code: `frontend_devs = {"Alice", "Bob", "Charlie", "David"}
backend_devs = {"Charlie", "David", "Eve", "Frank"}

# Fullstack developers (intersection)
fullstack = frontend_devs & backend_devs
print("Fullstack:", fullstack)

# All engineering staff (union)
all_engineers = frontend_devs | backend_devs
print("All Engineers:", all_engineers)

# Frontend ONLY (difference)
frontend_only = frontend_devs - backend_devs
print("Frontend only:", frontend_only)

# Specialized in exactly ONE domain (symmetric difference)
single_domain = frontend_devs ^ backend_devs
print("Single domain devs:", single_domain)`,
        expectedOutput: `Fullstack: {'Charlie', 'David'}
All Engineers: {'Alice', 'Bob', 'Charlie', 'David', 'Eve', 'Frank'}
Frontend only: {'Alice', 'Bob'}
Single domain devs: {'Alice', 'Bob', 'Eve', 'Frank'}`,
        explanation: 'Standard bitwise-style operators (&, |, -, ^) map directly to set theory operations.',
      },
      {
        title: 'Fast O(1) Membership Lookup in Large Collections',
        code: `import time

# List lookup vs Set lookup benchmark demonstration
large_list = list(range(100_000))
large_set = set(large_list)

target = 99_999

# Set lookup: O(1) average hash lookup
start = time.perf_counter()
found_in_set = target in large_set
time_set = time.perf_counter() - start

print(f"Target found in set: {found_in_set} in {time_set * 1e6:.2f} microseconds")`,
        expectedOutput: `Target found in set: True in <under_1> microseconds`,
        explanation: 'in check on a set is $O(1)$ average via hash table lookup, whereas on a list it is $O(n)$ linear scan.',
      },
    ],
    realWorldApplications: [
      'Deduplicating user IDs, tracking visited URLs in web crawlers.',
      'Permission role verification and access control list checks.',
    ],
    commonMistakes: [
      'Writing `s = {}` to initialize an empty set; this creates an empty `dict`. Always use `set()`.',
      'Attempting to store mutable objects (like lists or dicts) in a set (`TypeError: unhashable type: \'list\'`).',
      'Assuming sets preserve insertion order; in Python, sets are explicitly unordered collections.',
    ],
    interviewRelevance:
      'Fundamental for questions like "Contains Duplicate", "Intersection of Two Arrays", and "Longest Consecutive Sequence" in $O(n)$ time.',
    checkpoints: [
      { id: 'py-14-cp-1', label: 'Always initialize empty sets with set(), never {}.' },
      { id: 'py-14-cp-2', label: 'Use sets for O(1) membership testing and deduplication.' },
    ],
    practiceExercises: [
      {
        id: 'py-14-ex-1',
        title: 'Find Longest Consecutive Sequence in O(n)',
        difficulty: 'Beginner',
        type: 'coding',
        prompt: 'Given unsorted array `nums = [100, 4, 200, 1, 3, 2]`, return length of longest consecutive elements sequence (`[1, 2, 3, 4]` -> length 4).',
        starterCode: 'def longest_consecutive(nums: list[int]) -> int:\n    pass',
        solution: `def longest_consecutive(nums: list[int]) -> int:
    num_set = set(nums)
    longest = 0
    for num in num_set:
        # Check if num is the start of a sequence
        if num - 1 not in num_set:
            current = num
            streak = 1
            while current + 1 in num_set:
                current += 1
                streak += 1
            longest = max(longest, streak)
    return longest

print(longest_consecutive([100, 4, 200, 1, 3, 2]))  # 4`,
        explanation: 'Only starting points (where num - 1 is not in set) trigger the inner loop, guaranteeing total $O(n)$ runtime.',
      },
      {
        id: 'py-14-ex-2',
        title: 'Evaluate Frozenset Usage',
        difficulty: 'Intermediate',
        type: 'coding',
        prompt: 'Create a set containing other sets representing group combinations using `frozenset`.',
        starterCode: '# Create a set of sets',
        solution: `group1 = frozenset({"Alice", "Bob"})
group2 = frozenset({"Charlie", "David"})
combined_groups = {group1, group2}
print(combined_groups)
print(group1 in combined_groups)  # True`,
        explanation: 'Regular sets are mutable and unhashable; frozenset is immutable and can be placed inside sets or dict keys.',
      },
      {
        id: 'py-14-ex-3',
        title: 'Find Common Characters in All Strings',
        difficulty: 'Advanced',
        type: 'coding',
        prompt: 'Given a list of words, return all characters that show up in all words using set operations.',
        starterCode: 'def common_characters(words: list[str]) -> set[str]:\n    pass',
        solution: `def common_characters(words: list[str]) -> set[str]:
    if not words:
        return set()
    common = set(words[0])
    for w in words[1:]:
        common &= set(w)
    return common

print(common_characters(["bella", "label", "roller"]))  # {'l', 'e'}`,
        explanation: 'Iterative intersection `&=` maintains characters present across all words.',
      },
    ],
    quizQuestions: [
      {
        id: 'py-14-q1',
        question: 'How do you initialize an empty set in Python?',
        options: ['s = {}', 's = set()', 's = []', 's = set{}'],
        correctOptionIndex: 1,
        explanation: '{} initializes an empty dictionary. set() is the only syntax to create an empty set.',
      },
      {
        id: 'py-14-q2',
        question: 'What is the average time complexity of checking membership: x in my_set?',
        options: ['O(n)', 'O(log n)', 'O(1)', 'O(n log n)'],
        correctOptionIndex: 2,
        explanation: 'Sets use an underlying hash table, providing O(1) average time complexity for lookups and insertions.',
      },
    ],
    revisionNotes: [
      'Sets are unordered collections of unique hashable elements.',
      'Operations: | (union), & (intersection), - (difference), ^ (symmetric difference).',
      'Average membership check is O(1).',
    ],
  },
  {
    id: 'py-15-dictionaries',
    moduleId: 'py-m2',
    moduleNumber: 2,
    moduleTitle: 'Python Data Structures',
    topicNumber: 15,
    title: 'Dictionaries, Hash Maps & Key-Value Operations',
    language: 'python',
    level: 'Beginner',
    whyItMatters:
      'The dictionary is the most important data structure in Python. CPython uses dictionaries for namespaces, classes, and globals. In coding interviews, hash maps unlock $O(n)$ solutions for countless two-pass brute force problems.',
    explanation:
      'A dictionary (dict) is a mutable mapping of hashable keys to arbitrary value objects. Since Python 3.7, standard dicts maintain insertion order by language specification. Dictionaries provide average $O(1)$ time complexity for lookup, insertion, and deletion. Key methods include .get(key, default) for safe retrieval without KeyError, .setdefault(key, default), .keys(), .values(), .items(), and .pop(key, default).',
    syntaxAndStructure:
      '# Dict creation:\nuser = {"id": 101, "name": "Antigravity", "role": "Engineer"}\n\n# Safe access:\nemail = user.get("email", "not_provided@ak67.local")\n\n# Iteration:\nfor key, val in user.items():\n    print(f"{key}: {val}")',
    codeExamples: [
      {
        title: 'Safe Key Access, Setdefault, and Merging',
        code: `scores = {"math": 95, "physics": 88}

# 1. Safe access with default value
chemistry = scores.get("chemistry", 0)
print("Chemistry score (safe get):", chemistry)

# 2. setdefault: inserts key with default if not present, returns value
scores.setdefault("biology", 92)
print("Scores after setdefault:", scores)

# 3. Dictionary merge operator (Python 3.9+ | operator)
extra_scores = {"chemistry": 91, "english": 85}
merged = scores | extra_scores
print("Merged scores:", merged)`,
        expectedOutput: `Chemistry score (safe get): 0
Scores after setdefault: {'math': 95, 'physics': 88, 'biology': 92}
Merged scores: {'math': 95, 'physics': 88, 'biology': 92, 'chemistry': 91, 'english': 85}`,
        explanation: 'The | operator (PEP 584) cleanly merges dictionaries, with keys in the right dictionary taking precedence in conflicts.',
      },
      {
        title: 'Frequency Map Counting in O(n) Time',
        code: `def char_frequency(s: str) -> dict[str, int]:
    freq = {}
    for ch in s:
        freq[ch] = freq.get(ch, 0) + 1
    return freq

text = "placement"
print(f"Frequencies in '{text}':", char_frequency(text))`,
        expectedOutput: `Frequencies in 'placement': {'p': 1, 'l': 1, 'a': 1, 'c': 1, 'e': 2, 'm': 1, 'n': 1, 't': 1}`,
        explanation: 'freq[ch] = freq.get(ch, 0) + 1 is the fundamental frequency map pattern in technical interviews.',
      },
    ],
    realWorldApplications: [
      'JSON API payload serialization and deserialization.',
      'In-memory caching and session state management in web servers.',
    ],
    commonMistakes: [
      'Accessing `d[key]` directly when the key may not exist, triggering `KeyError`; use `d.get(key, default)` or `key in d`.',
      'Using a mutable object (like a list) as a dictionary key.',
      'Modifying keys in a dictionary while iterating directly over it; iterate over `list(d.keys())` instead.',
    ],
    interviewRelevance:
      'Universal core topic in almost every coding round (Two Sum, Anagrams, Group Anagrams, Subarray Sum Equals K).',
    checkpoints: [
      { id: 'py-15-cp-1', label: 'Use .get(k, default) to prevent KeyError.' },
      { id: 'py-15-cp-2', label: 'Know that Python 3.7+ dictionaries maintain insertion order.' },
    ],
    practiceExercises: [
      {
        id: 'py-15-ex-1',
        title: 'Valid Anagram Check',
        difficulty: 'Beginner',
        type: 'coding',
        prompt: 'Check if two strings s and t are anagrams using a frequency dictionary in O(n) time.',
        starterCode: 'def is_anagram(s: str, t: str) -> bool:\n    pass',
        solution: `def is_anagram(s: str, t: str) -> bool:
    if len(s) != len(t):
        return False
    counts = {}
    for ch in s:
        counts[ch] = counts.get(ch, 0) + 1
    for ch in t:
        if ch not in counts or counts[ch] == 0:
            return False
        counts[ch] -= 1
    return True

print(is_anagram("anagram", "nagaram"))  # True
print(is_anagram("rat", "car"))          # False`,
        explanation: 'Single-pass frequency increment and decrement achieves optimal $O(n)$ time and $O(1)$ alphabet space.',
      },
      {
        id: 'py-15-ex-2',
        title: 'Group Elements by Parity',
        difficulty: 'Intermediate',
        type: 'coding',
        prompt: 'Group numbers into "even" and "odd" lists inside a dictionary using `setdefault`.',
        starterCode: 'def group_parity(nums: list[int]) -> dict[str, list[int]]:\n    pass',
        solution: `def group_parity(nums: list[int]) -> dict[str, list[int]]:
    result = {"even": [], "odd": []}
    for n in nums:
        key = "even" if n % 2 == 0 else "odd"
        result[key].append(n)
    return result

print(group_parity([1, 2, 3, 4, 5, 6]))`,
        explanation: 'Demonstrates categorizing items into dictionary bucket lists.',
      },
      {
        id: 'py-15-ex-3',
        title: 'Invert a Unique Dictionary',
        difficulty: 'Advanced',
        type: 'coding',
        prompt: 'Invert a dictionary mapping name to ID so that it maps ID to name.',
        starterCode: 'def invert_dict(d: dict) -> dict:\n    pass',
        solution: `def invert_dict(d: dict) -> dict:
    return {value: key for key, value in d.items()}

print(invert_dict({"Alice": 101, "Bob": 102}))  # {101: 'Alice', 102: 'Bob'}`,
        explanation: 'Dict comprehension swaps key and value in $O(n)$ time.',
      },
    ],
    quizQuestions: [
      {
        id: 'py-15-q1',
        question: 'What is the outcome of accessing a nonexistent key via d["missing_key"]?',
        options: [
          'Returns None',
          'Raises KeyError',
          'Inserts the key with value None',
          'Raises IndexError',
        ],
        correctOptionIndex: 1,
        explanation: 'Bracket access d[key] on a missing key raises KeyError. To return a default without error, use d.get(key, default).',
      },
      {
        id: 'py-15-q2',
        question: 'Which operator merges two dictionaries d1 and d2 in Python 3.9+?',
        options: ['d1 + d2', 'd1 & d2', 'd1 | d2', 'd1.merge(d2)'],
        correctOptionIndex: 2,
        explanation: 'PEP 584 added the union operator | and update operator |= for dictionaries in Python 3.9.',
      },
    ],
    revisionNotes: [
      'Dict lookups, insertions, and deletions are O(1) on average.',
      'Use d.get(k, default) to prevent KeyError.',
      'Dictionaries maintain insertion order (Python 3.7+).',
    ],
  },
  {
    id: 'py-16-nested-structures',
    moduleId: 'py-m2',
    moduleNumber: 2,
    moduleTitle: 'Python Data Structures',
    topicNumber: 16,
    title: 'Nested Data Structures & JSON-like Schemas',
    language: 'python',
    level: 'Intermediate',
    whyItMatters:
      'Real-world software systems process nested JSON payloads from REST APIs, database documents, and 2D matrices in dynamic programming. Navigating nested structures cleanly is a daily engineering requirement.',
    explanation:
      'Nested data structures combine lists, dictionaries, tuples, and sets (e.g. lists of dictionaries, 2D grids, trees represented as dictionaries). Accessing deeply nested keys requires defensive traversal or chaining `.get()`. In 2D matrices, `matrix[row][col]` indexes cells. Creating 2D grids must be done with list comprehensions (`[[0] * cols for _ in range(rows)]`) rather than multiplication (`[[0] * cols] * rows`), which produces shallow row duplicates.',
    syntaxAndStructure:
      '# 2D Grid allocation (CORRECT):\ngrid = [[0] * 3 for _ in range(3)]\ngrid[0][0] = 99  # Modifies ONLY row 0!\n\n# Deep access with chained .get:\nval = data.get("user", {}).get("profile", {}).get("email")',
    codeExamples: [
      {
        title: 'The 2D Grid Multiplication Trap vs List Comprehension',
        code: `# DANGEROUS MISTAKE: Row duplication via multiplication
bad_grid = [[0] * 3] * 3
bad_grid[0][0] = 7  # Modifies column 0 across ALL rows because rows share identical reference!
print("Bad grid (shared references):", bad_grid)

# CORRECT METHOD: Independent row allocation
good_grid = [[0] * 3 for _ in range(3)]
good_grid[0][0] = 7
print("Good grid (independent rows):", good_grid)`,
        expectedOutput: `Bad grid (shared references): [[7, 0, 0], [7, 0, 0], [7, 0, 0]]
Good grid (independent rows): [[7, 0, 0], [0, 0, 0], [0, 0, 0]]`,
        explanation: 'Multiplication copies object references. In bad_grid, all 3 rows reference the exact same list in heap memory.',
      },
      {
        title: 'Parsing and Aggregating Nested API Data',
        code: `students = [
    {"id": 1, "name": "Aarav", "scores": {"math": 90, "cs": 95}},
    {"id": 2, "name": "Diya", "scores": {"math": 85, "cs": 98}},
    {"id": 3, "name": "Kavya", "scores": {"math": 92, "cs": 89}},
]

# Compute average CS score
cs_scores = [s["scores"]["cs"] for s in students]
avg_cs = sum(cs_scores) / len(cs_scores)
print(f"Average CS Score: {avg_cs:.2f}")

# Find student with highest total score
top_student = max(students, key=lambda s: sum(s["scores"].values()))
print(f"Top Student: {top_student['name']} with {sum(top_student['scores'].values())} pts")`,
        expectedOutput: `Average CS Score: 94.00
Top Student: Diya with 183 pts`,
        explanation: 'Using lambda functions with key= in max() extracts nested dictionary properties cleanly.',
      },
    ],
    realWorldApplications: [
      'Processing REST API responses in web apps and microservices.',
      'Representing board games, adjacency matrices, and DP table state.',
    ],
    commonMistakes: [
      'Using `[[0] * m] * n` to create a matrix, which duplicates row references across the entire table.',
      'Assuming deep keys exist without null checking, causing `TypeError: \'NoneType\' object is not subscriptable`.',
    ],
    interviewRelevance:
      'The 2D matrix multiplication reference bug is one of the top 5 most common Python interview pitfalls.',
    checkpoints: [
      { id: 'py-16-cp-1', label: 'Never create 2D lists with [[val] * m] * n.' },
      { id: 'py-16-cp-2', label: 'Use list comprehension [[0] * cols for _ in range(rows)].' },
    ],
    practiceExercises: [
      {
        id: 'py-16-ex-1',
        title: 'Transpose a Matrix',
        difficulty: 'Beginner',
        type: 'coding',
        prompt: 'Given a 2D matrix, return its transpose using list comprehension or `zip(*matrix)`.',
        starterCode: 'def transpose(matrix: list[list[int]]) -> list[list[int]]:\n    pass',
        solution: `def transpose(matrix: list[list[int]]) -> list[list[int]]:
    return [list(col) for col in zip(*matrix)]

m = [
    [1, 2, 3],
    [4, 5, 6]
]
print(transpose(m))  # [[1, 4], [2, 5], [3, 6]]`,
        explanation: 'zip(*matrix) unpacks rows as arguments, grouping corresponding column elements together.',
      },
      {
        id: 'py-16-ex-2',
        title: 'Flatten Deeply Nested List',
        difficulty: 'Intermediate',
        type: 'coding',
        prompt: 'Write a recursive function to flatten an arbitrarily nested list of integers: `[1, [2, [3, 4], 5], 6]`.',
        starterCode: 'def flatten(nested: list) -> list[int]:\n    pass',
        solution: `def flatten(nested: list) -> list[int]:
    result = []
    for item in nested:
        if isinstance(item, list):
            result.extend(flatten(item))
        else:
            result.append(item)
    return result

print(flatten([1, [2, [3, 4], 5], 6]))  # [1, 2, 3, 4, 5, 6]`,
        explanation: 'Recursive traversal handles arbitrary nesting depths cleanly.',
      },
      {
        id: 'py-16-ex-3',
        title: 'Safe Deep Dict Key Fetcher',
        difficulty: 'Advanced',
        type: 'coding',
        prompt: 'Write a utility `deep_get(d, path, default)` where path is `"user.address.geo.lat"`.',
        starterCode: 'def deep_get(data: dict, path: str, default=None):\n    pass',
        solution: `def deep_get(data: dict, path: str, default=None):
    keys = path.split(".")
    curr = data
    for k in keys:
        if isinstance(curr, dict) and k in curr:
            curr = curr[k]
        else:
            return default
    return curr

sample = {"user": {"address": {"geo": {"lat": 28.61}}}}
print(deep_get(sample, "user.address.geo.lat"))  # 28.61
print(deep_get(sample, "user.address.zip", "N/A"))  # N/A`,
        explanation: 'Iterative path traversal safely guards against missing intermediate nodes.',
      },
    ],
    quizQuestions: [
      {
        id: 'py-16-q1',
        question: 'What is the bug in: grid = [[0] * 3] * 3; grid[0][1] = 5?',
        options: [
          'Raises IndexError',
          'Only row 0 is modified',
          'All three rows will have index 1 set to 5 because rows share the same reference',
          'grid becomes None',
        ],
        correctOptionIndex: 2,
        explanation: 'Outer list multiplication * 3 replicates the identical list reference across all 3 indices.',
      },
      {
        id: 'py-16-q2',
        question: 'Which Python one-liner transposes a matrix?',
        options: [
          'matrix.transpose()',
          '[list(x) for x in zip(*matrix)]',
          'matrix[::-1]',
          'list(reversed(matrix))',
        ],
        correctOptionIndex: 1,
        explanation: 'Unpacking rows with *matrix and zipping them groups columns into transposed rows.',
      },
    ],
    revisionNotes: [
      'Always allocate 2D grids with list comprehensions: [[0] * m for _ in range(n)].',
      'Use zip(*matrix) for concise matrix transposition.',
      'Defensively access nested dictionary trees to avoid TypeErrors.',
    ],
  },
  {
    id: 'py-17-list-comprehensions',
    moduleId: 'py-m2',
    moduleNumber: 2,
    moduleTitle: 'Python Data Structures',
    topicNumber: 17,
    title: 'List Comprehensions & Conditional Filtering',
    language: 'python',
    level: 'Beginner',
    whyItMatters:
      'List comprehensions are Python\'s signature syntax for mapping, filtering, and transforming sequences. They execute in optimized C bytecode faster than equivalent manual for-loops.',
    explanation:
      'A list comprehension provides a concise syntax for creating a new list from an existing iterable. The general syntax is `[expression for item in iterable if condition]`. You can also include inline ternary expressions for if-else transformations: `[val_if_true if cond else val_if_false for item in iterable]`. Nested comprehensions enable flattening 2D matrices or generating Cartesian products.',
    syntaxAndStructure:
      '# Filtering:\nevens = [x for x in numbers if x % 2 == 0]\n\n# Transforming with if-else:\nlabels = ["Even" if x % 2 == 0 else "Odd" for x in numbers]\n\n# Nested comprehension:\nflattened = [val for row in matrix for val in row]',
    codeExamples: [
      {
        title: 'Mapping, Filtering, and Ternary Transformations',
        code: `numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# 1. Filter even numbers and square them:
squared_evens = [x ** 2 for x in numbers if x % 2 == 0]
print("Squared evens:", squared_evens)

# 2. If-Else transformation:
parity_labels = [f"{x}:E" if x % 2 == 0 else f"{x}:O" for x in numbers[:5]]
print("Parity labels:", parity_labels)

# 3. String transformation:
words = ["apple", "banana", "cherry"]
capitalized = [w.capitalize() for w in words]
print("Capitalized:", capitalized)`,
        expectedOutput: `Squared evens: [4, 16, 36, 64, 100]
Parity labels: ['1:O', '2:E', '3:O', '4:E', '5:O']
Capitalized: ['Apple', 'Banana', 'Cherry']`,
        explanation: 'When filtering only, the if clause goes at the end. When choosing between two values (if-else), the ternary expression goes at the beginning.',
      },
      {
        title: 'Flattening a 2D Matrix with Nested Comprehension',
        code: `matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]

# Nested comprehension order matches nested for loops:
# for row in matrix:
#     for val in row:
flattened = [val for row in matrix for val in row]
print("Flattened matrix:", flattened)`,
        expectedOutput: `Flattened matrix: [1, 2, 3, 4, 5, 6, 7, 8, 9]`,
        explanation: 'The order of for clauses in a comprehension strictly mirrors the reading order of equivalent nested loops.',
      },
    ],
    realWorldApplications: [
      'Extracting IDs, cleaning strings, and parsing database rows in web applications.',
      'Vectorized-style mathematical feature engineering in machine learning.',
    ],
    commonMistakes: [
      'Placing `else` at the end of a comprehension (e.g., `[x for x in nums if x > 0 else 0]` is a SyntaxError).',
      'Over-complicating comprehensions with more than two loops, harming code readability.',
      'Creating massive lists in memory when a generator expression `(x for x in ...)` would suffice.',
    ],
    interviewRelevance:
      'Writing Pythonic comprehensions instead of verbose 5-line for-loops signals idiomatic mastery to interviewers.',
    checkpoints: [
      { id: 'py-17-cp-1', label: 'Distinguish [expr for x in it if cond] from [A if cond else B for x in it].' },
      { id: 'py-17-cp-2', label: 'Understand loop ordering in nested comprehensions.' },
    ],
    practiceExercises: [
      {
        id: 'py-17-ex-1',
        title: 'Extract Words Longer Than 4 Chars',
        difficulty: 'Beginner',
        type: 'coding',
        prompt: 'Given a sentence, return a list of words longer than 4 characters in uppercase.',
        starterCode: 'sentence = "Python is an amazing expressive language"\n# Use list comprehension',
        solution: `sentence = "Python is an amazing expressive language"
result = [w.upper() for w in sentence.split() if len(w) > 4]
print(result)  # ['PYTHON', 'AMAZING', 'EXPRESSIVE', 'LANGUAGE']`,
        explanation: 'Combines word splitting, length condition filtering, and uppercase transformation.',
      },
      {
        id: 'py-17-ex-2',
        title: 'Cartesian Product Generation',
        difficulty: 'Intermediate',
        type: 'coding',
        prompt: 'Generate the Cartesian product of colors `["Red", "Blue"]` and sizes `["S", "M", "L"]` as tuples.',
        starterCode: 'colors = ["Red", "Blue"]\nsizes = ["S", "M", "L"]\n# Generate list of (color, size) tuples',
        solution: `colors = ["Red", "Blue"]
sizes = ["S", "M", "L"]
product = [(c, s) for c in colors for s in sizes]
print(product)`,
        explanation: 'Two for-loops inside the comprehension evaluate outer and inner sequences.',
      },
      {
        id: 'py-17-ex-3',
        title: 'Filter Non-Prime Numbers',
        difficulty: 'Advanced',
        type: 'coding',
        prompt: 'Generate all prime numbers between 2 and 50 in a single list comprehension line.',
        starterCode: '# Generate primes 2..50 with list comprehension',
        solution: `primes = [x for x in range(2, 51) if all(x % d != 0 for d in range(2, int(x**0.5) + 1))]
print("Primes:", primes)`,
        explanation: 'Nests an all() generator expression within the list comprehension filter.',
      },
    ],
    quizQuestions: [
      {
        id: 'py-17-q1',
        question: 'Where does the if-else ternary expression go in a list comprehension?',
        options: [
          'At the very end of the comprehension',
          'At the beginning before the "for" keyword',
          'Between the "for" and "in" keywords',
          'Ternary expressions are not allowed in comprehensions',
        ],
        correctOptionIndex: 1,
        explanation: 'When transforming values with if-else, the ternary expression [A if cond else B for x in it] precedes the for clause.',
      },
      {
        id: 'py-17-q2',
        question: 'Why are list comprehensions generally faster than equivalent manual append() for-loops in CPython?',
        options: [
          'They execute in multi-threaded parallel mode',
          'They run directly in C bytecode without repeated attribute lookups for .append()',
          'They bypass Python Virtual Machine entirely',
          'They skip type checking',
        ],
        correctOptionIndex: 1,
        explanation: 'List comprehensions use a dedicated LIST_APPEND bytecode instruction, avoiding repeated attribute lookups of the append method in Python.',
      },
    ],
    revisionNotes: [
      'Filter-only syntax: [expr for x in seq if cond].',
      'Value-transform syntax: [A if cond else B for x in seq].',
      'Nested comprehension order: [val for outer in seq for val in outer].',
    ],
  },
  {
    id: 'py-18-dict-set-comprehensions',
    moduleId: 'py-m2',
    moduleNumber: 2,
    moduleTitle: 'Python Data Structures',
    topicNumber: 18,
    title: 'Dictionary & Set Comprehensions',
    language: 'python',
    level: 'Intermediate',
    whyItMatters:
      'Just like list comprehensions, dictionary and set comprehensions allow instant, readable creation of index maps, invert mappings, and deduplicated subsets in one line.',
    explanation:
      'Dictionary comprehensions create dicts using `{key_expr: val_expr for item in iterable if condition}`. Set comprehensions create deduplicated sets using `{expr for item in iterable if condition}`. They are extensively used for building index lookups (e.g. mapping item values to their array indices for $O(1)$ complement lookups in Two Sum), frequency filters, and configuration maps.',
    syntaxAndStructure:
      '# Dict comprehension:\nsquare_map = {x: x ** 2 for x in range(5)}       # {0: 0, 1: 1, 2: 4, 3: 9, 4: 16}\ninverted = {v: k for k, v in original.items()}\n\n# Set comprehension:\nunique_lengths = {len(w) for w in ["cat", "dog", "elephant"]} # {3, 8}',
    codeExamples: [
      {
        title: 'Building Index Lookups and Inverting Dictionaries',
        code: `names = ["Alice", "Bob", "Charlie", "David"]

# Map name to its index:
name_to_index = {name: idx for idx, name in enumerate(names)}
print("Name to Index:", name_to_index)

# Filter students with passing grades:
exam_scores = {"Aarav": 88, "Bhavna": 42, "Chirag": 76, "Divya": 35}
passing_students = {k: v for k, v in exam_scores.items() if v >= 50}
print("Passing Students:", passing_students)`,
        expectedOutput: `Name to Index: {'Alice': 0, 'Bob': 1, 'Charlie': 2, 'David': 3}
Passing Students: {'Aarav': 88, 'Chirag': 76}`,
        explanation: 'Enumerate with dict comprehension creates $O(1)$ fast lookup tables in a single step.',
      },
      {
        title: 'Set Comprehension for Deduplication and Normalization',
        code: `raw_emails = [
    "user@ak67.local",
    "  USER@ak67.local ",
    "admin@google.com",
    "Admin@Google.com",
]

# Clean, lowercase, and deduplicate into a set comprehension:
unique_domains = {email.strip().lower().split("@")[1] for email in raw_emails}
print("Unique domains:", unique_domains)`,
        expectedOutput: `Unique domains: {'ak67.local', 'google.com'}`,
        explanation: 'Set comprehension applies data cleaning and automatically eliminates duplicates in $O(n)$ time.',
      },
    ],
    realWorldApplications: [
      'Creating lookup tables for $O(1)$ query mapping.',
      'Sanitizing raw dataset tokens and computing distinct entity metrics.',
    ],
    commonMistakes: [
      'Forgetting the colon (:) between key and value in dict comprehensions, which inadvertently creates a set comprehension!',
      'Overwriting keys when inverting a dictionary with duplicate values.',
    ],
    interviewRelevance:
      'Commonly used in graph initialization (building adjacency lists from edge pairs) and hash table preprocessing.',
    checkpoints: [
      { id: 'py-18-cp-1', label: 'Use {k: v for ...} for dicts and {v for ...} for sets.' },
      { id: 'py-18-cp-2', label: 'Build value-to-index lookup dictionaries in one line.' },
    ],
    practiceExercises: [
      {
        id: 'py-18-ex-1',
        title: 'Frequency Map with Dict Comprehension',
        difficulty: 'Beginner',
        type: 'coding',
        prompt: 'Given `"banana"`, build a character count dictionary using comprehension and `str.count()`.',
        starterCode: 'word = "banana"\n# Create char count dict with comprehension',
        solution: `word = "banana"
counts = {ch: word.count(ch) for ch in set(word)}
print(counts)  # {'b': 1, 'a': 3, 'n': 2}`,
        explanation: 'Iterating over set(word) avoids redundant recount passes.',
      },
      {
        id: 'py-18-ex-2',
        title: 'Group Inverted Dictionary with Collisions',
        difficulty: 'Intermediate',
        type: 'coding',
        prompt: 'Invert a dict `{"a": 1, "b": 2, "c": 1}` mapping values to lists of keys: `{1: ["a", "c"], 2: ["b"]}`.',
        starterCode: 'def invert_multidict(d: dict) -> dict:\n    pass',
        solution: `def invert_multidict(d: dict) -> dict:
    inverted = {}
    for k, v in d.items():
        inverted.setdefault(v, []).append(k)
    return inverted

print(invert_multidict({"a": 1, "b": 2, "c": 1}))`,
        explanation: 'Handles duplicate values by gathering all matching keys into bucket lists.',
      },
      {
        id: 'py-18-ex-3',
        title: 'Build Graph Adjacency List',
        difficulty: 'Advanced',
        type: 'coding',
        prompt: 'Given edges `[(0, 1), (0, 2), (1, 2)]`, build an undirected graph adjacency list using dict and set comprehensions.',
        starterCode: 'def build_graph(n: int, edges: list[tuple[int, int]]) -> dict[int, list[int]]:\n    pass',
        solution: `def build_graph(n: int, edges: list[tuple[int, int]]) -> dict[int, list[int]]:
    adj = {i: [] for i in range(n)}
    for u, v in edges:
        adj[u].append(v)
        adj[v].append(u)
    return adj

print(build_graph(3, [(0, 1), (0, 2), (1, 2)]))`,
        explanation: 'Initializes empty neighbor lists for all nodes before populating bidirectional edges.',
      },
    ],
    quizQuestions: [
      {
        id: 'py-18-q1',
        question: 'What type of collection does the expression {x for x in range(5)} create?',
        options: ['list', 'dict', 'set', 'generator'],
        correctOptionIndex: 2,
        explanation: 'Curly braces without a colon ({x ...}) denote a set comprehension.',
      },
      {
        id: 'py-18-q2',
        question: 'What happens when inverting a dictionary {k: v for k, v in original.items()} if original has duplicate values?',
        options: [
          'Raises KeyError',
          'Raises ValueError',
          'Later keys overwrite earlier keys for the same duplicate value',
          'Values are automatically converted to lists',
        ],
        correctOptionIndex: 2,
        explanation: 'Standard dict comprehension assigns {v: k}, so any collision will silently overwrite previous entries with the latest key.',
      },
    ],
    revisionNotes: [
      'Dict comprehension requires colon: {k: v for ...}.',
      'Set comprehension omits colon: {v for ...}.',
      'Iterate over set(seq) when counting to avoid duplicate computation.',
    ],
  },
  {
    id: 'py-19-slicing-internals',
    moduleId: 'py-m2',
    moduleNumber: 2,
    moduleTitle: 'Python Data Structures',
    topicNumber: 19,
    title: 'Slicing Mechanics, Step Values & Slice Objects',
    language: 'python',
    level: 'Beginner',
    whyItMatters:
      'Slicing (`seq[start:stop:step]`) is one of Python\'s most powerful syntactic constructs. Slicing never raises `IndexError` on out-of-bound ranges and enables instant shallow copies and reversals in $O(k)$ time.',
    explanation:
      'Slicing works on all sequence types (strings, lists, tuples). Syntax is `sequence[start:stop:step]`. If omitted, start defaults to 0 (or -1 if step is negative), stop defaults to length of sequence, and step defaults to 1. Negative steps reverse traversal direction (e.g. `s[::-1]`). Python encapsulates slice boundaries in first-class `slice(start, stop, step)` objects, which can be named and reused across data matrices.',
    syntaxAndStructure:
      '# Slicing syntax:\ns[start:stop]           # from start to stop - 1\ns[:stop]                # from beginning to stop - 1\ns[start:]               # from start to end\ns[::2]                  # every 2nd element\ns[::-1]                 # reversed sequence\n\n# Named slice object:\nLAST_THREE = slice(-3, None)\nitems[LAST_THREE]',
    codeExamples: [
      {
        title: 'Step Values, Reversal, and Boundary Gracefulness',
        code: `data = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90]

# 1. Even and Odd index elements:
print("Even index elements (step=2):", data[::2])
print("Odd index elements (start=1, step=2):", data[1::2])

# 2. Reversing sequences:
print("Reversed list:", data[::-1])

# 3. Graceful handling of out-of-range bounds:
# Slicing NEVER raises IndexError!
print("Slice past end:", data[5:100])
print("Slice entirely beyond end:", data[100:200])`,
        expectedOutput: `Even index elements (step=2): [0, 20, 40, 60, 80]
Odd index elements (start=1, step=2): [10, 30, 50, 70, 90]
Reversed list: [90, 80, 70, 60, 50, 40, 30, 20, 10, 0]
Slice past end: [50, 60, 70, 80, 90]
Slice entirely beyond end: []`,
        explanation: 'Unlike indexing (data[100] raises IndexError), slicing clamps indices gracefully to sequence boundaries.',
      },
      {
        title: 'Slice Assignment: In-Place Modification & Replacement',
        code: `nums = [1, 2, 3, 4, 5]

# Replace middle elements in-place:
nums[1:4] = [20, 30]
print("After slice replacement:", nums)

# Insert elements without deletion:
nums[2:2] = [99, 100]
print("After slice insertion:", nums)

# Clear list in-place (preserves object reference):
nums[:] = []
print("After in-place clear nums[:]:", nums)`,
        expectedOutput: `After slice replacement: [1, 20, 30, 5]
After slice insertion: [1, 20, 99, 100, 30, 5]
After in-place clear nums[:]: []`,
        explanation: 'Slice assignment mutates the list in-place without creating a new heap object.',
      },
    ],
    realWorldApplications: [
      'Paginating results (`items[page * size : (page + 1) * size]`).',
      'Windowing time-series data and audio sample buffers.',
    ],
    commonMistakes: [
      'Expecting `s[::0]` to work; step cannot be zero (`ValueError: slice step cannot be zero`).',
      'Confusing `arr[:]` (shallow copy) with `arr` (alias reference).',
      'Misunderstanding negative indices with negative step, leading to unexpected empty slices.',
    ],
    interviewRelevance:
      'Questions like "Reverse String", "Valid Palindrome", and array chunking leverage slice patterns.',
    checkpoints: [
      { id: 'py-19-cp-1', label: 'Remember that slicing never throws an IndexError.' },
      { id: 'py-19-cp-2', label: 'Use slice assignment (nums[:]) for in-place list mutation.' },
    ],
    practiceExercises: [
      {
        id: 'py-19-ex-1',
        title: 'Check String Palindrome in One Line',
        difficulty: 'Beginner',
        type: 'coding',
        prompt: 'Check whether a word is an exact palindrome using slicing in a single line function.',
        starterCode: 'def is_palindrome(word: str) -> bool:\n    pass',
        solution: `def is_palindrome(word: str) -> bool:
    return word == word[::-1]

print(is_palindrome("kayak"))  # True
print(is_palindrome("apple"))  # False`,
        explanation: 'word[::-1] produces a reversed string copy for immediate equality comparison.',
      },
      {
        id: 'py-19-ex-2',
        title: 'Chunk Array into Sublists of Size K',
        difficulty: 'Intermediate',
        type: 'coding',
        prompt: 'Split a list into consecutive chunks of size `k` using a list comprehension with slicing.',
        starterCode: 'def chunk_list(arr: list, k: int) -> list[list]:\n    pass',
        solution: `def chunk_list(arr: list, k: int) -> list[list]:
    return [arr[i : i + k] for i in range(0, len(arr), k)]

print(chunk_list([1, 2, 3, 4, 5, 6, 7], 3))  # [[1, 2, 3], [4, 5, 6], [7]]`,
        explanation: 'range(0, len, k) advances by k, while arr[i : i + k] slices cleanly even for the remainder chunk.',
      },
      {
        id: 'py-19-ex-3',
        title: 'In-Place Inversion of Even Indices',
        difficulty: 'Advanced',
        type: 'coding',
        prompt: 'Reverse only the elements at even indices of a list in-place while keeping odd index elements in original positions.',
        starterCode: 'def reverse_even_indices(nums: list[int]) -> list[int]:\n    pass',
        solution: `def reverse_even_indices(nums: list[int]) -> list[int]:
    nums[::2] = nums[::2][::-1]
    return nums

print(reverse_even_indices([0, 1, 2, 3, 4, 5]))  # [4, 1, 2, 3, 0, 5]`,
        explanation: 'Extended slice assignment nums[::2] modifies only elements at step 2 in-place.',
      },
    ],
    quizQuestions: [
      {
        id: 'py-19-q1',
        question: 'What is the output of: lst = [10, 20, 30]; print(lst[5:10])?',
        options: ['IndexError: list index out of range', '[]', '[30]', 'None'],
        correctOptionIndex: 1,
        explanation: 'Slicing clamps indices that exceed bounds without raising an IndexError, returning an empty list [].',
      },
      {
        id: 'py-19-q2',
        question: 'What error is raised if the step parameter of a slice is set to 0?',
        options: ['IndexError', 'ValueError: slice step cannot be zero', 'ZeroDivisionError', 'SyntaxError'],
        correctOptionIndex: 1,
        explanation: 'Python raises ValueError when step is 0 because step size must be non-zero.',
      },
    ],
    revisionNotes: [
      's[start:stop:step] never raises IndexError on out-of-bounds.',
      's[::-1] reverses any sequence type in O(n) time.',
      'Slice assignment (lst[:] = new_vals) updates the list in-place.',
    ],
  },
  {
    id: 'py-20-mutability-deepcopy',
    moduleId: 'py-m2',
    moduleNumber: 2,
    moduleTitle: 'Python Data Structures',
    topicNumber: 20,
    title: 'Mutability, Object Identity & Deep vs Shallow Copy',
    language: 'python',
    level: 'Intermediate',
    whyItMatters:
      'Accidental mutation through shared references is the #1 source of bugs in Python programs. Understanding shallow copy vs deep copy prevents insidious state corruption in complex algorithms.',
    explanation:
      'Python data types are divided into mutable (list, dict, set) and immutable (int, float, str, tuple, frozenset, bool). Assignment (`b = a`) only creates a new reference to the same object. A shallow copy (`copy.copy(x)`, `x.copy()`, or `x[:]`) creates a new outer container but references the same inner child objects. A deep copy (`copy.deepcopy(x)`) recursively clones the outer container AND all nested child objects.',
    syntaxAndStructure:
      'import copy\n\n# Reference assignment (shared object):\nb = a\n\n# Shallow copy (outer clone, shared inner):\nshallow = copy.copy(a)       # or a.copy(), or a[:]\n\n# Deep copy (recursive independent clone):\ndeep = copy.deepcopy(a)',
    codeExamples: [
      {
        title: 'Shallow Copy vs Deep Copy Demonstration',
        code: `import copy

original = [[1, 2, 3], [4, 5, 6]]

# 1. Reference assignment
assigned = original

# 2. Shallow copy
shallow = copy.copy(original)

# 3. Deep copy
deep = copy.deepcopy(original)

# Mutate nested list inside original:
original[0][0] = 999

print("Original:", original)
print("Assigned (mutated):", assigned)
print("Shallow  (nested mutated!):", shallow)
print("Deep     (completely independent):", deep)`,
        expectedOutput: `Original: [[999, 2, 3], [4, 5, 6]]
Assigned (mutated): [[999, 2, 3], [4, 5, 6]]
Shallow  (nested mutated!): [[999, 2, 3], [4, 5, 6]]
Deep     (completely independent): [[1, 2, 3], [4, 5, 6]]`,
        explanation: 'In shallow copy, shallow[0] points to the identical inner list as original[0]. Only deepcopy creates independent copies of nested elements.',
      },
      {
        title: 'Immutability and Hashing Integrity',
        code: `class Point:
    def __init__(self, x: int, y: int):
        self.x = x
        self.y = y

# Custom objects are mutable by default:
p1 = Point(1, 2)
p2 = copy.deepcopy(p1)

print("p1 is p2:", p1 is p2)
print("p1.x == p2.x:", p1.x == p2.x)

p1.x = 100
print("After mutating p1.x -> p2.x is untouched:", p2.x)`,
        expectedOutput: `p1 is p2: False
p1.x == p2.x: True
After mutating p1.x -> p2.x is untouched: 1`,
        explanation: 'deepcopy accurately clones custom class instances along with their instance dictionary attributes.',
      },
    ],
    realWorldApplications: [
      'Snapshotting game state and undo/redo stacks.',
      'Cloning configuration dictionaries before passing them to untrusted plugin modules.',
    ],
    commonMistakes: [
      'Believing `list(matrix)` or `matrix[:]` creates a deep copy; it only creates a shallow copy!',
      'Passing mutable default arguments in functions (e.g. `def func(lst=[])`).',
      'Assuming tuples cannot change when they contain mutable objects like lists.',
    ],
    interviewRelevance:
      'Universal interview question: "Explain the difference between shallow copy and deep copy in Python and how you implement both".',
    checkpoints: [
      { id: 'py-20-cp-1', label: 'Know which types are mutable vs immutable.' },
      { id: 'py-20-cp-2', label: 'Use copy.deepcopy() when cloning nested data structures.' },
    ],
    practiceExercises: [
      {
        id: 'py-20-ex-1',
        title: 'Implement Custom Shallow Copy for Dict of Lists',
        difficulty: 'Beginner',
        type: 'coding',
        prompt: 'Write a function that creates a copy of a dict of lists where the lists are also new copies (1-level deep clone).',
        starterCode: 'def clone_dict_of_lists(d: dict[str, list]) -> dict[str, list]:\n    pass',
        solution: `def clone_dict_of_lists(d: dict[str, list]) -> dict[str, list]:
    return {k: v[:] for k, v in d.items()}

original = {"fruits": ["apple", "banana"]}
cloned = clone_dict_of_lists(original)
original["fruits"].append("cherry")
print("Original:", original)
print("Cloned:", cloned)`,
        explanation: 'v[:] shallow copies each inner list, making the dictionary values independent.',
      },
      {
        id: 'py-20-ex-2',
        title: 'Predict ID Identity Outcomes',
        difficulty: 'Intermediate',
        type: 'output_prediction',
        prompt: 'What is printed by: `a = [1]; b = a; b += [2]; print(a)` vs `a = [1]; b = a; b = b + [2]; print(a)`?',
        solution: 'First prints `[1, 2]` because `+=` invokes in-place `__iadd__` mutating the shared list. Second prints `[1]` because `b = b + [2]` creates a new list object and rebinds name b.',
        explanation: '+= on mutable lists mutates in-place (like .extend()), whereas + creates a new object.',
      },
      {
        id: 'py-20-ex-3',
        title: 'Safe State Snapshot Manager',
        difficulty: 'Advanced',
        type: 'coding',
        prompt: 'Create a simple StateManager class with `save_state(state: dict)` and `restore_state() -> dict` using deepcopy.',
        starterCode: 'import copy\nclass StateManager:\n    pass',
        solution: `import copy

class StateManager:
    def __init__(self):
        self._history = []

    def save_state(self, state: dict):
        self._history.append(copy.deepcopy(state))

    def restore_state(self) -> dict | None:
        return copy.deepcopy(self._history.pop()) if self._history else None

manager = StateManager()
curr = {"score": 10, "items": ["sword"]}
manager.save_state(curr)
curr["items"].append("shield")
curr["score"] = 50

restored = manager.restore_state()
print("Restored:", restored)  # {'score': 10, 'items': ['sword']}`,
        explanation: 'Deepcopy ensures snapshots are immune to future mutations.',
      },
    ],
    quizQuestions: [
      {
        id: 'py-20-q1',
        question: 'Which of the following built-in types is MUTABLE in Python?',
        options: ['tuple', 'str', 'frozenset', 'dict'],
        correctOptionIndex: 3,
        explanation: 'Dictionaries, lists, and sets are mutable. Strings, tuples, and frozensets are immutable.',
      },
      {
        id: 'py-20-q2',
        question: 'What is the key difference between copy.copy() and copy.deepcopy() on a nested list [[1, 2], [3, 4]]?',
        options: [
          'copy.copy() is recursive; copy.deepcopy() is not',
          'copy.copy() copies outer list but shares inner lists; copy.deepcopy() recursively duplicates all nested objects',
          'copy.deepcopy() only works on integers',
          'copy.copy() converts lists into tuples',
        ],
        correctOptionIndex: 1,
        explanation: 'Shallow copy duplicates only the top-level container, whereas deep copy recursively duplicates every object found within.',
      },
    ],
    revisionNotes: [
      'Assignment (=) creates a reference alias, NOT a new object.',
      'Shallow copy (copy.copy or [:]) duplicates outer container only.',
      'Deep copy (copy.deepcopy) recursively clones all nested objects.',
    ],
  },
];

export const module2: MasteryModule = {
  id: 'py-m2',
  number: 2,
  title: 'Python Data Structures',
  description: 'Strings, lists, tuples, sets, dictionaries, comprehensions, slicing, and memory mutability.',
  language: 'python',
  topics: module2Topics,
  moduleAssessment: {
    id: 'py-m2-exam',
    title: 'Python Data Structures Milestone Assessment',
    passingScorePercentage: 70,
    questions: module2Topics.flatMap((t) => t.quizQuestions),
  },
  revisionQuestions: [
    'Why are strings immutable in Python, and how does this affect memory and performance?',
    'What is the time complexity difference between list.append() and list.insert(0, val)?',
    'Can any tuple be used as a key in a dictionary? Why or why not?',
    'What is the difference between set.remove() and set.discard()?',
    'Explain the 2D grid allocation bug: [[0] * cols] * rows.',
  ],
};
