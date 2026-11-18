import { TechnicalTopic } from '@/types/technical';

export const dbmsTopics: TechnicalTopic[] = [
  {
    id: 'dbms-01-vs-rdbms',
    number: 1,
    title: 'DBMS vs RDBMS Architecture & Comparison',
    category: 'dbms',
    subject: 'DBMS',
    codeLanguage: 'text',
    explanation:
      'A DBMS is system software for storing and managing data as navigational or flat files with no inherent table relations. An RDBMS stores data in structured 2D relations (tables with tuples and attributes) with relational constraints, primary-foreign key relationships, and ACID transaction support. RDBMS prevents data redundancy, eliminates inconsistencies, and supports SQL.',
    diagram: `+-----------------------+---------------------------------------+
| Feature               | DBMS (e.g., XML/Files) | RDBMS (MySQL, Postgres, Oracle) |
+-----------------------+------------------------+---------------------------------+
| Data Structure        | Hierarchical or Flat   | Tabular (Rows and Columns)      |
| Integrity Constraints | Not enforced           | Strictly enforced (PK, FK)      |
| ACID Properties       | Not guaranteed         | Fully guaranteed                |
| Normalization         | Not present            | Supported & recommended         |
| Distributed / Multi   | Single user typically  | Multi-user concurrent access    |
+-----------------------+------------------------+---------------------------------+`,
    interviewQuestions: [
      'What are the primary architectural differences between DBMS and RDBMS?',
      'Why does RDBMS scale better for multi-user concurrent transactional environments?',
      'Can an RDBMS store unstructured data like images or JSON?',
    ],
    commonMistakes: [
      'Thinking MongoDB is an RDBMS (it is a NoSQL document database).',
      'Assuming all databases automatically guarantee ACID compliance.',
    ],
    revisionNotes: [
      'DBMS: File system wrapper, no relational keys, potential data inconsistency.',
      'RDBMS: Relational model (Codd rules), tables, foreign keys, ACID compliance.',
      'RDBMS ensures data integrity at the database layer, not just application layer.',
    ],
  },
  {
    id: 'dbms-02-keys-relationships',
    number: 2,
    title: 'Keys and Relational Relationships',
    category: 'dbms',
    subject: 'DBMS',
    codeLanguage: 'text',
    explanation:
      'Keys uniquely identify entities and establish connections. Super Key: Any set of attributes that uniquely identifies a row. Candidate Key: A minimal Super Key (no redundant attributes). Primary Key: Chosen candidate key (strictly unique, not null). Alternate Key: Candidate keys not chosen as Primary Key. Foreign Key: Attribute matching a Primary Key in another table. Relationships: One-to-One (1:1), One-to-Many (1:N), and Many-to-Many (M:N, requires junction/bridge table).',
    diagram: `Hierarchy of Keys:
[ Super Keys ]
   └── [ Candidate Keys (Minimal Super Keys) ]
          ├── Primary Key (Selected unique & non-null)
          └── Alternate Keys (Remaining candidate keys)`,
    interviewQuestions: [
      'Difference between Candidate Key and Super Key with an example?',
      'How is a Many-to-Many relationship implemented physically in an RDBMS?',
      'Can a foreign key reference a column that is not a primary key?',
    ],
    commonMistakes: [
      'Confusing Primary Key with Unique Key (Primary key cannot contain NULL; Unique key allows one NULL).',
      'Implementing Many-to-Many relationships by storing comma-separated IDs inside a single column.',
    ],
    revisionNotes: [
      'Super Key: Uniquely identifies row. Candidate Key: Minimal super key.',
      'Primary Key: Selected candidate key. Unique Key: Unique, allows 1 NULL.',
      'Many-to-Many (M:N) requires a Junction/Bridge table with two Foreign Keys.',
    ],
  },
  {
    id: 'dbms-03-er-model',
    number: 3,
    title: 'ER Model Basics: Entities, Attributes & Cardinality',
    category: 'dbms',
    subject: 'DBMS',
    codeLanguage: 'text',
    explanation:
      'The Entity-Relationship (ER) model visually represents logical database design. Entities: Real-world objects (Entity Sets). Attributes: Properties describing entities (Simple, Composite, Single-valued, Multi-valued [double oval], Derived [dashed oval]). Relationships: Associations between entities (Degree: Unary, Binary, Ternary). Cardinality: Specifies the number of entity occurrences associated with another (1:1, 1:N, M:N).',
    diagram: `ER Diagram Symbols:
Rectangle     -> Strong Entity Set
Double Rect   -> Weak Entity Set (depends on identifying owner)
Diamond       -> Relationship Set
Oval          -> Attribute (Underlined = Primary Key)
Double Oval   -> Multi-valued Attribute (e.g., Phone numbers)
Dashed Oval   -> Derived Attribute (e.g., Age derived from DOB)`,
    interviewQuestions: [
      'What is a Weak Entity Set and how is it identified in an ER diagram and physical schema?',
      'Difference between Multi-valued and Composite attributes?',
      'How are ER diagrams converted into relational schema tables?',
    ],
    commonMistakes: [
      'Forgetting that weak entity sets require a partial discriminator and foreign key from an identifying owner entity.',
      'Storing derived attributes as persistent columns instead of calculating them dynamically.',
    ],
    revisionNotes: [
      'Strong Entity has its own primary key. Weak Entity needs owner entity + discriminator.',
      'Multi-valued attribute becomes its own table in relational conversion (1NF requirement).',
      'Derived attributes can be computed at query time (e.g. Age = CURRENT_DATE - DOB).',
    ],
  },
  {
    id: 'dbms-04-normalization',
    number: 4,
    title: 'Normalization & Anomalies (1NF, 2NF, 3NF, BCNF)',
    category: 'dbms',
    subject: 'DBMS',
    codeLanguage: 'text',
    explanation:
      'Normalization decomposes tables to eliminate data redundancy and prevent modification anomalies (Insertion, Update, Deletion). 1NF: Atomic values, no repeating groups. 2NF: 1NF + no partial dependency on composite PK. 3NF: 2NF + no transitive dependency (X -> Y where Y is non-prime). BCNF (Boyce-Codd NF): For every functional dependency X -> Y, X must strictly be a Super Key.',
    diagram: `Normalization Stages:
Raw Table 
  ──[Make values atomic]──> 1NF
  ──[Eliminate Partial Dependency]──> 2NF
  ──[Eliminate Transitive Dependency]──> 3NF
  ──[Enforce LHS is Super Key for all FDs]──> BCNF`,
    interviewQuestions: [
      'Explain Insertion, Update, and Deletion anomalies with an unnormalized table example.',
      'What is Boyce-Codd Normal Form (BCNF) and how does it differ from 3NF?',
      'Can a table in 1NF also be in 2NF if its Primary Key consists of only a single column?',
    ],
    commonMistakes: [
      'Assuming single-column primary key tables can have partial dependencies (partial dependency ONLY exists with composite keys).',
      'Thinking 3NF guarantees BCNF (BCNF is stricter: determinant must always be super key).',
    ],
    revisionNotes: [
      'If Primary Key is a single column, 1NF automatically satisfies 2NF.',
      '3NF eliminates non-key -> non-key dependencies.',
      'BCNF: For every X -> Y, X must be a super key. Solves overlapping candidate key anomalies.',
    ],
  },
  {
    id: 'dbms-05-functional-dependencies',
    number: 5,
    title: 'Functional Dependencies & Attribute Closure',
    category: 'dbms',
    subject: 'DBMS',
    codeLanguage: 'text',
    explanation:
      'A Functional Dependency (FD) X -> Y means attribute set X uniquely determines attribute set Y. Armstrong Axioms: Reflexivity (if Y subset X, then X -> Y), Augmentation (if X -> Y, then XZ -> YZ), Transitivity (if X -> Y and Y -> Z, then X -> Z). Attribute Closure (X+) is the complete set of all attributes functionally determined by X under given FDs. A candidate key has a closure containing all attributes of the table.',
    diagram: `Finding Candidate Key using Attribute Closure (X+):
Given: R(A, B, C, D), F = { A -> B, B -> C, C -> D }
Compute A+:
  A+ = {A}
     -> add B (from A->B) => {A, B}
     -> add C (from B->C) => {A, B, C}
     -> add D (from C->D) => {A, B, C, D}
Since A+ contains all attributes of R, A is a Candidate Key!`,
    interviewQuestions: [
      'What are Armstrong Axioms and what secondary rules derive from them (Union, Decomposition)?',
      'How do you determine all Candidate Keys of a relation using attribute closure?',
      'What is a Lossless-Join Decomposition and Dependency Preservation?',
    ],
    commonMistakes: [
      'Missing candidate keys by failing to check attribute closures of combinations.',
      'Confusing trivial FDs (Y is subset of X) with non-trivial FDs.',
    ],
    revisionNotes: [
      'Trivial FD: A, B -> A. Non-trivial: A -> B where B not in A.',
      'Attribute Closure X+: Collect all attributes determined directly and transitively by X.',
      'If X+ includes all attributes of relation R, and no proper subset does, X is a Candidate Key.',
    ],
  },
  {
    id: 'dbms-06-joins',
    number: 6,
    title: 'Relational Joins & Execution Algorithms',
    category: 'dbms',
    subject: 'DBMS',
    codeLanguage: 'text',
    explanation:
      'Joins combine tuples from two relations based on matching conditions. In relational algebra: Theta join, Equi join, Natural join. Under the hood, the query optimizer executes joins using: 1. Nested Loop Join (O(M * N), good for small/indexed tables), 2. Hash Join (builds in-memory hash table on smaller relation, scans larger, O(M + N)), 3. Sort-Merge Join (sorts both inputs on join key, then merges, O(M log M + N log N)).',
    diagram: `Join Execution Strategies:
1. Nested Loop: For each row in outer table, scan inner table.
2. Hash Join:   Hash smaller table into RAM; probe with larger table rows.
3. Sort-Merge:  Sort Table A, Sort Table B, merge simultaneously.`,
    interviewQuestions: [
      'When does a query engine choose Hash Join over Nested Loop Join?',
      'Why is Sort-Merge Join preferred when join attributes are already indexed?',
      'What is the difference between Natural Join and Equi Join?',
    ],
    commonMistakes: [
      'Assuming RDBMS always executes joins using nested loops (modern engines use hash joins for large datasets).',
      'Forgetting that Natural Join automatically matches all columns with the same name and eliminates duplicates.',
    ],
    revisionNotes: [
      'Hash Join: fastest for large unsorted datasets with equality joins.',
      'Nested Loop: best when inner table has a selective index.',
      'Sort-Merge: optimal when tables are pre-sorted or indexed on join key.',
    ],
  },
  {
    id: 'dbms-07-indexing',
    number: 7,
    title: 'Indexing Mechanics: B-Trees and B+ Trees',
    category: 'dbms',
    subject: 'DBMS',
    codeLanguage: 'text',
    explanation:
      'Database indexes rely predominantly on B+ Trees. In a B+ Tree: all actual data pointers/records reside exclusively in the leaf nodes, which are linked together in a doubly linked list. Internal nodes contain only routing keys. This structure ensures every search has uniform depth, tree height remains extremely small (~3-4 levels for billions of rows), and range scans are ultra-fast by traversing the linked leaf level.',
    diagram: `B+ Tree Structure:
         [ Root: 50 ]
        /            \\
  [ Internal: 25 ]   [ Internal: 75 ]
     /        \\          /        \\
[Leaves: 10,20] <-> [Leaves: 30,40] <-> [Leaves: 60,70] <-> [Leaves: 80,90]
  (Leaf level is linked list: optimal for WHERE id BETWEEN 20 AND 70)`,
    interviewQuestions: [
      'Why are B+ Trees preferred over Binary Search Trees (BST) or Red-Black Trees in databases?',
      'Why are B+ Trees preferred over standard B-Trees for database storage?',
      'How does index fragmentation occur and how is it repaired?',
    ],
    commonMistakes: [
      'Thinking B-Trees store data only in leaves (B+ Trees store data only in leaves; B-Trees store data in internal nodes too).',
      'Failing to recognize that B+ Trees minimize expensive disk I/O operations by maximizing node fan-out.',
    ],
    revisionNotes: [
      'High fan-out (hundreds of keys per node) keeps tree height low (3-4 levels).',
      'Leaf nodes form a doubly linked list, enabling O(1) sequential range scanning.',
      'Minimizes disk block reads compared to binary search trees.',
    ],
  },
  {
    id: 'dbms-08-acid-transactions',
    number: 8,
    title: 'Transactions & ACID Implementation (WAL, Shadow Paging)',
    category: 'dbms',
    subject: 'DBMS',
    codeLanguage: 'text',
    explanation:
      'A transaction is a logical unit of work adhering to ACID. Atomicity & Durability are implemented via Write-Ahead Logging (WAL) and the ARIES recovery algorithm. In WAL, log records (undo/redo logs) are flushed to persistent disk BEFORE actual data pages are modified on disk. If a crash occurs: Redo phase reconstructs committed state; Undo phase rolls back uncommitted transactions.',
    diagram: `Write-Ahead Logging (WAL) Protocol:
1. Transaction modifies buffer in RAM.
2. Log record written to WAL buffer.
3. WAL buffer flushed to Disk (Sync) <── MANDATORY BEFORE COMMIT
4. Dirty data pages lazily flushed to database disk files later.`,
    interviewQuestions: [
      'What is Write-Ahead Logging (WAL) and why must log precede data flush?',
      'What happens during Crash Recovery (Analysis, Redo, Undo phases)?',
      'What is Checkpointing and why is it needed to bound recovery time?',
    ],
    commonMistakes: [
      'Believing database data files are written to disk synchronously on every single commit (WAL is flushed, data files are flushed lazily).',
      'Confusing Undo log (for rollback/atomicity) with Redo log (for durability/recovery).',
    ],
    revisionNotes: [
      'WAL Rule: Log record must hit disk before corresponding database page is written.',
      'Undo Log: Reverts changes of uncommitted transactions (ensures Atomicity).',
      'Redo Log: Re-applies changes of committed transactions after crash (ensures Durability).',
    ],
  },
  {
    id: 'dbms-09-concurrency-control',
    number: 9,
    title: 'Concurrency Control & Two-Phase Locking (2PL)',
    category: 'dbms',
    subject: 'DBMS',
    codeLanguage: 'text',
    explanation:
      'Concurrency control prevents anomalies when multiple transactions execute simultaneously. Serializability is the gold standard of correctness. Two-Phase Locking (2PL) guarantees conflict serializability: 1. Growing Phase: Transaction may acquire locks but cannot release any. 2. Shrinking Phase: Transaction may release locks but cannot acquire new ones. Strict 2PL holds exclusive locks until COMMIT/ROLLBACK, preventing cascading aborts.',
    diagram: `Two-Phase Locking (2PL):
Lock Count
    ^        /\\  <-- Lock Point
    |       /  \\
    |      /    \\
    |     /      \\
    +----+--------+-----> Time
      Growing   Shrinking
      Phase     Phase`,
    interviewQuestions: [
      'What is Two-Phase Locking (2PL) and does it prevent deadlocks?',
      'Difference between Strict 2PL and Rigorous 2PL?',
      'What is Multi-Version Concurrency Control (MVCC) used in PostgreSQL and MySQL InnoDB?',
    ],
    commonMistakes: [
      'Assuming 2PL prevents deadlocks (2PL guarantees serializability, but CAN still deadlock!).',
      'Confusing Shared Lock (S-lock, read) with Exclusive Lock (X-lock, write).',
    ],
    revisionNotes: [
      'Shared Lock (S): Read-only, multiple transactions can hold simultaneously.',
      'Exclusive Lock (X): Write-only, exclusive access, blocks all other locks.',
      '2PL guarantees Conflict Serializability, but does NOT prevent deadlocks.',
      'MVCC: Readers do not block writers, and writers do not block readers.',
    ],
  },
  {
    id: 'dbms-10-deadlocks',
    number: 10,
    title: 'Deadlocks in Databases: Detection & Prevention',
    category: 'dbms',
    subject: 'DBMS',
    codeLanguage: 'text',
    explanation:
      'A deadlock occurs when two or more transactions form a circular wait, each holding a lock the other requires. Handling approaches: 1. Prevention (Wait-Die and Wound-Wait schemes based on timestamps). 2. Detection (Wait-For Graph [WFG]: cycles signify deadlocks). When a cycle is detected, the DBMS selects a victim transaction, rolls it back, and releases its locks so other transactions can proceed.',
    diagram: `Wait-For Graph (Deadlock Cycle):
  [ Transaction T1 ] ──(waits for lock held by)──> [ Transaction T2 ]
          ^                                                 |
          └────────(waits for lock held by)─────────────────┘
          Cycle Detected! -> Rollback T1 or T2 as victim`,
    interviewQuestions: [
      'Difference between Wait-Die and Wound-Wait deadlock prevention algorithms?',
      'How does a Wait-For Graph (WFG) detect database deadlocks?',
      'How does the DBMS pick a victim transaction during deadlock resolution?',
    ],
    commonMistakes: [
      'Assuming deadlocks are application coding bugs that can never occur with correct SQL (concurrent access order inevitably causes them).',
      'Failing to handle database deadlock exceptions with automatic retry logic in backend services.',
    ],
    revisionNotes: [
      'Wait-Die (Non-preemptive): Older waits for younger; younger dies if waiting for older.',
      'Wound-Wait (Preemptive): Older wounds (preempts) younger; younger waits for older.',
      'DBMS resolves deadlocks by detecting WFG cycle, rolling back victim, and unlocking.',
    ],
  },
  {
    id: 'dbms-11-sql-execution',
    number: 11,
    title: 'SQL Query Processing & Execution Architecture',
    category: 'dbms',
    subject: 'DBMS',
    codeLanguage: 'text',
    explanation:
      'When an SQL query is submitted: 1. Parser verifies syntax and checks catalog semantics. 2. Query Rewriter optimizes logical relational algebra expressions. 3. Cost-Based Optimizer (CBO) evaluates multiple physical execution plans using catalog statistics (index selectivity, table size, histogram distribution) to pick lowest cost plan. 4. Execution Engine executes the plan and streams rows back.',
    diagram: `Query Pipeline:
SQL Query 
  ──> [ Parser & Lexer ] ──(Parse Tree)
  ──> [ Query Optimizer (CBO) ] ──(Physical Execution Plan)
  ──> [ Execution Engine ] ──(Iterators/Volcano Model)
  ──> Result Rows`,
    interviewQuestions: [
      'What is EXPLAIN / EXPLAIN ANALYZE in SQL and how do you read its output?',
      'What are table statistics and histograms, and why does an outdated catalog cause slow queries?',
      'What is the Volcano Iterator Model (next() method) in database engines?',
    ],
    commonMistakes: [
      'Not running ANALYZE TABLE when query planner chooses suboptimal table scans over indexes.',
      'Assuming SQL queries are executed in the exact order written in text.',
    ],
    revisionNotes: [
      'Logical order: FROM -> WHERE -> GROUP BY -> HAVING -> SELECT -> ORDER BY -> LIMIT.',
      'Cost-Based Optimizer estimates disk I/O and CPU cost.',
      'Use EXPLAIN to inspect chosen indexes and avoid accidental Full Table Scans.',
    ],
  },
];
