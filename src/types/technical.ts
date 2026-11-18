import { TopicProgress } from './database';

export type TechnicalCategory = 'cpp' | 'sql' | 'dbms' | 'os' | 'cn' | 'se';

export interface TechnicalTopic {
  id: string;
  number: number;
  title: string;
  category: TechnicalCategory;
  subject: string;
  explanation: string;
  codeOrSyntax?: string;
  codeLanguage?: 'cpp' | 'sql' | 'text';
  sampleTable?: string;
  expectedOutput?: string;
  diagram?: string;
  interviewQuestions: string[];
  commonMistakes?: string[];
  revisionNotes: string[];
}

export interface TechnicalTopicWithProgress extends TechnicalTopic {
  progress?: TopicProgress;
}

export interface PracticalSQLProblem {
  id: string;
  number: number;
  title: string;
  difficulty: 'Basic' | 'Intermediate';
  pattern: 'Joins' | 'Aggregation & GROUP BY' | 'Subqueries' | 'Window Functions' | 'Filtering & DML';
  statement: string;
  sampleTable: string;
  expectedOutput: string;
  sqlSolution: string;
  explanation: string;
}

export interface PracticalSQLWithProgress extends PracticalSQLProblem {
  progress?: TopicProgress;
}

export interface TechnicalStats {
  total: number;
  completed: number;
  learning: number;
  revise: number;
  notStarted: number;
  bookmarked: number;
  completionPercentage: number;
}

export interface FAQItem {
  id: string;
  question: string;
  shortAnswer: string;
  category: string;
}
