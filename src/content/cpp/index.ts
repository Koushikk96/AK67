import { TechnicalTopic, FAQItem } from '@/types/technical';

export const cppTopics: TechnicalTopic[] = [
  {
    id: 'cpp-01-data-types-operators',
    number: 1,
    title: 'Data Types, Variables and Operators',
    category: 'cpp',
    subject: 'C++',
    codeLanguage: 'cpp',
    explanation:
      'C++ is a strongly typed, compiled language. Fundamental data types include bool (1B), char (1B), int (4B), float (4B), double (8B), and long long (8B). Modifiers like unsigned, signed, short, and long alter capacity and range. Operators include arithmetic (+, -, *, /, %), relational, logical (&&, ||, !), bitwise (&, |, ^, ~, <<, >>), and ternary (?:). Type conversion occurs implicitly (widening) or explicitly via static_cast<type>().',
    codeOrSyntax: `#include <iostream>
using namespace std;

int main() {
    int a = 17;
    int b = 5;
    
    double divResult = static_cast<double>(a) / b; // 3.4 instead of integer 3
    int bitwiseAnd = a & b;                         // 17 (10001) & 5 (00101) = 1
    
    cout << "Division: " << divResult << endl;
    cout << "Bitwise AND: " << bitwiseAnd << endl;
    return 0;
}`,
    interviewQuestions: [
      'What is the difference between float and double in C++?',
      'What happens when integer overflow occurs with signed vs unsigned integers?',
      'Why should you prefer static_cast over C-style casting in modern C++?',
    ],
    commonMistakes: [
      'Performing integer division (e.g., 5 / 2 = 2) when expecting floating-point 2.5.',
      'Unsigned integer underflow: subtracting from 0 causes wrap-around to 4,294,967,295.',
      'Confusing bitwise & and | with logical && and ||.',
    ],
    revisionNotes: [
      'int is typically 4 bytes (-2^31 to 2^31 - 1). long long is 8 bytes.',
      'Signed integer overflow is undefined behavior (UB); unsigned wrap-around is modulo 2^N.',
      'Use static_cast<T>(val) for explicit compile-time checked type conversion.',
    ],
  },
  {
    id: 'cpp-02-conditions-loops',
    number: 2,
    title: 'Conditions and Loops',
    category: 'cpp',
    subject: 'C++',
    codeLanguage: 'cpp',
    explanation:
      'Control flow in C++ is handled by conditional branching (if-else, switch-case) and iteration (for loop, while loop, do-while loop, and C++11 range-based for loop). Switch statements evaluate integral/enumeration values and require break statements to prevent fall-through. Range-based for loops iterate cleanly over standard containers and arrays.',
    codeOrSyntax: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> nums = {10, 20, 30, 40};
    
    // Range-based for loop with const reference to prevent copying
    for (const auto& val : nums) {
        if (val == 30) {
            cout << "Found target 30!" << endl;
            break;
        }
    }
    return 0;
}`,
    interviewQuestions: [
      'What is switch fall-through and when is it intentional?',
      'Why is for (const auto& x : container) preferred over for (auto x : container)?',
      'What is the difference between while and do-while loops in execution guarantee?',
    ],
    commonMistakes: [
      'Missing break in switch statement causing unintended cascaded execution.',
      'Writing if (x = 5) [assignment] instead of if (x == 5) [comparison].',
      'Unintentionally copying heavy objects by writing for (auto item : vec) without &.',
    ],
    revisionNotes: [
      'do-while executes at least once even if the condition is initially false.',
      'Always use const auto& in range-based for loops unless modifying or storing primitives.',
      'switch only works on integral types (int, char, enum), not strings or floats.',
    ],
  },
  {
    id: 'cpp-03-functions-recursion',
    number: 3,
    title: 'Functions and Recursion',
    category: 'cpp',
    subject: 'C++',
    codeLanguage: 'cpp',
    explanation:
      'Functions encapsulate reusable logic with parameters and return types. Default arguments must appear at the end of parameter lists. Recursion is a technique where a function calls itself to break problems into smaller subproblems. Every recursive function requires a base condition to terminate and prevent stack overflow (Call Stack exhaustion).',
    codeOrSyntax: `#include <iostream>
using namespace std;

// Recursive computation of power: O(log N)
long long fastPower(long long base, int exp) {
    if (exp == 0) return 1;           // Base condition
    long long half = fastPower(base, exp / 2);
    if (exp % 2 == 0) return half * half;
    return base * half * half;
}

int main() {
    cout << "2^10 = " << fastPower(2, 10) << endl; // 1024
    return 0;
}`,
    interviewQuestions: [
      'What causes a Segmentation Fault (SIGSEGV) in recursive programs?',
      'What is tail call optimization (TCO) and does standard C++ guarantee it?',
      'What is an inline function and how does the compiler treat the inline keyword?',
    ],
    commonMistakes: [
      'Forgetting the base case, leading to infinite recursion and stack overflow.',
      'Placing default parameter values in both header declaration and function definition.',
      'Passing large structures by value inside recursive calls, exhausting stack memory.',
    ],
    revisionNotes: [
      'Call stack stores activation records (local variables, return address, parameters).',
      'Base case stops recursion. Without it: call stack exhausts -> Segmentation fault.',
      'inline is a compiler hint to replace call with code body to avoid function call overhead.',
    ],
  },
  {
    id: 'cpp-04-arrays-strings',
    number: 4,
    title: 'Arrays and Strings',
    category: 'cpp',
    subject: 'C++',
    codeLanguage: 'cpp',
    explanation:
      'C-style arrays are fixed-size contiguous memory blocks lacking bounds checking; they decay to pointers when passed to functions. std::string is a dynamic, null-terminated sequence of characters providing boundary safety, dynamic resizing, and rich member functions (length(), substr(), find(), append()). std::string_view (C++17) provides a non-owning read-only view of a string without allocation.',
    codeOrSyntax: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string s = "PlacementPreparation";
    
    // Substring and search
    string sub = s.substr(0, 9); // "Placement"
    size_t pos = s.find("Prep");
    
    cout << "Sub: " << sub << ", Pos: " << pos << endl;
    return 0;
}`,
    interviewQuestions: [
      'What is array decay in C++?',
      'What is Small String Optimization (SSO) in std::string?',
      'Difference between char str[] = "hello" and const char* str = "hello"?',
    ],
    commonMistakes: [
      'Writing past array bounds (buffer overflow/out-of-bounds index), causing memory corruption.',
      'Using sizeof(arr) inside a function where arr has decayed to a pointer (returns 4 or 8 bytes).',
      'Modifying string literals assigned to char* (triggers Segmentation fault as literals reside in read-only data).',
    ],
    revisionNotes: [
      'C-arrays: no bounds checking, fixed size. Pass size explicitly or use std::array/vector.',
      'SSO (Small String Optimization): strings under ~15-22 chars stored inside object without heap allocation.',
      's[i] does not check bounds; s.at(i) throws std::out_of_range on invalid index.',
    ],
  },
  {
    id: 'cpp-05-pointers-references',
    number: 5,
    title: 'Pointers and References',
    category: 'cpp',
    subject: 'C++',
    codeLanguage: 'cpp',
    explanation:
      'A pointer is a variable holding the memory address of another variable (& is address-of, * is dereference). Pointers can be null, reassigned, and support pointer arithmetic. A reference is an alias to an existing object; it cannot be null, must be initialized on declaration, and cannot be reseated. nullptr (C++11) is type-safe and replaces NULL / 0.',
    codeOrSyntax: `#include <iostream>
using namespace std;

int main() {
    int val = 42;
    int* ptr = &val; // Pointer holds address
    int& ref = val;  // Reference is an alias
    
    *ptr = 100;      // Modifies val via pointer
    ref = 200;       // Modifies val via reference
    
    cout << "val: " << val << ", ptr val: " << *ptr << endl; // 200, 200
    return 0;
}`,
    interviewQuestions: [
      'What are the core differences between pointers and references?',
      'What is a dangling pointer, a void pointer, and a wild pointer?',
      'Why is nullptr preferred over NULL or 0 in modern C++?',
    ],
    commonMistakes: [
      'Dereferencing a nullptr or uninitialized pointer, causing SIGSEGV crash.',
      'Returning a reference or pointer to a local stack variable that dies on function exit.',
      'Failing to free heap memory assigned to a pointer, creating a memory leak.',
    ],
    revisionNotes: [
      'Pointer: can be NULL, re-assignable, supports arithmetic, has its own memory address.',
      'Reference: cannot be null, cannot change what it refers to, syntactic sugar for safe pointer.',
      'Always initialize pointers to nullptr if not immediately bound to a valid address.',
    ],
  },
  {
    id: 'cpp-06-pass-by-value-reference',
    number: 6,
    title: 'Pass by Value vs Pass by Reference',
    category: 'cpp',
    subject: 'C++',
    codeLanguage: 'cpp',
    explanation:
      'Pass by value creates an independent copy of the argument; modifications inside the function do not affect the original caller variable. Pass by reference passes the caller variable itself without copying, allowing direct modification. Pass by const reference (const T&) passes by reference for zero copying overhead while enforcing immutability.',
    codeOrSyntax: `#include <iostream>
#include <vector>
using namespace std;

// Modifies original in place
void swapValues(int& a, int& b) {
    int temp = a;
    a = b;
    b = temp;
}

// Zero-copy, read-only inspection
void printVector(const vector<int>& vec) {
    for (int x : vec) cout << x << " ";
    cout << endl;
}

int main() {
    int x = 5, y = 10;
    swapValues(x, y); // x=10, y=5
    cout << "x=" << x << ", y=" << y << endl;
    return 0;
}`,
    interviewQuestions: [
      'When should you use pass by value instead of pass by const reference?',
      'Why is passing std::vector by value considered an anti-pattern for inspection functions?',
      'How does pass by pointer compare to pass by reference in syntax and safety?',
    ],
    commonMistakes: [
      'Passing large vectors or strings by value in loops/recursive functions, creating huge allocations.',
      'Modifying a parameter intended to be read-only because const was omitted from the reference.',
      'Passing a temporary rvalue (e.g., 5 + 3) to a non-const reference parameter (compilation error).',
    ],
    revisionNotes: [
      'Primitives (int, char, double): pass by value (cheap, fits in CPU registers).',
      'Complex objects (vector, string, structs, classes): pass by const T& (zero copy, read-only).',
      'When output/mutation is required: pass by T& or T*.',
    ],
  },
  {
    id: 'cpp-07-oop-principles',
    number: 7,
    title: 'OOP: Classes, Objects, Encapsulation, Abstraction, Inheritance, Polymorphism',
    category: 'cpp',
    subject: 'C++',
    codeLanguage: 'cpp',
    explanation:
      'The 4 pillars of OOP in C++: Encapsulation bundles data and methods while restricting direct access via access specifiers (public, private, protected). Abstraction exposes essential interfaces while hiding implementation complexity. Inheritance allows derived classes to inherit state and behavior from base classes. Polymorphism enables entities to take multiple forms (compile-time via overloading and run-time via virtual functions).',
    codeOrSyntax: `#include <iostream>
using namespace std;

// Base class (Abstraction & Encapsulation)
class Shape {
protected:
    string name;
public:
    Shape(string n) : name(n) {}
    virtual double area() const = 0; // Pure virtual function
    virtual ~Shape() {}              // Virtual destructor
};

// Derived class (Inheritance & Polymorphism)
class Circle : public Shape {
    double radius;
public:
    Circle(double r) : Shape("Circle"), radius(r) {}
    double area() const override {
        return 3.14159 * radius * radius;
    }
};

int main() {
    Shape* s = new Circle(5.0);
    cout << "Area: " << s->area() << endl; // Dynamic dispatch
    delete s;
    return 0;
}`,
    interviewQuestions: [
      'What are the 4 fundamental pillars of OOP and their specific benefits?',
      'What is the difference between private, protected, and public inheritance?',
      'What is the Diamond Problem in multiple inheritance and how does virtual inheritance solve it?',
    ],
    commonMistakes: [
      'Making member variables public, breaking encapsulation.',
      'Failing to declare virtual destructors in base classes with virtual methods.',
      'Invoking virtual functions from inside constructors or destructors (dynamic binding is disabled).',
    ],
    revisionNotes: [
      'Encapsulation: data hiding + bundled methods. Private variables with getters/setters.',
      'Abstraction: pure virtual base classes (interfaces in C++).',
      'Inheritance: code reuse and hierarchical modeling (class Derived : public Base).',
      'Virtual inheritance (class B : virtual public A) resolves the Diamond Problem.',
    ],
  },
  {
    id: 'cpp-08-constructors-destructors',
    number: 8,
    title: 'Constructors and Destructors',
    category: 'cpp',
    subject: 'C++',
    codeLanguage: 'cpp',
    explanation:
      'A constructor initializes object state upon creation. Types include default, parameterized, copy (ClassName(const ClassName&)), and move (ClassName(ClassName&&)) constructors. Member initializer lists (: member(val)) should be preferred over body assignment for performance. A destructor (~ClassName()) cleans up resources when an object leaves scope. Base class destructors must be virtual when deleting derived objects via base pointers.',
    codeOrSyntax: `#include <iostream>
using namespace std;

class DynamicArray {
    int* data;
    int size;
public:
    // Parameterized constructor with initializer list
    DynamicArray(int s) : size(s), data(new int[s]) {
        cout << "Allocated array of size " << size << endl;
    }
    
    // Destructor to clean up heap memory
    ~DynamicArray() {
        delete[] data;
        cout << "Freed array memory" << endl;
    }
};

int main() {
    {
        DynamicArray arr(5); // Created on stack
    } // arr goes out of scope here -> destructor runs automatically
    return 0;
}`,
    interviewQuestions: [
      'Why must a base class destructor always be virtual if derived objects are deleted via base pointers?',
      'What is the Rule of Three, Rule of Five, and Rule of Zero in C++?',
      'Why is a member initializer list faster than assignment inside the constructor body?',
    ],
    commonMistakes: [
      'Non-virtual base destructor: deleting Derived via Base* causes undefined behavior and derived resource leaks.',
      'Writing ClassName obj(); which the compiler interprets as a function declaration ("Most Vexing Parse").',
      'Using delete instead of delete[] when releasing dynamically allocated arrays.',
    ],
    revisionNotes: [
      'Constructors have no return type and match the class name.',
      'Initializer list is mandatory for const members, references, and base classes without default constructors.',
      'Always add virtual ~Base() {} to polymorphic base classes.',
    ],
  },
  {
    id: 'cpp-09-overloading-vs-overriding',
    number: 9,
    title: 'Function Overloading vs Overriding',
    category: 'cpp',
    subject: 'C++',
    codeLanguage: 'cpp',
    explanation:
      'Function Overloading occurs in the same scope where functions share the same name but differ in parameter count, types, or order (Compile-Time Polymorphism / Early Binding). Return type alone cannot overload. Function Overriding occurs across inheritance hierarchies where a derived class provides a specific implementation of a virtual method defined in the base class (Run-Time Polymorphism / Late Binding).',
    codeOrSyntax: `#include <iostream>
using namespace std;

class Base {
public:
    // Overloading: same class, different signatures
    void display(int x) { cout << "Int: " << x << endl; }
    void display(string s) { cout << "String: " << s << endl; }
    
    // Virtual function for overriding
    virtual void print() { cout << "Base print" << endl; }
};

class Derived : public Base {
public:
    // Overriding: same signature, virtual in base
    void print() override { cout << "Derived print" << endl; }
};

int main() {
    Base b;
    b.display(10);      // Overloaded
    b.display("AK67");  // Overloaded
    
    Base* ptr = new Derived();
    ptr->print();       // "Derived print" (Overridden)
    delete ptr;
    return 0;
}`,
    interviewQuestions: [
      'Can you overload a function based on return type alone? Why not?',
      'What purpose does the C++11 override specifier serve?',
      'What is function hiding in C++ when a derived class declares a method with the same name as base?',
    ],
    commonMistakes: [
      'Assuming changing the return type alone enables function overloading (compile error).',
      'Mispelling overridden method name or signatures without using override keyword (silent hiding bug).',
      'Calling an overridden method via an object value (slicing) instead of pointer/reference.',
    ],
    revisionNotes: [
      'Overloading: Same scope, same name, different parameters. Resolved at compile-time.',
      'Overriding: Base & Derived classes, exact same signature, requires virtual. Resolved at run-time.',
      'Always use override keyword in derived classes to catch signature mismatches at compile time.',
    ],
  },
  {
    id: 'cpp-10-virtual-functions',
    number: 10,
    title: 'Virtual Functions, Pure Virtual Functions, and vtable Mechanics',
    category: 'cpp',
    subject: 'C++',
    codeLanguage: 'cpp',
    explanation:
      'Virtual functions enable dynamic polymorphism (late binding). When a class contains a virtual function, the compiler inserts an internal virtual pointer (vptr) into each object pointing to a virtual table (vtable)—a static table of function pointers for that class. At runtime, calls are dispatched through the vtable. A pure virtual function (= 0) has no implementation in the base class and makes the class abstract (cannot be instantiated).',
    codeOrSyntax: `#include <iostream>
using namespace std;

class AbstractDevice {
public:
    virtual void turnOn() = 0; // Pure virtual function -> Abstract class
    virtual ~AbstractDevice() {}
};

class Laptop : public AbstractDevice {
public:
    void turnOn() override {
        cout << "Booting operating system..." << endl;
    }
};

int main() {
    AbstractDevice* dev = new Laptop();
    dev->turnOn(); // Dispatched at runtime through vtable
    delete dev;
    return 0;
}`,
    interviewQuestions: [
      'How does the vtable and vptr mechanism work internally in memory?',
      'What is the size impact of adding virtual functions to a class?',
      'Can virtual functions be private in C++?',
    ],
    commonMistakes: [
      'Attempting to instantiate an abstract class that has unimplemented pure virtual functions.',
      'Not realizing that vptr increases object size by 8 bytes (on 64-bit systems).',
      'Forgetting that static functions and constructors CANNOT be virtual.',
    ],
    revisionNotes: [
      'vtable: static array of function pointers per class with virtual methods.',
      'vptr: hidden pointer inside each object instance pointing to its class vtable.',
      'Pure virtual function (= 0): creates an abstract class. Derived class must override it.',
      'Constructors cannot be virtual; destructors should be virtual in base classes.',
    ],
  },
  {
    id: 'cpp-11-stack-vs-heap',
    number: 11,
    title: 'Stack vs Heap Memory',
    category: 'cpp',
    subject: 'C++',
    codeLanguage: 'cpp',
    explanation:
      'Stack memory is managed automatically by the CPU; local variables and function call frames live here. Stack allocation is extremely fast (pointer increment) but limited in size (~1MB to 8MB default). Heap memory is managed manually by the programmer (via new/delete or smart pointers). It is much larger but slower, prone to memory fragmentation, and requires explicit deallocation to avoid memory leaks.',
    codeOrSyntax: `#include <iostream>
#include <memory>
using namespace std;

int main() {
    // Stack allocation: auto deallocated when exiting scope
    int stackVal = 50;
    
    // Raw Heap allocation: manual deallocation required
    int* heapPtr = new int(100);
    delete heapPtr; // Must free
    
    // Modern C++: unique_ptr manages heap memory automatically (RAII)
    unique_ptr<int> smartHeap = make_unique<int>(200);
    // Automatically freed when smartHeap leaves scope!
    
    return 0;
}`,
    interviewQuestions: [
      'What happens when stack memory is exhausted (Stack Overflow)?',
      'What is a memory leak and how do smart pointers (unique_ptr, shared_ptr) prevent it?',
      'What is RAII (Resource Acquisition Is Initialization)?',
    ],
    commonMistakes: [
      'Memory leak: allocating heap memory with new and forgetting delete.',
      'Dangling pointer: accessing memory after calling delete.',
      'Double free: calling delete on the same pointer address twice, corrupting heap metadata.',
    ],
    revisionNotes: [
      'Stack: LIFO, automatic cleanup, fast, fixed small size, stores local variables and call frames.',
      'Heap: dynamic size, slower, programmer-managed, stores persistent or large objects.',
      'RAII: tie resource lifespan to object lifetime. Prefer std::unique_ptr and std::shared_ptr.',
    ],
  },
  {
    id: 'cpp-12-stl-containers',
    number: 12,
    title: 'STL: vector, string, map, unordered_map, set, stack, queue, priority_queue',
    category: 'cpp',
    subject: 'C++',
    codeLanguage: 'cpp',
    explanation:
      'The Standard Template Library (STL) provides robust data structures. Sequence containers: vector (dynamic array, O(1) amortized push_back, O(1) random access), deque, list. Associative containers: map & set (Red-Black Tree, ordered, O(log N) lookup/insert). Unordered associative: unordered_map & unordered_set (Hash table, average O(1) lookup, worst O(N)). Container adapters: stack (LIFO), queue (FIFO), priority_queue (Max-Heap by default, O(log N) push/pop).',
    codeOrSyntax: `#include <iostream>
#include <vector>
#include <unordered_map>
#include <queue>
using namespace std;

int main() {
    // 1. Vector: dynamic array
    vector<int> v = {1, 2, 3};
    v.push_back(4);
    
    // 2. Unordered map: Hash Table O(1) avg
    unordered_map<string, int> freq;
    freq["apple"] = 3;
    
    // 3. Min-Heap via priority_queue
    priority_queue<int, vector<int>, greater<int>> minHeap;
    minHeap.push(30); minHeap.push(10); minHeap.push(20);
    cout << "Min top: " << minHeap.top() << endl; // 10
    
    return 0;
}`,
    interviewQuestions: [
      'Difference between std::map (Red-Black Tree) and std::unordered_map (Hash Table)?',
      'What is the growth factor of std::vector when capacity is exceeded?',
      'How to implement a Min-Heap using std::priority_queue?',
    ],
    commonMistakes: [
      'Using map[key] for lookup when key might not exist (it inserts default value!). Use find() or count().',
      'Iterator invalidation: modifying a vector (e.g., push_back) while iterating over it.',
      'Assuming unordered_map is always O(1) (hash collisions can cause worst-case O(N)).',
    ],
    revisionNotes: [
      'vector: contiguous, O(1) amortized push_back, capacity doubles on exhaustion.',
      'map/set: balanced BST (Red-Black), O(log N) all ops, keys strictly sorted.',
      'unordered_map/set: hash table, O(1) average lookup, unsorted keys.',
      'priority_queue: binary heap, default is Max-Heap. Top element is largest.',
    ],
  },
  {
    id: 'cpp-13-stl-algorithms',
    number: 13,
    title: 'Sorting and Searching using STL',
    category: 'cpp',
    subject: 'C++',
    codeLanguage: 'cpp',
    explanation:
      'STL provides high-performance algorithms in <algorithm>. std::sort uses IntroSort (QuickSort + HeapSort + InsertionSort) with guaranteed O(N log N) worst-case time. std::binary_search checks existence in sorted ranges in O(log N). std::lower_bound returns an iterator to the first element >= val; std::upper_bound returns the first element > val. Custom comparators can be passed as lambdas or functions.',
    codeOrSyntax: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> nums = {40, 10, 20, 20, 30, 50};
    
    // Sort ascending: O(N log N)
    sort(nums.begin(), nums.end()); // {10, 20, 20, 30, 40, 50}
    
    // Binary search lower_bound (first element >= 20)
    auto lb = lower_bound(nums.begin(), nums.end(), 20);
    // upper_bound (first element > 20)
    auto ub = upper_bound(nums.begin(), nums.end(), 20);
    
    int count20 = ub - lb; // 2
    cout << "Count of 20: " << count20 << endl;
    return 0;
}`,
    interviewQuestions: [
      'What algorithm does std::sort use internally and what is its worst-case complexity?',
      'Difference between std::lower_bound and std::upper_bound?',
      'Why must the container be sorted before calling std::binary_search?',
    ],
    commonMistakes: [
      'Calling lower_bound / binary_search on an unsorted range (results in undefined behavior).',
      'Writing custom comparator that violates Strict Weak Ordering (causes infinite loop/crashes in sort).',
      'Using std::sort on std::list (list is non-random-access; use list.sort() instead).',
    ],
    revisionNotes: [
      'std::sort(): IntroSort, O(N log N) guaranteed, in-place, not stable.',
      'std::stable_sort(): preserves relative order of equal elements, O(N log N).',
      'lower_bound(first >= target), upper_bound(first > target). Target frequency = ub - lb.',
    ],
  },
  {
    id: 'cpp-14-complexity-analysis',
    number: 14,
    title: 'Time and Space Complexity Analysis',
    category: 'cpp',
    subject: 'C++',
    codeLanguage: 'cpp',
    explanation:
      'Asymptotic analysis measures algorithm scalability with input size N. Big-O (O) represents an upper bound (worst-case), Omega (Omega) represents a lower bound (best-case), and Theta (Theta) represents a tight bound. Common complexities: O(1) constant, O(log N) logarithmic, O(N) linear, O(N log N) linearithmic, O(N^2) quadratic, O(2^N) exponential. Space complexity measures auxiliary memory plus input storage.',
    codeOrSyntax: `#include <iostream>
