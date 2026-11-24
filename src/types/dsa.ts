import { ProblemDifficulty, ProblemProgress } from './database';

export type DSACategory =
  | 'Arrays'
  | 'Strings'
  | 'Hashing'
  | 'Two Pointers & Sliding Window'
  | 'Sorting & Binary Search'
  | 'Recursion & Backtracking'
  | 'Linked Lists'
  | 'Stack & Queue'
  | 'Trees & BST'
  | 'Dynamic Programming'
  | 'Basic Graphs';

export type DSALanguage = 'cpp' | 'python' | 'java';

export interface DSAExample {
  input: string;
  output: string;
  explanation?: string;
}

export interface DSAProblem {
  /** Stable unique identifier (e.g. "two-sum") */
  id: string;
  /** Problem number (1 to 67) */
  number: number;
  /** Human-readable title */
  title: string;
  /** Category / Topic classification */
  category: DSACategory;
  /** Difficulty rating */
  difficulty: ProblemDifficulty;
  /** Concise conceptual problem statement */
  description: string;
  /** Concrete input/output test examples */
  examples: DSAExample[];
  /** Constraints list */
  constraints: string[];
  /** Key concepts and techniques */
  keyConcepts: string[];
  /** Algorithmic pattern tag (e.g. "Hash Map Lookup", "Fast & Slow Pointers") */
  pattern: string;
  /** Big-O Time Complexity */
  timeComplexity: string;
  /** Big-O Space Complexity */
  spaceComplexity: string;
  /** Progressive 3-tier hints: 1=Conceptual intuition, 2=Data structure guidance, 3=Algorithm/Edge cases */
  hints: [string, string, string];
  /** Verified modern C++ (C++17/20) reference solution suitable for technical rounds */
  cppSolution: string;
  /** Verified modern Python (Python 3.11+) reference solution suitable for technical rounds */
  pythonSolution: string;
  /** Verified modern Java (Java 17/21) reference solution suitable for technical rounds */
  javaSolution: string;
  /** Important edge cases to highlight during interview */
  edgeCases: string[];
  /** Common candidate mistakes and pitfalls */
  commonMistakes: string[];
  /** Recruiter / Interviewer walk-through explanation */
  interviewExplanation: string;
}

export interface DSAProblemWithProgress extends DSAProblem {
  progress?: ProblemProgress;
}
