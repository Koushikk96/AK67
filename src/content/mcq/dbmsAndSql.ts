import { TestQuestion } from '@/types/mockTest';

export const dbmsMCQs: TestQuestion[] = [
  {
    id: 'tech-dbms-01',
    question: 'Which ACID property guarantees that all operations in a transaction either complete successfully or none of them take effect?',
    options: ['Atomicity', 'Consistency', 'Isolation', 'Durability'],
    correctOptionIndex: 0,
    explanation:
      'Atomicity ensures "all-or-nothing" execution. If any operation fails during the transaction, the entire transaction is rolled back.',
    category: 'technical',
    subject: 'DBMS',
    difficulty: 'Easy',
  },
  {
    id: 'tech-dbms-02',
    question: 'What is a Primary Key in a relational database?',
    options: [
      'A column that can hold null values as long as they are distinct',
      'A candidate key chosen to uniquely identify each row in a table; it cannot contain NULL values',
      'A foreign key reference pointing to an external parent table',
      'An encrypted hash column created automatically by the database engine',
    ],
    correctOptionIndex: 1,
    explanation:
      'A Primary Key must strictly satisfy uniqueness and entity integrity (NOT NULL).',
    category: 'technical',
    subject: 'DBMS',
    difficulty: 'Easy',
  },
  {
    id: 'tech-dbms-03',
    question: 'A table is in Second Normal Form (2NF) if it is in 1NF and satisfies which condition?',
    options: [
      'It has no transitive dependencies',
      'All non-key attributes are fully functionally dependent on the entire primary key (no partial dependency)',
      'Every determinant is a candidate key',
      'It contains no multi-valued dependencies',
    ],
    correctOptionIndex: 1,
    explanation:
      '2NF eliminates partial dependency. If a composite primary key exists, non-prime attributes cannot depend on only a subset of the key.',
    category: 'technical',
    subject: 'DBMS',
    difficulty: 'Medium',
  },
  {
    id: 'tech-dbms-04',
    question: 'What kind of dependency does Third Normal Form (3NF) eliminate?',
    options: ['Partial functional dependency', 'Transitive dependency', 'Trivial dependency', 'Cyclic dependency'],
    correctOptionIndex: 1,
    explanation:
      '3NF requires 2NF plus no transitive dependencies (i.e. non-key attribute $A \\to B$ where $B \\to C$, so $A \\to C$).',
    category: 'technical',
    subject: 'DBMS',
    difficulty: 'Medium',
  },
  {
    id: 'tech-dbms-05',
    question: 'Why are B+ Trees preferred over Binary Search Trees or standard B-Trees for database disk indexes?',
    options: [
      'B+ Trees only hold 2 children per node',
      'All records/data pointers reside at the leaf nodes, which are linked in a sequential doubly-linked list for fast range queries, and internal nodes hold more keys',
      'B+ Trees don’t require rebalancing on insertions',
      'B+ Trees consume zero disk storage space',
    ],
    correctOptionIndex: 1,
    explanation:
      'Because internal nodes store only keys and child pointers, fan-out is high (reducing tree height and disk I/O). Linked leaf nodes make range scans fast.',
    category: 'technical',
    subject: 'DBMS',
    difficulty: 'Medium',
  },
  {
    id: 'tech-dbms-06',
    question: 'How many Clustered Indexes can exist on a single database table in MySQL InnoDB / SQL Server?',
    options: ['Exactly one', 'Up to 16', 'Unlimited', 'One per column'],
    correctOptionIndex: 0,
    explanation:
      'A clustered index dictates the physical on-disk storage order of the table data rows. Since rows can only be sorted on disk in one order, only 1 clustered index can exist.',
    category: 'technical',
    subject: 'DBMS',
    difficulty: 'Easy',
  },
  {
    id: 'tech-dbms-07',
    question: 'In transaction concurrency control, what does Strict Two-Phase Locking (Strict 2PL) ensure?',
    options: [
      'Guarantees conflict serializability and avoids cascading aborts by holding exclusive locks until the end of the transaction (Commit/Abort)',
      'Eliminates the possibility of deadlocks completely',
      'Allows dirty reads to speed up query throughput',
      'Requires locks to be released before writing to disk',
    ],
    correctOptionIndex: 0,
    explanation:
      'Strict 2PL holds exclusive locks until commit/abort, which prevents cascading rollbacks and guarantees recoverable, conflict-serializable schedules.',
    category: 'technical',
    subject: 'DBMS',
    difficulty: 'Hard',
  },
  {
    id: 'tech-dbms-08',
    question: 'What is a "Dirty Read" in database transaction isolation levels?',
    options: [
      'A transaction reads data that was updated by another concurrent transaction but has not yet been committed',
      'A transaction reads data twice and finds rows deleted by another transaction',
      'A transaction reads rows that have corrupted checksums on disk',
      'A query reads cached index pages rather than raw disk pages',
    ],
    correctOptionIndex: 0,
    explanation:
      'A dirty read occurs at the READ UNCOMMITTED isolation level when transaction T1 reads modifications made by T2 before T2 commits (if T2 rolls back, T1 held invalid data).',
    category: 'technical',
    subject: 'DBMS',
    difficulty: 'Medium',
  },
  {
    id: 'tech-dbms-09',
    question: 'What is the highest and strictest SQL transaction isolation level?',
    options: ['READ COMMITTED', 'REPEATABLE READ', 'SERIALIZABLE', 'READ UNCOMMITTED'],
    correctOptionIndex: 2,
    explanation:
      'SERIALIZABLE prevents dirty reads, non-repeatable reads, and phantom reads by executing concurrent transactions as if they were executed serially one after another.',
    category: 'technical',
    subject: 'DBMS',
    difficulty: 'Easy',
  },
  {
    id: 'tech-dbms-10',
    question: 'What is the difference between DBMS and RDBMS?',
    options: [
      'DBMS stores data as files and does not enforce tabular relations; RDBMS organizes data into tables with primary/foreign keys satisfying relational constraints',
      'DBMS supports multi-user ACID transactions while RDBMS is single-user',
      'RDBMS cannot run SQL queries',
      'DBMS is strictly cloud-based, while RDBMS is local',
    ],
    correctOptionIndex: 0,
    explanation:
      'RDBMS follows Codd’s relational model using structured tables, relations, constraints, and relational algebra (e.g. PostgreSQL, MySQL).',
    category: 'technical',
    subject: 'DBMS',
    difficulty: 'Easy',
  },
  {
    id: 'tech-dbms-11',
    question: 'What is a Foreign Key constraint designed to enforce?',
    options: ['Entity Integrity', 'Domain Integrity', 'Referential Integrity', 'Column Encryption'],
    correctOptionIndex: 2,
    explanation:
      'A foreign key enforces referential integrity by ensuring the value in the child table references a valid, existing primary/unique key in the parent table.',
    category: 'technical',
    subject: 'DBMS',
    difficulty: 'Easy',
  },
  {
    id: 'tech-dbms-12',
    question: 'In database recovery, what does WAL (Write-Ahead Logging) dictate?',
    options: [
      'Log records must be written and flushed to non-volatile disk before the corresponding modified data pages are written to the database',
      'Data pages are written to disk before log records are generated',
      'Logs are created only when a power failure occurs',
      'Writing transactions without acquiring locks',
    ],
    correctOptionIndex: 0,
    explanation:
      'WAL guarantees Durability: log records describing state changes must reach persistent storage before buffer pages are written, enabling undo/redo recovery.',
    category: 'technical',
    subject: 'DBMS',
    difficulty: 'Hard',
  },
  {
    id: 'tech-dbms-13',
    question: 'What is Boyce-Codd Normal Form (BCNF)?',
    options: [
      'A stronger version of 3NF where for every non-trivial functional dependency X -> Y, X must be a superkey',
      'A normal form that handles XML and JSON data types',
      'A form that allows multi-valued dependencies',
      'A database without any foreign keys',
    ],
    correctOptionIndex: 0,
    explanation:
      'BCNF eliminates any remaining redundancy from overlapping candidate keys by requiring every determinant in a functional dependency to be a superkey.',
    category: 'technical',
    subject: 'DBMS',
    difficulty: 'Hard',
  },
  {
    id: 'tech-dbms-14',
    question: 'Which deadlock handling strategy uses timestamps to kill or abort younger transactions when older transactions need resources?',
    options: ['Wait-Die and Wound-Wait schemes', 'Round Robin arbitration', 'Banker’s algorithm', 'Two-phase locking'],
    correctOptionIndex: 0,
    explanation:
      'Wait-Die (non-preemptive) and Wound-Wait (preemptive) use transaction timestamps to decide whether a transaction waits or aborts, preventing circular wait deadlocks.',
    category: 'technical',
    subject: 'DBMS',
    difficulty: 'Hard',
  },
  {
    id: 'tech-dbms-15',
    question: 'What is a "Composite Key" in a database table?',
    options: [
      'A key that consists of two or more columns that together uniquely identify a record',
      'A key that encrypts data using two passwords',
      'A key that points to two external database servers',
      'A key that changes value on every insertion',
    ],
    correctOptionIndex: 0,
    explanation:
      'A composite key combines multiple attributes to create a unique identifier when no single column is sufficient.',
    category: 'technical',
    subject: 'DBMS',
    difficulty: 'Easy',
  },
];

