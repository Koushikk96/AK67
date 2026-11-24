import { MasteryTopic, MasteryModule } from '@/types/mastery';

export const module2Topics: MasteryTopic[] = [
  {
    "id": "java-12-methods-parameters",
    "moduleId": "java-m2",
    "moduleNumber": 2,
    "moduleTitle": "Java Core Programming",
    "topicNumber": 12,
    "title": "Methods, Parameters & Pass-by-Value Semantics",
    "language": "java",
    "level": "Beginner",
    "whyItMatters": "The single most misunderstood concept in Java interviews is parameter passing. Candidates often mistakenly claim \"primitives are pass-by-value, objects are pass-by-reference\". In Java, EVERYTHING is strictly pass-by-value.",
    "explanation": "Java is strictly pass-by-value at all times. What is passed to a method is always a copy of the value:\n1. Primitive types (int, double, etc.): A copy of the actual binary value is passed. Modifying the parameter inside the method has zero effect on the caller’s variable.\n2. Object references: A copy of the reference address (the pointer value) is passed. Both caller and callee reference copies point to the same object on the Heap. Therefore:\n   - Modifying the internal state of the object via the reference (e.g., `p.setName(\"Bob\")`) mutates the shared heap object.\n   - Reassigning the parameter to a new object (e.g., `p = new Person(\"Charlie\")`) merely alters the local reference copy; the caller still points to the original object.\nMethods specify an access modifier, return type (or void), name, parameter list, and optional throws clause.",
    "syntaxAndStructure": "// Method syntax:\npublic static int add(int a, int b) {\n    return a + b;\n}\n\n// Pass-by-value proof with objects:\nvoid modify(StringBuilder sb) {\n    sb.append(\" modified\"); // Mutates shared heap object\n    sb = new StringBuilder(\"new\"); // Reassigns local copy only; caller unaffected\n}",
    "codeExamples": [
      {
        "title": "Definitive Proof of Pass-by-Value in Java",
        "code": "public class PassByValueProof {\n    static class DataHolder {\n        int value;\n        DataHolder(int v) { this.value = v; }\n    }\n\n    public static void reassign(DataHolder d) {\n        d = new DataHolder(999); // Reassigns local reference only\n    }\n\n    public static void mutate(DataHolder d) {\n        d.value = 500; // Mutates object on heap\n    }\n\n    public static void main(String[] args) {\n        DataHolder original = new DataHolder(100);\n\n        reassign(original);\n        System.out.println(\"After reassign attempt: \" + original.value); // Still 100\n\n        mutate(original);\n        System.out.println(\"After mutate invocation: \" + original.value); // 500\n    }\n}",
        "expectedOutput": "After reassign attempt: 100\nAfter mutate invocation: 500",
        "explanation": "reassign() fails to replace the caller’s instance because Java passes a copy of the reference address. mutate() changes the heap object because both reference copies point to the same address."
      },
      {
        "title": "Primitive Parameter Invariance Demo",
        "code": "public class PrimitivePassingDemo {\n    public static void increment(int x) {\n        x = x + 10;\n        System.out.println(\"Value inside method: \" + x);\n    }\n\n    public static void main(String[] args) {\n        int original = 25;\n        increment(original);\n        System.out.println(\"Value in caller after method: \" + original);\n    }\n}",
        "expectedOutput": "Value inside method: 35\nValue in caller after method: 25",
        "explanation": "The primitive value 25 was copied to the stack frame of increment(). Modifying x altered only the stack frame copy."
      }
    ],
    "realWorldApplications": [
      "Designing immutable data transfer objects (DTOs) and defensive copying in API services.",
      "Avoiding unintended side effects in shared domain models across multi-layered services."
    ],
    "commonMistakes": [
      "Believing that passing an object passes it \"by reference\". Reassigning `param = new Object()` never modifies the caller.",
      "Expecting a `swap(int a, int b)` method to swap two numbers in Java without wrapping them in an array or container object.",
      "Believing that object parameters in Java are passed by reference rather than passing copies of reference pointers by value."
    ],
    "interviewRelevance": "Universal interview question: \"Is Java pass-by-value or pass-by-reference? Write code proving your answer.\"",
    "checkpoints": [
      {
        "id": "java-12-cp-1",
        "label": "Explain why Java is strictly pass-by-value for both primitives and object references"
      },
      {
        "id": "java-12-cp-2",
        "label": "Demonstrate mutation of heap state vs reassigning parameter references"
      },
      {
        "id": "java-12-methods-parameters-cp-3",
        "label": "Prove pass-by-value mechanics for both primitives and object references."
      }
    ],
    "practiceExercises": [
      {
        "id": "java-12-ex-1",
        "title": "Swap Object References Failure",
        "difficulty": "Beginner",
        "type": "conceptual",
        "prompt": "Why does public static void swap(Integer a, Integer b) { Integer temp = a; a = b; b = temp; } fail to swap two variables in the caller?",
        "solution": "Because `a` and `b` inside `swap` are local copies of the reference pointers on the stack frame of `swap`. Swapping local copies changes what the local variables point to, but leaves the caller's reference variables unchanged. Furthermore, Integer is immutable, so its internal value cannot be modified.",
        "explanation": "Java pass-by-value copies references; reassigning them within the method has no effect on caller variables."
      },
      {
        "id": "java-12-ex-2",
        "title": "Successful Object Swap with Wrapper",
        "difficulty": "Intermediate",
        "type": "coding",
        "prompt": "Implement a working swap function that swaps two integers using a mutable wrapper or array.",
        "solution": "public class SwapUsingArray {\n    public static void swap(int[] arr, int i, int j) {\n        int temp = arr[i];\n        arr[i] = arr[j];\n        arr[j] = temp;\n    }\n    public static void main(String[] args) {\n        int[] pair = { 10, 20 };\n        swap(pair, 0, 1);\n        System.out.println(\"Swapped: \" + pair[0] + \", \" + pair[1]);\n    }\n}",
        "explanation": "Because the array object on the heap is mutated through the shared reference, the caller sees the swapped values."
      },
      {
        "id": "java-12-ex-3",
        "title": "Defensive Copying in Setters",
        "difficulty": "Advanced",
        "type": "coding",
        "prompt": "Write a class Employee holding a java.util.Date joiningDate, showing why storing the reference directly causes security flaws, and fix it using defensive copying.",
        "solution": "import java.util.Date;\n\npublic class Employee {\n    private final Date joiningDate;\n\n    public Employee(Date d) {\n        // Defensive copy on constructor\n        this.joiningDate = new Date(d.getTime());\n    }\n\n    public Date getJoiningDate() {\n        // Defensive copy on getter\n        return new Date(this.joiningDate.getTime());\n    }\n\n    public static void main(String[] args) {\n        Date original = new Date();\n        Employee emp = new Employee(original);\n        original.setTime(0); // Attempt to mutate\n        System.out.println(\"Joining date preserved: \" + (emp.getJoiningDate().getTime() != 0));\n    }\n}",
        "explanation": "Defensive copying on both input and output isolates internal state from external mutation through shared references."
      }
    ],
    "quizQuestions": [
      {
        "id": "java-12-q1",
        "question": "Which statement accurately describes parameter passing in Java?",
        "options": [
          "Primitives are pass-by-value; Objects are pass-by-reference",
          "Everything in Java is strictly pass-by-value",
          "Methods can declare pass-by-reference using the & symbol",
          "Arrays are pass-by-reference, other objects are pass-by-value"
        ],
        "correctOptionIndex": 1,
        "explanation": "Java is strictly pass-by-value. For objects, the value passed is the reference address itself."
      },
      {
        "id": "java-12-q2",
        "question": "What happens if you reassign an object parameter inside a method (e.g. `param = new MyClass();`)?",
        "options": [
          "The caller variable is updated to point to the new object",
          "Only the local parameter reference in the method stack frame changes; the caller is unaffected",
          "A NullPointerException is thrown",
          "The compiler rejects reference reassignment"
        ],
        "correctOptionIndex": 1,
        "explanation": "Reassigning the parameter variable only changes the local copy of the pointer inside the callee method."
      }
    ],
    "revisionNotes": [
      "Java is strictly pass-by-value for both primitives and object references.",
      "Modifying object fields via a parameter mutates the shared heap object.",
      "Reassigning the parameter reference variable has no effect on the caller."
    ]
  },
  {
    "id": "java-13-method-overloading",
    "moduleId": "java-m2",
    "moduleNumber": 2,
    "moduleTitle": "Java Core Programming",
    "topicNumber": 13,
    "title": "Method Overloading, Signature Resolution & Type Promotion",
    "language": "java",
    "level": "Beginner",
    "whyItMatters": "Method overloading provides compile-time polymorphism. Understanding how the compiler resolves overloaded methods with type promotion, autoboxing, and varargs prevents ambiguous invocation compiler errors.",
    "explanation": "Method Overloading occurs when a class has multiple methods with the same name but different signatures (different parameter counts, different parameter types, or different order of types).\nRules for Overloading:\n1. Return type, access modifiers, or thrown exceptions DO NOT constitute overloading. Changing only the return type causes a compile error.\n2. Compiler Resolution Order:\n   - Phase 1: Exact type match without boxing or varargs.\n   - Phase 2: Widening primitive promotion (e.g., int -> long -> float -> double).\n   - Phase 3: Autoboxing / Unboxing (e.g., int -> Integer).\n   - Phase 4: Variable-length arguments (varargs).\n3. Ambiguity: If two overloaded methods match equally (e.g. `test(int, long)` and `test(long, int)` invoked with `test(10, 10)`), the compiler throws an ambiguous method call error.",
    "syntaxAndStructure": "public class Calculator {\n    // Valid overloads:\n    public int add(int a, int b) { return a + b; }\n    public double add(double a, double b) { return a + b; }\n    public int add(int a, int b, int c) { return a + b + c; }\n    \n    // INVALID: Only return type changed (compile error)\n    // public double add(int a, int b) { ... }\n}",
    "codeExamples": [
      {
        "title": "Compiler Resolution: Widening vs Autoboxing",
        "code": "public class OverloadResolutionDemo {\n    public static void display(long val) {\n        System.out.println(\"Invoked display(long): \" + val);\n    }\n\n    public static void display(Integer val) {\n        System.out.println(\"Invoked display(Integer): \" + val);\n    }\n\n    public static void main(String[] args) {\n        int x = 42;\n        // Compiler prefers widening (int -> long) over autoboxing (int -> Integer)\n        display(x);\n    }\n}",
        "expectedOutput": "Invoked display(long): 42",
        "explanation": "Java compiler resolution precedence strictly prioritizes primitive widening over autoboxing for backward compatibility with pre-Java 5 code."
      },
      {
        "title": "Reference Type Most Specific Overload Resolution",
        "code": "public class SpecificityDemo {\n    public static void printType(Object obj) {\n        System.out.println(\"Invoked printType(Object)\");\n    }\n\n    public static void printType(String str) {\n        System.out.println(\"Invoked printType(String)\");\n    }\n\n    public static void main(String[] args) {\n        // String is a subclass of Object; compiler chooses most specific matching method\n        printType(\"Placement 2026\");\n        printType(null); // String is more specific than Object\n    }\n}",
        "expectedOutput": "Invoked printType(String)\nInvoked printType(String)",
        "explanation": "When passing null, both Object and String are valid candidate parameters. The compiler selects String because it is more specific (subclass of Object)."
      }
    ],
    "realWorldApplications": [
      "Creating versatile library APIs (e.g., `String.valueOf(int)`, `String.valueOf(char[])`, `String.valueOf(Object)`).",
      "Configuring builder and utility classes with intuitive, unified method naming."
    ],
    "commonMistakes": [
      "Attempting to overload methods by changing only the return type, which results in a compile error.",
      "Overloading methods with ambiguous signatures like `method(String s, Object o)` and `method(Object o, String s)` when called with `method(null, null)`.",
      "Attempting to overload methods solely by changing their return type or access modifier without changing parameter lists."
    ],
    "interviewRelevance": "Classic placement test questions test overload resolution with null arguments and primitive widening vs autoboxing.",
    "checkpoints": [
      {
        "id": "java-13-cp-1",
        "label": "Know the 4 phases of overload resolution: Exact -> Widening -> Boxing -> Varargs"
      },
      {
        "id": "java-13-cp-2",
        "label": "Explain why return type alone cannot overload a method in Java"
      },
      {
        "id": "java-13-method-overloading-cp-3",
        "label": "Identify how the compiler resolves the most specific method in overloaded hierarchies."
      }
    ],
    "practiceExercises": [
      {
        "id": "java-13-ex-1",
        "title": "Predict Ambiguous Overload Call",
        "difficulty": "Beginner",
        "type": "conceptual",
        "prompt": "Given void test(int a, double b) and void test(double a, int b), what happens if you call test(10, 10)?",
        "solution": "Compile error: \"The method test is ambiguous for the type\". Both methods require one widening conversion (first promotes second arg, second promotes first arg), and neither is more specific than the other.",
        "explanation": "Symmetric type promotions with equal specificity cause ambiguous invocation errors."
      },
      {
        "id": "java-13-ex-2",
        "title": "Overload with Varargs Priority",
        "difficulty": "Intermediate",
        "type": "coding",
        "prompt": "Write two overloaded methods: one taking (int a, int b) and one taking (int... nums). Demonstrate that the exact match is chosen over varargs.",
        "solution": "public class VarargsOverload {\n    public static void process(int a, int b) {\n        System.out.println(\"Exact match (int, int) executed\");\n    }\n    public static void process(int... nums) {\n        System.out.println(\"Varargs executed\");\n    }\n    public static void main(String[] args) {\n        process(1, 2);\n        process(1, 2, 3);\n    }\n}",
        "explanation": "The compiler prioritizes fixed-arity methods over variable-arity (varargs) methods."
      },
      {
        "id": "java-13-ex-3",
        "title": "Overload Resolution with Sibling Classes and Null",
        "difficulty": "Advanced",
        "type": "conceptual",
        "prompt": "If a class has print(String s) and print(Integer i), what happens if you invoke print(null)?",
        "solution": "Compile error: \"The method print is ambiguous\". Neither String nor Integer is a subclass of the other (they are sibling types inheriting from Object). The compiler cannot determine which one is more specific.",
        "explanation": "Null matches any reference type, but sibling classes with no inheritance relationship produce ambiguity."
      }
    ],
    "quizQuestions": [
      {
        "id": "java-13-q1",
        "question": "Which of the following method declarations is a valid overload for: public int calc(int a, int b)?",
        "options": [
          "public double calc(int a, int b)",
          "private int calc(int a, int b)",
          "public double calc(int a, double b)",
          "public int calc(int x, int y)"
        ],
        "correctOptionIndex": 2,
        "explanation": "Overloading requires a change in parameter list. Option 3 changes the second parameter type to double."
      },
      {
        "id": "java-13-q2",
        "question": "Between primitive widening (e.g. int -> long) and autoboxing (e.g. int -> Integer), which does the Java compiler prefer during overload resolution?",
        "options": [
          "Autoboxing is preferred over widening",
          "Primitive widening is preferred over autoboxing",
          "Both have equal precedence, causing compile error",
          "Depends on the JVM vendor"
        ],
        "correctOptionIndex": 1,
        "explanation": "Widening primitive conversion is evaluated before autoboxing for backward compatibility with Java 1.4."
      }
    ],
    "revisionNotes": [
      "Method overloading is resolved at compile time based on parameter types, count, and order.",
      "Return type, access modifiers, and throws clauses do NOT participate in method overloading.",
      "Resolution order: Exact Match -> Widening -> Autoboxing -> Varargs."
    ]
  },
  {
    "id": "java-14-recursion",
    "moduleId": "java-m2",
    "moduleNumber": 2,
    "moduleTitle": "Java Core Programming",
    "topicNumber": 14,
    "title": "Recursion, Call Stack Mechanics & Tail Call Limitations",
    "language": "java",
    "level": "Beginner",
    "whyItMatters": "Recursion is the engine of tree traversals, graph algorithms, and dynamic programming. Understanding how activation records are pushed and popped on the thread stack and why Java does not support tail call optimization (TCO) is essential for avoiding StackOverflowError.",
    "explanation": "A method is recursive if it calls itself directly or indirectly. Every recursive method requires two essential components:\n1. Base Case: The terminating condition that returns a value without further recursion.\n2. Recursive Step: The progression where the problem size shrinks toward the base case.\n\nCall Stack Mechanics:\nEach recursive call allocates a new Stack Frame containing local variables, method arguments, and the return address. When depth exceeds the thread stack size (configured via `-Xss`), the JVM throws `StackOverflowError`.\n\nTail Call Optimization (TCO):\nUnlike languages like Scala, Haskell, or Scheme, standard HotSpot JVM implementations DO NOT optimize tail-recursive calls. A tail-recursive method in Java still pushes a new stack frame for each call, meaning iterative loops are preferred for deep computations to maintain $O(1)$ stack space.",
    "syntaxAndStructure": "// Classic Structure:\npublic int factorial(int n) {\n    // 1. Base case\n    if (n <= 1) return 1;\n    // 2. Recursive step\n    return n * factorial(n - 1);\n}\n\n// Tail-recursive form (still not optimized in HotSpot):\npublic int tailFact(int n, int accumulator) {\n    if (n <= 1) return accumulator;\n    return tailFact(n - 1, n * accumulator);\n}",
    "codeExamples": [
      {
        "title": "Recursive Fibonacci vs Memoized Optimization",
        "code": "public class RecursionEfficiencyDemo {\n    // Naive recursive: Exponential O(2^N) time, O(N) call stack space\n    public static long fibNaive(int n) {\n        if (n <= 1) return n;\n        return fibNaive(n - 1) + fibNaive(n - 2);\n    }\n\n    // Memoized recursion: Linear O(N) time, O(N) call stack space\n    public static long fibMemo(int n, long[] memo) {\n        if (n <= 1) return n;\n        if (memo[n] != 0) return memo[n];\n        return memo[n] = fibMemo(n - 1, memo) + fibMemo(n - 2, memo);\n    }\n\n    public static void main(String[] args) {\n        int n = 10;\n        System.out.println(\"Fibonacci(\" + n + \") naive: \" + fibNaive(n));\n        \n        long[] memo = new long[n + 1];\n        System.out.println(\"Fibonacci(\" + n + \") memoized: \" + fibMemo(n, memo));\n    }\n}",
        "expectedOutput": "Fibonacci(10) naive: 55\nFibonacci(10) memoized: 55",
        "explanation": "Naive recursion recomputes overlapping subproblems exponentially. Memoization stores computed values in an array, pruning the recursion tree to O(N)."
      },
      {
        "title": "GCD Calculation via Euclidean Algorithm",
        "code": "public class EuclidsGcdDemo {\n    public static int gcd(int a, int b) {\n        if (b == 0) return a; // Base case\n        return gcd(b, a % b); // Recursive step\n    }\n\n    public static void main(String[] args) {\n        System.out.println(\"GCD(48, 18): \" + gcd(48, 18));\n        System.out.println(\"GCD(101, 10): \" + gcd(101, 10));\n    }\n}",
        "expectedOutput": "GCD(48, 18): 6\nGCD(101, 10): 1",
        "explanation": "Euclidean algorithm computes the greatest common divisor in O(log(min(a,b))) stack frames by taking remainders."
      }
    ],
    "realWorldApplications": [
      "Traversing nested JSON AST hierarchies, directory trees in file systems, and document object models (DOM).",
      "Implementing Divide and Conquer algorithms like Merge Sort, Quick Sort, and Binary Tree traversals."
    ],
    "commonMistakes": [
      "Missing or incorrect base condition, causing infinite recursion leading to `StackOverflowError`.",
      "Assuming HotSpot JVM optimizes tail recursion into loops; writing deep recursion in production Java risks stack exhaustion.",
      "Omitting a valid base case or failing to reduce problem size, causing stack frames to exhaust thread memory with StackOverflowError."
    ],
    "interviewRelevance": "Frequent interview question: \"Why does Java not support Tail Call Optimization?\", \"Trace the call stack for Tower of Hanoi\", and \"Convert recursion to iteration using an explicit Stack\".",
    "checkpoints": [
      {
        "id": "java-14-cp-1",
        "label": "Identify base case and recursive progress conditions in algorithms"
      },
      {
        "id": "java-14-cp-2",
        "label": "Explain why HotSpot JVM throws StackOverflowError even on tail-recursive methods"
      },
      {
        "id": "java-14-recursion-cp-3",
        "label": "Analyze call stack depth and convert deep recursion into iterative or tail-recursive algorithms."
      }
    ],
    "practiceExercises": [
      {
        "id": "java-14-ex-1",
        "title": "Tower of Hanoi Solver",
        "difficulty": "Beginner",
        "type": "coding",
        "prompt": "Implement towerOfHanoi(int n, char from, char to, char aux) to print moves for 3 disks.",
        "solution": "public class TowerOfHanoi {\n    public static void solve(int n, char from, char to, char aux) {\n        if (n == 1) {\n            System.out.println(\"Move disk 1 from \" + from + \" to \" + to);\n            return;\n        }\n        solve(n - 1, from, aux, to);\n        System.out.println(\"Move disk \" + n + \" from \" + from + \" to \" + to);\n        solve(n - 1, aux, to, from);\n    }\n    public static void main(String[] args) {\n        solve(3, 'A', 'C', 'B');\n    }\n}",
        "explanation": "Solves the 3-peg puzzle in 2^n - 1 = 7 steps using divide-and-conquer recursion."
      },
      {
        "id": "java-14-ex-2",
        "title": "Binary Tree In-Order Traversal",
        "difficulty": "Intermediate",
        "type": "coding",
        "prompt": "Write a recursive in-order traversal (Left, Root, Right) for a simple binary tree node class.",
        "solution": "class TreeNode {\n    int val;\n    TreeNode left, right;\n    TreeNode(int v) { this.val = v; }\n}\n\npublic class InOrderTraversal {\n    public static void inOrder(TreeNode root) {\n        if (root == null) return;\n        inOrder(root.left);\n        System.out.print(root.val + \" \");\n        inOrder(root.right);\n    }\n    public static void main(String[] args) {\n        TreeNode root = new TreeNode(2);\n        root.left = new TreeNode(1);\n        root.right = new TreeNode(3);\n        inOrder(root);\n        System.out.println();\n    }\n}",
        "explanation": "Visits left subtree, outputs root value, and visits right subtree, printing sorted values for a BST."
      },
      {
        "id": "java-14-ex-3",
        "title": "Iterative DFS with Explicit Stack",
        "difficulty": "Advanced",
        "type": "coding",
        "prompt": "Convert the recursive tree traversal to an iterative traversal using an explicit Deque stack to eliminate StackOverflow risk.",
        "solution": "import java.util.ArrayDeque;\nimport java.util.Deque;\n\nclass TreeNode {\n    int val;\n    TreeNode left, right;\n    TreeNode(int v) { this.val = v; }\n}\n\npublic class IterativeTreeTraversal {\n    public static void iterativeInOrder(TreeNode root) {\n        Deque<TreeNode> stack = new ArrayDeque<>();\n        TreeNode curr = root;\n        while (curr != null || !stack.isEmpty()) {\n            while (curr != null) {\n                stack.push(curr);\n                curr = curr.left;\n            }\n            curr = stack.pop();\n            System.out.print(curr.val + \" \");\n            curr = curr.right;\n        }\n        System.out.println();\n    }\n    public static void main(String[] args) {\n        TreeNode root = new TreeNode(2);\n        root.left = new TreeNode(1);\n        root.right = new TreeNode(3);\n        iterativeInOrder(root);\n    }\n}",
        "explanation": "Using an explicit heap-allocated stack prevents call-stack overflow on deep, skewed trees."
      }
    ],
    "quizQuestions": [
      {
        "id": "java-14-q1",
        "question": "What error is thrown at runtime when a recursive method in Java fails to terminate its base case?",
        "options": [
          "OutOfMemoryError",
          "StackOverflowError",
          "InternalError",
          "IllegalArgumentException"
        ],
        "correctOptionIndex": 1,
        "explanation": "Excessive recursive calls exhaust the thread's call stack limit, throwing java.lang.StackOverflowError."
      },
      {
        "id": "java-14-q2",
        "question": "Does the standard Oracle HotSpot JVM perform automatic Tail Call Optimization (TCO)?",
        "options": [
          "Yes, for all methods with @Tailrec",
          "Yes, whenever the recursive call is the last statement",
          "No, HotSpot retains complete stack traces for security checks and debugging",
          "Only when running with -O3 flag"
        ],
        "correctOptionIndex": 2,
        "explanation": "HotSpot does not optimize tail calls because Java's security model and debugging inspection rely on preserving full stack frame traces."
      }
    ],
    "revisionNotes": [
      "Every recursive method requires a base case and a shrinking recursive step.",
      "Call stack frames consume memory proportional to recursion depth.",
      "Java does not support Tail Call Optimization; deep recursion risks StackOverflowError."
    ]
  },
  {
    "id": "java-15-varargs",
    "moduleId": "java-m2",
    "moduleNumber": 2,
    "moduleTitle": "Java Core Programming",
    "topicNumber": 15,
    "title": "Variable Arguments (Varargs) & Method Signatures",
    "language": "java",
    "level": "Beginner",
    "whyItMatters": "Varargs (`...`) simplifies APIs that accept an arbitrary number of arguments (like `String.format` or `List.of`). Understanding its syntactic rules, array boxing overhead, and heap pollution warnings is essential for senior Java roles.",
    "explanation": "Introduced in Java 5, Variable Arguments (`varargs`) allow a method to accept zero or more arguments of a specified type.\nSyntax & Rules:\n1. The varargs parameter must always be the LAST parameter in the method signature (e.g. `void log(String prefix, int... numbers)`).\n2. A method can have AT MOST ONE varargs parameter.\n3. Under the hood, the compiler creates an array of that type and packs the arguments into the array at the call site. For example, `printAll(\"a\", \"b\")` compiles to `printAll(new String[]{\"a\", \"b\"})`.\n4. Performance implication: Every varargs call allocates a temporary array on the heap unless the method is called with an existing array.\n5. Varargs with Generics can trigger \"heap pollution\" warnings, requiring `@SafeVarargs`.",
    "syntaxAndStructure": "// Correct syntax:\npublic static int sum(int initial, int... rest) {\n    int total = initial;\n    for (int n : rest) total += n;\n    return total;\n}\n\n// COMPILE ERRORS:\n// void bad1(int... a, String s) {} // Error: Varargs must be last\n// void bad2(int... a, int... b) {} // Error: Only one varargs parameter allowed",
    "codeExamples": [
      {
        "title": "Varargs Implementation and Iteration",
        "code": "public class VarargsDemo {\n    public static String joinStrings(String delimiter, String... items) {\n        StringBuilder sb = new StringBuilder();\n        for (int i = 0; i < items.length; i++) {\n            sb.append(items[i]);\n            if (i < items.length - 1) {\n                sb.append(delimiter);\n            }\n        }\n        return sb.toString();\n    }\n\n    public static void main(String[] args) {\n        // Zero varargs arguments passed\n        System.out.println(\"Empty varargs: '\" + joinStrings(\"-\") + \"'\");\n\n        // Multiple discrete arguments\n        System.out.println(\"Joined: \" + joinStrings(\", \", \"Java\", \"Python\", \"C++\"));\n\n        // Passing an existing array directly\n        String[] preBuilt = { \"Spring\", \"Docker\", \"Kubernetes\" };\n        System.out.println(\"Passed array: \" + joinStrings(\" -> \", preBuilt));\n    }\n}",
        "expectedOutput": "Empty varargs: ''\nJoined: Java, Python, C++\nPassed array: Spring -> Docker -> Kubernetes",
        "explanation": "items inside joinStrings is treated as a standard array String[]. The caller can provide zero arguments, discrete arguments, or an array."
      },
      {
        "title": "SafeVarargs and Generic Varargs Concept",
        "code": "import java.util.Arrays;\nimport java.util.List;\n\npublic class SafeVarargsDemo {\n    // @SafeVarargs suppresses unchecked heap pollution warnings on final/static methods\n    @SafeVarargs\n    public static <T> List<T> asListSafe(T... elements) {\n        return Arrays.asList(elements);\n    }\n\n    public static void main(String[] args) {\n        List<String> skills = asListSafe(\"OOP\", \"DSA\", \"System Design\");\n        System.out.println(\"Safe varargs list size: \" + skills.size());\n        System.out.println(\"Skills: \" + skills);\n    }\n}",
        "expectedOutput": "Safe varargs list size: 3\nSkills: [OOP, DSA, System Design]",
        "explanation": "@SafeVarargs is an assertion by the developer that the method does not perform unsafe operations (like writing incompatible types into the varargs array)."
      }
    ],
    "realWorldApplications": [
      "Writing logging libraries (`logger.info(\"User {} logged in from {}\", userId, ipAddress)`).",
      "Factory utility methods like `List.of(...)`, `Set.of(...)`, and `Map.ofEntries(...)`."
    ],
    "commonMistakes": [
      "Placing the varargs parameter before regular parameters (e.g. `method(int... nums, String name)` fails compilation).",
      "Declaring more than one varargs parameter in a method signature.",
      "Ignoring the hidden heap allocation: calling a varargs method in a tight 1,000,000-iteration loop creates 1,000,000 array objects."
    ],
    "interviewRelevance": "Frequent MCQ topic: \"Where must varargs be placed in a parameter list?\", \"Can a method have two varargs?\", and \"How does the JVM execute varargs internally?\"",
    "checkpoints": [
      {
        "id": "java-15-cp-1",
        "label": "Enforce the two syntax rules: varargs must be last and at most one per method"
      },
      {
        "id": "java-15-cp-2",
        "label": "Understand that varargs compiles to array allocation under the hood"
      },
      {
        "id": "java-15-varargs-cp-3",
        "label": "Understand internal array creation and avoid ambiguous overloading with varargs."
      }
    ],
    "practiceExercises": [
      {
        "id": "java-15-ex-1",
        "title": "Calculate Mathematical Average with Varargs",
        "difficulty": "Beginner",
        "type": "coding",
        "prompt": "Write a method average(double first, double... rest) that guarantees at least one number is provided.",
        "solution": "public class VarargsAverage {\n    public static double average(double first, double... rest) {\n        double sum = first;\n        for (double d : rest) sum += d;\n        return sum / (1 + rest.length);\n    }\n    public static void main(String[] args) {\n        System.out.printf(\"%.2f%n\", average(10.0, 20.0, 30.0));\n    }\n}",
        "explanation": "Enforcing the first argument as a regular parameter guarantees compile-time enforcement that the caller passes at least one number."
      },
      {
        "id": "java-15-ex-2",
        "title": "Varargs Ambiguity in Overloading",
        "difficulty": "Intermediate",
        "type": "conceptual",
        "prompt": "Given void test(int... a) and void test(Integer... b), what happens if you call test(1, 2)?",
        "solution": "Compile error: \"The method test is ambiguous for the type\". The compiler can either treat the arguments as an int[] or autobox them to Integer[] for the second method, creating ambiguity.",
        "explanation": "Overloading two varargs methods with primitive and wrapper types triggers ambiguous call errors."
      },
      {
        "id": "java-15-ex-3",
        "title": "Heap Pollution Demonstration with Generic Varargs",
        "difficulty": "Advanced",
        "type": "conceptual",
        "prompt": "Explain what \"heap pollution\" means when generic varargs like <T> void m(T... args) are used in Java.",
        "solution": "Because Java arrays are reified (they check type at runtime) while generics undergo type erasure (T becomes Object at runtime), a generic varargs parameter T... is converted into Object[]. If a method stores an incompatible type into that array (e.g. putting an Integer into what was supposed to be a String[]), it pollutes the heap, causing a ClassCastException later at an unexpected site.",
        "explanation": "Generic varargs creates an array of erased types, breaking Java's static type safety guarantees if references are leaked."
      }
    ],
    "quizQuestions": [
      {
        "id": "java-15-q1",
        "question": "Which of the following method signatures is syntactically valid in Java?",
        "options": [
          "void calculate(int... numbers, String label)",
          "void calculate(String label, int... numbers)",
          "void calculate(int... a, double... b)",
          "void calculate(int... numbers, int count)"
        ],
        "correctOptionIndex": 1,
        "explanation": "The varargs parameter must be the last parameter in the method signature, and there can be at most one varargs parameter."
      },
      {
        "id": "java-15-q2",
        "question": "What does the compiler generate under the hood for a call `printNumbers(1, 2, 3)` where the method is `void printNumbers(int... nums)`?",
        "options": [
          "It passes 1, 2, 3 as individual registers",
          "It constructs a new array: `printNumbers(new int[]{ 1, 2, 3 })`",
          "It converts them to a LinkedList",
          "It evaluates them with reflection"
        ],
        "correctOptionIndex": 1,
        "explanation": "Varargs is syntactic sugar for array parameters. The compiler generates code that instantiates and populates an array with the arguments."
      }
    ],
    "revisionNotes": [
      "Varargs parameter must be the last parameter; maximum of one varargs per method.",
      "Under the hood, varargs compiles to an array instantiation.",
      "Require at least one argument cleanly by declaring `void f(Type first, Type... rest)`."
    ]
  },
  {
    "id": "java-16-packages-imports",
    "moduleId": "java-m2",
    "moduleNumber": 2,
    "moduleTitle": "Java Core Programming",
    "topicNumber": 16,
    "title": "Packages, Hierarchical Naming & Static Imports",
    "language": "java",
    "level": "Beginner",
    "whyItMatters": "Packages prevent naming collisions, define encapsulation boundaries, and structure large software systems. Mastering static imports and package-private access is critical for modular codebase architecture.",
    "explanation": "A package in Java is a namespace that groups related classes, interfaces, and sub-packages. Packages serve two purposes:\n1. Name Collision Prevention: Two classes can share the name `Date` if one is `java.util.Date` and the other is `java.sql.Date`.\n2. Access Control: Classes in the same package can access package-private members.\n\nPackage Rules:\n- The `package` declaration must be the very first non-comment statement in a `.java` file.\n- Directory structure must match package names (e.g. `package com.ak67.prep;` must reside in directory `com/ak67/prep`).\n- Reverse domain naming convention (`com.company.project.module`) guarantees global uniqueness.\n- `import static`: Imports static members (constants and static methods) so they can be referenced without qualifying class names (e.g. `import static java.lang.Math.PI;`).",
    "syntaxAndStructure": "package com.ak67.model;\n\n// Specific class import\nimport java.util.List;\n\n// Wildcard import (imports classes in java.util, NOT subpackages)\nimport java.util.*;\n\n// Static import of specific member\nimport static java.lang.Math.sqrt;\nimport static java.lang.Math.PI;\n\npublic class Circle {\n    public double area(double r) { return PI * r * r; }\n}",
    "codeExamples": [
      {
        "title": "Demonstrating Static Imports for Clean Math Code",
        "code": "// Simulating static import usage\nimport static java.lang.Math.PI;\nimport static java.lang.Math.pow;\nimport static java.lang.Math.sqrt;\n\npublic class StaticImportDemo {\n    public static void main(String[] args) {\n        // Without static import: Math.sqrt(Math.pow(3, 2) + Math.pow(4, 2))\n        // With static import: direct concise expressions\n        double hypotenuse = sqrt(pow(3, 2) + pow(4, 2));\n        double circleArea = PI * pow(5, 2);\n\n        System.out.println(\"Hypotenuse of 3 and 4: \" + hypotenuse);\n        System.out.printf(\"Area of radius 5 circle: %.2f%n\", circleArea);\n    }\n}",
        "expectedOutput": "Hypotenuse of 3 and 4: 5.0\nArea of radius 5 circle: 78.54",
        "explanation": "Static imports allow referencing static fields (PI) and static methods (sqrt, pow) directly without qualifying them with the Math class name."
      },
      {
        "title": "Resolving Class Naming Collisions with Full Qualification",
        "code": "public class PackageCollisionDemo {\n    public static void main(String[] args) {\n        // Resolving collision between java.util.Date and java.sql.Date\n        java.util.Date utilDate = new java.util.Date();\n        java.sql.Date sqlDate = new java.sql.Date(utilDate.getTime());\n\n        System.out.println(\"utilDate loaded: \" + (utilDate != null));\n        System.out.println(\"sqlDate loaded: \" + (sqlDate != null));\n        System.out.println(\"Class collision successfully resolved with FQCN.\");\n    }\n}",
        "expectedOutput": "utilDate loaded: true\nsqlDate loaded: true\nClass collision successfully resolved with FQCN.",
        "explanation": "When two imported packages share a class with the same name, Java requires Fully Qualified Class Names (FQCN) to resolve the ambiguity."
      }
    ],
    "realWorldApplications": [
      "Structuring enterprise applications into domain packages (`com.app.service`, `com.app.repository`, `com.app.controller`).",
      "Writing concise unit tests using static imports for assertions (`import static org.junit.jupiter.api.Assertions.assertEquals;`)."
    ],
    "commonMistakes": [
      "Assuming that `import java.util.*;` also imports sub-packages like `java.util.concurrent.*`; package imports are non-recursive.",
      "Overusing static wildcard imports (`import static ...*`), which clutters namespaces and obscures method origin.",
      "Assuming importing a package imports its subpackages (e.g. java.util.* does not import java.util.concurrent.*)."
    ],
    "interviewRelevance": "Frequent questions: \"What is a static import?\", \"What does package-private mean?\", and \"Does `import java.awt.*` import `java.awt.event.*`?\" (Answer: No).",
    "checkpoints": [
      {
        "id": "java-16-cp-1",
        "label": "Explain how reverse domain name conventions guarantee package uniqueness"
      },
      {
        "id": "java-16-cp-2",
        "label": "Use static imports effectively without polluting namespace clarity"
      },
      {
        "id": "java-16-packages-imports-cp-3",
        "label": "Structure projects with reverse domain package conventions and explicit imports."
      }
    ],
    "practiceExercises": [
      {
        "id": "java-16-ex-1",
        "title": "Resolve Ambiguous Date Import",
        "difficulty": "Beginner",
        "type": "conceptual",
        "prompt": "If a file has `import java.util.*;` and `import java.sql.*;`, what happens when you write `Date d = new Date();`?",
        "solution": "Compile error: \"The type Date is ambiguous\". Both java.util and java.sql contain a Date class. You must either import the specific Date class explicitly or qualify it: java.util.Date d = new java.util.Date();",
        "explanation": "Wildcard imports containing identically named classes collide if both candidates are referenced without qualification."
      },
      {
        "id": "java-16-ex-2",
        "title": "Static Import Assertion Style",
        "difficulty": "Intermediate",
        "type": "coding",
        "prompt": "Write a class MathHelper that demonstrates static importing Integer.MAX_VALUE and Math.max to compute the maximum among three numbers.",
        "solution": "import static java.lang.Math.max;\nimport static java.lang.Integer.MIN_VALUE;\n\npublic class MathHelper {\n    public static int maxOfThree(int a, int b, int c) {\n        int highest = max(MIN_VALUE, a);\n        highest = max(highest, b);\n        highest = max(highest, c);\n        return highest;\n    }\n    public static void main(String[] args) {\n        System.out.println(\"Highest: \" + maxOfThree(12, 85, 42));\n    }\n}",
        "explanation": "Static imports make mathematical algorithms read cleanly like natural formulas."
      },
      {
        "id": "java-16-ex-3",
        "title": "Package Sealing and Architecture",
        "difficulty": "Advanced",
        "type": "conceptual",
        "prompt": "What is a \"sealed package\" in a Java JAR manifest, and what security advantage does it provide?",
        "solution": "Package sealing (configured in MANIFEST.MF via `Sealed: true`) specifies that all classes belonging to that package must be archived in the exact same JAR file. This prevents malicious third-party code on the classpath from injecting rogue classes into the package to access package-private internals.",
        "explanation": "Sealed packages enforce encapsulation boundaries at the JAR distribution level."
      }
    ],
    "quizQuestions": [
      {
        "id": "java-16-q1",
        "question": "Does the wildcard import `import java.util.*;` import classes from sub-packages like `java.util.concurrent`?",
        "options": [
          "Yes, it recursively imports all sub-packages",
          "No, package imports are strictly flat and do not import sub-packages",
          "Only if the compiler flag -recurse is passed",
          "Only in Java 17 and above"
        ],
        "correctOptionIndex": 1,
        "explanation": "Package imports in Java are strictly non-recursive. Sub-packages must be imported with their own explicit import statements."
      },
      {
        "id": "java-16-q2",
        "question": "Which statement about Java static imports is correct?",
        "options": [
          "It imports all non-static methods of a class",
          "It is used to import static members (fields and methods) directly into the namespace",
          "It makes the imported class immutable",
          "It replaces normal class inheritance"
        ],
        "correctOptionIndex": 1,
        "explanation": "`import static` allows referencing static fields and methods without qualifying them with the class name."
      }
    ],
    "revisionNotes": [
      "Packages prevent naming collisions and enforce architectural boundaries.",
      "Wildcard imports (`.*`) are flat and do not import sub-packages.",
      "Use static imports for constants and utility functions to improve readability."
    ]
  },
  {
    "id": "java-17-access-modifiers",
    "moduleId": "java-m2",
    "moduleNumber": 2,
    "moduleTitle": "Java Core Programming",
    "topicNumber": 17,
    "title": "Access Modifiers: private, package-private, protected & public",
    "language": "java",
    "level": "Beginner",
    "whyItMatters": "Access modifiers are the primary mechanism for encapsulation and data hiding in Java. Understanding the subtle difference between `protected` and default package-private access is tested in every technical interview.",
    "explanation": "Java provides four access levels using three keywords:\n1. `private`: Accessible ONLY within the defining class. Strongest level of encapsulation.\n2. Default (Package-Private / no modifier): Accessible by any class within the SAME package. NOT accessible outside the package, even by subclasses.\n3. `protected`: Accessible within the SAME package, AND by subclasses in DIFFERENT packages (via inheritance).\n4. `public`: Accessible from ANY class in any package.\n\nSummary Access Matrix:\n- Class | Package | Subclass (diff pkg) | World\n- private: Yes | No | No | No\n- default: Yes | Yes | No | No\n- protected: Yes | Yes | Yes | No\n- public: Yes | Yes | Yes | Yes\n\nTop-level classes can only be `public` or default (package-private). They cannot be `private` or `protected` (except for inner/nested classes).",
    "syntaxAndStructure": "public class AccessDemo {\n    private int secret = 1;        // Class only\n    int packageShared = 2;         // Package only (default)\n    protected int familyShared = 3; // Package + Subclasses in other packages\n    public int worldShared = 4;    // Everyone\n}",
    "codeExamples": [
      {
        "title": "Encapsulation with Private Fields and Public Accessors",
        "code": "public class BankAccount {\n    private double balance; // Protected from unauthorized direct mutation\n\n    public BankAccount(double initialDeposit) {\n        if (initialDeposit >= 0) {\n            this.balance = initialDeposit;\n        } else {\n            this.balance = 0;\n        }\n    }\n\n    public void deposit(double amount) {\n        if (amount > 0) {\n            this.balance += amount;\n            System.out.println(\"Deposited: \" + amount);\n        }\n    }\n\n    public double getBalance() {\n        return this.balance;\n    }\n\n    public static void main(String[] args) {\n        BankAccount acc = new BankAccount(100.0);\n        acc.deposit(50.0);\n        // acc.balance = -9999; // COMPILE ERROR: balance has private access in BankAccount\n        System.out.println(\"Verified Balance: \" + acc.getBalance());\n    }\n}",
        "expectedOutput": "Deposited: 50.0\nVerified Balance: 150.0",
        "explanation": "Private access ensures that the balance field cannot be arbitrarily corrupted from the outside; all modifications must pass through validating public methods."
      },
      {
        "title": "Protected Access in Inheritance Across Conceptual Packages",
        "code": "// Base class simulating package com.entity\nclass SuperResource {\n    protected String securityBadge = \"LEVEL_3\";\n}\n\n// Subclass accessing protected member\npublic class ProtectedAccessDemo extends SuperResource {\n    public void displayAccess() {\n        // Subclass can access protected member of parent class\n        System.out.println(\"Inherited security badge: \" + securityBadge);\n    }\n\n    public static void main(String[] args) {\n        ProtectedAccessDemo demo = new ProtectedAccessDemo();\n        demo.displayAccess();\n    }\n}",
        "expectedOutput": "Inherited security badge: LEVEL_3",
        "explanation": "The protected modifier allows inheriting subclasses to access parent fields directly, even if located across package boundaries."
      }
    ],
    "realWorldApplications": [
      "Encapsulating internal domain states in banking and payment systems to prevent unauthorized tampering.",
      "Framework architecture (like Spring or Hibernate) where base template classes expose protected hook methods for customization."
    ],
    "commonMistakes": [
      "Assuming `protected` is less visible than default package-private; `protected` is strictly MORE visible because it extends access to subclasses in other packages.",
      "Marking top-level classes as `private` or `protected`; only nested/inner classes can have private or protected modifiers.",
      "Confusing package-private (default no modifier) with protected access; default does not grant access to subclasses in other packages."
    ],
    "interviewRelevance": "Crucial interview test: \"Can a subclass in another package access a protected member using a parent reference?\" (Answer: No, only through inheritance or its own reference).",
    "checkpoints": [
      {
        "id": "java-17-cp-1",
        "label": "Memorize the visibility matrix for private, default, protected, and public"
      },
      {
        "id": "java-17-cp-2",
        "label": "Explain why top-level classes cannot be private or protected"
      },
      {
        "id": "java-17-access-modifiers-cp-3",
        "label": "Select the least permissive access modifier to uphold encapsulation."
      }
    ],
    "practiceExercises": [
      {
        "id": "java-17-ex-1",
        "title": "Evaluate Cross-Package Default Access",
        "difficulty": "Beginner",
        "type": "conceptual",
        "prompt": "Class A in package p1 has default method void foo(). Class B in package p2 extends A. Can class B call foo()? Explain why.",
        "solution": "No, class B cannot call foo(). Default (package-private) methods are strictly accessible only within the same package (p1). Subclasses in different packages (p2) have zero access to default members.",
        "explanation": "Only `protected` and `public` methods are inherited and accessible across package boundaries."
      },
      {
        "id": "java-17-ex-2",
        "title": "Design Immutable Value Object",
        "difficulty": "Intermediate",
        "type": "coding",
        "prompt": "Write an immutable class Point2D with private final fields x and y, public getters, and no setters.",
        "solution": "public final class Point2D {\n    private final int x;\n    private final int y;\n\n    public Point2D(int x, int y) {\n        this.x = x;\n        this.y = y;\n    }\n\n    public int getX() { return x; }\n    public int getY() { return y; }\n\n    public static void main(String[] args) {\n        Point2D p = new Point2D(10, 20);\n        System.out.println(\"Point: (\" + p.getX() + \", \" + p.getY() + \")\");\n    }\n}",
        "explanation": "A class declared final with private final fields and no mutating methods guarantees complete immutability."
      },
      {
        "id": "java-17-ex-3",
        "title": "Subclass Access Rule for Protected Members",
        "difficulty": "Advanced",
        "type": "conceptual",
        "prompt": "In package p1: public class Parent { protected int x; }. In package p2: public class Child extends Parent { void test() { Parent p = new Parent(); System.out.println(p.x); } }. Will this compile? Explain.",
        "solution": "Compile error. A subclass in another package can only access protected members of its superclass through inheritance (`this.x` or `super.x`) or on instances of the subclass type (`Child c; c.x;`). It CANNOT access protected members on an explicit parent instance (`new Parent().x`), because that would violate package-private encapsulation.",
        "explanation": "JLS specifies that protected cross-package access is only permitted through references of the subclass or its subtypes."
      }
    ],
    "quizQuestions": [
      {
        "id": "java-17-q1",
        "question": "Which access modifier allows access within the same package AND by subclasses in other packages?",
        "options": [
          "private",
          "default (package-private)",
          "protected",
          "public"
        ],
        "correctOptionIndex": 2,
        "explanation": "`protected` grants access within the same package plus access to subclasses located in external packages."
      },
      {
        "id": "java-17-q2",
        "question": "What access modifiers are permitted for a standard top-level class in Java?",
        "options": [
          "public and default (package-private) only",
          "public, private, protected, and default",
          "public only",
          "public and protected only"
        ],
        "correctOptionIndex": 0,
        "explanation": "Top-level classes can only be public or default. Only nested (inner) classes can be declared private or protected."
      }
    ],
    "revisionNotes": [
      "Visibility from narrowest to widest: private -> default -> protected -> public.",
      "default access is package-only; protected adds cross-package subclass inheritance.",
      "Top-level classes can only be public or default."
    ]
  },
  {
    "id": "java-18-static-members",
    "moduleId": "java-m2",
    "moduleNumber": 2,
    "moduleTitle": "Java Core Programming",
    "topicNumber": 18,
    "title": "Static Variables, Methods & Initialization Blocks",
    "language": "java",
    "level": "Beginner",
    "whyItMatters": "The `static` keyword binds state and behavior to the Class rather than to object instances. Misunderstanding static members leads to memory leaks, race conditions in multi-threaded code, and confusion during OOP method overriding questions.",
    "explanation": "In Java, `static` members belong to the class as a whole, loaded once when the class is initialized:\n1. Static Variables: Shared across all instances of the class. Stored in the Class definition (Metaspace / Heap in modern Java). Only one copy exists in memory.\n2. Static Methods: Can be invoked without creating an instance (`Math.sqrt()`). Cannot use `this` or `super`. Cannot access instance variables or instance methods directly.\n3. Static Initialization Block: Runs once when the class is first loaded by the ClassLoader. Used to initialize complex static state.\n4. Static Method Hiding: Static methods CANNOT be overridden. If a subclass declares a static method with the same signature, it \"hides\" the parent method rather than participating in dynamic runtime polymorphism.",
    "syntaxAndStructure": "public class Counter {\n    // Static variable: shared by all instances\n    public static int globalCount = 0;\n    \n    // Static block: runs once on class loading\n    static {\n        System.out.println(\"Class initialized\");\n    }\n    \n    // Static method\n    public static int getGlobalCount() {\n        return globalCount;\n    }\n}",
    "codeExamples": [
      {
        "title": "Static Variable Shared State and Counter",
        "code": "public class StaticCounterDemo {\n    static class InstanceTracker {\n        static int totalInstances = 0; // Shared across all objects\n        int instanceId;                 // Unique per object\n\n        InstanceTracker() {\n            totalInstances++;\n            this.instanceId = totalInstances;\n        }\n    }\n\n    public static void main(String[] args) {\n        InstanceTracker a = new InstanceTracker();\n        InstanceTracker b = new InstanceTracker();\n        InstanceTracker c = new InstanceTracker();\n\n        System.out.println(\"Instance A ID: \" + a.instanceId);\n        System.out.println(\"Instance B ID: \" + b.instanceId);\n        System.out.println(\"Instance C ID: \" + c.instanceId);\n        System.out.println(\"Total instances created: \" + InstanceTracker.totalInstances);\n    }\n}",
        "expectedOutput": "Instance A ID: 1\nInstance B ID: 2\nInstance C ID: 3\nTotal instances created: 3",
        "explanation": "totalInstances is shared by all instances. Each new instantiation increments the shared static counter, while instanceId remains unique to each object."
      },
      {
        "title": "Static Method Hiding vs Method Overriding",
        "code": "class ParentVehicle {\n    public static void identify() {\n        System.out.println(\"ParentVehicle static identify\");\n    }\n}\n\nclass ElectricCar extends ParentVehicle {\n    public static void identify() {\n        System.out.println(\"ElectricCar static identify\");\n    }\n}\n\npublic class StaticHidingDemo {\n    public static void main(String[] args) {\n        ParentVehicle vehicle = new ElectricCar();\n        // Method call is resolved at compile time based on reference type, NOT object type!\n        vehicle.identify(); // Calls ParentVehicle.identify()\n        \n        ElectricCar.identify(); // Explicit class call\n    }\n}",
        "expectedOutput": "ParentVehicle static identify\nElectricCar static identify",
        "explanation": "Static methods are resolved at compile time based on reference type (ParentVehicle), not runtime polymorphism. This is method hiding, NOT method overriding."
      }
    ],
    "realWorldApplications": [
      "Singleton pattern implementations and global application configuration registries.",
      "Utility classes (e.g. `java.util.Collections`, `java.util.Arrays`, `java.lang.Math`)."
    ],
    "commonMistakes": [
      "Attempting to use `this` or call non-static instance methods directly from a `static` method.",
      "Expecting static methods to participate in dynamic polymorphism; calling `parentRef.staticMethod()` executes the parent method regardless of the actual child instance.",
      "Accessing instance members directly from static methods without having an instantiated object reference."
    ],
    "interviewRelevance": "Universal interview question: \"Can we override static methods in Java?\" (Answer: No, static methods are hidden, not overridden).",
    "checkpoints": [
      {
        "id": "java-18-cp-1",
        "label": "Explain why static methods cannot access this or instance members directly"
      },
      {
        "id": "java-18-cp-2",
        "label": "Distinguish compile-time method hiding from runtime method overriding"
      },
      {
        "id": "java-18-static-members-cp-3",
        "label": "Explain class-level memory allocation in Metaspace and static initializer execution."
      }
    ],
    "practiceExercises": [
      {
        "id": "java-18-ex-1",
        "title": "Order of Static and Instance Initializers",
        "difficulty": "Beginner",
        "type": "coding",
        "prompt": "Write a class with static block, instance block, constructor, and main to demonstrate their exact execution sequence.",
        "solution": "public class InitSequence {\n    static { System.out.println(\"1. Static Block\"); }\n    { System.out.println(\"3. Instance Block\"); }\n    public InitSequence() { System.out.println(\"4. Constructor\"); }\n\n    public static void main(String[] args) {\n        System.out.println(\"2. Main Method\");\n        new InitSequence();\n    }\n}",
        "explanation": "Static blocks execute once upon class loading before main. Instance blocks execute on each instantiation before constructor."
      },
      {
        "id": "java-18-ex-2",
        "title": "Thread-Safe Static Utility Class",
        "difficulty": "Intermediate",
        "type": "coding",
        "prompt": "Design a utility class StringUtils that cannot be instantiated (private constructor) and contains static null-safe checking.",
        "solution": "public final class StringUtils {\n    // Suppress default constructor for non-instantiability\n    private StringUtils() {\n        throw new AssertionError(\"Cannot instantiate utility class\");\n    }\n\n    public static boolean isBlank(String s) {\n        return s == null || s.trim().isEmpty();\n    }\n\n    public static void main(String[] args) {\n        System.out.println(\"Blank check: \" + StringUtils.isBlank(\"  \"));\n    }\n}",
        "explanation": "A private constructor throwing AssertionError guarantees that utility classes cannot be instantiated, even via reflection."
      },
      {
        "id": "java-18-ex-3",
        "title": "Static Memory Leak Scenario",
        "difficulty": "Advanced",
        "type": "conceptual",
        "prompt": "How can a static Collection (like static List<Object>) cause an OutOfMemoryError in a long-running Java application?",
        "solution": "Because static variables remain referenced as long as their defining ClassLoader is alive (usually the entire lifetime of the JVM application), objects added to a static collection are never eligible for Garbage Collection. If objects are continuously added without eviction, the heap is exhausted, leading to `java.lang.OutOfMemoryError: Java heap space`.",
        "explanation": "Static references form GC roots that prevent unreferenced objects from being collected."
      }
    ],
    "quizQuestions": [
      {
        "id": "java-18-q1",
        "question": "Can a static method in Java be overridden by a subclass?",
        "options": [
          "Yes, if marked with @Override",
          "No, static methods are resolved at compile time and are hidden, not overridden",
          "Only if the parent method is public",
          "Yes, dynamic dispatch applies to static methods"
        ],
        "correctOptionIndex": 1,
        "explanation": "Static methods belong to the class, not instance objects. They do not participate in dynamic method dispatch and cannot be overridden."
      },
      {
        "id": "java-18-q2",
        "question": "Why can a static method not use the `this` keyword?",
        "options": [
          "Because this is a reserved keyword for C++",
          "Because static methods are invoked without an instance context of the class",
          "Because this only works in constructors",
          "Because the garbage collector locks this"
        ],
        "correctOptionIndex": 1,
        "explanation": "`this` represents the current instance object. Since static methods exist independent of any instantiated object, `this` has no meaning."
      }
    ],
    "revisionNotes": [
      "Static members belong to the class, not individual object instances.",
      "Static methods cannot access `this` or instance variables directly.",
      "Static methods can be hidden, but NEVER overridden."
    ]
  },
  {
    "id": "java-19-final-keyword",
    "moduleId": "java-m2",
    "moduleNumber": 2,
    "moduleTitle": "Java Core Programming",
    "topicNumber": 19,
    "title": "The final Keyword: Variables, Methods & Classes",
    "language": "java",
    "level": "Beginner",
    "whyItMatters": "The `final` keyword is the cornerstone of immutability, thread safety, and defensive programming in Java. Misunderstanding final reference mutability vs variable reassignment is a notorious placement trap.",
    "explanation": "The `final` keyword in Java enforces immutability and finality across three levels:\n1. Final Variables: Once initialized, their value cannot be changed.\n   - For primitive variables: the value is constant.\n   - For object references: the reference address cannot be reassigned to point to another object, BUT the internal state of the referenced object CAN still be mutated!\n   - Blank final variable: A final field not initialized at declaration; must be initialized in all constructors.\n2. Final Methods: Cannot be overridden by any subclass. Used to prevent breaking core security or invariants.\n3. Final Classes: Cannot be extended/subclassed (e.g. `java.lang.String`, `java.lang.Math`). All methods of a final class are implicitly final.",
    "syntaxAndStructure": "// 1. Final variable (cannot be reassigned)\nfinal int MAX_USERS = 100;\nfinal List<String> list = new ArrayList<>();\nlist.add(\"allowed\"); // MUTATION IS ALLOWED!\n// list = new ArrayList<>(); // REASSIGNMENT IS FORBIDDEN (Compile error)\n\n// 2. Final method (cannot be overridden)\nclass Base {\n    public final void secureAlgorithm() { ... }\n}\n\n// 3. Final class (cannot be extended)\npublic final class ImmutableEntity { ... }",
    "codeExamples": [
      {
        "title": "Final Reference vs Object Mutability Proof",
        "code": "import java.util.ArrayList;\nimport java.util.List;\n\npublic class FinalReferenceDemo {\n    public static void main(String[] args) {\n        // final reference variable\n        final List<String> techStack = new ArrayList<>();\n\n        // 1. Mutating the object pointed to by the final reference is FULLY ALLOWED:\n        techStack.add(\"Java 21\");\n        techStack.add(\"Spring Boot\");\n        System.out.println(\"Mutated list contents: \" + techStack);\n\n        // 2. Reassigning the reference itself causes a compile error:\n        // techStack = new ArrayList<>(); // COMPILE ERROR: cannot assign a value to final variable\n\n        System.out.println(\"Reference cannot be changed; list size: \" + techStack.size());\n    }\n}",
        "expectedOutput": "Mutated list contents: [Java 21, Spring Boot]\nReference cannot be changed; list size: 2",
        "explanation": "A final reference prevents reassigning the variable pointer to a different object, but does NOT make the underlying object immutable."
      },
      {
        "title": "Blank Final Variable Initialization in Constructor",
        "code": "public class BlankFinalDemo {\n    private final String apiKey; // Blank final field\n    private final int timeoutSeconds;\n\n    public BlankFinalDemo(String key, int timeout) {\n        this.apiKey = key; // Must be initialized in constructor\n        this.timeoutSeconds = timeout;\n    }\n\n    public void printConfig() {\n        System.out.println(\"API Key: \" + apiKey + \", Timeout: \" + timeoutSeconds + \"s\");\n    }\n\n    public static void main(String[] args) {\n        BlankFinalDemo config = new BlankFinalDemo(\"SECRET_KEY_123\", 30);\n        config.printConfig();\n    }\n}",
        "expectedOutput": "API Key: SECRET_KEY_123, Timeout: 30s",
        "explanation": "Blank final variables can defer initialization to the constructor, enabling instance-specific immutable configuration."
      }
    ],
    "realWorldApplications": [
      "Creating thread-safe immutable domain objects (like `String` or financial transaction records).",
      "Configuring compile-time constants (`public static final String ENV_PROD = \"PROD\";`)."
    ],
    "commonMistakes": [
      "Believing `final List<T>` makes the list contents read-only; use `Collections.unmodifiableList()` or `List.of()` for read-only lists.",
      "Failing to initialize a blank final variable in all constructor paths, causing a compile error.",
      "Assuming a final object reference makes the underlying object immutable; final only prevents pointer reassignment."
    ],
    "interviewRelevance": "Classic interview question: \"What is the difference between final, finally, and finalize in Java?\" and \"Does a final reference guarantee object immutability?\"",
    "checkpoints": [
      {
        "id": "java-19-cp-1",
        "label": "Differentiate final variable, final method, and final class"
      },
      {
        "id": "java-19-cp-2",
        "label": "Explain why a final reference does NOT make the underlying object immutable"
      },
      {
        "id": "java-19-final-keyword-cp-3",
        "label": "Apply final to variables (constants), methods (prevent overriding), and classes (prevent inheritance)."
      }
    ],
    "practiceExercises": [
      {
        "id": "java-19-ex-1",
        "title": "Compare final, finally, and finalize",
        "difficulty": "Beginner",
        "type": "conceptual",
        "prompt": "Succinctly differentiate: final, finally, and finalize.",
        "solution": "1. `final`: Keyword applied to variables (cannot reassign), methods (cannot override), and classes (cannot inherit).\n2. `finally`: Block in exception handling that executes unconditionally after try/catch for resource cleanup.\n3. `finalize()`: Deprecated method in java.lang.Object called by GC before object reclamation (deprecated since Java 9, removed/replaced by Cleaner).",
        "explanation": "Three fundamentally distinct language mechanisms that share a lexical root."
      },
      {
        "id": "java-19-ex-2",
        "title": "Truly Immutable Collection Wrapper",
        "difficulty": "Intermediate",
        "type": "coding",
        "prompt": "Write a class Container holding a list of tags that is truly immutable to callers.",
        "solution": "import java.util.List;\n\npublic final class ImmutableContainer {\n    private final List<String> tags;\n\n    public ImmutableContainer(List<String> inputTags) {\n        // List.copyOf creates an unmodifiable copy (Java 10+)\n        this.tags = List.copyOf(inputTags);\n    }\n\n    public List<String> getTags() {\n        return this.tags; // Already unmodifiable\n    }\n\n    public static void main(String[] args) {\n        ImmutableContainer c = new ImmutableContainer(List.of(\"A\", \"B\"));\n        System.out.println(\"Tags: \" + c.getTags());\n    }\n}",
        "explanation": "List.copyOf() returns an immutable list that throws UnsupportedOperationException on any modification attempt."
      },
      {
        "id": "java-19-ex-3",
        "title": "Effectively Final in Lambdas",
        "difficulty": "Advanced",
        "type": "conceptual",
        "prompt": "What does \"effectively final\" mean in Java 8+, and why do lambdas and anonymous inner classes require it?",
        "solution": "A variable is \"effectively final\" if its value is never modified after initialization, even if it lacks the explicit `final` keyword. Lambdas capture local variables by value (copying them to the heap). If local variables could mutate, the stack copy and heap copy would desynchronize, creating race conditions. Hence, Java enforces that captured variables must be final or effectively final.",
        "explanation": "Enforces memory consistency across thread stack frames and heap-allocated lambda instances."
      }
    ],
    "quizQuestions": [
      {
        "id": "java-19-q1",
        "question": "What is the effect of declaring a class as `final` in Java?",
        "options": [
          "All of its fields become private",
          "The class cannot be extended (subclassed)",
          "The class can only be instantiated once",
          "All objects of this class are stored in Metaspace"
        ],
        "correctOptionIndex": 1,
        "explanation": "Declaring a class final prohibits other classes from extending it (e.g. String is a final class)."
      },
      {
        "id": "java-19-q2",
        "question": "Does `final List<Integer> numbers = new ArrayList<>();` prevent numbers.add(10)?",
        "options": [
          "Yes, final collections cannot be modified",
          "No, the reference cannot be reassigned, but the list object can be mutated",
          "It throws a runtime UnsupportedOperationException",
          "It causes a compilation error"
        ],
        "correctOptionIndex": 1,
        "explanation": "`final` on an object reference only locks the pointer itself. The referenced object remains fully mutable."
      }
    ],
    "revisionNotes": [
      "`final` variable = cannot be reassigned.",
      "`final` method = cannot be overridden.",
      "`final` class = cannot be extended/subclassed."
    ]
  },
  {
    "id": "java-20-wrapper-classes-autoboxing",
    "moduleId": "java-m2",
    "moduleNumber": 2,
    "moduleTitle": "Java Core Programming",
    "topicNumber": 20,
    "title": "Wrapper Classes, Autoboxing & Integer Cache Pitfalls",
    "language": "java",
    "level": "Beginner",
    "whyItMatters": "Java collections only store objects, requiring primitives to be wrapped. The Integer Cache (-128 to 127) causes subtle comparison bugs where `==` returns true for small numbers but false for larger numbers.",
    "explanation": "Java provides 8 wrapper classes corresponding to each primitive: `Byte`, `Short`, `Integer`, `Long`, `Float`, `Double`, `Character`, `Boolean`. All numeric wrappers inherit from `java.lang.Number` and are immutable.\n1. Autoboxing: Automatic conversion of primitive to wrapper (e.g., `Integer x = 10;` compiles to `Integer.valueOf(10)`).\n2. Unboxing: Automatic conversion of wrapper to primitive (e.g., `int y = x;` compiles to `x.intValue()`).\n   - Risk: Unboxing a `null` wrapper throws `NullPointerException`!\n3. Integer Cache: The JVM caches `Integer` instances for values between -128 and 127 (inclusive). Therefore, `Integer a = 100; Integer b = 100; a == b` is TRUE (same cached reference), but `Integer a = 200; Integer b = 200; a == b` is FALSE (separate heap objects)! Always compare wrappers with `.equals()`.",
    "syntaxAndStructure": "// Autoboxing (primitive -> wrapper)\nInteger boxed = 42; // Integer.valueOf(42)\n\n// Unboxing (wrapper -> primitive)\nint unboxed = boxed; // boxed.intValue()\n\n// Integer Cache Trap:\nInteger a = 127, b = 127;\nSystem.out.println(a == b); // true (cached)\n\nInteger c = 128, d = 128;\nSystem.out.println(c == d); // false (different objects!)\nSystem.out.println(c.equals(d)); // true (value equality)",
    "codeExamples": [
      {
        "title": "The Integer Cache Trap Demonstration (-128 to 127)",
        "code": "public class IntegerCacheDemo {\n    public static void main(String[] args) {\n        // Values within [-128, 127] are cached by JVM\n        Integer low1 = 127;\n        Integer low2 = 127;\n        System.out.println(\"127 == 127 (using ==): \" + (low1 == low2)); // TRUE\n\n        // Values outside [-128, 127] allocate new objects on Heap\n        Integer high1 = 128;\n        Integer high2 = 128;\n        System.out.println(\"128 == 128 (using ==): \" + (high1 == high2)); // FALSE!\n\n        // Correct way: always use .equals() for wrapper comparison\n        System.out.println(\"128.equals(128): \" + high1.equals(high2)); // TRUE\n    }\n}",
        "expectedOutput": "127 == 127 (using ==): true\n128 == 128 (using ==): false\n128.equals(128): true",
        "explanation": "Integer.valueOf() caches instances in range -128 to 127. Values outside that range allocate distinct heap objects, making reference comparison `==` return false."
      },
      {
        "title": "Unboxing NullPointerException Demonstration",
        "code": "public class UnboxingNpeDemo {\n    public static void main(String[] args) {\n        Integer nullableScore = null;\n\n        try {\n            // Implicit unboxing calls nullableScore.intValue(), throwing NPE!\n            int score = nullableScore;\n            System.out.println(\"Score: \" + score);\n        } catch (NullPointerException e) {\n            System.out.println(\"Caught NullPointerException during automatic unboxing of null!\");\n        }\n    }\n}",
        "expectedOutput": "Caught NullPointerException during automatic unboxing of null!",
        "explanation": "Unboxing translates to calling `.intValue()` on the wrapper. If the wrapper reference is null, a NullPointerException is thrown."
      }
    ],
    "realWorldApplications": [
      "Storing primitives in Java Collections Framework (`List<Integer>`, `Map<String, Long>`).",
      "Handling optional database columns where a numeric field can be NULL (using `Integer` instead of `int`)."
    ],
    "commonMistakes": [
      "Using `==` to compare wrapper objects; it works for small values due to cache but silently breaks in production for numbers >= 128.",
      "Unboxing wrappers inside arithmetic expressions without null checks, causing NullPointerExceptions.",
      "Comparing boxed Integer instances using == instead of .equals(), failing for numbers outside the [-128..127] IntegerCache range."
    ],
    "interviewRelevance": "Classic interview puzzle: \"Why does `Integer a = 100, b = 100; a == b` print true, but `Integer c = 1000, d = 1000; c == d` print false?\"",
    "checkpoints": [
      {
        "id": "java-20-cp-1",
        "label": "Explain the Integer Cache range (-128 to 127) and why .equals() is mandatory"
      },
      {
        "id": "java-20-cp-2",
        "label": "Identify NullPointerException risks during automatic unboxing"
      },
      {
        "id": "java-20-wrapper-classes-autoboxing-cp-3",
        "label": "Explain automatic boxing, unboxing, and the JVM IntegerCache mechanism."
      }
    ],
    "practiceExercises": [
      {
        "id": "java-20-ex-1",
        "title": "Safe Null-Resilient Unboxing",
        "difficulty": "Beginner",
        "type": "coding",
        "prompt": "Implement safeUnbox(Integer val, int defaultVal) to avoid NullPointerException on null wrappers.",
        "solution": "public class SafeUnbox {\n    public static int safeUnbox(Integer val, int defaultVal) {\n        return val != null ? val : defaultVal;\n    }\n    public static void main(String[] args) {\n        System.out.println(safeUnbox(null, 0));\n        System.out.println(safeUnbox(42, 0));\n    }\n}",
        "explanation": "Ternary null check prevents calling .intValue() on null references."
      },
      {
        "id": "java-20-ex-2",
        "title": "Performance Cost of Autoboxing in Loops",
        "difficulty": "Intermediate",
        "type": "coding",
        "prompt": "Demonstrate the performance and GC difference between summing with `long` vs `Long` in a loop of size 1,000,000.",
        "solution": "public class AutoboxingCost {\n    public static void main(String[] args) {\n        long start = System.currentTimeMillis();\n        // BAD: Long causes 1,000,000 heap allocations\n        Long sum = 0L;\n        for (int i = 0; i < 1_000_000; i++) {\n            sum += i; // Unboxes, adds, and boxes into new Long!\n        }\n        System.out.println(\"Sum completed: \" + sum);\n    }\n}",
        "explanation": "`Long sum` repeatedly allocates temporary heap wrappers on each addition; primitive `long sum` operates purely on the CPU stack."
      },
      {
        "id": "java-20-ex-3",
        "title": "Configure JVM Integer Cache Size",
        "difficulty": "Advanced",
        "type": "conceptual",
        "prompt": "What JVM option can expand the high range of the Integer Cache beyond 127, and does it apply to Double or Float?",
        "solution": "The JVM flag `-XX:AutoBoxCacheMax=<size>` (e.g. `-XX:AutoBoxCacheMax=10000`) expands the upper bound of the IntegerCache. However, Double and Float have NO caching mechanism because there are an infinite number of floating-point values even in a small interval.",
        "explanation": "Integer, Byte, Short, Character have caches; Double and Float do not."
      }
    ],
    "quizQuestions": [
      {
        "id": "java-20-q1",
        "question": "What is the default range of the Java Integer cache?",
        "options": [
          "0 to 255",
          "-128 to 127",
          "-32768 to 32767",
          "All positive integers"
        ],
        "correctOptionIndex": 1,
        "explanation": "Java caches Integer instances between -128 and 127 (inclusive) in the internal IntegerCache."
      },
      {
        "id": "java-20-q2",
        "question": "What exception is thrown when unboxing an Integer variable that is null (e.g. `Integer x = null; int y = x;`)?",
        "options": [
          "IllegalArgumentException",
          "ClassCastException",
          "NullPointerException",
          "ArithmeticException"
        ],
        "correctOptionIndex": 2,
        "explanation": "Unboxing translates to `x.intValue()`. Since x is null, it immediately throws a NullPointerException."
      }
    ],
    "revisionNotes": [
      "Autoboxing converts primitive to wrapper; unboxing converts wrapper to primitive.",
      "Integer caches values from -128 to 127; always use `.equals()` to compare wrappers.",
      "Unboxing null references causes NullPointerException."
    ]
  },
  {
    "id": "java-21-enums",
    "moduleId": "java-m2",
    "moduleNumber": 2,
    "moduleTitle": "Java Core Programming",
    "topicNumber": 21,
    "title": "Enums: Type-Safe Constants, Fields & State Modeling",
    "language": "java",
    "level": "Beginner",
    "whyItMatters": "Enums in Java are far more powerful than in C/C++. Java Enums are full-fledged classes that can have constructors, instance fields, methods, and implement interfaces. They are the standard way to model state machines and implement singletons.",
    "explanation": "In Java, an `enum` represents a fixed set of named constants. Key properties:\n1. All enums implicitly extend `java.lang.Enum<E>` (they cannot extend any other class, but CAN implement interfaces).\n2. Enum constants are `public static final` instances created when the enum class is initialized.\n3. Constructors in Enums are strictly `private` (cannot be called with `new`).\n4. Built-in Methods: `values()` returns an array of all constants; `ordinal()` returns the 0-based position; `valueOf(String)` parses a constant by name.\n5. Enums can have fields, constructors, and custom methods, enabling behavior-driven state modeling.\n6. Joshua Bloch (Effective Java) recommends single-element enums as the safest, simplest way to implement the Singleton pattern.",
    "syntaxAndStructure": "public enum OrderStatus {\n    PENDING(1, \"Order received\"),\n    SHIPPED(2, \"On the way\"),\n    DELIVERED(3, \"Completed\");\n\n    private final int code;\n    private final String description;\n\n    // Constructor is implicitly private\n    OrderStatus(int code, String description) {\n        this.code = code;\n        this.description = description;\n    }\n\n    public int getCode() { return code; }\n    public String getDescription() { return description; }\n}",
    "codeExamples": [
      {
        "title": "Custom Fields, Constructors and Methods in Enums",
        "code": "public class EnumFeatureDemo {\n    public enum Priority {\n        LOW(1, \"Low priority issue\"),\n        MEDIUM(2, \"Standard response needed\"),\n        CRITICAL(3, \"Urgent production outage\");\n\n        private final int level;\n        private final String message;\n\n        Priority(int level, String msg) {\n            this.level = level;\n            this.message = msg;\n        }\n\n        public int getLevel() { return level; }\n        public String getMessage() { return message; }\n    }\n\n    public static void main(String[] args) {\n        Priority p = Priority.CRITICAL;\n        System.out.println(\"Selected: \" + p.name());\n        System.out.println(\"Ordinal position: \" + p.ordinal());\n        System.out.println(\"Custom level: \" + p.getLevel());\n        System.out.println(\"Description: \" + p.getMessage());\n    }\n}",
        "expectedOutput": "Selected: CRITICAL\nOrdinal position: 2\nCustom level: 3\nDescription: Urgent production outage",
        "explanation": "Enums encapsulate both constant identity and custom domain metadata (level, message) cleanly without external lookup tables."
      },
      {
        "title": "The Enum Singleton Pattern (Effective Java)",
        "code": "public class EnumSingletonDemo {\n    public enum DatabaseConnectionPool {\n        INSTANCE; // Guaranteed exactly one instance by JVM\n\n        private int activeConnections = 10;\n\n        public int getActiveConnections() {\n            return activeConnections;\n        }\n\n        public void allocate() {\n            activeConnections++;\n        }\n    }\n\n    public static void main(String[] args) {\n        DatabaseConnectionPool pool1 = DatabaseConnectionPool.INSTANCE;\n        DatabaseConnectionPool pool2 = DatabaseConnectionPool.INSTANCE;\n\n        pool1.allocate();\n\n        System.out.println(\"pool1 == pool2: \" + (pool1 == pool2));\n        System.out.println(\"Connections in pool2: \" + pool2.getActiveConnections());\n    }\n}",
        "expectedOutput": "pool1 == pool2: true\nConnections in pool2: 11",
        "explanation": "An enum with one instance provides thread-safe, reflection-proof, serialization-safe Singleton creation without boilerplate locking code."
      }
    ],
    "realWorldApplications": [
      "Modeling order workflows (CREATED, PAID, PROCESSING, SHIPPED, DELIVERED, CANCELLED).",
      "Implementing robust, serialization-proof Singletons in enterprise services."
    ],
    "commonMistakes": [
      "Relying on `ordinal()` for database persistence; reordering enum constants shifts their ordinals, corrupting stored data.",
      "Attempting to instantiate an enum with `new Priority()`, which triggers a compile error.",
      "Attempting to instantiate an enum using the new keyword; enum constructors are strictly private."
    ],
    "interviewRelevance": "Popular interview question: \"Why is an Enum Singleton better than the double-checked locking Singleton?\" (Answer: Enum Singletons prevent reflection and deserialization attacks automatically).",
    "checkpoints": [
      {
        "id": "java-21-cp-1",
        "label": "Understand that Java Enums are full classes with private constructors"
      },
      {
        "id": "java-21-cp-2",
        "label": "Explain why single-element enums provide optimal Singleton safety"
      },
      {
        "id": "java-21-enums-cp-3",
        "label": "Implement enum types with custom fields, methods, and switch pattern matching."
      }
    ],
    "practiceExercises": [
      {
        "id": "java-21-ex-1",
        "title": "Enum with Constant-Specific Behavior",
        "difficulty": "Beginner",
        "type": "coding",
        "prompt": "Implement an enum Operation (PLUS, MINUS, MULTIPLY) where each constant overrides an abstract double apply(double x, double y) method.",
        "solution": "public enum Operation {\n    PLUS { public double apply(double x, double y) { return x + y; } },\n    MINUS { public double apply(double x, double y) { return x - y; } },\n    MULTIPLY { public double apply(double x, double y) { return x * y; } };\n\n    public abstract double apply(double x, double y);\n\n    public static void main(String[] args) {\n        System.out.println(\"5 + 3 = \" + Operation.PLUS.apply(5, 3));\n        System.out.println(\"5 * 3 = \" + Operation.MULTIPLY.apply(5, 3));\n    }\n}",
        "explanation": "Each enum constant can implement abstract methods individually, replacing switch ladders with polymorphism."
      },
      {
        "id": "java-21-ex-2",
        "title": "Safe Enum Lookup by String Code",
        "difficulty": "Intermediate",
        "type": "coding",
        "prompt": "Write a static fromCode(int code) method on an enum that returns an Optional<Enum> without throwing IllegalArgumentException.",
        "solution": "import java.util.Optional;\n\npublic enum Status {\n    ACTIVE(1), INACTIVE(0);\n    private final int code;\n    Status(int c) { this.code = c; }\n\n    public static Optional<Status> fromCode(int c) {\n        for (Status s : values()) {\n            if (s.code == c) return Optional.of(s);\n        }\n        return Optional.empty();\n    }\n}",
        "explanation": "Encapsulating lookup with Optional prevents crashes when clients pass invalid raw codes."
      },
      {
        "id": "java-21-ex-3",
        "title": "EnumSet and EnumMap Performance Optimization",
        "difficulty": "Advanced",
        "type": "conceptual",
        "prompt": "Why are EnumSet and EnumMap vastly superior in performance and memory compared to HashSet and HashMap?",
        "solution": "`EnumSet` is internally represented as a single long bit vector (a bitmask). Basic operations (add, contains, remove) execute via single-cycle bitwise instructions (O(1) with near-zero memory footprint). `EnumMap` is backed by a compact, indexed array matching the enum ordinals, completely eliminating hash computation, collisions, and bucket overhead.",
        "explanation": "EnumSet uses bitwise vectors, and EnumMap uses direct array indexing by ordinal."
      }
    ],
    "quizQuestions": [
      {
        "id": "java-21-q1",
        "question": "What is the access level of constructors in a Java enum?",
        "options": [
          "public",
          "protected",
          "private (or package-private)",
          "abstract"
        ],
        "correctOptionIndex": 2,
        "explanation": "Enum constructors are private because enum instances are fixed and cannot be created dynamically from outside."
      },
      {
        "id": "java-21-q2",
        "question": "Why does Joshua Bloch advocate using single-element enums for the Singleton pattern?",
        "options": [
          "Enums execute faster than ordinary classes",
          "The JVM guarantees absolute singleton protection against reflection and deserialization attacks",
          "Enums don't allocate heap memory",
          "Enums are automatically converted to native code"
        ],
        "correctOptionIndex": 1,
        "explanation": "Enums provide built-in serialization safety and JVM reflection safeguards against multiple instantiation."
      }
    ],
    "revisionNotes": [
      "Java enums are full classes that can have fields, methods, and constructors.",
      "Enum constructors are implicitly private.",
      "Single-element Enums are the most robust implementation of the Singleton pattern."
    ]
  },
  {
    "id": "java-22-exception-fundamentals",
    "moduleId": "java-m2",
    "moduleNumber": 2,
    "moduleTitle": "Java Core Programming",
    "topicNumber": 22,
    "title": "Exception Fundamentals, Throwable Hierarchy & Try-With-Resources",
    "language": "java",
    "level": "Beginner",
    "whyItMatters": "Robust error handling differentiates amateur scripts from production systems. Understanding checked vs unchecked exceptions, `finally` guarantees, and automatic resource management via `try-with-resources` (`AutoCloseable`) is tested extensively in interviews.",
    "explanation": "The Java Exception hierarchy begins with `java.lang.Throwable`:\n1. `Error`: Serious problems that a reasonable application should not try to catch (e.g., `OutOfMemoryError`, `StackOverflowError`).\n2. `Exception`: Conditions that an application might want to catch.\n   - Checked Exceptions: Subclasses of `Exception` excluding `RuntimeException` (e.g., `IOException`, `SQLException`). Checked at compile-time; MUST be handled via `try-catch` or declared in method signature with `throws`.\n   - Unchecked Exceptions: Subclasses of `RuntimeException` (e.g., `NullPointerException`, `ArrayIndexOutOfBoundsException`, `IllegalArgumentException`). Occur due to programming logic errors; compiler does not require explicit handling.\n3. `try-with-resources` (Java 7+): Replaces verbose `try-finally` blocks. Any resource implementing `java.lang.AutoCloseable` is automatically closed at block exit, even if exceptions occur.",
    "syntaxAndStructure": "// Traditional try-catch-finally:\ntry {\n    // Code that may throw\n} catch (IOException | SQLException e) { // Multi-catch (Java 7+)\n    logger.error(\"Error\", e);\n} finally {\n    // ALWAYS runs (cleanup)\n}\n\n// Modern try-with-resources:\ntry (BufferedReader br = new BufferedReader(new FileReader(\"file.txt\"))) {\n    String line = br.readLine();\n} // br is automatically closed here!",
    "codeExamples": [
      {
        "title": "Modern Try-With-Resources with Custom AutoCloseable",
        "code": "public class TryWithResourcesDemo {\n    static class ManagedDatabaseConnection implements AutoCloseable {\n        public void executeQuery(String sql) {\n            System.out.println(\"Executing query: \" + sql);\n        }\n\n        @Override\n        public void close() {\n            System.out.println(\"ManagedDatabaseConnection closed automatically!\");\n        }\n    }\n\n    public static void main(String[] args) {\n        // Resource is instantiated inside try(...) parentheses\n        try (ManagedDatabaseConnection conn = new ManagedDatabaseConnection()) {\n            conn.executeQuery(\"SELECT * FROM students\");\n        } // close() is called automatically here!\n        \n        System.out.println(\"Block exited cleanly.\");\n    }\n}",
        "expectedOutput": "Executing query: SELECT * FROM students\nManagedDatabaseConnection closed automatically!\nBlock exited cleanly.",
        "explanation": "Because ManagedDatabaseConnection implements AutoCloseable, the JVM ensures its close() method executes deterministically when exiting the try block."
      },
      {
        "title": "Multi-Catch and Exception Propagation Flow",
        "code": "public class MultiCatchDemo {\n    public static void parseData(String str) {\n        try {\n            int num = Integer.parseInt(str);\n            int result = 100 / num;\n            System.out.println(\"Calculated result: \" + result);\n        } catch (NumberFormatException | ArithmeticException e) {\n            System.out.println(\"Handled error: \" + e.getClass().getSimpleName());\n        } finally {\n            System.out.println(\"Finally block always executes.\");\n        }\n    }\n\n    public static void main(String[] args) {\n        parseData(\"0\");\n        parseData(\"abc\");\n    }\n}",
        "expectedOutput": "Handled error: ArithmeticException\nFinally block always executes.\nHandled error: NumberFormatException\nFinally block always executes.",
        "explanation": "Java 7+ multi-catch syntax `catch (TypeA | TypeB e)` groups related exception handling cleanly without code duplication."
      }
    ],
    "realWorldApplications": [
      "Deterministic file, socket, and database connection pooling cleanup using try-with-resources.",
      "Translating raw database exceptions into domain-specific exceptions in service layers."
    ],
    "commonMistakes": [
      "Catching generic `Exception` or `Throwable` and silencing it with an empty catch block, masking critical bugs.",
      "Relying on `System.exit(0)` inside try block: this is the ONLY scenario where the `finally` block does NOT execute!",
      "Catching generic Throwable or swallowing checked exceptions with empty catch blocks."
    ],
    "interviewRelevance": "Universal interview questions: \"Difference between checked and unchecked exceptions?\", \"Does finally always execute?\", and \"How does try-with-resources work?\"",
    "checkpoints": [
      {
        "id": "java-22-cp-1",
        "label": "Draw the Throwable hierarchy: Throwable -> Error & Exception (Checked vs RuntimeException)"
      },
      {
        "id": "java-22-cp-2",
        "label": "Implement AutoCloseable and explain try-with-resources automatic cleanup"
      },
      {
        "id": "java-22-exception-fundamentals-cp-3",
        "label": "Differentiate Checked vs Unchecked exceptions and the Error hierarchy."
      }
    ],
    "practiceExercises": [
      {
        "id": "java-22-ex-1",
        "title": "Finally Block with Return Value Puzzle",
        "difficulty": "Beginner",
        "type": "coding",
        "prompt": "What does this method return and why? int test() { try { return 1; } finally { return 2; } }",
        "solution": "public class ReturnPuzzle {\n    public static int test() {\n        try {\n            return 1;\n        } finally {\n            return 2; // Overrides the try return value!\n        }\n    }\n    public static void main(String[] args) {\n        System.out.println(\"Result: \" + test());\n    }\n}",
        "explanation": "A return in a finally block discards and overrides any previous return statement or unhandled exception in the try/catch block (a serious anti-pattern)."
      },
      {
        "id": "java-22-ex-2",
        "title": "Custom Checked vs Unchecked Exception",
        "difficulty": "Intermediate",
        "type": "coding",
        "prompt": "Create a custom checked exception InsufficientFundsException and an unchecked exception InvalidAccountException.",
        "solution": "// Checked: extends Exception\nclass InsufficientFundsException extends Exception {\n    public InsufficientFundsException(String msg) { super(msg); }\n}\n\n// Unchecked: extends RuntimeException\nclass InvalidAccountException extends RuntimeException {\n    public InvalidAccountException(String msg) { super(msg); }\n}\n\npublic class CustomExceptionsDemo {\n    public static void validate(int balance, int withdraw) throws InsufficientFundsException {\n        if (withdraw > balance) throw new InsufficientFundsException(\"Balance too low\");\n    }\n    public static void main(String[] args) {\n        System.out.println(\"Custom exceptions defined cleanly.\");\n    }\n}",
        "explanation": "Classes extending Exception are checked by the compiler; classes extending RuntimeException are unchecked."
      },
      {
        "id": "java-22-ex-3",
        "title": "Suppressed Exceptions in Try-With-Resources",
        "difficulty": "Advanced",
        "type": "conceptual",
        "prompt": "If both the try block and auto-closing resource throw an exception, how does Java preserve both errors?",
        "solution": "In try-with-resources, the exception thrown inside the try block is the primary exception. The exception thrown by close() is caught and added to the primary exception as a \"suppressed exception\". It can be retrieved by calling `primaryException.getSuppressed()`. In traditional try-finally, the finally exception would obliterate the original exception.",
        "explanation": "Java 7 suppressed exceptions prevent resource closing failures from hiding root-cause business exceptions."
      }
    ],
    "quizQuestions": [
      {
        "id": "java-22-q1",
        "question": "Which of the following is an UNCHECKED exception in Java?",
        "options": [
          "IOException",
          "SQLException",
          "NullPointerException",
          "ClassNotFoundException"
        ],
        "correctOptionIndex": 2,
        "explanation": "NullPointerException extends RuntimeException, making it an unchecked exception that the compiler does not force you to declare or catch."
      },
      {
        "id": "java-22-q2",
        "question": "What interface must a resource class implement to be used within a try-with-resources statement?",
        "options": [
          "java.io.Serializable",
          "java.lang.AutoCloseable",
          "java.lang.Cloneable",
          "java.lang.Runnable"
        ],
        "correctOptionIndex": 1,
        "explanation": "Any class implementing `java.lang.AutoCloseable` (or its sub-interface `java.io.Closeable`) can be managed by try-with-resources."
      }
    ],
    "revisionNotes": [
      "Checked exceptions extend Exception (excluding RuntimeException) and must be handled or declared.",
      "Unchecked exceptions extend RuntimeException and represent programming defects.",
      "try-with-resources automatically closes AutoCloseable instances reliably."
    ]
  }
];

