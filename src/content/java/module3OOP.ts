import { MasteryTopic, MasteryModule } from '@/types/mastery';

export const module3Topics: MasteryTopic[] = [
  {
    "id": "java-23-classes-objects",
    "moduleId": "java-m3",
    "moduleNumber": 3,
    "moduleTitle": "Object-Oriented Programming",
    "topicNumber": 23,
    "title": "Classes, Objects & Heap-Stack Memory Allocation",
    "language": "java",
    "level": "Beginner",
    "whyItMatters": "Classes and objects form the fundamental blueprint of Java programming. Understanding how objects are instantiated on the Heap while their references reside on the Thread Stack is essential for preventing memory leaks and mastering OOP.",
    "explanation": "In Java, a `class` is a user-defined blueprint or template that defines the state (fields/attributes) and behavior (methods) common to all objects of that type. An `object` is a concrete instance of a class dynamically allocated on the Heap.\nMemory Allocation:\n1. Class Metadata: When the class is loaded by the ClassLoader, its structure and static fields are stored in Metaspace.\n2. Stack Frame: When a method like `main()` executes, its local reference variable (e.g. `Account acc`) is allocated on the thread's call stack.\n3. Heap Memory: The `new Account()` statement allocates contiguous heap memory for the instance variables, executes the constructor, and returns the 64-bit reference address (or 32-bit compressed OOP) to `acc` on the stack.",
    "syntaxAndStructure": "// Class definition:\npublic class Account {\n    // State (Instance Variables)\n    private String id;\n    private double balance;\n\n    // Behavior (Methods)\n    public void credit(double amount) { this.balance += amount; }\n}\n\n// Object Instantiation:\nAccount acc = new Account(); // acc on Stack, instance on Heap",
    "codeExamples": [
      {
        "title": "Instantiating Independent Object Instances",
        "code": "public class Car {\n    String model;\n    int year;\n\n    public Car(String model, int year) {\n        this.model = model;\n        this.year = year;\n    }\n\n    public void display() {\n        System.out.println(model + \" (\" + year + \")\");\n    }\n\n    public static void main(String[] args) {\n        // Two distinct objects on the Heap\n        Car car1 = new Car(\"Tesla Model 3\", 2024);\n        Car car2 = new Car(\"BMW i4\", 2025);\n\n        car1.display();\n        car2.display();\n        System.out.println(\"Distinct references: \" + (car1 != car2));\n    }\n}",
        "expectedOutput": "Tesla Model 3 (2024)\nBMW i4 (2025)\nDistinct references: true",
        "explanation": "car1 and car2 hold distinct memory references pointing to separate instances in Heap memory."
      },
      {
        "title": "Demonstrating Reference Aliasing",
        "code": "public class AliasingDemo {\n    static class Node {\n        int val;\n        Node(int v) { this.val = v; }\n    }\n\n    public static void main(String[] args) {\n        Node n1 = new Node(10);\n        Node n2 = n1; // Reference aliasing: n2 points to the EXACT same heap object\n\n        n2.val = 99; // Mutates object via alias\n\n        System.out.println(\"n1.val: \" + n1.val);\n        System.out.println(\"n2.val: \" + n2.val);\n        System.out.println(\"Are references identical: \" + (n1 == n2));\n    }\n}",
        "expectedOutput": "n1.val: 99\nn2.val: 99\nAre references identical: true",
        "explanation": "Assigning n2 = n1 copies the reference address, not the object. Both variables reference the identical heap entity."
      }
    ],
    "realWorldApplications": [
      "Modeling domain entities in enterprise applications (User, Order, PaymentTransaction).",
      "Memory optimization in high-frequency trading where object allocations on the heap are minimized to reduce GC pauses."
    ],
    "commonMistakes": [
      "Confusing an object reference with the object itself; multiple references can point to the same object on the heap.",
      "Assuming classes occupy heap space per instance; class metadata is loaded once into Metaspace.",
      "Confusing a null reference with an empty object, causing NullPointerException on method invocation."
    ],
    "interviewRelevance": "Foundational topic: \"Explain the difference between a class and an object\", \"What happens in memory when `new` is executed?\", and \"What is reference aliasing?\"",
    "checkpoints": [
      {
        "id": "java-23-cp-1",
        "label": "Explain the difference between stack reference and heap object instantiation"
      },
      {
        "id": "java-23-cp-2",
        "label": "Demonstrate reference aliasing and its effect on object mutation"
      },
      {
        "id": "java-23-classes-objects-cp-3",
        "label": "Model domain entities with proper state and behavior encapsulation."
      }
    ],
    "practiceExercises": [
      {
        "id": "java-23-ex-1",
        "title": "Count Active Object Instances",
        "difficulty": "Beginner",
        "type": "coding",
        "prompt": "Write a class Product with an instance name and a static instanceCount that increments on every constructor call.",
        "solution": "public class Product {\n    private static int instanceCount = 0;\n    private String name;\n\n    public Product(String name) {\n        this.name = name;\n        instanceCount++;\n    }\n\n    public static int getInstanceCount() { return instanceCount; }\n\n    public static void main(String[] args) {\n        new Product(\"P1\");\n        new Product(\"P2\");\n        System.out.println(\"Total products created: \" + Product.getInstanceCount());\n    }\n}",
        "explanation": "Instance state is unique to each object, while the static variable tracks cumulative instantiations across the class."
      },
      {
        "id": "java-23-ex-2",
        "title": "Deep Copy vs Shallow Copy of Objects",
        "difficulty": "Intermediate",
        "type": "coding",
        "prompt": "Demonstrate the difference between shallow copying (copying references) and deep copying (duplicating nested objects).",
        "solution": "class Address {\n    String city;\n    Address(String c) { this.city = c; }\n}\n\nclass User {\n    String name;\n    Address address;\n    User(String n, Address a) { this.name = n; this.address = a; }\n\n    // Deep copy constructor\n    User(User other) {\n        this.name = other.name;\n        this.address = new Address(other.address.city);\n    }\n}\n\npublic class DeepCopyDemo {\n    public static void main(String[] args) {\n        User u1 = new User(\"Alice\", new Address(\"Bengaluru\"));\n        User u2 = new User(u1); // Deep copy\n        u2.address.city = \"Hyderabad\";\n\n        System.out.println(\"u1 city: \" + u1.address.city);\n        System.out.println(\"u2 city: \" + u2.address.city);\n    }\n}",
        "explanation": "Deep copying instantiates a new Address object so that mutations in u2 do not affect u1."
      },
      {
        "id": "java-23-ex-3",
        "title": "Object Header and Memory Alignment (JOL Concept)",
        "difficulty": "Advanced",
        "type": "conceptual",
        "prompt": "Explain what constitutes an Object Header in 64-bit HotSpot JVM (Mark Word + Klass Word) and how memory padding works.",
        "solution": "Every Java object on the heap begins with an Object Header:\n1. Mark Word (64 bits / 8 bytes): Holds identity hashcode, GC age, biased locking/lock flags, and thread IDs.\n2. Klass Word (32 bits with Compressed OOPs, else 64 bits): Points to the class metadata in Metaspace.\n3. Instance Fields: Primitive fields and reference pointers.\n4. Padding: The JVM aligns all object sizes to multiples of 8 bytes (64 bits) for CPU bus efficiency. If fields sum to 21 bytes, 3 bytes of padding are appended to make it 24 bytes.",
        "explanation": "HotSpot 64-bit JVM uses 8-byte object alignment and 8-to-12 byte object headers."
      }
    ],
    "quizQuestions": [
      {
        "id": "java-23-q1",
        "question": "Where is an object instantiated with the `new` keyword stored in the standard JVM?",
        "options": [
          "On the Thread Stack",
          "In the Heap Memory",
          "In the Metaspace",
          "In CPU Cache"
        ],
        "correctOptionIndex": 1,
        "explanation": "All dynamic object allocations created via `new` reside in Heap Memory."
      },
      {
        "id": "java-23-q2",
        "question": "What is created when executing: `Student s1 = new Student(); Student s2 = s1;`?",
        "options": [
          "Two objects on the heap with separate references",
          "One object on the heap with two reference variables pointing to it",
          "A compilation error because s2 is not initialized with new",
          "A clone of the Student object"
        ],
        "correctOptionIndex": 1,
        "explanation": "Assigning s2 = s1 copies the memory address from s1 into s2, creating an alias pointing to the single heap instance."
      }
    ],
    "revisionNotes": [
      "A class is a blueprint; an object is an instance allocated on the Heap.",
      "Object references live on the Stack; actual object fields reside on the Heap.",
      "Assigning one object variable to another copies the reference address, not the object."
    ]
  },
  {
    "id": "java-24-constructors",
    "moduleId": "java-m3",
    "moduleNumber": 3,
    "moduleTitle": "Object-Oriented Programming",
    "topicNumber": 24,
    "title": "Constructors, Default Constructor & Initialization Lifecycle",
    "language": "java",
    "level": "Beginner",
    "whyItMatters": "Constructors establish class invariants and guarantee that objects enter memory in a valid state. Understanding the default no-arg constructor rules and initialization sequence prevents runtime null errors.",
    "explanation": "A constructor is a special block of code that initializes a newly instantiated object. Key characteristics:\n1. Name & Return Type: Must share the exact name of the enclosing class and has NO return type (not even `void`).\n2. Default No-Arg Constructor: If a class declares NO constructors at all, the Java compiler automatically synthesizes a public no-arg default constructor that calls `super()`.\n3. Loss of Default Constructor: If you define ANY custom constructor (e.g. `User(String name)`), the compiler DOES NOT generate the default no-arg constructor! If a no-arg constructor is still needed, it must be declared explicitly.\n4. Object Initialization Sequence:\n   - Step 1: Memory allocated on heap and zero-initialized (0, false, null).\n   - Step 2: `super()` constructor runs.\n   - Step 3: Instance variable initializers and instance initializer blocks `{}` run in textual order.\n   - Step 4: The constructor body executes.",
    "syntaxAndStructure": "public class Employee {\n    private String name;\n    private int id;\n\n    // Parameterized constructor\n    public Employee(String name, int id) {\n        this.name = name;\n        this.id = id;\n    }\n\n    // Explicit no-arg constructor\n    public Employee() {\n        this(\"Unknown\", 0);\n    }\n}",
    "codeExamples": [
      {
        "title": "Verifying the Loss of Default Constructor",
        "code": "class ExplicitConstructorOnly {\n    String role;\n    // Parameterized constructor defined\n    public ExplicitConstructorOnly(String role) {\n        this.role = role;\n    }\n}\n\npublic class DefaultConstructorDemo {\n    public static void main(String[] args) {\n        ExplicitConstructorOnly obj = new ExplicitConstructorOnly(\"Engineer\");\n        System.out.println(\"Role: \" + obj.role);\n\n        // The line below fails compilation because the compiler no longer creates a no-arg constructor:\n        // ExplicitConstructorOnly missing = new ExplicitConstructorOnly(); // Compile Error!\n        System.out.println(\"Verified: Custom constructor eliminates automatic default constructor.\");\n    }\n}",
        "expectedOutput": "Role: Engineer\nVerified: Custom constructor eliminates automatic default constructor.",
        "explanation": "When any constructor is explicitly declared, the compiler withdraws the automatic default no-arg constructor."
      },
      {
        "title": "Complete Object Initialization Lifecycle Order",
        "code": "class ParentClass {\n    ParentClass() {\n        System.out.println(\"1. Parent constructor executed via super().\");\n    }\n}\n\npublic class InitLifecycleDemo extends ParentClass {\n    // Instance variable initializer\n    int field = initializeField();\n\n    int initializeField() {\n        System.out.println(\"2. Instance field initialized.\");\n        return 100;\n    }\n\n    // Instance block\n    {\n        System.out.println(\"3. Instance block executed.\");\n    }\n\n    // Constructor\n    public InitLifecycleDemo() {\n        super();\n        System.out.println(\"4. Child constructor body executed.\");\n    }\n\n    public static void main(String[] args) {\n        new InitLifecycleDemo();\n    }\n}",
        "expectedOutput": "1. Parent constructor executed via super().\n2. Instance field initialized.\n3. Instance block executed.\n4. Child constructor body executed.",
        "explanation": "Parent constructor executes first, followed by instance field initializers and instance blocks in textual order, and finally the child constructor body."
      }
    ],
    "realWorldApplications": [
      "Establishing mandatory domain invariants upon entity creation (e.g., throwing IllegalArgumentException if email is null).",
      "Dependency injection in frameworks like Spring where dependencies are passed via constructor injection."
    ],
    "commonMistakes": [
      "Accidentally writing `public void Student()`; adding a return type `void` turns the constructor into a normal method that is never invoked on `new Student()`!",
      "Assuming the compiler always provides a no-arg constructor; creating a parameterized constructor removes the default no-arg constructor.",
      "Expecting the default no-argument constructor to exist after defining a parameterized constructor."
    ],
    "interviewRelevance": "Classic interview question: \"Can a constructor be private?\", \"What happens if you define a constructor with a void return type?\", and \"Trace the constructor execution hierarchy.\"",
    "checkpoints": [
      {
        "id": "java-24-cp-1",
        "label": "Explain when the Java compiler automatically creates or omits the default constructor"
      },
      {
        "id": "java-24-cp-2",
        "label": "Trace the 4-step object initialization sequence from super() to constructor body"
      },
      {
        "id": "java-24-constructors-cp-3",
        "label": "Understand default constructor generation and initialization sequences."
      }
    ],
    "practiceExercises": [
      {
        "id": "java-24-ex-1",
        "title": "Private Constructor for Utility Classes",
        "difficulty": "Beginner",
        "type": "coding",
        "prompt": "Demonstrate how a private constructor prevents external instantiation of a class.",
        "solution": "public class MathConstants {\n    private MathConstants() {\n        // Prevent instantiation\n    }\n    public static final double GOLDEN_RATIO = 1.6180339887;\n    public static void main(String[] args) {\n        System.out.println(\"Golden ratio: \" + MathConstants.GOLDEN_RATIO);\n    }\n}",
        "explanation": "Declaring the constructor private prevents callers outside the class from using new MathConstants()."
      },
      {
        "id": "java-24-ex-2",
        "title": "Constructor Invariant Validation",
        "difficulty": "Intermediate",
        "type": "coding",
        "prompt": "Write a constructor for a StudentAccount that validates that age >= 18 and GPA is between 0.0 and 4.0, throwing IllegalArgumentException otherwise.",
        "solution": "public class StudentAccount {\n    private final int age;\n    private final double gpa;\n\n    public StudentAccount(int age, double gpa) {\n        if (age < 18) throw new IllegalArgumentException(\"Age must be >= 18\");\n        if (gpa < 0.0 || gpa > 4.0) throw new IllegalArgumentException(\"GPA must be between 0.0 and 4.0\");\n        this.age = age;\n        this.gpa = gpa;\n    }\n    public static void main(String[] args) {\n        StudentAccount s = new StudentAccount(20, 3.8);\n        System.out.println(\"Valid account created.\");\n    }\n}",
        "explanation": "Validating constructor parameters guarantees that no invalid object can exist in memory."
      },
      {
        "id": "java-24-ex-3",
        "title": "Dangers of Calling Overridable Methods in Constructors",
        "difficulty": "Advanced",
        "type": "coding",
        "prompt": "Demonstrate why calling an overridable method inside a parent constructor causes subtle bugs with uninitialized child fields.",
        "solution": "class SuperBase {\n    SuperBase() {\n        printDetails(); // DANGEROUS: overridable method called in constructor\n    }\n    void printDetails() { System.out.println(\"SuperBase\"); }\n}\n\nclass SubChild extends SuperBase {\n    String tag = \"INITIALIZED_TAG\";\n    @Override\n    void printDetails() {\n        System.out.println(\"SubChild tag: \" + tag); // tag is NULL here because child initializers haven't run!\n    }\n}\n\npublic class ConstructorFlawDemo {\n    public static void main(String[] args) {\n        new SubChild();\n    }\n}",
        "explanation": "When SuperBase runs, SubChild's field `tag` is not yet initialized, resulting in printing `tag: null`. Never call overridable methods in constructors!"
      }
    ],
    "quizQuestions": [
      {
        "id": "java-24-q1",
        "question": "What occurs if a developer writes `public void Account() { ... }` in a class named Account?",
        "options": [
          "It is a valid no-argument constructor",
          "It is a regular method named Account, NOT a constructor, and won't execute on new Account()",
          "It causes a compilation error",
          "It creates an abstract constructor"
        ],
        "correctOptionIndex": 1,
        "explanation": "Constructors cannot specify any return type, not even void. Specifying void turns it into a standard method."
      },
      {
        "id": "java-24-q2",
        "question": "When does the Java compiler supply an automatic default constructor?",
        "options": [
          "Only when the class has at least one static method",
          "Only if the class does not define any constructors of its own",
          "Always, even if custom parameterized constructors exist",
          "Only in abstract classes"
        ],
        "correctOptionIndex": 1,
        "explanation": "The automatic default constructor is only generated if the class contains zero explicitly defined constructors."
      }
    ],
    "revisionNotes": [
      "Constructors must share the class name and have no return type (not even void).",
      "Defining any constructor removes the automatic default no-arg constructor.",
      "Never invoke overridable methods inside constructors."
    ]
  },
  {
    "id": "java-25-constructor-overloading",
    "moduleId": "java-m3",
    "moduleNumber": 3,
    "moduleTitle": "Object-Oriented Programming",
    "topicNumber": 25,
    "title": "Constructor Overloading & Constructor Chaining (this)",
    "language": "java",
    "level": "Beginner",
    "whyItMatters": "Constructor overloading provides multiple ways to initialize an object. Constructor chaining via `this(...)` eliminates duplicate initialization code and guarantees that validation logic is centralized in one canonical constructor.",
    "explanation": "Constructor Overloading allows a class to declare multiple constructors with different parameter lists (different types, counts, or orders).\nConstructor Chaining (`this()`):\nWhen a class has multiple constructors, one constructor can call another constructor within the same class using `this(...)`:\n1. `this(...)` MUST be the very first statement in the constructor body.\n2. You cannot use instance fields or methods as arguments to `this(...)` because the instance is not yet fully initialized.\n3. Circular constructor chaining (e.g. A calls B, and B calls A) causes a compile error: \"Recursive constructor invocation\".\n4. Centralizing initialization in a single master (canonical) constructor guarantees consistent data validation and clean maintenance.",
    "syntaxAndStructure": "public class UserProfile {\n    private String username;\n    private String role;\n    private boolean active;\n\n    // Canonical Master Constructor\n    public UserProfile(String username, String role, boolean active) {\n        this.username = username;\n        this.role = role;\n        this.active = active;\n    }\n\n    // Overloaded Constructor 1: Defaults active to true\n    public UserProfile(String username, String role) {\n        this(username, role, true); // MUST be first statement\n    }\n\n    // Overloaded Constructor 2: Defaults role to \"USER\"\n    public UserProfile(String username) {\n        this(username, \"USER\", true);\n    }\n}",
    "codeExamples": [
      {
        "title": "Centralized Constructor Chaining Pattern",
        "code": "public class ConnectionConfig {\n    private String host;\n    private int port;\n    private int timeoutMs;\n\n    // Master Constructor containing validation\n    public ConnectionConfig(String host, int port, int timeoutMs) {\n        if (port <= 0 || port > 65535) throw new IllegalArgumentException(\"Invalid port: \" + port);\n        this.host = host;\n        this.port = port;\n        this.timeoutMs = timeoutMs;\n    }\n\n    // Overload chaining with default timeout\n    public ConnectionConfig(String host, int port) {\n        this(host, port, 5000); // Calls master constructor\n    }\n\n    // Overload chaining with default port and timeout\n    public ConnectionConfig(String host) {\n        this(host, 8080, 5000); // Calls master constructor\n    }\n\n    public void printConfig() {\n        System.out.println(\"Config -> Host: \" + host + \", Port: \" + port + \", Timeout: \" + timeoutMs + \"ms\");\n    }\n\n    public static void main(String[] args) {\n        ConnectionConfig c1 = new ConnectionConfig(\"localhost\");\n        ConnectionConfig c2 = new ConnectionConfig(\"api.ak67.com\", 443, 2000);\n        c1.printConfig();\n        c2.printConfig();\n    }\n}",
        "expectedOutput": "Config -> Host: localhost, Port: 8080, Timeout: 5000ms\nConfig -> Host: api.ak67.com, Port: 443, Timeout: 2000ms",
        "explanation": "Constructors delegate to the primary master constructor using this(...). This avoids duplicating port validation across three places."
      },
      {
        "title": "Verifying \"First Statement\" Rule and Errors",
        "code": "public class ConstructorRulesDemo {\n    private int x;\n\n    public ConstructorRulesDemo(int x) {\n        this.x = x;\n    }\n\n    public ConstructorRulesDemo() {\n        // System.out.println(\"Starting init\"); // ILLEGAL: this() must be the FIRST statement\n        this(42); // Valid: first statement\n        System.out.println(\"Chained constructor executed successfully.\");\n    }\n\n    public static void main(String[] args) {\n        ConstructorRulesDemo demo = new ConstructorRulesDemo();\n        System.out.println(\"Value of x: \" + demo.x);\n    }\n}",
        "expectedOutput": "Chained constructor executed successfully.\nValue of x: 42",
        "explanation": "Java strictly requires this(...) to be the first executable statement in the constructor to guarantee safe, deterministic initialization."
      }
    ],
    "realWorldApplications": [
      "Configuring connection pools (HikariCP), HTTP clients, and database repositories with default parameters.",
      "Refactoring legacy classes to add optional features without breaking existing client code."
    ],
    "commonMistakes": [
      "Placing logging or assignment statements before `this(...)`, causing the compiler error: \"Constructor call must be the first statement in a constructor\".",
      "Accidentally calling `new ClassName(...)` inside a constructor instead of `this(...)`, creating an unused extra object without initializing the current instance.",
      "Placing this(...) constructor delegation calls after other statements; this() must be the very first statement."
    ],
    "interviewRelevance": "Frequent interview topic: \"Can a constructor call another constructor?\", \"Where must this() be placed?\", and \"Can you call both this() and super() in the same constructor?\" (Answer: No, both must be the first statement).",
    "checkpoints": [
      {
        "id": "java-25-cp-1",
        "label": "Use this(...) to chain constructors and centralize initialization logic"
      },
      {
        "id": "java-25-cp-2",
        "label": "Enforce that this(...) must be the very first statement and cannot be circular"
      },
      {
        "id": "java-25-constructor-overloading-cp-3",
        "label": "Chain constructors efficiently to prevent redundant initialization logic."
      }
    ],
    "practiceExercises": [
      {
        "id": "java-25-ex-1",
        "title": "Identify Illegal Constructor Chaining",
        "difficulty": "Beginner",
        "type": "conceptual",
        "prompt": "Why can a constructor NOT contain both super() and this()? Explain.",
        "solution": "Both `super()` and `this()` are required by the Java Language Specification to be the very first statement in a constructor. Because there can only be one first statement, a constructor cannot contain both. When `this(...)` is called, the target constructor will eventually invoke `super()` in the chain.",
        "explanation": "Enforces an unambiguous, linear constructor hierarchy up to Object."
      },
      {
        "id": "java-25-ex-2",
        "title": "RGB Color Palette Constructor Chaining",
        "difficulty": "Intermediate",
        "type": "coding",
        "prompt": "Write a Color class with constructors for RGB (3 ints), Grayscale (1 int -> r=g=b), and Default (no-arg -> black 0,0,0) using this(...).",
        "solution": "public class Color {\n    private final int r, g, b;\n\n    public Color(int r, int g, int b) {\n        this.r = r; this.g = g; this.b = b;\n    }\n    public Color(int gray) {\n        this(gray, gray, gray);\n    }\n    public Color() {\n        this(0);\n    }\n    public void print() {\n        System.out.println(\"RGB(\" + r + \",\" + g + \",\" + b + \")\");\n    }\n    public static void main(String[] args) {\n        new Color().print();\n        new Color(128).print();\n        new Color(255, 0, 0).print();\n    }\n}",
        "explanation": "The no-arg constructor chains to the single-arg constructor, which chains to the 3-arg master constructor."
      },
      {
        "id": "java-25-ex-3",
        "title": "Detect Circular Constructor Invocation",
        "difficulty": "Advanced",
        "type": "conceptual",
        "prompt": "Given class Node { Node() { this(1); } Node(int x) { this(); } }. What does the compiler report?",
        "solution": "Compile error: \"Recursive constructor invocation Node()\". The Java compiler builds a call graph of constructors; if a cycle is detected, compilation immediately fails to prevent runtime infinite recursion.",
        "explanation": "Static cycle detection prevents stack overflow before execution."
      }
    ],
    "quizQuestions": [
      {
        "id": "java-25-q1",
        "question": "Where must the constructor call `this(...)` be placed inside a constructor?",
        "options": [
          "It can be placed anywhere in the constructor body",
          "It must be the very first statement",
          "It must be the last statement",
          "It must be inside a try-catch block"
        ],
        "correctOptionIndex": 1,
        "explanation": "The Java specification mandates that `this(...)` or `super(...)` must be the first statement in any constructor."
      },
      {
        "id": "java-25-q2",
        "question": "Can a constructor call another constructor using `this(...)` and also call `super(...)` directly?",
        "options": [
          "Yes, if this() is first and super() is second",
          "No, because both must be the first statement",
          "Yes, in Java 17 and above",
          "Only in final classes"
        ],
        "correctOptionIndex": 1,
        "explanation": "Both calls require being the first statement, which is impossible. The target constructor in `this(...)` will handle `super()`."
      }
    ],
    "revisionNotes": [
      "Constructor chaining (`this(...)`) eliminates duplicated initialization code.",
      "`this(...)` must always be the first statement in the constructor.",
      "Circular constructor calls cause a compile-time error."
    ]
  },
  {
    "id": "java-26-this-keyword",
    "moduleId": "java-m3",
    "moduleNumber": 3,
    "moduleTitle": "Object-Oriented Programming",
    "topicNumber": 26,
    "title": "The this Keyword: Disambiguation, Passing & Method Chaining",
    "language": "java",
    "level": "Beginner",
    "whyItMatters": "`this` is an implicit reference to the current executing object instance. Mastering `this` is critical for variable shadowing disambiguation, passing the current object to external services, and implementing fluent Builder patterns.",
    "explanation": "In Java, `this` is a reference variable that refers to the current object whose method or constructor is being invoked. Primary uses of `this`:\n1. Disambiguating Variable Shadowing: When a method or constructor parameter shares the exact same name as an instance field (e.g. `this.name = name;`).\n2. Constructor Chaining: Invoking another constructor in the same class (`this(...)`).\n3. Method Chaining (Fluent Interface / Builder Pattern): Returning `this` from setters allows chaining method calls (`builder.setName(\"X\").setAge(20)`).\n4. Passing `this` as Argument: Passing the current instance to another class or event listener (`eventHandler.register(this)`).\n5. Returning `this` from Enclosing Class: In inner classes, `OuterClass.this` accesses the enclosing instance.\n\nRestriction: `this` CANNOT be used in any static context (static methods, static blocks, static field initializers) because static members exist without an instance.",
    "syntaxAndStructure": "public class Builder {\n    private String data;\n    \n    // 1. Variable shadowing disambiguation\n    public Builder setData(String data) {\n        this.data = data;\n        return this; // 2. Fluent method chaining\n    }\n}",
    "codeExamples": [
      {
        "title": "Fluent Builder Pattern Using return this",
        "code": "public class QueryBuilder {\n    private String table;\n    private String whereClause = \"\";\n    private int limit = 10;\n\n    public QueryBuilder from(String table) {\n        this.table = table;\n        return this; // Return current instance for chaining\n    }\n\n    public QueryBuilder where(String condition) {\n        this.whereClause = \" WHERE \" + condition;\n        return this;\n    }\n\n    public QueryBuilder limit(int limit) {\n        this.limit = limit;\n        return this;\n    }\n\n    public String build() {\n        return \"SELECT * FROM \" + table + whereClause + \" LIMIT \" + limit;\n    }\n\n    public static void main(String[] args) {\n        // Method chaining via 'return this'\n        String sql = new QueryBuilder()\n                .from(\"candidates\")\n                .where(\"score >= 90\")\n                .limit(5)\n                .build();\n        System.out.println(\"Generated SQL: \" + sql);\n    }\n}",
        "expectedOutput": "Generated SQL: SELECT * FROM candidates WHERE score >= 90 LIMIT 5",
        "explanation": "Returning `this` from each configuration method enables fluent method chaining, widely used in modern Java frameworks and builders."
      },
      {
        "title": "Passing this to a Collaborating Class",
        "code": "class EventListener {\n    void onEvent(Button source) {\n        System.out.println(\"Event fired on button: \" + source.getLabel());\n    }\n}\n\npublic class Button {\n    private String label;\n    private EventListener listener;\n\n    public Button(String label, EventListener listener) {\n        this.label = label;\n        this.listener = listener;\n    }\n\n    public String getLabel() { return this.label; }\n\n    public void click() {\n        // Passing 'this' (the current Button instance) to the listener\n        this.listener.onEvent(this);\n    }\n\n    public static void main(String[] args) {\n        EventListener listener = new EventListener();\n        Button btn = new Button(\"Submit Application\", listener);\n        btn.click();\n    }\n}",
        "expectedOutput": "Event fired on button: Submit Application",
        "explanation": "Passing `this` hands a reference of the current object to external callbacks and event dispatchers."
      }
    ],
    "realWorldApplications": [
      "Fluent API design (e.g. `StringBuilder.append().append()`, Stream API builders, Spring WebClient).",
      "Event-driven architectures where component instances register themselves via `register(this)`."
    ],
    "commonMistakes": [
      "Attempting to reference `this` inside a `public static void main` or any static method, causing a compile error.",
      "Omitting `this.` when method parameters shadow instance variables (e.g. `name = name;` assigns the parameter to itself, leaving the instance field null!).",
      "Attempting to use this in a static method or static initializer block."
    ],
    "interviewRelevance": "Frequent interview topic: \"What are all the uses of the this keyword in Java?\" and \"Why does `name = name;` fail to initialize the instance variable?\"",
    "checkpoints": [
      {
        "id": "java-26-cp-1",
        "label": "Use this to disambiguate shadowed instance variables in constructors and setters"
      },
      {
        "id": "java-26-cp-2",
        "label": "Implement method chaining by returning this for fluent interfaces"
      },
      {
        "id": "java-26-this-keyword-cp-3",
        "label": "Use this for shadowing disambiguation, method chaining, and constructor delegation."
      }
    ],
    "practiceExercises": [
      {
        "id": "java-26-ex-1",
        "title": "Shadowing Assignment Trap",
        "difficulty": "Beginner",
        "type": "coding",
        "prompt": "Demonstrate what happens when writing name = name instead of this.name = name in a constructor, and show the fix.",
        "solution": "public class ShadowingTrap {\n    private String name;\n    public ShadowingTrap(String name) {\n        name = name; // BUG: Assigns parameter to itself!\n    }\n    public String getName() { return this.name; }\n    public static void main(String[] args) {\n        ShadowingTrap obj = new ShadowingTrap(\"Alice\");\n        System.out.println(\"Result without this: \" + obj.getName()); // null\n    }\n}",
        "explanation": "Without `this.`, the compiler resolves the closest scoped variable (the local parameter), ignoring the instance field."
      },
      {
        "id": "java-26-ex-2",
        "title": "Fluent Math Calculator",
        "difficulty": "Intermediate",
        "type": "coding",
        "prompt": "Create a Calculator class supporting chained operations: new Calculator(10).add(5).multiply(2).getResult().",
        "solution": "public class FluentCalculator {\n    private double val;\n    public FluentCalculator(double v) { this.val = v; }\n    public FluentCalculator add(double x) { this.val += x; return this; }\n    public FluentCalculator multiply(double x) { this.val *= x; return this; }\n    public double getResult() { return this.val; }\n    public static void main(String[] args) {\n        double res = new FluentCalculator(10).add(5).multiply(2).getResult();\n        System.out.println(\"Result: \" + res);\n    }\n}",
        "explanation": "Each arithmetic method updates internal state and returns `this`, allowing continuous chained operations."
      },
      {
        "id": "java-26-ex-3",
        "title": "Inner Class Outer.this Reference",
        "difficulty": "Advanced",
        "type": "coding",
        "prompt": "Write an inner class that accesses a shadowed variable of the outer class using Outer.this.x syntax.",
        "solution": "public class Outer {\n    private int x = 100;\n    class Inner {\n        private int x = 200;\n        void printBoth() {\n            System.out.println(\"Inner x: \" + this.x);\n            System.out.println(\"Outer x: \" + Outer.this.x);\n        }\n    }\n    public static void main(String[] args) {\n        new Outer().new Inner().printBoth();\n    }\n}",
        "explanation": "Outer.this explicitly resolves the enclosing outer instance when inner and outer fields collide."
      }
    ],
    "quizQuestions": [
      {
        "id": "java-26-q1",
        "question": "Which of the following is NOT a valid use of the `this` keyword in Java?",
        "options": [
          "Calling a constructor in the same class: this(...)",
          "Referring to an instance variable: this.variable",
          "Accessing a local variable from inside a static method: this.staticVar",
          "Returning the current object reference from a method: return this;"
        ],
        "correctOptionIndex": 2,
        "explanation": "`this` cannot be used in any static method or static context because static methods execute without an instance."
      },
      {
        "id": "java-26-q2",
        "question": "How do you refer to the enclosing outer class instance from a non-static inner class when variables share names?",
        "options": [
          "super.this",
          "OuterClass.this",
          "this.outer",
          "enclosing.this"
        ],
        "correctOptionIndex": 1,
        "explanation": "`OuterClass.this` explicitly qualifies the outer class instance reference from within an inner class."
      }
    ],
    "revisionNotes": [
      "`this` represents the current instance of the class.",
      "`this` disambiguates variable shadowing between fields and parameters.",
      "`return this;` powers fluent method chaining and the Builder pattern."
    ]
  },
  {
    "id": "java-27-inheritance",
    "moduleId": "java-m3",
    "moduleNumber": 3,
    "moduleTitle": "Object-Oriented Programming",
    "topicNumber": 27,
    "title": "Inheritance, the extends Keyword & IS-A Hierarchy",
    "language": "java",
    "level": "Beginner",
    "whyItMatters": "Inheritance is the OOP mechanism for code reuse and hierarchical categorization. Understanding why Java supports single class inheritance and how the IS-A relationship functions prevents fragile base class anti-patterns.",
    "explanation": "Inheritance in Java allows a subclass to acquire the fields and methods of a superclass using the `extends` keyword.\nCore Concepts:\n1. IS-A Relationship: If `Dog extends Animal`, then a Dog IS-A Animal. An instance of Dog can be assigned to an Animal reference variable.\n2. Single Inheritance for Classes: In Java, a class can extend AT MOST ONE direct superclass (`class C extends A, B` is FORBIDDEN). This deliberately eliminates the \"Diamond Problem\" of multiple inheritance found in C++.\n3. Types of Inheritance in Java:\n   - Single: A -> B\n   - Multilevel: A -> B -> C\n   - Hierarchical: A -> B and A -> C\n   - (Multiple inheritance is supported strictly through Interfaces).\n4. All classes in Java implicitly inherit from `java.lang.Object` (the ultimate root of the class hierarchy).\n5. What is inherited? Public and protected members are inherited. Package-private members are inherited only within the same package. Private members and constructors are NEVER inherited.",
    "syntaxAndStructure": "// Superclass (Parent)\npublic class Vehicle {\n    protected String brand;\n    public void start() { System.out.println(\"Starting engine\"); }\n}\n\n// Subclass (Child) using extends\npublic class ElectricCar extends Vehicle {\n    private int batteryCapacity;\n    public void charge() { System.out.println(\"Charging battery\"); }\n}",
    "codeExamples": [
      {
        "title": "Single and Multilevel Inheritance Demonstration",
        "code": "class Device {\n    void powerOn() {\n        System.out.println(\"Device power on.\");\n    }\n}\n\nclass Computer extends Device {\n    void bootOS() {\n        System.out.println(\"Operating system booted.\");\n    }\n}\n\nclass Laptop extends Computer {\n    void foldScreen() {\n        System.out.println(\"Laptop screen folded.\");\n    }\n}\n\npublic class MultilevelInheritanceDemo {\n    public static void main(String[] args) {\n        Laptop myLaptop = new Laptop();\n        // Inherited from Device (Grandparent)\n        myLaptop.powerOn();\n        // Inherited from Computer (Parent)\n        myLaptop.bootOS();\n        // Native to Laptop (Child)\n        myLaptop.foldScreen();\n\n        // Polymorphic reference check\n        System.out.println(\"Is Laptop a Device (IS-A): \" + (myLaptop instanceof Device));\n    }\n}",
        "expectedOutput": "Device power on.\nOperating system booted.\nLaptop screen folded.\nIs Laptop a Device (IS-A): true",
        "explanation": "Multilevel inheritance passes down public/protected behaviors from Device -> Computer -> Laptop. Laptop is transitively an instance of Device."
      },
      {
        "title": "Private Member Non-Inheritance Demonstration",
        "code": "class BankVault {\n    private String secretCombination = \"9876\"; // Private: NOT inherited\n    protected String vaultId = \"VAULT_A\";       // Protected: Inherited\n\n    public String getVaultId() { return vaultId; }\n}\n\npublic class SecurityBranch extends BankVault {\n    public void printAccess() {\n        System.out.println(\"Accessing: \" + vaultId);\n        // System.out.println(secretCombination); // COMPILE ERROR: private in BankVault\n    }\n\n    public static void main(String[] args) {\n        SecurityBranch branch = new SecurityBranch();\n        branch.printAccess();\n    }\n}",
        "expectedOutput": "Accessing: VAULT_A",
        "explanation": "Subclasses cannot access private members of the parent directly, preserving strict data encapsulation across inheritance tiers."
      }
    ],
    "realWorldApplications": [
      "Class hierarchies in GUI frameworks (Component -> Container -> Window -> Frame).",
      "Exception hierarchy modeling (`Throwable` -> `Exception` -> `RuntimeException` -> `IllegalArgumentException`)."
    ],
    "commonMistakes": [
      "Attempting multiple class inheritance (`class C extends A, B`); Java allows multiple interfaces, but only a single parent class.",
      "Using inheritance solely for code reuse when there is no genuine IS-A relationship; favor composition instead.",
      "Attempting multiple class inheritance (class A extends B, C) which is prohibited in Java."
    ],
    "interviewRelevance": "Universal interview question: \"Why does Java not support multiple inheritance with classes?\" (Answer: Diamond problem, ambiguity in method resolution and object layout).",
    "checkpoints": [
      {
        "id": "java-27-cp-1",
        "label": "Explain why Java limits classes to single inheritance using the Diamond Problem argument"
      },
      {
        "id": "java-27-cp-2",
        "label": "Identify what members are and are not inherited by subclasses"
      },
      {
        "id": "java-27-inheritance-cp-3",
        "label": "Model valid \"is-a\" relationships and reuse superclass functionality appropriately."
      }
    ],
    "practiceExercises": [
      {
        "id": "java-27-ex-1",
        "title": "Model Employee and Manager Hierarchy",
        "difficulty": "Beginner",
        "type": "coding",
        "prompt": "Create a base class Employee (name, salary) and a subclass Manager (bonus, totalCompensation()).",
        "solution": "class Employee {\n    protected String name;\n    protected double salary;\n    public Employee(String n, double s) { this.name = n; this.salary = s; }\n}\n\nclass Manager extends Employee {\n    private double bonus;\n    public Manager(String n, double s, double b) {\n        super(n, s);\n        this.bonus = b;\n    }\n    public double totalCompensation() { return salary + bonus; }\n}\n\npublic class HierarchyTest {\n    public static void main(String[] args) {\n        Manager m = new Manager(\"Alice\", 100000, 25000);\n        System.out.println(\"Total: \" + m.totalCompensation());\n    }\n}",
        "explanation": "Manager extends Employee and augments base state with a bonus calculation."
      },
      {
        "id": "java-27-ex-2",
        "title": "The Diamond Problem in Multiple Inheritance",
        "difficulty": "Intermediate",
        "type": "conceptual",
        "prompt": "Draw and explain the Diamond Problem in C++ and why Java avoided it for classes.",
        "solution": "Suppose Class A has void display(). Classes B and C extend A and each override display(). Class D extends both B and C. If D calls display(), which version should execute? B's or C's? In C++, this causes ambiguity, duplicate state copies, and requires virtual base classes. Java deliberately prevented this by allowing only single class inheritance.",
        "explanation": "Single inheritance eliminates method dispatch ambiguity and duplicate superclass state in memory."
      },
      {
        "id": "java-27-ex-3",
        "title": "Verifying java.lang.Object Methods",
        "difficulty": "Advanced",
        "type": "coding",
        "prompt": "Demonstrate that any bare class `class Empty {}` inherits toString(), hashCode(), and getClass() from java.lang.Object.",
        "solution": "class EmptyClass {}\n\npublic class ObjectRootDemo {\n    public static void main(String[] args) {\n        EmptyClass obj = new EmptyClass();\n        System.out.println(\"Class name from Object: \" + obj.getClass().getSimpleName());\n        System.out.println(\"HashCode from Object is non-zero: \" + (obj.hashCode() != 0));\n        System.out.println(\"Is instance of Object: \" + (obj instanceof Object));\n    }\n}",
        "explanation": "Every class in Java implicitly extends java.lang.Object, inheriting 11 core methods (equals, hashCode, toString, wait, notify, etc.)."
      }
    ],
    "quizQuestions": [
      {
        "id": "java-27-q1",
        "question": "Which of the following members of a superclass are NEVER inherited by a subclass in Java?",
        "options": [
          "Constructors",
          "Public methods",
          "Protected fields",
          "Package-private fields in the same package"
        ],
        "correctOptionIndex": 0,
        "explanation": "Constructors are specific to the class that defines them and are never inherited by subclasses (they can only be invoked via super())."
      },
      {
        "id": "java-27-q2",
        "question": "What is the maximum number of classes that a Java class can directly extend using the `extends` keyword?",
        "options": [
          "0",
          "1",
          "2",
          "Unlimited"
        ],
        "correctOptionIndex": 1,
        "explanation": "Java supports single class inheritance: a class can directly extend at most one superclass."
      }
    ],
    "revisionNotes": [
      "Inheritance establishes an IS-A relationship using the `extends` keyword.",
      "Java classes support single inheritance only, eliminating the Diamond Problem.",
      "All classes in Java implicitly inherit from `java.lang.Object`."
    ]
  },
  {
    "id": "java-28-super-keyword",
    "moduleId": "java-m3",
    "moduleNumber": 3,
    "moduleTitle": "Object-Oriented Programming",
    "topicNumber": 28,
    "title": "The super Keyword: Fields, Methods & super() Constructors",
    "language": "java",
    "level": "Beginner",
    "whyItMatters": "`super` is the bridge between a child class and its parent. Understanding how `super()` constructor invocation links the object hierarchy and how to call overridden parent methods is essential for all OOP design.",
    "explanation": "The `super` keyword in Java is a reference variable used to access members of the immediate superclass. Three primary uses of `super`:\n1. Invoking Superclass Constructors: `super(...)` invokes the parent class constructor.\n   - Must be the very first statement in the child constructor.\n   - If neither `super(...)` nor `this(...)` is written explicitly, the compiler automatically inserts `super();` (calling the parent no-arg constructor).\n   - If the parent class has NO no-arg constructor, the child constructor MUST explicitly invoke a parameterized `super(...)`.\n2. Accessing Hidden Superclass Fields: When a child class declares a field with the same name as a parent field, `super.fieldName` accesses the parent version.\n3. Calling Overridden Superclass Methods: `super.methodName()` allows a child class to extend or reuse parent behavior rather than completely replacing it.",
    "syntaxAndStructure": "public class Child extends Parent {\n    public Child(int data) {\n        super(data); // 1. Must be first statement\n    }\n\n    @Override\n    public void display() {\n        super.display(); // 2. Call parent overridden method\n        System.out.println(\"Child extensions\");\n    }\n}",
    "codeExamples": [
      {
        "title": "Constructor Chaining to Parent via super()",
        "code": "class BaseAccount {\n    private String accountNumber;\n    protected double balance;\n\n    public BaseAccount(String accNo, double initialBalance) {\n        this.accountNumber = accNo;\n        this.balance = initialBalance;\n        System.out.println(\"BaseAccount initialized: \" + accNo);\n    }\n}\n\nclass SavingsAccount extends BaseAccount {\n    private double interestRate;\n\n    public SavingsAccount(String accNo, double balance, double rate) {\n        super(accNo, balance); // Explicit super() call passing arguments to parent\n        this.interestRate = rate;\n        System.out.println(\"SavingsAccount initialized with rate: \" + rate + \"%\");\n    }\n}\n\npublic class SuperConstructorDemo {\n    public static void main(String[] args) {\n        SavingsAccount sa = new SavingsAccount(\"SA-1001\", 5000.0, 4.5);\n        System.out.println(\"Account ready.\");\n    }\n}",
        "expectedOutput": "BaseAccount initialized: SA-1001\nSavingsAccount initialized with rate: 4.5%\nAccount ready.",
        "explanation": "SavingsAccount calls `super(accNo, balance)` as its first statement. The BaseAccount constructor executes completely before the child constructor continues."
      },
      {
        "title": "Calling Overridden Method via super.method()",
        "code": "class TextFormatter {\n    public String format(String text) {\n        return text.trim();\n    }\n}\n\nclass UpperCaseFormatter extends TextFormatter {\n    @Override\n    public String format(String text) {\n        // Calls parent method first to trim, then applies child transformation\n        String clean = super.format(text);\n        return clean.toUpperCase();\n    }\n}\n\npublic class SuperMethodDemo {\n    public static void main(String[] args) {\n        TextFormatter formatter = new UpperCaseFormatter();\n        System.out.println(\"Result: '\" + formatter.format(\"   hello world   \") + \"'\");\n    }\n}",
        "expectedOutput": "Result: 'HELLO WORLD'",
        "explanation": "super.format(text) delegates base whitespace trimming to the parent class before the child transforms it to uppercase."
      }
    ],
    "realWorldApplications": [
      "Hook method extensions in UI components (e.g. `super.paintComponent(g)` in Swing/JavaFX).",
      "Entity lifecycle hooks in JPA/Hibernate (e.g. calling `super.prePersist()` to populate audit timestamps)."
    ],
    "commonMistakes": [
      "Failing to call `super(args)` when the superclass has no default no-arg constructor, resulting in a compile error.",
      "Placing code before `super(...)` in a constructor; it must be the very first statement.",
      "Calling super() constructor explicitly after other executable statements in a subclass constructor."
    ],
    "interviewRelevance": "Frequent placement trap: \"What happens if a parent class only defines a parameterized constructor, and the child class defines a no-arg constructor without calling super(args)?\" (Answer: Compile error).",
    "checkpoints": [
      {
        "id": "java-28-cp-1",
        "label": "Explain how compiler-generated super() operates when omitted"
      },
      {
        "id": "java-28-cp-2",
        "label": "Use super to call parent constructors and parent overridden methods"
      },
      {
        "id": "java-28-super-keyword-cp-3",
        "label": "Access overridden superclass methods and invoke superclass constructors using super."
      }
    ],
    "practiceExercises": [
      {
        "id": "java-28-ex-1",
        "title": "Fix Missing Parent Constructor Error",
        "difficulty": "Beginner",
        "type": "coding",
        "prompt": "Given class Parent { Parent(int x){} }. Fix class Child extends Parent { Child(){} } so it compiles.",
        "solution": "class Parent {\n    Parent(int x) {}\n}\n\nclass Child extends Parent {\n    Child() {\n        super(0); // Explicitly invoke existing parent constructor\n    }\n}\n\npublic class FixSuper {\n    public static void main(String[] args) {\n        new Child();\n        System.out.println(\"Child successfully compiled and instantiated.\");\n    }\n}",
        "explanation": "Because Parent has no no-arg constructor, Child must explicitly pass arguments via super(0)."
      },
      {
        "id": "java-28-ex-2",
        "title": "Access Hidden Parent Field with super",
        "difficulty": "Intermediate",
        "type": "coding",
        "prompt": "Create Parent and Child both declaring `int value = 10` and `int value = 20`. Write a child method that prints both.",
        "solution": "class SuperVal {\n    int value = 10;\n}\n\nclass SubVal extends SuperVal {\n    int value = 20;\n\n    void printBoth() {\n        System.out.println(\"Child value: \" + this.value);\n        System.out.println(\"Parent value: \" + super.value);\n    }\n}\n\npublic class FieldHidingTest {\n    public static void main(String[] args) {\n        new SubVal().printBoth();\n    }\n}",
        "explanation": "Fields in Java do not participate in polymorphism; they are hidden. `super.value` accesses the parent field."
      },
      {
        "id": "java-28-ex-3",
        "title": "Super in Multilevel Inheritance Hierarchy",
        "difficulty": "Advanced",
        "type": "conceptual",
        "prompt": "Can a grandchild class invoke a grandparent method using super.super.method()? Explain Java's syntax rule.",
        "solution": "No, `super.super.method()` is strictly illegal syntax in Java. Java enforces strict encapsulation of inheritance layers; a subclass can only communicate directly with its immediate superclass. Bypassing the immediate parent to call grandparent methods would break the parent's encapsulation contract.",
        "explanation": "Java disallows super.super to preserve encapsulation boundaries between adjacent inheritance tiers."
      }
    ],
    "quizQuestions": [
      {
        "id": "java-28-q1",
        "question": "If a child constructor does NOT explicitly contain `this(...)` or `super(...)`, what does the compiler automatically insert?",
        "options": [
          "Nothing",
          "`super();` calling the parent no-arg constructor as the first statement",
          "`this();` calling the child default constructor",
          "A call to `Object();` directly"
        ],
        "correctOptionIndex": 1,
        "explanation": "The compiler automatically inserts a parameterless `super();` call as the first line of any constructor that lacks explicit chaining."
      },
      {
        "id": "java-28-q2",
        "question": "Can `super.method()` be used inside a static method?",
        "options": [
          "Yes, if the parent method is also static",
          "No, super cannot be referenced from a static context",
          "Only if the class is public",
          "Yes, using ClassName.super.method()"
        ],
        "correctOptionIndex": 1,
        "explanation": "Like `this`, `super` requires an active object instance context and is strictly prohibited in static methods."
      }
    ],
    "revisionNotes": [
      "`super(...)` invokes the immediate parent constructor and must be the first statement.",
      "If not written, the compiler automatically inserts `super();`.",
      "`super.method()` allows a subclass to augment rather than replace parent behavior."
    ]
  },
  {
    "id": "java-29-method-overriding",
    "moduleId": "java-m3",
    "moduleNumber": 3,
    "moduleTitle": "Object-Oriented Programming",
    "topicNumber": 29,
    "title": "Method Overriding, @Override & Covariant Return Types",
    "language": "java",
    "level": "Beginner",
    "whyItMatters": "Method overriding enables dynamic polymorphism, allowing subclasses to provide specific implementations of base abstractions. Mastering the strict overriding rules regarding access modifiers, checked exceptions, and covariant return types is tested in every technical interview.",
    "explanation": "Method Overriding occurs when a subclass provides a specific implementation of a method already declared in its superclass.\nRules for Overriding:\n1. Signature Match: Method name and parameter list must be EXACTLY identical.\n2. Covariant Return Types (Java 5+): The child return type must be the SAME type, or a SUBTYPE (subclass) of the return type declared in the parent method.\n3. Access Modifier Rule: The overriding method CANNOT reduce visibility (cannot make it more restrictive). For example, if parent is `protected`, child can be `protected` or `public`, but NOT `private` or `default`.\n4. Checked Exception Rule: The overriding method CANNOT throw new or broader checked exceptions. It can throw fewer checked exceptions, narrower (subclass) checked exceptions, or any unchecked exceptions.\n5. Methods that CANNOT be Overridden:\n   - `final` methods\n   - `static` methods (they are hidden, not overridden)\n   - `private` methods (not visible to subclass)\n6. The `@Override` Annotation: Informs the compiler of overriding intent; the compiler generates a build error if the signature does not actually override a parent method.",
    "syntaxAndStructure": "class SuperClass {\n    protected Number compute() throws IOException { return 10; }\n}\n\nclass SubClass extends SuperClass {\n    // Valid Override:\n    // 1. Visibility expanded: protected -> public\n    // 2. Covariant return type: Number -> Integer\n    // 3. Exception narrowed: IOException -> FileNotFoundException\n    @Override\n    public Integer compute() throws FileNotFoundException { return 42; }\n}",
    "codeExamples": [
      {
        "title": "Covariant Return Types in Action",
        "code": "class ShapeProducer {\n    public Object produce() {\n        return \"Generic Object\";\n    }\n}\n\nclass CircleProducer extends ShapeProducer {\n    // Covariant return type: String is a subtype of Object\n    @Override\n    public String produce() {\n        return \"Circle Shape\";\n    }\n}\n\npublic class CovariantReturnDemo {\n    public static void main(String[] args) {\n        CircleProducer producer = new CircleProducer();\n        // Caller gets specific String type directly without casting!\n        String shape = producer.produce();\n        System.out.println(\"Produced: \" + shape);\n\n        // Polymorphic reference\n        ShapeProducer base = producer;\n        System.out.println(\"Polymorphic call: \" + base.produce());\n    }\n}",
        "expectedOutput": "Produced: Circle Shape\nPolymorphic call: Circle Shape",
        "explanation": "Covariant return types allow CircleProducer.produce() to return String instead of Object, eliminating explicit type casts for clients."
      },
      {
        "title": "Verifying Access Modifier and Exception Overriding Rules",
        "code": "import java.io.IOException;\n\nclass BaseService {\n    // protected visibility, throws checked IOException\n    protected void execute() throws IOException {\n        System.out.println(\"BaseService executed\");\n    }\n}\n\nclass ChildService extends BaseService {\n    // Valid override:\n    // 1. Widened access from protected to public\n    // 2. Throws no checked exceptions (narrower than IOException)\n    @Override\n    public void execute() {\n        System.out.println(\"ChildService executed without checked exception\");\n    }\n}\n\npublic class OverrideRulesDemo {\n    public static void main(String[] args) {\n        BaseService service = new ChildService();\n        try {\n            service.execute(); // Resolved polymorphically to ChildService\n        } catch (IOException e) {\n            System.out.println(\"Error handled\");\n        }\n    }\n}",
        "expectedOutput": "ChildService executed without checked exception",
        "explanation": "ChildService broadens access (protected to public) and eliminates the checked exception, adhering strictly to Liskov Substitution Principle rules."
      }
    ],
    "realWorldApplications": [
      "Overriding `equals()`, `hashCode()`, and `toString()` in entity and domain model classes.",
      "Framework template methods where base classes define workflows and subclasses implement custom algorithms."
    ],
    "commonMistakes": [
      "Accidentally overloading instead of overriding (e.g. parent has `boolean equals(Object o)` and child writes `boolean equals(Person p)`). Always use `@Override` to catch this!",
      "Trying to throw a broader checked exception (e.g. parent throws `SQLException` and child throws `Exception`), triggering a compile error.",
      "Attempting to override a static method; static methods are hidden, not overridden dynamically."
    ],
    "interviewRelevance": "High-yield interview topic: \"What are covariant return types?\", \"What are the rules for checked exceptions in overriding?\", and \"Can you override a private method?\"",
    "checkpoints": [
      {
        "id": "java-29-cp-1",
        "label": "Understand the 4 overriding rules: signatures, covariant returns, visibility, and exceptions"
      },
      {
        "id": "java-29-cp-2",
        "label": "Use @Override annotation on every overridden method to enforce compile-time verification"
      },
      {
        "id": "java-29-method-overriding-cp-3",
        "label": "Apply @Override annotation and adhere to covariant return type rules."
      }
    ],
    "practiceExercises": [
      {
        "id": "java-29-ex-1",
        "title": "Identify Invalid Exception Overriding",
        "difficulty": "Beginner",
        "type": "conceptual",
        "prompt": "Parent has void run() throws FileNotFoundException. Child overrides void run() throws IOException. Does this compile? Why?",
        "solution": "Compile error. In Java, an overriding method cannot declare broader (more general) checked exceptions than the method it overrides. Because IOException is the superclass of FileNotFoundException, the child method is attempting to throw a broader exception, violating the Liskov Substitution Principle.",
        "explanation": "Overriding methods can only throw narrower, fewer, or identical checked exceptions."
      },
      {
        "id": "java-29-ex-2",
        "title": "Cloneable Covariant Return Type Pattern",
        "difficulty": "Intermediate",
        "type": "coding",
        "prompt": "Implement a clone() method in class Document where the return type is Document instead of Object.",
        "solution": "public class Document implements Cloneable {\n    private String title;\n    public Document(String t) { this.title = t; }\n\n    @Override\n    public Document clone() {\n        try {\n            return (Document) super.clone(); // Covariant return type Document!\n        } catch (CloneNotSupportedException e) {\n            throw new AssertionError();\n        }\n    }\n    public static void main(String[] args) {\n        Document d1 = new Document(\"System Architecture\");\n        Document d2 = d1.clone(); // No cast needed by caller!\n        System.out.println(\"Cloned title: \" + d2.title);\n    }\n}",
        "explanation": "Covariant return type allows clone() to return Document directly rather than Object."
      },
      {
        "id": "java-29-ex-3",
        "title": "Virtual Method Table (vtable) Resolution",
        "difficulty": "Advanced",
        "type": "conceptual",
        "prompt": "How does the JVM execute overridden methods at runtime using the Virtual Method Table (vtable)?",
        "solution": "Each class loaded by the JVM has an associated Virtual Method Table (vtable) containing pointers to the memory addresses of its instance methods. When a subclass overrides a method, its vtable slot for that method index is updated to point to the subclass implementation. At runtime, the JVM opcode `invokevirtual` indexes into the vtable of the actual runtime object, achieving dynamic method dispatch in O(1) time.",
        "explanation": "The vtable enables constant-time dynamic dispatch for virtual method invocation."
      }
    ],
    "quizQuestions": [
      {
        "id": "java-29-q1",
        "question": "Which of the following is TRUE regarding the access modifier of an overriding method?",
        "options": [
          "It must have strictly narrower visibility than the parent method",
          "It can have the same or wider visibility, but cannot reduce visibility",
          "It must always be public",
          "It must have the exact same visibility as the parent method"
        ],
        "correctOptionIndex": 1,
        "explanation": "An overriding method cannot reduce visibility (e.g. protected can become public, but cannot become private or default)."
      },
      {
        "id": "java-29-q2",
        "question": "What is a \"covariant return type\" in Java?",
        "options": [
          "A return type that changes dynamically at runtime",
          "An overriding method returning a subtype of the return type declared in the parent method",
          "A method returning multiple values",
          "A return type that must be void"
        ],
        "correctOptionIndex": 1,
        "explanation": "Covariant return types allow a subclass method to return a more specific subclass of the parent method's return type."
      }
    ],
    "revisionNotes": [
      "Overriding requires identical name and parameters.",
      "Overriding methods can have covariant return types (subtypes) and wider access.",
      "Overriding methods cannot throw new or broader checked exceptions."
    ]
  },
  {
    "id": "java-30-polymorphism",
    "moduleId": "java-m3",
    "moduleNumber": 3,
    "moduleTitle": "Object-Oriented Programming",
    "topicNumber": 30,
    "title": "Polymorphism: Dynamic Method Dispatch & Runtime Binding",
    "language": "java",
    "level": "Beginner",
    "whyItMatters": "Polymorphism (\"many forms\") enables writing extensible, loosely-coupled code where callers interact with abstract parent types while runtime execution automatically delegates to the concrete child implementations.",
    "explanation": "Java supports two forms of polymorphism:\n1. Compile-Time Polymorphism (Static Binding / Early Binding): Method Overloading. The compiler selects the method to execute at compile-time based on static reference types.\n2. Runtime Polymorphism (Dynamic Binding / Late Binding / Dynamic Method Dispatch): Method Overriding.\n   - An overridden method is invoked through a superclass reference variable (e.g. `Animal a = new Dog(); a.makeSound();`).\n   - Java determines which method implementation to execute at RUNTIME based on the actual object type in Heap memory, not the reference type!\n   - All non-static, non-final, non-private methods in Java are virtual by default.\n   - Variables/Fields DO NOT participate in polymorphism! Field access is always resolved at compile time based on the reference type.",
    "syntaxAndStructure": "// Polymorphic assignment:\nSuperType ref = new ConcreteSubType();\n\n// Method call: Resolved dynamically at runtime (Dynamic Dispatch)\nref.execute();\n\n// Field access: Resolved at compile time based on SuperType reference!\nint val = ref.field;",
    "codeExamples": [
      {
        "title": "Dynamic Method Dispatch in Heterogeneous Collections",
        "code": "import java.util.List;\n\nabstract class Notification {\n    abstract void send(String message);\n}\n\nclass EmailNotification extends Notification {\n    void send(String message) {\n        System.out.println(\"Email Sent: \" + message);\n    }\n}\n\nclass SMSNotification extends Notification {\n    void send(String message) {\n        System.out.println(\"SMS Sent: \" + message);\n    }\n}\n\npublic class DynamicDispatchDemo {\n    public static void main(String[] args) {\n        // Heterogeneous collection of Notification abstractions\n        List<Notification> channels = List.of(new EmailNotification(), new SMSNotification());\n\n        // Dynamic dispatch: JVM selects appropriate send() at runtime for each object\n        for (Notification channel : channels) {\n            channel.send(\"Placement Preparation Active!\");\n        }\n    }\n}",
        "expectedOutput": "Email Sent: Placement Preparation Active!\nSMS Sent: Placement Preparation Active!",
        "explanation": "The caller iterates over abstract Notification references. The JVM dynamically dispatches send() to the concrete EmailNotification or SMSNotification at runtime."
      },
      {
        "title": "Demonstrating that Fields Do NOT Participate in Polymorphism",
        "code": "class ParentEntity {\n    String type = \"PARENT\";\n    public String getType() { return type; }\n}\n\nclass ChildEntity extends ParentEntity {\n    String type = \"CHILD\"; // Hides parent field\n    @Override\n    public String getType() { return type; }\n}\n\npublic class FieldPolymorphismDemo {\n    public static void main(String[] args) {\n        ParentEntity entity = new ChildEntity();\n\n        // Field access: resolved by REFERENCE type at compile time!\n        System.out.println(\"Direct field access (entity.type): \" + entity.type);\n\n        // Method access: resolved by OBJECT type at runtime!\n        System.out.println(\"Method call (entity.getType()): \" + entity.getType());\n    }\n}",
        "expectedOutput": "Direct field access (entity.type): PARENT\nMethod call (entity.getType()): CHILD",
        "explanation": "Fields in Java do not exhibit polymorphic behavior; entity.type resolves to ParentEntity.type at compile-time. Methods exhibit polymorphism, so entity.getType() resolves to ChildEntity.getType()."
      }
    ],
    "realWorldApplications": [
      "Plugin architectures and JDBC driver managers (interacting via `java.sql.Connection` regardless of Postgres, MySQL, or Oracle).",
      "Payment gateways (CreditCardPayment, PayPalPayment, UPIPayment implementing `PaymentStrategy`)."
    ],
    "commonMistakes": [
      "Expecting fields to be polymorphic; always use getter methods to access polymorphic properties.",
      "Downcasting without checking `instanceof`, resulting in `ClassCastException` at runtime.",
      "Attempting to downcast an object without checking instanceof, resulting in ClassCastException at runtime."
    ],
    "interviewRelevance": "Universal interview question: \"What is dynamic method dispatch?\", \"Do variables participate in polymorphism?\", and \"Explain static binding vs dynamic binding.\"",
    "checkpoints": [
      {
        "id": "java-30-cp-1",
        "label": "Distinguish compile-time binding (overloading) from runtime dynamic dispatch (overriding)"
      },
      {
        "id": "java-30-cp-2",
        "label": "Prove that methods are polymorphic while fields are resolved by reference type"
      },
      {
        "id": "java-30-polymorphism-cp-3",
        "label": "Explain dynamic method dispatch and virtual method table (vtable) resolution."
      }
    ],
    "practiceExercises": [
      {
        "id": "java-30-ex-1",
        "title": "Payment Processor Polymorphic Dispatch",
        "difficulty": "Beginner",
        "type": "coding",
        "prompt": "Create an interface PaymentMethod with void pay(double amount). Implement CreditCard and UPI classes and process payments polymorphically.",
        "solution": "interface PaymentMethod {\n    void pay(double amount);\n}\nclass CreditCard implements PaymentMethod {\n    public void pay(double amt) { System.out.println(\"Paid \" + amt + \" via Card\"); }\n}\nclass UPI implements PaymentMethod {\n    public void pay(double amt) { System.out.println(\"Paid \" + amt + \" via UPI\"); }\n}\npublic class PaymentTest {\n    public static void process(PaymentMethod pm, double amt) { pm.pay(amt); }\n    public static void main(String[] args) {\n        process(new CreditCard(), 100.0);\n        process(new UPI(), 50.0);\n    }\n}",
        "explanation": "process() accepts any PaymentMethod abstraction without coupling to concrete payment providers."
      },
      {
        "id": "java-30-ex-2",
        "title": "Safe Downcasting with instanceof Pattern Matching",
        "difficulty": "Intermediate",
        "type": "coding",
        "prompt": "Demonstrate safe downcasting using modern Java 16+ pattern matching for instanceof.",
        "solution": "public class PatternMatchingDemo {\n    public static void printLength(Object obj) {\n        // Modern Java 16+ pattern matching: checks AND casts in one step!\n        if (obj instanceof String s) {\n            System.out.println(\"String length: \" + s.length());\n        } else {\n            System.out.println(\"Not a string\");\n        }\n    }\n    public static void main(String[] args) {\n        printLength(\"Hello Placement 2026\");\n        printLength(12345);\n    }\n}",
        "explanation": "`if (obj instanceof String s)` eliminates verbose, error-prone manual casting `String s = (String) obj`."
      },
      {
        "id": "java-30-ex-3",
        "title": "Static vs Dynamic Binding in JVM Opcodes",
        "difficulty": "Advanced",
        "type": "conceptual",
        "prompt": "Differentiate the JVM opcodes invokevirtual, invokestatic, and invokespecial.",
        "solution": "1. `invokestatic`: Invokes static methods; bound at compile time without instance check.\n2. `invokespecial`: Invokes private methods, constructors, and super.method() calls; bound at compile time (no dynamic dispatch needed).\n3. `invokevirtual`: Invokes standard public/protected instance methods; performs dynamic method dispatch at runtime via the vtable.\n4. `invokeinterface`: Invokes interface methods using itable dynamic lookup.",
        "explanation": "The JVM instruction set explicitly differentiates static binding from dynamic dispatch."
      }
    ],
    "quizQuestions": [
      {
        "id": "java-30-q1",
        "question": "Do instance variables in Java participate in runtime polymorphism?",
        "options": [
          "Yes, instance variables are dynamically dispatched like methods",
          "No, field access is resolved at compile time based on the reference type",
          "Only if fields are marked public",
          "Only in Java 21 and above"
        ],
        "correctOptionIndex": 1,
        "explanation": "Fields in Java do not participate in polymorphism. Field accesses are resolved statically at compile time based on the declared reference type."
      },
      {
        "id": "java-30-q2",
        "question": "What JVM opcode is used to execute regular polymorphic instance methods?",
        "options": [
          "invokestatic",
          "invokespecial",
          "invokevirtual",
          "invokedynamic"
        ],
        "correctOptionIndex": 2,
        "explanation": "`invokevirtual` performs dynamic method dispatch using the runtime object's vtable."
      }
    ],
    "revisionNotes": [
      "Runtime polymorphism uses dynamic method dispatch based on the actual object on the heap.",
      "Variables/fields are NOT polymorphic; they are resolved at compile time by reference type.",
      "All non-static, non-final, non-private methods in Java are virtual by default."
    ]
  },
  {
    "id": "java-31-encapsulation",
    "moduleId": "java-m3",
    "moduleNumber": 3,
    "moduleTitle": "Object-Oriented Programming",
    "topicNumber": 31,
    "title": "Encapsulation, Data Hiding & Defensive Copying",
    "language": "java",
    "level": "Beginner",
    "whyItMatters": "Encapsulation bundles data with the methods that operate on it and restricts direct access to internal state. Without defensive copying, even private final fields can be corrupted externally, breaking class invariants.",
    "explanation": "Encapsulation is the OOP principle of bundling data (fields) and code (methods) together into a single unit while restricting direct external access (data hiding).\nCore Practices:\n1. Private Fields: Mark all instance fields `private`.\n2. Validating Accessors: Provide `public` getter and setter methods that validate data integrity (e.g. rejecting negative age).\n3. Class Invariants: Invariants are conditions that must always hold true for an object to be valid. Encapsulation guarantees invariants cannot be bypassed.\n4. Defensive Copying: When getters or constructors handle mutable objects (like `Date`, arrays, or `List`), they MUST copy the object:\n   - On constructor: Copy incoming parameters into internal storage.\n   - On getter: Return a new copy of internal mutable fields.\n   Failure to copy allows external callers to mutate private state directly!",
    "syntaxAndStructure": "public class SafePerson {\n    private final String name;\n    private final Date birthDate; // Mutable object\n\n    public SafePerson(String name, Date birthDate) {\n        this.name = name;\n        this.birthDate = new Date(birthDate.getTime()); // Defensive Copy IN\n    }\n\n    public Date getBirthDate() {\n        return new Date(this.birthDate.getTime()); // Defensive Copy OUT\n    }\n}",
    "codeExamples": [
      {
        "title": "Broken Encapsulation vs Defensive Copying Solution",
        "code": "import java.util.Date;\n\n// Defective Class: Leaks mutable references\nclass VulnerableAccount {\n    private final Date creationDate;\n    public VulnerableAccount(Date d) { this.creationDate = d; }\n    public Date getCreationDate() { return this.creationDate; } // Leaks internal pointer!\n}\n\n// Secure Encapsulated Class: Defensive Copying\nclass SecureAccount {\n    private final Date creationDate;\n    public SecureAccount(Date d) { this.creationDate = new Date(d.getTime()); } // Defensive IN\n    public Date getCreationDate() { return new Date(this.creationDate.getTime()); } // Defensive OUT\n}\n\npublic class DefensiveCopyingDemo {\n    public static void main(String[] args) {\n        Date original = new Date(1000000000L);\n        VulnerableAccount vuln = new VulnerableAccount(original);\n        // External mutation corrupts internal state!\n        vuln.getCreationDate().setTime(0);\n        System.out.println(\"Vulnerable date corrupted: \" + (vuln.getCreationDate().getTime() == 0));\n\n        SecureAccount secure = new SecureAccount(original);\n        secure.getCreationDate().setTime(0);\n        System.out.println(\"Secure date preserved: \" + (secure.getCreationDate().getTime() == 1000000000L));\n    }\n}",
        "expectedOutput": "Vulnerable date corrupted: true\nSecure date preserved: true",
        "explanation": "Returning an internal mutable reference directly allows external code to mutate private final fields. Returning a defensive copy isolates internal state."
      },
      {
        "title": "Validating Setters Enforcing Invariants",
        "code": "public class Thermostat {\n    private double temperatureCelsius = 20.0; // Invariant: must be between -50 and 100\n\n    public void setTemperature(double temp) {\n        if (temp < -50.0 || temp > 100.0) {\n            throw new IllegalArgumentException(\"Temperature out of safe operating limits: \" + temp);\n        }\n        this.temperatureCelsius = temp;\n    }\n\n    public double getTemperature() { return this.temperatureCelsius; }\n\n    public static void main(String[] args) {\n        Thermostat t = new Thermostat();\n        t.setTemperature(25.5);\n        System.out.println(\"Current temp: \" + t.getTemperature());\n\n        try {\n            t.setTemperature(150.0); // Violates invariant\n        } catch (IllegalArgumentException e) {\n            System.out.println(\"Validation caught: \" + e.getMessage());\n        }\n    }\n}",
        "expectedOutput": "Current temp: 25.5\nValidation caught: Temperature out of safe operating limits: 150.0",
        "explanation": "Encapsulation gates all state modifications through validated setter methods, preserving domain integrity."
      }
    ],
    "realWorldApplications": [
      "Protecting domain models in DDD (Domain-Driven Design) where business rules must never be violated.",
      "Security-critical credentials, token stores, and payment calculations in banking APIs."
    ],
    "commonMistakes": [
      "Returning raw mutable collections from getters (e.g. returning `this.items` instead of `Collections.unmodifiableList(items)`).",
      "Creating mindless getters and setters for every private field without considering whether fields should be read-only or mutable.",
      "Returning direct references to mutable internal collections or arrays from getter methods instead of defensive copies."
    ],
    "interviewRelevance": "Universal interview topic: \"What is defensive copying?\", \"Why are getters and setters better than public fields?\", and \"Explain how encapsulation supports class invariants.\"",
    "checkpoints": [
      {
        "id": "java-31-cp-1",
        "label": "Implement defensive copying on both constructors and getters for mutable reference types"
      },
      {
        "id": "java-31-cp-2",
        "label": "Enforce class invariants through validated setter methods and constructor checks"
      },
      {
        "id": "java-31-encapsulation-cp-3",
        "label": "Enforce private fields and defensive copying to protect object invariants."
      }
    ],
    "practiceExercises": [
      {
        "id": "java-31-ex-1",
        "title": "Immutable Array Encapsulation",
        "difficulty": "Beginner",
        "type": "coding",
        "prompt": "Write a class GradeBook holding int[] scores that defensively copies the array in the constructor and getter.",
        "solution": "public class GradeBook {\n    private final int[] scores;\n    public GradeBook(int[] s) {\n        this.scores = s.clone(); // Defensive copy IN\n    }\n    public int[] getScores() {\n        return this.scores.clone(); // Defensive copy OUT\n    }\n    public static void main(String[] args) {\n        int[] raw = { 85, 90, 95 };\n        GradeBook gb = new GradeBook(raw);\n        raw[0] = 0; // External mutation attempt\n        System.out.println(\"Gradebook score 0 preserved: \" + (gb.getScores()[0] == 85));\n    }\n}",
        "explanation": "Using .clone() creates an independent array copy, preventing external array mutations from corrupting internal scores."
      },
      {
        "id": "java-31-ex-2",
        "title": "Unmodifiable Collection Getter",
        "difficulty": "Intermediate",
        "type": "coding",
        "prompt": "Encapsulate a List<String> permissions field so callers can read it but calling .add() on the returned list throws an exception.",
        "solution": "import java.util.*;\n\npublic class UserRole {\n    private final List<String> permissions = new ArrayList<>();\n    public void addPermission(String p) { permissions.add(p); }\n\n    public List<String> getPermissions() {\n        return Collections.unmodifiableList(this.permissions);\n    }\n    public static void main(String[] args) {\n        UserRole r = new UserRole();\n        r.addPermission(\"READ\");\n        List<String> perms = r.getPermissions();\n        try {\n            perms.add(\"WRITE\"); // Throws UnsupportedOperationException\n        } catch (UnsupportedOperationException e) {\n            System.out.println(\"Unauthorized list mutation blocked successfully.\");\n        }\n    }\n}",
        "explanation": "Collections.unmodifiableList() wraps the backing list in a read-only view that blocks mutator methods."
      },
      {
        "id": "java-31-ex-3",
        "title": "Modern Java Record Immutability",
        "difficulty": "Advanced",
        "type": "conceptual",
        "prompt": "Why do Java 14+ Records NOT automatically protect against mutable component references like List or Date?",
        "solution": "Java Records automatically make fields `private final` and generate canonical accessors. However, the default canonical constructor and accessor perform shallow assignment (`this.list = list; return this.list;`). If a record component is a mutable object (like ArrayList), external callers can still mutate the record's internal contents. To achieve true immutability with records, you must implement a compact constructor and override accessors to perform defensive copying or use immutable collections like `List.copyOf()`.",
        "explanation": "Records enforce shallow reference immutability, requiring manual defensive copies for mutable member types."
      }
    ],
    "quizQuestions": [
      {
        "id": "java-31-q1",
        "question": "What is the primary danger of returning a reference to an internal mutable Date object directly from a getter?",
        "options": [
          "It causes a NullPointerException",
          "External callers can mutate the internal state of the object without using setters, breaking encapsulation",
          "It prevents the Garbage Collector from freeing the object",
          "It triggers a ClassCastException"
        ],
        "correctOptionIndex": 1,
        "explanation": "Returning internal mutable references leaks control of private state, allowing callers to alter values from outside."
      },
      {
        "id": "java-31-q2",
        "question": "Which method should be used to protect a private List field from being modified by clients who call its getter?",
        "options": [
          "list.lock()",
          "Collections.unmodifiableList(list)",
          "list.setFinal()",
          "list.asStatic()"
        ],
        "correctOptionIndex": 1,
        "explanation": "Collections.unmodifiableList() provides a read-only view that throws UnsupportedOperationException on add/remove."
      }
    ],
    "revisionNotes": [
      "Encapsulation combines data and behavior while hiding internal implementation details.",
      "Always use defensive copying on mutable objects (Date, arrays, collections) in constructors and getters.",
      "Use Collections.unmodifiableList() to expose read-only collection access."
    ]
  },
  {
    "id": "java-32-abstraction",
    "moduleId": "java-m3",
    "moduleNumber": 3,
    "moduleTitle": "Object-Oriented Programming",
    "topicNumber": 32,
    "title": "Abstraction: Concepts, Contract Definition & Hiding Complexity",
    "language": "java",
    "level": "Beginner",
    "whyItMatters": "Abstraction separates \"what an object does\" from \"how it does it\". It enables building large, scalable systems where client code interacts with high-level contracts rather than low-level implementation details.",
    "explanation": "Abstraction is the OOP principle of exposing essential features while hiding implementation details and background complexity.\nKey Principles:\n1. What vs How: Callers know WHAT methods an abstraction provides (e.g. `list.add()`), but do NOT need to know HOW it is stored internally (whether in a dynamic array or doubly-linked list).\n2. Abstraction Mechanisms in Java:\n   - Abstract Classes (0% to 100% abstraction): Partial abstractions that can share state and concrete template code.\n   - Interfaces (100% pure contract abstraction, prior to default methods): Pure architectural contracts defining capabilities.\n3. Loose Coupling: Callers depend on the abstract contract (e.g., `Map<K, V> map = new HashMap<>()`). If the underlying implementation is later swapped with `ConcurrentHashMap` or `TreeMap`, caller code remains completely unchanged.",
    "syntaxAndStructure": "// Abstract Contract:\npublic interface DatabaseConnector {\n    void connect();\n    void executeQuery(String sql);\n}\n\n// Caller depends on the abstraction, not the concrete vendor:\npublic class Service {\n    private final DatabaseConnector connector;\n    public Service(DatabaseConnector c) { this.connector = c; }\n}",
    "codeExamples": [
      {
        "title": "Program to an Interface, Not an Implementation",
        "code": "import java.util.ArrayList;\nimport java.util.LinkedList;\nimport java.util.List;\n\npublic class ProgramToInterfaceDemo {\n    // Method accepts the List abstraction, decoupling it from ArrayList or LinkedList\n    public static int computeTotal(List<Integer> numbers) {\n        int sum = 0;\n        for (int n : numbers) sum += n;\n        return sum;\n    }\n\n    public static void main(String[] args) {\n        // Concrete ArrayList\n        List<Integer> arrayList = new ArrayList<>(List.of(10, 20, 30));\n        // Concrete LinkedList\n        List<Integer> linkedList = new LinkedList<>(List.of(40, 50, 60));\n\n        // computeTotal works seamlessly with any List implementation!\n        System.out.println(\"ArrayList sum: \" + computeTotal(arrayList));\n        System.out.println(\"LinkedList sum: \" + computeTotal(linkedList));\n    }\n}",
        "expectedOutput": "ArrayList sum: 60\nLinkedList sum: 150",
        "explanation": "By programming to the List abstraction, computeTotal() operates uniformly on both ArrayList and LinkedList without modification."
      },
      {
        "title": "Hiding Complexity Behind an Abstraction",
        "code": "interface CloudStorage {\n    void uploadFile(String fileName);\n}\n\nclass AWSStorage implements CloudStorage {\n    public void uploadFile(String fileName) {\n        System.out.println(\"Uploading \" + fileName + \" to Amazon S3 Bucket via AWS SDK.\");\n    }\n}\n\nclass GCPStorage implements CloudStorage {\n    public void uploadFile(String fileName) {\n        System.out.println(\"Uploading \" + fileName + \" to Google Cloud Storage via gRPC.\");\n    }\n}\n\npublic class CloudAbstractionDemo {\n    public static void main(String[] args) {\n        CloudStorage storage = new AWSStorage();\n        storage.uploadFile(\"resume.pdf\");\n\n        // Swap to GCP without changing client code\n        storage = new GCPStorage();\n        storage.uploadFile(\"resume.pdf\");\n    }\n}",
        "expectedOutput": "Uploading resume.pdf to Amazon S3 Bucket via AWS SDK.\nUploading resume.pdf to Google Cloud Storage via gRPC.",
        "explanation": "Client code relies on CloudStorage. Complex cloud-specific authentication and protocols remain hidden inside concrete classes."
      }
    ],
    "realWorldApplications": [
      "JDBC API (`java.sql.Connection`, `Statement`, `ResultSet`) allowing Java code to connect to any database vendor.",
      "Spring Framework dependency injection where services depend on repository interfaces."
    ],
    "commonMistakes": [
      "Declaring specific concrete types in method parameters (e.g. `void process(ArrayList<T> list)`) instead of the abstraction (`List<T>`), restricting caller flexibility.",
      "Confusing abstraction (hiding complexity by modeling interfaces) with encapsulation (hiding internal state with private accessors).",
      "Exposing internal database or networking implementation details in abstract service contracts."
    ],
    "interviewRelevance": "Core architectural question: \"What does 'Program to an interface, not an implementation' mean?\" and \"Difference between abstraction and encapsulation.\"",
    "checkpoints": [
      {
        "id": "java-32-cp-1",
        "label": "Distinguish abstraction (what it does) from implementation (how it does it)"
      },
      {
        "id": "java-32-cp-2",
        "label": "Apply \"Program to an interface\" across API design and method parameter lists"
      },
      {
        "id": "java-32-abstraction-cp-3",
        "label": "Design clean interfaces and abstract contracts that separate what from how."
      }
    ],
    "practiceExercises": [
      {
        "id": "java-32-ex-1",
        "title": "Refactor Concrete Method to Abstraction",
        "difficulty": "Beginner",
        "type": "coding",
        "prompt": "Refactor void print(HashSet<String> set) to accept the most general appropriate collection interface.",
        "solution": "import java.util.Collection;\nimport java.util.List;\nimport java.util.Set;\n\npublic class RefactorToAbstraction {\n    // Generalized to Collection<String> (accepts Set, List, Queue, etc.)\n    public static void print(Collection<String> items) {\n        for (String s : items) System.out.print(s + \" \");\n        System.out.println();\n    }\n    public static void main(String[] args) {\n        print(Set.of(\"A\", \"B\"));\n        print(List.of(\"X\", \"Y\", \"Z\"));\n    }\n}",
        "explanation": "Widening the parameter type from HashSet to Collection allows passing sets, lists, and any iterable collection."
      },
      {
        "id": "java-32-ex-2",
        "title": "Notification Service Factory Abstraction",
        "difficulty": "Intermediate",
        "type": "coding",
        "prompt": "Create an abstraction MessageSender and a factory that returns an SMS or Email implementation based on a channel string.",
        "solution": "interface MessageSender { void send(String msg); }\nclass EmailSender implements MessageSender {\n    public void send(String msg) { System.out.println(\"Email: \" + msg); }\n}\nclass SMSSender implements MessageSender {\n    public void send(String msg) { System.out.println(\"SMS: \" + msg); }\n}\nclass SenderFactory {\n    public static MessageSender getSender(String channel) {\n        if (\"sms\".equalsIgnoreCase(channel)) return new SMSSender();\n        return new EmailSender();\n    }\n}\npublic class FactoryTest {\n    public static void main(String[] args) {\n        SenderFactory.getSender(\"sms\").send(\"OTP: 1234\");\n    }\n}",
        "explanation": "The factory encapsulates instantiation, isolating the client from concrete class references."
      },
      {
        "id": "java-32-ex-3",
        "title": "Abstraction vs Encapsulation Matrix",
        "difficulty": "Advanced",
        "type": "conceptual",
        "prompt": "Compare Abstraction vs Encapsulation across: 1) Focus, 2) Implementation mechanism, 3) Primary benefit.",
        "solution": "1. Focus: Abstraction focuses on the outside view (WHAT an entity does); Encapsulation focuses on the inside view (HOW internal state is protected).\n2. Mechanism: Abstraction uses abstract classes and interfaces; Encapsulation uses private/protected access modifiers and getter/setter methods.\n3. Primary Benefit: Abstraction enables loose coupling and modular design; Encapsulation ensures data integrity, safety, and invariant enforcement.",
        "explanation": "Abstraction hides complexity via contracts; Encapsulation hides internal data via access boundaries."
      }
    ],
    "quizQuestions": [
      {
        "id": "java-32-q1",
        "question": "What is the primary benefit of the design rule \"Program to an interface, not an implementation\"?",
        "options": [
          "It compiles the code to C binaries",
          "It decouples client code from concrete classes, allowing implementations to be swapped without modifying callers",
          "It automatically enables multi-threading",
          "It reduces memory usage to zero"
        ],
        "correctOptionIndex": 1,
        "explanation": "Programming to interfaces ensures that client code depends only on contracts, maximizing flexibility and testability."
      },
      {
        "id": "java-32-q2",
        "question": "Which of the following is an example of Abstraction in Java?",
        "options": [
          "Marking a variable private",
          "Using the List interface instead of ArrayList in a method signature",
          "Writing a try-catch block",
          "Creating a while loop"
        ],
        "correctOptionIndex": 1,
        "explanation": "Using the List interface abstracts away the underlying storage mechanism (array vs linked nodes) from the caller."
      }
    ],
    "revisionNotes": [
      "Abstraction hides implementation complexity and focuses on essential capabilities.",
      "Always program to interfaces (e.g. `List<T> list = new ArrayList<>()`).",
      "Abstraction separates \"what\" an object does from \"how\" it does it."
    ]
  },
  {
    "id": "java-33-abstract-classes",
    "moduleId": "java-m3",
    "moduleNumber": 3,
    "moduleTitle": "Object-Oriented Programming",
    "topicNumber": 33,
    "title": "Abstract Classes, Abstract Methods & Partial Implementation",
    "language": "java",
    "level": "Beginner",
    "whyItMatters": "Abstract classes provide shared code, common state, and template method design patterns across related classes. Understanding when to use an abstract class versus an interface is a foundational interview topic.",
    "explanation": "An `abstract class` is a class declared with the `abstract` keyword that cannot be instantiated directly with `new`.\nKey Characteristics:\n1. Abstract Methods: Declared without a body (`abstract void calculate();`). Any non-abstract concrete subclass MUST provide an implementation for all inherited abstract methods.\n2. Partial Implementation: Unlike pure interfaces, an abstract class can contain concrete methods, stateful instance fields (`private int id`), constructors, and static members.\n3. Constructors in Abstract Classes: Although an abstract class cannot be instantiated directly, it CAN and SHOULD have constructors! These constructors are called via `super()` from subclass constructors to initialize inherited state.\n4. Template Method Pattern: Abstract classes often implement a concrete master algorithm method that delegates specific steps to abstract hook methods implemented by subclasses.\n5. Modifiers: An abstract method cannot be `private` or `final` (because it must be overridden), nor `static`.",
    "syntaxAndStructure": "public abstract class Animal {\n    private String name; // Instance state\n\n    public Animal(String name) {\n        this.name = name;\n    }\n\n    // Concrete method (shared behavior)\n    public void sleep() { System.out.println(name + \" is sleeping\"); }\n\n    // Abstract method (mandatory subclass behavior)\n    public abstract void makeSound();\n}",
    "codeExamples": [
      {
        "title": "Template Method Pattern Using Abstract Class",
        "code": "abstract class DataMiner {\n    // Template method defining the overall skeleton algorithm\n    public final void mine(String path) {\n        openFile(path);\n        extractData();\n        parseData();\n        closeFile();\n    }\n\n    protected void openFile(String path) {\n        System.out.println(\"Opening file: \" + path);\n    }\n\n    protected void closeFile() {\n        System.out.println(\"File closed cleanly.\");\n    }\n\n    // Abstract steps delegated to concrete subclass implementations\n    protected abstract void extractData();\n    protected abstract void parseData();\n}\n\nclass PDFDataMiner extends DataMiner {\n    @Override\n    protected void extractData() {\n        System.out.println(\"Extracting raw PDF bytecode streams.\");\n    }\n\n    @Override\n    protected void parseData() {\n        System.out.println(\"Parsing PDF font tables and text blocks.\");\n    }\n}\n\npublic class AbstractTemplateDemo {\n    public static void main(String[] args) {\n        DataMiner miner = new PDFDataMiner();\n        miner.mine(\"placement_guide.pdf\");\n    }\n}",
        "expectedOutput": "Opening file: placement_guide.pdf\nExtracting raw PDF bytecode streams.\nParsing PDF font tables and text blocks.\nFile closed cleanly.",
        "explanation": "The abstract class defines the invariant skeleton in mine() (marked final to prevent alteration) while delegating variant steps to abstract methods."
      },
      {
        "title": "Constructors and State in Abstract Classes",
        "code": "abstract class BaseEntity {\n    private final String id;\n    private final long createdAt;\n\n    public BaseEntity(String id) {\n        this.id = id;\n        this.createdAt = System.currentTimeMillis();\n    }\n\n    public String getId() { return id; }\n    public abstract void validate();\n}\n\nclass UserEntity extends BaseEntity {\n    private String email;\n\n    public UserEntity(String id, String email) {\n        super(id); // Calling abstract parent constructor\n        this.email = email;\n    }\n\n    @Override\n    public void validate() {\n        System.out.println(\"Validating user: \" + getId() + \", Email: \" + email);\n    }\n}\n\npublic class AbstractConstructorDemo {\n    public static void main(String[] args) {\n        UserEntity user = new UserEntity(\"USR-42\", \"candidate@ak67.com\");\n        user.validate();\n    }\n}",
        "expectedOutput": "Validating user: USR-42, Email: candidate@ak67.com",
        "explanation": "Abstract classes safely manage common base state (like id and timestamps) through constructors invoked via super(id)."
      }
    ],
    "realWorldApplications": [
      "Java collections skeletal implementations (`AbstractList`, `AbstractMap`, `AbstractSet`) that minimize work when writing custom collections.",
      "HTTP servlet hierarchy (`HttpServlet` extending `GenericServlet`)."
    ],
    "commonMistakes": [
      "Declaring an abstract method as `private` or `final`; abstract methods exist solely to be overridden by subclasses.",
      "Trying to instantiate an abstract class directly using `new MyAbstractClass()`, which causes a compile error.",
      "Attempting to instantiate an abstract class directly using the new keyword."
    ],
    "interviewRelevance": "Universal interview question: \"Can an abstract class have a constructor if it cannot be instantiated?\", \"Can an abstract class have zero abstract methods?\", and \"Abstract Class vs Interface.\"",
    "checkpoints": [
      {
        "id": "java-33-cp-1",
        "label": "Explain the role of constructors in abstract classes invoked via super()"
      },
      {
        "id": "java-33-cp-2",
        "label": "Implement the Template Method design pattern using abstract base classes"
      },
      {
        "id": "java-33-abstract-classes-cp-3",
        "label": "Use abstract classes as template base classes with shared mutable state."
      }
    ],
    "practiceExercises": [
      {
        "id": "java-33-ex-1",
        "title": "Abstract Class Without Abstract Methods",
        "difficulty": "Beginner",
        "type": "conceptual",
        "prompt": "Can an abstract class contain ZERO abstract methods? Why would a software architect declare such a class?",
        "solution": "Yes, an abstract class can contain zero abstract methods. A developer declares a class abstract without abstract methods to prevent direct instantiation with `new`, signaling that the class is an incomplete base concept intended only to be extended by concrete subclasses.",
        "explanation": "Enforces inheritance without mandating any abstract method overrides."
      },
      {
        "id": "java-33-ex-2",
        "title": "Shape Hierarchy with Abstract Area",
        "difficulty": "Intermediate",
        "type": "coding",
        "prompt": "Create an abstract class Shape with abstract double area() and concrete Circle and Rectangle subclasses.",
        "solution": "abstract class Shape {\n    abstract double area();\n}\nclass Circle extends Shape {\n    double r;\n    Circle(double r) { this.r = r; }\n    double area() { return Math.PI * r * r; }\n}\nclass Rectangle extends Shape {\n    double w, h;\n    Rectangle(double w, double h) { this.w = w; this.h = h; }\n    double area() { return w * h; }\n}\npublic class ShapeTest {\n    public static void main(String[] args) {\n        Shape s = new Rectangle(4, 5);\n        System.out.println(\"Area: \" + s.area());\n    }\n}",
        "explanation": "Each subclass implements the abstract area() formula according to its geometry."
      },
      {
        "id": "java-33-ex-3",
        "title": "Dissecting AbstractList Implementation",
        "difficulty": "Advanced",
        "type": "conceptual",
        "prompt": "In the Java standard library, why does ArrayList extend AbstractList instead of implementing List directly from scratch?",
        "solution": "`AbstractList` provides default concrete implementations for common List operations (e.g., `indexOf()`, `equals()`, `hashCode()`, `iterator()`, `subList()`) on top of minimal primitives (`get(int)` and `size()`). By extending AbstractList, `ArrayList` inherits dozens of complex methods for free without writing boilerplate code from scratch.",
        "explanation": "Skeletal implementations in abstract classes drastically reduce boilerplate for custom collection classes."
      }
    ],
    "quizQuestions": [
      {
        "id": "java-33-q1",
        "question": "Can an abstract class in Java have constructors?",
        "options": [
          "No, because abstract classes cannot be instantiated with new",
          "Yes, to initialize instance fields when invoked by subclass constructors via super()",
          "Only if the constructors are public",
          "Only if all methods in the class are abstract"
        ],
        "correctOptionIndex": 1,
        "explanation": "Abstract classes have constructors to initialize inherited fields when subclasses invoke `super(...)`."
      },
      {
        "id": "java-33-q2",
        "question": "Which combinations of modifiers are ILLEGAL for an abstract method?",
        "options": [
          "public abstract",
          "protected abstract",
          "private abstract and final abstract",
          "abstract with throws clause"
        ],
        "correctOptionIndex": 2,
        "explanation": "`private` methods cannot be seen by subclasses, and `final` methods cannot be overridden. Both contradict the requirement that abstract methods must be overridden."
      }
    ],
    "revisionNotes": [
      "Abstract classes cannot be instantiated directly with `new`.",
      "Abstract classes can hold state, concrete methods, and constructors.",
      "Abstract methods cannot be private, final, or static."
    ]
  },
  {
    "id": "java-34-interfaces",
    "moduleId": "java-m3",
    "moduleNumber": 3,
    "moduleTitle": "Object-Oriented Programming",
    "topicNumber": 34,
    "title": "Interfaces, Contract Definition & Multiple Inheritance of Type",
    "language": "java",
    "level": "Beginner",
    "whyItMatters": "Interfaces define 100% pure contracts in Java and provide multiple inheritance of type. Modern frameworks (Spring, Micronaut, Quarkus) are architected entirely around interfaces for loose coupling and mock testing.",
    "explanation": "An `interface` in Java is a reference type that specifies a contract of methods that implementing classes must fulfill.\nKey Characteristics:\n1. Methods: By default, all methods in an interface are implicitly `public abstract` (prior to Java 8 default/static methods).\n2. Fields: All variables declared in an interface are implicitly `public static final` (constants). Interfaces cannot maintain instance state.\n3. Multiple Inheritance of Type: While a class can extend only one superclass, it can implement ANY NUMBER of interfaces (`class C implements A, B, C`). This allows an object to have multiple roles (e.g. `ArrayList` implements `List`, `RandomAccess`, `Cloneable`, `Serializable`).\n4. Interface Inheritance: An interface can extend one or more other interfaces using the `extends` keyword (`interface C extends A, B`).\n5. Marker Interfaces: Interfaces with zero methods (e.g. `Serializable`, `Cloneable`) used as runtime type tags.",
    "syntaxAndStructure": "// Interface contract:\npublic interface Drivable {\n    // Implicitly public static final:\n    int MAX_SPEED = 120;\n\n    // Implicitly public abstract:\n    void accelerate();\n    void brake();\n}\n\n// Implementation:\npublic class SportsCar implements Drivable, Cloneable {\n    @Override\n    public void accelerate() { System.out.println(\"Accelerating fast\"); }\n    @Override\n    public void brake() { System.out.println(\"Braking safely\"); }\n}",
    "codeExamples": [
      {
        "title": "Multiple Interface Implementation for Multiple Roles",
        "code": "interface Printable {\n    void print();\n}\n\ninterface Exportable {\n    void exportToPdf(String filename);\n}\n\n// A single class fulfilling multiple role contracts\nclass ReportDocument implements Printable, Exportable {\n    private String title;\n\n    public ReportDocument(String t) { this.title = t; }\n\n    @Override\n    public void print() {\n        System.out.println(\"Printing document: \" + title);\n    }\n\n    @Override\n    public void exportToPdf(String filename) {\n        System.out.println(\"Exporting '\" + title + \"' to \" + filename);\n    }\n}\n\npublic class MultipleInterfaceDemo {\n    public static void main(String[] args) {\n        ReportDocument doc = new ReportDocument(\"Annual Performance\");\n\n        // Object can be treated as Printable or Exportable\n        Printable p = doc;\n        p.print();\n\n        Exportable e = doc;\n        e.exportToPdf(\"perf_2026.pdf\");\n    }\n}",
        "expectedOutput": "Printing document: Annual Performance\nExporting 'Annual Performance' to perf_2026.pdf",
        "explanation": "ReportDocument satisfies two distinct capability contracts simultaneously, demonstrating multiple inheritance of type in Java."
      },
      {
        "title": "Interface Constants and Interface Inheritance",
        "code": "interface SuperA {\n    void methodA();\n}\n\ninterface SuperB {\n    void methodB();\n}\n\n// Interface extending multiple interfaces\ninterface CombinedInterface extends SuperA, SuperB {\n    int PROTOCOL_VERSION = 2; // public static final\n    void methodC();\n}\n\nclass SystemDriver implements CombinedInterface {\n    public void methodA() { System.out.println(\"A\"); }\n    public void methodB() { System.out.println(\"B\"); }\n    public void methodC() { System.out.println(\"C, Version: \" + PROTOCOL_VERSION); }\n}\n\npublic class InterfaceInheritanceDemo {\n    public static void main(String[] args) {\n        CombinedInterface driver = new SystemDriver();\n        driver.methodA();\n        driver.methodB();\n        driver.methodC();\n    }\n}",
        "expectedOutput": "A\nB\nC, Version: 2",
        "explanation": "Interfaces use the extends keyword to inherit from multiple parent interfaces simultaneously."
      }
    ],
    "realWorldApplications": [
      "Plugin architectures where third-party integrations implement vendor capability interfaces.",
      "Unit testing where concrete database repositories are mocked via repository interfaces using Mockito."
    ],
    "commonMistakes": [
      "Declaring fields in interfaces and expecting them to be instance variables; all interface fields are compile-time static constants.",
      "Reducing the visibility of an interface method in an implementation class (e.g. omitting `public` causes a compiler error because interface methods are public by default).",
      "Attempting to declare non-public, non-static instance fields in an interface."
    ],
    "interviewRelevance": "Universal interview question: \"What is the difference between an abstract class and an interface?\", \"Can an interface extend multiple interfaces?\", and \"What are marker interfaces?\"",
    "checkpoints": [
      {
        "id": "java-34-cp-1",
        "label": "Explain how interfaces enable multiple inheritance of type without the Diamond Problem"
      },
      {
        "id": "java-34-cp-2",
        "label": "Know the implicit modifiers: fields are public static final; methods are public abstract"
      },
      {
        "id": "java-34-interfaces-cp-3",
        "label": "Define capability contracts and implement multiple interfaces on classes."
      }
    ],
    "practiceExercises": [
      {
        "id": "java-34-ex-1",
        "title": "Marker Interface Implementation",
        "difficulty": "Beginner",
        "type": "coding",
        "prompt": "Create a custom marker interface Deletable with no methods and write a method delete(Object o) that checks instanceof Deletable.",
        "solution": "interface Deletable {} // Marker interface\n\nclass TempFile implements Deletable {}\nclass PermanentRecord {}\n\npublic class MarkerDemo {\n    public static void delete(Object o) {\n        if (o instanceof Deletable) {\n            System.out.println(\"Item successfully deleted.\");\n        } else {\n            System.out.println(\"Rejection: Item is not Deletable.\");\n        }\n    }\n    public static void main(String[] args) {\n        delete(new TempFile());\n        delete(new PermanentRecord());\n    }\n}",
        "explanation": "Marker interfaces convey metadata type tags to runtime algorithms via instanceof checks."
      },
      {
        "id": "java-34-ex-2",
        "title": "Compare Abstract Class vs Interface",
        "difficulty": "Intermediate",
        "type": "conceptual",
        "prompt": "Give three decisive technical criteria when choosing an Abstract Class over an Interface in modern Java.",
        "solution": "1. Shared Non-Static State: Choose an Abstract Class if subclasses need to inherit mutable instance fields.\n2. Constructors: Choose an Abstract Class if the base hierarchy requires constructor initialization arguments.\n3. Strong IS-A Relationship with Code Reuse: Choose an Abstract Class for closely related classes sharing extensive template code (e.g. AbstractList). Choose an Interface to define cross-cutting capabilities across unrelated classes (e.g. Comparable).",
        "explanation": "Interfaces define capabilities across unrelated types; abstract classes define stateful shared identity."
      },
      {
        "id": "java-34-ex-3",
        "title": "Constant Interface Anti-Pattern",
        "difficulty": "Advanced",
        "type": "conceptual",
        "prompt": "Why is the \"Constant Interface\" pattern (an interface with only constants implemented by classes) considered a major anti-pattern in Effective Java?",
        "solution": "The Constant Interface pattern pollutes the public API of implementing classes and their subclasses with implementation details. If a class later no longer needs the constants, it cannot remove the interface without breaking binary backward compatibility. Furthermore, it causes namespace confusion. The recommended alternative is to use Enums or a non-instantiable final utility class with a private constructor.",
        "explanation": "Effective Java Item 22: Use interfaces only to define types, never to export constants."
      }
    ],
    "quizQuestions": [
      {
        "id": "java-34-q1",
        "question": "What are the implicit modifiers for variables declared inside a Java interface?",
        "options": [
          "private final",
          "public static final",
          "protected static",
          "volatile"
        ],
        "correctOptionIndex": 1,
        "explanation": "All variables declared in an interface are implicitly `public static final` (compile-time constants)."
      },
      {
        "id": "java-34-q2",
        "question": "Can an interface extend multiple other interfaces using the `extends` keyword?",
        "options": [
          "No, Java prohibits multiple inheritance everywhere",
          "Yes, an interface can extend multiple interfaces simultaneously",
          "Only if the parent interfaces have no methods",
          "Only in abstract interfaces"
        ],
        "correctOptionIndex": 1,
        "explanation": "Interfaces in Java support multiple interface inheritance (e.g. `interface C extends A, B`)."
      }
    ],
    "revisionNotes": [
      "Interfaces specify pure contracts; classes implement them to guarantee capabilities.",
      "A class can implement multiple interfaces, providing multiple inheritance of type.",
      "Interface fields are always `public static final`."
    ]
  },
  {
    "id": "java-35-default-static-interface-methods",
    "moduleId": "java-m3",
    "moduleNumber": 3,
    "moduleTitle": "Object-Oriented Programming",
    "topicNumber": 35,
    "title": "Default & Static Interface Methods (Java 8+) & The Diamond Problem",
    "language": "java",
    "level": "Beginner",
    "whyItMatters": "Java 8 revolutionized interfaces by introducing `default` and `static` methods. Understanding default methods is essential for understanding how the Stream API and lambda expressions were added to existing collections without breaking millions of legacy applications.",
    "explanation": "Prior to Java 8, adding a new method to an interface broke every implementing class in the world. Java 8 introduced two new capabilities in interfaces:\n1. Default Methods (`default` keyword): Methods declared inside an interface with a concrete body. Implementing classes inherit the default implementation unless they explicitly override it. This enabled backward-compatible library evolution (e.g. adding `forEach()` and `stream()` directly to `Collection`).\n2. Static Methods: Utility methods declared on the interface itself (`static void log()`), callable via `InterfaceName.method()`. They are not inherited by implementing classes.\n3. The Multiple Inheritance Diamond Conflict:\n   If a class implements two interfaces `A` and `B` that declare the identical default method signature `default void foo()`, the Java compiler detects a collision and throws a compile error: \"class inherits unrelated defaults for foo() from types A and B\".\n   Resolution Rule: The implementing class MUST override the conflicting method and either provide its own logic or explicitly disambiguate by calling `A.super.foo()` or `B.super.foo()`.",
    "syntaxAndStructure": "public interface Loggable {\n    // Default method\n    default void log(String msg) {\n        System.out.println(\"[DEFAULT LOG] \" + msg);\n    }\n\n    // Static method\n    static void printVersion() {\n        System.out.println(\"Loggable v2.0\");\n    }\n}\n\n// Disambiguating Diamond Problem:\npublic class CollisionResolver implements InterfaceA, InterfaceB {\n    @Override\n    public void foo() {\n        InterfaceA.super.foo(); // Explicit parent delegation\n    }\n}",
    "codeExamples": [
      {
        "title": "Resolving Default Method Diamond Conflict in Java",
        "code": "interface Alpha {\n    default void greet() {\n        System.out.println(\"Greetings from Alpha\");\n    }\n}\n\ninterface Beta {\n    default void greet() {\n        System.out.println(\"Greetings from Beta\");\n    }\n}\n\n// Class implementing both interfaces must resolve the conflict\npublic class DiamondResolverDemo implements Alpha, Beta {\n    @Override\n    public void greet() {\n        // Disambiguate using InterfaceName.super.method()\n        Alpha.super.greet();\n        System.out.println(\"Appended custom child greeting.\");\n    }\n\n    public static void main(String[] args) {\n        DiamondResolverDemo demo = new DiamondResolverDemo();\n        demo.greet();\n    }\n}",
        "expectedOutput": "Greetings from Alpha\nAppended custom child greeting.",
        "explanation": "When two interfaces have identical default methods, the implementing class must explicitly override the method and resolve the ambiguity using InterfaceName.super.methodName()."
      },
      {
        "title": "Static Interface Methods and Factory Utilities",
        "code": "interface Validator {\n    boolean isValid(String input);\n\n    // Static utility method directly on the interface\n    static Validator notNullOrEmpty() {\n        return s -> s != null && !s.trim().isEmpty();\n    }\n}\n\npublic class StaticInterfaceMethodDemo {\n    public static void main(String[] args) {\n        // Calling static method directly on interface name\n        Validator v = Validator.notNullOrEmpty();\n        \n        System.out.println(\"Validating 'Placement': \" + v.isValid(\"Placement\"));\n        System.out.println(\"Validating empty: \" + v.isValid(\"   \"));\n    }\n}",
        "expectedOutput": "Validating 'Placement': true\nValidating empty: false",
        "explanation": "Static interface methods serve as factory utilities (e.g. List.of, Comparator.comparing) directly bundled with the contract."
      }
    ],
    "realWorldApplications": [
      "Evolution of the Java Collections Framework (adding `Collection.stream()`, `List.sort()`, `Map.getOrDefault()` in Java 8 without breaking legacy code).",
      "Creating functional interface factories like `Comparator.naturalOrder()` and `Comparator.reverseOrder()`."
    ],
    "commonMistakes": [
      "Attempting to call static interface methods through an implementing class or instance reference (e.g. `myClass.staticInterfaceMethod()`), which is illegal; static interface methods must be called on the interface name directly.",
      "Failing to resolve default method conflicts in implementing classes, resulting in a compile-time collision error.",
      "Failing to resolve default method conflicts when implementing two interfaces with identical method signatures."
    ],
    "interviewRelevance": "Universal interview question: \"Why were default methods added to Java 8?\", \"How does Java solve the Diamond Problem with default methods?\", and \"What is the three-rule priority for default methods?\"",
    "checkpoints": [
      {
        "id": "java-35-cp-1",
        "label": "Explain the backward compatibility motivation for Java 8 default methods"
      },
      {
        "id": "java-35-cp-2",
        "label": "Resolve default method collisions using InterfaceName.super.method() syntax"
      },
      {
        "id": "java-35-default-static-interface-methods-cp-3",
        "label": "Evolve legacy interfaces without breaking existing implementations using default methods."
      }
    ],
    "practiceExercises": [
      {
        "id": "java-35-ex-1",
        "title": "Three Rules of Default Method Resolution",
        "difficulty": "Beginner",
        "type": "conceptual",
        "prompt": "State the 3 rules of default method precedence when a class extends a superclass and implements an interface with identical methods.",
        "solution": "1. Class Wins: A method in a superclass or super-super-class ALWAYS takes precedence over any default method in an interface.\n2. Sub-interface Wins: If no class method wins, the most specific default-providing interface wins (e.g., if B extends A, B's default wins over A's default).\n3. Explicit Override: If two unrelated interfaces provide conflicting defaults, the implementing class must explicitly override the method and resolve the conflict.",
        "explanation": "Class implementation always trumps interface default implementation."
      },
      {
        "id": "java-35-ex-2",
        "title": "Private Methods in Interfaces (Java 9+)",
        "difficulty": "Intermediate",
        "type": "coding",
        "prompt": "Demonstrate how Java 9 private interface methods allow sharing helper code between two default methods.",
        "solution": "interface SecureChannel {\n    default void sendSecure(String msg) {\n        log(\"Sending: \" + msg);\n        // transmit\n    }\n    default void receiveSecure(String msg) {\n        log(\"Received: \" + msg);\n        // receive\n    }\n    // Private helper method in interface (Java 9+)\n    private void log(String s) {\n        System.out.println(\"[AUDIT LOG] \" + s);\n    }\n}\npublic class PrivateInterfaceTest implements SecureChannel {\n    public static void main(String[] args) {\n        new PrivateInterfaceTest().sendSecure(\"Data Payload\");\n    }\n}",
        "explanation": "Java 9 introduced private interface methods to share common helper logic between multiple default methods without exposing them publicly."
      },
      {
        "id": "java-35-ex-3",
        "title": "Binary Backward Compatibility Case Study",
        "difficulty": "Advanced",
        "type": "conceptual",
        "prompt": "Explain what would have happened to legacy Java 7 code using custom List implementations if Java 8 had added default void sort() as an abstract method instead of a default method.",
        "solution": "If `sort()` had been added as a standard abstract method to `java.util.List`, every custom third-party class worldwide implementing List (e.g. in Apache Commons, Google Guava, Hibernate) would have immediately failed with compile errors or `AbstractMethodError` at runtime upon upgrading to Java 8. Making `sort()` a `default` method provided a default TimSort fallback, ensuring 100% binary backward compatibility.",
        "explanation": "Default methods enabled the evolution of foundational interfaces without breaking the global Java ecosystem."
      }
    ],
    "quizQuestions": [
      {
        "id": "java-35-q1",
        "question": "If a class extends a ParentClass with method `void foo()` and implements an Interface with `default void foo()`, which method is called?",
        "options": [
          "The interface default method",
          "The ParentClass method, because \"classes always win\" over interfaces",
          "A compilation error occurs due to conflict",
          "Randomly selected by the JVM"
        ],
        "correctOptionIndex": 1,
        "explanation": "According to Java's default method resolution rules, any method declaration from a superclass takes precedence over all interface default methods (\"Class wins rule\")."
      },
      {
        "id": "java-35-q2",
        "question": "How do you invoke a static method declared inside an interface `MyInterface`?",
        "options": [
          "MyInterface.staticMethod()",
          "new MyClass().staticMethod()",
          "MyClass.staticMethod()",
          "super.staticMethod()"
        ],
        "correctOptionIndex": 0,
        "explanation": "Static interface methods must be called directly using the interface name (`MyInterface.staticMethod()`). They are not inherited by implementing classes."
      }
    ],
    "revisionNotes": [
      "Default methods (`default`) allow adding concrete behavior to interfaces without breaking implementing classes.",
      "Diamond conflicts between unrelated default methods must be explicitly overridden by the child class.",
      "Static interface methods are called directly on the interface name and are not inherited."
    ]
  },
  {
    "id": "java-36-composition-vs-inheritance",
    "moduleId": "java-m3",
    "moduleNumber": 3,
    "moduleTitle": "Object-Oriented Programming",
    "topicNumber": 36,
    "title": "Composition vs Inheritance: \"Favor Composition Over Inheritance\"",
    "language": "java",
    "level": "Beginner",
    "whyItMatters": "One of the most famous principles in software architecture (Gang of Four & Effective Java Item 18) is \"Favor composition over inheritance\". Overusing inheritance creates fragile base classes, tight coupling, and subtle encapsulation violations.",
    "explanation": "While inheritance models an IS-A relationship (`Car extends Vehicle`), composition models a HAS-A relationship (`Car has-an Engine`).\nWhy Inheritance Can Be Fragile:\n1. Encapsulation Breakage: A subclass depends on the implementation details of its superclass. If the superclass changes its internal method call patterns in a new release, the subclass can break silently without any compiler warning (the \"Fragile Base Class\" problem).\n2. Inappropriate Subtyping: Extending a class inherits ALL of its public methods, even those that violate the child’s domain invariants (e.g. `java.util.Stack` extending `Vector` allows inserting at arbitrary indices).\nWhy Composition is Superior:\n1. Loose Coupling: The new class holds a private reference to an instance of the existing class.\n2. Forwarding / Delegation: Each method in the new class forwards calls to the internal instance.\n3. Runtime Flexibility: Components can be swapped dynamically at runtime (e.g. changing an engine from GasEngine to ElectricEngine), which is impossible with static class inheritance.",
    "syntaxAndStructure": "// Fragile Inheritance (BAD):\npublic class InstrumentedHashSet<E> extends HashSet<E> { ... }\n\n// Robust Composition / Wrapper Pattern (GOOD):\npublic class InstrumentedSet<E> implements Set<E> {\n    private final Set<E> backingSet; // Composition HAS-A\n\n    public InstrumentedSet(Set<E> s) { this.backingSet = s; }\n    public boolean add(E e) { return backingSet.add(e); } // Delegation\n}",
    "codeExamples": [
      {
        "title": "The Famous HashSet Fragile Base Class Demonstration",
        "code": "import java.util.Collection;\nimport java.util.HashSet;\nimport java.util.List;\n\n// Flawed inheritance: subclass counts additions\nclass BrokenInstrumentedHashSet<E> extends HashSet<E> {\n    private int addCount = 0;\n\n    @Override\n    public boolean add(E e) {\n        addCount++;\n        return super.add(e);\n    }\n\n    @Override\n    public boolean addAll(Collection<? extends E> c) {\n        addCount += c.size();\n        return super.addAll(c); // FLAW: HashSet.addAll calls add() internally!\n    }\n\n    public int getAddCount() { return addCount; }\n}\n\npublic class FragileInheritanceDemo {\n    public static void main(String[] args) {\n        BrokenInstrumentedHashSet<String> set = new BrokenInstrumentedHashSet<>();\n        set.addAll(List.of(\"A\", \"B\", \"C\"));\n\n        // Expected count: 3. Actual count: 6! (Double counted due to parent internal implementation)\n        System.out.println(\"Expected count: 3, Actual count: \" + set.getAddCount());\n    }\n}",
        "expectedOutput": "Expected count: 3, Actual count: 6",
        "explanation": "Because HashSet.addAll() calls add() internally under the hood, the overridden add() is called again for each element, double-counting additions to 6. This is the classic fragile base class trap."
      },
      {
        "title": "Robust Composition and Forwarding Wrapper Solution",
        "code": "import java.util.Collection;\nimport java.util.HashSet;\nimport java.util.List;\nimport java.util.Set;\n\n// Robust Composition: Holds a private reference to Set<E>\nclass RobustInstrumentedSet<E> {\n    private final Set<E> set; // HAS-A\n    private int addCount = 0;\n\n    public RobustInstrumentedSet(Set<E> set) {\n        this.set = set;\n    }\n\n    public boolean add(E e) {\n        addCount++;\n        return set.add(e);\n    }\n\n    public boolean addAll(Collection<? extends E> c) {\n        addCount += c.size();\n        return set.addAll(c); // No double counting!\n    }\n\n    public int getAddCount() { return addCount; }\n}\n\npublic class RobustCompositionDemo {\n    public static void main(String[] args) {\n        RobustInstrumentedSet<String> safeSet = new RobustInstrumentedSet<>(new HashSet<>());\n        safeSet.addAll(List.of(\"A\", \"B\", \"C\"));\n\n        System.out.println(\"Correct count with composition: \" + safeSet.getAddCount());\n    }\n}",
        "expectedOutput": "Correct count with composition: 3",
        "explanation": "By using composition and delegation, RobustInstrumentedSet does not depend on the internal self-use implementation details of HashSet."
      }
    ],
    "realWorldApplications": [
      "Decorator design patterns (e.g. `BufferedReader(new FileReader(\"file\"))`).",
      "Strategy pattern where algorithms are composed into context classes rather than inherited."
    ],
    "commonMistakes": [
      "Extending concrete classes just to reuse 1 or 2 utility methods, exposing all unrelated superclass methods to clients.",
      "Treating every relationship as inheritance (e.g. making `Window` extend `Rectangle` rather than holding a `Rectangle` bounding box).",
      "Overusing inheritance for code reuse, tightly coupling subclasses to fragile parent implementation details."
    ],
    "interviewRelevance": "High-level architectural question: \"Why should you favor composition over inheritance?\", \"Explain the Fragile Base Class problem with HashSet\", and \"When is inheritance genuinely appropriate?\"",
    "checkpoints": [
      {
        "id": "java-36-cp-1",
        "label": "Explain the Fragile Base Class problem and how inheritance breaks encapsulation"
      },
      {
        "id": "java-36-cp-2",
        "label": "Implement the wrapper/decorator pattern using composition and delegation"
      },
      {
        "id": "java-36-composition-vs-inheritance-cp-3",
        "label": "Apply Effective Java Item 18: Favor composition and forwarding over inheritance."
      }
    ],
    "practiceExercises": [
      {
        "id": "java-36-ex-1",
        "title": "Historical Flaw: java.util.Stack",
        "difficulty": "Beginner",
        "type": "conceptual",
        "prompt": "Why is java.util.Stack extending java.util.Vector considered an architectural mistake in the Java standard library?",
        "solution": "Stack models LIFO (push/pop). Because Stack extends Vector using inheritance, it inherited methods like `insertElementAt(index)` and `remove(index)`. This violated the stack abstraction by allowing clients to insert and delete elements from the middle of the stack. It should have used composition: Stack HAS-A Vector.",
        "explanation": "Inheritance exposes the entire superclass API, violating subclass domain invariants."
      },
      {
        "id": "java-36-ex-2",
        "title": "Car and Engine Composition Pattern",
        "difficulty": "Intermediate",
        "type": "coding",
        "prompt": "Design a Car class composed with an Engine interface, showing how swapping GasEngine with ElectricEngine changes behavior at runtime.",
        "solution": "interface Engine { void ignite(); }\nclass GasEngine implements Engine {\n    public void ignite() { System.out.println(\"Vroom: Gas combusting.\"); }\n}\nclass ElectricEngine implements Engine {\n    public void ignite() { System.out.println(\"Silent: Inverter powering motor.\"); }\n}\nclass Car {\n    private Engine engine;\n    public Car(Engine e) { this.engine = e; }\n    public void setEngine(Engine e) { this.engine = e; } // Swappable at runtime!\n    public void start() { engine.ignite(); }\n}\npublic class CompositionTest {\n    public static void main(String[] args) {\n        Car car = new Car(new GasEngine());\n        car.start();\n        car.setEngine(new ElectricEngine());\n        car.start();\n    }\n}",
        "explanation": "Composition allows swapping behaviors dynamically at runtime, which is impossible with inheritance."
      },
      {
        "id": "java-36-ex-3",
        "title": "When is Inheritance Truly Appropriate?",
        "difficulty": "Advanced",
        "type": "conceptual",
        "prompt": "According to Effective Java, under what exact conditions is inheritance genuinely appropriate over composition?",
        "solution": "Inheritance is only appropriate when:\n1. A genuine IS-A relationship exists across all contexts without exception.\n2. Both classes belong to the same package controlled by the same development team, OR the superclass was specifically designed and documented for inheritance (Item 19).\n3. Every single method of the superclass makes logical sense in the subclass API without violating the subclass's invariants.",
        "explanation": "Inheritance couples classes permanently; use it only when the subtype relationship is universally invariant."
      }
    ],
    "quizQuestions": [
      {
        "id": "java-36-q1",
        "question": "What is the \"Fragile Base Class\" problem?",
        "options": [
          "A base class that causes compilation failure when compiled with javac",
          "A problem where modifications to superclass internal implementations can inadvertently break subclasses without compiler warning",
          "A base class with zero subclasses",
          "A class with too many interfaces"
        ],
        "correctOptionIndex": 1,
        "explanation": "The fragile base class problem occurs when changes in superclass internal implementation details cause subclasses to behave incorrectly."
      },
      {
        "id": "java-36-q2",
        "question": "Which relationship does Composition model?",
        "options": [
          "IS-A relationship",
          "HAS-A relationship",
          "IMPLEMENTS-A relationship",
          "USES-A static relationship"
        ],
        "correctOptionIndex": 1,
        "explanation": "Composition models a HAS-A relationship where one object contains a reference to another object."
      }
    ],
    "revisionNotes": [
      "\"Favor composition over inheritance\" protects against the Fragile Base Class problem.",
      "Composition (HAS-A) enables dynamic runtime component swapping.",
      "Inheritance (IS-A) breaks encapsulation if superclasses change internal call flows."
    ]
  },
  {
    "id": "java-37-association-aggregation-composition",
    "moduleId": "java-m3",
    "moduleNumber": 3,
    "moduleTitle": "Object-Oriented Programming",
    "topicNumber": 37,
    "title": "Association, Aggregation & Composition Relationships",
    "language": "java",
    "level": "Beginner",
    "whyItMatters": "Accurately modeling object lifecycles and containment relationships is a core requirement of Low-Level Design (LLD) interviews and enterprise domain modeling.",
    "explanation": "Object relationships in UML and Java are categorized into three levels of coupling:\n1. Association: A general relationship where two independent objects communicate or use each other (e.g. `Doctor` and `Patient`, or `Teacher` and `Student`). Neither owns the other; both lifecycles are independent.\n2. Aggregation (Weak HAS-A): A specialized form of association where a container object has child objects, but the child objects CAN EXIST INDEPENDENTLY of the container. For example, a `Department` has `Professors`. If the Department is deleted, the Professors still exist in the university.\n3. Composition (Strong HAS-A / Death Relationship): A strict form of aggregation where the child object's lifecycle is TIGHTLY BOUND to the parent. The child cannot exist without the parent. For example, a `House` and its `Rooms`, or an `Order` and its `OrderLineItems`. If the House or Order is destroyed, its Rooms or OrderItems are destroyed along with it.",
    "syntaxAndStructure": "// Aggregation (Weak HAS-A: Children passed in, exist independently):\npublic class Department {\n    private List<Teacher> teachers;\n    public Department(List<Teacher> teachers) { this.teachers = teachers; }\n}\n\n// Composition (Strong HAS-A: Children instantiated internally, die with parent):\npublic class Car {\n    private final Engine engine = new Engine(); // Born with Car, dies with Car\n}",
    "codeExamples": [
      {
        "title": "Aggregation (Independent Lifecycles) Demo",
        "code": "import java.util.List;\n\nclass Player {\n    String name;\n    Player(String n) { this.name = n; }\n}\n\nclass Team {\n    String teamName;\n    List<Player> players; // Aggregation: Players exist independent of Team\n\n    Team(String name, List<Player> players) {\n        this.teamName = name;\n        this.players = players;\n    }\n}\n\npublic class AggregationDemo {\n    public static void main(String[] args) {\n        Player p1 = new Player(\"Virat\");\n        Player p2 = new Player(\"Rohit\");\n\n        Team team = new Team(\"India\", List.of(p1, p2));\n        System.out.println(\"Team created: \" + team.teamName);\n\n        // If team reference is destroyed:\n        team = null;\n\n        // Players still exist independently!\n        System.out.println(\"Player p1 still alive: \" + p1.name);\n    }\n}",
        "expectedOutput": "Team created: India\nPlayer p1 still alive: Virat",
        "explanation": "In Aggregation, destroying the container (Team) does NOT destroy the contained elements (Player); their lifecycles are independent."
      },
      {
        "title": "Composition (Tightly-Bound Lifecycle) Demo",
        "code": "class OrderItem {\n    private String product;\n    private double price;\n    OrderItem(String p, double pr) { this.product = p; this.price = pr; }\n    public String getProduct() { return product; }\n}\n\nclass CustomerOrder {\n    private final OrderItem item; // Composition: OrderItem created within Order\n\n    public CustomerOrder(String product, double price) {\n        // Child lifecycle is completely owned and managed by the parent\n        this.item = new OrderItem(product, price);\n    }\n\n    public String getItemName() { return item.getProduct(); }\n}\n\npublic class CompositionLifecycleDemo {\n    public static void main(String[] args) {\n        CustomerOrder order = new CustomerOrder(\"Gaming Laptop\", 1200.0);\n        System.out.println(\"Order item: \" + order.getItemName());\n        // When 'order' becomes eligible for GC, its internal OrderItem is also collected\n    }\n}",
        "expectedOutput": "Order item: Gaming Laptop",
        "explanation": "In Composition, the parent CustomerOrder controls the lifecycle of OrderItem. The item cannot exist independently of its parent order."
      }
    ],
    "realWorldApplications": [
      "Database cascading deletes (ON DELETE CASCADE) implementing composition lifecycles in ORMs.",
      "Low-Level Design (LLD) modeling in machine coding rounds (Parking Lot, Hotel Management, E-Commerce)."
    ],
    "commonMistakes": [
      "Confusing Aggregation with Composition: in Composition, the part cannot exist without the whole.",
      "Exposing internal composite components directly through public getters, inadvertently degrading composition into weak aggregation.",
      "Failing to cascade deletion or lifecycle termination in composite object relationships."
    ],
    "interviewRelevance": "Frequent System Design / LLD interview question: \"Differentiate between Association, Aggregation, and Composition with real-world examples.\"",
    "checkpoints": [
      {
        "id": "java-37-cp-1",
        "label": "Define the lifecycle ownership difference between Aggregation and Composition"
      },
      {
        "id": "java-37-cp-2",
        "label": "Identify real-world domain models suitable for Composition vs Aggregation"
      },
      {
        "id": "java-37-association-aggregation-composition-cp-3",
        "label": "Distinguish between loose association, aggregation (has-a), and composition (owns-a)."
      }
    ],
    "practiceExercises": [
      {
        "id": "java-37-ex-1",
        "title": "Classify Real-World Relationships",
        "difficulty": "Beginner",
        "type": "conceptual",
        "prompt": "Classify each as Association, Aggregation, or Composition: 1) Bank & Customer, 2) University & Department, 3) Building & Room.",
        "solution": "1) Bank & Customer: Association (both exist independently, a customer can use multiple banks).\n2) University & Department: Aggregation (departments can be reorganized, or professors transferred).\n3) Building & Room: Composition (rooms cannot exist without the physical building structure).",
        "explanation": "Evaluates lifecycle coupling: independent vs shared vs strict death-relationship."
      },
      {
        "id": "java-37-ex-2",
        "title": "Implement Cascading Clean-up in Composition",
        "difficulty": "Intermediate",
        "type": "coding",
        "prompt": "Implement a Computer class composed of CPU and Memory, ensuring closing the Computer closes all components.",
        "solution": "class CPU implements AutoCloseable {\n    public void close() { System.out.println(\"CPU powered down.\"); }\n}\nclass Memory implements AutoCloseable {\n    public void close() { System.out.println(\"Memory flushed.\"); }\n}\nclass Computer implements AutoCloseable {\n    private final CPU cpu = new CPU();\n    private final Memory memory = new Memory();\n    public void close() {\n        memory.close();\n        cpu.close();\n        System.out.println(\"Computer shutdown complete.\");\n    }\n}\npublic class CascadingCleanTest {\n    public static void main(String[] args) {\n        try (Computer c = new Computer()) {\n            System.out.println(\"Computer running.\");\n        }\n    }\n}",
        "explanation": "In composition, lifecycle termination cascades from the composite parent to all constituent child objects."
      },
      {
        "id": "java-37-ex-3",
        "title": "JPA CascadeType.ALL vs Composition",
        "difficulty": "Advanced",
        "type": "conceptual",
        "prompt": "How does JPA / Hibernate model Composition using annotations like @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)?",
        "solution": "When an entity has `@OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)`, it implements exact Composition semantics. If the parent is persisted or deleted, the children are automatically persisted or deleted. If a child is removed from the parent's collection, Hibernate deletes the child record from the database (orphan removal), ensuring the child cannot exist without its parent.",
        "explanation": "JPA orphanRemoval = true mirrors OOP composition semantics in relational databases."
      }
    ],
    "quizQuestions": [
      {
        "id": "java-37-q1",
        "question": "Which relationship describes a \"death relationship\" where the contained object cannot exist without its container?",
        "options": [
          "Association",
          "Aggregation",
          "Composition",
          "Inheritance"
        ],
        "correctOptionIndex": 2,
        "explanation": "Composition represents strong ownership where the child object's lifecycle is bound strictly to the parent object."
      },
      {
        "id": "java-37-q2",
        "question": "A School and a Student relationship where the student continues to exist even if the school closes is an example of:",
        "options": [
          "Composition",
          "Aggregation",
          "Inheritance",
          "Generalization"
        ],
        "correctOptionIndex": 1,
        "explanation": "Aggregation represents weak ownership where child objects have an independent lifecycle beyond the container."
      }
    ],
    "revisionNotes": [
      "Association: General relationship between independent objects.",
      "Aggregation: Weak HAS-A; child objects exist independently of the container.",
      "Composition: Strong HAS-A; child objects are created by and die with the parent."
    ]
  },
  {
    "id": "java-38-solid-principles-design",
    "moduleId": "java-m3",
    "moduleNumber": 3,
    "moduleTitle": "Object-Oriented Programming",
    "topicNumber": 38,
    "title": "SOLID Principles & Essential Design Patterns in Java",
    "language": "java",
    "level": "Beginner",
    "whyItMatters": "The SOLID principles and Gang of Four design patterns are the bedrock of maintainable software engineering. Every senior placement interview evaluates candidates on explaining and applying SOLID in real-world scenarios.",
    "explanation": "The SOLID principles establish guidelines for robust object-oriented software design:\n1. S — Single Responsibility Principle (SRP): A class should have one, and only one, reason to change.\n2. O — Open/Closed Principle (OCP): Software entities should be open for extension, but closed for modification.\n3. L — Liskov Substitution Principle (LSP): Subtypes must be substitutable for their base types without altering program correctness.\n4. I — Interface Segregation Principle (ISP): Clients should not be forced to depend on interfaces they do not use (prefer small, role-focused interfaces).\n5. D — Dependency Inversion Principle (DIP): High-level modules should not depend on low-level modules; both should depend on abstractions.\n\nEssential Creational Patterns:\n- Singleton: Ensures a class has only one instance with a global point of access.\n- Factory: Delegates object creation to specialized factory methods.\n- Builder: Separates construction of complex objects from their representation.",
    "syntaxAndStructure": "// DIP Example:\n// High-level service depends on abstraction (NotificationService), NOT concrete classes\npublic class OrderService {\n    private final NotificationService notifier; // Dependency Inversion\n    public OrderService(NotificationService n) { this.notifier = n; }\n}",
    "codeExamples": [
      {
        "title": "Open/Closed Principle (OCP) via Strategy Polymorphism",
        "code": "// Open for extension: new discount algorithms implement DiscountStrategy\ninterface DiscountStrategy {\n    double applyDiscount(double amount);\n}\n\nclass RegularDiscount implements DiscountStrategy {\n    public double applyDiscount(double amount) { return amount; }\n}\n\nclass VIPDiscount implements DiscountStrategy {\n    public double applyDiscount(double amount) { return amount * 0.80; } // 20% off\n}\n\n// Closed for modification: BillingService does not change when new discounts are created\nclass BillingService {\n    public double calculateTotal(double baseAmount, DiscountStrategy strategy) {\n        return strategy.applyDiscount(baseAmount);\n    }\n}\n\npublic class OCPDemo {\n    public static void main(String[] args) {\n        BillingService billing = new BillingService();\n        System.out.println(\"Regular bill: \" + billing.calculateTotal(100.0, new RegularDiscount()));\n        System.out.println(\"VIP bill: \" + billing.calculateTotal(100.0, new VIPDiscount()));\n    }\n}",
        "expectedOutput": "Regular bill: 100.0\nVIP bill: 80.0",
        "explanation": "Adding a FestivalDiscount requires only writing a new class implementing DiscountStrategy, without touching or modifying BillingService."
      },
      {
        "title": "Liskov Substitution Principle (LSP) Classic Square-Rectangle Violation",
        "code": "// Violating LSP: Square violates Rectangle invariants\nclass Rectangle {\n    protected int width, height;\n    public void setWidth(int w) { this.width = w; }\n    public void setHeight(int h) { this.height = h; }\n    public int getArea() { return width * height; }\n}\n\nclass Square extends Rectangle {\n    @Override\n    public void setWidth(int w) { this.width = w; this.height = w; }\n    @Override\n    public void setHeight(int h) { this.width = h; this.height = h; }\n}\n\npublic class LSPDemo {\n    static void testRectangle(Rectangle r) {\n        r.setWidth(5);\n        r.setHeight(4);\n        // Expecting 5 * 4 = 20!\n        System.out.println(\"Expected 20, Got: \" + r.getArea());\n    }\n\n    public static void main(String[] args) {\n        testRectangle(new Rectangle()); // Works: 20\n        testRectangle(new Square());    // Violates LSP: returns 16!\n    }\n}",
        "expectedOutput": "Expected 20, Got: 20\nExpected 20, Got: 16",
        "explanation": "Square cannot be safely substituted for Rectangle because changing height alters width, violating the client's expectation of independent dimensions."
      }
    ],
    "realWorldApplications": [
      "Dependency injection containers (Spring Framework @Autowired relying on Dependency Inversion).",
      "Refactoring legacy god-classes into single-responsibility services."
    ],
    "commonMistakes": [
      "Creating \"Fat Interfaces\" with 20+ methods, forcing clients to implement useless dummy methods (violating ISP).",
      "Using `new ConcreteService()` inside business classes instead of injecting abstractions (violating DIP).",
      "Violating the Single Responsibility Principle by creating monolithic God classes handling UI, database, and logic."
    ],
    "interviewRelevance": "Mandatory interview question: \"Walk through each of the SOLID principles with an example\", \"Explain the Square-Rectangle LSP violation\", and \"Difference between Factory and Builder patterns.\"",
    "checkpoints": [
      {
        "id": "java-38-cp-1",
        "label": "Define and illustrate all 5 SOLID principles with code examples"
      },
      {
        "id": "java-38-cp-2",
        "label": "Explain the classic Square-Rectangle LSP violation and its architectural resolution"
      },
      {
        "id": "java-38-solid-principles-design-cp-3",
        "label": "Apply all 5 SOLID principles to design decoupled, extensible systems."
      }
    ],
    "practiceExercises": [
      {
        "id": "java-38-ex-1",
        "title": "Refactor Fat Interface to Follow ISP",
        "difficulty": "Beginner",
        "type": "coding",
        "prompt": "Split an interface Worker with void work() and void eat() so that Robot classes are not forced to implement eat().",
        "solution": "interface Workable { void work(); }\ninterface Eatable { void eat(); }\n\nclass HumanWorker implements Workable, Eatable {\n    public void work() { System.out.println(\"Human working\"); }\n    public void eat() { System.out.println(\"Human eating\"); }\n}\n\nclass RobotWorker implements Workable {\n    public void work() { System.out.println(\"Robot working\"); }\n}\n\npublic class ISPRefactorTest {\n    public static void main(String[] args) {\n        new RobotWorker().work();\n    }\n}",
        "explanation": "Interface Segregation Principle breaks fat interfaces into smaller, cohesive, role-specific contracts."
      },
      {
        "id": "java-38-ex-2",
        "title": "Dependency Inversion with Payment Gateway",
        "difficulty": "Intermediate",
        "type": "coding",
        "prompt": "Design an OrderProcessor that depends on a PaymentGateway interface rather than a concrete PayPalGateway class.",
        "solution": "interface PaymentGateway { void processPayment(double amount); }\nclass PayPalGateway implements PaymentGateway {\n    public void processPayment(double a) { System.out.println(\"Paid via PayPal: \" + a); }\n}\nclass OrderProcessor {\n    private final PaymentGateway gateway;\n    public OrderProcessor(PaymentGateway gw) { this.gateway = gw; } // Dependency Inversion\n    public void checkout(double amt) { gateway.processPayment(amt); }\n}\npublic class DIPTest {\n    public static void main(String[] args) {\n        new OrderProcessor(new PayPalGateway()).checkout(199.99);\n    }\n}",
        "explanation": "High-level OrderProcessor depends on abstraction PaymentGateway, satisfying the Dependency Inversion Principle."
      },
      {
        "id": "java-38-ex-3",
        "title": "Thread-Safe Double-Checked Locking Singleton",
        "difficulty": "Advanced",
        "type": "coding",
        "prompt": "Write the classic thread-safe Double-Checked Locking Singleton in Java using the volatile keyword.",
        "solution": "public class SafeSingleton {\n    private static volatile SafeSingleton instance;\n\n    private SafeSingleton() {}\n\n    public static SafeSingleton getInstance() {\n        if (instance == null) {\n            synchronized (SafeSingleton.class) {\n                if (instance == null) {\n                    instance = new SafeSingleton();\n                }\n            }\n        }\n        return instance;\n    }\n    public static void main(String[] args) {\n        System.out.println(\"Singleton instance non-null: \" + (getInstance() != null));\n    }\n}",
        "explanation": "`volatile` prevents CPU instruction reordering where a half-initialized object reference could be observed by other threads."
      }
    ],
    "quizQuestions": [
      {
        "id": "java-38-q1",
        "question": "Which SOLID principle states that \"Subtypes must be substitutable for their base types without altering program correctness\"?",
        "options": [
          "Single Responsibility Principle",
          "Open/Closed Principle",
          "Liskov Substitution Principle",
          "Interface Segregation Principle"
        ],
        "correctOptionIndex": 2,
        "explanation": "Liskov Substitution Principle (LSP) mandates that subclasses must behave such that callers using the parent reference do not encounter broken expectations."
      },
      {
        "id": "java-38-q2",
        "question": "In the Double-Checked Locking Singleton pattern, why is the `volatile` keyword mandatory for the static instance variable?",
        "options": [
          "To prevent garbage collection",
          "To prevent instruction reordering by the compiler and CPU during object creation",
          "To make the class serializable",
          "To force the class into Metaspace"
        ],
        "correctOptionIndex": 1,
        "explanation": "`volatile` prevents memory reordering where memory allocation and reference assignment could occur before the constructor finishes executing."
      }
    ],
    "revisionNotes": [
      "SOLID: Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion.",
      "Open/Closed Principle promotes writing extensible code without modifying tested classes.",
      "Dependency Inversion relies on abstractions rather than concrete classes."
    ]
  }
];