export const sqlMCQs: TestQuestion[] = [
  {
    id: 'tech-sql-01',
    question: 'What is the main difference between `WHERE` and `HAVING` clauses in SQL?',
    options: [
      '`WHERE` filters rows before grouping/aggregations; `HAVING` filters groups after `GROUP BY` aggregation',
      '`WHERE` is used only for numeric columns; `HAVING` is used for text columns',
      '`HAVING` can be used without `GROUP BY`, but `WHERE` cannot',
      'There is no difference; they are interchangeable aliases',
    ],
    correctOptionIndex: 0,
    explanation:
      '`WHERE` filters individual table rows prior to aggregation. `HAVING` filters aggregated group records (e.g. `HAVING COUNT(*) > 5`).',
    category: 'technical',
    subject: 'SQL',
    difficulty: 'Easy',
  },
  {
    id: 'tech-sql-02',
    question: 'What is the key difference between `DELETE`, `TRUNCATE`, and `DROP` commands in SQL?',
    options: [
      '`DELETE` is DML (can rollback, row by row); `TRUNCATE` is DDL (fast deallocation, retains table structure); `DROP` removes table structure and data permanently',
      '`TRUNCATE` can be filtered with a `WHERE` clause',
      '`DELETE` removes the table structure from the catalog',
      '`DROP` only deletes duplicate rows',
    ],
    correctOptionIndex: 0,
    explanation:
      '`DELETE` deletes rows logged row-by-row (DML); `TRUNCATE` deallocates table pages quickly while keeping table schema (DDL); `DROP` destroys table schema and all data.',
    category: 'technical',
    subject: 'SQL',
    difficulty: 'Medium',
  },
  {
    id: 'tech-sql-03',
    question: 'What result is produced by the query `SELECT NULL = NULL;` in standard SQL?',
    options: ['TRUE (1)', 'FALSE (0)', 'UNKNOWN / NULL', 'Syntax Error'],
    correctOptionIndex: 2,
    explanation:
      'In three-valued SQL logic, `NULL` represents an unknown value. Comparing `NULL = NULL` yields `UNKNOWN` (evaluates to NULL), not TRUE. `IS NULL` must be used instead.',
    category: 'technical',
    subject: 'SQL',
    difficulty: 'Medium',
  },
  {
    id: 'tech-sql-04',
    question: 'How do `RANK()` and `DENSE_RANK()` differ when two rows have the same values?',
    options: [
      '`RANK()` leaves gaps in rank numbering after ties (e.g. 1, 1, 3); `DENSE_RANK()` has no gaps (e.g. 1, 1, 2)',
      '`DENSE_RANK()` leaves gaps while `RANK()` does not',
      '`RANK()` only works on integer values',
      '`DENSE_RANK()` cannot be partitioned with `PARTITION BY`',
    ],
    correctOptionIndex: 0,
    explanation:
      '`RANK()` skips ranks following ties ($1, 1, 3, 4$), whereas `DENSE_RANK()` assigns contiguous consecutive integers without skipping ($1, 1, 2, 3$).',
    category: 'technical',
    subject: 'SQL',
    difficulty: 'Medium',
  },
  {
    id: 'tech-sql-05',
    question: 'What does a `LEFT JOIN` return?',
    options: [
      'Only the rows that have matching values in both tables',
      'All rows from the left table, and matching rows from the right table (with NULLs for non-matches)',
      'All rows from the right table, and matching rows from the left table',
      'The Cartesian product of both tables',
    ],
    correctOptionIndex: 1,
    explanation:
      '`LEFT JOIN` keeps 100% of rows from the left table. If no matching row exists on the right table, right-side columns are filled with NULLs.',
    category: 'technical',
    subject: 'SQL',
    difficulty: 'Easy',
  },
  {
    id: 'tech-sql-06',
    question: 'How do you find the 2nd highest salary from an `Employee` table in SQL?',
    options: [
      '`SELECT MAX(salary) FROM Employee WHERE salary < (SELECT MAX(salary) FROM Employee);`',
      '`SELECT salary FROM Employee ORDER BY salary LIMIT 2;`',
      '`SELECT TOP 2 salary FROM Employee;`',
      '`SELECT salary FROM Employee WHERE salary = 2;`',
    ],
    correctOptionIndex: 0,
    explanation:
      'The subquery `(SELECT MAX(salary) FROM Employee)` finds the 1st highest salary. Filtering with `salary < MAX` and selecting the maximum of the remaining values gives the 2nd highest salary.',
    category: 'technical',
    subject: 'SQL',
    difficulty: 'Medium',
  },
  {
    id: 'tech-sql-07',
    question: 'What is the purpose of the `COALESCE(val1, val2, ...)` function in SQL?',
    options: [
      'Returns the average of the arguments',
      'Returns the first non-null expression among its arguments',
      'Concatenates strings together',
      'Splits comma-separated lists',
    ],
    correctOptionIndex: 1,
    explanation:
      '`COALESCE` scans arguments from left to right and returns the first value that is not `NULL`. If all are null, it returns NULL.',
    category: 'technical',
    subject: 'SQL',
    difficulty: 'Easy',
  },
  {
    id: 'tech-sql-08',
    question: 'What is a Common Table Expression (CTE) in SQL?',
    options: [
      'A permanent table stored on the hard drive',
      'A named temporary result set defined within the execution scope of a single `SELECT`, `INSERT`, `UPDATE`, or `DELETE` statement using the `WITH` clause',
      'An encrypted database connection string',
      'A type of foreign key constraint',
    ],
    correctOptionIndex: 1,
    explanation:
      'A CTE begins with `WITH cte_name AS (...)` and provides readable, reusable, and optionally recursive temporary query abstractions.',
    category: 'technical',
    subject: 'SQL',
    difficulty: 'Medium',
  },
  {
    id: 'tech-sql-09',
    question: 'What does `UNION ALL` do compared to `UNION` in SQL?',
    options: [
      '`UNION` removes duplicate rows, whereas `UNION ALL` retains all duplicates and executes faster',
      '`UNION ALL` removes duplicates, whereas `UNION` does not',
      '`UNION ALL` performs a cross join',
      '`UNION` requires both tables to have different columns',
    ],
    correctOptionIndex: 0,
    explanation:
      '`UNION` performs a sort/hash distinct operation to strip duplicates. `UNION ALL` concatenates both sets directly without sorting, making it significantly faster.',
    category: 'technical',
    subject: 'SQL',
    difficulty: 'Easy',
  },
  {
    id: 'tech-sql-10',
    question: 'Which SQL operator is used to test whether a subquery returns any records at all?',
    options: ['`IN`', '`EXISTS`', '`LIKE`', '`BETWEEN`'],
    correctOptionIndex: 1,
    explanation:
      '`EXISTS (subquery)` evaluates to TRUE as soon as the first matching row is found in the subquery, making it very efficient for existence checks.',
    category: 'technical',
    subject: 'SQL',
    difficulty: 'Easy',
  },
  {
    id: 'tech-sql-11',
    question: 'What does the `SELF JOIN` represent in SQL?',
    options: [
      'Joining a table to itself using aliases to compare rows within the same table',
      'A join that automatically detects foreign keys without an `ON` clause',
      'A join performed automatically by the operating system kernel',
      'A join between a local table and an external API',
    ],
    correctOptionIndex: 0,
    explanation:
      'A `SELF JOIN` joins a table to itself (e.g. `FROM Employee e JOIN Employee m ON e.manager_id = m.id`) using table aliases.',
    category: 'technical',
    subject: 'SQL',
    difficulty: 'Easy',
  },
  {
    id: 'tech-sql-12',
    question: 'What is the purpose of `ROW_NUMBER() OVER (PARTITION BY dept_id ORDER BY salary DESC)`?',
    options: [
      'Calculates the sum of salaries in each department',
      'Assigns an incrementing integer starting at 1 to each employee within their department, ordered by highest salary first',
      'Deletes duplicate rows in each department',
      'Filters only departments with more than 1 employee',
    ],
    correctOptionIndex: 1,
    explanation:
      '`ROW_NUMBER()` with `PARTITION BY dept_id` resets the row counter to 1 for each department and orders employees by salary descending.',
    category: 'technical',
    subject: 'SQL',
    difficulty: 'Medium',
  },
  {
    id: 'tech-sql-13',
    question: 'Which of the following aggregate functions ignores `NULL` values during calculation?',
    options: ['`COUNT(*)`', '`AVG(column_name)`', 'Both ignore NULLs', 'Neither ignores NULLs'],
    correctOptionIndex: 1,
    explanation:
      '`AVG(col)`, `SUM(col)`, `MIN(col)`, `MAX(col)` ignore NULL entries when computing results. `COUNT(*)` counts all rows regardless of NULLs.',
    category: 'technical',
    subject: 'SQL',
    difficulty: 'Medium',
  },
  {
    id: 'tech-sql-14',
    question: 'What is a Correlated Subquery?',
    options: [
      'A subquery that can be executed independently of the outer query',
      'A subquery that references columns from the outer query, causing it to be evaluated once for every row processed by the outer query',
      'A subquery that contains a `GROUP BY` clause',
      'A subquery that modifies data using `UPDATE`',
    ],
    correctOptionIndex: 1,
    explanation:
      'A correlated subquery depends on values from the outer query for its evaluation and cannot execute as a standalone statement.',
    category: 'technical',
    subject: 'SQL',
    difficulty: 'Hard',
  },
  {
    id: 'tech-sql-15',
    question: 'What is the purpose of the `CASCADE` option in a foreign key constraint (`ON DELETE CASCADE`)?',
    options: [
      'Prevents deletion of rows in the parent table if child records exist',
      'Automatically deletes all matching child records when the referenced parent record is deleted',
      'Replaces child foreign key values with 0',
      'Rolls back the parent deletion after 24 hours',
    ],
    correctOptionIndex: 1,
    explanation:
      '`ON DELETE CASCADE` automatically removes referencing rows in child tables whenever the corresponding parent row is deleted, maintaining referential integrity.',
    category: 'technical',
    subject: 'SQL',
    difficulty: 'Easy',
  },
];
