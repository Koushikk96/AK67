import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Award, Clock } from 'lucide-react';

export const MockTestsPage: React.FC = () => {
  const tests = [
    {
      title: 'Full Placement Online Assessment Simulator',
      duration: '60 Mins',
      questions: '40 Questions (Quant + Core CS + DSA Output + SQL)',
      tag: 'Comprehensive',
    },
    {
      title: 'Core Computer Science Sprint Drill',
      duration: '25 Mins',
      questions: '25 Questions (OS, DBMS, Networks, SE)',
      tag: 'Theory',
    },
    {
      title: 'Tricky C++ Output & Complexity Assessment',
      duration: '20 Mins',
      questions: '15 Snippets (Pointers, vtable, operator precedence)',
      tag: 'Technical',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 border-b border-zinc-800 pb-5">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">Module I</span>
          <Badge variant="attempted">Phase 6 Implementation</Badge>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-white">Mock Test Assessment Engine</h1>
        <p className="text-xs text-zinc-400 max-w-2xl">
          Timed simulation tests with real-time countdown, question navigation palette, instant scoring, accuracy breakdown, and local test history tracking.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {tests.map((test, idx) => (
          <Card key={idx} className="bg-zinc-900/40 border-zinc-800">
            <CardHeader>
              <div className="flex items-center justify-between">
                <Badge variant="outline">{test.tag}</Badge>
                <span className="flex items-center gap-1 text-xs text-zinc-400">
                  <Clock className="h-3 w-3" />
                  {test.duration}
                </span>
              </div>
              <CardTitle className="mt-2 text-sm font-semibold">{test.title}</CardTitle>
              <CardDescription className="pt-1 text-xs text-zinc-400">
                {test.questions}
              </CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm">
            <Award className="h-4 w-4 text-amber-400" />
            <span>Persistent Scoring & Weak Area Detection</span>
          </CardTitle>
          <CardDescription>
            Every submitted mock assessment records your responses in IndexedDB, feeding directly into the Weak Area detection algorithm in the Placement Analytics module.
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
};