export const module2: MasteryModule = {
  "id": "java-m2",
  "number": 2,
  "title": "Java Core Programming",
  "description": "Methods and parameters, pass-by-value proof, method overloading, recursion, varargs, packages, access modifiers, static members, final keyword, wrapper classes, enums, and exception handling.",
  "language": "java",
  "topics": [
    {
      "id": "java-12-methods-parameters",
      "moduleId": "java-m2",
      "moduleNumber": 2,
      "moduleTitle": "Java Core Programming",
      "topicNumber": 12,
      "title": "Methods, Parameters & Pass-by-Value Semantics",
      "language": "java",
      "level": "Beginner",
      "whyItMatters": "The single most misunderstood concept in Java interviews is parameter passing. Candidates often mistakenly claim \"primitives are pass-by-value, objects are pass-by-reference\". In Java, EVERYTHING is strictly pass-by-value.",
      "explanation": "Java is strictly pass-by-value at all times. What is passed to a method is always a copy of the value:\n1. Primitive types (int, double, etc.): A copy of the actual binary value is passed. Modifying the parameter inside the method has zero effect on the caller’s variable.\n2. Object references: A copy of the reference address (the pointer value) is passed. Both caller and callee reference copies point to the same object on the Heap. Therefore:\n   - Modifying the internal state of the object via the reference (e.g., `p.setName(\"Bob\")`) mutates the shared heap object.\n   - Reassigning the parameter to a new object (e.g., `p = new Person(\"Charlie\")`) merely alters the local reference copy; the caller still points to the original object.\nMethods specify an access modifier, return type (or void), name, parameter list, and optional throws clause.",
      "syntaxAndStructure": "// Method syntax:\npublic static int add(int a, int b) {\n    return a + b;\n}\n\n// Pass-by-value proof with objects:\nvoid modify(StringBuilder sb) {\n    sb.append(\" modified\"); // Mutates shared heap object\n    sb = new StringBuilder(\"new\"); // Reassigns local copy only; caller unaffected\n}",
      "codeExamples": [
        {
          "title": "Definitive Proof of Pass-by-Value in Java",
          "code": "public class PassByValueProof {\n    static class DataHolder {\n        int value;\n        DataHolder(int v) { this.value = v; }\n    }\n\n    public static void reassign(DataHolder d) {\n        d = new DataHolder(999); // Reassigns local reference only\n    }\n\n    public static void mutate(DataHolder d) {\n        d.value = 500; // Mutates object on heap\n    }\n\n    public static void main(String[] args) {\n        DataHolder original = new DataHolder(100);\n\n        reassign(original);\n        System.out.println(\"After reassign attempt: \" + original.value); // Still 100\n\n        mutate(original);\n        System.out.println(\"After mutate invocation: \" + original.value); // 500\n    }\n}",
          "expectedOutput": "After reassign attempt: 100\nAfter mutate invocation: 500",
          "explanation": "reassign() fails to replace the caller’s instance because Java passes a copy of the reference address. mutate() changes the heap object because both reference copies point to the same address."
        },
        {
          "title": "Primitive Parameter Invariance Demo",
          "code": "public class PrimitivePassingDemo {\n    public static void increment(int x) {\n        x = x + 10;\n        System.out.println(\"Value inside method: \" + x);\n    }\n\n    public static void main(String[] args) {\n        int original = 25;\n        increment(original);\n        System.out.println(\"Value in caller after method: \" + original);\n    }\n}",
          "expectedOutput": "Value inside method: 35\nValue in caller after method: 25",
          "explanation": "The primitive value 25 was copied to the stack frame of increment(). Modifying x altered only the stack frame copy."
        }
      ],
      "realWorldApplications": [
        "Designing immutable data transfer objects (DTOs) and defensive copying in API services.",
        "Avoiding unintended side effects in shared domain models across multi-layered services."
      ],
      "commonMistakes": [
        "Believing that passing an object passes it \"by reference\". Reassigning `param = new Object()` never modifies the caller.",
        "Expecting a `swap(int a, int b)` method to swap two numbers in Java without wrapping them in an array or container object.",
        "Believing that object parameters in Java are passed by reference rather than passing copies of reference pointers by value."
      ],
      "interviewRelevance": "Universal interview question: \"Is Java pass-by-value or pass-by-reference? Write code proving your answer.\"",
      "checkpoints": [
        {
          "id": "java-12-cp-1",
          "label": "Explain why Java is strictly pass-by-value for both primitives and object references"
        },
        {
          "id": "java-12-cp-2",
          "label": "Demonstrate mutation of heap state vs reassigning parameter references"
        },
        {
          "id": "java-12-methods-parameters-cp-3",
          "label": "Prove pass-by-value mechanics for both primitives and object references."
        }
      ],
      "practiceExercises": [
        {
          "id": "java-12-ex-1",
          "title": "Swap Object References Failure",
          "difficulty": "Beginner",
          "type": "conceptual",
          "prompt": "Why does public static void swap(Integer a, Integer b) { Integer temp = a; a = b; b = temp; } fail to swap two variables in the caller?",
          "solution": "Because `a` and `b` inside `swap` are local copies of the reference pointers on the stack frame of `swap`. Swapping local copies changes what the local variables point to, but leaves the caller's reference variables unchanged. Furthermore, Integer is immutable, so its internal value cannot be modified.",
          "explanation": "Java pass-by-value copies references; reassigning them within the method has no effect on caller variables."
        },
        {
          "id": "java-12-ex-2",
          "title": "Successful Object Swap with Wrapper",
          "difficulty": "Intermediate",
          "type": "coding",
          "prompt": "Implement a working swap function that swaps two integers using a mutable wrapper or array.",
          "solution": "public class SwapUsingArray {\n    public static void swap(int[] arr, int i, int j) {\n        int temp = arr[i];\n        arr[i] = arr[j];\n        arr[j] = temp;\n    }\n    public static void main(String[] args) {\n        int[] pair = { 10, 20 };\n        swap(pair, 0, 1);\n        System.out.println(\"Swapped: \" + pair[0] + \", \" + pair[1]);\n    }\n}",
          "explanation": "Because the array object on the heap is mutated through the shared reference, the caller sees the swapped values."
        },
        {
          "id": "java-12-ex-3",
          "title": "Defensive Copying in Setters",
          "difficulty": "Advanced",
          "type": "coding",
          "prompt": "Write a class Employee holding a java.util.Date joiningDate, showing why storing the reference directly causes security flaws, and fix it using defensive copying.",
          "solution": "import java.util.Date;\n\npublic class Employee {\n    private final Date joiningDate;\n\n    public Employee(Date d) {\n        // Defensive copy on constructor\n        this.joiningDate = new Date(d.getTime());\n    }\n\n    public Date getJoiningDate() {\n        // Defensive copy on getter\n        return new Date(this.joiningDate.getTime());\n    }\n\n    public static void main(String[] args) {\n        Date original = new Date();\n        Employee emp = new Employee(original);\n        original.setTime(0); // Attempt to mutate\n        System.out.println(\"Joining date preserved: \" + (emp.getJoiningDate().getTime() != 0));\n    }\n}",
          "explanation": "Defensive copying on both input and output isolates internal state from external mutation through shared references."
        }
      ],
      "quizQuestions": [
        {
          "id": "java-12-q1",
          "question": "Which statement accurately describes parameter passing in Java?",
          "options": [
            "Primitives are pass-by-value; Objects are pass-by-reference",
            "Everything in Java is strictly pass-by-value",
            "Methods can declare pass-by-reference using the & symbol",
            "Arrays are pass-by-reference, other objects are pass-by-value"
          ],
          "correctOptionIndex": 1,
          "explanation": "Java is strictly pass-by-value. For objects, the value passed is the reference address itself."
        },
        {
          "id": "java-12-q2",
          "question": "What happens if you reassign an object parameter inside a method (e.g. `param = new MyClass();`)?",
          "options": [
            "The caller variable is updated to point to the new object",
            "Only the local parameter reference in the method stack frame changes; the caller is unaffected",
            "A NullPointerException is thrown",
            "The compiler rejects reference reassignment"
          ],
          "correctOptionIndex": 1,
          "explanation": "Reassigning the parameter variable only changes the local copy of the pointer inside the callee method."
        }
      ],
      "revisionNotes": [
        "Java is strictly pass-by-value for both primitives and object references.",
        "Modifying object fields via a parameter mutates the shared heap object.",
        "Reassigning the parameter reference variable has no effect on the caller."
      ]
    },
    {
      "id": "java-13-method-overloading",
      "moduleId": "java-m2",
      "moduleNumber": 2,
      "moduleTitle": "Java Core Programming",
      "topicNumber": 13,
      "title": "Method Overloading, Signature Resolution & Type Promotion",
      "language": "java",
      "level": "Beginner",
      "whyItMatters": "Method overloading provides compile-time polymorphism. Understanding how the compiler resolves overloaded methods with type promotion, autoboxing, and varargs prevents ambiguous invocation compiler errors.",
      "explanation": "Method Overloading occurs when a class has multiple methods with the same name but different signatures (different parameter counts, different parameter types, or different order of types).\nRules for Overloading:\n1. Return type, access modifiers, or thrown exceptions DO NOT constitute overloading. Changing only the return type causes a compile error.\n2. Compiler Resolution Order:\n   - Phase 1: Exact type match without boxing or varargs.\n   - Phase 2: Widening primitive promotion (e.g., int -> long -> float -> double).\n   - Phase 3: Autoboxing / Unboxing (e.g., int -> Integer).\n   - Phase 4: Variable-length arguments (varargs).\n3. Ambiguity: If two overloaded methods match equally (e.g. `test(int, long)` and `test(long, int)` invoked with `test(10, 10)`), the compiler throws an ambiguous method call error.",
      "syntaxAndStructure": "public class Calculator {\n    // Valid overloads:\n    public int add(int a, int b) { return a + b; }\n    public double add(double a, double b) { return a + b; }\n    public int add(int a, int b, int c) { return a + b + c; }\n    \n    // INVALID: Only return type changed (compile error)\n    // public double add(int a, int b) { ... }\n}",
      "codeExamples": [
        {
          "title": "Compiler Resolution: Widening vs Autoboxing",
          "code": "public class OverloadResolutionDemo {\n    public static void display(long val) {\n        System.out.println(\"Invoked display(long): \" + val);\n    }\n\n    public static void display(Integer val) {\n        System.out.println(\"Invoked display(Integer): \" + val);\n    }\n\n    public static void main(String[] args) {\n        int x = 42;\n        // Compiler prefers widening (int -> long) over autoboxing (int -> Integer)\n        display(x);\n    }\n}",
          "expectedOutput": "Invoked display(long): 42",
          "explanation": "Java compiler resolution precedence strictly prioritizes primitive widening over autoboxing for backward compatibility with pre-Java 5 code."
        },
        {
          "title": "Reference Type Most Specific Overload Resolution",
          "code": "public class SpecificityDemo {\n    public static void printType(Object obj) {\n        System.out.println(\"Invoked printType(Object)\");\n    }\n\n    public static void printType(String str) {\n        System.out.println(\"Invoked printType(String)\");\n    }\n\n    public static void main(String[] args) {\n        // String is a subclass of Object; compiler chooses most specific matching method\n        printType(\"Placement 2026\");\n        printType(null); // String is more specific than Object\n    }\n}",
          "expectedOutput": "Invoked printType(String)\nInvoked printType(String)",
          "explanation": "When passing null, both Object and String are valid candidate parameters. The compiler selects String because it is more specific (subclass of Object)."
        }
      ],
      "realWorldApplications": [
        "Creating versatile library APIs (e.g., `String.valueOf(int)`, `String.valueOf(char[])`, `String.valueOf(Object)`).",
        "Configuring builder and utility classes with intuitive, unified method naming."
      ],
      "commonMistakes": [
        "Attempting to overload methods by changing only the return type, which results in a compile error.",
        "Overloading methods with ambiguous signatures like `method(String s, Object o)` and `method(Object o, String s)` when called with `method(null, null)`.",
        "Attempting to overload methods solely by changing their return type or access modifier without changing parameter lists."
      ],
      "interviewRelevance": "Classic placement test questions test overload resolution with null arguments and primitive widening vs autoboxing.",
      "checkpoints": [
        {
          "id": "java-13-cp-1",
          "label": "Know the 4 phases of overload resolution: Exact -> Widening -> Boxing -> Varargs"
        },
        {
          "id": "java-13-cp-2",
          "label": "Explain why return type alone cannot overload a method in Java"
        },
        {
          "id": "java-13-method-overloading-cp-3",
          "label": "Identify how the compiler resolves the most specific method in overloaded hierarchies."
        }
      ],
      "practiceExercises": [
        {
          "id": "java-13-ex-1",
          "title": "Predict Ambiguous Overload Call",
          "difficulty": "Beginner",
          "type": "conceptual",
          "prompt": "Given void test(int a, double b) and void test(double a, int b), what happens if you call test(10, 10)?",
          "solution": "Compile error: \"The method test is ambiguous for the type\". Both methods require one widening conversion (first promotes second arg, second promotes first arg), and neither is more specific than the other.",
          "explanation": "Symmetric type promotions with equal specificity cause ambiguous invocation errors."
        },
        {
          "id": "java-13-ex-2",
          "title": "Overload with Varargs Priority",
          "difficulty": "Intermediate",
          "type": "coding",
          "prompt": "Write two overloaded methods: one taking (int a, int b) and one taking (int... nums). Demonstrate that the exact match is chosen over varargs.",
          "solution": "public class VarargsOverload {\n    public static void process(int a, int b) {\n        System.out.println(\"Exact match (int, int) executed\");\n    }\n    public static void process(int... nums) {\n        System.out.println(\"Varargs executed\");\n    }\n    public static void main(String[] args) {\n        process(1, 2);\n        process(1, 2, 3);\n    }\n}",
          "explanation": "The compiler prioritizes fixed-arity methods over variable-arity (varargs) methods."
        },
        {
          "id": "java-13-ex-3",
          "title": "Overload Resolution with Sibling Classes and Null",
          "difficulty": "Advanced",
          "type": "conceptual",
          "prompt": "If a class has print(String s) and print(Integer i), what happens if you invoke print(null)?",
          "solution": "Compile error: \"The method print is ambiguous\". Neither String nor Integer is a subclass of the other (they are sibling types inheriting from Object). The compiler cannot determine which one is more specific.",
          "explanation": "Null matches any reference type, but sibling classes with no inheritance relationship produce ambiguity."
        }
      ],
      "quizQuestions": [
        {
          "id": "java-13-q1",
          "question": "Which of the following method declarations is a valid overload for: public int calc(int a, int b)?",
          "options": [
            "public double calc(int a, int b)",
            "private int calc(int a, int b)",
            "public double calc(int a, double b)",
            "public int calc(int x, int y)"
          ],
          "correctOptionIndex": 2,
          "explanation": "Overloading requires a change in parameter list. Option 3 changes the second parameter type to double."
        },
        {
          "id": "java-13-q2",
          "question": "Between primitive widening (e.g. int -> long) and autoboxing (e.g. int -> Integer), which does the Java compiler prefer during overload resolution?",
          "options": [
            "Autoboxing is preferred over widening",
            "Primitive widening is preferred over autoboxing",
            "Both have equal precedence, causing compile error",
            "Depends on the JVM vendor"
          ],
          "correctOptionIndex": 1,
          "explanation": "Widening primitive conversion is evaluated before autoboxing for backward compatibility with Java 1.4."
        }
      ],
      "revisionNotes": [
        "Method overloading is resolved at compile time based on parameter types, count, and order.",
        "Return type, access modifiers, and throws clauses do NOT participate in method overloading.",
        "Resolution order: Exact Match -> Widening -> Autoboxing -> Varargs."
      ]
    },
    {
      "id": "java-14-recursion",
      "moduleId": "java-m2",
      "moduleNumber": 2,
      "moduleTitle": "Java Core Programming",
      "topicNumber": 14,
      "title": "Recursion, Call Stack Mechanics & Tail Call Limitations",
      "language": "java",
      "level": "Beginner",
      "whyItMatters": "Recursion is the engine of tree traversals, graph algorithms, and dynamic programming. Understanding how activation records are pushed and popped on the thread stack and why Java does not support tail call optimization (TCO) is essential for avoiding StackOverflowError.",
      "explanation": "A method is recursive if it calls itself directly or indirectly. Every recursive method requires two essential components:\n1. Base Case: The terminating condition that returns a value without further recursion.\n2. Recursive Step: The progression where the problem size shrinks toward the base case.\n\nCall Stack Mechanics:\nEach recursive call allocates a new Stack Frame containing local variables, method arguments, and the return address. When depth exceeds the thread stack size (configured via `-Xss`), the JVM throws `StackOverflowError`.\n\nTail Call Optimization (TCO):\nUnlike languages like Scala, Haskell, or Scheme, standard HotSpot JVM implementations DO NOT optimize tail-recursive calls. A tail-recursive method in Java still pushes a new stack frame for each call, meaning iterative loops are preferred for deep computations to maintain $O(1)$ stack space.",
      "syntaxAndStructure": "// Classic Structure:\npublic int factorial(int n) {\n    // 1. Base case\n    if (n <= 1) return 1;\n    // 2. Recursive step\n    return n * factorial(n - 1);\n}\n\n// Tail-recursive form (still not optimized in HotSpot):\npublic int tailFact(int n, int accumulator) {\n    if (n <= 1) return accumulator;\n    return tailFact(n - 1, n * accumulator);\n}",
      "codeExamples": [
        {
          "title": "Recursive Fibonacci vs Memoized Optimization",
          "code": "public class RecursionEfficiencyDemo {\n    // Naive recursive: Exponential O(2^N) time, O(N) call stack space\n    public static long fibNaive(int n) {\n        if (n <= 1) return n;\n        return fibNaive(n - 1) + fibNaive(n - 2);\n    }\n\n    // Memoized recursion: Linear O(N) time, O(N) call stack space\n    public static long fibMemo(int n, long[] memo) {\n        if (n <= 1) return n;\n        if (memo[n] != 0) return memo[n];\n        return memo[n] = fibMemo(n - 1, memo) + fibMemo(n - 2, memo);\n    }\n\n    public static void main(String[] args) {\n        int n = 10;\n        System.out.println(\"Fibonacci(\" + n + \") naive: \" + fibNaive(n));\n        \n        long[] memo = new long[n + 1];\n        System.out.println(\"Fibonacci(\" + n + \") memoized: \" + fibMemo(n, memo));\n    }\n}",
          "expectedOutput": "Fibonacci(10) naive: 55\nFibonacci(10) memoized: 55",
          "explanation": "Naive recursion recomputes overlapping subproblems exponentially. Memoization stores computed values in an array, pruning the recursion tree to O(N)."
        },
        {
          "title": "GCD Calculation via Euclidean Algorithm",
          "code": "public class EuclidsGcdDemo {\n    public static int gcd(int a, int b) {\n        if (b == 0) return a; // Base case\n        return gcd(b, a % b); // Recursive step\n    }\n\n    public static void main(String[] args) {\n        System.out.println(\"GCD(48, 18): \" + gcd(48, 18));\n        System.out.println(\"GCD(101, 10): \" + gcd(101, 10));\n    }\n}",
          "expectedOutput": "GCD(48, 18): 6\nGCD(101, 10): 1",
          "explanation": "Euclidean algorithm computes the greatest common divisor in O(log(min(a,b))) stack frames by taking remainders."
        }
      ],
      "realWorldApplications": [
        "Traversing nested JSON AST hierarchies, directory trees in file systems, and document object models (DOM).",
        "Implementing Divide and Conquer algorithms like Merge Sort, Quick Sort, and Binary Tree traversals."
      ],
      "commonMistakes": [
        "Missing or incorrect base condition, causing infinite recursion leading to `StackOverflowError`.",
        "Assuming HotSpot JVM optimizes tail recursion into loops; writing deep recursion in production Java risks stack exhaustion.",
        "Omitting a valid base case or failing to reduce problem size, causing stack frames to exhaust thread memory with StackOverflowError."
      ],
      "interviewRelevance": "Frequent interview question: \"Why does Java not support Tail Call Optimization?\", \"Trace the call stack for Tower of Hanoi\", and \"Convert recursion to iteration using an explicit Stack\".",
      "checkpoints": [
        {
          "id": "java-14-cp-1",
          "label": "Identify base case and recursive progress conditions in algorithms"
        },
        {
          "id": "java-14-cp-2",
          "label": "Explain why HotSpot JVM throws StackOverflowError even on tail-recursive methods"
        },
        {
          "id": "java-14-recursion-cp-3",
          "label": "Analyze call stack depth and convert deep recursion into iterative or tail-recursive algorithms."
        }
      ],
      "practiceExercises": [
        {
          "id": "java-14-ex-1",
          "title": "Tower of Hanoi Solver",
          "difficulty": "Beginner",
          "type": "coding",
          "prompt": "Implement towerOfHanoi(int n, char from, char to, char aux) to print moves for 3 disks.",
          "solution": "public class TowerOfHanoi {\n    public static void solve(int n, char from, char to, char aux) {\n        if (n == 1) {\n            System.out.println(\"Move disk 1 from \" + from + \" to \" + to);\n            return;\n        }\n        solve(n - 1, from, aux, to);\n        System.out.println(\"Move disk \" + n + \" from \" + from + \" to \" + to);\n        solve(n - 1, aux, to, from);\n    }\n    public static void main(String[] args) {\n        solve(3, 'A', 'C', 'B');\n    }\n}",
          "explanation": "Solves the 3-peg puzzle in 2^n - 1 = 7 steps using divide-and-conquer recursion."
        },
        {
          "id": "java-14-ex-2",
          "title": "Binary Tree In-Order Traversal",
          "difficulty": "Intermediate",
          "type": "coding",
          "prompt": "Write a recursive in-order traversal (Left, Root, Right) for a simple binary tree node class.",
          "solution": "class TreeNode {\n    int val;\n    TreeNode left, right;\n    TreeNode(int v) { this.val = v; }\n}\n\npublic class InOrderTraversal {\n    public static void inOrder(TreeNode root) {\n        if (root == null) return;\n        inOrder(root.left);\n        System.out.print(root.val + \" \");\n        inOrder(root.right);\n    }\n    public static void main(String[] args) {\n        TreeNode root = new TreeNode(2);\n        root.left = new TreeNode(1);\n        root.right = new TreeNode(3);\n        inOrder(root);\n        System.out.println();\n    }\n}",
          "explanation": "Visits left subtree, outputs root value, and visits right subtree, printing sorted values for a BST."
        },
        {
          "id": "java-14-ex-3",
          "title": "Iterative DFS with Explicit Stack",
          "difficulty": "Advanced",
          "type": "coding",
          "prompt": "Convert the recursive tree traversal to an iterative traversal using an explicit Deque stack to eliminate StackOverflow risk.",
          "solution": "import java.util.ArrayDeque;\nimport java.util.Deque;\n\nclass TreeNode {\n    int val;\n    TreeNode left, right;\n    TreeNode(int v) { this.val = v; }\n}\n\npublic class IterativeTreeTraversal {\n    public static void iterativeInOrder(TreeNode root) {\n        Deque<TreeNode> stack = new ArrayDeque<>();\n        TreeNode curr = root;\n        while (curr != null || !stack.isEmpty()) {\n            while (curr != null) {\n                stack.push(curr);\n                curr = curr.left;\n            }\n            curr = stack.pop();\n            System.out.print(curr.val + \" \");\n            curr = curr.right;\n        }\n        System.out.println();\n    }\n    public static void main(String[] args) {\n        TreeNode root = new TreeNode(2);\n        root.left = new TreeNode(1);\n        root.right = new TreeNode(3);\n        iterativeInOrder(root);\n    }\n}",
          "explanation": "Using an explicit heap-allocated stack prevents call-stack overflow on deep, skewed trees."
        }
      ],
      "quizQuestions": [
        {
          "id": "java-14-q1",
          "question": "What error is thrown at runtime when a recursive method in Java fails to terminate its base case?",
          "options": [
            "OutOfMemoryError",
            "StackOverflowError",
            "InternalError",
            "IllegalArgumentException"
          ],
          "correctOptionIndex": 1,
          "explanation": "Excessive recursive calls exhaust the thread's call stack limit, throwing java.lang.StackOverflowError."
        },
        {
          "id": "java-14-q2",
          "question": "Does the standard Oracle HotSpot JVM perform automatic Tail Call Optimization (TCO)?",
          "options": [
            "Yes, for all methods with @Tailrec",
            "Yes, whenever the recursive call is the last statement",
            "No, HotSpot retains complete stack traces for security checks and debugging",
            "Only when running with -O3 flag"
          ],
          "correctOptionIndex": 2,
          "explanation": "HotSpot does not optimize tail calls because Java's security model and debugging inspection rely on preserving full stack frame traces."
        }
      ],
      "revisionNotes": [
        "Every recursive method requires a base case and a shrinking recursive step.",
        "Call stack frames consume memory proportional to recursion depth.",
        "Java does not support Tail Call Optimization; deep recursion risks StackOverflowError."
      ]
    },
    {
      "id": "java-15-varargs",
      "moduleId": "java-m2",
      "moduleNumber": 2,
      "moduleTitle": "Java Core Programming",
      "topicNumber": 15,
      "title": "Variable Arguments (Varargs) & Method Signatures",
      "language": "java",
      "level": "Beginner",
      "whyItMatters": "Varargs (`...`) simplifies APIs that accept an arbitrary number of arguments (like `String.format` or `List.of`). Understanding its syntactic rules, array boxing overhead, and heap pollution warnings is essential for senior Java roles.",
      "explanation": "Introduced in Java 5, Variable Arguments (`varargs`) allow a method to accept zero or more arguments of a specified type.\nSyntax & Rules:\n1. The varargs parameter must always be the LAST parameter in the method signature (e.g. `void log(String prefix, int... numbers)`).\n2. A method can have AT MOST ONE varargs parameter.\n3. Under the hood, the compiler creates an array of that type and packs the arguments into the array at the call site. For example, `printAll(\"a\", \"b\")` compiles to `printAll(new String[]{\"a\", \"b\"})`.\n4. Performance implication: Every varargs call allocates a temporary array on the heap unless the method is called with an existing array.\n5. Varargs with Generics can trigger \"heap pollution\" warnings, requiring `@SafeVarargs`.",
      "syntaxAndStructure": "// Correct syntax:\npublic static int sum(int initial, int... rest) {\n    int total = initial;\n    for (int n : rest) total += n;\n    return total;\n}\n\n// COMPILE ERRORS:\n// void bad1(int... a, String s) {} // Error: Varargs must be last\n// void bad2(int... a, int... b) {} // Error: Only one varargs parameter allowed",
      "codeExamples": [
        {
          "title": "Varargs Implementation and Iteration",
          "code": "public class VarargsDemo {\n    public static String joinStrings(String delimiter, String... items) {\n        StringBuilder sb = new StringBuilder();\n        for (int i = 0; i < items.length; i++) {\n            sb.append(items[i]);\n            if (i < items.length - 1) {\n                sb.append(delimiter);\n            }\n        }\n        return sb.toString();\n    }\n\n    public static void main(String[] args) {\n        // Zero varargs arguments passed\n        System.out.println(\"Empty varargs: '\" + joinStrings(\"-\") + \"'\");\n\n        // Multiple discrete arguments\n        System.out.println(\"Joined: \" + joinStrings(\", \", \"Java\", \"Python\", \"C++\"));\n\n        // Passing an existing array directly\n        String[] preBuilt = { \"Spring\", \"Docker\", \"Kubernetes\" };\n        System.out.println(\"Passed array: \" + joinStrings(\" -> \", preBuilt));\n    }\n}",
          "expectedOutput": "Empty varargs: ''\nJoined: Java, Python, C++\nPassed array: Spring -> Docker -> Kubernetes",
          "explanation": "items inside joinStrings is treated as a standard array String[]. The caller can provide zero arguments, discrete arguments, or an array."
        },
        {
          "title": "SafeVarargs and Generic Varargs Concept",
          "code": "import java.util.Arrays;\nimport java.util.List;\n\npublic class SafeVarargsDemo {\n    // @SafeVarargs suppresses unchecked heap pollution warnings on final/static methods\n    @SafeVarargs\n    public static <T> List<T> asListSafe(T... elements) {\n        return Arrays.asList(elements);\n    }\n\n    public static void main(String[] args) {\n        List<String> skills = asListSafe(\"OOP\", \"DSA\", \"System Design\");\n        System.out.println(\"Safe varargs list size: \" + skills.size());\n        System.out.println(\"Skills: \" + skills);\n    }\n}",
          "expectedOutput": "Safe varargs list size: 3\nSkills: [OOP, DSA, System Design]",
          "explanation": "@SafeVarargs is an assertion by the developer that the method does not perform unsafe operations (like writing incompatible types into the varargs array)."
        }
      ],
      "realWorldApplications": [
        "Writing logging libraries (`logger.info(\"User {} logged in from {}\", userId, ipAddress)`).",
        "Factory utility methods like `List.of(...)`, `Set.of(...)`, and `Map.ofEntries(...)`."
      ],
      "commonMistakes": [
        "Placing the varargs parameter before regular parameters (e.g. `method(int... nums, String name)` fails compilation).",
        "Declaring more than one varargs parameter in a method signature.",
        "Ignoring the hidden heap allocation: calling a varargs method in a tight 1,000,000-iteration loop creates 1,000,000 array objects."
      ],
      "interviewRelevance": "Frequent MCQ topic: \"Where must varargs be placed in a parameter list?\", \"Can a method have two varargs?\", and \"How does the JVM execute varargs internally?\"",
      "checkpoints": [
        {
          "id": "java-15-cp-1",
          "label": "Enforce the two syntax rules: varargs must be last and at most one per method"
        },
        {
          "id": "java-15-cp-2",
          "label": "Understand that varargs compiles to array allocation under the hood"
        },
        {
          "id": "java-15-varargs-cp-3",
          "label": "Understand internal array creation and avoid ambiguous overloading with varargs."
        }
      ],
      "practiceExercises": [
        {
          "id": "java-15-ex-1",
          "title": "Calculate Mathematical Average with Varargs",
          "difficulty": "Beginner",
          "type": "coding",
          "prompt": "Write a method average(double first, double... rest) that guarantees at least one number is provided.",
          "solution": "public class VarargsAverage {\n    public static double average(double first, double... rest) {\n        double sum = first;\n        for (double d : rest) sum += d;\n        return sum / (1 + rest.length);\n    }\n    public static void main(String[] args) {\n        System.out.printf(\"%.2f%n\", average(10.0, 20.0, 30.0));\n    }\n}",
          "explanation": "Enforcing the first argument as a regular parameter guarantees compile-time enforcement that the caller passes at least one number."
        },
        {
          "id": "java-15-ex-2",
          "title": "Varargs Ambiguity in Overloading",
          "difficulty": "Intermediate",
          "type": "conceptual",
          "prompt": "Given void test(int... a) and void test(Integer... b), what happens if you call test(1, 2)?",
          "solution": "Compile error: \"The method test is ambiguous for the type\". The compiler can either treat the arguments as an int[] or autobox them to Integer[] for the second method, creating ambiguity.",
          "explanation": "Overloading two varargs methods with primitive and wrapper types triggers ambiguous call errors."
        },
        {
          "id": "java-15-ex-3",
          "title": "Heap Pollution Demonstration with Generic Varargs",
          "difficulty": "Advanced",
          "type": "conceptual",
          "prompt": "Explain what \"heap pollution\" means when generic varargs like <T> void m(T... args) are used in Java.",
          "solution": "Because Java arrays are reified (they check type at runtime) while generics undergo type erasure (T becomes Object at runtime), a generic varargs parameter T... is converted into Object[]. If a method stores an incompatible type into that array (e.g. putting an Integer into what was supposed to be a String[]), it pollutes the heap, causing a ClassCastException later at an unexpected site.",
          "explanation": "Generic varargs creates an array of erased types, breaking Java's static type safety guarantees if references are leaked."
        }
      ],
      "quizQuestions": [
        {
          "id": "java-15-q1",
          "question": "Which of the following method signatures is syntactically valid in Java?",
          "options": [
            "void calculate(int... numbers, String label)",
            "void calculate(String label, int... numbers)",
            "void calculate(int... a, double... b)",
            "void calculate(int... numbers, int count)"
          ],
          "correctOptionIndex": 1,
          "explanation": "The varargs parameter must be the last parameter in the method signature, and there can be at most one varargs parameter."
        },
        {
          "id": "java-15-q2",
          "question": "What does the compiler generate under the hood for a call `printNumbers(1, 2, 3)` where the method is `void printNumbers(int... nums)`?",
          "options": [
            "It passes 1, 2, 3 as individual registers",
            "It constructs a new array: `printNumbers(new int[]{ 1, 2, 3 })`",
            "It converts them to a LinkedList",
            "It evaluates them with reflection"
          ],
          "correctOptionIndex": 1,
          "explanation": "Varargs is syntactic sugar for array parameters. The compiler generates code that instantiates and populates an array with the arguments."
        }
      ],
      "revisionNotes": [
        "Varargs parameter must be the last parameter; maximum of one varargs per method.",
        "Under the hood, varargs compiles to an array instantiation.",
        "Require at least one argument cleanly by declaring `void f(Type first, Type... rest)`."
      ]
    },
    {
      "id": "java-16-packages-imports",
      "moduleId": "java-m2",
      "moduleNumber": 2,
      "moduleTitle": "Java Core Programming",
      "topicNumber": 16,
      "title": "Packages, Hierarchical Naming & Static Imports",
      "language": "java",
      "level": "Beginner",
      "whyItMatters": "Packages prevent naming collisions, define encapsulation boundaries, and structure large software systems. Mastering static imports and package-private access is critical for modular codebase architecture.",
      "explanation": "A package in Java is a namespace that groups related classes, interfaces, and sub-packages. Packages serve two purposes:\n1. Name Collision Prevention: Two classes can share the name `Date` if one is `java.util.Date` and the other is `java.sql.Date`.\n2. Access Control: Classes in the same package can access package-private members.\n\nPackage Rules:\n- The `package` declaration must be the very first non-comment statement in a `.java` file.\n- Directory structure must match package names (e.g. `package com.ak67.prep;` must reside in directory `com/ak67/prep`).\n- Reverse domain naming convention (`com.company.project.module`) guarantees global uniqueness.\n- `import static`: Imports static members (constants and static methods) so they can be referenced without qualifying class names (e.g. `import static java.lang.Math.PI;`).",
      "syntaxAndStructure": "package com.ak67.model;\n\n// Specific class import\nimport java.util.List;\n\n// Wildcard import (imports classes in java.util, NOT subpackages)\nimport java.util.*;\n\n// Static import of specific member\nimport static java.lang.Math.sqrt;\nimport static java.lang.Math.PI;\n\npublic class Circle {\n    public double area(double r) { return PI * r * r; }\n}",
      "codeExamples": [
        {
          "title": "Demonstrating Static Imports for Clean Math Code",
          "code": "// Simulating static import usage\nimport static java.lang.Math.PI;\nimport static java.lang.Math.pow;\nimport static java.lang.Math.sqrt;\n\npublic class StaticImportDemo {\n    public static void main(String[] args) {\n        // Without static import: Math.sqrt(Math.pow(3, 2) + Math.pow(4, 2))\n        // With static import: direct concise expressions\n        double hypotenuse = sqrt(pow(3, 2) + pow(4, 2));\n        double circleArea = PI * pow(5, 2);\n\n        System.out.println(\"Hypotenuse of 3 and 4: \" + hypotenuse);\n        System.out.printf(\"Area of radius 5 circle: %.2f%n\", circleArea);\n    }\n}",
          "expectedOutput": "Hypotenuse of 3 and 4: 5.0\nArea of radius 5 circle: 78.54",
          "explanation": "Static imports allow referencing static fields (PI) and static methods (sqrt, pow) directly without qualifying them with the Math class name."
        },
        {
          "title": "Resolving Class Naming Collisions with Full Qualification",
          "code": "public class PackageCollisionDemo {\n    public static void main(String[] args) {\n        // Resolving collision between java.util.Date and java.sql.Date\n        java.util.Date utilDate = new java.util.Date();\n        java.sql.Date sqlDate = new java.sql.Date(utilDate.getTime());\n\n        System.out.println(\"utilDate loaded: \" + (utilDate != null));\n        System.out.println(\"sqlDate loaded: \" + (sqlDate != null));\n        System.out.println(\"Class collision successfully resolved with FQCN.\");\n    }\n}",
          "expectedOutput": "utilDate loaded: true\nsqlDate loaded: true\nClass collision successfully resolved with FQCN.",
          "explanation": "When two imported packages share a class with the same name, Java requires Fully Qualified Class Names (FQCN) to resolve the ambiguity."
        }
      ],
      "realWorldApplications": [
        "Structuring enterprise applications into domain packages (`com.app.service`, `com.app.repository`, `com.app.controller`).",
        "Writing concise unit tests using static imports for assertions (`import static org.junit.jupiter.api.Assertions.assertEquals;`)."
      ],
      "commonMistakes": [
        "Assuming that `import java.util.*;` also imports sub-packages like `java.util.concurrent.*`; package imports are non-recursive.",
        "Overusing static wildcard imports (`import static ...*`), which clutters namespaces and obscures method origin.",
        "Assuming importing a package imports its subpackages (e.g. java.util.* does not import java.util.concurrent.*)."
      ],
      "interviewRelevance": "Frequent questions: \"What is a static import?\", \"What does package-private mean?\", and \"Does `import java.awt.*` import `java.awt.event.*`?\" (Answer: No).",
      "checkpoints": [
        {
          "id": "java-16-cp-1",
          "label": "Explain how reverse domain name conventions guarantee package uniqueness"
        },
        {
          "id": "java-16-cp-2",
          "label": "Use static imports effectively without polluting namespace clarity"
        },
        {
          "id": "java-16-packages-imports-cp-3",
          "label": "Structure projects with reverse domain package conventions and explicit imports."
        }
      ],
      "practiceExercises": [
        {
          "id": "java-16-ex-1",
          "title": "Resolve Ambiguous Date Import",
          "difficulty": "Beginner",
          "type": "conceptual",
          "prompt": "If a file has `import java.util.*;` and `import java.sql.*;`, what happens when you write `Date d = new Date();`?",
          "solution": "Compile error: \"The type Date is ambiguous\". Both java.util and java.sql contain a Date class. You must either import the specific Date class explicitly or qualify it: java.util.Date d = new java.util.Date();",
          "explanation": "Wildcard imports containing identically named classes collide if both candidates are referenced without qualification."
        },
        {
          "id": "java-16-ex-2",
          "title": "Static Import Assertion Style",
          "difficulty": "Intermediate",
          "type": "coding",
          "prompt": "Write a class MathHelper that demonstrates static importing Integer.MAX_VALUE and Math.max to compute the maximum among three numbers.",
          "solution": "import static java.lang.Math.max;\nimport static java.lang.Integer.MIN_VALUE;\n\npublic class MathHelper {\n    public static int maxOfThree(int a, int b, int c) {\n        int highest = max(MIN_VALUE, a);\n        highest = max(highest, b);\n        highest = max(highest, c);\n        return highest;\n    }\n    public static void main(String[] args) {\n        System.out.println(\"Highest: \" + maxOfThree(12, 85, 42));\n    }\n}",
          "explanation": "Static imports make mathematical algorithms read cleanly like natural formulas."
        },
        {
          "id": "java-16-ex-3",
          "title": "Package Sealing and Architecture",
          "difficulty": "Advanced",
          "type": "conceptual",
          "prompt": "What is a \"sealed package\" in a Java JAR manifest, and what security advantage does it provide?",
          "solution": "Package sealing (configured in MANIFEST.MF via `Sealed: true`) specifies that all classes belonging to that package must be archived in the exact same JAR file. This prevents malicious third-party code on the classpath from injecting rogue classes into the package to access package-private internals.",
          "explanation": "Sealed packages enforce encapsulation boundaries at the JAR distribution level."
        }
      ],
      "quizQuestions": [
        {
          "id": "java-16-q1",
          "question": "Does the wildcard import `import java.util.*;` import classes from sub-packages like `java.util.concurrent`?",
          "options": [
            "Yes, it recursively imports all sub-packages",
            "No, package imports are strictly flat and do not import sub-packages",
            "Only if the compiler flag -recurse is passed",
            "Only in Java 17 and above"
          ],
          "correctOptionIndex": 1,
          "explanation": "Package imports in Java are strictly non-recursive. Sub-packages must be imported with their own explicit import statements."
        },
        {
          "id": "java-16-q2",
          "question": "Which statement about Java static imports is correct?",
          "options": [
            "It imports all non-static methods of a class",
            "It is used to import static members (fields and methods) directly into the namespace",
            "It makes the imported class immutable",
            "It replaces normal class inheritance"
          ],
          "correctOptionIndex": 1,
          "explanation": "`import static` allows referencing static fields and methods without qualifying them with the class name."
        }
      ],
      "revisionNotes": [
        "Packages prevent naming collisions and enforce architectural boundaries.",
        "Wildcard imports (`.*`) are flat and do not import sub-packages.",
        "Use static imports for constants and utility functions to improve readability."
      ]
    },
    {
      "id": "java-17-access-modifiers",
      "moduleId": "java-m2",
      "moduleNumber": 2,
      "moduleTitle": "Java Core Programming",
      "topicNumber": 17,
      "title": "Access Modifiers: private, package-private, protected & public",
      "language": "java",
      "level": "Beginner",
      "whyItMatters": "Access modifiers are the primary mechanism for encapsulation and data hiding in Java. Understanding the subtle difference between `protected` and default package-private access is tested in every technical interview.",
      "explanation": "Java provides four access levels using three keywords:\n1. `private`: Accessible ONLY within the defining class. Strongest level of encapsulation.\n2. Default (Package-Private / no modifier): Accessible by any class within the SAME package. NOT accessible outside the package, even by subclasses.\n3. `protected`: Accessible within the SAME package, AND by subclasses in DIFFERENT packages (via inheritance).\n4. `public`: Accessible from ANY class in any package.\n\nSummary Access Matrix:\n- Class | Package | Subclass (diff pkg) | World\n- private: Yes | No | No | No\n- default: Yes | Yes | No | No\n- protected: Yes | Yes | Yes | No\n- public: Yes | Yes | Yes | Yes\n\nTop-level classes can only be `public` or default (package-private). They cannot be `private` or `protected` (except for inner/nested classes).",
      "syntaxAndStructure": "public class AccessDemo {\n    private int secret = 1;        // Class only\n    int packageShared = 2;         // Package only (default)\n    protected int familyShared = 3; // Package + Subclasses in other packages\n    public int worldShared = 4;    // Everyone\n}",
      "codeExamples": [
        {
          "title": "Encapsulation with Private Fields and Public Accessors",
          "code": "public class BankAccount {\n    private double balance; // Protected from unauthorized direct mutation\n\n    public BankAccount(double initialDeposit) {\n        if (initialDeposit >= 0) {\n            this.balance = initialDeposit;\n        } else {\n            this.balance = 0;\n        }\n    }\n\n    public void deposit(double amount) {\n        if (amount > 0) {\n            this.balance += amount;\n            System.out.println(\"Deposited: \" + amount);\n        }\n    }\n\n    public double getBalance() {\n        return this.balance;\n    }\n\n    public static void main(String[] args) {\n        BankAccount acc = new BankAccount(100.0);\n        acc.deposit(50.0);\n        // acc.balance = -9999; // COMPILE ERROR: balance has private access in BankAccount\n        System.out.println(\"Verified Balance: \" + acc.getBalance());\n    }\n}",
          "expectedOutput": "Deposited: 50.0\nVerified Balance: 150.0",
          "explanation": "Private access ensures that the balance field cannot be arbitrarily corrupted from the outside; all modifications must pass through validating public methods."
        },
        {
          "title": "Protected Access in Inheritance Across Conceptual Packages",
          "code": "// Base class simulating package com.entity\nclass SuperResource {\n    protected String securityBadge = \"LEVEL_3\";\n}\n\n// Subclass accessing protected member\npublic class ProtectedAccessDemo extends SuperResource {\n    public void displayAccess() {\n        // Subclass can access protected member of parent class\n        System.out.println(\"Inherited security badge: \" + securityBadge);\n    }\n\n    public static void main(String[] args) {\n        ProtectedAccessDemo demo = new ProtectedAccessDemo();\n        demo.displayAccess();\n    }\n}",
          "expectedOutput": "Inherited security badge: LEVEL_3",
          "explanation": "The protected modifier allows inheriting subclasses to access parent fields directly, even if located across package boundaries."
        }
      ],
      "realWorldApplications": [
        "Encapsulating internal domain states in banking and payment systems to prevent unauthorized tampering.",
        "Framework architecture (like Spring or Hibernate) where base template classes expose protected hook methods for customization."
      ],
      "commonMistakes": [
        "Assuming `protected` is less visible than default package-private; `protected` is strictly MORE visible because it extends access to subclasses in other packages.",
        "Marking top-level classes as `private` or `protected`; only nested/inner classes can have private or protected modifiers.",
        "Confusing package-private (default no modifier) with protected access; default does not grant access to subclasses in other packages."
      ],
      "interviewRelevance": "Crucial interview test: \"Can a subclass in another package access a protected member using a parent reference?\" (Answer: No, only through inheritance or its own reference).",
      "checkpoints": [
        {
          "id": "java-17-cp-1",
          "label": "Memorize the visibility matrix for private, default, protected, and public"
        },
        {
          "id": "java-17-cp-2",
          "label": "Explain why top-level classes cannot be private or protected"
        },
        {
          "id": "java-17-access-modifiers-cp-3",
          "label": "Select the least permissive access modifier to uphold encapsulation."
        }
      ],
      "practiceExercises": [
        {
          "id": "java-17-ex-1",
          "title": "Evaluate Cross-Package Default Access",
          "difficulty": "Beginner",
          "type": "conceptual",
          "prompt": "Class A in package p1 has default method void foo(). Class B in package p2 extends A. Can class B call foo()? Explain why.",
          "solution": "No, class B cannot call foo(). Default (package-private) methods are strictly accessible only within the same package (p1). Subclasses in different packages (p2) have zero access to default members.",
          "explanation": "Only `protected` and `public` methods are inherited and accessible across package boundaries."
        },
        {
          "id": "java-17-ex-2",
          "title": "Design Immutable Value Object",
          "difficulty": "Intermediate",
          "type": "coding",
          "prompt": "Write an immutable class Point2D with private final fields x and y, public getters, and no setters.",
          "solution": "public final class Point2D {\n    private final int x;\n    private final int y;\n\n    public Point2D(int x, int y) {\n        this.x = x;\n        this.y = y;\n    }\n\n    public int getX() { return x; }\n    public int getY() { return y; }\n\n    public static void main(String[] args) {\n        Point2D p = new Point2D(10, 20);\n        System.out.println(\"Point: (\" + p.getX() + \", \" + p.getY() + \")\");\n    }\n}",
          "explanation": "A class declared final with private final fields and no mutating methods guarantees complete immutability."
        },
        {
          "id": "java-17-ex-3",
          "title": "Subclass Access Rule for Protected Members",
          "difficulty": "Advanced",
          "type": "conceptual",
          "prompt": "In package p1: public class Parent { protected int x; }. In package p2: public class Child extends Parent { void test() { Parent p = new Parent(); System.out.println(p.x); } }. Will this compile? Explain.",
          "solution": "Compile error. A subclass in another package can only access protected members of its superclass through inheritance (`this.x` or `super.x`) or on instances of the subclass type (`Child c; c.x;`). It CANNOT access protected members on an explicit parent instance (`new Parent().x`), because that would violate package-private encapsulation.",
          "explanation": "JLS specifies that protected cross-package access is only permitted through references of the subclass or its subtypes."
        }
      ],
      "quizQuestions": [
        {
          "id": "java-17-q1",
          "question": "Which access modifier allows access within the same package AND by subclasses in other packages?",
          "options": [
            "private",
            "default (package-private)",
            "protected",
            "public"
          ],
          "correctOptionIndex": 2,
          "explanation": "`protected` grants access within the same package plus access to subclasses located in external packages."
        },
        {
          "id": "java-17-q2",
          "question": "What access modifiers are permitted for a standard top-level class in Java?",
          "options": [
            "public and default (package-private) only",
            "public, private, protected, and default",
            "public only",
            "public and protected only"
          ],
          "correctOptionIndex": 0,
          "explanation": "Top-level classes can only be public or default. Only nested (inner) classes can be declared private or protected."
        }
      ],
      "revisionNotes": [
        "Visibility from narrowest to widest: private -> default -> protected -> public.",
        "default access is package-only; protected adds cross-package subclass inheritance.",
        "Top-level classes can only be public or default."
      ]
    },
    {
      "id": "java-18-static-members",
      "moduleId": "java-m2",
      "moduleNumber": 2,
      "moduleTitle": "Java Core Programming",
      "topicNumber": 18,
      "title": "Static Variables, Methods & Initialization Blocks",
      "language": "java",
      "level": "Beginner",
      "whyItMatters": "The `static` keyword binds state and behavior to the Class rather than to object instances. Misunderstanding static members leads to memory leaks, race conditions in multi-threaded code, and confusion during OOP method overriding questions.",
      "explanation": "In Java, `static` members belong to the class as a whole, loaded once when the class is initialized:\n1. Static Variables: Shared across all instances of the class. Stored in the Class definition (Metaspace / Heap in modern Java). Only one copy exists in memory.\n2. Static Methods: Can be invoked without creating an instance (`Math.sqrt()`). Cannot use `this` or `super`. Cannot access instance variables or instance methods directly.\n3. Static Initialization Block: Runs once when the class is first loaded by the ClassLoader. Used to initialize complex static state.\n4. Static Method Hiding: Static methods CANNOT be overridden. If a subclass declares a static method with the same signature, it \"hides\" the parent method rather than participating in dynamic runtime polymorphism.",
      "syntaxAndStructure": "public class Counter {\n    // Static variable: shared by all instances\n    public static int globalCount = 0;\n    \n    // Static block: runs once on class loading\n    static {\n        System.out.println(\"Class initialized\");\n    }\n    \n    // Static method\n    public static int getGlobalCount() {\n        return globalCount;\n    }\n}",
      "codeExamples": [
        {
          "title": "Static Variable Shared State and Counter",
          "code": "public class StaticCounterDemo {\n    static class InstanceTracker {\n        static int totalInstances = 0; // Shared across all objects\n        int instanceId;                 // Unique per object\n\n        InstanceTracker() {\n            totalInstances++;\n            this.instanceId = totalInstances;\n        }\n    }\n\n    public static void main(String[] args) {\n        InstanceTracker a = new InstanceTracker();\n        InstanceTracker b = new InstanceTracker();\n        InstanceTracker c = new InstanceTracker();\n\n        System.out.println(\"Instance A ID: \" + a.instanceId);\n        System.out.println(\"Instance B ID: \" + b.instanceId);\n        System.out.println(\"Instance C ID: \" + c.instanceId);\n        System.out.println(\"Total instances created: \" + InstanceTracker.totalInstances);\n    }\n}",
          "expectedOutput": "Instance A ID: 1\nInstance B ID: 2\nInstance C ID: 3\nTotal instances created: 3",
          "explanation": "totalInstances is shared by all instances. Each new instantiation increments the shared static counter, while instanceId remains unique to each object."
        },
        {
          "title": "Static Method Hiding vs Method Overriding",
          "code": "class ParentVehicle {\n    public static void identify() {\n        System.out.println(\"ParentVehicle static identify\");\n    }\n}\n\nclass ElectricCar extends ParentVehicle {\n    public static void identify() {\n        System.out.println(\"ElectricCar static identify\");\n    }\n}\n\npublic class StaticHidingDemo {\n    public static void main(String[] args) {\n        ParentVehicle vehicle = new ElectricCar();\n        // Method call is resolved at compile time based on reference type, NOT object type!\n        vehicle.identify(); // Calls ParentVehicle.identify()\n        \n        ElectricCar.identify(); // Explicit class call\n    }\n}",
          "expectedOutput": "ParentVehicle static identify\nElectricCar static identify",
          "explanation": "Static methods are resolved at compile time based on reference type (ParentVehicle), not runtime polymorphism. This is method hiding, NOT method overriding."
        }
      ],
      "realWorldApplications": [
        "Singleton pattern implementations and global application configuration registries.",
        "Utility classes (e.g. `java.util.Collections`, `java.util.Arrays`, `java.lang.Math`)."
      ],
      "commonMistakes": [
        "Attempting to use `this` or call non-static instance methods directly from a `static` method.",
        "Expecting static methods to participate in dynamic polymorphism; calling `parentRef.staticMethod()` executes the parent method regardless of the actual child instance.",
        "Accessing instance members directly from static methods without having an instantiated object reference."
      ],
      "interviewRelevance": "Universal interview question: \"Can we override static methods in Java?\" (Answer: No, static methods are hidden, not overridden).",
      "checkpoints": [
        {
          "id": "java-18-cp-1",
          "label": "Explain why static methods cannot access this or instance members directly"
        },
        {
          "id": "java-18-cp-2",
          "label": "Distinguish compile-time method hiding from runtime method overriding"
        },
        {
          "id": "java-18-static-members-cp-3",
          "label": "Explain class-level memory allocation in Metaspace and static initializer execution."
        }
      ],
      "practiceExercises": [
        {
          "id": "java-18-ex-1",
          "title": "Order of Static and Instance Initializers",
          "difficulty": "Beginner",
          "type": "coding",
          "prompt": "Write a class with static block, instance block, constructor, and main to demonstrate their exact execution sequence.",
          "solution": "public class InitSequence {\n    static { System.out.println(\"1. Static Block\"); }\n    { System.out.println(\"3. Instance Block\"); }\n    public InitSequence() { System.out.println(\"4. Constructor\"); }\n\n    public static void main(String[] args) {\n        System.out.println(\"2. Main Method\");\n        new InitSequence();\n    }\n}",
          "explanation": "Static blocks execute once upon class loading before main. Instance blocks execute on each instantiation before constructor."
        },
        {
          "id": "java-18-ex-2",
          "title": "Thread-Safe Static Utility Class",
          "difficulty": "Intermediate",
          "type": "coding",
          "prompt": "Design a utility class StringUtils that cannot be instantiated (private constructor) and contains static null-safe checking.",
          "solution": "public final class StringUtils {\n    // Suppress default constructor for non-instantiability\n    private StringUtils() {\n        throw new AssertionError(\"Cannot instantiate utility class\");\n    }\n\n    public static boolean isBlank(String s) {\n        return s == null || s.trim().isEmpty();\n    }\n\n    public static void main(String[] args) {\n        System.out.println(\"Blank check: \" + StringUtils.isBlank(\"  \"));\n    }\n}",
          "explanation": "A private constructor throwing AssertionError guarantees that utility classes cannot be instantiated, even via reflection."
        },
        {
          "id": "java-18-ex-3",
          "title": "Static Memory Leak Scenario",
          "difficulty": "Advanced",
          "type": "conceptual",
          "prompt": "How can a static Collection (like static List<Object>) cause an OutOfMemoryError in a long-running Java application?",
          "solution": "Because static variables remain referenced as long as their defining ClassLoader is alive (usually the entire lifetime of the JVM application), objects added to a static collection are never eligible for Garbage Collection. If objects are continuously added without eviction, the heap is exhausted, leading to `java.lang.OutOfMemoryError: Java heap space`.",
          "explanation": "Static references form GC roots that prevent unreferenced objects from being collected."
        }
      ],
      "quizQuestions": [
        {
          "id": "java-18-q1",
          "question": "Can a static method in Java be overridden by a subclass?",
          "options": [
            "Yes, if marked with @Override",
            "No, static methods are resolved at compile time and are hidden, not overridden",
            "Only if the parent method is public",
            "Yes, dynamic dispatch applies to static methods"
          ],
          "correctOptionIndex": 1,
          "explanation": "Static methods belong to the class, not instance objects. They do not participate in dynamic method dispatch and cannot be overridden."
        },
        {
          "id": "java-18-q2",
          "question": "Why can a static method not use the `this` keyword?",
          "options": [
            "Because this is a reserved keyword for C++",
            "Because static methods are invoked without an instance context of the class",
            "Because this only works in constructors",
            "Because the garbage collector locks this"
          ],
          "correctOptionIndex": 1,
          "explanation": "`this` represents the current instance object. Since static methods exist independent of any instantiated object, `this` has no meaning."
        }
      ],
      "revisionNotes": [
        "Static members belong to the class, not individual object instances.",
        "Static methods cannot access `this` or instance variables directly.",
        "Static methods can be hidden, but NEVER overridden."
      ]
    },
    {
      "id": "java-19-final-keyword",
      "moduleId": "java-m2",
      "moduleNumber": 2,
      "moduleTitle": "Java Core Programming",
      "topicNumber": 19,
      "title": "The final Keyword: Variables, Methods & Classes",
      "language": "java",
      "level": "Beginner",
      "whyItMatters": "The `final` keyword is the cornerstone of immutability, thread safety, and defensive programming in Java. Misunderstanding final reference mutability vs variable reassignment is a notorious placement trap.",
      "explanation": "The `final` keyword in Java enforces immutability and finality across three levels:\n1. Final Variables: Once initialized, their value cannot be changed.\n   - For primitive variables: the value is constant.\n   - For object references: the reference address cannot be reassigned to point to another object, BUT the internal state of the referenced object CAN still be mutated!\n   - Blank final variable: A final field not initialized at declaration; must be initialized in all constructors.\n2. Final Methods: Cannot be overridden by any subclass. Used to prevent breaking core security or invariants.\n3. Final Classes: Cannot be extended/subclassed (e.g. `java.lang.String`, `java.lang.Math`). All methods of a final class are implicitly final.",
      "syntaxAndStructure": "// 1. Final variable (cannot be reassigned)\nfinal int MAX_USERS = 100;\nfinal List<String> list = new ArrayList<>();\nlist.add(\"allowed\"); // MUTATION IS ALLOWED!\n// list = new ArrayList<>(); // REASSIGNMENT IS FORBIDDEN (Compile error)\n\n// 2. Final method (cannot be overridden)\nclass Base {\n    public final void secureAlgorithm() { ... }\n}\n\n// 3. Final class (cannot be extended)\npublic final class ImmutableEntity { ... }",
      "codeExamples": [
        {
          "title": "Final Reference vs Object Mutability Proof",
          "code": "import java.util.ArrayList;\nimport java.util.List;\n\npublic class FinalReferenceDemo {\n    public static void main(String[] args) {\n        // final reference variable\n        final List<String> techStack = new ArrayList<>();\n\n        // 1. Mutating the object pointed to by the final reference is FULLY ALLOWED:\n        techStack.add(\"Java 21\");\n        techStack.add(\"Spring Boot\");\n        System.out.println(\"Mutated list contents: \" + techStack);\n\n        // 2. Reassigning the reference itself causes a compile error:\n        // techStack = new ArrayList<>(); // COMPILE ERROR: cannot assign a value to final variable\n\n        System.out.println(\"Reference cannot be changed; list size: \" + techStack.size());\n    }\n}",
          "expectedOutput": "Mutated list contents: [Java 21, Spring Boot]\nReference cannot be changed; list size: 2",
          "explanation": "A final reference prevents reassigning the variable pointer to a different object, but does NOT make the underlying object immutable."
        },
        {
          "title": "Blank Final Variable Initialization in Constructor",
          "code": "public class BlankFinalDemo {\n    private final String apiKey; // Blank final field\n    private final int timeoutSeconds;\n\n    public BlankFinalDemo(String key, int timeout) {\n        this.apiKey = key; // Must be initialized in constructor\n        this.timeoutSeconds = timeout;\n    }\n\n    public void printConfig() {\n        System.out.println(\"API Key: \" + apiKey + \", Timeout: \" + timeoutSeconds + \"s\");\n    }\n\n    public static void main(String[] args) {\n        BlankFinalDemo config = new BlankFinalDemo(\"SECRET_KEY_123\", 30);\n        config.printConfig();\n    }\n}",
          "expectedOutput": "API Key: SECRET_KEY_123, Timeout: 30s",
          "explanation": "Blank final variables can defer initialization to the constructor, enabling instance-specific immutable configuration."
        }
      ],
      "realWorldApplications": [
        "Creating thread-safe immutable domain objects (like `String` or financial transaction records).",
        "Configuring compile-time constants (`public static final String ENV_PROD = \"PROD\";`)."
      ],
      "commonMistakes": [
        "Believing `final List<T>` makes the list contents read-only; use `Collections.unmodifiableList()` or `List.of()` for read-only lists.",
        "Failing to initialize a blank final variable in all constructor paths, causing a compile error.",
        "Assuming a final object reference makes the underlying object immutable; final only prevents pointer reassignment."
      ],
      "interviewRelevance": "Classic interview question: \"What is the difference between final, finally, and finalize in Java?\" and \"Does a final reference guarantee object immutability?\"",
      "checkpoints": [
        {
          "id": "java-19-cp-1",
          "label": "Differentiate final variable, final method, and final class"
        },
        {
          "id": "java-19-cp-2",
          "label": "Explain why a final reference does NOT make the underlying object immutable"
        },
        {
          "id": "java-19-final-keyword-cp-3",
          "label": "Apply final to variables (constants), methods (prevent overriding), and classes (prevent inheritance)."
        }
      ],
      "practiceExercises": [
        {
          "id": "java-19-ex-1",
          "title": "Compare final, finally, and finalize",
          "difficulty": "Beginner",
          "type": "conceptual",
          "prompt": "Succinctly differentiate: final, finally, and finalize.",
          "solution": "1. `final`: Keyword applied to variables (cannot reassign), methods (cannot override), and classes (cannot inherit).\n2. `finally`: Block in exception handling that executes unconditionally after try/catch for resource cleanup.\n3. `finalize()`: Deprecated method in java.lang.Object called by GC before object reclamation (deprecated since Java 9, removed/replaced by Cleaner).",
          "explanation": "Three fundamentally distinct language mechanisms that share a lexical root."
        },
        {
          "id": "java-19-ex-2",
          "title": "Truly Immutable Collection Wrapper",
          "difficulty": "Intermediate",
          "type": "coding",
          "prompt": "Write a class Container holding a list of tags that is truly immutable to callers.",
          "solution": "import java.util.List;\n\npublic final class ImmutableContainer {\n    private final List<String> tags;\n\n    public ImmutableContainer(List<String> inputTags) {\n        // List.copyOf creates an unmodifiable copy (Java 10+)\n        this.tags = List.copyOf(inputTags);\n    }\n\n    public List<String> getTags() {\n        return this.tags; // Already unmodifiable\n    }\n\n    public static void main(String[] args) {\n        ImmutableContainer c = new ImmutableContainer(List.of(\"A\", \"B\"));\n        System.out.println(\"Tags: \" + c.getTags());\n    }\n}",
          "explanation": "List.copyOf() returns an immutable list that throws UnsupportedOperationException on any modification attempt."
        },
        {
          "id": "java-19-ex-3",
          "title": "Effectively Final in Lambdas",
          "difficulty": "Advanced",
          "type": "conceptual",
          "prompt": "What does \"effectively final\" mean in Java 8+, and why do lambdas and anonymous inner classes require it?",
          "solution": "A variable is \"effectively final\" if its value is never modified after initialization, even if it lacks the explicit `final` keyword. Lambdas capture local variables by value (copying them to the heap). If local variables could mutate, the stack copy and heap copy would desynchronize, creating race conditions. Hence, Java enforces that captured variables must be final or effectively final.",
          "explanation": "Enforces memory consistency across thread stack frames and heap-allocated lambda instances."
        }
      ],
      "quizQuestions": [
        {
          "id": "java-19-q1",
          "question": "What is the effect of declaring a class as `final` in Java?",
          "options": [
            "All of its fields become private",
            "The class cannot be extended (subclassed)",
            "The class can only be instantiated once",
            "All objects of this class are stored in Metaspace"
          ],
          "correctOptionIndex": 1,
          "explanation": "Declaring a class final prohibits other classes from extending it (e.g. String is a final class)."
        },
        {
          "id": "java-19-q2",
          "question": "Does `final List<Integer> numbers = new ArrayList<>();` prevent numbers.add(10)?",
          "options": [
            "Yes, final collections cannot be modified",
            "No, the reference cannot be reassigned, but the list object can be mutated",
            "It throws a runtime UnsupportedOperationException",
            "It causes a compilation error"
          ],
          "correctOptionIndex": 1,
          "explanation": "`final` on an object reference only locks the pointer itself. The referenced object remains fully mutable."
        }
      ],
      "revisionNotes": [
        "`final` variable = cannot be reassigned.",
        "`final` method = cannot be overridden.",
        "`final` class = cannot be extended/subclassed."
      ]
    },
    {
      "id": "java-20-wrapper-classes-autoboxing",
      "moduleId": "java-m2",
      "moduleNumber": 2,
      "moduleTitle": "Java Core Programming",
      "topicNumber": 20,
      "title": "Wrapper Classes, Autoboxing & Integer Cache Pitfalls",
      "language": "java",
      "level": "Beginner",
      "whyItMatters": "Java collections only store objects, requiring primitives to be wrapped. The Integer Cache (-128 to 127) causes subtle comparison bugs where `==` returns true for small numbers but false for larger numbers.",
      "explanation": "Java provides 8 wrapper classes corresponding to each primitive: `Byte`, `Short`, `Integer`, `Long`, `Float`, `Double`, `Character`, `Boolean`. All numeric wrappers inherit from `java.lang.Number` and are immutable.\n1. Autoboxing: Automatic conversion of primitive to wrapper (e.g., `Integer x = 10;` compiles to `Integer.valueOf(10)`).\n2. Unboxing: Automatic conversion of wrapper to primitive (e.g., `int y = x;` compiles to `x.intValue()`).\n   - Risk: Unboxing a `null` wrapper throws `NullPointerException`!\n3. Integer Cache: The JVM caches `Integer` instances for values between -128 and 127 (inclusive). Therefore, `Integer a = 100; Integer b = 100; a == b` is TRUE (same cached reference), but `Integer a = 200; Integer b = 200; a == b` is FALSE (separate heap objects)! Always compare wrappers with `.equals()`.",
      "syntaxAndStructure": "// Autoboxing (primitive -> wrapper)\nInteger boxed = 42; // Integer.valueOf(42)\n\n// Unboxing (wrapper -> primitive)\nint unboxed = boxed; // boxed.intValue()\n\n// Integer Cache Trap:\nInteger a = 127, b = 127;\nSystem.out.println(a == b); // true (cached)\n\nInteger c = 128, d = 128;\nSystem.out.println(c == d); // false (different objects!)\nSystem.out.println(c.equals(d)); // true (value equality)",
      "codeExamples": [
        {
          "title": "The Integer Cache Trap Demonstration (-128 to 127)",
          "code": "public class IntegerCacheDemo {\n    public static void main(String[] args) {\n        // Values within [-128, 127] are cached by JVM\n        Integer low1 = 127;\n        Integer low2 = 127;\n        System.out.println(\"127 == 127 (using ==): \" + (low1 == low2)); // TRUE\n\n        // Values outside [-128, 127] allocate new objects on Heap\n        Integer high1 = 128;\n        Integer high2 = 128;\n        System.out.println(\"128 == 128 (using ==): \" + (high1 == high2)); // FALSE!\n\n        // Correct way: always use .equals() for wrapper comparison\n        System.out.println(\"128.equals(128): \" + high1.equals(high2)); // TRUE\n    }\n}",
          "expectedOutput": "127 == 127 (using ==): true\n128 == 128 (using ==): false\n128.equals(128): true",
          "explanation": "Integer.valueOf() caches instances in range -128 to 127. Values outside that range allocate distinct heap objects, making reference comparison `==` return false."
        },
        {
          "title": "Unboxing NullPointerException Demonstration",
          "code": "public class UnboxingNpeDemo {\n    public static void main(String[] args) {\n        Integer nullableScore = null;\n\n        try {\n            // Implicit unboxing calls nullableScore.intValue(), throwing NPE!\n            int score = nullableScore;\n            System.out.println(\"Score: \" + score);\n        } catch (NullPointerException e) {\n            System.out.println(\"Caught NullPointerException during automatic unboxing of null!\");\n        }\n    }\n}",
          "expectedOutput": "Caught NullPointerException during automatic unboxing of null!",
          "explanation": "Unboxing translates to calling `.intValue()` on the wrapper. If the wrapper reference is null, a NullPointerException is thrown."
        }
      ],
      "realWorldApplications": [
        "Storing primitives in Java Collections Framework (`List<Integer>`, `Map<String, Long>`).",
        "Handling optional database columns where a numeric field can be NULL (using `Integer` instead of `int`)."
      ],
      "commonMistakes": [
        "Using `==` to compare wrapper objects; it works for small values due to cache but silently breaks in production for numbers >= 128.",
        "Unboxing wrappers inside arithmetic expressions without null checks, causing NullPointerExceptions.",
        "Comparing boxed Integer instances using == instead of .equals(), failing for numbers outside the [-128..127] IntegerCache range."
      ],
      "interviewRelevance": "Classic interview puzzle: \"Why does `Integer a = 100, b = 100; a == b` print true, but `Integer c = 1000, d = 1000; c == d` print false?\"",
      "checkpoints": [
        {
          "id": "java-20-cp-1",
          "label": "Explain the Integer Cache range (-128 to 127) and why .equals() is mandatory"
        },
        {
          "id": "java-20-cp-2",
          "label": "Identify NullPointerException risks during automatic unboxing"
        },
        {
          "id": "java-20-wrapper-classes-autoboxing-cp-3",
          "label": "Explain automatic boxing, unboxing, and the JVM IntegerCache mechanism."
        }
      ],
      "practiceExercises": [
        {
          "id": "java-20-ex-1",
          "title": "Safe Null-Resilient Unboxing",
          "difficulty": "Beginner",
          "type": "coding",
          "prompt": "Implement safeUnbox(Integer val, int defaultVal) to avoid NullPointerException on null wrappers.",
          "solution": "public class SafeUnbox {\n    public static int safeUnbox(Integer val, int defaultVal) {\n        return val != null ? val : defaultVal;\n    }\n    public static void main(String[] args) {\n        System.out.println(safeUnbox(null, 0));\n        System.out.println(safeUnbox(42, 0));\n    }\n}",
          "explanation": "Ternary null check prevents calling .intValue() on null references."
        },
        {
          "id": "java-20-ex-2",
          "title": "Performance Cost of Autoboxing in Loops",
          "difficulty": "Intermediate",
          "type": "coding",
          "prompt": "Demonstrate the performance and GC difference between summing with `long` vs `Long` in a loop of size 1,000,000.",
          "solution": "public class AutoboxingCost {\n    public static void main(String[] args) {\n        long start = System.currentTimeMillis();\n        // BAD: Long causes 1,000,000 heap allocations\n        Long sum = 0L;\n        for (int i = 0; i < 1_000_000; i++) {\n            sum += i; // Unboxes, adds, and boxes into new Long!\n        }\n        System.out.println(\"Sum completed: \" + sum);\n    }\n}",
          "explanation": "`Long sum` repeatedly allocates temporary heap wrappers on each addition; primitive `long sum` operates purely on the CPU stack."
        },
        {
          "id": "java-20-ex-3",
          "title": "Configure JVM Integer Cache Size",
          "difficulty": "Advanced",
          "type": "conceptual",
          "prompt": "What JVM option can expand the high range of the Integer Cache beyond 127, and does it apply to Double or Float?",
          "solution": "The JVM flag `-XX:AutoBoxCacheMax=<size>` (e.g. `-XX:AutoBoxCacheMax=10000`) expands the upper bound of the IntegerCache. However, Double and Float have NO caching mechanism because there are an infinite number of floating-point values even in a small interval.",
          "explanation": "Integer, Byte, Short, Character have caches; Double and Float do not."
        }
      ],
      "quizQuestions": [
        {
          "id": "java-20-q1",
          "question": "What is the default range of the Java Integer cache?",
          "options": [
            "0 to 255",
            "-128 to 127",
            "-32768 to 32767",
            "All positive integers"
          ],
          "correctOptionIndex": 1,
          "explanation": "Java caches Integer instances between -128 and 127 (inclusive) in the internal IntegerCache."
        },
        {
          "id": "java-20-q2",
          "question": "What exception is thrown when unboxing an Integer variable that is null (e.g. `Integer x = null; int y = x;`)?",
          "options": [
            "IllegalArgumentException",
            "ClassCastException",
            "NullPointerException",
            "ArithmeticException"
          ],
          "correctOptionIndex": 2,
          "explanation": "Unboxing translates to `x.intValue()`. Since x is null, it immediately throws a NullPointerException."
        }
      ],
      "revisionNotes": [
        "Autoboxing converts primitive to wrapper; unboxing converts wrapper to primitive.",
        "Integer caches values from -128 to 127; always use `.equals()` to compare wrappers.",
        "Unboxing null references causes NullPointerException."
      ]
    },
    {
      "id": "java-21-enums",
      "moduleId": "java-m2",
      "moduleNumber": 2,
      "moduleTitle": "Java Core Programming",
      "topicNumber": 21,
      "title": "Enums: Type-Safe Constants, Fields & State Modeling",
      "language": "java",
      "level": "Beginner",
      "whyItMatters": "Enums in Java are far more powerful than in C/C++. Java Enums are full-fledged classes that can have constructors, instance fields, methods, and implement interfaces. They are the standard way to model state machines and implement singletons.",
      "explanation": "In Java, an `enum` represents a fixed set of named constants. Key properties:\n1. All enums implicitly extend `java.lang.Enum<E>` (they cannot extend any other class, but CAN implement interfaces).\n2. Enum constants are `public static final` instances created when the enum class is initialized.\n3. Constructors in Enums are strictly `private` (cannot be called with `new`).\n4. Built-in Methods: `values()` returns an array of all constants; `ordinal()` returns the 0-based position; `valueOf(String)` parses a constant by name.\n5. Enums can have fields, constructors, and custom methods, enabling behavior-driven state modeling.\n6. Joshua Bloch (Effective Java) recommends single-element enums as the safest, simplest way to implement the Singleton pattern.",
      "syntaxAndStructure": "public enum OrderStatus {\n    PENDING(1, \"Order received\"),\n    SHIPPED(2, \"On the way\"),\n    DELIVERED(3, \"Completed\");\n\n    private final int code;\n    private final String description;\n\n    // Constructor is implicitly private\n    OrderStatus(int code, String description) {\n        this.code = code;\n        this.description = description;\n    }\n\n    public int getCode() { return code; }\n    public String getDescription() { return description; }\n}",
      "codeExamples": [
        {
          "title": "Custom Fields, Constructors and Methods in Enums",
          "code": "public class EnumFeatureDemo {\n    public enum Priority {\n        LOW(1, \"Low priority issue\"),\n        MEDIUM(2, \"Standard response needed\"),\n        CRITICAL(3, \"Urgent production outage\");\n\n        private final int level;\n        private final String message;\n\n        Priority(int level, String msg) {\n            this.level = level;\n            this.message = msg;\n        }\n\n        public int getLevel() { return level; }\n        public String getMessage() { return message; }\n    }\n\n    public static void main(String[] args) {\n        Priority p = Priority.CRITICAL;\n        System.out.println(\"Selected: \" + p.name());\n        System.out.println(\"Ordinal position: \" + p.ordinal());\n        System.out.println(\"Custom level: \" + p.getLevel());\n        System.out.println(\"Description: \" + p.getMessage());\n    }\n}",
          "expectedOutput": "Selected: CRITICAL\nOrdinal position: 2\nCustom level: 3\nDescription: Urgent production outage",
          "explanation": "Enums encapsulate both constant identity and custom domain metadata (level, message) cleanly without external lookup tables."
        },
        {
          "title": "The Enum Singleton Pattern (Effective Java)",
          "code": "public class EnumSingletonDemo {\n    public enum DatabaseConnectionPool {\n        INSTANCE; // Guaranteed exactly one instance by JVM\n\n        private int activeConnections = 10;\n\n        public int getActiveConnections() {\n            return activeConnections;\n        }\n\n        public void allocate() {\n            activeConnections++;\n        }\n    }\n\n    public static void main(String[] args) {\n        DatabaseConnectionPool pool1 = DatabaseConnectionPool.INSTANCE;\n        DatabaseConnectionPool pool2 = DatabaseConnectionPool.INSTANCE;\n\n        pool1.allocate();\n\n        System.out.println(\"pool1 == pool2: \" + (pool1 == pool2));\n        System.out.println(\"Connections in pool2: \" + pool2.getActiveConnections());\n    }\n}",
          "expectedOutput": "pool1 == pool2: true\nConnections in pool2: 11",
          "explanation": "An enum with one instance provides thread-safe, reflection-proof, serialization-safe Singleton creation without boilerplate locking code."
        }
      ],
      "realWorldApplications": [
        "Modeling order workflows (CREATED, PAID, PROCESSING, SHIPPED, DELIVERED, CANCELLED).",
        "Implementing robust, serialization-proof Singletons in enterprise services."
      ],
      "commonMistakes": [
        "Relying on `ordinal()` for database persistence; reordering enum constants shifts their ordinals, corrupting stored data.",
        "Attempting to instantiate an enum with `new Priority()`, which triggers a compile error.",
        "Attempting to instantiate an enum using the new keyword; enum constructors are strictly private."
      ],
      "interviewRelevance": "Popular interview question: \"Why is an Enum Singleton better than the double-checked locking Singleton?\" (Answer: Enum Singletons prevent reflection and deserialization attacks automatically).",
      "checkpoints": [
        {
          "id": "java-21-cp-1",
          "label": "Understand that Java Enums are full classes with private constructors"
        },
        {
          "id": "java-21-cp-2",
          "label": "Explain why single-element enums provide optimal Singleton safety"
        },
        {
          "id": "java-21-enums-cp-3",
          "label": "Implement enum types with custom fields, methods, and switch pattern matching."
        }
      ],
      "practiceExercises": [
        {
          "id": "java-21-ex-1",
          "title": "Enum with Constant-Specific Behavior",
          "difficulty": "Beginner",
          "type": "coding",
          "prompt": "Implement an enum Operation (PLUS, MINUS, MULTIPLY) where each constant overrides an abstract double apply(double x, double y) method.",
          "solution": "public enum Operation {\n    PLUS { public double apply(double x, double y) { return x + y; } },\n    MINUS { public double apply(double x, double y) { return x - y; } },\n    MULTIPLY { public double apply(double x, double y) { return x * y; } };\n\n    public abstract double apply(double x, double y);\n\n    public static void main(String[] args) {\n        System.out.println(\"5 + 3 = \" + Operation.PLUS.apply(5, 3));\n        System.out.println(\"5 * 3 = \" + Operation.MULTIPLY.apply(5, 3));\n    }\n}",
          "explanation": "Each enum constant can implement abstract methods individually, replacing switch ladders with polymorphism."
        },
        {
          "id": "java-21-ex-2",
          "title": "Safe Enum Lookup by String Code",
          "difficulty": "Intermediate",
          "type": "coding",
          "prompt": "Write a static fromCode(int code) method on an enum that returns an Optional<Enum> without throwing IllegalArgumentException.",
          "solution": "import java.util.Optional;\n\npublic enum Status {\n    ACTIVE(1), INACTIVE(0);\n    private final int code;\n    Status(int c) { this.code = c; }\n\n    public static Optional<Status> fromCode(int c) {\n        for (Status s : values()) {\n            if (s.code == c) return Optional.of(s);\n        }\n        return Optional.empty();\n    }\n}",
          "explanation": "Encapsulating lookup with Optional prevents crashes when clients pass invalid raw codes."
        },
        {
          "id": "java-21-ex-3",
          "title": "EnumSet and EnumMap Performance Optimization",
          "difficulty": "Advanced",
          "type": "conceptual",
          "prompt": "Why are EnumSet and EnumMap vastly superior in performance and memory compared to HashSet and HashMap?",
          "solution": "`EnumSet` is internally represented as a single long bit vector (a bitmask). Basic operations (add, contains, remove) execute via single-cycle bitwise instructions (O(1) with near-zero memory footprint). `EnumMap` is backed by a compact, indexed array matching the enum ordinals, completely eliminating hash computation, collisions, and bucket overhead.",
          "explanation": "EnumSet uses bitwise vectors, and EnumMap uses direct array indexing by ordinal."
        }
      ],
      "quizQuestions": [
        {
          "id": "java-21-q1",
          "question": "What is the access level of constructors in a Java enum?",
          "options": [
            "public",
            "protected",
            "private (or package-private)",
            "abstract"
          ],
          "correctOptionIndex": 2,
          "explanation": "Enum constructors are private because enum instances are fixed and cannot be created dynamically from outside."
        },
        {
          "id": "java-21-q2",
          "question": "Why does Joshua Bloch advocate using single-element enums for the Singleton pattern?",
          "options": [
            "Enums execute faster than ordinary classes",
            "The JVM guarantees absolute singleton protection against reflection and deserialization attacks",
            "Enums don't allocate heap memory",
            "Enums are automatically converted to native code"
          ],
          "correctOptionIndex": 1,
          "explanation": "Enums provide built-in serialization safety and JVM reflection safeguards against multiple instantiation."
        }
      ],
      "revisionNotes": [
        "Java enums are full classes that can have fields, methods, and constructors.",
        "Enum constructors are implicitly private.",
        "Single-element Enums are the most robust implementation of the Singleton pattern."
      ]
    },
    {
      "id": "java-22-exception-fundamentals",
      "moduleId": "java-m2",
      "moduleNumber": 2,
      "moduleTitle": "Java Core Programming",
      "topicNumber": 22,
      "title": "Exception Fundamentals, Throwable Hierarchy & Try-With-Resources",
      "language": "java",
      "level": "Beginner",
      "whyItMatters": "Robust error handling differentiates amateur scripts from production systems. Understanding checked vs unchecked exceptions, `finally` guarantees, and automatic resource management via `try-with-resources` (`AutoCloseable`) is tested extensively in interviews.",
      "explanation": "The Java Exception hierarchy begins with `java.lang.Throwable`:\n1. `Error`: Serious problems that a reasonable application should not try to catch (e.g., `OutOfMemoryError`, `StackOverflowError`).\n2. `Exception`: Conditions that an application might want to catch.\n   - Checked Exceptions: Subclasses of `Exception` excluding `RuntimeException` (e.g., `IOException`, `SQLException`). Checked at compile-time; MUST be handled via `try-catch` or declared in method signature with `throws`.\n   - Unchecked Exceptions: Subclasses of `RuntimeException` (e.g., `NullPointerException`, `ArrayIndexOutOfBoundsException`, `IllegalArgumentException`). Occur due to programming logic errors; compiler does not require explicit handling.\n3. `try-with-resources` (Java 7+): Replaces verbose `try-finally` blocks. Any resource implementing `java.lang.AutoCloseable` is automatically closed at block exit, even if exceptions occur.",
      "syntaxAndStructure": "// Traditional try-catch-finally:\ntry {\n    // Code that may throw\n} catch (IOException | SQLException e) { // Multi-catch (Java 7+)\n    logger.error(\"Error\", e);\n} finally {\n    // ALWAYS runs (cleanup)\n}\n\n// Modern try-with-resources:\ntry (BufferedReader br = new BufferedReader(new FileReader(\"file.txt\"))) {\n    String line = br.readLine();\n} // br is automatically closed here!",
      "codeExamples": [
        {
          "title": "Modern Try-With-Resources with Custom AutoCloseable",
          "code": "public class TryWithResourcesDemo {\n    static class ManagedDatabaseConnection implements AutoCloseable {\n        public void executeQuery(String sql) {\n            System.out.println(\"Executing query: \" + sql);\n        }\n\n        @Override\n        public void close() {\n            System.out.println(\"ManagedDatabaseConnection closed automatically!\");\n        }\n    }\n\n    public static void main(String[] args) {\n        // Resource is instantiated inside try(...) parentheses\n        try (ManagedDatabaseConnection conn = new ManagedDatabaseConnection()) {\n            conn.executeQuery(\"SELECT * FROM students\");\n        } // close() is called automatically here!\n        \n        System.out.println(\"Block exited cleanly.\");\n    }\n}",
          "expectedOutput": "Executing query: SELECT * FROM students\nManagedDatabaseConnection closed automatically!\nBlock exited cleanly.",
          "explanation": "Because ManagedDatabaseConnection implements AutoCloseable, the JVM ensures its close() method executes deterministically when exiting the try block."
        },
        {
          "title": "Multi-Catch and Exception Propagation Flow",
          "code": "public class MultiCatchDemo {\n    public static void parseData(String str) {\n        try {\n            int num = Integer.parseInt(str);\n            int result = 100 / num;\n            System.out.println(\"Calculated result: \" + result);\n        } catch (NumberFormatException | ArithmeticException e) {\n            System.out.println(\"Handled error: \" + e.getClass().getSimpleName());\n        } finally {\n            System.out.println(\"Finally block always executes.\");\n        }\n    }\n\n    public static void main(String[] args) {\n        parseData(\"0\");\n        parseData(\"abc\");\n    }\n}",
          "expectedOutput": "Handled error: ArithmeticException\nFinally block always executes.\nHandled error: NumberFormatException\nFinally block always executes.",
          "explanation": "Java 7+ multi-catch syntax `catch (TypeA | TypeB e)` groups related exception handling cleanly without code duplication."
        }
      ],
      "realWorldApplications": [
        "Deterministic file, socket, and database connection pooling cleanup using try-with-resources.",
        "Translating raw database exceptions into domain-specific exceptions in service layers."
      ],
      "commonMistakes": [
        "Catching generic `Exception` or `Throwable` and silencing it with an empty catch block, masking critical bugs.",
        "Relying on `System.exit(0)` inside try block: this is the ONLY scenario where the `finally` block does NOT execute!",
        "Catching generic Throwable or swallowing checked exceptions with empty catch blocks."
      ],
      "interviewRelevance": "Universal interview questions: \"Difference between checked and unchecked exceptions?\", \"Does finally always execute?\", and \"How does try-with-resources work?\"",
      "checkpoints": [
        {
          "id": "java-22-cp-1",
          "label": "Draw the Throwable hierarchy: Throwable -> Error & Exception (Checked vs RuntimeException)"
        },
        {
          "id": "java-22-cp-2",
          "label": "Implement AutoCloseable and explain try-with-resources automatic cleanup"
        },
        {
          "id": "java-22-exception-fundamentals-cp-3",
          "label": "Differentiate Checked vs Unchecked exceptions and the Error hierarchy."
        }
      ],
      "practiceExercises": [
        {
          "id": "java-22-ex-1",
          "title": "Finally Block with Return Value Puzzle",
          "difficulty": "Beginner",
          "type": "coding",
          "prompt": "What does this method return and why? int test() { try { return 1; } finally { return 2; } }",
          "solution": "public class ReturnPuzzle {\n    public static int test() {\n        try {\n            return 1;\n        } finally {\n            return 2; // Overrides the try return value!\n        }\n    }\n    public static void main(String[] args) {\n        System.out.println(\"Result: \" + test());\n    }\n}",
          "explanation": "A return in a finally block discards and overrides any previous return statement or unhandled exception in the try/catch block (a serious anti-pattern)."
        },
        {
          "id": "java-22-ex-2",
          "title": "Custom Checked vs Unchecked Exception",
          "difficulty": "Intermediate",
          "type": "coding",
          "prompt": "Create a custom checked exception InsufficientFundsException and an unchecked exception InvalidAccountException.",
          "solution": "// Checked: extends Exception\nclass InsufficientFundsException extends Exception {\n    public InsufficientFundsException(String msg) { super(msg); }\n}\n\n// Unchecked: extends RuntimeException\nclass InvalidAccountException extends RuntimeException {\n    public InvalidAccountException(String msg) { super(msg); }\n}\n\npublic class CustomExceptionsDemo {\n    public static void validate(int balance, int withdraw) throws InsufficientFundsException {\n        if (withdraw > balance) throw new InsufficientFundsException(\"Balance too low\");\n    }\n    public static void main(String[] args) {\n        System.out.println(\"Custom exceptions defined cleanly.\");\n    }\n}",
          "explanation": "Classes extending Exception are checked by the compiler; classes extending RuntimeException are unchecked."
        },
        {
          "id": "java-22-ex-3",
          "title": "Suppressed Exceptions in Try-With-Resources",
          "difficulty": "Advanced",
          "type": "conceptual",
          "prompt": "If both the try block and auto-closing resource throw an exception, how does Java preserve both errors?",
          "solution": "In try-with-resources, the exception thrown inside the try block is the primary exception. The exception thrown by close() is caught and added to the primary exception as a \"suppressed exception\". It can be retrieved by calling `primaryException.getSuppressed()`. In traditional try-finally, the finally exception would obliterate the original exception.",
          "explanation": "Java 7 suppressed exceptions prevent resource closing failures from hiding root-cause business exceptions."
        }
      ],
      "quizQuestions": [
        {
          "id": "java-22-q1",
          "question": "Which of the following is an UNCHECKED exception in Java?",
          "options": [
            "IOException",
            "SQLException",
            "NullPointerException",
            "ClassNotFoundException"
          ],
          "correctOptionIndex": 2,
          "explanation": "NullPointerException extends RuntimeException, making it an unchecked exception that the compiler does not force you to declare or catch."
        },
        {
          "id": "java-22-q2",
          "question": "What interface must a resource class implement to be used within a try-with-resources statement?",
          "options": [
            "java.io.Serializable",
            "java.lang.AutoCloseable",
            "java.lang.Cloneable",
            "java.lang.Runnable"
          ],
          "correctOptionIndex": 1,
          "explanation": "Any class implementing `java.lang.AutoCloseable` (or its sub-interface `java.io.Closeable`) can be managed by try-with-resources."
        }
      ],
      "revisionNotes": [
        "Checked exceptions extend Exception (excluding RuntimeException) and must be handled or declared.",
        "Unchecked exceptions extend RuntimeException and represent programming defects.",
        "try-with-resources automatically closes AutoCloseable instances reliably."
      ]
    }
  ],
  "moduleAssessment": {
    "id": "java-m2-assessment",
    "title": "Module 2 Assessment: Java Core Programming",
    "passingScorePercentage": 80,
    "questions": [
      {
        "id": "java-12-q1",
        "question": "Which statement accurately describes parameter passing in Java?",
        "options": [
          "Primitives are pass-by-value; Objects are pass-by-reference",
          "Everything in Java is strictly pass-by-value",
          "Methods can declare pass-by-reference using the & symbol",
          "Arrays are pass-by-reference, other objects are pass-by-value"
        ],
        "correctOptionIndex": 1,
        "explanation": "Java is strictly pass-by-value. For objects, the value passed is the reference address itself."
      },
      {
        "id": "java-12-q2",
        "question": "What happens if you reassign an object parameter inside a method (e.g. `param = new MyClass();`)?",
        "options": [
          "The caller variable is updated to point to the new object",
          "Only the local parameter reference in the method stack frame changes; the caller is unaffected",
          "A NullPointerException is thrown",
          "The compiler rejects reference reassignment"
        ],
        "correctOptionIndex": 1,
        "explanation": "Reassigning the parameter variable only changes the local copy of the pointer inside the callee method."
      },
      {
        "id": "java-13-q1",
        "question": "Which of the following method declarations is a valid overload for: public int calc(int a, int b)?",
        "options": [
          "public double calc(int a, int b)",
          "private int calc(int a, int b)",
          "public double calc(int a, double b)",
          "public int calc(int x, int y)"
        ],
        "correctOptionIndex": 2,
        "explanation": "Overloading requires a change in parameter list. Option 3 changes the second parameter type to double."
      },
      {
        "id": "java-13-q2",
        "question": "Between primitive widening (e.g. int -> long) and autoboxing (e.g. int -> Integer), which does the Java compiler prefer during overload resolution?",
        "options": [
          "Autoboxing is preferred over widening",
          "Primitive widening is preferred over autoboxing",
          "Both have equal precedence, causing compile error",
          "Depends on the JVM vendor"
        ],
        "correctOptionIndex": 1,
        "explanation": "Widening primitive conversion is evaluated before autoboxing for backward compatibility with Java 1.4."
      },
      {
        "id": "java-14-q1",
        "question": "What error is thrown at runtime when a recursive method in Java fails to terminate its base case?",
        "options": [
          "OutOfMemoryError",
          "StackOverflowError",
          "InternalError",
          "IllegalArgumentException"
        ],
        "correctOptionIndex": 1,
        "explanation": "Excessive recursive calls exhaust the thread's call stack limit, throwing java.lang.StackOverflowError."
      },
      {
        "id": "java-14-q2",
        "question": "Does the standard Oracle HotSpot JVM perform automatic Tail Call Optimization (TCO)?",
        "options": [
          "Yes, for all methods with @Tailrec",
          "Yes, whenever the recursive call is the last statement",
          "No, HotSpot retains complete stack traces for security checks and debugging",
          "Only when running with -O3 flag"
        ],
        "correctOptionIndex": 2,
        "explanation": "HotSpot does not optimize tail calls because Java's security model and debugging inspection rely on preserving full stack frame traces."
      },
      {
        "id": "java-15-q1",
        "question": "Which of the following method signatures is syntactically valid in Java?",
        "options": [
          "void calculate(int... numbers, String label)",
          "void calculate(String label, int... numbers)",
          "void calculate(int... a, double... b)",
          "void calculate(int... numbers, int count)"
        ],
        "correctOptionIndex": 1,
        "explanation": "The varargs parameter must be the last parameter in the method signature, and there can be at most one varargs parameter."
      },
      {
        "id": "java-15-q2",
        "question": "What does the compiler generate under the hood for a call `printNumbers(1, 2, 3)` where the method is `void printNumbers(int... nums)`?",
        "options": [
          "It passes 1, 2, 3 as individual registers",
          "It constructs a new array: `printNumbers(new int[]{ 1, 2, 3 })`",
          "It converts them to a LinkedList",
          "It evaluates them with reflection"
        ],
        "correctOptionIndex": 1,
        "explanation": "Varargs is syntactic sugar for array parameters. The compiler generates code that instantiates and populates an array with the arguments."
      },
      {
        "id": "java-16-q1",
        "question": "Does the wildcard import `import java.util.*;` import classes from sub-packages like `java.util.concurrent`?",
        "options": [
          "Yes, it recursively imports all sub-packages",
          "No, package imports are strictly flat and do not import sub-packages",
          "Only if the compiler flag -recurse is passed",
          "Only in Java 17 and above"
        ],
        "correctOptionIndex": 1,
        "explanation": "Package imports in Java are strictly non-recursive. Sub-packages must be imported with their own explicit import statements."
      },
      {
        "id": "java-16-q2",
        "question": "Which statement about Java static imports is correct?",
        "options": [
          "It imports all non-static methods of a class",
          "It is used to import static members (fields and methods) directly into the namespace",
          "It makes the imported class immutable",
          "It replaces normal class inheritance"
        ],
        "correctOptionIndex": 1,
        "explanation": "`import static` allows referencing static fields and methods without qualifying them with the class name."
      },
      {
        "id": "java-17-q1",
        "question": "Which access modifier allows access within the same package AND by subclasses in other packages?",
        "options": [
          "private",
          "default (package-private)",
          "protected",
          "public"
        ],
        "correctOptionIndex": 2,
        "explanation": "`protected` grants access within the same package plus access to subclasses located in external packages."
      },
      {
        "id": "java-17-q2",
        "question": "What access modifiers are permitted for a standard top-level class in Java?",
        "options": [
          "public and default (package-private) only",
          "public, private, protected, and default",
          "public only",
          "public and protected only"
        ],
        "correctOptionIndex": 0,
        "explanation": "Top-level classes can only be public or default. Only nested (inner) classes can be declared private or protected."
      },
      {
        "id": "java-18-q1",
        "question": "Can a static method in Java be overridden by a subclass?",
        "options": [
          "Yes, if marked with @Override",
          "No, static methods are resolved at compile time and are hidden, not overridden",
          "Only if the parent method is public",
          "Yes, dynamic dispatch applies to static methods"
        ],
        "correctOptionIndex": 1,
        "explanation": "Static methods belong to the class, not instance objects. They do not participate in dynamic method dispatch and cannot be overridden."
      },
      {
        "id": "java-18-q2",
        "question": "Why can a static method not use the `this` keyword?",
        "options": [
          "Because this is a reserved keyword for C++",
          "Because static methods are invoked without an instance context of the class",
          "Because this only works in constructors",
          "Because the garbage collector locks this"
        ],
        "correctOptionIndex": 1,
        "explanation": "`this` represents the current instance object. Since static methods exist independent of any instantiated object, `this` has no meaning."
      },
      {
        "id": "java-19-q1",
        "question": "What is the effect of declaring a class as `final` in Java?",
        "options": [
          "All of its fields become private",
          "The class cannot be extended (subclassed)",
          "The class can only be instantiated once",
          "All objects of this class are stored in Metaspace"
        ],
        "correctOptionIndex": 1,
        "explanation": "Declaring a class final prohibits other classes from extending it (e.g. String is a final class)."
      },
      {
        "id": "java-19-q2",
        "question": "Does `final List<Integer> numbers = new ArrayList<>();` prevent numbers.add(10)?",
        "options": [
          "Yes, final collections cannot be modified",
          "No, the reference cannot be reassigned, but the list object can be mutated",
          "It throws a runtime UnsupportedOperationException",
          "It causes a compilation error"
        ],
        "correctOptionIndex": 1,
        "explanation": "`final` on an object reference only locks the pointer itself. The referenced object remains fully mutable."
      },
      {
        "id": "java-20-q1",
        "question": "What is the default range of the Java Integer cache?",
        "options": [
          "0 to 255",
          "-128 to 127",
          "-32768 to 32767",
          "All positive integers"
        ],
        "correctOptionIndex": 1,
        "explanation": "Java caches Integer instances between -128 and 127 (inclusive) in the internal IntegerCache."
      },
      {
        "id": "java-20-q2",
        "question": "What exception is thrown when unboxing an Integer variable that is null (e.g. `Integer x = null; int y = x;`)?",
        "options": [
          "IllegalArgumentException",
          "ClassCastException",
          "NullPointerException",
          "ArithmeticException"
        ],
        "correctOptionIndex": 2,
        "explanation": "Unboxing translates to `x.intValue()`. Since x is null, it immediately throws a NullPointerException."
      },
      {
        "id": "java-21-q1",
        "question": "What is the access level of constructors in a Java enum?",
        "options": [
          "public",
          "protected",
          "private (or package-private)",
          "abstract"
        ],
        "correctOptionIndex": 2,
        "explanation": "Enum constructors are private because enum instances are fixed and cannot be created dynamically from outside."
      },
      {
        "id": "java-21-q2",
        "question": "Why does Joshua Bloch advocate using single-element enums for the Singleton pattern?",
        "options": [
          "Enums execute faster than ordinary classes",
          "The JVM guarantees absolute singleton protection against reflection and deserialization attacks",
          "Enums don't allocate heap memory",
          "Enums are automatically converted to native code"
        ],
        "correctOptionIndex": 1,
        "explanation": "Enums provide built-in serialization safety and JVM reflection safeguards against multiple instantiation."
      },
      {
        "id": "java-22-q1",
        "question": "Which of the following is an UNCHECKED exception in Java?",
        "options": [
          "IOException",
          "SQLException",
          "NullPointerException",
          "ClassNotFoundException"
        ],
        "correctOptionIndex": 2,
        "explanation": "NullPointerException extends RuntimeException, making it an unchecked exception that the compiler does not force you to declare or catch."
      },
      {
        "id": "java-22-q2",
        "question": "What interface must a resource class implement to be used within a try-with-resources statement?",
        "options": [
          "java.io.Serializable",
          "java.lang.AutoCloseable",
          "java.lang.Cloneable",
          "java.lang.Runnable"
        ],
        "correctOptionIndex": 1,
        "explanation": "Any class implementing `java.lang.AutoCloseable` (or its sub-interface `java.io.Closeable`) can be managed by try-with-resources."
      }
    ]
  },
  "revisionQuestions": [
    "Prove with code why Java is strictly pass-by-value for both primitives and object references.",
    "Explain the 4 phases of compiler method overload resolution.",
    "Why does the standard JVM not support Tail Call Optimization (TCO)?",
    "Explain the Integer Cache trap and why .equals() is required for wrapper comparisons.",
    "Describe the Throwable hierarchy and the difference between checked and unchecked exceptions."
  ]
};
