import React from 'react';
import { Card, CardHeader } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Building2 } from 'lucide-react';

export const CompaniesPage: React.FC = () => {
  const companies = [
    { name: 'TCS (Ninja / Digital / Prime)', type: 'Service / Tier-2 Product', rounds: 'Cognitive + Technical + Coding + Interview' },
    { name: 'Infosys (SE / DSE / Specialist Programmer)', type: 'Service / Tier-2 Product', rounds: 'Reasoning + Pseudo-code + Coding (Easy to Hard)' },
    { name: 'Cognizant (GenC / GenC Next / Elevate)', type: 'Service & Solutions', rounds: 'Aptitude + Technical MCQ + Coding + Tech Interview' },
    { name: 'Amazon (SDE-1 / WOW)', type: 'Tier-1 Product', rounds: 'Online Assessment (2 Coding + LP) + 3 Technical Rounds' },
    { name: 'Cisco Systems (Software Engineer)', type: 'Networking & Systems', rounds: 'Online Test (Networking + DSA) + 2 Technical + Managerial' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 border-b border-zinc-800 pb-5">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">Module K</span>
          <Badge variant="outline">Phase 6 Implementation</Badge>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-white">Company Preparation & Pipeline</h1>
        <p className="text-xs text-zinc-400 max-w-2xl">
          Track hiring drives, check eligibility cutoffs, review round patterns, and maintain company-specific preparation checklists.
        </p>
      </div>

      <div className="space-y-3">
        {companies.map((comp, idx) => (
          <Card key={idx} className="bg-zinc-900/40 border-zinc-800">
            <CardHeader className="p-4 sm:p-5">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                    <Building2 className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-zinc-100">{comp.name}</h3>
                    <p className="text-xs text-zinc-400">{comp.type}</p>
                  </div>
                </div>
                <Badge variant="secondary" className="w-fit">{comp.rounds}</Badge>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
};