export const module3: MasteryModule = {
  "id": "java-m3",
  "number": 3,
  "title": "Object-Oriented Programming",
  "description": "Classes, objects, constructors, this keyword, inheritance, super, method overriding, polymorphism, encapsulation, abstraction, interfaces, default methods, composition vs inheritance, aggregation, and SOLID principles.",
  "language": "java",
  "topics": [
    {
      "id": "java-23-classes-objects",
      "moduleId": "java-m3",
      "moduleNumber": 3,
      "moduleTitle": "Object-Oriented Programming",
      "topicNumber": 23,
      "title": "Classes, Objects & Heap-Stack Memory Allocation",
      "language": "java",
      "level": "Beginner",
      "whyItMatters": "Classes and objects form the fundamental blueprint of Java programming. Understanding how objects are instantiated on the Heap while their references reside on the Thread Stack is essential for preventing memory leaks and mastering OOP.",
      "explanation": "In Java, a `class` is a user-defined blueprint or template that defines the state (fields/attributes) and behavior (methods) common to all objects of that type. An `object` is a concrete instance of a class dynamically allocated on the Heap.\nMemory Allocation:\n1. Class Metadata: When the class is loaded by the ClassLoader, its structure and static fields are stored in Metaspace.\n2. Stack Frame: When a method like `main()` executes, its local reference variable (e.g. `Account acc`) is allocated on the thread's call stack.\n3. Heap Memory: The `new Account()` statement allocates contiguous heap memory for the instance variables, executes the constructor, and returns the 64-bit reference address (or 32-bit compressed OOP) to `acc` on the stack.",
      "syntaxAndStructure": "// Class definition:\npublic class Account {\n    // State (Instance Variables)\n    private String id;\n    private double balance;\n\n    // Behavior (Methods)\n    public void credit(double amount) { this.balance += amount; }\n}\n\n// Object Instantiation:\nAccount acc = new Account(); // acc on Stack, instance on Heap",
      "codeExamples": [
        {
          "title": "Instantiating Independent Object Instances",
          "code": "public class Car {\n    String model;\n    int year;\n\n    public Car(String model, int year) {\n        this.model = model;\n        this.year = year;\n    }\n\n    public void display() {\n        System.out.println(model + \" (\" + year + \")\");\n    }\n\n    public static void main(String[] args) {\n        // Two distinct objects on the Heap\n        Car car1 = new Car(\"Tesla Model 3\", 2024);\n        Car car2 = new Car(\"BMW i4\", 2025);\n\n        car1.display();\n        car2.display();\n        System.out.println(\"Distinct references: \" + (car1 != car2));\n    }\n}",
          "expectedOutput": "Tesla Model 3 (2024)\nBMW i4 (2025)\nDistinct references: true",
          "explanation": "car1 and car2 hold distinct memory references pointing to separate instances in Heap memory."
        },
        {
          "title": "Demonstrating Reference Aliasing",
          "code": "public class AliasingDemo {\n    static class Node {\n        int val;\n        Node(int v) { this.val = v; }\n    }\n\n    public static void main(String[] args) {\n        Node n1 = new Node(10);\n        Node n2 = n1; // Reference aliasing: n2 points to the EXACT same heap object\n\n        n2.val = 99; // Mutates object via alias\n\n        System.out.println(\"n1.val: \" + n1.val);\n        System.out.println(\"n2.val: \" + n2.val);\n        System.out.println(\"Are references identical: \" + (n1 == n2));\n    }\n}",
          "expectedOutput": "n1.val: 99\nn2.val: 99\nAre references identical: true",
          "explanation": "Assigning n2 = n1 copies the reference address, not the object. Both variables reference the identical heap entity."
        }
      ],
      "realWorldApplications": [
        "Modeling domain entities in enterprise applications (User, Order, PaymentTransaction).",
        "Memory optimization in high-frequency trading where object allocations on the heap are minimized to reduce GC pauses."
      ],
      "commonMistakes": [
        "Confusing an object reference with the object itself; multiple references can point to the same object on the heap.",
        "Assuming classes occupy heap space per instance; class metadata is loaded once into Metaspace.",
        "Confusing a null reference with an empty object, causing NullPointerException on method invocation."
      ],
      "interviewRelevance": "Foundational topic: \"Explain the difference between a class and an object\", \"What happens in memory when `new` is executed?\", and \"What is reference aliasing?\"",
      "checkpoints": [
        {
          "id": "java-23-cp-1",
          "label": "Explain the difference between stack reference and heap object instantiation"
        },
        {
          "id": "java-23-cp-2",
          "label": "Demonstrate reference aliasing and its effect on object mutation"
        },
        {
          "id": "java-23-classes-objects-cp-3",
          "label": "Model domain entities with proper state and behavior encapsulation."
        }
      ],
      "practiceExercises": [
        {
          "id": "java-23-ex-1",
          "title": "Count Active Object Instances",
          "difficulty": "Beginner",
          "type": "coding",
          "prompt": "Write a class Product with an instance name and a static instanceCount that increments on every constructor call.",
          "solution": "public class Product {\n    private static int instanceCount = 0;\n    private String name;\n\n    public Product(String name) {\n        this.name = name;\n        instanceCount++;\n    }\n\n    public static int getInstanceCount() { return instanceCount; }\n\n    public static void main(String[] args) {\n        new Product(\"P1\");\n        new Product(\"P2\");\n        System.out.println(\"Total products created: \" + Product.getInstanceCount());\n    }\n}",
          "explanation": "Instance state is unique to each object, while the static variable tracks cumulative instantiations across the class."
        },
        {
          "id": "java-23-ex-2",
          "title": "Deep Copy vs Shallow Copy of Objects",
          "difficulty": "Intermediate",
          "type": "coding",
          "prompt": "Demonstrate the difference between shallow copying (copying references) and deep copying (duplicating nested objects).",
          "solution": "class Address {\n    String city;\n    Address(String c) { this.city = c; }\n}\n\nclass User {\n    String name;\n    Address address;\n    User(String n, Address a) { this.name = n; this.address = a; }\n\n    // Deep copy constructor\n    User(User other) {\n        this.name = other.name;\n        this.address = new Address(other.address.city);\n    }\n}\n\npublic class DeepCopyDemo {\n    public static void main(String[] args) {\n        User u1 = new User(\"Alice\", new Address(\"Bengaluru\"));\n        User u2 = new User(u1); // Deep copy\n        u2.address.city = \"Hyderabad\";\n\n        System.out.println(\"u1 city: \" + u1.address.city);\n        System.out.println(\"u2 city: \" + u2.address.city);\n    }\n}",
          "explanation": "Deep copying instantiates a new Address object so that mutations in u2 do not affect u1."
        },
        {
          "id": "java-23-ex-3",
          "title": "Object Header and Memory Alignment (JOL Concept)",
          "difficulty": "Advanced",
          "type": "conceptual",
          "prompt": "Explain what constitutes an Object Header in 64-bit HotSpot JVM (Mark Word + Klass Word) and how memory padding works.",
          "solution": "Every Java object on the heap begins with an Object Header:\n1. Mark Word (64 bits / 8 bytes): Holds identity hashcode, GC age, biased locking/lock flags, and thread IDs.\n2. Klass Word (32 bits with Compressed OOPs, else 64 bits): Points to the class metadata in Metaspace.\n3. Instance Fields: Primitive fields and reference pointers.\n4. Padding: The JVM aligns all object sizes to multiples of 8 bytes (64 bits) for CPU bus efficiency. If fields sum to 21 bytes, 3 bytes of padding are appended to make it 24 bytes.",
          "explanation": "HotSpot 64-bit JVM uses 8-byte object alignment and 8-to-12 byte object headers."
        }
      ],
      "quizQuestions": [
        {
          "id": "java-23-q1",
          "question": "Where is an object instantiated with the `new` keyword stored in the standard JVM?",
          "options": [
            "On the Thread Stack",
            "In the Heap Memory",
            "In the Metaspace",
            "In CPU Cache"
          ],
          "correctOptionIndex": 1,
          "explanation": "All dynamic object allocations created via `new` reside in Heap Memory."
        },
        {
          "id": "java-23-q2",
          "question": "What is created when executing: `Student s1 = new Student(); Student s2 = s1;`?",
          "options": [
            "Two objects on the heap with separate references",
            "One object on the heap with two reference variables pointing to it",
            "A compilation error because s2 is not initialized with new",
            "A clone of the Student object"
          ],
          "correctOptionIndex": 1,
          "explanation": "Assigning s2 = s1 copies the memory address from s1 into s2, creating an alias pointing to the single heap instance."
        }
      ],
      "revisionNotes": [
        "A class is a blueprint; an object is an instance allocated on the Heap.",
        "Object references live on the Stack; actual object fields reside on the Heap.",
        "Assigning one object variable to another copies the reference address, not the object."
      ]
    },
    {
      "id": "java-24-constructors",
      "moduleId": "java-m3",
      "moduleNumber": 3,
      "moduleTitle": "Object-Oriented Programming",
      "topicNumber": 24,
      "title": "Constructors, Default Constructor & Initialization Lifecycle",
      "language": "java",
      "level": "Beginner",
      "whyItMatters": "Constructors establish class invariants and guarantee that objects enter memory in a valid state. Understanding the default no-arg constructor rules and initialization sequence prevents runtime null errors.",
      "explanation": "A constructor is a special block of code that initializes a newly instantiated object. Key characteristics:\n1. Name & Return Type: Must share the exact name of the enclosing class and has NO return type (not even `void`).\n2. Default No-Arg Constructor: If a class declares NO constructors at all, the Java compiler automatically synthesizes a public no-arg default constructor that calls `super()`.\n3. Loss of Default Constructor: If you define ANY custom constructor (e.g. `User(String name)`), the compiler DOES NOT generate the default no-arg constructor! If a no-arg constructor is still needed, it must be declared explicitly.\n4. Object Initialization Sequence:\n   - Step 1: Memory allocated on heap and zero-initialized (0, false, null).\n   - Step 2: `super()` constructor runs.\n   - Step 3: Instance variable initializers and instance initializer blocks `{}` run in textual order.\n   - Step 4: The constructor body executes.",
      "syntaxAndStructure": "public class Employee {\n    private String name;\n    private int id;\n\n    // Parameterized constructor\n    public Employee(String name, int id) {\n        this.name = name;\n        this.id = id;\n    }\n\n    // Explicit no-arg constructor\n    public Employee() {\n        this(\"Unknown\", 0);\n    }\n}",
      "codeExamples": [
        {
          "title": "Verifying the Loss of Default Constructor",
          "code": "class ExplicitConstructorOnly {\n    String role;\n    // Parameterized constructor defined\n    public ExplicitConstructorOnly(String role) {\n        this.role = role;\n    }\n}\n\npublic class DefaultConstructorDemo {\n    public static void main(String[] args) {\n        ExplicitConstructorOnly obj = new ExplicitConstructorOnly(\"Engineer\");\n        System.out.println(\"Role: \" + obj.role);\n\n        // The line below fails compilation because the compiler no longer creates a no-arg constructor:\n        // ExplicitConstructorOnly missing = new ExplicitConstructorOnly(); // Compile Error!\n        System.out.println(\"Verified: Custom constructor eliminates automatic default constructor.\");\n    }\n}",
          "expectedOutput": "Role: Engineer\nVerified: Custom constructor eliminates automatic default constructor.",
          "explanation": "When any constructor is explicitly declared, the compiler withdraws the automatic default no-arg constructor."
        },
        {
          "title": "Complete Object Initialization Lifecycle Order",
          "code": "class ParentClass {\n    ParentClass() {\n        System.out.println(\"1. Parent constructor executed via super().\");\n    }\n}\n\npublic class InitLifecycleDemo extends ParentClass {\n    // Instance variable initializer\n    int field = initializeField();\n\n    int initializeField() {\n        System.out.println(\"2. Instance field initialized.\");\n        return 100;\n    }\n\n    // Instance block\n    {\n        System.out.println(\"3. Instance block executed.\");\n    }\n\n    // Constructor\n    public InitLifecycleDemo() {\n        super();\n        System.out.println(\"4. Child constructor body executed.\");\n    }\n\n    public static void main(String[] args) {\n        new InitLifecycleDemo();\n    }\n}",
          "expectedOutput": "1. Parent constructor executed via super().\n2. Instance field initialized.\n3. Instance block executed.\n4. Child constructor body executed.",
          "explanation": "Parent constructor executes first, followed by instance field initializers and instance blocks in textual order, and finally the child constructor body."
        }
      ],
      "realWorldApplications": [
        "Establishing mandatory domain invariants upon entity creation (e.g., throwing IllegalArgumentException if email is null).",
        "Dependency injection in frameworks like Spring where dependencies are passed via constructor injection."
      ],
      "commonMistakes": [
        "Accidentally writing `public void Student()`; adding a return type `void` turns the constructor into a normal method that is never invoked on `new Student()`!",
        "Assuming the compiler always provides a no-arg constructor; creating a parameterized constructor removes the default no-arg constructor.",
        "Expecting the default no-argument constructor to exist after defining a parameterized constructor."
      ],
      "interviewRelevance": "Classic interview question: \"Can a constructor be private?\", \"What happens if you define a constructor with a void return type?\", and \"Trace the constructor execution hierarchy.\"",
      "checkpoints": [
        {
          "id": "java-24-cp-1",
          "label": "Explain when the Java compiler automatically creates or omits the default constructor"
        },
        {
          "id": "java-24-cp-2",
          "label": "Trace the 4-step object initialization sequence from super() to constructor body"
        },
        {
          "id": "java-24-constructors-cp-3",
          "label": "Understand default constructor generation and initialization sequences."
        }
      ],
      "practiceExercises": [
        {
          "id": "java-24-ex-1",
          "title": "Private Constructor for Utility Classes",
          "difficulty": "Beginner",
          "type": "coding",
          "prompt": "Demonstrate how a private constructor prevents external instantiation of a class.",
          "solution": "public class MathConstants {\n    private MathConstants() {\n        // Prevent instantiation\n    }\n    public static final double GOLDEN_RATIO = 1.6180339887;\n    public static void main(String[] args) {\n        System.out.println(\"Golden ratio: \" + MathConstants.GOLDEN_RATIO);\n    }\n}",
          "explanation": "Declaring the constructor private prevents callers outside the class from using new MathConstants()."
        },
        {
          "id": "java-24-ex-2",
          "title": "Constructor Invariant Validation",
          "difficulty": "Intermediate",
          "type": "coding",
          "prompt": "Write a constructor for a StudentAccount that validates that age >= 18 and GPA is between 0.0 and 4.0, throwing IllegalArgumentException otherwise.",
          "solution": "public class StudentAccount {\n    private final int age;\n    private final double gpa;\n\n    public StudentAccount(int age, double gpa) {\n        if (age < 18) throw new IllegalArgumentException(\"Age must be >= 18\");\n        if (gpa < 0.0 || gpa > 4.0) throw new IllegalArgumentException(\"GPA must be between 0.0 and 4.0\");\n        this.age = age;\n        this.gpa = gpa;\n    }\n    public static void main(String[] args) {\n        StudentAccount s = new StudentAccount(20, 3.8);\n        System.out.println(\"Valid account created.\");\n    }\n}",
          "explanation": "Validating constructor parameters guarantees that no invalid object can exist in memory."
        },
        {
          "id": "java-24-ex-3",
          "title": "Dangers of Calling Overridable Methods in Constructors",
          "difficulty": "Advanced",
          "type": "coding",
          "prompt": "Demonstrate why calling an overridable method inside a parent constructor causes subtle bugs with uninitialized child fields.",
          "solution": "class SuperBase {\n    SuperBase() {\n        printDetails(); // DANGEROUS: overridable method called in constructor\n    }\n    void printDetails() { System.out.println(\"SuperBase\"); }\n}\n\nclass SubChild extends SuperBase {\n    String tag = \"INITIALIZED_TAG\";\n    @Override\n    void printDetails() {\n        System.out.println(\"SubChild tag: \" + tag); // tag is NULL here because child initializers haven't run!\n    }\n}\n\npublic class ConstructorFlawDemo {\n    public static void main(String[] args) {\n        new SubChild();\n    }\n}",
          "explanation": "When SuperBase runs, SubChild's field `tag` is not yet initialized, resulting in printing `tag: null`. Never call overridable methods in constructors!"
        }
      ],
      "quizQuestions": [
        {
          "id": "java-24-q1",
          "question": "What occurs if a developer writes `public void Account() { ... }` in a class named Account?",
          "options": [
            "It is a valid no-argument constructor",
            "It is a regular method named Account, NOT a constructor, and won't execute on new Account()",
            "It causes a compilation error",
            "It creates an abstract constructor"
          ],
          "correctOptionIndex": 1,
          "explanation": "Constructors cannot specify any return type, not even void. Specifying void turns it into a standard method."
        },
        {
          "id": "java-24-q2",
          "question": "When does the Java compiler supply an automatic default constructor?",
          "options": [
            "Only when the class has at least one static method",
            "Only if the class does not define any constructors of its own",
            "Always, even if custom parameterized constructors exist",
            "Only in abstract classes"
          ],
          "correctOptionIndex": 1,
          "explanation": "The automatic default constructor is only generated if the class contains zero explicitly defined constructors."
        }
      ],
      "revisionNotes": [
        "Constructors must share the class name and have no return type (not even void).",
        "Defining any constructor removes the automatic default no-arg constructor.",
        "Never invoke overridable methods inside constructors."
      ]
    },
    {
      "id": "java-25-constructor-overloading",
      "moduleId": "java-m3",
      "moduleNumber": 3,
      "moduleTitle": "Object-Oriented Programming",
      "topicNumber": 25,
      "title": "Constructor Overloading & Constructor Chaining (this)",
      "language": "java",
      "level": "Beginner",
      "whyItMatters": "Constructor overloading provides multiple ways to initialize an object. Constructor chaining via `this(...)` eliminates duplicate initialization code and guarantees that validation logic is centralized in one canonical constructor.",
      "explanation": "Constructor Overloading allows a class to declare multiple constructors with different parameter lists (different types, counts, or orders).\nConstructor Chaining (`this()`):\nWhen a class has multiple constructors, one constructor can call another constructor within the same class using `this(...)`:\n1. `this(...)` MUST be the very first statement in the constructor body.\n2. You cannot use instance fields or methods as arguments to `this(...)` because the instance is not yet fully initialized.\n3. Circular constructor chaining (e.g. A calls B, and B calls A) causes a compile error: \"Recursive constructor invocation\".\n4. Centralizing initialization in a single master (canonical) constructor guarantees consistent data validation and clean maintenance.",
      "syntaxAndStructure": "public class UserProfile {\n    private String username;\n    private String role;\n    private boolean active;\n\n    // Canonical Master Constructor\n    public UserProfile(String username, String role, boolean active) {\n        this.username = username;\n        this.role = role;\n        this.active = active;\n    }\n\n    // Overloaded Constructor 1: Defaults active to true\n    public UserProfile(String username, String role) {\n        this(username, role, true); // MUST be first statement\n    }\n\n    // Overloaded Constructor 2: Defaults role to \"USER\"\n    public UserProfile(String username) {\n        this(username, \"USER\", true);\n    }\n}",
      "codeExamples": [
        {
          "title": "Centralized Constructor Chaining Pattern",
          "code": "public class ConnectionConfig {\n    private String host;\n    private int port;\n    private int timeoutMs;\n\n    // Master Constructor containing validation\n    public ConnectionConfig(String host, int port, int timeoutMs) {\n        if (port <= 0 || port > 65535) throw new IllegalArgumentException(\"Invalid port: \" + port);\n        this.host = host;\n        this.port = port;\n        this.timeoutMs = timeoutMs;\n    }\n\n    // Overload chaining with default timeout\n    public ConnectionConfig(String host, int port) {\n        this(host, port, 5000); // Calls master constructor\n    }\n\n    // Overload chaining with default port and timeout\n    public ConnectionConfig(String host) {\n        this(host, 8080, 5000); // Calls master constructor\n    }\n\n    public void printConfig() {\n        System.out.println(\"Config -> Host: \" + host + \", Port: \" + port + \", Timeout: \" + timeoutMs + \"ms\");\n    }\n\n    public static void main(String[] args) {\n        ConnectionConfig c1 = new ConnectionConfig(\"localhost\");\n        ConnectionConfig c2 = new ConnectionConfig(\"api.ak67.com\", 443, 2000);\n        c1.printConfig();\n        c2.printConfig();\n    }\n}",
          "expectedOutput": "Config -> Host: localhost, Port: 8080, Timeout: 5000ms\nConfig -> Host: api.ak67.com, Port: 443, Timeout: 2000ms",
          "explanation": "Constructors delegate to the primary master constructor using this(...). This avoids duplicating port validation across three places."
        },
        {
          "title": "Verifying \"First Statement\" Rule and Errors",
          "code": "public class ConstructorRulesDemo {\n    private int x;\n\n    public ConstructorRulesDemo(int x) {\n        this.x = x;\n    }\n\n    public ConstructorRulesDemo() {\n        // System.out.println(\"Starting init\"); // ILLEGAL: this() must be the FIRST statement\n        this(42); // Valid: first statement\n        System.out.println(\"Chained constructor executed successfully.\");\n    }\n\n    public static void main(String[] args) {\n        ConstructorRulesDemo demo = new ConstructorRulesDemo();\n        System.out.println(\"Value of x: \" + demo.x);\n    }\n}",
          "expectedOutput": "Chained constructor executed successfully.\nValue of x: 42",
          "explanation": "Java strictly requires this(...) to be the first executable statement in the constructor to guarantee safe, deterministic initialization."
        }
      ],
      "realWorldApplications": [
        "Configuring connection pools (HikariCP), HTTP clients, and database repositories with default parameters.",
        "Refactoring legacy classes to add optional features without breaking existing client code."
      ],
      "commonMistakes": [
        "Placing logging or assignment statements before `this(...)`, causing the compiler error: \"Constructor call must be the first statement in a constructor\".",
        "Accidentally calling `new ClassName(...)` inside a constructor instead of `this(...)`, creating an unused extra object without initializing the current instance.",
        "Placing this(...) constructor delegation calls after other statements; this() must be the very first statement."
      ],
      "interviewRelevance": "Frequent interview topic: \"Can a constructor call another constructor?\", \"Where must this() be placed?\", and \"Can you call both this() and super() in the same constructor?\" (Answer: No, both must be the first statement).",
      "checkpoints": [
        {
          "id": "java-25-cp-1",
          "label": "Use this(...) to chain constructors and centralize initialization logic"
        },
        {
          "id": "java-25-cp-2",
          "label": "Enforce that this(...) must be the very first statement and cannot be circular"
        },
        {
          "id": "java-25-constructor-overloading-cp-3",
          "label": "Chain constructors efficiently to prevent redundant initialization logic."
        }
      ],
      "practiceExercises": [
        {
          "id": "java-25-ex-1",
          "title": "Identify Illegal Constructor Chaining",
          "difficulty": "Beginner",
          "type": "conceptual",
          "prompt": "Why can a constructor NOT contain both super() and this()? Explain.",
          "solution": "Both `super()` and `this()` are required by the Java Language Specification to be the very first statement in a constructor. Because there can only be one first statement, a constructor cannot contain both. When `this(...)` is called, the target constructor will eventually invoke `super()` in the chain.",
          "explanation": "Enforces an unambiguous, linear constructor hierarchy up to Object."
        },
        {
          "id": "java-25-ex-2",
          "title": "RGB Color Palette Constructor Chaining",
          "difficulty": "Intermediate",
          "type": "coding",
          "prompt": "Write a Color class with constructors for RGB (3 ints), Grayscale (1 int -> r=g=b), and Default (no-arg -> black 0,0,0) using this(...).",
          "solution": "public class Color {\n    private final int r, g, b;\n\n    public Color(int r, int g, int b) {\n        this.r = r; this.g = g; this.b = b;\n    }\n    public Color(int gray) {\n        this(gray, gray, gray);\n    }\n    public Color() {\n        this(0);\n    }\n    public void print() {\n        System.out.println(\"RGB(\" + r + \",\" + g + \",\" + b + \")\");\n    }\n    public static void main(String[] args) {\n        new Color().print();\n        new Color(128).print();\n        new Color(255, 0, 0).print();\n    }\n}",
          "explanation": "The no-arg constructor chains to the single-arg constructor, which chains to the 3-arg master constructor."
        },
        {
          "id": "java-25-ex-3",
          "title": "Detect Circular Constructor Invocation",
          "difficulty": "Advanced",
          "type": "conceptual",
          "prompt": "Given class Node { Node() { this(1); } Node(int x) { this(); } }. What does the compiler report?",
          "solution": "Compile error: \"Recursive constructor invocation Node()\". The Java compiler builds a call graph of constructors; if a cycle is detected, compilation immediately fails to prevent runtime infinite recursion.",
          "explanation": "Static cycle detection prevents stack overflow before execution."
        }
      ],
      "quizQuestions": [
        {
          "id": "java-25-q1",
          "question": "Where must the constructor call `this(...)` be placed inside a constructor?",
          "options": [
            "It can be placed anywhere in the constructor body",
            "It must be the very first statement",
            "It must be the last statement",
            "It must be inside a try-catch block"
          ],
          "correctOptionIndex": 1,
          "explanation": "The Java specification mandates that `this(...)` or `super(...)` must be the first statement in any constructor."
        },
        {
          "id": "java-25-q2",
          "question": "Can a constructor call another constructor using `this(...)` and also call `super(...)` directly?",
          "options": [
            "Yes, if this() is first and super() is second",
            "No, because both must be the first statement",
            "Yes, in Java 17 and above",
            "Only in final classes"
          ],
          "correctOptionIndex": 1,
          "explanation": "Both calls require being the first statement, which is impossible. The target constructor in `this(...)` will handle `super()`."
        }
      ],
      "revisionNotes": [
        "Constructor chaining (`this(...)`) eliminates duplicated initialization code.",
        "`this(...)` must always be the first statement in the constructor.",
        "Circular constructor calls cause a compile-time error."
      ]
    },
    {
      "id": "java-26-this-keyword",
      "moduleId": "java-m3",
      "moduleNumber": 3,
      "moduleTitle": "Object-Oriented Programming",
      "topicNumber": 26,
      "title": "The this Keyword: Disambiguation, Passing & Method Chaining",
      "language": "java",
      "level": "Beginner",
      "whyItMatters": "`this` is an implicit reference to the current executing object instance. Mastering `this` is critical for variable shadowing disambiguation, passing the current object to external services, and implementing fluent Builder patterns.",
      "explanation": "In Java, `this` is a reference variable that refers to the current object whose method or constructor is being invoked. Primary uses of `this`:\n1. Disambiguating Variable Shadowing: When a method or constructor parameter shares the exact same name as an instance field (e.g. `this.name = name;`).\n2. Constructor Chaining: Invoking another constructor in the same class (`this(...)`).\n3. Method Chaining (Fluent Interface / Builder Pattern): Returning `this` from setters allows chaining method calls (`builder.setName(\"X\").setAge(20)`).\n4. Passing `this` as Argument: Passing the current instance to another class or event listener (`eventHandler.register(this)`).\n5. Returning `this` from Enclosing Class: In inner classes, `OuterClass.this` accesses the enclosing instance.\n\nRestriction: `this` CANNOT be used in any static context (static methods, static blocks, static field initializers) because static members exist without an instance.",
      "syntaxAndStructure": "public class Builder {\n    private String data;\n    \n    // 1. Variable shadowing disambiguation\n    public Builder setData(String data) {\n        this.data = data;\n        return this; // 2. Fluent method chaining\n    }\n}",
      "codeExamples": [
        {
          "title": "Fluent Builder Pattern Using return this",
          "code": "public class QueryBuilder {\n    private String table;\n    private String whereClause = \"\";\n    private int limit = 10;\n\n    public QueryBuilder from(String table) {\n        this.table = table;\n        return this; // Return current instance for chaining\n    }\n\n    public QueryBuilder where(String condition) {\n        this.whereClause = \" WHERE \" + condition;\n        return this;\n    }\n\n    public QueryBuilder limit(int limit) {\n        this.limit = limit;\n        return this;\n    }\n\n    public String build() {\n        return \"SELECT * FROM \" + table + whereClause + \" LIMIT \" + limit;\n    }\n\n    public static void main(String[] args) {\n        // Method chaining via 'return this'\n        String sql = new QueryBuilder()\n                .from(\"candidates\")\n                .where(\"score >= 90\")\n                .limit(5)\n                .build();\n        System.out.println(\"Generated SQL: \" + sql);\n    }\n}",
          "expectedOutput": "Generated SQL: SELECT * FROM candidates WHERE score >= 90 LIMIT 5",
          "explanation": "Returning `this` from each configuration method enables fluent method chaining, widely used in modern Java frameworks and builders."
        },
        {
          "title": "Passing this to a Collaborating Class",
          "code": "class EventListener {\n    void onEvent(Button source) {\n        System.out.println(\"Event fired on button: \" + source.getLabel());\n    }\n}\n\npublic class Button {\n    private String label;\n    private EventListener listener;\n\n    public Button(String label, EventListener listener) {\n        this.label = label;\n        this.listener = listener;\n    }\n\n    public String getLabel() { return this.label; }\n\n    public void click() {\n        // Passing 'this' (the current Button instance) to the listener\n        this.listener.onEvent(this);\n    }\n\n    public static void main(String[] args) {\n        EventListener listener = new EventListener();\n        Button btn = new Button(\"Submit Application\", listener);\n        btn.click();\n    }\n}",
          "expectedOutput": "Event fired on button: Submit Application",
          "explanation": "Passing `this` hands a reference of the current object to external callbacks and event dispatchers."
        }
      ],
      "realWorldApplications": [
        "Fluent API design (e.g. `StringBuilder.append().append()`, Stream API builders, Spring WebClient).",
        "Event-driven architectures where component instances register themselves via `register(this)`."
      ],
      "commonMistakes": [
        "Attempting to reference `this` inside a `public static void main` or any static method, causing a compile error.",
        "Omitting `this.` when method parameters shadow instance variables (e.g. `name = name;` assigns the parameter to itself, leaving the instance field null!).",
        "Attempting to use this in a static method or static initializer block."
      ],
      "interviewRelevance": "Frequent interview topic: \"What are all the uses of the this keyword in Java?\" and \"Why does `name = name;` fail to initialize the instance variable?\"",
      "checkpoints": [
        {
          "id": "java-26-cp-1",
          "label": "Use this to disambiguate shadowed instance variables in constructors and setters"
        },
        {
          "id": "java-26-cp-2",
          "label": "Implement method chaining by returning this for fluent interfaces"
        },
        {
          "id": "java-26-this-keyword-cp-3",
          "label": "Use this for shadowing disambiguation, method chaining, and constructor delegation."
        }
      ],
      "practiceExercises": [
        {
          "id": "java-26-ex-1",
          "title": "Shadowing Assignment Trap",
          "difficulty": "Beginner",
          "type": "coding",
          "prompt": "Demonstrate what happens when writing name = name instead of this.name = name in a constructor, and show the fix.",
          "solution": "public class ShadowingTrap {\n    private String name;\n    public ShadowingTrap(String name) {\n        name = name; // BUG: Assigns parameter to itself!\n    }\n    public String getName() { return this.name; }\n    public static void main(String[] args) {\n        ShadowingTrap obj = new ShadowingTrap(\"Alice\");\n        System.out.println(\"Result without this: \" + obj.getName()); // null\n    }\n}",
          "explanation": "Without `this.`, the compiler resolves the closest scoped variable (the local parameter), ignoring the instance field."
        },
        {
          "id": "java-26-ex-2",
          "title": "Fluent Math Calculator",
          "difficulty": "Intermediate",
          "type": "coding",
          "prompt": "Create a Calculator class supporting chained operations: new Calculator(10).add(5).multiply(2).getResult().",
          "solution": "public class FluentCalculator {\n    private double val;\n    public FluentCalculator(double v) { this.val = v; }\n    public FluentCalculator add(double x) { this.val += x; return this; }\n    public FluentCalculator multiply(double x) { this.val *= x; return this; }\n    public double getResult() { return this.val; }\n    public static void main(String[] args) {\n        double res = new FluentCalculator(10).add(5).multiply(2).getResult();\n        System.out.println(\"Result: \" + res);\n    }\n}",
          "explanation": "Each arithmetic method updates internal state and returns `this`, allowing continuous chained operations."
        },
        {
          "id": "java-26-ex-3",
          "title": "Inner Class Outer.this Reference",
          "difficulty": "Advanced",
          "type": "coding",
          "prompt": "Write an inner class that accesses a shadowed variable of the outer class using Outer.this.x syntax.",
          "solution": "public class Outer {\n    private int x = 100;\n    class Inner {\n        private int x = 200;\n        void printBoth() {\n            System.out.println(\"Inner x: \" + this.x);\n            System.out.println(\"Outer x: \" + Outer.this.x);\n        }\n    }\n    public static void main(String[] args) {\n        new Outer().new Inner().printBoth();\n    }\n}",
          "explanation": "Outer.this explicitly resolves the enclosing outer instance when inner and outer fields collide."
        }
      ],
      "quizQuestions": [
        {
          "id": "java-26-q1",
          "question": "Which of the following is NOT a valid use of the `this` keyword in Java?",
          "options": [
            "Calling a constructor in the same class: this(...)",
            "Referring to an instance variable: this.variable",
            "Accessing a local variable from inside a static method: this.staticVar",
            "Returning the current object reference from a method: return this;"
          ],
          "correctOptionIndex": 2,
          "explanation": "`this` cannot be used in any static method or static context because static methods execute without an instance."
        },
        {
          "id": "java-26-q2",
          "question": "How do you refer to the enclosing outer class instance from a non-static inner class when variables share names?",
          "options": [
            "super.this",
            "OuterClass.this",
            "this.outer",
            "enclosing.this"
          ],
          "correctOptionIndex": 1,
          "explanation": "`OuterClass.this` explicitly qualifies the outer class instance reference from within an inner class."
        }
      ],
      "revisionNotes": [
        "`this` represents the current instance of the class.",
        "`this` disambiguates variable shadowing between fields and parameters.",
        "`return this;` powers fluent method chaining and the Builder pattern."
      ]
    },
    {
      "id": "java-27-inheritance",
      "moduleId": "java-m3",
      "moduleNumber": 3,
      "moduleTitle": "Object-Oriented Programming",
      "topicNumber": 27,
      "title": "Inheritance, the extends Keyword & IS-A Hierarchy",
      "language": "java",
      "level": "Beginner",
      "whyItMatters": "Inheritance is the OOP mechanism for code reuse and hierarchical categorization. Understanding why Java supports single class inheritance and how the IS-A relationship functions prevents fragile base class anti-patterns.",
      "explanation": "Inheritance in Java allows a subclass to acquire the fields and methods of a superclass using the `extends` keyword.\nCore Concepts:\n1. IS-A Relationship: If `Dog extends Animal`, then a Dog IS-A Animal. An instance of Dog can be assigned to an Animal reference variable.\n2. Single Inheritance for Classes: In Java, a class can extend AT MOST ONE direct superclass (`class C extends A, B` is FORBIDDEN). This deliberately eliminates the \"Diamond Problem\" of multiple inheritance found in C++.\n3. Types of Inheritance in Java:\n   - Single: A -> B\n   - Multilevel: A -> B -> C\n   - Hierarchical: A -> B and A -> C\n   - (Multiple inheritance is supported strictly through Interfaces).\n4. All classes in Java implicitly inherit from `java.lang.Object` (the ultimate root of the class hierarchy).\n5. What is inherited? Public and protected members are inherited. Package-private members are inherited only within the same package. Private members and constructors are NEVER inherited.",
      "syntaxAndStructure": "// Superclass (Parent)\npublic class Vehicle {\n    protected String brand;\n    public void start() { System.out.println(\"Starting engine\"); }\n}\n\n// Subclass (Child) using extends\npublic class ElectricCar extends Vehicle {\n    private int batteryCapacity;\n    public void charge() { System.out.println(\"Charging battery\"); }\n}",
      "codeExamples": [
        {
          "title": "Single and Multilevel Inheritance Demonstration",
          "code": "class Device {\n    void powerOn() {\n        System.out.println(\"Device power on.\");\n    }\n}\n\nclass Computer extends Device {\n    void bootOS() {\n        System.out.println(\"Operating system booted.\");\n    }\n}\n\nclass Laptop extends Computer {\n    void foldScreen() {\n        System.out.println(\"Laptop screen folded.\");\n    }\n}\n\npublic class MultilevelInheritanceDemo {\n    public static void main(String[] args) {\n        Laptop myLaptop = new Laptop();\n        // Inherited from Device (Grandparent)\n        myLaptop.powerOn();\n        // Inherited from Computer (Parent)\n        myLaptop.bootOS();\n        // Native to Laptop (Child)\n        myLaptop.foldScreen();\n\n        // Polymorphic reference check\n        System.out.println(\"Is Laptop a Device (IS-A): \" + (myLaptop instanceof Device));\n    }\n}",
          "expectedOutput": "Device power on.\nOperating system booted.\nLaptop screen folded.\nIs Laptop a Device (IS-A): true",
          "explanation": "Multilevel inheritance passes down public/protected behaviors from Device -> Computer -> Laptop. Laptop is transitively an instance of Device."
        },
        {
          "title": "Private Member Non-Inheritance Demonstration",
          "code": "class BankVault {\n    private String secretCombination = \"9876\"; // Private: NOT inherited\n    protected String vaultId = \"VAULT_A\";       // Protected: Inherited\n\n    public String getVaultId() { return vaultId; }\n}\n\npublic class SecurityBranch extends BankVault {\n    public void printAccess() {\n        System.out.println(\"Accessing: \" + vaultId);\n        // System.out.println(secretCombination); // COMPILE ERROR: private in BankVault\n    }\n\n    public static void main(String[] args) {\n        SecurityBranch branch = new SecurityBranch();\n        branch.printAccess();\n    }\n}",
          "expectedOutput": "Accessing: VAULT_A",
          "explanation": "Subclasses cannot access private members of the parent directly, preserving strict data encapsulation across inheritance tiers."
        }
      ],
      "realWorldApplications": [
        "Class hierarchies in GUI frameworks (Component -> Container -> Window -> Frame).",
        "Exception hierarchy modeling (`Throwable` -> `Exception` -> `RuntimeException` -> `IllegalArgumentException`)."
      ],
      "commonMistakes": [
        "Attempting multiple class inheritance (`class C extends A, B`); Java allows multiple interfaces, but only a single parent class.",
        "Using inheritance solely for code reuse when there is no genuine IS-A relationship; favor composition instead.",
        "Attempting multiple class inheritance (class A extends B, C) which is prohibited in Java."
      ],
      "interviewRelevance": "Universal interview question: \"Why does Java not support multiple inheritance with classes?\" (Answer: Diamond problem, ambiguity in method resolution and object layout).",
      "checkpoints": [
        {
          "id": "java-27-cp-1",
          "label": "Explain why Java limits classes to single inheritance using the Diamond Problem argument"
        },
        {
          "id": "java-27-cp-2",
          "label": "Identify what members are and are not inherited by subclasses"
        },
        {
          "id": "java-27-inheritance-cp-3",
          "label": "Model valid \"is-a\" relationships and reuse superclass functionality appropriately."
        }
      ],
      "practiceExercises": [
        {
          "id": "java-27-ex-1",
          "title": "Model Employee and Manager Hierarchy",
          "difficulty": "Beginner",
          "type": "coding",
          "prompt": "Create a base class Employee (name, salary) and a subclass Manager (bonus, totalCompensation()).",
          "solution": "class Employee {\n    protected String name;\n    protected double salary;\n    public Employee(String n, double s) { this.name = n; this.salary = s; }\n}\n\nclass Manager extends Employee {\n    private double bonus;\n    public Manager(String n, double s, double b) {\n        super(n, s);\n        this.bonus = b;\n    }\n    public double totalCompensation() { return salary + bonus; }\n}\n\npublic class HierarchyTest {\n    public static void main(String[] args) {\n        Manager m = new Manager(\"Alice\", 100000, 25000);\n        System.out.println(\"Total: \" + m.totalCompensation());\n    }\n}",
          "explanation": "Manager extends Employee and augments base state with a bonus calculation."
        },
        {
          "id": "java-27-ex-2",
          "title": "The Diamond Problem in Multiple Inheritance",
          "difficulty": "Intermediate",
          "type": "conceptual",
          "prompt": "Draw and explain the Diamond Problem in C++ and why Java avoided it for classes.",
          "solution": "Suppose Class A has void display(). Classes B and C extend A and each override display(). Class D extends both B and C. If D calls display(), which version should execute? B's or C's? In C++, this causes ambiguity, duplicate state copies, and requires virtual base classes. Java deliberately prevented this by allowing only single class inheritance.",
          "explanation": "Single inheritance eliminates method dispatch ambiguity and duplicate superclass state in memory."
        },
        {
          "id": "java-27-ex-3",
          "title": "Verifying java.lang.Object Methods",
          "difficulty": "Advanced",
          "type": "coding",
          "prompt": "Demonstrate that any bare class `class Empty {}` inherits toString(), hashCode(), and getClass() from java.lang.Object.",
          "solution": "class EmptyClass {}\n\npublic class ObjectRootDemo {\n    public static void main(String[] args) {\n        EmptyClass obj = new EmptyClass();\n        System.out.println(\"Class name from Object: \" + obj.getClass().getSimpleName());\n        System.out.println(\"HashCode from Object is non-zero: \" + (obj.hashCode() != 0));\n        System.out.println(\"Is instance of Object: \" + (obj instanceof Object));\n    }\n}",
          "explanation": "Every class in Java implicitly extends java.lang.Object, inheriting 11 core methods (equals, hashCode, toString, wait, notify, etc.)."
        }
      ],
      "quizQuestions": [
        {
          "id": "java-27-q1",
          "question": "Which of the following members of a superclass are NEVER inherited by a subclass in Java?",
          "options": [
            "Constructors",
            "Public methods",
            "Protected fields",
            "Package-private fields in the same package"
          ],
          "correctOptionIndex": 0,
          "explanation": "Constructors are specific to the class that defines them and are never inherited by subclasses (they can only be invoked via super())."
        },
        {
          "id": "java-27-q2",
          "question": "What is the maximum number of classes that a Java class can directly extend using the `extends` keyword?",
          "options": [
            "0",
            "1",
            "2",
            "Unlimited"
          ],
          "correctOptionIndex": 1,
          "explanation": "Java supports single class inheritance: a class can directly extend at most one superclass."
        }
      ],
      "revisionNotes": [
        "Inheritance establishes an IS-A relationship using the `extends` keyword.",
        "Java classes support single inheritance only, eliminating the Diamond Problem.",
        "All classes in Java implicitly inherit from `java.lang.Object`."
      ]
    },
    {
      "id": "java-28-super-keyword",
      "moduleId": "java-m3",
      "moduleNumber": 3,
      "moduleTitle": "Object-Oriented Programming",
      "topicNumber": 28,
      "title": "The super Keyword: Fields, Methods & super() Constructors",
      "language": "java",
      "level": "Beginner",
      "whyItMatters": "`super` is the bridge between a child class and its parent. Understanding how `super()` constructor invocation links the object hierarchy and how to call overridden parent methods is essential for all OOP design.",
      "explanation": "The `super` keyword in Java is a reference variable used to access members of the immediate superclass. Three primary uses of `super`:\n1. Invoking Superclass Constructors: `super(...)` invokes the parent class constructor.\n   - Must be the very first statement in the child constructor.\n   - If neither `super(...)` nor `this(...)` is written explicitly, the compiler automatically inserts `super();` (calling the parent no-arg constructor).\n   - If the parent class has NO no-arg constructor, the child constructor MUST explicitly invoke a parameterized `super(...)`.\n2. Accessing Hidden Superclass Fields: When a child class declares a field with the same name as a parent field, `super.fieldName` accesses the parent version.\n3. Calling Overridden Superclass Methods: `super.methodName()` allows a child class to extend or reuse parent behavior rather than completely replacing it.",
      "syntaxAndStructure": "public class Child extends Parent {\n    public Child(int data) {\n        super(data); // 1. Must be first statement\n    }\n\n    @Override\n    public void display() {\n        super.display(); // 2. Call parent overridden method\n        System.out.println(\"Child extensions\");\n    }\n}",
      "codeExamples": [
        {
          "title": "Constructor Chaining to Parent via super()",
          "code": "class BaseAccount {\n    private String accountNumber;\n    protected double balance;\n\n    public BaseAccount(String accNo, double initialBalance) {\n        this.accountNumber = accNo;\n        this.balance = initialBalance;\n        System.out.println(\"BaseAccount initialized: \" + accNo);\n    }\n}\n\nclass SavingsAccount extends BaseAccount {\n    private double interestRate;\n\n    public SavingsAccount(String accNo, double balance, double rate) {\n        super(accNo, balance); // Explicit super() call passing arguments to parent\n        this.interestRate = rate;\n        System.out.println(\"SavingsAccount initialized with rate: \" + rate + \"%\");\n    }\n}\n\npublic class SuperConstructorDemo {\n    public static void main(String[] args) {\n        SavingsAccount sa = new SavingsAccount(\"SA-1001\", 5000.0, 4.5);\n        System.out.println(\"Account ready.\");\n    }\n}",
          "expectedOutput": "BaseAccount initialized: SA-1001\nSavingsAccount initialized with rate: 4.5%\nAccount ready.",
          "explanation": "SavingsAccount calls `super(accNo, balance)` as its first statement. The BaseAccount constructor executes completely before the child constructor continues."
        },
        {
          "title": "Calling Overridden Method via super.method()",
          "code": "class TextFormatter {\n    public String format(String text) {\n        return text.trim();\n    }\n}\n\nclass UpperCaseFormatter extends TextFormatter {\n    @Override\n    public String format(String text) {\n        // Calls parent method first to trim, then applies child transformation\n        String clean = super.format(text);\n        return clean.toUpperCase();\n    }\n}\n\npublic class SuperMethodDemo {\n    public static void main(String[] args) {\n        TextFormatter formatter = new UpperCaseFormatter();\n        System.out.println(\"Result: '\" + formatter.format(\"   hello world   \") + \"'\");\n    }\n}",
          "expectedOutput": "Result: 'HELLO WORLD'",
          "explanation": "super.format(text) delegates base whitespace trimming to the parent class before the child transforms it to uppercase."
        }
      ],
      "realWorldApplications": [
        "Hook method extensions in UI components (e.g. `super.paintComponent(g)` in Swing/JavaFX).",
        "Entity lifecycle hooks in JPA/Hibernate (e.g. calling `super.prePersist()` to populate audit timestamps)."
      ],
      "commonMistakes": [
        "Failing to call `super(args)` when the superclass has no default no-arg constructor, resulting in a compile error.",
        "Placing code before `super(...)` in a constructor; it must be the very first statement.",
        "Calling super() constructor explicitly after other executable statements in a subclass constructor."
      ],
      "interviewRelevance": "Frequent placement trap: \"What happens if a parent class only defines a parameterized constructor, and the child class defines a no-arg constructor without calling super(args)?\" (Answer: Compile error).",
      "checkpoints": [
        {
          "id": "java-28-cp-1",
          "label": "Explain how compiler-generated super() operates when omitted"
        },
        {
          "id": "java-28-cp-2",
          "label": "Use super to call parent constructors and parent overridden methods"
        },
        {
          "id": "java-28-super-keyword-cp-3",
          "label": "Access overridden superclass methods and invoke superclass constructors using super."
        }
      ],
      "practiceExercises": [
        {
          "id": "java-28-ex-1",
          "title": "Fix Missing Parent Constructor Error",
          "difficulty": "Beginner",
          "type": "coding",
          "prompt": "Given class Parent { Parent(int x){} }. Fix class Child extends Parent { Child(){} } so it compiles.",
          "solution": "class Parent {\n    Parent(int x) {}\n}\n\nclass Child extends Parent {\n    Child() {\n        super(0); // Explicitly invoke existing parent constructor\n    }\n}\n\npublic class FixSuper {\n    public static void main(String[] args) {\n        new Child();\n        System.out.println(\"Child successfully compiled and instantiated.\");\n    }\n}",
          "explanation": "Because Parent has no no-arg constructor, Child must explicitly pass arguments via super(0)."
        },
        {
          "id": "java-28-ex-2",
          "title": "Access Hidden Parent Field with super",
          "difficulty": "Intermediate",
          "type": "coding",
          "prompt": "Create Parent and Child both declaring `int value = 10` and `int value = 20`. Write a child method that prints both.",
          "solution": "class SuperVal {\n    int value = 10;\n}\n\nclass SubVal extends SuperVal {\n    int value = 20;\n\n    void printBoth() {\n        System.out.println(\"Child value: \" + this.value);\n        System.out.println(\"Parent value: \" + super.value);\n    }\n}\n\npublic class FieldHidingTest {\n    public static void main(String[] args) {\n        new SubVal().printBoth();\n    }\n}",
          "explanation": "Fields in Java do not participate in polymorphism; they are hidden. `super.value` accesses the parent field."
        },
        {
          "id": "java-28-ex-3",
          "title": "Super in Multilevel Inheritance Hierarchy",
          "difficulty": "Advanced",
          "type": "conceptual",
          "prompt": "Can a grandchild class invoke a grandparent method using super.super.method()? Explain Java's syntax rule.",
          "solution": "No, `super.super.method()` is strictly illegal syntax in Java. Java enforces strict encapsulation of inheritance layers; a subclass can only communicate directly with its immediate superclass. Bypassing the immediate parent to call grandparent methods would break the parent's encapsulation contract.",
          "explanation": "Java disallows super.super to preserve encapsulation boundaries between adjacent inheritance tiers."
        }
      ],
      "quizQuestions": [
        {
          "id": "java-28-q1",
          "question": "If a child constructor does NOT explicitly contain `this(...)` or `super(...)`, what does the compiler automatically insert?",
          "options": [
            "Nothing",
            "`super();` calling the parent no-arg constructor as the first statement",
            "`this();` calling the child default constructor",
            "A call to `Object();` directly"
          ],
          "correctOptionIndex": 1,
          "explanation": "The compiler automatically inserts a parameterless `super();` call as the first line of any constructor that lacks explicit chaining."
        },
        {
          "id": "java-28-q2",
          "question": "Can `super.method()` be used inside a static method?",
          "options": [
            "Yes, if the parent method is also static",
            "No, super cannot be referenced from a static context",
            "Only if the class is public",
            "Yes, using ClassName.super.method()"
          ],
          "correctOptionIndex": 1,
          "explanation": "Like `this`, `super` requires an active object instance context and is strictly prohibited in static methods."
        }
      ],
      "revisionNotes": [
        "`super(...)` invokes the immediate parent constructor and must be the first statement.",
        "If not written, the compiler automatically inserts `super();`.",
        "`super.method()` allows a subclass to augment rather than replace parent behavior."
      ]
    },
    {
      "id": "java-29-method-overriding",
      "moduleId": "java-m3",
      "moduleNumber": 3,
      "moduleTitle": "Object-Oriented Programming",
      "topicNumber": 29,
      "title": "Method Overriding, @Override & Covariant Return Types",
      "language": "java",
      "level": "Beginner",
      "whyItMatters": "Method overriding enables dynamic polymorphism, allowing subclasses to provide specific implementations of base abstractions. Mastering the strict overriding rules regarding access modifiers, checked exceptions, and covariant return types is tested in every technical interview.",
      "explanation": "Method Overriding occurs when a subclass provides a specific implementation of a method already declared in its superclass.\nRules for Overriding:\n1. Signature Match: Method name and parameter list must be EXACTLY identical.\n2. Covariant Return Types (Java 5+): The child return type must be the SAME type, or a SUBTYPE (subclass) of the return type declared in the parent method.\n3. Access Modifier Rule: The overriding method CANNOT reduce visibility (cannot make it more restrictive). For example, if parent is `protected`, child can be `protected` or `public`, but NOT `private` or `default`.\n4. Checked Exception Rule: The overriding method CANNOT throw new or broader checked exceptions. It can throw fewer checked exceptions, narrower (subclass) checked exceptions, or any unchecked exceptions.\n5. Methods that CANNOT be Overridden:\n   - `final` methods\n   - `static` methods (they are hidden, not overridden)\n   - `private` methods (not visible to subclass)\n6. The `@Override` Annotation: Informs the compiler of overriding intent; the compiler generates a build error if the signature does not actually override a parent method.",
      "syntaxAndStructure": "class SuperClass {\n    protected Number compute() throws IOException { return 10; }\n}\n\nclass SubClass extends SuperClass {\n    // Valid Override:\n    // 1. Visibility expanded: protected -> public\n    // 2. Covariant return type: Number -> Integer\n    // 3. Exception narrowed: IOException -> FileNotFoundException\n    @Override\n    public Integer compute() throws FileNotFoundException { return 42; }\n}",
      "codeExamples": [
        {
          "title": "Covariant Return Types in Action",
          "code": "class ShapeProducer {\n    public Object produce() {\n        return \"Generic Object\";\n    }\n}\n\nclass CircleProducer extends ShapeProducer {\n    // Covariant return type: String is a subtype of Object\n    @Override\n    public String produce() {\n        return \"Circle Shape\";\n    }\n}\n\npublic class CovariantReturnDemo {\n    public static void main(String[] args) {\n        CircleProducer producer = new CircleProducer();\n        // Caller gets specific String type directly without casting!\n        String shape = producer.produce();\n        System.out.println(\"Produced: \" + shape);\n\n        // Polymorphic reference\n        ShapeProducer base = producer;\n        System.out.println(\"Polymorphic call: \" + base.produce());\n    }\n}",
          "expectedOutput": "Produced: Circle Shape\nPolymorphic call: Circle Shape",
          "explanation": "Covariant return types allow CircleProducer.produce() to return String instead of Object, eliminating explicit type casts for clients."
        },
        {
          "title": "Verifying Access Modifier and Exception Overriding Rules",
          "code": "import java.io.IOException;\n\nclass BaseService {\n    // protected visibility, throws checked IOException\n    protected void execute() throws IOException {\n        System.out.println(\"BaseService executed\");\n    }\n}\n\nclass ChildService extends BaseService {\n    // Valid override:\n    // 1. Widened access from protected to public\n    // 2. Throws no checked exceptions (narrower than IOException)\n    @Override\n    public void execute() {\n        System.out.println(\"ChildService executed without checked exception\");\n    }\n}\n\npublic class OverrideRulesDemo {\n    public static void main(String[] args) {\n        BaseService service = new ChildService();\n        try {\n            service.execute(); // Resolved polymorphically to ChildService\n        } catch (IOException e) {\n            System.out.println(\"Error handled\");\n        }\n    }\n}",
          "expectedOutput": "ChildService executed without checked exception",
          "explanation": "ChildService broadens access (protected to public) and eliminates the checked exception, adhering strictly to Liskov Substitution Principle rules."
        }
      ],
      "realWorldApplications": [
        "Overriding `equals()`, `hashCode()`, and `toString()` in entity and domain model classes.",
        "Framework template methods where base classes define workflows and subclasses implement custom algorithms."
      ],
      "commonMistakes": [
        "Accidentally overloading instead of overriding (e.g. parent has `boolean equals(Object o)` and child writes `boolean equals(Person p)`). Always use `@Override` to catch this!",
        "Trying to throw a broader checked exception (e.g. parent throws `SQLException` and child throws `Exception`), triggering a compile error.",
        "Attempting to override a static method; static methods are hidden, not overridden dynamically."
      ],
      "interviewRelevance": "High-yield interview topic: \"What are covariant return types?\", \"What are the rules for checked exceptions in overriding?\", and \"Can you override a private method?\"",
      "checkpoints": [
        {
          "id": "java-29-cp-1",
          "label": "Understand the 4 overriding rules: signatures, covariant returns, visibility, and exceptions"
        },
        {
          "id": "java-29-cp-2",
          "label": "Use @Override annotation on every overridden method to enforce compile-time verification"
        },
        {
          "id": "java-29-method-overriding-cp-3",
          "label": "Apply @Override annotation and adhere to covariant return type rules."
        }
      ],
      "practiceExercises": [
        {
          "id": "java-29-ex-1",
          "title": "Identify Invalid Exception Overriding",
          "difficulty": "Beginner",
          "type": "conceptual",
          "prompt": "Parent has void run() throws FileNotFoundException. Child overrides void run() throws IOException. Does this compile? Why?",
          "solution": "Compile error. In Java, an overriding method cannot declare broader (more general) checked exceptions than the method it overrides. Because IOException is the superclass of FileNotFoundException, the child method is attempting to throw a broader exception, violating the Liskov Substitution Principle.",
          "explanation": "Overriding methods can only throw narrower, fewer, or identical checked exceptions."
        },
        {
          "id": "java-29-ex-2",
          "title": "Cloneable Covariant Return Type Pattern",
          "difficulty": "Intermediate",
          "type": "coding",
          "prompt": "Implement a clone() method in class Document where the return type is Document instead of Object.",
          "solution": "public class Document implements Cloneable {\n    private String title;\n    public Document(String t) { this.title = t; }\n\n    @Override\n    public Document clone() {\n        try {\n            return (Document) super.clone(); // Covariant return type Document!\n        } catch (CloneNotSupportedException e) {\n            throw new AssertionError();\n        }\n    }\n    public static void main(String[] args) {\n        Document d1 = new Document(\"System Architecture\");\n        Document d2 = d1.clone(); // No cast needed by caller!\n        System.out.println(\"Cloned title: \" + d2.title);\n    }\n}",
          "explanation": "Covariant return type allows clone() to return Document directly rather than Object."
        },
        {
          "id": "java-29-ex-3",
          "title": "Virtual Method Table (vtable) Resolution",
          "difficulty": "Advanced",
          "type": "conceptual",
          "prompt": "How does the JVM execute overridden methods at runtime using the Virtual Method Table (vtable)?",
          "solution": "Each class loaded by the JVM has an associated Virtual Method Table (vtable) containing pointers to the memory addresses of its instance methods. When a subclass overrides a method, its vtable slot for that method index is updated to point to the subclass implementation. At runtime, the JVM opcode `invokevirtual` indexes into the vtable of the actual runtime object, achieving dynamic method dispatch in O(1) time.",
          "explanation": "The vtable enables constant-time dynamic dispatch for virtual method invocation."
        }
      ],
      "quizQuestions": [
        {
          "id": "java-29-q1",
          "question": "Which of the following is TRUE regarding the access modifier of an overriding method?",
          "options": [
            "It must have strictly narrower visibility than the parent method",
            "It can have the same or wider visibility, but cannot reduce visibility",
            "It must always be public",
            "It must have the exact same visibility as the parent method"
          ],
          "correctOptionIndex": 1,
          "explanation": "An overriding method cannot reduce visibility (e.g. protected can become public, but cannot become private or default)."
        },
        {
          "id": "java-29-q2",
          "question": "What is a \"covariant return type\" in Java?",
          "options": [
            "A return type that changes dynamically at runtime",
            "An overriding method returning a subtype of the return type declared in the parent method",
            "A method returning multiple values",
            "A return type that must be void"
          ],
          "correctOptionIndex": 1,
          "explanation": "Covariant return types allow a subclass method to return a more specific subclass of the parent method's return type."
        }
      ],
      "revisionNotes": [
        "Overriding requires identical name and parameters.",
        "Overriding methods can have covariant return types (subtypes) and wider access.",
        "Overriding methods cannot throw new or broader checked exceptions."
      ]
    },
    {
      "id": "java-30-polymorphism",
      "moduleId": "java-m3",
      "moduleNumber": 3,
      "moduleTitle": "Object-Oriented Programming",
      "topicNumber": 30,
      "title": "Polymorphism: Dynamic Method Dispatch & Runtime Binding",
      "language": "java",
      "level": "Beginner",
      "whyItMatters": "Polymorphism (\"many forms\") enables writing extensible, loosely-coupled code where callers interact with abstract parent types while runtime execution automatically delegates to the concrete child implementations.",
      "explanation": "Java supports two forms of polymorphism:\n1. Compile-Time Polymorphism (Static Binding / Early Binding): Method Overloading. The compiler selects the method to execute at compile-time based on static reference types.\n2. Runtime Polymorphism (Dynamic Binding / Late Binding / Dynamic Method Dispatch): Method Overriding.\n   - An overridden method is invoked through a superclass reference variable (e.g. `Animal a = new Dog(); a.makeSound();`).\n   - Java determines which method implementation to execute at RUNTIME based on the actual object type in Heap memory, not the reference type!\n   - All non-static, non-final, non-private methods in Java are virtual by default.\n   - Variables/Fields DO NOT participate in polymorphism! Field access is always resolved at compile time based on the reference type.",
      "syntaxAndStructure": "// Polymorphic assignment:\nSuperType ref = new ConcreteSubType();\n\n// Method call: Resolved dynamically at runtime (Dynamic Dispatch)\nref.execute();\n\n// Field access: Resolved at compile time based on SuperType reference!\nint val = ref.field;",
      "codeExamples": [
        {
          "title": "Dynamic Method Dispatch in Heterogeneous Collections",
          "code": "import java.util.List;\n\nabstract class Notification {\n    abstract void send(String message);\n}\n\nclass EmailNotification extends Notification {\n    void send(String message) {\n        System.out.println(\"Email Sent: \" + message);\n    }\n}\n\nclass SMSNotification extends Notification {\n    void send(String message) {\n        System.out.println(\"SMS Sent: \" + message);\n    }\n}\n\npublic class DynamicDispatchDemo {\n    public static void main(String[] args) {\n        // Heterogeneous collection of Notification abstractions\n        List<Notification> channels = List.of(new EmailNotification(), new SMSNotification());\n\n        // Dynamic dispatch: JVM selects appropriate send() at runtime for each object\n        for (Notification channel : channels) {\n            channel.send(\"Placement Preparation Active!\");\n        }\n    }\n}",
          "expectedOutput": "Email Sent: Placement Preparation Active!\nSMS Sent: Placement Preparation Active!",
          "explanation": "The caller iterates over abstract Notification references. The JVM dynamically dispatches send() to the concrete EmailNotification or SMSNotification at runtime."
        },
        {
          "title": "Demonstrating that Fields Do NOT Participate in Polymorphism",
          "code": "class ParentEntity {\n    String type = \"PARENT\";\n    public String getType() { return type; }\n}\n\nclass ChildEntity extends ParentEntity {\n    String type = \"CHILD\"; // Hides parent field\n    @Override\n    public String getType() { return type; }\n}\n\npublic class FieldPolymorphismDemo {\n    public static void main(String[] args) {\n        ParentEntity entity = new ChildEntity();\n\n        // Field access: resolved by REFERENCE type at compile time!\n        System.out.println(\"Direct field access (entity.type): \" + entity.type);\n\n        // Method access: resolved by OBJECT type at runtime!\n        System.out.println(\"Method call (entity.getType()): \" + entity.getType());\n    }\n}",
          "expectedOutput": "Direct field access (entity.type): PARENT\nMethod call (entity.getType()): CHILD",
          "explanation": "Fields in Java do not exhibit polymorphic behavior; entity.type resolves to ParentEntity.type at compile-time. Methods exhibit polymorphism, so entity.getType() resolves to ChildEntity.getType()."
        }
      ],
      "realWorldApplications": [
        "Plugin architectures and JDBC driver managers (interacting via `java.sql.Connection` regardless of Postgres, MySQL, or Oracle).",
        "Payment gateways (CreditCardPayment, PayPalPayment, UPIPayment implementing `PaymentStrategy`)."
      ],
      "commonMistakes": [
        "Expecting fields to be polymorphic; always use getter methods to access polymorphic properties.",
        "Downcasting without checking `instanceof`, resulting in `ClassCastException` at runtime.",
        "Attempting to downcast an object without checking instanceof, resulting in ClassCastException at runtime."
      ],
      "interviewRelevance": "Universal interview question: \"What is dynamic method dispatch?\", \"Do variables participate in polymorphism?\", and \"Explain static binding vs dynamic binding.\"",
      "checkpoints": [
        {
          "id": "java-30-cp-1",
          "label": "Distinguish compile-time binding (overloading) from runtime dynamic dispatch (overriding)"
        },
        {
          "id": "java-30-cp-2",
          "label": "Prove that methods are polymorphic while fields are resolved by reference type"
        },
        {
          "id": "java-30-polymorphism-cp-3",
          "label": "Explain dynamic method dispatch and virtual method table (vtable) resolution."
        }
      ],
      "practiceExercises": [
        {
          "id": "java-30-ex-1",
          "title": "Payment Processor Polymorphic Dispatch",
          "difficulty": "Beginner",
          "type": "coding",
          "prompt": "Create an interface PaymentMethod with void pay(double amount). Implement CreditCard and UPI classes and process payments polymorphically.",
          "solution": "interface PaymentMethod {\n    void pay(double amount);\n}\nclass CreditCard implements PaymentMethod {\n    public void pay(double amt) { System.out.println(\"Paid \" + amt + \" via Card\"); }\n}\nclass UPI implements PaymentMethod {\n    public void pay(double amt) { System.out.println(\"Paid \" + amt + \" via UPI\"); }\n}\npublic class PaymentTest {\n    public static void process(PaymentMethod pm, double amt) { pm.pay(amt); }\n    public static void main(String[] args) {\n        process(new CreditCard(), 100.0);\n        process(new UPI(), 50.0);\n    }\n}",
          "explanation": "process() accepts any PaymentMethod abstraction without coupling to concrete payment providers."
        },
        {
          "id": "java-30-ex-2",
          "title": "Safe Downcasting with instanceof Pattern Matching",
          "difficulty": "Intermediate",
          "type": "coding",
          "prompt": "Demonstrate safe downcasting using modern Java 16+ pattern matching for instanceof.",
          "solution": "public class PatternMatchingDemo {\n    public static void printLength(Object obj) {\n        // Modern Java 16+ pattern matching: checks AND casts in one step!\n        if (obj instanceof String s) {\n            System.out.println(\"String length: \" + s.length());\n        } else {\n            System.out.println(\"Not a string\");\n        }\n    }\n    public static void main(String[] args) {\n        printLength(\"Hello Placement 2026\");\n        printLength(12345);\n    }\n}",
          "explanation": "`if (obj instanceof String s)` eliminates verbose, error-prone manual casting `String s = (String) obj`."
        },
        {
          "id": "java-30-ex-3",
          "title": "Static vs Dynamic Binding in JVM Opcodes",
          "difficulty": "Advanced",
          "type": "conceptual",
          "prompt": "Differentiate the JVM opcodes invokevirtual, invokestatic, and invokespecial.",
          "solution": "1. `invokestatic`: Invokes static methods; bound at compile time without instance check.\n2. `invokespecial`: Invokes private methods, constructors, and super.method() calls; bound at compile time (no dynamic dispatch needed).\n3. `invokevirtual`: Invokes standard public/protected instance methods; performs dynamic method dispatch at runtime via the vtable.\n4. `invokeinterface`: Invokes interface methods using itable dynamic lookup.",
          "explanation": "The JVM instruction set explicitly differentiates static binding from dynamic dispatch."
        }
      ],
      "quizQuestions": [
        {
          "id": "java-30-q1",
          "question": "Do instance variables in Java participate in runtime polymorphism?",
          "options": [
            "Yes, instance variables are dynamically dispatched like methods",
            "No, field access is resolved at compile time based on the reference type",
            "Only if fields are marked public",
            "Only in Java 21 and above"
          ],
          "correctOptionIndex": 1,
          "explanation": "Fields in Java do not participate in polymorphism. Field accesses are resolved statically at compile time based on the declared reference type."
        },
        {
          "id": "java-30-q2",
          "question": "What JVM opcode is used to execute regular polymorphic instance methods?",
          "options": [
            "invokestatic",
            "invokespecial",
            "invokevirtual",
            "invokedynamic"
          ],
          "correctOptionIndex": 2,
          "explanation": "`invokevirtual` performs dynamic method dispatch using the runtime object's vtable."
        }
      ],
      "revisionNotes": [
        "Runtime polymorphism uses dynamic method dispatch based on the actual object on the heap.",
        "Variables/fields are NOT polymorphic; they are resolved at compile time by reference type.",
        "All non-static, non-final, non-private methods in Java are virtual by default."
      ]
    },
    {
      "id": "java-31-encapsulation",
      "moduleId": "java-m3",
      "moduleNumber": 3,
      "moduleTitle": "Object-Oriented Programming",
      "topicNumber": 31,
      "title": "Encapsulation, Data Hiding & Defensive Copying",
      "language": "java",
      "level": "Beginner",
      "whyItMatters": "Encapsulation bundles data with the methods that operate on it and restricts direct access to internal state. Without defensive copying, even private final fields can be corrupted externally, breaking class invariants.",
      "explanation": "Encapsulation is the OOP principle of bundling data (fields) and code (methods) together into a single unit while restricting direct external access (data hiding).\nCore Practices:\n1. Private Fields: Mark all instance fields `private`.\n2. Validating Accessors: Provide `public` getter and setter methods that validate data integrity (e.g. rejecting negative age).\n3. Class Invariants: Invariants are conditions that must always hold true for an object to be valid. Encapsulation guarantees invariants cannot be bypassed.\n4. Defensive Copying: When getters or constructors handle mutable objects (like `Date`, arrays, or `List`), they MUST copy the object:\n   - On constructor: Copy incoming parameters into internal storage.\n   - On getter: Return a new copy of internal mutable fields.\n   Failure to copy allows external callers to mutate private state directly!",
      "syntaxAndStructure": "public class SafePerson {\n    private final String name;\n    private final Date birthDate; // Mutable object\n\n    public SafePerson(String name, Date birthDate) {\n        this.name = name;\n        this.birthDate = new Date(birthDate.getTime()); // Defensive Copy IN\n    }\n\n    public Date getBirthDate() {\n        return new Date(this.birthDate.getTime()); // Defensive Copy OUT\n    }\n}",
      "codeExamples": [
        {
          "title": "Broken Encapsulation vs Defensive Copying Solution",
          "code": "import java.util.Date;\n\n// Defective Class: Leaks mutable references\nclass VulnerableAccount {\n    private final Date creationDate;\n    public VulnerableAccount(Date d) { this.creationDate = d; }\n    public Date getCreationDate() { return this.creationDate; } // Leaks internal pointer!\n}\n\n// Secure Encapsulated Class: Defensive Copying\nclass SecureAccount {\n    private final Date creationDate;\n    public SecureAccount(Date d) { this.creationDate = new Date(d.getTime()); } // Defensive IN\n    public Date getCreationDate() { return new Date(this.creationDate.getTime()); } // Defensive OUT\n}\n\npublic class DefensiveCopyingDemo {\n    public static void main(String[] args) {\n        Date original = new Date(1000000000L);\n        VulnerableAccount vuln = new VulnerableAccount(original);\n        // External mutation corrupts internal state!\n        vuln.getCreationDate().setTime(0);\n        System.out.println(\"Vulnerable date corrupted: \" + (vuln.getCreationDate().getTime() == 0));\n\n        SecureAccount secure = new SecureAccount(original);\n        secure.getCreationDate().setTime(0);\n        System.out.println(\"Secure date preserved: \" + (secure.getCreationDate().getTime() == 1000000000L));\n    }\n}",
          "expectedOutput": "Vulnerable date corrupted: true\nSecure date preserved: true",
          "explanation": "Returning an internal mutable reference directly allows external code to mutate private final fields. Returning a defensive copy isolates internal state."
        },
        {
          "title": "Validating Setters Enforcing Invariants",
          "code": "public class Thermostat {\n    private double temperatureCelsius = 20.0; // Invariant: must be between -50 and 100\n\n    public void setTemperature(double temp) {\n        if (temp < -50.0 || temp > 100.0) {\n            throw new IllegalArgumentException(\"Temperature out of safe operating limits: \" + temp);\n        }\n        this.temperatureCelsius = temp;\n    }\n\n    public double getTemperature() { return this.temperatureCelsius; }\n\n    public static void main(String[] args) {\n        Thermostat t = new Thermostat();\n        t.setTemperature(25.5);\n        System.out.println(\"Current temp: \" + t.getTemperature());\n\n        try {\n            t.setTemperature(150.0); // Violates invariant\n        } catch (IllegalArgumentException e) {\n            System.out.println(\"Validation caught: \" + e.getMessage());\n        }\n    }\n}",
          "expectedOutput": "Current temp: 25.5\nValidation caught: Temperature out of safe operating limits: 150.0",
          "explanation": "Encapsulation gates all state modifications through validated setter methods, preserving domain integrity."
        }
      ],
      "realWorldApplications": [
        "Protecting domain models in DDD (Domain-Driven Design) where business rules must never be violated.",
        "Security-critical credentials, token stores, and payment calculations in banking APIs."
      ],
      "commonMistakes": [
        "Returning raw mutable collections from getters (e.g. returning `this.items` instead of `Collections.unmodifiableList(items)`).",
        "Creating mindless getters and setters for every private field without considering whether fields should be read-only or mutable.",
        "Returning direct references to mutable internal collections or arrays from getter methods instead of defensive copies."
      ],
      "interviewRelevance": "Universal interview topic: \"What is defensive copying?\", \"Why are getters and setters better than public fields?\", and \"Explain how encapsulation supports class invariants.\"",
      "checkpoints": [
        {
          "id": "java-31-cp-1",
          "label": "Implement defensive copying on both constructors and getters for mutable reference types"
        },
        {
          "id": "java-31-cp-2",
          "label": "Enforce class invariants through validated setter methods and constructor checks"
        },
        {
          "id": "java-31-encapsulation-cp-3",
          "label": "Enforce private fields and defensive copying to protect object invariants."
        }
      ],
      "practiceExercises": [
        {
          "id": "java-31-ex-1",
          "title": "Immutable Array Encapsulation",
          "difficulty": "Beginner",
          "type": "coding",
          "prompt": "Write a class GradeBook holding int[] scores that defensively copies the array in the constructor and getter.",
          "solution": "public class GradeBook {\n    private final int[] scores;\n    public GradeBook(int[] s) {\n        this.scores = s.clone(); // Defensive copy IN\n    }\n    public int[] getScores() {\n        return this.scores.clone(); // Defensive copy OUT\n    }\n    public static void main(String[] args) {\n        int[] raw = { 85, 90, 95 };\n        GradeBook gb = new GradeBook(raw);\n        raw[0] = 0; // External mutation attempt\n        System.out.println(\"Gradebook score 0 preserved: \" + (gb.getScores()[0] == 85));\n    }\n}",
          "explanation": "Using .clone() creates an independent array copy, preventing external array mutations from corrupting internal scores."
        },
        {
          "id": "java-31-ex-2",
          "title": "Unmodifiable Collection Getter",
          "difficulty": "Intermediate",
          "type": "coding",
          "prompt": "Encapsulate a List<String> permissions field so callers can read it but calling .add() on the returned list throws an exception.",
          "solution": "import java.util.*;\n\npublic class UserRole {\n    private final List<String> permissions = new ArrayList<>();\n    public void addPermission(String p) { permissions.add(p); }\n\n    public List<String> getPermissions() {\n        return Collections.unmodifiableList(this.permissions);\n    }\n    public static void main(String[] args) {\n        UserRole r = new UserRole();\n        r.addPermission(\"READ\");\n        List<String> perms = r.getPermissions();\n        try {\n            perms.add(\"WRITE\"); // Throws UnsupportedOperationException\n        } catch (UnsupportedOperationException e) {\n            System.out.println(\"Unauthorized list mutation blocked successfully.\");\n        }\n    }\n}",
          "explanation": "Collections.unmodifiableList() wraps the backing list in a read-only view that blocks mutator methods."
        },
        {
          "id": "java-31-ex-3",
          "title": "Modern Java Record Immutability",
          "difficulty": "Advanced",
          "type": "conceptual",
          "prompt": "Why do Java 14+ Records NOT automatically protect against mutable component references like List or Date?",
          "solution": "Java Records automatically make fields `private final` and generate canonical accessors. However, the default canonical constructor and accessor perform shallow assignment (`this.list = list; return this.list;`). If a record component is a mutable object (like ArrayList), external callers can still mutate the record's internal contents. To achieve true immutability with records, you must implement a compact constructor and override accessors to perform defensive copying or use immutable collections like `List.copyOf()`.",
          "explanation": "Records enforce shallow reference immutability, requiring manual defensive copies for mutable member types."
        }
      ],
      "quizQuestions": [
        {
          "id": "java-31-q1",
          "question": "What is the primary danger of returning a reference to an internal mutable Date object directly from a getter?",
          "options": [
            "It causes a NullPointerException",
            "External callers can mutate the internal state of the object without using setters, breaking encapsulation",
            "It prevents the Garbage Collector from freeing the object",
            "It triggers a ClassCastException"
          ],
          "correctOptionIndex": 1,
          "explanation": "Returning internal mutable references leaks control of private state, allowing callers to alter values from outside."
        },
        {
          "id": "java-31-q2",
          "question": "Which method should be used to protect a private List field from being modified by clients who call its getter?",
          "options": [
            "list.lock()",
            "Collections.unmodifiableList(list)",
            "list.setFinal()",
            "list.asStatic()"
          ],
          "correctOptionIndex": 1,
          "explanation": "Collections.unmodifiableList() provides a read-only view that throws UnsupportedOperationException on add/remove."
        }
      ],
      "revisionNotes": [
        "Encapsulation combines data and behavior while hiding internal implementation details.",
        "Always use defensive copying on mutable objects (Date, arrays, collections) in constructors and getters.",
        "Use Collections.unmodifiableList() to expose read-only collection access."
      ]
    },
    {
      "id": "java-32-abstraction",
      "moduleId": "java-m3",
      "moduleNumber": 3,
      "moduleTitle": "Object-Oriented Programming",
      "topicNumber": 32,
      "title": "Abstraction: Concepts, Contract Definition & Hiding Complexity",
      "language": "java",
      "level": "Beginner",
      "whyItMatters": "Abstraction separates \"what an object does\" from \"how it does it\". It enables building large, scalable systems where client code interacts with high-level contracts rather than low-level implementation details.",
      "explanation": "Abstraction is the OOP principle of exposing essential features while hiding implementation details and background complexity.\nKey Principles:\n1. What vs How: Callers know WHAT methods an abstraction provides (e.g. `list.add()`), but do NOT need to know HOW it is stored internally (whether in a dynamic array or doubly-linked list).\n2. Abstraction Mechanisms in Java:\n   - Abstract Classes (0% to 100% abstraction): Partial abstractions that can share state and concrete template code.\n   - Interfaces (100% pure contract abstraction, prior to default methods): Pure architectural contracts defining capabilities.\n3. Loose Coupling: Callers depend on the abstract contract (e.g., `Map<K, V> map = new HashMap<>()`). If the underlying implementation is later swapped with `ConcurrentHashMap` or `TreeMap`, caller code remains completely unchanged.",
      "syntaxAndStructure": "// Abstract Contract:\npublic interface DatabaseConnector {\n    void connect();\n    void executeQuery(String sql);\n}\n\n// Caller depends on the abstraction, not the concrete vendor:\npublic class Service {\n    private final DatabaseConnector connector;\n    public Service(DatabaseConnector c) { this.connector = c; }\n}",
      "codeExamples": [
        {
          "title": "Program to an Interface, Not an Implementation",
          "code": "import java.util.ArrayList;\nimport java.util.LinkedList;\nimport java.util.List;\n\npublic class ProgramToInterfaceDemo {\n    // Method accepts the List abstraction, decoupling it from ArrayList or LinkedList\n    public static int computeTotal(List<Integer> numbers) {\n        int sum = 0;\n        for (int n : numbers) sum += n;\n        return sum;\n    }\n\n    public static void main(String[] args) {\n        // Concrete ArrayList\n        List<Integer> arrayList = new ArrayList<>(List.of(10, 20, 30));\n        // Concrete LinkedList\n        List<Integer> linkedList = new LinkedList<>(List.of(40, 50, 60));\n\n        // computeTotal works seamlessly with any List implementation!\n        System.out.println(\"ArrayList sum: \" + computeTotal(arrayList));\n        System.out.println(\"LinkedList sum: \" + computeTotal(linkedList));\n    }\n}",
          "expectedOutput": "ArrayList sum: 60\nLinkedList sum: 150",
          "explanation": "By programming to the List abstraction, computeTotal() operates uniformly on both ArrayList and LinkedList without modification."
        },
        {
          "title": "Hiding Complexity Behind an Abstraction",
          "code": "interface CloudStorage {\n    void uploadFile(String fileName);\n}\n\nclass AWSStorage implements CloudStorage {\n    public void uploadFile(String fileName) {\n        System.out.println(\"Uploading \" + fileName + \" to Amazon S3 Bucket via AWS SDK.\");\n    }\n}\n\nclass GCPStorage implements CloudStorage {\n    public void uploadFile(String fileName) {\n        System.out.println(\"Uploading \" + fileName + \" to Google Cloud Storage via gRPC.\");\n    }\n}\n\npublic class CloudAbstractionDemo {\n    public static void main(String[] args) {\n        CloudStorage storage = new AWSStorage();\n        storage.uploadFile(\"resume.pdf\");\n\n        // Swap to GCP without changing client code\n        storage = new GCPStorage();\n        storage.uploadFile(\"resume.pdf\");\n    }\n}",
          "expectedOutput": "Uploading resume.pdf to Amazon S3 Bucket via AWS SDK.\nUploading resume.pdf to Google Cloud Storage via gRPC.",
          "explanation": "Client code relies on CloudStorage. Complex cloud-specific authentication and protocols remain hidden inside concrete classes."
        }
      ],
      "realWorldApplications": [
        "JDBC API (`java.sql.Connection`, `Statement`, `ResultSet`) allowing Java code to connect to any database vendor.",
        "Spring Framework dependency injection where services depend on repository interfaces."
      ],
      "commonMistakes": [
        "Declaring specific concrete types in method parameters (e.g. `void process(ArrayList<T> list)`) instead of the abstraction (`List<T>`), restricting caller flexibility.",
        "Confusing abstraction (hiding complexity by modeling interfaces) with encapsulation (hiding internal state with private accessors).",
        "Exposing internal database or networking implementation details in abstract service contracts."
      ],
      "interviewRelevance": "Core architectural question: \"What does 'Program to an interface, not an implementation' mean?\" and \"Difference between abstraction and encapsulation.\"",
      "checkpoints": [
        {
          "id": "java-32-cp-1",
          "label": "Distinguish abstraction (what it does) from implementation (how it does it)"
        },
        {
          "id": "java-32-cp-2",
          "label": "Apply \"Program to an interface\" across API design and method parameter lists"
        },
        {
          "id": "java-32-abstraction-cp-3",
          "label": "Design clean interfaces and abstract contracts that separate what from how."
        }
      ],
      "practiceExercises": [
        {
          "id": "java-32-ex-1",
          "title": "Refactor Concrete Method to Abstraction",
          "difficulty": "Beginner",
          "type": "coding",
          "prompt": "Refactor void print(HashSet<String> set) to accept the most general appropriate collection interface.",
          "solution": "import java.util.Collection;\nimport java.util.List;\nimport java.util.Set;\n\npublic class RefactorToAbstraction {\n    // Generalized to Collection<String> (accepts Set, List, Queue, etc.)\n    public static void print(Collection<String> items) {\n        for (String s : items) System.out.print(s + \" \");\n        System.out.println();\n    }\n    public static void main(String[] args) {\n        print(Set.of(\"A\", \"B\"));\n        print(List.of(\"X\", \"Y\", \"Z\"));\n    }\n}",
          "explanation": "Widening the parameter type from HashSet to Collection allows passing sets, lists, and any iterable collection."
        },
        {
          "id": "java-32-ex-2",
          "title": "Notification Service Factory Abstraction",
          "difficulty": "Intermediate",
          "type": "coding",
          "prompt": "Create an abstraction MessageSender and a factory that returns an SMS or Email implementation based on a channel string.",
          "solution": "interface MessageSender { void send(String msg); }\nclass EmailSender implements MessageSender {\n    public void send(String msg) { System.out.println(\"Email: \" + msg); }\n}\nclass SMSSender implements MessageSender {\n    public void send(String msg) { System.out.println(\"SMS: \" + msg); }\n}\nclass SenderFactory {\n    public static MessageSender getSender(String channel) {\n        if (\"sms\".equalsIgnoreCase(channel)) return new SMSSender();\n        return new EmailSender();\n    }\n}\npublic class FactoryTest {\n    public static void main(String[] args) {\n        SenderFactory.getSender(\"sms\").send(\"OTP: 1234\");\n    }\n}",
          "explanation": "The factory encapsulates instantiation, isolating the client from concrete class references."
        },
        {
          "id": "java-32-ex-3",
          "title": "Abstraction vs Encapsulation Matrix",
          "difficulty": "Advanced",
          "type": "conceptual",
          "prompt": "Compare Abstraction vs Encapsulation across: 1) Focus, 2) Implementation mechanism, 3) Primary benefit.",
          "solution": "1. Focus: Abstraction focuses on the outside view (WHAT an entity does); Encapsulation focuses on the inside view (HOW internal state is protected).\n2. Mechanism: Abstraction uses abstract classes and interfaces; Encapsulation uses private/protected access modifiers and getter/setter methods.\n3. Primary Benefit: Abstraction enables loose coupling and modular design; Encapsulation ensures data integrity, safety, and invariant enforcement.",
          "explanation": "Abstraction hides complexity via contracts; Encapsulation hides internal data via access boundaries."
        }
      ],
      "quizQuestions": [
        {
          "id": "java-32-q1",
          "question": "What is the primary benefit of the design rule \"Program to an interface, not an implementation\"?",
          "options": [
            "It compiles the code to C binaries",
            "It decouples client code from concrete classes, allowing implementations to be swapped without modifying callers",
            "It automatically enables multi-threading",
            "It reduces memory usage to zero"
          ],
          "correctOptionIndex": 1,
          "explanation": "Programming to interfaces ensures that client code depends only on contracts, maximizing flexibility and testability."
        },
        {
          "id": "java-32-q2",
          "question": "Which of the following is an example of Abstraction in Java?",
          "options": [
            "Marking a variable private",
            "Using the List interface instead of ArrayList in a method signature",
            "Writing a try-catch block",
            "Creating a while loop"
          ],
          "correctOptionIndex": 1,
          "explanation": "Using the List interface abstracts away the underlying storage mechanism (array vs linked nodes) from the caller."
        }
      ],
      "revisionNotes": [
        "Abstraction hides implementation complexity and focuses on essential capabilities.",
        "Always program to interfaces (e.g. `List<T> list = new ArrayList<>()`).",
        "Abstraction separates \"what\" an object does from \"how\" it does it."
      ]
    },
    {
      "id": "java-33-abstract-classes",
      "moduleId": "java-m3",
      "moduleNumber": 3,
      "moduleTitle": "Object-Oriented Programming",
      "topicNumber": 33,
      "title": "Abstract Classes, Abstract Methods & Partial Implementation",
      "language": "java",
      "level": "Beginner",
      "whyItMatters": "Abstract classes provide shared code, common state, and template method design patterns across related classes. Understanding when to use an abstract class versus an interface is a foundational interview topic.",
      "explanation": "An `abstract class` is a class declared with the `abstract` keyword that cannot be instantiated directly with `new`.\nKey Characteristics:\n1. Abstract Methods: Declared without a body (`abstract void calculate();`). Any non-abstract concrete subclass MUST provide an implementation for all inherited abstract methods.\n2. Partial Implementation: Unlike pure interfaces, an abstract class can contain concrete methods, stateful instance fields (`private int id`), constructors, and static members.\n3. Constructors in Abstract Classes: Although an abstract class cannot be instantiated directly, it CAN and SHOULD have constructors! These constructors are called via `super()` from subclass constructors to initialize inherited state.\n4. Template Method Pattern: Abstract classes often implement a concrete master algorithm method that delegates specific steps to abstract hook methods implemented by subclasses.\n5. Modifiers: An abstract method cannot be `private` or `final` (because it must be overridden), nor `static`.",
      "syntaxAndStructure": "public abstract class Animal {\n    private String name; // Instance state\n\n    public Animal(String name) {\n        this.name = name;\n    }\n\n    // Concrete method (shared behavior)\n    public void sleep() { System.out.println(name + \" is sleeping\"); }\n\n    // Abstract method (mandatory subclass behavior)\n    public abstract void makeSound();\n}",
      "codeExamples": [
        {
          "title": "Template Method Pattern Using Abstract Class",
          "code": "abstract class DataMiner {\n    // Template method defining the overall skeleton algorithm\n    public final void mine(String path) {\n        openFile(path);\n        extractData();\n        parseData();\n        closeFile();\n    }\n\n    protected void openFile(String path) {\n        System.out.println(\"Opening file: \" + path);\n    }\n\n    protected void closeFile() {\n        System.out.println(\"File closed cleanly.\");\n    }\n\n    // Abstract steps delegated to concrete subclass implementations\n    protected abstract void extractData();\n    protected abstract void parseData();\n}\n\nclass PDFDataMiner extends DataMiner {\n    @Override\n    protected void extractData() {\n        System.out.println(\"Extracting raw PDF bytecode streams.\");\n    }\n\n    @Override\n    protected void parseData() {\n        System.out.println(\"Parsing PDF font tables and text blocks.\");\n    }\n}\n\npublic class AbstractTemplateDemo {\n    public static void main(String[] args) {\n        DataMiner miner = new PDFDataMiner();\n        miner.mine(\"placement_guide.pdf\");\n    }\n}",
          "expectedOutput": "Opening file: placement_guide.pdf\nExtracting raw PDF bytecode streams.\nParsing PDF font tables and text blocks.\nFile closed cleanly.",
          "explanation": "The abstract class defines the invariant skeleton in mine() (marked final to prevent alteration) while delegating variant steps to abstract methods."
        },
        {
          "title": "Constructors and State in Abstract Classes",
          "code": "abstract class BaseEntity {\n    private final String id;\n    private final long createdAt;\n\n    public BaseEntity(String id) {\n        this.id = id;\n        this.createdAt = System.currentTimeMillis();\n    }\n\n    public String getId() { return id; }\n    public abstract void validate();\n}\n\nclass UserEntity extends BaseEntity {\n    private String email;\n\n    public UserEntity(String id, String email) {\n        super(id); // Calling abstract parent constructor\n        this.email = email;\n    }\n\n    @Override\n    public void validate() {\n        System.out.println(\"Validating user: \" + getId() + \", Email: \" + email);\n    }\n}\n\npublic class AbstractConstructorDemo {\n    public static void main(String[] args) {\n        UserEntity user = new UserEntity(\"USR-42\", \"candidate@ak67.com\");\n        user.validate();\n    }\n}",
          "expectedOutput": "Validating user: USR-42, Email: candidate@ak67.com",
          "explanation": "Abstract classes safely manage common base state (like id and timestamps) through constructors invoked via super(id)."
        }
      ],
      "realWorldApplications": [
        "Java collections skeletal implementations (`AbstractList`, `AbstractMap`, `AbstractSet`) that minimize work when writing custom collections.",
        "HTTP servlet hierarchy (`HttpServlet` extending `GenericServlet`)."
      ],
      "commonMistakes": [
        "Declaring an abstract method as `private` or `final`; abstract methods exist solely to be overridden by subclasses.",
        "Trying to instantiate an abstract class directly using `new MyAbstractClass()`, which causes a compile error.",
        "Attempting to instantiate an abstract class directly using the new keyword."
      ],
      "interviewRelevance": "Universal interview question: \"Can an abstract class have a constructor if it cannot be instantiated?\", \"Can an abstract class have zero abstract methods?\", and \"Abstract Class vs Interface.\"",
      "checkpoints": [
        {
          "id": "java-33-cp-1",
          "label": "Explain the role of constructors in abstract classes invoked via super()"
        },
        {
          "id": "java-33-cp-2",
          "label": "Implement the Template Method design pattern using abstract base classes"
        },
        {
          "id": "java-33-abstract-classes-cp-3",
          "label": "Use abstract classes as template base classes with shared mutable state."
        }
      ],
      "practiceExercises": [
        {
          "id": "java-33-ex-1",
          "title": "Abstract Class Without Abstract Methods",
          "difficulty": "Beginner",
          "type": "conceptual",
          "prompt": "Can an abstract class contain ZERO abstract methods? Why would a software architect declare such a class?",
          "solution": "Yes, an abstract class can contain zero abstract methods. A developer declares a class abstract without abstract methods to prevent direct instantiation with `new`, signaling that the class is an incomplete base concept intended only to be extended by concrete subclasses.",
          "explanation": "Enforces inheritance without mandating any abstract method overrides."
        },
        {
          "id": "java-33-ex-2",
          "title": "Shape Hierarchy with Abstract Area",
          "difficulty": "Intermediate",
          "type": "coding",
          "prompt": "Create an abstract class Shape with abstract double area() and concrete Circle and Rectangle subclasses.",
          "solution": "abstract class Shape {\n    abstract double area();\n}\nclass Circle extends Shape {\n    double r;\n    Circle(double r) { this.r = r; }\n    double area() { return Math.PI * r * r; }\n}\nclass Rectangle extends Shape {\n    double w, h;\n    Rectangle(double w, double h) { this.w = w; this.h = h; }\n    double area() { return w * h; }\n}\npublic class ShapeTest {\n    public static void main(String[] args) {\n        Shape s = new Rectangle(4, 5);\n        System.out.println(\"Area: \" + s.area());\n    }\n}",
          "explanation": "Each subclass implements the abstract area() formula according to its geometry."
        },
        {
          "id": "java-33-ex-3",
          "title": "Dissecting AbstractList Implementation",
          "difficulty": "Advanced",
          "type": "conceptual",
          "prompt": "In the Java standard library, why does ArrayList extend AbstractList instead of implementing List directly from scratch?",
          "solution": "`AbstractList` provides default concrete implementations for common List operations (e.g., `indexOf()`, `equals()`, `hashCode()`, `iterator()`, `subList()`) on top of minimal primitives (`get(int)` and `size()`). By extending AbstractList, `ArrayList` inherits dozens of complex methods for free without writing boilerplate code from scratch.",
          "explanation": "Skeletal implementations in abstract classes drastically reduce boilerplate for custom collection classes."
        }
      ],
      "quizQuestions": [
        {
          "id": "java-33-q1",
          "question": "Can an abstract class in Java have constructors?",
          "options": [
            "No, because abstract classes cannot be instantiated with new",
            "Yes, to initialize instance fields when invoked by subclass constructors via super()",
            "Only if the constructors are public",
            "Only if all methods in the class are abstract"
          ],
          "correctOptionIndex": 1,
          "explanation": "Abstract classes have constructors to initialize inherited fields when subclasses invoke `super(...)`."
        },
        {
          "id": "java-33-q2",
          "question": "Which combinations of modifiers are ILLEGAL for an abstract method?",
          "options": [
            "public abstract",
            "protected abstract",
            "private abstract and final abstract",
            "abstract with throws clause"
          ],
          "correctOptionIndex": 2,
          "explanation": "`private` methods cannot be seen by subclasses, and `final` methods cannot be overridden. Both contradict the requirement that abstract methods must be overridden."
        }
      ],
      "revisionNotes": [
        "Abstract classes cannot be instantiated directly with `new`.",
        "Abstract classes can hold state, concrete methods, and constructors.",
        "Abstract methods cannot be private, final, or static."
      ]
    },
    {
      "id": "java-34-interfaces",
      "moduleId": "java-m3",
      "moduleNumber": 3,
      "moduleTitle": "Object-Oriented Programming",
      "topicNumber": 34,
      "title": "Interfaces, Contract Definition & Multiple Inheritance of Type",
      "language": "java",
      "level": "Beginner",
      "whyItMatters": "Interfaces define 100% pure contracts in Java and provide multiple inheritance of type. Modern frameworks (Spring, Micronaut, Quarkus) are architected entirely around interfaces for loose coupling and mock testing.",
      "explanation": "An `interface` in Java is a reference type that specifies a contract of methods that implementing classes must fulfill.\nKey Characteristics:\n1. Methods: By default, all methods in an interface are implicitly `public abstract` (prior to Java 8 default/static methods).\n2. Fields: All variables declared in an interface are implicitly `public static final` (constants). Interfaces cannot maintain instance state.\n3. Multiple Inheritance of Type: While a class can extend only one superclass, it can implement ANY NUMBER of interfaces (`class C implements A, B, C`). This allows an object to have multiple roles (e.g. `ArrayList` implements `List`, `RandomAccess`, `Cloneable`, `Serializable`).\n4. Interface Inheritance: An interface can extend one or more other interfaces using the `extends` keyword (`interface C extends A, B`).\n5. Marker Interfaces: Interfaces with zero methods (e.g. `Serializable`, `Cloneable`) used as runtime type tags.",
      "syntaxAndStructure": "// Interface contract:\npublic interface Drivable {\n    // Implicitly public static final:\n    int MAX_SPEED = 120;\n\n    // Implicitly public abstract:\n    void accelerate();\n    void brake();\n}\n\n// Implementation:\npublic class SportsCar implements Drivable, Cloneable {\n    @Override\n    public void accelerate() { System.out.println(\"Accelerating fast\"); }\n    @Override\n    public void brake() { System.out.println(\"Braking safely\"); }\n}",
      "codeExamples": [
        {
          "title": "Multiple Interface Implementation for Multiple Roles",
          "code": "interface Printable {\n    void print();\n}\n\ninterface Exportable {\n    void exportToPdf(String filename);\n}\n\n// A single class fulfilling multiple role contracts\nclass ReportDocument implements Printable, Exportable {\n    private String title;\n\n    public ReportDocument(String t) { this.title = t; }\n\n    @Override\n    public void print() {\n        System.out.println(\"Printing document: \" + title);\n    }\n\n    @Override\n    public void exportToPdf(String filename) {\n        System.out.println(\"Exporting '\" + title + \"' to \" + filename);\n    }\n}\n\npublic class MultipleInterfaceDemo {\n    public static void main(String[] args) {\n        ReportDocument doc = new ReportDocument(\"Annual Performance\");\n\n        // Object can be treated as Printable or Exportable\n        Printable p = doc;\n        p.print();\n\n        Exportable e = doc;\n        e.exportToPdf(\"perf_2026.pdf\");\n    }\n}",
          "expectedOutput": "Printing document: Annual Performance\nExporting 'Annual Performance' to perf_2026.pdf",
          "explanation": "ReportDocument satisfies two distinct capability contracts simultaneously, demonstrating multiple inheritance of type in Java."
        },
        {
          "title": "Interface Constants and Interface Inheritance",
          "code": "interface SuperA {\n    void methodA();\n}\n\ninterface SuperB {\n    void methodB();\n}\n\n// Interface extending multiple interfaces\ninterface CombinedInterface extends SuperA, SuperB {\n    int PROTOCOL_VERSION = 2; // public static final\n    void methodC();\n}\n\nclass SystemDriver implements CombinedInterface {\n    public void methodA() { System.out.println(\"A\"); }\n    public void methodB() { System.out.println(\"B\"); }\n    public void methodC() { System.out.println(\"C, Version: \" + PROTOCOL_VERSION); }\n}\n\npublic class InterfaceInheritanceDemo {\n    public static void main(String[] args) {\n        CombinedInterface driver = new SystemDriver();\n        driver.methodA();\n        driver.methodB();\n        driver.methodC();\n    }\n}",
          "expectedOutput": "A\nB\nC, Version: 2",
          "explanation": "Interfaces use the extends keyword to inherit from multiple parent interfaces simultaneously."
        }
      ],
      "realWorldApplications": [
        "Plugin architectures where third-party integrations implement vendor capability interfaces.",
        "Unit testing where concrete database repositories are mocked via repository interfaces using Mockito."
      ],
      "commonMistakes": [
        "Declaring fields in interfaces and expecting them to be instance variables; all interface fields are compile-time static constants.",
        "Reducing the visibility of an interface method in an implementation class (e.g. omitting `public` causes a compiler error because interface methods are public by default).",
        "Attempting to declare non-public, non-static instance fields in an interface."
      ],
      "interviewRelevance": "Universal interview question: \"What is the difference between an abstract class and an interface?\", \"Can an interface extend multiple interfaces?\", and \"What are marker interfaces?\"",
      "checkpoints": [
        {
          "id": "java-34-cp-1",
          "label": "Explain how interfaces enable multiple inheritance of type without the Diamond Problem"
        },
        {
          "id": "java-34-cp-2",
          "label": "Know the implicit modifiers: fields are public static final; methods are public abstract"
        },
        {
          "id": "java-34-interfaces-cp-3",
          "label": "Define capability contracts and implement multiple interfaces on classes."
        }
      ],
      "practiceExercises": [
        {
          "id": "java-34-ex-1",
          "title": "Marker Interface Implementation",
          "difficulty": "Beginner",
          "type": "coding",
          "prompt": "Create a custom marker interface Deletable with no methods and write a method delete(Object o) that checks instanceof Deletable.",
          "solution": "interface Deletable {} // Marker interface\n\nclass TempFile implements Deletable {}\nclass PermanentRecord {}\n\npublic class MarkerDemo {\n    public static void delete(Object o) {\n        if (o instanceof Deletable) {\n            System.out.println(\"Item successfully deleted.\");\n        } else {\n            System.out.println(\"Rejection: Item is not Deletable.\");\n        }\n    }\n    public static void main(String[] args) {\n        delete(new TempFile());\n        delete(new PermanentRecord());\n    }\n}",
          "explanation": "Marker interfaces convey metadata type tags to runtime algorithms via instanceof checks."
        },
        {
          "id": "java-34-ex-2",
          "title": "Compare Abstract Class vs Interface",
          "difficulty": "Intermediate",
          "type": "conceptual",
          "prompt": "Give three decisive technical criteria when choosing an Abstract Class over an Interface in modern Java.",
          "solution": "1. Shared Non-Static State: Choose an Abstract Class if subclasses need to inherit mutable instance fields.\n2. Constructors: Choose an Abstract Class if the base hierarchy requires constructor initialization arguments.\n3. Strong IS-A Relationship with Code Reuse: Choose an Abstract Class for closely related classes sharing extensive template code (e.g. AbstractList). Choose an Interface to define cross-cutting capabilities across unrelated classes (e.g. Comparable).",
          "explanation": "Interfaces define capabilities across unrelated types; abstract classes define stateful shared identity."
        },
        {
          "id": "java-34-ex-3",
          "title": "Constant Interface Anti-Pattern",
          "difficulty": "Advanced",
          "type": "conceptual",
          "prompt": "Why is the \"Constant Interface\" pattern (an interface with only constants implemented by classes) considered a major anti-pattern in Effective Java?",
          "solution": "The Constant Interface pattern pollutes the public API of implementing classes and their subclasses with implementation details. If a class later no longer needs the constants, it cannot remove the interface without breaking binary backward compatibility. Furthermore, it causes namespace confusion. The recommended alternative is to use Enums or a non-instantiable final utility class with a private constructor.",
          "explanation": "Effective Java Item 22: Use interfaces only to define types, never to export constants."
        }
      ],
      "quizQuestions": [
        {
          "id": "java-34-q1",
          "question": "What are the implicit modifiers for variables declared inside a Java interface?",
          "options": [
            "private final",
            "public static final",
            "protected static",
            "volatile"
          ],
          "correctOptionIndex": 1,
          "explanation": "All variables declared in an interface are implicitly `public static final` (compile-time constants)."
        },
        {
          "id": "java-34-q2",
          "question": "Can an interface extend multiple other interfaces using the `extends` keyword?",
          "options": [
            "No, Java prohibits multiple inheritance everywhere",
            "Yes, an interface can extend multiple interfaces simultaneously",
            "Only if the parent interfaces have no methods",
            "Only in abstract interfaces"
          ],
          "correctOptionIndex": 1,
          "explanation": "Interfaces in Java support multiple interface inheritance (e.g. `interface C extends A, B`)."
        }
      ],
      "revisionNotes": [
        "Interfaces specify pure contracts; classes implement them to guarantee capabilities.",
        "A class can implement multiple interfaces, providing multiple inheritance of type.",
        "Interface fields are always `public static final`."
      ]
    },
    {
      "id": "java-35-default-static-interface-methods",
      "moduleId": "java-m3",
      "moduleNumber": 3,
      "moduleTitle": "Object-Oriented Programming",
      "topicNumber": 35,
      "title": "Default & Static Interface Methods (Java 8+) & The Diamond Problem",
      "language": "java",
      "level": "Beginner",
      "whyItMatters": "Java 8 revolutionized interfaces by introducing `default` and `static` methods. Understanding default methods is essential for understanding how the Stream API and lambda expressions were added to existing collections without breaking millions of legacy applications.",
      "explanation": "Prior to Java 8, adding a new method to an interface broke every implementing class in the world. Java 8 introduced two new capabilities in interfaces:\n1. Default Methods (`default` keyword): Methods declared inside an interface with a concrete body. Implementing classes inherit the default implementation unless they explicitly override it. This enabled backward-compatible library evolution (e.g. adding `forEach()` and `stream()` directly to `Collection`).\n2. Static Methods: Utility methods declared on the interface itself (`static void log()`), callable via `InterfaceName.method()`. They are not inherited by implementing classes.\n3. The Multiple Inheritance Diamond Conflict:\n   If a class implements two interfaces `A` and `B` that declare the identical default method signature `default void foo()`, the Java compiler detects a collision and throws a compile error: \"class inherits unrelated defaults for foo() from types A and B\".\n   Resolution Rule: The implementing class MUST override the conflicting method and either provide its own logic or explicitly disambiguate by calling `A.super.foo()` or `B.super.foo()`.",
      "syntaxAndStructure": "public interface Loggable {\n    // Default method\n    default void log(String msg) {\n        System.out.println(\"[DEFAULT LOG] \" + msg);\n    }\n\n    // Static method\n    static void printVersion() {\n        System.out.println(\"Loggable v2.0\");\n    }\n}\n\n// Disambiguating Diamond Problem:\npublic class CollisionResolver implements InterfaceA, InterfaceB {\n    @Override\n    public void foo() {\n        InterfaceA.super.foo(); // Explicit parent delegation\n    }\n}",
      "codeExamples": [
        {
          "title": "Resolving Default Method Diamond Conflict in Java",
          "code": "interface Alpha {\n    default void greet() {\n        System.out.println(\"Greetings from Alpha\");\n    }\n}\n\ninterface Beta {\n    default void greet() {\n        System.out.println(\"Greetings from Beta\");\n    }\n}\n\n// Class implementing both interfaces must resolve the conflict\npublic class DiamondResolverDemo implements Alpha, Beta {\n    @Override\n    public void greet() {\n        // Disambiguate using InterfaceName.super.method()\n        Alpha.super.greet();\n        System.out.println(\"Appended custom child greeting.\");\n    }\n\n    public static void main(String[] args) {\n        DiamondResolverDemo demo = new DiamondResolverDemo();\n        demo.greet();\n    }\n}",
          "expectedOutput": "Greetings from Alpha\nAppended custom child greeting.",
          "explanation": "When two interfaces have identical default methods, the implementing class must explicitly override the method and resolve the ambiguity using InterfaceName.super.methodName()."
        },
        {
          "title": "Static Interface Methods and Factory Utilities",
          "code": "interface Validator {\n    boolean isValid(String input);\n\n    // Static utility method directly on the interface\n    static Validator notNullOrEmpty() {\n        return s -> s != null && !s.trim().isEmpty();\n    }\n}\n\npublic class StaticInterfaceMethodDemo {\n    public static void main(String[] args) {\n        // Calling static method directly on interface name\n        Validator v = Validator.notNullOrEmpty();\n        \n        System.out.println(\"Validating 'Placement': \" + v.isValid(\"Placement\"));\n        System.out.println(\"Validating empty: \" + v.isValid(\"   \"));\n    }\n}",
          "expectedOutput": "Validating 'Placement': true\nValidating empty: false",
          "explanation": "Static interface methods serve as factory utilities (e.g. List.of, Comparator.comparing) directly bundled with the contract."
        }
      ],
      "realWorldApplications": [
        "Evolution of the Java Collections Framework (adding `Collection.stream()`, `List.sort()`, `Map.getOrDefault()` in Java 8 without breaking legacy code).",
        "Creating functional interface factories like `Comparator.naturalOrder()` and `Comparator.reverseOrder()`."
      ],
      "commonMistakes": [
        "Attempting to call static interface methods through an implementing class or instance reference (e.g. `myClass.staticInterfaceMethod()`), which is illegal; static interface methods must be called on the interface name directly.",
        "Failing to resolve default method conflicts in implementing classes, resulting in a compile-time collision error.",
        "Failing to resolve default method conflicts when implementing two interfaces with identical method signatures."
      ],
      "interviewRelevance": "Universal interview question: \"Why were default methods added to Java 8?\", \"How does Java solve the Diamond Problem with default methods?\", and \"What is the three-rule priority for default methods?\"",
      "checkpoints": [
        {
          "id": "java-35-cp-1",
          "label": "Explain the backward compatibility motivation for Java 8 default methods"
        },
        {
          "id": "java-35-cp-2",
          "label": "Resolve default method collisions using InterfaceName.super.method() syntax"
        },
        {
          "id": "java-35-default-static-interface-methods-cp-3",
          "label": "Evolve legacy interfaces without breaking existing implementations using default methods."
        }
      ],
      "practiceExercises": [
        {
          "id": "java-35-ex-1",
          "title": "Three Rules of Default Method Resolution",
          "difficulty": "Beginner",
          "type": "conceptual",
          "prompt": "State the 3 rules of default method precedence when a class extends a superclass and implements an interface with identical methods.",
          "solution": "1. Class Wins: A method in a superclass or super-super-class ALWAYS takes precedence over any default method in an interface.\n2. Sub-interface Wins: If no class method wins, the most specific default-providing interface wins (e.g., if B extends A, B's default wins over A's default).\n3. Explicit Override: If two unrelated interfaces provide conflicting defaults, the implementing class must explicitly override the method and resolve the conflict.",
          "explanation": "Class implementation always trumps interface default implementation."
        },
        {
          "id": "java-35-ex-2",
          "title": "Private Methods in Interfaces (Java 9+)",
          "difficulty": "Intermediate",
          "type": "coding",
          "prompt": "Demonstrate how Java 9 private interface methods allow sharing helper code between two default methods.",
          "solution": "interface SecureChannel {\n    default void sendSecure(String msg) {\n        log(\"Sending: \" + msg);\n        // transmit\n    }\n    default void receiveSecure(String msg) {\n        log(\"Received: \" + msg);\n        // receive\n    }\n    // Private helper method in interface (Java 9+)\n    private void log(String s) {\n        System.out.println(\"[AUDIT LOG] \" + s);\n    }\n}\npublic class PrivateInterfaceTest implements SecureChannel {\n    public static void main(String[] args) {\n        new PrivateInterfaceTest().sendSecure(\"Data Payload\");\n    }\n}",
          "explanation": "Java 9 introduced private interface methods to share common helper logic between multiple default methods without exposing them publicly."
        },
        {
          "id": "java-35-ex-3",
          "title": "Binary Backward Compatibility Case Study",
          "difficulty": "Advanced",
          "type": "conceptual",
          "prompt": "Explain what would have happened to legacy Java 7 code using custom List implementations if Java 8 had added default void sort() as an abstract method instead of a default method.",
          "solution": "If `sort()` had been added as a standard abstract method to `java.util.List`, every custom third-party class worldwide implementing List (e.g. in Apache Commons, Google Guava, Hibernate) would have immediately failed with compile errors or `AbstractMethodError` at runtime upon upgrading to Java 8. Making `sort()` a `default` method provided a default TimSort fallback, ensuring 100% binary backward compatibility.",
          "explanation": "Default methods enabled the evolution of foundational interfaces without breaking the global Java ecosystem."
        }
      ],
      "quizQuestions": [
        {
          "id": "java-35-q1",
          "question": "If a class extends a ParentClass with method `void foo()` and implements an Interface with `default void foo()`, which method is called?",
          "options": [
            "The interface default method",
            "The ParentClass method, because \"classes always win\" over interfaces",
            "A compilation error occurs due to conflict",
            "Randomly selected by the JVM"
          ],
          "correctOptionIndex": 1,
          "explanation": "According to Java's default method resolution rules, any method declaration from a superclass takes precedence over all interface default methods (\"Class wins rule\")."
        },
        {
          "id": "java-35-q2",
          "question": "How do you invoke a static method declared inside an interface `MyInterface`?",
          "options": [
            "MyInterface.staticMethod()",
            "new MyClass().staticMethod()",
            "MyClass.staticMethod()",
            "super.staticMethod()"
          ],
          "correctOptionIndex": 0,
          "explanation": "Static interface methods must be called directly using the interface name (`MyInterface.staticMethod()`). They are not inherited by implementing classes."
        }
      ],
      "revisionNotes": [
        "Default methods (`default`) allow adding concrete behavior to interfaces without breaking implementing classes.",
        "Diamond conflicts between unrelated default methods must be explicitly overridden by the child class.",
        "Static interface methods are called directly on the interface name and are not inherited."
      ]
    },
    {
      "id": "java-36-composition-vs-inheritance",
      "moduleId": "java-m3",
      "moduleNumber": 3,
      "moduleTitle": "Object-Oriented Programming",
      "topicNumber": 36,
      "title": "Composition vs Inheritance: \"Favor Composition Over Inheritance\"",
      "language": "java",
      "level": "Beginner",
      "whyItMatters": "One of the most famous principles in software architecture (Gang of Four & Effective Java Item 18) is \"Favor composition over inheritance\". Overusing inheritance creates fragile base classes, tight coupling, and subtle encapsulation violations.",
      "explanation": "While inheritance models an IS-A relationship (`Car extends Vehicle`), composition models a HAS-A relationship (`Car has-an Engine`).\nWhy Inheritance Can Be Fragile:\n1. Encapsulation Breakage: A subclass depends on the implementation details of its superclass. If the superclass changes its internal method call patterns in a new release, the subclass can break silently without any compiler warning (the \"Fragile Base Class\" problem).\n2. Inappropriate Subtyping: Extending a class inherits ALL of its public methods, even those that violate the child’s domain invariants (e.g. `java.util.Stack` extending `Vector` allows inserting at arbitrary indices).\nWhy Composition is Superior:\n1. Loose Coupling: The new class holds a private reference to an instance of the existing class.\n2. Forwarding / Delegation: Each method in the new class forwards calls to the internal instance.\n3. Runtime Flexibility: Components can be swapped dynamically at runtime (e.g. changing an engine from GasEngine to ElectricEngine), which is impossible with static class inheritance.",
      "syntaxAndStructure": "// Fragile Inheritance (BAD):\npublic class InstrumentedHashSet<E> extends HashSet<E> { ... }\n\n// Robust Composition / Wrapper Pattern (GOOD):\npublic class InstrumentedSet<E> implements Set<E> {\n    private final Set<E> backingSet; // Composition HAS-A\n\n    public InstrumentedSet(Set<E> s) { this.backingSet = s; }\n    public boolean add(E e) { return backingSet.add(e); } // Delegation\n}",
      "codeExamples": [
        {
          "title": "The Famous HashSet Fragile Base Class Demonstration",
          "code": "import java.util.Collection;\nimport java.util.HashSet;\nimport java.util.List;\n\n// Flawed inheritance: subclass counts additions\nclass BrokenInstrumentedHashSet<E> extends HashSet<E> {\n    private int addCount = 0;\n\n    @Override\n    public boolean add(E e) {\n        addCount++;\n        return super.add(e);\n    }\n\n    @Override\n    public boolean addAll(Collection<? extends E> c) {\n        addCount += c.size();\n        return super.addAll(c); // FLAW: HashSet.addAll calls add() internally!\n    }\n\n    public int getAddCount() { return addCount; }\n}\n\npublic class FragileInheritanceDemo {\n    public static void main(String[] args) {\n        BrokenInstrumentedHashSet<String> set = new BrokenInstrumentedHashSet<>();\n        set.addAll(List.of(\"A\", \"B\", \"C\"));\n\n        // Expected count: 3. Actual count: 6! (Double counted due to parent internal implementation)\n        System.out.println(\"Expected count: 3, Actual count: \" + set.getAddCount());\n    }\n}",
          "expectedOutput": "Expected count: 3, Actual count: 6",
          "explanation": "Because HashSet.addAll() calls add() internally under the hood, the overridden add() is called again for each element, double-counting additions to 6. This is the classic fragile base class trap."
        },
        {
          "title": "Robust Composition and Forwarding Wrapper Solution",
          "code": "import java.util.Collection;\nimport java.util.HashSet;\nimport java.util.List;\nimport java.util.Set;\n\n// Robust Composition: Holds a private reference to Set<E>\nclass RobustInstrumentedSet<E> {\n    private final Set<E> set; // HAS-A\n    private int addCount = 0;\n\n    public RobustInstrumentedSet(Set<E> set) {\n        this.set = set;\n    }\n\n    public boolean add(E e) {\n        addCount++;\n        return set.add(e);\n    }\n\n    public boolean addAll(Collection<? extends E> c) {\n        addCount += c.size();\n        return set.addAll(c); // No double counting!\n    }\n\n    public int getAddCount() { return addCount; }\n}\n\npublic class RobustCompositionDemo {\n    public static void main(String[] args) {\n        RobustInstrumentedSet<String> safeSet = new RobustInstrumentedSet<>(new HashSet<>());\n        safeSet.addAll(List.of(\"A\", \"B\", \"C\"));\n\n        System.out.println(\"Correct count with composition: \" + safeSet.getAddCount());\n    }\n}",
          "expectedOutput": "Correct count with composition: 3",
          "explanation": "By using composition and delegation, RobustInstrumentedSet does not depend on the internal self-use implementation details of HashSet."
        }
      ],
      "realWorldApplications": [
        "Decorator design patterns (e.g. `BufferedReader(new FileReader(\"file\"))`).",
        "Strategy pattern where algorithms are composed into context classes rather than inherited."
      ],
      "commonMistakes": [
        "Extending concrete classes just to reuse 1 or 2 utility methods, exposing all unrelated superclass methods to clients.",
        "Treating every relationship as inheritance (e.g. making `Window` extend `Rectangle` rather than holding a `Rectangle` bounding box).",
        "Overusing inheritance for code reuse, tightly coupling subclasses to fragile parent implementation details."
      ],
      "interviewRelevance": "High-level architectural question: \"Why should you favor composition over inheritance?\", \"Explain the Fragile Base Class problem with HashSet\", and \"When is inheritance genuinely appropriate?\"",
      "checkpoints": [
        {
          "id": "java-36-cp-1",
          "label": "Explain the Fragile Base Class problem and how inheritance breaks encapsulation"
        },
        {
          "id": "java-36-cp-2",
          "label": "Implement the wrapper/decorator pattern using composition and delegation"
        },
        {
          "id": "java-36-composition-vs-inheritance-cp-3",
          "label": "Apply Effective Java Item 18: Favor composition and forwarding over inheritance."
        }
      ],
      "practiceExercises": [
        {
          "id": "java-36-ex-1",
          "title": "Historical Flaw: java.util.Stack",
          "difficulty": "Beginner",
          "type": "conceptual",
          "prompt": "Why is java.util.Stack extending java.util.Vector considered an architectural mistake in the Java standard library?",
          "solution": "Stack models LIFO (push/pop). Because Stack extends Vector using inheritance, it inherited methods like `insertElementAt(index)` and `remove(index)`. This violated the stack abstraction by allowing clients to insert and delete elements from the middle of the stack. It should have used composition: Stack HAS-A Vector.",
          "explanation": "Inheritance exposes the entire superclass API, violating subclass domain invariants."
        },
        {
          "id": "java-36-ex-2",
          "title": "Car and Engine Composition Pattern",
          "difficulty": "Intermediate",
          "type": "coding",
          "prompt": "Design a Car class composed with an Engine interface, showing how swapping GasEngine with ElectricEngine changes behavior at runtime.",
          "solution": "interface Engine { void ignite(); }\nclass GasEngine implements Engine {\n    public void ignite() { System.out.println(\"Vroom: Gas combusting.\"); }\n}\nclass ElectricEngine implements Engine {\n    public void ignite() { System.out.println(\"Silent: Inverter powering motor.\"); }\n}\nclass Car {\n    private Engine engine;\n    public Car(Engine e) { this.engine = e; }\n    public void setEngine(Engine e) { this.engine = e; } // Swappable at runtime!\n    public void start() { engine.ignite(); }\n}\npublic class CompositionTest {\n    public static void main(String[] args) {\n        Car car = new Car(new GasEngine());\n        car.start();\n        car.setEngine(new ElectricEngine());\n        car.start();\n    }\n}",
          "explanation": "Composition allows swapping behaviors dynamically at runtime, which is impossible with inheritance."
        },
        {
          "id": "java-36-ex-3",
          "title": "When is Inheritance Truly Appropriate?",
          "difficulty": "Advanced",
          "type": "conceptual",
          "prompt": "According to Effective Java, under what exact conditions is inheritance genuinely appropriate over composition?",
          "solution": "Inheritance is only appropriate when:\n1. A genuine IS-A relationship exists across all contexts without exception.\n2. Both classes belong to the same package controlled by the same development team, OR the superclass was specifically designed and documented for inheritance (Item 19).\n3. Every single method of the superclass makes logical sense in the subclass API without violating the subclass's invariants.",
          "explanation": "Inheritance couples classes permanently; use it only when the subtype relationship is universally invariant."
        }
      ],
      "quizQuestions": [
        {
          "id": "java-36-q1",
          "question": "What is the \"Fragile Base Class\" problem?",
          "options": [
            "A base class that causes compilation failure when compiled with javac",
            "A problem where modifications to superclass internal implementations can inadvertently break subclasses without compiler warning",
            "A base class with zero subclasses",
            "A class with too many interfaces"
          ],
          "correctOptionIndex": 1,
          "explanation": "The fragile base class problem occurs when changes in superclass internal implementation details cause subclasses to behave incorrectly."
        },
        {
          "id": "java-36-q2",
          "question": "Which relationship does Composition model?",
          "options": [
            "IS-A relationship",
            "HAS-A relationship",
            "IMPLEMENTS-A relationship",
            "USES-A static relationship"
          ],
          "correctOptionIndex": 1,
          "explanation": "Composition models a HAS-A relationship where one object contains a reference to another object."
        }
      ],
      "revisionNotes": [
        "\"Favor composition over inheritance\" protects against the Fragile Base Class problem.",
        "Composition (HAS-A) enables dynamic runtime component swapping.",
        "Inheritance (IS-A) breaks encapsulation if superclasses change internal call flows."
      ]
    },
    {
      "id": "java-37-association-aggregation-composition",
      "moduleId": "java-m3",
      "moduleNumber": 3,
      "moduleTitle": "Object-Oriented Programming",
      "topicNumber": 37,
      "title": "Association, Aggregation & Composition Relationships",
      "language": "java",
      "level": "Beginner",
      "whyItMatters": "Accurately modeling object lifecycles and containment relationships is a core requirement of Low-Level Design (LLD) interviews and enterprise domain modeling.",
      "explanation": "Object relationships in UML and Java are categorized into three levels of coupling:\n1. Association: A general relationship where two independent objects communicate or use each other (e.g. `Doctor` and `Patient`, or `Teacher` and `Student`). Neither owns the other; both lifecycles are independent.\n2. Aggregation (Weak HAS-A): A specialized form of association where a container object has child objects, but the child objects CAN EXIST INDEPENDENTLY of the container. For example, a `Department` has `Professors`. If the Department is deleted, the Professors still exist in the university.\n3. Composition (Strong HAS-A / Death Relationship): A strict form of aggregation where the child object's lifecycle is TIGHTLY BOUND to the parent. The child cannot exist without the parent. For example, a `House` and its `Rooms`, or an `Order` and its `OrderLineItems`. If the House or Order is destroyed, its Rooms or OrderItems are destroyed along with it.",
      "syntaxAndStructure": "// Aggregation (Weak HAS-A: Children passed in, exist independently):\npublic class Department {\n    private List<Teacher> teachers;\n    public Department(List<Teacher> teachers) { this.teachers = teachers; }\n}\n\n// Composition (Strong HAS-A: Children instantiated internally, die with parent):\npublic class Car {\n    private final Engine engine = new Engine(); // Born with Car, dies with Car\n}",
      "codeExamples": [
        {
          "title": "Aggregation (Independent Lifecycles) Demo",
          "code": "import java.util.List;\n\nclass Player {\n    String name;\n    Player(String n) { this.name = n; }\n}\n\nclass Team {\n    String teamName;\n    List<Player> players; // Aggregation: Players exist independent of Team\n\n    Team(String name, List<Player> players) {\n        this.teamName = name;\n        this.players = players;\n    }\n}\n\npublic class AggregationDemo {\n    public static void main(String[] args) {\n        Player p1 = new Player(\"Virat\");\n        Player p2 = new Player(\"Rohit\");\n\n        Team team = new Team(\"India\", List.of(p1, p2));\n        System.out.println(\"Team created: \" + team.teamName);\n\n        // If team reference is destroyed:\n        team = null;\n\n        // Players still exist independently!\n        System.out.println(\"Player p1 still alive: \" + p1.name);\n    }\n}",
          "expectedOutput": "Team created: India\nPlayer p1 still alive: Virat",
          "explanation": "In Aggregation, destroying the container (Team) does NOT destroy the contained elements (Player); their lifecycles are independent."
        },
        {
          "title": "Composition (Tightly-Bound Lifecycle) Demo",
          "code": "class OrderItem {\n    private String product;\n    private double price;\n    OrderItem(String p, double pr) { this.product = p; this.price = pr; }\n    public String getProduct() { return product; }\n}\n\nclass CustomerOrder {\n    private final OrderItem item; // Composition: OrderItem created within Order\n\n    public CustomerOrder(String product, double price) {\n        // Child lifecycle is completely owned and managed by the parent\n        this.item = new OrderItem(product, price);\n    }\n\n    public String getItemName() { return item.getProduct(); }\n}\n\npublic class CompositionLifecycleDemo {\n    public static void main(String[] args) {\n        CustomerOrder order = new CustomerOrder(\"Gaming Laptop\", 1200.0);\n        System.out.println(\"Order item: \" + order.getItemName());\n        // When 'order' becomes eligible for GC, its internal OrderItem is also collected\n    }\n}",
          "expectedOutput": "Order item: Gaming Laptop",
          "explanation": "In Composition, the parent CustomerOrder controls the lifecycle of OrderItem. The item cannot exist independently of its parent order."
        }
      ],
      "realWorldApplications": [
        "Database cascading deletes (ON DELETE CASCADE) implementing composition lifecycles in ORMs.",
        "Low-Level Design (LLD) modeling in machine coding rounds (Parking Lot, Hotel Management, E-Commerce)."
      ],
      "commonMistakes": [
        "Confusing Aggregation with Composition: in Composition, the part cannot exist without the whole.",
        "Exposing internal composite components directly through public getters, inadvertently degrading composition into weak aggregation.",
        "Failing to cascade deletion or lifecycle termination in composite object relationships."
      ],
      "interviewRelevance": "Frequent System Design / LLD interview question: \"Differentiate between Association, Aggregation, and Composition with real-world examples.\"",
      "checkpoints": [
        {
          "id": "java-37-cp-1",
          "label": "Define the lifecycle ownership difference between Aggregation and Composition"
        },
        {
          "id": "java-37-cp-2",
          "label": "Identify real-world domain models suitable for Composition vs Aggregation"
        },
        {
          "id": "java-37-association-aggregation-composition-cp-3",
          "label": "Distinguish between loose association, aggregation (has-a), and composition (owns-a)."
        }
      ],
      "practiceExercises": [
        {
          "id": "java-37-ex-1",
          "title": "Classify Real-World Relationships",
          "difficulty": "Beginner",
          "type": "conceptual",
          "prompt": "Classify each as Association, Aggregation, or Composition: 1) Bank & Customer, 2) University & Department, 3) Building & Room.",
          "solution": "1) Bank & Customer: Association (both exist independently, a customer can use multiple banks).\n2) University & Department: Aggregation (departments can be reorganized, or professors transferred).\n3) Building & Room: Composition (rooms cannot exist without the physical building structure).",
          "explanation": "Evaluates lifecycle coupling: independent vs shared vs strict death-relationship."
        },
        {
          "id": "java-37-ex-2",
          "title": "Implement Cascading Clean-up in Composition",
          "difficulty": "Intermediate",
          "type": "coding",
          "prompt": "Implement a Computer class composed of CPU and Memory, ensuring closing the Computer closes all components.",
          "solution": "class CPU implements AutoCloseable {\n    public void close() { System.out.println(\"CPU powered down.\"); }\n}\nclass Memory implements AutoCloseable {\n    public void close() { System.out.println(\"Memory flushed.\"); }\n}\nclass Computer implements AutoCloseable {\n    private final CPU cpu = new CPU();\n    private final Memory memory = new Memory();\n    public void close() {\n        memory.close();\n        cpu.close();\n        System.out.println(\"Computer shutdown complete.\");\n    }\n}\npublic class CascadingCleanTest {\n    public static void main(String[] args) {\n        try (Computer c = new Computer()) {\n            System.out.println(\"Computer running.\");\n        }\n    }\n}",
          "explanation": "In composition, lifecycle termination cascades from the composite parent to all constituent child objects."
        },
        {
          "id": "java-37-ex-3",
          "title": "JPA CascadeType.ALL vs Composition",
          "difficulty": "Advanced",
          "type": "conceptual",
          "prompt": "How does JPA / Hibernate model Composition using annotations like @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)?",
          "solution": "When an entity has `@OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)`, it implements exact Composition semantics. If the parent is persisted or deleted, the children are automatically persisted or deleted. If a child is removed from the parent's collection, Hibernate deletes the child record from the database (orphan removal), ensuring the child cannot exist without its parent.",
          "explanation": "JPA orphanRemoval = true mirrors OOP composition semantics in relational databases."
        }
      ],
      "quizQuestions": [
        {
          "id": "java-37-q1",
          "question": "Which relationship describes a \"death relationship\" where the contained object cannot exist without its container?",
          "options": [
            "Association",
            "Aggregation",
            "Composition",
            "Inheritance"
          ],
          "correctOptionIndex": 2,
          "explanation": "Composition represents strong ownership where the child object's lifecycle is bound strictly to the parent object."
        },
        {
          "id": "java-37-q2",
          "question": "A School and a Student relationship where the student continues to exist even if the school closes is an example of:",
          "options": [
            "Composition",
            "Aggregation",
            "Inheritance",
            "Generalization"
          ],
          "correctOptionIndex": 1,
          "explanation": "Aggregation represents weak ownership where child objects have an independent lifecycle beyond the container."
        }
      ],
      "revisionNotes": [
        "Association: General relationship between independent objects.",
        "Aggregation: Weak HAS-A; child objects exist independently of the container.",
        "Composition: Strong HAS-A; child objects are created by and die with the parent."
      ]
    },
    {
      "id": "java-38-solid-principles-design",
      "moduleId": "java-m3",
      "moduleNumber": 3,
      "moduleTitle": "Object-Oriented Programming",
      "topicNumber": 38,
      "title": "SOLID Principles & Essential Design Patterns in Java",
      "language": "java",
      "level": "Beginner",
      "whyItMatters": "The SOLID principles and Gang of Four design patterns are the bedrock of maintainable software engineering. Every senior placement interview evaluates candidates on explaining and applying SOLID in real-world scenarios.",
      "explanation": "The SOLID principles establish guidelines for robust object-oriented software design:\n1. S — Single Responsibility Principle (SRP): A class should have one, and only one, reason to change.\n2. O — Open/Closed Principle (OCP): Software entities should be open for extension, but closed for modification.\n3. L — Liskov Substitution Principle (LSP): Subtypes must be substitutable for their base types without altering program correctness.\n4. I — Interface Segregation Principle (ISP): Clients should not be forced to depend on interfaces they do not use (prefer small, role-focused interfaces).\n5. D — Dependency Inversion Principle (DIP): High-level modules should not depend on low-level modules; both should depend on abstractions.\n\nEssential Creational Patterns:\n- Singleton: Ensures a class has only one instance with a global point of access.\n- Factory: Delegates object creation to specialized factory methods.\n- Builder: Separates construction of complex objects from their representation.",
      "syntaxAndStructure": "// DIP Example:\n// High-level service depends on abstraction (NotificationService), NOT concrete classes\npublic class OrderService {\n    private final NotificationService notifier; // Dependency Inversion\n    public OrderService(NotificationService n) { this.notifier = n; }\n}",
      "codeExamples": [
        {
          "title": "Open/Closed Principle (OCP) via Strategy Polymorphism",
          "code": "// Open for extension: new discount algorithms implement DiscountStrategy\ninterface DiscountStrategy {\n    double applyDiscount(double amount);\n}\n\nclass RegularDiscount implements DiscountStrategy {\n    public double applyDiscount(double amount) { return amount; }\n}\n\nclass VIPDiscount implements DiscountStrategy {\n    public double applyDiscount(double amount) { return amount * 0.80; } // 20% off\n}\n\n// Closed for modification: BillingService does not change when new discounts are created\nclass BillingService {\n    public double calculateTotal(double baseAmount, DiscountStrategy strategy) {\n        return strategy.applyDiscount(baseAmount);\n    }\n}\n\npublic class OCPDemo {\n    public static void main(String[] args) {\n        BillingService billing = new BillingService();\n        System.out.println(\"Regular bill: \" + billing.calculateTotal(100.0, new RegularDiscount()));\n        System.out.println(\"VIP bill: \" + billing.calculateTotal(100.0, new VIPDiscount()));\n    }\n}",
          "expectedOutput": "Regular bill: 100.0\nVIP bill: 80.0",
          "explanation": "Adding a FestivalDiscount requires only writing a new class implementing DiscountStrategy, without touching or modifying BillingService."
        },
        {
          "title": "Liskov Substitution Principle (LSP) Classic Square-Rectangle Violation",
          "code": "// Violating LSP: Square violates Rectangle invariants\nclass Rectangle {\n    protected int width, height;\n    public void setWidth(int w) { this.width = w; }\n    public void setHeight(int h) { this.height = h; }\n    public int getArea() { return width * height; }\n}\n\nclass Square extends Rectangle {\n    @Override\n    public void setWidth(int w) { this.width = w; this.height = w; }\n    @Override\n    public void setHeight(int h) { this.width = h; this.height = h; }\n}\n\npublic class LSPDemo {\n    static void testRectangle(Rectangle r) {\n        r.setWidth(5);\n        r.setHeight(4);\n        // Expecting 5 * 4 = 20!\n        System.out.println(\"Expected 20, Got: \" + r.getArea());\n    }\n\n    public static void main(String[] args) {\n        testRectangle(new Rectangle()); // Works: 20\n        testRectangle(new Square());    // Violates LSP: returns 16!\n    }\n}",
          "expectedOutput": "Expected 20, Got: 20\nExpected 20, Got: 16",
          "explanation": "Square cannot be safely substituted for Rectangle because changing height alters width, violating the client's expectation of independent dimensions."
        }
      ],
      "realWorldApplications": [
        "Dependency injection containers (Spring Framework @Autowired relying on Dependency Inversion).",
        "Refactoring legacy god-classes into single-responsibility services."
      ],
      "commonMistakes": [
        "Creating \"Fat Interfaces\" with 20+ methods, forcing clients to implement useless dummy methods (violating ISP).",
        "Using `new ConcreteService()` inside business classes instead of injecting abstractions (violating DIP).",
        "Violating the Single Responsibility Principle by creating monolithic God classes handling UI, database, and logic."
      ],
      "interviewRelevance": "Mandatory interview question: \"Walk through each of the SOLID principles with an example\", \"Explain the Square-Rectangle LSP violation\", and \"Difference between Factory and Builder patterns.\"",
      "checkpoints": [
        {
          "id": "java-38-cp-1",
          "label": "Define and illustrate all 5 SOLID principles with code examples"
        },
        {
          "id": "java-38-cp-2",
          "label": "Explain the classic Square-Rectangle LSP violation and its architectural resolution"
        },
        {
          "id": "java-38-solid-principles-design-cp-3",
          "label": "Apply all 5 SOLID principles to design decoupled, extensible systems."
        }
      ],
      "practiceExercises": [
        {
          "id": "java-38-ex-1",
          "title": "Refactor Fat Interface to Follow ISP",
          "difficulty": "Beginner",
          "type": "coding",
          "prompt": "Split an interface Worker with void work() and void eat() so that Robot classes are not forced to implement eat().",
          "solution": "interface Workable { void work(); }\ninterface Eatable { void eat(); }\n\nclass HumanWorker implements Workable, Eatable {\n    public void work() { System.out.println(\"Human working\"); }\n    public void eat() { System.out.println(\"Human eating\"); }\n}\n\nclass RobotWorker implements Workable {\n    public void work() { System.out.println(\"Robot working\"); }\n}\n\npublic class ISPRefactorTest {\n    public static void main(String[] args) {\n        new RobotWorker().work();\n    }\n}",
          "explanation": "Interface Segregation Principle breaks fat interfaces into smaller, cohesive, role-specific contracts."
        },
        {
          "id": "java-38-ex-2",
          "title": "Dependency Inversion with Payment Gateway",
          "difficulty": "Intermediate",
          "type": "coding",
          "prompt": "Design an OrderProcessor that depends on a PaymentGateway interface rather than a concrete PayPalGateway class.",
          "solution": "interface PaymentGateway { void processPayment(double amount); }\nclass PayPalGateway implements PaymentGateway {\n    public void processPayment(double a) { System.out.println(\"Paid via PayPal: \" + a); }\n}\nclass OrderProcessor {\n    private final PaymentGateway gateway;\n    public OrderProcessor(PaymentGateway gw) { this.gateway = gw; } // Dependency Inversion\n    public void checkout(double amt) { gateway.processPayment(amt); }\n}\npublic class DIPTest {\n    public static void main(String[] args) {\n        new OrderProcessor(new PayPalGateway()).checkout(199.99);\n    }\n}",
          "explanation": "High-level OrderProcessor depends on abstraction PaymentGateway, satisfying the Dependency Inversion Principle."
        },
        {
          "id": "java-38-ex-3",
          "title": "Thread-Safe Double-Checked Locking Singleton",
          "difficulty": "Advanced",
          "type": "coding",
          "prompt": "Write the classic thread-safe Double-Checked Locking Singleton in Java using the volatile keyword.",
          "solution": "public class SafeSingleton {\n    private static volatile SafeSingleton instance;\n\n    private SafeSingleton() {}\n\n    public static SafeSingleton getInstance() {\n        if (instance == null) {\n            synchronized (SafeSingleton.class) {\n                if (instance == null) {\n                    instance = new SafeSingleton();\n                }\n            }\n        }\n        return instance;\n    }\n    public static void main(String[] args) {\n        System.out.println(\"Singleton instance non-null: \" + (getInstance() != null));\n    }\n}",
          "explanation": "`volatile` prevents CPU instruction reordering where a half-initialized object reference could be observed by other threads."
        }
      ],
      "quizQuestions": [
        {
          "id": "java-38-q1",
          "question": "Which SOLID principle states that \"Subtypes must be substitutable for their base types without altering program correctness\"?",
          "options": [
            "Single Responsibility Principle",
            "Open/Closed Principle",
            "Liskov Substitution Principle",
            "Interface Segregation Principle"
          ],
          "correctOptionIndex": 2,
          "explanation": "Liskov Substitution Principle (LSP) mandates that subclasses must behave such that callers using the parent reference do not encounter broken expectations."
        },
        {
          "id": "java-38-q2",
          "question": "In the Double-Checked Locking Singleton pattern, why is the `volatile` keyword mandatory for the static instance variable?",
          "options": [
            "To prevent garbage collection",
            "To prevent instruction reordering by the compiler and CPU during object creation",
            "To make the class serializable",
            "To force the class into Metaspace"
          ],
          "correctOptionIndex": 1,
          "explanation": "`volatile` prevents memory reordering where memory allocation and reference assignment could occur before the constructor finishes executing."
        }
      ],
      "revisionNotes": [
        "SOLID: Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion.",
        "Open/Closed Principle promotes writing extensible code without modifying tested classes.",
        "Dependency Inversion relies on abstractions rather than concrete classes."
      ]
    }
  ],
  "moduleAssessment": {
    "id": "java-m3-assessment",
    "title": "Module 3 Assessment: Object-Oriented Programming",
    "passingScorePercentage": 80,
    "questions": [
      {
        "id": "java-23-q1",
        "question": "Where is an object instantiated with the `new` keyword stored in the standard JVM?",
        "options": [
          "On the Thread Stack",
          "In the Heap Memory",
          "In the Metaspace",
          "In CPU Cache"
        ],
        "correctOptionIndex": 1,
        "explanation": "All dynamic object allocations created via `new` reside in Heap Memory."
      },
      {
        "id": "java-23-q2",
        "question": "What is created when executing: `Student s1 = new Student(); Student s2 = s1;`?",
        "options": [
          "Two objects on the heap with separate references",
          "One object on the heap with two reference variables pointing to it",
          "A compilation error because s2 is not initialized with new",
          "A clone of the Student object"
        ],
        "correctOptionIndex": 1,
        "explanation": "Assigning s2 = s1 copies the memory address from s1 into s2, creating an alias pointing to the single heap instance."
      },
      {
        "id": "java-24-q1",
        "question": "What occurs if a developer writes `public void Account() { ... }` in a class named Account?",
        "options": [
          "It is a valid no-argument constructor",
          "It is a regular method named Account, NOT a constructor, and won't execute on new Account()",
          "It causes a compilation error",
          "It creates an abstract constructor"
        ],
        "correctOptionIndex": 1,
        "explanation": "Constructors cannot specify any return type, not even void. Specifying void turns it into a standard method."
      },
      {
        "id": "java-24-q2",
        "question": "When does the Java compiler supply an automatic default constructor?",
        "options": [
          "Only when the class has at least one static method",
          "Only if the class does not define any constructors of its own",
          "Always, even if custom parameterized constructors exist",
          "Only in abstract classes"
        ],
        "correctOptionIndex": 1,
        "explanation": "The automatic default constructor is only generated if the class contains zero explicitly defined constructors."
      },
      {
        "id": "java-25-q1",
        "question": "Where must the constructor call `this(...)` be placed inside a constructor?",
        "options": [
          "It can be placed anywhere in the constructor body",
          "It must be the very first statement",
          "It must be the last statement",
          "It must be inside a try-catch block"
        ],
        "correctOptionIndex": 1,
        "explanation": "The Java specification mandates that `this(...)` or `super(...)` must be the first statement in any constructor."
      },
      {
        "id": "java-25-q2",
        "question": "Can a constructor call another constructor using `this(...)` and also call `super(...)` directly?",
        "options": [
          "Yes, if this() is first and super() is second",
          "No, because both must be the first statement",
          "Yes, in Java 17 and above",
          "Only in final classes"
        ],
        "correctOptionIndex": 1,
        "explanation": "Both calls require being the first statement, which is impossible. The target constructor in `this(...)` will handle `super()`."
      },
      {
        "id": "java-26-q1",
        "question": "Which of the following is NOT a valid use of the `this` keyword in Java?",
        "options": [
          "Calling a constructor in the same class: this(...)",
          "Referring to an instance variable: this.variable",
          "Accessing a local variable from inside a static method: this.staticVar",
          "Returning the current object reference from a method: return this;"
        ],
        "correctOptionIndex": 2,
        "explanation": "`this` cannot be used in any static method or static context because static methods execute without an instance."
      },
      {
        "id": "java-26-q2",
        "question": "How do you refer to the enclosing outer class instance from a non-static inner class when variables share names?",
        "options": [
          "super.this",
          "OuterClass.this",
          "this.outer",
          "enclosing.this"
        ],
        "correctOptionIndex": 1,
        "explanation": "`OuterClass.this` explicitly qualifies the outer class instance reference from within an inner class."
      },
      {
        "id": "java-27-q1",
        "question": "Which of the following members of a superclass are NEVER inherited by a subclass in Java?",
        "options": [
          "Constructors",
          "Public methods",
          "Protected fields",
          "Package-private fields in the same package"
        ],
        "correctOptionIndex": 0,
        "explanation": "Constructors are specific to the class that defines them and are never inherited by subclasses (they can only be invoked via super())."
      },
      {
        "id": "java-27-q2",
        "question": "What is the maximum number of classes that a Java class can directly extend using the `extends` keyword?",
        "options": [
          "0",
          "1",
          "2",
          "Unlimited"
        ],
        "correctOptionIndex": 1,
        "explanation": "Java supports single class inheritance: a class can directly extend at most one superclass."
      },
      {
        "id": "java-28-q1",
        "question": "If a child constructor does NOT explicitly contain `this(...)` or `super(...)`, what does the compiler automatically insert?",
        "options": [
          "Nothing",
          "`super();` calling the parent no-arg constructor as the first statement",
          "`this();` calling the child default constructor",
          "A call to `Object();` directly"
        ],
        "correctOptionIndex": 1,
        "explanation": "The compiler automatically inserts a parameterless `super();` call as the first line of any constructor that lacks explicit chaining."
      },
      {
        "id": "java-28-q2",
        "question": "Can `super.method()` be used inside a static method?",
        "options": [
          "Yes, if the parent method is also static",
          "No, super cannot be referenced from a static context",
          "Only if the class is public",
          "Yes, using ClassName.super.method()"
        ],
        "correctOptionIndex": 1,
        "explanation": "Like `this`, `super` requires an active object instance context and is strictly prohibited in static methods."
      },
      {
        "id": "java-29-q1",
        "question": "Which of the following is TRUE regarding the access modifier of an overriding method?",
        "options": [
          "It must have strictly narrower visibility than the parent method",
          "It can have the same or wider visibility, but cannot reduce visibility",
          "It must always be public",
          "It must have the exact same visibility as the parent method"
        ],
        "correctOptionIndex": 1,
        "explanation": "An overriding method cannot reduce visibility (e.g. protected can become public, but cannot become private or default)."
      },
      {
        "id": "java-29-q2",
        "question": "What is a \"covariant return type\" in Java?",
        "options": [
          "A return type that changes dynamically at runtime",
          "An overriding method returning a subtype of the return type declared in the parent method",
          "A method returning multiple values",
          "A return type that must be void"
        ],
        "correctOptionIndex": 1,
        "explanation": "Covariant return types allow a subclass method to return a more specific subclass of the parent method's return type."
      },
      {
        "id": "java-30-q1",
        "question": "Do instance variables in Java participate in runtime polymorphism?",
        "options": [
          "Yes, instance variables are dynamically dispatched like methods",
          "No, field access is resolved at compile time based on the reference type",
          "Only if fields are marked public",
          "Only in Java 21 and above"
        ],
        "correctOptionIndex": 1,
        "explanation": "Fields in Java do not participate in polymorphism. Field accesses are resolved statically at compile time based on the declared reference type."
      },
      {
        "id": "java-30-q2",
        "question": "What JVM opcode is used to execute regular polymorphic instance methods?",
        "options": [
          "invokestatic",
          "invokespecial",
          "invokevirtual",
          "invokedynamic"
        ],
        "correctOptionIndex": 2,
        "explanation": "`invokevirtual` performs dynamic method dispatch using the runtime object's vtable."
      },
      {
        "id": "java-31-q1",
        "question": "What is the primary danger of returning a reference to an internal mutable Date object directly from a getter?",
        "options": [
          "It causes a NullPointerException",
          "External callers can mutate the internal state of the object without using setters, breaking encapsulation",
          "It prevents the Garbage Collector from freeing the object",
          "It triggers a ClassCastException"
        ],
        "correctOptionIndex": 1,
        "explanation": "Returning internal mutable references leaks control of private state, allowing callers to alter values from outside."
      },
      {
        "id": "java-31-q2",
        "question": "Which method should be used to protect a private List field from being modified by clients who call its getter?",
        "options": [
          "list.lock()",
          "Collections.unmodifiableList(list)",
          "list.setFinal()",
          "list.asStatic()"
        ],
        "correctOptionIndex": 1,
        "explanation": "Collections.unmodifiableList() provides a read-only view that throws UnsupportedOperationException on add/remove."
      },
      {
        "id": "java-32-q1",
        "question": "What is the primary benefit of the design rule \"Program to an interface, not an implementation\"?",
        "options": [
          "It compiles the code to C binaries",
          "It decouples client code from concrete classes, allowing implementations to be swapped without modifying callers",
          "It automatically enables multi-threading",
          "It reduces memory usage to zero"
        ],
        "correctOptionIndex": 1,
        "explanation": "Programming to interfaces ensures that client code depends only on contracts, maximizing flexibility and testability."
      },
      {
        "id": "java-32-q2",
        "question": "Which of the following is an example of Abstraction in Java?",
        "options": [
          "Marking a variable private",
          "Using the List interface instead of ArrayList in a method signature",
          "Writing a try-catch block",
          "Creating a while loop"
        ],
        "correctOptionIndex": 1,
        "explanation": "Using the List interface abstracts away the underlying storage mechanism (array vs linked nodes) from the caller."
      },
      {
        "id": "java-33-q1",
        "question": "Can an abstract class in Java have constructors?",
        "options": [
          "No, because abstract classes cannot be instantiated with new",
          "Yes, to initialize instance fields when invoked by subclass constructors via super()",
          "Only if the constructors are public",
          "Only if all methods in the class are abstract"
        ],
        "correctOptionIndex": 1,
        "explanation": "Abstract classes have constructors to initialize inherited fields when subclasses invoke `super(...)`."
      },
      {
        "id": "java-33-q2",
        "question": "Which combinations of modifiers are ILLEGAL for an abstract method?",
        "options": [
          "public abstract",
          "protected abstract",
          "private abstract and final abstract",
          "abstract with throws clause"
        ],
        "correctOptionIndex": 2,
        "explanation": "`private` methods cannot be seen by subclasses, and `final` methods cannot be overridden. Both contradict the requirement that abstract methods must be overridden."
      },
      {
        "id": "java-34-q1",
        "question": "What are the implicit modifiers for variables declared inside a Java interface?",
        "options": [
          "private final",
          "public static final",
          "protected static",
          "volatile"
        ],
        "correctOptionIndex": 1,
        "explanation": "All variables declared in an interface are implicitly `public static final` (compile-time constants)."
      },
      {
        "id": "java-34-q2",
        "question": "Can an interface extend multiple other interfaces using the `extends` keyword?",
        "options": [
          "No, Java prohibits multiple inheritance everywhere",
          "Yes, an interface can extend multiple interfaces simultaneously",
          "Only if the parent interfaces have no methods",
          "Only in abstract interfaces"
        ],
        "correctOptionIndex": 1,
        "explanation": "Interfaces in Java support multiple interface inheritance (e.g. `interface C extends A, B`)."
      },
      {
        "id": "java-35-q1",
        "question": "If a class extends a ParentClass with method `void foo()` and implements an Interface with `default void foo()`, which method is called?",
        "options": [
          "The interface default method",
          "The ParentClass method, because \"classes always win\" over interfaces",
          "A compilation error occurs due to conflict",
          "Randomly selected by the JVM"
        ],
        "correctOptionIndex": 1,
        "explanation": "According to Java's default method resolution rules, any method declaration from a superclass takes precedence over all interface default methods (\"Class wins rule\")."
      },
      {
        "id": "java-35-q2",
        "question": "How do you invoke a static method declared inside an interface `MyInterface`?",
        "options": [
          "MyInterface.staticMethod()",
          "new MyClass().staticMethod()",
          "MyClass.staticMethod()",
          "super.staticMethod()"
        ],
        "correctOptionIndex": 0,
        "explanation": "Static interface methods must be called directly using the interface name (`MyInterface.staticMethod()`). They are not inherited by implementing classes."
      },
      {
        "id": "java-36-q1",
        "question": "What is the \"Fragile Base Class\" problem?",
        "options": [
          "A base class that causes compilation failure when compiled with javac",
          "A problem where modifications to superclass internal implementations can inadvertently break subclasses without compiler warning",
          "A base class with zero subclasses",
          "A class with too many interfaces"
        ],
        "correctOptionIndex": 1,
        "explanation": "The fragile base class problem occurs when changes in superclass internal implementation details cause subclasses to behave incorrectly."
      },
      {
        "id": "java-36-q2",
        "question": "Which relationship does Composition model?",
        "options": [
          "IS-A relationship",
          "HAS-A relationship",
          "IMPLEMENTS-A relationship",
          "USES-A static relationship"
        ],
        "correctOptionIndex": 1,
        "explanation": "Composition models a HAS-A relationship where one object contains a reference to another object."
      },
      {
        "id": "java-37-q1",
        "question": "Which relationship describes a \"death relationship\" where the contained object cannot exist without its container?",
        "options": [
          "Association",
          "Aggregation",
          "Composition",
          "Inheritance"
        ],
        "correctOptionIndex": 2,
        "explanation": "Composition represents strong ownership where the child object's lifecycle is bound strictly to the parent object."
      },
      {
        "id": "java-37-q2",
        "question": "A School and a Student relationship where the student continues to exist even if the school closes is an example of:",
        "options": [
          "Composition",
          "Aggregation",
          "Inheritance",
          "Generalization"
        ],
        "correctOptionIndex": 1,
        "explanation": "Aggregation represents weak ownership where child objects have an independent lifecycle beyond the container."
      },
      {
        "id": "java-38-q1",
        "question": "Which SOLID principle states that \"Subtypes must be substitutable for their base types without altering program correctness\"?",
        "options": [
          "Single Responsibility Principle",
          "Open/Closed Principle",
          "Liskov Substitution Principle",
          "Interface Segregation Principle"
        ],
        "correctOptionIndex": 2,
        "explanation": "Liskov Substitution Principle (LSP) mandates that subclasses must behave such that callers using the parent reference do not encounter broken expectations."
      },
      {
        "id": "java-38-q2",
        "question": "In the Double-Checked Locking Singleton pattern, why is the `volatile` keyword mandatory for the static instance variable?",
        "options": [
          "To prevent garbage collection",
          "To prevent instruction reordering by the compiler and CPU during object creation",
          "To make the class serializable",
          "To force the class into Metaspace"
        ],
        "correctOptionIndex": 1,
        "explanation": "`volatile` prevents memory reordering where memory allocation and reference assignment could occur before the constructor finishes executing."
      }
    ]
  },
  "revisionQuestions": [
    "Explain the object initialization lifecycle in Java from static blocks to constructor bodies.",
    "Why is composition favored over inheritance? Provide a concrete scenario demonstrating the Fragile Base Class problem.",
    "What are covariant return types and what rules govern access modifiers and exceptions in method overriding?",
    "Explain the Diamond Problem in multiple interface default methods and how Java resolves it.",
    "Walk through all 5 SOLID principles with clear Java architectural examples."
  ]
};
