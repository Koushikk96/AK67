import { MasteryTopic, MasteryModule } from '@/types/mastery';

export const module3Topics: MasteryTopic[] = [
  {
    id: 'py-21-function-basics',
    moduleId: 'py-m3',
    moduleNumber: 3,
    moduleTitle: 'Functions',
    topicNumber: 21,
    title: 'Function Definition, Invocation & Docstrings',
    language: 'python',
    level: 'Beginner',
    whyItMatters:
      'Functions are fundamental units of decomposition. Proper function structure, clean naming, type hints, and Sphinx/Google-style docstrings are standard requirements in software engineering.',
    explanation:
      'Functions in Python are defined with the `def` keyword, followed by the function name, parameter list, and a colon `:`. If no return statement is executed, Python implicitly returns `None`. Docstrings ("""...""") placed immediately beneath the header describe the function\'s parameters, return type, and raised exceptions, accessible via `help(func)` or `func.__doc__`. Functions are first-class citizens in Python: they can be assigned to variables, passed as arguments, and returned from other functions.',
    syntaxAndStructure:
      'def function_name(param1: type, param2: type = default) -> return_type:\n    """\n    Brief summary of function behavior.\n    \n    Args:\n        param1: Description\n    Returns:\n        Description of return value\n    """\n    return result',
    codeExamples: [
      {
        title: 'Function Definition with Type Annotations and Docstrings',
        code: `def calculate_bmi(weight_kg: float, height_m: float) -> tuple[float, str]:
    """
    Computes Body Mass Index (BMI) and health category.

    Args:
        weight_kg: Weight in kilograms (e.g. 70.0)
        height_m: Height in meters (e.g. 1.75)

    Returns:
        A tuple of (bmi_value, category_string)
    """
    if height_m <= 0:
        raise ValueError("Height must be greater than zero.")
    
    bmi = round(weight_kg / (height_m ** 2), 2)
    category = (
        "Underweight" if bmi < 18.5
        else "Normal weight" if bmi < 25.0
        else "Overweight" if bmi < 30.0
        else "Obese"
    )
    return bmi, category

val, status = calculate_bmi(70.0, 1.75)
print(f"BMI: {val} -> {status}")
print("Docstring snippet:", calculate_bmi.__doc__.strip().splitlines()[0])`,
        expectedOutput: `BMI: 22.86 -> Normal weight
Docstring snippet: Computes Body Mass Index (BMI) and health category.`,
        explanation: 'Type hints improve IDE autocompletion and static analysis without runtime performance overhead.',
      },
      {
        title: 'Functions as First-Class Objects',
        code: `def square(x: int) -> int:
    return x * x

def cube(x: int) -> int:
    return x * x * x

# Storing functions in a dictionary mapping:
math_operations = {"sq": square, "cb": cube}

print("Square via dict:", math_operations["sq"](6))
print("Cube via dict:", math_operations["cb"](3))`,
        expectedOutput: `Square via dict: 36
Cube via dict: 27`,
        explanation: 'Because functions are first-class objects, they can be stored in data structures and invoked dynamically.',
      },
    ],
    realWorldApplications: [
      'Encapsulating business rules and data transformations.',
      'Dispatch tables and strategy pattern implementations in backend services.',
    ],
    commonMistakes: [
      'Missing the `return` statement, causing caller to receive `None` unexpectedly.',
      'Modifying global variables inside functions without understanding variable scoping.',
    ],
    interviewRelevance:
      'Interviewers evaluate candidate code structure, parameter naming, and modular separation of concerns.',
    checkpoints: [
      { id: 'py-21-cp-1', label: 'Use def with type annotations and docstrings.' },
      { id: 'py-21-cp-2', label: 'Understand functions as first-class objects.' },
    ],
    practiceExercises: [
      {
        id: 'py-21-ex-1',
        title: 'Validate Email Format',
        difficulty: 'Beginner',
        type: 'coding',
        prompt: 'Write `validate_email(email: str) -> bool` returning True if email contains exactly one "@" and ends with a valid domain containing a "."',
        starterCode: 'def validate_email(email: str) -> bool:\n    pass',
        solution: `def validate_email(email: str) -> bool:
    if email.count("@") != 1:
        return False
    user, domain = email.split("@")
    return len(user) > 0 and "." in domain and not domain.startswith(".") and not domain.endswith(".")

print(validate_email("candidate@ak67.local"))  # True
print(validate_email("invalid@@domain.com"))   # False`,
        explanation: 'Standard validation function verifying format constraints.',
      },
      {
        id: 'py-21-ex-2',
        title: 'Function Dispatch Table',
        difficulty: 'Intermediate',
        type: 'coding',
        prompt: 'Implement an arithmetic calculator using a dictionary dispatch table instead of if-elif chains.',
        starterCode: 'def calculate(op: str, a: float, b: float) -> float:\n    pass',
        solution: `def calculate(op: str, a: float, b: float) -> float:
    ops = {
        "+": lambda x, y: x + y,
        "-": lambda x, y: x - y,
        "*": lambda x, y: x * y,
        "/": lambda x, y: x / y if y != 0 else float("nan"),
    }
    if op not in ops:
        raise ValueError(f"Unknown operation: {op}")
    return ops[op](a, b)

print(calculate("+", 10, 5))  # 15.0
print(calculate("*", 4, 3))   # 12.0`,
        explanation: 'Dispatch tables replace multi-branch conditionals with $O(1)$ key lookups.',
      },
      {
        id: 'py-21-ex-3',
        title: 'Pipeline Function Chaining',
        difficulty: 'Advanced',
        type: 'coding',
        prompt: 'Write a pipeline executor `apply_pipeline(data, *funcs)` that passes the result of each function to the next.',
        starterCode: 'def apply_pipeline(data, *funcs):\n    pass',
        solution: `def apply_pipeline(data, *funcs):
    result = data
    for fn in funcs:
        result = fn(result)
    return result

# Pipeline: strip -> lowercase -> split
print(apply_pipeline("  HELLO WORLD  ", str.strip, str.lower, str.split))  # ['hello', 'world']`,
        explanation: 'Demonstrates functional pipeline composition passing intermediate outputs.',
      },
    ],
    quizQuestions: [
      {
        id: 'py-21-q1',
        question: 'What is the return value of a Python function that does not contain an explicit return statement?',
        options: ['0', 'None', 'False', 'Raises ReturnError'],
        correctOptionIndex: 1,
        explanation: 'In Python, functions implicitly return the singleton object None when execution falls off the end without a return.',
      },
      {
        id: 'py-21-q2',
        question: 'What does the term "first-class citizen" mean when applied to Python functions?',
        options: [
          'Functions execute with highest CPU priority',
          'Functions can be treated like any other object (passed as args, assigned to variables, returned)',
          'Functions cannot be modified at runtime',
          'Functions must be defined inside classes',
        ],
        correctOptionIndex: 1,
        explanation: 'First-class objects can be assigned to names, stored in data structures, passed as parameters, and returned from functions.',
      },
    ],
    revisionNotes: [
      'Functions return None if no explicit return is provided.',
      'Type annotations: def func(a: int) -> str: document contracts.',
      'Functions are first-class objects in Python.',
    ],
  },
  {
    id: 'py-22-parameters-arguments',
    moduleId: 'py-m3',
    moduleNumber: 3,
    moduleTitle: 'Functions',
    topicNumber: 22,
    title: 'Parameters vs Arguments (Positional, Keyword & Defaults)',
    language: 'python',
    level: 'Beginner',
    whyItMatters:
      'Understanding how Python binds caller arguments to function parameters eliminates syntax errors and enables self-documenting, flexible API design.',
    explanation:
      'A parameter is the variable in the function definition header; an argument is the actual value passed during invocation. Python allows passing arguments positionally (in sequence) or by keyword (name=value). When mixing both, positional arguments MUST precede keyword arguments. Default values specify fallbacks when arguments are omitted by the caller.',
    syntaxAndStructure:
      'def send_email(to: str, subject: str = "Notification", urgent: bool = False):\n    pass\n\n# Valid calls:\nsend_email("test@ak67.local")\nsend_email("test@ak67.local", "Urgent Alert", True)\nsend_email("test@ak67.local", urgent=True) # keyword override',
    codeExamples: [
      {
        title: 'Mixing Positional and Keyword Arguments',
        code: `def create_user(username: str, role: str = "Student", active: bool = True):
    return {"user": username, "role": role, "is_active": active}

# 1. Fully positional:
print(create_user("Aarav", "Admin", True))

# 2. Named keyword arguments (order does not matter!):
print(create_user("Diya", active=False, role="Instructor"))

# 3. Default fallback:
print(create_user("Kavya"))`,
        expectedOutput: `{'user': 'Aarav', 'role': 'Admin', 'is_active': True}
{'user': 'Diya', 'role': 'Instructor', 'is_active': False}
{'user': 'Kavya', 'role': 'Student', 'is_active': True}`,
        explanation: 'Keyword arguments can be provided in any order and clarify what boolean flags represent.',
      },
      {
        title: 'Positional Arguments Must Precede Keyword Arguments',
        code: `def display_point(x: int, y: int, label: str = "Point"):
    print(f"{label}: ({x}, {y})")

# Valid: positional first, keyword after
display_point(10, 20, label="Origin")

# INVALID syntax: keyword followed by positional
# display_point(x=10, 20) -> SyntaxError: positional argument follows keyword argument`,
        expectedOutput: `Origin: (10, 20)`,
        explanation: 'Python syntax enforces that positional arguments must always precede keyword arguments.',
      },
    ],
    realWorldApplications: [
      'Designing flexible library APIs where configuration parameters have sensible defaults.',
      'Logging calls with optional metadata flags.',
    ],
    commonMistakes: [
      'Placing positional arguments after keyword arguments in calls (`func(x=1, 2)` raises `SyntaxError`).',
      'Placing non-default parameters after default parameters in definitions (`def f(a=1, b)` is illegal).',
    ],
    interviewRelevance:
      'Common in output-prediction and parameter binding questions.',
    checkpoints: [
      { id: 'py-22-cp-1', label: 'All positional arguments must precede keyword arguments.' },
      { id: 'py-22-cp-2', label: 'Parameters with defaults must come after parameters without defaults.' },
    ],
    practiceExercises: [
      {
        id: 'py-22-ex-1',
        title: 'Configurable Box Volume',
        difficulty: 'Beginner',
        type: 'coding',
        prompt: 'Write `calculate_volume(length, width=1, height=1)` and test default vs keyword calls.',
        starterCode: 'def calculate_volume(length, width=1, height=1):\n    pass',
        solution: `def calculate_volume(length: float, width: float = 1.0, height: float = 1.0) -> float:
    return length * width * height

print(calculate_volume(5))            # 5.0 (cube/line)
print(calculate_volume(5, 2))         # 10.0
print(calculate_volume(5, height=4))  # 20.0`,
        explanation: 'Demonstrates optional arguments with keyword overrides.',
      },
      {
        id: 'py-22-ex-2',
        title: 'Fix Parameter Order SyntaxError',
        difficulty: 'Intermediate',
        type: 'debugging',
        prompt: 'Fix the SyntaxError in definition: `def connect(host="localhost", port, timeout=30): pass`',
        starterCode: '# Fix parameter ordering',
        solution: `def connect(port: int, host: str = "localhost", timeout: int = 30):
    return f"Connecting to {host}:{port} with timeout={timeout}s"

print(connect(8080))`,
        explanation: 'Non-default parameters (port) must precede default parameters (host, timeout).',
      },
      {
        id: 'py-22-ex-3',
        title: 'Keyword Argument Validator',
        difficulty: 'Advanced',
        type: 'coding',
        prompt: 'Write a wrapper that validates all passed keyword arguments against an allowed whitelist of options.',
        starterCode: 'def configure(**kwargs):\n    pass',
        solution: `def configure(**kwargs):
    allowed = {"theme", "font_size", "autosave"}
    for k in kwargs:
        if k not in allowed:
            raise ValueError(f"Invalid configuration setting: {k}")
    return kwargs

print(configure(theme="dark", autosave=True))`,
        explanation: 'Protects APIs from accepting unsupported arbitrary kwargs.',
      },
    ],
    quizQuestions: [
      {
        id: 'py-22-q1',
        question: 'Which of the following function headers will cause a SyntaxError in Python?',
        options: [
          'def func(a, b=2, c=3):',
          'def func(a, b, c=3):',
          'def func(a=1, b, c=3):',
          'def func(a, b, c):',
        ],
        correctOptionIndex: 2,
        explanation: 'Non-default arguments cannot follow default arguments; def func(a=1, b, c=3) raises SyntaxError.',
      },
      {
        id: 'py-22-q2',
        question: 'What is printed by: def f(a, b): return a - b; print(f(b=10, a=30))?',
        options: ['-20', '20', 'Raises TypeError', '10'],
        correctOptionIndex: 1,
        explanation: 'When passing by keyword, argument ordering does not matter; a is bound to 30 and b to 10, returning 30 - 10 = 20.',
      },
    ],
    revisionNotes: [
      'Parameters are in definitions; arguments are in invocations.',
      'Positional arguments MUST precede keyword arguments.',
      'Non-default parameters cannot follow default parameters.',
    ],
  },
  {
    id: 'py-23-return-values',
    moduleId: 'py-m3',
    moduleNumber: 3,
    moduleTitle: 'Functions',
    topicNumber: 23,
    title: 'Return Values & Multiple Value Tuple Unpacking',
    language: 'python',
    level: 'Beginner',
    whyItMatters:
      'Unlike C++ or Java where returning multiple values requires a struct, class, or output pointers, Python natively supports returning comma-separated values unpacked into multiple variables.',
    explanation:
      'A `return` statement terminates function execution and passes the result back to the caller. Returning multiple values separated by commas (e.g. `return a, b, c`) automatically constructs an immutable tuple. Callers can unpack these values directly (`x, y, z = get_values()`). Returning `None` explicitly signals absence of a value (similar to null/nil).',
    syntaxAndStructure:
      'def divide_and_remainder(a: int, b: int) -> tuple[int, int]:\n    return a // b, a % b  # Automatic tuple packing\n\n# Unpacking at callsite:\nquotient, remainder = divide_and_remainder(17, 5)',
    codeExamples: [
      {
        title: 'Returning Multiple Values and Unpacking',
        code: `def get_circle_stats(radius: float) -> tuple[float, float]:
    import math
    circumference = 2 * math.pi * radius
    area = math.pi * (radius ** 2)
    return round(circumference, 2), round(area, 2)

# Unpacking multiple return values:
c, a = get_circle_stats(5.0)
print(f"Circumference: {c}, Area: {a}")

# Receiving as a single tuple:
stats = get_circle_stats(10.0)
print("Stats tuple:", stats, "Type:", type(stats))`,
        expectedOutput: `Circumference: 31.42, Area: 78.54
Stats tuple: (62.83, 314.16) Type: <class 'tuple'>`,
        explanation: 'Returning comma-separated values creates a tuple that can be destructured immediately or preserved as a single tuple.',
      },
      {
        title: 'Early Returns as Guard Clauses',
        code: `def find_first_even(nums: list[int]) -> int | None:
    for n in nums:
        if n % 2 == 0:
            return n  # Early exit on first match!
    return None

print("First even in [1, 3, 5, 8, 9]:", find_first_even([1, 3, 5, 8, 9]))
print("First even in [1, 3, 5]:", find_first_even([1, 3, 5]))`,
        expectedOutput: `First even in [1, 3, 5, 8, 9]: 8
First even in [1, 3, 5]: None`,
        explanation: 'Early returns avoid unnecessary iterations and unnecessary flag variables.',
      },
    ],
    realWorldApplications: [
      'Returning status codes and payload data simultaneously from API handlers.',
      'Returning min and max values in $O(n)$ search passes.',
    ],
    commonMistakes: [
      'Unpacking with mismatched variable counts (`a, b = get_three_values()` raises `ValueError: too many values to unpack`).',
      'Forgetting that `return` without an expression returns `None`.',
    ],
    interviewRelevance:
      'Standard Python idiom used in binary search (`left, right = search()`) and tree traversals.',
    checkpoints: [
      { id: 'py-23-cp-1', label: 'Understand automatic tuple packing of comma-separated returns.' },
      { id: 'py-23-cp-2', label: 'Use None to indicate missing or empty return states.' },
    ],
    practiceExercises: [
      {
        id: 'py-23-ex-1',
        title: 'Min, Max, and Average Calculator',
        difficulty: 'Beginner',
        type: 'coding',
        prompt: 'Write `get_summary_stats(numbers: list[float]) -> tuple[float, float, float]` returning (min, max, avg).',
        starterCode: 'def get_summary_stats(numbers: list[float]):\n    pass',
        solution: `def get_summary_stats(numbers: list[float]) -> tuple[float, float, float]:
    if not numbers:
        raise ValueError("List cannot be empty")
    return min(numbers), max(numbers), sum(numbers) / len(numbers)

low, high, avg = get_summary_stats([10.0, 20.0, 30.0, 40.0])
print(f"Low: {low}, High: {high}, Avg: {avg}")`,
        explanation: 'Returns a 3-tuple destructured cleanly by the caller.',
      },
      {
        id: 'py-23-ex-2',
        title: 'Handle Variable Return Count',
        difficulty: 'Intermediate',
        type: 'output_prediction',
        prompt: 'What happens when running: `a, b = (1, 2, 3)`?',
        solution: 'Raises `ValueError: too many values to unpack (expected 2)`.',
        explanation: 'Sequence unpacking requires the number of targets on the LHS to match sequence length unless a starred variable is used.',
      },
      {
        id: 'py-23-ex-3',
        title: 'Two Sum Index Pair Return',
        difficulty: 'Advanced',
        type: 'coding',
        prompt: 'Return tuple of two indices summing to target using hash map, or None if no pair exists.',
        starterCode: 'def two_sum(nums: list[int], target: int) -> tuple[int, int] | None:\n    pass',
        solution: `def two_sum(nums: list[int], target: int) -> tuple[int, int] | None:
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return seen[complement], i
        seen[num] = i
    return None

print(two_sum([2, 7, 11, 15], 9))  # (0, 1)`,
        explanation: 'Returns the index pair tuple in optimal $O(n)$ time.',
      },
    ],
    quizQuestions: [
      {
        id: 'py-23-q1',
        question: 'What is the actual type of object returned when a function executes: return 10, 20, 30?',
        options: ['list', 'tuple', 'set', 'dict'],
        correctOptionIndex: 1,
        explanation: 'Python wraps comma-separated values into a tuple automatically.',
      },
      {
        id: 'py-23-q2',
        question: 'What error occurs if you write: x, y = (10, 20, 30)?',
        options: [
          'ValueError: too many values to unpack (expected 2)',
          'TypeError: cannot unpack tuple',
          'IndexError: tuple index out of range',
          'SyntaxError',
        ],
        correctOptionIndex: 0,
        explanation: 'Unpacking a 3-element tuple into 2 variables causes a ValueError at runtime.',
      },
    ],
    revisionNotes: [
      'Multiple comma-separated return values are packed as a tuple.',
      'Unpacking requires exact variable count match (or use *rest).',
      'Use guard clauses for early returns to improve readability.',
    ],
  },
  {
    id: 'py-24-mutable-default-args',
    moduleId: 'py-m3',
    moduleNumber: 3,
    moduleTitle: 'Functions',
    topicNumber: 24,
    title: 'Default Arguments & The Mutable Default Argument Trap',
    language: 'python',
    level: 'Intermediate',
    whyItMatters:
      'The "mutable default argument" bug (`def append_to(item, target=[])`) is the classic Python interview trap. Default arguments are evaluated ONCE at function definition time, NOT at each call.',
    explanation:
      'In Python, default parameter expressions are evaluated once when the `def` statement is compiled, creating a single persistent object bound to the function\'s `__defaults__` tuple. If a mutable object (like a list or dict) is used as a default argument, all subsequent calls that omit the argument share and mutate that SAME object across invocations. The idiomatic fix is to set the default to `None` and initialize the new container inside the function body.',
    syntaxAndStructure:
      '# THE DANGEROUS TRAP:\ndef bad_append(item, target=[]):\n    target.append(item)\n    return target\n\n# THE IDIOMATIC PYTHONIC FIX:\ndef good_append(item, target=None):\n    if target is None:\n        target = []\n    target.append(item)\n    return target',
    codeExamples: [
      {
        title: 'Demonstrating the Mutable Default Argument Trap',
        code: `# Flawed function using mutable list default:
def register_user(username: str, tags: list = []):
    tags.append(username)
    return tags

user1_tags = register_user("Alice")
print("User 1 tags:", user1_tags)

user2_tags = register_user("Bob")  # tags was NOT passed!
print("User 2 tags (UNEXPECTED BUG!):", user2_tags)
print("Are user1_tags and user2_tags the same object?", user1_tags is user2_tags)`,
        expectedOutput: `User 1 tags: ['Alice']
User 2 tags (UNEXPECTED BUG!): ['Alice', 'Bob']
Are user1_tags and user2_tags the same object? True`,
        explanation:
          'Because tags defaults to the exact same list instance stored in register_user.__defaults__, Bob was appended to Alice\'s list!',
      },
      {
        title: 'The None Sentinel Pattern (Idiomatic Solution)',
        code: `def safe_register_user(username: str, tags: list | None = None) -> list:
    if tags is None:
        tags = []  # Creates a fresh, independent list for this call!
    tags.append(username)
    return tags

print("Call 1:", safe_register_user("Alice"))
print("Call 2:", safe_register_user("Bob"))
print("Call 3 (with custom list):", safe_register_user("Charlie", ["admin", "staff"]))`,
        expectedOutput: `Call 1: ['Alice']
Call 2: ['Bob']
Call 3 (with custom list): ['admin', 'staff', 'Charlie']`,
        explanation: 'Using None as a sentinel guarantees that an independent list is allocated in heap memory every time tags is omitted.',
      },
    ],
    realWorldApplications: [
      'Preventing data leaks between sequential HTTP requests in web applications.',
      'Writing correct factory functions and class constructors.',
    ],
    commonMistakes: [
      'Using `def __init__(self, items=[])` in class constructors, causing all class instances to share a single items list!',
      'Using `def query(params={})` in database query functions, causing queries to leak previous parameters.',
    ],
    interviewRelevance:
      'One of the top 3 most frequently asked Python-specific interview questions across product and service companies.',
    checkpoints: [
      { id: 'py-24-cp-1', label: 'Default parameter expressions evaluate once at def compilation time.' },
      { id: 'py-24-cp-2', label: 'Always use None as default for mutable arguments (lists, dicts, sets).' },
    ],
    practiceExercises: [
      {
        id: 'py-24-ex-1',
        title: 'Fix the Constructor Bug',
        difficulty: 'Beginner',
        type: 'debugging',
        prompt: 'Fix the shared list bug in: `class ShoppingCart: def __init__(self, items=[]): self.items = items`',
        starterCode: 'class ShoppingCart:\n    def __init__(self, items=[]):\n        self.items = items',
        solution: `class ShoppingCart:
    def __init__(self, items: list | None = None):
        self.items = items[:] if items is not None else []

cart1 = ShoppingCart()
cart1.items.append("Apple")
cart2 = ShoppingCart()
print("Cart 2 items:", cart2.items)  # []`,
        explanation: 'Using None sentinel and copying passed items ensures complete instance state isolation.',
      },
      {
        id: 'py-24-ex-2',
        title: 'Inspect __defaults__ Introspection',
        difficulty: 'Intermediate',
        type: 'coding',
        prompt: 'Define a function with mutable default and inspect its `__defaults__` attribute after multiple calls.',
        starterCode: 'def test_fn(x, lst=[]):\n    pass\n# Inspect test_fn.__defaults__',
        solution: `def test_fn(x, lst=[]):
    lst.append(x)
    return lst

print("Before calls:", test_fn.__defaults__)
test_fn(1)
test_fn(2)
print("After calls:", test_fn.__defaults__)  # ([1, 2],)`,
        explanation: '__defaults__ holds the live tuple of default argument objects stored directly on the function object.',
      },
      {
        id: 'py-24-ex-3',
        title: 'Safe Cache Decorator with None Default',
        difficulty: 'Advanced',
        type: 'coding',
        prompt: 'Write a memoized fibonacci function where memo dictionary defaults safely using the None sentinel.',
        starterCode: 'def fib(n: int, memo=None) -> int:\n    pass',
        solution: `def fib(n: int, memo: dict | None = None) -> int:
    if memo is None:
        memo = {}
    if n in memo:
        return memo[n]
    if n <= 1:
        return n
    memo[n] = fib(n - 1, memo) + fib(n - 2, memo)
    return memo[n]

print("Fib(10):", fib(10))  # 55`,
        explanation: 'Prevents memo dictionary pollution between separate top-level calls while sharing memo within recursive tree.',
      },
    ],
    quizQuestions: [
      {
        id: 'py-24-q1',
        question: 'When are default argument expressions evaluated in Python?',
        options: [
          'Every time the function is called',
          'Once when the function definition is executed (at compile/load time)',
          'Only when the argument is omitted by the caller',
          'At Python interpreter shutdown',
        ],
        correctOptionIndex: 1,
        explanation: 'Python evaluates default argument expressions once when the def statement executes. That single default object is reused across all calls.',
      },
      {
        id: 'py-24-q2',
        question: 'What is the recommended idiom in Python for a parameter that should default to an empty list?',
        options: [
          'def func(param: list = []):',
          'def func(param: list = list()):',
          'def func(param: list | None = None): if param is None: param = []',
          'def func(param: list = copy([])):',
        ],
        correctOptionIndex: 2,
        explanation: 'Setting default to None and instantiating a fresh list inside the body is the PEP 8 and Pythonic standard.',
      },
    ],
    revisionNotes: [
      'Default arguments evaluate once at function definition time.',
      'Never use mutable objects ([], {}, set()) as default parameters.',
      'Use the None sentinel pattern: if param is None: param = [].',
    ],
  },
  {
    id: 'py-25-keyword-positional-only',
    moduleId: 'py-m3',
    moduleNumber: 3,
    moduleTitle: 'Functions',
    topicNumber: 25,
    title: 'Keyword-Only (*) & Positional-Only (/) Arguments',
    language: 'python',
    level: 'Intermediate',
    whyItMatters:
      'Python allows developers to mandate whether arguments must be passed positionally or by keyword. Modern libraries (FastAPI, PyTorch, dataclasses) rely heavily on keyword-only arguments to eliminate configuration ambiguity.',
    explanation:
      'Python provides special markers in parameter lists:\n1. `/` (PEP 570, Python 3.8+): Parameters before `/` are **positional-only**; callers CANNOT pass them by keyword name.\n2. `*` (PEP 3102): Parameters after `*` are **keyword-only**; callers MUST specify their keyword names.\nThis prevents fragile API dependencies on parameter names (positional-only) and prevents accidental misplaced boolean/config flags (keyword-only).',
    syntaxAndStructure:
      'def api_function(pos_only_1, pos_only_2, /, standard_arg, *, key_only_1, key_only_2="default"):\n    pass\n\n# pos_only_1, pos_only_2: CANNOT be passed as pos_only_1=val\n# standard_arg: Can be passed positionally or by keyword\n# key_only_1: MUST be passed as key_only_1=val',
    codeExamples: [
      {
        title: 'Keyword-Only Parameters for Clarity',
        code: `# Mandating keyword-only flags prevents ambiguous boolean parameters:
def connect_database(url: str, *, timeout: int = 30, retry: bool = True):
    print(f"Connecting to {url} (timeout={timeout}s, retry={retry})")

# Valid call:
connect_database("postgres://ak67:5432/db", timeout=10, retry=False)

# INVALID call: connect_database("postgres://...", 10, False)
# Raises TypeError: connect_database() takes 1 positional argument but 3 were given`,
        expectedOutput: `Connecting to postgres://ak67:5432/db (timeout=10s, retry=False)`,
        explanation: 'The bare asterisk * forces all following parameters (timeout, retry) to be explicitly named by the caller.',
      },
      {
        title: 'Positional-Only Parameters (Python 3.8+ / marker)',
        code: `# pow(x, y, /) in CPython is positional-only
def custom_divmod(a: int, b: int, /) -> tuple[int, int]:
    return a // b, a % b

# Valid:
print("Divmod(14, 3):", custom_divmod(14, 3))

# Calling with keyword custom_divmod(a=14, b=3) raises TypeError:
# TypeError: custom_divmod() got some positional-only arguments passed as keyword arguments: 'a, b'`,
        expectedOutput: `Divmod(14, 3): (4, 2)`,
        explanation: 'Parameters preceding / cannot be called by keyword name, allowing library authors to rename parameters later without breaking caller code.',
      },
    ],
    realWorldApplications: [
      'Building robust library APIs (e.g. `min(a, b, *, key=...)` where `key` is keyword-only).',
      'Preventing silent parameter swap bugs when boolean flags have the same type.',
    ],
    commonMistakes: [
      'Trying to pass a keyword-only argument positionally (`TypeError: takes N positional arguments but M were given`).',
      'Trying to pass a positional-only argument with its name (`TypeError: got positional-only arguments passed as keyword`).',
    ],
    interviewRelevance:
      'Modern Python feature asked in SDE-1 interviews to test knowledge of modern Python 3.8+ language enhancements.',
    checkpoints: [
      { id: 'py-25-cp-1', label: 'Parameters before / are positional-only.' },
      { id: 'py-25-cp-2', label: 'Parameters after * are keyword-only.' },
    ],
    practiceExercises: [
      {
        id: 'py-25-ex-1',
        title: 'Enforce Keyword-Only Flags',
        difficulty: 'Beginner',
        type: 'coding',
        prompt: 'Create a function `format_currency(amount, *, symbol="$", decimals=2)` enforcing keyword specification for formatting flags.',
        starterCode: 'def format_currency(amount, *, symbol="$", decimals=2):\n    pass',
        solution: `def format_currency(amount: float, *, symbol: str = "\$", decimals: int = 2) -> str:
    return f"{symbol}{amount:.{decimals}f}"

print(format_currency(123.456, decimals=2))
print(format_currency(99.0, symbol="€"))`,
        explanation: 'Callers must explicitly specify decimals= or symbol= if they want to override defaults.',
      },
      {
        id: 'py-25-ex-2',
        title: 'Combine Positional-Only and Keyword-Only',
        difficulty: 'Intermediate',
        type: 'coding',
        prompt: 'Define `transfer(source, target, /, amount, *, notify=True)` demonstrating both / and *.',
        starterCode: 'def transfer(source, target, /, amount, *, notify=True):\n    pass',
        solution: `def transfer(source: str, target: str, /, amount: float, *, notify: bool = True):
    return f"Transferred \${amount} from {source} to {target} (Notify: {notify})"

print(transfer("Acc1", "Acc2", 500.0, notify=False))
print(transfer("Acc1", "Acc2", amount=250.0))`,
        explanation: 'source and target are positional-only; amount is standard; notify is keyword-only.',
      },
      {
        id: 'py-25-ex-3',
        title: 'Signature Analyzer',
        difficulty: 'Advanced',
        type: 'coding',
        prompt: 'Use `inspect.signature` to inspect parameter kinds (POSITIONAL_ONLY, KEYWORD_ONLY).',
        starterCode: 'import inspect\ndef sample(a, /, b, *, c):\n    pass\n# Inspect signature',
        solution: `import inspect

def sample(a, /, b, *, c):
    pass

sig = inspect.signature(sample)
for name, param in sig.parameters.items():
    print(f"{name}: {param.kind.name}")`,
        explanation: 'Demonstrates introspecting Python parameter kinds programmatically.',
      },
    ],
    quizQuestions: [
      {
        id: 'py-25-q1',
        question: 'In the function def f(a, b, /, c, *, d): which parameters are keyword-only?',
        options: ['a and b', 'c only', 'd only', 'c and d'],
        correctOptionIndex: 2,
        explanation: 'Only parameters defined after the bare asterisk * are keyword-only; here, that is parameter d.',
      },
      {
        id: 'py-25-q2',
        question: 'What happens if a caller executes f(a=10, 20) on def f(a, b, /): pass?',
        options: [
          'SyntaxError: positional argument follows keyword argument',
          'TypeError: got positional-only arguments passed as keyword',
          'Executes successfully',
          'ValueError',
        ],
        correctOptionIndex: 0,
        explanation: 'Before checking positional-only rules, Python\'s parser rejects any call where a positional argument follows a keyword argument with a SyntaxError.',
      },
    ],
    revisionNotes: [
      'Parameters before / are positional-only (no name=val in calls).',
      'Parameters after * are keyword-only (must use name=val in calls).',
      'Combines best practices for API clarity and stability.',
    ],
  },
  {
    id: 'py-26-args-kwargs',
    moduleId: 'py-m3',
    moduleNumber: 3,
    moduleTitle: 'Functions',
    topicNumber: 26,
    title: 'Variable-Length Arguments: *args and **kwargs',
    language: 'python',
    level: 'Beginner',
    whyItMatters:
      'Writing reusable wrappers, decorators, and generic utilities requires accepting arbitrary positional and keyword arguments. `*args` and `**kwargs` are the cornerstone of Python decorators and object inheritance.',
    explanation:
      '`*args` collects arbitrary extra positional arguments into a **tuple**. `**kwargs` collects arbitrary extra keyword arguments into a **dictionary**. In function calls, the unpack operators `*` and `**` perform the reverse operation: unpacking lists/tuples into positional arguments and dictionaries into keyword arguments. The names `args` and `kwargs` are conventions; the asterisk (`*` and `**`) is the actual syntactic operator.',
    syntaxAndStructure:
      '# Definition:\ndef wrapper(*args, **kwargs):\n    # args is tuple of positional values\n    # kwargs is dict of keyword pairs\n    print("Args:", args)\n    print("Kwargs:", kwargs)\n\n# Forwarding:\ndef logger(func):\n    def inner(*args, **kwargs):\n        return func(*args, **kwargs) # Forwarding unpacking\n    return inner',
    codeExamples: [
      {
        title: 'Collecting Arbitrary Arguments with *args and **kwargs',
        code: `def build_query(table: str, *columns, **filters) -> str:
    cols_str = ", ".join(columns) if columns else "*"
    conditions = [f"{k} = '{v}'" for k, v in filters.items()]
    where_str = f" WHERE {' AND '.join(conditions)}" if conditions else ""
    return f"SELECT {cols_str} FROM {table}{where_str};"

print(build_query("users", "id", "name", "email", status="active", role="admin"))
print(build_query("products", category="books"))`,
        expectedOutput: `SELECT id, name, email FROM users WHERE status = 'active' AND role = 'admin';
SELECT * FROM products WHERE category = 'books';`,
        explanation: '*columns gathers ("id", "name", "email") as a tuple; **filters gathers {"status": "active", "role": "admin"} as a dictionary.',
      },
      {
        title: 'Argument Unpacking in Function Calls',
        code: `def greet(first: str, last: str, age: int):
    print(f"Hello {first} {last}, age {age}")

person_tuple = ("Aarav", "Sharma", 21)
person_dict = {"first": "Diya", "last": "Patel", "age": 22}

# Unpacking tuple with *
greet(*person_tuple)

# Unpacking dictionary with **
greet(**person_dict)`,
        expectedOutput: `Hello Aarav Sharma, age 21
Hello Diya Patel, age 22`,
        explanation: '* unpacks tuple elements into positional slots; ** unpacks dictionary key-value pairs matching parameter names.',
      },
    ],
    realWorldApplications: [
      'Decorator implementations forwarding calls transparently.',
      '`super().__init__(*args, **kwargs)` in inheritance hierarchies.',
    ],
    commonMistakes: [
      'Placing `*args` after `**kwargs` in parameter definition; `*args` MUST precede `**kwargs`.',
      'Forgetting that `args` is an immutable tuple; attempting `args.append()` raises `AttributeError`.',
    ],
    interviewRelevance:
      'A mandatory prerequisite for answering decorator questions and custom wrapper questions in Python interviews.',
    checkpoints: [
      { id: 'py-26-cp-1', label: '*args creates a tuple; **kwargs creates a dict.' },
      { id: 'py-26-cp-2', label: 'Use * and ** in function calls for argument unpacking.' },
    ],
    practiceExercises: [
      {
        id: 'py-26-ex-1',
        title: 'Flexible Product Calculator',
        difficulty: 'Beginner',
        type: 'coding',
        prompt: 'Write `multiply_all(*numbers) -> float` returning the product of all passed numbers, or 1 if empty.',
        starterCode: 'def multiply_all(*numbers) -> float:\n    pass',
        solution: `def multiply_all(*numbers: float) -> float:
    result = 1.0
    for n in numbers:
        result *= n
    return result

print(multiply_all(2, 3, 4))  # 24.0
print(multiply_all())         # 1.0`,
        explanation: 'Iterates through the *numbers tuple multiplying values sequentially.',
      },
      {
        id: 'py-26-ex-2',
        title: 'Safe Function Call Forwarder',
        difficulty: 'Intermediate',
        type: 'coding',
        prompt: 'Write a wrapper `time_tracker(func, *args, **kwargs)` that prints execution time in ms and returns the result.',
        starterCode: 'import time\ndef time_tracker(func, *args, **kwargs):\n    pass',
        solution: `import time

def time_tracker(func, *args, **kwargs):
    start = time.perf_counter()
    result = func(*args, **kwargs)
    duration_ms = (time.perf_counter() - start) * 1000
    print(f"[{func.__name__}] Executed in {duration_ms:.3f} ms")
    return result

def add(x, y): return x + y
print("Result:", time_tracker(add, 10, 20))`,
        explanation: 'Standard forwarding pattern using *args and **kwargs.',
      },
      {
        id: 'py-26-ex-3',
        title: 'Merge Multiple Config Dictionaries',
        difficulty: 'Advanced',
        type: 'coding',
        prompt: 'Write `merge_configs(*config_dicts)` that merges arbitrary dictionaries in sequence using dictionary unpacking.',
        starterCode: 'def merge_configs(*config_dicts: dict) -> dict:\n    pass',
        solution: `def merge_configs(*config_dicts: dict) -> dict:
    merged = {}
    for d in config_dicts:
        merged = {**merged, **d}
    return merged

print(merge_configs({"a": 1}, {"b": 2}, {"a": 99, "c": 3}))  # {'a': 99, 'b': 2, 'c': 3}`,
        explanation: '{**a, **b} unpacks both dictionaries with latter keys overriding earlier ones.',
      },
    ],
    quizQuestions: [
      {
        id: 'py-26-q1',
        question: 'What is the internal data type of the "args" parameter in def f(*args): pass?',
        options: ['list', 'tuple', 'dict', 'generator'],
        correctOptionIndex: 1,
        explanation: '*args collects positional arguments into an immutable tuple.',
      },
      {
        id: 'py-26-q2',
        question: 'In what order must parameters appear in a Python function definition?',
        options: [
          'def f(**kwargs, *args, standard):',
          'def f(standard, *args, **kwargs):',
          'def f(*args, standard, **kwargs):',
          'Order does not matter',
        ],
        correctOptionIndex: 1,
        explanation: 'Standard positional parameters must come first, followed by *args, then keyword-only arguments, and finally **kwargs.',
      },
    ],
    revisionNotes: [
      '*args collects extra positional arguments as a tuple.',
      '**kwargs collects extra keyword arguments as a dictionary.',
      'Unpacking operators (* and **) expand iterables and dicts at callsites.',
    ],
  },
  {
    id: 'py-27-lambda-functions',
    moduleId: 'py-m3',
    moduleNumber: 3,
    moduleTitle: 'Functions',
    topicNumber: 27,
    title: 'Lambda Functions & Anonymous Expressions',
    language: 'python',
    level: 'Beginner',
    whyItMatters:
      'Lambda functions enable short, inline anonymous functions. They are essential for custom sorting keys (`list.sort(key=lambda x: ...)`), event handlers, and data transformations.',
    explanation:
      'A lambda function is a small anonymous function defined using the `lambda` keyword: `lambda parameters: expression`. Unlike standard `def` functions, lambdas can only contain a single expression (no statements like `if-else` blocks, loops, or `return`). The result of evaluating the expression is implicitly returned. They are most commonly passed as key arguments to `sorted()`, `min()`, `max()`, or higher-order functions.',
    syntaxAndStructure:
      '# Syntax:\n# lambda arg1, arg2: expression\n\n# Sorting by custom object attribute:\nstudents.sort(key=lambda s: s["gpa"], reverse=True)\n\n# Inline condition in lambda (ternary):\nparity = lambda x: "even" if x % 2 == 0 else "odd"',
    codeExamples: [
      {
        title: 'Custom Multi-Attribute Sorting with Lambda',
        code: `employees = [
    {"name": "Aarav", "dept": "Engineering", "salary": 95000},
    {"name": "Diya", "dept": "Engineering", "salary": 110000},
    {"name": "Chirag", "dept": "Marketing", "salary": 85000},
    {"name": "Bhavna", "dept": "Engineering", "salary": 95000},
]

# Sort by Department (asc), then by Salary (desc), then by Name (asc)
# Using tuple keys in lambda:
employees.sort(key=lambda emp: (emp["dept"], -emp["salary"], emp["name"]))

for emp in employees:
    print(f"{emp['dept']:<12} | \${emp['salary']} | {emp['name']}")`,
        expectedOutput: `Engineering  | $110000 | Diya
Engineering  | $95000 | Aarav
Engineering  | $95000 | Bhavna
Marketing    | $85000 | Chirag`,
        explanation: 'Returning a tuple `(dept, -salary, name)` allows multi-criteria sorting with reverse numeric order via `-`.',
      },
      {
        title: 'Lambda Closures Late Binding Trap',
        code: `# THE DANGEROUS LATE-BINDING TRAP:
funcs = [lambda: i for i in range(3)]
# All funcs evaluate to the FINAL value of i (2)!
print("Late binding results:", [f() for f in funcs])

# THE FIX: Bind current value using default argument!
fixed_funcs = [lambda i=i: i for i in range(3)]
print("Fixed results:", [f() for f in fixed_funcs])`,
        expectedOutput: `Late binding results: [2, 2, 2]
Fixed results: [0, 1, 2]`,
        explanation: 'In Python, closures bind variables by reference, not by value. The default argument `i=i` captures the value at definition time.',
      },
    ],
    realWorldApplications: [
      'Specifying custom comparison keys in sorting and heap priority queues.',
      'Dataframe transformation functions in Pandas (`df.apply(lambda row: ...)`).',
    ],
    commonMistakes: [
      'Assigning lambdas to variable names (`f = lambda x: x*2`); PEP 8 recommends using `def f(x): return x*2` instead.',
      'Attempting multiple statements or assignments inside a lambda (causes `SyntaxError`).',
      'Falling into the late-binding closure trap in loops.',
    ],
    interviewRelevance:
      'Frequent interview trap: "What does [lambda: i for i in range(3)] return and why?"',
    checkpoints: [
      { id: 'py-27-cp-1', label: 'Use lambdas as one-line key functions in sorted() and min/max.' },
      { id: 'py-27-cp-2', label: 'Fix late-binding closure traps using default argument lambda i=i: i.' },
    ],
    practiceExercises: [
      {
        id: 'py-27-ex-1',
        title: 'Sort Strings by Frequency of Vowels',
        difficulty: 'Beginner',
        type: 'coding',
        prompt: 'Sort `words = ["banana", "pie", "apple", "sky"]` by count of vowels (`a, e, i, o, u`) descending using `sorted()` and lambda.',
        starterCode: 'words = ["banana", "pie", "apple", "sky"]\n# Sort by vowel count descending',
        solution: `words = ["banana", "pie", "apple", "sky"]
sorted_words = sorted(
    words,
    key=lambda w: sum(1 for ch in w.lower() if ch in "aeiou"),
    reverse=True
)
print(sorted_words)  # ['banana' (3), 'apple' (2), 'pie' (2), 'sky' (0)]`,
        explanation: 'Uses a generator expression within the lambda key function to count vowel occurrences.',
      },
      {
        id: 'py-27-ex-2',
        title: 'Predict Late-Binding Output',
        difficulty: 'Intermediate',
        type: 'output_prediction',
        prompt: 'What is printed by: `multipliers = [lambda x: i * x for i in range(4)]; print([m(2) for m in multipliers])`?',
        solution: 'Output: `[6, 6, 6, 6]`. Variable `i` ends at 3, so each lambda multiplies by 3.',
        explanation: 'Demonstrates Python closure late binding where the closure captures the variable name `i`, evaluated at execution time.',
      },
      {
        id: 'py-27-ex-3',
        title: 'Sort Tuples by Absolute Difference',
        difficulty: 'Advanced',
        type: 'coding',
        prompt: 'Given pairs `[(1, 5), (10, 12), (3, 8)]`, sort them by `abs(a - b)` ascending.',
        starterCode: 'pairs = [(1, 5), (10, 12), (3, 8)]\n# Sort by abs(a - b)',
        solution: `pairs = [(1, 5), (10, 12), (3, 8)]
pairs.sort(key=lambda p: abs(p[0] - p[1]))
print(pairs)  # [(10, 12) diff 2, (1, 5) diff 4, (3, 8) diff 5]`,
        explanation: 'Evaluates the absolute difference between pair components as the primary sort key.',
      },
    ],
    quizQuestions: [
      {
        id: 'py-27-q1',
        question: 'Which of the following CANNOT be placed inside a Python lambda expression?',
        options: [
          'Ternary conditional: a if cond else b',
          'Function call: math.sqrt(x)',
          'Multiple statements or a for-loop statement',
          'Dictionary access: d["key"]',
        ],
        correctOptionIndex: 2,
        explanation: 'Lambda expressions in Python can only contain a single expression; statements like assignments or for loops are prohibited.',
      },
      {
        id: 'py-27-q2',
        question: 'How do you fix late-binding in [lambda: i for i in range(5)] so each lambda captures its current index?',
        options: [
          '[lambda: copy(i) for i in range(5)]',
          '[lambda i=i: i for i in range(5)]',
          '[lambda (i): i for i in range(5)]',
          '[static lambda: i for i in range(5)]',
        ],
        correctOptionIndex: 1,
        explanation: 'Binding i=i as a default argument evaluates i immediately at lambda creation time, preserving the current index.',
      },
    ],
    revisionNotes: [
      'lambda params: expression is an anonymous single-expression function.',
      'Commonly used as the key= parameter in sort/sorted/min/max.',
      'Beware late-binding in loops; fix with default argument i=i.',
    ],
  },
  {
    id: 'py-28-variable-scope-legb',
    moduleId: 'py-m3',
    moduleNumber: 3,
    moduleTitle: 'Functions',
    topicNumber: 28,
    title: 'Variable Scope: The LEGB Rule, global & nonlocal',
    language: 'python',
    level: 'Intermediate',
    whyItMatters:
      'Understanding Python\'s scope resolution rules (LEGB: Local, Enclosing, Global, Built-in) prevents `UnboundLocalError` and is essential for writing closures and recursive helper functions in DSA.',
    explanation:
      'When resolving variable names, Python searches namespaces in strict LEGB order:\n1. **Local (L)**: Names assigned inside the current function.\n2. **Enclosing (E)**: Names in outer enclosing functions (closures).\n3. **Global (G)**: Names declared at the top-level of the current module.\n4. **Built-in (B)**: Built-in names (print, len, range).\n\nIf you assign to a variable anywhere in a function, Python treats it as **Local** for the ENTIRE function. To modify a global variable, use `global var`. To modify an enclosing variable in nested functions, use `nonlocal var`.',
    syntaxAndStructure:
      '# Global scope\ncounter = 0\n\ndef outer():\n    # Enclosing scope\n    x = 10\n    \n    def inner():\n        nonlocal x  # Modifies enclosing x\n        global counter # Modifies global counter\n        x += 1\n        counter += 1\n    return inner',
    codeExamples: [
      {
        title: 'The Classic UnboundLocalError Trap',
        code: `count = 10

def problematic_function():
    # Attempting to read count, but also assigning to count later in the function!
    try:
        print("Count:", count)  # Fails!
        count = count + 1
    except UnboundLocalError as e:
        print("Caught expected error:", e)

problematic_function()

# THE FIX: Declare global count
def correct_function():
    global count
    print("Initial count:", count)
    count += 1
    print("Updated count:", count)

correct_function()`,
        expectedOutput: `Caught expected error: cannot access local variable 'count' where it is not associated with a value
Initial count: 10
Updated count: 11`,
        explanation: 'Because count = ... exists in the function body, Python treats count as local from the very start of the function.',
      },
      {
        title: 'nonlocal in Closures and Tree Traversals',
        code: `def create_counter(start: int = 0):
    current = start
    def increment() -> int:
        nonlocal current  # Rebinds the enclosing variable
        current += 1
        return current
    return increment

c1 = create_counter(10)
print("c1():", c1())
print("c1():", c1())

c2 = create_counter(100)
print("c2():", c2())  # Independent closure state!`,
        expectedOutput: `c1(): 11
c1(): 12
c2(): 101`,
        explanation: 'nonlocal allows inner functions to modify state in enclosing scopes without declaring global variables.',
      },
    ],
    realWorldApplications: [
      'Maintaining state in stateful closures and decorator factories.',
      'Tracking max path sums across recursive helper functions in binary tree DSA problems.',
    ],
    commonMistakes: [
      'Modifying a global variable without the `global` keyword, causing `UnboundLocalError`.',
      'Using `global` instead of `nonlocal` in nested functions (which searches module top-level instead of the outer function).',
      'Shadowing built-in names like `list = [1, 2]` or `str = "text"`.',
    ],
    interviewRelevance:
      'Questions testing why `UnboundLocalError` occurs and how `nonlocal` works in closures.',
    checkpoints: [
      { id: 'py-28-cp-1', label: 'Know LEGB search order: Local, Enclosing, Global, Built-in.' },
      { id: 'py-28-cp-2', label: 'Use nonlocal to modify enclosing variables in closures.' },
    ],
    practiceExercises: [
      {
        id: 'py-28-ex-1',
        title: 'Recursive Tree Diameter with Nonlocal',
        difficulty: 'Beginner',
        type: 'coding',
        prompt: 'Simulate finding maximum depth/diameter in a nested binary tree using a `nonlocal max_diameter` variable.',
        starterCode: 'def tree_diameter(root):\n    # Use nonlocal variable in dfs helper\n    pass',
        solution: `def tree_diameter():
    max_d = 0
    def dfs(depth: int):
        nonlocal max_d
        if depth > max_d:
            max_d = depth
        if depth < 3:
            dfs(depth + 1)
    dfs(0)
    return max_d

print("Max diameter:", tree_diameter())  # 3`,
        explanation: 'nonlocal allows recursive helper to update outer state cleanly without object wrapper arrays.',
      },
      {
        id: 'py-28-ex-2',
        title: 'Predict Scope Shadowing Output',
        difficulty: 'Intermediate',
        type: 'output_prediction',
        prompt: 'What is printed by: `x = 5; def f(): x = 10; def g(): nonlocal x; x = 20; g(); print("f:", x); f(); print("global:", x)`?',
        solution: 'Output:\\nf: 20\\nglobal: 5',
        explanation: 'nonlocal x in g() mutates f\'s local x to 20. The global x remains untouched at 5.',
      },
      {
        id: 'py-28-ex-3',
        title: 'Stateful Accumulator Closure',
        difficulty: 'Advanced',
        type: 'coding',
        prompt: 'Create `make_accumulator(init_val)` returning a function that adds passed amounts to total and returns running sum.',
        starterCode: 'def make_accumulator(init_val: float):\n    pass',
        solution: `def make_accumulator(init_val: float):
    total = init_val
    def add(amount: float) -> float:
        nonlocal total
        total += amount
        return total
    return add

acc = make_accumulator(50.0)
print(acc(10.0))  # 60.0
print(acc(25.0))  # 85.0`,
        explanation: 'Demonstrates closure data encapsulation without classes.',
      },
    ],
    quizQuestions: [
      {
        id: 'py-28-q1',
        question: 'What is the correct search order for Python variable name resolution?',
        options: [
          'Global -> Local -> Enclosing -> Built-in',
          'Local -> Enclosing -> Global -> Built-in (LEGB)',
          'Local -> Global -> Enclosing -> Built-in',
          'Built-in -> Global -> Enclosing -> Local',
        ],
        correctOptionIndex: 1,
        explanation: 'Python resolves names using the LEGB rule: Local, Enclosing, Global, Built-in.',
      },
      {
        id: 'py-28-q2',
        question: 'Which keyword allows a nested function to modify a variable in its immediately outer (enclosing) function?',
        options: ['global', 'nonlocal', 'outer', 'parent'],
        correctOptionIndex: 1,
        explanation: 'nonlocal causes the identifier to refer to previously bound variables in the nearest enclosing scope.',
      },
    ],
    revisionNotes: [
      'LEGB: Local -> Enclosing -> Global -> Built-in.',
      'Assigning inside a function marks that variable local everywhere in the function.',
      'Use nonlocal for closure variables and global for module-level variables.',
    ],
  },
  {
    id: 'py-29-recursion-callstack',
    moduleId: 'py-m3',
    moduleNumber: 3,
    moduleTitle: 'Functions',
    topicNumber: 29,
    title: 'Recursion Mechanics, Call Stack & Recursion Limit',
    language: 'python',
    level: 'Intermediate',
    whyItMatters:
      'Recursion is the engine of divide-and-conquer, trees, graphs, and backtracking. Understanding Python\'s stack frame limit (`sys.getrecursionlimit()`) avoids `RecursionError` in deep recursive searches.',
    explanation:
      'Recursion occurs when a function calls itself directly or indirectly. Every recursive function requires: 1) A **base case** that stops recursion without further calls, and 2) A **recursive step** that moves toward the base case. In Python, each recursive invocation pushes a new stack frame onto the call stack. By default, CPython limits recursion depth to 1,000 frames to prevent C stack overflows. For deep trees or graphs, you can increase this via `sys.setrecursionlimit(limit)`. Python does NOT optimize tail calls.',
    syntaxAndStructure:
      'import sys\n# Check and update limit:\nprint(sys.getrecursionlimit())   # Default 1000\nsys.setrecursionlimit(20000)     # Increase for deep recursion in competitive coding\n\ndef recursive_func(n):\n    if n <= 0:         # Base case\n        return 0\n    return n + recursive_func(n - 1) # Recursive step',
    codeExamples: [
      {
        title: 'Recursive Factorial with Call Stack Trace',
        code: `def factorial(n: int, depth: int = 0) -> int:
    indent = "  " * depth
    print(f"{indent}-> factorial({n}) called")
    if n <= 1:
        print(f"{indent}<- Base case reached: returning 1")
        return 1
    result = n * factorial(n - 1, depth + 1)
    print(f"{indent}<- factorial({n}) returning {result}")
    return result

print("Result 4! =", factorial(4))`,
        expectedOutput: `-> factorial(4) called
  -> factorial(3) called
    -> factorial(2) called
      -> factorial(1) called
      <- Base case reached: returning 1
    <- factorial(2) returning 2
  <- factorial(3) returning 6
<- factorial(4) returning 24
Result 4! = 24`,
        explanation: 'Visualizes stack frame allocation (indentation down) and frame unwinding (indentation up).',
      },
      {
        title: 'Catching RecursionError (Maximum Recursion Depth Exceeded)',
        code: `import sys

def infinite_recursion(count: int = 1):
    return infinite_recursion(count + 1)

try:
    infinite_recursion()
except RecursionError as e:
    print(f"Caught expected RecursionError: {e}")
    print(f"Current recursion limit is: {sys.getrecursionlimit()}")`,
        expectedOutput: `Caught expected RecursionError: maximum recursion depth exceeded
Current recursion limit is: 1000`,
        explanation: 'CPython protects system memory by raising RecursionError when exceeding the recursion limit.',
      },
    ],
    realWorldApplications: [
      'Traversing hierarchical filesystem directories and nested JSON trees.',
      'Depth-First Search (DFS) in graph algorithms and topological sorting.',
    ],
    commonMistakes: [
      'Missing base cases or failing to make progress toward them, causing infinite recursion.',
      'Assuming Python optimizes tail recursion; Python does not perform Tail Call Optimization (TCO).',
      'Forgetting that deep recursion consumes $O(n)$ stack space.',
    ],
    interviewRelevance:
      'All tree traversals (Inorder, Preorder, Postorder) and backtracking problems (N-Queens, Sudoku, Subsets) rely on recursion.',
    checkpoints: [
      { id: 'py-29-cp-1', label: 'Every recursive function requires a base case and progression.' },
      { id: 'py-29-cp-2', label: 'Know sys.setrecursionlimit() for competitive programming.' },
    ],
    practiceExercises: [
      {
        id: 'py-29-ex-1',
        title: 'Recursive Binary Search',
        difficulty: 'Beginner',
        type: 'coding',
        prompt: 'Implement binary search recursively returning the index of target in sorted nums, or -1.',
        starterCode: 'def binary_search(nums: list[int], target: int, left: int, right: int) -> int:\n    pass',
        solution: `def binary_search(nums: list[int], target: int, left: int, right: int) -> int:
    if left > right:
        return -1
    mid = left + (right - left) // 2
    if nums[mid] == target:
        return mid
    elif nums[mid] > target:
        return binary_search(nums, target, left, mid - 1)
    else:
        return binary_search(nums, target, mid + 1, right)

arr = [2, 5, 8, 12, 16, 23, 38]
print(binary_search(arr, 16, 0, len(arr) - 1))  # 4
print(binary_search(arr, 99, 0, len(arr) - 1))  # -1`,
        explanation: 'Divide-and-conquer binary search in $O(\\log n)$ time and $O(\\log n)$ stack frames.',
      },
      {
        id: 'py-29-ex-2',
        title: 'Sum of Digits Recursively',
        difficulty: 'Intermediate',
        type: 'coding',
        prompt: 'Calculate sum of digits of positive integer N recursively (e.g. 1234 -> 10).',
        starterCode: 'def sum_digits(n: int) -> int:\n    pass',
        solution: `def sum_digits(n: int) -> int:
    if n < 10:
        return n
    return (n % 10) + sum_digits(n // 10)

print(sum_digits(12345))  # 15`,
        explanation: 'Base case is single digit; recursive step peels off last digit with modulo 10.',
      },
      {
        id: 'py-29-ex-3',
        title: 'Generate All Subsets (Power Set)',
        difficulty: 'Advanced',
        type: 'coding',
        prompt: 'Generate all subsets of `[1, 2, 3]` using recursive backtracking.',
        starterCode: 'def subsets(nums: list[int]) -> list[list[int]]:\n    pass',
        solution: `def subsets(nums: list[int]) -> list[list[int]]:
    result = []
    def backtrack(index: int, current: list[int]):
        if index == len(nums):
            result.append(current[:])
            return
        # 1. Include nums[index]
        current.append(nums[index])
        backtrack(index + 1, current)
        # 2. Exclude nums[index] (backtrack state)
        current.pop()
        backtrack(index + 1, current)
    backtrack(0, [])
    return result

print(subsets([1, 2]))  # [[1, 2], [1], [2], []]`,
        explanation: 'Classic backtracking recursion exploring $2^n$ decision branches.',
      },
    ],
    quizQuestions: [
      {
        id: 'py-29-q1',
        question: 'Does standard CPython support Tail Call Optimization (TCO)?',
        options: [
          'Yes, tail-recursive functions consume O(1) stack space',
          'No, Guido van Rossum deliberately omitted TCO to preserve full stack trace inspection',
          'Only when compiling with the -O flag',
          'Yes, for integer return types only',
        ],
        correctOptionIndex: 1,
        explanation: 'Python intentionally does not perform TCO. Every recursive call creates a new stack frame regardless of whether it is in tail position.',
      },
      {
        id: 'py-29-q2',
        question: 'What is the default recursion limit in standard CPython installations?',
        options: ['100', '1,000', '10,000', 'Unlimited'],
        correctOptionIndex: 1,
        explanation: 'The default recursion limit in CPython is 1,000 frames, accessible via sys.getrecursionlimit().',
      },
    ],
    revisionNotes: [
      'Base cases prevent infinite recursion and stack overflow.',
      'CPython does NOT optimize tail calls; recursion depth is limited (default 1000).',
      'Increase limit in competitive coding with sys.setrecursionlimit(200000).',
    ],
  },
  {
    id: 'py-30-higher-order-functions',
    moduleId: 'py-m3',
    moduleNumber: 3,
    moduleTitle: 'Functions',
    topicNumber: 30,
    title: 'Higher-Order Functions: map(), filter() & reduce()',
    language: 'python',
    level: 'Intermediate',
    whyItMatters:
      'Higher-order functions take other functions as arguments or return functions. Mastering `map()`, `filter()`, and `reduce()` gives learners a strong command of functional programming paradigms in Python.',
    explanation:
      'A higher-order function is any function that operates on other functions. Core built-in examples:\n1. `map(func, iterable)`: Lazily applies `func` to every element, returning an iterator.\n2. `filter(predicate, iterable)`: Lazily filters elements where `predicate(x)` is truthy.\n3. `functools.reduce(func, iterable, [initial])`: Cumulatively applies a function of two arguments to aggregate a sequence down to a single value.\nWhile list comprehensions are often preferred in modern Python for readability, higher-order functions are memory-efficient iterators.',
    syntaxAndStructure:
      'from functools import reduce\n\n# map:\nsquares = map(lambda x: x ** 2, [1, 2, 3])      # Iterator\n\n# filter:\nevens = filter(lambda x: x % 2 == 0, [1, 2, 3]) # Iterator\n\n# reduce:\nproduct = reduce(lambda acc, x: acc * x, [1, 2, 3, 4], 1) # 24',
    codeExamples: [
      {
        title: 'Comparing map/filter with Comprehensions',
        code: `numbers = [1, 2, 3, 4, 5, 6]

# Using map and filter:
evens_doubled_iter = map(lambda x: x * 2, filter(lambda x: x % 2 == 0, numbers))
print("Result via map/filter:", list(evens_doubled_iter))

# Pythonic list comprehension equivalent:
comp_result = [x * 2 for x in numbers if x % 2 == 0]
print("Result via comprehension:", comp_result)`,
        expectedOutput: `Result via map/filter: [4, 8, 12]
Result via comprehension: [4, 8, 12]`,
        explanation: 'map and filter return lazy iterators that consume $O(1)$ memory until consumed into a list.',
      },
      {
        title: 'Aggregating Data with functools.reduce()',
        code: `from functools import reduce

# 1. Product of numbers:
nums = [1, 2, 3, 4, 5]
total_product = reduce(lambda acc, x: acc * x, nums)
print("Product:", total_product)

# 2. Finding maximum value via reduce:
maximum = reduce(lambda a, b: a if a > b else b, [14, 88, 32, 95, 21])
print("Maximum:", maximum)`,
        expectedOutput: `Product: 120
Maximum: 95`,
        explanation: 'reduce applies the function cumulatively: (((1 * 2) * 3) * 4) * 5 = 120.',
      },
    ],
    realWorldApplications: [
      'Stream processing data transformations in Big Data pipelines (PySpark, MapReduce).',
      'Composing functional validation chains.',
    ],
    commonMistakes: [
      'Forgetting that `map()` and `filter()` return lazy iterators in Python 3; printing them displays `<map object>` instead of a list.',
      'Importing reduce from `functools` is mandatory in Python 3 (it was a built-in in Python 2).',
    ],
    interviewRelevance:
      'Functional programming questions and comparing generator expressions with `map()` / `filter()`.',
    checkpoints: [
      { id: 'py-30-cp-1', label: 'map and filter return lazy iterators; convert to list() if needed.' },
      { id: 'py-30-cp-2', label: 'Use functools.reduce() for cumulative aggregation.' },
    ],
    practiceExercises: [
      {
        id: 'py-30-ex-1',
        title: 'Clean String Strip with map',
        difficulty: 'Beginner',
        type: 'coding',
        prompt: 'Clean raw input names `["  alice ", " BOB  ", "Charlie "]` using `map()` and `str.strip` / `str.title`.',
        starterCode: 'raw = ["  alice ", " BOB  ", "Charlie "]\n# Clean with map',
        solution: `raw = ["  alice ", " BOB  ", "Charlie "]
cleaned = list(map(lambda s: s.strip().title(), raw))
print(cleaned)  # ['Alice', 'Bob', 'Charlie']`,
        explanation: 'map applies the lambda transformation to each string cleanly.',
      },
      {
        id: 'py-30-ex-2',
        title: 'Compute GCD of List with reduce',
        difficulty: 'Intermediate',
        type: 'coding',
        prompt: 'Use `math.gcd` and `functools.reduce` to compute the greatest common divisor of a list of integers.',
        starterCode: 'from functools import reduce\nimport math\n# Compute GCD of [24, 60, 36]',
        solution: `from functools import reduce
import math

numbers = [24, 60, 36]
overall_gcd = reduce(math.gcd, numbers)
print("Overall GCD:", overall_gcd)  # 12`,
        explanation: 'Cumulative application of math.gcd across the entire list.',
      },
      {
        id: 'py-30-ex-3',
        title: 'Custom Map Implementation',
        difficulty: 'Advanced',
        type: 'coding',
        prompt: 'Implement a generator `my_map(func, *iterables)` that mimics the built-in `map` for multiple iterables.',
        starterCode: 'def my_map(func, *iterables):\n    pass',
        solution: `def my_map(func, *iterables):
    for args in zip(*iterables):
        yield func(*args)

print(list(my_map(lambda x, y: x + y, [1, 2, 3], [10, 20, 30])))  # [11, 22, 33]`,
        explanation: 'Uses zip(*iterables) and yield to implement a lazy multi-iterable map.',
      },
    ],
    quizQuestions: [
      {
        id: 'py-30-q1',
        question: 'What does map(str.upper, ["a", "b"]) return in Python 3?',
        options: [
          '["A", "B"]',
          'A lazy map iterator object',
          '("A", "B")',
          'Raises TypeError',
        ],
        correctOptionIndex: 1,
        explanation: 'In Python 3, map() returns a lazy map iterator object, not an evaluated list.',
      },
      {
        id: 'py-30-q2',
        question: 'Which module must be imported to use the reduce() function in Python 3?',
        options: ['itertools', 'functools', 'operator', 'collections'],
        correctOptionIndex: 1,
        explanation: 'reduce() resides inside the functools standard library module in Python 3.',
      },
    ],
    revisionNotes: [
      'map and filter produce lazy iterators (memory O(1)).',
      'reduce() is imported from functools for cumulative reduction.',
      'List comprehensions are often preferred for readability.',
    ],
  },
  {
    id: 'py-31-decorators',
    moduleId: 'py-m3',
    moduleNumber: 3,
    moduleTitle: 'Functions',
    topicNumber: 31,
    title: 'Decorators, @wraps & Parameterized Decorators',
    language: 'python',
    level: 'Advanced',
    whyItMatters:
      'Decorators are Python\'s syntax for modifying or extending function behavior without changing source code. Frameworks like FastAPI, Flask, Django, and pytest rely heavily on decorators for routing, authentication, and caching.',
    explanation:
      'A decorator is a callable that takes a function as an argument and returns a replacement wrapper function. Syntax `@my_decorator` placed above a function is syntactic sugar for `func = my_decorator(func)`. Using `functools.wraps(func)` on the inner wrapper is mandatory to preserve the original function\'s name (`__name__`), docstring (`__doc__`), and parameter signatures. Parameterized decorators (decorators that accept arguments) require an extra nesting level (decorator factory).',
    syntaxAndStructure:
      'from functools import wraps\n\ndef my_decorator(func):\n    @wraps(func) # Preserves metadata\n    def wrapper(*args, **kwargs):\n        # 1. Pre-execution logic\n        result = func(*args, **kwargs)\n        # 2. Post-execution logic\n        return result\n    return wrapper\n\n@my_decorator\ndef target_function():\n    pass',
    codeExamples: [
      {
        title: 'Timing and Logging Decorator with @wraps',
        code: `import time
from functools import wraps

def time_it(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        start = time.perf_counter()
        result = func(*args, **kwargs)
        duration = time.perf_counter() - start
        print(f"[{func.__name__}] finished in {duration * 1000:.3f} ms")
        return result
    return wrapper

@time_it
def compute_sum(n: int) -> int:
    """Computes sum of first n integers."""
    return sum(range(n + 1))

print("Sum result:", compute_sum(100_000))
print("Preserved name:", compute_sum.__name__)
print("Preserved doc:", compute_sum.__doc__)`,
        expectedOutput: `[compute_sum] finished in <duration> ms
Sum result: 5000050000
Preserved name: compute_sum
Preserved doc: Computes sum of first n integers.`,
        explanation: '@wraps copies __name__, __doc__, and __module__ from the wrapped function to wrapper, preventing introspection bugs.',
      },
      {
        title: 'Parameterized Decorator (Decorator Factory)',
        code: `from functools import wraps

def repeat(times: int):
    """Decorator factory that repeats a function call N times."""
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            for i in range(times):
                res = func(*args, **kwargs)
            return res
        return wrapper
    return decorator

@repeat(times=3)
def greet(name: str):
    print(f"Hello, {name}!")

greet("Alice")`,
        expectedOutput: `Hello, Alice!
Hello, Alice!
Hello, Alice!`,
        explanation: 'repeat(times=3) returns the actual decorator, which takes greet and wraps it in a 3-iteration loop.',
      },
    ],
    realWorldApplications: [
      'API authentication gates, rate limiting, and input validation in web frameworks.',
      'Caching function results (`functools.lru_cache`).',
    ],
    commonMistakes: [
      'Forgetting `@wraps(func)`, which causes debugging tools to see `wrapper` instead of the original function name.',
      'Forgetting `*args, **kwargs` in the wrapper, preventing the decorated function from accepting arguments.',
      'Forgetting to return the result of `func(*args, **kwargs)` from the wrapper.',
    ],
    interviewRelevance:
      'Universal senior and fresher coding interview question: "Write a decorator from scratch that logs function inputs and execution time".',
    checkpoints: [
      { id: 'py-31-cp-1', label: 'Always use @functools.wraps(func) inside decorators.' },
      { id: 'py-31-cp-2', label: 'Use *args, **kwargs and return result in wrapper.' },
    ],
    practiceExercises: [
      {
        id: 'py-31-ex-1',
        title: 'Write an Execution Counter Decorator',
        difficulty: 'Beginner',
        type: 'coding',
        prompt: 'Write `@count_calls` that counts how many times the decorated function has been executed and stores it in `func.calls`.',
        starterCode: 'from functools import wraps\ndef count_calls(func):\n    pass',
        solution: `from functools import wraps

def count_calls(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        wrapper.calls += 1
        return func(*args, **kwargs)
    wrapper.calls = 0
    return wrapper

@count_calls
def ping():
    return "pong"

ping()
ping()
print(f"Ping was called {ping.calls} times")  # 2`,
        explanation: 'Attaching an attribute to the wrapper function persists call counts across invocations.',
      },
      {
        id: 'py-31-ex-2',
        title: 'Retry on Failure Decorator',
        difficulty: 'Intermediate',
        type: 'coding',
        prompt: 'Write `@retry(max_attempts=3)` that retries the function up to 3 times if an exception is raised.',
        starterCode: 'from functools import wraps\ndef retry(max_attempts=3):\n    pass',
        solution: `from functools import wraps

def retry(max_attempts: int = 3):
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            attempts = 0
            while attempts < max_attempts:
                try:
                    return func(*args, **kwargs)
                except Exception as e:
                    attempts += 1
                    if attempts == max_attempts:
                        raise e
        return wrapper
    return decorator

# Testing retry decorator
call_count = 0
@retry(max_attempts=3)
def unreliable_api():
    global call_count
    call_count += 1
    if call_count < 2:
        raise ConnectionError("Flaky connection")
    return "Success"

print(unreliable_api())  # Success on attempt 2`,
        explanation: 'Handles retries gracefully using a try-except loop inside the wrapper.',
      },
      {
        id: 'py-31-ex-3',
        title: 'Memoization Decorator from Scratch',
        difficulty: 'Advanced',
        type: 'coding',
        prompt: 'Implement a `@memoize` caching decorator from scratch using a dictionary cache.',
        starterCode: 'from functools import wraps\ndef memoize(func):\n    pass',
        solution: `from functools import wraps

def memoize(func):
    cache = {}
    @wraps(func)
    def wrapper(*args):
        if args not in cache:
            cache[args] = func(*args)
        return cache[args]
    return wrapper

@memoize
def fib(n):
    return n if n <= 1 else fib(n - 1) + fib(n - 2)

print("Fib(30) with custom memoize:", fib(30))  # 832040 in ms`,
        explanation: 'Emulates functools.lru_cache by caching results keyed on args tuple.',
      },
    ],
    quizQuestions: [
      {
        id: 'py-31-q1',
        question: 'What is the purpose of @functools.wraps(func) inside a decorator wrapper?',
        options: [
          'It makes the function run faster',
          'It preserves original metadata like __name__, __doc__, and annotations',
          'It automatically retries failed calls',
          'It makes the wrapper thread-safe',
        ],
        correctOptionIndex: 1,
        explanation: '@wraps copies original function metadata (__name__, __doc__, annotations) to the wrapper to prevent introspection issues.',
      },
      {
        id: 'py-31-q2',
        question: 'What is the syntax @decorator above def foo(): equivalent to?',
        options: [
          'foo = decorator(foo)',
          'decorator = foo(decorator)',
          'foo() = decorator',
          'foo = decorator.wrap(foo)',
        ],
        correctOptionIndex: 0,
        explanation: '@decorator is syntactic sugar for reassigning the function name to the output of decorator(foo).',
      },
    ],
    revisionNotes: [
      'Decorators wrap functions: @dec is foo = dec(foo).',
      'Always use @functools.wraps(func) to preserve function metadata.',
      'Accept *args, **kwargs and return the function result in wrapper.',
    ],
  },
  {
    id: 'py-32-generators-iterators',
    moduleId: 'py-m3',
    moduleNumber: 3,
    moduleTitle: 'Functions',
    topicNumber: 32,
    title: 'Generators, yield & The Iterator Protocol',
    language: 'python',
    level: 'Advanced',
    whyItMatters:
      'Loading gigabyte datasets into lists crashes RAM with `MemoryError`. Generators produce items on demand in $O(1)$ memory, powering data streams, pagination, and lazy pipelines.',
    explanation:
      'An **iterator** is any object that implements the iterator protocol: `__iter__()` returning itself and `__next__()` returning the next item (or raising `StopIteration`). A **generator** is a function that contains one or more `yield` statements. When called, a generator does not run immediately; it returns a generator object. When `next()` is called on it, execution runs until the `yield` expression, yielding the value and pausing its local state. Generator expressions `(x for x in seq)` offer concise syntax.',
    syntaxAndStructure:
      '# Generator function:\ndef count_up(n):\n    val = 1\n    while val <= n:\n        yield val   # Pauses and yields\n        val += 1\n\n# Generator expression:\ngen = (x ** 2 for x in range(1_000_000)) # O(1) memory!\nnext(gen) # 0\nnext(gen) # 1',
    codeExamples: [
      {
        title: 'Infinite Stream Generation in O(1) Memory',
        code: `def fibonacci_stream():
    """Generates an infinite stream of Fibonacci numbers in O(1) memory."""
    a, b = 0, 1
    while True:
        yield a
        a, b = b, a + b

# Consume first 8 Fibonacci numbers
fib_gen = fibonacci_stream()
first_8 = [next(fib_gen) for _ in range(8)]
print("First 8 Fib numbers:", first_8)

import sys
# Generator memory footprint compared to a 1,000,000 list:
gen_exp = (x for x in range(1_000_000))
list_exp = list(range(1_000_000))
print(f"Generator memory: {sys.getsizeof(gen_exp)} bytes")
print(f"List memory:      {sys.getsizeof(list_exp):,} bytes")`,
        expectedOutput: `First 8 Fib numbers: [0, 1, 1, 2, 3, 5, 8, 13]
Generator memory: <around 100> bytes
List memory:      8,000,056 bytes`,
        explanation: 'The generator uses ~104 bytes regardless of how many millions of items it can produce, whereas the list consumes over 8 MB of RAM.',
      },
      {
        title: 'Yield From Subgenerator Delegation',
        code: `def flatten_tree(node):
    """Recursively yields all leaf elements using yield from."""
    if isinstance(node, list):
        for child in node:
            yield from flatten_tree(child)  # Delegates directly to subgenerator!
    else:
        yield node

nested = [1, [2, [3, 4], 5], 6]
print("Flattened stream:", list(flatten_tree(nested)))`,
        expectedOutput: `Flattened stream: [1, 2, 3, 4, 5, 6]`,
        explanation: 'yield from (PEP 380) establishes a transparent two-way pipe between caller and subgenerator.',
      },
    ],
    realWorldApplications: [
      'Streaming multi-gigabyte CSV/JSON files line-by-line without running out of RAM.',
      'Building asynchronous pipelines and streaming websocket data.',
    ],
    commonMistakes: [
      'Attempting to reuse a generator after it is exhausted; generators can only be consumed ONCE.',
      'Calling `len(gen)` on a generator (`TypeError: object of type \'generator\' has no len()`).',
      'Confusing `return` with `yield` in generator functions.',
    ],
    interviewRelevance:
      'Questions on "How does yield work under the hood?", "What is the difference between a generator and an iterator?", and streaming large datasets.',
    checkpoints: [
      { id: 'py-32-cp-1', label: 'yield pauses execution and maintains state in O(1) memory.' },
      { id: 'py-32-cp-2', label: 'Generators can only be consumed once.' },
    ],
    practiceExercises: [
      {
        id: 'py-32-ex-1',
        title: 'Streaming Prime Number Generator',
        difficulty: 'Beginner',
        type: 'coding',
        prompt: 'Write a generator `prime_stream(limit)` yielding prime numbers up to `limit`.',
        starterCode: 'def prime_stream(limit: int):\n    pass',
        solution: `def prime_stream(limit: int):
    for n in range(2, limit + 1):
        if all(n % d != 0 for d in range(2, int(n ** 0.5) + 1)):
            yield n

print(list(prime_stream(20)))  # [2, 3, 5, 7, 11, 13, 17, 19]`,
        explanation: 'Generates primes on demand without preallocating storage.',
      },
      {
        id: 'py-32-ex-2',
        title: 'Implement Custom Iterator Class',
        difficulty: 'Intermediate',
        type: 'coding',
        prompt: 'Build a class `Countdown` implementing `__iter__` and `__next__` raising `StopIteration` at 0.',
        starterCode: 'class Countdown:\n    pass',
        solution: `class Countdown:
    def __init__(self, start: int):
        self.curr = start
    def __iter__(self):
        return self
    def __next__(self):
        if self.curr <= 0:
            raise StopIteration
        val = self.curr
        self.curr -= 1
        return val

print(list(Countdown(4)))  # [4, 3, 2, 1]`,
        explanation: 'Implements the raw iterator protocol manually with StopIteration.',
      },
      {
        id: 'py-32-ex-3',
        title: 'Sliding Window Generator',
        difficulty: 'Advanced',
        type: 'coding',
        prompt: 'Create a generator `window_stream(seq, k)` yielding tuples of size `k` moving one step at a time.',
        starterCode: 'def window_stream(seq, k):\n    pass',
        solution: `from collections import deque

def window_stream(seq, k):
    win = deque()
    for item in seq:
        win.append(item)
        if len(win) == k:
            yield tuple(win)
            win.popleft()

print(list(window_stream([1, 2, 3, 4, 5], 3)))  # [(1, 2, 3), (2, 3, 4), (3, 4, 5)]`,
        explanation: 'Uses collections.deque to stream sliding windows in $O(1)$ memory per step.',
      },
    ],
    quizQuestions: [
      {
        id: 'py-32-q1',
        question: 'What exception is raised when next() is called on an exhausted iterator in Python?',
        options: ['IndexError', 'StopIteration', 'GeneratorExit', 'EOFError'],
        correctOptionIndex: 1,
        explanation: 'The iterator protocol signals termination by raising the StopIteration exception.',
      },
      {
        id: 'py-32-q2',
        question: 'What happens to the memory usage of (x * 2 for x in range(10_000_000)) compared to [x * 2 for x in range(10_000_000)]?',
        options: [
          'Memory is identical',
          'The generator expression uses constant O(1) memory, while the list allocates memory for 10 million items',
          'The generator uses more memory because of bytecode overhead',
          'The generator fails with MemoryError',
        ],
        correctOptionIndex: 1,
        explanation: 'Generator expressions evaluate lazily on-demand, holding only the state of the current iteration in O(1) memory.',
      },
    ],
    revisionNotes: [
      'yield turns a function into a generator.',
      'Generators evaluate lazily, consuming O(1) memory.',
      'Iterators implement __iter__() and __next__() raising StopIteration.',
    ],
  },
];

export const module3: MasteryModule = {
  id: 'py-m3',
  number: 3,
  title: 'Functions',
  description: 'Definitions, arguments, return values, mutable default trap, args/kwargs, lambdas, scope, recursion, higher-order functions, decorators, and generators.',
  language: 'python',
  topics: module3Topics,
  moduleAssessment: {
    id: 'py-m3-exam',
    title: 'Python Functions Milestone Assessment',
    passingScorePercentage: 70,
    questions: module3Topics.flatMap((t) => t.quizQuestions),
  },
  revisionQuestions: [
    'Explain the mutable default argument trap and how the None sentinel resolves it.',
    'What is the difference between *args and **kwargs?',
    'Explain Python\'s LEGB scope resolution rule with an example of nonlocal.',
    'How do decorators work under the hood, and why is @functools.wraps mandatory?',
    'What is the difference between yield and return, and why are generators memory-efficient?',
  ],
};
