import { MasteryTopic, MasteryModule } from '@/types/mastery';

export const module4Topics: MasteryTopic[] = [
  {
    id: 'py-33-classes-objects',
    moduleId: 'py-m4',
    moduleNumber: 4,
    moduleTitle: 'Object-Oriented Programming',
    topicNumber: 33,
    title: 'Classes, Objects & The self Reference',
    language: 'python',
    level: 'Beginner',
    whyItMatters:
      'OOP is the dominant paradigm in software engineering. Understanding how Python classes instantiate objects and why `self` is explicitly passed enables writing clean, maintainable systems.',
    explanation:
      'A class is a user-defined blueprint from which individual objects (instances) are created. In Python, methods must explicitly accept `self` as their first parameter. `self` represents the instance calling the method, allowing access to instance attributes and other methods. When calling `obj.method(arg)`, Python automatically translates this syntactic sugar into `ClassName.method(obj, arg)`.',
    syntaxAndStructure:
      'class ClassName:\n    def __init__(self, attribute):\n        self.attribute = attribute # Bound to instance\n\n    def action(self):\n        print(f"Action on {self.attribute}")\n\n# Instantiation:\nobj = ClassName("value")\nobj.action()',
    codeExamples: [
      {
        title: 'Class Blueprint and Instance Interaction',
        code: `class BankAccount:
    def __init__(self, owner: str, balance: float = 0.0):
        self.owner = owner
        self.balance = balance

    def deposit(self, amount: float) -> float:
        if amount <= 0:
            raise ValueError("Deposit amount must be positive.")
        self.balance += amount
        return self.balance

    def withdraw(self, amount: float) -> float:
        if amount > self.balance:
            raise ValueError("Insufficient balance.")
        self.balance -= amount
        return self.balance

acc = BankAccount("Aarav", 500.0)
acc.deposit(150.0)
acc.withdraw(200.0)
print(f"Owner: {acc.owner}, Current Balance: \${acc.balance:.2f}")

# Proving self is syntactic sugar:
BankAccount.deposit(acc, 50.0) # Explicit Class.method(instance)
print("Balance after explicit call:", acc.balance)`,
        expectedOutput: `Owner: Aarav, Current Balance: $450.00
Balance after explicit call: 500.0`,
        explanation: 'obj.deposit(50) is identical to BankAccount.deposit(obj, 50). self receives the calling instance.',
      },
      {
        title: 'Dynamic Attribute Assignment in Python Instances',
        code: `class User:
    pass

u1 = User()
u1.name = "Diya"
u1.role = "Software Engineer"

print("Instance dictionary (__dict__):", u1.__dict__)`,
        expectedOutput: `Instance dictionary (__dict__): {'name': 'Diya', 'role': 'Software Engineer'}`,
        explanation: 'In Python, instance attributes are stored internally inside the instance\'s __dict__ hash map.',
      },
    ],
    realWorldApplications: [
      'Modeling domain entities (Users, Products, Orders, Accounts) in web frameworks and enterprise backends.',
      'Encapsulating state machines and database models in ORMs.',
    ],
    commonMistakes: [
      'Forgetting the `self` parameter in method definitions (`TypeError: method takes 0 positional arguments but 1 was given`).',
      'Forgetting `self.` when accessing instance attributes inside methods (`NameError: name is not defined`).',
    ],
    interviewRelevance:
      'Common interview question: "Why does Python require explicit self in methods unlike C++ or Java this?" (Answer: Explicit is better than implicit; simplifies dynamic method binding and namespace lookup).',
    checkpoints: [
      { id: 'py-33-cp-1', label: 'Always include self as the first parameter in instance methods.' },
      { id: 'py-33-cp-2', label: 'Access instance attributes using self.attribute.' },
    ],
    practiceExercises: [
      {
        id: 'py-33-ex-1',
        title: 'Rectangle Area and Perimeter Class',
        difficulty: 'Beginner',
        type: 'coding',
        prompt: 'Create a `Rectangle` class with width and height, implementing `area()` and `perimeter()` methods.',
        starterCode: 'class Rectangle:\n    pass',
        solution: `class Rectangle:
    def __init__(self, width: float, height: float):
        self.width = width
        self.height = height

    def area(self) -> float:
        return self.width * self.height

    def perimeter(self) -> float:
        return 2 * (self.width + self.height)

rect = Rectangle(4.0, 5.0)
print("Area:", rect.area())          # 20.0
print("Perimeter:", rect.perimeter()) # 18.0`,
        explanation: 'Standard class definition with instance methods computing derived geometric properties.',
      },
      {
        id: 'py-33-ex-2',
        title: 'Fix Missing Self TypeError',
        difficulty: 'Intermediate',
        type: 'debugging',
        prompt: 'Fix the TypeError in: `class Greeter: def greet(): return "Hello"; g = Greeter(); g.greet()`',
        starterCode: 'class Greeter:\n    def greet():\n        return "Hello"',
        solution: `class Greeter:
    def greet(self):
        return "Hello"

g = Greeter()
print(g.greet())  # Hello`,
        explanation: 'When invoked on an instance, Python automatically passes the instance as the first argument, requiring self in the definition.',
      },
      {
        id: 'py-33-ex-3',
        title: 'Custom Stack Data Structure Class',
        difficulty: 'Advanced',
        type: 'coding',
        prompt: 'Implement a `Stack` class with `push(val)`, `pop()`, `peek()`, `is_empty()`, and `size()` in O(1) time.',
        starterCode: 'class Stack:\n    pass',
        solution: `class Stack:
    def __init__(self):
        self._items = []

    def push(self, val):
        self._items.append(val)

    def pop(self):
        if self.is_empty():
            raise IndexError("pop from empty stack")
        return self._items.pop()

    def peek(self):
        if self.is_empty():
            raise IndexError("peek from empty stack")
        return self._items[-1]

    def is_empty(self) -> bool:
        return len(self._items) == 0

    def size(self) -> int:
        return len(self._items)

s = Stack()
s.push(10)
s.push(20)
print("Popped:", s.pop())   # 20
print("Size:", s.size())     # 1`,
        explanation: 'Encapsulates list internals inside a formal Stack interface.',
      },
    ],
    quizQuestions: [
      {
        id: 'py-33-q1',
        question: 'Why must instance methods in Python include "self" as their first parameter?',
        options: [
          'It is a CPython compilation requirement that can be omitted in PyPy',
          'Python translates obj.method(x) into Class.method(obj, x), passing the instance explicitly',
          'self is a reserved Python keyword',
          'Without self, methods run in a background thread',
        ],
        correctOptionIndex: 1,
        explanation: 'Python translates method calls on instances into explicit class method calls where the instance is passed as the first argument.',
      },
      {
        id: 'py-33-q2',
        question: 'Where are standard instance attributes stored in a Python object by default?',
        options: ['In a C struct array', 'Inside the instance\'s __dict__ hash map', 'In global memory', 'In the class namespace'],
        correctOptionIndex: 1,
        explanation: 'In Python, unless __slots__ is defined, instance attributes are stored in a dictionary attribute called __dict__.',
      },
    ],
    revisionNotes: [
      'Classes define blueprints; objects are instances stored on heap.',
      'self represents the calling instance passed as the first parameter.',
      'Attributes are accessed via self.attr and stored in __dict__.',
    ],
  },
  {
    id: 'py-34-constructors-init',
    moduleId: 'py-m4',
    moduleNumber: 4,
    moduleTitle: 'Object-Oriented Programming',
    topicNumber: 34,
    title: 'Constructors: __new__ vs __init__ & Initializer Logic',
    language: 'python',
    level: 'Intermediate',
    whyItMatters:
      'Understanding how Python instantiates objects via `__new__` (object allocator) and `__init__` (attribute initializer) is required for implementing singletons, immutability, and metaclasses.',
    explanation:
      'In Python, object creation happens in two stages:\n1. `__new__(cls, *args, **kwargs)`: The actual constructor. It is a static method that allocates and returns the brand-new object instance in memory.\n2. `__init__(self, *args, **kwargs)`: The initializer. It receives the freshly created instance via `self` and populates its initial attributes.\n`__init__` must always return `None` (`TypeError` if returning any value). Overriding `__new__` is necessary when sub-classing immutable built-in types (int, str, tuple) or creating Singletons.',
    syntaxAndStructure:
      'class MyClass:\n    def __new__(cls, *args, **kwargs):\n        # 1. Allocates instance\n        instance = super().__new__(cls)\n        return instance\n\n    def __init__(self, value):\n        # 2. Initializes instance attributes\n        self.value = value\n        # Must return None!',
    codeExamples: [
      {
        title: 'Implementing the Singleton Pattern via __new__',
        code: `class DatabaseConnection:
    _instance = None

    def __new__(cls, *args, **kwargs):
        if cls._instance is None:
            print("Allocating brand new database connection instance...")
            cls._instance = super().__new__(cls)
        return cls._instance

    def __init__(self, connection_string: str = "default_db"):
        self.connection_string = connection_string

# Instantiating twice returns the identical singleton instance:
db1 = DatabaseConnection("postgres://prod:5432")
db2 = DatabaseConnection("postgres://analytics:5432")

print("db1 is db2:", db1 is db2)
print("db2 connection string:", db2.connection_string)`,
        expectedOutput: `Allocating brand new database connection instance...
db1 is db2: True
db2 connection string: postgres://analytics:5432`,
        explanation: '__new__ intercepts instantiation and returns the existing cached _instance, ensuring only one instance ever exists in memory.',
      },
      {
        title: 'The __init__ Return Value Trap',
        code: `class User:
    def __init__(self, name: str):
        self.name = name
        # Returning a value other than None causes TypeError:
        # return "Success" -> TypeError: __init__() should return None, not 'str'

u = User("Aarav")
print("User created:", u.name)`,
        expectedOutput: `User created: Aarav`,
        explanation: '__init__ must strictly return None. The instance is returned automatically by __new__.',
      },
    ],
    realWorldApplications: [
      'Singleton connection pools, thread pools, and global configuration registries.',
      'Subclassing immutable types like `int` or `tuple` to build custom validated domain primitives.',
    ],
    commonMistakes: [
      'Trying to return a value from `__init__`, which raises `TypeError: __init__() should return None`.',
      'Forgetting that `__init__` is an initializer, not the true allocator (`__new__` is the allocator).',
    ],
    interviewRelevance:
      'High-frequency interview question: "What is the difference between __new__ and __init__ in Python?"',
    checkpoints: [
      { id: 'py-34-cp-1', label: '__new__ creates and returns the instance; __init__ initializes it.' },
      { id: 'py-34-cp-2', label: '__init__ must always return None.' },
    ],
    practiceExercises: [
      {
        id: 'py-34-ex-1',
        title: 'Validated Product Initializer',
        difficulty: 'Beginner',
        type: 'coding',
        prompt: 'Create `Product(id, name, price, stock)` raising `ValueError` if price is negative or stock is less than 0.',
        starterCode: 'class Product:\n    pass',
        solution: `class Product:
    def __init__(self, pid: int, name: str, price: float, stock: int):
        if price < 0:
            raise ValueError("Price cannot be negative")
        if stock < 0:
            raise ValueError("Stock cannot be negative")
        self.pid = pid
        self.name = name
        self.price = price
        self.stock = stock

p = Product(101, "Mouse", 29.99, 50)
print(f"Product {p.name}: \${p.price}")`,
        explanation: 'Enforces invariant validation directly in the initializer.',
      },
      {
        id: 'py-34-ex-2',
        title: 'Uppercase String Subclass via __new__',
        difficulty: 'Intermediate',
        type: 'coding',
        prompt: 'Subclass `str` so that any created string is automatically converted to uppercase using `__new__`.',
        starterCode: 'class UpperString(str):\n    # Override __new__ since str is immutable\n    pass',
        solution: `class UpperString(str):
    def __new__(cls, value: str):
        return super().__new__(cls, value.upper())

s = UpperString("antigravity")
print("UpperString:", s)
print("Type:", type(s))`,
        explanation: 'Because str is immutable, modification must happen in __new__ before the object is finalized.',
      },
      {
        id: 'py-34-ex-3',
        title: 'Thread-Safe Singleton Logger',
        difficulty: 'Advanced',
        type: 'coding',
        prompt: 'Implement a thread-safe Singleton `Logger` class using `threading.Lock` inside `__new__`.',
        starterCode: 'import threading\nclass Logger:\n    pass',
        solution: `import threading

class Logger:
    _instance = None
    _lock = threading.Lock()

    def __new__(cls):
        if cls._instance is None:
            with cls._lock:
                if cls._instance is None:
                    cls._instance = super().__new__(cls)
                    cls._instance.logs = []
        return cls._instance

    def log(self, message: str):
        self.logs.append(message)

l1 = Logger()
l2 = Logger()
l1.log("Server initialized")
print("l2 logs:", l2.logs)
print("l1 is l2:", l1 is l2)`,
        explanation: 'Double-checked locking pattern ensures thread-safe singleton initialization.',
      },
    ],
    quizQuestions: [
      {
        id: 'py-34-q1',
        question: 'Which method is responsible for allocating memory and returning a new instance in Python?',
        options: ['__init__', '__new__', '__allocate__', '__create__'],
        correctOptionIndex: 1,
        explanation: '__new__ is the static allocator method that creates and returns the new instance object.',
      },
      {
        id: 'py-34-q2',
        question: 'What happens if a developer writes return "Done" inside an __init__ method?',
        options: [
          'The constructor returns the string "Done"',
          'TypeError: __init__() should return None',
          'It is silently ignored',
          'SyntaxError',
        ],
        correctOptionIndex: 1,
        explanation: 'Python strictly raises a TypeError if __init__() returns anything other than None.',
      },
    ],
    revisionNotes: [
      '__new__ allocates the instance; __init__ initializes attributes.',
      '__init__ must always return None.',
      'Override __new__ for Singletons and immutable types.',
    ],
  },
  {
    id: 'py-35-instance-vs-class-variables',
    moduleId: 'py-m4',
    moduleNumber: 4,
    moduleTitle: 'Object-Oriented Programming',
    topicNumber: 35,
    title: 'Instance Variables vs Class Variables',
    language: 'python',
    level: 'Beginner',
    whyItMatters:
      'Confusing class variables (shared across all instances) with instance variables (unique per object) causes catastrophic cross-user state leaks in backend applications.',
    explanation:
      'A **class variable** is defined directly inside the class body, outside any methods. It is shared across ALL instances of the class. An **instance variable** is tied to a specific object (usually initialized inside `__init__` via `self.variable`) and has independent state. If you assign to a class variable via an instance (`instance.var = value`), Python creates a shadowing instance variable on that specific object without modifying the class variable for other instances.',
    syntaxAndStructure:
      'class Employee:\n    company_name = "AK67 Tech" # Class variable (shared)\n    \n    def __init__(self, name: str):\n        self.name = name       # Instance variable (unique)',
    codeExamples: [
      {
        title: 'Class Variable Sharing and Shadowing',
        code: `class Employee:
    company = "TechCorp" # Class variable

    def __init__(self, name: str):
        self.name = name # Instance variable

e1 = Employee("Aarav")
e2 = Employee("Diya")

print("e1 company:", e1.company)
print("e2 company:", e2.company)

# Changing via ClassName modifies it for ALL instances:
Employee.company = "GlobalTech"
print("After class update -> e1:", e1.company, "| e2:", e2.company)

# SHADOWING: Assigning via an instance creates a local instance variable!
e1.company = "StartupXYZ"
print("After e1 override -> e1:", e1.company, "| e2:", e2.company, "| Class:", Employee.company)`,
        expectedOutput: `e1 company: TechCorp
e2 company: TechCorp
After class update -> e1: GlobalTech | e2: GlobalTech
After e1 override -> e1: StartupXYZ | e2: GlobalTech | Class: GlobalTech`,
        explanation: 'e1.company = ... created an entry inside e1.__dict__, shadowing Employee.company for e1 only.',
      },
      {
        title: 'The Mutable Class Variable Pitfall',
        code: `# DANGEROUS MISTAKE: Mutable class variable shared by all instances!
class Dog:
    tricks = [] # Class variable list!

    def __init__(self, name: str):
        self.name = name

d1 = Dog("Fido")
d2 = Dog("Buddy")

d1.tricks.append("roll over") # Mutates shared list!
print("d2 tricks (UNEXPECTED!):", d2.tricks)`,
        expectedOutput: `d2 tricks (UNEXPECTED!): ['roll over']`,
        explanation: 'Because tricks is a class variable, mutating it through d1 affects all other dogs.',
      },
    ],
    realWorldApplications: [
      'Maintaining global instance counters (e.g. tracking active active database connections).',
      'Configuring class-level constants and default thresholds.',
    ],
    commonMistakes: [
      'Declaring a mutable collection (list, dict) as a class variable expecting it to be unique per instance.',
      'Accidentally shadowing a class variable with an instance variable.',
    ],
    interviewRelevance:
      'Classic interview question: "What is the output of modifying a class variable through an instance vs through the class name?".',
    checkpoints: [
      { id: 'py-35-cp-1', label: 'Class variables are shared across all instances.' },
      { id: 'py-35-cp-2', label: 'Never put mutable containers (lists/dicts) in class variables.' },
    ],
    practiceExercises: [
      {
        id: 'py-35-ex-1',
        title: 'Active Instance Counter',
        difficulty: 'Beginner',
        type: 'coding',
        prompt: 'Create an `Account` class that tracks total accounts created across all instances using a class variable.',
        starterCode: 'class Account:\n    pass',
        solution: `class Account:
    total_accounts = 0

    def __init__(self, holder: str):
        self.holder = holder
        Account.total_accounts += 1

a1 = Account("Alice")
a2 = Account("Bob")
a3 = Account("Charlie")
print("Total accounts:", Account.total_accounts)  # 3`,
        explanation: 'Account.total_accounts tracks state shared across all instantiations.',
      },
      {
        id: 'py-35-ex-2',
        title: 'Fix Shared Mutable Trick List',
        difficulty: 'Intermediate',
        type: 'debugging',
        prompt: 'Fix the `Dog` class so each dog has its own independent `tricks` list.',
        starterCode: 'class Dog:\n    tricks = []\n    def __init__(self, name):\n        self.name = name',
        solution: `class Dog:
    def __init__(self, name: str):
        self.name = name
        self.tricks = []  # Bound to self (independent instance variable)

d1 = Dog("Fido")
d2 = Dog("Buddy")
d1.tricks.append("sit")
print("d1 tricks:", d1.tricks)  # ['sit']
print("d2 tricks:", d2.tricks)  # []`,
        explanation: 'Moving the initialization inside __init__ allocates an independent list for every instance.',
      },
      {
        id: 'py-35-ex-3',
        title: 'Inspect __class__ Resolution',
        difficulty: 'Advanced',
        type: 'coding',
        prompt: 'Demonstrate checking whether an attribute exists on the instance vs on its class using `vars()` and `hasattr()`.',
        starterCode: 'class A:\n    x = 10\n    def __init__(self):\n        self.y = 20',
        solution: `class A:
    x = 10
    def __init__(self):
        self.y = 20

obj = A()
print("In obj __dict__ (instance):", "y" in vars(obj), "x" in vars(obj))
print("In class A __dict__:", "x" in vars(A))`,
        explanation: 'vars(obj) inspects the instance dict, while vars(A) inspects class namespace.',
      },
    ],
    quizQuestions: [
      {
        id: 'py-35-q1',
        question: 'Where is a class variable defined in Python?',
        options: [
          'Inside the __init__ method using self.var',
          'Directly inside the class body outside any method',
          'Inside a global module function',
          'Inside a static method using cls.var',
        ],
        correctOptionIndex: 1,
        explanation: 'Class variables are declared directly inside the class definition, outside of all methods.',
      },
      {
        id: 'py-35-q2',
        question: 'What happens when you execute obj.class_var = 99 on an instance?',
        options: [
          'The class variable is updated for all instances',
          'It creates an instance attribute on obj that shadows the class variable',
          'Raises an AttributeError',
          'Raises a TypeError',
        ],
        correctOptionIndex: 1,
        explanation: 'Assigning through an instance writes to obj.__dict__, creating an instance attribute that shadows the class variable for that specific instance.',
      },
    ],
    revisionNotes: [
      'Class variables are shared by all instances.',
      'Instance variables (self.var) are unique to each object.',
      'Avoid mutable class variables (like shared lists or dicts).',
    ],
  },
  {
    id: 'py-36-method-types',
    moduleId: 'py-m4',
    moduleNumber: 4,
    moduleTitle: 'Object-Oriented Programming',
    topicNumber: 36,
    title: 'Instance Methods, Class Methods (@classmethod) & Static Methods (@staticmethod)',
    language: 'python',
    level: 'Intermediate',
    whyItMatters:
      'Python clearly differentiates between methods that operate on instances (`self`), methods that operate on the class itself (`@classmethod`), and self-contained utility methods (`@staticmethod`). Using them correctly produces clean OOP architectures.',
    explanation:
      'Python defines three distinct types of methods:\n1. **Instance Method**: Receives `self` (the instance). Can modify both object state and class state.\n2. **Class Method (`@classmethod`)**: Receives `cls` (the class object). Can modify class state. Primarily used as alternative constructors (factory methods).\n3. **Static Method (`@staticmethod`)**: Receives neither `self` nor `cls`. Acts like a plain function placed inside the class namespace for logical grouping.',
    syntaxAndStructure:
      'class Example:\n    def instance_method(self):\n        pass\n\n    @classmethod\n    def class_method(cls):\n        return cls() # Alternative constructor\n\n    @staticmethod\n    def static_method(x, y):\n        return x + y # Independent utility',
    codeExamples: [
      {
        title: 'The Three Method Types in Practice',
        code: `class Date:
    def __init__(self, year: int, month: int, day: int):
        self.year = year
        self.month = month
        self.day = day

    # 1. Instance method: Formats the specific instance
    def to_iso(self) -> str:
        return f"{self.year:04d}-{self.month:02d}-{self.day:02d}"

    # 2. Class method: Alternative constructor from string "YYYY-MM-DD"
    @classmethod
    def from_string(cls, date_str: str):
        year, month, day = map(int, date_str.split("-"))
        return cls(year, month, day) # Works polymorphically even if subclassed!

    # 3. Static method: Pure utility validating leap years
    @staticmethod
    def is_leap_year(year: int) -> bool:
        return (year % 4 == 0 and year % 100 != 0) or (year % 400 == 0)

# Calling instance method
d1 = Date(2026, 11, 24)
print("d1 ISO:", d1.to_iso())

# Calling class method alternative constructor
d2 = Date.from_string("2024-02-29")
print("d2 ISO (from_string):", d2.to_iso())

# Calling static method (without needing an instance)
print("Is 2024 leap year?", Date.is_leap_year(2024))
print("Is 2026 leap year?", Date.is_leap_year(2026))`,
        expectedOutput: `d1 ISO: 2026-11-24
d2 ISO (from_string): 2024-02-29
Is 2024 leap year? True
Is 2026 leap year? False`,
        explanation: 'Class methods cleanly provide alternative constructors; static methods provide namespaced utility functions.',
      },
      {
        title: 'Polymorphic Behavior of @classmethod in Subclasses',
        code: `class Parent:
    @classmethod
    def create(cls):
        print("Instantiating class:", cls.__name__)
        return cls()

class Child(Parent):
    pass

c = Child.create() # cls is Child, not Parent!`,
        expectedOutput: `Instantiating class: Child`,
        explanation: 'Because @classmethod receives cls dynamically, calling Child.create() properly instantiates a Child instance.',
      },
    ],
    realWorldApplications: [
      'Factory methods parsing JSON, strings, or database rows (e.g. `User.from_dict(data)`).',
      'Encapsulating validation utilities associated with a domain model.',
    ],
    commonMistakes: [
      'Using `@staticmethod` when the factory needs to instantiate the class; use `@classmethod` so subclasses inherit factory behavior correctly.',
      'Forgetting that `@staticmethod` does not receive `self` or `cls`.',
    ],
    interviewRelevance:
      'Universal interview question: "Explain the difference between instance methods, class methods, and static methods in Python".',
    checkpoints: [
      { id: 'py-36-cp-1', label: 'Use @classmethod for alternative factory constructors.' },
      { id: 'py-36-cp-2', label: 'Use @staticmethod for utility functions that don\'t touch self or cls.' },
    ],
    practiceExercises: [
      {
        id: 'py-36-ex-1',
        title: 'Alternative Constructor for User Profile',
        difficulty: 'Beginner',
        type: 'coding',
        prompt: 'Build a `User` class with `from_csv(cls, csv_line)` alternative constructor parsing `"id,name,email"`.',
        starterCode: 'class User:\n    pass',
        solution: `class User:
    def __init__(self, uid: int, name: str, email: str):
        self.uid = uid
        self.name = name
        self.email = email

    @classmethod
    def from_csv(cls, csv_line: str):
        parts = [p.strip() for p in csv_line.split(",")]
        return cls(int(parts[0]), parts[1], parts[2])

u = User.from_csv("101, Aarav, aarav@ak67.local")
print(f"User #{u.uid}: {u.name} ({u.email})")`,
        explanation: 'Class method parses CSV format and constructs instance cleanly.',
      },
      {
        id: 'py-36-ex-2',
        title: 'Temperature Unit Converter Static Methods',
        difficulty: 'Intermediate',
        type: 'coding',
        prompt: 'Create `Temperature` class with static methods `c_to_f(c)` and `f_to_c(f)`.',
        starterCode: 'class Temperature:\n    pass',
        solution: `class Temperature:
    @staticmethod
    def c_to_f(c: float) -> float:
        return round((c * 9/5) + 32, 2)

    @staticmethod
    def f_to_c(f: float) -> float:
        return round((f - 32) * 5/9, 2)

print("100C to F:", Temperature.c_to_f(100))  # 212.0
print("32F to C:", Temperature.f_to_c(32))    # 0.0`,
        explanation: 'Static methods namespace independent mathematical conversions within Temperature.',
      },
      {
        id: 'py-36-ex-3',
        title: 'Subclassing with Factory Method',
        difficulty: 'Advanced',
        type: 'coding',
        prompt: 'Create a base `Model` class with `@classmethod from_json` and verify that a subclass `UserModel` returns a `UserModel` instance.',
        starterCode: 'class Model:\n    pass\nclass UserModel(Model):\n    pass',
        solution: `class Model:
    def __init__(self, **kwargs):
        self.__dict__.update(kwargs)

    @classmethod
    def from_dict(cls, data: dict):
        return cls(**data)

class UserModel(Model):
    def display(self):
        return f"User: {self.name}"

u = UserModel.from_dict({"name": "Diya", "id": 1})
print(type(u).__name__)  # UserModel
print(u.display())       # User: Diya`,
        explanation: 'Demonstrates factory polymorphism where cls dynamically binds to the calling subclass.',
      },
    ],
    quizQuestions: [
      {
        id: 'py-36-q1',
        question: 'What is the primary difference between @classmethod and @staticmethod in Python?',
        options: [
          '@classmethod receives the class object as its first argument (cls); @staticmethod receives neither self nor cls',
          '@staticmethod can modify class state; @classmethod cannot',
          '@classmethod can only be called from an instance',
          '@staticmethod is executed at compile time',
        ],
        correctOptionIndex: 0,
        explanation: '@classmethod receives the class object (cls) dynamically, whereas @staticmethod receives no implicit first argument.',
      },
      {
        id: 'py-36-q2',
        question: 'What is the most common use case for a @classmethod in Python?',
        options: [
          'Garbage collection cleanup',
          'Alternative constructors / factory methods',
          'Overriding operator overloading methods',
          'Enforcing thread locks',
        ],
        correctOptionIndex: 1,
        explanation: 'Class methods are universally used as alternative constructors (like dict.fromkeys or datetime.fromtimestamp).',
      },
    ],
    revisionNotes: [
      'Instance methods receive self (the instance).',
      '@classmethod receives cls (the class) and serves as factory constructors.',
      '@staticmethod receives no implicit arguments and acts as namespaced utilities.',
    ],
  },
  {
    id: 'py-37-encapsulation-property',
    moduleId: 'py-m4',
    moduleNumber: 4,
    moduleTitle: 'Object-Oriented Programming',
    topicNumber: 37,
    title: 'Encapsulation: Name Mangling & The @property Decorator',
    language: 'python',
    level: 'Intermediate',
    whyItMatters:
      'Unlike Java with strict `private` keywords, Python uses naming conventions (`_protected`, `__private` name mangling) and the `@property` decorator to implement Pythonic getters, setters, and validation without breaking public API interfaces.',
    explanation:
      'In Python:\n1. `_single_leading_underscore`: A convention indicating an internal or protected attribute. It can still be accessed publicly, but signals "use at your own risk".\n2. `__double_leading_underscore`: Triggers **name mangling**. Python renames `__attr` to `_ClassName__attr` to prevent accidental name collisions in subclasses.\n3. `@property`: Allows methods to be accessed like attributes (`obj.attr`), providing clean validation in getters (`@property`), setters (`@attr.setter`), and deleters without altering calling code.',
    syntaxAndStructure:
      'class Person:\n    def __init__(self, age: int):\n        self._age = age # Protected convention\n\n    @property\n    def age(self) -> int:\n        return self._age\n\n    @age.setter\n    def age(self, value: int):\n        if value < 0:\n            raise ValueError("Age cannot be negative")\n        self._age = value',
    codeExamples: [
      {
        title: 'Using @property for Transparent Data Validation',
        code: `class Employee:
    def __init__(self, name: str, salary: float):
        self.name = name
        self.salary = salary # Uses setter validation!

    @property
    def salary(self) -> float:
        """Getter for salary."""
        return self._salary

    @salary.setter
    def salary(self, value: float):
        """Setter with validation guard."""
        if value < 0:
            raise ValueError("Salary cannot be negative.")
        self._salary = value

emp = Employee("Aarav", 80000.0)
print(f"Employee {emp.name} salary: \${emp.salary}")

emp.salary = 95000.0 # Invokes setter cleanly
print("Updated salary:", emp.salary)

try:
    emp.salary = -5000.0 # Triggers validation!
except ValueError as e:
    print("Caught validation error:", e)`,
        expectedOutput: `Employee Aarav salary: $80000.0
Updated salary: 95000.0
Caught validation error: Salary cannot be negative.`,
        explanation: '@property lets callers use attribute syntax `emp.salary = val` while executing defensive validation logic.',
      },
      {
        title: 'Name Mangling with Double Leading Underscores',
        code: `class BankVault:
    def __init__(self, passcode: str):
        self.__passcode = passcode # Name mangled!

    def verify(self, code: str) -> bool:
        return self.__passcode == code

vault = BankVault("secret_123")
print("Passcode verified:", vault.verify("secret_123"))

# Accessing __passcode directly raises AttributeError:
try:
    print(vault.__passcode)
except AttributeError as e:
    print("Caught expected AttributeError:", e)

# Inspecting mangled attribute name in __dict__:
print("Mangled name in dict:", vault._BankVault__passcode)`,
        expectedOutput: `Passcode verified: True
Caught expected AttributeError: 'BankVault' object has no attribute '__passcode'
Mangled name in dict: secret_123`,
        explanation: 'Python mangles __passcode to _BankVault__passcode to avoid collision. It is not true security encryption, but prevents name clash.',
      },
    ],
    realWorldApplications: [
      'Encapsulating database models with computed properties (e.g. `full_name = f"{first} {last}"`).',
      'Ensuring invariants and data integrity in business logic layers.',
    ],
    commonMistakes: [
      'Creating an infinite recursion loop by referencing `self.age = value` inside the `age` setter instead of `self._age = value`.',
      'Relying on double underscore name mangling as a security mechanism; Python does not have true access restriction.',
    ],
    interviewRelevance:
      'Classic interview question: "Does Python have private variables?" (Answer: No, it relies on conventions and name mangling; "We are all consenting adults here").',
    checkpoints: [
      { id: 'py-37-cp-1', label: '_var is protected convention; __var triggers name mangling to _Class__var.' },
      { id: 'py-37-cp-2', label: 'Use @property and @prop.setter for validated attribute access.' },
    ],
    practiceExercises: [
      {
        id: 'py-37-ex-1',
        title: 'Temperature Celsius and Fahrenheit Property',
        difficulty: 'Beginner',
        type: 'coding',
        prompt: 'Create `Temperature` class with `celsius` property and a calculated `fahrenheit` property that can also be set.',
        starterCode: 'class Temperature:\n    pass',
        solution: `class Temperature:
    def __init__(self, celsius: float):
        self.celsius = celsius

    @property
    def fahrenheit(self) -> float:
        return (self.celsius * 9/5) + 32

    @fahrenheit.setter
    def fahrenheit(self, value: float):
        self.celsius = (value - 32) * 5/9

t = Temperature(0.0)
print("0C in F:", t.fahrenheit)   # 32.0
t.fahrenheit = 212.0
print("212F in C:", t.celsius)    # 100.0`,
        explanation: 'Bidirectional property synchronization between Celsius and Fahrenheit.',
      },
      {
        id: 'py-37-ex-2',
        title: 'Fix Infinite Recursion in Property Setter',
        difficulty: 'Intermediate',
        type: 'debugging',
        prompt: 'Fix the RecursionError in: `class Circle: @property def r(self): return self.r; @r.setter def r(self, v): self.r = v`',
        starterCode: '# Fix recursive setter bug',
        solution: `class Circle:
    def __init__(self, r: float):
        self._r = r

    @property
    def r(self) -> float:
        return self._r

    @r.setter
    def r(self, v: float):
        if v < 0:
            raise ValueError("Radius must be non-negative")
        self._r = v  # Must assign to internal _r, NOT self.r!

c = Circle(5.0)
c.r = 10.0
print("Circle radius:", c.r)`,
        explanation: 'Assigning to self.r inside the setter re-invokes the setter indefinitely, causing RecursionError. Assign to self._r.',
      },
      {
        id: 'py-37-ex-3',
        title: 'Read-Only Computed Property',
        difficulty: 'Advanced',
        type: 'coding',
        prompt: 'Create a `User` class with `first_name` and `last_name`, and a read-only `full_name` property that raises AttributeError if set.',
        starterCode: 'class User:\n    pass',
        solution: `class User:
    def __init__(self, first: str, last: str):
        self.first = first
        self.last = last

    @property
    def full_name(self) -> str:
        return f"{self.first} {self.last}"

u = User("Aarav", "Patel")
print(u.full_name)  # Aarav Patel
try:
    u.full_name = "New Name"
except AttributeError as e:
    print("Caught read-only error:", e)`,
        explanation: 'Omitting a @setter decorator makes a property strictly read-only.',
      },
    ],
    quizQuestions: [
      {
        id: 'py-37-q1',
        question: 'What does Python do to an attribute declared with double leading underscores (e.g. self.__secret)?',
        options: [
          'Encrypts its memory address in RAM',
          'Mangles the name to _ClassName__secret in the object\'s __dict__',
          'Restricts access strictly via C-level kernel protection',
          'Deletes the attribute after __init__ finishes',
        ],
        correctOptionIndex: 1,
        explanation: 'Python applies name mangling by prefixing a single underscore and the class name to prevent subclass collisions.',
      },
      {
        id: 'py-37-q2',
        question: 'Why does self.x = val inside a setter @x.setter cause a RecursionError?',
        options: [
          'Because @property requires integers',
          'Because assigning to self.x recursively re-invokes the @x.setter method indefinitely',
          'Because self is immutable',
          'Because Python does not allow setters',
        ],
        correctOptionIndex: 1,
        explanation: 'self.x = val triggers the setter again, causing an infinite loop. The setter must assign to an underlying storage attribute like self._x.',
      },
    ],
    revisionNotes: [
      '_single_leading is a protected convention.',
      '__double_leading triggers name mangling to _Class__var.',
      '@property provides getters and @prop.setter provides validation.',
    ],
  },
  {
    id: 'py-38-inheritance-super',
    moduleId: 'py-m4',
    moduleNumber: 4,
    moduleTitle: 'Object-Oriented Programming',
    topicNumber: 38,
    title: 'Inheritance: Single, Multilevel & super() Mechanics',
    language: 'python',
    level: 'Beginner',
    whyItMatters:
      'Inheritance establishes hierarchical relationships ("is-a") and enables code reuse. Calling `super()` correctly ensures parent initializers and lifecycle methods run predictably.',
    explanation:
      'Inheritance allows a child class (derived/subclass) to inherit attributes and methods from a parent class (base class). Syntax: `class Child(Parent):`. In the child\'s `__init__`, calling `super().__init__(*args, **kwargs)` invokes the parent constructor, initializing inherited attributes. Python supports single inheritance, multilevel inheritance (A -> B -> C), and hierarchical inheritance.',
    syntaxAndStructure:
      'class Vehicle:\n    def __init__(self, brand: str):\n        self.brand = brand\n\nclass Car(Vehicle):\n    def __init__(self, brand: str, doors: int):\n        super().__init__(brand) # Calls Vehicle.__init__\n        self.doors = doors',
    codeExamples: [
      {
        title: 'Single and Multilevel Inheritance with super()',
        code: `class Vehicle:
    def __init__(self, make: str, model: str):
        self.make = make
        self.model = model

    def get_description(self) -> str:
        return f"{self.make} {self.model}"

class ElectricCar(Vehicle):
    def __init__(self, make: str, model: str, battery_kwh: float):
        super().__init__(make, model)  # Delegate to parent
        self.battery_kwh = battery_kwh

    # Overriding method and extending parent behavior:
    def get_description(self) -> str:
        base_desc = super().get_description()
        return f"{base_desc} [EV - {self.battery_kwh} kWh]"

ev = ElectricCar("Tesla", "Model 3", 75.0)
print(ev.get_description())
print("isinstance(ev, Vehicle):", isinstance(ev, Vehicle))
print("issubclass(ElectricCar, Vehicle):", issubclass(ElectricCar, Vehicle))`,
        expectedOutput: `Tesla Model 3 [EV - 75.0 kWh]
isinstance(ev, Vehicle): True
issubclass(ElectricCar, Vehicle): True`,
        explanation: 'super() cleanly resolves the parent class, avoiding hardcoding the parent class name.',
      },
      {
        title: 'Multilevel Inheritance Hierarchy',
        code: `class Person:
    def role(self):
        return "Person"

class Employee(Person):
    def role(self):
        return "Employee -> " + super().role()

class Manager(Employee):
    def role(self):
        return "Manager -> " + super().role()

m = Manager()
print("Hierarchy chain:", m.role())`,
        expectedOutput: `Hierarchy chain: Manager -> Employee -> Person`,
        explanation: 'super().role() climbs the inheritance ladder sequentially through each generation.',
      },
    ],
    realWorldApplications: [
      'GUI widget hierarchies (Button inherits from Component, which inherits from Widget).',
      'Custom exception classes inheriting from `Exception`.',
    ],
    commonMistakes: [
      'Forgetting to call `super().__init__()` in a child class, leaving parent attributes uninitialized.',
      'Passing `self` explicitly to `super().__init__(self, ...)` (`super()` in Python 3 automatically supplies `self`).',
    ],
    interviewRelevance:
      'Essential for OOP design rounds, explaining how `super()` works and how subclasses extend base functionality.',
    checkpoints: [
      { id: 'py-38-cp-1', label: 'Use super().__init__() to invoke parent initializers.' },
      { id: 'py-38-cp-2', label: 'Check hierarchy with isinstance() and issubclass().' },
    ],
    practiceExercises: [
      {
        id: 'py-38-ex-1',
        title: 'Employee and Developer Subclass',
        difficulty: 'Beginner',
        type: 'coding',
        prompt: 'Create `Developer(Employee)` adding `programming_language` attribute, extending `get_info()`.',
        starterCode: 'class Employee:\n    def __init__(self, name, salary):\n        self.name = name\n        self.salary = salary',
        solution: `class Employee:
    def __init__(self, name: str, salary: float):
        self.name = name
        self.salary = salary

class Developer(Employee):
    def __init__(self, name: str, salary: float, language: str):
        super().__init__(name, salary)
        self.language = language

    def get_info(self) -> str:
        return f"{self.name} ({self.language}) earns \${self.salary:.0f}"

dev = Developer("Diya", 105000.0, "Python")
print(dev.get_info())`,
        explanation: 'Extends Employee with specialized Developer attributes.',
      },
      {
        id: 'py-38-ex-2',
        title: 'Custom Exception Hierarchy',
        difficulty: 'Intermediate',
        type: 'coding',
        prompt: 'Create a custom `ValidationError(Exception)` and specialized `EmailValidationError(ValidationError)`.',
        starterCode: '# Custom exception classes',
        solution: `class ValidationError(Exception):
    """Base application validation error."""
    pass

class EmailValidationError(ValidationError):
    """Raised when email format is invalid."""
    def __init__(self, email: str):
        super().__init__(f"Invalid email address provided: {email}")

try:
    raise EmailValidationError("bad_email")
except ValidationError as e:
    print("Caught via base ValidationError:", e)`,
        explanation: 'Exception inheritance allows callers to catch the general base error or specific sub-error.',
      },
      {
        id: 'py-38-ex-3',
        title: 'BankAccount Overdraft Protection Subclass',
        difficulty: 'Advanced',
        type: 'coding',
        prompt: 'Subclass `BankAccount` into `OverdraftAccount` that allows withdrawing beyond balance up to an overdraft limit.',
        starterCode: 'class BankAccount:\n    # base withdraw checks balance\n    pass',
        solution: `class BankAccount:
    def __init__(self, balance: float):
        self.balance = balance
    def withdraw(self, amount: float):
        if amount > self.balance:
            raise ValueError("Insufficient balance")
        self.balance -= amount

class OverdraftAccount(BankAccount):
    def __init__(self, balance: float, limit: float = 100.0):
        super().__init__(balance)
        self.limit = limit
    def withdraw(self, amount: float):
        if amount > self.balance + self.limit:
            raise ValueError("Overdraft limit exceeded")
        self.balance -= amount

acc = OverdraftAccount(50.0, 100.0)
acc.withdraw(120.0)
print("Balance after overdraft:", acc.balance)  # -70.0`,
        explanation: 'Polymorphically modifies withdrawal constraints in the subclass.',
      },
    ],
    quizQuestions: [
      {
        id: 'py-38-q1',
        question: 'What is the correct syntax to call the parent constructor in Python 3?',
        options: [
          'super().__init__(*args, **kwargs)',
          'super(self).__init__(*args)',
          'parent.__init__(self, *args)',
          'this.super(*args)',
        ],
        correctOptionIndex: 0,
        explanation: 'In Python 3, super().__init__(*args, **kwargs) is the standard parameterless super call.',
      },
      {
        id: 'py-38-q2',
        question: 'What is returned by issubclass(bool, int) in Python?',
        options: ['False', 'True', 'Raises TypeError', 'None'],
        correctOptionIndex: 1,
        explanation: 'In Python, the bool type is implemented as a direct subclass of int (where True=1, False=0).',
      },
    ],
    revisionNotes: [
      'class Child(Parent): declares inheritance.',
      'super().__init__() executes parent constructor logic.',
      'Use issubclass() and isinstance() for type verification.',
    ],
  },
  {
    id: 'py-39-multiple-inheritance-mro',
    moduleId: 'py-m4',
    moduleNumber: 4,
    moduleTitle: 'Object-Oriented Programming',
    topicNumber: 39,
    title: 'Multiple Inheritance & Method Resolution Order (MRO)',
    language: 'python',
    level: 'Advanced',
    whyItMatters:
      'Unlike Java which restricts multiple inheritance to interfaces, Python supports full multiple inheritance. The C3 Linearization algorithm calculates the Method Resolution Order (MRO), resolving the "Diamond Problem".',
    explanation:
      'Multiple inheritance allows a class to inherit from more than one base class (`class Child(Base1, Base2):`). The famous **Diamond Problem** occurs when two parent classes inherit from the same grandparent, and both override a method. Python resolves this deterministically using the **C3 Linearization** algorithm, which generates an ordered list of classes called the **Method Resolution Order (MRO)**. You can inspect any class\'s MRO via `Class.mro()` or `Class.__mro__`. `super()` does not simply call the parent class; it calls the NEXT class in the MRO chain (cooperative multiple inheritance).',
    syntaxAndStructure:
      'class A:\n    pass\nclass B(A):\n    pass\nclass C(A):\n    pass\nclass D(B, C):\n    pass # The Diamond\n\n# Inspect MRO:\nprint(D.mro()) # [D, B, C, A, object]',
    codeExamples: [
      {
        title: 'The Diamond Problem and C3 Linearization Inspection',
        code: `class A:
    def action(self):
        print("A action")

class B(A):
    def action(self):
        print("B action")
        super().action()

class C(A):
    def action(self):
        print("C action")
        super().action()

class D(B, C):
    def action(self):
        print("D action")
        super().action()

d = D()
d.action()

print("\\nClass D Method Resolution Order (MRO):")
for idx, cls in enumerate(D.mro(), start=1):
    print(f"  {idx}. {cls.__name__}")`,
        expectedOutput: `D action
B action
C action
A action

Class D Method Resolution Order (MRO):
  1. D
  2. B
  3. C
  4. A
  5. object`,
        explanation: 'Notice that B\'s super().action() called C.action(), NOT A.action()! super() follows the MRO chain [D -> B -> C -> A -> object], ensuring A is executed only once.',
      },
      {
        title: 'Mixins: Composable Behaviors in Python',
        code: `import json

class JSONSerializableMixin:
    """A mixin providing JSON serialization to any class."""
    def to_json(self) -> str:
        return json.dumps(self.__dict__)

class Person:
    def __init__(self, name: str, age: int):
        self.name = name
        self.age = age

class SerializablePerson(Person, JSONSerializableMixin):
    pass

p = SerializablePerson("Aarav", 21)
print("Serialized JSON:", p.to_json())`,
        expectedOutput: `Serialized JSON: {"name": "Aarav", "age": 21}`,
        explanation: 'Mixins are lightweight classes designed to inject reusable behavior via multiple inheritance without acting as standalone entities.',
      },
    ],
    realWorldApplications: [
      'Django class-based views utilizing mixins (`LoginRequiredMixin`, `ListView`).',
      'Implementing plugin architectures and composable interface features.',
    ],
    commonMistakes: [
      'Creating an inconsistent hierarchy that violates C3 Linearization (`TypeError: Cannot create a consistent method resolution order (MRO)`).',
      'Assuming `super()` always calls the immediate syntactic parent; it calls the next class in the runtime MRO.',
    ],
    interviewRelevance:
      'Favorite advanced interview question: "What is the Diamond Problem, how does Python solve it, and what is C3 Linearization?".',
    checkpoints: [
      { id: 'py-39-cp-1', label: 'Inspect MRO using Class.mro().' },
      { id: 'py-39-cp-2', label: 'Understand that super() follows the MRO chain, not direct inheritance.' },
    ],
    practiceExercises: [
      {
        id: 'py-39-ex-1',
        title: 'Inspect Complex MRO',
        difficulty: 'Beginner',
        type: 'coding',
        prompt: 'Define classes X, Y, Z where Z inherits from X and Y, and print `Z.mro()` class names.',
        starterCode: 'class X: pass\nclass Y: pass\nclass Z(X, Y): pass',
        solution: `class X: pass
class Y: pass
class Z(X, Y): pass

print([cls.__name__ for cls in Z.mro()])  # ['Z', 'X', 'Y', 'object']`,
        explanation: 'Classes are checked in order: Z, first parent X, second parent Y, root object.',
      },
      {
        id: 'py-39-ex-2',
        title: 'Diagnose Inconsistent MRO TypeError',
        difficulty: 'Intermediate',
        type: 'debugging',
        prompt: 'Explain why `class A: pass; class B(A): pass; class C(A, B): pass` fails with TypeError.',
        starterCode: '# Analyze why C(A, B) raises TypeError',
        solution: `# A is a parent of B, but in C(A, B), A is specified BEFORE B.
# C3 linearization mandates that a subclass must precede its parent.
# FIX: Specify B before A:
class A: pass
class B(A): pass
class C(B, A): pass # Legal!

print("Valid MRO:", [cls.__name__ for cls in C.mro()])`,
        explanation: 'C(A, B) violates monotonicity because B inherits from A, meaning B must appear before A in any MRO involving both.',
      },
      {
        id: 'py-39-ex-3',
        title: 'Logging Mixin Class',
        difficulty: 'Advanced',
        type: 'coding',
        prompt: 'Write a `LoggableMixin` with `log(msg)` that prepends `[ClassName]` to any output, and mix it into a `Repository` class.',
        starterCode: 'class LoggableMixin:\n    pass',
        solution: `class LoggableMixin:
    def log(self, msg: str):
        print(f"[{self.__class__.__name__}] {msg}")

class OrderRepository(LoggableMixin):
    def save_order(self, order_id: int):
        self.log(f"Order #{order_id} saved successfully.")

repo = OrderRepository()
repo.save_order(1001)  # [OrderRepository] Order #1001 saved successfully.`,
        explanation: 'Mixins inject reusable logging functionality across diverse class hierarchies.',
      },
    ],
    quizQuestions: [
      {
        id: 'py-39-q1',
        question: 'What algorithm does Python 3 use to compute the Method Resolution Order (MRO)?',
        options: ['Depth-First Search (DFS)', 'C3 Linearization', 'Breadth-First Search (BFS)', 'Dijkstra Algorithm'],
        correctOptionIndex: 1,
        explanation: 'Python uses C3 Linearization (introduced in Python 2.3) to resolve multiple inheritance deterministically.',
      },
      {
        id: 'py-39-q2',
        question: 'In a diamond hierarchy D(B, C) where B and C inherit from A, what does super() inside B call?',
        options: ['Class A', 'Class C (the next class in D\'s MRO)', 'Class D', 'None'],
        correctOptionIndex: 1,
        explanation: 'In cooperative multiple inheritance, super() executes according to the MRO of the calling instance, so B\'s super() calls C.',
      },
    ],
    revisionNotes: [
      'Python supports multiple inheritance via class Child(A, B):.',
      'The MRO is computed using the C3 Linearization algorithm.',
      'super() traverses the MRO, resolving the Diamond Problem.',
    ],
  },
  {
    id: 'py-40-polymorphism-duck-typing',
    moduleId: 'py-m4',
    moduleNumber: 4,
    moduleTitle: 'Object-Oriented Programming',
    topicNumber: 40,
    title: 'Polymorphism & Duck Typing ("If it walks like a duck...")',
    language: 'python',
    level: 'Beginner',
    whyItMatters:
      'Python embodies duck typing: "If it walks like a duck and quacks like a duck, it\'s a duck." Writing polymorphic functions that accept any object satisfying an interface is the essence of idiomatic Python.',
    explanation:
      'Polymorphism is the ability of different types to respond to the same interface or method call. Unlike statically typed languages (Java, C++) which require classes to explicitly implement an `interface` or extend an abstract class, Python uses **Duck Typing**: an object\'s suitability is determined by the presence of specific methods and attributes at runtime, rather than its formal inheritance tree.',
    syntaxAndStructure:
      '# Duck typing philosophy:\ndef process_payment(payment_gateway, amount):\n    # Works with PayPal, Stripe, UPI, or MockGateway\n    # As long as the object has a .pay(amount) method!\n    payment_gateway.pay(amount)',
    codeExamples: [
      {
        title: 'Duck Typing with Heterogeneous Objects',
        code: `class CreditCardGateway:
    def process_payment(self, amount: float):
        print(f"Charging \${amount:.2f} to Credit Card")

class CryptoWallet:
    def process_payment(self, amount: float):
        print(f"Transferring \${amount:.2f} equivalent in BTC")

class MockPaymentForTesting:
    def process_payment(self, amount: float):
        print(f"[TEST] Mock payment processed: \${amount:.2f}")

# Polymorphic client function:
def checkout(gateway, amount: float):
    # Does not care about the type; only cares about the method!
    gateway.process_payment(amount)

gateways = [CreditCardGateway(), CryptoWallet(), MockPaymentForTesting()]
for g in gateways:
    checkout(g, 99.0)`,
        expectedOutput: `Charging $99.00 to Credit Card
Transferring $99.00 equivalent in BTC
[TEST] Mock payment processed: $99.00`,
        explanation: 'checkout() executes seamlessly with any object that provides a process_payment() method without requiring inheritance.',
      },
      {
        title: 'File-like Objects (Duck Typing in Python Standard Library)',
        code: `import io

def count_lines(file_like_object) -> int:
    return len(file_like_object.readlines())

# Works with real files OR in-memory io.StringIO buffers!
memory_buffer = io.StringIO("Line 1\\nLine 2\\nLine 3\\n")
print("Lines counted in memory stream:", count_lines(memory_buffer))`,
        expectedOutput: `Lines counted in memory stream: 3`,
        explanation: 'The standard library accepts any object implementing the file protocol (.read(), .readlines()).',
      },
    ],
    realWorldApplications: [
      'Unit testing by substituting real network/database services with duck-typed mock objects.',
      'Flexible data pipelines processing diverse streams (files, sockets, HTTP responses).',
    ],
    commonMistakes: [
      'Using `isinstance(x, SpecificClass)` excessively, which defeats duck typing and prevents passing compatible mock objects.',
      'Failing to handle `AttributeError` when an object does not satisfy the expected duck-typed interface.',
    ],
    interviewRelevance:
      'Frequent interview topic: "What is Duck Typing in Python and how does it contrast with Java interfaces?".',
    checkpoints: [
      { id: 'py-40-cp-1', label: 'Duck typing prioritizes behavior over explicit class inheritance.' },
      { id: 'py-40-cp-2', label: 'EAFP (Easier to ask for forgiveness than permission) pairs with duck typing.' },
    ],
    practiceExercises: [
      {
        id: 'py-40-ex-1',
        title: 'Polymorphic Shape Area Drawer',
        difficulty: 'Beginner',
        type: 'coding',
        prompt: 'Create `Circle` and `Square` classes with `area()`, and write a `total_area(shapes)` function that sums areas polymorphically.',
        starterCode: 'def total_area(shapes):\n    pass',
        solution: `class Circle:
    def __init__(self, r: float): self.r = r
    def area(self) -> float: return 3.14159 * self.r * self.r

class Square:
    def __init__(self, s: float): self.s = s
    def area(self) -> float: return self.s * self.s

def total_area(shapes: list) -> float:
    return round(sum(s.area() for s in shapes), 2)

shapes = [Circle(2.0), Square(3.0)]
print("Total Area:", total_area(shapes))  # 12.57 + 9.0 = 21.57`,
        explanation: 'Polymorphic dispatch invokes the appropriate area method on each shape.',
      },
      {
        id: 'py-40-ex-2',
        title: 'Duck Typed Iterable Checker',
        difficulty: 'Intermediate',
        type: 'coding',
        prompt: 'Write `is_iterable(obj)` that checks if an object satisfies the iterable protocol using `iter()`.',
        starterCode: 'def is_iterable(obj) -> bool:\n    pass',
        solution: `def is_iterable(obj) -> bool:
    try:
        iter(obj)
        return True
    except TypeError:
        return False

print(is_iterable([1, 2, 3]))  # True
print(is_iterable("hello"))    # True
print(is_iterable(12345))      # False`,
        explanation: 'EAFP principle: attempts to call iter() and catches TypeError.',
      },
      {
        id: 'py-40-ex-3',
        title: 'Protocol Type Checking with Typing Protocol (Python 3.8+)',
        difficulty: 'Advanced',
        type: 'coding',
        prompt: 'Use `typing.Protocol` to define a static type check for any object with a `serialize() -> str` method.',
        starterCode: 'from typing import Protocol\nclass Serializable(Protocol):\n    pass',
        solution: `from typing import Protocol

class Serializable(Protocol):
    def serialize(self) -> str:
        ...

class User:
    def serialize(self) -> str:
        return "User: Aarav"

def save(entity: Serializable):
    print("Saved:", entity.serialize())

save(User())  # Type-checks cleanly under MyPy without inheriting Serializable!`,
        explanation: 'typing.Protocol (PEP 544) introduces static structural subtyping (static duck typing).',
      },
    ],
    quizQuestions: [
      {
        id: 'py-40-q1',
        question: 'What is the philosophy behind Python\'s "Duck Typing"?',
        options: [
          'All classes must inherit from Animal',
          'An object\'s suitability is determined by the presence of certain methods, not by its inheritance',
          'All methods must have explicit return types',
          'Objects must be converted to dictionaries before processing',
        ],
        correctOptionIndex: 1,
        explanation: 'Duck typing means that if an object implements the required methods and attributes, Python accepts it regardless of its class hierarchy.',
      },
      {
        id: 'py-40-q2',
        question: 'Which module introduced in Python 3.8 allows static duck typing via structural subtyping?',
        options: ['typing.Protocol', 'abc.Duck', 'types.Interface', 'dataclasses.protocol'],
        correctOptionIndex: 0,
        explanation: 'typing.Protocol (PEP 544) enables static type checkers like Mypy to verify duck-typed interfaces without explicit inheritance.',
      },
    ],
    revisionNotes: [
      'Duck typing: behavior matters, not inheritance.',
      'EAFP (Easier to ask for forgiveness) is idiomatic with duck typing.',
      'typing.Protocol brings static type-checking to duck typing.',
    ],
  },
  {
    id: 'py-41-abstraction-abc',
    moduleId: 'py-m4',
    moduleNumber: 4,
    moduleTitle: 'Object-Oriented Programming',
    topicNumber: 41,
    title: 'Abstraction & Abstract Base Classes (abc Module)',
    language: 'python',
    level: 'Intermediate',
    whyItMatters:
      'When building large enterprise codebases, teams must enforce interface contracts so that subclasses implement required methods. Python\'s `abc` module provides formal abstract classes and `@abstractmethod`.',
    explanation:
      'Abstraction hides internal complexity and exposes only essential interfaces. In Python, abstract base classes are created by inheriting from `abc.ABC` and marking required interface methods with `@abstractmethod`. An abstract class cannot be instantiated directly (`TypeError: Can\'t instantiate abstract class with abstract method`). Any concrete subclass MUST implement all abstract methods before it can be instantiated.',
    syntaxAndStructure:
      'from abc import ABC, abstractmethod\n\nclass PaymentProcessor(ABC):\n    @abstractmethod\n    def process(self, amount: float) -> bool:\n        """Every payment processor must implement process()"""\n        pass\n\nclass StripeProcessor(PaymentProcessor):\n    def process(self, amount: float) -> bool:\n        return True # Concrete implementation',
    codeExamples: [
      {
        title: 'Enforcing Interface Contracts with abc.ABC',
        code: `from abc import ABC, abstractmethod

class NotificationService(ABC):
    @abstractmethod
    def send(self, recipient: str, message: str) -> bool:
        """Subclasses must implement message sending."""
        pass

# Attempting to instantiate an incomplete subclass:
class BrokenNotification(NotificationService):
    pass

try:
    BrokenNotification()
except TypeError as e:
    print("Caught instantiation error:", e)

# Concrete implementation:
class EmailNotification(NotificationService):
    def send(self, recipient: str, message: str) -> bool:
        print(f"Sending Email to {recipient}: {message}")
        return True

email_service = EmailNotification()
email_service.send("user@ak67.local", "Placement Drive starts tomorrow!")`,
        expectedOutput: `Caught instantiation error: Can't instantiate abstract class BrokenNotification with abstract method send
Sending Email to user@ak67.local: Placement Drive starts tomorrow!`,
        explanation: 'Python prevents instantiation of BrokenNotification at runtime because it failed to implement send().',
      },
      {
        title: 'Abstract Properties with @property and @abstractmethod',
        code: `from abc import ABC, abstractmethod

class DatabaseModel(ABC):
    @property
    @abstractmethod
    def table_name(self) -> str:
        """Every model must declare its database table name."""
        pass

class UserTable(DatabaseModel):
    @property
    def table_name(self) -> str:
        return "users_v1"

u = UserTable()
print("Table name:", u.table_name)`,
        expectedOutput: `Table name: users_v1`,
        explanation: '@property can be stacked with @abstractmethod to enforce property declaration in subclasses.',
      },
    ],
    realWorldApplications: [
      'Defining database repository interfaces (CRUD contracts).',
      'Plugin frameworks ensuring all third-party plugins provide `initialize()` and `execute()`.',
    ],
    commonMistakes: [
      'Stacking decorators in the wrong order; `@property` MUST be on the outside: `@property` then `@abstractmethod`.',
      'Forgetting to inherit from `ABC` or use `metaclass=ABCMeta`.',
    ],
    interviewRelevance:
      'Essential question in OOP design rounds: "How do you enforce interface contracts in Python?" (Answer: `abc.ABC` and `@abstractmethod`).',
    checkpoints: [
      { id: 'py-41-cp-1', label: 'Inherit from abc.ABC to create an abstract base class.' },
      { id: 'py-41-cp-2', label: 'Mark required methods with @abstractmethod.' },
    ],
    practiceExercises: [
      {
        id: 'py-41-ex-1',
        title: 'Abstract Storage Repository',
        difficulty: 'Beginner',
        type: 'coding',
        prompt: 'Create abstract `Storage(ABC)` with `@abstractmethod save(key, value)` and implement concrete `MemoryStorage`.',
        starterCode: 'from abc import ABC, abstractmethod\nclass Storage(ABC):\n    pass',
        solution: `from abc import ABC, abstractmethod

class Storage(ABC):
    @abstractmethod
    def save(self, key: str, value: str): pass

class MemoryStorage(Storage):
    def __init__(self): self.store = {}
    def save(self, key: str, value: str):
        self.store[key] = value

s = MemoryStorage()
s.save("token", "xyz_123")
print("Saved value:", s.store["token"])`,
        explanation: 'Enforces repository pattern interface contract.',
      },
      {
        id: 'py-41-ex-2',
        title: 'Abstract Method with Default Implementation',
        difficulty: 'Intermediate',
        type: 'coding',
        prompt: 'Demonstrate that an `@abstractmethod` can contain default logic accessible via `super().method()` in subclasses.',
        starterCode: 'from abc import ABC, abstractmethod\n# Abstract method with base logic',
        solution: `from abc import ABC, abstractmethod

class BaseHandler(ABC):
    @abstractmethod
    def handle(self, req: str):
        print(f"[BASE LOG] Handling request: {req}")

class ConcreteHandler(BaseHandler):
    def handle(self, req: str):
        super().handle(req)  # Invoke base logic
        print("[CUSTOM] Processing payload")

ConcreteHandler().handle("GET /api/users")`,
        explanation: 'Abstract methods in Python can contain reusable base implementation callable via super().',
      },
      {
        id: 'py-41-ex-3',
        title: 'Virtual Subclasses with ABC.register',
        difficulty: 'Advanced',
        type: 'coding',
        prompt: 'Use `ABC.register()` to register an external class as a virtual subclass without modifying its inheritance.',
        starterCode: 'from abc import ABC\nclass CustomSequence(ABC):\n    pass\n# Register list as virtual subclass',
        solution: `from abc import ABC

class CustomSequence(ABC):
    pass

# Virtual registration
CustomSequence.register(list)

print("issubclass(list, CustomSequence):", issubclass(list, CustomSequence))  # True
print("isinstance([1, 2], CustomSequence):", isinstance([1, 2], CustomSequence))  # True`,
        explanation: 'Virtual subclass registration allows third-party classes to satisfy isinstance checks without direct inheritance.',
      },
    ],
    quizQuestions: [
      {
        id: 'py-41-q1',
        question: 'What happens when you try to instantiate a class that inherits from ABC but has unimplemented @abstractmethod methods?',
        options: [
          'Instantiates successfully with None returned for the methods',
          'TypeError: Can\'t instantiate abstract class with abstract method',
          'AttributeError: missing method',
          'SyntaxError',
        ],
        correctOptionIndex: 1,
        explanation: 'CPython raises a TypeError preventing direct instantiation of any class with unimplemented abstract methods.',
      },
      {
        id: 'py-41-q2',
        question: 'What is the correct decorator stacking order for an abstract property?',
        options: [
          '@abstractmethod then @property',
          '@property then @abstractmethod',
          '@abstractproperty (deprecated, use @property + @abstractmethod)',
          'Either order works identically',
        ],
        correctOptionIndex: 1,
        explanation: '@property must wrap @abstractmethod (i.e. @property on top, @abstractmethod beneath it).',
      },
    ],
    revisionNotes: [
      'Inherit from abc.ABC to create abstract classes.',
      'Decorate required methods with @abstractmethod.',
      'Abstract classes cannot be instantiated directly.',
    ],
  },
  {
    id: 'py-42-composition-vs-inheritance',
    moduleId: 'py-m4',
    moduleNumber: 4,
    moduleTitle: 'Object-Oriented Programming',
    topicNumber: 42,
    title: 'Composition vs Inheritance ("has-a" vs "is-a")',
    language: 'python',
    level: 'Intermediate',
    whyItMatters:
      'The foundational design principle in software architecture states: "Favor object composition over class inheritance". Over-inheritance creates fragile, rigid class hierarchies, while composition allows dynamic, decoupled systems.',
    explanation:
      '**Inheritance ("is-a")**: A Car is-a Vehicle. The subclass is tightly coupled to the parent class implementation.\n**Composition ("has-a")**: A Car has-an Engine. A Car has-a Transmission. Instead of inheriting from Engine, the Car class holds an instance of Engine as an attribute and delegates tasks to it.\nComposition enables swapping engines (e.g. ElectricEngine vs GasEngine) at runtime without altering the Car class hierarchy.',
    syntaxAndStructure:
      '# COMPOSITION (Favor this!):\nclass Engine:\n    def start(self):\n        return "Vroom"\n\nclass Car:\n    def __init__(self, engine: Engine):\n        self.engine = engine # "has-a" Engine\n\n    def drive(self):\n        return self.engine.start()',
    codeExamples: [
      {
        title: 'Refactoring Fragile Inheritance to Flexible Composition',
        code: `class GasEngine:
    def ignite(self) -> str:
        return "Internal combustion engine ignited!"

class ElectricMotor:
    def ignite(self) -> str:
        return "Battery inverter activated silently!"

class Vehicle:
    def __init__(self, model: str, engine):
        self.model = model
        self.engine = engine # Composition: "has-a" engine

    def start(self):
        print(f"Starting {self.model}: {self.engine.ignite()}")

# Swapping engines dynamically at runtime:
sedan = Vehicle("Sedan 2026", GasEngine())
sedan.start()

ev = Vehicle("CyberCar", ElectricMotor())
ev.start()`,
        expectedOutput: `Starting Sedan 2026: Internal combustion engine ignited!
Starting CyberCar: Battery inverter activated silently!`,
        explanation: 'Composition allows swapping engine implementations dynamically without creating complex multi-tier class hierarchies.',
      },
      {
        title: 'Composing Logger and Database into a Service',
        code: `class Logger:
    def log(self, msg: str):
        print(f"[AUDIT] {msg}")

class Database:
    def insert(self, record: dict):
        print(f"[DB] Inserted: {record}")

class UserService:
    def __init__(self, db: Database, logger: Logger):
        # Service has-a database and has-a logger
        self.db = db
        self.logger = logger

    def register_user(self, name: str):
        self.logger.log(f"Registering user {name}")
        self.db.insert({"name": name, "status": "active"})

service = UserService(Database(), Logger())
service.register_user("Aarav")`,
        expectedOutput: `[AUDIT] Registering user Aarav
[DB] Inserted: {'name': 'Aarav', 'status': 'active'}`,
        explanation: 'Dependency injection via composition makes classes decoupled, modular, and easy to unit test.',
      },
    ],
    realWorldApplications: [
      'Dependency injection in frameworks like FastAPI and Flask.',
      'Component-based architectures (e.g. UI components containing state stores).',
    ],
    commonMistakes: [
      'Using inheritance just to reuse a single helper method; use composition instead.',
      'Creating deeply nested inheritance trees (e.g. 5+ levels deep), creating rigid coupling.',
    ],
    interviewRelevance:
      'Crucial system design and OOP interview topic: "When do you choose composition over inheritance?".',
    checkpoints: [
      { id: 'py-42-cp-1', label: 'Use inheritance for strict "is-a" relationships.' },
      { id: 'py-42-cp-2', label: 'Use composition for "has-a" components and flexible runtime swapping.' },
    ],
    practiceExercises: [
      {
        id: 'py-42-ex-1',
        title: 'Compose Computer from Components',
        difficulty: 'Beginner',
        type: 'coding',
        prompt: 'Build a `Computer` class composed of `CPU` and `RAM` objects, with a `spec()` method.',
        starterCode: 'class CPU: pass\nclass RAM: pass\nclass Computer: pass',
        solution: `class CPU:
    def __init__(self, cores: int): self.cores = cores
class RAM:
    def __init__(self, gb: int): self.gb = gb

class Computer:
    def __init__(self, cpu: CPU, ram: RAM):
        self.cpu = cpu
        self.ram = ram
    def specs(self) -> str:
        return f"System: {self.cpu.cores} Cores, {self.ram.gb} GB RAM"

pc = Computer(CPU(8), RAM(32))
print(pc.specs())`,
        explanation: 'Computer has-a CPU and has-a RAM.',
      },
      {
        id: 'py-42-ex-2',
        title: 'Strategy Pattern via Composition',
        difficulty: 'Intermediate',
        type: 'coding',
        prompt: 'Implement a `TextEditor` that takes a `Formatter` strategy (MarkdownFormatter or HTMLFormatter).',
        starterCode: '# Strategy pattern text editor',
        solution: `class MarkdownFormatter:
    def format(self, text: str) -> str: return f"**{text}**"

class HTMLFormatter:
    def format(self, text: str) -> str: return f"<b>{text}</b>"

class TextEditor:
    def __init__(self, formatter):
        self.formatter = formatter
    def publish(self, text: str) -> str:
        return self.formatter.format(text)

md_editor = TextEditor(MarkdownFormatter())
html_editor = TextEditor(HTMLFormatter())
print(md_editor.publish("Bold Text"))
print(html_editor.publish("Bold Text"))`,
        explanation: 'Strategy pattern implemented via composition allows changing formatting algorithms dynamically.',
      },
      {
        id: 'py-42-ex-3',
        title: 'Delegation Pattern Implementation',
        difficulty: 'Advanced',
        type: 'coding',
        prompt: 'Implement delegation using `__getattr__` so `Window` delegates unhandled method calls to its internal `Bounds` object.',
        starterCode: 'class Bounds: pass\nclass Window: pass',
        solution: `class Bounds:
    def get_width(self): return 1920
    def get_height(self): return 1080

class Window:
    def __init__(self):
        self.bounds = Bounds()
    def __getattr__(self, name):
        # Delegates attribute lookup to bounds
        return getattr(self.bounds, name)

w = Window()
print(f"Window: {w.get_width()}x{w.get_height()}")  # Auto-delegated to bounds!`,
        explanation: '__getattr__ enables automatic proxy delegation in Python.',
      },
    ],
    quizQuestions: [
      {
        id: 'py-42-q1',
        question: 'Which relationship characterizes composition in OOP?',
        options: ['is-a', 'has-a', 'can-do', 'inherits-from'],
        correctOptionIndex: 1,
        explanation: 'Composition models a "has-a" relationship where a class contains references to other independent objects.',
      },
      {
        id: 'py-42-q2',
        question: 'Why does the Gang of Four (GoF) recommend favoring composition over inheritance?',
        options: [
          'Inheritance is not supported in modern languages',
          'Composition reduces coupling, avoids rigid class hierarchies, and allows changing behavior at runtime',
          'Composition runs faster in CPU hardware',
          'Inheritance cannot use methods',
        ],
        correctOptionIndex: 1,
        explanation: 'Composition provides greater flexibility, avoids fragile base class issues, and allows dynamic swapping of dependencies at runtime.',
      },
    ],
    revisionNotes: [
      'Inheritance models "is-a"; composition models "has-a".',
      'Favor composition over inheritance to prevent brittle hierarchies.',
      'Composition enables runtime behavior swapping and easy unit testing.',
    ],
  },
  {
    id: 'py-43-magic-dunder-methods',
    moduleId: 'py-m4',
    moduleNumber: 4,
    moduleTitle: 'Object-Oriented Programming',
    topicNumber: 43,
    title: 'Magic / Dunder Methods & Operator Overloading',
    language: 'python',
    level: 'Advanced',
    whyItMatters:
      'Dunder (Double Underscore) methods allow custom classes to integrate natively with Python language syntax (like `len()`, `+`, `==`, `[]`, `in`, and `str()`). Mastering them allows building intuitive, Pythonic data structures.',
    explanation:
      'Dunder methods are special hook methods with leading and trailing double underscores invoked implicitly by Python operators and built-in functions:\n- String representation: `__str__` (user-friendly for print) and `__repr__` (unambiguous developer inspection).\n- Equality and comparison: `__eq__` (==), `__lt__` (<), `__gt__` (>).\n- Sequence protocols: `__len__` (len(obj)), `__getitem__` (obj[key]), `__setitem__` (obj[key] = val), `__contains__` (x in obj).\n- Arithmetic operators: `__add__` (+), `__sub__` (-), `__mul__` (*).\n- Callable objects: `__call__` (allows instance to be called like a function `obj()`).',
    syntaxAndStructure:
      'class Vector:\n    def __init__(self, x, y):\n        self.x, self.y = x, y\n    def __add__(self, other):\n        return Vector(self.x + other.x, self.y + other.y)\n    def __repr__(self):\n        return f"Vector({self.x}, {self.y})"\n    def __len__(self):\n        return int((self.x**2 + self.y**2)**0.5)',
    codeExamples: [
      {
        title: 'Custom Vector Class with Operator Overloading',
        code: `class Vector2D:
    def __init__(self, x: float, y: float):
        self.x = x
        self.y = y

    # __str__: User-friendly string
    def __str__(self) -> str:
        return f"({self.x}, {self.y})"

    # __repr__: Unambiguous code representation
    def __repr__(self) -> str:
        return f"Vector2D(x={self.x}, y={self.y})"

    # __add__: Vector addition (+)
    def __add__(self, other: "Vector2D") -> "Vector2D":
        if not isinstance(other, Vector2D):
            return NotImplemented
        return Vector2D(self.x + other.x, self.y + other.y)

    # __eq__: Value equality (==)
    def __eq__(self, other: object) -> bool:
        if not isinstance(other, Vector2D):
            return False
        return self.x == other.x and self.y == other.y

v1 = Vector2D(3, 4)
v2 = Vector2D(1, 2)
v3 = v1 + v2 # Calls v1.__add__(v2)

print("v3 str:", v3)
print("v3 repr:", repr(v3))
print("v1 == Vector2D(3, 4):", v1 == Vector2D(3, 4))`,
        expectedOutput: `v3 str: (4, 6)
v3 repr: Vector2D(x=4, y=6)
v1 == Vector2D(3, 4): True`,
        explanation: '+ operator invokes __add__; == invokes __eq__; print() invokes __str__; repr() invokes __repr__.',
      },
      {
        title: 'Custom Collection Emulation with __len__ and __getitem__',
        code: `class CardDeck:
    ranks = [str(n) for n in range(2, 11)] + list("JQKA")
    suits = ["spades", "diamonds", "clubs", "hearts"]

    def __init__(self):
        self._cards = [(rank, suit) for suit in self.suits for rank in self.ranks]

    def __len__(self) -> int:
        return len(self._cards)

    def __getitem__(self, position: int):
        return self._cards[position]

deck = CardDeck()
print("Deck length (len(deck)):", len(deck))
print("First card (deck[0]):", deck[0])
print("Last card (deck[-1]):", deck[-1])
print("Slice of cards (deck[:3]):", deck[:3])
print("Is ('A', 'spades') in deck?", ("A", "spades") in deck)`,
        expectedOutput: `Deck length (len(deck)): 52
First card (deck[0]): ('2', 'spades')
Last card (deck[-1]): ('A', 'hearts')
Slice of cards (deck[:3]): [('2', 'spades'), ('3', 'spades'), ('4', 'spades')]
Is ('A', 'spades') in deck? True`,
        explanation: 'By implementing only __len__ and __getitem__, the class automatically supports slicing, indexing, iteration, and the in membership check!',
      },
    ],
    realWorldApplications: [
      'Building scientific computation libraries (NumPy arrays, PyTorch tensors).',
      'Custom collections, ORMs (SQLAlchemy query expressions), and domain-specific modeling.',
    ],
    commonMistakes: [
      'Confusing `__str__` (for end users) with `__repr__` (for developers / debugging). If only one is implemented, implement `__repr__`.',
      'Forgetting to return `NotImplemented` from arithmetic dunder methods when `other` is an unsupported type.',
    ],
    interviewRelevance:
      'Universal senior and fresher question: "What is the difference between __str__ and __repr__ in Python?" and "How do you make an object callable or subscriptable?".',
    checkpoints: [
      { id: 'py-43-cp-1', label: '__str__ is for end-users; __repr__ is unambiguous for developers.' },
      { id: 'py-43-cp-2', label: 'Implement __len__ and __getitem__ to make objects subscriptable and iterable.' },
    ],
    practiceExercises: [
      {
        id: 'py-43-ex-1',
        title: 'Implement Callable Class with __call__',
        difficulty: 'Beginner',
        type: 'coding',
        prompt: 'Create a `Multiplier(factor)` class implementing `__call__(x)` so instances can be called like functions: `double = Multiplier(2); double(5) -> 10`.',
        starterCode: 'class Multiplier:\n    pass',
        solution: `class Multiplier:
    def __init__(self, factor: float):
        self.factor = factor
    def __call__(self, x: float) -> float:
        return self.factor * x

triple = Multiplier(3)
print("triple(10):", triple(10))  # 30`,
        explanation: '__call__ makes an instance callable like a standard function.',
      },
      {
        id: 'py-43-ex-2',
        title: 'Case-Insensitive String Key Dict Wrapper',
        difficulty: 'Intermediate',
        type: 'coding',
        prompt: 'Create `CaseInsensitiveDict` implementing `__getitem__`, `__setitem__`, and `__contains__` converting all string keys to lowercase.',
        starterCode: 'class CaseInsensitiveDict:\n    pass',
        solution: `class CaseInsensitiveDict:
    def __init__(self):
        self._data = {}
    def __setitem__(self, key: str, value):
        self._data[key.lower()] = value
    def __getitem__(self, key: str):
        return self._data[key.lower()]
    def __contains__(self, key: str) -> bool:
        return key.lower() in self._data

d = CaseInsensitiveDict()
d["Host"] = "localhost"
print(d["host"])       # localhost
print("HOST" in d)     # True`,
        explanation: 'Overrides dictionary subscript operators for case-normalized lookups.',
      },
      {
        id: 'py-43-ex-3',
        title: 'Ordering with functools.total_ordering',
        difficulty: 'Advanced',
        type: 'coding',
        prompt: 'Create a `Student(name, gpa)` class implementing `__eq__` and `__lt__`, and decorate with `@functools.total_ordering` to get all comparisons (<, <=, >, >=).',
        starterCode: 'from functools import total_ordering\n@total_ordering\nclass Student:\n    pass',
        solution: `from functools import total_ordering

@total_ordering
class Student:
    def __init__(self, name: str, gpa: float):
        self.name = name
        self.gpa = gpa
    def __eq__(self, other):
        return isinstance(other, Student) and self.gpa == other.gpa
    def __lt__(self, other):
        return isinstance(other, Student) and self.gpa < other.gpa

s1 = Student("Aarav", 3.8)
s2 = Student("Diya", 3.9)
print("s1 < s2:", s1 < s2)   # True
print("s1 <= s2:", s1 <= s2) # True (auto-generated by total_ordering)
print("s1 > s2:", s1 > s2)   # False`,
        explanation: '@total_ordering generates all comparison operators from __eq__ and __lt__.',
      },
    ],
    quizQuestions: [
      {
        id: 'py-43-q1',
        question: 'What is the primary difference between __str__ and __repr__?',
        options: [
          '__str__ is for end-user readable output; __repr__ is unambiguous developer output that should ideally resemble valid Python code',
          '__repr__ only works on numbers',
          '__str__ cannot be overridden',
          'There is no difference',
        ],
        correctOptionIndex: 0,
        explanation: '__str__ is aimed at end users (human readable), while __repr__ is aimed at developers (unambiguous, should resemble code).',
      },
      {
        id: 'py-43-q2',
        question: 'Which dunder method allows an object instance to be called directly with parentheses like a function: obj()?',
        options: ['__run__', '__invoke__', '__call__', '__execute__'],
        correctOptionIndex: 2,
        explanation: '__call__ allows class instances to act like callables/functions.',
      },
    ],
    revisionNotes: [
      '__str__ is human-readable; __repr__ is unambiguous code representation.',
      'Operator overloading: __add__ (+), __eq__ (==), __lt__ (<).',
      'Sequence emulation: __len__ and __getitem__ provide slicing and iteration.',
    ],
  },
];

export const module4: MasteryModule = {
  id: 'py-m4',
  number: 4,
  title: 'Object-Oriented Programming',
  description: 'Classes, constructors, instance vs class variables, methods, encapsulation, inheritance, MRO, polymorphism, abstraction, composition, and dunder methods.',
  language: 'python',
  topics: module4Topics,
  moduleAssessment: {
    id: 'py-m4-exam',
    title: 'Python OOP Milestone Assessment',
    passingScorePercentage: 70,
    questions: module4Topics.flatMap((t) => t.quizQuestions),
  },
  revisionQuestions: [
    'Explain the role of self and why it is explicitly passed in Python instance methods.',
    'What is the difference between __new__ and __init__?',
    'Why is declaring a mutable list as a class variable dangerous?',
    'Differentiate @classmethod from @staticmethod with real-world examples.',
    'Explain the Diamond Problem in multiple inheritance and how C3 Linearization resolves it.',
  ],
};