using namespace std;

// O(log N) Time, O(1) Space
int binarySearch(const int arr[], int n, int target) {
    int low = 0, high = n - 1;
    while (low <= high) {
        int mid = low + (high - low) / 2; // Prevents overflow
        if (arr[mid] == target) return mid;
        else if (arr[mid] < target) low = mid + 1;
        else high = mid - 1;
    }
    return -1;
}

int main() {
    int arr[] = {2, 4, 6, 8, 10};
    cout << "Index of 8: " << binarySearch(arr, 5, 8) << endl; // 3
    return 0;
}`,
    interviewQuestions: [
      'Why is (low + high) / 2 prone to integer overflow and how do you fix it?',
      'What is the difference between Time Complexity and Execution Time?',
      'What is Amortized Time Complexity and give an example in C++ STL?',
    ],
    commonMistakes: [
      'Assuming recursive calls have O(1) space (recursive call stack consumes O(depth) memory).',
      'Ignoring string copies or object copies inside loops (turns O(N) into O(N^2)).',
      'Calculating mid as (low + high) / 2, which can overflow 32-bit signed int.',
    ],
    revisionNotes: [
      'Rule of thumb: 10^8 operations take ~1.0 second in competitive programming / placement tests.',
      'N <= 10^5: target O(N) or O(N log N). N <= 10^3: O(N^2) might pass. N <= 20: O(2^N).',
      'Always calculate mid = low + (high - low) / 2 to prevent integer overflow.',
    ],
  },
  {
    id: 'cpp-15-shallow-vs-deep-copy',
    number: 15,
    title: 'Shallow Copy vs Deep Copy',
    category: 'cpp',
    subject: 'C++',
    codeLanguage: 'cpp',
    explanation:
      'A Shallow Copy copies an object member-by-member. For pointer members, it copies the memory address rather than the data pointed to; both objects end up pointing to the exact same heap memory. When one is destroyed, its destructor frees the memory, leaving the other object with a dangling pointer (and causing a double free crash). A Deep Copy allocates separate heap memory and duplicates the underlying data.',
    codeOrSyntax: `#include <iostream>
