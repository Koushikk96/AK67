import { TechnicalTopic } from '@/types/technical';

export const softwareEngTopics: TechnicalTopic[] = [
  {
    id: 'se-01-sdlc-phases',
    number: 1,
    title: 'Software Development Life Cycle (SDLC) Phases',
    category: 'se',
    subject: 'Software Engineering',
    codeLanguage: 'text',
    explanation:
      'SDLC is the structured process used by software engineering teams to design, develop, test, and deploy high-quality software. 6 Standard Phases: 1. Requirement Gathering & Analysis (SRS document). 2. System Design (Architecture, High-Level Design [HLD], Low-Level Design [LLD]). 3. Implementation / Coding. 4. Testing (Verification & defect logging). 5. Deployment (Production release / CI/CD). 6. Maintenance (Bug fixes, security patches, upgrades).',
    diagram: `SDLC Sequential Cycle:
Requirements ──> Design ──> Coding ──> Testing ──> Deployment ──> Maintenance
       ^                                                              │
       └────────────────── Feedback & Enhancements ───────────────────┘`,
    interviewQuestions: [
      'What are the 6 core phases of SDLC and what is the output artifact of the Requirements phase (SRS)?',
      'What is the difference between High-Level Design (HLD) and Low-Level Design (LLD)?',
      'Why is catching a bug in the Requirements phase orders of magnitude cheaper than in Production?',
    ],
    commonMistakes: [
      'Skipping the Design phase and directly jumping into coding for complex systems.',
      'Assuming deployment marks the end of the software engineering life cycle (Maintenance accounts for ~60-70% of lifetime cost).',
    ],
    revisionNotes: [
      'SRS: Software Requirements Specification (contracts between client & developers).',
      'HLD: System architecture, databases, tech stack, microservices.',
      'LLD: Class diagrams, database schemas, interfaces, design patterns.',
    ],
  },
  {
    id: 'se-02-waterfall-vs-agile',
    number: 2,
    title: 'Waterfall Model vs Agile Methodology',
    category: 'se',
    subject: 'Software Engineering',
    codeLanguage: 'text',
    explanation:
      'Waterfall is a linear, sequential model where each phase must finish completely before the next begins; requirements are locked upfront, making late changes extremely difficult and risky. Agile is an iterative, incremental approach that delivers small, working software increments in rapid cycles (sprints). Agile prioritizes customer collaboration, adaptive planning, and rapid response to change over rigid documentation.',
    diagram: `Waterfall vs Agile Comparison:
+-------------------+----------------------------+---------------------------------+
| Feature           | Waterfall Model            | Agile Methodology               |
+-------------------+----------------------------+---------------------------------+
| Approach          | Linear, sequential         | Iterative, incremental         |
| Flexibility       | Rigid, difficult to change | Highly adaptable to changes     |
| Customer Feedback | Late (at final delivery)   | Continuous (after every sprint) |
| Delivery          | Big-bang release at the end| Continuous working increments   |
| Best Suited For   | Fixed requirements (defense)| Dynamic modern web/app software |
+-------------------+----------------------------+---------------------------------+`,
    interviewQuestions: [
      'When is the Waterfall model preferred over Agile in enterprise engineering?',
      'What are the 4 core values of the Agile Manifesto?',
      'Why does Agile reduce project risk compared to Waterfall?',
    ],
    commonMistakes: [
      'Claiming Waterfall is completely obsolete (mission-critical systems with strict regulatory compliance, like avionics or medical devices, still rely on structured Waterfall).',
      'Thinking Agile means having zero documentation.',
    ],
    revisionNotes: [
      'Waterfall: Plan-driven, sequential, rigid, high cost of late requirement changes.',
      'Agile: Value-driven, iterative, flexible, continuous customer feedback.',
    ],
  },
  {
    id: 'se-03-scrum-basics',
    number: 3,
    title: 'Scrum Basics: Roles, Artifacts & Ceremonies',
    category: 'se',
    subject: 'Software Engineering',
    codeLanguage: 'text',
    explanation:
      'Scrum is the most widely adopted Agile framework for managing complex product delivery. Roles: 1. Product Owner (owns the Product Backlog and business priorities), 2. Scrum Master (removes blockers and enforces Scrum processes), 3. Development Team. Artifacts: Product Backlog, Sprint Backlog, Increment. Ceremonies: Sprint Planning, Daily Standup (15-min daily sync), Sprint Review (demo to stakeholders), Sprint Retrospective (team self-improvement).',
    diagram: `Scrum Workflow:
[ Product Backlog ] ──(Sprint Planning)──> [ Sprint Backlog ]
                                                    │
                                            [ 2-4 Week Sprint ] <── [ Daily Standup (15m) ]
                                                    │
                                                    ▼
                                     [ Potentially Shippable Increment ]
                                                    │
                                     ├── [ Sprint Review (Demo) ]
                                     └── [ Sprint Retrospective (Process improve) ]`,
    interviewQuestions: [
      'What are the 3 key questions answered in a Daily Standup meeting?',
      'What is the difference between a Sprint Review and a Sprint Retrospective?',
      'What is Velocity and Burndown Chart in Scrum?',
    ],
    commonMistakes: [
      'Using the Daily Standup as a detailed technical problem-solving session (it is strictly a 15-minute status sync).',
      'Confusing the Product Owner role with the Scrum Master role.',
    ],
    revisionNotes: [
      '3 Roles: Product Owner (What), Scrum Master (Process coach), Dev Team (How).',
      '4 Ceremonies: Planning, Daily Standup, Review, Retrospective.',
      'Daily Standup answers: What did I do yesterday? What will I do today? Any blockers?',
    ],
  },
  {
    id: 'se-04-functional-vs-nonfunctional',
    number: 4,
    title: 'Functional vs Non-Functional Requirements (NFRs)',
    category: 'se',
    subject: 'Software Engineering',
    codeLanguage: 'text',
    explanation:
      'Functional Requirements specify what the system must explicitly do (features, user actions, data processing). Example: "A user can reset their password via email OTP." Non-Functional Requirements (NFRs / Quality Attributes) specify how the system behaves (system performance, scalability, security, availability, latency). Example: "The login API must respond within 200ms at 10,000 requests/sec with 99.99% uptime."',
    diagram: `Requirements Classification:
Requirements
  ├── Functional: "What the system does" (Authentication, Cart checkout, Search)
  └── Non-Functional: "How well it performs" (Availability, Latency, Scalability, Security)`,
    interviewQuestions: [
      'Difference between Functional and Non-Functional requirements with examples?',
      'What is the "Four Golden Signals" in system monitoring (Latency, Traffic, Errors, Saturation)?',
      'What does "Four Nines" (99.99%) availability mean in terms of allowable annual downtime (~52 minutes)?',
    ],
    commonMistakes: [
      'Focusing exclusively on functional features while ignoring NFRs like security and latency until launch day crashes.',
      'Writing vague NFRs like "System should be fast" instead of quantifiable metrics like "p99 latency < 150ms".',
    ],
    revisionNotes: [
      'Functional: Features and business logic behaviors.',
      'Non-Functional (NFRs / -ilities): Performance, Scalability, Reliability, Security, Maintainability.',
      'NFRs must be strictly quantifiable and measurable with Service Level Objectives (SLOs).',
    ],
  },
  {
    id: 'se-05-testing-levels',
    number: 5,
    title: 'Software Testing Levels & The Testing Pyramid',
    category: 'se',
    subject: 'Software Engineering',
    codeLanguage: 'text',
    explanation:
      'Testing ensures quality and catches regressions before production. The Testing Pyramid recommends: Base: Large number of fast, isolated Unit Tests. Middle: Integration Tests verifying inter-module and database interactions. Top: Small number of End-to-End (E2E) UI tests simulating real user journeys. Testing follows the V-Model, where each development phase pairs directly with a corresponding testing phase.',
    diagram: `The Testing Pyramid:
        /\\
       /  \\       End-to-End (E2E) Tests   (Few, Slow, Expensive, High Confidence)
      /────\\
     /      \\     Integration Tests        (Moderate count, tests contracts/DB)
    /────────\\
   /          \\   Unit Tests               (Many, Ultra-fast, Isolated, Cheap)
  +────────────+`,
    interviewQuestions: [
      'Why does the Testing Pyramid recommend having more Unit Tests than End-to-End tests?',
      'What is Regression Testing and when is it executed in CI/CD pipelines?',
      'What is Test-Driven Development (TDD) and the Red-Green-Refactor cycle?',
    ],
    commonMistakes: [
      'Inverted Pyramid (Ice-Cream Cone anti-pattern): Heavy manual/E2E testing with zero unit tests, causing slow, brittle test suites.',
      'Writing unit tests that depend on external live networks or databases (use mocks/stubs instead).',
    ],
    revisionNotes: [
      'Unit: Tests individual functions/classes in isolation (fast, mocked).',
      'Integration: Tests combined units interacting with database/APIs.',
      'E2E / System: Tests full application flow end-to-end.',
    ],
  },
  {
    id: 'se-06-black-vs-white-box',
    number: 6,
    title: 'Black-Box vs White-Box Testing Techniques',
    category: 'se',
    subject: 'Software Engineering',
    codeLanguage: 'text',
    explanation:
      'Black-Box Testing tests software functionality from an external user perspective without knowledge of internal code or implementation. Techniques: Equivalence Partitioning, Boundary Value Analysis (BVA), Decision Table testing. White-Box Testing tests internal code logic, data structures, and execution paths with full access to source code. Techniques: Statement Coverage, Branch Coverage, Path Coverage, Cyclomatic Complexity.',
    diagram: `Black-Box vs White-Box Comparison:
+-------------------+----------------------------+---------------------------------+
| Aspect            | Black-Box Testing          | White-Box Testing               |
+-------------------+----------------------------+---------------------------------+
| Knowledge of Code | Zero (External perspective)| Full (Internal structure/code)  |
| Performed By      | QA Engineers, End Users    | Software Developers             |
| Focus             | Specifications & Behavior  | Code coverage & execution paths |
| Techniques        | Boundary Value Analysis    | Branch / Statement coverage     |
+-------------------+----------------------------+---------------------------------+`,
    interviewQuestions: [
      'What is Boundary Value Analysis (BVA) and why do most defects cluster around boundaries?',
      'What is Cyclomatic Complexity and how does it determine the minimum number of test cases?',
      'What is Gray-Box Testing?',
    ],
    commonMistakes: [
      'Testing only nominal happy-path values and skipping boundary edge cases (e.g., 0, -1, MAX_INT).',
      'Equating 100% Statement Coverage with 100% Path Coverage (statement coverage does not test all branch combinations).',
    ],
    revisionNotes: [
      'Black-Box: Behavior based on specifications. Boundary Value Analysis tests min, min+1, max-1, max.',
      'White-Box: Structure based on code logic. Tests all branches and paths.',
      'Boundary values cause the vast majority of software defects.',
    ],
  },
  {
    id: 'se-07-unit-integration-system',
    number: 7,
    title: 'Unit vs Integration vs System vs Acceptance Testing',
    category: 'se',
    subject: 'Software Engineering',
    codeLanguage: 'text',
    explanation:
      'The 4 chronological stages of software testing: 1. Unit Testing: Tests individual modules/functions in isolation using mocks and stubs. 2. Integration Testing: Tests interactions and data exchange between integrated components (Big Bang, Top-Down with Stubs, Bottom-Up with Drivers). 3. System Testing: Validates the complete integrated software against functional and non-functional requirements. 4. Acceptance Testing (UAT): User Acceptance Testing (Alpha/Beta testing) validating readiness for business release.',
    diagram: `4 Stages of Testing:
Unit Testing (Dev) ──> Integration (Dev/QA) ──> System (QA) ──> Acceptance / UAT (Client)`,
    interviewQuestions: [
      'What is the difference between a Stub and a Driver in integration testing?',
      'What is Alpha Testing vs Beta Testing in User Acceptance Testing (UAT)?',
      'What is Smoke Testing vs Sanity Testing?',
    ],
    commonMistakes: [
      'Confusing Smoke Testing (broad shallow test verifying basic build stability) with Sanity Testing (focused deep test verifying a specific bug fix).',
      'Using real external payment gateways or third-party APIs in automated unit tests.',
    ],
    revisionNotes: [
      'Unit: Single function/class in isolation (Developer).',
      'Integration: Component interfaces and contracts.',
      'System: Entire software end-to-end against specifications.',
      'Acceptance (UAT): Client verification. Alpha (internal) vs Beta (external).',
    ],
  },
  {
    id: 'se-08-verification-vs-validation',
    number: 8,
    title: 'Verification vs Validation (V-Model)',
    category: 'se',
    subject: 'Software Engineering',
    codeLanguage: 'text',
    explanation:
      'Verification: "Are we building the product right?" A static, process-oriented evaluation of artifacts, documents, and code without executing the software (Reviews, Walkthroughs, Inspections, Static Code Analysis). Validation: "Are we building the right product?" A dynamic, product-oriented evaluation verifying the actual executed software satisfies customer requirements and real-world expectations (Functional Testing, UAT).',
    diagram: `Verification vs Validation Summary:
+-------------------+----------------------------+---------------------------------+
| Aspect            | Verification               | Validation                      |
+-------------------+----------------------------+---------------------------------+
| Core Question     | "Are we building it right?"| "Are we building the right one?"|
| Nature            | Static (No code execution) | Dynamic (Executes software)     |
| Techniques        | Code reviews, inspections  | Testing, user execution         |
| Focus             | Conformance to design/specs| Satisfaction of customer needs  |
+-------------------+----------------------------+---------------------------------+`,
    interviewQuestions: [
      'Difference between Verification and Validation with practical industry examples?',
      'Can a software pass Verification completely but fail Validation? Explain how.',
      'What is Static Code Analysis (linters, SonarQube) and does it belong to Verification or Validation?',
    ],
    commonMistakes: [
      'Thinking Verification means running unit tests (Verification is static inspection; running tests is dynamic Validation).',
      'Assuming building strictly according to spec guarantees customer satisfaction (specifications may be flawed).',
    ],
    revisionNotes: [
      'Verification: Static. Reviews, design inspections, linting. No execution.',
      'Validation: Dynamic. Running software, testing, user acceptance.',
      'Mnemonic: Verification = "Right way"; Validation = "Right thing".',
    ],
  },
  {
    id: 'se-09-git-fundamentals',
    number: 9,
    title: 'Git Fundamentals: Architecture, Branching & Merge vs Rebase',
    category: 'se',
    subject: 'Software Engineering',
    codeLanguage: 'text',
    explanation:
      'Git is a distributed version control system (DVCS) where every developer holds a full copy of repository history. 3 Local States: Working Directory (modified files), Staging Area / Index (git add), and Git Repository / HEAD (git commit). Merge preserves full historical branch commits with an explicit merge commit. Rebase re-applies commits on top of another base tip, creating a linear history. Golden Rule of Rebase: Never rebase commits that have been pushed to a shared public branch.',
    diagram: `Git 3 Local Areas:
Working Directory ──(git add)──> Staging Area ──(git commit)──> Local Repo (HEAD)
        ^                                                              │
        └────────────────────(git checkout / restore)──────────────────┘`,
    interviewQuestions: [
      'What is the difference between git merge and git rebase?',
      'What does git reset --soft, git reset --mixed, and git reset --hard do?',
      'What is a detached HEAD state in Git and how do you recover from it?',
    ],
    commonMistakes: [
      'Running git reset --hard and losing uncommitted local work irreversibly.',
      'Rebasing a shared collaborative branch, forcing teammates into merge conflicts.',
      'Confusing git fetch (downloads commits without modifying working tree) with git pull (fetch + merge).',
    ],
    revisionNotes: [
      '3 Areas: Working Directory -> Staging Area (git add) -> Commit (git commit).',
      'git merge: Non-destructive, creates merge commit, preserves history branch shape.',
      'git rebase: Re-writes commit hashes, creates clean linear history.',
      'git stash: Temporarily shelves uncommitted changes to switch branches.',
    ],
  },
  {
    id: 'se-10-solid-principles',
    number: 10,
    title: 'SOLID Principles of Object-Oriented Design',
    category: 'se',
    subject: 'Software Engineering',
    codeLanguage: 'text',
    explanation:
      'SOLID principles guide clean, maintainable, scalable object-oriented software design: S: Single Responsibility Principle (A class should have only one reason to change). O: Open/Closed Principle (Open for extension, closed for modification via interfaces/polymorphism). L: Liskov Substitution Principle (Subtypes must be substitutable for their base types without altering correctness). I: Interface Segregation Principle (Clients should not be forced to depend on interfaces they do not use). D: Dependency Inversion Principle (High-level modules should depend on abstractions, not concrete implementations).',
    diagram: `SOLID Principles Mnemonic:
S - Single Responsibility: One class = One job
O - Open / Closed: Add features by extending, not by rewriting existing code
L - Liskov Substitution: Child class must uphold parent contract (Square vs Rectangle)
I - Interface Segregation: Small, focused interfaces > One bloated fat interface
D - Dependency Inversion: Depend on interfaces/abstractions, not concrete classes`,
    interviewQuestions: [
      'Explain each letter of the SOLID principles with an anti-pattern and refactored example.',
      'Why does the classic "Square inheriting from Rectangle" violate the Liskov Substitution Principle (LSP)?',
      'How does Dependency Injection (DI) implement the Dependency Inversion Principle (DIP)?',
    ],
    commonMistakes: [
      'Inheriting Square from Rectangle where setWidth() changes both width and height, breaking caller expectations (LSP violation).',
      'Creating "God Classes" with 20 responsibilities, violating SRP.',
      'Adding unrelated methods to an interface and forcing all implementers to provide empty stubs, violating ISP.',
    ],
    revisionNotes: [
      'S: 1 class = 1 responsibility (High cohesion).',
      'O: Extend via polymorphism without editing tested existing classes.',
      'L: Derived classes must fulfill base class guarantees.',
      'I: Split fat interfaces into small client-specific interfaces.',
      'D: Invert dependencies via interfaces (Constructor Injection).',
    ],
  },
];
