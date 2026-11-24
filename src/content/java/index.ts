import { MasteryTopic, MasteryModule } from '@/types/mastery';
import { module1, module1Topics } from './module1Fundamentals';
import { module2, module2Topics } from './module2CoreProgramming';
import { module3, module3Topics } from './module3OOP';
import { module4, module4Topics } from './module4Collections';
import { module5, module5Topics } from './module5Advanced';
import { module6, module6Topics } from './module6ProblemSolving';
import { module7, module7Topics } from './module7Practical';
import { module8, module8Topics } from './module8InterviewPrep';

export const javaModules: MasteryModule[] = [
  module1,
  module2,
  module3,
  module4,
  module5,
  module6,
  module7,
  module8,
];

export const allJavaTopics: MasteryTopic[] = [
  ...module1Topics,
  ...module2Topics,
  ...module3Topics,
  ...module4Topics,
  ...module5Topics,
  ...module6Topics,
  ...module7Topics,
  ...module8Topics,
];

export const javaTopicsById: Record<string, MasteryTopic> = {};
export const javaTopicsByNumber: Record<number, MasteryTopic> = {};

allJavaTopics.forEach((topic) => {
  javaTopicsById[topic.id] = topic;
  javaTopicsByNumber[topic.topicNumber] = topic;
});

export function getJavaTopicById(id: string): MasteryTopic | undefined {
  return javaTopicsById[id];
}

export function getJavaTopicByNumber(topicNumber: number): MasteryTopic | undefined {
  return javaTopicsByNumber[topicNumber];
}

export function getJavaTopicsByModule(moduleNumber: number): MasteryTopic[] {
  return allJavaTopics.filter((t) => t.moduleNumber === moduleNumber);
}

export const JAVA_TOTAL_TOPICS = 106;
export const JAVA_TOTAL_MODULES = 8;
