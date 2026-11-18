import { TechnicalTopic } from '@/types/technical';
import { dbmsTopics } from './dbms';
import { osTopics } from './os';
import { networkTopics } from './networks';
import { softwareEngTopics } from './softwareEng';

export { dbmsTopics } from './dbms';
export { osTopics } from './os';
export { networkTopics } from './networks';
export { softwareEngTopics } from './softwareEng';

export const allCoreCSTopics: TechnicalTopic[] = [
  ...dbmsTopics,
  ...osTopics,
  ...networkTopics,
  ...softwareEngTopics,
];

export const coreCSSubjects = [
  { id: 'all', label: 'All Subjects', count: allCoreCSTopics.length },
  { id: 'dbms', label: 'DBMS', count: dbmsTopics.length },
  { id: 'os', label: 'Operating Systems', count: osTopics.length },
  { id: 'cn', label: 'Computer Networks', count: networkTopics.length },
  { id: 'se', label: 'Software Engineering', count: softwareEngTopics.length },
] as const;

export const coreCSTopicMap = new Map<string, TechnicalTopic>(
  allCoreCSTopics.map((t) => [t.id, t])
);
