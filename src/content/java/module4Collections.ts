import { MasteryTopic, MasteryModule } from '@/types/mastery';

export const module4Topics: MasteryTopic[] = [
  {
    "id": "java-39-collections-hierarchy",
    "moduleId": "java-m4",
    "moduleNumber": 4,
    "moduleTitle": "Java Collections Framework",
    "topicNumber": 39,
    "title": "Collections Hierarchy: Iterable, Collection, List, Set, Queue & Map",
    "language": "java",
    "level": "Beginner",
    "whyItMatters": "The Java Collections Framework (JCF) is the core toolkit for all data structure operations in Java. Knowing the precise interface hierarchy and why Map does not inherit from Collection is a foundational interview checkpoint.",
    "explanation": "The Java Collections Framework provides a unified architecture for storing and manipulating groups of objects.\nKey Hierarchies:\n1. `Iterable<T>`: The root interface of the collection hierarchy. Declares `iterator()` and `forEach()`, enabling enhanced for-each loops.\n2. `Collection<T>`: Sub-interface of `Iterable`. Defines general operations (add, remove, size, contains, clear, toArray).\n   - `List<T>`: Ordered collection (sequence). Allows duplicate elements and positional index access (ArrayList, LinkedList, Vector/Stack).\n   - `Set<T>`: Unordered collection prohibiting duplicate elements (HashSet, LinkedHashSet, TreeSet).\n   - `Queue<T>` / `Deque<T>`: Collections designed for holding elements prior to processing (PriorityQueue, ArrayDeque, LinkedList).\n3. `Map<K, V>`: Stores key-value mappings with unique keys (HashMap, LinkedHashMap, TreeMap). Note: `Map` does NOT extend `Collection` or `Iterable` because maps operate on pairs rather than individual elements, though maps expose collection views via `keySet()`, `values()`, and `entrySet()`.",
    "syntaxAndStructure": "// Hierarchy Structure:\n// Iterable<T>\n//   └── Collection<T>\n//         ├── List<T>        (ArrayList, LinkedList)\n//         ├── Set<T>         (HashSet, LinkedHashSet, TreeSet)\n//         └── Queue<T>       (PriorityQueue, ArrayDeque)\n//\n// Map<K,V> (Independent Hierarchy: HashMap, LinkedHashMap, TreeMap)",
    "codeExamples": [
      {
        "title": "Traversing the Collection Views of a Map",
        "code": "import java.util.LinkedHashMap;\nimport java.util.Map;\n\npublic class MapCollectionViewDemo {\n    public static void main(String[] args) {\n        Map<String, Integer> scores = new LinkedHashMap<>();\n        scores.put(\"Alice\", 95);\n        scores.put(\"Bob\", 88);\n        scores.put(\"Charlie\", 92);\n\n        // 1. EntrySet view (Key-Value pairs)\n        System.out.println(\"--- EntrySet View ---\");\n        for (Map.Entry<String, Integer> entry : scores.entrySet()) {\n            System.out.println(entry.getKey() + \" -> \" + entry.getValue());\n        }\n\n        // 2. KeySet view\n        System.out.println(\"Keys: \" + scores.keySet());\n\n        // 3. Values collection view\n        System.out.println(\"Values: \" + scores.values());\n    }\n}",
        "expectedOutput": "--- EntrySet View ---\nAlice -> 95\nBob -> 88\nCharlie -> 92\nKeys: [Alice, Bob, Charlie]\nValues: [95, 88, 92]",
        "explanation": "Even though Map does not extend Collection, its entrySet(), keySet(), and values() methods return Collection views that integrate with for-each and Stream processing."
      },
      {
        "title": "Polymorphic Collection Processing",
        "code": "import java.util.*;\n\npublic class CollectionHierarchyDemo {\n    public static void printCollectionSize(Collection<?> col) {\n        System.out.println(col.getClass().getSimpleName() + \" size: \" + col.size());\n    }\n\n    public static void main(String[] args) {\n        List<String> list = new ArrayList<>(List.of(\"A\", \"B\", \"C\"));\n        Set<Integer> set = new HashSet<>(Set.of(1, 2));\n        Queue<Double> queue = new ArrayDeque<>(List.of(3.14));\n\n        printCollectionSize(list);\n        printCollectionSize(set);\n        printCollectionSize(queue);\n    }\n}",
        "expectedOutput": "ArrayList size: 3\nHashSet size: 2\nArrayDeque size: 1",
        "explanation": "List, Set, and Queue all inherit from Collection, enabling unified algorithms and utility methods."
      }
    ],
    "realWorldApplications": [
      "Selecting the appropriate collection type based on requirements: fast random access (ArrayList), uniqueness (HashSet), sorting (TreeSet), or FIFO buffering (ArrayDeque).",
      "Designing clean API contracts by accepting `Collection<T>` or `List<T>` interfaces."
    ],
    "commonMistakes": [
      "Assuming `Map` extends `Collection`; Map has a completely separate interface hierarchy.",
      "Using legacy thread-safe collections (`Vector`, `Hashtable`) instead of modern concurrent collections (`ConcurrentHashMap`, `CopyOnWriteArrayList`).",
      "Assuming Map implements the Collection interface; Map is a separate top-level hierarchy in java.util."
    ],
    "interviewRelevance": "Universal interview question: \"Draw the Java Collections hierarchy diagram\" and \"Why doesn't Map inherit from Collection?\"",
    "checkpoints": [
      {
        "id": "java-39-cp-1",
        "label": "Draw the full Collections framework inheritance hierarchy"
      },
      {
        "id": "java-39-cp-2",
        "label": "Explain why Map is decoupled from Collection and how entrySet() connects them"
      },
      {
        "id": "java-39-collections-hierarchy-cp-3",
        "label": "Navigate the relationships between Iterable, Collection, List, Set, Queue, and Map."
      }
    ],
    "practiceExercises": [
      {
        "id": "java-39-ex-1",
        "title": "Classify Collection Characteristics",
        "difficulty": "Beginner",
        "type": "conceptual",
        "prompt": "State whether duplicates and ordering are preserved in: 1) ArrayList, 2) HashSet, 3) LinkedHashSet, 4) TreeSet.",
        "solution": "1) ArrayList: Allows duplicates, preserves insertion order.\n2) HashSet: No duplicates, unordered.\n3) LinkedHashSet: No duplicates, preserves insertion order.\n4) TreeSet: No duplicates, sorted by natural order or Comparator.",
        "explanation": "Evaluates understanding of duplicate handling and ordering contracts across core collection types."
      },
      {
        "id": "java-39-ex-2",
        "title": "Count Frequency Using Map",
        "difficulty": "Intermediate",
        "type": "coding",
        "prompt": "Given a list of words, count word frequencies using Map.getOrDefault() in O(n) time.",
        "solution": "import java.util.*;\n\npublic class WordFrequency {\n    public static Map<String, Integer> countFrequencies(List<String> words) {\n        Map<String, Integer> freq = new HashMap<>();\n        for (String w : words) {\n            freq.put(w, freq.getOrDefault(w, 0) + 1);\n        }\n        return freq;\n    }\n    public static void main(String[] args) {\n        List<String> words = List.of(\"apple\", \"banana\", \"apple\", \"cherry\", \"banana\", \"apple\");\n        System.out.println(\"Frequencies: \" + countFrequencies(words));\n    }\n}",
        "explanation": "Map.getOrDefault() eliminates manual null checks when updating counting dictionaries."
      },
      {
        "id": "java-39-ex-3",
        "title": "Iterable Implementation from Scratch",
        "difficulty": "Advanced",
        "type": "coding",
        "prompt": "Create a custom class Range(int start, int end) that implements Iterable<Integer> so it can be used directly in an enhanced for-each loop.",
        "solution": "import java.util.Iterator;\n\npublic class Range implements Iterable<Integer> {\n    private final int start, end;\n    public Range(int s, int e) { this.start = s; this.end = e; }\n\n    @Override\n    public Iterator<Integer> iterator() {\n        return new Iterator<>() {\n            private int curr = start;\n            public boolean hasNext() { return curr <= end; }\n            public Integer next() { return curr++; }\n        };\n    }\n    public static void main(String[] args) {\n        for (int n : new Range(1, 5)) {\n            System.out.print(n + \" \");\n        }\n        System.out.println();\n    }\n}",
        "explanation": "Implementing Iterable<T> and supplying an Iterator<T> allows custom data structures to integrate with Java's for-each loop."
      }
    ],
    "quizQuestions": [
      {
        "id": "java-39-q1",
        "question": "Why does the Map interface NOT extend the Collection interface in Java?",
        "options": [
          "Because Map was created in C++",
          "Because Maps operate on key-value pairs, which incompatible with the single-element methods of Collection (like add(E))",
          "Because Map is deprecated",
          "Because Collections are only for primitives"
        ],
        "correctOptionIndex": 1,
        "explanation": "Collection represents a container of individual elements with methods like add(E). Map contains key-value pairs and cannot cleanly fulfill that contract."
      },
      {
        "id": "java-39-q2",
        "question": "Which interface in the Java Collections Framework enables an object to be targeted by the enhanced for-each loop?",
        "options": [
          "java.util.Collection",
          "java.lang.Iterable",
          "java.util.Iterator",
          "java.util.List"
        ],
        "correctOptionIndex": 1,
        "explanation": "The enhanced for-each loop requires target objects to implement `java.lang.Iterable` (or be an array)."
      }
    ],
    "revisionNotes": [
      "Iterable is the root interface; Collection extends Iterable.",
      "List (ordered, duplicates), Set (unique, no duplicates), Queue (FIFO processing).",
      "Map (key-value pairs) is an independent hierarchy that exposes collection views."
    ]
  },
  {
    "id": "java-40-arraylist",
    "moduleId": "java-m4",
    "moduleNumber": 4,
    "moduleTitle": "Java Collections Framework",
    "topicNumber": 40,
    "title": "ArrayList: Dynamic Resizing Mechanics, Capacity & Performance",
    "language": "java",
    "level": "Beginner",
    "whyItMatters": "ArrayList is by far the most commonly used collection in Java. Understanding its internal growth formula (50% expansion), amortized O(1) appending, and when to specify initial capacity prevents expensive array reallocations.",
    "explanation": "An `ArrayList` is a resizable dynamic array implementation of the `List` interface.\nInternal Mechanics:\n1. Backing Array: Backed by `transient Object[] elementData`.\n2. Default Capacity: When instantiated with `new ArrayList<>()`, it starts with an empty array. On the first `add()` call, it expands to a default capacity of 10.\n3. Growth Formula (Java 8+): When the array becomes full, it resizes using the formula:\n   `int newCapacity = oldCapacity + (oldCapacity >> 1);`\n   This represents a 50% growth factor (e.g. 10 -> 15 -> 22 -> 33). It allocates a new array on the Heap and copies existing elements using native `Arrays.copyOf()` / `System.arraycopy()`.\n4. Time Complexity:\n   - Random Access `get(index)` / `set(index)`: $O(1)$ constant time (direct memory address calculation).\n   - Appending `add(element)`: Amortized $O(1)$ time; worst-case $O(n)$ on resize.\n   - Positional `add(index, element)` / `remove(index)`: $O(n)$ time due to shifting elements.\n5. `ensureCapacity(minCapacity)`: Pre-allocates space to avoid multiple resizes.",
    "syntaxAndStructure": "// Instantiation with explicit initial capacity (best practice if size is known):\nList<String> list = new ArrayList<>(1000);\n\n// Common operations:\nlist.add(\"Apple\");\nString item = list.get(0); // O(1)\nlist.set(0, \"Apricot\");    // O(1)\nlist.remove(0);            // O(n) element shift",
    "codeExamples": [
      {
        "title": "ArrayList Operations and Removal by Index vs Object",
        "code": "import java.util.ArrayList;\nimport java.util.List;\n\npublic class ArrayListTrapDemo {\n    public static void main(String[] args) {\n        List<Integer> numbers = new ArrayList<>();\n        numbers.add(10);\n        numbers.add(20);\n        numbers.add(30);\n\n        // Trap: remove(int index) vs remove(Object o)\n        // Calling remove(1) removes the element at INDEX 1 (which is 20)\n        numbers.remove(1);\n        System.out.println(\"After remove(1): \" + numbers);\n\n        // To remove the integer value 10 by object equality, wrap it:\n        numbers.remove(Integer.valueOf(10));\n        System.out.println(\"After remove(Integer.valueOf(10)): \" + numbers);\n    }\n}",
        "expectedOutput": "After remove(1): [10, 30]\nAfter remove(Integer.valueOf(10)): [30]",
        "explanation": "List defines two overloaded remove methods: remove(int index) and remove(Object o). When passing primitive int 1, the compiler matches the index overload."
      },
      {
        "title": "Optimizing ArrayList with ensureCapacity",
        "code": "import java.util.ArrayList;\n\npublic class ArrayListCapacityDemo {\n    public static void main(String[] args) {\n        // Pre-allocating capacity avoids repeated internal array copy operations\n        ArrayList<Integer> fastList = new ArrayList<>(1000);\n        \n        for (int i = 0; i < 5; i++) {\n            fastList.add(i * 10);\n        }\n        \n        System.out.println(\"FastList size: \" + fastList.size());\n        System.out.println(\"FastList elements: \" + fastList);\n    }\n}",
        "expectedOutput": "FastList size: 5\nFastList elements: [0, 10, 20, 30, 40]",
        "explanation": "Pre-specifying capacity allocates the exact backing buffer once, eliminating geometric 50% resize cycles."
      }
    ],
    "realWorldApplications": [
      "Serving database query results into memory where random access by index is frequent.",
      "Storing homogeneous data sets in REST APIs and caching layers."
    ],
    "commonMistakes": [
      "Using `ArrayList` when frequent insertions and deletions occur at the beginning or middle of large lists (causes $O(n)$ array element shifting).",
      "Confusing `remove(int index)` with `remove(Object o)` when working with `List<Integer>`.",
      "Using ArrayList without pre-allocating capacity when inserting millions of elements, causing repeated array reallocations."
    ],
    "interviewRelevance": "Universal interview question: \"How does ArrayList resize internally?\", \"What is the time complexity of add() vs add(index, element)?\", and \"Why is initial capacity important?\"",
    "checkpoints": [
      {
        "id": "java-40-cp-1",
        "label": "Explain the 50% growth formula: oldCapacity + (oldCapacity >> 1)"
      },
      {
        "id": "java-40-cp-2",
        "label": "Differentiate remove(int index) from remove(Object o) in List<Integer>"
      },
      {
        "id": "java-40-arraylist-cp-3",
        "label": "Explain internal array resizing, amortized O(1) appends, and O(N) positional insertions."
      }
    ],
    "practiceExercises": [
      {
        "id": "java-40-ex-1",
        "title": "Deduplicate ArrayList Preserving Order",
        "difficulty": "Beginner",
        "type": "coding",
        "prompt": "Remove duplicate elements from an ArrayList while preserving their original first-occurrence insertion order.",
        "solution": "import java.util.*;\n\npublic class DeduplicateList {\n    public static <T> List<T> deduplicate(List<T> list) {\n        return new ArrayList<>(new LinkedHashSet<>(list));\n    }\n    public static void main(String[] args) {\n        List<String> items = List.of(\"A\", \"B\", \"A\", \"C\", \"B\");\n        System.out.println(\"Deduplicated: \" + deduplicate(items));\n    }\n}",
        "explanation": "LinkedHashSet discards duplicates while maintaining the original insertion sequence."
      },
      {
        "id": "java-40-ex-2",
        "title": "Reverse Sublist in ArrayList In-Place",
        "difficulty": "Intermediate",
        "type": "coding",
        "prompt": "Reverse the elements of an ArrayList between index start and end in-place without creating a new list.",
        "solution": "import java.util.*;\n\npublic class ReverseSublist {\n    public static <T> void reverseRange(List<T> list, int start, int end) {\n        while (start < end) {\n            T temp = list.get(start);\n            list.set(start, list.get(end));\n            list.set(end, temp);\n            start++;\n            end--;\n        }\n    }\n    public static void main(String[] args) {\n        List<Integer> list = new ArrayList<>(List.of(1, 2, 3, 4, 5));\n        reverseRange(list, 1, 3);\n        System.out.println(\"Reversed sublist (1 to 3): \" + list);\n    }\n}",
        "explanation": "Two-pointer swapping using set(index, val) updates elements in-place with O(1) memory."
      },
      {
        "id": "java-40-ex-3",
        "title": "SubList View Modification Synchronization",
        "difficulty": "Advanced",
        "type": "coding",
        "prompt": "Demonstrate how modifying a List via its subList() view affects the backing list, and what happens if the backing list is modified structurally.",
        "solution": "import java.util.*;\n\npublic class SubListDemo {\n    public static void main(String[] args) {\n        List<String> list = new ArrayList<>(List.of(\"A\", \"B\", \"C\", \"D\"));\n        List<String> sub = list.subList(1, 3); // View of [\"B\", \"C\"]\n        sub.set(0, \"MODIFIED_B\");\n        System.out.println(\"Backing list reflects change: \" + list);\n\n        // Structural modification of backing list invalidates subList view:\n        list.add(\"E\");\n        try {\n            sub.get(0); // Throws ConcurrentModificationException!\n        } catch (ConcurrentModificationException e) {\n            System.out.println(\"subList invalidated after structural change to parent list.\");\n        }\n    }\n}",
        "explanation": "subList returns a window view into the parent list; modifying the parent list structurally invalidates the subList view."
      }
    ],
    "quizQuestions": [
      {
        "id": "java-40-q1",
        "question": "By what percentage does an ArrayList grow when its backing array is full in standard modern Java?",
        "options": [
          "100% (doubles)",
          "50% (1.5x)",
          "25%",
          "Fixed 10 elements"
        ],
        "correctOptionIndex": 1,
        "explanation": "In Java 8+, ArrayList grows by 50% using the bitwise formula `oldCapacity + (oldCapacity >> 1)`."
      },
      {
        "id": "java-40-q2",
        "question": "What is the time complexity of calling `list.add(0, element)` on an ArrayList containing N elements?",
        "options": [
          "O(1)",
          "O(log N)",
          "O(N)",
          "O(N^2)"
        ],
        "correctOptionIndex": 2,
        "explanation": "Inserting at index 0 requires shifting all N existing elements one position to the right via System.arraycopy, which takes O(N) linear time."
      }
    ],
    "revisionNotes": [
      "ArrayList is a resizable array with O(1) random access by index.",
      "Grows by 50% when full: `newCapacity = oldCapacity + (oldCapacity >> 1)`.",
      "Inserting or deleting from the beginning/middle requires O(n) element shifting."
    ]
  },
  {
    "id": "java-41-linkedlist",
    "moduleId": "java-m4",
    "moduleNumber": 4,
    "moduleTitle": "Java Collections Framework",
    "topicNumber": 41,
    "title": "LinkedList: Doubly-Linked Architecture, Deque & Locality of Reference",
    "language": "java",
    "level": "Beginner",
    "whyItMatters": "LinkedList implements both `List` and `Deque`. Understanding why modern software almost always prefers `ArrayList` and `ArrayDeque` over `LinkedList` due to CPU cache locality and pointer overhead is a hallmark of senior Java engineers.",
    "explanation": "In Java, `LinkedList` is a doubly-linked list where each element is stored inside an independent `Node` object on the Heap:\n`private static class Node<E> { E item; Node<E> next; Node<E> prev; }`\nKey Characteristics:\n1. Dual Interface: Implements both `List<E>` and `Deque<E>`, allowing it to serve as a queue, stack, or list.\n2. Time Complexity:\n   - Insertion/Deletion at ends (`addFirst`, `addLast`, `removeFirst`): $O(1)$ constant time.\n   - Access by Index `get(index)`: $O(n)$ time (must traverse pointers from head or tail, choosing whichever is closer).\n   - Positional insertion `add(index, element)`: $O(n)$ traversal + $O(1)$ pointer rewire.\n3. The Modern Dilemma — CPU Cache Locality vs Pointer Hopping:\n   Even though LinkedList has $O(1)$ insertion at ends, each Node allocates a 24-byte object on the Heap. Nodes are scattered across non-contiguous memory addresses, causing frequent CPU Cache Misses. `ArrayList` and `ArrayDeque` store elements contiguously in CPU L1/L2 cache lines, making them faster in real-world benchmarks even for many middle insertions.",
    "syntaxAndStructure": "// Using LinkedList as Deque / Queue:\nDeque<String> queue = new LinkedList<>();\nqueue.offer(\"First\"); // Enqueue\nString item = queue.poll(); // Dequeue O(1)\n\n// Using as List:\nList<String> list = new LinkedList<>();\nlist.add(\"Data\");",
    "codeExamples": [
      {
        "title": "LinkedList as a Double-Ended Queue (Deque)",
        "code": "import java.util.Deque;\nimport java.util.LinkedList;\n\npublic class LinkedListDequeDemo {\n    public static void main(String[] args) {\n        Deque<String> deque = new LinkedList<>();\n\n        // Add to both ends in O(1)\n        deque.addFirst(\"Middle\");\n        deque.addFirst(\"Head\");\n        deque.addLast(\"Tail\");\n\n        System.out.println(\"Deque state: \" + deque);\n\n        // Remove from both ends in O(1)\n        String first = deque.removeFirst();\n        String last = deque.removeLast();\n\n        System.out.println(\"Removed head: \" + first);\n        System.out.println(\"Removed tail: \" + last);\n        System.out.println(\"Remaining: \" + deque);\n    }\n}",
        "expectedOutput": "Deque state: [Head, Middle, Tail]\nRemoved head: Head\nRemoved tail: Tail\nRemaining: [Middle]",
        "explanation": "LinkedList maintains head and tail pointers, allowing O(1) insertion and removal at both ends without shifting elements."
      },
      {
        "title": "Demonstrating Indexed Access Traversal Overhead",
        "code": "import java.util.LinkedList;\n\npublic class LinkedListIndexTraversal {\n    public static void main(String[] args) {\n        LinkedList<String> letters = new LinkedList<>();\n        letters.add(\"A\");\n        letters.add(\"B\");\n        letters.add(\"C\");\n        letters.add(\"D\");\n\n        // get(index) traverses pointers from the nearest end (head or tail)\n        String middle = letters.get(2);\n        System.out.println(\"Element at index 2: \" + middle);\n    }\n}",
        "expectedOutput": "Element at index 2: C",
        "explanation": "Unlike ArrayList where get(index) computes memory offset in 1 CPU cycle, LinkedList get(index) walks node pointers sequentially."
      }
    ],
    "realWorldApplications": [
      "Scenarios requiring frequent head insertions where contiguous resizing arrays would suffer large memory copy overhead.",
      "Implementing LRU caches (often via `LinkedHashMap` which combines hashtables with doubly-linked lists)."
    ],
    "commonMistakes": [
      "Iterating through a LinkedList using `for (int i = 0; i < list.size(); i++) list.get(i);` resulting in disastrous $O(n^2)$ quadratic runtime. Always use an `Iterator` or enhanced for-each loop!",
      "Choosing `LinkedList` over `ArrayList` based on theoretical $O(1)$ insertion, without accounting for CPU cache miss latency.",
      "Using LinkedList for indexed access (get(i)), which requires O(N) node traversal compared to O(1) in ArrayList."
    ],
    "interviewRelevance": "Universal interview question: \"ArrayList vs LinkedList — which is faster and why?\", \"Why does iterating with get(i) cause O(n^2) on LinkedList?\", and \"What is cache locality?\"",
    "checkpoints": [
      {
        "id": "java-41-cp-1",
        "label": "Explain the internal doubly-linked node structure of Java LinkedList"
      },
      {
        "id": "java-41-cp-2",
        "label": "Articulate why CPU cache lines make ArrayList faster than LinkedList in practice"
      },
      {
        "id": "java-41-linkedlist-cp-3",
        "label": "Evaluate node pointer memory overhead and CPU cache miss implications of LinkedList."
      }
    ],
    "practiceExercises": [
      {
        "id": "java-41-ex-1",
        "title": "Quadratic vs Linear Iteration Trap",
        "difficulty": "Beginner",
        "type": "coding",
        "prompt": "Demonstrate why for(int i=0; i<list.size(); i++) get(i) is O(n^2) and rewrite it to O(n) using an Iterator.",
        "solution": "import java.util.*;\n\npublic class IterationComparison {\n    public static void main(String[] args) {\n        LinkedList<Integer> list = new LinkedList<>(List.of(10, 20, 30));\n        \n        // O(N) using Iterator / for-each\n        int sum = 0;\n        for (int val : list) {\n            sum += val; // Advances single pointer in O(1) per step!\n        }\n        System.out.println(\"O(N) Sum: \" + sum);\n    }\n}",
        "explanation": "get(i) restarts traversal from head/tail every time, causing 1 + 2 + ... + N = O(N^2) steps. Iterator retains pointer position in O(1)."
      },
      {
        "id": "java-41-ex-2",
        "title": "Implement Queue Using LinkedList",
        "difficulty": "Intermediate",
        "type": "coding",
        "prompt": "Implement a FIFO queue using LinkedList without throwing exceptions on empty queue checks.",
        "solution": "import java.util.*;\n\npublic class SafeQueue<T> {\n    private final LinkedList<T> list = new LinkedList<>();\n\n    public void enqueue(T item) { list.addLast(item); }\n    public T dequeue() { return list.pollFirst(); } // Returns null if empty\n    public T peek() { return list.peekFirst(); }\n\n    public static void main(String[] args) {\n        SafeQueue<String> q = new SafeQueue<>();\n        q.enqueue(\"A\");\n        q.enqueue(\"B\");\n        System.out.println(\"Dequeued: \" + q.dequeue());\n        System.out.println(\"Next peek: \" + q.peek());\n    }\n}",
        "explanation": "pollFirst() and peekFirst() safely return null when the list is empty, avoiding NoSuchElementException."
      },
      {
        "id": "java-41-ex-3",
        "title": "Memory Footprint Comparison (JOL Analysis)",
        "difficulty": "Advanced",
        "type": "conceptual",
        "prompt": "Calculate the heap memory overhead of storing 1,000,000 integers in ArrayList<Integer> vs LinkedList<Integer> on a 64-bit JVM.",
        "solution": "For each element:\n- ArrayList: 1 reference pointer (4 bytes with compressed OOPs) in the backing array + Integer object (16 bytes) = ~20 bytes per element.\n- LinkedList: Node object header (12 bytes) + item pointer (4 bytes) + next pointer (4 bytes) + prev pointer (4 bytes) + 8-byte alignment padding = 32 bytes for the Node + Integer object (16 bytes) = 48 bytes per element.\nLinkedList consumes 2.4x more heap memory due to massive node pointer overhead and object headers.",
        "explanation": "Doubly-linked nodes introduce enormous pointer and object header overhead on the JVM heap."
      }
    ],
    "quizQuestions": [
      {
        "id": "java-41-q1",
        "question": "What data structure is used internally by java.util.LinkedList?",
        "options": [
          "Singly-linked list with tail pointer",
          "Doubly-linked list with head and tail pointers",
          "Dynamic resizable array",
          "Circular buffer"
        ],
        "correctOptionIndex": 1,
        "explanation": "LinkedList is implemented as a doubly-linked list where each Node has `next` and `prev` pointers."
      },
      {
        "id": "java-41-q2",
        "question": "Why does accessing elements by index using `get(index)` take O(n) in LinkedList but O(1) in ArrayList?",
        "options": [
          "LinkedList is synchronized",
          "LinkedList must traverse node pointers sequentially from head or tail to reach the requested index",
          "ArrayList uses binary search for get()",
          "LinkedList does not support zero-based indexing"
        ],
        "correctOptionIndex": 1,
        "explanation": "Nodes in a linked list are scattered in memory without direct address arithmetic, requiring sequential traversal from head or tail."
      }
    ],
    "revisionNotes": [
      "LinkedList implements both `List` and `Deque` as a doubly-linked list.",
      "O(1) insertion/removal at head and tail; O(n) search and indexed access.",
      "ArrayList is generally faster in practice due to contiguous CPU cache lines."
    ]
  },
  {
    "id": "java-42-hashset-linkedhashset",
    "moduleId": "java-m4",
    "moduleNumber": 4,
    "moduleTitle": "Java Collections Framework",
    "topicNumber": 42,
    "title": "HashSet & LinkedHashSet: Hashing, Uniqueness & Insertion Order",
    "language": "java",
    "level": "Beginner",
    "whyItMatters": "Sets guarantee uniqueness of elements. Knowing that `HashSet` is backed by an internal `HashMap` and understanding how `LinkedHashSet` preserves insertion order using a doubly-linked list is essential for solving deduplication problems in DSA.",
    "explanation": "A `Set` is a collection that cannot contain duplicate elements.\n1. `HashSet`:\n   - Backed by an internal `HashMap<E, Object>` instance!\n   - When you call `hashSet.add(element)`, it executes `map.put(element, PRESENT)` where `PRESENT` is a dummy static `Object`.\n   - Uniqueness is determined by the element's `hashCode()` and `equals()` methods.\n   - Unordered: Makes no guarantees regarding iteration order; ordering can change when the hash table rehashes.\n   - Offers $O(1)$ average time complexity for add, remove, and contains.\n2. `LinkedHashSet`:\n   - Subclass of `HashSet` backed by an internal `LinkedHashMap`.\n   - Maintains a doubly-linked list running through all its entries.\n   - Preserves Insertion Order: Iterating over a `LinkedHashSet` yields elements in the exact order they were inserted.\n   - Performance: Slightly slower than `HashSet` on insertion due to linked list pointer maintenance, but faster iteration proportional to size rather than capacity.",
    "syntaxAndStructure": "// HashSet (Unordered, O(1))\nSet<String> set = new HashSet<>();\nset.add(\"apple\");\nset.add(\"banana\");\nset.add(\"apple\"); // Duplicate rejected (returns false)\n\n// LinkedHashSet (Insertion Order Preserved, O(1))\nSet<String> orderedSet = new LinkedHashSet<>();\norderedSet.add(\"first\");\norderedSet.add(\"second\");",
    "codeExamples": [
      {
        "title": "HashSet Uniqueness and Under-the-Hood HashMap Backing",
        "code": "import java.util.HashSet;\nimport java.util.Set;\n\npublic class HashSetUniquenessDemo {\n    public static void main(String[] args) {\n        Set<String> usernames = new HashSet<>();\n\n        // add() returns boolean indicating whether element was new\n        System.out.println(\"Add 'alice': \" + usernames.add(\"alice\")); // true\n        System.out.println(\"Add 'bob': \" + usernames.add(\"bob\"));     // true\n        System.out.println(\"Add duplicate 'alice': \" + usernames.add(\"alice\")); // false!\n\n        System.out.println(\"Total unique users: \" + usernames.size());\n        System.out.println(\"Contains 'alice': \" + usernames.contains(\"alice\"));\n    }\n}",
        "expectedOutput": "Add 'alice': true\nAdd 'bob': true\nAdd duplicate 'alice': false\nTotal unique users: 2\nContains 'alice': true",
        "explanation": "HashSet delegates to HashMap.put(). If the key already exists, the set returns false and discards the duplicate."
      },
      {
        "title": "HashSet (Unordered) vs LinkedHashSet (Insertion-Ordered)",
        "code": "import java.util.HashSet;\nimport java.util.LinkedHashSet;\nimport java.util.List;\nimport java.util.Set;\n\npublic class SetOrderingComparison {\n    public static void main(String[] args) {\n        List<String> input = List.of(\"Zebra\", \"Apple\", \"Mango\", \"Banana\");\n\n        // HashSet does NOT preserve insertion order\n        Set<String> hashSet = new HashSet<>(input);\n        System.out.println(\"HashSet (arbitrary hash order): \" + hashSet);\n\n        // LinkedHashSet strictly guarantees insertion order\n        Set<String> linkedHashSet = new LinkedHashSet<>(input);\n        System.out.println(\"LinkedHashSet (exact insertion order): \" + linkedHashSet);\n    }\n}",
        "expectedOutput": "HashSet (arbitrary hash order): [Apple, Zebra, Mango, Banana]\nLinkedHashSet (exact insertion order): [Zebra, Apple, Mango, Banana]",
        "explanation": "LinkedHashSet maintains a doubly-linked list across entries, guaranteeing that iteration matches original insertion sequence."
      }
    ],
    "realWorldApplications": [
      "Deduplicating stream records and tracking visited nodes in graph BFS/DFS traversals.",
      "Preserving input sequence order during deduplication (using LinkedHashSet)."
    ],
    "commonMistakes": [
      "Failing to override both `hashCode()` and `equals()` in custom objects added to a Set, causing duplicate objects to be stored.",
      "Assuming `HashSet` maintains insertion or alphabetical order; it is explicitly unordered.",
      "Inserting mutable objects into a HashSet and subsequently modifying their fields, corrupting hash bucket lookups."
    ],
    "interviewRelevance": "Universal interview question: \"How does HashSet work internally in Java?\", \"What is the return value of set.add() on duplicate?\", and \"Difference between HashSet and LinkedHashSet.\"",
    "checkpoints": [
      {
        "id": "java-42-cp-1",
        "label": "Explain how HashSet is implemented using an internal HashMap and dummy PRESENT value"
      },
      {
        "id": "java-42-cp-2",
        "label": "Contrast ordering guarantees between HashSet (none) and LinkedHashSet (insertion order)"
      },
      {
        "id": "java-42-hashset-linkedhashset-cp-3",
        "label": "Choose HashSet for O(1) set operations and LinkedHashSet when insertion order matters."
      }
    ],
    "practiceExercises": [
      {
        "id": "java-42-ex-1",
        "title": "Find First Duplicate in Array",
        "difficulty": "Beginner",
        "type": "coding",
        "prompt": "Use a HashSet to find the first recurring duplicate integer in an array in O(n) time.",
        "solution": "import java.util.*;\n\npublic class FirstDuplicate {\n    public static Integer findFirstDuplicate(int[] nums) {\n        Set<Integer> seen = new HashSet<>();\n        for (int n : nums) {\n            if (!seen.add(n)) return n; // add() returns false if already present\n        }\n        return null;\n    }\n    public static void main(String[] args) {\n        int[] arr = { 2, 5, 1, 2, 3, 5, 1 };\n        System.out.println(\"First duplicate: \" + findFirstDuplicate(arr));\n    }\n}",
        "explanation": "Leveraging the boolean return value of set.add() detects duplicates in a single linear pass."
      },
      {
        "id": "java-42-ex-2",
        "title": "Set Intersection and Union Operations",
        "difficulty": "Intermediate",
        "type": "coding",
        "prompt": "Given two sets A and B, compute their mathematical Union and Intersection using Set bulk methods.",
        "solution": "import java.util.*;\n\npublic class SetMathOperations {\n    public static void main(String[] args) {\n        Set<Integer> a = new HashSet<>(Set.of(1, 2, 3, 4));\n        Set<Integer> b = new HashSet<>(Set.of(3, 4, 5, 6));\n\n        // Union (a | b)\n        Set<Integer> union = new HashSet<>(a);\n        union.addAll(b);\n        System.out.println(\"Union: \" + union);\n\n        // Intersection (a & b)\n        Set<Integer> intersection = new HashSet<>(a);\n        intersection.retainAll(b);\n        System.out.println(\"Intersection: \" + intersection);\n    }\n}",
        "explanation": "addAll() performs set union; retainAll() performs set intersection."
      },
      {
        "id": "java-42-ex-3",
        "title": "Missing hashCode() Bug in HashSet",
        "difficulty": "Advanced",
        "type": "coding",
        "prompt": "Create a class Person with name and id that overrides equals() but NOT hashCode(). Demonstrate how duplicate persons can be added to a HashSet.",
        "solution": "import java.util.*;\n\nclass BadPerson {\n    int id;\n    BadPerson(int id) { this.id = id; }\n    @Override\n    public boolean equals(Object o) {\n        if (this == o) return true;\n        if (!(o instanceof BadPerson other)) return false;\n        return this.id == other.id;\n    }\n    // Missing hashCode() override! Uses identity hashCode!\n}\n\npublic class HashCodeViolationDemo {\n    public static void main(String[] args) {\n        Set<BadPerson> set = new HashSet<>();\n        set.add(new BadPerson(1));\n        set.add(new BadPerson(1));\n        System.out.println(\"Set size with duplicates: \" + set.size()); // Prints 2!\n    }\n}",
        "explanation": "Without overriding hashCode(), distinct instances land in different buckets, so equals() is never even checked."
      }
    ],
    "quizQuestions": [
      {
        "id": "java-42-q1",
        "question": "What data structure is used internally by java.util.HashSet to store its elements?",
        "options": [
          "A balanced Red-Black tree",
          "An internal java.util.HashMap instance",
          "A dynamic primitive array",
          "A circular queue"
        ],
        "correctOptionIndex": 1,
        "explanation": "HashSet is backed by a HashMap where set elements are stored as keys, mapped to a dummy dummy Object value."
      },
      {
        "id": "java-42-q2",
        "question": "What is the primary difference between HashSet and LinkedHashSet?",
        "options": [
          "LinkedHashSet allows duplicates, HashSet does not",
          "LinkedHashSet preserves insertion order; HashSet does not guarantee any order",
          "HashSet is sorted, LinkedHashSet is unsorted",
          "LinkedHashSet uses O(log n) tree search"
        ],
        "correctOptionIndex": 1,
        "explanation": "LinkedHashSet maintains a doubly-linked list through all its entries, preserving insertion order during iteration."
      }
    ],
    "revisionNotes": [
      "HashSet is backed by an internal HashMap; elements are stored as keys with a dummy value.",
      "LinkedHashSet preserves insertion order using a doubly-linked bucket list.",
      "Custom objects added to Sets MUST override both `equals()` and `hashCode()`."
    ]
  },
  {
    "id": "java-43-treeset",
    "moduleId": "java-m4",
    "moduleNumber": 4,
    "moduleTitle": "Java Collections Framework",
    "topicNumber": 43,
    "title": "TreeSet: Red-Black Tree, NavigableSet & Range Queries",
    "language": "java",
    "level": "Beginner",
    "whyItMatters": "When elements must remain continuously sorted with guaranteed O(log n) time complexity, `TreeSet` is the standard choice. Understanding `NavigableSet` range methods (`subSet`, `floor`, `ceiling`, `higher`, `lower`) is critical for interval and boundary algorithm problems.",
    "explanation": "A `TreeSet` is a `NavigableSet` implementation based on a self-balancing Red-Black Tree (backed by an internal `TreeMap`).\nKey Characteristics:\n1. Sorted Order: Elements are sorted according to their natural ordering (`Comparable`), or by a custom `Comparator` provided at construction time.\n2. Guaranteed $O(\\log n)$ Time: Basic operations (`add`, `remove`, `contains`) execute in $O(\\log n)$ time.\n3. Prohibits null (in modern Java): Inserting `null` throws `NullPointerException` because elements must be compared.\n4. `NavigableSet` Range Operations:\n   - `floor(e)`: Greatest element $\\le e$, or null.\n   - `ceiling(e)`: Smallest element $\\ge e$, or null.\n   - `lower(e)`: Greatest element $< e$, or null.\n   - `higher(e)`: Smallest element $> e$, or null.\n   - `subSet(from, fromInc, to, toInc)`: Returns a range view.\n5. Consistency with equals: A TreeSet determines element equality using `compareTo()` or `compare()`, NOT `equals()`! If `a.compareTo(b) == 0`, TreeSet treats them as duplicates.",
    "syntaxAndStructure": "// Natural ordering (requires Comparable):\nNavigableSet<Integer> set = new TreeSet<>();\nset.addAll(List.of(20, 10, 40, 30));\n\n// Custom descending comparator:\nSet<String> descSet = new TreeSet<>(Comparator.reverseOrder());\n\n// Navigable range queries:\nInteger atOrBelow = set.floor(25); // 20\nInteger atOrAbove = set.ceiling(25); // 30",
    "codeExamples": [
      {
        "title": "NavigableSet Boundary and Range Methods",
        "code": "import java.util.NavigableSet;\nimport java.util.TreeSet;\n\npublic class TreeSetNavigableDemo {\n    public static void main(String[] args) {\n        NavigableSet<Integer> scores = new TreeSet<>();\n        scores.add(10);\n        scores.add(25);\n        scores.add(50);\n        scores.add(75);\n        scores.add(90);\n\n        System.out.println(\"TreeSet natural sorted: \" + scores);\n        System.out.println(\"Floor of 30 (<= 30): \" + scores.floor(30));\n        System.out.println(\"Ceiling of 30 (>= 30): \" + scores.ceiling(30));\n        System.out.println(\"Lower than 25 (< 25): \" + scores.lower(25));\n        System.out.println(\"Higher than 50 (> 50): \" + scores.higher(50));\n\n        // SubSet range view [25, 75] inclusive\n        System.out.println(\"SubSet [25, 75]: \" + scores.subSet(25, true, 75, true));\n    }\n}",
        "expectedOutput": "TreeSet natural sorted: [10, 25, 50, 75, 90]\nFloor of 30 (<= 30): 25\nCeiling of 30 (>= 30): 50\nLower than 25 (< 25): 10\nHigher than 50 (> 50): 75\nSubSet [25, 75]: [25, 50, 75]",
        "explanation": "floor/ceiling include the boundary value if present; lower/higher are strictly exclusive. subSet provides a live window into the tree."
      },
      {
        "title": "Custom Comparator in TreeSet",
        "code": "import java.util.Comparator;\nimport java.util.TreeSet;\n\npublic class CustomTreeSetDemo {\n    static class Task {\n        String name;\n        int priority; // Higher is more urgent\n\n        Task(String n, int p) { this.name = n; this.priority = p; }\n        public String toString() { return name + \"(p=\" + priority + \")\"; }\n    }\n\n    public static void main(String[] args) {\n        // Sort descending by priority, then ascending by name\n        TreeSet<Task> tasks = new TreeSet<>(\n            Comparator.comparingInt((Task t) -> t.priority).reversed()\n                      .thenComparing(t -> t.name)\n        );\n\n        tasks.add(new Task(\"BugFix\", 2));\n        tasks.add(new Task(\"DeployProd\", 5));\n        tasks.add(new Task(\"CodeReview\", 2));\n\n        System.out.println(\"Priority Queue Tasks: \" + tasks);\n    }\n}",
        "expectedOutput": "Priority Queue Tasks: [DeployProd(p=5), BugFix(p=2), CodeReview(p=2)]",
        "explanation": "TreeSet sorts custom non-Comparable objects cleanly using Comparator chains. Notice secondary sorting by name prevents duplicate priority elimination."
      }
    ],
    "realWorldApplications": [
      "Leaderboards, interval scheduling, stock market order books (finding best bid/ask).",
      "Range searches for calendar events, reservations, and timestamp intervals."
    ],
    "commonMistakes": [
      "Adding custom objects that do not implement `Comparable` to a TreeSet without providing a `Comparator`, causing `ClassCastException` at runtime.",
      "Implementing a Comparator that compares only one field (e.g. `t1.priority - t2.priority`); two tasks with the same priority will be considered duplicates and one will be silently dropped!",
      "Inserting objects that do not implement Comparable into a TreeSet without providing an explicit Comparator."
    ],
    "interviewRelevance": "Crucial for coding rounds: \"What is the underlying data structure of TreeSet?\" (Red-Black tree) and \"How does TreeSet determine duplicate elements?\" (compareTo == 0, NOT equals).",
    "checkpoints": [
      {
        "id": "java-43-cp-1",
        "label": "Understand Red-Black tree self-balancing properties guaranteeing O(log n) operations"
      },
      {
        "id": "java-43-cp-2",
        "label": "Master NavigableSet boundary methods: floor, ceiling, lower, higher, and subSet"
      },
      {
        "id": "java-43-treeset-cp-3",
        "label": "Use TreeSet and NavigableSet for logarithmic sorted operations and range queries."
      }
    ],
    "practiceExercises": [
      {
        "id": "java-43-ex-1",
        "title": "Find Closest Meeting Slot",
        "difficulty": "Beginner",
        "type": "coding",
        "prompt": "Given a TreeSet of available room times in minutes, find the closest available time to a requested time target.",
        "solution": "import java.util.TreeSet;\n\npublic class MeetingScheduler {\n    public static Integer findClosest(TreeSet<Integer> times, int target) {\n        Integer floor = times.floor(target);\n        Integer ceil = times.ceiling(target);\n        if (floor == null) return ceil;\n        if (ceil == null) return floor;\n        return (target - floor <= ceil - target) ? floor : ceil;\n    }\n    public static void main(String[] args) {\n        TreeSet<Integer> slots = new TreeSet<>(java.util.List.of(900, 930, 1015, 1100));\n        System.out.println(\"Closest to 940: \" + findClosest(slots, 940));\n    }\n}",
        "explanation": "Comparing floor and ceiling distances finds the closest element in O(log n) time."
      },
      {
        "id": "java-43-ex-2",
        "title": "Sliding Window Contains Duplicate Within K Distance",
        "difficulty": "Intermediate",
        "type": "coding",
        "prompt": "Given int[] nums and int k, return true if there are two distinct indices i and j such that nums[i] == nums[j] and abs(i - j) <= k using a sliding window Set.",
        "solution": "import java.util.*;\n\npublic class ContainsNearbyDuplicate {\n    public static boolean check(int[] nums, int k) {\n        Set<Integer> window = new HashSet<>();\n        for (int i = 0; i < nums.length; i++) {\n            if (window.contains(nums[i])) return true;\n            window.add(nums[i]);\n            if (window.size() > k) {\n                window.remove(nums[i - k]);\n            }\n        }\n        return false;\n    }\n    public static void main(String[] args) {\n        int[] arr = { 1, 2, 3, 1 };\n        System.out.println(\"Contains nearby duplicate: \" + check(arr, 3));\n    }\n}",
        "explanation": "A sliding window set of size k maintains elements in the active index range in O(n) total time."
      },
      {
        "id": "java-43-ex-3",
        "title": "TreeSet compareTo Inconsistency with equals",
        "difficulty": "Advanced",
        "type": "conceptual",
        "prompt": "Explain what happens if a class implements Comparable where compareTo() is inconsistent with equals() (e.g. BigDecimal(\"2.0\") vs BigDecimal(\"2.00\")).",
        "solution": "For `BigDecimal(\"2.0\")` and `BigDecimal(\"2.00\")`, `equals()` returns FALSE because scale differs (1 vs 2). However, `compareTo()` returns 0 because their numerical values are identical. If you put both into a `HashSet`, both are kept (size = 2). If you put both into a `TreeSet`, the second is rejected as a duplicate (size = 1)! This is why the JLS strongly advises that natural ordering be consistent with equals.",
        "explanation": "TreeSet relies solely on compareTo() == 0 to determine uniqueness, ignoring equals()."
      }
    ],
    "quizQuestions": [
      {
        "id": "java-43-q1",
        "question": "What is the time complexity of add(), remove(), and contains() in a TreeSet with N elements?",
        "options": [
          "O(1)",
          "O(log N)",
          "O(N)",
          "O(N log N)"
        ],
        "correctOptionIndex": 1,
        "explanation": "TreeSet is backed by a balanced Red-Black binary search tree, guaranteeing $O(\\log N)$ time for search, insertion, and deletion."
      },
      {
        "id": "java-43-q2",
        "question": "Which method returns the greatest element in a NavigableSet strictly less than the given element e?",
        "options": [
          "floor(e)",
          "lower(e)",
          "ceiling(e)",
          "higher(e)"
        ],
        "correctOptionIndex": 1,
        "explanation": "`lower(e)` returns the greatest element strictly less than e, while `floor(e)` returns the greatest element less than or equal to e."
      }
    ],
    "revisionNotes": [
      "TreeSet is backed by a Red-Black Tree and keeps elements continuously sorted in O(log n) time.",
      "Uniqueness is determined by compareTo() == 0, NOT equals().",
      "NavigableSet provides range queries: floor, ceiling, lower, higher, subSet."
    ]
  },
  {
    "id": "java-44-hashmap",
    "moduleId": "java-m4",
    "moduleNumber": 4,
    "moduleTitle": "Java Collections Framework",
    "topicNumber": 44,
    "title": "HashMap: Hashing, Collision Resolution & Treeification (Java 8+)",
    "language": "java",
    "level": "Beginner",
    "whyItMatters": "HashMap is the most asked data structure in Java interviews. Understanding bucket arrays, bitwise index masking, hash distribution, and Java 8 Red-Black treeification (TREEIFY_THRESHOLD = 8) is mandatory for software engineering placement.",
    "explanation": "A `HashMap` is a hash-table based implementation of the `Map` interface.\nInternal Architecture (Java 8+):\n1. Bucket Array: An array of `Node<K, V>` references, initialized to a default capacity of 16.\n2. Hash Function: Computes index via `(n - 1) & hash`, where `hash = key.hashCode() ^ (key.hashCode() >>> 16)`. The XOR shift spreads entropy to the lower bits.\n3. Collision Resolution:\n   - Multiple keys hashing to the same bucket index form a linked list (Separate Chaining).\n   - Java 8 Treeification: When a single bucket exceeds `TREEIFY_THRESHOLD = 8` AND the total table capacity is at least `MIN_TREEIFY_CAPACITY = 64`, the bucket is converted from a linked list into a Red-Black Tree (`TreeNode`). This transforms worst-case search time from $O(n)$ to $O(\\log n)$, neutralizing Hash DoS attacks!\n   - Untreeification: When a bucket shrinks to `UNTREEIFY_THRESHOLD = 6`, it converts back to a linked list.\n4. Load Factor & Resizing: Default load factor is `0.75`. When `size > capacity * loadFactor` (e.g. 16 * 0.75 = 12), the table doubles in capacity (32), and elements are rehashed.\n5. Performance: $O(1)$ average time for `get()` and `put()`.",
    "syntaxAndStructure": "// Standard HashMap usage:\nMap<String, Integer> map = new HashMap<>();\nmap.put(\"Alice\", 100); // O(1) average\nint score = map.getOrDefault(\"Bob\", 0);\n\n// Java 8 Modern Methods:\nmap.putIfAbsent(\"Charlie\", 95);\nmap.computeIfAbsent(\"David\", k -> k.length() * 10);\nmap.merge(\"Alice\", 10, Integer::sum); // Increments to 110",
    "codeExamples": [
      {
        "title": "Modern Java 8+ HashMap Functional Methods",
        "code": "import java.util.HashMap;\nimport java.util.Map;\n\npublic class ModernHashMapMethodsDemo {\n    public static void main(String[] args) {\n        Map<String, Integer> wordCounts = new HashMap<>();\n\n        // 1. computeIfAbsent: Computes value if key is not present\n        wordCounts.computeIfAbsent(\"Java\", k -> 1);\n        System.out.println(\"After computeIfAbsent: \" + wordCounts);\n\n        // 2. merge: Atomic upsert/increment\n        // If \"Java\" exists, apply (oldVal, newVal) -> oldVal + newVal\n        wordCounts.merge(\"Java\", 1, Integer::sum);\n        wordCounts.merge(\"Java\", 1, Integer::sum);\n        wordCounts.merge(\"Python\", 1, Integer::sum);\n\n        System.out.println(\"After merge increments: \" + wordCounts);\n\n        // 3. getOrDefault: Safe retrieval without null checks\n        int cppCount = wordCounts.getOrDefault(\"C++\", 0);\n        System.out.println(\"C++ count: \" + cppCount);\n    }\n}",
        "expectedOutput": "After computeIfAbsent: {Java=1}\nAfter merge increments: {Java=3, Python=1}\nC++ count: 0",
        "explanation": "Modern HashMap methods like merge and computeIfAbsent eliminate verbose containsKey checks and provide clean functional updates."
      },
      {
        "title": "Demonstrating Hash Collisions with Same Bucket Index",
        "code": "import java.util.HashMap;\nimport java.util.Map;\n\npublic class HashCollisionDemo {\n    static class CollidingKey {\n        int id;\n        CollidingKey(int id) { this.id = id; }\n        // Force all keys into the exact same hash code to demonstrate collision handling\n        @Override\n        public int hashCode() { return 42; }\n        @Override\n        public boolean equals(Object o) {\n            if (!(o instanceof CollidingKey other)) return false;\n            return this.id == other.id;\n        }\n        @Override\n        public String toString() { return \"Key(\" + id + \")\"; }\n    }\n\n    public static void main(String[] args) {\n        Map<CollidingKey, String> map = new HashMap<>();\n        CollidingKey k1 = new CollidingKey(1);\n        CollidingKey k2 = new CollidingKey(2);\n\n        map.put(k1, \"First\");\n        map.put(k2, \"Second\");\n\n        // Both keys collide in the same bucket, but equals() differentiates them\n        System.out.println(\"Key 1 Value: \" + map.get(k1));\n        System.out.println(\"Key 2 Value: \" + map.get(k2));\n        System.out.println(\"Map size: \" + map.size());\n    }\n}",
        "expectedOutput": "Key 1 Value: First\nKey 2 Value: Second\nMap size: 2",
        "explanation": "When two keys share the exact same hash, HashMap stores them in the same bucket linked list/tree, disambiguating them via equals()."
      }
    ],
    "realWorldApplications": [
      "In-memory caches, symbol lookup tables in compilers, and indexing database records by primary key.",
      "Group-by and aggregation logic in data processing pipelines."
    ],
    "commonMistakes": [
      "Mutating an object after using it as a HashMap key; modifying the key mutates its hashCode, making the entry permanently lost and unretrievable!",
      "Using a custom key class without overriding both `equals()` and `hashCode()`.",
      "Failing to override hashCode() when overriding equals(), causing hash map lookups to fail for identical logical keys."
    ],
    "interviewRelevance": "Number one Java interview question: \"Explain the internal working of HashMap in Java 8\", \"What is treeification?\", and \"Why must capacity always be a power of two?\"",
    "checkpoints": [
      {
        "id": "java-44-cp-1",
        "label": "Explain how (n - 1) & hash calculates bucket index and why capacity is a power of 2"
      },
      {
        "id": "java-44-cp-2",
        "label": "Detail Java 8 treeification: TREEIFY_THRESHOLD (8) and worst-case O(log n)"
      },
      {
        "id": "java-44-hashmap-cp-3",
        "label": "Explain bucket indexing, load factors, collision resolution, and Java 8 Red-Black treeification."
      }
    ],
    "practiceExercises": [
      {
        "id": "java-44-ex-1",
        "title": "Group Anagrams Using HashMap",
        "difficulty": "Beginner",
        "type": "coding",
        "prompt": "Group an array of strings into lists of anagrams using a HashMap.",
        "solution": "import java.util.*;\n\npublic class GroupAnagrams {\n    public static List<List<String>> group(String[] strs) {\n        Map<String, List<String>> map = new HashMap<>();\n        for (String s : strs) {\n            char[] chars = s.toCharArray();\n            Arrays.sort(chars);\n            String sortedKey = new String(chars);\n            map.computeIfAbsent(sortedKey, k -> new ArrayList<>()).add(s);\n        }\n        return new ArrayList<>(map.values());\n    }\n    public static void main(String[] args) {\n        String[] words = { \"eat\", \"tea\", \"tan\", \"ate\", \"nat\", \"bat\" };\n        System.out.println(group(words));\n    }\n}",
        "explanation": "Sorted strings act as canonical keys, grouping anagrams in O(N * K log K) time."
      },
      {
        "id": "java-44-ex-2",
        "title": "Why Capacity is Always a Power of Two",
        "difficulty": "Intermediate",
        "type": "conceptual",
        "prompt": "Why does HashMap require capacity to be a power of two, and how does (n - 1) & hash replace modulus % n?",
        "solution": "Modulo `hash % n` is computationally expensive on CPUs. When n is a power of two (e.g. 16 = 00010000), `n - 1` is a continuous bitmask of 1s (15 = 00001111). Computing `(n - 1) & hash` performs bitwise AND in a single CPU cycle, producing the exact same result as modulus while running orders of magnitude faster.",
        "explanation": "Bitwise AND with (2^k - 1) is mathematically equivalent to modulus 2^k and executes in 1 clock cycle."
      },
      {
        "id": "java-44-ex-3",
        "title": "Mutable Key Memory Leak Trap",
        "difficulty": "Advanced",
        "type": "coding",
        "prompt": "Write a program demonstrating how mutating a key object makes it impossible to retrieve its value from a HashMap.",
        "solution": "import java.util.*;\n\nclass MutableKey {\n    int id;\n    MutableKey(int i) { this.id = i; }\n    public int hashCode() { return id; }\n    public boolean equals(Object o) {\n        return (o instanceof MutableKey other) && this.id == other.id;\n    }\n}\npublic class KeyMutationTrap {\n    public static void main(String[] args) {\n        Map<MutableKey, String> map = new HashMap<>();\n        MutableKey key = new MutableKey(10);\n        map.put(key, \"Original Value\");\n\n        // Mutating key field changes its hashCode!\n        key.id = 99;\n\n        // get() now looks in bucket 99 instead of bucket 10: returns null!\n        System.out.println(\"Lookup after mutation: \" + map.get(key)); // null\n        System.out.println(\"Map size still contains entry: \" + map.size()); // 1 (leaked!)\n    }\n}",
        "explanation": "Mutating keys alters their hash, stranding entries in old buckets and causing memory leaks. Keys should always be immutable."
      }
    ],
    "quizQuestions": [
      {
        "id": "java-44-q1",
        "question": "In Java 8, what occurs when a single HashMap bucket exceeds 8 entries and total map capacity is >= 64?",
        "options": [
          "The map throws an OutOfMemoryError",
          "The bucket converts from a linked list to a balanced Red-Black Tree (TreeNode)",
          "The oldest entry is evicted",
          "The load factor automatically resets to 1.0"
        ],
        "correctOptionIndex": 1,
        "explanation": "Java 8 treeifies bucket chains exceeding TREEIFY_THRESHOLD (8) into Red-Black trees to preserve O(log n) worst-case performance."
      },
      {
        "id": "java-44-q2",
        "question": "What is the default initial capacity and default load factor of a standard Java HashMap?",
        "options": [
          "16 and 0.75",
          "10 and 0.50",
          "32 and 0.80",
          "8 and 1.0"
        ],
        "correctOptionIndex": 0,
        "explanation": "A standard HashMap initializes with a default capacity of 16 and a load factor of 0.75 (resizing at 12 elements)."
      }
    ],
    "revisionNotes": [
      "HashMap uses bucket arrays, bitwise indexing `(n - 1) & hash`, and separate chaining.",
      "Java 8 converts linked lists with > 8 entries into Red-Black trees (O(log n) search).",
      "Always use immutable classes (like String or Integer) as HashMap keys."
    ]
  },
  {
    "id": "java-45-linkedhashmap",
    "moduleId": "java-m4",
    "moduleNumber": 4,
    "moduleTitle": "Java Collections Framework",
    "topicNumber": 45,
    "title": "LinkedHashMap: Insertion-Order, Access-Order & LRU Cache",
    "language": "java",
    "level": "Beginner",
    "whyItMatters": "LinkedHashMap combines the O(1) performance of HashMap with predictable iteration order. Setting `accessOrder = true` and overriding `removeEldestEntry()` allows implementing an in-memory LRU (Least Recently Used) cache in under 10 lines of code.",
    "explanation": "A `LinkedHashMap` extends `HashMap` and adds a doubly-linked list running through all its entries.\nTwo Ordering Modes:\n1. Insertion-Order (Default): Iterating over the map yields keys in the order they were inserted. Re-inserting an existing key does NOT alter its position.\n2. Access-Order (`accessOrder = true` in constructor):\n   - When an entry is accessed via `get()` or updated via `put()`, it is moved to the TAIL (end) of the doubly-linked list.\n   - The head of the list represents the Least Recently Used (LRU) entry, and the tail represents the Most Recently Used (MRU) entry.\n3. Building an LRU Cache:\n   - Overriding `protected boolean removeEldestEntry(Map.Entry eldest)` allows automatically evicting the oldest entry when size exceeds a fixed threshold.",
    "syntaxAndStructure": "// Constructor with accessOrder:\n// LinkedHashMap(initialCapacity, loadFactor, accessOrder)\nLinkedHashMap<K, V> lru = new LinkedHashMap<>(16, 0.75f, true) {\n    @Override\n    protected boolean removeEldestEntry(Map.Entry<K, V> eldest) {\n        return size() > MAX_ENTRIES; // Evict oldest\n    }\n};",
    "codeExamples": [
      {
        "title": "Building a Complete LRU Cache with LinkedHashMap",
        "code": "import java.util.LinkedHashMap;\nimport java.util.Map;\n\n// Elegant LRU Cache in 15 lines of code\nclass LRUCache<K, V> extends LinkedHashMap<K, V> {\n    private final int capacity;\n\n    public LRUCache(int capacity) {\n        // accessOrder = true enables LRU access tracking\n        super(capacity, 0.75f, true);\n        this.capacity = capacity;\n    }\n\n    @Override\n    protected boolean removeEldestEntry(Map.Entry<K, V> eldest) {\n        // Automatically evicts the least recently used entry when capacity is exceeded\n        return size() > capacity;\n    }\n}\n\npublic class LRUCacheDemo {\n    public static void main(String[] args) {\n        LRUCache<Integer, String> cache = new LRUCache<>(3);\n        cache.put(1, \"A\");\n        cache.put(2, \"B\");\n        cache.put(3, \"C\");\n        System.out.println(\"Initial Cache: \" + cache);\n\n        // Access key 1 (moves key 1 to the most recently used tail)\n        cache.get(1);\n\n        // Insert key 4 (evicts key 2, which is now the least recently used!)\n        cache.put(4, \"D\");\n\n        System.out.println(\"Cache after accessing 1 and adding 4: \" + cache);\n    }\n}",
        "expectedOutput": "Initial Cache: {1=A, 2=B, 3=C}\nCache after accessing 1 and adding 4: {3=C, 1=A, 4=D}",
        "explanation": "Accessing key 1 moved it to the MRU tail. When key 4 was inserted, key 2 (at the head) was evicted automatically."
      },
      {
        "title": "Insertion Order Preservation Comparison",
        "code": "import java.util.LinkedHashMap;\nimport java.util.Map;\n\npublic class InsertionOrderDemo {\n    public static void main(String[] args) {\n        Map<String, String> config = new LinkedHashMap<>();\n        config.put(\"Host\", \"localhost\");\n        config.put(\"Port\", \"8080\");\n        config.put(\"Environment\", \"Production\");\n\n        for (Map.Entry<String, String> e : config.entrySet()) {\n            System.out.println(e.getKey() + \": \" + e.getValue());\n        }\n    }\n}",
        "expectedOutput": "Host: localhost\nPort: 8080\nEnvironment: Production",
        "explanation": "LinkedHashMap guarantees that map entries iterate in the exact order they were inserted."
      }
    ],
    "realWorldApplications": [
      "In-memory page caches, session caches, and DNS lookup caches with fixed capacity bounds.",
      "Serializing JSON objects where key order must match input specifications."
    ],
    "commonMistakes": [
      "Forgetting that `LinkedHashMap` is not thread-safe; wrap with `Collections.synchronizedMap()` when shared across threads.",
      "Assuming `LinkedHashMap.get()` does not modify structure when `accessOrder = true`; calling `get()` modifies the internal doubly-linked list, causing `ConcurrentModificationException` during iteration!",
      "Expecting LinkedHashMap to maintain access-order when instantiated with the default constructor (which uses insertion-order)."
    ],
    "interviewRelevance": "Top-tier interview question: \"Implement an LRU Cache in Java\" (Answer: using LinkedHashMap with removeEldestEntry or using a custom Doubly-Linked List + HashMap).",
    "checkpoints": [
      {
        "id": "java-45-cp-1",
        "label": "Distinguish insertion-order from access-order in LinkedHashMap"
      },
      {
        "id": "java-45-cp-2",
        "label": "Implement an LRU cache by overriding removeEldestEntry()"
      },
      {
        "id": "java-45-linkedhashmap-cp-3",
        "label": "Build fixed-size LRU caches by setting accessOrder=true and overriding removeEldestEntry."
      }
    ],
    "practiceExercises": [
      {
        "id": "java-45-ex-1",
        "title": "LRU Cache Access Reordering Verification",
        "difficulty": "Beginner",
        "type": "coding",
        "prompt": "Create a LinkedHashMap with accessOrder=true and verify that get() moves an accessed key to the end of the entry set.",
        "solution": "import java.util.*;\n\npublic class AccessOrderVerify {\n    public static void main(String[] args) {\n        LinkedHashMap<String, Integer> map = new LinkedHashMap<>(16, 0.75f, true);\n        map.put(\"X\", 1);\n        map.put(\"Y\", 2);\n        map.put(\"Z\", 3);\n        map.get(\"X\"); // Access X\n        System.out.println(\"Keys after access: \" + new ArrayList<>(map.keySet()));\n    }\n}",
        "explanation": "Accessing \"X\" moves it from head to the end: keys iterate as [\"Y\", \"Z\", \"X\"]."
      },
      {
        "id": "java-45-ex-2",
        "title": "Thread-Safe LRU Cache Wrapper",
        "difficulty": "Intermediate",
        "type": "coding",
        "prompt": "Make the LRU Cache thread-safe for concurrent read and write access.",
        "solution": "import java.util.*;\n\npublic class ConcurrentLRU<K, V> {\n    private final Map<K, V> syncCache;\n\n    public ConcurrentLRU(int capacity) {\n        Map<K, V> base = new LinkedHashMap<>(capacity, 0.75f, true) {\n            @Override\n            protected boolean removeEldestEntry(Map.Entry<K, V> eldest) {\n                return size() > capacity;\n            }\n        };\n        this.syncCache = Collections.synchronizedMap(base);\n    }\n    public void put(K k, V v) { syncCache.put(k, v); }\n    public V get(K k) { return syncCache.get(k); }\n}",
        "explanation": "Wrapping LinkedHashMap with Collections.synchronizedMap synchronizes all access methods."
      },
      {
        "id": "java-45-ex-3",
        "title": "Custom Doubly-Linked List LRU Without LinkedHashMap",
        "difficulty": "Advanced",
        "type": "coding",
        "prompt": "Implement an LRU Cache using a raw HashMap<Integer, Node> and custom Doubly-Linked List in O(1) get and put.",
        "solution": "import java.util.HashMap;\nimport java.util.Map;\n\npublic class ManualLRUCache {\n    class DNode {\n        int key, val;\n        DNode prev, next;\n        DNode(int k, int v) { this.key = k; this.val = v; }\n    }\n\n    private final int cap;\n    private final Map<Integer, DNode> map = new HashMap<>();\n    private final DNode head = new DNode(0, 0), tail = new DNode(0, 0);\n\n    public ManualLRUCache(int capacity) {\n        this.cap = capacity;\n        head.next = tail;\n        tail.prev = head;\n    }\n\n    private void remove(DNode node) {\n        node.prev.next = node.next;\n        node.next.prev = node.prev;\n    }\n\n    private void insertAtHead(DNode node) {\n        node.next = head.next;\n        node.next.prev = node;\n        head.next = node;\n        node.prev = head;\n    }\n\n    public int get(int key) {\n        if (!map.containsKey(key)) return -1;\n        DNode node = map.get(key);\n        remove(node);\n        insertAtHead(node);\n        return node.val;\n    }\n\n    public void put(int key, int value) {\n        if (map.containsKey(key)) {\n            remove(map.get(key));\n        }\n        if (map.size() >= cap) {\n            DNode lru = tail.prev;\n            remove(lru);\n            map.remove(lru.key);\n        }\n        DNode node = new DNode(key, value);\n        insertAtHead(node);\n        map.put(key, node);\n    }\n}",
        "explanation": "Standard LeetCode 146 implementation combining HashMap for O(1) lookup and Doubly-Linked List for O(1) node movement."
      }
    ],
    "quizQuestions": [
      {
        "id": "java-45-q1",
        "question": "Which method should be overridden in a LinkedHashMap subclass to automatically evict old entries when capacity is exceeded?",
        "options": [
          "evictOldest()",
          "removeEldestEntry(Map.Entry eldest)",
          "cleanUp()",
          "pollLast()"
        ],
        "correctOptionIndex": 1,
        "explanation": "Overriding `protected boolean removeEldestEntry(Map.Entry eldest)` and returning `true` triggers automatic eviction of the least recently used entry."
      },
      {
        "id": "java-45-q2",
        "question": "What happens when accessOrder is set to true in LinkedHashMap and an entry is read with `map.get(key)`?",
        "options": [
          "The entry is deleted from the map",
          "The accessed entry is relocated to the tail of the iteration order",
          "The entry value is incremented",
          "Nothing, get() does not affect iteration order"
        ],
        "correctOptionIndex": 1,
        "explanation": "When accessOrder is true, get() moves the accessed entry to the tail (most recently used position) of the linked list."
      }
    ],
    "revisionNotes": [
      "LinkedHashMap maintains a doubly-linked list running through all entries.",
      "Supports insertion-order (default) and access-order (for LRU caches).",
      "Override `removeEldestEntry()` to build an LRU cache easily."
    ]
  },
  {
    "id": "java-46-treemap",
    "moduleId": "java-m4",
    "moduleNumber": 4,
    "moduleTitle": "Java Collections Framework",
    "topicNumber": 46,
    "title": "TreeMap: Red-Black Tree Map, NavigableMap & Range Submaps",
    "language": "java",
    "level": "Beginner",
    "whyItMatters": "TreeMap is the sorted map implementation in Java. It provides O(log n) guaranteed search and range queries (subMap, headMap, tailMap), forming the backbone of database B-Tree simulations and order matching engines.",
    "explanation": "A `TreeMap` is a `NavigableMap` implementation based on a self-balancing Red-Black Tree.\nKey Characteristics:\n1. Sorted Keys: Keys are sorted according to their natural ordering (`Comparable`), or by a custom `Comparator`.\n2. Guaranteed $O(\\log n)$ Time: `containsKey`, `get`, `put`, and `remove` execute in $O(\\log n)$ time.\n3. Prohibits null Keys: In modern Java, `put(null, val)` throws `NullPointerException` because keys must be compared.\n4. `NavigableMap` Range Operations:\n   - `firstEntry()` / `lastEntry()`: Accesses minimum/maximum key-value pair.\n   - `floorEntry(k)` / `ceilingEntry(k)`: Closest bounding entries.\n   - `headMap(toKey, inclusive)`: View of all entries with keys < toKey.\n   - `tailMap(fromKey, inclusive)`: View of all entries with keys >= fromKey.\n   - `subMap(fromKey, fromInc, toKey, toInc)`: Range view between two keys.",
    "syntaxAndStructure": "// Default natural sorted map:\nNavigableMap<Integer, String> treeMap = new TreeMap<>();\ntreeMap.put(100, \"Bronze\");\ntreeMap.put(500, \"Gold\");\n\n// Range query:\nMap.Entry<Integer, String> ceiling = treeMap.ceilingEntry(300); // 500=Gold\nNavigableMap<Integer, String> sub = treeMap.subMap(100, true, 400, true);",
    "codeExamples": [
      {
        "title": "NavigableMap Key Boundaries and Range Views",
        "code": "import java.util.Map;\nimport java.util.NavigableMap;\nimport java.util.TreeMap;\n\npublic class TreeMapNavigableDemo {\n    public static void main(String[] args) {\n        NavigableMap<Integer, String> ranks = new TreeMap<>();\n        ranks.put(10, \"Junior Developer\");\n        ranks.put(25, \"Software Engineer\");\n        ranks.put(50, \"Senior Engineer\");\n        ranks.put(80, \"Principal Architect\");\n\n        System.out.println(\"Sorted Ranks: \" + ranks);\n        System.out.println(\"First Entry: \" + ranks.firstEntry());\n        System.out.println(\"Last Entry: \" + ranks.lastEntry());\n\n        // Nearest boundary lookups\n        System.out.println(\"Floor entry for 30 (<= 30): \" + ranks.floorEntry(30));\n        System.out.println(\"Ceiling entry for 30 (>= 30): \" + ranks.ceilingEntry(30));\n\n        // SubMap range view [25, 80)\n        System.out.println(\"SubMap [25, 80): \" + ranks.subMap(25, true, 80, false));\n    }\n}",
        "expectedOutput": "Sorted Ranks: {10=Junior Developer, 25=Software Engineer, 50=Senior Engineer, 80=Principal Architect}\nFirst Entry: 10=Junior Developer\nLast Entry: 80=Principal Architect\nFloor entry for 30 (<= 30): 25=Software Engineer\nCeiling entry for 30 (>= 30): 50=Senior Engineer\nSubMap [25, 80): {25=Software Engineer, 50=Senior Engineer}",
        "explanation": "TreeMap provides logarithmic boundary lookups (floorEntry, ceilingEntry) and dynamic subMap views without scanning the whole dataset."
      },
      {
        "title": "Custom Comparator in TreeMap for Case-Insensitive Sorting",
        "code": "import java.util.Map;\nimport java.util.TreeMap;\n\npublic class CaseInsensitiveTreeMapDemo {\n    public static void main(String[] args) {\n        // String.CASE_INSENSITIVE_ORDER comparator\n        Map<String, String> map = new TreeMap<>(String.CASE_INSENSITIVE_ORDER);\n        map.put(\"java\", \"Language\");\n        map.put(\"PYTHON\", \"Scripting\");\n        map.put(\"c++\", \"Systems\");\n\n        System.out.println(\"Sorted Case-Insensitive: \" + map);\n        System.out.println(\"Lookup 'JAVA': \" + map.get(\"JAVA\")); // Finds \"java\"\n    }\n}",
        "expectedOutput": "Sorted Case-Insensitive: {c++=Systems, java=Language, PYTHON=Scripting}\nLookup 'JAVA': Language",
        "explanation": "Custom comparators govern both key sorting and key equality lookups in TreeMap."
      }
    ],
    "realWorldApplications": [
      "Financial order matching engines matching buy and sell orders at closest price thresholds.",
      "Time-series metrics and logging indexes where queries inspect time windows (`subMap(t1, t2)`)."
    ],
    "commonMistakes": [
      "Using keys that do not implement `Comparable` without passing a custom `Comparator`, triggering a runtime `ClassCastException`.",
      "Attempting to insert `null` keys into a TreeMap; throws `NullPointerException`.",
      "Assuming TreeMap supports null keys when using natural ordering, which throws NullPointerException."
    ],
    "interviewRelevance": "Frequent interview topic: \"HashMap vs TreeMap: trade-offs in time complexity and ordering\", \"How does TreeMap handle range queries?\", and \"What is the underlying data structure?\"",
    "checkpoints": [
      {
        "id": "java-46-cp-1",
        "label": "Understand Red-Black tree properties guaranteeing O(log n) key lookups in TreeMap"
      },
      {
        "id": "java-46-cp-2",
        "label": "Use NavigableMap range methods (subMap, headMap, tailMap, ceilingEntry)"
      },
      {
        "id": "java-46-treemap-cp-3",
        "label": "Perform range extractions and prefix searches using subMap, headMap, and tailMap."
      }
    ],
    "practiceExercises": [
      {
        "id": "java-46-ex-1",
        "title": "Find Next Timestamp Event",
        "difficulty": "Beginner",
        "type": "coding",
        "prompt": "Given a TreeMap of timestamp -> event, find the earliest event occurring after a target timestamp.",
        "solution": "import java.util.TreeMap;\n\npublic class NextEventFinder {\n    public static String getNextEvent(TreeMap<Long, String> events, long time) {\n        var entry = events.higherEntry(time);\n        return entry != null ? entry.getValue() : \"None\";\n    }\n    public static void main(String[] args) {\n        TreeMap<Long, String> log = new TreeMap<>();\n        log.put(1000L, \"Boot\");\n        log.put(2000L, \"Auth\");\n        log.put(3000L, \"Ready\");\n        System.out.println(\"Next after 1500: \" + getNextEvent(log, 1500L));\n    }\n}",
        "explanation": "higherEntry(time) finds the smallest key strictly greater than time in O(log n)."
      },
      {
        "id": "java-46-ex-2",
        "title": "Prefix Range Search in Dictionary",
        "difficulty": "Intermediate",
        "type": "coding",
        "prompt": "Use a TreeMap to find all words starting with prefix \"pre\" using subMap.",
        "solution": "import java.util.*;\n\npublic class PrefixSearch {\n    public static NavigableMap<String, String> getPrefixWords(TreeMap<String, String> dict, String prefix) {\n        String start = prefix;\n        String end = prefix + Character.MAX_VALUE;\n        return dict.subMap(start, true, end, true);\n    }\n    public static void main(String[] args) {\n        TreeMap<String, String> dict = new TreeMap<>();\n        dict.put(\"post\", \"after\");\n        dict.put(\"prefix\", \"before\");\n        dict.put(\"prepare\", \"make ready\");\n        dict.put(\"preheat\", \"heat before\");\n        dict.put(\"query\", \"search\");\n        System.out.println(\"Words with 'pre': \" + getPrefixWords(dict, \"pre\").keySet());\n    }\n}",
        "explanation": "subMap(prefix, prefix + Character.MAX_VALUE) creates a range view capturing all strings starting with that prefix."
      },
      {
        "id": "java-46-ex-3",
        "title": "My Calendar I Interval Booking (LeetCode 729)",
        "difficulty": "Advanced",
        "type": "coding",
        "prompt": "Implement a calendar booking system that returns false if a new event [start, end) conflicts with existing bookings using TreeMap in O(log n).",
        "solution": "import java.util.TreeMap;\n\npublic class MyCalendar {\n    private final TreeMap<Integer, Integer> bookings = new TreeMap<>();\n\n    public boolean book(int start, int end) {\n        Integer prev = bookings.floorKey(start);\n        if (prev != null && bookings.get(prev) > start) return false; // Overlaps with previous\n\n        Integer next = bookings.ceilingKey(start);\n        if (next != null && next < end) return false; // Overlaps with next\n\n        bookings.put(start, end);\n        return true;\n    }\n    public static void main(String[] args) {\n        MyCalendar cal = new MyCalendar();\n        System.out.println(\"Book 10-20: \" + cal.book(10, 20)); // true\n        System.out.println(\"Book 15-25: \" + cal.book(15, 25)); // false\n        System.out.println(\"Book 20-30: \" + cal.book(20, 30)); // true\n    }\n}",
        "explanation": "Using floorKey and ceilingKey checks adjacent intervals in O(log n) time without scanning all bookings."
      }
    ],
    "quizQuestions": [
      {
        "id": "java-46-q1",
        "question": "Can a java.util.TreeMap store a `null` key in modern Java?",
        "options": [
          "Yes, up to one null key is allowed like in HashMap",
          "No, attempting to insert a null key throws a NullPointerException because keys must be compared",
          "Only if the comparator handles null",
          "Only if the map is empty"
        ],
        "correctOptionIndex": 1,
        "explanation": "TreeMap requires keys to be compared. Attempting to compare null throws a NullPointerException."
      },
      {
        "id": "java-46-q2",
        "question": "What interface is extended by TreeMap that provides range methods like subMap, floorEntry, and ceilingEntry?",
        "options": [
          "java.util.SortedMap",
          "java.util.NavigableMap",
          "java.util.ConcurrentMap",
          "java.util.IndexedMap"
        ],
        "correctOptionIndex": 1,
        "explanation": "TreeMap implements `java.util.NavigableMap`, which extends `SortedMap` with bidirectional navigation and boundary queries."
      }
    ],
    "revisionNotes": [
      "TreeMap stores keys in a self-balancing Red-Black Tree in sorted order (O(log n) operations).",
      "Does not permit `null` keys.",
      "NavigableMap interface provides range queries: subMap, floorEntry, ceilingEntry."
    ]
  },
  {
    "id": "java-47-queue-deque",
    "moduleId": "java-m4",
    "moduleNumber": 4,
    "moduleTitle": "Java Collections Framework",
    "topicNumber": 47,
    "title": "Queue & Deque: FIFO Processing, Double-Ended Queues & Implementations",
    "language": "java",
    "level": "Beginner",
    "whyItMatters": "Queue and Deque interfaces power Breadth-First Search (BFS), task scheduling, sliding window algorithms, and worker thread job distribution. Understanding exception-throwing vs special-value returning methods is an essential coding interview topic.",
    "explanation": "1. `Queue<E>`: Models a First-In-First-Out (FIFO) collection.\n   Methods come in two flavors:\n   - Throws Exception on failure: `add(e)` (throws IllegalStateException if full), `remove()` (throws NoSuchElementException if empty), `element()` (throws exception).\n   - Returns Special Value (null or false): `offer(e)` (returns false if full), `poll()` (returns null if empty), `peek()` (returns null if empty).\n   Best Practice: In modern programming, always prefer `offer()`, `poll()`, and `peek()`!\n2. `Deque<E>` (Double-Ended Queue, pronounced \"Deck\"):\n   - Supports insertion, removal, and retrieval at BOTH ends.\n   - Dual-personality: can act as a FIFO Queue or a LIFO Stack.\n   - Methods: `offerFirst()`, `offerLast()`, `pollFirst()`, `pollLast()`, `peekFirst()`, `peekLast()`.\n   - Standard concrete implementations: `ArrayDeque` (resizable circular array buffer, best choice) and `LinkedList`.",
    "syntaxAndStructure": "// Standard FIFO Queue:\nQueue<String> queue = new ArrayDeque<>();\nqueue.offer(\"task1\");\nString next = queue.poll(); // Returns null if empty\n\n// Double-Ended Queue (Deque):\nDeque<Integer> deque = new ArrayDeque<>();\ndeque.offerFirst(10);\ndeque.offerLast(20);\nint head = deque.pollFirst();\nint tail = deque.pollLast();",
    "codeExamples": [
      {
        "title": "Queue Method Matrix: Exception vs Safe Return",
        "code": "import java.util.ArrayDeque;\nimport java.util.Queue;\n\npublic class QueueMethodMatrixDemo {\n    public static void main(String[] args) {\n        Queue<String> tasks = new ArrayDeque<>();\n\n        // 1. Safe insertion with offer()\n        tasks.offer(\"Compile\");\n        tasks.offer(\"Test\");\n        tasks.offer(\"Package\");\n\n        // 2. Safe inspection with peek()\n        System.out.println(\"Head of queue without removing: \" + tasks.peek());\n\n        // 3. Safe retrieval with poll()\n        while (!tasks.isEmpty()) {\n            System.out.println(\"Processing: \" + tasks.poll());\n        }\n\n        // Safe poll on empty queue returns null without throwing exception!\n        System.out.println(\"Poll on empty queue: \" + tasks.poll());\n    }\n}",
        "expectedOutput": "Head of queue without removing: Compile\nProcessing: Compile\nProcessing: Test\nProcessing: Package\nPoll on empty queue: null",
        "explanation": "offer(), poll(), and peek() return false/null instead of crashing with NoSuchElementException when handling boundary conditions."
      },
      {
        "title": "Breadth-First Search (BFS) Traversal Using Queue",
        "code": "import java.util.ArrayDeque;\nimport java.util.List;\nimport java.util.Queue;\n\npublic class QueueBFSTraversalDemo {\n    public static void main(String[] args) {\n        // Simulating level-order traversal of nodes\n        Queue<String> levelQueue = new ArrayDeque<>();\n        levelQueue.offer(\"Root\");\n\n        int level = 0;\n        while (!levelQueue.isEmpty()) {\n            int levelSize = levelQueue.size();\n            System.out.print(\"Level \" + level + \": \");\n\n            for (int i = 0; i < levelSize; i++) {\n                String node = levelQueue.poll();\n                System.out.print(node + \" \");\n\n                // Enqueue children\n                if (node.equals(\"Root\")) {\n                    levelQueue.offer(\"Child_A\");\n                    levelQueue.offer(\"Child_B\");\n                }\n            }\n            System.out.println();\n            level++;\n        }\n    }\n}",
        "expectedOutput": "Level 0: Root \nLevel 1: Child_A Child_B ",
        "explanation": "Queue is the canonical data structure for level-by-level BFS traversal, guaranteeing FIFO visitation order."
      }
    ],
    "realWorldApplications": [
      "Task scheduling and asynchronous background job queues (ActiveMQ, RabbitMQ, Celery consumers).",
      "Breadth-First Search (BFS) shortest path algorithms in unweighted graphs and grids."
    ],
    "commonMistakes": [
      "Using `remove()` or `element()` without checking `isEmpty()`, causing `NoSuchElementException` crashes.",
      "Using `LinkedList` instead of `ArrayDeque` for standard queues; ArrayDeque has lower memory overhead and much faster cache locality.",
      "Calling element() or remove() on an empty Queue instead of peek() or poll(), triggering NoSuchElementException."
    ],
    "interviewRelevance": "Universal interview question: \"Difference between add/remove and offer/poll in Queue?\", \"How do you implement BFS?\", and \"Why is ArrayDeque preferred over LinkedList for queues?\"",
    "checkpoints": [
      {
        "id": "java-47-cp-1",
        "label": "Memorize the two method sets in Queue: (add/remove/element) vs (offer/poll/peek)"
      },
      {
        "id": "java-47-cp-2",
        "label": "Use ArrayDeque as the high-performance standard implementation for Queue and Deque"
      },
      {
        "id": "java-47-queue-deque-cp-3",
        "label": "Use Deque (ArrayDeque) as the standard FIFO queue and LIFO stack in Java."
      }
    ],
    "practiceExercises": [
      {
        "id": "java-47-ex-1",
        "title": "Generate Binary Numbers from 1 to N Using Queue",
        "difficulty": "Beginner",
        "type": "coding",
        "prompt": "Generate binary representations of numbers from 1 to N using a Queue (e.g. 1 -> \"1\", 2 -> \"10\", 3 -> \"11\").",
        "solution": "import java.util.*;\n\npublic class GenerateBinaryQueue {\n    public static List<String> generate(int n) {\n        List<String> res = new ArrayList<>();\n        Queue<String> q = new ArrayDeque<>();\n        q.offer(\"1\");\n        for (int i = 0; i < n; i++) {\n            String curr = q.poll();\n            res.add(curr);\n            q.offer(curr + \"0\");\n            q.offer(curr + \"1\");\n        }\n        return res;\n    }\n    public static void main(String[] args) {\n        System.out.println(generate(5)); // [\"1\", \"10\", \"11\", \"100\", \"101\"]\n    }\n}",
        "explanation": "Enqueuing curr + \"0\" and curr + \"1\" produces continuous binary counts in linear time."
      },
      {
        "id": "java-47-ex-2",
        "title": "Sliding Window Maximum Using Monotonic Deque",
        "difficulty": "Intermediate",
        "type": "coding",
        "prompt": "Find the maximum value in each sliding window of size k using a Deque in O(n) total time.",
        "solution": "import java.util.*;\n\npublic class SlidingWindowMaxDeque {\n    public static int[] maxSlidingWindow(int[] nums, int k) {\n        if (nums.length == 0) return new int[0];\n        int n = nums.length;\n        int[] res = new int[n - k + 1];\n        Deque<Integer> deque = new ArrayDeque<>(); // Stores indices\n\n        for (int i = 0; i < n; i++) {\n            // Remove out of window indices from front\n            while (!deque.isEmpty() && deque.peekFirst() < i - k + 1) {\n                deque.pollFirst();\n            }\n            // Maintain monotonically decreasing order from back\n            while (!deque.isEmpty() && nums[deque.peekLast()] < nums[i]) {\n                deque.pollLast();\n            }\n            deque.offerLast(i);\n            if (i >= k - 1) {\n                res[i - k + 1] = nums[deque.peekFirst()];\n            }\n        }\n        return res;\n    }\n    public static void main(String[] args) {\n        int[] arr = { 1, 3, -1, -3, 5, 3, 6, 7 };\n        System.out.println(Arrays.toString(maxSlidingWindow(arr, 3)));\n    }\n}",
        "explanation": "A monotonic double-ended queue maintains max elements at the head, achieving O(N) total amortized time."
      },
      {
        "id": "java-47-ex-3",
        "title": "ArrayDeque Circular Buffer Bitwise Masking",
        "difficulty": "Advanced",
        "type": "conceptual",
        "prompt": "How does ArrayDeque implement its circular head and tail pointer movement without using modulo % length?",
        "solution": "Like HashMap, `ArrayDeque` enforces that its internal array capacity is always a power of two (default 16). The head and tail pointers wrap around using bitwise masking: `head = (head - 1) & (elements.length - 1)` for decrementing, and `tail = (tail + 1) & (elements.length - 1)` for incrementing. This wraps negative values and indices back to the array bounds in a single clock cycle without division.",
        "explanation": "Power-of-two circular buffer masking eliminates costly modulus operations in high-throughput queues."
      }
    ],
    "quizQuestions": [
      {
        "id": "java-47-q1",
        "question": "What does `queue.poll()` return when invoked on an empty Queue?",
        "options": [
          "Throws NoSuchElementException",
          "Returns null without throwing an exception",
          "Throws IllegalStateException",
          "Blocks the current thread indefinitely"
        ],
        "correctOptionIndex": 1,
        "explanation": "`poll()` safely returns null when the queue is empty, whereas `remove()` throws NoSuchElementException."
      },
      {
        "id": "java-47-q2",
        "question": "Which concrete class is the recommended, fastest implementation of both Queue and Deque for single-threaded usage?",
        "options": [
          "java.util.LinkedList",
          "java.util.ArrayDeque",
          "java.util.Vector",
          "java.util.Stack"
        ],
        "correctOptionIndex": 1,
        "explanation": "`ArrayDeque` is backed by a circular resizable array and is significantly faster and more cache-efficient than `LinkedList`."
      }
    ],
    "revisionNotes": [
      "Queue: FIFO collection; prefer `offer()`, `poll()`, and `peek()` for null-safe operations.",
      "Deque: Double-ended queue supporting insertion/removal at both ends.",
      "ArrayDeque is faster and consumes less memory than LinkedList for both queues and stacks."
    ]
  },
  {
    "id": "java-48-priorityqueue",
    "moduleId": "java-m4",
    "moduleNumber": 4,
    "moduleTitle": "Java Collections Framework",
    "topicNumber": 48,
    "title": "PriorityQueue: Min-Heap, Max-Heap & Binary Heap Mechanics",
    "language": "java",
    "level": "Beginner",
    "whyItMatters": "PriorityQueue is the standard binary heap implementation in Java. It is essential for Dijkstra's shortest path algorithm, Prim's MST, Huffman coding, and solving \"Top-K Elements\" placement interview questions.",
    "explanation": "A `PriorityQueue` is an unbounded priority queue based on a Binary Heap.\nKey Characteristics:\n1. Min-Heap by Default: Elements are ordered naturally (`Comparable`) where the MINIMUM element sits at the head (`peek()` returns minimum element in $O(1)$).\n2. Max-Heap Creation: To create a Max-Heap, pass a reverse comparator:\n   `PriorityQueue<Integer> maxHeap = new PriorityQueue<>(Comparator.reverseOrder());`\n3. Time Complexity:\n   - `offer(e)` (insertion / sift-up): $O(\\log n)$ time.\n   - `poll()` (extract-min / sift-down): $O(\\log n)$ time.\n   - `peek()` (inspect minimum): $O(1)$ constant time.\n   - `remove(o)` (arbitrary element removal): $O(n)$ linear scan + $O(\\log n)$ sift.\n4. Array Representation of Binary Heap:\n   Stored in contiguous array `Object[] queue`:\n   - Parent index of $i$: `(i - 1) >>> 1`\n   - Left child index: `(2 * i) + 1`\n   - Right child index: `(2 * i) + 2`\n5. Iteration Order: Iterating over a PriorityQueue (`for (int x : pq)`) DOES NOT guarantee sorted order! It only guarantees the root is minimum. To process in sorted order, you must repeatedly call `poll()`.",
    "syntaxAndStructure": "// Default Min-Heap:\nPriorityQueue<Integer> minHeap = new PriorityQueue<>();\nminHeap.offer(40);\nminHeap.offer(10);\nint smallest = minHeap.poll(); // 10\n\n// Custom Max-Heap:\nPriorityQueue<Integer> maxHeap = new PriorityQueue<>(Collections.reverseOrder());\nmaxHeap.offer(40);\nmaxHeap.offer(10);\nint largest = maxHeap.poll(); // 40",
    "codeExamples": [
      {
        "title": "Min-Heap vs Max-Heap Extraction",
        "code": "import java.util.Collections;\nimport java.util.PriorityQueue;\n\npublic class HeapComparisonDemo {\n    public static void main(String[] args) {\n        int[] scores = { 45, 12, 85, 32, 89, 42 };\n\n        // 1. Min-Heap (default)\n        PriorityQueue<Integer> minHeap = new PriorityQueue<>();\n        for (int s : scores) minHeap.offer(s);\n\n        System.out.print(\"Min-Heap extraction order: \");\n        while (!minHeap.isEmpty()) {\n            System.out.print(minHeap.poll() + \" \");\n        }\n        System.out.println();\n\n        // 2. Max-Heap (Collections.reverseOrder)\n        PriorityQueue<Integer> maxHeap = new PriorityQueue<>(Collections.reverseOrder());\n        for (int s : scores) maxHeap.offer(s);\n\n        System.out.print(\"Max-Heap extraction order: \");\n        while (!maxHeap.isEmpty()) {\n            System.out.print(maxHeap.poll() + \" \");\n        }\n        System.out.println();\n    }\n}",
        "expectedOutput": "Min-Heap extraction order: 12 32 42 45 85 89 \nMax-Heap extraction order: 89 85 45 42 32 12 ",
        "explanation": "Repeatedly polling from a min-heap extracts numbers in ascending order. Polling from a max-heap extracts numbers in descending order."
      },
      {
        "title": "Top-K Largest Elements Pattern Using Min-Heap of Size K",
        "code": "import java.util.List;\nimport java.util.PriorityQueue;\n\npublic class TopKElementsDemo {\n    public static PriorityQueue<Integer> findTopK(int[] nums, int k) {\n        // Keep a Min-Heap of fixed size K\n        PriorityQueue<Integer> minHeap = new PriorityQueue<>(k);\n        for (int n : nums) {\n            minHeap.offer(n);\n            if (minHeap.size() > k) {\n                minHeap.poll(); // Evict smallest element among the k+1 elements\n            }\n        }\n        return minHeap; // Holds the k largest elements!\n    }\n\n    public static void main(String[] args) {\n        int[] stream = { 3, 10, 1000, -4, 50, 200, 15, 800 };\n        PriorityQueue<Integer> top3 = findTopK(stream, 3);\n\n        System.out.println(\"Top 3 largest elements: \" + top3);\n        System.out.println(\"3rd largest element: \" + top3.peek());\n    }\n}",
        "expectedOutput": "Top 3 largest elements: [200, 800, 1000]\n3rd largest element: 200",
        "explanation": "Maintaining a min-heap of size K processes an N-element stream in O(N log K) time and O(K) space, far faster than sorting O(N log N)."
      }
    ],
    "realWorldApplications": [
      "Dijkstra’s algorithm for finding the shortest path in network routing.",
      "Real-time streaming analytics finding top-K trending hashtags or products."
    ],
    "commonMistakes": [
      "Expecting a `for-each` loop on a PriorityQueue to print elements in sorted order; only `poll()` guarantees priority retrieval.",
      "Inserting `null` into a PriorityQueue; throws `NullPointerException` because elements cannot be compared.",
      "Assuming iterating over a PriorityQueue yields elements in sorted order; only poll() guarantees priority ordering."
    ],
    "interviewRelevance": "Universal interview question: \"How to find K-th largest element in an array?\", \"Time complexity of heapify vs heap sort\", and \"Explain sift-up and sift-down operations.\"",
    "checkpoints": [
      {
        "id": "java-48-cp-1",
        "label": "Explain binary heap array indexing: parent = (i-1)/2, children = 2i+1, 2i+2"
      },
      {
        "id": "java-48-cp-2",
        "label": "Solve Top-K problems in O(N log K) time using a size-K Min-Heap"
      },
      {
        "id": "java-48-priorityqueue-cp-3",
        "label": "Configure min-heaps and max-heaps with custom Comparators for Top-K element queries."
      }
    ],
    "practiceExercises": [
      {
        "id": "java-48-ex-1",
        "title": "Find Kth Largest Element in Array",
        "difficulty": "Beginner",
        "type": "coding",
        "prompt": "Implement findKthLargest(int[] nums, int k) using a Min-Heap.",
        "solution": "import java.util.PriorityQueue;\n\npublic class KthLargestFinder {\n    public static int findKthLargest(int[] nums, int k) {\n        PriorityQueue<Integer> pq = new PriorityQueue<>(k);\n        for (int n : nums) {\n            pq.offer(n);\n            if (pq.size() > k) pq.poll();\n        }\n        return pq.peek();\n    }\n    public static void main(String[] args) {\n        int[] arr = { 3, 2, 1, 5, 6, 4 };\n        System.out.println(\"2nd largest: \" + findKthLargest(arr, 2)); // 5\n    }\n}",
        "explanation": "Maintains a size-K min-heap where the root is the Kth largest element."
      },
      {
        "id": "java-48-ex-2",
        "title": "Merge K Sorted Lists",
        "difficulty": "Intermediate",
        "type": "coding",
        "prompt": "Merge K sorted integer arrays into a single sorted list using a PriorityQueue in O(N log K) time.",
        "solution": "import java.util.*;\n\npublic class MergeKSorted {\n    static class Element {\n        int val, arrIdx, elemIdx;\n        Element(int v, int a, int e) { this.val = v; this.arrIdx = a; this.elemIdx = e; }\n    }\n\n    public static List<Integer> mergeK(int[][] arrays) {\n        List<Integer> res = new ArrayList<>();\n        PriorityQueue<Element> pq = new PriorityQueue<>(Comparator.comparingInt(e -> e.val));\n\n        for (int i = 0; i < arrays.length; i++) {\n            if (arrays[i].length > 0) pq.offer(new Element(arrays[i][0], i, 0));\n        }\n\n        while (!pq.isEmpty()) {\n            Element curr = pq.poll();\n            res.add(curr.val);\n            if (curr.elemIdx + 1 < arrays[curr.arrIdx].length) {\n                pq.offer(new Element(arrays[curr.arrIdx][curr.elemIdx + 1], curr.arrIdx, curr.elemIdx + 1));\n            }\n        }\n        return res;\n    }\n    public static void main(String[] args) {\n        int[][] arrs = { {1, 4, 7}, {2, 5, 8}, {3, 6, 9} };\n        System.out.println(\"Merged: \" + mergeK(arrs));\n    }\n}",
        "explanation": "Extracts the minimum among K active array heads in O(log K) per element."
      },
      {
        "id": "java-48-ex-3",
        "title": "Continuous Median Finder with Two Heaps",
        "difficulty": "Advanced",
        "type": "coding",
        "prompt": "Design a data structure MedianFinder supporting addNum(int) in O(log n) and findMedian() in O(1) using two heaps (Min-Heap and Max-Heap).",
        "solution": "import java.util.*;\n\npublic class MedianFinder {\n    private final PriorityQueue<Integer> maxHeap = new PriorityQueue<>(Collections.reverseOrder()); // Lower half\n    private final PriorityQueue<Integer> minHeap = new PriorityQueue<>(); // Upper half\n\n    public void addNum(int num) {\n        maxHeap.offer(num);\n        minHeap.offer(maxHeap.poll());\n        if (minHeap.size() > maxHeap.size()) {\n            maxHeap.offer(minHeap.poll());\n        }\n    }\n\n    public double findMedian() {\n        if (maxHeap.size() > minHeap.size()) return maxHeap.peek();\n        return (maxHeap.peek() + minHeap.peek()) / 2.0;\n    }\n    public static void main(String[] args) {\n        MedianFinder mf = new MedianFinder();\n        mf.addNum(1);\n        mf.addNum(2);\n        System.out.println(\"Median of 1, 2: \" + mf.findMedian());\n        mf.addNum(3);\n        System.out.println(\"Median of 1, 2, 3: \" + mf.findMedian());\n    }\n}",
        "explanation": "Balancing two heaps keeps the median at the top of the heaps for O(1) median retrieval."
      }
    ],
    "quizQuestions": [
      {
        "id": "java-48-q1",
        "question": "By default, what type of heap is instantiated by `new PriorityQueue<>()` in Java?",
        "options": [
          "Max-Heap",
          "Min-Heap",
          "Fibonacci Heap",
          "Binomial Heap"
        ],
        "correctOptionIndex": 1,
        "explanation": "PriorityQueue defaults to a Min-Heap where peek() returns the smallest element based on natural order."
      },
      {
        "id": "java-48-q2",
        "question": "What is the time complexity of the offer() and poll() operations in a PriorityQueue with N elements?",
        "options": [
          "O(1)",
          "O(log N)",
          "O(N)",
          "O(N log N)"
        ],
        "correctOptionIndex": 1,
        "explanation": "Inserting (sift-up) and extracting the root (sift-down) both traverse the height of the binary heap in O(log N) steps."
      }
    ],
    "revisionNotes": [
      "PriorityQueue is a Binary Heap; defaults to Min-Heap (peek() is minimum).",
      "offer() and poll() run in O(log n) time; peek() runs in O(1) time.",
      "Iterating with for-each does NOT guarantee sorted order; must poll() sequentially."
    ]
  },
  {
    "id": "java-49-stack-modern-alternatives",
    "moduleId": "java-m4",
    "moduleNumber": 4,
    "moduleTitle": "Java Collections Framework",
    "topicNumber": 49,
    "title": "Stack Legacy Class vs Modern ArrayDeque Alternative",
    "language": "java",
    "level": "Beginner",
    "whyItMatters": "Java’s legacy `java.util.Stack` class extends `Vector`, making every operation synchronize unnecessarily. The Java official documentation explicitly advises using `ArrayDeque` as a faster, modern LIFO stack.",
    "explanation": "1. The Legacy `java.util.Stack` Class:\n   - Introduced in Java 1.0, it extends `Vector`.\n   - Flaw 1: Unnecessary Synchronization. Every method (`push`, `pop`, `peek`) is `synchronized`, adding massive locking overhead even in single-threaded programs.\n   - Flaw 2: Violates Stack Abstraction. Because it inherits from `Vector`, clients can call `stack.add(0, item)` or `stack.remove(3)`, mutating the middle of the stack!\n2. The Modern Alternative: `ArrayDeque`:\n   - Implements `Deque<T>` (Double-Ended Queue).\n   - Non-synchronized (fast, zero lock contention).\n   - Methods: `push(e)` (calls `addFirst`), `pop()` (calls `removeFirst`), `peek()` (calls `peekFirst`).\n   - Backed by an efficient circular array buffer that outperforms both `Stack` and `LinkedList`.",
    "syntaxAndStructure": "// LEGACY (Discouraged):\nStack<Integer> legacyStack = new Stack<>();\nlegacyStack.push(10); // Synchronized lock acquired\n\n// MODERN BEST PRACTICE:\nDeque<Integer> modernStack = new ArrayDeque<>();\nmodernStack.push(10); // O(1) non-synchronized fast array insert\nint top = modernStack.pop();",
    "codeExamples": [
      {
        "title": "Modern LIFO Stack Operations Using ArrayDeque",
        "code": "import java.util.ArrayDeque;\nimport java.util.Deque;\n\npublic class ModernStackDemo {\n    public static void main(String[] args) {\n        // Modern recommended LIFO Stack declaration\n        Deque<String> stack = new ArrayDeque<>();\n\n        // Push operations\n        stack.push(\"Page_1\");\n        stack.push(\"Page_2\");\n        stack.push(\"Page_3\");\n\n        System.out.println(\"Top of stack (peek): \" + stack.peek());\n\n        // Pop operations (LIFO order)\n        System.out.print(\"Popped order: \");\n        while (!stack.isEmpty()) {\n            System.out.print(stack.pop() + \" \");\n        }\n        System.out.println();\n    }\n}",
        "expectedOutput": "Top of stack (peek): Page_3\nPopped order: Page_3 Page_2 Page_1 ",
        "explanation": "ArrayDeque.push() and pop() operate in LIFO order with near-zero overhead and no thread synchronization penalties."
      },
      {
        "title": "Demonstrating Why Legacy java.util.Stack is Flawed",
        "code": "import java.util.Stack;\n\npublic class LegacyStackFlawDemo {\n    public static void main(String[] args) {\n        Stack<String> stack = new Stack<>();\n        stack.push(\"Bottom\");\n        stack.push(\"Top\");\n\n        // FLAW: Because Stack extends Vector, arbitrary index operations are permitted!\n        stack.add(1, \"INTRUDER_INSERTED_IN_MIDDLE\");\n\n        System.out.println(\"Corrupted stack contents: \" + stack);\n        System.out.println(\"Popped element: \" + stack.pop());\n    }\n}",
        "expectedOutput": "Corrupted stack contents: [Bottom, INTRUDER_INSERTED_IN_MIDDLE, Top]\nPopped element: Top",
        "explanation": "Because Stack extends Vector, it violates encapsulation by exposing Vector index methods, breaking the pure LIFO contract."
      }
    ],
    "realWorldApplications": [
      "Evaluating mathematical expressions (Dijkstra’s Shunting-yard algorithm).",
      "Implementing browser back-button navigation history and undo/redo stacks."
    ],
    "commonMistakes": [
      "Declaring `Stack<T> stack = new Stack<>()` in interviews; interviewers expect `Deque<T> stack = new ArrayDeque<>()`.",
      "Using `queue.add()` instead of `stack.push()` when intending LIFO semantics.",
      "Using legacy java.util.Stack in single-threaded code, paying unnecessary synchronized locking penalties."
    ],
    "interviewRelevance": "Universal interview question: \"Why is java.util.Stack deprecated/discouraged in modern Java?\" (Answer: extends Vector, synchronizes every method, exposes index insertion).",
    "checkpoints": [
      {
        "id": "java-49-cp-1",
        "label": "Explain the 2 design flaws of legacy java.util.Stack: Vector inheritance and synchronization"
      },
      {
        "id": "java-49-cp-2",
        "label": "Use Deque<T> stack = new ArrayDeque<>() as the modern standard LIFO implementation"
      },
      {
        "id": "java-49-stack-modern-alternatives-cp-3",
        "label": "Replace legacy Stack and Vector with high-performance ArrayDeque."
      }
    ],
    "practiceExercises": [
      {
        "id": "java-49-ex-1",
        "title": "Valid Parentheses Checker",
        "difficulty": "Beginner",
        "type": "coding",
        "prompt": "Check if a string containing '(', ')', '{', '}', '[', ']' is valid using ArrayDeque.",
        "solution": "import java.util.*;\n\npublic class ValidParentheses {\n    public static boolean isValid(String s) {\n        Deque<Character> stack = new ArrayDeque<>();\n        for (char ch : s.toCharArray()) {\n            if (ch == '(') stack.push(')');\n            else if (ch == '{') stack.push('}');\n            else if (ch == '[') stack.push(']');\n            else if (stack.isEmpty() || stack.pop() != ch) return false;\n        }\n        return stack.isEmpty();\n    }\n    public static void main(String[] args) {\n        System.out.println(\"()[]{} is valid: \" + isValid(\"()[]{}\"));\n        System.out.println(\"([)] is valid: \" + isValid(\"([)]\"));\n    }\n}",
        "explanation": "Push expected closing brackets and match on encounter in O(n) time and O(n) space."
      },
      {
        "id": "java-49-ex-2",
        "title": "Evaluate Reverse Polish Notation (RPN)",
        "difficulty": "Intermediate",
        "type": "coding",
        "prompt": "Evaluate the value of an arithmetic expression in Reverse Polish Notation (e.g. [\"2\", \"1\", \"+\", \"3\", \"*\"] -> 9).",
        "solution": "import java.util.*;\n\npublic class RPNCalculator {\n    public static int evalRPN(String[] tokens) {\n        Deque<Integer> stack = new ArrayDeque<>();\n        for (String t : tokens) {\n            if (t.equals(\"+\")) stack.push(stack.pop() + stack.pop());\n            else if (t.equals(\"*\")) stack.push(stack.pop() * stack.pop());\n            else if (t.equals(\"-\")) {\n                int b = stack.pop(), a = stack.pop();\n                stack.push(a - b);\n            } else if (t.equals(\"/\")) {\n                int b = stack.pop(), a = stack.pop();\n                stack.push(a / b);\n            } else {\n                stack.push(Integer.parseInt(t));\n            }\n        }\n        return stack.pop();\n    }\n    public static void main(String[] args) {\n        String[] tokens = { \"2\", \"1\", \"+\", \"3\", \"*\" };\n        System.out.println(\"Result: \" + evalRPN(tokens));\n    }\n}",
        "explanation": "Operands are pushed; operators pop two operands and push the computed result."
      },
      {
        "id": "java-49-ex-3",
        "title": "MinStack Implementation in O(1) Time",
        "difficulty": "Advanced",
        "type": "coding",
        "prompt": "Design a stack that supports push, pop, top, and retrieving the minimum element in O(1) time.",
        "solution": "import java.util.ArrayDeque;\nimport java.util.Deque;\n\npublic class MinStack {\n    private final Deque<Integer> stack = new ArrayDeque<>();\n    private final Deque<Integer> minStack = new ArrayDeque<>();\n\n    public void push(int val) {\n        stack.push(val);\n        if (minStack.isEmpty() || val <= minStack.peek()) {\n            minStack.push(val);\n        }\n    }\n\n    public void pop() {\n        if (stack.peek().equals(minStack.peek())) {\n            minStack.pop();\n        }\n        stack.pop();\n    }\n\n    public int top() { return stack.peek(); }\n    public int getMin() { return minStack.peek(); }\n\n    public static void main(String[] args) {\n        MinStack ms = new MinStack();\n        ms.push(-2);\n        ms.push(0);\n        ms.push(-3);\n        System.out.println(\"Min: \" + ms.getMin()); // -3\n        ms.pop();\n        System.out.println(\"Top: \" + ms.top());   // 0\n        System.out.println(\"Min: \" + ms.getMin()); // -2\n    }\n}",
        "explanation": "An auxiliary minStack tracks the running minimum element at each stack depth in O(1) time."
      }
    ],
    "quizQuestions": [
      {
        "id": "java-49-q1",
        "question": "Why does the Java official documentation discourage the use of `java.util.Stack`?",
        "options": [
          "It is written in C++ and incompatible with JVM",
          "It inherits from Vector, synchronizing all methods unnecessarily and allowing illegal non-LIFO index access",
          "It cannot hold object references",
          "It is limited to 100 elements"
        ],
        "correctOptionIndex": 1,
        "explanation": "`java.util.Stack` extends `Vector`, inheriting synchronization overhead and methods that violate the LIFO abstraction."
      },
      {
        "id": "java-49-q2",
        "question": "What is the recommended interface and class combination for creating a LIFO Stack in modern Java?",
        "options": [
          "Stack<T> stack = new Stack<>()",
          "Deque<T> stack = new ArrayDeque<>()",
          "List<T> stack = new ArrayList<>()",
          "Queue<T> stack = new PriorityQueue<>()"
        ],
        "correctOptionIndex": 1,
        "explanation": "`Deque<T> stack = new ArrayDeque<>()` is the official modern replacement for Stack."
      }
    ],
    "revisionNotes": [
      "Legacy `java.util.Stack` extends `Vector` and synchronizes all methods unnecessarily.",
      "Use `Deque<T> stack = new ArrayDeque<>()` for high-performance LIFO stacks.",
      "ArrayDeque provides O(1) push(), pop(), and peek() without locking overhead."
    ]
  },
  {
    "id": "java-50-iterator-listiterator",
    "moduleId": "java-m4",
    "moduleNumber": 4,
    "moduleTitle": "Java Collections Framework",
    "topicNumber": 50,
    "title": "Iterator & ListIterator: Fail-Fast vs Fail-Safe Mechanics",
    "language": "java",
    "level": "Beginner",
    "whyItMatters": "`ConcurrentModificationException` is one of the most common runtime crashes in Java. Understanding `modCount`, fail-fast iterators, and how to safely delete elements while iterating is tested in every interview.",
    "explanation": "An `Iterator` allows traversing a collection sequentially and removing elements safely.\n1. `Iterator<E>` vs `ListIterator<E>`:\n   - `Iterator`: Forward traversal only (`hasNext()`, `next()`, `remove()`). Applicable to all `Collection` types.\n   - `ListIterator`: Bidirectional traversal (`hasPrevious()`, `previous()`), index queries (`nextIndex()`), and element modification (`set(e)`, `add(e)`). Only available on `List` types.\n2. Fail-Fast Iterators:\n   - Used by standard collections (`ArrayList`, `HashMap`, `HashSet`).\n   - Tracks a modification count field: `modCount`.\n   - When an iterator is created, it records `expectedModCount = modCount`.\n   - If the backing collection is structurally modified (via `list.add()` or `list.remove()`) during iteration, `modCount != expectedModCount`, immediately throwing `ConcurrentModificationException`!\n   - Safe Deletion: Call `iterator.remove()`, which updates both `modCount` and `expectedModCount`.\n3. Fail-Safe / Weakly Consistent Iterators:\n   - Used by concurrent collections (`CopyOnWriteArrayList`, `ConcurrentHashMap`).\n   - Operates on a snapshot or cloned array; NEVER throws `ConcurrentModificationException`.",
    "syntaxAndStructure": "// Safe removal using Iterator.remove():\nIterator<String> it = list.iterator();\nwhile (it.hasNext()) {\n    String s = it.next();\n    if (shouldRemove(s)) {\n        it.remove(); // SAFE: updates expectedModCount!\n    }\n}\n\n// Java 8 Modern Alternative:\nlist.removeIf(s -> shouldRemove(s));",
    "codeExamples": [
      {
        "title": "ConcurrentModificationException and the Safe Iterator Fix",
        "code": "import java.util.ArrayList;\nimport java.util.Iterator;\nimport java.util.List;\n\npublic class FailFastDemo {\n    public static void main(String[] args) {\n        List<String> items = new ArrayList<>(List.of(\"A\", \"B\", \"C\", \"D\"));\n\n        // Correct Safe Removal using iterator.remove()\n        Iterator<String> it = items.iterator();\n        while (it.hasNext()) {\n            String val = it.next();\n            if (\"B\".equals(val)) {\n                it.remove(); // Safe removal!\n            }\n        }\n        System.out.println(\"After safe iterator removal: \" + items);\n\n        // Demonstrating ConcurrentModificationException\n        try {\n            for (String s : items) {\n                if (\"A\".equals(s)) {\n                    items.remove(s); // DANGER: Structural modification during for-each loop!\n                }\n            }\n        } catch (Exception e) {\n            System.out.println(\"Caught expected: \" + e.getClass().getSimpleName());\n        }\n    }\n}",
        "expectedOutput": "After safe iterator removal: [A, C, D]\nCaught expected: ConcurrentModificationException",
        "explanation": "Mutating the collection directly with items.remove() alters modCount without updating the iterator, triggering ConcurrentModificationException. Calling it.remove() synchronizes both counts."
      },
      {
        "title": "Bidirectional Traversal with ListIterator",
        "code": "import java.util.ArrayList;\nimport java.util.List;\nimport java.util.ListIterator;\n\npublic class ListIteratorDemo {\n    public static void main(String[] args) {\n        List<String> steps = new ArrayList<>(List.of(\"Start\", \"Process\", \"Finish\"));\n\n        ListIterator<String> lit = steps.listIterator();\n\n        // Forward traversal\n        System.out.print(\"Forward: \");\n        while (lit.hasNext()) {\n            System.out.print(lit.next() + \" \");\n        }\n        System.out.println();\n\n        // Backward traversal\n        System.out.print(\"Backward: \");\n        while (lit.hasPrevious()) {\n            System.out.print(lit.previous() + \" \");\n        }\n        System.out.println();\n    }\n}",
        "expectedOutput": "Forward: Start Process Finish \nBackward: Finish Process Start ",
        "explanation": "ListIterator supports bidirectional traversal using hasPrevious() and previous()."
      }
    ],
    "realWorldApplications": [
      "Safely filtering elements from in-memory collections during business processing.",
      "Developing concurrent applications using fail-safe collections (`ConcurrentHashMap`) to avoid locking readers."
    ],
    "commonMistakes": [
      "Calling `list.remove(item)` inside an enhanced for-each loop, triggering `ConcurrentModificationException`. Use `list.removeIf(...)` or `iterator.remove()` instead.",
      "Calling `iterator.remove()` before `iterator.next()`, which throws `IllegalStateException`.",
      "Modifying a collection via collection.remove() during active iterator traversal instead of iterator.remove()."
    ],
    "interviewRelevance": "Universal interview question: \"What is ConcurrentModificationException and how do you prevent it?\", \"Fail-fast vs Fail-safe\", and \"What is modCount?\"",
    "checkpoints": [
      {
        "id": "java-50-cp-1",
        "label": "Explain how modCount vs expectedModCount triggers ConcurrentModificationException"
      },
      {
        "id": "java-50-cp-2",
        "label": "Safely remove elements during traversal using iterator.remove() or Collection.removeIf()"
      },
      {
        "id": "java-50-iterator-listiterator-cp-3",
        "label": "Use ListIterator for bidirectional traversal and in-place element replacement."
      }
    ],
    "practiceExercises": [
      {
        "id": "java-50-ex-1",
        "title": "Modern removeIf Syntax",
        "difficulty": "Beginner",
        "type": "coding",
        "prompt": "Use Collection.removeIf(Predicate) to delete all even numbers from an ArrayList.",
        "solution": "import java.util.*;\n\npublic class RemoveIfDemo {\n    public static void main(String[] args) {\n        List<Integer> nums = new ArrayList<>(List.of(1, 2, 3, 4, 5, 6));\n        nums.removeIf(n -> n % 2 == 0);\n        System.out.println(\"Odd numbers only: \" + nums);\n    }\n}",
        "explanation": "removeIf() is a concise Java 8 default method that safely handles internal iterator removal."
      },
      {
        "id": "java-50-ex-2",
        "title": "Bidirectional ListIterator Element Replacement",
        "difficulty": "Intermediate",
        "type": "coding",
        "prompt": "Use ListIterator to replace all occurrences of \"TODO\" with \"DONE\" in a List<String>.",
        "solution": "import java.util.*;\n\npublic class ListIteratorReplace {\n    public static void main(String[] args) {\n        List<String> tasks = new ArrayList<>(List.of(\"Design\", \"TODO\", \"Review\", \"TODO\"));\n        ListIterator<String> lit = tasks.listIterator();\n        while (lit.hasNext()) {\n            if (\"TODO\".equals(lit.next())) {\n                lit.set(\"DONE\"); // In-place replacement\n            }\n        }\n        System.out.println(\"Updated tasks: \" + tasks);\n    }\n}",
        "explanation": "ListIterator.set(e) replaces the last element returned by next() or previous()."
      },
      {
        "id": "java-50-ex-3",
        "title": "Fail-Safe CopyOnWriteArrayList Iteration",
        "difficulty": "Advanced",
        "type": "coding",
        "prompt": "Demonstrate that CopyOnWriteArrayList does NOT throw ConcurrentModificationException when structurally modified during iteration.",
        "solution": "import java.util.concurrent.CopyOnWriteArrayList;\n\npublic class FailSafeDemo {\n    public static void main(String[] args) {\n        CopyOnWriteArrayList<String> list = new CopyOnWriteArrayList<>();\n        list.add(\"Alpha\");\n        list.add(\"Beta\");\n\n        // Fail-safe: iterates over snapshot array\n        for (String item : list) {\n            System.out.println(\"Reading: \" + item);\n            list.add(\"Gamma\"); // Modifies underlying array without crashing!\n        }\n        System.out.println(\"Final list size: \" + list.size());\n    }\n}",
        "explanation": "CopyOnWriteArrayList iterates over an immutable snapshot of the array, preventing ConcurrentModificationException."
      }
    ],
    "quizQuestions": [
      {
        "id": "java-50-q1",
        "question": "What triggers a `ConcurrentModificationException` in a fail-fast iterator?",
        "options": [
          "Multiple threads reading the collection simultaneously",
          "A mismatch between the collection's `modCount` and the iterator's `expectedModCount`",
          "Attempting to store null",
          "Accessing an index out of bounds"
        ],
        "correctOptionIndex": 1,
        "explanation": "Fail-fast iterators verify `modCount == expectedModCount` on every call to `next()`. If the collection was modified, it throws ConcurrentModificationException."
      },
      {
        "id": "java-50-q2",
        "question": "Which method can safely remove an element while traversing a standard ArrayList without throwing ConcurrentModificationException?",
        "options": [
          "list.remove(index)",
          "list.remove(object)",
          "iterator.remove()",
          "list.clear()"
        ],
        "correctOptionIndex": 2,
        "explanation": "`iterator.remove()` updates both the collection and the iterator's internal `expectedModCount`, keeping them synchronized."
      }
    ],
    "revisionNotes": [
      "Fail-fast iterators throw ConcurrentModificationException if the backing collection is modified during traversal.",
      "Safely remove elements using `iterator.remove()` or `collection.removeIf()`.",
      "ListIterator allows bidirectional traversal and element replacement on lists."
    ]
  },
  {
    "id": "java-51-comparable-comparator",
    "moduleId": "java-m4",
    "moduleNumber": 4,
    "moduleTitle": "Java Collections Framework",
    "topicNumber": 51,
    "title": "Comparable vs Comparator: Natural Ordering & Custom Comparators",
    "language": "java",
    "level": "Beginner",
    "whyItMatters": "Sorting and priority queues require defining element ordering. Knowing the exact difference between `Comparable` (internal natural order) and `Comparator` (external custom strategy) and writing clean Java 8 lambda comparators is tested in every interview.",
    "explanation": "Java provides two interfaces for ordering objects:\n1. `Comparable<T>` (Natural Ordering):\n   - Package: `java.lang.Comparable`.\n   - Implemented within the class itself: `class Employee implements Comparable<Employee>`.\n   - Single method: `int compareTo(T o)`.\n   - Return conventions: negative if `this < o`, zero if `this == o`, positive if `this > o`.\n   - Provides a single, intrinsic default sorting strategy.\n2. `Comparator<T>` (Custom / Multiple Ordering Strategies):\n   - Package: `java.util.Comparator`.\n   - Defined in a separate class or as a lambda/method reference.\n   - Single abstract method: `int compare(T o1, T o2)`.\n   - Allows defining multiple independent sorting strategies for the same class (e.g., sort by name, sort by salary, sort by date).\n   - Java 8 Fluent Combinators: `Comparator.comparing(Employee::getSalary).reversed().thenComparing(Employee::getName)`.",
    "syntaxAndStructure": "// 1. Comparable (Natural Order):\nclass Student implements Comparable<Student> {\n    int id;\n    public int compareTo(Student other) {\n        return Integer.compare(this.id, other.id);\n    }\n}\n\n// 2. Comparator (Custom Order via Lambdas):\nComparator<Student> byName = (s1, s2) -> s1.name.compareTo(s2.name);\nComparator<Student> byGpaDesc = Comparator.comparingDouble(Student::getGpa).reversed();",
    "codeExamples": [
      {
        "title": "Modern Java 8 Comparator Chaining",
        "code": "import java.util.ArrayList;\nimport java.util.Comparator;\nimport java.util.List;\n\nclass Candidate {\n    String name;\n    int score;\n    int graduationYear;\n\n    Candidate(String n, int s, int y) {\n        this.name = n; this.score = s; this.graduationYear = y;\n    }\n    public String toString() { return name + \"(score=\" + score + \", yr=\" + graduationYear + \")\"; }\n}\n\npublic class ComparatorChainingDemo {\n    public static void main(String[] args) {\n        List<Candidate> candidates = new ArrayList<>();\n        candidates.add(new Candidate(\"Alice\", 85, 2025));\n        candidates.add(new Candidate(\"Bob\", 92, 2024));\n        candidates.add(new Candidate(\"Charlie\", 85, 2024));\n\n        // Sort: Score Descending, then GraduationYear Ascending, then Name Ascending\n        candidates.sort(\n            Comparator.comparingInt((Candidate c) -> c.score).reversed()\n                      .thenComparingInt(c -> c.graduationYear)\n                      .thenComparing(c -> c.name)\n        );\n\n        System.out.println(\"Ranked candidates:\");\n        for (Candidate c : candidates) {\n            System.out.println(\" - \" + c);\n        }\n    }\n}",
        "expectedOutput": "Ranked candidates:\n - Bob(score=92, yr=2024)\n - Charlie(score=85, yr=2024)\n - Alice(score=85, yr=2025)",
        "explanation": "Comparator.comparingInt().reversed().thenComparingInt() creates readable, highly efficient comparator chains without manual if-else boilerplate."
      },
      {
        "title": "Integer Subtraction Overflow Trap in compare()",
        "code": "import java.util.Comparator;\n\npublic class IntegerCompareOverflowDemo {\n    public static void main(String[] args) {\n        int a = -2000000000;\n        int b = 2000000000;\n\n        // FLAWED: a - b overflows two's complement 32-bit int!\n        int flawedResult = a - b; // Overflows to positive number!\n        System.out.println(\"Flawed (a - b): \" + flawedResult);\n\n        // CORRECT: Integer.compare(a, b) handles extremes safely without overflow\n        int safeResult = Integer.compare(a, b);\n        System.out.println(\"Safe Integer.compare(a, b): \" + safeResult);\n    }\n}",
        "expectedOutput": "Flawed (a - b): 294967296\nSafe Integer.compare(a, b): -1",
        "explanation": "Never write `return a - b` in compareTo/compare because subtraction can overflow. Always use `Integer.compare(a, b)` or `Double.compare(a, b)`."
      }
    ],
    "realWorldApplications": [
      "Sorting search results by relevance score and timestamp in e-commerce products.",
      "Configuring priority queues with multi-factor scheduling weights."
    ],
    "commonMistakes": [
      "Writing `return o1.id - o2.id` which triggers integer overflow when signs differ; always use `Integer.compare(o1.id, o2.id)`.",
      "Confusing `Comparable.compareTo` (takes 1 parameter) with `Comparator.compare` (takes 2 parameters).",
      "Using subtraction (a - b) in compare methods, leading to integer overflow and contract violation bugs."
    ],
    "interviewRelevance": "Universal interview question: \"What is the difference between Comparable and Comparator?\" and \"Why should you avoid subtraction inside compare()?\"",
    "checkpoints": [
      {
        "id": "java-51-cp-1",
        "label": "Distinguish Comparable (java.lang, compareTo) from Comparator (java.util, compare)"
      },
      {
        "id": "java-51-cp-2",
        "label": "Avoid integer subtraction overflow by using Integer.compare(a, b)"
      },
      {
        "id": "java-51-comparable-comparator-cp-3",
        "label": "Chain multiple sorting criteria cleanly using Comparator.comparing() and thenComparing()."
      }
    ],
    "practiceExercises": [
      {
        "id": "java-51-ex-1",
        "title": "Natural Order Implementation for Product",
        "difficulty": "Beginner",
        "type": "coding",
        "prompt": "Implement Comparable<Product> to sort products by price ascending.",
        "solution": "public class Product implements Comparable<Product> {\n    private String name;\n    private double price;\n    public Product(String n, double p) { this.name = n; this.price = p; }\n\n    @Override\n    public int compareTo(Product other) {\n        return Double.compare(this.price, other.price);\n    }\n    public static void main(String[] args) {\n        Product p1 = new Product(\"Pen\", 1.5);\n        Product p2 = new Product(\"Notebook\", 3.0);\n        System.out.println(\"p1 vs p2: \" + p1.compareTo(p2)); // Negative\n    }\n}",
        "explanation": "Double.compare() handles IEEE 754 NaN and precision rules safely."
      },
      {
        "id": "java-51-ex-2",
        "title": "Sort Strings by Length then Alphabetical",
        "difficulty": "Intermediate",
        "type": "coding",
        "prompt": "Sort a list of strings by length ascending; if lengths are equal, sort alphabetically.",
        "solution": "import java.util.*;\n\npublic class StringLengthSort {\n    public static void main(String[] args) {\n        List<String> words = new ArrayList<>(List.of(\"banana\", \"pie\", \"apple\", \"fig\", \"kiwi\"));\n        words.sort(\n            Comparator.comparingInt(String::length)\n                      .thenComparing(Comparator.naturalOrder())\n        );\n        System.out.println(\"Sorted: \" + words);\n    }\n}",
        "explanation": "Chaining comparingInt(String::length) with naturalOrder() achieves secondary sorting cleanly."
      },
      {
        "id": "java-51-ex-3",
        "title": "Null-Friendly Comparator",
        "difficulty": "Advanced",
        "type": "coding",
        "prompt": "Demonstrate how Comparator.nullsFirst() and Comparator.nullsLast() safely handle null elements without NullPointerException.",
        "solution": "import java.util.*;\n\npublic class NullSafeComparatorDemo {\n    public static void main(String[] args) {\n        List<String> list = new ArrayList<>(Arrays.asList(\"Beta\", null, \"Alpha\", null, \"Gamma\"));\n        // Sort nulls to the front, then natural order\n        list.sort(Comparator.nullsFirst(Comparator.naturalOrder()));\n        System.out.println(\"Nulls first: \" + list);\n    }\n}",
        "explanation": "Comparator.nullsFirst wraps a comparator and places null values at the beginning without throwing NPE."
      }
    ],
    "quizQuestions": [
      {
        "id": "java-51-q1",
        "question": "Which interface should be used when you need to define MULTIPLE different sorting strategies for the same class?",
        "options": [
          "java.lang.Comparable",
          "java.util.Comparator",
          "java.lang.Cloneable",
          "java.io.Serializable"
        ],
        "correctOptionIndex": 1,
        "explanation": "`Comparator` can be instantiated in multiple independent classes or lambdas, providing multiple sorting strategies."
      },
      {
        "id": "java-51-q2",
        "question": "Why is writing `return a - b` inside a Comparator considered dangerous?",
        "options": [
          "Because subtraction is deprecated in Java 17",
          "Because if a is negative and b is positive (or vice versa), the subtraction can overflow 32-bit int, yielding incorrect sorting",
          "Because subtraction only works on doubles",
          "Because the compiler rejects subtraction in comparators"
        ],
        "correctOptionIndex": 1,
        "explanation": "Subtraction can overflow into the opposite sign (e.g. -2B - 2B = positive), reversing the expected comparison."
      }
    ],
    "revisionNotes": [
      "Comparable defines a single natural ordering inside the class via `compareTo(T o)`.",
      "Comparator defines multiple external sorting strategies via `compare(T o1, T o2)`.",
      "Always use `Integer.compare(a, b)` instead of `a - b` to prevent overflow bugs."
    ]
  },
  {
    "id": "java-52-equals-hashcode-contracts",
    "moduleId": "java-m4",
    "moduleNumber": 4,
    "moduleTitle": "Java Collections Framework",
    "topicNumber": 52,
    "title": "The equals() & hashCode() Contracts in Hash Tables",
    "language": "java",
    "level": "Beginner",
    "whyItMatters": "Violating the equals() and hashCode() contract is the #1 cause of silent bugs and memory leaks when using HashMap and HashSet. Understanding the mathematical contract and bucket lookup sequence is mandatory for every Java developer.",
    "explanation": "In Java, `equals()` and `hashCode()` are defined in `java.lang.Object`:\n1. The Official Contract:\n   - Consistency: If `a.equals(b)` is TRUE, then `a.hashCode()` and `b.hashCode()` MUST be IDENTICAL!\n   - If `a.equals(b)` is FALSE, their hashCodes do NOT need to be distinct (though distinct hashCodes reduce collisions and optimize performance).\n   - If two objects have the same hashCode, they are NOT necessarily equal (this is simply a hash collision).\n2. How HashMap Uses Both:\n   - Step 1: When calling `map.get(key)`, the JVM calculates `key.hashCode()` to find the BUCKET index in $O(1)$.\n   - Step 2: Once inside the bucket, the JVM traverses the bucket nodes comparing `existingKey.equals(key)` to find the exact key.\n   - Bug: If you override `equals()` but NOT `hashCode()`, two \"equal\" objects will produce different hash codes, land in different buckets, and `map.get()` will return NULL!\n3. Properties of equals(): Reflexive, Symmetric, Transitive, Consistent, and `x.equals(null)` must return false.",
    "syntaxAndStructure": "// Correct implementation using java.util.Objects (Java 7+):\npublic class User {\n    private int id;\n    private String email;\n\n    @Override\n    public boolean equals(Object o) {\n        if (this == o) return true; // Reference check\n        if (!(o instanceof User other)) return false; // Null & Type check\n        return this.id == other.id && Objects.equals(this.email, other.email);\n    }\n\n    @Override\n    public int hashCode() {\n        return Objects.hash(id, email);\n    }\n}",
    "codeExamples": [
      {
        "title": "Demonstrating the Fatal Missing hashCode() Bug in HashMap",
        "code": "import java.util.HashMap;\nimport java.util.Map;\n\nclass BrokenUser {\n    String username;\n    BrokenUser(String u) { this.username = u; }\n\n    // Overriding equals, but FAILING to override hashCode!\n    @Override\n    public boolean equals(Object o) {\n        if (!(o instanceof BrokenUser other)) return false;\n        return this.username.equals(other.username);\n    }\n}\n\npublic class EqualsHashCodeBugDemo {\n    public static void main(String[] args) {\n        Map<BrokenUser, String> userProfiles = new HashMap<>();\n        BrokenUser u1 = new BrokenUser(\"alex99\");\n        userProfiles.put(u1, \"Admin Profile\");\n\n        // u2 has identical username; u1.equals(u2) is true!\n        BrokenUser u2 = new BrokenUser(\"alex99\");\n        System.out.println(\"u1.equals(u2): \" + u1.equals(u2));\n\n        // FATAL: u2 has a different default identity hashCode, so get() looks in the wrong bucket!\n        String profile = userProfiles.get(u2);\n        System.out.println(\"Retrieved profile with u2: \" + profile); // Prints null!\n    }\n}",
        "expectedOutput": "u1.equals(u2): true\nRetrieved profile with u2: null",
        "explanation": "Because hashCode() was not overridden, u1 and u2 produce different memory-based hash codes. get(u2) checks the wrong bucket and fails to find the entry."
      },
      {
        "title": "Correct Robust Implementation Using java.util.Objects",
        "code": "import java.util.HashMap;\nimport java.util.Map;\nimport java.util.Objects;\n\nclass CorrectUser {\n    int id;\n    String email;\n\n    CorrectUser(int id, String email) {\n        this.id = id; this.email = email;\n    }\n\n    @Override\n    public boolean equals(Object o) {\n        if (this == o) return true;\n        if (!(o instanceof CorrectUser other)) return false;\n        return this.id == other.id && Objects.equals(this.email, other.email);\n    }\n\n    @Override\n    public int hashCode() {\n        return Objects.hash(id, email);\n    }\n}\n\npublic class CorrectEqualsHashCodeDemo {\n    public static void main(String[] args) {\n        Map<CorrectUser, String> map = new HashMap<>();\n        map.put(new CorrectUser(101, \"dev@ak67.com\"), \"Developer Account\");\n\n        // Lookup with identical data finds the entry in O(1)!\n        String account = map.get(new CorrectUser(101, \"dev@ak67.com\"));\n        System.out.println(\"Retrieved account: \" + account);\n    }\n}",
        "expectedOutput": "Retrieved account: Developer Account",
        "explanation": "Because both equals and hashCode are overridden using identical fields, both instances compute the exact same hash code and land in the same bucket."
      }
    ],
    "realWorldApplications": [
      "Ensuring entities in JPA / Hibernate work reliably in Set relationships (like `@ManyToMany`).",
      "Using custom domain classes as keys in Redis, Caffeine, or Guava caches."
    ],
    "commonMistakes": [
      "Overriding `equals(MyClass o)` instead of `equals(Object o)`; this accidentally overloads the method instead of overriding it!",
      "Including mutable fields in `hashCode()` and mutating them after insertion, losing the entry.",
      "Violating transitivity or symmetry in equals() implementations when dealing with inheritance."
    ],
    "interviewRelevance": "Universal interview question: \"What is the contract between equals() and hashCode?\", \"What happens if you override equals() but not hashCode() in HashMap?\", and \"How does HashMap use both?\"",
    "checkpoints": [
      {
        "id": "java-52-cp-1",
        "label": "State the contract: a.equals(b) == true IMPLIES a.hashCode() == b.hashCode()"
      },
      {
        "id": "java-52-cp-2",
        "label": "Trace the two-step HashMap lookup: hashCode() finds bucket -> equals() finds key"
      },
      {
        "id": "java-52-equals-hashcode-contracts-cp-3",
        "label": "Implement bulletproof equals() and hashCode() using Objects.equals and Objects.hash."
      }
    ],
    "practiceExercises": [
      {
        "id": "java-52-ex-1",
        "title": "Accidental Overloading Mistake",
        "difficulty": "Beginner",
        "type": "conceptual",
        "prompt": "Why does boolean equals(Point p) fail to override equals in class Point? Show how to fix it.",
        "solution": "The method signature in Object is `boolean equals(Object o)`. Defining `boolean equals(Point p)` changes the parameter type from Object to Point, which is method OVERLOADING, not overriding. When HashMap calls equals(Object), it calls Object.equals() which checks reference equality. Fix: use `@Override public boolean equals(Object o)`.",
        "explanation": "Always use @Override to ensure the compiler catches accidental parameter type mismatches."
      },
      {
        "id": "java-52-ex-2",
        "title": "Prime Multiplier 31 in hashCode()",
        "difficulty": "Intermediate",
        "type": "conceptual",
        "prompt": "Why does Java traditionally use 31 as the prime multiplier when computing hashCode() in String and Objects.hash()?",
        "solution": "Two reasons:\n1. 31 is an odd prime, which reduces collisions when multiplying hash accumulators across character arrays.\n2. Modern JVM compilers optimize `31 * i` into a single fast bitwise shift and subtraction: `(i << 5) - i`. Modern CPUs execute this in a single clock cycle without expensive multiplication circuitry.",
        "explanation": "31 combines optimal mathematical distribution with single-cycle CPU shift optimization."
      },
      {
        "id": "java-52-ex-3",
        "title": "JPA Entity equals() and hashCode() Best Practice",
        "difficulty": "Advanced",
        "type": "conceptual",
        "prompt": "Why should JPA database entities NOT use auto-generated database IDs in hashCode() for transient (unpersisted) entities?",
        "solution": "Before an entity is persisted to the database, its `@Id` is `null` (or 0). If it is added to a `Set` while transient, its hashCode is based on 0. After calling `save()`, the database assigns an ID (e.g. 42), which mutates its hashCode! When you later check `set.contains(entity)`, it computes hashCode 42, checks the wrong bucket, and reports false. In JPA, equals and hashCode should rely on a natural business key (e.g. UUID, email) rather than generated database IDs.",
        "explanation": "Entities must maintain immutable hash codes across persistence lifecycle transitions."
      }
    ],
    "quizQuestions": [
      {
        "id": "java-52-q1",
        "question": "If two objects in Java are equal according to `a.equals(b) == true`, what MUST be true regarding their hash codes?",
        "options": [
          "Their hash codes must be equal",
          "Their hash codes must be different",
          "Their hash codes must both be zero",
          "No relationship is required"
        ],
        "correctOptionIndex": 0,
        "explanation": "The Java contract mandates: If two objects are equal according to equals(), their hashCode() values MUST be identical."
      },
      {
        "id": "java-52-q2",
        "question": "If two objects produce the same `hashCode()`, does that mean `a.equals(b)` is guaranteed to be true?",
        "options": [
          "Yes, identical hash codes guarantee object equality",
          "No, different objects can share the same hash code (this is a hash collision)",
          "Only for String objects",
          "Only in 64-bit JVMs"
        ],
        "correctOptionIndex": 1,
        "explanation": "Hash collisions are natural in hash tables. Multiple unequal objects can map to the exact same hash code."
      }
    ],
    "revisionNotes": [
      "If `a.equals(b)` is true, `a.hashCode() == b.hashCode()` is mandatory.",
      "Always override both `equals()` and `hashCode()` together.",
      "HashMap uses hashCode() to locate the bucket and equals() to find the matching key."
    ]
  },
  {
    "id": "java-53-collections-utility-algorithms",
    "moduleId": "java-m4",
    "moduleNumber": 4,
    "moduleTitle": "Java Collections Framework",
    "topicNumber": 53,
    "title": "The Collections Utility Class & Common Algorithms",
    "language": "java",
    "level": "Beginner",
    "whyItMatters": "`java.util.Collections` provides polymorphic algorithms (sorting, binary search, reversing, shuffling, synchronized wrappers, and unmodifiable views). Knowing these standard utilities eliminates reinventing the wheel in placement coding.",
    "explanation": "`java.util.Collections` is an uninstantiable utility class containing static methods that operate on or return collections:\n1. Sorting & Searching:\n   - `Collections.sort(list)`: Sorts using TimSort ($O(n \\log n)$ time, stable).\n   - `Collections.binarySearch(list, key)`: $O(\\log n)$ binary search on sorted lists.\n2. Reordering & Shuffling:\n   - `Collections.reverse(list)`: Inverts list in $O(n)$ time.\n   - `Collections.shuffle(list)`: Randomizes elements in $O(n)$ time (Fisher-Yates shuffle).\n   - `Collections.rotate(list, distance)`: Rotates list cyclically.\n3. Extreme Values & Frequency:\n   - `Collections.min(col)` / `Collections.max(col)`: Finds minimum/maximum.\n   - `Collections.frequency(col, obj)`: Counts occurrences.\n4. Defensive Views & Wrappers:\n   - `Collections.unmodifiableList(list)`: Returns a read-only view that throws `UnsupportedOperationException` on mutation.\n   - `Collections.synchronizedList(list)`: Synchronizes all methods with a mutex lock.\n   - `Collections.emptyList()` / `Collections.singletonList(item)`: Memory-efficient immutable lists.",
    "syntaxAndStructure": "// Sorting and searching:\nCollections.sort(list);\nint idx = Collections.binarySearch(list, target);\n\n// Reordering:\nCollections.reverse(list);\nCollections.shuffle(list);\n\n// Read-only view:\nList<String> readOnly = Collections.unmodifiableList(list);",
    "codeExamples": [
      {
        "title": "Core Collections Algorithms in Action",
        "code": "import java.util.ArrayList;\nimport java.util.Collections;\nimport java.util.List;\n\npublic class CollectionsUtilityDemo {\n    public static void main(String[] args) {\n        List<Integer> numbers = new ArrayList<>(List.of(40, 10, 80, 20, 50, 20));\n\n        // 1. Min and Max\n        System.out.println(\"Min element: \" + Collections.min(numbers));\n        System.out.println(\"Max element: \" + Collections.max(numbers));\n        System.out.println(\"Frequency of 20: \" + Collections.frequency(numbers, 20));\n\n        // 2. Sorting\n        Collections.sort(numbers);\n        System.out.println(\"Sorted: \" + numbers);\n\n        // 3. Binary search on sorted list\n        int index = Collections.binarySearch(numbers, 50);\n        System.out.println(\"Index of 50: \" + index);\n\n        // 4. Reverse in-place\n        Collections.reverse(numbers);\n        System.out.println(\"Reversed: \" + numbers);\n    }\n}",
        "expectedOutput": "Min element: 10\nMax element: 80\nFrequency of 20: 2\nSorted: [10, 20, 20, 40, 50, 80]\nIndex of 50: 4\nReversed: [80, 50, 40, 20, 20, 10]",
        "explanation": "Collections provides optimized, battle-tested algorithms for common collection manipulations."
      },
      {
        "title": "Unmodifiable Views vs Immutable Collections",
        "code": "import java.util.ArrayList;\nimport java.util.Collections;\nimport java.util.List;\n\npublic class UnmodifiableViewDemo {\n    public static void main(String[] args) {\n        List<String> backingList = new ArrayList<>();\n        backingList.add(\"Initial\");\n\n        // Returns an unmodifiable VIEW of the backing list\n        List<String> view = Collections.unmodifiableList(backingList);\n\n        try {\n            view.add(\"Disallowed\"); // Throws UnsupportedOperationException!\n        } catch (UnsupportedOperationException e) {\n            System.out.println(\"Caught mutation block on unmodifiable view.\");\n        }\n\n        // Modifying the backing list updates the view!\n        backingList.add(\"Updated via backing\");\n        System.out.println(\"View reflects backing list changes: \" + view.size());\n    }\n}",
        "expectedOutput": "Caught mutation block on unmodifiable view.\nView reflects backing list changes: 2",
        "explanation": "Collections.unmodifiableList returns a wrapper view; modifying the underlying backing list updates the view, unlike List.copyOf() which creates a true independent snapshot."
      }
    ],
    "realWorldApplications": [
      "Exposing read-only domain collections to prevent outside modification.",
      "Shuffling deck of cards or quiz question orders in gaming and assessment apps."
    ],
    "commonMistakes": [
      "Calling `Collections.binarySearch()` on an unsorted list, producing undefined negative results.",
      "Assuming `Collections.unmodifiableList()` creates an independent copy; it is merely a view over the backing list.",
      "Calling Collections.binarySearch() on an unsorted list, yielding undefined results."
    ],
    "interviewRelevance": "Common interview question: \"Difference between Collection and Collections?\", \"How does Collections.sort() work under the hood (TimSort)?\", and \"Unmodifiable list vs List.of()\".",
    "checkpoints": [
      {
        "id": "java-53-cp-1",
        "label": "Distinguish Collection (interface) from Collections (utility class with static methods)"
      },
      {
        "id": "java-53-cp-2",
        "label": "Use Collections.unmodifiableList vs List.of / List.copyOf appropriately"
      },
      {
        "id": "java-53-collections-utility-algorithms-cp-3",
        "label": "Leverage Collections utility methods: sort, binarySearch, unmodifiableList, and singletonList."
      }
    ],
    "practiceExercises": [
      {
        "id": "java-53-ex-1",
        "title": "Check If Two Collections Are Disjoint",
        "difficulty": "Beginner",
        "type": "coding",
        "prompt": "Use Collections.disjoint() to check if two lists share any common elements.",
        "solution": "import java.util.*;\n\npublic class DisjointCheck {\n    public static void main(String[] args) {\n        List<Integer> list1 = List.of(1, 2, 3);\n        List<Integer> list2 = List.of(4, 5, 6);\n        List<Integer> list3 = List.of(3, 7, 8);\n\n        System.out.println(\"list1 and list2 disjoint: \" + Collections.disjoint(list1, list2)); // true\n        System.out.println(\"list1 and list3 disjoint: \" + Collections.disjoint(list1, list3)); // false\n    }\n}",
        "explanation": "Collections.disjoint returns true if the two specified collections have no elements in common."
      },
      {
        "id": "java-53-ex-2",
        "title": "Rotate List Cyclically by K Positions",
        "difficulty": "Intermediate",
        "type": "coding",
        "prompt": "Use Collections.rotate() to rotate a list to the right by 2 positions.",
        "solution": "import java.util.*;\n\npublic class RotateDemo {\n    public static void main(String[] args) {\n        List<String> items = new ArrayList<>(List.of(\"A\", \"B\", \"C\", \"D\", \"E\"));\n        Collections.rotate(items, 2);\n        System.out.println(\"Rotated by 2: \" + items); // [D, E, A, B, C]\n    }\n}",
        "explanation": "Collections.rotate(list, distance) rotates the elements in linear time."
      },
      {
        "id": "java-53-ex-3",
        "title": "Thread-Safe Iteration on Synchronized Collection",
        "difficulty": "Advanced",
        "type": "coding",
        "prompt": "Demonstrate why iterating over Collections.synchronizedList requires manual synchronization on the list object.",
        "solution": "import java.util.*;\n\npublic class SyncListIterationDemo {\n    public static void main(String[] args) {\n        List<String> syncList = Collections.synchronizedList(new ArrayList<>(List.of(\"A\", \"B\")));\n\n        // Critical: Iterating over synchronizedList MUST be synchronized manually!\n        synchronized (syncList) {\n            Iterator<String> it = syncList.iterator();\n            while (it.hasNext()) {\n                System.out.println(it.next());\n            }\n        }\n    }\n}",
        "explanation": "Individual methods on synchronizedList are atomic, but iteration spans multiple method calls and requires manual synchronization on the collection mutex to prevent ConcurrentModificationException."
      }
    ],
    "quizQuestions": [
      {
        "id": "java-53-q1",
        "question": "What sorting algorithm is utilized by `Collections.sort()` for objects in Java?",
        "options": [
          "Quicksort",
          "TimSort (hybrid of merge sort and insertion sort)",
          "Heap sort",
          "Bubble sort"
        ],
        "correctOptionIndex": 1,
        "explanation": "`Collections.sort()` uses TimSort, an adaptive, stable sorting algorithm derived from merge sort and insertion sort."
      },
      {
        "id": "java-53-q2",
        "question": "What is the key difference between `Collection` and `Collections` in Java?",
        "options": [
          "Collection is a class, Collections is an interface",
          "Collection is the root interface of the collection hierarchy; Collections is a utility class with static helper methods",
          "Collections is deprecated in Java 17",
          "They are identical"
        ],
        "correctOptionIndex": 1,
        "explanation": "`Collection` is an interface; `Collections` is an uninstantiable utility class containing static algorithms."
      }
    ],
    "revisionNotes": [
      "`Collections` is a utility class with static algorithms (sort, binarySearch, reverse, shuffle).",
      "`Collections.sort()` uses TimSort ($O(n \\log n)$, stable).",
      "Iterating over `Collections.synchronizedList()` requires explicit manual synchronization on the list mutex."
    ]
  }
];

