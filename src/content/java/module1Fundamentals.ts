import { MasteryTopic, MasteryModule } from '@/types/mastery';

export const module1Topics: MasteryTopic[] = [
  {
    "id": "java-01-platform-jvm-architecture",
    "moduleId": "java-m1",
    "moduleNumber": 1,
    "moduleTitle": "Java Fundamentals",
    "topicNumber": 1,
    "title": "Java Platform & JVM Architecture",
    "language": "java",
    "level": "Beginner",
    "whyItMatters": "Understanding the JVM is the foundation of Java mastery. Top product-based companies test JVM memory regions, classloading, and the JIT compiler to evaluate whether candidates understand how Java achieves platform independence with high performance.",
    "explanation": "Java achieves its \"Write Once, Run Anywhere\" (WORA) philosophy via the Java Virtual Machine (JVM). When source code (.java) is compiled by javac, it is transformed into intermediate bytecode (.class). The JVM executes this bytecode on any OS. The JVM consists of three main subsystems: the ClassLoader Subsystem (Loading, Linking, Initialization), the Runtime Data Areas (Method Area/Metaspace, Heap, Java Threads Stacks, PC Registers, Native Method Stacks), and the Execution Engine (Bytecode Interpreter, Just-In-Time JIT Compiler, and Garbage Collector). The JIT compiler monitors hot spots (frequently executed code) and compiles them directly into native machine code to dramatically accelerate execution.",
    "syntaxAndStructure": "// Java Program Execution Flow:\n// Source (.java) -> javac -> Bytecode (.class) -> JVM (ClassLoader -> Memory -> Execution Engine)\n\npublic class ArchitectureDemo {\n    public static void main(String[] args) {\n        // Code runs inside main thread stack frame\n    }\n}",
    "codeExamples": [
      {
        "title": "Inspecting JVM Runtime Environment Programmatically",
        "code": "public class JVMInfoDemo {\n    public static void main(String[] args) {\n        Runtime runtime = Runtime.getRuntime();\n        String javaVersion = System.getProperty(\"java.version\");\n        String javaVendor = System.getProperty(\"java.vendor\");\n        \n        long maxMemoryMB = runtime.maxMemory() / (1024 * 1024);\n        int availableProcessors = runtime.availableProcessors();\n        \n        System.out.println(\"Java Vendor: \" + (javaVendor != null && !javaVendor.isEmpty()));\n        System.out.println(\"Available Processors >= 1: \" + (availableProcessors >= 1));\n        System.out.println(\"Max Heap Memory Configured: \" + (maxMemoryMB > 0));\n        System.out.println(\"JVM Architecture Verified.\");\n    }\n}",
        "expectedOutput": "Java Vendor: true\nAvailable Processors >= 1: true\nMax Heap Memory Configured: true\nJVM Architecture Verified.",
        "explanation": "Runtime.getRuntime() provides access to the JVM runtime environment. System.getProperty queries standard JVM configuration variables."
      },
      {
        "title": "Demonstrating Stack vs Heap Allocation",
        "code": "public class MemoryModelDemo {\n    static class Task {\n        String name; // Reference stored in Heap inside Task object\n        Task(String name) { this.name = name; }\n    }\n\n    public static void main(String[] args) {\n        int primitiveCounter = 42; // Allocated on the Stack Frame of main()\n        Task taskInstance = new Task(\"Placement Prep\"); // Reference on Stack, Object on Heap\n        \n        System.out.println(\"Primitive on Stack: \" + primitiveCounter);\n        System.out.println(\"Object Task Name on Heap: \" + taskInstance.name);\n        System.out.println(\"Are references non-null: \" + (taskInstance != null));\n    }\n}",
        "expectedOutput": "Primitive on Stack: 42\nObject Task Name on Heap: Placement Prep\nAre references non-null: true",
        "explanation": "Local primitives like primitiveCounter reside directly on the thread call stack. Objects created with new reside on the Heap, while taskInstance on the stack holds the memory reference address."
      }
    ],
    "realWorldApplications": [
      "JVM performance tuning in high-throughput microservices using GC flags (-Xms, -Xmx, -XX:+UseG1GC).",
      "Diagnosing OutOfMemoryError (Metaspace vs Heap) and StackOverflowError in distributed production systems."
    ],
    "commonMistakes": [
      "Assuming the JVM is platform-independent; the JVM itself is platform-dependent (different for Windows, Linux, macOS), while the bytecode is platform-independent.",
      "Confusing the JIT compiler with javac; javac compiles Java to Bytecode, whereas JIT compiles Bytecode to Native Machine Code at runtime.",
      "Assuming System.gc() guarantees immediate garbage collection rather than being a non-binding hint to the JVM."
    ],
    "interviewRelevance": "Frequent interview topic: Explain JVM architecture, Stack vs Heap memory, JIT compilation advantages, and how Java bytecode executes.",
    "checkpoints": [
      {
        "id": "java-01-cp-1",
        "label": "Understand JVM Subsystems: ClassLoader, Runtime Data Areas, Execution Engine"
      },
      {
        "id": "java-01-cp-2",
        "label": "Differentiate Stack (thread-specific) vs Heap (shared objects) memory allocation"
      },
      {
        "id": "java-01-platform-jvm-architecture-cp-3",
        "label": "Explain the role of JIT compilation and HotSpot adaptive optimization."
      }
    ],
    "practiceExercises": [
      {
        "id": "java-01-ex-1",
        "title": "Identify JVM Memory Region",
        "difficulty": "Beginner",
        "type": "conceptual",
        "prompt": "State which JVM memory region holds: 1) local primitive variables, 2) static variables, 3) instantiated class objects.",
        "solution": "1) Local primitive variables: Stack Frame of the executing thread.\n2) Static variables: Metaspace / Method Area (Heap in modern Java for static object references).\n3) Instantiated class objects: Heap Memory.",
        "explanation": "Each thread has its own stack storing call frames and local primitives. All instantiated objects reside on the shared Heap."
      },
      {
        "id": "java-01-ex-2",
        "title": "Predict Stack Frame Lifecycle",
        "difficulty": "Intermediate",
        "type": "coding",
        "prompt": "Write a recursive function printDepth(int n) that terminates at depth 3, and explain how stack frames are pushed and popped.",
        "solution": "public class StackFrameLifecycle {\n    public static void printDepth(int n) {\n        if (n > 3) return;\n        System.out.println(\"Push Frame: \" + n);\n        printDepth(n + 1);\n        System.out.println(\"Pop Frame: \" + n);\n    }\n    public static void main(String[] args) {\n        printDepth(1);\n    }\n}",
        "explanation": "Each call pushes a new activation record onto the stack. As base cases return, frames are popped in LIFO order."
      },
      {
        "id": "java-01-ex-3",
        "title": "Simulate StackOverflowError Prevention",
        "difficulty": "Advanced",
        "type": "debugging",
        "prompt": "Given an unbounded recursion causing StackOverflowError, implement an iterative alternative using an explicit array stack.",
        "solution": "import java.util.ArrayDeque;\nimport java.util.Deque;\n\npublic class SafeStackSimulation {\n    public static int iterativeFactorial(int n) {\n        Deque<Integer> stack = new ArrayDeque<>();\n        for (int i = 1; i <= n; i++) stack.push(i);\n        int result = 1;\n        while (!stack.isEmpty()) result *= stack.pop();\n        return result;\n    }\n    public static void main(String[] args) {\n        System.out.println(\"Factorial of 5: \" + iterativeFactorial(5));\n    }\n}",
        "explanation": "Using heap-allocated data structures like ArrayDeque prevents call-stack exhaustion on deep iterations."
      }
    ],
    "quizQuestions": [
      {
        "id": "java-01-q1",
        "question": "Which component of the JVM converts bytecode into native machine instructions at runtime for frequently executed code?",
        "options": [
          "javac compiler",
          "ClassLoader",
          "Just-In-Time (JIT) Compiler",
          "Garbage Collector"
        ],
        "correctOptionIndex": 2,
        "explanation": "The JIT compiler profiles running bytecode and compiles \"hot spots\" into native machine instructions for direct hardware execution."
      },
      {
        "id": "java-01-q2",
        "question": "Where are objects created via the new keyword allocated in the JVM?",
        "options": [
          "In the Thread Stack",
          "In the Heap Memory",
          "In the Program Counter (PC) Register",
          "In the Native Method Stack"
        ],
        "correctOptionIndex": 1,
        "explanation": "All objects in Java are dynamically allocated on the Heap. The reference variable pointing to the object resides on the stack or in another object."
      }
    ],
    "revisionNotes": [
      "JVM is platform-specific; Java bytecode is platform-independent (WORA).",
      "Stack stores thread call frames and local primitives; Heap stores all instantiated objects.",
      "JIT compiler accelerates performance by translating hot bytecode into native machine code."
    ]
  },
  {
    "id": "java-02-jdk-jre-jvm",
    "moduleId": "java-m1",
    "moduleNumber": 1,
    "moduleTitle": "Java Fundamentals",
    "topicNumber": 2,
    "title": "JDK, JRE & JVM: Architecture & Relationships",
    "language": "java",
    "level": "Beginner",
    "whyItMatters": "Understanding the boundary between JDK (development), JRE (runtime), and JVM (execution) is essential for configuring build pipelines, Docker container images, and solving placement MCQs.",
    "explanation": "The Java ecosystem is organized in concentric layers:\n1. JVM (Java Virtual Machine): The abstract computing machine that executes bytecode. It includes the classloader, memory areas, and execution engine.\n2. JRE (Java Runtime Environment): JVM + Core Class Libraries (java.lang, java.util, rt.jar) + supporting runtime files. It contains everything needed to RUN compiled Java programs, but lacks development tools like javac.\n3. JDK (Java Development Kit): JRE + Development Tools (javac compiler, jar archiver, javadoc, jdb debugger, jlink). In modern Java (Java 11+), separate JRE downloads were discontinued in favor of modular runtime images generated via jlink.",
    "syntaxAndStructure": "// Hierarchy:\n// JDK = JRE + Development Tools (javac, jdb, jar, javadoc)\n// JRE = JVM + Core Class Libraries + Runtime components\n// JVM = ClassLoader + Runtime Memory + Execution Engine",
    "codeExamples": [
      {
        "title": "Verifying Core Library Availability",
        "code": "public class EcosystemCheck {\n    public static void main(String[] args) {\n        // Checking availability of standard core libraries from JRE/JDK\n        java.util.List<String> components = java.util.List.of(\"JVM\", \"JRE\", \"JDK\");\n        \n        System.out.println(\"Ecosystem layers count: \" + components.size());\n        for (String c : components) {\n            System.out.println(\"Layer: \" + c);\n        }\n        System.out.println(\"JDK/JRE Core classes loaded successfully.\");\n    }\n}",
        "expectedOutput": "Ecosystem layers count: 3\nLayer: JVM\nLayer: JRE\nLayer: JDK\nJDK/JRE Core classes loaded successfully.",
        "explanation": "java.util.List.of() is part of the Java standard library supplied by the JRE layer to all Java programs."
      },
      {
        "title": "Determining Java Home and Runtime Version",
        "code": "public class EnvironmentInspection {\n    public static void main(String[] args) {\n        String javaHome = System.getProperty(\"java.home\");\n        String runtimeVersion = System.getProperty(\"java.runtime.version\");\n        \n        System.out.println(\"Java Home Defined: \" + (javaHome != null && !javaHome.isEmpty()));\n        System.out.println(\"Runtime Version Present: \" + (runtimeVersion != null));\n        System.out.println(\"Ecosystem verified clean.\");\n    }\n}",
        "expectedOutput": "Java Home Defined: true\nRuntime Version Present: true\nEcosystem verified clean.",
        "explanation": "System property java.home points to the runtime directory where the executing JVM and core modules reside."
      }
    ],
    "realWorldApplications": [
      "Packaging minimal Docker containers for microservices using custom JRE runtimes created with jlink.",
      "Configuring CI/CD build agents (which require full JDK) vs production Kubernetes pods (which only require runtime JRE/custom image)."
    ],
    "commonMistakes": [
      "Installing only a JRE on a developer workstation and wondering why `javac` command fails with \"command not found\".",
      "Thinking that the JDK is required in production deployment servers; only the JRE or a modular runtime is required to execute .class or .jar files.",
      "Deploying a full JDK to lightweight production container images instead of using a minimal JRE or jlink runtime."
    ],
    "interviewRelevance": "Classic interview question: \"What is the difference between JDK, JRE, and JVM? Can you run a Java application without a JDK?\"",
    "checkpoints": [
      {
        "id": "java-02-cp-1",
        "label": "Define the relationship: JDK ⊃ JRE ⊃ JVM"
      },
      {
        "id": "java-02-cp-2",
        "label": "Identify which tools belong exclusively to the JDK (javac, jdb, javadoc)"
      },
      {
        "id": "java-02-jdk-jre-jvm-cp-3",
        "label": "Understand jlink modular runtime image creation introduced in Java 9+."
      }
    ],
    "practiceExercises": [
      {
        "id": "java-02-ex-1",
        "title": "Ecosystem Component Identification",
        "difficulty": "Beginner",
        "type": "conceptual",
        "prompt": "A server needs to run a pre-compiled Spring Boot JAR file. Does the server require a JDK, a JRE, or both? Explain why.",
        "solution": "The server only requires a JRE (or a modular runtime image). The JDK contains compilers (javac) and debug tools needed for development; execution only requires the JVM and core libraries found in the JRE.",
        "explanation": "Running pre-compiled bytecode only requires the JRE. The JDK is solely needed when compiling source code from .java files."
      },
      {
        "id": "java-02-ex-2",
        "title": "Inspect System Properties",
        "difficulty": "Intermediate",
        "type": "coding",
        "prompt": "Write a Java class that checks whether the current environment has access to the Java compiler by querying ToolProvider.getSystemJavaCompiler().",
        "solution": "import javax.tools.ToolProvider;\nimport javax.tools.JavaCompiler;\n\npublic class CompilerCheck {\n    public static void main(String[] args) {\n        JavaCompiler compiler = ToolProvider.getSystemJavaCompiler();\n        boolean hasCompiler = (compiler != null);\n        System.out.println(\"Running under full JDK: \" + hasCompiler);\n    }\n}",
        "explanation": "ToolProvider.getSystemJavaCompiler() returns non-null only when running under an environment that includes the JDK development tools."
      },
      {
        "id": "java-02-ex-3",
        "title": "Modern Modular Runtime Image Concept",
        "difficulty": "Advanced",
        "type": "conceptual",
        "prompt": "Explain what jlink does in Java 9+ and why it replaced the traditional monolithic JRE distribution.",
        "solution": "jlink (Java Linker) creates custom, minimal runtime images containing only the specific JVM modules needed by an application (e.g., java.base, java.sql). This reduces container image size from 300MB+ to under 40MB, improving security, memory footprint, and startup time in cloud environments.",
        "explanation": "Modern cloud microservices use jlink to strip unused standard library modules rather than distributing the full 250MB+ JRE."
      }
    ],
    "quizQuestions": [
      {
        "id": "java-02-q1",
        "question": "Which of the following contains the javac compiler?",
        "options": [
          "JVM only",
          "JRE only",
          "JDK only",
          "Both JRE and JVM"
        ],
        "correctOptionIndex": 2,
        "explanation": "javac is a developer tool and is exclusively part of the JDK. The JRE and JVM only execute compiled bytecode."
      },
      {
        "id": "java-02-q2",
        "question": "What is the correct mathematical containment relationship among the three Java platform components?",
        "options": [
          "JVM ⊃ JRE ⊃ JDK",
          "JDK ⊃ JRE ⊃ JVM",
          "JRE ⊃ JDK ⊃ JVM",
          "JDK ⊃ JVM ⊃ JRE"
        ],
        "correctOptionIndex": 1,
        "explanation": "JDK contains JRE plus development tools. JRE contains JVM plus core class libraries."
      }
    ],
    "revisionNotes": [
      "JDK = JRE + Developer Tools (javac, jar, jdb).",
      "JRE = JVM + Core Class Libraries (java.lang, java.util).",
      "JVM = Execution engine that executes .class bytecode."
    ]
  },
  {
    "id": "java-03-compilation-execution-lifecycle",
    "moduleId": "java-m1",
    "moduleNumber": 1,
    "moduleTitle": "Java Fundamentals",
    "topicNumber": 3,
    "title": "Compilation & Execution Lifecycle",
    "language": "java",
    "level": "Beginner",
    "whyItMatters": "Knowing the precise lifecycle of a Java program—from source code to classloading, bytecode verification, and JIT compilation—is vital for debugging classloader conflicts, NoSuchMethodError, and performance bottlenecks.",
    "explanation": "The Java compilation and execution lifecycle occurs in two phases:\n1. Compile-Time: The developer writes `ClassName.java`. The `javac` compiler performs lexical analysis, parsing, semantic checks, type validation, and emits `ClassName.class` bytecode. Bytecode consists of compact opcodes (e.g., iload, aload, invokevirtual).\n2. Runtime: The JVM loads the bytecode via the ClassLoader subsystem (Loading -> Linking [Verification, Preparation, Resolution] -> Initialization). The Bytecode Verifier ensures the code adheres to JVM security and memory safety rules. Finally, the Execution Engine interprets the bytecode, and the JIT compiler compiles hot code segments into native machine instructions.",
    "syntaxAndStructure": "// Step 1: javac Hello.java   -> creates Hello.class (Bytecode)\n// Step 2: java Hello          -> JVM boots, ClassLoader loads Hello.class, runs main()\n\npublic class Hello {\n    public static void main(String[] args) {\n        System.out.println(\"Lifecycle Complete\");\n    }\n}",
    "codeExamples": [
      {
        "title": "Observing Class Loading Lifecycle",
        "code": "public class ClassLifecycleDemo {\n    // Static initialization block runs when class is initialized by ClassLoader\n    static {\n        System.out.println(\"1. Static initializer block executed during class loading.\");\n    }\n\n    // Instance initialization block runs before constructor on object creation\n    {\n        System.out.println(\"3. Instance initializer block executed on instantiation.\");\n    }\n\n    public ClassLifecycleDemo() {\n        System.out.println(\"4. Constructor executed.\");\n    }\n\n    public static void main(String[] args) {\n        System.out.println(\"2. main() method execution started.\");\n        ClassLifecycleDemo demo = new ClassLifecycleDemo();\n        System.out.println(\"5. Lifecycle execution completed.\");\n    }\n}",
        "expectedOutput": "1. Static initializer block executed during class loading.\n2. main() method execution started.\n3. Instance initializer block executed on instantiation.\n4. Constructor executed.\n5. Lifecycle execution completed.",
        "explanation": "Static blocks execute when the class is loaded and initialized by the JVM before main() runs. Instance initializers run before the constructor body on each object creation."
      },
      {
        "title": "ClassLoader Hierarchy Inspection",
        "code": "public class ClassLoaderInspection {\n    public static void main(String[] args) {\n        // Application ClassLoader\n        ClassLoader appClassLoader = ClassLoaderInspection.class.getClassLoader();\n        System.out.println(\"App ClassLoader present: \" + (appClassLoader != null));\n        \n        // Platform/Extension ClassLoader (parent of App ClassLoader)\n        ClassLoader platformClassLoader = appClassLoader != null ? appClassLoader.getParent() : null;\n        System.out.println(\"Platform ClassLoader present: \" + (platformClassLoader != null));\n        \n        // Bootstrap ClassLoader (parent of Platform, written in C/C++, represented as null)\n        ClassLoader bootstrap = platformClassLoader != null ? platformClassLoader.getParent() : null;\n        System.out.println(\"Bootstrap ClassLoader is null in Java: \" + (bootstrap == null));\n    }\n}",
        "expectedOutput": "App ClassLoader present: true\nPlatform ClassLoader present: true\nBootstrap ClassLoader is null in Java: true",
        "explanation": "Java uses a delegation-parent ClassLoader model: Application -> Platform -> Bootstrap. The Bootstrap classloader is written in native C/C++ and is represented as null in Java."
      }
    ],
    "realWorldApplications": [
      "Debugging `ClassNotFoundException` vs `NoClassDefFoundError` in enterprise application servers.",
      "Hot-reloading code in Spring Boot devtools via custom isolated ClassLoaders."
    ],
    "commonMistakes": [
      "Confusing `ClassNotFoundException` (checked exception when Class.forName() fails) with `NoClassDefFoundError` (runtime error when a class present at compile time is missing at runtime).",
      "Modifying a .java file and expecting `java ClassName` to reflect changes without running `javac ClassName.java` first.",
      "Assuming bytecode is directly executed by the OS CPU instead of being interpreted and JIT-compiled by the JVM."
    ],
    "interviewRelevance": "Frequent interview question: \"Explain the ClassLoader delegation model, what happens during bytecode verification, and why the Bootstrap ClassLoader returns null.\"",
    "checkpoints": [
      {
        "id": "java-03-cp-1",
        "label": "Trace the lifecycle from .java source to javac bytecode to JVM ClassLoader to execution"
      },
      {
        "id": "java-03-cp-2",
        "label": "Understand the three stages of Linking: Verification, Preparation, and Resolution"
      },
      {
        "id": "java-03-compilation-execution-lifecycle-cp-3",
        "label": "Trace the lifecycle from .java source to .class bytecode to native machine code."
      }
    ],
    "practiceExercises": [
      {
        "id": "java-03-ex-1",
        "title": "Class Initialization Sequence Order",
        "difficulty": "Beginner",
        "type": "conceptual",
        "prompt": "Arrange the following in execution order when an object is instantiated: Instance Variable Init, Static Variable Init, Constructor, Static Block.",
        "solution": "1. Static Variable Init & Static Block (when class is first loaded)\n2. Instance Variable Init & Instance Block (when object is created)\n3. Constructor (completing object construction)",
        "explanation": "Static members run once upon class loading. Instance initializers run before the constructor on every instance creation."
      },
      {
        "id": "java-03-ex-2",
        "title": "Verify ClassLoader Hierarchy Programmatically",
        "difficulty": "Intermediate",
        "type": "coding",
        "prompt": "Write a program to display the ClassLoader of String.class and explain why it behaves that way.",
        "solution": "public class StringClassLoaderCheck {\n    public static void main(String[] args) {\n        ClassLoader cl = String.class.getClassLoader();\n        System.out.println(\"String ClassLoader: \" + cl);\n    }\n}",
        "explanation": "String.class returns null because it is loaded by the core Bootstrap ClassLoader, which is implemented in native code outside Java."
      },
      {
        "id": "java-03-ex-3",
        "title": "Differentiate ClassNotFoundException and NoClassDefFoundError",
        "difficulty": "Advanced",
        "type": "conceptual",
        "prompt": "In what exact scenario will a JVM throw NoClassDefFoundError instead of ClassNotFoundException?",
        "solution": "ClassNotFoundException occurs when code explicitly attempts to load a class via its string name (e.g., Class.forName(\"com.mysql.jdbc.Driver\")) and the class cannot be found on the classpath. NoClassDefFoundError occurs when a class was available during compile-time, but when the JVM attempts to instantiate it or execute a method at runtime, the class file is missing or its static initialization block previously failed.",
        "explanation": "ClassNotFoundException is a checked exception for dynamic lookup; NoClassDefFoundError is an unchecked LinkageError indicating classpath desynchronization."
      }
    ],
    "quizQuestions": [
      {
        "id": "java-03-q1",
        "question": "Which component performs bytecode verification to prevent illegal memory access and stack overflow before execution?",
        "options": [
          "javac compiler",
          "Bytecode Verifier in JVM ClassLoader linking phase",
          "Garbage Collector",
          "JIT Profiler"
        ],
        "correctOptionIndex": 1,
        "explanation": "The Bytecode Verifier checks that bytecode adheres to JVM constraints (no stack underflow/overflow, type safety, valid register access) during the Linking phase."
      },
      {
        "id": "java-03-q2",
        "question": "What does String.class.getClassLoader() return in standard Java?",
        "options": [
          "AppClassLoader",
          "PlatformClassLoader",
          "null (Bootstrap ClassLoader)",
          "ExtensionClassLoader"
        ],
        "correctOptionIndex": 2,
        "explanation": "Core Java classes loaded by the primordial Bootstrap ClassLoader return null in Java reflection APIs."
      }
    ],
    "revisionNotes": [
      "javac translates source code into bytecode (.class).",
      "ClassLoader stages: Loading -> Linking (Verification, Preparation, Resolution) -> Initialization.",
      "Static initializers execute once on class loading; instance initializers run before each constructor."
    ]
  },
  {
    "id": "java-04-primitive-data-types",
    "moduleId": "java-m1",
    "moduleNumber": 1,
    "moduleTitle": "Java Fundamentals",
    "topicNumber": 4,
    "title": "Primitive Data Types, Sizes & Memory Footprints",
    "language": "java",
    "level": "Beginner",
    "whyItMatters": "Understanding primitive data types, their exact bit widths, ranges, and two’s complement signed representation is essential for avoiding integer overflow, precision loss in financial calculations, and memory optimization in large collections.",
    "explanation": "Java has exactly 8 primitive data types, all having fixed sizes across all hardware platforms:\n1. byte: 8 bits, range -128 to 127 (-2^7 to 2^7-1)\n2. short: 16 bits, range -32,768 to 32,767 (-2^15 to 2^15-1)\n3. int: 32 bits, range -2,147,483,648 to 2,147,483,647 (default integer literal)\n4. long: 64 bits, suffix L/l (e.g., 10000000000L)\n5. float: 32 bits, IEEE 754 single precision, suffix F/f (e.g., 3.14f)\n6. double: 64 bits, IEEE 754 double precision (default floating-point literal)\n7. char: 16 bits, unsigned Unicode character, range 0 to 65,535 (\\u0000 to \\uffff)\n8. boolean: true or false (JVM typically stores as int or byte in arrays).\nAll integer types are signed using two’s complement representation (Java has no unsigned primitives except char, though Java 8+ provides helper methods like Integer.toUnsignedString).",
    "syntaxAndStructure": "byte b = 127;\nshort s = 32000;\nint i = 2_000_000;          // Underscores for readability (Java 7+)\nlong l = 9_000_000_000L;    // L suffix required for literals exceeding int range\nfloat f = 3.14159f;         // f suffix required\ndouble d = 3.1415926535;    // double is default\nchar c = 'A';               // Single quotes for char\nboolean flag = true;",
    "codeExamples": [
      {
        "title": "Demonstrating Exact Primitive Ranges and Sizes",
        "code": "public class PrimitiveTypesDemo {\n    public static void main(String[] args) {\n        System.out.println(\"Byte bits: \" + Byte.SIZE + \", min: \" + Byte.MIN_VALUE + \", max: \" + Byte.MAX_VALUE);\n        System.out.println(\"Short bits: \" + Short.SIZE + \", min: \" + Short.MIN_VALUE + \", max: \" + Short.MAX_VALUE);\n        System.out.println(\"Int bits: \" + Integer.SIZE + \", min: \" + Integer.MIN_VALUE + \", max: \" + Integer.MAX_VALUE);\n        System.out.println(\"Long bits: \" + Long.SIZE + \", min: \" + Long.MIN_VALUE + \", max: \" + Long.MAX_VALUE);\n        System.out.println(\"Char bits: \" + Character.SIZE + \", min: \" + (int)Character.MIN_VALUE + \", max: \" + (int)Character.MAX_VALUE);\n    }\n}",
        "expectedOutput": "Byte bits: 8, min: -128, max: 127\nShort bits: 16, min: -32768, max: 32767\nInt bits: 32, min: -2147483648, max: 2147483647\nLong bits: 64, min: -9223372036854775808, max: 9223372036854775807\nChar bits: 16, min: 0, max: 65535",
        "explanation": "Standard wrapper classes provide constants for exact bit size and min/max values. Notice char is unsigned (0 to 65535)."
      },
      {
        "title": "Integer Overflow and Floating-Point Precision Pitfalls",
        "code": "public class OverflowPrecisionDemo {\n    public static void main(String[] args) {\n        // Integer overflow wraps around due to two's complement arithmetic\n        int maxInt = Integer.MAX_VALUE;\n        int overflowed = maxInt + 1;\n        System.out.println(\"Max Int: \" + maxInt);\n        System.out.println(\"Max Int + 1 wraps to: \" + overflowed);\n\n        // Floating point round-off error in IEEE 754\n        double a = 0.1;\n        double b = 0.2;\n        double sum = a + b;\n        System.out.println(\"0.1 + 0.2 == 0.3: \" + (sum == 0.3));\n        System.out.println(\"Actual 0.1 + 0.2 value: \" + sum);\n    }\n}",
        "expectedOutput": "Max Int: 2147483647\nMax Int + 1 wraps to: -2147483648\n0.1 + 0.2 == 0.3: false\nActual 0.1 + 0.2 value: 0.30000000000000004",
        "explanation": "When Integer.MAX_VALUE overflows, the sign bit becomes 1, wrapping to Integer.MIN_VALUE. Floating-point numbers cannot represent base-10 decimals like 0.1 exactly in binary, requiring BigDecimal for financial calculations."
      }
    ],
    "realWorldApplications": [
      "Using primitive byte and int arrays for low-latency network packet deserialization.",
      "Using BigDecimal instead of double/float for financial accounting, e-commerce pricing, and banking transactions."
    ],
    "commonMistakes": [
      "Using `double` or `float` for monetary calculations (e.g. `0.1 + 0.2 != 0.3`), resulting in cumulative penny errors.",
      "Forgetting the `L` suffix on integer literals larger than 2^31-1 (e.g. `long val = 3000000000;` triggers a compile error).",
      "Using double or float for monetary calculations instead of BigDecimal, leading to binary floating-point rounding errors."
    ],
    "interviewRelevance": "Popular interview question: \"Why is char 16 bits in Java unlike C/C++?\", \"What happens when an int overflows?\", and \"Why shouldn’t you use float for currency?\"",
    "checkpoints": [
      {
        "id": "java-04-cp-1",
        "label": "Memorize all 8 primitives, their exact bit widths, and default values"
      },
      {
        "id": "java-04-cp-2",
        "label": "Understand two's complement overflow behavior and IEEE 754 precision limitations"
      },
      {
        "id": "java-04-primitive-data-types-cp-3",
        "label": "Identify size, default values, and memory representation of all 8 primitive types."
      }
    ],
    "practiceExercises": [
      {
        "id": "java-04-ex-1",
        "title": "Check Char Bit Representation",
        "difficulty": "Beginner",
        "type": "coding",
        "prompt": "Write a snippet that prints the integer ASCII/Unicode value of character 'Z' and converts 65 back to char.",
        "solution": "public class CharConvert {\n    public static void main(String[] args) {\n        char ch = 'Z';\n        int code = ch;\n        char fromCode = (char) 65;\n        System.out.println(\"Code of Z: \" + code);\n        System.out.println(\"Char from 65: \" + fromCode);\n    }\n}",
        "explanation": "char converts implicitly to int. int converts to char via explicit narrowing cast (char) 65."
      },
      {
        "id": "java-04-ex-2",
        "title": "Detect Integer Addition Overflow",
        "difficulty": "Intermediate",
        "type": "coding",
        "prompt": "Implement a function safeAdd(int a, int b) that uses Math.addExact or arithmetic checks to throw ArithmeticException on overflow.",
        "solution": "public class SafeArithmetic {\n    public static int safeAdd(int a, int b) {\n        return Math.addExact(a, b);\n    }\n    public static void main(String[] args) {\n        try {\n            safeAdd(Integer.MAX_VALUE, 1);\n        } catch (ArithmeticException e) {\n            System.out.println(\"Caught overflow cleanly!\");\n        }\n    }\n}",
        "explanation": "Math.addExact() in Java 8+ checks for two's complement overflow and throws ArithmeticException if exceeded."
      },
      {
        "id": "java-04-ex-3",
        "title": "Accurate Currency Math with BigDecimal",
        "difficulty": "Advanced",
        "type": "coding",
        "prompt": "Demonstrate why double fails for 1.00 - 0.90 and write the correct solution using BigDecimal(String).",
        "solution": "import java.math.BigDecimal;\n\npublic class CurrencyCalculation {\n    public static void main(String[] args) {\n        double dDiff = 1.00 - 0.90;\n        System.out.println(\"Double diff: \" + dDiff);\n        \n        BigDecimal b1 = new BigDecimal(\"1.00\");\n        BigDecimal b2 = new BigDecimal(\"0.90\");\n        BigDecimal bDiff = b1.subtract(b2);\n        System.out.println(\"BigDecimal diff: \" + bDiff);\n    }\n}",
        "explanation": "Always construct BigDecimal with a String argument; new BigDecimal(double) preserves binary approximation errors."
      }
    ],
    "quizQuestions": [
      {
        "id": "java-04-q1",
        "question": "What is the size and sign of the char data type in Java?",
        "options": [
          "8 bits, signed",
          "16 bits, unsigned",
          "16 bits, signed",
          "32 bits, unsigned"
        ],
        "correctOptionIndex": 1,
        "explanation": "char in Java is 16 bits and unsigned (0 to 65,535) because Java was designed to support Unicode (UTF-16)."
      },
      {
        "id": "java-04-q2",
        "question": "What is the result of evaluating (byte)(127 + 1) in Java?",
        "options": [
          "128",
          "-128",
          "Compile Error",
          "0"
        ],
        "correctOptionIndex": 1,
        "explanation": "127 in binary is 01111111. Adding 1 gives 10000000, which is -128 in two's complement 8-bit signed representation."
      }
    ],
    "revisionNotes": [
      "Java has 8 primitives: byte(8), short(16), int(32), long(64), float(32), double(64), char(16), boolean.",
      "char is the only unsigned primitive type (0 to 65535).",
      "Use BigDecimal with String constructors for currency and financial math."
    ]
  },
  {
    "id": "java-05-variables-type-conversion",
    "moduleId": "java-m1",
    "moduleNumber": 1,
    "moduleTitle": "Java Fundamentals",
    "topicNumber": 5,
    "title": "Variables, Scope & Type Conversion (Widening & Narrowing)",
    "language": "java",
    "level": "Beginner",
    "whyItMatters": "Type conversions and variable scopes are constant sources of bugs. Understanding implicit widening vs explicit narrowing prevents accidental data truncation, sign-extension surprises, and precision loss.",
    "explanation": "Java variables have three scopes: Local (inside methods/blocks, must be initialized before use), Instance (non-static fields, default initialized to 0/false/null), and Static/Class (shared across all instances).\nType Conversion in Java:\n1. Widening Conversion (Implicit): Converting a smaller data type to a larger data type. It happens automatically without data loss (byte -> short -> int -> long -> float -> double). Note that char -> int is also widening.\n2. Narrowing Conversion (Explicit): Converting a larger data type to a smaller data type. Requires an explicit cast operator `(type)`. Potential for data loss or bit truncation (e.g. `(byte) 300` results in `44` because 300 % 256 = 44).\n3. Type Promotion in Expressions: In any arithmetic expression, byte, short, and char are automatically promoted to int before evaluation.",
    "syntaxAndStructure": "// Widening (Implicit)\nint myInt = 100;\nlong myLong = myInt;        // Automatically converted\ndouble myDouble = myLong;   // Automatically converted\n\n// Narrowing (Explicit Cast)\ndouble pi = 3.14159;\nint truncatedPi = (int) pi; // Explicit (int) required; truncated to 3\n\n// Type promotion in expressions\nbyte b1 = 10;\nbyte b2 = 20;\n// byte b3 = b1 + b2;      // COMPILE ERROR: b1 + b2 produces int\nbyte b3 = (byte)(b1 + b2);  // Correct with explicit cast",
    "codeExamples": [
      {
        "title": "Widening vs Narrowing Cast Demonstration",
        "code": "public class TypeCastingDemo {\n    public static void main(String[] args) {\n        // Widening: int to double\n        int count = 25;\n        double decimalCount = count; // Automatic\n        System.out.println(\"Widened int to double: \" + decimalCount);\n\n        // Narrowing: double to int (truncation)\n        double price = 99.99;\n        int wholePrice = (int) price; // Truncates decimal, does NOT round\n        System.out.println(\"Narrowed double to int: \" + wholePrice);\n\n        // Narrowing: int to byte with bit truncation\n        int largeVal = 260;\n        byte truncatedByte = (byte) largeVal; // 260 in binary = 00000001 00000100 -> lower 8 bits = 4\n        System.out.println(\"260 cast to byte: \" + truncatedByte);\n    }\n}",
        "expectedOutput": "Widened int to double: 25.0\nNarrowed double to int: 99\n260 cast to byte: 4",
        "explanation": "Narrowing from double to int simply truncates fractional digits without rounding. Narrowing to byte retains only the lowest 8 bits (260 & 0xFF = 4)."
      },
      {
        "title": "Numeric Promotion in Arithmetic Expressions",
        "code": "public class PromotionDemo {\n    public static void main(String[] args) {\n        byte a = 40;\n        byte b = 50;\n        byte c = 100;\n        // a * b is promoted to int (2000), which exceeds byte range, then divided by c (100) -> 20\n        int result = a * b / c;\n        System.out.println(\"Promoted calculation result: \" + result);\n\n        char letter = 'A'; // ASCII 65\n        int offsetLetter = letter + 5; // char promoted to int\n        System.out.println(\"Letter 'A' + 5 as int: \" + offsetLetter);\n        System.out.println(\"Cast back to char: \" + (char) offsetLetter);\n    }\n}",
        "expectedOutput": "Promoted calculation result: 20\nLetter 'A' + 5 as int: 70\nCast back to char: F",
        "explanation": "Java automatically promotes byte, short, and char to 32-bit int during evaluation, preventing intermediate overflow in `a * b`."
      }
    ],
    "realWorldApplications": [
      "Parsing binary communication protocol headers where byte buffers must be masked with `0xFF` to avoid negative sign extension when converting to int.",
      "Image pixel processing where 32-bit ARGB values are decomposed into 8-bit alpha, red, green, and blue components."
    ],
    "commonMistakes": [
      "Assuming `(int) 9.99` rounds to 10; floating-point casts to integer always truncate toward zero.",
      "Writing `byte b = 1; b = b + 1;` which causes a compile error because `b + 1` evaluates to `int`. (Note: `b++` and `b += 1` include an implicit cast).",
      "Ignoring integer overflow when casting larger integer values (like long to int or int to byte) without bounds checks."
    ],
    "interviewRelevance": "High frequency in placement tests: \"Why does `byte b = 10; b = b * 2;` not compile but `b *= 2;` compiles?\" and \"What is the result of `(byte) 130`?\"",
    "checkpoints": [
      {
        "id": "java-05-cp-1",
        "label": "Identify automatic widening paths and when explicit narrowing casts are mandatory"
      },
      {
        "id": "java-05-cp-2",
        "label": "Explain why compound assignment operators (+=, *=) include implicit casts"
      },
      {
        "id": "java-05-variables-type-conversion-cp-3",
        "label": "Differentiate between widening (implicit) and narrowing (explicit) type conversions."
      }
    ],
    "practiceExercises": [
      {
        "id": "java-05-ex-1",
        "title": "Evaluate Narrowing Cast Output",
        "difficulty": "Beginner",
        "type": "conceptual",
        "prompt": "What will be printed by: byte b = (byte) 130; System.out.println(b);? Explain the math.",
        "solution": "Output: -126.\nExplanation: 130 in binary is 00000000 00000000 00000000 10000010. Casting to byte retains the lowest 8 bits: 10000010. In two's complement with sign bit 1: -(invert(0000010) + 1) = -(01111101 + 1) = -(01111110) = -126.",
        "explanation": "Integer 130 wraps into negative space because the 8th bit is 1."
      },
      {
        "id": "java-05-ex-2",
        "title": "Compound Assignment vs Explicit Addition",
        "difficulty": "Intermediate",
        "type": "coding",
        "prompt": "Demonstrate with a code snippet why short s = 5; s += 5; compiles while s = s + 5; fails to compile.",
        "solution": "public class CompoundAssignmentTest {\n    public static void main(String[] args) {\n        short s = 5;\n        // s = s + 5; // Error: Type mismatch: cannot convert from int to short\n        s += 5; // Equivalent to s = (short)(s + 5);\n        System.out.println(\"Short value: \" + s);\n    }\n}",
        "explanation": "The Java language specification defines E1 op= E2 as automatically equivalent to E1 = (T)(E1 op E2)."
      },
      {
        "id": "java-05-ex-3",
        "title": "Unsigned Byte to Int Conversion",
        "difficulty": "Advanced",
        "type": "coding",
        "prompt": "Given a signed byte b = -50, convert it to its unsigned integer representation (0 to 255) using bitwise masking.",
        "solution": "public class UnsignedByteConversion {\n    public static void main(String[] args) {\n        byte b = -50;\n        int unsignedVal = b & 0xFF; // Masks out sign-extended bits\n        System.out.println(\"Signed byte: \" + b);\n        System.out.println(\"Unsigned int value: \" + unsignedVal);\n    }\n}",
        "explanation": "In Java, converting byte to int sign-extends the leading bits with 1s. Performing `& 0xFF` clears the upper 24 bits, leaving the correct 0-255 unsigned magnitude."
      }
    ],
    "quizQuestions": [
      {
        "id": "java-05-q1",
        "question": "Which of the following assignments will cause a compile-time error without an explicit cast?",
        "options": [
          "long l = 100;",
          "double d = 3.14f;",
          "int i = 10.5;",
          "float f = 25;"
        ],
        "correctOptionIndex": 2,
        "explanation": "10.5 is a double literal. Assigning a double to an int is a narrowing conversion requiring an explicit cast `(int) 10.5`."
      },
      {
        "id": "java-05-q2",
        "question": "What is the type of the expression (short1 + short2) in Java?",
        "options": [
          "short",
          "int",
          "long",
          "byte"
        ],
        "correctOptionIndex": 1,
        "explanation": "Binary arithmetic operators promote byte and short operands to 32-bit int before applying the operation."
      }
    ],
    "revisionNotes": [
      "Widening (byte -> short/char -> int -> long -> float -> double) is automatic.",
      "Narrowing requires an explicit cast and truncates higher-order bits or fractional values.",
      "Compound assignment operators (`+=`, `*=`) silently insert an explicit cast."
    ]
  },
  {
    "id": "java-06-operators",
    "moduleId": "java-m1",
    "moduleNumber": 1,
    "moduleTitle": "Java Fundamentals",
    "topicNumber": 6,
    "title": "Operators, Precedence & Short-Circuit Evaluation",
    "language": "java",
    "level": "Beginner",
    "whyItMatters": "Operator precedence, prefix vs postfix increment nuances, and short-circuit evaluation (`&&` vs `&`, `||` vs `|`) are classic placement test traps that determine execution flow and prevent null pointer crashes.",
    "explanation": "Java operators are categorized into Arithmetic (+, -, *, /, %), Relational (==, !=, >, <, >=, <=), Logical (&&, ||, !), Bitwise (&, |, ^, ~, <<, >>, >>>), and Assignment (=, +=, etc.).\nKey concepts:\n1. Short-Circuit Logical Operators: `&&` and `||` evaluate the right-hand operand only if the left-hand operand does not determine the outcome. For example, `if (str != null && str.length() > 0)` never evaluates `str.length()` if `str` is null, preventing NullPointerException.\n2. Non-Short-Circuit Bitwise/Logical: `&` and `|` always evaluate both sides regardless of the left side.\n3. Shift Operators: `>>` performs signed arithmetic right shift (preserves sign bit), while `>>>` performs unsigned logical right shift (shifts zeros into high-order bits).\n4. Increment/Decrement: Postfix (`i++`) evaluates the current value first, then increments. Prefix (`++i`) increments first, then evaluates.",
    "syntaxAndStructure": "// Short-circuit safe navigation\nif (obj != null && obj.isValid()) { ... }\n\n// Bitwise shifts\nint x = -8;\nint signedShift = x >> 1;   // -4 (sign bit preserved)\nint unsignedShift = x >>> 1; // Large positive number (0 shifted in MSB)\n\n// Prefix vs Postfix\nint a = 5;\nint b = a++; // b = 5, a = 6\nint c = ++a; // a = 7, c = 7",
    "codeExamples": [
      {
        "title": "Short-Circuit Evaluation Preventing Exceptions",
        "code": "public class ShortCircuitDemo {\n    public static void main(String[] args) {\n        String testString = null;\n\n        // Safe: short-circuit && avoids NullPointerException\n        if (testString != null && testString.length() > 5) {\n            System.out.println(\"Long string\");\n        } else {\n            System.out.println(\"Safe check passed without NullPointerException.\");\n        }\n\n        int x = 10;\n        int y = 20;\n        // In ||, first condition (x > 5) is true, so ++y is NEVER evaluated\n        if (x > 5 || ++y > 20) {\n            System.out.println(\"y remains unincremented: \" + y);\n        }\n    }\n}",
        "expectedOutput": "Safe check passed without NullPointerException.\ny remains unincremented: 20",
        "explanation": "Because x > 5 is true, the || short-circuits and ++y is skipped, leaving y equal to 20."
      },
      {
        "title": "Signed (>>) vs Unsigned (>>>) Right Shift",
        "code": "public class BitwiseShiftDemo {\n    public static void main(String[] args) {\n        int negativeNumber = -16;\n        \n        int signedShift = negativeNumber >> 2;   // Preserves 1 in sign bit\n        int unsignedShift = negativeNumber >>> 2; // Injects 0 into sign bit\n        \n        System.out.println(\"-16 >> 2 = \" + signedShift);\n        System.out.println(\"-16 >>> 2 is positive: \" + (unsignedShift > 0));\n        System.out.println(\"Value of -16 >>> 2: \" + unsignedShift);\n    }\n}",
        "expectedOutput": "-16 >> 2 = -4\n-16 >>> 2 is positive: true\nValue of -16 >>> 2: 1073741820",
        "explanation": "Signed shift (>>) divides by 4 preserving sign (-4). Unsigned shift (>>>) fills the highest bits with 0, transforming a negative number into a large positive integer."
      }
    ],
    "realWorldApplications": [
      "Null-safe defensive checks in high-traffic APIs using short-circuit logical operators.",
      "Bitwise masking and shifting in cryptographic algorithms and hashing functions (e.g. `hashCode()` calculation)."
    ],
    "commonMistakes": [
      "Using `&` instead of `&&` when performing null checks: `if (s != null & s.length() > 0)` crashes with NullPointerException because `&` evaluates both sides.",
      "Writing `x = x++` expecting x to increase; postfix `x++` evaluates the old value, then writes the old value back to x, leaving x unchanged!",
      "Confusing bitwise operators (&, |) with short-circuit logical operators (&&, ||), causing unexpected operand evaluations."
    ],
    "interviewRelevance": "Common interview questions: \"Explain the difference between `>>` and `>>>`\", \"What is the output of `int x = 5; System.out.println(x++ + ++x);`?\", and \"Why does Java have both `&` and `&&`?\"",
    "checkpoints": [
      {
        "id": "java-06-cp-1",
        "label": "Distinguish short-circuit (&&, ||) from eager bitwise (&, |) operators"
      },
      {
        "id": "java-06-cp-2",
        "label": "Explain differences between arithmetic right shift (>>) and logical right shift (>>>)"
      },
      {
        "id": "java-06-operators-cp-3",
        "label": "Apply operator precedence and short-circuit evaluation rules correctly."
      }
    ],
    "practiceExercises": [
      {
        "id": "java-06-ex-1",
        "title": "Evaluate Tricky Postfix Expression",
        "difficulty": "Beginner",
        "type": "coding",
        "prompt": "Predict and verify the output of: int a = 5; int result = a++ + ++a * 2;",
        "solution": "public class PostfixTest {\n    public static void main(String[] args) {\n        int a = 5;\n        // Evaluation order:\n        // 1. a++ evaluates to 5, a becomes 6\n        // 2. ++a increments a to 7, evaluates to 7\n        // 3. Multiplication has higher precedence: 7 * 2 = 14\n        // 4. Addition: 5 + 14 = 19\n        int result = a++ + ++a * 2;\n        System.out.println(\"Result: \" + result);\n        System.out.println(\"Final a: \" + a);\n    }\n}",
        "explanation": "a++ returns 5 (a=6); ++a returns 7 (a=7). Multiplication (7 * 2 = 14) executes before addition (5 + 14 = 19)."
      },
      {
        "id": "java-06-ex-2",
        "title": "Check Power of Two Using Bitwise AND",
        "difficulty": "Intermediate",
        "type": "coding",
        "prompt": "Implement isPowerOfTwo(int n) using a single line bitwise expression.",
        "solution": "public class PowerOfTwoCheck {\n    public static boolean isPowerOfTwo(int n) {\n        return n > 0 && (n & (n - 1)) == 0;\n    }\n    public static void main(String[] args) {\n        System.out.println(\"16 is power of 2: \" + isPowerOfTwo(16));\n        System.out.println(\"18 is power of 2: \" + isPowerOfTwo(18));\n    }\n}",
        "explanation": "Powers of 2 have exactly one 1-bit in binary (e.g. 16 = 10000). Subtracting 1 flips all bits up to the 1-bit (15 = 01111). Their bitwise AND is 0."
      },
      {
        "id": "java-06-ex-3",
        "title": "Swap Two Variables Without Temp Variable",
        "difficulty": "Advanced",
        "type": "coding",
        "prompt": "Write a program to swap two integers using the XOR bitwise operator without auxiliary memory.",
        "solution": "public class XORSwap {\n    public static void main(String[] args) {\n        int x = 42;\n        int y = 99;\n        \n        x = x ^ y;\n        y = x ^ y; // y becomes original x\n        x = x ^ y; // x becomes original y\n        \n        System.out.println(\"x: \" + x + \", y: \" + y);\n    }\n}",
        "explanation": "XOR properties (A ^ A = 0, A ^ 0 = A, commutative and associative) allow swapping without temporary memory or overflow risks."
      }
    ],
    "quizQuestions": [
      {
        "id": "java-06-q1",
        "question": "What is the output of: int x = 1; if (x > 0 || (10 / 0 == 0)) System.out.println(\"Pass\");",
        "options": [
          "ArithmeticException: / by zero",
          "Pass",
          "Compile Error",
          "No output"
        ],
        "correctOptionIndex": 1,
        "explanation": "Because `x > 0` is true, the `||` short-circuits and never evaluates `10 / 0`, avoiding any ArithmeticException."
      },
      {
        "id": "java-06-q2",
        "question": "What does the operator `>>>` do in Java?",
        "options": [
          "Right shift signed (retains sign bit)",
          "Right shift unsigned (fills high-order bits with 0)",
          "Left shift unsigned (fills low-order bits with 1)",
          "Rotates bits circularly"
        ],
        "correctOptionIndex": 1,
        "explanation": "`>>>` is the unsigned (logical) right shift operator. It shifts bits to the right and unconditionally inserts 0 into the most significant bits."
      }
    ],
    "revisionNotes": [
      "`&&` and `||` short-circuit; `&` and `|` always evaluate both operands.",
      "`>>` retains the sign bit; `>>>` shifts zeros into the most significant bits.",
      "`n & (n - 1) == 0` is the standard O(1) test for powers of two."
    ]
  },
  {
    "id": "java-07-input-output",
    "moduleId": "java-m1",
    "moduleNumber": 1,
    "moduleTitle": "Java Fundamentals",
    "topicNumber": 7,
    "title": "Standard I/O, Scanner, BufferedReader & Formatted Output",
    "language": "java",
    "level": "Beginner",
    "whyItMatters": "Competitive programming and coding tests often fail due to Time Limit Exceeded (TLE) when reading millions of integers with `Scanner`. Understanding `BufferedReader` vs `Scanner` is mandatory for technical screening rounds.",
    "explanation": "Java provides multiple ways to handle input and output:\n1. `Scanner`: Easy to use, parses primitives and tokens using regex, but slow due to synchronization and internal regex overhead (buffer size: 1024 chars).\n2. `BufferedReader`: Reads raw streams of characters into an 8192-char buffer. Significantly faster than Scanner (often 4-5x faster for competitive programming), but reads strings only (requires manual parsing like `Integer.parseInt()`).\n3. Output:\n   - `System.out.print()` / `println()`: Standard stream printing.\n   - `System.out.printf()` / `String.format()`: Formatted strings using format specifiers (`%d` for decimal integers, `%f` for floating-point, `%s` for strings, `%n` for platform-independent newlines).",
    "syntaxAndStructure": "// Scanner approach:\nScanner sc = new Scanner(System.in);\nint val = sc.nextInt();\nString line = sc.nextLine();\n\n// Fast I/O approach:\nBufferedReader br = new BufferedReader(new InputStreamReader(System.in));\nString line = br.readLine();\nint parsedInt = Integer.parseInt(line);\n\n// Formatted Output:\nSystem.out.printf(\"Name: %-10s | Score: %05d | Rate: %.2f%n\", \"Alice\", 42, 98.7654);",
    "codeExamples": [
      {
        "title": "Formatted Output with System.out.printf",
        "code": "public class FormattedIODemo {\n    public static void main(String[] args) {\n        String name = \"Candidate\";\n        int score = 85;\n        double percentile = 97.4567;\n        \n        // %-12s: Left-aligned string in 12 char field\n        // %03d: Integer zero-padded to 3 digits\n        // %.2f: Floating point rounded to 2 decimal places\n        // %n: Platform-independent newline\n        System.out.printf(\"Report: %-10s | Marks: %03d | Percentile: %.2f%%%n\", name, score, percentile);\n        \n        // String.format generates formatted string without printing directly\n        String formatted = String.format(\"Summary: %s scored %.1f\", name, percentile);\n        System.out.println(formatted);\n    }\n}",
        "expectedOutput": "Report: Candidate  | Marks: 085 | Percentile: 97.46%\nSummary: Candidate scored 97.5",
        "explanation": "printf and String.format use standard printf specifiers. `%%` escapes a literal percent sign, and `%n` produces \\n or \\r\\n depending on OS."
      },
      {
        "title": "Simulating Fast I/O with BufferedReader & StringTokenizer",
        "code": "import java.io.BufferedReader;\nimport java.io.StringReader;\nimport java.util.StringTokenizer;\n\npublic class FastIOComparisonDemo {\n    public static void main(String[] args) throws Exception {\n        // Simulating input stream\n        String simulatedInput = \"5\\n10 20 30 40 50\\n\";\n        BufferedReader reader = new BufferedReader(new StringReader(simulatedInput));\n        \n        int n = Integer.parseInt(reader.readLine().trim());\n        StringTokenizer tokenizer = new StringTokenizer(reader.readLine());\n        \n        int sum = 0;\n        while (tokenizer.hasMoreTokens()) {\n            sum += Integer.parseInt(tokenizer.nextToken());\n        }\n        \n        System.out.println(\"Elements count: \" + n);\n        System.out.println(\"Fast parsed sum: \" + sum);\n    }\n}",
        "expectedOutput": "Elements count: 5\nFast parsed sum: 150",
        "explanation": "BufferedReader + StringTokenizer splits whitespace-delimited tokens in memory without regex overhead, avoiding TLE on large competitive programming inputs."
      }
    ],
    "realWorldApplications": [
      "Fast log file parsing and data pipeline ingestion in batch processing systems.",
      "Passing online coding platform test cases where inputs have 10^5 to 10^6 lines and Scanner would trigger TLE."
    ],
    "commonMistakes": [
      "The \"Scanner nextLine() trap\": Calling `sc.nextLine()` immediately after `sc.nextInt()` consumes the residual newline character left in the buffer instead of the next line.",
      "Using `\\n` instead of `%n` in `printf`; `%n` is portable across Windows (CRLF) and Linux (LF).",
      "Using Scanner.nextLine() immediately after Scanner.nextInt() without consuming the trailing newline character."
    ],
    "interviewRelevance": "Crucial for coding rounds: \"Why did my solution get TLE with Scanner?\" and \"How does the Scanner nextLine() bug occur and how do you fix it?\"",
    "checkpoints": [
      {
        "id": "java-07-cp-1",
        "label": "Explain the Scanner nextLine() newline buffer bug and its fix"
      },
      {
        "id": "java-07-cp-2",
        "label": "Implement fast input reading using BufferedReader and StringTokenizer"
      },
      {
        "id": "java-07-input-output-cp-3",
        "label": "Choose appropriately between Scanner, BufferedReader, and System.console()."
      }
    ],
    "practiceExercises": [
      {
        "id": "java-07-ex-1",
        "title": "Fix Scanner nextLine() Buffer Trap",
        "difficulty": "Beginner",
        "type": "coding",
        "prompt": "Demonstrate the Scanner nextLine() bug and fix it by consuming the residual newline.",
        "solution": "import java.util.Scanner;\n\npublic class ScannerTrapFix {\n    public static void main(String[] args) {\n        String input = \"42\\nPlacement Prep\\n\";\n        Scanner sc = new Scanner(input);\n        \n        int age = sc.nextInt();\n        sc.nextLine(); // CONSUME RESIDUAL NEWLINE\n        String name = sc.nextLine();\n        \n        System.out.println(\"Age: \" + age + \", Name: \" + name);\n    }\n}",
        "explanation": "nextInt() consumes only numeric characters. The trailing \\n remains in the stream until consumed by an extra sc.nextLine()."
      },
      {
        "id": "java-07-ex-2",
        "title": "Custom FastScanner Implementation",
        "difficulty": "Intermediate",
        "type": "coding",
        "prompt": "Write a minimal FastScanner utility class wrapping BufferedReader and StringTokenizer.",
        "solution": "import java.io.*;\nimport java.util.StringTokenizer;\n\npublic class FastScanner {\n    private BufferedReader br;\n    private StringTokenizer st;\n\n    public FastScanner(Reader r) {\n        br = new BufferedReader(r);\n    }\n\n    public String next() throws IOException {\n        while (st == null || !st.hasMoreTokens()) {\n            String line = br.readLine();\n            if (line == null) return null;\n            st = new StringTokenizer(line);\n        }\n        return st.nextToken();\n    }\n\n    public int nextInt() throws IOException {\n        return Integer.parseInt(next());\n    }\n}",
        "explanation": "This FastScanner template provides fast amortized token retrieval by caching tokenizers per line."
      },
      {
        "id": "java-07-ex-3",
        "title": "Formatted Table Output Generation",
        "difficulty": "Advanced",
        "type": "coding",
        "prompt": "Generate an aligned console table of 3 products with columns: ID (4 digits zero-padded), Name (15 chars left-aligned), Price (2 decimals, right-aligned, 8 width).",
        "solution": "public class TableFormat {\n    public static void main(String[] args) {\n        System.out.printf(\"%-4s | %-15s | %8s%n\", \"ID\", \"Name\", \"Price\");\n        System.out.println(\"---------------------------------\");\n        System.out.printf(\"%04d | %-15s | %8.2f%n\", 1, \"Laptop\", 899.99);\n        System.out.printf(\"%04d | %-15s | %8.2f%n\", 25, \"Wireless Mouse\", 24.50);\n        System.out.printf(\"%04d | %-15s | %8.2f%n\", 102, \"Monitor 4K\", 349.00);\n    }\n}",
        "explanation": "Format specifier flags (%-s for left-align, %0d for zero-padding, %8.2f for right-aligned fixed width) format structured tables without manual string concatenation."
      }
    ],
    "quizQuestions": [
      {
        "id": "java-07-q1",
        "question": "Why is BufferedReader significantly faster than Scanner for reading large volumes of input?",
        "options": [
          "BufferedReader compiles directly into C code",
          "BufferedReader uses a large 8KB internal buffer and does not parse inputs with regular expressions",
          "Scanner does not support multi-threading",
          "BufferedReader ignores Unicode characters"
        ],
        "correctOptionIndex": 1,
        "explanation": "Scanner uses regular expression matching and smaller buffers, whereas BufferedReader reads character blocks into an 8KB buffer without regex overhead."
      },
      {
        "id": "java-07-q2",
        "question": "What is the purpose of %n in String.format() or System.out.printf()?",
        "options": [
          "Inserts a null character",
          "Generates a platform-independent line separator (\\n on Unix, \\r\\n on Windows)",
          "Prints numbers in scientific notation",
          "Forces a memory flush"
        ],
        "correctOptionIndex": 1,
        "explanation": "%n always outputs the line separator specific to the host operating system."
      }
    ],
    "revisionNotes": [
      "Use BufferedReader + StringTokenizer for competitive programming fast I/O.",
      "Always consume the leftover newline after nextInt()/nextDouble() before calling nextLine().",
      "Use %n in printf for cross-platform newline safety."
    ]
  },
  {
    "id": "java-08-conditional-statements",
    "moduleId": "java-m1",
    "moduleNumber": 1,
    "moduleTitle": "Java Fundamentals",
    "topicNumber": 8,
    "title": "Conditional Statements & Modern Switch Expressions",
    "language": "java",
    "level": "Beginner",
    "whyItMatters": "Control flow is fundamental to all algorithm implementations. Modern Java (Java 14+) introduced switch expressions with arrow syntax (`->`) and `yield`, eliminating fall-through bugs and returning values directly.",
    "explanation": "Java provides standard conditional structures:\n1. `if`, `else if`, `else`: Boolean expression branches.\n2. Traditional `switch`: Evaluates byte, short, char, int, String, or Enum. Requires explicit `break` statements to prevent unintentional fall-through.\n3. Modern Switch Expressions (Java 14+ LTS / Java 17+):\n   - Uses arrow syntax (`case X -> ...`), which does NOT fall through.\n   - Can be used as an expression that returns a value (e.g. `String type = switch(day) { ... };`).\n   - Supports multi-label matching (`case 1, 2, 3 ->`).\n   - Uses the `yield` keyword to return values from multi-line code blocks.\n   - Enforces exhaustiveness (requires `default` unless all enum or sealed type cases are covered).",
    "syntaxAndStructure": "// Traditional switch (watch out for missing breaks):\nswitch(val) {\n    case 1: doA(); break;\n    default: doDefault();\n}\n\n// Modern Switch Expression (Java 14+):\nString result = switch(day) {\n    case MONDAY, FRIDAY -> \"Work\";\n    case SATURDAY, SUNDAY -> \"Weekend\";\n    default -> {\n        System.out.println(\"Midweek\");\n        yield \"Midweek Day\";\n    }\n};",
    "codeExamples": [
      {
        "title": "Modern Switch Expression with Arrow Syntax and Value Yielding",
        "code": "public class ModernSwitchDemo {\n    public static void main(String[] args) {\n        String day = \"SATURDAY\";\n\n        // Modern switch as an expression returning a value\n        String dayType = switch (day) {\n            case \"MONDAY\", \"TUESDAY\", \"WEDNESDAY\", \"THURSDAY\", \"FRIDAY\" -> \"Weekday\";\n            case \"SATURDAY\", \"SUNDAY\" -> \"Weekend\";\n            default -> \"Unknown\";\n        };\n        System.out.println(day + \" is a: \" + dayType);\n\n        // Switch expression with multi-line block and yield\n        int score = 88;\n        String grade = switch (score / 10) {\n            case 10, 9 -> \"A+\";\n            case 8 -> {\n                System.out.println(\"High performance achieved.\");\n                yield \"A\";\n            }\n            case 7 -> \"B\";\n            default -> \"C\";\n        };\n        System.out.println(\"Final Grade: \" + grade);\n    }\n}",
        "expectedOutput": "SATURDAY is a: Weekend\nHigh performance achieved.\nFinal Grade: A",
        "explanation": "Arrow syntax (`->`) eliminates fall-through without needing break statements. Multi-line blocks inside switch expressions return values using the `yield` keyword."
      },
      {
        "title": "Ternary Operator Nested Evaluation",
        "code": "public class TernaryDemo {\n    public static void main(String[] args) {\n        int a = 15;\n        int b = 25;\n        int c = 20;\n\n        // Nested ternary operator to find maximum among three numbers\n        int max = (a > b) ? ((a > c) ? a : c) : ((b > c) ? b : c);\n        System.out.println(\"Maximum of \" + a + \", \" + b + \", \" + c + \" is: \" + max);\n\n        String parity = (max % 2 == 0) ? \"Even\" : \"Odd\";\n        System.out.println(\"Max number parity: \" + parity);\n    }\n}",
        "expectedOutput": "Maximum of 15, 25, 20 is: 25\nMax number parity: Odd",
        "explanation": "Ternary operator `condition ? expr1 : expr2` is an inline shorthand for if-else, returning an evaluated expression value."
      }
    ],
    "realWorldApplications": [
      "State machine transitions, HTTP status code dispatching, and command routing in REST microservices.",
      "Refactoring verbose nested if-else ladders into clean, readable, compiler-verified switch expressions."
    ],
    "commonMistakes": [
      "Missing `break` in traditional switch statements, leading to accidental fall-through bugs.",
      "Using `return` instead of `yield` inside a multi-line switch expression block; `return` returns from the enclosing method, while `yield` produces a value for the switch expression.",
      "Forgetting break statements in switch cases, causing unintentional fall-through bugs."
    ],
    "interviewRelevance": "Interview favorite: \"How do modern switch expressions differ from traditional switch statements?\" and \"What is the purpose of the yield keyword in Java 14+?\"",
    "checkpoints": [
      {
        "id": "java-08-cp-1",
        "label": "Master arrow syntax (->) in modern switch expressions without fall-through"
      },
      {
        "id": "java-08-cp-2",
        "label": "Use yield keyword correctly in multi-line switch expression blocks"
      },
      {
        "id": "java-08-conditional-statements-cp-3",
        "label": "Use modern switch expressions with arrow syntax (->) and pattern matching."
      }
    ],
    "practiceExercises": [
      {
        "id": "java-08-ex-1",
        "title": "Convert If-Else Chain to Switch Expression",
        "difficulty": "Beginner",
        "type": "coding",
        "prompt": "Convert an HTTP status code check (200 -> OK, 404 -> Not Found, 500 -> Server Error) into a modern switch expression.",
        "solution": "public class HttpStatusSwitch {\n    public static String getMessage(int statusCode) {\n        return switch (statusCode) {\n            case 200 -> \"OK\";\n            case 404 -> \"Not Found\";\n            case 500 -> \"Internal Server Error\";\n            default -> \"Unknown Code\";\n        };\n    }\n    public static void main(String[] args) {\n        System.out.println(getMessage(200));\n        System.out.println(getMessage(404));\n    }\n}",
        "explanation": "Switch expressions return values directly from cases without repetitive return or break statements."
      },
      {
        "id": "java-08-ex-2",
        "title": "Safe Enum Dispatching Without Default",
        "difficulty": "Intermediate",
        "type": "coding",
        "prompt": "Define an enum Priority { LOW, MEDIUM, HIGH } and write an exhaustive switch expression that calculates turnaround time in days without needing a default branch.",
        "solution": "public class EnumSwitchExhaustive {\n    enum Priority { LOW, MEDIUM, HIGH }\n\n    public static int getTurnaroundDays(Priority p) {\n        return switch (p) {\n            case LOW -> 7;\n            case MEDIUM -> 3;\n            case HIGH -> 1;\n        };\n    }\n    public static void main(String[] args) {\n        System.out.println(\"High priority turnaround: \" + getTurnaroundDays(Priority.HIGH));\n    }\n}",
        "explanation": "When switching on an Enum, if all enum constants are covered, the Java compiler guarantees exhaustiveness and omits the default requirement."
      },
      {
        "id": "java-08-ex-3",
        "title": "Calculate Leap Year with Boolean Logic",
        "difficulty": "Advanced",
        "type": "coding",
        "prompt": "Write isLeapYear(int year) using clean boolean logic (divisible by 4 and not 100, or divisible by 400).",
        "solution": "public class LeapYear {\n    public static boolean isLeapYear(int year) {\n        return (year % 4 == 0 && year % 100 != 0) || (year % 400 == 0);\n    }\n    public static void main(String[] args) {\n        System.out.println(\"2000 is leap: \" + isLeapYear(2000));\n        System.out.println(\"1900 is leap: \" + isLeapYear(1900));\n        System.out.println(\"2024 is leap: \" + isLeapYear(2024));\n    }\n}",
        "explanation": "Centurial years must be divisible by 400 to be leap years (hence 1900 is not, but 2000 is)."
      }
    ],
    "quizQuestions": [
      {
        "id": "java-08-q1",
        "question": "Which keyword is used in Java 14+ switch expressions to produce a value from a multi-line block?",
        "options": [
          "return",
          "yield",
          "break",
          "emit"
        ],
        "correctOptionIndex": 1,
        "explanation": "`yield` returns a value from a block within a switch expression, while `return` exits the entire enclosing method."
      },
      {
        "id": "java-08-q2",
        "question": "What is true regarding the arrow syntax (case X -> ...) in modern Java switch?",
        "options": [
          "It requires break after every case",
          "It automatically falls through to subsequent cases",
          "Only the code to the right of the arrow is executed, preventing fall-through",
          "It only works with numbers"
        ],
        "correctOptionIndex": 2,
        "explanation": "Arrow case syntax completely eliminates unintentional fall-through behavior, executing solely the targeted branch."
      }
    ],
    "revisionNotes": [
      "Modern switch expressions (`case X ->`) never fall through, unlike traditional colon syntax.",
      "`yield` produces a value from a multi-statement switch block.",
      "Exhaustive enum and sealed class switches do not require a `default` case."
    ]
  },
  {
    "id": "java-09-loops",
    "moduleId": "java-m1",
    "moduleNumber": 1,
    "moduleTitle": "Java Fundamentals",
    "topicNumber": 9,
    "title": "Loops, Enhanced For-Each & Labeled Break/Continue",
    "language": "java",
    "level": "Beginner",
    "whyItMatters": "Iterative processing powers virtually all data structures and sorting routines. Labeled break and continue statements are crucial for cleanly terminating nested search loops without convoluted boolean flags.",
    "explanation": "Java supports four loop constructs:\n1. `for`: Standard index-based loop (`for (int i = 0; i < n; i++)`). Ideal when iteration bounds are known.\n2. Enhanced `for-each`: (`for (ElementType item : collection)`). Cleaner syntax for iterating arrays and `Iterable` collections. Read-only with respect to array element references.\n3. `while`: Pre-condition check loop. Executes 0 or more times.\n4. `do-while`: Post-condition check loop. Always executes at least once.\n\nControl Flow Alterations:\n- `break`: Exits the innermost loop.\n- `continue`: Skips the remainder of the current iteration and advances loop counter.\n- Labeled `break` / `continue`: Attaching a label (e.g. `outerLoop: for (...)`) allows breaking out of or continuing an outer nested loop from deeply nested logic.",
    "syntaxAndStructure": "// Enhanced for-each\nfor (String item : list) { ... }\n\n// Labeled Break for nested loops\nouter: for (int i = 0; i < rows; i++) {\n    for (int j = 0; j < cols; j++) {\n        if (matrix[i][j] == target) {\n            System.out.println(\"Found!\");\n            break outer; // Exits BOTH loops immediately\n        }\n    }\n}",
    "codeExamples": [
      {
        "title": "Labeled Break in Nested Matrix Search",
        "code": "public class LabeledLoopDemo {\n    public static void main(String[] args) {\n        int[][] matrix = {\n            { 1, 2, 3 },\n            { 4, 99, 6 },\n            { 7, 8, 9 }\n        };\n        int target = 99;\n        boolean found = false;\n\n        // Label outer loop\n        searchLoop:\n        for (int r = 0; r < matrix.length; r++) {\n            for (int c = 0; c < matrix[r].length; c++) {\n                if (matrix[r][c] == target) {\n                    System.out.println(\"Found target \" + target + \" at [\" + r + \"][\" + c + \"]\");\n                    found = true;\n                    break searchLoop; // Breaks out of BOTH nested loops\n                }\n            }\n        }\n        System.out.println(\"Search completed cleanly: \" + found);\n    }\n}",
        "expectedOutput": "Found target 99 at [1][1]\nSearch completed cleanly: true",
        "explanation": "Without `break searchLoop;`, a standard `break` would only exit the inner column loop, continuing to inspect row 2 unnecessarily."
      },
      {
        "title": "Enhanced For-Each vs Standard For Loop Modification",
        "code": "public class LoopComparisonDemo {\n    public static void main(String[] args) {\n        int[] numbers = { 10, 20, 30 };\n\n        // Attempting to modify array elements via for-each DOES NOT update array\n        for (int num : numbers) {\n            num = num * 2; // Only modifies local copy\n        }\n        System.out.println(\"After for-each attempt: \" + numbers[0]);\n\n        // Standard index-based loop updates array directly\n        for (int i = 0; i < numbers.length; i++) {\n            numbers[i] = numbers[i] * 2;\n        }\n        System.out.println(\"After indexed loop: \" + numbers[0]);\n    }\n}",
        "expectedOutput": "After for-each attempt: 10\nAfter indexed loop: 20",
        "explanation": "In an enhanced for-each loop over primitive arrays, the loop variable is a local copy of the element; modifying it has zero effect on the original array."
      }
    ],
    "realWorldApplications": [
      "Matrix traversal algorithms, pathfinding grid searches, and graph adjacency matrix exploration.",
      "Batch processing records with early exit on validation failure."
    ],
    "commonMistakes": [
      "Trying to modify array primitive values inside an enhanced for-each loop and expecting the array to change.",
      "Infinite loops in `do-while` when the update step is inadvertently bypassed with an unlabelled `continue`.",
      "Modifying a collection directly while iterating over it using a traditional for-each loop, triggering ConcurrentModificationException."
    ],
    "interviewRelevance": "Common question: \"How do you break out of multiple nested loops in Java without using System.exit() or boolean flags?\" (Answer: Labeled break).",
    "checkpoints": [
      {
        "id": "java-09-cp-1",
        "label": "Use labeled break and continue to control multi-level nested loops"
      },
      {
        "id": "java-09-cp-2",
        "label": "Understand why enhanced for-each cannot modify primitive array elements"
      },
      {
        "id": "java-09-loops-cp-3",
        "label": "Evaluate when to use while, do-while, enhanced for, and standard indexed loops."
      }
    ],
    "practiceExercises": [
      {
        "id": "java-09-ex-1",
        "title": "Reverse Number with While Loop",
        "difficulty": "Beginner",
        "type": "coding",
        "prompt": "Write a while loop to reverse the digits of an integer (e.g. 12345 -> 54321).",
        "solution": "public class NumberReversal {\n    public static int reverse(int n) {\n        int rev = 0;\n        while (n != 0) {\n            rev = rev * 10 + (n % 10);\n            n /= 10;\n        }\n        return rev;\n    }\n    public static void main(String[] args) {\n        System.out.println(\"Reversed: \" + reverse(12345));\n    }\n}",
        "explanation": "Extract last digit with % 10, shift reversed accumulator with * 10, and truncate with / 10."
      },
      {
        "id": "java-09-ex-2",
        "title": "Labeled Continue for Prime Number Search",
        "difficulty": "Intermediate",
        "type": "coding",
        "prompt": "Use labeled continue to print all prime numbers up to 30.",
        "solution": "public class PrimeSearch {\n    public static void main(String[] args) {\n        outer: for (int i = 2; i <= 30; i++) {\n            for (int j = 2; j * j <= i; j++) {\n                if (i % j == 0) {\n                    continue outer; // Not prime, check next number\n                }\n            }\n            System.out.print(i + \" \");\n        }\n        System.out.println();\n    }\n}",
        "explanation": "When a divisor is found, continue outer skips immediately to the next candidate integer."
      },
      {
        "id": "java-09-ex-3",
        "title": "Spiral Matrix Traversal Simulation",
        "difficulty": "Advanced",
        "type": "coding",
        "prompt": "Write an iterative loop structure to traverse a 3x3 matrix in spiral order.",
        "solution": "import java.util.*;\n\npublic class SpiralMatrix {\n    public static List<Integer> spiralOrder(int[][] matrix) {\n        List<Integer> res = new ArrayList<>();\n        if (matrix.length == 0) return res;\n        int top = 0, bottom = matrix.length - 1;\n        int left = 0, right = matrix[0].length - 1;\n\n        while (top <= bottom && left <= right) {\n            for (int c = left; c <= right; c++) res.add(matrix[top][c]);\n            top++;\n            for (int r = top; r <= bottom; r++) res.add(matrix[r][right]);\n            right--;\n            if (top <= bottom) {\n                for (int c = right; c >= left; c--) res.add(matrix[bottom][c]);\n                bottom--;\n            }\n            if (left <= right) {\n                for (int r = bottom; r >= top; r--) res.add(matrix[r][left]);\n                left++;\n            }\n        }\n        return res;\n    }\n    public static void main(String[] args) {\n        int[][] mat = {{1,2,3},{4,5,6},{7,8,9}};\n        System.out.println(\"Spiral: \" + spiralOrder(mat));\n    }\n}",
        "explanation": "Four coordinated boundary pointers (top, bottom, left, right) simulate clockwise boundary contraction."
      }
    ],
    "quizQuestions": [
      {
        "id": "java-09-q1",
        "question": "Which loop statement is guaranteed to execute its body at least once?",
        "options": [
          "for loop",
          "while loop",
          "do-while loop",
          "enhanced for-each loop"
        ],
        "correctOptionIndex": 2,
        "explanation": "do-while checks its boolean termination condition at the end of the iteration, guaranteeing at least one execution."
      },
      {
        "id": "java-09-q2",
        "question": "What happens when a labeled break statement executes inside a nested loop?",
        "options": [
          "It terminates only the innermost loop",
          "It terminates the specific loop denoted by the label",
          "It throws a compile error because labels are deprecated",
          "It re-executes the outer loop from beginning"
        ],
        "correctOptionIndex": 1,
        "explanation": "Labeled break transfers control directly to the statement immediately following the labeled enclosing loop structure."
      }
    ],
    "revisionNotes": [
      "for-each is safe and clean, but cannot modify primitive array elements in place.",
      "do-while executes at least once before checking the condition.",
      "Labeled break allows breaking out of multiple nested loops simultaneously."
    ]
  },
  {
    "id": "java-10-arrays",
    "moduleId": "java-m1",
    "moduleNumber": 1,
    "moduleTitle": "Java Fundamentals",
    "topicNumber": 10,
    "title": "Arrays, Multidimensional Arrays & Arrays Utility Class",
    "language": "java",
    "level": "Beginner",
    "whyItMatters": "Arrays are contiguous memory blocks that form the backbone of DSA. Understanding jagged arrays, shallow copying vs deep copying, and `java.util.Arrays` utility methods is critical for algorithmic coding.",
    "explanation": "In Java, arrays are dynamically allocated objects on the heap. Even primitive arrays (e.g. `int[]`) inherit from `java.lang.Object`. Key characteristics:\n1. Fixed Length: Once instantiated with `new int[size]`, an array cannot grow or shrink. Its size is stored in the public final field `length`.\n2. Default Values: Numeric elements default to 0, booleans to false, and object references to null.\n3. Multidimensional & Jagged Arrays: Java does not have true multi-dimensional matrices. Instead, multidimensional arrays are \"arrays of arrays\". Rows can have varying lengths (jagged arrays).\n4. `java.util.Arrays` Utility Class:\n   - `Arrays.sort(arr)`: Dual-pivot quicksort for primitives; TimSort for objects.\n   - `Arrays.binarySearch(arr, key)`: Fast $O(\\log n)$ search on sorted arrays.\n   - `Arrays.copyOf(arr, newLen)` / `System.arraycopy()`: Fast native memory copying.\n   - `Arrays.equals()` vs `Arrays.deepEquals()`: Structural content comparison.",
    "syntaxAndStructure": "// Declaration & Allocation\nint[] arr = new int[5];\nint[] initialized = { 1, 2, 3, 4, 5 };\n\n// 2D Jagged Array (varying row lengths)\nint[][] jagged = new int[3][];\njagged[0] = new int[2];\njagged[1] = new int[4];\njagged[2] = new int[3];\n\n// Utilities\nArrays.sort(arr);\nint idx = Arrays.binarySearch(arr, target);\nint[] copy = Arrays.copyOf(arr, arr.length);",
    "codeExamples": [
      {
        "title": "Working with Arrays Utility Methods and Sorting",
        "code": "import java.util.Arrays;\n\npublic class ArraysUtilityDemo {\n    public static void main(String[] args) {\n        int[] data = { 45, 12, 85, 32, 89, 39, 69, 44, 42, 1 };\n\n        // In-place sorting using Dual-Pivot Quicksort\n        Arrays.sort(data);\n        System.out.println(\"Sorted Array: \" + Arrays.toString(data));\n\n        // Binary search on sorted array\n        int target = 42;\n        int index = Arrays.binarySearch(data, target);\n        System.out.println(\"Index of \" + target + \": \" + index);\n\n        // Array filling\n        int[] filled = new int[5];\n        Arrays.fill(filled, 7);\n        System.out.println(\"Filled Array: \" + Arrays.toString(filled));\n    }\n}",
        "expectedOutput": "Sorted Array: [1, 12, 32, 39, 42, 44, 45, 69, 85, 89]\nIndex of 42: 4\nFilled Array: [7, 7, 7, 7, 7]",
        "explanation": "Arrays.sort() sorts in O(N log N) time. Arrays.binarySearch() requires the array to be sorted beforehand or the returned index is undefined."
      },
      {
        "title": "Creating and Traversing a Jagged Array",
        "code": "import java.util.Arrays;\n\npublic class JaggedArrayDemo {\n    public static void main(String[] args) {\n        // Jagged array: array of arrays where each row has different size\n        int[][] triangle = new int[3][];\n        triangle[0] = new int[]{ 1 };\n        triangle[1] = new int[]{ 2, 3 };\n        triangle[2] = new int[]{ 4, 5, 6 };\n\n        System.out.println(\"Row 0 length: \" + triangle[0].length);\n        System.out.println(\"Row 1 length: \" + triangle[1].length);\n        System.out.println(\"Row 2 length: \" + triangle[2].length);\n\n        // Deep string representation\n        System.out.println(\"Deep representation: \" + Arrays.deepToString(triangle));\n    }\n}",
        "expectedOutput": "Row 0 length: 1\nRow 1 length: 2\nRow 2 length: 3\nDeep representation: [[1], [2, 3], [4, 5, 6]]",
        "explanation": "In Java, multi-dimensional arrays are arrays of array references, allowing each inner row to be independently allocated with unique lengths."
      }
    ],
    "realWorldApplications": [
      "Representing adjacency lists in sparse graph algorithms using jagged arrays.",
      "High-performance audio sample buffers, financial tick data, and image raster matrices."
    ],
    "commonMistakes": [
      "Calling `arr.length()` with parentheses; `length` is an immutable field on arrays, unlike `String.length()` which is a method.",
      "Printing an array with `System.out.println(arr)` which prints the object hashcode (e.g. `[I@15db9742`) instead of `Arrays.toString(arr)`.",
      "Attempting to resize a Java array after instantiation instead of creating a new array or using ArrayList."
    ],
    "interviewRelevance": "Essential fundamentals: \"Are arrays in Java allocated on the stack or heap?\", \"How do jagged arrays work in memory?\", and \"Difference between Arrays.equals and Arrays.deepEquals\".",
    "checkpoints": [
      {
        "id": "java-10-cp-1",
        "label": "Understand memory layout of 1D and jagged 2D arrays on the Heap"
      },
      {
        "id": "java-10-cp-2",
        "label": "Use Arrays.sort, Arrays.binarySearch, and Arrays.deepToString appropriately"
      },
      {
        "id": "java-10-arrays-cp-3",
        "label": "Perform array copying, multidimensional indexing, and sorting using Arrays utility methods."
      }
    ],
    "practiceExercises": [
      {
        "id": "java-10-ex-1",
        "title": "Find Minimum and Maximum Element",
        "difficulty": "Beginner",
        "type": "coding",
        "prompt": "Find the minimum and maximum element in an int[] in a single pass O(n) scan.",
        "solution": "public class MinMaxArray {\n    public static void main(String[] args) {\n        int[] nums = { 23, 5, 89, -4, 42, 100 };\n        int min = nums[0];\n        int max = nums[0];\n        for (int x : nums) {\n            if (x < min) min = x;\n            if (x > max) max = x;\n        }\n        System.out.println(\"Min: \" + min + \", Max: \" + max);\n    }\n}",
        "explanation": "Initializes min and max with the first element and tracks extremes in a single linear pass."
      },
      {
        "id": "java-10-ex-2",
        "title": "Rotate Array Right by K Steps",
        "difficulty": "Intermediate",
        "type": "coding",
        "prompt": "Rotate an array of n elements to the right by k steps in-place with O(1) extra space.",
        "solution": "public class RotateArray {\n    private static void reverse(int[] a, int start, int end) {\n        while (start < end) {\n            int tmp = a[start];\n            a[start++] = a[end];\n            a[end--] = tmp;\n        }\n    }\n    public static void rotate(int[] nums, int k) {\n        k = k % nums.length;\n        reverse(nums, 0, nums.length - 1);\n        reverse(nums, 0, k - 1);\n        reverse(nums, k, nums.length - 1);\n    }\n    public static void main(String[] args) {\n        int[] arr = { 1, 2, 3, 4, 5, 6, 7 };\n        rotate(arr, 3);\n        System.out.println(java.util.Arrays.toString(arr));\n    }\n}",
        "explanation": "Three-step reversal: reverse entire array, reverse first k, reverse remaining n-k elements."
      },
      {
        "id": "java-10-ex-3",
        "title": "Matrix Transpose In-Place",
        "difficulty": "Advanced",
        "type": "coding",
        "prompt": "Transpose an N x N square matrix in-place without allocating a second matrix.",
        "solution": "import java.util.Arrays;\n\npublic class InPlaceTranspose {\n    public static void transpose(int[][] matrix) {\n        int n = matrix.length;\n        for (int i = 0; i < n; i++) {\n            for (int j = i + 1; j < n; j++) {\n                int temp = matrix[i][j];\n                matrix[i][j] = matrix[j][i];\n                matrix[j][i] = temp;\n            }\n        }\n    }\n    public static void main(String[] args) {\n        int[][] mat = { {1, 2, 3}, {4, 5, 6}, {7, 8, 9} };\n        transpose(mat);\n        System.out.println(Arrays.deepToString(mat));\n    }\n}",
        "explanation": "Swapping elements across the main diagonal (j starts at i + 1) avoids re-swapping elements back to their original spots."
      }
    ],
    "quizQuestions": [
      {
        "id": "java-10-q1",
        "question": "Where are Java arrays stored in memory?",
        "options": [
          "Primitive arrays on the Stack, Object arrays on the Heap",
          "All arrays in Java are stored on the Heap",
          "In Metaspace memory",
          "Directly in CPU cache"
        ],
        "correctOptionIndex": 1,
        "explanation": "In Java, all arrays are full-fledged objects and are always dynamically allocated on the Heap."
      },
      {
        "id": "java-10-q2",
        "question": "Which method should be used to compare the content equality of two multidimensional (nested) arrays?",
        "options": [
          "Arrays.equals()",
          "Arrays.deepEquals()",
          "== operator",
          "arr1.equals(arr2)"
        ],
        "correctOptionIndex": 1,
        "explanation": "Arrays.deepEquals() recursively inspects nested array elements, whereas Arrays.equals() performs shallow comparison on inner array references."
      }
    ],
    "revisionNotes": [
      "All arrays in Java are heap-allocated objects; length is a final property, not a method.",
      "Multidimensional arrays are arrays of references, allowing jagged row sizes.",
      "Use Arrays.deepToString() and Arrays.deepEquals() for nested arrays."
    ]
  },
  {
    "id": "java-11-strings-immutability",
    "moduleId": "java-m1",
    "moduleNumber": 1,
    "moduleTitle": "Java Fundamentals",
    "topicNumber": 11,
    "title": "Strings, String Constant Pool & StringBuilder vs StringBuffer",
    "language": "java",
    "level": "Beginner",
    "whyItMatters": "Strings are used in every Java application and interview. String immutability, the String Constant Pool (SCP), interned strings, and when to use StringBuilder vs StringBuffer are tested in almost 100% of placement coding exams.",
    "explanation": "In Java, `String` objects are immutable sequences of characters (internally `byte[]` with coder flag in modern Java 9+ compact strings).\n1. Why Immutability? Security (network connections, database URLs, file paths cannot be tampered with), Thread Safety (read-only state can be shared without synchronization), and Caching (hashcode is cached on first calculation).\n2. String Constant Pool (SCP): A special memory region in the Heap. String literals (`String s = \"apple\"`) are stored in the SCP. If another literal `\"apple\"` is created, it reuses the same SCP instance. Objects created with `new String(\"apple\")` create a new object in the general heap, pointing to the pooled literal.\n3. `intern()`: Returns the canonical reference from the SCP.\n4. `StringBuilder` vs `StringBuffer`:\n   - `String`: Immutable; concatenation (`+`) in loops creates quadratic temporary objects ($O(n^2)$ time/memory).\n   - `StringBuilder`: Mutable character buffer; not synchronized; fastest for single-threaded mutation.\n   - `StringBuffer`: Mutable; thread-safe (methods are synchronized); slower due to locking overhead.",
    "syntaxAndStructure": "// String creation:\nString s1 = \"hello\";              // In String Constant Pool\nString s2 = \"hello\";              // Reuses pooled instance (s1 == s2 is true)\nString s3 = new String(\"hello\");  // New object in heap (s1 == s3 is false, s1.equals(s3) is true)\nString s4 = s3.intern();          // Retrieves pooled reference (s1 == s4 is true)\n\n// Fast mutation:\nStringBuilder sb = new StringBuilder();\nfor (int i = 0; i < 1000; i++) sb.append(i);\nString result = sb.toString();",
    "codeExamples": [
      {
        "title": "String Pool Reference Equality (==) vs Value Equality (.equals)",
        "code": "public class StringPoolDemo {\n    public static void main(String[] args) {\n        String s1 = \"Placement\";\n        String s2 = \"Placement\";\n        String s3 = new String(\"Placement\");\n        String s4 = s3.intern(); // Fetch reference from String Constant Pool\n\n        // Reference comparison (== checks memory addresses)\n        System.out.println(\"s1 == s2 (both in SCP): \" + (s1 == s2));\n        System.out.println(\"s1 == s3 (SCP vs Heap): \" + (s1 == s3));\n        System.out.println(\"s1 == s4 (s4 interned): \" + (s1 == s4));\n\n        // Value comparison (.equals checks character sequences)\n        System.out.println(\"s1.equals(s3) value equality: \" + s1.equals(s3));\n    }\n}",
        "expectedOutput": "s1 == s2 (both in SCP): true\ns1 == s3 (SCP vs Heap): false\ns1 == s4 (s4 interned): true\ns1.equals(s3) value equality: true",
        "explanation": "Literals s1 and s2 reference the same cached memory object in the String Constant Pool. s3 is explicitly allocated in general heap memory. intern() returns the pool reference."
      },
      {
        "title": "StringBuilder vs Repeated String Concatenation",
        "code": "public class StringBuilderDemo {\n    public static void main(String[] args) {\n        // StringBuilder accumulates characters in a dynamic resizable buffer\n        StringBuilder sb = new StringBuilder();\n        sb.append(\"Java\").append(\" \").append(\"Placement\").append(\" \").append(2026);\n        \n        // In-place modifications\n        sb.insert(4, \" 17/21\");\n        sb.reverse();\n        \n        System.out.println(\"Transformed String: \" + sb.toString());\n        \n        // Re-reverse back to normal\n        sb.reverse();\n        System.out.println(\"Restored String: \" + sb.toString());\n    }\n}",
        "expectedOutput": "Transformed String: 6202 tnemecalP 12/71 avaJ\nRestored String: Java 17/21 Placement 2026",
        "explanation": "StringBuilder allows in-place insertions, reversals, and appends without reallocating intermediate immutable String objects."
      }
    ],
    "realWorldApplications": [
      "Building dynamic SQL queries and JSON payloads safely using StringBuilder.",
      "Leveraging string immutability for thread-safe Map keys and caching HashCode computations."
    ],
    "commonMistakes": [
      "Using `==` to compare Strings instead of `.equals()`; `==` checks reference identity, causing subtle bugs when strings come from user input or database queries.",
      "Performing repeated string concatenation (`s += item`) inside a loop of size 10,000+, resulting in $O(n^2)$ memory churn and GC pauses.",
      "Using string concatenation (+) inside large loops, generating excessive temporary String garbage on the heap."
    ],
    "interviewRelevance": "Universally asked in interviews: \"Why is String immutable in Java?\", \"Explain String Constant Pool\", and \"When would you choose StringBuffer over StringBuilder?\"",
    "checkpoints": [
      {
        "id": "java-11-cp-1",
        "label": "Distinguish String literal allocation in SCP vs new String() in Heap"
      },
      {
        "id": "java-11-cp-2",
        "label": "Understand the three differences between String, StringBuilder, and StringBuffer"
      },
      {
        "id": "java-11-strings-immutability-cp-3",
        "label": "Leverage StringBuilder and the String Constant Pool for optimal performance."
      }
    ],
    "practiceExercises": [
      {
        "id": "java-11-ex-1",
        "title": "Check Palindrome with Two Pointers",
        "difficulty": "Beginner",
        "type": "coding",
        "prompt": "Implement isPalindrome(String s) using two pointers ignoring case and non-alphanumerics in O(n) time.",
        "solution": "public class PalindromeCheck {\n    public static boolean isPalindrome(String s) {\n        int l = 0, r = s.length() - 1;\n        while (l < r) {\n            while (l < r && !Character.isLetterOrDigit(s.charAt(l))) l++;\n            while (l < r && !Character.isLetterOrDigit(s.charAt(r))) r--;\n            if (Character.toLowerCase(s.charAt(l)) != Character.toLowerCase(s.charAt(r))) {\n                return false;\n            }\n            l++;\n            r--;\n        }\n        return true;\n    }\n    public static void main(String[] args) {\n        System.out.println(isPalindrome(\"A man, a plan, a canal: Panama\"));\n    }\n}",
        "explanation": "Two-pointer inward traversal skips punctuation and compares characters in O(n) time without allocating extra strings."
      },
      {
        "id": "java-11-ex-2",
        "title": "String Compression Algorithm",
        "difficulty": "Intermediate",
        "type": "coding",
        "prompt": "Compress a string using counts of repeated characters (e.g. \"aabcccccaaa\" -> \"a2b1c5a3\"). If compressed string is not smaller, return original.",
        "solution": "public class StringCompression {\n    public static String compress(String s) {\n        if (s == null || s.length() <= 2) return s;\n        StringBuilder sb = new StringBuilder();\n        int count = 1;\n        for (int i = 0; i < s.length(); i++) {\n            if (i + 1 < s.length() && s.charAt(i) == s.charAt(i + 1)) {\n                count++;\n            } else {\n                sb.append(s.charAt(i)).append(count);\n                count = 1;\n            }\n        }\n        return sb.length() < s.length() ? sb.toString() : s;\n    }\n    public static void main(String[] args) {\n        System.out.println(compress(\"aabcccccaaa\"));\n    }\n}",
        "explanation": "Uses StringBuilder to assemble the compressed run-length encoding in linear time."
      },
      {
        "id": "java-11-ex-3",
        "title": "Verify Anagrams with Frequency Array",
        "difficulty": "Advanced",
        "type": "coding",
        "prompt": "Determine whether two lowercase English strings s and t are anagrams using an O(1) auxiliary space array.",
        "solution": "public class AnagramCheck {\n    public static boolean isAnagram(String s, String t) {\n        if (s.length() != t.length()) return false;\n        int[] freq = new int[26];\n        for (int i = 0; i < s.length(); i++) {\n            freq[s.charAt(i) - 'a']++;\n            freq[t.charAt(i) - 'a']--;\n        }\n        for (int c : freq) {\n            if (c != 0) return false;\n        }\n        return true;\n    }\n    public static void main(String[] args) {\n        System.out.println(isAnagram(\"anagram\", \"nagaram\"));\n    }\n}",
        "explanation": "A 26-element integer frequency table increments for s and decrements for t; any non-zero count disproves anagram status."
      }
    ],
    "quizQuestions": [
      {
        "id": "java-11-q1",
        "question": "Why does String in Java cache its hashCode() calculation?",
        "options": [
          "Because Strings are stored in the JVM Metaspace",
          "Because Strings are immutable, guaranteeing the hash will never change after first computation",
          "Because all Strings inherit from StringBuilder",
          "Because Java requires all objects to cache their hash"
        ],
        "correctOptionIndex": 1,
        "explanation": "Immutability guarantees that the character content never mutates, allowing the hashCode value to be safely cached for fast HashMap lookups."
      },
      {
        "id": "java-11-q2",
        "question": "What is the primary difference between StringBuilder and StringBuffer?",
        "options": [
          "StringBuilder is immutable while StringBuffer is mutable",
          "StringBuffer is thread-safe (synchronized), whereas StringBuilder is non-synchronized and faster",
          "StringBuilder stores characters as UTF-32",
          "StringBuffer cannot be converted to String"
        ],
        "correctOptionIndex": 1,
        "explanation": "StringBuffer synchronizes all public methods for multi-threaded safety, making it slower than the unsynchronized StringBuilder."
      }
    ],
    "revisionNotes": [
      "String is immutable and pooled in the String Constant Pool (SCP).",
      "Always use .equals() to check string equality, never ==.",
      "StringBuilder is fast and mutable for single-threaded usage; StringBuffer is synchronized and thread-safe."
    ]
  }
];

