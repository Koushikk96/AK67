import { TestQuestion } from '@/types/mockTest';
import { cppMCQs, oopMCQs } from './cppAndOop';
import { dbmsMCQs, sqlMCQs } from './dbmsAndSql';
import { osMCQs, networkMCQs } from './osAndNetworks';
import { seMCQs } from './softwareEng';

export { cppMCQs, oopMCQs, dbmsMCQs, sqlMCQs, osMCQs, networkMCQs, seMCQs };

export const allTechnicalMCQs: TestQuestion[] = [
  ...cppMCQs,
  ...oopMCQs,
  ...dbmsMCQs,
  ...sqlMCQs,
  ...osMCQs,
  ...networkMCQs,
  ...seMCQs,
];

export const technicalSubjectMeta = [
  { subject: 'C++', count: cppMCQs.length },
  { subject: 'OOP', count: oopMCQs.length },
  { subject: 'DBMS', count: dbmsMCQs.length },
  { subject: 'SQL', count: sqlMCQs.length },
  { subject: 'Operating Systems', count: osMCQs.length },
  { subject: 'Computer Networks', count: networkMCQs.length },
  { subject: 'Software Engineering', count: seMCQs.length },
];

export function getTechnicalMCQsBySubject(subject: string): TestQuestion[] {
  return allTechnicalMCQs.filter((q) => q.subject.toLowerCase() === subject.toLowerCase());
}

export function getTechnicalMCQById(id: string): TestQuestion | undefined {
  return allTechnicalMCQs.find((q) => q.id === id);
}
