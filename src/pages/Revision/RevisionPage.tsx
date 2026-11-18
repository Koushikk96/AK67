import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { RotateCcw, Clock, AlertTriangle, CheckCircle2 } from 'lucide-react';

export const RevisionPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 border-b border-zinc-800 pb-5">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-purple-400 uppercase tracking-wider">Module G</span>
          <Badge variant="revise">Phase 5 Implementation</Badge>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-white">Spaced Revision Engine</h1>
        <p className="text-xs text-zinc-400 max-w-2xl">
          Automatic interval scheduling (1 day $\to$ 3 days $\to$ 7 days $\to$ 21 days $\to$ 60 days) to prevent algorithmic decay and keep key patterns fresh in memory.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="border-purple-500/30 bg-purple-500/5">
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center justify-between text-purple-300">
              <span>Due Today</span>
              <RotateCcw className="h-4 w-4 text-purple-400" />
            </CardDescription>
            <CardTitle className="text-2xl font-bold text-white">0 Items</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-[11px] text-zinc-400">Ready for active recall</p>
          </CardContent>
        </Card>

        <Card className="border-rose-500/30 bg-rose-500/5">
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center justify-between text-rose-300">
              <span>Overdue</span>
              <AlertTriangle className="h-4 w-4 text-rose-400" />
            </CardDescription>
            <CardTitle className="text-2xl font-bold text-white">0 Items</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-[11px] text-zinc-400">Priority recovery items</p>
          </CardContent>
        </Card>

        <Card className="border-zinc-800 bg-zinc-900/40">
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center justify-between text-zinc-400">
              <span>Completed Revisions</span>
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            </CardDescription>
            <CardTitle className="text-2xl font-bold text-white">0 Total</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-[11px] text-zinc-400">Historical retention count</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4 text-purple-400" />
            <span>Spaced Repetition Algorithm</span>
          </CardTitle>
          <CardDescription>
            When a problem or topic is completed in Phase 3/4, it is indexed in IndexedDB under `nextRevisionDate`. Marking a revision as `Easy` expands the interval; `Hard` resets it.
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
};
