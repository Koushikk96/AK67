import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Cpu, Server, Network, Layers } from 'lucide-react';

export const CoreCSPage: React.FC = () => {
  const subjects = [
    {
      title: 'Operating Systems (OS)',
      icon: Cpu,
      topics: 'Processes, Threads, CPU Scheduling, Deadlocks, Mutex & Semaphores, Paging, Virtual Memory, Thrashing',
    },
    {
      title: 'Database Management Systems (DBMS)',
      icon: Server,
      topics: 'ACID Properties, 3-Tier Architecture, B/B+ Tree Indexing, Transactions, Concurrency Control, Serializability',
    },
    {
      title: 'Computer Networks (CN)',
      icon: Network,
      topics: 'OSI 7 Layers, TCP 3-Way Handshake, TCP vs UDP, DNS, HTTP/1.1 vs HTTP/2/3, IP Subnetting, Routing',
    },
    {
      title: 'Software Engineering (SE)',
      icon: Layers,
      topics: 'SDLC, Agile / Scrum ceremonies, SOLID Principles, RESTful API design, Git branching workflows',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 border-b border-zinc-800 pb-5">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">Module E</span>
          <Badge variant="outline">Phase 4 Implementation</Badge>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-white">Core Computer Science</h1>
        <p className="text-xs text-zinc-400 max-w-2xl">
          Non-negotiable theory subjects for campus placement screening tests and technical interview rounds.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {subjects.map((sub, idx) => {
          const Icon = sub.icon;
          return (
            <Card key={idx} className="bg-zinc-900/40 border-zinc-800">
              <CardHeader>
                <div className="flex items-center gap-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-md bg-blue-500/10 text-blue-400">
                    <Icon className="h-4 w-4" />
                  </div>
                  <CardTitle className="text-sm font-semibold">{sub.title}</CardTitle>
                </div>
                <CardDescription className="pt-2 text-xs text-zinc-400 leading-relaxed">
                  {sub.topics}
                </CardDescription>
              </CardHeader>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