using namespace std;

class DeepCopyExample {
    int* data;
public:
    DeepCopyExample(int val) : data(new int(val)) {}
    
    // Deep Copy Constructor: allocates fresh heap memory
    DeepCopyExample(const DeepCopyExample& other) : data(new int(*other.data)) {}
    
    ~DeepCopyExample() {
        delete data; // Safe! Each object owns its own memory
    }
    
    void setValue(int val) { *data = val; }
    int getValue() const { return *data; }
};

int main() {
    DeepCopyExample obj1(10);
    DeepCopyExample obj2 = obj1; // Deep copy invoked
    obj2.setValue(99);
    
    cout << "obj1: " << obj1.getValue() << ", obj2: " << obj2.getValue() << endl; // 10, 99
    return 0;
}`,
    interviewQuestions: [
      'What happens when a class with raw pointer members uses the default copy constructor?',
      'How does the Rule of Three relate to shallow vs deep copying?',
      'How do move constructors (C++11) eliminate expensive deep copies?',
    ],
    commonMistakes: [
      'Relying on the compiler-generated default copy constructor when managing raw pointer resources.',
      'Forgetting to overload the copy assignment operator (operator=) alongside the copy constructor.',
      'Failing to handle self-assignment (if (this == &other) return *this;) in copy assignment.',
    ],
    revisionNotes: [
      'Default copy constructor performs shallow copy (bitwise copy).',
      'Shallow copy of pointer -> double free error upon destruction and dangling pointer.',
      'Deep copy allocates new memory and copies the actual values.',
    ],
  },
  {
    id: 'cpp-16-exception-handling',
    number: 16,
    title: 'Exception Handling in C++',
    category: 'cpp',
    subject: 'C++',
    codeLanguage: 'cpp',
    explanation:
      'Exception handling manages runtime anomalies using try, catch, and throw. Code that might fail is enclosed in a try block. If an error occurs, throw transmits an exception object (derived from std::exception, like std::runtime_error, std::invalid_argument, or std::out_of_range). Stack unwinding cleanly destroys local stack objects created inside the try block before catching.',
    codeOrSyntax: `#include <iostream>
