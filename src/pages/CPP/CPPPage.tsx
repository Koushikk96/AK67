import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { FileCode2 } from 'lucide-react';

export const CPPPage: React.FC = () => {
  const topics = [
    'Memory Layout: Stack vs Heap allocation, storage classes',
    'Pointers & References: Arithmetic, dangling pointers, smart pointers (unique, shared)',
    'Object-Oriented Programming: Virtual functions, vtable mechanics, polymorphism',
    'Constructors, Destructors: Virtual destructors, copy & move constructors, std::move',
    'STL Containers: vector, unordered_map, priority_queue time complexities',
    'Standard Algorithms: sort, binary_search, lower_bound, upper_bound',
    'Placement Recruiter Traps & 40+ Technical Interview Q&As',
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 border-b border-zinc-800 pb-5">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">Module C</span>
          <Badge variant="outline">Phase 4 Implementation</Badge>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-white">C++ Placement Mastery</h1>
        <p className="text-xs text-zinc-400 max-w-2xl">
          Deep language mechanics, pointer arithmetic, memory management, STL performance guarantees, and frequent OOP placement interview questions.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {topics.map((topic, idx) => (
          <Card key={idx} className="bg-zinc-900/40 border-zinc-800">
            <CardHeader className="p-4">
              <div className="flex items-start gap-2.5">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-blue-500/10 text-blue-400 text-xs font-semibold">
                  {idx + 1}
                </div>
                <p className="text-xs font-medium text-zinc-300 leading-relaxed">{topic}</p>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm">
            <FileCode2 className="h-4 w-4 text-blue-400" />
            <span>Interactive Tracking & Flashcards</span>
          </CardTitle>
          <CardDescription>
            In Phase 4, each topic will feature interactive concept checklists, recruiter trap warnings, and personal mastery tracking.
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
};
