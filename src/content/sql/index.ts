import { TechnicalTopic, PracticalSQLProblem } from '@/types/technical';

export const sqlTopics: TechnicalTopic[] = [
  {
    id: 'sql-01-dbms-rdbms-basics',
    number: 1,
    title: 'DBMS and RDBMS Basics',
    category: 'sql',
    subject: 'SQL',
    codeLanguage: 'sql',
    explanation:
      'A Database Management System (DBMS) stores and retrieves data as files. A Relational Database Management System (RDBMS) stores data in structured tabular format (tables consisting of rows and columns) connected through foreign keys. RDBMS enforces relational integrity, schema constraints, and ACID properties using Structured Query Language (SQL).',
    codeOrSyntax: `-- Standard SQL table creation in RDBMS
CREATE TABLE Employees (
    emp_id INT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    department VARCHAR(30),
    salary DECIMAL(10, 2)
);`,
    sampleTable: `Table: Employees
+--------+---------+------------+----------+
| emp_id | name    | department | salary   |
+--------+---------+------------+----------+
| 1      | Alice   | IT         | 75000.00 |
| 2      | Bob     | HR         | 52000.00 |
+--------+---------+------------+----------+`,
    expectedOutput: `Table created successfully with relational integrity constraints.`,
    interviewQuestions: [
      'What are the core differences between DBMS and RDBMS?',
      'Why is RDBMS preferred over traditional file systems for transactional data?',
      'What are DDL, DML, DCL, and TCL commands in SQL?',
    ],
    commonMistakes: [
      'Assuming MySQL, PostgreSQL, and SQLite are non-relational.',
      'Treating flat CSV files as a full relational database.',
    ],
    revisionNotes: [
      'DBMS: File-based storage, flat data, no foreign key integrity enforcement.',
      'RDBMS: Relational tables (relations), ACID compliance, foreign keys, normalized schema.',
      'SQL sub-languages: DDL (CREATE, ALTER, DROP), DML (INSERT, SELECT, UPDATE, DELETE), DCL (GRANT, REVOKE), TCL (COMMIT, ROLLBACK).',
    ],
  },
  {
    id: 'sql-02-pk-fk-constraints',
    number: 2,
    title: 'Primary Key and Foreign Key',
    category: 'sql',
    subject: 'SQL',
    codeLanguage: 'sql',
    explanation:
      'A Primary Key uniquely identifies each row in a table. It cannot accept NULL values and must be unique. A Foreign Key is a field (or collection of fields) that refers to the Primary Key of another table, establishing a parent-child relationship and enforcing Referential Integrity. Actions like ON DELETE CASCADE ensure child records are removed when a parent is deleted.',
    codeOrSyntax: `CREATE TABLE Departments (
    dept_id INT PRIMARY KEY,
    dept_name VARCHAR(50) NOT NULL
);

CREATE TABLE Employees (
    emp_id INT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    dept_id INT,
    FOREIGN KEY (dept_id) REFERENCES Departments(dept_id)
        ON DELETE CASCADE
);`,
    sampleTable: `Departments (Parent): dept_id=101 ('Engineering')
Employees (Child): emp_id=1, name='Alice', dept_id=101`,
    expectedOutput: `Referential integrity enforced: dept_id in Employees must exist in Departments.`,
    interviewQuestions: [
      'Can a table have multiple Primary Keys? What is a Composite Key?',
      'Difference between Primary Key and Unique Key?',
      'What does ON DELETE CASCADE do and what are the alternatives (SET NULL, RESTRICT)?',
    ],
    commonMistakes: [
      'Inserting a foreign key value that does not exist in the referenced parent table.',
      'Confusing a composite primary key (one key composed of multiple columns) with having multiple primary keys.',
    ],
    revisionNotes: [
      'Primary Key = UNIQUE + NOT NULL (Only 1 primary key per table).',
      'Unique Key = Allows 1 NULL value (multiple unique keys allowed per table).',
      'Foreign Key links child table to parent table. Enforces referential integrity.',
    ],
  },
  {
    id: 'sql-03-constraints',
    number: 3,
    title: 'Constraints: NOT NULL, UNIQUE, CHECK, DEFAULT',
    category: 'sql',
    subject: 'SQL',
    codeLanguage: 'sql',
    explanation:
      'Constraints enforce business rules and data consistency at the database level. NOT NULL ensures a column cannot contain NULL. UNIQUE guarantees all values in a column are distinct. CHECK ensures values satisfy a boolean predicate (e.g., age >= 18). DEFAULT supplies an automatic fallback value if no value is explicitly provided in an INSERT statement.',
    codeOrSyntax: `CREATE TABLE Users (
    user_id INT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    age INT CHECK (age >= 18),
    status VARCHAR(20) DEFAULT 'Active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`,
    sampleTable: `INSERT INTO Users (user_id, username, age) 
VALUES (1, 'alex_code', 21);`,
    expectedOutput: `Row inserted with status='Active' and created_at=CURRENT_TIMESTAMP automatically.`,
    interviewQuestions: [
      'Can a CHECK constraint reference columns from other tables?',
      'Can a column have both UNIQUE and NOT NULL constraints applied simultaneously?',
      'What happens if you try to insert a duplicate value into a column with a UNIQUE constraint?',
    ],
    commonMistakes: [
      'Inserting values that violate CHECK conditions (triggers immediate database constraint error).',
      'Assuming DEFAULT applies to explicit NULL inserts (DEFAULT only triggers when the column is omitted).',
    ],
    revisionNotes: [
      'NOT NULL: prevents missing values.',
      'UNIQUE: prevents duplicate entries (allows one NULL in most RDBMS).',
      'CHECK: validates range/expression (e.g. salary > 0).',
      'DEFAULT: provides automatic fallback value on omission.',
    ],
  },
  {
    id: 'sql-04-select-where-distinct',
    number: 4,
    title: 'SELECT, WHERE and DISTINCT',
    category: 'sql',
    subject: 'SQL',
    codeLanguage: 'sql',
    explanation:
      'SELECT specifies the projection of columns to retrieve. WHERE filters rows based on conditional predicates using comparison (=, !=, <, >, <=, >=), logical (AND, OR, NOT), range (BETWEEN), set membership (IN), and pattern matching (LIKE % and _). DISTINCT eliminates duplicate rows from the final result set.',
    codeOrSyntax: `-- Fetch unique departments with salaries exceeding 60,000
SELECT DISTINCT department
FROM Employees
WHERE salary > 60000 
  AND status = 'Active';`,
    sampleTable: `Employees:
+--------+---------+------------+--------+
| emp_id | name    | department | salary |
+--------+---------+------------+--------+
| 1      | Alice   | IT         | 75000  |
| 2      | Bob     | Sales      | 50000  |
| 3      | Charlie | IT         | 80000  |
+--------+---------+------------+--------+`,
    expectedOutput: `+------------+
| department |
+------------+
| IT         |
+------------+`,
    interviewQuestions: [
      'How does DISTINCT operate when multiple columns are selected (e.g., SELECT DISTINCT a, b)?',
      'Difference between LIKE "%abc" vs LIKE "abc%" in index usage and performance?',
      'What is the logical query processing order between SELECT and WHERE?',
    ],
    commonMistakes: [
      'Using WHERE col = NULL instead of WHERE col IS NULL.',
      'Assuming DISTINCT applies to only the first column in a multi-column SELECT list.',
    ],
    revisionNotes: [
      'WHERE executes before SELECT during SQL evaluation.',
      'DISTINCT applies to the combination of all selected columns in the projection.',
      'LIKE "abc%" can use indexes (B-Tree prefix); LIKE "%abc" causes a full table scan.',
    ],
  },
  {
    id: 'sql-05-order-by',
    number: 5,
    title: 'ORDER BY and Sorting',
    category: 'sql',
    subject: 'SQL',
    codeLanguage: 'sql',
    explanation:
      'ORDER BY sorts the returned rows in ascending (ASC, default) or descending (DESC) order. Multiple columns can be specified for secondary sorting. Relational tables are unordered sets by definition; without an explicit ORDER BY clause, the return order of rows is never guaranteed.',
    codeOrSyntax: `-- Sort employees by department ascending, then by salary descending
SELECT name, department, salary
FROM Employees
ORDER BY department ASC, salary DESC;`,
    sampleTable: `Employees:
+---------+------------+--------+
| name    | department | salary |
+---------+------------+--------+
| Alice   | IT         | 75000  |
| Charlie | IT         | 90000  |
| Bob     | HR         | 60000  |
+---------+------------+--------+`,
    expectedOutput: `+---------+------------+--------+
| name    | department | salary |
+---------+------------+--------+
| Bob     | HR         | 60000  |
| Charlie | IT         | 90000  |
| Alice   | IT         | 75000  |
+---------+------------+--------+`,
    interviewQuestions: [
      'Where do NULL values appear in sorting by default in MySQL vs PostgreSQL?',
      'How do you enforce NULL values to appear last in SQL sorting?',
      'In logical query execution order, does ORDER BY execute before or after SELECT?',
    ],
    commonMistakes: [
      'Assuming rows are stored or retrieved in insertion order without an ORDER BY clause.',
      'Sorting large unindexed datasets causing expensive disk-based external sorts (filesort).',
    ],
    revisionNotes: [
      'Default sorting order is ASC.',
      'ORDER BY executes near the very end of query execution, after WHERE, GROUP BY, and SELECT.',
      'Use NULLS LAST or NULLS FIRST in supported SQL engines to control null placement.',
    ],
  },
  {
    id: 'sql-06-insert-update-delete',
    number: 6,
    title: 'INSERT, UPDATE and DELETE (DML)',
    category: 'sql',
    subject: 'SQL',
    codeLanguage: 'sql',
    explanation:
      'Data Manipulation Language (DML) modifies table data. INSERT INTO adds new rows. UPDATE modifies existing row values based on a WHERE filter. DELETE removes specific rows matching a WHERE filter. Omitting the WHERE clause in UPDATE or DELETE will modify or delete every single row in the table.',
    codeOrSyntax: `-- 1. Insert new record
INSERT INTO Employees (emp_id, name, department, salary)
VALUES (4, 'Diana', 'Marketing', 65000);

-- 2. Update with safety WHERE clause
UPDATE Employees
SET salary = salary * 1.10
WHERE department = 'IT';

-- 3. Delete matching rows
DELETE FROM Employees
WHERE status = 'Inactive';`,
    sampleTable: `Before: Alice (IT, 75000)
After Update: Alice (IT, 82500)`,
    expectedOutput: `Rows updated/deleted with transaction safety.`,
    interviewQuestions: [
      'What happens if you run UPDATE or DELETE without a WHERE clause?',
      'Difference between DELETE and TRUNCATE in transaction rollback capability?',
      'How do you insert multiple rows in a single SQL statement for efficiency?',
    ],
    commonMistakes: [
      'Accidentally running UPDATE or DELETE without a WHERE clause in production.',
      'Failing to wrap critical multi-step DML modifications in a BEGIN TRANSACTION block.',
    ],
    revisionNotes: [
      'Always test WHERE clause with a SELECT before executing destructive UPDATE or DELETE.',
      'INSERT batching (INSERT INTO t VALUES (...), (...)) is significantly faster than multiple single inserts.',
      'DELETE generates undo logs and can be rolled back inside a transaction.',
    ],
  },
  {
    id: 'sql-07-aggregate-functions',
    number: 7,
    title: 'Aggregate Functions: COUNT, SUM, AVG, MIN, MAX',
    category: 'sql',
    subject: 'SQL',
    codeLanguage: 'sql',
    explanation:
      'Aggregate functions perform calculations across a set of rows and return a single scalar value. COUNT(*) counts all rows including NULLs; COUNT(column) counts non-NULL values only. SUM() computes total, AVG() computes arithmetic mean, MIN() finds smallest value, and MAX() finds largest. Aggregate functions ignore NULL values (except COUNT(*)).',
    codeOrSyntax: `SELECT 
    COUNT(*) AS total_employees,
    COUNT(commission) AS employees_with_comm,
    AVG(salary) AS avg_salary,
    MIN(salary) AS min_salary,
    MAX(salary) AS max_salary,
    SUM(salary) AS total_payroll
FROM Employees;`,
    sampleTable: `Salaries: [50000, 60000, 70000, NULL]`,
    expectedOutput: `COUNT(*)=4, COUNT(salary)=3, AVG=60000, MIN=50000, MAX=70000`,
    interviewQuestions: [
      'What is the difference between COUNT(*), COUNT(1), and COUNT(column_name)?',
      'How does AVG() handle NULL values?',
      'Can you use aggregate functions directly inside a WHERE clause? Why not?',
    ],
    commonMistakes: [
      'Writing WHERE salary > AVG(salary) directly (WHERE executes before aggregation; use subquery or HAVING).',
      'Assuming AVG() includes NULL rows as zeroes (it divides by non-null row count, skewing averages).',
    ],
    revisionNotes: [
      'COUNT(*) counts total rows including NULLs.',
      'COUNT(col), AVG(col), SUM(col) ignore NULL values completely.',
      'Aggregate functions cannot be used in WHERE; use HAVING or subqueries.',
    ],
  },
  {
    id: 'sql-08-group-by-having',
    number: 8,
    title: 'GROUP BY and HAVING',
    category: 'sql',
    subject: 'SQL',
    codeLanguage: 'sql',
    explanation:
      'GROUP BY groups rows sharing identical values in specified columns so aggregate functions can be applied per group. HAVING filters groups after aggregation has occurred (evaluating aggregate conditions like COUNT(*) > 5). WHERE filters individual rows before grouping; HAVING filters aggregated groups after grouping.',
    codeOrSyntax: `-- Find departments with more than 3 employees and average salary > 65000
SELECT department, COUNT(*) AS emp_count, AVG(salary) AS avg_sal
FROM Employees
WHERE status = 'Active'         -- 1. Filters raw rows before grouping
GROUP BY department             -- 2. Groups remaining rows
HAVING COUNT(*) > 3             -- 3. Filters aggregated groups
   AND AVG(salary) > 65000;`,
    sampleTable: `Departments: IT (5 employees, avg 75k), HR (2 employees, avg 50k)`,
    expectedOutput: `+------------+-----------+---------+
| department | emp_count | avg_sal |
+------------+-----------+---------+
| IT         | 5         | 75000   |
+------------+-----------+---------+`,
    interviewQuestions: [
      'What is the crucial difference between WHERE and HAVING in execution and purpose?',
      'Can you use HAVING without GROUP BY in a SQL query?',
      'Why must every non-aggregated column in the SELECT list be included in the GROUP BY clause?',
    ],
    commonMistakes: [
      'Using HAVING to filter non-aggregated column values that could have been filtered earlier with WHERE.',
      'Selecting a non-aggregated column that is missing from the GROUP BY clause.',
    ],
    revisionNotes: [
      'Logical order: FROM -> WHERE -> GROUP BY -> HAVING -> SELECT -> ORDER BY.',
      'WHERE filters raw individual rows before grouping.',
      'HAVING filters aggregated groups after grouping.',
    ],
  },
  {
    id: 'sql-09-inner-join',
    number: 9,
    title: 'INNER JOIN',
    category: 'sql',
    subject: 'SQL',
    codeLanguage: 'sql',
    explanation:
      'INNER JOIN returns only the rows that have matching values in both tables based on a specified join predicate (ON tableA.col = tableB.col). If a row in the left table has no matching counterpart in the right table (or vice versa), that row is completely excluded from the result set.',
    codeOrSyntax: `SELECT e.name, e.salary, d.dept_name
FROM Employees e
INNER JOIN Departments d 
    ON e.dept_id = d.dept_id;`,
    sampleTable: `Employees: Alice (dept 10), Bob (dept 20), Charlie (dept 99)
Departments: 10 ('Engineering'), 20 ('Sales')`,
    expectedOutput: `+-------+--------+-------------+
| name  | salary | dept_name   |
+-------+--------+-------------+
| Alice | 75000  | Engineering |
| Bob   | 50000  | Sales       |
+-------+--------+-------------+
(Charlie excluded because dept 99 has no match in Departments)`,
    interviewQuestions: [
      'What happens when duplicate join keys exist in both tables during an INNER JOIN?',
      'Difference between ON and WHERE clauses in an INNER JOIN?',
      'What is a Cartesian product (CROSS JOIN) and how does it relate to INNER JOIN without ON?',
    ],
    commonMistakes: [
      'Omitting the ON clause, inadvertently creating a massive CROSS JOIN (Cartesian product).',
      'Expecting unassigned rows (e.g. employee without department) to appear in INNER JOIN.',
    ],
    revisionNotes: [
      'INNER JOIN is the intersection of two tables based on the join key.',
      'Rows with NULL or non-matching join keys are excluded from both sides.',
      'Join condition goes in ON; post-join filtering goes in WHERE.',
    ],
  },
  {
    id: 'sql-10-left-join',
    number: 10,
    title: 'LEFT JOIN (LEFT OUTER JOIN)',
    category: 'sql',
    subject: 'SQL',
    codeLanguage: 'sql',
    explanation:
      'LEFT JOIN returns all rows from the left table, along with matched values from the right table. If there is no match in the right table, NULL values are populated for all columns belonging to the right table. Extremely useful for finding records with no relations (e.g., customers who placed zero orders via WHERE right_table.id IS NULL).',
    codeOrSyntax: `-- Find all employees, and their department name if assigned
SELECT e.name, d.dept_name
FROM Employees e
LEFT JOIN Departments d 
    ON e.dept_id = d.dept_id;

-- Anti-Join Pattern: Find employees NOT assigned to any valid department
SELECT e.name
FROM Employees e
LEFT JOIN Departments d ON e.dept_id = d.dept_id
WHERE d.dept_id IS NULL;`,
    sampleTable: `Employees: Alice (dept 10), Charlie (dept 99)
Departments: 10 ('Engineering')`,
    expectedOutput: `+---------+-------------+
| name    | dept_name   |
+---------+-------------+
| Alice   | Engineering |
| Charlie | NULL        |
+---------+-------------+`,
    interviewQuestions: [
      'How do you use LEFT JOIN to find non-matching records (Anti-Join)?',
      'What happens if you place a right table filter in the WHERE clause instead of ON in a LEFT JOIN?',
      'Difference between LEFT JOIN and FULL OUTER JOIN?',
    ],
    commonMistakes: [
      'Placing a right-table filter in WHERE (e.g. WHERE d.status = "Active"), which turns LEFT JOIN into INNER JOIN because NULLs are filtered out.',
    ],
    revisionNotes: [
      'LEFT JOIN keeps ALL rows from the left table unconditionally.',
      'Unmatched right columns become NULL.',
      'Anti-Join formula: LEFT JOIN ... ON a.id = b.id WHERE b.id IS NULL.',
    ],
  },
  {
    id: 'sql-11-right-join',
    number: 11,
    title: 'RIGHT JOIN and FULL OUTER JOIN',
    category: 'sql',
    subject: 'SQL',
    codeLanguage: 'sql',
    explanation:
      'RIGHT JOIN returns all rows from the right table, and matched rows from the left table (with NULLs for unmatched left columns). A RIGHT JOIN is logically identical to swapping table positions in a LEFT JOIN. FULL OUTER JOIN returns all rows when there is a match in either left or right table, filling missing sides with NULL (simulated in MySQL via UNION of LEFT and RIGHT joins).',
    codeOrSyntax: `-- Find all departments, even those with zero employees
SELECT d.dept_name, e.name
FROM Employees e
RIGHT JOIN Departments d 
    ON e.dept_id = d.dept_id;`,
    sampleTable: `Departments: 10 ('Eng'), 20 ('Sales'), 30 ('Marketing' - 0 emps)
Employees: Alice (10), Bob (20)`,
    expectedOutput: `+-------------+-------+
| dept_name   | name  |
+-------------+-------+
| Eng         | Alice |
| Sales       | Bob   |
| Marketing   | NULL  |
+-------------+-------+`,
    interviewQuestions: [
      'Why do most senior SQL engineers prefer LEFT JOIN over RIGHT JOIN in production queries?',
      'How do you simulate a FULL OUTER JOIN in database engines that do not natively support it (e.g., MySQL)?',
      'What is a CROSS JOIN?',
    ],
    commonMistakes: [
      'Using RIGHT JOIN in complex queries with multiple joins, making queries hard to read and reason about.',
      'Attempting FULL OUTER JOIN directly in MySQL without using UNION.',
    ],
    revisionNotes: [
      'RIGHT JOIN: keeps all rows from right table. (Convention: prefer LEFT JOIN for left-to-right readability).',
      'FULL OUTER JOIN: union of LEFT JOIN and RIGHT JOIN. Returns every row from both tables.',
    ],
  },
  {
    id: 'sql-12-self-join',
    number: 12,
    title: 'SELF JOIN',
    category: 'sql',
    subject: 'SQL',
    codeLanguage: 'sql',
    explanation:
      'A SELF JOIN is a regular join in which a table is joined with itself. It requires distinct table aliases (e.g., e for employee, m for manager). It is the classic pattern for querying hierarchical data stored in a single table, such as employee-manager relationships, parent-child categories, or sequential event comparisons.',
    codeOrSyntax: `-- Find employees and their direct manager's name from the same table
SELECT 
    e.name AS employee_name,
    m.name AS manager_name
FROM Employees e
LEFT JOIN Employees m 
    ON e.manager_id = m.emp_id;`,
    sampleTable: `Employees:
+--------+---------+------------+
| emp_id | name    | manager_id |
+--------+---------+------------+
| 1      | Alice   | NULL (CEO) |
| 2      | Bob     | 1          |
| 3      | Charlie | 1          |
+--------+---------+------------+`,
    expectedOutput: `+---------------+--------------+
| employee_name | manager_name |
+---------------+--------------+
| Alice         | NULL         |
| Bob           | Alice        |
| Charlie       | Alice        |
+---------------+--------------+`,
    interviewQuestions: [
      'How do you write a query to find employees earning more than their managers?',
      'Why are table aliases strictly mandatory in a SELF JOIN?',
      'How does SELF JOIN compare to recursive CTEs for deep multi-level hierarchies?',
    ],
    commonMistakes: [
      'Forgetting table aliases, causing "column ambiguously defined" syntax errors.',
      'Using INNER JOIN instead of LEFT JOIN, accidentally excluding top-level executives who have no manager.',
    ],
    revisionNotes: [
      'SELF JOIN = joining a table to itself using two distinct aliases.',
      'Crucial for employee-manager, consecutive dates, and sequential comparison problems.',
    ],
  },
  {
    id: 'sql-13-subqueries',
    number: 13,
    title: 'Subqueries: Single-row, Multi-row, Correlated vs Non-Correlated',
    category: 'sql',
    subject: 'SQL',
    codeLanguage: 'sql',
    explanation:
      'A subquery is a nested query inside another SQL statement. Non-correlated subqueries execute once independently; their result is used by the outer query. Correlated subqueries reference columns from the outer query and execute once per candidate row evaluated by the outer query. Subqueries can appear in SELECT, FROM (derived tables), or WHERE clauses.',
    codeOrSyntax: `-- 1. Non-correlated: Employees earning above average salary
SELECT name, salary
FROM Employees
WHERE salary > (SELECT AVG(salary) FROM Employees);

-- 2. Correlated: Employees earning above their department's average
SELECT e.name, e.salary, e.department
FROM Employees e
WHERE e.salary > (
    SELECT AVG(d.salary)
    FROM Employees d
    WHERE d.department = e.department -- References outer query 'e'
);`,
    sampleTable: `Alice (IT, 80k, IT avg 70k), Bob (HR, 50k, HR avg 55k)`,
    expectedOutput: `+-------+--------+------------+
| name  | salary | department |
+-------+--------+------------+
| Alice | 80000  | IT         |
+-------+--------+------------+`,
    interviewQuestions: [
      'What is the performance difference between correlated and non-correlated subqueries?',
      'What are IN, ANY, ALL, and EXISTS operators in subqueries?',
      'When is EXISTS faster than IN for subquery evaluation?',
    ],
    commonMistakes: [
      'Using single-row comparison operator (=) with a subquery that returns multiple rows (triggers runtime error).',
      'Overusing correlated subqueries over JOINs or Window Functions on large datasets (can cause O(N^2) complexity).',
    ],
    revisionNotes: [
      'Non-correlated: runs once, cached, fast.',
      'Correlated: runs once per outer row, can be slow on big tables.',
      'EXISTS returns boolean immediately on first match; IN loads the entire subquery result set.',
    ],
  },
  {
    id: 'sql-14-cte-basics',
    number: 14,
    title: 'Common Table Expressions (CTE) & WITH Clause',
    category: 'sql',
    subject: 'SQL',
    codeLanguage: 'sql',
    explanation:
      'A Common Table Expression (CTE) is a temporary named result set defined using the WITH clause. CTEs dramatically improve readability and modularity compared to deeply nested subqueries. They can be referenced multiple times within the same statement and support recursion (WITH RECURSIVE) for traversing hierarchical graph and tree structures.',
    codeOrSyntax: `-- CTE to compute department payroll summaries
WITH DeptPayroll AS (
    SELECT department, SUM(salary) AS total_payroll, COUNT(*) AS emp_count
    FROM Employees
    GROUP BY department
)
SELECT department, total_payroll, emp_count
FROM DeptPayroll
WHERE total_payroll > 150000;`,
    sampleTable: `Employees grouped into DeptPayroll CTE`,
    expectedOutput: `+------------+---------------+-----------+
| department | total_payroll | emp_count |
+------------+---------------+-----------+
| IT         | 240000        | 3         |
+------------+---------------+-----------+`,
    interviewQuestions: [
      'What are the advantages of CTEs over nested subqueries and temporary tables?',
      'What is a Recursive CTE and what are its base case and recursive step?',
      'Does a CTE persist in database storage after query completion?',
    ],
    commonMistakes: [
      'Attempting to reference a CTE outside the immediate query that defines it.',
      'Writing an infinite loop in a recursive CTE without a terminating WHERE condition.',
    ],
    revisionNotes: [
      'Syntax: WITH cte_name AS (SELECT ...) SELECT ... FROM cte_name.',
      'Scope is limited strictly to the single execution of the subsequent statement.',
      'Greatly improves maintainability of complex analytical queries.',
    ],
  },
  {
    id: 'sql-15-window-functions',
    number: 15,
    title: 'Window Functions: ROW_NUMBER, RANK, DENSE_RANK',
    category: 'sql',
    subject: 'SQL',
    codeLanguage: 'sql',
    explanation:
      'Window functions perform calculations across a subset of table rows (a "window") related to the current row, without collapsing rows like GROUP BY does. Syntax: FUNCTION() OVER (PARTITION BY col ORDER BY col). ROW_NUMBER() assigns strictly consecutive integers (1, 2, 3, 4). RANK() leaves gaps after ties (1, 2, 2, 4). DENSE_RANK() leaves NO gaps after ties (1, 2, 2, 3).',
    codeOrSyntax: `-- Rank employees by salary within each department
SELECT 
    name, department, salary,
    ROW_NUMBER() OVER (PARTITION BY department ORDER BY salary DESC) AS row_num,
    RANK()       OVER (PARTITION BY department ORDER BY salary DESC) AS rnk,
    DENSE_RANK() OVER (PARTITION BY department ORDER BY salary DESC) AS dense_rnk
FROM Employees;`,
    sampleTable: `IT Salaries: Charlie(90k), Alice(80k), David(80k), Eve(70k)`,
    expectedOutput: `+---------+--------+---------+-----+-----------+
| name    | salary | row_num | rnk | dense_rnk |
+---------+--------+---------+-----+-----------+
| Charlie | 90000  | 1       | 1   | 1         |
| Alice   | 80000  | 2       | 2   | 2         |
| David   | 80000  | 3       | 2   | 2         |
| Eve     | 70000  | 4       | 4   | 3         |
+---------+--------+---------+-----+-----------+`,
    interviewQuestions: [
      'What is the exact behavioral difference between ROW_NUMBER, RANK, and DENSE_RANK when ties occur?',
      'How do you write a query to find the Nth highest salary using DENSE_RANK()?',
      'What is the difference between PARTITION BY and GROUP BY?',
    ],
    commonMistakes: [
      'Using window functions directly inside a WHERE clause (window functions execute after WHERE; wrap in CTE/subquery).',
      'Using RANK() instead of DENSE_RANK() for Nth highest salary (RANK skips rank numbers, missing positions on ties).',
    ],
    revisionNotes: [
      'ROW_NUMBER: 1, 2, 3, 4 (no duplicates, strictly unique).',
      'RANK: 1, 2, 2, 4 (ties share rank, skips subsequent rank numbers).',
      'DENSE_RANK: 1, 2, 2, 3 (ties share rank, NO rank numbers skipped).',
      'Standard pattern for top N: WITH ranked AS (...) SELECT * FROM ranked WHERE rnk = N.',
    ],
  },
  {
    id: 'sql-16-null-handling',
    number: 16,
    title: 'NULL Handling: Three-Valued Logic, COALESCE, IFNULL',
    category: 'sql',
    subject: 'SQL',
    codeLanguage: 'sql',
    explanation:
      'In SQL, NULL represents missing or unknown data, operating under Three-Valued Logic (TRUE, FALSE, UNKNOWN). Comparisons with NULL (e.g., NULL = NULL or NULL != 5) evaluate to UNKNOWN, not TRUE. Therefore, you must use IS NULL and IS NOT NULL. COALESCE(val1, val2, ...) returns the first non-NULL expression in the list. IFNULL(val, default) provides a binary fallback.',
    codeOrSyntax: `-- 1. Correct test for null
SELECT name FROM Employees WHERE manager_id IS NULL;

-- 2. Safe calculation replacing NULL commission with 0
SELECT name, salary + COALESCE(commission, 0) AS total_comp
FROM Employees;`,
    sampleTable: `Alice: salary 70000, commission NULL
Bob: salary 60000, commission 5000`,
    expectedOutput: `Alice total_comp = 70000 (salary + 0)
Bob total_comp = 65000 (salary + 5000)`,
    interviewQuestions: [
      'Why does col = NULL return 0 rows even when col contains NULL values?',
      'What is Three-Valued Logic in SQL?',
      'Difference between COALESCE and IFNULL / NVL?',
    ],
    commonMistakes: [
      'Writing WHERE col = NULL or WHERE col != NULL.',
      'Performing arithmetic with NULL (e.g., 500 + NULL returns NULL!).',
      'Using NOT IN with a subquery containing NULL values (returns empty result set).',
    ],
    revisionNotes: [
      'Never use = NULL; always use IS NULL or IS NOT NULL.',
      'Arithmetic with NULL yields NULL: val + NULL = NULL.',
      'COALESCE(a, b, c) returns first non-null argument.',
    ],
  },
  {
    id: 'sql-17-delete-truncate-drop',
    number: 17,
    title: 'DELETE vs TRUNCATE vs DROP',
    category: 'sql',
    subject: 'SQL',
    codeLanguage: 'sql',
    explanation:
      'DELETE is a DML command that removes specific rows matching a WHERE clause; it logs every deleted row individually in transaction logs and can be rolled back. TRUNCATE is a DDL command that deallocates entire table data pages at once; it is much faster, resets auto-increment counters, but cannot filter rows. DROP is a DDL command that destroys the entire table structure, indexes, constraints, and data permanently from the database catalog.',
    codeOrSyntax: `-- DELETE: Row-by-row, logged, supports WHERE
DELETE FROM Logs WHERE created_at < '2025-01-01';

-- TRUNCATE: Instant page deallocation, resets identity, no WHERE
TRUNCATE TABLE TempStaging;

-- DROP: Completely deletes table and schema
DROP TABLE ObsoleteData;`,
    sampleTable: `Command Comparison Table`,
    expectedOutput: `DELETE: Data gone, structure remains, can rollback.
TRUNCATE: Data gone, structure remains, resets counter, fast.
DROP: Data and structure both destroyed.`,
    interviewQuestions: [
      'Detailed comparison of DELETE, TRUNCATE, and DROP across DDL/DML, speed, rollback, and triggers?',
      'Why does TRUNCATE execute orders of magnitude faster than DELETE on large tables?',
      'Do DML triggers fire during a TRUNCATE operation?',
    ],
    commonMistakes: [
      'Attempting to TRUNCATE a table referenced by foreign key constraints (fails in most RDBMS).',
      'Thinking TRUNCATE can take a WHERE clause.',
      'Assuming TRUNCATE cannot be rolled back (in PostgreSQL and SQL Server it CAN be rolled back inside a transaction).',
    ],
    revisionNotes: [
      'DELETE: DML, row-by-row logging, fires triggers, supports WHERE, slower.',
      'TRUNCATE: DDL, deallocates data pages, resets AUTO_INCREMENT, no WHERE, fast.',
      'DROP: DDL, completely destroys table schema, indexes, and data from catalog.',
    ],
  },
  {
    id: 'sql-18-normalization',
    number: 18,
    title: 'Database Normalization: 1NF, 2NF and 3NF',
    category: 'sql',
    subject: 'SQL',
    codeLanguage: 'sql',
    explanation:
      'Normalization organizes database tables to minimize data redundancy and eliminate insertion, update, and deletion anomalies. 1NF: Atomic values (no repeating groups or comma-separated lists), primary key defined. 2NF: In 1NF + no Partial Dependency (every non-key attribute fully dependent on whole primary key). 3NF: In 2NF + no Transitive Dependency (non-key attribute must not depend on another non-key attribute).',
    codeOrSyntax: `-- 1NF violation: phone_numbers = "123, 456"
-- 1NF fix: Separate rows or child table

-- 2NF fix: If PK is (student_id, course_id), course_name depends only on course_id!
-- Separate into Students, Courses, and Enrollments

-- 3NF fix: If dept_name depends on dept_id, which depends on emp_id (emp_id -> dept_id -> dept_name).
-- Separate into Employees(emp_id, name, dept_id) and Departments(dept_id, dept_name).`,
    sampleTable: `Anomalies without Normalization:
Update: Changing department name requires updating 10,000 employee rows.
Delete: Deleting last employee deletes department record permanently!`,
    expectedOutput: `Normalized schema eliminates data redundancy and update anomalies.`,
    interviewQuestions: [
      'What are Insertion, Update, and Deletion anomalies?',
      'Difference between 2NF and 3NF with real-world examples?',
      'What is Denormalization and when is it intentionally used in production databases?',
    ],
    commonMistakes: [
      'Storing comma-separated values in a single column (breaks 1NF).',
      'Over-normalizing read-heavy analytical databases causing 15-way joins (denormalization is used in data warehouses).',
    ],
    revisionNotes: [
      '1NF: Atomic attributes, unique primary key, no multivalued columns.',
      '2NF: 1NF + No partial dependencies (only applies when PK is composite).',
      '3NF: 2NF + No transitive dependencies (non-key -> non-key).',
      'Mnemonic: Every attribute depends on the key (1NF), the whole key (2NF), and nothing but the key (3NF).',
    ],
  },
  {
    id: 'sql-19-indexes',
    number: 19,
    title: 'Database Indexing: B-Tree, Clustered vs Non-Clustered',
    category: 'sql',
    subject: 'SQL',
    codeLanguage: 'sql',
    explanation:
      'An Index is a data structure (typically a B+ Tree) that speeds up data retrieval from O(N) full table scan to O(log N) lookup. Clustered Index physically determines the storage order of rows on disk (only 1 per table, usually the Primary Key). Non-Clustered Index is a separate structure containing indexed columns and a pointer (row locator) to the physical data page (multiple allowed per table).',
    codeOrSyntax: `-- Create non-clustered index on email for O(log N) lookup
CREATE INDEX idx_user_email ON Users(email);

-- Composite index for queries filtering by department and status
CREATE INDEX idx_emp_dept_status ON Employees(department, status);`,
    sampleTable: `Without Index: Full Table Scan (scans 1,000,000 rows, 450ms)
With B+ Tree Index: Index Seek (reads 3 tree nodes, 1ms)`,
    expectedOutput: `O(log N) point lookup performance.`,
    interviewQuestions: [
      'Difference between Clustered and Non-Clustered Index?',
      'What are the performance trade-offs of adding too many indexes to a table?',
      'What is a Covering Index in SQL?',
    ],
    commonMistakes: [
      'Over-indexing write-heavy tables (every INSERT/UPDATE/DELETE requires updating all associated indexes).',
      'Using functions on indexed columns (e.g. WHERE YEAR(created_at) = 2026), which disables index seeks.',
    ],
    revisionNotes: [
      'Clustered Index: Sorts physical data rows. Only 1 per table (Primary Key by default).',
      'Non-Clustered Index: Separate B+ Tree with pointers to data. Multiple allowed.',
      'Covering Index: Contains all columns requested by the query, avoiding table lookup completely.',
    ],
  },
  {
    id: 'sql-20-acid-properties',
    number: 20,
    title: 'ACID Properties in Relational Databases',
    category: 'sql',
    subject: 'SQL',
    codeLanguage: 'sql',
    explanation:
      'ACID guarantees reliability in transactional databases. Atomicity: All operations in a transaction succeed, or all are rolled back ("All or Nothing"). Consistency: Database transitions only between valid states satisfying all constraints. Isolation: Concurrent transactions execute without interfering with one another. Durability: Once committed, updates survive power loss or system crashes (via Write-Ahead Logging).',
    codeOrSyntax: `-- Classic Bank Transfer Example: Atomicity requirement
START TRANSACTION;

UPDATE Accounts SET balance = balance - 500 WHERE account_id = 101;
-- If server crashes here, Atomicity rolls back step 1!
UPDATE Accounts SET balance = balance + 500 WHERE account_id = 202;

COMMIT;`,
    sampleTable: `ACID Breakdown:
A: All or nothing
C: Schema rules enforced
I: Isolation levels (Read Committed, Serializable)
D: WAL logs to disk before acknowledging commit`,
    expectedOutput: `Guaranteed transactional integrity and zero money loss.`,
    interviewQuestions: [
      'Explain each of the 4 ACID properties with a banking transfer example.',
      'How does Write-Ahead Logging (WAL) ensure Durability?',
      'What are the 4 standard Transaction Isolation Levels?',
    ],
    commonMistakes: [
      'Assuming Consistency in ACID means distributed data replication consistency (it means schema constraint integrity).',
      'Failing to handle transaction rollbacks on application errors.',
    ],
    revisionNotes: [
      'A: Atomicity - All or nothing (Undo log).',
      'C: Consistency - Maintains integrity constraints.',
      'I: Isolation - Prevents dirty reads, non-repeatable reads, phantoms.',
      'D: Durability - Committed changes are permanent on disk (Redo log / WAL).',
    ],
  },
  {
    id: 'sql-21-transactions',
    number: 21,
    title: 'Transactions and Concurrency: COMMIT, ROLLBACK, SAVEPOINT',
    category: 'sql',
    subject: 'SQL',
    codeLanguage: 'sql',
    explanation:
      'A Transaction is a single logical unit of work. TCL commands: START TRANSACTION / BEGIN begins the unit. COMMIT writes changes permanently to disk. ROLLBACK reverts all changes made since the transaction started. SAVEPOINT sets an intermediate checkpoint allowing partial rollback (ROLLBACK TO SAVEPOINT). Isolation levels prevent concurrency anomalies (Dirty Read, Non-Repeatable Read, Phantom Read).',
    codeOrSyntax: `START TRANSACTION;

INSERT INTO Orders (order_id, user_id, amount) VALUES (901, 12, 1500);
SAVEPOINT order_created;

-- Attempt inventory reduction
UPDATE Inventory SET stock = stock - 1 WHERE product_id = 45;

-- If inventory check fails:
-- ROLLBACK TO SAVEPOINT order_created;

COMMIT; -- Commits everything`,
    sampleTable: `Isolation Anomalies:
Dirty Read: Reading uncommitted data.
Non-Repeatable Read: Same query gets different data values.
Phantom Read: Same query gets new rows inserted by another transaction.`,
    expectedOutput: `Controlled concurrent execution without corruption.`,
    interviewQuestions: [
      'What are the 4 Isolation Levels: Read Uncommitted, Read Committed, Repeatable Read, Serializable?',
      'What is a Dirty Read, a Non-Repeatable Read, and a Phantom Read?',
      'What is a Deadlock and how does RDBMS resolve it?',
    ],
    commonMistakes: [
      'Keeping transactions open for long periods waiting for external API calls, locking database rows.',
      'Not specifying appropriate isolation levels, leading to concurrency bugs or severe lock contention.',
    ],
    revisionNotes: [
      'COMMIT: saves changes permanently.',
      'ROLLBACK: discards changes since transaction begin or savepoint.',
      'Default isolation level in MySQL InnoDB is Repeatable Read; in PostgreSQL it is Read Committed.',
    ],
  },
];

