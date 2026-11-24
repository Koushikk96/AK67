import { MasteryTopic, MasteryModule } from '@/types/mastery';

export const module5Topics: MasteryTopic[] = [
  {
    id: 'py-44-exception-handling',
    moduleId: 'py-m5',
    moduleNumber: 5,
    moduleTitle: 'Advanced Python',
    topicNumber: 44,
    title: 'Exception Handling: try, except, else, finally & raise',
    language: 'python',
    level: 'Beginner',
    whyItMatters:
      'Unhandled runtime exceptions crash services. The try-except-else-finally construct allows building resilient systems that recover gracefully from IO failures, network drops, and bad user input.',
    explanation:
      'Python uses structured exception handling. The try block contains code that might raise an exception. The except block catches and handles specific exception classes. The else block executes if and only if NO exception was raised in the try block (ideal for code that relies on the try block succeeding). The finally block ALWAYS executes regardless of whether an exception occurred, was caught, or was re-raised (ideal for resource cleanup like closing files or connections). The raise keyword throws exceptions explicitly.',
    syntaxAndStructure:
      'try:\n    # Code that may fail\n    result = process_data()\nexcept (ValueError, TypeError) as e:\n    # Specific error handling\n    log_error(e)\nelse:\n    # Runs ONLY if try succeeded\n    save_result(result)\nfinally:\n    # Runs ALWAYS (cleanup)\n    cleanup_resources()',
    codeExamples: [
      {
        title: 'Full try-except-else-finally Flow in Action',
        code: `def safe_divide(a: float, b: float) -> float | None:
    print(f"\\n--- Attempting {a} / {b} ---")
    try:
        result = a / b
    except ZeroDivisionError as e:
        print("Caught ZeroDivisionError:", e)
        return None
    except TypeError as e:
        print("Caught TypeError:", e)
        return None
    else:
        print("Else block executed: Division succeeded with result =", result)
        return result
    finally:
        print("Finally block executed: Operation finished.")

safe_divide(10, 2)
safe_divide(10, 0)`,
        expectedOutput: `--- Attempting 10 / 2 ---
Else block executed: Division succeeded with result = 5.0
Finally block executed: Operation finished.

--- Attempting 10 / 0 ---
Caught ZeroDivisionError: division by zero
Finally block executed: Operation finished.`,
        explanation: 'In the first call, else executes because no exception was raised. In the second call, except catches the ZeroDivisionError. In both calls, finally executes.',
      },
      {
        title: 'Re-raising Exceptions with Context (raise from)',
        code: `class DatabaseQueryError(Exception):
    pass

def query_database(sql: str):
    try:
        # Simulate bad connection or syntax error
        raise ConnectionResetError("Connection lost to DB host")
    except ConnectionResetError as err:
        # Chain exception context using 'raise ... from err'
        raise DatabaseQueryError("Failed to execute database query") from err

try:
    query_database("SELECT * FROM users")
except DatabaseQueryError as e:
    print(f"Top error: {e}")
    print(f"Original cause: {e.__cause__}")`,
        expectedOutput: `Top error: Failed to execute database query
Original cause: Connection lost to DB host`,
        explanation: 'raise NewException from original_exception preserves stack trace lineage for root cause analysis.',
      },
    ],
    realWorldApplications: [
      'Catching network timeouts in HTTP REST clients and triggering retries.',
      'Sanitizing corrupted user form inputs without terminating web servers.',
    ],
    commonMistakes: [
      'Using bare `except:` without specifying exception classes, which catches `KeyboardInterrupt` and `SystemExit`, making scripts impossible to terminate with Ctrl+C.',
      'Putting code in the `try` block that should be in the `else` block, which can accidentally mask unexpected bugs.',
    ],
    interviewRelevance:
      'Frequent interview questions on: "What is the purpose of the else block in try-except?" and "Why is bare except dangerous?".',
    checkpoints: [
      { id: 'py-44-cp-1', label: 'Use else for logic that runs only on success.' },
      { id: 'py-44-cp-2', label: 'Never catch bare except:; catch specific Exception subclasses.' },
    ],
    practiceExercises: [
      {
        id: 'py-44-ex-1',
        title: 'Robust Integer Parser',
        difficulty: 'Beginner',
        type: 'coding',
        prompt: 'Write `parse_positive_int(s)` returning the int if positive, or raising `ValueError` with clear messages for non-ints or non-positive numbers.',
        starterCode: 'def parse_positive_int(s: str) -> int:\n    pass',
        solution: `def parse_positive_int(s: str) -> int:
    try:
        val = int(s)
    except (ValueError, TypeError):
        raise ValueError(f"Cannot parse '{s}' as an integer.")
    if val <= 0:
        raise ValueError(f"Expected positive integer, got {val}.")
    return val

print(parse_positive_int("42"))`,
        explanation: 'Catches parsing errors and validates domain range constraints.',
      },
      {
        id: 'py-44-ex-2',
        title: 'Predict Finally Return Value Override',
        difficulty: 'Intermediate',
        type: 'output_prediction',
        prompt: 'What does this return: `def test(): try: return 1; finally: return 2; print(test())`?',
        solution: 'Returns 2. A return statement in a `finally` block suppresses any return statement or active exception from the `try` block.',
        explanation: 'Returning from inside a finally block silently discards the previous return value or active exception.',
      },
      {
        id: 'py-44-ex-3',
        title: 'Safe Resource Release with Finally',
        difficulty: 'Advanced',
        type: 'coding',
        prompt: 'Simulate acquiring and releasing a lock in a try-finally block even if a computation raises an unhandled error.',
        starterCode: '# Acquire lock and guarantee release in finally',
        solution: `class DummyLock:
    def __init__(self): self.locked = False
    def acquire(self): self.locked = True; print("Lock acquired")
    def release(self): self.locked = False; print("Lock released")

lock = DummyLock()
lock.acquire()
try:
    # Simulated division error
    x = 1 / 0
except ZeroDivisionError:
    print("Caught error inside try")
finally:
    lock.release()

print("Lock is locked?", lock.locked)  # False`,
        explanation: 'finally guarantees lock release regardless of exceptions.',
      },
    ],
    quizQuestions: [
      {
        id: 'py-44-q1',
        question: 'When does the "else" block in a try-except statement execute?',
        options: [
          'Whenever an exception is caught and handled',
          'Only when the try block executes without raising any exceptions',
          'Only after the finally block executes',
          'It executes on every run',
        ],
        correctOptionIndex: 1,
        explanation: 'The else block runs only if the code in the try block completes successfully with zero exceptions.',
      },
      {
        id: 'py-44-q2',
        question: 'Why is using a bare "except:" strongly discouraged by PEP 8?',
        options: [
          'It is slower to execute in CPython',
          'It catches BaseException, which intercepts KeyboardInterrupt (Ctrl+C) and SystemExit, preventing normal termination',
          'It is not valid syntax in Python 3',
          'It causes memory leaks',
        ],
        correctOptionIndex: 1,
        explanation: 'Bare except: catches BaseException rather than Exception, which intercepts Ctrl+C (KeyboardInterrupt) and prevents clean exit.',
      },
    ],
    revisionNotes: [
      'try contains risky code; except catches specific errors.',
      'else runs only on zero exceptions; finally runs unconditionally.',
      'Use raise from original_err to chain exception lineage.',
    ],
  },
  {
    id: 'py-45-custom-exceptions',
    moduleId: 'py-m5',
    moduleNumber: 5,
    moduleTitle: 'Advanced Python',
    topicNumber: 45,
    title: 'Exception Hierarchy & Custom Exceptions',
    language: 'python',
    level: 'Intermediate',
    whyItMatters:
      'Production applications define domain-specific custom exceptions (e.g. `UserNotFoundError`, `InsufficientFundsError`) to provide structured, actionable error diagnostics.',
    explanation:
      'All Python exceptions inherit from `BaseException`. Standard application errors inherit from `Exception`. System-exiting events (`KeyboardInterrupt`, `SystemExit`, `GeneratorExit`) inherit directly from `BaseException` and should never be caught in application code. Custom exceptions are created by subclassing `Exception` (or a more specific built-in like `ValueError`). Custom exceptions can carry metadata attributes (like error codes and entity IDs).',
    syntaxAndStructure:
      'class AppError(Exception):\n    """Base application error."""\n    pass\n\nclass ResourceNotFoundError(AppError):\n    def __init__(self, resource: str, resource_id: str):\n        super().__init__(f"{resource} with ID \'{resource_id}\' not found.")\n        self.resource = resource\n        self.resource_id = resource_id',
    codeExamples: [
      {
        title: 'Building a Domain Exception Hierarchy',
        code: `class BankingError(Exception):
    """Base error for all banking operations."""
    pass

class InsufficientFundsError(BankingError):
    def __init__(self, account_id: str, balance: float, attempted: float):
        super().__init__(f"Account '{account_id}' has \${balance:.2f}, attempted \${attempted:.2f}")
        self.account_id = account_id
        self.balance = balance
        self.attempted = attempted

def debit(account_id: str, balance: float, amount: float) -> float:
    if amount > balance:
        raise InsufficientFundsError(account_id, balance, amount)
    return balance - amount

try:
    debit("ACC-101", 150.0, 300.0)
except InsufficientFundsError as e:
    print(f"Caught: {e}")
    print(f"Deficit: \${e.attempted - e.balance:.2f}")`,
        expectedOutput: `Caught: Account 'ACC-101' has $150.00, attempted $300.00
Deficit: $150.00`,
        explanation: 'Custom exceptions preserve structured attributes that API error formatters can translate into JSON responses.',
      },
      {
        title: 'Inspecting Python Exception Hierarchy',
        code: `print("issubclass(Exception, BaseException):", issubclass(Exception, BaseException))
print("issubclass(KeyboardInterrupt, Exception):", issubclass(KeyboardInterrupt, Exception))
print("issubclass(KeyError, LookupError):", issubclass(KeyError, LookupError))
print("issubclass(IndexError, LookupError):", issubclass(IndexError, LookupError))`,
        expectedOutput: `issubclass(Exception, BaseException): True
issubclass(KeyboardInterrupt, Exception): False
issubclass(KeyError, LookupError): True
issubclass(IndexError, LookupError): True`,
        explanation: 'Both KeyError and IndexError inherit from LookupError, allowing callers to catch `except LookupError:` for both.',
      },
    ],
    realWorldApplications: [
      'FastAPI / Flask HTTP exception mappers mapping domain errors to 404 or 400 responses.',
      'SDK development providing structured client error classes.',
    ],
    commonMistakes: [
      'Subclassing `BaseException` instead of `Exception`; custom exceptions should almost always inherit from `Exception`.',
      'Forgetting to pass an informative error message string to `super().__init__(msg)`.',
    ],
    interviewRelevance:
      'Interviewers test knowledge of Python\'s exception hierarchy tree: BaseException -> Exception -> StandardErrors.',
    checkpoints: [
      { id: 'py-45-cp-1', label: 'Always inherit custom exceptions from Exception, not BaseException.' },
      { id: 'py-45-cp-2', label: 'Attach domain attributes to custom exception instances.' },
    ],
    practiceExercises: [
      {
        id: 'py-45-ex-1',
        title: 'Validation Error with Error Codes',
        difficulty: 'Beginner',
        type: 'coding',
        prompt: 'Create `APIError(Exception)` with `status_code` and `error_code` attributes, and instantiate it with 404 and "USER_NOT_FOUND".',
        starterCode: 'class APIError(Exception):\n    pass',
        solution: `class APIError(Exception):
    def __init__(self, message: str, status_code: int = 400, error_code: str = "GENERIC_ERROR"):
        super().__init__(message)
        self.status_code = status_code
        self.error_code = error_code

err = APIError("User with ID 10 does not exist", status_code=404, error_code="USER_NOT_FOUND")
print(f"[{err.status_code}] {err.error_code}: {err}")`,
        explanation: 'Structured custom exception ideal for REST API middleware.',
      },
      {
        id: 'py-45-ex-2',
        title: 'Catching Parent LookupError',
        difficulty: 'Intermediate',
        type: 'coding',
        prompt: 'Write a helper `fetch_item(collection, key)` that catches both `IndexError` and `KeyError` using a single `except LookupError` block.',
        starterCode: 'def fetch_item(collection, key):\n    pass',
        solution: `def fetch_item(collection, key):
    try:
        return collection[key]
    except LookupError as e:
        return f"Lookup failed: {type(e).__name__}"

print(fetch_item([10, 20], 5))        # Lookup failed: IndexError
print(fetch_item({"name": "Aarav"}, "age")) # Lookup failed: KeyError`,
        explanation: 'LookupError is the common base class for both index and key lookup failures.',
      },
      {
        id: 'py-45-ex-3',
        title: 'Custom Exception with Retry Count Metadata',
        difficulty: 'Advanced',
        type: 'coding',
        prompt: 'Create `MaxRetriesExceededError` that stores a list of previous exception causes and formats them in its string representation.',
        starterCode: 'class MaxRetriesExceededError(Exception):\n    pass',
        solution: `class MaxRetriesExceededError(Exception):
    def __init__(self, attempts: int, last_error: Exception):
        msg = f"Failed after {attempts} attempts. Last error: {type(last_error).__name__} ({last_error})"
        super().__init__(msg)
        self.attempts = attempts
        self.last_error = last_error

try:
    raise MaxRetriesExceededError(3, ConnectionRefusedError("Port 8000 closed"))
except MaxRetriesExceededError as e:
    print(e)`,
        explanation: 'Encapsulates retry count and underlying exception diagnostic data.',
      },
    ],
    quizQuestions: [
      {
        id: 'py-45-q1',
        question: 'Which class should all custom user-defined application exceptions inherit from?',
        options: ['BaseException', 'Exception', 'StandardError', 'RuntimeError'],
        correctOptionIndex: 1,
        explanation: 'All standard application exceptions must inherit from Exception. BaseException is reserved for system-level signals.',
      },
      {
        id: 'py-45-q2',
        question: 'Which built-in base exception class is the common parent of both IndexError and KeyError?',
        options: ['CollectionError', 'LookupError', 'KeyIndexError', 'MappingError'],
        correctOptionIndex: 1,
        explanation: 'LookupError is the base class for exceptions raised when a key or index used on a mapping or sequence is invalid.',
      },
    ],
    revisionNotes: [
      'Subclass Exception for application-level errors.',
      'BaseException is reserved for KeyboardInterrupt, SystemExit.',
      'LookupError catches both IndexError and KeyError.',
    ],
  },
  {
    id: 'py-46-file-handling',
    moduleId: 'py-m5',
    moduleNumber: 5,
    moduleTitle: 'Advanced Python',
    topicNumber: 46,
    title: 'File Handling & Context Managers (with open)',
    language: 'python',
    level: 'Beginner',
    whyItMatters:
      'Reading and writing files is fundamental to every application. The `with open(...)` context manager guarantees that file descriptors are automatically closed even if an exception occurs during reading or writing.',
    explanation:
      'Files in Python are opened using `open(filename, mode, encoding="utf-8")`. Modes include `r` (read text), `w` (write text, truncates existing file), `a` (append text), `r+` (read and write), `b` (binary mode for images/audio). Always specify `encoding="utf-8"` when handling text to avoid platform-dependent encoding bugs on Windows vs Linux. The `with` statement guarantees file closure via the context manager protocol.',
    syntaxAndStructure:
      '# Writing text:\nwith open("output.txt", "w", encoding="utf-8") as f:\n    f.write("Hello, World!\\n")\n\n# Reading line by line (memory efficient):\nwith open("input.txt", "r", encoding="utf-8") as f:\n    for line in f:\n        print(line.strip())',
    codeExamples: [
      {
        title: 'Writing and Line-by-Line Reading with Context Managers',
        code: `import tempfile
import os

# Create temporary file to demonstrate safe file IO
with tempfile.NamedTemporaryFile("w+", delete=False, encoding="utf-8") as tmp:
    filepath = tmp.name
    # 1. Write structured lines
    tmp.write("Alice,Engineering,95000\\n")
    tmp.write("Bob,Design,80000\\n")
    tmp.write("Charlie,Product,90000\\n")

# 2. Read back using memory-efficient line iterator
records = []
with open(filepath, "r", encoding="utf-8") as file:
    for line in file:
        parts = line.strip().split(",")
        records.append({"name": parts[0], "dept": parts[1], "salary": int(parts[2])})

print("Parsed records:", records)
os.remove(filepath)  # Clean up temp file`,
        expectedOutput: `Parsed records: [{'name': 'Alice', 'dept': 'Engineering', 'salary': 95000}, {'name': 'Bob', 'dept': 'Design', 'salary': 80000}, {'name': 'Charlie', 'dept': 'Product', 'salary': 90000}]`,
        explanation: 'Iterating directly over `file` reads lines lazily without buffering the entire file into RAM.',
      },
      {
        title: 'Binary File Reading (Chunked Stream)',
        code: `import io

# Simulating binary data stream (e.g. image or zip file)
binary_stream = io.BytesIO(b"\\x89PNG\\r\\n\\x1a\\n\\x00\\x00\\x00\\rIHDR" + b"\\x00" * 32)

CHUNK_SIZE = 16
chunks = []
while chunk := binary_stream.read(CHUNK_SIZE):
    chunks.append(chunk)

print(f"Read {len(chunks)} chunks of binary data.")
print("Header signature:", chunks[0][:4])`,
        expectedOutput: `Read 3 chunks of binary data.
Header signature: b'\\x89PNG'`,
        explanation: 'Using the walrus operator `:=` to read fixed-size binary chunks prevents out-of-memory errors on large files.',
      },
    ],
    realWorldApplications: [
      'Ingesting large log files, exporting CSV analytical reports.',
      'Processing binary uploads in web servers.',
    ],
    commonMistakes: [
      'Not using `with open(...)`, which can leak open file descriptors and lock files on Windows.',
      'Omitting `encoding="utf-8"` (Windows defaults to `cp1252`, causing UnicodeDecodeError on special characters).',
      'Using `f.read()` on gigabyte-sized files, exhausting available RAM.',
    ],
    interviewRelevance:
      'Interviewers test knowledge of line-by-line streaming vs `f.read()`, file modes, and why the context manager is mandatory.',
    checkpoints: [
      { id: 'py-46-cp-1', label: 'Always use with open() and specify encoding="utf-8".' },
      { id: 'py-46-cp-2', label: 'Iterate over file objects line-by-line for memory efficiency.' },
    ],
    practiceExercises: [
      {
        id: 'py-46-ex-1',
        title: 'Line and Word Counter',
        difficulty: 'Beginner',
        type: 'coding',
        prompt: 'Write `count_file_stats(filepath)` returning `(lines, words, chars)` for a text file.',
        starterCode: 'def count_file_stats(filepath: str) -> tuple[int, int, int]:\n    pass',
        solution: `def count_file_stats(content: str) -> tuple[int, int, int]:
    # Simulating file reading logic
    lines = content.splitlines()
    num_lines = len(lines)
    num_words = sum(len(line.split()) for line in lines)
    num_chars = len(content)
    return num_lines, num_words, num_chars

print("Stats (lines, words, chars):", count_file_stats("Hello World\\nSecond line here\\n"))`,
        explanation: 'Basic streaming text metric calculation.',
      },
      {
        id: 'py-46-ex-2',
        title: 'Append Log Entry Function',
        difficulty: 'Intermediate',
        type: 'coding',
        prompt: 'Write `log_event(filepath, message)` that appends an ISO timestamp and message to a file with mode "a".',
        starterCode: 'def log_event(filepath: str, message: str):\n    pass',
        solution: `import datetime

def log_event_str(message: str) -> str:
    now = datetime.datetime.now(datetime.timezone.utc).isoformat()
    return f"[{now}] {message}\\n"

print(log_event_str("User login successful"))`,
        explanation: 'Append mode "a" ensures new writes do not truncate existing content.',
      },
      {
        id: 'py-46-ex-3',
        title: 'Safe Atomic File Writer',
        difficulty: 'Advanced',
        type: 'coding',
        prompt: 'Write a pattern that writes to a temporary file first and renames it atomically to prevent corrupted files on crash.',
        starterCode: '# Atomic write via temp file + os.replace',
        solution: `import os

def atomic_write(filepath: str, content: str):
    temp_path = f"{filepath}.tmp"
    with open(temp_path, "w", encoding="utf-8") as f:
        f.write(content)
        f.flush()
        os.fsync(f.fileno())  # Force OS to write to disk
    os.replace(temp_path, filepath)  # Atomic rename on POSIX/Windows

atomic_write("test_config.json", '{"status": "ok"}')
print("File written atomically.")
if os.path.exists("test_config.json"): os.remove("test_config.json")`,
        explanation: 'Atomic write pattern guarantees configuration files are never left half-written on sudden crashes.',
      },
    ],
    quizQuestions: [
      {
        id: 'py-46-q1',
        question: 'Which file mode opens a file for writing, truncating (erasing) any existing content?',
        options: ['"r"', '"a"', '"w"', '"r+"'],
        correctOptionIndex: 2,
        explanation: 'Mode "w" opens a file for writing and truncates (empties) it if it already exists.',
      },
      {
        id: 'py-46-q2',
        question: 'What is the primary benefit of using "with open(...) as f" over "f = open(...)"?',
        options: [
          'It runs in a separate thread',
          'It automatically closes the file descriptor even if an error is raised',
          'It compresses the file automatically',
          'It makes the file read-only',
        ],
        correctOptionIndex: 1,
        explanation: 'Context managers guarantee that the file descriptor is closed properly upon block exit.',
      },
    ],
    revisionNotes: [
      'Always use with open() with explicit encoding="utf-8".',
      'Modes: "r" (read), "w" (write truncate), "a" (append), "b" (binary).',
      'Iterate directly over file object for memory-efficient line streaming.',
    ],
  },
  {
    id: 'py-47-modules-packages',
    moduleId: 'py-m5',
    moduleNumber: 5,
    moduleTitle: 'Advanced Python',
    topicNumber: 47,
    title: 'Modules & Packages: Structure & __init__.py',
    language: 'python',
    level: 'Intermediate',
    whyItMatters:
      'Structuring production code requires organizing files into modular packages. Understanding `__all__`, `__init__.py`, and relative vs absolute imports is essential for multi-file project architecture.',
    explanation:
      'A **module** is simply a single Python file (.py). A **package** is a directory containing Python modules and an `__init__.py` file (which marks the directory as an importable package and executes upon import). The `__all__` list inside `__init__.py` or any module explicitly defines which public names are exported when callers execute `from package import *`. `__name__ == "__main__"` guards execution so code only runs when executed directly as a script.',
    syntaxAndStructure:
      '# Package Directory Structure:\n# my_package/\n# ├── __init__.py      # Package initialization & __all__\n# ├── utils.py\n# └── models.py\n\n# __init__.py:\nfrom .models import User\nfrom .utils import helper\n__all__ = ["User", "helper"]\n\n# Direct execution guard:\nif __name__ == "__main__":\n    main()',
    codeExamples: [
      {
        title: 'The __name__ == "__main__" Guard Pattern',
        code: `def calculate_tax(income: float) -> float:
    return income * 0.20

def main():
    print("Testing calculate_tax directly:")
    print("Tax on 100,000:", calculate_tax(100_000))

# This block executes ONLY if script is run directly, NOT when imported:
if __name__ == "__main__":
    main()`,
        expectedOutput: `Testing calculate_tax directly:
Tax on 100,000: 20000.0`,
        explanation: 'When imported as a module, __name__ is set to the module name, preventing main() from executing automatically.',
      },
      {
        title: 'Export Control with __all__',
        code: `__all__ = ["public_api"]

def public_api():
    return "Accessible via from module import *"

def _internal_helper():
    return "Private internal helper"

# __all__ limits wildcard imports to specified symbols:
print("Exported symbols:", __all__)`,
        expectedOutput: `Exported symbols: ['public_api']`,
        explanation: 'Defining __all__ explicitly controls the public interface of a module or package.',
      },
    ],
    realWorldApplications: [
      'Structuring scalable Django / FastAPI / Flask backend applications.',
      'Publishing reusable libraries on PyPI.',
    ],
    commonMistakes: [
      'Putting heavyweight, slow code inside `__init__.py`, slowing down every import of the package.',
      'Using `from module import *` in production, which pollutes namespaces and obscures variable origins.',
    ],
    interviewRelevance:
      'Classic interview question: "What does if __name__ == \'__main__\' do and why is it needed?".',
    checkpoints: [
      { id: 'py-47-cp-1', label: 'Use if __name__ == "__main__": to guard entrypoints.' },
      { id: 'py-47-cp-2', label: 'Use __all__ to define explicit public exports.' },
    ],
    practiceExercises: [
      {
        id: 'py-47-ex-1',
        title: 'Check Module Execution Mode',
        difficulty: 'Beginner',
        type: 'coding',
        prompt: 'Write a function that returns "Script" if `__name__ == "__main__"` or "Imported Module" otherwise.',
        starterCode: 'def get_mode():\n    pass',
        solution: `def get_mode():
    return "Script" if __name__ == "__main__" else "Imported Module"

print("Execution mode:", get_mode())`,
        explanation: 'Inspects __name__ to determine execution context.',
      },
      {
        id: 'py-47-ex-2',
        title: 'Namespace Pollution Demonstration',
        difficulty: 'Intermediate',
        type: 'coding',
        prompt: 'Demonstrate how `__all__` controls names in `from module import *` using `dir()`.',
        starterCode: '__all__ = ["a", "b"]\na = 1\nb = 2\nc = 3',
        solution: `__all__ = ["a", "b"]
a = 1
b = 2
c = 3
print("Controlled exports:", [name for name in ["a", "b", "c"] if name in __all__])`,
        explanation: 'Only a and b are exported when callers use wildcard import.',
      },
      {
        id: 'py-47-ex-3',
        title: 'Package Version Introspection',
        difficulty: 'Advanced',
        type: 'coding',
        prompt: 'Write an `__init__.py` pattern exposing `__version__ = "1.0.0"` and `__author__`.',
        starterCode: '# __init__.py metadata exposure',
        solution: `__version__ = "1.0.0"
__author__ = "AK67 Team"
__all__ = ["__version__", "__author__"]

print(f"Package v{__version__} by {__author__}")`,
        explanation: 'Standard package metadata convention used across PyPI libraries.',
      },
    ],
    quizQuestions: [
      {
        id: 'py-47-q1',
        question: 'What is the value of the __name__ variable when a Python script is run directly from the command line?',
        options: ['"__main__"', '"__init__"', '"script"', 'The filename of the script'],
        correctOptionIndex: 0,
        explanation: 'When a script is run directly (e.g. python app.py), the interpreter sets __name__ to "__main__".',
      },
      {
        id: 'py-47-q2',
        question: 'What is the purpose of the __all__ variable in a Python module?',
        options: [
          'It lists all dependencies that must be installed via pip',
          'It defines the explicit list of symbols exported when using "from module import *"',
          'It disables bytecode generation',
          'It makes all variables constant',
        ],
        correctOptionIndex: 1,
        explanation: '__all__ defines the public interface exported during wildcard imports (from module import *).',
      },
    ],
    revisionNotes: [
      'A module is a .py file; a package is a folder with __init__.py.',
      'if __name__ == "__main__": guards direct script execution.',
      '__all__ defines public exports for wildcard imports.',
    ],
  },
  {
    id: 'py-48-import-system-syspath',
    moduleId: 'py-m5',
    moduleNumber: 5,
    moduleTitle: 'Advanced Python',
    topicNumber: 48,
    title: 'The Python Import System, sys.path & Circular Imports',
    language: 'python',
    level: 'Advanced',
    whyItMatters:
      'Circular import errors (`ImportError: cannot import name ... from partially initialized module`) baffle intermediate developers. Understanding `sys.modules`, `sys.path`, and import resolution is required for clean project architecture.',
    explanation:
      'When an `import name` statement executes, Python searches directories in `sys.path` in order:\n1. The directory containing the input script.\n2. Directories listed in the `PYTHONPATH` environment variable.\n3. Standard library directories.\n4. Installed third-party packages in `site-packages`.\n\nPython caches imported modules in `sys.modules` dictionary. If module A imports module B, and module B imports module A at the top level, a **circular import** occurs because module A is only partially initialized when B tries to access its attributes. Solutions: import inside functions (deferred imports), refactor shared logic into a module C, or import module names rather than specific functions.',
    syntaxAndStructure:
      'import sys\n# Inspect module search paths:\nprint(sys.path)\n\n# Dynamic path modification:\nsys.path.append("/path/to/custom_libs")\n\n# Inspect cached modules:\nprint("os" in sys.modules)',
    codeExamples: [
      {
        title: 'Inspecting sys.path and sys.modules Cache',
        code: `import sys

print("Is sys.path a list?", isinstance(sys.path, list))
print("Is sys.path non-empty?", len(sys.path) > 0)

import math
print("Is 'math' cached in sys.modules?", "math" in sys.modules)
print("Cached module name:", sys.modules["math"].__name__)`,
        expectedOutput: `Is sys.path a list? True
Is sys.path non-empty? True
Is 'math' cached in sys.modules? True
Cached module name: math`,
        explanation: 'Python caches imported modules in sys.modules. Subsequent imports return the cached module without re-executing it.',
      },
      {
        title: 'Resolving Circular Imports via Deferred Function Imports',
        code: `# Scenario: module_a needs module_b, and module_b needs module_a
# FIX: Move the import inside the function (deferred import):

def process_transaction(user_id: int, amount: float):
    # Deferred import resolves circular dependency at runtime
    import math # Simulating import inside function
    return math.ceil(amount)

print("Processed transaction:", process_transaction(101, 49.2))`,
        expectedOutput: `Processed transaction: 50`,
        explanation: 'Importing inside the function body defers execution until the function is called, by which time both modules are fully initialized.',
      },
    ],
    realWorldApplications: [
      'Architecting large enterprise applications avoiding circular imports.',
      'Troubleshooting `ModuleNotFoundError` across Docker containers and virtual environments.',
    ],
    commonMistakes: [
      'Naming a script after a standard library module (e.g. naming your file `math.py` or `random.py`), which shadows the standard library.',
      'Top-level mutual imports between two tightly coupled models.',
    ],
    interviewRelevance:
      'Universal interview question: "What causes circular import errors in Python and how do you resolve them?".',
    checkpoints: [
      { id: 'py-48-cp-1', label: 'Know the 4 locations in sys.path search order.' },
      { id: 'py-48-cp-2', label: 'Resolve circular imports via deferred imports or refactoring shared state.' },
    ],
    practiceExercises: [
      {
        id: 'py-48-ex-1',
        title: 'Check Installed Module Path',
        difficulty: 'Beginner',
        type: 'coding',
        prompt: 'Write a script that imports `json` and prints its `__file__` attribute to show its disk location.',
        starterCode: 'import json\n# Print file location',
        solution: `import json
print("JSON module location:", json.__file__)`,
        explanation: 'Built-in pure Python modules expose their filesystem path via __file__.',
      },
      {
        id: 'py-48-ex-2',
        title: 'Safe Dynamic Import via importlib',
        difficulty: 'Intermediate',
        type: 'coding',
        prompt: 'Use `importlib.import_module` to dynamically import the `math` module from a string name.',
        starterCode: 'import importlib\n# Dynamically import "math"',
        solution: `import importlib

module_name = "math"
math_mod = importlib.import_module(module_name)
print("sqrt(16) via dynamic import:", math_mod.sqrt(16))  # 4.0`,
        explanation: 'importlib enables dynamic plugin loading at runtime.',
      },
      {
        id: 'py-48-ex-3',
        title: 'Detect Shadowed Standard Library Modules',
        difficulty: 'Advanced',
        type: 'coding',
        prompt: 'Write a detector that checks if any .py files in current directory shadow Python standard library module names.',
        starterCode: 'import sys\n# Check shadowing against sys.stdlib_module_names',
        solution: `import sys

# Python 3.10+ exposes sys.stdlib_module_names
stdlib = getattr(sys, "stdlib_module_names", set())
suspicious = {"math.py", "random.py", "json.py", "app.py"}
shadowed = [f for f in suspicious if f.replace(".py", "") in stdlib]
print("Shadowed standard libraries:", shadowed)`,
        explanation: 'Detects local files that accidentally mask built-in Python modules.',
      },
    ],
    quizQuestions: [
      {
        id: 'py-48-q1',
        question: 'Where does Python search first when importing a module?',
        options: [
          'The PYTHONPATH environment variable',
          'The directory containing the script used to run the interpreter',
          'The standard library site-packages directory',
          'The root C:\\ or / directory',
        ],
        correctOptionIndex: 1,
        explanation: 'sys.path[0] is always the directory of the script used to invoke the interpreter.',
      },
      {
        id: 'py-48-q2',
        question: 'What is the primary cause of "ImportError: cannot import name ... from partially initialized module"?',
        options: [
          'The module was corrupted on disk',
          'A circular import where two modules mutually import each other at top-level before either finishes loading',
          'The module is missing __init__.py',
          'Python ran out of memory',
        ],
        correctOptionIndex: 1,
        explanation: 'Circular top-level imports cause Python to access attributes on an incompletely loaded module object.',
      },
    ],
    revisionNotes: [
      'sys.path defines directory search order.',
      'sys.modules caches all loaded modules.',
      'Fix circular imports with deferred imports or refactoring shared logic.',
    ],
  },
  {
    id: 'py-49-virtual-environments',
    moduleId: 'py-m5',
    moduleNumber: 5,
    moduleTitle: 'Advanced Python',
    topicNumber: 49,
    title: 'Virtual Environments & Package Management (venv & pip)',
    language: 'python',
    level: 'Beginner',
    whyItMatters:
      'Installing dependencies globally corrupts system packages and causes version conflicts between projects. Virtual environments isolate project dependencies, making software reproducible.',
    explanation:
      'A virtual environment is a self-contained directory tree that contains a specific Python interpreter and isolated `site-packages` directory. The built-in `venv` module creates virtual environments (`python -m venv .venv`). `pip` manages package installation (`pip install package`, `pip freeze > requirements.txt`). In modern production, `requirements.txt` or `pyproject.toml` pins exact versions to ensure build reproducibility.',
    syntaxAndStructure:
      '# Terminal Commands:\n# 1. Create virtual environment:\n# python -m venv .venv\n\n# 2. Activate:\n# Linux/macOS: source .venv/bin/activate\n# Windows: .venv\\Scripts\\activate\n\n# 3. Freeze dependencies:\n# pip freeze > requirements.txt\n\n# 4. Install dependencies:\n# pip install -r requirements.txt',
    codeExamples: [
      {
        title: 'Inspecting Virtual Environment Isolation via sys.prefix',
        code: `import sys

is_virtual_env = isinstance(sys.prefix, str) and isinstance(sys.base_prefix, str)
print("Are prefix paths strings?", is_virtual_env)
print("Is sys.prefix defined?", bool(sys.prefix))
print("Is sys.base_prefix defined?", bool(sys.base_prefix))`,
        expectedOutput: `Are prefix paths strings? True
Is sys.prefix defined? True
Is sys.base_prefix defined? True`,
        explanation: 'sys.prefix points to the active virtual environment, while sys.base_prefix points to the underlying global Python installation.',
      },
      {
        title: 'Parsing requirements.txt in Python',
        code: `sample_requirements = """
fastapi==0.110.0
pydantic>=2.5.0,<3.0.0
uvicorn[standard]~=0.28.0
"""

def parse_requirements(raw_reqs: str) -> list[dict]:
    packages = []
    for line in raw_reqs.strip().splitlines():
        line = line.strip()
        if line and not line.startswith("#"):
            packages.append({"entry": line})
    return packages

print("Parsed dependencies:", parse_requirements(sample_requirements))`,
        expectedOutput: `Parsed dependencies: [{'entry': 'fastapi==0.110.0'}, {'entry': 'pydantic>=2.5.0,<3.0.0'}, {'entry': 'uvicorn[standard]~=0.28.0'}]`,
        explanation: 'requirements.txt defines pinned version specifications for consistent team deployments.',
      },
    ],
    realWorldApplications: [
      'Docker container setups where each microservice maintains isolated dependencies.',
      'Preventing breaking global operating system packages on Linux distributions.',
    ],
    commonMistakes: [
      'Committing the entire `.venv/` directory to Git repository; `.venv/` must ALWAYS be listed in `.gitignore`.',
      'Forgetting to activate the virtual environment before installing packages with `pip`.',
    ],
    interviewRelevance:
      'Standard dev-environment question: "Why do we use virtual environments and how do you export dependencies for deployment?".',
    checkpoints: [
      { id: 'py-49-cp-1', label: 'Create venvs with python -m venv .venv.' },
      { id: 'py-49-cp-2', label: 'Always add .venv/ to .gitignore.' },
    ],
    practiceExercises: [
      {
        id: 'py-49-ex-1',
        title: 'Verify Virtualenv Detection Function',
        difficulty: 'Beginner',
        type: 'coding',
        prompt: 'Write `in_venv() -> bool` that returns True if running inside a virtualenv by comparing `sys.prefix` and `sys.base_prefix`.',
        starterCode: 'import sys\ndef in_venv() -> bool:\n    pass',
        solution: `import sys

def in_venv() -> bool:
    return sys.prefix != sys.base_prefix

print("Virtual environment status:", in_venv())`,
        explanation: 'Comparing sys.prefix and sys.base_prefix is the official PEP 405 check.',
      },
      {
        id: 'py-49-ex-2',
        title: 'Generate requirements.txt String',
        difficulty: 'Intermediate',
        type: 'coding',
        prompt: 'Given a dict of `{"requests": "2.31.0", "pytest": "8.0.0"}`, generate a pinned `requirements.txt` string.',
        starterCode: 'def generate_reqs(deps: dict[str, str]) -> str:\n    pass',
        solution: `def generate_reqs(deps: dict[str, str]) -> str:
    return "\\n".join(f"{pkg}=={ver}" for pkg, ver in sorted(deps.items())) + "\\n"

print(generate_reqs({"requests": "2.31.0", "pytest": "8.0.0"}))`,
        explanation: 'Sorts dependencies and produces standard requirements.txt format.',
      },
      {
        id: 'py-49-ex-3',
        title: 'Check Package Version with importlib.metadata',
        difficulty: 'Advanced',
        type: 'coding',
        prompt: 'Use `importlib.metadata.version` to programmatically inspect the version of an installed package (e.g. "pip").',
        starterCode: 'import importlib.metadata\n# Get pip version',
        solution: `import importlib.metadata

try:
    ver = importlib.metadata.version("pip")
    print(f"Installed pip version: {ver}")
except importlib.metadata.PackageNotFoundError:
    print("Package not installed")`,
        explanation: 'importlib.metadata (Python 3.8+) allows inspecting installed package metadata without running pip CLI.',
      },
    ],
    quizQuestions: [
      {
        id: 'py-49-q1',
        question: 'Which standard library module creates virtual environments in Python 3?',
        options: ['virtualenv', 'venv', 'pipenv', 'envlib'],
        correctOptionIndex: 1,
        explanation: 'The built-in venv module (PEP 405) creates isolated virtual environments.',
      },
      {
        id: 'py-49-q2',
        question: 'Should the virtual environment directory (e.g. .venv) be committed to Git?',
        options: [
          'Yes, so teammates don\'t need to install packages',
          'No, virtual environments contain platform-dependent binaries and must be ignored in .gitignore',
          'Only if deploying to AWS',
          'Yes, but only the bin/ folder',
        ],
        correctOptionIndex: 1,
        explanation: 'Virtual environments are platform-specific and easily regenerated via requirements.txt; they should never be committed.',
      },
    ],
    revisionNotes: [
      'python -m venv .venv creates isolated environments.',
      'Always add .venv to .gitignore.',
      'pip freeze > requirements.txt records exact dependency versions.',
    ],
  },
  {
    id: 'py-50-iterators-protocol',
    moduleId: 'py-m5',
    moduleNumber: 5,
    moduleTitle: 'Advanced Python',
    topicNumber: 50,
    title: 'The Iterator Protocol (__iter__ & __next__)',
    language: 'python',
    level: 'Intermediate',
    whyItMatters:
      'Python\'s `for` loops, comprehensions, `any()`, `all()`, and unpacking all work via the Iterator Protocol. Building custom iterators allows creating streaming data structures.',
    explanation:
      'The Python Iterator Protocol consists of two methods:\n1. `__iter__()`: Must return the iterator object itself (`return self`).\n2. `__next__()`: Returns the next element from the container. When no items remain, it must raise `StopIteration`.\nAn **iterable** is anything that can return an iterator via `iter(obj)`. An **iterator** is the stateful stream object that yields items via `next(obj)`.',
    syntaxAndStructure:
      'class MyIterator:\n    def __init__(self, limit):\n        self.limit = limit\n        self.current = 0\n\n    def __iter__(self):\n        return self\n\n    def __next__(self):\n        if self.current >= self.limit:\n            raise StopIteration\n        val = self.current\n        self.current += 1\n        return val',
    codeExamples: [
      {
        title: 'Building a Custom Range Iterator Class',
        code: `class CustomRange:
    def __init__(self, start: int, stop: int, step: int = 1):
        self.current = start
        self.stop = stop
        self.step = step

    def __iter__(self):
        return self  # The iterator returns itself

    def __next__(self) -> int:
        if (self.step > 0 and self.current >= self.stop) or (self.step < 0 and self.current <= self.stop):
            raise StopIteration
        val = self.current
        self.current += self.step
        return val

# Works with for-loops and list comprehensions!
evens = [x for x in CustomRange(0, 10, 2)]
print("CustomRange evens:", evens)`,
        expectedOutput: `CustomRange evens: [0, 2, 4, 6, 8]`,
        explanation: 'CustomRange implements __iter__ and __next__, seamlessly integrating with for loops and list comprehensions.',
      },
      {
        title: 'Iterable vs Iterator Distinction',
        code: `numbers = [10, 20, 30] # numbers is an ITERABLE, not an iterator!

# Getting an iterator from an iterable:
it = iter(numbers)
print("Type of numbers:", type(numbers))
print("Type of it:", type(it))

print("next(it):", next(it))
print("next(it):", next(it))
print("next(it):", next(it))

try:
    next(it)
except StopIteration:
    print("Caught expected StopIteration: Stream exhausted!")`,
        expectedOutput: `Type of numbers: <class 'list'>
Type of it: <class 'list_iterator'>
next(it): 10
next(it): 20
next(it): 30
Caught expected StopIteration: Stream exhausted!`,
        explanation: 'The list is an iterable; iter(list) produces a stateful list_iterator object.',
      },
    ],
    realWorldApplications: [
      'Database cursor query pagination streaming millions of rows.',
      'Chunked log file readers in distributed analysis.',
    ],
    commonMistakes: [
      'Forgetting to raise `StopIteration`, which causes infinite loops.',
      'Assuming iterators can be reset; once exhausted, a new iterator must be created.',
    ],
    interviewRelevance:
      'Universal interview question: "Explain the difference between an iterable and an iterator in Python".',
    checkpoints: [
      { id: 'py-50-cp-1', label: 'Iterables implement __iter__; iterators implement __iter__ and __next__.' },
      { id: 'py-50-cp-2', label: 'Raise StopIteration when the stream is exhausted.' },
    ],
    practiceExercises: [
      {
        id: 'py-50-ex-1',
        title: 'Cycle Iterator Implementation',
        difficulty: 'Beginner',
        type: 'coding',
        prompt: 'Build a `Cycle(items, count)` iterator that repeats items cyclically for `count` total elements.',
        starterCode: 'class Cycle:\n    pass',
        solution: `class Cycle:
    def __init__(self, items: list, count: int):
        self.items = items
        self.count = count
        self.index = 0
    def __iter__(self): return self
    def __next__(self):
        if self.count <= 0: raise StopIteration
        val = self.items[self.index % len(self.items)]
        self.index += 1
        self.count -= 1
        return val

print(list(Cycle(["A", "B"], 5)))  # ['A', 'B', 'A', 'B', 'A']`,
        explanation: 'Modulo arithmetic produces cyclic iteration bounded by count.',
      },
      {
        id: 'py-50-ex-2',
        title: 'Two-Argument iter() Sentinel Form',
        difficulty: 'Intermediate',
        type: 'coding',
        prompt: 'Demonstrate using `iter(callable, sentinel)` to read random dice rolls until a 6 is rolled.',
        starterCode: '# iter(callable, sentinel) pattern',
        solution: `import random

# Simulating dice rolls ending at 6:
rolls = [3, 1, 4, 6, 2]
it_rolls = iter(rolls)
roll_gen = iter(lambda: next(it_rolls), 6) # Stops when return value equals 6!
print("Rolls before 6:", list(roll_gen))  # [3, 1, 4]`,
        explanation: 'iter(func, sentinel) repeatedly invokes func() until it returns sentinel value.',
      },
      {
        id: 'py-50-ex-3',
        title: 'Tree In-Order Traversal Iterator',
        difficulty: 'Advanced',
        type: 'coding',
        prompt: 'Implement an in-order BST iterator with `next()` and `has_next()` methods in O(h) stack memory.',
        starterCode: 'class BSTIterator:\n    pass',
        solution: `class TreeNode:
    def __init__(self, val, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class BSTIterator:
    def __init__(self, root: TreeNode | None):
        self.stack = []
        self._push_left(root)

    def _push_left(self, node):
        while node:
            self.stack.append(node)
            node = node.left

    def has_next(self) -> bool:
        return len(self.stack) > 0

    def next(self) -> int:
        node = self.stack.pop()
        if node.right:
            self._push_left(node.right)
        return node.val

# Test with small BST: 2 with left 1 and right 3
root = TreeNode(2, TreeNode(1), TreeNode(3))
b_it = BSTIterator(root)
vals = []
while b_it.has_next():
    vals.append(b_it.next())
print("BST In-Order via Iterator:", vals)  # [1, 2, 3]`,
        explanation: 'Classic LeetCode Hard/Medium problem implementing custom BST iterator in $O(h)$ space.',
      },
    ],
    quizQuestions: [
      {
        id: 'py-50-q1',
        question: 'Which method must every Python iterator object implement?',
        options: ['__next__() only', '__iter__() only', 'Both __iter__() and __next__()', '__len__()'],
        correctOptionIndex: 2,
        explanation: 'To satisfy the Iterator Protocol, an object must implement both __iter__() (returning self) and __next__().',
      },
      {
        id: 'py-50-q2',
        question: 'What happens when for x in my_list: runs in Python?',
        options: [
          'It iterates using array indices from 0 to len',
          'It calls iter(my_list) to obtain an iterator, then repeatedly calls next() until StopIteration is caught',
          'It compiles the loop to C assembly',
          'It copies the entire list into a tuple',
        ],
        correctOptionIndex: 1,
        explanation: 'Python for-loops internally call iter() on the target and catch StopIteration automatically.',
      },
    ],
    revisionNotes: [
      'Iterables implement __iter__(); iterators implement __iter__() and __next__().',
      'Raise StopIteration when exhausted.',
      'for loops catch StopIteration under the hood.',
    ],
  },
  {
    id: 'py-51-context-managers',
    moduleId: 'py-m5',
    moduleNumber: 5,
    moduleTitle: 'Advanced Python',
    topicNumber: 51,
    title: 'Custom Context Managers (__enter__, __exit__ & contextlib)',
    language: 'python',
    level: 'Advanced',
    whyItMatters:
      'Resource management (opening/closing sockets, acquiring/releasing locks, starting/rolling back database transactions) requires deterministic cleanup. Context managers (`with` statements) eliminate resource leaks.',
    explanation:
      'A context manager implements the runtime context protocol:\n1. `__enter__()`: Sets up the runtime context and optionally returns an object assigned via `as variable`.\n2. `__exit__(exc_type, exc_val, exc_tb)`: Tears down the context. If an exception occurred, its type, value, and traceback are passed. If `__exit__` returns `True`, the exception is **suppressed**; otherwise it is propagated.\n\nAlternatively, `contextlib.contextmanager` creates context managers from generator functions using a simple `yield` statement inside a `try-finally` block.',
    syntaxAndStructure:
      '# Class-based Context Manager:\nclass DatabaseTransaction:\n    def __enter__(self):\n        print("BEGIN TRANSACTION")\n        return self\n    def __exit__(self, exc_type, exc_val, exc_tb):\n        if exc_type is not None:\n            print("ROLLBACK TRANSACTION")\n            return False # Propagate error\n        print("COMMIT TRANSACTION")\n\n# Generator-based Context Manager:\nfrom contextlib import contextmanager\n@contextmanager\ndef managed_resource():\n    setup()\n    try:\n        yield resource\n    finally:\n        cleanup()',
    codeExamples: [
      {
        title: 'Class-Based Context Manager with Exception Suppression',
        code: `class SuppressExceptions:
    """Suppresses specified exception types cleanly."""
    def __init__(self, *exceptions):
        self.exceptions = exceptions

    def __enter__(self):
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        if exc_type is not None and issubclass(exc_type, self.exceptions):
            print(f"[Handled] Suppressed expected exception: {exc_type.__name__}: {exc_val}")
            return True  # Returning True suppresses the exception!
        return False  # Let unexpected exceptions bubble up

# Suppressing FileNotFoundError:
with SuppressExceptions(FileNotFoundError):
    with open("non_existent_file_123.txt") as f:
        data = f.read()

print("Execution continued smoothly after with-block!")`,
        expectedOutput: `[Handled] Suppressed expected exception: FileNotFoundError: [Errno 2] No such file or directory: 'non_existent_file_123.txt'
Execution continued smoothly after with-block!`,
        explanation: 'Returning True from __exit__ tells Python to swallow the exception, continuing normal execution after the block.',
      },
      {
        title: 'Generator Context Manager with @contextmanager',
        code: `from contextlib import contextmanager

@contextmanager
def execution_tracker(label: str):
    print(f"[{label}] Started")
    try:
        yield
    finally:
        print(f"[{label}] Finished")

with execution_tracker("List Allocation"):
    data = [x ** 2 for x in range(10_000)]`,
        expectedOutput: `[List Allocation] Started
[List Allocation] Finished`,
        explanation: '@contextmanager turns a simple generator into a full context manager. Code before yield is __enter__; code in finally is __exit__.',
      },
    ],
    realWorldApplications: [
      'Managing SQL database transactions (Commit on success, Rollback on failure).',
      'Temporarily redirecting stdout/stderr or setting environment variables during tests.',
    ],
    commonMistakes: [
      'Returning `True` from `__exit__` unintentionally, which silently hides critical bugs.',
      'Forgetting the `try-finally` block inside a `@contextmanager` generator.',
    ],
    interviewRelevance:
      'Universal interview question: "How does the with statement work in Python, and how do you implement __enter__ and __exit__?".',
    checkpoints: [
      { id: 'py-51-cp-1', label: '__enter__ initializes; __exit__ cleans up.' },
      { id: 'py-51-cp-2', label: 'Return True from __exit__ to suppress exceptions.' },
    ],
    practiceExercises: [
      {
        id: 'py-51-ex-1',
        title: 'Temporary Directory Context Manager',
        difficulty: 'Beginner',
        type: 'coding',
        prompt: 'Use `@contextmanager` to write `temporary_env(key, val)` that sets an environment variable and restores original in `finally`.',
        starterCode: 'import os\nfrom contextlib import contextmanager\n# Write temporary_env',
        solution: `import os
from contextlib import contextmanager

@contextmanager
def temporary_env(key: str, val: str):
    old = os.environ.get(key)
    os.environ[key] = val
    try:
        yield
    finally:
        if old is None:
            os.environ.pop(key, None)
        else:
            os.environ[key] = old

with temporary_env("TEST_ENV", "ACTIVE"):
    print("Inside with:", os.environ.get("TEST_ENV"))
print("Outside with:", os.environ.get("TEST_ENV"))`,
        explanation: 'Safely restores environment variables across test scenarios.',
      },
      {
        id: 'py-51-ex-2',
        title: 'Transaction Rollback Simulation',
        difficulty: 'Intermediate',
        type: 'coding',
        prompt: 'Build `MockTransaction` class that appends to list in `__enter__` and removes elements in `__exit__` if error occurs.',
        starterCode: 'class MockTransaction:\n    pass',
        solution: `class MockTransaction:
    def __init__(self, data_list):
        self.data_list = data_list
        self.snapshot = []

    def __enter__(self):
        self.snapshot = self.data_list[:]
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        if exc_type is not None:
            self.data_list[:] = self.snapshot
            print("Rolled back to snapshot!")
            return True  # Suppress error

items = [1, 2, 3]
with MockTransaction(items):
    items.append(4)
    raise RuntimeError("DB Crash")

print("Items after rollback:", items)  # [1, 2, 3]`,
        explanation: 'Simulates atomic database rollback on failure.',
      },
      {
        id: 'py-51-ex-3',
        title: 'Redirect stdout Context Manager',
        difficulty: 'Advanced',
        type: 'coding',
        prompt: 'Write a context manager that redirects `sys.stdout` to a StringIO buffer and returns captured output.',
        starterCode: 'import io, sys\nfrom contextlib import contextmanager\n# Write capture_stdout',
        solution: `import io, sys
from contextlib import contextmanager

@contextmanager
def capture_stdout():
    buffer = io.StringIO()
    old_stdout = sys.stdout
    sys.stdout = buffer
    try:
        yield buffer
    finally:
        sys.stdout = old_stdout

with capture_stdout() as buf:
    print("Secret test log")

print("Captured:", buf.getvalue().strip())`,
        explanation: 'Temporarily intercepts standard output stream.',
      },
    ],
    quizQuestions: [
      {
        id: 'py-51-q1',
        question: 'What must __exit__() return in order to suppress an active exception from propagating out of the with block?',
        options: ['None', 'False', 'True', '0'],
        correctOptionIndex: 2,
        explanation: 'If __exit__ returns True, Python considers the exception handled and suppresses it.',
      },
      {
        id: 'py-51-q2',
        question: 'Which decorator in the standard library converts a generator into a context manager?',
        options: [
          '@contextlib.contextmanager',
          '@functools.context',
          '@builtins.with_block',
          '@types.manager',
        ],
        correctOptionIndex: 0,
        explanation: 'contextlib.contextmanager is the standard library decorator for creating context managers from generators.',
      },
    ],
    revisionNotes: [
      '__enter__ sets up context; __exit__ tears down.',
      'Return True from __exit__ to suppress exceptions.',
      'Use @contextmanager for clean generator-based context managers.',
    ],
  },
  {
    id: 'py-52-regular-expressions',
    moduleId: 'py-m5',
    moduleNumber: 5,
    moduleTitle: 'Advanced Python',
    topicNumber: 52,
    title: 'Regular Expressions (re Module)',
    language: 'python',
    level: 'Intermediate',
    whyItMatters:
      'Data validation (emails, phone numbers, postal codes), log parsing, and string pattern extraction require regular expressions. The `re` module is essential for text processing interviews.',
    explanation:
      'Python\'s `re` module supports Perl-compatible regular expressions. Key functions:\n- `re.search(pattern, s)`: Scans entire string for first match.\n- `re.match(pattern, s)`: Checks for match ONLY at the beginning of string.\n- `re.findall(pattern, s)`: Returns list of all non-overlapping matches.\n- `re.finditer(pattern, s)`: Returns iterator of Match objects with `.start()`, `.end()`, and `.group()`.\n- `re.sub(pattern, repl, s)`: Substitutes matches with replacement.\nAlways use raw strings (`r"\\d+"`) for regex patterns to prevent Python from interpreting backslash escape sequences.',
    syntaxAndStructure:
      'import re\n\n# Raw string pattern:\npattern = r"^\\w+@[a-zA-Z_]+?\\.[a-zA-Z]{2,3}$"\n\n# Search and groups:\nmatch = re.search(r"(\\d{3})-(\\d{4})", "Call 555-0199")\nif match:\n    area_code = match.group(1)\n    number = match.group(2)',
    codeExamples: [
      {
        title: 'Pattern Matching and Group Extraction',
        code: `import re

log_line = "2026-11-24 14:32:10 [ERROR] Connection timeout to db_server:5432"

# Extract timestamp, log level, and message using named groups (?P<name>...)
pattern = r"(?P<date>\\d{4}-\\d{2}-\\d{2}) (?P<time>\\d{2}:\\d{2}:\\d{2}) \\[(?P<level>[A-Z]+)\\] (?P<msg>.*)"

match = re.search(pattern, log_line)
if match:
    print("Parsed Date:", match.group("date"))
    print("Parsed Level:", match.group("level"))
    print("Parsed Message:", match.group("msg"))
    print("Groupdict:", match.groupdict())`,
        expectedOutput: `Parsed Date: 2026-11-24
Parsed Level: ERROR
Parsed Message: Connection timeout to db_server:5432
Groupdict: {'date': '2026-11-24', 'time': '14:32:10', 'level': 'ERROR', 'msg': 'Connection timeout to db_server:5432'}`,
        explanation: 'Named groups `(?P<name>pattern)` allow accessing captured subgroups as a dictionary.',
      },
      {
        title: 're.sub() and re.findall() Operations',
        code: `import re

text = "Contact us at support@ak67.local or billing@ak67.org for assistance."

# 1. Extract all email addresses:
emails = re.findall(r"[\\w\\.-]+@[\\w\\.-]+\\.\\w+", text)
print("Extracted emails:", emails)

# 2. Mask email usernames for privacy:
masked = re.sub(r"([\\w\\.-]+)(@.*)", r"***\\2", text)
print("Masked text:", masked)`,
        expectedOutput: `Extracted emails: ['support@ak67.local', 'billing@ak67.org']
Masked text: Contact us at ***@ak67.local or billing@ak67.org for assistance.`,
        explanation: 're.findall returns all matching substrings. re.sub supports backreferences like \\1 and \\2.',
      },
    ],
    realWorldApplications: [
      'Input validation in registration forms (email, password strength, phone).',
      'Web scraping and log file extraction in DevOps infrastructure.',
    ],
    commonMistakes: [
      'Confusing `re.match()` (anchored at start of string) with `re.search()` (searches everywhere).',
      'Forgetting raw string prefix `r"..."`, causing Python string escaping to clash with regex escape sequences.',
      'Catastrophic backtracking caused by nested quantifiers like `(a+)+$`.',
    ],
    interviewRelevance:
      'Frequent placement coding question: "Validate IP Address (IPv4/IPv6)" or "Extract URL domains" using regex.',
    checkpoints: [
      { id: 'py-52-cp-1', label: 'Always use raw string notation r"..." for regex.' },
      { id: 'py-52-cp-2', label: 'Know difference between re.match() (start only) and re.search().' },
    ],
    practiceExercises: [
      {
        id: 'py-52-ex-1',
        title: 'Validate IPv4 Address',
        difficulty: 'Beginner',
        type: 'coding',
        prompt: 'Write `is_valid_ipv4(ip)` verifying 4 octets (0-255) separated by dots without leading zeroes.',
        starterCode: 'import re\ndef is_valid_ipv4(ip: str) -> bool:\n    pass',
        solution: `import re

def is_valid_ipv4(ip: str) -> bool:
    octet = r"(25[0-5]|2[0-4]\\d|1\\d{2}|[1-9]?\\d)"
    pattern = rf"^{octet}\\.{octet}\\.{octet}\\.{octet}$"
    return bool(re.match(pattern, ip))

print(is_valid_ipv4("192.168.1.1"))  # True
print(is_valid_ipv4("256.100.0.1"))  # False`,
        explanation: 'Validates 0-255 boundaries and dot separators with exact anchoring.',
      },
      {
        id: 'py-52-ex-2',
        title: 'Extract Hashtags from Tweet',
        difficulty: 'Intermediate',
        type: 'coding',
        prompt: 'Use `re.findall` to extract all hashtags from `"Learning #Python and #MachineLearning in #2026!"`.',
        starterCode: 'import re\n# Extract hashtags',
        solution: `import re
tweet = "Learning #Python and #MachineLearning in #2026!"
tags = re.findall(r"#(\\w+)", tweet)
print("Tags:", tags)  # ['Python', 'MachineLearning', '2026']`,
        explanation: 'Capturing group #(\\w+) extracts word characters following # symbol.',
      },
      {
        id: 'py-52-ex-3',
        title: 'CamelCase to snake_case Converter',
        difficulty: 'Advanced',
        type: 'coding',
        prompt: 'Convert `"UserProfileDetailComponent"` to `"user_profile_detail_component"` using `re.sub()`.',
        starterCode: 'import re\ndef camel_to_snake(s: str) -> str:\n    pass',
        solution: `import re

def camel_to_snake(s: str) -> str:
    s = re.sub(r"(.)([A-Z][a-z]+)", r"\\1_\\2", s)
    return re.sub(r"([a-z0-9])([A-Z])", r"\\1_\\2", s).lower()

print(camel_to_snake("UserProfileDetailComponent"))`,
        explanation: 'Double pass re.sub handles boundary capital transitions.',
      },
    ],
    quizQuestions: [
      {
        id: 'py-52-q1',
        question: 'What is the key difference between re.match() and re.search()?',
        options: [
          're.match() only searches from the beginning of the string; re.search() searches anywhere in the string',
          're.search() returns all matches; re.match() returns only one',
          're.match() works with numbers; re.search() works with letters',
          're.search() compiles bytecode; re.match() does not',
        ],
        correctOptionIndex: 0,
        explanation: 're.match() is strictly anchored at the start of the string (character 0), while re.search() scans the entire string.',
      },
      {
        id: 'py-52-q2',
        question: 'Why should regex patterns always use raw strings (r"\\d+") in Python?',
        options: [
          'It improves execution speed',
          'It prevents Python\'s string parser from interpreting backslashes as escape characters before regex receives them',
          'It is required by PEP 8',
          'It converts text to Unicode',
        ],
        correctOptionIndex: 1,
        explanation: 'Without raw strings (r"..."), Python interprets backslashes (like \\n or \\t) before the regex engine sees them.',
      },
    ],
    revisionNotes: [
      'Always use raw strings: r"pattern".',
      're.search() finds match anywhere; re.match() checks start only.',
      're.sub() replaces matches; re.findall() returns list of all matches.',
    ],
  },
  {
    id: 'py-53-json-handling',
    moduleId: 'py-m5',
    moduleNumber: 5,
    moduleTitle: 'Advanced Python',
    topicNumber: 53,
    title: 'Working with JSON (loads, dumps, dump & load)',
    language: 'python',
    level: 'Beginner',
    whyItMatters:
      'JSON (JavaScript Object Notation) is the standard format for web APIs, microservices, and configuration files. Mastering Python\'s `json` module and custom encoders/decoders is a daily engineering task.',
    explanation:
      'Python\'s built-in `json` module translates between Python objects and JSON strings:\n- `json.dumps(obj)`: Serializes Python object to a JSON formatted **string**.\n- `json.dump(obj, file)`: Serializes Python object directly into a **file**.\n- `json.loads(json_str)`: Deserializes JSON **string** to Python object.\n- `json.load(file)`: Deserializes JSON directly from a **file**.\nType mappings: dict <-> object, list <-> array, str <-> string, int/float <-> number, True/False <-> true/false, None <-> null. Custom types (like datetime or dataclasses) require custom `default` serializer functions.',
    syntaxAndStructure:
      'import json\n\n# String conversion:\njson_str = json.dumps(data, indent=2, sort_keys=True)\nparsed_dict = json.loads(json_str)\n\n# File conversion:\nwith open("data.json", "w", encoding="utf-8") as f:\n    json.dump(data, f, indent=2)\n\nwith open("data.json", "r", encoding="utf-8") as f:\n    data = json.load(f)',
    codeExamples: [
      {
        title: 'JSON Serialization with Pretty Printing and Sorting',
        code: `import json

candidate = {
    "name": "Aarav Sharma",
    "cgpa": 8.85,
    "skills": ["Python", "FastAPI", "SQL", "Docker"],
    "is_graduated": False,
    "portfolio": None,
}

# 1. Serialize to formatted JSON string
json_text = json.dumps(candidate, indent=2, sort_keys=True)
print("Formatted JSON String:\\n", json_text)

# 2. Parse back to Python dictionary
parsed = json.loads(json_text)
print("\\nParsed Python Type:", type(parsed))
print("Skills count:", len(parsed["skills"]))`,
        expectedOutput: `Formatted JSON String:
 {
  "cgpa": 8.85,
  "is_graduated": false,
  "name": "Aarav Sharma",
  "portfolio": null,
  "skills": [
    "Python",
    "FastAPI",
    "SQL",
    "Docker"
  ]
}

Parsed Python Type: <class 'dict'>
Skills count: 4`,
        explanation: 'Notice how False became false, None became null, and sort_keys=True sorted dictionary keys alphabetically.',
      },
      {
        title: 'Custom Datetime Serializer for JSON',
        code: `import json
import datetime

class CustomJSONEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, (datetime.date, datetime.datetime)):
            return obj.isoformat()
        return super().default(obj)

event = {
    "title": "Placement OA Round",
    "timestamp": datetime.datetime(2026, 11, 24, 18, 30),
}

# Serialize with custom encoder:
serialized = json.dumps(event, cls=CustomJSONEncoder)
print("Serialized with custom encoder:", serialized)`,
        expectedOutput: `Serialized with custom encoder: {"title": "Placement OA Round", "timestamp": "2026-11-24T18:30:00"}`,
        explanation: 'Without CustomJSONEncoder, datetime objects raise `TypeError: Object of type datetime is not JSON serializable`.',
      },
    ],
    realWorldApplications: [
      'Consuming and producing payloads in REST APIs and microservice architectures.',
      'Saving persistent configuration settings in desktop/CLI tools.',
    ],
    commonMistakes: [
      'Confusing `dump`/`load` (takes file object) with `dumps`/`loads` (takes string; "s" stands for string).',
      'Attempting to serialize sets or custom classes directly (`TypeError: Object is not JSON serializable`).',
      'Using single quotes in raw JSON strings; JSON specification strictly requires double quotes `"key"`.',
    ],
    interviewRelevance:
      'Universal interview requirement: handling JSON payloads, custom serialization, and error recovery from `json.JSONDecodeError`.',
    checkpoints: [
      { id: 'py-53-cp-1', label: 'loads/dumps works on strings; load/dump works on files.' },
      { id: 'py-53-cp-2', label: 'Use custom default function to serialize datetime/sets.' },
    ],
    practiceExercises: [
      {
        id: 'py-53-ex-1',
        title: 'Safe JSON Parsing Function',
        difficulty: 'Beginner',
        type: 'coding',
        prompt: 'Write `safe_load_json(raw_str: str) -> dict | None` that catches `json.JSONDecodeError` and returns None on bad JSON.',
        starterCode: 'import json\ndef safe_load_json(raw_str: str):\n    pass',
        solution: `import json

def safe_load_json(raw_str: str) -> dict | None:
    try:
        return json.loads(raw_str)
    except (json.JSONDecodeError, TypeError):
        return None

print(safe_load_json('{"status": "ok"}'))
print(safe_load_json('invalid json {123}'))  # None`,
        explanation: 'Gracefully catches malformed JSON without crashing.',
      },
      {
        id: 'py-53-ex-2',
        title: 'Serialize Set as List',
        difficulty: 'Intermediate',
        type: 'coding',
        prompt: 'Serialize a dictionary containing a `set` into valid JSON by using the `default` parameter of `json.dumps`.',
        starterCode: 'import json\ndata = {"users": {"alice", "bob"}}\n# Serialize with default=list',
        solution: `import json

data = {"users": {"alice", "bob"}}
json_str = json.dumps(data, default=list, sort_keys=True)
print(json_str)`,
        explanation: 'Passing default=list automatically converts sets to arrays during serialization.',
      },
      {
        id: 'py-53-ex-3',
        title: 'Flatten Nested JSON Object',
        difficulty: 'Advanced',
        type: 'coding',
        prompt: 'Write a function that flattens a nested JSON dictionary into dot-separated keys: `{"a": {"b": 1}}` -> `{"a.b": 1}`.',
        starterCode: 'def flatten_json(d: dict) -> dict:\n    pass',
        solution: `def flatten_json(d: dict, parent_key: str = "", sep: str = ".") -> dict:
    items = []
    for k, v in d.items():
        new_key = f"{parent_key}{sep}{k}" if parent_key else k
        if isinstance(v, dict):
            items.extend(flatten_json(v, new_key, sep=sep).items())
        else:
            items.append((new_key, v))
    return dict(items)

nested = {"user": {"name": "Diya", "address": {"city": "Mumbai"}}}
print(flatten_json(nested))  # {'user.name': 'Diya', 'user.address.city': 'Mumbai'}`,
        explanation: 'Classic recursive dictionary flattening question.',
      },
    ],
    quizQuestions: [
      {
        id: 'py-53-q1',
        question: 'What is the difference between json.dump() and json.dumps() in Python?',
        options: [
          'json.dump() writes to a file; json.dumps() serializes to a string',
          'json.dump() is for lists; json.dumps() is for dicts',
          'json.dumps() encrypts the data',
          'There is no difference',
        ],
        correctOptionIndex: 0,
        explanation: 'The "s" in dumps stands for string. dump() takes a file stream, while dumps() returns a string.',
      },
      {
        id: 'py-53-q2',
        question: 'What Python data type is a JSON "null" converted into when parsed via json.loads()?',
        options: ['"" (empty string)', 'None', '0', 'False'],
        correctOptionIndex: 1,
        explanation: 'JSON null maps directly to Python\'s singleton None object.',
      },
    ],
    revisionNotes: [
      'json.loads() / json.dumps() operate on strings.',
      'json.load() / json.dump() operate on file objects.',
      'Python None becomes JSON null; Python True/False become true/false.',
    ],
  },
  {
    id: 'py-54-date-time',
    moduleId: 'py-m5',
    moduleNumber: 5,
    moduleTitle: 'Advanced Python',
    topicNumber: 54,
    title: 'Date and Time Operations (datetime & timezone)',
    language: 'python',
    level: 'Intermediate',
    whyItMatters:
      'Handling timestamps, calculating elapsed time, scheduling reminders, and working across international timezones without DST bugs is critical in production systems.',
    explanation:
      'Python\'s `datetime` module provides classes for date and time manipulation:\n- `date`: Year, month, day.\n- `time`: Hour, minute, second, microsecond.\n- `datetime`: Combines date and time.\n- `timedelta`: Duration between two dates or times.\n- `timezone`: UTC and timezone offset management.\n\nFormatting & parsing:\n- `dt.strftime(format)`: Converts datetime object to **formatted string** (String From Time).\n- `datetime.strptime(string, format)`: Parses formatted string into a **datetime object** (String Parse Time).\nAlways store and transmit timestamps in UTC (`timezone.utc`).',
    syntaxAndStructure:
      'from datetime import datetime, timezone, timedelta\n\n# Current UTC time:\nnow = datetime.now(timezone.utc)\n\n# Time delta arithmetic:\ntomorrow = now + timedelta(days=1)\n\n# Formatting & Parsing:\nformatted = now.strftime("%Y-%m-%d %H:%M:%S")\nparsed = datetime.strptime("2026-11-24", "%Y-%m-%d")',
    codeExamples: [
      {
        title: 'Time Arithmetic and Formatting with datetime',
        code: `from datetime import datetime, timezone, timedelta

# 1. Deterministic base timestamp
utc_base = datetime(2026, 11, 24, 18, 30, 0, tzinfo=timezone.utc)
print("Base UTC:", utc_base.isoformat())

# 2. Date arithmetic using timedelta
deadline = utc_base + timedelta(days=30, hours=4)
days_remaining = (deadline - utc_base).days
print(f"Deadline: {deadline.strftime('%A, %B %d, %Y')} ({days_remaining} days left)")

# 3. String parsing and formatting
date_str = "24-11-2026 18:30:00"
parsed_dt = datetime.strptime(date_str, "%d-%m-%Y %H:%M:%S")
print("Parsed object:", parsed_dt)
print("Parsed year:", parsed_dt.year)`,
        expectedOutput: `Base UTC: 2026-11-24T18:30:00+00:00
Deadline: Thursday, December 24, 2026 (30 days left)
Parsed object: 2026-11-24 18:30:00
Parsed year: 2026`,
        explanation: 'strptime parses strings into datetime objects; timedelta computes relative offsets.',
      },
      {
        title: 'Comparing Naive vs Aware Datetime Objects',
        code: `from datetime import datetime, timezone

# Aware datetime (has timezone info)
aware_dt = datetime.now(timezone.utc)

# Naive datetime (no timezone info - dangerous!)
naive_dt = datetime.now()

try:
    diff = aware_dt - naive_dt
except TypeError as e:
    print("Caught expected TypeError:", e)`,
        expectedOutput: `Caught expected TypeError: can't subtract offset-naive and offset-aware datetimes`,
        explanation: 'Python prevents comparing naive and aware datetimes to avoid timezone translation ambiguities.',
      },
    ],
    realWorldApplications: [
      'Calculating spaced repetition review schedules (e.g. interval * easeFactor days).',
      'Session token expiration and countdown timers in web applications.',
    ],
    commonMistakes: [
      'Using naive `datetime.now()` instead of timezone-aware `datetime.now(timezone.utc)`.',
      'Confusing `strftime` (format to string) with `strptime` (parse string to datetime).',
    ],
    interviewRelevance:
      'Interviewers ask about handling timezones safely, Unix epoch timestamps, and difference between naive vs aware datetimes.',
    checkpoints: [
      { id: 'py-54-cp-1', label: 'Always use timezone-aware datetime.now(timezone.utc).' },
      { id: 'py-54-cp-2', label: 'Remember strftime (Format) vs strptime (Parse).' },
    ],
    practiceExercises: [
      {
        id: 'py-54-ex-1',
        title: 'Calculate Age in Full Years',
        difficulty: 'Beginner',
        type: 'coding',
        prompt: 'Write `get_age(birthdate: str)` accepting `"YYYY-MM-DD"` and returning age in completed years.',
        starterCode: 'from datetime import datetime\ndef get_age(birthdate: str) -> int:\n    pass',
        solution: `from datetime import datetime, date

def get_age(birthdate: str) -> int:
    b_date = datetime.strptime(birthdate, "%Y-%m-%d").date()
    today = date(2026, 11, 24)  # Reference today date
    age = today.year - b_date.year - ((today.month, today.day) < (b_date.month, b_date.day))
    return age

print("Age:", get_age("2004-05-15"))  # 22`,
        explanation: 'Properly computes completed years considering birth month and day.',
      },
      {
        id: 'py-54-ex-2',
        title: 'Compute Spaced Repetition Due Date',
        difficulty: 'Intermediate',
        type: 'coding',
        prompt: 'Given date string `"YYYY-MM-DD"` and `interval_days`, return next review date string `"YYYY-MM-DD"`.',
        starterCode: 'def next_review(date_str: str, interval: int) -> str:\n    pass',
        solution: `from datetime import datetime, timedelta

def next_review(date_str: str, interval: int) -> str:
    dt = datetime.strptime(date_str, "%Y-%m-%d")
    next_dt = dt + timedelta(days=interval)
    return next_dt.strftime("%Y-%m-%d")

print(next_review("2026-11-24", 7))  # 2026-12-01`,
        explanation: 'Standard date arithmetic used in AK67\'s spaced repetition revision engine.',
      },
      {
        id: 'py-54-ex-3',
        title: 'Unix Timestamp to ISO Converter',
        difficulty: 'Advanced',
        type: 'coding',
        prompt: 'Convert a Unix epoch timestamp (integer) to an ISO 8601 UTC string.',
        starterCode: 'def epoch_to_iso(epoch: int) -> str:\n    pass',
        solution: `from datetime import datetime, timezone

def epoch_to_iso(epoch: int) -> str:
    dt = datetime.fromtimestamp(epoch, tz=timezone.utc)
    return dt.isoformat()

print(epoch_to_iso(1700000000))`,
        explanation: 'Converts Unix epoch to standard ISO string with timezone.',
      },
    ],
    quizQuestions: [
      {
        id: 'py-54-q1',
        question: 'Which method is used to parse a string representation of a date into a datetime object?',
        options: ['datetime.strftime()', 'datetime.strptime()', 'datetime.parse()', 'datetime.to_date()'],
        correctOptionIndex: 1,
        explanation: 'strptime ("String Parse Time") parses a string according to a specified format string.',
      },
      {
        id: 'py-54-q2',
        question: 'What happens if you attempt to subtract a timezone-naive datetime from a timezone-aware datetime?',
        options: [
          'Python assumes local time for both',
          'Raises TypeError: can\'t subtract offset-naive and offset-aware datetimes',
          'Returns a negative timedelta',
          'Converts naive to UTC automatically',
        ],
        correctOptionIndex: 1,
        explanation: 'Python strictly forbids arithmetic between naive and aware datetimes to prevent subtle timezone bugs.',
      },
    ],
    revisionNotes: [
      'Always use datetime.now(timezone.utc).',
      'timedelta handles date arithmetic (days, hours, seconds).',
      'strftime formats to string; strptime parses strings.',
    ],
  },
  {
    id: 'py-55-collections-module',
    moduleId: 'py-m5',
    moduleNumber: 5,
    moduleTitle: 'Advanced Python',
    topicNumber: 55,
    title: 'The collections Module (defaultdict, Counter & deque)',
    language: 'python',
    level: 'Intermediate',
    whyItMatters:
      '`collections` provides specialized container datatypes. In placement coding tests, `Counter` solves frequency problems instantly, `defaultdict` simplifies graph adjacency lists, and `deque` delivers $O(1)$ queues and stacks.',
    explanation:
      'The `collections` module extends Python\'s basic containers:\n1. `defaultdict(factory)`: Dictionary that automatically initializes missing keys using a factory function (e.g. `list`, `int`, `set`), eliminating `KeyError`.\n2. `Counter(iterable)`: Dict subclass for counting hashable objects with `.most_common(k)` and arithmetic combinations.\n3. `deque`: Double-ended queue with $O(1)$ appends and pops from both ends (unlike list where `pop(0)` is $O(n)$).\n4. `namedtuple`: Factory for creating tuple subclasses with named fields.',
    syntaxAndStructure:
      'from collections import defaultdict, Counter, deque, namedtuple\n\n# Graph adjacency list:\ngraph = defaultdict(list)\ngraph["A"].append("B")\n\n# Frequency counting:\ncounts = Counter("abracadabra")\ntop_2 = counts.most_common(2)\n\n# Queue with O(1) front pop:\nq = deque([1, 2, 3])\nq.appendleft(0)\nfirst = q.popleft() # O(1)!',
    codeExamples: [
      {
        title: 'Counter and defaultdict in Action',
        code: `from collections import defaultdict, Counter

# 1. Frequency counting and most common elements:
words = ["apple", "banana", "apple", "cherry", "banana", "apple"]
word_counts = Counter(words)
print("Word counts:", word_counts)
print("Top 2 most common:", word_counts.most_common(2))

# 2. Graph adjacency list with defaultdict(list)
edges = [("A", "B"), ("A", "C"), ("B", "D"), ("C", "D")]
graph = defaultdict(list)
for u, v in edges:
    graph[u].append(v)
    graph[v].append(u) # Undirected graph

print("\\nAdjacency List:")
for node, neighbors in graph.items():
    print(f"  {node} -> {neighbors}")`,
        expectedOutput: `Word counts: Counter({'apple': 3, 'banana': 2, 'cherry': 1})
Top 2 most common: [('apple', 3), ('banana', 2)]

Adjacency List:
  A -> ['B', 'C']
  B -> ['A', 'D']
  C -> ['A', 'D']
  D -> ['B', 'C']`,
        explanation: 'defaultdict(list) creates empty lists on first access, eliminating manual `if node not in graph:` checks.',
      },
      {
        title: 'Fast O(1) FIFO Queue with collections.deque',
        code: `from collections import deque

queue = deque(["task_1", "task_2", "task_3"])

# O(1) Push to back
queue.append("task_4")

# O(1) Pop from front
finished_task = queue.popleft()
print(f"Processed: {finished_task}, Remaining queue: {list(queue)}")

# Bounded queue (auto-drops old items when full):
history = deque(maxlen=3)
for i in range(5):
    history.append(i)
print("Bounded history (last 3 items):", list(history))`,
        expectedOutput: `Processed: task_1, Remaining queue: ['task_2', 'task_3', 'task_4']
Bounded history (last 3 items): [2, 3, 4]`,
        explanation: 'deque.popleft() runs in $O(1)$ time, whereas list.pop(0) is $O(n)$ due to element shifting.',
      },
    ],
    realWorldApplications: [
      'Breadth-First Search (BFS) in trees and graphs using `deque`.',
      'Frequency counting and top-K frequent elements in data processing.',
    ],
    commonMistakes: [
      'Using `list.pop(0)` in BFS solutions on LeetCode/HackerRank, causing tests to fail with Time Limit Exceeded (TLE).',
      'Passing a function call instead of a function factory to `defaultdict` (e.g. `defaultdict([])` instead of `defaultdict(list)`).',
    ],
    interviewRelevance:
      'Indispensable in interviews: "Top K Frequent Elements", "Word Ladder (BFS)", "Clone Graph", and "Valid Anagram".',
    checkpoints: [
      { id: 'py-55-cp-1', label: 'Use deque for O(1) queue operations in BFS.' },
      { id: 'py-55-cp-2', label: 'Use defaultdict(list) for graph adjacency lists.' },
    ],
    practiceExercises: [
      {
        id: 'py-55-ex-1',
        title: 'Top K Frequent Elements',
        difficulty: 'Beginner',
        type: 'coding',
        prompt: 'Given a list of numbers, return the `k` most frequent elements using `Counter`.',
        starterCode: 'from collections import Counter\ndef top_k_frequent(nums: list[int], k: int) -> list[int]:\n    pass',
        solution: `from collections import Counter

def top_k_frequent(nums: list[int], k: int) -> list[int]:
    counts = Counter(nums)
    return [num for num, freq in counts.most_common(k)]

print(top_k_frequent([1, 1, 1, 2, 2, 3], 2))  # [1, 2]`,
        explanation: 'Counter.most_common(k) uses a heap internally to find top-K elements in $O(n \\log k)$.',
      },
      {
        id: 'py-55-ex-2',
        title: 'Group Anagrams with defaultdict',
        difficulty: 'Intermediate',
        type: 'coding',
        prompt: 'Group an array of strings into anagram clusters: `["eat","tea","tan","ate","nat","bat"]`.',
        starterCode: 'from collections import defaultdict\ndef group_anagrams(strs: list[str]) -> list[list[str]]:\n    pass',
        solution: `from collections import defaultdict

def group_anagrams(strs: list[str]) -> list[list[str]]:
    groups = defaultdict(list)
    for s in strs:
        key = "".join(sorted(s))
        groups[key].append(s)
    return list(groups.values())

print(group_anagrams(["eat", "tea", "tan", "ate", "nat", "bat"]))`,
        explanation: 'Classic placement DSA problem grouping words by sorted character signature.',
      },
      {
        id: 'py-55-ex-3',
        title: 'Sliding Window Maximum with deque',
        difficulty: 'Advanced',
        type: 'coding',
        prompt: 'Find maximum element in every sliding window of size `k` in $O(n)$ time using a monotonic deque.',
        starterCode: 'from collections import deque\ndef max_sliding_window(nums: list[int], k: int) -> list[int]:\n    pass',
        solution: `from collections import deque

def max_sliding_window(nums: list[int], k: int) -> list[int]:
    q = deque()  # Stores indices of potential max elements
    res = []
    for i, n in enumerate(nums):
        # Remove elements outside window
        while q and q[0] < i - k + 1:
            q.popleft()
        # Maintain decreasing order in deque
        while q and nums[q[-1]] < n:
            q.pop()
        q.append(i)
        # Record max once window of size k is formed
        if i >= k - 1:
            res.append(nums[q[0]])
    return res

print(max_sliding_window([1, 3, -1, -3, 5, 3, 6, 7], 3))  # [3, 3, 5, 5, 6, 7]`,
        explanation: 'Monotonic deque achieves optimal $O(n)$ time for sliding window maximum.',
      },
    ],
    quizQuestions: [
      {
        id: 'py-55-q1',
        question: 'What is the time complexity of popping an element from the left (front) of a collections.deque versus a standard Python list?',
        options: [
          'deque is O(1); list is O(n)',
          'Both are O(1)',
          'deque is O(n); list is O(1)',
          'Both are O(log n)',
        ],
        correctOptionIndex: 0,
        explanation: 'deque.popleft() is O(1) because it uses a doubly-linked block array, whereas list.pop(0) is O(n) because all elements must shift.',
      },
      {
        id: 'py-55-q2',
        question: 'What happens when a missing key is accessed in a defaultdict(int)?',
        options: [
          'Raises KeyError',
          'Returns None',
          'Inserts the key with value 0 and returns 0',
          'Deletes the key',
        ],
        correctOptionIndex: 2,
        explanation: 'defaultdict calls int() (which returns 0), stores it for the missing key, and returns 0.',
      },
    ],
    revisionNotes: [
      'defaultdict(factory) automatically initializes missing keys.',
      'Counter provides frequency counting and .most_common(k).',
      'deque provides O(1) appends and pops on both ends.',
    ],
  },
  {
    id: 'py-56-itertools-module',
    moduleId: 'py-m5',
    moduleNumber: 5,
    moduleTitle: 'Advanced Python',
    topicNumber: 56,
    title: 'The itertools Module (Combinatorics & Fast Iterators)',
    language: 'python',
    level: 'Advanced',
    whyItMatters:
      '`itertools` is Python\'s standard library module for creating memory-efficient, fast C-level iterator building blocks. In placement assessments, it solves permutations, combinations, and cartesian products in one line.',
    explanation:
      '`itertools` functions execute in optimized C code and return lazy generators:\n1. **Combinatoric Iterators**:\n   - `permutations(p, r)`: Ordered permutations of length r.\n   - `combinations(p, r)`: Unordered combinations without replacement.\n   - `combinations_with_replacement(p, r)`: Combinations allowing duplicate choices.\n   - `product(*iterables)`: Cartesian product (equivalent to nested for loops).\n2. **Infinite Iterators**:\n   - `count(start, step)`, `cycle(p)`, `repeat(elem, [n])`.\n3. **Terminating Iterators**:\n   - `chain(*iterables)`: Chains multiple iterables sequentially.\n   - `groupby(iterable, key)`: Groups consecutive elements sharing a key (requires sorted input).',
    syntaxAndStructure:
      'from itertools import permutations, combinations, product, chain, groupby\n\n# Combinations:\ncombs = list(combinations([1, 2, 3], 2)) # [(1, 2), (1, 3), (2, 3)]\n\n# Permutations:\nperms = list(permutations([1, 2], 2))    # [(1, 2), (2, 1)]\n\n# Cartesian product:\ngrid = list(product([0, 1], ["A", "B"]))\n\n# Chain sequences:\nall_items = list(chain([1, 2], [3, 4]))',
    codeExamples: [
      {
        title: 'Permutations, Combinations & Cartesian Product',
        code: `from itertools import permutations, combinations, product

items = ["A", "B", "C"]

# 1. Combinations of size 2 (order does not matter):
print("Combinations (n=3, r=2):", list(combinations(items, 2)))

# 2. Permutations of size 2 (order DOES matter):
print("Permutations (n=3, r=2):", list(permutations(items, 2)))

# 3. Cartesian Product (e.g. grid coordinates):
rows = [1, 2]
cols = ["X", "Y"]
print("Product:", list(product(rows, cols)))`,
        expectedOutput: `Combinations (n=3, r=2): [('A', 'B'), ('A', 'C'), ('B', 'C')]
Permutations (n=3, r=2): [('A', 'B'), ('A', 'C'), ('B', 'A'), ('B', 'C'), ('C', 'A'), ('C', 'B')]
Product: [(1, 'X'), (1, 'Y'), (2, 'X'), (2, 'Y')]`,
        explanation: 'itertools generates mathematical arrangements without recursion boilerplate.',
      },
      {
        title: 'Grouping Consecutive Elements with itertools.groupby',
        code: `from itertools import groupby

# IMPORTANT: groupby only groups CONSECUTIVE items! Sort first if needed.
data = ["apple", "apricot", "banana", "blueberry", "cherry"]

# Group by first letter
for initial, group in groupby(data, key=lambda s: s[0]):
    print(f"Letter '{initial}':", list(group))`,
        expectedOutput: `Letter 'a': ['apple', 'apricot']
Letter 'b': ['banana', 'blueberry']
Letter 'c': ['cherry']`,
        explanation: 'groupby groups consecutive matching keys into sub-iterators.',
      },
    ],
    realWorldApplications: [
      'Generating test permutations and brute-force constraint testing.',
      'Chaining query results across partitioned database shards.',
    ],
    commonMistakes: [
      'Using `itertools.groupby` without sorting the collection first; it only groups CONSECUTIVE identical keys!',
      'Consuming infinite iterators (`count()`, `cycle()`) into `list()`, freezing the system with out-of-memory.',
    ],
    interviewRelevance:
      'Frequent placement interview question: "Generate all string permutations" or "Coin Change combination count".',
    checkpoints: [
      { id: 'py-56-cp-1', label: 'Use permutations for ordered sets; combinations for unordered sets.' },
      { id: 'py-56-cp-2', label: 'Sort input before calling itertools.groupby.' },
    ],
    practiceExercises: [
      {
        id: 'py-56-ex-1',
        title: 'Find All Pairs Summing to Target',
        difficulty: 'Beginner',
        type: 'coding',
        prompt: 'Use `itertools.combinations` to find all unique pairs in `[1, 2, 3, 4, 5]` that sum to 6.',
        starterCode: 'from itertools import combinations\ndef find_pairs_sum(nums: list[int], target: int):\n    pass',
        solution: `from itertools import combinations

def find_pairs_sum(nums: list[int], target: int) -> list[tuple[int, int]]:
    return [pair for pair in combinations(nums, 2) if sum(pair) == target]

print(find_pairs_sum([1, 2, 3, 4, 5], 6))  # [(1, 5), (2, 4)]`,
        explanation: 'combinations(nums, 2) tests all pairs without duplicate index permutations.',
      },
      {
        id: 'py-56-ex-2',
        title: 'Run Length Encoding with groupby',
        difficulty: 'Intermediate',
        type: 'coding',
        prompt: 'Compress `"aaabbccccd"` to `[("a", 3), ("b", 2), ("c", 4), ("d", 1)]` using `itertools.groupby`.',
        starterCode: 'from itertools import groupby\ndef rle(s: str):\n    pass',
        solution: `from itertools import groupby

def rle(s: str):
    return [(char, len(list(group))) for char, group in groupby(s)]

print(rle("aaabbccccd"))`,
        explanation: 'groupby naturally groups identical consecutive characters in one line.',
      },
      {
        id: 'py-56-ex-3',
        title: 'Infinite Round-Robin Load Balancer',
        difficulty: 'Advanced',
        type: 'coding',
        prompt: 'Use `itertools.cycle` to build a round-robin load balancer cycling through `["server1", "server2", "server3"]`.',
        starterCode: 'from itertools import cycle\n# Create round robin distributor',
        solution: `from itertools import cycle

servers = ["server1", "server2", "server3"]
balancer = cycle(servers)

requests = [f"Req-{i}" for i in range(5)]
for req in requests:
    assigned_server = next(balancer)
    print(f"{req} -> {assigned_server}")`,
        explanation: 'cycle repeats sequence infinitely in $O(1)$ memory.',
      },
    ],
    quizQuestions: [
      {
        id: 'py-56-q1',
        question: 'What is a critical prerequisite for itertools.groupby() to group all identical keys together?',
        options: [
          'The input sequence must be a set',
          'The input sequence must be sorted by the grouping key first',
          'The keys must be integers',
          'The elements must be unique',
        ],
        correctOptionIndex: 1,
        explanation: 'groupby only aggregates consecutive matching keys. If elements are not sorted first, duplicate keys will appear in multiple distinct groups.',
      },
      {
        id: 'py-56-q2',
        question: 'What does itertools.chain([1, 2], [3, 4]) return?',
        options: [
          '[[1, 2], [3, 4]]',
          'A lazy iterator yielding 1, 2, 3, 4 in sequence',
          '(1, 2, 3, 4)',
          'Raises TypeError',
        ],
        correctOptionIndex: 1,
        explanation: 'itertools.chain concatenates iterables sequentially without materializing an intermediate list in memory.',
      },
    ],
    revisionNotes: [
      'combinations(seq, r) generates unordered subsets.',
      'permutations(seq, r) generates ordered arrangements.',
      'Sort before groupby; chain combines sequences lazily.',
    ],
  },
  {
    id: 'py-57-functools-module',
    moduleId: 'py-m5',
    moduleNumber: 5,
    moduleTitle: 'Advanced Python',
    topicNumber: 57,
    title: 'The functools Module (lru_cache, partial & wraps)',
    language: 'python',
    level: 'Advanced',
    whyItMatters:
      '`functools.lru_cache` turns $O(2^n)$ recursive functions into $O(n)$ in one line of code. In dynamic programming and function customization, `functools` is a superpower for coding interviews.',
    explanation:
      '`functools` provides higher-order functions and decorators for functional programming:\n1. `@lru_cache(maxsize=128)`: Memoizes function calls using a Least Recently Used (LRU) cache, caching results for given argument combinations.\n2. `partial(func, *args, **kwargs)`: Freezes certain arguments of a function to create a new callable with a simpler signature.\n3. `@wraps(func)`: Preserves function metadata inside decorators.\n4. `@total_ordering`: Automatically implements comparison operators (`<=`, `>`, `>=`) from `__eq__` and `__lt__`.',
    syntaxAndStructure:
      'from functools import lru_cache, partial, wraps, total_ordering\n\n# 1. Automatic Memoization for DP:\n@lru_cache(maxsize=None)\ndef fib(n: int) -> int:\n    return n if n <= 1 else fib(n - 1) + fib(n - 2)\n\n# 2. Argument Freezing:\nbase2_int = partial(int, base=2)\nbase2_int("1010") # 10',
    codeExamples: [
      {
        title: 'lru_cache Transforming Exponential Recursion to Linear',
        code: `from functools import lru_cache

# Without cache: O(2^n) exponential time
# With @lru_cache: O(n) linear time!
@lru_cache(maxsize=None)
def fibonacci(n: int) -> int:
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

result = fibonacci(35)
print(f"Fib(35) = {result}")
print("Cache info hits:", fibonacci.cache_info().hits)
print("Cache info misses:", fibonacci.cache_info().misses)`,
        expectedOutput: `Fib(35) = 9227465
Cache info hits: 33
Cache info misses: 36`,
        explanation: 'Notice the cache_info() diagnostics: 33 hits, 36 misses. The computation executes virtually instantaneously.',
      },
      {
        title: 'Partial Functions for Reusable Callables',
        code: `from functools import partial

def power(base: int, exponent: int) -> int:
    return base ** exponent

# Pre-bind exponent=2 to create square function:
square = partial(power, exponent=2)
# Pre-bind exponent=3 to create cube function:
cube = partial(power, exponent=3)

print("Square of 8:", square(8))
print("Cube of 4:", cube(4))`,
        expectedOutput: `Square of 8: 64
Cube of 4: 64`,
        explanation: 'partial() creates specialized functions by fixing a subset of arguments.',
      },
    ],
    realWorldApplications: [
      'Top-Down dynamic programming memoization in technical placement rounds.',
      'Caching expensive API calls or database configurations in backend services.',
    ],
    commonMistakes: [
      'Calling `@lru_cache` on functions that take unhashable arguments (like lists or dicts); arguments MUST be hashable.',
      'Forgetting that `@lru_cache` without `maxsize=None` or with a small limit can evict items in recursive functions.',
    ],
    interviewRelevance:
      'Universal interview tool: using `@lru_cache` in Top-Down Dynamic Programming problems (Climbing Stairs, Coin Change, House Robber).',
    checkpoints: [
      { id: 'py-57-cp-1', label: 'Use @lru_cache(maxsize=None) for memoized DP recursion.' },
      { id: 'py-57-cp-2', label: 'Function arguments must be hashable for lru_cache.' },
    ],
    practiceExercises: [
      {
        id: 'py-57-ex-1',
        title: 'Climbing Stairs DP with lru_cache',
        difficulty: 'Beginner',
        type: 'coding',
        prompt: 'Solve the Climbing Stairs problem (1 or 2 steps at a time) for n=30 using `@lru_cache`.',
        starterCode: 'from functools import lru_cache\ndef climb_stairs(n: int) -> int:\n    pass',
        solution: `from functools import lru_cache

@lru_cache(maxsize=None)
def climb_stairs(n: int) -> int:
    if n <= 2:
        return n
    return climb_stairs(n - 1) + climb_stairs(n - 2)

print("Ways to climb 30 stairs:", climb_stairs(30))  # 1346269`,
        explanation: 'Instantly solves $O(2^n)$ problem in $O(n)$ time.',
      },
      {
        id: 'py-57-ex-2',
        title: 'Custom Base Converter with partial',
        difficulty: 'Intermediate',
        type: 'coding',
        prompt: 'Use `functools.partial` with built-in `int` to create `from_hex` and `from_octal` functions.',
        starterCode: 'from functools import partial\n# Create from_hex and from_octal',
        solution: `from functools import partial

from_hex = partial(int, base=16)
from_octal = partial(int, base=8)

print("Hex FF:", from_hex("FF"))      # 255
print("Octal 77:", from_octal("77"))  # 63`,
        explanation: 'Freezes base parameter to create specialized base conversion callables.',
      },
      {
        id: 'py-57-ex-3',
        title: 'Memoize with Cache Clear API',
        difficulty: 'Advanced',
        type: 'coding',
        prompt: 'Demonstrate inspecting `cache_info()` and clearing the cache using `func.cache_clear()`.',
        starterCode: 'from functools import lru_cache\n# Demonstrate cache_clear',
        solution: `from functools import lru_cache

@lru_cache(maxsize=10)
def compute(x): return x * 2

compute(5)
compute(5)
print("Hits before clear:", compute.cache_info().hits)  # 1
compute.cache_clear()
print("Size after clear:", compute.cache_info().currsize)  # 0`,
        explanation: 'cache_clear() resets memoization cache to prevent memory accumulation.',
      },
    ],
    quizQuestions: [
      {
        id: 'py-57-q1',
        question: 'What requirement must arguments satisfy to be passed into an @lru_cache decorated function?',
        options: [
          'They must all be integers',
          'They must be hashable objects (e.g. ints, strings, tuples)',
          'They must be JSON serializable',
          'They cannot exceed 3 arguments',
        ],
        correctOptionIndex: 1,
        explanation: 'lru_cache stores results in an internal dictionary keyed by the arguments; therefore, all arguments must be hashable.',
      },
      {
        id: 'py-57-q2',
        question: 'What does functools.partial(func, *args, **kwargs) return?',
        options: [
          'The result of executing func immediately',
          'A new callable object with the specified arguments pre-applied',
          'A generator',
          'None',
        ],
        correctOptionIndex: 1,
        explanation: 'partial returns a new partial object which behaves like func called with the supplied arguments pre-filled.',
      },
    ],
    revisionNotes: [
      '@lru_cache(maxsize=None) turns exponential recursion into linear DP.',
      'Arguments to cached functions MUST be hashable.',
      'functools.partial freezes specific arguments for reuse.',
    ],
  },
  {
    id: 'py-58-type-hints-dataclasses',
    moduleId: 'py-m5',
    moduleNumber: 5,
    moduleTitle: 'Advanced Python',
    topicNumber: 58,
    title: 'Type Hints, Annotations & Dataclasses (@dataclass)',
    language: 'python',
    level: 'Advanced',
    whyItMatters:
      'Modern Python uses static type annotations (`typing` module) and `@dataclass` (PEP 557) to write self-documenting, maintainable data structures without boilerplate `__init__`, `__repr__`, and `__eq__` methods.',
    explanation:
      'Python type hints (PEP 484) add optional type annotations to variables, parameters, and returns (e.g. `def f(x: int) -> str:`). Python 3.10+ supports modern union syntax (`int | str` instead of `Union[int, str]`). `@dataclass` automatically generates `__init__`, `__repr__`, `__eq__`, and optional `frozen=True` (immutability) from declared type-annotated fields, drastically reducing boilerplate code.',
    syntaxAndStructure:
      'from dataclasses import dataclass, field\n\n@dataclass(frozen=True)\nclass Candidate:\n    id: int\n    name: str\n    skills: list[str] = field(default_factory=list)\n    is_hired: bool = False\n\n# Automatically generated __init__, __repr__, __eq__!\nc = Candidate(1, "Aarav", ["Python", "SQL"])',
    codeExamples: [
      {
        title: 'Modern Dataclass with Field Defaults and Immutability',
        code: `from dataclasses import dataclass, field

@dataclass
class JobApplication:
    candidate_name: str
    target_role: str
    expected_salary: float
    skills: list[str] = field(default_factory=list) # Safe default for mutable types!

    def summary(self) -> str:
        return f"{self.candidate_name} applying for {self.target_role} with {len(self.skills)} skills"

app1 = JobApplication("Aarav", "SDE-1", 95000.0, ["Python", "Algorithms"])
app2 = JobApplication("Aarav", "SDE-1", 95000.0, ["Python", "Algorithms"])

# 1. Automatic __repr__:
print("Dataclass repr:", app1)

# 2. Automatic value equality __eq__:
print("app1 == app2 (Value Equality):", app1 == app2)

# 3. Method invocation:
print(app1.summary())`,
        expectedOutput: `Dataclass repr: JobApplication(candidate_name='Aarav', target_role='SDE-1', expected_salary=95000.0, skills=['Python', 'Algorithms'])
app1 == app2 (Value Equality): True
Aarav applying for SDE-1 with 2 skills`,
        explanation: '@dataclass automatically synthesizes __init__, __repr__, and __eq__ from field annotations.',
      },
      {
        title: 'Modern Type Hints with Union and Optional (Python 3.10+)',
        code: `def process_id(identifier: int | str) -> str:
    """Accepts either int or str using Python 3.10+ pipe union syntax."""
    if isinstance(identifier, int):
        return f"ID-{identifier:06d}"
    return identifier.upper()

print(process_id(42))
print(process_id("emp_abc"))`,
        expectedOutput: `ID-000042
EMP_ABC`,
        explanation: 'Python 3.10 replaces typing.Union[int, str] with clean pipe notation `int | str`.',
      },
    ],
    realWorldApplications: [
      'Data Transfer Objects (DTOs) in web APIs and clean architecture layers.',
      'Immutable domain state models using `@dataclass(frozen=True)`.',
    ],
    commonMistakes: [
      'Using mutable defaults directly in dataclasses (e.g. `skills: list = []`); dataclasses strictly require `field(default_factory=list)`.',
      'Assuming type hints enforce types at runtime; Python does NOT check types at runtime without external tools like Pydantic or Mypy.',
    ],
    interviewRelevance:
      'Standard modern Python architecture question: "Why do we use @dataclass over traditional classes or namedtuples?".',
    checkpoints: [
      { id: 'py-58-cp-1', label: 'Use @dataclass to eliminate boilerplate __init__ and __repr__.' },
      { id: 'py-58-cp-2', label: 'Use field(default_factory=list) for mutable default values.' },
    ],
    practiceExercises: [
      {
        id: 'py-58-ex-1',
        title: 'Immutable Point Dataclass',
        difficulty: 'Beginner',
        type: 'coding',
        prompt: 'Create a frozen `Point` dataclass with `x: float` and `y: float`, verifying that mutating `p.x` raises `FrozenInstanceError`.',
        starterCode: 'from dataclasses import dataclass\n# Create frozen Point dataclass',
        solution: `from dataclasses import dataclass, FrozenInstanceError

@dataclass(frozen=True)
class Point:
    x: float
    y: float

p = Point(1.0, 2.0)
try:
    p.x = 99.0  # Raises FrozenInstanceError
except FrozenInstanceError as e:
    print("Caught mutation error on frozen dataclass:", type(e).__name__)`,
        explanation: 'frozen=True makes instances immutable and automatically hashable.',
      },
      {
        id: 'py-58-ex-2',
        title: 'Post-Init Validation in Dataclass',
        difficulty: 'Intermediate',
        type: 'coding',
        prompt: 'Use `__post_init__` in a `Student(name, gpa)` dataclass to validate that `0.0 <= gpa <= 4.0`.',
        starterCode: 'from dataclasses import dataclass\n# Implement __post_init__ validation',
        solution: `from dataclasses import dataclass

@dataclass
class Student:
    name: str
    gpa: float

    def __post_init__(self):
        if not (0.0 <= self.gpa <= 4.0):
            raise ValueError(f"GPA {self.gpa} is out of bounds (0.0 - 4.0)")

s = Student("Diya", 3.85)
print(f"Student {s.name} validated with GPA {s.gpa}")`,
        explanation: '__post_init__ executes immediately after generated __init__ to run custom invariant checks.',
      },
      {
        id: 'py-58-ex-3',
        title: 'Recursive Tree Node Dataclass',
        difficulty: 'Advanced',
        type: 'coding',
        prompt: 'Create a `TreeNode` dataclass with `val: int`, `left: TreeNode | None = None`, and `right: TreeNode | None = None`.',
        starterCode: 'from dataclasses import dataclass\n# Recursive TreeNode dataclass',
        solution: `from dataclasses import dataclass

@dataclass
class TreeNode:
    val: int
    left: 'TreeNode | None' = None
    right: 'TreeNode | None' = None

root = TreeNode(10, TreeNode(5), TreeNode(15))
print("Root val:", root.val, "Left child val:", root.left.val)`,
        explanation: 'Clean recursive dataclass definition for binary trees.',
      },
    ],
    quizQuestions: [
      {
        id: 'py-58-q1',
        question: 'How should mutable default values (like lists) be specified for fields in a @dataclass?',
        options: [
          'items: list = []',
          'items: list = field(default_factory=list)',
          'items: list = list()',
          'items: list = default([])',
        ],
        correctOptionIndex: 1,
        explanation: 'Dataclasses strictly prohibit mutable defaults directly; you must use field(default_factory=list).',
      },
      {
        id: 'py-58-q2',
        question: 'Which parameter makes a @dataclass immutable and hashable?',
        options: ['@dataclass(immutable=True)', '@dataclass(frozen=True)', '@dataclass(static=True)', '@dataclass(lock=True)'],
        correctOptionIndex: 1,
        explanation: 'Setting frozen=True emulates read-only frozen instances and synthesizes a __hash__ method.',
      },
    ],
    revisionNotes: [
      '@dataclass synthesizes __init__, __repr__, and __eq__ automatically.',
      'Use field(default_factory=list) for mutable defaults.',
      'frozen=True produces immutable, hashable instances.',
    ],
  },
];

export const module5: MasteryModule = {
  id: 'py-m5',
  number: 5,
  title: 'Advanced Python',
  description: 'Exceptions, file I/O, modules, import mechanics, venv, iterator protocol, context managers, regex, JSON, datetime, collections, itertools, functools, and dataclasses.',
  language: 'python',
  topics: module5Topics,
  moduleAssessment: {
    id: 'py-m5-exam',
    title: 'Advanced Python Milestone Assessment',
    passingScorePercentage: 70,
    questions: module5Topics.flatMap((t) => t.quizQuestions),
  },
  revisionQuestions: [
    'Explain the role of the else clause in try-except-else-finally.',
    'Why is collections.deque preferred over list for queue operations?',
    'What does @contextlib.contextmanager do, and how does yield function within it?',
    'Explain how @functools.lru_cache transforms recursive DP algorithms.',
    'What is the difference between shallow copy and deep copy when handling dataclasses?',
  ],
};
