import { MasteryTopic, MasteryModule } from '@/types/mastery';

export const module5Topics: MasteryTopic[] = [
  {
    "id": "java-54-generics",
    "moduleId": "java-m5",
    "moduleNumber": 5,
    "moduleTitle": "Advanced Java",
    "topicNumber": 54,
    "title": "Generics, Type Safety & Type Erasure Mechanics",
    "language": "java",
    "level": "Intermediate",
    "whyItMatters": "Generics provide compile-time type safety, eliminating runtime ClassCastException and manual type casting. Understanding Type Erasure explains why generic arrays cannot be created directly and why primitive types cannot be used as type parameters.",
    "explanation": "Generics (introduced in Java 5) allow classes, interfaces, and methods to operate on parameterized types (`<T>`).\nCore Benefits:\n1. Strong Compile-Time Type Checking: The compiler verifies types before runtime, replacing runtime `ClassCastException` with compile errors.\n2. Elimination of Casts: `list.get(0)` returns `T` directly instead of requiring `(String) list.get(0)`.\n3. Reusable Generic Algorithms: Write once, apply across all reference types.\n\nType Erasure (How the JVM executes Generics):\nTo maintain 100% backward compatibility with pre-Java 5 legacy code, Java uses Type Erasure:\n- The compiler replaces all type parameters `<T>` with their bound (or `Object` if unbounded).\n- The compiler automatically inserts type casts where necessary in bytecode.\n- Bridge methods are generated to preserve polymorphism.\n- Consequence: At runtime, generic type information does NOT exist in the JVM bytecode (`List<String>` and `List<Integer>` share the exact same runtime `Class` object: `ArrayList.class`).\n- Because of Type Erasure, you CANNOT do: `new T()`, `new T[10]`, or `if (x instanceof T)`.",
    "syntaxAndStructure": "// Generic Class:\npublic class Box<T> {\n    private T item;\n    public void set(T item) { this.item = item; }\n    public T get() { return item; }\n}\n\n// Generic Method:\npublic static <E> void swap(E[] arr, int i, int j) {\n    E temp = arr[i];\n    arr[i] = arr[j];\n    arr[j] = temp;\n}",
    "codeExamples": [
      {
        "title": "Generic Box Class with Compile-Time Type Safety",
        "code": "public class GenericBoxDemo {\n    static class Box<T> {\n        private T value;\n        public Box(T val) { this.value = val; }\n        public T getValue() { return value; }\n        public void setValue(T val) { this.value = val; }\n    }\n\n    public static void main(String[] args) {\n        // Type-safe Integer box\n        Box<Integer> intBox = new Box<>(42);\n        int val = intBox.getValue(); // No explicit (Integer) cast required!\n        System.out.println(\"Integer Box value: \" + val);\n\n        // Type-safe String box\n        Box<String> strBox = new Box<>(\"Java 21\");\n        System.out.println(\"String Box value: \" + strBox.getValue());\n\n        // Proof of Type Erasure: both share identical runtime class\n        System.out.println(\"Same runtime class: \" + (intBox.getClass() == strBox.getClass()));\n    }\n}",
        "expectedOutput": "Integer Box value: 42\nString Box value: Java 21\nSame runtime class: true",
        "explanation": "Because of Type Erasure, both intBox and strBox compile down to raw Box holding Object fields at runtime, sharing Box.class."
      },
      {
        "title": "Generic Method with Multiple Type Parameters",
        "code": "public class GenericMethodDemo {\n    static class Pair<K, V> {\n        private final K key;\n        private final V value;\n        public Pair(K k, V v) { this.key = k; this.value = v; }\n        public K getKey() { return key; }\n        public V getValue() { return value; }\n        public String toString() { return key + \" = \" + value; }\n    }\n\n    // Generic static factory method\n    public static <K, V> Pair<K, V> of(K k, V v) {\n        return new Pair<>(k, v);\n    }\n\n    public static void main(String[] args) {\n        Pair<String, Integer> score = of(\"Aarav\", 98);\n        Pair<Integer, Boolean> flag = of(404, false);\n\n        System.out.println(\"Score: \" + score);\n        System.out.println(\"Status: \" + flag);\n    }\n}",
        "expectedOutput": "Score: Aarav = 98\nStatus: 404 = false",
        "explanation": "Generic methods define type parameters <K, V> before the return type, enabling type inference at the call site."
      }
    ],
    "realWorldApplications": [
      "Java Collections Framework (`List<T>`, `Map<K, V>`).",
      "ORM query abstractions (`Repository<T, ID>` in Spring Data JPA)."
    ],
    "commonMistakes": [
      "Trying to use primitive types in generics (e.g. `List<int>` is invalid; must use `List<Integer>`).",
      "Attempting to create generic arrays directly: `T[] arr = new T[10];` triggers a compile error.",
      "Attempting to create generic arrays (new T[10]) or checking instance of generic types at runtime due to Type Erasure."
    ],
    "interviewRelevance": "Universal interview question: \"What is Type Erasure in Java?\", \"Why can you not do `new T()`?\", and \"Why doesn't Java support primitive generics?\"",
    "checkpoints": [
      {
        "id": "java-54-cp-1",
        "label": "Explain the 3 phases of Type Erasure: bound replacement, type cast insertion, bridge methods"
      },
      {
        "id": "java-54-cp-2",
        "label": "Articulate why new T() and new T[] are illegal due to type erasure"
      },
      {
        "id": "java-54-generics-cp-3",
        "label": "Understand compile-time type safety and runtime JVM Type Erasure mechanics."
      }
    ],
    "practiceExercises": [
      {
        "id": "java-54-ex-1",
        "title": "Workaround for Creating Generic Array",
        "difficulty": "Beginner",
        "type": "coding",
        "prompt": "Show how ArrayList implements generic backing storage using Object[] with safe cast.",
        "solution": "public class GenericArrayWorkaround<T> {\n    private final Object[] items;\n    public GenericArrayWorkaround(int capacity) {\n        this.items = new Object[capacity];\n    }\n    @SuppressWarnings(\"unchecked\")\n    public T get(int index) {\n        return (T) items[index];\n    }\n    public void set(int index, T val) {\n        items[index] = val;\n    }\n    public static void main(String[] args) {\n        GenericArrayWorkaround<String> store = new GenericArrayWorkaround<>(5);\n        store.set(0, \"Safe Generic\");\n        System.out.println(\"Retrieved: \" + store.get(0));\n    }\n}",
        "explanation": "Backing with Object[] and casting at point of access is the standard internal technique used by ArrayList."
      },
      {
        "id": "java-54-ex-2",
        "title": "Reflection Instance Creation via Class<T>",
        "difficulty": "Intermediate",
        "type": "coding",
        "prompt": "Implement a generic factory createInstance(Class<T> clazz) that uses reflection to instantiate T safely.",
        "solution": "public class GenericFactory {\n    public static <T> T createInstance(Class<T> clazz) throws Exception {\n        return clazz.getDeclaredConstructor().newInstance();\n    }\n    public static void main(String[] args) throws Exception {\n        String s = createInstance(String.class);\n        System.out.println(\"String instantiated: \" + (s != null));\n    }\n}",
        "explanation": "Passing Class<T> (type token) preserves runtime type metadata, allowing reflection instantiation."
      },
      {
        "id": "java-54-ex-3",
        "title": "Synthetic Bridge Methods Under Type Erasure",
        "difficulty": "Advanced",
        "type": "conceptual",
        "prompt": "What is a \"bridge method\" generated by the Java compiler during type erasure and why is it necessary for polymorphism?",
        "solution": "Suppose class Node<T> has `void setData(T data)`. Under type erasure, its signature becomes `void setData(Object data)`. A subclass MyNode extends Node<Integer> and overrides `void setData(Integer data)`. Because the signatures differ (`Object` vs `Integer`), this would break polymorphism! To fix this, the Java compiler synthesizes a hidden \"bridge method\" `void setData(Object o) { setData((Integer) o); }` in MyNode to preserve dynamic method dispatch.",
        "explanation": "Bridge methods bridge the gap between erased superclass methods and specific subclass overrides."
      }
    ],
    "quizQuestions": [
      {
        "id": "java-54-q1",
        "question": "What happens to the generic type parameters (e.g. `<String>`) when Java code is compiled to bytecode?",
        "options": [
          "They are converted into C++ templates",
          "They undergo Type Erasure and are replaced by their bound (or Object), with compiler-inserted casts",
          "They remain strictly preserved in the bytecode for runtime inspection",
          "They are stored in the JVM Metaspace"
        ],
        "correctOptionIndex": 1,
        "explanation": "Type Erasure removes type parameters during compilation, replacing them with Object or upper bounds."
      },
      {
        "id": "java-54-q2",
        "question": "Why is `new T()` illegal inside a generic class `MyClass<T>`?",
        "options": [
          "Because T might be private",
          "Because at runtime, Type Erasure removes T, so the JVM does not know which constructor to invoke",
          "Because new is deprecated in generics",
          "Because T is always abstract"
        ],
        "correctOptionIndex": 1,
        "explanation": "At runtime, the JVM does not know what concrete type T represents due to Type Erasure, making direct instantiation impossible."
      }
    ],
    "revisionNotes": [
      "Generics provide compile-time type safety and eliminate explicit type casting.",
      "Type Erasure removes type parameters during compilation for backward compatibility.",
      "`new T()` and `new T[]` are prohibited due to type erasure."
    ]
  },
  {
    "id": "java-55-bounded-generics",
    "moduleId": "java-m5",
    "moduleNumber": 5,
    "moduleTitle": "Advanced Java",
    "topicNumber": 55,
    "title": "Bounded Generics: Upper Bounds & Multiple Type Bounds",
    "language": "java",
    "level": "Intermediate",
    "whyItMatters": "Unbounded generics allow any object, preventing you from calling mathematical or sorting methods. Bounded generics (`<T extends Number>`) restrict type parameters and unlock specific method APIs on generic instances.",
    "explanation": "Bounded type parameters limit the types that can be passed as type arguments:\n1. Upper Bounded Generics (`<T extends SuperType>`):\n   - Restricts `T` to be either `SuperType` or a subtype of `SuperType`.\n   - Unlocks the methods of `SuperType` inside the generic body. For example, `<T extends Number>` allows calling `t.doubleValue()` directly!\n   - Under type erasure, `T` is erased to the bound (`Number` instead of `Object`).\n2. Multiple Bounds (`<T extends ClassA & InterfaceB & InterfaceC>`):\n   - A type parameter can have multiple bounds.\n   - Rule: At most ONE class can be specified, and it MUST be listed FIRST. All subsequent bounds must be interfaces.\n   - Example: `<T extends Number & Comparable<T>>`.",
    "syntaxAndStructure": "// Upper Bound on Number:\npublic class NumericStats<T extends Number> {\n    private T[] data;\n    public double average() {\n        double sum = 0;\n        for (T num : data) sum += num.doubleValue(); // doubleValue() is accessible!\n        return sum / data.length;\n    }\n}\n\n// Multiple Bounds (Class first, then interfaces):\npublic <T extends Number & Comparable<T>> int compareValues(T a, T b) {\n    return a.compareTo(b);\n}",
    "codeExamples": [
      {
        "title": "Upper Bounded Number Calculator",
        "code": "public class BoundedGenericsDemo {\n    // T must be Number or any subclass of Number (Integer, Double, Long, etc.)\n    static class Calculator<T extends Number> {\n        public double sum(T a, T b) {\n            // Accessible because T extends Number\n            return a.doubleValue() + b.doubleValue();\n        }\n    }\n\n    public static void main(String[] args) {\n        Calculator<Integer> intCalc = new Calculator<>();\n        System.out.println(\"Integer sum: \" + intCalc.sum(10, 20));\n\n        Calculator<Double> doubleCalc = new Calculator<>();\n        System.out.println(\"Double sum: \" + doubleCalc.sum(15.5, 4.5));\n\n        // Calculator<String> bad = new Calculator<>(); // COMPILE ERROR: String is not a Number!\n    }\n}",
        "expectedOutput": "Integer sum: 30.0\nDouble sum: 20.0",
        "explanation": "Using <T extends Number> restricts the type parameter to numeric types and allows calling doubleValue() on instances of T."
      },
      {
        "title": "Multiple Bounds with Class and Comparable Interface",
        "code": "public class MultipleBoundsDemo {\n    // T must extend Number AND implement Comparable<T>\n    public static <T extends Number & Comparable<T>> T findMax(T a, T b) {\n        return a.compareTo(b) >= 0 ? a : b;\n    }\n\n    public static void main(String[] args) {\n        Integer maxInt = findMax(42, 85);\n        Double maxDouble = findMax(3.14, 2.71);\n\n        System.out.println(\"Max Integer: \" + maxInt);\n        System.out.println(\"Max Double: \" + maxDouble);\n    }\n}",
        "expectedOutput": "Max Integer: 85\nMax Double: 3.14",
        "explanation": "Multiple bounds <T extends Number & Comparable<T>> combine numeric capabilities with the compareTo() method contract."
      }
    ],
    "realWorldApplications": [
      "Mathematical libraries, statistical analyzers, and matrix manipulation engines.",
      "Sorting and priority queue implementations where elements must implement `Comparable`."
    ],
    "commonMistakes": [
      "Placing an interface before a class in multiple bounds (e.g. `<T extends Comparable & Number>` is invalid; class `Number` must be first).",
      "Using `super` in class type parameter declarations (e.g. `<T super Number>` is ILLEGAL; `super` is only valid in wildcards `<? super T>`).",
      "Attempting to add elements to a collection parameterized with an upper bound (? extends Number)."
    ],
    "interviewRelevance": "Frequent interview question: \"Can a type parameter have multiple bounds?\", \"What is the rule regarding classes and interfaces in multiple bounds?\", and \"Why does `<T super Integer>` not compile?\"",
    "checkpoints": [
      {
        "id": "java-55-cp-1",
        "label": "Use <T extends UpperBound> to unlock supertype methods inside generic classes"
      },
      {
        "id": "java-55-cp-2",
        "label": "Apply multiple bounds correctly: class first, followed by interfaces"
      },
      {
        "id": "java-55-bounded-generics-cp-3",
        "label": "Apply upper bounds (<T extends Number>) and multiple bounds (<T extends Comparable & Serializable>)."
      }
    ],
    "practiceExercises": [
      {
        "id": "java-55-ex-1",
        "title": "Generic Maximum Among Three Elements",
        "difficulty": "Beginner",
        "type": "coding",
        "prompt": "Write a generic method max(T a, T b, T c) where T extends Comparable<T>.",
        "solution": "public class MaxThree {\n    public static <T extends Comparable<T>> T max(T a, T b, T c) {\n        T max = a;\n        if (b.compareTo(max) > 0) max = b;\n        if (c.compareTo(max) > 0) max = c;\n        return max;\n    }\n    public static void main(String[] args) {\n        System.out.println(\"Max: \" + max(\"apple\", \"banana\", \"cherry\"));\n        System.out.println(\"Max int: \" + max(10, 50, 30));\n    }\n}",
        "explanation": "Bounding T to Comparable<T> enables calling compareTo on all three inputs."
      },
      {
        "id": "java-55-ex-2",
        "title": "Validate Multiple Bounds Syntax",
        "difficulty": "Intermediate",
        "type": "conceptual",
        "prompt": "Which of the following is valid and why: 1) <T extends Serializable & Number>, 2) <T extends Number & Serializable>, 3) <T extends Number & Thread>?",
        "solution": "1) Invalid: Interface (Serializable) is listed before class (Number).\n2) Valid: Class (Number) is first, followed by interface (Serializable).\n3) Invalid: Java prohibits multiple class inheritance; a type cannot extend two classes (Number and Thread).",
        "explanation": "Multiple bounds allow at most one class, which must be listed first."
      },
      {
        "id": "java-55-ex-3",
        "title": "Recursive Type Bound (Self-Referential Generics)",
        "difficulty": "Advanced",
        "type": "conceptual",
        "prompt": "Explain what recursive type bound `<T extends Comparable<T>>` means and why Enum<E extends Enum<E>> uses it.",
        "solution": "A recursive type bound is a type parameter bounded by an expression containing the type parameter itself. `<T extends Comparable<T>>` means that type T can only be compared to instances of type T (itself), preventing illegal cross-type comparisons like comparing an Integer to a String. `Enum<E extends Enum<E>>` guarantees that an enum constant can only be compared to constants of its own specific enum type.",
        "explanation": "Recursive type bounds enforce type-safe mutual comparison between identical subtypes."
      }
    ],
    "quizQuestions": [
      {
        "id": "java-55-q1",
        "question": "When declaring multiple bounds for a generic type parameter `<T extends A & B>`, what is the syntax rule regarding classes and interfaces?",
        "options": [
          "Interfaces must be listed before classes",
          "At most one class can be specified, and it MUST be listed first",
          "Multiple classes can be specified separated by &",
          "Only interfaces are allowed in multiple bounds"
        ],
        "correctOptionIndex": 1,
        "explanation": "Java allows at most one class in multiple bounds, and it must precede all interfaces."
      },
      {
        "id": "java-55-q2",
        "question": "Is `<T super Number>` a valid type parameter declaration for a generic class?",
        "options": [
          "Yes, it creates a lower-bounded generic class",
          "No, lower bounds (`super`) are only valid with wildcards (`<? super T>`), not type parameters",
          "Yes, in Java 17 and above",
          "Only in abstract classes"
        ],
        "correctOptionIndex": 1,
        "explanation": "Lower bounds using `super` are strictly prohibited in type parameter declarations (`<T>`); they are only permitted with wildcards (`<?>`)."
      }
    ],
    "revisionNotes": [
      "`<T extends Bound>` restricts T to subtypes of Bound and erases T to Bound.",
      "Multiple bounds syntax: `<T extends Class & Interface1 & Interface2>` (Class must be first).",
      "`super` is only valid with wildcards, never with type parameter declarations."
    ]
  },
  {
    "id": "java-56-wildcards",
    "moduleId": "java-m5",
    "moduleNumber": 5,
    "moduleTitle": "Advanced Java",
    "topicNumber": 56,
    "title": "Generic Wildcards: PECS Principle (Producer Extends, Consumer Super)",
    "language": "java",
    "level": "Intermediate",
    "whyItMatters": "Generics in Java are strictly invariant: `List<Integer>` is NOT a subtype of `List<Number>`. Wildcards (`?`) provide covariance (`? extends T`) and contravariance (`? super T`). The PECS mnemonic is universally tested in Java interviews.",
    "explanation": "1. Generics are Invariant:\n   Even though `Integer` is a subtype of `Number`, `List<Integer>` does NOT inherit from `List<Number>`! If it did, you could insert a `Double` into a `List<Number>` reference that actually points to `List<Integer>`, corrupting memory.\n2. Wildcards (`?`):\n   - Unbounded Wildcard `<?>`: Represents an unknown type. Read-only (can only read as `Object`; cannot add anything except `null`).\n   - Upper-Bounded Wildcard `<? extends T>`: Covariant. Accepts `T` or any subtype of `T`. Read-only (Producer: you can read `T` from it, but cannot add anything except `null`).\n   - Lower-Bounded Wildcard `<? super T>`: Contravariant. Accepts `T` or any supertype of `T`. Write-capable (Consumer: you can safely add `T` to it; reading returns `Object`).\n3. The PECS Principle (Joshua Bloch):\n   - **Producer Extends**: If your method reads/produces items from a collection, use `<? extends T>`.\n   - **Consumer Super**: If your method writes/consumes items into a collection, use `<? super T>`.\n   - If you both read and write, do not use wildcards; use an exact type `<T>`.",
    "syntaxAndStructure": "// Producer Extends (Reading only):\npublic double sum(List<? extends Number> list) {\n    double total = 0;\n    for (Number n : list) total += n.doubleValue(); // Safe to READ\n    // list.add(10); // COMPILE ERROR! Cannot write\n    return total;\n}\n\n// Consumer Super (Writing):\npublic void addIntegers(List<? super Integer> list) {\n    list.add(42); // Safe to WRITE Integer\n}",
    "codeExamples": [
      {
        "title": "Demonstrating the PECS Principle with Collections.copy",
        "code": "import java.util.ArrayList;\nimport java.util.List;\n\npublic class PECSDemo {\n    // Standard implementation pattern of Collections.copy(dest, src)\n    // dest CONSUMES elements (writes them) -> <? super T>\n    // src PRODUCES elements (reads them)   -> <? extends T>\n    public static <T> void copy(List<? super T> dest, List<? extends T> src) {\n        for (int i = 0; i < src.size(); i++) {\n            dest.set(i, src.get(i));\n        }\n    }\n\n    public static void main(String[] args) {\n        List<Number> destination = new ArrayList<>(List.of(0, 0, 0));\n        List<Integer> source = List.of(10, 20, 30);\n\n        // Works seamlessly: destination can hold Number, source produces Integer\n        copy(destination, source);\n        System.out.println(\"Destination after PECS copy: \" + destination);\n    }\n}",
        "expectedOutput": "Destination after PECS copy: [10, 20, 30]",
        "explanation": "PECS allows copying from a subtype source (List<Integer>) into a supertype destination (List<Number>) with complete type safety."
      },
      {
        "title": "Why You Cannot Write to <? extends T>",
        "code": "import java.util.ArrayList;\nimport java.util.List;\n\npublic class WildcardWriteRestrictionDemo {\n    public static void main(String[] args) {\n        List<Integer> intList = new ArrayList<>();\n        List<? extends Number> numList = intList; // Legal covariance assignment\n\n        // The compiler does NOT know whether numList points to List<Integer>, List<Double>, or List<Float>\n        // Therefore, it forbids inserting any object to prevent heap corruption:\n        // numList.add(10); // COMPILE ERROR: capture of ? extends Number\n\n        // The ONLY element allowed to be inserted into <? extends T> is null:\n        numList.add(null); // Legal!\n        System.out.println(\"numList allows reading as Number: \" + (numList.size() == 1));\n    }\n}",
        "expectedOutput": "numList allows reading as Number: true",
        "explanation": "Because the actual runtime subtype of <? extends Number> is unknown, the compiler blocks all additions (except null) to prevent type corruption."
      }
    ],
    "realWorldApplications": [
      "Library method signatures (e.g. `Collections.copy(List<? super T> dest, List<? extends T> src)`).",
      "Stream API collectors (e.g. `Collectors.toList()`, `Stream.filter(Predicate<? super T>)`)."
    ],
    "commonMistakes": [
      "Trying to add elements into a `List<? extends T>`, causing the infamous \"capture of ? extends T\" compiler error.",
      "Assuming `List<String>` can be passed to a method taking `List<Object>`; generics are invariant!",
      "Violating the PECS principle (Producer Extends, Consumer Super) when designing generic library APIs."
    ],
    "interviewRelevance": "Top-tier technical question: \"Explain the PECS rule with an example\", \"Why are Java generics invariant?\", and \"Why can you only add null to `List<? extends T>`?\"",
    "checkpoints": [
      {
        "id": "java-56-cp-1",
        "label": "Explain why generics are invariant: List<Integer> is NOT a List<Number>"
      },
      {
        "id": "java-56-cp-2",
        "label": "Apply PECS: Producer Extends for reading; Consumer Super for writing"
      },
      {
        "id": "java-56-wildcards-cp-3",
        "label": "Master the PECS guideline to provide maximum API flexibility to callers."
      }
    ],
    "practiceExercises": [
      {
        "id": "java-56-ex-1",
        "title": "Write Generic Print Method with Wildcard",
        "difficulty": "Beginner",
        "type": "coding",
        "prompt": "Write a method printList(List<?> list) that prints elements of any type separated by commas.",
        "solution": "import java.util.List;\n\npublic class WildcardPrint {\n    public static void printList(List<?> list) {\n        for (int i = 0; i < list.size(); i++) {\n            System.out.print(list.get(i) + (i < list.size() - 1 ? \", \" : \"\"));\n        }\n        System.out.println();\n    }\n    public static void main(String[] args) {\n        printList(List.of(\"A\", \"B\", \"C\"));\n        printList(List.of(1, 2, 3));\n    }\n}",
        "explanation": "List<?> accepts any list type for read-only traversal as Object."
      },
      {
        "id": "java-56-ex-2",
        "title": "Wildcard Capture and Helper Method",
        "difficulty": "Intermediate",
        "type": "coding",
        "prompt": "Write a method reorder(List<?> list) that swaps elements 0 and 1 using a private generic helper to capture the wildcard.",
        "solution": "import java.util.*;\n\npublic class WildcardCaptureHelper {\n    public static void swapFirstTwo(List<?> list) {\n        swapHelper(list); // Captures wildcard ? as T\n    }\n    private static <T> void swapHelper(List<T> list) {\n        T temp = list.get(0);\n        list.set(0, list.get(1));\n        list.set(1, temp);\n    }\n    public static void main(String[] args) {\n        List<String> items = new ArrayList<>(List.of(\"First\", \"Second\"));\n        swapFirstTwo(items);\n        System.out.println(\"Swapped: \" + items);\n    }\n}",
        "explanation": "A private generic helper method captures the unknown wildcard `?` into a concrete named type parameter `T`."
      },
      {
        "id": "java-56-ex-3",
        "title": "Filter Elements with Predicate<? super T>",
        "difficulty": "Advanced",
        "type": "coding",
        "prompt": "Demonstrate why java.util.function.Predicate should use `<? super T>` in a filter method so superclass predicates can be reused.",
        "solution": "import java.util.*;\nimport java.util.function.Predicate;\n\npublic class PredicateConsumerSuper {\n    public static <T> List<T> filter(List<T> list, Predicate<? super T> predicate) {\n        List<T> result = new ArrayList<>();\n        for (T item : list) {\n            if (predicate.test(item)) result.add(item);\n        }\n        return result;\n    }\n    public static void main(String[] args) {\n        List<Integer> numbers = List.of(-5, 10, -2, 20);\n        // Predicate on Object or Number can be applied to Integer because of <? super T>!\n        Predicate<Number> isPositive = n -> n.doubleValue() > 0;\n        System.out.println(\"Filtered: \" + filter(numbers, isPositive));\n    }\n}",
        "explanation": "`Predicate<? super T>` consumes T elements, allowing general supertype predicates to filter specific subtype collections."
      }
    ],
    "quizQuestions": [
      {
        "id": "java-56-q1",
        "question": "Under the PECS rule, what type of wildcard should you use if your method reads data from a collection parameter?",
        "options": [
          "<? super T>",
          "<? extends T>",
          "<T extends Object>",
          "<?>"
        ],
        "correctOptionIndex": 1,
        "explanation": "PECS: \"Producer Extends\". If the collection produces/reads items for your method, use `<? extends T>`."
      },
      {
        "id": "java-56-q2",
        "question": "Why does `List<Number> list = new ArrayList<Integer>();` fail to compile in Java?",
        "options": [
          "Because Integer is not a Number",
          "Because Java generics are invariant: List<Integer> is not a subtype of List<Number>",
          "Because ArrayList cannot hold Numbers",
          "Because of an out of memory error"
        ],
        "correctOptionIndex": 1,
        "explanation": "Generics are invariant. If allowed, you could put a Double into a List<Integer> via the List<Number> reference, destroying type safety."
      }
    ],
    "revisionNotes": [
      "Generics are invariant: `List<Integer>` is NOT a `List<Number>`.",
      "PECS: Producer Extends (read-only), Consumer Super (write-capable).",
      "Wildcards (`?`) provide covariance (`? extends T`) and contravariance (`? super T`)."
    ]
  },
  {
    "id": "java-57-functional-interfaces",
    "moduleId": "java-m5",
    "moduleNumber": 5,
    "moduleTitle": "Advanced Java",
    "topicNumber": 57,
    "title": "Functional Interfaces: SAM Contract & Built-in Functional Types",
    "language": "java",
    "level": "Intermediate",
    "whyItMatters": "Functional interfaces are the foundation of modern Java functional programming and the Stream API. Mastering `@FunctionalInterface` and the four core built-in types (Predicate, Function, Consumer, Supplier) is mandatory for writing modern, expressive code.",
    "explanation": "A `Functional Interface` (Single Abstract Method / SAM interface) is an interface that has EXACTLY ONE abstract method.\nKey Characteristics:\n1. Single Abstract Method: It can have any number of `default` or `static` methods, but only ONE abstract method.\n2. `@FunctionalInterface` Annotation: Optional, but strongly recommended. Instructs the compiler to enforce that the interface has exactly one abstract method, failing compilation if zero or >1 abstract methods exist.\n3. Java 8 Built-in Functional Interfaces (`java.util.function`):\n   - `Predicate<T>`: `boolean test(T t)` — Evaluates a condition; returns boolean.\n   - `Function<T, R>`: `R apply(T t)` — Transforms input of type T into output of type R.\n   - `Consumer<T>`: `void accept(T t)` — Consumes an input, performs side effects, returns void.\n   - `Supplier<T>`: `T get()` — Takes no arguments; supplies/produces a value of type T.\n   - Primitive specializations (`IntPredicate`, `LongConsumer`, `DoubleFunction`) avoid autoboxing overhead.",
    "syntaxAndStructure": "@FunctionalInterface\npublic interface Transformer<T, R> {\n    R transform(T input); // Exactly ONE abstract method\n    \n    default void log(T item) { System.out.println(\"Processing: \" + item); }\n}\n\n// Core Built-in Interfaces:\nPredicate<String> isLong = s -> s.length() > 5;\nFunction<String, Integer> lengthFunc = String::length;\nConsumer<String> printer = System.out::println;\nSupplier<Double> randomSupplier = Math::random;",
    "codeExamples": [
      {
        "title": "The Four Core Functional Interfaces in Action",
        "code": "import java.util.function.Consumer;\nimport java.util.function.Function;\nimport java.util.function.Predicate;\nimport java.util.function.Supplier;\n\npublic class FunctionalTypesDemo {\n    public static void main(String[] args) {\n        // 1. Predicate: T -> boolean\n        Predicate<Integer> isPassing = score -> score >= 60;\n        System.out.println(\"Is 75 passing: \" + isPassing.test(75));\n\n        // 2. Function: T -> R (transformation)\n        Function<String, Integer> wordLength = String::length;\n        System.out.println(\"Length of 'Placement': \" + wordLength.apply(\"Placement\"));\n\n        // 3. Consumer: T -> void (side effect)\n        Consumer<String> logger = msg -> System.out.println(\"[AUDIT] \" + msg);\n        logger.accept(\"Transaction verified.\");\n\n        // 4. Supplier: () -> T (lazy producer)\n        Supplier<String> tokenGenerator = () -> \"AUTH_\" + System.currentTimeMillis();\n        System.out.println(\"Generated token: \" + tokenGenerator.get().substring(0, 10) + \"...\");\n    }\n}",
        "expectedOutput": "Is 75 passing: true\nLength of 'Placement': 9\n[AUDIT] Transaction verified.\nGenerated token: AUTH_17...",
        "explanation": "Predicate tests conditions, Function maps inputs to outputs, Consumer consumes without returning, and Supplier lazily generates values."
      },
      {
        "title": "Chaining Predicates and Functions",
        "code": "import java.util.function.Function;\nimport java.util.function.Predicate;\n\npublic class FunctionalChainingDemo {\n    public static void main(String[] args) {\n        // Chaining Predicates (and, or, negate)\n        Predicate<String> nonNull = s -> s != null;\n        Predicate<String> notEmpty = s -> !s.trim().isEmpty();\n        Predicate<String> isValid = nonNull.and(notEmpty);\n\n        System.out.println(\"Valid check on 'AK67': \" + isValid.test(\"AK67\"));\n        System.out.println(\"Valid check on '  ': \" + isValid.test(\"  \"));\n\n        // Chaining Functions (andThen, compose)\n        Function<Integer, Integer> multiplyByTwo = x -> x * 2;\n        Function<Integer, Integer> addTen = x -> x + 10;\n\n        // andThen: multiply first, then add ten: (5 * 2) + 10 = 20\n        Function<Integer, Integer> pipeline = multiplyByTwo.andThen(addTen);\n        System.out.println(\"Pipeline (5 * 2) + 10: \" + pipeline.apply(5));\n    }\n}",
        "expectedOutput": "Valid check on 'AK67': true\nValid check on '  ': false\nPipeline (5 * 2) + 10: 20",
        "explanation": "Functional interfaces provide default methods (and, or, negate, andThen, compose) for constructing modular processing pipelines."
      }
    ],
    "realWorldApplications": [
      "Configuring Spring Security authorization filters using Predicate chains.",
      "Lazy evaluation in logging frameworks (`logger.debug(() -> expensiveComputation())`)."
    ],
    "commonMistakes": [
      "Adding a second abstract method to an interface marked `@FunctionalInterface`, causing an immediate compilation error.",
      "Using object wrappers like `Predicate<Integer>` in high-throughput loops instead of `IntPredicate`, triggering boxing overhead.",
      "Creating a custom functional interface without the @FunctionalInterface annotation, allowing future developers to add extra methods."
    ],
    "interviewRelevance": "Universal interview question: \"What is a Functional Interface?\", \"Explain Predicate vs Function vs Consumer vs Supplier\", and \"Can a functional interface have default methods?\"",
    "checkpoints": [
      {
        "id": "java-57-cp-1",
        "label": "Define SAM contract and explain role of @FunctionalInterface annotation"
      },
      {
        "id": "java-57-cp-2",
        "label": "Master the 4 core functional interfaces: Predicate, Function, Consumer, Supplier"
      },
      {
        "id": "java-57-functional-interfaces-cp-3",
        "label": "Differentiate the 4 core interfaces: Predicate, Function, Consumer, and Supplier."
      }
    ],
    "practiceExercises": [
      {
        "id": "java-57-ex-1",
        "title": "Custom Functional Interface with Generic Types",
        "difficulty": "Beginner",
        "type": "coding",
        "prompt": "Create a @FunctionalInterface TriFunction<T, U, V, R> that takes 3 inputs and produces a result R.",
        "solution": "@FunctionalInterface\ninterface TriFunction<T, U, V, R> {\n    R apply(T t, U u, V v);\n}\n\npublic class TriFunctionDemo {\n    public static void main(String[] args) {\n        TriFunction<String, Integer, Double, String> formatter = \n            (name, age, gpa) -> String.format(\"%s (Age: %d, GPA: %.1f)\", name, age, gpa);\n        System.out.println(formatter.apply(\"Alice\", 21, 3.9));\n    }\n}",
        "explanation": "Custom SAM interfaces can accept any number of type arguments while maintaining the single abstract method constraint."
      },
      {
        "id": "java-57-ex-2",
        "title": "BiPredicate for Validation Rules",
        "difficulty": "Intermediate",
        "type": "coding",
        "prompt": "Use a BiPredicate<String, Integer> to validate that a username length matches an expected length requirement.",
        "solution": "import java.util.function.BiPredicate;\n\npublic class BiPredicateDemo {\n    public static void main(String[] args) {\n        BiPredicate<String, Integer> hasExactLength = (str, len) -> str != null && str.length() == len;\n        System.out.println(\"Test 'Java' has length 4: \" + hasExactLength.test(\"Java\", 4));\n        System.out.println(\"Test 'Python' has length 4: \" + hasExactLength.test(\"Python\", 4));\n    }\n}",
        "explanation": "Bi-specializations (BiPredicate, BiFunction, BiConsumer) accept two inputs."
      },
      {
        "id": "java-57-ex-3",
        "title": "Object Methods in Functional Interfaces",
        "difficulty": "Advanced",
        "type": "conceptual",
        "prompt": "Why does an interface declaring `boolean equals(Object o)` in addition to an abstract method still qualify as a Functional Interface?",
        "solution": "Any abstract method declared in an interface that overrides a public method of `java.lang.Object` (such as `equals`, `hashCode`, or `toString`) does NOT count toward the interface's abstract method count! Because every class implementing the interface inherits a concrete implementation from Object, the method is guaranteed to be satisfied without custom subclass implementation.",
        "explanation": "Object methods are excluded from the SAM count in functional interfaces."
      }
    ],
    "quizQuestions": [
      {
        "id": "java-57-q1",
        "question": "Which functional interface in java.util.function takes a single argument of type T and returns a boolean?",
        "options": [
          "Function<T, Boolean>",
          "Predicate<T>",
          "Consumer<T>",
          "Supplier<Boolean>"
        ],
        "correctOptionIndex": 1,
        "explanation": "`Predicate<T>` defines `boolean test(T t)` and is the standard interface for condition evaluations."
      },
      {
        "id": "java-57-q2",
        "question": "Can a functional interface contain default and static methods?",
        "options": [
          "No, it must contain only abstract methods",
          "Yes, it can contain any number of default and static methods, as long as it has exactly one abstract method",
          "Only static methods are allowed",
          "Only default methods are allowed"
        ],
        "correctOptionIndex": 1,
        "explanation": "A functional interface requires exactly one abstract method. It can have unlimited default and static methods."
      }
    ],
    "revisionNotes": [
      "A Functional Interface has exactly one abstract method (SAM contract).",
      "Predicate: T -> boolean; Function: T -> R; Consumer: T -> void; Supplier: () -> T.",
      "`java.lang.Object` methods do not count toward the SAM limit."
    ]
  },
  {
    "id": "java-58-lambda-expressions",
    "moduleId": "java-m5",
    "moduleNumber": 5,
    "moduleTitle": "Advanced Java",
    "topicNumber": 58,
    "title": "Lambda Expressions: Syntax, Lexical Scoping & Effectively Final Variables",
    "language": "java",
    "level": "Intermediate",
    "whyItMatters": "Lambda expressions enable concise, inline implementation of functional interfaces without anonymous inner class boilerplate. Understanding variable capture and why local variables must be effectively final is essential for multi-threading safety.",
    "explanation": "A lambda expression is an anonymous function—a block of code with parameters and a body that can be passed around and executed.\nSyntax:\n`(parameters) -> expression` or `(parameters) -> { statements; }`\n\nKey Concepts:\n1. Target Typing: A lambda does NOT have an intrinsic type; its type is inferred by the compiler from the context (the functional interface it is assigned to).\n2. Lexical Scoping: A lambda does NOT introduce a new scope for variable names. `this` inside a lambda refers to the enclosing class instance, NOT the lambda itself (unlike anonymous inner classes).\n3. Variable Capture & Effectively Final:\n   - Lambdas can capture instance variables, static variables, and local variables.\n   - Rule: Any local variable captured by a lambda MUST be `final` or `effectively final` (never modified after initialization).\n   - Why? Local variables live on the thread call stack; lambdas can execute on other threads or after the method returns (allocated on the heap). The JVM copies the local variable value into the lambda object. If the variable could be modified, the stack and heap copies would become desynchronized, causing race conditions.",
    "syntaxAndStructure": "// Syntax variants:\n() -> System.out.println(\"Hello\");       // No args\nx -> x * 2;                                // Single arg, inferred type\n(int a, int b) -> a + b;                   // Multiple args, expression\n(a, b) -> {\n    System.out.println(\"Summing\");\n    return a + b;                          // Block body with return\n};",
    "codeExamples": [
      {
        "title": "Lambda Expression vs Anonymous Inner Class",
        "code": "public class LambdaVsInnerClassDemo {\n    public static void main(String[] args) {\n        // 1. Verbose Anonymous Inner Class\n        Runnable r1 = new Runnable() {\n            @Override\n            public void run() {\n                System.out.println(\"Running via anonymous inner class.\");\n            }\n        };\n\n        // 2. Concise Lambda Expression\n        Runnable r2 = () -> System.out.println(\"Running via concise lambda expression.\");\n\n        r1.run();\n        r2.run();\n    }\n}",
        "expectedOutput": "Running via anonymous inner class.\nRunning via concise lambda expression.",
        "explanation": "Lambdas eliminate 5 lines of boilerplate, compiling to invokedynamic instructions rather than generating separate .class files."
      },
      {
        "title": "Effectively Final Variable Capture Demonstration",
        "code": "public class EffectivelyFinalDemo {\n    public static void main(String[] args) {\n        String prefix = \"PL_2026\"; // Effectively final (never reassigned)\n\n        // Lambda captures local variable 'prefix'\n        java.util.function.Function<String, String> tagger = name -> prefix + \"_\" + name;\n\n        System.out.println(\"Tagged: \" + tagger.apply(\"Candidate\"));\n\n        // If you uncomment the line below, the code fails compilation because prefix is no longer effectively final!\n        // prefix = \"MUTATED\"; // Compile Error!\n    }\n}",
        "expectedOutput": "Tagged: PL_2026_Candidate",
        "explanation": "The captured local variable prefix must remain effectively final. Mutating it after capture causes a compile-time error."
      }
    ],
    "realWorldApplications": [
      "Event handlers in UI and asynchronous message listener callbacks.",
      "Declarative stream filtering and transformation pipelines."
    ],
    "commonMistakes": [
      "Attempting to reassign a captured local variable inside a lambda (e.g. `int count = 0; list.forEach(x -> count++);` fails to compile).",
      "Confusing `this` inside a lambda: in a lambda, `this` refers to the outer enclosing class instance, whereas in an anonymous inner class, `this` refers to the anonymous class itself.",
      "Attempting to mutate local variables from enclosing scopes within a lambda expression (must be effectively final)."
    ],
    "interviewRelevance": "Universal interview question: \"Why do local variables used in lambdas have to be final or effectively final?\", \"Difference between lambda and anonymous inner class\", and \"What is invokedynamic?\"",
    "checkpoints": [
      {
        "id": "java-58-cp-1",
        "label": "Explain the technical memory reason why captured local variables must be effectively final"
      },
      {
        "id": "java-58-cp-2",
        "label": "Differentiate lexical scoping of this in lambdas vs anonymous inner classes"
      },
      {
        "id": "java-58-lambda-expressions-cp-3",
        "label": "Write concise lambda expressions and understand invokedynamic bytecode mechanics."
      }
    ],
    "practiceExercises": [
      {
        "id": "java-58-ex-1",
        "title": "Workaround for Modifying Counter in Lambda",
        "difficulty": "Beginner",
        "type": "coding",
        "prompt": "Demonstrate how to count matching elements in a forEach lambda using AtomicInteger or a 1-element array to bypass the effectively final restriction.",
        "solution": "import java.util.*;\nimport java.util.concurrent.atomic.AtomicInteger;\n\npublic class LambdaCounterWorkaround {\n    public static void main(String[] args) {\n        List<String> list = List.of(\"A\", \"B\", \"A\", \"C\");\n        AtomicInteger count = new AtomicInteger(0);\n\n        list.forEach(s -> {\n            if (\"A\".equals(s)) count.incrementAndGet();\n        });\n\n        System.out.println(\"Count of 'A': \" + count.get());\n    }\n}",
        "explanation": "AtomicInteger reference is effectively final; mutating its internal heap state is allowed."
      },
      {
        "id": "java-58-ex-2",
        "title": "Lambda Comparator for Custom Objects",
        "difficulty": "Intermediate",
        "type": "coding",
        "prompt": "Sort a list of strings by their last character using an inline lambda expression.",
        "solution": "import java.util.*;\n\npublic class LastCharSort {\n    public static void main(String[] args) {\n        List<String> words = new ArrayList<>(List.of(\"banana\", \"apple\", \"fig\", \"zebra\"));\n        // Lambda comparator inspecting last character\n        words.sort((s1, s2) -> Character.compare(s1.charAt(s1.length() - 1), s2.charAt(s2.length() - 1)));\n        System.out.println(\"Sorted by last char: \" + words);\n    }\n}",
        "explanation": "Inline lambda (s1, s2) -> ... provides concise comparator definition without creating separate classes."
      },
      {
        "id": "java-58-ex-3",
        "title": "invokedynamic and Metafactory Compilation",
        "difficulty": "Advanced",
        "type": "conceptual",
        "prompt": "How does the JVM execute lambdas using invokedynamic and LambdaMetafactory instead of creating inner class files like Inner$1.class?",
        "solution": "Unlike anonymous inner classes that emit physical `.class` files on disk, lambdas compile to an `invokedynamic` (indy) opcode. On first execution, the JVM bootstrap method `LambdaMetafactory.metafactory()` generates a lightweight runtime call-site class in memory. Subsequent calls execute via direct method handles, drastically reducing classloading overhead, disk clutter, and memory footprint.",
        "explanation": "invokedynamic achieves high performance and zero disk artifact pollution for lambdas."
      }
    ],
    "quizQuestions": [
      {
        "id": "java-58-q1",
        "question": "What does the `this` keyword refer to inside a lambda expression?",
        "options": [
          "The lambda object itself",
          "The instance of the enclosing class in which the lambda is defined",
          "It is illegal and causes a compile error",
          "The functional interface being implemented"
        ],
        "correctOptionIndex": 1,
        "explanation": "Lambdas are lexically scoped. `this` inside a lambda refers to the enclosing class instance."
      },
      {
        "id": "java-58-q2",
        "question": "Why does Java require captured local variables in a lambda to be final or effectively final?",
        "options": [
          "Because local variables are stored in Metaspace",
          "Because lambdas copy the local variable value to the heap; allowing mutation would cause concurrency and memory desynchronization bugs",
          "Because the garbage collector cannot track mutable variables",
          "To make code run in single-threaded mode"
        ],
        "correctOptionIndex": 1,
        "explanation": "Captured primitives are copied by value from stack to heap. Requiring finality guarantees consistency across thread lifecycles."
      }
    ],
    "revisionNotes": [
      "Lambda syntax: `(parameters) -> expression` or `(parameters) -> { body }`.",
      "Captured local variables must be final or effectively final.",
      "Lambdas are compiled using `invokedynamic`, avoiding anonymous inner class overhead."
    ]
  },
  {
    "id": "java-59-method-references",
    "moduleId": "java-m5",
    "moduleNumber": 5,
    "moduleTitle": "Advanced Java",
    "topicNumber": 59,
    "title": "Method References: Static, Bound, Unbound & Constructor References",
    "language": "java",
    "level": "Intermediate",
    "whyItMatters": "Method references (`::`) provide even cleaner, more readable syntax than lambda expressions when a lambda merely calls an existing method. They are ubiquitous across the Stream API and modern Java codebases.",
    "explanation": "A method reference is a shorthand syntax for a lambda expression that executes an existing method by name.\nFour Kinds of Method References:\n1. Reference to a Static Method (`ClassName::staticMethod`):\n   - Lambda equivalent: `(args) -> ClassName.staticMethod(args)`\n   - Example: `Integer::parseInt`\n2. Reference to an Instance Method of a Particular Object / Bound (`instance::method`):\n   - Lambda equivalent: `(args) -> instance.method(args)`\n   - Example: `System.out::println`\n3. Reference to an Instance Method of an Arbitrary Object of a Particular Type / Unbound (`ClassName::instanceMethod`):\n   - Lambda equivalent: `(obj, args) -> obj.instanceMethod(args)`\n   - The first parameter becomes the target on which the method is called!\n   - Example: `String::length` (lambda: `(s) -> s.length()`)\n4. Reference to a Constructor (`ClassName::new`):\n   - Lambda equivalent: `(args) -> new ClassName(args)`\n   - Example: `ArrayList::new`",
    "syntaxAndStructure": "// 1. Static: ClassName::staticMethod\nFunction<String, Integer> f1 = Integer::parseInt;\n\n// 2. Bound Instance: instance::method\nConsumer<String> f2 = System.out::println;\n\n// 3. Unbound Instance: ClassName::instanceMethod\nFunction<String, String> f3 = String::toUpperCase; // s -> s.toUpperCase()\n\n// 4. Constructor: ClassName::new\nSupplier<List<String>> f4 = ArrayList::new;",
    "codeExamples": [
      {
        "title": "All Four Kinds of Method References Demonstrated",
        "code": "import java.util.ArrayList;\nimport java.util.List;\nimport java.util.function.Consumer;\nimport java.util.function.Function;\nimport java.util.function.Supplier;\n\npublic class MethodReferenceDemo {\n    public static void main(String[] args) {\n        // 1. Static Method Reference: Class::staticMethod\n        Function<String, Double> parseDouble = Double::parseDouble;\n        System.out.println(\"Parsed double: \" + parseDouble.apply(\"3.1415\"));\n\n        // 2. Bound Instance Method Reference: instance::instanceMethod\n        String prefix = \"OUTPUT: \";\n        Consumer<String> boundLogger = System.out::println;\n        boundLogger.accept(\"Bound logger active.\");\n\n        // 3. Unbound Instance Method Reference: Class::instanceMethod\n        Function<String, String> upper = String::toUpperCase;\n        System.out.println(\"Unbound upper: \" + upper.apply(\"placement 2026\"));\n\n        // 4. Constructor Reference: Class::new\n        Supplier<List<String>> listSupplier = ArrayList::new;\n        List<String> list = listSupplier.get();\n        list.add(\"Item\");\n        System.out.println(\"Constructor generated list: \" + list);\n    }\n}",
        "expectedOutput": "Parsed double: 3.1415\nBound logger active.\nUnbound upper: PLACEMENT 2026\nConstructor generated list: [Item]",
        "explanation": "Demonstrates static, bound instance, unbound instance, and constructor references matching functional interface signatures."
      },
      {
        "title": "Unbound vs Bound Instance Method Reference Disambiguation",
        "code": "import java.util.Arrays;\nimport java.util.List;\n\npublic class UnboundDisambiguationDemo {\n    public static void main(String[] args) {\n        List<String> names = Arrays.asList(\"Charlie\", \"Alice\", \"Bob\");\n\n        // String::compareToIgnoreCase is an UNBOUND instance method reference:\n        // Lambda equivalent: (s1, s2) -> s1.compareToIgnoreCase(s2)\n        names.sort(String::compareToIgnoreCase);\n\n        System.out.println(\"Sorted case-insensitive: \" + names);\n    }\n}",
        "expectedOutput": "Sorted case-insensitive: [Alice, Bob, Charlie]",
        "explanation": "In String::compareToIgnoreCase, the first argument s1 becomes the target invoking the method, and s2 is passed as the argument."
      }
    ],
    "realWorldApplications": [
      "Stream transformation mapping (e.g. `names.stream().map(String::trim).map(String::toUpperCase)`).",
      "Factory supplier patterns (`Optional.ofNullable(val).orElseGet(ArrayList::new)`)."
    ],
    "commonMistakes": [
      "Confusing bound instance references (`myObj::method`) with unbound references (`MyClass::method`).",
      "Attempting to use method references when parameters require modification or adaptation; use explicit lambdas instead.",
      "Confusing instance method references on arbitrary objects (String::length) with references on specific instances (System.out::println)."
    ],
    "interviewRelevance": "Common interview question: \"What are the four types of method references?\", \"How does an unbound method reference like String::length work?\", and \"Convert this lambda to a method reference.\"",
    "checkpoints": [
      {
        "id": "java-59-cp-1",
        "label": "Identify and convert all 4 types of method references to equivalent lambdas"
      },
      {
        "id": "java-59-cp-2",
        "label": "Explain how unbound method references map their first argument to the calling instance"
      },
      {
        "id": "java-59-method-references-cp-3",
        "label": "Map method reference styles (static, instance, constructor) to equivalent lambdas."
      }
    ],
    "practiceExercises": [
      {
        "id": "java-59-ex-1",
        "title": "Convert Lambdas to Method References",
        "difficulty": "Beginner",
        "type": "conceptual",
        "prompt": "Convert the following lambdas to method references: 1) s -> System.out.println(s), 2) str -> str.isEmpty(), 3) () -> new HashSet<>().",
        "solution": "1) System.out::println (Bound instance method reference)\n2) String::isEmpty (Unbound instance method reference)\n3) HashSet::new (Constructor reference)",
        "explanation": "Each lambda simply delegates parameters directly to an existing method or constructor."
      },
      {
        "id": "java-59-ex-2",
        "title": "Array Constructor Reference",
        "difficulty": "Intermediate",
        "type": "coding",
        "prompt": "Use an array constructor reference (String[]::new) with Stream.toArray() to convert a Stream<String> into a typed String[] array.",
        "solution": "import java.util.Arrays;\nimport java.util.stream.Stream;\n\npublic class ArrayConstructorDemo {\n    public static void main(String[] args) {\n        Stream<String> stream = Stream.of(\"Java\", \"Kotlin\", \"Scala\");\n        // String[]::new matches IntFunction<String[]>\n        String[] arr = stream.toArray(String[]::new);\n        System.out.println(\"Array length: \" + arr.length);\n        System.out.println(\"Array contents: \" + Arrays.toString(arr));\n    }\n}",
        "explanation": "String[]::new matches the IntFunction<A[]> required by stream.toArray() to construct a typed array."
      },
      {
        "id": "java-59-ex-3",
        "title": "Method Reference Overload Resolution Ambiguity",
        "difficulty": "Advanced",
        "type": "conceptual",
        "prompt": "When can a method reference cause compile-time ambiguity, and how does writing an explicit lambda resolve it?",
        "solution": "If a class has overloaded methods (e.g., `print(String)` and `print(Integer)`), and a method reference `obj::print` is assigned to a functional interface whose parameter types are generic or compatible with multiple overloads, the compiler cannot deduce which method is intended, throwing an ambiguous reference error. Writing an explicit lambda (e.g. `s -> obj.print((String) s)`) disambiguates the call site.",
        "explanation": "Explicit lambdas permit manual casting to break method reference overload ambiguity."
      }
    ],
    "quizQuestions": [
      {
        "id": "java-59-q1",
        "question": "What is the lambda equivalent of the unbound method reference `String::length`?",
        "options": [
          "() -> String.length()",
          "(String s) -> s.length()",
          "s -> String.length(s)",
          "() -> new String().length()"
        ],
        "correctOptionIndex": 1,
        "explanation": "For unbound instance references `ClassName::method`, the first lambda parameter becomes the object instance target: `(s) -> s.length()`."
      },
      {
        "id": "java-59-q2",
        "question": "Which syntax represents a constructor reference in Java?",
        "options": [
          "ClassName::construct",
          "ClassName::new",
          "new ClassName::get",
          "ClassName()::new"
        ],
        "correctOptionIndex": 1,
        "explanation": "Constructor references use the syntax `ClassName::new`."
      }
    ],
    "revisionNotes": [
      "Method references (`::`) provide compact syntax for lambdas executing existing methods.",
      "Four types: Static (`Class::static`), Bound (`instance::method`), Unbound (`Class::instanceMethod`), Constructor (`Class::new`).",
      "Unbound references use the first argument as the calling object target."
    ]
  },
  {
    "id": "java-60-stream-api",
    "moduleId": "java-m5",
    "moduleNumber": 5,
    "moduleTitle": "Advanced Java",
    "topicNumber": 60,
    "title": "Stream API Fundamentals: Creation, Pipelines & Lazy Evaluation",
    "language": "java",
    "level": "Intermediate",
    "whyItMatters": "The Stream API introduced functional-style declarative processing of sequences of elements. Streams eliminate clumsy imperative loops and support seamless parallel execution on multi-core processors.",
    "explanation": "A `Stream` represents a sequence of elements supporting sequential and parallel aggregate operations.\nCore Characteristics:\n1. Not a Data Structure: A stream does NOT store elements; it conveys elements from a source (collection, array, I/O channel) through a pipeline of computational steps.\n2. Non-Mutating: Stream operations never mutate the underlying source collection; they produce a new result or collection.\n3. Lazy Evaluation: Intermediate operations (filter, map) are lazy. They are NOT executed when defined; they are only evaluated when a Terminal Operation (collect, forEach, reduce) is invoked!\n4. Consumable Only Once: A stream can be traversed only once. Calling a terminal operation closes the stream; attempting to reuse it throws `IllegalStateException`.\n5. Stream Creation:\n   - From Collection: `collection.stream()`\n   - From Array: `Arrays.stream(arr)`\n   - Discrete Values: `Stream.of(\"a\", \"b\")`\n   - Infinite Streams: `Stream.iterate(0, n -> n + 2)` or `Stream.generate(Math::random)`\n   - Numeric Streams: `IntStream.range(1, 10)` avoids boxing.",
    "syntaxAndStructure": "// Stream Pipeline Structure:\n// Source -> Intermediate Operation(s) (Lazy) -> Terminal Operation (Eager)\n\nList<String> result = list.stream()\n    .filter(s -> s.startsWith(\"A\"))   // Intermediate (lazy)\n    .map(String::toUpperCase)         // Intermediate (lazy)\n    .collect(Collectors.toList());    // Terminal (triggers execution)",
    "codeExamples": [
      {
        "title": "Proof of Lazy Evaluation in Stream Pipelines",
        "code": "import java.util.List;\nimport java.util.stream.Stream;\n\npublic class StreamLazyEvaluationDemo {\n    public static void main(String[] args) {\n        List<String> names = List.of(\"Aarav\", \"Bob\", \"Ananya\", \"Charlie\");\n\n        System.out.println(\"Defining stream pipeline...\");\n        Stream<String> stream = names.stream()\n            .filter(name -> {\n                System.out.println(\"filter() called for: \" + name);\n                return name.startsWith(\"A\");\n            })\n            .map(name -> {\n                System.out.println(\"map() called for: \" + name);\n                return name.toUpperCase();\n            });\n\n        System.out.println(\"Stream defined. Notice NO execution happened above!\");\n        System.out.println(\"Invoking terminal operation findFirst():\");\n\n        // Terminal operation triggers execution: stops immediately after finding first match!\n        String first = stream.findFirst().orElse(\"None\");\n        System.out.println(\"First result: \" + first);\n    }\n}",
        "expectedOutput": "Defining stream pipeline...\nStream defined. Notice NO execution happened above!\nInvoking terminal operation findFirst():\nfilter() called for: Aarav\nmap() called for: Aarav\nFirst result: AARAV",
        "explanation": "Intermediate operations (filter, map) execute lazily only when findFirst() is triggered. Furthermore, it short-circuits: \"Bob\", \"Ananya\", and \"Charlie\" were never even inspected!"
      },
      {
        "title": "Demonstrating Single-Use Stream Closure",
        "code": "import java.util.List;\nimport java.util.stream.Stream;\n\npublic class StreamClosedDemo {\n    public static void main(String[] args) {\n        Stream<String> stream = Stream.of(\"Java\", \"Spring\", \"Docker\");\n\n        // First terminal operation consumes the stream\n        long count = stream.count();\n        System.out.println(\"Element count: \" + count);\n\n        // Attempting to reuse the closed stream throws IllegalStateException\n        try {\n            stream.forEach(System.out::println);\n        } catch (IllegalStateException e) {\n            System.out.println(\"Caught expected: stream has already been operated upon or closed!\");\n        }\n    }\n}",
        "expectedOutput": "Element count: 3\nCaught expected: stream has already been operated upon or closed!",
        "explanation": "A Stream can only be traversed once. After a terminal operation executes, the stream is closed and cannot be reused."
      }
    ],
    "realWorldApplications": [
      "Filtering, transforming, and grouping enterprise entity records from database queries.",
      "Data transformation pipelines in microservices processing JSON events."
    ],
    "commonMistakes": [
      "Trying to reuse a stream variable after invoking a terminal operation, causing `IllegalStateException`.",
      "Forgetting a terminal operation; without a terminal operation, intermediate operations will NEVER execute.",
      "Attempting to consume a Stream more than once, triggering IllegalStateException: stream has already been operated upon or closed."
    ],
    "interviewRelevance": "Universal interview question: \"What is the difference between intermediate and terminal operations?\", \"Why are streams lazy?\", and \"Can you reuse a stream?\"",
    "checkpoints": [
      {
        "id": "java-60-cp-1",
        "label": "Explain the 3 pipeline components: Source -> Intermediate Operations -> Terminal Operation"
      },
      {
        "id": "java-60-cp-2",
        "label": "Demonstrate lazy evaluation and short-circuit optimization"
      },
      {
        "id": "java-60-stream-api-cp-3",
        "label": "Construct declarative data processing pipelines with filter, map, and collect."
      }
    ],
    "practiceExercises": [
      {
        "id": "java-60-ex-1",
        "title": "Generate First N Even Numbers with IntStream",
        "difficulty": "Beginner",
        "type": "coding",
        "prompt": "Use IntStream.iterate to generate the first 5 even numbers and collect them into an array.",
        "solution": "import java.util.Arrays;\nimport java.util.stream.IntStream;\n\npublic class EvenStream {\n    public static void main(String[] args) {\n        int[] evens = IntStream.iterate(2, n -> n + 2)\n                               .limit(5)\n                               .toArray();\n        System.out.println(\"First 5 evens: \" + Arrays.toString(evens));\n    }\n}",
        "explanation": "IntStream.iterate with limit(5) creates an infinite stream bounded to 5 elements without boxing."
      },
      {
        "id": "java-60-ex-2",
        "title": "Stream Supplier Factory for Reusability",
        "difficulty": "Intermediate",
        "type": "coding",
        "prompt": "Write a Supplier<Stream<String>> pattern that allows recreating a stream pipeline repeatedly without IllegalStateException.",
        "solution": "import java.util.function.Supplier;\nimport java.util.stream.Stream;\n\npublic class StreamSupplierDemo {\n    public static void main(String[] args) {\n        Supplier<Stream<String>> streamSupplier = () -> Stream.of(\"Alpha\", \"Beta\", \"Gamma\");\n\n        // Safe re-use: each .get() call creates a fresh unconsumed stream!\n        streamSupplier.get().forEach(System.out::print);\n        System.out.println();\n        long count = streamSupplier.get().count();\n        System.out.println(\"Count: \" + count);\n    }\n}",
        "explanation": "A Supplier<Stream<T>> wraps stream creation, producing fresh streams on demand."
      },
      {
        "id": "java-60-ex-3",
        "title": "Spliterator Architecture in Streams",
        "difficulty": "Advanced",
        "type": "conceptual",
        "prompt": "What is a Spliterator in Java 8 and how does it enable parallel stream execution?",
        "solution": "A `Spliterator` (\"splittable iterator\") partitions a sequence of elements for parallel processing. It defines `tryAdvance()` to process elements sequentially and `trySplit()` to split off a portion of its elements into a second Spliterator. In parallel streams, the ForkJoinPool repeatedly calls `trySplit()` to partition data across worker threads until chunks are small enough to process in parallel.",
        "explanation": "Spliterators drive the parallel partition-and-conquer mechanism of parallel streams."
      }
    ],
    "quizQuestions": [
      {
        "id": "java-60-q1",
        "question": "What occurs if you call intermediate operations on a Stream without invoking a terminal operation?",
        "options": [
          "The operations execute in parallel",
          "Nothing happens; intermediate operations are lazy and never execute without a terminal operation",
          "The JVM throws an IllegalStateException",
          "The stream is saved to disk"
        ],
        "correctOptionIndex": 1,
        "explanation": "Intermediate stream operations are completely lazy and do not process any elements until a terminal operation is called."
      },
      {
        "id": "java-60-q2",
        "question": "What happens if you attempt to invoke a second terminal operation on an already consumed Stream?",
        "options": [
          "It rewinds to the beginning and re-executes",
          "It throws java.lang.IllegalStateException: stream has already been operated upon or closed",
          "It returns an empty result",
          "It executes on a new thread"
        ],
        "correctOptionIndex": 1,
        "explanation": "Streams in Java are single-use. Once operated upon by a terminal operation, they are permanently closed."
      }
    ],
    "revisionNotes": [
      "Streams do not store data and never mutate source collections.",
      "Intermediate operations are lazy; terminal operations trigger execution.",
      "A stream can be consumed only once."
    ]
  },
  {
    "id": "java-61-intermediate-stream-operations",
    "moduleId": "java-m5",
    "moduleNumber": 5,
    "moduleTitle": "Advanced Java",
    "topicNumber": 61,
    "title": "Intermediate Stream Operations: filter, map, flatMap, distinct & sorted",
    "language": "java",
    "level": "Intermediate",
    "whyItMatters": "Intermediate operations define the transformation logic of a stream. Mastering `flatMap` (flattening nested structures) vs `map` (1-to-1 transformation) is one of the most critical requirements in modern Java placement tests.",
    "explanation": "Intermediate operations return a new Stream and are lazily evaluated:\n1. `filter(Predicate<T>)`: Selects elements matching a boolean predicate.\n2. `map(Function<T, R>)`: One-to-one transformation: maps each element to exactly one new element (`Stream<T> -> Stream<R>`).\n3. `flatMap(Function<T, Stream<R>>)`: One-to-many transformation: flattens nested streams (e.g. `List<List<T>>` or nested objects) into a single continuous `Stream<R>`.\n4. `distinct()`: Removes duplicate elements using `equals()` and `hashCode()`.\n5. `sorted()`: Sorts elements using natural order or a custom `Comparator` (stateful operation).\n6. `peek(Consumer<T>)`: Non-intrusive action on elements, primarily used for debugging.\n7. `limit(n)` & `skip(n)`: Short-circuiting operations for pagination.\nStateless vs Stateful: `filter` and `map` are stateless (process element by element); `sorted` and `distinct` are stateful (must inspect all prior elements before passing downstream).",
    "syntaxAndStructure": "// filter and map:\nlist.stream().filter(s -> s.length() > 3).map(String::toUpperCase);\n\n// flatMap flattening lists of lists:\nList<List<String>> nested = List.of(List.of(\"A\", \"B\"), List.of(\"C\", \"D\"));\nList<String> flat = nested.stream().flatMap(Collection::stream).toList();",
    "codeExamples": [
      {
        "title": "map() vs flatMap() In-Depth Comparison",
        "code": "import java.util.List;\nimport java.util.stream.Collectors;\n\nclass Student {\n    String name;\n    List<String> subjects;\n    Student(String n, List<String> subs) { this.name = n; this.subjects = subs; }\n}\n\npublic class MapVsFlatMapDemo {\n    public static void main(String[] args) {\n        List<Student> students = List.of(\n            new Student(\"Alice\", List.of(\"Java\", \"DSA\")),\n            new Student(\"Bob\", List.of(\"Python\", \"Java\", \"SQL\"))\n        );\n\n        // 1. map(): 1-to-1 -> Produces Stream<List<String>> (nested lists)\n        List<List<String>> mapped = students.stream()\n            .map(s -> s.subjects)\n            .collect(Collectors.toList());\n        System.out.println(\"map() result (nested): \" + mapped);\n\n        // 2. flatMap(): 1-to-Many -> Flattens into a single Stream<String>\n        List<String> distinctSubjects = students.stream()\n            .flatMap(s -> s.subjects.stream()) // Flattens nested streams\n            .distinct()                         // Discards duplicates\n            .sorted()                           // Sorts alphabetically\n            .collect(Collectors.toList());\n        System.out.println(\"flatMap() result (flat & distinct): \" + distinctSubjects);\n    }\n}",
        "expectedOutput": "map() result (nested): [[Java, DSA], [Python, Java, SQL]]\nflatMap() result (flat & distinct): [DSA, Java, Python, SQL]",
        "explanation": "map() transforms Student to List<String>, preserving nested structure. flatMap() flattens each student's subject stream into a single unified stream."
      },
      {
        "title": "Pagination and Debugging with skip, limit, and peek",
        "code": "import java.util.List;\nimport java.util.stream.Collectors;\nimport java.util.stream.IntStream;\n\npublic class StreamPaginationDemo {\n    public static void main(String[] args) {\n        // Paginating: Page 2 with page size 3 (Skip first 3, take next 3)\n        List<Integer> page2 = IntStream.rangeClosed(1, 10)\n            .boxed()\n            .skip(3)                                    // Skip first 3 (1, 2, 3)\n            .limit(3)                                   // Take next 3 (4, 5, 6)\n            .peek(n -> System.out.println(\"Emitted: \" + n)) // Debug inspect\n            .collect(Collectors.toList());\n\n        System.out.println(\"Page 2 results: \" + page2);\n    }\n}",
        "expectedOutput": "Emitted: 4\nEmitted: 5\nEmitted: 6\nPage 2 results: [4, 5, 6]",
        "explanation": "skip(3) and limit(3) implement efficient pagination over streams. peek() allows non-destructive inspection of passing elements."
      }
    ],
    "realWorldApplications": [
      "Flattening order line items from multiple orders for invoice calculation using flatMap.",
      "Implementing server-side pagination for REST APIs using skip and limit."
    ],
    "commonMistakes": [
      "Using `map` when `flatMap` is required, resulting in awkward `List<List<T>>` or `Stream<Stream<T>>`.",
      "Using `peek()` for business side effects; `peek()` is intended for debugging and can be optimized away by the JVM if pipeline steps are omitted.",
      "Expecting intermediate operations (filter, map) to execute without invoking a terminal operation (lazy evaluation)."
    ],
    "interviewRelevance": "Universal interview question: \"What is the difference between map() and flatMap()?\", \"Stateless vs stateful stream operations\", and \"How do you flatten a 2D array using streams?\"",
    "checkpoints": [
      {
        "id": "java-61-cp-1",
        "label": "Differentiate map (1-to-1) from flatMap (1-to-many flattening)"
      },
      {
        "id": "java-61-cp-2",
        "label": "Classify stateless (filter, map) vs stateful (sorted, distinct) operations"
      },
      {
        "id": "java-61-intermediate-stream-operations-cp-3",
        "label": "Apply intermediate operations: filter, map, flatMap, distinct, sorted, and peek."
      }
    ],
    "practiceExercises": [
      {
        "id": "java-61-ex-1",
        "title": "Flatten 2D Array of Strings",
        "difficulty": "Beginner",
        "type": "coding",
        "prompt": "Flatten a String[][] 2D array into a single List<String> using Arrays.stream and flatMap.",
        "solution": "import java.util.*;\n\npublic class Flatten2DArray {\n    public static void main(String[] args) {\n        String[][] matrix = { {\"A\", \"B\"}, {\"C\", \"D\"}, {\"E\"} };\n        List<String> flatList = Arrays.stream(matrix)\n                                      .flatMap(Arrays::stream)\n                                      .toList();\n        System.out.println(\"Flat list: \" + flatList);\n    }\n}",
        "explanation": "Arrays.stream(matrix) emits Stream<String[]>, which flatMap(Arrays::stream) flattens into Stream<String>."
      },
      {
        "id": "java-61-ex-2",
        "title": "Extract Unique Words from Sentences",
        "difficulty": "Intermediate",
        "type": "coding",
        "prompt": "Given a list of sentences, return a sorted list of unique lowercase words.",
        "solution": "import java.util.*;\n\npublic class UniqueWords {\n    public static void main(String[] args) {\n        List<String> sentences = List.of(\"Java is powerful\", \"clean code in Java\");\n        List<String> words = sentences.stream()\n            .flatMap(s -> Arrays.stream(s.split(\" \")))\n            .map(String::toLowerCase)\n            .distinct()\n            .sorted()\n            .toList();\n        System.out.println(\"Unique sorted words: \" + words);\n    }\n}",
        "explanation": "Splitting sentences into word arrays and flattening them with flatMap extracts individual tokens."
      },
      {
        "id": "java-61-ex-3",
        "title": "Stateful Operation Performance Bottlenecks",
        "difficulty": "Advanced",
        "type": "conceptual",
        "prompt": "Why do stateful operations like sorted() break parallel stream efficiency on infinite or large streams?",
        "solution": "Stateless operations (filter, map) can process elements independently in parallel chunks across CPU cores. However, stateful operations (like `sorted()`) cannot emit a single element until they have buffered and inspected the ENTIRE stream from all threads. On an infinite stream, `sorted()` blocks forever and throws an OutOfMemoryError. On large parallel streams, it forces all parallel worker threads to synchronize at a global barrier, destroying parallel speedup.",
        "explanation": "sorted() requires global buffering of all elements before emitting any output."
      }
    ],
    "quizQuestions": [
      {
        "id": "java-61-q1",
        "question": "When should you use `flatMap()` instead of `map()`?",
        "options": [
          "When you need to sort elements",
          "When each element maps to a collection or Stream, and you want to flatten them into a single continuous stream",
          "When working only with integers",
          "To make the stream parallel"
        ],
        "correctOptionIndex": 1,
        "explanation": "`flatMap` transforms each element into a stream of values and flattens all resulting streams into one unified stream."
      },
      {
        "id": "java-61-q2",
        "question": "Which of the following intermediate stream operations is STATEFUL?",
        "options": [
          "filter()",
          "map()",
          "sorted()",
          "peek()"
        ],
        "correctOptionIndex": 2,
        "explanation": "`sorted()` is stateful because it must inspect and buffer all elements before it can emit any elements in order."
      }
    ],
    "revisionNotes": [
      "`map`: 1-to-1 transformation (`T -> R`).",
      "`flatMap`: 1-to-many flattening (`T -> Stream<R>`).",
      "Stateless operations (filter, map) process elements independently; stateful operations (sorted, distinct) buffer elements."
    ]
  },
  {
    "id": "java-62-terminal-stream-operations",
    "moduleId": "java-m5",
    "moduleNumber": 5,
    "moduleTitle": "Advanced Java",
    "topicNumber": 62,
    "title": "Terminal Operations: collect, reduce, groupingBy & Partitioning",
    "language": "java",
    "level": "Intermediate",
    "whyItMatters": "Terminal operations produce the final result of a stream pipeline. Mastering `reduce` for aggregations and `Collectors.groupingBy` for complex multi-level aggregations is essential for enterprise backend development.",
    "explanation": "A terminal operation executes the pipeline and closes the stream:\n1. Reduction Operations:\n   - `reduce(identity, accumulator)`: Combines elements into a single summary result (e.g. sum, product, string concatenation).\n   - `count()`, `min()`, `max()`, `sum()` (on numeric streams).\n2. Short-Circuiting Terminal Operations:\n   - `anyMatch(Predicate)`: Returns true as soon as one element matches.\n   - `allMatch(Predicate)` / `noneMatch(Predicate)`.\n   - `findFirst()` / `findAny()`.\n3. The `collect()` Operation & `java.util.stream.Collectors`:\n   - `toList()` (Java 16+) / `Collectors.toList()`\n   - `Collectors.toSet()`, `Collectors.toMap(keyMapper, valMapper)`\n   - `Collectors.joining(delimiter)`\n   - `Collectors.groupingBy(classifier)`: Groups elements by a key (like SQL `GROUP BY`), returning a `Map<K, List<V>>`.\n   - `Collectors.partitioningBy(predicate)`: Partitions elements into two groups (`true` and `false`), returning `Map<Boolean, List<V>>`.",
    "syntaxAndStructure": "// reduce:\nint sum = numbers.stream().reduce(0, (a, b) -> a + b);\n\n// groupingBy (SQL GROUP BY equivalent):\nMap<Department, List<Employee>> byDept = employees.stream()\n    .collect(Collectors.groupingBy(Employee::getDepartment));\n\n// partitioningBy (Binary boolean partition):\nMap<Boolean, List<Student>> passed = students.stream()\n    .collect(Collectors.partitioningBy(s -> s.getScore() >= 60));",
    "codeExamples": [
      {
        "title": "Advanced Grouping and Downstream Aggregations",
        "code": "import java.util.List;\nimport java.util.Map;\nimport java.util.stream.Collectors;\n\nclass Worker {\n    String name;\n    String department;\n    double salary;\n    Worker(String n, String d, double s) { this.name = n; this.department = d; this.salary = s; }\n}\n\npublic class CollectorsGroupingDemo {\n    public static void main(String[] args) {\n        List<Worker> team = List.of(\n            new Worker(\"Alice\", \"Engineering\", 120000),\n            new Worker(\"Bob\", \"HR\", 75000),\n            new Worker(\"Charlie\", \"Engineering\", 110000),\n            new Worker(\"David\", \"HR\", 80000),\n            new Worker(\"Eve\", \"Marketing\", 95000)\n        );\n\n        // 1. Grouping by department: Map<String, List<Worker>>\n        Map<String, List<Worker>> byDept = team.stream()\n            .collect(Collectors.groupingBy(w -> w.department));\n        System.out.println(\"Engineering count: \" + byDept.get(\"Engineering\").size());\n\n        // 2. Downstream Collector: Average salary per department\n        Map<String, Double> avgSalaryPerDept = team.stream()\n            .collect(Collectors.groupingBy(\n                w -> w.department,\n                Collectors.averagingDouble(w -> w.salary)\n            ));\n        System.out.printf(\"Avg Engineering Salary: $%.2f%n\", avgSalaryPerDept.get(\"Engineering\"));\n        System.out.printf(\"Avg HR Salary: $%.2f%n\", avgSalaryPerDept.get(\"HR\"));\n    }\n}",
        "expectedOutput": "Engineering count: 2\nAvg Engineering Salary: $115000.00\nAvg HR Salary: $77500.00",
        "explanation": "Collectors.groupingBy accepts downstream collectors like averagingDouble, performing multi-dimensional aggregation in a single pass."
      },
      {
        "title": "PartitioningBy and Custom Reduce Calculation",
        "code": "import java.util.List;\nimport java.util.Map;\nimport java.util.stream.Collectors;\n\npublic class ReduceAndPartitionDemo {\n    public static void main(String[] args) {\n        List<Integer> numbers = List.of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);\n\n        // 1. reduce: Multiplies all numbers (factorial of 5)\n        int product = numbers.subList(0, 5).stream()\n            .reduce(1, (acc, n) -> acc * n);\n        System.out.println(\"Factorial of 5 via reduce: \" + product);\n\n        // 2. partitioningBy: Splits into Even (true) and Odd (false)\n        Map<Boolean, List<Integer>> evenOdd = numbers.stream()\n            .collect(Collectors.partitioningBy(n -> n % 2 == 0));\n\n        System.out.println(\"Evens (true): \" + evenOdd.get(true));\n        System.out.println(\"Odds (false): \" + evenOdd.get(false));\n    }\n}",
        "expectedOutput": "Factorial of 5 via reduce: 120\nEvens (true): [2, 4, 6, 8, 10]\nOdds (false): [1, 3, 5, 7, 9]",
        "explanation": "reduce combines elements with an identity accumulator. partitioningBy splits elements into two boolean partitions."
      }
    ],
    "realWorldApplications": [
      "Generating payroll summary reports grouped by department and job title.",
      "Constructing frequency maps and histograms from raw log event streams."
    ],
    "commonMistakes": [
      "Using `Collectors.toMap` without a merge function when duplicate keys exist, causing an `IllegalStateException: Duplicate key`.",
      "Using `reduce` with a mutable accumulator instead of `collect`, creating expensive temporary objects.",
      "Using parallel streams for small data sets or tasks with blocking I/O, degrading performance through thread pool saturation."
    ],
    "interviewRelevance": "Universal interview question: \"Explain Collectors.groupingBy vs partitioningBy\", \"How does reduce work?\", and \"How do you avoid duplicate key errors in Collectors.toMap?\"",
    "checkpoints": [
      {
        "id": "java-62-cp-1",
        "label": "Use Collectors.groupingBy with downstream collectors (counting, averaging, mapping)"
      },
      {
        "id": "java-62-cp-2",
        "label": "Apply reduce(identity, accumulator) for custom aggregation computations"
      },
      {
        "id": "java-62-terminal-stream-operations-cp-3",
        "label": "Aggregate stream results using reduce, collect, groupingBy, and partitioningBy."
      }
    ],
    "practiceExercises": [
      {
        "id": "java-62-ex-1",
        "title": "String Joining with Delimiter, Prefix, and Suffix",
        "difficulty": "Beginner",
        "type": "coding",
        "prompt": "Join a list of strings into a formatted CSV string \"[A, B, C]\" using Collectors.joining().",
        "solution": "import java.util.List;\nimport java.util.stream.Collectors;\n\npublic class JoiningDemo {\n    public static void main(String[] args) {\n        List<String> list = List.of(\"A\", \"B\", \"C\");\n        String formatted = list.stream().collect(Collectors.joining(\", \", \"[\", \"]\"));\n        System.out.println(\"Joined: \" + formatted);\n    }\n}",
        "explanation": "Collectors.joining(delimiter, prefix, suffix) formats structured strings cleanly."
      },
      {
        "id": "java-62-ex-2",
        "title": "Safe toMap with Merge Function",
        "difficulty": "Intermediate",
        "type": "coding",
        "prompt": "Convert a list of strings into a map of FirstLetter -> Word, resolving duplicate keys by keeping the longer string.",
        "solution": "import java.util.*;\nimport java.util.stream.Collectors;\n\npublic class SafeToMap {\n    public static void main(String[] args) {\n        List<String> words = List.of(\"apple\", \"apricot\", \"banana\", \"blueberry\");\n        Map<Character, String> map = words.stream()\n            .collect(Collectors.toMap(\n                s -> s.charAt(0),\n                s -> s,\n                (existing, incoming) -> incoming.length() > existing.length() ? incoming : existing\n            ));\n        System.out.println(\"Resolved map: \" + map);\n    }\n}",
        "explanation": "The merge function (existing, incoming) -> ... resolves duplicate key collisions safely."
      },
      {
        "id": "java-62-ex-3",
        "title": "Custom Collector Implementation",
        "difficulty": "Advanced",
        "type": "coding",
        "prompt": "Implement a custom Collector using Collector.of() that collects integers into an immutable custom container.",
        "solution": "import java.util.ArrayList;\nimport java.util.Collections;\nimport java.util.List;\nimport java.util.stream.Collector;\n\npublic class CustomCollectorDemo {\n    public static void main(String[] args) {\n        Collector<Integer, List<Integer>, List<Integer>> unmodifiableListCollector = Collector.of(\n            ArrayList::new,                  // Supplier\n            List::add,                       // Accumulator\n            (left, right) -> { left.addAll(right); return left; }, // Combiner\n            Collections::unmodifiableList    // Finisher\n        );\n        List<Integer> result = List.of(1, 2, 3).stream().collect(unmodifiableListCollector);\n        System.out.println(\"Result: \" + result);\n    }\n}",
        "explanation": "Collector.of() defines supplier, accumulator, combiner, and finisher functions explicitly."
      }
    ],
    "quizQuestions": [
      {
        "id": "java-62-q1",
        "question": "What type does `Collectors.partitioningBy(Predicate)` always return as the map keys?",
        "options": [
          "String",
          "Integer",
          "Boolean",
          "Object"
        ],
        "correctOptionIndex": 2,
        "explanation": "`partitioningBy` partitions elements into two groups: `Boolean.TRUE` (matching predicate) and `Boolean.FALSE` (non-matching)."
      },
      {
        "id": "java-62-q2",
        "question": "What happens if you use `Collectors.toMap(keyMapper, valueMapper)` without a merge function and duplicate keys are encountered?",
        "options": [
          "The older value is silently overwritten",
          "The new value is discarded",
          "It throws an IllegalStateException: Duplicate key",
          "It converts the value into a List"
        ],
        "correctOptionIndex": 2,
        "explanation": "Without a merge function, duplicate keys cause an immediate IllegalStateException."
      }
    ],
    "revisionNotes": [
      "Terminal operations execute the pipeline and close the stream.",
      "`Collectors.groupingBy` maps elements into multi-value groups (`Map<K, List<V>>`).",
      "`Collectors.partitioningBy` splits elements into two boolean groups (`Map<Boolean, List<V>>`)."
    ]
  },
  {
    "id": "java-63-optional",
    "moduleId": "java-m5",
    "moduleNumber": 5,
    "moduleTitle": "Advanced Java",
    "topicNumber": 63,
    "title": "Optional<T>: Null-Safety, Functional Methods & Anti-Patterns",
    "language": "java",
    "level": "Intermediate",
    "whyItMatters": "Tony Hoare called `null` his \"billion-dollar mistake\". `Optional<T>` (Java 8+) provides a type-level representation of an absent value, forcing callers to acknowledge and handle the possibility of absence without NullPointerException.",
    "explanation": "`Optional<T>` is a container object which may or may not contain a non-null value.\nKey Principles:\n1. Creation:\n   - `Optional.of(val)`: Throws NullPointerException immediately if val is null.\n   - `Optional.ofNullable(val)`: Returns `Optional.empty()` if null, else wrapped value.\n   - `Optional.empty()`: Represents an empty optional.\n2. Extracting Values (Avoiding get()):\n   - Anti-Pattern: Calling `opt.get()` without checking `opt.isPresent()` throws `NoSuchElementException`.\n   - `orElse(defaultVal)`: Returns default value if empty (evaluated eagerly).\n   - `orElseGet(Supplier)`: Computes default value lazily via lambda ONLY if empty.\n   - `orElseThrow(Supplier)`: Throws a custom exception if empty.\n3. Functional Chaining:\n   - `map(Function)`: Transforms wrapped value if present.\n   - `flatMap(Function)`: Prevents nested `Optional<Optional<T>>`.\n   - `filter(Predicate)`: Retains value only if matching predicate.\n   - `ifPresent(Consumer)`: Executes action if value is present.",
    "syntaxAndStructure": "// Creation:\nOptional<String> opt = Optional.ofNullable(fetchFromDatabase());\n\n// Safe functional extraction:\nString username = opt\n    .filter(s -> !s.isBlank())\n    .map(String::trim)\n    .orElseGet(() -> \"Guest_User\"); // Lazy fallback\n\n// Guarded exception:\nUser u = userOpt.orElseThrow(() -> new UserNotFoundException(\"User missing\"));",
    "codeExamples": [
      {
        "title": "Modern Optional Fluent Transformation vs Legacy Null Checks",
        "code": "import java.util.Optional;\n\npublic class OptionalTransformationDemo {\n    public static void main(String[] args) {\n        String rawInput = \"   candidate@ak67.com   \";\n\n        // Modern fluent chain replacing multiple nested if (str != null) checks\n        String sanitizedEmail = Optional.ofNullable(rawInput)\n            .map(String::trim)\n            .filter(email -> email.contains(\"@\"))\n            .map(String::toLowerCase)\n            .orElse(\"default@ak67.com\");\n\n        System.out.println(\"Sanitized email: \" + sanitizedEmail);\n\n        // Handling null input gracefully\n        String nullInput = null;\n        String fallback = Optional.ofNullable(nullInput)\n            .map(String::trim)\n            .orElse(\"anonymous@ak67.com\");\n\n        System.out.println(\"Fallback email: \" + fallback);\n    }\n}",
        "expectedOutput": "Sanitized email: candidate@ak67.com\nFallback email: anonymous@ak67.com",
        "explanation": "Optional pipelines chain map, filter, and orElse seamlessly, eliminating verbose nested null checks."
      },
      {
        "title": "orElse() vs orElseGet() Performance Trap",
        "code": "import java.util.Optional;\n\npublic class OrElseVsOrElseGetDemo {\n    static String expensiveServiceCall() {\n        System.out.println(\"--> Expensive service call executed!\");\n        return \"Default Fallback\";\n    }\n\n    public static void main(String[] args) {\n        Optional<String> presentOpt = Optional.of(\"Cached Data\");\n\n        System.out.println(\"--- Testing orElse (EAGER) ---\");\n        // orElse ALWAYS evaluates its argument, even when Optional is already present!\n        String res1 = presentOpt.orElse(expensiveServiceCall());\n        System.out.println(\"Result 1: \" + res1);\n\n        System.out.println(\"\\n--- Testing orElseGet (LAZY) ---\");\n        // orElseGet evaluates supplier ONLY if Optional is empty!\n        String res2 = presentOpt.orElseGet(() -> expensiveServiceCall());\n        System.out.println(\"Result 2: \" + res2);\n    }\n}",
        "expectedOutput": "--- Testing orElse (EAGER) ---\n--> Expensive service call executed!\nResult 1: Cached Data\n\n--- Testing orElseGet (LAZY) ---\nResult 2: Cached Data",
        "explanation": "orElse evaluates its parameter eagerly regardless of whether the Optional has a value. orElseGet executes its Supplier lazily ONLY when empty."
      }
    ],
    "realWorldApplications": [
      "Repository query methods (e.g. `findById(id)` returning `Optional<User>`).",
      "Preventing NullPointerExceptions in microservice responses and configuration managers."
    ],
    "commonMistakes": [
      "Using `Optional` as method parameters or class fields (creates unnecessary wrapper object allocation overhead; Optional is designed as a method return type).",
      "Using `orElse(expensiveMethod())` instead of `orElseGet(() -> expensiveMethod())`, paying the cost of the fallback computation every time.",
      "Calling Optional.get() without checking isPresent(), defeating the purpose of Optional and risking NoSuchElementException."
    ],
    "interviewRelevance": "Universal interview question: \"What is the difference between orElse and orElseGet?\", \"Why should you not use Optional as class fields?\", and \"Explain flatMap in Optional.\"",
    "checkpoints": [
      {
        "id": "java-63-cp-1",
        "label": "Explain the critical performance difference: orElse (eager) vs orElseGet (lazy)"
      },
      {
        "id": "java-63-cp-2",
        "label": "Avoid Optional anti-patterns: do not use as field or method parameter types"
      },
      {
        "id": "java-63-optional-cp-3",
        "label": "Idiomatically handle absent values using orElse, orElseGet, and orElseThrow."
      }
    ],
    "practiceExercises": [
      {
        "id": "java-63-ex-1",
        "title": "Nested Object Navigation with flatMap",
        "difficulty": "Beginner",
        "type": "coding",
        "prompt": "Given User having Optional<Address> which has Optional<City>, extract the city name safely using flatMap.",
        "solution": "import java.util.Optional;\n\nclass City { String name; City(String n) { this.name = n; } }\nclass Address { Optional<City> city; Address(City c) { this.city = Optional.ofNullable(c); } }\nclass User { Optional<Address> address; User(Address a) { this.address = Optional.ofNullable(a); } }\n\npublic class OptionalNavigation {\n    public static String getCityName(User u) {\n        return Optional.ofNullable(u)\n            .flatMap(user -> user.address)\n            .flatMap(addr -> addr.city)\n            .map(c -> c.name)\n            .orElse(\"Unknown City\");\n    }\n    public static void main(String[] args) {\n        User u = new User(new Address(new City(\"Bengaluru\")));\n        System.out.println(\"City: \" + getCityName(u));\n    }\n}",
        "explanation": "flatMap unpacks nested Optional<T> layers, avoiding Optional<Optional<T>>."
      },
      {
        "id": "java-63-ex-2",
        "title": "Optional.ifPresentOrElse (Java 9+)",
        "difficulty": "Intermediate",
        "type": "coding",
        "prompt": "Use Java 9 ifPresentOrElse to print the user name if present, or log \"Guest\" if absent.",
        "solution": "import java.util.Optional;\n\npublic class IfPresentOrElseDemo {\n    public static void main(String[] args) {\n        Optional<String> user = Optional.of(\"Alice\");\n        user.ifPresentOrElse(\n            name -> System.out.println(\"Welcome, \" + name),\n            () -> System.out.println(\"Welcome, Guest\")\n        );\n    }\n}",
        "explanation": "ifPresentOrElse combines an action Consumer with an empty fallback Runnable cleanly."
      },
      {
        "id": "java-63-ex-3",
        "title": "Why Optional is Not Serializable",
        "difficulty": "Advanced",
        "type": "conceptual",
        "prompt": "Why did the Java architects intentionally make java.util.Optional not implement java.io.Serializable?",
        "solution": "`Optional` was specifically architected as a lightweight method return-type value to represent absence in library APIs, not as a general-purpose data structure or field. If it were Serializable, developers would use it as class fields in domain entities, causing serialization bloat and breaking compatibility with standard Java Bean naming conventions and JPA ORMs. It was designed to be consumed and discarded immediately.",
        "explanation": "Brian Goetz explicitly noted Optional was intended as a library return type, not for domain serialization."
      }
    ],
    "quizQuestions": [
      {
        "id": "java-63-q1",
        "question": "What is the primary difference between `opt.orElse(defaultVal)` and `opt.orElseGet(supplier)`?",
        "options": [
          "orElse is lazy; orElseGet is eager",
          "orElse evaluates defaultVal eagerly even if opt has a value; orElseGet invokes the supplier lazily ONLY if opt is empty",
          "orElse throws NullPointerException",
          "They are identical"
        ],
        "correctOptionIndex": 1,
        "explanation": "`orElse(x)` evaluates x immediately at call time; `orElseGet(() -> x)` evaluates x only when the Optional is empty."
      },
      {
        "id": "java-63-q2",
        "question": "What happens if you invoke `Optional.of(null)` in Java?",
        "options": [
          "It returns an empty Optional",
          "It throws a NullPointerException immediately",
          "It returns an Optional containing the string \"null\"",
          "It compiles to a no-op"
        ],
        "correctOptionIndex": 1,
        "explanation": "`Optional.of()` mandates a non-null argument and throws NullPointerException if null. Use `Optional.ofNullable()` for nullable values."
      }
    ],
    "revisionNotes": [
      "`Optional<T>` represents presence or absence of a value without returning raw null.",
      "Use `orElseGet(() -> fallback)` for lazy default evaluation.",
      "Do not use `Optional` as class fields, method arguments, or collection elements."
    ]
  },
  {
    "id": "java-64-records",
    "moduleId": "java-m5",
    "moduleNumber": 5,
    "moduleTitle": "Advanced Java",
    "topicNumber": 64,
    "title": "Records (Java 14/16+): Immutable Data Carriers & Compact Constructors",
    "language": "java",
    "level": "Intermediate",
    "whyItMatters": "Records (finalized in Java 16 LTS) eliminate hundreds of lines of boilerplate POJO code (getters, constructors, equals, hashCode, toString). Records provide transparent, immutable data carriers with concise syntax.",
    "explanation": "A `record` in Java is a special form of class designed purely to act as a transparent, immutable data carrier.\nWhat the Compiler Generates Automatically:\n1. Private final fields for all record components.\n2. Canonical Constructor initializing all components.\n3. Public accessor methods matching component names (e.g. `p.name()`, NOT `p.getName()`).\n4. Robust `equals()` and `hashCode()` based on all components.\n5. Structured `toString()` printing `RecordName[comp1=val1, comp2=val2]`.\n\nKey Rules & Features:\n- Records are implicitly `final` and cannot be extended.\n- Records implicitly extend `java.lang.Record` (they cannot extend any other class, but CAN implement interfaces).\n- Compact Constructor: A constructor without parameters or explicit field assignment, used strictly for validation or normalization.\n- Record Components: Can be records themselves, enabling nested immutable structures.",
    "syntaxAndStructure": "// Complete immutable Point class in ONE line:\npublic record Point(int x, int y) {}\n\n// Record with validation via Compact Constructor:\npublic record Student(String name, int age) {\n    // Compact constructor (no parameter list, no this.x = x assignments)\n    public Student {\n        if (age < 0) throw new IllegalArgumentException(\"Age cannot be negative\");\n        name = name.trim(); // Normalization allowed!\n    }\n}",
    "codeExamples": [
      {
        "title": "Modern Java Record Definition and Usage",
        "code": "public class RecordBasicsDemo {\n    // Record declaration replaces 60 lines of boilerplate POJO code!\n    public record PlacementOffer(String candidateName, String company, double ctcLPA) {\n        // Compact constructor for validation\n        public PlacementOffer {\n            if (ctcLPA <= 0) throw new IllegalArgumentException(\"CTC must be positive\");\n            candidateName = candidateName.trim();\n        }\n    }\n\n    public static void main(String[] args) {\n        PlacementOffer offer1 = new PlacementOffer(\"Aarav\", \"Google\", 32.5);\n        PlacementOffer offer2 = new PlacementOffer(\"Aarav\", \"Google\", 32.5);\n\n        // Accessors are named after components directly (no 'get' prefix)\n        System.out.println(\"Candidate: \" + offer1.candidateName());\n        System.out.println(\"CTC: \" + offer1.ctcLPA() + \" LPA\");\n\n        // Built-in equals and toString\n        System.out.println(\"equals() comparison: \" + offer1.equals(offer2));\n        System.out.println(\"toString() output: \" + offer1);\n    }\n}",
        "expectedOutput": "Candidate: Aarav\nCTC: 32.5 LPA\nequals() comparison: true\ntoString() output: PlacementOffer[candidateName=Aarav, company=Google, ctcLPA=32.5]",
        "explanation": "The single-line record declaration automatically provides field storage, canonical constructor, accessors, equals, hashCode, and toString."
      },
      {
        "title": "Record Implementing Interfaces and Custom Methods",
        "code": "interface Validatable {\n    boolean isValid();\n}\n\npublic class RecordInterfaceDemo {\n    public record GeoLocation(double latitude, double longitude) implements Validatable {\n        @Override\n        public boolean isValid() {\n            return latitude >= -90 && latitude <= 90 && longitude >= -180 && longitude <= 180;\n        }\n\n        // Custom domain calculation method\n        public boolean isEquator() {\n            return Math.abs(latitude) < 0.0001;\n        }\n    }\n\n    public static void main(String[] args) {\n        GeoLocation loc = new GeoLocation(0.0, 77.5946);\n        System.out.println(\"Valid coordinates: \" + loc.isValid());\n        System.out.println(\"On Equator: \" + loc.isEquator());\n    }\n}",
        "expectedOutput": "Valid coordinates: true\nOn Equator: true",
        "explanation": "Records can implement interfaces and declare custom domain methods, static methods, and static fields."
      }
    ],
    "realWorldApplications": [
      "Data Transfer Objects (DTOs) in Spring Boot REST controllers and microservice responses.",
      "Composite keys in Maps, database query projections, and temporary data pipeline containers."
    ],
    "commonMistakes": [
      "Writing `offer.getCandidateName()` expecting JavaBean getters; record accessors do not use `get` (call `offer.candidateName()`).",
      "Attempting to declare non-static instance fields in records; records cannot have additional instance state beyond their components.",
      "Attempting to extend another class when defining a record; Java records implicitly extend java.lang.Record and cannot extend other classes."
    ],
    "interviewRelevance": "Modern Java 17/21 interview question: \"What are Java Records and what boilerplate do they eliminate?\", \"What is a compact constructor?\", and \"How does a Record differ from a standard class with final fields?\"",
    "checkpoints": [
      {
        "id": "java-64-cp-1",
        "label": "Define modern Java records and identify the 5 elements auto-generated by the compiler"
      },
      {
        "id": "java-64-cp-2",
        "label": "Implement validation and normalization using compact constructors"
      },
      {
        "id": "java-64-records-cp-3",
        "label": "Use Java Records for immutable, boilerplate-free data transfer objects."
      }
    ],
    "practiceExercises": [
      {
        "id": "java-64-ex-1",
        "title": "DTO Record for API Response",
        "difficulty": "Beginner",
        "type": "coding",
        "prompt": "Create a record ApiResponse<T>(int statusCode, String message, T data) with a static helper success(T data).",
        "solution": "public record ApiResponse<T>(int statusCode, String message, T data) {\n    public static <T> ApiResponse<T> success(T data) {\n        return new ApiResponse<>(200, \"SUCCESS\", data);\n    }\n    public static void main(String[] args) {\n        ApiResponse<String> res = ApiResponse.success(\"Data Payload\");\n        System.out.println(res);\n    }\n}",
        "explanation": "Records can have generic type parameters and static factory methods."
      },
      {
        "id": "java-64-ex-2",
        "title": "Deep Copy in Record Compact Constructor",
        "difficulty": "Intermediate",
        "type": "coding",
        "prompt": "Write a record UserPermissions(String user, java.util.List<String> roles) that ensures roles is immutable.",
        "solution": "import java.util.List;\n\npublic record UserPermissions(String user, List<String> roles) {\n    public UserPermissions {\n        // Defensive copy to guarantee immutability\n        roles = List.copyOf(roles);\n    }\n    public static void main(String[] args) {\n        UserPermissions up = new UserPermissions(\"Alice\", List.of(\"ADMIN\", \"USER\"));\n        System.out.println(\"Roles: \" + up.roles());\n    }\n}",
        "explanation": "Compact constructor reassigns roles to List.copyOf(roles), making the record deeply immutable."
      },
      {
        "id": "java-64-ex-3",
        "title": "Local Records Inside Methods",
        "difficulty": "Advanced",
        "type": "coding",
        "prompt": "Demonstrate how local records inside a method can act as intermediate tuple data carriers in stream pipelines.",
        "solution": "import java.util.*;\n\npublic class LocalRecordDemo {\n    public static void main(String[] args) {\n        List<String> names = List.of(\"Aarav\", \"Bob\", \"Ananya\");\n        // Local record defined inside method!\n        record ScoredUser(String name, int score) {}\n\n        List<ScoredUser> ranked = names.stream()\n            .map(n -> new ScoredUser(n, n.length() * 10))\n            .sorted(Comparator.comparingInt(ScoredUser::score).reversed())\n            .toList();\n\n        System.out.println(\"Ranked: \" + ranked);\n    }\n}",
        "explanation": "Java 16+ allows defining records locally inside method bodies as lightweight intermediate data carriers."
      }
    ],
    "quizQuestions": [
      {
        "id": "java-64-q1",
        "question": "What is the naming convention for accessor methods generated by the compiler for record components?",
        "options": [
          "getComponentName() (JavaBean convention)",
          "componentName() (matching the component name directly)",
          "isComponentName()",
          "fetchComponentName()"
        ],
        "correctOptionIndex": 1,
        "explanation": "Record accessors match the exact name of the component (e.g. `point.x()`), omitting the `get` prefix."
      },
      {
        "id": "java-64-q2",
        "question": "Can a Java record explicitly extend another class using the `extends` keyword?",
        "options": [
          "Yes, any class that is marked final",
          "No, all records implicitly extend java.lang.Record and Java does not support multiple class inheritance",
          "Yes, if the superclass is abstract",
          "Only in Java 21"
        ],
        "correctOptionIndex": 1,
        "explanation": "Records implicitly extend `java.lang.Record`. Because Java does not allow multiple class inheritance, records cannot extend another class."
      }
    ],
    "revisionNotes": [
      "Records are immutable data carriers that eliminate POJO boilerplate.",
      "Auto-generates fields, canonical constructor, accessors (`name()`), equals, hashCode, toString.",
      "Compact constructors allow validation and normalization without boilerplate parameter assignments."
    ]
  },
  {
    "id": "java-65-sealed-classes",
    "moduleId": "java-m5",
    "moduleNumber": 5,
    "moduleTitle": "Advanced Java",
    "topicNumber": 65,
    "title": "Sealed Classes & Interfaces (Java 15/17+): Exhaustive Domain Hierarchies",
    "language": "java",
    "level": "Intermediate",
    "whyItMatters": "Sealed classes (finalized in Java 17 LTS) allow developers to restrict which other classes or interfaces may extend or implement them. This enables modeling algebraic data types (ADTs) and exhaustive compile-time checking without default branches.",
    "explanation": "Prior to Java 17, inheritance was open-ended: any class in the classpath could extend a public class unless it was marked `final`.\nSealed Classes Architecture:\n1. The `sealed` Modifier: Declares a class or interface whose subtypes are strictly controlled.\n2. The `permits` Clause: Explicitly lists all allowed direct subclasses (e.g. `public sealed class Shape permits Circle, Square, Triangle`). If permitted subclasses reside in the same source file, the `permits` clause is optional.\n3. Rules for Permitted Subclasses:\n   Every permitted subclass MUST explicitly choose one of three modifiers:\n   - `final`: Prohibits any further extension.\n   - `sealed`: Extends the parent and continues controlling its own subclasses with its own `permits` clause.\n   - `non-sealed`: Re-opens the hierarchy, allowing unrestricted extension.\n4. Exhaustiveness in Pattern Matching: Because the compiler knows all permitted subtypes in advance, `switch` expressions on sealed types do NOT require a `default` branch!",
    "syntaxAndStructure": "// Sealed superclass:\npublic sealed class Payment permits CreditCard, UPI, BankTransfer {}\n\n// Subclasses MUST specify final, sealed, or non-sealed:\npublic final class CreditCard extends Payment {}\npublic final class UPI extends Payment {}\npublic non-sealed class BankTransfer extends Payment {} // Re-opened",
    "codeExamples": [
      {
        "title": "Sealed Class Hierarchy with Final and Non-Sealed Subclasses",
        "code": "// Sealed base class specifying exact permitted subtypes\nsealed abstract class ServiceResponse permits SuccessResponse, ErrorResponse {}\n\n// Permitted subclass 1: final (closed)\nfinal class SuccessResponse extends ServiceResponse {\n    private final String data;\n    SuccessResponse(String d) { this.data = d; }\n    public String getData() { return data; }\n}\n\n// Permitted subclass 2: final (closed)\nfinal class ErrorResponse extends ServiceResponse {\n    private final String error;\n    ErrorResponse(String err) { this.error = err; }\n    public String getError() { return error; }\n}\n\npublic class SealedHierarchyDemo {\n    public static void main(String[] args) {\n        ServiceResponse r1 = new SuccessResponse(\"Payload Delivered\");\n        ServiceResponse r2 = new ErrorResponse(\"Timeout 504\");\n\n        System.out.println(\"Responses instantiated under closed sealed hierarchy.\");\n        System.out.println(\"Is instance of ServiceResponse: \" + (r1 instanceof ServiceResponse));\n    }\n}",
        "expectedOutput": "Responses instantiated under closed sealed hierarchy.\nIs instance of ServiceResponse: true",
        "explanation": "ServiceResponse guarantees that no third-party code can introduce unauthorized subclasses outside SuccessResponse and ErrorResponse."
      },
      {
        "title": "Sealed Interfaces with Modern Records",
        "code": "// Sealed interface permitted to records!\nsealed interface Result<T> permits Success, Failure {}\n\nrecord Success<T>(T value) implements Result<T> {}\nrecord Failure<T>(String errorMessage) implements Result<T> {}\n\npublic class SealedRecordDemo {\n    public static void main(String[] args) {\n        Result<Integer> res = new Success<>(42);\n        \n        // Compiler knows Result can ONLY be Success or Failure\n        if (res instanceof Success<Integer> s) {\n            System.out.println(\"Success value: \" + s.value());\n        }\n    }\n}",
        "expectedOutput": "Success value: 42",
        "explanation": "Records are implicitly final, making them natural permitted subtypes for sealed interfaces to model Algebraic Data Types (Result = Success | Failure)."
      }
    ],
    "realWorldApplications": [
      "Modeling domain state machines where states are closed and known (PaymentState = PENDING | AUTHORIZED | FAILED).",
      "Compiler Abstract Syntax Trees (AST nodes) where node varieties are strictly bounded."
    ],
    "commonMistakes": [
      "Permitted subclasses failing to declare one of `final`, `sealed`, or `non-sealed`, which triggers a compile-time error.",
      "Placing permitted subclasses in different packages or modules; all permitted subtypes must reside in the same package/module as the sealed class.",
      "Declaring a sealed class without permitting subclasses, or failing to make permitted subclasses final, sealed, or non-sealed."
    ],
    "interviewRelevance": "Major Java 17 LTS interview topic: \"What are sealed classes in Java 17?\", \"What three modifiers must permitted subclasses specify?\", and \"How do sealed classes support pattern matching?\"",
    "checkpoints": [
      {
        "id": "java-65-cp-1",
        "label": "Explain the sealed keyword, permits clause, and the 3 allowed subclass modifiers"
      },
      {
        "id": "java-65-cp-2",
        "label": "Combine sealed interfaces with records to model Algebraic Data Types"
      },
      {
        "id": "java-65-sealed-classes-cp-3",
        "label": "Design restricted domain models and algebraic data types using sealed classes and interfaces."
      }
    ],
    "practiceExercises": [
      {
        "id": "java-65-ex-1",
        "title": "Define Sealed Vehicle Hierarchy",
        "difficulty": "Beginner",
        "type": "coding",
        "prompt": "Create a sealed class Vehicle permitting Car and Truck, where Car is final and Truck is non-sealed.",
        "solution": "sealed class Vehicle permits Car, Truck {}\nfinal class Car extends Vehicle {}\nnon-sealed class Truck extends Vehicle {}\n\npublic class SealedVehicleTest {\n    public static void main(String[] args) {\n        Vehicle v = new Car();\n        System.out.println(\"Sealed vehicle created: \" + v.getClass().getSimpleName());\n    }\n}",
        "explanation": "Car cannot be extended (final); Truck can be freely extended (non-sealed)."
      },
      {
        "id": "java-65-ex-2",
        "title": "Exhaustive Pattern Matching on Sealed Types",
        "difficulty": "Intermediate",
        "type": "coding",
        "prompt": "Demonstrate how pattern matching switch on a sealed class hierarchy needs no default branch.",
        "solution": "sealed interface Expr permits Const, Add {}\nrecord Const(int val) implements Expr {}\nrecord Add(Expr left, Expr right) implements Expr {}\n\npublic class SealedEvaluator {\n    public static int eval(Expr e) {\n        // No default needed because compiler knows Expr is sealed to Const and Add!\n        return switch (e) {\n            case Const c -> c.val();\n            case Add a -> eval(a.left()) + eval(a.right());\n        };\n    }\n    public static void main(String[] args) {\n        Expr expr = new Add(new Const(10), new Const(20));\n        System.out.println(\"Evaluated: \" + eval(expr));\n    }\n}",
        "explanation": "The compiler statically verifies that all permitted subtypes are handled, making default redundant."
      },
      {
        "id": "java-65-ex-3",
        "title": "Module and Package Constraints on Sealed Classes",
        "difficulty": "Advanced",
        "type": "conceptual",
        "prompt": "What package and module restrictions does the Java compiler enforce on permitted subclasses of a sealed class?",
        "solution": "If the sealed class is in a named module, all permitted subclasses MUST reside in the same module (though they can be in different packages within that module). If the sealed class is in the unnamed module (standard classpath), all permitted subclasses MUST reside in the exact same package. This prevents external libraries from injecting rogue subclasses into the sealed hierarchy.",
        "explanation": "Enforces strict compile-time boundaries on the closed type hierarchy."
      }
    ],
    "quizQuestions": [
      {
        "id": "java-65-q1",
        "question": "Which of the following is NOT one of the three mandatory modifiers for a subclass permitted by a sealed class?",
        "options": [
          "final",
          "sealed",
          "non-sealed",
          "static"
        ],
        "correctOptionIndex": 3,
        "explanation": "Every permitted subclass must explicitly declare either `final`, `sealed`, or `non-sealed`. `static` is not an inheritance hierarchy modifier."
      },
      {
        "id": "java-65-q2",
        "question": "Why does a switch expression on a sealed class hierarchy not require a `default` branch?",
        "options": [
          "Because the compiler suppresses all errors in switch",
          "Because the compiler knows all permitted subtypes and can statically verify exhaustiveness",
          "Because default is deprecated in Java 17",
          "Only if the class has fewer than 3 subclasses"
        ],
        "correctOptionIndex": 1,
        "explanation": "The sealed permits clause provides a closed universe of subtypes, allowing the compiler to guarantee that all possibilities are covered."
      }
    ],
    "revisionNotes": [
      "`sealed` restricts which classes can extend or implement a type via `permits`.",
      "Permitted subclasses must be `final`, `sealed`, or `non-sealed`.",
      "Enables exhaustive pattern matching switch expressions without `default`."
    ]
  },
  {
    "id": "java-66-pattern-matching",
    "moduleId": "java-m5",
    "moduleNumber": 5,
    "moduleTitle": "Advanced Java",
    "topicNumber": 66,
    "title": "Pattern Matching: instanceof (Java 16) & Switch Patterns (Java 21)",
    "language": "java",
    "level": "Intermediate",
    "whyItMatters": "Pattern matching transforms Java from verbose object-casting code into concise, declarative pattern inspection. Finalized in Java 16 (for instanceof) and Java 21 LTS (for switch), pattern matching is the modern standard for writing clean conditional logic.",
    "explanation": "Pattern matching combines a predicate test with conditional variable extraction in a single step:\n1. Pattern Matching for `instanceof` (Java 16+):\n   - Replaces the tedious test-and-cast pattern: `if (obj instanceof String) { String s = (String) obj; ... }`\n   - With the pattern variable: `if (obj instanceof String s) { System.out.println(s.length()); }`\n   - Flow Scoping: The pattern variable `s` is in scope only where the condition is definitely true!\n2. Pattern Matching for `switch` (Java 21 LTS):\n   - Allows switching directly on types and patterns rather than just primitives and strings.\n   - Supports `case null` directly without throwing NullPointerException.\n   - Guarded Patterns (`when` clause): Adds conditional boolean filters to case labels (e.g. `case String s when s.length() > 5 -> ...`).\n   - Record Patterns: Deconstructs records directly in the case statement (e.g. `case Point(int x, int y) -> ...`).",
    "syntaxAndStructure": "// Pattern matching instanceof:\nif (obj instanceof String s && s.length() > 3) {\n    System.out.println(s.toUpperCase()); // s is in scope\n}\n\n// Pattern matching switch (Java 21):\nString formatted = switch (obj) {\n    case Integer i -> String.format(\"int %d\", i);\n    case String s when s.isBlank() -> \"blank string\";\n    case String s -> String.format(\"string of length %d\", s.length());\n    case null -> \"null object\";\n    default -> \"unknown type\";\n};",
    "codeExamples": [
      {
        "title": "Modern Pattern Matching for instanceof and Flow Scoping",
        "code": "public class InstanceofPatternDemo {\n    public static void process(Object obj) {\n        // Pattern variable 's' is automatically extracted if test passes\n        if (obj instanceof String s && !s.isEmpty()) {\n            System.out.println(\"String with length: \" + s.length());\n        } else if (obj instanceof Integer i) {\n            System.out.println(\"Integer squared: \" + (i * i));\n        } else {\n            System.out.println(\"Other object type: \" + obj);\n        }\n    }\n\n    public static void main(String[] args) {\n        process(\"AK67 Prep\");\n        process(7);\n        process(3.14);\n    }\n}",
        "expectedOutput": "String with length: 9\nInteger squared: 49\nOther object type: 3.14",
        "explanation": "Pattern matching for instanceof binds the cast variable directly, eliminating redundant type cast expressions."
      },
      {
        "title": "Java 21 Pattern Matching for switch with Guarded when Clauses",
        "code": "public class SwitchPatternDemo {\n    public static String inspectValue(Object obj) {\n        // Java 21 LTS pattern matching switch with guarded patterns\n        return switch (obj) {\n            case null -> \"Received null reference\";\n            case Integer i when i < 0 -> \"Negative int: \" + i;\n            case Integer i -> \"Positive int: \" + i;\n            case String s when s.length() > 5 -> \"Long string: \" + s;\n            case String s -> \"Short string: \" + s;\n            default -> \"Other type: \" + obj.getClass().getSimpleName();\n        };\n    }\n\n    public static void main(String[] args) {\n        System.out.println(inspectValue(null));\n        System.out.println(inspectValue(-42));\n        System.out.println(inspectValue(100));\n        System.out.println(inspectValue(\"Placement 2026\"));\n    }\n}",
        "expectedOutput": "Received null reference\nNegative int: -42\nPositive int: 100\nLong string: Placement 2026",
        "explanation": "Java 21 switch patterns handle null directly and evaluate guard expressions via the when keyword."
      }
    ],
    "realWorldApplications": [
      "Parsing heterogeneous AST tokens, JSON nodes, and domain event messages.",
      "Refactoring messy `instanceof` + cast if-else ladders into clean, compiler-verified pattern switches."
    ],
    "commonMistakes": [
      "Assuming the pattern variable is in scope outside the if statement; it uses flow scoping and is only visible where the condition is guaranteed true.",
      "Listing a more general pattern before a guarded pattern (e.g. `case String s` before `case String s when s.length() > 5`), causing an \"unreachable code\" compiler error.",
      "Using legacy instanceof and manual explicit casting instead of modern pattern matching for instanceof and switch."
    ],
    "interviewRelevance": "Modern Java 21 interview question: \"Explain pattern matching for instanceof and flow scoping\", \"What is the `when` clause in Java 21 switch?\", and \"How does Java 21 switch handle null?\"",
    "checkpoints": [
      {
        "id": "java-66-cp-1",
        "label": "Use pattern matching for instanceof with flow scoping rules"
      },
      {
        "id": "java-66-cp-2",
        "label": "Write modern Java 21 switch statements with type patterns and guarded when clauses"
      },
      {
        "id": "java-66-pattern-matching-cp-3",
        "label": "Eliminate boilerplate casting using Java 17+ pattern matching."
      }
    ],
    "practiceExercises": [
      {
        "id": "java-66-ex-1",
        "title": "Refactor Equals with Pattern Matching",
        "difficulty": "Beginner",
        "type": "coding",
        "prompt": "Refactor a standard equals(Object o) method using modern pattern matching instanceof.",
        "solution": "class Point {\n    int x, y;\n    Point(int x, int y) { this.x = x; this.y = y; }\n\n    @Override\n    public boolean equals(Object o) {\n        // Modern 1-line check and cast\n        return (o instanceof Point other) && this.x == other.x && this.y == other.y;\n    }\n}\n\npublic class EqualsRefactorTest {\n    public static void main(String[] args) {\n        Point p1 = new Point(1, 2);\n        Point p2 = new Point(1, 2);\n        System.out.println(\"Points equal: \" + p1.equals(p2));\n    }\n}",
        "explanation": "Replaces 4 lines of boilerplate type checking and casting with a single clean boolean expression."
      },
      {
        "id": "java-66-ex-2",
        "title": "Record Deconstruction Patterns (Java 21)",
        "difficulty": "Intermediate",
        "type": "coding",
        "prompt": "Demonstrate record deconstruction in instanceof: if (obj instanceof Point(int x, int y)) { ... }.",
        "solution": "record Point(int x, int y) {}\n\npublic class RecordPatternDemo {\n    public static void printPoint(Object obj) {\n        // Java 21 Record Pattern directly extracts x and y components!\n        if (obj instanceof Point(int x, int y)) {\n            System.out.println(\"Point coordinates: x=\" + x + \", y=\" + y);\n        }\n    }\n    public static void main(String[] args) {\n        printPoint(new Point(10, 20));\n    }\n}",
        "explanation": "Record patterns deconstruct records into their component variables directly upon type matching."
      },
      {
        "id": "java-66-ex-3",
        "title": "Dominance Checking in Pattern Matching",
        "difficulty": "Advanced",
        "type": "conceptual",
        "prompt": "What is \"Dominance\" in Java 21 switch pattern matching, and why does case CharSequence dominate case String?",
        "solution": "In switch pattern matching, if a pattern label matches a type that is a supertype of a subsequent pattern, the first pattern \"dominates\" the second. Because `CharSequence` is a supertype of `String`, putting `case CharSequence cs -> ...` before `case String s -> ...` means the String branch could never be reached. The Java compiler enforces dominance ordering and generates a compile error if a dominating pattern precedes a dominated pattern.",
        "explanation": "The compiler mandates specific-to-general pattern ordering to prevent dead code."
      }
    ],
    "quizQuestions": [
      {
        "id": "java-66-q1",
        "question": "What is the keyword used in Java 21 switch statements to specify a guarded pattern (conditional filter)?",
        "options": [
          "if",
          "when",
          "where",
          "guard"
        ],
        "correctOptionIndex": 1,
        "explanation": "Java 21 uses the `when` keyword for guarded patterns (e.g. `case String s when s.length() > 5 -> ...`)."
      },
      {
        "id": "java-66-q2",
        "question": "How does modern Java 21 switch handle a `null` value when `case null:` is explicitly provided?",
        "options": [
          "It throws a NullPointerException before evaluating any case",
          "It safely routes execution to the `case null` branch",
          "It routes null to the default branch only",
          "It converts null to an empty string"
        ],
        "correctOptionIndex": 1,
        "explanation": "Java 21 switch natively supports explicit `case null:` handling, preventing NullPointerException."
      }
    ],
    "revisionNotes": [
      "Pattern matching instanceof (`obj instanceof String s`) tests and binds variables in one step.",
      "Java 21 switch supports type patterns, record deconstruction, and guarded `when` clauses.",
      "Switch in Java 21 handles `null` natively using `case null -> ...`."
    ]
  },
  {
    "id": "java-67-annotations",
    "moduleId": "java-m5",
    "moduleNumber": 5,
    "moduleTitle": "Advanced Java",
    "topicNumber": 67,
    "title": "Annotations, Meta-Annotations & Custom Reflection Processing",
    "language": "java",
    "level": "Intermediate",
    "whyItMatters": "Annotations (@Override, @Test, @Autowired, @Entity) are the metadata syntax of Java. Understanding meta-annotations (@Retention, @Target) and how frameworks process annotations at runtime via Reflection is essential for understanding Spring Boot and Hibernate.",
    "explanation": "An `Annotation` is a form of syntactic metadata that can be added to classes, methods, fields, and parameters without changing program semantics directly.\n1. Built-in Annotations:\n   - `@Override`: Enforces that a method overrides a superclass method.\n   - `@Deprecated`: Marks an API as superseded and discouraged.\n   - `@SuppressWarnings`: Silences compiler warnings (e.g. unchecked casts).\n2. Meta-Annotations (Annotations applied to other annotations):\n   - `@Retention`: Defines how long the annotation is retained:\n     - `SOURCE`: Discarded by compiler (e.g. `@Override`, Lombok).\n     - `CLASS`: Recorded in `.class` file, but discarded by JVM at runtime (default).\n     - `RUNTIME`: Retained in `.class` AND loaded into JVM; accessible via Reflection!\n   - `@Target`: Restricts where the annotation can be applied (`ElementType.METHOD`, `FIELD`, `TYPE`, `PARAMETER`).\n   - `@Documented`: Included in Javadoc.\n3. Custom Annotation Definition:\n   Declared using `@interface`. Elements are declared like methods (e.g. `String value() default \"\";`).",
    "syntaxAndStructure": "// Custom Runtime Annotation Definition:\n@Retention(RetentionPolicy.RUNTIME)\n@Target(ElementType.METHOD)\npublic @interface Endpoint {\n    String path();\n    String method() default \"GET\";\n}\n\n// Usage:\n@Endpoint(path = \"/users\", method = \"POST\")\npublic void createUser() { ... }",
    "codeExamples": [
      {
        "title": "Custom Annotation Definition and Runtime Reflection Processor",
        "code": "import java.lang.annotation.ElementType;\nimport java.lang.annotation.Retention;\nimport java.lang.annotation.RetentionPolicy;\nimport java.lang.annotation.Target;\nimport java.lang.reflect.Method;\n\n// 1. Declare Custom Annotation\n@Retention(RetentionPolicy.RUNTIME) // Must be RUNTIME for reflection access!\n@Target(ElementType.METHOD)         // Can only annotate methods\n@interface TestMethod {\n    String description() default \"Standard test\";\n}\n\n// 2. Class using the annotation\nclass ServiceTestSuite {\n    @TestMethod(description = \"Verify database connection\")\n    public void testDatabase() {\n        System.out.println(\"Running testDatabase()\");\n    }\n\n    public void regularMethod() {\n        // Not annotated\n    }\n}\n\n// 3. Reflection Runner\npublic class AnnotationProcessorDemo {\n    public static void main(String[] args) throws Exception {\n        Class<?> clazz = ServiceTestSuite.class;\n\n        for (Method m : clazz.getDeclaredMethods()) {\n            if (m.isAnnotationPresent(TestMethod.class)) {\n                TestMethod anno = m.getAnnotation(TestMethod.class);\n                System.out.println(\"Discovered test: \" + m.getName() + \" -> \" + anno.description());\n                m.invoke(clazz.getDeclaredConstructor().newInstance());\n            }\n        }\n    }\n}",
        "expectedOutput": "Discovered test: testDatabase -> Verify database connection\nRunning testDatabase()",
        "explanation": "Demonstrates how frameworks like JUnit discover and execute annotated methods dynamically at runtime via Reflection and isAnnotationPresent()."
      },
      {
        "title": "Suppressing Warnings and Deprecation",
        "code": "public class BuiltinAnnotationDemo {\n    @Deprecated(since = \"2.0\", forRemoval = true)\n    public static void legacyAlgorithm() {\n        System.out.println(\"Legacy code executed.\");\n    }\n\n    @SuppressWarnings(\"deprecation\")\n    public static void main(String[] args) {\n        // Suppresses compiler deprecation warning\n        legacyAlgorithm();\n    }\n}",
        "expectedOutput": "Legacy code executed.",
        "explanation": "Built-in annotations like @Deprecated and @SuppressWarnings communicate directly with compiler linters and IDE tooling."
      }
    ],
    "realWorldApplications": [
      "Spring Framework routing and dependency injection (`@RestController`, `@Autowired`, `@GetMapping`).",
      "JPA / Hibernate database entity mapping (`@Entity`, `@Table`, `@Id`, `@Column`)."
    ],
    "commonMistakes": [
      "Forgetting `@Retention(RetentionPolicy.RUNTIME)`; by default, annotations have `CLASS` retention, meaning they are invisible to runtime reflection!",
      "Using mutable types or complex objects as annotation element values; only primitives, String, Class, Enums, annotations, and 1D arrays are permitted.",
      "Forgetting @Retention(RetentionPolicy.RUNTIME) on custom annotations intended to be processed via reflection."
    ],
    "interviewRelevance": "Universal interview question: \"What is RetentionPolicy.RUNTIME vs SOURCE?\", \"How does Spring Boot process annotations?\", and \"Create a custom annotation from scratch.\"",
    "checkpoints": [
      {
        "id": "java-67-cp-1",
        "label": "Distinguish RetentionPolicy: SOURCE vs CLASS vs RUNTIME"
      },
      {
        "id": "java-67-cp-2",
        "label": "Inspect and process custom annotations dynamically using Java Reflection"
      },
      {
        "id": "java-67-annotations-cp-3",
        "label": "Create and process custom annotations with Target, Retention, and Documented meta-annotations."
      }
    ],
    "practiceExercises": [
      {
        "id": "java-67-ex-1",
        "title": "Custom Field Validation Annotation",
        "difficulty": "Beginner",
        "type": "coding",
        "prompt": "Create a @MaxLength(int value) annotation applicable to fields with runtime retention.",
        "solution": "import java.lang.annotation.*;\n\n@Retention(RetentionPolicy.RUNTIME)\n@Target(ElementType.FIELD)\npublic @interface MaxLength {\n    int value() default 255;\n}\n\nclass UserInput {\n    @MaxLength(10)\n    String username;\n}\npublic class MaxLengthTest {\n    public static void main(String[] args) {\n        System.out.println(\"Annotation defined successfully.\");\n    }\n}",
        "explanation": "Declares custom field metadata with default value 255."
      },
      {
        "id": "java-67-ex-2",
        "title": "Field Validator Engine",
        "difficulty": "Intermediate",
        "type": "coding",
        "prompt": "Write a validator method that inspects an object and throws an exception if any field annotated with @MaxLength exceeds its limit.",
        "solution": "import java.lang.reflect.Field;\n\npublic class ValidatorEngine {\n    public static void validate(Object obj) throws Exception {\n        for (Field f : obj.getClass().getDeclaredFields()) {\n            if (f.isAnnotationPresent(MaxLength.class)) {\n                f.setAccessible(true);\n                MaxLength ml = f.getAnnotation(MaxLength.class);\n                Object val = f.get(obj);\n                if (val instanceof String s && s.length() > ml.value()) {\n                    throw new IllegalArgumentException(\"Field \" + f.getName() + \" exceeds max length \" + ml.value());\n                }\n            }\n        }\n    }\n    public static void main(String[] args) throws Exception {\n        UserInput input = new UserInput();\n        input.username = \"Valid\";\n        validate(input);\n        System.out.println(\"Validation passed.\");\n    }\n}",
        "explanation": "Uses reflection to read fields, check annotations, and enforce metadata validation rules dynamically."
      },
      {
        "id": "java-67-ex-3",
        "title": "Compile-Time Annotation Processing (APT / Lombok)",
        "difficulty": "Advanced",
        "type": "conceptual",
        "prompt": "How does Lombok generate getters and setters at compile time without using runtime reflection?",
        "solution": "Lombok uses the Java Annotation Processing Tool (APT) via `javax.annotation.processing.Processor` hooks during the `javac` compilation phase. When javac runs, Lombok intercepts the Abstract Syntax Tree (AST), inspects annotations like `@Getter` and `@Data`, and injects bytecode for methods directly into the AST before bytecode generation. Because this happens at compile time, there is zero runtime reflection performance penalty.",
        "explanation": "Compile-time annotation processors manipulate AST representations before bytecode is emitted."
      }
    ],
    "quizQuestions": [
      {
        "id": "java-67-q1",
        "question": "Which `RetentionPolicy` must be specified for an annotation so that it can be inspected via Java Reflection at runtime?",
        "options": [
          "RetentionPolicy.SOURCE",
          "RetentionPolicy.CLASS",
          "RetentionPolicy.RUNTIME",
          "RetentionPolicy.JVM"
        ],
        "correctOptionIndex": 2,
        "explanation": "`RetentionPolicy.RUNTIME` instructs the JVM to retain the annotation in memory, making it accessible via reflection APIs."
      },
      {
        "id": "java-67-q2",
        "question": "What types are permitted as return values for elements in a custom Java annotation?",
        "options": [
          "Any Java class or object",
          "Primitives, String, Class, Enums, Annotations, and 1D arrays of these types",
          "Only primitives and Strings",
          "Only integers"
        ],
        "correctOptionIndex": 1,
        "explanation": "Annotation elements are restricted to primitives, String, Class, enums, other annotations, and single-dimensional arrays thereof."
      }
    ],
    "revisionNotes": [
      "Annotations attach metadata to program elements.",
      "`@Retention(RetentionPolicy.RUNTIME)` is mandatory for runtime reflection inspection.",
      "`@Target` restricts annotation placement to classes, methods, fields, or parameters."
    ]
  },
  {
    "id": "java-68-reflection",
    "moduleId": "java-m5",
    "moduleNumber": 5,
    "moduleTitle": "Advanced Java",
    "topicNumber": 68,
    "title": "The Reflection API: Inspecting Metadata & Accessing Private Members",
    "language": "java",
    "level": "Intermediate",
    "whyItMatters": "Java Reflection allows programs to inspect and modify classes, fields, methods, and constructors at runtime without compile-time knowledge. It powers all modern Java frameworks (Spring, Hibernate, Jackson, JUnit).",
    "explanation": "The Reflection API (`java.lang.reflect` and `java.lang.Class`) allows introspecting and manipulating the runtime structure of classes.\nCore Capabilities:\n1. Obtaining Class Metadata: `obj.getClass()`, `ClassName.class`, or `Class.forName(\"com.app.User\")`.\n2. Inspecting Members:\n   - Methods: `clazz.getMethods()` (public including inherited) vs `clazz.getDeclaredMethods()` (all declared in this class).\n   - Fields: `clazz.getFields()` vs `clazz.getDeclaredFields()`.\n   - Constructors: `clazz.getDeclaredConstructors()`.\n3. Breaking Encapsulation via `setAccessible(true)`:\n   - Accessing and modifying private fields or invoking private methods at runtime.\n   - Note: In modern Java (Java 9+ Modules / Java 17+ strong encapsulation), deep reflection across module boundaries is restricted unless `opens` is specified in `module-info.java`.\n4. Performance & Security Drawbacks:\n   - Reflection bypasses compile-time type safety.\n   - Reflection lookups are significantly slower than direct bytecode calls (though modern JIT optimizes repeated reflection calls via inflation).\n   - Can break security and immutability invariants.",
    "syntaxAndStructure": "// Obtain class token:\nClass<?> clazz = Class.forName(\"com.ak67.model.User\");\n\n// Create instance:\nObject instance = clazz.getDeclaredConstructor().newInstance();\n\n// Access private field:\nField field = clazz.getDeclaredField(\"secretKey\");\nfield.setAccessible(true); // Bypass private access\nfield.set(instance, \"HACKED\");",
    "codeExamples": [
      {
        "title": "Inspecting and Accessing Private Fields via Reflection",
        "code": "import java.lang.reflect.Field;\n\nclass SecretVault {\n    private String passcode = \"SUPER_SECRET_123\";\n    private int securityLevel = 5;\n}\n\npublic class ReflectionAccessDemo {\n    public static void main(String[] args) throws Exception {\n        SecretVault vault = new SecretVault();\n        Class<?> clazz = vault.getClass();\n\n        // 1. Inspect private field\n        Field field = clazz.getDeclaredField(\"passcode\");\n\n        // 2. Suppress Java access checks (bypassing private)\n        field.setAccessible(true);\n\n        // 3. Read private value\n        String secret = (String) field.get(vault);\n        System.out.println(\"Extracted private passcode: \" + secret);\n\n        // 4. Mutate private value\n        field.set(vault, \"NEW_SECRET_999\");\n        System.out.println(\"Mutated private passcode: \" + field.get(vault));\n    }\n}",
        "expectedOutput": "Extracted private passcode: SUPER_SECRET_123\nMutated private passcode: NEW_SECRET_999",
        "explanation": "Using getDeclaredField() and setAccessible(true) allows reflection to bypass private access modifiers and inspect/modify internal state."
      },
      {
        "title": "Dynamically Invoking Methods by Name",
        "code": "import java.lang.reflect.Method;\n\nclass MathOperations {\n    public int multiply(int a, int b) { return a * b; }\n}\n\npublic class ReflectionMethodInvokeDemo {\n    public static void main(String[] args) throws Exception {\n        Class<?> clazz = MathOperations.class;\n        Object instance = clazz.getDeclaredConstructor().newInstance();\n\n        // Find method by name and parameter types\n        Method method = clazz.getDeclaredMethod(\"multiply\", int.class, int.class);\n\n        // Dynamically invoke method\n        Object result = method.invoke(instance, 6, 7);\n        System.out.println(\"Invoked multiply(6, 7): \" + result);\n    }\n}",
        "expectedOutput": "Invoked multiply(6, 7): 42",
        "explanation": "method.invoke(instance, args...) dynamically executes a method identified at runtime."
      }
    ],
    "realWorldApplications": [
      "Dependency injection in Spring Boot (instantiating beans and injecting fields annotated with `@Autowired`).",
      "JSON serializers like Jackson converting JSON strings into POJOs by inspecting getters and setters dynamically."
    ],
    "commonMistakes": [
      "Using `getFields()` instead of `getDeclaredFields()`; `getFields()` returns only `public` fields (including inherited), missing private fields.",
      "Relying heavily on reflection for standard application logic, introducing severe performance degradation and losing compiler type checking.",
      "Relying heavily on reflection in performance-critical code paths, bypassing JIT inlining and access checks."
    ],
    "interviewRelevance": "Universal interview question: \"What is Reflection and where is it used?\", \"Difference between getMethods() and getDeclaredMethods()\", and \"What are the drawbacks of reflection?\"",
    "checkpoints": [
      {
        "id": "java-68-cp-1",
        "label": "Distinguish getMethods() (public only) from getDeclaredMethods() (all methods declared in class)"
      },
      {
        "id": "java-68-cp-2",
        "label": "Use setAccessible(true) to inspect private fields and explain performance tradeoffs"
      },
      {
        "id": "java-68-reflection-cp-3",
        "label": "Inspect class metadata, invoke methods dynamically, and handle reflective exceptions safely."
      }
    ],
    "practiceExercises": [
      {
        "id": "java-68-ex-1",
        "title": "Generic Object Property Printer",
        "difficulty": "Beginner",
        "type": "coding",
        "prompt": "Write a utility method printObjectProperties(Object obj) that prints all declared field names and values using reflection.",
        "solution": "import java.lang.reflect.Field;\n\npublic class PropertyPrinter {\n    public static void print(Object obj) throws Exception {\n        for (Field f : obj.getClass().getDeclaredFields()) {\n            f.setAccessible(true);\n            System.out.println(f.getName() + \" = \" + f.get(obj));\n        }\n    }\n    public static void main(String[] args) throws Exception {\n        print(new Object() { String name = \"Alice\"; int age = 22; });\n    }\n}",
        "explanation": "Iterating over getDeclaredFields() inspects all declared state dynamically."
      },
      {
        "id": "java-68-ex-2",
        "title": "Break Singleton Pattern via Reflection",
        "difficulty": "Intermediate",
        "type": "coding",
        "prompt": "Demonstrate how reflection can break a standard private-constructor Singleton class, and how to defend against it.",
        "solution": "import java.lang.reflect.Constructor;\n\nclass DefendedSingleton {\n    private static DefendedSingleton instance;\n    private DefendedSingleton() {\n        if (instance != null) {\n            throw new RuntimeException(\"Reflection attack blocked: Singleton already initialized!\");\n        }\n    }\n    public static DefendedSingleton getInstance() {\n        if (instance == null) instance = new DefendedSingleton();\n        return instance;\n    }\n}\n\npublic class BreakSingletonDemo {\n    public static void main(String[] args) {\n        DefendedSingleton.getInstance();\n        try {\n            Constructor<DefendedSingleton> c = DefendedSingleton.class.getDeclaredConstructor();\n            c.setAccessible(true);\n            c.newInstance(); // Triggers defense!\n        } catch (Exception e) {\n            System.out.println(\"Caught defense: \" + e.getCause().getMessage());\n        }\n    }\n}",
        "explanation": "Checking if instance != null inside the constructor blocks reflection from instantiating duplicate instances."
      },
      {
        "id": "java-68-ex-3",
        "title": "Java 9+ Modules Strong Encapsulation Barrier",
        "difficulty": "Advanced",
        "type": "conceptual",
        "prompt": "How did Java 9+ Modules (Project Jigsaw) and Java 17 restrict setAccessible(true) deep reflection across modules?",
        "solution": "In Java 17+, the JVM strongly encapsulates all internal JDK packages by default. Calling `setAccessible(true)` on non-public members of other modules throws `InaccessibleObjectException`. An external module can only perform deep reflection on a package if that package is explicitly opened using `opens <package>` or `opens <package> to <module>` in its `module-info.java`, or enabled globally via `--add-opens` JVM command line flags.",
        "explanation": "Strong encapsulation in Java 17 protects module internals from unauthorized reflection hacking."
      }
    ],
    "quizQuestions": [
      {
        "id": "java-68-q1",
        "question": "What is the difference between `clazz.getFields()` and `clazz.getDeclaredFields()` in Java Reflection?",
        "options": [
          "getFields() returns private fields; getDeclaredFields() returns public fields",
          "getFields() returns all public fields (including inherited); getDeclaredFields() returns all fields declared by the class regardless of access level",
          "They are identical",
          "getDeclaredFields() is deprecated in Java 17"
        ],
        "correctOptionIndex": 1,
        "explanation": "`getFields()` returns only public fields (including inherited ones), while `getDeclaredFields()` returns all fields (private, protected, default, public) declared directly in the class."
      },
      {
        "id": "java-68-q2",
        "question": "What method on `AccessibleObject` is used to suppress Java language access control checks (allowing access to private members)?",
        "options": [
          "makePublic()",
          "setAccessible(true)",
          "unlock()",
          "bypassSecurity()"
        ],
        "correctOptionIndex": 1,
        "explanation": "`setAccessible(true)` suppresses language access checks for fields, methods, and constructors."
      }
    ],
    "revisionNotes": [
      "Reflection inspects and manipulates classes, fields, and methods dynamically at runtime.",
      "`getDeclaredX()` accesses private members; `getX()` returns only public members.",
      "Reflection is slower than direct bytecode execution and bypasses compile-time type safety."
    ]
  },
  {
    "id": "java-69-multithreading-fundamentals",
    "moduleId": "java-m5",
    "moduleNumber": 5,
    "moduleTitle": "Advanced Java",
    "topicNumber": 69,
    "title": "Multithreading Fundamentals: Thread vs Runnable & Starting Threads",
    "language": "java",
    "level": "Intermediate",
    "whyItMatters": "Modern systems run on multi-core processors. Multithreading allows concurrent execution of independent tasks, improving CPU utilization and throughput. Knowing `Thread` vs `Runnable` is the first step in concurrency.",
    "explanation": "A thread is the smallest unit of execution within a process. Multiple threads within the same JVM process share the same Heap memory, but each thread has its own private Call Stack, Program Counter (PC), and local variables.\nTwo Primary Ways to Create a Thread:\n1. Extending `java.lang.Thread`:\n   - Subclass extends `Thread` and overrides `run()`.\n   - Disadvantage: Java only supports single class inheritance; extending `Thread` prevents extending any other class.\n2. Implementing `java.lang.Runnable` (Recommended Best Practice):\n   - Implement the `Runnable` functional interface (`void run()`).\n   - Separates the task to be executed from the thread execution mechanism.\n   - Supports multiple inheritance and clean integration with Thread Pools and Lambdas (`() -> doWork()`).\nStarting a Thread:\n- Always call `thread.start()`, NEVER `thread.run()`! Calling `start()` requests the OS scheduler to allocate a new call stack and spawn an OS-level thread. Calling `run()` directly merely executes the method synchronously on the current thread stack like a normal method call!",
    "syntaxAndStructure": "// 1. Implementing Runnable with Lambda (Best Practice):\nRunnable task = () -> System.out.println(\"Running on thread: \" + Thread.currentThread().getName());\nThread t1 = new Thread(task, \"Worker-1\");\nt1.start(); // Spawns new thread!\n\n// Daemon Thread (background service that doesn't prevent JVM exit):\nt1.setDaemon(true);",
    "codeExamples": [
      {
        "title": "Starting a Thread: start() vs run() Demonstration",
        "code": "public class ThreadStartDemo {\n    public static void main(String[] args) {\n        Runnable task = () -> {\n            System.out.println(\"Task executing on thread: \" + Thread.currentThread().getName());\n        };\n\n        Thread t1 = new Thread(task, \"DedicatedWorkerThread\");\n\n        // 1. Calling run() directly: DOES NOT SPAWN THREAD (Runs on main thread!)\n        System.out.print(\"Direct run() call -> \");\n        t1.run();\n\n        // 2. Calling start(): Spawns genuine OS thread\n        System.out.print(\"Calling start()  -> \");\n        t1.start();\n    }\n}",
        "expectedOutput": "Direct run() call -> Task executing on thread: main\nCalling start()  -> Task executing on thread: DedicatedWorkerThread",
        "explanation": "Calling run() directly executes synchronously on the current main thread. Calling start() causes the JVM to invoke the native OS thread creation routine."
      },
      {
        "title": "Daemon Threads vs User Threads Lifecycle",
        "code": "public class DaemonThreadDemo {\n    public static void main(String[] args) throws InterruptedException {\n        Thread daemonThread = new Thread(() -> {\n            while (true) {\n                // Background housekeeping loop\n            }\n        });\n        \n        // Mark as Daemon: JVM exits when all non-daemon user threads finish\n        daemonThread.setDaemon(true);\n        daemonThread.start();\n\n        System.out.println(\"Daemon thread running in background: \" + daemonThread.isDaemon());\n        System.out.println(\"Main user thread terminating. JVM will exit cleanly.\");\n    }\n}",
        "expectedOutput": "Daemon thread running in background: true\nMain user thread terminating. JVM will exit cleanly.",
        "explanation": "The JVM terminates immediately when all user threads complete, terminating any remaining daemon threads (e.g. Garbage Collector threads) automatically."
      }
    ],
    "realWorldApplications": [
      "Asynchronous task processing (sending emails, exporting reports, logging metrics).",
      "Web server thread pools (Tomcat, Netty) handling concurrent HTTP requests."
    ],
    "commonMistakes": [
      "Calling `thread.run()` instead of `thread.start()`, executing code synchronously without concurrency.",
      "Starting an already started thread twice (`thread.start(); thread.start();`), which throws `IllegalThreadStateException`.",
      "Calling run() directly instead of start() on a Thread, executing the task on the current calling thread instead of a new thread."
    ],
    "interviewRelevance": "Universal interview question: \"Difference between `Thread` and `Runnable`?\", \"What happens if you call `run()` instead of `start()`?\", and \"What is a Daemon Thread?\"",
    "checkpoints": [
      {
        "id": "java-69-cp-1",
        "label": "Explain why implementing Runnable is preferred over extending Thread"
      },
      {
        "id": "java-69-cp-2",
        "label": "Differentiate thread.start() (spawns stack) vs thread.run() (synchronous call)"
      },
      {
        "id": "java-69-multithreading-fundamentals-cp-3",
        "label": "Implement concurrent tasks using Runnable, Callable, and the Thread class."
      }
    ],
    "practiceExercises": [
      {
        "id": "java-69-ex-1",
        "title": "Print Numbers Concurrently from Two Threads",
        "difficulty": "Beginner",
        "type": "coding",
        "prompt": "Spawn two threads (Thread-A and Thread-B) that print numbers 1 to 5 with their thread names.",
        "solution": "public class ConcurrentPrint {\n    public static void main(String[] args) throws InterruptedException {\n        Runnable task = () -> {\n            for (int i = 1; i <= 3; i++) {\n                System.out.println(Thread.currentThread().getName() + \": \" + i);\n            }\n        };\n        Thread t1 = new Thread(task, \"Thread-A\");\n        Thread t2 = new Thread(task, \"Thread-B\");\n        t1.start();\n        t2.start();\n        t1.join();\n        t2.join();\n        System.out.println(\"Both threads completed.\");\n    }\n}",
        "explanation": "Thread.join() blocks the main thread until the target threads finish execution."
      },
      {
        "id": "java-69-ex-2",
        "title": "Thread Interruption Handling",
        "difficulty": "Intermediate",
        "type": "coding",
        "prompt": "Demonstrate how a long-running thread checks Thread.currentThread().isInterrupted() and handles InterruptedException cleanly.",
        "solution": "public class InterruptDemo {\n    public static void main(String[] args) throws InterruptedException {\n        Thread worker = new Thread(() -> {\n            while (!Thread.currentThread().isInterrupted()) {\n                try {\n                    Thread.sleep(100);\n                } catch (InterruptedException e) {\n                    System.out.println(\"Worker caught InterruptedException: exiting cleanly.\");\n                    break;\n                }\n            }\n        });\n        worker.start();\n        Thread.sleep(200);\n        worker.interrupt(); // Signal interruption\n    }\n}",
        "explanation": "Thread interruption is a cooperative cancellation signal; blocking methods throw InterruptedException when signaled."
      },
      {
        "id": "java-69-ex-3",
        "title": "Virtual Threads (Java 21 Project Loom)",
        "difficulty": "Advanced",
        "type": "coding",
        "prompt": "Demonstrate Java 21 Virtual Threads (Thread.ofVirtual().start()) and explain why 1,000,000 virtual threads can run without OOM.",
        "solution": "public class VirtualThreadDemo {\n    public static void main(String[] args) throws InterruptedException {\n        // Java 21 Virtual Thread\n        Thread vThread = Thread.ofVirtual().name(\"VThread-1\").start(() -> {\n            System.out.println(\"Running on virtual thread: \" + Thread.currentThread());\n        });\n        vThread.join();\n    }\n}",
        "explanation": "Virtual threads (Java 21) are lightweight user-mode threads managed by the JVM rather than the OS kernel. They consume only bytes of heap memory rather than megabytes of stack."
      }
    ],
    "quizQuestions": [
      {
        "id": "java-69-q1",
        "question": "What occurs if you call `t.start()` on a Thread that has already finished executing?",
        "options": [
          "It re-executes the thread from the beginning",
          "It throws java.lang.IllegalThreadStateException",
          "It does nothing",
          "It resets the thread call stack"
        ],
        "correctOptionIndex": 1,
        "explanation": "A thread cannot be restarted once started. Calling start() again throws `IllegalThreadStateException`."
      },
      {
        "id": "java-69-q2",
        "question": "What is the characteristic of a Daemon Thread in Java?",
        "options": [
          "It has higher priority than user threads",
          "The JVM terminates immediately when all non-daemon user threads complete, killing any remaining daemon threads",
          "It cannot be interrupted",
          "It runs in C++ space"
        ],
        "correctOptionIndex": 1,
        "explanation": "Daemon threads run in the background (e.g. GC) and do not keep the JVM alive when all user threads finish."
      }
    ],
    "revisionNotes": [
      "Prefer `Runnable` over `Thread` for clean decoupling and lambda integration.",
      "`thread.start()` spawns a new OS thread; `thread.run()` executes synchronously on the current thread.",
      "Daemon threads do not prevent JVM shutdown."
    ]
  },
  {
    "id": "java-70-thread-lifecycle-synchronization",
    "moduleId": "java-m5",
    "moduleNumber": 5,
    "moduleTitle": "Advanced Java",
    "topicNumber": 70,
    "title": "Thread Lifecycle, Synchronized Blocks & Monitor Locks",
    "language": "java",
    "level": "Intermediate",
    "whyItMatters": "When multiple threads mutate shared state concurrently, race conditions and memory corruption occur. Understanding the 6 thread lifecycle states, Java intrinsic monitor locks, and synchronized blocks is fundamental to concurrent programming.",
    "explanation": "1. Thread Lifecycle States (`java.lang.Thread.State`):\n   - `NEW`: Created but not yet started (`new Thread()`).\n   - `RUNNABLE`: Executing in JVM (or ready to run, scheduled by OS).\n   - `BLOCKED`: Waiting to acquire a monitor lock to enter/re-enter a synchronized block.\n   - `WAITING`: Waiting indefinitely for another thread (via `wait()`, `join()`, or `LockSupport.park()`).\n   - `TIMED_WAITING`: Waiting for a specified time (`sleep(ms)`, `wait(ms)`, `join(ms)`).\n   - `TERMINATED`: Method `run()` has completed.\n2. Synchronization & Intrinsic Locks (Monitors):\n   - Every object in Java has an associated intrinsic monitor lock (mutex).\n   - `synchronized` method: Acquires the monitor lock on `this` (or `ClassName.class` for static methods).\n   - `synchronized(lockObj)` block: Acquires the lock on `lockObj` for the duration of the critical section.\n   - Reentrancy: Java monitor locks are reentrant. A thread holding a lock can enter other synchronized blocks requiring the same lock without deadlocking itself.\n3. Inter-Thread Communication: `wait()`, `notify()`, and `notifyAll()` MUST be called inside a synchronized block on the lock object.",
    "syntaxAndStructure": "// Synchronized block on specific lock object (Best Practice):\nprivate final Object lock = new Object();\npublic void increment() {\n    synchronized(lock) {\n        count++; // Critical section protected by monitor lock\n    }\n}\n\n// Inter-thread signaling:\nsynchronized(lock) {\n    while (!condition) lock.wait(); // Release lock and wait\n    lock.notifyAll(); // Wake waiting threads\n}",
    "codeExamples": [
      {
        "title": "Preventing Race Conditions with Synchronized Block",
        "code": "public class SynchronizationDemo {\n    static class Counter {\n        private int count = 0;\n        private final Object lock = new Object();\n\n        public void increment() {\n            // Synchronized block ensures mutual exclusion (critical section)\n            synchronized (lock) {\n                count++;\n            }\n        }\n\n        public int getCount() { return count; }\n    }\n\n    public static void main(String[] args) throws InterruptedException {\n        Counter counter = new Counter();\n\n        // 2 threads incrementing 1,000 times each concurrently\n        Thread t1 = new Thread(() -> { for (int i = 0; i < 1000; i++) counter.increment(); });\n        Thread t2 = new Thread(() -> { for (int i = 0; i < 1000; i++) counter.increment(); });\n\n        t1.start();\n        t2.start();\n        t1.join();\n        t2.join();\n\n        // Without synchronization, result is often < 2000 due to lost updates\n        System.out.println(\"Final Counter value (exactly 2000): \" + counter.getCount());\n    }\n}",
        "expectedOutput": "Final Counter value (exactly 2000): 2000",
        "explanation": "The synchronized(lock) block guarantees atomicity and visibility, preventing race conditions and lost updates across concurrent threads."
      },
      {
        "title": "Classic Producer-Consumer with wait() and notify()",
        "code": "public class ProducerConsumerDemo {\n    static class Buffer {\n        private int data;\n        private boolean hasData = false;\n\n        public synchronized void produce(int val) throws InterruptedException {\n            while (hasData) {\n                wait(); // Release monitor lock and sleep until consumed\n            }\n            this.data = val;\n            this.hasData = true;\n            System.out.println(\"Produced: \" + val);\n            notify(); // Signal consumer thread\n        }\n\n        public synchronized int consume() throws InterruptedException {\n            while (!hasData) {\n                wait(); // Release monitor lock and sleep until produced\n            }\n            this.hasData = false;\n            System.out.println(\"Consumed: \" + data);\n            notify(); // Signal producer thread\n            return data;\n        }\n    }\n\n    public static void main(String[] args) throws Exception {\n        Buffer buffer = new Buffer();\n        Thread producer = new Thread(() -> {\n            try { buffer.produce(42); } catch (Exception e) {}\n        });\n        Thread consumer = new Thread(() -> {\n            try { buffer.consume(); } catch (Exception e) {}\n        });\n\n        consumer.start();\n        Thread.sleep(50);\n        producer.start();\n        producer.join();\n        consumer.join();\n    }\n}",
        "expectedOutput": "Produced: 42\nConsumed: 42",
        "explanation": "wait() and notify() coordinate threads over shared monitor locks. wait() is always enclosed in a while loop to guard against spurious wakeups."
      }
    ],
    "realWorldApplications": [
      "Coordinating thread pools and shared bounded buffers.",
      "Protecting critical financial balance updates in banking transactions."
    ],
    "commonMistakes": [
      "Synchronizing on `new Object()` inside the method: `synchronized(new Object())` creates a new lock every call, providing ZERO mutual exclusion!",
      "Calling `wait()` outside of a `while` loop; threads can experience \"spurious wakeups\", resuming execution even if the condition is still false.",
      "Synchronizing on different lock objects across threads that intend to protect the same shared resource."
    ],
    "interviewRelevance": "Universal interview question: \"What are the 6 Thread states?\", \"Why must wait() and notify() be called inside a synchronized block?\", and \"Why must wait() be in a while loop?\"",
    "checkpoints": [
      {
        "id": "java-70-cp-1",
        "label": "Memorize the 6 thread states: NEW, RUNNABLE, BLOCKED, WAITING, TIMED_WAITING, TERMINATED"
      },
      {
        "id": "java-70-cp-2",
        "label": "Explain intrinsic monitor locks, reentrancy, and spurious wakeups in wait/notify"
      },
      {
        "id": "java-70-thread-lifecycle-synchronization-cp-3",
        "label": "Coordinate thread execution using synchronized blocks and wait/notify monitors."
      }
    ],
    "practiceExercises": [
      {
        "id": "java-70-ex-1",
        "title": "Inspect Thread States Programmatically",
        "difficulty": "Beginner",
        "type": "coding",
        "prompt": "Write a program that inspects a thread in state NEW, TIMED_WAITING (sleep), and TERMINATED.",
        "solution": "public class ThreadStateInspect {\n    public static void main(String[] args) throws Exception {\n        Thread t = new Thread(() -> {\n            try { Thread.sleep(200); } catch (Exception e) {}\n        });\n        System.out.println(\"State 1: \" + t.getState()); // NEW\n        t.start();\n        Thread.sleep(50);\n        System.out.println(\"State 2: \" + t.getState()); // TIMED_WAITING\n        t.join();\n        System.out.println(\"State 3: \" + t.getState()); // TERMINATED\n    }\n}",
        "explanation": "t.getState() reflects the lifecycle transitions of the thread."
      },
      {
        "id": "java-70-ex-2",
        "title": "Why IllegalMonitorStateException Occurs",
        "difficulty": "Intermediate",
        "type": "coding",
        "prompt": "Demonstrate why calling lock.wait() without holding the lock on lock throws IllegalMonitorStateException.",
        "solution": "public class IllegalMonitorDemo {\n    public static void main(String[] args) {\n        Object lock = new Object();\n        try {\n            lock.wait(); // DANGER: Not inside synchronized(lock)!\n        } catch (IllegalMonitorStateException e) {\n            System.out.println(\"Caught expected: current thread is not owner of monitor lock!\");\n        } catch (InterruptedException e) {}\n    }\n}",
        "explanation": "wait() requires holding the intrinsic monitor lock of that specific object; otherwise it throws IllegalMonitorStateException."
      },
      {
        "id": "java-70-ex-3",
        "title": "Deadlock Simulation and Prevention",
        "difficulty": "Advanced",
        "type": "coding",
        "prompt": "Write a scenario where Thread 1 acquires LockA then LockB, and Thread 2 acquires LockB then LockA causing deadlock, and explain how to prevent it.",
        "solution": "public class DeadlockExplanation {\n    // Deadlock occurs when threads acquire locks in opposing order:\n    // Thread 1: LockA -> LockB\n    // Thread 2: LockB -> LockA\n    // Prevention: Always acquire locks in a globally consistent order (Lock Acquisition Ordering):\n    // Both Thread 1 and Thread 2 must acquire LockA first, then LockB.\n    public static void main(String[] args) {\n        System.out.println(\"Deadlock prevented by enforcing global lock acquisition ordering.\");\n    }\n}",
        "explanation": "Deadlock is broken by enforcing strict hierarchical lock acquisition ordering across all threads."
      }
    ],
    "quizQuestions": [
      {
        "id": "java-70-q1",
        "question": "Why should `wait()` always be invoked inside a `while (condition)` loop rather than an `if (condition)` statement?",
        "options": [
          "Because wait() throws a compile error inside if",
          "To protect against \"spurious wakeups\" where the thread wakes up without being signaled",
          "Because while loops execute on CPU cache",
          "Because if statements cannot be synchronized"
        ],
        "correctOptionIndex": 1,
        "explanation": "Threads can wake up from wait() spuriously without notify() being called. A while loop re-checks the condition before proceeding."
      },
      {
        "id": "java-70-q2",
        "question": "What exception is thrown if a thread calls `obj.wait()` or `obj.notify()` without holding the monitor lock on `obj`?",
        "options": [
          "NullPointerException",
          "IllegalMonitorStateException",
          "InterruptedException",
          "IllegalThreadStateException"
        ],
        "correctOptionIndex": 1,
        "explanation": "`java.lang.IllegalMonitorStateException` is thrown if the current thread does not own the object's monitor lock."
      }
    ],
    "revisionNotes": [
      "6 Thread States: NEW, RUNNABLE, BLOCKED, WAITING, TIMED_WAITING, TERMINATED.",
      "Synchronized blocks acquire the object’s intrinsic monitor lock.",
      "Always call `wait()` inside a `while (!condition)` loop to defend against spurious wakeups."
    ]
  },
  {
    "id": "java-71-locks-concurrent-collections",
    "moduleId": "java-m5",
    "moduleNumber": 5,
    "moduleTitle": "Advanced Java",
    "topicNumber": 71,
    "title": "Explicit Locks, ReentrantLock, Atomics & Concurrent Collections",
    "language": "java",
    "level": "Intermediate",
    "whyItMatters": "While `synchronized` is simple, `java.util.concurrent` (JUC) provides explicit locks with timeout attempts (`tryLock`), fair queuing, lock-free atomic variables, and high-throughput concurrent collections like `ConcurrentHashMap`.",
    "explanation": "Java 5 introduced `java.util.concurrent` (JUC):\n1. `ReentrantLock` vs `synchronized`:\n   - `tryLock(timeout)`: Can attempt to acquire a lock and give up if unavailable, preventing indefinite deadlocks.\n   - Fairness: Can specify `new ReentrantLock(true)` to grant locks in FIFO order to longest-waiting threads.\n   - Interruptible lock acquisition: `lockInterruptibly()`.\n   - Must always unlock in a `finally` block: `lock.lock(); try { ... } finally { lock.unlock(); }`.\n2. `ReentrantReadWriteLock`:\n   - Multiple concurrent readers (read-lock shared).\n   - Exactly one writer (write-lock exclusive). Drastically improves read-heavy performance.\n3. Atomic Variables (`AtomicInteger`, `AtomicLong`, `AtomicReference`):\n   - Lock-free thread-safety using hardware-level Compare-And-Swap (CAS) instructions.\n   - Fast, non-blocking counter increments (`incrementAndGet()`).\n4. Concurrent Collections:\n   - `ConcurrentHashMap`: Segmented/synchronized buckets (Java 8+ uses CAS + synchronized per bucket node). Multiple threads can read and write concurrently without locking the entire map.\n   - `CopyOnWriteArrayList`: Writes clone the backing array; reads are lock-free.",
    "syntaxAndStructure": "// ReentrantLock pattern:\nLock lock = new ReentrantLock();\nlock.lock();\ntry {\n    // Critical section\n} finally {\n    lock.unlock(); // Mandatory cleanup\n}\n\n// Lock-free AtomicInteger:\nAtomicInteger counter = new AtomicInteger(0);\ncounter.incrementAndGet(); // Atomic CAS",
    "codeExamples": [
      {
        "title": "ReentrantLock with tryLock Timeout to Avoid Deadlocks",
        "code": "import java.util.concurrent.TimeUnit;\nimport java.util.concurrent.locks.Lock;\nimport java.util.concurrent.locks.ReentrantLock;\n\npublic class ReentrantLockDemo {\n    private final Lock lock = new ReentrantLock();\n\n    public void performTask() {\n        try {\n            // Attempt to acquire lock within 100 milliseconds\n            if (lock.tryLock(100, TimeUnit.MILLISECONDS)) {\n                try {\n                    System.out.println(Thread.currentThread().getName() + \" acquired lock successfully.\");\n                    Thread.sleep(50);\n                } finally {\n                    lock.unlock(); // Always release lock in finally!\n                }\n            } else {\n                System.out.println(Thread.currentThread().getName() + \" timed out waiting for lock.\");\n            }\n        } catch (InterruptedException e) {\n            Thread.currentThread().interrupt();\n        }\n    }\n\n    public static void main(String[] args) throws InterruptedException {\n        ReentrantLockDemo demo = new ReentrantLockDemo();\n        Thread t1 = new Thread(demo::performTask, \"Worker-1\");\n        Thread t2 = new Thread(demo::performTask, \"Worker-2\");\n\n        t1.start();\n        t2.start();\n        t1.join();\n        t2.join();\n    }\n}",
        "expectedOutput": "Worker-1 acquired lock successfully.\nWorker-2 acquired lock successfully.",
        "explanation": "tryLock(timeout) attempts lock acquisition without blocking indefinitely, allowing threads to back off gracefully if congested."
      },
      {
        "title": "Lock-Free Counter with AtomicInteger (CAS)",
        "code": "import java.util.concurrent.atomic.AtomicInteger;\n\npublic class AtomicCounterDemo {\n    public static void main(String[] args) throws InterruptedException {\n        AtomicInteger atomicCounter = new AtomicInteger(0);\n\n        Thread t1 = new Thread(() -> {\n            for (int i = 0; i < 500; i++) atomicCounter.incrementAndGet();\n        });\n        Thread t2 = new Thread(() -> {\n            for (int i = 0; i < 500; i++) atomicCounter.incrementAndGet();\n        });\n\n        t1.start();\n        t2.start();\n        t1.join();\n        t2.join();\n\n        System.out.println(\"Final Atomic Count (Lock-free CAS): \" + atomicCounter.get());\n    }\n}",
        "expectedOutput": "Final Atomic Count (Lock-free CAS): 1000",
        "explanation": "AtomicInteger uses hardware Compare-And-Swap (CAS) CPU instructions, achieving thread-safe increments without thread locking overhead."
      }
    ],
    "realWorldApplications": [
      "High-throughput web servers using `ConcurrentHashMap` for session token storage.",
      "Lock-free performance metrics and request throughput rate counters."
    ],
    "commonMistakes": [
      "Forgetting to call `lock.unlock()` inside a `finally` block; if an exception occurs in the try block, the lock is never released, causing a permanent system hang!",
      "Using `Collections.synchronizedMap()` instead of `ConcurrentHashMap`; synchronizedMap locks the entire map on every read and write, creating a severe bottleneck.",
      "Calling lock.lock() without placing lock.unlock() in a finally block, causing permanent deadlocks if an exception occurs."
    ],
    "interviewRelevance": "Universal interview question: \"ReentrantLock vs synchronized?\", \"How does ConcurrentHashMap work in Java 8?\", and \"What is Compare-And-Swap (CAS)?\"",
    "checkpoints": [
      {
        "id": "java-71-cp-1",
        "label": "Use ReentrantLock with mandatory try-finally unlock pattern"
      },
      {
        "id": "java-71-cp-2",
        "label": "Explain how ConcurrentHashMap achieves high concurrency without locking the entire map"
      },
      {
        "id": "java-71-locks-concurrent-collections-cp-3",
        "label": "Utilize ReentrantLock, ReadWriteLock, and ConcurrentHashMap for high concurrency."
      }
    ],
    "practiceExercises": [
      {
        "id": "java-71-ex-1",
        "title": "ReentrantReadWriteLock Cache",
        "difficulty": "Beginner",
        "type": "coding",
        "prompt": "Implement a read-heavy key-value store using ReentrantReadWriteLock allowing concurrent reads and exclusive writes.",
        "solution": "import java.util.*;\nimport java.util.concurrent.locks.*;\n\npublic class ReadWriteCache<K, V> {\n    private final Map<K, V> map = new HashMap<>();\n    private final ReentrantReadWriteLock rwl = new ReentrantReadWriteLock();\n\n    public V get(K key) {\n        rwl.readLock().lock();\n        try { return map.get(key); }\n        finally { rwl.readLock().unlock(); }\n    }\n\n    public void put(K key, V val) {\n        rwl.writeLock().lock();\n        try { map.put(key, val); }\n        finally { rwl.writeLock().unlock(); }\n    }\n    public static void main(String[] args) {\n        ReadWriteCache<String, String> cache = new ReadWriteCache<>();\n        cache.put(\"K1\", \"V1\");\n        System.out.println(\"Read: \" + cache.get(\"K1\"));\n    }\n}",
        "explanation": "ReadLock allows multiple concurrent readers; WriteLock grants exclusive single-thread access."
      },
      {
        "id": "java-71-ex-2",
        "title": "AtomicReference CompareAndSet Simulation",
        "difficulty": "Intermediate",
        "type": "coding",
        "prompt": "Use AtomicReference to update an object reference only if it matches an expected current value.",
        "solution": "import java.util.concurrent.atomic.AtomicReference;\n\npublic class AtomicRefDemo {\n    public static void main(String[] args) {\n        AtomicReference<String> state = new AtomicReference<>(\"INIT\");\n        boolean updated = state.compareAndSet(\"INIT\", \"RUNNING\");\n        System.out.println(\"Updated successfully: \" + updated);\n        System.out.println(\"Current state: \" + state.get());\n    }\n}",
        "explanation": "compareAndSet(expect, update) atomically verifies and swaps the reference in a single instruction."
      },
      {
        "id": "java-71-ex-3",
        "title": "ConcurrentHashMap Java 8 Internals (CAS + synchronized)",
        "difficulty": "Advanced",
        "type": "conceptual",
        "prompt": "How did Java 8 redesign ConcurrentHashMap to eliminate the legacy Segment array from Java 7?",
        "solution": "In Java 7, ConcurrentHashMap divided the table into 16 `Segment` locks (Segment-level locking). In Java 8, Segments were eliminated. Java 8 uses a plain `Node<K, V>[]` table. When inserting a new key into an empty bucket, it uses lock-free Compare-And-Swap (`CAS`). If the bucket already has nodes (collision), it locks ONLY the head node of that specific bucket using `synchronized(node)`. This shrinks lock contention to individual bucket nodes rather than entire table segments.",
        "explanation": "Java 8 ConcurrentHashMap uses CAS for empty buckets and locks only single bucket heads on collision."
      }
    ],
    "quizQuestions": [
      {
        "id": "java-71-q1",
        "question": "Where must `lock.unlock()` always be called when using explicit Locks in Java?",
        "options": [
          "At the beginning of the method",
          "Inside a `finally` block to guarantee release even if exceptions occur",
          "Inside the catch block only",
          "Only after the thread finishes"
        ],
        "correctOptionIndex": 1,
        "explanation": "Explicit locks must always be released in a `finally` block to prevent permanent deadlocks on exceptions."
      },
      {
        "id": "java-71-q2",
        "question": "What hardware-level CPU mechanism is utilized by AtomicInteger and AtomicLong to achieve lock-free thread safety?",
        "options": [
          "OS Mutex locks",
          "Compare-And-Swap (CAS) instructions",
          "Java monitor locks",
          "Thread.sleep polling"
        ],
        "correctOptionIndex": 1,
        "explanation": "Atomic classes use native Compare-And-Swap (CAS) instructions (via Unsafe / VarHandle) for atomic updates."
      }
    ],
    "revisionNotes": [
      "`ReentrantLock` supports tryLock(timeout), fairness, and interruptible locks.",
      "Always release explicit locks inside `finally` blocks.",
      "`ConcurrentHashMap` locks only individual bucket heads, achieving high concurrent throughput."
    ]
  },
  {
    "id": "java-72-executorservice-completablefuture",
    "moduleId": "java-m5",
    "moduleNumber": 5,
    "moduleTitle": "Advanced Java",
    "topicNumber": 72,
    "title": "ExecutorService, Thread Pools & CompletableFuture Async Pipelines",
    "language": "java",
    "level": "Intermediate",
    "whyItMatters": "In production, manually creating `new Thread()` is prohibited because thread allocation is expensive. The `ExecutorService` framework manages thread pools, while `CompletableFuture` (Java 8+) provides non-blocking, reactive asynchronous composition.",
    "explanation": "1. The Problem with `new Thread()`: Spawning a native OS thread costs ~1MB of memory and thousands of CPU cycles. Uncontrolled thread creation causes `OutOfMemoryError: unable to create new native thread`.\n2. `ExecutorService` & Thread Pools:\n   - Manages a pool of reusable worker threads.\n   - `Executors.newFixedThreadPool(n)`: Fixed number of threads with an unbounded queue.\n   - `Executors.newCachedThreadPool()`: Dynamically creates threads, reclaiming idle threads after 60s.\n   - `Callable<V>`: Like Runnable, but returns a value and can throw checked exceptions.\n   - `Future<V>`: Represents the pending result of an async computation (`future.get()` blocks until ready).\n3. `CompletableFuture<T>` (Asynchronous Reactive Pipelines):\n   - Non-blocking completion: Does NOT require blocking on `future.get()`.\n   - Chaining Stages: `thenApply()` (map result), `thenAccept()` (consume result), `thenCompose()` (flatMap async task).\n   - Combining: `CompletableFuture.allOf(f1, f2, f3)` waits for multiple async tasks concurrently.\n   - Exception Handling: `exceptionally(fn)` and `handle(fn)`.",
    "syntaxAndStructure": "// Thread Pool:\nExecutorService executor = Executors.newFixedThreadPool(4);\nFuture<String> future = executor.submit(() -> \"Result\");\nString res = future.get(); // Blocking\nexecutor.shutdown();\n\n// CompletableFuture (Non-blocking):\nCompletableFuture.supplyAsync(() -> fetchUserData())\n    .thenApply(user -> enrichProfile(user))\n    .thenAccept(profile -> display(profile))\n    .exceptionally(ex -> { log.error(ex); return null; });",
    "codeExamples": [
      {
        "title": "ExecutorService Thread Pool Task Submission and Shutdown",
        "code": "import java.util.concurrent.Callable;\nimport java.util.concurrent.ExecutorService;\nimport java.util.concurrent.Executors;\nimport java.util.concurrent.Future;\n\npublic class ExecutorServiceDemo {\n    public static void main(String[] args) throws Exception {\n        // Pool of 2 reusable worker threads\n        ExecutorService pool = Executors.newFixedThreadPool(2);\n\n        Callable<Integer> calculateTask = () -> {\n            Thread.sleep(50);\n            return 42 * 2;\n        };\n\n        Future<Integer> future = pool.submit(calculateTask);\n        System.out.println(\"Task submitted. Doing other work...\");\n\n        // future.get() retrieves the computed result\n        int result = future.get();\n        System.out.println(\"Result received from thread pool: \" + result);\n\n        // Always shutdown executor pools\n        pool.shutdown();\n        System.out.println(\"Pool shutdown complete: \" + pool.isShutdown());\n    }\n}",
        "expectedOutput": "Task submitted. Doing other work...\nResult received from thread pool: 84\nPool shutdown complete: true",
        "explanation": "ExecutorService decouples task submission from thread management. pool.shutdown() gracefully finishes executing submitted tasks."
      },
      {
        "title": "Asynchronous Reactive Pipeline with CompletableFuture",
        "code": "import java.util.concurrent.CompletableFuture;\n\npublic class CompletableFuturePipelineDemo {\n    public static void main(String[] args) {\n        System.out.println(\"Initiating async pipeline...\");\n\n        CompletableFuture<String> pipeline = CompletableFuture\n            .supplyAsync(() -> \"Candidate_101\") // Async task\n            .thenApply(id -> id + \": Placement Qualified\") // Transform\n            .thenApply(String::toUpperCase); // Transform\n\n        // Extract result\n        System.out.println(\"Pipeline output: \" + pipeline.join());\n    }\n}",
        "expectedOutput": "Initiating async pipeline...\nPipeline output: CANDIDATE_101: PLACEMENT QUALIFIED",
        "explanation": "CompletableFuture chains asynchronous computations declaratively using supplyAsync and thenApply without blocking intermediate threads."
      }
    ],
    "realWorldApplications": [
      "Fan-out and fan-in API aggregations (fetching user details, order history, and payment status concurrently with `CompletableFuture.allOf`).",
      "High-throughput web servers managing thread pools sized to available CPU cores."
    ],
    "commonMistakes": [
      "Forgetting to call `executor.shutdown()`; worker threads in the pool remain active, preventing the JVM process from exiting!",
      "Using `Executors.newFixedThreadPool(n)` with massive traffic; its internal queue is unbounded (`LinkedBlockingQueue`), which can cause `OutOfMemoryError` under sustained load.",
      "Forgetting to shut down an ExecutorService, keeping worker threads alive and preventing JVM termination."
    ],
    "interviewRelevance": "Universal interview question: \"Callable vs Runnable\", \"Future vs CompletableFuture\", \"How to size a thread pool for CPU-bound vs I/O-bound tasks?\", and \"How does CompletableFuture handle exceptions?\"",
    "checkpoints": [
      {
        "id": "java-72-cp-1",
        "label": "Explain differences between Runnable (void, no throws) and Callable (returns T, throws Exception)"
      },
      {
        "id": "java-72-cp-2",
        "label": "Build non-blocking asynchronous processing chains using CompletableFuture"
      },
      {
        "id": "java-72-executorservice-completablefuture-cp-3",
        "label": "Coordinate asynchronous pipelines and combine multiple futures using CompletableFuture."
      }
    ],
    "practiceExercises": [
      {
        "id": "java-72-ex-1",
        "title": "Thread Pool Sizing Formula",
        "difficulty": "Beginner",
        "type": "conceptual",
        "prompt": "What is the optimal thread pool sizing formula for CPU-bound tasks vs I/O-bound tasks?",
        "solution": "1. CPU-Bound Tasks (algorithmic calculations, image rendering): Pool size = `Number of CPU Cores + 1` (or `Runtime.getRuntime().availableProcessors()`). Additional threads cause context-switching overhead without throughput gain.\n2. I/O-Bound Tasks (database queries, network API calls): Pool size = `Cores * (1 + Wait Time / Service Time)`. Because threads spend most time blocked waiting for I/O, a higher pool size (e.g. 50-100 threads) maximizes CPU utilization.",
        "explanation": "Sizing depends on the ratio of CPU computation time to external I/O blocking wait time."
      },
      {
        "id": "java-72-ex-2",
        "title": "CompletableFuture.allOf Multi-Service Aggregator",
        "difficulty": "Intermediate",
        "type": "coding",
        "prompt": "Use CompletableFuture.allOf to run 3 async tasks in parallel and print when all three have completed.",
        "solution": "import java.util.concurrent.CompletableFuture;\n\npublic class AllOfDemo {\n    public static void main(String[] args) {\n        var f1 = CompletableFuture.runAsync(() -> System.out.println(\"Service 1 done\"));\n        var f2 = CompletableFuture.runAsync(() -> System.out.println(\"Service 2 done\"));\n        var f3 = CompletableFuture.runAsync(() -> System.out.println(\"Service 3 done\"));\n\n        CompletableFuture.allOf(f1, f2, f3).join();\n        System.out.println(\"All services completed successfully.\");\n    }\n}",
        "explanation": "CompletableFuture.allOf waits for an arbitrary number of asynchronous futures concurrently."
      },
      {
        "id": "java-72-ex-3",
        "title": "ThreadPoolExecutor Rejection Policies",
        "difficulty": "Advanced",
        "type": "conceptual",
        "prompt": "Name and explain the 4 RejectedExecutionHandler policies in ThreadPoolExecutor when the pool and queue are both full.",
        "solution": "1. `AbortPolicy` (Default): Throws `RejectedExecutionException` immediately.\n2. `CallerRunsPolicy`: The thread submitting the task (caller) executes the task itself, throttling incoming submissions.\n3. `DiscardPolicy`: Silently drops the rejected task without an exception.\n4. `DiscardOldestPolicy`: Discards the oldest unhandled task in the queue and retries submitting the new task.",
        "explanation": "Rejection policies govern backpressure management under peak traffic spikes."
      }
    ],
    "quizQuestions": [
      {
        "id": "java-72-q1",
        "question": "What is the difference between `Runnable` and `Callable` in Java concurrency?",
        "options": [
          "Runnable can return a value; Callable cannot",
          "Callable can return a value and throw checked exceptions; Runnable returns void and cannot throw checked exceptions",
          "Runnable runs on daemon threads only",
          "Callable is deprecated in Java 17"
        ],
        "correctOptionIndex": 1,
        "explanation": "`Callable<V>` defines `V call() throws Exception`, returning a computed value and allowing checked exceptions."
      },
      {
        "id": "java-72-q2",
        "question": "What happens if a developer omits calling `executor.shutdown()` on a created ExecutorService?",
        "options": [
          "The pool shuts down automatically after 10 seconds",
          "The worker threads in the pool keep running, preventing the JVM from terminating",
          "It throws an OutOfMemoryError immediately",
          "Nothing, it is optional"
        ],
        "correctOptionIndex": 1,
        "explanation": "Worker threads in a thread pool are non-daemon user threads. Unless shut down, they keep the JVM alive indefinitely."
      }
    ],
    "revisionNotes": [
      "Always use ExecutorService thread pools rather than spawning raw `new Thread()` instances.",
      "`Callable<T>` returns a value and throws exceptions; `Runnable` returns void.",
      "`CompletableFuture` enables non-blocking, reactive asynchronous processing pipelines."
    ]
  },
  {
    "id": "java-73-jvm-memory-gc-performance",
    "moduleId": "java-m5",
    "moduleNumber": 5,
    "moduleTitle": "Advanced Java",
    "topicNumber": 73,
    "title": "JVM Memory Architecture, Garbage Collection & Performance Tuning",
    "language": "java",
    "level": "Intermediate",
    "whyItMatters": "Understanding the Generational Garbage Collection hypothesis, JVM memory regions (Heap, Metaspace, Stack), and GC algorithms (G1, ZGC) is essential for diagnosing OutOfMemoryError and performance tuning in high-scale systems.",
    "explanation": "1. JVM Memory Areas:\n   - Heap Memory: Shared across all threads. Divided into Young Generation (Eden space, Survivor spaces S0 and S1) and Old Generation (Tenured).\n   - Metaspace (Java 8+): Replaced PermGen. Stored in native OS memory; holds loaded class metadata, bytecode, and method tables.\n   - Thread Stacks: Private per-thread stack holding method frames and local variables.\n2. The Weak Generational Hypothesis:\n   - Most objects die young (short-lived temporary variables).\n   - Objects that survive multiple GC cycles are promoted from Eden -> S0/S1 -> Old Generation.\n   - Minor GC: Rapidly reclaims short-lived objects in Eden and Survivor spaces.\n   - Major / Full GC: Cleans the Old Generation and Metaspace (causes longer Stop-The-World STW pauses).\n3. Modern Garbage Collectors:\n   - Serial / Parallel GC: High throughput, longer pause times.\n   - G1 GC (Garbage-First, default in Java 9+): Partitions heap into regions; cleans regions with the most garbage first within a target pause time.\n   - ZGC (Z Garbage Collector, Java 15/21): Ultra-low latency concurrent collector with pause times sub-millisecond (< 1ms) even on terabyte heaps.",
    "syntaxAndStructure": "// Common JVM Tuning Flags:\n// -Xms4g -Xmx4g               // Initial and Maximum Heap size\n// -XX:+UseG1GC                // Enable G1 Collector (Default)\n// -XX:MaxGCPauseMillis=200    // Target pause time\n// -XX:+UseZGC                 // Enable Ultra-Low Latency ZGC (Java 15+)\n// -XX:+HeapDumpOnOutOfMemoryError // Dumps heap profile on crash",
    "codeExamples": [
      {
        "title": "Inspecting Runtime Heap Allocation and Garbage Collection",
        "code": "public class JVMHeapDiagnosticsDemo {\n    public static void main(String[] args) {\n        Runtime runtime = Runtime.getRuntime();\n\n        long maxMemory = runtime.maxMemory() / (1024 * 1024);\n        long totalMemory = runtime.totalMemory() / (1024 * 1024);\n        long freeMemory = runtime.freeMemory() / (1024 * 1024);\n        long usedMemory = totalMemory - freeMemory;\n\n        System.out.println(\"Max Heap (-Xmx): \" + maxMemory + \" MB\");\n        System.out.println(\"Total Allocated Heap: \" + totalMemory + \" MB\");\n        System.out.println(\"Used Heap: \" + usedMemory + \" MB\");\n        System.out.println(\"Free Heap: \" + freeMemory + \" MB\");\n\n        // Requesting Garbage Collection (hint only, not guaranteed)\n        System.gc();\n        System.out.println(\"GC hint issued successfully.\");\n    }\n}",
        "expectedOutput": "Max Heap (-Xmx): 4096 MB\nTotal Allocated Heap: 256 MB\nUsed Heap: 12 MB\nFree Heap: 244 MB\nGC hint issued successfully.",
        "explanation": "Runtime APIs allow inspecting JVM heap memory footprint. System.gc() is merely a suggestion to the JVM execution engine, not a guarantee."
      },
      {
        "title": "Reference Types: Strong, Soft, Weak & Phantom",
        "code": "import java.lang.ref.SoftReference;\nimport java.lang.ref.WeakReference;\n\npublic class ReferenceTypesDemo {\n    public static void main(String[] args) {\n        // 1. Strong Reference: Standard reference (never GC'd while reachable)\n        String strong = new String(\"Strong Object\");\n\n        // 2. Soft Reference: GC'd only when JVM is low on memory (ideal for in-memory caches)\n        SoftReference<String> soft = new SoftReference<>(new String(\"Soft Cache Object\"));\n\n        // 3. Weak Reference: GC'd on the very NEXT garbage collection cycle!\n        WeakReference<String> weak = new WeakReference<>(new String(\"Weak Object\"));\n\n        System.out.println(\"Strong: \" + strong);\n        System.out.println(\"Soft before low memory: \" + soft.get());\n        System.out.println(\"Weak before GC: \" + weak.get());\n    }\n}",
        "expectedOutput": "Strong: Strong Object\nSoft before low memory: Soft Cache Object\nWeak before GC: Weak Object",
        "explanation": "SoftReference is ideal for memory-sensitive caches (cleared before OutOfMemoryError). WeakReference is cleared during the next GC cycle (used in WeakHashMap)."
      }
    ],
    "realWorldApplications": [
      "JVM heap tuning in high-throughput microservices using G1GC and ZGC flags.",
      "Analyzing heap dumps (.hprof) in Eclipse Memory Analyzer (MAT) to identify memory leaks."
    ],
    "commonMistakes": [
      "Calling `System.gc()` in production code; it requests a full Stop-The-World GC that degrades latency.",
      "Setting `-Xms` and `-Xmx` to different values in production; keeping them equal prevents dynamic heap resizing pauses.",
      "Creating memory leaks by retaining object references in static collections or uncleared ThreadLocal variables."
    ],
    "interviewRelevance": "Universal senior interview question: \"Explain the Generational GC hypothesis\", \"G1 GC vs ZGC\", \"Strong vs Soft vs Weak references\", and \"How do you diagnose OutOfMemoryError?\"",
    "checkpoints": [
      {
        "id": "java-73-cp-1",
        "label": "Explain the Weak Generational Hypothesis and Eden/Survivor/Tenured heap regions"
      },
      {
        "id": "java-73-cp-2",
        "label": "Compare G1 GC (region-based) and modern ZGC (sub-millisecond pause times)"
      },
      {
        "id": "java-73-jvm-memory-gc-performance-cp-3",
        "label": "Analyze generational memory (Eden, Survivor, Tenured), GC pauses, and tune JVM flags."
      }
    ],
    "practiceExercises": [
      {
        "id": "java-73-ex-1",
        "title": "Differentiate OOM Error Varieties",
        "difficulty": "Beginner",
        "type": "conceptual",
        "prompt": "Differentiate between: 1) java.lang.OutOfMemoryError: Java heap space, 2) OutOfMemoryError: Metaspace, 3) StackOverflowError.",
        "solution": "1) `Java heap space`: Heap is exhausted; objects cannot be allocated (memory leak or insufficient -Xmx).\n2) `Metaspace`: Native memory holding loaded class metadata is exhausted (too many dynamically generated classes via CGLIB/proxies; fix with -XX:MaxMetaspaceSize).\n3) `StackOverflowError`: A thread's call stack is exhausted, typically due to deep/infinite recursion (fix recursion or increase -Xss).",
        "explanation": "Each error maps to a distinct JVM memory region (Heap vs Native Metaspace vs Thread Call Stack)."
      },
      {
        "id": "java-73-ex-2",
        "title": "WeakHashMap Cache Simulation",
        "difficulty": "Intermediate",
        "type": "coding",
        "prompt": "Demonstrate how WeakHashMap automatically evicts keys when external strong references are removed.",
        "solution": "import java.util.*;\n\npublic class WeakHashMapDemo {\n    public static void main(String[] args) throws InterruptedException {\n        Map<Object, String> weakMap = new WeakHashMap<>();\n        Object key = new Object();\n        weakMap.put(key, \"Metadata\");\n\n        System.out.println(\"Before nullifying key, map size: \" + weakMap.size());\n        key = null; // Remove strong reference\n        System.gc(); // Suggest GC\n        Thread.sleep(100);\n\n        System.out.println(\"After GC, WeakHashMap size: \" + weakMap.size()); // Evicted (0)!\n    }\n}",
        "explanation": "WeakHashMap keys are wrapped in WeakReference; when the strong reference is cleared, GC evicts the entry."
      },
      {
        "id": "java-73-ex-3",
        "title": "ZGC Colored Pointers and Load Barriers",
        "difficulty": "Advanced",
        "type": "conceptual",
        "prompt": "How does ZGC achieve sub-millisecond Stop-The-World pauses using Colored Pointers and Load Barriers?",
        "solution": "ZGC stores reference metadata directly inside the 64-bit pointer address (Colored Pointers: Marked0, Marked1, Remapped bits). Because metadata is in the pointer, ZGC can relocate heap objects concurrently while the application is running. When application threads read an object reference, a JIT-compiled \"Load Barrier\" intercepts the read; if the object has been moved, the load barrier immediately updates the reference in place (Self-Healing). This eliminates long STW pauses.",
        "explanation": "ZGC colored pointers and load barriers enable concurrent object relocation without halting execution."
      }
    ],
    "quizQuestions": [
      {
        "id": "java-73-q1",
        "question": "What is the default Garbage Collector in modern Java (Java 9 through Java 21)?",
        "options": [
          "Serial GC",
          "Parallel GC",
          "G1 GC (Garbage-First)",
          "ZGC"
        ],
        "correctOptionIndex": 2,
        "explanation": "G1 GC (Garbage-First) has been the default Garbage Collector since Java 9."
      },
      {
        "id": "java-73-q2",
        "question": "Which type of reference in Java is cleared by the Garbage Collector ONLY when the JVM is running low on memory before throwing OutOfMemoryError?",
        "options": [
          "StrongReference",
          "SoftReference",
          "WeakReference",
          "PhantomReference"
        ],
        "correctOptionIndex": 1,
        "explanation": "`SoftReference` objects are retained as long as memory is sufficient and are cleared by the GC only as a last resort before OutOfMemoryError."
      }
    ],
    "revisionNotes": [
      "JVM Heap is divided into Young Gen (Eden, S0, S1) and Old Gen (Tenured).",
      "Metaspace holds loaded class metadata in native memory (replaced PermGen in Java 8).",
      "G1 GC is default; ZGC provides sub-millisecond pause times on modern Java 17/21."
    ]
  }
];

export const module5: MasteryModule = {
  "id": "java-m5",
  "number": 5,
  "title": "Advanced Java",
  "description": "Comprehensive advanced Java: Generics, bounded wildcards, PECS, functional interfaces, lambdas, method references, Stream API, Optional, records, sealed classes, pattern matching, annotations, reflection, multithreading, concurrent collections, ExecutorService, and JVM garbage collection.",
  "language": "java",
  "topics": [
    {
      "id": "java-54-generics",
      "moduleId": "java-m5",
      "moduleNumber": 5,
      "moduleTitle": "Advanced Java",
      "topicNumber": 54,
      "title": "Generics, Type Safety & Type Erasure Mechanics",
      "language": "java",
      "level": "Intermediate",
      "whyItMatters": "Generics provide compile-time type safety, eliminating runtime ClassCastException and manual type casting. Understanding Type Erasure explains why generic arrays cannot be created directly and why primitive types cannot be used as type parameters.",
      "explanation": "Generics (introduced in Java 5) allow classes, interfaces, and methods to operate on parameterized types (`<T>`).\nCore Benefits:\n1. Strong Compile-Time Type Checking: The compiler verifies types before runtime, replacing runtime `ClassCastException` with compile errors.\n2. Elimination of Casts: `list.get(0)` returns `T` directly instead of requiring `(String) list.get(0)`.\n3. Reusable Generic Algorithms: Write once, apply across all reference types.\n\nType Erasure (How the JVM executes Generics):\nTo maintain 100% backward compatibility with pre-Java 5 legacy code, Java uses Type Erasure:\n- The compiler replaces all type parameters `<T>` with their bound (or `Object` if unbounded).\n- The compiler automatically inserts type casts where necessary in bytecode.\n- Bridge methods are generated to preserve polymorphism.\n- Consequence: At runtime, generic type information does NOT exist in the JVM bytecode (`List<String>` and `List<Integer>` share the exact same runtime `Class` object: `ArrayList.class`).\n- Because of Type Erasure, you CANNOT do: `new T()`, `new T[10]`, or `if (x instanceof T)`.",
      "syntaxAndStructure": "// Generic Class:\npublic class Box<T> {\n    private T item;\n    public void set(T item) { this.item = item; }\n    public T get() { return item; }\n}\n\n// Generic Method:\npublic static <E> void swap(E[] arr, int i, int j) {\n    E temp = arr[i];\n    arr[i] = arr[j];\n    arr[j] = temp;\n}",
      "codeExamples": [
        {
          "title": "Generic Box Class with Compile-Time Type Safety",
          "code": "public class GenericBoxDemo {\n    static class Box<T> {\n        private T value;\n        public Box(T val) { this.value = val; }\n        public T getValue() { return value; }\n        public void setValue(T val) { this.value = val; }\n    }\n\n    public static void main(String[] args) {\n        // Type-safe Integer box\n        Box<Integer> intBox = new Box<>(42);\n        int val = intBox.getValue(); // No explicit (Integer) cast required!\n        System.out.println(\"Integer Box value: \" + val);\n\n        // Type-safe String box\n        Box<String> strBox = new Box<>(\"Java 21\");\n        System.out.println(\"String Box value: \" + strBox.getValue());\n\n        // Proof of Type Erasure: both share identical runtime class\n        System.out.println(\"Same runtime class: \" + (intBox.getClass() == strBox.getClass()));\n    }\n}",
          "expectedOutput": "Integer Box value: 42\nString Box value: Java 21\nSame runtime class: true",
          "explanation": "Because of Type Erasure, both intBox and strBox compile down to raw Box holding Object fields at runtime, sharing Box.class."
        },
        {
          "title": "Generic Method with Multiple Type Parameters",
          "code": "public class GenericMethodDemo {\n    static class Pair<K, V> {\n        private final K key;\n        private final V value;\n        public Pair(K k, V v) { this.key = k; this.value = v; }\n        public K getKey() { return key; }\n        public V getValue() { return value; }\n        public String toString() { return key + \" = \" + value; }\n    }\n\n    // Generic static factory method\n    public static <K, V> Pair<K, V> of(K k, V v) {\n        return new Pair<>(k, v);\n    }\n\n    public static void main(String[] args) {\n        Pair<String, Integer> score = of(\"Aarav\", 98);\n        Pair<Integer, Boolean> flag = of(404, false);\n\n        System.out.println(\"Score: \" + score);\n        System.out.println(\"Status: \" + flag);\n    }\n}",
          "expectedOutput": "Score: Aarav = 98\nStatus: 404 = false",
          "explanation": "Generic methods define type parameters <K, V> before the return type, enabling type inference at the call site."
        }
      ],
      "realWorldApplications": [
        "Java Collections Framework (`List<T>`, `Map<K, V>`).",
        "ORM query abstractions (`Repository<T, ID>` in Spring Data JPA)."
      ],
      "commonMistakes": [
        "Trying to use primitive types in generics (e.g. `List<int>` is invalid; must use `List<Integer>`).",
        "Attempting to create generic arrays directly: `T[] arr = new T[10];` triggers a compile error.",
        "Attempting to create generic arrays (new T[10]) or checking instance of generic types at runtime due to Type Erasure."
      ],
      "interviewRelevance": "Universal interview question: \"What is Type Erasure in Java?\", \"Why can you not do `new T()`?\", and \"Why doesn't Java support primitive generics?\"",
      "checkpoints": [
        {
          "id": "java-54-cp-1",
          "label": "Explain the 3 phases of Type Erasure: bound replacement, type cast insertion, bridge methods"
        },
        {
          "id": "java-54-cp-2",
          "label": "Articulate why new T() and new T[] are illegal due to type erasure"
        },
        {
          "id": "java-54-generics-cp-3",
          "label": "Understand compile-time type safety and runtime JVM Type Erasure mechanics."
        }
      ],
      "practiceExercises": [
        {
          "id": "java-54-ex-1",
          "title": "Workaround for Creating Generic Array",
          "difficulty": "Beginner",
          "type": "coding",
          "prompt": "Show how ArrayList implements generic backing storage using Object[] with safe cast.",
          "solution": "public class GenericArrayWorkaround<T> {\n    private final Object[] items;\n    public GenericArrayWorkaround(int capacity) {\n        this.items = new Object[capacity];\n    }\n    @SuppressWarnings(\"unchecked\")\n    public T get(int index) {\n        return (T) items[index];\n    }\n    public void set(int index, T val) {\n        items[index] = val;\n    }\n    public static void main(String[] args) {\n        GenericArrayWorkaround<String> store = new GenericArrayWorkaround<>(5);\n        store.set(0, \"Safe Generic\");\n        System.out.println(\"Retrieved: \" + store.get(0));\n    }\n}",
          "explanation": "Backing with Object[] and casting at point of access is the standard internal technique used by ArrayList."
        },
        {
          "id": "java-54-ex-2",
          "title": "Reflection Instance Creation via Class<T>",
          "difficulty": "Intermediate",
          "type": "coding",
          "prompt": "Implement a generic factory createInstance(Class<T> clazz) that uses reflection to instantiate T safely.",
          "solution": "public class GenericFactory {\n    public static <T> T createInstance(Class<T> clazz) throws Exception {\n        return clazz.getDeclaredConstructor().newInstance();\n    }\n    public static void main(String[] args) throws Exception {\n        String s = createInstance(String.class);\n        System.out.println(\"String instantiated: \" + (s != null));\n    }\n}",
          "explanation": "Passing Class<T> (type token) preserves runtime type metadata, allowing reflection instantiation."
        },
        {
          "id": "java-54-ex-3",
          "title": "Synthetic Bridge Methods Under Type Erasure",
          "difficulty": "Advanced",
          "type": "conceptual",
          "prompt": "What is a \"bridge method\" generated by the Java compiler during type erasure and why is it necessary for polymorphism?",
          "solution": "Suppose class Node<T> has `void setData(T data)`. Under type erasure, its signature becomes `void setData(Object data)`. A subclass MyNode extends Node<Integer> and overrides `void setData(Integer data)`. Because the signatures differ (`Object` vs `Integer`), this would break polymorphism! To fix this, the Java compiler synthesizes a hidden \"bridge method\" `void setData(Object o) { setData((Integer) o); }` in MyNode to preserve dynamic method dispatch.",
          "explanation": "Bridge methods bridge the gap between erased superclass methods and specific subclass overrides."
        }
      ],
      "quizQuestions": [
        {
          "id": "java-54-q1",
          "question": "What happens to the generic type parameters (e.g. `<String>`) when Java code is compiled to bytecode?",
          "options": [
            "They are converted into C++ templates",
            "They undergo Type Erasure and are replaced by their bound (or Object), with compiler-inserted casts",
            "They remain strictly preserved in the bytecode for runtime inspection",
            "They are stored in the JVM Metaspace"
          ],
          "correctOptionIndex": 1,
          "explanation": "Type Erasure removes type parameters during compilation, replacing them with Object or upper bounds."
        },
        {
          "id": "java-54-q2",
          "question": "Why is `new T()` illegal inside a generic class `MyClass<T>`?",
          "options": [
            "Because T might be private",
            "Because at runtime, Type Erasure removes T, so the JVM does not know which constructor to invoke",
            "Because new is deprecated in generics",
            "Because T is always abstract"
          ],
          "correctOptionIndex": 1,
          "explanation": "At runtime, the JVM does not know what concrete type T represents due to Type Erasure, making direct instantiation impossible."
        }
      ],
      "revisionNotes": [
        "Generics provide compile-time type safety and eliminate explicit type casting.",
        "Type Erasure removes type parameters during compilation for backward compatibility.",
        "`new T()` and `new T[]` are prohibited due to type erasure."
      ]
    },
    {
      "id": "java-55-bounded-generics",
      "moduleId": "java-m5",
      "moduleNumber": 5,
      "moduleTitle": "Advanced Java",
      "topicNumber": 55,
      "title": "Bounded Generics: Upper Bounds & Multiple Type Bounds",
      "language": "java",
      "level": "Intermediate",
      "whyItMatters": "Unbounded generics allow any object, preventing you from calling mathematical or sorting methods. Bounded generics (`<T extends Number>`) restrict type parameters and unlock specific method APIs on generic instances.",
      "explanation": "Bounded type parameters limit the types that can be passed as type arguments:\n1. Upper Bounded Generics (`<T extends SuperType>`):\n   - Restricts `T` to be either `SuperType` or a subtype of `SuperType`.\n   - Unlocks the methods of `SuperType` inside the generic body. For example, `<T extends Number>` allows calling `t.doubleValue()` directly!\n   - Under type erasure, `T` is erased to the bound (`Number` instead of `Object`).\n2. Multiple Bounds (`<T extends ClassA & InterfaceB & InterfaceC>`):\n   - A type parameter can have multiple bounds.\n   - Rule: At most ONE class can be specified, and it MUST be listed FIRST. All subsequent bounds must be interfaces.\n   - Example: `<T extends Number & Comparable<T>>`.",
      "syntaxAndStructure": "// Upper Bound on Number:\npublic class NumericStats<T extends Number> {\n    private T[] data;\n    public double average() {\n        double sum = 0;\n        for (T num : data) sum += num.doubleValue(); // doubleValue() is accessible!\n        return sum / data.length;\n    }\n}\n\n// Multiple Bounds (Class first, then interfaces):\npublic <T extends Number & Comparable<T>> int compareValues(T a, T b) {\n    return a.compareTo(b);\n}",
      "codeExamples": [
        {
          "title": "Upper Bounded Number Calculator",
          "code": "public class BoundedGenericsDemo {\n    // T must be Number or any subclass of Number (Integer, Double, Long, etc.)\n    static class Calculator<T extends Number> {\n        public double sum(T a, T b) {\n            // Accessible because T extends Number\n            return a.doubleValue() + b.doubleValue();\n        }\n    }\n\n    public static void main(String[] args) {\n        Calculator<Integer> intCalc = new Calculator<>();\n        System.out.println(\"Integer sum: \" + intCalc.sum(10, 20));\n\n        Calculator<Double> doubleCalc = new Calculator<>();\n        System.out.println(\"Double sum: \" + doubleCalc.sum(15.5, 4.5));\n\n        // Calculator<String> bad = new Calculator<>(); // COMPILE ERROR: String is not a Number!\n    }\n}",
          "expectedOutput": "Integer sum: 30.0\nDouble sum: 20.0",
          "explanation": "Using <T extends Number> restricts the type parameter to numeric types and allows calling doubleValue() on instances of T."
        },
        {
          "title": "Multiple Bounds with Class and Comparable Interface",
          "code": "public class MultipleBoundsDemo {\n    // T must extend Number AND implement Comparable<T>\n    public static <T extends Number & Comparable<T>> T findMax(T a, T b) {\n        return a.compareTo(b) >= 0 ? a : b;\n    }\n\n    public static void main(String[] args) {\n        Integer maxInt = findMax(42, 85);\n        Double maxDouble = findMax(3.14, 2.71);\n\n        System.out.println(\"Max Integer: \" + maxInt);\n        System.out.println(\"Max Double: \" + maxDouble);\n    }\n}",
          "expectedOutput": "Max Integer: 85\nMax Double: 3.14",
          "explanation": "Multiple bounds <T extends Number & Comparable<T>> combine numeric capabilities with the compareTo() method contract."
        }
      ],
      "realWorldApplications": [
        "Mathematical libraries, statistical analyzers, and matrix manipulation engines.",
        "Sorting and priority queue implementations where elements must implement `Comparable`."
      ],
      "commonMistakes": [
        "Placing an interface before a class in multiple bounds (e.g. `<T extends Comparable & Number>` is invalid; class `Number` must be first).",
        "Using `super` in class type parameter declarations (e.g. `<T super Number>` is ILLEGAL; `super` is only valid in wildcards `<? super T>`).",
        "Attempting to add elements to a collection parameterized with an upper bound (? extends Number)."
      ],
      "interviewRelevance": "Frequent interview question: \"Can a type parameter have multiple bounds?\", \"What is the rule regarding classes and interfaces in multiple bounds?\", and \"Why does `<T super Integer>` not compile?\"",
      "checkpoints": [
        {
          "id": "java-55-cp-1",
          "label": "Use <T extends UpperBound> to unlock supertype methods inside generic classes"
        },
        {
          "id": "java-55-cp-2",
          "label": "Apply multiple bounds correctly: class first, followed by interfaces"
        },
        {
          "id": "java-55-bounded-generics-cp-3",
          "label": "Apply upper bounds (<T extends Number>) and multiple bounds (<T extends Comparable & Serializable>)."
        }
      ],
      "practiceExercises": [
        {
          "id": "java-55-ex-1",
          "title": "Generic Maximum Among Three Elements",
          "difficulty": "Beginner",
          "type": "coding",
          "prompt": "Write a generic method max(T a, T b, T c) where T extends Comparable<T>.",
          "solution": "public class MaxThree {\n    public static <T extends Comparable<T>> T max(T a, T b, T c) {\n        T max = a;\n        if (b.compareTo(max) > 0) max = b;\n        if (c.compareTo(max) > 0) max = c;\n        return max;\n    }\n    public static void main(String[] args) {\n        System.out.println(\"Max: \" + max(\"apple\", \"banana\", \"cherry\"));\n        System.out.println(\"Max int: \" + max(10, 50, 30));\n    }\n}",
          "explanation": "Bounding T to Comparable<T> enables calling compareTo on all three inputs."
        },
        {
          "id": "java-55-ex-2",
          "title": "Validate Multiple Bounds Syntax",
          "difficulty": "Intermediate",
          "type": "conceptual",
          "prompt": "Which of the following is valid and why: 1) <T extends Serializable & Number>, 2) <T extends Number & Serializable>, 3) <T extends Number & Thread>?",
          "solution": "1) Invalid: Interface (Serializable) is listed before class (Number).\n2) Valid: Class (Number) is first, followed by interface (Serializable).\n3) Invalid: Java prohibits multiple class inheritance; a type cannot extend two classes (Number and Thread).",
          "explanation": "Multiple bounds allow at most one class, which must be listed first."
        },
        {
          "id": "java-55-ex-3",
          "title": "Recursive Type Bound (Self-Referential Generics)",
          "difficulty": "Advanced",
          "type": "conceptual",
          "prompt": "Explain what recursive type bound `<T extends Comparable<T>>` means and why Enum<E extends Enum<E>> uses it.",
          "solution": "A recursive type bound is a type parameter bounded by an expression containing the type parameter itself. `<T extends Comparable<T>>` means that type T can only be compared to instances of type T (itself), preventing illegal cross-type comparisons like comparing an Integer to a String. `Enum<E extends Enum<E>>` guarantees that an enum constant can only be compared to constants of its own specific enum type.",
          "explanation": "Recursive type bounds enforce type-safe mutual comparison between identical subtypes."
        }
      ],
      "quizQuestions": [
        {
          "id": "java-55-q1",
          "question": "When declaring multiple bounds for a generic type parameter `<T extends A & B>`, what is the syntax rule regarding classes and interfaces?",
          "options": [
            "Interfaces must be listed before classes",
            "At most one class can be specified, and it MUST be listed first",
            "Multiple classes can be specified separated by &",
            "Only interfaces are allowed in multiple bounds"
          ],
          "correctOptionIndex": 1,
          "explanation": "Java allows at most one class in multiple bounds, and it must precede all interfaces."
        },
        {
          "id": "java-55-q2",
          "question": "Is `<T super Number>` a valid type parameter declaration for a generic class?",
          "options": [
            "Yes, it creates a lower-bounded generic class",
            "No, lower bounds (`super`) are only valid with wildcards (`<? super T>`), not type parameters",
            "Yes, in Java 17 and above",
            "Only in abstract classes"
          ],
          "correctOptionIndex": 1,
          "explanation": "Lower bounds using `super` are strictly prohibited in type parameter declarations (`<T>`); they are only permitted with wildcards (`<?>`)."
        }
      ],
      "revisionNotes": [
        "`<T extends Bound>` restricts T to subtypes of Bound and erases T to Bound.",
        "Multiple bounds syntax: `<T extends Class & Interface1 & Interface2>` (Class must be first).",
        "`super` is only valid with wildcards, never with type parameter declarations."
      ]
    },
    {
      "id": "java-56-wildcards",
      "moduleId": "java-m5",
      "moduleNumber": 5,
      "moduleTitle": "Advanced Java",
      "topicNumber": 56,
      "title": "Generic Wildcards: PECS Principle (Producer Extends, Consumer Super)",
      "language": "java",
      "level": "Intermediate",
      "whyItMatters": "Generics in Java are strictly invariant: `List<Integer>` is NOT a subtype of `List<Number>`. Wildcards (`?`) provide covariance (`? extends T`) and contravariance (`? super T`). The PECS mnemonic is universally tested in Java interviews.",
      "explanation": "1. Generics are Invariant:\n   Even though `Integer` is a subtype of `Number`, `List<Integer>` does NOT inherit from `List<Number>`! If it did, you could insert a `Double` into a `List<Number>` reference that actually points to `List<Integer>`, corrupting memory.\n2. Wildcards (`?`):\n   - Unbounded Wildcard `<?>`: Represents an unknown type. Read-only (can only read as `Object`; cannot add anything except `null`).\n   - Upper-Bounded Wildcard `<? extends T>`: Covariant. Accepts `T` or any subtype of `T`. Read-only (Producer: you can read `T` from it, but cannot add anything except `null`).\n   - Lower-Bounded Wildcard `<? super T>`: Contravariant. Accepts `T` or any supertype of `T`. Write-capable (Consumer: you can safely add `T` to it; reading returns `Object`).\n3. The PECS Principle (Joshua Bloch):\n   - **Producer Extends**: If your method reads/produces items from a collection, use `<? extends T>`.\n   - **Consumer Super**: If your method writes/consumes items into a collection, use `<? super T>`.\n   - If you both read and write, do not use wildcards; use an exact type `<T>`.",
      "syntaxAndStructure": "// Producer Extends (Reading only):\npublic double sum(List<? extends Number> list) {\n    double total = 0;\n    for (Number n : list) total += n.doubleValue(); // Safe to READ\n    // list.add(10); // COMPILE ERROR! Cannot write\n    return total;\n}\n\n// Consumer Super (Writing):\npublic void addIntegers(List<? super Integer> list) {\n    list.add(42); // Safe to WRITE Integer\n}",
      "codeExamples": [
        {
          "title": "Demonstrating the PECS Principle with Collections.copy",
          "code": "import java.util.ArrayList;\nimport java.util.List;\n\npublic class PECSDemo {\n    // Standard implementation pattern of Collections.copy(dest, src)\n    // dest CONSUMES elements (writes them) -> <? super T>\n    // src PRODUCES elements (reads them)   -> <? extends T>\n    public static <T> void copy(List<? super T> dest, List<? extends T> src) {\n        for (int i = 0; i < src.size(); i++) {\n            dest.set(i, src.get(i));\n        }\n    }\n\n    public static void main(String[] args) {\n        List<Number> destination = new ArrayList<>(List.of(0, 0, 0));\n        List<Integer> source = List.of(10, 20, 30);\n\n        // Works seamlessly: destination can hold Number, source produces Integer\n        copy(destination, source);\n        System.out.println(\"Destination after PECS copy: \" + destination);\n    }\n}",
          "expectedOutput": "Destination after PECS copy: [10, 20, 30]",
          "explanation": "PECS allows copying from a subtype source (List<Integer>) into a supertype destination (List<Number>) with complete type safety."
        },
        {
          "title": "Why You Cannot Write to <? extends T>",
          "code": "import java.util.ArrayList;\nimport java.util.List;\n\npublic class WildcardWriteRestrictionDemo {\n    public static void main(String[] args) {\n        List<Integer> intList = new ArrayList<>();\n        List<? extends Number> numList = intList; // Legal covariance assignment\n\n        // The compiler does NOT know whether numList points to List<Integer>, List<Double>, or List<Float>\n        // Therefore, it forbids inserting any object to prevent heap corruption:\n        // numList.add(10); // COMPILE ERROR: capture of ? extends Number\n\n        // The ONLY element allowed to be inserted into <? extends T> is null:\n        numList.add(null); // Legal!\n        System.out.println(\"numList allows reading as Number: \" + (numList.size() == 1));\n    }\n}",
          "expectedOutput": "numList allows reading as Number: true",
          "explanation": "Because the actual runtime subtype of <? extends Number> is unknown, the compiler blocks all additions (except null) to prevent type corruption."
        }
      ],
      "realWorldApplications": [
        "Library method signatures (e.g. `Collections.copy(List<? super T> dest, List<? extends T> src)`).",
        "Stream API collectors (e.g. `Collectors.toList()`, `Stream.filter(Predicate<? super T>)`)."
      ],
      "commonMistakes": [
        "Trying to add elements into a `List<? extends T>`, causing the infamous \"capture of ? extends T\" compiler error.",
        "Assuming `List<String>` can be passed to a method taking `List<Object>`; generics are invariant!",
        "Violating the PECS principle (Producer Extends, Consumer Super) when designing generic library APIs."
      ],
      "interviewRelevance": "Top-tier technical question: \"Explain the PECS rule with an example\", \"Why are Java generics invariant?\", and \"Why can you only add null to `List<? extends T>`?\"",
      "checkpoints": [
        {
          "id": "java-56-cp-1",
          "label": "Explain why generics are invariant: List<Integer> is NOT a List<Number>"
        },
        {
          "id": "java-56-cp-2",
          "label": "Apply PECS: Producer Extends for reading; Consumer Super for writing"
        },
        {
          "id": "java-56-wildcards-cp-3",
          "label": "Master the PECS guideline to provide maximum API flexibility to callers."
        }
      ],
      "practiceExercises": [
        {
          "id": "java-56-ex-1",
          "title": "Write Generic Print Method with Wildcard",
          "difficulty": "Beginner",
          "type": "coding",
          "prompt": "Write a method printList(List<?> list) that prints elements of any type separated by commas.",
          "solution": "import java.util.List;\n\npublic class WildcardPrint {\n    public static void printList(List<?> list) {\n        for (int i = 0; i < list.size(); i++) {\n            System.out.print(list.get(i) + (i < list.size() - 1 ? \", \" : \"\"));\n        }\n        System.out.println();\n    }\n    public static void main(String[] args) {\n        printList(List.of(\"A\", \"B\", \"C\"));\n        printList(List.of(1, 2, 3));\n    }\n}",
          "explanation": "List<?> accepts any list type for read-only traversal as Object."
        },
        {
          "id": "java-56-ex-2",
          "title": "Wildcard Capture and Helper Method",
          "difficulty": "Intermediate",
          "type": "coding",
          "prompt": "Write a method reorder(List<?> list) that swaps elements 0 and 1 using a private generic helper to capture the wildcard.",
          "solution": "import java.util.*;\n\npublic class WildcardCaptureHelper {\n    public static void swapFirstTwo(List<?> list) {\n        swapHelper(list); // Captures wildcard ? as T\n    }\n    private static <T> void swapHelper(List<T> list) {\n        T temp = list.get(0);\n        list.set(0, list.get(1));\n        list.set(1, temp);\n    }\n    public static void main(String[] args) {\n        List<String> items = new ArrayList<>(List.of(\"First\", \"Second\"));\n        swapFirstTwo(items);\n        System.out.println(\"Swapped: \" + items);\n    }\n}",
          "explanation": "A private generic helper method captures the unknown wildcard `?` into a concrete named type parameter `T`."
        },
        {
          "id": "java-56-ex-3",
          "title": "Filter Elements with Predicate<? super T>",
          "difficulty": "Advanced",
          "type": "coding",
          "prompt": "Demonstrate why java.util.function.Predicate should use `<? super T>` in a filter method so superclass predicates can be reused.",
          "solution": "import java.util.*;\nimport java.util.function.Predicate;\n\npublic class PredicateConsumerSuper {\n    public static <T> List<T> filter(List<T> list, Predicate<? super T> predicate) {\n        List<T> result = new ArrayList<>();\n        for (T item : list) {\n            if (predicate.test(item)) result.add(item);\n        }\n        return result;\n    }\n    public static void main(String[] args) {\n        List<Integer> numbers = List.of(-5, 10, -2, 20);\n        // Predicate on Object or Number can be applied to Integer because of <? super T>!\n        Predicate<Number> isPositive = n -> n.doubleValue() > 0;\n        System.out.println(\"Filtered: \" + filter(numbers, isPositive));\n    }\n}",
          "explanation": "`Predicate<? super T>` consumes T elements, allowing general supertype predicates to filter specific subtype collections."
        }
      ],
      "quizQuestions": [
        {
          "id": "java-56-q1",
          "question": "Under the PECS rule, what type of wildcard should you use if your method reads data from a collection parameter?",
          "options": [
            "<? super T>",
            "<? extends T>",
            "<T extends Object>",
            "<?>"
          ],
          "correctOptionIndex": 1,
          "explanation": "PECS: \"Producer Extends\". If the collection produces/reads items for your method, use `<? extends T>`."
        },
        {
          "id": "java-56-q2",
          "question": "Why does `List<Number> list = new ArrayList<Integer>();` fail to compile in Java?",
          "options": [
            "Because Integer is not a Number",
            "Because Java generics are invariant: List<Integer> is not a subtype of List<Number>",
            "Because ArrayList cannot hold Numbers",
            "Because of an out of memory error"
          ],
          "correctOptionIndex": 1,
          "explanation": "Generics are invariant. If allowed, you could put a Double into a List<Integer> via the List<Number> reference, destroying type safety."
        }
      ],
      "revisionNotes": [
        "Generics are invariant: `List<Integer>` is NOT a `List<Number>`.",
        "PECS: Producer Extends (read-only), Consumer Super (write-capable).",
        "Wildcards (`?`) provide covariance (`? extends T`) and contravariance (`? super T`)."
      ]
    },
    {
      "id": "java-57-functional-interfaces",
      "moduleId": "java-m5",
      "moduleNumber": 5,
      "moduleTitle": "Advanced Java",
      "topicNumber": 57,
      "title": "Functional Interfaces: SAM Contract & Built-in Functional Types",
      "language": "java",
      "level": "Intermediate",
      "whyItMatters": "Functional interfaces are the foundation of modern Java functional programming and the Stream API. Mastering `@FunctionalInterface` and the four core built-in types (Predicate, Function, Consumer, Supplier) is mandatory for writing modern, expressive code.",
      "explanation": "A `Functional Interface` (Single Abstract Method / SAM interface) is an interface that has EXACTLY ONE abstract method.\nKey Characteristics:\n1. Single Abstract Method: It can have any number of `default` or `static` methods, but only ONE abstract method.\n2. `@FunctionalInterface` Annotation: Optional, but strongly recommended. Instructs the compiler to enforce that the interface has exactly one abstract method, failing compilation if zero or >1 abstract methods exist.\n3. Java 8 Built-in Functional Interfaces (`java.util.function`):\n   - `Predicate<T>`: `boolean test(T t)` — Evaluates a condition; returns boolean.\n   - `Function<T, R>`: `R apply(T t)` — Transforms input of type T into output of type R.\n   - `Consumer<T>`: `void accept(T t)` — Consumes an input, performs side effects, returns void.\n   - `Supplier<T>`: `T get()` — Takes no arguments; supplies/produces a value of type T.\n   - Primitive specializations (`IntPredicate`, `LongConsumer`, `DoubleFunction`) avoid autoboxing overhead.",
      "syntaxAndStructure": "@FunctionalInterface\npublic interface Transformer<T, R> {\n    R transform(T input); // Exactly ONE abstract method\n    \n    default void log(T item) { System.out.println(\"Processing: \" + item); }\n}\n\n// Core Built-in Interfaces:\nPredicate<String> isLong = s -> s.length() > 5;\nFunction<String, Integer> lengthFunc = String::length;\nConsumer<String> printer = System.out::println;\nSupplier<Double> randomSupplier = Math::random;",
      "codeExamples": [
        {
          "title": "The Four Core Functional Interfaces in Action",
          "code": "import java.util.function.Consumer;\nimport java.util.function.Function;\nimport java.util.function.Predicate;\nimport java.util.function.Supplier;\n\npublic class FunctionalTypesDemo {\n    public static void main(String[] args) {\n        // 1. Predicate: T -> boolean\n        Predicate<Integer> isPassing = score -> score >= 60;\n        System.out.println(\"Is 75 passing: \" + isPassing.test(75));\n\n        // 2. Function: T -> R (transformation)\n        Function<String, Integer> wordLength = String::length;\n        System.out.println(\"Length of 'Placement': \" + wordLength.apply(\"Placement\"));\n\n        // 3. Consumer: T -> void (side effect)\n        Consumer<String> logger = msg -> System.out.println(\"[AUDIT] \" + msg);\n        logger.accept(\"Transaction verified.\");\n\n        // 4. Supplier: () -> T (lazy producer)\n        Supplier<String> tokenGenerator = () -> \"AUTH_\" + System.currentTimeMillis();\n        System.out.println(\"Generated token: \" + tokenGenerator.get().substring(0, 10) + \"...\");\n    }\n}",
          "expectedOutput": "Is 75 passing: true\nLength of 'Placement': 9\n[AUDIT] Transaction verified.\nGenerated token: AUTH_17...",
          "explanation": "Predicate tests conditions, Function maps inputs to outputs, Consumer consumes without returning, and Supplier lazily generates values."
        },
        {
          "title": "Chaining Predicates and Functions",
          "code": "import java.util.function.Function;\nimport java.util.function.Predicate;\n\npublic class FunctionalChainingDemo {\n    public static void main(String[] args) {\n        // Chaining Predicates (and, or, negate)\n        Predicate<String> nonNull = s -> s != null;\n        Predicate<String> notEmpty = s -> !s.trim().isEmpty();\n        Predicate<String> isValid = nonNull.and(notEmpty);\n\n        System.out.println(\"Valid check on 'AK67': \" + isValid.test(\"AK67\"));\n        System.out.println(\"Valid check on '  ': \" + isValid.test(\"  \"));\n\n        // Chaining Functions (andThen, compose)\n        Function<Integer, Integer> multiplyByTwo = x -> x * 2;\n        Function<Integer, Integer> addTen = x -> x + 10;\n\n        // andThen: multiply first, then add ten: (5 * 2) + 10 = 20\n        Function<Integer, Integer> pipeline = multiplyByTwo.andThen(addTen);\n        System.out.println(\"Pipeline (5 * 2) + 10: \" + pipeline.apply(5));\n    }\n}",
          "expectedOutput": "Valid check on 'AK67': true\nValid check on '  ': false\nPipeline (5 * 2) + 10: 20",
          "explanation": "Functional interfaces provide default methods (and, or, negate, andThen, compose) for constructing modular processing pipelines."
        }
      ],
      "realWorldApplications": [
        "Configuring Spring Security authorization filters using Predicate chains.",
        "Lazy evaluation in logging frameworks (`logger.debug(() -> expensiveComputation())`)."
      ],
      "commonMistakes": [
        "Adding a second abstract method to an interface marked `@FunctionalInterface`, causing an immediate compilation error.",
        "Using object wrappers like `Predicate<Integer>` in high-throughput loops instead of `IntPredicate`, triggering boxing overhead.",
        "Creating a custom functional interface without the @FunctionalInterface annotation, allowing future developers to add extra methods."
      ],
      "interviewRelevance": "Universal interview question: \"What is a Functional Interface?\", \"Explain Predicate vs Function vs Consumer vs Supplier\", and \"Can a functional interface have default methods?\"",
      "checkpoints": [
        {
          "id": "java-57-cp-1",
          "label": "Define SAM contract and explain role of @FunctionalInterface annotation"
        },
        {
          "id": "java-57-cp-2",
          "label": "Master the 4 core functional interfaces: Predicate, Function, Consumer, Supplier"
        },
        {
          "id": "java-57-functional-interfaces-cp-3",
          "label": "Differentiate the 4 core interfaces: Predicate, Function, Consumer, and Supplier."
        }
      ],
      "practiceExercises": [
        {
          "id": "java-57-ex-1",
          "title": "Custom Functional Interface with Generic Types",
          "difficulty": "Beginner",
          "type": "coding",
          "prompt": "Create a @FunctionalInterface TriFunction<T, U, V, R> that takes 3 inputs and produces a result R.",
          "solution": "@FunctionalInterface\ninterface TriFunction<T, U, V, R> {\n    R apply(T t, U u, V v);\n}\n\npublic class TriFunctionDemo {\n    public static void main(String[] args) {\n        TriFunction<String, Integer, Double, String> formatter = \n            (name, age, gpa) -> String.format(\"%s (Age: %d, GPA: %.1f)\", name, age, gpa);\n        System.out.println(formatter.apply(\"Alice\", 21, 3.9));\n    }\n}",
          "explanation": "Custom SAM interfaces can accept any number of type arguments while maintaining the single abstract method constraint."
        },
        {
          "id": "java-57-ex-2",
          "title": "BiPredicate for Validation Rules",
          "difficulty": "Intermediate",
          "type": "coding",
          "prompt": "Use a BiPredicate<String, Integer> to validate that a username length matches an expected length requirement.",
          "solution": "import java.util.function.BiPredicate;\n\npublic class BiPredicateDemo {\n    public static void main(String[] args) {\n        BiPredicate<String, Integer> hasExactLength = (str, len) -> str != null && str.length() == len;\n        System.out.println(\"Test 'Java' has length 4: \" + hasExactLength.test(\"Java\", 4));\n        System.out.println(\"Test 'Python' has length 4: \" + hasExactLength.test(\"Python\", 4));\n    }\n}",
          "explanation": "Bi-specializations (BiPredicate, BiFunction, BiConsumer) accept two inputs."
        },
        {
          "id": "java-57-ex-3",
          "title": "Object Methods in Functional Interfaces",
          "difficulty": "Advanced",
          "type": "conceptual",
          "prompt": "Why does an interface declaring `boolean equals(Object o)` in addition to an abstract method still qualify as a Functional Interface?",
          "solution": "Any abstract method declared in an interface that overrides a public method of `java.lang.Object` (such as `equals`, `hashCode`, or `toString`) does NOT count toward the interface's abstract method count! Because every class implementing the interface inherits a concrete implementation from Object, the method is guaranteed to be satisfied without custom subclass implementation.",
          "explanation": "Object methods are excluded from the SAM count in functional interfaces."
        }
      ],
      "quizQuestions": [
        {
          "id": "java-57-q1",
          "question": "Which functional interface in java.util.function takes a single argument of type T and returns a boolean?",
          "options": [
            "Function<T, Boolean>",
            "Predicate<T>",
            "Consumer<T>",
            "Supplier<Boolean>"
          ],
          "correctOptionIndex": 1,
          "explanation": "`Predicate<T>` defines `boolean test(T t)` and is the standard interface for condition evaluations."
        },
        {
          "id": "java-57-q2",
          "question": "Can a functional interface contain default and static methods?",
          "options": [
            "No, it must contain only abstract methods",
            "Yes, it can contain any number of default and static methods, as long as it has exactly one abstract method",
            "Only static methods are allowed",
            "Only default methods are allowed"
          ],
          "correctOptionIndex": 1,
          "explanation": "A functional interface requires exactly one abstract method. It can have unlimited default and static methods."
        }
      ],
      "revisionNotes": [
        "A Functional Interface has exactly one abstract method (SAM contract).",
        "Predicate: T -> boolean; Function: T -> R; Consumer: T -> void; Supplier: () -> T.",
        "`java.lang.Object` methods do not count toward the SAM limit."
      ]
    },
    {
      "id": "java-58-lambda-expressions",
      "moduleId": "java-m5",
      "moduleNumber": 5,
      "moduleTitle": "Advanced Java",
      "topicNumber": 58,
      "title": "Lambda Expressions: Syntax, Lexical Scoping & Effectively Final Variables",
      "language": "java",
      "level": "Intermediate",
      "whyItMatters": "Lambda expressions enable concise, inline implementation of functional interfaces without anonymous inner class boilerplate. Understanding variable capture and why local variables must be effectively final is essential for multi-threading safety.",
      "explanation": "A lambda expression is an anonymous function—a block of code with parameters and a body that can be passed around and executed.\nSyntax:\n`(parameters) -> expression` or `(parameters) -> { statements; }`\n\nKey Concepts:\n1. Target Typing: A lambda does NOT have an intrinsic type; its type is inferred by the compiler from the context (the functional interface it is assigned to).\n2. Lexical Scoping: A lambda does NOT introduce a new scope for variable names. `this` inside a lambda refers to the enclosing class instance, NOT the lambda itself (unlike anonymous inner classes).\n3. Variable Capture & Effectively Final:\n   - Lambdas can capture instance variables, static variables, and local variables.\n   - Rule: Any local variable captured by a lambda MUST be `final` or `effectively final` (never modified after initialization).\n   - Why? Local variables live on the thread call stack; lambdas can execute on other threads or after the method returns (allocated on the heap). The JVM copies the local variable value into the lambda object. If the variable could be modified, the stack and heap copies would become desynchronized, causing race conditions.",
      "syntaxAndStructure": "// Syntax variants:\n() -> System.out.println(\"Hello\");       // No args\nx -> x * 2;                                // Single arg, inferred type\n(int a, int b) -> a + b;                   // Multiple args, expression\n(a, b) -> {\n    System.out.println(\"Summing\");\n    return a + b;                          // Block body with return\n};",
      "codeExamples": [
        {
          "title": "Lambda Expression vs Anonymous Inner Class",
          "code": "public class LambdaVsInnerClassDemo {\n    public static void main(String[] args) {\n        // 1. Verbose Anonymous Inner Class\n        Runnable r1 = new Runnable() {\n            @Override\n            public void run() {\n                System.out.println(\"Running via anonymous inner class.\");\n            }\n        };\n\n        // 2. Concise Lambda Expression\n        Runnable r2 = () -> System.out.println(\"Running via concise lambda expression.\");\n\n        r1.run();\n        r2.run();\n    }\n}",
          "expectedOutput": "Running via anonymous inner class.\nRunning via concise lambda expression.",
          "explanation": "Lambdas eliminate 5 lines of boilerplate, compiling to invokedynamic instructions rather than generating separate .class files."
        },
        {
          "title": "Effectively Final Variable Capture Demonstration",
          "code": "public class EffectivelyFinalDemo {\n    public static void main(String[] args) {\n        String prefix = \"PL_2026\"; // Effectively final (never reassigned)\n\n        // Lambda captures local variable 'prefix'\n        java.util.function.Function<String, String> tagger = name -> prefix + \"_\" + name;\n\n        System.out.println(\"Tagged: \" + tagger.apply(\"Candidate\"));\n\n        // If you uncomment the line below, the code fails compilation because prefix is no longer effectively final!\n        // prefix = \"MUTATED\"; // Compile Error!\n    }\n}",
          "expectedOutput": "Tagged: PL_2026_Candidate",
          "explanation": "The captured local variable prefix must remain effectively final. Mutating it after capture causes a compile-time error."
        }
      ],
      "realWorldApplications": [
        "Event handlers in UI and asynchronous message listener callbacks.",
        "Declarative stream filtering and transformation pipelines."
      ],
      "commonMistakes": [
        "Attempting to reassign a captured local variable inside a lambda (e.g. `int count = 0; list.forEach(x -> count++);` fails to compile).",
        "Confusing `this` inside a lambda: in a lambda, `this` refers to the outer enclosing class instance, whereas in an anonymous inner class, `this` refers to the anonymous class itself.",
        "Attempting to mutate local variables from enclosing scopes within a lambda expression (must be effectively final)."
      ],
      "interviewRelevance": "Universal interview question: \"Why do local variables used in lambdas have to be final or effectively final?\", \"Difference between lambda and anonymous inner class\", and \"What is invokedynamic?\"",
      "checkpoints": [
        {
          "id": "java-58-cp-1",
          "label": "Explain the technical memory reason why captured local variables must be effectively final"
        },
        {
          "id": "java-58-cp-2",
          "label": "Differentiate lexical scoping of this in lambdas vs anonymous inner classes"
        },
        {
          "id": "java-58-lambda-expressions-cp-3",
          "label": "Write concise lambda expressions and understand invokedynamic bytecode mechanics."
        }
      ],
      "practiceExercises": [
        {
          "id": "java-58-ex-1",
          "title": "Workaround for Modifying Counter in Lambda",
          "difficulty": "Beginner",
          "type": "coding",
          "prompt": "Demonstrate how to count matching elements in a forEach lambda using AtomicInteger or a 1-element array to bypass the effectively final restriction.",
          "solution": "import java.util.*;\nimport java.util.concurrent.atomic.AtomicInteger;\n\npublic class LambdaCounterWorkaround {\n    public static void main(String[] args) {\n        List<String> list = List.of(\"A\", \"B\", \"A\", \"C\");\n        AtomicInteger count = new AtomicInteger(0);\n\n        list.forEach(s -> {\n            if (\"A\".equals(s)) count.incrementAndGet();\n        });\n\n        System.out.println(\"Count of 'A': \" + count.get());\n    }\n}",
          "explanation": "AtomicInteger reference is effectively final; mutating its internal heap state is allowed."
        },
        {
          "id": "java-58-ex-2",
          "title": "Lambda Comparator for Custom Objects",
          "difficulty": "Intermediate",
          "type": "coding",
          "prompt": "Sort a list of strings by their last character using an inline lambda expression.",
          "solution": "import java.util.*;\n\npublic class LastCharSort {\n    public static void main(String[] args) {\n        List<String> words = new ArrayList<>(List.of(\"banana\", \"apple\", \"fig\", \"zebra\"));\n        // Lambda comparator inspecting last character\n        words.sort((s1, s2) -> Character.compare(s1.charAt(s1.length() - 1), s2.charAt(s2.length() - 1)));\n        System.out.println(\"Sorted by last char: \" + words);\n    }\n}",
          "explanation": "Inline lambda (s1, s2) -> ... provides concise comparator definition without creating separate classes."
        },
        {
          "id": "java-58-ex-3",
          "title": "invokedynamic and Metafactory Compilation",
          "difficulty": "Advanced",
          "type": "conceptual",
          "prompt": "How does the JVM execute lambdas using invokedynamic and LambdaMetafactory instead of creating inner class files like Inner$1.class?",
          "solution": "Unlike anonymous inner classes that emit physical `.class` files on disk, lambdas compile to an `invokedynamic` (indy) opcode. On first execution, the JVM bootstrap method `LambdaMetafactory.metafactory()` generates a lightweight runtime call-site class in memory. Subsequent calls execute via direct method handles, drastically reducing classloading overhead, disk clutter, and memory footprint.",
          "explanation": "invokedynamic achieves high performance and zero disk artifact pollution for lambdas."
        }
      ],
      "quizQuestions": [
        {
          "id": "java-58-q1",
          "question": "What does the `this` keyword refer to inside a lambda expression?",
          "options": [
            "The lambda object itself",
            "The instance of the enclosing class in which the lambda is defined",
            "It is illegal and causes a compile error",
            "The functional interface being implemented"
          ],
          "correctOptionIndex": 1,
          "explanation": "Lambdas are lexically scoped. `this` inside a lambda refers to the enclosing class instance."
        },
        {
          "id": "java-58-q2",
          "question": "Why does Java require captured local variables in a lambda to be final or effectively final?",
          "options": [
            "Because local variables are stored in Metaspace",
            "Because lambdas copy the local variable value to the heap; allowing mutation would cause concurrency and memory desynchronization bugs",
            "Because the garbage collector cannot track mutable variables",
            "To make code run in single-threaded mode"
          ],
          "correctOptionIndex": 1,
          "explanation": "Captured primitives are copied by value from stack to heap. Requiring finality guarantees consistency across thread lifecycles."
        }
      ],
      "revisionNotes": [
        "Lambda syntax: `(parameters) -> expression` or `(parameters) -> { body }`.",
        "Captured local variables must be final or effectively final.",
        "Lambdas are compiled using `invokedynamic`, avoiding anonymous inner class overhead."
      ]
    },
    {
      "id": "java-59-method-references",
      "moduleId": "java-m5",
      "moduleNumber": 5,
      "moduleTitle": "Advanced Java",
      "topicNumber": 59,
      "title": "Method References: Static, Bound, Unbound & Constructor References",
      "language": "java",
      "level": "Intermediate",
      "whyItMatters": "Method references (`::`) provide even cleaner, more readable syntax than lambda expressions when a lambda merely calls an existing method. They are ubiquitous across the Stream API and modern Java codebases.",
      "explanation": "A method reference is a shorthand syntax for a lambda expression that executes an existing method by name.\nFour Kinds of Method References:\n1. Reference to a Static Method (`ClassName::staticMethod`):\n   - Lambda equivalent: `(args) -> ClassName.staticMethod(args)`\n   - Example: `Integer::parseInt`\n2. Reference to an Instance Method of a Particular Object / Bound (`instance::method`):\n   - Lambda equivalent: `(args) -> instance.method(args)`\n   - Example: `System.out::println`\n3. Reference to an Instance Method of an Arbitrary Object of a Particular Type / Unbound (`ClassName::instanceMethod`):\n   - Lambda equivalent: `(obj, args) -> obj.instanceMethod(args)`\n   - The first parameter becomes the target on which the method is called!\n   - Example: `String::length` (lambda: `(s) -> s.length()`)\n4. Reference to a Constructor (`ClassName::new`):\n   - Lambda equivalent: `(args) -> new ClassName(args)`\n   - Example: `ArrayList::new`",
      "syntaxAndStructure": "// 1. Static: ClassName::staticMethod\nFunction<String, Integer> f1 = Integer::parseInt;\n\n// 2. Bound Instance: instance::method\nConsumer<String> f2 = System.out::println;\n\n// 3. Unbound Instance: ClassName::instanceMethod\nFunction<String, String> f3 = String::toUpperCase; // s -> s.toUpperCase()\n\n// 4. Constructor: ClassName::new\nSupplier<List<String>> f4 = ArrayList::new;",
      "codeExamples": [
        {
          "title": "All Four Kinds of Method References Demonstrated",
          "code": "import java.util.ArrayList;\nimport java.util.List;\nimport java.util.function.Consumer;\nimport java.util.function.Function;\nimport java.util.function.Supplier;\n\npublic class MethodReferenceDemo {\n    public static void main(String[] args) {\n        // 1. Static Method Reference: Class::staticMethod\n        Function<String, Double> parseDouble = Double::parseDouble;\n        System.out.println(\"Parsed double: \" + parseDouble.apply(\"3.1415\"));\n\n        // 2. Bound Instance Method Reference: instance::instanceMethod\n        String prefix = \"OUTPUT: \";\n        Consumer<String> boundLogger = System.out::println;\n        boundLogger.accept(\"Bound logger active.\");\n\n        // 3. Unbound Instance Method Reference: Class::instanceMethod\n        Function<String, String> upper = String::toUpperCase;\n        System.out.println(\"Unbound upper: \" + upper.apply(\"placement 2026\"));\n\n        // 4. Constructor Reference: Class::new\n        Supplier<List<String>> listSupplier = ArrayList::new;\n        List<String> list = listSupplier.get();\n        list.add(\"Item\");\n        System.out.println(\"Constructor generated list: \" + list);\n    }\n}",
          "expectedOutput": "Parsed double: 3.1415\nBound logger active.\nUnbound upper: PLACEMENT 2026\nConstructor generated list: [Item]",
          "explanation": "Demonstrates static, bound instance, unbound instance, and constructor references matching functional interface signatures."
        },
        {
          "title": "Unbound vs Bound Instance Method Reference Disambiguation",
          "code": "import java.util.Arrays;\nimport java.util.List;\n\npublic class UnboundDisambiguationDemo {\n    public static void main(String[] args) {\n        List<String> names = Arrays.asList(\"Charlie\", \"Alice\", \"Bob\");\n\n        // String::compareToIgnoreCase is an UNBOUND instance method reference:\n        // Lambda equivalent: (s1, s2) -> s1.compareToIgnoreCase(s2)\n        names.sort(String::compareToIgnoreCase);\n\n        System.out.println(\"Sorted case-insensitive: \" + names);\n    }\n}",
          "expectedOutput": "Sorted case-insensitive: [Alice, Bob, Charlie]",
          "explanation": "In String::compareToIgnoreCase, the first argument s1 becomes the target invoking the method, and s2 is passed as the argument."
        }
      ],
      "realWorldApplications": [
        "Stream transformation mapping (e.g. `names.stream().map(String::trim).map(String::toUpperCase)`).",
        "Factory supplier patterns (`Optional.ofNullable(val).orElseGet(ArrayList::new)`)."
      ],
      "commonMistakes": [
        "Confusing bound instance references (`myObj::method`) with unbound references (`MyClass::method`).",
        "Attempting to use method references when parameters require modification or adaptation; use explicit lambdas instead.",
        "Confusing instance method references on arbitrary objects (String::length) with references on specific instances (System.out::println)."
      ],
      "interviewRelevance": "Common interview question: \"What are the four types of method references?\", \"How does an unbound method reference like String::length work?\", and \"Convert this lambda to a method reference.\"",
      "checkpoints": [
        {
          "id": "java-59-cp-1",
          "label": "Identify and convert all 4 types of method references to equivalent lambdas"
        },
        {
          "id": "java-59-cp-2",
          "label": "Explain how unbound method references map their first argument to the calling instance"
        },
        {
          "id": "java-59-method-references-cp-3",
          "label": "Map method reference styles (static, instance, constructor) to equivalent lambdas."
        }
      ],
      "practiceExercises": [
        {
          "id": "java-59-ex-1",
          "title": "Convert Lambdas to Method References",
          "difficulty": "Beginner",
          "type": "conceptual",
          "prompt": "Convert the following lambdas to method references: 1) s -> System.out.println(s), 2) str -> str.isEmpty(), 3) () -> new HashSet<>().",
          "solution": "1) System.out::println (Bound instance method reference)\n2) String::isEmpty (Unbound instance method reference)\n3) HashSet::new (Constructor reference)",
          "explanation": "Each lambda simply delegates parameters directly to an existing method or constructor."
        },
        {
          "id": "java-59-ex-2",
          "title": "Array Constructor Reference",
          "difficulty": "Intermediate",
          "type": "coding",
          "prompt": "Use an array constructor reference (String[]::new) with Stream.toArray() to convert a Stream<String> into a typed String[] array.",
          "solution": "import java.util.Arrays;\nimport java.util.stream.Stream;\n\npublic class ArrayConstructorDemo {\n    public static void main(String[] args) {\n        Stream<String> stream = Stream.of(\"Java\", \"Kotlin\", \"Scala\");\n        // String[]::new matches IntFunction<String[]>\n        String[] arr = stream.toArray(String[]::new);\n        System.out.println(\"Array length: \" + arr.length);\n        System.out.println(\"Array contents: \" + Arrays.toString(arr));\n    }\n}",
          "explanation": "String[]::new matches the IntFunction<A[]> required by stream.toArray() to construct a typed array."
        },
        {
          "id": "java-59-ex-3",
          "title": "Method Reference Overload Resolution Ambiguity",
          "difficulty": "Advanced",
          "type": "conceptual",
          "prompt": "When can a method reference cause compile-time ambiguity, and how does writing an explicit lambda resolve it?",
          "solution": "If a class has overloaded methods (e.g., `print(String)` and `print(Integer)`), and a method reference `obj::print` is assigned to a functional interface whose parameter types are generic or compatible with multiple overloads, the compiler cannot deduce which method is intended, throwing an ambiguous reference error. Writing an explicit lambda (e.g. `s -> obj.print((String) s)`) disambiguates the call site.",
          "explanation": "Explicit lambdas permit manual casting to break method reference overload ambiguity."
        }
      ],
      "quizQuestions": [
        {
          "id": "java-59-q1",
          "question": "What is the lambda equivalent of the unbound method reference `String::length`?",
          "options": [
            "() -> String.length()",
            "(String s) -> s.length()",
            "s -> String.length(s)",
            "() -> new String().length()"
          ],
          "correctOptionIndex": 1,
          "explanation": "For unbound instance references `ClassName::method`, the first lambda parameter becomes the object instance target: `(s) -> s.length()`."
        },
        {
          "id": "java-59-q2",
          "question": "Which syntax represents a constructor reference in Java?",
          "options": [
            "ClassName::construct",
            "ClassName::new",
            "new ClassName::get",
            "ClassName()::new"
          ],
          "correctOptionIndex": 1,
          "explanation": "Constructor references use the syntax `ClassName::new`."
        }
      ],
      "revisionNotes": [
        "Method references (`::`) provide compact syntax for lambdas executing existing methods.",
        "Four types: Static (`Class::static`), Bound (`instance::method`), Unbound (`Class::instanceMethod`), Constructor (`Class::new`).",
        "Unbound references use the first argument as the calling object target."
      ]
    },
    {
      "id": "java-60-stream-api",
      "moduleId": "java-m5",
      "moduleNumber": 5,
      "moduleTitle": "Advanced Java",
      "topicNumber": 60,
      "title": "Stream API Fundamentals: Creation, Pipelines & Lazy Evaluation",
      "language": "java",
      "level": "Intermediate",
      "whyItMatters": "The Stream API introduced functional-style declarative processing of sequences of elements. Streams eliminate clumsy imperative loops and support seamless parallel execution on multi-core processors.",
      "explanation": "A `Stream` represents a sequence of elements supporting sequential and parallel aggregate operations.\nCore Characteristics:\n1. Not a Data Structure: A stream does NOT store elements; it conveys elements from a source (collection, array, I/O channel) through a pipeline of computational steps.\n2. Non-Mutating: Stream operations never mutate the underlying source collection; they produce a new result or collection.\n3. Lazy Evaluation: Intermediate operations (filter, map) are lazy. They are NOT executed when defined; they are only evaluated when a Terminal Operation (collect, forEach, reduce) is invoked!\n4. Consumable Only Once: A stream can be traversed only once. Calling a terminal operation closes the stream; attempting to reuse it throws `IllegalStateException`.\n5. Stream Creation:\n   - From Collection: `collection.stream()`\n   - From Array: `Arrays.stream(arr)`\n   - Discrete Values: `Stream.of(\"a\", \"b\")`\n   - Infinite Streams: `Stream.iterate(0, n -> n + 2)` or `Stream.generate(Math::random)`\n   - Numeric Streams: `IntStream.range(1, 10)` avoids boxing.",
      "syntaxAndStructure": "// Stream Pipeline Structure:\n// Source -> Intermediate Operation(s) (Lazy) -> Terminal Operation (Eager)\n\nList<String> result = list.stream()\n    .filter(s -> s.startsWith(\"A\"))   // Intermediate (lazy)\n    .map(String::toUpperCase)         // Intermediate (lazy)\n    .collect(Collectors.toList());    // Terminal (triggers execution)",
      "codeExamples": [
        {
          "title": "Proof of Lazy Evaluation in Stream Pipelines",
          "code": "import java.util.List;\nimport java.util.stream.Stream;\n\npublic class StreamLazyEvaluationDemo {\n    public static void main(String[] args) {\n        List<String> names = List.of(\"Aarav\", \"Bob\", \"Ananya\", \"Charlie\");\n\n        System.out.println(\"Defining stream pipeline...\");\n        Stream<String> stream = names.stream()\n            .filter(name -> {\n                System.out.println(\"filter() called for: \" + name);\n                return name.startsWith(\"A\");\n            })\n            .map(name -> {\n                System.out.println(\"map() called for: \" + name);\n                return name.toUpperCase();\n            });\n\n        System.out.println(\"Stream defined. Notice NO execution happened above!\");\n        System.out.println(\"Invoking terminal operation findFirst():\");\n\n        // Terminal operation triggers execution: stops immediately after finding first match!\n        String first = stream.findFirst().orElse(\"None\");\n        System.out.println(\"First result: \" + first);\n    }\n}",
          "expectedOutput": "Defining stream pipeline...\nStream defined. Notice NO execution happened above!\nInvoking terminal operation findFirst():\nfilter() called for: Aarav\nmap() called for: Aarav\nFirst result: AARAV",
          "explanation": "Intermediate operations (filter, map) execute lazily only when findFirst() is triggered. Furthermore, it short-circuits: \"Bob\", \"Ananya\", and \"Charlie\" were never even inspected!"
        },
        {
          "title": "Demonstrating Single-Use Stream Closure",
          "code": "import java.util.List;\nimport java.util.stream.Stream;\n\npublic class StreamClosedDemo {\n    public static void main(String[] args) {\n        Stream<String> stream = Stream.of(\"Java\", \"Spring\", \"Docker\");\n\n        // First terminal operation consumes the stream\n        long count = stream.count();\n        System.out.println(\"Element count: \" + count);\n\n        // Attempting to reuse the closed stream throws IllegalStateException\n        try {\n            stream.forEach(System.out::println);\n        } catch (IllegalStateException e) {\n            System.out.println(\"Caught expected: stream has already been operated upon or closed!\");\n        }\n    }\n}",
          "expectedOutput": "Element count: 3\nCaught expected: stream has already been operated upon or closed!",
          "explanation": "A Stream can only be traversed once. After a terminal operation executes, the stream is closed and cannot be reused."
        }
      ],
      "realWorldApplications": [
        "Filtering, transforming, and grouping enterprise entity records from database queries.",
        "Data transformation pipelines in microservices processing JSON events."
      ],
      "commonMistakes": [
        "Trying to reuse a stream variable after invoking a terminal operation, causing `IllegalStateException`.",
        "Forgetting a terminal operation; without a terminal operation, intermediate operations will NEVER execute.",
        "Attempting to consume a Stream more than once, triggering IllegalStateException: stream has already been operated upon or closed."
      ],
      "interviewRelevance": "Universal interview question: \"What is the difference between intermediate and terminal operations?\", \"Why are streams lazy?\", and \"Can you reuse a stream?\"",
      "checkpoints": [
        {
          "id": "java-60-cp-1",
          "label": "Explain the 3 pipeline components: Source -> Intermediate Operations -> Terminal Operation"
        },
        {
          "id": "java-60-cp-2",
          "label": "Demonstrate lazy evaluation and short-circuit optimization"
        },
        {
          "id": "java-60-stream-api-cp-3",
          "label": "Construct declarative data processing pipelines with filter, map, and collect."
        }
      ],
      "practiceExercises": [
        {
          "id": "java-60-ex-1",
          "title": "Generate First N Even Numbers with IntStream",
          "difficulty": "Beginner",
          "type": "coding",
          "prompt": "Use IntStream.iterate to generate the first 5 even numbers and collect them into an array.",
          "solution": "import java.util.Arrays;\nimport java.util.stream.IntStream;\n\npublic class EvenStream {\n    public static void main(String[] args) {\n        int[] evens = IntStream.iterate(2, n -> n + 2)\n                               .limit(5)\n                               .toArray();\n        System.out.println(\"First 5 evens: \" + Arrays.toString(evens));\n    }\n}",
          "explanation": "IntStream.iterate with limit(5) creates an infinite stream bounded to 5 elements without boxing."
        },
        {
          "id": "java-60-ex-2",
          "title": "Stream Supplier Factory for Reusability",
          "difficulty": "Intermediate",
          "type": "coding",
          "prompt": "Write a Supplier<Stream<String>> pattern that allows recreating a stream pipeline repeatedly without IllegalStateException.",
          "solution": "import java.util.function.Supplier;\nimport java.util.stream.Stream;\n\npublic class StreamSupplierDemo {\n    public static void main(String[] args) {\n        Supplier<Stream<String>> streamSupplier = () -> Stream.of(\"Alpha\", \"Beta\", \"Gamma\");\n\n        // Safe re-use: each .get() call creates a fresh unconsumed stream!\n        streamSupplier.get().forEach(System.out::print);\n        System.out.println();\n        long count = streamSupplier.get().count();\n        System.out.println(\"Count: \" + count);\n    }\n}",
          "explanation": "A Supplier<Stream<T>> wraps stream creation, producing fresh streams on demand."
        },
        {
          "id": "java-60-ex-3",
          "title": "Spliterator Architecture in Streams",
          "difficulty": "Advanced",
          "type": "conceptual",
          "prompt": "What is a Spliterator in Java 8 and how does it enable parallel stream execution?",
          "solution": "A `Spliterator` (\"splittable iterator\") partitions a sequence of elements for parallel processing. It defines `tryAdvance()` to process elements sequentially and `trySplit()` to split off a portion of its elements into a second Spliterator. In parallel streams, the ForkJoinPool repeatedly calls `trySplit()` to partition data across worker threads until chunks are small enough to process in parallel.",
          "explanation": "Spliterators drive the parallel partition-and-conquer mechanism of parallel streams."
        }
      ],
      "quizQuestions": [
        {
          "id": "java-60-q1",
          "question": "What occurs if you call intermediate operations on a Stream without invoking a terminal operation?",
          "options": [
            "The operations execute in parallel",
            "Nothing happens; intermediate operations are lazy and never execute without a terminal operation",
            "The JVM throws an IllegalStateException",
            "The stream is saved to disk"
          ],
          "correctOptionIndex": 1,
          "explanation": "Intermediate stream operations are completely lazy and do not process any elements until a terminal operation is called."
        },
        {
          "id": "java-60-q2",
          "question": "What happens if you attempt to invoke a second terminal operation on an already consumed Stream?",
          "options": [
            "It rewinds to the beginning and re-executes",
            "It throws java.lang.IllegalStateException: stream has already been operated upon or closed",
            "It returns an empty result",
            "It executes on a new thread"
          ],
          "correctOptionIndex": 1,
          "explanation": "Streams in Java are single-use. Once operated upon by a terminal operation, they are permanently closed."
        }
      ],
      "revisionNotes": [
        "Streams do not store data and never mutate source collections.",
        "Intermediate operations are lazy; terminal operations trigger execution.",
        "A stream can be consumed only once."
      ]
    },
    {
      "id": "java-61-intermediate-stream-operations",
      "moduleId": "java-m5",
      "moduleNumber": 5,
      "moduleTitle": "Advanced Java",
      "topicNumber": 61,
      "title": "Intermediate Stream Operations: filter, map, flatMap, distinct & sorted",
      "language": "java",
      "level": "Intermediate",
      "whyItMatters": "Intermediate operations define the transformation logic of a stream. Mastering `flatMap` (flattening nested structures) vs `map` (1-to-1 transformation) is one of the most critical requirements in modern Java placement tests.",
      "explanation": "Intermediate operations return a new Stream and are lazily evaluated:\n1. `filter(Predicate<T>)`: Selects elements matching a boolean predicate.\n2. `map(Function<T, R>)`: One-to-one transformation: maps each element to exactly one new element (`Stream<T> -> Stream<R>`).\n3. `flatMap(Function<T, Stream<R>>)`: One-to-many transformation: flattens nested streams (e.g. `List<List<T>>` or nested objects) into a single continuous `Stream<R>`.\n4. `distinct()`: Removes duplicate elements using `equals()` and `hashCode()`.\n5. `sorted()`: Sorts elements using natural order or a custom `Comparator` (stateful operation).\n6. `peek(Consumer<T>)`: Non-intrusive action on elements, primarily used for debugging.\n7. `limit(n)` & `skip(n)`: Short-circuiting operations for pagination.\nStateless vs Stateful: `filter` and `map` are stateless (process element by element); `sorted` and `distinct` are stateful (must inspect all prior elements before passing downstream).",
      "syntaxAndStructure": "// filter and map:\nlist.stream().filter(s -> s.length() > 3).map(String::toUpperCase);\n\n// flatMap flattening lists of lists:\nList<List<String>> nested = List.of(List.of(\"A\", \"B\"), List.of(\"C\", \"D\"));\nList<String> flat = nested.stream().flatMap(Collection::stream).toList();",
      "codeExamples": [
        {
          "title": "map() vs flatMap() In-Depth Comparison",
          "code": "import java.util.List;\nimport java.util.stream.Collectors;\n\nclass Student {\n    String name;\n    List<String> subjects;\n    Student(String n, List<String> subs) { this.name = n; this.subjects = subs; }\n}\n\npublic class MapVsFlatMapDemo {\n    public static void main(String[] args) {\n        List<Student> students = List.of(\n            new Student(\"Alice\", List.of(\"Java\", \"DSA\")),\n            new Student(\"Bob\", List.of(\"Python\", \"Java\", \"SQL\"))\n        );\n\n        // 1. map(): 1-to-1 -> Produces Stream<List<String>> (nested lists)\n        List<List<String>> mapped = students.stream()\n            .map(s -> s.subjects)\n            .collect(Collectors.toList());\n        System.out.println(\"map() result (nested): \" + mapped);\n\n        // 2. flatMap(): 1-to-Many -> Flattens into a single Stream<String>\n        List<String> distinctSubjects = students.stream()\n            .flatMap(s -> s.subjects.stream()) // Flattens nested streams\n            .distinct()                         // Discards duplicates\n            .sorted()                           // Sorts alphabetically\n            .collect(Collectors.toList());\n        System.out.println(\"flatMap() result (flat & distinct): \" + distinctSubjects);\n    }\n}",
          "expectedOutput": "map() result (nested): [[Java, DSA], [Python, Java, SQL]]\nflatMap() result (flat & distinct): [DSA, Java, Python, SQL]",
          "explanation": "map() transforms Student to List<String>, preserving nested structure. flatMap() flattens each student's subject stream into a single unified stream."
        },
        {
          "title": "Pagination and Debugging with skip, limit, and peek",
          "code": "import java.util.List;\nimport java.util.stream.Collectors;\nimport java.util.stream.IntStream;\n\npublic class StreamPaginationDemo {\n    public static void main(String[] args) {\n        // Paginating: Page 2 with page size 3 (Skip first 3, take next 3)\n        List<Integer> page2 = IntStream.rangeClosed(1, 10)\n            .boxed()\n            .skip(3)                                    // Skip first 3 (1, 2, 3)\n            .limit(3)                                   // Take next 3 (4, 5, 6)\n            .peek(n -> System.out.println(\"Emitted: \" + n)) // Debug inspect\n            .collect(Collectors.toList());\n\n        System.out.println(\"Page 2 results: \" + page2);\n    }\n}",
          "expectedOutput": "Emitted: 4\nEmitted: 5\nEmitted: 6\nPage 2 results: [4, 5, 6]",
          "explanation": "skip(3) and limit(3) implement efficient pagination over streams. peek() allows non-destructive inspection of passing elements."
        }
      ],
      "realWorldApplications": [
        "Flattening order line items from multiple orders for invoice calculation using flatMap.",
        "Implementing server-side pagination for REST APIs using skip and limit."
      ],
      "commonMistakes": [
        "Using `map` when `flatMap` is required, resulting in awkward `List<List<T>>` or `Stream<Stream<T>>`.",
        "Using `peek()` for business side effects; `peek()` is intended for debugging and can be optimized away by the JVM if pipeline steps are omitted.",
        "Expecting intermediate operations (filter, map) to execute without invoking a terminal operation (lazy evaluation)."
      ],
      "interviewRelevance": "Universal interview question: \"What is the difference between map() and flatMap()?\", \"Stateless vs stateful stream operations\", and \"How do you flatten a 2D array using streams?\"",
      "checkpoints": [
        {
          "id": "java-61-cp-1",
          "label": "Differentiate map (1-to-1) from flatMap (1-to-many flattening)"
        },
        {
          "id": "java-61-cp-2",
          "label": "Classify stateless (filter, map) vs stateful (sorted, distinct) operations"
        },
        {
          "id": "java-61-intermediate-stream-operations-cp-3",
          "label": "Apply intermediate operations: filter, map, flatMap, distinct, sorted, and peek."
        }
      ],
      "practiceExercises": [
        {
          "id": "java-61-ex-1",
          "title": "Flatten 2D Array of Strings",
          "difficulty": "Beginner",
          "type": "coding",
          "prompt": "Flatten a String[][] 2D array into a single List<String> using Arrays.stream and flatMap.",
          "solution": "import java.util.*;\n\npublic class Flatten2DArray {\n    public static void main(String[] args) {\n        String[][] matrix = { {\"A\", \"B\"}, {\"C\", \"D\"}, {\"E\"} };\n        List<String> flatList = Arrays.stream(matrix)\n                                      .flatMap(Arrays::stream)\n                                      .toList();\n        System.out.println(\"Flat list: \" + flatList);\n    }\n}",
          "explanation": "Arrays.stream(matrix) emits Stream<String[]>, which flatMap(Arrays::stream) flattens into Stream<String>."
        },
        {
          "id": "java-61-ex-2",
          "title": "Extract Unique Words from Sentences",
          "difficulty": "Intermediate",
          "type": "coding",
          "prompt": "Given a list of sentences, return a sorted list of unique lowercase words.",
          "solution": "import java.util.*;\n\npublic class UniqueWords {\n    public static void main(String[] args) {\n        List<String> sentences = List.of(\"Java is powerful\", \"clean code in Java\");\n        List<String> words = sentences.stream()\n            .flatMap(s -> Arrays.stream(s.split(\" \")))\n            .map(String::toLowerCase)\n            .distinct()\n            .sorted()\n            .toList();\n        System.out.println(\"Unique sorted words: \" + words);\n    }\n}",
          "explanation": "Splitting sentences into word arrays and flattening them with flatMap extracts individual tokens."
        },
        {
          "id": "java-61-ex-3",
          "title": "Stateful Operation Performance Bottlenecks",
          "difficulty": "Advanced",
          "type": "conceptual",
          "prompt": "Why do stateful operations like sorted() break parallel stream efficiency on infinite or large streams?",
          "solution": "Stateless operations (filter, map) can process elements independently in parallel chunks across CPU cores. However, stateful operations (like `sorted()`) cannot emit a single element until they have buffered and inspected the ENTIRE stream from all threads. On an infinite stream, `sorted()` blocks forever and throws an OutOfMemoryError. On large parallel streams, it forces all parallel worker threads to synchronize at a global barrier, destroying parallel speedup.",
          "explanation": "sorted() requires global buffering of all elements before emitting any output."
        }
      ],
      "quizQuestions": [
        {
          "id": "java-61-q1",
          "question": "When should you use `flatMap()` instead of `map()`?",
          "options": [
            "When you need to sort elements",
            "When each element maps to a collection or Stream, and you want to flatten them into a single continuous stream",
            "When working only with integers",
            "To make the stream parallel"
          ],
          "correctOptionIndex": 1,
          "explanation": "`flatMap` transforms each element into a stream of values and flattens all resulting streams into one unified stream."
        },
        {
          "id": "java-61-q2",
          "question": "Which of the following intermediate stream operations is STATEFUL?",
          "options": [
            "filter()",
            "map()",
            "sorted()",
            "peek()"
          ],
          "correctOptionIndex": 2,
          "explanation": "`sorted()` is stateful because it must inspect and buffer all elements before it can emit any elements in order."
        }
      ],
      "revisionNotes": [
        "`map`: 1-to-1 transformation (`T -> R`).",
        "`flatMap`: 1-to-many flattening (`T -> Stream<R>`).",
        "Stateless operations (filter, map) process elements independently; stateful operations (sorted, distinct) buffer elements."
      ]
    },
    {
      "id": "java-62-terminal-stream-operations",
      "moduleId": "java-m5",
      "moduleNumber": 5,
      "moduleTitle": "Advanced Java",
      "topicNumber": 62,
      "title": "Terminal Operations: collect, reduce, groupingBy & Partitioning",
      "language": "java",
      "level": "Intermediate",
      "whyItMatters": "Terminal operations produce the final result of a stream pipeline. Mastering `reduce` for aggregations and `Collectors.groupingBy` for complex multi-level aggregations is essential for enterprise backend development.",
      "explanation": "A terminal operation executes the pipeline and closes the stream:\n1. Reduction Operations:\n   - `reduce(identity, accumulator)`: Combines elements into a single summary result (e.g. sum, product, string concatenation).\n   - `count()`, `min()`, `max()`, `sum()` (on numeric streams).\n2. Short-Circuiting Terminal Operations:\n   - `anyMatch(Predicate)`: Returns true as soon as one element matches.\n   - `allMatch(Predicate)` / `noneMatch(Predicate)`.\n   - `findFirst()` / `findAny()`.\n3. The `collect()` Operation & `java.util.stream.Collectors`:\n   - `toList()` (Java 16+) / `Collectors.toList()`\n   - `Collectors.toSet()`, `Collectors.toMap(keyMapper, valMapper)`\n   - `Collectors.joining(delimiter)`\n   - `Collectors.groupingBy(classifier)`: Groups elements by a key (like SQL `GROUP BY`), returning a `Map<K, List<V>>`.\n   - `Collectors.partitioningBy(predicate)`: Partitions elements into two groups (`true` and `false`), returning `Map<Boolean, List<V>>`.",
      "syntaxAndStructure": "// reduce:\nint sum = numbers.stream().reduce(0, (a, b) -> a + b);\n\n// groupingBy (SQL GROUP BY equivalent):\nMap<Department, List<Employee>> byDept = employees.stream()\n    .collect(Collectors.groupingBy(Employee::getDepartment));\n\n// partitioningBy (Binary boolean partition):\nMap<Boolean, List<Student>> passed = students.stream()\n    .collect(Collectors.partitioningBy(s -> s.getScore() >= 60));",
      "codeExamples": [
        {
          "title": "Advanced Grouping and Downstream Aggregations",
          "code": "import java.util.List;\nimport java.util.Map;\nimport java.util.stream.Collectors;\n\nclass Worker {\n    String name;\n    String department;\n    double salary;\n    Worker(String n, String d, double s) { this.name = n; this.department = d; this.salary = s; }\n}\n\npublic class CollectorsGroupingDemo {\n    public static void main(String[] args) {\n        List<Worker> team = List.of(\n            new Worker(\"Alice\", \"Engineering\", 120000),\n            new Worker(\"Bob\", \"HR\", 75000),\n            new Worker(\"Charlie\", \"Engineering\", 110000),\n            new Worker(\"David\", \"HR\", 80000),\n            new Worker(\"Eve\", \"Marketing\", 95000)\n        );\n\n        // 1. Grouping by department: Map<String, List<Worker>>\n        Map<String, List<Worker>> byDept = team.stream()\n            .collect(Collectors.groupingBy(w -> w.department));\n        System.out.println(\"Engineering count: \" + byDept.get(\"Engineering\").size());\n\n        // 2. Downstream Collector: Average salary per department\n        Map<String, Double> avgSalaryPerDept = team.stream()\n            .collect(Collectors.groupingBy(\n                w -> w.department,\n                Collectors.averagingDouble(w -> w.salary)\n            ));\n        System.out.printf(\"Avg Engineering Salary: $%.2f%n\", avgSalaryPerDept.get(\"Engineering\"));\n        System.out.printf(\"Avg HR Salary: $%.2f%n\", avgSalaryPerDept.get(\"HR\"));\n    }\n}",
          "expectedOutput": "Engineering count: 2\nAvg Engineering Salary: $115000.00\nAvg HR Salary: $77500.00",
          "explanation": "Collectors.groupingBy accepts downstream collectors like averagingDouble, performing multi-dimensional aggregation in a single pass."
        },
        {
          "title": "PartitioningBy and Custom Reduce Calculation",
          "code": "import java.util.List;\nimport java.util.Map;\nimport java.util.stream.Collectors;\n\npublic class ReduceAndPartitionDemo {\n    public static void main(String[] args) {\n        List<Integer> numbers = List.of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);\n\n        // 1. reduce: Multiplies all numbers (factorial of 5)\n        int product = numbers.subList(0, 5).stream()\n            .reduce(1, (acc, n) -> acc * n);\n        System.out.println(\"Factorial of 5 via reduce: \" + product);\n\n        // 2. partitioningBy: Splits into Even (true) and Odd (false)\n        Map<Boolean, List<Integer>> evenOdd = numbers.stream()\n            .collect(Collectors.partitioningBy(n -> n % 2 == 0));\n\n        System.out.println(\"Evens (true): \" + evenOdd.get(true));\n        System.out.println(\"Odds (false): \" + evenOdd.get(false));\n    }\n}",
          "expectedOutput": "Factorial of 5 via reduce: 120\nEvens (true): [2, 4, 6, 8, 10]\nOdds (false): [1, 3, 5, 7, 9]",
          "explanation": "reduce combines elements with an identity accumulator. partitioningBy splits elements into two boolean partitions."
        }
      ],
      "realWorldApplications": [
        "Generating payroll summary reports grouped by department and job title.",
        "Constructing frequency maps and histograms from raw log event streams."
      ],
      "commonMistakes": [
        "Using `Collectors.toMap` without a merge function when duplicate keys exist, causing an `IllegalStateException: Duplicate key`.",
        "Using `reduce` with a mutable accumulator instead of `collect`, creating expensive temporary objects.",
        "Using parallel streams for small data sets or tasks with blocking I/O, degrading performance through thread pool saturation."
      ],
      "interviewRelevance": "Universal interview question: \"Explain Collectors.groupingBy vs partitioningBy\", \"How does reduce work?\", and \"How do you avoid duplicate key errors in Collectors.toMap?\"",
      "checkpoints": [
        {
          "id": "java-62-cp-1",
          "label": "Use Collectors.groupingBy with downstream collectors (counting, averaging, mapping)"
        },
        {
          "id": "java-62-cp-2",
          "label": "Apply reduce(identity, accumulator) for custom aggregation computations"
        },
        {
          "id": "java-62-terminal-stream-operations-cp-3",
          "label": "Aggregate stream results using reduce, collect, groupingBy, and partitioningBy."
        }
      ],
      "practiceExercises": [
        {
          "id": "java-62-ex-1",
          "title": "String Joining with Delimiter, Prefix, and Suffix",
          "difficulty": "Beginner",
          "type": "coding",
          "prompt": "Join a list of strings into a formatted CSV string \"[A, B, C]\" using Collectors.joining().",
          "solution": "import java.util.List;\nimport java.util.stream.Collectors;\n\npublic class JoiningDemo {\n    public static void main(String[] args) {\n        List<String> list = List.of(\"A\", \"B\", \"C\");\n        String formatted = list.stream().collect(Collectors.joining(\", \", \"[\", \"]\"));\n        System.out.println(\"Joined: \" + formatted);\n    }\n}",
          "explanation": "Collectors.joining(delimiter, prefix, suffix) formats structured strings cleanly."
        },
        {
          "id": "java-62-ex-2",
          "title": "Safe toMap with Merge Function",
          "difficulty": "Intermediate",
          "type": "coding",
          "prompt": "Convert a list of strings into a map of FirstLetter -> Word, resolving duplicate keys by keeping the longer string.",
          "solution": "import java.util.*;\nimport java.util.stream.Collectors;\n\npublic class SafeToMap {\n    public static void main(String[] args) {\n        List<String> words = List.of(\"apple\", \"apricot\", \"banana\", \"blueberry\");\n        Map<Character, String> map = words.stream()\n            .collect(Collectors.toMap(\n                s -> s.charAt(0),\n                s -> s,\n                (existing, incoming) -> incoming.length() > existing.length() ? incoming : existing\n            ));\n        System.out.println(\"Resolved map: \" + map);\n    }\n}",
          "explanation": "The merge function (existing, incoming) -> ... resolves duplicate key collisions safely."
        },
        {
          "id": "java-62-ex-3",
          "title": "Custom Collector Implementation",
          "difficulty": "Advanced",
          "type": "coding",
          "prompt": "Implement a custom Collector using Collector.of() that collects integers into an immutable custom container.",
          "solution": "import java.util.ArrayList;\nimport java.util.Collections;\nimport java.util.List;\nimport java.util.stream.Collector;\n\npublic class CustomCollectorDemo {\n    public static void main(String[] args) {\n        Collector<Integer, List<Integer>, List<Integer>> unmodifiableListCollector = Collector.of(\n            ArrayList::new,                  // Supplier\n            List::add,                       // Accumulator\n            (left, right) -> { left.addAll(right); return left; }, // Combiner\n            Collections::unmodifiableList    // Finisher\n        );\n        List<Integer> result = List.of(1, 2, 3).stream().collect(unmodifiableListCollector);\n        System.out.println(\"Result: \" + result);\n    }\n}",
          "explanation": "Collector.of() defines supplier, accumulator, combiner, and finisher functions explicitly."
        }
      ],
      "quizQuestions": [
        {
          "id": "java-62-q1",
          "question": "What type does `Collectors.partitioningBy(Predicate)` always return as the map keys?",
          "options": [
            "String",
            "Integer",
            "Boolean",
            "Object"
          ],
          "correctOptionIndex": 2,
          "explanation": "`partitioningBy` partitions elements into two groups: `Boolean.TRUE` (matching predicate) and `Boolean.FALSE` (non-matching)."
        },
        {
          "id": "java-62-q2",
          "question": "What happens if you use `Collectors.toMap(keyMapper, valueMapper)` without a merge function and duplicate keys are encountered?",
          "options": [
            "The older value is silently overwritten",
            "The new value is discarded",
            "It throws an IllegalStateException: Duplicate key",
            "It converts the value into a List"
          ],
          "correctOptionIndex": 2,
          "explanation": "Without a merge function, duplicate keys cause an immediate IllegalStateException."
        }
      ],
      "revisionNotes": [
        "Terminal operations execute the pipeline and close the stream.",
        "`Collectors.groupingBy` maps elements into multi-value groups (`Map<K, List<V>>`).",
        "`Collectors.partitioningBy` splits elements into two boolean groups (`Map<Boolean, List<V>>`)."
      ]
    },
    {
      "id": "java-63-optional",
      "moduleId": "java-m5",
      "moduleNumber": 5,
      "moduleTitle": "Advanced Java",
      "topicNumber": 63,
      "title": "Optional<T>: Null-Safety, Functional Methods & Anti-Patterns",
      "language": "java",
      "level": "Intermediate",
      "whyItMatters": "Tony Hoare called `null` his \"billion-dollar mistake\". `Optional<T>` (Java 8+) provides a type-level representation of an absent value, forcing callers to acknowledge and handle the possibility of absence without NullPointerException.",
      "explanation": "`Optional<T>` is a container object which may or may not contain a non-null value.\nKey Principles:\n1. Creation:\n   - `Optional.of(val)`: Throws NullPointerException immediately if val is null.\n   - `Optional.ofNullable(val)`: Returns `Optional.empty()` if null, else wrapped value.\n   - `Optional.empty()`: Represents an empty optional.\n2. Extracting Values (Avoiding get()):\n   - Anti-Pattern: Calling `opt.get()` without checking `opt.isPresent()` throws `NoSuchElementException`.\n   - `orElse(defaultVal)`: Returns default value if empty (evaluated eagerly).\n   - `orElseGet(Supplier)`: Computes default value lazily via lambda ONLY if empty.\n   - `orElseThrow(Supplier)`: Throws a custom exception if empty.\n3. Functional Chaining:\n   - `map(Function)`: Transforms wrapped value if present.\n   - `flatMap(Function)`: Prevents nested `Optional<Optional<T>>`.\n   - `filter(Predicate)`: Retains value only if matching predicate.\n   - `ifPresent(Consumer)`: Executes action if value is present.",
      "syntaxAndStructure": "// Creation:\nOptional<String> opt = Optional.ofNullable(fetchFromDatabase());\n\n// Safe functional extraction:\nString username = opt\n    .filter(s -> !s.isBlank())\n    .map(String::trim)\n    .orElseGet(() -> \"Guest_User\"); // Lazy fallback\n\n// Guarded exception:\nUser u = userOpt.orElseThrow(() -> new UserNotFoundException(\"User missing\"));",
      "codeExamples": [
        {
          "title": "Modern Optional Fluent Transformation vs Legacy Null Checks",
          "code": "import java.util.Optional;\n\npublic class OptionalTransformationDemo {\n    public static void main(String[] args) {\n        String rawInput = \"   candidate@ak67.com   \";\n\n        // Modern fluent chain replacing multiple nested if (str != null) checks\n        String sanitizedEmail = Optional.ofNullable(rawInput)\n            .map(String::trim)\n            .filter(email -> email.contains(\"@\"))\n            .map(String::toLowerCase)\n            .orElse(\"default@ak67.com\");\n\n        System.out.println(\"Sanitized email: \" + sanitizedEmail);\n\n        // Handling null input gracefully\n        String nullInput = null;\n        String fallback = Optional.ofNullable(nullInput)\n            .map(String::trim)\n            .orElse(\"anonymous@ak67.com\");\n\n        System.out.println(\"Fallback email: \" + fallback);\n    }\n}",
          "expectedOutput": "Sanitized email: candidate@ak67.com\nFallback email: anonymous@ak67.com",
          "explanation": "Optional pipelines chain map, filter, and orElse seamlessly, eliminating verbose nested null checks."
        },
        {
          "title": "orElse() vs orElseGet() Performance Trap",
          "code": "import java.util.Optional;\n\npublic class OrElseVsOrElseGetDemo {\n    static String expensiveServiceCall() {\n        System.out.println(\"--> Expensive service call executed!\");\n        return \"Default Fallback\";\n    }\n\n    public static void main(String[] args) {\n        Optional<String> presentOpt = Optional.of(\"Cached Data\");\n\n        System.out.println(\"--- Testing orElse (EAGER) ---\");\n        // orElse ALWAYS evaluates its argument, even when Optional is already present!\n        String res1 = presentOpt.orElse(expensiveServiceCall());\n        System.out.println(\"Result 1: \" + res1);\n\n        System.out.println(\"\\n--- Testing orElseGet (LAZY) ---\");\n        // orElseGet evaluates supplier ONLY if Optional is empty!\n        String res2 = presentOpt.orElseGet(() -> expensiveServiceCall());\n        System.out.println(\"Result 2: \" + res2);\n    }\n}",
          "expectedOutput": "--- Testing orElse (EAGER) ---\n--> Expensive service call executed!\nResult 1: Cached Data\n\n--- Testing orElseGet (LAZY) ---\nResult 2: Cached Data",
          "explanation": "orElse evaluates its parameter eagerly regardless of whether the Optional has a value. orElseGet executes its Supplier lazily ONLY when empty."
        }
      ],
      "realWorldApplications": [
        "Repository query methods (e.g. `findById(id)` returning `Optional<User>`).",
        "Preventing NullPointerExceptions in microservice responses and configuration managers."
      ],
      "commonMistakes": [
        "Using `Optional` as method parameters or class fields (creates unnecessary wrapper object allocation overhead; Optional is designed as a method return type).",
        "Using `orElse(expensiveMethod())` instead of `orElseGet(() -> expensiveMethod())`, paying the cost of the fallback computation every time.",
        "Calling Optional.get() without checking isPresent(), defeating the purpose of Optional and risking NoSuchElementException."
      ],
      "interviewRelevance": "Universal interview question: \"What is the difference between orElse and orElseGet?\", \"Why should you not use Optional as class fields?\", and \"Explain flatMap in Optional.\"",
      "checkpoints": [
        {
          "id": "java-63-cp-1",
          "label": "Explain the critical performance difference: orElse (eager) vs orElseGet (lazy)"
        },
        {
          "id": "java-63-cp-2",
          "label": "Avoid Optional anti-patterns: do not use as field or method parameter types"
        },
        {
          "id": "java-63-optional-cp-3",
          "label": "Idiomatically handle absent values using orElse, orElseGet, and orElseThrow."
        }
      ],
      "practiceExercises": [
        {
          "id": "java-63-ex-1",
          "title": "Nested Object Navigation with flatMap",
          "difficulty": "Beginner",
          "type": "coding",
          "prompt": "Given User having Optional<Address> which has Optional<City>, extract the city name safely using flatMap.",
          "solution": "import java.util.Optional;\n\nclass City { String name; City(String n) { this.name = n; } }\nclass Address { Optional<City> city; Address(City c) { this.city = Optional.ofNullable(c); } }\nclass User { Optional<Address> address; User(Address a) { this.address = Optional.ofNullable(a); } }\n\npublic class OptionalNavigation {\n    public static String getCityName(User u) {\n        return Optional.ofNullable(u)\n            .flatMap(user -> user.address)\n            .flatMap(addr -> addr.city)\n            .map(c -> c.name)\n            .orElse(\"Unknown City\");\n    }\n    public static void main(String[] args) {\n        User u = new User(new Address(new City(\"Bengaluru\")));\n        System.out.println(\"City: \" + getCityName(u));\n    }\n}",
          "explanation": "flatMap unpacks nested Optional<T> layers, avoiding Optional<Optional<T>>."
        },
        {
          "id": "java-63-ex-2",
          "title": "Optional.ifPresentOrElse (Java 9+)",
          "difficulty": "Intermediate",
          "type": "coding",
          "prompt": "Use Java 9 ifPresentOrElse to print the user name if present, or log \"Guest\" if absent.",
          "solution": "import java.util.Optional;\n\npublic class IfPresentOrElseDemo {\n    public static void main(String[] args) {\n        Optional<String> user = Optional.of(\"Alice\");\n        user.ifPresentOrElse(\n            name -> System.out.println(\"Welcome, \" + name),\n            () -> System.out.println(\"Welcome, Guest\")\n        );\n    }\n}",
          "explanation": "ifPresentOrElse combines an action Consumer with an empty fallback Runnable cleanly."
        },
        {
          "id": "java-63-ex-3",
          "title": "Why Optional is Not Serializable",
          "difficulty": "Advanced",
          "type": "conceptual",
          "prompt": "Why did the Java architects intentionally make java.util.Optional not implement java.io.Serializable?",
          "solution": "`Optional` was specifically architected as a lightweight method return-type value to represent absence in library APIs, not as a general-purpose data structure or field. If it were Serializable, developers would use it as class fields in domain entities, causing serialization bloat and breaking compatibility with standard Java Bean naming conventions and JPA ORMs. It was designed to be consumed and discarded immediately.",
          "explanation": "Brian Goetz explicitly noted Optional was intended as a library return type, not for domain serialization."
        }
      ],
      "quizQuestions": [
        {
          "id": "java-63-q1",
          "question": "What is the primary difference between `opt.orElse(defaultVal)` and `opt.orElseGet(supplier)`?",
          "options": [
            "orElse is lazy; orElseGet is eager",
            "orElse evaluates defaultVal eagerly even if opt has a value; orElseGet invokes the supplier lazily ONLY if opt is empty",
            "orElse throws NullPointerException",
            "They are identical"
          ],
          "correctOptionIndex": 1,
          "explanation": "`orElse(x)` evaluates x immediately at call time; `orElseGet(() -> x)` evaluates x only when the Optional is empty."
        },
        {
          "id": "java-63-q2",
          "question": "What happens if you invoke `Optional.of(null)` in Java?",
          "options": [
            "It returns an empty Optional",
            "It throws a NullPointerException immediately",
            "It returns an Optional containing the string \"null\"",
            "It compiles to a no-op"
          ],
          "correctOptionIndex": 1,
          "explanation": "`Optional.of()` mandates a non-null argument and throws NullPointerException if null. Use `Optional.ofNullable()` for nullable values."
        }
      ],
      "revisionNotes": [
        "`Optional<T>` represents presence or absence of a value without returning raw null.",
        "Use `orElseGet(() -> fallback)` for lazy default evaluation.",
        "Do not use `Optional` as class fields, method arguments, or collection elements."
      ]
    },
    {
      "id": "java-64-records",
      "moduleId": "java-m5",
      "moduleNumber": 5,
      "moduleTitle": "Advanced Java",
      "topicNumber": 64,
      "title": "Records (Java 14/16+): Immutable Data Carriers & Compact Constructors",
      "language": "java",
      "level": "Intermediate",
      "whyItMatters": "Records (finalized in Java 16 LTS) eliminate hundreds of lines of boilerplate POJO code (getters, constructors, equals, hashCode, toString). Records provide transparent, immutable data carriers with concise syntax.",
      "explanation": "A `record` in Java is a special form of class designed purely to act as a transparent, immutable data carrier.\nWhat the Compiler Generates Automatically:\n1. Private final fields for all record components.\n2. Canonical Constructor initializing all components.\n3. Public accessor methods matching component names (e.g. `p.name()`, NOT `p.getName()`).\n4. Robust `equals()` and `hashCode()` based on all components.\n5. Structured `toString()` printing `RecordName[comp1=val1, comp2=val2]`.\n\nKey Rules & Features:\n- Records are implicitly `final` and cannot be extended.\n- Records implicitly extend `java.lang.Record` (they cannot extend any other class, but CAN implement interfaces).\n- Compact Constructor: A constructor without parameters or explicit field assignment, used strictly for validation or normalization.\n- Record Components: Can be records themselves, enabling nested immutable structures.",
      "syntaxAndStructure": "// Complete immutable Point class in ONE line:\npublic record Point(int x, int y) {}\n\n// Record with validation via Compact Constructor:\npublic record Student(String name, int age) {\n    // Compact constructor (no parameter list, no this.x = x assignments)\n    public Student {\n        if (age < 0) throw new IllegalArgumentException(\"Age cannot be negative\");\n        name = name.trim(); // Normalization allowed!\n    }\n}",
      "codeExamples": [
        {
          "title": "Modern Java Record Definition and Usage",
          "code": "public class RecordBasicsDemo {\n    // Record declaration replaces 60 lines of boilerplate POJO code!\n    public record PlacementOffer(String candidateName, String company, double ctcLPA) {\n        // Compact constructor for validation\n        public PlacementOffer {\n            if (ctcLPA <= 0) throw new IllegalArgumentException(\"CTC must be positive\");\n            candidateName = candidateName.trim();\n        }\n    }\n\n    public static void main(String[] args) {\n        PlacementOffer offer1 = new PlacementOffer(\"Aarav\", \"Google\", 32.5);\n        PlacementOffer offer2 = new PlacementOffer(\"Aarav\", \"Google\", 32.5);\n\n        // Accessors are named after components directly (no 'get' prefix)\n        System.out.println(\"Candidate: \" + offer1.candidateName());\n        System.out.println(\"CTC: \" + offer1.ctcLPA() + \" LPA\");\n\n        // Built-in equals and toString\n        System.out.println(\"equals() comparison: \" + offer1.equals(offer2));\n        System.out.println(\"toString() output: \" + offer1);\n    }\n}",
          "expectedOutput": "Candidate: Aarav\nCTC: 32.5 LPA\nequals() comparison: true\ntoString() output: PlacementOffer[candidateName=Aarav, company=Google, ctcLPA=32.5]",
          "explanation": "The single-line record declaration automatically provides field storage, canonical constructor, accessors, equals, hashCode, and toString."
        },
        {
          "title": "Record Implementing Interfaces and Custom Methods",
          "code": "interface Validatable {\n    boolean isValid();\n}\n\npublic class RecordInterfaceDemo {\n    public record GeoLocation(double latitude, double longitude) implements Validatable {\n        @Override\n        public boolean isValid() {\n            return latitude >= -90 && latitude <= 90 && longitude >= -180 && longitude <= 180;\n        }\n\n        // Custom domain calculation method\n        public boolean isEquator() {\n            return Math.abs(latitude) < 0.0001;\n        }\n    }\n\n    public static void main(String[] args) {\n        GeoLocation loc = new GeoLocation(0.0, 77.5946);\n        System.out.println(\"Valid coordinates: \" + loc.isValid());\n        System.out.println(\"On Equator: \" + loc.isEquator());\n    }\n}",
          "expectedOutput": "Valid coordinates: true\nOn Equator: true",
          "explanation": "Records can implement interfaces and declare custom domain methods, static methods, and static fields."
        }
      ],
      "realWorldApplications": [
        "Data Transfer Objects (DTOs) in Spring Boot REST controllers and microservice responses.",
        "Composite keys in Maps, database query projections, and temporary data pipeline containers."
      ],
      "commonMistakes": [
        "Writing `offer.getCandidateName()` expecting JavaBean getters; record accessors do not use `get` (call `offer.candidateName()`).",
        "Attempting to declare non-static instance fields in records; records cannot have additional instance state beyond their components.",
        "Attempting to extend another class when defining a record; Java records implicitly extend java.lang.Record and cannot extend other classes."
      ],
      "interviewRelevance": "Modern Java 17/21 interview question: \"What are Java Records and what boilerplate do they eliminate?\", \"What is a compact constructor?\", and \"How does a Record differ from a standard class with final fields?\"",
      "checkpoints": [
        {
          "id": "java-64-cp-1",
          "label": "Define modern Java records and identify the 5 elements auto-generated by the compiler"
        },
        {
          "id": "java-64-cp-2",
          "label": "Implement validation and normalization using compact constructors"
        },
        {
          "id": "java-64-records-cp-3",
          "label": "Use Java Records for immutable, boilerplate-free data transfer objects."
        }
      ],
      "practiceExercises": [
        {
          "id": "java-64-ex-1",
          "title": "DTO Record for API Response",
          "difficulty": "Beginner",
          "type": "coding",
          "prompt": "Create a record ApiResponse<T>(int statusCode, String message, T data) with a static helper success(T data).",
          "solution": "public record ApiResponse<T>(int statusCode, String message, T data) {\n    public static <T> ApiResponse<T> success(T data) {\n        return new ApiResponse<>(200, \"SUCCESS\", data);\n    }\n    public static void main(String[] args) {\n        ApiResponse<String> res = ApiResponse.success(\"Data Payload\");\n        System.out.println(res);\n    }\n}",
          "explanation": "Records can have generic type parameters and static factory methods."
        },
        {
          "id": "java-64-ex-2",
          "title": "Deep Copy in Record Compact Constructor",
          "difficulty": "Intermediate",
          "type": "coding",
          "prompt": "Write a record UserPermissions(String user, java.util.List<String> roles) that ensures roles is immutable.",
          "solution": "import java.util.List;\n\npublic record UserPermissions(String user, List<String> roles) {\n    public UserPermissions {\n        // Defensive copy to guarantee immutability\n        roles = List.copyOf(roles);\n    }\n    public static void main(String[] args) {\n        UserPermissions up = new UserPermissions(\"Alice\", List.of(\"ADMIN\", \"USER\"));\n        System.out.println(\"Roles: \" + up.roles());\n    }\n}",
          "explanation": "Compact constructor reassigns roles to List.copyOf(roles), making the record deeply immutable."
        },
        {
          "id": "java-64-ex-3",
          "title": "Local Records Inside Methods",
          "difficulty": "Advanced",
          "type": "coding",
          "prompt": "Demonstrate how local records inside a method can act as intermediate tuple data carriers in stream pipelines.",
          "solution": "import java.util.*;\n\npublic class LocalRecordDemo {\n    public static void main(String[] args) {\n        List<String> names = List.of(\"Aarav\", \"Bob\", \"Ananya\");\n        // Local record defined inside method!\n        record ScoredUser(String name, int score) {}\n\n        List<ScoredUser> ranked = names.stream()\n            .map(n -> new ScoredUser(n, n.length() * 10))\n            .sorted(Comparator.comparingInt(ScoredUser::score).reversed())\n            .toList();\n\n        System.out.println(\"Ranked: \" + ranked);\n    }\n}",
          "explanation": "Java 16+ allows defining records locally inside method bodies as lightweight intermediate data carriers."
        }
      ],
      "quizQuestions": [
        {
          "id": "java-64-q1",
          "question": "What is the naming convention for accessor methods generated by the compiler for record components?",
          "options": [
            "getComponentName() (JavaBean convention)",
            "componentName() (matching the component name directly)",
            "isComponentName()",
            "fetchComponentName()"
          ],
          "correctOptionIndex": 1,
          "explanation": "Record accessors match the exact name of the component (e.g. `point.x()`), omitting the `get` prefix."
        },
        {
          "id": "java-64-q2",
          "question": "Can a Java record explicitly extend another class using the `extends` keyword?",
          "options": [
            "Yes, any class that is marked final",
            "No, all records implicitly extend java.lang.Record and Java does not support multiple class inheritance",
            "Yes, if the superclass is abstract",
            "Only in Java 21"
          ],
          "correctOptionIndex": 1,
          "explanation": "Records implicitly extend `java.lang.Record`. Because Java does not allow multiple class inheritance, records cannot extend another class."
        }
      ],
      "revisionNotes": [
        "Records are immutable data carriers that eliminate POJO boilerplate.",
        "Auto-generates fields, canonical constructor, accessors (`name()`), equals, hashCode, toString.",
        "Compact constructors allow validation and normalization without boilerplate parameter assignments."
      ]
    },
    {
      "id": "java-65-sealed-classes",
      "moduleId": "java-m5",
      "moduleNumber": 5,
      "moduleTitle": "Advanced Java",
      "topicNumber": 65,
      "title": "Sealed Classes & Interfaces (Java 15/17+): Exhaustive Domain Hierarchies",
      "language": "java",
      "level": "Intermediate",
      "whyItMatters": "Sealed classes (finalized in Java 17 LTS) allow developers to restrict which other classes or interfaces may extend or implement them. This enables modeling algebraic data types (ADTs) and exhaustive compile-time checking without default branches.",
      "explanation": "Prior to Java 17, inheritance was open-ended: any class in the classpath could extend a public class unless it was marked `final`.\nSealed Classes Architecture:\n1. The `sealed` Modifier: Declares a class or interface whose subtypes are strictly controlled.\n2. The `permits` Clause: Explicitly lists all allowed direct subclasses (e.g. `public sealed class Shape permits Circle, Square, Triangle`). If permitted subclasses reside in the same source file, the `permits` clause is optional.\n3. Rules for Permitted Subclasses:\n   Every permitted subclass MUST explicitly choose one of three modifiers:\n   - `final`: Prohibits any further extension.\n   - `sealed`: Extends the parent and continues controlling its own subclasses with its own `permits` clause.\n   - `non-sealed`: Re-opens the hierarchy, allowing unrestricted extension.\n4. Exhaustiveness in Pattern Matching: Because the compiler knows all permitted subtypes in advance, `switch` expressions on sealed types do NOT require a `default` branch!",
      "syntaxAndStructure": "// Sealed superclass:\npublic sealed class Payment permits CreditCard, UPI, BankTransfer {}\n\n// Subclasses MUST specify final, sealed, or non-sealed:\npublic final class CreditCard extends Payment {}\npublic final class UPI extends Payment {}\npublic non-sealed class BankTransfer extends Payment {} // Re-opened",
      "codeExamples": [
        {
          "title": "Sealed Class Hierarchy with Final and Non-Sealed Subclasses",
          "code": "// Sealed base class specifying exact permitted subtypes\nsealed abstract class ServiceResponse permits SuccessResponse, ErrorResponse {}\n\n// Permitted subclass 1: final (closed)\nfinal class SuccessResponse extends ServiceResponse {\n    private final String data;\n    SuccessResponse(String d) { this.data = d; }\n    public String getData() { return data; }\n}\n\n// Permitted subclass 2: final (closed)\nfinal class ErrorResponse extends ServiceResponse {\n    private final String error;\n    ErrorResponse(String err) { this.error = err; }\n    public String getError() { return error; }\n}\n\npublic class SealedHierarchyDemo {\n    public static void main(String[] args) {\n        ServiceResponse r1 = new SuccessResponse(\"Payload Delivered\");\n        ServiceResponse r2 = new ErrorResponse(\"Timeout 504\");\n\n        System.out.println(\"Responses instantiated under closed sealed hierarchy.\");\n        System.out.println(\"Is instance of ServiceResponse: \" + (r1 instanceof ServiceResponse));\n    }\n}",
          "expectedOutput": "Responses instantiated under closed sealed hierarchy.\nIs instance of ServiceResponse: true",
          "explanation": "ServiceResponse guarantees that no third-party code can introduce unauthorized subclasses outside SuccessResponse and ErrorResponse."
        },
        {
          "title": "Sealed Interfaces with Modern Records",
          "code": "// Sealed interface permitted to records!\nsealed interface Result<T> permits Success, Failure {}\n\nrecord Success<T>(T value) implements Result<T> {}\nrecord Failure<T>(String errorMessage) implements Result<T> {}\n\npublic class SealedRecordDemo {\n    public static void main(String[] args) {\n        Result<Integer> res = new Success<>(42);\n        \n        // Compiler knows Result can ONLY be Success or Failure\n        if (res instanceof Success<Integer> s) {\n            System.out.println(\"Success value: \" + s.value());\n        }\n    }\n}",
          "expectedOutput": "Success value: 42",
          "explanation": "Records are implicitly final, making them natural permitted subtypes for sealed interfaces to model Algebraic Data Types (Result = Success | Failure)."
        }
      ],
      "realWorldApplications": [
        "Modeling domain state machines where states are closed and known (PaymentState = PENDING | AUTHORIZED | FAILED).",
        "Compiler Abstract Syntax Trees (AST nodes) where node varieties are strictly bounded."
      ],
      "commonMistakes": [
        "Permitted subclasses failing to declare one of `final`, `sealed`, or `non-sealed`, which triggers a compile-time error.",
        "Placing permitted subclasses in different packages or modules; all permitted subtypes must reside in the same package/module as the sealed class.",
        "Declaring a sealed class without permitting subclasses, or failing to make permitted subclasses final, sealed, or non-sealed."
      ],
      "interviewRelevance": "Major Java 17 LTS interview topic: \"What are sealed classes in Java 17?\", \"What three modifiers must permitted subclasses specify?\", and \"How do sealed classes support pattern matching?\"",
      "checkpoints": [
        {
          "id": "java-65-cp-1",
          "label": "Explain the sealed keyword, permits clause, and the 3 allowed subclass modifiers"
        },
        {
          "id": "java-65-cp-2",
          "label": "Combine sealed interfaces with records to model Algebraic Data Types"
        },
        {
          "id": "java-65-sealed-classes-cp-3",
          "label": "Design restricted domain models and algebraic data types using sealed classes and interfaces."
        }
      ],
      "practiceExercises": [
        {
          "id": "java-65-ex-1",
          "title": "Define Sealed Vehicle Hierarchy",
          "difficulty": "Beginner",
          "type": "coding",
          "prompt": "Create a sealed class Vehicle permitting Car and Truck, where Car is final and Truck is non-sealed.",
          "solution": "sealed class Vehicle permits Car, Truck {}\nfinal class Car extends Vehicle {}\nnon-sealed class Truck extends Vehicle {}\n\npublic class SealedVehicleTest {\n    public static void main(String[] args) {\n        Vehicle v = new Car();\n        System.out.println(\"Sealed vehicle created: \" + v.getClass().getSimpleName());\n    }\n}",
          "explanation": "Car cannot be extended (final); Truck can be freely extended (non-sealed)."
        },
        {
          "id": "java-65-ex-2",
          "title": "Exhaustive Pattern Matching on Sealed Types",
          "difficulty": "Intermediate",
          "type": "coding",
          "prompt": "Demonstrate how pattern matching switch on a sealed class hierarchy needs no default branch.",
          "solution": "sealed interface Expr permits Const, Add {}\nrecord Const(int val) implements Expr {}\nrecord Add(Expr left, Expr right) implements Expr {}\n\npublic class SealedEvaluator {\n    public static int eval(Expr e) {\n        // No default needed because compiler knows Expr is sealed to Const and Add!\n        return switch (e) {\n            case Const c -> c.val();\n            case Add a -> eval(a.left()) + eval(a.right());\n        };\n    }\n    public static void main(String[] args) {\n        Expr expr = new Add(new Const(10), new Const(20));\n        System.out.println(\"Evaluated: \" + eval(expr));\n    }\n}",
          "explanation": "The compiler statically verifies that all permitted subtypes are handled, making default redundant."
        },
        {
          "id": "java-65-ex-3",
          "title": "Module and Package Constraints on Sealed Classes",
          "difficulty": "Advanced",
          "type": "conceptual",
          "prompt": "What package and module restrictions does the Java compiler enforce on permitted subclasses of a sealed class?",
          "solution": "If the sealed class is in a named module, all permitted subclasses MUST reside in the same module (though they can be in different packages within that module). If the sealed class is in the unnamed module (standard classpath), all permitted subclasses MUST reside in the exact same package. This prevents external libraries from injecting rogue subclasses into the sealed hierarchy.",
          "explanation": "Enforces strict compile-time boundaries on the closed type hierarchy."
        }
      ],
      "quizQuestions": [
        {
          "id": "java-65-q1",
          "question": "Which of the following is NOT one of the three mandatory modifiers for a subclass permitted by a sealed class?",
          "options": [
            "final",
            "sealed",
            "non-sealed",
            "static"
          ],
          "correctOptionIndex": 3,
          "explanation": "Every permitted subclass must explicitly declare either `final`, `sealed`, or `non-sealed`. `static` is not an inheritance hierarchy modifier."
        },
        {
          "id": "java-65-q2",
          "question": "Why does a switch expression on a sealed class hierarchy not require a `default` branch?",
          "options": [
            "Because the compiler suppresses all errors in switch",
            "Because the compiler knows all permitted subtypes and can statically verify exhaustiveness",
            "Because default is deprecated in Java 17",
            "Only if the class has fewer than 3 subclasses"
          ],
          "correctOptionIndex": 1,
          "explanation": "The sealed permits clause provides a closed universe of subtypes, allowing the compiler to guarantee that all possibilities are covered."
        }
      ],
      "revisionNotes": [
        "`sealed` restricts which classes can extend or implement a type via `permits`.",
        "Permitted subclasses must be `final`, `sealed`, or `non-sealed`.",
        "Enables exhaustive pattern matching switch expressions without `default`."
      ]
    },
    {
      "id": "java-66-pattern-matching",
      "moduleId": "java-m5",
      "moduleNumber": 5,
      "moduleTitle": "Advanced Java",
      "topicNumber": 66,
      "title": "Pattern Matching: instanceof (Java 16) & Switch Patterns (Java 21)",
      "language": "java",
      "level": "Intermediate",
      "whyItMatters": "Pattern matching transforms Java from verbose object-casting code into concise, declarative pattern inspection. Finalized in Java 16 (for instanceof) and Java 21 LTS (for switch), pattern matching is the modern standard for writing clean conditional logic.",
      "explanation": "Pattern matching combines a predicate test with conditional variable extraction in a single step:\n1. Pattern Matching for `instanceof` (Java 16+):\n   - Replaces the tedious test-and-cast pattern: `if (obj instanceof String) { String s = (String) obj; ... }`\n   - With the pattern variable: `if (obj instanceof String s) { System.out.println(s.length()); }`\n   - Flow Scoping: The pattern variable `s` is in scope only where the condition is definitely true!\n2. Pattern Matching for `switch` (Java 21 LTS):\n   - Allows switching directly on types and patterns rather than just primitives and strings.\n   - Supports `case null` directly without throwing NullPointerException.\n   - Guarded Patterns (`when` clause): Adds conditional boolean filters to case labels (e.g. `case String s when s.length() > 5 -> ...`).\n   - Record Patterns: Deconstructs records directly in the case statement (e.g. `case Point(int x, int y) -> ...`).",
      "syntaxAndStructure": "// Pattern matching instanceof:\nif (obj instanceof String s && s.length() > 3) {\n    System.out.println(s.toUpperCase()); // s is in scope\n}\n\n// Pattern matching switch (Java 21):\nString formatted = switch (obj) {\n    case Integer i -> String.format(\"int %d\", i);\n    case String s when s.isBlank() -> \"blank string\";\n    case String s -> String.format(\"string of length %d\", s.length());\n    case null -> \"null object\";\n    default -> \"unknown type\";\n};",
      "codeExamples": [
        {
          "title": "Modern Pattern Matching for instanceof and Flow Scoping",
          "code": "public class InstanceofPatternDemo {\n    public static void process(Object obj) {\n        // Pattern variable 's' is automatically extracted if test passes\n        if (obj instanceof String s && !s.isEmpty()) {\n            System.out.println(\"String with length: \" + s.length());\n        } else if (obj instanceof Integer i) {\n            System.out.println(\"Integer squared: \" + (i * i));\n        } else {\n            System.out.println(\"Other object type: \" + obj);\n        }\n    }\n\n    public static void main(String[] args) {\n        process(\"AK67 Prep\");\n        process(7);\n        process(3.14);\n    }\n}",
          "expectedOutput": "String with length: 9\nInteger squared: 49\nOther object type: 3.14",
          "explanation": "Pattern matching for instanceof binds the cast variable directly, eliminating redundant type cast expressions."
        },
        {
          "title": "Java 21 Pattern Matching for switch with Guarded when Clauses",
          "code": "public class SwitchPatternDemo {\n    public static String inspectValue(Object obj) {\n        // Java 21 LTS pattern matching switch with guarded patterns\n        return switch (obj) {\n            case null -> \"Received null reference\";\n            case Integer i when i < 0 -> \"Negative int: \" + i;\n            case Integer i -> \"Positive int: \" + i;\n            case String s when s.length() > 5 -> \"Long string: \" + s;\n            case String s -> \"Short string: \" + s;\n            default -> \"Other type: \" + obj.getClass().getSimpleName();\n        };\n    }\n\n    public static void main(String[] args) {\n        System.out.println(inspectValue(null));\n        System.out.println(inspectValue(-42));\n        System.out.println(inspectValue(100));\n        System.out.println(inspectValue(\"Placement 2026\"));\n    }\n}",
          "expectedOutput": "Received null reference\nNegative int: -42\nPositive int: 100\nLong string: Placement 2026",
          "explanation": "Java 21 switch patterns handle null directly and evaluate guard expressions via the when keyword."
        }
      ],
      "realWorldApplications": [
        "Parsing heterogeneous AST tokens, JSON nodes, and domain event messages.",
        "Refactoring messy `instanceof` + cast if-else ladders into clean, compiler-verified pattern switches."
      ],
      "commonMistakes": [
        "Assuming the pattern variable is in scope outside the if statement; it uses flow scoping and is only visible where the condition is guaranteed true.",
        "Listing a more general pattern before a guarded pattern (e.g. `case String s` before `case String s when s.length() > 5`), causing an \"unreachable code\" compiler error.",
        "Using legacy instanceof and manual explicit casting instead of modern pattern matching for instanceof and switch."
      ],
      "interviewRelevance": "Modern Java 21 interview question: \"Explain pattern matching for instanceof and flow scoping\", \"What is the `when` clause in Java 21 switch?\", and \"How does Java 21 switch handle null?\"",
      "checkpoints": [
        {
          "id": "java-66-cp-1",
          "label": "Use pattern matching for instanceof with flow scoping rules"
        },
        {
          "id": "java-66-cp-2",
          "label": "Write modern Java 21 switch statements with type patterns and guarded when clauses"
        },
        {
          "id": "java-66-pattern-matching-cp-3",
          "label": "Eliminate boilerplate casting using Java 17+ pattern matching."
        }
      ],
      "practiceExercises": [
        {
          "id": "java-66-ex-1",
          "title": "Refactor Equals with Pattern Matching",
          "difficulty": "Beginner",
          "type": "coding",
          "prompt": "Refactor a standard equals(Object o) method using modern pattern matching instanceof.",
          "solution": "class Point {\n    int x, y;\n    Point(int x, int y) { this.x = x; this.y = y; }\n\n    @Override\n    public boolean equals(Object o) {\n        // Modern 1-line check and cast\n        return (o instanceof Point other) && this.x == other.x && this.y == other.y;\n    }\n}\n\npublic class EqualsRefactorTest {\n    public static void main(String[] args) {\n        Point p1 = new Point(1, 2);\n        Point p2 = new Point(1, 2);\n        System.out.println(\"Points equal: \" + p1.equals(p2));\n    }\n}",
          "explanation": "Replaces 4 lines of boilerplate type checking and casting with a single clean boolean expression."
        },
        {
          "id": "java-66-ex-2",
          "title": "Record Deconstruction Patterns (Java 21)",
          "difficulty": "Intermediate",
          "type": "coding",
          "prompt": "Demonstrate record deconstruction in instanceof: if (obj instanceof Point(int x, int y)) { ... }.",
          "solution": "record Point(int x, int y) {}\n\npublic class RecordPatternDemo {\n    public static void printPoint(Object obj) {\n        // Java 21 Record Pattern directly extracts x and y components!\n        if (obj instanceof Point(int x, int y)) {\n            System.out.println(\"Point coordinates: x=\" + x + \", y=\" + y);\n        }\n    }\n    public static void main(String[] args) {\n        printPoint(new Point(10, 20));\n    }\n}",
          "explanation": "Record patterns deconstruct records into their component variables directly upon type matching."
        },
        {
          "id": "java-66-ex-3",
          "title": "Dominance Checking in Pattern Matching",
          "difficulty": "Advanced",
          "type": "conceptual",
          "prompt": "What is \"Dominance\" in Java 21 switch pattern matching, and why does case CharSequence dominate case String?",
          "solution": "In switch pattern matching, if a pattern label matches a type that is a supertype of a subsequent pattern, the first pattern \"dominates\" the second. Because `CharSequence` is a supertype of `String`, putting `case CharSequence cs -> ...` before `case String s -> ...` means the String branch could never be reached. The Java compiler enforces dominance ordering and generates a compile error if a dominating pattern precedes a dominated pattern.",
          "explanation": "The compiler mandates specific-to-general pattern ordering to prevent dead code."
        }
      ],
      "quizQuestions": [
        {
          "id": "java-66-q1",
          "question": "What is the keyword used in Java 21 switch statements to specify a guarded pattern (conditional filter)?",
          "options": [
            "if",
            "when",
            "where",
            "guard"
          ],
          "correctOptionIndex": 1,
          "explanation": "Java 21 uses the `when` keyword for guarded patterns (e.g. `case String s when s.length() > 5 -> ...`)."
        },
        {
          "id": "java-66-q2",
          "question": "How does modern Java 21 switch handle a `null` value when `case null:` is explicitly provided?",
          "options": [
            "It throws a NullPointerException before evaluating any case",
            "It safely routes execution to the `case null` branch",
            "It routes null to the default branch only",
            "It converts null to an empty string"
          ],
          "correctOptionIndex": 1,
          "explanation": "Java 21 switch natively supports explicit `case null:` handling, preventing NullPointerException."
        }
      ],
      "revisionNotes": [
        "Pattern matching instanceof (`obj instanceof String s`) tests and binds variables in one step.",
        "Java 21 switch supports type patterns, record deconstruction, and guarded `when` clauses.",
        "Switch in Java 21 handles `null` natively using `case null -> ...`."
      ]
    },
    {
      "id": "java-67-annotations",
      "moduleId": "java-m5",
      "moduleNumber": 5,
      "moduleTitle": "Advanced Java",
      "topicNumber": 67,
      "title": "Annotations, Meta-Annotations & Custom Reflection Processing",
      "language": "java",
      "level": "Intermediate",
      "whyItMatters": "Annotations (@Override, @Test, @Autowired, @Entity) are the metadata syntax of Java. Understanding meta-annotations (@Retention, @Target) and how frameworks process annotations at runtime via Reflection is essential for understanding Spring Boot and Hibernate.",
      "explanation": "An `Annotation` is a form of syntactic metadata that can be added to classes, methods, fields, and parameters without changing program semantics directly.\n1. Built-in Annotations:\n   - `@Override`: Enforces that a method overrides a superclass method.\n   - `@Deprecated`: Marks an API as superseded and discouraged.\n   - `@SuppressWarnings`: Silences compiler warnings (e.g. unchecked casts).\n2. Meta-Annotations (Annotations applied to other annotations):\n   - `@Retention`: Defines how long the annotation is retained:\n     - `SOURCE`: Discarded by compiler (e.g. `@Override`, Lombok).\n     - `CLASS`: Recorded in `.class` file, but discarded by JVM at runtime (default).\n     - `RUNTIME`: Retained in `.class` AND loaded into JVM; accessible via Reflection!\n   - `@Target`: Restricts where the annotation can be applied (`ElementType.METHOD`, `FIELD`, `TYPE`, `PARAMETER`).\n   - `@Documented`: Included in Javadoc.\n3. Custom Annotation Definition:\n   Declared using `@interface`. Elements are declared like methods (e.g. `String value() default \"\";`).",
      "syntaxAndStructure": "// Custom Runtime Annotation Definition:\n@Retention(RetentionPolicy.RUNTIME)\n@Target(ElementType.METHOD)\npublic @interface Endpoint {\n    String path();\n    String method() default \"GET\";\n}\n\n// Usage:\n@Endpoint(path = \"/users\", method = \"POST\")\npublic void createUser() { ... }",
      "codeExamples": [
        {
          "title": "Custom Annotation Definition and Runtime Reflection Processor",
          "code": "import java.lang.annotation.ElementType;\nimport java.lang.annotation.Retention;\nimport java.lang.annotation.RetentionPolicy;\nimport java.lang.annotation.Target;\nimport java.lang.reflect.Method;\n\n// 1. Declare Custom Annotation\n@Retention(RetentionPolicy.RUNTIME) // Must be RUNTIME for reflection access!\n@Target(ElementType.METHOD)         // Can only annotate methods\n@interface TestMethod {\n    String description() default \"Standard test\";\n}\n\n// 2. Class using the annotation\nclass ServiceTestSuite {\n    @TestMethod(description = \"Verify database connection\")\n    public void testDatabase() {\n        System.out.println(\"Running testDatabase()\");\n    }\n\n    public void regularMethod() {\n        // Not annotated\n    }\n}\n\n// 3. Reflection Runner\npublic class AnnotationProcessorDemo {\n    public static void main(String[] args) throws Exception {\n        Class<?> clazz = ServiceTestSuite.class;\n\n        for (Method m : clazz.getDeclaredMethods()) {\n            if (m.isAnnotationPresent(TestMethod.class)) {\n                TestMethod anno = m.getAnnotation(TestMethod.class);\n                System.out.println(\"Discovered test: \" + m.getName() + \" -> \" + anno.description());\n                m.invoke(clazz.getDeclaredConstructor().newInstance());\n            }\n        }\n    }\n}",
          "expectedOutput": "Discovered test: testDatabase -> Verify database connection\nRunning testDatabase()",
          "explanation": "Demonstrates how frameworks like JUnit discover and execute annotated methods dynamically at runtime via Reflection and isAnnotationPresent()."
        },
        {
          "title": "Suppressing Warnings and Deprecation",
          "code": "public class BuiltinAnnotationDemo {\n    @Deprecated(since = \"2.0\", forRemoval = true)\n    public static void legacyAlgorithm() {\n        System.out.println(\"Legacy code executed.\");\n    }\n\n    @SuppressWarnings(\"deprecation\")\n    public static void main(String[] args) {\n        // Suppresses compiler deprecation warning\n        legacyAlgorithm();\n    }\n}",
          "expectedOutput": "Legacy code executed.",
          "explanation": "Built-in annotations like @Deprecated and @SuppressWarnings communicate directly with compiler linters and IDE tooling."
        }
      ],
      "realWorldApplications": [
        "Spring Framework routing and dependency injection (`@RestController`, `@Autowired`, `@GetMapping`).",
        "JPA / Hibernate database entity mapping (`@Entity`, `@Table`, `@Id`, `@Column`)."
      ],
      "commonMistakes": [
        "Forgetting `@Retention(RetentionPolicy.RUNTIME)`; by default, annotations have `CLASS` retention, meaning they are invisible to runtime reflection!",
        "Using mutable types or complex objects as annotation element values; only primitives, String, Class, Enums, annotations, and 1D arrays are permitted.",
        "Forgetting @Retention(RetentionPolicy.RUNTIME) on custom annotations intended to be processed via reflection."
      ],
      "interviewRelevance": "Universal interview question: \"What is RetentionPolicy.RUNTIME vs SOURCE?\", \"How does Spring Boot process annotations?\", and \"Create a custom annotation from scratch.\"",
      "checkpoints": [
        {
          "id": "java-67-cp-1",
          "label": "Distinguish RetentionPolicy: SOURCE vs CLASS vs RUNTIME"
        },
        {
          "id": "java-67-cp-2",
          "label": "Inspect and process custom annotations dynamically using Java Reflection"
        },
        {
          "id": "java-67-annotations-cp-3",
          "label": "Create and process custom annotations with Target, Retention, and Documented meta-annotations."
        }
      ],
      "practiceExercises": [
        {
          "id": "java-67-ex-1",
          "title": "Custom Field Validation Annotation",
          "difficulty": "Beginner",
          "type": "coding",
          "prompt": "Create a @MaxLength(int value) annotation applicable to fields with runtime retention.",
          "solution": "import java.lang.annotation.*;\n\n@Retention(RetentionPolicy.RUNTIME)\n@Target(ElementType.FIELD)\npublic @interface MaxLength {\n    int value() default 255;\n}\n\nclass UserInput {\n    @MaxLength(10)\n    String username;\n}\npublic class MaxLengthTest {\n    public static void main(String[] args) {\n        System.out.println(\"Annotation defined successfully.\");\n    }\n}",
          "explanation": "Declares custom field metadata with default value 255."
        },
        {
          "id": "java-67-ex-2",
          "title": "Field Validator Engine",
          "difficulty": "Intermediate",
          "type": "coding",
          "prompt": "Write a validator method that inspects an object and throws an exception if any field annotated with @MaxLength exceeds its limit.",
          "solution": "import java.lang.reflect.Field;\n\npublic class ValidatorEngine {\n    public static void validate(Object obj) throws Exception {\n        for (Field f : obj.getClass().getDeclaredFields()) {\n            if (f.isAnnotationPresent(MaxLength.class)) {\n                f.setAccessible(true);\n                MaxLength ml = f.getAnnotation(MaxLength.class);\n                Object val = f.get(obj);\n                if (val instanceof String s && s.length() > ml.value()) {\n                    throw new IllegalArgumentException(\"Field \" + f.getName() + \" exceeds max length \" + ml.value());\n                }\n            }\n        }\n    }\n    public static void main(String[] args) throws Exception {\n        UserInput input = new UserInput();\n        input.username = \"Valid\";\n        validate(input);\n        System.out.println(\"Validation passed.\");\n    }\n}",
          "explanation": "Uses reflection to read fields, check annotations, and enforce metadata validation rules dynamically."
        },
        {
          "id": "java-67-ex-3",
          "title": "Compile-Time Annotation Processing (APT / Lombok)",
          "difficulty": "Advanced",
          "type": "conceptual",
          "prompt": "How does Lombok generate getters and setters at compile time without using runtime reflection?",
          "solution": "Lombok uses the Java Annotation Processing Tool (APT) via `javax.annotation.processing.Processor` hooks during the `javac` compilation phase. When javac runs, Lombok intercepts the Abstract Syntax Tree (AST), inspects annotations like `@Getter` and `@Data`, and injects bytecode for methods directly into the AST before bytecode generation. Because this happens at compile time, there is zero runtime reflection performance penalty.",
          "explanation": "Compile-time annotation processors manipulate AST representations before bytecode is emitted."
        }
      ],
      "quizQuestions": [
        {
          "id": "java-67-q1",
          "question": "Which `RetentionPolicy` must be specified for an annotation so that it can be inspected via Java Reflection at runtime?",
          "options": [
            "RetentionPolicy.SOURCE",
            "RetentionPolicy.CLASS",
            "RetentionPolicy.RUNTIME",
            "RetentionPolicy.JVM"
          ],
          "correctOptionIndex": 2,
          "explanation": "`RetentionPolicy.RUNTIME` instructs the JVM to retain the annotation in memory, making it accessible via reflection APIs."
        },
        {
          "id": "java-67-q2",
          "question": "What types are permitted as return values for elements in a custom Java annotation?",
          "options": [
            "Any Java class or object",
            "Primitives, String, Class, Enums, Annotations, and 1D arrays of these types",
            "Only primitives and Strings",
            "Only integers"
          ],
          "correctOptionIndex": 1,
          "explanation": "Annotation elements are restricted to primitives, String, Class, enums, other annotations, and single-dimensional arrays thereof."
        }
      ],
      "revisionNotes": [
        "Annotations attach metadata to program elements.",
        "`@Retention(RetentionPolicy.RUNTIME)` is mandatory for runtime reflection inspection.",
        "`@Target` restricts annotation placement to classes, methods, fields, or parameters."
      ]
    },
    {
      "id": "java-68-reflection",
      "moduleId": "java-m5",
      "moduleNumber": 5,
      "moduleTitle": "Advanced Java",
      "topicNumber": 68,
      "title": "The Reflection API: Inspecting Metadata & Accessing Private Members",
      "language": "java",
      "level": "Intermediate",
      "whyItMatters": "Java Reflection allows programs to inspect and modify classes, fields, methods, and constructors at runtime without compile-time knowledge. It powers all modern Java frameworks (Spring, Hibernate, Jackson, JUnit).",
      "explanation": "The Reflection API (`java.lang.reflect` and `java.lang.Class`) allows introspecting and manipulating the runtime structure of classes.\nCore Capabilities:\n1. Obtaining Class Metadata: `obj.getClass()`, `ClassName.class`, or `Class.forName(\"com.app.User\")`.\n2. Inspecting Members:\n   - Methods: `clazz.getMethods()` (public including inherited) vs `clazz.getDeclaredMethods()` (all declared in this class).\n   - Fields: `clazz.getFields()` vs `clazz.getDeclaredFields()`.\n   - Constructors: `clazz.getDeclaredConstructors()`.\n3. Breaking Encapsulation via `setAccessible(true)`:\n   - Accessing and modifying private fields or invoking private methods at runtime.\n   - Note: In modern Java (Java 9+ Modules / Java 17+ strong encapsulation), deep reflection across module boundaries is restricted unless `opens` is specified in `module-info.java`.\n4. Performance & Security Drawbacks:\n   - Reflection bypasses compile-time type safety.\n   - Reflection lookups are significantly slower than direct bytecode calls (though modern JIT optimizes repeated reflection calls via inflation).\n   - Can break security and immutability invariants.",
      "syntaxAndStructure": "// Obtain class token:\nClass<?> clazz = Class.forName(\"com.ak67.model.User\");\n\n// Create instance:\nObject instance = clazz.getDeclaredConstructor().newInstance();\n\n// Access private field:\nField field = clazz.getDeclaredField(\"secretKey\");\nfield.setAccessible(true); // Bypass private access\nfield.set(instance, \"HACKED\");",
      "codeExamples": [
        {
          "title": "Inspecting and Accessing Private Fields via Reflection",
          "code": "import java.lang.reflect.Field;\n\nclass SecretVault {\n    private String passcode = \"SUPER_SECRET_123\";\n    private int securityLevel = 5;\n}\n\npublic class ReflectionAccessDemo {\n    public static void main(String[] args) throws Exception {\n        SecretVault vault = new SecretVault();\n        Class<?> clazz = vault.getClass();\n\n        // 1. Inspect private field\n        Field field = clazz.getDeclaredField(\"passcode\");\n\n        // 2. Suppress Java access checks (bypassing private)\n        field.setAccessible(true);\n\n        // 3. Read private value\n        String secret = (String) field.get(vault);\n        System.out.println(\"Extracted private passcode: \" + secret);\n\n        // 4. Mutate private value\n        field.set(vault, \"NEW_SECRET_999\");\n        System.out.println(\"Mutated private passcode: \" + field.get(vault));\n    }\n}",
          "expectedOutput": "Extracted private passcode: SUPER_SECRET_123\nMutated private passcode: NEW_SECRET_999",
          "explanation": "Using getDeclaredField() and setAccessible(true) allows reflection to bypass private access modifiers and inspect/modify internal state."
        },
        {
          "title": "Dynamically Invoking Methods by Name",
          "code": "import java.lang.reflect.Method;\n\nclass MathOperations {\n    public int multiply(int a, int b) { return a * b; }\n}\n\npublic class ReflectionMethodInvokeDemo {\n    public static void main(String[] args) throws Exception {\n        Class<?> clazz = MathOperations.class;\n        Object instance = clazz.getDeclaredConstructor().newInstance();\n\n        // Find method by name and parameter types\n        Method method = clazz.getDeclaredMethod(\"multiply\", int.class, int.class);\n\n        // Dynamically invoke method\n        Object result = method.invoke(instance, 6, 7);\n        System.out.println(\"Invoked multiply(6, 7): \" + result);\n    }\n}",
          "expectedOutput": "Invoked multiply(6, 7): 42",
          "explanation": "method.invoke(instance, args...) dynamically executes a method identified at runtime."
        }
      ],
      "realWorldApplications": [
        "Dependency injection in Spring Boot (instantiating beans and injecting fields annotated with `@Autowired`).",
        "JSON serializers like Jackson converting JSON strings into POJOs by inspecting getters and setters dynamically."
      ],
      "commonMistakes": [
        "Using `getFields()` instead of `getDeclaredFields()`; `getFields()` returns only `public` fields (including inherited), missing private fields.",
        "Relying heavily on reflection for standard application logic, introducing severe performance degradation and losing compiler type checking.",
        "Relying heavily on reflection in performance-critical code paths, bypassing JIT inlining and access checks."
      ],
      "interviewRelevance": "Universal interview question: \"What is Reflection and where is it used?\", \"Difference between getMethods() and getDeclaredMethods()\", and \"What are the drawbacks of reflection?\"",
      "checkpoints": [
        {
          "id": "java-68-cp-1",
          "label": "Distinguish getMethods() (public only) from getDeclaredMethods() (all methods declared in class)"
        },
        {
          "id": "java-68-cp-2",
          "label": "Use setAccessible(true) to inspect private fields and explain performance tradeoffs"
        },
        {
          "id": "java-68-reflection-cp-3",
          "label": "Inspect class metadata, invoke methods dynamically, and handle reflective exceptions safely."
        }
      ],
      "practiceExercises": [
        {
          "id": "java-68-ex-1",
          "title": "Generic Object Property Printer",
          "difficulty": "Beginner",
          "type": "coding",
          "prompt": "Write a utility method printObjectProperties(Object obj) that prints all declared field names and values using reflection.",
          "solution": "import java.lang.reflect.Field;\n\npublic class PropertyPrinter {\n    public static void print(Object obj) throws Exception {\n        for (Field f : obj.getClass().getDeclaredFields()) {\n            f.setAccessible(true);\n            System.out.println(f.getName() + \" = \" + f.get(obj));\n        }\n    }\n    public static void main(String[] args) throws Exception {\n        print(new Object() { String name = \"Alice\"; int age = 22; });\n    }\n}",
          "explanation": "Iterating over getDeclaredFields() inspects all declared state dynamically."
        },
        {
          "id": "java-68-ex-2",
          "title": "Break Singleton Pattern via Reflection",
          "difficulty": "Intermediate",
          "type": "coding",
          "prompt": "Demonstrate how reflection can break a standard private-constructor Singleton class, and how to defend against it.",
          "solution": "import java.lang.reflect.Constructor;\n\nclass DefendedSingleton {\n    private static DefendedSingleton instance;\n    private DefendedSingleton() {\n        if (instance != null) {\n            throw new RuntimeException(\"Reflection attack blocked: Singleton already initialized!\");\n        }\n    }\n    public static DefendedSingleton getInstance() {\n        if (instance == null) instance = new DefendedSingleton();\n        return instance;\n    }\n}\n\npublic class BreakSingletonDemo {\n    public static void main(String[] args) {\n        DefendedSingleton.getInstance();\n        try {\n            Constructor<DefendedSingleton> c = DefendedSingleton.class.getDeclaredConstructor();\n            c.setAccessible(true);\n            c.newInstance(); // Triggers defense!\n        } catch (Exception e) {\n            System.out.println(\"Caught defense: \" + e.getCause().getMessage());\n        }\n    }\n}",
          "explanation": "Checking if instance != null inside the constructor blocks reflection from instantiating duplicate instances."
        },
        {
          "id": "java-68-ex-3",
          "title": "Java 9+ Modules Strong Encapsulation Barrier",
          "difficulty": "Advanced",
          "type": "conceptual",
          "prompt": "How did Java 9+ Modules (Project Jigsaw) and Java 17 restrict setAccessible(true) deep reflection across modules?",
          "solution": "In Java 17+, the JVM strongly encapsulates all internal JDK packages by default. Calling `setAccessible(true)` on non-public members of other modules throws `InaccessibleObjectException`. An external module can only perform deep reflection on a package if that package is explicitly opened using `opens <package>` or `opens <package> to <module>` in its `module-info.java`, or enabled globally via `--add-opens` JVM command line flags.",
          "explanation": "Strong encapsulation in Java 17 protects module internals from unauthorized reflection hacking."
        }
      ],
      "quizQuestions": [
        {
          "id": "java-68-q1",
          "question": "What is the difference between `clazz.getFields()` and `clazz.getDeclaredFields()` in Java Reflection?",
          "options": [
            "getFields() returns private fields; getDeclaredFields() returns public fields",
            "getFields() returns all public fields (including inherited); getDeclaredFields() returns all fields declared by the class regardless of access level",
            "They are identical",
            "getDeclaredFields() is deprecated in Java 17"
          ],
          "correctOptionIndex": 1,
          "explanation": "`getFields()` returns only public fields (including inherited ones), while `getDeclaredFields()` returns all fields (private, protected, default, public) declared directly in the class."
        },
        {
          "id": "java-68-q2",
          "question": "What method on `AccessibleObject` is used to suppress Java language access control checks (allowing access to private members)?",
          "options": [
            "makePublic()",
            "setAccessible(true)",
            "unlock()",
            "bypassSecurity()"
          ],
          "correctOptionIndex": 1,
          "explanation": "`setAccessible(true)` suppresses language access checks for fields, methods, and constructors."
        }
      ],
      "revisionNotes": [
        "Reflection inspects and manipulates classes, fields, and methods dynamically at runtime.",
        "`getDeclaredX()` accesses private members; `getX()` returns only public members.",
        "Reflection is slower than direct bytecode execution and bypasses compile-time type safety."
      ]
    },
    {
      "id": "java-69-multithreading-fundamentals",
      "moduleId": "java-m5",
      "moduleNumber": 5,
      "moduleTitle": "Advanced Java",
      "topicNumber": 69,
      "title": "Multithreading Fundamentals: Thread vs Runnable & Starting Threads",
      "language": "java",
      "level": "Intermediate",
      "whyItMatters": "Modern systems run on multi-core processors. Multithreading allows concurrent execution of independent tasks, improving CPU utilization and throughput. Knowing `Thread` vs `Runnable` is the first step in concurrency.",
      "explanation": "A thread is the smallest unit of execution within a process. Multiple threads within the same JVM process share the same Heap memory, but each thread has its own private Call Stack, Program Counter (PC), and local variables.\nTwo Primary Ways to Create a Thread:\n1. Extending `java.lang.Thread`:\n   - Subclass extends `Thread` and overrides `run()`.\n   - Disadvantage: Java only supports single class inheritance; extending `Thread` prevents extending any other class.\n2. Implementing `java.lang.Runnable` (Recommended Best Practice):\n   - Implement the `Runnable` functional interface (`void run()`).\n   - Separates the task to be executed from the thread execution mechanism.\n   - Supports multiple inheritance and clean integration with Thread Pools and Lambdas (`() -> doWork()`).\nStarting a Thread:\n- Always call `thread.start()`, NEVER `thread.run()`! Calling `start()` requests the OS scheduler to allocate a new call stack and spawn an OS-level thread. Calling `run()` directly merely executes the method synchronously on the current thread stack like a normal method call!",
      "syntaxAndStructure": "// 1. Implementing Runnable with Lambda (Best Practice):\nRunnable task = () -> System.out.println(\"Running on thread: \" + Thread.currentThread().getName());\nThread t1 = new Thread(task, \"Worker-1\");\nt1.start(); // Spawns new thread!\n\n// Daemon Thread (background service that doesn't prevent JVM exit):\nt1.setDaemon(true);",
      "codeExamples": [
        {
          "title": "Starting a Thread: start() vs run() Demonstration",
          "code": "public class ThreadStartDemo {\n    public static void main(String[] args) {\n        Runnable task = () -> {\n            System.out.println(\"Task executing on thread: \" + Thread.currentThread().getName());\n        };\n\n        Thread t1 = new Thread(task, \"DedicatedWorkerThread\");\n\n        // 1. Calling run() directly: DOES NOT SPAWN THREAD (Runs on main thread!)\n        System.out.print(\"Direct run() call -> \");\n        t1.run();\n\n        // 2. Calling start(): Spawns genuine OS thread\n        System.out.print(\"Calling start()  -> \");\n        t1.start();\n    }\n}",
          "expectedOutput": "Direct run() call -> Task executing on thread: main\nCalling start()  -> Task executing on thread: DedicatedWorkerThread",
          "explanation": "Calling run() directly executes synchronously on the current main thread. Calling start() causes the JVM to invoke the native OS thread creation routine."
        },
        {
          "title": "Daemon Threads vs User Threads Lifecycle",
          "code": "public class DaemonThreadDemo {\n    public static void main(String[] args) throws InterruptedException {\n        Thread daemonThread = new Thread(() -> {\n            while (true) {\n                // Background housekeeping loop\n            }\n        });\n        \n        // Mark as Daemon: JVM exits when all non-daemon user threads finish\n        daemonThread.setDaemon(true);\n        daemonThread.start();\n\n        System.out.println(\"Daemon thread running in background: \" + daemonThread.isDaemon());\n        System.out.println(\"Main user thread terminating. JVM will exit cleanly.\");\n    }\n}",
          "expectedOutput": "Daemon thread running in background: true\nMain user thread terminating. JVM will exit cleanly.",
          "explanation": "The JVM terminates immediately when all user threads complete, terminating any remaining daemon threads (e.g. Garbage Collector threads) automatically."
        }
      ],
      "realWorldApplications": [
        "Asynchronous task processing (sending emails, exporting reports, logging metrics).",
        "Web server thread pools (Tomcat, Netty) handling concurrent HTTP requests."
      ],
      "commonMistakes": [
        "Calling `thread.run()` instead of `thread.start()`, executing code synchronously without concurrency.",
        "Starting an already started thread twice (`thread.start(); thread.start();`), which throws `IllegalThreadStateException`.",
        "Calling run() directly instead of start() on a Thread, executing the task on the current calling thread instead of a new thread."
      ],
      "interviewRelevance": "Universal interview question: \"Difference between `Thread` and `Runnable`?\", \"What happens if you call `run()` instead of `start()`?\", and \"What is a Daemon Thread?\"",
      "checkpoints": [
        {
          "id": "java-69-cp-1",
          "label": "Explain why implementing Runnable is preferred over extending Thread"
        },
        {
          "id": "java-69-cp-2",
          "label": "Differentiate thread.start() (spawns stack) vs thread.run() (synchronous call)"
        },
        {
          "id": "java-69-multithreading-fundamentals-cp-3",
          "label": "Implement concurrent tasks using Runnable, Callable, and the Thread class."
        }
      ],
      "practiceExercises": [
        {
          "id": "java-69-ex-1",
          "title": "Print Numbers Concurrently from Two Threads",
          "difficulty": "Beginner",
          "type": "coding",
          "prompt": "Spawn two threads (Thread-A and Thread-B) that print numbers 1 to 5 with their thread names.",
          "solution": "public class ConcurrentPrint {\n    public static void main(String[] args) throws InterruptedException {\n        Runnable task = () -> {\n            for (int i = 1; i <= 3; i++) {\n                System.out.println(Thread.currentThread().getName() + \": \" + i);\n            }\n        };\n        Thread t1 = new Thread(task, \"Thread-A\");\n        Thread t2 = new Thread(task, \"Thread-B\");\n        t1.start();\n        t2.start();\n        t1.join();\n        t2.join();\n        System.out.println(\"Both threads completed.\");\n    }\n}",
          "explanation": "Thread.join() blocks the main thread until the target threads finish execution."
        },
        {
          "id": "java-69-ex-2",
          "title": "Thread Interruption Handling",
          "difficulty": "Intermediate",
          "type": "coding",
          "prompt": "Demonstrate how a long-running thread checks Thread.currentThread().isInterrupted() and handles InterruptedException cleanly.",
          "solution": "public class InterruptDemo {\n    public static void main(String[] args) throws InterruptedException {\n        Thread worker = new Thread(() -> {\n            while (!Thread.currentThread().isInterrupted()) {\n                try {\n                    Thread.sleep(100);\n                } catch (InterruptedException e) {\n                    System.out.println(\"Worker caught InterruptedException: exiting cleanly.\");\n                    break;\n                }\n            }\n        });\n        worker.start();\n        Thread.sleep(200);\n        worker.interrupt(); // Signal interruption\n    }\n}",
          "explanation": "Thread interruption is a cooperative cancellation signal; blocking methods throw InterruptedException when signaled."
        },
        {
          "id": "java-69-ex-3",
          "title": "Virtual Threads (Java 21 Project Loom)",
          "difficulty": "Advanced",
          "type": "coding",
          "prompt": "Demonstrate Java 21 Virtual Threads (Thread.ofVirtual().start()) and explain why 1,000,000 virtual threads can run without OOM.",
          "solution": "public class VirtualThreadDemo {\n    public static void main(String[] args) throws InterruptedException {\n        // Java 21 Virtual Thread\n        Thread vThread = Thread.ofVirtual().name(\"VThread-1\").start(() -> {\n            System.out.println(\"Running on virtual thread: \" + Thread.currentThread());\n        });\n        vThread.join();\n    }\n}",
          "explanation": "Virtual threads (Java 21) are lightweight user-mode threads managed by the JVM rather than the OS kernel. They consume only bytes of heap memory rather than megabytes of stack."
        }
      ],
      "quizQuestions": [
        {
          "id": "java-69-q1",
          "question": "What occurs if you call `t.start()` on a Thread that has already finished executing?",
          "options": [
            "It re-executes the thread from the beginning",
            "It throws java.lang.IllegalThreadStateException",
            "It does nothing",
            "It resets the thread call stack"
          ],
          "correctOptionIndex": 1,
          "explanation": "A thread cannot be restarted once started. Calling start() again throws `IllegalThreadStateException`."
        },
        {
          "id": "java-69-q2",
          "question": "What is the characteristic of a Daemon Thread in Java?",
          "options": [
            "It has higher priority than user threads",
            "The JVM terminates immediately when all non-daemon user threads complete, killing any remaining daemon threads",
            "It cannot be interrupted",
            "It runs in C++ space"
          ],
          "correctOptionIndex": 1,
          "explanation": "Daemon threads run in the background (e.g. GC) and do not keep the JVM alive when all user threads finish."
        }
      ],
      "revisionNotes": [
        "Prefer `Runnable` over `Thread` for clean decoupling and lambda integration.",
        "`thread.start()` spawns a new OS thread; `thread.run()` executes synchronously on the current thread.",
        "Daemon threads do not prevent JVM shutdown."
      ]
    },
    {
      "id": "java-70-thread-lifecycle-synchronization",
      "moduleId": "java-m5",
      "moduleNumber": 5,
      "moduleTitle": "Advanced Java",
      "topicNumber": 70,
      "title": "Thread Lifecycle, Synchronized Blocks & Monitor Locks",
      "language": "java",
      "level": "Intermediate",
      "whyItMatters": "When multiple threads mutate shared state concurrently, race conditions and memory corruption occur. Understanding the 6 thread lifecycle states, Java intrinsic monitor locks, and synchronized blocks is fundamental to concurrent programming.",
      "explanation": "1. Thread Lifecycle States (`java.lang.Thread.State`):\n   - `NEW`: Created but not yet started (`new Thread()`).\n   - `RUNNABLE`: Executing in JVM (or ready to run, scheduled by OS).\n   - `BLOCKED`: Waiting to acquire a monitor lock to enter/re-enter a synchronized block.\n   - `WAITING`: Waiting indefinitely for another thread (via `wait()`, `join()`, or `LockSupport.park()`).\n   - `TIMED_WAITING`: Waiting for a specified time (`sleep(ms)`, `wait(ms)`, `join(ms)`).\n   - `TERMINATED`: Method `run()` has completed.\n2. Synchronization & Intrinsic Locks (Monitors):\n   - Every object in Java has an associated intrinsic monitor lock (mutex).\n   - `synchronized` method: Acquires the monitor lock on `this` (or `ClassName.class` for static methods).\n   - `synchronized(lockObj)` block: Acquires the lock on `lockObj` for the duration of the critical section.\n   - Reentrancy: Java monitor locks are reentrant. A thread holding a lock can enter other synchronized blocks requiring the same lock without deadlocking itself.\n3. Inter-Thread Communication: `wait()`, `notify()`, and `notifyAll()` MUST be called inside a synchronized block on the lock object.",
      "syntaxAndStructure": "// Synchronized block on specific lock object (Best Practice):\nprivate final Object lock = new Object();\npublic void increment() {\n    synchronized(lock) {\n        count++; // Critical section protected by monitor lock\n    }\n}\n\n// Inter-thread signaling:\nsynchronized(lock) {\n    while (!condition) lock.wait(); // Release lock and wait\n    lock.notifyAll(); // Wake waiting threads\n}",
      "codeExamples": [
        {
          "title": "Preventing Race Conditions with Synchronized Block",
          "code": "public class SynchronizationDemo {\n    static class Counter {\n        private int count = 0;\n        private final Object lock = new Object();\n\n        public void increment() {\n            // Synchronized block ensures mutual exclusion (critical section)\n            synchronized (lock) {\n                count++;\n            }\n        }\n\n        public int getCount() { return count; }\n    }\n\n    public static void main(String[] args) throws InterruptedException {\n        Counter counter = new Counter();\n\n        // 2 threads incrementing 1,000 times each concurrently\n        Thread t1 = new Thread(() -> { for (int i = 0; i < 1000; i++) counter.increment(); });\n        Thread t2 = new Thread(() -> { for (int i = 0; i < 1000; i++) counter.increment(); });\n\n        t1.start();\n        t2.start();\n        t1.join();\n        t2.join();\n\n        // Without synchronization, result is often < 2000 due to lost updates\n        System.out.println(\"Final Counter value (exactly 2000): \" + counter.getCount());\n    }\n}",
          "expectedOutput": "Final Counter value (exactly 2000): 2000",
          "explanation": "The synchronized(lock) block guarantees atomicity and visibility, preventing race conditions and lost updates across concurrent threads."
        },
        {
          "title": "Classic Producer-Consumer with wait() and notify()",
          "code": "public class ProducerConsumerDemo {\n    static class Buffer {\n        private int data;\n        private boolean hasData = false;\n\n        public synchronized void produce(int val) throws InterruptedException {\n            while (hasData) {\n                wait(); // Release monitor lock and sleep until consumed\n            }\n            this.data = val;\n            this.hasData = true;\n            System.out.println(\"Produced: \" + val);\n            notify(); // Signal consumer thread\n        }\n\n        public synchronized int consume() throws InterruptedException {\n            while (!hasData) {\n                wait(); // Release monitor lock and sleep until produced\n            }\n            this.hasData = false;\n            System.out.println(\"Consumed: \" + data);\n            notify(); // Signal producer thread\n            return data;\n        }\n    }\n\n    public static void main(String[] args) throws Exception {\n        Buffer buffer = new Buffer();\n        Thread producer = new Thread(() -> {\n            try { buffer.produce(42); } catch (Exception e) {}\n        });\n        Thread consumer = new Thread(() -> {\n            try { buffer.consume(); } catch (Exception e) {}\n        });\n\n        consumer.start();\n        Thread.sleep(50);\n        producer.start();\n        producer.join();\n        consumer.join();\n    }\n}",
          "expectedOutput": "Produced: 42\nConsumed: 42",
          "explanation": "wait() and notify() coordinate threads over shared monitor locks. wait() is always enclosed in a while loop to guard against spurious wakeups."
        }
      ],
      "realWorldApplications": [
        "Coordinating thread pools and shared bounded buffers.",
        "Protecting critical financial balance updates in banking transactions."
      ],
      "commonMistakes": [
        "Synchronizing on `new Object()` inside the method: `synchronized(new Object())` creates a new lock every call, providing ZERO mutual exclusion!",
        "Calling `wait()` outside of a `while` loop; threads can experience \"spurious wakeups\", resuming execution even if the condition is still false.",
        "Synchronizing on different lock objects across threads that intend to protect the same shared resource."
      ],
      "interviewRelevance": "Universal interview question: \"What are the 6 Thread states?\", \"Why must wait() and notify() be called inside a synchronized block?\", and \"Why must wait() be in a while loop?\"",
      "checkpoints": [
        {
          "id": "java-70-cp-1",
          "label": "Memorize the 6 thread states: NEW, RUNNABLE, BLOCKED, WAITING, TIMED_WAITING, TERMINATED"
        },
        {
          "id": "java-70-cp-2",
          "label": "Explain intrinsic monitor locks, reentrancy, and spurious wakeups in wait/notify"
        },
        {
          "id": "java-70-thread-lifecycle-synchronization-cp-3",
          "label": "Coordinate thread execution using synchronized blocks and wait/notify monitors."
        }
      ],
      "practiceExercises": [
        {
          "id": "java-70-ex-1",
          "title": "Inspect Thread States Programmatically",
          "difficulty": "Beginner",
          "type": "coding",
          "prompt": "Write a program that inspects a thread in state NEW, TIMED_WAITING (sleep), and TERMINATED.",
          "solution": "public class ThreadStateInspect {\n    public static void main(String[] args) throws Exception {\n        Thread t = new Thread(() -> {\n            try { Thread.sleep(200); } catch (Exception e) {}\n        });\n        System.out.println(\"State 1: \" + t.getState()); // NEW\n        t.start();\n        Thread.sleep(50);\n        System.out.println(\"State 2: \" + t.getState()); // TIMED_WAITING\n        t.join();\n        System.out.println(\"State 3: \" + t.getState()); // TERMINATED\n    }\n}",
          "explanation": "t.getState() reflects the lifecycle transitions of the thread."
        },
        {
          "id": "java-70-ex-2",
          "title": "Why IllegalMonitorStateException Occurs",
          "difficulty": "Intermediate",
          "type": "coding",
          "prompt": "Demonstrate why calling lock.wait() without holding the lock on lock throws IllegalMonitorStateException.",
          "solution": "public class IllegalMonitorDemo {\n    public static void main(String[] args) {\n        Object lock = new Object();\n        try {\n            lock.wait(); // DANGER: Not inside synchronized(lock)!\n        } catch (IllegalMonitorStateException e) {\n            System.out.println(\"Caught expected: current thread is not owner of monitor lock!\");\n        } catch (InterruptedException e) {}\n    }\n}",
          "explanation": "wait() requires holding the intrinsic monitor lock of that specific object; otherwise it throws IllegalMonitorStateException."
        },
        {
          "id": "java-70-ex-3",
          "title": "Deadlock Simulation and Prevention",
          "difficulty": "Advanced",
          "type": "coding",
          "prompt": "Write a scenario where Thread 1 acquires LockA then LockB, and Thread 2 acquires LockB then LockA causing deadlock, and explain how to prevent it.",
          "solution": "public class DeadlockExplanation {\n    // Deadlock occurs when threads acquire locks in opposing order:\n    // Thread 1: LockA -> LockB\n    // Thread 2: LockB -> LockA\n    // Prevention: Always acquire locks in a globally consistent order (Lock Acquisition Ordering):\n    // Both Thread 1 and Thread 2 must acquire LockA first, then LockB.\n    public static void main(String[] args) {\n        System.out.println(\"Deadlock prevented by enforcing global lock acquisition ordering.\");\n    }\n}",
          "explanation": "Deadlock is broken by enforcing strict hierarchical lock acquisition ordering across all threads."
        }
      ],
      "quizQuestions": [
        {
          "id": "java-70-q1",
          "question": "Why should `wait()` always be invoked inside a `while (condition)` loop rather than an `if (condition)` statement?",
          "options": [
            "Because wait() throws a compile error inside if",
            "To protect against \"spurious wakeups\" where the thread wakes up without being signaled",
            "Because while loops execute on CPU cache",
            "Because if statements cannot be synchronized"
          ],
          "correctOptionIndex": 1,
          "explanation": "Threads can wake up from wait() spuriously without notify() being called. A while loop re-checks the condition before proceeding."
        },
        {
          "id": "java-70-q2",
          "question": "What exception is thrown if a thread calls `obj.wait()` or `obj.notify()` without holding the monitor lock on `obj`?",
          "options": [
            "NullPointerException",
            "IllegalMonitorStateException",
            "InterruptedException",
            "IllegalThreadStateException"
          ],
          "correctOptionIndex": 1,
          "explanation": "`java.lang.IllegalMonitorStateException` is thrown if the current thread does not own the object's monitor lock."
        }
      ],
      "revisionNotes": [
        "6 Thread States: NEW, RUNNABLE, BLOCKED, WAITING, TIMED_WAITING, TERMINATED.",
        "Synchronized blocks acquire the object’s intrinsic monitor lock.",
        "Always call `wait()` inside a `while (!condition)` loop to defend against spurious wakeups."
      ]
    },
    {
      "id": "java-71-locks-concurrent-collections",
      "moduleId": "java-m5",
      "moduleNumber": 5,
      "moduleTitle": "Advanced Java",
      "topicNumber": 71,
      "title": "Explicit Locks, ReentrantLock, Atomics & Concurrent Collections",
      "language": "java",
      "level": "Intermediate",
      "whyItMatters": "While `synchronized` is simple, `java.util.concurrent` (JUC) provides explicit locks with timeout attempts (`tryLock`), fair queuing, lock-free atomic variables, and high-throughput concurrent collections like `ConcurrentHashMap`.",
      "explanation": "Java 5 introduced `java.util.concurrent` (JUC):\n1. `ReentrantLock` vs `synchronized`:\n   - `tryLock(timeout)`: Can attempt to acquire a lock and give up if unavailable, preventing indefinite deadlocks.\n   - Fairness: Can specify `new ReentrantLock(true)` to grant locks in FIFO order to longest-waiting threads.\n   - Interruptible lock acquisition: `lockInterruptibly()`.\n   - Must always unlock in a `finally` block: `lock.lock(); try { ... } finally { lock.unlock(); }`.\n2. `ReentrantReadWriteLock`:\n   - Multiple concurrent readers (read-lock shared).\n   - Exactly one writer (write-lock exclusive). Drastically improves read-heavy performance.\n3. Atomic Variables (`AtomicInteger`, `AtomicLong`, `AtomicReference`):\n   - Lock-free thread-safety using hardware-level Compare-And-Swap (CAS) instructions.\n   - Fast, non-blocking counter increments (`incrementAndGet()`).\n4. Concurrent Collections:\n   - `ConcurrentHashMap`: Segmented/synchronized buckets (Java 8+ uses CAS + synchronized per bucket node). Multiple threads can read and write concurrently without locking the entire map.\n   - `CopyOnWriteArrayList`: Writes clone the backing array; reads are lock-free.",
      "syntaxAndStructure": "// ReentrantLock pattern:\nLock lock = new ReentrantLock();\nlock.lock();\ntry {\n    // Critical section\n} finally {\n    lock.unlock(); // Mandatory cleanup\n}\n\n// Lock-free AtomicInteger:\nAtomicInteger counter = new AtomicInteger(0);\ncounter.incrementAndGet(); // Atomic CAS",
      "codeExamples": [
        {
          "title": "ReentrantLock with tryLock Timeout to Avoid Deadlocks",
          "code": "import java.util.concurrent.TimeUnit;\nimport java.util.concurrent.locks.Lock;\nimport java.util.concurrent.locks.ReentrantLock;\n\npublic class ReentrantLockDemo {\n    private final Lock lock = new ReentrantLock();\n\n    public void performTask() {\n        try {\n            // Attempt to acquire lock within 100 milliseconds\n            if (lock.tryLock(100, TimeUnit.MILLISECONDS)) {\n                try {\n                    System.out.println(Thread.currentThread().getName() + \" acquired lock successfully.\");\n                    Thread.sleep(50);\n                } finally {\n                    lock.unlock(); // Always release lock in finally!\n                }\n            } else {\n                System.out.println(Thread.currentThread().getName() + \" timed out waiting for lock.\");\n            }\n        } catch (InterruptedException e) {\n            Thread.currentThread().interrupt();\n        }\n    }\n\n    public static void main(String[] args) throws InterruptedException {\n        ReentrantLockDemo demo = new ReentrantLockDemo();\n        Thread t1 = new Thread(demo::performTask, \"Worker-1\");\n        Thread t2 = new Thread(demo::performTask, \"Worker-2\");\n\n        t1.start();\n        t2.start();\n        t1.join();\n        t2.join();\n    }\n}",
          "expectedOutput": "Worker-1 acquired lock successfully.\nWorker-2 acquired lock successfully.",
          "explanation": "tryLock(timeout) attempts lock acquisition without blocking indefinitely, allowing threads to back off gracefully if congested."
        },
        {
          "title": "Lock-Free Counter with AtomicInteger (CAS)",
          "code": "import java.util.concurrent.atomic.AtomicInteger;\n\npublic class AtomicCounterDemo {\n    public static void main(String[] args) throws InterruptedException {\n        AtomicInteger atomicCounter = new AtomicInteger(0);\n\n        Thread t1 = new Thread(() -> {\n            for (int i = 0; i < 500; i++) atomicCounter.incrementAndGet();\n        });\n        Thread t2 = new Thread(() -> {\n            for (int i = 0; i < 500; i++) atomicCounter.incrementAndGet();\n        });\n\n        t1.start();\n        t2.start();\n        t1.join();\n        t2.join();\n\n        System.out.println(\"Final Atomic Count (Lock-free CAS): \" + atomicCounter.get());\n    }\n}",
          "expectedOutput": "Final Atomic Count (Lock-free CAS): 1000",
          "explanation": "AtomicInteger uses hardware Compare-And-Swap (CAS) CPU instructions, achieving thread-safe increments without thread locking overhead."
        }
      ],
      "realWorldApplications": [
        "High-throughput web servers using `ConcurrentHashMap` for session token storage.",
        "Lock-free performance metrics and request throughput rate counters."
      ],
      "commonMistakes": [
        "Forgetting to call `lock.unlock()` inside a `finally` block; if an exception occurs in the try block, the lock is never released, causing a permanent system hang!",
        "Using `Collections.synchronizedMap()` instead of `ConcurrentHashMap`; synchronizedMap locks the entire map on every read and write, creating a severe bottleneck.",
        "Calling lock.lock() without placing lock.unlock() in a finally block, causing permanent deadlocks if an exception occurs."
      ],
      "interviewRelevance": "Universal interview question: \"ReentrantLock vs synchronized?\", \"How does ConcurrentHashMap work in Java 8?\", and \"What is Compare-And-Swap (CAS)?\"",
      "checkpoints": [
        {
          "id": "java-71-cp-1",
          "label": "Use ReentrantLock with mandatory try-finally unlock pattern"
        },
        {
          "id": "java-71-cp-2",
          "label": "Explain how ConcurrentHashMap achieves high concurrency without locking the entire map"
        },
        {
          "id": "java-71-locks-concurrent-collections-cp-3",
          "label": "Utilize ReentrantLock, ReadWriteLock, and ConcurrentHashMap for high concurrency."
        }
      ],
      "practiceExercises": [
        {
          "id": "java-71-ex-1",
          "title": "ReentrantReadWriteLock Cache",
          "difficulty": "Beginner",
          "type": "coding",
          "prompt": "Implement a read-heavy key-value store using ReentrantReadWriteLock allowing concurrent reads and exclusive writes.",
          "solution": "import java.util.*;\nimport java.util.concurrent.locks.*;\n\npublic class ReadWriteCache<K, V> {\n    private final Map<K, V> map = new HashMap<>();\n    private final ReentrantReadWriteLock rwl = new ReentrantReadWriteLock();\n\n    public V get(K key) {\n        rwl.readLock().lock();\n        try { return map.get(key); }\n        finally { rwl.readLock().unlock(); }\n    }\n\n    public void put(K key, V val) {\n        rwl.writeLock().lock();\n        try { map.put(key, val); }\n        finally { rwl.writeLock().unlock(); }\n    }\n    public static void main(String[] args) {\n        ReadWriteCache<String, String> cache = new ReadWriteCache<>();\n        cache.put(\"K1\", \"V1\");\n        System.out.println(\"Read: \" + cache.get(\"K1\"));\n    }\n}",
          "explanation": "ReadLock allows multiple concurrent readers; WriteLock grants exclusive single-thread access."
        },
        {
          "id": "java-71-ex-2",
          "title": "AtomicReference CompareAndSet Simulation",
          "difficulty": "Intermediate",
          "type": "coding",
          "prompt": "Use AtomicReference to update an object reference only if it matches an expected current value.",
          "solution": "import java.util.concurrent.atomic.AtomicReference;\n\npublic class AtomicRefDemo {\n    public static void main(String[] args) {\n        AtomicReference<String> state = new AtomicReference<>(\"INIT\");\n        boolean updated = state.compareAndSet(\"INIT\", \"RUNNING\");\n        System.out.println(\"Updated successfully: \" + updated);\n        System.out.println(\"Current state: \" + state.get());\n    }\n}",
          "explanation": "compareAndSet(expect, update) atomically verifies and swaps the reference in a single instruction."
        },
        {
          "id": "java-71-ex-3",
          "title": "ConcurrentHashMap Java 8 Internals (CAS + synchronized)",
          "difficulty": "Advanced",
          "type": "conceptual",
          "prompt": "How did Java 8 redesign ConcurrentHashMap to eliminate the legacy Segment array from Java 7?",
          "solution": "In Java 7, ConcurrentHashMap divided the table into 16 `Segment` locks (Segment-level locking). In Java 8, Segments were eliminated. Java 8 uses a plain `Node<K, V>[]` table. When inserting a new key into an empty bucket, it uses lock-free Compare-And-Swap (`CAS`). If the bucket already has nodes (collision), it locks ONLY the head node of that specific bucket using `synchronized(node)`. This shrinks lock contention to individual bucket nodes rather than entire table segments.",
          "explanation": "Java 8 ConcurrentHashMap uses CAS for empty buckets and locks only single bucket heads on collision."
        }
      ],
      "quizQuestions": [
        {
          "id": "java-71-q1",
          "question": "Where must `lock.unlock()` always be called when using explicit Locks in Java?",
          "options": [
            "At the beginning of the method",
            "Inside a `finally` block to guarantee release even if exceptions occur",
            "Inside the catch block only",
            "Only after the thread finishes"
          ],
          "correctOptionIndex": 1,
          "explanation": "Explicit locks must always be released in a `finally` block to prevent permanent deadlocks on exceptions."
        },
        {
          "id": "java-71-q2",
          "question": "What hardware-level CPU mechanism is utilized by AtomicInteger and AtomicLong to achieve lock-free thread safety?",
          "options": [
            "OS Mutex locks",
            "Compare-And-Swap (CAS) instructions",
            "Java monitor locks",
            "Thread.sleep polling"
          ],
          "correctOptionIndex": 1,
          "explanation": "Atomic classes use native Compare-And-Swap (CAS) instructions (via Unsafe / VarHandle) for atomic updates."
        }
      ],
      "revisionNotes": [
        "`ReentrantLock` supports tryLock(timeout), fairness, and interruptible locks.",
        "Always release explicit locks inside `finally` blocks.",
        "`ConcurrentHashMap` locks only individual bucket heads, achieving high concurrent throughput."
      ]
    },
    {
      "id": "java-72-executorservice-completablefuture",
      "moduleId": "java-m5",
      "moduleNumber": 5,
      "moduleTitle": "Advanced Java",
      "topicNumber": 72,
      "title": "ExecutorService, Thread Pools & CompletableFuture Async Pipelines",
      "language": "java",
      "level": "Intermediate",
      "whyItMatters": "In production, manually creating `new Thread()` is prohibited because thread allocation is expensive. The `ExecutorService` framework manages thread pools, while `CompletableFuture` (Java 8+) provides non-blocking, reactive asynchronous composition.",
      "explanation": "1. The Problem with `new Thread()`: Spawning a native OS thread costs ~1MB of memory and thousands of CPU cycles. Uncontrolled thread creation causes `OutOfMemoryError: unable to create new native thread`.\n2. `ExecutorService` & Thread Pools:\n   - Manages a pool of reusable worker threads.\n   - `Executors.newFixedThreadPool(n)`: Fixed number of threads with an unbounded queue.\n   - `Executors.newCachedThreadPool()`: Dynamically creates threads, reclaiming idle threads after 60s.\n   - `Callable<V>`: Like Runnable, but returns a value and can throw checked exceptions.\n   - `Future<V>`: Represents the pending result of an async computation (`future.get()` blocks until ready).\n3. `CompletableFuture<T>` (Asynchronous Reactive Pipelines):\n   - Non-blocking completion: Does NOT require blocking on `future.get()`.\n   - Chaining Stages: `thenApply()` (map result), `thenAccept()` (consume result), `thenCompose()` (flatMap async task).\n   - Combining: `CompletableFuture.allOf(f1, f2, f3)` waits for multiple async tasks concurrently.\n   - Exception Handling: `exceptionally(fn)` and `handle(fn)`.",
      "syntaxAndStructure": "// Thread Pool:\nExecutorService executor = Executors.newFixedThreadPool(4);\nFuture<String> future = executor.submit(() -> \"Result\");\nString res = future.get(); // Blocking\nexecutor.shutdown();\n\n// CompletableFuture (Non-blocking):\nCompletableFuture.supplyAsync(() -> fetchUserData())\n    .thenApply(user -> enrichProfile(user))\n    .thenAccept(profile -> display(profile))\n    .exceptionally(ex -> { log.error(ex); return null; });",
      "codeExamples": [
        {
          "title": "ExecutorService Thread Pool Task Submission and Shutdown",
          "code": "import java.util.concurrent.Callable;\nimport java.util.concurrent.ExecutorService;\nimport java.util.concurrent.Executors;\nimport java.util.concurrent.Future;\n\npublic class ExecutorServiceDemo {\n    public static void main(String[] args) throws Exception {\n        // Pool of 2 reusable worker threads\n        ExecutorService pool = Executors.newFixedThreadPool(2);\n\n        Callable<Integer> calculateTask = () -> {\n            Thread.sleep(50);\n            return 42 * 2;\n        };\n\n        Future<Integer> future = pool.submit(calculateTask);\n        System.out.println(\"Task submitted. Doing other work...\");\n\n        // future.get() retrieves the computed result\n        int result = future.get();\n        System.out.println(\"Result received from thread pool: \" + result);\n\n        // Always shutdown executor pools\n        pool.shutdown();\n        System.out.println(\"Pool shutdown complete: \" + pool.isShutdown());\n    }\n}",
          "expectedOutput": "Task submitted. Doing other work...\nResult received from thread pool: 84\nPool shutdown complete: true",
          "explanation": "ExecutorService decouples task submission from thread management. pool.shutdown() gracefully finishes executing submitted tasks."
        },
        {
          "title": "Asynchronous Reactive Pipeline with CompletableFuture",
          "code": "import java.util.concurrent.CompletableFuture;\n\npublic class CompletableFuturePipelineDemo {\n    public static void main(String[] args) {\n        System.out.println(\"Initiating async pipeline...\");\n\n        CompletableFuture<String> pipeline = CompletableFuture\n            .supplyAsync(() -> \"Candidate_101\") // Async task\n            .thenApply(id -> id + \": Placement Qualified\") // Transform\n            .thenApply(String::toUpperCase); // Transform\n\n        // Extract result\n        System.out.println(\"Pipeline output: \" + pipeline.join());\n    }\n}",
          "expectedOutput": "Initiating async pipeline...\nPipeline output: CANDIDATE_101: PLACEMENT QUALIFIED",
          "explanation": "CompletableFuture chains asynchronous computations declaratively using supplyAsync and thenApply without blocking intermediate threads."
        }
      ],
      "realWorldApplications": [
        "Fan-out and fan-in API aggregations (fetching user details, order history, and payment status concurrently with `CompletableFuture.allOf`).",
        "High-throughput web servers managing thread pools sized to available CPU cores."
      ],
      "commonMistakes": [
        "Forgetting to call `executor.shutdown()`; worker threads in the pool remain active, preventing the JVM process from exiting!",
        "Using `Executors.newFixedThreadPool(n)` with massive traffic; its internal queue is unbounded (`LinkedBlockingQueue`), which can cause `OutOfMemoryError` under sustained load.",
        "Forgetting to shut down an ExecutorService, keeping worker threads alive and preventing JVM termination."
      ],
      "interviewRelevance": "Universal interview question: \"Callable vs Runnable\", \"Future vs CompletableFuture\", \"How to size a thread pool for CPU-bound vs I/O-bound tasks?\", and \"How does CompletableFuture handle exceptions?\"",
      "checkpoints": [
        {
          "id": "java-72-cp-1",
          "label": "Explain differences between Runnable (void, no throws) and Callable (returns T, throws Exception)"
        },
        {
          "id": "java-72-cp-2",
          "label": "Build non-blocking asynchronous processing chains using CompletableFuture"
        },
        {
          "id": "java-72-executorservice-completablefuture-cp-3",
          "label": "Coordinate asynchronous pipelines and combine multiple futures using CompletableFuture."
        }
      ],
      "practiceExercises": [
        {
          "id": "java-72-ex-1",
          "title": "Thread Pool Sizing Formula",
          "difficulty": "Beginner",
          "type": "conceptual",
          "prompt": "What is the optimal thread pool sizing formula for CPU-bound tasks vs I/O-bound tasks?",
          "solution": "1. CPU-Bound Tasks (algorithmic calculations, image rendering): Pool size = `Number of CPU Cores + 1` (or `Runtime.getRuntime().availableProcessors()`). Additional threads cause context-switching overhead without throughput gain.\n2. I/O-Bound Tasks (database queries, network API calls): Pool size = `Cores * (1 + Wait Time / Service Time)`. Because threads spend most time blocked waiting for I/O, a higher pool size (e.g. 50-100 threads) maximizes CPU utilization.",
          "explanation": "Sizing depends on the ratio of CPU computation time to external I/O blocking wait time."
        },
        {
          "id": "java-72-ex-2",
          "title": "CompletableFuture.allOf Multi-Service Aggregator",
          "difficulty": "Intermediate",
          "type": "coding",
          "prompt": "Use CompletableFuture.allOf to run 3 async tasks in parallel and print when all three have completed.",
          "solution": "import java.util.concurrent.CompletableFuture;\n\npublic class AllOfDemo {\n    public static void main(String[] args) {\n        var f1 = CompletableFuture.runAsync(() -> System.out.println(\"Service 1 done\"));\n        var f2 = CompletableFuture.runAsync(() -> System.out.println(\"Service 2 done\"));\n        var f3 = CompletableFuture.runAsync(() -> System.out.println(\"Service 3 done\"));\n\n        CompletableFuture.allOf(f1, f2, f3).join();\n        System.out.println(\"All services completed successfully.\");\n    }\n}",
          "explanation": "CompletableFuture.allOf waits for an arbitrary number of asynchronous futures concurrently."
        },
        {
          "id": "java-72-ex-3",
          "title": "ThreadPoolExecutor Rejection Policies",
          "difficulty": "Advanced",
          "type": "conceptual",
          "prompt": "Name and explain the 4 RejectedExecutionHandler policies in ThreadPoolExecutor when the pool and queue are both full.",
          "solution": "1. `AbortPolicy` (Default): Throws `RejectedExecutionException` immediately.\n2. `CallerRunsPolicy`: The thread submitting the task (caller) executes the task itself, throttling incoming submissions.\n3. `DiscardPolicy`: Silently drops the rejected task without an exception.\n4. `DiscardOldestPolicy`: Discards the oldest unhandled task in the queue and retries submitting the new task.",
          "explanation": "Rejection policies govern backpressure management under peak traffic spikes."
        }
      ],
      "quizQuestions": [
        {
          "id": "java-72-q1",
          "question": "What is the difference between `Runnable` and `Callable` in Java concurrency?",
          "options": [
            "Runnable can return a value; Callable cannot",
            "Callable can return a value and throw checked exceptions; Runnable returns void and cannot throw checked exceptions",
            "Runnable runs on daemon threads only",
            "Callable is deprecated in Java 17"
          ],
          "correctOptionIndex": 1,
          "explanation": "`Callable<V>` defines `V call() throws Exception`, returning a computed value and allowing checked exceptions."
        },
        {
          "id": "java-72-q2",
          "question": "What happens if a developer omits calling `executor.shutdown()` on a created ExecutorService?",
          "options": [
            "The pool shuts down automatically after 10 seconds",
            "The worker threads in the pool keep running, preventing the JVM from terminating",
            "It throws an OutOfMemoryError immediately",
            "Nothing, it is optional"
          ],
          "correctOptionIndex": 1,
          "explanation": "Worker threads in a thread pool are non-daemon user threads. Unless shut down, they keep the JVM alive indefinitely."
        }
      ],
      "revisionNotes": [
        "Always use ExecutorService thread pools rather than spawning raw `new Thread()` instances.",
        "`Callable<T>` returns a value and throws exceptions; `Runnable` returns void.",
        "`CompletableFuture` enables non-blocking, reactive asynchronous processing pipelines."
      ]
    },
    {
      "id": "java-73-jvm-memory-gc-performance",
      "moduleId": "java-m5",
      "moduleNumber": 5,
      "moduleTitle": "Advanced Java",
      "topicNumber": 73,
      "title": "JVM Memory Architecture, Garbage Collection & Performance Tuning",
      "language": "java",
      "level": "Intermediate",
      "whyItMatters": "Understanding the Generational Garbage Collection hypothesis, JVM memory regions (Heap, Metaspace, Stack), and GC algorithms (G1, ZGC) is essential for diagnosing OutOfMemoryError and performance tuning in high-scale systems.",
      "explanation": "1. JVM Memory Areas:\n   - Heap Memory: Shared across all threads. Divided into Young Generation (Eden space, Survivor spaces S0 and S1) and Old Generation (Tenured).\n   - Metaspace (Java 8+): Replaced PermGen. Stored in native OS memory; holds loaded class metadata, bytecode, and method tables.\n   - Thread Stacks: Private per-thread stack holding method frames and local variables.\n2. The Weak Generational Hypothesis:\n   - Most objects die young (short-lived temporary variables).\n   - Objects that survive multiple GC cycles are promoted from Eden -> S0/S1 -> Old Generation.\n   - Minor GC: Rapidly reclaims short-lived objects in Eden and Survivor spaces.\n   - Major / Full GC: Cleans the Old Generation and Metaspace (causes longer Stop-The-World STW pauses).\n3. Modern Garbage Collectors:\n   - Serial / Parallel GC: High throughput, longer pause times.\n   - G1 GC (Garbage-First, default in Java 9+): Partitions heap into regions; cleans regions with the most garbage first within a target pause time.\n   - ZGC (Z Garbage Collector, Java 15/21): Ultra-low latency concurrent collector with pause times sub-millisecond (< 1ms) even on terabyte heaps.",
      "syntaxAndStructure": "// Common JVM Tuning Flags:\n// -Xms4g -Xmx4g               // Initial and Maximum Heap size\n// -XX:+UseG1GC                // Enable G1 Collector (Default)\n// -XX:MaxGCPauseMillis=200    // Target pause time\n// -XX:+UseZGC                 // Enable Ultra-Low Latency ZGC (Java 15+)\n// -XX:+HeapDumpOnOutOfMemoryError // Dumps heap profile on crash",
      "codeExamples": [
        {
          "title": "Inspecting Runtime Heap Allocation and Garbage Collection",
          "code": "public class JVMHeapDiagnosticsDemo {\n    public static void main(String[] args) {\n        Runtime runtime = Runtime.getRuntime();\n\n        long maxMemory = runtime.maxMemory() / (1024 * 1024);\n        long totalMemory = runtime.totalMemory() / (1024 * 1024);\n        long freeMemory = runtime.freeMemory() / (1024 * 1024);\n        long usedMemory = totalMemory - freeMemory;\n\n        System.out.println(\"Max Heap (-Xmx): \" + maxMemory + \" MB\");\n        System.out.println(\"Total Allocated Heap: \" + totalMemory + \" MB\");\n        System.out.println(\"Used Heap: \" + usedMemory + \" MB\");\n        System.out.println(\"Free Heap: \" + freeMemory + \" MB\");\n\n        // Requesting Garbage Collection (hint only, not guaranteed)\n        System.gc();\n        System.out.println(\"GC hint issued successfully.\");\n    }\n}",
          "expectedOutput": "Max Heap (-Xmx): 4096 MB\nTotal Allocated Heap: 256 MB\nUsed Heap: 12 MB\nFree Heap: 244 MB\nGC hint issued successfully.",
          "explanation": "Runtime APIs allow inspecting JVM heap memory footprint. System.gc() is merely a suggestion to the JVM execution engine, not a guarantee."
        },
        {
          "title": "Reference Types: Strong, Soft, Weak & Phantom",
          "code": "import java.lang.ref.SoftReference;\nimport java.lang.ref.WeakReference;\n\npublic class ReferenceTypesDemo {\n    public static void main(String[] args) {\n        // 1. Strong Reference: Standard reference (never GC'd while reachable)\n        String strong = new String(\"Strong Object\");\n\n        // 2. Soft Reference: GC'd only when JVM is low on memory (ideal for in-memory caches)\n        SoftReference<String> soft = new SoftReference<>(new String(\"Soft Cache Object\"));\n\n        // 3. Weak Reference: GC'd on the very NEXT garbage collection cycle!\n        WeakReference<String> weak = new WeakReference<>(new String(\"Weak Object\"));\n\n        System.out.println(\"Strong: \" + strong);\n        System.out.println(\"Soft before low memory: \" + soft.get());\n        System.out.println(\"Weak before GC: \" + weak.get());\n    }\n}",
          "expectedOutput": "Strong: Strong Object\nSoft before low memory: Soft Cache Object\nWeak before GC: Weak Object",
          "explanation": "SoftReference is ideal for memory-sensitive caches (cleared before OutOfMemoryError). WeakReference is cleared during the next GC cycle (used in WeakHashMap)."
        }
      ],
      "realWorldApplications": [
        "JVM heap tuning in high-throughput microservices using G1GC and ZGC flags.",
        "Analyzing heap dumps (.hprof) in Eclipse Memory Analyzer (MAT) to identify memory leaks."
      ],
      "commonMistakes": [
        "Calling `System.gc()` in production code; it requests a full Stop-The-World GC that degrades latency.",
        "Setting `-Xms` and `-Xmx` to different values in production; keeping them equal prevents dynamic heap resizing pauses.",
        "Creating memory leaks by retaining object references in static collections or uncleared ThreadLocal variables."
      ],
      "interviewRelevance": "Universal senior interview question: \"Explain the Generational GC hypothesis\", \"G1 GC vs ZGC\", \"Strong vs Soft vs Weak references\", and \"How do you diagnose OutOfMemoryError?\"",
      "checkpoints": [
        {
          "id": "java-73-cp-1",
          "label": "Explain the Weak Generational Hypothesis and Eden/Survivor/Tenured heap regions"
        },
        {
          "id": "java-73-cp-2",
          "label": "Compare G1 GC (region-based) and modern ZGC (sub-millisecond pause times)"
        },
        {
          "id": "java-73-jvm-memory-gc-performance-cp-3",
          "label": "Analyze generational memory (Eden, Survivor, Tenured), GC pauses, and tune JVM flags."
        }
      ],
      "practiceExercises": [
        {
          "id": "java-73-ex-1",
          "title": "Differentiate OOM Error Varieties",
          "difficulty": "Beginner",
          "type": "conceptual",
          "prompt": "Differentiate between: 1) java.lang.OutOfMemoryError: Java heap space, 2) OutOfMemoryError: Metaspace, 3) StackOverflowError.",
          "solution": "1) `Java heap space`: Heap is exhausted; objects cannot be allocated (memory leak or insufficient -Xmx).\n2) `Metaspace`: Native memory holding loaded class metadata is exhausted (too many dynamically generated classes via CGLIB/proxies; fix with -XX:MaxMetaspaceSize).\n3) `StackOverflowError`: A thread's call stack is exhausted, typically due to deep/infinite recursion (fix recursion or increase -Xss).",
          "explanation": "Each error maps to a distinct JVM memory region (Heap vs Native Metaspace vs Thread Call Stack)."
        },
        {
          "id": "java-73-ex-2",
          "title": "WeakHashMap Cache Simulation",
          "difficulty": "Intermediate",
          "type": "coding",
          "prompt": "Demonstrate how WeakHashMap automatically evicts keys when external strong references are removed.",
          "solution": "import java.util.*;\n\npublic class WeakHashMapDemo {\n    public static void main(String[] args) throws InterruptedException {\n        Map<Object, String> weakMap = new WeakHashMap<>();\n        Object key = new Object();\n        weakMap.put(key, \"Metadata\");\n\n        System.out.println(\"Before nullifying key, map size: \" + weakMap.size());\n        key = null; // Remove strong reference\n        System.gc(); // Suggest GC\n        Thread.sleep(100);\n\n        System.out.println(\"After GC, WeakHashMap size: \" + weakMap.size()); // Evicted (0)!\n    }\n}",
          "explanation": "WeakHashMap keys are wrapped in WeakReference; when the strong reference is cleared, GC evicts the entry."
        },
        {
          "id": "java-73-ex-3",
          "title": "ZGC Colored Pointers and Load Barriers",
          "difficulty": "Advanced",
          "type": "conceptual",
          "prompt": "How does ZGC achieve sub-millisecond Stop-The-World pauses using Colored Pointers and Load Barriers?",
          "solution": "ZGC stores reference metadata directly inside the 64-bit pointer address (Colored Pointers: Marked0, Marked1, Remapped bits). Because metadata is in the pointer, ZGC can relocate heap objects concurrently while the application is running. When application threads read an object reference, a JIT-compiled \"Load Barrier\" intercepts the read; if the object has been moved, the load barrier immediately updates the reference in place (Self-Healing). This eliminates long STW pauses.",
          "explanation": "ZGC colored pointers and load barriers enable concurrent object relocation without halting execution."
        }
      ],
      "quizQuestions": [
        {
          "id": "java-73-q1",
          "question": "What is the default Garbage Collector in modern Java (Java 9 through Java 21)?",
          "options": [
            "Serial GC",
            "Parallel GC",
            "G1 GC (Garbage-First)",
            "ZGC"
          ],
          "correctOptionIndex": 2,
          "explanation": "G1 GC (Garbage-First) has been the default Garbage Collector since Java 9."
        },
        {
          "id": "java-73-q2",
          "question": "Which type of reference in Java is cleared by the Garbage Collector ONLY when the JVM is running low on memory before throwing OutOfMemoryError?",
          "options": [
            "StrongReference",
            "SoftReference",
            "WeakReference",
            "PhantomReference"
          ],
          "correctOptionIndex": 1,
          "explanation": "`SoftReference` objects are retained as long as memory is sufficient and are cleared by the GC only as a last resort before OutOfMemoryError."
        }
      ],
      "revisionNotes": [
        "JVM Heap is divided into Young Gen (Eden, S0, S1) and Old Gen (Tenured).",
        "Metaspace holds loaded class metadata in native memory (replaced PermGen in Java 8).",
        "G1 GC is default; ZGC provides sub-millisecond pause times on modern Java 17/21."
      ]
    }
  ],
  "moduleAssessment": {
    "id": "java-m5-assessment",
    "title": "Module 5 Assessment: Advanced Java",
    "passingScorePercentage": 80,
    "questions": [
      {
        "id": "java-54-q1",
        "question": "What happens to the generic type parameters (e.g. `<String>`) when Java code is compiled to bytecode?",
        "options": [
          "They are converted into C++ templates",
          "They undergo Type Erasure and are replaced by their bound (or Object), with compiler-inserted casts",
          "They remain strictly preserved in the bytecode for runtime inspection",
          "They are stored in the JVM Metaspace"
        ],
        "correctOptionIndex": 1,
        "explanation": "Type Erasure removes type parameters during compilation, replacing them with Object or upper bounds."
      },
      {
        "id": "java-54-q2",
        "question": "Why is `new T()` illegal inside a generic class `MyClass<T>`?",
        "options": [
          "Because T might be private",
          "Because at runtime, Type Erasure removes T, so the JVM does not know which constructor to invoke",
          "Because new is deprecated in generics",
          "Because T is always abstract"
        ],
        "correctOptionIndex": 1,
        "explanation": "At runtime, the JVM does not know what concrete type T represents due to Type Erasure, making direct instantiation impossible."
      },
      {
        "id": "java-55-q1",
        "question": "When declaring multiple bounds for a generic type parameter `<T extends A & B>`, what is the syntax rule regarding classes and interfaces?",
        "options": [
          "Interfaces must be listed before classes",
          "At most one class can be specified, and it MUST be listed first",
          "Multiple classes can be specified separated by &",
          "Only interfaces are allowed in multiple bounds"
        ],
        "correctOptionIndex": 1,
        "explanation": "Java allows at most one class in multiple bounds, and it must precede all interfaces."
      },
      {
        "id": "java-55-q2",
        "question": "Is `<T super Number>` a valid type parameter declaration for a generic class?",
        "options": [
          "Yes, it creates a lower-bounded generic class",
          "No, lower bounds (`super`) are only valid with wildcards (`<? super T>`), not type parameters",
          "Yes, in Java 17 and above",
          "Only in abstract classes"
        ],
        "correctOptionIndex": 1,
        "explanation": "Lower bounds using `super` are strictly prohibited in type parameter declarations (`<T>`); they are only permitted with wildcards (`<?>`)."
      },
      {
        "id": "java-56-q1",
        "question": "Under the PECS rule, what type of wildcard should you use if your method reads data from a collection parameter?",
        "options": [
          "<? super T>",
          "<? extends T>",
          "<T extends Object>",
          "<?>"
        ],
        "correctOptionIndex": 1,
        "explanation": "PECS: \"Producer Extends\". If the collection produces/reads items for your method, use `<? extends T>`."
      },
      {
        "id": "java-56-q2",
        "question": "Why does `List<Number> list = new ArrayList<Integer>();` fail to compile in Java?",
        "options": [
          "Because Integer is not a Number",
          "Because Java generics are invariant: List<Integer> is not a subtype of List<Number>",
          "Because ArrayList cannot hold Numbers",
          "Because of an out of memory error"
        ],
        "correctOptionIndex": 1,
        "explanation": "Generics are invariant. If allowed, you could put a Double into a List<Integer> via the List<Number> reference, destroying type safety."
      },
      {
        "id": "java-57-q1",
        "question": "Which functional interface in java.util.function takes a single argument of type T and returns a boolean?",
        "options": [
          "Function<T, Boolean>",
          "Predicate<T>",
          "Consumer<T>",
          "Supplier<Boolean>"
        ],
        "correctOptionIndex": 1,
        "explanation": "`Predicate<T>` defines `boolean test(T t)` and is the standard interface for condition evaluations."
      },
      {
        "id": "java-57-q2",
        "question": "Can a functional interface contain default and static methods?",
        "options": [
          "No, it must contain only abstract methods",
          "Yes, it can contain any number of default and static methods, as long as it has exactly one abstract method",
          "Only static methods are allowed",
          "Only default methods are allowed"
        ],
        "correctOptionIndex": 1,
        "explanation": "A functional interface requires exactly one abstract method. It can have unlimited default and static methods."
      },
      {
        "id": "java-58-q1",
        "question": "What does the `this` keyword refer to inside a lambda expression?",
        "options": [
          "The lambda object itself",
          "The instance of the enclosing class in which the lambda is defined",
          "It is illegal and causes a compile error",
          "The functional interface being implemented"
        ],
        "correctOptionIndex": 1,
        "explanation": "Lambdas are lexically scoped. `this` inside a lambda refers to the enclosing class instance."
      },
      {
        "id": "java-58-q2",
        "question": "Why does Java require captured local variables in a lambda to be final or effectively final?",
        "options": [
          "Because local variables are stored in Metaspace",
          "Because lambdas copy the local variable value to the heap; allowing mutation would cause concurrency and memory desynchronization bugs",
          "Because the garbage collector cannot track mutable variables",
          "To make code run in single-threaded mode"
        ],
        "correctOptionIndex": 1,
        "explanation": "Captured primitives are copied by value from stack to heap. Requiring finality guarantees consistency across thread lifecycles."
      },
      {
        "id": "java-59-q1",
        "question": "What is the lambda equivalent of the unbound method reference `String::length`?",
        "options": [
          "() -> String.length()",
          "(String s) -> s.length()",
          "s -> String.length(s)",
          "() -> new String().length()"
        ],
        "correctOptionIndex": 1,
        "explanation": "For unbound instance references `ClassName::method`, the first lambda parameter becomes the object instance target: `(s) -> s.length()`."
      },
      {
        "id": "java-59-q2",
        "question": "Which syntax represents a constructor reference in Java?",
        "options": [
          "ClassName::construct",
          "ClassName::new",
          "new ClassName::get",
          "ClassName()::new"
        ],
        "correctOptionIndex": 1,
        "explanation": "Constructor references use the syntax `ClassName::new`."
      },
      {
        "id": "java-60-q1",
        "question": "What occurs if you call intermediate operations on a Stream without invoking a terminal operation?",
        "options": [
          "The operations execute in parallel",
          "Nothing happens; intermediate operations are lazy and never execute without a terminal operation",
          "The JVM throws an IllegalStateException",
          "The stream is saved to disk"
        ],
        "correctOptionIndex": 1,
        "explanation": "Intermediate stream operations are completely lazy and do not process any elements until a terminal operation is called."
      },
      {
        "id": "java-60-q2",
        "question": "What happens if you attempt to invoke a second terminal operation on an already consumed Stream?",
        "options": [
          "It rewinds to the beginning and re-executes",
          "It throws java.lang.IllegalStateException: stream has already been operated upon or closed",
          "It returns an empty result",
          "It executes on a new thread"
        ],
        "correctOptionIndex": 1,
        "explanation": "Streams in Java are single-use. Once operated upon by a terminal operation, they are permanently closed."
      },
      {
        "id": "java-61-q1",
        "question": "When should you use `flatMap()` instead of `map()`?",
        "options": [
          "When you need to sort elements",
          "When each element maps to a collection or Stream, and you want to flatten them into a single continuous stream",
          "When working only with integers",
          "To make the stream parallel"
        ],
        "correctOptionIndex": 1,
        "explanation": "`flatMap` transforms each element into a stream of values and flattens all resulting streams into one unified stream."
      },
      {
        "id": "java-61-q2",
        "question": "Which of the following intermediate stream operations is STATEFUL?",
        "options": [
          "filter()",
          "map()",
          "sorted()",
          "peek()"
        ],
        "correctOptionIndex": 2,
        "explanation": "`sorted()` is stateful because it must inspect and buffer all elements before it can emit any elements in order."
      },
      {
        "id": "java-62-q1",
        "question": "What type does `Collectors.partitioningBy(Predicate)` always return as the map keys?",
        "options": [
          "String",
          "Integer",
          "Boolean",
          "Object"
        ],
        "correctOptionIndex": 2,
        "explanation": "`partitioningBy` partitions elements into two groups: `Boolean.TRUE` (matching predicate) and `Boolean.FALSE` (non-matching)."
      },
      {
        "id": "java-62-q2",
        "question": "What happens if you use `Collectors.toMap(keyMapper, valueMapper)` without a merge function and duplicate keys are encountered?",
        "options": [
          "The older value is silently overwritten",
          "The new value is discarded",
          "It throws an IllegalStateException: Duplicate key",
          "It converts the value into a List"
        ],
        "correctOptionIndex": 2,
        "explanation": "Without a merge function, duplicate keys cause an immediate IllegalStateException."
      },
      {
        "id": "java-63-q1",
        "question": "What is the primary difference between `opt.orElse(defaultVal)` and `opt.orElseGet(supplier)`?",
        "options": [
          "orElse is lazy; orElseGet is eager",
          "orElse evaluates defaultVal eagerly even if opt has a value; orElseGet invokes the supplier lazily ONLY if opt is empty",
          "orElse throws NullPointerException",
          "They are identical"
        ],
        "correctOptionIndex": 1,
        "explanation": "`orElse(x)` evaluates x immediately at call time; `orElseGet(() -> x)` evaluates x only when the Optional is empty."
      },
      {
        "id": "java-63-q2",
        "question": "What happens if you invoke `Optional.of(null)` in Java?",
        "options": [
          "It returns an empty Optional",
          "It throws a NullPointerException immediately",
          "It returns an Optional containing the string \"null\"",
          "It compiles to a no-op"
        ],
        "correctOptionIndex": 1,
        "explanation": "`Optional.of()` mandates a non-null argument and throws NullPointerException if null. Use `Optional.ofNullable()` for nullable values."
      },
      {
        "id": "java-64-q1",
        "question": "What is the naming convention for accessor methods generated by the compiler for record components?",
        "options": [
          "getComponentName() (JavaBean convention)",
          "componentName() (matching the component name directly)",
          "isComponentName()",
          "fetchComponentName()"
        ],
        "correctOptionIndex": 1,
        "explanation": "Record accessors match the exact name of the component (e.g. `point.x()`), omitting the `get` prefix."
      },
      {
        "id": "java-64-q2",
        "question": "Can a Java record explicitly extend another class using the `extends` keyword?",
        "options": [
          "Yes, any class that is marked final",
          "No, all records implicitly extend java.lang.Record and Java does not support multiple class inheritance",
          "Yes, if the superclass is abstract",
          "Only in Java 21"
        ],
        "correctOptionIndex": 1,
        "explanation": "Records implicitly extend `java.lang.Record`. Because Java does not allow multiple class inheritance, records cannot extend another class."
      },
      {
        "id": "java-65-q1",
        "question": "Which of the following is NOT one of the three mandatory modifiers for a subclass permitted by a sealed class?",
        "options": [
          "final",
          "sealed",
          "non-sealed",
          "static"
        ],
        "correctOptionIndex": 3,
        "explanation": "Every permitted subclass must explicitly declare either `final`, `sealed`, or `non-sealed`. `static` is not an inheritance hierarchy modifier."
      },
      {
        "id": "java-65-q2",
        "question": "Why does a switch expression on a sealed class hierarchy not require a `default` branch?",
        "options": [
          "Because the compiler suppresses all errors in switch",
          "Because the compiler knows all permitted subtypes and can statically verify exhaustiveness",
          "Because default is deprecated in Java 17",
          "Only if the class has fewer than 3 subclasses"
        ],
        "correctOptionIndex": 1,
        "explanation": "The sealed permits clause provides a closed universe of subtypes, allowing the compiler to guarantee that all possibilities are covered."
      },
      {
        "id": "java-66-q1",
        "question": "What is the keyword used in Java 21 switch statements to specify a guarded pattern (conditional filter)?",
        "options": [
          "if",
          "when",
          "where",
          "guard"
        ],
        "correctOptionIndex": 1,
        "explanation": "Java 21 uses the `when` keyword for guarded patterns (e.g. `case String s when s.length() > 5 -> ...`)."
      },
      {
        "id": "java-66-q2",
        "question": "How does modern Java 21 switch handle a `null` value when `case null:` is explicitly provided?",
        "options": [
          "It throws a NullPointerException before evaluating any case",
          "It safely routes execution to the `case null` branch",
          "It routes null to the default branch only",
          "It converts null to an empty string"
        ],
        "correctOptionIndex": 1,
        "explanation": "Java 21 switch natively supports explicit `case null:` handling, preventing NullPointerException."
      },
      {
        "id": "java-67-q1",
        "question": "Which `RetentionPolicy` must be specified for an annotation so that it can be inspected via Java Reflection at runtime?",
        "options": [
          "RetentionPolicy.SOURCE",
          "RetentionPolicy.CLASS",
          "RetentionPolicy.RUNTIME",
          "RetentionPolicy.JVM"
        ],
        "correctOptionIndex": 2,
        "explanation": "`RetentionPolicy.RUNTIME` instructs the JVM to retain the annotation in memory, making it accessible via reflection APIs."
      },
      {
        "id": "java-67-q2",
        "question": "What types are permitted as return values for elements in a custom Java annotation?",
        "options": [
          "Any Java class or object",
          "Primitives, String, Class, Enums, Annotations, and 1D arrays of these types",
          "Only primitives and Strings",
          "Only integers"
        ],
        "correctOptionIndex": 1,
        "explanation": "Annotation elements are restricted to primitives, String, Class, enums, other annotations, and single-dimensional arrays thereof."
      },
      {
        "id": "java-68-q1",
        "question": "What is the difference between `clazz.getFields()` and `clazz.getDeclaredFields()` in Java Reflection?",
        "options": [
          "getFields() returns private fields; getDeclaredFields() returns public fields",
          "getFields() returns all public fields (including inherited); getDeclaredFields() returns all fields declared by the class regardless of access level",
          "They are identical",
          "getDeclaredFields() is deprecated in Java 17"
        ],
        "correctOptionIndex": 1,
        "explanation": "`getFields()` returns only public fields (including inherited ones), while `getDeclaredFields()` returns all fields (private, protected, default, public) declared directly in the class."
      },
      {
        "id": "java-68-q2",
        "question": "What method on `AccessibleObject` is used to suppress Java language access control checks (allowing access to private members)?",
        "options": [
          "makePublic()",
          "setAccessible(true)",
          "unlock()",
          "bypassSecurity()"
        ],
        "correctOptionIndex": 1,
        "explanation": "`setAccessible(true)` suppresses language access checks for fields, methods, and constructors."
      },
      {
        "id": "java-69-q1",
        "question": "What occurs if you call `t.start()` on a Thread that has already finished executing?",
        "options": [
          "It re-executes the thread from the beginning",
          "It throws java.lang.IllegalThreadStateException",
          "It does nothing",
          "It resets the thread call stack"
        ],
        "correctOptionIndex": 1,
        "explanation": "A thread cannot be restarted once started. Calling start() again throws `IllegalThreadStateException`."
      },
      {
        "id": "java-69-q2",
        "question": "What is the characteristic of a Daemon Thread in Java?",
        "options": [
          "It has higher priority than user threads",
          "The JVM terminates immediately when all non-daemon user threads complete, killing any remaining daemon threads",
          "It cannot be interrupted",
          "It runs in C++ space"
        ],
        "correctOptionIndex": 1,
        "explanation": "Daemon threads run in the background (e.g. GC) and do not keep the JVM alive when all user threads finish."
      },
      {
        "id": "java-70-q1",
        "question": "Why should `wait()` always be invoked inside a `while (condition)` loop rather than an `if (condition)` statement?",
        "options": [
          "Because wait() throws a compile error inside if",
          "To protect against \"spurious wakeups\" where the thread wakes up without being signaled",
          "Because while loops execute on CPU cache",
          "Because if statements cannot be synchronized"
        ],
        "correctOptionIndex": 1,
        "explanation": "Threads can wake up from wait() spuriously without notify() being called. A while loop re-checks the condition before proceeding."
      },
      {
        "id": "java-70-q2",
        "question": "What exception is thrown if a thread calls `obj.wait()` or `obj.notify()` without holding the monitor lock on `obj`?",
        "options": [
          "NullPointerException",
          "IllegalMonitorStateException",
          "InterruptedException",
          "IllegalThreadStateException"
        ],
        "correctOptionIndex": 1,
        "explanation": "`java.lang.IllegalMonitorStateException` is thrown if the current thread does not own the object's monitor lock."
      },
      {
        "id": "java-71-q1",
        "question": "Where must `lock.unlock()` always be called when using explicit Locks in Java?",
        "options": [
          "At the beginning of the method",
          "Inside a `finally` block to guarantee release even if exceptions occur",
          "Inside the catch block only",
          "Only after the thread finishes"
        ],
        "correctOptionIndex": 1,
        "explanation": "Explicit locks must always be released in a `finally` block to prevent permanent deadlocks on exceptions."
      },
      {
        "id": "java-71-q2",
        "question": "What hardware-level CPU mechanism is utilized by AtomicInteger and AtomicLong to achieve lock-free thread safety?",
        "options": [
          "OS Mutex locks",
          "Compare-And-Swap (CAS) instructions",
          "Java monitor locks",
          "Thread.sleep polling"
        ],
        "correctOptionIndex": 1,
        "explanation": "Atomic classes use native Compare-And-Swap (CAS) instructions (via Unsafe / VarHandle) for atomic updates."
      },
      {
        "id": "java-72-q1",
        "question": "What is the difference between `Runnable` and `Callable` in Java concurrency?",
        "options": [
          "Runnable can return a value; Callable cannot",
          "Callable can return a value and throw checked exceptions; Runnable returns void and cannot throw checked exceptions",
          "Runnable runs on daemon threads only",
          "Callable is deprecated in Java 17"
        ],
        "correctOptionIndex": 1,
        "explanation": "`Callable<V>` defines `V call() throws Exception`, returning a computed value and allowing checked exceptions."
      },
      {
        "id": "java-72-q2",
        "question": "What happens if a developer omits calling `executor.shutdown()` on a created ExecutorService?",
        "options": [
          "The pool shuts down automatically after 10 seconds",
          "The worker threads in the pool keep running, preventing the JVM from terminating",
          "It throws an OutOfMemoryError immediately",
          "Nothing, it is optional"
        ],
        "correctOptionIndex": 1,
        "explanation": "Worker threads in a thread pool are non-daemon user threads. Unless shut down, they keep the JVM alive indefinitely."
      },
      {
        "id": "java-73-q1",
        "question": "What is the default Garbage Collector in modern Java (Java 9 through Java 21)?",
        "options": [
          "Serial GC",
          "Parallel GC",
          "G1 GC (Garbage-First)",
          "ZGC"
        ],
        "correctOptionIndex": 2,
        "explanation": "G1 GC (Garbage-First) has been the default Garbage Collector since Java 9."
      },
      {
        "id": "java-73-q2",
        "question": "Which type of reference in Java is cleared by the Garbage Collector ONLY when the JVM is running low on memory before throwing OutOfMemoryError?",
        "options": [
          "StrongReference",
          "SoftReference",
          "WeakReference",
          "PhantomReference"
        ],
        "correctOptionIndex": 1,
        "explanation": "`SoftReference` objects are retained as long as memory is sufficient and are cleared by the GC only as a last resort before OutOfMemoryError."
      }
    ]
  },
  "revisionQuestions": [
    "Explain the PECS principle in Java generics and why List<Integer> is not a subtype of List<Number>.",
    "Walk through the 4 core functional interfaces: Predicate, Function, Consumer, and Supplier.",
    "Differentiate between map() and flatMap() in the Stream API with concrete code examples.",
    "What are Java Records and Sealed Classes in Java 17, and how do they support pattern matching?",
    "Explain the internal architecture of ConcurrentHashMap in Java 8+ and how ReentrantLock prevents deadlocks with tryLock."
  ]
};
