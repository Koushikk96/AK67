import { MasteryTopic, MasteryModule } from '@/types/mastery';

export const module7Topics: MasteryTopic[] = [
  {
    "id": "java-87-file-nio",
    "topicNumber": 87,
    "title": "File Handling & Modern NIO.2 (Path, Files & try-with-resources)",
    "level": "Intermediate",
    "whyItMatters": "I/O is often the slowest component in enterprise applications. Java 7's NIO.2 (java.nio.file) replaced legacy java.io.File, providing non-blocking capabilities, atomic operations, symbolic link resolution, and memory-mapped buffers.",
    "explanation": "1. Legacy I/O (java.io) vs NIO.2 (java.nio.file):\n- java.io.File had major flaws: no bulk copy/move methods, poor error handling (methods returned false instead of throwing descriptive IOException), and lacked support for file permissions or symbolic links.\n- NIO.2 introduced Path and Files utility classes: thread-safe, robust, and platform-independent.\n\n2. Key NIO.2 Classes:\n- Path: Immutable representation of a file or directory path in the filesystem. Obtained via Path.of(\"path/to/file\") or Paths.get().\n- Files: Static utility providing atomic file copying (Files.copy), moving, deleting, attribute inspection, and stream-based reading (Files.lines, Files.readAllLines).\n- StandardOpenOption: Specifies how files are opened (CREATE, APPEND, TRUNCATE_EXISTING, READ, WRITE).\n\n3. try-with-resources Guarantee:\nAny resource implementing java.lang.AutoCloseable is guaranteed to be closed at the end of the block, even if an exception or return occurs. Suppressed exceptions are retained via Throwable.getSuppressed().",
    "syntaxAndStructure": "// Reading file lines lazily with try-with-resources and NIO.2:\ntry (Stream<String> lines = Files.lines(Path.of(\"data.txt\"))) {\n    lines.filter(s -> !s.isEmpty()).forEach(System.out::println);\n}",
    "codeExamples": [
      {
        "title": "Safe File Reading & Writing using NIO.2 and try-with-resources",
        "code": "import java.io.IOException;\nimport java.nio.file.*;\nimport java.util.List;\n\npublic class NioDemo {\n    public static void main(String[] args) {\n        Path tempFile = Path.of(\"test_nio.txt\");\n\n        try {\n            // Write lines to file\n            List<String> content = List.of(\"Java 17 LTS\", \"Modern NIO.2\", \"High Throughput I/O\");\n            Files.write(tempFile, content, StandardOpenOption.CREATE, StandardOpenOption.WRITE);\n            System.out.println(\"File written successfully: \" + Files.exists(tempFile));\n\n            // Read lines lazily\n            try (var lines = Files.lines(tempFile)) {\n                lines.forEach(line -> System.out.println(\"Line: \" + line));\n            }\n\n            // Cleanup\n            Files.deleteIfExists(tempFile);\n            System.out.println(\"File deleted: \" + !Files.exists(tempFile));\n        } catch (IOException e) {\n            e.printStackTrace();\n        }\n    }\n}",
        "expectedOutput": "File written successfully: true\nLine: Java 17 LTS\nLine: Modern NIO.2\nLine: High Throughput I/O\nFile deleted: true",
        "explanation": "Files.write and Files.lines operate directly on Path objects. The try-with-resources statement ensures the underlying file channel is safely closed, preventing OS file handle leaks."
      },
      {
        "title": "Recursive Directory Traversal with Files.walk()",
        "code": "import java.io.IOException;\nimport java.nio.file.*;\nimport java.util.stream.Stream;\n\npublic class DirectoryWalkDemo {\n    public static void printJavaFiles(Path dir) throws IOException {\n        try (Stream<Path> stream = Files.walk(dir, 2)) { // max depth 2\n            stream.filter(Files::isRegularFile)\n                  .filter(p -> p.toString().endsWith(\".java\"))\n                  .forEach(p -> System.out.println(\"Found: \" + p.getFileName()));\n        }\n    }\n\n    public static void main(String[] args) {\n        System.out.println(\"Directory walk stream closes safely after traversal.\");\n    }\n}",
        "expectedOutput": "Directory walk stream closes safely after traversal.",
        "explanation": "Files.walk() lazily traverses the filesystem tree. Wrapping it in try-with-resources is essential because DirectoryStream holds an open native OS directory descriptor."
      }
    ],
    "realWorldApplications": [
      "ETL data pipelines streaming gigabyte-sized CSV/JSON logs into databases without blowing up JVM heap.",
      "Configuration managers watching for live reload events on disk using java.nio.file.WatchService."
    ],
    "commonMistakes": [
      "Using Files.readAllLines() on multi-gigabyte files, loading the entire file into memory as String objects and causing java.lang.OutOfMemoryError: Java heap space. Use Files.lines() for streaming.",
      "Forgetting to close Files.lines() or Files.walk() streams inside try-with-resources, exhausting operating system file descriptors.",
      "Using hardcoded string separators like \"\\\" or \"/\" instead of File.separator or Path.of(), causing cross-platform failures on Linux/Windows."
    ],
    "interviewRelevance": "Enterprise backend interviews frequently quiz candidates on I/O vs NIO, handling OutOfMemoryError during file parsing, and try-with-resources suppressed exceptions.",
    "checkpoints": [
      {
        "id": "java-87-cp1",
        "label": "Use Path and Files instead of legacy java.io.File"
      },
      {
        "id": "java-87-cp2",
        "label": "Stream large files using Files.lines() within try-with-resources"
      },
      {
        "id": "java-87-cp3",
        "label": "Apply StandardOpenOption flags for atomic file writes and appends"
      }
    ],
    "practiceExercises": [
      {
        "id": "java-87-ex1",
        "title": "Check File Existence and Attributes",
        "difficulty": "Beginner",
        "type": "coding",
        "prompt": "Write a method that accepts a String filePath, checks if it exists, is a regular file, and is readable, returning true only if all conditions are met.",
        "starterCode": "import java.nio.file.*;\n\npublic class FileChecker {\n    public static boolean isUsableFile(String filePath) {\n        return false;\n    }\n}",
        "solution": "import java.nio.file.*;\n\npublic class FileChecker {\n    public static boolean isUsableFile(String filePath) {\n        Path path = Path.of(filePath);\n        return Files.exists(path) && Files.isRegularFile(path) && Files.isReadable(path);\n    }\n}",
        "explanation": "Files.exists(), Files.isRegularFile(), and Files.isReadable() inspect filesystem attributes without throwing exceptions for missing files."
      },
      {
        "id": "java-87-ex2",
        "title": "Count Word Frequency from File Stream",
        "difficulty": "Intermediate",
        "type": "coding",
        "prompt": "Given a Path to a text file, count the total occurrences of a target word (case-insensitive) using Files.lines() and Streams.",
        "starterCode": "import java.io.IOException;\nimport java.nio.file.*;\n\npublic class WordCounter {\n    public static long countWord(Path path, String target) throws IOException {\n        return 0;\n    }\n}",
        "solution": "import java.io.IOException;\nimport java.nio.file.*;\nimport java.util.Arrays;\n\npublic class WordCounter {\n    public static long countWord(Path path, String target) throws IOException {\n        String lowerTarget = target.toLowerCase();\n        try (var lines = Files.lines(path)) {\n            return lines.flatMap(line -> Arrays.stream(line.split(\"\\\\s+\")))\n                        .filter(word -> word.equalsIgnoreCase(lowerTarget))\n                        .count();\n        }\n    }\n}",
        "explanation": "Files.lines() streams file lines lazily. flatMap splits each line into words without loading the entire file into memory at once."
      },
      {
        "id": "java-87-ex3",
        "title": "Safe Atomic File Replacement",
        "difficulty": "Advanced",
        "type": "coding",
        "prompt": "Implement a method that writes data to a temporary file in the same directory, then atomically moves it to overwrite targetPath using StandardCopyOption.ATOMIC_MOVE.",
        "starterCode": "import java.io.IOException;\nimport java.nio.file.*;\nimport java.util.List;\n\npublic class SafeFileWriter {\n    public static void atomicWrite(Path targetPath, List<String> lines) throws IOException {\n        // Implement atomic write\n    }\n}",
        "solution": "import java.io.IOException;\nimport java.nio.file.*;\nimport java.util.List;\n\npublic class SafeFileWriter {\n    public static void atomicWrite(Path targetPath, List<String> lines) throws IOException {\n        Path parent = targetPath.getParent();\n        if (parent == null) parent = Path.of(\".\");\n\n        Path tempFile = Files.createTempFile(parent, \"atomic_\", \".tmp\");\n        try {\n            Files.write(tempFile, lines, StandardOpenOption.WRITE);\n            Files.move(tempFile, targetPath, StandardCopyOption.ATOMIC_MOVE, StandardCopyOption.REPLACE_EXISTING);\n        } catch (Exception e) {\n            Files.deleteIfExists(tempFile);\n            throw e;\n        }\n    }\n}",
        "explanation": "Writing to a temp file and performing an atomic rename (ATOMIC_MOVE) guarantees that concurrent readers never observe a partially written or corrupted file."
      }
    ],
    "quizQuestions": [
      {
        "id": "java-87-q1",
        "question": "Why should you avoid using `Files.readAllLines(path)` on large files in production services?",
        "options": [
          "Because it converts all characters into uppercase",
          "Because it loads all file lines into heap memory simultaneously as separate String instances, risking OutOfMemoryError",
          "Because it does not support UTF-8 encoding",
          "Because it locks the file indefinitely until JVM restarts"
        ],
        "correctOptionIndex": 1,
        "explanation": "readAllLines reads the entire file into memory at once. For multi-hundred megabyte or gigabyte files, this exhausts heap space. Files.lines() should be used instead."
      },
      {
        "id": "java-87-q2",
        "question": "What interface must an object implement to be eligible for use in a Java `try-with-resources` statement?",
        "options": [
          "java.io.Serializable",
          "java.lang.AutoCloseable",
          "java.lang.Cloneable",
          "java.util.concurrent.Callable"
        ],
        "correctOptionIndex": 1,
        "explanation": "try-with-resources requires the resource to implement java.lang.AutoCloseable (or its subinterface java.io.Closeable)."
      }
    ],
    "revisionNotes": [
      "Prefer `Path.of()` and `Files` over legacy `java.io.File`.",
      "Always wrap `Files.lines()` and `Files.walk()` in try-with-resources to release native file descriptors.",
      "Use `StandardCopyOption.ATOMIC_MOVE` to prevent corrupted reads during file writes."
    ],
    "moduleId": "java-m7",
    "moduleNumber": 7,
    "moduleTitle": "Practical Java",
    "language": "java"
  },
  {
    "id": "java-88-serialization-json",
    "topicNumber": 88,
    "title": "Serialization, transient & JSON Mapping Concepts",
    "level": "Intermediate",
    "whyItMatters": "Data must be converted to wire format for network transmission (REST APIs, Kafka events) or persistent caching (Redis). Understanding Java Native Serialization pitfalls, serialVersionUID, transient fields, and modern JSON mapping (Jackson/Gson) is fundamental.",
    "explanation": "1. Java Native Serialization:\n- Marker interface java.io.Serializable indicates a class can be serialized to a byte stream via ObjectOutputStream.\n- serialVersionUID: A unique 64-bit version identifier. If you change a class without declaring serialVersionUID, the JVM calculates a hash based on class structure; any class change causes InvalidClassException during deserialization.\n- transient keyword: Marks sensitive or non-serializable fields (passwords, thread references, database connections) to be skipped during serialization (deserialized to default value: null or 0).\n\n2. Security Risks of Java Native Serialization:\n- Deserialization vulnerabilities allow attackers to construct malicious byte streams that execute arbitrary code during readObject() (gadget chains).\n- Modern systems avoid Java Native Serialization, using JSON, Protocol Buffers, or Avro instead.\n\n3. Modern JSON Mapping (Jackson / Gson Concepts):\n- Object Mapper translates between Java POJOs/Records and JSON strings.\n- Jackson Annotations: @JsonProperty(\"field_name\"), @JsonIgnore (similar to transient), @JsonFormat.\n- Immutability with Records: Java Records integrate seamlessly with modern JSON parsers without boilerplate getters or constructors.",
    "syntaxAndStructure": "// Declaring serializable class with serialVersionUID and transient field:\npublic class UserSession implements Serializable {\n    private static final long serialVersionUID = 1L;\n    private String username;\n    private transient String passwordHash; // excluded\n}",
    "codeExamples": [
      {
        "title": "Java Serialization with transient and serialVersionUID",
        "code": "import java.io.*;\n\npublic class SerializationDemo {\n    static class Account implements Serializable {\n        private static final long serialVersionUID = 1L;\n        private String accountNumber;\n        private transient String pin; // Will NOT be serialized\n\n        public Account(String accountNumber, String pin) {\n            this.accountNumber = accountNumber;\n            this.pin = pin;\n        }\n\n        @Override\n        public String toString() {\n            return \"Account[num=\" + accountNumber + \", pin=\" + pin + \"]\";\n        }\n    }\n\n    public static void main(String[] args) throws Exception {\n        Account acc = new Account(\"ACC-98765\", \"1234\");\n        byte[] serializedData;\n\n        // Serialize\n        try (ByteArrayOutputStream baos = new ByteArrayOutputStream();\n             ObjectOutputStream oos = new ObjectOutputStream(baos)) {\n            oos.writeObject(acc);\n            serializedData = baos.toByteArray();\n        }\n\n        // Deserialize\n        try (ByteArrayInputStream bais = new ByteArrayInputStream(serializedData);\n             ObjectInputStream ois = new ObjectInputStream(bais)) {\n            Account restored = (Account) ois.readObject();\n            System.out.println(\"Restored: \" + restored);\n        }\n    }\n}",
        "expectedOutput": "Restored: Account[num=ACC-98765, pin=null]",
        "explanation": "Because the pin field is marked transient, it was skipped during serialization and initialized to its default value (null) upon deserialization."
      },
      {
        "title": "JSON Modeling with Java Records",
        "code": "public class JsonModelDemo {\n    // Java Record acts as an immutable DTO for JSON serialization\n    public record UserProfileDto(\n        long id,\n        String email,\n        boolean active\n    ) {\n        // Compact validation constructor\n        public UserProfileDto {\n            if (email == null || !email.contains(\"@\")) {\n                throw new IllegalArgumentException(\"Invalid email\");\n            }\n        }\n    }\n\n    public static void main(String[] args) {\n        UserProfileDto dto = new UserProfileDto(101L, \"dev@example.com\", true);\n        System.out.println(\"DTO created: \" + dto);\n        System.out.println(\"Email: \" + dto.email());\n    }\n}",
        "expectedOutput": "DTO created: UserProfileDto[id=101, email=dev@example.com, active=true]\nEmail: dev@example.com",
        "explanation": "Java Records provide immutable, concise Data Transfer Objects (DTOs) with automatic equals(), hashCode(), and toString(), ideal for JSON mapping libraries."
      }
    ],
    "realWorldApplications": [
      "Distributed session storage replicating user HTTP sessions across a clustered Tomcat/Spring server farm.",
      "REST API controllers converting incoming JSON request payloads into validated Java domain records."
    ],
    "commonMistakes": [
      "Not explicitly defining serialVersionUID: adding a single field or method causes deserialization failures on existing saved data.",
      "Serializing an object that contains references to non-serializable classes (e.g. Thread, Socket, Connection), throwing NotSerializableException.",
      "Using Java native serialization for public web APIs instead of secure, standardized JSON/Protobuf formats."
    ],
    "interviewRelevance": "Interviewers frequently ask about transient keyword behavior, serialVersionUID significance, and why industry has migrated from native serialization to JSON/Protobuf.",
    "checkpoints": [
      {
        "id": "java-88-cp1",
        "label": "Explain the role and calculation of serialVersionUID"
      },
      {
        "id": "java-88-cp2",
        "label": "Use transient to omit sensitive fields from serialization"
      },
      {
        "id": "java-88-cp3",
        "label": "Design clean immutable JSON DTOs using Java Records"
      }
    ],
    "practiceExercises": [
      {
        "id": "java-88-ex1",
        "title": "Define Secure Serializable Class",
        "difficulty": "Beginner",
        "type": "coding",
        "prompt": "Create a class UserCredential implementing Serializable, declaring serialVersionUID = 1L, with username serialized and rawPassword marked transient.",
        "starterCode": "import java.io.Serializable;\n\npublic class UserCredential {\n    // Implement class\n}",
        "solution": "import java.io.Serializable;\n\npublic class UserCredential implements Serializable {\n    private static final long serialVersionUID = 1L;\n    private final String username;\n    private final transient String rawPassword;\n\n    public UserCredential(String username, String rawPassword) {\n        this.username = username;\n        this.rawPassword = rawPassword;\n    }\n\n    public String getUsername() { return username; }\n    public String getRawPassword() { return rawPassword; }\n}",
        "explanation": "Marking rawPassword as transient ensures sensitive credentials are not leaked when the object is persisted or sent across network sockets."
      },
      {
        "id": "java-88-ex2",
        "title": "Deep Copy Object via Serialization",
        "difficulty": "Intermediate",
        "type": "coding",
        "prompt": "Implement a generic method deepCopy(T object) that clones any Serializable object using in-memory byte streams.",
        "starterCode": "import java.io.*;\n\npublic class Cloner {\n    public static <T extends Serializable> T deepCopy(T object) throws Exception {\n        return null;\n    }\n}",
        "solution": "import java.io.*;\n\npublic class Cloner {\n    @SuppressWarnings(\"unchecked\")\n    public static <T extends Serializable> T deepCopy(T object) throws Exception {\n        ByteArrayOutputStream baos = new ByteArrayOutputStream();\n        try (ObjectOutputStream oos = new ObjectOutputStream(baos)) {\n            oos.writeObject(object);\n        }\n\n        try (ByteArrayInputStream bais = new ByteArrayInputStream(baos.toByteArray());\n             ObjectInputStream ois = new ObjectInputStream(bais)) {\n            return (T) ois.readObject();\n        }\n    }\n}",
        "explanation": "Serializing to a ByteArrayOutputStream and deserializing produces an independent, deep copy of the entire object graph."
      },
      {
        "id": "java-88-ex3",
        "title": "Implement Custom Serialization readObject/writeObject",
        "difficulty": "Advanced",
        "type": "coding",
        "prompt": "Write a class EncryptedNote implementing Serializable that encrypts noteText (e.g. reverses it) during writeObject and restores it during readObject.",
        "starterCode": "import java.io.*;\n\npublic class EncryptedNote implements Serializable {\n    private static final long serialVersionUID = 1L;\n    private String text;\n\n    public EncryptedNote(String text) { this.text = text; }\n    public String getText() { return text; }\n    // Implement writeObject and readObject\n}",
        "solution": "import java.io.*;\n\npublic class EncryptedNote implements Serializable {\n    private static final long serialVersionUID = 1L;\n    private String text;\n\n    public EncryptedNote(String text) { this.text = text; }\n    public String getText() { return text; }\n\n    private void writeObject(ObjectOutputStream oos) throws IOException {\n        String reversed = new StringBuilder(text).reverse().toString();\n        oos.writeUTF(reversed);\n    }\n\n    private void readObject(ObjectInputStream ois) throws IOException, ClassNotFoundException {\n        String reversed = ois.readUTF();\n        this.text = new StringBuilder(reversed).reverse().toString();\n    }\n}",
        "explanation": "Declaring private writeObject and readObject allows custom hooks into the JVM serialization pipeline to encrypt, decrypt, or validate fields."
      }
    ],
    "quizQuestions": [
      {
        "id": "java-88-q1",
        "question": "What happens if a class does not declare `serialVersionUID` and is deserialized after adding a new field?",
        "options": [
          "The JVM ignores the new field and succeeds silently",
          "The JVM throws InvalidClassException because the automatically generated serialVersionUID hash changed",
          "The JVM recompiles the class at runtime",
          "The JVM zeroes out all existing object data"
        ],
        "correctOptionIndex": 1,
        "explanation": "If undeclared, the compiler auto-generates a serialVersionUID hash from all fields and methods. Any structural change alters the hash, triggering InvalidClassException."
      },
      {
        "id": "java-88-q2",
        "question": "What value does a `transient int` field take after deserialization?",
        "options": [
          "null",
          "0",
          "-1",
          "Its pre-serialization value"
        ],
        "correctOptionIndex": 1,
        "explanation": "transient fields are omitted from the byte stream. During deserialization, primitive types are initialized to their default values (0 for int, false for boolean, null for objects)."
      }
    ],
    "revisionNotes": [
      "Always declare an explicit `private static final long serialVersionUID = 1L;`.",
      "Mark sensitive and non-serializable fields with `transient`.",
      "Modern applications prefer JSON (Jackson/Gson) or Protobuf over native Java serialization."
    ],
    "moduleId": "java-m7",
    "moduleNumber": 7,
    "moduleTitle": "Practical Java",
    "language": "java"
  },
  {
    "id": "java-89-jdbc",
    "topicNumber": 89,
    "title": "JDBC & Database Connectivity (PreparedStatement & SQL Injection)",
    "level": "Intermediate",
    "whyItMatters": "All Java persistence layers (Hibernate, Spring Data JPA, MyBatis, jOOQ) build on JDBC (Java Database Connectivity). Understanding PreparedStatement parameterized queries prevents SQL injection — the #1 critical database security risk.",
    "explanation": "1. Core JDBC Architecture:\n- DriverManager: Factory that loads vendor database drivers (e.g., PostgreSQL, MySQL, H2) and establishes connections.\n- Connection: Represents a physical socket connection to the database server.\n- Statement vs PreparedStatement:\n  - Statement: Concatenates raw SQL strings. SQL is compiled and parsed on the database on every execution. HIGHLY VULNERABLE TO SQL INJECTION!\n  - PreparedStatement: Pre-compiles the SQL query template on the database engine. Dynamic parameters are bound using placeholders (?) with type-specific setters (setString, setInt). Immune to SQL injection and reused via query cache.\n- ResultSet: Cursor pointing to rows returned by an SQL query. Initially positioned before the first row; advance using rs.next().\n\n2. Why Statement Causes SQL Injection:\nConsider: String sql = \"SELECT * FROM users WHERE user='\" + name + \"' AND pass='\" + pass + \"'\";\nIf attacker enters: name = \"admin' --\"\nThe query executes: SELECT * FROM users WHERE user='admin' -- AND pass='...'\nThe rest of the query is commented out, granting full unauthorized access!\nPreparedStatement treats all parameters as raw data values, never as executable SQL code.",
    "syntaxAndStructure": "// Safe parameterized query with PreparedStatement:\nString sql = \"SELECT id, balance FROM accounts WHERE user_id = ? AND status = ?\";\ntry (PreparedStatement ps = conn.prepareStatement(sql)) {\n    ps.setLong(1, userId);\n    ps.setString(2, \"ACTIVE\");\n    try (ResultSet rs = ps.executeQuery()) {\n        while (rs.next()) {\n            long id = rs.getLong(\"id\");\n        }\n    }\n}",
    "codeExamples": [
      {
        "title": "Safe Query Execution with PreparedStatement and try-with-resources",
        "code": "import java.sql.*;\n\npublic class JdbcDemo {\n    public static void queryUser(Connection conn, int userId) {\n        String sql = \"SELECT id, name, email FROM users WHERE id = ?\";\n\n        // try-with-resources closes PreparedStatement and ResultSet automatically\n        try (PreparedStatement ps = conn.prepareStatement(sql)) {\n            ps.setInt(1, userId); // 1-indexed placeholder\n\n            try (ResultSet rs = ps.executeQuery()) {\n                if (rs.next()) {\n                    int id = rs.getInt(\"id\");\n                    String name = rs.getString(\"name\");\n                    String email = rs.getString(\"email\");\n                    System.out.printf(\"User [%d]: %s (%s)%n\", id, name, email);\n                } else {\n                    System.out.println(\"User not found.\");\n                }\n            }\n        } catch (SQLException e) {\n            System.err.println(\"Database error: \" + e.getMessage());\n        }\n    }\n\n    public static void main(String[] args) {\n        System.out.println(\"PreparedStatement compiles template and binds parameters safely.\");\n    }\n}",
        "expectedOutput": "PreparedStatement compiles template and binds parameters safely.",
        "explanation": "The SQL template is precompiled. The parameter is bound via ps.setInt(1, userId). Resources are closed in reverse order of opening."
      },
      {
        "title": "Batch Insert with PreparedStatement for High Throughput",
        "code": "import java.sql.*;\nimport java.util.List;\n\npublic class BatchInsertDemo {\n    record OrderRecord(int orderId, String item, double amount) {}\n\n    public static void insertBatch(Connection conn, List<OrderRecord> orders) throws SQLException {\n        String sql = \"INSERT INTO orders (id, item, amount) VALUES (?, ?, ?)\";\n\n        try (PreparedStatement ps = conn.prepareStatement(sql)) {\n            for (OrderRecord o : orders) {\n                ps.setInt(1, o.orderId());\n                ps.setString(2, o.item());\n                ps.setDouble(3, o.amount());\n                ps.addBatch(); // Queue insert\n            }\n            int[] results = ps.executeBatch(); // Single network roundtrip\n            System.out.println(\"Inserted orders: \" + results.length);\n        }\n    }\n\n    public static void main(String[] args) {\n        System.out.println(\"Batch execution sends hundreds of rows in a single DB roundtrip.\");\n    }\n}",
        "expectedOutput": "Batch execution sends hundreds of rows in a single DB roundtrip.",
        "explanation": "addBatch() and executeBatch() avoid individual network round-trips for each row, increasing insertion performance by orders of magnitude."
      }
    ],
    "realWorldApplications": [
      "Connection pool implementations like HikariCP maintaining reusable database connections for Spring Boot services.",
      "Auditing and financial reporting systems querying relational databases with strict transaction guarantees."
    ],
    "commonMistakes": [
      "Using string concatenation to build SQL statements, exposing the system to SQL injection vulnerabilities.",
      "Leaking database connections by not closing Connection objects, exhausting the database connection pool.",
      "Remembering that JDBC parameter indices are 1-indexed (ps.setString(1, val)), not 0-indexed!"
    ],
    "interviewRelevance": "Understanding PreparedStatement benefits, SQL injection mechanisms, connection pooling, and JDBC transaction demarcation is fundamental for enterprise backend roles.",
    "checkpoints": [
      {
        "id": "java-89-cp1",
        "label": "Explain why PreparedStatement prevents SQL injection"
      },
      {
        "id": "java-89-cp2",
        "label": "Correctly bind 1-indexed parameters using setInt, setString, setTimestamp"
      },
      {
        "id": "java-89-cp3",
        "label": "Execute high-throughput batch inserts using addBatch() and executeBatch()"
      }
    ],
    "practiceExercises": [
      {
        "id": "java-89-ex1",
        "title": "Safe Login Verification Query",
        "difficulty": "Beginner",
        "type": "coding",
        "prompt": "Write a method authenticate(Connection conn, String user, String passHash) that returns true if user exists with matching password using PreparedStatement.",
        "starterCode": "import java.sql.*;\n\npublic class Authenticator {\n    public static boolean authenticate(Connection conn, String user, String passHash) throws SQLException {\n        return false;\n    }\n}",
        "solution": "import java.sql.*;\n\npublic class Authenticator {\n    public static boolean authenticate(Connection conn, String user, String passHash) throws SQLException {\n        String sql = \"SELECT 1 FROM users WHERE username = ? AND password_hash = ?\";\n        try (PreparedStatement ps = conn.prepareStatement(sql)) {\n            ps.setString(1, user);\n            ps.setString(2, passHash);\n            try (ResultSet rs = ps.executeQuery()) {\n                return rs.next();\n            }\n        }\n    }\n}",
        "explanation": "PreparedStatement binds user and passHash as literals, neutralizing attempts to inject SQL operators or comments."
      },
      {
        "id": "java-89-ex2",
        "title": "Extract Generated Primary Keys",
        "difficulty": "Intermediate",
        "type": "coding",
        "prompt": "Insert a new customer record into customers (name, email) and retrieve the auto-generated primary key using Statement.RETURN_GENERATED_KEYS.",
        "starterCode": "import java.sql.*;\n\npublic class CustomerDao {\n    public static long insertCustomer(Connection conn, String name, String email) throws SQLException {\n        return -1;\n    }\n}",
        "solution": "import java.sql.*;\n\npublic class CustomerDao {\n    public static long insertCustomer(Connection conn, String name, String email) throws SQLException {\n        String sql = \"INSERT INTO customers (name, email) VALUES (?, ?)\";\n        try (PreparedStatement ps = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {\n            ps.setString(1, name);\n            ps.setString(2, email);\n            ps.executeUpdate();\n\n            try (ResultSet rs = ps.getGeneratedKeys()) {\n                if (rs.next()) {\n                    return rs.getLong(1);\n                }\n            }\n        }\n        throw new SQLException(\"Failed to retrieve generated ID.\");\n    }\n}",
        "explanation": "Passing Statement.RETURN_GENERATED_KEYS tells the database driver to return assigned auto-increment or sequence IDs via getGeneratedKeys()."
      },
      {
        "id": "java-89-ex3",
        "title": "Safe Pagination Query Builder",
        "difficulty": "Advanced",
        "type": "coding",
        "prompt": "Write a method that executes a paginated query on products table ordering by price ascending using LIMIT ? OFFSET ? placeholders.",
        "starterCode": "import java.sql.*;\nimport java.util.*;\n\npublic class ProductDao {\n    public static List<String> getPagedProducts(Connection conn, int pageSize, int pageIndex) throws SQLException {\n        return new ArrayList<>();\n    }\n}",
        "solution": "import java.sql.*;\nimport java.util.*;\n\npublic class ProductDao {\n    public static List<String> getPagedProducts(Connection conn, int pageSize, int pageIndex) throws SQLException {\n        List<String> names = new ArrayList<>();\n        String sql = \"SELECT name FROM products ORDER BY price ASC LIMIT ? OFFSET ?\";\n\n        try (PreparedStatement ps = conn.prepareStatement(sql)) {\n            ps.setInt(1, pageSize);\n            ps.setInt(2, pageIndex * pageSize);\n\n            try (ResultSet rs = ps.executeQuery()) {\n                while (rs.next()) {\n                    names.add(rs.getString(\"name\"));\n                }\n            }\n        }\n        return names;\n    }\n}",
        "explanation": "Binding pageSize and calculated offset via PreparedStatement guarantees clean pagination without risk of malformed queries."
      }
    ],
    "quizQuestions": [
      {
        "id": "java-89-q1",
        "question": "Why is `PreparedStatement` immune to SQL injection attacks?",
        "options": [
          "Because it encrypts the SQL string with AES-256",
          "Because the database compiles the SQL query structure first; parameter values are bound as literal data and can never alter the query's syntax tree",
          "Because it forces all database tables to be read-only",
          "Because it only works with stored procedures"
        ],
        "correctOptionIndex": 1,
        "explanation": "PreparedStatement separates code from data. The database compiles the SQL structure with placeholders, and values are injected strictly as data literals."
      },
      {
        "id": "java-89-q2",
        "question": "Are parameter placeholders (?) in JDBC PreparedStatement 0-indexed or 1-indexed?",
        "options": [
          "0-indexed",
          "1-indexed",
          "Dynamic based on database driver",
          "Alpha-indexed"
        ],
        "correctOptionIndex": 1,
        "explanation": "JDBC parameters are strictly 1-indexed: ps.setString(1, val) sets the first question mark placeholder."
      }
    ],
    "revisionNotes": [
      "Always use `PreparedStatement` instead of `Statement` to prevent SQL injection.",
      "Remember JDBC parameter indexes are 1-indexed, not 0-indexed.",
      "Use `addBatch()` and `executeBatch()` for inserting or updating multiple rows efficiently."
    ],
    "moduleId": "java-m7",
    "moduleNumber": 7,
    "moduleTitle": "Practical Java",
    "language": "java"
  },
  {
    "id": "java-90-transactions",
    "topicNumber": 90,
    "title": "SQL Transactions, ACID Properties & Isolation Levels in JDBC",
    "level": "Advanced",
    "whyItMatters": "Financial transfers, booking systems, and e-commerce orders require all-or-nothing guarantees. Understanding ACID, transaction demarcation (setAutoCommit, commit, rollback), and transaction isolation levels prevents data corruption and concurrency anomalies.",
    "explanation": "1. ACID Guarantees:\n- Atomicity: All operations succeed or the entire transaction is rolled back.\n- Consistency: Database transitions from one valid state to another, satisfying all constraints.\n- Isolation: Concurrent transactions do not interfere with each other.\n- Durability: Committed changes survive system crashes or power failures.\n\n2. Programmatic Transaction Demarcation in JDBC:\n- By default, JDBC connections operate in auto-commit mode (every SQL statement commits immediately).\n- To group operations into an atomic transaction:\n  1. conn.setAutoCommit(false);\n  2. Execute updates (e.g., debit sender, credit receiver).\n  3. conn.commit(); (persist changes)\n  4. In catch block: conn.rollback(); (undo all changes on failure)\n  5. In finally block: conn.setAutoCommit(true);\n\n3. The 4 Standard SQL Isolation Levels:\n- READ UNCOMMITTED: Lowest isolation. Allows Dirty Reads (reading uncommitted changes from concurrent transactions).\n- READ COMMITTED: Prevents Dirty Reads. Susceptible to Non-Repeatable Reads (reading row twice gets different values if concurrent transaction updates and commits).\n- REPEATABLE READ: Prevents Dirty and Non-Repeatable Reads. Susceptible to Phantom Reads (querying range twice finds newly inserted rows).\n- SERIALIZABLE: Highest isolation. Fully serial execution, preventing all anomalies at the cost of high lock contention.",
    "syntaxAndStructure": "// Transaction management template:\nconn.setAutoCommit(false);\ntry {\n    // debit account A\n    // credit account B\n    conn.commit();\n} catch (SQLException e) {\n    conn.rollback();\n    throw e;\n} finally {\n    conn.setAutoCommit(true);\n}",
    "codeExamples": [
      {
        "title": "Atomic Bank Account Money Transfer with Rollback",
        "code": "import java.sql.*;\n\npublic class TransactionDemo {\n    public static void transferFunds(Connection conn, long fromAcc, long toAcc, double amount) throws SQLException {\n        String debitSql = \"UPDATE accounts SET balance = balance - ? WHERE id = ? AND balance >= ?\";\n        String creditSql = \"UPDATE accounts SET balance = balance + ? WHERE id = ?\";\n\n        boolean originalAutoCommit = conn.getAutoCommit();\n\n        try {\n            conn.setAutoCommit(false); // Begin transaction\n\n            // 1. Debit sender\n            try (PreparedStatement psDebit = conn.prepareStatement(debitSql)) {\n                psDebit.setDouble(1, amount);\n                psDebit.setLong(2, fromAcc);\n                psDebit.setDouble(3, amount);\n                int rows = psDebit.executeUpdate();\n                if (rows == 0) {\n                    throw new SQLException(\"Insufficient funds or sender account not found!\");\n                }\n            }\n\n            // 2. Credit receiver\n            try (PreparedStatement psCredit = conn.prepareStatement(creditSql)) {\n                psCredit.setDouble(1, amount);\n                psCredit.setLong(2, toAcc);\n                int rows = psCredit.executeUpdate();\n                if (rows == 0) {\n                    throw new SQLException(\"Receiver account not found!\");\n                }\n            }\n\n            conn.commit(); // Commit both operations atomically\n            System.out.println(\"Transfer successful!\");\n        } catch (SQLException e) {\n            conn.rollback(); // Rollback both operations\n            System.err.println(\"Transfer rolled back: \" + e.getMessage());\n            throw e;\n        } finally {\n            conn.setAutoCommit(originalAutoCommit);\n        }\n    }\n\n    public static void main(String[] args) {\n        System.out.println(\"Transaction pattern guarantees money is never lost in transit.\");\n    }\n}",
        "expectedOutput": "Transaction pattern guarantees money is never lost in transit.",
        "explanation": "setAutoCommit(false) starts the transaction. If either debit or credit fails, conn.rollback() restores the initial state, preserving Atomicity and Consistency."
      },
      {
        "title": "Configuring Isolation Levels and Savepoints",
        "code": "import java.sql.*;\n\npublic class SavepointDemo {\n    public static void demonstrateSavepoint(Connection conn) throws SQLException {\n        conn.setAutoCommit(false);\n        // Set isolation level to prevent dirty reads\n        conn.setTransactionIsolation(Connection.TRANSACTION_READ_COMMITTED);\n\n        // Operation 1\n        // ... insert initial record ...\n        Savepoint sp1 = conn.setSavepoint(\"Savepoint1\");\n\n        try {\n            // Operation 2 (risky update)\n            try (Statement stmt = conn.createStatement()) {\n                stmt.executeUpdate(\"UPDATE accounts SET balance = balance - 100 WHERE id = 1\");\n            }\n        } catch (SQLException e) {\n            // Rollback only the risky step, keeping Operation 1 intact!\n            conn.rollback(sp1);\n        }\n\n        conn.commit();\n    }\n\n    public static void main(String[] args) {\n        System.out.println(\"Savepoints allow partial rollbacks within a larger transaction.\");\n    }\n}",
        "expectedOutput": "Savepoints allow partial rollbacks within a larger transaction.",
        "explanation": "Savepoints provide checkpointing within a transaction, allowing partial rollbacks without abandoning earlier completed work."
      }
    ],
    "realWorldApplications": [
      "Banking core transaction engines processing peer-to-peer payments and currency exchanges.",
      "E-commerce checkout pipelines reserving stock inventory, creating invoice records, and charging payment cards."
    ],
    "commonMistakes": [
      "Forgetting to reset conn.setAutoCommit(true) in a finally block, leaving the connection in manual-commit mode when returned to a shared pool.",
      "Holding transactions open across slow network I/O calls (e.g. calling third-party payment gateways inside an open database transaction), holding database table locks and creating connection pool exhaustion.",
      "Failing to handle DeadlockException (SQL state 40001) by implementing retry mechanisms with exponential backoff."
    ],
    "interviewRelevance": "ACID properties, isolation levels (dirty reads, non-repeatable reads, phantom reads), and transaction demarcation are standard questions for backend engineering candidates at Stripe, Square, and Goldman Sachs.",
    "checkpoints": [
      {
        "id": "java-90-cp1",
        "label": "Manage transactions using setAutoCommit(false), commit(), and rollback()"
      },
      {
        "id": "java-90-cp2",
        "label": "Distinguish between the 4 SQL isolation levels and their concurrency anomalies"
      },
      {
        "id": "java-90-cp3",
        "label": "Keep transaction duration minimal to prevent database lock contention"
      }
    ],
    "practiceExercises": [
      {
        "id": "java-90-ex1",
        "title": "Inspect Current Isolation Level",
        "difficulty": "Beginner",
        "type": "coding",
        "prompt": "Write a method that inspects a Connection and returns a human-readable String representing its isolation level (\"READ_UNCOMMITTED\", \"READ_COMMITTED\", etc.).",
        "starterCode": "import java.sql.*;\n\npublic class IsolationInspector {\n    public static String getIsolationLevelName(Connection conn) throws SQLException {\n        return \"\";\n    }\n}",
        "solution": "import java.sql.*;\n\npublic class IsolationInspector {\n    public static String getIsolationLevelName(Connection conn) throws SQLException {\n        return switch (conn.getTransactionIsolation()) {\n            case Connection.TRANSACTION_READ_UNCOMMITTED -> \"READ_UNCOMMITTED\";\n            case Connection.TRANSACTION_READ_COMMITTED -> \"READ_COMMITTED\";\n            case Connection.TRANSACTION_REPEATABLE_READ -> \"REPEATABLE_READ\";\n            case Connection.TRANSACTION_SERIALIZABLE -> \"SERIALIZABLE\";\n            default -> \"UNKNOWN\";\n        };\n    }\n}",
        "explanation": "conn.getTransactionIsolation() returns standard integer constants defined on java.sql.Connection."
      },
      {
        "id": "java-90-ex2",
        "title": "Transactional Order Placement",
        "difficulty": "Intermediate",
        "type": "coding",
        "prompt": "Implement placeOrder(Connection conn, long userId, long productId, int quantity) that decrements inventory and inserts an order record atomically.",
        "starterCode": "import java.sql.*;\n\npublic class OrderService {\n    public static void placeOrder(Connection conn, long userId, long productId, int quantity) throws SQLException {\n        // Implement atomic transaction\n    }\n}",
        "solution": "import java.sql.*;\n\npublic class OrderService {\n    public static void placeOrder(Connection conn, long userId, long productId, int quantity) throws SQLException {\n        boolean auto = conn.getAutoCommit();\n        conn.setAutoCommit(false);\n\n        String decrSql = \"UPDATE products SET stock = stock - ? WHERE id = ? AND stock >= ?\";\n        String orderSql = \"INSERT INTO orders (user_id, product_id, quantity) VALUES (?, ?, ?)\";\n\n        try {\n            try (PreparedStatement psStock = conn.prepareStatement(decrSql)) {\n                psStock.setInt(1, quantity);\n                psStock.setLong(2, productId);\n                psStock.setInt(3, quantity);\n                if (psStock.executeUpdate() == 0) {\n                    throw new SQLException(\"Product out of stock or does not exist!\");\n                }\n            }\n\n            try (PreparedStatement psOrder = conn.prepareStatement(orderSql)) {\n                psOrder.setLong(1, userId);\n                psOrder.setLong(2, productId);\n                psOrder.setInt(3, quantity);\n                psOrder.executeUpdate();\n            }\n\n            conn.commit();\n        } catch (SQLException e) {\n            conn.rollback();\n            throw e;\n        } finally {\n            conn.setAutoCommit(auto);\n        }\n    }\n}",
        "explanation": "Ensures inventory is deducted and order record created in the same atomic transaction with automatic rollback if stock is insufficient."
      },
      {
        "id": "java-90-ex3",
        "title": "Optimistic Locking with Version Field",
        "difficulty": "Advanced",
        "type": "coding",
        "prompt": "Implement updateWithOptimisticLock(Connection conn, long id, String newStatus, int expectedVersion) that updates status and increments version only if version matches.",
        "starterCode": "import java.sql.*;\n\npublic class OptimisticLockDao {\n    public static boolean updateStatus(Connection conn, long id, String newStatus, int expectedVersion) throws SQLException {\n        return false;\n    }\n}",
        "solution": "import java.sql.*;\n\npublic class OptimisticLockDao {\n    public static boolean updateStatus(Connection conn, long id, String newStatus, int expectedVersion) throws SQLException {\n        String sql = \"UPDATE documents SET status = ?, version = version + 1 WHERE id = ? AND version = ?\";\n        try (PreparedStatement ps = conn.prepareStatement(sql)) {\n            ps.setString(1, newStatus);\n            ps.setLong(2, id);\n            ps.setInt(3, expectedVersion);\n            int updatedRows = ps.executeUpdate();\n            return updatedRows == 1; // False if concurrent update modified version\n        }\n    }\n}",
        "explanation": "Optimistic locking avoids database lock contention by checking expectedVersion in the WHERE clause. If another transaction updated the row first, updatedRows will be 0."
      }
    ],
    "quizQuestions": [
      {
        "id": "java-90-q1",
        "question": "What concurrency anomaly is prevented by moving from READ UNCOMMITTED to READ COMMITTED isolation level?",
        "options": [
          "Phantom Read",
          "Non-Repeatable Read",
          "Dirty Read",
          "Lost Update"
        ],
        "correctOptionIndex": 2,
        "explanation": "READ COMMITTED guarantees that a transaction will only read data that has already been committed by other transactions, preventing Dirty Reads."
      },
      {
        "id": "java-90-q2",
        "question": "Why should third-party REST API calls never be placed inside an active database transaction block?",
        "options": [
          "Because HTTP is incompatible with JDBC",
          "Because slow or unresponsive external API calls keep the database transaction and database row/table locks open indefinitely, exhausting connection pools",
          "Because Java cannot serialize HTTP requests into SQL",
          "Because the database driver will automatically close the socket"
        ],
        "correctOptionIndex": 1,
        "explanation": "External network I/O can take seconds to complete or time out. Holding database locks during network calls creates massive contention and connection pool exhaustion."
      }
    ],
    "revisionNotes": [
      "ACID: Atomicity, Consistency, Isolation, Durability.",
      "Always restore `conn.setAutoCommit(true)` in a finally block.",
      "Isolation levels trade off concurrency anomalies (dirty, non-repeatable, phantom reads) against performance."
    ],
    "moduleId": "java-m7",
    "moduleNumber": 7,
    "moduleTitle": "Practical Java",
    "language": "java"
  },
  {
    "id": "java-91-junit5",
    "topicNumber": 91,
    "title": "Unit Testing with JUnit 5 & Mockito Fundamentals",
    "level": "Intermediate",
    "whyItMatters": "Unit testing proves code correctness and prevents regressions. JUnit 5 (Jupiter) is the modern industry standard for Java testing, featuring clean lifecycle annotations, assertAll grouping, and seamless Mockito integration.",
    "explanation": "1. JUnit 5 Architecture (JUnit Platform + Jupiter + Vintage):\n- Jupiter is the test engine and programming model for JUnit 5.\n- Lifecycle Annotations:\n  - @BeforeAll / @AfterAll: Run once before/after all tests in the class (must be static unless @TestInstance(Lifecycle.PER_CLASS)).\n  - @BeforeEach / @AfterEach: Run before/after every single @Test method to initialize or clean state.\n  - @Test: Marks a test method (no longer requires public in JUnit 5).\n  - @DisplayName: Human-readable test names.\n  - @ParameterizedTest: Runs a single test across multiple inputs (@ValueSource, @CsvSource, @MethodSource).\n\n2. Modern Assertions:\n- assertEquals(expected, actual)\n- assertThrows(ExpectedException.class, () -> executable) ensures exceptions are thrown.\n- assertAll(\"grouped assertions\", ...) executes all assertions even if earlier ones fail.\n\n3. Mockito Fundamentals:\n- @Mock: Creates mock instance of a dependency.\n- @InjectMocks: Injects created mocks into the tested class.\n- when(mock.method()).thenReturn(value) defines stubbed behavior.\n- verify(mock, times(1)).method() verifies interactions.",
    "syntaxAndStructure": "// JUnit 5 parameterized test with assertions:\n@ParameterizedTest\n@ValueSource(ints = {2, 4, 6, 8})\nvoid testEvenNumbers(int number) {\n    assertTrue(number % 2 == 0);\n}",
    "codeExamples": [
      {
        "title": "JUnit 5 Lifecycle, Grouped Assertions & Exception Testing",
        "code": "public class CalculatorTestSample {\n    static class Calculator {\n        int add(int a, int b) { return a + b; }\n        int divide(int a, int b) {\n            if (b == 0) throw new ArithmeticException(\"Division by zero\");\n            return a / b;\n        }\n    }\n\n    public static void main(String[] args) {\n        Calculator calc = new Calculator();\n\n        // 1. Assert normal operation\n        assert calc.add(2, 3) == 5 : \"Addition test failed\";\n\n        // 2. Assert exception throwing\n        boolean exceptionThrown = false;\n        try {\n            calc.divide(10, 0);\n        } catch (ArithmeticException e) {\n            exceptionThrown = true;\n        }\n        assert exceptionThrown : \"Expected ArithmeticException not thrown\";\n\n        System.out.println(\"Unit test logic verified successfully!\");\n    }\n}",
        "expectedOutput": "Unit test logic verified successfully!",
        "explanation": "Demonstrates unit testing principles: asserting expected return values and verifying that invalid arguments trigger expected runtime exceptions."
      },
      {
        "title": "Mockito Mocking Pattern Concept",
        "code": "public class MockitoPatternDemo {\n    interface PaymentGateway {\n        boolean processPayment(String card, double amount);\n    }\n\n    static class CheckoutService {\n        private final PaymentGateway gateway;\n        CheckoutService(PaymentGateway gateway) { this.gateway = gateway; }\n\n        public boolean checkout(String card, double amount) {\n            if (amount <= 0) return false;\n            return gateway.processPayment(card, amount);\n        }\n    }\n\n    public static void main(String[] args) {\n        // Mock implementation for isolated unit testing\n        PaymentGateway mockGateway = (card, amount) -> true;\n        CheckoutService service = new CheckoutService(mockGateway);\n\n        boolean result = service.checkout(\"1234-5678\", 99.99);\n        System.out.println(\"Checkout with mock gateway: \" + result);\n    }\n}",
        "expectedOutput": "Checkout with mock gateway: true",
        "explanation": "Mocking isolates the unit under test (CheckoutService) from external side-effects (payment networks, third-party APIs)."
      }
    ],
    "realWorldApplications": [
      "Continuous Integration (CI) build pipelines failing builds if unit tests fail or code coverage drops below 80%.",
      "Test-Driven Development (TDD) writing failing unit tests before implementing production business logic."
    ],
    "commonMistakes": [
      "Testing multiple unrelated behaviors in a single test without assertAll, hiding later failures if the first assertion fails.",
      "Over-mocking: mocking data classes (DTOs, Pojos) instead of mocking external services or database repositories.",
      "Using JUnit 4 imports (org.junit.Test) mixed with JUnit 5 (org.junit.jupiter.api.Test), causing tests to be ignored by the Jupiter test engine."
    ],
    "interviewRelevance": "Writing testable code, dependency injection for mockability, and parameterized testing are heavily evaluated in design and coding interviews.",
    "checkpoints": [
      {
        "id": "java-91-cp1",
        "label": "Use JUnit 5 annotations (@Test, @BeforeEach, @DisplayName, @ParameterizedTest)"
      },
      {
        "id": "java-91-cp2",
        "label": "Assert exceptions using assertThrows and group checks with assertAll"
      },
      {
        "id": "java-91-cp3",
        "label": "Mock external dependencies using Mockito (when, thenReturn, verify)"
      }
    ],
    "practiceExercises": [
      {
        "id": "java-91-ex1",
        "title": "Test Palindrome Verifier",
        "difficulty": "Beginner",
        "type": "coding",
        "prompt": "Implement a method isPalindrome(String s) and write validation checks for typical cases (\"racecar\", \"hello\", empty string).",
        "starterCode": "public class PalindromeChecker {\n    public static boolean isPalindrome(String s) {\n        return false;\n    }\n}",
        "solution": "public class PalindromeChecker {\n    public static boolean isPalindrome(String s) {\n        if (s == null) return false;\n        int left = 0, right = s.length() - 1;\n        while (left < right) {\n            if (s.charAt(left++) != s.charAt(right--)) return false;\n        }\n        return true;\n    }\n}",
        "explanation": "Tests verify correctness across symmetric words, asymmetric words, and edge cases like empty and null strings."
      },
      {
        "id": "java-91-ex2",
        "title": "Assert Exception on Invalid Age",
        "difficulty": "Intermediate",
        "type": "coding",
        "prompt": "Create a class VoterRegistration with register(int age) that throws IllegalArgumentException(\"Age must be >= 18\") if age < 18.",
        "starterCode": "public class VoterRegistration {\n    public static void register(int age) {\n        // Implement validation\n    }\n}",
        "solution": "public class VoterRegistration {\n    public static void register(int age) {\n        if (age < 18) {\n            throw new IllegalArgumentException(\"Age must be >= 18\");\n        }\n    }\n}",
        "explanation": "Unit tests verify this method using assertThrows(IllegalArgumentException.class, () -> VoterRegistration.register(16))."
      },
      {
        "id": "java-91-ex3",
        "title": "Mock Dependency in Service Test",
        "difficulty": "Advanced",
        "type": "coding",
        "prompt": "Design an OrderNotificationService that takes an EmailClient interface and sends an email. Ensure it does not attempt network calls when customer email is null.",
        "starterCode": "public class OrderNotificationService {\n    public interface EmailClient {\n        void send(String to, String msg);\n    }\n    // Implement service\n}",
        "solution": "public class OrderNotificationService {\n    public interface EmailClient {\n        void send(String to, String msg);\n    }\n\n    private final EmailClient emailClient;\n    public OrderNotificationService(EmailClient emailClient) {\n        this.emailClient = emailClient;\n    }\n\n    public boolean notifyCustomer(String email, String orderId) {\n        if (email == null || email.isBlank()) {\n            return false;\n        }\n        emailClient.send(email, \"Your order \" + orderId + \" is confirmed!\");\n        return true;\n    }\n}",
        "explanation": "In tests, a mock EmailClient verifies that emailClient.send() is called when email is valid, and never called when email is null."
      }
    ],
    "quizQuestions": [
      {
        "id": "java-91-q1",
        "question": "What is the advantage of using `assertAll()` in JUnit 5 over individual assertions?",
        "options": [
          "It runs tests concurrently on multiple CPU threads",
          "It executes every assertion in the group and reports all failures together, instead of stopping at the first failed assertion",
          "It automatically retries failed tests 3 times",
          "It generates HTML coverage reports"
        ],
        "correctOptionIndex": 1,
        "explanation": "assertAll guarantees that all enclosed assertions are executed. If multiple assertions fail, it reports all failed messages simultaneously."
      },
      {
        "id": "java-91-q2",
        "question": "Which JUnit 5 annotation is used to run the same test method multiple times with different arguments?",
        "options": [
          "@RepeatedTest",
          "@ParameterizedTest",
          "@DynamicTest",
          "@TestFactory"
        ],
        "correctOptionIndex": 1,
        "explanation": "@ParameterizedTest combined with argument sources (@ValueSource, @CsvSource, @MethodSource) runs the test across multiple test vectors."
      }
    ],
    "revisionNotes": [
      "JUnit 5 methods do not need to be `public`.",
      "Use `assertThrows` to verify expected exception types and messages.",
      "Mock external services and repositories; do not mock simple DTOs or values."
    ],
    "moduleId": "java-m7",
    "moduleNumber": 7,
    "moduleTitle": "Practical Java",
    "language": "java"
  },
  {
    "id": "java-92-debugging",
    "topicNumber": 92,
    "title": "Debugging, Stack Trace Analysis & Exception Best Practices",
    "level": "Intermediate",
    "whyItMatters": "Diagnosing production outages requires reading JVM stack traces, understanding exception chaining, analyzing JVM thread dumps, and designing meaningful custom exception hierarchies without losing root causes.",
    "explanation": "1. Anatomizing a JVM Stack Trace:\n- Top line: Exception type and message: java.lang.NullPointerException: Cannot invoke \"...\".\n- Call frames: Sequence of method calls leading to the failure, ordered from deepest (failure site at top) to oldest (entry point at bottom).\n- \"Caused by:\" (Exception Chaining): Shows the underlying root cause preserved via Throwable.initCause() or new CustomException(message, cause).\n\n2. Exception Handling Anti-Patterns to Avoid:\n- Swallowing Exceptions: catch (Exception e) {} (silently ignores errors, creating impossible-to-debug states).\n- Catching Throwable: Catches JVM Errors like OutOfMemoryError and StackOverflowError that should terminate the process.\n- Log and Throw: Logging an error and throwing it up causes duplicate identical log messages at every stack level.\n- Losing the Cause: throw new BusinessException(\"failed\") instead of throw new BusinessException(\"failed\", e).\n\n3. Diagnosing JVM Crashes & Thread Dumps:\n- OutOfMemoryError (Heap vs Metaspace): Enable -XX:+HeapDumpOnOutOfMemoryError -XX:HeapDumpPath=/dumps to analyze heap dumps in Eclipse MAT or JProfiler.\n- Deadlock diagnosis: Generate thread dump via jcmd <pid> Thread.print or jstack <pid> to find threads waiting for monitors held by each other.",
    "syntaxAndStructure": "// Proper exception wrapping preserving root cause:\ntry {\n    executeDatabaseQuery();\n} catch (SQLException e) {\n    throw new ServiceUnavailableException(\"Database lookup failed for user \" + userId, e);\n}",
    "codeExamples": [
      {
        "title": "Preserving Root Cause with Exception Chaining",
        "code": "public class ExceptionChainingDemo {\n    static class DataAccessException extends RuntimeException {\n        public DataAccessException(String message, Throwable cause) {\n            super(message, cause); // Preserves original root cause\n        }\n    }\n\n    public static void loadConfig() {\n        try {\n            // Simulate low-level failure\n            throw new java.io.FileNotFoundException(\"config.yaml not found on classpath\");\n        } catch (java.io.FileNotFoundException e) {\n            // Wrap in domain exception with cause\n            throw new DataAccessException(\"Failed to initialize system configuration\", e);\n        }\n    }\n\n    public static void main(String[] args) {\n        try {\n            loadConfig();\n        } catch (DataAccessException e) {\n            System.out.println(\"Caught: \" + e.getMessage());\n            System.out.println(\"Root cause: \" + e.getCause().getClass().getName() + \" - \" + e.getCause().getMessage());\n        }\n    }\n}",
        "expectedOutput": "Caught: Failed to initialize system configuration\nRoot cause: java.io.FileNotFoundException - config.yaml not found on classpath",
        "explanation": "Passing the caught exception e to super(message, cause) preserves the original root cause, visible in stack traces under \"Caused by:\"."
      },
      {
        "title": "Defensive Exception Handling with Helpful Context",
        "code": "public class ContextualExceptionDemo {\n    public static int parseAge(String input) {\n        if (input == null || input.isBlank()) {\n            throw new IllegalArgumentException(\"Age input cannot be null or blank\");\n        }\n        try {\n            int age = Integer.parseInt(input);\n            if (age < 0 || age > 150) {\n                throw new IllegalArgumentException(\"Age out of reasonable range [0..150]: \" + age);\n            }\n            return age;\n        } catch (NumberFormatException e) {\n            throw new IllegalArgumentException(\"Invalid age format: '\" + input + \"'\", e);\n        }\n    }\n\n    public static void main(String[] args) {\n        try {\n            parseAge(\"not_a_number\");\n        } catch (IllegalArgumentException e) {\n            System.out.println(\"Contextual error: \" + e.getMessage());\n        }\n    }\n}",
        "expectedOutput": "Contextual error: Invalid age format: 'not_a_number'",
        "explanation": "Including the invalid input string in the exception message helps developers diagnose the bad payload immediately from error logs."
      }
    ],
    "realWorldApplications": [
      "Production incident response teams analyzing Datadog/Splunk stack traces during microservice outages.",
      "APM tools (Dynatrace, New Relic) tracing distributed exceptions across HTTP boundaries."
    ],
    "commonMistakes": [
      "Throwing raw generic Exception or RuntimeException without descriptive messages or types.",
      "Catching NullPointerException instead of fixing the root cause with null-safe checks (Objects.requireNonNull, Optional).",
      "Ignoring \"Caused by:\" lines in stack traces and only looking at the topmost exception message."
    ],
    "interviewRelevance": "Senior engineers must demonstrate mastery in diagnosing production incidents, interpreting thread dumps, and designing clean exception hierarchies.",
    "checkpoints": [
      {
        "id": "java-92-cp1",
        "label": "Trace errors through JVM stack traces and \"Caused by:\" chains"
      },
      {
        "id": "java-92-cp2",
        "label": "Avoid anti-patterns: swallowing exceptions, catching Throwable, and log-and-throw"
      },
      {
        "id": "java-92-cp3",
        "label": "Preserve root causes when wrapping exceptions with custom domain exceptions"
      }
    ],
    "practiceExercises": [
      {
        "id": "java-92-ex1",
        "title": "Design Custom Domain Exception Hierarchy",
        "difficulty": "Beginner",
        "type": "coding",
        "prompt": "Create a base PaymentException and a subclass InsufficientBalanceException with amount and available fields.",
        "starterCode": "public class PaymentException extends RuntimeException {\n    // Implement hierarchy\n}",
        "solution": "public class PaymentException extends RuntimeException {\n    public PaymentException(String message) { super(message); }\n    public PaymentException(String message, Throwable cause) { super(message, cause); }\n\n    public static class InsufficientBalanceException extends PaymentException {\n        private final double required;\n        private final double available;\n\n        public InsufficientBalanceException(double required, double available) {\n            super(String.format(\"Insufficient balance: required $%.2f, available $%.2f\", required, available));\n            this.required = required;\n            this.available = available;\n        }\n\n        public double getRequired() { return required; }\n        public double getAvailable() { return available; }\n    }\n}",
        "explanation": "Strongly-typed custom exceptions allow calling code to catch specific business errors and inspect context fields programmaticallly."
      },
      {
        "id": "java-92-ex2",
        "title": "Safe Resource Extraction with Context",
        "difficulty": "Intermediate",
        "type": "coding",
        "prompt": "Write a method requireNonBlank(String str, String fieldName) that validates strings and throws IllegalArgumentException with the fieldName if invalid.",
        "starterCode": "public class ValidationHelper {\n    public static String requireNonBlank(String str, String fieldName) {\n        return \"\";\n    }\n}",
        "solution": "public class ValidationHelper {\n    public static String requireNonBlank(String str, String fieldName) {\n        if (str == null || str.isBlank()) {\n            throw new IllegalArgumentException(\"Field '\" + fieldName + \"' must not be null or blank\");\n        }\n        return str;\n    }\n}",
        "explanation": "Explicit validation with specific field names prevents cryptic NullPointerExceptions deeper in the execution flow."
      },
      {
        "id": "java-92-ex3",
        "title": "Retry Template with Exponential Backoff",
        "difficulty": "Advanced",
        "type": "coding",
        "prompt": "Implement a generic retry method executeWithRetry(Callable<T> task, int maxRetries, long initialDelayMs) that catches Exception and retries with exponential backoff.",
        "starterCode": "import java.util.concurrent.Callable;\n\npublic class RetryExecutor {\n    public static <T> T executeWithRetry(Callable<T> task, int maxRetries, long initialDelayMs) throws Exception {\n        return null;\n    }\n}",
        "solution": "import java.util.concurrent.Callable;\n\npublic class RetryExecutor {\n    public static <T> T executeWithRetry(Callable<T> task, int maxRetries, long initialDelayMs) throws Exception {\n        long delay = initialDelayMs;\n        Exception lastException = null;\n\n        for (int attempt = 1; attempt <= maxRetries; attempt++) {\n            try {\n                return task.call();\n            } catch (Exception e) {\n                lastException = e;\n                if (attempt == maxRetries) break;\n                Thread.sleep(delay);\n                delay *= 2; // Exponential backoff\n            }\n        }\n        throw new RuntimeException(\"Operation failed after \" + maxRetries + \" attempts\", lastException);\n    }\n}",
        "explanation": "Retries transient failures with exponential delay, wrapping the final failure in a descriptive exception while preserving the last root cause."
      }
    ],
    "quizQuestions": [
      {
        "id": "java-92-q1",
        "question": "Why is \"Log and Throw\" (logging an exception and then immediately throwing it) considered an anti-pattern?",
        "options": [
          "Because logging slows down JVM garbage collection",
          "Because every layer in the call stack will catch, log, and rethrow the same error, cluttering log files with redundant duplicate stack traces",
          "Because the logger will delete the exception object",
          "Because Java prohibits logging inside catch blocks"
        ],
        "correctOptionIndex": 1,
        "explanation": "Log and Throw results in the same error being logged 5-10 times as it bubbles up through controller, service, and repository layers, flooding log indexes."
      },
      {
        "id": "java-92-q2",
        "question": "Which JVM option automatically captures a heap dump when an OutOfMemoryError occurs in production?",
        "options": [
          "-XX:+HeapDumpOnOutOfMemoryError",
          "-Xlog:gc*",
          "-Djava.heap.dump=true",
          "-XX:+PrintGCDetails"
        ],
        "correctOptionIndex": 0,
        "explanation": "-XX:+HeapDumpOnOutOfMemoryError instructs the HotSpot JVM to write an HPROF memory dump to disk immediately before crashing."
      }
    ],
    "revisionNotes": [
      "Always preserve root causes using `new CustomException(\"message\", cause)`.",
      "Never catch `Throwable` or swallow exceptions with empty catch blocks.",
      "Include contextual values (IDs, usernames, file paths) in exception messages."
    ],
    "moduleId": "java-m7",
    "moduleNumber": 7,
    "moduleTitle": "Practical Java",
    "language": "java"
  },
  {
    "id": "java-93-logging",
    "topicNumber": 93,
    "title": "Logging Frameworks (SLF4J, Logback & Log4j2) & MDC Tracing",
    "level": "Intermediate",
    "whyItMatters": "Never use System.out.println in production! It is unbuffered, synchronous, lacks log levels, timestamps, and thread context. Modern enterprise Java relies on SLF4J with Logback or Log4j2, utilizing MDC (Mapped Diagnostic Context) to trace requests across microservices.",
    "explanation": "1. SLF4J (Simple Logging Facade for Java):\n- SLF4J is an abstraction (interface) layer. Your code depends only on org.slf4j.Logger.\n- The underlying logging implementation (Logback, Log4j2) is bound at runtime.\n- Parameterized Logging: logger.info(\"User {} logged in from IP {}\", userId, ip); eliminates string concatenation overhead when the log level is disabled!\n\n2. Standard Log Levels (in order of increasing severity):\n- TRACE: Extremely granular diagnostic information.\n- DEBUG: Useful information for developers during debugging.\n- INFO: Normal operational events (startup, shutdown, milestone completed).\n- WARN: Unexpected situations that the system recovered from (cache miss, fallback used).\n- ERROR: Serious runtime errors requiring engineer attention (database failure, unhandled exception).\n\n3. MDC (Mapped Diagnostic Context):\n- Thread-local map (org.slf4j.MDC) that associates contextual data (requestId, userId, tenantId) with the current thread.\n- Log appenders automatically inject MDC values into every log statement format pattern: [%X{requestId}] %msg%n.\n- Essential for tracing distributed requests in multi-threaded microservice architectures.",
    "syntaxAndStructure": "// SLF4J logger declaration and parameterized usage:\nprivate static final Logger log = LoggerFactory.getLogger(UserService.class);\nlog.info(\"Processing order {} for customer {}\", orderId, customerId);",
    "codeExamples": [
      {
        "title": "Parameterized Logging and MDC Context Tracing Concept",
        "code": "public class MdcConceptDemo {\n    static class FakeMDC {\n        private static final ThreadLocal<String> requestId = new ThreadLocal<>();\n        public static void put(String reqId) { requestId.set(reqId); }\n        public static String get() { return requestId.get(); }\n        public static void clear() { requestId.remove(); }\n    }\n\n    public static void handleRequest(String user) {\n        FakeMDC.put(\"1001\");\n        try {\n            logInfo(\"Received request for user: \" + user);\n            // Process request...\n            logInfo(\"Request completed successfully.\");\n        } finally {\n            FakeMDC.clear(); // Always clear thread-local context!\n        }\n    }\n\n    private static void logInfo(String message) {\n        System.out.printf(\"[%s] [INFO] [req-%s] %s%n\",\n            Thread.currentThread().getName(), FakeMDC.get(), message);\n    }\n\n    public static void main(String[] args) {\n        handleRequest(\"alice_99\");\n    }\n}",
        "expectedOutput": "[main] [INFO] [req-1001] Received request for user: alice_99\n[main] [INFO] [req-1001] Request completed successfully.",
        "explanation": "MDC associates a request ID with the current thread. Every subsequent log line automatically includes [req-xxxx] without passing requestId through method arguments."
      },
      {
        "title": "Avoiding String Concatenation Overhead in Logging",
        "code": "public class LoggingEfficiencyDemo {\n    public static void main(String[] args) {\n        String user = \"bob\";\n        int attempts = 3;\n\n        // GOOD: Parameterized format (SLF4J style)\n        // String formatting only executes if log level is enabled!\n        System.out.printf(\"Failed login for %s after %d attempts%n\", user, attempts);\n\n        System.out.println(\"Parameterized logging prevents wasted string allocations.\");\n    }\n}",
        "expectedOutput": "Failed login for bob after 3 attempts\nParameterized logging prevents wasted string allocations.",
        "explanation": "Using curly brace placeholders {} in SLF4J defers string creation until after checking if the log level is active, saving millions of garbage allocations."
      }
    ],
    "realWorldApplications": [
      "Centralized log aggregation in ElasticSearch/Logstash/Kibana (ELK stack) or Grafana Loki.",
      "Distributed request correlation filtering all logs belonging to a single transaction via correlation-id."
    ],
    "commonMistakes": [
      "Using System.out.println in production code: cannot be filtered by level, cannot be redirected asynchronously, and blocks threads.",
      "Forgetting to call MDC.clear() in a finally block: threads in a web server thread pool are reused, causing future requests to inherit stale request IDs.",
      "Logging sensitive Personally Identifiable Information (PII) like raw passwords, credit card numbers, or social security numbers."
    ],
    "interviewRelevance": "Logging best practices, asynchronous logging throughput, and MDC request tracing are key topics in systems design and production readiness interviews.",
    "checkpoints": [
      {
        "id": "java-93-cp1",
        "label": "Use SLF4J parameterized logging ({}) to eliminate string concatenation cost"
      },
      {
        "id": "java-93-cp2",
        "label": "Select appropriate log levels (TRACE, DEBUG, INFO, WARN, ERROR)"
      },
      {
        "id": "java-93-cp3",
        "label": "Attach request tracing IDs via MDC and always clear in a finally block"
      }
    ],
    "practiceExercises": [
      {
        "id": "java-93-ex1",
        "title": "Identify Correct Log Levels",
        "difficulty": "Beginner",
        "type": "conceptual",
        "prompt": "Assign appropriate log levels (DEBUG, INFO, WARN, ERROR) for: (1) Database connection pool exhausted, (2) User updated email address, (3) HTTP request header payload for diagnosis, (4) Primary cache missed, falling back to database.",
        "solution": "1. Database connection pool exhausted: ERROR (critical service degradation).\n2. User updated email address: INFO (normal milestone business event).\n3. HTTP request header payload for diagnosis: DEBUG or TRACE (diagnostic details).\n4. Primary cache missed, falling back to database: WARN (repaired anomaly).",
        "explanation": "Using the correct level ensures alerts trigger only for genuine issues while keeping production logs informative without noise."
      },
      {
        "id": "java-93-ex2",
        "title": "MDC Context Scope Wrapper",
        "difficulty": "Intermediate",
        "type": "coding",
        "prompt": "Write a utility method withMdcContext(String key, String val, Runnable task) that sets the MDC key, executes the task, and guarantees the key is removed in finally.",
        "starterCode": "public class MdcHelper {\n    public static void withMdcContext(String key, String val, Runnable task) {\n        // Implement safe wrapper\n    }\n}",
        "solution": "import org.slf4j.MDC;\n\npublic class MdcHelper {\n    public static void withMdcContext(String key, String val, Runnable task) {\n        MDC.put(key, val);\n        try {\n            task.run();\n        } finally {\n            MDC.remove(key);\n        }\n    }\n}",
        "explanation": "Guarantees that thread-local MDC values are removed even if the runnable throws an unhandled exception."
      },
      {
        "id": "java-93-ex3",
        "title": "Mask Sensitive PII in Log Messages",
        "difficulty": "Advanced",
        "type": "coding",
        "prompt": "Implement a method maskCreditCard(String message) that replaces all 16-digit credit card numbers (e.g. 1234-5678-9012-3456) with ****-****-****-3456 before logging.",
        "starterCode": "public class PiiMasker {\n    public static String maskCreditCard(String message) {\n        return message;\n    }\n}",
        "solution": "public class PiiMasker {\n    public static String maskCreditCard(String message) {\n        if (message == null) return null;\n        return message.replaceAll(\"(\\\\d{4})-(\\\\d{4})-(\\\\d{4})-(\\\\d{4})\", \"****-****-****-$4\");\n    }\n}",
        "explanation": "Regular expression backreferences preserve the last 4 digits while masking the first 12 digits, satisfying PCI-DSS security compliance standards."
      }
    ],
    "quizQuestions": [
      {
        "id": "java-93-q1",
        "question": "Why does SLF4J parameterized logging `logger.debug(\"Value: {}\", computeExpensiveString());` still incur a performance penalty if computeExpensiveString() is called?",
        "options": [
          "Because Java arguments are evaluated before method invocation; to prevent evaluation when debug is disabled, use `if (logger.isDebugEnabled())` or a lambda Supplier",
          "Because SLF4J always compiles strings regardless of log level",
          "Because debug level cannot be disabled in Java",
          "Because System.out intercepts all method arguments"
        ],
        "correctOptionIndex": 0,
        "explanation": "Java evaluates method arguments before passing them into logger.debug(). If an argument involves an expensive computation, wrap it in if (logger.isDebugEnabled()) or use a Supplier."
      },
      {
        "id": "java-93-q2",
        "question": "What is the danger of failing to call `MDC.clear()` at the end of handling an HTTP request in a servlet container?",
        "options": [
          "The JVM crashes with StackOverflowError",
          "Web server worker threads are reused across requests, causing subsequent unrelated requests to inherit stale request/user IDs in their log entries",
          "All database connections are closed",
          "Logback deletes the log file"
        ],
        "correctOptionIndex": 1,
        "explanation": "MDC uses ThreadLocal storage. In thread-pooled environments (Tomcat, Netty), threads are recycled. Uncleared MDC values contaminate future requests handled by the same thread."
      }
    ],
    "revisionNotes": [
      "Never use `System.out.println` in production; always use an SLF4J Logger.",
      "Use parameterized logging `{}` to avoid string concatenation allocations.",
      "MDC provides thread-local request tracing; always clean up with `MDC.clear()` in finally."
    ],
    "moduleId": "java-m7",
    "moduleNumber": 7,
    "moduleTitle": "Practical Java",
    "language": "java"
  },
  {
    "id": "java-94-build-tools",
    "topicNumber": 94,
    "title": "Build Tools: Maven & Gradle Fundamentals and Dependency Scopes",
    "level": "Beginner",
    "whyItMatters": "Modern Java applications are assembled using build automation tools. Understanding Maven (pom.xml) and Gradle (build.gradle) dependency coordinates, lifecycle phases, and scopes (compile, test, provided, runtime) is essential for any professional developer.",
    "explanation": "1. Maven Coordinates (GAV):\nEvery artifact in the Maven ecosystem is uniquely identified by three coordinates:\n- groupId: Reverse domain name of the organization (e.g. org.springframework.boot, com.google.guava).\n- artifactId: The specific project or library name (e.g. spring-boot-starter-web, guava).\n- version: Semantic versioning identifier (e.g. 3.2.0, 32.1.3-jre).\n\n2. Maven Dependency Scopes:\n- compile (default): Available in all classpaths (compilation, testing, runtime). Packaged into the final JAR/WAR.\n- provided: Required for compilation, but expected to be provided by the runtime container (e.g., servlet-api, lombok). NOT packaged.\n- runtime: Not required for compilation, but required during execution (e.g., JDBC driver implementation like postgresql).\n- test: Available only during test compilation and test execution (e.g., junit-jupiter, mockito-core). NOT packaged.\n\n3. Build Lifecycles:\n- Maven Core Phases: validate -> compile -> test -> package -> verify -> install -> deploy.\n- Clean lifecycle: mvn clean deletes the target/ build directory.\n- Gradle: Task-based build system using Groovy/Kotlin DSL. Faster incremental builds through build caching and daemon processes.",
    "syntaxAndStructure": "<!-- Maven Dependency in pom.xml -->\n<dependency>\n    <groupId>org.slf4j</groupId>\n    <artifactId>slf4j-api</artifactId>\n    <version>2.0.9</version>\n    <scope>compile</scope>\n</dependency>",
    "codeExamples": [
      {
        "title": "Comparing Maven pom.xml and Gradle build.gradle Declarations",
        "code": "public class BuildToolsDemo {\n    public static void main(String[] args) {\n        String mavenXml = \"\"\"\n            <dependency>\n                <groupId>com.fasterxml.jackson.core</groupId>\n                <artifactId>jackson-databind</artifactId>\n                <version>2.15.2</version>\n            </dependency>\n            \"\"\";\n\n        String gradleDsl = \"\"\"\n            dependencies {\n                implementation 'com.fasterxml.jackson.core:jackson-databind:2.15.2'\n                testImplementation 'org.junit.jupiter:junit-jupiter:5.10.0'\n            }\n            \"\"\";\n\n        System.out.println(\"Maven Syntax:\\n\" + mavenXml.trim());\n        System.out.println(\"Gradle Syntax:\\n\" + gradleDsl.trim());\n    }\n}",
        "expectedOutput": "Maven Syntax:\n<dependency>\n    <groupId>com.fasterxml.jackson.core</groupId>\n    <artifactId>jackson-databind</artifactId>\n    <version>2.15.2</version>\n</dependency>\nGradle Syntax:\ndependencies {\n    implementation 'com.fasterxml.jackson.core:jackson-databind:2.15.2'\n    testImplementation 'org.junit.jupiter:junit-jupiter:5.10.0'\n}",
        "explanation": "Both tools express identical dependency coordinates. Maven uses declarative XML while Gradle uses concise programmatic DSL."
      },
      {
        "title": "Understanding Transitive Dependency Conflicts (mvn dependency:tree)",
        "code": "public class DependencyTreeConcept {\n    public static void main(String[] args) {\n        System.out.println(\"Resolving dependency diamond conflicts:\");\n        System.out.println(\"App -> LibA (v1.0) -> CommonLib (v1.0)\");\n        System.out.println(\"App -> LibB (v2.0) -> CommonLib (v2.0)\");\n        System.out.println(\"Maven rule: Nearest definition in dependency tree wins!\");\n    }\n}",
        "expectedOutput": "Resolving dependency diamond conflicts:\nApp -> LibA (v1.0) -> CommonLib (v1.0)\nApp -> LibB (v2.0) -> CommonLib (v2.0)\nMaven rule: Nearest definition in dependency tree wins!",
        "explanation": "When conflicting transitive versions appear, Maven picks the version nearest to the project root in the dependency tree, or uses <dependencyManagement> to force a version."
      }
    ],
    "realWorldApplications": [
      "Automated CI/CD pipelines running mvn clean verify to build, test, and containerize Docker microservices.",
      "Software Supply Chain security scanning (Snyk, Dependabot) scanning pom.xml dependencies for known CVE vulnerabilities."
    ],
    "commonMistakes": [
      "Using compile scope for test libraries (like JUnit or Mockito), bundling test frameworks into production JARs and bloating artifact size.",
      "Neglecting transitive dependency version clashes: a library requiring an older version of Guava or Jackson can cause NoSuchMethodError at runtime.",
      "Hardcoding library versions across multiple multi-module sub-projects instead of centralizing them in a parent pom <dependencyManagement> block."
    ],
    "interviewRelevance": "Understanding dependency scopes, build lifecycle phases, and debugging classpath NoSuchMethodError caused by conflicting JARs is tested in all senior engineering screens.",
    "checkpoints": [
      {
        "id": "java-94-cp1",
        "label": "Understand Maven GAV coordinates (groupId, artifactId, version)"
      },
      {
        "id": "java-94-cp2",
        "label": "Choose appropriate dependency scopes: compile, provided, runtime, test"
      },
      {
        "id": "java-94-cp3",
        "label": "Diagnose dependency version conflicts using mvn dependency:tree"
      }
    ],
    "practiceExercises": [
      {
        "id": "java-94-ex1",
        "title": "Select Appropriate Dependency Scopes",
        "difficulty": "Beginner",
        "type": "conceptual",
        "prompt": "For each of the following libraries, specify the most appropriate Maven scope: (1) PostgreSQL JDBC Driver, (2) Project Lombok, (3) JUnit 5 Jupiter Engine, (4) Apache Commons Lang.",
        "solution": "1. PostgreSQL JDBC Driver: runtime (code compiles against java.sql interfaces, driver is needed only at runtime).\n2. Project Lombok: provided (code generator during compile time, not needed in packaged runtime).\n3. JUnit 5 Jupiter Engine: test (used only for running automated tests).\n4. Apache Commons Lang: compile (helper utilities directly invoked in production code).",
        "explanation": "Setting correct scopes keeps final production artifacts lean and prevents test or compile-only tools from leaking into production."
      },
      {
        "id": "java-94-ex2",
        "title": "Centralize Versions with DependencyManagement",
        "difficulty": "Intermediate",
        "type": "conceptual",
        "prompt": "Explain the difference between <dependencies> and <dependencyManagement> in a Maven parent POM.",
        "solution": "<dependencyManagement> defines and standardizes dependency versions and exclusions for child modules without actually adding those dependencies to the classpath. A child module adds the dependency under its own <dependencies> without declaring a <version>, inheriting the managed version.",
        "explanation": "DependencyManagement ensures version consistency across large multi-module repositories while letting individual submodules choose which libraries they actually need."
      },
      {
        "id": "java-94-ex3",
        "title": "Diagnose Classpath Version Collision",
        "difficulty": "Advanced",
        "type": "conceptual",
        "prompt": "A production application crashes with java.lang.NoSuchMethodError on a JSON library method that exists in your local IDE. How do you diagnose and resolve this?",
        "solution": "1. Run `mvn dependency:tree -Dverbose` to inspect the full transitive dependency graph.\n2. Locate multiple conflicting versions of the JSON library pulled transitively by different dependencies.\n3. The runtime classpath picked the older version due to Maven's \"nearest definition\" rule.\n4. Fix: Explicitly declare the desired newer version in the project POM or add an <exclusion> in the dependency pulling the outdated version.",
        "explanation": "NoSuchMethodError at runtime almost always indicates a classpath conflict where an older version of a class was loaded instead of the expected newer version."
      }
    ],
    "quizQuestions": [
      {
        "id": "java-94-q1",
        "question": "Which Maven dependency scope is appropriate for a database JDBC driver (like postgresql or mysql-connector-j)?",
        "options": [
          "compile",
          "test",
          "provided",
          "runtime"
        ],
        "correctOptionIndex": 3,
        "explanation": "Application code compiles against standard java.sql interfaces (Connection, PreparedStatement). The vendor JDBC driver implementation is needed only during runtime execution."
      },
      {
        "id": "java-94-q2",
        "question": "In Maven's default lifecycle, which phase immediately precedes `package`?",
        "options": [
          "compile",
          "test",
          "validate",
          "install"
        ],
        "correctOptionIndex": 1,
        "explanation": "The order of core phases is: validate -> compile -> test -> package -> verify -> install -> deploy. Tests run right before packaging."
      }
    ],
    "revisionNotes": [
      "GAV coordinates uniquely define artifacts: `groupId`, `artifactId`, `version`.",
      "Use `test` scope for test libraries and `provided` for compile-time tools like Lombok.",
      "Run `mvn dependency:tree` to uncover and fix transitive dependency conflicts."
    ],
    "moduleId": "java-m7",
    "moduleNumber": 7,
    "moduleTitle": "Practical Java",
    "language": "java"
  },
  {
    "id": "java-95-clean-code",
    "topicNumber": 95,
    "title": "Clean Code, Effective Java Guidelines & Project Architecture",
    "level": "Advanced",
    "whyItMatters": "Writing code that works is only the first step. Writing code that is maintainable, decoupled, and testable requires following established guidelines (Joshua Bloch's Effective Java) and clean layered architectural boundaries.",
    "explanation": "1. Layered Architecture (Separation of Concerns):\n- Controller / API Layer: Handles HTTP requests, input validation, serialization/deserialization, and returns DTOs.\n- Service Layer: Encapsulates business logic, transaction boundaries (@Transactional), and orchestrates domain operations.\n- Repository / Persistence Layer: Interfaces directly with the database (Spring Data JPA, JDBC) using domain entities.\n- DTOs (Data Transfer Objects): Decouple internal database schema entities from public API contract representations.\n\n2. Key Effective Java Rules (Joshua Bloch):\n- Item 1: Consider static factory methods instead of constructors (meaningful names, caching instances).\n- Item 2: Consider a builder when faced with many constructor parameters.\n- Item 17: Minimize mutability (make classes immutable wherever possible; Records).\n- Item 18: Favor composition over inheritance (inheritance breaks encapsulation when superclasses change).\n- Item 50: Make defensive copies when needed (never trust callers with references to mutable internal arrays/Date objects).\n- Item 54: Return empty collections or arrays, not nulls (eliminates repetitive null-checks for callers).",
    "syntaxAndStructure": "// Effective Java Item 54: Return empty collections, not null\npublic List<Order> getOrdersForUser(long userId) {\n    List<Order> orders = database.fetchOrders(userId);\n    return orders != null ? orders : Collections.emptyList();\n}",
    "codeExamples": [
      {
        "title": "Effective Java Builder Pattern with Immutability",
        "code": "public class BuilderDemo {\n    public static class UserProfile {\n        private final String username; // required\n        private final String email;    // required\n        private final String phone;    // optional\n        private final int karma;       // optional\n\n        private UserProfile(Builder builder) {\n            this.username = builder.username;\n            this.email = builder.email;\n            this.phone = builder.phone;\n            this.karma = builder.karma;\n        }\n\n        public static class Builder {\n            private final String username;\n            private final String email;\n            private String phone = \"\";\n            private int karma = 0;\n\n            public Builder(String username, String email) {\n                this.username = username;\n                this.email = email;\n            }\n\n            public Builder phone(String phone) { this.phone = phone; return this; }\n            public Builder karma(int karma) { this.karma = karma; return this; }\n\n            public UserProfile build() {\n                return new UserProfile(this);\n            }\n        }\n\n        @Override\n        public String toString() {\n            return String.format(\"%s <%s> [karma=%d]\", username, email, karma);\n        }\n    }\n\n    public static void main(String[] args) {\n        UserProfile user = new UserProfile.Builder(\"charlie\", \"charlie@example.com\")\n            .karma(150)\n            .build();\n        System.out.println(\"Built user: \" + user);\n    }\n}",
        "expectedOutput": "Built user: charlie <charlie@example.com> [karma=150]",
        "explanation": "The Builder pattern provides fluent, readable object construction when faced with many parameters, enforcing immutability with final fields."
      },
      {
        "title": "Defensive Copying (Effective Java Item 50)",
        "code": "import java.util.*;\n\npublic class DefensiveCopyDemo {\n    public static final class Period {\n        private final Date start;\n        private final Date end;\n\n        public Period(Date start, Date end) {\n            // Defensive copy of constructor arguments\n            this.start = new Date(start.getTime());\n            this.end = new Date(end.getTime());\n\n            if (this.start.after(this.end)) {\n                throw new IllegalArgumentException(start + \" after \" + end);\n            }\n        }\n\n        // Defensive copy of internal mutable fields\n        public Date getStart() { return new Date(start.getTime()); }\n        public Date getEnd() { return new Date(end.getTime()); }\n    }\n\n    public static void main(String[] args) {\n        Date start = new Date();\n        Date end = new Date();\n        Period p = new Period(start, end);\n\n        // Attempt attack: mutate original date outside\n        start.setTime(0);\n\n        System.out.println(\"Defensive copying preserves immutability: \" + (p.getStart().getTime() != 0));\n    }\n}",
        "expectedOutput": "Defensive copying preserves immutability: true",
        "explanation": "Because Date is mutable, failing to make defensive copies allows external callers to modify the internal state of a nominally immutable class."
      }
    ],
    "realWorldApplications": [
      "Architecting enterprise microservices where domain entities are protected behind DTO boundaries.",
      "Designing public SDKs and open-source libraries that resist accidental caller corruption through immutability."
    ],
    "commonMistakes": [
      "Returning null instead of Collections.emptyList() or Optional, forcing every caller to write boilerplate null checks or suffer NullPointerException.",
      "Exposing JPA database entities directly in REST API responses, leaking internal schema details and risking infinite serialization loops with bidirectional relationships.",
      "Using inheritance where composition was appropriate, tightly coupling child classes to fragile parent implementation details."
    ],
    "interviewRelevance": "Clean architecture, Effective Java principles, defensive copying, and API design are the differentiating factors that separate junior developers from senior engineers.",
    "checkpoints": [
      {
        "id": "java-95-cp1",
        "label": "Structure applications with clear Controller -> Service -> Repository layered separation"
      },
      {
        "id": "java-95-cp2",
        "label": "Apply Effective Java guidelines: Builders, immutability, and defensive copying"
      },
      {
        "id": "java-95-cp3",
        "label": "Return empty collections or Optionals instead of null"
      }
    ],
    "practiceExercises": [
      {
        "id": "java-95-ex1",
        "title": "Return Empty Collections Not Null",
        "difficulty": "Beginner",
        "type": "coding",
        "prompt": "Refactor a method findAdminUsers(List<User> users) so that it returns Collections.emptyList() if users is null or empty, never returning null.",
        "starterCode": "import java.util.*;\n\npublic class UserDirectory {\n    public static List<String> findAdminUsers(List<String> users) {\n        return null;\n    }\n}",
        "solution": "import java.util.*;\n\npublic class UserDirectory {\n    public static List<String> findAdminUsers(List<String> users) {\n        if (users == null || users.isEmpty()) {\n            return Collections.emptyList();\n        }\n        List<String> admins = new ArrayList<>();\n        for (String u : users) {\n            if (u.startsWith(\"admin_\")) {\n                admins.add(u);\n            }\n        }\n        return admins;\n    }\n}",
        "explanation": "Returning Collections.emptyList() simplifies caller code: callers can immediately iterate over the result with a for-each loop without null checking."
      },
      {
        "id": "java-95-ex2",
        "title": "Implement Immutable Value Object",
        "difficulty": "Intermediate",
        "type": "coding",
        "prompt": "Create an immutable class Money with a BigDecimal amount and Currency currency, ensuring defensive copying and valid state.",
        "starterCode": "import java.math.BigDecimal;\nimport java.util.Currency;\n\npublic final class Money {\n    // Implement immutable money\n}",
        "solution": "import java.math.BigDecimal;\nimport java.util.Currency;\nimport java.util.Objects;\n\npublic final class Money {\n    private final BigDecimal amount;\n    private final Currency currency;\n\n    public Money(BigDecimal amount, Currency currency) {\n        this.amount = Objects.requireNonNull(amount, \"Amount required\");\n        this.currency = Objects.requireNonNull(currency, \"Currency required\");\n        if (amount.compareTo(BigDecimal.ZERO) < 0) {\n            throw new IllegalArgumentException(\"Amount cannot be negative\");\n        }\n    }\n\n    public BigDecimal getAmount() { return amount; }\n    public Currency getCurrency() { return currency; }\n\n    public Money add(Money other) {\n        if (!this.currency.equals(other.currency)) {\n            throw new IllegalArgumentException(\"Cannot add different currencies\");\n        }\n        return new Money(this.amount.add(other.amount), this.currency);\n    }\n}",
        "explanation": "The class is final, fields are private final, references are non-null validated, and operations return new instances instead of mutating state."
      },
      {
        "id": "java-95-ex3",
        "title": "Decouple Entity from DTO with Mapper",
        "difficulty": "Advanced",
        "type": "coding",
        "prompt": "Given an internal database entity UserEntity (id, username, passwordHash, ssn, createdAt), create a public UserResponseDto record and a static mapper method to prevent leaking sensitive fields.",
        "starterCode": "public class UserMapperDemo {\n    static class UserEntity {\n        long id;\n        String username;\n        String passwordHash;\n        String ssn;\n    }\n    // Implement DTO and mapper\n}",
        "solution": "public class UserMapperDemo {\n    public static class UserEntity {\n        long id;\n        String username;\n        String passwordHash;\n        String ssn;\n\n        public UserEntity(long id, String username, String passwordHash, String ssn) {\n            this.id = id;\n            this.username = username;\n            this.passwordHash = passwordHash;\n            this.ssn = ssn;\n        }\n    }\n\n    public record UserResponseDto(long id, String username) {\n        public static UserResponseDto fromEntity(UserEntity entity) {\n            if (entity == null) return null;\n            return new UserResponseDto(entity.id, entity.username);\n        }\n    }\n}",
        "explanation": "DTOs explicitly select only public fields, ensuring internal implementation details (passwordHash, ssn) are never leaked to API consumers."
      }
    ],
    "quizQuestions": [
      {
        "id": "java-95-q1",
        "question": "What is the primary rationale behind Effective Java Item 54: \"Return empty collections or arrays, not nulls\"?",
        "options": [
          "Because empty collections consume zero CPU instructions",
          "Because returning null forces every single calling client to write defensive null checks, and missing one causes a runtime NullPointerException",
          "Because Java collections cannot hold null elements",
          "Because the garbage collector rejects null collections"
        ],
        "correctOptionIndex": 1,
        "explanation": "Returning null transfers the burden of null-handling to every caller. Returning Collections.emptyList() allows callers to iterate directly without null checks."
      },
      {
        "id": "java-95-q2",
        "question": "Why does Effective Java recommend defensive copying when accepting mutable objects in a constructor?",
        "options": [
          "To increase JVM heap allocation speed",
          "Because callers retain a reference to the mutable object and can alter internal state of the class after instantiation without its knowledge",
          "To satisfy serialization requirements",
          "To convert arrays into ArrayLists"
        ],
        "correctOptionIndex": 1,
        "explanation": "If you store a caller-provided mutable object (like Date or int[]), the caller can mutate that object later, compromising class invariants."
      }
    ],
    "revisionNotes": [
      "Layered architecture enforces separation of concerns: Controller -> Service -> Repository.",
      "Return empty collections (`Collections.emptyList()`) instead of `null`.",
      "Make defensive copies of mutable objects passed into or returned from constructors and getters."
    ],
    "moduleId": "java-m7",
    "moduleNumber": 7,
    "moduleTitle": "Practical Java",
    "language": "java"
  }
];

