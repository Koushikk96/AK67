import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Calculator, Compass, BookOpen, BarChart } from 'lucide-react';

export const AptitudePage: React.FC = () => {
  const categories = [
    {
      title: 'Quantitative Aptitude',
      icon: Calculator,
      topics: 'Percentages, Profit & Loss, Time & Work, Speed Distance, Permutations, Probability, SI & CI',
    },
    {
      title: 'Logical Reasoning',
      icon: Compass,
      topics: 'Coding-Decoding, Blood Relations, Seating Arrangements, Syllogisms, Series, Clocks & Calendars',
    },
    {
      title: 'Verbal Ability',
      icon: BookOpen,
      topics: 'Reading Comprehension, Error Spotting, Para Jumbles, Sentence Completion, Vocabulary',
    },
    {
      title: 'Data Interpretation',
      icon: BarChart,
      topics: 'Tables, Bar Charts, Line Graphs, Pie Charts, Rapid Calculation & Approximation Techniques',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 border-b border-zinc-800 pb-5">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">Module F</span>
          <Badge variant="outline">Phase 5 Implementation</Badge>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-white">Aptitude & Reasoning</h1>
        <p className="text-xs text-zinc-400 max-w-2xl">
          Online Assessment (OA) screening test preparation covering speed math, logical patterns, and verbal accuracy.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {categories.map((cat, idx) => {
          const Icon = cat.icon;
          return (
            <Card key={idx} className="bg-zinc-900/40 border-zinc-800">
              <CardHeader>
                <div className="flex items-center gap-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-md bg-blue-500/10 text-blue-400">
                    <Icon className="h-4 w-4" />
                  </div>
                  <CardTitle className="text-sm font-semibold">{cat.title}</CardTitle>
                </div>
                <CardDescription className="pt-2 text-xs text-zinc-400 leading-relaxed">
                  {cat.topics}
                </CardDescription>
              </CardHeader>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
