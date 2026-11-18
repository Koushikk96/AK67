import { TestQuestion } from '@/types/mockTest';

export const cppMCQs: TestQuestion[] = [
  {
    id: 'tech-cpp-01',
    question: 'In C++, what is the size of an empty class object instantiated with `sizeof(EmptyClass)`?',
    options: ['0 bytes', '1 byte', '4 bytes', 'Depends on compiler word size'],
    correctOptionIndex: 1,
    explanation:
      'In C++, an empty class has a size of 1 byte so that two distinct objects of the class have distinct memory addresses.',
    category: 'technical',
    subject: 'C++',
    difficulty: 'Easy',
  },
  {
    id: 'tech-cpp-02',
    question: 'What happens if a base class destructor is not declared virtual when deleting a derived object via a base pointer?',
    options: [
      'Compile-time error occurs',
      'Undefined behavior and derived class destructor is not called, leading to memory leaks',
      'Both base and derived destructors are called automatically',
      'The program aborts immediately with a segmentation fault',
    ],
    correctOptionIndex: 1,
    explanation:
      'Without a virtual destructor in the base class, calling `delete basePtr` only invokes the base destructor, leaking resources allocated by the derived class.',
    category: 'technical',
    subject: 'C++',
    difficulty: 'Medium',
  },
  {
    id: 'tech-cpp-03',
    question: 'Which of the following operations in `std::vector` has O(1) amortized time complexity?',
    options: ['`insert` at index 0', '`push_back` at the end', '`erase` at index 0', '`find` an arbitrary element'],
    correctOptionIndex: 1,
    explanation:
      '`std::vector::push_back` is amortized O(1) because reallocation happens geometrically (usually doubling capacity) rather than on every insertion.',
    category: 'technical',
    subject: 'C++',
    difficulty: 'Easy',
  },
  {
    id: 'tech-cpp-04',
    question: 'What is the key difference between `std::map` and `std::unordered_map` in C++ STL?',
    options: [
      '`std::map` uses a hash table with O(1) lookup, while `unordered_map` uses a Red-Black tree with O(log n)',
      '`std::map` uses a self-balancing Red-Black tree with O(log n) lookup and sorted keys; `std::unordered_map` uses a hash table with O(1) average lookup',
      '`std::map` allows duplicate keys while `std::unordered_map` does not',
      '`std::unordered_map` consumes less memory in all scenarios',
    ],
    correctOptionIndex: 1,
    explanation:
      '`std::map` is ordered and implemented as a self-balancing binary search tree (Red-Black tree) giving O(log n) guarantees. `std::unordered_map` uses hashing with O(1) average lookup.',
    category: 'technical',
    subject: 'C++',
    difficulty: 'Medium',
  },
  {
    id: 'tech-cpp-05',
    question: 'Which C++ smart pointer allows multiple owners for a single dynamically allocated resource?',
    options: ['`std::unique_ptr`', '`std::shared_ptr`', '`std::weak_ptr`', '`std::auto_ptr`'],
    correctOptionIndex: 1,
    explanation:
      '`std::shared_ptr` implements reference counting, allowing multiple pointers to co-own the resource until the last shared pointer goes out of scope.',
    category: 'technical',
    subject: 'C++',
    difficulty: 'Easy',
  },
  {
    id: 'tech-cpp-06',
    question: 'What is the purpose of `std::weak_ptr` in modern C++?',
    options: [
      'To replace raw pointers in high-performance loops',
      'To break cyclic reference dependencies between `std::shared_ptr` instances that prevent deallocation',
      'To provide faster read access than `std::unique_ptr`',
      'To transfer ownership without atomic synchronization',
    ],
    correctOptionIndex: 1,
    explanation:
      'Cyclic references of `shared_ptr` keep reference counts above zero, causing memory leaks. `std::weak_ptr` observes a `shared_ptr` without incrementing its reference count.',
    category: 'technical',
    subject: 'C++',
    difficulty: 'Medium',
  },
  {
    id: 'tech-cpp-07',
    question: 'What will `cout << (5 >> 1);` output in C++?',
    options: ['10', '2', '2.5', '1'],
    correctOptionIndex: 1,
    explanation:
      'The bitwise right shift operator `>>` shifts binary bits right. $5_{10} = 101_2$; shifting right by 1 gives $10_2 = 2_{10}$ (equivalent to integer division by 2).',
    category: 'technical',
    subject: 'C++',
    difficulty: 'Easy',
  },
  {
    id: 'tech-cpp-08',
    question: 'Which casting operator in C++ is performed strictly at compile-time and is the most commonly used for safe numeric conversions?',
    options: ['`dynamic_cast`', '`reinterpret_cast`', '`static_cast`', '`const_cast`'],
    correctOptionIndex: 2,
    explanation:
      '`static_cast` does compile-time type checking and is used for standard conversions (e.g. float to int, up-casting in inheritance hierarchies).',
    category: 'technical',
    subject: 'C++',
    difficulty: 'Medium',
  },
  {
    id: 'tech-cpp-09',
    question: 'What is a "dangling pointer" in C++?',
    options: [
      'A pointer initialized to `nullptr`',
      'A pointer pointing to a memory location that has been deleted or deallocated',
      'A pointer that cannot be dereferenced due to `const` qualification',
      'A pointer pointing to an array index that is out of bounds',
    ],
    correctOptionIndex: 1,
    explanation:
      'A dangling pointer points to memory that has already been freed. Accessing it invokes undefined behavior.',
    category: 'technical',
    subject: 'C++',
    difficulty: 'Easy',
  },
  {
    id: 'tech-cpp-10',
    question: 'What is the difference between a pointer and a reference in C++?',
    options: [
      'Pointers can be reassigned and can be null; references must be initialized upon declaration and cannot be null or reseated',
      'References consume more memory than pointers',
      'Pointers cannot be used as function arguments',
      'References require the explicit `*` operator to access values',
    ],
    correctOptionIndex: 0,
    explanation:
      'A reference is an alias to an existing object, cannot be null, and cannot be rebound to another object after initialization.',
    category: 'technical',
    subject: 'C++',
    difficulty: 'Easy',
  },
  {
    id: 'tech-cpp-11',
    question: 'What is the "vtable" (virtual method table) in C++?',
    options: [
      'A hash map stored on the heap to manage thread synchronization',
      'A static table of function pointers created by the compiler to support dynamic dispatch (runtime polymorphism)',
      'A template structure for tracking virtual memory allocations',
      'A debug symbol table used only in unoptimized builds',
    ],
    correctOptionIndex: 1,
    explanation:
      'Each class with virtual functions has a compiler-generated vtable holding addresses of virtual methods. Each instance stores a `vptr` pointing to this table.',
    category: 'technical',
    subject: 'C++',
    difficulty: 'Hard',
  },
  {
    id: 'tech-cpp-12',
    question: 'What happens when you pass a large object by value to a C++ function?',
    options: [
      'The compiler automatically converts it to a pointer',
      'A copy constructor is called, copying the entire object which can hurt performance',
      'The original object is destroyed',
      'A compile-time error occurs if the object exceeds 64 bytes',
    ],
    correctOptionIndex: 1,
    explanation:
      'Pass-by-value invokes the copy constructor to instantiate a duplicate on the call stack, costing extra time and memory.',
    category: 'technical',
    subject: 'C++',
    difficulty: 'Easy',
  },
  {
    id: 'tech-cpp-13',
    question: 'In C++, what does the `inline` keyword suggest to the compiler?',
    options: [
      'Force the function to execute on a separate thread',
      'Replace the function call with the actual function code to avoid call overhead',
      'Prevent recursive calls of the function',
      'Store local variables in CPU registers',
    ],
    correctOptionIndex: 1,
    explanation:
      '`inline` is a hint asking the compiler to expand the function body at the call site, eliminating call/return prologue and epilogue overhead.',
    category: 'technical',
    subject: 'C++',
    difficulty: 'Medium',
  },
  {
    id: 'tech-cpp-14',
    question: 'What is RAII (Resource Acquisition Is Initialization) in C++?',
    options: [
      'A design pattern where resources are bound to object lifetime; acquired in constructor and released in destructor',
      'A technique to initialize global static variables before `main` runs',
      'A database transaction idiom for two-phase commit',
      'A method for allocating heap arrays without `new`',
    ],
    correctOptionIndex: 0,
    explanation:
      'RAII ties resource management (memory, file handles, mutex locks) to object lifespan so destructors guarantee release even during exceptions.',
    category: 'technical',
    subject: 'C++',
    difficulty: 'Medium',
  },
  {
    id: 'tech-cpp-15',
    question: 'What does `const int * const ptr = &x;` mean in C++?',
    options: [
      'Neither the pointer address nor the value pointed to can be modified',
      'The pointer address can change, but the pointed value is constant',
      'The pointer address is constant, but the pointed value can be modified',
      'Invalid syntax in C++',
    ],
    correctOptionIndex: 0,
    explanation:
      'Reading from right to left: `ptr` is a `const` pointer (cannot point to another address) to a `const int` (cannot change the value through this pointer).',
    category: 'technical',
    subject: 'C++',
    difficulty: 'Medium',
  },
];

