import { DSAProblem, DSACategory } from '@/types/dsa';
import { arrayProblems } from './arrays';
import { stringProblems } from './strings';
import { hashingProblems } from './hashing';
import { twoPointersSlidingWindowProblems } from './twoPointersSlidingWindow';
import { sortingBinarySearchProblems } from './sortingBinarySearch';
import { recursionBacktrackingProblems } from './recursionBacktracking';
import { linkedListsProblems } from './linkedLists';
import { stackQueueProblems } from './stackQueue';
import { treesBSTProblems } from './treesBST';
import { dynamicProgrammingProblems } from './dynamicProgramming';
import { graphProblems } from './graphs';

export const dsaCategories: DSACategory[] = [
  'Arrays',
  'Strings',
  'Hashing',
  'Two Pointers & Sliding Window',
  'Sorting & Binary Search',
  'Recursion & Backtracking',
  'Linked Lists',
  'Stack & Queue',
  'Trees & BST',
  'Dynamic Programming',
  'Basic Graphs',
];

export const dsaProblems: DSAProblem[] = [
  ...arrayProblems,               // 1 to 12 (12)
  ...stringProblems,              // 13 to 20 (8)
  ...hashingProblems,             // 21 to 25 (5)
  ...twoPointersSlidingWindowProblems, // 26 to 31 (6)
  ...sortingBinarySearchProblems, // 32 to 38 (7)
  ...recursionBacktrackingProblems, // 39 to 43 (5)
  ...linkedListsProblems,         // 44 to 48 (5)
  ...stackQueueProblems,          // 49 to 53 (5)
  ...treesBSTProblems,            // 54 to 59 (6)
  ...dynamicProgrammingProblems,  // 60 to 64 (5)
  ...graphProblems,               // 65 to 67 (3)
];

// Verify at compile/runtime that exactly 67 problems exist
if (dsaProblems.length !== 67) {
  console.warn(`[AK67 DSA] Warning: Expected exactly 67 problems, found ${dsaProblems.length}`);
}

export const dsaProblemsById = new Map<string, DSAProblem>(
  dsaProblems.map((p) => [p.id, p])
);

export const dsaProblemsByNumber = new Map<number, DSAProblem>(
  dsaProblems.map((p) => [p.number, p])
);

export const getProblemById = (id: string): DSAProblem | undefined => {
  return dsaProblemsById.get(id);
};

export const getProblemByNumber = (num: number): DSAProblem | undefined => {
  return dsaProblemsByNumber.get(num);
};

export const getCategoryProblemCount = (category: DSACategory): number => {
  return dsaProblems.filter((p) => p.category === category).length;
};
