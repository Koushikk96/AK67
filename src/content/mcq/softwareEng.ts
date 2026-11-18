import { TestQuestion } from '@/types/mockTest';

export const seMCQs: TestQuestion[] = [
  {
    id: 'tech-se-01',
    question: 'In Agile Scrum framework, what is the recommended duration of a standard Sprint?',
    options: ['1 to 4 weeks (typically 2 weeks)', '3 to 6 months', '24 hours', '1 year'],
    correctOptionIndex: 0,
    explanation:
      'Scrum sprints are short, fixed-length iterations of 1 to 4 weeks (most commonly 2 weeks) that produce a potentially shippable product increment.',
    category: 'technical',
    subject: 'Software Engineering',
    difficulty: 'Easy',
  },
  {
    id: 'tech-se-02',
    question: 'What is the primary difference between Black-Box Testing and White-Box Testing?',
    options: [
      'Black-box tests software functionality without knowledge of internal code logic or structure; white-box tests internal paths, branch coverage, and code structure',
      'Black-box is performed only by developers; white-box is performed only by clients',
      'White-box testing is only done on dark-themed user interfaces',
      'Black-box testing cannot be automated',
    ],
    correctOptionIndex: 0,
    explanation:
      'Black-box testing checks inputs and expected outputs against requirements. White-box (glass-box) testing verifies internal control flows, branches, and code statements.',
    category: 'technical',
    subject: 'Software Engineering',
    difficulty: 'Easy',
  },
  {
    id: 'tech-se-03',
    question: 'What is Regression Testing in software development?',
    options: [
      'Testing an application backwards from end to start',
      'Re-running existing test cases to confirm that recent code changes or bug fixes have not broken existing functionality',
      'Testing software on obsolete hardware',
      'Testing how fast an application can recover from a crash',
    ],
    correctOptionIndex: 1,
    explanation:
      'Regression testing ensures that new features or refactorings did not introduce unintended regressions or break previously working features.',
    category: 'technical',
    subject: 'Software Engineering',
    difficulty: 'Easy',
  },
  {
    id: 'tech-se-04',
    question: 'What does Cyclomatic Complexity measure in software engineering?',
    options: [
      'The number of CPU cycles consumed by a loop',
      'The number of linearly independent execution paths through a program’s source code ($M = E - N + 2P$)',
      'The memory size of compiled binaries',
      'The number of developers working on a git branch',
    ],
    correctOptionIndex: 1,
    explanation:
      'Thomas McCabe’s Cyclomatic Complexity measures decision logic density ($E - N + 2P$ or decision points $+ 1$), indicating testability and refactoring necessity.',
    category: 'technical',
    subject: 'Software Engineering',
    difficulty: 'Medium',
  },
  {
    id: 'tech-se-05',
    question: 'What is the difference between Verification and Validation?',
    options: [
      'Verification: "Are we building the product right?" (reviews, inspections, code quality); Validation: "Are we building the right product?" (meeting user needs and requirements)',
      'Verification is done by clients; Validation is done by compilers',
      'Verification occurs only after deployment; Validation occurs during coding',
      'They are exact synonyms with no distinction in IEEE standards',
    ],
    correctOptionIndex: 0,
    explanation:
      'Verification checks process and static artifacts against specifications. Validation checks the executed software against actual customer requirements.',
    category: 'technical',
    subject: 'Software Engineering',
    difficulty: 'Medium',
  },
  {
    id: 'tech-se-06',
    question: 'What is Continuous Integration (CI)?',
    options: [
      'Writing code continuously without taking breaks',
      'A software development practice where developers frequently merge code changes into a central repository, triggering automated builds and tests',
      'Deploying code directly to production servers without testing',
      'Maintaining an unbroken power supply to server hardware',
    ],
    correctOptionIndex: 1,
    explanation:
      'CI automates build compilation, unit tests, and linting on every commit/pull request to detect integration defects early.',
    category: 'technical',
    subject: 'Software Engineering',
    difficulty: 'Easy',
  },
  {
    id: 'tech-se-07',
    question: 'In Git, what is the difference between `git merge` and `git rebase`?',
    options: [
      '`git merge` creates a new merge commit combining history and preserving true branch lineage; `git rebase` reapplies commits on top of another base tip, creating a linear history',
      '`git rebase` destroys untracked files',
      '`git merge` deletes the remote branch',
      '`git rebase` can only be executed by administrators',
    ],
    correctOptionIndex: 0,
    explanation:
      '`git merge` creates a 2-parent merge commit retaining true chronology. `git rebase` rewrites commit hashes to produce a clean linear history.',
    category: 'technical',
    subject: 'Software Engineering',
    difficulty: 'Medium',
  },
  {
    id: 'tech-se-08',
    question: 'What is a "Code Smell" in software engineering?',
    options: [
      'A syntax error that prevents code from compiling',
      'A surface indication in source code that usually corresponds to a deeper design flaw or technical debt (e.g., long methods, duplicate code, large classes)',
      'An encrypted license key embedded in source files',
      'A compiler warning regarding deprecated APIs',
    ],
    correctOptionIndex: 1,
    explanation:
      'A code smell is not a bug (the code executes correctly) but a symptom of poor architecture that slows down development and increases bug rates over time.',
    category: 'technical',
    subject: 'Software Engineering',
    difficulty: 'Easy',
  },
  {
    id: 'tech-se-09',
    question: 'What is Boundary Value Analysis (BVA) in software testing?',
    options: [
      'Testing only values at the center of acceptable ranges',
      'A black-box test design technique that tests extreme ends and boundaries of input domains (e.g., $min$, $min+1$, $nominal$, $max-1$, $max$)',
      'Testing internet firewall boundaries',
      'Benchmarking GPU memory limits',
    ],
    correctOptionIndex: 1,
    explanation:
      'BVA focuses on edge conditions (e.g. $0, 1, 99, 100, 101$) because defects cluster predominantly around input boundaries.',
    category: 'technical',
    subject: 'Software Engineering',
    difficulty: 'Easy',
  },
  {
    id: 'tech-se-10',
    question: 'What role does the "Scrum Master" play on an Agile development team?',
    options: [
      'The direct supervisor who assigns daily tasks and evaluates developer salaries',
      'A servant-leader who facilitates ceremonies, removes operational impediments, and protects the team from external distractions',
      'The software architect who writes 100% of the production code',
      'The client representative who defines backlog priorities',
    ],
    correctOptionIndex: 1,
    explanation:
      'The Scrum Master facilitates Scrum events, coaches the team on Agile practices, and removes blockers to maximize sprint velocity.',
    category: 'technical',
    subject: 'Software Engineering',
    difficulty: 'Easy',
  },
  {
    id: 'tech-se-11',
    question: 'What is the main advantage of the "Agile" model over the traditional "Waterfall" model?',
    options: [
      'Agile eliminates the need for software testing',
      'Agile accommodates changing customer requirements through iterative cycles and regular feedback, reducing the risk of delivering an outdated product',
      'Agile produces 1,000-page specification documents upfront',
      'Agile guarantees zero software bugs upon initial release',
    ],
    correctOptionIndex: 1,
    explanation:
      'Waterfall is sequential and rigid; changing requirements late causes severe delays and cost overruns. Agile embraces change through short, feedback-driven iterations.',
    category: 'technical',
    subject: 'Software Engineering',
    difficulty: 'Easy',
  },
  {
    id: 'tech-se-12',
    question: 'What is a "Stub" vs a "Driver" in unit and integration testing?',
    options: [
      'A Stub replaces a called module/dependency (bottom-up/top-down dummy); a Driver replaces a calling module to invoke the unit under test',
      'A Stub is hardware; a Driver is software',
      'Drivers are used in unit testing; Stubs are used in production',
      'There is no difference between them',
    ],
    correctOptionIndex: 0,
    explanation:
      'In top-down integration testing, Stubs simulate lower-level child routines. In bottom-up testing, Drivers simulate calling parent routines.',
    category: 'technical',
    subject: 'Software Engineering',
    difficulty: 'Medium',
  },
];
