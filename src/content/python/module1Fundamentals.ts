import { MasteryTopic, MasteryModule } from '@/types/mastery';

export const module1Topics: MasteryTopic[] = [
  {
    id: 'py-01-intro-execution',
    moduleId: 'py-m1',
    moduleNumber: 1,
    moduleTitle: 'Python Fundamentals',
    topicNumber: 1,
    title: 'Introduction to Python & Execution Model',
    language: 'python',
    level: 'Beginner',
    whyItMatters:
      'Understanding Python\'s interpreted nature, dynamic typing, and bytecode execution underpins how programs run, why CPython uses the GIL, and how code executes in production.',
    explanation:
      'Python is a high-level, interpreted, dynamically typed programming language created by Guido van Rossum in 1991. When you run a Python script, CPython compiles the source code (.py) into intermediate bytecode (.pyc) stored in the __pycache__ directory, which is then interpreted by the Python Virtual Machine (PVM). Python prioritizes developer readability ("Readability counts" from PEP 20 — The Zen of Python).',
    syntaxAndStructure:
      '# Terminal execution:\n# python script.py\n# python -m module_name\n\nimport sys\nprint(sys.version)          # Outputs interpreter version\nprint(sys.implementation)   # E.g. cpython, pypy',
    codeExamples: [
      {
        title: 'Inspecting Python Runtime & Bytecode Generation',
        code: `import sys
import dis

def calculate_square(x: int) -> int:
    return x * x

print("Python Version:", sys.version_info.major, sys.version_info.minor)
print("Square of 7:", calculate_square(7))

# Disassemble bytecode to see Python Virtual Machine instructions
print("\\nBytecode Instructions:")
dis.dis(calculate_square)`,
        expectedOutput: `Python Version: 3 11
Square of 7: 49

Bytecode Instructions:
  4           0 LOAD_FAST                0 (x)
              2 LOAD_FAST                0 (x)
              4 BINARY_OP                5 (*)
              8 RETURN_VALUE`,
        explanation:
          'dis.dis() demonstrates how the function is compiled into simple stack-based PVM operations (LOAD_FAST, BINARY_OP, RETURN_VALUE).',
      },
      {
        title: 'Interactive Execution & The Zen of Python',
        code: `import this  # Prints the Zen of Python aphorisms

# Demonstrating expressive elegance:
numbers = [1, 2, 3, 4, 5]
squared_evens = [n ** 2 for n in numbers if n % 2 == 0]
print("Squared evens:", squared_evens)`,
        expectedOutput: `The Zen of Python, by Tim Peters

Beautiful is better than ugly.
Explicit is better than implicit.
Simple is better than complex.
...
Squared evens: [4, 16]`,
        explanation:
          'Python enables clear, concise idioms (such as list comprehensions) that align with core language design principles.',
      },
    ],
    realWorldApplications: [
      'Backend web development (Django, FastAPI, Flask).',
      'Data science, machine learning, and AI pipelines (NumPy, PyTorch, Pandas).',
      'Automation scripts and DevOps infrastructure tooling.',
    ],
    commonMistakes: [
      'Assuming Python compiles to native machine code like C++; it runs on a virtual machine (PVM).',
      'Confusing Python 2 syntax (print without parentheses) with modern Python 3.',
      'Deleting the __pycache__ directory assuming it contains source code; it only stores cached bytecode.',
    ],
    interviewRelevance:
      'Interviewers frequently ask whether Python is interpreted or compiled (answer: both — compiled to bytecode, then interpreted by the PVM) and how CPython differs from PyPy or Jython.',
    checkpoints: [
      { id: 'py-01-cp-1', label: 'Understand the role of CPython, bytecode, and PVM.' },
      { id: 'py-01-cp-2', label: 'Know how to run scripts via terminal and inspect interpreter info.' },
    ],
    practiceExercises: [
      {
        id: 'py-01-ex-1',
        title: 'Print System Platform Details',
        difficulty: 'Beginner',
        type: 'coding',
        prompt: 'Write a Python script that imports `platform` and prints the operating system name and Python release version.',
        starterCode: 'import platform\n\ndef show_environment():\n    # TODO: Print OS and Python version\n    pass',
        solution: `import platform

def show_environment():
    os_name = platform.system()
    py_ver = platform.python_version()
    print(f"OS: {os_name}, Python: {py_ver}")
    return os_name, py_ver

show_environment()`,
        explanation: 'platform.system() returns Linux, Windows, or Darwin; platform.python_version() returns string like "3.11.4".',
      },
      {
        id: 'py-01-ex-2',
        title: 'Predict Execution Flow',
        difficulty: 'Intermediate',
        type: 'output_prediction',
        prompt: 'What will be printed when running: `print("A"); import sys; sys.exit(0); print("B")`?',
        solution: 'Only "A" is printed. sys.exit(0) raises SystemExit, terminating execution before "B" is reached.',
        explanation: 'sys.exit() raises the SystemExit exception which halts the interpreter unless caught in a try/except block.',
      },
      {
        id: 'py-01-ex-3',
        title: 'Custom Stack Bytecode Inspection',
        difficulty: 'Advanced',
        type: 'debugging',
        prompt: 'Debug this code so that dis.dis() inspects a lambda instead of raising an AttributeError: `import dis; dis.dis(lambda x, y: (x + y) * 2)`',
        starterCode: 'import dis\n# Correct invocation of dis.dis on the lambda function\nfunc = lambda x, y: (x + y) * 2\n# Call dis.dis here',
        solution: `import dis
func = lambda x, y: (x + y) * 2
dis.dis(func)`,
        explanation: 'Assigning the lambda to a callable object reference allows dis.dis() to analyze its underlying code object.',
      },
    ],
    quizQuestions: [
      {
        id: 'py-01-q1',
        question: 'What is the correct sequence of Python program execution in standard CPython?',
        options: [
          'Source code -> Bytecode (.pyc) -> PVM interpreter -> Machine instructions',
          'Source code -> Direct machine code compilation -> CPU',
          'Source code -> Assembly -> Linker -> Executable',
          'Source code -> Abstract Syntax Tree -> Direct GPU execution',
        ],
        correctOptionIndex: 0,
        explanation: 'CPython first compiles source code to platform-independent bytecode, which the Python Virtual Machine (PVM) interprets line-by-line.',
      },
      {
        id: 'py-01-q2',
        question: 'Which default implementation of Python is written in C and used by default in almost all systems?',
        options: ['PyPy', 'CPython', 'Jython', 'IronPython'],
        correctOptionIndex: 1,
        explanation: 'CPython is the reference, standard C-based implementation of Python maintained by the Python Software Foundation.',
      },
    ],
    revisionNotes: [
      'Python compiles .py to .pyc bytecode first, then executes on the PVM.',
      'CPython is the default C-written runtime; PyPy offers a JIT compiler.',
      'PEP 8 defines style; PEP 20 defines Zen of Python.',
    ],
  },
  {
    id: 'py-02-syntax-indentation',
    moduleId: 'py-m1',
    moduleNumber: 1,
    moduleTitle: 'Python Fundamentals',
    topicNumber: 2,
    title: 'Syntax, Indentation & Comments',
    language: 'python',
    level: 'Beginner',
    whyItMatters:
      'Unlike C++ or Java which use curly braces {}, Python uses whitespace indentation to define code blocks. Writing clean, correctly indented blocks is mandatory to avoid IndentationError.',
    explanation:
      'In Python, colons (:) introduce a new code block, and every subsequent line within that block must be indented consistently. The official PEP 8 style guide mandates 4 spaces per indentation level. Tabs and spaces must never be mixed. Comments are created with # for single lines or triple quotes (""" or \'\'\') for multi-line docstrings.',
    syntaxAndStructure:
      '# Single line comment\n\n"""\nMulti-line docstring for functions or modules\n"""\n\nif condition:\n    # Exactly 4 spaces\n    statement_1\n    statement_2\nelse:\n    statement_3',
    codeExamples: [
      {
        title: 'Correct Block Indentation & Docstrings',
        code: `def evaluate_score(score: int) -> str:
    """Evaluates exam score and returns grade categorization."""
    if score >= 90:
        grade = "A+"
        status = "Distinction"
    elif score >= 75:
        grade = "A"
        status = "First Class"
    else:
        grade = "B"
        status = "Pass"
    
    # Combined return
    return f"Grade: {grade} ({status})"

print(evaluate_score(92))
print(evaluate_score(80))`,
        expectedOutput: `Grade: A+ (Distinction)
Grade: A (First Class)`,
        explanation: 'Each branch is consistently indented with 4 spaces. The function docstring describes behavior accessible via help().',
      },
      {
        title: 'Line Continuation Techniques',
        code: `# Implicit continuation inside parentheses (preferred):
total = (
    100 +
    200 +
    300
)

# Explicit continuation with backslash \\:
message = "Hello, " \\
          "World!"

print("Total:", total)
print("Message:", message)`,
        expectedOutput: `Total: 600
Message: Hello, World!`,
        explanation: 'Parentheses provide clean multi-line continuation without trailing backslash syntax errors.',
      },
    ],
    realWorldApplications: [
      'Writing readable production code in large engineering teams.',
      'Self-documenting APIs using structured docstrings for Sphinx/MkDocs documentation generators.',
    ],
    commonMistakes: [
      'Mixing tabs and spaces; modern Python 3 raises TabError: inconsistent use of tabs and spaces.',
      'Forgetting the colon (:) after if, for, while, def, and class headers.',
      'Inconsistent indentation within the same block (e.g. 2 spaces on line 1, 4 spaces on line 2).',
    ],
    interviewRelevance:
      'Questions on why Python chose indentation over braces (enforces clean, readable code) and what causes TabError or IndentationError.',
    checkpoints: [
      { id: 'py-02-cp-1', label: 'Use 4 spaces per indent level strictly.' },
      { id: 'py-02-cp-2', label: 'Master docstrings and line continuation.' },
    ],
    practiceExercises: [
      {
        id: 'py-02-ex-1',
        title: 'Fix the Indentation Error',
        difficulty: 'Beginner',
        type: 'debugging',
        prompt: 'Fix the IndentationError in: `def check(n):\\nif n > 0:\\nprint("positive")`',
        starterCode: 'def check(n):\nif n > 0:\nprint("positive")',
        solution: `def check(n):
    if n > 0:
        print("positive")

check(5)`,
        explanation: 'Both the function body and the if-statement body require standard 4-space indentation.',
      },
      {
        id: 'py-02-ex-2',
        title: 'Docstring Extraction',
        difficulty: 'Intermediate',
        type: 'coding',
        prompt: 'Write a function with a triple-quoted docstring and print its `__doc__` attribute.',
        starterCode: 'def my_func():\n    pass\n# print docstring here',
        solution: `def calculate_area(radius: float) -> float:
    """Calculates the area of a circle given its radius."""
    import math
    return math.pi * radius * radius

print(calculate_area.__doc__)`,
        explanation: 'Triple-quoted strings placed immediately below the function header become the __doc__ metadata attribute.',
      },
      {
        id: 'py-02-ex-3',
        title: 'Nested Block Logic',
        difficulty: 'Advanced',
        type: 'coding',
        prompt: 'Write a nested loop that prints a 3x3 matrix using proper indentation and list comprehension.',
        starterCode: 'def print_matrix():\n    pass',
        solution: `def print_matrix():
    matrix = [[row * 3 + col + 1 for col in range(3)] for row in range(3)]
    for row in matrix:
        print(" ".join(str(val) for val in row))

print_matrix()`,
        explanation: 'Demonstrates multi-level block nesting and clean list-comprehension indentation.',
      },
    ],
    quizQuestions: [
      {
        id: 'py-02-q1',
        question: 'According to PEP 8, how many spaces should be used for each level of indentation?',
        options: ['2 spaces', '4 spaces', '1 tab', '8 spaces'],
        correctOptionIndex: 1,
        explanation: 'PEP 8 specifies exactly 4 spaces per indentation level. Tabs are discouraged.',
      },
      {
        id: 'py-02-q2',
        question: 'What error is raised if tabs and spaces are mixed in the same source file in Python 3?',
        options: ['SyntaxError', 'TabError', 'ValueError', 'IndentationError: mixed-types'],
        correctOptionIndex: 1,
        explanation: 'Python 3 raises TabError when indentation contains an inconsistent mixture of spaces and tabs.',
      },
    ],
    revisionNotes: [
      'Code blocks are defined by colons (:) and whitespace indentation.',
      'PEP 8 standard is 4 spaces; never mix tabs and spaces.',
      'Docstrings reside in __doc__ attribute of functions/classes.',
    ],
  },
  {
    id: 'py-03-variables-datatypes',
    moduleId: 'py-m1',
    moduleNumber: 1,
    moduleTitle: 'Python Fundamentals',
    topicNumber: 3,
    title: 'Variables, Dynamic Typing & Core Data Types',
    language: 'python',
    level: 'Beginner',
    whyItMatters:
      'In Python, variables are object references, not memory boxes. Mastering Python\'s memory model (everything is an object) avoids subtle bugs with reference sharing.',
    explanation:
      'Python is dynamically and strongly typed. You do not declare variable types; the interpreter binds the variable name to an object in heap memory. Core primitive types include int (arbitrary precision in Python 3), float (IEEE 754 double precision), bool (subclass of int: True=1, False=0), str (immutable Unicode), and NoneType (singleton None). Use type() to inspect object type and isinstance() for safe type checking.',
    syntaxAndStructure:
      '# Variable assignment:\nx = 42              # int (arbitrary size)\ny = 3.14159         # float\nname = "Antigravity"# str\nis_active = True    # bool\ndata = None         # NoneType\n\n# Safe type checking:\nisinstance(x, int)  # True',
    codeExamples: [
      {
        title: 'Dynamic Typing and Object Identity',
        code: `a = 1000
b = a
c = 1000

print("a == b:", a == b)      # Value equality
print("a is b:", a is b)      # Identity / memory address check
print("a is c:", a is c)      # Different heap objects (outside small int cache)
print("id(a):", id(a))
print("id(b):", id(b))

# Variable re-assignment to another type (dynamic typing):
a = "Python Rocks"
print("a new type:", type(a))`,
        expectedOutput: `a == b: True
a is b: True
a is c: False
id(a): <some_memory_address>
id(b): <same_memory_address>
a new type: <class 'str'>`,
        explanation:
          'a and b point to the identical object in heap memory. Reassigning a to a string points the name a to a new string object without affecting b.',
      },
      {
        title: 'Arbitrary-Precision Integers in Python 3',
        code: `# Python ints never overflow; they expand dynamically in memory
huge_number = 2 ** 100
print("2^100 =", huge_number)
print("Number of digits:", len(str(huge_number)))`,
        expectedOutput: `2^100 = 1267650600228229401496703205376
Number of digits: 31`,
        explanation: 'Unlike C++ int or Java long which overflow at 64 bits, Python 3 ints automatically scale to arbitrary precision.',
      },
    ],
    realWorldApplications: [
      'Financial applications calculating huge values without overflow.',
      'Dynamic configurations where settings can transition between types safely.',
    ],
    commonMistakes: [
      'Confusing equality (==) with identity (is). Use is only for singletons like None.',
      'Assuming bool is a separate primitive; in Python, issubclass(bool, int) is True.',
      'Checking types with type(x) == int instead of the polymorphic isinstance(x, int).',
    ],
    interviewRelevance:
      'High-frequency interview topic: "Explain Python\'s memory model and the difference between == and is".',
    checkpoints: [
      { id: 'py-03-cp-1', label: 'Understand variables as pointers/references to heap objects.' },
      { id: 'py-03-cp-2', label: 'Differentiate value equality (==) from reference identity (is).' },
    ],
    practiceExercises: [
      {
        id: 'py-03-ex-1',
        title: 'Check Multiple Types Safely',
        difficulty: 'Beginner',
        type: 'coding',
        prompt: 'Write a function `is_numeric(val)` that returns True if val is an int or float, but False if it is a bool.',
        starterCode: 'def is_numeric(val):\n    # Note: bool is a subclass of int in Python!\n    pass',
        solution: `def is_numeric(val):
    if isinstance(val, bool):
        return False
    return isinstance(val, (int, float))

print(is_numeric(42))      # True
print(is_numeric(3.14))    # True
print(is_numeric(True))    # False`,
        explanation: 'Because bool inherits from int, isinstance(True, int) is True, so we must explicitly check for bool first.',
      },
      {
        id: 'py-03-ex-2',
        title: 'Predict Small Integer Caching',
        difficulty: 'Intermediate',
        type: 'output_prediction',
        prompt: 'What is the output of `x = 256; y = 256; print(x is y)` vs `x = 257; y = 257; print(x is y)`?',
        solution: 'In CPython interactive shell, 256 is True because integers between -5 and 256 are pre-allocated singletons (small integer cache). 257 is False when evaluated in separate statements.',
        explanation: 'CPython optimizes memory by pre-allocating an array of integer objects from -5 to 256.',
      },
      {
        id: 'py-03-ex-3',
        title: 'Dynamic Type Swapping',
        difficulty: 'Advanced',
        type: 'coding',
        prompt: 'Demonstrate Python multiple assignment to swap two variables without a temporary variable.',
        starterCode: 'a = 10\nb = 20\n# Swap in one line',
        solution: `a = 10
b = 20
a, b = b, a
print(f"a: {a}, b: {b}")  # a: 20, b: 10`,
        explanation: 'Tuple packing creates (b, a) on the RHS, which is unpacked into a, b on the LHS atomically.',
      },
    ],
    quizQuestions: [
      {
        id: 'py-03-q1',
        question: 'Which of the following statements about Python variables is TRUE?',
        options: [
          'Variables hold fixed-size memory slots determined at compile time.',
          'Variables are references/labels bound to objects in heap memory.',
          'Python integers overflow to negative values when exceeding 64 bits.',
          'The "is" operator compares value contents rather than memory addresses.',
        ],
        correctOptionIndex: 1,
        explanation: 'In Python, variables are names that reference objects residing in heap memory.',
      },
      {
        id: 'py-03-q2',
        question: 'What is the recommended way to check if an object is an instance of a specific type or subclass?',
        options: ['type(obj) == TargetType', 'obj.type == TargetType', 'isinstance(obj, TargetType)', 'obj.__class__ is TargetType'],
        correctOptionIndex: 2,
        explanation: 'isinstance() is the idiomatic, safe method because it correctly supports inheritance hierarchies and tuples of types.',
      },
    ],
    revisionNotes: [
      'Variables are labels bound to heap objects.',
      'Integers in Python 3 have arbitrary precision (no integer overflow).',
      'Use == for value equality, is for object identity.',
    ],
  },
  {
    id: 'py-04-type-conversion',
    moduleId: 'py-m1',
    moduleNumber: 1,
    moduleTitle: 'Python Fundamentals',
    topicNumber: 4,
    title: 'Type Conversion & Casting (Implicit vs Explicit)',
    language: 'python',
    level: 'Beginner',
    whyItMatters:
      'Handling data from APIs, command-line inputs, and databases requires safe type conversion. Understanding implicit coercion vs explicit casting prevents TypeError in production.',
    explanation:
      'Python does not perform dangerous automatic type coercion (e.g. adding a string and an integer raises TypeError, unlike JavaScript). Implicit conversion occurs only when no data loss can happen (e.g., adding int + float yields float). Explicit conversion uses built-in constructor functions: int(), float(), str(), bool(), list(), tuple(), set(), and dict(). Any non-empty string, non-zero number, or non-empty container evaluates to True under bool() (truthy values).',
    syntaxAndStructure:
      '# Explicit casting:\nnum_str = "123"\nnum_int = int(num_str)      # 123\nnum_float = float("45.67")  # 45.67\ntext = str(99.9)            # "99.9"\n\n# Base conversion:\nbinary_val = int("1010", 2) # 10 (base 2)\nhex_val = int("1A", 16)     # 26 (base 16)',
    codeExamples: [
      {
        title: 'Implicit vs Explicit Conversions & Truthiness',
        code: `x = 10      # int
y = 4.5     # float
z = x + y   # Implicit widening to float
print(f"z = {z}, type: {type(z)}")

# Truthiness testing in Python:
falsy_values = [0, 0.0, "", None, [], (), {}, set()]
for val in falsy_values:
    print(f"bool({repr(val)}):", bool(val))

truthy_sample = "0"  # Non-empty string is True!
print("bool('0'):", bool(truthy_sample))`,
        expectedOutput: `z = 14.5, type: <class 'float'>
bool(0): False
bool(0.0): False
bool(''): False
bool(None): False
bool([]): False
bool(()): False
bool({}): False
bool(set()): False
bool('0'): True`,
        explanation: 'Empty containers, zeroes, and None are falsy. A non-empty string like "0" is truthy because its length is > 0.',
      },
      {
        title: 'Safe Parsing with Exception Handling',
        code: `def parse_integer(value: str, default: int = 0) -> int:
    try:
        return int(value)
    except (ValueError, TypeError):
        return default

print(parse_integer("456"))
print(parse_integer("invalid_123", default=-1))
print(parse_integer(None, default=0))`,
        expectedOutput: `456
-1
0`,
        explanation: 'int() on invalid string format raises ValueError; wrapping in try-except ensures robust casting.',
      },
    ],
    realWorldApplications: [
      'Parsing request query parameters and environment variables from strings to typed numbers.',
      'Sanitizing raw user input from web forms.',
    ],
    commonMistakes: [
      'Assuming bool("False") is False; any non-empty string evaluates to True!',
      'Passing float strings like "12.34" directly to int(); you must do int(float("12.34")).',
      'Concatenating string with integer without explicit str() casting (e.g. "Age: " + 25 raises TypeError).',
    ],
    interviewRelevance:
      'A frequent interview trap: "What is bool(\'False\')?" (Answer: True) and "How does Python handle implicit type conversion compared to JavaScript?".',
    checkpoints: [
      { id: 'py-04-cp-1', label: 'Know the 8 primary falsy values in Python.' },
      { id: 'py-04-cp-2', label: 'Cast between number bases using int(s, base).' },
    ],
    practiceExercises: [
      {
        id: 'py-04-ex-1',
        title: 'Safe Float to Integer Truncation',
        difficulty: 'Beginner',
        type: 'coding',
        prompt: 'Convert the string `"199.99"` into an integer representing whole dollars without throwing a ValueError.',
        starterCode: 'val = "199.99"\n# Convert val to int dollars',
        solution: `val = "199.99"
dollars = int(float(val))
print(dollars)  # 199`,
        explanation: 'Directly calling int("199.99") raises ValueError because of the decimal point. Converting to float first resolves this.',
      },
      {
        id: 'py-04-ex-2',
        title: 'Evaluate Falsy Expressions',
        difficulty: 'Intermediate',
        type: 'output_prediction',
        prompt: 'What is the output of `bool([] or "hello" and 0)`?',
        solution: 'Output is 0 (or False). Breakdown: [] is falsy, so it evaluates `"hello" and 0`. In `and`, if the left side is truthy, it returns the right side (0).',
        explanation: 'Python logical operators return the operand itself rather than pure booleans: "hello" and 0 yields 0.',
      },
      {
        id: 'py-04-ex-3',
        title: 'Binary String to Decimal Converter',
        difficulty: 'Advanced',
        type: 'coding',
        prompt: 'Write a function that takes a binary string (e.g. "1101") and returns its decimal, hex, and octal equivalents.',
        starterCode: 'def convert_binary(bin_str: str):\n    pass',
        solution: `def convert_binary(bin_str: str):
    decimal = int(bin_str, 2)
    hexadecimal = hex(decimal)
    octal = oct(decimal)
    return {"decimal": decimal, "hex": hexadecimal, "octal": octal}

print(convert_binary("1101"))`,
        explanation: 'int(bin_str, 2) parses base-2; hex() and oct() return formatted string representations prefixed with 0x and 0o.',
      },
    ],
    quizQuestions: [
      {
        id: 'py-04-q1',
        question: 'What is the result of bool("False") in Python?',
        options: ['False', 'True', 'Raises ValueError', 'None'],
        correctOptionIndex: 1,
        explanation: 'Any non-empty string is considered truthy in Python. Only the empty string "" evaluates to False.',
      },
      {
        id: 'py-04-q2',
        question: 'What happens when executing: result = "Answer: " + 42?',
        options: [
          'result = "Answer: 42"',
          'TypeError: can only concatenate str (not "int") to str',
          'ValueError: invalid type',
          'result = "Answer: 0"',
        ],
        correctOptionIndex: 1,
        explanation: 'Python is strongly typed and will not implicitly convert integer 42 to string during string concatenation.',
      },
    ],
    revisionNotes: [
      'Python does not implicitly cast strings to numbers; explicit cast is mandatory.',
      'Only empty collections, numeric zeroes, and None are falsy.',
      'Use int(s, base) to parse binary, octal, or hex strings.',
    ],
  },
  {
    id: 'py-05-input-output',
    moduleId: 'py-m1',
    moduleNumber: 1,
    moduleTitle: 'Python Fundamentals',
    topicNumber: 5,
    title: 'Standard Input/Output & String Formatting',
    language: 'python',
    level: 'Beginner',
    whyItMatters:
      'Placement coding tests read inputs from stdin and write to stdout. Mastering formatted strings (f-strings) and fast I/O is vital for competitive programming and assessments.',
    explanation:
      'The built-in input(prompt) function reads a line from standard input as a string. Output is written with print(*objects, sep=\' \', end=\'\\n\', file=sys.stdout, flush=False). For string formatting, modern Python 3.6+ uses f-strings (f"Value: {x:.2f}"), which are faster, cleaner, and more expressive than older %-formatting or str.format(). For high-volume competitive inputs, sys.stdin.readline is significantly faster than input().',
    syntaxAndStructure:
      '# Input reading:\nname = input("Enter name: ")\nage = int(input("Enter age: "))\n\n# Modern f-string formatting:\nprint(f"User: {name.title()}, Age: {age}, Next year: {age + 1}")\n\n# Specifying separators and line ends:\nprint("A", "B", "C", sep="-", end=";\\n")',
    codeExamples: [
      {
        title: 'Advanced F-String Capabilities (Python 3.8+)',
        code: `item = "Laptop"
price = 1249.507
quantity = 3
discount = 0.15

# Formatting specifiers: currency 2 decimal places, percentages, self-documenting {var=}
print(f"Item: {item}")
print(f"Unit Price: \${price:.2f}")
print(f"Subtotal: \${price * quantity:,.2f}")
print(f"Discount Rate: {discount:.0%}")

# Self-documenting debug expressions:
x = 25
print(f"{x * 4 = }")`,
        expectedOutput: `Item: Laptop
Unit Price: $1249.51
Subtotal: $3,748.52
Discount Rate: 15%
x * 4 = 100`,
        explanation:
          ':.2f formats to two decimal places, :, adds thousands commas, :.0% formats as a percentage, and {expr=} outputs the expression and its value.',
      },
      {
        title: 'Fast I/O for Coding Assessments',
        code: `import sys

def fast_read_integers(raw_input_line: str) -> list[int]:
    """Simulates reading space-separated integers from sys.stdin."""
    return list(map(int, raw_input_line.strip().split()))

data = "10 20 30 40 50"
numbers = fast_read_integers(data)
print("Parsed numbers:", numbers)
print("Sum:", sum(numbers))`,
        expectedOutput: `Parsed numbers: [10, 20, 30, 40, 50]
Sum: 150`,
        explanation: 'map(int, sys.stdin.readline().split()) is the standard idiom to parse large input lines in online placement assessments.',
      },
    ],
    realWorldApplications: [
      'Logging formatted execution statistics and audit events.',
      'Parsing structured tabular input in competitive coding platforms (HackerRank, LeetCode, CodeChef).',
    ],
    commonMistakes: [
      'Forgetting that input() always returns a string, leading to "5" + "5" = "55" instead of 10.',
      'Using slow string concatenation inside loops instead of f-strings or str.join().',
      'Forgetting to strip trailing newline characters when reading from sys.stdin.',
    ],
    interviewRelevance:
      'Interviewers observe candidate I/O speed and clean string interpolation during live coding rounds.',
    checkpoints: [
      { id: 'py-05-cp-1', label: 'Format numbers with f-strings (precision, commas, percentages).' },
      { id: 'py-05-cp-2', label: 'Use map(int, line.split()) for space-separated input parsing.' },
    ],
    practiceExercises: [
      {
        id: 'py-05-ex-1',
        title: 'Format a Student Report Card',
        difficulty: 'Beginner',
        type: 'coding',
        prompt: 'Format a receipt string with item name aligned left (width 15) and price aligned right (width 8, 2 decimals).',
        starterCode: 'def format_row(name: str, price: float) -> str:\n    pass',
        solution: `def format_row(name: str, price: float) -> str:
    return f"{name:<15} \${price:>7.2f}"

print(format_row("Coffee", 3.5))
print(format_row("Sandwich", 12.99))`,
        explanation: '<15 aligns left with 15 chars padding; >7.2f aligns right with 7 chars and 2 decimal points.',
      },
      {
        id: 'py-05-ex-2',
        title: 'Print Without Newlines',
        difficulty: 'Intermediate',
        type: 'coding',
        prompt: 'Print integers from 1 to 5 separated by " -> " ending with " [END]" on a single line.',
        starterCode: '# Print 1 -> 2 -> 3 -> 4 -> 5 [END]',
        solution: `for i in range(1, 6):
    if i < 5:
        print(i, end=" -> ")
    else:
        print(i, end=" [END]\\n")`,
        explanation: 'The end parameter of print() overrides the default newline character.',
      },
      {
        id: 'py-05-ex-3',
        title: 'Parse Multi-Line Inputs',
        difficulty: 'Advanced',
        type: 'coding',
        prompt: 'Write a parser that processes a simulated multiline string where line 1 is N, followed by N integers on line 2.',
        starterCode: 'def process_test_case(input_text: str) -> int:\n    pass',
        solution: `def process_test_case(input_text: str) -> int:
    lines = input_text.strip().splitlines()
    n = int(lines[0])
    nums = list(map(int, lines[1].split()))
    assert len(nums) == n
    return sum(nums)

print(process_test_case("3\\n10 20 30"))`,
        explanation: 'Standard competitive coding test harness parsing line count and space-separated integers.',
      },
    ],
    quizQuestions: [
      {
        id: 'py-05-q1',
        question: 'What is the return type of the built-in input() function in Python 3?',
        options: ['int', 'str', 'None', 'Depends on user input'],
        correctOptionIndex: 1,
        explanation: 'input() always returns a string, even if the user enters only digits.',
      },
      {
        id: 'py-05-q2',
        question: 'How do you print values separated by commas without spaces using print()?',
        options: [
          'print(a, b, c, join=",")',
          'print(a, b, c, sep=",")',
          'print(a, b, c, delimiter=",")',
          'print(a, b, c, end=",")',
        ],
        correctOptionIndex: 1,
        explanation: 'The sep parameter dictates the separator placed between multiple objects printed.',
      },
    ],
    revisionNotes: [
      'input() always returns str; wrap in int() or float() for numbers.',
      'F-strings (f"{var}") are evaluated at runtime and offer format specifiers like :.2f and :03d.',
      'print(..., sep=" ", end="\\n") controls object separation and line termination.',
    ],
  },
  {
    id: 'py-06-operators',
    moduleId: 'py-m1',
    moduleNumber: 1,
    moduleTitle: 'Python Fundamentals',
    topicNumber: 6,
    title: 'Operators & Operator Precedence',
    language: 'python',
    level: 'Beginner',
    whyItMatters:
      'Understanding integer division (//), exponentiation (**), bitwise tricks, short-circuit evaluation, and chained comparisons is essential for clean logic and coding tests.',
    explanation:
      'Python provides arithmetic operators (+, -, *, /, // for floor division, % for modulo, ** for power), comparison operators (==, !=, <, <=, >, >=), logical operators (and, or, not), bitwise operators (&, |, ^, ~, <<, >>), identity operators (is, is not), and membership operators (in, not in). Python uniquely supports chained comparisons like 10 < x < 20. In division, / always returns float, while // performs floor division.',
    syntaxAndStructure:
      '# Floor division & power:\nfloor_div = 17 // 5     # 3\npower = 2 ** 8          # 256\n\n# Chained comparison:\nis_valid = 10 <= x <= 100\n\n# Membership & Identity:\n"cat" in ["dog", "cat"]  # True\nx is None                # True',
    codeExamples: [
      {
        title: 'Floor Division and Modulo with Negatives',
        code: `# Floor division rounds down toward negative infinity (floor)
print(" 7 //  3 =",  7 //  3)  #  2
print("-7 //  3 =", -7 //  3)  # -3 (rounds DOWN toward -infinity!)
print(" 7 %   3 =",  7 %   3)  #  1
print("-7 %   3 =", -7 %   3)  #  2 (Python modulo has same sign as divisor!)`,
        expectedOutput: ` 7 //  3 = 2
-7 //  3 = -3
 7 %   3 = 1
-7 %   3 = 2`,
        explanation:
          'Unlike C++ which truncates toward zero (-7 / 3 = -2 in C++), Python floor division rounds down toward negative infinity, ensuring (a // b) * b + (a % b) == a always holds.',
      },
      {
        title: 'Short-Circuit Evaluation & Bitwise Operators',
        code: `def expensive_operation():
    print("Executing expensive operation...")
    return True

# Short-circuit in 'or': if first operand is True, second is skipped!
result_or = True or expensive_operation()
print("result_or:", result_or)

# Bitwise trick: check if power of two using n & (n - 1) == 0
def is_power_of_two(n: int) -> bool:
    return n > 0 and (n & (n - 1)) == 0

print("Is 16 power of two?", is_power_of_two(16))
print("Is 18 power of two?", is_power_of_two(18))`,
        expectedOutput: `result_or: True
Is 16 power of two? True
Is 18 power of two? False`,
        explanation:
          'expensive_operation() was never executed due to short-circuiting. The n & (n - 1) trick is a classic $O(1)$ bit manipulation question.',
      },
    ],
    realWorldApplications: [
      'Fast mathematical computations in games and cryptographic hashing.',
      'Bitmasking for permission systems (read/write/execute bits).',
    ],
    commonMistakes: [
      'Assuming -7 // 3 is -2; in Python it is -3.',
      'Confusing bitwise & (operates on bits) with logical and (operates on truthiness).',
      'Forgetting that ^ is bitwise XOR, not exponentiation (use ** for power).',
    ],
    interviewRelevance:
      'Bit manipulation problems (power of 2, single number, counting set bits) and short-circuit evaluation behavior in placement OA rounds.',
    checkpoints: [
      { id: 'py-06-cp-1', label: 'Understand floor division rounding toward negative infinity.' },
      { id: 'py-06-cp-2', label: 'Leverage short-circuiting and bitwise operators (&, |, ^, <<, >>).' },
    ],
    practiceExercises: [
      {
        id: 'py-06-ex-1',
        title: 'Count Set Bits (Hamming Weight)',
        difficulty: 'Beginner',
        type: 'coding',
        prompt: 'Write a function that counts how many 1 bits an integer has using bitwise operators.',
        starterCode: 'def count_set_bits(n: int) -> int:\n    pass',
        solution: `def count_set_bits(n: int) -> int:
    count = 0
    while n > 0:
        n &= (n - 1)  # Clears the lowest set bit
        count += 1
    return count

print(count_set_bits(29))  # 29 in binary is 11101 -> 4 set bits`,
        explanation: 'Brian Kernighan’s algorithm clears the lowest set bit in each iteration in O(k) time where k is number of set bits.',
      },
      {
        id: 'py-06-ex-2',
        title: 'Evaluate Operator Precedence',
        difficulty: 'Intermediate',
        type: 'output_prediction',
        prompt: 'What is the output of `2 ** 3 ** 2`?',
        solution: 'Output is 512. Exponentiation ** is right-associative: 3 ** 2 = 9, then 2 ** 9 = 512.',
        explanation: 'Most binary operators are left-to-right, but exponentiation is right-to-left.',
      },
      {
        id: 'py-06-ex-3',
        title: 'Chained Comparison Validator',
        difficulty: 'Advanced',
        type: 'coding',
        prompt: 'Write a validator `is_valid_triangle(a, b, c)` checking if all side lengths satisfy the triangle inequality theorem.',
        starterCode: 'def is_valid_triangle(a: int, b: int, c: int) -> bool:\n    pass',
        solution: `def is_valid_triangle(a: int, b: int, c: int) -> bool:
    return a + b > c and a + c > b and b + c > a and a > 0 and b > 0 and c > 0

print(is_valid_triangle(3, 4, 5))  # True
print(is_valid_triangle(1, 2, 3))  # False (1+2 is not > 3)`,
        explanation: 'Validates that the sum of any two sides is strictly greater than the third side.',
      },
    ],
    quizQuestions: [
      {
        id: 'py-06-q1',
        question: 'What is the result of -9 // 4 in Python?',
        options: ['-2', '-3', '-2.25', 'Raises ZeroDivisionError'],
        correctOptionIndex: 1,
        explanation: 'Python floor division rounds down toward negative infinity. -9 / 4 is -2.25; rounding down yields -3.',
      },
      {
        id: 'py-06-q2',
        question: 'Which operator is right-associative in Python?',
        options: ['*', '/', '**', '%'],
        correctOptionIndex: 2,
        explanation: 'The exponentiation operator ** groups from right to left (e.g. 2 ** 3 ** 2 evaluates as 2 ** (3 ** 2)).',
      },
    ],
    revisionNotes: [
      '// performs floor division (rounds toward -infinity).',
      '** is exponentiation and is right-associative.',
      'and/or operators short-circuit and return the decisive operand.',
    ],
  },
  {
    id: 'py-07-conditionals',
    moduleId: 'py-m1',
    moduleNumber: 1,
    moduleTitle: 'Python Fundamentals',
    topicNumber: 7,
    title: 'Conditional Statements & Ternary Expressions',
    language: 'python',
    level: 'Beginner',
    whyItMatters:
      'Conditionals drive branch decisions in all algorithms. Mastering concise ternary expressions and structural pattern matching (`match-case`) creates clean, bug-free code.',
    explanation:
      'Python conditionals utilize if, elif, and else statements. The ternary conditional expression (value_if_true if condition else value_if_false) allows concise inline assignment. In Python 3.10+, structural pattern matching (match-case) introduces powerful pattern-based branching similar to switch-case but with tuple/class pattern destructuring and guards.',
    syntaxAndStructure:
      '# Standard if-elif-else:\nif condition_1:\n    action_1()\nelif condition_2:\n    action_2()\nelse:\n    default_action()\n\n# Ternary expression:\nstatus = "Adult" if age >= 18 else "Minor"\n\n# Python 3.10+ Pattern Matching:\nmatch status_code:\n    case 200:\n        return "OK"\n    case 404:\n        return "Not Found"\n    case _:\n        return "Unknown"',
    codeExamples: [
      {
        title: 'Ternary Expressions and Nested Conditions',
        code: `def get_ticket_price(age: int, is_student: bool) -> float:
    # Ternary expression with nested condition
    base_price = 15.0 if age >= 18 else 8.0
    discount = 0.20 if is_student else 0.0
    final_price = base_price * (1.0 - discount)
    return round(final_price, 2)

print("Adult Non-student:", get_ticket_price(25, False))
print("Adult Student:", get_ticket_price(20, True))
print("Child:", get_ticket_price(10, False))`,
        expectedOutput: `Adult Non-student: 15.0
Adult Student: 12.0
Child: 8.0`,
        explanation: 'Ternary expressions allow clean inline assignment without multi-line if/else blocks.',
      },
      {
        title: 'Python 3.10+ Structural Pattern Matching with Guards',
        code: `def handle_command(command: tuple) -> str:
    match command:
        case ("go", direction) if direction in ("north", "south", "east", "west"):
            return f"Heading {direction.title()}"
        case ("take", item):
            return f"Taking item: {item}"
        case ("quit",):
            return "Exiting simulation"
        case _:
            return "Unrecognized command format"

print(handle_command(("go", "north")))
print(handle_command(("take", "sword")))
print(handle_command(("jump",)))`,
        expectedOutput: `Heading North
Taking item: sword
Unrecognized command format`,
        explanation:
          'match-case matches tuple structures, binds variables (direction, item), and tests boolean guards (if direction in ...).',
      },
    ],
    realWorldApplications: [
      'API routing and status code handling.',
      'Parsing protocol messages and CLI arguments.',
    ],
    commonMistakes: [
      'Using assignment (=) instead of comparison (==) inside if condition (though Python syntax disallows = inside simple if).',
      'Over-nesting if statements when guard clauses (early returns) produce cleaner flat code.',
      'Missing the colon (:) after if / elif / else.',
    ],
    interviewRelevance:
      'Writing clean guard clauses in interview coding problems reduces indentation depth and impresses interviewers.',
    checkpoints: [
      { id: 'py-07-cp-1', label: 'Use ternary expressions: x if condition else y.' },
      { id: 'py-07-cp-2', label: 'Understand Python 3.10 match-case structure.' },
    ],
    practiceExercises: [
      {
        id: 'py-07-ex-1',
        title: 'Leap Year Classifier',
        difficulty: 'Beginner',
        type: 'coding',
        prompt: 'Write `is_leap_year(year)`: divisible by 4, not by 100 unless divisible by 400.',
        starterCode: 'def is_leap_year(year: int) -> bool:\n    pass',
        solution: `def is_leap_year(year: int) -> bool:
    return (year % 4 == 0 and year % 100 != 0) or (year % 400 == 0)

print(is_leap_year(2024))  # True
print(is_leap_year(1900))  # False
print(is_leap_year(2000))  # True`,
        explanation: 'Classic placement test question on multi-condition logic.',
      },
      {
        id: 'py-07-ex-2',
        title: 'Guard Clause Refactoring',
        difficulty: 'Intermediate',
        type: 'coding',
        prompt: 'Refactor a deeply nested if-tree into flat guard clauses with early returns.',
        starterCode: 'def withdraw(balance, amount):\n    # Return "Insufficient funds", "Invalid amount", or new balance\n    pass',
        solution: `def withdraw(balance: float, amount: float):
    if amount <= 0:
        return "Invalid amount"
    if amount > balance:
        return "Insufficient funds"
    return balance - amount

print(withdraw(100.0, -5))   # Invalid amount
print(withdraw(100.0, 150))  # Insufficient funds
print(withdraw(100.0, 40))   # 60.0`,
        explanation: 'Early returns eliminate deep nesting and simplify control flow.',
      },
      {
        id: 'py-07-ex-3',
        title: 'Pattern Match HTTP Responses',
        difficulty: 'Advanced',
        type: 'coding',
        prompt: 'Use match-case to categorize HTTP status codes into 2xx (Success), 4xx (Client Error), 5xx (Server Error).',
        starterCode: 'def categorize_status(code: int) -> str:\n    pass',
        solution: `def categorize_status(code: int) -> str:
    match code:
        case c if 200 <= c < 300:
            return "Success"
        case c if 400 <= c < 500:
            return "Client Error"
        case c if 500 <= c < 600:
            return "Server Error"
        case _:
            return "Other"

print(categorize_status(204))  # Success
print(categorize_status(404))  # Client Error`,
        explanation: 'Demonstrates pattern matching with numeric range guards.',
      },
    ],
    quizQuestions: [
      {
        id: 'py-07-q1',
        question: 'What is the syntax for a ternary conditional expression in Python?',
        options: [
          'condition ? val_if_true : val_if_false',
          'val_if_true if condition else val_if_false',
          'if condition then val_if_true else val_if_false',
          'val_if_true ? condition : val_if_false',
        ],
        correctOptionIndex: 1,
        explanation: 'Python uses "A if condition else B" for inline ternary expressions.',
      },
      {
        id: 'py-07-q2',
        question: 'In Python 3.10+, which wildcard symbol represents the default catch-all branch in match-case?',
        options: ['*', 'default', '_', 'else'],
        correctOptionIndex: 2,
        explanation: 'case _ acts as the wildcard pattern that matches any value not matched by preceding cases.',
      },
    ],
    revisionNotes: [
      'Use guard clauses to flatten nested logic.',
      'Ternary syntax: value if condition else fallback.',
      'match-case (Python 3.10+) provides structural pattern matching.',
    ],
  },
  {
    id: 'py-08-loops',
    moduleId: 'py-m1',
    moduleNumber: 1,
    moduleTitle: 'Python Fundamentals',
    topicNumber: 8,
    title: 'Loops, Iteration & Loop Else Clauses',
    language: 'python',
    level: 'Beginner',
    whyItMatters:
      'Iteration is the heartbeat of all data processing. Understanding range(), enumerate(), zip(), break, continue, and the unique for-else construct is mandatory for DSA.',
    explanation:
      'Python supports while and for loops. for loops are iterator-based: they iterate directly over any iterable object (lists, strings, tuples, dictionaries, generators). range(start, stop, step) generates sequences on demand with $O(1)$ memory. enumerate() provides index-value pairs, while zip() iterates multiple sequences in parallel. Crucially, Python loops support an else clause: the else block executes if and only if the loop terminates normally without hitting a break statement.',
    syntaxAndStructure:
      '# for loop with range:\nfor i in range(start, stop, step):\n    pass\n\n# enumerate & zip:\nfor index, value in enumerate(items):\n    pass\n\nfor a, b in zip(list_a, list_b):\n    pass\n\n# for-else construct:\nfor item in collection:\n    if condition:\n        break\nelse:\n    # Runs ONLY if loop completed without break!\n    pass',
    codeExamples: [
      {
        title: 'The for-else Construct for Search Operations',
        code: `def find_prime(numbers: list[int]) -> int | None:
    for num in numbers:
        if num < 2:
            continue
        # Check divisibility
        for i in range(2, int(num ** 0.5) + 1):
            if num % i == 0:
                break
        else:
            # Executes if inner loop finished without break (num is prime!)
            return num
    return None

print("First prime in [4, 6, 8, 9, 11, 15]:", find_prime([4, 6, 8, 9, 11, 15]))
print("First prime in [4, 6, 8]:", find_prime([4, 6, 8]))`,
        expectedOutput: `First prime in [4, 6, 8, 9, 11, 15]: 11
First prime in [4, 6, 8]: None`,
        explanation: 'for-else eliminates the need for boolean flags like found = False when searching.',
      },
      {
        title: 'Iterating with enumerate() and zip()',
        code: `names = ["Alice", "Bob", "Charlie"]
scores = [85, 92, 78]

# Using zip and enumerate together:
for rank, (name, score) in enumerate(zip(names, scores), start=1):
    print(f"Rank {rank}: {name} -> {score} pts")`,
        expectedOutput: `Rank 1: Alice -> 85 pts
Rank 2: Bob -> 92 pts
Rank 3: Charlie -> 78 pts`,
        explanation: 'enumerate(..., start=1) assigns 1-based ranks cleanly without manual counter variables.',
      },
    ],
    realWorldApplications: [
      'Batch processing database records and pagination.',
      'Linear and 2D matrix traversal in algorithmic problems.',
    ],
    commonMistakes: [
      'Modifying a list while iterating over it with a for loop; always iterate over a copy `for item in items[:]:`.',
      'Thinking range(1, 5) includes 5; range stops at stop - 1 (values 1, 2, 3, 4).',
      'Misunderstanding loop else: it runs when loop ends naturally, NOT when condition fails.',
    ],
    interviewRelevance:
      'Interviewers test candidate familiarity with Python idioms: replacing range(len(arr)) with enumerate() and knowing how for-else works.',
    checkpoints: [
      { id: 'py-08-cp-1', label: 'Use enumerate() instead of range(len(arr)).' },
      { id: 'py-08-cp-2', label: 'Master for-else construct for clean search loops.' },
    ],
    practiceExercises: [
      {
        id: 'py-08-ex-1',
        title: 'Reverse Loop with Step',
        difficulty: 'Beginner',
        type: 'coding',
        prompt: 'Use `range()` to print numbers from 10 down to 2 in steps of -2 on a single line.',
        starterCode: '# Print: 10 8 6 4 2',
        solution: `output = [str(x) for x in range(10, 1, -2)]
print(" ".join(output))  # 10 8 6 4 2`,
        explanation: 'range(10, 1, -2) starts at 10, stops before 1, decrementing by 2.',
      },
      {
        id: 'py-08-ex-2',
        title: 'Safe List Modification',
        difficulty: 'Intermediate',
        type: 'debugging',
        prompt: 'Fix the bug where removing odd numbers while iterating misses elements: `nums = [1, 3, 4, 6]; for x in nums: if x % 2: nums.remove(x)`',
        starterCode: 'nums = [1, 3, 4, 6]\n# Fix deletion bug',
        solution: `nums = [1, 3, 4, 6]
# Iterate over a slice copy, or use list comprehension:
nums = [x for x in nums if x % 2 == 0]
print(nums)  # [4, 6]`,
        explanation: 'Mutating a list while iterating shifts internal indices and skips adjacent elements. List comprehension is the idiomatic fix.',
      },
      {
        id: 'py-08-ex-3',
        title: 'Two Pointer Pair Search with While Loop',
        difficulty: 'Advanced',
        type: 'coding',
        prompt: 'Given a sorted list, find if any two numbers sum to target in O(n) using a while loop with two pointers.',
        starterCode: 'def has_pair_sum(nums: list[int], target: int) -> bool:\n    pass',
        solution: `def has_pair_sum(nums: list[int], target: int) -> bool:
    left, right = 0, len(nums) - 1
    while left < right:
        current_sum = nums[left] + nums[right]
        if current_sum == target:
            return True
        elif current_sum < target:
            left += 1
        else:
            right -= 1
    return False

print(has_pair_sum([1, 2, 4, 7, 11], 15))  # True (4 + 11)`,
        explanation: 'Classic two-pointer technique on sorted arrays in $O(n)$ time and $O(1)$ space.',
      },
    ],
    quizQuestions: [
      {
        id: 'py-08-q1',
        question: 'When does the "else" block attached to a Python "for" loop execute?',
        options: [
          'Whenever the loop condition is initially false',
          'Only if the loop body terminates via a "break" statement',
          'Only if the loop completes all iterations without encountering a "break"',
          'After every single iteration of the loop',
        ],
        correctOptionIndex: 2,
        explanation: 'The loop else block executes only when the loop terminates naturally without a break statement.',
      },
      {
        id: 'py-08-q2',
        question: 'What is the idiomatic way to iterate over both indices and values of a list in Python?',
        options: [
          'for i in range(len(lst)): val = lst[i]',
          'for i, val in enumerate(lst):',
          'for i, val in zip(range(lst), lst):',
          'for val, i in lst.items():',
        ],
        correctOptionIndex: 1,
        explanation: 'enumerate(lst) yields (index, value) tuples directly, avoiding manual index lookups.',
      },
    ],
    revisionNotes: [
      'range(start, stop, step) generates values on-demand in O(1) space.',
      'for-else executes only if no break occurred.',
      'Never mutate a collection while iterating directly over it.',
    ],
  },
  {
    id: 'py-09-pattern-programming',
    moduleId: 'py-m1',
    moduleNumber: 1,
    moduleTitle: 'Python Fundamentals',
    topicNumber: 9,
    title: 'Pattern Programming & Nested Loops',
    language: 'python',
    level: 'Beginner',
    whyItMatters:
      'Service-based and technical screening rounds frequently use pattern programs to test nested loop indexing, boundary control, and spatial visualization skills.',
    explanation:
      'Pattern programming involves printing 2D shapes (right-angled triangles, inverted pyramids, diamonds, Pascal\'s triangle) using nested loops. In Python, string multiplication ("*" * count) simplifies row generation, but interviewers often expect algorithmic nested loop index calculations (row i, column j) to verify foundational logical reasoning.',
    syntaxAndStructure:
      '# Outer loop controls rows (i)\n# Inner loop controls columns (j) or spacing\n\nfor i in range(n):\n    # 1. Print leading spaces\n    # 2. Print stars / numbers\n    # 3. Print newline',
    codeExamples: [
      {
        title: 'Pyramid and Diamond Star Patterns',
        code: `def print_diamond(n: int):
    # Upper half
    for i in range(n):
        spaces = " " * (n - i - 1)
        stars = "*" * (2 * i + 1)
        print(spaces + stars)
    # Lower half
    for i in range(n - 2, -1, -1):
        spaces = " " * (n - i - 1)
        stars = "*" * (2 * i + 1)
        print(spaces + stars)

print_diamond(3)`,
        expectedOutput: `  *
 ***
*****
 ***
  *`,
        explanation: 'Row i has n - i - 1 leading spaces and 2 * i + 1 characters.',
      },
      {
        title: 'Floyd’s Triangle & Number Patterns',
        code: `def print_floyds_triangle(rows: int):
    current = 1
    for r in range(1, rows + 1):
        row_vals = []
        for c in range(r):
            row_vals.append(str(current))
            current += 1
        print(" ".join(row_vals))

print_floyds_triangle(4)`,
        expectedOutput: `1
2 3
4 5 6
7 8 9 10`,
        explanation: 'Floyd\'s triangle places sequentially incrementing integers across consecutively widening rows.',
      },
    ],
    realWorldApplications: [
      'Visualizing 2D coordinate spaces and matrix transformations.',
      'Foundational practice for 2D array and grid dynamic programming.',
    ],
    commonMistakes: [
      'Off-by-one errors in range() boundaries leading to extra or missing rows/spaces.',
      'Over-relying on string multiplication when an interview explicitly asks for pure nested loops.',
    ],
    interviewRelevance:
      'Standard round-1 technical screening problem in companies like TCS, Infosys, Cognizant, and Wipro.',
    checkpoints: [
      { id: 'py-09-cp-1', label: 'Formulate mathematical relations between row i and column j.' },
      { id: 'py-09-cp-2', label: 'Implement pyramids, diamonds, and Pascal triangles.' },
    ],
    practiceExercises: [
      {
        id: 'py-09-ex-1',
        title: 'Pascal’s Triangle Row Generator',
        difficulty: 'Beginner',
        type: 'coding',
        prompt: 'Write a function that generates the first N rows of Pascal’s triangle as lists of integers.',
        starterCode: 'def generate_pascals(num_rows: int) -> list[list[int]]:\n    pass',
        solution: `def generate_pascals(num_rows: int) -> list[list[int]]:
    triangle = []
    for r in range(num_rows):
        row = [1] * (r + 1)
        for c in range(1, r):
            row[c] = triangle[r - 1][c - 1] + triangle[r - 1][c]
        triangle.append(row)
    return triangle

print(generate_pascals(4))  # [[1], [1, 1], [1, 2, 1], [1, 3, 3, 1]]`,
        explanation: 'Each internal element is the sum of the two elements directly above it in the previous row.',
      },
      {
        id: 'py-09-ex-2',
        title: 'Inverted Number Triangle',
        difficulty: 'Intermediate',
        type: 'coding',
        prompt: 'Print an inverted right triangle of numbers for N=4: row 1 is 1 2 3 4, row 2 is 1 2 3, row 3 is 1 2, row 4 is 1.',
        starterCode: 'def print_inverted(n: int):\n    pass',
        solution: `def print_inverted(n: int):
    for r in range(n, 0, -1):
        print(" ".join(str(i) for i in range(1, r + 1)))

print_inverted(4)`,
        explanation: 'Outer loop counts down from N to 1, while inner loop iterates from 1 to current row count.',
      },
      {
        id: 'py-09-ex-3',
        title: 'Hollow Square Pattern',
        difficulty: 'Advanced',
        type: 'coding',
        prompt: 'Print a hollow square of size N where stars are printed only on the perimeter (border).',
        starterCode: 'def print_hollow_square(n: int):\n    pass',
        solution: `def print_hollow_square(n: int):
    for r in range(n):
        if r == 0 or r == n - 1:
            print("*" * n)
        else:
            print("*" + " " * (n - 2) + "*")

print_hollow_square(4)`,
        explanation: 'First and last rows are completely solid; internal rows have stars at index 0 and n-1 with spaces in between.',
      },
    ],
    quizQuestions: [
      {
        id: 'py-09-q1',
        question: 'In a pyramid of height N, how many stars are printed on row i (where i is 0-indexed)?',
        options: ['i + 1', '2 * i + 1', '2 * i', 'i * i'],
        correctOptionIndex: 1,
        explanation: 'For row 0: 1 star; row 1: 3 stars; row 2: 5 stars -> formula is 2 * i + 1.',
      },
      {
        id: 'py-09-q2',
        question: 'What is the time complexity of generating an N x N star pattern using nested loops?',
        options: ['O(N)', 'O(N log N)', 'O(N^2)', 'O(2^N)'],
        correctOptionIndex: 2,
        explanation: 'The outer loop runs N times and the inner loop runs proportional to N times, yielding O(N^2) total operations.',
      },
    ],
    revisionNotes: [
      'Outer loop dictates row index; inner loop dictates column characters.',
      'String multiplication ("*" * k) accelerates row creation in Python.',
      'Break symmetric patterns into upper and lower loops.',
    ],
  },
  {
    id: 'py-10-fundamental-assessment',
    moduleId: 'py-m1',
    moduleNumber: 1,
    moduleTitle: 'Python Fundamentals',
    topicNumber: 10,
    title: 'Python Fundamentals Comprehensive Review & Placement Quiz',
    language: 'python',
    level: 'Intermediate',
    whyItMatters:
      'Synthesizing execution models, variable references, type conversions, I/O, operators, and control flow solidifies placement readiness for round-1 technical assessments.',
    explanation:
      'This capstone topic consolidates Module 1 fundamentals: bytecode compilation, reference assignment, immutability, arbitrary-precision integers, short-circuit evaluation, formatted string interpolation, and pattern generation. We evaluate complex edge cases and multi-concept questions frequently asked in fresher recruitment tests.',
    syntaxAndStructure:
      '# Summary Checklist:\n# 1. Bytecode: source -> .pyc -> PVM\n# 2. Memory: variables are object pointers; == (value) vs is (identity)\n# 3. Dynamic typing: arbitrary-precision int, immutable float/str/bool\n# 4. Falsy: None, 0, 0.0, "", [], (), {}, set()\n# 5. Operators: // (floor towards -inf), ** (right-associative), bitwise\n# 6. Control flow: ternary, match-case, for-else',
    codeExamples: [
      {
        title: 'Comprehensive Edge Case Demonstration',
        code: `# 1. Mutable reference vs identity
x = [1, 2, 3]
y = x
y.append(4)
print("x is y:", x is y, "| x:", x)

# 2. Integer division edge case
print("-11 // 4 =", -11 // 4)

# 3. F-string formatting
ratio = 7 / 9
print(f"Ratio: {ratio:.3f}")`,
        expectedOutput: `x is y: True | x: [1, 2, 3, 4]
-11 // 4 = -3
Ratio: 0.778`,
        explanation: 'Highlights reference sharing (mutating y mutates x), negative floor division (-3), and rounded f-string formatting.',
      },
      {
        title: 'Full Placement Simulation Problem: Number Category Analyzer',
        code: `def analyze_number(val: int) -> dict:
    return {
        "value": val,
        "is_even": val % 2 == 0,
        "is_power_of_two": val > 0 and (val & (val - 1)) == 0,
        "sign": "Positive" if val > 0 else ("Negative" if val < 0 else "Zero"),
    }

print(analyze_number(16))
print(analyze_number(-7))`,
        expectedOutput: `{'value': 16, 'is_even': True, 'is_power_of_two': True, 'sign': 'Positive'}
{'value': -7, 'is_even': False, 'is_power_of_two': False, 'sign': 'Negative'}`,
        explanation: 'Combines bitwise checks, modulo checks, and nested ternary expressions in a clean dictionary response.',
      },
    ],
    realWorldApplications: [
      'Solving multi-step algorithmic problems under timed assessment conditions.',
      'Writing bug-free scripts without unintended reference side-effects.',
    ],
    commonMistakes: [
      'Assuming y = x creates a copy of a list; it only copies the reference.',
      'Forgetting that 0 and empty strings are falsy when validating user arguments.',
    ],
    interviewRelevance:
      'Capstone assessment simulating online assessment MCQs and code outputs.',
    checkpoints: [
      { id: 'py-10-cp-1', label: 'Pass all Module 1 review exercises independently.' },
      { id: 'py-10-cp-2', label: 'Attain 100% accuracy on Python fundamentals MCQs.' },
    ],
    practiceExercises: [
      {
        id: 'py-10-ex-1',
        title: 'Simulate FizzBuzz One-Liner',
        difficulty: 'Beginner',
        type: 'coding',
        prompt: 'Implement FizzBuzz for numbers 1 to 15 returning "Fizz" for multiples of 3, "Buzz" for 5, "FizzBuzz" for both, or the number string.',
        starterCode: 'def fizz_buzz(n: int) -> list[str]:\n    pass',
        solution: `def fizz_buzz(n: int) -> list[str]:
    result = []
    for i in range(1, n + 1):
        if i % 15 == 0:
            result.append("FizzBuzz")
        elif i % 3 == 0:
            result.append("Fizz")
        elif i % 5 == 0:
            result.append("Buzz")
        else:
            result.append(str(i))
    return result

print(fizz_buzz(15))`,
        explanation: 'Standard screening question checking modular arithmetic and ordering of conditions.',
      },
      {
        id: 'py-10-ex-2',
        title: 'Predict Tricky Chained Boolean Logic',
        difficulty: 'Intermediate',
        type: 'output_prediction',
        prompt: 'What does `print(1 < 2 < 3 > 4)` print in Python?',
        solution: 'Output is False. Chained comparisons expand to `(1 < 2) and (2 < 3) and (3 > 4)`. Since 3 > 4 is False, the entire chain evaluates to False.',
        explanation: 'Python chains relational operators as conjunctions with short-circuit evaluation.',
      },
      {
        id: 'py-10-ex-3',
        title: 'Digit Extraction Without Strings',
        difficulty: 'Advanced',
        type: 'coding',
        prompt: 'Write a function that reverses an integer using only arithmetic operators (% and //), returning 0 if overflow occurred.',
        starterCode: 'def reverse_integer(x: int) -> int:\n    pass',
        solution: `def reverse_integer(x: int) -> int:
    sign = -1 if x < 0 else 1
    x = abs(x)
    rev = 0
    while x > 0:
        rev = rev * 10 + (x % 10)
        x //= 10
    result = sign * rev
    # 32-bit signed integer boundary check for interview simulation
    if result < -2**31 or result > 2**31 - 1:
        return 0
    return result

print(reverse_integer(12345))   # 54321
print(reverse_integer(-987))    # -789`,
        explanation: 'Classic placement DSA problem executed purely with math operators without converting to string.',
      },
    ],
    quizQuestions: [
      {
        id: 'py-10-q1',
        question: 'What is the output of: a = [1, 2]; b = [1, 2]; print(a == b, a is b)?',
        options: ['True True', 'True False', 'False True', 'False False'],
        correctOptionIndex: 1,
        explanation: 'a == b is True because the elements are equal in value; a is b is False because they are distinct list objects in heap memory.',
      },
      {
        id: 'py-10-q2',
        question: 'Which of the following will evaluate to True in Python?',
        options: ['bool([])', 'bool(0.0)', 'bool(" ")', 'bool(None)'],
        correctOptionIndex: 2,
        explanation: 'A string containing a single space " " is not empty (length is 1), so it evaluates to True.',
      },
    ],
    revisionNotes: [
      'Mastery of Module 1: Python fundamentals, memory models, operators, I/O, and control flow.',
      'Variables hold object references; use copy/deepcopy for independent clones.',
      'Ready to advance to Module 2: Python Data Structures.',
    ],
  },
];

export const module1: MasteryModule = {
  id: 'py-m1',
  number: 1,
  title: 'Python Fundamentals',
  description: 'Language architecture, syntax, memory model, types, I/O, operators, and control flow.',
  language: 'python',
  topics: module1Topics,
  moduleAssessment: {
    id: 'py-m1-exam',
    title: 'Python Fundamentals Milestone Assessment',
    passingScorePercentage: 70,
    questions: module1Topics.flatMap((t) => t.quizQuestions),
  },
  revisionQuestions: [
    'Explain how CPython executes code from source file to machine instructions.',
    'What is the difference between == and is in Python?',
    'Why does -7 // 3 evaluate to -3 in Python?',
    'How do f-strings compare to %-formatting and str.format()?',
    'What is the behavior of the else clause in a for/while loop?',
  ],
};
