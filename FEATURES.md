# AK67 — Detailed Feature Specifications

This document defines the functional and user experience specifications for each of the 13 modules in **AK67 — Your Placement Preparation System**.

---

## 📑 Module Overview

1. [Module A: Dashboard](#module-a-dashboard)
2. [Module B: DSA Preparation (Curated 67 Problems)](#module-b-dsa-preparation)
3. [Module C: C++ Preparation](#module-c-c-preparation)
4. [Module D: SQL Preparation](#module-d-sql-preparation)
5. [Module E: Core CS Fundamentals](#module-e-core-cs-fundamentals)
6. [Module F: Aptitude & Reasoning](#module-f-aptitude--reasoning)
7. [Module G: Spaced Revision System](#module-g-spaced-revision-system)
8. [Module H: Daily Study Planner & Pomodoro](#module-h-daily-study-planner)
9. [Module I: Mock Tests & Assessment Engine](#module-i-mock-tests)
10. [Module J: Interview Preparation Hub](#module-j-interview-preparation)
11. [Module K: Company Preparation & Drive Tracker](#module-k-company-preparation)
12. [Module L: Placement Readiness Analytics](#module-l-placement-readiness-analytics)
13. [Module M: Notes, Bookmarks & Mistake Repository](#module-m-notes-bookmarks--mistakes)

---

## Module A: Dashboard

### Purpose
Provide an immediate, focused command center when the user opens AK67. It summarizes today's priority tasks, active revision workload, study streak, and true overall readiness.

### Key Components
- **Today's Action Plan**: Checklist of items due today (scheduled revisions, daily DSA targets, custom tasks).
- **Metric Cards (Live IndexedDB Data Only)**:
  - Total DSA Problems Solved (e.g., `18 / 67 Solved`).
  - Core Topics Covered (C++, SQL, DBMS, OS, CN).
  - Revisions Due Today (highlighted with badge if overdue).
  - Active Study Streak (consecutive days with at least one logged session or problem solved).
- **Target Deadline Counter**: Dynamic days-remaining pill based on the user's configured placement target date.
- **Weak Topics Spotlight**: Surfaces topics with the lowest accuracy in mock tests or longest revision backlog.
- **Recent Activity Stream**: Chronological list of recently completed problems, test attempts, and study sessions.
- **Quick Jump Action Buttons**: "Solve Next Due DSA", "Start 25m Pomodoro", "Practice SQL", "Take Quick Mock".

---

## Module B: DSA Preparation

### Purpose
Systematic mastery of the most critical 67 high-yield Data Structures and Algorithms problems asked in fresher technical rounds across Tier 1, Tier 2, and service/product placement drives.

### Structure & Categories (Curated 67)
1. **Arrays** (e.g., Two Sum, Best Time to Buy and Sell Stock, Maximum Subarray, Merge Intervals, Product of Array Except Self)
2. **Strings** (e.g., Valid Anagram, Valid Palindrome, Longest Substring Without Repeating Characters, Group Anagrams)
3. **Hashing** (e.g., Subarray Sum Equals K, Longest Consecutive Sequence, Top K Frequent Elements)
4. **Two Pointers & Sliding Window** (e.g., Container With Most Water, 3Sum, Minimum Window Substring)
5. **Sorting & Binary Search** (e.g., Binary Search, Search in Rotated Sorted Array, Find Minimum in Rotated Sorted Array, Kth Largest Element)
6. **Recursion & Backtracking** (e.g., Subsets, Permutations, Combination Sum, N-Queens)
7. **Linked Lists** (e.g., Reverse Linked List, Merge Two Sorted Lists, Linked List Cycle, Remove Nth Node From End)
8. **Stack & Queue** (e.g., Valid Parentheses, Min Stack, Daily Temperatures, Next Greater Element, Sliding Window Maximum)
9. **Trees & BST** (e.g., Maximum Depth of Binary Tree, Invert Binary Tree, Lowest Common Ancestor, Validate BST, Binary Tree Level Order Traversal)
10. **Dynamic Programming** (e.g., Climbing Stairs, Coin Change, Longest Increasing Subsequence, 0/1 Knapsack, House Robber)
11. **Basic Graphs** (e.g., Number of Islands, Clone Graph, Course Schedule, Rotting Oranges)

### Problem Detail View Features
- **Metadata**: Title, Category, Difficulty (`Easy`, `Medium`, `Hard`), Pattern tag (e.g., `Prefix Sum`, `Fast & Slow Pointers`).
- **External Verified Link**: Direct clickable links to LeetCode / GFG platforms.
- **Description & Constraints**: Clean, readable problem statement with input/output examples.
- **Progressive Hint System**: 3 levels of hints (1. Conceptual direction -> 2. Data structure hint -> 3. Edge cases and algorithm steps), revealed only on user click to prevent premature spoilers.
- **Complexity Breakdown**: Explicit Time Complexity (e.g., $\mathcal{O}(n)$) and Space Complexity (e.g., $\mathcal{O}(1)$).
- **Verified C++ Reference Solution**: Syntax-highlighted, clean, idiomatic modern C++ solution code with explanatory comments.
- **Personal Solution & Notes**: Markdown/text area stored in IndexedDB where the student writes personal observations, caveats, or their own code.
- **Status Toggle**: One-click toggling between `Not Started`, `Attempted`, `Solved`, and `Revise`.
- **Revision Scheduling**: Marking a problem as `Solved` or `Revise` automatically enqueues it in the Spaced Revision system.

---

## Module C: C++ Preparation

### Purpose
Equip candidates with deep C++ language knowledge, moving beyond basic syntax into memory mechanics, modern STL idioms, and object-oriented design questions frequently asked in placement interviews.

### Content Structure
1. **Language Fundamentals**: Primitive types, scopes, type conversions, memory layout, storage classes (`static`, `extern`, `const`, `constexpr`).
2. **Pointers, References & Memory Management**:
   - Stack vs Heap memory allocation (`new`/`delete` vs `malloc`/`free`).
   - Pointer arithmetic, dangling pointers, memory leaks, smart pointers (`unique_ptr`, `shared_ptr`, `weak_ptr`).
   - Pass-by-value vs pass-by-reference vs pass-by-const-reference.
3. **Object-Oriented Programming (OOP)**:
   - Encapsulation, Abstraction, Inheritance (single, multiple, virtual base classes).
   - Polymorphism: Compile-time (function overloading, operator overloading) vs Run-time (virtual functions, `vtable`, `vptr`, pure virtual functions, abstract classes).
   - Constructors, Destructors (why virtual destructors are mandatory), Copy Constructor, Move Semantics & `std::move`.
4. **Standard Template Library (STL)**:
   - Containers: `vector`, `deque`, `list`, `unordered_map`, `map`, `unordered_set`, `set`, `priority_queue`, `stack`, `queue`.
   - Time complexities of standard operations across containers.
   - STL Algorithms: `sort`, `binary_search`, `lower_bound`, `upper_bound`, `next_permutation`.
5. **Interview Flashcards & FAQs**:
   - 40+ curated C++ interview questions with concise answers, code snippets, and common recruiter traps.
   - Tracking checkboxes to mark topics and questions as `Mastered` or `Needs Review`.

---

## Module D: SQL Preparation

### Purpose
Prepare students for technical assessment queries and SQL interview rounds, covering fundamental queries up to complex analytical window functions.

### Content Structure
1. **Foundational SQL**: `SELECT`, `DISTINCT`, `WHERE`, `AND`, `OR`, `NOT`, `ORDER BY`, `LIMIT`/`TOP`.
2. **Aggregation & Grouping**: `COUNT`, `SUM`, `AVG`, `MIN`, `MAX`, `GROUP BY`, `HAVING` (distinction between `WHERE` and `HAVING`).
3. **Joins Masterclass**:
   - Visual comparison and syntax for `INNER JOIN`, `LEFT JOIN`, `RIGHT JOIN`, `FULL OUTER JOIN`, `CROSS JOIN`, `SELF JOIN`.
   - Handling `NULL` values in joins.
4. **Advanced Querying**:
   - Subqueries (correlated vs non-correlated).
   - Common Table Expressions (CTEs) & Recursive CTEs (`WITH` clauses).
   - Window Functions: `ROW_NUMBER()`, `RANK()`, `DENSE_RANK()`, `LEAD()`, `LAG()`, `NTILE()`, `PARTITION BY` vs `ORDER BY`.
5. **Schema Design & Normalization**:
   - Keys: Primary Key, Foreign Key, Candidate Key, Super Key, Composite Key.
   - Normal Forms: 1NF, 2NF, 3NF, BCNF with concrete table decomposition examples.
   - ACID Properties and Transaction Isolation levels.
6. **Query Practice Arena**:
   - 25+ real-world placement SQL query problems (e.g., "Find the Nth highest salary", "Duplicate emails", "Department top three salaries", "Consecutive numbers").
   - Expected outputs and step-by-step query explanations.

---

## Module E: Core CS Fundamentals

### Purpose
Comprehensive placement revision for the 4 core non-negotiable computer science subjects.

### Subjects Covered
1. **Operating Systems (OS)**:
   - Processes vs Threads, Process Control Block (PCB), Context Switching.
   - CPU Scheduling: FCFS, SJF, Round Robin, Priority Scheduling, Multi-level queues.
   - Process Synchronization: Race conditions, Critical Section Problem, Mutex, Semaphores (Counting & Binary), Peterson's Solution.
   - Deadlocks: Necessary conditions, Deadlock Prevention, Avoidance (Banker's Algorithm), Detection and Recovery.
   - Memory Management: Logical vs Physical address, Paging, Segmentation, Page Replacement Algorithms (FIFO, LRU, Optimal), Belady's Anomaly, Thrashing.
2. **Database Management Systems (DBMS)**:
   - File system vs DBMS, Database architecture (3-tier).
   - ER modeling, Relational data model.
   - Indexing mechanisms: Dense vs Sparse, B-Tree and B+ Tree internal structure, Clustered vs Non-clustered indexing.
   - Transaction Management: ACID properties, Serializability, Concurrency Control (2PL, Timestamp ordering).
3. **Computer Networks (CN)**:
   - OSI 7-Layer model vs TCP/IP 4-Layer model responsibilities.
   - Data Link & Network Layers: MAC vs IP addresses, ARP, Subnetting & CIDR calculations, Routing protocols (Distance Vector vs Link State).
   - Transport Layer: TCP vs UDP, TCP 3-Way Handshake, 4-Way Termination, Flow Control (Sliding Window), Congestion Control.
   - Application Layer: HTTP/1.1 vs HTTP/2 vs HTTP/3, HTTPS (SSL/TLS Handshake), DNS resolution flow, Cookies vs Sessions.
4. **Software Engineering & System Design Basics**:
   - SDLC Models: Waterfall vs Agile / Scrum ceremonies.
   - SOLID Principles with concrete object-oriented examples.
   - REST API design principles and HTTP status codes.
   - Monolithic vs Microservices architectural concepts.

---

## Module F: Aptitude & Reasoning

### Purpose
Prepare for campus placement screening round tests (Online Assessments / OAs), which eliminate 70%+ of applicants before technical interviews.

### Sections
1. **Quantitative Aptitude**:
   - Percentages, Profit & Loss, Ratio & Proportion, Averages.
   - Time, Speed & Distance, Boats & Streams, Trains.
   - Time & Work, Pipes & Cisterns.
   - Permutation & Combination, Probability, Simple & Compound Interest.
   - Number Systems, Divisibility Rules, LCM & HCF.
2. **Logical Reasoning**:
   - Number & Alphabet Series, Coding-Decoding.
   - Blood Relations, Direction Sense.
   - Seating Arrangements (Linear & Circular).
   - Syllogisms, Statement & Assumptions / Conclusions.
   - Clocks & Calendars.
3. **Verbal Ability**:
   - Reading Comprehension strategies.
   - Sentence Correction & Error Spotting (Subject-Verb agreement, modifiers, tenses).
   - Vocabulary: Synonyms, Antonyms, Idioms & Phrases.
   - Para Jumbles & Sentence Completion.
4. **Data Interpretation**:
   - Tables, Bar Charts, Line Graphs, Pie Charts.
   - Rapid calculation techniques and approximation shortcuts.

---

## Module G: Spaced Revision System

### Purpose
Combat the human forgetting curve. Ensure solved algorithms and theoretical concepts are reviewed right before they fade from memory.

### Algorithmic Logic
- Uses an interval-based spaced repetition mechanism:
  - Revision 1: 1 day after solving.
  - Revision 2: 3 days after Revision 1.
  - Revision 3: 7 days after Revision 2.
  - Revision 4: 21 days after Revision 3.
  - Revision 5: 60 days after Revision 4.
- Confidence Rating on Revision:
  - `Easy`: Multiplies interval by $2.0$.
  - `Good`: Follows standard schedule.
  - `Hard` / `Failed`: Resets interval back to 1 day and marks problem as weak.
- **Queues**:
  - `Due Today`: Items scheduled for today or earlier.
  - `Overdue`: Items scheduled prior to today that were missed.
  - `Upcoming`: Items scheduled over the next 7 days.
  - `Completed Revisions`: Historical log of all revision completions with timestamps.

---

## Module H: Daily Study Planner & Pomodoro

### Purpose
Instill structured daily discipline, track focus time, and ensure consistent output during the intense placement preparation phase.

### Features
- **Daily Target Setting**: Set target number of DSA problems (e.g. 3) and theory topics (e.g. 2) for the day.
- **Custom Task Manager**: Create, complete, and delete personal tasks (e.g., "Review resume with senior", "Submit application to Cisco").
- **Pomodoro Focus Timer**:
  - 25m Focus / 5m Short Break / 15m Long Break intervals.
  - Browser audio chime upon interval completion.
  - Automatic logging of completed focus intervals into `study_sessions` in IndexedDB.
- **Study Streak Counter**:
  - Tracks consecutive days of activity.
  - Grace period logic: Streak remains active if completed before 11:59 PM local time.

---

## Module I: Mock Tests & Assessment Engine

### Purpose
Simulate high-pressure campus placement online assessments with timed multiple-choice and code-comprehension questions.

### Test Modes
1. **Comprehensive Full Mock** (60 minutes, 40 questions: 15 Quant/Logical + 10 Core CS + 10 DSA Output + 5 SQL).
2. **Subject Quick Drill** (20 minutes, 15 questions dedicated to a single chosen subject).
3. **DSA Output & Complexity Drill** (15 minutes, 10 tricky C++ code snippets).

### Exam Interface Features
- Countdown timer with 5-minute warning banner.
- Question palette (Not Visited, Answered, Marked for Review).
- Next / Previous / Clear Selection navigation.
- Confirmation modal before final submission.
- **Instant Result Analytics**:
  - Score, Accuracy percentage, Time taken.
  - Question-by-question breakdown with detailed explanations.
  - Test result automatically saved to IndexedDB test history.

---

## Module J: Interview Preparation Hub

### Purpose
Prepare students for the interpersonal and deep technical rounds of placement interviews.

### Sections
1. **The STAR Framework Guide**:
   - Structuring behavioral answers (Situation, Task, Action, Result).
   - Template scripts for: "Tell me about yourself", "Tell me about a time you had a conflict with a team member", "What is your greatest weakness?".
2. **Project Defense Toolkit**:
   - Step-by-step breakdown of how to pitch resume projects:
     - The "Elevator Pitch" (30 seconds).
     - Architecture & Tech Stack Justification ("Why React over Angular? Why IndexedDB over LocalStorage?").
     - The Hardest Bug Solved (demonstrating debugging persistence).
     - Future Optimizations & Scalability.
3. **Common HR Questions**:
   - 25+ standard HR questions with sample answers, key points to emphasize, and answers to avoid.
4. **Questions to Ask the Interviewer**:
   - High-impact questions to ask at the end of technical and HR rounds that signal genuine curiosity and maturity.

---

## Module K: Company Preparation & Drive Tracker

### Purpose
Manage placement drive pipelines and prepare for specific hiring company patterns.

### Features
- **Company Profiles Database**:
  - Major hiring companies pre-configured with patterns (e.g. TCS Ninja/Digital, Infosys DSE/SP, Cognizant GenC/Elevate, Wipro, Capgemini, Accenture, Amazon SDE-1, Cisco).
  - Eligibility criteria (CGPA cutoffs, backlogs policy, branch restrictions).
  - Assessment pattern breakdown (e.g. Cognitive + Technical + Coding + Interview).
- **Personal Application Pipeline**:
  - Status stages: `Wishlist` -> `Applied` -> `OA Cleared` -> `Interviewing` -> `Offered` -> `Rejected`.
  - Add custom companies and job descriptions.
  - Company-specific preparation checklist (e.g., "Reviewed Cognizant previous coding questions", "Practiced Accenture pseudo-code").

---

## Module L: Placement Readiness Analytics *(Implemented in Phase 7)*

### Purpose
Deliver clear, non-sugarcoated, honest data insights into placement readiness, calculated strictly from local IndexedDB data across all 188 curriculum items.

### Analytics Visualizations
- **Overall Placement Readiness Gauge**: Total curriculum readiness gauge (`x / 188` Mastered), completion percentage, learning counts, and active revision backlog.
- **10-Pillar Subject Breakdown**: Progress meters, completed/total counts, and mock accuracy for DSA, C++, SQL, DBMS, OS, Computer Networks, Software Engineering, Quantitative Aptitude, Logical Reasoning, and Verbal Ability.
- **Difficulty Breakdown**: Solved problems by complexity (Easy, Medium, Hard).
- **Spaced Revision Compliance**: Ratio of on-time revisions vs overdue backlog.
- **Weekly Study Time & Streak Heatmap**: Hours logged per day via study sessions and 30-day calendar activity heatmap.
- **Identified Weak Areas**: Diagnostic rules identifying subjects with <60% accuracy, overdue revisions (>3 days), and high-assistance problems, categorized into 5 discrete severities with actionable remedies.

---

## Module M: Notes, Bookmarks & Mistake Repository *(Implemented in Phase 7)*

### Purpose
Give students a personal knowledge repository to record epiphanies, save code snippets, and systematically track their common mistakes.

### Features
- **Global Notes Hub**:
  - Unified view consolidating standalone notes, DSA problem notes, technical topic notes, and company interview notes.
  - Markdown preview toggle, note pinning, tags indexing, and category filtering.
  - Search notes by keyword, title, content, or tag.
- **Dedicated Mistake Log**:
  - Specialized log for recording errors made during practice or tests (e.g., "Forgot integer overflow with $10^9$", "Off-by-one in binary search while condition").
  - 8 Standardized root cause categories (`Conceptual misunderstanding`, `Incorrect formula`, `Logical error`, `Syntax error`, `Edge case missed`, `Time management`, `Careless mistake`, `Misread question`).
  - Structured fields: what went wrong, correct approach, personal lesson, difficulty, and review status (`pending`, `reviewed`, `resolved`).
  - Search and filter by subject, category, and review status.
- **One-Click Bookmarks View**:
  - Filter and review all problems, SQL queries, or interview questions bookmarked across the application.
