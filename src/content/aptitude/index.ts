import { AptitudeTopic, AptitudeCategory } from '../../types/aptitude';
import { quantTopics } from './quantitative';
import { logicalTopics } from './logical';
import { verbalTopics } from './verbal';

export { quantTopics, logicalTopics, verbalTopics };

export const allAptitudeTopics: AptitudeTopic[] = [
  ...quantTopics,
  ...logicalTopics,
  ...verbalTopics,
];

export const aptitudeTopicMap: Record<string, AptitudeTopic> = allAptitudeTopics.reduce(
  (acc, topic) => {
    acc[topic.id] = topic;
    return acc;
  },
  {} as Record<string, AptitudeTopic>
);

export function getAptitudeTopicById(id: string): AptitudeTopic | undefined {
  return aptitudeTopicMap[id];
}

export function getAptitudeTopicsByCategory(category: AptitudeCategory): AptitudeTopic[] {
  switch (category) {
    case 'quantitative':
      return quantTopics;
    case 'logical':
      return logicalTopics;
    case 'verbal':
      return verbalTopics;
    default:
      return [];
  }
}

export interface AptitudeCategoryMeta {
  id: AptitudeCategory;
  name: string;
  shortDesc: string;
  topicCount: number;
  questionCount: number;
}

export const aptitudeCategoryMeta: AptitudeCategoryMeta[] = [
  {
    id: 'quantitative',
    name: 'Quantitative Aptitude',
    shortDesc: 'Formulas, arithmetic tricks, speed math & data interpretation for placement tests',
    topicCount: quantTopics.length,
    questionCount: quantTopics.reduce((acc, t) => acc + t.practiceQuestions.length, 0),
  },
  {
    id: 'logical',
    name: 'Logical Reasoning',
    shortDesc: 'Deductive patterns, analytical puzzles, series, blood relations & syllogisms',
    topicCount: logicalTopics.length,
    questionCount: logicalTopics.reduce((acc, t) => acc + t.practiceQuestions.length, 0),
  },
  {
    id: 'verbal',
    name: 'Verbal Ability',
    shortDesc: 'Grammar rules, sentence correction, reading comprehension & vocabulary',
    topicCount: verbalTopics.length,
    questionCount: verbalTopics.reduce((acc, t) => acc + t.practiceQuestions.length, 0),
  },
];
