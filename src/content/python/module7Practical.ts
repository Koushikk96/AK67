import { MasteryTopic, MasteryModule } from '@/types/mastery';

export const module7Topics: MasteryTopic[] = [
  {
    id: 'py-71-file-processing',
    moduleId: 'py-m7',
    moduleNumber: 7,
    moduleTitle: 'Practical Python & Applied Development',
    topicNumber: 71,
    title: 'Structured File Processing & pathlib',
    language: 'python',
    level: 'Intermediate',
    whyItMatters:
      'Real-world software constantly interacts with files, configurations, and logs. Using modern pathlib provides cross-platform, object-oriented filesystem paths that replace fragile os.path string manipulations.',
    explanation:
      'Python provides the modern pathlib module (since Python 3.4) alongside traditional open() context managers. A Path object allows intuitive path joining with the / operator, checking file existence, inspecting extensions, reading/writing text or bytes directly (.read_text(), .write_text()), and safely traversing directory trees (.glob(), .rglob()). Always use context managers (with open(...) as f:) to guarantee deterministic resource cleanup even if exceptions occur.',
    syntaxAndStructure:
      'from pathlib import Path\n\n# Path manipulation\np = Path("data") / "logs" / "app.log"\nprint(p.exists(), p.is_file(), p.suffix, p.parent)\n\n# Direct read/write\np.write_text("log line", encoding="utf-8")\ncontent = p.read_text(encoding="utf-8")\n\n# Directory traversal\nfor py_file in Path(".").rglob("*.py"):\n    print(py_file)',
    codeExamples: [
      {
        title: 'Modern Filesystem Traversal & Pathlib Operations',
        code: `from pathlib import Path
import tempfile

with tempfile.TemporaryDirectory() as tmp_dir:
    base = Path(tmp_dir)
    docs = base / "reports"
    docs.mkdir(parents=True, exist_ok=True)

    file_a = docs / "q1_sales.txt"
    file_b = docs / "q2_sales.txt"
    file_a.write_text("Revenue: $15000\\nProfit: $4200", encoding="utf-8")
    file_b.write_text("Revenue: $18500\\nProfit: $5100", encoding="utf-8")

    # Iterate over files using glob
    print(f"Files found in {docs.name}:")
    for file_path in sorted(docs.glob("*.txt")):
        size = file_path.stat().st_size
        print(f"- {file_path.name} ({size} bytes, ext: {file_path.suffix})")

    # Read content
    print("\\nReading first file:")
    print(file_a.read_text(encoding="utf-8"))`,
        expectedOutput: `Files found in reports:
- q1_sales.txt (30 bytes, ext: .txt)
- q2_sales.txt (30 bytes, ext: .txt)

Reading first file:
Revenue: $15000
Profit: $4200`,
        explanation:
          'pathlib.Path abstracts OS-specific slashes (\\ vs /) and eliminates boilerplate open/close loops for simple files.',
      },
      {
        title: 'Safe Buffered Stream Reading for Large Files',
        code: `from io import StringIO

mock_data = "line 1\\nline 2\\nline 3\\nline 4\\n"

def process_large_stream(stream, chunk_size=2):
    buffer = []
    for line in stream:
        buffer.append(line.strip().upper())
        if len(buffer) == chunk_size:
            print("Processed chunk:", buffer)
            buffer = []
    if buffer:
        print("Processed final chunk:", buffer)

with StringIO(mock_data) as f:
    process_large_stream(f)`,
        expectedOutput: `Processed chunk: ['LINE 1', 'LINE 2']
Processed chunk: ['LINE 3', 'LINE 4']`,
        explanation:
          'Iterating directly over a file object reads line-by-line using an internal buffer without loading the entire multi-gigabyte file into memory at once.',
      },
    ],
    realWorldApplications: [
      'Scanning log folders to extract error traces in microservices.',
      'Batch processing images, dataset directories, and config files in ML workflows.',
      'Automated backup and archival scripts in system administration.',
    ],
    commonMistakes: [
      'Using manual string concatenation (e.g., path + "/" + file) which fails on Windows systems.',
      'Forgetting the encoding="utf-8" parameter when opening text files, leading to UnicodeDecodeError across different OS environments.',
      'Opening files with open() without a context manager, causing leaked file descriptors.',
    ],
    interviewRelevance:
      'Interviewers test how you handle files exceeding RAM (lazy line-by-line iteration vs readlines()) and expect you to know pathlib.Path instead of legacy os.path.',
    checkpoints: [
      { id: 'py-71-cp-1', label: 'Use Pathlib for path creation, directory checks, and glob searches.' },
      { id: 'py-71-cp-2', label: 'Understand memory-safe streaming for large files with context managers.' },
    ],
    practiceExercises: [
      {
        id: 'py-71-ex-1',
        title: 'Count Words in File Text',
        difficulty: 'Beginner',
        type: 'coding',
        prompt: 'Write a function count_words(text: str) -> int that splits text by whitespace and returns the total word count.',
        starterCode: 'def count_words(text: str) -> int:\n    # TODO\n    pass',
        solution: `def count_words(text: str) -> int:\n    return len(text.split())`,
        explanation: 'split() with no arguments splits on any whitespace sequence including tabs and newlines.',
      },
      {
        id: 'py-71-ex-2',
        title: 'Filter Files by Extension with Pathlib',
        difficulty: 'Intermediate',
        type: 'coding',
        prompt: 'Write a function filter_by_ext(paths: list[str], ext: str) -> list[str] that uses Path(p).suffix to filter and return paths ending with the specified extension (e.g. ".py").',
        starterCode: 'from pathlib import Path\n\ndef filter_by_ext(paths: list[str], ext: str) -> list[str]:\n    # TODO\n    pass',
        solution: `from pathlib import Path\n\ndef filter_by_ext(paths: list[str], ext: str) -> list[str]:\n    return [p for p in paths if Path(p).suffix.lower() == ext.lower()]`,
        explanation: 'Path(p).suffix extracts the extension with leading dot (.py). Comparing case-insensitively handles Windows/macOS differences.',
      },
      {
        id: 'py-71-ex-3',
        title: 'Memory Safe File Tail',
        difficulty: 'Advanced',
        type: 'coding',
        prompt: 'Implement tail_lines(lines: list[str], n: int) -> list[str] using collections.deque with maxlen=n to keep only the last n lines in O(1) space.',
        starterCode: 'from collections import deque\n\ndef tail_lines(lines: list[str], n: int) -> list[str]:\n    # TODO\n    pass',
        solution: `from collections import deque\n\ndef tail_lines(lines: list[str], n: int) -> list[str]:\n    dq = deque(maxlen=n)\n    for line in lines:\n        dq.append(line)\n    return list(dq)`,
        explanation: 'deque(maxlen=n) automatically discards the oldest item from the left when full, keeping memory bounded to O(n).',
      },
    ],
    quizQuestions: [
      {
        id: 'py-71-q1',
        question: 'Which method on a pathlib.Path object checks if a path exists and is a regular file?',
        options: ['p.is_file()', 'p.is_regular()', 'p.isfile()', 'p.exists_file()'],
        correctOptionIndex: 0,
        explanation: 'p.is_file() returns True if the path exists and points to a regular file (not a directory or symlink).',
      },
      {
        id: 'py-71-q2',
        question: 'What is the most memory-efficient way to process a 50GB log file in Python?',
        options: [
          'lines = f.readlines(); for line in lines: ...',
          'content = f.read(); for line in content.splitlines(): ...',
          'with open(...) as f: for line in f: ...',
          'import mmap; mmap.read_all()',
        ],
        correctOptionIndex: 2,
        explanation: 'Iterating over f directly uses an internal buffer and yields lines one at a time, consuming O(1) memory instead of loading 50GB into RAM.',
      },
    ],
    revisionNotes: [
      'Prefer pathlib.Path over os.path for modern, readable, cross-platform filesystem logic.',
      'Always use context managers (with open(...) as f:) to close file handles deterministically.',
      'Pass encoding="utf-8" explicitly to prevent platform-dependent decoding bugs.',
      'Iterate over file objects directly for memory-safe line-by-line processing.',
    ],
  },
  {
    id: 'py-72-csv-json-processing',
    moduleId: 'py-m7',
    moduleNumber: 7,
    moduleTitle: 'Practical Python & Applied Development',
    topicNumber: 72,
    title: 'CSV & JSON Processing',
    language: 'python',
    level: 'Intermediate',
    whyItMatters:
      'CSV and JSON are the two universal interchange formats for databases, REST APIs, spreadsheets, and data analytics pipelines.',
    explanation:
      'Python standard library includes the csv and json modules. For CSV, csv.DictReader and csv.DictWriter allow mapping rows to dictionaries keyed by header names, preventing index-shifting bugs when columns change order. For JSON, json.loads() and json.dumps() convert between JSON strings and Python dictionaries/lists, while json.load() and json.dump() operate directly on file streams. Custom serialization can be handled using a custom JSONEncoder or default function.',
    syntaxAndStructure:
      'import json\nimport csv\n\n# JSON serialization\ndata = {"name": "Alice", "score": 98}\njson_str = json.dumps(data, indent=2)\nparsed = json.loads(json_str)\n\n# CSV DictReader\nwith open("data.csv", newline="", encoding="utf-8") as f:\n    reader = csv.DictReader(f)\n    for row in reader:\n        print(row["Name"], row["Score"])',
    codeExamples: [
      {
        title: 'Working with CSV DictReader and DictWriter',
        code: `import csv
from io import StringIO

csv_input = """name,department,salary
Alice,Engineering,95000
Bob,Marketing,62000
Charlie,Engineering,105000"""

# Read CSV into dictionaries
records = []
with StringIO(csv_input) as f:
    reader = csv.DictReader(f)
    for row in reader:
        row["salary"] = int(row["salary"])
        records.append(row)

# Filter and write out modified CSV
output_stream = StringIO()
fieldnames = ["name", "salary", "bonus"]
writer = csv.DictWriter(output_stream, fieldnames=fieldnames)
writer.writeheader()

for r in records:
    if r["department"] == "Engineering":
        writer.writerow({
            "name": r["name"],
            "salary": r["salary"],
            "bonus": int(r["salary"] * 0.15),
        })

print("Transformed CSV:")
print(output_stream.getvalue().strip())`,
        expectedOutput: `Transformed CSV:
name,salary,bonus
Alice,95000,14250
Charlie,105000,15750`,
        explanation:
          'DictReader automatically uses the first row as dictionary keys. newline="" when opening CSV files prevents empty blank lines on Windows.',
      },
      {
        title: 'Complex Nested JSON Serialization & Custom Encoders',
        code: `import json
from datetime import datetime

class StudentReport:
    def __init__(self, student_id: str, grades: list[int]):
        self.student_id = student_id
        self.grades = grades
        self.generated_at = datetime(2026, 11, 24, 12, 0, 0)

def custom_serializer(obj):
    if isinstance(obj, datetime):
        return obj.isoformat()
    if isinstance(obj, StudentReport):
        return {
            "id": obj.student_id,
            "average": sum(obj.grades) / len(obj.grades),
            "grades": obj.grades,
            "timestamp": obj.generated_at
        }
    raise TypeError(f"Object of type {type(obj)} is not JSON serializable")

report = StudentReport("S101", [92, 88, 96, 95])
json_output = json.dumps(report, default=custom_serializer, indent=2)
print("Serialized JSON:")
print(json_output)`,
        expectedOutput: `Serialized JSON:
{
  "id": "S101",
  "average": 92.75,
  "grades": [
    92,
    88,
    96,
    95
  ],
  "timestamp": "2026-11-24T12:00:00"
}`,
        explanation:
          'Passing default=custom_serializer to json.dumps gracefully converts non-native types (e.g. datetime, custom classes) to JSON-compatible primitives.',
      },
    ],
    realWorldApplications: [
      'Importing and exporting customer datasets for Excel/Sheets interchange.',
      'Parsing payloads in REST APIs and messaging queues (Kafka, RabbitMQ, SQS).',
      'Configuring server applications via settings.json.',
    ],
    commonMistakes: [
      'Omitting newline="" when opening CSV files in Python 3, causing extra blank rows on Windows.',
      'Confusing json.load() (reads file stream) with json.loads() (parses string).',
      'Failing to handle dates, sets, or Decimals when serializing to JSON without a default converter.',
    ],
    interviewRelevance:
      'Parsing JSON payloads and flattening nested dictionary structures are staple interview problems for backend and data engineering roles.',
    checkpoints: [
      { id: 'py-72-cp-1', label: 'Use csv.DictReader and csv.DictWriter with header fields.' },
      { id: 'py-72-cp-2', label: 'Serialize and deserialize JSON with custom types using default callbacks.' },
    ],
    practiceExercises: [
      {
        id: 'py-72-ex-1',
        title: 'Parse JSON String and Extract Key',
        difficulty: 'Beginner',
        type: 'coding',
        prompt: 'Write a function extract_version(json_str: str) -> str that safely parses a JSON string and returns the "version" key, or "unknown" if missing.',
        starterCode: 'import json\n\ndef extract_version(json_str: str) -> str:\n    # TODO\n    pass',
        solution: `import json\n\ndef extract_version(json_str: str) -> str:\n    try:\n        data = json.loads(json_str)\n        return data.get("version", "unknown")\n    except (json.JSONDecodeError, TypeError):\n        return "unknown"`,
        explanation: 'json.loads parses string to dict; .get("version", "unknown") provides a safe fallback without raising KeyError.',
      },
      {
        id: 'py-72-ex-2',
        title: 'Flatten 2-Level Nested Dict',
        difficulty: 'Intermediate',
        type: 'coding',
        prompt: 'Write a function flatten_dict(d: dict) -> dict that flattens a 2-level dictionary by joining keys with underscores (e.g. {"a": {"b": 1}} -> {"a_b": 1}).',
        starterCode: 'def flatten_dict(d: dict) -> dict:\n    # TODO\n    pass',
        solution: `def flatten_dict(d: dict) -> dict:\n    out = {}\n    for k, v in d.items():\n        if isinstance(v, dict):\n            for sub_k, sub_v in v.items():\n                out[f"{k}_{sub_k}"] = sub_v\n        else:\n            out[k] = v\n    return out`,
        explanation: 'Inspects each value; if it is a dict, keys are concatenated as f"{k}_{sub_k}".',
      },
      {
        id: 'py-72-ex-3',
        title: 'Serialize Set to JSON with Custom Encoder',
        difficulty: 'Advanced',
        type: 'coding',
        prompt: 'Write a function serialize_with_sets(data: dict) -> str that returns a JSON string where all set instances are serialized as sorted lists.',
        starterCode: 'import json\n\ndef serialize_with_sets(data: dict) -> str:\n    # TODO\n    pass',
        solution: `import json\n\ndef serialize_with_sets(data: dict) -> str:\n    def handler(obj):\n        if isinstance(obj, set):\n            return sorted(list(obj))\n        raise TypeError(f"Unserializable type: {type(obj)}")\n    return json.dumps(data, default=handler)`,
        explanation: 'Passing a custom handler converting sets to sorted lists prevents TypeError: Object of type set is not JSON serializable.',
      },
    ],
    quizQuestions: [
      {
        id: 'py-72-q1',
        question: 'What is the key difference between json.dump() and json.dumps()?',
        options: [
          'json.dump() writes to a file-like stream; json.dumps() returns a Python string.',
          'json.dump() is for fast dumping; json.dumps() handles security sanitization.',
          'json.dumps() writes to a database; json.dump() returns an AST.',
          'They are identical aliases.',
        ],
        correctOptionIndex: 0,
        explanation: 'The "s" in dumps and loads stands for "string"; functions without "s" accept file stream objects.',
      },
      {
        id: 'py-72-q2',
        question: 'Why should newline="" always be specified when opening a file for the csv module?',
        options: [
          'To disable reading byte-order marks.',
          'To prevent csv reader/writer from writing extra carriage return characters on Windows.',
          'To force ASCII-only encoding.',
          'To compress the output in memory.',
        ],
        correctOptionIndex: 1,
        explanation: 'The csv module performs its own newline handling; omitting newline="" causes Python universal newlines to translate \\r\\n into \\r\\r\\n on Windows.',
      },
    ],
    revisionNotes: [
      'Use csv.DictReader and csv.DictWriter to prevent header position fragility.',
      'Always open CSV files with newline="" and explicit encoding="utf-8".',
      'Use json.loads()/json.dumps() for strings and json.load()/json.dump() for files.',
      'Provide default=callable to json.dumps to serialize custom objects like dates and sets.',
    ],
  },
  {
    id: 'py-73-http-rest-apis',
    moduleId: 'py-m7',
    moduleNumber: 7,
    moduleTitle: 'Practical Python & Applied Development',
    topicNumber: 73,
    title: 'HTTP Requests & REST API Fundamentals',
    language: 'python',
    level: 'Intermediate',
    whyItMatters:
      'Modern applications rely on HTTP APIs to communicate with cloud services, payment gateways, authentication providers, and microservices.',
    explanation:
      'Python can communicate over HTTP using the standard library urllib.request or the popular third-party requests and httpx libraries. Understanding HTTP verbs (GET, POST, PUT, DELETE, PATCH), status codes (200 OK, 201 Created, 400 Bad Request, 401 Unauthorized, 404 Not Found, 500 Server Error), headers (Authorization, Content-Type), query parameters, and JSON payloads is essential for backend engineering.',
    syntaxAndStructure:
      'import urllib.request\nimport urllib.parse\nimport json\n\n# GET Request with urllib\nreq = urllib.request.Request("https://api.example.com/users", headers={"User-Agent": "PythonApp"})\nwith urllib.request.urlopen(req) as resp:\n    data = json.loads(resp.read().decode("utf-8"))\n\n# Concept with requests:\n# resp = requests.get("https://api.example.com/users", params={"page": 1})\n# resp.raise_for_status()',
    codeExamples: [
      {
        title: 'Mock HTTP Client with Retry Logic & Status Handling',
        code: `class MockResponse:
    def __init__(self, status_code: int, data: dict):
        self.status_code = status_code
        self.data = data

    def json(self):
        return self.data

    def raise_for_status(self):
        if self.status_code >= 400:
            raise RuntimeError(f"HTTP Error {self.status_code}: {self.data.get('error', 'Unknown')}")

def mock_fetch_user(user_id: int) -> MockResponse:
    database = {
        1: {"id": 1, "name": "Alice", "role": "admin"},
        2: {"id": 2, "name": "Bob", "role": "user"}
    }
    if user_id in database:
        return MockResponse(200, database[user_id])
    return MockResponse(404, {"error": "User not found"})

# Safe client execution
for target_id in [1, 99]:
    resp = mock_fetch_user(target_id)
    try:
        resp.raise_for_status()
        print(f"Success for user {target_id}:", resp.json()["name"])
    except RuntimeError as err:
        print(f"Failed for user {target_id}:", err)`,
        expectedOutput: `Success for user 1: Alice
Failed for user 99: HTTP Error 404: User not found`,
        explanation:
          'Simulates robust HTTP client error handling pattern: checking status codes and raising exceptions on 4xx/5xx responses.',
      },
      {
        title: 'Constructing Query Parameters and Headers',
        code: `import urllib.parse

def build_api_url(base_url: str, endpoint: str, query_params: dict) -> str:
    cleaned_params = {k: v for k, v in query_params.items() if v is not None}
    query_string = urllib.parse.urlencode(cleaned_params)
    url = f"{base_url.rstrip('/')}/{endpoint.lstrip('/')}"
    if query_string:
        url += f"?{query_string}"
    return url

url = build_api_url(
    "https://api.github.com/",
    "/repos/octocat/Hello-World/issues",
    {"state": "open", "sort": "created", "direction": "desc", "filter": None}
)
print("Constructed URL:")
print(url)`,
        expectedOutput: `Constructed URL:
https://api.github.com/repos/octocat/Hello-World/issues?state=open&sort=created&direction=desc`,
        explanation:
          'urllib.parse.urlencode encodes dictionary key-values into percent-encoded query parameter strings, filtering out None values.',
      },
    ],
    realWorldApplications: [
      'Integrating third-party payment gateways (Stripe, Razorpay, PayPal).',
      'Consuming LLM and AI APIs (OpenAI, Gemini, Anthropic) via REST endpoints.',
      'Scraping and health-monitoring distributed microservices.',
    ],
    commonMistakes: [
      'Not setting a timeout on network requests, which can hang server threads indefinitely.',
      'Checking response.status_code == 200 instead of checking 200 <= status_code < 300 (or response.ok / raise_for_status()).',
      'Embedding sensitive API keys in URLs or hardcoding them in plain text source files instead of environment variables.',
    ],
    interviewRelevance:
      'Every backend interview expects solid knowledge of REST conventions, idempotency (GET/PUT/DELETE are idempotent; POST is not), and error status codes.',
    checkpoints: [
      { id: 'py-73-cp-1', label: 'Understand HTTP methods, status code categories, and headers.' },
      { id: 'py-73-cp-2', label: 'Handle timeouts, query string encoding, and network errors gracefully.' },
    ],
    practiceExercises: [
      {
        id: 'py-73-ex-1',
        title: 'Categorize HTTP Status Code',
        difficulty: 'Beginner',
        type: 'coding',
        prompt: 'Write a function categorize_status(code: int) -> str returning "Informational", "Success", "Redirection", "Client Error", or "Server Error" based on HTTP status code ranges.',
        starterCode: 'def categorize_status(code: int) -> str:\n    # TODO\n    pass',
        solution: `def categorize_status(code: int) -> str:\n    if 100 <= code <= 199: return "Informational"\n    if 200 <= code <= 299: return "Success"\n    if 300 <= code <= 399: return "Redirection"\n    if 400 <= code <= 499: return "Client Error"\n    if 500 <= code <= 599: return "Server Error"\n    return "Unknown"`,
        explanation: 'Status code ranges: 1xx Info, 2xx Success, 3xx Redirect, 4xx Client Error, 5xx Server Error.',
      },
      {
        id: 'py-73-ex-2',
        title: 'Check HTTP Idempotency',
        difficulty: 'Intermediate',
        type: 'coding',
        prompt: 'Write a function is_idempotent(method: str) -> bool returning True for GET, HEAD, PUT, DELETE, and OPTIONS, and False for POST or PATCH.',
        starterCode: 'def is_idempotent(method: str) -> bool:\n    # TODO\n    pass',
        solution: `def is_idempotent(method: str) -> bool:\n    idempotent_verbs = {"GET", "HEAD", "PUT", "DELETE", "OPTIONS"}\n    return method.upper() in idempotent_verbs`,
        explanation: 'An idempotent HTTP method produces the same server state whether executed once or multiple times.',
      },
      {
        id: 'py-73-ex-3',
        title: 'Exponential Backoff Retry Calculator',
        difficulty: 'Advanced',
        type: 'coding',
        prompt: 'Write a function calculate_backoff(attempt: int, base_delay: float = 1.0, max_delay: float = 32.0) -> float returning min(max_delay, base_delay * (2 ** attempt)).',
        starterCode: 'def calculate_backoff(attempt: int, base_delay: float = 1.0, max_delay: float = 32.0) -> float:\n    # TODO\n    pass',
        solution: `def calculate_backoff(attempt: int, base_delay: float = 1.0, max_delay: float = 32.0) -> float:\n    return min(max_delay, base_delay * (2 ** attempt))`,
        explanation: 'Standard exponential backoff formula delays retry attempts to relieve server pressure during outages.',
      },
    ],
    quizQuestions: [
      {
        id: 'py-73-q1',
        question: 'Which of the following HTTP methods is NOT idempotent according to RFC standards?',
        options: ['GET', 'PUT', 'DELETE', 'POST'],
        correctOptionIndex: 3,
        explanation: 'POST creates a new resource on each execution, so repeated identical POST requests create multiple resources.',
      },
      {
        id: 'py-73-q2',
        question: 'Why must you always provide a timeout parameter in HTTP network calls in production?',
        options: [
          'Because without a timeout, requests can hang indefinitely if the server does not respond, exhausting worker pools.',
          'Because HTTP/2 requires timeouts for multiplexing.',
          'Because Python raises a SyntaxError if timeout is omitted.',
          'To increase TCP packet throughput.',
        ],
        correctOptionIndex: 0,
        explanation: 'Default network calls without a timeout can block forever on unclosed TCP connections, locking up web worker processes.',
      },
    ],
    revisionNotes: [
      'Understand HTTP status code categories: 2xx success, 3xx redirect, 4xx client, 5xx server.',
      'GET, PUT, and DELETE are idempotent; POST is not idempotent.',
      'Always specify explicit request timeouts in production to avoid stalled worker threads.',
      'Store sensitive tokens and credentials in environment variables, never hardcoded.',
    ],
  },
  {
    id: 'py-74-sqlite-database',
    moduleId: 'py-m7',
    moduleNumber: 7,
    moduleTitle: 'Practical Python & Applied Development',
    topicNumber: 74,
    title: 'SQLite Database Interaction & Transactions',
    language: 'python',
    level: 'Intermediate',
    whyItMatters:
      'SQLite is bundled directly in the Python standard library, requiring zero server configuration. It powers local databases, integration testing, and embedded device storage.',
    explanation:
      'Python provides the sqlite3 module. Key concepts include establishing a connection (sqlite3.connect(":memory:") or file), creating cursors, executing SQL queries, fetching results (fetchone, fetchall), and managing ACID transactions. Always use parameterized queries (with ? placeholders) rather than string formatting to prevent SQL injection vulnerabilities. Connections can be used as context managers for automatic commit/rollback.',
    syntaxAndStructure:
      'import sqlite3\n\n# Connect and use cursor\nwith sqlite3.connect("app.db") as conn:\n    cursor = conn.cursor()\n    # Parameterized query (NEVER use f-strings!)\n    cursor.execute("SELECT * FROM users WHERE email = ?", (user_email,))\n    rows = cursor.fetchall()',
    codeExamples: [
      {
        title: 'In-Memory SQLite with Safe Parameterized Queries and Transactions',
        code: `import sqlite3

# Use in-memory DB for demonstration
conn = sqlite3.connect(":memory:")
cursor = conn.cursor()

# Create table
cursor.execute("""
CREATE TABLE accounts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    balance REAL NOT NULL CHECK(balance >= 0)
)
""")

# Insert records
users = [("alice", 500.0), ("bob", 300.0), ("charlie", 150.0)]
cursor.executemany("INSERT INTO accounts (username, balance) VALUES (?, ?)", users)
conn.commit()

# Safe transfer transaction
def transfer_funds(from_user: str, to_user: str, amount: float):
    try:
        with conn: # Begins transaction; commits on exit or rolls back on exception
            cursor.execute("UPDATE accounts SET balance = balance - ? WHERE username = ?", (amount, from_user))
            cursor.execute("UPDATE accounts SET balance = balance + ? WHERE username = ?", (amount, to_user))
            if cursor.rowcount == 0:
                raise ValueError("Target user does not exist")
            print(f"Transferred \${amount:.2f} from {from_user} to {to_user}")
    except sqlite3.IntegrityError as e:
        print("Transaction rolled back due to integrity violation:", e)

transfer_funds("alice", "bob", 200.0)

# Query balances
cursor.execute("SELECT username, balance FROM accounts ORDER BY username")
for row in cursor.fetchall():
    print(f"Account: {row[0]}, Balance: \${row[1]:.2f}")

conn.close()`,
        expectedOutput: `Transferred $200.00 from alice to bob
Account: alice, Balance: $300.00
Account: bob, Balance: $500.00
Account: charlie, Balance: $150.00`,
        explanation:
          'Using "with conn:" manages the transaction automatically; any exception triggers an immediate rollback to maintain ACID consistency.',
      },
      {
        title: 'sqlite3.Row Factory for Dictionary-Like Access',
        code: `import sqlite3

conn = sqlite3.connect(":memory:")
conn.row_factory = sqlite3.Row  # Access columns by name!
cur = conn.cursor()

cur.execute("CREATE TABLE products (id INTEGER, name TEXT, price REAL)")
cur.execute("INSERT INTO products VALUES (1, 'Mechanical Keyboard', 89.99)")

cur.execute("SELECT * FROM products WHERE id = 1")
row = cur.fetchone()

print("Column access by name:", row["name"])
print("Column access by index:", row[2])
print("Keys available:", row.keys())
conn.close()`,
        expectedOutput: `Column access by name: Mechanical Keyboard
Column access by index: 89.99
Keys available: ['id', 'name', 'price']`,
        explanation:
          'Setting conn.row_factory = sqlite3.Row enables column name indexing, making DB queries much easier to maintain than raw tuple offsets.',
      },
    ],
    realWorldApplications: [
      'Local caching layer for desktop and mobile apps.',
      'Unit and integration tests that require an isolated SQL database without spinning up Postgres.',
      'Storing offline client data in embedded edge devices and IoT gateways.',
    ],
    commonMistakes: [
      'Using f-strings or % formatting in SQL strings (e.g. f"SELECT * WHERE id = {user_id}"), which enables devastating SQL injection.',
      'Forgetting to call conn.commit() when modifying data outside a transaction context manager.',
      'Forgetting that passing a single parameter to execute() requires a 1-tuple: (val,) with a trailing comma.',
    ],
    interviewRelevance:
      'Interviewers evaluate candidates on SQL injection prevention (parameterized queries) and understanding ACID transactions (commit vs rollback).',
    checkpoints: [
      { id: 'py-74-cp-1', label: 'Execute parameterized INSERT/SELECT queries with ? placeholders.' },
      { id: 'py-74-cp-2', label: 'Use connection context managers for atomic transaction commit and rollback.' },
    ],
    practiceExercises: [
      {
        id: 'py-74-ex-1',
        title: 'Build Parameterized Query Tuple',
        difficulty: 'Beginner',
        type: 'coding',
        prompt: 'Write a function make_single_param_tuple(val: str) -> tuple that correctly returns a 1-element tuple containing val.',
        starterCode: 'def make_single_param_tuple(val: str) -> tuple:\n    # TODO\n    pass',
        solution: `def make_single_param_tuple(val: str) -> tuple:\n    return (val,)`,
        explanation: 'In Python, a single-element tuple requires a trailing comma: (val,); without the comma, (val) is just an expression in parentheses.',
      },
      {
        id: 'py-74-ex-2',
        title: 'Find Records Above Threshold',
        difficulty: 'Intermediate',
        type: 'coding',
        prompt: 'Given an in-memory sqlite3 connection with a table scores(player TEXT, score INT), write a function get_high_scorers(conn, min_score: int) -> list[str] returning names where score >= min_score.',
        starterCode: 'import sqlite3\n\ndef get_high_scorers(conn: sqlite3.Connection, min_score: int) -> list[str]:\n    # TODO\n    pass',
        solution: `import sqlite3\n\ndef get_high_scorers(conn: sqlite3.Connection, min_score: int) -> list[str]:\n    cur = conn.cursor()\n    cur.execute("SELECT player FROM scores WHERE score >= ? ORDER BY score DESC", (min_score,))\n    return [row[0] for row in cur.fetchall()]`,
        explanation: 'Uses parameterized placeholder ? to prevent injection and extracts column 0 from result tuples.',
      },
      {
        id: 'py-74-ex-3',
        title: 'Safe Transaction Wrapper',
        difficulty: 'Advanced',
        type: 'coding',
        prompt: 'Write a function execute_atomic_batch(conn: sqlite3.Connection, query: str, params_list: list[tuple]) -> bool that attempts to execute all params in a transaction, returning True on success or False if an error occurs and triggers rollback.',
        starterCode: 'import sqlite3\n\ndef execute_atomic_batch(conn: sqlite3.Connection, query: str, params_list: list[tuple]) -> bool:\n    # TODO\n    pass',
        solution: `import sqlite3\n\ndef execute_atomic_batch(conn: sqlite3.Connection, query: str, params_list: list[tuple]) -> bool:\n    try:\n        with conn:\n            conn.cursor().executemany(query, params_list)\n        return True\n    except sqlite3.Error:\n        return False`,
        explanation: '"with conn:" handles the transaction boundary. If executemany fails, the transaction is automatically rolled back and False is returned.',
      },
    ],
    quizQuestions: [
      {
        id: 'py-74-q1',
        question: 'Why should you never use string concatenation or f-strings to insert user data into SQL queries?',
        options: [
          'Because it reduces query execution speed by 10x.',
          'Because it opens the application to critical SQL injection attacks.',
          'Because SQLite does not support strings longer than 255 characters.',
          'Because SQLite syntax requires all strings to be encoded in UTF-16.',
        ],
        correctOptionIndex: 1,
        explanation: 'SQL injection occurs when untrusted input is interpolated into SQL statements, allowing attackers to modify query logic or dump tables.',
      },
      {
        id: 'py-74-q2',
        question: 'What special string can you pass to sqlite3.connect() to create an isolated database entirely in RAM?',
        options: ['":memory:"', '"temp"', '"null"', '"ramfs"'],
        correctOptionIndex: 0,
        explanation: 'sqlite3.connect(":memory:") instantiates an in-RAM transient database that disappears when the connection closes, ideal for tests.',
      },
    ],
    revisionNotes: [
      'SQLite is built into Python via import sqlite3 with zero setup required.',
      'Always use parameterized placeholders (?) to prevent SQL injection vulnerabilities.',
      'Use conn.row_factory = sqlite3.Row for dictionary-like column access.',
      'Use "with conn:" context managers for atomic commit and automatic rollback on errors.',
    ],
  },
  {
    id: 'py-75-pytest-testing',
    moduleId: 'py-m7',
    moduleNumber: 7,
    moduleTitle: 'Practical Python & Applied Development',
    topicNumber: 75,
    title: 'Unit Testing with pytest and unittest',
    language: 'python',
    level: 'Intermediate',
    whyItMatters:
      'Writing automated tests separates junior coders from professional software engineers. Robust tests ensure regressions are caught before reaching production.',
    explanation:
      'Python includes the standard unittest framework (xUnit-style, class-based). In industry, pytest has become the standard due to its concise syntax (plain assert statements), powerful fixture system with dependency injection, test parametrization (@pytest.mark.parametrize), and rich plugin ecosystem. Fixtures replace repetitive setUp/tearDown code and allow clean separation of concerns.',
    syntaxAndStructure:
      '# Standard unittest\nimport unittest\nclass TestMath(unittest.TestCase):\n    def test_add(self):\n        self.assertEqual(2 + 2, 4)\n\n# Modern pytest convention\nimport pytest\n@pytest.fixture\ndef sample_user():\n    return {"id": 1, "active": True}\n\n@pytest.mark.parametrize("x, expected", [(2, 4), (3, 9)])\ndef test_square(x, expected):\n    assert x * x == expected',
    codeExamples: [
      {
        title: 'unittest and pytest Assertions and Fixture Concept',
        code: `import unittest

def calculate_discount(price: float, discount_percent: float) -> float:
    if not (0 <= discount_percent <= 100):
        raise ValueError("Discount must be between 0 and 100")
    if price < 0:
        raise ValueError("Price cannot be negative")
    return round(price * (1 - discount_percent / 100), 2)

class TestDiscountCalculator(unittest.TestCase):
    def test_standard_discount(self):
        self.assertEqual(calculate_discount(100.0, 20.0), 80.0)
        self.assertEqual(calculate_discount(49.99, 10.0), 44.99)

    def test_zero_and_full_discount(self):
        self.assertEqual(calculate_discount(100.0, 0.0), 100.0)
        self.assertEqual(calculate_discount(100.0, 100.0), 0.0)

    def test_invalid_discount_raises_error(self):
        with self.assertRaises(ValueError):
            calculate_discount(100.0, -5.0)
        with self.assertRaises(ValueError):
            calculate_discount(100.0, 150.0)

# Run test suite programmatically
suite = unittest.defaultTestLoader.loadTestsFromTestCase(TestDiscountCalculator)
runner = unittest.TextTestRunner(verbosity=0)
result = runner.run(suite)
print(f"Tests run: {result.testsRun}, Errors: {len(result.errors)}, Failures: {len(result.failures)}")
print("All assertions passed:", result.wasSuccessful())`,
        expectedOutput: `Tests run: 3, Errors: 0, Failures: 0
All assertions passed: True`,
        explanation:
          'Demonstrates unittest.TestCase with assertEqual and assertRaises context managers to test happy paths and boundary error handling.',
      },
      {
        title: 'Parametrized Testing Pattern (Pytest-Style)',
        code: `def is_valid_identifier(s: str) -> bool:
    return s.isidentifier() and not s.startswith("_")

# Simulating pytest.mark.parametrize matrix
test_cases = [
    ("valid_name", True),
    ("user123", True),
    ("123invalid", False),
    ("_private", False),
    ("has space", False),
    ("class", True),  # isidentifier returns True for keywords
]

passed = 0
for input_str, expected in test_cases:
    actual = is_valid_identifier(input_str)
    assert actual == expected, f"Failed for {input_str}: expected {expected}, got {actual}"
    passed += 1

print(f"Parametrized test suite passed: {passed}/{len(test_cases)} scenarios verified.")`,
        expectedOutput: `Parametrized test suite passed: 6/6 scenarios verified.`,
        explanation:
          'Parametrized testing feeds multiple input/output scenarios through a single test function without duplicating test code.',
      },
    ],
    realWorldApplications: [
      'CI/CD pipeline test gates (GitHub Actions, GitLab CI) preventing broken commits.',
      'Refactoring legacy codebases with confidence using high test coverage.',
      'Test-Driven Development (TDD) for complex mathematical or business rule engines.',
    ],
    commonMistakes: [
      'Writing assertions with == in unittest without using self.assertEqual, missing helpful failure diffs.',
      'Testing implementation details rather than observable behavior and return values.',
      'Writing tests with external network/database dependencies that make test runs slow and flaky.',
    ],
    interviewRelevance:
      'Senior interviewers frequently ask how you test edge cases, how fixtures work in pytest, and how to mock external dependencies with unittest.mock.',
    checkpoints: [
      { id: 'py-75-cp-1', label: 'Write unit tests using assert and test discovery conventions.' },
      { id: 'py-75-cp-2', label: 'Use parametrized tests and fixtures for clean test data setup.' },
    ],
    practiceExercises: [
      {
        id: 'py-75-ex-1',
        title: 'Assert Equality with Custom Message',
        difficulty: 'Beginner',
        type: 'coding',
        prompt: 'Write a function verify_positive(n: int) that uses an assert statement to assert n > 0 with the error message "n must be positive".',
        starterCode: 'def verify_positive(n: int) -> None:\n    # TODO\n    pass',
        solution: `def verify_positive(n: int) -> None:\n    assert n > 0, "n must be positive"`,
        explanation: 'assert expression, message raises AssertionError(message) when the expression evaluates to False.',
      },
      {
        id: 'py-75-ex-2',
        title: 'Test Case Runner Simulator',
        difficulty: 'Intermediate',
        type: 'coding',
        prompt: 'Write a function run_tests(test_funcs: list) -> dict returning {"passed": int, "failed": int} by executing each zero-argument test function and catching AssertionError.',
        starterCode: 'def run_tests(test_funcs: list) -> dict:\n    # TODO\n    pass',
        solution: `def run_tests(test_funcs: list) -> dict:\n    passed, failed = 0, 0\n    for fn in test_funcs:\n        try:\n            fn()\n            passed += 1\n        except AssertionError:\n            failed += 1\n    return {"passed": passed, "failed": failed}`,
        explanation: 'Iterates through test callables, incrementing passed on clean return and failed on AssertionError.',
      },
      {
        id: 'py-75-ex-3',
        title: 'Custom Mock Return Value Helper',
        difficulty: 'Advanced',
        type: 'coding',
        prompt: 'Write a class SimpleMock that accepts a return_value in __init__ and tracks call_count, returning return_value whenever invoked as a function (__call__).',
        starterCode: 'class SimpleMock:\n    # TODO\n    pass',
        solution: `class SimpleMock:\n    def __init__(self, return_value=None):\n        self.return_value = return_value\n        self.call_count = 0\n\n    def __call__(self, *args, **kwargs):\n        self.call_count += 1\n        return self.return_value`,
        explanation: 'Implementing __call__ makes an instance callable, mirroring basic behavior of unittest.mock.Mock.',
      },
    ],
    quizQuestions: [
      {
        id: 'py-75-q1',
        question: 'What is the primary advantage of pytest fixtures over traditional unittest setUp methods?',
        options: [
          'Fixtures run in a separate process for isolation.',
          'Fixtures use dependency injection, are modular, can be scoped (function, module, session), and can yield teardown logic.',
          'Fixtures automatically convert Python code into C extensions.',
          'Fixtures only work with SQLite databases.',
        ],
        correctOptionIndex: 1,
        explanation: 'pytest fixtures provide fine-grained dependency injection and explicit parameter passing with flexible scoping.',
      },
      {
        id: 'py-75-q2',
        question: 'Which pytest decorator enables running the same test function across a matrix of multiple arguments?',
        options: ['@pytest.fixture', '@pytest.mark.matrix', '@pytest.mark.parametrize', '@pytest.repeat'],
        correctOptionIndex: 2,
        explanation: '@pytest.mark.parametrize("param1, param2", [val1, val2]) runs the test once for each item in the sequence.',
      },
    ],
    revisionNotes: [
      'pytest uses standard Python assert statements with rich introspection diffs.',
      'Use @pytest.mark.parametrize to test multiple inputs without code duplication.',
      'Use fixtures for reusable test dependencies and automatic cleanup via yield.',
      'Use unittest.mock.patch to isolate units from slow network or database calls.',
    ],
  },
  {
    id: 'py-76-debugging-pdb',
    moduleId: 'py-m7',
    moduleNumber: 7,
    moduleTitle: 'Practical Python & Applied Development',
    topicNumber: 76,
    title: 'Debugging Techniques & pdb',
    language: 'python',
    level: 'Intermediate',
    whyItMatters:
      'Print statements only go so far when hunting complex state bugs or race conditions. Knowing how to use an interactive debugger dramatically cuts diagnosis time.',
    explanation:
      'Python has a built-in interactive debugger called pdb. Since Python 3.7, calling the built-in breakpoint() function automatically drops execution into pdb without needing import pdb; pdb.set_trace(). Key debugger commands: n (next line), s (step into function), c (continue execution), l (list surrounding source code), p <expr> (print value), pp <expr> (pretty print), q (quit), and w (print stack trace). You can also run python -m pdb script.py to debug from the entry point.',
    syntaxAndStructure:
      '# Drop into debugger anywhere in code:\ndef calculate(data):\n    breakpoint()  # Drops into pdb prompt: (Pdb)\n    return sum(data)\n\n# Common Pdb commands:\n# (Pdb) n       -> Next line\n# (Pdb) s       -> Step into call\n# (Pdb) c       -> Continue to next breakpoint\n# (Pdb) p var   -> Print variable value\n# (Pdb) q       -> Quit session',
    codeExamples: [
      {
        title: 'Interactive Debugging Simulation and Stack Inspection',
        code: `import traceback

def step_one(x):
    return step_two(x * 2)

def step_two(y):
    return step_three(y - 5)

def step_three(z):
    # Inspecting stack frames programmatically
    stack = traceback.extract_stack()
    print("Call Stack Trace (depth = {}):".format(len(stack)))
    for frame in stack[-4:-1]:
        print(f"  In {frame.name}() at line {frame.lineno}: {frame.line}")
    return z ** 2

result = step_one(10)
print("\\nResult:", result)`,
        expectedOutput: `Call Stack Trace (depth = 5):
  In <module>() at line 14: result = step_one(10)
  In step_one() at line 4: return step_two(x * 2)
  In step_two() at line 7: return step_three(y - 5)

Result: 225`,
        explanation:
          'traceback.extract_stack() illustrates how the Python call stack tracks active execution frames across nested function invocations.',
      },
      {
        title: 'Post-Mortem Debugging Concept with sys.excepthook',
        code: `import sys

def custom_post_mortem(exc_type, exc_value, exc_traceback):
    print("--- CUSTOM POST-MORTEM DIAGNOSTIC ---")
    print(f"Exception Type: {exc_type.__name__}")
    print(f"Message: {exc_value}")
    last_frame = exc_traceback.tb_frame
    print(f"Local variables at crash site: {last_frame.f_locals}")

def faulty_division(a, b):
    factor = 100
    divisor = b - 2
    return (a * factor) / divisor

try:
    faulty_division(10, 2)
except ZeroDivisionError:
    exc_type, exc_val, tb = sys.exc_info()
    custom_post_mortem(exc_type, exc_val, tb)`,
        expectedOutput: `--- CUSTOM POST-MORTEM DIAGNOSTIC ---
Exception Type: ZeroDivisionError
Message: division by zero
Local variables at crash site: {'a': 10, 'b': 2, 'factor': 100, 'divisor': 0}`,
        explanation:
          'Post-mortem debugging inspects the exact local state (f_locals) at the moment an unhandled exception triggers.',
      },
    ],
    realWorldApplications: [
      'Investigating production crashes where logs do not reveal variable states.',
      'Stepping through complex recursion or graph traversal logic.',
      'Inspecting unfamiliar open-source libraries or third-party framework internals.',
    ],
    commonMistakes: [
      'Leaving breakpoint() or import pdb statements in code committed to production repositories.',
      'Confusing the "n" (next) and "s" (step) commands, accidentally stepping into standard library internals.',
      'Using print statements exclusively, requiring constant code recompilation and cluttered git diffs.',
    ],
    interviewRelevance:
      'Interviewers appreciate engineers who demonstrate familiarity with native debugging tools (pdb/gdb/lldb) and systematic problem isolation.',
    checkpoints: [
      { id: 'py-76-cp-1', label: 'Use breakpoint() and navigate code using n, s, c, and p commands.' },
      { id: 'py-76-cp-2', label: 'Inspect call stacks and crash site variables during post-mortem diagnosis.' },
    ],
    practiceExercises: [
      {
        id: 'py-76-ex-1',
        title: 'Identify Pdb Navigation Commands',
        difficulty: 'Beginner',
        type: 'coding',
        prompt: 'Write a function describe_pdb_cmd(cmd: str) -> str that maps "n" -> "next line", "s" -> "step into", "c" -> "continue", "p" -> "print expression", and "q" -> "quit".',
        starterCode: 'def describe_pdb_cmd(cmd: str) -> str:\n    # TODO\n    pass',
        solution: `def describe_pdb_cmd(cmd: str) -> str:\n    mapping = {\n        "n": "next line",\n        "s": "step into",\n        "c": "continue",\n        "p": "print expression",\n        "q": "quit"\n    }\n    return mapping.get(cmd.lower(), "unknown command")`,
        explanation: 'Provides lookup for core single-letter pdb keyboard controls.',
      },
      {
        id: 'py-76-ex-2',
        title: 'Extract Exception Frame Locals',
        difficulty: 'Intermediate',
        type: 'coding',
        prompt: 'Write a function get_locals_from_traceback(tb) -> dict returning tb.tb_frame.f_locals safely.',
        starterCode: 'def get_locals_from_traceback(tb) -> dict:\n    # TODO\n    pass',
        solution: `def get_locals_from_traceback(tb) -> dict:\n    if tb and hasattr(tb, "tb_frame"):\n        return dict(tb.tb_frame.f_locals)\n    return {}`,
        explanation: 'tb.tb_frame.f_locals is a dictionary of local variables bound in that execution scope.',
      },
      {
        id: 'py-76-ex-3',
        title: 'Safe Function Call with Traceback Capture',
        difficulty: 'Advanced',
        type: 'coding',
        prompt: 'Write a function safe_eval_func(fn, *args) -> tuple[bool, any] that runs fn(*args) and returns (True, result) on success or (False, exception_class_name) on exception.',
        starterCode: 'def safe_eval_func(fn, *args) -> tuple[bool, any]:\n    # TODO\n    pass',
        solution: `def safe_eval_func(fn, *args) -> tuple[bool, any]:\n    try:\n        return True, fn(*args)\n    except Exception as e:\n        return False, e.__class__.__name__`,
        explanation: 'Wraps function execution and isolates any runtime failure cleanly without crashing the caller.',
      },
    ],
    quizQuestions: [
      {
        id: 'py-76-q1',
        question: 'Which built-in function was added in Python 3.7 as the standard way to enter the interactive debugger?',
        options: ['pdb.run()', 'breakpoint()', 'debugger()', 'debug.stop()'],
        correctOptionIndex: 1,
        explanation: 'breakpoint() is a Python 3.7+ built-in that calls sys.breakpointhook(), invoking pdb by default.',
      },
      {
        id: 'py-76-q2',
        question: 'In pdb, what is the difference between the "n" (next) and "s" (step) commands?',
        options: [
          '"n" steps into called functions, while "s" skips them.',
          '"n" executes the current line and stops at the next line of the current function; "s" steps inside any function called on that line.',
          '"n" prints numbers; "s" prints strings.',
          '"n" exits the debugger; "s" restarts the script.',
        ],
        correctOptionIndex: 1,
        explanation: '"next" executes function calls on the current line as a single step, whereas "step" steps into the called function definition.',
      },
    ],
    revisionNotes: [
      'Use the built-in breakpoint() (Python 3.7+) to trigger pdb interactively.',
      'Essential pdb commands: n (next), s (step in), c (continue), p (print), q (quit).',
      'Never leave breakpoint() statements committed to production git branches.',
      'Use python -m pdb script.py to start debugging immediately from the first instruction.',
    ],
  },
  {
    id: 'py-77-logging-module',
    moduleId: 'py-m7',
    moduleNumber: 7,
    moduleTitle: 'Practical Python & Applied Development',
    topicNumber: 77,
    title: 'Logging Best Practices',
    language: 'python',
    level: 'Intermediate',
    whyItMatters:
      'Print statements vanish into standard output and lack timestamps, severity levels, and routing destinations. Production applications require structured logging.',
    explanation:
      'Python provides the powerful logging module with 5 standard severity levels: DEBUG (detailed diagnostics), INFO (confirmation of expected events), WARNING (unexpected event or near-future issue), ERROR (a function failed to execute), and CRITICAL (severe error threatening program continuation). A robust logging setup uses named loggers (logging.getLogger(__name__)), Handlers (StreamHandler, RotatingFileHandler), and Formatters for structured output.',
    syntaxAndStructure:
      'import logging\n\n# Configure root logger or named logger\nlogger = logging.getLogger(__name__)\nlogging.basicConfig(\n    level=logging.INFO,\n    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s"\n)\n\nlogger.info("Service initialized")\nlogger.warning("Cache miss threshold reached")\nlogger.error("Database connection refused", exc_info=True)',
    codeExamples: [
      {
        title: 'Structured Logger Configuration with Custom Formatter and Levels',
        code: `import logging
from io import StringIO

# Create dedicated logger and memory stream handler
log_stream = StringIO()
logger = logging.getLogger("payment_service")
logger.setLevel(logging.DEBUG)

handler = logging.StreamHandler(log_stream)
formatter = logging.Formatter("[%(levelname)s] %(name)s - %(message)s")
handler.setFormatter(formatter)
logger.addHandler(handler)

# Emit messages at various levels
logger.debug("Parsing card credentials payload...")
logger.info("Processing transaction ID #9482 for \$149.99")
logger.warning("Gateway latency 850ms exceeded standard threshold")
logger.error("Transaction declined: Insufficient funds")

print("Captured Log Output:")
print(log_stream.getvalue().strip())`,
        expectedOutput: `Captured Log Output:
[DEBUG] payment_service - Parsing card credentials payload...
[INFO] payment_service - Processing transaction ID #9482 for $149.99
[WARNING] payment_service - Gateway latency 850ms exceeded standard threshold
[ERROR] payment_service - Transaction declined: Insufficient funds`,
        explanation:
          'Dedicated loggers with modular handlers allow routing logs to consoles, rotating files, or monitoring systems independently.',
      },
      {
        title: 'Capturing Exception Tracebacks with exc_info=True',
        code: `import logging
from io import StringIO

log_stream = StringIO()
logger = logging.getLogger("auth_module")
logger.setLevel(logging.ERROR)
handler = logging.StreamHandler(log_stream)
handler.setFormatter(logging.Formatter("%(levelname)s: %(message)s"))
logger.addHandler(handler)

def authenticate(token: str):
    try:
        if token != "secret123":
            raise PermissionError("Invalid session token")
    except PermissionError:
        logger.error("Authentication check failed", exc_info=True)

authenticate("wrong_token")
first_few_lines = "\\n".join(log_stream.getvalue().strip().splitlines()[:3])
print(first_few_lines)
print("... [traceback captured cleanly]")`,
        expectedOutput: `ERROR: Authentication check failed
Traceback (most recent call last):
  File "<string>", line 13, in authenticate
... [traceback captured cleanly]`,
        explanation:
          'Passing exc_info=True (or logger.exception("...")) automatically appends the current exception traceback to the log record.',
      },
    ],
    realWorldApplications: [
      'Observability and centralized log aggregation (Datadog, Splunk, ELK stack).',
      'Audit logging for security compliance and billing events.',
      'Alerting systems triggering PagerDuty on ERROR or CRITICAL log events.',
    ],
    commonMistakes: [
      'Using print() statements in production backend services instead of the logging module.',
      'Calling logging.basicConfig() inside library modules, overriding the parent application configuration.',
      'Logging sensitive personal data (passwords, credit card numbers, auth tokens) in plain text.',
    ],
    interviewRelevance:
      'Backend interviews assess whether you know log hierarchy, log levels, formatting, and how to capture stack traces without crashing.',
    checkpoints: [
      { id: 'py-77-cp-1', label: 'Use logging levels (DEBUG, INFO, WARNING, ERROR, CRITICAL) appropriately.' },
      { id: 'py-77-cp-2', label: 'Create named loggers using logging.getLogger(__name__) and formatters.' },
    ],
    practiceExercises: [
      {
        id: 'py-77-ex-1',
        title: 'Map Logging Severity Levels',
        difficulty: 'Beginner',
        type: 'coding',
        prompt: 'Write a function get_level_numeric(level_name: str) -> int returning the numeric level for "DEBUG" (10), "INFO" (20), "WARNING" (30), "ERROR" (40), and "CRITICAL" (50).',
        starterCode: 'import logging\n\ndef get_level_numeric(level_name: str) -> int:\n    # TODO\n    pass',
        solution: `import logging\n\ndef get_level_numeric(level_name: str) -> int:\n    return getattr(logging, level_name.upper(), 0)`,
        explanation: 'getattr(logging, "INFO") returns 20; standard logging levels are defined as integer constants.',
      },
      {
        id: 'py-77-ex-2',
        title: 'Filter Log Records Below Threshold',
        difficulty: 'Intermediate',
        type: 'coding',
        prompt: 'Write a function filter_records(records: list[dict], min_level: int) -> list[dict] where each record is {"level": int, "msg": str}, returning only records where level >= min_level.',
        starterCode: 'def filter_records(records: list[dict], min_level: int) -> list[dict]:\n    # TODO\n    pass',
        solution: `def filter_records(records: list[dict], min_level: int) -> list[dict]:\n    return [r for r in records if r["level"] >= min_level]`,
        explanation: 'Filters logs matching or exceeding the threshold level, simulating logging module behavior.',
      },
      {
        id: 'py-77-ex-3',
        title: 'Structured JSON Log Formatter Simulator',
        difficulty: 'Advanced',
        type: 'coding',
        prompt: 'Write a function format_json_log(level: str, message: str, **kwargs) -> str returning a valid JSON string with keys "level", "message", and any additional keyword arguments.',
        starterCode: 'import json\n\ndef format_json_log(level: str, message: str, **kwargs) -> str:\n    # TODO\n    pass',
        solution: `import json\n\ndef format_json_log(level: str, message: str, **kwargs) -> str:\n    payload = {"level": level.upper(), "message": message, **kwargs}\n    return json.dumps(payload)`,
        explanation: 'Structured logging formats events as JSON for ingestion into search clusters like Elasticsearch.',
      },
    ],
    quizQuestions: [
      {
        id: 'py-77-q1',
        question: 'Which method should you call when logging an error inside an except block to automatically capture the full exception traceback?',
        options: ['logger.fatal()', 'logger.exception()', 'logger.dump_trace()', 'logger.catch()'],
        correctOptionIndex: 1,
        explanation: 'logger.exception("...") logs at ERROR level and automatically sets exc_info=True to append the full traceback.',
      },
      {
        id: 'py-77-q2',
        question: 'Why is logging.getLogger(__name__) recommended over using the root logger directly?',
        options: [
          'Because __name__ guarantees cryptographic encryption.',
          'Because it creates a hierarchical logger based on the module dot-path, allowing granular log filtering by package.',
          'Because root loggers cannot write to disk.',
          'Because named loggers run 2x faster.',
        ],
        correctOptionIndex: 1,
        explanation: 'Logger names match Python module paths (e.g. "myapp.services.auth"), allowing package-level log control.',
      },
    ],
    revisionNotes: [
      '5 standard log levels: DEBUG (10), INFO (20), WARNING (30), ERROR (40), CRITICAL (50).',
      'Always use logger = logging.getLogger(__name__) rather than calling logging.info() directly.',
      'Use logger.exception() inside except blocks to automatically attach stack traces.',
      'Never log secrets, API keys, passwords, or personal identifiable information (PII).',
    ],
  },
  {
    id: 'py-78-code-organization',
    moduleId: 'py-m7',
    moduleNumber: 7,
    moduleTitle: 'Practical Python & Applied Development',
    topicNumber: 78,
    title: 'Code Organization & Project Structuring',
    language: 'python',
    level: 'Intermediate',
    whyItMatters:
      'Ad-hoc multi-file projects quickly suffer from import errors, circular dependencies, and deployment failures. Standard project structure ensures clean packaging and maintainability.',
    explanation:
      'Professional Python repositories follow modern standards (PEP 517/518/621). The recommended layout is the "src-layout" (src/mypackage/) which avoids import collisions with local working directories during testing. Projects use pyproject.toml as the single source of configuration (replacing setup.py and requirements.txt for modern tooling like Poetry, Hatch, or Flit). Virtual environments (python -m venv .venv) isolate project dependencies.',
    syntaxAndStructure:
      '# Standard modern src-layout:\n# my_project/\n# ├── pyproject.toml\n# ├── README.md\n# ├── .gitignore\n# ├── src/\n# │   └── my_package/\n# │       ├── __init__.py\n# │       ├── core.py\n# │       └── utils.py\n# └── tests/\n#     └── test_core.py',
    codeExamples: [
      {
        title: 'Modern pyproject.toml Configuration Example',
        code: `pyproject_toml_content = """
[build-system]
requires = ["hatchling"]
build-backend = "hatchling.build"

[project]
name = "placement-toolkit"
version = "1.0.0"
description = "A placement preparation toolkit for engineering students"
readme = "README.md"
requires-python = ">=3.10"
dependencies = [
    "requests>=2.31.0",
    "pydantic>=2.5.0",
]

[project.optional-dependencies]
dev = [
    "pytest>=8.0.0",
    "black>=24.0.0",
    "mypy>=1.9.0",
]

[tool.pytest.ini_options]
testpaths = ["tests"]
pythonpath = ["src"]
"""

print("pyproject.toml Blueprint:")
print(pyproject_toml_content.strip())`,
        expectedOutput: `pyproject_toml_content Blueprint:
[build-system]
requires = ["hatchling"]
build-backend = "hatchling.build"

[project]
name = "placement-toolkit"
version = "1.0.0"
description = "A placement preparation toolkit for engineering students"
readme = "README.md"
requires-python = ">=3.10"
dependencies = [
    "requests>=2.31.0",
    "pydantic>=2.5.0",
]

[project.optional-dependencies]
dev = [
    "pytest>=8.0.0",
    "black>=24.0.0",
    "mypy>=1.9.0",
]

[tool.pytest.ini_options]
testpaths = ["tests"]
pythonpath = ["src"]`,
        explanation:
          'pyproject.toml consolidates metadata, dependencies, and tool settings (pytest, black, mypy) into a standardized declarative file.',
      },
      {
        title: 'Package __all__ Export and Namespace Management',
        code: `package_init_code = """
# src/analytics/__init__.py
from .calculator import compute_mean, compute_median
from .validator import validate_series

# Explicit public API export via __all__
__all__ = ["compute_mean", "compute_median", "validate_series"]
__version__ = "1.0.0"
"""

print("__init__.py Public API Definition:")
print(package_init_code.strip())`,
        expectedOutput: `__init__.py Public API Definition:
# src/analytics/__init__.py
from .calculator import compute_mean, compute_median
from .validator import validate_series

# Explicit public API export via __all__
__all__ = ["compute_mean", "compute_median", "validate_series"]
__version__ = "1.0.0"`,
        explanation:
          'Defining __all__ in __init__.py defines the explicit public interface of a package and controls what is imported when users do "from package import *".',
      },
    ],
    realWorldApplications: [
      'Publishing reusable open-source packages to PyPI.',
      'Structuring enterprise backend codebases with clean domain-driven architecture.',
      'Reproducible Docker builds with isolated virtual environments.',
    ],
    commonMistakes: [
      'Committing the .venv/ directory or __pycache__/ folders to Git repositories.',
      'Placing packages directly in the repository root without a src/ directory, causing tests to accidentally import uninstalled working code.',
      'Creating circular dependencies between modules by importing entire packages at top-level instead of refactoring shared logic.',
    ],
    interviewRelevance:
      'Senior interviewers probe knowledge of virtual environments, packaging standards, and circular import resolution techniques.',
    checkpoints: [
      { id: 'py-78-cp-1', label: 'Structure a Python project using the modern src-layout.' },
      { id: 'py-78-cp-2', label: 'Configure dependencies and tool configurations in pyproject.toml.' },
    ],
    practiceExercises: [
      {
        id: 'py-78-ex-1',
        title: 'Virtual Environment Activation Command',
        difficulty: 'Beginner',
        type: 'coding',
        prompt: 'Write a function get_venv_activate_command(os_name: str) -> str returning "source .venv/bin/activate" for "linux"/"darwin" or ".venv\\\\Scripts\\\\activate" for "windows".',
        starterCode: 'def get_venv_activate_command(os_name: str) -> str:\n    # TODO\n    pass',
        solution: `def get_venv_activate_command(os_name: str) -> str:\n    if os_name.lower() in ("linux", "darwin"):\n        return "source .venv/bin/activate"\n    return ".venv\\\\Scripts\\\\activate"`,
        explanation: 'On POSIX systems the activation script resides in bin/; on Windows it resides in Scripts\\.',
      },
      {
        id: 'py-78-ex-2',
        title: 'Check Public API Exports',
        difficulty: 'Intermediate',
        type: 'coding',
        prompt: 'Write a function is_public_symbol(name: str, all_list: list[str] | None) -> bool returning True if name does not start with "_" and is in all_list (or all_list is None).',
        starterCode: 'def is_public_symbol(name: str, all_list: list[str] | None) -> bool:\n    # TODO\n    pass',
        solution: `def is_public_symbol(name: str, all_list: list[str] | None) -> bool:\n    if name.startswith("_"):\n        return False\n    if all_list is not None:\n        return name in all_list\n    return True`,
        explanation: 'Leading underscores mark private symbols; __all__ restricts exposed symbols when provided.',
      },
      {
        id: 'py-78-ex-3',
        title: 'Detect Circular Import Candidates',
        difficulty: 'Advanced',
        type: 'coding',
        prompt: 'Write a function detect_direct_circular_dependency(deps: dict[str, list[str]]) -> list[tuple[str, str]] that finds all pairs (A, B) where A imports B and B imports A (return sorted pairs with A < B).',
        starterCode: 'def detect_direct_circular_dependency(deps: dict[str, list[str]]) -> list[tuple[str, str]]:\n    # TODO\n    pass',
        solution: `def detect_direct_circular_dependency(deps: dict[str, list[str]]) -> list[tuple[str, str]]:\n    cycles = set()\n    for mod_a, imported in deps.items():\n        for mod_b in imported:\n            if mod_a in deps.get(mod_b, []):\n                pair = tuple(sorted([mod_a, mod_b]))\n                cycles.add(pair)\n    return sorted(list(cycles))`,
        explanation: 'Checks if module A imports module B while module B simultaneously imports module A.',
      },
    ],
    quizQuestions: [
      {
        id: 'py-78-q1',
        question: 'Why is the "src-layout" (src/my_package/) preferred over putting packages directly in the project root?',
        options: [
          'Because Python 3 will not run files unless they are in src/.',
          'Because it prevents accidental imports from the local working directory during test runs, forcing testing against the installed package.',
          'Because src/ automatically enables C speed optimizations.',
          'Because pyproject.toml only parses folders named src.',
        ],
        correctOptionIndex: 1,
        explanation: 'The src-layout guarantees that test suites run against the installed wheel rather than the raw working directory.',
      },
      {
        id: 'py-78-q2',
        question: 'What is the modern, PEP-standardized single configuration file for Python project packaging and tool configuration?',
        options: ['setup.cfg', 'requirements.txt', 'pyproject.toml', 'Pipfile'],
        correctOptionIndex: 2,
        explanation: 'PEP 518 and PEP 621 standardized pyproject.toml as the universal configuration file for Python builds and tools.',
      },
    ],
    revisionNotes: [
      'Adopt the "src-layout" (src/package_name/) for clean packaging and testing.',
      'Use pyproject.toml to define project metadata, dependencies, and tool settings.',
      'Always activate an isolated virtual environment (python -m venv .venv).',
      'Never commit .venv/, .pyc, or __pycache__/ directories to version control.',
    ],
  },
  {
    id: 'py-79-pep8-clean-code',
    moduleId: 'py-m7',
    moduleNumber: 7,
    moduleTitle: 'Practical Python & Applied Development',
    topicNumber: 79,
    title: 'PEP 8 Style Guide, Linting & Pythonic Idioms',
    language: 'python',
    level: 'Intermediate',
    whyItMatters:
      'Code is read far more often than it is written. Writing idiomatic ("Pythonic") code following PEP 8 ensures readability, team consistency, and high review quality.',
    explanation:
      'PEP 8 is the official Python style guide. Key rules include: 4 spaces per indentation level (never tabs), snake_case for functions and variables, PascalCase for classes, UPPER_SNAKE_CASE for constants, and max line length of 79-88 characters. Modern teams automate style enforcement with linters and formatters: Black/Ruff for uncompromising formatting, Flake8 for linting, and Mypy for static type checking. "Pythonic" idioms favor readability: using "if item in collection" instead of manual loops, list comprehensions instead of map/filter when simple, and context managers.',
    syntaxAndStructure:
      '# PEP 8 Naming Conventions:\nMAX_CONNECTIONS = 100       # Constant\n\nclass DataPipeline:         # PascalCase class\n    def process_records(self, record_list: list[str]) -> int:\n        total_count = 0     # snake_case variable\n        return total_count',
    codeExamples: [
      {
        title: 'Un-Pythonic vs Idiomatic Python Comparisons',
        code: `# Un-Pythonic approach
nums = [1, 2, 3, 4, 5, 6]
evens_squared = []
for i in range(len(nums)):
    if nums[i] % 2 == 0:
        evens_squared.append(nums[i] ** 2)

# Idiomatic Pythonic approach
evens_squared_pythonic = [x ** 2 for x in nums if x % 2 == 0]

# Checking emptiness
items = []
# Un-Pythonic: if len(items) == 0:
# Pythonic:
is_empty = not items

# Swapping variables
a, b = 10, 20
a, b = b, a  # Idiomatic tuple unpacking swap

print("Pythonic Evens Squared:", evens_squared_pythonic)
print("Is list empty:", is_empty)
print(f"Swapped a={a}, b={b}")`,
        expectedOutput: `Pythonic Evens Squared: [4, 16, 36]
Is list empty: True
Swapped a=20, b=10`,
        explanation:
          'Demonstrates common Pythonic idioms: list comprehensions, truthy/falsy evaluation for empty collections, and simultaneous tuple swapping.',
      },
      {
        title: 'Static Type Checking with Type Annotations',
        code: `from typing import Optional

def find_user_email(user_id: int, directory: dict[int, str]) -> Optional[str]:
    """Return user email or None if not found."""
    return directory.get(user_id)

users = {1: "alice@example.com", 2: "bob@example.com"}
found = find_user_email(1, users)
missing = find_user_email(99, users)

print("Found:", found)
print("Missing:", missing)`,
        expectedOutput: `Found: alice@example.com
Missing: None`,
        explanation:
          'Type annotations (PEP 484) clarify expected input and return types, enabling static analyzers like Mypy to catch type errors ahead of runtime.',
      },
    ],
    realWorldApplications: [
      'Automated pre-commit hooks running Ruff and Black before git commits.',
      'Code reviews in enterprise teams adhering to company-wide styling standards.',
      'Static analysis pipelines catching NoneType attribute errors with Mypy.',
    ],
    commonMistakes: [
      'Mixing tabs and spaces, which raises TabError in Python 3.',
      'Comparing boolean values explicitly (e.g. if is_valid == True:) instead of if is_valid:.',
      'Using single-letter variable names like l (lowercase L), O (uppercase O), or I (uppercase I) which look like numbers.',
    ],
    interviewRelevance:
      'Interviewers judge candidates on code cleanliness. Writing un-Pythonic C-style loops in a Python interview signals lack of fluency with the language.',
    checkpoints: [
      { id: 'py-79-cp-1', label: 'Follow PEP 8 naming conventions for variables, functions, and classes.' },
      { id: 'py-79-cp-2', label: 'Use Pythonic idioms (truthiness, unpacking, comprehensions) and type hints.' },
    ],
    practiceExercises: [
      {
        id: 'py-79-ex-1',
        title: 'Check PascalCase Convention',
        difficulty: 'Beginner',
        type: 'coding',
        prompt: 'Write a function is_pascal_case(name: str) -> bool returning True if name is non-empty, contains only alphanumeric chars, starts with an uppercase letter, and contains no underscores.',
        starterCode: 'def is_pascal_case(name: str) -> bool:\n    # TODO\n    pass',
        solution: `def is_pascal_case(name: str) -> bool:\n    if not name or "_" in name:\n        return False\n    return name[0].isupper() and name.isalnum()`,
        explanation: 'Classes in PEP 8 follow PascalCase (e.g. UserProfile, HttpRequest).',
      },
      {
        id: 'py-79-ex-2',
        title: 'Refactor C-Style Loop to Enumerate',
        difficulty: 'Intermediate',
        type: 'coding',
        prompt: 'Given a list of strings, write a function get_indexed_strings(items: list[str]) -> list[str] returning items formatted as f"{i}: {val}" using enumerate.',
        starterCode: 'def get_indexed_strings(items: list[str]) -> list[str]:\n    # TODO\n    pass',
        solution: `def get_indexed_strings(items: list[str]) -> list[str]:\n    return [f"{i}: {val}" for i, val in enumerate(items)]`,
        explanation: 'enumerate() eliminates range(len(items)) indexing anti-patterns.',
      },
      {
        id: 'py-79-ex-3',
        title: 'Safe Dictionary Value Extraction',
        difficulty: 'Advanced',
        type: 'coding',
        prompt: 'Write a function get_nested_key(d: dict, keys: list[str], default=None) -> any that traverses nested keys safely without raising KeyError or TypeError.',
        starterCode: 'def get_nested_key(d: dict, keys: list[str], default=None) -> any:\n    # TODO\n    pass',
        solution: `def get_nested_key(d: dict, keys: list[str], default=None) -> any:\n    curr = d\n    for k in keys:\n        if isinstance(curr, dict) and k in curr:\n            curr = curr[k]\n        else:\n            return default\n    return curr`,
        explanation: 'Safely navigates nested dictionary levels without throwing unhandled exceptions on missing keys.',
      },
    ],
    quizQuestions: [
      {
        id: 'py-79-q1',
        question: 'According to PEP 8, what naming convention should be used for class names?',
        options: ['snake_case', 'PascalCase (CamelCase)', 'kebab-case', 'UPPER_CASE'],
        correctOptionIndex: 1,
        explanation: 'PEP 8 specifies PascalCase (CapWords) for class names, and snake_case for functions and variables.',
      },
      {
        id: 'py-79-q2',
        question: 'What is the Pythonic way to test if a list "users" is non-empty?',
        options: ['if len(users) > 0:', 'if users != []:', 'if users:', 'if bool(users) == True:'],
        correctOptionIndex: 2,
        explanation: 'In Python, empty sequences evaluate to False and non-empty sequences evaluate to True; "if users:" is canonical.',
      },
    ],
    revisionNotes: [
      'Indent with 4 spaces (never tabs).',
      'Naming: snake_case for variables/functions, PascalCase for classes, UPPER_SNAKE for constants.',
      'Check emptiness with "if my_list:" or "if not my_list:" instead of checking len().',
      'Use tools like Ruff, Black, and Mypy in CI/CD to automate style and type validation.',
    ],
  },
];

export const module7: MasteryModule = {
  id: 'py-m7',
  number: 7,
  title: 'Practical Python & Applied Development',
  description:
    'Master real-world Python engineering skills: file management with pathlib, CSV/JSON processing, REST APIs, SQLite databases, unit testing with pytest, debugging with pdb, logging best practices, packaging, and PEP 8 clean code.',
  language: 'python',
  topics: module7Topics,
  moduleAssessment: {
    id: 'py-m7-exam',
    title: 'Practical Python & Applied Development Milestone Assessment',
    passingScorePercentage: 70,
    questions: module7Topics.flatMap((t) => t.quizQuestions),
  },
  revisionQuestions: [
    'Why is pathlib.Path preferred over os.path for modern cross-platform file management?',
    'What is the difference between json.loads() and json.load()?',
    'Why are GET and PUT requests considered idempotent while POST is not?',
    'Why must parameterized placeholders (?) be used instead of string formatting in SQL queries?',
    'What is the difference between pytest fixtures and traditional unittest setUp methods?',
  ],
};
