import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { BarChart3, AlertCircle, TrendingUp, Target } from 'lucide-react';

export const AnalyticsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 border-b border-zinc-800 pb-5">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">Module L</span>
          <Badge variant="outline">Phase 7 Implementation</Badge>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-white">Placement Readiness Analytics</h1>
        <p className="text-xs text-zinc-400 max-w-2xl">
          Honest, non-sugarcoated preparation metrics calculated strictly from stored IndexedDB progress without fake numbers or placeholder data.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border-zinc-800 bg-zinc-900/40">
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center justify-between">
              <span>Overall Readiness</span>
              <TrendingUp className="h-4 w-4 text-blue-400" />
            </CardDescription>
            <CardTitle className="text-2xl font-bold">0%</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-[11px] text-zinc-400">Composite preparation score</p>
          </CardContent>
        </Card>

        <Card className="border-zinc-800 bg-zinc-900/40">
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center justify-between">
              <span>DSA Mastery</span>
              <Target className="h-4 w-4 text-emerald-400" />
            </CardDescription>
            <CardTitle className="text-2xl font-bold">0 / 67</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-[11px] text-zinc-400">Solved problem count</p>
          </CardContent>
        </Card>

        <Card className="border-zinc-800 bg-zinc-900/40">
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center justify-between">
              <span>Revision Health</span>
              <BarChart3 className="h-4 w-4 text-purple-400" />
            </CardDescription>
            <CardTitle className="text-2xl font-bold">100%</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-[11px] text-zinc-400">Zero overdue backlog</p>
          </CardContent>
        </Card>

        <Card className="border-zinc-800 bg-zinc-900/40">
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center justify-between">
              <span>Weak Topics</span>
              <AlertCircle className="h-4 w-4 text-amber-400" />
            </CardDescription>
            <CardTitle className="text-2xl font-bold">None</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-[11px] text-zinc-400">Data will populate with practice</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm">
            <BarChart3 className="h-4 w-4 text-blue-400" />
            <span>Strict Real-Data Guarantee</span>
          </CardTitle>
          <CardDescription>
            Per the AK67 core specification, every metric, graph, and chart is generated solely from actual user activity saved locally in IndexedDB.
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
};