export const module1: MasteryModule = {
  "id": "java-m1",
  "number": 1,
  "title": "Java Fundamentals",
  "description": "Core architecture of the Java platform, JVM internals, compilation lifecycle, primitive data types, operators, I/O, control flow, arrays, and string immutability.",
  "language": "java",
  "topics": [
    {
      "id": "java-01-platform-jvm-architecture",
      "moduleId": "java-m1",
      "moduleNumber": 1,
      "moduleTitle": "Java Fundamentals",
      "topicNumber": 1,
      "title": "Java Platform & JVM Architecture",
      "language": "java",
      "level": "Beginner",
      "whyItMatters": "Understanding the JVM is the foundation of Java mastery. Top product-based companies test JVM memory regions, classloading, and the JIT compiler to evaluate whether candidates understand how Java achieves platform independence with high performance.",
      "explanation": "Java achieves its \"Write Once, Run Anywhere\" (WORA) philosophy via the Java Virtual Machine (JVM). When source code (.java) is compiled by javac, it is transformed into intermediate bytecode (.class). The JVM executes this bytecode on any OS. The JVM consists of three main subsystems: the ClassLoader Subsystem (Loading, Linking, Initialization), the Runtime Data Areas (Method Area/Metaspace, Heap, Java Threads Stacks, PC Registers, Native Method Stacks), and the Execution Engine (Bytecode Interpreter, Just-In-Time JIT Compiler, and Garbage Collector). The JIT compiler monitors hot spots (frequently executed code) and compiles them directly into native machine code to dramatically accelerate execution.",
      "syntaxAndStructure": "// Java Program Execution Flow:\n// Source (.java) -> javac -> Bytecode (.class) -> JVM (ClassLoader -> Memory -> Execution Engine)\n\npublic class ArchitectureDemo {\n    public static void main(String[] args) {\n        // Code runs inside main thread stack frame\n    }\n}",
      "codeExamples": [
        {
          "title": "Inspecting JVM Runtime Environment Programmatically",
          "code": "public class JVMInfoDemo {\n    public static void main(String[] args) {\n        Runtime runtime = Runtime.getRuntime();\n        String javaVersion = System.getProperty(\"java.version\");\n        String javaVendor = System.getProperty(\"java.vendor\");\n        \n        long maxMemoryMB = runtime.maxMemory() / (1024 * 1024);\n        int availableProcessors = runtime.availableProcessors();\n        \n        System.out.println(\"Java Vendor: \" + (javaVendor != null && !javaVendor.isEmpty()));\n        System.out.println(\"Available Processors >= 1: \" + (availableProcessors >= 1));\n        System.out.println(\"Max Heap Memory Configured: \" + (maxMemoryMB > 0));\n        System.out.println(\"JVM Architecture Verified.\");\n    }\n}",
          "expectedOutput": "Java Vendor: true\nAvailable Processors >= 1: true\nMax Heap Memory Configured: true\nJVM Architecture Verified.",
          "explanation": "Runtime.getRuntime() provides access to the JVM runtime environment. System.getProperty queries standard JVM configuration variables."
        },
        {
          "title": "Demonstrating Stack vs Heap Allocation",
          "code": "public class MemoryModelDemo {\n    static class Task {\n        String name; // Reference stored in Heap inside Task object\n        Task(String name) { this.name = name; }\n    }\n\n    public static void main(String[] args) {\n        int primitiveCounter = 42; // Allocated on the Stack Frame of main()\n        Task taskInstance = new Task(\"Placement Prep\"); // Reference on Stack, Object on Heap\n        \n        System.out.println(\"Primitive on Stack: \" + primitiveCounter);\n        System.out.println(\"Object Task Name on Heap: \" + taskInstance.name);\n        System.out.println(\"Are references non-null: \" + (taskInstance != null));\n    }\n}",
          "expectedOutput": "Primitive on Stack: 42\nObject Task Name on Heap: Placement Prep\nAre references non-null: true",
          "explanation": "Local primitives like primitiveCounter reside directly on the thread call stack. Objects created with new reside on the Heap, while taskInstance on the stack holds the memory reference address."
        }
      ],
      "realWorldApplications": [
        "JVM performance tuning in high-throughput microservices using GC flags (-Xms, -Xmx, -XX:+UseG1GC).",
        "Diagnosing OutOfMemoryError (Metaspace vs Heap) and StackOverflowError in distributed production systems."
      ],
      "commonMistakes": [
        "Assuming the JVM is platform-independent; the JVM itself is platform-dependent (different for Windows, Linux, macOS), while the bytecode is platform-independent.",
        "Confusing the JIT compiler with javac; javac compiles Java to Bytecode, whereas JIT compiles Bytecode to Native Machine Code at runtime.",
        "Assuming System.gc() guarantees immediate garbage collection rather than being a non-binding hint to the JVM."
      ],
      "interviewRelevance": "Frequent interview topic: Explain JVM architecture, Stack vs Heap memory, JIT compilation advantages, and how Java bytecode executes.",
      "checkpoints": [
        {
          "id": "java-01-cp-1",
          "label": "Understand JVM Subsystems: ClassLoader, Runtime Data Areas, Execution Engine"
        },
        {
          "id": "java-01-cp-2",
          "label": "Differentiate Stack (thread-specific) vs Heap (shared objects) memory allocation"
        },
        {
          "id": "java-01-platform-jvm-architecture-cp-3",
          "label": "Explain the role of JIT compilation and HotSpot adaptive optimization."
        }
      ],
      "practiceExercises": [
        {
          "id": "java-01-ex-1",
          "title": "Identify JVM Memory Region",
          "difficulty": "Beginner",
          "type": "conceptual",
          "prompt": "State which JVM memory region holds: 1) local primitive variables, 2) static variables, 3) instantiated class objects.",
          "solution": "1) Local primitive variables: Stack Frame of the executing thread.\n2) Static variables: Metaspace / Method Area (Heap in modern Java for static object references).\n3) Instantiated class objects: Heap Memory.",
          "explanation": "Each thread has its own stack storing call frames and local primitives. All instantiated objects reside on the shared Heap."
        },
        {
          "id": "java-01-ex-2",
          "title": "Predict Stack Frame Lifecycle",
          "difficulty": "Intermediate",
          "type": "coding",
          "prompt": "Write a recursive function printDepth(int n) that terminates at depth 3, and explain how stack frames are pushed and popped.",
          "solution": "public class StackFrameLifecycle {\n    public static void printDepth(int n) {\n        if (n > 3) return;\n        System.out.println(\"Push Frame: \" + n);\n        printDepth(n + 1);\n        System.out.println(\"Pop Frame: \" + n);\n    }\n    public static void main(String[] args) {\n        printDepth(1);\n    }\n}",
          "explanation": "Each call pushes a new activation record onto the stack. As base cases return, frames are popped in LIFO order."
        },
        {
          "id": "java-01-ex-3",
          "title": "Simulate StackOverflowError Prevention",
          "difficulty": "Advanced",
          "type": "debugging",
          "prompt": "Given an unbounded recursion causing StackOverflowError, implement an iterative alternative using an explicit array stack.",
          "solution": "import java.util.ArrayDeque;\nimport java.util.Deque;\n\npublic class SafeStackSimulation {\n    public static int iterativeFactorial(int n) {\n        Deque<Integer> stack = new ArrayDeque<>();\n        for (int i = 1; i <= n; i++) stack.push(i);\n        int result = 1;\n        while (!stack.isEmpty()) result *= stack.pop();\n        return result;\n    }\n    public static void main(String[] args) {\n        System.out.println(\"Factorial of 5: \" + iterativeFactorial(5));\n    }\n}",
          "explanation": "Using heap-allocated data structures like ArrayDeque prevents call-stack exhaustion on deep iterations."
        }
      ],
      "quizQuestions": [
        {
          "id": "java-01-q1",
          "question": "Which component of the JVM converts bytecode into native machine instructions at runtime for frequently executed code?",
          "options": [
            "javac compiler",
            "ClassLoader",
            "Just-In-Time (JIT) Compiler",
            "Garbage Collector"
          ],
          "correctOptionIndex": 2,
          "explanation": "The JIT compiler profiles running bytecode and compiles \"hot spots\" into native machine instructions for direct hardware execution."
        },
        {
          "id": "java-01-q2",
          "question": "Where are objects created via the new keyword allocated in the JVM?",
          "options": [
            "In the Thread Stack",
            "In the Heap Memory",
            "In the Program Counter (PC) Register",
            "In the Native Method Stack"
          ],
          "correctOptionIndex": 1,
          "explanation": "All objects in Java are dynamically allocated on the Heap. The reference variable pointing to the object resides on the stack or in another object."
        }
      ],
      "revisionNotes": [
        "JVM is platform-specific; Java bytecode is platform-independent (WORA).",
        "Stack stores thread call frames and local primitives; Heap stores all instantiated objects.",
        "JIT compiler accelerates performance by translating hot bytecode into native machine code."
      ]
    },
    {
      "id": "java-02-jdk-jre-jvm",
      "moduleId": "java-m1",
      "moduleNumber": 1,
      "moduleTitle": "Java Fundamentals",
      "topicNumber": 2,
      "title": "JDK, JRE & JVM: Architecture & Relationships",
      "language": "java",
      "level": "Beginner",
      "whyItMatters": "Understanding the boundary between JDK (development), JRE (runtime), and JVM (execution) is essential for configuring build pipelines, Docker container images, and solving placement MCQs.",
      "explanation": "The Java ecosystem is organized in concentric layers:\n1. JVM (Java Virtual Machine): The abstract computing machine that executes bytecode. It includes the classloader, memory areas, and execution engine.\n2. JRE (Java Runtime Environment): JVM + Core Class Libraries (java.lang, java.util, rt.jar) + supporting runtime files. It contains everything needed to RUN compiled Java programs, but lacks development tools like javac.\n3. JDK (Java Development Kit): JRE + Development Tools (javac compiler, jar archiver, javadoc, jdb debugger, jlink). In modern Java (Java 11+), separate JRE downloads were discontinued in favor of modular runtime images generated via jlink.",
      "syntaxAndStructure": "// Hierarchy:\n// JDK = JRE + Development Tools (javac, jdb, jar, javadoc)\n// JRE = JVM + Core Class Libraries + Runtime components\n// JVM = ClassLoader + Runtime Memory + Execution Engine",
      "codeExamples": [
        {
          "title": "Verifying Core Library Availability",
          "code": "public class EcosystemCheck {\n    public static void main(String[] args) {\n        // Checking availability of standard core libraries from JRE/JDK\n        java.util.List<String> components = java.util.List.of(\"JVM\", \"JRE\", \"JDK\");\n        \n        System.out.println(\"Ecosystem layers count: \" + components.size());\n        for (String c : components) {\n            System.out.println(\"Layer: \" + c);\n        }\n        System.out.println(\"JDK/JRE Core classes loaded successfully.\");\n    }\n}",
          "expectedOutput": "Ecosystem layers count: 3\nLayer: JVM\nLayer: JRE\nLayer: JDK\nJDK/JRE Core classes loaded successfully.",
          "explanation": "java.util.List.of() is part of the Java standard library supplied by the JRE layer to all Java programs."
        },
        {
          "title": "Determining Java Home and Runtime Version",
          "code": "public class EnvironmentInspection {\n    public static void main(String[] args) {\n        String javaHome = System.getProperty(\"java.home\");\n        String runtimeVersion = System.getProperty(\"java.runtime.version\");\n        \n        System.out.println(\"Java Home Defined: \" + (javaHome != null && !javaHome.isEmpty()));\n        System.out.println(\"Runtime Version Present: \" + (runtimeVersion != null));\n        System.out.println(\"Ecosystem verified clean.\");\n    }\n}",
          "expectedOutput": "Java Home Defined: true\nRuntime Version Present: true\nEcosystem verified clean.",
          "explanation": "System property java.home points to the runtime directory where the executing JVM and core modules reside."
        }
      ],
      "realWorldApplications": [
        "Packaging minimal Docker containers for microservices using custom JRE runtimes created with jlink.",
        "Configuring CI/CD build agents (which require full JDK) vs production Kubernetes pods (which only require runtime JRE/custom image)."
      ],
      "commonMistakes": [
        "Installing only a JRE on a developer workstation and wondering why `javac` command fails with \"command not found\".",
        "Thinking that the JDK is required in production deployment servers; only the JRE or a modular runtime is required to execute .class or .jar files.",
        "Deploying a full JDK to lightweight production container images instead of using a minimal JRE or jlink runtime."
      ],
      "interviewRelevance": "Classic interview question: \"What is the difference between JDK, JRE, and JVM? Can you run a Java application without a JDK?\"",
      "checkpoints": [
        {
          "id": "java-02-cp-1",
          "label": "Define the relationship: JDK ⊃ JRE ⊃ JVM"
        },
        {
          "id": "java-02-cp-2",
          "label": "Identify which tools belong exclusively to the JDK (javac, jdb, javadoc)"
        },
        {
          "id": "java-02-jdk-jre-jvm-cp-3",
          "label": "Understand jlink modular runtime image creation introduced in Java 9+."
        }
      ],
      "practiceExercises": [
        {
          "id": "java-02-ex-1",
          "title": "Ecosystem Component Identification",
          "difficulty": "Beginner",
          "type": "conceptual",
          "prompt": "A server needs to run a pre-compiled Spring Boot JAR file. Does the server require a JDK, a JRE, or both? Explain why.",
          "solution": "The server only requires a JRE (or a modular runtime image). The JDK contains compilers (javac) and debug tools needed for development; execution only requires the JVM and core libraries found in the JRE.",
          "explanation": "Running pre-compiled bytecode only requires the JRE. The JDK is solely needed when compiling source code from .java files."
        },
        {
          "id": "java-02-ex-2",
          "title": "Inspect System Properties",
          "difficulty": "Intermediate",
          "type": "coding",
          "prompt": "Write a Java class that checks whether the current environment has access to the Java compiler by querying ToolProvider.getSystemJavaCompiler().",
          "solution": "import javax.tools.ToolProvider;\nimport javax.tools.JavaCompiler;\n\npublic class CompilerCheck {\n    public static void main(String[] args) {\n        JavaCompiler compiler = ToolProvider.getSystemJavaCompiler();\n        boolean hasCompiler = (compiler != null);\n        System.out.println(\"Running under full JDK: \" + hasCompiler);\n    }\n}",
          "explanation": "ToolProvider.getSystemJavaCompiler() returns non-null only when running under an environment that includes the JDK development tools."
        },
        {
          "id": "java-02-ex-3",
          "title": "Modern Modular Runtime Image Concept",
          "difficulty": "Advanced",
          "type": "conceptual",
          "prompt": "Explain what jlink does in Java 9+ and why it replaced the traditional monolithic JRE distribution.",
          "solution": "jlink (Java Linker) creates custom, minimal runtime images containing only the specific JVM modules needed by an application (e.g., java.base, java.sql). This reduces container image size from 300MB+ to under 40MB, improving security, memory footprint, and startup time in cloud environments.",
          "explanation": "Modern cloud microservices use jlink to strip unused standard library modules rather than distributing the full 250MB+ JRE."
        }
      ],
      "quizQuestions": [
        {
          "id": "java-02-q1",
          "question": "Which of the following contains the javac compiler?",
          "options": [
            "JVM only",
            "JRE only",
            "JDK only",
            "Both JRE and JVM"
          ],
          "correctOptionIndex": 2,
          "explanation": "javac is a developer tool and is exclusively part of the JDK. The JRE and JVM only execute compiled bytecode."
        },
        {
          "id": "java-02-q2",
          "question": "What is the correct mathematical containment relationship among the three Java platform components?",
          "options": [
            "JVM ⊃ JRE ⊃ JDK",
            "JDK ⊃ JRE ⊃ JVM",
            "JRE ⊃ JDK ⊃ JVM",
            "JDK ⊃ JVM ⊃ JRE"
          ],
          "correctOptionIndex": 1,
          "explanation": "JDK contains JRE plus development tools. JRE contains JVM plus core class libraries."
        }
      ],
      "revisionNotes": [
        "JDK = JRE + Developer Tools (javac, jar, jdb).",
        "JRE = JVM + Core Class Libraries (java.lang, java.util).",
        "JVM = Execution engine that executes .class bytecode."
      ]
    },
    {
      "id": "java-03-compilation-execution-lifecycle",
      "moduleId": "java-m1",
      "moduleNumber": 1,
      "moduleTitle": "Java Fundamentals",
      "topicNumber": 3,
      "title": "Compilation & Execution Lifecycle",
      "language": "java",
      "level": "Beginner",
      "whyItMatters": "Knowing the precise lifecycle of a Java program—from source code to classloading, bytecode verification, and JIT compilation—is vital for debugging classloader conflicts, NoSuchMethodError, and performance bottlenecks.",
      "explanation": "The Java compilation and execution lifecycle occurs in two phases:\n1. Compile-Time: The developer writes `ClassName.java`. The `javac` compiler performs lexical analysis, parsing, semantic checks, type validation, and emits `ClassName.class` bytecode. Bytecode consists of compact opcodes (e.g., iload, aload, invokevirtual).\n2. Runtime: The JVM loads the bytecode via the ClassLoader subsystem (Loading -> Linking [Verification, Preparation, Resolution] -> Initialization). The Bytecode Verifier ensures the code adheres to JVM security and memory safety rules. Finally, the Execution Engine interprets the bytecode, and the JIT compiler compiles hot code segments into native machine instructions.",
      "syntaxAndStructure": "// Step 1: javac Hello.java   -> creates Hello.class (Bytecode)\n// Step 2: java Hello          -> JVM boots, ClassLoader loads Hello.class, runs main()\n\npublic class Hello {\n    public static void main(String[] args) {\n        System.out.println(\"Lifecycle Complete\");\n    }\n}",
      "codeExamples": [
        {
          "title": "Observing Class Loading Lifecycle",
          "code": "public class ClassLifecycleDemo {\n    // Static initialization block runs when class is initialized by ClassLoader\n    static {\n        System.out.println(\"1. Static initializer block executed during class loading.\");\n    }\n\n    // Instance initialization block runs before constructor on object creation\n    {\n        System.out.println(\"3. Instance initializer block executed on instantiation.\");\n    }\n\n    public ClassLifecycleDemo() {\n        System.out.println(\"4. Constructor executed.\");\n    }\n\n    public static void main(String[] args) {\n        System.out.println(\"2. main() method execution started.\");\n        ClassLifecycleDemo demo = new ClassLifecycleDemo();\n        System.out.println(\"5. Lifecycle execution completed.\");\n    }\n}",
          "expectedOutput": "1. Static initializer block executed during class loading.\n2. main() method execution started.\n3. Instance initializer block executed on instantiation.\n4. Constructor executed.\n5. Lifecycle execution completed.",
          "explanation": "Static blocks execute when the class is loaded and initialized by the JVM before main() runs. Instance initializers run before the constructor body on each object creation."
        },
        {
          "title": "ClassLoader Hierarchy Inspection",
          "code": "public class ClassLoaderInspection {\n    public static void main(String[] args) {\n        // Application ClassLoader\n        ClassLoader appClassLoader = ClassLoaderInspection.class.getClassLoader();\n        System.out.println(\"App ClassLoader present: \" + (appClassLoader != null));\n        \n        // Platform/Extension ClassLoader (parent of App ClassLoader)\n        ClassLoader platformClassLoader = appClassLoader != null ? appClassLoader.getParent() : null;\n        System.out.println(\"Platform ClassLoader present: \" + (platformClassLoader != null));\n        \n        // Bootstrap ClassLoader (parent of Platform, written in C/C++, represented as null)\n        ClassLoader bootstrap = platformClassLoader != null ? platformClassLoader.getParent() : null;\n        System.out.println(\"Bootstrap ClassLoader is null in Java: \" + (bootstrap == null));\n    }\n}",
          "expectedOutput": "App ClassLoader present: true\nPlatform ClassLoader present: true\nBootstrap ClassLoader is null in Java: true",
          "explanation": "Java uses a delegation-parent ClassLoader model: Application -> Platform -> Bootstrap. The Bootstrap classloader is written in native C/C++ and is represented as null in Java."
        }
      ],
      "realWorldApplications": [
        "Debugging `ClassNotFoundException` vs `NoClassDefFoundError` in enterprise application servers.",
        "Hot-reloading code in Spring Boot devtools via custom isolated ClassLoaders."
      ],
      "commonMistakes": [
        "Confusing `ClassNotFoundException` (checked exception when Class.forName() fails) with `NoClassDefFoundError` (runtime error when a class present at compile time is missing at runtime).",
        "Modifying a .java file and expecting `java ClassName` to reflect changes without running `javac ClassName.java` first.",
        "Assuming bytecode is directly executed by the OS CPU instead of being interpreted and JIT-compiled by the JVM."
      ],
      "interviewRelevance": "Frequent interview question: \"Explain the ClassLoader delegation model, what happens during bytecode verification, and why the Bootstrap ClassLoader returns null.\"",
      "checkpoints": [
        {
          "id": "java-03-cp-1",
          "label": "Trace the lifecycle from .java source to javac bytecode to JVM ClassLoader to execution"
        },
        {
          "id": "java-03-cp-2",
          "label": "Understand the three stages of Linking: Verification, Preparation, and Resolution"
        },
        {
          "id": "java-03-compilation-execution-lifecycle-cp-3",
          "label": "Trace the lifecycle from .java source to .class bytecode to native machine code."
        }
      ],
      "practiceExercises": [
        {
          "id": "java-03-ex-1",
          "title": "Class Initialization Sequence Order",
          "difficulty": "Beginner",
          "type": "conceptual",
          "prompt": "Arrange the following in execution order when an object is instantiated: Instance Variable Init, Static Variable Init, Constructor, Static Block.",
          "solution": "1. Static Variable Init & Static Block (when class is first loaded)\n2. Instance Variable Init & Instance Block (when object is created)\n3. Constructor (completing object construction)",
          "explanation": "Static members run once upon class loading. Instance initializers run before the constructor on every instance creation."
        },
        {
          "id": "java-03-ex-2",
          "title": "Verify ClassLoader Hierarchy Programmatically",
          "difficulty": "Intermediate",
          "type": "coding",
          "prompt": "Write a program to display the ClassLoader of String.class and explain why it behaves that way.",
          "solution": "public class StringClassLoaderCheck {\n    public static void main(String[] args) {\n        ClassLoader cl = String.class.getClassLoader();\n        System.out.println(\"String ClassLoader: \" + cl);\n    }\n}",
          "explanation": "String.class returns null because it is loaded by the core Bootstrap ClassLoader, which is implemented in native code outside Java."
        },
        {
          "id": "java-03-ex-3",
          "title": "Differentiate ClassNotFoundException and NoClassDefFoundError",
          "difficulty": "Advanced",
          "type": "conceptual",
          "prompt": "In what exact scenario will a JVM throw NoClassDefFoundError instead of ClassNotFoundException?",
          "solution": "ClassNotFoundException occurs when code explicitly attempts to load a class via its string name (e.g., Class.forName(\"com.mysql.jdbc.Driver\")) and the class cannot be found on the classpath. NoClassDefFoundError occurs when a class was available during compile-time, but when the JVM attempts to instantiate it or execute a method at runtime, the class file is missing or its static initialization block previously failed.",
          "explanation": "ClassNotFoundException is a checked exception for dynamic lookup; NoClassDefFoundError is an unchecked LinkageError indicating classpath desynchronization."
        }
      ],
      "quizQuestions": [
        {
          "id": "java-03-q1",
          "question": "Which component performs bytecode verification to prevent illegal memory access and stack overflow before execution?",
          "options": [
            "javac compiler",
            "Bytecode Verifier in JVM ClassLoader linking phase",
            "Garbage Collector",
            "JIT Profiler"
          ],
          "correctOptionIndex": 1,
          "explanation": "The Bytecode Verifier checks that bytecode adheres to JVM constraints (no stack underflow/overflow, type safety, valid register access) during the Linking phase."
        },
        {
          "id": "java-03-q2",
          "question": "What does String.class.getClassLoader() return in standard Java?",
          "options": [
            "AppClassLoader",
            "PlatformClassLoader",
            "null (Bootstrap ClassLoader)",
            "ExtensionClassLoader"
          ],
          "correctOptionIndex": 2,
          "explanation": "Core Java classes loaded by the primordial Bootstrap ClassLoader return null in Java reflection APIs."
        }
      ],
      "revisionNotes": [
        "javac translates source code into bytecode (.class).",
        "ClassLoader stages: Loading -> Linking (Verification, Preparation, Resolution) -> Initialization.",
        "Static initializers execute once on class loading; instance initializers run before each constructor."
      ]
    },
    {
      "id": "java-04-primitive-data-types",
      "moduleId": "java-m1",
      "moduleNumber": 1,
      "moduleTitle": "Java Fundamentals",
      "topicNumber": 4,
      "title": "Primitive Data Types, Sizes & Memory Footprints",
      "language": "java",
      "level": "Beginner",
      "whyItMatters": "Understanding primitive data types, their exact bit widths, ranges, and two’s complement signed representation is essential for avoiding integer overflow, precision loss in financial calculations, and memory optimization in large collections.",
      "explanation": "Java has exactly 8 primitive data types, all having fixed sizes across all hardware platforms:\n1. byte: 8 bits, range -128 to 127 (-2^7 to 2^7-1)\n2. short: 16 bits, range -32,768 to 32,767 (-2^15 to 2^15-1)\n3. int: 32 bits, range -2,147,483,648 to 2,147,483,647 (default integer literal)\n4. long: 64 bits, suffix L/l (e.g., 10000000000L)\n5. float: 32 bits, IEEE 754 single precision, suffix F/f (e.g., 3.14f)\n6. double: 64 bits, IEEE 754 double precision (default floating-point literal)\n7. char: 16 bits, unsigned Unicode character, range 0 to 65,535 (\\u0000 to \\uffff)\n8. boolean: true or false (JVM typically stores as int or byte in arrays).\nAll integer types are signed using two’s complement representation (Java has no unsigned primitives except char, though Java 8+ provides helper methods like Integer.toUnsignedString).",
      "syntaxAndStructure": "byte b = 127;\nshort s = 32000;\nint i = 2_000_000;          // Underscores for readability (Java 7+)\nlong l = 9_000_000_000L;    // L suffix required for literals exceeding int range\nfloat f = 3.14159f;         // f suffix required\ndouble d = 3.1415926535;    // double is default\nchar c = 'A';               // Single quotes for char\nboolean flag = true;",
      "codeExamples": [
        {
          "title": "Demonstrating Exact Primitive Ranges and Sizes",
          "code": "public class PrimitiveTypesDemo {\n    public static void main(String[] args) {\n        System.out.println(\"Byte bits: \" + Byte.SIZE + \", min: \" + Byte.MIN_VALUE + \", max: \" + Byte.MAX_VALUE);\n        System.out.println(\"Short bits: \" + Short.SIZE + \", min: \" + Short.MIN_VALUE + \", max: \" + Short.MAX_VALUE);\n        System.out.println(\"Int bits: \" + Integer.SIZE + \", min: \" + Integer.MIN_VALUE + \", max: \" + Integer.MAX_VALUE);\n        System.out.println(\"Long bits: \" + Long.SIZE + \", min: \" + Long.MIN_VALUE + \", max: \" + Long.MAX_VALUE);\n        System.out.println(\"Char bits: \" + Character.SIZE + \", min: \" + (int)Character.MIN_VALUE + \", max: \" + (int)Character.MAX_VALUE);\n    }\n}",
          "expectedOutput": "Byte bits: 8, min: -128, max: 127\nShort bits: 16, min: -32768, max: 32767\nInt bits: 32, min: -2147483648, max: 2147483647\nLong bits: 64, min: -9223372036854775808, max: 9223372036854775807\nChar bits: 16, min: 0, max: 65535",
          "explanation": "Standard wrapper classes provide constants for exact bit size and min/max values. Notice char is unsigned (0 to 65535)."
        },
        {
          "title": "Integer Overflow and Floating-Point Precision Pitfalls",
          "code": "public class OverflowPrecisionDemo {\n    public static void main(String[] args) {\n        // Integer overflow wraps around due to two's complement arithmetic\n        int maxInt = Integer.MAX_VALUE;\n        int overflowed = maxInt + 1;\n        System.out.println(\"Max Int: \" + maxInt);\n        System.out.println(\"Max Int + 1 wraps to: \" + overflowed);\n\n        // Floating point round-off error in IEEE 754\n        double a = 0.1;\n        double b = 0.2;\n        double sum = a + b;\n        System.out.println(\"0.1 + 0.2 == 0.3: \" + (sum == 0.3));\n        System.out.println(\"Actual 0.1 + 0.2 value: \" + sum);\n    }\n}",
          "expectedOutput": "Max Int: 2147483647\nMax Int + 1 wraps to: -2147483648\n0.1 + 0.2 == 0.3: false\nActual 0.1 + 0.2 value: 0.30000000000000004",
          "explanation": "When Integer.MAX_VALUE overflows, the sign bit becomes 1, wrapping to Integer.MIN_VALUE. Floating-point numbers cannot represent base-10 decimals like 0.1 exactly in binary, requiring BigDecimal for financial calculations."
        }
      ],
      "realWorldApplications": [
        "Using primitive byte and int arrays for low-latency network packet deserialization.",
        "Using BigDecimal instead of double/float for financial accounting, e-commerce pricing, and banking transactions."
      ],
      "commonMistakes": [
        "Using `double` or `float` for monetary calculations (e.g. `0.1 + 0.2 != 0.3`), resulting in cumulative penny errors.",
        "Forgetting the `L` suffix on integer literals larger than 2^31-1 (e.g. `long val = 3000000000;` triggers a compile error).",
        "Using double or float for monetary calculations instead of BigDecimal, leading to binary floating-point rounding errors."
      ],
      "interviewRelevance": "Popular interview question: \"Why is char 16 bits in Java unlike C/C++?\", \"What happens when an int overflows?\", and \"Why shouldn’t you use float for currency?\"",
      "checkpoints": [
        {
          "id": "java-04-cp-1",
          "label": "Memorize all 8 primitives, their exact bit widths, and default values"
        },
        {
          "id": "java-04-cp-2",
          "label": "Understand two's complement overflow behavior and IEEE 754 precision limitations"
        },
        {
          "id": "java-04-primitive-data-types-cp-3",
          "label": "Identify size, default values, and memory representation of all 8 primitive types."
        }
      ],
      "practiceExercises": [
        {
          "id": "java-04-ex-1",
          "title": "Check Char Bit Representation",
          "difficulty": "Beginner",
          "type": "coding",
          "prompt": "Write a snippet that prints the integer ASCII/Unicode value of character 'Z' and converts 65 back to char.",
          "solution": "public class CharConvert {\n    public static void main(String[] args) {\n        char ch = 'Z';\n        int code = ch;\n        char fromCode = (char) 65;\n        System.out.println(\"Code of Z: \" + code);\n        System.out.println(\"Char from 65: \" + fromCode);\n    }\n}",
          "explanation": "char converts implicitly to int. int converts to char via explicit narrowing cast (char) 65."
        },
        {
          "id": "java-04-ex-2",
          "title": "Detect Integer Addition Overflow",
          "difficulty": "Intermediate",
          "type": "coding",
          "prompt": "Implement a function safeAdd(int a, int b) that uses Math.addExact or arithmetic checks to throw ArithmeticException on overflow.",
          "solution": "public class SafeArithmetic {\n    public static int safeAdd(int a, int b) {\n        return Math.addExact(a, b);\n    }\n    public static void main(String[] args) {\n        try {\n            safeAdd(Integer.MAX_VALUE, 1);\n        } catch (ArithmeticException e) {\n            System.out.println(\"Caught overflow cleanly!\");\n        }\n    }\n}",
          "explanation": "Math.addExact() in Java 8+ checks for two's complement overflow and throws ArithmeticException if exceeded."
        },
        {
          "id": "java-04-ex-3",
          "title": "Accurate Currency Math with BigDecimal",
          "difficulty": "Advanced",
          "type": "coding",
          "prompt": "Demonstrate why double fails for 1.00 - 0.90 and write the correct solution using BigDecimal(String).",
          "solution": "import java.math.BigDecimal;\n\npublic class CurrencyCalculation {\n    public static void main(String[] args) {\n        double dDiff = 1.00 - 0.90;\n        System.out.println(\"Double diff: \" + dDiff);\n        \n        BigDecimal b1 = new BigDecimal(\"1.00\");\n        BigDecimal b2 = new BigDecimal(\"0.90\");\n        BigDecimal bDiff = b1.subtract(b2);\n        System.out.println(\"BigDecimal diff: \" + bDiff);\n    }\n}",
          "explanation": "Always construct BigDecimal with a String argument; new BigDecimal(double) preserves binary approximation errors."
        }
      ],
      "quizQuestions": [
        {
          "id": "java-04-q1",
          "question": "What is the size and sign of the char data type in Java?",
          "options": [
            "8 bits, signed",
            "16 bits, unsigned",
            "16 bits, signed",
            "32 bits, unsigned"
          ],
          "correctOptionIndex": 1,
          "explanation": "char in Java is 16 bits and unsigned (0 to 65,535) because Java was designed to support Unicode (UTF-16)."
        },
        {
          "id": "java-04-q2",
          "question": "What is the result of evaluating (byte)(127 + 1) in Java?",
          "options": [
            "128",
            "-128",
            "Compile Error",
            "0"
          ],
          "correctOptionIndex": 1,
          "explanation": "127 in binary is 01111111. Adding 1 gives 10000000, which is -128 in two's complement 8-bit signed representation."
        }
      ],
      "revisionNotes": [
        "Java has 8 primitives: byte(8), short(16), int(32), long(64), float(32), double(64), char(16), boolean.",
        "char is the only unsigned primitive type (0 to 65535).",
        "Use BigDecimal with String constructors for currency and financial math."
      ]
    },
    {
      "id": "java-05-variables-type-conversion",
      "moduleId": "java-m1",
      "moduleNumber": 1,
      "moduleTitle": "Java Fundamentals",
      "topicNumber": 5,
      "title": "Variables, Scope & Type Conversion (Widening & Narrowing)",
      "language": "java",
      "level": "Beginner",
      "whyItMatters": "Type conversions and variable scopes are constant sources of bugs. Understanding implicit widening vs explicit narrowing prevents accidental data truncation, sign-extension surprises, and precision loss.",
      "explanation": "Java variables have three scopes: Local (inside methods/blocks, must be initialized before use), Instance (non-static fields, default initialized to 0/false/null), and Static/Class (shared across all instances).\nType Conversion in Java:\n1. Widening Conversion (Implicit): Converting a smaller data type to a larger data type. It happens automatically without data loss (byte -> short -> int -> long -> float -> double). Note that char -> int is also widening.\n2. Narrowing Conversion (Explicit): Converting a larger data type to a smaller data type. Requires an explicit cast operator `(type)`. Potential for data loss or bit truncation (e.g. `(byte) 300` results in `44` because 300 % 256 = 44).\n3. Type Promotion in Expressions: In any arithmetic expression, byte, short, and char are automatically promoted to int before evaluation.",
      "syntaxAndStructure": "// Widening (Implicit)\nint myInt = 100;\nlong myLong = myInt;        // Automatically converted\ndouble myDouble = myLong;   // Automatically converted\n\n// Narrowing (Explicit Cast)\ndouble pi = 3.14159;\nint truncatedPi = (int) pi; // Explicit (int) required; truncated to 3\n\n// Type promotion in expressions\nbyte b1 = 10;\nbyte b2 = 20;\n// byte b3 = b1 + b2;      // COMPILE ERROR: b1 + b2 produces int\nbyte b3 = (byte)(b1 + b2);  // Correct with explicit cast",
      "codeExamples": [
        {
          "title": "Widening vs Narrowing Cast Demonstration",
          "code": "public class TypeCastingDemo {\n    public static void main(String[] args) {\n        // Widening: int to double\n        int count = 25;\n        double decimalCount = count; // Automatic\n        System.out.println(\"Widened int to double: \" + decimalCount);\n\n        // Narrowing: double to int (truncation)\n        double price = 99.99;\n        int wholePrice = (int) price; // Truncates decimal, does NOT round\n        System.out.println(\"Narrowed double to int: \" + wholePrice);\n\n        // Narrowing: int to byte with bit truncation\n        int largeVal = 260;\n        byte truncatedByte = (byte) largeVal; // 260 in binary = 00000001 00000100 -> lower 8 bits = 4\n        System.out.println(\"260 cast to byte: \" + truncatedByte);\n    }\n}",
          "expectedOutput": "Widened int to double: 25.0\nNarrowed double to int: 99\n260 cast to byte: 4",
          "explanation": "Narrowing from double to int simply truncates fractional digits without rounding. Narrowing to byte retains only the lowest 8 bits (260 & 0xFF = 4)."
        },
        {
          "title": "Numeric Promotion in Arithmetic Expressions",
          "code": "public class PromotionDemo {\n    public static void main(String[] args) {\n        byte a = 40;\n        byte b = 50;\n        byte c = 100;\n        // a * b is promoted to int (2000), which exceeds byte range, then divided by c (100) -> 20\n        int result = a * b / c;\n        System.out.println(\"Promoted calculation result: \" + result);\n\n        char letter = 'A'; // ASCII 65\n        int offsetLetter = letter + 5; // char promoted to int\n        System.out.println(\"Letter 'A' + 5 as int: \" + offsetLetter);\n        System.out.println(\"Cast back to char: \" + (char) offsetLetter);\n    }\n}",
          "expectedOutput": "Promoted calculation result: 20\nLetter 'A' + 5 as int: 70\nCast back to char: F",
          "explanation": "Java automatically promotes byte, short, and char to 32-bit int during evaluation, preventing intermediate overflow in `a * b`."
        }
      ],
      "realWorldApplications": [
        "Parsing binary communication protocol headers where byte buffers must be masked with `0xFF` to avoid negative sign extension when converting to int.",
        "Image pixel processing where 32-bit ARGB values are decomposed into 8-bit alpha, red, green, and blue components."
      ],
      "commonMistakes": [
        "Assuming `(int) 9.99` rounds to 10; floating-point casts to integer always truncate toward zero.",
        "Writing `byte b = 1; b = b + 1;` which causes a compile error because `b + 1` evaluates to `int`. (Note: `b++` and `b += 1` include an implicit cast).",
        "Ignoring integer overflow when casting larger integer values (like long to int or int to byte) without bounds checks."
      ],
      "interviewRelevance": "High frequency in placement tests: \"Why does `byte b = 10; b = b * 2;` not compile but `b *= 2;` compiles?\" and \"What is the result of `(byte) 130`?\"",
      "checkpoints": [
        {
          "id": "java-05-cp-1",
          "label": "Identify automatic widening paths and when explicit narrowing casts are mandatory"
        },
        {
          "id": "java-05-cp-2",
          "label": "Explain why compound assignment operators (+=, *=) include implicit casts"
        },
        {
          "id": "java-05-variables-type-conversion-cp-3",
          "label": "Differentiate between widening (implicit) and narrowing (explicit) type conversions."
        }
      ],
      "practiceExercises": [
        {
          "id": "java-05-ex-1",
          "title": "Evaluate Narrowing Cast Output",
          "difficulty": "Beginner",
          "type": "conceptual",
          "prompt": "What will be printed by: byte b = (byte) 130; System.out.println(b);? Explain the math.",
          "solution": "Output: -126.\nExplanation: 130 in binary is 00000000 00000000 00000000 10000010. Casting to byte retains the lowest 8 bits: 10000010. In two's complement with sign bit 1: -(invert(0000010) + 1) = -(01111101 + 1) = -(01111110) = -126.",
          "explanation": "Integer 130 wraps into negative space because the 8th bit is 1."
        },
        {
          "id": "java-05-ex-2",
          "title": "Compound Assignment vs Explicit Addition",
          "difficulty": "Intermediate",
          "type": "coding",
          "prompt": "Demonstrate with a code snippet why short s = 5; s += 5; compiles while s = s + 5; fails to compile.",
          "solution": "public class CompoundAssignmentTest {\n    public static void main(String[] args) {\n        short s = 5;\n        // s = s + 5; // Error: Type mismatch: cannot convert from int to short\n        s += 5; // Equivalent to s = (short)(s + 5);\n        System.out.println(\"Short value: \" + s);\n    }\n}",
          "explanation": "The Java language specification defines E1 op= E2 as automatically equivalent to E1 = (T)(E1 op E2)."
        },
        {
          "id": "java-05-ex-3",
          "title": "Unsigned Byte to Int Conversion",
          "difficulty": "Advanced",
          "type": "coding",
          "prompt": "Given a signed byte b = -50, convert it to its unsigned integer representation (0 to 255) using bitwise masking.",
          "solution": "public class UnsignedByteConversion {\n    public static void main(String[] args) {\n        byte b = -50;\n        int unsignedVal = b & 0xFF; // Masks out sign-extended bits\n        System.out.println(\"Signed byte: \" + b);\n        System.out.println(\"Unsigned int value: \" + unsignedVal);\n    }\n}",
          "explanation": "In Java, converting byte to int sign-extends the leading bits with 1s. Performing `& 0xFF` clears the upper 24 bits, leaving the correct 0-255 unsigned magnitude."
        }
      ],
      "quizQuestions": [
        {
          "id": "java-05-q1",
          "question": "Which of the following assignments will cause a compile-time error without an explicit cast?",
          "options": [
            "long l = 100;",
            "double d = 3.14f;",
            "int i = 10.5;",
            "float f = 25;"
          ],
          "correctOptionIndex": 2,
          "explanation": "10.5 is a double literal. Assigning a double to an int is a narrowing conversion requiring an explicit cast `(int) 10.5`."
        },
        {
          "id": "java-05-q2",
          "question": "What is the type of the expression (short1 + short2) in Java?",
          "options": [
            "short",
            "int",
            "long",
            "byte"
          ],
          "correctOptionIndex": 1,
          "explanation": "Binary arithmetic operators promote byte and short operands to 32-bit int before applying the operation."
        }
      ],
      "revisionNotes": [
        "Widening (byte -> short/char -> int -> long -> float -> double) is automatic.",
        "Narrowing requires an explicit cast and truncates higher-order bits or fractional values.",
        "Compound assignment operators (`+=`, `*=`) silently insert an explicit cast."
      ]
    },
    {
      "id": "java-06-operators",
      "moduleId": "java-m1",
      "moduleNumber": 1,
      "moduleTitle": "Java Fundamentals",
      "topicNumber": 6,
      "title": "Operators, Precedence & Short-Circuit Evaluation",
      "language": "java",
      "level": "Beginner",
      "whyItMatters": "Operator precedence, prefix vs postfix increment nuances, and short-circuit evaluation (`&&` vs `&`, `||` vs `|`) are classic placement test traps that determine execution flow and prevent null pointer crashes.",
      "explanation": "Java operators are categorized into Arithmetic (+, -, *, /, %), Relational (==, !=, >, <, >=, <=), Logical (&&, ||, !), Bitwise (&, |, ^, ~, <<, >>, >>>), and Assignment (=, +=, etc.).\nKey concepts:\n1. Short-Circuit Logical Operators: `&&` and `||` evaluate the right-hand operand only if the left-hand operand does not determine the outcome. For example, `if (str != null && str.length() > 0)` never evaluates `str.length()` if `str` is null, preventing NullPointerException.\n2. Non-Short-Circuit Bitwise/Logical: `&` and `|` always evaluate both sides regardless of the left side.\n3. Shift Operators: `>>` performs signed arithmetic right shift (preserves sign bit), while `>>>` performs unsigned logical right shift (shifts zeros into high-order bits).\n4. Increment/Decrement: Postfix (`i++`) evaluates the current value first, then increments. Prefix (`++i`) increments first, then evaluates.",
      "syntaxAndStructure": "// Short-circuit safe navigation\nif (obj != null && obj.isValid()) { ... }\n\n// Bitwise shifts\nint x = -8;\nint signedShift = x >> 1;   // -4 (sign bit preserved)\nint unsignedShift = x >>> 1; // Large positive number (0 shifted in MSB)\n\n// Prefix vs Postfix\nint a = 5;\nint b = a++; // b = 5, a = 6\nint c = ++a; // a = 7, c = 7",
      "codeExamples": [
        {
          "title": "Short-Circuit Evaluation Preventing Exceptions",
          "code": "public class ShortCircuitDemo {\n    public static void main(String[] args) {\n        String testString = null;\n\n        // Safe: short-circuit && avoids NullPointerException\n        if (testString != null && testString.length() > 5) {\n            System.out.println(\"Long string\");\n        } else {\n            System.out.println(\"Safe check passed without NullPointerException.\");\n        }\n\n        int x = 10;\n        int y = 20;\n        // In ||, first condition (x > 5) is true, so ++y is NEVER evaluated\n        if (x > 5 || ++y > 20) {\n            System.out.println(\"y remains unincremented: \" + y);\n        }\n    }\n}",
          "expectedOutput": "Safe check passed without NullPointerException.\ny remains unincremented: 20",
          "explanation": "Because x > 5 is true, the || short-circuits and ++y is skipped, leaving y equal to 20."
        },
        {
          "title": "Signed (>>) vs Unsigned (>>>) Right Shift",
          "code": "public class BitwiseShiftDemo {\n    public static void main(String[] args) {\n        int negativeNumber = -16;\n        \n        int signedShift = negativeNumber >> 2;   // Preserves 1 in sign bit\n        int unsignedShift = negativeNumber >>> 2; // Injects 0 into sign bit\n        \n        System.out.println(\"-16 >> 2 = \" + signedShift);\n        System.out.println(\"-16 >>> 2 is positive: \" + (unsignedShift > 0));\n        System.out.println(\"Value of -16 >>> 2: \" + unsignedShift);\n    }\n}",
          "expectedOutput": "-16 >> 2 = -4\n-16 >>> 2 is positive: true\nValue of -16 >>> 2: 1073741820",
          "explanation": "Signed shift (>>) divides by 4 preserving sign (-4). Unsigned shift (>>>) fills the highest bits with 0, transforming a negative number into a large positive integer."
        }
      ],
      "realWorldApplications": [
        "Null-safe defensive checks in high-traffic APIs using short-circuit logical operators.",
        "Bitwise masking and shifting in cryptographic algorithms and hashing functions (e.g. `hashCode()` calculation)."
      ],
      "commonMistakes": [
        "Using `&` instead of `&&` when performing null checks: `if (s != null & s.length() > 0)` crashes with NullPointerException because `&` evaluates both sides.",
        "Writing `x = x++` expecting x to increase; postfix `x++` evaluates the old value, then writes the old value back to x, leaving x unchanged!",
        "Confusing bitwise operators (&, |) with short-circuit logical operators (&&, ||), causing unexpected operand evaluations."
      ],
      "interviewRelevance": "Common interview questions: \"Explain the difference between `>>` and `>>>`\", \"What is the output of `int x = 5; System.out.println(x++ + ++x);`?\", and \"Why does Java have both `&` and `&&`?\"",
      "checkpoints": [
        {
          "id": "java-06-cp-1",
          "label": "Distinguish short-circuit (&&, ||) from eager bitwise (&, |) operators"
        },
        {
          "id": "java-06-cp-2",
          "label": "Explain differences between arithmetic right shift (>>) and logical right shift (>>>)"
        },
        {
          "id": "java-06-operators-cp-3",
          "label": "Apply operator precedence and short-circuit evaluation rules correctly."
        }
      ],
      "practiceExercises": [
        {
          "id": "java-06-ex-1",
          "title": "Evaluate Tricky Postfix Expression",
          "difficulty": "Beginner",
          "type": "coding",
          "prompt": "Predict and verify the output of: int a = 5; int result = a++ + ++a * 2;",
          "solution": "public class PostfixTest {\n    public static void main(String[] args) {\n        int a = 5;\n        // Evaluation order:\n        // 1. a++ evaluates to 5, a becomes 6\n        // 2. ++a increments a to 7, evaluates to 7\n        // 3. Multiplication has higher precedence: 7 * 2 = 14\n        // 4. Addition: 5 + 14 = 19\n        int result = a++ + ++a * 2;\n        System.out.println(\"Result: \" + result);\n        System.out.println(\"Final a: \" + a);\n    }\n}",
          "explanation": "a++ returns 5 (a=6); ++a returns 7 (a=7). Multiplication (7 * 2 = 14) executes before addition (5 + 14 = 19)."
        },
        {
          "id": "java-06-ex-2",
          "title": "Check Power of Two Using Bitwise AND",
          "difficulty": "Intermediate",
          "type": "coding",
          "prompt": "Implement isPowerOfTwo(int n) using a single line bitwise expression.",
          "solution": "public class PowerOfTwoCheck {\n    public static boolean isPowerOfTwo(int n) {\n        return n > 0 && (n & (n - 1)) == 0;\n    }\n    public static void main(String[] args) {\n        System.out.println(\"16 is power of 2: \" + isPowerOfTwo(16));\n        System.out.println(\"18 is power of 2: \" + isPowerOfTwo(18));\n    }\n}",
          "explanation": "Powers of 2 have exactly one 1-bit in binary (e.g. 16 = 10000). Subtracting 1 flips all bits up to the 1-bit (15 = 01111). Their bitwise AND is 0."
        },
        {
          "id": "java-06-ex-3",
          "title": "Swap Two Variables Without Temp Variable",
          "difficulty": "Advanced",
          "type": "coding",
          "prompt": "Write a program to swap two integers using the XOR bitwise operator without auxiliary memory.",
          "solution": "public class XORSwap {\n    public static void main(String[] args) {\n        int x = 42;\n        int y = 99;\n        \n        x = x ^ y;\n        y = x ^ y; // y becomes original x\n        x = x ^ y; // x becomes original y\n        \n        System.out.println(\"x: \" + x + \", y: \" + y);\n    }\n}",
          "explanation": "XOR properties (A ^ A = 0, A ^ 0 = A, commutative and associative) allow swapping without temporary memory or overflow risks."
        }
      ],
      "quizQuestions": [
        {
          "id": "java-06-q1",
          "question": "What is the output of: int x = 1; if (x > 0 || (10 / 0 == 0)) System.out.println(\"Pass\");",
          "options": [
            "ArithmeticException: / by zero",
            "Pass",
            "Compile Error",
            "No output"
          ],
          "correctOptionIndex": 1,
          "explanation": "Because `x > 0` is true, the `||` short-circuits and never evaluates `10 / 0`, avoiding any ArithmeticException."
        },
        {
          "id": "java-06-q2",
          "question": "What does the operator `>>>` do in Java?",
          "options": [
            "Right shift signed (retains sign bit)",
            "Right shift unsigned (fills high-order bits with 0)",
            "Left shift unsigned (fills low-order bits with 1)",
            "Rotates bits circularly"
          ],
          "correctOptionIndex": 1,
          "explanation": "`>>>` is the unsigned (logical) right shift operator. It shifts bits to the right and unconditionally inserts 0 into the most significant bits."
        }
      ],
      "revisionNotes": [
        "`&&` and `||` short-circuit; `&` and `|` always evaluate both operands.",
        "`>>` retains the sign bit; `>>>` shifts zeros into the most significant bits.",
        "`n & (n - 1) == 0` is the standard O(1) test for powers of two."
      ]
    },
    {
      "id": "java-07-input-output",
      "moduleId": "java-m1",
      "moduleNumber": 1,
      "moduleTitle": "Java Fundamentals",
      "topicNumber": 7,
      "title": "Standard I/O, Scanner, BufferedReader & Formatted Output",
      "language": "java",
      "level": "Beginner",
      "whyItMatters": "Competitive programming and coding tests often fail due to Time Limit Exceeded (TLE) when reading millions of integers with `Scanner`. Understanding `BufferedReader` vs `Scanner` is mandatory for technical screening rounds.",
      "explanation": "Java provides multiple ways to handle input and output:\n1. `Scanner`: Easy to use, parses primitives and tokens using regex, but slow due to synchronization and internal regex overhead (buffer size: 1024 chars).\n2. `BufferedReader`: Reads raw streams of characters into an 8192-char buffer. Significantly faster than Scanner (often 4-5x faster for competitive programming), but reads strings only (requires manual parsing like `Integer.parseInt()`).\n3. Output:\n   - `System.out.print()` / `println()`: Standard stream printing.\n   - `System.out.printf()` / `String.format()`: Formatted strings using format specifiers (`%d` for decimal integers, `%f` for floating-point, `%s` for strings, `%n` for platform-independent newlines).",
      "syntaxAndStructure": "// Scanner approach:\nScanner sc = new Scanner(System.in);\nint val = sc.nextInt();\nString line = sc.nextLine();\n\n// Fast I/O approach:\nBufferedReader br = new BufferedReader(new InputStreamReader(System.in));\nString line = br.readLine();\nint parsedInt = Integer.parseInt(line);\n\n// Formatted Output:\nSystem.out.printf(\"Name: %-10s | Score: %05d | Rate: %.2f%n\", \"Alice\", 42, 98.7654);",
      "codeExamples": [
        {
          "title": "Formatted Output with System.out.printf",
          "code": "public class FormattedIODemo {\n    public static void main(String[] args) {\n        String name = \"Candidate\";\n        int score = 85;\n        double percentile = 97.4567;\n        \n        // %-12s: Left-aligned string in 12 char field\n        // %03d: Integer zero-padded to 3 digits\n        // %.2f: Floating point rounded to 2 decimal places\n        // %n: Platform-independent newline\n        System.out.printf(\"Report: %-10s | Marks: %03d | Percentile: %.2f%%%n\", name, score, percentile);\n        \n        // String.format generates formatted string without printing directly\n        String formatted = String.format(\"Summary: %s scored %.1f\", name, percentile);\n        System.out.println(formatted);\n    }\n}",
          "expectedOutput": "Report: Candidate  | Marks: 085 | Percentile: 97.46%\nSummary: Candidate scored 97.5",
          "explanation": "printf and String.format use standard printf specifiers. `%%` escapes a literal percent sign, and `%n` produces \\n or \\r\\n depending on OS."
        },
        {
          "title": "Simulating Fast I/O with BufferedReader & StringTokenizer",
          "code": "import java.io.BufferedReader;\nimport java.io.StringReader;\nimport java.util.StringTokenizer;\n\npublic class FastIOComparisonDemo {\n    public static void main(String[] args) throws Exception {\n        // Simulating input stream\n        String simulatedInput = \"5\\n10 20 30 40 50\\n\";\n        BufferedReader reader = new BufferedReader(new StringReader(simulatedInput));\n        \n        int n = Integer.parseInt(reader.readLine().trim());\n        StringTokenizer tokenizer = new StringTokenizer(reader.readLine());\n        \n        int sum = 0;\n        while (tokenizer.hasMoreTokens()) {\n            sum += Integer.parseInt(tokenizer.nextToken());\n        }\n        \n        System.out.println(\"Elements count: \" + n);\n        System.out.println(\"Fast parsed sum: \" + sum);\n    }\n}",
          "expectedOutput": "Elements count: 5\nFast parsed sum: 150",
          "explanation": "BufferedReader + StringTokenizer splits whitespace-delimited tokens in memory without regex overhead, avoiding TLE on large competitive programming inputs."
        }
      ],
      "realWorldApplications": [
        "Fast log file parsing and data pipeline ingestion in batch processing systems.",
        "Passing online coding platform test cases where inputs have 10^5 to 10^6 lines and Scanner would trigger TLE."
      ],
      "commonMistakes": [
        "The \"Scanner nextLine() trap\": Calling `sc.nextLine()` immediately after `sc.nextInt()` consumes the residual newline character left in the buffer instead of the next line.",
        "Using `\\n` instead of `%n` in `printf`; `%n` is portable across Windows (CRLF) and Linux (LF).",
        "Using Scanner.nextLine() immediately after Scanner.nextInt() without consuming the trailing newline character."
      ],
      "interviewRelevance": "Crucial for coding rounds: \"Why did my solution get TLE with Scanner?\" and \"How does the Scanner nextLine() bug occur and how do you fix it?\"",
      "checkpoints": [
        {
          "id": "java-07-cp-1",
          "label": "Explain the Scanner nextLine() newline buffer bug and its fix"
        },
        {
          "id": "java-07-cp-2",
          "label": "Implement fast input reading using BufferedReader and StringTokenizer"
        },
        {
          "id": "java-07-input-output-cp-3",
          "label": "Choose appropriately between Scanner, BufferedReader, and System.console()."
        }
      ],
      "practiceExercises": [
        {
          "id": "java-07-ex-1",
          "title": "Fix Scanner nextLine() Buffer Trap",
          "difficulty": "Beginner",
          "type": "coding",
          "prompt": "Demonstrate the Scanner nextLine() bug and fix it by consuming the residual newline.",
          "solution": "import java.util.Scanner;\n\npublic class ScannerTrapFix {\n    public static void main(String[] args) {\n        String input = \"42\\nPlacement Prep\\n\";\n        Scanner sc = new Scanner(input);\n        \n        int age = sc.nextInt();\n        sc.nextLine(); // CONSUME RESIDUAL NEWLINE\n        String name = sc.nextLine();\n        \n        System.out.println(\"Age: \" + age + \", Name: \" + name);\n    }\n}",
          "explanation": "nextInt() consumes only numeric characters. The trailing \\n remains in the stream until consumed by an extra sc.nextLine()."
        },
        {
          "id": "java-07-ex-2",
          "title": "Custom FastScanner Implementation",
          "difficulty": "Intermediate",
          "type": "coding",
          "prompt": "Write a minimal FastScanner utility class wrapping BufferedReader and StringTokenizer.",
          "solution": "import java.io.*;\nimport java.util.StringTokenizer;\n\npublic class FastScanner {\n    private BufferedReader br;\n    private StringTokenizer st;\n\n    public FastScanner(Reader r) {\n        br = new BufferedReader(r);\n    }\n\n    public String next() throws IOException {\n        while (st == null || !st.hasMoreTokens()) {\n            String line = br.readLine();\n            if (line == null) return null;\n            st = new StringTokenizer(line);\n        }\n        return st.nextToken();\n    }\n\n    public int nextInt() throws IOException {\n        return Integer.parseInt(next());\n    }\n}",
          "explanation": "This FastScanner template provides fast amortized token retrieval by caching tokenizers per line."
        },
        {
          "id": "java-07-ex-3",
          "title": "Formatted Table Output Generation",
          "difficulty": "Advanced",
          "type": "coding",
          "prompt": "Generate an aligned console table of 3 products with columns: ID (4 digits zero-padded), Name (15 chars left-aligned), Price (2 decimals, right-aligned, 8 width).",
          "solution": "public class TableFormat {\n    public static void main(String[] args) {\n        System.out.printf(\"%-4s | %-15s | %8s%n\", \"ID\", \"Name\", \"Price\");\n        System.out.println(\"---------------------------------\");\n        System.out.printf(\"%04d | %-15s | %8.2f%n\", 1, \"Laptop\", 899.99);\n        System.out.printf(\"%04d | %-15s | %8.2f%n\", 25, \"Wireless Mouse\", 24.50);\n        System.out.printf(\"%04d | %-15s | %8.2f%n\", 102, \"Monitor 4K\", 349.00);\n    }\n}",
          "explanation": "Format specifier flags (%-s for left-align, %0d for zero-padding, %8.2f for right-aligned fixed width) format structured tables without manual string concatenation."
        }
      ],
      "quizQuestions": [
        {
          "id": "java-07-q1",
          "question": "Why is BufferedReader significantly faster than Scanner for reading large volumes of input?",
          "options": [
            "BufferedReader compiles directly into C code",
            "BufferedReader uses a large 8KB internal buffer and does not parse inputs with regular expressions",
            "Scanner does not support multi-threading",
            "BufferedReader ignores Unicode characters"
          ],
          "correctOptionIndex": 1,
          "explanation": "Scanner uses regular expression matching and smaller buffers, whereas BufferedReader reads character blocks into an 8KB buffer without regex overhead."
        },
        {
          "id": "java-07-q2",
          "question": "What is the purpose of %n in String.format() or System.out.printf()?",
          "options": [
            "Inserts a null character",
            "Generates a platform-independent line separator (\\n on Unix, \\r\\n on Windows)",
            "Prints numbers in scientific notation",
            "Forces a memory flush"
          ],
          "correctOptionIndex": 1,
          "explanation": "%n always outputs the line separator specific to the host operating system."
        }
      ],
      "revisionNotes": [
        "Use BufferedReader + StringTokenizer for competitive programming fast I/O.",
        "Always consume the leftover newline after nextInt()/nextDouble() before calling nextLine().",
        "Use %n in printf for cross-platform newline safety."
      ]
    },
    {
      "id": "java-08-conditional-statements",
      "moduleId": "java-m1",
      "moduleNumber": 1,
      "moduleTitle": "Java Fundamentals",
      "topicNumber": 8,
      "title": "Conditional Statements & Modern Switch Expressions",
      "language": "java",
      "level": "Beginner",
      "whyItMatters": "Control flow is fundamental to all algorithm implementations. Modern Java (Java 14+) introduced switch expressions with arrow syntax (`->`) and `yield`, eliminating fall-through bugs and returning values directly.",
      "explanation": "Java provides standard conditional structures:\n1. `if`, `else if`, `else`: Boolean expression branches.\n2. Traditional `switch`: Evaluates byte, short, char, int, String, or Enum. Requires explicit `break` statements to prevent unintentional fall-through.\n3. Modern Switch Expressions (Java 14+ LTS / Java 17+):\n   - Uses arrow syntax (`case X -> ...`), which does NOT fall through.\n   - Can be used as an expression that returns a value (e.g. `String type = switch(day) { ... };`).\n   - Supports multi-label matching (`case 1, 2, 3 ->`).\n   - Uses the `yield` keyword to return values from multi-line code blocks.\n   - Enforces exhaustiveness (requires `default` unless all enum or sealed type cases are covered).",
      "syntaxAndStructure": "// Traditional switch (watch out for missing breaks):\nswitch(val) {\n    case 1: doA(); break;\n    default: doDefault();\n}\n\n// Modern Switch Expression (Java 14+):\nString result = switch(day) {\n    case MONDAY, FRIDAY -> \"Work\";\n    case SATURDAY, SUNDAY -> \"Weekend\";\n    default -> {\n        System.out.println(\"Midweek\");\n        yield \"Midweek Day\";\n    }\n};",
      "codeExamples": [
        {
          "title": "Modern Switch Expression with Arrow Syntax and Value Yielding",
          "code": "public class ModernSwitchDemo {\n    public static void main(String[] args) {\n        String day = \"SATURDAY\";\n\n        // Modern switch as an expression returning a value\n        String dayType = switch (day) {\n            case \"MONDAY\", \"TUESDAY\", \"WEDNESDAY\", \"THURSDAY\", \"FRIDAY\" -> \"Weekday\";\n            case \"SATURDAY\", \"SUNDAY\" -> \"Weekend\";\n            default -> \"Unknown\";\n        };\n        System.out.println(day + \" is a: \" + dayType);\n\n        // Switch expression with multi-line block and yield\n        int score = 88;\n        String grade = switch (score / 10) {\n            case 10, 9 -> \"A+\";\n            case 8 -> {\n                System.out.println(\"High performance achieved.\");\n                yield \"A\";\n            }\n            case 7 -> \"B\";\n            default -> \"C\";\n        };\n        System.out.println(\"Final Grade: \" + grade);\n    }\n}",
          "expectedOutput": "SATURDAY is a: Weekend\nHigh performance achieved.\nFinal Grade: A",
          "explanation": "Arrow syntax (`->`) eliminates fall-through without needing break statements. Multi-line blocks inside switch expressions return values using the `yield` keyword."
        },
        {
          "title": "Ternary Operator Nested Evaluation",
          "code": "public class TernaryDemo {\n    public static void main(String[] args) {\n        int a = 15;\n        int b = 25;\n        int c = 20;\n\n        // Nested ternary operator to find maximum among three numbers\n        int max = (a > b) ? ((a > c) ? a : c) : ((b > c) ? b : c);\n        System.out.println(\"Maximum of \" + a + \", \" + b + \", \" + c + \" is: \" + max);\n\n        String parity = (max % 2 == 0) ? \"Even\" : \"Odd\";\n        System.out.println(\"Max number parity: \" + parity);\n    }\n}",
          "expectedOutput": "Maximum of 15, 25, 20 is: 25\nMax number parity: Odd",
          "explanation": "Ternary operator `condition ? expr1 : expr2` is an inline shorthand for if-else, returning an evaluated expression value."
        }
      ],
      "realWorldApplications": [
        "State machine transitions, HTTP status code dispatching, and command routing in REST microservices.",
        "Refactoring verbose nested if-else ladders into clean, readable, compiler-verified switch expressions."
      ],
      "commonMistakes": [
        "Missing `break` in traditional switch statements, leading to accidental fall-through bugs.",
        "Using `return` instead of `yield` inside a multi-line switch expression block; `return` returns from the enclosing method, while `yield` produces a value for the switch expression.",
        "Forgetting break statements in switch cases, causing unintentional fall-through bugs."
      ],
      "interviewRelevance": "Interview favorite: \"How do modern switch expressions differ from traditional switch statements?\" and \"What is the purpose of the yield keyword in Java 14+?\"",
      "checkpoints": [
        {
          "id": "java-08-cp-1",
          "label": "Master arrow syntax (->) in modern switch expressions without fall-through"
        },
        {
          "id": "java-08-cp-2",
          "label": "Use yield keyword correctly in multi-line switch expression blocks"
        },
        {
          "id": "java-08-conditional-statements-cp-3",
          "label": "Use modern switch expressions with arrow syntax (->) and pattern matching."
        }
      ],
      "practiceExercises": [
        {
          "id": "java-08-ex-1",
          "title": "Convert If-Else Chain to Switch Expression",
          "difficulty": "Beginner",
          "type": "coding",
          "prompt": "Convert an HTTP status code check (200 -> OK, 404 -> Not Found, 500 -> Server Error) into a modern switch expression.",
          "solution": "public class HttpStatusSwitch {\n    public static String getMessage(int statusCode) {\n        return switch (statusCode) {\n            case 200 -> \"OK\";\n            case 404 -> \"Not Found\";\n            case 500 -> \"Internal Server Error\";\n            default -> \"Unknown Code\";\n        };\n    }\n    public static void main(String[] args) {\n        System.out.println(getMessage(200));\n        System.out.println(getMessage(404));\n    }\n}",
          "explanation": "Switch expressions return values directly from cases without repetitive return or break statements."
        },
        {
          "id": "java-08-ex-2",
          "title": "Safe Enum Dispatching Without Default",
          "difficulty": "Intermediate",
          "type": "coding",
          "prompt": "Define an enum Priority { LOW, MEDIUM, HIGH } and write an exhaustive switch expression that calculates turnaround time in days without needing a default branch.",
          "solution": "public class EnumSwitchExhaustive {\n    enum Priority { LOW, MEDIUM, HIGH }\n\n    public static int getTurnaroundDays(Priority p) {\n        return switch (p) {\n            case LOW -> 7;\n            case MEDIUM -> 3;\n            case HIGH -> 1;\n        };\n    }\n    public static void main(String[] args) {\n        System.out.println(\"High priority turnaround: \" + getTurnaroundDays(Priority.HIGH));\n    }\n}",
          "explanation": "When switching on an Enum, if all enum constants are covered, the Java compiler guarantees exhaustiveness and omits the default requirement."
        },
        {
          "id": "java-08-ex-3",
          "title": "Calculate Leap Year with Boolean Logic",
          "difficulty": "Advanced",
          "type": "coding",
          "prompt": "Write isLeapYear(int year) using clean boolean logic (divisible by 4 and not 100, or divisible by 400).",
          "solution": "public class LeapYear {\n    public static boolean isLeapYear(int year) {\n        return (year % 4 == 0 && year % 100 != 0) || (year % 400 == 0);\n    }\n    public static void main(String[] args) {\n        System.out.println(\"2000 is leap: \" + isLeapYear(2000));\n        System.out.println(\"1900 is leap: \" + isLeapYear(1900));\n        System.out.println(\"2024 is leap: \" + isLeapYear(2024));\n    }\n}",
          "explanation": "Centurial years must be divisible by 400 to be leap years (hence 1900 is not, but 2000 is)."
        }
      ],
      "quizQuestions": [
        {
          "id": "java-08-q1",
          "question": "Which keyword is used in Java 14+ switch expressions to produce a value from a multi-line block?",
          "options": [
            "return",
            "yield",
            "break",
            "emit"
          ],
          "correctOptionIndex": 1,
          "explanation": "`yield` returns a value from a block within a switch expression, while `return` exits the entire enclosing method."
        },
        {
          "id": "java-08-q2",
          "question": "What is true regarding the arrow syntax (case X -> ...) in modern Java switch?",
          "options": [
            "It requires break after every case",
            "It automatically falls through to subsequent cases",
            "Only the code to the right of the arrow is executed, preventing fall-through",
            "It only works with numbers"
          ],
          "correctOptionIndex": 2,
          "explanation": "Arrow case syntax completely eliminates unintentional fall-through behavior, executing solely the targeted branch."
        }
      ],
      "revisionNotes": [
        "Modern switch expressions (`case X ->`) never fall through, unlike traditional colon syntax.",
        "`yield` produces a value from a multi-statement switch block.",
        "Exhaustive enum and sealed class switches do not require a `default` case."
      ]
    },
    {
      "id": "java-09-loops",
      "moduleId": "java-m1",
      "moduleNumber": 1,
      "moduleTitle": "Java Fundamentals",
      "topicNumber": 9,
      "title": "Loops, Enhanced For-Each & Labeled Break/Continue",
      "language": "java",
      "level": "Beginner",
      "whyItMatters": "Iterative processing powers virtually all data structures and sorting routines. Labeled break and continue statements are crucial for cleanly terminating nested search loops without convoluted boolean flags.",
      "explanation": "Java supports four loop constructs:\n1. `for`: Standard index-based loop (`for (int i = 0; i < n; i++)`). Ideal when iteration bounds are known.\n2. Enhanced `for-each`: (`for (ElementType item : collection)`). Cleaner syntax for iterating arrays and `Iterable` collections. Read-only with respect to array element references.\n3. `while`: Pre-condition check loop. Executes 0 or more times.\n4. `do-while`: Post-condition check loop. Always executes at least once.\n\nControl Flow Alterations:\n- `break`: Exits the innermost loop.\n- `continue`: Skips the remainder of the current iteration and advances loop counter.\n- Labeled `break` / `continue`: Attaching a label (e.g. `outerLoop: for (...)`) allows breaking out of or continuing an outer nested loop from deeply nested logic.",
      "syntaxAndStructure": "// Enhanced for-each\nfor (String item : list) { ... }\n\n// Labeled Break for nested loops\nouter: for (int i = 0; i < rows; i++) {\n    for (int j = 0; j < cols; j++) {\n        if (matrix[i][j] == target) {\n            System.out.println(\"Found!\");\n            break outer; // Exits BOTH loops immediately\n        }\n    }\n}",
      "codeExamples": [
        {
          "title": "Labeled Break in Nested Matrix Search",
          "code": "public class LabeledLoopDemo {\n    public static void main(String[] args) {\n        int[][] matrix = {\n            { 1, 2, 3 },\n            { 4, 99, 6 },\n            { 7, 8, 9 }\n        };\n        int target = 99;\n        boolean found = false;\n\n        // Label outer loop\n        searchLoop:\n        for (int r = 0; r < matrix.length; r++) {\n            for (int c = 0; c < matrix[r].length; c++) {\n                if (matrix[r][c] == target) {\n                    System.out.println(\"Found target \" + target + \" at [\" + r + \"][\" + c + \"]\");\n                    found = true;\n                    break searchLoop; // Breaks out of BOTH nested loops\n                }\n            }\n        }\n        System.out.println(\"Search completed cleanly: \" + found);\n    }\n}",
          "expectedOutput": "Found target 99 at [1][1]\nSearch completed cleanly: true",
          "explanation": "Without `break searchLoop;`, a standard `break` would only exit the inner column loop, continuing to inspect row 2 unnecessarily."
        },
        {
          "title": "Enhanced For-Each vs Standard For Loop Modification",
          "code": "public class LoopComparisonDemo {\n    public static void main(String[] args) {\n        int[] numbers = { 10, 20, 30 };\n\n        // Attempting to modify array elements via for-each DOES NOT update array\n        for (int num : numbers) {\n            num = num * 2; // Only modifies local copy\n        }\n        System.out.println(\"After for-each attempt: \" + numbers[0]);\n\n        // Standard index-based loop updates array directly\n        for (int i = 0; i < numbers.length; i++) {\n            numbers[i] = numbers[i] * 2;\n        }\n        System.out.println(\"After indexed loop: \" + numbers[0]);\n    }\n}",
          "expectedOutput": "After for-each attempt: 10\nAfter indexed loop: 20",
          "explanation": "In an enhanced for-each loop over primitive arrays, the loop variable is a local copy of the element; modifying it has zero effect on the original array."
        }
      ],
      "realWorldApplications": [
        "Matrix traversal algorithms, pathfinding grid searches, and graph adjacency matrix exploration.",
        "Batch processing records with early exit on validation failure."
      ],
      "commonMistakes": [
        "Trying to modify array primitive values inside an enhanced for-each loop and expecting the array to change.",
        "Infinite loops in `do-while` when the update step is inadvertently bypassed with an unlabelled `continue`.",
        "Modifying a collection directly while iterating over it using a traditional for-each loop, triggering ConcurrentModificationException."
      ],
      "interviewRelevance": "Common question: \"How do you break out of multiple nested loops in Java without using System.exit() or boolean flags?\" (Answer: Labeled break).",
      "checkpoints": [
        {
          "id": "java-09-cp-1",
          "label": "Use labeled break and continue to control multi-level nested loops"
        },
        {
          "id": "java-09-cp-2",
          "label": "Understand why enhanced for-each cannot modify primitive array elements"
        },
        {
          "id": "java-09-loops-cp-3",
          "label": "Evaluate when to use while, do-while, enhanced for, and standard indexed loops."
        }
      ],
      "practiceExercises": [
        {
          "id": "java-09-ex-1",
          "title": "Reverse Number with While Loop",
          "difficulty": "Beginner",
          "type": "coding",
          "prompt": "Write a while loop to reverse the digits of an integer (e.g. 12345 -> 54321).",
          "solution": "public class NumberReversal {\n    public static int reverse(int n) {\n        int rev = 0;\n        while (n != 0) {\n            rev = rev * 10 + (n % 10);\n            n /= 10;\n        }\n        return rev;\n    }\n    public static void main(String[] args) {\n        System.out.println(\"Reversed: \" + reverse(12345));\n    }\n}",
          "explanation": "Extract last digit with % 10, shift reversed accumulator with * 10, and truncate with / 10."
        },
        {
          "id": "java-09-ex-2",
          "title": "Labeled Continue for Prime Number Search",
          "difficulty": "Intermediate",
          "type": "coding",
          "prompt": "Use labeled continue to print all prime numbers up to 30.",
          "solution": "public class PrimeSearch {\n    public static void main(String[] args) {\n        outer: for (int i = 2; i <= 30; i++) {\n            for (int j = 2; j * j <= i; j++) {\n                if (i % j == 0) {\n                    continue outer; // Not prime, check next number\n                }\n            }\n            System.out.print(i + \" \");\n        }\n        System.out.println();\n    }\n}",
          "explanation": "When a divisor is found, continue outer skips immediately to the next candidate integer."
        },
        {
          "id": "java-09-ex-3",
          "title": "Spiral Matrix Traversal Simulation",
          "difficulty": "Advanced",
          "type": "coding",
          "prompt": "Write an iterative loop structure to traverse a 3x3 matrix in spiral order.",
          "solution": "import java.util.*;\n\npublic class SpiralMatrix {\n    public static List<Integer> spiralOrder(int[][] matrix) {\n        List<Integer> res = new ArrayList<>();\n        if (matrix.length == 0) return res;\n        int top = 0, bottom = matrix.length - 1;\n        int left = 0, right = matrix[0].length - 1;\n\n        while (top <= bottom && left <= right) {\n            for (int c = left; c <= right; c++) res.add(matrix[top][c]);\n            top++;\n            for (int r = top; r <= bottom; r++) res.add(matrix[r][right]);\n            right--;\n            if (top <= bottom) {\n                for (int c = right; c >= left; c--) res.add(matrix[bottom][c]);\n                bottom--;\n            }\n            if (left <= right) {\n                for (int r = bottom; r >= top; r--) res.add(matrix[r][left]);\n                left++;\n            }\n        }\n        return res;\n    }\n    public static void main(String[] args) {\n        int[][] mat = {{1,2,3},{4,5,6},{7,8,9}};\n        System.out.println(\"Spiral: \" + spiralOrder(mat));\n    }\n}",
          "explanation": "Four coordinated boundary pointers (top, bottom, left, right) simulate clockwise boundary contraction."
        }
      ],
      "quizQuestions": [
        {
          "id": "java-09-q1",
          "question": "Which loop statement is guaranteed to execute its body at least once?",
          "options": [
            "for loop",
            "while loop",
            "do-while loop",
            "enhanced for-each loop"
          ],
          "correctOptionIndex": 2,
          "explanation": "do-while checks its boolean termination condition at the end of the iteration, guaranteeing at least one execution."
        },
        {
          "id": "java-09-q2",
          "question": "What happens when a labeled break statement executes inside a nested loop?",
          "options": [
            "It terminates only the innermost loop",
            "It terminates the specific loop denoted by the label",
            "It throws a compile error because labels are deprecated",
            "It re-executes the outer loop from beginning"
          ],
          "correctOptionIndex": 1,
          "explanation": "Labeled break transfers control directly to the statement immediately following the labeled enclosing loop structure."
        }
      ],
      "revisionNotes": [
        "for-each is safe and clean, but cannot modify primitive array elements in place.",
        "do-while executes at least once before checking the condition.",
        "Labeled break allows breaking out of multiple nested loops simultaneously."
      ]
    },
    {
      "id": "java-10-arrays",
      "moduleId": "java-m1",
      "moduleNumber": 1,
      "moduleTitle": "Java Fundamentals",
      "topicNumber": 10,
      "title": "Arrays, Multidimensional Arrays & Arrays Utility Class",
      "language": "java",
      "level": "Beginner",
      "whyItMatters": "Arrays are contiguous memory blocks that form the backbone of DSA. Understanding jagged arrays, shallow copying vs deep copying, and `java.util.Arrays` utility methods is critical for algorithmic coding.",
      "explanation": "In Java, arrays are dynamically allocated objects on the heap. Even primitive arrays (e.g. `int[]`) inherit from `java.lang.Object`. Key characteristics:\n1. Fixed Length: Once instantiated with `new int[size]`, an array cannot grow or shrink. Its size is stored in the public final field `length`.\n2. Default Values: Numeric elements default to 0, booleans to false, and object references to null.\n3. Multidimensional & Jagged Arrays: Java does not have true multi-dimensional matrices. Instead, multidimensional arrays are \"arrays of arrays\". Rows can have varying lengths (jagged arrays).\n4. `java.util.Arrays` Utility Class:\n   - `Arrays.sort(arr)`: Dual-pivot quicksort for primitives; TimSort for objects.\n   - `Arrays.binarySearch(arr, key)`: Fast $O(\\log n)$ search on sorted arrays.\n   - `Arrays.copyOf(arr, newLen)` / `System.arraycopy()`: Fast native memory copying.\n   - `Arrays.equals()` vs `Arrays.deepEquals()`: Structural content comparison.",
      "syntaxAndStructure": "// Declaration & Allocation\nint[] arr = new int[5];\nint[] initialized = { 1, 2, 3, 4, 5 };\n\n// 2D Jagged Array (varying row lengths)\nint[][] jagged = new int[3][];\njagged[0] = new int[2];\njagged[1] = new int[4];\njagged[2] = new int[3];\n\n// Utilities\nArrays.sort(arr);\nint idx = Arrays.binarySearch(arr, target);\nint[] copy = Arrays.copyOf(arr, arr.length);",
      "codeExamples": [
        {
          "title": "Working with Arrays Utility Methods and Sorting",
          "code": "import java.util.Arrays;\n\npublic class ArraysUtilityDemo {\n    public static void main(String[] args) {\n        int[] data = { 45, 12, 85, 32, 89, 39, 69, 44, 42, 1 };\n\n        // In-place sorting using Dual-Pivot Quicksort\n        Arrays.sort(data);\n        System.out.println(\"Sorted Array: \" + Arrays.toString(data));\n\n        // Binary search on sorted array\n        int target = 42;\n        int index = Arrays.binarySearch(data, target);\n        System.out.println(\"Index of \" + target + \": \" + index);\n\n        // Array filling\n        int[] filled = new int[5];\n        Arrays.fill(filled, 7);\n        System.out.println(\"Filled Array: \" + Arrays.toString(filled));\n    }\n}",
          "expectedOutput": "Sorted Array: [1, 12, 32, 39, 42, 44, 45, 69, 85, 89]\nIndex of 42: 4\nFilled Array: [7, 7, 7, 7, 7]",
          "explanation": "Arrays.sort() sorts in O(N log N) time. Arrays.binarySearch() requires the array to be sorted beforehand or the returned index is undefined."
        },
        {
          "title": "Creating and Traversing a Jagged Array",
          "code": "import java.util.Arrays;\n\npublic class JaggedArrayDemo {\n    public static void main(String[] args) {\n        // Jagged array: array of arrays where each row has different size\n        int[][] triangle = new int[3][];\n        triangle[0] = new int[]{ 1 };\n        triangle[1] = new int[]{ 2, 3 };\n        triangle[2] = new int[]{ 4, 5, 6 };\n\n        System.out.println(\"Row 0 length: \" + triangle[0].length);\n        System.out.println(\"Row 1 length: \" + triangle[1].length);\n        System.out.println(\"Row 2 length: \" + triangle[2].length);\n\n        // Deep string representation\n        System.out.println(\"Deep representation: \" + Arrays.deepToString(triangle));\n    }\n}",
          "expectedOutput": "Row 0 length: 1\nRow 1 length: 2\nRow 2 length: 3\nDeep representation: [[1], [2, 3], [4, 5, 6]]",
          "explanation": "In Java, multi-dimensional arrays are arrays of array references, allowing each inner row to be independently allocated with unique lengths."
        }
      ],
      "realWorldApplications": [
        "Representing adjacency lists in sparse graph algorithms using jagged arrays.",
        "High-performance audio sample buffers, financial tick data, and image raster matrices."
      ],
      "commonMistakes": [
        "Calling `arr.length()` with parentheses; `length` is an immutable field on arrays, unlike `String.length()` which is a method.",
        "Printing an array with `System.out.println(arr)` which prints the object hashcode (e.g. `[I@15db9742`) instead of `Arrays.toString(arr)`.",
        "Attempting to resize a Java array after instantiation instead of creating a new array or using ArrayList."
      ],
      "interviewRelevance": "Essential fundamentals: \"Are arrays in Java allocated on the stack or heap?\", \"How do jagged arrays work in memory?\", and \"Difference between Arrays.equals and Arrays.deepEquals\".",
      "checkpoints": [
        {
          "id": "java-10-cp-1",
          "label": "Understand memory layout of 1D and jagged 2D arrays on the Heap"
        },
        {
          "id": "java-10-cp-2",
          "label": "Use Arrays.sort, Arrays.binarySearch, and Arrays.deepToString appropriately"
        },
        {
          "id": "java-10-arrays-cp-3",
          "label": "Perform array copying, multidimensional indexing, and sorting using Arrays utility methods."
        }
      ],
      "practiceExercises": [
        {
          "id": "java-10-ex-1",
          "title": "Find Minimum and Maximum Element",
          "difficulty": "Beginner",
          "type": "coding",
          "prompt": "Find the minimum and maximum element in an int[] in a single pass O(n) scan.",
          "solution": "public class MinMaxArray {\n    public static void main(String[] args) {\n        int[] nums = { 23, 5, 89, -4, 42, 100 };\n        int min = nums[0];\n        int max = nums[0];\n        for (int x : nums) {\n            if (x < min) min = x;\n            if (x > max) max = x;\n        }\n        System.out.println(\"Min: \" + min + \", Max: \" + max);\n    }\n}",
          "explanation": "Initializes min and max with the first element and tracks extremes in a single linear pass."
        },
        {
          "id": "java-10-ex-2",
          "title": "Rotate Array Right by K Steps",
          "difficulty": "Intermediate",
          "type": "coding",
          "prompt": "Rotate an array of n elements to the right by k steps in-place with O(1) extra space.",
          "solution": "public class RotateArray {\n    private static void reverse(int[] a, int start, int end) {\n        while (start < end) {\n            int tmp = a[start];\n            a[start++] = a[end];\n            a[end--] = tmp;\n        }\n    }\n    public static void rotate(int[] nums, int k) {\n        k = k % nums.length;\n        reverse(nums, 0, nums.length - 1);\n        reverse(nums, 0, k - 1);\n        reverse(nums, k, nums.length - 1);\n    }\n    public static void main(String[] args) {\n        int[] arr = { 1, 2, 3, 4, 5, 6, 7 };\n        rotate(arr, 3);\n        System.out.println(java.util.Arrays.toString(arr));\n    }\n}",
          "explanation": "Three-step reversal: reverse entire array, reverse first k, reverse remaining n-k elements."
        },
        {
          "id": "java-10-ex-3",
          "title": "Matrix Transpose In-Place",
          "difficulty": "Advanced",
          "type": "coding",
          "prompt": "Transpose an N x N square matrix in-place without allocating a second matrix.",
          "solution": "import java.util.Arrays;\n\npublic class InPlaceTranspose {\n    public static void transpose(int[][] matrix) {\n        int n = matrix.length;\n        for (int i = 0; i < n; i++) {\n            for (int j = i + 1; j < n; j++) {\n                int temp = matrix[i][j];\n                matrix[i][j] = matrix[j][i];\n                matrix[j][i] = temp;\n            }\n        }\n    }\n    public static void main(String[] args) {\n        int[][] mat = { {1, 2, 3}, {4, 5, 6}, {7, 8, 9} };\n        transpose(mat);\n        System.out.println(Arrays.deepToString(mat));\n    }\n}",
          "explanation": "Swapping elements across the main diagonal (j starts at i + 1) avoids re-swapping elements back to their original spots."
        }
      ],
      "quizQuestions": [
        {
          "id": "java-10-q1",
          "question": "Where are Java arrays stored in memory?",
          "options": [
            "Primitive arrays on the Stack, Object arrays on the Heap",
            "All arrays in Java are stored on the Heap",
            "In Metaspace memory",
            "Directly in CPU cache"
          ],
          "correctOptionIndex": 1,
          "explanation": "In Java, all arrays are full-fledged objects and are always dynamically allocated on the Heap."
        },
        {
          "id": "java-10-q2",
          "question": "Which method should be used to compare the content equality of two multidimensional (nested) arrays?",
          "options": [
            "Arrays.equals()",
            "Arrays.deepEquals()",
            "== operator",
            "arr1.equals(arr2)"
          ],
          "correctOptionIndex": 1,
          "explanation": "Arrays.deepEquals() recursively inspects nested array elements, whereas Arrays.equals() performs shallow comparison on inner array references."
        }
      ],
      "revisionNotes": [
        "All arrays in Java are heap-allocated objects; length is a final property, not a method.",
        "Multidimensional arrays are arrays of references, allowing jagged row sizes.",
        "Use Arrays.deepToString() and Arrays.deepEquals() for nested arrays."
      ]
    },
    {
      "id": "java-11-strings-immutability",
      "moduleId": "java-m1",
      "moduleNumber": 1,
      "moduleTitle": "Java Fundamentals",
      "topicNumber": 11,
      "title": "Strings, String Constant Pool & StringBuilder vs StringBuffer",
      "language": "java",
      "level": "Beginner",
      "whyItMatters": "Strings are used in every Java application and interview. String immutability, the String Constant Pool (SCP), interned strings, and when to use StringBuilder vs StringBuffer are tested in almost 100% of placement coding exams.",
      "explanation": "In Java, `String` objects are immutable sequences of characters (internally `byte[]` with coder flag in modern Java 9+ compact strings).\n1. Why Immutability? Security (network connections, database URLs, file paths cannot be tampered with), Thread Safety (read-only state can be shared without synchronization), and Caching (hashcode is cached on first calculation).\n2. String Constant Pool (SCP): A special memory region in the Heap. String literals (`String s = \"apple\"`) are stored in the SCP. If another literal `\"apple\"` is created, it reuses the same SCP instance. Objects created with `new String(\"apple\")` create a new object in the general heap, pointing to the pooled literal.\n3. `intern()`: Returns the canonical reference from the SCP.\n4. `StringBuilder` vs `StringBuffer`:\n   - `String`: Immutable; concatenation (`+`) in loops creates quadratic temporary objects ($O(n^2)$ time/memory).\n   - `StringBuilder`: Mutable character buffer; not synchronized; fastest for single-threaded mutation.\n   - `StringBuffer`: Mutable; thread-safe (methods are synchronized); slower due to locking overhead.",
      "syntaxAndStructure": "// String creation:\nString s1 = \"hello\";              // In String Constant Pool\nString s2 = \"hello\";              // Reuses pooled instance (s1 == s2 is true)\nString s3 = new String(\"hello\");  // New object in heap (s1 == s3 is false, s1.equals(s3) is true)\nString s4 = s3.intern();          // Retrieves pooled reference (s1 == s4 is true)\n\n// Fast mutation:\nStringBuilder sb = new StringBuilder();\nfor (int i = 0; i < 1000; i++) sb.append(i);\nString result = sb.toString();",
      "codeExamples": [
        {
          "title": "String Pool Reference Equality (==) vs Value Equality (.equals)",
          "code": "public class StringPoolDemo {\n    public static void main(String[] args) {\n        String s1 = \"Placement\";\n        String s2 = \"Placement\";\n        String s3 = new String(\"Placement\");\n        String s4 = s3.intern(); // Fetch reference from String Constant Pool\n\n        // Reference comparison (== checks memory addresses)\n        System.out.println(\"s1 == s2 (both in SCP): \" + (s1 == s2));\n        System.out.println(\"s1 == s3 (SCP vs Heap): \" + (s1 == s3));\n        System.out.println(\"s1 == s4 (s4 interned): \" + (s1 == s4));\n\n        // Value comparison (.equals checks character sequences)\n        System.out.println(\"s1.equals(s3) value equality: \" + s1.equals(s3));\n    }\n}",
          "expectedOutput": "s1 == s2 (both in SCP): true\ns1 == s3 (SCP vs Heap): false\ns1 == s4 (s4 interned): true\ns1.equals(s3) value equality: true",
          "explanation": "Literals s1 and s2 reference the same cached memory object in the String Constant Pool. s3 is explicitly allocated in general heap memory. intern() returns the pool reference."
        },
        {
          "title": "StringBuilder vs Repeated String Concatenation",
          "code": "public class StringBuilderDemo {\n    public static void main(String[] args) {\n        // StringBuilder accumulates characters in a dynamic resizable buffer\n        StringBuilder sb = new StringBuilder();\n        sb.append(\"Java\").append(\" \").append(\"Placement\").append(\" \").append(2026);\n        \n        // In-place modifications\n        sb.insert(4, \" 17/21\");\n        sb.reverse();\n        \n        System.out.println(\"Transformed String: \" + sb.toString());\n        \n        // Re-reverse back to normal\n        sb.reverse();\n        System.out.println(\"Restored String: \" + sb.toString());\n    }\n}",
          "expectedOutput": "Transformed String: 6202 tnemecalP 12/71 avaJ\nRestored String: Java 17/21 Placement 2026",
          "explanation": "StringBuilder allows in-place insertions, reversals, and appends without reallocating intermediate immutable String objects."
        }
      ],
      "realWorldApplications": [
        "Building dynamic SQL queries and JSON payloads safely using StringBuilder.",
        "Leveraging string immutability for thread-safe Map keys and caching HashCode computations."
      ],
      "commonMistakes": [
        "Using `==` to compare Strings instead of `.equals()`; `==` checks reference identity, causing subtle bugs when strings come from user input or database queries.",
        "Performing repeated string concatenation (`s += item`) inside a loop of size 10,000+, resulting in $O(n^2)$ memory churn and GC pauses.",
        "Using string concatenation (+) inside large loops, generating excessive temporary String garbage on the heap."
      ],
      "interviewRelevance": "Universally asked in interviews: \"Why is String immutable in Java?\", \"Explain String Constant Pool\", and \"When would you choose StringBuffer over StringBuilder?\"",
      "checkpoints": [
        {
          "id": "java-11-cp-1",
          "label": "Distinguish String literal allocation in SCP vs new String() in Heap"
        },
        {
          "id": "java-11-cp-2",
          "label": "Understand the three differences between String, StringBuilder, and StringBuffer"
        },
        {
          "id": "java-11-strings-immutability-cp-3",
          "label": "Leverage StringBuilder and the String Constant Pool for optimal performance."
        }
      ],
      "practiceExercises": [
        {
          "id": "java-11-ex-1",
          "title": "Check Palindrome with Two Pointers",
          "difficulty": "Beginner",
          "type": "coding",
          "prompt": "Implement isPalindrome(String s) using two pointers ignoring case and non-alphanumerics in O(n) time.",
          "solution": "public class PalindromeCheck {\n    public static boolean isPalindrome(String s) {\n        int l = 0, r = s.length() - 1;\n        while (l < r) {\n            while (l < r && !Character.isLetterOrDigit(s.charAt(l))) l++;\n            while (l < r && !Character.isLetterOrDigit(s.charAt(r))) r--;\n            if (Character.toLowerCase(s.charAt(l)) != Character.toLowerCase(s.charAt(r))) {\n                return false;\n            }\n            l++;\n            r--;\n        }\n        return true;\n    }\n    public static void main(String[] args) {\n        System.out.println(isPalindrome(\"A man, a plan, a canal: Panama\"));\n    }\n}",
          "explanation": "Two-pointer inward traversal skips punctuation and compares characters in O(n) time without allocating extra strings."
        },
        {
          "id": "java-11-ex-2",
          "title": "String Compression Algorithm",
          "difficulty": "Intermediate",
          "type": "coding",
          "prompt": "Compress a string using counts of repeated characters (e.g. \"aabcccccaaa\" -> \"a2b1c5a3\"). If compressed string is not smaller, return original.",
          "solution": "public class StringCompression {\n    public static String compress(String s) {\n        if (s == null || s.length() <= 2) return s;\n        StringBuilder sb = new StringBuilder();\n        int count = 1;\n        for (int i = 0; i < s.length(); i++) {\n            if (i + 1 < s.length() && s.charAt(i) == s.charAt(i + 1)) {\n                count++;\n            } else {\n                sb.append(s.charAt(i)).append(count);\n                count = 1;\n            }\n        }\n        return sb.length() < s.length() ? sb.toString() : s;\n    }\n    public static void main(String[] args) {\n        System.out.println(compress(\"aabcccccaaa\"));\n    }\n}",
          "explanation": "Uses StringBuilder to assemble the compressed run-length encoding in linear time."
        },
        {
          "id": "java-11-ex-3",
          "title": "Verify Anagrams with Frequency Array",
          "difficulty": "Advanced",
          "type": "coding",
          "prompt": "Determine whether two lowercase English strings s and t are anagrams using an O(1) auxiliary space array.",
          "solution": "public class AnagramCheck {\n    public static boolean isAnagram(String s, String t) {\n        if (s.length() != t.length()) return false;\n        int[] freq = new int[26];\n        for (int i = 0; i < s.length(); i++) {\n            freq[s.charAt(i) - 'a']++;\n            freq[t.charAt(i) - 'a']--;\n        }\n        for (int c : freq) {\n            if (c != 0) return false;\n        }\n        return true;\n    }\n    public static void main(String[] args) {\n        System.out.println(isAnagram(\"anagram\", \"nagaram\"));\n    }\n}",
          "explanation": "A 26-element integer frequency table increments for s and decrements for t; any non-zero count disproves anagram status."
        }
      ],
      "quizQuestions": [
        {
          "id": "java-11-q1",
          "question": "Why does String in Java cache its hashCode() calculation?",
          "options": [
            "Because Strings are stored in the JVM Metaspace",
            "Because Strings are immutable, guaranteeing the hash will never change after first computation",
            "Because all Strings inherit from StringBuilder",
            "Because Java requires all objects to cache their hash"
          ],
          "correctOptionIndex": 1,
          "explanation": "Immutability guarantees that the character content never mutates, allowing the hashCode value to be safely cached for fast HashMap lookups."
        },
        {
          "id": "java-11-q2",
          "question": "What is the primary difference between StringBuilder and StringBuffer?",
          "options": [
            "StringBuilder is immutable while StringBuffer is mutable",
            "StringBuffer is thread-safe (synchronized), whereas StringBuilder is non-synchronized and faster",
            "StringBuilder stores characters as UTF-32",
            "StringBuffer cannot be converted to String"
          ],
          "correctOptionIndex": 1,
          "explanation": "StringBuffer synchronizes all public methods for multi-threaded safety, making it slower than the unsynchronized StringBuilder."
        }
      ],
      "revisionNotes": [
        "String is immutable and pooled in the String Constant Pool (SCP).",
        "Always use .equals() to check string equality, never ==.",
        "StringBuilder is fast and mutable for single-threaded usage; StringBuffer is synchronized and thread-safe."
      ]
    }
  ],
  "moduleAssessment": {
    "id": "java-m1-assessment",
    "title": "Module 1 Assessment: Java Fundamentals",
    "passingScorePercentage": 80,
    "questions": [
      {
        "id": "java-01-q1",
        "question": "Which component of the JVM converts bytecode into native machine instructions at runtime for frequently executed code?",
        "options": [
          "javac compiler",
          "ClassLoader",
          "Just-In-Time (JIT) Compiler",
          "Garbage Collector"
        ],
        "correctOptionIndex": 2,
        "explanation": "The JIT compiler profiles running bytecode and compiles \"hot spots\" into native machine instructions for direct hardware execution."
      },
      {
        "id": "java-01-q2",
        "question": "Where are objects created via the new keyword allocated in the JVM?",
        "options": [
          "In the Thread Stack",
          "In the Heap Memory",
          "In the Program Counter (PC) Register",
          "In the Native Method Stack"
        ],
        "correctOptionIndex": 1,
        "explanation": "All objects in Java are dynamically allocated on the Heap. The reference variable pointing to the object resides on the stack or in another object."
      },
      {
        "id": "java-02-q1",
        "question": "Which of the following contains the javac compiler?",
        "options": [
          "JVM only",
          "JRE only",
          "JDK only",
          "Both JRE and JVM"
        ],
        "correctOptionIndex": 2,
        "explanation": "javac is a developer tool and is exclusively part of the JDK. The JRE and JVM only execute compiled bytecode."
      },
      {
        "id": "java-02-q2",
        "question": "What is the correct mathematical containment relationship among the three Java platform components?",
        "options": [
          "JVM ⊃ JRE ⊃ JDK",
          "JDK ⊃ JRE ⊃ JVM",
          "JRE ⊃ JDK ⊃ JVM",
          "JDK ⊃ JVM ⊃ JRE"
        ],
        "correctOptionIndex": 1,
        "explanation": "JDK contains JRE plus development tools. JRE contains JVM plus core class libraries."
      },
      {
        "id": "java-03-q1",
        "question": "Which component performs bytecode verification to prevent illegal memory access and stack overflow before execution?",
        "options": [
          "javac compiler",
          "Bytecode Verifier in JVM ClassLoader linking phase",
          "Garbage Collector",
          "JIT Profiler"
        ],
        "correctOptionIndex": 1,
        "explanation": "The Bytecode Verifier checks that bytecode adheres to JVM constraints (no stack underflow/overflow, type safety, valid register access) during the Linking phase."
      },
      {
        "id": "java-03-q2",
        "question": "What does String.class.getClassLoader() return in standard Java?",
        "options": [
          "AppClassLoader",
          "PlatformClassLoader",
          "null (Bootstrap ClassLoader)",
          "ExtensionClassLoader"
        ],
        "correctOptionIndex": 2,
        "explanation": "Core Java classes loaded by the primordial Bootstrap ClassLoader return null in Java reflection APIs."
      },
      {
        "id": "java-04-q1",
        "question": "What is the size and sign of the char data type in Java?",
        "options": [
          "8 bits, signed",
          "16 bits, unsigned",
          "16 bits, signed",
          "32 bits, unsigned"
        ],
        "correctOptionIndex": 1,
        "explanation": "char in Java is 16 bits and unsigned (0 to 65,535) because Java was designed to support Unicode (UTF-16)."
      },
      {
        "id": "java-04-q2",
        "question": "What is the result of evaluating (byte)(127 + 1) in Java?",
        "options": [
          "128",
          "-128",
          "Compile Error",
          "0"
        ],
        "correctOptionIndex": 1,
        "explanation": "127 in binary is 01111111. Adding 1 gives 10000000, which is -128 in two's complement 8-bit signed representation."
      },
      {
        "id": "java-05-q1",
        "question": "Which of the following assignments will cause a compile-time error without an explicit cast?",
        "options": [
          "long l = 100;",
          "double d = 3.14f;",
          "int i = 10.5;",
          "float f = 25;"
        ],
        "correctOptionIndex": 2,
        "explanation": "10.5 is a double literal. Assigning a double to an int is a narrowing conversion requiring an explicit cast `(int) 10.5`."
      },
      {
        "id": "java-05-q2",
        "question": "What is the type of the expression (short1 + short2) in Java?",
        "options": [
          "short",
          "int",
          "long",
          "byte"
        ],
        "correctOptionIndex": 1,
        "explanation": "Binary arithmetic operators promote byte and short operands to 32-bit int before applying the operation."
      },
      {
        "id": "java-06-q1",
        "question": "What is the output of: int x = 1; if (x > 0 || (10 / 0 == 0)) System.out.println(\"Pass\");",
        "options": [
          "ArithmeticException: / by zero",
          "Pass",
          "Compile Error",
          "No output"
        ],
        "correctOptionIndex": 1,
        "explanation": "Because `x > 0` is true, the `||` short-circuits and never evaluates `10 / 0`, avoiding any ArithmeticException."
      },
      {
        "id": "java-06-q2",
        "question": "What does the operator `>>>` do in Java?",
        "options": [
          "Right shift signed (retains sign bit)",
          "Right shift unsigned (fills high-order bits with 0)",
          "Left shift unsigned (fills low-order bits with 1)",
          "Rotates bits circularly"
        ],
        "correctOptionIndex": 1,
        "explanation": "`>>>` is the unsigned (logical) right shift operator. It shifts bits to the right and unconditionally inserts 0 into the most significant bits."
      },
      {
        "id": "java-07-q1",
        "question": "Why is BufferedReader significantly faster than Scanner for reading large volumes of input?",
        "options": [
          "BufferedReader compiles directly into C code",
          "BufferedReader uses a large 8KB internal buffer and does not parse inputs with regular expressions",
          "Scanner does not support multi-threading",
          "BufferedReader ignores Unicode characters"
        ],
        "correctOptionIndex": 1,
        "explanation": "Scanner uses regular expression matching and smaller buffers, whereas BufferedReader reads character blocks into an 8KB buffer without regex overhead."
      },
      {
        "id": "java-07-q2",
        "question": "What is the purpose of %n in String.format() or System.out.printf()?",
        "options": [
          "Inserts a null character",
          "Generates a platform-independent line separator (\\n on Unix, \\r\\n on Windows)",
          "Prints numbers in scientific notation",
          "Forces a memory flush"
        ],
        "correctOptionIndex": 1,
        "explanation": "%n always outputs the line separator specific to the host operating system."
      },
      {
        "id": "java-08-q1",
        "question": "Which keyword is used in Java 14+ switch expressions to produce a value from a multi-line block?",
        "options": [
          "return",
          "yield",
          "break",
          "emit"
        ],
        "correctOptionIndex": 1,
        "explanation": "`yield` returns a value from a block within a switch expression, while `return` exits the entire enclosing method."
      },
      {
        "id": "java-08-q2",
        "question": "What is true regarding the arrow syntax (case X -> ...) in modern Java switch?",
        "options": [
          "It requires break after every case",
          "It automatically falls through to subsequent cases",
          "Only the code to the right of the arrow is executed, preventing fall-through",
          "It only works with numbers"
        ],
        "correctOptionIndex": 2,
        "explanation": "Arrow case syntax completely eliminates unintentional fall-through behavior, executing solely the targeted branch."
      },
      {
        "id": "java-09-q1",
        "question": "Which loop statement is guaranteed to execute its body at least once?",
        "options": [
          "for loop",
          "while loop",
          "do-while loop",
          "enhanced for-each loop"
        ],
        "correctOptionIndex": 2,
        "explanation": "do-while checks its boolean termination condition at the end of the iteration, guaranteeing at least one execution."
      },
      {
        "id": "java-09-q2",
        "question": "What happens when a labeled break statement executes inside a nested loop?",
        "options": [
          "It terminates only the innermost loop",
          "It terminates the specific loop denoted by the label",
          "It throws a compile error because labels are deprecated",
          "It re-executes the outer loop from beginning"
        ],
        "correctOptionIndex": 1,
        "explanation": "Labeled break transfers control directly to the statement immediately following the labeled enclosing loop structure."
      },
      {
        "id": "java-10-q1",
        "question": "Where are Java arrays stored in memory?",
        "options": [
          "Primitive arrays on the Stack, Object arrays on the Heap",
          "All arrays in Java are stored on the Heap",
          "In Metaspace memory",
          "Directly in CPU cache"
        ],
        "correctOptionIndex": 1,
        "explanation": "In Java, all arrays are full-fledged objects and are always dynamically allocated on the Heap."
      },
      {
        "id": "java-10-q2",
        "question": "Which method should be used to compare the content equality of two multidimensional (nested) arrays?",
        "options": [
          "Arrays.equals()",
          "Arrays.deepEquals()",
          "== operator",
          "arr1.equals(arr2)"
        ],
        "correctOptionIndex": 1,
        "explanation": "Arrays.deepEquals() recursively inspects nested array elements, whereas Arrays.equals() performs shallow comparison on inner array references."
      },
      {
        "id": "java-11-q1",
        "question": "Why does String in Java cache its hashCode() calculation?",
        "options": [
          "Because Strings are stored in the JVM Metaspace",
          "Because Strings are immutable, guaranteeing the hash will never change after first computation",
          "Because all Strings inherit from StringBuilder",
          "Because Java requires all objects to cache their hash"
        ],
        "correctOptionIndex": 1,
        "explanation": "Immutability guarantees that the character content never mutates, allowing the hashCode value to be safely cached for fast HashMap lookups."
      },
      {
        "id": "java-11-q2",
        "question": "What is the primary difference between StringBuilder and StringBuffer?",
        "options": [
          "StringBuilder is immutable while StringBuffer is mutable",
          "StringBuffer is thread-safe (synchronized), whereas StringBuilder is non-synchronized and faster",
          "StringBuilder stores characters as UTF-32",
          "StringBuffer cannot be converted to String"
        ],
        "correctOptionIndex": 1,
        "explanation": "StringBuffer synchronizes all public methods for multi-threaded safety, making it slower than the unsynchronized StringBuilder."
      }
    ]
  },
  "revisionQuestions": [
    "Explain the JVM architecture including the ClassLoader subsystem, runtime memory areas, and the execution engine.",
    "Differentiate between JDK, JRE, and JVM with their component containment hierarchy.",
    "Why is String immutable in Java and how does the String Constant Pool optimize memory?",
    "What happens during integer overflow in Java two's complement arithmetic?",
    "Explain the difference between signed right shift (>>) and unsigned right shift (>>>)."
  ]
};
