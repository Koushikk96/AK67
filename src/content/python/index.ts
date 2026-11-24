import { MasteryTopic, MasteryModule } from '@/types/mastery';
import { module1, module1Topics } from './module1Fundamentals';
import { module2, module2Topics } from './module2DataStructures';
import { module3, module3Topics } from './module3Functions';
import { module4, module4Topics } from './module4OOP';
import { module5, module5Topics } from './module5Advanced';
import { module6, module6Topics } from './module6ProblemSolving';
import { module7, module7Topics } from './module7Practical';
import { module8, module8Topics } from './module8InterviewPrep';

export const pythonModules: MasteryModule[] = [
  module1,
  module2,
  module3,
  module4,
  module5,
  module6,
  module7,
  module8,
];

export const allPythonTopics: MasteryTopic[] = [
  ...module1Topics,
  ...module2Topics,
  ...module3Topics,
  ...module4Topics,
  ...module5Topics,
  ...module6Topics,
  ...module7Topics,
  ...module8Topics,
];

export const pythonTopicsById: Record<string, MasteryTopic> = {};
export const pythonTopicsByNumber: Record<number, MasteryTopic> = {};

allPythonTopics.forEach((topic) => {
  pythonTopicsById[topic.id] = topic;
  pythonTopicsByNumber[topic.topicNumber] = topic;
});

export function getPythonTopicById(id: string): MasteryTopic | undefined {
  return pythonTopicsById[id];
}

export function getPythonTopicByNumber(topicNumber: number): MasteryTopic | undefined {
  return pythonTopicsByNumber[topicNumber];
}

export function getPythonTopicsByModule(moduleNumber: number): MasteryTopic[] {
  return allPythonTopics.filter((t) => t.moduleNumber === moduleNumber);
}

export const PYTHON_TOTAL_TOPICS = 89;
export const PYTHON_TOTAL_MODULES = 8;