export const module4: MasteryModule = {
  "id": "java-m4",
  "number": 4,
  "title": "Java Collections Framework",
  "description": "Deep dive into the Java Collections Framework: ArrayList resizing, LinkedList vs ArrayDeque, HashSet, TreeSet NavigableSet, HashMap treeification, LinkedHashMap LRU cache, PriorityQueue heaps, and Collections utilities.",
  "language": "java",
  "topics": [
    {
      "id": "java-39-collections-hierarchy",
      "moduleId": "java-m4",
      "moduleNumber": 4,
      "moduleTitle": "Java Collections Framework",
      "topicNumber": 39,
      "title": "Collections Hierarchy: Iterable, Collection, List, Set, Queue & Map",
      "language": "java",
      "level": "Beginner",
      "whyItMatters": "The Java Collections Framework (JCF) is the core toolkit for all data structure operations in Java. Knowing the precise interface hierarchy and why Map does not inherit from Collection is a foundational interview checkpoint.",
      "explanation": "The Java Collections Framework provides a unified architecture for storing and manipulating groups of objects.\nKey Hierarchies:\n1. `Iterable<T>`: The root interface of the collection hierarchy. Declares `iterator()` and `forEach()`, enabling enhanced for-each loops.\n2. `Collection<T>`: Sub-interface of `Iterable`. Defines general operations (add, remove, size, contains, clear, toArray).\n   - `List<T>`: Ordered collection (sequence). Allows duplicate elements and positional index access (ArrayList, LinkedList, Vector/Stack).\n   - `Set<T>`: Unordered collection prohibiting duplicate elements (HashSet, LinkedHashSet, TreeSet).\n   - `Queue<T>` / `Deque<T>`: Collections designed for holding elements prior to processing (PriorityQueue, ArrayDeque, LinkedList).\n3. `Map<K, V>`: Stores key-value mappings with unique keys (HashMap, LinkedHashMap, TreeMap). Note: `Map` does NOT extend `Collection` or `Iterable` because maps operate on pairs rather than individual elements, though maps expose collection views via `keySet()`, `values()`, and `entrySet()`.",
      "syntaxAndStructure": "// Hierarchy Structure:\n// Iterable<T>\n//   └── Collection<T>\n//         ├── List<T>        (ArrayList, LinkedList)\n//         ├── Set<T>         (HashSet, LinkedHashSet, TreeSet)\n//         └── Queue<T>       (PriorityQueue, ArrayDeque)\n//\n// Map<K,V> (Independent Hierarchy: HashMap, LinkedHashMap, TreeMap)",
      "codeExamples": [
        {
          "title": "Traversing the Collection Views of a Map",
          "code": "import java.util.LinkedHashMap;\nimport java.util.Map;\n\npublic class MapCollectionViewDemo {\n    public static void main(String[] args) {\n        Map<String, Integer> scores = new LinkedHashMap<>();\n        scores.put(\"Alice\", 95);\n        scores.put(\"Bob\", 88);\n        scores.put(\"Charlie\", 92);\n\n        // 1. EntrySet view (Key-Value pairs)\n        System.out.println(\"--- EntrySet View ---\");\n        for (Map.Entry<String, Integer> entry : scores.entrySet()) {\n            System.out.println(entry.getKey() + \" -> \" + entry.getValue());\n        }\n\n        // 2. KeySet view\n        System.out.println(\"Keys: \" + scores.keySet());\n\n        // 3. Values collection view\n        System.out.println(\"Values: \" + scores.values());\n    }\n}",
          "expectedOutput": "--- EntrySet View ---\nAlice -> 95\nBob -> 88\nCharlie -> 92\nKeys: [Alice, Bob, Charlie]\nValues: [95, 88, 92]",
          "explanation": "Even though Map does not extend Collection, its entrySet(), keySet(), and values() methods return Collection views that integrate with for-each and Stream processing."
        },
        {
          "title": "Polymorphic Collection Processing",
          "code": "import java.util.*;\n\npublic class CollectionHierarchyDemo {\n    public static void printCollectionSize(Collection<?> col) {\n        System.out.println(col.getClass().getSimpleName() + \" size: \" + col.size());\n    }\n\n    public static void main(String[] args) {\n        List<String> list = new ArrayList<>(List.of(\"A\", \"B\", \"C\"));\n        Set<Integer> set = new HashSet<>(Set.of(1, 2));\n        Queue<Double> queue = new ArrayDeque<>(List.of(3.14));\n\n        printCollectionSize(list);\n        printCollectionSize(set);\n        printCollectionSize(queue);\n    }\n}",
          "expectedOutput": "ArrayList size: 3\nHashSet size: 2\nArrayDeque size: 1",
          "explanation": "List, Set, and Queue all inherit from Collection, enabling unified algorithms and utility methods."
        }
      ],
      "realWorldApplications": [
        "Selecting the appropriate collection type based on requirements: fast random access (ArrayList), uniqueness (HashSet), sorting (TreeSet), or FIFO buffering (ArrayDeque).",
        "Designing clean API contracts by accepting `Collection<T>` or `List<T>` interfaces."
      ],
      "commonMistakes": [
        "Assuming `Map` extends `Collection`; Map has a completely separate interface hierarchy.",
        "Using legacy thread-safe collections (`Vector`, `Hashtable`) instead of modern concurrent collections (`ConcurrentHashMap`, `CopyOnWriteArrayList`).",
        "Assuming Map implements the Collection interface; Map is a separate top-level hierarchy in java.util."
      ],
      "interviewRelevance": "Universal interview question: \"Draw the Java Collections hierarchy diagram\" and \"Why doesn't Map inherit from Collection?\"",
      "checkpoints": [
        {
          "id": "java-39-cp-1",
          "label": "Draw the full Collections framework inheritance hierarchy"
        },
        {
          "id": "java-39-cp-2",
          "label": "Explain why Map is decoupled from Collection and how entrySet() connects them"
        },
        {
          "id": "java-39-collections-hierarchy-cp-3",
          "label": "Navigate the relationships between Iterable, Collection, List, Set, Queue, and Map."
        }
      ],
      "practiceExercises": [
        {
          "id": "java-39-ex-1",
          "title": "Classify Collection Characteristics",
          "difficulty": "Beginner",
          "type": "conceptual",
          "prompt": "State whether duplicates and ordering are preserved in: 1) ArrayList, 2) HashSet, 3) LinkedHashSet, 4) TreeSet.",
          "solution": "1) ArrayList: Allows duplicates, preserves insertion order.\n2) HashSet: No duplicates, unordered.\n3) LinkedHashSet: No duplicates, preserves insertion order.\n4) TreeSet: No duplicates, sorted by natural order or Comparator.",
          "explanation": "Evaluates understanding of duplicate handling and ordering contracts across core collection types."
        },
        {
          "id": "java-39-ex-2",
          "title": "Count Frequency Using Map",
          "difficulty": "Intermediate",
          "type": "coding",
          "prompt": "Given a list of words, count word frequencies using Map.getOrDefault() in O(n) time.",
          "solution": "import java.util.*;\n\npublic class WordFrequency {\n    public static Map<String, Integer> countFrequencies(List<String> words) {\n        Map<String, Integer> freq = new HashMap<>();\n        for (String w : words) {\n            freq.put(w, freq.getOrDefault(w, 0) + 1);\n        }\n        return freq;\n    }\n    public static void main(String[] args) {\n        List<String> words = List.of(\"apple\", \"banana\", \"apple\", \"cherry\", \"banana\", \"apple\");\n        System.out.println(\"Frequencies: \" + countFrequencies(words));\n    }\n}",
          "explanation": "Map.getOrDefault() eliminates manual null checks when updating counting dictionaries."
        },
        {
          "id": "java-39-ex-3",
          "title": "Iterable Implementation from Scratch",
          "difficulty": "Advanced",
          "type": "coding",
          "prompt": "Create a custom class Range(int start, int end) that implements Iterable<Integer> so it can be used directly in an enhanced for-each loop.",
          "solution": "import java.util.Iterator;\n\npublic class Range implements Iterable<Integer> {\n    private final int start, end;\n    public Range(int s, int e) { this.start = s; this.end = e; }\n\n    @Override\n    public Iterator<Integer> iterator() {\n        return new Iterator<>() {\n            private int curr = start;\n            public boolean hasNext() { return curr <= end; }\n            public Integer next() { return curr++; }\n        };\n    }\n    public static void main(String[] args) {\n        for (int n : new Range(1, 5)) {\n            System.out.print(n + \" \");\n        }\n        System.out.println();\n    }\n}",
          "explanation": "Implementing Iterable<T> and supplying an Iterator<T> allows custom data structures to integrate with Java's for-each loop."
        }
      ],
      "quizQuestions": [
        {
          "id": "java-39-q1",
          "question": "Why does the Map interface NOT extend the Collection interface in Java?",
          "options": [
            "Because Map was created in C++",
            "Because Maps operate on key-value pairs, which incompatible with the single-element methods of Collection (like add(E))",
            "Because Map is deprecated",
            "Because Collections are only for primitives"
          ],
          "correctOptionIndex": 1,
          "explanation": "Collection represents a container of individual elements with methods like add(E). Map contains key-value pairs and cannot cleanly fulfill that contract."
        },
        {
          "id": "java-39-q2",
          "question": "Which interface in the Java Collections Framework enables an object to be targeted by the enhanced for-each loop?",
          "options": [
            "java.util.Collection",
            "java.lang.Iterable",
            "java.util.Iterator",
            "java.util.List"
          ],
          "correctOptionIndex": 1,
          "explanation": "The enhanced for-each loop requires target objects to implement `java.lang.Iterable` (or be an array)."
        }
      ],
      "revisionNotes": [
        "Iterable is the root interface; Collection extends Iterable.",
        "List (ordered, duplicates), Set (unique, no duplicates), Queue (FIFO processing).",
        "Map (key-value pairs) is an independent hierarchy that exposes collection views."
      ]
    },
    {
      "id": "java-40-arraylist",
      "moduleId": "java-m4",
      "moduleNumber": 4,
      "moduleTitle": "Java Collections Framework",
      "topicNumber": 40,
      "title": "ArrayList: Dynamic Resizing Mechanics, Capacity & Performance",
      "language": "java",
      "level": "Beginner",
      "whyItMatters": "ArrayList is by far the most commonly used collection in Java. Understanding its internal growth formula (50% expansion), amortized O(1) appending, and when to specify initial capacity prevents expensive array reallocations.",
      "explanation": "An `ArrayList` is a resizable dynamic array implementation of the `List` interface.\nInternal Mechanics:\n1. Backing Array: Backed by `transient Object[] elementData`.\n2. Default Capacity: When instantiated with `new ArrayList<>()`, it starts with an empty array. On the first `add()` call, it expands to a default capacity of 10.\n3. Growth Formula (Java 8+): When the array becomes full, it resizes using the formula:\n   `int newCapacity = oldCapacity + (oldCapacity >> 1);`\n   This represents a 50% growth factor (e.g. 10 -> 15 -> 22 -> 33). It allocates a new array on the Heap and copies existing elements using native `Arrays.copyOf()` / `System.arraycopy()`.\n4. Time Complexity:\n   - Random Access `get(index)` / `set(index)`: $O(1)$ constant time (direct memory address calculation).\n   - Appending `add(element)`: Amortized $O(1)$ time; worst-case $O(n)$ on resize.\n   - Positional `add(index, element)` / `remove(index)`: $O(n)$ time due to shifting elements.\n5. `ensureCapacity(minCapacity)`: Pre-allocates space to avoid multiple resizes.",
      "syntaxAndStructure": "// Instantiation with explicit initial capacity (best practice if size is known):\nList<String> list = new ArrayList<>(1000);\n\n// Common operations:\nlist.add(\"Apple\");\nString item = list.get(0); // O(1)\nlist.set(0, \"Apricot\");    // O(1)\nlist.remove(0);            // O(n) element shift",
      "codeExamples": [
        {
          "title": "ArrayList Operations and Removal by Index vs Object",
          "code": "import java.util.ArrayList;\nimport java.util.List;\n\npublic class ArrayListTrapDemo {\n    public static void main(String[] args) {\n        List<Integer> numbers = new ArrayList<>();\n        numbers.add(10);\n        numbers.add(20);\n        numbers.add(30);\n\n        // Trap: remove(int index) vs remove(Object o)\n        // Calling remove(1) removes the element at INDEX 1 (which is 20)\n        numbers.remove(1);\n        System.out.println(\"After remove(1): \" + numbers);\n\n        // To remove the integer value 10 by object equality, wrap it:\n        numbers.remove(Integer.valueOf(10));\n        System.out.println(\"After remove(Integer.valueOf(10)): \" + numbers);\n    }\n}",
          "expectedOutput": "After remove(1): [10, 30]\nAfter remove(Integer.valueOf(10)): [30]",
          "explanation": "List defines two overloaded remove methods: remove(int index) and remove(Object o). When passing primitive int 1, the compiler matches the index overload."
        },
        {
          "title": "Optimizing ArrayList with ensureCapacity",
          "code": "import java.util.ArrayList;\n\npublic class ArrayListCapacityDemo {\n    public static void main(String[] args) {\n        // Pre-allocating capacity avoids repeated internal array copy operations\n        ArrayList<Integer> fastList = new ArrayList<>(1000);\n        \n        for (int i = 0; i < 5; i++) {\n            fastList.add(i * 10);\n        }\n        \n        System.out.println(\"FastList size: \" + fastList.size());\n        System.out.println(\"FastList elements: \" + fastList);\n    }\n}",
          "expectedOutput": "FastList size: 5\nFastList elements: [0, 10, 20, 30, 40]",
          "explanation": "Pre-specifying capacity allocates the exact backing buffer once, eliminating geometric 50% resize cycles."
        }
      ],
      "realWorldApplications": [
        "Serving database query results into memory where random access by index is frequent.",
        "Storing homogeneous data sets in REST APIs and caching layers."
      ],
      "commonMistakes": [
        "Using `ArrayList` when frequent insertions and deletions occur at the beginning or middle of large lists (causes $O(n)$ array element shifting).",
        "Confusing `remove(int index)` with `remove(Object o)` when working with `List<Integer>`.",
        "Using ArrayList without pre-allocating capacity when inserting millions of elements, causing repeated array reallocations."
      ],
      "interviewRelevance": "Universal interview question: \"How does ArrayList resize internally?\", \"What is the time complexity of add() vs add(index, element)?\", and \"Why is initial capacity important?\"",
      "checkpoints": [
        {
          "id": "java-40-cp-1",
          "label": "Explain the 50% growth formula: oldCapacity + (oldCapacity >> 1)"
        },
        {
          "id": "java-40-cp-2",
          "label": "Differentiate remove(int index) from remove(Object o) in List<Integer>"
        },
        {
          "id": "java-40-arraylist-cp-3",
          "label": "Explain internal array resizing, amortized O(1) appends, and O(N) positional insertions."
        }
      ],
      "practiceExercises": [
        {
          "id": "java-40-ex-1",
          "title": "Deduplicate ArrayList Preserving Order",
          "difficulty": "Beginner",
          "type": "coding",
          "prompt": "Remove duplicate elements from an ArrayList while preserving their original first-occurrence insertion order.",
          "solution": "import java.util.*;\n\npublic class DeduplicateList {\n    public static <T> List<T> deduplicate(List<T> list) {\n        return new ArrayList<>(new LinkedHashSet<>(list));\n    }\n    public static void main(String[] args) {\n        List<String> items = List.of(\"A\", \"B\", \"A\", \"C\", \"B\");\n        System.out.println(\"Deduplicated: \" + deduplicate(items));\n    }\n}",
          "explanation": "LinkedHashSet discards duplicates while maintaining the original insertion sequence."
        },
        {
          "id": "java-40-ex-2",
          "title": "Reverse Sublist in ArrayList In-Place",
          "difficulty": "Intermediate",
          "type": "coding",
          "prompt": "Reverse the elements of an ArrayList between index start and end in-place without creating a new list.",
          "solution": "import java.util.*;\n\npublic class ReverseSublist {\n    public static <T> void reverseRange(List<T> list, int start, int end) {\n        while (start < end) {\n            T temp = list.get(start);\n            list.set(start, list.get(end));\n            list.set(end, temp);\n            start++;\n            end--;\n        }\n    }\n    public static void main(String[] args) {\n        List<Integer> list = new ArrayList<>(List.of(1, 2, 3, 4, 5));\n        reverseRange(list, 1, 3);\n        System.out.println(\"Reversed sublist (1 to 3): \" + list);\n    }\n}",
          "explanation": "Two-pointer swapping using set(index, val) updates elements in-place with O(1) memory."
        },
        {
          "id": "java-40-ex-3",
          "title": "SubList View Modification Synchronization",
          "difficulty": "Advanced",
          "type": "coding",
          "prompt": "Demonstrate how modifying a List via its subList() view affects the backing list, and what happens if the backing list is modified structurally.",
          "solution": "import java.util.*;\n\npublic class SubListDemo {\n    public static void main(String[] args) {\n        List<String> list = new ArrayList<>(List.of(\"A\", \"B\", \"C\", \"D\"));\n        List<String> sub = list.subList(1, 3); // View of [\"B\", \"C\"]\n        sub.set(0, \"MODIFIED_B\");\n        System.out.println(\"Backing list reflects change: \" + list);\n\n        // Structural modification of backing list invalidates subList view:\n        list.add(\"E\");\n        try {\n            sub.get(0); // Throws ConcurrentModificationException!\n        } catch (ConcurrentModificationException e) {\n            System.out.println(\"subList invalidated after structural change to parent list.\");\n        }\n    }\n}",
          "explanation": "subList returns a window view into the parent list; modifying the parent list structurally invalidates the subList view."
        }
      ],
      "quizQuestions": [
        {
          "id": "java-40-q1",
          "question": "By what percentage does an ArrayList grow when its backing array is full in standard modern Java?",
          "options": [
            "100% (doubles)",
            "50% (1.5x)",
            "25%",
            "Fixed 10 elements"
          ],
          "correctOptionIndex": 1,
          "explanation": "In Java 8+, ArrayList grows by 50% using the bitwise formula `oldCapacity + (oldCapacity >> 1)`."
        },
        {
          "id": "java-40-q2",
          "question": "What is the time complexity of calling `list.add(0, element)` on an ArrayList containing N elements?",
          "options": [
            "O(1)",
            "O(log N)",
            "O(N)",
            "O(N^2)"
          ],
          "correctOptionIndex": 2,
          "explanation": "Inserting at index 0 requires shifting all N existing elements one position to the right via System.arraycopy, which takes O(N) linear time."
        }
      ],
      "revisionNotes": [
        "ArrayList is a resizable array with O(1) random access by index.",
        "Grows by 50% when full: `newCapacity = oldCapacity + (oldCapacity >> 1)`.",
        "Inserting or deleting from the beginning/middle requires O(n) element shifting."
      ]
    },
    {
      "id": "java-41-linkedlist",
      "moduleId": "java-m4",
      "moduleNumber": 4,
      "moduleTitle": "Java Collections Framework",
      "topicNumber": 41,
      "title": "LinkedList: Doubly-Linked Architecture, Deque & Locality of Reference",
      "language": "java",
      "level": "Beginner",
      "whyItMatters": "LinkedList implements both `List` and `Deque`. Understanding why modern software almost always prefers `ArrayList` and `ArrayDeque` over `LinkedList` due to CPU cache locality and pointer overhead is a hallmark of senior Java engineers.",
      "explanation": "In Java, `LinkedList` is a doubly-linked list where each element is stored inside an independent `Node` object on the Heap:\n`private static class Node<E> { E item; Node<E> next; Node<E> prev; }`\nKey Characteristics:\n1. Dual Interface: Implements both `List<E>` and `Deque<E>`, allowing it to serve as a queue, stack, or list.\n2. Time Complexity:\n   - Insertion/Deletion at ends (`addFirst`, `addLast`, `removeFirst`): $O(1)$ constant time.\n   - Access by Index `get(index)`: $O(n)$ time (must traverse pointers from head or tail, choosing whichever is closer).\n   - Positional insertion `add(index, element)`: $O(n)$ traversal + $O(1)$ pointer rewire.\n3. The Modern Dilemma — CPU Cache Locality vs Pointer Hopping:\n   Even though LinkedList has $O(1)$ insertion at ends, each Node allocates a 24-byte object on the Heap. Nodes are scattered across non-contiguous memory addresses, causing frequent CPU Cache Misses. `ArrayList` and `ArrayDeque` store elements contiguously in CPU L1/L2 cache lines, making them faster in real-world benchmarks even for many middle insertions.",
      "syntaxAndStructure": "// Using LinkedList as Deque / Queue:\nDeque<String> queue = new LinkedList<>();\nqueue.offer(\"First\"); // Enqueue\nString item = queue.poll(); // Dequeue O(1)\n\n// Using as List:\nList<String> list = new LinkedList<>();\nlist.add(\"Data\");",
      "codeExamples": [
        {
          "title": "LinkedList as a Double-Ended Queue (Deque)",
          "code": "import java.util.Deque;\nimport java.util.LinkedList;\n\npublic class LinkedListDequeDemo {\n    public static void main(String[] args) {\n        Deque<String> deque = new LinkedList<>();\n\n        // Add to both ends in O(1)\n        deque.addFirst(\"Middle\");\n        deque.addFirst(\"Head\");\n        deque.addLast(\"Tail\");\n\n        System.out.println(\"Deque state: \" + deque);\n\n        // Remove from both ends in O(1)\n        String first = deque.removeFirst();\n        String last = deque.removeLast();\n\n        System.out.println(\"Removed head: \" + first);\n        System.out.println(\"Removed tail: \" + last);\n        System.out.println(\"Remaining: \" + deque);\n    }\n}",
          "expectedOutput": "Deque state: [Head, Middle, Tail]\nRemoved head: Head\nRemoved tail: Tail\nRemaining: [Middle]",
          "explanation": "LinkedList maintains head and tail pointers, allowing O(1) insertion and removal at both ends without shifting elements."
        },
        {
          "title": "Demonstrating Indexed Access Traversal Overhead",
          "code": "import java.util.LinkedList;\n\npublic class LinkedListIndexTraversal {\n    public static void main(String[] args) {\n        LinkedList<String> letters = new LinkedList<>();\n        letters.add(\"A\");\n        letters.add(\"B\");\n        letters.add(\"C\");\n        letters.add(\"D\");\n\n        // get(index) traverses pointers from the nearest end (head or tail)\n        String middle = letters.get(2);\n        System.out.println(\"Element at index 2: \" + middle);\n    }\n}",
          "expectedOutput": "Element at index 2: C",
          "explanation": "Unlike ArrayList where get(index) computes memory offset in 1 CPU cycle, LinkedList get(index) walks node pointers sequentially."
        }
      ],
      "realWorldApplications": [
        "Scenarios requiring frequent head insertions where contiguous resizing arrays would suffer large memory copy overhead.",
        "Implementing LRU caches (often via `LinkedHashMap` which combines hashtables with doubly-linked lists)."
      ],
      "commonMistakes": [
        "Iterating through a LinkedList using `for (int i = 0; i < list.size(); i++) list.get(i);` resulting in disastrous $O(n^2)$ quadratic runtime. Always use an `Iterator` or enhanced for-each loop!",
        "Choosing `LinkedList` over `ArrayList` based on theoretical $O(1)$ insertion, without accounting for CPU cache miss latency.",
        "Using LinkedList for indexed access (get(i)), which requires O(N) node traversal compared to O(1) in ArrayList."
      ],
      "interviewRelevance": "Universal interview question: \"ArrayList vs LinkedList — which is faster and why?\", \"Why does iterating with get(i) cause O(n^2) on LinkedList?\", and \"What is cache locality?\"",
      "checkpoints": [
        {
          "id": "java-41-cp-1",
          "label": "Explain the internal doubly-linked node structure of Java LinkedList"
        },
        {
          "id": "java-41-cp-2",
          "label": "Articulate why CPU cache lines make ArrayList faster than LinkedList in practice"
        },
        {
          "id": "java-41-linkedlist-cp-3",
          "label": "Evaluate node pointer memory overhead and CPU cache miss implications of LinkedList."
        }
      ],
      "practiceExercises": [
        {
          "id": "java-41-ex-1",
          "title": "Quadratic vs Linear Iteration Trap",
          "difficulty": "Beginner",
          "type": "coding",
          "prompt": "Demonstrate why for(int i=0; i<list.size(); i++) get(i) is O(n^2) and rewrite it to O(n) using an Iterator.",
          "solution": "import java.util.*;\n\npublic class IterationComparison {\n    public static void main(String[] args) {\n        LinkedList<Integer> list = new LinkedList<>(List.of(10, 20, 30));\n        \n        // O(N) using Iterator / for-each\n        int sum = 0;\n        for (int val : list) {\n            sum += val; // Advances single pointer in O(1) per step!\n        }\n        System.out.println(\"O(N) Sum: \" + sum);\n    }\n}",
          "explanation": "get(i) restarts traversal from head/tail every time, causing 1 + 2 + ... + N = O(N^2) steps. Iterator retains pointer position in O(1)."
        },
        {
          "id": "java-41-ex-2",
          "title": "Implement Queue Using LinkedList",
          "difficulty": "Intermediate",
          "type": "coding",
          "prompt": "Implement a FIFO queue using LinkedList without throwing exceptions on empty queue checks.",
          "solution": "import java.util.*;\n\npublic class SafeQueue<T> {\n    private final LinkedList<T> list = new LinkedList<>();\n\n    public void enqueue(T item) { list.addLast(item); }\n    public T dequeue() { return list.pollFirst(); } // Returns null if empty\n    public T peek() { return list.peekFirst(); }\n\n    public static void main(String[] args) {\n        SafeQueue<String> q = new SafeQueue<>();\n        q.enqueue(\"A\");\n        q.enqueue(\"B\");\n        System.out.println(\"Dequeued: \" + q.dequeue());\n        System.out.println(\"Next peek: \" + q.peek());\n    }\n}",
          "explanation": "pollFirst() and peekFirst() safely return null when the list is empty, avoiding NoSuchElementException."
        },
        {
          "id": "java-41-ex-3",
          "title": "Memory Footprint Comparison (JOL Analysis)",
          "difficulty": "Advanced",
          "type": "conceptual",
          "prompt": "Calculate the heap memory overhead of storing 1,000,000 integers in ArrayList<Integer> vs LinkedList<Integer> on a 64-bit JVM.",
          "solution": "For each element:\n- ArrayList: 1 reference pointer (4 bytes with compressed OOPs) in the backing array + Integer object (16 bytes) = ~20 bytes per element.\n- LinkedList: Node object header (12 bytes) + item pointer (4 bytes) + next pointer (4 bytes) + prev pointer (4 bytes) + 8-byte alignment padding = 32 bytes for the Node + Integer object (16 bytes) = 48 bytes per element.\nLinkedList consumes 2.4x more heap memory due to massive node pointer overhead and object headers.",
          "explanation": "Doubly-linked nodes introduce enormous pointer and object header overhead on the JVM heap."
        }
      ],
      "quizQuestions": [
        {
          "id": "java-41-q1",
          "question": "What data structure is used internally by java.util.LinkedList?",
          "options": [
            "Singly-linked list with tail pointer",
            "Doubly-linked list with head and tail pointers",
            "Dynamic resizable array",
            "Circular buffer"
          ],
          "correctOptionIndex": 1,
          "explanation": "LinkedList is implemented as a doubly-linked list where each Node has `next` and `prev` pointers."
        },
        {
          "id": "java-41-q2",
          "question": "Why does accessing elements by index using `get(index)` take O(n) in LinkedList but O(1) in ArrayList?",
          "options": [
            "LinkedList is synchronized",
            "LinkedList must traverse node pointers sequentially from head or tail to reach the requested index",
            "ArrayList uses binary search for get()",
            "LinkedList does not support zero-based indexing"
          ],
          "correctOptionIndex": 1,
          "explanation": "Nodes in a linked list are scattered in memory without direct address arithmetic, requiring sequential traversal from head or tail."
        }
      ],
      "revisionNotes": [
        "LinkedList implements both `List` and `Deque` as a doubly-linked list.",
        "O(1) insertion/removal at head and tail; O(n) search and indexed access.",
        "ArrayList is generally faster in practice due to contiguous CPU cache lines."
      ]
    },
    {
      "id": "java-42-hashset-linkedhashset",
      "moduleId": "java-m4",
      "moduleNumber": 4,
      "moduleTitle": "Java Collections Framework",
      "topicNumber": 42,
      "title": "HashSet & LinkedHashSet: Hashing, Uniqueness & Insertion Order",
      "language": "java",
      "level": "Beginner",
      "whyItMatters": "Sets guarantee uniqueness of elements. Knowing that `HashSet` is backed by an internal `HashMap` and understanding how `LinkedHashSet` preserves insertion order using a doubly-linked list is essential for solving deduplication problems in DSA.",
      "explanation": "A `Set` is a collection that cannot contain duplicate elements.\n1. `HashSet`:\n   - Backed by an internal `HashMap<E, Object>` instance!\n   - When you call `hashSet.add(element)`, it executes `map.put(element, PRESENT)` where `PRESENT` is a dummy static `Object`.\n   - Uniqueness is determined by the element's `hashCode()` and `equals()` methods.\n   - Unordered: Makes no guarantees regarding iteration order; ordering can change when the hash table rehashes.\n   - Offers $O(1)$ average time complexity for add, remove, and contains.\n2. `LinkedHashSet`:\n   - Subclass of `HashSet` backed by an internal `LinkedHashMap`.\n   - Maintains a doubly-linked list running through all its entries.\n   - Preserves Insertion Order: Iterating over a `LinkedHashSet` yields elements in the exact order they were inserted.\n   - Performance: Slightly slower than `HashSet` on insertion due to linked list pointer maintenance, but faster iteration proportional to size rather than capacity.",
      "syntaxAndStructure": "// HashSet (Unordered, O(1))\nSet<String> set = new HashSet<>();\nset.add(\"apple\");\nset.add(\"banana\");\nset.add(\"apple\"); // Duplicate rejected (returns false)\n\n// LinkedHashSet (Insertion Order Preserved, O(1))\nSet<String> orderedSet = new LinkedHashSet<>();\norderedSet.add(\"first\");\norderedSet.add(\"second\");",
      "codeExamples": [
        {
          "title": "HashSet Uniqueness and Under-the-Hood HashMap Backing",
          "code": "import java.util.HashSet;\nimport java.util.Set;\n\npublic class HashSetUniquenessDemo {\n    public static void main(String[] args) {\n        Set<String> usernames = new HashSet<>();\n\n        // add() returns boolean indicating whether element was new\n        System.out.println(\"Add 'alice': \" + usernames.add(\"alice\")); // true\n        System.out.println(\"Add 'bob': \" + usernames.add(\"bob\"));     // true\n        System.out.println(\"Add duplicate 'alice': \" + usernames.add(\"alice\")); // false!\n\n        System.out.println(\"Total unique users: \" + usernames.size());\n        System.out.println(\"Contains 'alice': \" + usernames.contains(\"alice\"));\n    }\n}",
          "expectedOutput": "Add 'alice': true\nAdd 'bob': true\nAdd duplicate 'alice': false\nTotal unique users: 2\nContains 'alice': true",
          "explanation": "HashSet delegates to HashMap.put(). If the key already exists, the set returns false and discards the duplicate."
        },
        {
          "title": "HashSet (Unordered) vs LinkedHashSet (Insertion-Ordered)",
          "code": "import java.util.HashSet;\nimport java.util.LinkedHashSet;\nimport java.util.List;\nimport java.util.Set;\n\npublic class SetOrderingComparison {\n    public static void main(String[] args) {\n        List<String> input = List.of(\"Zebra\", \"Apple\", \"Mango\", \"Banana\");\n\n        // HashSet does NOT preserve insertion order\n        Set<String> hashSet = new HashSet<>(input);\n        System.out.println(\"HashSet (arbitrary hash order): \" + hashSet);\n\n        // LinkedHashSet strictly guarantees insertion order\n        Set<String> linkedHashSet = new LinkedHashSet<>(input);\n        System.out.println(\"LinkedHashSet (exact insertion order): \" + linkedHashSet);\n    }\n}",
          "expectedOutput": "HashSet (arbitrary hash order): [Apple, Zebra, Mango, Banana]\nLinkedHashSet (exact insertion order): [Zebra, Apple, Mango, Banana]",
          "explanation": "LinkedHashSet maintains a doubly-linked list across entries, guaranteeing that iteration matches original insertion sequence."
        }
      ],
      "realWorldApplications": [
        "Deduplicating stream records and tracking visited nodes in graph BFS/DFS traversals.",
        "Preserving input sequence order during deduplication (using LinkedHashSet)."
      ],
      "commonMistakes": [
        "Failing to override both `hashCode()` and `equals()` in custom objects added to a Set, causing duplicate objects to be stored.",
        "Assuming `HashSet` maintains insertion or alphabetical order; it is explicitly unordered.",
        "Inserting mutable objects into a HashSet and subsequently modifying their fields, corrupting hash bucket lookups."
      ],
      "interviewRelevance": "Universal interview question: \"How does HashSet work internally in Java?\", \"What is the return value of set.add() on duplicate?\", and \"Difference between HashSet and LinkedHashSet.\"",
      "checkpoints": [
        {
          "id": "java-42-cp-1",
          "label": "Explain how HashSet is implemented using an internal HashMap and dummy PRESENT value"
        },
        {
          "id": "java-42-cp-2",
          "label": "Contrast ordering guarantees between HashSet (none) and LinkedHashSet (insertion order)"
        },
        {
          "id": "java-42-hashset-linkedhashset-cp-3",
          "label": "Choose HashSet for O(1) set operations and LinkedHashSet when insertion order matters."
        }
      ],
      "practiceExercises": [
        {
          "id": "java-42-ex-1",
          "title": "Find First Duplicate in Array",
          "difficulty": "Beginner",
          "type": "coding",
          "prompt": "Use a HashSet to find the first recurring duplicate integer in an array in O(n) time.",
          "solution": "import java.util.*;\n\npublic class FirstDuplicate {\n    public static Integer findFirstDuplicate(int[] nums) {\n        Set<Integer> seen = new HashSet<>();\n        for (int n : nums) {\n            if (!seen.add(n)) return n; // add() returns false if already present\n        }\n        return null;\n    }\n    public static void main(String[] args) {\n        int[] arr = { 2, 5, 1, 2, 3, 5, 1 };\n        System.out.println(\"First duplicate: \" + findFirstDuplicate(arr));\n    }\n}",
          "explanation": "Leveraging the boolean return value of set.add() detects duplicates in a single linear pass."
        },
        {
          "id": "java-42-ex-2",
          "title": "Set Intersection and Union Operations",
          "difficulty": "Intermediate",
          "type": "coding",
          "prompt": "Given two sets A and B, compute their mathematical Union and Intersection using Set bulk methods.",
          "solution": "import java.util.*;\n\npublic class SetMathOperations {\n    public static void main(String[] args) {\n        Set<Integer> a = new HashSet<>(Set.of(1, 2, 3, 4));\n        Set<Integer> b = new HashSet<>(Set.of(3, 4, 5, 6));\n\n        // Union (a | b)\n        Set<Integer> union = new HashSet<>(a);\n        union.addAll(b);\n        System.out.println(\"Union: \" + union);\n\n        // Intersection (a & b)\n        Set<Integer> intersection = new HashSet<>(a);\n        intersection.retainAll(b);\n        System.out.println(\"Intersection: \" + intersection);\n    }\n}",
          "explanation": "addAll() performs set union; retainAll() performs set intersection."
        },
        {
          "id": "java-42-ex-3",
          "title": "Missing hashCode() Bug in HashSet",
          "difficulty": "Advanced",
          "type": "coding",
          "prompt": "Create a class Person with name and id that overrides equals() but NOT hashCode(). Demonstrate how duplicate persons can be added to a HashSet.",
          "solution": "import java.util.*;\n\nclass BadPerson {\n    int id;\n    BadPerson(int id) { this.id = id; }\n    @Override\n    public boolean equals(Object o) {\n        if (this == o) return true;\n        if (!(o instanceof BadPerson other)) return false;\n        return this.id == other.id;\n    }\n    // Missing hashCode() override! Uses identity hashCode!\n}\n\npublic class HashCodeViolationDemo {\n    public static void main(String[] args) {\n        Set<BadPerson> set = new HashSet<>();\n        set.add(new BadPerson(1));\n        set.add(new BadPerson(1));\n        System.out.println(\"Set size with duplicates: \" + set.size()); // Prints 2!\n    }\n}",
          "explanation": "Without overriding hashCode(), distinct instances land in different buckets, so equals() is never even checked."
        }
      ],
      "quizQuestions": [
        {
          "id": "java-42-q1",
          "question": "What data structure is used internally by java.util.HashSet to store its elements?",
          "options": [
            "A balanced Red-Black tree",
            "An internal java.util.HashMap instance",
            "A dynamic primitive array",
            "A circular queue"
          ],
          "correctOptionIndex": 1,
          "explanation": "HashSet is backed by a HashMap where set elements are stored as keys, mapped to a dummy dummy Object value."
        },
        {
          "id": "java-42-q2",
          "question": "What is the primary difference between HashSet and LinkedHashSet?",
          "options": [
            "LinkedHashSet allows duplicates, HashSet does not",
            "LinkedHashSet preserves insertion order; HashSet does not guarantee any order",
            "HashSet is sorted, LinkedHashSet is unsorted",
            "LinkedHashSet uses O(log n) tree search"
          ],
          "correctOptionIndex": 1,
          "explanation": "LinkedHashSet maintains a doubly-linked list through all its entries, preserving insertion order during iteration."
        }
      ],
      "revisionNotes": [
        "HashSet is backed by an internal HashMap; elements are stored as keys with a dummy value.",
        "LinkedHashSet preserves insertion order using a doubly-linked bucket list.",
        "Custom objects added to Sets MUST override both `equals()` and `hashCode()`."
      ]
    },
    {
      "id": "java-43-treeset",
      "moduleId": "java-m4",
      "moduleNumber": 4,
      "moduleTitle": "Java Collections Framework",
      "topicNumber": 43,
      "title": "TreeSet: Red-Black Tree, NavigableSet & Range Queries",
      "language": "java",
      "level": "Beginner",
      "whyItMatters": "When elements must remain continuously sorted with guaranteed O(log n) time complexity, `TreeSet` is the standard choice. Understanding `NavigableSet` range methods (`subSet`, `floor`, `ceiling`, `higher`, `lower`) is critical for interval and boundary algorithm problems.",
      "explanation": "A `TreeSet` is a `NavigableSet` implementation based on a self-balancing Red-Black Tree (backed by an internal `TreeMap`).\nKey Characteristics:\n1. Sorted Order: Elements are sorted according to their natural ordering (`Comparable`), or by a custom `Comparator` provided at construction time.\n2. Guaranteed $O(\\log n)$ Time: Basic operations (`add`, `remove`, `contains`) execute in $O(\\log n)$ time.\n3. Prohibits null (in modern Java): Inserting `null` throws `NullPointerException` because elements must be compared.\n4. `NavigableSet` Range Operations:\n   - `floor(e)`: Greatest element $\\le e$, or null.\n   - `ceiling(e)`: Smallest element $\\ge e$, or null.\n   - `lower(e)`: Greatest element $< e$, or null.\n   - `higher(e)`: Smallest element $> e$, or null.\n   - `subSet(from, fromInc, to, toInc)`: Returns a range view.\n5. Consistency with equals: A TreeSet determines element equality using `compareTo()` or `compare()`, NOT `equals()`! If `a.compareTo(b) == 0`, TreeSet treats them as duplicates.",
      "syntaxAndStructure": "// Natural ordering (requires Comparable):\nNavigableSet<Integer> set = new TreeSet<>();\nset.addAll(List.of(20, 10, 40, 30));\n\n// Custom descending comparator:\nSet<String> descSet = new TreeSet<>(Comparator.reverseOrder());\n\n// Navigable range queries:\nInteger atOrBelow = set.floor(25); // 20\nInteger atOrAbove = set.ceiling(25); // 30",
      "codeExamples": [
        {
          "title": "NavigableSet Boundary and Range Methods",
          "code": "import java.util.NavigableSet;\nimport java.util.TreeSet;\n\npublic class TreeSetNavigableDemo {\n    public static void main(String[] args) {\n        NavigableSet<Integer> scores = new TreeSet<>();\n        scores.add(10);\n        scores.add(25);\n        scores.add(50);\n        scores.add(75);\n        scores.add(90);\n\n        System.out.println(\"TreeSet natural sorted: \" + scores);\n        System.out.println(\"Floor of 30 (<= 30): \" + scores.floor(30));\n        System.out.println(\"Ceiling of 30 (>= 30): \" + scores.ceiling(30));\n        System.out.println(\"Lower than 25 (< 25): \" + scores.lower(25));\n        System.out.println(\"Higher than 50 (> 50): \" + scores.higher(50));\n\n        // SubSet range view [25, 75] inclusive\n        System.out.println(\"SubSet [25, 75]: \" + scores.subSet(25, true, 75, true));\n    }\n}",
          "expectedOutput": "TreeSet natural sorted: [10, 25, 50, 75, 90]\nFloor of 30 (<= 30): 25\nCeiling of 30 (>= 30): 50\nLower than 25 (< 25): 10\nHigher than 50 (> 50): 75\nSubSet [25, 75]: [25, 50, 75]",
          "explanation": "floor/ceiling include the boundary value if present; lower/higher are strictly exclusive. subSet provides a live window into the tree."
        },
        {
          "title": "Custom Comparator in TreeSet",
          "code": "import java.util.Comparator;\nimport java.util.TreeSet;\n\npublic class CustomTreeSetDemo {\n    static class Task {\n        String name;\n        int priority; // Higher is more urgent\n\n        Task(String n, int p) { this.name = n; this.priority = p; }\n        public String toString() { return name + \"(p=\" + priority + \")\"; }\n    }\n\n    public static void main(String[] args) {\n        // Sort descending by priority, then ascending by name\n        TreeSet<Task> tasks = new TreeSet<>(\n            Comparator.comparingInt((Task t) -> t.priority).reversed()\n                      .thenComparing(t -> t.name)\n        );\n\n        tasks.add(new Task(\"BugFix\", 2));\n        tasks.add(new Task(\"DeployProd\", 5));\n        tasks.add(new Task(\"CodeReview\", 2));\n\n        System.out.println(\"Priority Queue Tasks: \" + tasks);\n    }\n}",
          "expectedOutput": "Priority Queue Tasks: [DeployProd(p=5), BugFix(p=2), CodeReview(p=2)]",
          "explanation": "TreeSet sorts custom non-Comparable objects cleanly using Comparator chains. Notice secondary sorting by name prevents duplicate priority elimination."
        }
      ],
      "realWorldApplications": [
        "Leaderboards, interval scheduling, stock market order books (finding best bid/ask).",
        "Range searches for calendar events, reservations, and timestamp intervals."
      ],
      "commonMistakes": [
        "Adding custom objects that do not implement `Comparable` to a TreeSet without providing a `Comparator`, causing `ClassCastException` at runtime.",
        "Implementing a Comparator that compares only one field (e.g. `t1.priority - t2.priority`); two tasks with the same priority will be considered duplicates and one will be silently dropped!",
        "Inserting objects that do not implement Comparable into a TreeSet without providing an explicit Comparator."
      ],
      "interviewRelevance": "Crucial for coding rounds: \"What is the underlying data structure of TreeSet?\" (Red-Black tree) and \"How does TreeSet determine duplicate elements?\" (compareTo == 0, NOT equals).",
      "checkpoints": [
        {
          "id": "java-43-cp-1",
          "label": "Understand Red-Black tree self-balancing properties guaranteeing O(log n) operations"
        },
        {
          "id": "java-43-cp-2",
          "label": "Master NavigableSet boundary methods: floor, ceiling, lower, higher, and subSet"
        },
        {
          "id": "java-43-treeset-cp-3",
          "label": "Use TreeSet and NavigableSet for logarithmic sorted operations and range queries."
        }
      ],
      "practiceExercises": [
        {
          "id": "java-43-ex-1",
          "title": "Find Closest Meeting Slot",
          "difficulty": "Beginner",
          "type": "coding",
          "prompt": "Given a TreeSet of available room times in minutes, find the closest available time to a requested time target.",
          "solution": "import java.util.TreeSet;\n\npublic class MeetingScheduler {\n    public static Integer findClosest(TreeSet<Integer> times, int target) {\n        Integer floor = times.floor(target);\n        Integer ceil = times.ceiling(target);\n        if (floor == null) return ceil;\n        if (ceil == null) return floor;\n        return (target - floor <= ceil - target) ? floor : ceil;\n    }\n    public static void main(String[] args) {\n        TreeSet<Integer> slots = new TreeSet<>(java.util.List.of(900, 930, 1015, 1100));\n        System.out.println(\"Closest to 940: \" + findClosest(slots, 940));\n    }\n}",
          "explanation": "Comparing floor and ceiling distances finds the closest element in O(log n) time."
        },
        {
          "id": "java-43-ex-2",
          "title": "Sliding Window Contains Duplicate Within K Distance",
          "difficulty": "Intermediate",
          "type": "coding",
          "prompt": "Given int[] nums and int k, return true if there are two distinct indices i and j such that nums[i] == nums[j] and abs(i - j) <= k using a sliding window Set.",
          "solution": "import java.util.*;\n\npublic class ContainsNearbyDuplicate {\n    public static boolean check(int[] nums, int k) {\n        Set<Integer> window = new HashSet<>();\n        for (int i = 0; i < nums.length; i++) {\n            if (window.contains(nums[i])) return true;\n            window.add(nums[i]);\n            if (window.size() > k) {\n                window.remove(nums[i - k]);\n            }\n        }\n        return false;\n    }\n    public static void main(String[] args) {\n        int[] arr = { 1, 2, 3, 1 };\n        System.out.println(\"Contains nearby duplicate: \" + check(arr, 3));\n    }\n}",
          "explanation": "A sliding window set of size k maintains elements in the active index range in O(n) total time."
        },
        {
          "id": "java-43-ex-3",
          "title": "TreeSet compareTo Inconsistency with equals",
          "difficulty": "Advanced",
          "type": "conceptual",
          "prompt": "Explain what happens if a class implements Comparable where compareTo() is inconsistent with equals() (e.g. BigDecimal(\"2.0\") vs BigDecimal(\"2.00\")).",
          "solution": "For `BigDecimal(\"2.0\")` and `BigDecimal(\"2.00\")`, `equals()` returns FALSE because scale differs (1 vs 2). However, `compareTo()` returns 0 because their numerical values are identical. If you put both into a `HashSet`, both are kept (size = 2). If you put both into a `TreeSet`, the second is rejected as a duplicate (size = 1)! This is why the JLS strongly advises that natural ordering be consistent with equals.",
          "explanation": "TreeSet relies solely on compareTo() == 0 to determine uniqueness, ignoring equals()."
        }
      ],
      "quizQuestions": [
        {
          "id": "java-43-q1",
          "question": "What is the time complexity of add(), remove(), and contains() in a TreeSet with N elements?",
          "options": [
            "O(1)",
            "O(log N)",
            "O(N)",
            "O(N log N)"
          ],
          "correctOptionIndex": 1,
          "explanation": "TreeSet is backed by a balanced Red-Black binary search tree, guaranteeing $O(\\log N)$ time for search, insertion, and deletion."
        },
        {
          "id": "java-43-q2",
          "question": "Which method returns the greatest element in a NavigableSet strictly less than the given element e?",
          "options": [
            "floor(e)",
            "lower(e)",
            "ceiling(e)",
            "higher(e)"
          ],
          "correctOptionIndex": 1,
          "explanation": "`lower(e)` returns the greatest element strictly less than e, while `floor(e)` returns the greatest element less than or equal to e."
        }
      ],
      "revisionNotes": [
        "TreeSet is backed by a Red-Black Tree and keeps elements continuously sorted in O(log n) time.",
        "Uniqueness is determined by compareTo() == 0, NOT equals().",
        "NavigableSet provides range queries: floor, ceiling, lower, higher, subSet."
      ]
    },
    {
      "id": "java-44-hashmap",
      "moduleId": "java-m4",
      "moduleNumber": 4,
      "moduleTitle": "Java Collections Framework",
      "topicNumber": 44,
      "title": "HashMap: Hashing, Collision Resolution & Treeification (Java 8+)",
      "language": "java",
      "level": "Beginner",
      "whyItMatters": "HashMap is the most asked data structure in Java interviews. Understanding bucket arrays, bitwise index masking, hash distribution, and Java 8 Red-Black treeification (TREEIFY_THRESHOLD = 8) is mandatory for software engineering placement.",
      "explanation": "A `HashMap` is a hash-table based implementation of the `Map` interface.\nInternal Architecture (Java 8+):\n1. Bucket Array: An array of `Node<K, V>` references, initialized to a default capacity of 16.\n2. Hash Function: Computes index via `(n - 1) & hash`, where `hash = key.hashCode() ^ (key.hashCode() >>> 16)`. The XOR shift spreads entropy to the lower bits.\n3. Collision Resolution:\n   - Multiple keys hashing to the same bucket index form a linked list (Separate Chaining).\n   - Java 8 Treeification: When a single bucket exceeds `TREEIFY_THRESHOLD = 8` AND the total table capacity is at least `MIN_TREEIFY_CAPACITY = 64`, the bucket is converted from a linked list into a Red-Black Tree (`TreeNode`). This transforms worst-case search time from $O(n)$ to $O(\\log n)$, neutralizing Hash DoS attacks!\n   - Untreeification: When a bucket shrinks to `UNTREEIFY_THRESHOLD = 6`, it converts back to a linked list.\n4. Load Factor & Resizing: Default load factor is `0.75`. When `size > capacity * loadFactor` (e.g. 16 * 0.75 = 12), the table doubles in capacity (32), and elements are rehashed.\n5. Performance: $O(1)$ average time for `get()` and `put()`.",
      "syntaxAndStructure": "// Standard HashMap usage:\nMap<String, Integer> map = new HashMap<>();\nmap.put(\"Alice\", 100); // O(1) average\nint score = map.getOrDefault(\"Bob\", 0);\n\n// Java 8 Modern Methods:\nmap.putIfAbsent(\"Charlie\", 95);\nmap.computeIfAbsent(\"David\", k -> k.length() * 10);\nmap.merge(\"Alice\", 10, Integer::sum); // Increments to 110",
      "codeExamples": [
        {
          "title": "Modern Java 8+ HashMap Functional Methods",
          "code": "import java.util.HashMap;\nimport java.util.Map;\n\npublic class ModernHashMapMethodsDemo {\n    public static void main(String[] args) {\n        Map<String, Integer> wordCounts = new HashMap<>();\n\n        // 1. computeIfAbsent: Computes value if key is not present\n        wordCounts.computeIfAbsent(\"Java\", k -> 1);\n        System.out.println(\"After computeIfAbsent: \" + wordCounts);\n\n        // 2. merge: Atomic upsert/increment\n        // If \"Java\" exists, apply (oldVal, newVal) -> oldVal + newVal\n        wordCounts.merge(\"Java\", 1, Integer::sum);\n        wordCounts.merge(\"Java\", 1, Integer::sum);\n        wordCounts.merge(\"Python\", 1, Integer::sum);\n\n        System.out.println(\"After merge increments: \" + wordCounts);\n\n        // 3. getOrDefault: Safe retrieval without null checks\n        int cppCount = wordCounts.getOrDefault(\"C++\", 0);\n        System.out.println(\"C++ count: \" + cppCount);\n    }\n}",
          "expectedOutput": "After computeIfAbsent: {Java=1}\nAfter merge increments: {Java=3, Python=1}\nC++ count: 0",
          "explanation": "Modern HashMap methods like merge and computeIfAbsent eliminate verbose containsKey checks and provide clean functional updates."
        },
        {
          "title": "Demonstrating Hash Collisions with Same Bucket Index",
          "code": "import java.util.HashMap;\nimport java.util.Map;\n\npublic class HashCollisionDemo {\n    static class CollidingKey {\n        int id;\n        CollidingKey(int id) { this.id = id; }\n        // Force all keys into the exact same hash code to demonstrate collision handling\n        @Override\n        public int hashCode() { return 42; }\n        @Override\n        public boolean equals(Object o) {\n            if (!(o instanceof CollidingKey other)) return false;\n            return this.id == other.id;\n        }\n        @Override\n        public String toString() { return \"Key(\" + id + \")\"; }\n    }\n\n    public static void main(String[] args) {\n        Map<CollidingKey, String> map = new HashMap<>();\n        CollidingKey k1 = new CollidingKey(1);\n        CollidingKey k2 = new CollidingKey(2);\n\n        map.put(k1, \"First\");\n        map.put(k2, \"Second\");\n\n        // Both keys collide in the same bucket, but equals() differentiates them\n        System.out.println(\"Key 1 Value: \" + map.get(k1));\n        System.out.println(\"Key 2 Value: \" + map.get(k2));\n        System.out.println(\"Map size: \" + map.size());\n    }\n}",
          "expectedOutput": "Key 1 Value: First\nKey 2 Value: Second\nMap size: 2",
          "explanation": "When two keys share the exact same hash, HashMap stores them in the same bucket linked list/tree, disambiguating them via equals()."
        }
      ],
      "realWorldApplications": [
        "In-memory caches, symbol lookup tables in compilers, and indexing database records by primary key.",
        "Group-by and aggregation logic in data processing pipelines."
      ],
      "commonMistakes": [
        "Mutating an object after using it as a HashMap key; modifying the key mutates its hashCode, making the entry permanently lost and unretrievable!",
        "Using a custom key class without overriding both `equals()` and `hashCode()`.",
        "Failing to override hashCode() when overriding equals(), causing hash map lookups to fail for identical logical keys."
      ],
      "interviewRelevance": "Number one Java interview question: \"Explain the internal working of HashMap in Java 8\", \"What is treeification?\", and \"Why must capacity always be a power of two?\"",
      "checkpoints": [
        {
          "id": "java-44-cp-1",
          "label": "Explain how (n - 1) & hash calculates bucket index and why capacity is a power of 2"
        },
        {
          "id": "java-44-cp-2",
          "label": "Detail Java 8 treeification: TREEIFY_THRESHOLD (8) and worst-case O(log n)"
        },
        {
          "id": "java-44-hashmap-cp-3",
          "label": "Explain bucket indexing, load factors, collision resolution, and Java 8 Red-Black treeification."
        }
      ],
      "practiceExercises": [
        {
          "id": "java-44-ex-1",
          "title": "Group Anagrams Using HashMap",
          "difficulty": "Beginner",
          "type": "coding",
          "prompt": "Group an array of strings into lists of anagrams using a HashMap.",
          "solution": "import java.util.*;\n\npublic class GroupAnagrams {\n    public static List<List<String>> group(String[] strs) {\n        Map<String, List<String>> map = new HashMap<>();\n        for (String s : strs) {\n            char[] chars = s.toCharArray();\n            Arrays.sort(chars);\n            String sortedKey = new String(chars);\n            map.computeIfAbsent(sortedKey, k -> new ArrayList<>()).add(s);\n        }\n        return new ArrayList<>(map.values());\n    }\n    public static void main(String[] args) {\n        String[] words = { \"eat\", \"tea\", \"tan\", \"ate\", \"nat\", \"bat\" };\n        System.out.println(group(words));\n    }\n}",
          "explanation": "Sorted strings act as canonical keys, grouping anagrams in O(N * K log K) time."
        },
        {
          "id": "java-44-ex-2",
          "title": "Why Capacity is Always a Power of Two",
          "difficulty": "Intermediate",
          "type": "conceptual",
          "prompt": "Why does HashMap require capacity to be a power of two, and how does (n - 1) & hash replace modulus % n?",
          "solution": "Modulo `hash % n` is computationally expensive on CPUs. When n is a power of two (e.g. 16 = 00010000), `n - 1` is a continuous bitmask of 1s (15 = 00001111). Computing `(n - 1) & hash` performs bitwise AND in a single CPU cycle, producing the exact same result as modulus while running orders of magnitude faster.",
          "explanation": "Bitwise AND with (2^k - 1) is mathematically equivalent to modulus 2^k and executes in 1 clock cycle."
        },
        {
          "id": "java-44-ex-3",
          "title": "Mutable Key Memory Leak Trap",
          "difficulty": "Advanced",
          "type": "coding",
          "prompt": "Write a program demonstrating how mutating a key object makes it impossible to retrieve its value from a HashMap.",
          "solution": "import java.util.*;\n\nclass MutableKey {\n    int id;\n    MutableKey(int i) { this.id = i; }\n    public int hashCode() { return id; }\n    public boolean equals(Object o) {\n        return (o instanceof MutableKey other) && this.id == other.id;\n    }\n}\npublic class KeyMutationTrap {\n    public static void main(String[] args) {\n        Map<MutableKey, String> map = new HashMap<>();\n        MutableKey key = new MutableKey(10);\n        map.put(key, \"Original Value\");\n\n        // Mutating key field changes its hashCode!\n        key.id = 99;\n\n        // get() now looks in bucket 99 instead of bucket 10: returns null!\n        System.out.println(\"Lookup after mutation: \" + map.get(key)); // null\n        System.out.println(\"Map size still contains entry: \" + map.size()); // 1 (leaked!)\n    }\n}",
          "explanation": "Mutating keys alters their hash, stranding entries in old buckets and causing memory leaks. Keys should always be immutable."
        }
      ],
      "quizQuestions": [
        {
          "id": "java-44-q1",
          "question": "In Java 8, what occurs when a single HashMap bucket exceeds 8 entries and total map capacity is >= 64?",
          "options": [
            "The map throws an OutOfMemoryError",
            "The bucket converts from a linked list to a balanced Red-Black Tree (TreeNode)",
            "The oldest entry is evicted",
            "The load factor automatically resets to 1.0"
          ],
          "correctOptionIndex": 1,
          "explanation": "Java 8 treeifies bucket chains exceeding TREEIFY_THRESHOLD (8) into Red-Black trees to preserve O(log n) worst-case performance."
        },
        {
          "id": "java-44-q2",
          "question": "What is the default initial capacity and default load factor of a standard Java HashMap?",
          "options": [
            "16 and 0.75",
            "10 and 0.50",
            "32 and 0.80",
            "8 and 1.0"
          ],
          "correctOptionIndex": 0,
          "explanation": "A standard HashMap initializes with a default capacity of 16 and a load factor of 0.75 (resizing at 12 elements)."
        }
      ],
      "revisionNotes": [
        "HashMap uses bucket arrays, bitwise indexing `(n - 1) & hash`, and separate chaining.",
        "Java 8 converts linked lists with > 8 entries into Red-Black trees (O(log n) search).",
        "Always use immutable classes (like String or Integer) as HashMap keys."
      ]
    },
    {
      "id": "java-45-linkedhashmap",
      "moduleId": "java-m4",
      "moduleNumber": 4,
      "moduleTitle": "Java Collections Framework",
      "topicNumber": 45,
      "title": "LinkedHashMap: Insertion-Order, Access-Order & LRU Cache",
      "language": "java",
      "level": "Beginner",
      "whyItMatters": "LinkedHashMap combines the O(1) performance of HashMap with predictable iteration order. Setting `accessOrder = true` and overriding `removeEldestEntry()` allows implementing an in-memory LRU (Least Recently Used) cache in under 10 lines of code.",
      "explanation": "A `LinkedHashMap` extends `HashMap` and adds a doubly-linked list running through all its entries.\nTwo Ordering Modes:\n1. Insertion-Order (Default): Iterating over the map yields keys in the order they were inserted. Re-inserting an existing key does NOT alter its position.\n2. Access-Order (`accessOrder = true` in constructor):\n   - When an entry is accessed via `get()` or updated via `put()`, it is moved to the TAIL (end) of the doubly-linked list.\n   - The head of the list represents the Least Recently Used (LRU) entry, and the tail represents the Most Recently Used (MRU) entry.\n3. Building an LRU Cache:\n   - Overriding `protected boolean removeEldestEntry(Map.Entry eldest)` allows automatically evicting the oldest entry when size exceeds a fixed threshold.",
      "syntaxAndStructure": "// Constructor with accessOrder:\n// LinkedHashMap(initialCapacity, loadFactor, accessOrder)\nLinkedHashMap<K, V> lru = new LinkedHashMap<>(16, 0.75f, true) {\n    @Override\n    protected boolean removeEldestEntry(Map.Entry<K, V> eldest) {\n        return size() > MAX_ENTRIES; // Evict oldest\n    }\n};",
      "codeExamples": [
        {
          "title": "Building a Complete LRU Cache with LinkedHashMap",
          "code": "import java.util.LinkedHashMap;\nimport java.util.Map;\n\n// Elegant LRU Cache in 15 lines of code\nclass LRUCache<K, V> extends LinkedHashMap<K, V> {\n    private final int capacity;\n\n    public LRUCache(int capacity) {\n        // accessOrder = true enables LRU access tracking\n        super(capacity, 0.75f, true);\n        this.capacity = capacity;\n    }\n\n    @Override\n    protected boolean removeEldestEntry(Map.Entry<K, V> eldest) {\n        // Automatically evicts the least recently used entry when capacity is exceeded\n        return size() > capacity;\n    }\n}\n\npublic class LRUCacheDemo {\n    public static void main(String[] args) {\n        LRUCache<Integer, String> cache = new LRUCache<>(3);\n        cache.put(1, \"A\");\n        cache.put(2, \"B\");\n        cache.put(3, \"C\");\n        System.out.println(\"Initial Cache: \" + cache);\n\n        // Access key 1 (moves key 1 to the most recently used tail)\n        cache.get(1);\n\n        // Insert key 4 (evicts key 2, which is now the least recently used!)\n        cache.put(4, \"D\");\n\n        System.out.println(\"Cache after accessing 1 and adding 4: \" + cache);\n    }\n}",
          "expectedOutput": "Initial Cache: {1=A, 2=B, 3=C}\nCache after accessing 1 and adding 4: {3=C, 1=A, 4=D}",
          "explanation": "Accessing key 1 moved it to the MRU tail. When key 4 was inserted, key 2 (at the head) was evicted automatically."
        },
        {
          "title": "Insertion Order Preservation Comparison",
          "code": "import java.util.LinkedHashMap;\nimport java.util.Map;\n\npublic class InsertionOrderDemo {\n    public static void main(String[] args) {\n        Map<String, String> config = new LinkedHashMap<>();\n        config.put(\"Host\", \"localhost\");\n        config.put(\"Port\", \"8080\");\n        config.put(\"Environment\", \"Production\");\n\n        for (Map.Entry<String, String> e : config.entrySet()) {\n            System.out.println(e.getKey() + \": \" + e.getValue());\n        }\n    }\n}",
          "expectedOutput": "Host: localhost\nPort: 8080\nEnvironment: Production",
          "explanation": "LinkedHashMap guarantees that map entries iterate in the exact order they were inserted."
        }
      ],
      "realWorldApplications": [
        "In-memory page caches, session caches, and DNS lookup caches with fixed capacity bounds.",
        "Serializing JSON objects where key order must match input specifications."
      ],
      "commonMistakes": [
        "Forgetting that `LinkedHashMap` is not thread-safe; wrap with `Collections.synchronizedMap()` when shared across threads.",
        "Assuming `LinkedHashMap.get()` does not modify structure when `accessOrder = true`; calling `get()` modifies the internal doubly-linked list, causing `ConcurrentModificationException` during iteration!",
        "Expecting LinkedHashMap to maintain access-order when instantiated with the default constructor (which uses insertion-order)."
      ],
      "interviewRelevance": "Top-tier interview question: \"Implement an LRU Cache in Java\" (Answer: using LinkedHashMap with removeEldestEntry or using a custom Doubly-Linked List + HashMap).",
      "checkpoints": [
        {
          "id": "java-45-cp-1",
          "label": "Distinguish insertion-order from access-order in LinkedHashMap"
        },
        {
          "id": "java-45-cp-2",
          "label": "Implement an LRU cache by overriding removeEldestEntry()"
        },
        {
          "id": "java-45-linkedhashmap-cp-3",
          "label": "Build fixed-size LRU caches by setting accessOrder=true and overriding removeEldestEntry."
        }
      ],
      "practiceExercises": [
        {
          "id": "java-45-ex-1",
          "title": "LRU Cache Access Reordering Verification",
          "difficulty": "Beginner",
          "type": "coding",
          "prompt": "Create a LinkedHashMap with accessOrder=true and verify that get() moves an accessed key to the end of the entry set.",
          "solution": "import java.util.*;\n\npublic class AccessOrderVerify {\n    public static void main(String[] args) {\n        LinkedHashMap<String, Integer> map = new LinkedHashMap<>(16, 0.75f, true);\n        map.put(\"X\", 1);\n        map.put(\"Y\", 2);\n        map.put(\"Z\", 3);\n        map.get(\"X\"); // Access X\n        System.out.println(\"Keys after access: \" + new ArrayList<>(map.keySet()));\n    }\n}",
          "explanation": "Accessing \"X\" moves it from head to the end: keys iterate as [\"Y\", \"Z\", \"X\"]."
        },
        {
          "id": "java-45-ex-2",
          "title": "Thread-Safe LRU Cache Wrapper",
          "difficulty": "Intermediate",
          "type": "coding",
          "prompt": "Make the LRU Cache thread-safe for concurrent read and write access.",
          "solution": "import java.util.*;\n\npublic class ConcurrentLRU<K, V> {\n    private final Map<K, V> syncCache;\n\n    public ConcurrentLRU(int capacity) {\n        Map<K, V> base = new LinkedHashMap<>(capacity, 0.75f, true) {\n            @Override\n            protected boolean removeEldestEntry(Map.Entry<K, V> eldest) {\n                return size() > capacity;\n            }\n        };\n        this.syncCache = Collections.synchronizedMap(base);\n    }\n    public void put(K k, V v) { syncCache.put(k, v); }\n    public V get(K k) { return syncCache.get(k); }\n}",
          "explanation": "Wrapping LinkedHashMap with Collections.synchronizedMap synchronizes all access methods."
        },
        {
          "id": "java-45-ex-3",
          "title": "Custom Doubly-Linked List LRU Without LinkedHashMap",
          "difficulty": "Advanced",
          "type": "coding",
          "prompt": "Implement an LRU Cache using a raw HashMap<Integer, Node> and custom Doubly-Linked List in O(1) get and put.",
          "solution": "import java.util.HashMap;\nimport java.util.Map;\n\npublic class ManualLRUCache {\n    class DNode {\n        int key, val;\n        DNode prev, next;\n        DNode(int k, int v) { this.key = k; this.val = v; }\n    }\n\n    private final int cap;\n    private final Map<Integer, DNode> map = new HashMap<>();\n    private final DNode head = new DNode(0, 0), tail = new DNode(0, 0);\n\n    public ManualLRUCache(int capacity) {\n        this.cap = capacity;\n        head.next = tail;\n        tail.prev = head;\n    }\n\n    private void remove(DNode node) {\n        node.prev.next = node.next;\n        node.next.prev = node.prev;\n    }\n\n    private void insertAtHead(DNode node) {\n        node.next = head.next;\n        node.next.prev = node;\n        head.next = node;\n        node.prev = head;\n    }\n\n    public int get(int key) {\n        if (!map.containsKey(key)) return -1;\n        DNode node = map.get(key);\n        remove(node);\n        insertAtHead(node);\n        return node.val;\n    }\n\n    public void put(int key, int value) {\n        if (map.containsKey(key)) {\n            remove(map.get(key));\n        }\n        if (map.size() >= cap) {\n            DNode lru = tail.prev;\n            remove(lru);\n            map.remove(lru.key);\n        }\n        DNode node = new DNode(key, value);\n        insertAtHead(node);\n        map.put(key, node);\n    }\n}",
          "explanation": "Standard LeetCode 146 implementation combining HashMap for O(1) lookup and Doubly-Linked List for O(1) node movement."
        }
      ],
      "quizQuestions": [
        {
          "id": "java-45-q1",
          "question": "Which method should be overridden in a LinkedHashMap subclass to automatically evict old entries when capacity is exceeded?",
          "options": [
            "evictOldest()",
            "removeEldestEntry(Map.Entry eldest)",
            "cleanUp()",
            "pollLast()"
          ],
          "correctOptionIndex": 1,
          "explanation": "Overriding `protected boolean removeEldestEntry(Map.Entry eldest)` and returning `true` triggers automatic eviction of the least recently used entry."
        },
        {
          "id": "java-45-q2",
          "question": "What happens when accessOrder is set to true in LinkedHashMap and an entry is read with `map.get(key)`?",
          "options": [
            "The entry is deleted from the map",
            "The accessed entry is relocated to the tail of the iteration order",
            "The entry value is incremented",
            "Nothing, get() does not affect iteration order"
          ],
          "correctOptionIndex": 1,
          "explanation": "When accessOrder is true, get() moves the accessed entry to the tail (most recently used position) of the linked list."
        }
      ],
      "revisionNotes": [
        "LinkedHashMap maintains a doubly-linked list running through all entries.",
        "Supports insertion-order (default) and access-order (for LRU caches).",
        "Override `removeEldestEntry()` to build an LRU cache easily."
      ]
    },
    {
      "id": "java-46-treemap",
      "moduleId": "java-m4",
      "moduleNumber": 4,
      "moduleTitle": "Java Collections Framework",
      "topicNumber": 46,
      "title": "TreeMap: Red-Black Tree Map, NavigableMap & Range Submaps",
      "language": "java",
      "level": "Beginner",
      "whyItMatters": "TreeMap is the sorted map implementation in Java. It provides O(log n) guaranteed search and range queries (subMap, headMap, tailMap), forming the backbone of database B-Tree simulations and order matching engines.",
      "explanation": "A `TreeMap` is a `NavigableMap` implementation based on a self-balancing Red-Black Tree.\nKey Characteristics:\n1. Sorted Keys: Keys are sorted according to their natural ordering (`Comparable`), or by a custom `Comparator`.\n2. Guaranteed $O(\\log n)$ Time: `containsKey`, `get`, `put`, and `remove` execute in $O(\\log n)$ time.\n3. Prohibits null Keys: In modern Java, `put(null, val)` throws `NullPointerException` because keys must be compared.\n4. `NavigableMap` Range Operations:\n   - `firstEntry()` / `lastEntry()`: Accesses minimum/maximum key-value pair.\n   - `floorEntry(k)` / `ceilingEntry(k)`: Closest bounding entries.\n   - `headMap(toKey, inclusive)`: View of all entries with keys < toKey.\n   - `tailMap(fromKey, inclusive)`: View of all entries with keys >= fromKey.\n   - `subMap(fromKey, fromInc, toKey, toInc)`: Range view between two keys.",
      "syntaxAndStructure": "// Default natural sorted map:\nNavigableMap<Integer, String> treeMap = new TreeMap<>();\ntreeMap.put(100, \"Bronze\");\ntreeMap.put(500, \"Gold\");\n\n// Range query:\nMap.Entry<Integer, String> ceiling = treeMap.ceilingEntry(300); // 500=Gold\nNavigableMap<Integer, String> sub = treeMap.subMap(100, true, 400, true);",
      "codeExamples": [
        {
          "title": "NavigableMap Key Boundaries and Range Views",
          "code": "import java.util.Map;\nimport java.util.NavigableMap;\nimport java.util.TreeMap;\n\npublic class TreeMapNavigableDemo {\n    public static void main(String[] args) {\n        NavigableMap<Integer, String> ranks = new TreeMap<>();\n        ranks.put(10, \"Junior Developer\");\n        ranks.put(25, \"Software Engineer\");\n        ranks.put(50, \"Senior Engineer\");\n        ranks.put(80, \"Principal Architect\");\n\n        System.out.println(\"Sorted Ranks: \" + ranks);\n        System.out.println(\"First Entry: \" + ranks.firstEntry());\n        System.out.println(\"Last Entry: \" + ranks.lastEntry());\n\n        // Nearest boundary lookups\n        System.out.println(\"Floor entry for 30 (<= 30): \" + ranks.floorEntry(30));\n        System.out.println(\"Ceiling entry for 30 (>= 30): \" + ranks.ceilingEntry(30));\n\n        // SubMap range view [25, 80)\n        System.out.println(\"SubMap [25, 80): \" + ranks.subMap(25, true, 80, false));\n    }\n}",
          "expectedOutput": "Sorted Ranks: {10=Junior Developer, 25=Software Engineer, 50=Senior Engineer, 80=Principal Architect}\nFirst Entry: 10=Junior Developer\nLast Entry: 80=Principal Architect\nFloor entry for 30 (<= 30): 25=Software Engineer\nCeiling entry for 30 (>= 30): 50=Senior Engineer\nSubMap [25, 80): {25=Software Engineer, 50=Senior Engineer}",
          "explanation": "TreeMap provides logarithmic boundary lookups (floorEntry, ceilingEntry) and dynamic subMap views without scanning the whole dataset."
        },
        {
          "title": "Custom Comparator in TreeMap for Case-Insensitive Sorting",
          "code": "import java.util.Map;\nimport java.util.TreeMap;\n\npublic class CaseInsensitiveTreeMapDemo {\n    public static void main(String[] args) {\n        // String.CASE_INSENSITIVE_ORDER comparator\n        Map<String, String> map = new TreeMap<>(String.CASE_INSENSITIVE_ORDER);\n        map.put(\"java\", \"Language\");\n        map.put(\"PYTHON\", \"Scripting\");\n        map.put(\"c++\", \"Systems\");\n\n        System.out.println(\"Sorted Case-Insensitive: \" + map);\n        System.out.println(\"Lookup 'JAVA': \" + map.get(\"JAVA\")); // Finds \"java\"\n    }\n}",
          "expectedOutput": "Sorted Case-Insensitive: {c++=Systems, java=Language, PYTHON=Scripting}\nLookup 'JAVA': Language",
          "explanation": "Custom comparators govern both key sorting and key equality lookups in TreeMap."
        }
      ],
      "realWorldApplications": [
        "Financial order matching engines matching buy and sell orders at closest price thresholds.",
        "Time-series metrics and logging indexes where queries inspect time windows (`subMap(t1, t2)`)."
      ],
      "commonMistakes": [
        "Using keys that do not implement `Comparable` without passing a custom `Comparator`, triggering a runtime `ClassCastException`.",
        "Attempting to insert `null` keys into a TreeMap; throws `NullPointerException`.",
        "Assuming TreeMap supports null keys when using natural ordering, which throws NullPointerException."
      ],
      "interviewRelevance": "Frequent interview topic: \"HashMap vs TreeMap: trade-offs in time complexity and ordering\", \"How does TreeMap handle range queries?\", and \"What is the underlying data structure?\"",
      "checkpoints": [
        {
          "id": "java-46-cp-1",
          "label": "Understand Red-Black tree properties guaranteeing O(log n) key lookups in TreeMap"
        },
        {
          "id": "java-46-cp-2",
          "label": "Use NavigableMap range methods (subMap, headMap, tailMap, ceilingEntry)"
        },
        {
          "id": "java-46-treemap-cp-3",
          "label": "Perform range extractions and prefix searches using subMap, headMap, and tailMap."
        }
      ],
      "practiceExercises": [
        {
          "id": "java-46-ex-1",
          "title": "Find Next Timestamp Event",
          "difficulty": "Beginner",
          "type": "coding",
          "prompt": "Given a TreeMap of timestamp -> event, find the earliest event occurring after a target timestamp.",
          "solution": "import java.util.TreeMap;\n\npublic class NextEventFinder {\n    public static String getNextEvent(TreeMap<Long, String> events, long time) {\n        var entry = events.higherEntry(time);\n        return entry != null ? entry.getValue() : \"None\";\n    }\n    public static void main(String[] args) {\n        TreeMap<Long, String> log = new TreeMap<>();\n        log.put(1000L, \"Boot\");\n        log.put(2000L, \"Auth\");\n        log.put(3000L, \"Ready\");\n        System.out.println(\"Next after 1500: \" + getNextEvent(log, 1500L));\n    }\n}",
          "explanation": "higherEntry(time) finds the smallest key strictly greater than time in O(log n)."
        },
        {
          "id": "java-46-ex-2",
          "title": "Prefix Range Search in Dictionary",
          "difficulty": "Intermediate",
          "type": "coding",
          "prompt": "Use a TreeMap to find all words starting with prefix \"pre\" using subMap.",
          "solution": "import java.util.*;\n\npublic class PrefixSearch {\n    public static NavigableMap<String, String> getPrefixWords(TreeMap<String, String> dict, String prefix) {\n        String start = prefix;\n        String end = prefix + Character.MAX_VALUE;\n        return dict.subMap(start, true, end, true);\n    }\n    public static void main(String[] args) {\n        TreeMap<String, String> dict = new TreeMap<>();\n        dict.put(\"post\", \"after\");\n        dict.put(\"prefix\", \"before\");\n        dict.put(\"prepare\", \"make ready\");\n        dict.put(\"preheat\", \"heat before\");\n        dict.put(\"query\", \"search\");\n        System.out.println(\"Words with 'pre': \" + getPrefixWords(dict, \"pre\").keySet());\n    }\n}",
          "explanation": "subMap(prefix, prefix + Character.MAX_VALUE) creates a range view capturing all strings starting with that prefix."
        },
        {
          "id": "java-46-ex-3",
          "title": "My Calendar I Interval Booking (LeetCode 729)",
          "difficulty": "Advanced",
          "type": "coding",
          "prompt": "Implement a calendar booking system that returns false if a new event [start, end) conflicts with existing bookings using TreeMap in O(log n).",
          "solution": "import java.util.TreeMap;\n\npublic class MyCalendar {\n    private final TreeMap<Integer, Integer> bookings = new TreeMap<>();\n\n    public boolean book(int start, int end) {\n        Integer prev = bookings.floorKey(start);\n        if (prev != null && bookings.get(prev) > start) return false; // Overlaps with previous\n\n        Integer next = bookings.ceilingKey(start);\n        if (next != null && next < end) return false; // Overlaps with next\n\n        bookings.put(start, end);\n        return true;\n    }\n    public static void main(String[] args) {\n        MyCalendar cal = new MyCalendar();\n        System.out.println(\"Book 10-20: \" + cal.book(10, 20)); // true\n        System.out.println(\"Book 15-25: \" + cal.book(15, 25)); // false\n        System.out.println(\"Book 20-30: \" + cal.book(20, 30)); // true\n    }\n}",
          "explanation": "Using floorKey and ceilingKey checks adjacent intervals in O(log n) time without scanning all bookings."
        }
      ],
      "quizQuestions": [
        {
          "id": "java-46-q1",
          "question": "Can a java.util.TreeMap store a `null` key in modern Java?",
          "options": [
            "Yes, up to one null key is allowed like in HashMap",
            "No, attempting to insert a null key throws a NullPointerException because keys must be compared",
            "Only if the comparator handles null",
            "Only if the map is empty"
          ],
          "correctOptionIndex": 1,
          "explanation": "TreeMap requires keys to be compared. Attempting to compare null throws a NullPointerException."
        },
        {
          "id": "java-46-q2",
          "question": "What interface is extended by TreeMap that provides range methods like subMap, floorEntry, and ceilingEntry?",
          "options": [
            "java.util.SortedMap",
            "java.util.NavigableMap",
            "java.util.ConcurrentMap",
            "java.util.IndexedMap"
          ],
          "correctOptionIndex": 1,
          "explanation": "TreeMap implements `java.util.NavigableMap`, which extends `SortedMap` with bidirectional navigation and boundary queries."
        }
      ],
      "revisionNotes": [
        "TreeMap stores keys in a self-balancing Red-Black Tree in sorted order (O(log n) operations).",
        "Does not permit `null` keys.",
        "NavigableMap interface provides range queries: subMap, floorEntry, ceilingEntry."
      ]
    },
    {
      "id": "java-47-queue-deque",
      "moduleId": "java-m4",
      "moduleNumber": 4,
      "moduleTitle": "Java Collections Framework",
      "topicNumber": 47,
      "title": "Queue & Deque: FIFO Processing, Double-Ended Queues & Implementations",
      "language": "java",
      "level": "Beginner",
      "whyItMatters": "Queue and Deque interfaces power Breadth-First Search (BFS), task scheduling, sliding window algorithms, and worker thread job distribution. Understanding exception-throwing vs special-value returning methods is an essential coding interview topic.",
      "explanation": "1. `Queue<E>`: Models a First-In-First-Out (FIFO) collection.\n   Methods come in two flavors:\n   - Throws Exception on failure: `add(e)` (throws IllegalStateException if full), `remove()` (throws NoSuchElementException if empty), `element()` (throws exception).\n   - Returns Special Value (null or false): `offer(e)` (returns false if full), `poll()` (returns null if empty), `peek()` (returns null if empty).\n   Best Practice: In modern programming, always prefer `offer()`, `poll()`, and `peek()`!\n2. `Deque<E>` (Double-Ended Queue, pronounced \"Deck\"):\n   - Supports insertion, removal, and retrieval at BOTH ends.\n   - Dual-personality: can act as a FIFO Queue or a LIFO Stack.\n   - Methods: `offerFirst()`, `offerLast()`, `pollFirst()`, `pollLast()`, `peekFirst()`, `peekLast()`.\n   - Standard concrete implementations: `ArrayDeque` (resizable circular array buffer, best choice) and `LinkedList`.",
      "syntaxAndStructure": "// Standard FIFO Queue:\nQueue<String> queue = new ArrayDeque<>();\nqueue.offer(\"task1\");\nString next = queue.poll(); // Returns null if empty\n\n// Double-Ended Queue (Deque):\nDeque<Integer> deque = new ArrayDeque<>();\ndeque.offerFirst(10);\ndeque.offerLast(20);\nint head = deque.pollFirst();\nint tail = deque.pollLast();",
      "codeExamples": [
        {
          "title": "Queue Method Matrix: Exception vs Safe Return",
          "code": "import java.util.ArrayDeque;\nimport java.util.Queue;\n\npublic class QueueMethodMatrixDemo {\n    public static void main(String[] args) {\n        Queue<String> tasks = new ArrayDeque<>();\n\n        // 1. Safe insertion with offer()\n        tasks.offer(\"Compile\");\n        tasks.offer(\"Test\");\n        tasks.offer(\"Package\");\n\n        // 2. Safe inspection with peek()\n        System.out.println(\"Head of queue without removing: \" + tasks.peek());\n\n        // 3. Safe retrieval with poll()\n        while (!tasks.isEmpty()) {\n            System.out.println(\"Processing: \" + tasks.poll());\n        }\n\n        // Safe poll on empty queue returns null without throwing exception!\n        System.out.println(\"Poll on empty queue: \" + tasks.poll());\n    }\n}",
          "expectedOutput": "Head of queue without removing: Compile\nProcessing: Compile\nProcessing: Test\nProcessing: Package\nPoll on empty queue: null",
          "explanation": "offer(), poll(), and peek() return false/null instead of crashing with NoSuchElementException when handling boundary conditions."
        },
        {
          "title": "Breadth-First Search (BFS) Traversal Using Queue",
          "code": "import java.util.ArrayDeque;\nimport java.util.List;\nimport java.util.Queue;\n\npublic class QueueBFSTraversalDemo {\n    public static void main(String[] args) {\n        // Simulating level-order traversal of nodes\n        Queue<String> levelQueue = new ArrayDeque<>();\n        levelQueue.offer(\"Root\");\n\n        int level = 0;\n        while (!levelQueue.isEmpty()) {\n            int levelSize = levelQueue.size();\n            System.out.print(\"Level \" + level + \": \");\n\n            for (int i = 0; i < levelSize; i++) {\n                String node = levelQueue.poll();\n                System.out.print(node + \" \");\n\n                // Enqueue children\n                if (node.equals(\"Root\")) {\n                    levelQueue.offer(\"Child_A\");\n                    levelQueue.offer(\"Child_B\");\n                }\n            }\n            System.out.println();\n            level++;\n        }\n    }\n}",
          "expectedOutput": "Level 0: Root \nLevel 1: Child_A Child_B ",
          "explanation": "Queue is the canonical data structure for level-by-level BFS traversal, guaranteeing FIFO visitation order."
        }
      ],
      "realWorldApplications": [
        "Task scheduling and asynchronous background job queues (ActiveMQ, RabbitMQ, Celery consumers).",
        "Breadth-First Search (BFS) shortest path algorithms in unweighted graphs and grids."
      ],
      "commonMistakes": [
        "Using `remove()` or `element()` without checking `isEmpty()`, causing `NoSuchElementException` crashes.",
        "Using `LinkedList` instead of `ArrayDeque` for standard queues; ArrayDeque has lower memory overhead and much faster cache locality.",
        "Calling element() or remove() on an empty Queue instead of peek() or poll(), triggering NoSuchElementException."
      ],
      "interviewRelevance": "Universal interview question: \"Difference between add/remove and offer/poll in Queue?\", \"How do you implement BFS?\", and \"Why is ArrayDeque preferred over LinkedList for queues?\"",
      "checkpoints": [
        {
          "id": "java-47-cp-1",
          "label": "Memorize the two method sets in Queue: (add/remove/element) vs (offer/poll/peek)"
        },
        {
          "id": "java-47-cp-2",
          "label": "Use ArrayDeque as the high-performance standard implementation for Queue and Deque"
        },
        {
          "id": "java-47-queue-deque-cp-3",
          "label": "Use Deque (ArrayDeque) as the standard FIFO queue and LIFO stack in Java."
        }
      ],
      "practiceExercises": [
        {
          "id": "java-47-ex-1",
          "title": "Generate Binary Numbers from 1 to N Using Queue",
          "difficulty": "Beginner",
          "type": "coding",
          "prompt": "Generate binary representations of numbers from 1 to N using a Queue (e.g. 1 -> \"1\", 2 -> \"10\", 3 -> \"11\").",
          "solution": "import java.util.*;\n\npublic class GenerateBinaryQueue {\n    public static List<String> generate(int n) {\n        List<String> res = new ArrayList<>();\n        Queue<String> q = new ArrayDeque<>();\n        q.offer(\"1\");\n        for (int i = 0; i < n; i++) {\n            String curr = q.poll();\n            res.add(curr);\n            q.offer(curr + \"0\");\n            q.offer(curr + \"1\");\n        }\n        return res;\n    }\n    public static void main(String[] args) {\n        System.out.println(generate(5)); // [\"1\", \"10\", \"11\", \"100\", \"101\"]\n    }\n}",
          "explanation": "Enqueuing curr + \"0\" and curr + \"1\" produces continuous binary counts in linear time."
        },
        {
          "id": "java-47-ex-2",
          "title": "Sliding Window Maximum Using Monotonic Deque",
          "difficulty": "Intermediate",
          "type": "coding",
          "prompt": "Find the maximum value in each sliding window of size k using a Deque in O(n) total time.",
          "solution": "import java.util.*;\n\npublic class SlidingWindowMaxDeque {\n    public static int[] maxSlidingWindow(int[] nums, int k) {\n        if (nums.length == 0) return new int[0];\n        int n = nums.length;\n        int[] res = new int[n - k + 1];\n        Deque<Integer> deque = new ArrayDeque<>(); // Stores indices\n\n        for (int i = 0; i < n; i++) {\n            // Remove out of window indices from front\n            while (!deque.isEmpty() && deque.peekFirst() < i - k + 1) {\n                deque.pollFirst();\n            }\n            // Maintain monotonically decreasing order from back\n            while (!deque.isEmpty() && nums[deque.peekLast()] < nums[i]) {\n                deque.pollLast();\n            }\n            deque.offerLast(i);\n            if (i >= k - 1) {\n                res[i - k + 1] = nums[deque.peekFirst()];\n            }\n        }\n        return res;\n    }\n    public static void main(String[] args) {\n        int[] arr = { 1, 3, -1, -3, 5, 3, 6, 7 };\n        System.out.println(Arrays.toString(maxSlidingWindow(arr, 3)));\n    }\n}",
          "explanation": "A monotonic double-ended queue maintains max elements at the head, achieving O(N) total amortized time."
        },
        {
          "id": "java-47-ex-3",
          "title": "ArrayDeque Circular Buffer Bitwise Masking",
          "difficulty": "Advanced",
          "type": "conceptual",
          "prompt": "How does ArrayDeque implement its circular head and tail pointer movement without using modulo % length?",
          "solution": "Like HashMap, `ArrayDeque` enforces that its internal array capacity is always a power of two (default 16). The head and tail pointers wrap around using bitwise masking: `head = (head - 1) & (elements.length - 1)` for decrementing, and `tail = (tail + 1) & (elements.length - 1)` for incrementing. This wraps negative values and indices back to the array bounds in a single clock cycle without division.",
          "explanation": "Power-of-two circular buffer masking eliminates costly modulus operations in high-throughput queues."
        }
      ],
      "quizQuestions": [
        {
          "id": "java-47-q1",
          "question": "What does `queue.poll()` return when invoked on an empty Queue?",
          "options": [
            "Throws NoSuchElementException",
            "Returns null without throwing an exception",
            "Throws IllegalStateException",
            "Blocks the current thread indefinitely"
          ],
          "correctOptionIndex": 1,
          "explanation": "`poll()` safely returns null when the queue is empty, whereas `remove()` throws NoSuchElementException."
        },
        {
          "id": "java-47-q2",
          "question": "Which concrete class is the recommended, fastest implementation of both Queue and Deque for single-threaded usage?",
          "options": [
            "java.util.LinkedList",
            "java.util.ArrayDeque",
            "java.util.Vector",
            "java.util.Stack"
          ],
          "correctOptionIndex": 1,
          "explanation": "`ArrayDeque` is backed by a circular resizable array and is significantly faster and more cache-efficient than `LinkedList`."
        }
      ],
      "revisionNotes": [
        "Queue: FIFO collection; prefer `offer()`, `poll()`, and `peek()` for null-safe operations.",
        "Deque: Double-ended queue supporting insertion/removal at both ends.",
        "ArrayDeque is faster and consumes less memory than LinkedList for both queues and stacks."
      ]
    },
    {
      "id": "java-48-priorityqueue",
      "moduleId": "java-m4",
      "moduleNumber": 4,
      "moduleTitle": "Java Collections Framework",
      "topicNumber": 48,
      "title": "PriorityQueue: Min-Heap, Max-Heap & Binary Heap Mechanics",
      "language": "java",
      "level": "Beginner",
      "whyItMatters": "PriorityQueue is the standard binary heap implementation in Java. It is essential for Dijkstra's shortest path algorithm, Prim's MST, Huffman coding, and solving \"Top-K Elements\" placement interview questions.",
      "explanation": "A `PriorityQueue` is an unbounded priority queue based on a Binary Heap.\nKey Characteristics:\n1. Min-Heap by Default: Elements are ordered naturally (`Comparable`) where the MINIMUM element sits at the head (`peek()` returns minimum element in $O(1)$).\n2. Max-Heap Creation: To create a Max-Heap, pass a reverse comparator:\n   `PriorityQueue<Integer> maxHeap = new PriorityQueue<>(Comparator.reverseOrder());`\n3. Time Complexity:\n   - `offer(e)` (insertion / sift-up): $O(\\log n)$ time.\n   - `poll()` (extract-min / sift-down): $O(\\log n)$ time.\n   - `peek()` (inspect minimum): $O(1)$ constant time.\n   - `remove(o)` (arbitrary element removal): $O(n)$ linear scan + $O(\\log n)$ sift.\n4. Array Representation of Binary Heap:\n   Stored in contiguous array `Object[] queue`:\n   - Parent index of $i$: `(i - 1) >>> 1`\n   - Left child index: `(2 * i) + 1`\n   - Right child index: `(2 * i) + 2`\n5. Iteration Order: Iterating over a PriorityQueue (`for (int x : pq)`) DOES NOT guarantee sorted order! It only guarantees the root is minimum. To process in sorted order, you must repeatedly call `poll()`.",
      "syntaxAndStructure": "// Default Min-Heap:\nPriorityQueue<Integer> minHeap = new PriorityQueue<>();\nminHeap.offer(40);\nminHeap.offer(10);\nint smallest = minHeap.poll(); // 10\n\n// Custom Max-Heap:\nPriorityQueue<Integer> maxHeap = new PriorityQueue<>(Collections.reverseOrder());\nmaxHeap.offer(40);\nmaxHeap.offer(10);\nint largest = maxHeap.poll(); // 40",
      "codeExamples": [
        {
          "title": "Min-Heap vs Max-Heap Extraction",
          "code": "import java.util.Collections;\nimport java.util.PriorityQueue;\n\npublic class HeapComparisonDemo {\n    public static void main(String[] args) {\n        int[] scores = { 45, 12, 85, 32, 89, 42 };\n\n        // 1. Min-Heap (default)\n        PriorityQueue<Integer> minHeap = new PriorityQueue<>();\n        for (int s : scores) minHeap.offer(s);\n\n        System.out.print(\"Min-Heap extraction order: \");\n        while (!minHeap.isEmpty()) {\n            System.out.print(minHeap.poll() + \" \");\n        }\n        System.out.println();\n\n        // 2. Max-Heap (Collections.reverseOrder)\n        PriorityQueue<Integer> maxHeap = new PriorityQueue<>(Collections.reverseOrder());\n        for (int s : scores) maxHeap.offer(s);\n\n        System.out.print(\"Max-Heap extraction order: \");\n        while (!maxHeap.isEmpty()) {\n            System.out.print(maxHeap.poll() + \" \");\n        }\n        System.out.println();\n    }\n}",
          "expectedOutput": "Min-Heap extraction order: 12 32 42 45 85 89 \nMax-Heap extraction order: 89 85 45 42 32 12 ",
          "explanation": "Repeatedly polling from a min-heap extracts numbers in ascending order. Polling from a max-heap extracts numbers in descending order."
        },
        {
          "title": "Top-K Largest Elements Pattern Using Min-Heap of Size K",
          "code": "import java.util.List;\nimport java.util.PriorityQueue;\n\npublic class TopKElementsDemo {\n    public static PriorityQueue<Integer> findTopK(int[] nums, int k) {\n        // Keep a Min-Heap of fixed size K\n        PriorityQueue<Integer> minHeap = new PriorityQueue<>(k);\n        for (int n : nums) {\n            minHeap.offer(n);\n            if (minHeap.size() > k) {\n                minHeap.poll(); // Evict smallest element among the k+1 elements\n            }\n        }\n        return minHeap; // Holds the k largest elements!\n    }\n\n    public static void main(String[] args) {\n        int[] stream = { 3, 10, 1000, -4, 50, 200, 15, 800 };\n        PriorityQueue<Integer> top3 = findTopK(stream, 3);\n\n        System.out.println(\"Top 3 largest elements: \" + top3);\n        System.out.println(\"3rd largest element: \" + top3.peek());\n    }\n}",
          "expectedOutput": "Top 3 largest elements: [200, 800, 1000]\n3rd largest element: 200",
          "explanation": "Maintaining a min-heap of size K processes an N-element stream in O(N log K) time and O(K) space, far faster than sorting O(N log N)."
        }
      ],
      "realWorldApplications": [
        "Dijkstra’s algorithm for finding the shortest path in network routing.",
        "Real-time streaming analytics finding top-K trending hashtags or products."
      ],
      "commonMistakes": [
        "Expecting a `for-each` loop on a PriorityQueue to print elements in sorted order; only `poll()` guarantees priority retrieval.",
        "Inserting `null` into a PriorityQueue; throws `NullPointerException` because elements cannot be compared.",
        "Assuming iterating over a PriorityQueue yields elements in sorted order; only poll() guarantees priority ordering."
      ],
      "interviewRelevance": "Universal interview question: \"How to find K-th largest element in an array?\", \"Time complexity of heapify vs heap sort\", and \"Explain sift-up and sift-down operations.\"",
      "checkpoints": [
        {
          "id": "java-48-cp-1",
          "label": "Explain binary heap array indexing: parent = (i-1)/2, children = 2i+1, 2i+2"
        },
        {
          "id": "java-48-cp-2",
          "label": "Solve Top-K problems in O(N log K) time using a size-K Min-Heap"
        },
        {
          "id": "java-48-priorityqueue-cp-3",
          "label": "Configure min-heaps and max-heaps with custom Comparators for Top-K element queries."
        }
      ],
      "practiceExercises": [
        {
          "id": "java-48-ex-1",
          "title": "Find Kth Largest Element in Array",
          "difficulty": "Beginner",
          "type": "coding",
          "prompt": "Implement findKthLargest(int[] nums, int k) using a Min-Heap.",
          "solution": "import java.util.PriorityQueue;\n\npublic class KthLargestFinder {\n    public static int findKthLargest(int[] nums, int k) {\n        PriorityQueue<Integer> pq = new PriorityQueue<>(k);\n        for (int n : nums) {\n            pq.offer(n);\n            if (pq.size() > k) pq.poll();\n        }\n        return pq.peek();\n    }\n    public static void main(String[] args) {\n        int[] arr = { 3, 2, 1, 5, 6, 4 };\n        System.out.println(\"2nd largest: \" + findKthLargest(arr, 2)); // 5\n    }\n}",
          "explanation": "Maintains a size-K min-heap where the root is the Kth largest element."
        },
        {
          "id": "java-48-ex-2",
          "title": "Merge K Sorted Lists",
          "difficulty": "Intermediate",
          "type": "coding",
          "prompt": "Merge K sorted integer arrays into a single sorted list using a PriorityQueue in O(N log K) time.",
          "solution": "import java.util.*;\n\npublic class MergeKSorted {\n    static class Element {\n        int val, arrIdx, elemIdx;\n        Element(int v, int a, int e) { this.val = v; this.arrIdx = a; this.elemIdx = e; }\n    }\n\n    public static List<Integer> mergeK(int[][] arrays) {\n        List<Integer> res = new ArrayList<>();\n        PriorityQueue<Element> pq = new PriorityQueue<>(Comparator.comparingInt(e -> e.val));\n\n        for (int i = 0; i < arrays.length; i++) {\n            if (arrays[i].length > 0) pq.offer(new Element(arrays[i][0], i, 0));\n        }\n\n        while (!pq.isEmpty()) {\n            Element curr = pq.poll();\n            res.add(curr.val);\n            if (curr.elemIdx + 1 < arrays[curr.arrIdx].length) {\n                pq.offer(new Element(arrays[curr.arrIdx][curr.elemIdx + 1], curr.arrIdx, curr.elemIdx + 1));\n            }\n        }\n        return res;\n    }\n    public static void main(String[] args) {\n        int[][] arrs = { {1, 4, 7}, {2, 5, 8}, {3, 6, 9} };\n        System.out.println(\"Merged: \" + mergeK(arrs));\n    }\n}",
          "explanation": "Extracts the minimum among K active array heads in O(log K) per element."
        },
        {
          "id": "java-48-ex-3",
          "title": "Continuous Median Finder with Two Heaps",
          "difficulty": "Advanced",
          "type": "coding",
          "prompt": "Design a data structure MedianFinder supporting addNum(int) in O(log n) and findMedian() in O(1) using two heaps (Min-Heap and Max-Heap).",
          "solution": "import java.util.*;\n\npublic class MedianFinder {\n    private final PriorityQueue<Integer> maxHeap = new PriorityQueue<>(Collections.reverseOrder()); // Lower half\n    private final PriorityQueue<Integer> minHeap = new PriorityQueue<>(); // Upper half\n\n    public void addNum(int num) {\n        maxHeap.offer(num);\n        minHeap.offer(maxHeap.poll());\n        if (minHeap.size() > maxHeap.size()) {\n            maxHeap.offer(minHeap.poll());\n        }\n    }\n\n    public double findMedian() {\n        if (maxHeap.size() > minHeap.size()) return maxHeap.peek();\n        return (maxHeap.peek() + minHeap.peek()) / 2.0;\n    }\n    public static void main(String[] args) {\n        MedianFinder mf = new MedianFinder();\n        mf.addNum(1);\n        mf.addNum(2);\n        System.out.println(\"Median of 1, 2: \" + mf.findMedian());\n        mf.addNum(3);\n        System.out.println(\"Median of 1, 2, 3: \" + mf.findMedian());\n    }\n}",
          "explanation": "Balancing two heaps keeps the median at the top of the heaps for O(1) median retrieval."
        }
      ],
      "quizQuestions": [
        {
          "id": "java-48-q1",
          "question": "By default, what type of heap is instantiated by `new PriorityQueue<>()` in Java?",
          "options": [
            "Max-Heap",
            "Min-Heap",
            "Fibonacci Heap",
            "Binomial Heap"
          ],
          "correctOptionIndex": 1,
          "explanation": "PriorityQueue defaults to a Min-Heap where peek() returns the smallest element based on natural order."
        },
        {
          "id": "java-48-q2",
          "question": "What is the time complexity of the offer() and poll() operations in a PriorityQueue with N elements?",
          "options": [
            "O(1)",
            "O(log N)",
            "O(N)",
            "O(N log N)"
          ],
          "correctOptionIndex": 1,
          "explanation": "Inserting (sift-up) and extracting the root (sift-down) both traverse the height of the binary heap in O(log N) steps."
        }
      ],
      "revisionNotes": [
        "PriorityQueue is a Binary Heap; defaults to Min-Heap (peek() is minimum).",
        "offer() and poll() run in O(log n) time; peek() runs in O(1) time.",
        "Iterating with for-each does NOT guarantee sorted order; must poll() sequentially."
      ]
    },
    {
      "id": "java-49-stack-modern-alternatives",
      "moduleId": "java-m4",
      "moduleNumber": 4,
      "moduleTitle": "Java Collections Framework",
      "topicNumber": 49,
      "title": "Stack Legacy Class vs Modern ArrayDeque Alternative",
      "language": "java",
      "level": "Beginner",
      "whyItMatters": "Java’s legacy `java.util.Stack` class extends `Vector`, making every operation synchronize unnecessarily. The Java official documentation explicitly advises using `ArrayDeque` as a faster, modern LIFO stack.",
      "explanation": "1. The Legacy `java.util.Stack` Class:\n   - Introduced in Java 1.0, it extends `Vector`.\n   - Flaw 1: Unnecessary Synchronization. Every method (`push`, `pop`, `peek`) is `synchronized`, adding massive locking overhead even in single-threaded programs.\n   - Flaw 2: Violates Stack Abstraction. Because it inherits from `Vector`, clients can call `stack.add(0, item)` or `stack.remove(3)`, mutating the middle of the stack!\n2. The Modern Alternative: `ArrayDeque`:\n   - Implements `Deque<T>` (Double-Ended Queue).\n   - Non-synchronized (fast, zero lock contention).\n   - Methods: `push(e)` (calls `addFirst`), `pop()` (calls `removeFirst`), `peek()` (calls `peekFirst`).\n   - Backed by an efficient circular array buffer that outperforms both `Stack` and `LinkedList`.",
      "syntaxAndStructure": "// LEGACY (Discouraged):\nStack<Integer> legacyStack = new Stack<>();\nlegacyStack.push(10); // Synchronized lock acquired\n\n// MODERN BEST PRACTICE:\nDeque<Integer> modernStack = new ArrayDeque<>();\nmodernStack.push(10); // O(1) non-synchronized fast array insert\nint top = modernStack.pop();",
      "codeExamples": [
        {
          "title": "Modern LIFO Stack Operations Using ArrayDeque",
          "code": "import java.util.ArrayDeque;\nimport java.util.Deque;\n\npublic class ModernStackDemo {\n    public static void main(String[] args) {\n        // Modern recommended LIFO Stack declaration\n        Deque<String> stack = new ArrayDeque<>();\n\n        // Push operations\n        stack.push(\"Page_1\");\n        stack.push(\"Page_2\");\n        stack.push(\"Page_3\");\n\n        System.out.println(\"Top of stack (peek): \" + stack.peek());\n\n        // Pop operations (LIFO order)\n        System.out.print(\"Popped order: \");\n        while (!stack.isEmpty()) {\n            System.out.print(stack.pop() + \" \");\n        }\n        System.out.println();\n    }\n}",
          "expectedOutput": "Top of stack (peek): Page_3\nPopped order: Page_3 Page_2 Page_1 ",
          "explanation": "ArrayDeque.push() and pop() operate in LIFO order with near-zero overhead and no thread synchronization penalties."
        },
        {
          "title": "Demonstrating Why Legacy java.util.Stack is Flawed",
          "code": "import java.util.Stack;\n\npublic class LegacyStackFlawDemo {\n    public static void main(String[] args) {\n        Stack<String> stack = new Stack<>();\n        stack.push(\"Bottom\");\n        stack.push(\"Top\");\n\n        // FLAW: Because Stack extends Vector, arbitrary index operations are permitted!\n        stack.add(1, \"INTRUDER_INSERTED_IN_MIDDLE\");\n\n        System.out.println(\"Corrupted stack contents: \" + stack);\n        System.out.println(\"Popped element: \" + stack.pop());\n    }\n}",
          "expectedOutput": "Corrupted stack contents: [Bottom, INTRUDER_INSERTED_IN_MIDDLE, Top]\nPopped element: Top",
          "explanation": "Because Stack extends Vector, it violates encapsulation by exposing Vector index methods, breaking the pure LIFO contract."
        }
      ],
      "realWorldApplications": [
        "Evaluating mathematical expressions (Dijkstra’s Shunting-yard algorithm).",
        "Implementing browser back-button navigation history and undo/redo stacks."
      ],
      "commonMistakes": [
        "Declaring `Stack<T> stack = new Stack<>()` in interviews; interviewers expect `Deque<T> stack = new ArrayDeque<>()`.",
        "Using `queue.add()` instead of `stack.push()` when intending LIFO semantics.",
        "Using legacy java.util.Stack in single-threaded code, paying unnecessary synchronized locking penalties."
      ],
      "interviewRelevance": "Universal interview question: \"Why is java.util.Stack deprecated/discouraged in modern Java?\" (Answer: extends Vector, synchronizes every method, exposes index insertion).",
      "checkpoints": [
        {
          "id": "java-49-cp-1",
          "label": "Explain the 2 design flaws of legacy java.util.Stack: Vector inheritance and synchronization"
        },
        {
          "id": "java-49-cp-2",
          "label": "Use Deque<T> stack = new ArrayDeque<>() as the modern standard LIFO implementation"
        },
        {
          "id": "java-49-stack-modern-alternatives-cp-3",
          "label": "Replace legacy Stack and Vector with high-performance ArrayDeque."
        }
      ],
      "practiceExercises": [
        {
          "id": "java-49-ex-1",
          "title": "Valid Parentheses Checker",
          "difficulty": "Beginner",
          "type": "coding",
          "prompt": "Check if a string containing '(', ')', '{', '}', '[', ']' is valid using ArrayDeque.",
          "solution": "import java.util.*;\n\npublic class ValidParentheses {\n    public static boolean isValid(String s) {\n        Deque<Character> stack = new ArrayDeque<>();\n        for (char ch : s.toCharArray()) {\n            if (ch == '(') stack.push(')');\n            else if (ch == '{') stack.push('}');\n            else if (ch == '[') stack.push(']');\n            else if (stack.isEmpty() || stack.pop() != ch) return false;\n        }\n        return stack.isEmpty();\n    }\n    public static void main(String[] args) {\n        System.out.println(\"()[]{} is valid: \" + isValid(\"()[]{}\"));\n        System.out.println(\"([)] is valid: \" + isValid(\"([)]\"));\n    }\n}",
          "explanation": "Push expected closing brackets and match on encounter in O(n) time and O(n) space."
        },
        {
          "id": "java-49-ex-2",
          "title": "Evaluate Reverse Polish Notation (RPN)",
          "difficulty": "Intermediate",
          "type": "coding",
          "prompt": "Evaluate the value of an arithmetic expression in Reverse Polish Notation (e.g. [\"2\", \"1\", \"+\", \"3\", \"*\"] -> 9).",
          "solution": "import java.util.*;\n\npublic class RPNCalculator {\n    public static int evalRPN(String[] tokens) {\n        Deque<Integer> stack = new ArrayDeque<>();\n        for (String t : tokens) {\n            if (t.equals(\"+\")) stack.push(stack.pop() + stack.pop());\n            else if (t.equals(\"*\")) stack.push(stack.pop() * stack.pop());\n            else if (t.equals(\"-\")) {\n                int b = stack.pop(), a = stack.pop();\n                stack.push(a - b);\n            } else if (t.equals(\"/\")) {\n                int b = stack.pop(), a = stack.pop();\n                stack.push(a / b);\n            } else {\n                stack.push(Integer.parseInt(t));\n            }\n        }\n        return stack.pop();\n    }\n    public static void main(String[] args) {\n        String[] tokens = { \"2\", \"1\", \"+\", \"3\", \"*\" };\n        System.out.println(\"Result: \" + evalRPN(tokens));\n    }\n}",
          "explanation": "Operands are pushed; operators pop two operands and push the computed result."
        },
        {
          "id": "java-49-ex-3",
          "title": "MinStack Implementation in O(1) Time",
          "difficulty": "Advanced",
          "type": "coding",
          "prompt": "Design a stack that supports push, pop, top, and retrieving the minimum element in O(1) time.",
          "solution": "import java.util.ArrayDeque;\nimport java.util.Deque;\n\npublic class MinStack {\n    private final Deque<Integer> stack = new ArrayDeque<>();\n    private final Deque<Integer> minStack = new ArrayDeque<>();\n\n    public void push(int val) {\n        stack.push(val);\n        if (minStack.isEmpty() || val <= minStack.peek()) {\n            minStack.push(val);\n        }\n    }\n\n    public void pop() {\n        if (stack.peek().equals(minStack.peek())) {\n            minStack.pop();\n        }\n        stack.pop();\n    }\n\n    public int top() { return stack.peek(); }\n    public int getMin() { return minStack.peek(); }\n\n    public static void main(String[] args) {\n        MinStack ms = new MinStack();\n        ms.push(-2);\n        ms.push(0);\n        ms.push(-3);\n        System.out.println(\"Min: \" + ms.getMin()); // -3\n        ms.pop();\n        System.out.println(\"Top: \" + ms.top());   // 0\n        System.out.println(\"Min: \" + ms.getMin()); // -2\n    }\n}",
          "explanation": "An auxiliary minStack tracks the running minimum element at each stack depth in O(1) time."
        }
      ],
      "quizQuestions": [
        {
          "id": "java-49-q1",
          "question": "Why does the Java official documentation discourage the use of `java.util.Stack`?",
          "options": [
            "It is written in C++ and incompatible with JVM",
            "It inherits from Vector, synchronizing all methods unnecessarily and allowing illegal non-LIFO index access",
            "It cannot hold object references",
            "It is limited to 100 elements"
          ],
          "correctOptionIndex": 1,
          "explanation": "`java.util.Stack` extends `Vector`, inheriting synchronization overhead and methods that violate the LIFO abstraction."
        },
        {
          "id": "java-49-q2",
          "question": "What is the recommended interface and class combination for creating a LIFO Stack in modern Java?",
          "options": [
            "Stack<T> stack = new Stack<>()",
            "Deque<T> stack = new ArrayDeque<>()",
            "List<T> stack = new ArrayList<>()",
            "Queue<T> stack = new PriorityQueue<>()"
          ],
          "correctOptionIndex": 1,
          "explanation": "`Deque<T> stack = new ArrayDeque<>()` is the official modern replacement for Stack."
        }
      ],
      "revisionNotes": [
        "Legacy `java.util.Stack` extends `Vector` and synchronizes all methods unnecessarily.",
        "Use `Deque<T> stack = new ArrayDeque<>()` for high-performance LIFO stacks.",
        "ArrayDeque provides O(1) push(), pop(), and peek() without locking overhead."
      ]
    },
    {
      "id": "java-50-iterator-listiterator",
      "moduleId": "java-m4",
      "moduleNumber": 4,
      "moduleTitle": "Java Collections Framework",
      "topicNumber": 50,
      "title": "Iterator & ListIterator: Fail-Fast vs Fail-Safe Mechanics",
      "language": "java",
      "level": "Beginner",
      "whyItMatters": "`ConcurrentModificationException` is one of the most common runtime crashes in Java. Understanding `modCount`, fail-fast iterators, and how to safely delete elements while iterating is tested in every interview.",
      "explanation": "An `Iterator` allows traversing a collection sequentially and removing elements safely.\n1. `Iterator<E>` vs `ListIterator<E>`:\n   - `Iterator`: Forward traversal only (`hasNext()`, `next()`, `remove()`). Applicable to all `Collection` types.\n   - `ListIterator`: Bidirectional traversal (`hasPrevious()`, `previous()`), index queries (`nextIndex()`), and element modification (`set(e)`, `add(e)`). Only available on `List` types.\n2. Fail-Fast Iterators:\n   - Used by standard collections (`ArrayList`, `HashMap`, `HashSet`).\n   - Tracks a modification count field: `modCount`.\n   - When an iterator is created, it records `expectedModCount = modCount`.\n   - If the backing collection is structurally modified (via `list.add()` or `list.remove()`) during iteration, `modCount != expectedModCount`, immediately throwing `ConcurrentModificationException`!\n   - Safe Deletion: Call `iterator.remove()`, which updates both `modCount` and `expectedModCount`.\n3. Fail-Safe / Weakly Consistent Iterators:\n   - Used by concurrent collections (`CopyOnWriteArrayList`, `ConcurrentHashMap`).\n   - Operates on a snapshot or cloned array; NEVER throws `ConcurrentModificationException`.",
      "syntaxAndStructure": "// Safe removal using Iterator.remove():\nIterator<String> it = list.iterator();\nwhile (it.hasNext()) {\n    String s = it.next();\n    if (shouldRemove(s)) {\n        it.remove(); // SAFE: updates expectedModCount!\n    }\n}\n\n// Java 8 Modern Alternative:\nlist.removeIf(s -> shouldRemove(s));",
      "codeExamples": [
        {
          "title": "ConcurrentModificationException and the Safe Iterator Fix",
          "code": "import java.util.ArrayList;\nimport java.util.Iterator;\nimport java.util.List;\n\npublic class FailFastDemo {\n    public static void main(String[] args) {\n        List<String> items = new ArrayList<>(List.of(\"A\", \"B\", \"C\", \"D\"));\n\n        // Correct Safe Removal using iterator.remove()\n        Iterator<String> it = items.iterator();\n        while (it.hasNext()) {\n            String val = it.next();\n            if (\"B\".equals(val)) {\n                it.remove(); // Safe removal!\n            }\n        }\n        System.out.println(\"After safe iterator removal: \" + items);\n\n        // Demonstrating ConcurrentModificationException\n        try {\n            for (String s : items) {\n                if (\"A\".equals(s)) {\n                    items.remove(s); // DANGER: Structural modification during for-each loop!\n                }\n            }\n        } catch (Exception e) {\n            System.out.println(\"Caught expected: \" + e.getClass().getSimpleName());\n        }\n    }\n}",
          "expectedOutput": "After safe iterator removal: [A, C, D]\nCaught expected: ConcurrentModificationException",
          "explanation": "Mutating the collection directly with items.remove() alters modCount without updating the iterator, triggering ConcurrentModificationException. Calling it.remove() synchronizes both counts."
        },
        {
          "title": "Bidirectional Traversal with ListIterator",
          "code": "import java.util.ArrayList;\nimport java.util.List;\nimport java.util.ListIterator;\n\npublic class ListIteratorDemo {\n    public static void main(String[] args) {\n        List<String> steps = new ArrayList<>(List.of(\"Start\", \"Process\", \"Finish\"));\n\n        ListIterator<String> lit = steps.listIterator();\n\n        // Forward traversal\n        System.out.print(\"Forward: \");\n        while (lit.hasNext()) {\n            System.out.print(lit.next() + \" \");\n        }\n        System.out.println();\n\n        // Backward traversal\n        System.out.print(\"Backward: \");\n        while (lit.hasPrevious()) {\n            System.out.print(lit.previous() + \" \");\n        }\n        System.out.println();\n    }\n}",
          "expectedOutput": "Forward: Start Process Finish \nBackward: Finish Process Start ",
          "explanation": "ListIterator supports bidirectional traversal using hasPrevious() and previous()."
        }
      ],
      "realWorldApplications": [
        "Safely filtering elements from in-memory collections during business processing.",
        "Developing concurrent applications using fail-safe collections (`ConcurrentHashMap`) to avoid locking readers."
      ],
      "commonMistakes": [
        "Calling `list.remove(item)` inside an enhanced for-each loop, triggering `ConcurrentModificationException`. Use `list.removeIf(...)` or `iterator.remove()` instead.",
        "Calling `iterator.remove()` before `iterator.next()`, which throws `IllegalStateException`.",
        "Modifying a collection via collection.remove() during active iterator traversal instead of iterator.remove()."
      ],
      "interviewRelevance": "Universal interview question: \"What is ConcurrentModificationException and how do you prevent it?\", \"Fail-fast vs Fail-safe\", and \"What is modCount?\"",
      "checkpoints": [
        {
          "id": "java-50-cp-1",
          "label": "Explain how modCount vs expectedModCount triggers ConcurrentModificationException"
        },
        {
          "id": "java-50-cp-2",
          "label": "Safely remove elements during traversal using iterator.remove() or Collection.removeIf()"
        },
        {
          "id": "java-50-iterator-listiterator-cp-3",
          "label": "Use ListIterator for bidirectional traversal and in-place element replacement."
        }
      ],
      "practiceExercises": [
        {
          "id": "java-50-ex-1",
          "title": "Modern removeIf Syntax",
          "difficulty": "Beginner",
          "type": "coding",
          "prompt": "Use Collection.removeIf(Predicate) to delete all even numbers from an ArrayList.",
          "solution": "import java.util.*;\n\npublic class RemoveIfDemo {\n    public static void main(String[] args) {\n        List<Integer> nums = new ArrayList<>(List.of(1, 2, 3, 4, 5, 6));\n        nums.removeIf(n -> n % 2 == 0);\n        System.out.println(\"Odd numbers only: \" + nums);\n    }\n}",
          "explanation": "removeIf() is a concise Java 8 default method that safely handles internal iterator removal."
        },
        {
          "id": "java-50-ex-2",
          "title": "Bidirectional ListIterator Element Replacement",
          "difficulty": "Intermediate",
          "type": "coding",
          "prompt": "Use ListIterator to replace all occurrences of \"TODO\" with \"DONE\" in a List<String>.",
          "solution": "import java.util.*;\n\npublic class ListIteratorReplace {\n    public static void main(String[] args) {\n        List<String> tasks = new ArrayList<>(List.of(\"Design\", \"TODO\", \"Review\", \"TODO\"));\n        ListIterator<String> lit = tasks.listIterator();\n        while (lit.hasNext()) {\n            if (\"TODO\".equals(lit.next())) {\n                lit.set(\"DONE\"); // In-place replacement\n            }\n        }\n        System.out.println(\"Updated tasks: \" + tasks);\n    }\n}",
          "explanation": "ListIterator.set(e) replaces the last element returned by next() or previous()."
        },
        {
          "id": "java-50-ex-3",
          "title": "Fail-Safe CopyOnWriteArrayList Iteration",
          "difficulty": "Advanced",
          "type": "coding",
          "prompt": "Demonstrate that CopyOnWriteArrayList does NOT throw ConcurrentModificationException when structurally modified during iteration.",
          "solution": "import java.util.concurrent.CopyOnWriteArrayList;\n\npublic class FailSafeDemo {\n    public static void main(String[] args) {\n        CopyOnWriteArrayList<String> list = new CopyOnWriteArrayList<>();\n        list.add(\"Alpha\");\n        list.add(\"Beta\");\n\n        // Fail-safe: iterates over snapshot array\n        for (String item : list) {\n            System.out.println(\"Reading: \" + item);\n            list.add(\"Gamma\"); // Modifies underlying array without crashing!\n        }\n        System.out.println(\"Final list size: \" + list.size());\n    }\n}",
          "explanation": "CopyOnWriteArrayList iterates over an immutable snapshot of the array, preventing ConcurrentModificationException."
        }
      ],
      "quizQuestions": [
        {
          "id": "java-50-q1",
          "question": "What triggers a `ConcurrentModificationException` in a fail-fast iterator?",
          "options": [
            "Multiple threads reading the collection simultaneously",
            "A mismatch between the collection's `modCount` and the iterator's `expectedModCount`",
            "Attempting to store null",
            "Accessing an index out of bounds"
          ],
          "correctOptionIndex": 1,
          "explanation": "Fail-fast iterators verify `modCount == expectedModCount` on every call to `next()`. If the collection was modified, it throws ConcurrentModificationException."
        },
        {
          "id": "java-50-q2",
          "question": "Which method can safely remove an element while traversing a standard ArrayList without throwing ConcurrentModificationException?",
          "options": [
            "list.remove(index)",
            "list.remove(object)",
            "iterator.remove()",
            "list.clear()"
          ],
          "correctOptionIndex": 2,
          "explanation": "`iterator.remove()` updates both the collection and the iterator's internal `expectedModCount`, keeping them synchronized."
        }
      ],
      "revisionNotes": [
        "Fail-fast iterators throw ConcurrentModificationException if the backing collection is modified during traversal.",
        "Safely remove elements using `iterator.remove()` or `collection.removeIf()`.",
        "ListIterator allows bidirectional traversal and element replacement on lists."
      ]
    },
    {
      "id": "java-51-comparable-comparator",
      "moduleId": "java-m4",
      "moduleNumber": 4,
      "moduleTitle": "Java Collections Framework",
      "topicNumber": 51,
      "title": "Comparable vs Comparator: Natural Ordering & Custom Comparators",
      "language": "java",
      "level": "Beginner",
      "whyItMatters": "Sorting and priority queues require defining element ordering. Knowing the exact difference between `Comparable` (internal natural order) and `Comparator` (external custom strategy) and writing clean Java 8 lambda comparators is tested in every interview.",
      "explanation": "Java provides two interfaces for ordering objects:\n1. `Comparable<T>` (Natural Ordering):\n   - Package: `java.lang.Comparable`.\n   - Implemented within the class itself: `class Employee implements Comparable<Employee>`.\n   - Single method: `int compareTo(T o)`.\n   - Return conventions: negative if `this < o`, zero if `this == o`, positive if `this > o`.\n   - Provides a single, intrinsic default sorting strategy.\n2. `Comparator<T>` (Custom / Multiple Ordering Strategies):\n   - Package: `java.util.Comparator`.\n   - Defined in a separate class or as a lambda/method reference.\n   - Single abstract method: `int compare(T o1, T o2)`.\n   - Allows defining multiple independent sorting strategies for the same class (e.g., sort by name, sort by salary, sort by date).\n   - Java 8 Fluent Combinators: `Comparator.comparing(Employee::getSalary).reversed().thenComparing(Employee::getName)`.",
      "syntaxAndStructure": "// 1. Comparable (Natural Order):\nclass Student implements Comparable<Student> {\n    int id;\n    public int compareTo(Student other) {\n        return Integer.compare(this.id, other.id);\n    }\n}\n\n// 2. Comparator (Custom Order via Lambdas):\nComparator<Student> byName = (s1, s2) -> s1.name.compareTo(s2.name);\nComparator<Student> byGpaDesc = Comparator.comparingDouble(Student::getGpa).reversed();",
      "codeExamples": [
        {
          "title": "Modern Java 8 Comparator Chaining",
          "code": "import java.util.ArrayList;\nimport java.util.Comparator;\nimport java.util.List;\n\nclass Candidate {\n    String name;\n    int score;\n    int graduationYear;\n\n    Candidate(String n, int s, int y) {\n        this.name = n; this.score = s; this.graduationYear = y;\n    }\n    public String toString() { return name + \"(score=\" + score + \", yr=\" + graduationYear + \")\"; }\n}\n\npublic class ComparatorChainingDemo {\n    public static void main(String[] args) {\n        List<Candidate> candidates = new ArrayList<>();\n        candidates.add(new Candidate(\"Alice\", 85, 2025));\n        candidates.add(new Candidate(\"Bob\", 92, 2024));\n        candidates.add(new Candidate(\"Charlie\", 85, 2024));\n\n        // Sort: Score Descending, then GraduationYear Ascending, then Name Ascending\n        candidates.sort(\n            Comparator.comparingInt((Candidate c) -> c.score).reversed()\n                      .thenComparingInt(c -> c.graduationYear)\n                      .thenComparing(c -> c.name)\n        );\n\n        System.out.println(\"Ranked candidates:\");\n        for (Candidate c : candidates) {\n            System.out.println(\" - \" + c);\n        }\n    }\n}",
          "expectedOutput": "Ranked candidates:\n - Bob(score=92, yr=2024)\n - Charlie(score=85, yr=2024)\n - Alice(score=85, yr=2025)",
          "explanation": "Comparator.comparingInt().reversed().thenComparingInt() creates readable, highly efficient comparator chains without manual if-else boilerplate."
        },
        {
          "title": "Integer Subtraction Overflow Trap in compare()",
          "code": "import java.util.Comparator;\n\npublic class IntegerCompareOverflowDemo {\n    public static void main(String[] args) {\n        int a = -2000000000;\n        int b = 2000000000;\n\n        // FLAWED: a - b overflows two's complement 32-bit int!\n        int flawedResult = a - b; // Overflows to positive number!\n        System.out.println(\"Flawed (a - b): \" + flawedResult);\n\n        // CORRECT: Integer.compare(a, b) handles extremes safely without overflow\n        int safeResult = Integer.compare(a, b);\n        System.out.println(\"Safe Integer.compare(a, b): \" + safeResult);\n    }\n}",
          "expectedOutput": "Flawed (a - b): 294967296\nSafe Integer.compare(a, b): -1",
          "explanation": "Never write `return a - b` in compareTo/compare because subtraction can overflow. Always use `Integer.compare(a, b)` or `Double.compare(a, b)`."
        }
      ],
      "realWorldApplications": [
        "Sorting search results by relevance score and timestamp in e-commerce products.",
        "Configuring priority queues with multi-factor scheduling weights."
      ],
      "commonMistakes": [
        "Writing `return o1.id - o2.id` which triggers integer overflow when signs differ; always use `Integer.compare(o1.id, o2.id)`.",
        "Confusing `Comparable.compareTo` (takes 1 parameter) with `Comparator.compare` (takes 2 parameters).",
        "Using subtraction (a - b) in compare methods, leading to integer overflow and contract violation bugs."
      ],
      "interviewRelevance": "Universal interview question: \"What is the difference between Comparable and Comparator?\" and \"Why should you avoid subtraction inside compare()?\"",
      "checkpoints": [
        {
          "id": "java-51-cp-1",
          "label": "Distinguish Comparable (java.lang, compareTo) from Comparator (java.util, compare)"
        },
        {
          "id": "java-51-cp-2",
          "label": "Avoid integer subtraction overflow by using Integer.compare(a, b)"
        },
        {
          "id": "java-51-comparable-comparator-cp-3",
          "label": "Chain multiple sorting criteria cleanly using Comparator.comparing() and thenComparing()."
        }
      ],
      "practiceExercises": [
        {
          "id": "java-51-ex-1",
          "title": "Natural Order Implementation for Product",
          "difficulty": "Beginner",
          "type": "coding",
          "prompt": "Implement Comparable<Product> to sort products by price ascending.",
          "solution": "public class Product implements Comparable<Product> {\n    private String name;\n    private double price;\n    public Product(String n, double p) { this.name = n; this.price = p; }\n\n    @Override\n    public int compareTo(Product other) {\n        return Double.compare(this.price, other.price);\n    }\n    public static void main(String[] args) {\n        Product p1 = new Product(\"Pen\", 1.5);\n        Product p2 = new Product(\"Notebook\", 3.0);\n        System.out.println(\"p1 vs p2: \" + p1.compareTo(p2)); // Negative\n    }\n}",
          "explanation": "Double.compare() handles IEEE 754 NaN and precision rules safely."
        },
        {
          "id": "java-51-ex-2",
          "title": "Sort Strings by Length then Alphabetical",
          "difficulty": "Intermediate",
          "type": "coding",
          "prompt": "Sort a list of strings by length ascending; if lengths are equal, sort alphabetically.",
          "solution": "import java.util.*;\n\npublic class StringLengthSort {\n    public static void main(String[] args) {\n        List<String> words = new ArrayList<>(List.of(\"banana\", \"pie\", \"apple\", \"fig\", \"kiwi\"));\n        words.sort(\n            Comparator.comparingInt(String::length)\n                      .thenComparing(Comparator.naturalOrder())\n        );\n        System.out.println(\"Sorted: \" + words);\n    }\n}",
          "explanation": "Chaining comparingInt(String::length) with naturalOrder() achieves secondary sorting cleanly."
        },
        {
          "id": "java-51-ex-3",
          "title": "Null-Friendly Comparator",
          "difficulty": "Advanced",
          "type": "coding",
          "prompt": "Demonstrate how Comparator.nullsFirst() and Comparator.nullsLast() safely handle null elements without NullPointerException.",
          "solution": "import java.util.*;\n\npublic class NullSafeComparatorDemo {\n    public static void main(String[] args) {\n        List<String> list = new ArrayList<>(Arrays.asList(\"Beta\", null, \"Alpha\", null, \"Gamma\"));\n        // Sort nulls to the front, then natural order\n        list.sort(Comparator.nullsFirst(Comparator.naturalOrder()));\n        System.out.println(\"Nulls first: \" + list);\n    }\n}",
          "explanation": "Comparator.nullsFirst wraps a comparator and places null values at the beginning without throwing NPE."
        }
      ],
      "quizQuestions": [
        {
          "id": "java-51-q1",
          "question": "Which interface should be used when you need to define MULTIPLE different sorting strategies for the same class?",
          "options": [
            "java.lang.Comparable",
            "java.util.Comparator",
            "java.lang.Cloneable",
            "java.io.Serializable"
          ],
          "correctOptionIndex": 1,
          "explanation": "`Comparator` can be instantiated in multiple independent classes or lambdas, providing multiple sorting strategies."
        },
        {
          "id": "java-51-q2",
          "question": "Why is writing `return a - b` inside a Comparator considered dangerous?",
          "options": [
            "Because subtraction is deprecated in Java 17",
            "Because if a is negative and b is positive (or vice versa), the subtraction can overflow 32-bit int, yielding incorrect sorting",
            "Because subtraction only works on doubles",
            "Because the compiler rejects subtraction in comparators"
          ],
          "correctOptionIndex": 1,
          "explanation": "Subtraction can overflow into the opposite sign (e.g. -2B - 2B = positive), reversing the expected comparison."
        }
      ],
      "revisionNotes": [
        "Comparable defines a single natural ordering inside the class via `compareTo(T o)`.",
        "Comparator defines multiple external sorting strategies via `compare(T o1, T o2)`.",
        "Always use `Integer.compare(a, b)` instead of `a - b` to prevent overflow bugs."
      ]
    },
    {
      "id": "java-52-equals-hashcode-contracts",
      "moduleId": "java-m4",
      "moduleNumber": 4,
      "moduleTitle": "Java Collections Framework",
      "topicNumber": 52,
      "title": "The equals() & hashCode() Contracts in Hash Tables",
      "language": "java",
      "level": "Beginner",
      "whyItMatters": "Violating the equals() and hashCode() contract is the #1 cause of silent bugs and memory leaks when using HashMap and HashSet. Understanding the mathematical contract and bucket lookup sequence is mandatory for every Java developer.",
      "explanation": "In Java, `equals()` and `hashCode()` are defined in `java.lang.Object`:\n1. The Official Contract:\n   - Consistency: If `a.equals(b)` is TRUE, then `a.hashCode()` and `b.hashCode()` MUST be IDENTICAL!\n   - If `a.equals(b)` is FALSE, their hashCodes do NOT need to be distinct (though distinct hashCodes reduce collisions and optimize performance).\n   - If two objects have the same hashCode, they are NOT necessarily equal (this is simply a hash collision).\n2. How HashMap Uses Both:\n   - Step 1: When calling `map.get(key)`, the JVM calculates `key.hashCode()` to find the BUCKET index in $O(1)$.\n   - Step 2: Once inside the bucket, the JVM traverses the bucket nodes comparing `existingKey.equals(key)` to find the exact key.\n   - Bug: If you override `equals()` but NOT `hashCode()`, two \"equal\" objects will produce different hash codes, land in different buckets, and `map.get()` will return NULL!\n3. Properties of equals(): Reflexive, Symmetric, Transitive, Consistent, and `x.equals(null)` must return false.",
      "syntaxAndStructure": "// Correct implementation using java.util.Objects (Java 7+):\npublic class User {\n    private int id;\n    private String email;\n\n    @Override\n    public boolean equals(Object o) {\n        if (this == o) return true; // Reference check\n        if (!(o instanceof User other)) return false; // Null & Type check\n        return this.id == other.id && Objects.equals(this.email, other.email);\n    }\n\n    @Override\n    public int hashCode() {\n        return Objects.hash(id, email);\n    }\n}",
      "codeExamples": [
        {
          "title": "Demonstrating the Fatal Missing hashCode() Bug in HashMap",
          "code": "import java.util.HashMap;\nimport java.util.Map;\n\nclass BrokenUser {\n    String username;\n    BrokenUser(String u) { this.username = u; }\n\n    // Overriding equals, but FAILING to override hashCode!\n    @Override\n    public boolean equals(Object o) {\n        if (!(o instanceof BrokenUser other)) return false;\n        return this.username.equals(other.username);\n    }\n}\n\npublic class EqualsHashCodeBugDemo {\n    public static void main(String[] args) {\n        Map<BrokenUser, String> userProfiles = new HashMap<>();\n        BrokenUser u1 = new BrokenUser(\"alex99\");\n        userProfiles.put(u1, \"Admin Profile\");\n\n        // u2 has identical username; u1.equals(u2) is true!\n        BrokenUser u2 = new BrokenUser(\"alex99\");\n        System.out.println(\"u1.equals(u2): \" + u1.equals(u2));\n\n        // FATAL: u2 has a different default identity hashCode, so get() looks in the wrong bucket!\n        String profile = userProfiles.get(u2);\n        System.out.println(\"Retrieved profile with u2: \" + profile); // Prints null!\n    }\n}",
          "expectedOutput": "u1.equals(u2): true\nRetrieved profile with u2: null",
          "explanation": "Because hashCode() was not overridden, u1 and u2 produce different memory-based hash codes. get(u2) checks the wrong bucket and fails to find the entry."
        },
        {
          "title": "Correct Robust Implementation Using java.util.Objects",
          "code": "import java.util.HashMap;\nimport java.util.Map;\nimport java.util.Objects;\n\nclass CorrectUser {\n    int id;\n    String email;\n\n    CorrectUser(int id, String email) {\n        this.id = id; this.email = email;\n    }\n\n    @Override\n    public boolean equals(Object o) {\n        if (this == o) return true;\n        if (!(o instanceof CorrectUser other)) return false;\n        return this.id == other.id && Objects.equals(this.email, other.email);\n    }\n\n    @Override\n    public int hashCode() {\n        return Objects.hash(id, email);\n    }\n}\n\npublic class CorrectEqualsHashCodeDemo {\n    public static void main(String[] args) {\n        Map<CorrectUser, String> map = new HashMap<>();\n        map.put(new CorrectUser(101, \"dev@ak67.com\"), \"Developer Account\");\n\n        // Lookup with identical data finds the entry in O(1)!\n        String account = map.get(new CorrectUser(101, \"dev@ak67.com\"));\n        System.out.println(\"Retrieved account: \" + account);\n    }\n}",
          "expectedOutput": "Retrieved account: Developer Account",
          "explanation": "Because both equals and hashCode are overridden using identical fields, both instances compute the exact same hash code and land in the same bucket."
        }
      ],
      "realWorldApplications": [
        "Ensuring entities in JPA / Hibernate work reliably in Set relationships (like `@ManyToMany`).",
        "Using custom domain classes as keys in Redis, Caffeine, or Guava caches."
      ],
      "commonMistakes": [
        "Overriding `equals(MyClass o)` instead of `equals(Object o)`; this accidentally overloads the method instead of overriding it!",
        "Including mutable fields in `hashCode()` and mutating them after insertion, losing the entry.",
        "Violating transitivity or symmetry in equals() implementations when dealing with inheritance."
      ],
      "interviewRelevance": "Universal interview question: \"What is the contract between equals() and hashCode?\", \"What happens if you override equals() but not hashCode() in HashMap?\", and \"How does HashMap use both?\"",
      "checkpoints": [
        {
          "id": "java-52-cp-1",
          "label": "State the contract: a.equals(b) == true IMPLIES a.hashCode() == b.hashCode()"
        },
        {
          "id": "java-52-cp-2",
          "label": "Trace the two-step HashMap lookup: hashCode() finds bucket -> equals() finds key"
        },
        {
          "id": "java-52-equals-hashcode-contracts-cp-3",
          "label": "Implement bulletproof equals() and hashCode() using Objects.equals and Objects.hash."
        }
      ],
      "practiceExercises": [
        {
          "id": "java-52-ex-1",
          "title": "Accidental Overloading Mistake",
          "difficulty": "Beginner",
          "type": "conceptual",
          "prompt": "Why does boolean equals(Point p) fail to override equals in class Point? Show how to fix it.",
          "solution": "The method signature in Object is `boolean equals(Object o)`. Defining `boolean equals(Point p)` changes the parameter type from Object to Point, which is method OVERLOADING, not overriding. When HashMap calls equals(Object), it calls Object.equals() which checks reference equality. Fix: use `@Override public boolean equals(Object o)`.",
          "explanation": "Always use @Override to ensure the compiler catches accidental parameter type mismatches."
        },
        {
          "id": "java-52-ex-2",
          "title": "Prime Multiplier 31 in hashCode()",
          "difficulty": "Intermediate",
          "type": "conceptual",
          "prompt": "Why does Java traditionally use 31 as the prime multiplier when computing hashCode() in String and Objects.hash()?",
          "solution": "Two reasons:\n1. 31 is an odd prime, which reduces collisions when multiplying hash accumulators across character arrays.\n2. Modern JVM compilers optimize `31 * i` into a single fast bitwise shift and subtraction: `(i << 5) - i`. Modern CPUs execute this in a single clock cycle without expensive multiplication circuitry.",
          "explanation": "31 combines optimal mathematical distribution with single-cycle CPU shift optimization."
        },
        {
          "id": "java-52-ex-3",
          "title": "JPA Entity equals() and hashCode() Best Practice",
          "difficulty": "Advanced",
          "type": "conceptual",
          "prompt": "Why should JPA database entities NOT use auto-generated database IDs in hashCode() for transient (unpersisted) entities?",
          "solution": "Before an entity is persisted to the database, its `@Id` is `null` (or 0). If it is added to a `Set` while transient, its hashCode is based on 0. After calling `save()`, the database assigns an ID (e.g. 42), which mutates its hashCode! When you later check `set.contains(entity)`, it computes hashCode 42, checks the wrong bucket, and reports false. In JPA, equals and hashCode should rely on a natural business key (e.g. UUID, email) rather than generated database IDs.",
          "explanation": "Entities must maintain immutable hash codes across persistence lifecycle transitions."
        }
      ],
      "quizQuestions": [
        {
          "id": "java-52-q1",
          "question": "If two objects in Java are equal according to `a.equals(b) == true`, what MUST be true regarding their hash codes?",
          "options": [
            "Their hash codes must be equal",
            "Their hash codes must be different",
            "Their hash codes must both be zero",
            "No relationship is required"
          ],
          "correctOptionIndex": 0,
          "explanation": "The Java contract mandates: If two objects are equal according to equals(), their hashCode() values MUST be identical."
        },
        {
          "id": "java-52-q2",
          "question": "If two objects produce the same `hashCode()`, does that mean `a.equals(b)` is guaranteed to be true?",
          "options": [
            "Yes, identical hash codes guarantee object equality",
            "No, different objects can share the same hash code (this is a hash collision)",
            "Only for String objects",
            "Only in 64-bit JVMs"
          ],
          "correctOptionIndex": 1,
          "explanation": "Hash collisions are natural in hash tables. Multiple unequal objects can map to the exact same hash code."
        }
      ],
      "revisionNotes": [
        "If `a.equals(b)` is true, `a.hashCode() == b.hashCode()` is mandatory.",
        "Always override both `equals()` and `hashCode()` together.",
        "HashMap uses hashCode() to locate the bucket and equals() to find the matching key."
      ]
    },
    {
      "id": "java-53-collections-utility-algorithms",
      "moduleId": "java-m4",
      "moduleNumber": 4,
      "moduleTitle": "Java Collections Framework",
      "topicNumber": 53,
      "title": "The Collections Utility Class & Common Algorithms",
      "language": "java",
      "level": "Beginner",
      "whyItMatters": "`java.util.Collections` provides polymorphic algorithms (sorting, binary search, reversing, shuffling, synchronized wrappers, and unmodifiable views). Knowing these standard utilities eliminates reinventing the wheel in placement coding.",
      "explanation": "`java.util.Collections` is an uninstantiable utility class containing static methods that operate on or return collections:\n1. Sorting & Searching:\n   - `Collections.sort(list)`: Sorts using TimSort ($O(n \\log n)$ time, stable).\n   - `Collections.binarySearch(list, key)`: $O(\\log n)$ binary search on sorted lists.\n2. Reordering & Shuffling:\n   - `Collections.reverse(list)`: Inverts list in $O(n)$ time.\n   - `Collections.shuffle(list)`: Randomizes elements in $O(n)$ time (Fisher-Yates shuffle).\n   - `Collections.rotate(list, distance)`: Rotates list cyclically.\n3. Extreme Values & Frequency:\n   - `Collections.min(col)` / `Collections.max(col)`: Finds minimum/maximum.\n   - `Collections.frequency(col, obj)`: Counts occurrences.\n4. Defensive Views & Wrappers:\n   - `Collections.unmodifiableList(list)`: Returns a read-only view that throws `UnsupportedOperationException` on mutation.\n   - `Collections.synchronizedList(list)`: Synchronizes all methods with a mutex lock.\n   - `Collections.emptyList()` / `Collections.singletonList(item)`: Memory-efficient immutable lists.",
      "syntaxAndStructure": "// Sorting and searching:\nCollections.sort(list);\nint idx = Collections.binarySearch(list, target);\n\n// Reordering:\nCollections.reverse(list);\nCollections.shuffle(list);\n\n// Read-only view:\nList<String> readOnly = Collections.unmodifiableList(list);",
      "codeExamples": [
        {
          "title": "Core Collections Algorithms in Action",
          "code": "import java.util.ArrayList;\nimport java.util.Collections;\nimport java.util.List;\n\npublic class CollectionsUtilityDemo {\n    public static void main(String[] args) {\n        List<Integer> numbers = new ArrayList<>(List.of(40, 10, 80, 20, 50, 20));\n\n        // 1. Min and Max\n        System.out.println(\"Min element: \" + Collections.min(numbers));\n        System.out.println(\"Max element: \" + Collections.max(numbers));\n        System.out.println(\"Frequency of 20: \" + Collections.frequency(numbers, 20));\n\n        // 2. Sorting\n        Collections.sort(numbers);\n        System.out.println(\"Sorted: \" + numbers);\n\n        // 3. Binary search on sorted list\n        int index = Collections.binarySearch(numbers, 50);\n        System.out.println(\"Index of 50: \" + index);\n\n        // 4. Reverse in-place\n        Collections.reverse(numbers);\n        System.out.println(\"Reversed: \" + numbers);\n    }\n}",
          "expectedOutput": "Min element: 10\nMax element: 80\nFrequency of 20: 2\nSorted: [10, 20, 20, 40, 50, 80]\nIndex of 50: 4\nReversed: [80, 50, 40, 20, 20, 10]",
          "explanation": "Collections provides optimized, battle-tested algorithms for common collection manipulations."
        },
        {
          "title": "Unmodifiable Views vs Immutable Collections",
          "code": "import java.util.ArrayList;\nimport java.util.Collections;\nimport java.util.List;\n\npublic class UnmodifiableViewDemo {\n    public static void main(String[] args) {\n        List<String> backingList = new ArrayList<>();\n        backingList.add(\"Initial\");\n\n        // Returns an unmodifiable VIEW of the backing list\n        List<String> view = Collections.unmodifiableList(backingList);\n\n        try {\n            view.add(\"Disallowed\"); // Throws UnsupportedOperationException!\n        } catch (UnsupportedOperationException e) {\n            System.out.println(\"Caught mutation block on unmodifiable view.\");\n        }\n\n        // Modifying the backing list updates the view!\n        backingList.add(\"Updated via backing\");\n        System.out.println(\"View reflects backing list changes: \" + view.size());\n    }\n}",
          "expectedOutput": "Caught mutation block on unmodifiable view.\nView reflects backing list changes: 2",
          "explanation": "Collections.unmodifiableList returns a wrapper view; modifying the underlying backing list updates the view, unlike List.copyOf() which creates a true independent snapshot."
        }
      ],
      "realWorldApplications": [
        "Exposing read-only domain collections to prevent outside modification.",
        "Shuffling deck of cards or quiz question orders in gaming and assessment apps."
      ],
      "commonMistakes": [
        "Calling `Collections.binarySearch()` on an unsorted list, producing undefined negative results.",
        "Assuming `Collections.unmodifiableList()` creates an independent copy; it is merely a view over the backing list.",
        "Calling Collections.binarySearch() on an unsorted list, yielding undefined results."
      ],
      "interviewRelevance": "Common interview question: \"Difference between Collection and Collections?\", \"How does Collections.sort() work under the hood (TimSort)?\", and \"Unmodifiable list vs List.of()\".",
      "checkpoints": [
        {
          "id": "java-53-cp-1",
          "label": "Distinguish Collection (interface) from Collections (utility class with static methods)"
        },
        {
          "id": "java-53-cp-2",
          "label": "Use Collections.unmodifiableList vs List.of / List.copyOf appropriately"
        },
        {
          "id": "java-53-collections-utility-algorithms-cp-3",
          "label": "Leverage Collections utility methods: sort, binarySearch, unmodifiableList, and singletonList."
        }
      ],
      "practiceExercises": [
        {
          "id": "java-53-ex-1",
          "title": "Check If Two Collections Are Disjoint",
          "difficulty": "Beginner",
          "type": "coding",
          "prompt": "Use Collections.disjoint() to check if two lists share any common elements.",
          "solution": "import java.util.*;\n\npublic class DisjointCheck {\n    public static void main(String[] args) {\n        List<Integer> list1 = List.of(1, 2, 3);\n        List<Integer> list2 = List.of(4, 5, 6);\n        List<Integer> list3 = List.of(3, 7, 8);\n\n        System.out.println(\"list1 and list2 disjoint: \" + Collections.disjoint(list1, list2)); // true\n        System.out.println(\"list1 and list3 disjoint: \" + Collections.disjoint(list1, list3)); // false\n    }\n}",
          "explanation": "Collections.disjoint returns true if the two specified collections have no elements in common."
        },
        {
          "id": "java-53-ex-2",
          "title": "Rotate List Cyclically by K Positions",
          "difficulty": "Intermediate",
          "type": "coding",
          "prompt": "Use Collections.rotate() to rotate a list to the right by 2 positions.",
          "solution": "import java.util.*;\n\npublic class RotateDemo {\n    public static void main(String[] args) {\n        List<String> items = new ArrayList<>(List.of(\"A\", \"B\", \"C\", \"D\", \"E\"));\n        Collections.rotate(items, 2);\n        System.out.println(\"Rotated by 2: \" + items); // [D, E, A, B, C]\n    }\n}",
          "explanation": "Collections.rotate(list, distance) rotates the elements in linear time."
        },
        {
          "id": "java-53-ex-3",
          "title": "Thread-Safe Iteration on Synchronized Collection",
          "difficulty": "Advanced",
          "type": "coding",
          "prompt": "Demonstrate why iterating over Collections.synchronizedList requires manual synchronization on the list object.",
          "solution": "import java.util.*;\n\npublic class SyncListIterationDemo {\n    public static void main(String[] args) {\n        List<String> syncList = Collections.synchronizedList(new ArrayList<>(List.of(\"A\", \"B\")));\n\n        // Critical: Iterating over synchronizedList MUST be synchronized manually!\n        synchronized (syncList) {\n            Iterator<String> it = syncList.iterator();\n            while (it.hasNext()) {\n                System.out.println(it.next());\n            }\n        }\n    }\n}",
          "explanation": "Individual methods on synchronizedList are atomic, but iteration spans multiple method calls and requires manual synchronization on the collection mutex to prevent ConcurrentModificationException."
        }
      ],
      "quizQuestions": [
        {
          "id": "java-53-q1",
          "question": "What sorting algorithm is utilized by `Collections.sort()` for objects in Java?",
          "options": [
            "Quicksort",
            "TimSort (hybrid of merge sort and insertion sort)",
            "Heap sort",
            "Bubble sort"
          ],
          "correctOptionIndex": 1,
          "explanation": "`Collections.sort()` uses TimSort, an adaptive, stable sorting algorithm derived from merge sort and insertion sort."
        },
        {
          "id": "java-53-q2",
          "question": "What is the key difference between `Collection` and `Collections` in Java?",
          "options": [
            "Collection is a class, Collections is an interface",
            "Collection is the root interface of the collection hierarchy; Collections is a utility class with static helper methods",
            "Collections is deprecated in Java 17",
            "They are identical"
          ],
          "correctOptionIndex": 1,
          "explanation": "`Collection` is an interface; `Collections` is an uninstantiable utility class containing static algorithms."
        }
      ],
      "revisionNotes": [
        "`Collections` is a utility class with static algorithms (sort, binarySearch, reverse, shuffle).",
        "`Collections.sort()` uses TimSort ($O(n \\log n)$, stable).",
        "Iterating over `Collections.synchronizedList()` requires explicit manual synchronization on the list mutex."
      ]
    }
  ],
  "moduleAssessment": {
    "id": "java-m4-assessment",
    "title": "Module 4 Assessment: Java Collections Framework",
    "passingScorePercentage": 80,
    "questions": [
      {
        "id": "java-39-q1",
        "question": "Why does the Map interface NOT extend the Collection interface in Java?",
        "options": [
          "Because Map was created in C++",
          "Because Maps operate on key-value pairs, which incompatible with the single-element methods of Collection (like add(E))",
          "Because Map is deprecated",
          "Because Collections are only for primitives"
        ],
        "correctOptionIndex": 1,
        "explanation": "Collection represents a container of individual elements with methods like add(E). Map contains key-value pairs and cannot cleanly fulfill that contract."
      },
      {
        "id": "java-39-q2",
        "question": "Which interface in the Java Collections Framework enables an object to be targeted by the enhanced for-each loop?",
        "options": [
          "java.util.Collection",
          "java.lang.Iterable",
          "java.util.Iterator",
          "java.util.List"
        ],
        "correctOptionIndex": 1,
        "explanation": "The enhanced for-each loop requires target objects to implement `java.lang.Iterable` (or be an array)."
      },
      {
        "id": "java-40-q1",
        "question": "By what percentage does an ArrayList grow when its backing array is full in standard modern Java?",
        "options": [
          "100% (doubles)",
          "50% (1.5x)",
          "25%",
          "Fixed 10 elements"
        ],
        "correctOptionIndex": 1,
        "explanation": "In Java 8+, ArrayList grows by 50% using the bitwise formula `oldCapacity + (oldCapacity >> 1)`."
      },
      {
        "id": "java-40-q2",
        "question": "What is the time complexity of calling `list.add(0, element)` on an ArrayList containing N elements?",
        "options": [
          "O(1)",
          "O(log N)",
          "O(N)",
          "O(N^2)"
        ],
        "correctOptionIndex": 2,
        "explanation": "Inserting at index 0 requires shifting all N existing elements one position to the right via System.arraycopy, which takes O(N) linear time."
      },
      {
        "id": "java-41-q1",
        "question": "What data structure is used internally by java.util.LinkedList?",
        "options": [
          "Singly-linked list with tail pointer",
          "Doubly-linked list with head and tail pointers",
          "Dynamic resizable array",
          "Circular buffer"
        ],
        "correctOptionIndex": 1,
        "explanation": "LinkedList is implemented as a doubly-linked list where each Node has `next` and `prev` pointers."
      },
      {
        "id": "java-41-q2",
        "question": "Why does accessing elements by index using `get(index)` take O(n) in LinkedList but O(1) in ArrayList?",
        "options": [
          "LinkedList is synchronized",
          "LinkedList must traverse node pointers sequentially from head or tail to reach the requested index",
          "ArrayList uses binary search for get()",
          "LinkedList does not support zero-based indexing"
        ],
        "correctOptionIndex": 1,
        "explanation": "Nodes in a linked list are scattered in memory without direct address arithmetic, requiring sequential traversal from head or tail."
      },
      {
        "id": "java-42-q1",
        "question": "What data structure is used internally by java.util.HashSet to store its elements?",
        "options": [
          "A balanced Red-Black tree",
          "An internal java.util.HashMap instance",
          "A dynamic primitive array",
          "A circular queue"
        ],
        "correctOptionIndex": 1,
        "explanation": "HashSet is backed by a HashMap where set elements are stored as keys, mapped to a dummy dummy Object value."
      },
      {
        "id": "java-42-q2",
        "question": "What is the primary difference between HashSet and LinkedHashSet?",
        "options": [
          "LinkedHashSet allows duplicates, HashSet does not",
          "LinkedHashSet preserves insertion order; HashSet does not guarantee any order",
          "HashSet is sorted, LinkedHashSet is unsorted",
          "LinkedHashSet uses O(log n) tree search"
        ],
        "correctOptionIndex": 1,
        "explanation": "LinkedHashSet maintains a doubly-linked list through all its entries, preserving insertion order during iteration."
      },
      {
        "id": "java-43-q1",
        "question": "What is the time complexity of add(), remove(), and contains() in a TreeSet with N elements?",
        "options": [
          "O(1)",
          "O(log N)",
          "O(N)",
          "O(N log N)"
        ],
        "correctOptionIndex": 1,
        "explanation": "TreeSet is backed by a balanced Red-Black binary search tree, guaranteeing $O(\\log N)$ time for search, insertion, and deletion."
      },
      {
        "id": "java-43-q2",
        "question": "Which method returns the greatest element in a NavigableSet strictly less than the given element e?",
        "options": [
          "floor(e)",
          "lower(e)",
          "ceiling(e)",
          "higher(e)"
        ],
        "correctOptionIndex": 1,
        "explanation": "`lower(e)` returns the greatest element strictly less than e, while `floor(e)` returns the greatest element less than or equal to e."
      },
      {
        "id": "java-44-q1",
        "question": "In Java 8, what occurs when a single HashMap bucket exceeds 8 entries and total map capacity is >= 64?",
        "options": [
          "The map throws an OutOfMemoryError",
          "The bucket converts from a linked list to a balanced Red-Black Tree (TreeNode)",
          "The oldest entry is evicted",
          "The load factor automatically resets to 1.0"
        ],
        "correctOptionIndex": 1,
        "explanation": "Java 8 treeifies bucket chains exceeding TREEIFY_THRESHOLD (8) into Red-Black trees to preserve O(log n) worst-case performance."
      },
      {
        "id": "java-44-q2",
        "question": "What is the default initial capacity and default load factor of a standard Java HashMap?",
        "options": [
          "16 and 0.75",
          "10 and 0.50",
          "32 and 0.80",
          "8 and 1.0"
        ],
        "correctOptionIndex": 0,
        "explanation": "A standard HashMap initializes with a default capacity of 16 and a load factor of 0.75 (resizing at 12 elements)."
      },
      {
        "id": "java-45-q1",
        "question": "Which method should be overridden in a LinkedHashMap subclass to automatically evict old entries when capacity is exceeded?",
        "options": [
          "evictOldest()",
          "removeEldestEntry(Map.Entry eldest)",
          "cleanUp()",
          "pollLast()"
        ],
        "correctOptionIndex": 1,
        "explanation": "Overriding `protected boolean removeEldestEntry(Map.Entry eldest)` and returning `true` triggers automatic eviction of the least recently used entry."
      },
      {
        "id": "java-45-q2",
        "question": "What happens when accessOrder is set to true in LinkedHashMap and an entry is read with `map.get(key)`?",
        "options": [
          "The entry is deleted from the map",
          "The accessed entry is relocated to the tail of the iteration order",
          "The entry value is incremented",
          "Nothing, get() does not affect iteration order"
        ],
        "correctOptionIndex": 1,
        "explanation": "When accessOrder is true, get() moves the accessed entry to the tail (most recently used position) of the linked list."
      },
      {
        "id": "java-46-q1",
        "question": "Can a java.util.TreeMap store a `null` key in modern Java?",
        "options": [
          "Yes, up to one null key is allowed like in HashMap",
          "No, attempting to insert a null key throws a NullPointerException because keys must be compared",
          "Only if the comparator handles null",
          "Only if the map is empty"
        ],
        "correctOptionIndex": 1,
        "explanation": "TreeMap requires keys to be compared. Attempting to compare null throws a NullPointerException."
      },
      {
        "id": "java-46-q2",
        "question": "What interface is extended by TreeMap that provides range methods like subMap, floorEntry, and ceilingEntry?",
        "options": [
          "java.util.SortedMap",
          "java.util.NavigableMap",
          "java.util.ConcurrentMap",
          "java.util.IndexedMap"
        ],
        "correctOptionIndex": 1,
        "explanation": "TreeMap implements `java.util.NavigableMap`, which extends `SortedMap` with bidirectional navigation and boundary queries."
      },
      {
        "id": "java-47-q1",
        "question": "What does `queue.poll()` return when invoked on an empty Queue?",
        "options": [
          "Throws NoSuchElementException",
          "Returns null without throwing an exception",
          "Throws IllegalStateException",
          "Blocks the current thread indefinitely"
        ],
        "correctOptionIndex": 1,
        "explanation": "`poll()` safely returns null when the queue is empty, whereas `remove()` throws NoSuchElementException."
      },
      {
        "id": "java-47-q2",
        "question": "Which concrete class is the recommended, fastest implementation of both Queue and Deque for single-threaded usage?",
        "options": [
          "java.util.LinkedList",
          "java.util.ArrayDeque",
          "java.util.Vector",
          "java.util.Stack"
        ],
        "correctOptionIndex": 1,
        "explanation": "`ArrayDeque` is backed by a circular resizable array and is significantly faster and more cache-efficient than `LinkedList`."
      },
      {
        "id": "java-48-q1",
        "question": "By default, what type of heap is instantiated by `new PriorityQueue<>()` in Java?",
        "options": [
          "Max-Heap",
          "Min-Heap",
          "Fibonacci Heap",
          "Binomial Heap"
        ],
        "correctOptionIndex": 1,
        "explanation": "PriorityQueue defaults to a Min-Heap where peek() returns the smallest element based on natural order."
      },
      {
        "id": "java-48-q2",
        "question": "What is the time complexity of the offer() and poll() operations in a PriorityQueue with N elements?",
        "options": [
          "O(1)",
          "O(log N)",
          "O(N)",
          "O(N log N)"
        ],
        "correctOptionIndex": 1,
        "explanation": "Inserting (sift-up) and extracting the root (sift-down) both traverse the height of the binary heap in O(log N) steps."
      },
      {
        "id": "java-49-q1",
        "question": "Why does the Java official documentation discourage the use of `java.util.Stack`?",
        "options": [
          "It is written in C++ and incompatible with JVM",
          "It inherits from Vector, synchronizing all methods unnecessarily and allowing illegal non-LIFO index access",
          "It cannot hold object references",
          "It is limited to 100 elements"
        ],
        "correctOptionIndex": 1,
        "explanation": "`java.util.Stack` extends `Vector`, inheriting synchronization overhead and methods that violate the LIFO abstraction."
      },
      {
        "id": "java-49-q2",
        "question": "What is the recommended interface and class combination for creating a LIFO Stack in modern Java?",
        "options": [
          "Stack<T> stack = new Stack<>()",
          "Deque<T> stack = new ArrayDeque<>()",
          "List<T> stack = new ArrayList<>()",
          "Queue<T> stack = new PriorityQueue<>()"
        ],
        "correctOptionIndex": 1,
        "explanation": "`Deque<T> stack = new ArrayDeque<>()` is the official modern replacement for Stack."
      },
      {
        "id": "java-50-q1",
        "question": "What triggers a `ConcurrentModificationException` in a fail-fast iterator?",
        "options": [
          "Multiple threads reading the collection simultaneously",
          "A mismatch between the collection's `modCount` and the iterator's `expectedModCount`",
          "Attempting to store null",
          "Accessing an index out of bounds"
        ],
        "correctOptionIndex": 1,
        "explanation": "Fail-fast iterators verify `modCount == expectedModCount` on every call to `next()`. If the collection was modified, it throws ConcurrentModificationException."
      },
      {
        "id": "java-50-q2",
        "question": "Which method can safely remove an element while traversing a standard ArrayList without throwing ConcurrentModificationException?",
        "options": [
          "list.remove(index)",
          "list.remove(object)",
          "iterator.remove()",
          "list.clear()"
        ],
        "correctOptionIndex": 2,
        "explanation": "`iterator.remove()` updates both the collection and the iterator's internal `expectedModCount`, keeping them synchronized."
      },
      {
        "id": "java-51-q1",
        "question": "Which interface should be used when you need to define MULTIPLE different sorting strategies for the same class?",
        "options": [
          "java.lang.Comparable",
          "java.util.Comparator",
          "java.lang.Cloneable",
          "java.io.Serializable"
        ],
        "correctOptionIndex": 1,
        "explanation": "`Comparator` can be instantiated in multiple independent classes or lambdas, providing multiple sorting strategies."
      },
      {
        "id": "java-51-q2",
        "question": "Why is writing `return a - b` inside a Comparator considered dangerous?",
        "options": [
          "Because subtraction is deprecated in Java 17",
          "Because if a is negative and b is positive (or vice versa), the subtraction can overflow 32-bit int, yielding incorrect sorting",
          "Because subtraction only works on doubles",
          "Because the compiler rejects subtraction in comparators"
        ],
        "correctOptionIndex": 1,
        "explanation": "Subtraction can overflow into the opposite sign (e.g. -2B - 2B = positive), reversing the expected comparison."
      },
      {
        "id": "java-52-q1",
        "question": "If two objects in Java are equal according to `a.equals(b) == true`, what MUST be true regarding their hash codes?",
        "options": [
          "Their hash codes must be equal",
          "Their hash codes must be different",
          "Their hash codes must both be zero",
          "No relationship is required"
        ],
        "correctOptionIndex": 0,
        "explanation": "The Java contract mandates: If two objects are equal according to equals(), their hashCode() values MUST be identical."
      },
      {
        "id": "java-52-q2",
        "question": "If two objects produce the same `hashCode()`, does that mean `a.equals(b)` is guaranteed to be true?",
        "options": [
          "Yes, identical hash codes guarantee object equality",
          "No, different objects can share the same hash code (this is a hash collision)",
          "Only for String objects",
          "Only in 64-bit JVMs"
        ],
        "correctOptionIndex": 1,
        "explanation": "Hash collisions are natural in hash tables. Multiple unequal objects can map to the exact same hash code."
      },
      {
        "id": "java-53-q1",
        "question": "What sorting algorithm is utilized by `Collections.sort()` for objects in Java?",
        "options": [
          "Quicksort",
          "TimSort (hybrid of merge sort and insertion sort)",
          "Heap sort",
          "Bubble sort"
        ],
        "correctOptionIndex": 1,
        "explanation": "`Collections.sort()` uses TimSort, an adaptive, stable sorting algorithm derived from merge sort and insertion sort."
      },
      {
        "id": "java-53-q2",
        "question": "What is the key difference between `Collection` and `Collections` in Java?",
        "options": [
          "Collection is a class, Collections is an interface",
          "Collection is the root interface of the collection hierarchy; Collections is a utility class with static helper methods",
          "Collections is deprecated in Java 17",
          "They are identical"
        ],
        "correctOptionIndex": 1,
        "explanation": "`Collection` is an interface; `Collections` is an uninstantiable utility class containing static algorithms."
      }
    ]
  },
  "revisionQuestions": [
    "Explain the internal architecture and treeification of HashMap in Java 8+.",
    "Why is ArrayDeque preferred over legacy Stack and LinkedList for queue and stack implementations?",
    "What is the contract between equals() and hashCode() and why does HashMap fail if only one is overridden?",
    "How does LinkedHashMap implement an LRU cache using accessOrder and removeEldestEntry()?",
    "Explain how Collections.sort() uses TimSort and why Integer.compare() is preferred over subtraction."
  ]
};
