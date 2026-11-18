export type InterviewSubject =
  | 'C++'
  | 'OOP'
  | 'DSA'
  | 'DBMS'
  | 'SQL'
  | 'Operating Systems'
  | 'Computer Networks'
  | 'Software Engineering';

export interface TechnicalInterviewQuestion {
  id: string;
  subject: InterviewSubject;
  question: string;
  answer: string;
  explanation?: string;
  codeSnippet?: string;
  followUpQuestions: string[];
  difficulty: 'Easy' | 'Medium' | 'Hard';
  tags: string[];
}

export interface HRInterviewQuestion {
  id: string;
  number: number;
  question: string;
  objective: string;
  answerStructure: string[];
  sampleAnswer: string;
  mistakesToAvoid: string[];
  proTips: string[];
}

export interface ProjectPreparationTemplate {
  title: string;
  problemStatement: string;
  architecture: string;
  techStack: string;
  databaseDesign: string;
  implementationDecisions: string;
  challengesFaced: string;
  securityConsiderations: string;
  futureImprovements: string;
  interviewerQuestions: string[];
}
