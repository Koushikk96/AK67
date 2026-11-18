import { TechnicalInterviewQuestion, InterviewSubject } from '@/types/interview';

export const technicalInterviewQuestions: TechnicalInterviewQuestion[] = [
  // ================= C++ (12 Questions) =================
  {
    id: 'tech-int-cpp-01',
    subject: 'C++',
    question: 'What is the difference between a pointer and a reference in C++?',
    answer:
      'A pointer is a variable holding a memory address; it can be reassigned, set to NULL/nullptr, and supports pointer arithmetic. A reference is an alias to an existing variable; it must be initialized when created, cannot be NULL, and cannot be reseated to refer to another object.',
    explanation:
      'Under the hood, compilers often implement references as constant pointers with automatic dereferencing (`Type* const`).',
    codeSnippet: 'int a = 10, b = 20;\nint* ptr = &a; // Pointer: can reassign\nptr = &b;\nint& ref = a;  // Reference: permanently binds to a',
    followUpQuestions: [
      'Can you create an array of references in C++?',
      'When should you prefer passing by `const&` over passing by pointer?',
    ],
    difficulty: 'Easy',
    tags: ['Pointers', 'References', 'Memory'],
  },
  {
    id: 'tech-int-cpp-02',
    subject: 'C++',
    question: 'Why should a base class destructor always be declared virtual?',
    answer:
      'If a base class destructor is not virtual and an object of a derived class is deleted through a base class pointer (`delete basePtr`), only the base class destructor will be invoked. The derived class destructor will not run, causing resource and memory leaks for any resources allocated by the derived object.',
    explanation:
      'Declaring the base destructor `virtual` ensures the destructor call is resolved dynamically via the virtual table (`vtable`), calling the derived destructor first, followed by the base destructor.',
    codeSnippet: 'class Base {\npublic:\n  virtual ~Base() { cout << "~Base"; }\n};\nclass Derived : public Base {\npublic:\n  ~Derived() override { cout << "~Derived"; }\n};',
    followUpQuestions: [
      'Can a constructor be declared virtual?',
      'Does declaring a virtual destructor add memory overhead to an object?',
    ],
    difficulty: 'Medium',
    tags: ['Destructors', 'Polymorphism', 'Memory Leaks'],
  },
  {
    id: 'tech-int-cpp-03',
    subject: 'C++',
    question: 'Explain the internal memory layout of a C++ program.',
    answer:
      'A C++ program in memory is divided into five segments: 1. Text/Code Segment (compiled machine instructions, read-only); 2. Initialized Data Segment (`.data`, initialized globals & statics); 3. Uninitialized Data Segment (`.bss`, zero-initialized globals & statics); 4. Heap (dynamically allocated memory via `new`/`malloc`, grows upward); 5. Stack (local variables, function call frames, parameters, grows downward).',
    explanation:
      'Stack allocation is fast (simple stack pointer movement), whereas Heap allocation involves heap metadata management and potential fragmentation.',
    followUpQuestions: [
      'What is a stack overflow and what commonly causes it?',
      'How does memory fragmentation happen on the heap?',
    ],
    difficulty: 'Medium',
    tags: ['Memory Layout', 'Stack vs Heap'],
  },
  {
    id: 'tech-int-cpp-04',
    subject: 'C++',
    question: 'What is the purpose of the `const` keyword when applied to member functions?',
    answer:
      'A `const` member function guarantees that it will not modify any non-static member variables of the calling object (unless marked `mutable`). It allows the function to be called on `const` instances of the class.',
    codeSnippet: 'class Account {\n  double balance;\npublic:\n  double getBalance() const { return balance; } // Read-only\n};',
    followUpQuestions: [
      'What is the purpose of the `mutable` keyword in C++?',
      'Can a `const` member function overload a non-const member function?',
    ],
    difficulty: 'Easy',
    tags: ['const', 'Encapsulation'],
  },
  {
    id: 'tech-int-cpp-05',
    subject: 'C++',
    question: 'What is the difference between `std::unique_ptr` and `std::shared_ptr`?',
    answer:
      '`std::unique_ptr` provides exclusive ownership of a dynamic object; it cannot be copied, only moved (`std::move`), incurring zero runtime memory overhead over a raw pointer. `std::shared_ptr` provides shared ownership via reference counting; the resource is destroyed when the last `shared_ptr` pointing to it is destroyed or reset.',
    explanation:
      '`shared_ptr` maintains a dynamic control block on the heap holding the reference count and weak count, which makes it slightly heavier than `unique_ptr`.',
    followUpQuestions: [
      'How do you prevent cyclic reference memory leaks with `std::shared_ptr`?',
      'Why is `std::make_unique` preferred over raw `new`?',
    ],
    difficulty: 'Medium',
    tags: ['Smart Pointers', 'RAII'],
  },
  {
    id: 'tech-int-cpp-06',
    subject: 'C++',
    question: 'What is RAII and why is it considered the golden idiom of C++?',
    answer:
      'RAII stands for Resource Acquisition Is Initialization. It binds resource life cycles (heap memory, mutexes, file descriptors, socket connections) to object lifetimes. The resource is acquired in the constructor and automatically released in the destructor when the object goes out of scope, guaranteeing no resource leaks even during stack unwinding caused by exceptions.',
    codeSnippet: 'void processFile() {\n  std::ifstream file("data.txt"); // acquired\n  // if an exception is thrown here, file destructor still closes handle!\n}',
    followUpQuestions: [
      'How does `std::lock_guard` demonstrate the RAII idiom?',
      'Can an exception safely be thrown from a destructor?',
    ],
    difficulty: 'Medium',
    tags: ['RAII', 'Exception Safety'],
  },
  {
    id: 'tech-int-cpp-07',
    subject: 'C++',
    question: 'What is the Rule of Three / Rule of Five in C++?',
    answer:
      'The Rule of Three states that if a class defines a custom Destructor, Copy Constructor, or Copy Assignment Operator, it almost certainly needs all three (to correctly manage deep copy of resources). In C++11, move semantics expanded this to the Rule of Five, adding Move Constructor and Move Assignment Operator for optimal performance.',
    followUpQuestions: [
      'What is the "Rule of Zero"?',
      'What is the difference between deep copy and shallow copy?',
    ],
    difficulty: 'Hard',
    tags: ['Copy Semantics', 'Move Semantics', 'Rule of Five'],
  },
  {
    id: 'tech-int-cpp-08',
    subject: 'C++',
    question: 'What is a memory leak and how do you detect and fix it in C++?',
    answer:
      'A memory leak occurs when dynamically allocated heap memory (`new` / `malloc`) is no longer needed but is not released via `delete` / `free`. Over time, leaks exhaust available memory, degrading performance and causing crashes. It is fixed by adhering to RAII and smart pointers (`std::unique_ptr`), and detected using tools like Valgrind, AddressSanitizer (ASan), or Visual Studio Diagnostic Tools.',
    followUpQuestions: [
      'How does AddressSanitizer work at compile time?',
      'What is an out-of-memory (OOM) killer in Linux?',
    ],
    difficulty: 'Easy',
    tags: ['Memory Leak', 'Debugging', 'Sanitizers'],
  },
  {
    id: 'tech-int-cpp-09',
    subject: 'C++',
    question: 'What does the `static` keyword do in C++ in different contexts?',
    answer:
      '1. Inside a function: A static local variable retains its value across function calls, initialized only once. 2. Inside a class: Static member variables and methods belong to the class itself rather than any individual instance. 3. At file/global scope: A static variable or function has internal linkage, making it invisible outside its translation unit.',
    followUpQuestions: [
      'Can a static member function access non-static class member variables?',
      'Can a static function be declared virtual?',
    ],
    difficulty: 'Medium',
    tags: ['static', 'Scope', 'Linkage'],
  },
  {
    id: 'tech-int-cpp-10',
    subject: 'C++',
    question: 'Explain Move Semantics and `std::move` in C++11.',
    answer:
      'Move semantics allows resources (such as heap memory buffers in `std::vector` or `std::string`) to be transferred directly from temporary (rvalue) objects to new objects rather than performing expensive deep copies. `std::move` does not move anything itself; it is an unconditional cast that converts an lvalue expression into an rvalue reference (`Type&&`), enabling the move constructor or move assignment operator.',
    codeSnippet: 'std::vector<int> v1 = {1, 2, 3};\nstd::vector<int> v2 = std::move(v1); // v2 steals v1\'s buffer; v1 is left empty',
    followUpQuestions: [
      'What is an rvalue reference (`&&`)?',
      'What state is an object left in after being moved from?',
    ],
    difficulty: 'Hard',
    tags: ['Move Semantics', 'rvalue', 'Optimization'],
  },
  {
    id: 'tech-int-cpp-11',
    subject: 'C++',
    question: 'What is name mangling in C++ and how does `extern "C"` help?',
    answer:
      'To support function overloading, C++ compilers mangle (encode) function names by appending parameter types into the symbol name. Because C does not support overloading, C compilers do not mangle names. `extern "C"` instructs the C++ compiler to use C linkage (no mangling) for specified declarations, enabling C++ programs to link with C libraries.',
    followUpQuestions: [
      'Why does `main()` not get mangled in C++?',
      'How does ABI (Application Binary Interface) compatibility relate to mangling?',
    ],
    difficulty: 'Hard',
    tags: ['Compilers', 'Linkage', 'extern C'],
  },
  {
    id: 'tech-int-cpp-12',
    subject: 'C++',
    question: 'What is the difference between prefix `++i` and postfix `i++` in C++?',
    answer:
      'Prefix `++i` increments the variable first and returns a reference to the updated variable (`int&`). Postfix `i++` creates a temporary copy of the original value, increments the original variable, and returns the temporary copy by value. For complex iterator types, prefix `++i` is preferred because it avoids creating unnecessary temporary copies.',
    followUpQuestions: [
      'How do you distinguish operator overloading for prefix vs postfix ++ in a class?',
    ],
    difficulty: 'Easy',
    tags: ['Operators', 'Efficiency'],
  },

  // ================= OOP (10 Questions) =================
  {
    id: 'tech-int-oop-01',
    subject: 'OOP',
    question: 'What are the four core pillars of Object-Oriented Programming? Give real-world analogies.',
    answer:
      '1. Encapsulation: Bundling data and methods into a single unit and hiding internal state (e.g. A medical capsule hiding chemical compounds). 2. Abstraction: Showing only essential features while hiding complex mechanics (e.g. Driving a car by pressing the accelerator without knowing cylinder fuel injection). 3. Inheritance: Reusing and extending existing class behaviors (e.g. A Smartphone inheriting features from basic Telephone). 4. Polymorphism: Same interface performing different behaviors depending on object type (e.g. A "Speak" command causing a Dog to bark and a Cat to meow).',
    followUpQuestions: [
      'How does abstraction differ from encapsulation?',
      'Why is composition often favored over deep inheritance hierarchies?',
    ],
    difficulty: 'Easy',
    tags: ['Core Pillars', 'Basics'],
  },
  {
    id: 'tech-int-oop-02',
    subject: 'OOP',
    question: 'What is the Diamond Problem in multiple inheritance and how is it resolved?',
    answer:
      'The Diamond Problem happens when a derived class $D$ inherits from two classes $B$ and $C$, which both inherit from a common base class $A$. Class $D$ ends up with two separate copies of $A$’s member variables, leading to ambiguity and compile errors when accessing $A$’s members. In C++, it is solved using Virtual Inheritance (`class B : virtual public A`), ensuring only one shared instance of $A$ exists in $D$.',
    codeSnippet: 'class A { public: int x; };\nclass B : virtual public A {};\nclass C : virtual public A {};\nclass D : public B, public C {}; // D has exactly one copy of x',
    followUpQuestions: [
      'How does Java address the Diamond Problem?',
      'Who is responsible for initializing the virtual base class constructor in C++?',
    ],
    difficulty: 'Medium',
    tags: ['Inheritance', 'Diamond Problem', 'Virtual Base'],
  },
  {
    id: 'tech-int-oop-03',
    subject: 'OOP',
    question: 'What is the difference between an Abstract Class and an Interface?',
    answer:
      'An Abstract Class can have member variables, constructors, and both concrete (implemented) and pure virtual methods. It represents an "is-a" identity relationship. An Interface contains only pure abstract method declarations (no data state, only method contracts) and represents a capability ("can-do"). A class can inherit only one abstract class in single-inheritance languages, but can implement multiple interfaces.',
    followUpQuestions: [
      'Can an abstract class be instantiated directly?',
      'Can an abstract class have a constructor?',
    ],
    difficulty: 'Easy',
    tags: ['Abstract Class', 'Interface', 'Design'],
  },
  {
    id: 'tech-int-oop-04',
    subject: 'OOP',
    question: 'Explain Compile-time Polymorphism vs Run-time Polymorphism.',
    answer:
      'Compile-time (Static) Polymorphism is resolved at compile time using function overloading, operator overloading, and templates (early binding). It has zero runtime overhead. Run-time (Dynamic) Polymorphism is resolved during program execution using function overriding and virtual functions (late binding) via a virtual method table (`vtable`).',
    followUpQuestions: [
      'What runtime cost is associated with dynamic polymorphism?',
      'Can templates achieve dynamic polymorphism?',
    ],
    difficulty: 'Easy',
    tags: ['Polymorphism', 'Early vs Late Binding'],
  },
  {
    id: 'tech-int-oop-05',
    subject: 'OOP',
    question: 'What are the SOLID principles? Explain each with a single sentence.',
    answer:
      'S - Single Responsibility Principle (A class should have only one reason to change). O - Open/Closed Principle (Software entities should be open for extension but closed for modification). L - Liskov Substitution Principle (Subtypes must be substitutable for their base types without breaking correctness). I - Interface Segregation Principle (Clients should not be forced to depend on interfaces they do not use). D - Dependency Inversion Principle (High-level modules should depend on abstractions, not concrete implementations).',
    followUpQuestions: [
      'Can you give an example of violating the Liskov Substitution Principle (e.g. Square inheriting Rectangle)?',
      'How does Dependency Injection relate to Dependency Inversion?',
    ],
    difficulty: 'Medium',
    tags: ['SOLID', 'Software Design', 'Architecture'],
  },
  {
    id: 'tech-int-oop-06',
    subject: 'OOP',
    question: 'What is the difference between Method Overloading and Method Overriding?',
    answer:
      'Method Overloading occurs within the same class when multiple methods share the same name but differ in parameter count, types, or order; return type alone cannot overload. Method Overriding occurs across inheritance when a derived class redefines a base class virtual method with the exact same name, parameters, and return type.',
    followUpQuestions: [
      'What is covariant return type in method overriding?',
      'Can a static method be overridden in C++ or Java?',
    ],
    difficulty: 'Easy',
    tags: ['Overloading', 'Overriding'],
  },
  {
    id: 'tech-int-oop-07',
    subject: 'OOP',
    question: 'What is the difference between Association, Aggregation, and Composition?',
    answer:
      '1. Association: A general relationship where two classes use each other (e.g. Teacher and Student). 2. Aggregation: A "has-a" relationship with weak ownership; child objects can exist independently of the parent (e.g. Department and Professor; deleting a department does not delete professors). 3. Composition: A "has-a" relationship with strong ownership; child lifecycle strictly depends on the parent (e.g. House and Room; deleting the house destroys the rooms).',
    followUpQuestions: [
      'How are aggregation and composition represented in UML class diagrams?',
    ],
    difficulty: 'Medium',
    tags: ['Association', 'Aggregation', 'Composition'],
  },
  {
    id: 'tech-int-oop-08',
    subject: 'OOP',
    question: 'What is a Singleton Design Pattern and how do you implement a thread-safe Singleton in C++?',
    answer:
      'A Singleton guarantees that a class has only one instance and provides a global access point to it. In modern C++ (C++11 and later), the recommended implementation is Meyer’s Singleton, which uses a static local variable inside a static method. C++11 guarantees thread-safe initialization of static local variables without requiring explicit mutex locking.',
    codeSnippet: 'class Singleton {\nprivate:\n  Singleton() = default;\npublic:\n  static Singleton& getInstance() {\n    static Singleton instance; // Thread-safe in C++11\n    return instance;\n  }\n  Singleton(const Singleton&) = delete;\n  void operator=(const Singleton&) = delete;\n};',
    followUpQuestions: [
      'Why is the Singleton pattern sometimes criticized as an anti-pattern?',
      'How do you delete copy constructor and assignment operator?',
    ],
    difficulty: 'Medium',
    tags: ['Design Patterns', 'Singleton', 'Thread Safety'],
  },
  {
    id: 'tech-int-oop-09',
    subject: 'OOP',
    question: 'What is the Factory Design Pattern and when should you use it?',
    answer:
      'The Factory pattern is a creational pattern that defines an interface for creating objects, letting subclasses decide which class to instantiate. It decouples client code from concrete implementation classes, making it easy to introduce new types without altering existing code.',
    followUpQuestions: [
      'What is the difference between Factory Method and Abstract Factory?',
    ],
    difficulty: 'Medium',
    tags: ['Design Patterns', 'Factory Pattern'],
  },
  {
    id: 'tech-int-oop-10',
    subject: 'OOP',
    question: 'What is the difference between shallow copy and deep copy?',
    answer:
      'A shallow copy duplicates all bitwise field values of an object. If the object contains pointers, only the memory addresses are copied, meaning both objects point to the same heap location (causing double deletion errors). A deep copy allocates new heap memory for the duplicate object and copies the actual underlying data, ensuring complete memory independence.',
    followUpQuestions: [
      'How do you write a deep copy constructor for a linked list?',
    ],
    difficulty: 'Easy',
    tags: ['Copying', 'Memory Management'],
  },

  // ================= DSA (12 Questions) =================
  {
    id: 'tech-int-dsa-01',
    subject: 'DSA',
    question: 'How do you detect a cycle in a Linked List? What is Floyd’s Cycle Finding Algorithm?',
    answer:
      'Floyd’s Cycle Finding Algorithm (Tortoise and Hare) uses two pointers: a slow pointer moving 1 step at a time and a fast pointer moving 2 steps at a time. If a cycle exists, the fast pointer will eventually wrap around and meet the slow pointer ($slow == fast$) in $O(n)$ time and $O(1)$ space. If fast reaches NULL, there is no cycle.',
    explanation:
      'To find the start of the cycle, reset `slow` to the head while keeping `fast` at the meeting point. Move both 1 step at a time; they will meet at the cycle entry node.',
    followUpQuestions: [
      'What is the mathematical proof behind finding the starting node of the cycle?',
      'How do you detect a cycle using a Hash Set?',
    ],
    difficulty: 'Medium',
    tags: ['Linked Lists', 'Two Pointers'],
  },
  {
    id: 'tech-int-dsa-02',
    subject: 'DSA',
    question: 'Explain the working of Binary Search. When does the classic `(low + high) / 2` overflow?',
    answer:
      'Binary Search works on sorted arrays. It compares the target with the middle element: if target equals mid, return index; if target is smaller, search left half; else search right half, halving the search space each step in $O(\\log n)$ time. In languages with fixed-width integers, `(low + high)` can overflow if their sum exceeds $2^{31}-1$. The safe formula is `low + (high - low) / 2`.',
    followUpQuestions: [
      'How do you find the first and last occurrence of an element in a sorted array with duplicates?',
      'Can Binary Search be applied to a rotated sorted array?',
    ],
    difficulty: 'Easy',
    tags: ['Binary Search', 'Overflow Bug'],
  },
  {
    id: 'tech-int-dsa-03',
    subject: 'DSA',
    question: 'What is a Hash Collision and what are the standard strategies to resolve it?',
    answer:
      'A hash collision occurs when two distinct keys produce the same hash index ($hash(key1) == hash(key2)$). Resolution strategies: 1. Separate Chaining (Open Hashing): Each bucket holds a linked list (or Red-Black tree in Java 8) of colliding entries. 2. Open Addressing (Closed Hashing): All elements reside directly in the table; collisions are resolved by probing: Linear Probing ($i+1$), Quadratic Probing ($i+c_1 k + c_2 k^2$), or Double Hashing ($h_1(k) + i \\cdot h_2(k)$).',
    followUpQuestions: [
      'What is the Load Factor in a Hash Map and when does re-hashing trigger?',
      'What causes clustering in Linear Probing?',
    ],
    difficulty: 'Medium',
    tags: ['Hashing', 'Collisions'],
  },
  {
    id: 'tech-int-dsa-04',
    subject: 'DSA',
    question: 'What is the difference between DFS and BFS? What data structures do they use?',
    answer:
      'BFS (Breadth-First Search) explores neighbors level by level using a Queue (FIFO); it guarantees the shortest path in unweighted graphs. DFS (Depth-First Search) explores as deep as possible along each branch before backtracking using a Stack (LIFO) or recursive call stack; it is well suited for topological sorting, cycle detection, and maze solving. Both run in $O(V + E)$ time.',
    followUpQuestions: [
      'How do you detect a cycle in a directed graph using DFS (three-color method)?',
      'When would you prefer BFS over DFS for tree level order traversal?',
    ],
    difficulty: 'Easy',
    tags: ['Graphs', 'BFS', 'DFS'],
  },
  {
    id: 'tech-int-dsa-05',
    subject: 'DSA',
    question: 'What is a Binary Search Tree (BST) and what is its worst-case search time complexity?',
    answer:
      'A BST is a binary tree where for every node, all keys in its left subtree are strictly smaller and all keys in its right subtree are strictly greater. Its average search time is $O(\\log n)$. However, if elements are inserted in already sorted order, the tree degrades into a skewed linked list, worsening search time complexity to $O(n)$. Self-balancing trees (AVL, Red-Black trees) guarantee $O(\\log n)$ worst-case.',
    followUpQuestions: [
      'How does an in-order traversal of a BST visit nodes?',
      'What is the difference between an AVL tree and a Red-Black tree?',
    ],
    difficulty: 'Easy',
    tags: ['Trees', 'BST', 'Complexity'],
  },
  {
    id: 'tech-int-dsa-06',
    subject: 'DSA',
    question: 'How does QuickSort work and what is its worst-case time complexity?',
    answer:
      'QuickSort is a divide-and-conquer algorithm. It selects a pivot element, partitions the array so smaller elements are to the left and larger elements are to the right, and recursively sorts both halves. Its average time complexity is $O(n \\log n)$. The worst-case is $O(n^2)$, which occurs when the pivot is consistently the smallest or largest element (e.g. sorted array with first element as pivot). Randomized pivots or 3-way partitioning prevent this.',
    followUpQuestions: [
      'Is QuickSort stable? Why or why not?',
      'Why is QuickSort generally faster in practice than MergeSort for arrays?',
    ],
    difficulty: 'Medium',
    tags: ['Sorting', 'QuickSort', 'Divide & Conquer'],
  },
  {
    id: 'tech-int-dsa-07',
    subject: 'DSA',
    question: 'What is Dynamic Programming? What are its two core prerequisites?',
    answer:
      'Dynamic Programming (DP) solves complex optimization problems by breaking them into overlapping subproblems and storing subproblem results to prevent recomputation. Prerequisites: 1. Optimal Substructure: The optimal solution to the problem can be constructed from optimal solutions to its subproblems. 2. Overlapping Subproblems: The same subproblems are solved repeatedly rather than generating new subproblems.',
    explanation:
      'Approaches: Top-Down with Memoization (recursion + cache) and Bottom-Up with Tabulation (iterative table filling).',
    followUpQuestions: [
      'What is the difference between Dynamic Programming and Greedy Algorithms?',
      'How does space optimization work in Fibonacci or 1D DP?',
    ],
    difficulty: 'Medium',
    tags: ['Dynamic Programming', 'Memoization', 'Tabulation'],
  },
  {
    id: 'tech-int-dsa-08',
    subject: 'DSA',
    question: 'How do you implement a Queue using two Stacks?',
    answer:
      'Use `stackIn` for enqueue operations and `stackOut` for dequeue operations. To `enqueue(x)`: push $x$ onto `stackIn` ($O(1)$). To `dequeue()`: if `stackOut` is empty, pop all elements from `stackIn` and push them onto `stackOut` (reversing their order to FIFO), then pop from `stackOut`. The amortized time complexity per operation is $O(1)$.',
    followUpQuestions: [
      'What is the worst-case time complexity of a single dequeue operation?',
      'How would you implement a Stack using two Queues?',
    ],
    difficulty: 'Easy',
    tags: ['Stack', 'Queue', 'Amortized Analysis'],
  },
  {
    id: 'tech-int-dsa-09',
    subject: 'DSA',
    question: 'What is a Min-Heap / Priority Queue and what are its operational complexities?',
    answer:
      'A Min-Heap is a complete binary tree where the key at every node is $\\le$ the keys of its children; the minimum element is always at the root. Insertion: append to end and bubble up ($O(\\log n)$). Extract Min: replace root with last element and bubble down / heapify ($O(\\log n)$). Peek Min: return root ($O(1)$). Building a heap from an unordered array of $n$ elements takes $O(n)$ time.',
    followUpQuestions: [
      'Why does `buildHeap` take $O(n)$ instead of $O(n \\log n)$ mathematically?',
      'How is a binary heap stored in a flat 1D array?',
    ],
    difficulty: 'Medium',
    tags: ['Heap', 'Priority Queue'],
  },
  {
    id: 'tech-int-dsa-10',
    subject: 'DSA',
    question: 'What is Kadane’s Algorithm for Maximum Subarray Sum?',
    answer:
      'Kadane’s algorithm iterates through the array while maintaining two variables: `currentMax` (maximum sum ending at the current position) and `globalMax` (maximum sum found so far). At each element $x$, `currentMax = max(x, currentMax + x)`. If `currentMax > globalMax`, update `globalMax`. Runs in $O(n)$ time and $O(1)$ auxiliary space.',
    followUpQuestions: [
      'How does Kadane’s algorithm handle arrays containing only negative numbers?',
      'How do you print the actual starting and ending indices of the maximum subarray?',
    ],
    difficulty: 'Easy',
    tags: ['Arrays', 'Kadane', 'Dynamic Programming'],
  },
  {
    id: 'tech-int-dsa-11',
    subject: 'DSA',
    question: 'What is a Monotonic Stack and when should you use it?',
    answer:
      'A Monotonic Stack is a stack whose elements are strictly increasing or strictly decreasing. It is used to solve "Next Greater Element", "Previous Smaller Element", and "Largest Rectangle in Histogram" in linear $O(n)$ time because every element is pushed and popped at most once.',
    followUpQuestions: [
      'How do you compute Trapping Rain Water using a Monotonic Stack?',
    ],
    difficulty: 'Hard',
    tags: ['Stack', 'Monotonic Stack'],
  },
  {
    id: 'tech-int-dsa-12',
    subject: 'DSA',
    question: 'What is the Two-Pointer technique and when is it applicable?',
    answer:
      'The Two-Pointer technique uses two indices moving through an array or list simultaneously (either toward each other from opposite ends, or in the same direction at different speeds like fast/slow pointers or sliding window). It is applicable to sorted arrays (e.g. Two Sum II, 3Sum, Container With Most Water) and cycle detection, reducing $O(n^2)$ brute-force solutions to $O(n)$.',
    followUpQuestions: [
      'How does the Sliding Window pattern differ from Two Pointers?',
    ],
    difficulty: 'Easy',
    tags: ['Two Pointers', 'Optimization'],
  },

  // ================= DBMS (12 Questions) =================
  {
    id: 'tech-int-dbms-01',
    subject: 'DBMS',
    question: 'Explain the ACID properties of database transactions in detail.',
    answer:
      'Atomicity: All-or-nothing completion; if a crash occurs mid-transaction, all partial updates are rolled back. Consistency: A transaction transitions the database from one valid state to another, satisfying all schema constraints and foreign keys. Isolation: Concurrent transactions execute without interfering with one another, as if executed sequentially. Durability: Once committed, updates persist permanently even during unexpected system power failures.',
    followUpQuestions: [
      'Which database mechanism guarantees Atomicity and Durability (Write-Ahead Logging)?',
      'What are the 4 standard ANSI SQL transaction isolation levels?',
    ],
    difficulty: 'Easy',
    tags: ['ACID', 'Transactions'],
  },
  {
    id: 'tech-int-dbms-02',
    subject: 'DBMS',
    question: 'What are Database Normalization and its benefits? Explain 1NF, 2NF, 3NF, and BCNF.',
    answer:
      'Normalization organizes database tables to minimize data redundancy and eliminate insert, update, and delete anomalies. 1NF: Atomic column values, unique row identifiers, no repeating groups. 2NF: In 1NF and no partial dependencies (all non-key attributes fully depend on the entire primary key). 3NF: In 2NF and no transitive dependencies (non-key attributes do not depend on other non-key attributes). BCNF: Stricter 3NF where for every functional dependency $X \\to Y$, $X$ must be a superkey.',
    followUpQuestions: [
      'What is Denormalization and when is it deliberately used in production?',
    ],
    difficulty: 'Medium',
    tags: ['Normalization', 'Schema Design'],
  },
  {
    id: 'tech-int-dbms-03',
    subject: 'DBMS',
    question: 'What is the difference between a Clustered and a Non-Clustered Index?',
    answer:
      'A Clustered Index alters the physical storage order of table rows on disk to match the index order; therefore, only one clustered index can exist per table (usually the Primary Key). A Non-Clustered Index creates a separate B+ tree structure containing sorted keys and pointers (row IDs or clustered key values) back to the actual data rows; multiple non-clustered indexes can exist on a table.',
    followUpQuestions: [
      'What is a Covering Index and how does it prevent table lookups?',
      'Why does adding too many indexes slow down `INSERT` and `UPDATE` queries?',
    ],
    difficulty: 'Medium',
    tags: ['Indexing', 'Performance'],
  },
  {
    id: 'tech-int-dbms-04',
    subject: 'DBMS',
    question: 'What is Two-Phase Locking (2PL) and how does it guarantee Serializability?',
    answer:
      '2PL is a concurrency control protocol that divides transaction locking into two phases: 1. Growing Phase: Locks are acquired and no locks are released. 2. Shrinking Phase: Locks are released and no new locks can be acquired. By ensuring lock acquisition precedes any releases, 2PL guarantees conflict serializability of concurrent schedules.',
    followUpQuestions: [
      'Does basic 2PL prevent deadlocks? (No, it can still deadlock)',
      'What is Strict 2PL and why does it avoid cascading rollbacks?',
    ],
    difficulty: 'Hard',
    tags: ['Concurrency', '2PL', 'Serializability'],
  },
  {
    id: 'tech-int-dbms-05',
    subject: 'DBMS',
    question: 'What are the concurrency phenomena: Dirty Read, Non-Repeatable Read, and Phantom Read?',
    answer:
      'Dirty Read: Reading uncommitted modifications made by another concurrent transaction (violates Read Committed). Non-Repeatable Read: Re-reading the same row within a transaction and finding its data modified by a committed concurrent transaction (violates Repeatable Read). Phantom Read: Re-executing a range query within a transaction and finding new rows inserted or deleted by another committed transaction (violates Serializable).',
    followUpQuestions: [
      'How does MySQL InnoDB prevent phantom reads in Repeatable Read (Next-Key Locking / MVCC)?',
    ],
    difficulty: 'Hard',
    tags: ['Isolation Levels', 'Concurrency Anomalies'],
  },
  {
    id: 'tech-int-dbms-06',
    subject: 'DBMS',
    question: 'What is a View in SQL and what is the difference between a View and a Materialized View?',
    answer:
      'A standard View is a virtual table defined by a SQL query; it stores no physical data on disk and re-runs the underlying query on access. A Materialized View physically stores the query result on disk like a real table, allowing fast reads for complex aggregations, but requiring scheduled or triggered refreshes when base tables change.',
    followUpQuestions: [
      'Can you update base table records through a standard view?',
    ],
    difficulty: 'Medium',
    tags: ['Views', 'Materialized Views'],
  },
  {
    id: 'tech-int-dbms-07',
    subject: 'DBMS',
    question: 'What is a Deadlock in a database and how does the engine handle it?',
    answer:
      'A deadlock occurs when two or more transactions form a cycle where each holds a lock the other needs. Handling: 1. Detection: The database maintains a Wait-For Graph and scans for directed cycles. When a cycle is detected, the engine picks a "victim" transaction (usually with least work done) and aborts/rolls it back. 2. Prevention: Timestamps schemes (Wait-Die or Wound-Wait) or lock acquisition ordering.',
    followUpQuestions: [
      'How can application developers design code to minimize database deadlocks?',
    ],
    difficulty: 'Medium',
    tags: ['Deadlocks', 'Transactions'],
  },
  {
    id: 'tech-int-dbms-08',
    subject: 'DBMS',
    question: 'What is the difference between Primary Key, Unique Key, and Candidate Key?',
    answer:
      'A Candidate Key is any column or minimal set of columns that can uniquely identify a row. The Primary Key is the chosen candidate key (strictly one per table, cannot contain NULLs). A Unique Key also enforces uniqueness across rows, but can permit one (or more, depending on SQL dialect) NULL values.',
    followUpQuestions: [
      'Does a Unique constraint automatically create an index?',
    ],
    difficulty: 'Easy',
    tags: ['Keys', 'Constraints'],
  },
  {
    id: 'tech-int-dbms-09',
    subject: 'DBMS',
    question: 'What are Database Triggers and Stored Procedures?',
    answer:
      'A Stored Procedure is a compiled set of SQL statements and control logic stored in the database that is executed explicitly by name with parameters. A Trigger is procedural code executed automatically by the database engine in response to specific events (`BEFORE`/`AFTER` `INSERT`, `UPDATE`, or `DELETE`) on a table.',
    followUpQuestions: [
      'What are the downsides of overusing database triggers in production?',
    ],
    difficulty: 'Easy',
    tags: ['Stored Procedures', 'Triggers'],
  },
  {
    id: 'tech-int-dbms-10',
    subject: 'DBMS',
    question: 'What is Sharding vs Replication in distributed database systems?',
    answer:
      'Replication copies identical data across multiple database servers to provide high availability, fault tolerance, and read scalability (e.g. Master-Replica). Sharding (horizontal partitioning) splits a single massive table across multiple independent servers by a shard key (e.g. User ID % 4), scaling both write throughput and storage capacity.',
    followUpQuestions: [
      'What is the CAP Theorem in distributed databases?',
    ],
    difficulty: 'Hard',
    tags: ['Distributed Systems', 'Sharding', 'Replication'],
  },
  {
    id: 'tech-int-dbms-11',
    subject: 'DBMS',
    question: 'What is the role of the Buffer Pool / Buffer Cache in database engines?',
    answer:
      'The Buffer Pool is a dedicated memory region in RAM where the database caches data and index pages read from disk. When queries request pages, memory hits avoid slow disk I/O. Dirty pages (modified in RAM) are flushed asynchronously to disk in checkpoints.',
    followUpQuestions: [
      'What eviction algorithm is typically used in database buffer pools (LRU)?',
    ],
    difficulty: 'Medium',
    tags: ['Buffer Pool', 'Performance', 'I/O'],
  },
  {
    id: 'tech-int-dbms-12',
    subject: 'DBMS',
    question: 'What is the difference between SQL (Relational) and NoSQL databases?',
    answer:
      'SQL databases (PostgreSQL, MySQL) are relational, have predefined schemas, enforce ACID transactions, and scale vertically. NoSQL databases (MongoDB, Redis, Cassandra) are non-relational, support dynamic or schema-less documents/key-value pairs, often follow BASE principles (eventual consistency), and scale horizontally across distributed clusters.',
    followUpQuestions: [
      'When would you choose MongoDB over PostgreSQL for a fresher project?',
    ],
    difficulty: 'Easy',
    tags: ['SQL vs NoSQL', 'System Design'],
  },

  // ================= SQL (10 Questions) =================
  {
    id: 'tech-int-sql-01',
    subject: 'SQL',
    question: 'What are the different types of JOINs in SQL? Explain each.',
    answer:
      '1. INNER JOIN: Returns only rows with matching values in both tables. 2. LEFT JOIN: Returns all rows from left table, and matching rows from right (NULL if no match). 3. RIGHT JOIN: Returns all rows from right table, and matching from left. 4. FULL OUTER JOIN: Returns all rows when there is a match in either table. 5. CROSS JOIN: Returns the Cartesian product ($m \\times n$ rows).',
    followUpQuestions: [
      'How does a SELF JOIN work?',
      'What happens if you omit the `ON` clause in an INNER JOIN?',
    ],
    difficulty: 'Easy',
    tags: ['JOINs', 'Queries'],
  },
  {
    id: 'tech-int-sql-02',
    subject: 'SQL',
    question: 'Write a query to find duplicate records in a table.',
    answer:
      'Use `GROUP BY` on the unique columns combined with `HAVING COUNT(*) > 1`.',
    codeSnippet: 'SELECT email, COUNT(*)\nFROM Users\nGROUP BY email\nHAVING COUNT(*) > 1;',
    followUpQuestions: [
      'How do you delete duplicates while keeping only one copy in SQL?',
    ],
    difficulty: 'Easy',
    tags: ['GROUP BY', 'HAVING', 'Duplicates'],
  },
  {
    id: 'tech-int-sql-03',
    subject: 'SQL',
    question: 'Write an SQL query to find the Nth highest salary in an Employee table.',
    answer:
      'Using `DENSE_RANK()` window function: partition and order salaries descending, then filter by rank equal to N in an outer query.',
    codeSnippet: 'WITH RankedSalaries AS (\n  SELECT salary,\n         DENSE_RANK() OVER (ORDER BY salary DESC) as rnk\n  FROM Employee\n)\nSELECT DISTINCT salary\nFROM RankedSalaries\nWHERE rnk = 2; -- 2nd highest salary',
    followUpQuestions: [
      'Why is `DENSE_RANK()` preferred over `LIMIT 1 OFFSET N-1` when multiple employees share the same salary?',
    ],
    difficulty: 'Medium',
    tags: ['Window Functions', 'Nth Highest Salary'],
  },
  {
    id: 'tech-int-sql-04',
    subject: 'SQL',
    question: 'What are SQL Window Functions and how do they differ from `GROUP BY`?',
    answer:
      'A `GROUP BY` clause collapses multiple rows into a single summary output row per group. Window functions (`OVER (PARTITION BY ... ORDER BY ...)`) perform calculations across a set of table rows related to the current row, but retain each row’s individual identity in the output.',
    followUpQuestions: [
      'Name three common window ranking functions (`ROW_NUMBER`, `RANK`, `DENSE_RANK`).',
    ],
    difficulty: 'Medium',
    tags: ['Window Functions', 'Analytic Queries'],
  },
  {
    id: 'tech-int-sql-05',
    subject: 'SQL',
    question: 'What is the difference between `DELETE`, `TRUNCATE`, and `DROP`?',
    answer:
      '`DELETE` is a DML command that removes specified rows row-by-row, logs each deletion, fires triggers, and can be rolled back. `TRUNCATE` is a DDL command that deallocates data pages, removes all rows at once, resets identity seeds, does not fire triggers, and is much faster. `DROP` is a DDL command that deletes the entire table definition, indexes, constraints, and data permanently.',
    followUpQuestions: [
      'Can `TRUNCATE` be used if the table is referenced by a Foreign Key?',
    ],
    difficulty: 'Easy',
    tags: ['DDL vs DML', 'DELETE', 'TRUNCATE'],
  },
  {
    id: 'tech-int-sql-06',
    subject: 'SQL',
    question: 'How do you handle `NULL` values in SQL comparisons and calculations?',
    answer:
      'In SQL, `NULL` represents missing or unknown data. Comparisons like `val = NULL` evaluate to `UNKNOWN` (NULL), not true or false. You must use `IS NULL` or `IS NOT NULL`. For default values during calculations, use `COALESCE(column, 0)` or `IFNULL(column, 0)`. Aggregate functions like `AVG` and `SUM` ignore NULL values.',
    followUpQuestions: [
      'What does `COUNT(*)` return vs `COUNT(column_name)` when rows have NULLs?',
    ],
    difficulty: 'Medium',
    tags: ['NULL Handling', 'COALESCE'],
  },
  {
    id: 'tech-int-sql-07',
    subject: 'SQL',
    question: 'What is the difference between `UNION` and `UNION ALL`?',
    answer:
      '`UNION` combines the result sets of two queries and performs an implicit `DISTINCT` operation, removing duplicate rows (which incurs sorting/hashing overhead). `UNION ALL` combines results directly without duplicate elimination, making it significantly faster. Both require matching column counts and compatible data types.',
    followUpQuestions: [
      'When is it safe to use `UNION ALL` instead of `UNION`?',
    ],
    difficulty: 'Easy',
    tags: ['UNION', 'Performance'],
  },
  {
    id: 'tech-int-sql-08',
    subject: 'SQL',
    question: 'What is the purpose of an SQL Subquery and what is a Correlated Subquery?',
    answer:
      'A Subquery is a nested query within another SQL statement. An independent subquery runs once and passes its result to the outer query. A Correlated Subquery references columns from the outer query table, executing once for every candidate row evaluated by the outer query.',
    codeSnippet: 'SELECT e.name, e.salary\nFROM Employee e\nWHERE e.salary > (\n  SELECT AVG(d.salary) FROM Employee d WHERE d.dept_id = e.dept_id\n);',
    followUpQuestions: [
      'How can correlated subqueries be rewritten as JOINs for better performance?',
    ],
    difficulty: 'Medium',
    tags: ['Subqueries', 'Correlated Subqueries'],
  },
  {
    id: 'tech-int-sql-09',
    subject: 'SQL',
    question: 'What is the `EXISTS` operator and why is it often faster than `IN`?',
    answer:
      '`EXISTS` evaluates whether a subquery returns any rows; as soon as the first matching row is found, the database stops scanning (`short-circuits`). `IN` evaluates the entire subquery result set before matching, and can cause unexpected results when the subquery contains `NULL` values.',
    followUpQuestions: [
      'What happens when `NOT IN` encounters a `NULL` in the subquery?',
    ],
    difficulty: 'Medium',
    tags: ['EXISTS', 'IN', 'Optimization'],
  },
  {
    id: 'tech-int-sql-10',
    subject: 'SQL',
    question: 'What is the `EXPLAIN` or `EXPLAIN ANALYZE` command used for?',
    answer:
      '`EXPLAIN` displays the query execution plan generated by the database query optimizer (indexes used, join algorithms like Nested Loop or Hash Join, estimated row counts, cost). `EXPLAIN ANALYZE` actually executes the query and prints real elapsed times alongside optimizer estimates, helping detect full table scans.',
    followUpQuestions: [
      'What is an Index Seek vs an Index Scan?',
    ],
    difficulty: 'Hard',
    tags: ['EXPLAIN', 'Query Optimization', 'Execution Plans'],
  },

  // ================= Operating Systems (12 Questions) =================
  {
    id: 'tech-int-os-01',
    subject: 'Operating Systems',
    question: 'What is the difference between a Process and a Thread?',
    answer:
      'A Process is an executing instance of a program with its own dedicated virtual address space, file descriptors, and security context. A Thread is a lightweight unit of execution within a process; multiple threads share the process’s code, heap, and open files, but maintain their own program counter, CPU registers, and stack.',
    followUpQuestions: [
      'Why is context switching between threads faster than between processes?',
      'What are user-level threads vs kernel-level threads?',
    ],
    difficulty: 'Easy',
    tags: ['Process', 'Thread', 'Concurrency'],
  },
  {
    id: 'tech-int-os-02',
    subject: 'Operating Systems',
    question: 'What is a Deadlock and what are the four necessary conditions for it to occur?',
    answer:
      'A Deadlock is a situation where a set of processes are blocked because each process holds a resource and waits for another resource held by another process in the set. The four Coffman conditions are: 1. Mutual Exclusion (non-shareable resources). 2. Hold and Wait (process holds resources while waiting for more). 3. No Preemption (resources cannot be forcibly taken). 4. Circular Wait (a closed chain of processes waiting for each other).',
    followUpQuestions: [
      'How can we prevent deadlocks by breaking the Circular Wait condition?',
    ],
    difficulty: 'Medium',
    tags: ['Deadlock', 'Coffman Conditions'],
  },
  {
    id: 'tech-int-os-03',
    subject: 'Operating Systems',
    question: 'Explain Virtual Memory and Paging in modern Operating Systems.',
    answer:
      'Virtual Memory gives each process the illusion of a large, contiguous memory space regardless of physical RAM size. The virtual address space is divided into fixed-size chunks called Pages (typically 4KB), and physical RAM is divided into Frames of the same size. A hardware Page Table managed by the MMU maps virtual page numbers to physical frame numbers. If an unmapped page is accessed, a Page Fault exception triggers the OS to fetch it from disk.',
    followUpQuestions: [
      'What is a Multi-level Page Table and why is it needed for 64-bit architectures?',
      'What is the Translation Lookaside Buffer (TLB)?',
    ],
    difficulty: 'Medium',
    tags: ['Virtual Memory', 'Paging', 'Page Fault'],
  },
  {
    id: 'tech-int-os-04',
    subject: 'Operating Systems',
    question: 'What is Thrashing and how does the OS detect and prevent it?',
    answer:
      'Thrashing occurs when the sum of active processes’ working sets exceeds physical RAM, causing the OS to spend more time swapping pages in and out of disk swap space than executing actual user code. CPU utilization drops to near zero. Prevention: Using the Working Set Model (allocating each process enough frames for its active pages) or temporarily suspending lower-priority processes.',
    followUpQuestions: [
      'What is the Page Fault Frequency (PFF) strategy?',
    ],
    difficulty: 'Medium',
    tags: ['Thrashing', 'Virtual Memory'],
  },
  {
    id: 'tech-int-os-05',
    subject: 'Operating Systems',
    question: 'What is the difference between a Mutex and a Semaphore?',
    answer:
      'A Mutex (Mutual Exclusion) is a locking mechanism with ownership: only the thread that locks the mutex can unlock it. It is strictly binary (0 or 1). A Semaphore is a signaling mechanism: a Counting Semaphore maintains an integer counter of available permits; any thread can signal (`V()`/`post()`) or wait (`P()`/`wait()`). Mutexes prevent race conditions in critical sections; semaphores coordinate inter-thread execution order.',
    followUpQuestions: [
      'What is a Spinlock and when is it preferred over a Mutex?',
      'What is Priority Inversion and how does Priority Inheritance solve it?',
    ],
    difficulty: 'Medium',
    tags: ['Synchronization', 'Mutex', 'Semaphore'],
  },
  {
    id: 'tech-int-os-06',
    subject: 'Operating Systems',
    question: 'Compare CPU Scheduling Algorithms: FCFS, SJF, Round Robin, and Priority Scheduling.',
    answer:
      '1. FCFS: Non-preemptive, simple, suffers from Convoy Effect. 2. SJF (Shortest Job First): Provably optimal average turnaround time, but requires predicting burst times and can cause starvation of long jobs. 3. Round Robin: Preemptive, gives each process a time quantum; fair and optimal for time-sharing systems. 4. Priority Scheduling: Executes highest priority first; can cause starvation (solved via Aging).',
    followUpQuestions: [
      'How does the time quantum size affect Round Robin performance?',
    ],
    difficulty: 'Easy',
    tags: ['CPU Scheduling', 'Algorithms'],
  },
  {
    id: 'tech-int-os-07',
    subject: 'Operating Systems',
    question: 'What is a System Call and how does CPU mode switching work?',
    answer:
      'A system call is the programmatic interface that allows a user-mode application to request services from the operating system kernel (e.g. `read`, `write`, `fork`). Modern CPUs enforce privilege levels: User Mode (restricted instructions and memory) and Kernel Mode (unrestricted access). A system call executes a software interrupt or CPU instruction (`syscall`/`int 0x80`), switching the CPU privilege level to kernel mode.',
    followUpQuestions: [
      'Why is separating User Mode and Kernel Mode critical for OS security?',
    ],
    difficulty: 'Medium',
    tags: ['System Calls', 'Kernel vs User Mode'],
  },
  {
    id: 'tech-int-os-08',
    subject: 'Operating Systems',
    question: 'What is a Zombie Process vs an Orphan Process in Linux?',
    answer:
      'A Zombie process is a process that has terminated execution, but its exit status remains in the process table because its parent has not yet read it via `wait()`. It consumes no CPU or RAM, only a PID. An Orphan process is a running process whose parent terminated; orphan processes are immediately adopted by `init` / `systemd` (PID 1), which periodically reaps their exit statuses.',
    followUpQuestions: [
      'How do you eliminate zombie processes if their parent is still running?',
    ],
    difficulty: 'Medium',
    tags: ['Linux', 'Processes', 'Zombie vs Orphan'],
  },
  {
    id: 'tech-int-os-09',
    subject: 'Operating Systems',
    question: 'What is Internal vs External Fragmentation?',
    answer:
      'Internal Fragmentation happens when fixed-size memory blocks are allocated (e.g. a 4KB page allocated to an object requiring 1KB), leaving unused memory inside the allocated block. External Fragmentation occurs when free memory is broken into many small, non-contiguous holes scattered across the address space, such that the total free memory is sufficient for a request but no single contiguous chunk is large enough.',
    followUpQuestions: [
      'How does Paging eliminate external fragmentation?',
    ],
    difficulty: 'Easy',
    tags: ['Memory Management', 'Fragmentation'],
  },
  {
    id: 'tech-int-os-10',
    subject: 'Operating Systems',
    question: 'What is Inter-Process Communication (IPC) and what mechanisms exist?',
    answer:
      'IPC allows independent processes with isolated memory spaces to exchange data and synchronize. Common IPC mechanisms: 1. Pipes and Named Pipes (FIFOs). 2. Shared Memory (fastest, requires synchronization). 3. Message Queues. 4. Semaphores. 5. Sockets (works across network and local machine). 6. Signals (asynchronous notifications like `SIGINT`, `SIGKILL`).',
    followUpQuestions: [
      'Why is Shared Memory the fastest IPC mechanism?',
    ],
    difficulty: 'Medium',
    tags: ['IPC', 'Operating Systems'],
  },
  {
    id: 'tech-int-os-11',
    subject: 'Operating Systems',
    question: 'What is Belady’s Anomaly in page replacement?',
    answer:
      'Belady’s Anomaly is the counterintuitive phenomenon where increasing the number of physical page frames allocated to a process results in an increased number of page faults. It can occur in FIFO page replacement, but never occurs in stack-based algorithms like LRU (Least Recently Used) or Optimal replacement.',
    followUpQuestions: [
      'What mathematical property protects LRU from Belady’s anomaly (Stack property)?',
    ],
    difficulty: 'Medium',
    tags: ['Page Replacement', 'FIFO', 'Belady'],
  },
  {
    id: 'tech-int-os-12',
    subject: 'Operating Systems',
    question: 'What is a Race Condition and how is it prevented?',
    answer:
      'A race condition occurs when two or more concurrent threads access shared data simultaneously and the final outcome depends on the non-deterministic timing of thread execution. It is prevented by enforcing Mutual Exclusion around the critical section using Mutexes, Locks, Semaphores, or Atomic variables (`std::atomic`).',
    followUpQuestions: [
      'What are lock-free data structures and compare-and-swap (CAS)?',
    ],
    difficulty: 'Easy',
    tags: ['Concurrency', 'Race Condition'],
  },

  // ================= Computer Networks (12 Questions) =================
  {
    id: 'tech-int-cn-01',
    subject: 'Computer Networks',
    question: 'What happens under the hood from the moment you type `https://www.google.com` in your browser and press Enter?',
    answer:
      '1. Browser checks cache (browser, OS, router). 2. DNS Resolution: Queries resolver, root server, TLD server (.com), and authoritative server to obtain IP address. 3. TCP Handshake: 3-way handshake (SYN, SYN-ACK, ACK) establishes TCP connection on port 443. 4. TLS Handshake: Client and server negotiate cipher suites, authenticate certificates, and generate symmetric session keys. 5. HTTP Request: Browser sends `GET /` over encrypted TLS. 6. Server processes request and returns HTTP 200 response with HTML/CSS/JS. 7. Browser renders DOM and layout.',
    followUpQuestions: [
      'How does DNS caching at the OS level speed up subsequent visits?',
      'What is the difference between TCP connection establishment and TLS handshake?',
    ],
    difficulty: 'Hard',
    tags: ['Web Fundamentals', 'DNS', 'TCP', 'TLS'],
  },
  {
    id: 'tech-int-cn-02',
    subject: 'Computer Networks',
    question: 'Compare the 7 layers of the OSI Model with the 4 layers of the TCP/IP Model.',
    answer:
      'OSI: 7. Application, 6. Presentation, 5. Session, 4. Transport, 3. Network, 2. Data Link, 1. Physical. In TCP/IP: Layers 7, 6, and 5 are merged into the Application Layer; Layer 4 is Transport; Layer 3 is Internet; Layers 2 and 1 are merged into Network Access / Link Layer.',
    followUpQuestions: [
      'At which layer do routers operate vs switches vs hubs?',
    ],
    difficulty: 'Easy',
    tags: ['OSI Model', 'TCP/IP Model'],
  },
  {
    id: 'tech-int-cn-03',
    subject: 'Computer Networks',
    question: 'What is the TCP 3-Way Handshake and 4-Way Termination process?',
    answer:
      'Handshake: 1. Client sends `SYN` (seq = x). 2. Server sends `SYN-ACK` (ack = x+1, seq = y). 3. Client sends `ACK` (ack = y+1). Termination: 1. Client sends `FIN` (initiates close). 2. Server sends `ACK` (half-closed). 3. Server finishes sending remaining data and sends `FIN`. 4. Client sends `ACK` and enters `TIME_WAIT` state (usually 2 MSL) before closing.',
    followUpQuestions: [
      'Why is the `TIME_WAIT` state necessary for the client?',
    ],
    difficulty: 'Medium',
    tags: ['TCP', 'Handshake', 'Connection Lifecycle'],
  },
  {
    id: 'tech-int-cn-04',
    subject: 'Computer Networks',
    question: 'What are the core differences between TCP and UDP? When do you choose UDP?',
    answer:
      'TCP is connection-oriented, guarantees packet delivery through retransmission, preserves byte order, and manages congestion/flow control (e.g. HTTP, SSH, FTP). UDP is connectionless, lightweight, has no delivery guarantees or retransmission, and minimal header overhead (8 bytes vs 20+ bytes). UDP is chosen for real-time applications where speed outweighs packet loss: video streaming, DNS lookups, online multiplayer gaming, and VoIP.',
    followUpQuestions: [
      'What is QUIC and how does HTTP/3 run over UDP?',
    ],
    difficulty: 'Easy',
    tags: ['TCP vs UDP', 'Protocols'],
  },
  {
    id: 'tech-int-cn-05',
    subject: 'Computer Networks',
    question: 'How does DNS (Domain Name System) work hierarchically?',
    answer:
      'DNS follows a recursive and iterative lookup hierarchy: 1. Local DNS Cache (browser / OS / `/etc/hosts`). 2. Local DNS Resolver (ISP or 8.8.8.8). 3. Root Name Server (`.` root). 4. Top-Level Domain (TLD) Server (`.com`, `.org`). 5. Authoritative Name Server (holding the specific zone records like `A`, `CNAME`, `MX`). The IP is returned and cached for the duration of the TTL (Time-to-Live).',
    followUpQuestions: [
      'What is the difference between an `A` record and a `CNAME` record?',
      'What is DNS spoofing / cache poisoning?',
    ],
    difficulty: 'Medium',
    tags: ['DNS', 'Networking'],
  },
  {
    id: 'tech-int-cn-06',
    subject: 'Computer Networks',
    question: 'What is the difference between an IP Address and a MAC Address?',
    answer:
      'A MAC address (Media Access Control) is a 48-bit physical hardware address burned into the network interface card (NIC), operating at Layer 2 (Data Link) within a local network. An IP address is a 32-bit (IPv4) or 128-bit (IPv6) logical network address assigned to a host, operating at Layer 3 (Network) to enable routing packets across multiple interconnected networks.',
    followUpQuestions: [
      'How does the ARP protocol bridge IP addresses to MAC addresses?',
    ],
    difficulty: 'Easy',
    tags: ['IP', 'MAC', 'Addressing'],
  },
  {
    id: 'tech-int-cn-07',
    subject: 'Computer Networks',
    question: 'What is Flow Control vs Congestion Control in TCP?',
    answer:
      'Flow Control protects the receiving host from being overwhelmed by a fast sender; it uses a Sliding Window where the receiver advertises its available buffer space (`rwnd`) in ACK packets. Congestion Control protects the intermediate network routers from overload; the sender dynamically adjusts its congestion window (`cwnd`) using algorithms like Slow Start, Congestion Avoidance, Fast Retransmit, and Fast Recovery.',
    followUpQuestions: [
      'What is the formula for the effective send window in TCP ($min(rwnd, cwnd)$)?',
    ],
    difficulty: 'Hard',
    tags: ['TCP', 'Flow Control', 'Congestion Control'],
  },
  {
    id: 'tech-int-cn-08',
    subject: 'Computer Networks',
    question: 'What is Subnetting and what does CIDR notation (e.g. `/24`) mean?',
    answer:
      'Subnetting divides a larger network into smaller, manageable subnetworks to reduce broadcast traffic and conserve IP addresses. CIDR (Classless Inter-Domain Routing) notation specifies how many leading bits represent the network prefix. For example, `/24` means the first 24 bits are the network address, leaving $32 - 24 = 8$ bits for host addresses ($2^8 - 2 = 254$ usable hosts).',
    followUpQuestions: [
      'Why do we subtract 2 when calculating usable host addresses in an IPv4 subnet?',
    ],
    difficulty: 'Medium',
    tags: ['Subnetting', 'CIDR', 'IPv4'],
  },
  {
    id: 'tech-int-cn-09',
    subject: 'Computer Networks',
    question: 'What is HTTP vs HTTPS? How does SSL/TLS encryption work?',
    answer:
      'HTTP transmits plaintext over TCP port 80. HTTPS encrypts traffic using TLS/SSL over port 443. How TLS works: 1. Asymmetric Encryption: During the handshake, the client validates the server’s digital certificate and uses the server’s public key to securely exchange a shared secret. 2. Symmetric Encryption: Once the shared secret is established, fast symmetric encryption (e.g. AES-256) is used for all subsequent data transfer.',
    followUpQuestions: [
      'What is a Certificate Authority (CA)?',
      'What is the difference between symmetric and asymmetric encryption?',
    ],
    difficulty: 'Medium',
    tags: ['HTTP', 'HTTPS', 'Security', 'TLS'],
  },
  {
    id: 'tech-int-cn-10',
    subject: 'Computer Networks',
    question: 'What is NAT (Network Address Translation) and why is it essential?',
    answer:
      'NAT translates private non-routable IP addresses (e.g. `192.168.x.x`, `10.x.x.x`) used inside local networks into a single public globally routable IP address when packets leave for the internet. It slowed the exhaustion of IPv4 addresses and provides basic security by preventing outside hosts from directly addressing private machines.',
    followUpQuestions: [
      'What is PAT (Port Address Translation / NAT Overload)?',
    ],
    difficulty: 'Easy',
    tags: ['NAT', 'Routing', 'IPv4'],
  },
  {
    id: 'tech-int-cn-11',
    subject: 'Computer Networks',
    question: 'Explain common HTTP status code ranges and provide examples.',
    answer:
      '1xx: Informational (e.g. 101 Switching Protocols). 2xx: Success (e.g. 200 OK, 201 Created, 204 No Content). 3xx: Redirection (e.g. 301 Moved Permanently, 304 Not Modified). 4xx: Client Error (e.g. 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found). 5xx: Server Error (e.g. 500 Internal Server Error, 502 Bad Gateway, 503 Service Unavailable, 504 Gateway Timeout).',
    followUpQuestions: [
      'What is the difference between 401 Unauthorized and 403 Forbidden?',
      'What causes a 502 Bad Gateway error?',
    ],
    difficulty: 'Easy',
    tags: ['HTTP', 'Status Codes'],
  },
  {
    id: 'tech-int-cn-12',
    subject: 'Computer Networks',
    question: 'What are Cookies, LocalStorage, and SessionStorage in web clients?',
    answer:
      'Cookies are small (4KB) key-value pairs automatically sent with every HTTP request to the server, used for session authentication (`HttpOnly` prevents XSS). LocalStorage stores 5-10MB of persistent key-value data with no expiration until explicitly cleared. SessionStorage stores data for the duration of a single browser tab session, cleared when the tab closes.',
    followUpQuestions: [
      'Why should JWT authentication tokens avoid being stored in unprotected LocalStorage?',
    ],
    difficulty: 'Easy',
    tags: ['Cookies', 'Web Storage', 'Security'],
  },

  // ================= Software Engineering (10 Questions) =================
  {
    id: 'tech-int-se-01',
    subject: 'Software Engineering',
    question: 'What is the Software Development Life Cycle (SDLC) and its primary phases?',
    answer:
      'The SDLC is a structured process used to design, develop, test, and deploy quality software. Phases: 1. Requirement Gathering & Analysis. 2. System Design & Architecture. 3. Implementation / Coding. 4. Testing & Quality Assurance. 5. Deployment / Release. 6. Maintenance & Monitoring.',
    followUpQuestions: [
      'How does the Agile methodology differ from the traditional Waterfall model in SDLC?',
    ],
    difficulty: 'Easy',
    tags: ['SDLC', 'Software Engineering'],
  },
  {
    id: 'tech-int-se-02',
    subject: 'Software Engineering',
    question: 'Explain the Scrum framework: Roles, Artifacts, and Ceremonies.',
    answer:
      'Roles: Product Owner (manages product backlog), Scrum Master (facilitates process and removes blockers), Development Team (builds product increments). Artifacts: Product Backlog, Sprint Backlog, Product Increment. Ceremonies: Sprint Planning, Daily Standup (15m), Sprint Review (demo), Sprint Retrospective (team improvement).',
    followUpQuestions: [
      'What are Story Points and how is Velocity measured in Scrum?',
    ],
    difficulty: 'Easy',
    tags: ['Agile', 'Scrum', 'Ceremonies'],
  },
  {
    id: 'tech-int-se-03',
    subject: 'Software Engineering',
    question: 'What are the different levels of software testing?',
    answer:
      '1. Unit Testing: Tests individual functions, methods, or classes in isolation (fast, automated). 2. Integration Testing: Tests interactions between integrated modules or services (e.g. API and Database). 3. System Testing: Tests the complete end-to-end software application against specifications. 4. Acceptance Testing (UAT): Tested by stakeholders/users to verify business requirements before production launch.',
    followUpQuestions: [
      'What is the Testing Pyramid and why should unit tests form its base?',
    ],
    difficulty: 'Easy',
    tags: ['Testing', 'Unit Testing', 'QA'],
  },
  {
    id: 'tech-int-se-04',
    subject: 'Software Engineering',
    question: 'What is Continuous Integration and Continuous Deployment (CI/CD)?',
    answer:
      'CI (Continuous Integration) is the automated practice of regularly integrating code changes into a central repository, triggering automated builds, linter checks, and unit tests. CD (Continuous Delivery/Deployment) automatically stages and deploys validated code increments to production or staging environments, ensuring releases are fast, repeatable, and low-risk.',
    followUpQuestions: [
      'Name common CI/CD tools used in industry (GitHub Actions, Jenkins, GitLab CI).',
    ],
    difficulty: 'Easy',
    tags: ['CI/CD', 'DevOps'],
  },
  {
    id: 'tech-int-se-05',
    subject: 'Software Engineering',
    question: 'What is the difference between Functional and Non-Functional Requirements?',
    answer:
      'Functional Requirements define what the system should do (specific features, inputs, outputs, business rules; e.g. "User must be able to reset password via email"). Non-Functional Requirements (NFRs) define how the system performs (quality attributes: performance, scalability, security, availability, latency, usability; e.g. "API responses must be under 200ms at 10,000 requests/sec").',
    followUpQuestions: [
      'What is an SLA (Service Level Agreement) and how do 9s of availability calculate?',
    ],
    difficulty: 'Easy',
    tags: ['Requirements', 'System Design'],
  },
  {
    id: 'tech-int-se-06',
    subject: 'Software Engineering',
    question: 'What is Git and how does it manage distributed version control?',
    answer:
      'Git is a distributed version control system where every developer has a full local clone of the entire repository history. It stores snapshots of files (blobs), directory structures (trees), and commit metadata linked as a Directed Acyclic Graph (DAG) using cryptographic SHA-1/SHA-256 hashes.',
    followUpQuestions: [
      'What is the difference between `git pull` and `git fetch`?',
      'How do you resolve a Git merge conflict?',
    ],
    difficulty: 'Easy',
    tags: ['Git', 'Version Control'],
  },
  {
    id: 'tech-int-se-07',
    subject: 'Software Engineering',
    question: 'What are RESTful API architectural constraints?',
    answer:
      '1. Client-Server separation. 2. Statelessness (each request contains all information needed to process it; no server-side session state). 3. Cacheability (responses must explicitly declare cacheability). 4. Uniform Interface (standard HTTP verbs: GET, POST, PUT, DELETE, standard URIs). 5. Layered System (client cannot tell if connected directly to end server or proxy/load balancer).',
    followUpQuestions: [
      'What is the difference between PUT (idempotent full update) and PATCH (partial update)?',
    ],
    difficulty: 'Medium',
    tags: ['REST API', 'Architecture'],
  },
  {
    id: 'tech-int-se-08',
    subject: 'Software Engineering',
    question: 'What is Technical Debt and how should an engineering team handle it?',
    answer:
      'Technical Debt refers to the implied future cost of additional rework caused by choosing an easy, fast solution now instead of a better, well-architected approach. Left unaddressed, it slows development velocity and increases defect rates. Teams manage it by allocating dedicated sprint capacity (e.g. 15-20%) to refactoring, writing automated test coverage, and modularizing legacy components.',
    followUpQuestions: [
      'What are common code smells that signal technical debt?',
    ],
    difficulty: 'Easy',
    tags: ['Technical Debt', 'Refactoring'],
  },
  {
    id: 'tech-int-se-09',
    subject: 'Software Engineering',
    question: 'What is Test-Driven Development (TDD) and its cycle?',
    answer:
      'TDD is a software development methodology where automated tests are written before the actual production code. The cycle is Red-Green-Refactor: 1. Red: Write a failing unit test for the desired feature. 2. Green: Write the minimal code necessary to make the test pass. 3. Refactor: Clean up the code and eliminate duplication while keeping all tests passing.',
    followUpQuestions: [
      'What is the difference between TDD and BDD (Behavior-Driven Development)?',
    ],
    difficulty: 'Medium',
    tags: ['TDD', 'Methodology'],
  },
  {
    id: 'tech-int-se-10',
    subject: 'Software Engineering',
    question: 'What is Monolithic Architecture vs Microservices Architecture?',
    answer:
      'A Monolith bundles all application modules (UI, business logic, database access) into a single unified codebase and deployment binary (simple to develop, deploy, and debug initially). Microservices decompose the system into small, loosely coupled services independently deployed and communicating via lightweight protocols (REST, gRPC, message queues), allowing independent scaling and tech stack freedom at the cost of distributed system complexity.',
    followUpQuestions: [
      'What is Service Discovery and why is it needed in microservices?',
    ],
    difficulty: 'Medium',
    tags: ['Architecture', 'Microservices', 'Monolith'],
  },
];

export const technicalInterviewSubjects: { id: InterviewSubject; name: string; count: number }[] = [
  { id: 'C++', name: 'C++ Language', count: 12 },
  { id: 'OOP', name: 'Object-Oriented Design', count: 10 },
  { id: 'DSA', name: 'Data Structures & Algorithms', count: 12 },
  { id: 'DBMS', name: 'Database Management Systems', count: 12 },
  { id: 'SQL', name: 'SQL Query & Optimization', count: 10 },
  { id: 'Operating Systems', name: 'Operating Systems', count: 12 },
  { id: 'Computer Networks', name: 'Computer Networks', count: 12 },
  { id: 'Software Engineering', name: 'Software Engineering', count: 10 },
];
