import { TopicProgress } from './database';

export type MasteryLanguage = 'python' | 'java';
export type MasteryDifficulty = 'Beginner' | 'Intermediate' | 'Advanced';
export type ExerciseType = 'conceptual' | 'coding' | 'output_prediction' | 'debugging';

export interface MasteryCodeExample {
  title: string;
  code: string;
  expectedOutput: string;
  explanation: string;
}

export interface MasteryExercise {
  id: string;
  title: string;
  difficulty: MasteryDifficulty;
  type: ExerciseType;
  prompt: string;
  starterCode?: string;
  solution: string;
  explanation: string;
}

export interface MasteryQuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
  isOutputPrediction?: boolean;
}

export interface MasteryCheckpoint {
  id: string;
  label: string;
}

export interface MasteryTopic {
  id: string;
  moduleId: string;
  moduleNumber: number;
  moduleTitle: string;
  topicNumber: number;
  title: string;
  language: MasteryLanguage;
  level: MasteryDifficulty;
  whyItMatters: string;
  explanation: string;
  syntaxAndStructure: string;
  codeExamples: MasteryCodeExample[];
  realWorldApplications: string[];
  commonMistakes: string[];
  interviewRelevance: string;
  checkpoints: MasteryCheckpoint[];
  practiceExercises: MasteryExercise[];
  quizQuestions: MasteryQuizQuestion[];
  revisionNotes: string[];
}

export interface MasteryTopicWithProgress extends MasteryTopic {
  progress?: TopicProgress;
}

export interface MasteryModule {
  id: string;
  number: number;
  title: string;
  description: string;
  language: MasteryLanguage;
  topics: MasteryTopic[];
  moduleAssessment: {
    id: string;
    title: string;
    passingScorePercentage: number;
    questions: MasteryQuizQuestion[];
  };
  revisionQuestions: string[];
}

export interface MasteryStats {
  totalTopics: number;
  completedTopics: number;
  learningTopics: number;
  masteredTopics: number;
  reviseTopics: number;
  notStartedTopics: number;
  bookmarkedTopics: number;
  completionPercentage: number;
  moduleStats: {
    moduleId: string;
    moduleTitle: string;
    total: number;
    completed: number;
    percentage: number;
  }[];
}
