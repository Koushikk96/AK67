import { TopicProgress } from './database';

export type AptitudeCategory = 'quantitative' | 'logical' | 'verbal';
export type AptitudeDifficulty = 'Easy' | 'Medium' | 'Hard';

export interface AptitudeQuestion {
  id: string;
  question: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
  difficulty: AptitudeDifficulty;
}

export interface AptitudeSolvedExample {
  question: string;
  solution: string;
}

export interface AptitudeTopic {
  id: string;
  number: number;
  title: string;
  category: AptitudeCategory;
  explanation: string;
  formulas: string[];
  solvedExamples: AptitudeSolvedExample[];
  shortcuts: string[];
  commonMistakes: string[];
  practiceQuestions: AptitudeQuestion[];
}

export interface AptitudeTopicWithProgress extends AptitudeTopic {
  progress?: TopicProgress;
}

export interface AptitudeStats {
  totalTopics: number;
  completedTopics: number;
  learningTopics: number;
  reviseTopics: number;
  notStartedTopics: number;
  bookmarkedTopics: number;
  totalQuestions: number;
  completionPercentage: number;
  quantProgress: { total: number; completed: number };
  logicalProgress: { total: number; completed: number };
  verbalProgress: { total: number; completed: number };
}
