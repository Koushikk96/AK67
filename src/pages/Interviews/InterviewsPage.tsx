import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { MessageSquare, Sparkles, UserCheck, HelpCircle } from 'lucide-react';

export const InterviewsPage: React.FC = () => {
  const sections = [
    {
      title: 'The STAR Framework Guide',
      icon: Sparkles,
      desc: 'Structured storytelling: Situation, Task, Action, and Result for behavioral and situational rounds.',
    },
    {
      title: 'Project Defense Blueprint',
      icon: MessageSquare,
      desc: 'How to pitch your projects: 30-second elevator pitch, tech-stack trade-offs, and hardest bugs solved.',
    },
    {
      title: 'High-Impact HR Questions',
      icon: UserCheck,
      desc: '25+ sample answers, common recruiter traps, and behavioral responses tailored for fresher candidates.',
    },
    {
      title: 'Questions to Ask the Recruiter',
      icon: HelpCircle,
      desc: 'Curated questions that signal technical curiosity and engineering maturity at the conclusion of your interview.',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 border-b border-zinc-800 pb-5">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">Module J</span>
          <Badge variant="outline">Phase 6 Implementation</Badge>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-white">Interview Preparation Hub</h1>
        <p className="text-xs text-zinc-400 max-w-2xl">
          Comprehensive preparation for technical, project defense, behavioral, and HR placement rounds.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {sections.map((sec, idx) => {
          const Icon = sec.icon;
          return (
            <Card key={idx} className="bg-zinc-900/40 border-zinc-800">
              <CardHeader>
                <div className="flex items-center gap-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-md bg-blue-500/10 text-blue-400">
                    <Icon className="h-4 w-4" />
                  </div>
                  <CardTitle className="text-sm font-semibold">{sec.title}</CardTitle>
                </div>
                <CardDescription className="pt-2 text-xs text-zinc-400 leading-relaxed">
                  {sec.desc}
                </CardDescription>
              </CardHeader>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