export const module7: MasteryModule = {
  "id": "java-m7",
  "number": 7,
  "title": "Practical Java",
  "description": "Real-world software engineering in Java: File Handling & NIO.2, serialization & JSON mapping, JDBC connectivity & SQL injection defense, transactions & ACID isolation levels, JUnit 5 unit testing & Mockito, stack trace debugging & custom exceptions, logging with SLF4J & MDC, Maven/Gradle build tools, and Effective Java clean coding patterns.",
  "language": "java",
  "topics": [
    {
      "id": "java-87-file-nio",
      "topicNumber": 87,
      "title": "File Handling & Modern NIO.2 (Path, Files & try-with-resources)",
      "level": "Intermediate",
      "whyItMatters": "I/O is often the slowest component in enterprise applications. Java 7's NIO.2 (java.nio.file) replaced legacy java.io.File, providing non-blocking capabilities, atomic operations, symbolic link resolution, and memory-mapped buffers.",
      "explanation": "1. Legacy I/O (java.io) vs NIO.2 (java.nio.file):\n- java.io.File had major flaws: no bulk copy/move methods, poor error handling (methods returned false instead of throwing descriptive IOException), and lacked support for file permissions or symbolic links.\n- NIO.2 introduced Path and Files utility classes: thread-safe, robust, and platform-independent.\n\n2. Key NIO.2 Classes:\n- Path: Immutable representation of a file or directory path in the filesystem. Obtained via Path.of(\"path/to/file\") or Paths.get().\n- Files: Static utility providing atomic file copying (Files.copy), moving, deleting, attribute inspection, and stream-based reading (Files.lines, Files.readAllLines).\n- StandardOpenOption: Specifies how files are opened (CREATE, APPEND, TRUNCATE_EXISTING, READ, WRITE).\n\n3. try-with-resources Guarantee:\nAny resource implementing java.lang.AutoCloseable is guaranteed to be closed at the end of the block, even if an exception or return occurs. Suppressed exceptions are retained via Throwable.getSuppressed().",
      "syntaxAndStructure": "// Reading file lines lazily with try-with-resources and NIO.2:\ntry (Stream<String> lines = Files.lines(Path.of(\"data.txt\"))) {\n    lines.filter(s -> !s.isEmpty()).forEach(System.out::println);\n}",
      "codeExamples": [
        {
          "title": "Safe File Reading & Writing using NIO.2 and try-with-resources",
          "code": "import java.io.IOException;\nimport java.nio.file.*;\nimport java.util.List;\n\npublic class NioDemo {\n    public static void main(String[] args) {\n        Path tempFile = Path.of(\"test_nio.txt\");\n\n        try {\n            // Write lines to file\n            List<String> content = List.of(\"Java 17 LTS\", \"Modern NIO.2\", \"High Throughput I/O\");\n            Files.write(tempFile, content, StandardOpenOption.CREATE, StandardOpenOption.WRITE);\n            System.out.println(\"File written successfully: \" + Files.exists(tempFile));\n\n            // Read lines lazily\n            try (var lines = Files.lines(tempFile)) {\n                lines.forEach(line -> System.out.println(\"Line: \" + line));\n            }\n\n            // Cleanup\n            Files.deleteIfExists(tempFile);\n            System.out.println(\"File deleted: \" + !Files.exists(tempFile));\n        } catch (IOException e) {\n            e.printStackTrace();\n        }\n    }\n}",
          "expectedOutput": "File written successfully: true\nLine: Java 17 LTS\nLine: Modern NIO.2\nLine: High Throughput I/O\nFile deleted: true",
          "explanation": "Files.write and Files.lines operate directly on Path objects. The try-with-resources statement ensures the underlying file channel is safely closed, preventing OS file handle leaks."
        },
        {
          "title": "Recursive Directory Traversal with Files.walk()",
          "code": "import java.io.IOException;\nimport java.nio.file.*;\nimport java.util.stream.Stream;\n\npublic class DirectoryWalkDemo {\n    public static void printJavaFiles(Path dir) throws IOException {\n        try (Stream<Path> stream = Files.walk(dir, 2)) { // max depth 2\n            stream.filter(Files::isRegularFile)\n                  .filter(p -> p.toString().endsWith(\".java\"))\n                  .forEach(p -> System.out.println(\"Found: \" + p.getFileName()));\n        }\n    }\n\n    public static void main(String[] args) {\n        System.out.println(\"Directory walk stream closes safely after traversal.\");\n    }\n}",
          "expectedOutput": "Directory walk stream closes safely after traversal.",
          "explanation": "Files.walk() lazily traverses the filesystem tree. Wrapping it in try-with-resources is essential because DirectoryStream holds an open native OS directory descriptor."
        }
      ],
      "realWorldApplications": [
        "ETL data pipelines streaming gigabyte-sized CSV/JSON logs into databases without blowing up JVM heap.",
        "Configuration managers watching for live reload events on disk using java.nio.file.WatchService."
      ],
      "commonMistakes": [
        "Using Files.readAllLines() on multi-gigabyte files, loading the entire file into memory as String objects and causing java.lang.OutOfMemoryError: Java heap space. Use Files.lines() for streaming.",
        "Forgetting to close Files.lines() or Files.walk() streams inside try-with-resources, exhausting operating system file descriptors.",
        "Using hardcoded string separators like \"\\\" or \"/\" instead of File.separator or Path.of(), causing cross-platform failures on Linux/Windows."
      ],
      "interviewRelevance": "Enterprise backend interviews frequently quiz candidates on I/O vs NIO, handling OutOfMemoryError during file parsing, and try-with-resources suppressed exceptions.",
      "checkpoints": [
        {
          "id": "java-87-cp1",
          "label": "Use Path and Files instead of legacy java.io.File"
        },
        {
          "id": "java-87-cp2",
          "label": "Stream large files using Files.lines() within try-with-resources"
        },
        {
          "id": "java-87-cp3",
          "label": "Apply StandardOpenOption flags for atomic file writes and appends"
        }
      ],
      "practiceExercises": [
        {
          "id": "java-87-ex1",
          "title": "Check File Existence and Attributes",
          "difficulty": "Beginner",
          "type": "coding",
          "prompt": "Write a method that accepts a String filePath, checks if it exists, is a regular file, and is readable, returning true only if all conditions are met.",
          "starterCode": "import java.nio.file.*;\n\npublic class FileChecker {\n    public static boolean isUsableFile(String filePath) {\n        return false;\n    }\n}",
          "solution": "import java.nio.file.*;\n\npublic class FileChecker {\n    public static boolean isUsableFile(String filePath) {\n        Path path = Path.of(filePath);\n        return Files.exists(path) && Files.isRegularFile(path) && Files.isReadable(path);\n    }\n}",
          "explanation": "Files.exists(), Files.isRegularFile(), and Files.isReadable() inspect filesystem attributes without throwing exceptions for missing files."
        },
        {
          "id": "java-87-ex2",
          "title": "Count Word Frequency from File Stream",
          "difficulty": "Intermediate",
          "type": "coding",
          "prompt": "Given a Path to a text file, count the total occurrences of a target word (case-insensitive) using Files.lines() and Streams.",
          "starterCode": "import java.io.IOException;\nimport java.nio.file.*;\n\npublic class WordCounter {\n    public static long countWord(Path path, String target) throws IOException {\n        return 0;\n    }\n}",
          "solution": "import java.io.IOException;\nimport java.nio.file.*;\nimport java.util.Arrays;\n\npublic class WordCounter {\n    public static long countWord(Path path, String target) throws IOException {\n        String lowerTarget = target.toLowerCase();\n        try (var lines = Files.lines(path)) {\n            return lines.flatMap(line -> Arrays.stream(line.split(\"\\\\s+\")))\n                        .filter(word -> word.equalsIgnoreCase(lowerTarget))\n                        .count();\n        }\n    }\n}",
          "explanation": "Files.lines() streams file lines lazily. flatMap splits each line into words without loading the entire file into memory at once."
        },
        {
          "id": "java-87-ex3",
          "title": "Safe Atomic File Replacement",
          "difficulty": "Advanced",
          "type": "coding",
          "prompt": "Implement a method that writes data to a temporary file in the same directory, then atomically moves it to overwrite targetPath using StandardCopyOption.ATOMIC_MOVE.",
          "starterCode": "import java.io.IOException;\nimport java.nio.file.*;\nimport java.util.List;\n\npublic class SafeFileWriter {\n    public static void atomicWrite(Path targetPath, List<String> lines) throws IOException {\n        // Implement atomic write\n    }\n}",
          "solution": "import java.io.IOException;\nimport java.nio.file.*;\nimport java.util.List;\n\npublic class SafeFileWriter {\n    public static void atomicWrite(Path targetPath, List<String> lines) throws IOException {\n        Path parent = targetPath.getParent();\n        if (parent == null) parent = Path.of(\".\");\n\n        Path tempFile = Files.createTempFile(parent, \"atomic_\", \".tmp\");\n        try {\n            Files.write(tempFile, lines, StandardOpenOption.WRITE);\n            Files.move(tempFile, targetPath, StandardCopyOption.ATOMIC_MOVE, StandardCopyOption.REPLACE_EXISTING);\n        } catch (Exception e) {\n            Files.deleteIfExists(tempFile);\n            throw e;\n        }\n    }\n}",
          "explanation": "Writing to a temp file and performing an atomic rename (ATOMIC_MOVE) guarantees that concurrent readers never observe a partially written or corrupted file."
        }
      ],
      "quizQuestions": [
        {
          "id": "java-87-q1",
          "question": "Why should you avoid using `Files.readAllLines(path)` on large files in production services?",
          "options": [
            "Because it converts all characters into uppercase",
            "Because it loads all file lines into heap memory simultaneously as separate String instances, risking OutOfMemoryError",
            "Because it does not support UTF-8 encoding",
            "Because it locks the file indefinitely until JVM restarts"
          ],
          "correctOptionIndex": 1,
          "explanation": "readAllLines reads the entire file into memory at once. For multi-hundred megabyte or gigabyte files, this exhausts heap space. Files.lines() should be used instead."
        },
        {
          "id": "java-87-q2",
          "question": "What interface must an object implement to be eligible for use in a Java `try-with-resources` statement?",
          "options": [
            "java.io.Serializable",
            "java.lang.AutoCloseable",
            "java.lang.Cloneable",
            "java.util.concurrent.Callable"
          ],
          "correctOptionIndex": 1,
          "explanation": "try-with-resources requires the resource to implement java.lang.AutoCloseable (or its subinterface java.io.Closeable)."
        }
      ],
      "revisionNotes": [
        "Prefer `Path.of()` and `Files` over legacy `java.io.File`.",
        "Always wrap `Files.lines()` and `Files.walk()` in try-with-resources to release native file descriptors.",
        "Use `StandardCopyOption.ATOMIC_MOVE` to prevent corrupted reads during file writes."
      ],
      "moduleId": "java-m7",
      "moduleNumber": 7,
      "moduleTitle": "Practical Java",
      "language": "java"
    },
    {
      "id": "java-88-serialization-json",
      "topicNumber": 88,
      "title": "Serialization, transient & JSON Mapping Concepts",
      "level": "Intermediate",
      "whyItMatters": "Data must be converted to wire format for network transmission (REST APIs, Kafka events) or persistent caching (Redis). Understanding Java Native Serialization pitfalls, serialVersionUID, transient fields, and modern JSON mapping (Jackson/Gson) is fundamental.",
      "explanation": "1. Java Native Serialization:\n- Marker interface java.io.Serializable indicates a class can be serialized to a byte stream via ObjectOutputStream.\n- serialVersionUID: A unique 64-bit version identifier. If you change a class without declaring serialVersionUID, the JVM calculates a hash based on class structure; any class change causes InvalidClassException during deserialization.\n- transient keyword: Marks sensitive or non-serializable fields (passwords, thread references, database connections) to be skipped during serialization (deserialized to default value: null or 0).\n\n2. Security Risks of Java Native Serialization:\n- Deserialization vulnerabilities allow attackers to construct malicious byte streams that execute arbitrary code during readObject() (gadget chains).\n- Modern systems avoid Java Native Serialization, using JSON, Protocol Buffers, or Avro instead.\n\n3. Modern JSON Mapping (Jackson / Gson Concepts):\n- Object Mapper translates between Java POJOs/Records and JSON strings.\n- Jackson Annotations: @JsonProperty(\"field_name\"), @JsonIgnore (similar to transient), @JsonFormat.\n- Immutability with Records: Java Records integrate seamlessly with modern JSON parsers without boilerplate getters or constructors.",
      "syntaxAndStructure": "// Declaring serializable class with serialVersionUID and transient field:\npublic class UserSession implements Serializable {\n    private static final long serialVersionUID = 1L;\n    private String username;\n    private transient String passwordHash; // excluded\n}",
      "codeExamples": [
        {
          "title": "Java Serialization with transient and serialVersionUID",
          "code": "import java.io.*;\n\npublic class SerializationDemo {\n    static class Account implements Serializable {\n        private static final long serialVersionUID = 1L;\n        private String accountNumber;\n        private transient String pin; // Will NOT be serialized\n\n        public Account(String accountNumber, String pin) {\n            this.accountNumber = accountNumber;\n            this.pin = pin;\n        }\n\n        @Override\n        public String toString() {\n            return \"Account[num=\" + accountNumber + \", pin=\" + pin + \"]\";\n        }\n    }\n\n    public static void main(String[] args) throws Exception {\n        Account acc = new Account(\"ACC-98765\", \"1234\");\n        byte[] serializedData;\n\n        // Serialize\n        try (ByteArrayOutputStream baos = new ByteArrayOutputStream();\n             ObjectOutputStream oos = new ObjectOutputStream(baos)) {\n            oos.writeObject(acc);\n            serializedData = baos.toByteArray();\n        }\n\n        // Deserialize\n        try (ByteArrayInputStream bais = new ByteArrayInputStream(serializedData);\n             ObjectInputStream ois = new ObjectInputStream(bais)) {\n            Account restored = (Account) ois.readObject();\n            System.out.println(\"Restored: \" + restored);\n        }\n    }\n}",
          "expectedOutput": "Restored: Account[num=ACC-98765, pin=null]",
          "explanation": "Because the pin field is marked transient, it was skipped during serialization and initialized to its default value (null) upon deserialization."
        },
        {
          "title": "JSON Modeling with Java Records",
          "code": "public class JsonModelDemo {\n    // Java Record acts as an immutable DTO for JSON serialization\n    public record UserProfileDto(\n        long id,\n        String email,\n        boolean active\n    ) {\n        // Compact validation constructor\n        public UserProfileDto {\n            if (email == null || !email.contains(\"@\")) {\n                throw new IllegalArgumentException(\"Invalid email\");\n            }\n        }\n    }\n\n    public static void main(String[] args) {\n        UserProfileDto dto = new UserProfileDto(101L, \"dev@example.com\", true);\n        System.out.println(\"DTO created: \" + dto);\n        System.out.println(\"Email: \" + dto.email());\n    }\n}",
          "expectedOutput": "DTO created: UserProfileDto[id=101, email=dev@example.com, active=true]\nEmail: dev@example.com",
          "explanation": "Java Records provide immutable, concise Data Transfer Objects (DTOs) with automatic equals(), hashCode(), and toString(), ideal for JSON mapping libraries."
        }
      ],
      "realWorldApplications": [
        "Distributed session storage replicating user HTTP sessions across a clustered Tomcat/Spring server farm.",
        "REST API controllers converting incoming JSON request payloads into validated Java domain records."
      ],
      "commonMistakes": [
        "Not explicitly defining serialVersionUID: adding a single field or method causes deserialization failures on existing saved data.",
        "Serializing an object that contains references to non-serializable classes (e.g. Thread, Socket, Connection), throwing NotSerializableException.",
        "Using Java native serialization for public web APIs instead of secure, standardized JSON/Protobuf formats."
      ],
      "interviewRelevance": "Interviewers frequently ask about transient keyword behavior, serialVersionUID significance, and why industry has migrated from native serialization to JSON/Protobuf.",
      "checkpoints": [
        {
          "id": "java-88-cp1",
          "label": "Explain the role and calculation of serialVersionUID"
        },
        {
          "id": "java-88-cp2",
          "label": "Use transient to omit sensitive fields from serialization"
        },
        {
          "id": "java-88-cp3",
          "label": "Design clean immutable JSON DTOs using Java Records"
        }
      ],
      "practiceExercises": [
        {
          "id": "java-88-ex1",
          "title": "Define Secure Serializable Class",
          "difficulty": "Beginner",
          "type": "coding",
          "prompt": "Create a class UserCredential implementing Serializable, declaring serialVersionUID = 1L, with username serialized and rawPassword marked transient.",
          "starterCode": "import java.io.Serializable;\n\npublic class UserCredential {\n    // Implement class\n}",
          "solution": "import java.io.Serializable;\n\npublic class UserCredential implements Serializable {\n    private static final long serialVersionUID = 1L;\n    private final String username;\n    private final transient String rawPassword;\n\n    public UserCredential(String username, String rawPassword) {\n        this.username = username;\n        this.rawPassword = rawPassword;\n    }\n\n    public String getUsername() { return username; }\n    public String getRawPassword() { return rawPassword; }\n}",
          "explanation": "Marking rawPassword as transient ensures sensitive credentials are not leaked when the object is persisted or sent across network sockets."
        },
        {
          "id": "java-88-ex2",
          "title": "Deep Copy Object via Serialization",
          "difficulty": "Intermediate",
          "type": "coding",
          "prompt": "Implement a generic method deepCopy(T object) that clones any Serializable object using in-memory byte streams.",
          "starterCode": "import java.io.*;\n\npublic class Cloner {\n    public static <T extends Serializable> T deepCopy(T object) throws Exception {\n        return null;\n    }\n}",
          "solution": "import java.io.*;\n\npublic class Cloner {\n    @SuppressWarnings(\"unchecked\")\n    public static <T extends Serializable> T deepCopy(T object) throws Exception {\n        ByteArrayOutputStream baos = new ByteArrayOutputStream();\n        try (ObjectOutputStream oos = new ObjectOutputStream(baos)) {\n            oos.writeObject(object);\n        }\n\n        try (ByteArrayInputStream bais = new ByteArrayInputStream(baos.toByteArray());\n             ObjectInputStream ois = new ObjectInputStream(bais)) {\n            return (T) ois.readObject();\n        }\n    }\n}",
          "explanation": "Serializing to a ByteArrayOutputStream and deserializing produces an independent, deep copy of the entire object graph."
        },
        {
          "id": "java-88-ex3",
          "title": "Implement Custom Serialization readObject/writeObject",
          "difficulty": "Advanced",
          "type": "coding",
          "prompt": "Write a class EncryptedNote implementing Serializable that encrypts noteText (e.g. reverses it) during writeObject and restores it during readObject.",
          "starterCode": "import java.io.*;\n\npublic class EncryptedNote implements Serializable {\n    private static final long serialVersionUID = 1L;\n    private String text;\n\n    public EncryptedNote(String text) { this.text = text; }\n    public String getText() { return text; }\n    // Implement writeObject and readObject\n}",
          "solution": "import java.io.*;\n\npublic class EncryptedNote implements Serializable {\n    private static final long serialVersionUID = 1L;\n    private String text;\n\n    public EncryptedNote(String text) { this.text = text; }\n    public String getText() { return text; }\n\n    private void writeObject(ObjectOutputStream oos) throws IOException {\n        String reversed = new StringBuilder(text).reverse().toString();\n        oos.writeUTF(reversed);\n    }\n\n    private void readObject(ObjectInputStream ois) throws IOException, ClassNotFoundException {\n        String reversed = ois.readUTF();\n        this.text = new StringBuilder(reversed).reverse().toString();\n    }\n}",
          "explanation": "Declaring private writeObject and readObject allows custom hooks into the JVM serialization pipeline to encrypt, decrypt, or validate fields."
        }
      ],
      "quizQuestions": [
        {
          "id": "java-88-q1",
          "question": "What happens if a class does not declare `serialVersionUID` and is deserialized after adding a new field?",
          "options": [
            "The JVM ignores the new field and succeeds silently",
            "The JVM throws InvalidClassException because the automatically generated serialVersionUID hash changed",
            "The JVM recompiles the class at runtime",
            "The JVM zeroes out all existing object data"
          ],
          "correctOptionIndex": 1,
          "explanation": "If undeclared, the compiler auto-generates a serialVersionUID hash from all fields and methods. Any structural change alters the hash, triggering InvalidClassException."
        },
        {
          "id": "java-88-q2",
          "question": "What value does a `transient int` field take after deserialization?",
          "options": [
            "null",
            "0",
            "-1",
            "Its pre-serialization value"
          ],
          "correctOptionIndex": 1,
          "explanation": "transient fields are omitted from the byte stream. During deserialization, primitive types are initialized to their default values (0 for int, false for boolean, null for objects)."
        }
      ],
      "revisionNotes": [
        "Always declare an explicit `private static final long serialVersionUID = 1L;`.",
        "Mark sensitive and non-serializable fields with `transient`.",
        "Modern applications prefer JSON (Jackson/Gson) or Protobuf over native Java serialization."
      ],
      "moduleId": "java-m7",
      "moduleNumber": 7,
      "moduleTitle": "Practical Java",
      "language": "java"
    },
    {
      "id": "java-89-jdbc",
      "topicNumber": 89,
      "title": "JDBC & Database Connectivity (PreparedStatement & SQL Injection)",
      "level": "Intermediate",
      "whyItMatters": "All Java persistence layers (Hibernate, Spring Data JPA, MyBatis, jOOQ) build on JDBC (Java Database Connectivity). Understanding PreparedStatement parameterized queries prevents SQL injection — the #1 critical database security risk.",
      "explanation": "1. Core JDBC Architecture:\n- DriverManager: Factory that loads vendor database drivers (e.g., PostgreSQL, MySQL, H2) and establishes connections.\n- Connection: Represents a physical socket connection to the database server.\n- Statement vs PreparedStatement:\n  - Statement: Concatenates raw SQL strings. SQL is compiled and parsed on the database on every execution. HIGHLY VULNERABLE TO SQL INJECTION!\n  - PreparedStatement: Pre-compiles the SQL query template on the database engine. Dynamic parameters are bound using placeholders (?) with type-specific setters (setString, setInt). Immune to SQL injection and reused via query cache.\n- ResultSet: Cursor pointing to rows returned by an SQL query. Initially positioned before the first row; advance using rs.next().\n\n2. Why Statement Causes SQL Injection:\nConsider: String sql = \"SELECT * FROM users WHERE user='\" + name + \"' AND pass='\" + pass + \"'\";\nIf attacker enters: name = \"admin' --\"\nThe query executes: SELECT * FROM users WHERE user='admin' -- AND pass='...'\nThe rest of the query is commented out, granting full unauthorized access!\nPreparedStatement treats all parameters as raw data values, never as executable SQL code.",
      "syntaxAndStructure": "// Safe parameterized query with PreparedStatement:\nString sql = \"SELECT id, balance FROM accounts WHERE user_id = ? AND status = ?\";\ntry (PreparedStatement ps = conn.prepareStatement(sql)) {\n    ps.setLong(1, userId);\n    ps.setString(2, \"ACTIVE\");\n    try (ResultSet rs = ps.executeQuery()) {\n        while (rs.next()) {\n            long id = rs.getLong(\"id\");\n        }\n    }\n}",
      "codeExamples": [
        {
          "title": "Safe Query Execution with PreparedStatement and try-with-resources",
          "code": "import java.sql.*;\n\npublic class JdbcDemo {\n    public static void queryUser(Connection conn, int userId) {\n        String sql = \"SELECT id, name, email FROM users WHERE id = ?\";\n\n        // try-with-resources closes PreparedStatement and ResultSet automatically\n        try (PreparedStatement ps = conn.prepareStatement(sql)) {\n            ps.setInt(1, userId); // 1-indexed placeholder\n\n            try (ResultSet rs = ps.executeQuery()) {\n                if (rs.next()) {\n                    int id = rs.getInt(\"id\");\n                    String name = rs.getString(\"name\");\n                    String email = rs.getString(\"email\");\n                    System.out.printf(\"User [%d]: %s (%s)%n\", id, name, email);\n                } else {\n                    System.out.println(\"User not found.\");\n                }\n            }\n        } catch (SQLException e) {\n            System.err.println(\"Database error: \" + e.getMessage());\n        }\n    }\n\n    public static void main(String[] args) {\n        System.out.println(\"PreparedStatement compiles template and binds parameters safely.\");\n    }\n}",
          "expectedOutput": "PreparedStatement compiles template and binds parameters safely.",
          "explanation": "The SQL template is precompiled. The parameter is bound via ps.setInt(1, userId). Resources are closed in reverse order of opening."
        },
        {
          "title": "Batch Insert with PreparedStatement for High Throughput",
          "code": "import java.sql.*;\nimport java.util.List;\n\npublic class BatchInsertDemo {\n    record OrderRecord(int orderId, String item, double amount) {}\n\n    public static void insertBatch(Connection conn, List<OrderRecord> orders) throws SQLException {\n        String sql = \"INSERT INTO orders (id, item, amount) VALUES (?, ?, ?)\";\n\n        try (PreparedStatement ps = conn.prepareStatement(sql)) {\n            for (OrderRecord o : orders) {\n                ps.setInt(1, o.orderId());\n                ps.setString(2, o.item());\n                ps.setDouble(3, o.amount());\n                ps.addBatch(); // Queue insert\n            }\n            int[] results = ps.executeBatch(); // Single network roundtrip\n            System.out.println(\"Inserted orders: \" + results.length);\n        }\n    }\n\n    public static void main(String[] args) {\n        System.out.println(\"Batch execution sends hundreds of rows in a single DB roundtrip.\");\n    }\n}",
          "expectedOutput": "Batch execution sends hundreds of rows in a single DB roundtrip.",
          "explanation": "addBatch() and executeBatch() avoid individual network round-trips for each row, increasing insertion performance by orders of magnitude."
        }
      ],
      "realWorldApplications": [
        "Connection pool implementations like HikariCP maintaining reusable database connections for Spring Boot services.",
        "Auditing and financial reporting systems querying relational databases with strict transaction guarantees."
      ],
      "commonMistakes": [
        "Using string concatenation to build SQL statements, exposing the system to SQL injection vulnerabilities.",
        "Leaking database connections by not closing Connection objects, exhausting the database connection pool.",
        "Remembering that JDBC parameter indices are 1-indexed (ps.setString(1, val)), not 0-indexed!"
      ],
      "interviewRelevance": "Understanding PreparedStatement benefits, SQL injection mechanisms, connection pooling, and JDBC transaction demarcation is fundamental for enterprise backend roles.",
      "checkpoints": [
        {
          "id": "java-89-cp1",
          "label": "Explain why PreparedStatement prevents SQL injection"
        },
        {
          "id": "java-89-cp2",
          "label": "Correctly bind 1-indexed parameters using setInt, setString, setTimestamp"
        },
        {
          "id": "java-89-cp3",
          "label": "Execute high-throughput batch inserts using addBatch() and executeBatch()"
        }
      ],
      "practiceExercises": [
        {
          "id": "java-89-ex1",
          "title": "Safe Login Verification Query",
          "difficulty": "Beginner",
          "type": "coding",
          "prompt": "Write a method authenticate(Connection conn, String user, String passHash) that returns true if user exists with matching password using PreparedStatement.",
          "starterCode": "import java.sql.*;\n\npublic class Authenticator {\n    public static boolean authenticate(Connection conn, String user, String passHash) throws SQLException {\n        return false;\n    }\n}",
          "solution": "import java.sql.*;\n\npublic class Authenticator {\n    public static boolean authenticate(Connection conn, String user, String passHash) throws SQLException {\n        String sql = \"SELECT 1 FROM users WHERE username = ? AND password_hash = ?\";\n        try (PreparedStatement ps = conn.prepareStatement(sql)) {\n            ps.setString(1, user);\n            ps.setString(2, passHash);\n            try (ResultSet rs = ps.executeQuery()) {\n                return rs.next();\n            }\n        }\n    }\n}",
          "explanation": "PreparedStatement binds user and passHash as literals, neutralizing attempts to inject SQL operators or comments."
        },
        {
          "id": "java-89-ex2",
          "title": "Extract Generated Primary Keys",
          "difficulty": "Intermediate",
          "type": "coding",
          "prompt": "Insert a new customer record into customers (name, email) and retrieve the auto-generated primary key using Statement.RETURN_GENERATED_KEYS.",
          "starterCode": "import java.sql.*;\n\npublic class CustomerDao {\n    public static long insertCustomer(Connection conn, String name, String email) throws SQLException {\n        return -1;\n    }\n}",
          "solution": "import java.sql.*;\n\npublic class CustomerDao {\n    public static long insertCustomer(Connection conn, String name, String email) throws SQLException {\n        String sql = \"INSERT INTO customers (name, email) VALUES (?, ?)\";\n        try (PreparedStatement ps = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {\n            ps.setString(1, name);\n            ps.setString(2, email);\n            ps.executeUpdate();\n\n            try (ResultSet rs = ps.getGeneratedKeys()) {\n                if (rs.next()) {\n                    return rs.getLong(1);\n                }\n            }\n        }\n        throw new SQLException(\"Failed to retrieve generated ID.\");\n    }\n}",
          "explanation": "Passing Statement.RETURN_GENERATED_KEYS tells the database driver to return assigned auto-increment or sequence IDs via getGeneratedKeys()."
        },
        {
          "id": "java-89-ex3",
          "title": "Safe Pagination Query Builder",
          "difficulty": "Advanced",
          "type": "coding",
          "prompt": "Write a method that executes a paginated query on products table ordering by price ascending using LIMIT ? OFFSET ? placeholders.",
          "starterCode": "import java.sql.*;\nimport java.util.*;\n\npublic class ProductDao {\n    public static List<String> getPagedProducts(Connection conn, int pageSize, int pageIndex) throws SQLException {\n        return new ArrayList<>();\n    }\n}",
          "solution": "import java.sql.*;\nimport java.util.*;\n\npublic class ProductDao {\n    public static List<String> getPagedProducts(Connection conn, int pageSize, int pageIndex) throws SQLException {\n        List<String> names = new ArrayList<>();\n        String sql = \"SELECT name FROM products ORDER BY price ASC LIMIT ? OFFSET ?\";\n\n        try (PreparedStatement ps = conn.prepareStatement(sql)) {\n            ps.setInt(1, pageSize);\n            ps.setInt(2, pageIndex * pageSize);\n\n            try (ResultSet rs = ps.executeQuery()) {\n                while (rs.next()) {\n                    names.add(rs.getString(\"name\"));\n                }\n            }\n        }\n        return names;\n    }\n}",
          "explanation": "Binding pageSize and calculated offset via PreparedStatement guarantees clean pagination without risk of malformed queries."
        }
      ],
      "quizQuestions": [
        {
          "id": "java-89-q1",
          "question": "Why is `PreparedStatement` immune to SQL injection attacks?",
          "options": [
            "Because it encrypts the SQL string with AES-256",
            "Because the database compiles the SQL query structure first; parameter values are bound as literal data and can never alter the query's syntax tree",
            "Because it forces all database tables to be read-only",
            "Because it only works with stored procedures"
          ],
          "correctOptionIndex": 1,
          "explanation": "PreparedStatement separates code from data. The database compiles the SQL structure with placeholders, and values are injected strictly as data literals."
        },
        {
          "id": "java-89-q2",
          "question": "Are parameter placeholders (?) in JDBC PreparedStatement 0-indexed or 1-indexed?",
          "options": [
            "0-indexed",
            "1-indexed",
            "Dynamic based on database driver",
            "Alpha-indexed"
          ],
          "correctOptionIndex": 1,
          "explanation": "JDBC parameters are strictly 1-indexed: ps.setString(1, val) sets the first question mark placeholder."
        }
      ],
      "revisionNotes": [
        "Always use `PreparedStatement` instead of `Statement` to prevent SQL injection.",
        "Remember JDBC parameter indexes are 1-indexed, not 0-indexed.",
        "Use `addBatch()` and `executeBatch()` for inserting or updating multiple rows efficiently."
      ],
      "moduleId": "java-m7",
      "moduleNumber": 7,
      "moduleTitle": "Practical Java",
      "language": "java"
    },
    {
      "id": "java-90-transactions",
      "topicNumber": 90,
      "title": "SQL Transactions, ACID Properties & Isolation Levels in JDBC",
      "level": "Advanced",
      "whyItMatters": "Financial transfers, booking systems, and e-commerce orders require all-or-nothing guarantees. Understanding ACID, transaction demarcation (setAutoCommit, commit, rollback), and transaction isolation levels prevents data corruption and concurrency anomalies.",
      "explanation": "1. ACID Guarantees:\n- Atomicity: All operations succeed or the entire transaction is rolled back.\n- Consistency: Database transitions from one valid state to another, satisfying all constraints.\n- Isolation: Concurrent transactions do not interfere with each other.\n- Durability: Committed changes survive system crashes or power failures.\n\n2. Programmatic Transaction Demarcation in JDBC:\n- By default, JDBC connections operate in auto-commit mode (every SQL statement commits immediately).\n- To group operations into an atomic transaction:\n  1. conn.setAutoCommit(false);\n  2. Execute updates (e.g., debit sender, credit receiver).\n  3. conn.commit(); (persist changes)\n  4. In catch block: conn.rollback(); (undo all changes on failure)\n  5. In finally block: conn.setAutoCommit(true);\n\n3. The 4 Standard SQL Isolation Levels:\n- READ UNCOMMITTED: Lowest isolation. Allows Dirty Reads (reading uncommitted changes from concurrent transactions).\n- READ COMMITTED: Prevents Dirty Reads. Susceptible to Non-Repeatable Reads (reading row twice gets different values if concurrent transaction updates and commits).\n- REPEATABLE READ: Prevents Dirty and Non-Repeatable Reads. Susceptible to Phantom Reads (querying range twice finds newly inserted rows).\n- SERIALIZABLE: Highest isolation. Fully serial execution, preventing all anomalies at the cost of high lock contention.",
      "syntaxAndStructure": "// Transaction management template:\nconn.setAutoCommit(false);\ntry {\n    // debit account A\n    // credit account B\n    conn.commit();\n} catch (SQLException e) {\n    conn.rollback();\n    throw e;\n} finally {\n    conn.setAutoCommit(true);\n}",
      "codeExamples": [
        {
          "title": "Atomic Bank Account Money Transfer with Rollback",
          "code": "import java.sql.*;\n\npublic class TransactionDemo {\n    public static void transferFunds(Connection conn, long fromAcc, long toAcc, double amount) throws SQLException {\n        String debitSql = \"UPDATE accounts SET balance = balance - ? WHERE id = ? AND balance >= ?\";\n        String creditSql = \"UPDATE accounts SET balance = balance + ? WHERE id = ?\";\n\n        boolean originalAutoCommit = conn.getAutoCommit();\n\n        try {\n            conn.setAutoCommit(false); // Begin transaction\n\n            // 1. Debit sender\n            try (PreparedStatement psDebit = conn.prepareStatement(debitSql)) {\n                psDebit.setDouble(1, amount);\n                psDebit.setLong(2, fromAcc);\n                psDebit.setDouble(3, amount);\n                int rows = psDebit.executeUpdate();\n                if (rows == 0) {\n                    throw new SQLException(\"Insufficient funds or sender account not found!\");\n                }\n            }\n\n            // 2. Credit receiver\n            try (PreparedStatement psCredit = conn.prepareStatement(creditSql)) {\n                psCredit.setDouble(1, amount);\n                psCredit.setLong(2, toAcc);\n                int rows = psCredit.executeUpdate();\n                if (rows == 0) {\n                    throw new SQLException(\"Receiver account not found!\");\n                }\n            }\n\n            conn.commit(); // Commit both operations atomically\n            System.out.println(\"Transfer successful!\");\n        } catch (SQLException e) {\n            conn.rollback(); // Rollback both operations\n            System.err.println(\"Transfer rolled back: \" + e.getMessage());\n            throw e;\n        } finally {\n            conn.setAutoCommit(originalAutoCommit);\n        }\n    }\n\n    public static void main(String[] args) {\n        System.out.println(\"Transaction pattern guarantees money is never lost in transit.\");\n    }\n}",
          "expectedOutput": "Transaction pattern guarantees money is never lost in transit.",
          "explanation": "setAutoCommit(false) starts the transaction. If either debit or credit fails, conn.rollback() restores the initial state, preserving Atomicity and Consistency."
        },
        {
          "title": "Configuring Isolation Levels and Savepoints",
          "code": "import java.sql.*;\n\npublic class SavepointDemo {\n    public static void demonstrateSavepoint(Connection conn) throws SQLException {\n        conn.setAutoCommit(false);\n        // Set isolation level to prevent dirty reads\n        conn.setTransactionIsolation(Connection.TRANSACTION_READ_COMMITTED);\n\n        // Operation 1\n        // ... insert initial record ...\n        Savepoint sp1 = conn.setSavepoint(\"Savepoint1\");\n\n        try {\n            // Operation 2 (risky update)\n            try (Statement stmt = conn.createStatement()) {\n                stmt.executeUpdate(\"UPDATE accounts SET balance = balance - 100 WHERE id = 1\");\n            }\n        } catch (SQLException e) {\n            // Rollback only the risky step, keeping Operation 1 intact!\n            conn.rollback(sp1);\n        }\n\n        conn.commit();\n    }\n\n    public static void main(String[] args) {\n        System.out.println(\"Savepoints allow partial rollbacks within a larger transaction.\");\n    }\n}",
          "expectedOutput": "Savepoints allow partial rollbacks within a larger transaction.",
          "explanation": "Savepoints provide checkpointing within a transaction, allowing partial rollbacks without abandoning earlier completed work."
        }
      ],
      "realWorldApplications": [
        "Banking core transaction engines processing peer-to-peer payments and currency exchanges.",
        "E-commerce checkout pipelines reserving stock inventory, creating invoice records, and charging payment cards."
      ],
      "commonMistakes": [
        "Forgetting to reset conn.setAutoCommit(true) in a finally block, leaving the connection in manual-commit mode when returned to a shared pool.",
        "Holding transactions open across slow network I/O calls (e.g. calling third-party payment gateways inside an open database transaction), holding database table locks and creating connection pool exhaustion.",
        "Failing to handle DeadlockException (SQL state 40001) by implementing retry mechanisms with exponential backoff."
      ],
      "interviewRelevance": "ACID properties, isolation levels (dirty reads, non-repeatable reads, phantom reads), and transaction demarcation are standard questions for backend engineering candidates at Stripe, Square, and Goldman Sachs.",
      "checkpoints": [
        {
          "id": "java-90-cp1",
          "label": "Manage transactions using setAutoCommit(false), commit(), and rollback()"
        },
        {
          "id": "java-90-cp2",
          "label": "Distinguish between the 4 SQL isolation levels and their concurrency anomalies"
        },
        {
          "id": "java-90-cp3",
          "label": "Keep transaction duration minimal to prevent database lock contention"
        }
      ],
      "practiceExercises": [
        {
          "id": "java-90-ex1",
          "title": "Inspect Current Isolation Level",
          "difficulty": "Beginner",
          "type": "coding",
          "prompt": "Write a method that inspects a Connection and returns a human-readable String representing its isolation level (\"READ_UNCOMMITTED\", \"READ_COMMITTED\", etc.).",
          "starterCode": "import java.sql.*;\n\npublic class IsolationInspector {\n    public static String getIsolationLevelName(Connection conn) throws SQLException {\n        return \"\";\n    }\n}",
          "solution": "import java.sql.*;\n\npublic class IsolationInspector {\n    public static String getIsolationLevelName(Connection conn) throws SQLException {\n        return switch (conn.getTransactionIsolation()) {\n            case Connection.TRANSACTION_READ_UNCOMMITTED -> \"READ_UNCOMMITTED\";\n            case Connection.TRANSACTION_READ_COMMITTED -> \"READ_COMMITTED\";\n            case Connection.TRANSACTION_REPEATABLE_READ -> \"REPEATABLE_READ\";\n            case Connection.TRANSACTION_SERIALIZABLE -> \"SERIALIZABLE\";\n            default -> \"UNKNOWN\";\n        };\n    }\n}",
          "explanation": "conn.getTransactionIsolation() returns standard integer constants defined on java.sql.Connection."
        },
        {
          "id": "java-90-ex2",
          "title": "Transactional Order Placement",
          "difficulty": "Intermediate",
          "type": "coding",
          "prompt": "Implement placeOrder(Connection conn, long userId, long productId, int quantity) that decrements inventory and inserts an order record atomically.",
          "starterCode": "import java.sql.*;\n\npublic class OrderService {\n    public static void placeOrder(Connection conn, long userId, long productId, int quantity) throws SQLException {\n        // Implement atomic transaction\n    }\n}",
          "solution": "import java.sql.*;\n\npublic class OrderService {\n    public static void placeOrder(Connection conn, long userId, long productId, int quantity) throws SQLException {\n        boolean auto = conn.getAutoCommit();\n        conn.setAutoCommit(false);\n\n        String decrSql = \"UPDATE products SET stock = stock - ? WHERE id = ? AND stock >= ?\";\n        String orderSql = \"INSERT INTO orders (user_id, product_id, quantity) VALUES (?, ?, ?)\";\n\n        try {\n            try (PreparedStatement psStock = conn.prepareStatement(decrSql)) {\n                psStock.setInt(1, quantity);\n                psStock.setLong(2, productId);\n                psStock.setInt(3, quantity);\n                if (psStock.executeUpdate() == 0) {\n                    throw new SQLException(\"Product out of stock or does not exist!\");\n                }\n            }\n\n            try (PreparedStatement psOrder = conn.prepareStatement(orderSql)) {\n                psOrder.setLong(1, userId);\n                psOrder.setLong(2, productId);\n                psOrder.setInt(3, quantity);\n                psOrder.executeUpdate();\n            }\n\n            conn.commit();\n        } catch (SQLException e) {\n            conn.rollback();\n            throw e;\n        } finally {\n            conn.setAutoCommit(auto);\n        }\n    }\n}",
          "explanation": "Ensures inventory is deducted and order record created in the same atomic transaction with automatic rollback if stock is insufficient."
        },
        {
          "id": "java-90-ex3",
          "title": "Optimistic Locking with Version Field",
          "difficulty": "Advanced",
          "type": "coding",
          "prompt": "Implement updateWithOptimisticLock(Connection conn, long id, String newStatus, int expectedVersion) that updates status and increments version only if version matches.",
          "starterCode": "import java.sql.*;\n\npublic class OptimisticLockDao {\n    public static boolean updateStatus(Connection conn, long id, String newStatus, int expectedVersion) throws SQLException {\n        return false;\n    }\n}",
          "solution": "import java.sql.*;\n\npublic class OptimisticLockDao {\n    public static boolean updateStatus(Connection conn, long id, String newStatus, int expectedVersion) throws SQLException {\n        String sql = \"UPDATE documents SET status = ?, version = version + 1 WHERE id = ? AND version = ?\";\n        try (PreparedStatement ps = conn.prepareStatement(sql)) {\n            ps.setString(1, newStatus);\n            ps.setLong(2, id);\n            ps.setInt(3, expectedVersion);\n            int updatedRows = ps.executeUpdate();\n            return updatedRows == 1; // False if concurrent update modified version\n        }\n    }\n}",
          "explanation": "Optimistic locking avoids database lock contention by checking expectedVersion in the WHERE clause. If another transaction updated the row first, updatedRows will be 0."
        }
      ],
      "quizQuestions": [
        {
          "id": "java-90-q1",
          "question": "What concurrency anomaly is prevented by moving from READ UNCOMMITTED to READ COMMITTED isolation level?",
          "options": [
            "Phantom Read",
            "Non-Repeatable Read",
            "Dirty Read",
            "Lost Update"
          ],
          "correctOptionIndex": 2,
          "explanation": "READ COMMITTED guarantees that a transaction will only read data that has already been committed by other transactions, preventing Dirty Reads."
        },
        {
          "id": "java-90-q2",
          "question": "Why should third-party REST API calls never be placed inside an active database transaction block?",
          "options": [
            "Because HTTP is incompatible with JDBC",
            "Because slow or unresponsive external API calls keep the database transaction and database row/table locks open indefinitely, exhausting connection pools",
            "Because Java cannot serialize HTTP requests into SQL",
            "Because the database driver will automatically close the socket"
          ],
          "correctOptionIndex": 1,
          "explanation": "External network I/O can take seconds to complete or time out. Holding database locks during network calls creates massive contention and connection pool exhaustion."
        }
      ],
      "revisionNotes": [
        "ACID: Atomicity, Consistency, Isolation, Durability.",
        "Always restore `conn.setAutoCommit(true)` in a finally block.",
        "Isolation levels trade off concurrency anomalies (dirty, non-repeatable, phantom reads) against performance."
      ],
      "moduleId": "java-m7",
      "moduleNumber": 7,
      "moduleTitle": "Practical Java",
      "language": "java"
    },
    {
      "id": "java-91-junit5",
      "topicNumber": 91,
      "title": "Unit Testing with JUnit 5 & Mockito Fundamentals",
      "level": "Intermediate",
      "whyItMatters": "Unit testing proves code correctness and prevents regressions. JUnit 5 (Jupiter) is the modern industry standard for Java testing, featuring clean lifecycle annotations, assertAll grouping, and seamless Mockito integration.",
      "explanation": "1. JUnit 5 Architecture (JUnit Platform + Jupiter + Vintage):\n- Jupiter is the test engine and programming model for JUnit 5.\n- Lifecycle Annotations:\n  - @BeforeAll / @AfterAll: Run once before/after all tests in the class (must be static unless @TestInstance(Lifecycle.PER_CLASS)).\n  - @BeforeEach / @AfterEach: Run before/after every single @Test method to initialize or clean state.\n  - @Test: Marks a test method (no longer requires public in JUnit 5).\n  - @DisplayName: Human-readable test names.\n  - @ParameterizedTest: Runs a single test across multiple inputs (@ValueSource, @CsvSource, @MethodSource).\n\n2. Modern Assertions:\n- assertEquals(expected, actual)\n- assertThrows(ExpectedException.class, () -> executable) ensures exceptions are thrown.\n- assertAll(\"grouped assertions\", ...) executes all assertions even if earlier ones fail.\n\n3. Mockito Fundamentals:\n- @Mock: Creates mock instance of a dependency.\n- @InjectMocks: Injects created mocks into the tested class.\n- when(mock.method()).thenReturn(value) defines stubbed behavior.\n- verify(mock, times(1)).method() verifies interactions.",
      "syntaxAndStructure": "// JUnit 5 parameterized test with assertions:\n@ParameterizedTest\n@ValueSource(ints = {2, 4, 6, 8})\nvoid testEvenNumbers(int number) {\n    assertTrue(number % 2 == 0);\n}",
      "codeExamples": [
        {
          "title": "JUnit 5 Lifecycle, Grouped Assertions & Exception Testing",
          "code": "public class CalculatorTestSample {\n    static class Calculator {\n        int add(int a, int b) { return a + b; }\n        int divide(int a, int b) {\n            if (b == 0) throw new ArithmeticException(\"Division by zero\");\n            return a / b;\n        }\n    }\n\n    public static void main(String[] args) {\n        Calculator calc = new Calculator();\n\n        // 1. Assert normal operation\n        assert calc.add(2, 3) == 5 : \"Addition test failed\";\n\n        // 2. Assert exception throwing\n        boolean exceptionThrown = false;\n        try {\n            calc.divide(10, 0);\n        } catch (ArithmeticException e) {\n            exceptionThrown = true;\n        }\n        assert exceptionThrown : \"Expected ArithmeticException not thrown\";\n\n        System.out.println(\"Unit test logic verified successfully!\");\n    }\n}",
          "expectedOutput": "Unit test logic verified successfully!",
          "explanation": "Demonstrates unit testing principles: asserting expected return values and verifying that invalid arguments trigger expected runtime exceptions."
        },
        {
          "title": "Mockito Mocking Pattern Concept",
          "code": "public class MockitoPatternDemo {\n    interface PaymentGateway {\n        boolean processPayment(String card, double amount);\n    }\n\n    static class CheckoutService {\n        private final PaymentGateway gateway;\n        CheckoutService(PaymentGateway gateway) { this.gateway = gateway; }\n\n        public boolean checkout(String card, double amount) {\n            if (amount <= 0) return false;\n            return gateway.processPayment(card, amount);\n        }\n    }\n\n    public static void main(String[] args) {\n        // Mock implementation for isolated unit testing\n        PaymentGateway mockGateway = (card, amount) -> true;\n        CheckoutService service = new CheckoutService(mockGateway);\n\n        boolean result = service.checkout(\"1234-5678\", 99.99);\n        System.out.println(\"Checkout with mock gateway: \" + result);\n    }\n}",
          "expectedOutput": "Checkout with mock gateway: true",
          "explanation": "Mocking isolates the unit under test (CheckoutService) from external side-effects (payment networks, third-party APIs)."
        }
      ],
      "realWorldApplications": [
        "Continuous Integration (CI) build pipelines failing builds if unit tests fail or code coverage drops below 80%.",
        "Test-Driven Development (TDD) writing failing unit tests before implementing production business logic."
      ],
      "commonMistakes": [
        "Testing multiple unrelated behaviors in a single test without assertAll, hiding later failures if the first assertion fails.",
        "Over-mocking: mocking data classes (DTOs, Pojos) instead of mocking external services or database repositories.",
        "Using JUnit 4 imports (org.junit.Test) mixed with JUnit 5 (org.junit.jupiter.api.Test), causing tests to be ignored by the Jupiter test engine."
      ],
      "interviewRelevance": "Writing testable code, dependency injection for mockability, and parameterized testing are heavily evaluated in design and coding interviews.",
      "checkpoints": [
        {
          "id": "java-91-cp1",
          "label": "Use JUnit 5 annotations (@Test, @BeforeEach, @DisplayName, @ParameterizedTest)"
        },
        {
          "id": "java-91-cp2",
          "label": "Assert exceptions using assertThrows and group checks with assertAll"
        },
        {
          "id": "java-91-cp3",
          "label": "Mock external dependencies using Mockito (when, thenReturn, verify)"
        }
      ],
      "practiceExercises": [
        {
          "id": "java-91-ex1",
          "title": "Test Palindrome Verifier",
          "difficulty": "Beginner",
          "type": "coding",
          "prompt": "Implement a method isPalindrome(String s) and write validation checks for typical cases (\"racecar\", \"hello\", empty string).",
          "starterCode": "public class PalindromeChecker {\n    public static boolean isPalindrome(String s) {\n        return false;\n    }\n}",
          "solution": "public class PalindromeChecker {\n    public static boolean isPalindrome(String s) {\n        if (s == null) return false;\n        int left = 0, right = s.length() - 1;\n        while (left < right) {\n            if (s.charAt(left++) != s.charAt(right--)) return false;\n        }\n        return true;\n    }\n}",
          "explanation": "Tests verify correctness across symmetric words, asymmetric words, and edge cases like empty and null strings."
        },
        {
          "id": "java-91-ex2",
          "title": "Assert Exception on Invalid Age",
          "difficulty": "Intermediate",
          "type": "coding",
          "prompt": "Create a class VoterRegistration with register(int age) that throws IllegalArgumentException(\"Age must be >= 18\") if age < 18.",
          "starterCode": "public class VoterRegistration {\n    public static void register(int age) {\n        // Implement validation\n    }\n}",
          "solution": "public class VoterRegistration {\n    public static void register(int age) {\n        if (age < 18) {\n            throw new IllegalArgumentException(\"Age must be >= 18\");\n        }\n    }\n}",
          "explanation": "Unit tests verify this method using assertThrows(IllegalArgumentException.class, () -> VoterRegistration.register(16))."
        },
        {
          "id": "java-91-ex3",
          "title": "Mock Dependency in Service Test",
          "difficulty": "Advanced",
          "type": "coding",
          "prompt": "Design an OrderNotificationService that takes an EmailClient interface and sends an email. Ensure it does not attempt network calls when customer email is null.",
          "starterCode": "public class OrderNotificationService {\n    public interface EmailClient {\n        void send(String to, String msg);\n    }\n    // Implement service\n}",
          "solution": "public class OrderNotificationService {\n    public interface EmailClient {\n        void send(String to, String msg);\n    }\n\n    private final EmailClient emailClient;\n    public OrderNotificationService(EmailClient emailClient) {\n        this.emailClient = emailClient;\n    }\n\n    public boolean notifyCustomer(String email, String orderId) {\n        if (email == null || email.isBlank()) {\n            return false;\n        }\n        emailClient.send(email, \"Your order \" + orderId + \" is confirmed!\");\n        return true;\n    }\n}",
          "explanation": "In tests, a mock EmailClient verifies that emailClient.send() is called when email is valid, and never called when email is null."
        }
      ],
      "quizQuestions": [
        {
          "id": "java-91-q1",
          "question": "What is the advantage of using `assertAll()` in JUnit 5 over individual assertions?",
          "options": [
            "It runs tests concurrently on multiple CPU threads",
            "It executes every assertion in the group and reports all failures together, instead of stopping at the first failed assertion",
            "It automatically retries failed tests 3 times",
            "It generates HTML coverage reports"
          ],
          "correctOptionIndex": 1,
          "explanation": "assertAll guarantees that all enclosed assertions are executed. If multiple assertions fail, it reports all failed messages simultaneously."
        },
        {
          "id": "java-91-q2",
          "question": "Which JUnit 5 annotation is used to run the same test method multiple times with different arguments?",
          "options": [
            "@RepeatedTest",
            "@ParameterizedTest",
            "@DynamicTest",
            "@TestFactory"
          ],
          "correctOptionIndex": 1,
          "explanation": "@ParameterizedTest combined with argument sources (@ValueSource, @CsvSource, @MethodSource) runs the test across multiple test vectors."
        }
      ],
      "revisionNotes": [
        "JUnit 5 methods do not need to be `public`.",
        "Use `assertThrows` to verify expected exception types and messages.",
        "Mock external services and repositories; do not mock simple DTOs or values."
      ],
      "moduleId": "java-m7",
      "moduleNumber": 7,
      "moduleTitle": "Practical Java",
      "language": "java"
    },
    {
      "id": "java-92-debugging",
      "topicNumber": 92,
      "title": "Debugging, Stack Trace Analysis & Exception Best Practices",
      "level": "Intermediate",
      "whyItMatters": "Diagnosing production outages requires reading JVM stack traces, understanding exception chaining, analyzing JVM thread dumps, and designing meaningful custom exception hierarchies without losing root causes.",
      "explanation": "1. Anatomizing a JVM Stack Trace:\n- Top line: Exception type and message: java.lang.NullPointerException: Cannot invoke \"...\".\n- Call frames: Sequence of method calls leading to the failure, ordered from deepest (failure site at top) to oldest (entry point at bottom).\n- \"Caused by:\" (Exception Chaining): Shows the underlying root cause preserved via Throwable.initCause() or new CustomException(message, cause).\n\n2. Exception Handling Anti-Patterns to Avoid:\n- Swallowing Exceptions: catch (Exception e) {} (silently ignores errors, creating impossible-to-debug states).\n- Catching Throwable: Catches JVM Errors like OutOfMemoryError and StackOverflowError that should terminate the process.\n- Log and Throw: Logging an error and throwing it up causes duplicate identical log messages at every stack level.\n- Losing the Cause: throw new BusinessException(\"failed\") instead of throw new BusinessException(\"failed\", e).\n\n3. Diagnosing JVM Crashes & Thread Dumps:\n- OutOfMemoryError (Heap vs Metaspace): Enable -XX:+HeapDumpOnOutOfMemoryError -XX:HeapDumpPath=/dumps to analyze heap dumps in Eclipse MAT or JProfiler.\n- Deadlock diagnosis: Generate thread dump via jcmd <pid> Thread.print or jstack <pid> to find threads waiting for monitors held by each other.",
      "syntaxAndStructure": "// Proper exception wrapping preserving root cause:\ntry {\n    executeDatabaseQuery();\n} catch (SQLException e) {\n    throw new ServiceUnavailableException(\"Database lookup failed for user \" + userId, e);\n}",
      "codeExamples": [
        {
          "title": "Preserving Root Cause with Exception Chaining",
          "code": "public class ExceptionChainingDemo {\n    static class DataAccessException extends RuntimeException {\n        public DataAccessException(String message, Throwable cause) {\n            super(message, cause); // Preserves original root cause\n        }\n    }\n\n    public static void loadConfig() {\n        try {\n            // Simulate low-level failure\n            throw new java.io.FileNotFoundException(\"config.yaml not found on classpath\");\n        } catch (java.io.FileNotFoundException e) {\n            // Wrap in domain exception with cause\n            throw new DataAccessException(\"Failed to initialize system configuration\", e);\n        }\n    }\n\n    public static void main(String[] args) {\n        try {\n            loadConfig();\n        } catch (DataAccessException e) {\n            System.out.println(\"Caught: \" + e.getMessage());\n            System.out.println(\"Root cause: \" + e.getCause().getClass().getName() + \" - \" + e.getCause().getMessage());\n        }\n    }\n}",
          "expectedOutput": "Caught: Failed to initialize system configuration\nRoot cause: java.io.FileNotFoundException - config.yaml not found on classpath",
          "explanation": "Passing the caught exception e to super(message, cause) preserves the original root cause, visible in stack traces under \"Caused by:\"."
        },
        {
          "title": "Defensive Exception Handling with Helpful Context",
          "code": "public class ContextualExceptionDemo {\n    public static int parseAge(String input) {\n        if (input == null || input.isBlank()) {\n            throw new IllegalArgumentException(\"Age input cannot be null or blank\");\n        }\n        try {\n            int age = Integer.parseInt(input);\n            if (age < 0 || age > 150) {\n                throw new IllegalArgumentException(\"Age out of reasonable range [0..150]: \" + age);\n            }\n            return age;\n        } catch (NumberFormatException e) {\n            throw new IllegalArgumentException(\"Invalid age format: '\" + input + \"'\", e);\n        }\n    }\n\n    public static void main(String[] args) {\n        try {\n            parseAge(\"not_a_number\");\n        } catch (IllegalArgumentException e) {\n            System.out.println(\"Contextual error: \" + e.getMessage());\n        }\n    }\n}",
          "expectedOutput": "Contextual error: Invalid age format: 'not_a_number'",
          "explanation": "Including the invalid input string in the exception message helps developers diagnose the bad payload immediately from error logs."
        }
      ],
      "realWorldApplications": [
        "Production incident response teams analyzing Datadog/Splunk stack traces during microservice outages.",
        "APM tools (Dynatrace, New Relic) tracing distributed exceptions across HTTP boundaries."
      ],
      "commonMistakes": [
        "Throwing raw generic Exception or RuntimeException without descriptive messages or types.",
        "Catching NullPointerException instead of fixing the root cause with null-safe checks (Objects.requireNonNull, Optional).",
        "Ignoring \"Caused by:\" lines in stack traces and only looking at the topmost exception message."
      ],
      "interviewRelevance": "Senior engineers must demonstrate mastery in diagnosing production incidents, interpreting thread dumps, and designing clean exception hierarchies.",
      "checkpoints": [
        {
          "id": "java-92-cp1",
          "label": "Trace errors through JVM stack traces and \"Caused by:\" chains"
        },
        {
          "id": "java-92-cp2",
          "label": "Avoid anti-patterns: swallowing exceptions, catching Throwable, and log-and-throw"
        },
        {
          "id": "java-92-cp3",
          "label": "Preserve root causes when wrapping exceptions with custom domain exceptions"
        }
      ],
      "practiceExercises": [
        {
          "id": "java-92-ex1",
          "title": "Design Custom Domain Exception Hierarchy",
          "difficulty": "Beginner",
          "type": "coding",
          "prompt": "Create a base PaymentException and a subclass InsufficientBalanceException with amount and available fields.",
          "starterCode": "public class PaymentException extends RuntimeException {\n    // Implement hierarchy\n}",
          "solution": "public class PaymentException extends RuntimeException {\n    public PaymentException(String message) { super(message); }\n    public PaymentException(String message, Throwable cause) { super(message, cause); }\n\n    public static class InsufficientBalanceException extends PaymentException {\n        private final double required;\n        private final double available;\n\n        public InsufficientBalanceException(double required, double available) {\n            super(String.format(\"Insufficient balance: required $%.2f, available $%.2f\", required, available));\n            this.required = required;\n            this.available = available;\n        }\n\n        public double getRequired() { return required; }\n        public double getAvailable() { return available; }\n    }\n}",
          "explanation": "Strongly-typed custom exceptions allow calling code to catch specific business errors and inspect context fields programmaticallly."
        },
        {
          "id": "java-92-ex2",
          "title": "Safe Resource Extraction with Context",
          "difficulty": "Intermediate",
          "type": "coding",
          "prompt": "Write a method requireNonBlank(String str, String fieldName) that validates strings and throws IllegalArgumentException with the fieldName if invalid.",
          "starterCode": "public class ValidationHelper {\n    public static String requireNonBlank(String str, String fieldName) {\n        return \"\";\n    }\n}",
          "solution": "public class ValidationHelper {\n    public static String requireNonBlank(String str, String fieldName) {\n        if (str == null || str.isBlank()) {\n            throw new IllegalArgumentException(\"Field '\" + fieldName + \"' must not be null or blank\");\n        }\n        return str;\n    }\n}",
          "explanation": "Explicit validation with specific field names prevents cryptic NullPointerExceptions deeper in the execution flow."
        },
        {
          "id": "java-92-ex3",
          "title": "Retry Template with Exponential Backoff",
          "difficulty": "Advanced",
          "type": "coding",
          "prompt": "Implement a generic retry method executeWithRetry(Callable<T> task, int maxRetries, long initialDelayMs) that catches Exception and retries with exponential backoff.",
          "starterCode": "import java.util.concurrent.Callable;\n\npublic class RetryExecutor {\n    public static <T> T executeWithRetry(Callable<T> task, int maxRetries, long initialDelayMs) throws Exception {\n        return null;\n    }\n}",
          "solution": "import java.util.concurrent.Callable;\n\npublic class RetryExecutor {\n    public static <T> T executeWithRetry(Callable<T> task, int maxRetries, long initialDelayMs) throws Exception {\n        long delay = initialDelayMs;\n        Exception lastException = null;\n\n        for (int attempt = 1; attempt <= maxRetries; attempt++) {\n            try {\n                return task.call();\n            } catch (Exception e) {\n                lastException = e;\n                if (attempt == maxRetries) break;\n                Thread.sleep(delay);\n                delay *= 2; // Exponential backoff\n            }\n        }\n        throw new RuntimeException(\"Operation failed after \" + maxRetries + \" attempts\", lastException);\n    }\n}",
          "explanation": "Retries transient failures with exponential delay, wrapping the final failure in a descriptive exception while preserving the last root cause."
        }
      ],
      "quizQuestions": [
        {
          "id": "java-92-q1",
          "question": "Why is \"Log and Throw\" (logging an exception and then immediately throwing it) considered an anti-pattern?",
          "options": [
            "Because logging slows down JVM garbage collection",
            "Because every layer in the call stack will catch, log, and rethrow the same error, cluttering log files with redundant duplicate stack traces",
            "Because the logger will delete the exception object",
            "Because Java prohibits logging inside catch blocks"
          ],
          "correctOptionIndex": 1,
          "explanation": "Log and Throw results in the same error being logged 5-10 times as it bubbles up through controller, service, and repository layers, flooding log indexes."
        },
        {
          "id": "java-92-q2",
          "question": "Which JVM option automatically captures a heap dump when an OutOfMemoryError occurs in production?",
          "options": [
            "-XX:+HeapDumpOnOutOfMemoryError",
            "-Xlog:gc*",
            "-Djava.heap.dump=true",
            "-XX:+PrintGCDetails"
          ],
          "correctOptionIndex": 0,
          "explanation": "-XX:+HeapDumpOnOutOfMemoryError instructs the HotSpot JVM to write an HPROF memory dump to disk immediately before crashing."
        }
      ],
      "revisionNotes": [
        "Always preserve root causes using `new CustomException(\"message\", cause)`.",
        "Never catch `Throwable` or swallow exceptions with empty catch blocks.",
        "Include contextual values (IDs, usernames, file paths) in exception messages."
      ],
      "moduleId": "java-m7",
      "moduleNumber": 7,
      "moduleTitle": "Practical Java",
      "language": "java"
    },
    {
      "id": "java-93-logging",
      "topicNumber": 93,
      "title": "Logging Frameworks (SLF4J, Logback & Log4j2) & MDC Tracing",
      "level": "Intermediate",
      "whyItMatters": "Never use System.out.println in production! It is unbuffered, synchronous, lacks log levels, timestamps, and thread context. Modern enterprise Java relies on SLF4J with Logback or Log4j2, utilizing MDC (Mapped Diagnostic Context) to trace requests across microservices.",
      "explanation": "1. SLF4J (Simple Logging Facade for Java):\n- SLF4J is an abstraction (interface) layer. Your code depends only on org.slf4j.Logger.\n- The underlying logging implementation (Logback, Log4j2) is bound at runtime.\n- Parameterized Logging: logger.info(\"User {} logged in from IP {}\", userId, ip); eliminates string concatenation overhead when the log level is disabled!\n\n2. Standard Log Levels (in order of increasing severity):\n- TRACE: Extremely granular diagnostic information.\n- DEBUG: Useful information for developers during debugging.\n- INFO: Normal operational events (startup, shutdown, milestone completed).\n- WARN: Unexpected situations that the system recovered from (cache miss, fallback used).\n- ERROR: Serious runtime errors requiring engineer attention (database failure, unhandled exception).\n\n3. MDC (Mapped Diagnostic Context):\n- Thread-local map (org.slf4j.MDC) that associates contextual data (requestId, userId, tenantId) with the current thread.\n- Log appenders automatically inject MDC values into every log statement format pattern: [%X{requestId}] %msg%n.\n- Essential for tracing distributed requests in multi-threaded microservice architectures.",
      "syntaxAndStructure": "// SLF4J logger declaration and parameterized usage:\nprivate static final Logger log = LoggerFactory.getLogger(UserService.class);\nlog.info(\"Processing order {} for customer {}\", orderId, customerId);",
      "codeExamples": [
        {
          "title": "Parameterized Logging and MDC Context Tracing Concept",
          "code": "public class MdcConceptDemo {\n    static class FakeMDC {\n        private static final ThreadLocal<String> requestId = new ThreadLocal<>();\n        public static void put(String reqId) { requestId.set(reqId); }\n        public static String get() { return requestId.get(); }\n        public static void clear() { requestId.remove(); }\n    }\n\n    public static void handleRequest(String user) {\n        FakeMDC.put(\"1001\");\n        try {\n            logInfo(\"Received request for user: \" + user);\n            // Process request...\n            logInfo(\"Request completed successfully.\");\n        } finally {\n            FakeMDC.clear(); // Always clear thread-local context!\n        }\n    }\n\n    private static void logInfo(String message) {\n        System.out.printf(\"[%s] [INFO] [req-%s] %s%n\",\n            Thread.currentThread().getName(), FakeMDC.get(), message);\n    }\n\n    public static void main(String[] args) {\n        handleRequest(\"alice_99\");\n    }\n}",
          "expectedOutput": "[main] [INFO] [req-1001] Received request for user: alice_99\n[main] [INFO] [req-1001] Request completed successfully.",
          "explanation": "MDC associates a request ID with the current thread. Every subsequent log line automatically includes [req-xxxx] without passing requestId through method arguments."
        },
        {
          "title": "Avoiding String Concatenation Overhead in Logging",
          "code": "public class LoggingEfficiencyDemo {\n    public static void main(String[] args) {\n        String user = \"bob\";\n        int attempts = 3;\n\n        // GOOD: Parameterized format (SLF4J style)\n        // String formatting only executes if log level is enabled!\n        System.out.printf(\"Failed login for %s after %d attempts%n\", user, attempts);\n\n        System.out.println(\"Parameterized logging prevents wasted string allocations.\");\n    }\n}",
          "expectedOutput": "Failed login for bob after 3 attempts\nParameterized logging prevents wasted string allocations.",
          "explanation": "Using curly brace placeholders {} in SLF4J defers string creation until after checking if the log level is active, saving millions of garbage allocations."
        }
      ],
      "realWorldApplications": [
        "Centralized log aggregation in ElasticSearch/Logstash/Kibana (ELK stack) or Grafana Loki.",
        "Distributed request correlation filtering all logs belonging to a single transaction via correlation-id."
      ],
      "commonMistakes": [
        "Using System.out.println in production code: cannot be filtered by level, cannot be redirected asynchronously, and blocks threads.",
        "Forgetting to call MDC.clear() in a finally block: threads in a web server thread pool are reused, causing future requests to inherit stale request IDs.",
        "Logging sensitive Personally Identifiable Information (PII) like raw passwords, credit card numbers, or social security numbers."
      ],
      "interviewRelevance": "Logging best practices, asynchronous logging throughput, and MDC request tracing are key topics in systems design and production readiness interviews.",
      "checkpoints": [
        {
          "id": "java-93-cp1",
          "label": "Use SLF4J parameterized logging ({}) to eliminate string concatenation cost"
        },
        {
          "id": "java-93-cp2",
          "label": "Select appropriate log levels (TRACE, DEBUG, INFO, WARN, ERROR)"
        },
        {
          "id": "java-93-cp3",
          "label": "Attach request tracing IDs via MDC and always clear in a finally block"
        }
      ],
      "practiceExercises": [
        {
          "id": "java-93-ex1",
          "title": "Identify Correct Log Levels",
          "difficulty": "Beginner",
          "type": "conceptual",
          "prompt": "Assign appropriate log levels (DEBUG, INFO, WARN, ERROR) for: (1) Database connection pool exhausted, (2) User updated email address, (3) HTTP request header payload for diagnosis, (4) Primary cache missed, falling back to database.",
          "solution": "1. Database connection pool exhausted: ERROR (critical service degradation).\n2. User updated email address: INFO (normal milestone business event).\n3. HTTP request header payload for diagnosis: DEBUG or TRACE (diagnostic details).\n4. Primary cache missed, falling back to database: WARN (repaired anomaly).",
          "explanation": "Using the correct level ensures alerts trigger only for genuine issues while keeping production logs informative without noise."
        },
        {
          "id": "java-93-ex2",
          "title": "MDC Context Scope Wrapper",
          "difficulty": "Intermediate",
          "type": "coding",
          "prompt": "Write a utility method withMdcContext(String key, String val, Runnable task) that sets the MDC key, executes the task, and guarantees the key is removed in finally.",
          "starterCode": "public class MdcHelper {\n    public static void withMdcContext(String key, String val, Runnable task) {\n        // Implement safe wrapper\n    }\n}",
          "solution": "import org.slf4j.MDC;\n\npublic class MdcHelper {\n    public static void withMdcContext(String key, String val, Runnable task) {\n        MDC.put(key, val);\n        try {\n            task.run();\n        } finally {\n            MDC.remove(key);\n        }\n    }\n}",
          "explanation": "Guarantees that thread-local MDC values are removed even if the runnable throws an unhandled exception."
        },
        {
          "id": "java-93-ex3",
          "title": "Mask Sensitive PII in Log Messages",
          "difficulty": "Advanced",
          "type": "coding",
          "prompt": "Implement a method maskCreditCard(String message) that replaces all 16-digit credit card numbers (e.g. 1234-5678-9012-3456) with ****-****-****-3456 before logging.",
          "starterCode": "public class PiiMasker {\n    public static String maskCreditCard(String message) {\n        return message;\n    }\n}",
          "solution": "public class PiiMasker {\n    public static String maskCreditCard(String message) {\n        if (message == null) return null;\n        return message.replaceAll(\"(\\\\d{4})-(\\\\d{4})-(\\\\d{4})-(\\\\d{4})\", \"****-****-****-$4\");\n    }\n}",
          "explanation": "Regular expression backreferences preserve the last 4 digits while masking the first 12 digits, satisfying PCI-DSS security compliance standards."
        }
      ],
      "quizQuestions": [
        {
          "id": "java-93-q1",
          "question": "Why does SLF4J parameterized logging `logger.debug(\"Value: {}\", computeExpensiveString());` still incur a performance penalty if computeExpensiveString() is called?",
          "options": [
            "Because Java arguments are evaluated before method invocation; to prevent evaluation when debug is disabled, use `if (logger.isDebugEnabled())` or a lambda Supplier",
            "Because SLF4J always compiles strings regardless of log level",
            "Because debug level cannot be disabled in Java",
            "Because System.out intercepts all method arguments"
          ],
          "correctOptionIndex": 0,
          "explanation": "Java evaluates method arguments before passing them into logger.debug(). If an argument involves an expensive computation, wrap it in if (logger.isDebugEnabled()) or use a Supplier."
        },
        {
          "id": "java-93-q2",
          "question": "What is the danger of failing to call `MDC.clear()` at the end of handling an HTTP request in a servlet container?",
          "options": [
            "The JVM crashes with StackOverflowError",
            "Web server worker threads are reused across requests, causing subsequent unrelated requests to inherit stale request/user IDs in their log entries",
            "All database connections are closed",
            "Logback deletes the log file"
          ],
          "correctOptionIndex": 1,
          "explanation": "MDC uses ThreadLocal storage. In thread-pooled environments (Tomcat, Netty), threads are recycled. Uncleared MDC values contaminate future requests handled by the same thread."
        }
      ],
      "revisionNotes": [
        "Never use `System.out.println` in production; always use an SLF4J Logger.",
        "Use parameterized logging `{}` to avoid string concatenation allocations.",
        "MDC provides thread-local request tracing; always clean up with `MDC.clear()` in finally."
      ],
      "moduleId": "java-m7",
      "moduleNumber": 7,
      "moduleTitle": "Practical Java",
      "language": "java"
    },
    {
      "id": "java-94-build-tools",
      "topicNumber": 94,
      "title": "Build Tools: Maven & Gradle Fundamentals and Dependency Scopes",
      "level": "Beginner",
      "whyItMatters": "Modern Java applications are assembled using build automation tools. Understanding Maven (pom.xml) and Gradle (build.gradle) dependency coordinates, lifecycle phases, and scopes (compile, test, provided, runtime) is essential for any professional developer.",
      "explanation": "1. Maven Coordinates (GAV):\nEvery artifact in the Maven ecosystem is uniquely identified by three coordinates:\n- groupId: Reverse domain name of the organization (e.g. org.springframework.boot, com.google.guava).\n- artifactId: The specific project or library name (e.g. spring-boot-starter-web, guava).\n- version: Semantic versioning identifier (e.g. 3.2.0, 32.1.3-jre).\n\n2. Maven Dependency Scopes:\n- compile (default): Available in all classpaths (compilation, testing, runtime). Packaged into the final JAR/WAR.\n- provided: Required for compilation, but expected to be provided by the runtime container (e.g., servlet-api, lombok). NOT packaged.\n- runtime: Not required for compilation, but required during execution (e.g., JDBC driver implementation like postgresql).\n- test: Available only during test compilation and test execution (e.g., junit-jupiter, mockito-core). NOT packaged.\n\n3. Build Lifecycles:\n- Maven Core Phases: validate -> compile -> test -> package -> verify -> install -> deploy.\n- Clean lifecycle: mvn clean deletes the target/ build directory.\n- Gradle: Task-based build system using Groovy/Kotlin DSL. Faster incremental builds through build caching and daemon processes.",
      "syntaxAndStructure": "<!-- Maven Dependency in pom.xml -->\n<dependency>\n    <groupId>org.slf4j</groupId>\n    <artifactId>slf4j-api</artifactId>\n    <version>2.0.9</version>\n    <scope>compile</scope>\n</dependency>",
      "codeExamples": [
        {
          "title": "Comparing Maven pom.xml and Gradle build.gradle Declarations",
          "code": "public class BuildToolsDemo {\n    public static void main(String[] args) {\n        String mavenXml = \"\"\"\n            <dependency>\n                <groupId>com.fasterxml.jackson.core</groupId>\n                <artifactId>jackson-databind</artifactId>\n                <version>2.15.2</version>\n            </dependency>\n            \"\"\";\n\n        String gradleDsl = \"\"\"\n            dependencies {\n                implementation 'com.fasterxml.jackson.core:jackson-databind:2.15.2'\n                testImplementation 'org.junit.jupiter:junit-jupiter:5.10.0'\n            }\n            \"\"\";\n\n        System.out.println(\"Maven Syntax:\\n\" + mavenXml.trim());\n        System.out.println(\"Gradle Syntax:\\n\" + gradleDsl.trim());\n    }\n}",
          "expectedOutput": "Maven Syntax:\n<dependency>\n    <groupId>com.fasterxml.jackson.core</groupId>\n    <artifactId>jackson-databind</artifactId>\n    <version>2.15.2</version>\n</dependency>\nGradle Syntax:\ndependencies {\n    implementation 'com.fasterxml.jackson.core:jackson-databind:2.15.2'\n    testImplementation 'org.junit.jupiter:junit-jupiter:5.10.0'\n}",
          "explanation": "Both tools express identical dependency coordinates. Maven uses declarative XML while Gradle uses concise programmatic DSL."
        },
        {
          "title": "Understanding Transitive Dependency Conflicts (mvn dependency:tree)",
          "code": "public class DependencyTreeConcept {\n    public static void main(String[] args) {\n        System.out.println(\"Resolving dependency diamond conflicts:\");\n        System.out.println(\"App -> LibA (v1.0) -> CommonLib (v1.0)\");\n        System.out.println(\"App -> LibB (v2.0) -> CommonLib (v2.0)\");\n        System.out.println(\"Maven rule: Nearest definition in dependency tree wins!\");\n    }\n}",
          "expectedOutput": "Resolving dependency diamond conflicts:\nApp -> LibA (v1.0) -> CommonLib (v1.0)\nApp -> LibB (v2.0) -> CommonLib (v2.0)\nMaven rule: Nearest definition in dependency tree wins!",
          "explanation": "When conflicting transitive versions appear, Maven picks the version nearest to the project root in the dependency tree, or uses <dependencyManagement> to force a version."
        }
      ],
      "realWorldApplications": [
        "Automated CI/CD pipelines running mvn clean verify to build, test, and containerize Docker microservices.",
        "Software Supply Chain security scanning (Snyk, Dependabot) scanning pom.xml dependencies for known CVE vulnerabilities."
      ],
      "commonMistakes": [
        "Using compile scope for test libraries (like JUnit or Mockito), bundling test frameworks into production JARs and bloating artifact size.",
        "Neglecting transitive dependency version clashes: a library requiring an older version of Guava or Jackson can cause NoSuchMethodError at runtime.",
        "Hardcoding library versions across multiple multi-module sub-projects instead of centralizing them in a parent pom <dependencyManagement> block."
      ],
      "interviewRelevance": "Understanding dependency scopes, build lifecycle phases, and debugging classpath NoSuchMethodError caused by conflicting JARs is tested in all senior engineering screens.",
      "checkpoints": [
        {
          "id": "java-94-cp1",
          "label": "Understand Maven GAV coordinates (groupId, artifactId, version)"
        },
        {
          "id": "java-94-cp2",
          "label": "Choose appropriate dependency scopes: compile, provided, runtime, test"
        },
        {
          "id": "java-94-cp3",
          "label": "Diagnose dependency version conflicts using mvn dependency:tree"
        }
      ],
      "practiceExercises": [
        {
          "id": "java-94-ex1",
          "title": "Select Appropriate Dependency Scopes",
          "difficulty": "Beginner",
          "type": "conceptual",
          "prompt": "For each of the following libraries, specify the most appropriate Maven scope: (1) PostgreSQL JDBC Driver, (2) Project Lombok, (3) JUnit 5 Jupiter Engine, (4) Apache Commons Lang.",
          "solution": "1. PostgreSQL JDBC Driver: runtime (code compiles against java.sql interfaces, driver is needed only at runtime).\n2. Project Lombok: provided (code generator during compile time, not needed in packaged runtime).\n3. JUnit 5 Jupiter Engine: test (used only for running automated tests).\n4. Apache Commons Lang: compile (helper utilities directly invoked in production code).",
          "explanation": "Setting correct scopes keeps final production artifacts lean and prevents test or compile-only tools from leaking into production."
        },
        {
          "id": "java-94-ex2",
          "title": "Centralize Versions with DependencyManagement",
          "difficulty": "Intermediate",
          "type": "conceptual",
          "prompt": "Explain the difference between <dependencies> and <dependencyManagement> in a Maven parent POM.",
          "solution": "<dependencyManagement> defines and standardizes dependency versions and exclusions for child modules without actually adding those dependencies to the classpath. A child module adds the dependency under its own <dependencies> without declaring a <version>, inheriting the managed version.",
          "explanation": "DependencyManagement ensures version consistency across large multi-module repositories while letting individual submodules choose which libraries they actually need."
        },
        {
          "id": "java-94-ex3",
          "title": "Diagnose Classpath Version Collision",
          "difficulty": "Advanced",
          "type": "conceptual",
          "prompt": "A production application crashes with java.lang.NoSuchMethodError on a JSON library method that exists in your local IDE. How do you diagnose and resolve this?",
          "solution": "1. Run `mvn dependency:tree -Dverbose` to inspect the full transitive dependency graph.\n2. Locate multiple conflicting versions of the JSON library pulled transitively by different dependencies.\n3. The runtime classpath picked the older version due to Maven's \"nearest definition\" rule.\n4. Fix: Explicitly declare the desired newer version in the project POM or add an <exclusion> in the dependency pulling the outdated version.",
          "explanation": "NoSuchMethodError at runtime almost always indicates a classpath conflict where an older version of a class was loaded instead of the expected newer version."
        }
      ],
      "quizQuestions": [
        {
          "id": "java-94-q1",
          "question": "Which Maven dependency scope is appropriate for a database JDBC driver (like postgresql or mysql-connector-j)?",
          "options": [
            "compile",
            "test",
            "provided",
            "runtime"
          ],
          "correctOptionIndex": 3,
          "explanation": "Application code compiles against standard java.sql interfaces (Connection, PreparedStatement). The vendor JDBC driver implementation is needed only during runtime execution."
        },
        {
          "id": "java-94-q2",
          "question": "In Maven's default lifecycle, which phase immediately precedes `package`?",
          "options": [
            "compile",
            "test",
            "validate",
            "install"
          ],
          "correctOptionIndex": 1,
          "explanation": "The order of core phases is: validate -> compile -> test -> package -> verify -> install -> deploy. Tests run right before packaging."
        }
      ],
      "revisionNotes": [
        "GAV coordinates uniquely define artifacts: `groupId`, `artifactId`, `version`.",
        "Use `test` scope for test libraries and `provided` for compile-time tools like Lombok.",
        "Run `mvn dependency:tree` to uncover and fix transitive dependency conflicts."
      ],
      "moduleId": "java-m7",
      "moduleNumber": 7,
      "moduleTitle": "Practical Java",
      "language": "java"
    },
    {
      "id": "java-95-clean-code",
      "topicNumber": 95,
      "title": "Clean Code, Effective Java Guidelines & Project Architecture",
      "level": "Advanced",
      "whyItMatters": "Writing code that works is only the first step. Writing code that is maintainable, decoupled, and testable requires following established guidelines (Joshua Bloch's Effective Java) and clean layered architectural boundaries.",
      "explanation": "1. Layered Architecture (Separation of Concerns):\n- Controller / API Layer: Handles HTTP requests, input validation, serialization/deserialization, and returns DTOs.\n- Service Layer: Encapsulates business logic, transaction boundaries (@Transactional), and orchestrates domain operations.\n- Repository / Persistence Layer: Interfaces directly with the database (Spring Data JPA, JDBC) using domain entities.\n- DTOs (Data Transfer Objects): Decouple internal database schema entities from public API contract representations.\n\n2. Key Effective Java Rules (Joshua Bloch):\n- Item 1: Consider static factory methods instead of constructors (meaningful names, caching instances).\n- Item 2: Consider a builder when faced with many constructor parameters.\n- Item 17: Minimize mutability (make classes immutable wherever possible; Records).\n- Item 18: Favor composition over inheritance (inheritance breaks encapsulation when superclasses change).\n- Item 50: Make defensive copies when needed (never trust callers with references to mutable internal arrays/Date objects).\n- Item 54: Return empty collections or arrays, not nulls (eliminates repetitive null-checks for callers).",
      "syntaxAndStructure": "// Effective Java Item 54: Return empty collections, not null\npublic List<Order> getOrdersForUser(long userId) {\n    List<Order> orders = database.fetchOrders(userId);\n    return orders != null ? orders : Collections.emptyList();\n}",
      "codeExamples": [
        {
          "title": "Effective Java Builder Pattern with Immutability",
          "code": "public class BuilderDemo {\n    public static class UserProfile {\n        private final String username; // required\n        private final String email;    // required\n        private final String phone;    // optional\n        private final int karma;       // optional\n\n        private UserProfile(Builder builder) {\n            this.username = builder.username;\n            this.email = builder.email;\n            this.phone = builder.phone;\n            this.karma = builder.karma;\n        }\n\n        public static class Builder {\n            private final String username;\n            private final String email;\n            private String phone = \"\";\n            private int karma = 0;\n\n            public Builder(String username, String email) {\n                this.username = username;\n                this.email = email;\n            }\n\n            public Builder phone(String phone) { this.phone = phone; return this; }\n            public Builder karma(int karma) { this.karma = karma; return this; }\n\n            public UserProfile build() {\n                return new UserProfile(this);\n            }\n        }\n\n        @Override\n        public String toString() {\n            return String.format(\"%s <%s> [karma=%d]\", username, email, karma);\n        }\n    }\n\n    public static void main(String[] args) {\n        UserProfile user = new UserProfile.Builder(\"charlie\", \"charlie@example.com\")\n            .karma(150)\n            .build();\n        System.out.println(\"Built user: \" + user);\n    }\n}",
          "expectedOutput": "Built user: charlie <charlie@example.com> [karma=150]",
          "explanation": "The Builder pattern provides fluent, readable object construction when faced with many parameters, enforcing immutability with final fields."
        },
        {
          "title": "Defensive Copying (Effective Java Item 50)",
          "code": "import java.util.*;\n\npublic class DefensiveCopyDemo {\n    public static final class Period {\n        private final Date start;\n        private final Date end;\n\n        public Period(Date start, Date end) {\n            // Defensive copy of constructor arguments\n            this.start = new Date(start.getTime());\n            this.end = new Date(end.getTime());\n\n            if (this.start.after(this.end)) {\n                throw new IllegalArgumentException(start + \" after \" + end);\n            }\n        }\n\n        // Defensive copy of internal mutable fields\n        public Date getStart() { return new Date(start.getTime()); }\n        public Date getEnd() { return new Date(end.getTime()); }\n    }\n\n    public static void main(String[] args) {\n        Date start = new Date();\n        Date end = new Date();\n        Period p = new Period(start, end);\n\n        // Attempt attack: mutate original date outside\n        start.setTime(0);\n\n        System.out.println(\"Defensive copying preserves immutability: \" + (p.getStart().getTime() != 0));\n    }\n}",
          "expectedOutput": "Defensive copying preserves immutability: true",
          "explanation": "Because Date is mutable, failing to make defensive copies allows external callers to modify the internal state of a nominally immutable class."
        }
      ],
      "realWorldApplications": [
        "Architecting enterprise microservices where domain entities are protected behind DTO boundaries.",
        "Designing public SDKs and open-source libraries that resist accidental caller corruption through immutability."
      ],
      "commonMistakes": [
        "Returning null instead of Collections.emptyList() or Optional, forcing every caller to write boilerplate null checks or suffer NullPointerException.",
        "Exposing JPA database entities directly in REST API responses, leaking internal schema details and risking infinite serialization loops with bidirectional relationships.",
        "Using inheritance where composition was appropriate, tightly coupling child classes to fragile parent implementation details."
      ],
      "interviewRelevance": "Clean architecture, Effective Java principles, defensive copying, and API design are the differentiating factors that separate junior developers from senior engineers.",
      "checkpoints": [
        {
          "id": "java-95-cp1",
          "label": "Structure applications with clear Controller -> Service -> Repository layered separation"
        },
        {
          "id": "java-95-cp2",
          "label": "Apply Effective Java guidelines: Builders, immutability, and defensive copying"
        },
        {
          "id": "java-95-cp3",
          "label": "Return empty collections or Optionals instead of null"
        }
      ],
      "practiceExercises": [
        {
          "id": "java-95-ex1",
          "title": "Return Empty Collections Not Null",
          "difficulty": "Beginner",
          "type": "coding",
          "prompt": "Refactor a method findAdminUsers(List<User> users) so that it returns Collections.emptyList() if users is null or empty, never returning null.",
          "starterCode": "import java.util.*;\n\npublic class UserDirectory {\n    public static List<String> findAdminUsers(List<String> users) {\n        return null;\n    }\n}",
          "solution": "import java.util.*;\n\npublic class UserDirectory {\n    public static List<String> findAdminUsers(List<String> users) {\n        if (users == null || users.isEmpty()) {\n            return Collections.emptyList();\n        }\n        List<String> admins = new ArrayList<>();\n        for (String u : users) {\n            if (u.startsWith(\"admin_\")) {\n                admins.add(u);\n            }\n        }\n        return admins;\n    }\n}",
          "explanation": "Returning Collections.emptyList() simplifies caller code: callers can immediately iterate over the result with a for-each loop without null checking."
        },
        {
          "id": "java-95-ex2",
          "title": "Implement Immutable Value Object",
          "difficulty": "Intermediate",
          "type": "coding",
          "prompt": "Create an immutable class Money with a BigDecimal amount and Currency currency, ensuring defensive copying and valid state.",
          "starterCode": "import java.math.BigDecimal;\nimport java.util.Currency;\n\npublic final class Money {\n    // Implement immutable money\n}",
          "solution": "import java.math.BigDecimal;\nimport java.util.Currency;\nimport java.util.Objects;\n\npublic final class Money {\n    private final BigDecimal amount;\n    private final Currency currency;\n\n    public Money(BigDecimal amount, Currency currency) {\n        this.amount = Objects.requireNonNull(amount, \"Amount required\");\n        this.currency = Objects.requireNonNull(currency, \"Currency required\");\n        if (amount.compareTo(BigDecimal.ZERO) < 0) {\n            throw new IllegalArgumentException(\"Amount cannot be negative\");\n        }\n    }\n\n    public BigDecimal getAmount() { return amount; }\n    public Currency getCurrency() { return currency; }\n\n    public Money add(Money other) {\n        if (!this.currency.equals(other.currency)) {\n            throw new IllegalArgumentException(\"Cannot add different currencies\");\n        }\n        return new Money(this.amount.add(other.amount), this.currency);\n    }\n}",
          "explanation": "The class is final, fields are private final, references are non-null validated, and operations return new instances instead of mutating state."
        },
        {
          "id": "java-95-ex3",
          "title": "Decouple Entity from DTO with Mapper",
          "difficulty": "Advanced",
          "type": "coding",
          "prompt": "Given an internal database entity UserEntity (id, username, passwordHash, ssn, createdAt), create a public UserResponseDto record and a static mapper method to prevent leaking sensitive fields.",
          "starterCode": "public class UserMapperDemo {\n    static class UserEntity {\n        long id;\n        String username;\n        String passwordHash;\n        String ssn;\n    }\n    // Implement DTO and mapper\n}",
          "solution": "public class UserMapperDemo {\n    public static class UserEntity {\n        long id;\n        String username;\n        String passwordHash;\n        String ssn;\n\n        public UserEntity(long id, String username, String passwordHash, String ssn) {\n            this.id = id;\n            this.username = username;\n            this.passwordHash = passwordHash;\n            this.ssn = ssn;\n        }\n    }\n\n    public record UserResponseDto(long id, String username) {\n        public static UserResponseDto fromEntity(UserEntity entity) {\n            if (entity == null) return null;\n            return new UserResponseDto(entity.id, entity.username);\n        }\n    }\n}",
          "explanation": "DTOs explicitly select only public fields, ensuring internal implementation details (passwordHash, ssn) are never leaked to API consumers."
        }
      ],
      "quizQuestions": [
        {
          "id": "java-95-q1",
          "question": "What is the primary rationale behind Effective Java Item 54: \"Return empty collections or arrays, not nulls\"?",
          "options": [
            "Because empty collections consume zero CPU instructions",
            "Because returning null forces every single calling client to write defensive null checks, and missing one causes a runtime NullPointerException",
            "Because Java collections cannot hold null elements",
            "Because the garbage collector rejects null collections"
          ],
          "correctOptionIndex": 1,
          "explanation": "Returning null transfers the burden of null-handling to every caller. Returning Collections.emptyList() allows callers to iterate directly without null checks."
        },
        {
          "id": "java-95-q2",
          "question": "Why does Effective Java recommend defensive copying when accepting mutable objects in a constructor?",
          "options": [
            "To increase JVM heap allocation speed",
            "Because callers retain a reference to the mutable object and can alter internal state of the class after instantiation without its knowledge",
            "To satisfy serialization requirements",
            "To convert arrays into ArrayLists"
          ],
          "correctOptionIndex": 1,
          "explanation": "If you store a caller-provided mutable object (like Date or int[]), the caller can mutate that object later, compromising class invariants."
        }
      ],
      "revisionNotes": [
        "Layered architecture enforces separation of concerns: Controller -> Service -> Repository.",
        "Return empty collections (`Collections.emptyList()`) instead of `null`.",
        "Make defensive copies of mutable objects passed into or returned from constructors and getters."
      ],
      "moduleId": "java-m7",
      "moduleNumber": 7,
      "moduleTitle": "Practical Java",
      "language": "java"
    }
  ],
  "moduleAssessment": {
    "id": "java-m7-assessment",
    "title": "Module 7 Assessment: Practical Java",
    "passingScorePercentage": 80,
    "questions": [
      {
        "id": "java-87-q1",
        "question": "Why should you avoid using `Files.readAllLines(path)` on large files in production services?",
        "options": [
          "Because it converts all characters into uppercase",
          "Because it loads all file lines into heap memory simultaneously as separate String instances, risking OutOfMemoryError",
          "Because it does not support UTF-8 encoding",
          "Because it locks the file indefinitely until JVM restarts"
        ],
        "correctOptionIndex": 1,
        "explanation": "readAllLines reads the entire file into memory at once. For multi-hundred megabyte or gigabyte files, this exhausts heap space. Files.lines() should be used instead."
      },
      {
        "id": "java-87-q2",
        "question": "What interface must an object implement to be eligible for use in a Java `try-with-resources` statement?",
        "options": [
          "java.io.Serializable",
          "java.lang.AutoCloseable",
          "java.lang.Cloneable",
          "java.util.concurrent.Callable"
        ],
        "correctOptionIndex": 1,
        "explanation": "try-with-resources requires the resource to implement java.lang.AutoCloseable (or its subinterface java.io.Closeable)."
      },
      {
        "id": "java-88-q1",
        "question": "What happens if a class does not declare `serialVersionUID` and is deserialized after adding a new field?",
        "options": [
          "The JVM ignores the new field and succeeds silently",
          "The JVM throws InvalidClassException because the automatically generated serialVersionUID hash changed",
          "The JVM recompiles the class at runtime",
          "The JVM zeroes out all existing object data"
        ],
        "correctOptionIndex": 1,
        "explanation": "If undeclared, the compiler auto-generates a serialVersionUID hash from all fields and methods. Any structural change alters the hash, triggering InvalidClassException."
      },
      {
        "id": "java-88-q2",
        "question": "What value does a `transient int` field take after deserialization?",
        "options": [
          "null",
          "0",
          "-1",
          "Its pre-serialization value"
        ],
        "correctOptionIndex": 1,
        "explanation": "transient fields are omitted from the byte stream. During deserialization, primitive types are initialized to their default values (0 for int, false for boolean, null for objects)."
      },
      {
        "id": "java-89-q1",
        "question": "Why is `PreparedStatement` immune to SQL injection attacks?",
        "options": [
          "Because it encrypts the SQL string with AES-256",
          "Because the database compiles the SQL query structure first; parameter values are bound as literal data and can never alter the query's syntax tree",
          "Because it forces all database tables to be read-only",
          "Because it only works with stored procedures"
        ],
        "correctOptionIndex": 1,
        "explanation": "PreparedStatement separates code from data. The database compiles the SQL structure with placeholders, and values are injected strictly as data literals."
      },
      {
        "id": "java-89-q2",
        "question": "Are parameter placeholders (?) in JDBC PreparedStatement 0-indexed or 1-indexed?",
        "options": [
          "0-indexed",
          "1-indexed",
          "Dynamic based on database driver",
          "Alpha-indexed"
        ],
        "correctOptionIndex": 1,
        "explanation": "JDBC parameters are strictly 1-indexed: ps.setString(1, val) sets the first question mark placeholder."
      },
      {
        "id": "java-90-q1",
        "question": "What concurrency anomaly is prevented by moving from READ UNCOMMITTED to READ COMMITTED isolation level?",
        "options": [
          "Phantom Read",
          "Non-Repeatable Read",
          "Dirty Read",
          "Lost Update"
        ],
        "correctOptionIndex": 2,
        "explanation": "READ COMMITTED guarantees that a transaction will only read data that has already been committed by other transactions, preventing Dirty Reads."
      },
      {
        "id": "java-90-q2",
        "question": "Why should third-party REST API calls never be placed inside an active database transaction block?",
        "options": [
          "Because HTTP is incompatible with JDBC",
          "Because slow or unresponsive external API calls keep the database transaction and database row/table locks open indefinitely, exhausting connection pools",
          "Because Java cannot serialize HTTP requests into SQL",
          "Because the database driver will automatically close the socket"
        ],
        "correctOptionIndex": 1,
        "explanation": "External network I/O can take seconds to complete or time out. Holding database locks during network calls creates massive contention and connection pool exhaustion."
      },
      {
        "id": "java-91-q1",
        "question": "What is the advantage of using `assertAll()` in JUnit 5 over individual assertions?",
        "options": [
          "It runs tests concurrently on multiple CPU threads",
          "It executes every assertion in the group and reports all failures together, instead of stopping at the first failed assertion",
          "It automatically retries failed tests 3 times",
          "It generates HTML coverage reports"
        ],
        "correctOptionIndex": 1,
        "explanation": "assertAll guarantees that all enclosed assertions are executed. If multiple assertions fail, it reports all failed messages simultaneously."
      },
      {
        "id": "java-91-q2",
        "question": "Which JUnit 5 annotation is used to run the same test method multiple times with different arguments?",
        "options": [
          "@RepeatedTest",
          "@ParameterizedTest",
          "@DynamicTest",
          "@TestFactory"
        ],
        "correctOptionIndex": 1,
        "explanation": "@ParameterizedTest combined with argument sources (@ValueSource, @CsvSource, @MethodSource) runs the test across multiple test vectors."
      },
      {
        "id": "java-92-q1",
        "question": "Why is \"Log and Throw\" (logging an exception and then immediately throwing it) considered an anti-pattern?",
        "options": [
          "Because logging slows down JVM garbage collection",
          "Because every layer in the call stack will catch, log, and rethrow the same error, cluttering log files with redundant duplicate stack traces",
          "Because the logger will delete the exception object",
          "Because Java prohibits logging inside catch blocks"
        ],
        "correctOptionIndex": 1,
        "explanation": "Log and Throw results in the same error being logged 5-10 times as it bubbles up through controller, service, and repository layers, flooding log indexes."
      },
      {
        "id": "java-92-q2",
        "question": "Which JVM option automatically captures a heap dump when an OutOfMemoryError occurs in production?",
        "options": [
          "-XX:+HeapDumpOnOutOfMemoryError",
          "-Xlog:gc*",
          "-Djava.heap.dump=true",
          "-XX:+PrintGCDetails"
        ],
        "correctOptionIndex": 0,
        "explanation": "-XX:+HeapDumpOnOutOfMemoryError instructs the HotSpot JVM to write an HPROF memory dump to disk immediately before crashing."
      },
      {
        "id": "java-93-q1",
        "question": "Why does SLF4J parameterized logging `logger.debug(\"Value: {}\", computeExpensiveString());` still incur a performance penalty if computeExpensiveString() is called?",
        "options": [
          "Because Java arguments are evaluated before method invocation; to prevent evaluation when debug is disabled, use `if (logger.isDebugEnabled())` or a lambda Supplier",
          "Because SLF4J always compiles strings regardless of log level",
          "Because debug level cannot be disabled in Java",
          "Because System.out intercepts all method arguments"
        ],
        "correctOptionIndex": 0,
        "explanation": "Java evaluates method arguments before passing them into logger.debug(). If an argument involves an expensive computation, wrap it in if (logger.isDebugEnabled()) or use a Supplier."
      },
      {
        "id": "java-93-q2",
        "question": "What is the danger of failing to call `MDC.clear()` at the end of handling an HTTP request in a servlet container?",
        "options": [
          "The JVM crashes with StackOverflowError",
          "Web server worker threads are reused across requests, causing subsequent unrelated requests to inherit stale request/user IDs in their log entries",
          "All database connections are closed",
          "Logback deletes the log file"
        ],
        "correctOptionIndex": 1,
        "explanation": "MDC uses ThreadLocal storage. In thread-pooled environments (Tomcat, Netty), threads are recycled. Uncleared MDC values contaminate future requests handled by the same thread."
      },
      {
        "id": "java-94-q1",
        "question": "Which Maven dependency scope is appropriate for a database JDBC driver (like postgresql or mysql-connector-j)?",
        "options": [
          "compile",
          "test",
          "provided",
          "runtime"
        ],
        "correctOptionIndex": 3,
        "explanation": "Application code compiles against standard java.sql interfaces (Connection, PreparedStatement). The vendor JDBC driver implementation is needed only during runtime execution."
      },
      {
        "id": "java-94-q2",
        "question": "In Maven's default lifecycle, which phase immediately precedes `package`?",
        "options": [
          "compile",
          "test",
          "validate",
          "install"
        ],
        "correctOptionIndex": 1,
        "explanation": "The order of core phases is: validate -> compile -> test -> package -> verify -> install -> deploy. Tests run right before packaging."
      },
      {
        "id": "java-95-q1",
        "question": "What is the primary rationale behind Effective Java Item 54: \"Return empty collections or arrays, not nulls\"?",
        "options": [
          "Because empty collections consume zero CPU instructions",
          "Because returning null forces every single calling client to write defensive null checks, and missing one causes a runtime NullPointerException",
          "Because Java collections cannot hold null elements",
          "Because the garbage collector rejects null collections"
        ],
        "correctOptionIndex": 1,
        "explanation": "Returning null transfers the burden of null-handling to every caller. Returning Collections.emptyList() allows callers to iterate directly without null checks."
      },
      {
        "id": "java-95-q2",
        "question": "Why does Effective Java recommend defensive copying when accepting mutable objects in a constructor?",
        "options": [
          "To increase JVM heap allocation speed",
          "Because callers retain a reference to the mutable object and can alter internal state of the class after instantiation without its knowledge",
          "To satisfy serialization requirements",
          "To convert arrays into ArrayLists"
        ],
        "correctOptionIndex": 1,
        "explanation": "If you store a caller-provided mutable object (like Date or int[]), the caller can mutate that object later, compromising class invariants."
      }
    ]
  },
  "revisionQuestions": [
    "Why is Files.lines() preferred over Files.readAllLines() for large files in production systems?",
    "Explain how PreparedStatement pre-compiles query structure to prevent SQL injection attacks.",
    "Differentiate between READ COMMITTED and REPEATABLE READ transaction isolation levels.",
    "Why should System.out.println never be used in enterprise services, and how does SLF4J parameterized logging improve throughput?",
    "Walk through Effective Java guidelines on returning empty collections vs null, and when defensive copying is required."
  ]
};