export const oopMCQs: TestQuestion[] = [
  {
    id: 'tech-oop-01',
    question: 'Which OOP principle is demonstrated by hiding internal implementation details and exposing only an interface through access specifiers?',
    options: ['Inheritance', 'Encapsulation', 'Polymorphism', 'Overriding'],
    correctOptionIndex: 1,
    explanation:
      'Encapsulation bundles data and methods together while restricting direct access using `private` or `protected` specifiers.',
    category: 'technical',
    subject: 'OOP',
    difficulty: 'Easy',
  },
  {
    id: 'tech-oop-02',
    question: 'What is runtime (dynamic) polymorphism in object-oriented programming?',
    options: [
      'Resolving method calls at compile time via function overloading',
      'Resolving which overridden method to call at runtime based on the actual object type',
      'Assigning multiple data types to a single template variable',
      'Instantiating classes dynamically using factory patterns',
    ],
    correctOptionIndex: 1,
    explanation:
      'Runtime polymorphism allows a base class pointer or reference to call an overridden derived class method determined at runtime via dynamic dispatch.',
    category: 'technical',
    subject: 'OOP',
    difficulty: 'Easy',
  },
  {
    id: 'tech-oop-03',
    question: 'What problem arises in multiple inheritance when a class inherits from two classes that both share a common base class?',
    options: ['The Starvation Problem', 'The Diamond Problem', 'The Deadlock Problem', 'The Liskov Paradox'],
    correctOptionIndex: 1,
    explanation:
      'The Diamond Problem causes ambiguity because the bottom class inherits two duplicate copies of the grandparent class. In C++, virtual inheritance (`virtual public Base`) solves this.',
    category: 'technical',
    subject: 'OOP',
    difficulty: 'Medium',
  },
  {
    id: 'tech-oop-04',
    question: 'What defines an Abstract Class in C++?',
    options: [
      'A class that contains no member variables',
      'A class with at least one pure virtual function (`virtual void func() = 0;`)',
      'A class that inherits from multiple base classes',
      'A class declared with the `abstract` keyword',
    ],
    correctOptionIndex: 1,
    explanation:
      'In C++, any class declaring or inheriting at least one pure virtual function without overriding it is an abstract class and cannot be instantiated.',
    category: 'technical',
    subject: 'OOP',
    difficulty: 'Easy',
  },
  {
    id: 'tech-oop-05',
    question: 'Which of the following is an example of compile-time polymorphism?',
    options: ['Virtual function overriding', 'Function overloading and operator overloading', 'Interface implementation', 'Dynamic casting'],
    correctOptionIndex: 1,
    explanation:
      'Function overloading and operator overloading are resolved by the compiler during compilation based on function signatures (early binding).',
    category: 'technical',
    subject: 'OOP',
    difficulty: 'Easy',
  },
  {
    id: 'tech-oop-06',
    question: 'What does the "L" in SOLID principles stand for?',
    options: ['Loop Invariant Principle', 'Liskov Substitution Principle', 'Linear Inheritance Principle', 'Lazy Loading Principle'],
    correctOptionIndex: 1,
    explanation:
      'Liskov Substitution Principle (LSP) states that objects of a superclass should be replaceable with objects of its subclasses without altering program correctness.',
    category: 'technical',
    subject: 'OOP',
    difficulty: 'Medium',
  },
  {
    id: 'tech-oop-07',
    question: 'What is the difference between Aggregation and Composition in OOP?',
    options: [
      'Composition represents a "has-a" relationship where child objects can exist independently; Aggregation destroys child objects with the parent',
      'Composition implies strong ownership where the child cannot exist without the parent; Aggregation implies weak ownership where children can exist independently',
      'Composition is implemented using templates; Aggregation is implemented using pointers',
      'There is no distinction in modern OOP',
    ],
    correctOptionIndex: 1,
    explanation:
      'In Composition (e.g. Car and Engine), lifetime of child depends strictly on parent. In Aggregation (e.g. Department and Professor), children can outlive the parent.',
    category: 'technical',
    subject: 'OOP',
    difficulty: 'Medium',
  },
  {
    id: 'tech-oop-08',
    question: 'What does the "Open/Closed Principle" (O in SOLID) dictate?',
    options: [
      'Classes should be open for extension, but closed for modification',
      'Files should be open for reading, but closed for writing',
      'Constructors should be open, but destructors closed',
      'APIs should be public (open) internally and private (closed) externally',
    ],
    correctOptionIndex: 0,
    explanation:
      'Software entities should be extensible via inheritance or interfaces without altering existing tested source code.',
    category: 'technical',
    subject: 'OOP',
    difficulty: 'Medium',
  },
  {
    id: 'tech-oop-09',
    question: 'What is a copy constructor in C++?',
    options: [
      'A constructor that assigns pointers to NULL',
      'A constructor that initializes a new object using an existing object of the same class',
      'A function that deep-copies files on disk',
      'A constructor that converts primitive types to objects',
    ],
    correctOptionIndex: 1,
    explanation:
      'A copy constructor has the signature `ClassName(const ClassName &other)` and copies member values from an existing instance.',
    category: 'technical',
    subject: 'OOP',
    difficulty: 'Easy',
  },
  {
    id: 'tech-oop-10',
    question: 'What is the danger of a shallow copy when an object owns dynamic heap memory?',
    options: [
      'Memory allocations are automatically doubled',
      'Both copies point to the same heap address, causing a double-free error when both destructors run',
      'The copy operation fails to compile',
      'The CPU switches into kernel mode',
    ],
    correctOptionIndex: 1,
    explanation:
      'A shallow copy only copies pointer addresses. When both instances are destroyed, both destructors attempt to `delete` the same address, resulting in undefined behavior.',
    category: 'technical',
    subject: 'OOP',
    difficulty: 'Medium',
  },
  {
    id: 'tech-oop-11',
    question: 'What does High Cohesion and Low Coupling mean in software design?',
    options: [
      'Classes should perform many unrelated jobs and have deep interdependencies',
      'Each module should have a single focused responsibility (high cohesion) with minimal dependencies on other modules (low coupling)',
      'Modules should share identical global state',
      'All methods should be public with no private helper methods',
    ],
    correctOptionIndex: 1,
    explanation:
      'High cohesion ensures classes are focused and maintainable; low coupling reduces ripple effects when modifying code.',
    category: 'technical',
    subject: 'OOP',
    difficulty: 'Medium',
  },
  {
    id: 'tech-oop-12',
    question: 'Can constructor functions be declared virtual in C++?',
    options: [
      'Yes, to allow dynamic construction of derived objects',
      'No, because an object must be constructed before its virtual table (vtable) can be consulted',
      'Yes, but only in abstract classes',
      'Only if the destructor is also virtual',
    ],
    correctOptionIndex: 1,
    explanation:
      'A constructor cannot be virtual because virtual dispatch requires a valid `vptr`, which is only set up during object construction.',
    category: 'technical',
    subject: 'OOP',
    difficulty: 'Medium',
  },
  {
    id: 'tech-oop-13',
    question: 'Which access specifier allows members to be accessed by derived classes but keeps them hidden from external code?',
    options: ['`private`', '`protected`', '`public`', '`internal`'],
    correctOptionIndex: 1,
    explanation:
      '`protected` members are accessible within the declaring class and all its subclasses, but inaccessible to unrelated classes or functions.',
    category: 'technical',
    subject: 'OOP',
    difficulty: 'Easy',
  },
  {
    id: 'tech-oop-14',
    question: 'What is method overriding in OOP?',
    options: [
      'Declaring multiple methods with the same name and different parameters in the same class',
      'Providing a specific implementation in a derived class for a method already defined in its base class',
      'Calling private methods through friend functions',
      'Deleting methods from a base class',
    ],
    correctOptionIndex: 1,
    explanation:
      'Overriding redefines a base class virtual method in a derived class with the exact same signature and return type.',
    category: 'technical',
    subject: 'OOP',
    difficulty: 'Easy',
  },
  {
    id: 'tech-oop-15',
    question: 'What is the "Dependency Inversion Principle" (D in SOLID)?',
    options: [
      'High-level modules should not depend on low-level modules; both should depend on abstractions',
      'Derivations must reverse inheritances in base classes',
      'Dependencies must be resolved at runtime using reflection',
      'Classes must not import more than 5 external libraries',
    ],
    correctOptionIndex: 0,
    explanation:
      'High-level business logic should depend on abstract interfaces rather than concrete low-level implementations, decoupling system components.',
    category: 'technical',
    subject: 'OOP',
    difficulty: 'Hard',
  },
];