#include <stdexcept>
using namespace std;

double safeDivide(double a, double b) {
    if (b == 0.0) {
        throw runtime_error("Division by zero error!");
    }
    return a / b;
}

int main() {
    try {
        double result = safeDivide(10.0, 0.0);
        cout << "Result: " << result << endl;
    } catch (const exception& e) {
        cout << "Caught exception: " << e.what() << endl;
    }
    return 0;
}`,
    interviewQuestions: [
      'What is stack unwinding during exception handling in C++?',
      'Why should you never throw an exception from inside a destructor?',
      'Difference between catch (const std::exception& e) and catch (...) ?',
    ],
    commonMistakes: [
      'Throwing exceptions from destructors (if an exception is already active, std::terminate is called immediately).',
      'Catching exceptions by value instead of const reference (causes object slicing of exception classes).',
      'Using exceptions for routine control flow (exceptions are relatively expensive in runtime overhead).',
    ],
    revisionNotes: [
      'Standard hierarchy: std::exception -> std::runtime_error, std::logic_error, std::bad_alloc.',
      'Always catch exceptions by const reference: catch (const std::exception& e).',
      'noexcept specifier signals that a function guarantees never to throw, enabling compiler optimizations.',
    ],
  },
  {
    id: 'cpp-17-const-and-static',
    number: 17,
    title: 'Const and Static Keywords in C++',
    category: 'cpp',
    subject: 'C++',
    codeLanguage: 'cpp',
    explanation:
      'const enforces immutability. For pointers: const int* p (data is const), int* const p (pointer address is const), const int* const p (both const). Const member functions (void foo() const) guarantee not to modify class member variables. static creates entity persistence across function calls, or class-level shared state across all object instances (shared memory, called via ClassName::member).',
    codeOrSyntax: `#include <iostream>