export const practicalSQLProblems: PracticalSQLProblem[] = [
  {
    id: 'sql-q01-second-highest-salary',
    number: 1,
    title: 'Second Highest Salary',
    difficulty: 'Basic',
    pattern: 'Subqueries',
    statement: 'Write a SQL query to find the second highest salary from the Employee table. If there is no second highest salary, return NULL.',
    sampleTable: `Employee:
+----+--------+
| id | salary |
+----+--------+
| 1  | 100    |
| 2  | 200    |
| 3  | 300    |
+----+--------+`,
    expectedOutput: `+---------------------+
| SecondHighestSalary |
+---------------------+
| 200                 |
+---------------------+`,
    sqlSolution: `SELECT (
    SELECT DISTINCT salary 
    FROM Employee 
    ORDER BY salary DESC 
    LIMIT 1 OFFSET 1
) AS SecondHighestSalary;`,
    explanation: 'Using a subquery ensures that if fewer than 2 distinct salaries exist, SQL returns NULL rather than an empty result set. DISTINCT handles duplicate salaries.',
  },
  {
    id: 'sql-q02-nth-highest-salary',
    number: 2,
    title: 'Nth Highest Salary using DENSE_RANK',
    difficulty: 'Intermediate',
    pattern: 'Window Functions',
    statement: 'Write a query to find the Nth highest salary from the Employee table. If fewer than N distinct salaries exist, return NULL.',
    sampleTable: `Employee: salaries = [100, 200, 300, 300], N = 2`,
    expectedOutput: `+------------------+
| getNthHighest(2) |
+------------------+
| 200              |
+------------------+`,
    sqlSolution: `WITH RankedSalaries AS (
    SELECT salary, DENSE_RANK() OVER (ORDER BY salary DESC) as rnk
    FROM Employee
)
SELECT MAX(salary) AS NthHighestSalary
FROM RankedSalaries
WHERE rnk = 2;`,
    explanation: 'DENSE_RANK() assigns identical ranks to duplicate salaries without skipping subsequent ranks. MAX() guarantees returning NULL if no row satisfies rnk = N.',
  },
  {
    id: 'sql-q03-employees-earning-more-than-managers',
    number: 3,
    title: 'Employees Earning More Than Their Managers',
    difficulty: 'Basic',
    pattern: 'Joins',
    statement: 'Find all employees who earn more than their direct managers. Return employee names.',
    sampleTable: `Employee:
+----+-------+--------+-----------+
| id | name  | salary | managerId |
+----+-------+--------+-----------+
| 1  | Joe   | 70000  | 3         |
| 2  | Henry | 80000  | 4         |
| 3  | Sam   | 60000  | NULL      |
| 4  | Max   | 90000  | NULL      |
+----+-------+--------+-----------+`,
    expectedOutput: `+----------+
| Employee |
+----------+
| Joe      |
+----------+`,
    sqlSolution: `SELECT e.name AS Employee
FROM Employee e
INNER JOIN Employee m 
    ON e.managerId = m.id
WHERE e.salary > m.salary;`,
    explanation: 'Perform a SELF JOIN matching employee managerId with manager id. Filter where employee salary exceeds manager salary.',
  },
  {
    id: 'sql-q04-duplicate-emails',
    number: 4,
    title: 'Duplicate Emails',
    difficulty: 'Basic',
    pattern: 'Aggregation & GROUP BY',
    statement: 'Write a query to find all duplicate emails in a table named Person.',
    sampleTable: `Person:
+----+------------------+
| id | email            |
+----+------------------+
| 1  | a@b.com          |
| 2  | c@d.com          |
| 3  | a@b.com          |
+----+------------------+`,
    expectedOutput: `+---------+
| Email   |
+---------+
| a@b.com |
+---------+`,
    sqlSolution: `SELECT email AS Email
FROM Person
GROUP BY email
HAVING COUNT(*) > 1;`,
    explanation: 'Group by email and filter groups with COUNT(*) > 1 using the HAVING clause.',
  },
  {
    id: 'sql-q05-customers-who-never-order',
    number: 5,
    title: 'Customers Who Never Order',
    difficulty: 'Basic',
    pattern: 'Joins',
    statement: 'Find all customers who never placed any orders. Return customer names.',
    sampleTable: `Customers: id=1 ('Joe'), id=2 ('Henry'), id=3 ('Sam')
Orders: id=1 (customerId=3), id=2 (customerId=1)`,
    expectedOutput: `+-----------+
| Customers |
+-----------+
| Henry     |
+-----------+`,
    sqlSolution: `SELECT c.name AS Customers
FROM Customers c
LEFT JOIN Orders o 
    ON c.id = o.customerId
WHERE o.customerId IS NULL;`,
    explanation: 'Anti-Join pattern: LEFT JOIN keeps all customers; filtering WHERE o.customerId IS NULL selects those with zero orders.',
  },
  {
    id: 'sql-q06-department-highest-salary',
    number: 6,
    title: 'Department Highest Salary',
    difficulty: 'Intermediate',
    pattern: 'Window Functions',
    statement: 'Find employees who have the highest salary in each of the departments.',
    sampleTable: `Employee: Alice (IT, 90k), Bob (IT, 90k), Charlie (HR, 70k)
Department: IT, HR`,
    expectedOutput: `+------------+----------+--------+
| Department | Employee | Salary |
+------------+----------+--------+
| IT         | Alice    | 90000  |
| IT         | Bob      | 90000  |
| HR         | Charlie  | 70000  |
+------------+----------+--------+`,
    sqlSolution: `WITH RankedSalaries AS (
    SELECT 
        d.name AS Department,
        e.name AS Employee,
        e.salary AS Salary,
        DENSE_RANK() OVER (PARTITION BY e.departmentId ORDER BY e.salary DESC) AS rnk
    FROM Employee e
    INNER JOIN Department d ON e.departmentId = d.id
)
SELECT Department, Employee, Salary
FROM RankedSalaries
WHERE rnk = 1;`,
    explanation: 'Partition by departmentId and order by salary DESC. DENSE_RANK() handles multiple employees sharing the highest salary in a department.',
  },
  {
    id: 'sql-q07-department-top-3-salaries',
    number: 7,
    title: 'Department Top 3 Salaries',
    difficulty: 'Intermediate',
    pattern: 'Window Functions',
    statement: 'Find employees who earn top 3 unique salaries in each department.',
    sampleTable: `Department and Employee tables with various salaries`,
    expectedOutput: `List of employees whose salary ranks 1, 2, or 3 within their department`,
    sqlSolution: `WITH Ranked AS (
    SELECT 
        d.name AS Department,
        e.name AS Employee,
        e.salary AS Salary,
        DENSE_RANK() OVER (PARTITION BY e.departmentId ORDER BY e.salary DESC) AS rnk
    FROM Employee e
    INNER JOIN Department d ON e.departmentId = d.id
)
SELECT Department, Employee, Salary
FROM Ranked
WHERE rnk <= 3;`,
    explanation: 'Using DENSE_RANK() with rnk <= 3 accurately finds the top 3 distinct salary tiers per department, handling ties gracefully.',
  },
  {
    id: 'sql-q08-delete-duplicate-emails',
    number: 8,
    title: 'Delete Duplicate Emails Keeping Smallest ID',
    difficulty: 'Intermediate',
    pattern: 'Filtering & DML',
    statement: 'Delete all duplicate email entries in Person, keeping only one unique email with the smallest id.',
    sampleTable: `Person: id=1 (john@example.com), id=2 (bob@example.com), id=3 (john@example.com)`,
    expectedOutput: `Person table updated so only id=1 and id=2 remain`,
    sqlSolution: `DELETE p1 
FROM Person p1
INNER JOIN Person p2 
    ON p1.email = p2.email 
   AND p1.id > p2.id;`,
    explanation: 'Join Person to itself on matching email where p1.id > p2.id. Deleting p1 removes the duplicate with the larger id.',
  },
  {
    id: 'sql-q09-rising-temperature',
    number: 9,
    title: 'Rising Temperature',
    difficulty: 'Basic',
    pattern: 'Joins',
    statement: 'Find all dates (id) where the temperature was higher than the previous day (yesterday).',
    sampleTable: `Weather:
+----+------------+-------------+
| id | recordDate | temperature |
+----+------------+-------------+
| 1  | 2026-01-01 | 10          |
| 2  | 2026-01-02 | 25          |
| 3  | 2026-01-03 | 20          |
| 4  | 2026-01-04 | 30          |
+----+------------+-------------+`,
    expectedOutput: `+----+
| id |
+----+
| 2  |
| 4  |
+----+`,
    sqlSolution: `SELECT w1.id
FROM Weather w1
INNER JOIN Weather w2 
    ON DATEDIFF(w1.recordDate, w2.recordDate) = 1
WHERE w1.temperature > w2.temperature;`,
    explanation: 'Join Weather with itself where w1 date is exactly 1 day after w2 date (DATEDIFF = 1) and compare temperatures.',
  },
  {
    id: 'sql-q10-consecutive-numbers',
    number: 10,
    title: 'Consecutive Numbers Appearing at Least 3 Times',
    difficulty: 'Intermediate',
    pattern: 'Window Functions',
    statement: 'Find all numbers that appear at least three consecutive times in a Logs table.',
    sampleTable: `Logs: id=1(num=1), id=2(num=1), id=3(num=1), id=4(num=2), id=5(num=1)`,
    expectedOutput: `+-----------------+
| ConsecutiveNums |
+-----------------+
| 1               |
+-----------------+`,
    sqlSolution: `WITH LaggedLogs AS (
    SELECT 
        num,
        LAG(num, 1) OVER (ORDER BY id) AS prev1,
        LAG(num, 2) OVER (ORDER BY id) AS prev2
    FROM Logs
)
SELECT DISTINCT num AS ConsecutiveNums
FROM LaggedLogs
WHERE num = prev1 AND num = prev2;`,
    explanation: 'LAG(num, 1) and LAG(num, 2) inspect the preceding two rows ordered by id. When num equals both previous values, it has appeared 3 consecutive times.',
  },
  {
    id: 'sql-q11-running-total-cumulative-sum',
    number: 11,
    title: 'Running Total (Cumulative Sum)',
    difficulty: 'Intermediate',
    pattern: 'Window Functions',
    statement: 'Calculate the running total of transactions ordered by transaction_date.',
    sampleTable: `Transactions: date=Jan 1 (amount 100), Jan 2 (amount 200), Jan 3 (amount 150)`,
    expectedOutput: `+------------+--------+---------------+
| trans_date | amount | running_total |
+------------+--------+---------------+
| 2026-01-01 | 100    | 100           |
| 2026-01-02 | 200    | 300           |
| 2026-01-03 | 150    | 450           |
+------------+--------+---------------+`,
    sqlSolution: `SELECT 
    transaction_date, 
    amount,
    SUM(amount) OVER (
        ORDER BY transaction_date 
        ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
    ) AS running_total
FROM Transactions;`,
    explanation: 'SUM() over an ORDER BY clause with ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW accumulates values progressively.',
  },
  {
    id: 'sql-q12-manager-with-at-least-5-reports',
    number: 12,
    title: 'Managers with at Least 5 Direct Reports',
    difficulty: 'Basic',
    pattern: 'Aggregation & GROUP BY',
    statement: 'Write a query to find managers who have at least five direct report employees.',
    sampleTable: `Employee: managerId links to id of managers`,
    expectedOutput: `Names of managers with >= 5 direct subordinates`,
    sqlSolution: `SELECT m.name
FROM Employee e
INNER JOIN Employee m ON e.managerId = m.id
GROUP BY m.id, m.name
HAVING COUNT(e.id) >= 5;`,
    explanation: 'Join direct reports to their managers, group by manager, and filter with HAVING COUNT(e.id) >= 5.',
  },
  {
    id: 'sql-q13-monthly-active-users',
    number: 13,
    title: 'Monthly Active User Count',
    difficulty: 'Basic',
    pattern: 'Aggregation & GROUP BY',
    statement: 'Count distinct active users per calendar month from an Activity table.',
    sampleTable: `Activity: user_id, activity_date`,
    expectedOutput: `Month, active_user_count`,
    sqlSolution: `SELECT 
    DATE_FORMAT(activity_date, '%Y-%m') AS activity_month,
    COUNT(DISTINCT user_id) AS active_users
FROM Activity
GROUP BY DATE_FORMAT(activity_date, '%Y-%m')
ORDER BY activity_month ASC;`,
    explanation: 'Format date into Year-Month string and count distinct user_id values per month.',
  },
  {
    id: 'sql-q14-swap-salary',
    number: 14,
    title: 'Swap Gender Values with Single Update',
    difficulty: 'Basic',
    pattern: 'Filtering & DML',
    statement: 'Swap all "f" and "m" values in a Salary table (change "f" to "m" and vice versa) using a single UPDATE statement and no intermediate temp tables.',
    sampleTable: `Salary: id, sex ('m' or 'f')`,
    expectedOutput: `Sex column values inverted`,
    sqlSolution: `UPDATE Salary
SET sex = CASE 
    WHEN sex = 'm' THEN 'f'
    ELSE 'm'
END;`,
    explanation: 'CASE expression evaluates conditionally inside the UPDATE statement to swap values atomically.',
  },
  {
    id: 'sql-q15-reformat-department-table',
    number: 15,
    title: 'Reformat / Pivot Department Table',
    difficulty: 'Intermediate',
    pattern: 'Aggregation & GROUP BY',
    statement: 'Reformat Department table from vertical (id, revenue, month) to horizontal columns (id, Jan_Revenue, Feb_Revenue, ...).',
    sampleTable: `Department: id=1 (month='Jan', rev=8000), id=1 (month='Feb', rev=7000)`,
    expectedOutput: `id, Jan_Revenue, Feb_Revenue, ...`,
    sqlSolution: `SELECT 
    id,
    SUM(CASE WHEN month = 'Jan' THEN revenue ELSE NULL END) AS Jan_Revenue,
    SUM(CASE WHEN month = 'Feb' THEN revenue ELSE NULL END) AS Feb_Revenue,
    SUM(CASE WHEN month = 'Mar' THEN revenue ELSE NULL END) AS Mar_Revenue
FROM Department
GROUP BY id;`,
    explanation: 'Pivot pattern: Combine SUM/MAX with conditional CASE expressions grouped by id.',
  },
  {
    id: 'sql-q16-top-travellers',
    number: 16,
    title: 'Top Travellers Distance with Zero Fallback',
    difficulty: 'Basic',
    pattern: 'Joins',
    statement: 'Compute distance traveled by each user. Users with zero rides must report 0 distance. Sort descending by distance, then ascending by name.',
    sampleTable: `Users: id, name
Rides: id, user_id, distance`,
    expectedOutput: `name, travelled_distance`,
    sqlSolution: `SELECT 
    u.name,
    COALESCE(SUM(r.distance), 0) AS travelled_distance
FROM Users u
LEFT JOIN Rides r ON u.id = r.user_id
GROUP BY u.id, u.name
ORDER BY travelled_distance DESC, u.name ASC;`,
    explanation: 'LEFT JOIN keeps users with zero rides. COALESCE(..., 0) converts NULL sum into 0.',
  },
  {
    id: 'sql-q17-game-play-analysis-first-login',
    number: 17,
    title: 'Game Play Analysis: First Login Date',
    difficulty: 'Basic',
    pattern: 'Aggregation & GROUP BY',
    statement: 'Find the first login date for each player from the Activity table.',
    sampleTable: `Activity: player_id, event_date`,
    expectedOutput: `player_id, first_login`,
    sqlSolution: `SELECT 
    player_id, 
    MIN(event_date) AS first_login
FROM Activity
GROUP BY player_id;`,
    explanation: 'Group by player_id and extract MIN(event_date).',
  },
  {
    id: 'sql-q18-game-play-analysis-retention',
    number: 18,
    title: 'Player Day 1 Retention Rate',
    difficulty: 'Intermediate',
    pattern: 'Joins',
    statement: 'Calculate the fraction of players that logged in again on the day immediately following their initial first login date, rounded to 2 decimal places.',
    sampleTable: `Activity table with multiple player logins`,
    expectedOutput: `+-----------+
| fraction  |
+-----------+
| 0.33      |
+-----------+`,
    sqlSolution: `WITH FirstLogins AS (
    SELECT player_id, MIN(event_date) AS first_date
    FROM Activity
    GROUP BY player_id
)
SELECT 
    ROUND(
        COUNT(a.player_id) / (SELECT COUNT(*) FROM FirstLogins),
        2
    ) AS fraction
FROM FirstLogins f
INNER JOIN Activity a 
    ON f.player_id = a.player_id 
   AND a.event_date = DATE_ADD(f.first_date, INTERVAL 1 DAY);`,
    explanation: 'Find first login per player in CTE, then join to Activity checking for login on first_date + 1 day.',
  },
  {
    id: 'sql-q19-find-median-salary',
    number: 19,
    title: 'Find Median Salary per Company',
    difficulty: 'Intermediate',
    pattern: 'Window Functions',
    statement: 'Find the median salary for each company.',
    sampleTable: `Employee: id, company, salary`,
    expectedOutput: `id, company, median salary`,
    sqlSolution: `WITH Ranked AS (
    SELECT 
        id, company, salary,
        ROW_NUMBER() OVER (PARTITION BY company ORDER BY salary ASC, id ASC) AS row_asc,
        ROW_NUMBER() OVER (PARTITION BY company ORDER BY salary DESC, id DESC) AS row_desc
    FROM Employee
)
SELECT id, company, salary
FROM Ranked
WHERE ABS(CAST(row_asc AS SIGNED) - CAST(row_desc AS SIGNED)) <= 1
ORDER BY company, salary;`,
    explanation: 'Assign row numbers in ascending and descending order. Median rows are where the difference between asc and desc row number is <= 1.',
  },
  {
    id: 'sql-q20-market-analysis-second-order',
    number: 20,
    title: 'Market Analysis: Favorite Brand Sold on Second Order',
    difficulty: 'Intermediate',
    pattern: 'Window Functions',
    statement: 'For each seller, check whether the item sold on their second order date is their favorite brand.',
    sampleTable: `Users, Orders, Items tables`,
    expectedOutput: `seller_id, 2nd_item_fav_brand ('yes' or 'no')`,
    sqlSolution: `WITH RankedOrders AS (
    SELECT 
        o.seller_id,
        o.item_id,
        ROW_NUMBER() OVER (PARTITION BY o.seller_id ORDER BY o.order_date ASC) AS rnk
    FROM Orders o
)
SELECT 
    u.user_id AS seller_id,
    CASE 
        WHEN i.item_brand = u.favorite_brand THEN 'yes'
        ELSE 'no'
    END AS 2nd_item_fav_brand
FROM Users u
LEFT JOIN RankedOrders ro ON u.user_id = ro.seller_id AND ro.rnk = 2
LEFT JOIN Items i ON ro.item_id = i.item_id;`,
    explanation: 'Rank orders per seller by order_date ASC. Join rank=2 to Items and compare with favorite_brand.',
  },
  {
    id: 'sql-q21-tree-node-type',
    number: 21,
    title: 'Tree Node Classification (Root, Inner, Leaf)',
    difficulty: 'Intermediate',
    pattern: 'Subqueries',
    statement: 'Classify each node in a binary tree table as "Root", "Inner", or "Leaf".',
    sampleTable: `Tree:
+----+------+
| id | p_id |
+----+------+
| 1  | NULL |
| 2  | 1    |
| 3  | 1    |
| 4  | 2    |
| 5  | 2    |
+----+------+`,
    expectedOutput: `id, type (1: Root, 2: Inner, 3: Leaf, 4: Leaf, 5: Leaf)`,
    sqlSolution: `SELECT 
    id,
    CASE 
        WHEN p_id IS NULL THEN 'Root'
        WHEN id IN (SELECT p_id FROM Tree WHERE p_id IS NOT NULL) THEN 'Inner'
        ELSE 'Leaf'
    END AS type
FROM Tree;`,
    explanation: 'Root has p_id IS NULL. Inner nodes appear in other nodes p_id list. Remaining nodes are Leaf nodes.',
  },
];
