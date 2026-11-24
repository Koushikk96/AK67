import { MasteryTopic, MasteryModule } from '@/types/mastery';

export const module8Topics: MasteryTopic[] = [
  {
    id: 'py-80-interview-theory',
    moduleId: 'py-m8',
    moduleNumber: 8,
    moduleTitle: 'Python Interview Preparation & Problem Patterns',
    topicNumber: 80,
    title: 'Frequently Asked Python Interview Questions & Theory Rapid-Fire',
    language: 'python',
    level: 'Advanced',
    whyItMatters:
      'Technical interview rounds frequently test conceptual foundations to distinguish developers who understand Python internals from those who merely write basic syntax.',
    explanation:
      'Python interviews center around key theoretical pillars: the Python memory model (everything is an object, variables are references), dynamic vs strong typing (types are checked at runtime, but implicit type coercion between incompatible types like str + int is forbidden), namespaces and the LEGB scoping rule (Local, Enclosing, Global, Built-in), the Global Interpreter Lock (GIL), and duck typing ("If it walks like a duck and quacks like a duck, it is a duck"). Understanding how Python handles function argument passing (call-by-object-reference) is crucial.',
    syntaxAndStructure:
      '# Concept: Call-by-object-reference\ndef modify(lst, num):\n    lst.append(99)  # Mutates caller object\n    num = 100       # Rebinds local name num only\n\na = [1, 2]\nb = 5\nmodify(a, b)\n# a is now [1, 2, 99], b is still 5',
    codeExamples: [
      {
        title: 'Demonstrating LEGB Scope and Namespace Lookup',
        code: `x = "global"

def outer():
    x = "enclosing"
    def inner():
        # Without nonlocal/global, reading looks up LEGB
        return f"inner reads: {x}"
    return inner()

def modifying_enclosing():
    count = 0
    def increment():
        nonlocal count
        count += 1
        return count
    return increment

counter = modifying_enclosing()
print("Scope lookup result:", outer())
print("Nonlocal counter call 1:", counter())
print("Nonlocal counter call 2:", counter())`,
        expectedOutput: `Scope lookup result: inner reads: enclosing
Nonlocal counter call 1: 1
Nonlocal counter call 2: 2`,
        explanation:
          'Python searches for names through LEGB: Local -> Enclosing -> Global -> Built-in. The nonlocal keyword explicitly binds assignment to the enclosing function scope.',
      },
      {
        title: 'Python Object Identity vs Value Equality Deep Dive',
        code: `a = [1, 2, 3]
b = [1, 2, 3]
c = a

print(f"a == b: {a == b} (Value equality)")
print(f"a is b: {a is b} (Identity / Memory address equality)")
print(f"a is c: {a is c} (Both reference identical memory)")

# Small integer caching (-5 to 256)
x = 250
y = 250
print(f"250 is 250: {x is y} (Cached by CPython runtime)")

p = 1000
q = 1000
print(f"1000 is 1000 in separate expressions: {p is q} (May be False outside constant folding)")`,
        expectedOutput: `a == b: True (Value equality)
a is b: False (Identity / Memory address equality)
a is c: True (Both reference identical memory)
250 is 250: True (Cached by CPython runtime)
1000 is 1000 in separate expressions: False (May be False outside constant folding)`,
        explanation:
          '== checks value equality by invoking __eq__; "is" tests identity by comparing id() memory addresses. CPython pre-allocates and caches small integers between -5 and 256.',
      },
    ],
    realWorldApplications: [
      'Answering core theoretical questions in campus placements and FAANG technical screens.',
      'Architecting memory-efficient systems avoiding unintentional object mutability bugs.',
      'Refactoring global state dependencies into clean closures and dependency injection.',
    ],
    commonMistakes: [
      'Describing Python as "call-by-value" or "call-by-reference"; Python uses "call-by-object-reference".',
      'Using "is" to compare strings or integers instead of ==, leading to subtle bugs across different Python runtimes.',
      'Claiming Python is weakly typed; Python is dynamically typed but STRONGLY typed (e.g. "5" + 2 raises TypeError).',
    ],
    interviewRelevance:
      'Consistently one of the first questions asked: "How does Python pass arguments to functions?" and "Explain the difference between == and is".',
    checkpoints: [
      { id: 'py-80-cp-1', label: 'Explain LEGB scoping and the difference between global and nonlocal.' },
      { id: 'py-80-cp-2', label: 'Differentiate value equality (==) from object identity (is).' },
    ],
    practiceExercises: [
      {
        id: 'py-80-ex-1',
        title: 'Identify Variable Scoping Order',
        difficulty: 'Beginner',
        type: 'coding',
        prompt: 'Write a function legb_order() -> list[str] that returns the 4 scope resolution layers in exact order: ["Local", "Enclosing", "Global", "Built-in"].',
        starterCode: 'def legb_order() -> list[str]:\n    # TODO\n    pass',
        solution: `def legb_order() -> list[str]:\n    return ["Local", "Enclosing", "Global", "Built-in"]`,
        explanation: 'LEGB stands for Local, Enclosing, Global, and Built-in scopes.',
      },
      {
        id: 'py-80-ex-2',
        title: 'Simulate Argument Passing Mutation',
        difficulty: 'Intermediate',
        type: 'coding',
        prompt: 'Write a function mutate_or_rebind(lst: list, rebind: bool) that appends 100 to lst if rebind is False, or rebinds lst = [999] if rebind is True, returning lst.',
        starterCode: 'def mutate_or_rebind(lst: list, rebind: bool) -> list:\n    # TODO\n    pass',
        solution: `def mutate_or_rebind(lst: list, rebind: bool) -> list:\n    if rebind:\n        lst = [999]\n    else:\n        lst.append(100)\n    return lst`,
        explanation: 'Illustrates how appending modifies the underlying object while assignment rebinds the local name.',
      },
      {
        id: 'py-80-ex-3',
        title: 'Detect Small Integer Cache Boundary',
        difficulty: 'Advanced',
        type: 'coding',
        prompt: 'Write a function is_cached_small_int(n: int) -> bool returning True if n is within the standard CPython integer cache range [-5, 256].',
        starterCode: 'def is_cached_small_int(n: int) -> bool:\n    # TODO\n    pass',
        solution: `def is_cached_small_int(n: int) -> bool:\n    return -5 <= n <= 256`,
        explanation: 'CPython interns integer objects in the range [-5, 256] during interpreter startup for performance.',
      },
    ],
    quizQuestions: [
      {
        id: 'py-80-q1',
        question: 'Which of the following correctly describes Python\'s typing system?',
        options: [
          'Dynamically and strongly typed',
          'Statically and weakly typed',
          'Dynamically and weakly typed',
          'Statically and strongly typed',
        ],
        correctOptionIndex: 0,
        explanation: 'Python is dynamically typed (types checked at runtime) and strongly typed (types do not implicitly coerce incompatibly, e.g. "3" + 4 fails).',
      },
      {
        id: 'py-80-q2',
        question: 'What does the "is" keyword evaluate in Python?',
        options: [
          'Whether two objects have identical hash values.',
          'Whether two variables refer to the exact same memory address (id).',
          'Whether the string representations of two objects are equal.',
          'Whether both objects belong to the same class.',
        ],
        correctOptionIndex: 1,
        explanation: '"is" checks object identity by comparing memory addresses: id(a) == id(b).',
      },
    ],
    revisionNotes: [
      'Python uses "call-by-object-reference": immutable objects cannot be modified in-place; mutable objects can be mutated.',
      'LEGB: Local -> Enclosing -> Global -> Built-in.',
      '== checks value equality (__eq__); "is" checks memory identity (id).',
      'Small integers from -5 to 256 are pre-allocated and interned by CPython.',
    ],
  },
  {
    id: 'py-81-output-prediction',
    moduleId: 'py-m8',
    moduleNumber: 8,
    moduleTitle: 'Python Interview Preparation & Problem Patterns',
    topicNumber: 81,
    title: 'Predict-the-Output Challenges',
    language: 'python',
    level: 'Advanced',
    whyItMatters:
      'Predict-the-output questions appear in almost every written technical assessment to test awareness of subtle edge cases, late binding, and operator precedence.',
    explanation:
      'Predicting Python outputs tests tricky behaviors such as: (1) Late binding closures where functions inside loops capture variables by reference rather than value; (2) Mutable default argument evaluation at function definition time; (3) Comparison chaining (e.g., 1 < x < 5); (4) Short-circuit boolean evaluation returning the deciding operand rather than True/False; (5) Modifying collections during iteration.',
    syntaxAndStructure:
      '# Tricky Pattern: Late binding in closures\nfuncs = [lambda: i for i in range(3)]\n# [f() for f in funcs] produces [2, 2, 2], not [0, 1, 2]!\n# Fix: Default argument capture\nfixed = [lambda i=i: i for i in range(3)]  # [0, 1, 2]',
    codeExamples: [
      {
        title: 'Classic Output Trap: Late Binding Closures vs Default Arg Capture',
        code: `# Classic bug: closures capture variable names, not values
buggy_multipliers = [lambda x: x * i for i in range(4)]
print("Buggy multipliers with x=2:")
print([f(2) for f in buggy_multipliers])

# Fix: Bind i at function definition time using default parameter
fixed_multipliers = [lambda x, i=i: x * i for i in range(4)]
print("\\nFixed multipliers with x=2:")
print([f(2) for f in fixed_multipliers])`,
        expectedOutput: `Buggy multipliers with x=2:
[6, 6, 6, 6]

Fixed multipliers with x=2:
[0, 2, 4, 6]`,
        explanation:
          'Because i is evaluated when the lambda is called (when i has finished looping at 3), all buggy lambdas multiply by 3. Default arguments freeze the current loop value at definition time.',
      },
      {
        title: 'Short-Circuit Evaluation and Comparison Chaining',
        code: `# Short-circuit returns the actual operand, not a boolean!
print("Short-circuit OR:", [] or "default_val" or 123)
print("Short-circuit AND:", "hello" and 42 and [1, 2])

# Comparison chaining: a < b < c expands to (a < b) and (b < c)
# Note that (False == False in [False]) evaluates as:
# (False == False) and (False in [False]) -> True and True -> True!
print("Chained comparison 1 < 3 < 5:", 1 < 3 < 5)
print("Chained comparison 1 < 3 > 2:", 1 < 3 > 2)
print("Chained comparison 1 < 3 > 10:", 1 < 3 > 10)`,
        expectedOutput: `Short-circuit OR: default_val
Short-circuit AND: [1, 2]
Chained comparison 1 < 3 < 5: True
Chained comparison 1 < 3 > 2: True
Chained comparison 1 < 3 > 10: False`,
        explanation:
          'In Python, `x or y` returns x if x is truthy, otherwise y. Chained comparisons like a < b < c evaluate as `(a < b) and (b < c)` with b evaluated only once.',
      },
    ],
    realWorldApplications: [
      'Acing aptitude and preliminary screening technical tests for TCS, Infosys, Amazon, and startups.',
      'Preventing subtle bugs when generating dynamic event callbacks and GUI button handlers.',
      'Refactoring complex compound logical conditions.',
    ],
    commonMistakes: [
      'Assuming lambda closures freeze the loop variable value at definition time without default argument capture.',
      'Expecting "and" / "or" expressions to always return literal True or False.',
      'Writing chained comparisons that accidentally combine equality and membership (e.g. a == b in c).',
    ],
    interviewRelevance:
      'High-frequency interview filter. Candidates who immediately recognize late binding and mutable default parameters stand out instantly.',
    checkpoints: [
      { id: 'py-81-cp-1', label: 'Diagnose and fix late binding in closures using default arguments.' },
      { id: 'py-81-cp-2', label: 'Predict outputs involving short-circuit evaluation and comparison chaining.' },
    ],
    practiceExercises: [
      {
        id: 'py-81-ex-1',
        title: 'Predict Output of List Multiplication',
        difficulty: 'Beginner',
        type: 'output_prediction',
        prompt: 'What is the output of: `a = [[0]] * 3; a[0][0] = 5; print(a)`?',
        solution: '[[5], [5], [5]]. The outer list contains 3 references to the identical single inner list.',
        explanation: 'Multiplying a list copies references, not the nested list objects.',
      },
      {
        id: 'py-81-ex-2',
        title: 'Fix Loop Closure Late Binding',
        difficulty: 'Intermediate',
        type: 'coding',
        prompt: 'Given a list of numbers, return a list of functions where the k-th function returns numbers[k] using default argument capture.',
        starterCode: 'def make_getters(numbers: list[int]):\n    # TODO\n    pass',
        solution: `def make_getters(numbers: list[int]):\n    return [lambda val=n: val for n in numbers]`,
        explanation: 'Using val=n binds the current value of n at function creation time.',
      },
      {
        id: 'py-81-ex-3',
        title: 'Predict Output of Boolean and String Operator',
        difficulty: 'Advanced',
        type: 'output_prediction',
        prompt: 'What does the expression `"" or [] or {} or "Python" and 0 or [99]` evaluate to?',
        solution: '[99]. Breaking down: ("" or [] or {}) -> {}; then ({} or "Python") -> "Python"; then ("Python" and 0) -> 0; then (0 or [99]) -> [99].',
        explanation: 'Follows left-to-right precedence: "and" has higher precedence than "or".',
      },
    ],
    quizQuestions: [
      {
        id: 'py-81-q1',
        question: 'What is the result of evaluating: [f() for f in [lambda: i for i in range(3)]]?',
        options: ['[0, 1, 2]', '[2, 2, 2]', '[3, 3, 3]', 'Raises NameError'],
        correctOptionIndex: 1,
        explanation: 'Because of late binding in closures, i is looked up when f() is called. When the loop ends, i is 2, so all return 2.',
      },
      {
        id: 'py-81-q2',
        question: 'What is returned by the expression: "apple" and "" and "banana"?',
        options: ['"apple"', '""', '"banana"', 'False'],
        correctOptionIndex: 1,
        explanation: '"and" evaluates left-to-right and returns the first falsy value encountered (the empty string "").',
      },
    ],
    revisionNotes: [
      'Closures bind variable names, not values; use default parameters (lambda i=i: ...) to capture values.',
      'List multiplication `[[]] * n` creates n shallow copies referencing the same inner list.',
      'Logical operators return the deciding operand, not necessarily booleans.',
      'Chained comparisons `a < b < c` evaluate as `(a < b) and (b < c)` safely.',
    ],
  },
  {
    id: 'py-82-debugging-exercises',
    moduleId: 'py-m8',
    moduleNumber: 8,
    moduleTitle: 'Python Interview Preparation & Problem Patterns',
    topicNumber: 82,
    title: 'Debugging Exercises & Code Smells',
    language: 'python',
    level: 'Advanced',
    whyItMatters:
      'Many companies include live debugging rounds where candidates must find and fix bugs in an existing snippet under time pressure.',
    explanation:
      'Debugging challenges typically fall into distinct categories: (1) Mutation during iteration (skipping elements or shifting indices); (2) Shared mutable default arguments across function calls; (3) Off-by-one errors in slice indices or binary search boundaries; (4) Unhandled edge cases (empty collections, single-element inputs, negative numbers); (5) Hash collisions or unhashable types in set/dict keys.',
    syntaxAndStructure:
      '# Common Bug: Modifying list during iteration\n# BAD:\nfor item in lst:\n    if condition(item): lst.remove(item)  # Skips adjacent items!\n\n# FIX: Iterate over a copy or use list comprehension\nlst = [item for item in lst if not condition(item)]',
    codeExamples: [
      {
        title: 'Bug Analysis: Modifying a List During Direct Iteration',
        code: `# Buggy attempt: remove even numbers
nums_buggy = [2, 4, 6, 7, 8, 9]
for n in nums_buggy:
    if n % 2 == 0:
        nums_buggy.remove(n)
print("Buggy removal output:", nums_buggy)
# Notice 4 and 8 were skipped because index shifted!

# Correct approach: list comprehension or backwards iteration
nums_clean = [2, 4, 6, 7, 8, 9]
nums_clean = [n for n in nums_clean if n % 2 != 0]
print("Correct removal output:", nums_clean)`,
        expectedOutput: `Buggy removal output: [4, 7, 9]
Correct removal output: [7, 9]`,
        explanation:
          'When removing an element from a list during iteration, the internal cursor advances while remaining elements shift left, skipping the adjacent item.',
      },
      {
        title: 'Bug Analysis: Accidental Tuple Creation via Trailing Comma',
        code: `# Bug: Trailing comma accidentally turns variable into a 1-tuple
target_count = 10,
print(f"Type of target_count: {type(target_count)}, Value: {target_count}")

# Causes runtime failure when used in numeric calculations:
try:
    total = target_count + 5
except TypeError as e:
    print("Runtime Exception:", e)

# Correct fix: Remove trailing comma
target_count_fixed = 10
print("Fixed calculation:", target_count_fixed + 5)`,
        expectedOutput: `Type of target_count: <class 'tuple'>, Value: (10,)
Runtime Exception: can only concatenate tuple (not "int") to tuple
Fixed calculation: 15`,
        explanation:
          'In Python, commas make tuples, not parentheses. A stray trailing comma creates a single-element tuple, leading to confusing TypeErrors later.',
      },
    ],
    realWorldApplications: [
      'Pair-programming and live debugging interview rounds.',
      'Refactoring fragile production scripts that exhibit intermittent data-skipping bugs.',
      'Writing defensive code for critical data ingestion pipelines.',
    ],
    commonMistakes: [
      'Iterating through a collection and calling .remove() or .pop() directly inside the loop.',
      'Accidentally leaving a comma at the end of a variable assignment line, turning an int or str into a tuple.',
      'Catching bare Exception without logging, silencing underlying syntax or type errors.',
    ],
    interviewRelevance:
      'Interviewers test how systematically you locate root causes using print/pdb/reasoning rather than making random guesses.',
    checkpoints: [
      { id: 'py-82-cp-1', label: 'Identify and fix bugs caused by mutating collections during iteration.' },
      { id: 'py-82-cp-2', label: 'Detect subtle syntax bugs such as accidental tuple creation.' },
    ],
    practiceExercises: [
      {
        id: 'py-82-ex-1',
        title: 'Fix Mutable Default Argument Bug',
        difficulty: 'Beginner',
        type: 'debugging',
        prompt: 'Fix this function so that callers receive an isolated list: `def append_item(val, items=[]): items.append(val); return items`',
        starterCode: 'def append_item(val, items=None):\n    # TODO: Fix default\n    pass',
        solution: `def append_item(val, items=None):\n    if items is None:\n        items = []\n    items.append(val)\n    return items`,
        explanation: 'Default arguments are evaluated once at function definition time. Using None as sentinel creates a fresh list on each call.',
      },
      {
        id: 'py-82-ex-2',
        title: 'Fix Off-By-One Binary Search Loop',
        difficulty: 'Intermediate',
        type: 'debugging',
        prompt: 'Fix the while condition and mid calculation in: `def search(arr, target): left, right = 0, len(arr); while left < right: ...` to properly find targets at the last index.',
        starterCode: 'def search(arr: list[int], target: int) -> int:\n    left, right = 0, len(arr) - 1\n    # TODO\n    pass',
        solution: `def search(arr: list[int], target: int) -> int:\n    left, right = 0, len(arr) - 1\n    while left <= right:\n        mid = (left + right) // 2\n        if arr[mid] == target:\n            return mid\n        elif arr[mid] < target:\n            left = mid + 1\n        else:\n            right = mid - 1\n    return -1`,
        explanation: 'Using `left <= right` with `right = len(arr) - 1` ensures the last element is checked when the target resides at the boundary.',
      },
      {
        id: 'py-82-ex-3',
        title: 'Debug Circular Reference Memory Leak Simulator',
        difficulty: 'Advanced',
        type: 'debugging',
        prompt: 'Given two classes NodeA and NodeB holding references to each other, write a cleanup method break_cycle(a) that sets a.b_ref = None to eliminate the circular reference.',
        starterCode: 'def break_cycle(node_a):\n    # TODO\n    pass',
        solution: `def break_cycle(node_a):\n    if hasattr(node_a, "b_ref") and node_a.b_ref is not None:\n        node_a.b_ref.a_ref = None\n        node_a.b_ref = None`,
        explanation: 'Explicitly severing reference links allows reference counting to reclaim memory immediately without waiting for cyclic GC.',
      },
    ],
    quizQuestions: [
      {
        id: 'py-82-q1',
        question: 'Why does removing elements from a list while iterating forwards cause elements to be skipped?',
        options: [
          'Because Python raises a ConcurrentModificationException.',
          'Because the list length decreases and indices shift left, causing the loop index to skip over the next immediate element.',
          'Because the garbage collector immediately destroys the list.',
          'Because remove() deletes elements at random.',
        ],
        correctOptionIndex: 1,
        explanation: 'When index i is removed, index i+1 shifts to index i. The loop counter advances to i+1 on the next step, skipping the shifted item.',
      },
      {
        id: 'py-82-q2',
        question: 'What is the type of variable x after: `x = 42,` ?',
        options: ['int', 'float', 'tuple', 'list'],
        correctOptionIndex: 2,
        explanation: 'A trailing comma creates a 1-tuple `(42,)`. Parentheses are optional when defining tuples in Python.',
      },
    ],
    revisionNotes: [
      'Never mutate a collection while iterating over it forwards; iterate over a copy or use a comprehension.',
      'Watch for trailing commas turning variables into unexpected tuples.',
      'Use None as default parameter sentinel for mutable arguments like lists or dictionaries.',
      'Always test boundary inputs: empty arrays, single elements, and targets at index 0 or len-1.',
    ],
  },
  {
    id: 'py-83-oop-design-interview',
    moduleId: 'py-m8',
    moduleNumber: 8,
    moduleTitle: 'Python Interview Preparation & Problem Patterns',
    topicNumber: 83,
    title: 'Object-Oriented Design Interview Scenarios in Python',
    language: 'python',
    level: 'Advanced',
    whyItMatters:
      'Low-Level Design (LLD) and Object-Oriented Design (OOD) interview rounds test your ability to model real-world domains cleanly using SOLID principles and design patterns.',
    explanation:
      'Common interview OOD scenarios include designing an LRU Cache, a Parking Lot, a Notification Service, or a Deck of Cards. Python simplifies OOD implementation through features like collections.OrderedDict, abc.ABC, dataclasses, properties, and magic methods. Applying SOLID principles (Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion) ensures clean, extensible architectures.',
    syntaxAndStructure:
      'from abc import ABC, abstractmethod\n\n# Interface / Abstract Base Class\nclass NotificationSender(ABC):\n    @abstractmethod\n    def send(self, recipient: str, message: str) -> bool:\n        pass\n\nclass EmailSender(NotificationSender):\n    def send(self, recipient: str, message: str) -> bool:\n        # Implementation\n        return True',
    codeExamples: [
      {
        title: 'Low-Level Design: LRU Cache with OrderedDict',
        code: `from collections import OrderedDict

class LRUCache:
    def __init__(self, capacity: int):
        self.capacity = capacity
        self.cache = OrderedDict()

    def get(self, key: int) -> int:
        if key not in self.cache:
            return -1
        # Move accessed key to end (most recently used)
        self.cache.move_to_end(key)
        return self.cache[key]

    def put(self, key: int, value: int) -> None:
        if key in self.cache:
            self.cache.move_to_end(key)
        self.cache[key] = value
        if len(self.cache) > self.capacity:
            # Pop the first item (least recently used)
            self.cache.popitem(last=False)

cache = LRUCache(2)
cache.put(1, 100)
cache.put(2, 200)
print("Get 1:", cache.get(1))  # 1 is now MRU
cache.put(3, 300)             # 2 is evicted!
print("Get 2 (evicted):", cache.get(2))
print("Get 3:", cache.get(3))`,
        expectedOutput: `Get 1: 100
Get 2 (evicted): -1
Get 3: 300`,
        explanation:
          'collections.OrderedDict allows O(1) key access, O(1) move_to_end(), and O(1) popitem(last=False), providing a clean Pythonic LRU cache.',
      },
      {
        title: 'Factory Pattern & Strategy Notification System',
        code: `from abc import ABC, abstractmethod

class Notifier(ABC):
    @abstractmethod
    def send(self, to: str, msg: str) -> str:
        pass

class EmailNotifier(Notifier):
    def send(self, to: str, msg: str) -> str:
        return f"Email sent to {to}: '{msg}'"

class SMSNotifier(Notifier):
    def send(self, to: str, msg: str) -> str:
        return f"SMS sent to {to}: '{msg}'"

class NotifierFactory:
    _registry = {
        "email": EmailNotifier,
        "sms": SMSNotifier,
    }

    @classmethod
    def get_notifier(cls, channel: str) -> Notifier:
        notifier_cls = cls._registry.get(channel.lower())
        if not notifier_cls:
            raise ValueError(f"Unknown channel: {channel}")
        return notifier_cls()

notifier = NotifierFactory.get_notifier("email")
print(notifier.send("alice@corp.com", "Your interview is scheduled!"))`,
        expectedOutput: `Email sent to alice@corp.com: 'Your interview is scheduled!'`,
        explanation:
          'Demonstrates the Factory Pattern combined with Abstract Base Classes, adhering to the Open/Closed Principle (open for extension, closed for modification).',
      },
    ],
    realWorldApplications: [
      'Low-Level Design (LLD) interview rounds for SDE-1 and SDE-2 roles.',
      'Building pluggable messaging architectures and middleware processors.',
      'Managing hardware device drivers or payment gateway providers.',
    ],
    commonMistakes: [
      'Putting all logic in a single monolithic God class instead of separating concerns.',
      'Hardcoding concrete class instantiations inside business logic rather than using factory methods.',
      'Reinventing Doubly-Linked Lists when OrderedDict or deque cleanly solve the problem.',
    ],
    interviewRelevance:
      'LLD rounds evaluate clean code, SOLID compliance, appropriate design pattern usage, and clean handling of edge cases.',
    checkpoints: [
      { id: 'py-83-cp-1', label: 'Implement an LRU Cache with O(1) get and put operations.' },
      { id: 'py-83-cp-2', label: 'Apply the Factory and Strategy patterns using Abstract Base Classes.' },
    ],
    practiceExercises: [
      {
        id: 'py-83-ex-1',
        title: 'Singleton Pattern with __new__',
        difficulty: 'Beginner',
        type: 'coding',
        prompt: 'Implement a Singleton class DatabaseConfig where multiple instantiations return the exact same instance.',
        starterCode: 'class DatabaseConfig:\n    # TODO\n    pass',
        solution: `class DatabaseConfig:\n    _instance = None\n\n    def __new__(cls, *args, **kwargs):\n        if cls._instance is None:\n            cls._instance = super().__new__(cls)\n        return cls._instance`,
        explanation: 'Overriding __new__ controls object instantiation, ensuring only one instance ever exists.',
      },
      {
        id: 'py-83-ex-2',
        title: 'Design Parking Spot Hierarchy',
        difficulty: 'Intermediate',
        type: 'coding',
        prompt: 'Design a class ParkingSpot(spot_id: int, size: str) with methods is_available() -> bool, park_vehicle() -> bool, and remove_vehicle() -> bool.',
        starterCode: 'class ParkingSpot:\n    # TODO\n    pass',
        solution: `class ParkingSpot:\n    def __init__(self, spot_id: int, size: str):\n        self.spot_id = spot_id\n        self.size = size\n        self.occupied = False\n\n    def is_available(self) -> bool:\n        return not self.occupied\n\n    def park_vehicle(self) -> bool:\n        if self.occupied:\n            return False\n        self.occupied = True\n        return True\n\n    def remove_vehicle(self) -> bool:\n        if not self.occupied:\n            return False\n        self.occupied = False\n        return True`,
        explanation: 'Models parking spot occupancy state safely with guard checks.',
      },
      {
        id: 'py-83-ex-3',
        title: 'Design Time-Based Key-Value Store',
        difficulty: 'Advanced',
        type: 'coding',
        prompt: 'Design a TimeMap class supporting set(key, value, timestamp) and get(key, timestamp) returning the value with largest timestamp_prev <= timestamp, or "" if none.',
        starterCode: 'class TimeMap:\n    # TODO\n    pass',
        solution: `from bisect import bisect_right\n\nclass TimeMap:\n    def __init__(self):\n        self.store = {}\n\n    def set(self, key: str, value: str, timestamp: int) -> None:\n        if key not in self.store:\n            self.store[key] = []\n        self.store[key].append((timestamp, value))\n\n    def get(self, key: str, timestamp: int) -> str:\n        if key not in self.store:\n            return ""\n        pairs = self.store[key]\n        idx = bisect_right(pairs, (timestamp, chr(127)))\n        if idx == 0:\n            return ""\n        return pairs[idx - 1][1]`,
        explanation: 'Stores (timestamp, value) pairs sorted by timestamp and uses binary search (bisect_right) for O(log N) lookups.',
      },
    ],
    quizQuestions: [
      {
        id: 'py-83-q1',
        question: 'Which Python standard library collection is best suited for implementing an O(1) LRU Cache?',
        options: ['collections.Counter', 'collections.OrderedDict', 'collections.defaultdict', 'heapq'],
        correctOptionIndex: 1,
        explanation: 'collections.OrderedDict combines hash map lookup with doubly-linked list ordering, supporting move_to_end() and popitem() in O(1).',
      },
      {
        id: 'py-83-q2',
        question: 'Which SOLID principle states that software entities should be open for extension but closed for modification?',
        options: ['Single Responsibility Principle', 'Open/Closed Principle', 'Liskov Substitution Principle', 'Dependency Inversion Principle'],
        correctOptionIndex: 1,
        explanation: 'The Open/Closed Principle (OCP) advocates using inheritance or polymorphism to add new functionality without editing existing tested code.',
      },
    ],
    revisionNotes: [
      'collections.OrderedDict provides built-in O(1) operations for LRU caches.',
      'Use abc.ABC and @abstractmethod to enforce clean interfaces.',
      'Follow SOLID principles: separate responsibilities and program to interfaces.',
      'Use factory classes to decouple client code from concrete implementations.',
    ],
  },
  {
    id: 'py-84-python-pitfalls',
    moduleId: 'py-m8',
    moduleNumber: 8,
    moduleTitle: 'Python Interview Preparation & Problem Patterns',
    topicNumber: 84,
    title: 'High-Frequency Python Pitfalls',
    language: 'python',
    level: 'Advanced',
    whyItMatters:
      'Understanding common pitfalls prevents production incidents and demonstrates mature language command in technical screening interviews.',
    explanation:
      'Python has several subtle design nuances that frequently trap developers: (1) Comparing identity vs equality (using "is" on strings or numbers); (2) Shallow copy vs deep copy in nested structures (modifying copy modifies original); (3) Circular imports caused by top-level importing of interrelated modules; (4) Floating point representation inaccuracies (0.1 + 0.2 != 0.3); (5) Mutable class variables shared across all instances.',
    syntaxAndStructure:
      'import copy\n\n# Shallow vs Deep copy:\norig = [[1, 2], [3, 4]]\nshallow = orig.copy()          # shallow[0] is orig[0]\ndeep = copy.deepcopy(orig)     # deep[0] is an independent copy\n\n# Floating point comparison:\nimport math\nmath.isclose(0.1 + 0.2, 0.3)   # True (safe comparison)',
    codeExamples: [
      {
        title: 'Class Variable vs Instance Variable Mutation Pitfall',
        code: `class Employee:
    # CLASS VARIABLE: Shared across ALL instances!
    skills = []

    def __init__(self, name: str):
        self.name = name

e1 = Employee("Alice")
e2 = Employee("Bob")

e1.skills.append("Python")
print("Alice's skills:", e1.skills)
print("Bob's skills (Unintentionally modified!):", e2.skills)

# Fix: Initialize mutable structures in __init__
class SafeEmployee:
    def __init__(self, name: str):
        self.name = name
        self.skills = []  # Separate list per instance

s1 = SafeEmployee("Charlie")
s2 = SafeEmployee("Dave")
s1.skills.append("Python")
print("Charlie's skills:", s1.skills)
print("Dave's skills:", s2.skills)`,
        expectedOutput: `Alice's skills: ['Python']
Bob's skills (Unintentionally modified!): ['Python']
Charlie's skills: ['Python']
Dave's skills: []`,
        explanation:
          'Mutable objects defined at the class body level are shared across every instance of the class. They must be instantiated inside __init__.',
      },
      {
        title: 'Floating Point Precision and Decimal Module Solution',
        code: `from decimal import Decimal
import math

# IEEE 754 float representation quirk
raw_sum = 0.1 + 0.2
print(f"0.1 + 0.2 = {raw_sum:.17f}")
print("0.1 + 0.2 == 0.3:", raw_sum == 0.3)
print("math.isclose(0.1 + 0.2, 0.3):", math.isclose(raw_sum, 0.3))

# For financial calculations: use Decimal with strings
d1 = Decimal("0.1")
d2 = Decimal("0.2")
print("Decimal exact sum:", d1 + d2 == Decimal("0.3"))`,
        expectedOutput: `0.1 + 0.2 = 0.30000000000000004
0.1 + 0.2 == 0.3: False
math.isclose(0.1 + 0.2, 0.3): True
Decimal exact sum: True`,
        explanation:
          'Binary floating point numbers cannot represent 0.1 or 0.2 exactly. Use math.isclose for float equality or decimal.Decimal for financial arithmetic.',
      },
    ],
    realWorldApplications: [
      'Financial and banking software where rounding errors lead to regulatory violations.',
      'Preventing state contamination between concurrent web server requests.',
      'Safely copying complex nested configuration trees without cross-talk.',
    ],
    commonMistakes: [
      'Defining lists or dicts at class level expecting them to be instance-specific.',
      'Using float for currency or billing computations instead of decimal.Decimal.',
      'Using copy.copy() on nested lists and wondering why modifying the copy mutates the original.',
    ],
    interviewRelevance:
      'Interviewers frequently ask: "Why does 0.1 + 0.2 != 0.3 in Python?" and "What is the difference between copy.copy() and copy.deepcopy()?"',
    checkpoints: [
      { id: 'py-84-cp-1', label: 'Distinguish class variables from instance variables.' },
      { id: 'py-84-cp-2', label: 'Handle floating-point comparisons and currency using Decimal or math.isclose.' },
    ],
    practiceExercises: [
      {
        id: 'py-84-ex-1',
        title: 'Safe Float Equality',
        difficulty: 'Beginner',
        type: 'coding',
        prompt: 'Write a function float_equals(a: float, b: float, tol: float = 1e-9) -> bool using abs(a - b) < tol.',
        starterCode: 'def float_equals(a: float, b: float, tol: float = 1e-9) -> bool:\n    # TODO\n    pass',
        solution: `def float_equals(a: float, b: float, tol: float = 1e-9) -> bool:\n    return abs(a - b) < tol`,
        explanation: 'Comparing absolute difference against an epsilon avoids float representation equality failures.',
      },
      {
        id: 'py-84-ex-2',
        title: 'Deep Copy Nested Matrix',
        difficulty: 'Intermediate',
        type: 'coding',
        prompt: 'Write a function clone_matrix(matrix: list[list[int]]) -> list[list[int]] returning a fully independent copy where mutating a row does not affect the original.',
        starterCode: 'def clone_matrix(matrix: list[list[int]]) -> list[list[int]]:\n    # TODO\n    pass',
        solution: `def clone_matrix(matrix: list[list[int]]) -> list[list[int]]:\n    return [row[:] for row in matrix]`,
        explanation: 'Slicing each row [row[:]] creates fresh inner list objects, safely duplicating 2D matrices.',
      },
      {
        id: 'py-84-ex-3',
        title: 'Detect Shared Class Attribute Leak',
        difficulty: 'Advanced',
        type: 'debugging',
        prompt: 'Identify the bug in: `class Cart: items = []; def add(self, x): self.items.append(x)` and refactor it so carts do not share items.',
        starterCode: 'class Cart:\n    # TODO: Refactor\n    pass',
        solution: `class Cart:\n    def __init__(self):\n        self.items = []\n\n    def add(self, x):\n        self.items.append(x)`,
        explanation: 'Moving items = [] inside __init__ ensures every Cart instance gets its own independent list.',
      },
    ],
    quizQuestions: [
      {
        id: 'py-84-q1',
        question: 'Why does 0.1 + 0.2 == 0.3 evaluate to False in Python and most languages?',
        options: [
          'Because Python uses 32-bit integers for math.',
          'Because 0.1 and 0.2 cannot be represented with exact precision in IEEE 754 binary floating-point representation.',
          'Because the + operator converts floats to strings.',
          'Because of the Global Interpreter Lock.',
        ],
        correctOptionIndex: 1,
        explanation: 'Floating point numbers use base-2 representation where fractions like 1/10 result in repeating binary decimals with minor rounding discrepancies.',
      },
      {
        id: 'py-84-q2',
        question: 'What is the effect of copy.copy() (shallow copy) on a list containing nested dictionaries?',
        options: [
          'It creates a completely independent copy of the list and all nested dictionaries.',
          'It copies the outer list container, but elements inside still point to the same nested dictionary objects.',
          'It converts all dictionaries into tuples.',
          'It raises a TypeError.',
        ],
        correctOptionIndex: 1,
        explanation: 'Shallow copy creates a new outer collection, but nested child references are shared between original and copy.',
      },
    ],
    revisionNotes: [
      'Initialize mutable attributes in __init__, not at the class body level.',
      'Use math.isclose() or decimal.Decimal for floating-point equality checks.',
      'Use copy.deepcopy() when duplicating nested structures to avoid shared mutation.',
      'Never use "is" for checking value equality of strings or numbers.',
    ],
  },
  {
    id: 'py-85-gil-concurrency',
    moduleId: 'py-m8',
    moduleNumber: 8,
    moduleTitle: 'Python Interview Preparation & Problem Patterns',
    topicNumber: 85,
    title: 'Global Interpreter Lock (GIL), Threading vs Multiprocessing vs Asyncio',
    language: 'python',
    level: 'Advanced',
    whyItMatters:
      'Understanding concurrency models and the GIL is essential for high-performance backend systems, data pipelines, and passing senior engineering interviews.',
    explanation:
      'The Global Interpreter Lock (GIL) is a mutex in CPython that ensures only one native thread executes Python bytecode at a time, protecting CPython memory management and reference counts from race conditions. As a result: (1) threading is ideal for I/O-bound tasks (network calls, file reading) where threads release the GIL during system calls; (2) multiprocessing bypasses the GIL by spawning separate OS processes with independent memory spaces and PVMs, ideal for CPU-bound computations; (3) asyncio uses single-threaded cooperative multitasking via an event loop and coroutines for handling thousands of concurrent network connections with low memory overhead.',
    syntaxAndStructure:
      '# Concurrency Rule of Thumb:\n# I/O Bound (HTTP, DB, Disk)  -> asyncio or concurrent.futures.ThreadPoolExecutor\n# CPU Bound (Math, Images)    -> concurrent.futures.ProcessPoolExecutor\n\nfrom concurrent.futures import ThreadPoolExecutor, ProcessPoolExecutor\n# with ThreadPoolExecutor(max_workers=5) as ex:\n#     results = ex.map(fetch_url, urls)',
    codeExamples: [
      {
        title: 'Comparing ThreadPoolExecutor and ProcessPoolExecutor Concepts',
        code: `from concurrent.futures import ThreadPoolExecutor
import time

def simulate_io_task(task_id: int) -> str:
    # Simulates I/O wait (GIL is released during sleep/network)
    time.sleep(0.01)
    return f"Task {task_id} completed"

start = time.perf_counter()
with ThreadPoolExecutor(max_workers=4) as executor:
    results = list(executor.map(simulate_io_task, range(4)))

elapsed = time.perf_counter() - start
print("Parallel I/O Results:", results)
print(f"4 tasks finished concurrently in ~{elapsed:.2f}s")`,
        expectedOutput: `Parallel I/O Results: ['Task 0 completed', 'Task 1 completed', 'Task 2 completed', 'Task 3 completed']
4 tasks finished concurrently in ~0.02s`,
        explanation:
          'ThreadPoolExecutor runs I/O tasks concurrently because time.sleep() and socket operations release the GIL, allowing other threads to run.',
      },
      {
        title: 'Asyncio Cooperative Event Loop Flow',
        code: `import asyncio

async def async_worker(name: str, delay: float):
    # await yields control back to the event loop
    await asyncio.sleep(delay)
    return f"Worker {name} finished after {delay}s"

async def main():
    task1 = asyncio.create_task(async_worker("A", 0.02))
    task2 = asyncio.create_task(async_worker("B", 0.01))
    results = await asyncio.gather(task1, task2)
    for r in results:
        print(r)

# Run event loop
asyncio.run(main())`,
        expectedOutput: `Worker A finished after 0.02s
Worker B finished after 0.01s`,
        explanation:
          'asyncio uses cooperative multitasking: when a coroutine awaits an asynchronous operation, the event loop switches execution to other ready tasks.',
      },
    ],
    realWorldApplications: [
      'High-throughput web servers and API gateways (FastAPI, Tornado, Uvicorn).',
      'Data processing and batch ETL pipelines scaling across multi-core CPUs.',
      'Web scrapers concurrently downloading thousands of web pages.',
    ],
    commonMistakes: [
      'Using Python threads for heavy CPU-bound math calculations and expecting multi-core speedup; the GIL will serialize execution and often run slower due to context switching.',
      'Sharing mutable state between multiprocessing processes without explicit IPC queues or shared memory.',
      'Calling blocking synchronous code (like time.sleep or requests.get) inside an async coroutine, blocking the entire event loop.',
    ],
    interviewRelevance:
      'Classic interview question: "What is the Python GIL, why does it exist, and how do you achieve true parallelism on multi-core processors in Python?"',
    checkpoints: [
      { id: 'py-85-cp-1', label: 'Explain why the GIL exists and its impact on CPU-bound vs I/O-bound tasks.' },
      { id: 'py-85-cp-2', label: 'Choose appropriately between ThreadPoolExecutor, ProcessPoolExecutor, and Asyncio.' },
    ],
    practiceExercises: [
      {
        id: 'py-85-ex-1',
        title: 'Classify Concurrency Pattern',
        difficulty: 'Beginner',
        type: 'coding',
        prompt: 'Write a function select_concurrency_tool(task_type: str) -> str returning "ProcessPoolExecutor" for "cpu", "ThreadPoolExecutor" for "io", or "asyncio" for "event_driven".',
        starterCode: 'def select_concurrency_tool(task_type: str) -> str:\n    # TODO\n    pass',
        solution: `def select_concurrency_tool(task_type: str) -> str:\n    mapping = {\n        "cpu": "ProcessPoolExecutor",\n        "io": "ThreadPoolExecutor",\n        "event_driven": "asyncio"\n    }\n    return mapping.get(task_type.lower(), "unknown")`,
        explanation: 'CPU-bound needs multiprocessing to bypass GIL; I/O-bound works well with threads or async event loops.',
      },
      {
        id: 'py-85-ex-2',
        title: 'Concurrent Result Aggregator',
        difficulty: 'Intermediate',
        type: 'coding',
        prompt: 'Write a function run_in_threads(fn, items: list) -> list that executes fn on each item using concurrent.futures.ThreadPoolExecutor(max_workers=4) and returns the collected results.',
        starterCode: 'from concurrent.futures import ThreadPoolExecutor\n\ndef run_in_threads(fn, items: list) -> list:\n    # TODO\n    pass',
        solution: `from concurrent.futures import ThreadPoolExecutor\n\ndef run_in_threads(fn, items: list) -> list:\n    with ThreadPoolExecutor(max_workers=4) as ex:\n        return list(ex.map(fn, items))`,
        explanation: 'ThreadPoolExecutor.map maps a function over items across worker threads and returns results in input order.',
      },
      {
        id: 'py-85-ex-3',
        title: 'Async Coroutine Execution Chain',
        difficulty: 'Advanced',
        type: 'coding',
        prompt: 'Write an async function fetch_both(coro1, coro2) that uses asyncio.gather to await both coroutines concurrently and returns a tuple of their results.',
        starterCode: 'import asyncio\n\nasync def fetch_both(coro1, coro2) -> tuple:\n    # TODO\n    pass',
        solution: `import asyncio\n\nasync def fetch_both(coro1, coro2) -> tuple:\n    res1, res2 = await asyncio.gather(coro1, coro2)\n    return res1, res2`,
        explanation: 'asyncio.gather schedules multiple awaitables concurrently on the event loop and returns their gathered results.',
      },
    ],
    quizQuestions: [
      {
        id: 'py-85-q1',
        question: 'Why does the CPython implementation include the Global Interpreter Lock (GIL)?',
        options: [
          'To prevent memory fragmentation in 32-bit systems.',
          'To make CPython memory management and reference counting thread-safe without requiring fine-grained locks.',
          'To enforce single-core execution on modern operating systems.',
          'To prevent infinite recursion.',
        ],
        correctOptionIndex: 1,
        explanation: 'The GIL prevents race conditions on object reference counts and simplifies C-extension integration.',
      },
      {
        id: 'py-85-q2',
        question: 'Which concurrency model in Python provides true multi-core parallel execution for CPU-intensive calculations?',
        options: ['threading.Thread', 'asyncio event loop', 'multiprocessing module', 'coroutine generators'],
        correctOptionIndex: 2,
        explanation: 'The multiprocessing module spawns separate OS processes, each with its own Python interpreter and GIL, achieving true multi-core parallelism.',
      },
    ],
    revisionNotes: [
      'CPython GIL ensures only one native thread runs Python bytecode at any moment.',
      'Use ThreadPoolExecutor or asyncio for I/O-bound tasks (file I/O, network APIs).',
      'Use ProcessPoolExecutor for CPU-bound tasks (matrix math, cryptography, ML inference).',
      'Never run blocking I/O calls inside an asyncio event loop without run_in_executor.',
    ],
  },
  {
    id: 'py-86-memory-gc',
    moduleId: 'py-m8',
    moduleNumber: 8,
    moduleTitle: 'Python Interview Preparation & Problem Patterns',
    topicNumber: 86,
    title: 'Memory Management & Garbage Collection',
    language: 'python',
    level: 'Advanced',
    whyItMatters:
      'Understanding how Python allocates and frees memory prevents memory leaks in long-running services and helps answer deep systems questions.',
    explanation:
      'Python memory management operates in three tiers: (1) Reference Counting: Every Python object has a reference count (ob_refcnt in C). When the count drops to zero, memory is deallocated immediately. (2) Cyclic Garbage Collector (gc module): Reference counting cannot reclaim circular references (e.g., A references B and B references A). Python uses a generational garbage collector with 3 generations (Gen 0, 1, 2) that detects unreachable reference cycles. (3) PyMalloc: CPython allocates small objects (< 512 bytes) using an internal arena/pool/block memory allocator to avoid system-level malloc fragmentation.',
    syntaxAndStructure:
      'import sys\nimport gc\n\n# Inspect reference count (Note: sys.getrefcount adds 1 for its own argument!)\na = [1, 2, 3]\nprint(sys.getrefcount(a))  # E.g. 2 (a + argument to getrefcount)\n\n# Manual GC control\ngc.collect()               # Forces a full collection\nprint(gc.get_stats())      # Inspect generation statistics',
    codeExamples: [
      {
        title: 'Demonstrating Reference Counting and Immediate Cleanup',
        code: `import sys

class Resource:
    def __init__(self, name):
        self.name = name

    def __del__(self):
        print(f"Resource '{self.name}' destroyed deterministically!")

# Single reference
res = Resource("DatabaseSocket")
print("Initial ref count:", sys.getrefcount(res) - 1)

# Adding reference
alias = res
print("Ref count after alias:", sys.getrefcount(res) - 1)

# Removing references
del alias
print("Ref count after deleting alias:", sys.getrefcount(res) - 1)

print("Deleting final reference...")
del res
print("Done with scope.")`,
        expectedOutput: `Initial ref count: 1
Ref count after alias: 2
Ref count after deleting alias: 1
Deleting final reference...
Resource 'DatabaseSocket' destroyed deterministically!
Done with scope.`,
        explanation:
          'When the final reference `del res` executes, the object ref count reaches zero and its `__del__` destructor executes immediately.',
      },
      {
        title: 'Reference Cycle Detection with the gc Module',
        code: `import gc

class Node:
    def __init__(self, val):
        self.val = val
        self.neighbor = None

# Create circular reference
node_a = Node("A")
node_b = Node("B")
node_a.neighbor = node_b
node_b.neighbor = node_a

# Sever external references
del node_a
del node_b

# The nodes still exist in RAM due to circular references!
print("Collecting unreachable cyclic objects...")
unreachable = gc.collect()
print(f"GC successfully collected {unreachable} unreachable cyclic objects.")`,
        expectedOutput: `Collecting unreachable cyclic objects...
GC successfully collected 4 unreachable cyclic objects.`,
        explanation:
          'Cyclic reference garbage collector scans generations using a trial deletion algorithm to identify and collect unreachable isolated cycles.',
      },
    ],
    realWorldApplications: [
      'Preventing memory leaks in long-running Celery worker processes and FastAPI web services.',
      'Optimizing machine learning data loaders and batch processing pipelines.',
      'Understanding why memory is not always returned to the OS immediately after del.',
    ],
    commonMistakes: [
      'Assuming del obj immediately frees memory to the OS; it only decrements reference count. If PyMalloc holds the arena, memory remains with Python process.',
      'Relying on __del__ methods for resource cleanup instead of context managers; __del__ is non-deterministic and can inhibit GC cycle reclamation in older Python versions.',
      'Forgetting that sys.getrefcount(x) returns 1 higher than expected because passing x to getrefcount creates a temporary reference.',
    ],
    interviewRelevance:
      'Interviewers test knowledge of reference counting vs cyclic GC, generational collection (Gen 0, 1, 2), and why circular references pose memory leak risks.',
    checkpoints: [
      { id: 'py-86-cp-1', label: 'Explain how reference counting handles immediate deallocation.' },
      { id: 'py-86-cp-2', label: 'Describe how the cyclic generational garbage collector detects isolated reference cycles.' },
    ],
    practiceExercises: [
      {
        id: 'py-86-ex-1',
        title: 'Reference Count Estimator',
        difficulty: 'Beginner',
        type: 'coding',
        prompt: 'Write a function get_actual_refcount(obj) -> int that calls sys.getrefcount(obj) and subtracts 1 to account for the call parameter.',
        starterCode: 'import sys\n\ndef get_actual_refcount(obj) -> int:\n    # TODO\n    pass',
        solution: `import sys\n\ndef get_actual_refcount(obj) -> int:\n    return sys.getrefcount(obj) - 1`,
        explanation: 'sys.getrefcount passes obj as an argument, incrementing the refcount by 1 temporarily during execution.',
      },
      {
        id: 'py-86-ex-2',
        title: 'Force Garbage Collection and Count Freed',
        difficulty: 'Intermediate',
        type: 'coding',
        prompt: 'Write a function force_cleanup() -> int that calls gc.collect() and returns the number of unreachable objects collected.',
        starterCode: 'import gc\n\ndef force_cleanup() -> int:\n    # TODO\n    pass',
        solution: `import gc\n\ndef force_cleanup() -> int:\n    return gc.collect()`,
        explanation: 'gc.collect() triggers a full generation collection and returns the integer count of unreachable objects destroyed.',
      },
      {
        id: 'py-86-ex-3',
        title: 'Weakref Reference Handler',
        difficulty: 'Advanced',
        type: 'coding',
        prompt: 'Write a function make_weak_ref(obj) using weakref.ref that returns a callable weak reference which returns obj if alive or None if collected.',
        starterCode: 'import weakref\n\ndef make_weak_ref(obj):\n    # TODO\n    pass',
        solution: `import weakref\n\ndef make_weak_ref(obj):\n    return weakref.ref(obj)`,
        explanation: 'weakref creates references without incrementing the target object refcount, preventing circular reference memory leaks.',
      },
    ],
    quizQuestions: [
      {
        id: 'py-86-q1',
        question: 'What is Python\'s primary, immediate memory management mechanism for object deallocation?',
        options: ['Mark-and-Sweep', 'Reference Counting', 'Stop-the-World Tracing', 'Manual malloc/free'],
        correctOptionIndex: 1,
        explanation: 'Python immediately frees an object when its reference count drops to zero.',
      },
      {
        id: 'py-86-q2',
        question: 'Why does Python need a generational garbage collector in addition to reference counting?',
        options: [
          'Because reference counting cannot deallocate circular reference graphs (e.g. A references B, and B references A).',
          'Because reference counting is deprecated in Python 3.',
          'To compress string memory.',
          'To optimize CPU register allocation.',
        ],
        correctOptionIndex: 0,
        explanation: 'Reference cycles prevent refcounts from ever reaching zero on their own; the cyclic GC detects and collects these orphaned cycles.',
      },
    ],
    revisionNotes: [
      'Reference counting is Python\'s primary memory management system; objects are destroyed when refcount reaches 0.',
      'The cyclic GC detects unreachable reference loops using 3 generational heaps (0, 1, 2).',
      'Never rely on __del__ for mission-critical cleanup; always use context managers ("with" statements).',
      'Use the weakref module to reference objects without keeping them alive.',
    ],
  },
  {
    id: 'py-87-placement-coding-problems',
    moduleId: 'py-m8',
    moduleNumber: 8,
    moduleTitle: 'Python Interview Preparation & Problem Patterns',
    topicNumber: 87,
    title: 'High-Frequency Placement Coding Challenges in Python',
    language: 'python',
    level: 'Advanced',
    whyItMatters:
      'Technical interview coding rounds expect clean, idiomatic, optimal Python solutions using built-in libraries like collections and heapq.',
    explanation:
      'High-frequency placement coding patterns include: (1) Custom sorting with lambda keys or operator.itemgetter; (2) In-place 2D matrix rotations (transposing and reversing); (3) Interval merging using sorted start times; (4) Frequency counting and top-K elements with collections.Counter and heapq; (5) Sliding window with collections.defaultdict for substring anagrams or character frequency matching.',
    syntaxAndStructure:
      '# Interval Merging Pattern:\ndef merge_intervals(intervals):\n    intervals.sort(key=lambda x: x[0])\n    merged = []\n    for start, end in intervals:\n        if not merged or merged[-1][1] < start:\n            merged.append([start, end])\n        else:\n            merged[-1][1] = max(merged[-1][1], end)\n    return merged',
    codeExamples: [
      {
        title: 'Merge Overlapping Intervals Pattern',
        code: `def merge_intervals(intervals: list[list[int]]) -> list[list[int]]:
    if not intervals:
        return []
    # Step 1: Sort intervals by start time
    intervals.sort(key=lambda x: x[0])
    merged = [intervals[0]]

    for current in intervals[1:]:
        last_start, last_end = merged[-1]
        curr_start, curr_end = current

        if curr_start <= last_end:
            # Overlap exists: merge by extending end time
            merged[-1][1] = max(last_end, curr_end)
        else:
            # No overlap: push as new interval
            merged.append(current)

    return merged

test_intervals = [[1, 3], [2, 6], [8, 10], [15, 18]]
print("Merged Intervals:", merge_intervals(test_intervals))`,
        expectedOutput: `Merged Intervals: [[1, 6], [8, 10], [15, 18]]`,
        explanation:
          'Sorting takes O(N log N) time; the single pass merge takes O(N) time and O(N) space. Classic placement interview challenge.',
      },
      {
        title: 'Top K Frequent Elements Using Counter and Heapq',
        code: `import heapq
from collections import Counter

def top_k_frequent(nums: list[int], k: int) -> list[int]:
    count = Counter(nums)
    # heapq.nlargest takes O(N log K) time
    return [item for item, freq in heapq.nlargest(k, count.items(), key=lambda x: x[1])]

print("Top 2 frequent in [1,1,1,2,2,3]:", top_k_frequent([1, 1, 1, 2, 2, 3], 2))`,
        expectedOutput: `Top 2 frequent in [1,1,1,2,2,3]: [1, 2]`,
        explanation:
          'Combining collections.Counter with heapq.nlargest solves Top-K problems in O(N log K) time without sorting the entire array.',
      },
    ],
    realWorldApplications: [
      'Scheduling algorithms and meeting room booking conflict resolution.',
      'Analytics dashboards identifying top trending hashtags or search queries.',
      'Image processing algorithms rotating 2D image matrices in-place.',
    ],
    commonMistakes: [
      'Forgetting to sort intervals by start time before merging, resulting in incorrect merges.',
      'Using full sort O(N log N) when finding top-K elements instead of a min-heap O(N log K).',
      'Using unnecessary deep copying in matrix manipulation routines.',
    ],
    interviewRelevance:
      'These exact problem archetypes appear in Amazon, Google, Microsoft, and high-growth startup coding rounds.',
    checkpoints: [
      { id: 'py-87-cp-1', label: 'Implement interval merging in O(N log N) time.' },
      { id: 'py-87-cp-2', label: 'Use Counter and heapq to extract Top K frequent elements.' },
    ],
    practiceExercises: [
      {
        id: 'py-87-ex-1',
        title: 'Sort Strings by Length then Alphabetical',
        difficulty: 'Beginner',
        type: 'coding',
        prompt: 'Write a function sort_by_len_then_alpha(words: list[str]) -> list[str] that sorts strings primarily by length ascending, and secondarily alphabetically.',
        starterCode: 'def sort_by_len_then_alpha(words: list[str]) -> list[str]:\n    # TODO\n    pass',
        solution: `def sort_by_len_then_alpha(words: list[str]) -> list[str]:\n    return sorted(words, key=lambda w: (len(w), w))`,
        explanation: 'Returning a tuple `(len(w), w)` in the sort key function implements composite tie-breaking sorting.',
      },
      {
        id: 'py-87-ex-2',
        title: 'Rotate 2D Matrix 90 Degrees Clockwise',
        difficulty: 'Intermediate',
        type: 'coding',
        prompt: 'Write a function rotate_matrix(mat: list[list[int]]) -> list[list[int]] that rotates an N x N matrix 90 degrees clockwise by transposing then reversing each row.',
        starterCode: 'def rotate_matrix(mat: list[list[int]]) -> list[list[int]]:\n    # TODO\n    pass',
        solution: `def rotate_matrix(mat: list[list[int]]) -> list[list[int]]:\n    n = len(mat)\n    # Transpose\n    for i in range(n):\n        for j in range(i + 1, n):\n            mat[i][j], mat[j][i] = mat[j][i], mat[i][j]\n    # Reverse rows\n    for row in mat:\n        row.reverse()\n    return mat`,
        explanation: 'Transposing across main diagonal followed by reversing each row achieves in-place 90-degree clockwise rotation.',
      },
      {
        id: 'py-87-ex-3',
        title: 'Longest Substring Without Repeating Characters',
        difficulty: 'Advanced',
        type: 'coding',
        prompt: 'Write a function length_of_longest_substring(s: str) -> int using a sliding window and dictionary of last seen indices in O(N) time.',
        starterCode: 'def length_of_longest_substring(s: str) -> int:\n    # TODO\n    pass',
        solution: `def length_of_longest_substring(s: str) -> int:\n    seen = {}\n    max_len = 0\n    start = 0\n    for end, char in enumerate(s):\n        if char in seen and seen[char] >= start:\n            start = seen[char] + 1\n        seen[char] = end\n        max_len = max(max_len, end - start + 1)\n    return max_len`,
        explanation: 'Sliding window advances start pointer whenever a duplicate character inside current window is detected, achieving O(N) time.',
      },
    ],
    quizQuestions: [
      {
        id: 'py-87-q1',
        question: 'What is the optimal time complexity to find the Top K frequent elements among N items using a min-heap?',
        options: ['O(N^2)', 'O(N log N)', 'O(N log K)', 'O(K log N)'],
        correctOptionIndex: 2,
        explanation: 'Maintaining a min-heap of size K while iterating over unique elements takes O(N log K) time.',
      },
      {
        id: 'py-87-q2',
        question: 'What is the standard two-step algorithm to rotate an N x N matrix 90 degrees clockwise in-place?',
        options: [
          'Invert columns then shift rows.',
          'Transpose the matrix (swap mat[i][j] with mat[j][i]), then reverse each row.',
          'Reverse each row, then transpose the matrix.',
          'Rotate corners only.',
        ],
        correctOptionIndex: 1,
        explanation: 'Transposing followed by reversing rows rotates the matrix 90 degrees clockwise; reversing rows then transposing rotates 90 degrees counter-clockwise.',
      },
    ],
    revisionNotes: [
      'Use tuple keys in sorted(..., key=lambda x: (criteria1, criteria2)) for composite sorting.',
      'Merge intervals: sort by start time first, then compare curr[0] <= last[1].',
      'Use Counter and heapq.nlargest for O(N log K) top-K frequency problems.',
      'Sliding window with hash map handles substring and subarray bounds in O(N) time.',
    ],
  },
  {
    id: 'py-88-complexity-cheatsheet',
    moduleId: 'py-m8',
    moduleNumber: 8,
    moduleTitle: 'Python Interview Preparation & Problem Patterns',
    topicNumber: 88,
    title: 'Python Time & Space Complexity Master Matrix',
    language: 'python',
    level: 'Advanced',
    whyItMatters:
      'Interviewers evaluate candidates on time and space complexity analysis for every solution. Knowing CPython Big-O guarantees avoids suboptimal data structure choices.',
    explanation:
      'CPython data structures have distinct average and worst-case time complexities: (1) List: index access O(1), append O(1) amortized, insert/delete at index 0 O(N), slicing O(k); (2) Deque: append/popleft O(1); (3) Dict / Set: average lookup, insert, delete O(1), worst-case O(N) on pathological hash collisions; (4) Timsort (sort / sorted): O(N log N) worst-case, O(N) best-case for nearly sorted data, O(N) auxiliary space; (5) Heapq: heappush O(log N), heappop O(log N), heapify O(N).',
    syntaxAndStructure:
      '# Complexity Matrix Quick Reference:\n# List:         Index O(1)  | Append O(1)  | Pop(0) O(N) | In O(N)\n# Deque:        Append O(1) | Popleft O(1) | Index O(N)\n# Set / Dict:   Add/Put O(1)| In/Get O(1)  | Delete O(1)\n# Heapq:        Heapify O(N)| Push O(log N)| Pop O(log N)\n# Sort:         Timsort O(N log N) time | O(N) space',
    codeExamples: [
      {
        title: 'Benchmarking List pop(0) O(N) vs Deque popleft() O(1)',
        code: `from collections import deque
import time

size = 50000

# Benchmark list.pop(0) - O(N) per operation
lst = list(range(size))
t0 = time.perf_counter()
for _ in range(1000):
    lst.pop(0)
t_list = time.perf_counter() - t0

# Benchmark deque.popleft() - O(1) per operation
dq = deque(range(size))
t1 = time.perf_counter()
for _ in range(1000):
    dq.popleft()
t_deque = time.perf_counter() - t1

print(f"List pop(0) x 1000:   {t_list:.5f}s")
print(f"Deque popleft() x 1000: {t_deque:.5f}s")
print(f"Deque was approximately {t_list / max(t_deque, 1e-9):.1f}x faster!")`,
        expectedOutput: `List pop(0) x 1000:   0.00840s
Deque popleft() x 1000: 0.00008s
Deque was approximately 105.0x faster!`,
        explanation:
          'list.pop(0) shifts all remaining elements in contiguous memory (O(N)), whereas deque.popleft() unlinks a node from the head of a doubly-linked block (O(1)).',
      },
      {
        title: 'Heapify O(N) vs Repeated Heappush O(N log N)',
        code: `import heapq

# Linear time O(N) heap construction using heapify
numbers = [14, 3, 27, 8, 1, 99, 42, 6]
heapq.heapify(numbers)  # In-place Floyd's algorithm O(N)

smallest = heapq.heappop(numbers)  # O(log N)
second_smallest = heapq.heappop(numbers)

print("Heapified array representation:", numbers)
print(f"Extracted smallest: {smallest}, second smallest: {second_smallest}")`,
        expectedOutput: `Heapified array representation: [6, 8, 27, 14, 99, 42]
Extracted smallest: 1, second smallest: 3`,
        explanation:
          'Floyd\'s heapify algorithm builds a heap in O(N) linear time, which is strictly faster than inserting N elements sequentially with heappush (O(N log N)).',
      },
    ],
    realWorldApplications: [
      'Choosing optimal data structures during live competitive programming and placement rounds.',
      'Preventing performance bottlenecks in message queues and real-time processing pipelines.',
      'Accurately stating time and space complexity to FAANG interviewers.',
    ],
    commonMistakes: [
      'Using list.pop(0) to implement a FIFO queue instead of collections.deque.',
      'Checking membership with "x in my_list" (O(N)) inside a loop instead of converting to a set (O(1)).',
      'Assuming Python\'s built-in sort is Quicksort; it is Timsort (hybrid Merge/Insertion sort) with O(N) space.',
    ],
    interviewRelevance:
      'Interviewers expect candidates to state exact Big-O complexities for every data structure operation without hesitation.',
    checkpoints: [
      { id: 'py-88-cp-1', label: 'Know time complexities for list, deque, set, and dict operations.' },
      { id: 'py-88-cp-2', label: 'Understand why heapq.heapify is O(N) and Timsort space complexity is O(N).' },
    ],
    practiceExercises: [
      {
        id: 'py-88-ex-1',
        title: 'Lookup Complexity Identifier',
        difficulty: 'Beginner',
        type: 'coding',
        prompt: 'Write a function get_average_lookup_complexity(data_type: str) -> str returning "O(1)" for "set" / "dict" and "O(N)" for "list" / "tuple".',
        starterCode: 'def get_average_lookup_complexity(data_type: str) -> str:\n    # TODO\n    pass',
        solution: `def get_average_lookup_complexity(data_type: str) -> str:\n    mapping = {"set": "O(1)", "dict": "O(1)", "list": "O(N)", "tuple": "O(N)"}\n    return mapping.get(data_type.lower(), "unknown")`,
        explanation: 'Hash sets and dictionaries provide average O(1) key lookups; sequences require linear O(N) scans.',
      },
      {
        id: 'py-88-ex-2',
        title: 'Optimize List Membership Scan',
        difficulty: 'Intermediate',
        type: 'coding',
        prompt: 'Given a large query list and a target collection, write a function count_matches(queries: list, targets: list) -> int that converts targets to a set to achieve O(M + N) time instead of O(M * N).',
        starterCode: 'def count_matches(queries: list, targets: list) -> int:\n    # TODO\n    pass',
        solution: `def count_matches(queries: list, targets: list) -> int:\n    target_set = set(targets)\n    return sum(1 for q in queries if q in target_set)`,
        explanation: 'Converting to a set takes O(M) time, after which each of the N queries takes O(1) lookup.',
      },
      {
        id: 'py-88-ex-3',
        title: 'Determine Heapify vs Push Cost',
        difficulty: 'Advanced',
        type: 'coding',
        prompt: 'Write a function heap_build_cost(method: str) -> str returning "O(N)" for "heapify" and "O(N log N)" for "repeated_push".',
        starterCode: 'def heap_build_cost(method: str) -> str:\n    # TODO\n    pass',
        solution: `def heap_build_cost(method: str) -> str:\n    return "O(N)" if method.lower() == "heapify" else "O(N log N)"`,
        explanation: 'Floyds heapify operates in O(N) linear time; repeated insertion takes O(N log N).',
      },
    ],
    quizQuestions: [
      {
        id: 'py-88-q1',
        question: 'What is the time complexity of popping an element from the front of a standard Python list: `lst.pop(0)`?',
        options: ['O(1)', 'O(log N)', 'O(N)', 'O(N log N)'],
        correctOptionIndex: 2,
        explanation: 'Popping from index 0 shifts all remaining N-1 elements to the left by one position in contiguous memory, requiring O(N) time.',
      },
      {
        id: 'py-88-q2',
        question: 'What sorting algorithm does Python\'s sorted() and list.sort() use?',
        options: ['Quicksort', 'Heapsort', 'Timsort (hybrid Merge/Insertion sort)', 'Radix sort'],
        correctOptionIndex: 2,
        explanation: 'Python uses Timsort, created by Tim Peters in 2002, which is stable, adaptive, and runs in O(N log N) worst-case time.',
      },
    ],
    revisionNotes: [
      'List: index access O(1), append O(1), pop(0) O(N), search O(N).',
      'Deque: append O(1), popleft O(1), index search O(N).',
      'Set / Dict: average lookup, insertion, and deletion are O(1).',
      'heapq.heapify is O(N); Timsort is O(N log N) time and O(N) space.',
    ],
  },
  {
    id: 'py-89-readiness-assessment',
    moduleId: 'py-m8',
    moduleNumber: 8,
    moduleTitle: 'Python Interview Preparation & Problem Patterns',
    topicNumber: 89,
    title: 'Comprehensive Python Placement Readiness Assessment',
    language: 'python',
    level: 'Advanced',
    whyItMatters:
      'Synthesizing all 8 modules into an actionable self-assessment roadmap ensures you enter campus placements and company technical interviews fully prepared.',
    explanation:
      'The comprehensive readiness assessment covers all 8 domains of the AK67 Python Mastery track: (1) Fundamentals & Execution Model; (2) Data Structures & Memory Layout; (3) Functions, Functional Idioms & Closures; (4) Object-Oriented Programming & Metaclasses; (5) Advanced Language Mechanics (Generators, Iterators, Context Managers); (6) Problem Solving, Two Pointers & Sliding Windows; (7) Applied Engineering (APIs, SQLite, pytest, logging); and (8) Interview Pitfalls, Concurrency & Low-Level Design. Completing all 89 topics gives you full proficiency across core language mechanics, algorithms, and practical engineering.',
    syntaxAndStructure:
      '# 8-Module Syllabus Checklist:\n# Module 1: Fundamentals & Runtime Model (Topics 1-10)\n# Module 2: Data Structures & Built-in Collections (Topics 11-20)\n# Module 3: Functions, Lambdas & Scope (Topics 21-32)\n# Module 4: OOP, Inheritance & Dunder Methods (Topics 33-43)\n# Module 5: Advanced Python Mechanics (Topics 44-58)\n# Module 6: Problem Solving & Algorithms (Topics 59-70)\n# Module 7: Practical Applied Engineering (Topics 71-79)\n# Module 8: Interview Preparation & Pitfalls (Topics 80-89)',
    codeExamples: [
      {
        title: 'Placement Readiness Diagnostic Calculator',
        code: `def calculate_readiness_score(completed_topics: int, total_topics: int = 89) -> dict:
    pct = round((completed_topics / total_topics) * 100, 1)
    if pct >= 90:
        tier = "FAANG & Top Product Ready"
        recommendation = "Practice live mock interviews, System Design, and time management."
    elif pct >= 70:
        tier = "Placement Ready (Tier-1 IT / Startups)"
        recommendation = "Revise Advanced Mechanics (Mod 5) and Practice LLD patterns (Mod 8)."
    elif pct >= 40:
        tier = "Intermediate Foundation"
        recommendation = "Strengthen Problem Solving (Mod 6) and OOP design principles (Mod 4)."
    else:
        tier = "Foundational Stage"
        recommendation = "Focus sequentially on Modules 1, 2, and 3 before tackling algorithms."

    return {
        "percentage": pct,
        "tier": tier,
        "recommendation": recommendation
    }

diagnostic = calculate_readiness_score(89)
print(f"Readiness: {diagnostic['percentage']}% -> {diagnostic['tier']}")
print(f"Next Action: {diagnostic['recommendation']}")`,
        expectedOutput: `Readiness: 100.0% -> FAANG & Top Product Ready
Next Action: Practice live mock interviews, System Design, and time management.`,
        explanation:
          'Evaluates mastery curriculum completion and generates targeted placement recommendations.',
      },
      {
        title: 'Mock Interview Rapid-Fire Review Engine',
        code: `mock_questions = [
    ("What is the GIL and what problem does it solve?", "Protects CPython memory/refcounts; permits 1 thread on bytecode at a time."),
    ("Explain the difference between deepcopy and shallow copy.", "Shallow copies the container; deepcopy recursively duplicates nested objects."),
    ("What makes a Python object hashable?", "Immutable state, implement __hash__() and __eq__() consistent with each other."),
    ("How do you handle 50GB file processing in Python?", "Iterate over the file stream line-by-line using context manager in O(1) RAM."),
]

print("Mock Interview Review Questions:")
for idx, (question, key_point) in enumerate(mock_questions, start=1):
    print(f"{idx}. Q: {question}")
    print(f"   A: Key Concept: {key_point}")`,
        expectedOutput: `Mock Interview Review Questions:
1. Q: What is the GIL and what problem does it solve?
   A: Key Concept: Protects CPython memory/refcounts; permits 1 thread on bytecode at a time.
2. Q: Explain the difference between deepcopy and shallow copy.
   A: Key Concept: Shallow copies the container; deepcopy recursively duplicates nested objects.
3. Q: What makes a Python object hashable?
   A: Key Concept: Immutable state, implement __hash__() and __eq__() consistent with each other.
4. Q: How do you handle 50GB file processing in Python?
   A: Key Concept: Iterate over the file stream line-by-line using context manager in O(1) RAM.`,
        explanation:
          'Demonstrates high-yield summary questions for final-round revision across theoretical and practical placement requirements.',
      },
    ],
    realWorldApplications: [
      'Final revision 24-48 hours before technical campus placements.',
      'Self-diagnosing knowledge gaps across algorithms, language internals, and applied engineering.',
      'Preparing for technical Q&A during managerial and bar-raiser rounds.',
    ],
    commonMistakes: [
      'Focusing exclusively on LeetCode algorithms while ignoring language internals (GIL, memory model, packaging, testing).',
      'Memorizing syntax without understanding time and space complexity trade-offs.',
      'Cramming without active recall practice (reading code solutions instead of writing them from scratch).',
    ],
    interviewRelevance:
      'Candidates who master all 8 domains demonstrate end-to-end engineering excellence, standing out to interviewers across product and service companies alike.',
    checkpoints: [
      { id: 'py-89-cp-1', label: 'Complete self-assessment across all 8 Python Mastery modules.' },
      { id: 'py-89-cp-2', label: 'Demonstrate readiness across DSA, language internals, and applied engineering.' },
    ],
    practiceExercises: [
      {
        id: 'py-89-ex-1',
        title: 'Check Module Completion Ratio',
        difficulty: 'Beginner',
        type: 'coding',
        prompt: 'Write a function module_completion_rate(completed_count: int, total: int = 89) -> float returning round((completed_count / total) * 100, 2).',
        starterCode: 'def module_completion_rate(completed_count: int, total: int = 89) -> float:\n    # TODO\n    pass',
        solution: `def module_completion_rate(completed_count: int, total: int = 89) -> float:\n    return round((completed_count / total) * 100, 2)`,
        explanation: 'Computes exact curriculum percentage progress to 2 decimal places.',
      },
      {
        id: 'py-89-ex-2',
        title: 'Categorize Mastery Status',
        difficulty: 'Intermediate',
        type: 'coding',
        prompt: 'Write a function categorize_status(score: float) -> str returning "Distinction" for score >= 85.0, "Proficient" for score >= 70.0, "Developing" for score >= 50.0, or "Novice" otherwise.',
        starterCode: 'def categorize_status(score: float) -> str:\n    # TODO\n    pass',
        solution: `def categorize_status(score: float) -> str:\n    if score >= 85.0: return "Distinction"\n    if score >= 70.0: return "Proficient"\n    if score >= 50.0: return "Developing"\n    return "Novice"`,
        explanation: 'Categorizes readiness tier based on comprehensive quiz scores and exercise completions.',
      },
      {
        id: 'py-89-ex-3',
        title: 'Generate Revision Schedule',
        difficulty: 'Advanced',
        type: 'coding',
        prompt: 'Write a function build_revision_schedule(modules: list[str], days_left: int) -> dict[int, list[str]] that distributes module names evenly across days_left days (1-indexed).',
        starterCode: 'def build_revision_schedule(modules: list[str], days_left: int) -> dict[int, list[str]]:\n    # TODO\n    pass',
        solution: `def build_revision_schedule(modules: list[str], days_left: int) -> dict[int, list[str]]:\n    schedule = {day: [] for day in range(1, days_left + 1)}\n    for i, mod in enumerate(modules):\n        day = (i % days_left) + 1\n        schedule[day].append(mod)\n    return schedule`,
        explanation: 'Evenly distributes revision modules across remaining preparation days using round-robin modulo indexing.',
      },
    ],
    quizQuestions: [
      {
        id: 'py-89-q1',
        question: 'How many total curated topics are included in the AK67 Python Mastery Track across its 8 modules?',
        options: ['67', '75', '89', '100'],
        correctOptionIndex: 2,
        explanation: 'The AK67 Python Mastery Track consists of exactly 89 curated topics spanning 8 comprehensive modules.',
      },
      {
        id: 'py-89-q2',
        question: 'Which preparation approach is most effective according to learning science for placement interviews?',
        options: [
          'Passive reading of textbook solutions without coding.',
          'Attempt-first coding with active recall, spaced repetition, and hands-on debugging.',
          'Memorizing solutions the night before the interview.',
          'Ignoring core CS theory and focusing only on competitive programming.',
        ],
        correctOptionIndex: 1,
        explanation: 'Active recall (attempting problems before viewing solutions) and spaced repetition produce the highest long-term retention and problem-solving adaptability.',
      },
    ],
    revisionNotes: [
      'Review all 8 modules systematically: Fundamentals, Data Structures, Functions, OOP, Advanced Mechanics, DSA, Practical Engineering, and Interview Pitfalls.',
      'Active recall: attempt practice exercises first before revealing hidden solutions.',
      'Combine coding problem patterns with deep understanding of CPython internals (GIL, memory model, GC).',
      'Consistent daily practice and spaced repetition are the keys to placement excellence.',
    ],
  },
];

export const module8: MasteryModule = {
  id: 'py-m8',
  number: 8,
  title: 'Python Interview Preparation & Problem Patterns',
  description:
    'Comprehensive interview readiness: rapid-fire theory, predict-the-output challenges, live debugging exercises, Low-Level Design (LLD) scenarios, high-frequency pitfalls, GIL & concurrency deep dives, memory management, placement coding challenges, complexity cheat sheets, and the final readiness diagnostic.',
  language: 'python',
  topics: module8Topics,
  moduleAssessment: {
    id: 'py-m8-exam',
    title: 'Python Interview Preparation & Problem Patterns Milestone Assessment',
    passingScorePercentage: 70,
    questions: module8Topics.flatMap((t) => t.quizQuestions),
  },
  revisionQuestions: [
    'Explain how Python passes arguments to functions using call-by-object-reference.',
    'Why does late binding in closures cause lambdas inside loops to evaluate to the final loop value?',
    'How do you implement an O(1) LRU Cache in Python using collections.OrderedDict?',
    'What is the Global Interpreter Lock (GIL) and how does multiprocessing bypass it for CPU-bound tasks?',
    'Explain how Python deallocates memory using reference counting and generational cyclic garbage collection.',
  ],
};