using namespace std;

class Student {
    static int studentCount; // Shared across all instances
    const int rollNo;        // Immutable per instance
public:
    Student(int r) : rollNo(r) {
        studentCount++;
    }
    
    // Const member function: cannot modify member variables
    int getRollNo() const {
        return rollNo;
    }
    
    // Static member function: can only access static members
    static int getCount() {
        return studentCount;
    }
};

int Student::studentCount = 0; // Static member definition outside class

int main() {
    Student s1(101);
    Student s2(102);
    cout << "Total Students: " << Student::getCount() << endl; // 2
    return 0;
}`,
    interviewQuestions: [
      'What is the difference between const int* p, int* const p, and const int* const p?',
      'Can a static member function access non-static member variables? Why or why not?',
      'What is the mutable keyword in C++?',
    ],
    commonMistakes: [
      'Forgetting to define and allocate static member variables outside the class definition.',
      'Attempting to call non-static methods or access this pointer from a static member function.',
      'Modifying class state inside a const member function without declaring the variable mutable.',
    ],
    revisionNotes: [
      'Read pointer declarations backwards: const int* p is pointer to const int; int* const p is const pointer to int.',
      'const member function: cannot alter any non-mutable member variable.',
      'static member variable: single copy shared by all class objects; initialized outside class in source file.',
      'static function has no this pointer.',
    ],
  },
];

export const cppInterviewFAQs: FAQItem[] = [
  {
    id: 'cpp-faq-01',
    question: 'Why does C++ support both pointers and references?',
    shortAnswer: 'References provide safety, cannot be null, and avoid pointer syntax for operator overloading; pointers provide low-level control, optionality (nullptr), arithmetic, and dynamic reseating.',
    category: 'C++ Mechanics',
  },
  {
    id: 'cpp-faq-02',
    question: 'What is the "Diamond Problem" and how is it resolved?',
    shortAnswer: 'Occurs in multiple inheritance when a class inherits from two classes sharing a common ancestor, creating two copies of the base. Resolved using virtual inheritance (class B : virtual public A).',
    category: 'OOP',
  },
  {
    id: 'cpp-faq-03',
    question: 'Why should base class destructors always be declared virtual?',
    shortAnswer: 'To ensure that when a derived object is deleted through a base pointer (delete basePtr;), the derived class destructor executes first, preventing resource leaks.',
    category: 'Memory & OOP',
  },
  {
    id: 'cpp-faq-04',
    question: 'What is Object Slicing in C++?',
    shortAnswer: 'Occurs when a derived class object is assigned to a base class object by value. The derived-specific members and virtual table pointer are "sliced off", losing polymorphic behavior.',
    category: 'OOP',
  },
  {
    id: 'cpp-faq-05',
    question: 'What is the difference between malloc/free and new/delete?',
    shortAnswer: 'new/delete calls constructors/destructors, is type-safe, and returns typed pointers; malloc/free only allocates/deallocates raw bytes without constructor invocation.',
    category: 'Memory',
  },
  {
    id: 'cpp-faq-06',
    question: 'What is std::unique_ptr vs std::shared_ptr?',
    shortAnswer: 'unique_ptr represents exclusive ownership (zero overhead, move-only); shared_ptr represents reference-counted shared ownership (freed when count reaches 0).',
    category: 'Modern C++',
  },
  {
    id: 'cpp-faq-07',
    question: 'What is the difference between unordered_map and map?',
    shortAnswer: 'map is backed by a Red-Black Tree (O(log N) lookup, keys sorted); unordered_map is backed by a Hash Table (O(1) average lookup, unsorted keys).',
    category: 'STL',
  },
  {
    id: 'cpp-faq-08',
    question: 'What is the Rule of Five in modern C++?',
    shortAnswer: 'If you define any of: Destructor, Copy Constructor, Copy Assignment, Move Constructor, or Move Assignment, you should explicitly define or delete all five.',
    category: 'Modern C++',
  },
  {
    id: 'cpp-faq-09',
    question: 'What does the static keyword do inside a function?',
    shortAnswer: 'It initializes the local variable once and preserves its value across subsequent invocations of that function throughout the entire program lifetime.',
    category: 'Keywords',
  },
  {
    id: 'cpp-faq-10',
    question: 'What is the difference between prefix (++i) and postfix (i++) operators?',
    shortAnswer: 'Prefix (++i) increments and returns the new value by reference (no copy); postfix (i++) creates a temporary copy of the old value, increments, and returns the copy.',
    category: 'C++ Mechanics',
  },
  {
    id: 'cpp-faq-11',
    question: 'What is RAII (Resource Acquisition Is Initialization)?',
    shortAnswer: 'A core C++ idiom where resource lifecycle (memory, file handles, mutexes) is tied to object lifetime, guaranteeing automatic cleanup in destructors even on exceptions.',
    category: 'Core Idiom',
  },
  {
    id: 'cpp-faq-12',
    question: 'What is nullptr and why was NULL replaced?',
    shortAnswer: 'NULL is an integer 0 or ((void*)0), causing ambiguities in function overloading. nullptr is a distinct type (std::nullptr_t) that only implicitly converts to pointer types.',
    category: 'Modern C++',
  },
  {
    id: 'cpp-faq-13',
    question: 'What is a Pure Virtual Function and an Abstract Class?',
    shortAnswer: 'A pure virtual function has = 0 and no base implementation. Any class containing at least one pure virtual function is an abstract class and cannot be instantiated.',
    category: 'OOP',
  },
  {
    id: 'cpp-faq-14',
    question: 'What is the difference between struct and class in C++?',
    shortAnswer: 'Members and base classes default to public in struct; they default to private in class. Functionally they are identical in all other capabilities.',
    category: 'C++ Mechanics',
  },
  {
    id: 'cpp-faq-15',
    question: 'What is std::move and does it actually move data?',
    shortAnswer: 'std::move does not move data; it unconditionally casts an lvalue to an rvalue reference (static_cast<T&&>), enabling move constructors to steal resources without deep copying.',
    category: 'Modern C++',
  },
];
