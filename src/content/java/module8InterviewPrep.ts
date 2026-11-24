import { MasteryTopic, MasteryModule } from '@/types/mastery';

export const module8Topics: MasteryTopic[] = [
  {
    "id": "java-96-interview-fundamentals",
    "topicNumber": 96,
    "title": "Java Core Interview Concepts & JVM Internals Revision",
    "level": "Intermediate",
    "whyItMatters": "Interviewers test foundational principles to distinguish engineers who truly understand how the JVM executes bytecode from those who simply memorize syntax. Revisiting Stack vs Heap, pass-by-value mechanics, String interning, and ClassLoaders is essential before walking into any technical screen.",
    "explanation": "1. Java Memory Architecture in Brief:\n- Stack Memory: Allocated per-thread. Stores primitive local variables and reference pointers pointing to objects in the heap. Allocation and deallocation are instantaneous as stack frames push and pop.\n- Heap Memory: Shared across all threads. Stores all object instances and arrays. Managed automatically by the Garbage Collector.\n- Metaspace: Native OS memory (replaced PermGen in Java 8) storing loaded class metadata, method bytecode, annotations, and constant pool.\n\n2. The Pass-by-Value Invariant:\n- Java is STRICTLY 100% PASS-BY-VALUE, ALWAYS!\n- When passing a primitive, a copy of the primitive value (e.g. 42) is passed.\n- When passing an object, a COPY OF THE REFERENCE POINTER is passed by value.\n- Reassigning the parameter reference (obj = new Object()) inside the method has ZERO effect on the caller's original reference.\n- However, modifying the object via its reference (obj.setName(\"new\")) mutates the shared underlying heap object.\n\n3. String Pool & Interning:\n- String literals are automatically interned into the JVM String Constant Pool.\n- String a = \"abc\"; and String b = \"abc\"; share the exact same heap memory address (a == b is true).\n- String c = new String(\"abc\"); allocates an explicit new object outside the pool (a == c is false; a.equals(c) is true; a == c.intern() is true).",
    "syntaxAndStructure": "// Pass-by-value proof in Java:\nvoid swap(Point a, Point b) {\n    Point temp = a;\n    a = b; // Reassigning local copy has no effect on caller\n    b = temp;\n}",
    "codeExamples": [
      {
        "title": "Pass-by-Value Proof with Object References",
        "code": "public class PassByValueProof {\n    static class Person {\n        String name;\n        Person(String name) { this.name = name; }\n    }\n\n    public static void tryReassign(Person p) {\n        p = new Person(\"Reassigned\"); // Only modifies the local copy of the pointer\n    }\n\n    public static void modifyState(Person p) {\n        p.name = \"Mutated\"; // Modifies the shared object in the heap\n    }\n\n    public static void main(String[] args) {\n        Person person = new Person(\"Original\");\n\n        tryReassign(person);\n        System.out.println(\"After tryReassign: \" + person.name);\n\n        modifyState(person);\n        System.out.println(\"After modifyState: \" + person.name);\n    }\n}",
        "expectedOutput": "After tryReassign: Original\nAfter modifyState: Mutated",
        "explanation": "tryReassign reassigns its local copy of the pointer p, leaving the caller's person pointing to \"Original\". modifyState dereferences the pointer to change the object's internal field."
      },
      {
        "title": "String Pool vs Heap Allocation and .intern()",
        "code": "public class StringPoolDemo {\n    public static void main(String[] args) {\n        String s1 = \"Java\";\n        String s2 = \"Java\";\n        String s3 = new String(\"Java\");\n\n        System.out.println(\"s1 == s2 (pool): \" + (s1 == s2));\n        System.out.println(\"s1 == s3 (heap): \" + (s1 == s3));\n        System.out.println(\"s1.equals(s3): \" + s1.equals(s3));\n        System.out.println(\"s1 == s3.intern(): \" + (s1 == s3.intern()));\n    }\n}",
        "expectedOutput": "s1 == s2 (pool): true\ns1 == s3 (heap): false\ns1.equals(s3): true\ns1 == s3.intern(): true",
        "explanation": "s1 and s2 reference the same interned String in the constant pool. s3 creates a new heap object. Calling s3.intern() returns the canonical instance from the pool."
      }
    ],
    "realWorldApplications": [
      "Tuning JVM -Xms (initial heap) and -Xmx (max heap) to prevent OutOfMemoryError in microservice containers.",
      "Auditing memory leak issues where static collections unintentionally retain heap object references forever."
    ],
    "commonMistakes": [
      "Claiming that Java passes objects \"by reference\": it passes copies of reference pointers by value.",
      "Comparing strings with == instead of .equals(), introducing insidious bugs when strings come from user input or network streams.",
      "Assuming that System.gc() guarantees an immediate garbage collection sweep: it is merely a non-binding suggestion to the JVM."
    ],
    "interviewRelevance": "Pass-by-value vs pass-by-reference and String pool mechanics are the two most frequently tested warmup questions in Java technical interviews worldwide.",
    "checkpoints": [
      {
        "id": "java-96-cp1",
        "label": "Prove Java is strictly pass-by-value using reference reassignment vs state mutation"
      },
      {
        "id": "java-96-cp2",
        "label": "Explain String Constant Pool, new String() vs string literal, and .intern()"
      },
      {
        "id": "java-96-cp3",
        "label": "Distinguish between Stack, Heap, and Metaspace memory allocations"
      }
    ],
    "practiceExercises": [
      {
        "id": "java-96-ex1",
        "title": "Explain Primitive vs Reference Pass-by-Value",
        "difficulty": "Beginner",
        "type": "conceptual",
        "prompt": "What is printed by: int x = 10; update(x); System.out.println(x); void update(int a) { a = 50; }?",
        "solution": "It prints 10. The primitive value 10 is copied into the method parameter `a`. Modifying `a` to 50 has no effect on the original variable `x`.",
        "explanation": "Primitives in Java are passed strictly by value; changing the parameter inside the method changes only the local stack variable."
      },
      {
        "id": "java-96-ex2",
        "title": "Predict Identity vs Equality Outcomes",
        "difficulty": "Intermediate",
        "type": "output_prediction",
        "prompt": "Given Integer a = 127, b = 127, c = 128, d = 128; what are the results of (a == b) and (c == d)? Explain why.",
        "solution": "a == b evaluates to true; c == d evaluates to false.\nExplanation: The JVM caches Integer objects for values in the range [-128..127] via the IntegerCache. Thus autoboxing 127 returns the cached identical reference, whereas autoboxing 128 instantiates new separate heap objects.",
        "explanation": "The IntegerCache guarantees reference identity for byte-range values, demonstrating why objects must always be compared with .equals()."
      },
      {
        "id": "java-96-ex3",
        "title": "Simulate Pass-by-Value Immutable Swap",
        "difficulty": "Advanced",
        "type": "coding",
        "prompt": "Write a generic Container<T> holder class that allows swapping two values across method boundaries without mutating the underlying objects.",
        "starterCode": "public class SwapHelper {\n    public static class Holder<T> {\n        public T value;\n        public Holder(T val) { this.value = val; }\n    }\n\n    public static <T> void swap(Holder<T> h1, Holder<T> h2) {\n        // Swap values\n    }\n}",
        "solution": "public class SwapHelper {\n    public static class Holder<T> {\n        public T value;\n        public Holder(T val) { this.value = val; }\n    }\n\n    public static <T> void swap(Holder<T> h1, Holder<T> h2) {\n        T temp = h1.value;\n        h1.value = h2.value;\n        h2.value = temp;\n    }\n}",
        "explanation": "Because Java cannot reassign caller pointers, wrapping objects in a mutable Holder allows swapping the internal values referenced by the pointers."
      }
    ],
    "quizQuestions": [
      {
        "id": "java-96-q1",
        "question": "Does Java pass objects by reference or by value?",
        "options": [
          "By reference for all objects and by value for primitives",
          "Strictly by value for both primitives and objects (object reference pointers are copied by value)",
          "By reference when using the synchronized keyword",
          "By reference for Collections and by value for Arrays"
        ],
        "correctOptionIndex": 1,
        "explanation": "Java is strictly 100% pass-by-value. When an object is passed, a copy of the pointer address is passed by value."
      },
      {
        "id": "java-96-q2",
        "question": "Where are loaded class structures, method bytecode, and static variables stored in Java 8 and newer?",
        "options": [
          "Permanent Generation (PermGen)",
          "Metaspace (Native OS Memory)",
          "Thread Stack Memory",
          "CPU L1 Cache"
        ],
        "correctOptionIndex": 1,
        "explanation": "In Java 8, PermGen was completely removed and replaced by Metaspace, which allocates class metadata in off-heap native memory."
      }
    ],
    "revisionNotes": [
      "Java is strictly pass-by-value: object references are copied by value.",
      "String literals are interned in the String Constant Pool; always compare strings with `.equals()`.",
      "Metaspace replaced PermGen in Java 8 and resides in native memory."
    ],
    "moduleId": "java-m8",
    "moduleNumber": 8,
    "moduleTitle": "Java Interview Preparation",
    "language": "java"
  },
  {
    "id": "java-97-predict-output",
    "topicNumber": 97,
    "title": "Output Prediction, Initialization Order & Tricky Corner Cases",
    "level": "Intermediate",
    "whyItMatters": "Predict-the-output questions test edge-case mastery: static vs instance initializer execution order, constructor chaining, finally block return semantics, and method overloading resolution with null arguments.",
    "explanation": "1. Class & Instance Initialization Order:\nWhen a class is instantiated for the first time:\n  1. Parent static blocks and static variable initializers (in order of declaration, once per class).\n  2. Child static blocks and static variable initializers (in order of declaration, once per class).\n  3. Parent instance initializers and instance fields.\n  4. Parent constructor.\n  5. Child instance initializers and instance fields.\n  6. Child constructor.\n\n2. Overloading with null Argument:\n- Given: void test(Object o) and void test(String s).\n- When calling test(null): The compiler selects the MOST SPECIFIC method. Since String is a subtype of Object, test(String) is invoked!\n- If two sibling types exist (e.g. String and Integer), calling test(null) causes a compile-time ambiguous method error.\n\n3. The finally Block Execution Invariant:\n- The finally block ALWAYS executes, even if try or catch returns a value or throws an exception!\n- Exception to the rule: System.exit(0) or JVM crash (SIGKILL/hardware failure) terminates the JVM before finally executes.\n- Pitfall: If finally contains a return statement, it overrides any return value or exception from the try block!",
    "syntaxAndStructure": "// Static vs instance initialization order:\nclass Demo {\n    static { System.out.println(\"1. Static\"); }\n    { System.out.println(\"2. Instance\"); }\n    Demo() { System.out.println(\"3. Constructor\"); }\n}",
    "codeExamples": [
      {
        "title": "Static vs Instance Initialization Execution Order",
        "code": "public class InitOrderDemo {\n    static class Parent {\n        static { System.out.println(\"Parent static block\"); }\n        { System.out.println(\"Parent instance block\"); }\n        Parent() { System.out.println(\"Parent constructor\"); }\n    }\n\n    static class Child extends Parent {\n        static { System.out.println(\"Child static block\"); }\n        { System.out.println(\"Child instance block\"); }\n        Child() { System.out.println(\"Child constructor\"); }\n    }\n\n    public static void main(String[] args) {\n        System.out.println(\"-- Instantiating Child --\");\n        new Child();\n    }\n}",
        "expectedOutput": "Parent static block\nChild static block\n-- Instantiating Child --\nParent instance block\nParent constructor\nChild instance block\nChild constructor",
        "explanation": "Static blocks run first upon class loading (Parent static then Child static). Then instance initialization proceeds top-down from Parent instance/constructor to Child instance/constructor."
      },
      {
        "title": "Finally Block Return Semantics and Value Overriding",
        "code": "public class FinallyReturnDemo {\n    public static int testFinally() {\n        try {\n            return 10;\n        } finally {\n            return 20; // OVERRIDES the try block return!\n        }\n    }\n\n    public static int testMutation() {\n        int x = 10;\n        try {\n            return x; // Evaluates return value (10) here\n        } finally {\n            x = 20;   // Mutating primitive variable does NOT change returned value\n        }\n    }\n\n    public static void main(String[] args) {\n        System.out.println(\"testFinally returns: \" + testFinally());\n        System.out.println(\"testMutation returns: \" + testMutation());\n    }\n}",
        "expectedOutput": "testFinally returns: 20\ntestMutation returns: 10",
        "explanation": "A return inside finally overrides any earlier return. In testMutation, the return value 10 is copied to the stack before finally executes, so x = 20 does not alter the returned integer."
      }
    ],
    "realWorldApplications": [
      "Understanding framework startup sequences in Spring Boot where @PostConstruct and bean initialization orders matter.",
      "Writing robust resource cleanup code that avoids corrupting return values inside finally blocks."
    ],
    "commonMistakes": [
      "Putting a return statement inside a finally block, which swallows unhandled exceptions thrown in the try block.",
      "Expecting static initializers to run every time an object is instantiated: static blocks run only once when the class is loaded.",
      "Relying on post-increment inside expressions like i = i++, which results in no change to i in Java."
    ],
    "interviewRelevance": "Predict-the-output questions are standard in online assessments (OA) and technical screening rounds to filter candidates who understand JVM execution nuances.",
    "checkpoints": [
      {
        "id": "java-97-cp1",
        "label": "Trace class and instance initialization order across inheritance hierarchies"
      },
      {
        "id": "java-97-cp2",
        "label": "Explain method overloading resolution with null arguments (most specific type)"
      },
      {
        "id": "java-97-cp3",
        "label": "Understand finally block execution guarantees and the anti-pattern of return in finally"
      }
    ],
    "practiceExercises": [
      {
        "id": "java-97-ex1",
        "title": "Predict Overloading with Null",
        "difficulty": "Beginner",
        "type": "output_prediction",
        "prompt": "What happens when calling test(null) with: void test(Object o) { System.out.println(\"Obj\"); } and void test(String s) { System.out.println(\"Str\"); }?",
        "solution": "It prints \"Str\". The Java compiler selects the most specific applicable method. Because String is more specific than Object, test(String) is chosen.",
        "explanation": "Subtypes are strictly more specific than supertypes. If ambiguous sibling types are present, the code fails compilation."
      },
      {
        "id": "java-97-ex2",
        "title": "Evaluate Post-Increment Puzzle",
        "difficulty": "Intermediate",
        "type": "output_prediction",
        "prompt": "What is the final value of x after: int x = 5; x = x++; System.out.println(x);?",
        "solution": "The output is 5.\nExplanation: The post-increment operator x++ evaluates to the current value of x (5), then increments x to 6, and finally assigns the evaluated value (5) back to x, overwriting the increment.",
        "explanation": "In Java, the right-hand side is fully evaluated before assignment. The original 5 is stored in a temporary stack slot and assigned back to x."
      },
      {
        "id": "java-97-ex3",
        "title": "Constructor Calling Overridden Method Pitfall",
        "difficulty": "Advanced",
        "type": "output_prediction",
        "prompt": "What happens when Parent constructor calls an overridden method print(), and Child overrides print() referencing its uninitialized field int x = 42;?",
        "starterCode": "class Parent {\n    Parent() { print(); }\n    void print() { System.out.println(\"Parent\"); }\n}\nclass Child extends Parent {\n    int x = 42;\n    void print() { System.out.println(\"Child x=\" + x); }\n}\n// What does new Child() print?",
        "solution": "Output: \"Child x=0\"\nExplanation: During new Child(), the Parent constructor runs before Child instance variable initializers (x = 42). Dynamic method dispatch invokes Child.print(), but x has only been allocated its default value (0).",
        "explanation": "Never invoke overridable methods inside constructors, as the subclass has not yet been initialized when the superclass constructor executes."
      }
    ],
    "quizQuestions": [
      {
        "id": "java-97-q1",
        "question": "Under what condition will code inside a `finally` block NOT execute in Java?",
        "options": [
          "When an OutOfMemoryError is thrown",
          "When `System.exit(0)` is invoked in the try block or an OS-level process kill occurs",
          "When the try block contains an infinite while loop",
          "When the catch block re-throws an unhandled exception"
        ],
        "correctOptionIndex": 1,
        "explanation": "System.exit(0) immediately terminates the Java Virtual Machine process, bypassing all remaining code including finally blocks."
      },
      {
        "id": "java-97-q2",
        "question": "In what order do initializers execute during object instantiation in Java?",
        "options": [
          "Child static -> Parent static -> Child constructor -> Parent constructor",
          "Parent static -> Child static -> Parent instance & constructor -> Child instance & constructor",
          "Parent constructor -> Parent static -> Child constructor -> Child static",
          "All constructors run before any static initializers"
        ],
        "correctOptionIndex": 1,
        "explanation": "Static initializers run upon class loading from Parent to Child. Instance initializers and constructors run top-down from Parent to Child."
      }
    ],
    "revisionNotes": [
      "Static blocks run once per class upon class loading; instance blocks run before constructors.",
      "Overloading with `null` selects the most specific subtype method.",
      "Never put a `return` statement inside a `finally` block; it overrides return values and swallows exceptions."
    ],
    "moduleId": "java-m8",
    "moduleNumber": 8,
    "moduleTitle": "Java Interview Preparation",
    "language": "java"
  },
  {
    "id": "java-98-string-comparisons",
    "topicNumber": 98,
    "title": "String, StringBuilder & Object Comparison Pitfalls",
    "level": "Beginner",
    "whyItMatters": "String is the most widely used class in Java. Understanding string immutability, compact strings (byte[] in Java 9+), StringBuilder vs StringBuffer, and the equals/hashCode contract is essential for writing bug-free code.",
    "explanation": "1. Immutability of java.lang.String:\n- In Java, String objects are strictly immutable: once created, their internal content cannot be modified.\n- Why? Security (network connections and database URLs are strings), Thread Safety (immutable objects are inherently thread-safe without synchronization), and Caching (hash codes can be precomputed and cached; String pool).\n- Compact Strings (Java 9+): Strings are stored internally as byte[] with a 1-byte coder flag (LATIN1: 1 byte/char vs UTF16: 2 bytes/char), cutting memory usage by 50% for Western alphabets.\n\n2. StringBuilder vs StringBuffer:\n- StringBuilder: Introduced in Java 5. Mutable character buffer. NOT synchronized (not thread-safe), but fast and optimal for single-threaded string concatenation.\n- StringBuffer: Legacy (Java 1.0). Synchronized on every method call, adding lock overhead. Rarely needed in modern code.\n\n3. The equals() and hashCode() Contract:\n- If a.equals(b) is true, then a.hashCode() MUST EQUAL b.hashCode().\n- If a.hashCode() == b.hashCode(), a.equals(b) IS NOT GUARANTEED to be true (hash collision).\n- Violating this contract breaks HashMap and HashSet, causing duplicate entries and missing keys.",
    "syntaxAndStructure": "// Proper string concatenation in loops using StringBuilder:\nStringBuilder sb = new StringBuilder(estimatedCapacity);\nfor (String item : items) {\n    sb.append(item).append(\", \");\n}\nString result = sb.toString();",
    "codeExamples": [
      {
        "title": "String Concatenation: O(N^2) Loop vs O(N) StringBuilder",
        "code": "public class StringBuilderBenchmark {\n    public static void main(String[] args) {\n        int count = 10_000;\n\n        // Inefficient: String + creates 10,000 new String objects\n        long start = System.currentTimeMillis();\n        String s = \"\";\n        for (int i = 0; i < count; i++) {\n            s += \"a\";\n        }\n        long stringTime = System.currentTimeMillis() - start;\n\n        // Efficient: StringBuilder appends in-place\n        start = System.currentTimeMillis();\n        StringBuilder sb = new StringBuilder(count);\n        for (int i = 0; i < count; i++) {\n            sb.append(\"a\");\n        }\n        String result = sb.toString();\n        long sbTime = System.currentTimeMillis() - start;\n\n        System.out.println(\"String loop time: \" + stringTime + \" ms\");\n        System.out.println(\"StringBuilder time: \" + sbTime + \" ms\");\n        System.out.println(\"StringBuilder is orders of magnitude faster!\");\n    }\n}",
        "expectedOutput": "String loop time: 58 ms\nStringBuilder time: 1 ms\nStringBuilder is orders of magnitude faster!",
        "explanation": "String concatenation in a loop generates O(N) temporary string copies, yielding O(N^2) complexity. StringBuilder resizes its internal char/byte buffer dynamically, achieving O(N) linear time."
      },
      {
        "title": "Consequences of Violating equals() and hashCode() Contract",
        "code": "import java.util.*;\n\npublic class HashCodeContractDemo {\n    static class BadKey {\n        int id;\n        BadKey(int id) { this.id = id; }\n\n        @Override\n        public boolean equals(Object o) {\n            if (this == o) return true;\n            if (!(o instanceof BadKey badKey)) return false;\n            return this.id == badKey.id;\n        }\n\n        // Fails to override hashCode()! Inherits Object.hashCode() based on memory address\n    }\n\n    public static void main(String[] args) {\n        Map<BadKey, String> map = new HashMap<>();\n        map.put(new BadKey(101), \"Alpha\");\n\n        // Lookup with logically equal key\n        String found = map.get(new BadKey(101));\n        System.out.println(\"Found with equal key: \" + found);\n    }\n}",
        "expectedOutput": "Found with equal key: null",
        "explanation": "Because hashCode() was not overridden, the two BadKey(101) instances generate different hash codes, placing them in different buckets. The HashMap cannot find the entry despite equals() returning true!"
      }
    ],
    "realWorldApplications": [
      "Building SQL queries or JSON payloads dynamically using StringBuilder instead of String concatenation.",
      "Using composite keys in Redis and Guava caches where equals() and hashCode() must be perfectly aligned."
    ],
    "commonMistakes": [
      "Overriding equals() without overriding hashCode(), breaking HashMap lookups.",
      "Using StringBuffer instead of StringBuilder in single-threaded methods, paying unnecessary synchronization lock penalties.",
      "Mutating an object after inserting it as a key in a HashMap: altering fields used in hashCode() orphans the entry in the map."
    ],
    "interviewRelevance": "The equals() and hashCode() contract is one of the most widely asked questions in Java interviews across all seniority levels.",
    "checkpoints": [
      {
        "id": "java-98-cp1",
        "label": "Explain why String is immutable and how Compact Strings save memory in Java 9+"
      },
      {
        "id": "java-98-cp2",
        "label": "Distinguish between String, StringBuilder (fast, unsynchronized), and StringBuffer"
      },
      {
        "id": "java-98-cp3",
        "label": "Implement proper equals() and hashCode() contracts using Objects.hash()"
      }
    ],
    "practiceExercises": [
      {
        "id": "java-98-ex1",
        "title": "Compare Identity vs Equality",
        "difficulty": "Beginner",
        "type": "output_prediction",
        "prompt": "What is printed by: String s1 = \"hello\"; String s2 = new String(\"hello\"); System.out.println(s1 == s2); System.out.println(s1.equals(s2));?",
        "solution": "Output:\nfalse\ntrue\nExplanation: == tests reference identity (s1 is in the String constant pool, s2 is a separate heap instance). .equals() compares the actual character contents.",
        "explanation": "Always use .equals() for value equality and == for checking if two references point to the exact same memory address."
      },
      {
        "id": "java-98-ex2",
        "title": "Implement Valid equals() and hashCode()",
        "difficulty": "Intermediate",
        "type": "coding",
        "prompt": "Write a class Point2D with int x, y fields that properly implements equals() and hashCode() satisfying the contract.",
        "starterCode": "public class Point2D {\n    private final int x, y;\n    public Point2D(int x, int y) { this.x = x; this.y = y; }\n    // Implement equals and hashCode\n}",
        "solution": "import java.util.Objects;\n\npublic class Point2D {\n    private final int x, y;\n    public Point2D(int x, int y) { this.x = x; this.y = y; }\n\n    @Override\n    public boolean equals(Object o) {\n        if (this == o) return true;\n        if (!(o instanceof Point2D point)) return false;\n        return this.x == point.x && this.y == point.y;\n    }\n\n    @Override\n    public int hashCode() {\n        return Objects.hash(x, y);\n    }\n}",
        "explanation": "Pattern matching for instanceof casts cleanly. Objects.hash(x, y) computes a consistent hash code matching the equals criteria."
      },
      {
        "id": "java-98-ex3",
        "title": "Demonstrate HashMap Mutation Orphan Bug",
        "difficulty": "Advanced",
        "type": "coding",
        "prompt": "Write a test class demonstrating that mutating a mutable key in a HashMap causes map.containsKey(key) to return false.",
        "starterCode": "import java.util.*;\n\npublic class MutableKeyDemo {\n    // Demonstrate orphan bug\n}",
        "solution": "import java.util.*;\n\npublic class MutableKeyDemo {\n    static class MutableKey {\n        int id;\n        MutableKey(int id) { this.id = id; }\n        @Override\n        public boolean equals(Object o) {\n            return o instanceof MutableKey m && this.id == m.id;\n        }\n        @Override\n        public int hashCode() { return Objects.hash(id); }\n    }\n\n    public static void main(String[] args) {\n        Map<MutableKey, String> map = new HashMap<>();\n        MutableKey key = new MutableKey(1);\n        map.put(key, \"Value\");\n\n        // Mutate key after insertion\n        key.id = 2;\n\n        System.out.println(\"Contains key after mutation: \" + map.containsKey(key)); // false!\n    }\n}",
        "explanation": "Changing key.id alters its hashCode(). When map.containsKey(key) searches the bucket corresponding to the new hash, it checks the wrong bucket and fails to find the entry."
      }
    ],
    "quizQuestions": [
      {
        "id": "java-98-q1",
        "question": "What is the required contract relationship between `equals()` and `hashCode()` in Java?",
        "options": [
          "If two objects have the same hashCode(), they must be equal according to equals()",
          "If two objects are equal according to equals(), they must produce the identical hashCode()",
          "hashCode() must always return a prime number",
          "Objects can only implement equals() if they implement Comparable"
        ],
        "correctOptionIndex": 1,
        "explanation": "The contract specifies: if a.equals(b) is true, then a.hashCode() == b.hashCode() must be true. The converse is not required due to hash collisions."
      },
      {
        "id": "java-98-q2",
        "question": "Why was `StringBuilder` introduced in Java 5 when `StringBuffer` already existed?",
        "options": [
          "Because StringBuffer could not handle Unicode characters",
          "Because StringBuffer is synchronized on every method call, imposing thread locking overhead; StringBuilder provides a faster, unsynchronized alternative for single-threaded use",
          "Because StringBuilder stores characters in native OS memory",
          "Because StringBuffer was deprecated"
        ],
        "correctOptionIndex": 1,
        "explanation": "StringBuffer incurs synchronization overhead on every append() call. StringBuilder provides identical functionality without synchronization for higher throughput."
      }
    ],
    "revisionNotes": [
      "String is immutable and backed by byte[] (Compact Strings in Java 9+).",
      "Use `StringBuilder` for loop concatenation to avoid O(N^2) string allocations.",
      "Always override `hashCode()` whenever you override `equals()`."
    ],
    "moduleId": "java-m8",
    "moduleNumber": 8,
    "moduleTitle": "Java Interview Preparation",
    "language": "java"
  },
  {
    "id": "java-99-collections-interview",
    "topicNumber": 99,
    "title": "Collections Framework Rapid-Fire & Trade-offs",
    "level": "Intermediate",
    "whyItMatters": "Collections questions assess whether you can pick the optimal data structure for a given access pattern. Understanding internal resizings, treeification thresholds, fail-fast vs fail-safe iterators, and concurrency trade-offs is essential for passing technical rounds.",
    "explanation": "1. Core Collection Trade-offs:\n- ArrayList vs LinkedList: ArrayList is backed by an array, providing O(1) random access and cache locality. LinkedList has pointer overhead (24 bytes per node) and terrible cache performance. In practice, ArrayList beats LinkedList even for insertions unless inserting strictly at the head (where ArrayDeque is superior).\n- ArrayDeque vs Stack: ArrayDeque is faster than Stack (no synchronized overhead) and faster than LinkedList when used as a Queue or Stack.\n\n2. HashMap Internal Architecture:\n- Default capacity: 16 buckets; load factor: 0.75 (resizes at 12 elements to 32 buckets).\n- Index formula: index = (n - 1) & hash (bitwise AND with power of 2).\n- Treeification: When a single bucket exceeds 8 entries AND the table capacity is >= 64, the linked bin is converted to a Red-Black tree (TreeNode), improving worst-case search from O(N) to O(log N).\n\n3. Fail-Fast vs Fail-Safe Iterators:\n- Fail-Fast (ArrayList, HashMap): Uses internal modCount. If the collection is structurally modified during iteration by any means other than the iterator's own remove() method, it throws ConcurrentModificationException immediately.\n- Fail-Safe / Weakly Consistent (ConcurrentHashMap, CopyOnWriteArrayList): Operates on a clone or snapshot; never throws ConcurrentModificationException.",
    "syntaxAndStructure": "// Safe element removal during iteration using Iterator:\nIterator<String> it = list.iterator();\nwhile (it.hasNext()) {\n    if (it.next().startsWith(\"X\")) {\n        it.remove(); // SAFE: updates modCount correctly\n    }\n}",
    "codeExamples": [
      {
        "title": "ConcurrentModificationException vs Iterator.remove()",
        "code": "import java.util.*;\n\npublic class FailFastDemo {\n    public static void main(String[] args) {\n        List<String> list = new ArrayList<>(List.of(\"A\", \"B\", \"C\", \"D\"));\n\n        // Safe removal using Iterator.remove()\n        Iterator<String> it = list.iterator();\n        while (it.hasNext()) {\n            String val = it.next();\n            if (val.equals(\"B\")) {\n                it.remove(); // Properly updates expectedModCount\n            }\n        }\n        System.out.println(\"After safe removal: \" + list);\n\n        // Demonstrating fail-fast behavior\n        try {\n            for (String s : list) {\n                if (s.equals(\"C\")) {\n                    list.remove(s); // Modifies collection directly -> CME!\n                }\n            }\n        } catch (ConcurrentModificationException e) {\n            System.out.println(\"Caught expected ConcurrentModificationException!\");\n        }\n    }\n}",
        "expectedOutput": "After safe removal: [A, C, D]\nCaught expected ConcurrentModificationException!",
        "explanation": "Iterating with for-each uses an implicit Iterator. Modifying the list directly desynchronizes modCount and expectedModCount, triggering ConcurrentModificationException."
      },
      {
        "title": "ConcurrentHashMap vs Collections.synchronizedMap",
        "code": "import java.util.concurrent.ConcurrentHashMap;\n\npublic class ConcurrentCollectionDemo {\n    public static void main(String[] args) {\n        ConcurrentHashMap<String, Integer> map = new ConcurrentHashMap<>();\n        map.put(\"visitors\", 100);\n\n        // Atomic update without manual locks\n        map.compute(\"visitors\", (k, v) -> v == null ? 1 : v + 1);\n\n        System.out.println(\"Updated count: \" + map.get(\"visitors\"));\n    }\n}",
        "expectedOutput": "Updated count: 101",
        "explanation": "ConcurrentHashMap uses bucket-level CAS (Compare-And-Swap) and synchronized node locking, providing high concurrency without locking the entire map like synchronizedMap."
      }
    ],
    "realWorldApplications": [
      "High-throughput web servers storing active session states in ConcurrentHashMap.",
      "In-memory caching engines implementing LRU eviction by configuring LinkedHashMap with accessOrder=true."
    ],
    "commonMistakes": [
      "Removing elements from an ArrayList inside a standard for-each loop, triggering ConcurrentModificationException.",
      "Using LinkedList under the mistaken assumption that it is faster for insertions, ignoring CPU cache miss penalties.",
      "Using Hashtable or Vector in modern code instead of ConcurrentHashMap or ArrayList."
    ],
    "interviewRelevance": "HashMap internal mechanics (treeification, load factor, table sizing) and ConcurrentModificationException are asked in nearly 100% of Java backend interviews.",
    "checkpoints": [
      {
        "id": "java-99-cp1",
        "label": "Explain HashMap internal collision resolution (LinkedList to Red-Black tree conversion)"
      },
      {
        "id": "java-99-cp2",
        "label": "Differentiate between Fail-Fast and Fail-Safe iterators"
      },
      {
        "id": "java-99-cp3",
        "label": "Select appropriate collections: ArrayList vs ArrayDeque vs ConcurrentHashMap"
      }
    ],
    "practiceExercises": [
      {
        "id": "java-99-ex1",
        "title": "Remove Even Numbers with removeIf",
        "difficulty": "Beginner",
        "type": "coding",
        "prompt": "Given a List<Integer>, remove all even numbers cleanly using Java 8 Collection.removeIf().",
        "starterCode": "import java.util.*;\n\npublic class ListFilter {\n    public static void removeEvens(List<Integer> list) {\n        // Remove evens in-place\n    }\n}",
        "solution": "import java.util.*;\n\npublic class ListFilter {\n    public static void removeEvens(List<Integer> list) {\n        list.removeIf(n -> n % 2 == 0);\n    }\n}",
        "explanation": "list.removeIf(predicate) safely removes matching elements in-place without throwing ConcurrentModificationException."
      },
      {
        "id": "java-99-ex2",
        "title": "Design Fixed-Size LRU Cache with LinkedHashMap",
        "difficulty": "Intermediate",
        "type": "coding",
        "prompt": "Implement an LRUCache<K, V> class of fixed capacity extending LinkedHashMap and overriding removeEldestEntry.",
        "starterCode": "import java.util.*;\n\npublic class LRUCache<K, V> extends LinkedHashMap<K, V> {\n    // Implement cache\n}",
        "solution": "import java.util.*;\n\npublic class LRUCache<K, V> extends LinkedHashMap<K, V> {\n    private final int maxCapacity;\n\n    public LRUCache(int capacity) {\n        super(capacity, 0.75f, true); // true = access-order\n        this.maxCapacity = capacity;\n    }\n\n    @Override\n    protected boolean removeEldestEntry(Map.Entry<K, V> eldest) {\n        return size() > maxCapacity;\n    }\n}",
        "explanation": "Setting accessOrder=true orders entries by access (get/put). Overriding removeEldestEntry evicts the least recently accessed item when capacity is exceeded."
      },
      {
        "id": "java-99-ex3",
        "title": "Atomic Counter with ConcurrentHashMap",
        "difficulty": "Advanced",
        "type": "coding",
        "prompt": "Write a method recordVisit(ConcurrentHashMap<String, Long> map, String page) that atomically increments the visit count for a page thread-safely.",
        "starterCode": "import java.util.concurrent.ConcurrentHashMap;\n\npublic class PageTracker {\n    public static void recordVisit(ConcurrentHashMap<String, Long> map, String page) {\n        // Atomic increment\n    }\n}",
        "solution": "import java.util.concurrent.ConcurrentHashMap;\n\npublic class PageTracker {\n    public static void recordVisit(ConcurrentHashMap<String, Long> map, String page) {\n        map.compute(page, (k, v) -> (v == null) ? 1L : v + 1L);\n    }\n}",
        "explanation": "compute() applies the remapping function atomically on the specific bucket node, ensuring thread-safe increments without race conditions."
      }
    ],
    "quizQuestions": [
      {
        "id": "java-99-q1",
        "question": "Under what conditions does a HashMap bucket convert its elements from a linked list to a balanced Red-Black tree (TreeNode)?",
        "options": [
          "When the bucket has more than 2 elements",
          "When the number of colliding elements in that bucket reaches 8 AND total table capacity is at least 64",
          "Whenever a hash collision occurs",
          "Only when load factor reaches 1.0"
        ],
        "correctOptionIndex": 1,
        "explanation": "Java 8 HashMap treeifies a bin when its count reaches TREEIFY_THRESHOLD (8) and the table capacity is at least MIN_TREEIFY_CAPACITY (64). If capacity is < 64, it resizes the table instead."
      },
      {
        "id": "java-99-q2",
        "question": "What triggers a `ConcurrentModificationException` during collection iteration?",
        "options": [
          "Modifying elements using Iterator.remove()",
          "A mismatch between the iterator's expectedModCount and the collection's actual modCount caused by modifying the collection directly",
          "Reading from multiple threads without synchronization",
          "Inserting null values into a TreeSet"
        ],
        "correctOptionIndex": 1,
        "explanation": "Fail-fast iterators check if modCount == expectedModCount before every next() operation. If the collection was modified outside the iterator, the counts mismatch and CME is thrown."
      }
    ],
    "revisionNotes": [
      "Prefer `ArrayList` and `ArrayDeque` over `LinkedList` and `Stack`.",
      "HashMap converts bins with >8 entries to Red-Black trees when table capacity >= 64.",
      "Use `list.removeIf()` or `Iterator.remove()` to avoid `ConcurrentModificationException`."
    ],
    "moduleId": "java-m8",
    "moduleNumber": 8,
    "moduleTitle": "Java Interview Preparation",
    "language": "java"
  },
  {
    "id": "java-100-oop-scenarios",
    "topicNumber": 100,
    "title": "OOP Design Scenarios, Behavioral Questions & Interface Evolution",
    "level": "Intermediate",
    "whyItMatters": "Interviewers evaluate architectural maturity through open-ended design questions: abstract classes vs interfaces, resolving interface default method diamond conflicts, and applying SOLID principles to real-world software components.",
    "explanation": "1. Abstract Class vs Interface (Java 8/9/17 Evolution):\n- Abstract Class: Represents an \"is-a\" relationship. Can hold mutable instance state (fields), non-public constructors, and protected methods. A class can inherit from ONLY ONE abstract class.\n- Interface: Represents a \"can-do\" or capability contract (e.g. Comparable, AutoCloseable). A class can implement multiple interfaces.\n  - Java 8 added default and static methods to interfaces.\n  - Java 9 added private methods for code reuse inside default methods.\n\n2. The Diamond Problem in Interface Default Methods:\n- If Class C implements Interface A and Interface B, and both A and B provide default void execute() with identical signatures:\n- The Java compiler FLAGS THIS AS A COMPILE-TIME ERROR: \"class C inherits unrelated defaults for execute() from types A and B\".\n- Resolution: Class C MUST explicitly override the method and resolve ambiguity (e.g. A.super.execute(); or custom implementation).\n\n3. Answering Behavioral Interview Questions with STAR:\n- Situation: Set the context (company, project, constraint).\n- Task: Define what was required of you.\n- Action: Detail the specific architectural and engineering steps you took.\n- Result: Quantify the outcome (e.g., \"reduced latency by 35%, deployed zero-downtime\").",
    "syntaxAndStructure": "// Resolving default method conflict:\ninterface A { default void log() { System.out.println(\"A\"); } }\ninterface B { default void log() { System.out.println(\"B\"); } }\nclass C implements A, B {\n    @Override\n    public void log() { A.super.log(); } // disambiguation\n}",
    "codeExamples": [
      {
        "title": "Resolving Diamond Default Method Conflicts",
        "code": "public class DiamondResolutionDemo {\n    interface Engine {\n        default void start() { System.out.println(\"Combustion engine start\"); }\n    }\n\n    interface ElectricMotor {\n        default void start() { System.out.println(\"Electric motor start\"); }\n    }\n\n    // HybridCar implements both; must explicitly resolve start()\n    static class HybridCar implements Engine, ElectricMotor {\n        @Override\n        public void start() {\n            System.out.println(\"Starting Hybrid powertrain:\");\n            ElectricMotor.super.start(); // Call electric motor first\n            Engine.super.start();        // Call combustion engine as backup\n        }\n    }\n\n    public static void main(String[] args) {\n        HybridCar car = new HybridCar();\n        car.start();\n    }\n}",
        "expectedOutput": "Starting Hybrid powertrain:\nElectric motor start\nCombustion engine start",
        "explanation": "When multiple implemented interfaces define conflicting default methods, the subclass must explicitly override the method and can delegate using InterfaceName.super.method()."
      },
      {
        "title": "Interface with Private Helper Methods (Java 9+)",
        "code": "public class ModernInterfaceDemo {\n    interface PaymentProcessor {\n        default void payCreditCard(double amount) {\n            logTransaction(\"CreditCard\", amount);\n        }\n\n        default void payPayPal(double amount) {\n            logTransaction(\"PayPal\", amount);\n        }\n\n        // Private interface method for internal code sharing\n        private void logTransaction(String method, double amount) {\n            System.out.println(\"AUDIT: Processed $\" + amount + \" via \" + method);\n        }\n    }\n\n    static class StoreCheckout implements PaymentProcessor {}\n\n    public static void main(String[] args) {\n        StoreCheckout checkout = new StoreCheckout();\n        checkout.payCreditCard(149.99);\n    }\n}",
        "expectedOutput": "AUDIT: Processed $149.99 via CreditCard",
        "explanation": "Java 9 introduced private interface methods, enabling default methods to share common helper logic without exposing those helpers as public API."
      }
    ],
    "realWorldApplications": [
      "Refactoring legacy monolithic APIs by adding default methods to public interfaces without breaking existing implementers.",
      "Structuring domain logic cleanly into microservices following Single Responsibility and Dependency Inversion."
    ],
    "commonMistakes": [
      "Assuming interfaces and abstract classes are now identical because interfaces support default methods: interfaces still cannot have instance fields or constructors.",
      "Using inheritance purely for code reuse instead of subtyping (\"is-a\"), violating the Liskov Substitution Principle.",
      "Forgetting that interface fields are implicitly public static final (constants)."
    ],
    "interviewRelevance": "Interface evolution, abstract class trade-offs, and resolving the diamond problem appear in almost all senior engineering system design and OOP screens.",
    "checkpoints": [
      {
        "id": "java-100-cp1",
        "label": "Articulate differences between abstract classes and modern interfaces"
      },
      {
        "id": "java-100-cp2",
        "label": "Resolve default method conflicts using InterfaceName.super.method()"
      },
      {
        "id": "java-100-cp3",
        "label": "Structure behavioral interview responses using the STAR method"
      }
    ],
    "practiceExercises": [
      {
        "id": "java-100-ex1",
        "title": "Compare Abstract Class vs Interface Modifiers",
        "difficulty": "Beginner",
        "type": "conceptual",
        "prompt": "What are the implicit modifiers for variables declared inside an interface in Java?",
        "solution": "Variables declared in an interface are implicitly `public static final`. They are compile-time constants and cannot be instance variables.",
        "explanation": "Interfaces cannot maintain mutable instance state; any field declared in an interface is an immutable constant."
      },
      {
        "id": "java-100-ex2",
        "title": "Implement Interface Default Method Override",
        "difficulty": "Intermediate",
        "type": "coding",
        "prompt": "Create interfaces GreeterA and GreeterB with default String greet() returning \"Hello\" and \"Hi\". Implement class BilingualGreeter that resolves greet() returning \"Hello & Hi\".",
        "starterCode": "public class GreeterDemo {\n    // Implement interfaces and class\n}",
        "solution": "public class GreeterDemo {\n    interface GreeterA {\n        default String greet() { return \"Hello\"; }\n    }\n    interface GreeterB {\n        default String greet() { return \"Hi\"; }\n    }\n\n    static class BilingualGreeter implements GreeterA, GreeterB {\n        @Override\n        public String greet() {\n            return GreeterA.super.greet() + \" & \" + GreeterB.super.greet();\n        }\n    }\n}",
        "explanation": "Overriding greet() and combining GreeterA.super.greet() with GreeterB.super.greet() resolves the conflict cleanly."
      },
      {
        "id": "java-100-ex3",
        "title": "Apply Dependency Inversion Principle",
        "difficulty": "Advanced",
        "type": "coding",
        "prompt": "Refactor a tightly coupled OrderProcessor that instantiates new MySQLDatabase() to depend on an abstraction DatabaseRepository instead.",
        "starterCode": "public class DipRefactor {\n    // Implement DIP refactor\n}",
        "solution": "public class DipRefactor {\n    public interface DatabaseRepository {\n        void saveOrder(String orderId);\n    }\n\n    public static class OrderProcessor {\n        private final DatabaseRepository repo;\n\n        // Dependency Injected via constructor\n        public OrderProcessor(DatabaseRepository repo) {\n            this.repo = repo;\n        }\n\n        public void process(String orderId) {\n            repo.saveOrder(orderId);\n        }\n    }\n}",
        "explanation": "High-level OrderProcessor depends on abstraction DatabaseRepository rather than concrete MySQLDatabase, allowing seamless swapping of implementations for testing."
      }
    ],
    "quizQuestions": [
      {
        "id": "java-100-q1",
        "question": "What happens if a class implements two interfaces that declare identical default method signatures?",
        "options": [
          "The JVM picks the interface listed first in the implements clause",
          "The Java compiler produces an error requiring the subclass to explicitly override the method and resolve the ambiguity",
          "The method from the interface with the higher alphabetical name is chosen",
          "Both methods execute concurrently"
        ],
        "correctOptionIndex": 1,
        "explanation": "Java detects the conflict at compile-time and forces the implementer to explicitly override the method, avoiding runtime ambiguity."
      },
      {
        "id": "java-100-q2",
        "question": "Which capability is supported by abstract classes but NOT supported by modern interfaces in Java?",
        "options": [
          "Defining static methods",
          "Declaring private helper methods",
          "Declaring mutable instance variables (fields) and non-public constructors",
          "Providing default method implementations"
        ],
        "correctOptionIndex": 2,
        "explanation": "Interfaces cannot declare non-static instance fields or constructors. All interface fields are implicitly public static final constants."
      }
    ],
    "revisionNotes": [
      "Interfaces define capabilities; abstract classes define core identities with mutable state.",
      "Diamond default method conflicts must be explicitly resolved in the implementing class.",
      "Use the STAR method (Situation, Task, Action, Result) for behavioral interview questions."
    ],
    "moduleId": "java-m8",
    "moduleNumber": 8,
    "moduleTitle": "Java Interview Preparation",
    "language": "java"
  },
  {
    "id": "java-101-multithreading-interview",
    "topicNumber": 101,
    "title": "Multithreading & Concurrency Interview Traps",
    "level": "Advanced",
    "whyItMatters": "Concurrency questions separate average developers from elite backend engineers. Topics like happens-before relationships, volatile visibility vs atomicity, deadlock conditions, and ReentrantLock vs synchronized determine interview outcomes.",
    "explanation": "1. volatile vs Atomic Variables vs Synchronized:\n- volatile: Guarantees visibility and instruction reordering prevention across CPU caches via memory barriers. It DOES NOT guarantee atomicity! volatile count++ is NOT thread-safe because count++ is 3 separate operations (read, increment, write).\n- AtomicInteger / AtomicLong: Uses hardware-level CAS (Compare-And-Swap) instructions for lock-free, atomic compound updates.\n- synchronized / ReentrantLock: Guarantees both mutual exclusion (atomicity) and visibility at the cost of thread blocking.\n\n2. The 4 Necessary Conditions for Deadlock (Coffman Conditions):\n1. Mutual Exclusion: At least one resource is held in a non-shareable mode.\n2. Hold and Wait: A thread holds one resource while waiting to acquire another.\n3. No Preemption: Resources cannot be forcibly confiscated from a thread.\n4. Circular Wait: A closed chain of threads exists where each thread waits for a resource held by the next.\nBreaking ANY ONE of these conditions prevents deadlock! (Most common: Lock Ordering — always acquire locks in a globally consistent order).\n\n3. wait() and notify() Contract:\n- Must ALWAYS be called inside a synchronized block on the monitor object, or IllegalMonitorStateException is thrown.\n- wait() must ALWAYS be called inside a while loop, never an if statement, to defend against Spurious Wakeups!",
    "syntaxAndStructure": "// The wait-in-a-loop pattern (defending against spurious wakeups):\nsynchronized (lock) {\n    while (!condition) {\n        lock.wait();\n    }\n    // perform action\n}",
    "codeExamples": [
      {
        "title": "Why volatile is NOT Atomic (Race Condition Proof)",
        "code": "public class VolatileRaceConditionDemo {\n    static class Counter {\n        // volatile guarantees visibility, but NOT atomicity!\n        volatile int count = 0;\n\n        void increment() {\n            count++; // count = count + 1 (read, modify, write)\n        }\n    }\n\n    public static void main(String[] args) throws InterruptedException {\n        Counter counter = new Counter();\n        Thread t1 = new Thread(() -> { for (int i = 0; i < 1000; i++) counter.increment(); });\n        Thread t2 = new Thread(() -> { for (int i = 0; i < 1000; i++) counter.increment(); });\n\n        t1.start();\n        t2.start();\n        t1.join();\n        t2.join();\n\n        System.out.println(\"Final count (expected 2000): \" + counter.count);\n        System.out.println(\"Count is frequently < 2000 due to lost updates!\");\n    }\n}",
        "expectedOutput": "Final count (expected 2000): 2000\nCount is frequently < 2000 due to lost updates!",
        "explanation": "Because count++ consists of 3 distinct bytecode instructions, concurrent reads cause lost updates. Use AtomicInteger or synchronized to guarantee atomicity."
      },
      {
        "title": "Deadlock Prevention via Strict Lock Ordering",
        "code": "public class DeadlockPreventionDemo {\n    static class Account {\n        final int id;\n        double balance;\n        Account(int id, double balance) { this.id = id; this.balance = balance; }\n    }\n\n    public static void transfer(Account from, Account to, double amount) {\n        // Enforce global lock ordering based on unique ID\n        Account firstLock = from.id < to.id ? from : to;\n        Account secondLock = from.id < to.id ? to : from;\n\n        synchronized (firstLock) {\n            synchronized (secondLock) {\n                from.balance -= amount;\n                to.balance += amount;\n                System.out.println(\"Safe transfer completed!\");\n            }\n        }\n    }\n\n    public static void main(String[] args) {\n        Account a1 = new Account(1, 500);\n        Account a2 = new Account(2, 300);\n        transfer(a1, a2, 100);\n    }\n}",
        "expectedOutput": "Safe transfer completed!",
        "explanation": "Sorting accounts by ID ensures all threads acquire locks in the identical order, eliminating the Circular Wait condition and preventing deadlocks."
      }
    ],
    "realWorldApplications": [
      "High-throughput message brokers (Kafka, RabbitMQ) coordinating consumer threads with lock-free atomic rings.",
      "Web servers managing thread pools using ThreadPoolExecutor with rejection policies."
    ],
    "commonMistakes": [
      "Using volatile for composite operations like count++ or check-then-act flags.",
      "Calling wait() outside of a while loop, leading to data corruption from spurious wakeups.",
      "Calling notify() instead of notifyAll(), causing thread starvation when multiple threads are waiting on different conditions."
    ],
    "interviewRelevance": "Deadlock prevention, volatile vs AtomicInteger, and producer-consumer implementations are top-tier questions asked by Google, Meta, and Goldman Sachs.",
    "checkpoints": [
      {
        "id": "java-101-cp1",
        "label": "Explain why volatile guarantees visibility but not atomicity"
      },
      {
        "id": "java-101-cp2",
        "label": "Prevent deadlocks by eliminating the Circular Wait condition via lock ordering"
      },
      {
        "id": "java-101-cp3",
        "label": "Use the standard while (!condition) { wait(); } pattern to guard against spurious wakeups"
      }
    ],
    "practiceExercises": [
      {
        "id": "java-101-ex1",
        "title": "Thread-Safe Counter with AtomicInteger",
        "difficulty": "Beginner",
        "type": "coding",
        "prompt": "Implement a thread-safe Counter class using AtomicInteger that supports increment(), decrement(), and get().",
        "starterCode": "public class SafeCounter {\n    // Implement counter\n}",
        "solution": "import java.util.concurrent.atomic.AtomicInteger;\n\npublic class SafeCounter {\n    private final AtomicInteger count = new AtomicInteger(0);\n\n    public void increment() { count.incrementAndGet(); }\n    public void decrement() { count.decrementAndGet(); }\n    public int get() { return count.get(); }\n}",
        "explanation": "AtomicInteger uses hardware CAS (Compare-And-Swap) instructions for lock-free, atomic operations."
      },
      {
        "id": "java-101-ex2",
        "title": "Producer-Consumer Bounded Buffer with Locks",
        "difficulty": "Intermediate",
        "type": "coding",
        "prompt": "Implement a thread-safe BoundedBuffer<T> with put(T) and take() using ReentrantLock and two Conditions (notFull, notEmpty).",
        "starterCode": "import java.util.concurrent.locks.*;\n\npublic class BoundedBuffer<T> {\n    // Implement bounded buffer\n}",
        "solution": "import java.util.concurrent.locks.*;\n\npublic class BoundedBuffer<T> {\n    private final Object[] items;\n    private int putptr, takeptr, count;\n    private final Lock lock = new ReentrantLock();\n    private final Condition notFull  = lock.newCondition();\n    private final Condition notEmpty = lock.newCondition();\n\n    public BoundedBuffer(int capacity) { items = new Object[capacity]; }\n\n    public void put(T x) throws InterruptedException {\n        lock.lock();\n        try {\n            while (count == items.length) notFull.await();\n            items[putptr] = x;\n            if (++putptr == items.length) putptr = 0;\n            count++;\n            notEmpty.signal();\n        } finally { lock.unlock(); }\n    }\n\n    @SuppressWarnings(\"unchecked\")\n    public T take() throws InterruptedException {\n        lock.lock();\n        try {\n            while (count == 0) notEmpty.await();\n            T x = (T) items[takeptr];\n            if (++takeptr == items.length) takeptr = 0;\n            count--;\n            notFull.signal();\n            return x;\n        } finally { lock.unlock(); }\n    }\n}",
        "explanation": "Separate notFull and notEmpty conditions allow signaling only the relevant waiting threads, preventing unnecessary wakeups."
      },
      {
        "id": "java-101-ex3",
        "title": "Lock-Free Stack using Treiber Algorithm",
        "difficulty": "Advanced",
        "type": "coding",
        "prompt": "Implement a lock-free Stack<T> using AtomicReference<Node<T>> and compareAndSet.",
        "starterCode": "import java.util.concurrent.atomic.AtomicReference;\n\npublic class LockFreeStack<T> {\n    // Implement lock-free stack\n}",
        "solution": "import java.util.concurrent.atomic.AtomicReference;\n\npublic class LockFreeStack<T> {\n    private static class Node<T> {\n        final T item;\n        Node<T> next;\n        Node(T item) { this.item = item; }\n    }\n\n    private final AtomicReference<Node<T>> top = new AtomicReference<>(null);\n\n    public void push(T item) {\n        Node<T> newHead = new Node<>(item);\n        Node<T> oldHead;\n        do {\n            oldHead = top.get();\n            newHead.next = oldHead;\n        } while (!top.compareAndSet(oldHead, newHead));\n    }\n\n    public T pop() {\n        Node<T> oldHead;\n        Node<T> newHead;\n        do {\n            oldHead = top.get();\n            if (oldHead == null) return null;\n            newHead = oldHead.next;\n        } while (!top.compareAndSet(oldHead, newHead));\n        return oldHead.item;\n    }\n}",
        "explanation": "Treiber's algorithm uses AtomicReference CAS loops. If another thread mutates top concurrently, compareAndSet fails and the loop retries."
      }
    ],
    "quizQuestions": [
      {
        "id": "java-101-q1",
        "question": "Why does `volatile int count = 0; count++;` fail to be thread-safe in Java?",
        "options": [
          "Because volatile variables cannot be integers",
          "Because count++ consists of 3 distinct non-atomic operations (read, modify, write), allowing race conditions between concurrent threads",
          "Because volatile locks the CPU",
          "Because volatile variables cannot be modified after initialization"
        ],
        "correctOptionIndex": 1,
        "explanation": "volatile guarantees memory visibility, but does not provide atomicity for compound operations like count++."
      },
      {
        "id": "java-101-q2",
        "question": "Why must `wait()` always be invoked inside a `while` loop rather than an `if` block?",
        "options": [
          "To ensure compilation succeeds",
          "To defend against spurious wakeups where a thread wakes up without being signaled, and to re-verify the condition before proceeding",
          "Because if statements cannot access monitor locks",
          "To keep the thread running forever"
        ],
        "correctOptionIndex": 1,
        "explanation": "Threads can experience spurious wakeups without notify() being called. Re-checking the condition in a while loop ensures the thread only proceeds when the condition is genuinely true."
      }
    ],
    "revisionNotes": [
      "`volatile` guarantees visibility and prevents reordering, but is NOT atomic.",
      "Prevent deadlocks by enforcing global lock acquisition ordering.",
      "Always call `wait()` inside a `while (!condition)` loop."
    ],
    "moduleId": "java-m8",
    "moduleNumber": 8,
    "moduleTitle": "Java Interview Preparation",
    "language": "java"
  },
  {
    "id": "java-102-jvm-gc-interview",
    "topicNumber": 102,
    "title": "JVM Architecture & Garbage Collection Interview Questions",
    "level": "Advanced",
    "whyItMatters": "Understanding garbage collection mechanics, stop-the-world pauses, and how memory leaks occur despite automatic GC is essential for tuning production Java services and resolving high-severity performance incidents.",
    "explanation": "1. How Can Memory Leaks Occur in Java When GC Exists?\n- An object is a memory leak if it is NO LONGER NEEDED by the application, yet STILL REACHABLE from a GC Root (preventing GC from reclaiming it).\n- Common Causes of Java Memory Leaks:\n  1. Static collections: Adding objects to a static Map or List without removing them.\n  2. Uncleared ThreadLocals: Thread pools reuse threads; failing to call ThreadLocal.remove() prevents task objects from being collected.\n  3. Unclosed resources: Unclosed database connections, file handles, or network sockets.\n  4. Non-static inner classes: Retain an implicit reference to the enclosing outer class instance.\n  5. Improper equals/hashCode in HashMaps: Causes keys to become unreachable/unremovable.\n\n2. Modern Garbage Collectors:\n- G1 GC (Garbage-First): Default since Java 9. Divides heap into equal-sized regions (~2048 regions). Prioritizes regions with the most garbage to meet user-defined pause targets (-XX:MaxGCPauseMillis=200).\n- ZGC (Z Garbage Collector): Scalable low-latency GC (Java 15+ production ready). Pauses are sub-millisecond (< 1ms) regardless of heap size (from 16MB to 16TB!) using colored pointers and load barriers.\n\n3. Essential JVM Diagnostic Flags:\n- -Xms4g -Xmx4g: Set min and max heap size (equal values prevent dynamic resizing pauses).\n- -XX:+HeapDumpOnOutOfMemoryError -XX:HeapDumpPath=/var/dumps/heap.hprof\n- -Xlog:gc*:file=/var/log/gc.log:time,uptime:filecount=5,filesize=100M",
    "syntaxAndStructure": "// Common ThreadLocal cleanup pattern to prevent memory leaks:\nprivate static final ThreadLocal<UserContext> ctx = new ThreadLocal<>();\ntry {\n    ctx.set(new UserContext());\n    process();\n} finally {\n    ctx.remove(); // CRITICAL: prevents ThreadLocal memory leaks\n}",
    "codeExamples": [
      {
        "title": "Demonstrating a Classic Static Collection Memory Leak",
        "code": "import java.util.*;\n\npublic class MemoryLeakDemo {\n    // LEAK: Static collection retains references for the lifetime of the JVM\n    private static final List<byte[]> leakedList = new ArrayList<>();\n\n    public static void populate() {\n        for (int i = 0; i < 5; i++) {\n            leakedList.add(new byte[1024 * 1024]); // 1MB chunk\n        }\n        System.out.println(\"Allocated 5MB retained in static collection.\");\n    }\n\n    public static void main(String[] args) {\n        populate();\n        System.out.println(\"GC cannot reclaim leakedList elements because they are reachable from GC Root (Classloader)!\");\n    }\n}",
        "expectedOutput": "Allocated 5MB retained in static collection.\nGC cannot reclaim leakedList elements because they are reachable from GC Root (Classloader)!",
        "explanation": "Because leakedList is static, its elements remain reachable from the system classloader forever, preventing the garbage collector from freeing that heap memory."
      },
      {
        "title": "WeakReference for Cache Memory Management",
        "code": "import java.lang.ref.WeakReference;\n\npublic class WeakRefDemo {\n    public static void main(String[] args) {\n        String data = new String(\"Heavy Payload\");\n        WeakReference<String> weakRef = new WeakReference<>(data);\n\n        data = null; // Remove strong reference\n\n        System.out.println(\"Before GC: \" + weakRef.get());\n        System.gc(); // Suggest GC\n        System.out.println(\"WeakReferences are cleared by GC when no strong references remain.\");\n    }\n}",
        "expectedOutput": "Before GC: Heavy Payload\nWeakReferences are cleared by GC when no strong references remain.",
        "explanation": "Unlike Strong references, WeakReference objects do not prevent their referents from being reclaimed during garbage collection cycles."
      }
    ],
    "realWorldApplications": [
      "Diagnosing OutOfMemoryError in production by analyzing HPROF memory dumps using Eclipse Memory Analyzer (MAT).",
      "Configuring low-latency microservices with ZGC (-XX:+UseZGC) to maintain strict 99.9th percentile SLA latencies."
    ],
    "commonMistakes": [
      "Believing Java cannot have memory leaks because it has automatic garbage collection.",
      "Failing to call ThreadLocal.remove() in servlet filters, leaking memory across recycled thread pool workers.",
      "Setting -Xms much smaller than -Xmx, causing expensive heap expansion pauses during sudden traffic spikes."
    ],
    "interviewRelevance": "Explaining how memory leaks occur in Java, analyzing heap dumps, and comparing G1 GC with ZGC are frequent topics in senior and staff engineer interviews.",
    "checkpoints": [
      {
        "id": "java-102-cp1",
        "label": "Define memory leaks in Java (unneeded objects reachable from GC Roots)"
      },
      {
        "id": "java-102-cp2",
        "label": "Explain G1 GC region-based collection and ZGC sub-millisecond pauses"
      },
      {
        "id": "java-102-cp3",
        "label": "Prevent ThreadLocal leaks by always invoking .remove() in finally blocks"
      }
    ],
    "practiceExercises": [
      {
        "id": "java-102-ex1",
        "title": "Identify Memory Leak Source",
        "difficulty": "Beginner",
        "type": "conceptual",
        "prompt": "Explain why non-static inner classes can cause memory leaks in Android or long-lived desktop applications.",
        "solution": "Non-static inner classes hold an implicit hidden reference to their enclosing outer class instance (Outer.this). If an instance of the inner class (such as an asynchronous Runnable or Handler) outlives the outer class (e.g. an Activity or Window), it prevents the outer class and all its UI views from being garbage collected.",
        "explanation": "Always use static nested classes (or WeakReference) when inner class instances can outlive their outer enclosing instances."
      },
      {
        "id": "java-102-ex2",
        "title": "Diagnose OutOfMemoryError Types",
        "difficulty": "Intermediate",
        "type": "conceptual",
        "prompt": "Distinguish between: (1) java.lang.OutOfMemoryError: Java heap space, and (2) java.lang.OutOfMemoryError: Metaspace.",
        "solution": "1. Java heap space: The JVM cannot allocate an object because the heap is full and GC cannot reclaim enough memory (caused by memory leaks, high concurrency, or undersized -Xmx).\n2. Metaspace: Native memory allocated for loaded class metadata is exhausted (caused by dynamic class generation like CGLIB/ByteBuddy proxies without class unloading, or undersized -XX:MaxMetaspaceSize).",
        "explanation": "Heap space relates to application data and objects; Metaspace relates to loaded class definitions in native off-heap memory."
      },
      {
        "id": "java-102-ex3",
        "title": "Safe ThreadLocal Cleanup Pattern",
        "difficulty": "Advanced",
        "type": "coding",
        "prompt": "Write a reusable ScopedContext<T> class implementing AutoCloseable that sets a ThreadLocal on creation and removes it on close().",
        "starterCode": "public class ScopedContext<T> implements AutoCloseable {\n    // Implement AutoCloseable scoped context\n}",
        "solution": "public class ScopedContext<T> implements AutoCloseable {\n    private static final ThreadLocal<Object> TL = new ThreadLocal<>();\n\n    public ScopedContext(T value) {\n        TL.set(value);\n    }\n\n    @SuppressWarnings(\"unchecked\")\n    public static <T> T get() {\n        return (T) TL.get();\n    }\n\n    @Override\n    public void close() {\n        TL.remove();\n    }\n}",
        "explanation": "By implementing AutoCloseable, callers can manage ThreadLocal lifecycle via try-with-resources: try (var ctx = new ScopedContext<>(user)) { ... }, guaranteeing cleanup."
      }
    ],
    "quizQuestions": [
      {
        "id": "java-102-q1",
        "question": "How is an object determined to be garbage in modern HotSpot JVMs?",
        "options": [
          "Using reference counting (reclaimed when reference count reaches 0)",
          "Using tracing reachability from GC Roots (objects that cannot be reached through any path of references from GC Roots are eligible for collection)",
          "Based on how long the object has existed in the heap",
          "Only when the application explicitly calls System.gc()"
        ],
        "correctOptionIndex": 1,
        "explanation": "HotSpot uses tracing reachability from GC Roots (stack variables, static references, JNI handles). Reference counting was abandoned due to its inability to collect circular references."
      },
      {
        "id": "java-102-q2",
        "question": "What is the primary architectural advantage of the Z Garbage Collector (ZGC)?",
        "options": [
          "It uses zero heap memory",
          "It guarantees sub-millisecond stop-the-world pause times regardless of heap size by performing reference processing concurrently using load barriers",
          "It eliminates the need for compilation",
          "It only runs on 32-bit JVMs"
        ],
        "correctOptionIndex": 1,
        "explanation": "ZGC performs virtually all GC phases (marking, relocation) concurrently with application threads, keeping pause times under 1 millisecond even on terabyte-sized heaps."
      }
    ],
    "revisionNotes": [
      "Memory leaks in Java occur when unneeded objects remain reachable from GC Roots.",
      "Always call `ThreadLocal.remove()` to prevent leaks in thread-pooled environments.",
      "ZGC delivers sub-millisecond pause times through concurrent colored pointers and load barriers."
    ],
    "moduleId": "java-m8",
    "moduleNumber": 8,
    "moduleTitle": "Java Interview Preparation",
    "language": "java"
  },
  {
    "id": "java-103-coding-patterns",
    "topicNumber": 103,
    "title": "Top Java Coding Interview Patterns Cheat Sheet",
    "level": "Intermediate",
    "whyItMatters": "Interviews reward pattern recognition. Identifying whether a problem is a Two-Pointer, Sliding Window, Monotonic Stack, or Kahn's Topological Sort within the first 2 minutes is the secret to clearing coding assessments consistently.",
    "explanation": "1. Pattern Recognition Matrix:\n- Input is sorted array, find pair/triplet -> Two Pointers (Inward).\n- Contiguous subarray sum/length with constraints -> Sliding Window or Prefix Sum + HashMap.\n- Next Greater / Smaller Element -> Monotonic Stack.\n- Shortest path in unweighted graph/grid -> BFS with Queue.\n- Topological order or dependency resolution -> Kahn's Algorithm with in-degree array.\n- Optimization problem with monotonic feasibility predicate -> Binary Search on Answer.\n- Find K most frequent or smallest/largest -> PriorityQueue (Heap).\n\n2. Java Standard Library Quick Tricks for Interviews:\n- Array filling: Arrays.fill(arr, val);\n- Reversing list: Collections.reverse(list);\n- Binary search: Arrays.binarySearch(arr, key) (returns -(insertion_point + 1) if absent).\n- Frequency counting: map.put(x, map.getOrDefault(x, 0) + 1); or map.merge(x, 1, Integer::sum);\n- Priority queue max heap: PriorityQueue<Integer> pq = new PriorityQueue<>(Collections.reverseOrder());",
    "syntaxAndStructure": "// Idiomatic frequency update with merge:\nMap<String, Integer> counts = new HashMap<>();\ncounts.merge(word, 1, Integer::sum);",
    "codeExamples": [
      {
        "title": "Idiomatic Java Map Operations (computeIfAbsent & merge)",
        "code": "import java.util.*;\n\npublic class IdiomaticJavaPatterns {\n    public static void main(String[] args) {\n        // 1. Grouping into lists with computeIfAbsent\n        Map<Integer, List<String>> byLength = new HashMap<>();\n        List<String> words = List.of(\"apple\", \"bat\", \"cherry\", \"cat\");\n        for (String w : words) {\n            byLength.computeIfAbsent(w.length(), k -> new ArrayList<>()).add(w);\n        }\n        System.out.println(\"Grouped by length: \" + byLength);\n\n        // 2. Frequency counting with merge\n        Map<String, Integer> freq = new HashMap<>();\n        for (String w : words) {\n            freq.merge(w, 1, Integer::sum);\n        }\n        System.out.println(\"Frequency: \" + freq);\n    }\n}",
        "expectedOutput": "Grouped by length: {3=[bat, cat], 5=[apple], 6=[cherry]}\nFrequency: {bat=1, cherry=1, apple=1, cat=1}",
        "explanation": "computeIfAbsent and merge eliminate verbose if-else boilerplate, demonstrating mastery of modern Java 8+ idioms."
      },
      {
        "title": "Fast Grid Directions Array Pattern",
        "code": "public class GridDirectionsPattern {\n    // 4 cardinal directions: [rowOffset, colOffset]\n    private static final int[][] DIRS = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}};\n\n    public static void printNeighbors(int r, int c, int rows, int cols) {\n        for (int[] d : DIRS) {\n            int nr = r + d[0];\n            int nc = c + d[1];\n            if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {\n                System.out.printf(\"Valid neighbor: (%d, %d)%n\", nr, nc);\n            }\n        }\n    }\n\n    public static void main(String[] args) {\n        printNeighbors(0, 0, 3, 3);\n    }\n}",
        "expectedOutput": "Valid neighbor: (1, 0)\nValid neighbor: (0, 1)",
        "explanation": "A static directions array DIRS = {{-1,0},{1,0},{0,-1},{0,1}} simplifies grid DFS/BFS into a concise 4-step loop without duplicate code."
      }
    ],
    "realWorldApplications": [
      "Rapidly implementing algorithm prototypes during live coding interviews.",
      "Writing readable production code using modern Java Map APIs instead of legacy procedural patterns."
    ],
    "commonMistakes": [
      "Mixing up Min-Heap and Max-Heap comparator order in PriorityQueue.",
      "Forgetting bounds checks before accessing 2D grid neighbors (nr >= 0 && nr < R && nc >= 0 && nc < C).",
      "Using slow boxed collections in tight algorithm loops when primitive arrays would be 10x faster."
    ],
    "interviewRelevance": "Fluent pattern recognition and clean use of modern Java collections are evaluated in every technical coding assessment.",
    "checkpoints": [
      {
        "id": "java-103-cp1",
        "label": "Map problem requirements to canonical algorithmic patterns"
      },
      {
        "id": "java-103-cp2",
        "label": "Utilize Java 8+ idioms: computeIfAbsent, merge, getOrDefault"
      },
      {
        "id": "java-103-cp3",
        "label": "Implement 2D grid traversals using compact directional delta arrays"
      }
    ],
    "practiceExercises": [
      {
        "id": "java-103-ex1",
        "title": "Group Numbers by Remainder",
        "difficulty": "Beginner",
        "type": "coding",
        "prompt": "Group an array of integers into a Map<Integer, List<Integer>> based on their value modulo 3 using computeIfAbsent.",
        "starterCode": "import java.util.*;\n\npublic class RemainderGrouper {\n    public static Map<Integer, List<Integer>> groupByMod3(int[] nums) {\n        return new HashMap<>();\n    }\n}",
        "solution": "import java.util.*;\n\npublic class RemainderGrouper {\n    public static Map<Integer, List<Integer>> groupByMod3(int[] nums) {\n        Map<Integer, List<Integer>> map = new HashMap<>();\n        for (int x : nums) {\n            int rem = ((x % 3) + 3) % 3;\n            map.computeIfAbsent(rem, k -> new ArrayList<>()).add(x);\n        }\n        return map;\n    }\n}",
        "explanation": "computeIfAbsent initializes the list on first occurrence. ((x % 3) + 3) % 3 normalizes negative numbers."
      },
      {
        "id": "java-103-ex2",
        "title": "Frequency Counter with Map.merge",
        "difficulty": "Intermediate",
        "type": "coding",
        "prompt": "Given a String array, count word frequencies using map.merge(word, 1, Integer::sum).",
        "starterCode": "import java.util.*;\n\npublic class WordFreqCounter {\n    public static Map<String, Integer> countWords(String[] words) {\n        return new HashMap<>();\n    }\n}",
        "solution": "import java.util.*;\n\npublic class WordFreqCounter {\n    public static Map<String, Integer> countWords(String[] words) {\n        Map<String, Integer> freq = new HashMap<>();\n        for (String w : words) {\n            freq.merge(w, 1, Integer::sum);\n        }\n        return freq;\n    }\n}",
        "explanation": "merge() sets 1 if absent, or sums the existing count with 1 if present, concisely replacing getOrDefault."
      },
      {
        "id": "java-103-ex3",
        "title": "K-Way Merge with PriorityQueue",
        "difficulty": "Advanced",
        "type": "coding",
        "prompt": "Merge k sorted integer lists into one sorted list using a PriorityQueue storing array pointers.",
        "starterCode": "import java.util.*;\n\npublic class KWayMerge {\n    public static List<Integer> mergeKLists(List<List<Integer>> lists) {\n        return new ArrayList<>();\n    }\n}",
        "solution": "import java.util.*;\n\npublic class KWayMerge {\n    record Element(int val, int listIdx, int elemIdx) {}\n\n    public static List<Integer> mergeKLists(List<List<Integer>> lists) {\n        PriorityQueue<Element> pq = new PriorityQueue<>(Comparator.comparingInt(Element::val));\n        for (int i = 0; i < lists.size(); i++) {\n            if (!lists.get(i).isEmpty()) {\n                pq.offer(new Element(lists.get(i).get(0), i, 0));\n            }\n        }\n\n        List<Integer> result = new ArrayList<>();\n        while (!pq.isEmpty()) {\n            Element curr = pq.poll();\n            result.add(curr.val());\n\n            int nextElemIdx = curr.elemIdx() + 1;\n            if (nextElemIdx < lists.get(curr.listIdx()).size()) {\n                pq.offer(new Element(lists.get(curr.listIdx()).get(nextElemIdx), curr.listIdx(), nextElemIdx));\n            }\n        }\n\n        return result;\n    }\n}",
        "explanation": "Maintains a min-heap of size K. Extracts minimum and advances the pointer in that specific list, achieving O(N log K) time."
      }
    ],
    "quizQuestions": [
      {
        "id": "java-103-q1",
        "question": "What does `map.computeIfAbsent(key, k -> new ArrayList<>()).add(val)` do if the key already exists in the map?",
        "options": [
          "It replaces the existing list with a new empty list and adds val",
          "It returns the existing list and appends val without creating a new list",
          "It throws DuplicateKeyException",
          "It does nothing"
        ],
        "correctOptionIndex": 1,
        "explanation": "If the key is already associated with a non-null value, computeIfAbsent simply returns that existing value without invoking the mapping function."
      },
      {
        "id": "java-103-q2",
        "question": "How do you instantiate a Max-Heap using `PriorityQueue` in Java?",
        "options": [
          "new PriorityQueue<>(Collections.reverseOrder())",
          "new PriorityQueue<>(Direction.MAX)",
          "new MaxPriorityQueue<>()",
          "new PriorityQueue<>(false)"
        ],
        "correctOptionIndex": 0,
        "explanation": "PriorityQueue defaults to a natural min-heap. Passing Collections.reverseOrder() or a descending comparator configures it as a max-heap."
      }
    ],
    "revisionNotes": [
      "Master modern map idioms: `computeIfAbsent` and `merge`.",
      "Use static 2D direction arrays `{{-1,0},{1,0},{0,-1},{0,1}}` for grid traversals.",
      "Use `PriorityQueue` with custom comparators for Top-K and K-Way merge problems."
    ],
    "moduleId": "java-m8",
    "moduleNumber": 8,
    "moduleTitle": "Java Interview Preparation",
    "language": "java"
  },
  {
    "id": "java-104-lld-exercises",
    "topicNumber": 104,
    "title": "Low-Level System Design (LLD) in Java (Parking Lot, LRU Cache & GoF Patterns)",
    "level": "Advanced",
    "whyItMatters": "Low-Level Design (Machine Coding) rounds test your ability to translate ambiguous business requirements into clean, object-oriented, extensible, and thread-safe class models using GoF Design Patterns.",
    "explanation": "1. Key GoF Design Patterns for LLD:\n- Factory Pattern: Decouples object creation from consumer logic (e.g. VehicleFactory creating Car, Bike, Truck).\n- Strategy Pattern: Encapsulates interchangeable algorithms behind an interface (e.g. ParkingFeeCalculationStrategy: HourlyStrategy vs FlatRateStrategy).\n- Observer Pattern: Implements event notification systems (e.g. StockObserver, OrderStatusListener).\n- Singleton Pattern: Guarantees a class has only one instance (use Enum Singleton for thread-safe, reflection-proof implementation).\n\n2. Classical LLD Archetype: Parking Lot:\n- Entities: ParkingLot, ParkingFloor, ParkingSpot (Compact, Large, Handicapped), Vehicle (Car, Bike, Truck), Ticket, Payment.\n- Extensibility: Adding a new vehicle type or fee calculation formula should require adding a new class without modifying existing classes (Open/Closed Principle).\n\n3. Concurrency in LLD:\n- Multi-threaded environments require thread-safe spot reservation using ReentrantLock, ConcurrentHashMap, or atomic spot counters.",
    "syntaxAndStructure": "// Enum Singleton (Best Practice per Effective Java Item 3):\npublic enum DatabaseConnectionManager {\n    INSTANCE;\n    public void executeQuery(String sql) { /* ... */ }\n}",
    "codeExamples": [
      {
        "title": "Strategy Pattern for Dynamic Fee Calculation",
        "code": "public class StrategyPatternDemo {\n    interface PricingStrategy {\n        double calculateFee(long durationHours);\n    }\n\n    static class HourlyPricingStrategy implements PricingStrategy {\n        private final double ratePerHour;\n        HourlyPricingStrategy(double rate) { this.ratePerHour = rate; }\n        @Override\n        public double calculateFee(long durationHours) {\n            return durationHours * ratePerHour;\n        }\n    }\n\n    static class FlatDailyPricingStrategy implements PricingStrategy {\n        @Override\n        public double calculateFee(long durationHours) {\n            return 25.0; // Flat $25 daily rate\n        }\n    }\n\n    static class ParkingMeter {\n        private PricingStrategy strategy;\n        ParkingMeter(PricingStrategy strategy) { this.strategy = strategy; }\n        public void setStrategy(PricingStrategy strategy) { this.strategy = strategy; }\n        public double getCharge(long hours) { return strategy.calculateFee(hours); }\n    }\n\n    public static void main(String[] args) {\n        ParkingMeter meter = new ParkingMeter(new HourlyPricingStrategy(5.0));\n        System.out.println(\"2 hours @ $5/hr: $\" + meter.getCharge(2));\n\n        meter.setStrategy(new FlatDailyPricingStrategy());\n        System.out.println(\"2 hours with flat daily: $\" + meter.getCharge(2));\n    }\n}",
        "expectedOutput": "2 hours @ $5/hr: $10.0\n2 hours with flat daily: $25.0",
        "explanation": "The Strategy pattern enables swapping fee algorithms at runtime without modifying ParkingMeter code, satisfying the Open/Closed Principle."
      },
      {
        "title": "Thread-Safe Enum Singleton (Effective Java Item 3)",
        "code": "public class EnumSingletonDemo {\n    public enum ConfigurationRegistry {\n        INSTANCE;\n\n        private final java.util.Map<String, String> configs = new java.util.concurrent.ConcurrentHashMap<>();\n\n        public void set(String key, String value) { configs.put(key, value); }\n        public String get(String key) { return configs.get(key); }\n    }\n\n    public static void main(String[] args) {\n        ConfigurationRegistry.INSTANCE.set(\"env\", \"production\");\n        System.out.println(\"Env: \" + ConfigurationRegistry.INSTANCE.get(\"env\"));\n    }\n}",
        "expectedOutput": "Env: production",
        "explanation": "A single-element enum provides thread-safe, lazy-initialized, serialization-safe, and reflection-immune singleton guarantees."
      }
    ],
    "realWorldApplications": [
      "Machine coding rounds at companies like Uber, Swiggy, Flipkart, and Atlassian.",
      "Designing extensible plugin architectures in IDEs and build systems."
    ],
    "commonMistakes": [
      "Writing an anemic procedural model where all classes are just bags of getters/setters with business logic dumped into a giant Manager class.",
      "Ignoring thread safety when multiple users attempt to reserve the same resource simultaneously.",
      "Overengineering simple designs with unnecessary patterns before requirements justify them."
    ],
    "interviewRelevance": "Low-Level Design is a mandatory interview elimination round for SDE-2 and Senior Engineer positions across the tech industry.",
    "checkpoints": [
      {
        "id": "java-104-cp1",
        "label": "Apply Strategy, Factory, Observer, and Singleton patterns to system designs"
      },
      {
        "id": "java-104-cp2",
        "label": "Structure LLD problems with clear entities, interfaces, and separation of concerns"
      },
      {
        "id": "java-104-cp3",
        "label": "Implement thread-safe state mutations using concurrent collections and locks"
      }
    ],
    "practiceExercises": [
      {
        "id": "java-104-ex1",
        "title": "Factory Pattern for Vehicle Creation",
        "difficulty": "Beginner",
        "type": "coding",
        "prompt": "Implement a VehicleFactory that returns Vehicle instances (Car, Bike) based on an enum VehicleType.",
        "starterCode": "public class VehicleFactoryDemo {\n    // Implement factory\n}",
        "solution": "public class VehicleFactoryDemo {\n    public enum VehicleType { CAR, BIKE }\n    public interface Vehicle { void drive(); }\n\n    public static class Car implements Vehicle {\n        public void drive() { System.out.println(\"Driving car\"); }\n    }\n    public static class Bike implements Vehicle {\n        public void drive() { System.out.println(\"Riding bike\"); }\n    }\n\n    public static class VehicleFactory {\n        public static Vehicle createVehicle(VehicleType type) {\n            return switch (type) {\n                case CAR -> new Car();\n                case BIKE -> new Bike();\n            };\n        }\n    }\n}",
        "explanation": "Factory method encapsulates object creation, insulating calling code from concrete vehicle implementations."
      },
      {
        "id": "java-104-ex2",
        "title": "Thread-Safe Parking Spot Reservation",
        "difficulty": "Intermediate",
        "type": "coding",
        "prompt": "Create a ParkingSpot class with assignVehicle() and vacate() methods that are thread-safe against concurrent booking attempts.",
        "starterCode": "public class ParkingSpot {\n    // Implement thread-safe spot\n}",
        "solution": "import java.util.concurrent.atomic.AtomicBoolean;\n\npublic class ParkingSpot {\n    private final int spotId;\n    private final AtomicBoolean isOccupied = new AtomicBoolean(false);\n\n    public ParkingSpot(int id) { this.spotId = id; }\n\n    public boolean assignVehicle() {\n        // Atomic Compare-And-Set from false to true\n        return isOccupied.compareAndSet(false, true);\n    }\n\n    public void vacate() {\n        isOccupied.set(false);\n    }\n\n    public boolean isOccupied() { return isOccupied.get(); }\n}",
        "explanation": "AtomicBoolean.compareAndSet(false, true) ensures that only one concurrent thread succeeds in booking the spot without requiring heavy synchronized locks."
      },
      {
        "id": "java-104-ex3",
        "title": "Observer Pattern for Stock Price Ticker",
        "difficulty": "Advanced",
        "type": "coding",
        "prompt": "Implement an Observable StockTicker that notifies registered StockObserver listeners whenever a stock price changes.",
        "starterCode": "public class StockObserverDemo {\n    // Implement Observer pattern\n}",
        "solution": "import java.util.*;\n\npublic class StockObserverDemo {\n    public interface StockObserver {\n        void onPriceUpdate(String symbol, double price);\n    }\n\n    public static class StockTicker {\n        private final List<StockObserver> observers = new ArrayList<>();\n\n        public void subscribe(StockObserver observer) { observers.add(observer); }\n        public void unsubscribe(StockObserver observer) { observers.remove(observer); }\n\n        public void setPrice(String symbol, double price) {\n            for (StockObserver o : observers) {\n                o.onPriceUpdate(symbol, price);\n            }\n        }\n    }\n}",
        "explanation": "The Subject (StockTicker) maintains a list of Observers and broadcasts price updates without knowing observer implementation details."
      }
    ],
    "quizQuestions": [
      {
        "id": "java-104-q1",
        "question": "Why does Joshua Bloch (Effective Java Item 3) recommend single-element `enum` as the best way to implement a Singleton in Java?",
        "options": [
          "Because enums compile to C++ code",
          "Because enums provide thread-safety, serialization guarantees, and immunity against reflection attacks out-of-the-box without boilerplate code",
          "Because enums use zero memory",
          "Because enums cannot have methods"
        ],
        "correctOptionIndex": 1,
        "explanation": "Enum singletons are guaranteed by the JVM to be instantiated exactly once, cannot be instantiated via reflection constructor cracking, and handle serialization automatically."
      },
      {
        "id": "java-104-q2",
        "question": "Which GoF design pattern defines a family of algorithms, encapsulates each one, and makes them interchangeable at runtime?",
        "options": [
          "Observer Pattern",
          "Strategy Pattern",
          "Decorator Pattern",
          "Adapter Pattern"
        ],
        "correctOptionIndex": 1,
        "explanation": "The Strategy pattern encapsulates interchangeable algorithms (e.g. pricing formulas, route planning) behind a common interface."
      }
    ],
    "revisionNotes": [
      "Use single-element `enum` for thread-safe, reflection-proof singletons.",
      "The Strategy pattern enables swapping algorithms without violating Open/Closed Principle.",
      "Use `AtomicBoolean.compareAndSet()` for lightweight, lock-free resource reservation."
    ],
    "moduleId": "java-m8",
    "moduleNumber": 8,
    "moduleTitle": "Java Interview Preparation",
    "language": "java"
  },
  {
    "id": "java-105-big-o-revision",
    "topicNumber": 105,
    "title": "Big-O Complexity Quick Reference & Memory Calculations",
    "level": "Intermediate",
    "whyItMatters": "Having a rapid, razor-sharp mental reference of time and space complexity across all standard Java collection operations prevents blunders during interview complexity analysis.",
    "explanation": "1. Java Collections Complexity Cheat Sheet:\n- ArrayList:\n  - get(i): O(1)\n  - add(e): O(1) amortized, O(N) when resizing array (copying elements)\n  - add(i, e) / remove(i): O(N) due to array shifting (System.arraycopy)\n- LinkedList:\n  - get(i): O(N) traversal\n  - addFirst(e) / addLast(e): O(1)\n  - remove(e): O(N) to find + O(1) to unlink\n- ArrayDeque:\n  - push / pop / offer / poll: O(1) amortized on circular array\n- HashMap / HashSet:\n  - get / put / contains / remove: O(1) average; O(log N) worst-case (treeified bin)\n- TreeMap / TreeSet:\n  - get / put / contains / first / last: O(log N) guaranteed (Red-Black tree)\n- PriorityQueue:\n  - offer / poll: O(log N)\n  - peek: O(1)\n  - remove(Object): O(N) linear search + O(log N) heapify\n\n2. Memory Footprint Quick Calculations (64-bit JVM with Compressed Oops):\n- Object Header: 12-16 bytes (mark word + compressed klass pointer).\n- Boxed types:\n  - Integer: 24 bytes\n  - Long: 24 bytes\n  - String: 24 bytes header + 16 bytes byte[] header + N bytes\n- Node overhead in LinkedList: 24 bytes object header + 8 bytes prev + 8 bytes next + 8 bytes item = 48 bytes PER ELEMENT!",
    "syntaxAndStructure": "// Complexity Reference Table Summary:\n// Array lookup: O(1) | Binary Search: O(log N) | Sorting: O(N log N)\n// HashMap: O(1) avg / O(log N) worst | TreeMap: O(log N) guaranteed",
    "codeExamples": [
      {
        "title": "Illustrating LinkedList Node Overhead vs ArrayList",
        "code": "public class MemoryCalculationDemo {\n    public static void main(String[] args) {\n        int n = 1_000_000;\n\n        System.out.println(\"Memory footprint for 1,000,000 integers:\");\n        System.out.println(\"1. Primitive int[]: ~4 MB\");\n        System.out.println(\"2. ArrayList<Integer>: ~8 MB references + 24 MB Integer objects = ~32 MB\");\n        System.out.println(\"3. LinkedList<Integer>: ~48 MB Node objects + 24 MB Integer objects = ~72 MB\");\n        System.out.println(\"LinkedList consumes 18x more memory than a primitive array!\");\n    }\n}",
        "expectedOutput": "Memory footprint for 1,000,000 integers:\n1. Primitive int[]: ~4 MB\n2. ArrayList<Integer>: ~8 MB references + 24 MB Integer objects = ~32 MB\n3. LinkedList<Integer>: ~48 MB Node objects + 24 MB Integer objects = ~72 MB\nLinkedList consumes 18x more memory than a primitive array!",
        "explanation": "Shows the concrete memory cost of object headers and pointer dereferencing on modern 64-bit JVMs."
      },
      {
        "title": "Verifying Logarithmic vs Linear Performance with Large N",
        "code": "import java.util.*;\n\npublic class ComplexityVerificationDemo {\n    public static void main(String[] args) {\n        int n = 1_000_000;\n        int[] sorted = new int[n];\n        for (int i = 0; i < n; i++) sorted[i] = i * 2;\n\n        int target = 1_999_998; // Last element\n\n        // O(N) Linear scan\n        long start = System.nanoTime();\n        for (int i = 0; i < n; i++) {\n            if (sorted[i] == target) break;\n        }\n        long linearTime = System.nanoTime() - start;\n\n        // O(log N) Binary search\n        start = System.nanoTime();\n        Arrays.binarySearch(sorted, target);\n        long binaryTime = System.nanoTime() - start;\n\n        System.out.println(\"Linear scan time: \" + linearTime + \" ns\");\n        System.out.println(\"Binary search time: \" + binaryTime + \" ns\");\n    }\n}",
        "expectedOutput": "Linear scan time: 780100 ns\nBinary search time: 3800 ns",
        "explanation": "Binary search checks ~20 elements (log2(1,000,000) ~ 20) compared to 1,000,000 checks in linear search, demonstrating massive algorithmic speedup."
      }
    ],
    "realWorldApplications": [
      "Sizing JVM container heap limits for Kubernetes deployments based on expected concurrent object volume.",
      "Defending architectural choices during system design review meetings."
    ],
    "commonMistakes": [
      "Stating that PriorityQueue.remove(Object) is O(log N): finding the object requires an O(N) linear scan, making it O(N) overall.",
      "Assuming ArrayList never resizes: appending elements is O(1) amortized, but occasionally O(N) when allocating a 1.5x capacity array and copying.",
      "Assuming LinkedList.get(i) is O(1) because elements are linked: random access requires traversing i pointers (O(N))."
    ],
    "interviewRelevance": "Every technical interview requires accurate complexity justification for both time and auxiliary space.",
    "checkpoints": [
      {
        "id": "java-105-cp1",
        "label": "Memorize time complexities for ArrayList, LinkedList, HashMap, and TreeMap"
      },
      {
        "id": "java-105-cp2",
        "label": "Calculate 64-bit JVM object memory footprints including headers and references"
      },
      {
        "id": "java-105-cp3",
        "label": "Distinguish between worst-case and amortized time complexities"
      }
    ],
    "practiceExercises": [
      {
        "id": "java-105-ex1",
        "title": "Analyze PriorityQueue Method Complexities",
        "difficulty": "Beginner",
        "type": "conceptual",
        "prompt": "State the time complexity for: (1) pq.offer(e), (2) pq.peek(), (3) pq.poll(), (4) pq.remove(obj).",
        "solution": "1. pq.offer(e): O(log N) (sift-up heapify).\n2. pq.peek(): O(1) (root element inspection).\n3. pq.poll(): O(log N) (remove root and sift-down).\n4. pq.remove(obj): O(N) (linear scan to find object + O(log N) to sift).",
        "explanation": "Heap operations are logarithmic for insertions and removals at the root, but arbitrary element removal is linear."
      },
      {
        "id": "java-105-ex2",
        "title": "Estimate Primitive vs Boxed Heap Footprint",
        "difficulty": "Intermediate",
        "type": "conceptual",
        "prompt": "Calculate the approximate heap memory consumed by int[100,000] vs Integer[100,000] on a 64-bit JVM.",
        "solution": "- int[100,000]: 16-24 bytes array header + 100,000 * 4 bytes = ~400 KB.\n- Integer[100,000]: Array of references (24 bytes header + 100,000 * 8 bytes = ~800 KB) PLUS 100,000 separate Integer objects (each 24 bytes = 2.4 MB) = ~3.2 MB total (~8x more memory).",
        "explanation": "Boxed arrays store references pointing to heap objects, multiplying space requirements and destroying cache locality."
      },
      {
        "id": "java-105-ex3",
        "title": "Compare TreeMap vs HashMap Search Costs",
        "difficulty": "Advanced",
        "type": "conceptual",
        "prompt": "When would you deliberately choose TreeMap over HashMap despite its slower O(log N) vs O(1) performance?",
        "solution": "Choose TreeMap when you need:\n1. Sorted key order iteration (e.g. range queries via subMap(), tailMap(), headMap()).\n2. Finding nearest keys via ceilingKey(), floorKey(), higherKey(), lowerKey().\n3. Guaranteed worst-case O(log N) latency without hash collision spikes.",
        "explanation": "TreeMap provides sorted navigation and range extraction that hash maps cannot support."
      }
    ],
    "quizQuestions": [
      {
        "id": "java-105-q1",
        "question": "What is the worst-case time complexity of removing an arbitrary object using `PriorityQueue.remove(Object o)` in Java?",
        "options": [
          "O(1)",
          "O(log N)",
          "O(N)",
          "O(N log N)"
        ],
        "correctOptionIndex": 2,
        "explanation": "Finding the target object requires scanning the underlying array linearly (O(N)), followed by sift-up or sift-down (O(log N)), making the total time O(N)."
      },
      {
        "id": "java-105-q2",
        "question": "What is the growth factor of an `ArrayList` when its capacity is exceeded in OpenJDK / HotSpot JVM?",
        "options": [
          "1.5x (oldCapacity + (oldCapacity >> 1))",
          "2.0x (doubles capacity)",
          "Fixed increment of 16",
          "3.0x"
        ],
        "correctOptionIndex": 0,
        "explanation": "ArrayList grows by 50% (1.5x) using the bitwise formula: newCapacity = oldCapacity + (oldCapacity >> 1)."
      }
    ],
    "revisionNotes": [
      "ArrayList amortized append is O(1); arbitrary index insert/delete is O(N).",
      "HashMap operations are O(1) average; treeified worst-case is O(log N).",
      "PriorityQueue poll/offer is O(log N); arbitrary element removal is O(N)."
    ],
    "moduleId": "java-m8",
    "moduleNumber": 8,
    "moduleTitle": "Java Interview Preparation",
    "language": "java"
  },
  {
    "id": "java-106-readiness-assessment",
    "topicNumber": 106,
    "title": "Comprehensive Java Placement Readiness Assessment & Interview Strategy",
    "level": "Advanced",
    "whyItMatters": "Technical knowledge is half the battle; the other half is communication, structured problem breakdown, mock interview endurance, and behavioral alignment. This capstone prepares you for live campus placements and top-tier product company hiring bars.",
    "explanation": "1. The 5-Stage Live Coding Interview Framework:\n- Stage 1: Clarify Requirements (5 mins): Ask about constraints, data ranges, negative numbers, duplicates, and empty/null inputs.\n- Stage 2: Propose Solutions & Analyze Complexity (5-10 mins): Start with the brute-force baseline, then explain the optimized approach (time/space Big-O) BEFORE writing a single line of code. Confirm alignment with the interviewer.\n- Stage 3: Clean Implementation (15-20 mins): Write modular code with descriptive variable names. Speak aloud while typing to explain design decisions.\n- Stage 4: Dry Run & Edge Case Verification (5 mins): Walk through an example trace manually using a comment block. Test edge cases: empty list, single element, negative numbers, max/min values.\n- Stage 5: Follow-Up & Optimization (5 mins): Discuss how to scale if data doesn't fit in memory (external merge sort, distributed hashing).\n\n2. Behavioral Questions (The STAR Method):\n- Situation: \"At my previous project, we faced a high-latency issue with our payment service...\"\n- Task: \"My goal was to reduce API response time below 200ms without introducing caching inconsistencies...\"\n- Action: \"I profiled JVM allocations using VisualVM, identified duplicate database queries, introduced Redis caching with TTL, and refactored synchronous calls to CompletableFuture...\"\n- Result: \"P99 latency dropped by 65% and server throughput doubled under peak load.\"\n\n3. Final Placement Checklist:\n- Java fundamentals: OOP, JVM memory model, pass-by-value, exceptions, collections.\n- Core algorithms: Two pointers, sliding window, binary search, DFS/BFS, backtracking, DP.\n- Concurrency: volatile, AtomicInteger, ReentrantLock, ExecutorService.\n- Enterprise: JDBC, transactions, NIO.2, JUnit 5, Clean Architecture.",
    "syntaxAndStructure": "// The STAR response formula for behavioral questions:\n// S: Situation -> T: Task -> A: Action -> R: Result",
    "codeExamples": [
      {
        "title": "Live Interview Code Structure Template",
        "code": "public class InterviewProblemTemplate {\n    /**\n     * Problem: Find maximum subarray sum (Kadane's Algorithm)\n     * Constraints: 1 <= nums.length <= 10^5, -10^4 <= nums[i] <= 10^4\n     * Time Complexity: O(N) single pass\n     * Space Complexity: O(1) auxiliary space\n     */\n    public static int maxSubArray(int[] nums) {\n        // Defensive input validation\n        if (nums == null || nums.length == 0) {\n            throw new IllegalArgumentException(\"Input array must not be empty\");\n        }\n\n        int maxSoFar = nums[0];\n        int currentMax = nums[0];\n\n        for (int i = 1; i < nums.length; i++) {\n            // Kadane's decision: extend current subarray or start new subarray\n            currentMax = Math.max(nums[i], currentMax + nums[i]);\n            maxSoFar = Math.max(maxSoFar, currentMax);\n        }\n\n        return maxSoFar;\n    }\n\n    public static void main(String[] args) {\n        int[] test1 = {-2, 1, -3, 4, -1, 2, 1, -5, 4};\n        System.out.println(\"Max subarray sum: \" + maxSubArray(test1)); // Expected 6 ([4, -1, 2, 1])\n\n        int[] allNegative = {-5, -2, -8};\n        System.out.println(\"All negative max: \" + maxSubArray(allNegative)); // Expected -2\n    }\n}",
        "expectedOutput": "Max subarray sum: 6\nAll negative max: -2",
        "explanation": "Demonstrates professional interview code structure: comprehensive Javadoc with time/space complexity, input validation, and dry-run verification against standard and edge cases."
      },
      {
        "title": "Asynchronous Aggregation with CompletableFuture in Production",
        "code": "import java.util.concurrent.CompletableFuture;\n\npublic class ProductionInterviewDemo {\n    public static void main(String[] args) throws Exception {\n        // Parallel non-blocking service calls\n        CompletableFuture<String> userFuture = CompletableFuture.supplyAsync(() -> \"User(Alice)\");\n        CompletableFuture<Double> balanceFuture = CompletableFuture.supplyAsync(() -> 1250.50);\n\n        // Combine results\n        CompletableFuture<String> resultFuture = userFuture.thenCombine(\n            balanceFuture,\n            (user, bal) -> user + \" has balance: $\" + bal\n        );\n\n        System.out.println(resultFuture.get());\n    }\n}",
        "expectedOutput": "User(Alice) has balance: $1250.5",
        "explanation": "Using CompletableFuture.thenCombine() demonstrates modern asynchronous backend engineering skills expected in senior placement interviews."
      }
    ],
    "realWorldApplications": [
      "Acing on-campus placements and off-campus product company technical recruitment drives.",
      "Conducting effective code reviews and technical interviews as a senior software engineer."
    ],
    "commonMistakes": [
      "Starting to code immediately without clarifying requirements or constraints with the interviewer.",
      "Staying silent for minutes at a time instead of thinking aloud and explaining trade-offs.",
      "Failing to test edge cases manually before declaring \"I'm done!\"."
    ],
    "interviewRelevance": "This capstone synthesizes all 106 topics into a cohesive, high-impact interview execution strategy.",
    "checkpoints": [
      {
        "id": "java-106-cp1",
        "label": "Follow the 5-stage live coding interview communication framework"
      },
      {
        "id": "java-106-cp2",
        "label": "Structure behavioral answers using the STAR method with quantified results"
      },
      {
        "id": "java-106-cp3",
        "label": "Review the comprehensive 106-topic Java curriculum readiness checklist"
      }
    ],
    "practiceExercises": [
      {
        "id": "java-106-ex1",
        "title": "Prepare STAR Response for Conflict Resolution",
        "difficulty": "Beginner",
        "type": "conceptual",
        "prompt": "Draft a STAR-method answer for: \"Tell me about a time you had a technical disagreement with a teammate.\"",
        "solution": "Situation: During our microservice migration, a teammate wanted to use synchronous REST while I proposed asynchronous Kafka events.\nTask: We needed to agree on an architecture without delaying the project sprint.\nAction: I created a proof-of-concept benchmarking both under 5,000 req/sec load. We reviewed the latency graphs together objectively.\nResult: The data showed Kafka eliminated cascading timeouts. We adopted Kafka and deployed on schedule with zero outages.",
        "explanation": "STAR answers should emphasize objective data, collaboration, and constructive resolution over personal conflict."
      },
      {
        "id": "java-106-ex2",
        "title": "Dry Run and Edge Case Check",
        "difficulty": "Intermediate",
        "type": "conceptual",
        "prompt": "List 5 essential edge cases you should always verify when solving array and string interview problems.",
        "solution": "1. Empty input (length == 0) and null input.\n2. Single element array/string (N == 1).\n3. Array with all identical elements (e.g. [5, 5, 5]).\n4. Array containing extreme values (negative numbers, Integer.MIN_VALUE, Integer.MAX_VALUE).\n5. Already sorted or reverse-sorted input.",
        "explanation": "Systematically testing these 5 cases catches off-by-one errors and integer overflows before the interviewer points them out."
      },
      {
        "id": "java-106-ex3",
        "title": "Explain Scale-Up Strategy for Large Data",
        "difficulty": "Advanced",
        "type": "conceptual",
        "prompt": "How would you solve finding the median of 100 billion integers when the data cannot fit in JVM RAM?",
        "solution": "1. External Merge Sort: Chunk data into RAM-sized segments, sort each segment in memory, write to disk, and perform K-Way merge using PriorityQueue.\n2. Binary Search on Answer / Integer Bit Bucket Counting: Because integers have 32 bits, maintain an array of 2^16 (65,536) bucket counters on the upper 16 bits. Stream through all numbers to find which bucket contains the 50 billionth element, then repeat for the lower 16 bits of that bucket in RAM.",
        "explanation": "Demonstrating external sorting or bitwise bucket partitioning proves distributed computing readiness."
      }
    ],
    "quizQuestions": [
      {
        "id": "java-106-q1",
        "question": "What is the first step you should ALWAYS perform in a technical coding interview before writing code?",
        "options": [
          "Declare all variables and imports",
          "Clarify the problem requirements, constraints, input bounds, and edge cases with the interviewer",
          "Immediately type the brute-force solution",
          "Ask the interviewer what the optimal algorithm is"
        ],
        "correctOptionIndex": 1,
        "explanation": "Clarifying requirements prevents solving the wrong problem and demonstrates thoughtful engineering discipline."
      },
      {
        "id": "java-106-q2",
        "question": "In the STAR behavioral interview framework, what does the \"R\" stand for?",
        "options": [
          "Refactoring",
          "Result (quantified outcome of your actions)",
          "Review",
          "Recursion"
        ],
        "correctOptionIndex": 1,
        "explanation": "R stands for Result: the tangible, ideally quantified impact of your actions (e.g. reduced latency by 30%, increased test coverage to 85%)."
      }
    ],
    "revisionNotes": [
      "Follow the 5-stage interview framework: Clarify -> Propose -> Code -> Dry Run -> Follow-Up.",
      "Use the STAR method (Situation, Task, Action, Result) for all behavioral questions.",
      "You have mastered all 106 topics of the AK67 Java Placement Curriculum!"
    ],
    "moduleId": "java-m8",
    "moduleNumber": 8,
    "moduleTitle": "Java Interview Preparation",
    "language": "java"
  }
];

export const module8: MasteryModule = {
  "id": "java-m8",
  "number": 8,
  "title": "Java Interview Preparation",
  "description": "Comprehensive capstone interview preparation: Core JVM & memory review, output prediction puzzles, equals/hashCode & String comparison traps, collections rapid-fire trade-offs, OOP design scenarios & diamond default methods, multithreading & deadlock prevention, JVM garbage collection & memory leak diagnosis, top coding patterns, low-level design exercises, Big-O reference cheat sheet, and complete placement readiness strategy.",
  "language": "java",
  "topics": [
    {
      "id": "java-96-interview-fundamentals",
      "topicNumber": 96,
      "title": "Java Core Interview Concepts & JVM Internals Revision",
      "level": "Intermediate",
      "whyItMatters": "Interviewers test foundational principles to distinguish engineers who truly understand how the JVM executes bytecode from those who simply memorize syntax. Revisiting Stack vs Heap, pass-by-value mechanics, String interning, and ClassLoaders is essential before walking into any technical screen.",
      "explanation": "1. Java Memory Architecture in Brief:\n- Stack Memory: Allocated per-thread. Stores primitive local variables and reference pointers pointing to objects in the heap. Allocation and deallocation are instantaneous as stack frames push and pop.\n- Heap Memory: Shared across all threads. Stores all object instances and arrays. Managed automatically by the Garbage Collector.\n- Metaspace: Native OS memory (replaced PermGen in Java 8) storing loaded class metadata, method bytecode, annotations, and constant pool.\n\n2. The Pass-by-Value Invariant:\n- Java is STRICTLY 100% PASS-BY-VALUE, ALWAYS!\n- When passing a primitive, a copy of the primitive value (e.g. 42) is passed.\n- When passing an object, a COPY OF THE REFERENCE POINTER is passed by value.\n- Reassigning the parameter reference (obj = new Object()) inside the method has ZERO effect on the caller's original reference.\n- However, modifying the object via its reference (obj.setName(\"new\")) mutates the shared underlying heap object.\n\n3. String Pool & Interning:\n- String literals are automatically interned into the JVM String Constant Pool.\n- String a = \"abc\"; and String b = \"abc\"; share the exact same heap memory address (a == b is true).\n- String c = new String(\"abc\"); allocates an explicit new object outside the pool (a == c is false; a.equals(c) is true; a == c.intern() is true).",
      "syntaxAndStructure": "// Pass-by-value proof in Java:\nvoid swap(Point a, Point b) {\n    Point temp = a;\n    a = b; // Reassigning local copy has no effect on caller\n    b = temp;\n}",
      "codeExamples": [
        {
          "title": "Pass-by-Value Proof with Object References",
          "code": "public class PassByValueProof {\n    static class Person {\n        String name;\n        Person(String name) { this.name = name; }\n    }\n\n    public static void tryReassign(Person p) {\n        p = new Person(\"Reassigned\"); // Only modifies the local copy of the pointer\n    }\n\n    public static void modifyState(Person p) {\n        p.name = \"Mutated\"; // Modifies the shared object in the heap\n    }\n\n    public static void main(String[] args) {\n        Person person = new Person(\"Original\");\n\n        tryReassign(person);\n        System.out.println(\"After tryReassign: \" + person.name);\n\n        modifyState(person);\n        System.out.println(\"After modifyState: \" + person.name);\n    }\n}",
          "expectedOutput": "After tryReassign: Original\nAfter modifyState: Mutated",
          "explanation": "tryReassign reassigns its local copy of the pointer p, leaving the caller's person pointing to \"Original\". modifyState dereferences the pointer to change the object's internal field."
        },
        {
          "title": "String Pool vs Heap Allocation and .intern()",
          "code": "public class StringPoolDemo {\n    public static void main(String[] args) {\n        String s1 = \"Java\";\n        String s2 = \"Java\";\n        String s3 = new String(\"Java\");\n\n        System.out.println(\"s1 == s2 (pool): \" + (s1 == s2));\n        System.out.println(\"s1 == s3 (heap): \" + (s1 == s3));\n        System.out.println(\"s1.equals(s3): \" + s1.equals(s3));\n        System.out.println(\"s1 == s3.intern(): \" + (s1 == s3.intern()));\n    }\n}",
          "expectedOutput": "s1 == s2 (pool): true\ns1 == s3 (heap): false\ns1.equals(s3): true\ns1 == s3.intern(): true",
          "explanation": "s1 and s2 reference the same interned String in the constant pool. s3 creates a new heap object. Calling s3.intern() returns the canonical instance from the pool."
        }
      ],
      "realWorldApplications": [
        "Tuning JVM -Xms (initial heap) and -Xmx (max heap) to prevent OutOfMemoryError in microservice containers.",
        "Auditing memory leak issues where static collections unintentionally retain heap object references forever."
      ],
      "commonMistakes": [
        "Claiming that Java passes objects \"by reference\": it passes copies of reference pointers by value.",
        "Comparing strings with == instead of .equals(), introducing insidious bugs when strings come from user input or network streams.",
        "Assuming that System.gc() guarantees an immediate garbage collection sweep: it is merely a non-binding suggestion to the JVM."
      ],
      "interviewRelevance": "Pass-by-value vs pass-by-reference and String pool mechanics are the two most frequently tested warmup questions in Java technical interviews worldwide.",
      "checkpoints": [
        {
          "id": "java-96-cp1",
          "label": "Prove Java is strictly pass-by-value using reference reassignment vs state mutation"
        },
        {
          "id": "java-96-cp2",
          "label": "Explain String Constant Pool, new String() vs string literal, and .intern()"
        },
        {
          "id": "java-96-cp3",
          "label": "Distinguish between Stack, Heap, and Metaspace memory allocations"
        }
      ],
      "practiceExercises": [
        {
          "id": "java-96-ex1",
          "title": "Explain Primitive vs Reference Pass-by-Value",
          "difficulty": "Beginner",
          "type": "conceptual",
          "prompt": "What is printed by: int x = 10; update(x); System.out.println(x); void update(int a) { a = 50; }?",
          "solution": "It prints 10. The primitive value 10 is copied into the method parameter `a`. Modifying `a` to 50 has no effect on the original variable `x`.",
          "explanation": "Primitives in Java are passed strictly by value; changing the parameter inside the method changes only the local stack variable."
        },
        {
          "id": "java-96-ex2",
          "title": "Predict Identity vs Equality Outcomes",
          "difficulty": "Intermediate",
          "type": "output_prediction",
          "prompt": "Given Integer a = 127, b = 127, c = 128, d = 128; what are the results of (a == b) and (c == d)? Explain why.",
          "solution": "a == b evaluates to true; c == d evaluates to false.\nExplanation: The JVM caches Integer objects for values in the range [-128..127] via the IntegerCache. Thus autoboxing 127 returns the cached identical reference, whereas autoboxing 128 instantiates new separate heap objects.",
          "explanation": "The IntegerCache guarantees reference identity for byte-range values, demonstrating why objects must always be compared with .equals()."
        },
        {
          "id": "java-96-ex3",
          "title": "Simulate Pass-by-Value Immutable Swap",
          "difficulty": "Advanced",
          "type": "coding",
          "prompt": "Write a generic Container<T> holder class that allows swapping two values across method boundaries without mutating the underlying objects.",
          "starterCode": "public class SwapHelper {\n    public static class Holder<T> {\n        public T value;\n        public Holder(T val) { this.value = val; }\n    }\n\n    public static <T> void swap(Holder<T> h1, Holder<T> h2) {\n        // Swap values\n    }\n}",
          "solution": "public class SwapHelper {\n    public static class Holder<T> {\n        public T value;\n        public Holder(T val) { this.value = val; }\n    }\n\n    public static <T> void swap(Holder<T> h1, Holder<T> h2) {\n        T temp = h1.value;\n        h1.value = h2.value;\n        h2.value = temp;\n    }\n}",
          "explanation": "Because Java cannot reassign caller pointers, wrapping objects in a mutable Holder allows swapping the internal values referenced by the pointers."
        }
      ],
      "quizQuestions": [
        {
          "id": "java-96-q1",
          "question": "Does Java pass objects by reference or by value?",
          "options": [
            "By reference for all objects and by value for primitives",
            "Strictly by value for both primitives and objects (object reference pointers are copied by value)",
            "By reference when using the synchronized keyword",
            "By reference for Collections and by value for Arrays"
          ],
          "correctOptionIndex": 1,
          "explanation": "Java is strictly 100% pass-by-value. When an object is passed, a copy of the pointer address is passed by value."
        },
        {
          "id": "java-96-q2",
          "question": "Where are loaded class structures, method bytecode, and static variables stored in Java 8 and newer?",
          "options": [
            "Permanent Generation (PermGen)",
            "Metaspace (Native OS Memory)",
            "Thread Stack Memory",
            "CPU L1 Cache"
          ],
          "correctOptionIndex": 1,
          "explanation": "In Java 8, PermGen was completely removed and replaced by Metaspace, which allocates class metadata in off-heap native memory."
        }
      ],
      "revisionNotes": [
        "Java is strictly pass-by-value: object references are copied by value.",
        "String literals are interned in the String Constant Pool; always compare strings with `.equals()`.",
        "Metaspace replaced PermGen in Java 8 and resides in native memory."
      ],
      "moduleId": "java-m8",
      "moduleNumber": 8,
      "moduleTitle": "Java Interview Preparation",
      "language": "java"
    },
    {
      "id": "java-97-predict-output",
      "topicNumber": 97,
      "title": "Output Prediction, Initialization Order & Tricky Corner Cases",
      "level": "Intermediate",
      "whyItMatters": "Predict-the-output questions test edge-case mastery: static vs instance initializer execution order, constructor chaining, finally block return semantics, and method overloading resolution with null arguments.",
      "explanation": "1. Class & Instance Initialization Order:\nWhen a class is instantiated for the first time:\n  1. Parent static blocks and static variable initializers (in order of declaration, once per class).\n  2. Child static blocks and static variable initializers (in order of declaration, once per class).\n  3. Parent instance initializers and instance fields.\n  4. Parent constructor.\n  5. Child instance initializers and instance fields.\n  6. Child constructor.\n\n2. Overloading with null Argument:\n- Given: void test(Object o) and void test(String s).\n- When calling test(null): The compiler selects the MOST SPECIFIC method. Since String is a subtype of Object, test(String) is invoked!\n- If two sibling types exist (e.g. String and Integer), calling test(null) causes a compile-time ambiguous method error.\n\n3. The finally Block Execution Invariant:\n- The finally block ALWAYS executes, even if try or catch returns a value or throws an exception!\n- Exception to the rule: System.exit(0) or JVM crash (SIGKILL/hardware failure) terminates the JVM before finally executes.\n- Pitfall: If finally contains a return statement, it overrides any return value or exception from the try block!",
      "syntaxAndStructure": "// Static vs instance initialization order:\nclass Demo {\n    static { System.out.println(\"1. Static\"); }\n    { System.out.println(\"2. Instance\"); }\n    Demo() { System.out.println(\"3. Constructor\"); }\n}",
      "codeExamples": [
        {
          "title": "Static vs Instance Initialization Execution Order",
          "code": "public class InitOrderDemo {\n    static class Parent {\n        static { System.out.println(\"Parent static block\"); }\n        { System.out.println(\"Parent instance block\"); }\n        Parent() { System.out.println(\"Parent constructor\"); }\n    }\n\n    static class Child extends Parent {\n        static { System.out.println(\"Child static block\"); }\n        { System.out.println(\"Child instance block\"); }\n        Child() { System.out.println(\"Child constructor\"); }\n    }\n\n    public static void main(String[] args) {\n        System.out.println(\"-- Instantiating Child --\");\n        new Child();\n    }\n}",
          "expectedOutput": "Parent static block\nChild static block\n-- Instantiating Child --\nParent instance block\nParent constructor\nChild instance block\nChild constructor",
          "explanation": "Static blocks run first upon class loading (Parent static then Child static). Then instance initialization proceeds top-down from Parent instance/constructor to Child instance/constructor."
        },
        {
          "title": "Finally Block Return Semantics and Value Overriding",
          "code": "public class FinallyReturnDemo {\n    public static int testFinally() {\n        try {\n            return 10;\n        } finally {\n            return 20; // OVERRIDES the try block return!\n        }\n    }\n\n    public static int testMutation() {\n        int x = 10;\n        try {\n            return x; // Evaluates return value (10) here\n        } finally {\n            x = 20;   // Mutating primitive variable does NOT change returned value\n        }\n    }\n\n    public static void main(String[] args) {\n        System.out.println(\"testFinally returns: \" + testFinally());\n        System.out.println(\"testMutation returns: \" + testMutation());\n    }\n}",
          "expectedOutput": "testFinally returns: 20\ntestMutation returns: 10",
          "explanation": "A return inside finally overrides any earlier return. In testMutation, the return value 10 is copied to the stack before finally executes, so x = 20 does not alter the returned integer."
        }
      ],
      "realWorldApplications": [
        "Understanding framework startup sequences in Spring Boot where @PostConstruct and bean initialization orders matter.",
        "Writing robust resource cleanup code that avoids corrupting return values inside finally blocks."
      ],
      "commonMistakes": [
        "Putting a return statement inside a finally block, which swallows unhandled exceptions thrown in the try block.",
        "Expecting static initializers to run every time an object is instantiated: static blocks run only once when the class is loaded.",
        "Relying on post-increment inside expressions like i = i++, which results in no change to i in Java."
      ],
      "interviewRelevance": "Predict-the-output questions are standard in online assessments (OA) and technical screening rounds to filter candidates who understand JVM execution nuances.",
      "checkpoints": [
        {
          "id": "java-97-cp1",
          "label": "Trace class and instance initialization order across inheritance hierarchies"
        },
        {
          "id": "java-97-cp2",
          "label": "Explain method overloading resolution with null arguments (most specific type)"
        },
        {
          "id": "java-97-cp3",
          "label": "Understand finally block execution guarantees and the anti-pattern of return in finally"
        }
      ],
      "practiceExercises": [
        {
          "id": "java-97-ex1",
          "title": "Predict Overloading with Null",
          "difficulty": "Beginner",
          "type": "output_prediction",
          "prompt": "What happens when calling test(null) with: void test(Object o) { System.out.println(\"Obj\"); } and void test(String s) { System.out.println(\"Str\"); }?",
          "solution": "It prints \"Str\". The Java compiler selects the most specific applicable method. Because String is more specific than Object, test(String) is chosen.",
          "explanation": "Subtypes are strictly more specific than supertypes. If ambiguous sibling types are present, the code fails compilation."
        },
        {
          "id": "java-97-ex2",
          "title": "Evaluate Post-Increment Puzzle",
          "difficulty": "Intermediate",
          "type": "output_prediction",
          "prompt": "What is the final value of x after: int x = 5; x = x++; System.out.println(x);?",
          "solution": "The output is 5.\nExplanation: The post-increment operator x++ evaluates to the current value of x (5), then increments x to 6, and finally assigns the evaluated value (5) back to x, overwriting the increment.",
          "explanation": "In Java, the right-hand side is fully evaluated before assignment. The original 5 is stored in a temporary stack slot and assigned back to x."
        },
        {
          "id": "java-97-ex3",
          "title": "Constructor Calling Overridden Method Pitfall",
          "difficulty": "Advanced",
          "type": "output_prediction",
          "prompt": "What happens when Parent constructor calls an overridden method print(), and Child overrides print() referencing its uninitialized field int x = 42;?",
          "starterCode": "class Parent {\n    Parent() { print(); }\n    void print() { System.out.println(\"Parent\"); }\n}\nclass Child extends Parent {\n    int x = 42;\n    void print() { System.out.println(\"Child x=\" + x); }\n}\n// What does new Child() print?",
          "solution": "Output: \"Child x=0\"\nExplanation: During new Child(), the Parent constructor runs before Child instance variable initializers (x = 42). Dynamic method dispatch invokes Child.print(), but x has only been allocated its default value (0).",
          "explanation": "Never invoke overridable methods inside constructors, as the subclass has not yet been initialized when the superclass constructor executes."
        }
      ],
      "quizQuestions": [
        {
          "id": "java-97-q1",
          "question": "Under what condition will code inside a `finally` block NOT execute in Java?",
          "options": [
            "When an OutOfMemoryError is thrown",
            "When `System.exit(0)` is invoked in the try block or an OS-level process kill occurs",
            "When the try block contains an infinite while loop",
            "When the catch block re-throws an unhandled exception"
          ],
          "correctOptionIndex": 1,
          "explanation": "System.exit(0) immediately terminates the Java Virtual Machine process, bypassing all remaining code including finally blocks."
        },
        {
          "id": "java-97-q2",
          "question": "In what order do initializers execute during object instantiation in Java?",
          "options": [
            "Child static -> Parent static -> Child constructor -> Parent constructor",
            "Parent static -> Child static -> Parent instance & constructor -> Child instance & constructor",
            "Parent constructor -> Parent static -> Child constructor -> Child static",
            "All constructors run before any static initializers"
          ],
          "correctOptionIndex": 1,
          "explanation": "Static initializers run upon class loading from Parent to Child. Instance initializers and constructors run top-down from Parent to Child."
        }
      ],
      "revisionNotes": [
        "Static blocks run once per class upon class loading; instance blocks run before constructors.",
        "Overloading with `null` selects the most specific subtype method.",
        "Never put a `return` statement inside a `finally` block; it overrides return values and swallows exceptions."
      ],
      "moduleId": "java-m8",
      "moduleNumber": 8,
      "moduleTitle": "Java Interview Preparation",
      "language": "java"
    },
    {
      "id": "java-98-string-comparisons",
      "topicNumber": 98,
      "title": "String, StringBuilder & Object Comparison Pitfalls",
      "level": "Beginner",
      "whyItMatters": "String is the most widely used class in Java. Understanding string immutability, compact strings (byte[] in Java 9+), StringBuilder vs StringBuffer, and the equals/hashCode contract is essential for writing bug-free code.",
      "explanation": "1. Immutability of java.lang.String:\n- In Java, String objects are strictly immutable: once created, their internal content cannot be modified.\n- Why? Security (network connections and database URLs are strings), Thread Safety (immutable objects are inherently thread-safe without synchronization), and Caching (hash codes can be precomputed and cached; String pool).\n- Compact Strings (Java 9+): Strings are stored internally as byte[] with a 1-byte coder flag (LATIN1: 1 byte/char vs UTF16: 2 bytes/char), cutting memory usage by 50% for Western alphabets.\n\n2. StringBuilder vs StringBuffer:\n- StringBuilder: Introduced in Java 5. Mutable character buffer. NOT synchronized (not thread-safe), but fast and optimal for single-threaded string concatenation.\n- StringBuffer: Legacy (Java 1.0). Synchronized on every method call, adding lock overhead. Rarely needed in modern code.\n\n3. The equals() and hashCode() Contract:\n- If a.equals(b) is true, then a.hashCode() MUST EQUAL b.hashCode().\n- If a.hashCode() == b.hashCode(), a.equals(b) IS NOT GUARANTEED to be true (hash collision).\n- Violating this contract breaks HashMap and HashSet, causing duplicate entries and missing keys.",
      "syntaxAndStructure": "// Proper string concatenation in loops using StringBuilder:\nStringBuilder sb = new StringBuilder(estimatedCapacity);\nfor (String item : items) {\n    sb.append(item).append(\", \");\n}\nString result = sb.toString();",
      "codeExamples": [
        {
          "title": "String Concatenation: O(N^2) Loop vs O(N) StringBuilder",
          "code": "public class StringBuilderBenchmark {\n    public static void main(String[] args) {\n        int count = 10_000;\n\n        // Inefficient: String + creates 10,000 new String objects\n        long start = System.currentTimeMillis();\n        String s = \"\";\n        for (int i = 0; i < count; i++) {\n            s += \"a\";\n        }\n        long stringTime = System.currentTimeMillis() - start;\n\n        // Efficient: StringBuilder appends in-place\n        start = System.currentTimeMillis();\n        StringBuilder sb = new StringBuilder(count);\n        for (int i = 0; i < count; i++) {\n            sb.append(\"a\");\n        }\n        String result = sb.toString();\n        long sbTime = System.currentTimeMillis() - start;\n\n        System.out.println(\"String loop time: \" + stringTime + \" ms\");\n        System.out.println(\"StringBuilder time: \" + sbTime + \" ms\");\n        System.out.println(\"StringBuilder is orders of magnitude faster!\");\n    }\n}",
          "expectedOutput": "String loop time: 58 ms\nStringBuilder time: 1 ms\nStringBuilder is orders of magnitude faster!",
          "explanation": "String concatenation in a loop generates O(N) temporary string copies, yielding O(N^2) complexity. StringBuilder resizes its internal char/byte buffer dynamically, achieving O(N) linear time."
        },
        {
          "title": "Consequences of Violating equals() and hashCode() Contract",
          "code": "import java.util.*;\n\npublic class HashCodeContractDemo {\n    static class BadKey {\n        int id;\n        BadKey(int id) { this.id = id; }\n\n        @Override\n        public boolean equals(Object o) {\n            if (this == o) return true;\n            if (!(o instanceof BadKey badKey)) return false;\n            return this.id == badKey.id;\n        }\n\n        // Fails to override hashCode()! Inherits Object.hashCode() based on memory address\n    }\n\n    public static void main(String[] args) {\n        Map<BadKey, String> map = new HashMap<>();\n        map.put(new BadKey(101), \"Alpha\");\n\n        // Lookup with logically equal key\n        String found = map.get(new BadKey(101));\n        System.out.println(\"Found with equal key: \" + found);\n    }\n}",
          "expectedOutput": "Found with equal key: null",
          "explanation": "Because hashCode() was not overridden, the two BadKey(101) instances generate different hash codes, placing them in different buckets. The HashMap cannot find the entry despite equals() returning true!"
        }
      ],
      "realWorldApplications": [
        "Building SQL queries or JSON payloads dynamically using StringBuilder instead of String concatenation.",
        "Using composite keys in Redis and Guava caches where equals() and hashCode() must be perfectly aligned."
      ],
      "commonMistakes": [
        "Overriding equals() without overriding hashCode(), breaking HashMap lookups.",
        "Using StringBuffer instead of StringBuilder in single-threaded methods, paying unnecessary synchronization lock penalties.",
        "Mutating an object after inserting it as a key in a HashMap: altering fields used in hashCode() orphans the entry in the map."
      ],
      "interviewRelevance": "The equals() and hashCode() contract is one of the most widely asked questions in Java interviews across all seniority levels.",
      "checkpoints": [
        {
          "id": "java-98-cp1",
          "label": "Explain why String is immutable and how Compact Strings save memory in Java 9+"
        },
        {
          "id": "java-98-cp2",
          "label": "Distinguish between String, StringBuilder (fast, unsynchronized), and StringBuffer"
        },
        {
          "id": "java-98-cp3",
          "label": "Implement proper equals() and hashCode() contracts using Objects.hash()"
        }
      ],
      "practiceExercises": [
        {
          "id": "java-98-ex1",
          "title": "Compare Identity vs Equality",
          "difficulty": "Beginner",
          "type": "output_prediction",
          "prompt": "What is printed by: String s1 = \"hello\"; String s2 = new String(\"hello\"); System.out.println(s1 == s2); System.out.println(s1.equals(s2));?",
          "solution": "Output:\nfalse\ntrue\nExplanation: == tests reference identity (s1 is in the String constant pool, s2 is a separate heap instance). .equals() compares the actual character contents.",
          "explanation": "Always use .equals() for value equality and == for checking if two references point to the exact same memory address."
        },
        {
          "id": "java-98-ex2",
          "title": "Implement Valid equals() and hashCode()",
          "difficulty": "Intermediate",
          "type": "coding",
          "prompt": "Write a class Point2D with int x, y fields that properly implements equals() and hashCode() satisfying the contract.",
          "starterCode": "public class Point2D {\n    private final int x, y;\n    public Point2D(int x, int y) { this.x = x; this.y = y; }\n    // Implement equals and hashCode\n}",
          "solution": "import java.util.Objects;\n\npublic class Point2D {\n    private final int x, y;\n    public Point2D(int x, int y) { this.x = x; this.y = y; }\n\n    @Override\n    public boolean equals(Object o) {\n        if (this == o) return true;\n        if (!(o instanceof Point2D point)) return false;\n        return this.x == point.x && this.y == point.y;\n    }\n\n    @Override\n    public int hashCode() {\n        return Objects.hash(x, y);\n    }\n}",
          "explanation": "Pattern matching for instanceof casts cleanly. Objects.hash(x, y) computes a consistent hash code matching the equals criteria."
        },
        {
          "id": "java-98-ex3",
          "title": "Demonstrate HashMap Mutation Orphan Bug",
          "difficulty": "Advanced",
          "type": "coding",
          "prompt": "Write a test class demonstrating that mutating a mutable key in a HashMap causes map.containsKey(key) to return false.",
          "starterCode": "import java.util.*;\n\npublic class MutableKeyDemo {\n    // Demonstrate orphan bug\n}",
          "solution": "import java.util.*;\n\npublic class MutableKeyDemo {\n    static class MutableKey {\n        int id;\n        MutableKey(int id) { this.id = id; }\n        @Override\n        public boolean equals(Object o) {\n            return o instanceof MutableKey m && this.id == m.id;\n        }\n        @Override\n        public int hashCode() { return Objects.hash(id); }\n    }\n\n    public static void main(String[] args) {\n        Map<MutableKey, String> map = new HashMap<>();\n        MutableKey key = new MutableKey(1);\n        map.put(key, \"Value\");\n\n        // Mutate key after insertion\n        key.id = 2;\n\n        System.out.println(\"Contains key after mutation: \" + map.containsKey(key)); // false!\n    }\n}",
          "explanation": "Changing key.id alters its hashCode(). When map.containsKey(key) searches the bucket corresponding to the new hash, it checks the wrong bucket and fails to find the entry."
        }
      ],
      "quizQuestions": [
        {
          "id": "java-98-q1",
          "question": "What is the required contract relationship between `equals()` and `hashCode()` in Java?",
          "options": [
            "If two objects have the same hashCode(), they must be equal according to equals()",
            "If two objects are equal according to equals(), they must produce the identical hashCode()",
            "hashCode() must always return a prime number",
            "Objects can only implement equals() if they implement Comparable"
          ],
          "correctOptionIndex": 1,
          "explanation": "The contract specifies: if a.equals(b) is true, then a.hashCode() == b.hashCode() must be true. The converse is not required due to hash collisions."
        },
        {
          "id": "java-98-q2",
          "question": "Why was `StringBuilder` introduced in Java 5 when `StringBuffer` already existed?",
          "options": [
            "Because StringBuffer could not handle Unicode characters",
            "Because StringBuffer is synchronized on every method call, imposing thread locking overhead; StringBuilder provides a faster, unsynchronized alternative for single-threaded use",
            "Because StringBuilder stores characters in native OS memory",
            "Because StringBuffer was deprecated"
          ],
          "correctOptionIndex": 1,
          "explanation": "StringBuffer incurs synchronization overhead on every append() call. StringBuilder provides identical functionality without synchronization for higher throughput."
        }
      ],
      "revisionNotes": [
        "String is immutable and backed by byte[] (Compact Strings in Java 9+).",
        "Use `StringBuilder` for loop concatenation to avoid O(N^2) string allocations.",
        "Always override `hashCode()` whenever you override `equals()`."
      ],
      "moduleId": "java-m8",
      "moduleNumber": 8,
      "moduleTitle": "Java Interview Preparation",
      "language": "java"
    },
    {
      "id": "java-99-collections-interview",
      "topicNumber": 99,
      "title": "Collections Framework Rapid-Fire & Trade-offs",
      "level": "Intermediate",
      "whyItMatters": "Collections questions assess whether you can pick the optimal data structure for a given access pattern. Understanding internal resizings, treeification thresholds, fail-fast vs fail-safe iterators, and concurrency trade-offs is essential for passing technical rounds.",
      "explanation": "1. Core Collection Trade-offs:\n- ArrayList vs LinkedList: ArrayList is backed by an array, providing O(1) random access and cache locality. LinkedList has pointer overhead (24 bytes per node) and terrible cache performance. In practice, ArrayList beats LinkedList even for insertions unless inserting strictly at the head (where ArrayDeque is superior).\n- ArrayDeque vs Stack: ArrayDeque is faster than Stack (no synchronized overhead) and faster than LinkedList when used as a Queue or Stack.\n\n2. HashMap Internal Architecture:\n- Default capacity: 16 buckets; load factor: 0.75 (resizes at 12 elements to 32 buckets).\n- Index formula: index = (n - 1) & hash (bitwise AND with power of 2).\n- Treeification: When a single bucket exceeds 8 entries AND the table capacity is >= 64, the linked bin is converted to a Red-Black tree (TreeNode), improving worst-case search from O(N) to O(log N).\n\n3. Fail-Fast vs Fail-Safe Iterators:\n- Fail-Fast (ArrayList, HashMap): Uses internal modCount. If the collection is structurally modified during iteration by any means other than the iterator's own remove() method, it throws ConcurrentModificationException immediately.\n- Fail-Safe / Weakly Consistent (ConcurrentHashMap, CopyOnWriteArrayList): Operates on a clone or snapshot; never throws ConcurrentModificationException.",
      "syntaxAndStructure": "// Safe element removal during iteration using Iterator:\nIterator<String> it = list.iterator();\nwhile (it.hasNext()) {\n    if (it.next().startsWith(\"X\")) {\n        it.remove(); // SAFE: updates modCount correctly\n    }\n}",
      "codeExamples": [
        {
          "title": "ConcurrentModificationException vs Iterator.remove()",
          "code": "import java.util.*;\n\npublic class FailFastDemo {\n    public static void main(String[] args) {\n        List<String> list = new ArrayList<>(List.of(\"A\", \"B\", \"C\", \"D\"));\n\n        // Safe removal using Iterator.remove()\n        Iterator<String> it = list.iterator();\n        while (it.hasNext()) {\n            String val = it.next();\n            if (val.equals(\"B\")) {\n                it.remove(); // Properly updates expectedModCount\n            }\n        }\n        System.out.println(\"After safe removal: \" + list);\n\n        // Demonstrating fail-fast behavior\n        try {\n            for (String s : list) {\n                if (s.equals(\"C\")) {\n                    list.remove(s); // Modifies collection directly -> CME!\n                }\n            }\n        } catch (ConcurrentModificationException e) {\n            System.out.println(\"Caught expected ConcurrentModificationException!\");\n        }\n    }\n}",
          "expectedOutput": "After safe removal: [A, C, D]\nCaught expected ConcurrentModificationException!",
          "explanation": "Iterating with for-each uses an implicit Iterator. Modifying the list directly desynchronizes modCount and expectedModCount, triggering ConcurrentModificationException."
        },
        {
          "title": "ConcurrentHashMap vs Collections.synchronizedMap",
          "code": "import java.util.concurrent.ConcurrentHashMap;\n\npublic class ConcurrentCollectionDemo {\n    public static void main(String[] args) {\n        ConcurrentHashMap<String, Integer> map = new ConcurrentHashMap<>();\n        map.put(\"visitors\", 100);\n\n        // Atomic update without manual locks\n        map.compute(\"visitors\", (k, v) -> v == null ? 1 : v + 1);\n\n        System.out.println(\"Updated count: \" + map.get(\"visitors\"));\n    }\n}",
          "expectedOutput": "Updated count: 101",
          "explanation": "ConcurrentHashMap uses bucket-level CAS (Compare-And-Swap) and synchronized node locking, providing high concurrency without locking the entire map like synchronizedMap."
        }
      ],
      "realWorldApplications": [
        "High-throughput web servers storing active session states in ConcurrentHashMap.",
        "In-memory caching engines implementing LRU eviction by configuring LinkedHashMap with accessOrder=true."
      ],
      "commonMistakes": [
        "Removing elements from an ArrayList inside a standard for-each loop, triggering ConcurrentModificationException.",
        "Using LinkedList under the mistaken assumption that it is faster for insertions, ignoring CPU cache miss penalties.",
        "Using Hashtable or Vector in modern code instead of ConcurrentHashMap or ArrayList."
      ],
      "interviewRelevance": "HashMap internal mechanics (treeification, load factor, table sizing) and ConcurrentModificationException are asked in nearly 100% of Java backend interviews.",
      "checkpoints": [
        {
          "id": "java-99-cp1",
          "label": "Explain HashMap internal collision resolution (LinkedList to Red-Black tree conversion)"
        },
        {
          "id": "java-99-cp2",
          "label": "Differentiate between Fail-Fast and Fail-Safe iterators"
        },
        {
          "id": "java-99-cp3",
          "label": "Select appropriate collections: ArrayList vs ArrayDeque vs ConcurrentHashMap"
        }
      ],
      "practiceExercises": [
        {
          "id": "java-99-ex1",
          "title": "Remove Even Numbers with removeIf",
          "difficulty": "Beginner",
          "type": "coding",
          "prompt": "Given a List<Integer>, remove all even numbers cleanly using Java 8 Collection.removeIf().",
          "starterCode": "import java.util.*;\n\npublic class ListFilter {\n    public static void removeEvens(List<Integer> list) {\n        // Remove evens in-place\n    }\n}",
          "solution": "import java.util.*;\n\npublic class ListFilter {\n    public static void removeEvens(List<Integer> list) {\n        list.removeIf(n -> n % 2 == 0);\n    }\n}",
          "explanation": "list.removeIf(predicate) safely removes matching elements in-place without throwing ConcurrentModificationException."
        },
        {
          "id": "java-99-ex2",
          "title": "Design Fixed-Size LRU Cache with LinkedHashMap",
          "difficulty": "Intermediate",
          "type": "coding",
          "prompt": "Implement an LRUCache<K, V> class of fixed capacity extending LinkedHashMap and overriding removeEldestEntry.",
          "starterCode": "import java.util.*;\n\npublic class LRUCache<K, V> extends LinkedHashMap<K, V> {\n    // Implement cache\n}",
          "solution": "import java.util.*;\n\npublic class LRUCache<K, V> extends LinkedHashMap<K, V> {\n    private final int maxCapacity;\n\n    public LRUCache(int capacity) {\n        super(capacity, 0.75f, true); // true = access-order\n        this.maxCapacity = capacity;\n    }\n\n    @Override\n    protected boolean removeEldestEntry(Map.Entry<K, V> eldest) {\n        return size() > maxCapacity;\n    }\n}",
          "explanation": "Setting accessOrder=true orders entries by access (get/put). Overriding removeEldestEntry evicts the least recently accessed item when capacity is exceeded."
        },
        {
          "id": "java-99-ex3",
          "title": "Atomic Counter with ConcurrentHashMap",
          "difficulty": "Advanced",
          "type": "coding",
          "prompt": "Write a method recordVisit(ConcurrentHashMap<String, Long> map, String page) that atomically increments the visit count for a page thread-safely.",
          "starterCode": "import java.util.concurrent.ConcurrentHashMap;\n\npublic class PageTracker {\n    public static void recordVisit(ConcurrentHashMap<String, Long> map, String page) {\n        // Atomic increment\n    }\n}",
          "solution": "import java.util.concurrent.ConcurrentHashMap;\n\npublic class PageTracker {\n    public static void recordVisit(ConcurrentHashMap<String, Long> map, String page) {\n        map.compute(page, (k, v) -> (v == null) ? 1L : v + 1L);\n    }\n}",
          "explanation": "compute() applies the remapping function atomically on the specific bucket node, ensuring thread-safe increments without race conditions."
        }
      ],
      "quizQuestions": [
        {
          "id": "java-99-q1",
          "question": "Under what conditions does a HashMap bucket convert its elements from a linked list to a balanced Red-Black tree (TreeNode)?",
          "options": [
            "When the bucket has more than 2 elements",
            "When the number of colliding elements in that bucket reaches 8 AND total table capacity is at least 64",
            "Whenever a hash collision occurs",
            "Only when load factor reaches 1.0"
          ],
          "correctOptionIndex": 1,
          "explanation": "Java 8 HashMap treeifies a bin when its count reaches TREEIFY_THRESHOLD (8) and the table capacity is at least MIN_TREEIFY_CAPACITY (64). If capacity is < 64, it resizes the table instead."
        },
        {
          "id": "java-99-q2",
          "question": "What triggers a `ConcurrentModificationException` during collection iteration?",
          "options": [
            "Modifying elements using Iterator.remove()",
            "A mismatch between the iterator's expectedModCount and the collection's actual modCount caused by modifying the collection directly",
            "Reading from multiple threads without synchronization",
            "Inserting null values into a TreeSet"
          ],
          "correctOptionIndex": 1,
          "explanation": "Fail-fast iterators check if modCount == expectedModCount before every next() operation. If the collection was modified outside the iterator, the counts mismatch and CME is thrown."
        }
      ],
      "revisionNotes": [
        "Prefer `ArrayList` and `ArrayDeque` over `LinkedList` and `Stack`.",
        "HashMap converts bins with >8 entries to Red-Black trees when table capacity >= 64.",
        "Use `list.removeIf()` or `Iterator.remove()` to avoid `ConcurrentModificationException`."
      ],
      "moduleId": "java-m8",
      "moduleNumber": 8,
      "moduleTitle": "Java Interview Preparation",
      "language": "java"
    },
    {
      "id": "java-100-oop-scenarios",
      "topicNumber": 100,
      "title": "OOP Design Scenarios, Behavioral Questions & Interface Evolution",
      "level": "Intermediate",
      "whyItMatters": "Interviewers evaluate architectural maturity through open-ended design questions: abstract classes vs interfaces, resolving interface default method diamond conflicts, and applying SOLID principles to real-world software components.",
      "explanation": "1. Abstract Class vs Interface (Java 8/9/17 Evolution):\n- Abstract Class: Represents an \"is-a\" relationship. Can hold mutable instance state (fields), non-public constructors, and protected methods. A class can inherit from ONLY ONE abstract class.\n- Interface: Represents a \"can-do\" or capability contract (e.g. Comparable, AutoCloseable). A class can implement multiple interfaces.\n  - Java 8 added default and static methods to interfaces.\n  - Java 9 added private methods for code reuse inside default methods.\n\n2. The Diamond Problem in Interface Default Methods:\n- If Class C implements Interface A and Interface B, and both A and B provide default void execute() with identical signatures:\n- The Java compiler FLAGS THIS AS A COMPILE-TIME ERROR: \"class C inherits unrelated defaults for execute() from types A and B\".\n- Resolution: Class C MUST explicitly override the method and resolve ambiguity (e.g. A.super.execute(); or custom implementation).\n\n3. Answering Behavioral Interview Questions with STAR:\n- Situation: Set the context (company, project, constraint).\n- Task: Define what was required of you.\n- Action: Detail the specific architectural and engineering steps you took.\n- Result: Quantify the outcome (e.g., \"reduced latency by 35%, deployed zero-downtime\").",
      "syntaxAndStructure": "// Resolving default method conflict:\ninterface A { default void log() { System.out.println(\"A\"); } }\ninterface B { default void log() { System.out.println(\"B\"); } }\nclass C implements A, B {\n    @Override\n    public void log() { A.super.log(); } // disambiguation\n}",
      "codeExamples": [
        {
          "title": "Resolving Diamond Default Method Conflicts",
          "code": "public class DiamondResolutionDemo {\n    interface Engine {\n        default void start() { System.out.println(\"Combustion engine start\"); }\n    }\n\n    interface ElectricMotor {\n        default void start() { System.out.println(\"Electric motor start\"); }\n    }\n\n    // HybridCar implements both; must explicitly resolve start()\n    static class HybridCar implements Engine, ElectricMotor {\n        @Override\n        public void start() {\n            System.out.println(\"Starting Hybrid powertrain:\");\n            ElectricMotor.super.start(); // Call electric motor first\n            Engine.super.start();        // Call combustion engine as backup\n        }\n    }\n\n    public static void main(String[] args) {\n        HybridCar car = new HybridCar();\n        car.start();\n    }\n}",
          "expectedOutput": "Starting Hybrid powertrain:\nElectric motor start\nCombustion engine start",
          "explanation": "When multiple implemented interfaces define conflicting default methods, the subclass must explicitly override the method and can delegate using InterfaceName.super.method()."
        },
        {
          "title": "Interface with Private Helper Methods (Java 9+)",
          "code": "public class ModernInterfaceDemo {\n    interface PaymentProcessor {\n        default void payCreditCard(double amount) {\n            logTransaction(\"CreditCard\", amount);\n        }\n\n        default void payPayPal(double amount) {\n            logTransaction(\"PayPal\", amount);\n        }\n\n        // Private interface method for internal code sharing\n        private void logTransaction(String method, double amount) {\n            System.out.println(\"AUDIT: Processed $\" + amount + \" via \" + method);\n        }\n    }\n\n    static class StoreCheckout implements PaymentProcessor {}\n\n    public static void main(String[] args) {\n        StoreCheckout checkout = new StoreCheckout();\n        checkout.payCreditCard(149.99);\n    }\n}",
          "expectedOutput": "AUDIT: Processed $149.99 via CreditCard",
          "explanation": "Java 9 introduced private interface methods, enabling default methods to share common helper logic without exposing those helpers as public API."
        }
      ],
      "realWorldApplications": [
        "Refactoring legacy monolithic APIs by adding default methods to public interfaces without breaking existing implementers.",
        "Structuring domain logic cleanly into microservices following Single Responsibility and Dependency Inversion."
      ],
      "commonMistakes": [
        "Assuming interfaces and abstract classes are now identical because interfaces support default methods: interfaces still cannot have instance fields or constructors.",
        "Using inheritance purely for code reuse instead of subtyping (\"is-a\"), violating the Liskov Substitution Principle.",
        "Forgetting that interface fields are implicitly public static final (constants)."
      ],
      "interviewRelevance": "Interface evolution, abstract class trade-offs, and resolving the diamond problem appear in almost all senior engineering system design and OOP screens.",
      "checkpoints": [
        {
          "id": "java-100-cp1",
          "label": "Articulate differences between abstract classes and modern interfaces"
        },
        {
          "id": "java-100-cp2",
          "label": "Resolve default method conflicts using InterfaceName.super.method()"
        },
        {
          "id": "java-100-cp3",
          "label": "Structure behavioral interview responses using the STAR method"
        }
      ],
      "practiceExercises": [
        {
          "id": "java-100-ex1",
          "title": "Compare Abstract Class vs Interface Modifiers",
          "difficulty": "Beginner",
          "type": "conceptual",
          "prompt": "What are the implicit modifiers for variables declared inside an interface in Java?",
          "solution": "Variables declared in an interface are implicitly `public static final`. They are compile-time constants and cannot be instance variables.",
          "explanation": "Interfaces cannot maintain mutable instance state; any field declared in an interface is an immutable constant."
        },
        {
          "id": "java-100-ex2",
          "title": "Implement Interface Default Method Override",
          "difficulty": "Intermediate",
          "type": "coding",
          "prompt": "Create interfaces GreeterA and GreeterB with default String greet() returning \"Hello\" and \"Hi\". Implement class BilingualGreeter that resolves greet() returning \"Hello & Hi\".",
          "starterCode": "public class GreeterDemo {\n    // Implement interfaces and class\n}",
          "solution": "public class GreeterDemo {\n    interface GreeterA {\n        default String greet() { return \"Hello\"; }\n    }\n    interface GreeterB {\n        default String greet() { return \"Hi\"; }\n    }\n\n    static class BilingualGreeter implements GreeterA, GreeterB {\n        @Override\n        public String greet() {\n            return GreeterA.super.greet() + \" & \" + GreeterB.super.greet();\n        }\n    }\n}",
          "explanation": "Overriding greet() and combining GreeterA.super.greet() with GreeterB.super.greet() resolves the conflict cleanly."
        },
        {
          "id": "java-100-ex3",
          "title": "Apply Dependency Inversion Principle",
          "difficulty": "Advanced",
          "type": "coding",
          "prompt": "Refactor a tightly coupled OrderProcessor that instantiates new MySQLDatabase() to depend on an abstraction DatabaseRepository instead.",
          "starterCode": "public class DipRefactor {\n    // Implement DIP refactor\n}",
          "solution": "public class DipRefactor {\n    public interface DatabaseRepository {\n        void saveOrder(String orderId);\n    }\n\n    public static class OrderProcessor {\n        private final DatabaseRepository repo;\n\n        // Dependency Injected via constructor\n        public OrderProcessor(DatabaseRepository repo) {\n            this.repo = repo;\n        }\n\n        public void process(String orderId) {\n            repo.saveOrder(orderId);\n        }\n    }\n}",
          "explanation": "High-level OrderProcessor depends on abstraction DatabaseRepository rather than concrete MySQLDatabase, allowing seamless swapping of implementations for testing."
        }
      ],
      "quizQuestions": [
        {
          "id": "java-100-q1",
          "question": "What happens if a class implements two interfaces that declare identical default method signatures?",
          "options": [
            "The JVM picks the interface listed first in the implements clause",
            "The Java compiler produces an error requiring the subclass to explicitly override the method and resolve the ambiguity",
            "The method from the interface with the higher alphabetical name is chosen",
            "Both methods execute concurrently"
          ],
          "correctOptionIndex": 1,
          "explanation": "Java detects the conflict at compile-time and forces the implementer to explicitly override the method, avoiding runtime ambiguity."
        },
        {
          "id": "java-100-q2",
          "question": "Which capability is supported by abstract classes but NOT supported by modern interfaces in Java?",
          "options": [
            "Defining static methods",
            "Declaring private helper methods",
            "Declaring mutable instance variables (fields) and non-public constructors",
            "Providing default method implementations"
          ],
          "correctOptionIndex": 2,
          "explanation": "Interfaces cannot declare non-static instance fields or constructors. All interface fields are implicitly public static final constants."
        }
      ],
      "revisionNotes": [
        "Interfaces define capabilities; abstract classes define core identities with mutable state.",
        "Diamond default method conflicts must be explicitly resolved in the implementing class.",
        "Use the STAR method (Situation, Task, Action, Result) for behavioral interview questions."
      ],
      "moduleId": "java-m8",
      "moduleNumber": 8,
      "moduleTitle": "Java Interview Preparation",
      "language": "java"
    },
    {
      "id": "java-101-multithreading-interview",
      "topicNumber": 101,
      "title": "Multithreading & Concurrency Interview Traps",
      "level": "Advanced",
      "whyItMatters": "Concurrency questions separate average developers from elite backend engineers. Topics like happens-before relationships, volatile visibility vs atomicity, deadlock conditions, and ReentrantLock vs synchronized determine interview outcomes.",
      "explanation": "1. volatile vs Atomic Variables vs Synchronized:\n- volatile: Guarantees visibility and instruction reordering prevention across CPU caches via memory barriers. It DOES NOT guarantee atomicity! volatile count++ is NOT thread-safe because count++ is 3 separate operations (read, increment, write).\n- AtomicInteger / AtomicLong: Uses hardware-level CAS (Compare-And-Swap) instructions for lock-free, atomic compound updates.\n- synchronized / ReentrantLock: Guarantees both mutual exclusion (atomicity) and visibility at the cost of thread blocking.\n\n2. The 4 Necessary Conditions for Deadlock (Coffman Conditions):\n1. Mutual Exclusion: At least one resource is held in a non-shareable mode.\n2. Hold and Wait: A thread holds one resource while waiting to acquire another.\n3. No Preemption: Resources cannot be forcibly confiscated from a thread.\n4. Circular Wait: A closed chain of threads exists where each thread waits for a resource held by the next.\nBreaking ANY ONE of these conditions prevents deadlock! (Most common: Lock Ordering — always acquire locks in a globally consistent order).\n\n3. wait() and notify() Contract:\n- Must ALWAYS be called inside a synchronized block on the monitor object, or IllegalMonitorStateException is thrown.\n- wait() must ALWAYS be called inside a while loop, never an if statement, to defend against Spurious Wakeups!",
      "syntaxAndStructure": "// The wait-in-a-loop pattern (defending against spurious wakeups):\nsynchronized (lock) {\n    while (!condition) {\n        lock.wait();\n    }\n    // perform action\n}",
      "codeExamples": [
        {
          "title": "Why volatile is NOT Atomic (Race Condition Proof)",
          "code": "public class VolatileRaceConditionDemo {\n    static class Counter {\n        // volatile guarantees visibility, but NOT atomicity!\n        volatile int count = 0;\n\n        void increment() {\n            count++; // count = count + 1 (read, modify, write)\n        }\n    }\n\n    public static void main(String[] args) throws InterruptedException {\n        Counter counter = new Counter();\n        Thread t1 = new Thread(() -> { for (int i = 0; i < 1000; i++) counter.increment(); });\n        Thread t2 = new Thread(() -> { for (int i = 0; i < 1000; i++) counter.increment(); });\n\n        t1.start();\n        t2.start();\n        t1.join();\n        t2.join();\n\n        System.out.println(\"Final count (expected 2000): \" + counter.count);\n        System.out.println(\"Count is frequently < 2000 due to lost updates!\");\n    }\n}",
          "expectedOutput": "Final count (expected 2000): 2000\nCount is frequently < 2000 due to lost updates!",
          "explanation": "Because count++ consists of 3 distinct bytecode instructions, concurrent reads cause lost updates. Use AtomicInteger or synchronized to guarantee atomicity."
        },
        {
          "title": "Deadlock Prevention via Strict Lock Ordering",
          "code": "public class DeadlockPreventionDemo {\n    static class Account {\n        final int id;\n        double balance;\n        Account(int id, double balance) { this.id = id; this.balance = balance; }\n    }\n\n    public static void transfer(Account from, Account to, double amount) {\n        // Enforce global lock ordering based on unique ID\n        Account firstLock = from.id < to.id ? from : to;\n        Account secondLock = from.id < to.id ? to : from;\n\n        synchronized (firstLock) {\n            synchronized (secondLock) {\n                from.balance -= amount;\n                to.balance += amount;\n                System.out.println(\"Safe transfer completed!\");\n            }\n        }\n    }\n\n    public static void main(String[] args) {\n        Account a1 = new Account(1, 500);\n        Account a2 = new Account(2, 300);\n        transfer(a1, a2, 100);\n    }\n}",
          "expectedOutput": "Safe transfer completed!",
          "explanation": "Sorting accounts by ID ensures all threads acquire locks in the identical order, eliminating the Circular Wait condition and preventing deadlocks."
        }
      ],
      "realWorldApplications": [
        "High-throughput message brokers (Kafka, RabbitMQ) coordinating consumer threads with lock-free atomic rings.",
        "Web servers managing thread pools using ThreadPoolExecutor with rejection policies."
      ],
      "commonMistakes": [
        "Using volatile for composite operations like count++ or check-then-act flags.",
        "Calling wait() outside of a while loop, leading to data corruption from spurious wakeups.",
        "Calling notify() instead of notifyAll(), causing thread starvation when multiple threads are waiting on different conditions."
      ],
      "interviewRelevance": "Deadlock prevention, volatile vs AtomicInteger, and producer-consumer implementations are top-tier questions asked by Google, Meta, and Goldman Sachs.",
      "checkpoints": [
        {
          "id": "java-101-cp1",
          "label": "Explain why volatile guarantees visibility but not atomicity"
        },
        {
          "id": "java-101-cp2",
          "label": "Prevent deadlocks by eliminating the Circular Wait condition via lock ordering"
        },
        {
          "id": "java-101-cp3",
          "label": "Use the standard while (!condition) { wait(); } pattern to guard against spurious wakeups"
        }
      ],
      "practiceExercises": [
        {
          "id": "java-101-ex1",
          "title": "Thread-Safe Counter with AtomicInteger",
          "difficulty": "Beginner",
          "type": "coding",
          "prompt": "Implement a thread-safe Counter class using AtomicInteger that supports increment(), decrement(), and get().",
          "starterCode": "public class SafeCounter {\n    // Implement counter\n}",
          "solution": "import java.util.concurrent.atomic.AtomicInteger;\n\npublic class SafeCounter {\n    private final AtomicInteger count = new AtomicInteger(0);\n\n    public void increment() { count.incrementAndGet(); }\n    public void decrement() { count.decrementAndGet(); }\n    public int get() { return count.get(); }\n}",
          "explanation": "AtomicInteger uses hardware CAS (Compare-And-Swap) instructions for lock-free, atomic operations."
        },
        {
          "id": "java-101-ex2",
          "title": "Producer-Consumer Bounded Buffer with Locks",
          "difficulty": "Intermediate",
          "type": "coding",
          "prompt": "Implement a thread-safe BoundedBuffer<T> with put(T) and take() using ReentrantLock and two Conditions (notFull, notEmpty).",
          "starterCode": "import java.util.concurrent.locks.*;\n\npublic class BoundedBuffer<T> {\n    // Implement bounded buffer\n}",
          "solution": "import java.util.concurrent.locks.*;\n\npublic class BoundedBuffer<T> {\n    private final Object[] items;\n    private int putptr, takeptr, count;\n    private final Lock lock = new ReentrantLock();\n    private final Condition notFull  = lock.newCondition();\n    private final Condition notEmpty = lock.newCondition();\n\n    public BoundedBuffer(int capacity) { items = new Object[capacity]; }\n\n    public void put(T x) throws InterruptedException {\n        lock.lock();\n        try {\n            while (count == items.length) notFull.await();\n            items[putptr] = x;\n            if (++putptr == items.length) putptr = 0;\n            count++;\n            notEmpty.signal();\n        } finally { lock.unlock(); }\n    }\n\n    @SuppressWarnings(\"unchecked\")\n    public T take() throws InterruptedException {\n        lock.lock();\n        try {\n            while (count == 0) notEmpty.await();\n            T x = (T) items[takeptr];\n            if (++takeptr == items.length) takeptr = 0;\n            count--;\n            notFull.signal();\n            return x;\n        } finally { lock.unlock(); }\n    }\n}",
          "explanation": "Separate notFull and notEmpty conditions allow signaling only the relevant waiting threads, preventing unnecessary wakeups."
        },
        {
          "id": "java-101-ex3",
          "title": "Lock-Free Stack using Treiber Algorithm",
          "difficulty": "Advanced",
          "type": "coding",
          "prompt": "Implement a lock-free Stack<T> using AtomicReference<Node<T>> and compareAndSet.",
          "starterCode": "import java.util.concurrent.atomic.AtomicReference;\n\npublic class LockFreeStack<T> {\n    // Implement lock-free stack\n}",
          "solution": "import java.util.concurrent.atomic.AtomicReference;\n\npublic class LockFreeStack<T> {\n    private static class Node<T> {\n        final T item;\n        Node<T> next;\n        Node(T item) { this.item = item; }\n    }\n\n    private final AtomicReference<Node<T>> top = new AtomicReference<>(null);\n\n    public void push(T item) {\n        Node<T> newHead = new Node<>(item);\n        Node<T> oldHead;\n        do {\n            oldHead = top.get();\n            newHead.next = oldHead;\n        } while (!top.compareAndSet(oldHead, newHead));\n    }\n\n    public T pop() {\n        Node<T> oldHead;\n        Node<T> newHead;\n        do {\n            oldHead = top.get();\n            if (oldHead == null) return null;\n            newHead = oldHead.next;\n        } while (!top.compareAndSet(oldHead, newHead));\n        return oldHead.item;\n    }\n}",
          "explanation": "Treiber's algorithm uses AtomicReference CAS loops. If another thread mutates top concurrently, compareAndSet fails and the loop retries."
        }
      ],
      "quizQuestions": [
        {
          "id": "java-101-q1",
          "question": "Why does `volatile int count = 0; count++;` fail to be thread-safe in Java?",
          "options": [
            "Because volatile variables cannot be integers",
            "Because count++ consists of 3 distinct non-atomic operations (read, modify, write), allowing race conditions between concurrent threads",
            "Because volatile locks the CPU",
            "Because volatile variables cannot be modified after initialization"
          ],
          "correctOptionIndex": 1,
          "explanation": "volatile guarantees memory visibility, but does not provide atomicity for compound operations like count++."
        },
        {
          "id": "java-101-q2",
          "question": "Why must `wait()` always be invoked inside a `while` loop rather than an `if` block?",
          "options": [
            "To ensure compilation succeeds",
            "To defend against spurious wakeups where a thread wakes up without being signaled, and to re-verify the condition before proceeding",
            "Because if statements cannot access monitor locks",
            "To keep the thread running forever"
          ],
          "correctOptionIndex": 1,
          "explanation": "Threads can experience spurious wakeups without notify() being called. Re-checking the condition in a while loop ensures the thread only proceeds when the condition is genuinely true."
        }
      ],
      "revisionNotes": [
        "`volatile` guarantees visibility and prevents reordering, but is NOT atomic.",
        "Prevent deadlocks by enforcing global lock acquisition ordering.",
        "Always call `wait()` inside a `while (!condition)` loop."
      ],
      "moduleId": "java-m8",
      "moduleNumber": 8,
      "moduleTitle": "Java Interview Preparation",
      "language": "java"
    },
    {
      "id": "java-102-jvm-gc-interview",
      "topicNumber": 102,
      "title": "JVM Architecture & Garbage Collection Interview Questions",
      "level": "Advanced",
      "whyItMatters": "Understanding garbage collection mechanics, stop-the-world pauses, and how memory leaks occur despite automatic GC is essential for tuning production Java services and resolving high-severity performance incidents.",
      "explanation": "1. How Can Memory Leaks Occur in Java When GC Exists?\n- An object is a memory leak if it is NO LONGER NEEDED by the application, yet STILL REACHABLE from a GC Root (preventing GC from reclaiming it).\n- Common Causes of Java Memory Leaks:\n  1. Static collections: Adding objects to a static Map or List without removing them.\n  2. Uncleared ThreadLocals: Thread pools reuse threads; failing to call ThreadLocal.remove() prevents task objects from being collected.\n  3. Unclosed resources: Unclosed database connections, file handles, or network sockets.\n  4. Non-static inner classes: Retain an implicit reference to the enclosing outer class instance.\n  5. Improper equals/hashCode in HashMaps: Causes keys to become unreachable/unremovable.\n\n2. Modern Garbage Collectors:\n- G1 GC (Garbage-First): Default since Java 9. Divides heap into equal-sized regions (~2048 regions). Prioritizes regions with the most garbage to meet user-defined pause targets (-XX:MaxGCPauseMillis=200).\n- ZGC (Z Garbage Collector): Scalable low-latency GC (Java 15+ production ready). Pauses are sub-millisecond (< 1ms) regardless of heap size (from 16MB to 16TB!) using colored pointers and load barriers.\n\n3. Essential JVM Diagnostic Flags:\n- -Xms4g -Xmx4g: Set min and max heap size (equal values prevent dynamic resizing pauses).\n- -XX:+HeapDumpOnOutOfMemoryError -XX:HeapDumpPath=/var/dumps/heap.hprof\n- -Xlog:gc*:file=/var/log/gc.log:time,uptime:filecount=5,filesize=100M",
      "syntaxAndStructure": "// Common ThreadLocal cleanup pattern to prevent memory leaks:\nprivate static final ThreadLocal<UserContext> ctx = new ThreadLocal<>();\ntry {\n    ctx.set(new UserContext());\n    process();\n} finally {\n    ctx.remove(); // CRITICAL: prevents ThreadLocal memory leaks\n}",
      "codeExamples": [
        {
          "title": "Demonstrating a Classic Static Collection Memory Leak",
          "code": "import java.util.*;\n\npublic class MemoryLeakDemo {\n    // LEAK: Static collection retains references for the lifetime of the JVM\n    private static final List<byte[]> leakedList = new ArrayList<>();\n\n    public static void populate() {\n        for (int i = 0; i < 5; i++) {\n            leakedList.add(new byte[1024 * 1024]); // 1MB chunk\n        }\n        System.out.println(\"Allocated 5MB retained in static collection.\");\n    }\n\n    public static void main(String[] args) {\n        populate();\n        System.out.println(\"GC cannot reclaim leakedList elements because they are reachable from GC Root (Classloader)!\");\n    }\n}",
          "expectedOutput": "Allocated 5MB retained in static collection.\nGC cannot reclaim leakedList elements because they are reachable from GC Root (Classloader)!",
          "explanation": "Because leakedList is static, its elements remain reachable from the system classloader forever, preventing the garbage collector from freeing that heap memory."
        },
        {
          "title": "WeakReference for Cache Memory Management",
          "code": "import java.lang.ref.WeakReference;\n\npublic class WeakRefDemo {\n    public static void main(String[] args) {\n        String data = new String(\"Heavy Payload\");\n        WeakReference<String> weakRef = new WeakReference<>(data);\n\n        data = null; // Remove strong reference\n\n        System.out.println(\"Before GC: \" + weakRef.get());\n        System.gc(); // Suggest GC\n        System.out.println(\"WeakReferences are cleared by GC when no strong references remain.\");\n    }\n}",
          "expectedOutput": "Before GC: Heavy Payload\nWeakReferences are cleared by GC when no strong references remain.",
          "explanation": "Unlike Strong references, WeakReference objects do not prevent their referents from being reclaimed during garbage collection cycles."
        }
      ],
      "realWorldApplications": [
        "Diagnosing OutOfMemoryError in production by analyzing HPROF memory dumps using Eclipse Memory Analyzer (MAT).",
        "Configuring low-latency microservices with ZGC (-XX:+UseZGC) to maintain strict 99.9th percentile SLA latencies."
      ],
      "commonMistakes": [
        "Believing Java cannot have memory leaks because it has automatic garbage collection.",
        "Failing to call ThreadLocal.remove() in servlet filters, leaking memory across recycled thread pool workers.",
        "Setting -Xms much smaller than -Xmx, causing expensive heap expansion pauses during sudden traffic spikes."
      ],
      "interviewRelevance": "Explaining how memory leaks occur in Java, analyzing heap dumps, and comparing G1 GC with ZGC are frequent topics in senior and staff engineer interviews.",
      "checkpoints": [
        {
          "id": "java-102-cp1",
          "label": "Define memory leaks in Java (unneeded objects reachable from GC Roots)"
        },
        {
          "id": "java-102-cp2",
          "label": "Explain G1 GC region-based collection and ZGC sub-millisecond pauses"
        },
        {
          "id": "java-102-cp3",
          "label": "Prevent ThreadLocal leaks by always invoking .remove() in finally blocks"
        }
      ],
      "practiceExercises": [
        {
          "id": "java-102-ex1",
          "title": "Identify Memory Leak Source",
          "difficulty": "Beginner",
          "type": "conceptual",
          "prompt": "Explain why non-static inner classes can cause memory leaks in Android or long-lived desktop applications.",
          "solution": "Non-static inner classes hold an implicit hidden reference to their enclosing outer class instance (Outer.this). If an instance of the inner class (such as an asynchronous Runnable or Handler) outlives the outer class (e.g. an Activity or Window), it prevents the outer class and all its UI views from being garbage collected.",
          "explanation": "Always use static nested classes (or WeakReference) when inner class instances can outlive their outer enclosing instances."
        },
        {
          "id": "java-102-ex2",
          "title": "Diagnose OutOfMemoryError Types",
          "difficulty": "Intermediate",
          "type": "conceptual",
          "prompt": "Distinguish between: (1) java.lang.OutOfMemoryError: Java heap space, and (2) java.lang.OutOfMemoryError: Metaspace.",
          "solution": "1. Java heap space: The JVM cannot allocate an object because the heap is full and GC cannot reclaim enough memory (caused by memory leaks, high concurrency, or undersized -Xmx).\n2. Metaspace: Native memory allocated for loaded class metadata is exhausted (caused by dynamic class generation like CGLIB/ByteBuddy proxies without class unloading, or undersized -XX:MaxMetaspaceSize).",
          "explanation": "Heap space relates to application data and objects; Metaspace relates to loaded class definitions in native off-heap memory."
        },
        {
          "id": "java-102-ex3",
          "title": "Safe ThreadLocal Cleanup Pattern",
          "difficulty": "Advanced",
          "type": "coding",
          "prompt": "Write a reusable ScopedContext<T> class implementing AutoCloseable that sets a ThreadLocal on creation and removes it on close().",
          "starterCode": "public class ScopedContext<T> implements AutoCloseable {\n    // Implement AutoCloseable scoped context\n}",
          "solution": "public class ScopedContext<T> implements AutoCloseable {\n    private static final ThreadLocal<Object> TL = new ThreadLocal<>();\n\n    public ScopedContext(T value) {\n        TL.set(value);\n    }\n\n    @SuppressWarnings(\"unchecked\")\n    public static <T> T get() {\n        return (T) TL.get();\n    }\n\n    @Override\n    public void close() {\n        TL.remove();\n    }\n}",
          "explanation": "By implementing AutoCloseable, callers can manage ThreadLocal lifecycle via try-with-resources: try (var ctx = new ScopedContext<>(user)) { ... }, guaranteeing cleanup."
        }
      ],
      "quizQuestions": [
        {
          "id": "java-102-q1",
          "question": "How is an object determined to be garbage in modern HotSpot JVMs?",
          "options": [
            "Using reference counting (reclaimed when reference count reaches 0)",
            "Using tracing reachability from GC Roots (objects that cannot be reached through any path of references from GC Roots are eligible for collection)",
            "Based on how long the object has existed in the heap",
            "Only when the application explicitly calls System.gc()"
          ],
          "correctOptionIndex": 1,
          "explanation": "HotSpot uses tracing reachability from GC Roots (stack variables, static references, JNI handles). Reference counting was abandoned due to its inability to collect circular references."
        },
        {
          "id": "java-102-q2",
          "question": "What is the primary architectural advantage of the Z Garbage Collector (ZGC)?",
          "options": [
            "It uses zero heap memory",
            "It guarantees sub-millisecond stop-the-world pause times regardless of heap size by performing reference processing concurrently using load barriers",
            "It eliminates the need for compilation",
            "It only runs on 32-bit JVMs"
          ],
          "correctOptionIndex": 1,
          "explanation": "ZGC performs virtually all GC phases (marking, relocation) concurrently with application threads, keeping pause times under 1 millisecond even on terabyte-sized heaps."
        }
      ],
      "revisionNotes": [
        "Memory leaks in Java occur when unneeded objects remain reachable from GC Roots.",
        "Always call `ThreadLocal.remove()` to prevent leaks in thread-pooled environments.",
        "ZGC delivers sub-millisecond pause times through concurrent colored pointers and load barriers."
      ],
      "moduleId": "java-m8",
      "moduleNumber": 8,
      "moduleTitle": "Java Interview Preparation",
      "language": "java"
    },
    {
      "id": "java-103-coding-patterns",
      "topicNumber": 103,
      "title": "Top Java Coding Interview Patterns Cheat Sheet",
      "level": "Intermediate",
      "whyItMatters": "Interviews reward pattern recognition. Identifying whether a problem is a Two-Pointer, Sliding Window, Monotonic Stack, or Kahn's Topological Sort within the first 2 minutes is the secret to clearing coding assessments consistently.",
      "explanation": "1. Pattern Recognition Matrix:\n- Input is sorted array, find pair/triplet -> Two Pointers (Inward).\n- Contiguous subarray sum/length with constraints -> Sliding Window or Prefix Sum + HashMap.\n- Next Greater / Smaller Element -> Monotonic Stack.\n- Shortest path in unweighted graph/grid -> BFS with Queue.\n- Topological order or dependency resolution -> Kahn's Algorithm with in-degree array.\n- Optimization problem with monotonic feasibility predicate -> Binary Search on Answer.\n- Find K most frequent or smallest/largest -> PriorityQueue (Heap).\n\n2. Java Standard Library Quick Tricks for Interviews:\n- Array filling: Arrays.fill(arr, val);\n- Reversing list: Collections.reverse(list);\n- Binary search: Arrays.binarySearch(arr, key) (returns -(insertion_point + 1) if absent).\n- Frequency counting: map.put(x, map.getOrDefault(x, 0) + 1); or map.merge(x, 1, Integer::sum);\n- Priority queue max heap: PriorityQueue<Integer> pq = new PriorityQueue<>(Collections.reverseOrder());",
      "syntaxAndStructure": "// Idiomatic frequency update with merge:\nMap<String, Integer> counts = new HashMap<>();\ncounts.merge(word, 1, Integer::sum);",
      "codeExamples": [
        {
          "title": "Idiomatic Java Map Operations (computeIfAbsent & merge)",
          "code": "import java.util.*;\n\npublic class IdiomaticJavaPatterns {\n    public static void main(String[] args) {\n        // 1. Grouping into lists with computeIfAbsent\n        Map<Integer, List<String>> byLength = new HashMap<>();\n        List<String> words = List.of(\"apple\", \"bat\", \"cherry\", \"cat\");\n        for (String w : words) {\n            byLength.computeIfAbsent(w.length(), k -> new ArrayList<>()).add(w);\n        }\n        System.out.println(\"Grouped by length: \" + byLength);\n\n        // 2. Frequency counting with merge\n        Map<String, Integer> freq = new HashMap<>();\n        for (String w : words) {\n            freq.merge(w, 1, Integer::sum);\n        }\n        System.out.println(\"Frequency: \" + freq);\n    }\n}",
          "expectedOutput": "Grouped by length: {3=[bat, cat], 5=[apple], 6=[cherry]}\nFrequency: {bat=1, cherry=1, apple=1, cat=1}",
          "explanation": "computeIfAbsent and merge eliminate verbose if-else boilerplate, demonstrating mastery of modern Java 8+ idioms."
        },
        {
          "title": "Fast Grid Directions Array Pattern",
          "code": "public class GridDirectionsPattern {\n    // 4 cardinal directions: [rowOffset, colOffset]\n    private static final int[][] DIRS = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}};\n\n    public static void printNeighbors(int r, int c, int rows, int cols) {\n        for (int[] d : DIRS) {\n            int nr = r + d[0];\n            int nc = c + d[1];\n            if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {\n                System.out.printf(\"Valid neighbor: (%d, %d)%n\", nr, nc);\n            }\n        }\n    }\n\n    public static void main(String[] args) {\n        printNeighbors(0, 0, 3, 3);\n    }\n}",
          "expectedOutput": "Valid neighbor: (1, 0)\nValid neighbor: (0, 1)",
          "explanation": "A static directions array DIRS = {{-1,0},{1,0},{0,-1},{0,1}} simplifies grid DFS/BFS into a concise 4-step loop without duplicate code."
        }
      ],
      "realWorldApplications": [
        "Rapidly implementing algorithm prototypes during live coding interviews.",
        "Writing readable production code using modern Java Map APIs instead of legacy procedural patterns."
      ],
      "commonMistakes": [
        "Mixing up Min-Heap and Max-Heap comparator order in PriorityQueue.",
        "Forgetting bounds checks before accessing 2D grid neighbors (nr >= 0 && nr < R && nc >= 0 && nc < C).",
        "Using slow boxed collections in tight algorithm loops when primitive arrays would be 10x faster."
      ],
      "interviewRelevance": "Fluent pattern recognition and clean use of modern Java collections are evaluated in every technical coding assessment.",
      "checkpoints": [
        {
          "id": "java-103-cp1",
          "label": "Map problem requirements to canonical algorithmic patterns"
        },
        {
          "id": "java-103-cp2",
          "label": "Utilize Java 8+ idioms: computeIfAbsent, merge, getOrDefault"
        },
        {
          "id": "java-103-cp3",
          "label": "Implement 2D grid traversals using compact directional delta arrays"
        }
      ],
      "practiceExercises": [
        {
          "id": "java-103-ex1",
          "title": "Group Numbers by Remainder",
          "difficulty": "Beginner",
          "type": "coding",
          "prompt": "Group an array of integers into a Map<Integer, List<Integer>> based on their value modulo 3 using computeIfAbsent.",
          "starterCode": "import java.util.*;\n\npublic class RemainderGrouper {\n    public static Map<Integer, List<Integer>> groupByMod3(int[] nums) {\n        return new HashMap<>();\n    }\n}",
          "solution": "import java.util.*;\n\npublic class RemainderGrouper {\n    public static Map<Integer, List<Integer>> groupByMod3(int[] nums) {\n        Map<Integer, List<Integer>> map = new HashMap<>();\n        for (int x : nums) {\n            int rem = ((x % 3) + 3) % 3;\n            map.computeIfAbsent(rem, k -> new ArrayList<>()).add(x);\n        }\n        return map;\n    }\n}",
          "explanation": "computeIfAbsent initializes the list on first occurrence. ((x % 3) + 3) % 3 normalizes negative numbers."
        },
        {
          "id": "java-103-ex2",
          "title": "Frequency Counter with Map.merge",
          "difficulty": "Intermediate",
          "type": "coding",
          "prompt": "Given a String array, count word frequencies using map.merge(word, 1, Integer::sum).",
          "starterCode": "import java.util.*;\n\npublic class WordFreqCounter {\n    public static Map<String, Integer> countWords(String[] words) {\n        return new HashMap<>();\n    }\n}",
          "solution": "import java.util.*;\n\npublic class WordFreqCounter {\n    public static Map<String, Integer> countWords(String[] words) {\n        Map<String, Integer> freq = new HashMap<>();\n        for (String w : words) {\n            freq.merge(w, 1, Integer::sum);\n        }\n        return freq;\n    }\n}",
          "explanation": "merge() sets 1 if absent, or sums the existing count with 1 if present, concisely replacing getOrDefault."
        },
        {
          "id": "java-103-ex3",
          "title": "K-Way Merge with PriorityQueue",
          "difficulty": "Advanced",
          "type": "coding",
          "prompt": "Merge k sorted integer lists into one sorted list using a PriorityQueue storing array pointers.",
          "starterCode": "import java.util.*;\n\npublic class KWayMerge {\n    public static List<Integer> mergeKLists(List<List<Integer>> lists) {\n        return new ArrayList<>();\n    }\n}",
          "solution": "import java.util.*;\n\npublic class KWayMerge {\n    record Element(int val, int listIdx, int elemIdx) {}\n\n    public static List<Integer> mergeKLists(List<List<Integer>> lists) {\n        PriorityQueue<Element> pq = new PriorityQueue<>(Comparator.comparingInt(Element::val));\n        for (int i = 0; i < lists.size(); i++) {\n            if (!lists.get(i).isEmpty()) {\n                pq.offer(new Element(lists.get(i).get(0), i, 0));\n            }\n        }\n\n        List<Integer> result = new ArrayList<>();\n        while (!pq.isEmpty()) {\n            Element curr = pq.poll();\n            result.add(curr.val());\n\n            int nextElemIdx = curr.elemIdx() + 1;\n            if (nextElemIdx < lists.get(curr.listIdx()).size()) {\n                pq.offer(new Element(lists.get(curr.listIdx()).get(nextElemIdx), curr.listIdx(), nextElemIdx));\n            }\n        }\n\n        return result;\n    }\n}",
          "explanation": "Maintains a min-heap of size K. Extracts minimum and advances the pointer in that specific list, achieving O(N log K) time."
        }
      ],
      "quizQuestions": [
        {
          "id": "java-103-q1",
          "question": "What does `map.computeIfAbsent(key, k -> new ArrayList<>()).add(val)` do if the key already exists in the map?",
          "options": [
            "It replaces the existing list with a new empty list and adds val",
            "It returns the existing list and appends val without creating a new list",
            "It throws DuplicateKeyException",
            "It does nothing"
          ],
          "correctOptionIndex": 1,
          "explanation": "If the key is already associated with a non-null value, computeIfAbsent simply returns that existing value without invoking the mapping function."
        },
        {
          "id": "java-103-q2",
          "question": "How do you instantiate a Max-Heap using `PriorityQueue` in Java?",
          "options": [
            "new PriorityQueue<>(Collections.reverseOrder())",
            "new PriorityQueue<>(Direction.MAX)",
            "new MaxPriorityQueue<>()",
            "new PriorityQueue<>(false)"
          ],
          "correctOptionIndex": 0,
          "explanation": "PriorityQueue defaults to a natural min-heap. Passing Collections.reverseOrder() or a descending comparator configures it as a max-heap."
        }
      ],
      "revisionNotes": [
        "Master modern map idioms: `computeIfAbsent` and `merge`.",
        "Use static 2D direction arrays `{{-1,0},{1,0},{0,-1},{0,1}}` for grid traversals.",
        "Use `PriorityQueue` with custom comparators for Top-K and K-Way merge problems."
      ],
      "moduleId": "java-m8",
      "moduleNumber": 8,
      "moduleTitle": "Java Interview Preparation",
      "language": "java"
    },
    {
      "id": "java-104-lld-exercises",
      "topicNumber": 104,
      "title": "Low-Level System Design (LLD) in Java (Parking Lot, LRU Cache & GoF Patterns)",
      "level": "Advanced",
      "whyItMatters": "Low-Level Design (Machine Coding) rounds test your ability to translate ambiguous business requirements into clean, object-oriented, extensible, and thread-safe class models using GoF Design Patterns.",
      "explanation": "1. Key GoF Design Patterns for LLD:\n- Factory Pattern: Decouples object creation from consumer logic (e.g. VehicleFactory creating Car, Bike, Truck).\n- Strategy Pattern: Encapsulates interchangeable algorithms behind an interface (e.g. ParkingFeeCalculationStrategy: HourlyStrategy vs FlatRateStrategy).\n- Observer Pattern: Implements event notification systems (e.g. StockObserver, OrderStatusListener).\n- Singleton Pattern: Guarantees a class has only one instance (use Enum Singleton for thread-safe, reflection-proof implementation).\n\n2. Classical LLD Archetype: Parking Lot:\n- Entities: ParkingLot, ParkingFloor, ParkingSpot (Compact, Large, Handicapped), Vehicle (Car, Bike, Truck), Ticket, Payment.\n- Extensibility: Adding a new vehicle type or fee calculation formula should require adding a new class without modifying existing classes (Open/Closed Principle).\n\n3. Concurrency in LLD:\n- Multi-threaded environments require thread-safe spot reservation using ReentrantLock, ConcurrentHashMap, or atomic spot counters.",
      "syntaxAndStructure": "// Enum Singleton (Best Practice per Effective Java Item 3):\npublic enum DatabaseConnectionManager {\n    INSTANCE;\n    public void executeQuery(String sql) { /* ... */ }\n}",
      "codeExamples": [
        {
          "title": "Strategy Pattern for Dynamic Fee Calculation",
          "code": "public class StrategyPatternDemo {\n    interface PricingStrategy {\n        double calculateFee(long durationHours);\n    }\n\n    static class HourlyPricingStrategy implements PricingStrategy {\n        private final double ratePerHour;\n        HourlyPricingStrategy(double rate) { this.ratePerHour = rate; }\n        @Override\n        public double calculateFee(long durationHours) {\n            return durationHours * ratePerHour;\n        }\n    }\n\n    static class FlatDailyPricingStrategy implements PricingStrategy {\n        @Override\n        public double calculateFee(long durationHours) {\n            return 25.0; // Flat $25 daily rate\n        }\n    }\n\n    static class ParkingMeter {\n        private PricingStrategy strategy;\n        ParkingMeter(PricingStrategy strategy) { this.strategy = strategy; }\n        public void setStrategy(PricingStrategy strategy) { this.strategy = strategy; }\n        public double getCharge(long hours) { return strategy.calculateFee(hours); }\n    }\n\n    public static void main(String[] args) {\n        ParkingMeter meter = new ParkingMeter(new HourlyPricingStrategy(5.0));\n        System.out.println(\"2 hours @ $5/hr: $\" + meter.getCharge(2));\n\n        meter.setStrategy(new FlatDailyPricingStrategy());\n        System.out.println(\"2 hours with flat daily: $\" + meter.getCharge(2));\n    }\n}",
          "expectedOutput": "2 hours @ $5/hr: $10.0\n2 hours with flat daily: $25.0",
          "explanation": "The Strategy pattern enables swapping fee algorithms at runtime without modifying ParkingMeter code, satisfying the Open/Closed Principle."
        },
        {
          "title": "Thread-Safe Enum Singleton (Effective Java Item 3)",
          "code": "public class EnumSingletonDemo {\n    public enum ConfigurationRegistry {\n        INSTANCE;\n\n        private final java.util.Map<String, String> configs = new java.util.concurrent.ConcurrentHashMap<>();\n\n        public void set(String key, String value) { configs.put(key, value); }\n        public String get(String key) { return configs.get(key); }\n    }\n\n    public static void main(String[] args) {\n        ConfigurationRegistry.INSTANCE.set(\"env\", \"production\");\n        System.out.println(\"Env: \" + ConfigurationRegistry.INSTANCE.get(\"env\"));\n    }\n}",
          "expectedOutput": "Env: production",
          "explanation": "A single-element enum provides thread-safe, lazy-initialized, serialization-safe, and reflection-immune singleton guarantees."
        }
      ],
      "realWorldApplications": [
        "Machine coding rounds at companies like Uber, Swiggy, Flipkart, and Atlassian.",
        "Designing extensible plugin architectures in IDEs and build systems."
      ],
      "commonMistakes": [
        "Writing an anemic procedural model where all classes are just bags of getters/setters with business logic dumped into a giant Manager class.",
        "Ignoring thread safety when multiple users attempt to reserve the same resource simultaneously.",
        "Overengineering simple designs with unnecessary patterns before requirements justify them."
      ],
      "interviewRelevance": "Low-Level Design is a mandatory interview elimination round for SDE-2 and Senior Engineer positions across the tech industry.",
      "checkpoints": [
        {
          "id": "java-104-cp1",
          "label": "Apply Strategy, Factory, Observer, and Singleton patterns to system designs"
        },
        {
          "id": "java-104-cp2",
          "label": "Structure LLD problems with clear entities, interfaces, and separation of concerns"
        },
        {
          "id": "java-104-cp3",
          "label": "Implement thread-safe state mutations using concurrent collections and locks"
        }
      ],
      "practiceExercises": [
        {
          "id": "java-104-ex1",
          "title": "Factory Pattern for Vehicle Creation",
          "difficulty": "Beginner",
          "type": "coding",
          "prompt": "Implement a VehicleFactory that returns Vehicle instances (Car, Bike) based on an enum VehicleType.",
          "starterCode": "public class VehicleFactoryDemo {\n    // Implement factory\n}",
          "solution": "public class VehicleFactoryDemo {\n    public enum VehicleType { CAR, BIKE }\n    public interface Vehicle { void drive(); }\n\n    public static class Car implements Vehicle {\n        public void drive() { System.out.println(\"Driving car\"); }\n    }\n    public static class Bike implements Vehicle {\n        public void drive() { System.out.println(\"Riding bike\"); }\n    }\n\n    public static class VehicleFactory {\n        public static Vehicle createVehicle(VehicleType type) {\n            return switch (type) {\n                case CAR -> new Car();\n                case BIKE -> new Bike();\n            };\n        }\n    }\n}",
          "explanation": "Factory method encapsulates object creation, insulating calling code from concrete vehicle implementations."
        },
        {
          "id": "java-104-ex2",
          "title": "Thread-Safe Parking Spot Reservation",
          "difficulty": "Intermediate",
          "type": "coding",
          "prompt": "Create a ParkingSpot class with assignVehicle() and vacate() methods that are thread-safe against concurrent booking attempts.",
          "starterCode": "public class ParkingSpot {\n    // Implement thread-safe spot\n}",
          "solution": "import java.util.concurrent.atomic.AtomicBoolean;\n\npublic class ParkingSpot {\n    private final int spotId;\n    private final AtomicBoolean isOccupied = new AtomicBoolean(false);\n\n    public ParkingSpot(int id) { this.spotId = id; }\n\n    public boolean assignVehicle() {\n        // Atomic Compare-And-Set from false to true\n        return isOccupied.compareAndSet(false, true);\n    }\n\n    public void vacate() {\n        isOccupied.set(false);\n    }\n\n    public boolean isOccupied() { return isOccupied.get(); }\n}",
          "explanation": "AtomicBoolean.compareAndSet(false, true) ensures that only one concurrent thread succeeds in booking the spot without requiring heavy synchronized locks."
        },
        {
          "id": "java-104-ex3",
          "title": "Observer Pattern for Stock Price Ticker",
          "difficulty": "Advanced",
          "type": "coding",
          "prompt": "Implement an Observable StockTicker that notifies registered StockObserver listeners whenever a stock price changes.",
          "starterCode": "public class StockObserverDemo {\n    // Implement Observer pattern\n}",
          "solution": "import java.util.*;\n\npublic class StockObserverDemo {\n    public interface StockObserver {\n        void onPriceUpdate(String symbol, double price);\n    }\n\n    public static class StockTicker {\n        private final List<StockObserver> observers = new ArrayList<>();\n\n        public void subscribe(StockObserver observer) { observers.add(observer); }\n        public void unsubscribe(StockObserver observer) { observers.remove(observer); }\n\n        public void setPrice(String symbol, double price) {\n            for (StockObserver o : observers) {\n                o.onPriceUpdate(symbol, price);\n            }\n        }\n    }\n}",
          "explanation": "The Subject (StockTicker) maintains a list of Observers and broadcasts price updates without knowing observer implementation details."
        }
      ],
      "quizQuestions": [
        {
          "id": "java-104-q1",
          "question": "Why does Joshua Bloch (Effective Java Item 3) recommend single-element `enum` as the best way to implement a Singleton in Java?",
          "options": [
            "Because enums compile to C++ code",
            "Because enums provide thread-safety, serialization guarantees, and immunity against reflection attacks out-of-the-box without boilerplate code",
            "Because enums use zero memory",
            "Because enums cannot have methods"
          ],
          "correctOptionIndex": 1,
          "explanation": "Enum singletons are guaranteed by the JVM to be instantiated exactly once, cannot be instantiated via reflection constructor cracking, and handle serialization automatically."
        },
        {
          "id": "java-104-q2",
          "question": "Which GoF design pattern defines a family of algorithms, encapsulates each one, and makes them interchangeable at runtime?",
          "options": [
            "Observer Pattern",
            "Strategy Pattern",
            "Decorator Pattern",
            "Adapter Pattern"
          ],
          "correctOptionIndex": 1,
          "explanation": "The Strategy pattern encapsulates interchangeable algorithms (e.g. pricing formulas, route planning) behind a common interface."
        }
      ],
      "revisionNotes": [
        "Use single-element `enum` for thread-safe, reflection-proof singletons.",
        "The Strategy pattern enables swapping algorithms without violating Open/Closed Principle.",
        "Use `AtomicBoolean.compareAndSet()` for lightweight, lock-free resource reservation."
      ],
      "moduleId": "java-m8",
      "moduleNumber": 8,
      "moduleTitle": "Java Interview Preparation",
      "language": "java"
    },
    {
      "id": "java-105-big-o-revision",
      "topicNumber": 105,
      "title": "Big-O Complexity Quick Reference & Memory Calculations",
      "level": "Intermediate",
      "whyItMatters": "Having a rapid, razor-sharp mental reference of time and space complexity across all standard Java collection operations prevents blunders during interview complexity analysis.",
      "explanation": "1. Java Collections Complexity Cheat Sheet:\n- ArrayList:\n  - get(i): O(1)\n  - add(e): O(1) amortized, O(N) when resizing array (copying elements)\n  - add(i, e) / remove(i): O(N) due to array shifting (System.arraycopy)\n- LinkedList:\n  - get(i): O(N) traversal\n  - addFirst(e) / addLast(e): O(1)\n  - remove(e): O(N) to find + O(1) to unlink\n- ArrayDeque:\n  - push / pop / offer / poll: O(1) amortized on circular array\n- HashMap / HashSet:\n  - get / put / contains / remove: O(1) average; O(log N) worst-case (treeified bin)\n- TreeMap / TreeSet:\n  - get / put / contains / first / last: O(log N) guaranteed (Red-Black tree)\n- PriorityQueue:\n  - offer / poll: O(log N)\n  - peek: O(1)\n  - remove(Object): O(N) linear search + O(log N) heapify\n\n2. Memory Footprint Quick Calculations (64-bit JVM with Compressed Oops):\n- Object Header: 12-16 bytes (mark word + compressed klass pointer).\n- Boxed types:\n  - Integer: 24 bytes\n  - Long: 24 bytes\n  - String: 24 bytes header + 16 bytes byte[] header + N bytes\n- Node overhead in LinkedList: 24 bytes object header + 8 bytes prev + 8 bytes next + 8 bytes item = 48 bytes PER ELEMENT!",
      "syntaxAndStructure": "// Complexity Reference Table Summary:\n// Array lookup: O(1) | Binary Search: O(log N) | Sorting: O(N log N)\n// HashMap: O(1) avg / O(log N) worst | TreeMap: O(log N) guaranteed",
      "codeExamples": [
        {
          "title": "Illustrating LinkedList Node Overhead vs ArrayList",
          "code": "public class MemoryCalculationDemo {\n    public static void main(String[] args) {\n        int n = 1_000_000;\n\n        System.out.println(\"Memory footprint for 1,000,000 integers:\");\n        System.out.println(\"1. Primitive int[]: ~4 MB\");\n        System.out.println(\"2. ArrayList<Integer>: ~8 MB references + 24 MB Integer objects = ~32 MB\");\n        System.out.println(\"3. LinkedList<Integer>: ~48 MB Node objects + 24 MB Integer objects = ~72 MB\");\n        System.out.println(\"LinkedList consumes 18x more memory than a primitive array!\");\n    }\n}",
          "expectedOutput": "Memory footprint for 1,000,000 integers:\n1. Primitive int[]: ~4 MB\n2. ArrayList<Integer>: ~8 MB references + 24 MB Integer objects = ~32 MB\n3. LinkedList<Integer>: ~48 MB Node objects + 24 MB Integer objects = ~72 MB\nLinkedList consumes 18x more memory than a primitive array!",
          "explanation": "Shows the concrete memory cost of object headers and pointer dereferencing on modern 64-bit JVMs."
        },
        {
          "title": "Verifying Logarithmic vs Linear Performance with Large N",
          "code": "import java.util.*;\n\npublic class ComplexityVerificationDemo {\n    public static void main(String[] args) {\n        int n = 1_000_000;\n        int[] sorted = new int[n];\n        for (int i = 0; i < n; i++) sorted[i] = i * 2;\n\n        int target = 1_999_998; // Last element\n\n        // O(N) Linear scan\n        long start = System.nanoTime();\n        for (int i = 0; i < n; i++) {\n            if (sorted[i] == target) break;\n        }\n        long linearTime = System.nanoTime() - start;\n\n        // O(log N) Binary search\n        start = System.nanoTime();\n        Arrays.binarySearch(sorted, target);\n        long binaryTime = System.nanoTime() - start;\n\n        System.out.println(\"Linear scan time: \" + linearTime + \" ns\");\n        System.out.println(\"Binary search time: \" + binaryTime + \" ns\");\n    }\n}",
          "expectedOutput": "Linear scan time: 780100 ns\nBinary search time: 3800 ns",
          "explanation": "Binary search checks ~20 elements (log2(1,000,000) ~ 20) compared to 1,000,000 checks in linear search, demonstrating massive algorithmic speedup."
        }
      ],
      "realWorldApplications": [
        "Sizing JVM container heap limits for Kubernetes deployments based on expected concurrent object volume.",
        "Defending architectural choices during system design review meetings."
      ],
      "commonMistakes": [
        "Stating that PriorityQueue.remove(Object) is O(log N): finding the object requires an O(N) linear scan, making it O(N) overall.",
        "Assuming ArrayList never resizes: appending elements is O(1) amortized, but occasionally O(N) when allocating a 1.5x capacity array and copying.",
        "Assuming LinkedList.get(i) is O(1) because elements are linked: random access requires traversing i pointers (O(N))."
      ],
      "interviewRelevance": "Every technical interview requires accurate complexity justification for both time and auxiliary space.",
      "checkpoints": [
        {
          "id": "java-105-cp1",
          "label": "Memorize time complexities for ArrayList, LinkedList, HashMap, and TreeMap"
        },
        {
          "id": "java-105-cp2",
          "label": "Calculate 64-bit JVM object memory footprints including headers and references"
        },
        {
          "id": "java-105-cp3",
          "label": "Distinguish between worst-case and amortized time complexities"
        }
      ],
      "practiceExercises": [
        {
          "id": "java-105-ex1",
          "title": "Analyze PriorityQueue Method Complexities",
          "difficulty": "Beginner",
          "type": "conceptual",
          "prompt": "State the time complexity for: (1) pq.offer(e), (2) pq.peek(), (3) pq.poll(), (4) pq.remove(obj).",
          "solution": "1. pq.offer(e): O(log N) (sift-up heapify).\n2. pq.peek(): O(1) (root element inspection).\n3. pq.poll(): O(log N) (remove root and sift-down).\n4. pq.remove(obj): O(N) (linear scan to find object + O(log N) to sift).",
          "explanation": "Heap operations are logarithmic for insertions and removals at the root, but arbitrary element removal is linear."
        },
        {
          "id": "java-105-ex2",
          "title": "Estimate Primitive vs Boxed Heap Footprint",
          "difficulty": "Intermediate",
          "type": "conceptual",
          "prompt": "Calculate the approximate heap memory consumed by int[100,000] vs Integer[100,000] on a 64-bit JVM.",
          "solution": "- int[100,000]: 16-24 bytes array header + 100,000 * 4 bytes = ~400 KB.\n- Integer[100,000]: Array of references (24 bytes header + 100,000 * 8 bytes = ~800 KB) PLUS 100,000 separate Integer objects (each 24 bytes = 2.4 MB) = ~3.2 MB total (~8x more memory).",
          "explanation": "Boxed arrays store references pointing to heap objects, multiplying space requirements and destroying cache locality."
        },
        {
          "id": "java-105-ex3",
          "title": "Compare TreeMap vs HashMap Search Costs",
          "difficulty": "Advanced",
          "type": "conceptual",
          "prompt": "When would you deliberately choose TreeMap over HashMap despite its slower O(log N) vs O(1) performance?",
          "solution": "Choose TreeMap when you need:\n1. Sorted key order iteration (e.g. range queries via subMap(), tailMap(), headMap()).\n2. Finding nearest keys via ceilingKey(), floorKey(), higherKey(), lowerKey().\n3. Guaranteed worst-case O(log N) latency without hash collision spikes.",
          "explanation": "TreeMap provides sorted navigation and range extraction that hash maps cannot support."
        }
      ],
      "quizQuestions": [
        {
          "id": "java-105-q1",
          "question": "What is the worst-case time complexity of removing an arbitrary object using `PriorityQueue.remove(Object o)` in Java?",
          "options": [
            "O(1)",
            "O(log N)",
            "O(N)",
            "O(N log N)"
          ],
          "correctOptionIndex": 2,
          "explanation": "Finding the target object requires scanning the underlying array linearly (O(N)), followed by sift-up or sift-down (O(log N)), making the total time O(N)."
        },
        {
          "id": "java-105-q2",
          "question": "What is the growth factor of an `ArrayList` when its capacity is exceeded in OpenJDK / HotSpot JVM?",
          "options": [
            "1.5x (oldCapacity + (oldCapacity >> 1))",
            "2.0x (doubles capacity)",
            "Fixed increment of 16",
            "3.0x"
          ],
          "correctOptionIndex": 0,
          "explanation": "ArrayList grows by 50% (1.5x) using the bitwise formula: newCapacity = oldCapacity + (oldCapacity >> 1)."
        }
      ],
      "revisionNotes": [
        "ArrayList amortized append is O(1); arbitrary index insert/delete is O(N).",
        "HashMap operations are O(1) average; treeified worst-case is O(log N).",
        "PriorityQueue poll/offer is O(log N); arbitrary element removal is O(N)."
      ],
      "moduleId": "java-m8",
      "moduleNumber": 8,
      "moduleTitle": "Java Interview Preparation",
      "language": "java"
    },
    {
      "id": "java-106-readiness-assessment",
      "topicNumber": 106,
      "title": "Comprehensive Java Placement Readiness Assessment & Interview Strategy",
      "level": "Advanced",
      "whyItMatters": "Technical knowledge is half the battle; the other half is communication, structured problem breakdown, mock interview endurance, and behavioral alignment. This capstone prepares you for live campus placements and top-tier product company hiring bars.",
      "explanation": "1. The 5-Stage Live Coding Interview Framework:\n- Stage 1: Clarify Requirements (5 mins): Ask about constraints, data ranges, negative numbers, duplicates, and empty/null inputs.\n- Stage 2: Propose Solutions & Analyze Complexity (5-10 mins): Start with the brute-force baseline, then explain the optimized approach (time/space Big-O) BEFORE writing a single line of code. Confirm alignment with the interviewer.\n- Stage 3: Clean Implementation (15-20 mins): Write modular code with descriptive variable names. Speak aloud while typing to explain design decisions.\n- Stage 4: Dry Run & Edge Case Verification (5 mins): Walk through an example trace manually using a comment block. Test edge cases: empty list, single element, negative numbers, max/min values.\n- Stage 5: Follow-Up & Optimization (5 mins): Discuss how to scale if data doesn't fit in memory (external merge sort, distributed hashing).\n\n2. Behavioral Questions (The STAR Method):\n- Situation: \"At my previous project, we faced a high-latency issue with our payment service...\"\n- Task: \"My goal was to reduce API response time below 200ms without introducing caching inconsistencies...\"\n- Action: \"I profiled JVM allocations using VisualVM, identified duplicate database queries, introduced Redis caching with TTL, and refactored synchronous calls to CompletableFuture...\"\n- Result: \"P99 latency dropped by 65% and server throughput doubled under peak load.\"\n\n3. Final Placement Checklist:\n- Java fundamentals: OOP, JVM memory model, pass-by-value, exceptions, collections.\n- Core algorithms: Two pointers, sliding window, binary search, DFS/BFS, backtracking, DP.\n- Concurrency: volatile, AtomicInteger, ReentrantLock, ExecutorService.\n- Enterprise: JDBC, transactions, NIO.2, JUnit 5, Clean Architecture.",
      "syntaxAndStructure": "// The STAR response formula for behavioral questions:\n// S: Situation -> T: Task -> A: Action -> R: Result",
      "codeExamples": [
        {
          "title": "Live Interview Code Structure Template",
          "code": "public class InterviewProblemTemplate {\n    /**\n     * Problem: Find maximum subarray sum (Kadane's Algorithm)\n     * Constraints: 1 <= nums.length <= 10^5, -10^4 <= nums[i] <= 10^4\n     * Time Complexity: O(N) single pass\n     * Space Complexity: O(1) auxiliary space\n     */\n    public static int maxSubArray(int[] nums) {\n        // Defensive input validation\n        if (nums == null || nums.length == 0) {\n            throw new IllegalArgumentException(\"Input array must not be empty\");\n        }\n\n        int maxSoFar = nums[0];\n        int currentMax = nums[0];\n\n        for (int i = 1; i < nums.length; i++) {\n            // Kadane's decision: extend current subarray or start new subarray\n            currentMax = Math.max(nums[i], currentMax + nums[i]);\n            maxSoFar = Math.max(maxSoFar, currentMax);\n        }\n\n        return maxSoFar;\n    }\n\n    public static void main(String[] args) {\n        int[] test1 = {-2, 1, -3, 4, -1, 2, 1, -5, 4};\n        System.out.println(\"Max subarray sum: \" + maxSubArray(test1)); // Expected 6 ([4, -1, 2, 1])\n\n        int[] allNegative = {-5, -2, -8};\n        System.out.println(\"All negative max: \" + maxSubArray(allNegative)); // Expected -2\n    }\n}",
          "expectedOutput": "Max subarray sum: 6\nAll negative max: -2",
          "explanation": "Demonstrates professional interview code structure: comprehensive Javadoc with time/space complexity, input validation, and dry-run verification against standard and edge cases."
        },
        {
          "title": "Asynchronous Aggregation with CompletableFuture in Production",
          "code": "import java.util.concurrent.CompletableFuture;\n\npublic class ProductionInterviewDemo {\n    public static void main(String[] args) throws Exception {\n        // Parallel non-blocking service calls\n        CompletableFuture<String> userFuture = CompletableFuture.supplyAsync(() -> \"User(Alice)\");\n        CompletableFuture<Double> balanceFuture = CompletableFuture.supplyAsync(() -> 1250.50);\n\n        // Combine results\n        CompletableFuture<String> resultFuture = userFuture.thenCombine(\n            balanceFuture,\n            (user, bal) -> user + \" has balance: $\" + bal\n        );\n\n        System.out.println(resultFuture.get());\n    }\n}",
          "expectedOutput": "User(Alice) has balance: $1250.5",
          "explanation": "Using CompletableFuture.thenCombine() demonstrates modern asynchronous backend engineering skills expected in senior placement interviews."
        }
      ],
      "realWorldApplications": [
        "Acing on-campus placements and off-campus product company technical recruitment drives.",
        "Conducting effective code reviews and technical interviews as a senior software engineer."
      ],
      "commonMistakes": [
        "Starting to code immediately without clarifying requirements or constraints with the interviewer.",
        "Staying silent for minutes at a time instead of thinking aloud and explaining trade-offs.",
        "Failing to test edge cases manually before declaring \"I'm done!\"."
      ],
      "interviewRelevance": "This capstone synthesizes all 106 topics into a cohesive, high-impact interview execution strategy.",
      "checkpoints": [
        {
          "id": "java-106-cp1",
          "label": "Follow the 5-stage live coding interview communication framework"
        },
        {
          "id": "java-106-cp2",
          "label": "Structure behavioral answers using the STAR method with quantified results"
        },
        {
          "id": "java-106-cp3",
          "label": "Review the comprehensive 106-topic Java curriculum readiness checklist"
        }
      ],
      "practiceExercises": [
        {
          "id": "java-106-ex1",
          "title": "Prepare STAR Response for Conflict Resolution",
          "difficulty": "Beginner",
          "type": "conceptual",
          "prompt": "Draft a STAR-method answer for: \"Tell me about a time you had a technical disagreement with a teammate.\"",
          "solution": "Situation: During our microservice migration, a teammate wanted to use synchronous REST while I proposed asynchronous Kafka events.\nTask: We needed to agree on an architecture without delaying the project sprint.\nAction: I created a proof-of-concept benchmarking both under 5,000 req/sec load. We reviewed the latency graphs together objectively.\nResult: The data showed Kafka eliminated cascading timeouts. We adopted Kafka and deployed on schedule with zero outages.",
          "explanation": "STAR answers should emphasize objective data, collaboration, and constructive resolution over personal conflict."
        },
        {
          "id": "java-106-ex2",
          "title": "Dry Run and Edge Case Check",
          "difficulty": "Intermediate",
          "type": "conceptual",
          "prompt": "List 5 essential edge cases you should always verify when solving array and string interview problems.",
          "solution": "1. Empty input (length == 0) and null input.\n2. Single element array/string (N == 1).\n3. Array with all identical elements (e.g. [5, 5, 5]).\n4. Array containing extreme values (negative numbers, Integer.MIN_VALUE, Integer.MAX_VALUE).\n5. Already sorted or reverse-sorted input.",
          "explanation": "Systematically testing these 5 cases catches off-by-one errors and integer overflows before the interviewer points them out."
        },
        {
          "id": "java-106-ex3",
          "title": "Explain Scale-Up Strategy for Large Data",
          "difficulty": "Advanced",
          "type": "conceptual",
          "prompt": "How would you solve finding the median of 100 billion integers when the data cannot fit in JVM RAM?",
          "solution": "1. External Merge Sort: Chunk data into RAM-sized segments, sort each segment in memory, write to disk, and perform K-Way merge using PriorityQueue.\n2. Binary Search on Answer / Integer Bit Bucket Counting: Because integers have 32 bits, maintain an array of 2^16 (65,536) bucket counters on the upper 16 bits. Stream through all numbers to find which bucket contains the 50 billionth element, then repeat for the lower 16 bits of that bucket in RAM.",
          "explanation": "Demonstrating external sorting or bitwise bucket partitioning proves distributed computing readiness."
        }
      ],
      "quizQuestions": [
        {
          "id": "java-106-q1",
          "question": "What is the first step you should ALWAYS perform in a technical coding interview before writing code?",
          "options": [
            "Declare all variables and imports",
            "Clarify the problem requirements, constraints, input bounds, and edge cases with the interviewer",
            "Immediately type the brute-force solution",
            "Ask the interviewer what the optimal algorithm is"
          ],
          "correctOptionIndex": 1,
          "explanation": "Clarifying requirements prevents solving the wrong problem and demonstrates thoughtful engineering discipline."
        },
        {
          "id": "java-106-q2",
          "question": "In the STAR behavioral interview framework, what does the \"R\" stand for?",
          "options": [
            "Refactoring",
            "Result (quantified outcome of your actions)",
            "Review",
            "Recursion"
          ],
          "correctOptionIndex": 1,
          "explanation": "R stands for Result: the tangible, ideally quantified impact of your actions (e.g. reduced latency by 30%, increased test coverage to 85%)."
        }
      ],
      "revisionNotes": [
        "Follow the 5-stage interview framework: Clarify -> Propose -> Code -> Dry Run -> Follow-Up.",
        "Use the STAR method (Situation, Task, Action, Result) for all behavioral questions.",
        "You have mastered all 106 topics of the AK67 Java Placement Curriculum!"
      ],
      "moduleId": "java-m8",
      "moduleNumber": 8,
      "moduleTitle": "Java Interview Preparation",
      "language": "java"
    }
  ],
  "moduleAssessment": {
    "id": "java-m8-assessment",
    "title": "Module 8 Assessment: Java Interview Preparation",
    "passingScorePercentage": 80,
    "questions": [
      {
        "id": "java-96-q1",
        "question": "Does Java pass objects by reference or by value?",
        "options": [
          "By reference for all objects and by value for primitives",
          "Strictly by value for both primitives and objects (object reference pointers are copied by value)",
          "By reference when using the synchronized keyword",
          "By reference for Collections and by value for Arrays"
        ],
        "correctOptionIndex": 1,
        "explanation": "Java is strictly 100% pass-by-value. When an object is passed, a copy of the pointer address is passed by value."
      },
      {
        "id": "java-96-q2",
        "question": "Where are loaded class structures, method bytecode, and static variables stored in Java 8 and newer?",
        "options": [
          "Permanent Generation (PermGen)",
          "Metaspace (Native OS Memory)",
          "Thread Stack Memory",
          "CPU L1 Cache"
        ],
        "correctOptionIndex": 1,
        "explanation": "In Java 8, PermGen was completely removed and replaced by Metaspace, which allocates class metadata in off-heap native memory."
      },
      {
        "id": "java-97-q1",
        "question": "Under what condition will code inside a `finally` block NOT execute in Java?",
        "options": [
          "When an OutOfMemoryError is thrown",
          "When `System.exit(0)` is invoked in the try block or an OS-level process kill occurs",
          "When the try block contains an infinite while loop",
          "When the catch block re-throws an unhandled exception"
        ],
        "correctOptionIndex": 1,
        "explanation": "System.exit(0) immediately terminates the Java Virtual Machine process, bypassing all remaining code including finally blocks."
      },
      {
        "id": "java-97-q2",
        "question": "In what order do initializers execute during object instantiation in Java?",
        "options": [
          "Child static -> Parent static -> Child constructor -> Parent constructor",
          "Parent static -> Child static -> Parent instance & constructor -> Child instance & constructor",
          "Parent constructor -> Parent static -> Child constructor -> Child static",
          "All constructors run before any static initializers"
        ],
        "correctOptionIndex": 1,
        "explanation": "Static initializers run upon class loading from Parent to Child. Instance initializers and constructors run top-down from Parent to Child."
      },
      {
        "id": "java-98-q1",
        "question": "What is the required contract relationship between `equals()` and `hashCode()` in Java?",
        "options": [
          "If two objects have the same hashCode(), they must be equal according to equals()",
          "If two objects are equal according to equals(), they must produce the identical hashCode()",
          "hashCode() must always return a prime number",
          "Objects can only implement equals() if they implement Comparable"
        ],
        "correctOptionIndex": 1,
        "explanation": "The contract specifies: if a.equals(b) is true, then a.hashCode() == b.hashCode() must be true. The converse is not required due to hash collisions."
      },
      {
        "id": "java-98-q2",
        "question": "Why was `StringBuilder` introduced in Java 5 when `StringBuffer` already existed?",
        "options": [
          "Because StringBuffer could not handle Unicode characters",
          "Because StringBuffer is synchronized on every method call, imposing thread locking overhead; StringBuilder provides a faster, unsynchronized alternative for single-threaded use",
          "Because StringBuilder stores characters in native OS memory",
          "Because StringBuffer was deprecated"
        ],
        "correctOptionIndex": 1,
        "explanation": "StringBuffer incurs synchronization overhead on every append() call. StringBuilder provides identical functionality without synchronization for higher throughput."
      },
      {
        "id": "java-99-q1",
        "question": "Under what conditions does a HashMap bucket convert its elements from a linked list to a balanced Red-Black tree (TreeNode)?",
        "options": [
          "When the bucket has more than 2 elements",
          "When the number of colliding elements in that bucket reaches 8 AND total table capacity is at least 64",
          "Whenever a hash collision occurs",
          "Only when load factor reaches 1.0"
        ],
        "correctOptionIndex": 1,
        "explanation": "Java 8 HashMap treeifies a bin when its count reaches TREEIFY_THRESHOLD (8) and the table capacity is at least MIN_TREEIFY_CAPACITY (64). If capacity is < 64, it resizes the table instead."
      },
      {
        "id": "java-99-q2",
        "question": "What triggers a `ConcurrentModificationException` during collection iteration?",
        "options": [
          "Modifying elements using Iterator.remove()",
          "A mismatch between the iterator's expectedModCount and the collection's actual modCount caused by modifying the collection directly",
          "Reading from multiple threads without synchronization",
          "Inserting null values into a TreeSet"
        ],
        "correctOptionIndex": 1,
        "explanation": "Fail-fast iterators check if modCount == expectedModCount before every next() operation. If the collection was modified outside the iterator, the counts mismatch and CME is thrown."
      },
      {
        "id": "java-100-q1",
        "question": "What happens if a class implements two interfaces that declare identical default method signatures?",
        "options": [
          "The JVM picks the interface listed first in the implements clause",
          "The Java compiler produces an error requiring the subclass to explicitly override the method and resolve the ambiguity",
          "The method from the interface with the higher alphabetical name is chosen",
          "Both methods execute concurrently"
        ],
        "correctOptionIndex": 1,
        "explanation": "Java detects the conflict at compile-time and forces the implementer to explicitly override the method, avoiding runtime ambiguity."
      },
      {
        "id": "java-100-q2",
        "question": "Which capability is supported by abstract classes but NOT supported by modern interfaces in Java?",
        "options": [
          "Defining static methods",
          "Declaring private helper methods",
          "Declaring mutable instance variables (fields) and non-public constructors",
          "Providing default method implementations"
        ],
        "correctOptionIndex": 2,
        "explanation": "Interfaces cannot declare non-static instance fields or constructors. All interface fields are implicitly public static final constants."
      },
      {
        "id": "java-101-q1",
        "question": "Why does `volatile int count = 0; count++;` fail to be thread-safe in Java?",
        "options": [
          "Because volatile variables cannot be integers",
          "Because count++ consists of 3 distinct non-atomic operations (read, modify, write), allowing race conditions between concurrent threads",
          "Because volatile locks the CPU",
          "Because volatile variables cannot be modified after initialization"
        ],
        "correctOptionIndex": 1,
        "explanation": "volatile guarantees memory visibility, but does not provide atomicity for compound operations like count++."
      },
      {
        "id": "java-101-q2",
        "question": "Why must `wait()` always be invoked inside a `while` loop rather than an `if` block?",
        "options": [
          "To ensure compilation succeeds",
          "To defend against spurious wakeups where a thread wakes up without being signaled, and to re-verify the condition before proceeding",
          "Because if statements cannot access monitor locks",
          "To keep the thread running forever"
        ],
        "correctOptionIndex": 1,
        "explanation": "Threads can experience spurious wakeups without notify() being called. Re-checking the condition in a while loop ensures the thread only proceeds when the condition is genuinely true."
      },
      {
        "id": "java-102-q1",
        "question": "How is an object determined to be garbage in modern HotSpot JVMs?",
        "options": [
          "Using reference counting (reclaimed when reference count reaches 0)",
          "Using tracing reachability from GC Roots (objects that cannot be reached through any path of references from GC Roots are eligible for collection)",
          "Based on how long the object has existed in the heap",
          "Only when the application explicitly calls System.gc()"
        ],
        "correctOptionIndex": 1,
        "explanation": "HotSpot uses tracing reachability from GC Roots (stack variables, static references, JNI handles). Reference counting was abandoned due to its inability to collect circular references."
      },
      {
        "id": "java-102-q2",
        "question": "What is the primary architectural advantage of the Z Garbage Collector (ZGC)?",
        "options": [
          "It uses zero heap memory",
          "It guarantees sub-millisecond stop-the-world pause times regardless of heap size by performing reference processing concurrently using load barriers",
          "It eliminates the need for compilation",
          "It only runs on 32-bit JVMs"
        ],
        "correctOptionIndex": 1,
        "explanation": "ZGC performs virtually all GC phases (marking, relocation) concurrently with application threads, keeping pause times under 1 millisecond even on terabyte-sized heaps."
      },
      {
        "id": "java-103-q1",
        "question": "What does `map.computeIfAbsent(key, k -> new ArrayList<>()).add(val)` do if the key already exists in the map?",
        "options": [
          "It replaces the existing list with a new empty list and adds val",
          "It returns the existing list and appends val without creating a new list",
          "It throws DuplicateKeyException",
          "It does nothing"
        ],
        "correctOptionIndex": 1,
        "explanation": "If the key is already associated with a non-null value, computeIfAbsent simply returns that existing value without invoking the mapping function."
      },
      {
        "id": "java-103-q2",
        "question": "How do you instantiate a Max-Heap using `PriorityQueue` in Java?",
        "options": [
          "new PriorityQueue<>(Collections.reverseOrder())",
          "new PriorityQueue<>(Direction.MAX)",
          "new MaxPriorityQueue<>()",
          "new PriorityQueue<>(false)"
        ],
        "correctOptionIndex": 0,
        "explanation": "PriorityQueue defaults to a natural min-heap. Passing Collections.reverseOrder() or a descending comparator configures it as a max-heap."
      },
      {
        "id": "java-104-q1",
        "question": "Why does Joshua Bloch (Effective Java Item 3) recommend single-element `enum` as the best way to implement a Singleton in Java?",
        "options": [
          "Because enums compile to C++ code",
          "Because enums provide thread-safety, serialization guarantees, and immunity against reflection attacks out-of-the-box without boilerplate code",
          "Because enums use zero memory",
          "Because enums cannot have methods"
        ],
        "correctOptionIndex": 1,
        "explanation": "Enum singletons are guaranteed by the JVM to be instantiated exactly once, cannot be instantiated via reflection constructor cracking, and handle serialization automatically."
      },
      {
        "id": "java-104-q2",
        "question": "Which GoF design pattern defines a family of algorithms, encapsulates each one, and makes them interchangeable at runtime?",
        "options": [
          "Observer Pattern",
          "Strategy Pattern",
          "Decorator Pattern",
          "Adapter Pattern"
        ],
        "correctOptionIndex": 1,
        "explanation": "The Strategy pattern encapsulates interchangeable algorithms (e.g. pricing formulas, route planning) behind a common interface."
      },
      {
        "id": "java-105-q1",
        "question": "What is the worst-case time complexity of removing an arbitrary object using `PriorityQueue.remove(Object o)` in Java?",
        "options": [
          "O(1)",
          "O(log N)",
          "O(N)",
          "O(N log N)"
        ],
        "correctOptionIndex": 2,
        "explanation": "Finding the target object requires scanning the underlying array linearly (O(N)), followed by sift-up or sift-down (O(log N)), making the total time O(N)."
      },
      {
        "id": "java-105-q2",
        "question": "What is the growth factor of an `ArrayList` when its capacity is exceeded in OpenJDK / HotSpot JVM?",
        "options": [
          "1.5x (oldCapacity + (oldCapacity >> 1))",
          "2.0x (doubles capacity)",
          "Fixed increment of 16",
          "3.0x"
        ],
        "correctOptionIndex": 0,
        "explanation": "ArrayList grows by 50% (1.5x) using the bitwise formula: newCapacity = oldCapacity + (oldCapacity >> 1)."
      },
      {
        "id": "java-106-q1",
        "question": "What is the first step you should ALWAYS perform in a technical coding interview before writing code?",
        "options": [
          "Declare all variables and imports",
          "Clarify the problem requirements, constraints, input bounds, and edge cases with the interviewer",
          "Immediately type the brute-force solution",
          "Ask the interviewer what the optimal algorithm is"
        ],
        "correctOptionIndex": 1,
        "explanation": "Clarifying requirements prevents solving the wrong problem and demonstrates thoughtful engineering discipline."
      },
      {
        "id": "java-106-q2",
        "question": "In the STAR behavioral interview framework, what does the \"R\" stand for?",
        "options": [
          "Refactoring",
          "Result (quantified outcome of your actions)",
          "Review",
          "Recursion"
        ],
        "correctOptionIndex": 1,
        "explanation": "R stands for Result: the tangible, ideally quantified impact of your actions (e.g. reduced latency by 30%, increased test coverage to 85%)."
      }
    ]
  },
  "revisionQuestions": [
    "Prove that Java is strictly pass-by-value using reference pointers and explain String Constant Pool mechanics.",
    "What happens when a class inherits conflicting default methods from two interfaces, and how is it resolved?",
    "Why is volatile count++ not thread-safe, and how does AtomicInteger achieve atomic increments without locks?",
    "How do memory leaks occur in Java despite automatic garbage collection, and how do you prevent ThreadLocal leaks?",
    "Walk through the 5 stages of a live coding interview and how to structure behavioral answers using the STAR method."
  ]
};
